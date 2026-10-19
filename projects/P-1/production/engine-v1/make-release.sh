#!/usr/bin/env bash
# Full release build for one episode: timeline → render → verify → intelligibility → loudness master → phone copy → MP3.
# Usage: make-release.sh <episode_id> <render_dir_name>      (CONC=<n> sets Remotion's render concurrency, default 6)
# 2026-10-19 speed-up: the mix intelligibility check runs in parallel with mastering and the phone copy.
set -euo pipefail
cd "$(dirname "$0")"
EP=$1; OUT=$2; R=../../artifacts/render; VP="C:/Users/vanth/.cache/creator-agency/vieneu-win/Scripts/python.exe"
node build-timeline.mjs ../episodes/$EP | tail -1 | cut -c1-220
mkdir -p $R/$OUT
npx remotion render src/index.tsx Episode $R/$OUT/draft.mp4 --props=../episodes/$EP/props.json --public-dir=../../media \
  --codec=h264 --crf=18 --concurrency=${CONC:-6} --overwrite --log=error 2>&1 | grep -iv videoframe | tail -2 || true
D=$(node -e "console.log(require('../episodes/$EP/props.json').duration)")
F=$(node -e "const p=require('../episodes/$EP/props.json');const n=Math.floor(p.duration*30);console.log([15,90,240,420,600,780,960,1140,n-150,n-90,n-20].filter(x=>x>0&&x<n).join(','))")
"$VP" verify-export.py $OUT $D $F 2>&1 | grep -E "exit|peak|sha" || true
(node mix-intelligibility.mjs $R/$OUT/draft.mp4 ../episodes/$EP/props.json $R/$OUT/mix-intelligibility.json 2>/dev/null | tail -1 | cut -c1-120) &
MIX=$!
"$VP" master-audio.py $OUT
"$VP" phone-copy.py $OUT
wait $MIX
"$VP" -c "import subprocess, imageio_ffmpeg; subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-y','-v','error','-i','$R/$OUT/final.mp4','-vn','-c:a','libmp3lame','-b:a','192k','$R/$OUT/audio-check.mp3'],check=True)"
cp ../episodes/$EP/props.json $R/$OUT/props.json
echo "done $OUT"
