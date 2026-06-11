## 1. Session Infrastructure

- [ ] 1.1 Add in-memory session store（Map<token, {expiresAt}>）
- [ ] 1.2 Add session middleware（check cookie, validate, reject non-auth routes）
- [ ] 1.3 Add `/api/auth/send-otp` endpoint（trigger Discord DM, no auto-send）
- [ ] 1.4 Add `/api/auth/verify-otp` endpoint（validate OTP, create session, set cookie）
- [ ] 1.5 Add `/api/auth/logout` endpoint（clear session + cookie）
- [ ] 1.6 Add `/api/auth/status` endpoint（check if logged in）

## 2. Login UI

- [ ] 2.1 Add login page/modal with「Send OTP」button
- [ ] 2.2 Add OTP input（6-digit, auto-advance fields, reuse existing UI）
- [ ] 2.3 Wire: send OTP → DM → enter code → verify → show dashboard
- [ ] 2.4 Wire: logout button in app bar
- [ ] 2.5 Wire: expired session → redirect to login

## 3. Protect Existing Routes

- [ ] 3.1 Static files（index.html, assets）behind session middleware
- [ ] 3.2 All /api/* （except /api/auth/*）behind session middleware
- [ ] 3.3 Return 401 + redirect for unauthenticated requests

## 4. Verification

- [ ] 4.1 Visit `/` → see login page, not dashboard
- [ ] 4.2 Click「Send OTP」→ receive DM
- [ ] 4.3 Enter correct OTP → see dashboard
- [ ] 4.4 Refresh page → still logged in
- [ ] 4.5 Wait 30+ min（or short expiry for testing）→ redirected to login
- [ ] 4.6 Click logout → redirected to login

## 5. Git & Archive

- [ ] 5.1 Git add + commit
- [ ] 5.2 Push to GitHub
- [ ] 5.3 Archive change
