# Stack: ethical-review

Identify ethical risks, second-order harms, and structural tradeoffs before committing to a decision or design.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `guardrail.disconfirming-evidence`
4. `strategy.premortem`
5. `rubric.argument-quality`

Expected output: Ranked ethical risks with strongest opposing cases considered and structural tradeoffs named.

## Composition notes

`mode.critique` opens a structural-harm lens before cataloguing risks. `guardrail.disconfirming-evidence` forces engagement with interests the design may be ignoring. `strategy.premortem` treats failure as a committed fact, surfacing the most specific harm paths rather than generic risk lists. `rubric.argument-quality` evaluates whether ethical claims are proportionate to evidence.

**Minimum blocks:** `mode.critique` + `strategy.premortem`
