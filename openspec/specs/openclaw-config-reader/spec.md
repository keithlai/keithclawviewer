# openclaw-config-reader Specification

## Purpose
TBD - created by archiving change config-log-viewer. Update Purpose after archive.
## Requirements
### Requirement: API MUST expose OpenClaw config as JSON
#### Scenario: GET /api/openclaw/config 回傳 parsed openclaw.json
#### Scenario: Response status 200 表示成功
#### Scenario: File read error 回傳 500 + error message

### Requirement: Config MUST be read from ~/.openclaw/openclaw.json
#### Scenario: Hardcoded path OPENCLAW_DIR = "C:\\Users\\Administrator\\.openclaw"
#### Scenario: Config file path = path.join(OPENCLAW_DIR, "openclaw.json")

### Requirement: API MUST be read-only
#### Scenario: 唔支援 write-back（PATCH/POST 唔需要）
#### Scenario: 每次 request 都 read from disk（no caching）

