# Stack: Hypothesis-Driven Development

Use when you want to validate a technical or product assumption with a lightweight experiment before committing to a full build.

Useful inputs:

- the assumption or bet you want to test
- the system or context the experiment will run in
- acceptable confidence threshold and available sample size

Suggested blocks:

1. `core.hypothesis-generation`
2. `core.experiment-design`
3. `core.test-strategy`
4. `core.statistical-significance-check`
5. `core.extract-insights`

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
