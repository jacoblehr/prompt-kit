# Stack: Design a Study

Use when you need to design a rigorous study, survey, or data collection effort before any data is gathered.

Useful inputs:

- the question you are trying to answer
- the decision or action the study will inform
- constraints on data collection (budget, timeline, available population)

Suggested blocks:

1. `frame.research-questions`
2. `frame.metric-design`
3. `frame.experiment-design`
4. `guardrail.data-quality-check`
5. `lens.sample-design`

Expected outcome:

- research questions sharpened to what the study can actually answer
- primary and counter-metrics specified with Goodhart risk named
- study designed with sample, treatment/control, duration, and decision rule defined before collection begins
- data quality risks identified so collection instruments can address them in advance
- sampling strategy assessed for representativeness, bias, and minimum viable size

Domain tags:
- statistics
- research design
- measurement
- methodology

---

## Composition notes

**Minimum blocks:** `frame.research-questions`, `frame.experiment-design`, `lens.sample-design`

**Why this order works:** Research-questions first sharpens the study to only what needs to be established for the decision — studies designed around vague questions collect data that cannot answer them. Metric-design builds the measurement instrument before data collection begins. Experiment-design structures the study with sample, treatment, duration, and decision rule explicit. Data-quality-check surfaces collection risks before instruments are fielded. Sample-design assesses representativeness and minimum viable size.

**Common swaps:** Swap `frame.experiment-design` for `frame.design-cheap-test` when a low-cost observational study is sufficient. Swap `lens.sample-design` for `lens.survivorship-bias` when the main risk is selection bias in existing data.

**Common failure mode:** Designing the study before the research question is precise. An imprecise question produces a study that technically runs but cannot answer the question that actually drives the decision.
