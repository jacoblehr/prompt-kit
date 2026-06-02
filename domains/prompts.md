# Domain: prompts

Prompt engineering and AI workflow overlay for prompts, system instructions, agent behaviors, evaluation cases, and model handoffs.

## Use when
The task involves writing, reviewing, debugging, or comparing prompts or persistent instruction sets.

## Adds
- Explicit task, context, constraints, and output shape.
- Boundary conditions: what the assistant should and should not do.
- Test cases for the hardest inputs, not only the typical path.
- Conflict detection across instructions, tools, examples, and policies.
- Separation of system-level guardrails from per-turn requests.

## Watch for
- Long instruction lists with hidden conflicts.
- Polished wording without test cases.
- Output schemas that omit failure or uncertainty states.
- Tool instructions that do not specify when to stop or escalate.

```text
Apply the prompt engineering overlay to the supplied prompt or instruction set.
Check task clarity, context, constraints, output shape, boundaries, tool behavior, conflict risk, hard test cases, and known limitations.

Return: prompt intent, missing context, conflicting instructions, boundary gaps, output contract, hard test cases, expected failure modes, recommended revision.

---
context: {context}
```
