# What is AEO (Answer Engine Optimization)?

AEO is the practice of structuring your content so AI systems — ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini — cite your pages when users ask relevant questions.

Unlike SEO, which targets ranking in a list, AEO targets the citation decision made by a language model.

## AEO vs SEO

| | SEO | AEO |
|---|---|---|
| Target | Google search rankings | AI-generated answers |
| Signal | Backlinks, keywords, page speed | Schema markup, answer capsules, content clarity |
| Metric | Position 1-10 | Cited / not cited |
| Tool | Ahrefs, Semrush | WebMole |

A page can rank #1 on Google and get zero AI citations. They're separate systems.

## The 12 Factors AI Engines Check

WebMole scores pages across 12 factors:

1. **Header Hierarchy** — H1→H2→H3 nesting, no skipped levels
2. **Answer Capsules** — 40-60 word direct answers placed after H2 headings
3. **Section Lengths** — paragraphs sized for AI extraction (100-180 words)
4. **FAQ Sections** — FAQPage schema or Q&A structured headings
5. **Statistics Density** — data points, percentages, specific numbers
6. **Source Citations** — outbound links to authoritative sources
7. **Schema Markup (JSON-LD)** — structured data tells AI what your page is about
8. **Meta Tags** — title, description, Open Graph, canonical
9. **Content Front-Loading** — key information in the first 30% of the page
10. **AI Bot Access** — robots.txt allows GPTBot, ClaudeBot, PerplexityBot
11. **Readability** — sentence length averaging 15-20 words
12. **Lists and Tables** — structured content elements AI can parse

## Check Your Score

Free audit, no signup: [webmole.ai/free-audit](https://webmole.ai/free-audit)

Or via API:
```bash
curl -X POST https://webmole.ai/api/v1/audit \
  -H "Authorization: Bearer wbm_your_api_key" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-site.com"}'
```
