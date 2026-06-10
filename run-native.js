const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

// ===== Native Windows paths =====
const OPENCLAW_DIR = 'C:\\Users\\Administrator\\.openclaw';
const LOG_DIR = path.join(OPENCLAW_DIR, 'logs');
const WORKSPACE_DIR = 'C:\\Users\\Administrator\\workspace-dev';

const app = express();
const PORT = 3000;

// ===== Log reading helpers =====
function listLogFiles(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.log') || f.endsWith('.json') || f.endsWith('.jsonl'))
      .map(f => {
        const stat = fs.statSync(path.join(dir, f));
        return { name: f, size: stat.size, mtime: stat.mtime.toISOString(), path: path.join(dir, f) };
      })
      .sort((a, b) => new Date(b.mtime) - new Date(a.mtime));
  } catch (e) { return []; }
}

function readLogFile(filePath, lines = 200, offset = 0) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const allLines = content.split('\n').filter(l => l.trim());
    const totalLines = allLines.length;
    const start = Math.max(0, totalLines - lines - offset);
    const selected = allLines.slice(start, start + lines);
    return { totalLines, lines: selected, startLine: start + 1, endLine: start + selected.length, hasMore: start > 0 };
  } catch (e) {
    return { totalLines: 0, lines: [], startLine: 0, endLine: 0, hasMore: false };
  }
}

function runCmd(cmd) {
  try {
    const out = execSync(cmd, { timeout: 10000, encoding: 'utf8', shell: 'powershell' });
    return { success: true, output: out.trim() };
  } catch (e) {
    return { success: false, output: e.stderr || e.message };
  }
}

// ===== OTP Store + Command History =====
const otpStore = new Map();
const cmdHistory = [];
const OTP_EXPIRY_MS = 120000; // 2 minutes

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTPviaDiscord(otp, cmd) {
  console.log(`[OTP] Code: ${otp} for command: ${cmd}`);
  // TODO: Send via Discord API to user
  return true;
}

app.use(express.json());


// ===== Gateway health check
app.get('/api/gateway/status', (req, res) => {
  const timeout = setTimeout(() => {
    res.json({ status: 'offline', color: 'gray' });
  }, 3000);
  const r = require('http').get('http://localhost:18789/', { headers: { 'Authorization': '***4bfc7a8bebec20bcb1312f04eb21db016622923dff902701' } }, (rp) => {
    clearTimeout(timeout);
    res.json({ status: 'online', color: 'green' });
  });
  r.on('error', () => {
    clearTimeout(timeout);
    res.json({ status: 'offline', color: 'gray' });
  });
});

// POST /api/command/request
app.post('/api/command/request', (req, res) => {
  const { cmd } = req.body;
  if (!cmd || typeof cmd !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid cmd' });
  }
  const otp = generateOTP();
  otpStore.set(otp, { cmd, expiresAt: Date.now() + OTP_EXPIRY_MS });
  sendOTPviaDiscord(otp, cmd);
  console.log(`[OTP] Active OTPs: ${otpStore.size}`);
  res.json({ otp_sent: true, expires_in: 120, message: 'OTP sent to your Discord' });
});

// POST /api/command/verify
app.post('/api/command/verify', (req, res) => {
  const { cmd, otp } = req.body;
  if (!cmd || !otp) {
    return res.status(400).json({ error: 'Missing cmd or otp' });
  }
  const stored = otpStore.get(otp);
  if (!stored) {
    return res.status(401).json({ error: 'Invalid OTP' });
  }
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(otp);
    return res.status(401).json({ error: 'OTP expired' });
  }
  if (stored.cmd !== cmd) {
    return res.status(400).json({ error: 'OTP does not match this command' });
  }
  otpStore.delete(otp);
  const result = runCmd(cmd);
  cmdHistory.unshift({ cmd, timestamp: new Date().toISOString(), success: result.success, output: result.output });
  if (cmdHistory.length > 20) cmdHistory.pop();
  res.json(result);
});

// GET /api/command/history
app.get('/api/command/history', (req, res) => {
  res.json(cmdHistory);
});

// GET /api/workspace/read
app.get('/api/workspace/read', (req, res) => {
  const filePath = req.query.path;
  if (!filePath) return res.status(400).json({ error: 'Missing path' });
  const resolved = path.resolve(WORKSPACE_DIR, filePath);
  if (!resolved.startsWith(WORKSPACE_DIR)) {
    return res.status(403).json({ error: 'Path outside workspace' });
  }
  try {
    const content = fs.readFileSync(resolved, 'utf8');
    res.json({ content, name: path.basename(resolved) });
  } catch (e) {
    res.status(404).json({ error: 'File not found' });
  }
});

// ===== Static files =====
app.use(express.static(path.join(__dirname, 'container', 'public')));

// ===== API Routes =====
app.get('/api/logs', (req, res) => {
  const files = listLogFiles(LOG_DIR);
  res.json({ directory: LOG_DIR, files });
});

app.get('/api/logs/read', (req, res) => {
  const filename = req.query.file;
  const lines = parseInt(req.query.lines) || 200;
  if (!filename) return res.status(400).json({ error: 'Missing file' });
  const data = readLogFile(path.join(LOG_DIR, filename), lines);
  res.json(data);
});

app.get('/api/podman/ps', (req, res) => {
  const result = runCmd('podman ps -a 2>&1');
  // Fallback: show native processes
  if (!result.success) {
    const processes = runCmd('Get-Process node,podman -ErrorAction SilentlyContinue | Format-Table Id,ProcessName,CPU,StartTime -AutoSize');
    res.json({ success: true, output: processes.output || 'No processes found', note: 'Podman not available, showing native processes' });
  } else {
    res.json(result);
  }
});

app.get('/api/podman/logs', (req, res) => {
  const result = runCmd('podman logs --tail 50 keithclaw-logviewer 2>&1');
  res.json({ success: false, output: 'Native mode — Podman not running.\nUse the native Node.js process directly.' });
});

app.get('/api/system/health', (req, res) => {
  const uptime = runCmd('(Get-Date) - (Get-CimInstance Win32_OperatingSystem).LastBootUpTime | Select-Object @{N="Uptime";E={$_.Days.ToString()+"d "+$_.Hours.ToString()+"h"}}');
  const node = process.version;
  const dirs = [
    { name: 'OpenClaw Logs', path: LOG_DIR, exists: fs.existsSync(LOG_DIR) },
    { name: 'Config', path: path.join(OPENCLAW_DIR, 'openclaw.json'), exists: fs.existsSync(path.join(OPENCLAW_DIR, 'openclaw.json')) },
    { name: 'Workspace', path: WORKSPACE_DIR, exists: fs.existsSync(WORKSPACE_DIR) },
  ];
  res.json({ node, dirs, uptime: uptime.output });
});

app.get('/api/openclaw/config', (req, res) => {
  try {
    const config = fs.readFileSync(path.join(OPENCLAW_DIR, 'openclaw.json'), 'utf8');
    res.json(JSON.parse(config));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/workspace/list', (req, res) => {
  const dir = req.query.dir || '';
  const target = path.join(WORKSPACE_DIR, dir);
  try {
    const items = fs.readdirSync(target, { withFileTypes: true });
    const result = items.map(item => ({
      name: item.name,
      type: item.isDirectory() ? 'dir' : 'file',
      size: item.isFile() ? fs.statSync(path.join(target, item.name)).size : 0
    }));
    res.json({ directory: target, items: result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== Start =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🦞 龍蝦內視鏡 Log Viewer running at:`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   http://127.0.0.1:${PORT}`);
  console.log(`📁 Logs: ${LOG_DIR}`);
  console.log(`📁 Workspace: ${WORKSPACE_DIR}`);
});
