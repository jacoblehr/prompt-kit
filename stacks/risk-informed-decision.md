# Stack: Risk-Informed Decision

Use when the stakes of a decision are high enough that you need to systematically work through what could go wrong before committing.

Useful inputs:

- the decision you are facing and the leading option
- known risks or concerns already in mind
- the downside you most want to avoid

Suggested blocks:

1. `frame.risk-register`
2. `frame.second-order-effects`
3. `guardrail.stress-test-assumptions`
4. `frame.scenario-planning`
5. `frame.choose-under-uncertainty`

Expected outcome:

- risks registered systematically: likelihood, impact, and mitigation for each
- second-order effects mapped: what follows from the leading option that isn't immediately obvious?
- key assumptions bridging from evidence to decision identified and stress-tested
- scenarios reviewed: what range of futures must this decision be robust to?
- decision made with explicit acknowledgement of what is being risked and what would prompt a reversal

Domain tags:
- decision making
- risk
- uncertainty
- critical thinking

---

## Composition notes

**Minimum blocks:** `frame.risk-register`, `frame.stress-test-assumptions`

**Why this order works:** Risk-register before decisions — naming risks systematically prevents the most dangerous ones from staying invisible. Second-order-effects maps consequences beyond the first-order impact. Stress-test-assumptions identifies the bridge assumptions between evidence and decision. Scenario-planning maps the range of futures the decision must be robust to. Choose-under-uncertainty closes by making the decision explicit with the reasoning documented.

**Common swaps:** Swap `frame.scenario-planning` for `strategy.premortem` when the decision is about a plan rather than a general direction. Swap `frame.stress-test-assumptions` for `guardrail.assumption-audit` for a more structured assumption inventory.

**Common failure mode:** Treating risk-register as a compliance step rather than a reasoning tool. A risk register that is not connected to the decision criteria does not change the decision.
