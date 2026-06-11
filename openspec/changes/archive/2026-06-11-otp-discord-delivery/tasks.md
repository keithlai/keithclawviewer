## 1. Implement sendOTPviaDiscord

- [x] 1.1 Replace stub with real Discord API call
- [x] 1.2 Read token from openclaw.json
- [x] 1.3 Create DM channel via REST API
- [x] 1.4 Send OTP message with code + command + expiry

## 2. Add Logging

- [x] 2.1 Add `otp-send.log` file logger
- [x] 2.2 Log token discovery, API status, error details

## 3. Verification

- [x] 3.1 POST /api/command/request returns otp_sent:true
- [x] 3.2 Check otp-send.log: DM channel created (200)
- [x] 3.3 Check otp-send.log: send status 200
- [ ] 3.4 用家 Discord 實際收到 OTP DM

## 4. Git & Archive

- [ ] 4.1 Git add + commit
- [ ] 4.2 Push to GitHub
- [ ] 4.3 Archive change
