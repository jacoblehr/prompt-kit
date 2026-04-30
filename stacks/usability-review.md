# Stack: usability-review

Evaluate whether an interface, workflow, document, onboarding path, or process lets its intended user complete the job without avoidable friction.

Blocks:
1. `frame.audience`
2. `frame.current-state`
3. `strategy.journey-map`
4. `mode.critique`
5. `rubric.usability-quality`
6. `schema.findings-brief`

Expected output: Prioritized usability findings tied to journey steps, user friction, failure states, and concrete fixes.

## Composition notes

`frame.audience` names who the experience must serve and what they are trying to do. `frame.current-state` grounds the review in the actual workflow before critique begins. `strategy.journey-map` traces the path from the actor's point of view. `mode.critique` then pressure-tests the journey for friction, missing feedback, and failure states. `rubric.usability-quality` gives the review a quality gate, and `schema.findings-brief` makes the issues actionable.

**Choose instead when:** use `feature-design` if the main job is defining a new feature rather than reviewing an existing experience.

**Common swaps:** Use `schema.requirements-brief` instead of `schema.findings-brief` when the review should become requirements for a redesign.

**Common failure mode:** Reviewing the artifact as a static object instead of walking through what the user knows, sees, decides, and does.

**Minimum blocks:** `strategy.journey-map` + `rubric.usability-quality` + `schema.findings-brief`
