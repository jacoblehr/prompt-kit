# Stack: AI Workflow Design

Use when you need to design a reliable, multi-step AI-assisted workflow for a repeatable task — one that will be used by others or run regularly.

Useful inputs:

- the task the workflow needs to accomplish
- who will use it and how often
- tools and models available

Suggested blocks:

1. `frame.clarify-task`
2. `frame.requirements-decomposition`
3. `frame.prompt-chain-design`
4. `frame.test-strategy`
5. `schema.rollout-plan`

Expected outcome:

- task purpose and success criteria defined before any workflow is designed
- requirements decomposed into stories: what must the workflow do independently and reliably?
- workflow designed step-by-step with inputs, outputs, and handoff risks named for each step
- test strategy covering the highest-risk steps: where is the workflow most likely to fail?
- rollout plan with a staged deployment and go/no-go criteria before full use

Domain tags:
- prompt engineering
- AI workflow
- planning
- systems design

---

## Composition notes

**Minimum blocks:** `frame.clarify-task`, `frame.prompt-chain-design`, `frame.test-strategy`

**Why this order works:** Task clarity comes first because workflow design without a clear job creates elegant machinery for the wrong purpose. Requirements decomposition follows to surface what the workflow must handle independently. Prompt chain design then shapes the step sequence with handoff risks named. Test strategy closes the design phase — it is cheaper to name the highest-risk steps before build than after.

**Common swaps:** Swap `frame.requirements-decomposition` for `strategy.problem-split` when the job is still tangled. Swap `schema.rollout-plan` for `frame.design-cheap-test` if you want a staged pilot rather than a full rollout plan.

**Common failure mode:** Designing the workflow before clarifying the job. Prompt chains built on a fuzzy task tend to fail at the seams, not the steps.
