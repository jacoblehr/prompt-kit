# Stack: data-to-story

Translate statistics or findings into a decision-useful narrative for a non-technical audience.

Blocks:
1. `frame.extract-insights`
2. `guardrail.uncertainty`
3. `rubric.writing-quality`

Expected output: Key finding with confidence and audience-appropriate framing, ready to act on.

## Composition notes

`frame.extract-insights` identifies the decision-relevant signal in the data before shaping it. `guardrail.uncertainty` prevents overconfident claims from entering the narrative. `rubric.writing-quality` shapes the output for a non-technical audience.

**Minimum blocks:** `frame.extract-insights` + `guardrail.uncertainty`
