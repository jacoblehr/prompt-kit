# Example: Debug a Failing System

## The Problem

Production checkout requests intermittently fail with HTTP 502s. Logs mention upstream timeouts, but the team is not sure whether the cause is the payment provider, the service mesh, or a recent retry change.

## Stack

`debug`

Blocks:

1. `frame.task`
2. `mode.explore`
3. `mode.critique`
4. `frame.cause-mapping`
5. `schema.execution-brief`

## One-Shot Prompt

```text
## Task

Diagnose this production fault systematically before proposing a fix.

Context:
- Checkout requests intermittently return HTTP 502.
- Logs mention upstream timeouts.
- Possible areas: payment provider, service mesh, recent retry change.
- We need the next highest-value experiment, not a broad rewrite.

## Reasoning Approach

First restate the fault as a structured problem frame:
- stated ask
- likely objective
- in scope
- out of scope
- constraints
- knowns and unknowns

Then survey plausible failure paths without choosing yet. Map candidate causes, unknowns, and signals worth testing.

Then switch to critique. Pressure-test the leading causes and look for contradictions, boundary failures, and explanations that only fit part of the evidence.

Then map the causal chain:
- symptom
- trigger
- contributing factors
- root cause candidates
- earliest useful intervention point

## Output

Return an execution brief with:
- working diagnosis
- top 3 hypotheses ranked by expected information gain
- first experiment to run
- evidence that would confirm or reject each hypothesis
- proposed fix only if the evidence supports it
- validation step proving the fix addresses the cause, not just the symptom
```

## Why This Works

The prompt stays one-shot, but it still creates a phase order: frame before exploration, explore before critique, critique before cause mapping, cause mapping before execution. That avoids turning the stack into a multi-turn workflow while preserving the useful discipline of the blocks.
