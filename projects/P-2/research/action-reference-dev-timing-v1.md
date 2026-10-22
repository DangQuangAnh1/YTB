# P-2 dev timing — upstream research v1

Date: 2026-10-22, Asia/Bangkok. Component owner: dev timing. Research only; no production authorization inferred. Read PROJECT, HANDOFF r213 and action-reference-brief-v1. `agency.py resume P-2` failed on missing `artifacts/cooking-pilot-v1/anime-keyframe.png`; no state, finalizer or registered render was changed. This report is unregistered pending recovery.

## Finding

The smallest useful stack is the existing P-2 Remotion composition plus a deliberately authored beat sheet, using upstream easing/audio primitives rather than a new engine. Motion Canvas is a reasonable alternate authoring environment if its smallest existing example/export works on this host; it is not necessary just to improve timing. No inspected library generates good choreography, poses, contact or comedic reaction automatically.

Concrete observed gap: `production/action-v1/rig.cjs:65` applies the same `u*u*(3-2*u)` smoothstep to every pose interval. Its derivative is zero at both ends; therefore every interval eases out/in, including a strike, unless pose spacing compensates. This is a plausible contributor to floaty rhythm, not a visual verdict: old media is missing and I did not continuously watch the reference or P-2 movie. `Video.tsx` already has small impact marks, trails and a two-event sine shake; `audio.py` already creates procedural Foley and `finalize.py` muxes it. Rewriting these facilities would duplicate existing work.

## Candidate comparison and exact provenance

All sources checked live or inspected locally on this date. HEAD pins are research snapshots, not npm-version equivalence or production recommendations.

| Candidate | Exact source/license checked | Actual useful upstream capability inspected | Fit and limit/status |
|---|---|---|---|
| [Motion Canvas](https://github.com/motion-canvas/motion-canvas/tree/7b91435c301d530351dcf5ebb91dd139c002e405) | Existing checkout `7b91435c301d530351dcf5ebb91dd139c002e405`; root LICENSE MIT | `packages/core/src/flow/chain.ts`, `sequence.ts`, `scheduling.ts` (`waitUntil`), `tweening/tween.ts`, `timingFunctions.ts`; [flow docs](https://motioncanvas.io/docs/flow/) | Chain anticipation/action/recovery; sequence staggers overlapping motion, not necessarily serial completion; named time events can anchor beats. Existing source inspected; package manifest pins 3.17.2, but no current-host install/export executed by this role. |
| [stick-motion](https://github.com/cafermutluozkan/stick-motion/tree/6315c09c4e5051267806988defa28279b965fe29) | Existing checkout `6315c09c4e5051267806988defa28279b965fe29`; root LICENSE MIT | `assets/starter.html`, `references/poses.md` poseTween example; techniques for head lag, short landing squash and proposed trails | Reuse starter/presets before replacing gait. Not a finished fight-motion library: trails are described as an addition, not an already integrated feature. Its GSAP dependency needs its own version/license check; MIT wrapper does not relicense GSAP. Source read, not executed by this role. |
| [Remotion](https://github.com/remotion-dev/remotion/tree/f719fabe975c280f83c9a71858f7cf6e20936e8d) | Remote HEAD `f719fabe975c280f83c9a71858f7cf6e20936e8d`; [custom LICENSE](https://github.com/remotion-dev/remotion/blob/f719fabe975c280f83c9a71858f7cf6e20936e8d/LICENSE.md), not MIT | Existing P-2 frame-based composition; upstream `interpolate`/`Easing`, frame sequences and [audio components](https://www.remotion.dev/docs/html5-audio) | Best immediate continuity. Do not port latest API blindly: historical P-2 manifest records 4.0.536 while current docs distinguish Html5Audio from @remotion/media Audio. Free eligibility includes individuals/evaluations and for-profit entities up to 3 employees; entity eligibility is not established by this report. Existing integration evidenced by source/manifest; no new render executed. |
| [Tween.js](https://github.com/tweenjs/tween.js/tree/84a27a74febbda783eebb7ee3e7d7c7abfd25009) | Remote HEAD `84a27a74febbda783eebb7ee3e7d7c7abfd25009`; root LICENSE MIT | [Pinned user guide](https://github.com/tweenjs/tween.js/blob/84a27a74febbda783eebb7ee3e7d7c7abfd25009/docs/user_guide.md): explicit `update(time)`, chain, Easing | Small object-property tweening; no rig, contact, audio mixer or choreography. New dependency unnecessary for Remotion's existing easing. Registry v25.0.0 tiny numeric smoke executed; not claimed equal to HEAD. No project integration. |
| [Anime.js](https://github.com/juliangarnier/anime/tree/01b81be1df6843ccfe0a71c0699a746bf740dd77) | Remote HEAD `01b81be1df6843ccfe0a71c0699a746bf740dd77`; LICENSE.md MIT | [Official seek example](https://animejs.com/documentation/timeline/timeline-methods/seek/) has `createTimeline({autoplay:false})`, `.add(...)`, `.seek(time, muteCallbacks)` | Useful interactive SVG timeline and scrubbing. Browser-oriented example needs a deterministic frame adapter and callback discipline for offline export. No rig or audio pipeline. Referenced only, not downloaded/installed/run. |

MIT notices must remain with redistributed source. Code licenses do not clear arbitrary demo audio, fonts, characters or backgrounds. No new checkout was needed: existing sources cover immediate scope; alternative sources were inspected remotely.

## Tiny execution evidence

Downloaded only the published `@tweenjs/tween.js@25.0.0/dist/tween.esm.js` into `/tmp/p2-tween-25.0.0.mjs` (43,418 bytes) and ran Node v24.19.0. Adapted official guide's object tween to explicit times: `new Tween({x:0}).to({x:100},1000).easing(Easing.Quadratic.In).start(0)` then `update(time)`. Actual `(ms,x)` output: `(0,0), (250,6.25), (500,25), (750,56.25), (1000,100)`; midpoint/end assertions passed. This proves numeric easing with explicit time only. It does not prove frame seeking backwards, editor integration, video export, audiovisual quality, contact or reference parity. Temporary distribution was not added to parent Git.

## Simpler test specification for a later approval

One character, one fixed side view, one obstacle and one readable action: notice obstacle → crouch → hop → land → look back. First judge silhouette, spacing and weight in plain lines without FX/audio. This avoids two-person choreography and continuous hand-to-prop contact.

Use explicit named beats in frames, independent controls for anticipation, acceleration, apex/hold, landing and recovery; short action need not mean equal duration for every phase. This is proposed creative timing, not timing measured from the linked video. For example at 30 fps, an experimental 6-second block can reserve 24 frames to establish, 18 to prepare, 18 to hop, 8 to land, and the remainder for reaction/holds; adjust by watching, not by treating these numbers as a rule.

After motion reads: at most one brief speed arc, one 1–2 frame accent if readable, a short landing compression and restrained decaying shake. Derive trails from deterministic earlier-frame positions rather than mutable playback history, so out-of-order frame rendering gives the same result. Keep the actor/ground contact legible; FX cannot fix an incoherent pose.

For sound, reuse the existing original Foley generator with frame-indexed cue data shared by visual contact and mux/Audio placement; no external sample pack needed. Validate full decode and audibly listen to continuous playback, especially impact alignment, clipping and tails. Existing numeric audio checks do not establish pleasant mixing. Do not run the historical finalizer against registered directories; any authorized future experiment requires a new versioned output.

## Decision

No new timing engine recommended now. First prove one useful upstream example from the selected existing environment on this host, then adapt only the concrete missing behavior: per-segment timing instead of uniform smoothstep and a shared beat/cue mapping. Pose design, silhouette checks and continuous viewing remain human/editorial work. This report establishes research and one numeric smoke; it establishes no new produced film, quality acceptance or measured time/token savings.
