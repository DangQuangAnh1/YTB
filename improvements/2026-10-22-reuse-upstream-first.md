# Reuse upstream capabilities before rebuilding them

- Status: applied
- Origin: direct user correction in P-2,2026-10-22. User asks to store the rule at parent level and push: “ưu tiên là sử dụng, tham khảo và tối ưu các cái mà repo đó sẵn có để tuết kiệm thời gian và token”.
- Scope: shared Creator Agency workspace, all roles/projects governed by root AGENTS.md.
- Evidence: P-2 tasks/reuse-gap-assessment-v1.md and tasks/action-toolkit-installed-v1.json. Starter/IK tools were installed/tested but delivered motion still relied on newly written rig/pose code; user identified repeated rework.
- Baseline: fd52c0b3d3c53ad794193212e4f6b860f894da46; P-2 revision215.
- Change: one parent AGENTS.md paragraph requires trying suitable existing repo capabilities and adapting them before equivalent custom implementation; retain provenance and record a concrete gap before replacement. No operational schema or permissions changed.
- Checks: inspected the instruction alongside existing authorization/privacy/provenance rules; manual walkthrough of P-2 would select and demonstrate the installed stick-motion starter before building another rig. This is an instruction walkthrough, not a new runtime test or proof of improved creative quality.
- Impact: intended to reduce repeated implementation/research and token use; actual savings unmeasured.
- Adoption: applies immediately to subsequent work in this repository; user explicitly authorizes continuing P-2 after the rule commit/push. Pending P-2 files excluded from this rule-only commit.
- Undo: revert the dedicated rule commit, preserving separate project work.
