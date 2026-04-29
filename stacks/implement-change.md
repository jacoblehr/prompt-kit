# Stack: implement-change

Implement a bounded code change with explicit scope, acceptance criteria, and verification.

Useful inputs:
- requested behavior change
- relevant files or subsystems
- constraints and non-goals
- acceptance criteria
- verification commands

Blocks:
1. `frame.task`
2. `frame.success-criteria`
3. `strategy.problem-split`
4. `guardrail.assumption-audit`
5. `schema.execution-brief`
6. `rubric.plan-quality`

Expected output: A scoped implementation plan or completed-change brief with files touched, verification steps, risks, and remaining gaps.

## Composition notes

`frame.task` separates the requested edit from the real objective and scope boundary. `frame.success-criteria` turns the change into testable acceptance criteria. `strategy.problem-split` breaks the work into small implementation slices. `guardrail.assumption-audit` surfaces repo, dependency, and compatibility assumptions before the change is made. `schema.execution-brief` formats the work as concrete steps or a concise implementation report. `rubric.plan-quality` checks that the plan is ordered, verifiable, and ready to execute.

**Choose instead when:** use `review-code` if the artifact already exists and the main job is critique rather than implementation. Use `safe-migration` if the change crosses schema, API, or rollout boundaries.

**Minimum blocks:** `frame.task` + `frame.success-criteria` + `schema.execution-brief`
