# Stack: ethical-review

Identify ethical risks, second-order harms, and structural tradeoffs before committing to a decision or design.

Blocks:
1. `mode.critique`
2. `guardrail.disconfirming-evidence`
3. `strategy.inversion`
4. `rubric.argument-quality`

Expected output: Ranked ethical risks with strongest opposing cases considered and structural tradeoffs named.

## Composition notes

`mode.critique` opens a structural-harm lens before cataloguing risks. `guardrail.disconfirming-evidence` forces engagement with interests the design may be ignoring. `strategy.inversion` asks what a worst-case outcome looks like from the inside. `rubric.argument-quality` evaluates whether ethical claims are proportionate to evidence.

**Minimum blocks:** `mode.critique` + `strategy.inversion`
