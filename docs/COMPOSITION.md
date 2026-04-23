# Composition Rules

This document defines the rules for combining blocks into effective prompts.

## Default Assembly Order

When building a prompt from blocks, follow this sequence:

```
1. Frame      → define the task, scope, and success criteria
2. Mode       → set the cognitive stance
3. Strategy   → add the reasoning mechanic (1–2 max)
4. Lens       → apply a viewpoint if relevant (optional)
5. Guardrail  → prevent the failure modes most likely here
6. Schema     → define the output shape
7. Rubric     → add evaluation criteria (optional)
```

Why this order works:

- Frame first gives the model a target before you tell it how to think.
- Mode shapes the reasoning stance before you add mechanics.
- Strategy and lens refine the thinking without overriding the stance.
- Guardrail arrives after reasoning is set — it constrains without blocking.
- Schema comes late so the prompt reads like a task before it reads like a form.
- Rubric is optional. Add it when the task needs explicit self-checking.

---

## Composition Rules

### Rule 1: one primary mode

Modes conflict easily. Keep one dominant mode per prompt.

**Bad:**

```
mode.explore + mode.decide + mode.critique all at once
```

**Good:**

```
mode.explore           # one primary mode
lens.incentive-audit   # compatible modifier
guardrail.uncertainty  # compatible guardrail
```

Compatible pairs:

- `mode.explore` + `guardrail.uncertainty`
- `mode.critique` + `rubric.argument-quality`
- `mode.decide` + `frame.success-criteria`

Incompatible pairs:

- `mode.explore` + immediate convergence schema
- `mode.decide` + open-ended ideation blocks

### Rule 2: strategies are additive, but only up to a point

Strategies can stack, but too many create prompt drag.

Recommended limits:

- 1 strategy for simple tasks
- 2 strategies for deep tasks
- 3 only in deliberate, named stacks

Beyond that you get redundancy, internal conflict, and diluted signal.

### Rule 3: schemas come late

Place output schema after reasoning instructions.

**Why:** First tell the model what job it is doing, then how to think, then how to present. A schema placed early makes the prompt read like a form before it reads like a task.

### Rule 4: guardrails should target a failure mode, not decorate

A guardrail must exist because a specific failure mode is real here.

**Bad:**

```
Adding guardrail.uncertainty to every prompt by default
Adding "be concise and careful and detailed" as decoration
```

**Good:**

```
guardrail.uncertainty      → when ambiguity is genuinely present
guardrail.disconfirming-evidence → when confirmation bias is a real risk
strategy.premortem        → before committing to a plan that felt too easy
```

Guardrails should be surgical.

### Rule 5: each block must have a non-overlapping role

If two blocks are doing the same job, one should go.

Test: remove one block. If the prompt changes meaningfully, keep it. If nothing important is lost, drop it.

---

## Minimum Viable Prompts

Not every task needs a full stack. Often two or three blocks are enough.

| Task shape            | Minimum blocks                            |
| --------------------- | ----------------------------------------- |
| Underframed problem   | `frame.task` + `mode.explore`             |
| Quick critique        | `mode.critique` + `guardrail.uncertainty` |
| Fast ideation         | `mode.explore` + target domain            |
| Pressure test         | `mode.critique` + `strategy.premortem`    |
| Decision with options | `mode.decide` + `frame.success-criteria`  |
| Structured output     | task block + `schema.decision-memo`       |

---

## "Start here" guide

Not sure which blocks to reach for?

| What you need                   | Start with               |
| ------------------------------- | ------------------------ |
| Clarify a vague task            | `frame.task`             |
| Open up the problem space       | `mode.explore`           |
| Structured reasoning            | add one `strategy` block |
| Prevent a specific failure mode | add a `guardrail` block  |
| Consistent output format        | add a `schema` block     |
| Recurring workflow              | find a matching `stack`  |
| Evaluate the output             | add a `rubric` block     |
