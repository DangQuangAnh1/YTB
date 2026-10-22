#!/usr/bin/env bash
# Build The Final Counter v2 (VS intro + anime impact, 16 s). Usage: build.sh smoke|full
# Environment: P2_OUT (output folder, default ~/p2-out/final-counter-v2), CONC (render workers),
# GL (angle default, swangle forces software), CHROME (browser path), PYTHON (interpreter with numpy, pillow, imageio-ffmpeg),
# SFX_SET=kenney (optional CC0 sample layer).
# Output goes outside the repo by default so registered P-2 artifacts are never overwritten.
set -eu
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(cd "$HERE/../../../.." && pwd)"; cd "$ROOT"
MODE="${1:-smoke}"
export P2_OUT="${P2_OUT:-$HOME/p2-out/final-counter-v2}"
mkdir -p "$P2_OUT"
PY="${PYTHON:-}"
if [ -z "$PY" ]; then for c in "$ROOT/.venv/bin/python" "$ROOT/.venv/Scripts/python.exe"; do [ -x "$c" ] && { PY="$c"; break; }; done; fi
[ -n "$PY" ] || PY=python3
CPUS="$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)"
export CONC="${CONC:-$(( CPUS > 1 ? CPUS - 1 : 1 ))}"
B=projects/P-2/production/final-counter-v2
case "$MODE" in
  smoke) export FRAMES=0-59; export EXPECT_FRAMES=60 ;;
  full)  unset FRAMES || true; export EXPECT_FRAMES=960 ;;
  *) echo "usage: $0 smoke|full" >&2; exit 2 ;;
esac
echo "output: $P2_OUT   workers: $CONC   gl: ${GL:-angle}"
node $B/check.cjs >/dev/null && echo "check ok (finite outlines, reverse-seek determinism)"
node $B/render.cjs
"$PY" $B/audio.py
"$PY" $B/finalize.py >/dev/null
echo "done: $P2_OUT/final-counter.mp4"
