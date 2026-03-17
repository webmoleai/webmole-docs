#!/bin/bash
# WebMole AEO Audit — curl example

# Basic audit
curl -X POST https://webmole.ai/api/v1/audit \
  -H "Authorization: Bearer wbm_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Pretty-print the response
curl -s -X POST https://webmole.ai/api/v1/audit \
  -H "Authorization: Bearer $WEBMOLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' | jq .

# Just the score
curl -s -X POST https://webmole.ai/api/v1/audit \
  -H "Authorization: Bearer $WEBMOLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' | jq '.score'

# CI/CD gate — exit 1 if score below threshold
SCORE=$(curl -s -X POST https://webmole.ai/api/v1/audit \
  -H "Authorization: Bearer $WEBMOLE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}' | jq '.score')

if [ "$SCORE" -lt 70 ]; then
  echo "AEO score $SCORE is below threshold 70"
  exit 1
fi
echo "AEO score $SCORE — passed"
