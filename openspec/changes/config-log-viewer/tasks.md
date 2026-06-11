## 1. Config Reader API

- [ ] 1.1 Add `/api/openclaw/config` route to `run-native.js` — read + parse `openclaw.json`
- [ ] 1.2 Handle file read error (500 + error message)

## 2. Gateway Status Monitor API

- [ ] 2.1 Add `/api/gateway/status` route — HTTP GET `:18789/overview`, return color + status
- [ ] 2.2 Handle timeout / fetch error gracefully

## 3. UI Updates

- [ ] 3.1 Add gateway status indicator HTML (dot + label) to app bar
- [ ] 3.2 Add `checkGatewayStatus()` JS function (poll every 15s)
- [ ] 3.3 Rename Admin tab to Monitor
- [ ] 3.4 Wire up `checkGatewayStatus()` on page load + interval

## 4. Verification

- [ ] 4.1 Start viewer: `node run-native.js`
- [ ] 4.2 Test `/api/openclaw/config` returns valid JSON
- [ ] 4.3 Test `/api/gateway/status` returns `{color:"green", status:"Online"}`
- [ ] 4.4 Open UI at `http://localhost:3000`, verify status dot shows green
- [ ] 4.5 Stop gateway, verify dot turns grey + label "Offline"
- [ ] 4.6 Restart gateway, verify dot recovers to green within 15s

## 5. Git & Archive

- [ ] 5.1 Git add + commit all changes
- [ ] 5.2 Push to GitHub
- [ ] 5.3 Run `openspec archive config-log-viewer` to archive change and merge specs
