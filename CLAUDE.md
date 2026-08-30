# Mehdi Boudar — career workspace

This folder is the single source of truth for how Mehdi is presented anywhere: the
portfolio site, the LaTeX CVs, LinkedIn, and any application material. Read this file
before writing a word of career copy.

## Positioning — read this before writing any title or summary

Mehdi is **not** "an AI application engineer". That framing describes about a third of
what he does and undersells the rest.

**He is the sole developer at Voom Digital** — the entire engineering function for an
agency serving 10+ enterprise tenants. He is an employee. The messaging platform was
already running when he arrived; he overhauled it and is now completely responsible for
it. Never write "owns the platform", "sole owner" or "founded" — write "sole developer",
"responsible for", "overhauled". Overclaiming is the one thing that would sink an
otherwise verifiable CV.

He is responsible, end to end, for:

1. **The messaging platform** — a running but failing chat product he overhauled into
   something clients will work in. This is the strongest story he has and it is
   currently buried. See `ChatIntanceMdfilesForInformation/` for the documented
   before-state.
2. **The AI** — a multi-tenant conversational platform designed, built and tested
   alone. See `AIProjectDoneByMeAlone/`.
3. **Integrations** — Meta WhatsApp Cloud API, Zoho, Salesforce, custom Vercel webhooks,
   CRM functions and workflows, end-to-end flow cycles.
4. **Client web** — model pages, full redesigns, animation work, CMS migration.
5. **Infrastructure and delivery** — Docker, Railway, DNS, backup and rollback, plus
   presenting the platform to clients directly.

The honest label is closer to **platform / solutions engineer who builds AI**, or
**product engineer**, than to "AI engineer". Lead with ownership and outcomes.

**The stack is Java/Spring, not Python — say so.** Production LLM work inside a Java
estate is rare and valuable to enterprises already running Java. Do not hide Java to
look more "AI"; that trades a rare niche for a crowded one.

## Canonical facts

Never contradict these. They were reconciled after the CVs and LinkedIn were found to
disagree in six places.

| Fact | Value |
| --- | --- |
| Voom Digital | **Jan 2026 – Present**, Casablanca, hybrid |
| Orange Morocco | Mar – Sep 2025, final-year project |
| Lanoria Club | 2024 |
| YOS Études | 2023 |
| Ministry of National Education | 2022 |
| ISTA NTIC | Associate Degree / Diplôme de Technicien Spécialisé |
| EMSI Rabat | State Engineering degree, 2022–2025 |
| Tests | 2,645+ |
| Reliability | 99.9% uptime, 100+ webhooks/sec |
| Scale | 10+ tenants, 8 channels, 500k imports <10 min, 100k broadcast <30 min |
| Unit economics | $0.10–0.60 per conversation |
| Conversion | 2× lead-to-visit vs human baseline (58% vs 30%) |

There is **no freelance role**. It was removed from every surface; Lanoria Club occupies
that period.

## Rules

**Confidentiality.** Several clients are NDA work and must never be named, shown or
linked on the public portfolio; describe them generically and flag the work as
NDA-covered. The chat platform's product name is fine on CVs but must not appear on the
portfolio. The actual terms live in `.claude/redactions.txt`, which is gitignored —
**this repo has a public remote, so the list of confidential clients cannot itself be
committed.** Read that file before writing client-facing copy.

**Never ship a dead link.** Every outbound URL must return 200 before deploy. drivy.ma
and the private GitHub MCP repo were both removed for failing this.

**Register.** Factual and credential-forward. No self-deprecating or cute phrasing —
that was explicitly rejected. Visual design may be expressive; wording may not.

**CVs stay one page.** Sources are `*.tex` in this folder, compiled by Mehdi in
Overleaf. There is no local TeX toolchain, so page count cannot be verified here —
measure *rendered* length instead (strip LaTeX markup, diff visible characters against
the pre-edit file, stay within ~±0.5%). Pay for additions by cutting elsewhere.

**OneDrive sync has silently reverted edits mid-session.** Re-audit key facts after any
gap rather than trusting earlier edits.

## Layout

| Path | What it is |
| --- | --- |
| `app/`, `components/`, `content/` | The Next.js portfolio. Content lives in typed modules in `content/`, never inline in JSX. |
| `*.tex` | CV sources, untracked and gitignored. `AIEngineer_MehdiBoudar_Cv copy.tex` is the pristine pre-edit backup. |
| `AIProjectDoneByMeAlone/` | Ground truth for the AI platform. |
| `ChatIntanceMdfilesForInformation/` | Ground truth for the messaging platform, including its broken before-state. |
| `scripts/capture.mjs` | Screenshots live products into `public/captures/`. NDA client URLs must never be added. |
| `scripts/review.mjs` | Local visual review of the built site. |

## Before deploying

```bash
npx next build                          # must compile with no type errors
bash scripts/publish-check.sh           # confidentiality sweep of the build
npx vercel --prod --yes
bash scripts/publish-check.sh https://mehdiboudar.com   # re-sweep + link check
```

The script reads its patterns from `.claude/redactions.txt` and exits non-zero on any
redacted term or any outbound link that does not return 200.

## Keeping this current

When Mehdi describes new work in any session, record it — use the `career-log` skill in
`.claude/skills/`. Facts that belong to the long-term picture go in memory; facts that
change the public story go here and into `content/`.
