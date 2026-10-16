# Private chat performance demo

Uses the previously verified Remotion 4.0.536 installation from prototype-03. On this Windows checkout, node_modules is an ignored directory junction to that installation. A fresh checkout can install the same package.json dependencies locally instead. Do not commit the junction, dependencies, source images or generated audio/video.

Voice runtime: C:/Users/vanth/.cache/creator-agency/vieneu-win/Scripts/python.exe, VieNeu 3.8.3, built-in Thiện Minh preset only. generate-audio.py refuses to overwrite utterance WAVs. Timeline is saved in artifacts/content/prototype-04-script-v1.json; do not overwrite that registered script on a retry.

Render: run the local Remotion CLI with entry src/index.tsx, composition ChatDemo, public directory ../../media/prototype-04 and a new versioned output path. verify-export.py verifies this version's file using ffprobe from Remotion and full ffmpeg from imageio-ffmpeg. It does not establish listening or creative acceptance.

Dialogue timing follows the approach described in research/chat-video-repos-v1.md; no external AI framework or publishing integration installed. Reaction images are sourced in the manifest; public-use clearance remains unresolved. Audio stings are synthesized locally. Prototype is private only.
