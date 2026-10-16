# Dialogue and reaction-video tooling research — 2026-10-16

Decision: how to support the user's new format correction for P-1, retaining original Threads screenshot sources, selected Thiện Minh voice and zero added provider spend.

## Primary-source checks

1. PurffleShorts: https://github.com/Chamanrajragu/purffle-shorts . README documents chat/dialogue formats, speaker-specific voices, and timed message appearance. Direct inspection of purffle_shorts/tts.py found synthesize_lines creates audio per speaker/line and joins it with line timing offsets and a short gap. This is a useful reference for dialogue timing. Its generated chat UI and fictional-script defaults do not meet P-1's original-screenshot requirement unchanged. No local install/demo or Vietnamese quality validation performed. README search found no meme feature; automatic contextually appropriate meme insertion is unverified, not claimed absent from all code. Sources: README.md and https://github.com/Chamanrajragu/purffle-shorts/blob/main/purffle_shorts/tts.py .

2. MoneyPrinterTurbo: https://github.com/harry0703/MoneyPrinterTurbo/blob/main/README-en.md . Documents custom scripts, local visual assets, uploaded audio, subtitle styling and configurable clip durations. Useful as a reference for the assembly pipeline. The documentation reviewed does not establish full-chat screenshot reading or comedy-specific reaction selection. No local deployment or cost-free end-to-end run verified. Do not enable its publication/provider integrations under P-1 scope.

3. NarratoAI: https://github.com/linyqh/NarratoAI/blob/main/README-en.md . Primarily film/video commentary, editing, voiceover and subtitles; documents Jianying draft export. Source-footage commentary is less directly aligned with screenshot dialogue. Not installed/tested; no claim that its commentary pipeline solves comic delivery or meme timing.

4. ShortGPT: https://github.com/RayVentura/ShortGPT . Describes automated editing, sourcing, voiceover and captions. Lower-priority general framework reference; not a verified full-chat/meme solution. No local install or behavior evaluation.

5. Existing VieNeu: https://github.com/pnnbao97/VieNeu-TTS . Current upstream documentation states style is deprecated and ignored in v3 Turbo. It documents experimental inline emotion cues such as laughter/sighs. Such cues have not been auditioned in P-1; humorous Vietnamese delivery cannot be promised from a style argument. Retain Thiện Minh and audition actual line delivery before full render. No custom voice cloning.

## Recommendation / inference

PurffleShorts is the closest reference for sentence/speaker timing among these candidates. Retain the already working Remotion renderer and original screenshots, and adapt the useful line-timing approach rather than installing all frameworks. This is a fit assessment from inspected docs/code, not proof that an integrated result works locally.

Needed content contract: exact source line, speaker, spoken normalization, screenshot region, audio duration, pre/post pause, comic beat, optional reaction asset, reaction duration and asset provenance. Reveal/highlight should follow speech without fabricating a new source chat.

Needed meme layer: a small curated local library tagged by reaction (deadpan, disbelief, sudden confidence), with source/usage evidence. Select by beat meaning and audition the cut; do not treat a health bar alone as satisfying the user's meme request. Do not download arbitrary copyrighted reaction packs or assume repository software licenses clear included media.

Small test: one setup/punchline read directly from the screenshot with the selected voice, plus one justified short reaction insert. Evaluate voice performance and comedic timing before producing a full replacement. Do not force the old summary script into this format.

## Access limits

Browsed current upstream docs; inspected timing code read-only. No external repository installed, no third-party API calls, no paid resources used, no competitor playback newly verified. Meme automation and expressive delivery remain unverified. Research findings are not new authority.
