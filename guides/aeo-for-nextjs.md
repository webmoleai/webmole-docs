# AEO for Next.js — Set Up AI Search Optimization

## 1. Add JSON-LD Schema to layout.tsx

```tsx
// src/app/layout.tsx
const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Your Company',
  url: 'https://yoursite.com',
  logo: 'https://yoursite.com/logo.png',
}

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

## 2. Add FAQ Schema to Content Pages

```tsx
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does your product do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A direct, 25-word answer that AI engines can quote.',
      },
    },
  ],
}
```

72.4% of ChatGPT-cited pages use answer capsules — short, direct answers under question headings.

## 3. Create robots.txt That Allows AI Bots

```ts
// src/app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/dashboard', '/api/', '/auth/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
    ],
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}
```

**Warning:** If you use Cloudflare, your CDN may block AI bots even when robots.txt allows them. Use [WebMole's free audit](https://webmole.ai/free-audit) to check.

## 4. Add llms.txt

Create `public/llms.txt`:
```markdown
# Your Product Name

> One-line description of what you do.

## Docs
- [API Reference](https://yoursite.com/docs)

## Guides
- [Getting Started](https://yoursite.com/docs/quickstart)
```

## 5. Check Your Score

```bash
npx @webmole/cli audit https://yoursite.com
```

Or use the [free web audit](https://webmole.ai/free-audit) — no signup needed.
