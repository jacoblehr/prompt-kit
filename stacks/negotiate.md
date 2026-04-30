# Stack: negotiate

Prepare and execute a negotiation with explicit interests, BATNA, and concession strategy.

Blocks:
1. `frame.task`
2. `mode.explore`
3. `strategy.steelman`
4. `mode.decide`
5. `schema.execution-brief`

Expected output: Preparation brief with counterpart interests mapped, BATNA stated, and opening position justified.

## Composition notes

`frame.task` defines the specific deal being negotiated before perspective-taking begins. `mode.explore` maps the counterpart's perspective before entering the conversation. `strategy.steelman` models the counterpart's strongest position so concessions are prepared. `mode.decide` closes on an opening strategy. `schema.execution-brief` sequences the approach and fallback.

**Common failure mode:** Optimizing the opening position without naming interests, walk-away conditions, or the counterpart's strongest case.

**Minimum blocks:** `frame.task` + `strategy.steelman`
