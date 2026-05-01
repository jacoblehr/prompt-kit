# Stack: research

Build a well-grounded view from a body of evidence before deciding or writing a position.

Blocks:
1. `mode.explore`
2. `guardrail.disconfirming-evidence`
3. `rubric.research-quality`

Optional add-ons:
- `frame.extract-insights` when raw material needs synthesis before the final artifact.
- `frame.cause-mapping` when causes or contributing factors need tracing.

Expected output: Consolidated findings with confidence levels, disconfirming evidence considered, and decision-relevant implications named.

## Composition notes

`mode.explore` prevents premature conclusion before the evidence base is established. `frame.extract-insights` pulls decision-relevant signals from the source material. `guardrail.disconfirming-evidence` requires engaging with evidence that challenges the emerging view. `frame.cause-mapping` traces findings to structural explanations. `rubric.research-quality` validates the output before using it to decide or write.

**Common swaps:** Add `rubric.research-method` before `rubric.research-quality` when the process itself must be audited, not just the final findings.

**Common failure mode:** Treating raw notes as evidence quality; extract findings first, then judge whether the claims are supported.

**Minimum blocks:** `mode.explore` + `guardrail.disconfirming-evidence` + `rubric.research-quality`
