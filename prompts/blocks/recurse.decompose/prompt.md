# Prompt

Apply RECURSIVE DECOMPOSITION.

Rules:
1. Inspect the problem. If it is directly solvable in one step, solve it and stop — do not decompose.
2. Otherwise, break it into at most {max_subproblems} distinct subproblems.
3. For each subproblem, repeat rule 1. Stop recursing when directly solvable or the depth limit is reached.
4. When the limit is reached, solve each remaining subproblem directly — even if imperfect.
5. After all branches are resolved, synthesize the leaf answers into a single final answer.

Constraints:
- Never generate more than {max_subproblems} subproblems at any one level.
- Each subproblem must be strictly smaller in scope than its parent.
- Do not merge subproblems at the same level — keep them independent.
- Synthesis happens exactly once, at the end.

Return:
- Use a numbered tree: 1, 1.1, 1.2, 1.1.1, etc.
- Each node: `[subproblem statement] → [direct answer | decomposed further]`
- End with a `## Synthesis` section that assembles the leaf answers.

depth limit: {max_depth}
subproblem limit: {max_subproblems}

Problem:
{paste problem or task}
