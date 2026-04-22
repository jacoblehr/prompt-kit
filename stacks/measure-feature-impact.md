# Stack: Measure Feature Impact

Use when a feature has shipped and you need to measure whether it worked — separating genuine effect from noise.

Useful inputs:

- the feature that shipped and its intended user impact
- available metrics: engagement, conversion, performance, or business data
- the timeframe since shipping

Suggested blocks:

1. `frame.define-success-metrics`
2. `frame.metric-design`
3. `lens.survivorship-bias`
4. `guardrail.statistical-significance-check`
5. `guardrail.correlation-vs-causation`
6. `frame.extract-insights`

Expected outcome:

- success criteria clarified: what counts as the feature working?
- measurement instrument specified with Goodhart risk and counter-metrics named
- survivorship bias and selection effects in the data identified before any interpretation
- statistical significance and practical effect size assessed separately
- causation claim examined: is the observed change attributable to the feature or to confounds?
- transferable insights about what the data does and does not support

Domain tags:
- statistics
- product measurement
- feature evaluation
- causal inference

---

## Composition notes

**Minimum blocks:** `frame.define-success-metrics`, `guardrail.statistical-significance-check`

**Why this order works:** Success-metrics are defined first to prevent Goodhart's Law from operating retroactively. Metric-design builds the measurement instrument with counter-metrics to prevent gaming. Survivorship-bias check guards against selection effects in the exposed population. Statistical-significance-check separates statistical from practical significance. Correlation-vs-causation check prevents the feature from claiming credit for exogenous changes. Extract-insights closes by naming what the data does and does not support.

**Common swaps:** Swap `guardrail.statistical-significance-check` for `frame.experiment-design` when the impact analysis requires a more formal study design. Swap `guardrail.correlation-vs-causation` for `guardrail.stress-test-assumptions` when the causal claim is embedded in a set of broader assumptions.

**Common failure mode:** Interpreting metrics defined after the feature shipped. Post-hoc metrics are almost always selected to confirm the feature worked.
