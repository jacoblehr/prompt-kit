# Stack: ship-feature

Move a feature from defined to shipped with quality gates at each step.

Blocks:
1. `frame.success-criteria`
2. `strategy.premortem`
3. `schema.execution-brief`

Optional add-ons:
- `mode.decide` when the response must close on a recommendation.
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `rubric.plan-quality` when the plan needs an explicit quality check.

Expected output: Committed ship plan with success criteria, risk inventory, and go/no-go criteria at each gate.

## Composition notes

`frame.success-criteria` makes the feature target testable and go/no-go criteria explicit before commitment. `mode.decide` commits the ship decision frame. `guardrail.assumption-audit` exposes what must be true for the plan to hold. `strategy.premortem` stress-tests the plan before execution begins. `rubric.plan-quality` validates the ship plan before the execution brief is written. `schema.execution-brief` formats the final ship checklist with explicit gates.

**Common failure mode:** Treating ship readiness as enthusiasm to release rather than criteria, risks, and gates.

**Minimum blocks:** `frame.success-criteria` + `strategy.premortem` + `schema.execution-brief`
