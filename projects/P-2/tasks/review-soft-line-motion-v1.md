# Self-review — soft-line-motion-v1

Exact output: artifacts/render/soft-line-motion-v1/draft.mp4. 90frames,30fps,1280×720,3.000s, silent. Full FFmpeg decode passed. Inspected actual encoded contact sheet at0,10,15,30,42,59,69,75,89; arms/legs now curve continuously around bends, heads remain hollow, full feet visible after framing correction. Checked90frames of numeric stroke generation and reverse frame sampling: finite, deterministic, centerline endpoints retained. Studio loaded and playback started. This is sampled visual inspection, not continuous human perceptual QA.

Still limited: hips can form a sharp change where torso joins legs; original guard/attack spacing and timing retained, not newly hand-animated to the reference. No claim of reference parity, original tool identification, complete contact accuracy or user acceptance. Three seconds tests new line layer only; no new15s film. No reference footage/audio included.

Project lesson: curve generation and outline work must stay separate from guide FK/IK, retain fixed endpoints and use deterministic pressure (thinning0,simulatePressurefalse) to avoid frame-dependent line widths. This is scoped implementation of A-160; no global kit change.

Studio HMR briefly raised duplicate registerRoot after entry edits; tab reload restored canvas. Default-prop saving warns because root registration is inline; preview/playback and export work, source edits are the supported path.
