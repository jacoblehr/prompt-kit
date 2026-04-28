# rubric.research-method

## Purpose
Validate that a research pass or investigation method was rigorous enough to trust before relying on its findings.

## Use when
After gathering evidence or running an investigation, before treating the process as sound enough to support a decision.

## Expects
A research summary, notes, or findings that describe how the investigation was conducted.

## Adds
Per-criterion judgments that expose source gaps, weak method choices, missing disconfirmation, and unauditable reasoning paths.

Questions:

- Is the question scoped clearly enough to investigate or test?
- Are the sources, tests, or methods capable of answering that question?
- Has disconfirming evidence been actively sought, not just noted when encountered?
- Are confounds, blind spots, or sampling limits named explicitly?
- Are the strongest counter-arguments represented fairly?
- Could another reviewer audit how the conclusion was reached?

## Returns
- per criterion: yes / partial / no, with one-sentence evidence
- overall verdict: ready / needs revision
- highest-leverage fix if revision is needed

## Pairs with
`guardrail.disconfirming-evidence`, `guardrail.uncertainty`, `rubric.research-quality`

## Avoid when
You only need to judge a finished argument or memo and do not have visibility into how the evidence was gathered.

---

## Metadata
- type: rubric
- stage: analyze
- strength: medium