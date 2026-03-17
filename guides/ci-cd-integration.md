# CI/CD Integration — Gate Deploys on AEO Score

## Why

If your AEO score drops after a deploy, AI search engines may stop citing your pages. Adding an AEO check to CI/CD catches regressions before they ship.

## Option 1: CLI in Any CI

```bash
npm install -g @webmole/cli
webmole audit https://your-site.com --threshold 70
```

Exit code 1 if score drops below 70. Works in GitHub Actions, GitLab CI, CircleCI, Jenkins — anything that runs bash.

## Option 2: GitHub Actions (curl)

```yaml
name: AEO Audit
on: [pull_request]
jobs:
  aeo-check:
    runs-on: ubuntu-latest
    steps:
      - name: Run AEO Audit
        run: |
          SCORE=$(curl -s -X POST https://webmole.ai/api/v1/audit \
            -H "Authorization: Bearer ${{ secrets.WEBMOLE_API_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{"url": "${{ secrets.SITE_URL }}"}' | jq '.score')
          echo "AEO Score: $SCORE"
          [ "$SCORE" -ge 70 ] || exit 1
```

## Option 3: Watch Mode (Monitoring)

```bash
webmole watch https://your-site.com --interval 6h --json
```

Runs continuously, outputs newline-delimited JSON. Diffs score and factor statuses between runs.

## What to Set as Threshold

- **70+**: solid foundation, AI engines can cite you
- **50-69**: some issues, might get skipped for better-optimized competitors
- **Below 50**: significant gaps, likely invisible to AI search
