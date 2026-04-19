# Interpret Regression

Use when you have regression model output and need to reason carefully about what it does and does not tell you.

```text
Interpret the following regression or model output.

Model output: {model_output}

What was being predicted: {outcome_variable}

Key predictors: {predictors}

Context and purpose: {context}

Work through:
1. Coefficient interpretation — what do the coefficients mean in plain language for the key predictors?
2. Statistical significance — which effects are likely real vs noise? Apply appropriate scepticism to borderline p-values.
3. Practical significance — are statistically significant effects large enough to matter?
4. Model fit — what does R², RMSE, or equivalent tell you about how well the model explains the data?
5. Assumption check — which regression assumptions (linearity, independence, homoscedasticity, normality of residuals) are most likely to be violated, and what would that imply?
6. Causation claim — does this model support causal claims? Why or why not?
7. What the model cannot answer — explicit limits of this analysis

Produce a plain-language summary suitable for a non-technical decision-maker, followed by the technical caveats.
```

Domain tags:
- statistics
- regression
- model interpretation
- data analysis

---

Metadata:
- type: frame
- stage: analyze
- strength: heavy
- pairs with: `frame.statistical-significance-check`, `lens.survivorship-bias`, `lens.base-rate-check`
