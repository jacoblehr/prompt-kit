# Stack: make-playbook

Turn lessons, repeated work, or a successful workflow into a reusable playbook.

Blocks:
1. `mode.reflect`
2. `frame.extract-insights`
3. `schema.playbook`

Optional add-ons:
- `guardrail.assumption-audit` when hidden premises could change the answer.
- `guardrail.scope-creep` when the prompt may expand beyond the objective.

Expected output: Reusable playbook with trigger conditions, inputs, procedure, decision rules, examples, failure signs, escalation path, and maintenance notes.

## Composition notes

`mode.reflect` shifts the work from immediate execution to reusable learning. `frame.extract-insights` pulls out the patterns worth preserving. `guardrail.assumption-audit` checks whether the playbook depends on context that may not generalize. `guardrail.scope-creep` keeps the playbook focused on one repeated job. `schema.playbook` renders the lesson as a procedure another person can follow.

**Choose instead when:** use `after-action-review` when the main output is a retrospective with remediation actions rather than a reusable procedure.

**Common swaps:** Add `schema.execution-brief` after `schema.playbook` if the playbook needs an implementation or adoption plan.

**Common failure mode:** Standardizing a one-off situation into a rigid process without naming when the playbook does and does not apply.

**Minimum blocks:** `mode.reflect` + `frame.extract-insights` + `schema.playbook`
