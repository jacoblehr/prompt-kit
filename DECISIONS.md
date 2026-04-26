# Decisions

Changes made during the composability and modularity review of prompts and stacks.
Ordered by impact: High first, then Medium.
Date: 2026-04-27

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
