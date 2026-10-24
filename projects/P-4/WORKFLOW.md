# Daily workflow

1. Ask for the day's prompt with the desired subject, series (A–D), mood, and
   any constraints. Before writing it, check `PALETTE-LOG.md`: every new video
   needs a different dominant/accent palette and lighting temperature from the
   recent videos. The delivered prompt is one polished English paragraph,
   with no line breaks or list formatting. It must map the grey-scene
   surroundings to matching final-world details, not transform only the main
   subject. A prompt is saved as
   `daily-prompts/YYYY-MM-DD-slug.md`.
2. Create the video yourself from that prompt and save it under
   `media/source-video/` using the same `YYYY-MM-DD-slug` prefix.
3. Put the licensed 15-second music file in `media/music-15s/`, using the same
   prefix when it is dedicated to that video. Keep its licence/source note in
   the daily prompt file. Follow `MUSIC-PREFERENCES.md`: cinematic electronic
   with female vocals is the default preference.
4. Tell Codex the video and music filenames. Codex will verify duration and
   container compatibility, then mux the selected audio into the video and
   write the result to `media/output/`.

## Naming example

`2026-10-23-cosmic-cube.mp4`

`2026-10-23-cosmic-cube.wav`

The music must be licensed for the intended Facebook, TikTok and YouTube use.
Do not place unlicensed music or finished media in Git.

## Current capability

This workspace does not currently expose an FFmpeg executable. Once a video
and music file are available, Codex will use an available compatible media
tool or ask before installing FFmpeg if it is required.
