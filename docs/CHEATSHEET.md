# Prompt Kit Cheatsheet

## Block Type Quick Reference

| Type        | When to Use                        | Example                                               |
| ----------- | ---------------------------------- | ----------------------------------------------------- |
| `frame`     | Unclear task, need to define scope | `frame.task`, `frame.success-criteria`                |
| `mode`      | Set cognitive stance               | `mode.explore`, `mode.critique`, `mode.decide`        |
| `strategy`  | Need specific reasoning approach   | `strategy.problem-split`, `strategy.premortem`        |
| `lens`      | Apply conceptual perspective       | `lens.psychology`, `lens.economics`                   |
| `guardrail` | Prevent known failure modes        | `guardrail.uncertainty`, `guardrail.assumption-audit` |
| `schema`    | Require structured output          | `schema.decision-memo`, `schema.execution-brief`      |
| `rubric`    | Need evaluation criteria           | `rubric.decision-quality`, `rubric.prompt-quality`    |

## Stack Selection Guide

| Need                | Recommended Stack                                                            |
| ------------------- | ---------------------------------------------------------------------------- |
| Quick gut check     | `mode.critique` + `guardrail.uncertainty`                                    |
| Generate ideas      | `mode.explore` + `frame.brainstorm-angles`                                   |
| Debug issue         | `mode.critique` + `frame.codepath-walkthrough` + `lens.invariant-check`      |
| Make decision       | `mode.decide` + `frame.compare-options` + `guardrail.assumption-audit`       |
| Learn from work     | `mode.reflect` + `frame.extract-insights` + `schema.plan-next-actions`       |
| Research topic      | `mode.explore` → `mode.analyze` → `mode.decide`                              |
| Ship feature safely | `mode.explore` + `frame.success-criteria` + `guardrail.change-impact-review` |

## Common Block Pairs

```
frame.task + mode.explore        → Define and explore the problem
mode.explore + strategy.split    → Generate many options
mode.critique + guardrail.bias   → Find and address bias
frame.success-criteria + schema  → Define and structure output
mode.decide + rubric.quality     → Make and evaluate decisions
```

## Key Combinations by Use Case

### Problem Framing

- `frame.task` → `frame.success-criteria` → `frame.scope`

### Ideation

- `mode.explore` → `strategy.problem-split` → `frame.brainstorm-angles`

### Critical Review

- `mode.critique` → `guardrail.disconfirming-evidence` → `lens.confidence-calibration`

### Decision Making

- `frame.compare-options` → `guardrail.assumption-audit` → `schema.decision-memo`

### Learning

- `mode.reflect` → `frame.extract-insights` → `schema.plan-next-actions`

## Starter Stacks (Copy-Paste)

### Quick Sense Check

```
mode.critique + guardrail.uncertainty
```

### Fast Ideation

```
mode.explore + frame.brainstorm-angles
```

### Debug Failure

```
mode.critique + frame.codepath-walkthrough + lens.invariant-check + guardrail.change-impact-review
```

### Make Decision

```
mode.decide + frame.compare-options + guardrail.assumption-audit + schema.decision-memo + rubric.decision-quality
```

### Safe Code Change

```
mode.explore + frame.codepath-walkthrough + lens.invariant-check + guardrail.change-impact-review + frame.test-case-design
```

## Field-Specific Lenses

### Psychology/Motivation

- `lens.motivation-diagnosis` — Why people behave as they do
- `lens.user-mental-model` — How users think about the problem
- `lens.bias-check` — Common cognitive biases

### Economics/Business

- `lens.opportunity-cost` — What you give up
- `lens.incentive-audit` — Who benefits from what
- `lens.cost-of-delay` — Time-value of decisions

### Engineering/Technical

- `lens.invariant-check` — What must always be true
- `lens.interface-contract-review` — Boundary conditions
- `lens.tech-debt-quadrant` — Tradeoff analysis

### Research/Evidence

- `lens.evidence-strength` — How strong is the evidence?
- `lens.source-trustworthiness` — Can we trust the source?
- `lens.claim-evidence-reasoning` — Is the argument sound?

## Guardrail Checklist

- [ ] `guardrail.uncertainty` — Surface unknowns
- [ ] `guardrail.assumption-audit` — Check premises
- [ ] `guardrail.disconfirming-evidence` — Seek contrary data
- [ ] `guardrail.change-impact-review` — Assess blast radius
- [ ] `guardrail.release-readiness` — Check preconditions
- [ ] `guardrail.statistical-significance-check` — Validate findings

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

### Experiment Design

```
hypothesis: [predicted relationship]
success metrics: [how to measure]
time horizon: [duration]
actors: [who is involved]
constraints: [limitations]
fallback plan: [if it fails]
```

## Advanced Patterns

### Multi-Stage Composition

```
frame.task → mode.explore → strategy.split → frame.brainstorm-angles
→ mode.decide → guardrail.assumption-audit → schema.decision-memo
→ rubric.decision-quality → mode.reflect → frame.extract-insights
```

### Iterative Refinement

```
mode.critique → frame.argument-structure → lens.confidence-calibration
→ guardrail.change-impact-review → frame.improvement-plan
```

## Quick Stats

- 7 block types
- 64 stacks across 9 families
- 400+ prompt blocks in catalog
- Average stack: 5–8 blocks
- Most common: `frame` + `mode` + `strategy` + `guardrail`

---

**Pro tip**: Start with 1–2 blocks, test, then expand. Complex stacks aren't always better!
