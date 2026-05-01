# Stack: feature-design

Define requirements, success criteria, and failure modes for a feature before building it.

Blocks:
1. `frame.task`
2. `frame.success-criteria`
3. `schema.execution-brief`

Optional add-ons:
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `rubric.plan-quality` when the plan needs an explicit quality check.

Expected output: Scoped requirements, explicit success/failure conditions, and a sequenced execution brief.

## Composition notes

`frame.task` scopes the feature before any design work. `frame.success-criteria` makes the build target testable before writing a line. `guardrail.assumption-audit` surfaces hidden dependencies and user assumptions. `rubric.plan-quality` validates the plan before committing to a brief. `schema.execution-brief` sequences delivery into a concrete plan.

**Minimum blocks:** `frame.task` + `frame.success-criteria` + `schema.execution-brief`
