# strategy.inversion

## Purpose
Find constraints and failure modes that forward-planning misses by defining the worst outcome first and working backward.

## Use when
A plan needs stress-testing before commitment, you want to find failure modes that optimism may be obscuring, or you suspect forward-planning is missing structural risks.

## Expects
A plan, decision, goal, or situation to invert.

## Adds
A backward-looking failure analysis: what a bad outcome looks like, the most plausible paths to it, and what conditions would prevent each path.

## Returns
- worst realistic outcome definition
- most plausible paths to that outcome
- conditions that would prevent each path (treated as constraints or mitigations)

## Pairs with
`mode.critique`, `strategy.premortem`, `strategy.red_team`, `guardrail.assumption-audit`

## Avoid when
The task is still exploratory — inversion targets a specific plan or direction that can be inverted.

---

## Metadata
- type: strategy
- stage: critique
- strength: medium

---

## Helps prevent

- optimism blindness
- underestimating how things go wrong
- plans that ignore structural failure modes

## How to use it

1. define the worst realistic outcome for this situation
2. enumerate the most plausible paths to that outcome
3. flip each path: what conditions would prevent it?
4. treat the flipped conditions as design constraints or mitigations

## Quick invocation

```text
Apply the INVERSION strategy.
Define clearly what a bad outcome looks like for this situation.
List the most plausible paths to that bad outcome.
Then flip: what conditions would prevent each path?
```

Domain tags:
- inversion thinking
- risk mapping
- failure analysis
