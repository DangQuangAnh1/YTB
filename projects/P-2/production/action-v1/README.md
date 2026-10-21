# Sàn mới lau — action pilot

24 seconds, 720 frames, portrait1080×1920 at30fps. Pure time-indexed original action animation. Main export uses Remotion4.0.536 from P-1 engine-v1, read-only; no P-1 creative assets. `characters-v3/cast.cjs` supplies approved heads, hair, cap and red scarf without geometry changes. Motion Canvas, Fullik, stick-motion and OpenToonz installation/smoke tests are tracked separately by PM; this video does not pretend to have used those applications.

`rig.cjs`: original closed-form two-bone IK, arms61+61, legs80+80, torso100. `Video.tsx` uses keyed hips, hand/foot targets and short contact highlights. All720frames are sampled by `validate.cjs`; fixed-length checks are numerical rig checks, not proof of visual quality. Three selected planted intervals are explicitly tested for zero foot drift. Other feet can move intentionally across the wet strip. Airborne sections have no ground-contact claim.

`bake-physics.cjs`: actual Matter.js0.20 deterministic cone-only trajectory, two60Hz substeps per video frame. The loose-cone initial impulse atframe209 is artist-triggered by the sliding-foot beat. Characters are keyed, not physics-solved ragdolls. `cone-track.json` is generated once and rendered by frame index, so seek order cannot change the result.

`audio.py`: original synthesized Foley, tiny finish motif, reproducible seed. No dialogue or external recording/sample.

Run from repository root, using existing local runtime:

```
node projects/P-2/production/action-v1/bake-physics.cjs
node projects/P-2/production/action-v1/validate.cjs
.\.venv-p2\Scripts\python.exe projects/P-2/production/action-v1/audio.py
node projects/P-2/production/action-v1/render.cjs
.\.venv-p2\Scripts\python.exe projects/P-2/production/action-v1/finalize.py
```

Outputs are under `artifacts/render/action-v1`. Reruns are permitted only before registration; after registration create a new version. Initial pre-review passes were replaced before registration: landing-foot inset to prevent a cropped knee, ending hips raised to separate knees, joined fist lowered below B hair/scarf. Reviewer confirmed exact regenerated585/675 before final delivery. The finalizer regenerates all review stills from the encoded MP4 to avoid stale development pictures.
