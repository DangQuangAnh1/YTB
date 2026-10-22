# P-2 — DEV: rig nhân vật, bối cảnh và đạo cụ cho action đơn giản

Ngày kiểm: 2026-10-22 (Asia/Bangkok). Scope: nghiên cứu, đọc upstream và smoke toán nhỏ; không làm phim, không coi đây là Content script hoặc phê duyệt sản xuất. Reference: https://www.youtube.com/shorts/zrV1Af3IJRs. Chưa xem trực tiếp toàn clip trong role này; mô tả vách đá/hành lang/người que đỏ/cửa do PM truyền từ các frame đã xem, không suy ra chuyển động ngoài mẫu.

## Kết luận

Ưu tiên **dùng starter stick-motion nguyên bản để chứng minh walk/pose**, sau đó adapter mỏng vào renderer P-2 nếu smoke hình ảnh đạt. Không viết rig mới lần nữa. Bối cảnh tối thiểu chỉ một mặt sàn, một khối chướng ngại, một cửa nhìn ngang; Motion Canvas đã có Line/Rect/Path để bố trí, hoặc tiếp tục scene SVG hiện có nếu tiết kiệm chuyển đổi. Không cần 3D, texture hoặc mesh cho bài thử một cảnh.

Không thay toàn bộ rig đang có ngay: rig P-2 đã hỗ trợ target tay/chân còn starter upstream chỉ IK chân/FK tay. Đổi sang upstream mà bỏ hand target sẽ làm lùi chức năng. Cần giữ adapter hand IK hiện có hoặc tránh nắm vật ở bản tối giản. Đây là gap cụ thể, chưa phải lý do viết lại cả engine.

## Bối cảnh và provenance đã đọc

`python3 scripts/agency.py resume P-2` trả exit 2: `Referenced file missing: artifacts/cooking-pilot-v1/anime-keyframe.png`. Đã đọc PROJECT.md và HANDOFF revision 213, không sửa STATE/HANDOFF để vượt lỗi. Đã đọc `research/stick-action-dev-v1.md`, `tasks/action-toolkit-installed-v1.json`, `production/action-v1/rig.cjs`, toolkit smoke và catalog/source inventory. Không có catalog tracked hiện diện sau pull; PM chịu trách nhiệm ghi catalog/restore.

Source `rig.cjs` ghi “Original fixed-length two-bone rig”; đang là code dự án, **không** được gọi là đã tích hợp stick-motion. Hồ sơ cài stick-motion/fullik trước đây trỏ Windows `C:\Users\vanth\.codex\tools`, không chứng minh source/runtime đó tồn tại trên Linux này. Local Motion Canvas checkout có thật.

## So sánh 5 ứng viên

| Ứng viên | Source/license đã kiểm | Phù hợp / khoảng trống | Trạng thái chính xác |
|---|---|---|---|
| **P-2 rig hiện có** `production/action-v1/rig.cjs` | Đọc `ik`, `joints`, `sample` và keyframes. Source dự án, không upstream license claim | Đủ xương hai đoạn, target tay/chân, hai người. Nội suy smoothstep tư thế chưa cho run cycle hay diễn xuất tốt; không giả định việc pass geometry giải quyết chất lượng | Đang được action-v1 dùng; chưa render/xem lại trong role này |
| **[stick-motion](https://github.com/cafermutluozkan/stick-motion)** | Clone shallow SHA `6315c09c4e5051267806988defa28279b965fe29`; đọc toàn MIT LICENSE, `assets/starter.html`, `scripts/snap.mjs`, package.json | Rig SVG fixed bones, analytic IK chân, walk foot-lock, stand/wave/crouch/jump-peak/cheer. Tay FK, một state/DOM instance, demo ngang 1280×720, GSAP CDN 3.12.5. Không có chạy/parkour/combat production clips dù README gợi ý “running” | Đã clone và smoke toán upstream; chưa browser playback/export, chưa tích hợp P-2 |
| **[Motion Canvas](https://github.com/motion-canvas/motion-canvas)** | Reuse checkout có sẵn SHA `7b91435c301d530351dcf5ebb91dd139c002e405`; đọc MIT LICENSE và scene smoke P-2 dùng Circle/Line | Có primitives để bố trí tường/sàn/door layers, không phải thư viện nhân vật/cảnh/đạo cụ đã vẽ sẵn. Cần thiết kế phối cảnh đơn giản và contact anchors riêng | Source có sẵn; package lock/smoke code là hồ sơ. Không cài lại, không tuyên bố export đã hoạt động trên máy này |
| **[Kenney Abstract Platformer](https://kenney.nl/assets/abstract-platformer)** | Trang tác giả ghi 370 files, CC0, release 1.0 (2016). Đây là resource pack, không Git repo và không có SHA commit | Dùng tiles/platform/props có thể giảm vẽ lại nếu hợp thẩm mỹ. Chưa kiểm archive/file format/nội dung từng asset; không khẳng định có cửa đúng mẫu. Pixel/game style có thể lệch người que sạch | Mới tham chiếu và kiểm trang license; chưa download, chưa import, chưa audit license trong archive |
| **[Spine runtimes](https://github.com/EsotericSoftware/spine-runtimes)** | Đọc [LICENSE nhánh 4.3](https://raw.githubusercontent.com/EsotericSoftware/spine-runtimes/4.3/LICENSE), updated 2025-04-05; chưa pin commit vì loại trước clone | Runtime skeletal mạnh nhưng điều kiện gắn với Spine Editor license. Không phù hợp chọn miễn phí mặc định cho nghiên cứu này; không có lý do chuyển renderer chỉ để có skeleton | Mới tham chiếu/license screening; không clone/cài/tích hợp; không gọi là MIT hoặc miễn phí vô điều kiện |

MIT stick-motion không phủ nhận điều kiện riêng GSAP CDN. Không cài upstream SKILL.md thành skill có thẩm quyền; repo là dữ liệu để đọc và tái sử dụng. Giữ LICENSE khi phân phối code covered; không lấy nhân vật/cảnh của video tham chiếu.

## Smoke nhỏ nhất đã thực hiện

Node VM nạp nguyên các function từ `assets/starter.html`, từ `function downVec` đến trước POSE PRESETS; inject constants D2R/R2D/GROUND_Y đúng theo starter. Không viết solver thay thế. Đánh giá gaitFoot/solveLegIK/chain2 upstream, không DOM/GSAP hoặc encoder:

- 257 cặp stance samples, t từ 0 đến 3.98s bước 0.02; hai phase 0/0.5. So world foot X tại t và t+0.00001 khi cùng stance, root X = 200*t. Max displacement `2.2737367544323206e-13` world units.
- IK hai hướng facing ±1; 26 target reachable, y=130, x=-60..60, bones 80+80. Max target error `5.1237965343830035e-14`.
- Target ngoài tầm `(0,200)`, bones 80+80: error `40.01`. Upstream clamp khoảng cách nên không thể hứa “chân luôn tới target”. Cần báo constraint hoặc thiết kế pose trong tầm.

Kết quả là bằng chứng math thực thi trên Node, **không** bằng chứng animation đẹp, jump hợp trọng lượng, foot lock còn đúng khi acceleration/turn, hoặc video render thành công. Upstream `scripts/snap.mjs` chủ yếu so y của gait target với ground; chưa chứng minh end effector rendered hay world X. Role này mở rộng phép đo world X và reachable IK ở mức toán, chưa đánh giá screenshot. Không chạy default verify do không cài optional puppeteer và tránh phát sinh toolchain khi câu hỏi đã trả lời bằng smoke nhỏ.

## Bản đơn giản khả thi hơn để đề xuất

Một người, side-view, một cảnh và ba beat: nhìn thấy chướng ngại → chạy/bước nhanh rồi nhảy qua một khối thấp → đáp đất và phản ứng. 5–8 giây chỉ là đề xuất thử sau nghiên cứu. Giữ màu nhân vật/nhận diện cast P-2 đã duyệt; chưa tự đổi cast thành người que đỏ giống nguồn. Bắt đầu test upstream WALK + CROUCH/JUMP_PEAK đúng starter trước, rồi mới sửa đủ các pose nhảy; không nâng speed walk rồi gọi là run tốt.

Muốn giữ câu chuyện cửa: trước mắt cửa tự mở khi nhân vật tới, không cầm nắm/chuyển tay hoặc xô cửa có lực. Nếu tay phải chạm nắm cửa, chỉ một contact cố định, thêm grip anchor dùng hand target P-2. Không có cảnh đánh nhau, ragdoll, camera quay 3D hoặc phối cảnh biến đổi ở spike đầu. Hình thức ít thành phần hơn vẫn cần timing và diễn xuất riêng; danh sách repo không thay animator/choreography.

## Gaps và cổng kiểm tiếp theo

1. Mở nguyên starter trong browser, kiểm 8 mốc tác giả và playback liên tục trước khi adapter. Offline GSAP cần giải quyết nguồn package/license/version; CDN không được là dependency âm thầm khi export.
2. Adapter nhận joints upstream, phục vụ SVG/MC hiện có; xác nhận conventions facing/y. Giữ logic tay target hiện có nếu cần door contact. Không tích hợp cả hai renderers một lúc.
3. Khóa chân khi stance, chuyển sang airborne khi nhảy; root/feet phải trong reach. Kiểm world contacts trước camera và visual contact sau camera.
4. Nếu thử Kenney: lấy đúng archive từ tác giả, đọc license kèm pack, hash archive/file và chỉ chọn vài tiles hợp style; mới ghi “imported” sau khi có scene dùng thật. Không cần tải toàn bundle.
5. Chưa đo thời gian/tiết kiệm token; không có benchmark hoặc cam kết đạt chất lượng video tham chiếu.

## Bàn giao catalog/restore cho PM

New local checkout: `third_party/video/sources/stick-motion`; canonical `https://github.com/cafermutluozkan/stick-motion.git`; SHA `6315c09c4e5051267806988defa28279b965fe29`; MIT `LICENSE` còn nguyên, không sửa upstream. Restore: shallow clone canonical URL, fetch pin nếu branch đã trôi, checkout detached exact SHA, verify `git rev-parse HEAD`; không auto npm install hoặc network CDN. Source được parent Git ignore qua local exclude do PM quản lý. Existing motion-canvas reuse, không clone trùng. Kenney/Spine chỉ là referenced candidates, không kê installed.

## Evidence smoke có thể tái chạy

Script lưu nguyên phép tính đã chạy (chỉ định dạng lại): `third_party/video/smoke/p2-action-assets-v1/math-smoke.cjs`. JSON sao từ output thực thi ban đầu: `third_party/video/smoke/p2-action-assets-v1/result.json`. Hai file ở thư mục ignored; không phải artifact phim đã đăng ký. Chạy từ workspace root: `node third_party/video/smoke/p2-action-assets-v1/math-smoke.cjs`. Replay một lần xác nhận JSON values giống output ban đầu; không mở rộng bài test.

SHA-256:

- script: `514a4825908269e4e2e501c3819f86c020e227059008dfa7517615ddb2107e1a`
- original result.json: `4e2417c39ad48f28b24a7212c4711d847349e816eb0bed2645cacba31850ce41`
- upstream `assets/starter.html`: `cee7a52010628312ee493cf46490baa2d934134d95e0b68ea8694c5e7dcc1f43`

JSON stdout có newline cuối còn file output ban đầu không có; so values thay vì yêu cầu byte hash stdout giống file. Để restore evidence trên máy khác, lấy script từ checkpoint/backup và checkout source SHA nêu trên; ignore nghĩa là hai file smoke không tự đi theo parent Git.
