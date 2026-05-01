# Getting Started with Prompt Kit

## 5-Minute Quick Start

### Option A: Browser (Zero Setup)

1. Open `index.html` in your browser
2. Use `/` to focus the search bar
3. Type a task (e.g., "debug", "decide", "research")
4. Browse suggested stacks
5. Copy the composed one-shot prompt to your LLM

### Option B: CLI (Fast Discovery)

```bash
# Search for stacks
npx prompt-kit search "debug"

# List all blocks
npx prompt-kit list blocks

# List all stacks
npx prompt-kit list stacks

# See statistics
npx prompt-kit stats
```

## How Prompt Kit Works

### Two Core Concepts

**Blocks** — Small, reusable prompt components. Each does one clear job:

- `frame` — Define the task, scope, success criteria
- `mode` — Set cognitive stance (explore, decide, critique, reflect)
- `strategy` — Reasoning methods (split problems, premortem, steelman, red-team)
- `guardrail` — Prevent common failures (bias, missing evidence)
- `schema` — Output structure (decision memo, findings brief, execution brief)
- `rubric` — Evaluation criteria

**Stacks** — Named assemblies of blocks for recurring jobs. Each stack is a recipe for one strong prompt and includes:

- A clear job description
- Minimum viable block sequence
- Full recommended sequence
- Block order rationale
- Common swaps and failure modes

### Block Composition Rules

1. **Start with a frame** if the task is vague
2. **Add a mode** to set cognitive stance
3. **Add 1–2 strategies** (max) for reasoning
4. **Add guardrails** for likely failure modes
5. **Add a schema** if output format matters
6. **Add a rubric** if stakes justify evaluation

## Example Workflows

### Debugging a Failing System

```
frame.task → mode.explore → mode.critique
→ frame.cause-mapping → schema.execution-brief
```

### Writing a Product Specification

```
frame.task → frame.success-criteria → guardrail.assumption-audit
→ rubric.plan-quality → schema.execution-brief
```

### Research Synthesis

```
mode.explore → frame.extract-insights → guardrail.disconfirming-evidence
→ rubric.research-quality
```

## Essential Stacks (Start Here)

### 1. Quick Sense Check (2–3 blocks)

- `mode.critique` + `guardrail.uncertainty`
- Use when: Unsure about an idea, need fast gut check

### 2. Fast Ideation (2–3 blocks)

- `frame.task` + `mode.explore`
- Use when: Need to open the space before deciding what the real problem is

### 3. Debug a Failure (5–6 blocks)

- `frame.task` + `mode.explore` + `mode.critique`
- → `frame.cause-mapping` + `schema.execution-brief`
- Use when: Investigating bugs, incidents, regressions

### 4. Decision Making (5–7 blocks)

- `frame.success-criteria` + `mode.explore` + `guardrail.assumption-audit`
- → `mode.decide` + `schema.decision-memo`
- Use when: Choosing between options, need defensible decision

### 5. Safe Code Changes (5–6 blocks)

- `frame.task` + `mode.explore` + `guardrail.assumption-audit`
- → `strategy.premortem` + `schema.execution-brief`
- Use when: Modifying unfamiliar code, production changes

### 6. Agentic Coding (6–9 blocks)

- `frame.task` + `mode.explore` + `strategy.problem-split`
- → `guardrail.bounded-recursion` + `guardrail.scope-creep` + `schema.execution-brief`
- Use when: Asking an autonomous coding agent to inspect, edit, verify, and report back from a repository

### 7. Test Strategy (4–6 blocks)

- `frame.success-criteria` + `mode.explore` + `mode.critique`
- → `guardrail.assumption-audit` + `schema.execution-brief`
- Use when: Planning risk-based test coverage for a feature, fix, refactor, or system change

### 8. Assumption Inversion (4–6 blocks)

- `frame.task` + `mode.create` + `strategy.constraint-relaxation`
- → `guardrail.assumption-audit` + `schema.option-map`
- Use when: The obvious answer is too familiar and you need plausible strange options

### 9. Weird Prototype (5–7 blocks)

- `frame.task` + `frame.audience` + `mode.create`
- → `frame.success-criteria` + `schema.experiment-plan`
- Use when: A strange idea might teach something, but only if tested before it is normalized

## Adding Your Own Blocks

Use the plop generator:

```bash
# Interactive prompt
npx plop

# Direct generation
npx plop block mode explore
npx plop block strategy premortem
npx plop block stack debug-incident
```

## Common Patterns

### Problem Framing

- `frame.task` — Clarify the ask
- `frame.success-criteria` — Define done
- `guardrail.uncertainty` — Surface what is still unresolved

### Option Generation

- `mode.explore` — Widen search space
- `strategy.problem-split` — Break into pieces
- `frame.extract-insights` — Pull the useful signal forward

### Critical Thinking

- `mode.critique` — Find weaknesses
- `guardrail.disconfirming-evidence` — Seek contrary evidence
- `guardrail.uncertainty` — Calibrate confidence and unknowns

### Decision Support

- `frame.success-criteria` — Make the choice target explicit
- `guardrail.assumption-audit` — Check premises
- `schema.decision-memo` — Record the chosen option and tradeoff

### Learning & Reflection

- `mode.reflect` — Step back
- `frame.extract-insights` — Find patterns
- `schema.execution-brief` — Convert learnings into an actionable brief

## Next Steps

1. **Try a stack**: Search for one above and paste the assembled prompt into your LLM
2. **Customize**: Replace generic prompts with your domain specifics
3. **Extend**: Add your own blocks using `npx plop`
4. **Share**: Document which combinations work for your team

## Tips for Effective Use

- **Start small**: One or two blocks, not the whole stack
- **Iterate**: Run → observe → adjust → repeat
- **Be specific**: Concrete examples beat abstract prompts
- **Track results**: Note what works for your use cases
- **Contribute**: Add successful combinations back to the repo

## Troubleshooting

**Problem**: Outputs are too vague

- **Fix**: Add `frame.success-criteria` or `schema` block

**Problem**: Missing important considerations

- **Fix**: Add a `guardrail` block for known failure modes

**Problem**: Too many options, can't decide

- **Fix**: Use `frame.success-criteria` to define evaluation criteria, then `mode.decide`

**Problem**: Repetitive work

- **Fix**: Create a stack from your successful combination

## Learn More

- `docs/GETTING_STARTED.md` — Step-by-step tutorial
- `docs/CHEATSHEET.md` — Quick reference
- `docs/ONTOLOGY.md` — Understanding block types
- `docs/COMPOSITION.md` — Assembly rules
- Browse `index.html` interactively for full catalog
