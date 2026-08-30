---
name: application-log
description: Use when Mehdi reports what happened with applications — replies, rejections, interviews, silence — or when a search round is published and needs recording. Maintains career/applications.md and recalibrates the estimates used for the next round.
---

# Keeping the record

The point of logging is that the next round is weighted by evidence instead of my
guesses. `career/applications.md` is the file. It is gitignored: it holds company names
and outcomes, and the repo has a public remote.

## Recording a round

Append a dated block listing each touch: company, role, channel, which CV went out, the
predicted reply and interview probability, and outcome (blank until known).

Channels, kept stable so the numbers stay comparable round to round:
`network` · `bsp` · `consult` · `small` · `brand` · `eea`

## Recording an outcome

Update the row in place. Record silence too — after three weeks with no reply, mark it
`no-reply`. Silence is data, and dropping it biases every rate upward.

Beyond the outcome, capture three things when available, because they change the
documents faster than the counts do:

1. **Which CV was sent.** If one variant consistently outperforms, that is a finding.
2. **Whether a reply quoted anything specific.** If three replies mention coexistence and
   none mention the failover chain, the CV should lead differently.
3. **Any interview question he answered badly.** That is a gap in the CV or in the prep.

## Recalibrating

When a channel has 5+ completed touches, compare actual interview rate against the prior.
Move the prior most of the way toward the observed rate, not all of it — small samples
swing wildly and one lucky reply is not a trend. Write the revised prior into the log so
the next round starts from it, and tell him what changed and why.

If overall reply rate sits far below prediction across every channel, the problem is
upstream of targeting: the documents, the LinkedIn contradictions, or the GitHub. Say so
plainly rather than adjusting numbers around it.

## Reviewing

When he asks how it is going, answer with the funnel — sent, replied, interviewed — per
channel, and name the one change most likely to raise the next round. Resist listing
everything that could be improved; name the single highest-leverage item.
