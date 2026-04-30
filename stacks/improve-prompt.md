# Stack: improve-prompt

Diagnose and rewrite a weak prompt so it produces reliable, well-shaped output.

Blocks:
1. `frame.task`
2. `mode.critique`
3. `guardrail.uncertainty`
4. `rubric.writing-quality`
5. `schema.prompt-spec`

Expected output: Rewritten prompt spec with task, output shape, constraints, non-goals, tests, and limitations all explicit.

## Composition notes

`frame.task` defines what a successful rewrite looks like. `mode.critique` identifies structural weaknesses in the original. `guardrail.uncertainty` flags where the prompt fails to specify enough for the model to succeed. `rubric.writing-quality` validates the rewrite for clarity and constraint coverage. `schema.prompt-spec` returns the final prompt in a testable shape.

**Common failure mode:** Rephrasing the prompt without fixing missing context, constraints, boundaries, or output shape.

**Minimum blocks:** `mode.critique` + `rubric.writing-quality`
