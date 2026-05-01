# Stack: review-decision

Evaluate a past decision fairly by separating decision quality from outcome quality.

Blocks:
1. `guardrail.assumption-audit`
2. `frame.cause-mapping`
3. `rubric.decision-quality`

Optional add-ons:
- `guardrail.disconfirming-evidence` when confirmation bias is a material risk.
- `frame.extract-insights` when raw material needs synthesis before the final artifact.

Expected output: Verdict on decision quality with specific lessons that apply to future decisions of the same type.

## Composition notes

`guardrail.assumption-audit` re-examines what the decision-maker believed at the time. `guardrail.disconfirming-evidence` checks whether contradicting evidence was available. `frame.cause-mapping` traces the outcome to the decision itself rather than to external variance. `frame.extract-insights` converts the review into a future decision heuristic. `rubric.decision-quality` delivers the final verdict.

**Minimum blocks:** `guardrail.assumption-audit` + `frame.cause-mapping` + `rubric.decision-quality`
