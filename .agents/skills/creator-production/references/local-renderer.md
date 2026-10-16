# Local queue renderer

Core helpers use standard-library Python. Rendering optionally needs Pillow and imageio-ffmpeg: `python3 -m venv .venv`, then `.venv/bin/python -m pip install -r requirements-render.txt`. If ensurepip is missing, create a clean `--without-pip` venv and use an existing trusted pip runner with `--python .venv/bin/python`. Do not mix partial venv interpreters or modify the host bundled runtime.

This adapter draws a 640x360 queue at 24fps with scene captions and moving tokens. See examples/queue-script.json and contracts/render-script.schema.json. It does not synthesize narration or arbitrary imagery.

Save/register the script under the project after plan authorization. Run `.venv/bin/python scripts/render_queue.py P-n --script-id A-001 --expected-revision N` using actual IDs/revision. Optional `--audio-id` must be registered audio; otherwise output is silent.

The renderer checks scope, holds a local writer lock, uses unique output paths, decodes the result and records manifest/hashes/lineage. It does not mark QA passed. Inspect actual frames/video and audio as the brief requires. A silent technical demonstration is not a narrated final video; missing listening checks remain unverified. Failed attempt files are diagnostics, not completion. Retry into a new output path.
