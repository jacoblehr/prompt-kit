# Stack: review-code

Review code for correctness, contracts, and blast radius before approving it.

Blocks:
1. `frame.task`
2. `mode.explore`
3. `mode.critique`
4. `guardrail.assumption-audit`
5. `schema.execution-brief`

Expected output: Prioritized issues with correctness, boundary, and impact findings, each with a concrete fix.

## Composition notes

`mode.explore` reads for intent and contract before evaluating correctness. `mode.critique` switches to adversarial evaluation of correctness, boundaries, and blast radius. `guardrail.assumption-audit` surfaces hidden dependencies the code relies on. `schema.execution-brief` produces concrete, prioritized fix instructions.

**Minimum blocks:** `mode.critique` + `schema.execution-brief`
