# P-2 cooking pilot v1 — self_review

Source user video ec15pSXc2Qg, selected range 148–152 seconds (2:28–2:32). yt-dlp metadata duration 951 seconds; initial browser displayed 24 seconds while loading and was corrected. Source retrieved at 640x360/25fps without audio for a private visual test. Raw source in media/, ignored by Git.

Adapter: tasks/propagate-keyframe-v1.py. One AI anime keyframe from image_gen (default tool, no paid API fallback), propagated with OpenCV DIS dense flow CPU. This is not Diffutoon or EbSynth, and not a generative video model. Local isolated .venv-p2 environment, excluded via .git/info/exclude. Installed yt-dlp, imageio-ffmpeg, pillow, opencv-python-headless, numpy. No service upload. Exact model timing/cost not measured.

Technical: 100 frames, 25fps, 640x360, 4 seconds, H264 yuv420p, silent. Full decoder check succeeded for anime-draft.mp4 and comparison.mp4; hashes and render duration 7.69 seconds in artifacts/render/cooking-flow-v1/manifest.json. Render runtime excludes download/keyframe generation/setup.

Visual review is sampled frames only: 0,25,50,75,99 inspected in contact.jpg. Midpoint style, composition and tofu visible; severe stretched fingers/knife/board and text near start/end where one reference cannot cover disocclusion. Verdict needs_revision for visual quality. No continuous video viewing or audio listening performed; outputs deliberately silent. Not an accepted final or publishable deliverable.

creator-improve project lesson: one central keyframe plus unconstrained flow does not preserve cooking hand/knife geometry across this 4-second shot. Do not advertise this method as stable conversion. Next technical options: multiple corrected keyframes with occlusion-aware blending or an actual vid2vid model/service test after environment/transfer conditions are settled. No kit rule change warranted. Deliver the failed-quality prototype honestly so user can assess look and limits; no publishing or paid scope inferred.
