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
| `feature-design` | Requirements, success criteria, and execution planning |
| `implement-change` | Bounded code changes with acceptance criteria and verification |
| `safe-migration` | Risk-managed schema or API migration |
| `review-code` | Correctness, contracts, and blast-radius review |
| `build-system-prompt` | Persistent prompt and instruction-set design |

## Build Your Own Composition

**Minimal sequence** (works for most tasks):

1. `mode.explore` — Widen your search space before converging
2. `frame.task` — Separate the stated ask from the real objective
3. `strategy.problem-split` — Break into manageable, sequenced pieces
4. `frame.success-criteria` — Define what success looks like up front
5. `guardrail.uncertainty` — Surface hidden assumptions and gaps
6. `rubric.decision-quality` — Evaluate whether the output is actually good

**Common patterns:**

- Quick sense-check: `mode.critique` + `guardrail.uncertainty`
- Fast framing: `frame.task` + `mode.explore`
- Deep research: `mode.explore` + `frame.extract-insights` + `guardrail.disconfirming-evidence`

## Block Types

| Type        | Job                                                    |
| ----------- | ------------------------------------------------------ |
| `frame`     | Define the task, objective, scope, or success criteria |
| `mode`      | Set the overarching cognitive stance                   |
| `strategy`  | Control the reasoning mechanic or method of thought    |
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
- **Reflection & Learning** — After-action review and learning

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
- `npm run lint` — Lint JavaScript files
- `npm run format` — Format with Prettier
- `npm test` — Run tests
- `npm run verify` — Run validate + lint + tests

## Contributing

Use `npx plop` to add new blocks or stacks, then run `npm run verify` before publishing changes.

## Documentation

- `docs/GETTING_STARTED.md` — Step-by-step tutorial
- `docs/CHEATSHEET.md` — One-page quick reference
- `docs/ONTOLOGY.md` — Asset taxonomy and rules
- `docs/COMPOSITION.md` — Assembly rules and patterns
- `docs/examples/` — Real task walkthroughs

(Open `index.html` to browse the full catalog interactively.)
