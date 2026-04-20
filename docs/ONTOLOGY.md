# Ontology

This repo uses the smallest useful taxonomy.

## Canonical Hierarchy

1. **Blocks**
2. **Stacks**

That is the entire surfaced system.

---

## Blocks

A block is a reusable cognitive unit that does one clear job.

Blocks are typed by role. The type tells you what a block contributes — not where it lives in a folder.

### Block types

| Type | Job |
|------|-----|
| `frame` | Define the task, objective, scope, or success criteria |
| `mode` | Set the overarching cognitive stance |
| `strategy` | Control the reasoning mechanic or method of thought |
| `lens` | Apply a conceptual viewpoint or interpretive frame |
| `guardrail` | Prevent common failure modes and reasoning errors |
| `schema` | Shape the output format or structure |
| `rubric` | Define what "good" looks like for evaluation |

### Block contract

Every block should answer these questions:

- **Purpose** — what this block changes
- **Use when** — when to reach for it
- **Expects** — what input or context it assumes
- **Adds** — what it contributes to the final prompt
- **Returns** — expected output behavior or shape
- **Pairs with** — compatible companion blocks
- **Avoid when** — where it creates noise or redundancy

### Internal metadata

Every block carries:

- `type` — one of: `frame`, `mode`, `strategy`, `lens`, `guardrail`, `schema`, `rubric`
- `stage` — primary reasoning stage: `frame`, `explore`, `analyze`, `decide`, `critique`, `refine`, `conclude`
- `strength` — cognitive load added: `light`, `medium`, `heavy`

### Practical rules

- A block should be reusable on its own.
- A block should be small to medium in scope.
- A block should be understandable without context.
- A block's type should reflect its role, not its origin folder.

---

## Stacks

A stack is a named assembly of blocks for a recurring job.

A stack is not just "multiple blocks together." It is an opinionated sequence that reflects a real task shape, with a rationale for why the order works.

### Stack contract

Every stack should answer:

- **Job** — what this stack is for
- **Use when** — when to reach for this stack over building from scratch
- **Minimum blocks** — the smallest viable version
- **Full sequence** — the recommended complete assembly
- **Block order rationale** — why the sequence is ordered this way
- **Common swaps** — block alternatives worth knowing
- **Common failure mode** — what goes wrong when the stack is misused

### Practical rules

- A stack should solve a concrete, recurring use case.
- A stack should combine multiple blocks.
- A stack should be easy to tweak or cut down.
- A stack should be named by outcome or job, not by technique.

---

## Composition order

When assembling blocks into a prompt, use this sequence as the default:

1. **Frame** — define the task, scope, and success criteria first
2. **Mode** — set the cognitive stance (explore, critique, decide, reflect)
3. **Strategy or lens** — add the reasoning mechanic or viewpoint (1–2 max)
4. **Guardrail** — prevent the failure modes most likely for this task
5. **Schema** — define the output shape after reasoning instructions are set
6. **Rubric** — add evaluation criteria only when self-checking is needed

See `docs/COMPOSITION.md` for the full composition rules.

---

## Mapping from source folders

The repo stores source material in several folders. All of them map into the surfaced taxonomy:

| Folder | Block type |
|--------|-----------|
| `modes/` | `mode` |
| `strategies/` | `strategy` |
| `prompts/blocks/` | `frame`, `guardrail`, or `schema` depending on the block |
| `prompts/snippets/` | `frame`, `strategy`, or `schema` — full-task blocks |
| `prompts/concepts/` | `lens` |
| `rubrics/` | `rubric` |
| `stacks/` | stacks (not blocks) |

Snippet families, lens groups, and similar distinctions are browsing metadata, not top-level ontology layers.

---

## Decision rules

Use these rules to decide where a new asset belongs:

- If it is reusable on its own → it is a `Block`
- If it mainly defines the task, scope, or success criteria → `type=frame`
- If it mainly sets the cognitive stance → `type=mode`
- If it mainly controls the reasoning mechanic → `type=strategy`
- If it mainly applies a conceptual frame or discipline → `type=lens`
- If it mainly prevents a failure mode or reasoning error → `type=guardrail`
- If it mainly shapes the output format → `type=schema`
- If it mainly defines evaluation criteria → `type=rubric`
- If it is a saved combination of blocks for a repeatable use case → it is a `Stack`

---

## Canonical examples

- `frame.task` — frame block that restates a messy request as a structured problem
- `mode.explore` — mode block for breadth before convergence
- `strategy.problem-split` — strategy block for decomposition
- `lens.incentive-audit` — lens block drawn from game theory
- `guardrail.uncertainty` — guardrail block that prevents hidden confidence
- `schema.decision-memo` — schema block for decision output
- `rubric.decision-quality` — rubric block for evaluating decisions
- `stack.explore-to-decision` — stack for moving from options to a choice

---

## Non-goals

- This repo does not need formal execution graphs.
- It does not need a hand-maintained asset registry as the source of truth.
- It does not need every prompt to fit one schema.
- It does not need taxonomy theater.
