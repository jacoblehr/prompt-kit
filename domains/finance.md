# Domain: finance

Finance and business-case overlay for budgets, forecasts, unit economics, investment cases, pricing, tradeoffs, and resource allocation.

## Use when
The task involves financial assumptions, cost-benefit analysis, budget impact, forecasting, pricing, runway, ROI, or investment prioritization.

## Adds
- Explicit assumptions for revenue, cost, margin, timing, and cash impact.
- Sensitivity to base case, downside case, and key drivers.
- Separation of accounting profit, cash flow, unit economics, and strategic value.
- Risk-adjusted tradeoffs and reversibility.
- Review triggers for tax, accounting, regulatory, or fiduciary questions.

## Watch for
- Treating a forecast as a prediction instead of an assumption set.
- Ignoring timing, cash constraints, or downside exposure.
- Hiding one critical driver inside an average.
- Presenting financial advice where qualified review is required.

```text
Apply the finance overlay to the supplied task or artifact.
Check assumptions, cost, revenue, margin, cash timing, unit economics, sensitivity, downside case, reversibility, and review triggers. Do not present regulated financial, tax, accounting, or investment advice as final guidance.

Return: financial objective, key assumptions, cost drivers, value drivers, cash or timing impact, sensitivity, downside risk, decision threshold, review trigger.

---
context: {context}
```
