## 1. Config Reader API

- [x] 1.1 Add `/api/openclaw/config` route to `run-native.js` — read + parse `openclaw.json`
- [x] 1.2 Handle file read error (500 + error message)

## 2. Gateway Status Monitor API

- [x] 2.1 Add `/api/gateway/status` route — HTTP GET `:18789/overview`, return color + status
- [x] 2.2 Handle timeout / fetch error gracefully

## 3. UI Updates

- [x] 3.1 Add gateway status indicator HTML (dot + label) to app bar
- [x] 3.2 Add `checkGatewayStatus()` JS function (poll every 15s)
- [x] 3.3 Rename Admin tab to Monitor
- [x] 3.4 Wire up `checkGatewayStatus()` on page load + interval

## 4. Verification

- [x] 4.1 Start viewer: `node run-native.js`
- [x] 4.2 Test `/api/openclaw/config` returns valid JSON
- [x] 4.3 Test `/api/gateway/status` returns `{color:"green", status:"Online"}`
- [x] 4.4 Open UI at `http://localhost:3000`, verify status dot shows green
- [x] 4.5 Stop gateway, verify dot turns grey + label "Offline"
- [x] 4.6 Restart gateway, verify dot recovers to green within 15s

## 5. Git & Archive

- [x] 5.1 Git add + commit all changes
- [x] 5.2 Push to GitHub
- [x] 5.3 Run `openspec archive config-log-viewer` to archive change and merge specs
