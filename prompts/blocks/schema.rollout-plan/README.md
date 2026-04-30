# schema.rollout-plan

## Purpose
Render a change, feature, policy, process, or migration as a staged rollout with adoption, monitoring, and rollback made explicit.

## Use when
A plan must move through people, systems, customers, or operational gates rather than being completed in one private step.

## Expects
A chosen change or direction plus known stakeholders, dependencies, risks, and success signals.

## Adds
A rollout-oriented output shape that separates phases, audiences, owners, communications, monitoring, rollback triggers, and adoption checks.

## Returns
- rollout objective
- phases
- audience or stakeholder actions
- owner or responsible role
- communication points
- monitoring signals
- rollback or pause trigger
- adoption check
- next action

## Pairs with
`frame.stakeholders`, `frame.current-state`, `strategy.premortem`, `guardrail.scope-creep`, `schema.execution-brief`

## Avoid when
The work is a private analysis, small one-step task, or decision memo with no adoption or operational rollout.

---

## Metadata
- type: schema
- stage: conclude
- strength: medium
