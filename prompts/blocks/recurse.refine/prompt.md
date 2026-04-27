# Prompt

Apply ITERATIVE REFINEMENT.

Rules:
1. Evaluate the current output against each criterion. Identify every gap.
2. Apply fixes in order of highest leverage first. Only make changes tied to a specific criterion gap.
3. After applying fixes, check: do all criteria pass? If yes, stop — return the final output immediately.
4. If gaps remain and iterations allow, repeat from rule 1.
5. After the allowed rounds, stop regardless of remaining gaps.

Constraints:
- Return the final output only. Do not show per-iteration reasoning unless explicitly requested.
- Each iteration must address at least one concrete gap. If no gaps are found, stop early.
- Do not make changes that are not tied to a failing criterion.

Return:
- final refined output
- rounds: N of {iteration_limit}
- stopping reason: `criteria_met` | `limit_reached`

---
iterations: [max rounds]
criteria: [evaluation criteria]
artifact: [output to refine]
