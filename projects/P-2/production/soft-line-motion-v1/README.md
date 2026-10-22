# Soft line motion v1

3s silent proof. Original duel motion frames44–133 from immutable sibling black-red-duel-v2; keeps stick-motion FK/IK and GSAP timing. Perfect Freehand original MIT getStroke at176e00f2399f4969e1b0965c5921d96a3e50ce9f builds filled curved strokes. No reference artwork/footage. Existing upstream notices in sibling THIRD_PARTY_LICENSE.txt apply; Perfect Freehand license is retained here.

Restore source/runtime using third_party/video/RESTORE.md, then at repo root run node projects/P-2/production/soft-line-motion-v1/prepare.cjs. Resolve React/Remotion/GSAP from existing p2-remotion runtime; local ignored node_modules symlink points to it. Launch Studio from this folder using that runtime's Remotion CLI: studio Video.tsx --port 3005 --no-open. SoftLineMotion is deliverable; StraightLineComparison shares poses, framing and hollow heads for line-only comparison. Props saving is not implemented; edit source.

At root run node projects/P-2/production/soft-line-motion-v1/render.cjs, node projects/P-2/production/soft-line-motion-v1/check.cjs, then python3 projects/P-2/production/soft-line-motion-v1/finalize.py. Output artifacts/render/soft-line-motion-v1. Runtime and media are ignored. Numeric checks establish finite strokes, centerline endpoints and reverse-seek reproducibility, not combat realism or user acceptance. No audio intentionally; loop has a reset and is not seamless.

Studio hot reload after editing the registerRoot entry can show a duplicate registerRoot overlay; reload the tab to clear. Fresh export is unaffected.
