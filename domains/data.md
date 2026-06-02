# Domain: data

Data, statistics, and research overlay for analysis, evidence synthesis, experiments, metrics, and claims based on observations.

## Use when
The task depends on data quality, measurement, research method, statistical reasoning, experiments, surveys, logs, or evidence interpretation.

## Adds
- Distinction between correlation, causation, prediction, and description.
- Confounds, sampling limits, missing data, survivorship bias, and base rates.
- Practical significance, effect size, confidence intervals, and decision relevance.
- Pre-registered hypotheses or decision rules when feasible.
- Separation of supported claims from speculation.

## Watch for
- Over-weighting p-values while ignoring effect size.
- Treating available data as representative.
- Moving the hypothesis after seeing the result.
- Turning weak directional evidence into a firm recommendation.

```text
Apply the data and research overlay to the supplied task or artifact.
Check measurement quality, sampling, missing data, confounds, base rates, effect size, uncertainty, and whether the evidence can answer the decision question.

Return: research question, evidence available, data limits, confounds, effect or signal size, uncertainty, supported claims, unsupported leaps, decision implication, next evidence needed.

---
context: {context}
```
