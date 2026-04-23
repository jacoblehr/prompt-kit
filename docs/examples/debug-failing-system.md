# Example Walkthrough: Debug a Failing System

## The Problem

Your production system is failing intermittently. Logs show errors but the root cause isn't clear. You need to systematically investigate and fix it.

## The Stack

```
mode.critique + frame.codepath-walkthrough + lens.invariant-check
→ guardrail.change-impact-review + frame.test-case-design
→ mode.reflect + frame.extract-insights + schema.plan-next-actions
```

## Step-by-Step

### 1. Critique the Current State

**Block**: `mode.critique`

- Focus on what's failing, not what should work
- Suppress politeness, surface hard truths

### 2. Walk Through the Code Path

**Block**: `frame.codepath-walkthrough`

- Map every execution path
- Identify where errors could originate
- Document assumptions at each step

### 3. Check Invariants

**Block**: `lens.invariant-check`

- What must always be true about this system?
- Which invariants are violated by the errors?

### 4. Assess Impact

**Block**: `guardrail.change-impact-review`

- Which callers are affected?
- What's the blast radius of potential fixes?

### 5. Design Tests

**Block**: `frame.test-case-design`

- Create tests that reproduce the failure
- Design tests for each code path identified in step 2

### 6. Reflect and Learn

**Block**: `mode.reflect`

- What did we learn about the system?
- What assumptions were wrong?

### 7. Extract Insights

**Block**: `frame.extract-insights`

- Turn debugging findings into reusable knowledge
- Document patterns that led to the failure

### 8. Plan Next Actions

**Block**: `schema.plan-next-actions`

- Concrete steps to fix
- Who owns each action
- Timeline and success criteria

## Result

A systematic debugging approach that:

- Identifies root causes, not symptoms
- Minimizes risk of introducing new bugs
- Creates reusable knowledge for future incidents
- Documents the system's true behavior

## Key Takeaways

- Use `mode.critique` to avoid wishful thinking about the problem
- `lens.invariant-check` surfaces hidden assumptions
- `frame.test-case-design` closes the loop with verification
- The full sequence turns reactive firefighting into systematic improvement
