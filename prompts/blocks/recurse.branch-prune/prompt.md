# Prompt

Generate competing branches for this problem, then prune weak ones before refinement.

Requirements:

- create only meaningfully distinct branches
- keep the evaluation criteria explicit when pruning
- discard weak branches early instead of refining all of them
- preserve the strongest surviving branches with a short rationale

Return:

- candidate branches
- branches kept
- branches pruned with rationale

---
context: {context}