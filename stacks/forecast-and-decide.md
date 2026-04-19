# Stack: Forecast and Decide

Use when you face a decision that depends on an uncertain future outcome and want to reason about it rigorously before committing.

Useful inputs:

- the decision you are facing and the options available
- relevant context, prior data, or comparable situations
- the time horizon for the forecast

Suggested blocks:

1. `frame.clarify-task`
2. `frame.forecast`
3. `lens.base-rate-check`
4. `frame.scenario-planning`
5. `frame.choose-under-uncertainty`

Expected outcome:

- decision and options clarified before forecasting begins
- structured probability estimate built from base rates and specific evidence
- base rate grounded: does this forecast look surprising given historical frequencies?
- scenarios mapped: what plausible futures does the decision need to be robust to?
- decision made explicitly under uncertainty, with the reasoning that would change the conclusion named

Domain tags:
- statistics
- decision making
- forecasting
- uncertainty

---

## Composition notes

**Minimum blocks:** `frame.clarify-task`, `frame.forecast`, `frame.choose-under-uncertainty`

**Why this order works:** Task clarity before forecasting — a forecast without a well-defined question answers the wrong thing. Forecast builds the probability estimate. Base-rate-check grounds it against historical frequencies to prevent overconfidence in specific evidence. Scenario-planning maps the range of futures the decision must be robust to. Choose-under-uncertainty closes by making the decision explicit with the reasoning documented.

**Common swaps:** Swap `frame.scenario-planning` for `frame.second-order-effects` when the forecast is about consequences rather than futures. Swap `frame.choose-under-uncertainty` for `schema.decision-memo` when the decision is made and needs to be recorded.

**Common failure mode:** Building the forecast before clarifying the decision it is meant to inform. A forecast that is not anchored to a specific decision tends to be more precise than necessary and less useful than expected.
