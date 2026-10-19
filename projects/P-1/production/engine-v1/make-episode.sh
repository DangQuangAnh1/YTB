#!/usr/bin/env bash
# One episode end to end (2026-10-19 speed-up): lint the script, voice it (adaptive takes), then make-release.
# Usage: make-episode.sh <episode_id> <render_dir_name>
set -euo pipefail
cd "$(dirname "$0")"
EP=$1; OUT=$2; VP="C:/Users/vanth/.cache/creator-agency/vieneu-win/Scripts/python.exe"
node lint-episode.mjs ../episodes/$EP | tail -20
PYTHONIOENCODING=utf-8 "$VP" generate-audio.py ../episodes/$EP 2>&1 | grep '^{' | cut -c1-60
bash make-release.sh $EP $OUT
