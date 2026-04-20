# Stack: Evaluate Model Output

Use when you need to assess whether AI-generated output is actually good — catching errors, hallucinations, bias, or reasoning failures before acting on it.

Useful inputs:

- the model output to evaluate
- the prompt that produced it
- the intended purpose or decision the output will inform

Suggested blocks:

1. `frame.prompt-decompose`
2. `guardrail.blind-spot-check`
3. `frame.prompt-critique`
4. `frame.extract-insights`
5. `frame.prompt-compare`

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

---

## Composition notes

**Minimum blocks:** `frame.prompt-decompose`, `frame.prompt-critique`

**Why this order works:** Prompt-decompose comes first because output quality cannot be evaluated without understanding what was actually asked. Blind-spot-check surfaces the evaluator's biases before assessment begins. Prompt-critique then evaluates the output against the decomposed prompt. Extract-insights separates genuine content from plausible-sounding but unsupported claims. Prompt-compare provides the calibration reference — how would a better prompt have changed the output?

**Common swaps:** Swap `frame.prompt-compare` for `rubric.prompt-quality` when you want a checklist verdict rather than a comparative analysis. Skip `frame.blind-spot-check` for routine low-stakes output evaluation.

**Common failure mode:** Evaluating output without first understanding the prompt. Output from a weak prompt will be judged as the model's failure rather than a prompt engineering problem.
