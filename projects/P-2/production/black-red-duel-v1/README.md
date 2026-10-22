# Black / Red sparring draft — 15 seconds

Current user explicitly requests an original short two-person black/red fight. One 1280×720, 30fps, 450-frame landscape draft; original environment, authored choreography, procedural Foley, no source clip content. This is a specific test cast, not an edit to the duo-v3 channel identity.

Reuse: `upstream-math.cjs` contains original `solveLegIK`, `chain2`, vector helpers and gait function extracted from `cafermutluozkan/stick-motion` SHA `6315c09c4e5051267806988defa28279b965fe29`. Preserve THIRD_PARTY_LICENSE.txt. Solver functions are actually called for every limb; gait function is retained but is not used in this authored combat sequence. Original upstream browser starter was opened and its walking pose visibly verified before this adaptation. It lacks combat choreography, hand-target control, multi-character contact and an offline exporter; only those gaps are authored/adapted here. No GSAP code/runtime is bundled into this frame-driven composition.

`render.cjs` adapts P-2 action-v1 bundling/render API to Linux Chrome and a new output directory. Remotion 4.0.536 has a custom license; this is a local evaluation draft, not an assertion of commercial eligibility. MC/Fullik are not used in this film.

Runtime outside parent Git: `third_party/video/runtime/p2-remotion`, installed exact `remotion`, `@remotion/cli`, `@remotion/bundler`, `@remotion/renderer` 4.0.536, react/react-dom 19.2.3. This directory has a node_modules symlink to that runtime, ignored. Linux `/usr/bin/google-chrome` is used. FFprobe ships in `@remotion/compositor-linux-x64-gnu`. The finalizer reuses existing full imageio FFmpeg 7.0.2 under `.cache/creator-agency/p1-runtime-bundled`; Remotion's restricted FFmpeg lacks the default null encoder used by full-decode QA. Python requires NumPy/Pillow: use the bundled workspace Python, since system Python lacks NumPy.

Run from repository root before artifact registration:

```bash
node projects/P-2/production/black-red-duel-v1/check.cjs
python3 projects/P-2/production/black-red-duel-v1/audio.py
node projects/P-2/production/black-red-duel-v1/render.cjs stills
node projects/P-2/production/black-red-duel-v1/render.cjs
python3 projects/P-2/production/black-red-duel-v1/finalize.py
```

After registration, do not overwrite these files/outputs: create a new version directory. Mathematical geometry, encoded-frame inspection, full decode and numeric audio checks have distinct coverage; none imply human creative acceptance. See final manifest/review for checks actually completed.
