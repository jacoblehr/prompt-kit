# Stack: agentic-coding

Guide an autonomous coding agent through a bounded repository change with discovery, implementation slices, verification, and handoff.

Useful inputs:
- user request or issue
- repository constraints and conventions
- files or subsystems likely involved
- acceptance criteria
- allowed tools and verification commands
- stopping or escalation conditions

Blocks:
1. `frame.task`
2. `mode.explore`
3. `guardrail.scope-creep`
4. `schema.execution-brief`

Optional add-ons:
- `strategy.problem-split` when the work needs implementation slices or subproblems.
- `recurse.decompose` when the problem branches across nested subwork.
- `guardrail.bounded-recursion` when recursive or iterative work needs a stopping rule.
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `rubric.plan-quality` when the plan needs an explicit quality check.

Expected output: Agent work brief with repo findings, implementation slices, files touched, verification run, risks, blockers, and final handoff notes.

## Composition notes

`frame.task` pins the user request, repository scope, and non-goals before the agent touches files. `mode.explore` makes the agent read enough local context to follow existing patterns. `strategy.problem-split` turns the requested change into small implementation slices. `recurse.decompose` is included only for repo tasks that branch across files or subsystems, and `guardrail.bounded-recursion` forces explicit stop conditions before decomposition expands. `guardrail.assumption-audit` surfaces dependency, test, and compatibility assumptions. `guardrail.scope-creep` keeps the agent from opportunistic refactors outside the requested change. `schema.execution-brief` captures the work plan or completed-change report, and `rubric.plan-quality` checks that the sequence is verifiable and complete.

**Choose instead when:** use `implement-change` for a human-sized bounded edit that does not need agent loop control. Use `review-code` when the main job is critique of an existing diff.

**Common failure mode:** Letting the agent continue exploring or refactoring after the acceptance criteria are already satisfied.

**Minimum blocks:** `frame.task` + `mode.explore` + `guardrail.scope-creep` + `schema.execution-brief`
