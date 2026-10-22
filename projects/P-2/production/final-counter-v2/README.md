# The Final Counter v2 (final-counter-v2)

16 s 9:16 1080x1920 60fps: final-counter-v1 (see its README for the fight pipeline, CMU mocap and Perfect Freehand provenance) plus two shot recipes from video-shotcraft (Apache-2.0, commit 43bd349a136651865ecfa6ea1cf012f6e957d304), rewritten as SVG in `Video.tsx` with the demo timings doubled for 60fps:

- **Intro, frames 0-59** (from `demos/transition/transition-hidden-cut/VersusSlam.tsx`): title "THE FINAL COUNTER" on a growing 78 degree seam, the RED and BLUE halves rush in with an ease-in cubic (frames 8-28) and horizontal speed blur, slam at frame 28 (white flash over 6 frames, shake 16 px with decay 3.4 frames, VS stamp spring damping 12 / stiffness 260, ring and 12 speed lines), hold, hard cut into the fight.
- **Anime impact on the final hit** (from `demos/effects/impact-feedback/AnimeImpact.tsx`): 6 frames (0.1 s, the demo's 3 frames at 30fps) of `invert(1) grayscale(1) contrast(1.45)`, red/cyan copies offset 8 px with screen blending, 34 + 22 radial wedge lines whose shape changes every 2 frames. Line colours are flipped from the demo because our negative turns the dark arena white.

Everything after frame 60 is the v1 fight unchanged (fade-in removed). `audio.py` shifts all v1 sounds by 1 s and adds a rush whoosh and a slam at frame 28; the sidechain duck also triggers on the slam.

```bash
projects/P-2/production/final-counter-v2/build.sh full    # ~2 min on this machine, output ~/p2-out/final-counter-v2
```

Self-review only: frames sampled, audio levels numeric, no listening. The VS stamp covers RED's guard hand; the existing v1 shake on the final hit (26 px) is above the recipe's 20 px "reads as a glitch" limit and was not changed in this test.
