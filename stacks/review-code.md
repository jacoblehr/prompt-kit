# Stack: review-code

Review code for correctness, contracts, and blast radius before approving it.

Blocks:
1. `mode.explore`
2. `mode.critique`
3. `guardrail.assumption-audit`
4. `schema.plan-next-actions`

Expected output: Prioritized issues with correctness, boundary, and impact findings, each with a concrete fix.

## Composition notes

`mode.explore` reads for intent and contract before evaluating correctness. `mode.critique` switches to adversarial evaluation of correctness, boundaries, and blast radius. `guardrail.assumption-audit` surfaces hidden dependencies the code relies on. `schema.plan-next-actions` produces concrete, prioritized fix instructions.

**Minimum blocks:** `mode.critique` + `schema.plan-next-actions`
