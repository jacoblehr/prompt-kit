# Stack: AI Workflow Design

Use when you need to design a reliable, multi-step AI-assisted workflow for a repeatable task — one that will be used by others or run regularly.

Useful inputs:

- the task the workflow needs to accomplish
- who will use it and how often
- tools and models available

Suggested blocks:

1. `core.clarify-task`
2. `core.requirements-decomposition`
3. `core.prompt-chain-design`
4. `core.test-strategy`
5. `core.rollout-plan`

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
