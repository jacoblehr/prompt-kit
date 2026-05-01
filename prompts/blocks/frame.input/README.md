# frame.input

## Purpose
Pass the user's task or request directly to the model without transformation.

## Use when
Use as the default instruction block when no other frame block is present. Suitable for any stack that does not require explicit problem framing before reasoning begins.

## Expects
A task, question, or request.

## Adds
Nothing — passes the input through as-is.

## Returns
The model's response to the task.

## Pairs with
`mode.explore`, `mode.decide`, `mode.critique`, `strategy.problem-split`

## Avoid when
The request is ambiguous or underspecified and would benefit from explicit framing — use `frame.task` instead.

---

## Metadata
- type: frame
- stage: frame
- strength: light
