# tradeoff-matrix

## Purpose
Compare options across explicit criteria so the real tradeoffs are visible before choosing or recommending.

## Use when
Several plausible options exist and the risk is choosing by vibe, recency, politics, or a single over-weighted criterion.

## Expects
An option set plus criteria, constraints, or success conditions.

## Adds
A structured comparison that separates fit, cost, risk, reversibility, and confidence.

## Returns
- option matrix
- strongest option by criterion
- tradeoff that matters most
- dominated options to drop
- recommendation or next evidence needed

## Pairs with
`frame.success-criteria`, `mode.decide`, `schema.option-map`, `schema.decision-memo`

## Avoid when
There is only one viable option or the options are not yet concrete enough to compare.

## Helps prevent:
- hidden criteria
- false precision
- one-factor decisions

## How to use:
- compare only criteria capable of changing the decision
- keep scores qualitative unless the inputs justify numbers
- name the tradeoff that makes the choice hard

```text
Compare the viable options across the criteria that would actually change the choice.
Show where each option wins, loses, and depends on an assumption.
Name dominated options, the hardest tradeoff, and the next evidence needed if the choice is not yet ready.
```

---

## Metadata
- type: strategy
- stage: analyze
- strength: medium
