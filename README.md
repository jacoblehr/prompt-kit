# Prompt Kit

Prompt Kit is a small cognitive composition system for building strong prompts quickly.

## What's New

### Getting Started (Under 5 Minutes)

1. **Open in browser**: Just open `index.html` - no setup needed
2. **Search for blocks**: Use `/` to focus search, type to filter
3. **Try a stack**: Search for a stack name like "debug" or "decide"
4. **Build your own**: Add blocks to compose prompts for your task

### Faster Composition with Stacks

Stacks are pre-built sequences of blocks for common tasks. Start with one:

- `orient before acting` — Quick sense-check before making moves
- `debug a failure` — Systematic debugging approach
- `debug a system` — Architecture review
- `break a recurring incident` — Incident response
- `read before change` — Safe codebase modifications
- `safe migration` — Risk-managed changes
- `evaluate-model-output` — LLM output assessment
- `write-a-proposal` — Structured proposal writing

Search for a stack name in the browser or use the CLI:

```bash
npx prompt-kit search "debug"
```

### Build Your Own Composition

**Minimal sequence** (works for most tasks):

1. `mode.explore` — Widen your search space
2. `frame.task` — Clarify the actual job
3. `strategy.problem-split` — Break into manageable pieces
4. `frame.success-criteria` — Define what success looks like
5. `guardrail.uncertainty` — Surface hidden assumptions
6. `rubric.decision-quality` — Evaluate the outcome

**Common patterns**:

- Quick sense-check: `mode.critique` + `guardrail.uncertainty`
- Fast ideation: `mode.explore` + `frame.brainstorm-angles`
- Deep research: `mode.explore` → `mode.analyze` → `mode.decide`

## What This Is

Prompt Kit provides:

- **Blocks** — Reusable prompt components typed by role (frame, mode, strategy, lens, guardrail, schema, rubric)
- **Stacks** — Named assemblies of blocks for recurring jobs
- **Browser-first** — Open `index.html` and search without any setup

## What This Is Not

- A formal asset registry
- A packaging system
- A schema-heavy prompt platform
- An automated execution engine

That overhead can come later if the assets prove useful. For now, the repo is optimized for fast manual testing.

## Quick Reference

| Action            | Method                                    |
| ----------------- | ----------------------------------------- |
| Search everything | `/` in browser or `npx prompt-kit search` |
| List blocks       | `npx prompt-kit list blocks`              |
| List stacks       | `npx prompt-kit list stacks`              |
| Show stats        | `npx prompt-kit stats`                    |
| Validate assets   | `npm run validate`                        |
| Build site data   | `npm run build`                           |

## Available Actions

- `npx plop` — Interactive generator for new blocks and stacks
- `npm run build` — Rebuild browser catalog (`site-data.js`)
- `npm run validate` — Check asset integrity
- `npm run lint` — Lint JavaScript files
- `npm run format` — Format with Prettier
- `npm test` — Run tests
- `npm run verify` — Run validate + lint + tests

## Block Types

| Type        | Job                                                    |
| ----------- | ------------------------------------------------------ |
| `frame`     | Define the task, objective, scope, or success criteria |
| `mode`      | Set the overarching cognitive stance                   |
| `strategy`  | Control the reasoning mechanic or method of thought    |
| `lens`      | Apply a conceptual viewpoint or interpretive frame     |
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

## Contributing

See `docs/CONTRIBUTING.md` for details on adding new blocks, stacks, and running tests.

## Documentation

- `docs/GETTING_STARTED.md` — Step-by-step tutorial
- `docs/CHEATSHEET.md` — One-page quick reference
- `docs/ONTOLOGY.md` — Asset taxonomy and rules
- `docs/COMPOSITION.md` — Assembly rules and patterns
- `docs/EXAMPLES/` — Real task walkthroughs

(Open `index.html` to browse the full catalog interactively.)
