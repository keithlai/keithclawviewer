## 1. Backend API

- [ ] 1.1 Add POST /api/command/request route — generates 6-digit OTP, stores in memory with expiry
- [ ] 1.2 Add Discord DM sender — sends OTP to user via Discord
- [ ] 1.3 Add POST /api/command/verify route — validates OTP, executes command, returns stdout/stderr
- [ ] 1.4 Add OTP expiry (120s) + auto-cleanup
- [ ] 1.5 Add command history buffer (max 20 entries)
- [ ] 1.6 Add GET /api/command/history route
- [ ] 1.7 Add GET /api/workspace/read route with path validation
- [ ] 1.8 Implement markdown-to-HTML conversion helper
- [ ] 1.9 Add error handling for file not found / command timeout / wrong OTP
- [ ] 1.10 Test all API endpoints

## 2. UI — Command Runner Tab

- [ ] 2.1 Add new "⚡ Command" tab to tab bar
- [ ] 2.2 Add predefined buttons: openclaw status, gateway restart, doctor, podman ps, git status
- [ ] 2.3 Click button → OTP input modal (6 individual digit fields)
- [ ] 2.4 OTP modal: "Enter the 6-digit code sent to your Discord"
- [ ] 2.5 Submit OTP → verify via API → show terminal-style output
- [ ] 2.6 Add terminal-style output display (monospace, stderr in red)
- [ ] 2.7 Add custom command input field
- [ ] 2.8 Add loading spinner during OTP verification + command execution

## 3. UI — Workspace Deep Browser

- [ ] 3.1 Update workspace tab with file tree view
- [ ] 3.2 Click file to load and preview content
- [ ] 3.3 Render markdown files as formatted HTML
- [ ] 3.4 Show memory/ directory with date entries
- [ ] 3.5 Add search within file content

## 4. Implement with Claude Code

- [ ] 4.1 Run Claude Code to implement backend changes
- [ ] 4.2 Run Claude Code to implement frontend changes
- [ ] 4.3 Test full flow end-to-end

## 5. Archive

- [ ] 5.1 Git add + commit all changes
- [ ] 5.2 Git push
- [ ] 5.3 OpenSpec archive
