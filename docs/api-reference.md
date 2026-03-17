# WebMole API Reference

## Endpoint

```
POST https://webmole.ai/api/v1/audit
```

## Authentication

All requests require a Bearer token:

```
Authorization: Bearer wbm_your_api_key
```

Generate your key at [webmole.ai/dashboard/settings](https://webmole.ai/dashboard/settings). Keys start with `wbm_`.

## Request

```json
{
  "url": "https://example.com/your-page"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | Yes | Fully qualified URL to audit (https://...). Max 2048 chars. Private/internal IPs rejected. |

## Response (200 OK)

```json
{
  "url": "https://example.com",
  "score": 74,
  "categories": {
    "answerReadiness": 80,
    "structure": 70,
    "authoritySignals": 65,
    "technicalGEO": 80
  },
  "factors": [
    {
      "id": 7,
      "name": "Schema Markup (JSON-LD)",
      "score": 10,
      "max": 10,
      "status": "pass",
      "details": "Valid JSON-LD found with @type Organization"
    },
    {
      "id": 8,
      "name": "Meta Tags",
      "score": 0,
      "max": 8,
      "status": "fail",
      "details": "No meta description found"
    }
  ],
  "fixSuggestions": [
    {
      "factorId": 8,
      "factorName": "Meta Tags",
      "impact": "High",
      "instruction": "Add a concise meta description (120-160 chars) summarising the page.",
      "codeBlock": "<meta name=\"description\" content=\"Your page summary here.\" />"
    }
  ],
  "botAccessibility": {
    "GPTBot": { "status": 200, "accessible": true, "cdnBlocked": false },
    "ClaudeBot": { "status": 403, "accessible": false, "cdnBlocked": true, "cdn": "cloudflare" },
    "PerplexityBot": { "status": 200, "accessible": true, "cdnBlocked": false }
  },
  "scannedAt": "2026-03-17T12:00:00.000Z",
  "rateLimit": {
    "remaining": 99,
    "limit": 100,
    "resetAt": "2026-03-18T00:00:00.000Z"
  }
}
```

## Rate Limits

| Plan | Requests/Day | Price |
|------|:------------:|-------|
| Free | No API access | $0 (web audit only) |
| Starter | 100 | $29/mo |
| Pro | 500 | $49/mo |
| Agency | 2,000 | $99/mo |

Limits reset at midnight UTC. Response headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 2026-03-18T00:00:00.000Z
```

## Error Responses

All errors return JSON:
```json
{
  "error": {
    "code": "rate_limited",
    "message": "Daily limit of 100 requests reached. Resets at 2026-03-18T00:00:00.000Z."
  }
}
```

| HTTP Status | Code | Meaning |
|:-----------:|------|---------|
| 401 | unauthorized | Missing or invalid API key |
| 400 | invalid_body / invalid_url | Request body is malformed or URL is not valid/reachable |
| 429 | rate_limited | Daily request limit reached. Check Retry-After header. |
| 500 | score_failed | Internal error. Retry once — if it persists, contact support. |

## The 12 AEO Factors

WebMole scores pages across 12 weighted factors:

| ID | Factor | Max Score |
|:--:|--------|:---------:|
| 1 | Header Hierarchy | 10 |
| 2 | Answer Capsules | 10 |
| 3 | Section Lengths | 8 |
| 4 | FAQ Sections | 8 |
| 5 | Statistics Density | 8 |
| 6 | Source Citations | 8 |
| 7 | Schema Markup (JSON-LD) | 10 |
| 8 | Meta Tags | 8 |
| 9 | Content Front-Loading | 8 |
| 10 | AI Bot Access | 8 |
| 11 | Readability | 7 |
| 12 | Lists and Tables | 5 |

Each factor returns: `id`, `name`, `score`, `max`, `status` (pass/warn/fail), `details`.
