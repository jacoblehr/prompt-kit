# Stack: hypothesis-test

Design, run, or evaluate a test of a causal claim before acting on it.

Blocks:
1. `mode.explore`
2. `guardrail.assumption-audit`
3. `guardrail.uncertainty`
4. `frame.extract-insights`
5. `rubric.research-quality`

Expected output: Causal claim tested, confounds named, confidence calibrated, and action-relevant conclusions separated from mere correlation.

## Composition notes

`mode.explore` opens the hypothesis space before testing. `guardrail.assumption-audit` surfaces what the experiment depends on being true. `guardrail.uncertainty` forces confidence calibration on any finding. `frame.extract-insights` separates decision-useful signal from statistical noise. `rubric.research-quality` validates the conclusion before acting on it.

**Minimum blocks:** `guardrail.assumption-audit` + `guardrail.uncertainty` + `rubric.research-quality`
