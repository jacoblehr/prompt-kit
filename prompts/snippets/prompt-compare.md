# Prompt Compare

Use when you have two or more prompt variants and want to choose the strongest one.

```text
Compare these prompt variants and recommend the best one.

Judge them on:
- clarity
- specificity
- likelihood of producing the requested output
- token efficiency
- risk of model confusion

Return:
- best prompt
- why it is strongest
- what to borrow from the others
- one or two targeted edits to make it even better

Desired task or output:
{paste the job these prompts should do}

Variants:
{paste prompt variants}
```

Domain tags:
- prompt engineering
- evaluation
- testing

---

Metadata:
- type: frame
- stage: refine
- strength: light
- pairs with: `mode.critique`, `frame.prompt-critique`, `rubric.prompt-quality`
