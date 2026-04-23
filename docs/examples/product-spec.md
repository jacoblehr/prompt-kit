# Example Walkthrough: Write a Product Specification

## The Problem

You need to write a product specification for a new feature, but the requirements are vague and stakeholders have different priorities. You need to clarify, align, and produce a spec that's both complete and defensible.

## The Stack

```
mode.explore + frame.task + frame.success-criteria
→ guardrail.uncertainty + lens.user-mental-model
→ mode.decide + frame.compare-options + guardrail.assumption-audit
→ schema.decision-memo + rubric.decision-quality
→ mode.reflect + frame.extract-insights
```

## Step-by-Step

### 1. Explore the Problem Space

**Block**: `mode.explore`

- Generate multiple interpretations of the vague request
- Surface hidden constraints and opportunities
- Avoid premature convergence on one solution

### 2. Frame the Task

**Block**: `frame.task`

- Convert stakeholder request into a clear problem statement
- Separate the "ask" from the "job to be done"
- Define scope boundaries

### 3. Define Success

**Block**: `frame.success-criteria`

- What does "done" look like?
- How will we know if the feature succeeded?
- Quantifiable metrics where possible

### 4. Surface Uncertainty

**Block**: `guardrail.uncertainty`

- What don't we know?
- Which assumptions are most dangerous?
- How can we validate them quickly?

### 5. Understand Users

**Block**: `lens.user-mental-model`

- How will users think about this feature?
- What mental models do they bring?
- Where will they expect vs. actual behavior?

### 6. Make a Decision

**Block**: `mode.decide`

- Move from exploration to commitment
- Choose an approach based on criteria
- Accept tradeoffs explicitly

### 7. Compare Options

**Block**: `frame.compare-options``

- Structure the alternatives
- Apply decision criteria
- Identify pros/cons of each

### 8. Audit Assumptions

**Block**: `guardrail.assumption-audit`

- List every assumption in the chosen path
- Rate confidence in each
- Plan validation tests

### 9. Document the Decision

**Block**: `schema.decision-memo`

- Decision and context
- Options considered
- Criteria used
- Risks and mitigations

### 10. Evaluate Quality

**Block**: `rubric.decision-quality`

- Does the spec meet quality standards?
- Is it clear, complete, actionable?
- Can engineering build from it?

### 11. Reflect

**Block**: `mode.reflect`

- What worked in the spec process?
- What would we do differently?

### 12. Capture Learnings

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

- `mode.explore` prevents premature specification
- `guardrail.uncertainty` keeps risk visible
- `schema.decision-memo` creates defensible documentation
- The sequence balances creativity with rigor
