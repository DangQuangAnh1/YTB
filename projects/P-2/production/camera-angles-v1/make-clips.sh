#!/bin/sh
# Projects two CMU trials from six cameras with mocap-cam.cjs. BVH files: third_party/video/RESTORE.md (SHA256 in CATALOG.md).
# name bvh facing-frame from to | angle yaw pitch persp
cd "$(dirname "$0")/../../../.." || exit 1
B=third_party/video/sources/cmu-mocap-bvh
M=projects/P-2/production/camera-angles-v1/mocap-cam.cjs
O=projects/P-2/production/camera-angles-v1/clips
for move in "jab 144_20 0 80 160" "kick 135_07 59 30 100"; do
  set -- $move; name=$1 bvh=$2 face=$3 from=$4 to=$5
  while read angle yaw pitch persp; do
    node $M $B/$bvh.bvh $O/$name-$angle.json --fps 60 --facing-frame $face --from $from --to $to --yaw $yaw --pitch $pitch --persp $persp --name $name-$angle >/dev/null
  done <<LIST
side 0 0 0
threequarter 40 6 0
front 85 4 420
low 30 -24 1100
high 25 48 0
behind 150 6 0
LIST
done
ls $O
