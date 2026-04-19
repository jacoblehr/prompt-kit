# Stack: Interpret an Experiment

Use when you have results from an A/B test, controlled experiment, or data analysis and need to decide whether to act on them.

Useful inputs:

- the test results: metric, p-value, confidence interval, sample size, duration
- the hypothesis that was being tested
- what decision depends on this result

Suggested blocks:

1. `mode.critique`
2. `core.statistical-significance-check`
3. `lens.survivorship-bias`
4. `lens.base-rate-check`
5. `core.guardrail.disconfirming-evidence`

Expected outcome:

- statistical and practical significance distinguished
- sample quality and bias sources examined
- base rate context applied: is this result surprising given prior evidence?
- the strongest reason not to act on the result named honestly
- a clear recommendation: act, replicate, or discard

Domain tags:
- statistics
- decision theory
- epistemics
