# Stack: De-Risk With Test

Use when uncertainty is too high for full commitment but low enough to test.

Useful inputs:

- the current idea, plan, or decision under consideration
- the main uncertainty blocking commitment
- any real budget, time, or effort ceiling for a test

Suggested blocks:

1. `mode.decide`
2. `frame.success-criteria`
3. `frame.design-cheap-test`
4. `schema.execution-brief`
5. `guardrail.uncertainty`

Expected outcome:

- core uncertainty
- cheapest credible test
- success and failure signals
- next action with checkpoint

Domain tags:
- experimentation
- risk management
- lean methodology

---

## Composition notes

**Minimum blocks:** `mode.decide`, `frame.success-criteria`, `frame.design-cheap-test`

**Why this order works:** Decide mode sets the commitment stance — this is about choosing the right test, not exploring more. Success-criteria defines what a positive test result would look like before designing the test, preventing Goodhart-style tests. Design-cheap-test constrains the test to the minimum viable evidence. Execution-brief closes with a handoff-ready action plan. Uncertainty guardrail prevents the test from being misread as more conclusive than it is.

**Common swaps:** Swap `schema.execution-brief` for `schema.decision-memo` when the decision is made and the test is confirmatory. Swap `frame.design-cheap-test` for `frame.experiment-design` when statistical rigor is required.

**Common failure mode:** Designing a test without first defining what a positive result looks like. The test runs but the team disagrees about whether the results are good enough to proceed.
