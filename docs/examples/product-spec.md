# Example Walkthrough: Write a Product Specification

## The Problem

You need to write a product specification for a new feature, but the requirements are vague and stakeholders have different priorities. You need to clarify, align, and produce a spec that's both complete and defensible.

## The Stack

```
frame.task + frame.success-criteria + guardrail.assumption-audit
→ rubric.plan-quality + schema.execution-brief
→ mode.reflect + frame.extract-insights
```

## Step-by-Step

### 1. Frame the Task

**Block**: `frame.task`

- Convert stakeholder request into a clear problem statement
- Separate the "ask" from the "job to be done"
- Define scope boundaries

### 2. Define Success

**Block**: `frame.success-criteria`

- What does "done" look like?
- How will we know if the feature succeeded?
- Quantifiable metrics where possible

### 3. Audit Assumptions

**Block**: `guardrail.assumption-audit`

- List every assumption in the chosen path
- Rate confidence in each
- Plan validation tests

### 4. Evaluate the Plan

**Block**: `rubric.plan-quality`

- Are dependencies visible and steps ordered well?
- Is the first action concrete enough to do now?
- Is there an early checkpoint before the work drifts?

### 5. Draft the Execution Brief

**Block**: `schema.execution-brief`

- Convert the scoped feature into a buildable brief
- Sequence the work and call out dependencies
- Make the first checkpoint and immediate next action explicit

### 6. Reflect

**Block**: `mode.reflect`

- What worked in the spec process?
- What would we do differently?

### 7. Capture Learnings

**Block**: `frame.extract-insights`

- Turn this experience into reusable patterns
- Document what makes a good spec for your product
- Update team guidelines

## Result

A product specification that:

- Is grounded in user needs and constraints
- Has explicit tradeoffs and justifications
- Includes validation plans for key assumptions
- Is structured for engineering review
- Captures organizational learning

## Key Takeaways

- `frame.success-criteria` keeps the feature target testable
- `guardrail.assumption-audit` keeps risk visible
- `schema.execution-brief` turns the spec into a buildable artifact
- The sequence balances creativity with rigor
