# Stack: customer-insight-synthesis

Synthesize customer feedback, interviews, support tickets, or usage notes into decision-useful insight.

Blocks:
1. `mode.explore`
2. `frame.extract-insights`
3. `guardrail.disconfirming-evidence`
4. `mode.synthesize`
5. `schema.findings-brief`

Expected output: Ranked customer insights with evidence, counter-signals, implications, and confidence.

## Composition notes

`mode.explore` opens the feedback space without assuming the first pattern is the important one. `frame.extract-insights` separates actionable signals from raw comments. `guardrail.disconfirming-evidence` checks whether prominent themes are contradicted by other segments or contexts. `mode.synthesize` integrates the evidence into a coherent view. `schema.findings-brief` ranks the insights by impact and confidence.

**Common swaps:** Add `rubric.research-quality` when the findings will support a high-stakes product or strategy decision.

**Common failure mode:** Treating the loudest quotes as representative insight without checking segment, frequency, or counter-evidence.

**Minimum blocks:** `frame.extract-insights` + `mode.synthesize` + `schema.findings-brief`
