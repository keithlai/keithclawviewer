## Context

龍蝦內視鏡已經可以讀 OpenClaw logs，但 config 同 gateway status 要靠 SSH 入 server 睇。為咗方便 remote debug，將 config content 同 gateway health 直接經 API serve 去 UI。

Config file (`~/.openclaw/openclaw.json`) 係 gateway 主 config，包含 auth tokens、provider keys、channel config。要小心唔好 expose sensitive fields。

## Goals / Non-Goals

**Goals:**
- `/api/openclaw/config` — load & return parsed `openclaw.json`
- `/api/gateway/status` — health check ping gateway `:18789/overview`
- UI 顯示 gateway online/offline status dot
- Admin tab 改名 Monitor，整合 gateway + podman status

**Non-Goals:**
- 唔做 config write-back（read-only）
- 唔做 sensitive fields redaction（控制權交俾 user，via proxy）
- 唔改現有 log viewer 功能

## Decisions

1. **Gateway health check method**
   - `GET http://127.0.0.1:18789/overview` → check HTTP 200
   - Simple & reliable，gateway 已 bind loopback，internal request 唔使 auth
   - Avoid WebSocket connect（太 heavy for a status ping）

2. **Config expose 方式**
   - `fs.readFileSync` + `JSON.parse`，直接 serve 成 JSON
   - No caching — config 可以 hot reload，每次 request 讀最新
   - Sensitive fields（token, apiKey）會 expose，由 nginx/Cloudflare 層控制 access

3. **UI indicator**
   - Plain inline HTML/CSS dot（8px circle），綠色 = Online，灰色 = Offline
   - Polling interval: 15s（`setInterval`），balance 即時性同 overhead
   - 用 `fetch` fallback（唔開 WebSocket），避免 connection overhead

## Risks / Trade-offs

- [Config sensitive data exposure] → 只經 internal/reverse proxy serve，Cloudflare 做 auth gate
- [Gateway restart during poll] → fetch fail = grey dot, next poll auto recover
- [Config file 大] → openclaw.json < 50KB，無 performance concern
