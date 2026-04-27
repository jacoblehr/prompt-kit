# Prompt

Apply BRANCH + PRUNE.

Rules:
1. Generate exactly {branch_count} distinct approaches. Each must differ in a meaningful way — different method, assumption, or framing. Rewording the same approach is not a distinct branch.
2. For each branch: provide a short label, a 2–3 sentence rationale, and a one-line assessment against the selection criterion.
3. Select the strongest branch. State the verdict explicitly in one sentence.
4. Prune all other branches. For each pruned branch, briefly explain why it was eliminated.
5. Continue only on the selected branch. Do not reference or merge pruned branches downstream.

Constraints:
- Exactly {branch_count} branches. No more, no fewer.
- Pruning is mandatory. You must end this block with exactly one active branch.
- Branches must be genuinely distinct, not paraphrases.

Return:

**Branch A: [label]**
Rationale: ...
Assessment: ...

**Branch B: [label]**
Rationale: ...
Assessment: ...

**Selected: Branch [X]** — [one sentence verdict]
**Pruned:** Branch [Y] — [reason] | Branch [Z] — [reason]

**Continuing on: Branch [X]**

---
branches: [number of branches to generate]
criterion: [selection criterion]
context: [problem or task]
