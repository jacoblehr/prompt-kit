# Prompt Chain Design

Use when you need to design a multi-step AI workflow for a complex task that a single prompt cannot handle reliably.

```text
Design a prompt chain to accomplish the following goal.

Goal: {goal}

Starting material: {input}

For each step in the chain, specify:
- Step name — a short label
- Purpose — what this step achieves
- Input — what it receives (from the user or previous step)
- Prompt sketch — the core instruction in 2–4 sentences
- Output — what it produces for the next step

Then address:
- Handoff risks — where output quality could degrade between steps
- Minimal version — the shortest chain that would produce acceptable results
- Failure modes — which step is most likely to fail and why

Keep steps distinct and non-redundant.
```

Domain tags:
- prompt engineering
- chain
- workflow
- design

---

Metadata:
- type: frame
- stage: frame
- strength: heavy
- pairs with: `frame.clarify-task`, `frame.prompt-decompose`, `frame.test-strategy`
