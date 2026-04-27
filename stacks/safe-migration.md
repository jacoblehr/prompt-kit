# Stack: safe-migration

Plan and gate a migration with explicit rollback triggers so existing behavior cannot break silently.

Blocks:
1. `mode.explore`
2. `frame.task`
3. `guardrail.assumption-audit`
4. `strategy.premortem`
5. `schema.execution-brief`

Expected output: Sequenced migration plan with rollback triggers, dependency order, and pre-commit risk inventory.

## Composition notes

`mode.explore` maps existing behavior before touching anything. `frame.task` scopes what is migrating and what must stay intact. `guardrail.assumption-audit` surfaces what the migration relies on being true. `strategy.premortem` simulates breakage before it happens. `schema.execution-brief` gates execution with explicit rollback triggers.

**Minimum blocks:** `frame.task` + `guardrail.assumption-audit` + `schema.execution-brief`
