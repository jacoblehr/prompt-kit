# Domain: prompts

Context overlay for prompt engineering and AI workflow tasks.

- A prompt has four parts: task, context, constraints, output shape. All four must be explicit.
- The most common failure mode is an underspecified output shape — the model fills the gap unpredictably.
- System prompts should define scope (what the assistant does AND does not do).
- Test a prompt on its hardest case, not its typical case.
- Guardrails belong in the system prompt, not in each user turn.
- Prefer fewer, clearer instructions over long instruction lists — conflict causes drift.
