# Stack: ship-feature

Move a feature from defined to shipped with quality gates at each step.

Blocks:
1. `mode.decide`
2. `frame.success-criteria`
3. `guardrail.assumption-audit`
4. `strategy.premortem`
5. `rubric.plan-quality`
6. `schema.execution-brief`

Expected output: Committed ship plan with success criteria, risk inventory, and go/no-go criteria at each gate.

## Composition notes

`mode.decide` commits the ship decision frame before refining the plan. `frame.success-criteria` makes the feature target testable and go/no-go criteria explicit. `guardrail.assumption-audit` exposes what must be true for the plan to hold. `strategy.premortem` stress-tests the plan before execution begins. `rubric.plan-quality` validates the ship plan before the execution brief is written. `schema.execution-brief` formats the final ship checklist with explicit gates.

**Minimum blocks:** `frame.success-criteria` + `guardrail.assumption-audit` + `schema.execution-brief`
