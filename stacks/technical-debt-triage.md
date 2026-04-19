# Stack: Technical Debt Triage

Use when a codebase has accumulated debt and you need a defensible, prioritised decision about what to address and in what order.

Useful inputs:

- description of the codebase and the areas of concern
- known pain points: slow delivery, frequent bugs, risky areas
- any recent incident or quality signals

Suggested blocks:

1. `core.process-audit`
2. `lens.complexity-tradeoff`
3. `core.risk-register`
4. `core.prioritize-opportunities`
5. `core.refactor-plan`

Expected outcome:

- current development process audited to identify where debt actually causes delay or defects
- complexity tradeoffs surfaced: which debt is structural risk versus which is merely ugly
- risks registered with likelihood and impact, giving a ranked view of the debt portfolio
- opportunities prioritised by value-to-effort: what to fix now, what to schedule, what to tolerate
- refactor plan for the highest-priority item with clear scope and exit criteria

Domain tags:
- software engineering
- technical debt
- refactoring
- prioritisation
