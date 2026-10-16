# Planning and user decisions

Use templates/PLAN.md for audience, format, evidence, original angle, feasible tools, outputs/tasks, acceptance and resource limits. Omit sections that do not help the decision.

Save a draft, then `python3 scripts/agency.py plan P-n --file draft.md --expected-revision N`. It copies an immutable plan and resets approval. Present that exact plan revision. Research/drafting the plan can continue while production awaits authorization.

After a genuine user response, use `decision P-n --expected-revision N --decision approve --source-ref '<actual message or saved source reference>' --excerpt '<actual brief user decision>' --allow write_content --allow render_draft`. Values in angle brackets must be real inputs, not invented evidence. Grant only what was authorized. `revise`/`reject` grants no actions; v0 does not grant publishing or paid services.

The CLI records operator-provided source evidence; it cannot authenticate a human or determine whether a paraphrase is true. A stable saved source note is acceptable when the host exposes no message ID; describe it honestly. Do not save secrets or unnecessary private conversation. Existing standing permission can be recorded if source/scope are known; do not ask again simply because the role changed.

New plans invalidate previous bindings. Technical repairs within scope need no repeated approval. Changed audience/channel/budget/publication scope returns to the user. A completed draft, QA pass and permission to release are distinct.
