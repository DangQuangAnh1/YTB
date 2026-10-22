# Black / Red duel v2 — upstream-based revision

User asks to revise v1 because it looks funny and emphasizes reusing researched repositories. New1280×720/30fps/450frame draft, same black/red brief. Keep registered v1 source/output unchanged.

Actual reuse:

- `upstream.cjs`: original `solveLegIK`, `chain2`, vector helpers, `gaitFoot`, `POSES` from stick-motion SHA6315c09c4e5051267806988defa28279b965fe29, MIT notice retained. FK arms + IK legs follow its original render architecture; POSES.STAND is the base flat pose. Unlike v1, original gaitFoot is actually used in approach/retreat steps. Its phase clock is derived from actual root travel so nonlinear GSAP root easing still matches distance; short blending windows transition into/out of stance. Pure stance windows remain measurable.
- GSAP3.12.5 executes the starter's persistent flat state + poseTween-style timeline; paused timelines seek explicit frame time. Original source explains why replacing pose objects breaks tweens; this adapter retains target objects. This replaces the custom pose interpolator. Dependency is installed outside parent Git, standard no-charge license per pinned package metadata, not MIT. Local evaluation; no claim of commercial product licensing.
- Existing Remotion4.0.536/P-2 render/finalize/Foley pipeline is reused. The tested Linux Chrome/full imageio FFmpeg paths are retained. No MotionCanvas/Fullik integration is claimed; adding redundant engines would not supply choreography.

Concrete missing upstream behavior: fighting guards, punch/block/kick beats, two-character reactions and shot content. Those poses/times are authored here; this is not a ready-made combat clip library. Knees preserve the upstream facing convention but select its exposed `kneeSign=-1` to make knees bend toward the opponent in this shot; the default produced a backwards-looking knee silhouette despite correct endpoints. Arms use original FK rather than treating every elbow as a leg IK target. Heads are smaller, moves grounded, and the friendly handshake/long flight are removed.

Runtime: existing ignored `third_party/video/runtime/p2-remotion`, plus `gsap@3.12.5`. Source node_modules symlink and webpack caches are ignored. Use bundled workspace Python for NumPy/Pillow. Run the new `check.cjs`, `audio.py`, `render.cjs`, `finalize.py` before registration only; after registration create another version. `render.cjs stills frames` renders authoring stills; finalizer produces actual encoded samples.

QA must distinguish stance/reach/seek numeric checks, sampled encoded visual review, real-time motion judgment and listening. None can turn the user's rejection of v1 into acceptance of v2. Sources/versions and final checks are recorded in the new provenance/manifest.
