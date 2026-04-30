# Stack: ship-feature

Move a feature from defined to shipped with quality gates at each step.

Blocks:
1. `frame.success-criteria`
2. `mode.decide`
3. `guardrail.assumption-audit`
4. `strategy.premortem`
5. `rubric.plan-quality`
6. `schema.execution-brief`

Expected output: Committed ship plan with success criteria, risk inventory, and go/no-go criteria at each gate.

## Composition notes

`frame.success-criteria` makes the feature target testable and go/no-go criteria explicit before commitment. `mode.decide` commits the ship decision frame. `guardrail.assumption-audit` exposes what must be true for the plan to hold. `strategy.premortem` stress-tests the plan before execution begins. `rubric.plan-quality` validates the ship plan before the execution brief is written. `schema.execution-brief` formats the final ship checklist with explicit gates.

**Common failure mode:** Treating ship readiness as enthusiasm to release rather than criteria, risks, and gates.

**Minimum blocks:** `frame.success-criteria` + `guardrail.assumption-audit` + `schema.execution-brief`
