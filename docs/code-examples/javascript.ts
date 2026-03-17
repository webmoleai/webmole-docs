// WebMole AEO Audit — JavaScript/TypeScript example

interface AuditResult {
  url: string
  score: number
  categories: {
    answerReadiness: number
    structure: number
    authoritySignals: number
    technicalGEO: number
  }
  factors: Array<{
    id: number
    name: string
    score: number
    max: number
    status: 'pass' | 'warn' | 'fail'
    details: string
  }>
  fixSuggestions: Array<{
    factorId: number
    factorName: string
    impact: 'High' | 'Medium' | 'Low'
    instruction: string
    codeBlock?: string
  }>
  botAccessibility: Record<string, {
    status: number
    accessible: boolean
    cdnBlocked: boolean
    cdn?: string
  }>
  scannedAt: string
  rateLimit: { remaining: number; limit: number; resetAt: string }
}

// Basic audit
async function auditUrl(url: string, apiKey: string): Promise<AuditResult> {
  const res = await fetch('https://webmole.ai/api/v1/audit', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(`WebMole API error: ${error.error?.message || res.statusText}`)
  }

  return res.json()
}

// Usage
const result = await auditUrl('https://example.com', 'wbm_your_api_key')
console.log(`Score: ${result.score}/100`)
console.log(`Top fix: ${result.fixSuggestions[0]?.instruction}`)

// Check if bots can access the page
for (const [bot, status] of Object.entries(result.botAccessibility)) {
  if (status.cdnBlocked) {
    console.warn(`${bot} is blocked by ${status.cdn} CDN — robots.txt alone won't fix this`)
  }
}
