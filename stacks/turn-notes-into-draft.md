# Stack: turn-notes-into-draft

Turn scattered notes, transcripts, bullets, or research fragments into a useful written draft.

Blocks:
1. `frame.audience`
2. `frame.extract-insights`
3. `mode.synthesize`
4. `schema.content-draft`
5. `rubric.writing-quality`
6. `recurse.refine`
7. `guardrail.bounded-recursion`

Expected output: Audience-fit draft with the main point early, source signal preserved, and one bounded refinement pass against writing quality.

## Composition notes

`frame.audience` defines who the draft must serve and what it should cause. `frame.extract-insights` pulls the strongest points out of messy source material. `mode.synthesize` integrates the selected points into one throughline. `schema.content-draft` renders the artifact. `rubric.writing-quality` checks clarity and proportion. `recurse.refine` fixes only the rubric gaps, while `guardrail.bounded-recursion` prevents endless polishing.

**Common swaps:** Use `schema.findings-brief` instead of `schema.content-draft` when the output should stay as findings rather than prose.

**Common failure mode:** Summarizing all notes faithfully instead of building the draft around the audience's job and the strongest throughline.

**Minimum blocks:** `frame.audience` + `frame.extract-insights` + `schema.content-draft`
