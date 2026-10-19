---
name: creator-launch
description: Package finished drafts for release (titles, description with credits, hashtags, cover, outro, pinned comment) and prepare the channel launch kit (name, logo, avatar, banner, checklist). Stops before any account creation, upload or publication unless the user explicitly authorizes that action.
---

# Creator Launch

This is the last stage. Run it after Review on exact drafts the user wants to release. Read the project packet, the latest review verdicts and the rights protocol first. The skill **prepares** a release. The user creates accounts, accepts platform terms and publishes, or explicitly authorizes each action at the time it happens. A launch kit is not permission to post.

Two modes; load only the reference you need:
- **Brand kit** (once per channel): see [brand kit](references/brand-kit.md). Covers name shortlist with handle checks, logo concepts, avatar/banner exports and the outro component. The user picks the name and logo.
- **Per-video package**: see [packaging](references/packaging.md). Covers 3 title options, a description with a credits block, hashtags, the cover frame, a pinned comment / CTA, a series tag and the rights gate.

Tool choices and platform facts are in [tools](references/tools.md). Use [launch checklist](references/launch-checklist.md) when the user is ready to open channels or upload. List the manual steps and the authorization each needs. Upload tools are optional and run only with the user's credentials and approval, never with stored passwords.

Keep the record honest:
- A release gate fails while required consent, credits or license receipts are missing, unless the user has recorded an explicit risk acceptance.
- Simulated reviews and whisper checks are not audience data or listening.

Save outputs under `artifacts/release/` and register them with agency.py. Keep secrets, OAuth tokens, cookies and channel credentials out of Git and out of project records.
