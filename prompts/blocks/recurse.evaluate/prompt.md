# Prompt

Apply EVALUATION.

Rules:
1. For each criterion, assess the candidate output: `pass` | `partial` | `fail`.
2. For every `partial` or `fail`: state the specific gap, the risk it introduces, and the single highest-leverage fix.
3. Do not suppress failing verdicts. Do not add praise unrelated to the criteria.
4. Derive the overall verdict from the table: `accept` if all criteria pass | `refine` if only minor gaps remain | `reject` if any criterion fails critically.

Output format:

| Criterion | Verdict | Gap / Risk | Highest-leverage fix |
|-----------|---------|------------|----------------------|
| ...       | ...     | ...        | ...                  |

Overall verdict: [accept | refine | reject]
Rationale: [one sentence]

criteria: {criteria}

Candidate output:
{paste candidate output}
