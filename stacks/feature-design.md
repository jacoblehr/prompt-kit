# Stack: feature-design

Define requirements, success criteria, and failure modes for a feature before building it.

Blocks:
1. `frame.task`
2. `frame.success-criteria`
3. `guardrail.assumption-audit`
4. `rubric.plan-quality`
5. `schema.execution-brief`

Expected output: Scoped requirements, explicit success/failure conditions, and a sequenced execution brief.

## Composition notes

`frame.task` scopes the feature before any design work. `frame.success-criteria` makes the build target testable before writing a line. `guardrail.assumption-audit` surfaces hidden dependencies and user assumptions. `rubric.plan-quality` validates the plan before committing to a brief. `schema.execution-brief` sequences delivery into a concrete plan.

**Minimum blocks:** `frame.task` + `frame.success-criteria`
