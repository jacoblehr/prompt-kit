# Stack: Feature Design

Use when you need to take a user need or product requirement from fuzzy idea to a well-specified, buildable design.

Useful inputs:

- the user need or product requirement in rough form
- the system it will be built into
- any known constraints (performance, security, compatibility)

Suggested blocks:

1. `core.clarify-task`
2. `core.requirements-decomposition`
3. `core.define-success-metrics`
4. `core.api-design`
5. `lens.failure-mode-analysis`
6. `core.test-strategy`

Expected outcome:

- task and scope clarified before any design decisions are made
- feature decomposed into independently testable stories with acceptance criteria
- success criteria defined up front so the team knows what done looks like
- API or interface contract specified with edge cases and errors named
- failure modes surfaced and resilience requirements identified
- test strategy covering the highest-risk behaviour

Domain tags:
- software engineering
- feature design
- requirements
- API
