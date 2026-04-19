# Stack: Prompt Engineering Sprint

Use when you need to design, critique, and systematically improve a high-stakes prompt.

Useful inputs:

- the task you want the prompt to accomplish
- an existing prompt draft, if you have one
- the quality bar or failure modes you are trying to address

Suggested blocks:

1. `frame.clarify-task`
2. `frame.prompt-decompose`
3. `frame.prompt-critique`
4. `frame.prompt-rewrite`
5. `frame.prompt-compare`

Expected outcome:

- task and success criteria clearly defined before any rewriting begins
- existing prompt decomposed into components with structural weaknesses identified
- specific failure modes named and evidenced
- revised prompt addressing the identified weaknesses
- direct comparison between original and revised versions with a clear verdict

Domain tags:
- prompt engineering
- iteration
- critique
- quality

---

## Composition notes

**Minimum blocks:** `frame.clarify-task`, `frame.prompt-critique`, `frame.prompt-rewrite`

**Why this order works:** Task clarity before any prompt work — rewriting a prompt without a clear task definition produces a more polished version of the wrong thing. Prompt-decompose takes the existing prompt apart structurally before any evaluation. Prompt-critique identifies specific failure modes. Prompt-rewrite addresses the identified weaknesses. Prompt-compare provides the calibration check between versions.

**Common swaps:** Swap `frame.prompt-decompose` for `frame.clarify-task` alone when there is no existing prompt and the work is design from scratch. Add `rubric.prompt-quality` as the final gate when the prompt will be used in production.

**Common failure mode:** Critiquing a prompt without first decomposing it. Prompt critique without structure produces impressionistic feedback rather than specific, addressable failure modes.
