# Stack: review-code

Review code for correctness, contracts, and blast radius before approving it.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `schema.findings-brief`

Optional add-ons:
- `mode.explore` when premature convergence is a real risk.
- `guardrail.assumption-audit` when hidden premises could change the answer.

Expected output: Prioritized issues with correctness, boundary, and impact findings, each with a concrete fix.

## Composition notes

`frame.task` scopes the review target and non-goals before reading. `mode.explore` reads for intent and contract before evaluating correctness. `mode.critique` switches to adversarial evaluation of correctness, boundaries, and blast radius. `guardrail.assumption-audit` surfaces hidden dependencies the code relies on. `schema.findings-brief` produces concrete, prioritized findings with fixes.

**Choose instead when:** use `security-threat-model` if the main job is simulating active abuse or attack paths before a system ships or changes, rather than reviewing correctness and boundary behavior of an implementation.

**Common failure mode:** Reporting style or preference issues before correctness, contract, or blast-radius findings.

**Minimum blocks:** `frame.task` + `mode.critique` + `schema.findings-brief`
