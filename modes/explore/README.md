# mode.explore

## Purpose
Set a breadth-first cognitive stance to widen the search space and surface unknowns before converging.

## Use when
The problem is still underframed, you need options before making decisions, or premature narrowing is the main risk.

## Expects
A problem, question, or situation to explore. Works best after a `frame.task` block has established the target.

## Adds
A directive to generate multiple plausible directions, surface unknowns, and avoid early commitment.

## Returns
Multiple directions, angles, or hypotheses rather than a single answer. Expects breadth over depth in the initial output.

## Pairs with
`frame.task`, `strategy.problem-split`, `guardrail.uncertainty`, `lens.*`

## Avoid when
A clear decision with defined options already exists — in that case use `mode.decide` instead.

---

## Metadata
- type: mode
- stage: explore
- strength: medium

---

## Optimizes for

- breadth
- variety
- alternative framings
- surfaced unknowns

## Suppresses

- early commitment
- single-path planning
- fake certainty

## Exit when

- repeated patterns appear
- a shortlist exists
- the next step is comparison or choice

## Quick invocation

```text
Enter EXPLORE mode.
Generate multiple plausible directions instead of converging too early.
Surface unknowns and contrasting options.
Do not choose yet unless I explicitly ask you to.
```

Domain tags:
- open exploration
- divergent thinking
- problem setup
