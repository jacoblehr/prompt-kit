# Stack: Full Decision Process

Use for high-stakes decisions where the cost of a poor choice justifies a rigorous, end-to-end deliberation.

Useful inputs:

- the decision to be made and the deadline
- the options currently on the table (even if incomplete)
- the stakeholders who will be affected or who must live with the outcome

Suggested blocks:

1. `mode.decide`
2. `frame.success-criteria`
3. `frame.compare-options`
4. `guardrail.assumption-audit`
5. `guardrail.disconfirming-evidence`
6. `schema.decision-memo`
7. `rubric.decision-quality`

Expected outcome:

- success criteria defined before evaluating options
- options compared against shared criteria, not general impressions
- the key assumptions behind the preferred option surfaced and stress-tested
- the strongest counterargument to the preferred option given an honest hearing
- a decision memo that documents the reasoning and is readable after the fact
- quality of the decision process assessed before committing

Domain tags:
- decision theory
- critical thinking
- strategic thinking

---

## Composition notes

**Minimum blocks:** `mode.decide`, `frame.success-criteria`, `frame.compare-options`

**Why this order works:** Decide mode first locks in the convergent stance. Success-criteria before options prevents the criteria from being reverse-engineered to favor the preferred option. Compare-options evaluates against shared criteria. Assumption-audit surfaces the implicit bets behind the leading option. Disconfirming-evidence guardrail forces the strongest counter-argument an honest hearing. Decision-memo captures the reasoning. The rubric is the final quality gate before committing.

**Common swaps:** Swap `guardrail.disconfirming-evidence` for `strategy.red-team` when the decision needs an adversarial challenge rather than a structured counter-argument. Skip `frame.assumption-audit` for lower-stakes decisions where speed matters more than rigor.

**Common failure mode:** Setting success criteria after options are evaluated. Post-hoc criteria tend to match the preferred option rather than the actual goal, turning comparison into rationalization.
