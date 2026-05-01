# Stack: creative-brief

Shape a creative, campaign, content, or concept request into a brief with enough direction to make useful work.

Blocks:
1. `frame.audience`
2. `mode.create`
3. `schema.content-draft`

Optional add-ons:
- `frame.task` when scope or non-goals need to be made explicit.
- `frame.success-criteria` when success needs to be judged before options are compared.

Expected output: Creative brief or first draft with audience, desired response, concept direction, constraints, and success criteria.

## Composition notes

`frame.task` defines the request before ideas expand. `frame.audience` anchors the work to the person it must move. `mode.create` generates distinct directions without prematurely narrowing. `frame.success-criteria` turns taste into judgeable criteria. `schema.content-draft` renders the chosen direction as a usable artifact or brief.

**Common swaps:** Use `schema.option-map` instead of `schema.content-draft` when the output should present multiple creative directions rather than draft one.

**Common failure mode:** Producing clever ideas that are not tied to audience, channel, constraint, or desired response.

**Minimum blocks:** `frame.audience` + `mode.create` + `schema.content-draft`
