# shotcraft-study

Study harness, not production. Renders selected demos from video-shotcraft (Apache-2.0, commit 43bd349a136651865ecfa6ea1cf012f6e957d304, ignored sparse checkout in `third_party/video/sources/video-shotcraft`) with the P-2 Remotion runtime, so their motion can be inspected as frames. Nothing from the demos is copied here.

```bash
node projects/P-2/production/shotcraft-study/render.cjs            # all demos in demos.txt, ~2 min
node projects/P-2/production/shotcraft-study/render.cjs VersusSlam  # one demo
.venv/Scripts/python.exe projects/P-2/production/shotcraft-study/sheets.py ~/p2-out/shotcraft-demos
```

Output defaults to `~/p2-out/shotcraft-demos` (`P2_OUT` overrides). Demos that need `demos/_textures` images or `@remotion/motion-blur` are not in `demos.txt`. Findings: `projects/P-2/research/video-shotcraft-shots-v2.md`.
