---
name: creator-review
description: Review exact research, script, storyboard or video artifacts against brief and evidence, or verify a scoped fix; report findings without executing repairs or assuming missing checks passed.
---

# Creator Review

Read the brief, current plan, target artifact and relevant evidence. Declare self_review, independent_review or human_review honestly. Another role name is not independent verification; do not multiply reviewers without need/authorization.

Use [rubrics](references/rubrics.md) for the target. Inspect actual outputs, not merely worker reports or filenames. Findings name artifact/scene/source, expected behavior and impact. Distinguish passed, failed and unverified.

Fill templates/REVIEW.json with real project-relative evidence and register using `agency.py review P-n --file report.json --expected-revision N`. The helper computes required-check coverage and verifies files; it cannot prove your judgment true. Never manufacture evidence to force a pass.

For re-review, verify prior findings and changed outputs/dependencies; expand only when justified. Keep unresolved issues even at the retry limit and return material scope changes to PM. Targets are read-only; workers repair into new versions. QA covers listed artifacts/checks, not release permission or market success.

If a finding demonstrates a reusable process/tool defect, include a concise evidence reference for [creator-improve](../creator-improve/SKILL.md). Keep the review verdict scoped to the target; a kit patch does not make the original output pass. Leave target repairs to its owner.
