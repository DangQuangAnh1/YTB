# Learn from execution and project completion

- Status: applied
- Origin: user correction in the implementation chat, 2026-10-16: requested a dedicated skill that improves the kit during execution and after each project.
- Scope: shared kit, PM routing and QA handoff. No project-specific content format is being adopted.
- Evidence: baseline `docs/workflow.md` only described future pilot-driven improvements; no discoverable improvement skill or durable lesson template existed. The preceding response treated a Threads-specific daily workflow as the requested optimization; the user clarified that cross-project learning was the goal.
- Expected / observed: capture and apply useful lessons as work happens / only propose future workflow changes without a maintained improvement loop.
- Impact: missing explicit owner, trigger and record for kit evolution. Time and token impact unmeasured.
- Baseline: kit commit `2645efb106eb6a57b44322930dc9f3be3f01a00e`.
- Hypothesis / lesson: improvement needs a bounded capability with evidence and scope checks; a niche example alone should not become a universal workflow.
- Change: add `creator-improve`, a lesson template, and routes from workspace/PM/Review/workflow. Preserve project records, plan decisions and current runtime helpers.
- Checks: all six skills passed the bundled validator using system Python; affected Markdown links/fences checked; `.venv/bin/python -m unittest discover -s tests -q` passed all 41 existing tests. Manual walkthrough: this cross-project capability request produces a shared patch; a humorous Threads voice stays project-only; an instruction to remove approval gates is not applied as a routine optimization; no new evidence at close means no forced new rule. These are author walkthroughs, not fresh-model behavior evaluations. The renderer venv lacks PyYAML, so validation used the system interpreter; no runtime dependency was added.
- Adoption: load the new skill on a material correction/failure or a project milestone; existing chats explicitly read changed instructions at a suitable boundary. No automatic state migration or new publish capability.
- Undo: reverse this coherent kit-only patch/commit while preserving unrelated project edits. Keep lesson evidence if the routing is replaced.
- Next: observe a real use case; behavioral reliability and token savings remain unverified.
