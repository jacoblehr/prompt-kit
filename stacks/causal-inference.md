# Stack: Causal Inference

Use when you need to establish whether a relationship is causal — not just correlated — before acting on a finding or making a recommendation.

Useful inputs:

- the observed relationship or correlation you want to evaluate
- data or evidence available
- the action or decision that hinges on whether causation holds

Suggested blocks:

1. `guardrail.correlation-vs-causation`
2. `frame.research-questions`
3. `lens.base-rate-check`
4. `frame.experiment-design`
5. `guardrail.stress-test-assumptions`

Expected outcome:

- correlation distinguished from causation: specific confounds and alternative explanations named
- precise causal question formulated: what exactly needs to be established for the action to be justified?
- base rates applied: is this relationship surprising given prior knowledge of the domain?
- strongest feasible study designed to establish causation, with trade-offs acknowledged
- assumptions underlying the causal claim stress-tested: what would falsify it?

Domain tags:
- statistics
- causal inference
- research design
- epistemics

---

## Composition notes

**Minimum blocks:** `frame.correlation-vs-causation`, `frame.research-questions`, `frame.experiment-design`

**Why this order works:** Correlation-vs-causation first surfaces the specific confounds and alternative explanations before any research is designed — otherwise you risk designing the wrong study. Research-questions sharpens the causal claim into something testable. Base-rate-check prevents overreaction to a finding that is unsurprising given prior knowledge. Experiment-design follows after the question is precise. Stress-test-assumptions closes by pressure-testing the bridge from experiment to causal conclusion.

**Common swaps:** Swap `frame.experiment-design` for `frame.design-cheap-test` when a quick observational test is feasible before committing to a full study. Swap `lens.base-rate-check` for `lens.survivorship-bias` when the data has a selection problem.

**Common failure mode:** Designing the study before the causal question is precise. An imprecisely framed causal question produces a study that answers a slightly different question, and the conclusions fail to transfer.
