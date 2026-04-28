# Stack: critique

Surface weaknesses, blind spots, and revision targets in any artifact.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `guardrail.assumption-audit`
4. `guardrail.disconfirming-evidence`
5. `rubric.argument-quality`

Expected output: Prioritized defects with concrete revision advice and strongest opposing case considered.

## Composition notes

`mode.critique` establishes the adversarial lens upfront. `guardrail.assumption-audit` finds what the artifact depends on being true. `guardrail.disconfirming-evidence` requires finding the strongest objection before flagging defects. `rubric.argument-quality` applies a consistent evaluation standard across all findings.

**Minimum blocks:** `mode.critique` + `rubric.argument-quality`
