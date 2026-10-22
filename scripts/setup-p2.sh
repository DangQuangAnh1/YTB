#!/usr/bin/env bash
# One-time setup of the P-2 stickman video pipeline on a new Linux or macOS machine.
# Installs the Remotion runtime from the committed lock file, builds the Perfect Freehand stroke bundle,
# creates a Python venv and runs a smoke build. Safe to re-run.
set -eu
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
say(){ printf '\n== %s\n' "$*"; }
need(){ command -v "$1" >/dev/null 2>&1 || { echo "Missing $1: $2" >&2; exit 1; }; }
need git "install git"
need node "install Node.js 20 or newer from https://nodejs.org (or use nvm)"
need npm "npm comes with Node.js"
need python3 "install Python 3.10 or newer"
[ "$(node -p "process.versions.node.split('.')[0]")" -ge 18 ] || { echo "Node 18+ required, found $(node --version)" >&2; exit 1; }

say "1/5 Remotion runtime (about 1.4 GB, first run downloads from npm)"
R=third_party/video/runtime/p2-remotion
mkdir -p "$R"
cp third_party/video/manifests/p2-remotion/package.json third_party/video/manifests/p2-remotion/package-lock.json "$R"/
( cd "$R" && npm ci --no-audit --no-fund )

say "2/5 Perfect Freehand stroke library (MIT, pinned)"
S=third_party/video/sources/perfect-freehand
SHA=176e00f2399f4969e1b0965c5921d96a3e50ce9f
if [ ! -d "$S/.git" ]; then
  mkdir -p third_party/video/sources
  git clone --depth 1 -q https://github.com/steveruizok/perfect-freehand.git "$S"
fi
git -C "$S" fetch --depth 1 -q origin "$SHA" 2>/dev/null || true
git -C "$S" checkout -q --detach "$SHA"
node projects/P-2/production/soft-line-motion-v1/prepare.cjs

say "3/5 Python environment (numpy, pillow, imageio-ffmpeg)"
if [ -z "${PYTHON:-}" ]; then
  if [ ! -x .venv/bin/python ]; then
    if python3 -m venv .venv >/dev/null 2>&1; then :
    elif command -v uv >/dev/null 2>&1; then rm -rf .venv; uv venv -q .venv
    else
      rm -rf .venv
      echo "Cannot create a virtualenv. On Debian/Ubuntu run: sudo apt install python3-venv (then rerun)," >&2
      echo "or set PYTHON=/path/to/python that already has numpy, pillow and imageio-ffmpeg." >&2
      exit 1
    fi
  fi
  if [ -x .venv/bin/pip ]; then .venv/bin/pip install -q --disable-pip-version-check numpy pillow imageio-ffmpeg
  else uv pip install -q --python .venv/bin/python numpy pillow imageio-ffmpeg; fi
  export PYTHON="$ROOT/.venv/bin/python"
else
  "$PYTHON" -c "import numpy, PIL, imageio_ffmpeg" || { echo "PYTHON=$PYTHON lacks numpy, pillow or imageio-ffmpeg" >&2; exit 1; }
fi

say "4/5 Browser for Remotion"
if [ -n "${CHROME:-}" ] || command -v google-chrome >/dev/null 2>&1 || command -v chromium >/dev/null 2>&1 || command -v chromium-browser >/dev/null 2>&1 || [ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ]; then
  echo "System Chrome or Chromium found. If Remotion cannot find it, export CHROME=/path/to/chrome."
else
  ( cd "$R" && npx remotion browser ensure )
fi

say "5/5 Smoke build (60 frames, takes about a minute)"
projects/P-2/production/final-counter-v1/build.sh smoke
echo
echo "Setup finished. Full video: projects/P-2/production/final-counter-v1/build.sh full"
