# Composition Rules

This document defines the rules for combining blocks into effective prompts.

## Default Assembly Order

When building a one-shot prompt from blocks, follow this sequence:

```
1. Frame      → define the task, scope, and success criteria
2. Mode       → set the cognitive stance
3. Strategy   → add the reasoning mechanic (1–2 max)
4. Recurse    → add bounded decomposition, evaluation, refinement, or branch pruning if needed
5. Guardrail  → prevent the failure modes most likely here
6. Schema     → define the output shape
7. Rubric     → add evaluation criteria (optional)
```

Why this order works:

- Frame first gives the model a target before you tell it how to think.
- Mode shapes the reasoning stance before you add mechanics.
- Strategy and recurse blocks refine the thinking without overriding the stance.
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
strategy.problem-split # compatible modifier
guardrail.uncertainty  # compatible guardrail
```

Compatible pairs:

- `mode.explore` + `guardrail.uncertainty`
- `mode.create` + `frame.audience`
- `mode.synthesize` + `frame.extract-insights`
- `mode.critique` + `rubric.argument-quality`
- `mode.decide` + `frame.success-criteria`

Allowed transition sequence:

- `mode.explore` -> `mode.critique` when the first pass is explicitly for understanding and the second pass is explicitly for adversarial evaluation

If you use a transition sequence, name the handoff in the stack notes. The output of the first mode becomes the input context for the second; they are not active at the same time.

In the browser builder, loaded stacks keep this handoff as a one-shot composition brief at the top of the copied prompt. That brief tells the model to use the blocks as ordered phases in one response, not as separate turns.

In one-shot use, phases are working checkpoints. The final response should return the expected artifact for the stack, not a separate dump of every intermediate block output, unless the user explicitly asks to inspect the phase work.

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

### Selection guide: guardrails

| Need | Reach for | Why |
| ----- | --------- | --- |
| Calibrate uncertainty in a draft or recommendation | `guardrail.uncertainty` | It separates facts, assumptions, and unknowns before you over-commit. |
| Expose what must be true for a plan or conclusion to work | `guardrail.assumption-audit` | It enumerates hidden premises and tells you what would falsify them. |
| Stress a preferred answer against the strongest opposing case | `guardrail.disconfirming-evidence` | It searches for real contrary evidence instead of polishing the existing view. |

Use `guardrail.assumption-audit` + `guardrail.disconfirming-evidence` together only when both failure modes are real: hidden premises and confirmation bias.

### Selection guide: schemas

| Artifact you need | Reach for | Why |
| ----------------- | --------- | --- |
| Explain and justify a committed choice | `schema.decision-memo` | It captures the decision, rationale, tradeoffs, risks, confidence, and next action. |
| Turn a chosen direction into sequenced execution | `schema.execution-brief` | It makes ordering, dependencies, blockers, checkpoints, and escalation explicit. |
| Present critique, review, or threat-model results | `schema.findings-brief` | It ranks findings and ties each one to evidence, impact, fix, and confidence. |
| Write or revise prompts and instruction sets | `schema.prompt-spec` | It separates final prompt text from assumptions, constraints, output shape, tests, and limitations. |
| Debrief an incident or failure after stabilization | `schema.incident-postmortem` | It captures timeline, root cause, contributing factors, and prevention work. |
| Preserve multiple viable paths before choosing | `schema.option-map` | It shows when each option fits, what it assumes, and what evidence is still needed. |
| Design a test before acting on a claim | `schema.experiment-plan` | It names the hypothesis, method, metric, confounds, and decision rule before results are known. |
| Produce audience-fit prose from source material | `schema.content-draft` | It separates the draft from the takeaway, call to action, and revision notes. |

Common handoff:

- `schema.decision-memo` -> `schema.execution-brief` when you first need to justify the choice and then turn it into an action sequence.

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
| Creative first draft  | `frame.audience` + `mode.create` + `schema.content-draft` |
| Notes to synthesis    | `frame.extract-insights` + `mode.synthesize` |
| Option comparison     | `frame.success-criteria` + `strategy.tradeoff-matrix` |

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

---

## I/O Contract Standard

Every block has two input labels:

| Label | Use for |
|-------|---------|
| `context:` | Situation, problem, material, or chosen direction being worked on |
| `artifact:` | Produced output being evaluated, critiqued, refined, or structured |

**When to use `context:`:** frame blocks, mode blocks, strategy blocks, schema blocks — when you are describing the thing you are reasoning about.

**When to use `artifact:`:** guardrail blocks, rubric blocks, recurse.evaluate, recurse.refine, recurse.branch-prune, mode.critique — when you are handing over something already produced for review, testing, or refinement.

Recurse blocks with control parameters (`depth:`, `branches:`, `iterations:`) take those as explicit fields alongside `context:` or `artifact:`.

### Chaining patterns

For manual multi-pass use, outputs are named sections and can be fed forward by pasting the relevant section into the next block's input. For the default lightweight use case, keep the blocks in this order and send them as one prompt with clear section headings.

In the browser builder, the first task-like input is filled from the Task field by default. Later `context:` / `artifact:` inputs are wired inline to use the output from the previous step by default. Each step input can be changed to use the original Task field or a custom value.

When a built prompt has multiple phases, the copied prompt includes a one-shot phase brief and an input handoff map. This keeps manual compositions and saved stacks aligned: the model sees the phase order before it sees any inline "previous output" reference.

```
EXPLORE PHASE
  context: → mode.explore
  output:  plausible directions, key unknowns

FRAME PHASE
  context: → frame.task
  output:  stated ask, objective, scope boundary, constraints, unknowns

STRATEGY PHASE
  context: [frame output] → strategy.premortem | strategy.steelman | strategy.problem-split | recurse.decompose
  output:  failure causes | strongest position | subproblems | solution tree

GUARDRAIL PHASE
  artifact: [reasoning or decision so far] → guardrail.assumption-audit | guardrail.disconfirming-evidence | guardrail.uncertainty
  output:   exposed assumptions | opposing evidence | calibrated uncertainty

DECIDE PHASE
  context: [options + criteria + guardrail results] → mode.decide
  output:  chosen option, rationale, tradeoff, next action

OUTPUT PHASE
  context: [decided direction, critique, or prompt draft] → schema.decision-memo | schema.execution-brief | schema.findings-brief | schema.prompt-spec | schema.incident-postmortem
  output:  structured document

EVAL PHASE
  artifact: [produced output] → rubric.argument-quality | rubric.decision-quality | rubric.plan-quality | rubric.research-quality | rubric.writing-quality
  output:   verdict (ready / needs revision) + highest-leverage fix
```

### Standard chaining example

```
frame.task           context: "We need to migrate our auth service before Q3."
  ↓ (paste: stated ask, objective, scope boundary, constraints)
strategy.premortem   context: [frame.task output]
  ↓ (paste: failure causes)
guardrail.assumption-audit  artifact: [premortem output]
  ↓ (paste: exposed assumptions)
mode.decide          context: [options + assumption audit]
  ↓ (paste: chosen option + rationale)
schema.execution-brief  context: [mode.decide output]
```

### Rules

- One `context:` or `artifact:` per block. Do not paste everything into it — paste the specific prior output section that is relevant.
- If the next block takes `artifact:`, hand over the prior block's **output section**, not the input you gave it.
- named fields like `criteria:`, `depth:`, `branches:` come before `context:` / `artifact:` in the input block.
