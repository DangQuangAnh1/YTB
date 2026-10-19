# Mood presets, meme, SFX and music sources — research 2026-10-17

This answers the user's questions in tasks/user-feedback-mood-v1.md: how to split videos by mood, which music to use, how to add comic sounds and memes, and which repos to take memes from. The research was delegated and read-only, using READMEs, terms pages and license pages. **V** marks a claim verified on the primary page; **I** marks an inference.

## Key findings

- **Tenor is closed.** The Tenor API stopped accepting new clients in January 2026 (V, Google dev page) and shut down on 2026-06-30 (secondary source).
- **GIPHY doesn't fit.** The GIPHY API requires "Powered by GIPHY" and forbids storing copies without approval (V). Baking a GIF into an MP4 counts as storing it (I).
- **Imgflip gives templates, not rights.** Templates are user-uploaded and the terms grant no rights (V). Most reaction memes are copyrighted film or TV stills.
- **No repo licenses meme images.** jacebrowning/memegen (MIT code) ships template images with no license (V). No Vietnamese meme-template repo turned up.
- **Freesound API commercial use is case by case** (V). Hand-curate CC0 sounds into a local library before monetizing.

## Reactions that can be used commercially

| Source | License | Use |
|---|---|---|
| microsoft/fluentui-emoji-animated | MIT (V) | Animated APNG at 256px; Remotion `<AnimatedImage>`. **Used in v2.** |
| microsoft/fluentui-emoji | MIT (V) | Static |
| Noto Animated Emoji | CC BY 4.0 (secondary source) | Lottie, credit required |
| LottieFiles | Lottie Simple License, commercial OK (V) | `@remotion/lottie`; check each file |
| Self-made mascot sticker pack | Owned | Best long-term option for channel identity (I) |

Classic memes such as Monkey Puppet and Confused Nick Young are for private demos only until the rights are settled. Their view is fair use plus a Content ID risk (I).

## Selecting the mood and the reaction

- **Mood:** the Content role sets `mood` per video when writing the script, and the user can override it. A local cross-check is possible with MoritzLaurer/mDeBERTa-v3-base-mnli-xnli, zero-shot (MIT, XNLI-vi 0.740) (V). It is not installed.
- **Reaction:** a small tagged library (tags in Vietnamese) is enough. For larger libraries: meme-search (Apache-2.0) and osmarks/meme-search-engine (MIT) (V).

## Music by mood

| Source | Commercial use |
|---|---|
| ACE-Step 1.5 (local AI music) | MIT; the model card says outputs are usable commercially; runs in under 4 GB VRAM (V) |
| Incompetech / Kevin MacLeod | CC BY 4.0; monetized YouTube use is OK with credit (V) |
| YouTube Audio Library | Monetizable on YouTube, no Content ID claims; TikTok not covered (V) |
| Openverse / ccMixter / FMA | License varies per track; ccMixter has a tag API (V) |
| Pixabay Music | Commercial OK, but has no API and Content ID claims can occur (V / secondary source) |
| MusicGen | **Not usable**: weights are CC-BY-NC (V) |

## SFX

- Usable: Kenney audio packs (Impact Sounds is CC0 (V)) and Freesound CC0 sounds downloaded by hand.
- Avoid: BBC Sound Effects (non-commercial) and the usual meme soundboard "vine boom / bruh" sounds (unclear origin).

## Existing generators

None of the existing generators combines mood presets with a meme on each punchline:
- MoneyPrinterTurbo picks music at random (V).
- ShortGPT and RedditVideoMakerBot have no mood music (V).
- GoldLegendW80/llm-video-maker vendors CC0 SFX and music locally together with their licenses (V). That license-tracking pattern is worth copying; its imgflip memes are not.

## Applied in prototype-06 v2

- **Presets:** production/prototype-06/mood-presets.json holds hai, buon, drama and am_ap. Each preset sets the music gains (under voice, between lines, under SFX), the allowed SFX set, reaction on/off with a maximum count and a minimum gap, the accent colour, the card spring and the background tint.
- **Enforcement:** build-timeline.mjs refuses disallowed SFX, refuses reactions where the mood disables them, and refuses reactions that are too many or too close together.
- **Music:** the hai preset uses the current CC0 track. Candidate tracks for buon, drama and am_ap were found but not downloaded.
