# Stack: Evidence to Decision

Use when you have research, data, or analysis in hand and need to move from evidence to a defensible decision.

Useful inputs:

- the evidence or analysis: research, data, reports, or expert input
- the decision you are facing and its options
- constraints or stakes involved

Suggested blocks:

1. `frame.synthesize-sources`
2. `frame.extract-insights`
3. `lens.base-rate-check`
4. `guardrail.stress-test-assumptions`
5. `frame.choose-under-uncertainty`

Expected outcome:

- evidence synthesised across sources into a coherent picture with contradictions noted
- insights extracted and separated from noise: what does the evidence actually show?
- base rates applied to test whether findings are surprising or predictable given prior knowledge
- assumptions that bridge from evidence to decision identified and stress-tested
- decision made under uncertainty with explicit reasoning about what would change the conclusion

Domain tags:
- research
- decision making
- epistemics
- synthesis

---

## Composition notes

**Minimum blocks:** `frame.synthesize-sources`, `frame.extract-insights`, `frame.choose-under-uncertainty`

**Why this order works:** Synthesis before insight extraction — sources must be integrated before conclusions can be drawn from them reliably. Base-rate-check prevents overreaction to findings that are unsurprising given prior knowledge. Stress-test-assumptions identifies the bridge assumptions between evidence and decision. Choose-under-uncertainty closes by making the decision explicit with the reasoning documented.

**Common swaps:** Swap `guardrail.stress-test-assumptions` for `guardrail.disconfirming-evidence` when there is a strong prior conclusion that the evidence might be confirming rather than testing. Add `rubric.decision-quality` when the decision is high-stakes.

**Common failure mode:** Moving directly from evidence to conclusion without stress-testing the bridge assumptions. Evidence never speaks for itself — the assumptions about what the evidence implies are where decision errors hide.
