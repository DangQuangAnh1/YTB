# Evidence to reusable improvement

Read only the affected skill/reference and the evidence needed for this issue. Search `improvements/` for a matching problem before adding a record; do not load all previous lessons into each project.

## During execution

1. Identify the observable mismatch: expected behavior, actual result, evidence reference and practical impact. User corrections count as evidence; guesses about why a model failed remain hypotheses.
2. Scope the lesson. A niche preference, channel format or one-off workaround belongs in that project's notes/profile. A routing, handoff, recovery, source-checking or repeated tooling defect may belong in the shared kit. One demonstrated defect can justify a narrow fix; repetition is not mandatory.
3. Choose the smallest intervention. Reuse an existing instruction before adding a rule or skill. Prefer deleting ambiguity/duplication. Keep conditional details in references. Add executable helpers only when reliability or reuse justifies them.
4. Apply a small reversible local change within the user's standing instruction to improve this kit. Check the actual diff and relevant behavior. If a shared change materially alters workflow, approval boundaries, dependencies/cost or state compatibility, prepare it concretely and leave it proposed for the user's scope decision. Do not weaken approval/provenance controls as an optimization.
5. Save a compact record using [the lesson template](../../../../templates/LESSON.md). For shared lessons use `improvements/YYYY-MM-DD-short-slug.md`; search first and update the existing record when appropriate. For a project-only lesson use `projects/P-n/tasks/lesson-short-slug.md` and register it with `agency.py artifact` using `--kind other`, with expected revision. Do not write STATE/HANDOFF manually or edit a project owned by another writer.
6. Resume the original task. Report the improvement briefly with the next normal progress update. Stop a failing improvement attempt, preserve the finding and defer it rather than entering an unbounded rewrite/review loop.

## At a milestone or project close

Read the current project packet, relevant QA findings and its lesson references. Summarize what worked, what caused rework, what remains unknown and the most useful pending changes. A project closing does not require a code change. Do not infer better content quality, market success or token savings from a structural validation pass.

Resolve observations as project-only, applied, proposed, deferred or rejected. Applied means the patch and its checks actually exist; a written idea is proposed. Keep compact evidence/outcomes rather than raw chat or private internal reasoning. Project completion and kit improvement completion are separate claims.

## Validation and rollout

- Instruction-only patch: inspect affected routing/links and run the bundled skill validator if available. Walk through a realistic example and label it a manual walkthrough, not a model behavior evaluation.
- Helper/schema patch: reproduce the defect in an isolated fixture, run focused checks and relevant existing tests. Do not migrate real state implicitly.
- Token/context improvement: record exposed usage with source and comparable scope if available. Otherwise state unmeasured; shorter text alone does not establish savings.
- Use a distinct Git commit for a coherent kit change, excluding unrelated project/user edits. Sync to the authorized repo only with working credentials/tools; retain local work and report if sync is unavailable. Do not create new infrastructure to publish a lesson.
- Record the baseline revision, changed files, actual checks and an undo approach. A clean separate commit can be reverted; with concurrent edits reverse only the identified patch, preserving other work.
- A skill-file edit changes the checked-out source, not necessarily the instructions already loaded in another chat. Let an active task finish under its existing plan; read the changed skill explicitly at the next suitable boundary or reopen the chat. On a defect affecting current correctness, checkpoint and re-read before continuing affected work. Changed project scope still needs a new plan decision.

## Examples

- The user has to restate budget and review gates on every project: establish a referenced shared default plus project overrides; keep the approval record bound to the actual project plan. Verify with another intake case before claiming the friction is fixed.
- One Threads channel uses a humorous voice: store it in that channel's profile, not in all Content instructions.
- A tool call fails consistently because a required parameter is missing: preserve a redacted error, fix the applicable helper/reference and verify the original case. Do not save credentials or full private responses.
- A project finishes without relevant new findings: report that no shared change was justified; do not manufacture a rule.
