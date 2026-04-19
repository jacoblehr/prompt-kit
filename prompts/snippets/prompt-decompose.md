# Prompt Decompose

Use when you want to understand why a prompt is not working or how to improve its structure before rewriting it.

```text
Analyse the following prompt by decomposing it into its structural components.

Prompt: {prompt}

For each component, describe what is present and assess its quality:
1. Task — what the model is being asked to do; is it clear and specific?
2. Context — what background is provided; what is missing?
3. Format — how the output should be structured; is it specified?
4. Constraints — what limits or rules are given; are they adequate?
5. Tone or persona — style or voice guidance; is it appropriate?
6. Examples — any few-shot examples; are they present and helpful?

Then give:
- Diagnosis: the single biggest structural weakness
- Recommended fix: the one change most likely to improve results
```

Domain tags:
- prompt engineering
- critique
- structure
- meta
