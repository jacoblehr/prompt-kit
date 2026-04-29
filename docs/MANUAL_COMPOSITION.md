# Manual Composition

Use this repo as a kit of parts.

## Default Pattern

1. start with a saved stack if one already matches the task
2. otherwise start with a `frame` block to clarify the task
3. add a `mode` block to set the cognitive stance
4. add a `strategy` block if the task needs one (1–2 max)
5. add a `guardrail` block if a specific failure mode is likely
6. add a `schema` block if the output format matters
7. finish with a `rubric` block if the stakes justify evaluation criteria

See [docs/COMPOSITION.md](./COMPOSITION.md) for the full assembly rules.

## Example Compositions

### Underframed problem

- `frame.task`
- `mode.explore`
- `strategy.problem-split`
- `guardrail.uncertainty`

### Choosing between options

- `frame.success-criteria`
- `guardrail.assumption-audit`
- `mode.decide`
- `schema.decision-memo`

### Explore versus exploit

- `mode.explore`
- `frame.success-criteria`
- `guardrail.uncertainty`
- `guardrail.disconfirming-evidence`
- `mode.decide`
- `schema.execution-brief`

### Prioritizing a portfolio

- `mode.explore`
- `frame.success-criteria`
- `guardrail.assumption-audit`
- `mode.decide`
- `schema.execution-brief`

### De-risking before full commitment

- `frame.task`
- `guardrail.assumption-audit`
- `strategy.premortem`
- `schema.execution-brief`
- `guardrail.uncertainty`

### Pressure-testing a plan

- `frame.task`
- `mode.critique`
- `strategy.premortem`
- `strategy.red-team`
- `guardrail.assumption-audit`
- `guardrail.disconfirming-evidence`

### Improving a prompt

- `frame.task`
- `mode.critique`
- `frame.prompt-compare`
- `rubric.writing-quality`
- `schema.execution-brief`

### Aligning stakeholders

- `mode.explore`
- `frame.task`
- `guardrail.assumption-audit`
- `mode.decide`
- `schema.execution-brief`

### Pressure-testing a belief or position

- `mode.explore`
- `frame.task`
- `strategy.steelman`
- `frame.extract-insights`
- `rubric.argument-quality`

### Learning from an outcome

- `mode.reflect`
- `frame.cause-mapping`
- `frame.extract-insights`
- `schema.execution-brief`

### Writing with rigor

- `frame.task`
- `mode.critique`
- `guardrail.uncertainty`
- `frame.prompt-compare`
- `rubric.writing-quality`

### Reading before changing code

- `frame.task`
- `mode.explore`
- `mode.critique`
- `guardrail.assumption-audit`
- `schema.execution-brief`

### Debugging from logs

- `mode.explore`
- `frame.task`
- `mode.critique`
- `frame.cause-mapping`
- `schema.execution-brief`

## Keep It Light

- use the smallest useful combination
- prefer one good mode block plus one good frame block over a huge stack
- when a piece feels repetitive or low-value, cut it
- when a stack uses more than one mode, write the handoff as phases in a single prompt
- pair recursive blocks with a stopping rule so the model knows when the answer is done
