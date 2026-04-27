# Stack: Prompt Repair

Use when a prompt is the thing you are trying to improve.

Useful inputs:

- the current prompt
- the job the prompt should do
- examples of failure, ambiguity, or weak output if available

Suggested blocks:

1. `mode.critique`
2. `frame.clarify-task`
3. `frame.prompt-critique`
4. `frame.prompt-rewrite`
5. `frame.prompt-compare`
6. `rubric.prompt-quality`

Expected outcome:

- clearer prompt intent
- fewer failure modes
- a tighter revision
- a prompt that is easier to test and reuse

Domain tags:
- prompt engineering
- quality improvement
- iteration

---

## Composition notes

**Minimum blocks:** `mode.critique`, `frame.prompt-critique`, `frame.prompt-rewrite`

**Why this order works:** Critique mode sets the defect-finding stance before any analysis begins. Clarify-task surfaces whether the prompt's job is actually clear before diagnosing what is wrong with it. Prompt-critique identifies specific failure modes. Prompt-rewrite addresses them. Prompt-compare calibrates the revision. The rubric closes with a quality gate before the repaired prompt is reused.

**Common swaps:** Swap `frame.clarify-task` for `frame.task` when the task needs to be fully reframed rather than clarified. Skip `frame.prompt-compare` for rapid iteration cycles where the improvement is obvious.

**Common failure mode:** Rewriting a prompt without diagnosing the failure mode first. Rewrites without a diagnosis tend to change the style while leaving the structural problem intact.
