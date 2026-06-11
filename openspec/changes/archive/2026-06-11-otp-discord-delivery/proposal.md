## Why

OTP command execution 嘅 Discord DM 從來無真正發出 — `sendOTPviaDiscord()` 係 stub，只做 `console.log`，無 call Discord API。

## What Changes

- 實現 `sendOTPviaDiscord()`: 讀 openclaw.json 嘅 Discord bot token → 開 DM channel → send OTP code
- 加 file-based logging (`~/.openclaw/logs/otp-send.log`) 方便 debug
- 錯誤處理: config 唔存在 / token 唔存在 / Discord API error 都有 log

## Capabilities

### New Capabilities
- `otp-discord-notify`: 經 Discord Bot API 發送 OTP code 俾用家

### Modified Capabilities
- (none)

## Impact

- `run-native.js` — `sendOTPviaDiscord()` 從 stub 變 real implementation
- `~/.openclaw/logs/otp-send.log` — 新 log file
- 依賴: Discord bot token（已喺 config 入面）
