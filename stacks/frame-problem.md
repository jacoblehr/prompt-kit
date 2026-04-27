# Stack: frame-problem

Structure an underspecified request before acting so neither the question nor the answer drifts.

Blocks:
1. `mode.explore`
2. `frame.task`
3. `strategy.problem-split`
4. `frame.scope`
5. `frame.success-criteria`
6. `guardrail.uncertainty`

Expected output: Structured problem frame with stated ask, objective, constraints, knowns, unknowns, and success criteria.

## Composition notes

`mode.explore` resists premature narrowing. `frame.task` names the actual ask versus the surface request. `strategy.problem-split` breaks a complex ask into independently frameable subproblems. `frame.scope` draws the explicit boundary of what is and is not included. `frame.success-criteria` makes resolution criteria measurable. `guardrail.uncertainty` prevents acting on the frame before its gaps are visible.

**Minimum blocks:** `frame.task` + `frame.success-criteria`
