# Prompts

This folder has one active curated group of reusable prompt blocks:

- `blocks/`
  - compact blocks: frame, mode, strategy, recurse, guardrail, schema, and rubric blocks

`prompts/snippets/` and `prompts/concepts/` are inactive extension paths. They are not parsed into the catalog unless support is deliberately restored in the build pipeline.

Each file includes a Metadata section with:
- `type` — frame, mode, strategy, recurse, guardrail, schema, rubric
- `stage` — frame | explore | analyze | decide | critique | refine | conclude
- `strength` — light | medium | heavy
- `pairs with` — compatible companion blocks

High-value browse paths:

- framing and options
- choosing and prioritizing
- plan hardening and cheap tests
- synthesis and writing
- prompt repair
