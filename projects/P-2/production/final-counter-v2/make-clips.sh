#!/bin/sh
# Regenerates derived 2D clips from CMU BVH files in ignored third_party/video/sources/cmu-mocap-bvh.
# name bvh facing-frame from to (60fps indices of the full trial)
cd "$(dirname "$0")/../../../.." || exit 1
B=third_party/video/sources/cmu-mocap-bvh
M=projects/P-2/production/soft-line-motion-v2/mocap2d.cjs
O=projects/P-2/production/final-counter-v1/clips
while read name bvh face from to; do
  node $M $B/$bvh.bvh $O/$name.json --fps 60 --facing-frame $face --from $from --to $to --name $name >/dev/null
  node $M $B/$bvh.bvh $O/$name-m.json --fps 60 --facing-frame $face --from $from --to $to --mirror --name $name-m >/dev/null
done <<LIST
run 09_01 0 0 73
jab 144_20 0 80 160
lpunch 144_14 150 130 215
duck 76_03 400 330 510
kick 135_07 59 30 100
jump 13_11 0 85 180
walk 02_01 0 0 120
stand 13_11 0 0 4
LIST
