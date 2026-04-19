# Stack: Build a System Prompt

Use when you need to design a system prompt or persistent instruction set for an AI assistant, agent, or workflow.

Useful inputs:

- what the assistant should do and for whom
- constraints on behaviour, tone, or scope
- any existing prompt draft

Suggested blocks:

1. `core.clarify-task`
2. `lens.jobs-to-be-done`
3. `core.prompt-chain-design`
4. `core.prompt-decompose`
5. `core.prompt-rewrite`

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
