# Stack: safe-migration

Plan and gate a migration with explicit rollback triggers so existing behavior cannot break silently.

Blocks:
1. `mode.explore`
2. `frame.task`
3. `guardrail.assumption-audit`
4. `strategy.premortem`
5. `schema.execution-brief`

Expected output: Sequenced migration plan with rollback triggers, dependency order, and pre-commit risk inventory.
