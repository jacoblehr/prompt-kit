# Risk Register

Use when you need a structured inventory of risks before committing to a plan or project.

```text
Build a risk register for this plan or situation.

For each significant risk:
- risk name
- description of the failure mode
- likelihood: high / medium / low
- impact if it materialises: high / medium / low
- risk score: combine likelihood and impact
- earliest warning signal
- mitigation: what reduces likelihood or impact before the risk fires
- contingency: what to do if it fires anyway

Return them sorted by risk score, highest first.

Plan or project:
{paste plan, project, or upcoming decision}
```

Domain tags:
- risk management
- project planning
- contingency planning
- decision quality

---

Metadata:
- type: frame
- stage: critique
- strength: medium
- pairs with: `mode.critique`, `strategy.premortem`, `guardrail.assumption-audit`
