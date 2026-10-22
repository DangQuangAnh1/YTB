# camera-angles-v1

Experiment: can the CMU mocap (3D BVH) give stick-figure inserts from other camera angles? `mocap-cam.cjs` is `soft-line-motion-v2/mocap2d.cjs` with a camera added (`--yaw`, `--pitch`, `--persp`); each frame also stores depth `z` and a perspective size factor `s` per joint. With yaw 0 and pitch 0 it reproduces `final-counter-v1/clips/jab.json` exactly (max difference 0).

```bash
sh projects/P-2/production/camera-angles-v1/make-clips.sh          # needs 144_20 and 135_07 BVH (third_party/video/RESTORE.md)
node projects/P-2/production/camera-angles-v1/render.cjs           # ~/p2-out/camera-angles-v1/angles.mp4, 2x3 grid
node projects/P-2/production/camera-angles-v1/render.cjs stills 20,125
```

`Video.tsx` draws the same soft-line strokes as final-counter, ordering limbs by depth and scaling widths and the head by the perspective factor. Results and limits: `projects/P-2/research/video-shotcraft-shots-v2.md` (section "Kết quả thử").
