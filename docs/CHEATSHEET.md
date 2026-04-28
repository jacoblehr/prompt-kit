# Prompt Kit Cheatsheet

## Block Type Quick Reference

| Type        | When to Use                        | Example                                               |
| ----------- | ---------------------------------- | ----------------------------------------------------- |
| `frame`     | Unclear task, need to define scope | `frame.task`, `frame.success-criteria`                |
| `mode`      | Set cognitive stance               | `mode.explore`, `mode.critique`, `mode.decide`        |
| `strategy`  | Need specific reasoning approach   | `strategy.problem-split`, `strategy.premortem`        |
| `guardrail` | Prevent known failure modes        | `guardrail.uncertainty`, `guardrail.assumption-audit` |
| `schema`    | Require structured output          | `schema.decision-memo`, `schema.execution-brief`      |
| `rubric`    | Need evaluation criteria           | `rubric.decision-quality`, `rubric.plan-quality`      |

## Stack Selection Guide

| Need                | Recommended Stack                                                            |
| ------------------- | ---------------------------------------------------------------------------- |
| Quick gut check     | `mode.critique` + `guardrail.uncertainty`                                    |
| Generate ideas      | `frame.task` + `mode.explore`                                                |
| Debug issue         | `mode.explore` + `frame.task` + `frame.cause-mapping`                        |
| Make decision       | `frame.success-criteria` + `guardrail.assumption-audit` + `mode.decide`     |
| Learn from work     | `mode.reflect` + `frame.extract-insights` + `schema.execution-brief`         |
| Research topic      | `mode.explore` + `frame.extract-insights` + `rubric.research-quality`        |
| Ship feature safely | `frame.task` + `frame.success-criteria` + `guardrail.assumption-audit`       |

## Common Block Pairs

```
frame.task + mode.explore        → Define and explore the problem
mode.explore + strategy.problem-split → Break a large problem into tractable pieces
mode.critique + guardrail.disconfirming-evidence → Find and pressure-test weak spots
frame.success-criteria + schema  → Define and structure output
mode.decide + rubric.decision-quality → Make and evaluate decisions
```

## Key Combinations by Use Case

### Problem Framing

- `frame.task` → `frame.success-criteria` → `guardrail.uncertainty`

### Ideation

- `frame.task` → `mode.explore` → `strategy.problem-split`

### Critical Review

- `mode.critique` → `guardrail.disconfirming-evidence` → `guardrail.uncertainty`

### Decision Making

- `frame.success-criteria` → `guardrail.assumption-audit` → `schema.decision-memo`

### Learning

- `mode.reflect` → `frame.extract-insights` → `schema.execution-brief`

## Starter Stacks (Copy-Paste)

### Quick Sense Check

```
mode.critique + guardrail.uncertainty
```

### Fast Ideation

```
frame.task + mode.explore
```

### Debug Failure

```
mode.explore + frame.task + mode.critique + frame.cause-mapping + schema.execution-brief
```

### Make Decision

```
frame.success-criteria + guardrail.assumption-audit + mode.decide + schema.decision-memo + rubric.decision-quality
```

### Safe Code Change

```
frame.task + mode.explore + guardrail.assumption-audit + strategy.premortem + schema.execution-brief
```

## Useful By Job

### Framing

- `frame.task` — Clarify the ask and scope boundary
- `frame.success-criteria` — Make success judgeable before work starts
- `guardrail.uncertainty` — Surface what is still unknown

### Critique

- `mode.critique` — Pressure-test the current answer
- `guardrail.assumption-audit` — Expose hidden premises
- `guardrail.disconfirming-evidence` — Find the strongest opposing case

### Delivery

- `schema.decision-memo` — Record and justify a choice
- `schema.execution-brief` — Turn a direction into a sequenced plan
- `schema.incident-postmortem` — Capture lessons after a stabilized failure

## Guardrail Checklist

- [ ] `guardrail.uncertainty` — Surface unknowns
- [ ] `guardrail.assumption-audit` — Check premises
- [ ] `guardrail.disconfirming-evidence` — Seek contrary data

## Schema Templates

### Decision Memo

```
decision: [what was decided]
context: [background]
options considered: [alternatives]
criteria used: [evaluation metrics]
risks: [potential issues]
next steps: [action items]
```

### Execution Brief

```
objective: [what must happen]
ordered steps or milestones: [sequence]
dependencies: [what this relies on]
major risks: [what could derail it]
first checkpoint: [earliest validation point]
immediate next action: [what to do now]
```

## Advanced Patterns

### Multi-Stage Composition

```
frame.task → mode.explore → strategy.problem-split → guardrail.uncertainty
→ mode.decide → guardrail.assumption-audit → schema.decision-memo
→ rubric.decision-quality → mode.reflect → frame.extract-insights
```

### Iterative Refinement

```
mode.critique → guardrail.assumption-audit → guardrail.disconfirming-evidence
→ schema.execution-brief
```

---

**Pro tip**: Start with 1–2 blocks, test, then expand. Complex stacks aren't always better!
