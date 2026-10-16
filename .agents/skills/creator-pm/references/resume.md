# Resume and context

Run `resume P-n`. It validates registered hashes and decision bindings, regenerates HANDOFF from STATE and returns structured context. Read PROJECT.md. HANDOFF is derived, not a second decision source.

Load project essentials, then task brief, relevant plan/decisions, then exact artifact/source passages. Do not open every project, skill or old research note. `context P-n --max-chars 12000` uses characters, not tokens or the host's hidden input budget. It fails rather than dropping required constraints. Omitted artifact refs are explicitly flagged; fetch those needed for the current decision.

On missing/stale state or changed artifacts, investigate the named problem before dependent work. A model report is not user authority. If external work might already have happened, reconcile before retry; v0 has no uploader to reconcile automatically.

Checkpoint decisions, plan changes, stage boundaries and handoffs so unexpected host compaction has a recovery point. Preserve goal, constraints, authority, revision, evidence, remaining work and uncertainty; not private internal reasoning. A skill does not control the app's internal compaction.

Switch machines by syncing the repo and stopping the old writer. Media/auth/tools require separate verification. Git does not transport session history or secrets. Do not delete a lock until the prior process/owner is confirmed stopped.
