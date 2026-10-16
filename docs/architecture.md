# Architecture and operational limits

Six repo-local skills guide the existing host; Python helpers persist and check records. This is not a new agent runtime, authorization server or sandbox. Commands can record operator-provided user evidence but cannot authenticate the human or verify the truth of a review. Arbitrary tools outside helpers are not blocked by Python guards.

Project IDs increase from P-1. Registry and project locks are exclusive local files; a crashed process leaves a lock for an operator to investigate. Do not delete a live lock. Do not run two machines/writers against synced project state simultaneously. Use Git synchronization and explicit ownership at handoff; Git is not a distributed lock.

Records are written before STATE references them; STATE uses fsync + atomic replacement. A failed transaction may leave an unreferenced immutable record/output, never authority. Unique names permit a retry; investigate leftovers before cleanup. HANDOFF is generated after STATE; a failed derived write is reported and resume can regenerate it. This protects atomic file replacement, not every filesystem/power-loss scenario.

A new plan resets approval and acceptance. Grants are bound to project/current plan hash/revision and source evidence. Output records have content hashes, input IDs and plan revision. Registered files must not be overwritten. Current v0 fails closed on missing/changed referenced artifacts; restore the correct file or recover records explicitly, do not rewrite hashes to claim old acceptance.

For explicitly acknowledged output/evidence loss, `agency.py recover P-n --expected-revision N --source-ref ... --excerpt ...` stores an immutable pre-recovery snapshot and loss receipt. It retains old artifact IDs/hashes and discloses unavailable lineage in resume/context. New outputs and reviews cannot reuse unavailable lineage. Present files still require exact hashes; missing plans, decisions and review records remain errors. Affected current acceptance becomes unverified. This records operator-supplied evidence, not authenticated user identity. Project files are excluded from Git newline conversion; new helper records use UTF-8/LF.

Review verdict is computed from required check coverage/status and evidence file references. Acceptance covers the latest registered review targets only, not every project output. Reports remain attributed judgments. Silent demonstrations cannot establish narrated audio quality. No publish/channel/analytics operation exists in v0.

Context packs retain essential goal/scope/decisions/task and an optional bounded artifact index; omitted counts are visible. Character limits are not token limits. Helpers validate files before reuse, which can add IO on large media; measure overhead rather than assuming it is free. Usage samples are caller-supplied observations: cumulative counters use deltas per session; use a fresh project-specific session/baseline and never mix modes or infer account billing.

Only file-first coordination is active. Shared contracts/scripts are resolved from the full checkout; installing one skill folder alone is incomplete. Credential/auth/media transport between machines is separate from Git. No hidden chain-of-thought or session databases are exported.
