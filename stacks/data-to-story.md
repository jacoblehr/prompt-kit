# Stack: Data to Story

Use when you have data, analysis, or statistical findings and need to translate them into a compelling narrative for a non-technical audience.

Useful inputs:

- the analysis, data, or statistical output
- the audience and what decision they need to make
- the key finding you want to communicate

Suggested blocks:

1. `frame.interpret-regression`
2. `frame.extract-insights`
3. `lens.survivorship-bias`
4. `schema.executive-summary`
5. `frame.rewrite-for-clarity`

Expected outcome:

- statistical output interpreted accurately: significance, effect size, and causation claims kept distinct
- key insights separated from noise: what does the data actually show?
- survivorship and selection bias in the data named before the narrative is written
- executive summary drafted with the finding, recommendation, and key caveat front-loaded
- language revised for the audience: technical qualifications preserved but made accessible

Domain tags:
- statistics
- writing
- communication
- data storytelling

---

## Composition notes

**Minimum blocks:** `frame.interpret-regression`, `frame.extract-insights`, `schema.executive-summary`

**Why this order works:** Statistical interpretation comes first to prevent narrative from outrunning the evidence. Extract-insights separates the real signal from noise. Survivorship-bias check guards against stories built on the visible data while ignoring what is absent. Executive summary drafts the narrative only after the evidence is accurately understood. Rewrite-for-clarity is the final pass to make the result accessible without losing accuracy.

**Common swaps:** Swap `frame.interpret-regression` for `guardrail.statistical-significance-check` when the task is evaluating an experiment rather than interpreting a model. Swap `schema.executive-summary` for `frame.brief-to-draft` when the output is a longer document rather than a summary.

**Common failure mode:** Writing the narrative before interpreting the statistics. The most common error is building a story around a finding without checking whether the finding is statistically or practically significant.
