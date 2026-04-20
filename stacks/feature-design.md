# Stack: Feature Design

Use when you need to take a user need or product requirement from fuzzy idea to a well-specified, buildable design.

Useful inputs:

- the user need or product requirement in rough form
- the system it will be built into
- any known constraints (performance, security, compatibility)

Suggested blocks:

1. `frame.clarify-task`
2. `frame.requirements-decomposition`
3. `frame.define-success-metrics`
4. `frame.api-design`
5. `lens.failure-mode-analysis`
6. `frame.test-strategy`

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

---

## Composition notes

**Minimum blocks:** `frame.clarify-task`, `frame.requirements-decomposition`, `frame.define-success-metrics`

**Why this order works:** Clarity before decomposition — requirements that decompose a fuzzy task produce fuzzy stories. Requirements-decomposition follows with acceptance criteria per story. Success-metrics are defined before API or implementation design begins, preventing the design from optimizing for the wrong thing. API-design then specifies the interface contract with edge cases named. Failure-mode-analysis ensures resilience requirements are surfaced. Test-strategy closes with risk-weighted coverage.

**Common swaps:** Swap `frame.api-design` for `frame.database-design` for data-layer features. Swap `lens.failure-mode-analysis` for `lens.invariant-check` when correctness is the primary concern rather than resilience.

**Common failure mode:** Designing the API before success criteria are defined. API contracts designed without clear success criteria optimize for engineering elegance over user outcomes.
