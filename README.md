# WebMole — AEO API Documentation

> Score any URL for AI citation readiness. Get fixes you can paste.

WebMole monitors how your brand appears in AI search (ChatGPT, Perplexity, Gemini, Claude) and tells you exactly how to fix it. The only self-serve AEO API under $100/mo.

## Quick Start

```bash
curl -X POST https://webmole.ai/api/v1/audit \
  -H "Authorization: Bearer wbm_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

Returns:
```json
{
  "score": 74,
  "categories": {
    "answerReadiness": 80,
    "structure": 70,
    "authoritySignals": 65,
    "technicalGEO": 80
  },
  "factors": [
    { "id": 7, "name": "Schema Markup (JSON-LD)", "score": 10, "max": 10, "status": "pass" },
    { "id": 8, "name": "Meta Tags", "score": 0, "max": 8, "status": "fail" }
  ],
  "fixSuggestions": [
    {
      "factorId": 8,
      "factorName": "Meta Tags",
      "impact": "High",
      "instruction": "Add a concise meta description (120-160 chars).",
      "codeBlock": "<meta name=\"description\" content=\"Your page summary here.\" />"
    }
  ]
}
```

## Documentation

| Doc | Description |
|-----|-------------|
| [API Reference](docs/api-reference.md) | Endpoint, auth, request/response schema, rate limits, errors |
| [Quick Start](docs/quickstart.md) | First audit in 60 seconds |
| [Code Examples](docs/code-examples/) | curl, JavaScript, Python, GitHub Actions |
| [Bot Accessibility](docs/bot-accessibility.md) | Cloudflare blindspot detector |

## Guides

| Guide | Description |
|-------|-------------|
| [What is AEO?](guides/what-is-aeo.md) | Answer Engine Optimization primer |
| [AEO for Next.js](guides/aeo-for-nextjs.md) | JSON-LD, llms.txt, robots.txt setup |
| [CI/CD Integration](guides/ci-cd-integration.md) | GitHub Actions gate on AEO score |

## Pricing

| Plan | Price | API Requests/Day | Keywords | AI Engines |
|------|-------|:----------------:|:--------:|:----------:|
| Free Audit | $0 | Web only | — | — |
| Starter | $29/mo | 100 | 15 | 2 |
| Pro | $49/mo | 500 | 30 | 3 |
| Agency | $99/mo | 2,000 | 100 | 3 |

All paid plans include: API access, fix suggestions with code blocks, JSON-LD generator, email alerts.

## Agent Integration

- [OpenAPI Spec](openapi.json) — machine-readable API definition
- [AGENTS.md](AGENTS.md) — instructions for AI coding agents
- [context7.json](context7.json) — Context7 library config
- [agents.json](.well-known/agents.json) — multi-step flow description
- [llms.txt](llms.txt) — LLM-readable site summary
- [llms-full.txt](llms-full.txt) — complete product reference (5,000+ words)

## Links

- **Product:** [webmole.ai](https://webmole.ai)
- **Free Audit:** [webmole.ai/free-audit](https://webmole.ai/free-audit) — no signup required
- **API Docs (web):** [webmole.ai/docs](https://webmole.ai/docs)
- **For Developers:** [webmole.ai/for/developers](https://webmole.ai/for/developers)
- **CLI:** `npm install -g @webmole/cli`
