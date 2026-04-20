# Stack: Deep Research Synthesis

Use when you need to build a well-grounded view from a body of evidence before making a high-stakes decision or writing a position.

Useful inputs:

- the central question you are trying to answer
- the sources, studies, or evidence you have gathered
- any existing beliefs or hypotheses to test against the evidence

Suggested blocks:

1. `mode.explore`
2. `frame.hypothesis-generation`
3. `frame.summarize-source`
4. `lens.survivorship-bias`
5. `lens.base-rate-check`
6. `frame.synthesize-sources`
7. `frame.extract-insights`
8. `rubric.research-quality`

Expected outcome:

- competing hypotheses generated before diving into sources (reduces confirmation bias)
- each source summarised independently before synthesis
- survivorship bias checked: are the absent cases changing the picture?
- base rates checked: does the evidence reflect historical frequencies?
- sources integrated into a unified position that names points of disagreement
- the highest-leverage insights extracted
- research quality assessed for gaps and overconfidence before acting

Domain tags:
- research
- epistemics
- knowledge management

---

## Composition notes

**Minimum blocks:** `mode.explore`, `frame.hypothesis-generation`, `frame.synthesize-sources`

**Why this order works:** Hypothesis-generation before source-reading reduces confirmation bias — you enter the evidence with competing explanations rather than one preferred answer. Each source is summarized independently before synthesis to prevent early sources from anchoring interpretation of later ones. Survivorship-bias and base-rate checks guard against patterns in the visible evidence that do not reflect the full distribution. Synthesize-sources then integrates across the evidence. Extract-insights distills the actionable conclusions. The research-quality rubric is the final gate before acting.

**Common swaps:** Swap `frame.summarize-source` for `frame.synthesize-sources` alone if you have fewer than three or four sources. Swap `rubric.research-quality` for `rubric.decision-quality` when the synthesis is directly feeding a specific decision.

**Common failure mode:** Reading sources before generating hypotheses. Evidence without prior hypotheses tends to confirm whatever the first source suggests and suppress alternatives that would have been visible with a more open search frame.
