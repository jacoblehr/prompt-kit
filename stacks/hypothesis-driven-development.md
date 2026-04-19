# Stack: Hypothesis-Driven Development

Use when you want to validate a technical or product assumption with a lightweight experiment before committing to a full build.

Useful inputs:

- the assumption or bet you want to test
- the system or context the experiment will run in
- acceptable confidence threshold and available sample size

Suggested blocks:

1. `frame.hypothesis-generation`
2. `frame.experiment-design`
3. `frame.test-strategy`
4. `guardrail.statistical-significance-check`
5. `frame.extract-insights`

Expected outcome:

- assumption made explicit as a falsifiable hypothesis with a named null hypothesis
- experiment designed with treatment, control, metrics, sample size, and decision rule defined up front
- test strategy covering correctness of the experiment itself, not just the feature
- results interpreted with appropriate statistical rigour: significance, effect size, and practical relevance separated
- transferable insights extracted, including what the experiment does not tell you

Domain tags:
- software engineering
- statistics
- experimentation
- validation

---

## Composition notes

**Minimum blocks:** `frame.hypothesis-generation`, `frame.experiment-design`, `frame.statistical-significance-check`

**Why this order works:** Hypothesis-generation makes the assumption explicit and falsifiable before any design work. Experiment-design specifies the test with all decisions made upfront — sample size, decision rule, metrics — before results are observed. Test-strategy covers the correctness of the experiment itself. Statistical-significance-check enforces the pre-specified decision rule. Extract-insights closes by naming what the experiment does and does not tell you.

**Common swaps:** Swap `frame.experiment-design` for `frame.design-cheap-test` for lightweight qualitative validation. Swap `frame.statistical-significance-check` for `frame.correlation-vs-causation` when the experiment produces correlational rather than causal evidence.

**Common failure mode:** Running the experiment and then deciding how to interpret the results. HDD fails when decisions about what counts as significance are made after seeing the data.
