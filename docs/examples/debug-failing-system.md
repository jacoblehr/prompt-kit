# Example Walkthrough: Debug a Failing System

## The Problem

Your production system is failing intermittently. Logs show errors but the root cause isn't clear. You need to systematically investigate and fix it.

## The Stack

```
mode.explore + frame.task + mode.critique
→ frame.cause-mapping + schema.execution-brief
→ mode.reflect + frame.extract-insights
```

## Step-by-Step

### 1. Critique the Current State

**Block**: `mode.critique`

- Focus on what's failing, not what should work
- Suppress politeness, surface hard truths

### 2. Frame the Fault

**Block**: `frame.task`

- Separate the visible failure from the likely objective
- State what is in scope for the investigation
- Keep constraints literal before testing causes

### 3. Critique Likely Causes

**Block**: `mode.critique`

- Pressure-test the leading explanations
- Look for contradictions or easy-to-miss boundary failures
- Prioritize the hypotheses that would do the most damage if ignored

### 4. Map Causes

**Block**: `frame.cause-mapping`

- Trace visible symptoms back to structural causes
- Separate triggers from root cause
- Name the earliest intervention point

### 5. Draft the Execution Brief

**Block**: `schema.execution-brief`

- Turn the diagnosis into the next experiment sequence
- Make dependencies and blockers visible
- Keep the first checkpoint close enough to catch a wrong turn early

### 6. Reflect and Learn

**Block**: `mode.reflect`

- What did we learn about the system?
- What assumptions were wrong?

### 7. Extract Insights

**Block**: `frame.extract-insights`

- Turn debugging findings into reusable knowledge
- Document patterns that led to the failure

### 8. Draft the Execution Brief

**Block**: `schema.execution-brief`

- Concrete steps to fix
- Who owns each action
- Timeline and success criteria

## Result

A systematic debugging approach that:

- Identifies root causes, not symptoms
- Turns diagnosis into an explicit next-step plan
- Creates reusable knowledge for future incidents
- Documents the system's true behavior

## Key Takeaways

- Use `mode.critique` to avoid wishful thinking about the problem
- `frame.cause-mapping` separates trigger from structural cause
- `schema.execution-brief` closes the loop with a concrete next move
- The full sequence turns reactive firefighting into systematic improvement
