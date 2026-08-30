---
name: job-hunt-run
description: Use when Mehdi asks for a job search, roles to apply to, a new search round, or says he is ready to apply again. Runs a full search pass, ranks roles against work he has actually shipped, and publishes an updated application board with reply and interview priors.
---

# Running a search round

This repeats. Each round should be better than the last because the previous round's
outcomes are recorded in `career/applications.md` — read that first, always.

## Step 1 — read the record before searching

- `career/applications.md` — what was sent last time and what came back.
- The `ats-keyword-floor` and `mehdi-professional-scope` memories.
- If any channel underperformed its prior by more than ~10 points across 5+ touches,
  down-weight it this round and say so. If one overperformed, send more there.

## Step 2 — search

Use the ScrapeCreators Google endpoint (`scrapecreators-api` skill). One credit per query,
so 8–14 queries per round is the right budget. Check remaining credits in any response's
`credits_remaining` field.

```bash
curl -s -G "https://api.scrapecreators.com/v1/google/search" \
  --data-urlencode "query=<query>" -H "x-api-key: $SCRAPECREATORS_API_KEY"
```

Cover these segments; vary the wording each round or you get the same results back:

- EU-remote Java/Spring + LLM
- The WhatsApp BSP vendors (360dialog, Infobip, respond.io, Wati, Sinch, Gupshup)
- MCP / Model Context Protocol named in postings
- "AI Solutions Engineer" and adjacent titles
- Gulf: WhatsApp Business API, CRM integration
- Rails + AI, which is the one place the Chatwoot work counts twice

`site:` filters against linkedin.com/jobs, wellfound.com and weworkremotely.com return
individual postings rather than board index pages. Prefer them.

## Step 3 — rank honestly

Score against what he has *shipped*, never against keywords alone. A role earns the top
tier only if the posting names something already on his CV as a requirement.

Then assign a reply and interview prior per role. Priors come from the channel table in
the Pipeline Calibration artifact, adjusted for:

- **Location gating.** Rabat-based. Anything requiring EEA authorisation without
  sponsorship is discounted hard — that is the real filter, not skills.
- **Brand volume.** Known-brand product companies get enormous applicant volume; the
  niche match does not overcome it.
- **Org size.** Small companies and talent networks reply far more.

State the priors as predictions and say what would falsify them.

## Step 4 — publish

Update the existing **Application Run** artifact by republishing the same file path;
do not create a new one each round. Add the round's date. Keep the tick-state markup
(`data-id` on each role) stable so his progress survives.

Then append the round to `career/applications.md` via the `application-log` skill.

## What not to do

- Do not invent postings or infer a URL. Every link is verified 200 before it ships —
  a dead link in front of a recruiter costs more than the role was worth.
- Do not pad the list. Fourteen real matches beat forty generic ones, and he applies
  manually, so every weak entry costs him time.
- Do not present priors as measurements.
