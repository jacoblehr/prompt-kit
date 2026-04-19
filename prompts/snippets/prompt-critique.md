# Prompt Critique

Use when a prompt feels vague, bloated, or unreliable.

```text
Critique this prompt for reliability and clarity.

Focus on:
- unclear goals
- missing constraints
- weak or ambiguous output format
- failure modes
- unnecessary verbosity
- places where the model could reasonably misread intent

Return:
- what the prompt is trying to do
- the biggest weaknesses
- the highest-leverage fixes
- a revised prompt skeleton

Desired task or output:
{paste the job this prompt should do}

Observed failure modes, if any:
{paste what is going wrong, if known}

Prompt:
{paste prompt}
```

Domain tags:
- prompt engineering
- quality improvement
- evaluation

---

Metadata:
- type: frame
- stage: critique
- strength: medium
- pairs with: `mode.critique`, `frame.prompt-decompose`, `frame.prompt-rewrite`
