# Stack: build-system-prompt

Design a system prompt or persistent instruction set for an AI agent or workflow.

Blocks:
1. `frame.task`
2. `frame.success-criteria`
3. `mode.critique`
4. `rubric.writing-quality`
5. `schema.execution-brief`

Expected output: System prompt with clear task, constraints, output format, and guardrails; ready to test.

## Composition notes

`frame.task` defines the agent's job before writing any instructions. `frame.success-criteria` makes the prompt target testable. `mode.critique` reviews the draft against that target. `rubric.writing-quality` ensures the prompt is clear, tight, and unambiguous. `schema.execution-brief` formats the final deliverable.

**Minimum blocks:** `frame.task` + `frame.success-criteria`
