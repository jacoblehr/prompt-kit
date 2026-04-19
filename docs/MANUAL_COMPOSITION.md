# Manual Composition

Use this repo as a kit of parts.

## Default Pattern

1. start with a saved stack if one already matches the task
2. otherwise start with a `frame` block to clarify the task
3. add a `mode` block to set the cognitive stance
4. add a `strategy` or `lens` block if the task needs one (1–2 max)
5. add a `guardrail` block if a specific failure mode is likely
6. add a `schema` block if the output format matters
7. finish with a `rubric` block if the stakes justify evaluation criteria

See [docs/COMPOSITION.md](./COMPOSITION.md) for the full assembly rules.

## Example Compositions

### Underframed problem

- `mode.explore`
- `strategy.problem_split`
- `frame.task`
- `frame.scope`
- `guardrail.uncertainty`

### Choosing between options

- `mode.decide`
- `strategy.steelman`
- `frame.success-criteria`
- `frame.compare-options`
- `schema.decision-memo`

### Explore versus exploit

- `mode.decide`
- `frame.success-criteria`
- `frame.explore-exploit-decision`
- `guardrail.uncertainty`
- `schema.execution-brief`

### Prioritizing a portfolio

- `mode.decide`
- `frame.success-criteria`
- `frame.prioritize-opportunities`
- `schema.execution-brief`
- `guardrail.uncertainty`

### De-risking before full commitment

- `mode.decide`
- `frame.success-criteria`
- `frame.design-cheap-test`
- `schema.execution-brief`
- `guardrail.uncertainty`

### Pressure-testing a plan

- `mode.critique`
- `strategy.premortem`
- `strategy.red_team`
- `guardrail.assumption-audit`
- `frame.stress-test-assumptions`

### Improving a prompt

- `mode.critique`
- `frame.clarify-task`
- `frame.prompt-critique`
- `frame.prompt-rewrite`
- `rubric.prompt-quality`

### Concept lenses

- Game theory lens blocks: `lens.incentive-audit`, `lens.signaling-check`, `lens.coordination-plan`
- Psychology lens blocks: `lens.bias-check`, `lens.motivation-diagnosis`, `lens.behavior-change-plan`
- Computer science lens blocks: `lens.invariant-check`, `lens.complexity-tradeoff`, `lens.debugger-loop`, `lens.interface-contract-review`

### Aligning stakeholders

- `mode.explore`
- `frame.stakeholder-map`
- `lens.coordination-plan`
- `frame.alignment-conversation-plan`
- `schema.execution-brief`

### Pressure-testing a belief or position

- `strategy.steelman`
- `strategy.inversion`
- `frame.critique-argument`
- `rubric.argument-quality`

### Learning from an outcome

- `mode.reflect`
- `frame.cause-mapping`
- `frame.decision-journal-entry`
- `frame.weekly-review`
- `rubric.reflection-quality`

### Writing with rigor

- `frame.brief-to-draft`
- `mode.critique`
- `frame.critique-argument`
- `frame.rewrite-for-clarity`
- `rubric.writing-quality`

### Reading before changing code

- `mode.explore`
- `frame.codepath-walkthrough`
- `lens.invariant-check`
- `lens.interface-contract-review`
- `frame.change-impact-review`

### Debugging from logs

- `mode.critique`
- `frame.triage-the-unknown`
- `frame.log-triage`
- `frame.bug-reproduction-brief`
- `lens.debugger-loop`

## Keep It Light

- use the smallest useful combination
- prefer one good mode block plus one good frame block over a huge stack
- when a piece feels repetitive or low-value, cut it
