# Stack: safe-migration

Plan and gate a migration with explicit rollback triggers so existing behavior cannot break silently.

Blocks:
1. `frame.task`
2. `guardrail.assumption-audit`
3. `schema.execution-brief`

Optional add-ons:
- `mode.explore` when premature convergence is a real risk.
- `strategy.premortem` when failure paths should be surfaced before committing.
- `rubric.plan-quality` when the plan needs an explicit quality check.

Expected output: Sequenced migration plan with rollback triggers, dependency order, and pre-commit risk inventory.

## Composition notes

`frame.task` scopes what is migrating and what must stay intact. `mode.explore` maps existing behavior before touching anything. `guardrail.assumption-audit` surfaces what the migration relies on being true. `strategy.premortem` simulates breakage before it happens. `rubric.plan-quality` validates the migration plan before the execution brief gates it. `schema.execution-brief` gates execution with explicit rollback triggers.

**Common failure mode:** Planning the target state while leaving current behavior, rollback triggers, or compatibility assumptions implicit.

**Minimum blocks:** `frame.task` + `guardrail.assumption-audit` + `schema.execution-brief`
