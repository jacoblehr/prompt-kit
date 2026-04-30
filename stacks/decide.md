# Stack: decide

Move from a set of options to a committed, traceable choice.

Blocks:
1. `frame.success-criteria`
2. `mode.explore`
3. `guardrail.assumption-audit`
4. `mode.decide`
5. `schema.decision-memo`

Expected output: Decision memo with chosen option, rationale, tradeoffs, risks, confidence, and next action.

## Composition notes

`frame.success-criteria` makes the decision target explicit before options are compared. `mode.explore` opens the option space against those criteria. `guardrail.assumption-audit` surfaces hidden dependencies before commitment. `mode.decide` closes to a choice. `schema.decision-memo` makes the reasoning traceable.

**Common swaps:** Add `guardrail.disconfirming-evidence` before `mode.decide` when a preferred answer already exists. Add `rubric.decision-quality` before `schema.decision-memo` for high-stakes review.

**Common failure mode:** Overloading the default path with too many checks, causing the model to audit forever instead of choosing.

**Minimum blocks:** `frame.success-criteria` + `mode.decide` + `schema.decision-memo`
