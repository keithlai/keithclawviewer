## Context

Viewer 目前完全無 authentication，任何知道 URL 嘅人都可以睇 OpenClaw config（含 token/keys）、執行 command、read workspace files。需要加 session-based OTP auth，重用現有 Discord OTP delivery。

## Decisions

1. **In-memory session store** — 簡單，viewer 係 single-process，唔需要 Redis/DB
2. **httpOnly cookie** — JS 讀唔到 session token，防 XSS
3. **「Send OTP」 button only** — 唔 auto-send，用家主動撳先 send
4. **30 分鐘 sliding expiry** — 每次 request reset expiry，用緊就 keep alive
5. **Login page 取代 dashboard** — render login.html 或者 inline login modal，唔 redirect 去獨立 page
6. **crypto.randomBytes for session tokens** — 夠 random，唔使 UUID lib

## Risks / Trade-offs

- [In-memory sessions lost on restart] → viewer restart 後全部人 logout，可接受（restart 唔頻密）
- [No rate limiting on send-otp] → 避免 spam，可加 cooldown（e.g. 10s between sends）
- [httpOnly cookie CSRF] → 用 sameSite:lax + JSON POST body 已經夠保護
