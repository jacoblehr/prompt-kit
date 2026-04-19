# Stack: Prioritise Under Constraints

Use when you have more to do than capacity allows and need a principled, defensible way to sequence or cut work.

Useful inputs:

- the backlog of work, initiatives, or options to prioritise
- constraints: time, budget, headcount, or dependencies
- the goal or outcome that prioritisation should optimise for

Suggested blocks:

1. `frame.dependency-map`
2. `frame.risk-register`
3. `frame.prioritize-opportunities`
4. `frame.compare-options`
5. `schema.rollout-plan`

Expected outcome:

- dependencies mapped so sequencing decisions reflect what actually must come first
- risks registered: which items are high-risk if deprioritised, and which are merely painful?
- opportunities scored against the goal: value, urgency, feasibility, and strategic fit
- options compared on the dimensions that matter: not just effort vs impact
- sequenced rollout plan with explicit rationale for what was cut or deferred

Domain tags:
- deciding
- prioritisation
- planning
- constraints

---

## Composition notes

**Minimum blocks:** `frame.dependency-map`, `frame.prioritize-opportunities`

**Why this order works:** Dependencies before priorities — sequencing decisions that ignore dependencies produce plans that cannot execute in the proposed order. Risk-register adds the downside view: which items carry the most risk if deprioritized? Prioritize-opportunities evaluates against the actual goal. Compare-options provides the head-to-head comparison for the closest calls. Rollout-plan closes with explicit rationale for what was cut or deferred.

**Common swaps:** Swap `frame.compare-options` for `schema.decision-memo` when a documented decision is needed. Swap `frame.rollout-plan` for `schema.execution-brief` for a shorter handoff document.

**Common failure mode:** Prioritizing without mapping dependencies first. A priority list that ignores dependencies produces an execution order that looks logical but cannot actually run.
