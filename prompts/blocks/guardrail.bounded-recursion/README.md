# guardrail.bounded-recursion

## Purpose
Enforce explicit stopping conditions on any recursive or iterative block, preventing infinite loops or uncontrolled expansion.

## Use when
Using `recurse.decompose`, `recurse.refine`, or `recurse.branch-prune`. Always pair with recursive blocks. Must be declared before the first recursive step begins.

## Expects
- max_depth: hard recursion depth limit
- max_iterations: hard iteration limit
- stop_condition: explicit natural-language condition checked before each step

## Adds
A directive to check all stopping conditions before every recursive or iterative step, and to halt with an explicit stopping reason when any condition is met.

## Returns
- current depth or iteration at stopping point
- stopping reason: `criteria met` | `depth exceeded` | `iterations exceeded`
- final state at stopping point

## Pairs with
`recurse.decompose`, `recurse.refine`, `recurse.branch-prune`

## Avoid when
Used alone without a recursive block — this is a guardrail, not a standalone reasoning block.

---

## Metadata
- type: guardrail
- stage: any
- strength: heavy

---

## Guarantees
- no recursive step proceeds without checking all three stopping conditions first
- stopping reason is always explicit
- the stopping check is a pre-condition, not a post-condition

## Anti-patterns
- omitting this block from any composition that uses recursive blocks
- using vague stop_conditions like "when done" (must be a falsifiable condition)
- setting max_depth and max_iterations both to 1 on a recursive block (will always stop immediately)
