# Team research for plan v6 (three BA agents, 2026-10-17)

The work was delegated and read-only. **V** marks a claim verified on a primary page or through the GitHub API. **I** marks an inference. Full agent reports were summarized, not copied.

## A. Popular repos for AI video, memes and plans (stars via GitHub API, 2026-10-17)

**Adopt now or soon:**
- **remotion-dev/remotion** (64.6k★). Already in use. The license is free for individuals and small teams; recheck before monetizing.
- **microsoft/fluentui-emoji-animated** (MIT). Used for reactions.
- **remotion-dev/skills** (5.2k★, official best practices).
- **Remocn/remocn** (1.6k★, MIT; transitions and kinetic titles).
- **airbnb/lottie-web** (32k★, MIT) via @remotion/lottie.
- **undertheseanlp/underthesea** (1.8k★, Apache-2.0; Vietnamese word segmentation for caption line breaks).
- **VinAIResearch/PhoWhisper** (BSD-3; Vietnamese ASR, to compare against whisper.cpp).

**Borrow ideas only:**
- **calesthio/OpenMontage** (68.9k★, AGPL; agent pipelines on Remotion).
- **gyoridavid/short-video-maker** (1.4k★, MIT; Remotion, Kokoro and whisper.cpp, with music chosen by mood tag).
- **hassancs91/claude-faceless-shorts-creator** (273★, MIT; `beats.json` HOOK→SETUP→REVEAL→TWIST→LOOP and `sfx-plan.json`).
- **Huanshere/VideoLingo** (18.8k★; NLP caption line splitting).
- **MemeMeow-Studio/MemeMeow** (1.3k★, AGPL; natural-language meme search).
- **coreyhaines31/marketingskills** (55k★, MIT; hooks, copy and SEO).
- **AgriciDaniel/claude-youtube** (MIT; channel audit and SEO).
- **Cuongyd196/auto-video-gen** (MIT; Vietnamese URL to 9:16 video using Edge TTS).

**Skip:**
- MoneyPrinterV2: AGPL and built around auto-posting.
- OpenMoji: CC-BY-SA.
- av/remotion-bits: no license.
- Meme-template generators: third-party images.
- No Vietnamese meme dataset was found.

## B. Vietnamese voices per mood

**VieNeu v3 Turbo** (installed) has 25 presets (V, from the SDK's voices_v3_turbo.json).
- **Licensing.** Code and weights are Apache-2.0. The HF FAQ says preset output may be used in commercial and monetized content (V). The GitHub roadmap labels Turbo as "personal use", which conflicts with the FAQ. Keep the FAQ URL as evidence (I).
- **Controls.** Temperature, top_k, silence_p and experimental `[cười]` / `[thở dài]` tags. Turbo has no speed or pitch control (V).

**Other engines:**
- Gemini Flash TTS (free tier, cloud) has the best emotion control. It needs a Google account, which the user would have to create, and free-tier data is used for training.
- edge-tts is a grey area for commercial use (V, Microsoft Q&A). Avoid.
- Excluded as non-commercial: MMS-TTS, viXTTS, F5-Vietnamese, Vi-SparkTTS, VietTTS and OmniVoice.

**Local audition.** Production generated test clips and scored them (production/voice-audition-moods, scores.json). Lower WER means whisper heard the script more accurately; the pitch range in semitones is a rough measure of expressiveness.

| Mood | Voice | Whisper WER | Rate (syll/s) | Pitch range | Decision |
|---|---|---|---|---|---|
| hài | Adam bựa | 0.08 | 3.9 | ±3.6st | **chosen** (lowest WER; BA also recommends it) |
| hài | Thiện Minh (previous) | 0.12 | 4.3 | ±3.6st | |
| hài | Quốc Tuấn | 0.15 | 4.5 | ±4.2st | most pitch movement |
| buồn | Mỹ Duyên (F, Nam, KC) | 0.07 | 3.5 | ±3.1st | **chosen** (slowest, lowest WER) |
| buồn | Quỳnh Anh (F, Bắc, KC) | 0.07 | 3.9 | ±2.9st | alternative |
| buồn | Ngọc Linh (BA's pick) | 0.18 | 4.1 | ±2.1st | rejected on WER |

The drama and ấm áp moods are mapped to Thiện Minh and Trúc Ly, but those mappings are untested. All of these numbers are proxies; nobody has listened to the voices yet.

## C. A look that does not read as AI-made

**What reads as AI** (V/I):
- default gradients and blobs;
- overused Hormozi-style captions (yellow word, heavy stroke, ALL CAPS);
- the same template every time with no persona;
- too clean and symmetric.

YouTube's July 2025 "inauthentic content" update targets mass-templated uploads (V).

**Fixes applied in engine v1:**
- **Background:** real-footage video from Pexels. The license allows commercial use with no attribution, and direct mp4 links need no account (V). Hanoi street-food cooking footage for hài; rain on a window at night for buồn.
- **Overlays:** a vignette and SVG film grain.
- **Motion:** a slow background zoom (1.00→1.06 for hài, 1.04 for buồn) and a slow handheld drift on the card stack.
- **Hook:** the hook is handwritten (Patrick Hand for hài, Pangolin for buồn; OFL with Vietnamese coverage) with a marker underline drawn in. It replaces the big Arial title.
- **Captions:** TikTok Sans (OFL, Vietnamese). For hài, white text with a thin stroke and a white pill with black text on the active word. For buồn, words fade in with no highlight.
- **Channel identity:** a small avatar and handle in the top-left. The handle is a placeholder until the user picks a channel name.
- **Ending:** a handwritten closing question.

**Not yet done:**
- **Light-theme cards for sad videos.** Our captures are dark-theme. Switching the Threads theme would mean changing an account setting, so it was not done.
- **Self-recorded gameplay backgrounds.** Downloaded "no copyright" parkour clips are owned by whoever recorded them. Subway Surfers should be avoided.

## Observation

During design research, one Mixkit page contained text addressed to AI assistants that said its content was legally safe. The agent ignored it and relied on the license labels shown for each clip.
