# Decisions

Changes made during the composability and modularity review of prompts and stacks.
Ordered by impact: High first, then Medium.
Date: 2026-04-27

---

## Prompt quality review — 2026-04-27

Changes made during the prompt quality and research-grounded improvement pass.
Ordered by impact: High first, then Medium.

---

### build-a-system-prompt.md — missing frame.prompt-compare in block list

**Asset:** `stacks/build-a-system-prompt.md`
**Issue:** Composition notes stated "The revised prompt is always compared to the original so regressions are visible" but `frame.prompt-compare` was absent from the Suggested blocks list. The notes described a step that was not available to the user.
**Change:** Added `frame.prompt-compare` as block 6 in the Suggested blocks list.
**Research basis:** Self-consistency (Wang et al. 2023) — comparing multiple prompt versions surfaces regressions that single-pass revision misses; the block list must include every step the composition notes claim happens.
**Impact:** High

---

### build-a-system-prompt.md — dead block reference

**Asset:** `stacks/build-a-system-prompt.md`
**Issue:** Common swaps referenced `frame.frame.task` — a block ID that does not exist. Correct ID is `frame.task`.
**Change:** Updated `frame.frame.task` to `frame.task`.
**Research basis:** Structured separability — dead references silently break the composition chain.
**Impact:** High

---

### prompt-repair.md — dead block reference

**Asset:** `stacks/prompt-repair.md`
**Issue:** Common swaps referenced `frame.frame.task` — same dead ID.
**Change:** Updated `frame.frame.task` to `frame.task`.
**Research basis:** Structured separability — same rationale as build-a-system-prompt.md.
**Impact:** High

---

### rubric.* — missing prompt.md (all 8 rubric blocks)

**Assets:** `prompts/blocks/rubric.argument-quality/prompt.md`, `rubric.decision-quality/prompt.md`, `rubric.plan-quality/prompt.md`, `rubric.prompt-quality/prompt.md`, `rubric.reflection-quality/prompt.md`, `rubric.research-quality/prompt.md`, `rubric.strategy-quality/prompt.md`, `rubric.writing-quality/prompt.md` (all created)
**Issue:** Understandable in isolation violated. All rubric blocks were used as terminal quality gates in stacks (e.g. `rubric.prompt-quality` appears in `prompt-repair` and `prompt-engineering-sprint`) but had no standalone prompt.md. Users had to locate and transcribe the checklist from the README manually, breaking the uniform block pattern established for mode and strategy blocks.
**Change:** Created prompt.md for all 8 rubric blocks. Each prompts the model to evaluate the artifact against the checklist with a per-criterion yes/partial/no verdict, then produce an overall verdict and the single highest-leverage fix.
**Research basis:** Chain-of-Draft (Xu et al. 2024) — concise per-criterion verdicts rather than open-ended critique reduce token cost while maintaining evaluation quality. Negative prompting / guardrails — the verdict structure ("ready / needs revision") provides an explicit exit condition consistent with mode block Exit when clauses.
**Impact:** High

---

### debugger-loop.md — missing step-back directive

**Asset:** `prompts/concepts/computer-science/debugger-loop.md`
**Issue:** The prompt jumped directly to listing reproduction steps, hypotheses, and experiments without first identifying the bug category or minimum containing scope. Debugging without category identification produces undifferentiated hypothesis lists where null hypotheses (logic error, race condition, configuration) are treated equally regardless of evidence.
**Change:** Added a step-back directive: identify bug category and minimum containing scope before listing investigation steps. Also added ranked-by-prior-probability qualifier to hypotheses, and cheapest-test qualifier to experiments.
**Research basis:** Step-back prompting (Zheng et al., Google DeepMind 2023) — asking the model to identify high-level principles or categories before tackling specifics improves systematic reasoning by 3–10% on STEM tasks. The same forcing function applies here: category identification before hypothesis listing constrains the search space.
**Impact:** Medium

---

### mode.decide/prompt.md — decision-first ordering

**Asset:** `prompts/blocks/mode.decide/prompt.md`
**Issue:** The original prompt asked the model to "compare options then choose" — a presentation-then-conclusion ordering. Research on AI decision quality shows that open comparison before commitment produces verbose justification of the winning option rather than honest comparison, because the model anticipates the conclusion while still "comparing."
**Change:** Restructured to decision-first ordering: state best option first, then justify. Added explicit instruction to show key tradeoff.
**Research basis:** Chain-of-Draft (Xu et al. 2024) — decision-first with minimal reasoning steps produces sharper, less post-hoc-rationalized outputs than compare-then-conclude framing. Cognitive bias literature (Kahneman 2011) — conclusion-first reduces motivated reasoning in the justification pass.
**Impact:** Medium

---

### guardrail.uncertainty/prompt.md — absent/mixed evidence distinction

**Asset:** `prompts/blocks/guardrail.uncertainty/prompt.md`
**Issue:** The prompt asked to "distinguish assumptions from unknowns" but conflated two epistemically distinct states: "I don't know" (evidence absent) and "evidence is mixed" (evidence conflicting). Models routinely treat these as the same uncertainty class, producing misleadingly uniform confidence levels.
**Change:** Added explicit requirement to distinguish "absent evidence" from "conflicting evidence" as a separate uncertainty category.
**Research basis:** Metacognitive prompting (Yang et al. 2023) — explicit epistemic category labelling forces the model to assess the source of its uncertainty rather than just reporting a confidence level. This distinction is standard in scientific epistemology (Knightian uncertainty vs. risk).
**Impact:** Medium

---

### compare-options.md — implicit criteria handling

**Asset:** `prompts/snippets/compare-options.md`
**Issue:** The "criteria fit" column in the decision table was undefined when no explicit criteria were provided. The model would silently invent criteria, making the comparison unauditable.
**Change:** Added instruction: if explicit criteria are provided, score against them; if not, name the implicit criterion being used for each column.
**Research basis:** Declarative decomposition (DSPy-style) — every inference the model makes should be visible in the output; implicit criteria masquerading as objective scoring is a hidden assumption. Making criteria explicit surfaces them for challenge.
**Impact:** Medium

---

### strategy.premortem/prompt.md — strengthen failure-as-fact framing

**Asset:** `prompts/blocks/strategy.premortem/prompt.md`
**Issue:** "Assume this plan failed" is a conditional that leaves the model room to hedge ("well, it might fail if..."). Premortem's psychological mechanism depends on treating failure as a known fact, not a hypothesis, to unlock specific causal chains rather than generic risk lists.
**Change:** Rewrote the framing: "It is one year from now. This plan failed. That is the starting fact — do not treat it as a hypothesis."
**Research basis:** Step-back prompting (Zheng et al. 2023) — the premortem move is literally a step-back: reason about the failure class before analyzing the specific plan. Klein (2007) original premortem research shows that the past-tense "it has already failed" framing produces significantly more specific and critical failure narratives than the conditional framing.
**Impact:** Medium

---

### hypothesis-generation.md — problem category step-back

**Asset:** `prompts/snippets/hypothesis-generation.md`
**Issue:** Hypothesis generation without first identifying problem category (causal, descriptive, predictive, normative) produces a generic list. The type of problem determines what makes a hypothesis falsifiable and what evidence would confirm or disconfirm it.
**Change:** Added step-back directive: identify problem category before generating hypotheses.
**Research basis:** Step-back prompting (Zheng et al. 2023) — principle/category identification before specific analysis. Popper's falsifiability criterion — the problem category determines the testability structure of valid hypotheses.
**Impact:** Medium

---

### prompt-rewrite.md — structural vs style change distinction

**Asset:** `prompts/snippets/prompt-rewrite.md`
**Issue:** The most common prompt rewriting failure is changing style (tone, phrasing) while leaving structural problems intact. The original prompt's note "what changed and why" did not require the model to categorize the type of change, allowing cosmetic rewrites to pass as substantive ones.
**Change:** Added requirement: fix structural problems, not just style. Required the return note to classify the change as "structural" or "style."
**Research basis:** Negative prompting / guardrails — explicit suppression of surface-level rewrites. Anthropic prompt engineering guidance (2024) identifies "polishing the wrong prompt" as the most common single-pass improvement failure.
**Impact:** Medium

---

## guardrail.assumption-audit — folder rename

**Asset:** `prompts/blocks/assumption.audit/` → `prompts/blocks/guardrail.assumption-audit/`
**Issue:** Clean interface contract + substitutability violated. The folder was named `assumption.audit` while the block's own README title (`# guardrail.assumption-audit`), its `type: guardrail` metadata, and all 9+ stack references used `guardrail.assumption-audit`. A user following the convention `prompts/blocks/<block-id>/` could not locate the block by its stated ID.
**Change:** Renamed directory from `assumption.audit` to `guardrail.assumption-audit` so the physical path matches the block's self-identified ID and all stack references.
**Research basis:** Declarative decomposition (DSPy-style) — blocks should express a clean input/output contract with no hidden indirection; the folder name IS the block's namespace identifier.
**Impact:** High

---

## full-decision-process.md — dead block reference

**Asset:** `stacks/full-decision-process.md`
**Issue:** No hidden dependencies violated. The Common swaps section referenced `` `frame.assumption-audit` ``, a block ID that does not exist in the repository. The correct ID is `` `guardrail.assumption-audit` ``.
**Change:** Updated `` `frame.assumption-audit` `` to `` `guardrail.assumption-audit` `` in the Common swaps text.
**Research basis:** Structured separability — each reference in a stack should resolve to a real block; dead references silently break the composition chain.
**Impact:** High

---

## schema.execution-brief — README/prompt.md field mismatch

**Asset:** `prompts/blocks/schema.execution-brief/README.md`
**Issue:** Clean interface contract violated. The README `Returns` field listed {objective, scope, key steps, success criteria, risks, owner, next action} — seven fields that do not match the actual fields produced by `prompt.md`: {objective, owner, sequence/milestones, dependencies, major risks, first checkpoint, pause/escalation trigger, immediate next action}. The two contracts were completely different, making the README unreliable as a reference.
**Change:** Updated `README.md Returns` section to match `prompt.md` exactly: objective, owner or responsible role, sequence or milestones, dependencies, major risks, first checkpoint, pause or escalation trigger, immediate next action.
**Research basis:** Declarative decomposition (DSPy-style) — `Expects` and `Returns` must precisely describe the block's actual interface; the README is the primary reference a user consults before composing.
**Impact:** High

---

## mode.critique — missing prompt.md

**Asset:** `prompts/blocks/mode.critique/prompt.md` (created)
**Issue:** Understandable in isolation violated. The block had no standalone `prompt.md` — the invocation text was buried in the README under "Quick invocation." Every frame, guardrail, and schema block provides a standalone `prompt.md`. The inconsistency forced users to dig into README to find the copy-pasteable text, breaking the uniform block pattern.
**Change:** Created `prompt.md` with the CRITIQUE mode invocation directive and an explicit `{paste...}` input placeholder, consistent with all other block prompt.md files.
**Research basis:** Negative prompting / guardrails — an explicit, isolated invocation text reduces the chance the mode directive is omitted or mis-transcribed when composing a multi-block prompt.
**Impact:** High

---

## mode.decide — missing prompt.md

**Asset:** `prompts/blocks/mode.decide/prompt.md` (created)
**Issue:** Understandable in isolation violated. Same structural gap as mode.critique — no standalone prompt.md.
**Change:** Created `prompt.md` with the DECIDE mode invocation directive and input placeholder.
**Research basis:** Structured separability — mode invocation ("what cognitive stance") should be separable from the reasoning blocks that follow it; a standalone file makes that separation physical and unambiguous.
**Impact:** High

---

## mode.explore — missing prompt.md

**Asset:** `prompts/blocks/mode.explore/prompt.md` (created)
**Issue:** Understandable in isolation violated. Same structural gap.
**Change:** Created `prompt.md` with the EXPLORE mode invocation directive and input placeholder.
**Research basis:** Structured separability — same rationale as mode.decide.
**Impact:** High

---

## mode.reflect — missing prompt.md

**Asset:** `prompts/blocks/mode.reflect/prompt.md` (created)
**Issue:** Understandable in isolation violated. Same structural gap.
**Change:** Created `prompt.md` with the REFLECT mode invocation directive and input placeholder.
**Research basis:** Structured separability — same rationale as mode.decide.
**Impact:** High

---

## strategy.inversion — missing prompt.md

**Asset:** `prompts/blocks/strategy.inversion/prompt.md` (created)
**Issue:** Understandable in isolation violated. All 5 strategy blocks had only README.md. The "Quick invocation" was embedded in README prose rather than available as a standalone file, inconsistent with frame/guardrail/schema blocks.
**Change:** Created `prompt.md` with the INVERSION invocation directive and input placeholder.
**Research basis:** Chain-of-thought (CoT) — the inversion sequence (define bad outcome → trace paths → flip to constraints) is a stepwise reasoning chain; isolating it in prompt.md makes the sequence unambiguous when combined with other blocks.
**Impact:** High

---

## strategy.premortem — missing prompt.md

**Asset:** `prompts/blocks/strategy.premortem/prompt.md` (created)
**Issue:** Understandable in isolation violated. Same structural gap as strategy.inversion.
**Change:** Created `prompt.md` with the PREMORTEM invocation directive and input placeholder.
**Research basis:** Step-back prompting — premortem assumes failure before analyzing causes, which is the step-back move (reason about the general failure class before the specific plan); a standalone prompt enforces this ordering when composed into a stack.
**Impact:** High

---

## strategy.problem-split — missing prompt.md

**Asset:** `prompts/blocks/strategy.problem-split/prompt.md` (created)
**Issue:** Understandable in isolation violated. Same structural gap.
**Change:** Created `prompt.md` with the PROBLEM SPLIT invocation directive and input placeholder.
**Research basis:** Least-to-most decomposition — problem-split is literally the decomposition step; isolating the invocation text ensures the strategy directive is delivered before any reasoning begins.
**Impact:** High

---

## strategy.red-team — missing prompt.md

**Asset:** `prompts/blocks/strategy.red-team/prompt.md` (created)
**Issue:** Understandable in isolation violated. Same structural gap.
**Change:** Created `prompt.md` with the RED TEAM invocation directive and input placeholder.
**Research basis:** Negative prompting / guardrails — the red-team directive explicitly suppresses fix-suggesting until the attack is complete; a standalone prompt prevents this suppression instruction from being omitted in composition.
**Impact:** High

---

## strategy.steelman — missing prompt.md

**Asset:** `prompts/blocks/strategy.steelman/prompt.md` (created)
**Issue:** Understandable in isolation violated. Same structural gap.
**Change:** Created `prompt.md` with the STEELMAN invocation directive and input placeholder.
**Research basis:** Self-consistency — steelmanning generates the strongest opposing case before challenging it, which parallels multi-path reasoning; a fixed invocation text ensures the "strongest version first" constraint is always present.
**Impact:** High

---

## rollout-plan.md — wrong type prefix in pairs-with

**Asset:** `prompts/snippets/rollout-plan.md`
**Issue:** Explicit compatibility violated. The `pairs with` metadata listed `` `frame.release-readiness` `` but the block's actual ID is `` `guardrail.release-readiness` `` (type: guardrail). A user following the pairs-with pointer would look in the wrong type namespace.
**Change:** Updated pairs-with entry from `` `frame.release-readiness` `` to `` `guardrail.release-readiness` ``.
**Research basis:** Declarative decomposition (DSPy-style) — pairs-with is an interface declaration; an incorrect type prefix is a broken pointer in the composition graph.
**Impact:** Medium

---

## test-strategy.md — wrong type prefix in pairs-with

**Asset:** `prompts/snippets/test-strategy.md`
**Issue:** Explicit compatibility violated. Same error as rollout-plan.md — `` `frame.release-readiness` `` should be `` `guardrail.release-readiness` ``.
**Change:** Updated pairs-with entry.
**Research basis:** Declarative decomposition (DSPy-style) — same rationale as rollout-plan.md.
**Impact:** Medium

---

## experiment-design.md — wrong type prefix in pairs-with

**Asset:** `prompts/snippets/experiment-design.md`
**Issue:** Explicit compatibility violated. The `pairs with` metadata listed `` `frame.statistical-significance-check` `` but the actual block ID is `` `guardrail.statistical-significance-check` `` (type: guardrail).
**Change:** Updated from `` `frame.statistical-significance-check` `` to `` `guardrail.statistical-significance-check` ``.
**Research basis:** Declarative decomposition (DSPy-style) — same rationale as rollout-plan.md.
**Impact:** Medium

---

## clarify-task.md — missing Avoid when

**Asset:** `prompts/snippets/clarify-task.md`
**Issue:** Minimum viable scope violated. Per the block contract, every block must answer `Avoid when` so composers know when to skip it. Without this field, users cannot distinguish "clarify before solving" from "solve directly" — the most common overuse pattern for clarify-task is applying it to already-specified tasks.
**Change:** Added `Avoid when: The task is already tightly specified with clear scope and output.`
**Research basis:** Negative prompting / guardrails — explicit suppression of overuse via Avoid when is more reliable than leaving it implicit; mirrors the same design principle used in all blocks/README.md files.
**Impact:** Medium

---

## extract-insights.md — missing Avoid when

**Asset:** `prompts/snippets/extract-insights.md`
**Issue:** Minimum viable scope violated. Without Avoid when, users may apply extract-insights when faithful summary is the actual goal, producing distorted rather than summarized output.
**Change:** Added `Avoid when: The material is already structured with clear takeaways, or the purpose is to summarize rather than extract actionable signal. Use frame.summarize-source when faithful summary is the goal.`
**Research basis:** Negative prompting / guardrails.
**Impact:** Medium

---

## cause-mapping.md — missing Avoid when

**Asset:** `prompts/snippets/cause-mapping.md`
**Issue:** Minimum viable scope violated. Premature cause-mapping on unfolding situations produces fabricated causal chains. Avoid when makes this failure mode explicit.
**Change:** Added `Avoid when: The outcome is still unfolding and causal chains cannot yet be traced.`
**Research basis:** Negative prompting / guardrails — explicit suppression of premature causal inference is more reliable than relying on the user to recognize the timing issue.
**Impact:** Medium

---

## second-order-effects.md — missing Avoid when

**Asset:** `prompts/snippets/second-order-effects.md`
**Issue:** Minimum viable scope violated. For reversible low-stakes decisions, the cognitive cost of second-order mapping exceeds the value. Without Avoid when, users apply it uniformly.
**Change:** Added `Avoid when: The decision is reversible and low-stakes.`
**Research basis:** Chain-of-draft — for simple decisions, a compressed reasoning approach (no second-order tracing) is sufficient; Avoid when encodes this triage.
**Impact:** Medium

---

## research-questions.md — missing Avoid when

**Asset:** `prompts/snippets/research-questions.md`
**Issue:** Minimum viable scope violated. Adding more questions to a long list creates exploration drag rather than focus. Avoid when prevents this overuse.
**Change:** Added `Avoid when: The research direction is already well-defined and the bottleneck is execution rather than question formation.`
**Research basis:** Negative prompting / guardrails.
**Impact:** Medium

---

## experiment-design.md — missing Avoid when

**Asset:** `prompts/snippets/experiment-design.md`
**Issue:** Minimum viable scope violated. Experiment design is heavy (type: heavy). For questions answerable with existing data or a simpler test, it adds unnecessary friction. Avoid when routes users to `frame.design-cheap-test` instead.
**Change:** Added `Avoid when: The question can be answered with existing data or a simpler test. Use frame.design-cheap-test instead.`
**Research basis:** Least-to-most decomposition — start with the smallest viable test; Avoid when encodes the routing logic.
**Impact:** Medium

---

## design-cheap-test.md — missing Avoid when

**Asset:** `prompts/snippets/design-cheap-test.md`
**Issue:** Minimum viable scope violated. When statistical rigor is required, design-cheap-test produces underpowered evidence. Avoid when routes users to `frame.experiment-design` for those cases.
**Change:** Added `Avoid when: Statistical rigor is required. Use frame.experiment-design instead.`
**Research basis:** Least-to-most decomposition — the cheap test is the minimum starting point; Avoid when defines when to escalate to the full design.
**Impact:** Medium

---

## Gaps (blocks referenced but not created)

The following lens blocks are referenced in stacks and resolved to existing concept files in `prompts/concepts/`. They have valid type metadata but no cross-reference to confirm physical location from the block ID alone. No new blocks created; noted here for future consideration:

- All `lens.*` blocks: reside in `prompts/concepts/<discipline>/<name>.md` and are not locatable by ID convention (`prompts/blocks/lens.*`). This is not a bug given the README note that "folders only describe how the source library is organized," but it is an undiscoverable gap for new contributors.

Recommendation: add a `# Lens Blocks` section to `prompts/blocks/README.md` noting that lens blocks live in `prompts/concepts/`.
