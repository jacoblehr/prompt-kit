# Refactor Plan

Use when code needs to be improved structurally without changing its behaviour, and you want to plan the work safely before touching anything.

```text
Create a refactoring plan for this code.

Assess the current state:
- the primary structural problems (not style — things that make change expensive or risky)
- the business logic or behaviour that must be preserved exactly
- any parts of the code that are difficult to test as currently structured

Plan the refactoring in safe, incremental steps:
- each step should leave the code in a functioning state
- earlier steps should not require later steps to complete
- identify the step where test coverage can first be added if it is missing now
- flag the step with the highest regression risk

State the end state: what does the code structure look like when the refactoring is done?

Code to refactor:
{paste the code}

Constraints (language, framework, things that cannot change):
{paste constraints}
```

Domain tags:
- software engineering
- planning
- quality

---

Metadata:
- type: frame
- stage: decide
- strength: medium
- pairs with: `mode.decide`, `lens.complexity-tradeoff`, `frame.test-strategy`
