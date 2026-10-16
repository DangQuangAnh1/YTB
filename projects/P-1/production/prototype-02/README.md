# P-1 prototype 02
Remotion 4.0.536, 1080×1920, 30fps, 540 frames. Private evaluation only.
Run npm install, then npm run dev -- --no-open. Open the printed Studio URL and ThreadsShort composition.
Raw images and generated WAV live in ../../media/prototype-02 (ignored, linked as public/). They must be restored from the user's authorized sources on another host; not included in Git.
Render a NEW output version: ./node_modules/.bin/remotion render src/index.ts ThreadsShort ../../artifacts/render/NEW-VERSION/draft.mp4 --codec=h264 --crf=20 --concurrency=2
Never overwrite registered artifacts. Python helpers require the existing local Piper/Pillow/av/faster-whisper runtime; model/cache paths currently reflect this host. Build-audio is a provenance helper, not a workflow authorization. Do not run it over registered script files.
Actual successful v1 output checks are in ../../artifacts/render/prototype-02-v1. No public distribution rights asserted. Voice human acceptance pending.
