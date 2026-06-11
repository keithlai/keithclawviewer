# api-routing Specification

## ADDED Requirements

### Requirement: Books server MUST proxy viewer API routes
#### Scenario: /api/gateway/* → proxy to localhost:3000
#### Scenario: /api/logs → proxy to localhost:3000
#### Scenario: /api/system/* → proxy to localhost:3000
#### Scenario: /api/openclaw/* → proxy to localhost:3000
#### Scenario: /api/command/* → proxy to localhost:3000
#### Scenario: /api/workspace/* → proxy to localhost:3000
#### Scenario: /api/podman/* → proxy to localhost:3000

### Requirement: Nginx MUST route viewer API before gateway catch-all
#### Scenario: viewer API routes defined before generic /api/ location block
#### Scenario: Same 7 route prefixes as books server
#### Scenario: Generic /api/ catch-all remains for gateway (port 18789)

### Requirement: books server proxy MUST handle errors gracefully
#### Scenario: Viewer unavailable → return 502 with JSON error message
#### Scenario: Response headers include Content-Type application/json
