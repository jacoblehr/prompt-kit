# guardrail.source-grounding

## Purpose
Tie claims, findings, and recommendations back to supplied evidence so unsupported inference does not masquerade as established fact.

## Use when
The output depends on notes, research, interviews, logs, documents, or data and must stay faithful to what the sources support.

## Expects
A draft, synthesis, finding, recommendation, or argument plus the source material it claims to rely on.

## Adds
An evidence check that labels each important claim as directly supported, inferred, contradicted, or unsupported.

## Returns
- key claim
- source support
- evidence type
- unsupported leap
- contradiction or missing source
- revision needed

## Pairs with
`frame.extract-insights`, `mode.synthesize`, `guardrail.uncertainty`, `rubric.research-quality`, `schema.findings-brief`

## Avoid when
The task is explicitly speculative, creative, or based on judgment rather than evidence fidelity.

---

## Metadata
- type: guardrail
- stage: critique
- strength: medium
