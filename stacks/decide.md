# Stack: decide

Move from a set of options to a committed, traceable choice.

Blocks:
1. `mode.explore`
2. `frame.success-criteria`
3. `guardrail.disconfirming-evidence`
4. `guardrail.assumption-audit`
5. `mode.decide`
6. `rubric.decision-quality`
7. `schema.decision-memo`

Expected output: Decision memo with chosen option, rationale, tradeoffs, risks, confidence, and next action.

## Composition notes

`mode.explore` opens the option space before evaluating. `frame.success-criteria` makes the decision target explicit. `guardrail.disconfirming-evidence` and `guardrail.assumption-audit` prevent confirmation bias and surface hidden dependencies. `mode.decide` closes to a committed choice. `rubric.decision-quality` validates the reasoning before it is committed to a memo. `schema.decision-memo` makes the reasoning traceable.

**Minimum blocks:** `frame.success-criteria` + `mode.decide` + `schema.decision-memo`
