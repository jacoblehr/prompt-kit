# Stack: improve-prompt

Diagnose and rewrite a weak prompt so it produces reliable, well-shaped output.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `guardrail.uncertainty`
4. `rubric.writing-quality`

Expected output: Rewritten prompt with task, output shape, constraints, and non-goals all explicit.

## Composition notes

`frame.task` defines what a successful rewrite looks like. `mode.critique` identifies structural weaknesses in the original. `guardrail.uncertainty` flags where the prompt fails to specify enough for the model to succeed. `rubric.writing-quality` validates the rewrite for clarity and constraint coverage.

**Minimum blocks:** `mode.critique` + `rubric.writing-quality`
