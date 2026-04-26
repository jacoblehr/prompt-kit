# Design Cheap Test

Use when uncertainty is blocking commitment and you need the smallest useful experiment.

```text
Design the cheapest useful test for this idea, decision, or plan.

Return:
- what decision or assumption needs de-risking
- the riskiest unknown
- the cheapest credible test
- success signal
- failure signal
- time or cost ceiling
- what to do if the signal is positive
- what to do if the signal is negative

Context:
{paste context}

Resource ceiling, if any:
{paste time, budget, or effort limit}
```

Domain tags:
- experimentation
- lean methodology
- validation

---

Avoid when:
Statistical rigor is required (e.g., regulated decisions, product launches at scale). Use `frame.experiment-design` when the test needs formal hypothesis testing rather than the minimum credible signal.

---

Metadata:
- type: frame
- stage: decide
- strength: medium
- pairs with: `mode.decide`, `frame.success-criteria`, `guardrail.uncertainty`
