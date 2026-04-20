# Stack: Decision Review

Use when you want to evaluate a past decision fairly — separating decision quality from outcome quality.

Useful inputs:

- description of the decision made and the options that were available
- information that was available at the time the decision was made
- what actually happened since

Suggested blocks:

1. `guardrail.triage-the-unknown`
2. `guardrail.stress-test-assumptions`
3. `frame.second-order-effects`
4. `frame.extract-insights`

Expected outcome:

- the decision context reconstructed clearly before any evaluation begins
- assumptions that underpinned the choice identified and tested against what was actually knowable
- second-order consequences — anticipated and missed — mapped out
- specific lessons extracted that apply to future decisions of a similar type

Domain tags:
- decision quality
- reflection
- learning
- epistemics

---

## Composition notes

**Minimum blocks:** `frame.triage-the-unknown`, `frame.stress-test-assumptions`

**Why this order works:** Triage-the-unknown reconstructs what was actually knowable at decision time — this prevents hindsight bias from distorting the review. Stress-test-assumptions evaluates the premises that drove the choice. Second-order-effects maps consequences that were visible in principle but missed in practice. Extract-insights closes with lessons that apply to future decisions of a similar shape.

**Common swaps:** Swap `frame.second-order-effects` for `frame.cause-mapping` when there is a causal chain to reconstruct. Add `rubric.decision-quality` as a final gate if the review is meant to evaluate decision process quality explicitly.

**Common failure mode:** Evaluating a decision using information that was not available at the time. Without triage-the-unknown, the review becomes a hindsight-biased verdict rather than a process improvement.
