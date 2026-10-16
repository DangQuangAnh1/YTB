# Windows checkout and P-1 audit

- Status: proposed
- Origin: user requested source skill and P1 check, 2026-10-16.
- Scope: shared kit portability; P-1 recovery remains separate.
- Baseline: ea37bdd988a9fd084fcf649559c5304b9c2f10d0; P-1 STATE revision 54.
- Evidence: `py scripts/agency.py resume P-1` fails with `Hash mismatch: plans/plan-v2-r34-c2009aed.md`. `git ls-files --eol` shows index LF / working tree CRLF for plans and decisions. Read-only SHA256 audit of current plan, decisions, artifacts and review records found 33 newline-only mismatches, 11 missing media files, zero other mismatches. Review evidence dependencies were not exhaustively hashed by that audit.
- Expected / observed: byte-identical records should survive transfer; this checkout changes text bytes and omits ignored media. Normalizing CRLF to LF in memory reproduces all 33 expected hashes; no recovery writes were performed.
- Impact: resume/check and operational mutations cannot proceed. Missing files include all four registered video drafts, their four audio tracks and three voice auditions. Existing QA reports cannot replace inspection of missing media.
- Checks: `py -m unittest discover -s tests -v`: 41 total, 37 passed, 3 optional renderer tests skipped, 1 error at tests/test_agency.py:152 because Windows denies symlink creation (WinError 1314). `python3` resolves to an unavailable Microsoft Store alias; `py` works. No new playback, listening or render checks performed.
- Lesson: retain exact-byte hash validation. Git checkout line endings and media transfer are prerequisites to resuming across machines.
- Proposed change: define an explicit LF policy for future text records and deterministic helper text writes, with a Windows/Linux round-trip fixture. First inventory any records originally hashed with CRLF; do not normalize registered files indiscriminately. Make the symlink test explicitly skip only when the host cannot create symlinks, keeping the guard assertion on capable hosts.
- P-1 recovery: restore original text bytes only when the existing registered hash verifies, and transfer all referenced media/source captures separately with checksum verification. Do not alter STATE hashes or manufacture replacement outputs under old IDs. Re-run resume/check afterward.
- Additional findings: PROJECT.md still says the prototype has not been rendered, while revision 54 and A-028 record an 18-second prototype and subsequent three-voice audition. README's empty-registry sentence and architecture's five-skill count are stale. production/prototype-02/public is a plain text file containing a relative path rather than a usable media directory/symlink on this checkout; rendering readiness is unverified.
- Adoption: proposed only; no code, skill instructions, registered project artifacts, STATE or HANDOFF changed during this audit. Operational project review registration is unavailable because validation fails.
- Undo: remove this audit note; no project migration required.
- Next: perform explicit portability repair and recover media before continuing the existing waiting-user voice selection. Creative acceptance, Full HP pronunciation and public source rights remain unresolved according to saved records.
