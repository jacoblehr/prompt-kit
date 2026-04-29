# Stacks

These are named assemblies of blocks for recurring jobs, not automated pipelines.

Each stack shows a practical sequence of blocks you can combine by hand, along with composition notes explaining why the order works. When a stack is loaded in the browser, Prompt Kit also generates a one-shot composition brief so the copied prompt carries the stack goal, phase order, and expected output.

Stacks are grouped by the practical task they help complete.
The browser keeps `family` as the primary grouping, then lets you filter stacks by stage, output kind, effort, and stakes.

Current stack families:

- Thinking & Framing
- Deciding & Prioritising
- Research & Analysis
- Writing & Communication
- Planning & Execution
- Critique & Review
- Prompt Craft
- Developer Workflows

See [docs/COMPOSITION.md](../docs/COMPOSITION.md) for the full composition rules.

## Example starting points

Good first stacks when you want an existing recipe instead of composing from zero.

- `frame-problem` for vague or underframed requests
- `decide` for high-stakes option selection
- `research` for evidence gathering before a recommendation
- `debug` for bug, incident, or bottleneck diagnosis
- `feature-design` for turning a feature request into an execution-ready brief
- `safe-migration` for risky system or API changes

## Heavier workflows

Use these when the job needs a stronger critique or a more explicit execution shape.

- `review-code`
- `architecture-review`
- `pressure-test`
- `security-threat-model`
- `incident-response`
- `break-recurring-incident`
- `build-system-prompt`
- `improve-prompt`

## Variant note

`debug` now carries the former performance-fix path as a documented variant. Use the shorter debug sequence when the bottleneck is already scoped and the main job is ranking optimization work.

## Stack quality bar

A strong stack should make these things obvious:

- the job it performs
- the minimum useful block set
- why the order matters
- where phase handoffs happen, especially when more than one mode is present
- what output the one-shot prompt should return
- when to choose a nearby stack instead
