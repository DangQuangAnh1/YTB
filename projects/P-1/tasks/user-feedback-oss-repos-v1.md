# User preference: use existing open-source repos — 2026-10-17

Direct user words: “okie, hãy ưu tiên dùng các repo trên mạng, thật sự có rất nhiều repo hỗ trợ chúng ta”. This came after the agent proposed whisper.cpp in place of a hand-made syllable-timing fallback. Earlier the user had said “có repo git nào thay thế ko, nếu ko tôi cài cho”.

## Applied

whisper.cpp v1.7.6 is installed as the Windows release binary, together with the multilingual `small` model (488 MB). The install went through the `@remotion/install-whisper-cpp@4.0.536` helper and lives in production/tools-whisper, which Git ignores.

- The Windows release zip extracts to `Release/`, but Remotion expects `build/bin/`. The folder was moved to fix this.
- A test on the existing clip media/prototype-05/intro.wav heard 10 of 10 words with plausible timings.
- Two words were misheard (đoạn → “đoảng”, chat → “chắc”). Captions take only the timing from whisper and keep the exact script words.

## Still pending

The prototype-06 selection sheet (A-061, artifacts/content/prototype-06-selection-v1.md) has not been explicitly approved. The user's “okie” here answered the tooling question. Voicing waits for the selection decision.

Project-local lesson: when there is a pipeline gap, check maintained GitHub repos and packages first, then write only glue code.
