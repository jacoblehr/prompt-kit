# Stack: Build a System Prompt

Use when you need to design a system prompt or persistent instruction set for an AI assistant, agent, or workflow.

Useful inputs:

- what the assistant should do and for whom
- constraints on behaviour, tone, or scope
- any existing prompt draft

Suggested blocks:

1. `frame.clarify-task`
2. `lens.jobs-to-be-done`
3. `frame.prompt-chain-design`
4. `frame.prompt-decompose`
5. `frame.prompt-rewrite`
6. `frame.prompt-compare`

Expected outcome:

- task and user need clarified: what job is this assistant actually being hired to do?
- core job mapped with contexts, triggers, and what a successful interaction looks like
- workflow designed for multi-step tasks the assistant must handle reliably
- existing or draft prompt decomposed into components with structural weaknesses identified
- revised system prompt with clear task, context, constraints, format, and guardrails

Domain tags:
- prompt engineering
- system prompt
- AI workflow
- design

---

## Composition notes

**Minimum blocks:** `frame.clarify-task`, `frame.prompt-decompose`, `frame.prompt-rewrite`

**Why this order works:** Task clarity first — a system prompt without a clear job produces inconsistent, overfitted behaviour. Jobs-to-be-done maps the real hiring context: what will someone use this assistant to accomplish and in what situations? Prompt-chain design follows for multi-step tasks. Prompt-decompose takes any draft apart to expose structural weaknesses before rewriting. The revised prompt is always compared to the original so regressions are visible.

**Common swaps:** Swap `frame.prompt-chain-design` for `frame.prompt-critique` if there is already a draft and the job is iterating rather than designing from scratch. Swap `lens.jobs-to-be-done` for `frame.task` for simpler, single-job assistants.

**Common failure mode:** Designing the prompt before the job is clear. System prompts designed around a fuzzy task become catch-all prompts that handle nothing well.
