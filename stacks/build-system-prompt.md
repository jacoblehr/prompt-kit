# Stack: build-system-prompt

Design a system prompt or persistent instruction set for an AI agent or workflow.

Blocks:
1. `frame.task`
2. `frame.prompt-compare`
3. `schema.prompt-spec`

Optional add-ons:
- `frame.success-criteria` when success needs to be judged before options are compared.
- `mode.critique` when candidate answers need adversarial review.
- `rubric.writing-quality` when prose quality or instruction clarity matters.

Expected output: System prompt spec with clear task, constraints, output shape, boundaries, test cases, and known limitations.

## Composition notes

`frame.task` defines the agent's job before writing any instructions. `frame.success-criteria` makes the prompt target testable. `mode.critique` reviews the draft against that target. `frame.prompt-compare` checks that the revised prompt improved structure without dropping necessary behavior. `rubric.writing-quality` ensures the prompt is clear, tight, and unambiguous. `schema.prompt-spec` formats the final deliverable as a prompt-specific artifact with tests and limitations.

**Common swaps:** Drop `frame.prompt-compare` when creating a prompt from scratch with no baseline to preserve.

**Common failure mode:** Producing polished instructions without test cases, boundaries, or a clear output contract.

**Minimum blocks:** `frame.task` + `frame.prompt-compare` + `schema.prompt-spec`
