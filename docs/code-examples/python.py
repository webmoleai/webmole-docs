# WebMole AEO Audit — Python example

import os
import requests

API_KEY = os.environ.get("WEBMOLE_API_KEY", "wbm_your_api_key")

def audit_url(url: str) -> dict:
    """Run an AEO audit on a URL. Returns score, factors, and fix suggestions."""
    response = requests.post(
        "https://webmole.ai/api/v1/audit",
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        json={"url": url},
    )
    response.raise_for_status()
    return response.json()


# Basic usage
result = audit_url("https://example.com")
print(f"Score: {result['score']}/100")

# Print fix suggestions
for fix in result["fixSuggestions"]:
    print(f"[{fix['impact']}] {fix['instruction']}")
    if fix.get("codeBlock"):
        print(f"  Code: {fix['codeBlock'][:80]}...")

# Check bot accessibility
for bot, status in result.get("botAccessibility", {}).items():
    if status.get("cdnBlocked"):
        print(f"WARNING: {bot} blocked by {status.get('cdn', 'CDN')} — fix in CDN settings")

# CI/CD gate
if result["score"] < 70:
    print(f"FAIL: AEO score {result['score']} is below threshold 70")
    exit(1)
print(f"PASS: AEO score {result['score']}")
