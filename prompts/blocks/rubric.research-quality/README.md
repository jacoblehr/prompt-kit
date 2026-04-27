# rubric.research-quality

## Purpose
Validate that a research pass is rigorous enough to inform a decision or support a position.

## Use when
After completing an investigation, before using findings to decide or write.

## Expects
A research summary or set of findings.

## Adds
Per-criterion judgments that flag source gaps, unsupported conclusions, and missing disconfirmation.

Questions:

- Is the question being answered actually the question that matters for the decision?
- Are the sources capable of answering this question, or is there a gap?
- Has disconfirming evidence been actively sought, not just noted when encountered?
- Are the strongest counter-arguments represented fairly?
- Are the conclusions limited to what the evidence actually supports?
- Is the confidence level on each key claim explicit?
- Would a skeptical expert with opposing priors find this research intellectually honest?

## Returns
- per criterion: yes / partial / no, with one-sentence evidence
- overall verdict: ready / needs revision
- highest-leverage fix if revision is needed

## Pairs with
`mode.critique`, `guardrail.uncertainty`, `guardrail.disconfirming-evidence`

## Avoid when
The research is not yet complete — finish the investigation first.

---

## Metadata
- type: rubric
- stage: analyze
- strength: medium
