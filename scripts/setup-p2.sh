#!/usr/bin/env bash
# One-time setup of the P-2 stickman video pipeline on a new Linux or macOS machine, or Windows with Git Bash.
# Installs the Remotion runtime from the committed lock file, builds the Perfect Freehand stroke bundle,
# creates a Python venv and runs a smoke build. Safe to re-run.
# REMOTION_NODE_MODULES=/path/to/node_modules links an existing install with the same Remotion version instead of npm ci.
set -eu
if [ -n "${REMOTION_NODE_MODULES:-}" ]; then REMOTION_NODE_MODULES="$(cd "$REMOTION_NODE_MODULES" && pwd)"; fi
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"
say(){ printf '\n== %s\n' "$*"; }
need(){ command -v "$1" >/dev/null 2>&1 || { echo "Missing $1: $2" >&2; exit 1; }; }
need git "install git"
need node "install Node.js 20 or newer from https://nodejs.org (or use nvm)"
need npm "npm comes with Node.js"
# On Windows python3 can be the Microsoft Store alias, which exists but does not run.
PY3=""
for c in python3 python "py -3"; do if $c -c 'import sys; assert sys.version_info >= (3, 10)' >/dev/null 2>&1; then PY3="$c"; break; fi; done
[ -n "$PY3" ] || [ -n "${PYTHON:-}" ] || { echo "Missing Python 3.10 or newer" >&2; exit 1; }
[ "$(node -p "process.versions.node.split('.')[0]")" -ge 18 ] || { echo "Node 18+ required, found $(node --version)" >&2; exit 1; }

say "1/5 Remotion runtime (about 1.4 GB, first run downloads from npm)"
R=third_party/video/runtime/p2-remotion
WANT="$(node -p "require('./third_party/video/manifests/p2-remotion/package-lock.json').packages['node_modules/remotion'].version")"
mkdir -p "$R"
cp third_party/video/manifests/p2-remotion/package.json third_party/video/manifests/p2-remotion/package-lock.json "$R"/
if [ ! -e "$R/node_modules" ] && [ -n "${REMOTION_NODE_MODULES:-}" ]; then
  HAVE="$(node -p "require(require('path').resolve(process.argv[1],'remotion/package.json')).version" "$REMOTION_NODE_MODULES")"
  [ "$HAVE" = "$WANT" ] || { echo "REMOTION_NODE_MODULES has remotion $HAVE, lock file wants $WANT" >&2; exit 1; }
  # Git Bash on Windows: a junction needs no admin rights; MSYS_NO_PATHCONV keeps /J from being rewritten as a path.
  if command -v cygpath >/dev/null 2>&1; then MSYS_NO_PATHCONV=1 cmd /c mklink /J "$(cygpath -wa "$R/node_modules")" "$(cygpath -wa "$REMOTION_NODE_MODULES")" >/dev/null
  else ln -s "$REMOTION_NODE_MODULES" "$R/node_modules"; fi
fi
HAVE="$(node -p "try{require('./$R/node_modules/remotion/package.json').version}catch(e){''}")"
if [ "$HAVE" = "$WANT" ]; then echo "Remotion $HAVE already installed, skipping npm ci (npm ci would wipe a linked node_modules)"
else ( cd "$R" && npm ci --no-audit --no-fund ); fi

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
  VB=.venv/bin; [ -d .venv/Scripts ] && VB=.venv/Scripts
  if [ ! -x $VB/python ] && [ ! -x $VB/python.exe ]; then
    if $PY3 -m venv .venv >/dev/null 2>&1; then :
    elif command -v uv >/dev/null 2>&1; then rm -rf .venv; uv venv -q .venv
    else
      rm -rf .venv
      echo "Cannot create a virtualenv. On Debian/Ubuntu run: sudo apt install python3-venv (then rerun)," >&2
      echo "or set PYTHON=/path/to/python that already has numpy, pillow and imageio-ffmpeg." >&2
      exit 1
    fi
  fi
  VB=.venv/bin; [ -d .venv/Scripts ] && VB=.venv/Scripts
  VPY=$VB/python; [ -x $VPY ] || VPY=$VB/python.exe
  if "$VPY" -m pip --version >/dev/null 2>&1; then "$VPY" -m pip install -q --disable-pip-version-check numpy pillow imageio-ffmpeg
  else uv pip install -q --python "$VPY" numpy pillow imageio-ffmpeg; fi
  export PYTHON="$ROOT/$VPY"
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
