# Stack: refactor-plan

Plan a behavior-preserving refactor with invariants, migration order, and rollback checkpoints explicit.

Useful inputs:
- code smell or structural problem
- current behavior and invariants
- affected files, callers, or services
- constraints and non-goals
- tests or verification commands
- rollout or compatibility requirements

Blocks:
1. `frame.current-state`
2. `frame.success-criteria`
3. `schema.execution-brief`

Optional add-ons:
- `mode.explore` when premature convergence is a real risk.
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `strategy.premortem` when failure paths should be surfaced before committing.
- `rubric.plan-quality` when the plan needs an explicit quality check.

Expected output: Refactor plan with preserved behavior, ordered change slices, invariants to protect, verification checkpoints, and rollback triggers.

## Composition notes

`frame.current-state` captures what exists before the design is improved. `frame.success-criteria` separates structural goals from behavior that must not change. `mode.explore` maps callers, hidden coupling, tests, and local conventions before proposing edits. `guardrail.assumption-audit` exposes compatibility and dependency assumptions. `strategy.premortem` simulates how the refactor could break behavior or erase useful constraints. `schema.execution-brief` sequences the refactor into reversible slices. `rubric.plan-quality` checks that the plan is scoped, verifiable, and not just aesthetic cleanup.

**Choose instead when:** use `safe-migration` if the change crosses schema, API, or rollout boundaries. Use `implement-change` if the primary goal is new behavior rather than preserving behavior while improving structure.

**Common failure mode:** Treating tidier code as success without proving existing behavior, contracts, and operational assumptions still hold.

**Minimum blocks:** `frame.current-state` + `frame.success-criteria` + `schema.execution-brief`
