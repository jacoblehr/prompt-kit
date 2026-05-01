# Stack: hypothesis-test

Design, run, or evaluate a test of a causal claim before acting on it.

Blocks:
1. `mode.explore`
2. `guardrail.assumption-audit`
3. `rubric.research-method`

Optional add-ons:
- `guardrail.uncertainty` when confidence needs calibration.
- `frame.extract-insights` when raw material needs synthesis before the final artifact.

Expected output: Causal claim tested, confounds named, confidence calibrated, and action-relevant conclusions separated from mere correlation.

## Composition notes

`mode.explore` opens the hypothesis space before testing. `guardrail.assumption-audit` surfaces what the experiment depends on being true. `guardrail.uncertainty` forces confidence calibration on any finding. `frame.extract-insights` separates decision-useful signal from statistical noise. `rubric.research-method` checks whether the test design and evidence-gathering were sound enough to trust.

**Common swaps:** Add `rubric.research-quality` after `rubric.research-method` when the final written conclusion also needs a quality gate.

**Common failure mode:** Treating correlation or noisy signal as a tested causal claim.

**Minimum blocks:** `mode.explore` + `guardrail.assumption-audit` + `rubric.research-method`
