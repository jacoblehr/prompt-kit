# Compare Options

Use when you already have options and need a structured comparison.

```text
Compare these options in a compact decision table.

If explicit criteria are provided, score each option against them.
If no criteria are provided, name the implicit criterion you are using for each column.

Return columns:
- option
- criteria fit (state the criterion used)
- strengths
- weaknesses
- best use case
- key risk
- overall judgment

Context:
{paste context}

Criteria:
{paste criteria, or leave blank}

Options:
{paste options}
```

Domain tags:
- evaluation
- decision support
- analysis

---

Metadata:
- type: frame
- stage: decide
- strength: medium
- pairs with: `mode.decide`, `frame.success-criteria`, `schema.decision-memo`
