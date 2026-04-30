# schema.experiment-plan

## Purpose
Render a hypothesis, research question, or product bet as a testable experiment plan with a decision rule.

## Use when
The team needs to learn before committing and the output should specify how evidence will change action.

## Expects
A hypothesis, claim, product bet, policy change, or uncertain recommendation.

## Adds
A structured test plan that names the metric, method, sample, risks, and decision threshold up front.

## Returns
- hypothesis
- decision this test informs
- method
- metric or observation
- sample or scope
- confounds and risks
- decision rule
- next action after each outcome

## Pairs with
`guardrail.assumption-audit`, `guardrail.uncertainty`, `rubric.research-method`, `frame.success-criteria`

## Avoid when
The claim can be resolved directly from existing evidence or the team is not prepared to act on the result.

---

## Metadata
- type: schema
- stage: conclude
- strength: medium
