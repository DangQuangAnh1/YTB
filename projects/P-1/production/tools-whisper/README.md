# whisper.cpp word timing (P-1)

Setup: `npm install`, then `node install.mjs 1.7.6`. On Windows, move `whisper.cpp/Release` to `whisper.cpp/build/bin`, which is where Remotion's `transcribe` looks.

Usage: `node align.mjs <clip.wav> "<exact script text>" <out.json> <ffmpeg.exe>`.

The clip is converted to 16 kHz mono and transcribed with the `small` model, language `vi`, with token timestamps. Whisper's word timings are then mapped proportionally onto the exact script words, so captions never show misheard spelling. The output feeds `@remotion/captions` `createTikTokStyleCaptions`.

Binary, model and node_modules are not in Git.
