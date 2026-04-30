# schema.prompt-spec

## Purpose
Render a prompt, system prompt, or persistent instruction set as a testable prompt spec.

## Use when
Designing, rewriting, or reviewing prompts where the final artifact needs clear task definition, boundaries, constraints, output shape, and test cases.

## Expects
A prompt draft, desired assistant behavior, workflow description, or prompt-improvement analysis.

## Adds
A prompt-specific output shape that separates the final prompt from its operating assumptions and test plan.

## Returns
- prompt purpose
- final prompt
- context assumptions
- constraints and boundaries
- output shape
- test cases
- known limitations

## Pairs with
`frame.task`, `frame.success-criteria`, `frame.prompt-compare`, `rubric.writing-quality`

## Avoid when
The desired output is an implementation plan or handoff brief rather than a prompt or instruction set.

---

## Metadata
- type: schema
- stage: conclude
- strength: light
