# Stack: Evaluate Model Output

Use when you need to assess whether AI-generated output is actually good — catching errors, hallucinations, bias, or reasoning failures before acting on it.

Useful inputs:

- the model output to evaluate
- the prompt that produced it
- the intended purpose or decision the output will inform

Suggested blocks:

1. `core.prompt-decompose`
2. `core.blind-spot-check`
3. `core.prompt-critique`
4. `core.extract-insights`
5. `core.prompt-compare`

Expected outcome:

- prompt decomposed to understand what was actually asked and whether the output is responsive to it
- blind spots in the evaluation named: what biases might affect how you assess the output?
- output critiqued against the prompt: specific failure modes, errors, or gaps identified
- genuine insights separated from plausible-sounding but unsupported claims
- comparison of output quality against what a better prompt would likely have produced

Domain tags:
- prompt engineering
- evaluation
- AI quality
- critical thinking
