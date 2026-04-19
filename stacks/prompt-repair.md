# Stack: Prompt Repair

Use when a prompt is the thing you are trying to improve.

Useful inputs:

- the current prompt
- the job the prompt should do
- examples of failure, ambiguity, or weak output if available

Suggested blocks:

1. `mode.critique`
2. `core.clarify-task`
3. `core.prompt-critique`
4. `core.prompt-rewrite`
5. `core.prompt-compare`
6. `rubric.prompt-quality`

Expected outcome:

- clearer prompt intent
- fewer failure modes
- a tighter revision
- a prompt that is easier to test and reuse
