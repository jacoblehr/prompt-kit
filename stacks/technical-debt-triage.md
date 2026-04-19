# Stack: Technical Debt Triage

Use when a codebase has accumulated debt and you need a defensible, prioritised decision about what to address and in what order.

Useful inputs:

- description of the codebase and the areas of concern
- known pain points: slow delivery, frequent bugs, risky areas
- any recent incident or quality signals

Suggested blocks:

1. `frame.process-audit`
2. `lens.complexity-tradeoff`
3. `frame.risk-register`
4. `frame.prioritize-opportunities`
5. `frame.refactor-plan`

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

---

## Composition notes

**Minimum blocks:** `frame.process-audit`, `lens.complexity-tradeoff`, `frame.risk-register`

**Why this order works:** Process-audit first identifies where debt actually causes delay or defects in the current development workflow — not all debt is equally painful. Complexity-tradeoff distinguishes structural risk from cosmetic ugliness. Risk-register builds the ranked portfolio view. Prioritize-opportunities evaluates value-to-effort. Refactor-plan scopes the highest-priority item with clear exit criteria.

**Common swaps:** Swap `frame.process-audit` for `frame.cause-mapping` when a recent incident or quality regression is the entry point. Swap `frame.refactor-plan` for `schema.execution-brief` when the output needs to be handed off to another team.

**Common failure mode:** Addressing the most visible debt rather than the most impactful. Visible debt is noticed by the team; impactful debt is measured against delivery velocity and incident rate.
