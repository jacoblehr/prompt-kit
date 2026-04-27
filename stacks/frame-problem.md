# Stack: frame-problem

Structure an underspecified request before acting so neither the question nor the answer drifts.

Blocks:
1. `mode.explore`
2. `frame.task`
3. `strategy.problem-split`
4. `frame.success-criteria`
5. `guardrail.uncertainty`

Expected output: Structured problem frame with stated ask, objective, constraints, scope boundary, knowns, unknowns, and success criteria.

## Composition notes

`mode.explore` resists premature narrowing. `frame.task` names the actual ask versus the surface request and draws the scope boundary explicitly. `strategy.problem-split` breaks a complex ask into independently frameable subproblems. `frame.success-criteria` makes resolution criteria measurable. `guardrail.uncertainty` prevents acting on the frame before its gaps are visible.

**Minimum blocks:** `frame.task` + `frame.success-criteria`
