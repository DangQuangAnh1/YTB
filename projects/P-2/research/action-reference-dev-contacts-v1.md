# P-2 — Dev contacts: locomotion, IK and hand–prop attachment

Research date: 2026-10-22, Asia/Bangkok. Research only, authorized by user request quoted in action-reference-brief-v1.md. No production artifact, state mutation or creative acceptance. `resume P-2` was attempted and failed on missing historical `artifacts/cooking-pilot-v1/anime-keyframe.png`; PROJECT.md, generated HANDOFF revision 213 and the new brief were read. Report remains unregistered pending operational recovery.

## Recommendation

Use the existing **stick-motion starter as the first actual upstream movement example**, then adapt its gait and reachable two-bone solver to the chosen rendering host. Keep P-2 character styling. Do not rebuild another equivalent solver. Use **Fullik only if joint limits or longer chains prove necessary**; its constrained 2D chain is a useful reserve, not a reason to add a 3D stack. Motion Canvas can animate signals and transforms, but that does not supply foot contacts or expressive running by itself.

A smaller original route is one actor, one fixed camera and one door or low obstacle: 2–3 strides → decelerate → plant both feet → reach a stationary handle → pull and react. Turn only by a brief held silhouette/facing change at rest; avoid a rotating torso, combat, moving camera and two actors in the first contact proof. Duration should follow readable acting rather than copying reference timing. This covers the important mechanics with fewer simultaneous constraints than the supplied Shorts.

## Four candidates inspected

| Candidate | Evidence/status | Fit | Concrete gap |
|---|---|---|---|
| [stick-motion](https://github.com/cafermutluozkan/stick-motion), `6315c09c4e5051267806988defa28279b965fe29` | Existing checkout; MIT LICENSE retained; starter and rig-architecture read; original math executed in Node | Best starting point: FK arms, two-bone leg IK, stance/swing gait, fixed bone lengths, mirrored facing | Constant-speed stance cancellation depends on matching root speed. Changing only speed while decelerating is insufficient. Arms use FK and have no ready hand–handle constraint; turning abruptly flips the rig. |
| [Fullik](https://github.com/lo-th/fullik), `3f22da98a0fa0051416b20077af5142aec3dfc2e` | Newly shallow-cloned to `third_party/video/sources/fullik`; package 1.3.3; MIT LICENSE and bundle notice retained; `build/fik.js` required and Chain2D executed directly | Useful 2D constrained chains/longer chain reserve. Solver execution does not require Three.js scene or install | Does not decide footsteps, weight transfer, grip phases, run/stop timing or facing. Iterative solver residual/pose continuity need checking across sequence. |
| [Motion Canvas](https://github.com/motion-canvas/motion-canvas), `7b91435c301d530351dcf5ebb91dd139c002e405` | Existing checkout, MIT LICENSE; source inspected; no installation or scene export in this role | Can host deterministic poses/transforms and timeline; good compositing candidate | No body IK/contact facility found in inspected 2D source. Would still need actual adaptation of stick-motion/Fullik or existing rig. Renderer migration alone cannot fix acting. |
| P-2 `production/action-v1/rig.cjs` | Existing original project source read; not claimed as upstream reuse and not re-rendered | Already solves two-bone targets and supports both hand/foot targets, world-space holds | Pose tables interpolated using smoothstep; no reusable stance-state locomotion or explicit grip acquisition/release. Length/reach validity cannot demonstrate impact, balance or readable acting. Avoid rewriting it from scratch yet again. |

Upstream URLs and licenses were checked live in this task, including [Fullik license](https://github.com/lo-th/fullik/blob/3f22da98a0fa0051416b20077af5142aec3dfc2e/LICENSE) and [stick-motion source](https://github.com/cafermutluozkan/stick-motion/blob/6315c09c4e5051267806988defa28279b965fe29/assets/starter.html). Motion Canvas docs fetch timed out; claims above use the local pinned source, not an assumed successful docs read. Example code licenses do not clear reference video, soundtrack or third-party example assets.

## Small upstream smoke actually executed

Command: `node third_party/video/smoke/p2-action-contacts-v1/check.cjs` (no npm install). Script plus exact `result.json` are persisted in `third_party/video/smoke/p2-action-contacts-v1/`. Local script/result are ignored research scratch files, not registered P-2 render output. It extracts and executes the original `gaitFoot`, `solveLegIK`, `chain2`, and helpers from stick-motion's starter rather than reimplementing them. It separately requires Fullik's original bundled `build/fik.js`.

Observed results:

- 2,040 stance samples across walk duty 0.62 and run duty 0.4, both phases: maximum adjacent-sample world X drift `5.684341886080802e-14` units when root speed matches the gait's constant 200 units/s.
- 200 reachable leg targets, both facing signs: maximum reconstructed endpoint error `6.07087979554246e-14` units.
- Fullik fixed-base two-bone 80+80 chain to target (70,100), threshold 0.0001 and 100 iterations: reported residual `0.000005927768672281006` units.

**These are numeric math passes only.** No continuous playback, rendered foot silhouette, arm grip, deceleration, mirror turn, joint pop or creative quality was validated. Upstream snap.mjs was read but not executed: its stance report checks ground Y; that alone would not detect horizontal sliding. The independent numeric smoke therefore also checks world X. Unreachable targets must be treated as reach failures rather than interpreting a solver's clamping as a successful contact.

## Missing project behavior, bounded adaptation

1. **Run → stop:** preserve each stance foot's world contact anchor; move hip while keeping reach possible; release/replant at selected times. Upstream constant-speed gait is reusable for steady strides; stop phase needs an explicit small state sequence. Do not use the foot-lock formula with an independently eased root and unchanged speed.
2. **Grip:** designate the handle world transform as sole target during contact. Reach first; attach only on the chosen contact frame; solve wrist to target during pull; detach on release. If prop moves, compute its transform before wrist solve. Do not independently tween the wrist and handle.
3. **Limits:** test reach error every evaluated frame; prevent hip translation that overextends supporting leg or planted grip. For this shot, existing analytic two-bone solver is enough unless bounded elbow/knee limits show a concrete failure.
4. **Turn:** first simplify to rest → hold → facing change → rest with readable silhouette. Front/back turns or 3D rotation would require separate poses and depth ordering; unproved here.

Proposed next validation, subject to the project production scope decision: execute original upstream starter in the rendering/browser host, then adapt only one stop-and-grip segment. Acceptance should include reachable endpoint residual, fixed stance X/Y, matching wrist–handle transform during grip, no visible knee flip, and continuous human playback. Compare against the original starter before adding effects. This report alone does not approve that production step.

## Provenance / restore handoff

Fullik restore: `git clone --depth 1 https://github.com/lo-th/fullik.git third_party/video/sources/fullik`, verify `git rev-parse HEAD` equals the SHA above; if upstream HEAD changes, fetch the pinned SHA explicitly. Preserve root LICENSE (`Copyright © 2010-2018 three.js authors`) and built bundle header (`Copyright 2010-2022 fik.js Authors`, SPDX MIT). Source only cloned; no dependency runtime installed; only original numeric solver executed; no project integration performed. Parent owns shared catalog/restore records. No shared STATE, HANDOFF, catalog or Git exclusion was edited by this role.
