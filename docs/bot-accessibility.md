# Bot Accessibility & Cloudflare Blindspot Detection

## The Problem

Since July 2025, every new Cloudflare domain blocks AI crawlers by default. This means:

- Your `robots.txt` says "allow GPTBot" ✓
- But Cloudflare's firewall returns 403 to GPTBot anyway ✗
- Your site is invisible to ChatGPT, and you don't know it

~20% of the public web sits behind Cloudflare. Vercel has similar AI bot blocking options.

**No other AEO tool detects this.**

## How WebMole Detects It

When you run an audit, WebMole fetches your page with actual AI bot user agents:

- `GPTBot/1.1` (OpenAI training + ChatGPT Search)
- `ClaudeBot/1.0` (Anthropic training)
- `PerplexityBot/1.0` (Perplexity search)

For each bot, WebMole checks:
1. HTTP status code (200 = accessible, 403 = blocked)
2. Response headers for CDN signatures (`cf-ray`, `server: cloudflare`)
3. Compares with your robots.txt rules

If robots.txt allows a bot but the CDN blocks it — that's the **blindspot**.

## API Response

```json
{
  "botAccessibility": {
    "GPTBot": {
      "status": 200,
      "accessible": true,
      "cdnBlocked": false
    },
    "ClaudeBot": {
      "status": 403,
      "accessible": false,
      "cdnBlocked": true,
      "cdn": "cloudflare"
    },
    "PerplexityBot": {
      "status": 200,
      "accessible": true,
      "cdnBlocked": false
    }
  }
}
```

## How to Fix

If WebMole detects Cloudflare blocking:

1. Go to **Cloudflare Dashboard → Security → Bots**
2. Disable "Block AI Bots" or add exceptions for specific bots
3. Re-run the WebMole audit to verify

For Vercel: go to **Project Settings → Security → Attack Challenge Mode** and check AI bot settings.

## PerplexityBot Note

PerplexityBot is known to use rotating IPs and Chrome-like user agents to evade robots.txt blocks. Even if your robots.txt blocks PerplexityBot, they may still crawl your site using stealth techniques. Cloudflare has de-listed PerplexityBot as a "verified bot" and applies blocking heuristics.
