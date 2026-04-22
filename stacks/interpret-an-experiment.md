# Stack: Interpret an Experiment

Use when you have results from an A/B test, controlled experiment, or data analysis and need to decide whether to act on them.

Useful inputs:

- the test results: metric, p-value, confidence interval, sample size, duration
- the hypothesis that was being tested
- what decision depends on this result

Suggested blocks:

1. `mode.critique`
2. `guardrail.statistical-significance-check`
3. `lens.survivorship-bias`
4. `lens.base-rate-check`
5. `guardrail.disconfirming-evidence`

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

---

## Composition notes

**Minimum blocks:** `mode.critique`, `guardrail.statistical-significance-check`, `guardrail.disconfirming-evidence`

**Why this order works:** Critique mode sets the skeptical stance before any statistical interpretation. Significance-check distinguishes statistical from practical significance. Survivorship-bias surfaces selection effects in the sample. Base-rate-check prevents overreaction to a result that is unsurprising given prior evidence. Disconfirming-evidence guardrail closes by forcing the strongest reason not to act on the result.

**Common swaps:** Swap `lens.survivorship-bias` for `guardrail.correlation-vs-causation` when the experiment was observational rather than controlled. Swap `guardrail.disconfirming-evidence` for `rubric.research-quality` when a formal quality assessment is needed.

**Common failure mode:** Acting on statistical significance alone. A result can be statistically significant, practically irrelevant, and based on a biased sample simultaneously.
