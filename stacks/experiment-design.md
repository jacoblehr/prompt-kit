# Stack: experiment-design

Design a useful experiment before acting on a hypothesis, product bet, or causal claim.

Blocks:
1. `frame.task`
2. `frame.success-criteria`
3. `guardrail.assumption-audit`
4. `schema.experiment-plan`
5. `rubric.research-method`

Expected output: Experiment plan with hypothesis, method, metric, confounds, and a decision rule set before results are known.

## Composition notes

`frame.task` scopes the claim or bet under test. `frame.success-criteria` defines what learning would be decision-useful. `guardrail.assumption-audit` surfaces what the test depends on being true. `schema.experiment-plan` turns the hypothesis into a runnable test with a decision rule. `rubric.research-method` checks whether the method can actually support the decision.

**Common swaps:** Use `hypothesis-test` when evidence already exists and the job is evaluating a causal claim rather than designing a new test.

**Common failure mode:** Choosing a metric or method after deciding what answer would be convenient.

**Minimum blocks:** `frame.success-criteria` + `schema.experiment-plan` + `rubric.research-method`
