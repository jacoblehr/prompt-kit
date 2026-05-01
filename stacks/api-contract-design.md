# Stack: api-contract-design

Design or revise an API contract with consumers, invariants, errors, compatibility, and rollout constraints explicit.

Useful inputs:
- producer and consumer responsibilities
- user or service workflows
- data model and invariants
- compatibility constraints
- error and retry expectations
- security or authorization boundaries

Blocks:
1. `frame.task`
2. `frame.success-criteria`
3. `schema.requirements-brief`

Optional add-ons:
- `frame.stakeholders` when roles or affected groups may disagree.
- `strategy.tradeoff-matrix` when options need explicit comparison criteria.
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `rubric.plan-quality` when the plan needs an explicit quality check.

Expected output: API contract brief with endpoints or messages, required behavior, compatibility rules, error semantics, open questions, and validation plan.

## Composition notes

`frame.task` scopes the API or contract surface under design. `frame.stakeholders` makes producers, consumers, operators, and users explicit before tradeoffs are judged. `frame.success-criteria` defines what a good contract must enable and protect. `strategy.tradeoff-matrix` compares simplicity, compatibility, performance, evolvability, and operational risk. `guardrail.assumption-audit` surfaces hidden assumptions about clients, data shape, auth, retries, and versioning. `schema.requirements-brief` captures the final contract requirements and unresolved questions. `rubric.plan-quality` checks that the design can be implemented and validated.

**Choose instead when:** use `architecture-review` when the system structure already exists and needs critique. Use `safe-migration` when the API change is already chosen and the main job is migration sequencing.

**Common failure mode:** Specifying the happy path while leaving error semantics, compatibility promises, or consumer obligations implicit.

**Minimum blocks:** `frame.task` + `frame.success-criteria` + `schema.requirements-brief`
