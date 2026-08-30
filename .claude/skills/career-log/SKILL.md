---
name: career-log
description: Use when Mehdi describes work he has done, shipped, fixed or built — new features, systems, clients, metrics or roles — anywhere in conversation. Captures it into the right surface (memory, CLAUDE.md, portfolio content, CVs) instead of letting it evaporate at the end of the session.
---

# Recording new work

Mehdi describes achievements in passing, mid-task, across many sessions and workspaces.
Most of it never reaches his CV or portfolio. This skill exists so it does.

## Trigger

Any time he says he added, built, fixed, shipped, migrated, integrated or presented
something — or gives a number about it. Do not wait to be asked. He will not remember to
ask.

## Step 1 — capture it verbatim first

Before deciding anything, write down what he actually said, in his words, including any
numbers. Paraphrasing early loses the detail that makes a bullet credible.

## Step 2 — verify before it becomes a claim

Do not promote anything to a public surface on assertion alone.

- Check it against `AIProjectDoneByMeAlone/` and `ChatIntanceMdfilesForInformation/`.
- If it names a URL, request it and confirm 200. A dead link is worse than no link.
- If a number contradicts `CLAUDE.md`, stop and ask which is current. Do not silently
  pick one.

## Step 3 — route it

| Kind of fact | Where it goes |
| --- | --- |
| Who he is, how he works, a standing preference | memory (`type: user` or `feedback`) |
| A metric, date or credential others must match | `CLAUDE.md` canonical table, then every surface using it |
| Shipped capability worth showing publicly | `content/projects.ts` or `content/experience.ts`, then deploy |
| Strong enough to earn CV space | the `*.tex` files — but see the length rule below |
| Confidential or client-identifying | memory only, never public — check the confidentiality rules |

## Step 4 — keep surfaces consistent

A number that changes must change **everywhere**: CVs, `content/`, LinkedIn copy. The
CV and LinkedIn have already contradicted each other once, in six places; that is the
failure this step prevents. When you update one, list the others for Mehdi explicitly.

## The CV length rule

CVs are one page and compiled in Overleaf, which you cannot run. Never add to a `.tex`
without cutting comparable length from the same file. Measure *rendered* length — strip
LaTeX commands and diff visible characters against the pre-edit version, staying within
roughly ±0.5%. Report the delta so Mehdi knows the risk before he compiles.

## What not to do

- Do not invent supporting numbers. If cost, latency or eval figures would strengthen a
  bullet and he has not given them, ask.
- Do not add a capability to the portfolio because it sounds impressive. It must be
  something he built and can defend in an interview.
- Do not use a personal or self-deprecating register. Factual and credential-forward.
