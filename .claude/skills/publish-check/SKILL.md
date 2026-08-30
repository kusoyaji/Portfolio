---
name: publish-check
description: Use before deploying the portfolio to production, or before handing Mehdi a CV to compile. Verifies the build, that no confidential client or product name leaks, and that every outbound link still resolves.
---

# Pre-publish verification

Two failures here are expensive and neither is reversible by apology: publishing a
confidential client name, and shipping a link that 404s in front of a recruiter. Both
have nearly happened in this workspace. Run this every time.

## Portfolio

```bash
npx next build
```

Must compile with no type errors and prerender every route.

**Confidentiality sweep and link check** — run the gate. It reads its patterns from
`.claude/redactions.txt` (gitignored, because this repo has a public remote and the list
of confidential clients must not be committed):

```bash
bash scripts/publish-check.sh                            # local build
bash scripts/publish-check.sh https://mehdiboudar.com    # after deploy
```

It checks the **built** output, not just source, because content is inlined at build
time, and it requests every outbound link expecting 200. It exits non-zero on any
failure. Treat a 4xx/5xx or a connection failure as a blocker, not a warning — a dead
domain and a private repo both shipped before this gate existed.

Run it again against production after deploying; a stale build can serve old content.

Note the chat platform's product name is redacted from the **site** but is permitted on
CVs, so a hit there is a real failure, not a false positive.

## CVs

There is no local TeX toolchain — Mehdi compiles in Overleaf, so you cannot see the page
count. Before handing files over:

1. Confirm no CV references a dead domain or a private repo.
2. Report the rendered-length delta per file against its pre-edit version, so he knows
   which to compile first.
3. Name the specific line to delete if a file overflows. "It might not fit" is not
   useful; "delete the Orange Stack: line" is.
4. Check the canonical facts in `CLAUDE.md` still match every file — OneDrive sync has
   silently reverted edits mid-session before.

## Reporting

State what you verified and what the result was. Never claim a deploy is clean without
having run the checks in this session.
