---
id: T-007
epic: EPIC-002
title: Implement User Login Service and API Endpoint
status: todo
priority: high
complexity: M
commits: []
blocked_by: []
blocks:
  - T-012
  - T-013
tags:
  - users
  - auth
  - tokens
  - T-005-create-user-authentication-service
  - T-006-implement-restful-api-endpoints
created_at: 2026-06-07T11:34:19.141Z
updated_at: 2026-06-07T11:34:19.141Z
arch_layer: api
risk_level: high
requires_migration: false
requires_env_var: []
test_strategy: integration
depends_on:
  - T-005
  - T-008
  - ADR-001
---

# Implement User Login Service and API Endpoint

## Description
Develop the backend service and API endpoint for user login, handling credential verification and JWT generation.

## Acceptance Criteria
- [ ] A POST `/api/login` endpoint is implemented.
- [ ] Endpoint verifies user credentials against stored password hashes.
- [ ] Upon successful login, a short-lived access token and a long-lived http-only refresh token are generated.
- [ ] Access token is returned in the response body; refresh token is set as an http-only cookie.
- [ ] Appropriate error responses (401 Unauthorized) for invalid credentials.

## Linked Modules
- `users`
- `auth`
- `tokens`
- `T-005-create-user-authentication-service`
- `T-006-implement-restful-api-endpoints`
