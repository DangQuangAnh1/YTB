# P-2 dev camera / cảnh / compositing / export — v1

Ngày kiểm: 2026-10-22 (Asia/Bangkok). Phạm vi nghiên cứu theo yêu cầu user “mỗi thành phần tách ra 1 role dev ... có thể làm đơn giản hơn video kia”. Không sản xuất phim, không thay STATE/HANDOFF. Báo cáo kỹ thuật tự kiểm, không phải creative approval.

## Kết luận

Phần camera/bối cảnh **không cần engine mới** cho bản đơn giản. Giữ camera ngang cố định, toàn thân/điểm chạm trong khung hình, một cảnh 2D có 3 lớp (nền xa; sàn/tường/cửa; nhân vật/đạo cụ). Cắt thẳng khi đổi cảnh; chỉ thêm pan/zoom khi việc đọc hành động đòi hỏi. Dạng hành lang phối cảnh có thể là SVG 2D với đường hội tụ cố định; không cần 3D thật hay depth model.

Lựa chọn ít thay đổi nhất là tái sử dụng source Remotion hiện hữu của P-2 nếu đủ điều kiện license. Lựa chọn upstream tốt để thử song song giới hạn là **Motion Canvas Camera + ví dụ upstream**, không xây camera riêng. Chưa có bằng chứng engine nào tự tạo diễn hoạt hành động hay.

Mẫu YouTube được parent quan sát qua các screenshot: người que đỏ, cảnh vách đá/hành lang/cửa. Agent này không kiểm continuous playback/audio nên không tuyên bố phân tích đầy đủ clip hoặc xác định công cụ tác giả dùng.

## Trạng thái hiện tại, phân biệt máy

`python3 scripts/agency.py resume P-2` trả exit 2: `Referenced file missing: artifacts/cooking-pilot-v1/anime-keyframe.png`. Đã đọc PROJECT.md và HANDOFF.md rev213 như packet còn lưu; không bypass check và không coi handoff cũ là quyền mới.

Đã kiểm trên máy hiện tại: Linux, Node v24.19.0. Không thấy `ffmpeg` hoặc `godot` trên PATH; `production/action-toolkit/node_modules` và `third_party/video/sources/motion-canvas/node_modules` không có. Motion Canvas checkout đã tồn tại tại `third_party/video/sources/motion-canvas`, HEAD `7b91435c301d530351dcf5ebb91dd139c002e405`, LICENSE MIT đã đọc. Không clone trùng. Trước khi parent bổ sung catalog, không thấy tracked catalog/restore file; thông báo parent ghi nhận nguồn có sẵn.

`tasks/action-toolkit-installed-v1.json` là bằng chứng **máy Windows trước đây**, không là kiểm Linux: Motion Canvas 3.17.2 build pass, plugin/FFmpeg binary load pass, nhưng chưa full MC export; phim thực dùng Remotion 4.0.536. OpenToonz cũng chỉ có installer/CLI check Windows. `production/action-toolkit` hiện có lockfile và source smoke, chưa runtime. Không gọi bất cứ tool nào trong số đó “đã cài/chạy được trên máy này”.

## 5 upstream candidates đã kiểm nguồn chính thức

SHA lấy trực tiếp GitHub API commits ngày kiểm; SHA HEAD là provenance nghiên cứu, không khuyến nghị nâng version đang lock.

| Repo / SHA | Giúp phần nào | License đọc tại SHA | Fit và khoảng trống | Trạng thái thật |
|---|---|---|---|---|
| [motion-canvas/motion-canvas](https://github.com/motion-canvas/motion-canvas) `7b91435c301d530351dcf5ebb91dd139c002e405` | Camera orthographic, scene graph, signal/timeline, cut/transitions, xuất PNG sequence | MIT; giữ copyright/permission notice | Rất hợp 2D; camera pan/zoom/roll đã có; parallax phải bố trí layer và timing; không có 3D perspective camera thật | Checkout local; đọc camera example/source; build trước ở Windows; chưa build/export Linux |
| [motion-canvas/exporters](https://github.com/motion-canvas/exporters) `f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f` | FFmpeg plugin cho MC, không phải animator | MIT theo API và [license pin](https://github.com/motion-canvas/exporters/blob/f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f/LICENSE) | Cần kiểm **version package thật**, không đánh đồng repo HEAD cũ với `@motion-canvas/ffmpeg:3.17.2` lockfile | Plugin trong lock; chưa có dependencies Linux, chưa xuất MP4 |
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) `f719fabe975c280f83c9a71858f7cf6e20936e8d` | Frame-driven React/SVG, Sequence cut/compositing, CLI rendering | Remotion License riêng; [license pin](https://github.com/remotion-dev/remotion/blob/f719fabe975c280f83c9a71858f7cf6e20936e8d/LICENSE.md): cá nhân, tổ chức lợi nhuận tới 3 nhân viên, nonprofit hoặc đánh giá chưa thương mại có free eligibility; nhóm khác cần company license | Phù hợp nhất để giữ renderer P-2 cũ; camera có thể là transform viewBox/group frame-driven, không cần plugin mới. Kiểm license đúng 4.0.536 trước commercial use; không tự nâng theo docs mới | Source/film record P-2 cũ; không có runtime P-1 engine-v1/node_modules tại kiểm hiện tại |
| [pixijs/pixijs](https://github.com/pixijs/pixijs) `65552017d23255c1442a7d4ac7f0d49e3225fb1d` | Container/layers, transforms, masks, render groups/cache cho cảnh lớn | [MIT pin](https://github.com/pixijs/pixijs/blob/65552017d23255c1442a7d4ac7f0d49e3225fb1d/LICENSE) | Hữu ích khi nhiều sprite/layer/particle; không có sẵn toàn bộ movie export pipeline; thêm một renderer lúc này không giải quyết chất lượng motion | Chỉ nghiên cứu docs/license, chưa clone/cài/test |
| [godotengine/godot](https://github.com/godotengine/godot) `5d1cd20f9117e4721fce626454e2323eb9462d0a` | Camera2D, scene editor, AnimationPlayer, offline Movie Maker 2D/3D | [MIT pin](https://github.com/godotengine/godot/blob/5d1cd20f9117e4721fce626454e2323eb9462d0a/LICENSE.txt); third-party notices riêng | Đáng xem nếu cần author keyframe bằng GUI và nhiều cảnh; là thay workflow/editor, quá rộng cho fixed camera pilot. Tài liệu Movie Maker ghi offline capture video/audio, không có nghĩa tự có choreography | Không thấy executable PATH; chỉ nghiên cứu, chưa tải binary/clone/build |

## Cách thử upstream nhỏ nhất trước khi viết thêm

1. Khôi phục đúng locked dependencies của action-toolkit trong phạm vi kiểm dev; giữ 3.17.2/Vite4 graph trước, không `latest`.
2. Dùng nguyên [camera example upstream tại pin](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/packages/docs/docs/getting-started/camera.mdx): Camera bọc Rect/Circle; centerOn/rotation/zoom/reset. Chứng minh preview và export cùng scene. Đây là reuse example cụ thể, không viết camera mới.
3. Xuất vài giây PNG sequence và MP4; kiểm số frame, resolution, fps, seek đầu/giữa/cuối, không missing frame. Cho render lại frame 0/30/60 bất kỳ nếu dùng Remotion để phát hiện animation phụ thuộc realtime.
4. Chỉ sau đó thay Rect/Circle bằng một asset gốc đơn giản, tách background/foreground. Đưa cast/project asset vào không làm thay đổi engine contract.

**Chưa chạy các bước trên.** Parent chia phạm vi research; hiện thiếu runtime và restore tooling. Không dựng example mới để che một upstream example chưa được chứng minh. Không có benchmark thời gian/RAM/FPS hay video quality assertion.

## Thiết kế đơn giản hơn mẫu, dùng được để quyết định sau nghiên cứu

- Dọc 1080×1920, preview giảm scale; camera cố định ngang, một nền hành lang/cửa thiết kế gốc.
- Một shot toàn, có thể một cut-in ngắn rồi trở lại shot toàn; tuyệt đối không để zoom che mất chân hoặc tay đang chạm cửa.
- Background vector palette hạn chế, sàn và một vật cản; không đổi canyon → corridor, không orbit, không motion blur toàn cảnh, không AI depth/generative background.
- Scene data giữ world coordinates và render layers ổn định; camera chỉ biến đổi view. Door/contact positions cần thống nhất với dev motion, không đặt lại tọa độ sau cut.
- Nếu sau này muốn chiều sâu: thêm 2–3 lớp nền với chuyển động tương đối nhỏ, đánh giá tính dễ đọc trước; không cần Pixi/Godot chỉ để parallax.

Đây là đề xuất kỹ thuật để PM/BA tổng hợp, chưa là storyboard hoặc lệnh render.

## Nguồn chính đã đọc

- [MC camera docs](https://motioncanvas.io/docs/camera/) web fetch timeout, đã đọc file local đúng SHA nêu trên; source `packages/2d/src/lib/components/Camera.ts` hiện diện. Camera chỉ orthographic, không suy diễn thành full 3D.
- [MC rendering docs](https://motioncanvas.io/docs/rendering/): native renderer lưu sequence ảnh, có range/scale/fps; image sequence có thể chuyển bằng FFmpeg. Điều này xác nhận fallback có tài liệu, không chứng minh local FFmpeg hoạt động.
- [Remotion Sequence](https://www.remotion.dev/docs/sequence), [CLI render](https://www.remotion.dev/docs/cli/render), [license](https://www.remotion.dev/docs/license). Docs hiện hành có thể chứa API mới hơn 4.0.536; không đem transition mới vào version cũ mà chưa kiểm.
- [Pixi Container docs](https://pixijs.com/8.x/guides/components/scene-objects/container): grouping/transforms/order/cache; không mô tả một offline movie exporter hoàn chỉnh.
- [Godot Camera2D](https://docs.godotengine.org/en/stable/classes/class_camera2d.html), [Creating movies](https://docs.godotengine.org/en/stable/tutorials/animation/creating_movies.html): offline render/AnimationPlayer; chưa đánh giá Godot binary với GPU host.

Source licenses không bao gồm mặc nhiên nhạc, font, mô hình, nhân vật hay asset mẫu. Không tải footage của creator để tái dùng.
