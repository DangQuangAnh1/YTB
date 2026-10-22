#!/bin/sh
# Converts a selected subset of the CC0 Kenney Impact Sounds pack (third_party/video/sources/kenney-impact-sounds/pack/Audio) to 48 kHz mono WAV in sfx/.
cd "$(dirname "$0")/../../../.." || exit 1
FF="${FFMPEG:-ffmpeg}"
A=third_party/video/sources/kenney-impact-sounds/pack/Audio
O=projects/P-2/production/final-counter-v1/sfx
while read out src; do "$FF" -y -v error -i "$A/$src.ogg" -ar 48000 -ac 1 -c:a pcm_s16le "$O/$out.wav"; done <<LIST
punch_medium impactPunch_medium_001
punch_heavy impactPunch_heavy_003
metal_medium impactMetal_medium_001
metal_heavy impactMetal_heavy_002
soft_heavy impactSoft_heavy_001
step footstep_concrete_002
LIST
