## Context

Command tab 有 OTP verification UI 同 API endpoint，但 `sendOTPviaDiscord()` 從來無真正 call Discord API — 只係 `console.log` 完就 `return true`，用家永遠收唔到 OTP。

## Decisions

1. **Discord REST API over WebSocket** — 簡單 direct call，唔需要 OpenClaw gateway 介入
2. **Read token from openclaw.json** — token 已經喺 config，避免 hardcode 或額外 config
3. **File logging** — viewer 用 Start-Process 起，console.log 唔易睇，寫 file log 方便 debug
4. **No retry logic** — OTP 120s expiry，若果 send fail 就直接叫用家 retry

## Risks / Trade-offs

- [Token exposure] → token 喺 memory 同埋行緊 viewer process 嘅 env，但已有既 config 都係咁
- [Discord rate limit] → 每 request 一個 OTP，rate limit 好寬鬆，唔擔心
