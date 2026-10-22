# Independent agent review — soft-line-motion-v1

Reviewer: separate Codex review agent, 2026-10-22. Mode: independent_review only in the limited sense of a separate agent inspecting the output; not a human review, user acceptance or an external production audit. Review only; no target repairs.

## Target and actual evidence

A-162 `artifacts/render/soft-line-motion-v1/draft.mp4`, SHA256 `7281c9e8d03c7f4236fdb2b3aa40d57af05647a9b96aefc12c7c3158cf672798`. Read PROJECT, plan17, storyboard, reference research A-158 and render source. Independently decoded the actual MP4 with existing full FFmpeg: exit0, empty stderr. ffprobe:1280×720,30fps,90frames,3.000s, video-only stream. Viewed existing9-frame encoded contact sheet and a newly extracted ordered45-frame sheet (frames0,2,…88 across the entire clip). Scratch evidence: `media/agent-review-soft-line-motion-v1/sequence.jpg` (ignored; source MP4 can reproduce it). This report retains timestamps and findings even if scratch disappears.

No continuous real-time perceptual playback or listening is claimed. Attempt to select localhost:3005 in IAB returned tab-not-found; review continued using frames decoded from actual deliverable. No direct new YouTube inspection: reference comparison relies on prior research, not a claim to have seen the original myself.

## Verdict

The stroke experiment works technically: visible limbs are curved rather than exposed M-L-L bars. It is not yet a convincing soft-body fight animation. Recommendation: revise this3s test before extending15s. Primary remaining gap is pose construction and curve continuity, followed by attack/reaction timing. Additional smoothing or higher FPS alone would not resolve it.

## Findings and concrete corrections

| Priority | Evidence in A-162 | Finding / impact | Proposed correction |
|---|---|---|---|
| P1 | f0, f30 (1.00s), f64–76 (2.13–2.53s) | Torso has an imposed S curve but splits abruptly into both legs at one hip point. At lean-back it creates a visible kink and a soft tube attached to a rigid hinge. | Author neutral/anticipation/extension/dodge/recovery spine shapes; align the torso terminal tangent with the support leg at the hip. Keep the second leg branching behind, with controlled overlap/cap rather than three independent rounded endpoints. Keep existing IK foot/contact anchors. |
| P1 | f0–10 (0–0.33s), f24–38 (0.80–1.27s), f50–62 (1.67–2.07s) | Guard arms make deep U loops under the head/shoulder; front/back arms overlap strongly. This reads as dangling curves rather than intentional elbows and fists. | Pose-correct the guard: distinguish near/far hands, give elbows a readable downward/outward direction, preserve a deliberate gap from neck/torso. Make curve handle lengths pose-dependent; avoid the same large rounding on every bent arm. |
| P1 | f12–18 (0.40–0.60s), f40–44 (1.33–1.47s), f66–76 (2.20–2.53s) | Extension/contact-like poses persist across successive samples; first/second jab look similar. Counter arm stops short while red leans away, so the intended dodge is possible but the intent and near-miss spacing need clearer posing. | Pick one clear beat for this test: jab → block → counter narrowly dodged. Define the closest-contact frame and visible surface target; plan a contact or a miss explicitly. Use a shorter extension settle and clearly different anticipation/recovery poses; do not add more attacks. |
| P2 | f0–10, f24–38, f50–62 | Many intermediate guard samples change little. Action relies on arm extension while hip/chest/head mostly follow the same pose tween. Result lacks clear weight shift and successive body action. | Author5 strong poses first, then stagger pelvis/chest/hand and head recovery by a few frames as a test, not a fixed universal rule. Stronger load/extension/recoil contrast before adding smear or effects. Test actual playback after changes. |
| P2 | f68–88 (2.27–2.93s) | Red recovers from lean and the legs move toward a narrow stance; the body silhouette becomes compressed, with feet sliding along the floor rather than a clearly readable step. | Either keep both foot anchors fixed during this short recovery, or explicitly lift/plant one foot using existing gait/IK logic. Choose support foot and maintain weight over it. |
| P2 | Whole clip; especially f64–80 | Head stays a near-identical circle locked near neck; added lag is too subtle in sampled poses to sell independent follow-through. | Add a visible authored head/neck pose offset during dodge and delayed return; keep neck tangent continuous. Retain circle design unless the chosen style needs deformation. |

## Cause / reuse assessment

Actually integrated: Perfect Freehand getStroke from pinned upstream, Remotion export, existing v2 motion guide (frames44–133), GSAP timeline and stick-motion-derived FK/IK helpers. Motion Canvas is referenced research, not an integrated runtime here. `Video.tsx` explicitly samples `../black-red-duel-v2/motion.cjs`; these are inherited choreography with a new stroke layer, not newly authored full animation.

`curves.cjs` rounds every limb using the same entry0.34/exit0.66 construction and independently generates a cubic spine with near-constant amplitude. Independent outline strokes share a hip point but do not share a tangent. `Video.tsx` shifts the head toward a2-frame delayed position by0.3 horizontally/0.15 vertically. These source observations explain likely causes; the visible findings above come from encoded output. Perfect Freehand is functioning; replacing the outline library is not the first correction.

## Small feasible correction sequence

1. Reuse this source and upstream stack; create a new immutable v2. First author the5 key poses and soft hip/shoulder/guard contours. Render stills for approval of shape internally before filling timing; this is an implementation QA gate, not a new user permission requirement.
2. Retain one jab/block/counter-dodge beat across3s. Adjust timing and foot support, then add modest head/chest overlap. Do not extend15s yet.
3. Export the same-motion straight/soft comparison. Review actual continuous playback plus frames around contact, guard and recovery. Verify outline finite/stable, planted feet, no unintended gaps or fused hands; then seek user visual judgment.

Acceptance proposal: clear near/far arms at guard; no sharp hip kink in lean/recovery; unambiguous block vs near miss; visible change in body weight and head follow; no contour jitter at normal playback. All are currently proposed criteria, not checks claimed passed.

## Checks

- brief_alignment passed for a3s silent black/red curved-stroke technical proof. Does not establish reference quality.
- visual_review failed for finishing-quality goal due to hip/guard/pose issues above. Curved stroke function itself passed sampled inspection; continuous perceptual quality remains unverified.
- media_decode passed independently, entire target decoded.
- audio_review passed only for required intentional silence: actual container has no audio stream. No sound design or mix assessment is applicable.

Project lesson: distinguish successful replacement of the visible stroke layer from successful animation. A curve library cannot supply expressive pose/timing automatically. Keep this lesson local to P-2; no kit-wide defect was established.
