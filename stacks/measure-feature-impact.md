# Stack: Measure Feature Impact

Use when a feature has shipped and you need to measure whether it worked — separating genuine effect from noise.

Useful inputs:

- the feature that shipped and its intended user impact
- available metrics: engagement, conversion, performance, or business data
- the timeframe since shipping

Suggested blocks:

1. `core.define-success-metrics`
2. `core.metric-design`
3. `lens.survivorship-bias`
4. `core.statistical-significance-check`
5. `core.correlation-vs-causation`
6. `core.extract-insights`

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
