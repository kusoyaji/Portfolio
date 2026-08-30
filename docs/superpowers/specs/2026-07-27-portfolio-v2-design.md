# Portfolio v2 — Design

Date: 2026-07-27
Status: Approved
Branch: `redesign/portfolio-v2`

## Goal

Replace the current Astro portfolio with a rebuilt site that persuades two different
readers at once: a non-technical recruiter who judges on look and legibility within
seconds, and a technical lead who wants evidence of depth. Deploy to
`mehdiboudar.com`.

The site must also surface work that appears in none of the existing CVs — official
Meta WhatsApp coexistence, CTWA webhook context injection, CRM widgets, and
chatbot-to-prospect sync.

## Naming constraint

The open-source chat platform the work is built on must never appear by name in any
public-facing copy — site, CV, meta tags, alt text, image filenames, commit messages
on public branches. Refer to it as "the chat platform", "the omnichannel inbox", or
"our conversation layer". This also applies to the MCP server built against it: it is
an "18-tool chat-platform MCP server", never named.

The previous Astro site violated this in `src/components/Projects.astro`. That copy is
removed as part of this work.

## Stack

- Next.js 16, App Router, TypeScript, statically prerendered
- Tailwind v4
- `motion` (Framer Motion v12) for orchestration
- Lenis for smooth scroll
- `next/image` for captures
- Vercel, existing project `my-portfolio`, custom domain `mehdiboudar.com`

No client-side data fetching. No CMS. Content is typed TS.

## Content architecture

Content lives in `content/*.ts` as typed modules, never inline in JSX:

- `content/profile.ts` — name, roles, contact, metrics
- `content/projects.ts` — case-study data
- `content/experience.ts` — roles and dates
- `content/capabilities.ts` — grouped skills

Single source of truth for every metric. The previous site drifted — the hero claimed
1,956 tests while the CVs claimed 2,240. Canonical value is now **2,645+**.

### Canonical metrics

| Metric | Value |
| --- | --- |
| Automated tests | 2,645+ |
| Flyway migrations | 138 |
| Webhook throughput | 100+/sec |
| Uptime | 99.9% |
| Tenants served | 10+ |
| Channels | 8 |
| Contact import | 500k in <10 min |
| Broadcast | 100k messages in <30 min |
| Conversion uplift | +15% |

### Routes

- `/` — hero, proof strip, selected work, capabilities, experience, about, contact
- `/work/conversational-ai-platform`
- `/work/whatsapp-crm-layer`
- `/work/mcp-servers`
- `/work/client-experiences`

The WhatsApp/CRM page carries the strongest differentiators: official Meta
coexistence (WhatsApp Business App and Cloud API live on the same number with synced
history), CTWA webhook capture injected into agent context, CRM widgets that surface
a record's live conversation inside the CRM, template and flow automation driven by
per-client workflows, and automated prospect creation from chatbot outcomes.

## Visual identity

Direction A, "editorial paper".

- Canvas `#F5F3EE`, ink `#14120E`, accent burnt amber `#B45309`, muted `#57534E`
- Display: high-contrast serif, 6–10rem, tight leading, deliberate line breaks
- Body: neutral grotesk
- Mono: metadata and metrics only
- Hairline rules instead of cards and boxes
- Case-study heroes and AI/systems sections invert to near-black `#14120E`; the
  inversion is the page's rhythm and keeps technical sections feeling technical

## Motion system

Per the loaded animation rules:

- Default curve `cubic-bezier(0.23, 1, 0.32, 1)`; 200ms for UI transitions
- Press feedback `scale(0.97)` at 120ms
- Scroll reveals at a 100px viewport threshold: opacity + 12px rise, children
  staggered 60ms
- Marketing exception applies — hero and case-study transitions may run longer and
  more expressively than 300ms
- Scroll-linked parallax on captures; a scrubbed sequence on the model-failover chain
- `prefers-reduced-motion` degrades to opacity-only, never to nothing
- Only `transform` and `opacity` are animated

## Imagery

Headless Playwright captures at 1440×900 and 390×844, committed to
`public/captures/`, served as AVIF/WebP through `next/image`:

- safq.ai
- drivy.ma
Client platform captures were removed on 2026-07-30: that work is under NDA and
must not be shown, named, or linked anywhere public, including this repository.

No stock photography. No internal dashboard screenshots — nothing containing real
customer data ships. Architecture concepts (coexistence topology, failover chain, MCP
federation) are hand-authored animated SVG, which is clearer than a screenshot and
carries no leak risk.

Client naming: no client may be named on the site. Client platform work is described
generically and flagged as NDA-covered, with no names, screenshots, or links. The CRM
integration case study refers to tenants by sector only.

## Accessibility

- Real semantic landmarks and heading order
- Focus-visible rings on every interactive element
- Keyboard-initiated navigation is never animated
- Colour contrast checked against the paper canvas
- All captures carry descriptive alt text

## Out of scope

- CV regeneration. Deferred to a later phase; sources are LaTeX in
  `~/Downloads/Contracts/`, compiled via Overleaf. The content decisions made here
  (canonical metrics, coexistence and CTWA wording, naming constraint) feed that work.
- Blog, CMS, i18n, analytics dashboards.

## Verification

- `next build` completes with no type errors
- Every route prerenders
- Lighthouse: performance and accessibility checked before deploy
- Grep the built output for the forbidden platform name; it must return nothing
- Production deploy reachable on `mehdiboudar.com`
