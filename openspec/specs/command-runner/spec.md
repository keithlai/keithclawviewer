# command-runner Specification

## Purpose
TBD - created by archiving change command-runner-workspace-browser. Update Purpose after archive.
## Requirements
### Requirement: API MUST execute system commands WITH OTP verification
#### Scenario: POST /api/command/request with body {cmd: "openclaw status"} generates 6-digit OTP, stores it, sends via Discord DM to user
#### Scenario: POST /api/command/verify with body {cmd: "openclaw status", otp: "123456"} validates OTP then executes command
#### Scenario: OTP expires after 120 seconds
#### Scenario: Wrong OTP returns 401, correct OTP removes it after use
#### Scenario: GET /api/command/history returns last 20 executed commands
#### Scenario: API MUST handle long-running commands with timeout (10s default)

### Requirement: UI MUST have Command tab with OTP modal
#### Scenario: Command tab has predefined buttons: openclaw status, gateway restart, doctor, podman ps
#### Scenario: Clicking button shows OTP input modal with "Enter the 6-digit code sent to your Discord"
#### Scenario: OTP input has 6 individual digit fields
#### Scenario: Loading spinner during OTP verification and command execution

