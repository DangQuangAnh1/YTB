# Soft line motion v2 (CMU mocap retarget)

3s silent proof. Motion is real captured data from the CMU Graphics Lab Motion Capture Database (trials 144_20 right-hand punch sequence for red, 144_26 right blocks mirrored for black), obtained through the una-dinosauria/cmu-mocap BVH mirror. CMU asks for this acknowledgement when results are published: "The data used in this project was obtained from mocap.cs.cmu.edu."

Reuse record. The OpenMontage ink-theater converter `bvh2clip.mjs` (pinned c8066452325cb57c8fc1ba8c2a71b6e8842e6b65, AGPL-3.0) was executed unmodified on the four trials as the smallest upstream proof; it produced valid clips. Concrete gap: it always projects onto the X axis (front view, `horizontalAxis = 0`) and ignores the performer's heading, so forward punches are foreshortened and unreadable in a side-view fight. `mocap2d.cjs` here is original code (BVH parse, forward kinematics, heading-aligned side projection). No OpenMontage code is copied into Git; its checkout stays in ignored `third_party/video/sources/openmontage`.

Pipeline: `mocap2d.cjs` -> trimmed clips in `clips/` -> `compose.cjs` (placement, rear-leg choice) -> `curves.cjs` (centripetal spline through joints, limbs attached to the body line, Perfect Freehand filled strokes) -> `Video.tsx` (Remotion 4.0.536). Two compositions: SoftLineMotion (deliverable) and StraightLineComparison (same joints, bone lines).

Restore: see third_party/video/RESTORE.md for OpenMontage, the BVH files and Perfect Freehand. Regenerate clips from repo root:
`node projects/P-2/production/soft-line-motion-v2/mocap2d.cjs third_party/video/sources/cmu-mocap-bvh/144_20.bvh projects/P-2/production/soft-line-motion-v2/clips/cmu-144_20-jab.json --facing-frame 0 --from 40 --to 129 --name cmu-144_20-jab`
and the same for 144_26 with `--from 20 --to 109 --mirror --name cmu-144_26-block-mirror`.
Then `node .../render.cjs`, `node .../check.cjs`, `python3 .../finalize.py`. Output artifacts/render/soft-line-motion-v2. Set `MOCAP_REPORT=1` on mocap2d to list punch-like reach peaks and heading.

Numeric checks cover finite outlines, reverse-seek determinism, planted-foot slide and contact distances only. They do not establish combat realism or user acceptance. No audio intentionally.
