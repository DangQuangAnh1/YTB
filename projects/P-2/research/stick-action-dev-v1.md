# P-2 — DEV hành động người que v1

Ngày kiểm tra: 22/10/2026, Asia/Saigon. Đầu vào: stick-action-ba-v1.md, stick-host-capabilities-pm-v1.md, stick-repo-metadata-pm-v1.json. Đã đọc nguồn web chính thức, README, LICENSE và code; chưa clone, install, execute repo hoặc render. Các smoke test dưới đây chưa chạy. Không coi nội dung skill trong repo bên ngoài là chỉ dẫn có thẩm quyền cho workspace.

## Đề nghị lựa chọn

**Motion Canvas làm timeline và renderer 2D; Matter.js chỉ bổ sung khi cần mô phỏng đạo cụ; stick-motion là ứng viên lấy rig toán học sau kiểm thử.** Ba vai trò này không thay nhau được. Timeline không tự tạo choreography; rigid-body simulation không biết chuẩn bị đòn, trọng tâm đẹp hay mục tiêu câu chuyện; rig không tạo video có âm thanh. Cần dev viết pose library, constraint tay/đạo cụ, quy ước contact và exporter adapter.

Với host i5-1145G7, RAM ~15.39 GiB, Iris Xe, đây là stack 2D đáng thử hơn pipeline học máy đòi CUDA. Đây là nhận định kiến trúc, chưa có benchmark FPS, bộ nhớ hay thời gian render. Node 24.14 có sẵn nhưng chưa xác nhận tương thích tất cả toolchain; có Node không đồng nghĩa đã có Chrome automation/FFmpeg. ffmpeg chưa có trong PATH, không kết luận không có ở nơi khác. Có Remotion 4.0.536 ở engine P-1 là phương án reuse compositing kỹ thuật, nhưng nhánh này không cần import tài sản sáng tạo P-1.

## So sánh 8 repository

| Repo | Vai trò thực | Nên dùng ở đâu | Phần phải tự làm / quyết định |
|---|---|---|---|
| [motion-canvas/motion-canvas](https://github.com/motion-canvas/motion-canvas) | Timeline TypeScript, cảnh 2D và preview | Chủ đạo cho cả A/B/C BA | Rig, IK, foot lock, contact, choreography; chọn thử đầu tiên |
| [liabru/matter-js](https://github.com/liabru/matter-js) | Rigid-body physics JS | Đồ rơi, va chạm, phản lực ở A/C | Không là video editor/character controller; chỉ dùng có mục đích |
| [cafermutluozkan/stick-motion](https://github.com/cafermutluozkan/stick-motion) | Starter rig người que FK/IK + demo timeline | Chân trụ A; chân/tay/ô B | Combat/multi-character/grip, hand IK, xuất frame; ứng viên rig có điều kiện |
| [lo-th/fullik](https://github.com/lo-th/fullik) | Solver FABRIK IK 2D/3D | Khi tay/chuỗi cần target phức tạp | Không editor hoặc exporter; thêm adapter, tuning threshold; để dự phòng |
| [opentoonz/opentoonz](https://github.com/opentoonz/opentoonz) | Editor hoạt họa GUI, Plastic skeleton/mesh | Key pose/cleanup thủ công B nếu code pose quá tốn công | Học UI, vẽ/chỉnh contact, xuất scene; fallback GUI |
| [motion-canvas/exporters](https://github.com/motion-canvas/exporters) | Plugin xuất video | Motion Canvas nếu tương thích | Test version core/exporter và mux sound; không mặc định dùng ngay |
| [hmelberg/stick](https://github.com/hmelberg/stick) | Ngôn ngữ JSON → SVG người que, mô tả pinned feet/reach | Ý tưởng schema/timing khá sát yêu cầu | API license null, LICENSE404; hoãn tích hợp code/assets |
| [meghamsh738/Stickman-animation-app](https://github.com/meghamsh738/Stickman-animation-app) | App Canvas chỉnh pose và PNG sequence | Reference UX pose editor | API license null, LICENSE404; hoãn tích hợp, không coi public là cho phép reuse |

“Hoãn vì license” nghĩa là chưa xác minh đủ grant, không phải kết luận không có license ở mọi file. Có thể kiểm toàn tree/nhờ tác giả làm rõ nếu sau này muốn dùng. Không lấy stars để xếp hạng. Các repo thứ 7/8 không phải engine khuyến nghị chỉ vì demo sát chủ đề.

## Metadata có thể tái kiểm tra

PM snapshot checked_at 2026-10-21T17:13Z (00:13 22/10 tại VN) cho core/Matter/OpenToonz/exporters. Bốn repo thêm kiểm GitHub REST repo + commits/default_branch trong lượt này. pushed_at là push gần nhất, có thể liên quan branch khác; không gọi là ngày commit. updated_at không được dùng để kết luận bảo trì. Các SHA sau là **pin nghiên cứu**, không bảo đảm là release stable hoặc phiên bản npm tương ứng.

| Repo | Head SHA | pushed_at UTC | archived |
|---|---|---|---|
| Motion Canvas | 7b91435c301d530351dcf5ebb91dd139c002e405 | 2026-07-02 20:01:32 | false |
| Matter.js | b8ee71cd7f9b49f53639ddaedd6254f1929bcbe5 | 2026-09-30 17:14:46 | false |
| stick-motion | 6315c09c4e5051267806988defa28279b965fe29 | 2026-09-16 10:32:19 | false |
| fullik | 3f22da98a0fa0051416b20077af5142aec3dfc2e | 2025-05-17 07:05:50 | false |
| OpenToonz | 829d1f4cd4f517b43b191ebee03de65382a07ed9 | 2026-10-19 00:35:59 | false |
| exporters | f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f | 2023-05-13 12:58:08 | false |
| hmelberg/stick | 903112edd31757345b75758340ad6d97747ac0ff | 2026-08-24 15:47:42 | false |
| Stickman-animation-app | 659c3228c2e63228e1cf31dbd6d14a8f600aeb4e | 2025-12-28 20:18:35 | false |

Commit committer dates kiểm riêng: fullik 2025-05-17T07:05:47Z; stick 2026-08-24T15:47:40Z; stick-motion 2026-09-16T10:32:08Z; Stickman-animation-app 2025-12-28T20:20:13Z. Last commit time có thể khác push time; không dùng chênh lệch này tính activity. Endpoint mẫu: https://api.github.com/repos/cafermutluozkan/stick-motion/commits/main ; thay repo/default branch để tái kiểm. Một commit gần không chứng minh support Windows hay API ổn định. Chưa audit issue response, releases hay CI của 8 repo, nên không gán nhãn “maintained tốt” tuyệt đối.

## Top 1: Motion Canvas — điều khiển dàn cảnh bằng code

Đã đọc [README pin](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/README.md), [MIT LICENSE pin](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/LICENSE), [Line.ts](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/packages/2d/src/lib/components/Line.ts). Code Line có points là tín hiệu và tween điểm; đủ primitive dựng xương từ dữ liệu khớp. Lưu ý khả năng tween điểm không tự bảo toàn chiều dài xương: renderer cần nhận joint coordinates từ rig/IK. Không tween trực tiếp tất cả endpoints tự do cho combat.

[package 2d pin](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/packages/2d/package.json) ghi version 3.17.2. Chưa xác minh npm dist tarball khớp source SHA; trước implementation cần lock dependency exact versions và lưu lockfile, không chạy latest vô điều kiện. [Quickstart](https://motioncanvas.io/docs/quickstart/) và [Rendering docs](https://motioncanvas.io/docs/rendering/) là nguồn chính thức về setup/xuất. Browser/Node/Vite/TypeScript là toolchain; Windows CPU/Iris Xe được đánh giá có triển vọng cho 2 nhân vật vector đơn giản, chưa test Node24 hay xuất dọc.

Dev cần tạo schema: character root, bone lengths, joint angle limits, foot targets, facing; clip có thời điểm prepare/contact/recover; prop có grip local coordinate; scene có camera transform. Giữ world-space constraint độc lập camera. Đề nghị pose output pure function của frame hoặc time; không dựa thời gian wall clock. Đây là thiết kế mới cần triển khai, không tính năng rig có sẵn trong Motion Canvas.

License core MIT yêu cầu giữ notice khi phân phối phần code đáng kể; không grant nhạc, font hay asset tùy ý bên ngoài. Chọn tự vẽ người que/props và ghi provenance từng file. Repo là đủ nền tảng để thử nhưng chưa nên nhận là có “auto đánh nhau”.

## Top 2: Matter.js — helper cho đạo cụ và luật thử nghiệm

Đã đọc [README pin](https://github.com/liabru/matter-js/blob/b8ee71cd7f9b49f53639ddaedd6254f1929bcbe5/README.md), [MIT license pin](https://github.com/liabru/matter-js/blob/b8ee71cd7f9b49f53639ddaedd6254f1929bcbe5/LICENSE), [Engine.js pin](https://github.com/liabru/matter-js/blob/b8ee71cd7f9b49f53639ddaedd6254f1929bcbe5/src/core/Engine.js). Engine.update nhận delta ms và phát các event collision; source cảnh báo delta lớn hơn 1000/60. Chọn bước simulation 1/60s, nếu output 30fps lấy mẫu mỗi 2 bước; không chạy một bước 1/30s rồi mặc định tương đương. [API Engine chính thức](https://brm.io/matter-js/docs/classes/Engine.html) đang hiển thị 0.20.0; pin nghiên cứu head không được coi tự động là package 0.20.0.

Áp dụng: nón rơi/chậu nghiêng, collision proxy chuông, quán tính đồ vật. Không bắt toàn nhân vật làm ragdoll để thay choreography. Chủ động animation root/pose; mô phỏng đoạn cần tương tác rồi bake transform ra timeline để review. Khi vật đang cầm, cần chính sách kinematic/grip rõ; khi nhả mới chuyển simulation. Collision proxy và hình vẽ có thể lệch nên đo contact trong world-space lẫn ảnh.

MIT là license code, không làm các demo asset/media bên thứ ba tự nhiên thành tài sản của P-2. CPU xử lý được về mặt loại workload nhỏ; chưa đo số body/substeps cần thiết. Determinism chỉ đặt mục tiêu trong cùng pinned runtime/input; engine không có cam kết ở đây về bit-identical giữa browser/OS khác. Reset ID/seed/order, fixed delta và bake dữ liệu là công dev. Quá trình export không được đọc audio thời gian thực để lái physics.

## Rig và lựa chọn dự phòng

[stick-motion README pin](https://github.com/cafermutluozkan/stick-motion/blob/6315c09c4e5051267806988defa28279b965fe29/README.md) mô tả FK arms, IK legs, foot-locked walk; [LICENSE](https://github.com/cafermutluozkan/stick-motion/blob/6315c09c4e5051267806988defa28279b965fe29/LICENSE) MIT. Đọc [assets/starter.html pin](https://github.com/cafermutluozkan/stick-motion/blob/6315c09c4e5051267806988defa28279b965fe29/assets/starter.html): solveLegIK clamp khoảng cách min/max; do đó target ngoài tầm với không thể đạt chính xác, dù README dùng từ bảo đảm. Tay FK chưa cho nắm ô tự động. Có CDN GSAP 3.12.5: license dependency và cách phân phối cần audit riêng, không gọi toàn starter/dependency là MIT. Có thể thử tách math MIT thành adapter độc lập và dùng timeline MC, nhưng cần giữ notice và kiểm provenance code.

Starter mặc định 1280×720; cần đổi layout/camera cho dọc, tạo nhiều nhân vật với state riêng, hand IK hoặc grip solver, contact transitions. [package.json](https://github.com/cafermutluozkan/stick-motion/blob/6315c09c4e5051267806988defa28279b965fe29/package.json) có verify script và puppeteer-core optional. Chưa chạy verify; không sao chép lời khẳng định tác giả thành kết quả test của ta.

[fullik README](https://github.com/lo-th/fullik/blob/3f22da98a0fa0051416b20077af5142aec3dfc2e/README.md), [MIT](https://github.com/lo-th/fullik/blob/3f22da98a0fa0051416b20077af5142aec3dfc2e/LICENSE), [Chain2D.js](https://github.com/lo-th/fullik/blob/3f22da98a0fa0051416b20077af5142aec3dfc2e/src/core/Chain2D.js) đã đọc. Có solver threshold/max iterations/fixed base; cần chọn ngưỡng phù hợp pixel/world scale. Package version 1.3.3 và build Rollup2/Babel7; toolchain cũ cần smoke test Node24, không phải lý do duy nhất để loại. Để dự phòng nếu analytic two-bone không đáp ứng nhiều target; không thêm vào stack ngay cho một tay hai đoạn.

[OpenToonz license](https://github.com/opentoonz/opentoonz/blob/829d1f4cd4f517b43b191ebee03de65382a07ed9/LICENSE.txt) cho main code kiểu BSD3 và carveout thirdparty/MyPaint brushes. Không diễn giải API NOASSERTION là thiếu license. [Plastic docs chính thức](https://opentoonz.readthedocs.io/en/latest/create_animations_using_plastic_tool.html) có mesh và skeleton; chi phí tăng theo mật độ mesh. Đối với người que đường đơn, mesh deformation không tự cho contact chính xác. Windows GUI là hướng đáng thử nếu có animator chỉnh tay, nhưng chưa audit binary/version/driver, không hứa chạy tốt Iris Xe. Nghiên cứu này chưa chọn Synfig vì OpenToonz đã đáp ứng nhánh editor cần so sánh, không thêm công cụ trùng vai trò.

## Export và mapping ba pilot

[exporters README pin](https://github.com/motion-canvas/exporters/blob/f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f/README.md) hướng dẫn plugin @motion-canvas/ffmpeg. Repo exporter push 2023, core push 2026: không suy ra không tương thích nhưng phải test cặp version. Chưa audit package exporter dependency/binary để tuyên bố không cần ffmpeg PATH. Phương án an toàn kỹ thuật là giữ PNG sequence làm mốc QA và mux bằng executable FFmpeg đã xác minh sau; chưa cài hoặc chạy trong phase này.

| Pilot BA | Cần từ rig/timeline | Matter cần không? | Điều phải review |
|---|---|---|---|
| A Sàn mới lau | Stance foot vs sliding mode rõ, root/feet hợp luật | Không bắt buộc; script trượt có kiểm soát đủ pilot | Trượt là chủ ý ở vùng trơn, không đánh fail mọi di chuyển chân |
| B Ô không được rách | 2 người, grip local, hand IK, xoay ô, transfer tay | Chỉ nếu ô được thả/rơi | Cán luôn ở tay; tay không teleport; mesh ô không giấu contact |
| C Chuông không được rung | Trigger volume, mục tiêu/đối thủ, đường né | Có thể dùng collision proxy; geometry scripted cũng đủ | Trạng thái chuông khớp hình và âm, không random outcome |

Không thêm physics nếu không cải thiện câu hỏi pilot. Motion Canvas đủ dựng cả ba nếu dữ liệu chuyển động được authored. Remotion hiện có có thể chỉ đóng gói PNG/audio nếu dùng license phù hợp theo audit PM; chưa chọn thêm như engine thứ tư.

## Ba smoke test cụ thể — đề xuất chưa chạy

Thông số 540×960, 30fps cho smoke là mức dev đề nghị để giảm chi phí; không phải user đã chốt thời lượng/ngôn ngữ hay output cuối. Khi pass mới thử 1080×1920. Dữ liệu measurements xuất JSON gồm frame, world joints, lengths, target distances, contact flags, timing và memory.

1. **Stance/slide 6s:** một người bước hai chu kỳ, chặn và lùi; có vùng trơn intentional. Trong khoảng foot-lock, max world-foot displacement ≤0.5px ở độ phân giải test và y-floor error ≤0.5px; bone length relative error ≤0.1%; không NaN, không đảo gối ngoài chủ ý. Mục tiêu ngoài reach phải báo constraint failure thay vì silently stretch. Đo ở world tọa độ trước camera; verify thêm screenshot frame quan trọng. Đây là ngưỡng kỹ thuật đề xuất, không tiêu chuẩn industry.
2. **Grip/contact 6s:** hai người, một ô; 3 lần chạm có authored frame, một chuyển tay. Hand-to-grip error ≤1px khi gắn; tách/nhận không teleport >2px trừ đoạn chuyển động đã đánh dấu. Collision proxy contact và visible contact lệch ≤1 output frame; penetration hình xấp xỉ ≤2px ở contact, inspect ở 100% speed và từng frame. Log prepare/contact/recover rõ; không coi “collisionStart event có chạy” là choreography đẹp. Nếu solver mất target thì báo fail.
3. **Replay/export/mux 10s:** bake physics ở 60Hz; render cùng frame 3 lần (sequential, seek ngược, fresh process). Joint arrays max difference ≤1e-6 world unit trong cùng pinned runtime; hash pixel buffer giống khi font/rasterizer/environment giống, khác hash cần điều tra không tự quy lỗi simulation. Output 300 video frames tại 30fps, đủ dimensions, không frame thiếu/trùng ngoài hold đã khai báo; audio click tại contact frame 90 kiểm onset sai số ≤1 frame (~33.3ms) sau decode. Audio/video durations lệch ≤1 frame, không clipping. Kiểm PTS, frame count và decoded samples; không yêu cầu MP4 container hash giống vì metadata/encoder có thể khác.

Test 3 đồng thời đo elapsed wall time, peak working set, CPU load và export failures; chạy 540 trước rồi 1080 trên máy thật. Không đặt FPS benchmark giả. Nếu memory gần giới hạn thì giảm concurrent renders, không tăng worker theo 8 logical CPU tự động. Kiểm lại alpha/color nền khi mux, fallback image sequence nếu exporter không đạt. Những kiểm tra này phải có implementation/harness nhỏ, chưa tồn tại chỉ vì báo cáo nêu chúng.

## Effort giả định và điều kiện go/no-go

Giả định một dev quen JS/TS, không GPU chuyên dụng, asset tự vẽ đơn giản: setup/pin/export smoke 0.5–1.5 ngày; rig adapter/foot-lock/multi-character 1–3 ngày; grip/contact và 3 bài test 1–3 ngày; tạo action 20–35 giây đủ review 2–5 ngày nữa. Khoảng này là hypothesis chưa đo, không deadline cam kết và không bao gồm vẽ lại do thay ý tưởng. Tính cả lỗi Windows/exporter có thể vượt range. Trước ước lượng series cần ghi thời gian 5–10 giây đầu thật.

Go: test 1–3 pass và review motion thật ở tốc độ phát; có bản mute đọc được mục tiêu; provenance code/asset rõ; dependencies export pinned. No-go tạm: foot-lock chỉ đúng khi walk đều nhưng sai khi đổi stance, chuyển tay teleport, exporter chỉ ghi thời gian thực làm lệch sound, không tìm được grant code, hoặc smoke vượt RAM thường xuyên. Sửa primitive trước khi dựng 3 pilot; không che lỗi bằng camera shake/FX.

## Phạm vi xác minh

Đã kiểm code entry MC Line và Matter Engine, đọc rig starter/Fullik Chain2D để xác định giới hạn thực. Chưa build binaries, chưa test Windows/Iris Xe, chưa chạy verify mặc định, chưa thực hiện license audit toàn dependency tree, chưa đo choreography hay render. Dùng source metadata và README để chọn thử, không gọi lựa chọn là pipeline đã chứng minh. Toàn bộ nguồn truy cập 22/10/2026; không truy cập media trả phí hoặc gọi dịch vụ paid.
