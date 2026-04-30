# Stack: rollout-plan

Plan a change, launch, policy, migration, or process update so adoption, monitoring, and rollback are explicit.

Blocks:
1. `frame.task`
2. `frame.current-state`
3. `frame.stakeholders`
4. `strategy.premortem`
5. `guardrail.scope-creep`
6. `schema.rollout-plan`

Expected output: Staged rollout plan with stakeholder actions, communication points, monitoring signals, rollback triggers, and the immediate next action.

## Composition notes

`frame.task` scopes what is changing and why. `frame.current-state` protects existing behavior and hidden dependencies from being erased by the target-state plan. `frame.stakeholders` makes adoption, approval, and operational responsibilities visible. `strategy.premortem` finds likely rollout failures before commitment. `guardrail.scope-creep` trims the plan back to the smallest useful staged change. `schema.rollout-plan` captures phases, signals, communications, and rollback triggers.

**Choose instead when:** use `safe-migration` for technical compatibility or schema/API migration risk; use `ship-feature` when the main question is release readiness.

**Common swaps:** Add `rubric.plan-quality` when the rollout must pass a formal readiness review.

**Common failure mode:** Treating rollout as a task list while leaving adoption, communication, monitoring, and pause criteria implicit.

**Minimum blocks:** `frame.stakeholders` + `strategy.premortem` + `schema.rollout-plan`
