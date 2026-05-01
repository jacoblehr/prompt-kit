# Stack: assumption-inversion

Generate useful directions by deliberately inverting the assumptions that make the current answer feel obvious.

Useful inputs:
- current idea, plan, product, argument, or prompt
- assumptions that seem fixed
- constraints that may or may not be real
- success criteria
- unacceptable outcomes

Blocks:
1. `frame.task`
2. `mode.create`
3. `strategy.constraint-relaxation`
4. `guardrail.assumption-audit`
5. `guardrail.scope-creep`
6. `schema.option-map`

Expected output: Inverted assumptions, plausible weird options, what each option would require to be true, and the smallest test for the best non-obvious direction.

## Composition notes

`frame.task` names the current target before the inversion begins. `mode.create` opens permission to generate unexpected directions. `strategy.constraint-relaxation` separates hard limits from inherited defaults. `guardrail.assumption-audit` forces each surprising option to name what must be true. `guardrail.scope-creep` prevents the exercise from becoming unconstrained novelty. `schema.option-map` preserves multiple strange-but-plausible paths without forcing a premature winner.

**Choose instead when:** use `explore-or-exploit` when the real question is whether to keep searching or commit. Use `creative-brief` when the job is to produce a polished creative direction for a known audience.

**Common failure mode:** Producing random novelty instead of targeted inversions that test a real assumption.

**Minimum blocks:** `mode.create` + `strategy.constraint-relaxation` + `schema.option-map`
