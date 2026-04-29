# Example: Write a Product Specification

## The Problem

Stakeholders want a team notifications feature, but the request is vague: some people want digest emails, others want real-time in-app alerts, and engineering is worried about noisy notification rules.

## Stack

`feature-design`

Blocks:

1. `frame.task`
2. `frame.success-criteria`
3. `guardrail.assumption-audit`
4. `rubric.plan-quality`
5. `schema.execution-brief`

## One-Shot Prompt

```text
## Task

Turn this vague feature request into a buildable product specification.

Context:
- Feature: team notifications.
- Stakeholder asks conflict between digest emails and real-time in-app alerts.
- Engineering concern: notification rules may become noisy or hard to maintain.
- The output should be useful for product, design, and engineering review.

## Framing

Separate the stated ask from the likely objective. Define the scope boundary explicitly, including what is out of scope for the first version.

Define success criteria:
- user-visible outcome
- product metric or behavioral signal
- engineering quality bar
- launch/readiness criteria

## Checks

Audit assumptions behind the proposed approach:
- what must be true
- confidence level
- cheapest validation test
- what would change the plan

Evaluate the plan for:
- clear dependencies
- sequenced steps
- concrete first action
- early checkpoint
- visible risks and tradeoffs

## Output

Return an execution brief with:
- problem statement
- target users
- goals and non-goals
- proposed v1 scope
- success criteria
- assumptions and validation plan
- implementation slices
- open questions
- review checklist
```

## Why This Works

This is still a single prompt. The stack supplies structure, risk checks, and output shape without asking the model to run an autonomous workflow.
