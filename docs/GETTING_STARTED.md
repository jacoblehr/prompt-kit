# Getting Started with Prompt Kit

## 5-Minute Quick Start

### Option A: Browser (Zero Setup)

1. Open `index.html` in your browser
2. Use `/` to focus the search bar
3. Type a task (e.g., "debug", "decide", "research")
4. Browse suggested stacks
5. Copy the composed prompt to your LLM

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
- `strategy` — Reasoning methods (split problems, premortem, inversion)
- `lens` — Conceptual viewpoints (psychology, economics, game theory)
- `guardrail` — Prevent common failures (bias, missing evidence)
- `schema` — Output structure (decision memo, experiment design)
- `rubric` — Evaluation criteria

**Stacks** — Named assemblies of blocks for recurring jobs. Each stack includes:

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
mode.explore → frame.codepath-walkthrough → lens.invariant-check
→ guardrail.change-impact-review → frame.test-case-design
```

### Writing a Product Specification

```
mode.decide → frame.compare-options → guardrail.assumption-audit
→ schema.decision-memo → rubric.decision-quality
```

### Research Synthesis

```
mode.explore → frame.synthesize-sources → lens.survivorship-bias
→ frame.extract-insights → schema.execution-brief
```

## Essential Stacks (Start Here)

### 1. Quick Sense Check (2–3 blocks)

- `mode.critique` + `guardrail.uncertainty`
- Use when: Unsure about an idea, need fast gut check

### 2. Fast Ideation (2–3 blocks)

- `mode.explore` + `frame.brainstorm-angles`
- Use when: Need many options, problem is underframed

### 3. Debug a Failure (5–6 blocks)

- `mode.critique` + `frame.codepath-walkthrough` + `lens.invariant-check`
- → `guardrail.change-impact-review` + `frame.test-case-design`
- Use when: Investigating bugs, incidents, regressions

### 4. Decision Making (5–7 blocks)

- `mode.decide` + `frame.compare-options` + `guardrail.assumption-audit`
- → `schema.decision-memo` + `rubric.decision-quality`
- Use when: Choosing between options, need defensible decision

### 5. Safe Code Changes (5–6 blocks)

- `mode.explore` + `frame.codepath-walkthrough` + `lens.invariant-check`
- → `guardrail.change-impact-review` + `frame.test-case-design`
- Use when: Modifying unfamiliar code, production changes

## Adding Your Own Blocks

Use the plop generator:

```bash
# Interactive prompt
npx plop

# Direct generation
npx plop block mode explore
npx plop block strategy premortem
npx plop block lens psychology
npx plop block stack debug-incident
```

## Common Patterns

### Problem Framing

- `frame.task` — Clarify the ask
- `frame.success-criteria` — Define done
- `frame.scope` — Bound the problem

### Option Generation

- `mode.explore` — Widen search space
- `strategy.problem-split` — Break into pieces
- `frame.brainstorm-angles` — Generate perspectives

### Critical Thinking

- `mode.critique` — Find weaknesses
- `guardrail.disconfirming-evidence` — Seek contrary evidence
- `lens.confidence-calibration` — Check certainty

### Decision Support

- `frame.compare-options` — Structure comparison
- `guardrail.assumption-audit` — Check premises
- `rubric.decision-quality` — Define good

### Learning & Reflection

- `mode.reflect` — Step back
- `frame.extract-insights` — Find patterns
- `schema.plan-next-actions` — Convert learnings

## Next Steps

1. **Try a stack**: Search for one above and paste it into your LLM
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

- **Fix**: Use `rubric.decision-quality` to define evaluation criteria

**Problem**: Repetitive work

- **Fix**: Create a stack from your successful combination

## Learn More

- `docs/GETTING_STARTED.md` — Step-by-step tutorial
- `docs/CHEATSHEET.md` — Quick reference
- `docs/ONTOLOGY.md` — Understanding block types
- `docs/COMPOSITION.md` — Assembly rules
- Browse `index.html` interactively for full catalog
