# Stack: ethical-review

Identify ethical risks, second-order harms, and structural tradeoffs before committing to a decision or design.

Blocks:
1. `mode.critique`
2. `guardrail.disconfirming-evidence`
3. `schema.findings-brief`

Optional add-ons:
- `frame.task` when scope or non-goals need to be made explicit.
- `strategy.premortem` when failure paths should be surfaced before committing.

Expected output: Ranked ethical risks with strongest opposing cases considered and structural tradeoffs named.

## Composition notes

`frame.task` scopes the decision or design under review. `mode.critique` opens a structural-harm lens before cataloguing risks. `guardrail.disconfirming-evidence` forces engagement with interests the design may be ignoring. `strategy.premortem` treats failure as a committed fact, surfacing the most specific harm paths rather than generic risk lists. `schema.findings-brief` ranks ethical risks with evidence, impact, and mitigation options.

**Common failure mode:** Treating ethics as a generic concern list instead of specific harm paths with affected parties and mitigation choices.

**Minimum blocks:** `mode.critique` + `guardrail.disconfirming-evidence` + `schema.findings-brief`
