## Why

KeithclawViewer expose OpenClaw config（包含 Discord token、provider keys）、command execution、workspace files，全部係 sensitive data。目前任何人都可以 access port 3000 / viewer 就見到哂，無任何保護。需要加 login 機制，只有授權用家先睇到內容。

## What Changes

- 新增 OTP login page/modal：撳「Send OTP」先 send code，唔會自動 send
- Session token（30分鐘 expiry），用 cookie 記住 login state
- 未 login 嘅 request redirect 去 login page
- Logout 功能
- 現有 endpoint（/api/...）都要 check session（除 login 相關）

## Capabilities

### New Capabilities
- `session-auth`: OTP-based session authentication，30 分鐘自動 logout

### Modified Capabilities
- (none)

## Impact

- `run-native.js` — 新增 session middleware、login/logout API、OTP-only-not-auto endpoint
- `container/public/index.html` — 新增 login page/modal、Send OTP button
- 現有 OTP delivery 功能（`otp-discord-notify`）重用
