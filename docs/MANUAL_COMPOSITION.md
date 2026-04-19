# Manual Composition

Use this repo as a kit of parts.

## Default Pattern

1. start with a saved stack if one already matches the task
2. otherwise pick a mode block
3. add a strategy block if the task needs one
4. add one or two core or lens blocks
5. finish with a rubric block if the stakes justify it

## Example Compositions

### Underframed problem

- `mode.explore`
- `strategy.problem_split`
- `core.frame.task`
- `core.scope.frame`
- `core.guardrail.uncertainty`

### Choosing between options

- `mode.decide`
- `strategy.steelman`
- `core.frame.success-criteria`
- `core.compare-options`
- `core.schema.decision-memo`

### Explore versus exploit

- `mode.decide`
- `core.frame.success-criteria`
- `core.explore-exploit-decision`
- `core.guardrail.uncertainty`
- `core.schema.execution-brief`

### Prioritizing a portfolio

- `mode.decide`
- `core.frame.success-criteria`
- `core.prioritize-opportunities`
- `core.schema.execution-brief`
- `core.guardrail.uncertainty`

### De-risking before full commitment

- `mode.decide`
- `core.frame.success-criteria`
- `core.design-cheap-test`
- `core.schema.execution-brief`
- `core.guardrail.uncertainty`

### Pressure-testing a plan

- `mode.critique`
- `strategy.premortem`
- `strategy.red_team`
- `core.assumption.audit`
- `core.stress-test-assumptions`

### Improving a prompt

- `mode.critique`
- `core.clarify-task`
- `core.prompt-critique`
- `core.prompt-rewrite`
- `rubric.prompt-quality`

### Concept lenses

- Game theory lens blocks: `lens.incentive-audit`, `lens.signaling-check`, `lens.coordination-plan`
- Psychology lens blocks: `lens.bias-check`, `lens.motivation-diagnosis`, `lens.behavior-change-plan`
- Computer science lens blocks: `lens.invariant-check`, `lens.complexity-tradeoff`, `lens.debugger-loop`, `lens.interface-contract-review`

### Aligning stakeholders

- `mode.explore`
- `core.stakeholder-map`
- `lens.coordination-plan`
- `core.alignment-conversation-plan`
- `core.schema.execution-brief`

### Pressure-testing a belief or position

- `strategy.steelman`
- `strategy.inversion`
- `core.critique-argument`
- `rubric.argument-quality`

### Learning from an outcome

- `mode.reflect`
- `core.cause-mapping`
- `core.decision-journal-entry`
- `core.weekly-review`
- `rubric.reflection-quality`

### Writing with rigor

- `core.brief-to-draft`
- `mode.critique`
- `core.critique-argument`
- `core.rewrite-for-clarity`
- `rubric.writing-quality`

### Reading before changing code

- `mode.explore`
- `core.codepath-walkthrough`
- `lens.invariant-check`
- `lens.interface-contract-review`
- `core.change-impact-review`

### Debugging from logs

- `mode.critique`
- `core.triage-the-unknown`
- `core.log-triage`
- `core.bug-reproduction-brief`
- `lens.debugger-loop`

## Keep It Light

- use the smallest useful combination
- prefer one good mode block plus one good core block over a huge stack
- when a piece feels repetitive or low-value, cut it
