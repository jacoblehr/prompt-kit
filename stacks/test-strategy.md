# Stack: test-strategy

Design the smallest useful test plan for a feature, bug fix, refactor, or risky system change.

Useful inputs:
- behavior under test
- acceptance criteria or bug reproduction steps
- existing test coverage
- risk areas and invariants
- available test harnesses
- verification budget

Blocks:
1. `frame.success-criteria`
2. `mode.explore`
3. `mode.critique`
4. `guardrail.assumption-audit`
5. `schema.execution-brief`
6. `rubric.plan-quality`

Expected output: Test strategy with must-cover behaviors, risk-based test cases, fixtures or harness notes, verification commands, and explicit gaps.

## Composition notes

`frame.success-criteria` turns the desired behavior into judgeable outcomes before test ideas multiply. `mode.explore` maps existing coverage, harnesses, and observable boundaries. `mode.critique` switches from inventory to risk-based challenge: what would break silently, regress, or remain untested. `guardrail.assumption-audit` names assumptions about fixtures, environments, mocks, data, and external services. `schema.execution-brief` turns the coverage plan into an ordered verification sequence. `rubric.plan-quality` checks that the test strategy is proportional to risk and executable.

**Choose instead when:** use `debug` when the root cause is still unknown. Use `review-code` when tests already exist and the main job is evaluating a diff.

**Common failure mode:** Maximizing test count instead of covering the behavior, invariants, and failure modes that would change confidence.

**Minimum blocks:** `frame.success-criteria` + `mode.critique` + `schema.execution-brief`
