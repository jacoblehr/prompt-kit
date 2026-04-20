# Stack: Explore To Decision

Use when you need options first and a choice second.

Useful inputs:

- the decision context or problem to solve
- any candidate options already on the table
- any known criteria, constraints, or deadline

Suggested blocks:

1. `mode.explore`
2. `frame.generate-options`
3. `frame.brainstorm-angles`
4. `frame.success-criteria`
5. `mode.decide`
6. `frame.compare-options`
7. `frame.choose-under-uncertainty`
8. `schema.decision-memo`

Expected outcome:

- option set
- explicit criteria
- comparison
- chosen direction
- rationale
- next action

Domain tags:
- decision making
- option generation
- evaluation

---

## Composition notes

**Minimum blocks:** `mode.explore`, `frame.generate-options`, `mode.decide`

**Why this order works:** Explore mode opens the search space before any option is privileged. Generate-options and brainstorm-angles ensure the shortlist has real breadth before criteria are applied. Success-criteria defines the evaluation standard before options are compared — setting criteria after seeing options invites rationalization. Decide mode then shifts the cognitive stance to convergence. Compare-options evaluates against criteria. Choose-under-uncertainty and decision-memo close the decision loop.

**Common swaps:** Swap `frame.brainstorm-angles` for `strategy.problem-split` when the options space is tangled rather than narrow. Skip the full version and use `mode.explore` + `frame.success-criteria` + `mode.decide` + `schema.decision-memo` as the minimum for simpler decisions.

**Common failure mode:** Switching to decide mode before the option set has real breadth. The most common failure is converging on the first plausible option before genuinely wider alternatives have been surfaced.
