# Prompt Kit

Prompts that work are structured. Prompt Kit gives you the building blocks — ready to copy, combine, and tailor — so you stop writing prompts from scratch and start composing strong one-shot prompts.

Open `index.html` in your browser. No install, no config, no friction.

## Getting Started

1. **Open in browser** — Just open `index.html`, no setup needed
2. **Search for a block** — Press `/` to focus search, type to filter by name or task
3. **Start with a stack** — Search for `debug`, `decide`, `feature-design`, or any job you need
4. **Build your own** — Pick blocks and assemble one prompt tuned to your task

**Start with a stack for common tasks:**

```bash
npx prompt-kit search "debug"
```

## What Is Prompt Kit?

Most prompt problems are the same few problems: unclear task framing, no output structure, no check against failure, no criteria for success. Prompt Kit solves this with a two-layer system:

- **Blocks** — Reusable prompt components, each with a clear job: frame the task, set a reasoning mode, define success criteria, guard against failure, shape the output, evaluate the result.
- **Stacks** — Pre-built sequences of blocks for recurring jobs — debugging, decision-making, proposals, incident response, and more.

You copy a block or stack into your prompt, fill in your context, and get a structurally stronger one-shot prompt in seconds. Stacks are composition recipes, not automation pipelines.

## Pre-Built Stacks

| Stack | Use for |
| --- | --- |
| `frame-problem` | Clarify a vague request before choosing a direction |
| `debug` | Systematic bug or incident diagnosis |
| `decide` | Traceable high-stakes decision-making |
| `research` | Evidence gathering before deciding or writing |
| `experiment-design` | Design a useful test before acting on a hypothesis |
| `customer-insight-synthesis` | Turn feedback or interviews into decision-useful insight |
| `requirements-from-feedback` | Convert feedback or research notes into grounded requirements |
| `feature-design` | Requirements, success criteria, and execution planning |
| `rollout-plan` | Stage a launch, change, or policy update with adoption and rollback explicit |
| `implement-change` | Bounded code changes with acceptance criteria and verification |
| `safe-migration` | Risk-managed schema or API migration |
| `review-code` | Correctness, contracts, and blast-radius review |
| `usability-review` | Evaluate whether a workflow or interface lets users complete the job |
| `turn-notes-into-draft` | Convert messy source material into an audience-fit draft |
| `creative-brief` | Shape a creative request into usable concept direction |
| `make-playbook` | Turn repeated work or lessons into a reusable procedure |
| `build-system-prompt` | Persistent prompt and instruction-set design |

## Build Your Own Composition

**Minimal sequence** (works for most tasks):

1. `frame.task` — Separate the stated ask from the real objective
2. `mode.explore` — Widen your search space before converging
3. `strategy.problem-split` — Break into manageable, sequenced pieces
4. `frame.success-criteria` — Define what success looks like up front
5. `guardrail.uncertainty` — Surface hidden assumptions and gaps
6. `schema.execution-brief` or `schema.findings-brief` — Shape the final artifact

**Common patterns:**

- Quick sense-check: `mode.critique` + `guardrail.uncertainty`
- Fast framing: `frame.task` + `mode.explore`
- Creative draft: `frame.audience` + `mode.create` + `schema.content-draft`
- Synthesis: `frame.extract-insights` + `mode.synthesize` + `schema.findings-brief`
- Option comparison: `frame.success-criteria` + `strategy.tradeoff-matrix` + `schema.option-map`
- Usability review: `strategy.journey-map` + `rubric.usability-quality` + `schema.findings-brief`
- Rollout planning: `frame.stakeholders` + `strategy.premortem` + `schema.rollout-plan`
- Deep research: `mode.explore` + `frame.extract-insights` + `guardrail.disconfirming-evidence`

## Block Types

| Type        | Job                                                    |
| ----------- | ------------------------------------------------------ |
| `frame`     | Define the task, objective, scope, or success criteria |
| `mode`      | Set the overarching cognitive stance                   |
| `strategy`  | Control the reasoning mechanic or method of thought    |
| `recurse`   | Bound decomposition, branch selection, evaluation, or refinement |
| `guardrail` | Prevent common failure modes and reasoning errors      |
| `schema`    | Shape the output format or structure                   |
| `rubric`    | Define what "good" looks like for evaluation           |

## Stack Families

- **Thinking & Framing** — Problem definition and exploration
- **Deciding & Prioritising** — Choice, tradeoffs, and commitment
- **Research & Analysis** — Investigation and synthesis
- **Writing & Communication** — Crafting and sharing outputs
- **Planning & Execution** — Implementation and delivery
- **Critique & Review** — Assessment and improvement
- **Prompt Craft** — Prompt engineering and refinement
- **Developer Workflows** — Engineering and delivery practices

## Quick Reference

| Action            | Method                                    |
| ----------------- | ----------------------------------------- |
| Search everything | `/` in browser or `npx prompt-kit search` |
| List blocks       | `npx prompt-kit list blocks`              |
| List stacks       | `npx prompt-kit list stacks`              |
| Show stats        | `npx prompt-kit stats`                    |
| Validate assets   | `npm run validate`                        |
| Build site data   | `npm run build`                           |

## Developer Commands

- `npx plop` — Interactive generator for new blocks and stacks
- `npm run build` — Rebuild browser catalog (`site-data.js`)
- `npm run validate` — Check asset integrity
- `npm run build:check` — Confirm generated browser catalog is current
- `npm run lint` — Lint JavaScript files
- `npm run typecheck` — Type-check browser JavaScript with `tsc`
- `npm run format` — Format with Prettier
- `npm test` — Run tests
- `npm run verify` — Run validate + generated-data check + lint + typecheck + tests

## Contributing

Use `npx plop` to add new blocks or stacks, then run `npm run verify` before publishing changes.

## Documentation

- `docs/GETTING_STARTED.md` — Step-by-step tutorial
- `docs/CHEATSHEET.md` — One-page quick reference
- `docs/ONTOLOGY.md` — Asset taxonomy and rules
- `docs/COMPOSITION.md` — Assembly rules and patterns
- `docs/examples/` — Real task walkthroughs

(Open `index.html` to browse the full catalog interactively.)
