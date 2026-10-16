# Source-card refinement

Private local render under plan v4. Timeline/cut groups are in artifacts/content/prototype-05-script-v1.json. Real source-card inputs are media/prototype-05/post-source-v2.png and comment-source-v2.png; earlier capture trials are excluded. Each cropped idea repeats the actual username/avatar row, then displays the relevant source-message band without rewriting its words.

Runtime: Remotion4.0.536 reused through an ignored Windows junction to prototype-03/node_modules; local VieNeu3.8.3 selected Thiện Minh preset. Fresh setup can install the same prototype-03 package-lock dependencies. generate-audio.py only creates the new intro/bridge and refuses overwrite; existing valid seven dialogue utterances are copied to new media inputs and timed independently.

Music: original92BPM instrumental loop synthesized locally from decaying sine harmonics, soft bass and seeded noise percussion, with entry/exit fades. React Audio gain0.27 during speech,0.43 between speech; reaction sting gain0.65. The reference soundtrack was not sampled or identified. No claim that musical taste/voice naturalness was checked by listening.

Render entry src/index.tsx, composition SourceCards, public directory ../../media/prototype-05, versioned output artifacts/render/prototype-05-v1/draft.mp4. verify-export.py uses Remotion ffprobe and imageio-ffmpeg for full decode, stream metadata, PCM metrics and sampled frames. Human listening/creative acceptance remains separate. Media, screenshots and node_modules are excluded from Git.
