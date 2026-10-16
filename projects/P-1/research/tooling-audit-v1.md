# P-1 — Tool/skill audit before 10–20s prototype

2026-10-16, Asia/Bangkok. Source: user requested “làm thử video ngắn tầm 10-20s thôi để review”, then interrupted before work and said “khoan, trước khi làm thử xem chatgpt này có tool, skill nào hỗ trợ ko, add vào và dùng cả”. This turn audits/adds tools first; no new prototype was rendered. The original prototype request remains relevant, but the revised plan needs a matching operational binding before production; do not reuse plan v1's explanatory format.

## Available and already used

- Creator PM/BA/Content/Production/Review: installed in the complete repository. Keep their approval, source, artifact and QA controls. These do not supply better taste or voice automatically.
- CUA in-app browser: already used to read Threads, inspect original image and comments, find the Full HP comment and preserve canonical links. Suitable for actual public-page capture; no new browser automation plugin needed. A clean batch of readable source crops still needs to be made/verified for the new prototype. Do not use generated lookalike post screenshots.
- Local Python/Piper/FFmpeg/Whisper: installed in previous work. Can synthesize/render/decode/transcribe, but user did not accept the earlier voice. ASR is not a listening review. Keep actual voice selection unresolved rather than claiming a tool installation fixed it.
- ImageGen: available for illustration, not selected for reproducing actual screenshots/text. No image/video generation service was called.

## Added: official Remotion skills and local runtime

Official documentation https://www.remotion.dev/docs/ai/skills confirms these skills are maintained for coding agents including Codex. Installed with the system Skill Installer helper from remotion-dev/skills:

1. remotion-best-practices — routes relevant guidance.
2. remotion-create — future project/composition setup.
3. remotion-markup — image layout, frame-based animation, text, media and timing.
4. remotion-captions — time-coded Caption JSON and caption display.
5. remotion-multimedia — inspect duration/dimensions using Mediabunny.
6. remotion-render — output files/stills when authorized.
7. remotion-studio — interactive preview.
8. remotion-docs — current API lookup.

Installed paths and local SHA256s are in remotion-install-receipt-v1.json; eight SKILL.md entrypoints matched upstream commit 1441a11e95db35443bd76bb318386c0d3ca00053 when checked. Standard skill discovery is on the next user turn; selected files were manually read and applied in this audit, so do not claim all eight workflows were executed.

Runtime outside Git: /home/bss-group/.cache/creator-agency/remotion-runtime . npm installed remotion, @remotion/cli and @remotion/captions 4.0.536, mediabunny 1.61.5. `remotion versions` exited0 and confirmed package versions match. No Remotion composition, Studio browser session or rendering smoke was run yet. npm emitted an esbuild postinstall-policy warning; did not globally relax script policy. Import/probe/versions tests ran successfully; actual bundling/rendering remains to verify.

Applied now, not merely installed:
- Mediabunny FilePathSource read the previous MP4: 65.833s,1080×1920.
- Remotion interpolate timing check returned0.5 at frame15 in0–30.
- Converted previous measured beat times to Caption-shaped JSON and verified12 positive ordered intervals. Not word-level alignment or a new content script.
- Read markup and voiceover guidance: drive animation by frames, derive scene duration from measured audio, and keep media/source text actual. The voiceover guide defaults to ElevenLabs; user cost constraint takes precedence, so no key request or provider call was made.

License evaluated from https://raw.githubusercontent.com/remotion-dev/remotion/main/LICENSE.md : free license includes individuals, organizations up to3 employees, non-profits and evaluation not yet used commercially. This is a private evaluation. Future commercial deployment must remain within eligibility; no company license purchased. Skill instructions and runtime capability are separate.

## Plugin catalog research

Searched capability/provider terms “video editing text to speech”, “ElevenLabs”, “CapCut video editing”, “Remotion”. Search results establish what this catalog returned, not all services in existence.

- Adobe: catalog reports available but not installed. Description includes image cropping/resizing and video reframing/stitching; optional Adobe app dependency was inspected. Suggested this one plugin as an optional addition. Suggestion is NOT installation/connection. User needs to install/authorize it in the app before its tools can be used. Do not repeat the old blocker if later confirmed connected. No Adobe tool operation or upload occurred. Remotion/browser work is independent of this connection.
- Runway, Higgsfield, HeyGen: discovered generative-media alternatives requiring service/account/quota verification; not selected or connected for this screenshot-comment sample. They do not remove the need for choosing good source material.
- vidIQ: found for competitor/format analysis; earlier suggestion history exists. No duplicate suggestion or connection. Not needed for the tiny prototype.
- No exact ElevenLabs, Remotion or CapCut plugin match in those provider searches. Do not claim platform-wide nonexistence.

ElevenLabs official policy https://help.elevenlabs.io/hc/en-us/articles/13313564601361-Can-I-publish-the-content-I-generate-on-the-platform says free-plan audio has no commercial license and paid subscriptions include commercial rights subject to terms. Did not add a paid voice dependency or treat “free to try” as a sustainable monetized-channel solution. A better Vietnamese voice within the no-added-spend constraint is still unverified.

## Portable setup notes

The full repository remains the project distribution unit; installed skills and runtime cache are external dependencies with receipts. To restore on another host, run the system skill installer against remotion-dev/skills with `--ref 1441a11e95db35443bd76bb318386c0d3ca00053` and the eight skills/<name> paths listed above. Do not overwrite existing installed skills blindly; inspect versions first. Install exact runtime package versions into a dedicated cache/venv-equivalent Node directory, not system-wide. No credentials, session databases, raw screenshots or models added to Git.

## Practical next use for the already requested prototype

Target10–20s remains the user's scope. Prefer actual selected post capture → one strong comment/image such as Full HP → brief original connective narration; choose fewer beats to preserve timing. Use Remotion for precise reveal/zoom and preview, Caption JSON for measured text timing, Mediabunny/FFmpeg for technical checks, and existing creator roles for selection/source/QA. No new video has been rendered in this audit and no new voice is represented as accepted. Tooling readiness does not establish creative quality or asset rights; those must be checked on the exact small prototype.
