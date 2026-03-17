# Quick Start: Your First AEO Audit in 60 Seconds

## Step 1: Get an API Key

Sign up at [webmole.ai](https://webmole.ai), go to **Dashboard → Settings → API Keys**, click **Generate API Key**. Copy the key (starts with `wbm_`).

## Step 2: Run Your First Audit

```bash
curl -X POST https://webmole.ai/api/v1/audit \
  -H "Authorization: Bearer wbm_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-site.com"}'
```

## Step 3: Read the Response

The API returns:
- **score** (0-100): your overall AI citation readiness
- **factors**: 12 individual checks with pass/fail status
- **fixSuggestions**: prioritized fixes with copy-paste code blocks

A score below 60 means AI search engines are likely passing over your content. Above 70 means your foundation is solid.

## Step 4: Apply Fixes

Each fix suggestion includes an `instruction` (what to do) and often a `codeBlock` (what to paste):

```json
{
  "instruction": "Add FAQ schema to your page",
  "codeBlock": "<script type=\"application/ld+json\">\n{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",...}\n</script>"
}
```

## Step 5: Set Up Monitoring (Optional)

### CLI
```bash
npm install -g @webmole/cli
webmole config set key wbm_your_api_key
webmole watch https://your-site.com --interval 6h
```

### CI/CD Gate
```bash
webmole audit https://your-site.com --threshold 70
# Exits with code 1 if score drops below 70
```

## Free Audit (No Key Needed)

For a one-off check without an API key, use [webmole.ai/free-audit](https://webmole.ai/free-audit).
