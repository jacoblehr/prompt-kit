# rubric.research-quality

## Purpose
Validate that a research artifact says only what the evidence supports and is clear enough to use in a decision.

## Use when
After an investigation has produced findings, before using that output to decide, brief, or write.

## Expects
A research summary or set of findings.

## Adds
Per-criterion judgments that flag unsupported claims, ambiguous confidence, and decision-useful implications mixed with speculation.

Questions:

- Is the question being answered actually the question that matters for the decision?
- Are the key claims clearly tied to evidence rather than asserted?
- Are the conclusions limited to what the evidence actually supports?
- Is the confidence level on each key claim explicit?
- Are decision-relevant implications separated from speculation or open questions?
- Would a skeptical reader understand what is known, inferred, and still unresolved?

## Returns
- per criterion: yes / partial / no, with one-sentence evidence
- overall verdict: ready / needs revision
- highest-leverage fix if revision is needed

## Pairs with
`mode.critique`, `guardrail.uncertainty`, `rubric.research-method`

## Avoid when
The artifact is still mostly raw notes — extract findings first, then evaluate the output.

---

## Metadata
- type: rubric
- stage: analyze
- strength: medium
