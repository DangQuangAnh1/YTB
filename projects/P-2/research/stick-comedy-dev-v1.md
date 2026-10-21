# P-2 — DEV 1: Toolkit cho hài người que

22/10/2026; nghiên cứu repo, chưa cài/chạy/render. Đã đọc BA comedy v1 và ba hồ sơ host/metadata/license PM. Chỉ tạo tài liệu mới; không sửa P-1 hay operational state. Ngày metadata UTC 21/10 tương ứng đầu ngày 22/10 giờ VN.

## Kết luận có điều kiện

Shortlist **Motion Canvas** để diễn hoạt bằng code có preview; **Remotion 4.0.536** để dựng frame/timeline, chữ, audio và xuất nếu đáp ứng license; **Synfig** là phương án editor thủ công để so công chỉnh pose. Không cần ghép cả ba ngay: thử một đường code trước, so một đoạn tay-vật bằng editor nếu chỉnh code quá chậm. Motion Canvas và Remotion không có sẵn nhân vật người que biết diễn hài: rig, pose, nhịp và gag cần tự thiết kế. “Viết prompt là ra video” không phải kết luận của khảo sát này.

Host Windows i5-1145G7 4c/8t, RAM khoảng 15.39 GiB, Iris Xe; không giả định CUDA. Node24.14.0 đã có; Remotion 4.0.536/node_modules ở P-1 chỉ là nền tảng có sẵn, **không chứng minh** Node24 hoặc scene P-2 chạy được. ffmpeg không trên PATH; không suy ra máy không có ở nơi khác. Chưa benchmark thời gian render. [Host local](stick-host-capabilities-pm-v1.md)

## So sánh 7 repo

Metadata từ API GitHub PM: dùng **pushed_at**, không dùng updated_at/stars làm bảo trì. Tất cả archived=false tại lần kiểm. License ngoài top2 theo metadata/README, chưa audit toàn dependency. Link repo là primary. Mỗi SHA dùng để nhận diện snapshot, không tuyên bố commit đầu nhánh là release đã thử.

| Repo / loại | pushed_at UTC | Snapshot SHA | Có thể giúp gì / thiếu gì | License và quyết định |
|---|---|---|---|---|
| [motion-canvas/motion-canvas](https://github.com/motion-canvas/motion-canvas) — framework TS + preview editor | 2026-07-02 20:01:32Z | 7b91435c301d530351dcf5ebb91dd139c002e405 | Vector, generator timeline, signal tween; cần rig, IK/contact, biểu cảm và subtitle layout riêng | MIT đã đọc toàn LICENSE. Chọn 1 về diễn hoạt |
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) — React composition/render framework | 2026-10-21 17:08:11Z | b17f52258972fc1e16c21561d6540e86ede88fb6 | Frame chính xác, SVG/React composition; cần pose solver/choreography; không là skeletal editor dựng sẵn | Special Remotion License, **không MIT**, source-available; chọn 2 có điều kiện eligibility |
| [synfig/synfig](https://github.com/synfig/synfig) — vector/bitmap animation editor | 2026-10-18 11:49:37Z | 029b45e4275c6356f1b698b5bb3bc4c323787cc9 | README xác nhận tweening giảm vẽ từng frame, Windows; phù hợp chỉnh tay; chưa đọc bone/IK implementation nên không hứa rig tự động | GPLv3 theo README/API. Chọn fallback editor; output art kiểm quyền riêng |
| [pencil2d/pencil](https://github.com/pencil2d/pencil) — editor vẽ frame-by-frame | 2026-10-19 10:36:43Z | f953043ec2e6d6f393255718ac42c023958f8885 | Bitmap/vector, Windows, hợp smear/pose tay; không bằng chứng tự tween rig, số frame người vẽ vẫn nhiều | API GPL2; chưa audit file đầy đủ. Giữ làm bổ trợ diễn xuất, không core automation |
| [Wicklets/wick-editor](https://github.com/Wicklets/wick-editor) — web multimedia editor | 2023-03-06 16:32:41Z | f34f0d9512d7165e74c1910ea1aba9173ab8dec2 | Preview và authoring trên web; README hướng dẫn dev chỉ Mac/Linux, thiếu Windows | GPLv3 theo README. Hạ ưu tiên do pushed cũ và khoảng trống setup Windows, không gọi abandoned |
| [motion-canvas/exporters](https://github.com/motion-canvas/exporters) — **exporter plugin**, không animator | 2023-05-13 12:58:08Z | f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f | README hướng dẫn @motion-canvas/ffmpeg + vite plugin; dùng sau khi scene tồn tại | MIT theo PM API; phải test tương thích core mới, executable/dependency chưa audit. Không chọn riêng như bộ làm video |
| [kaomei/stickman-video-director](https://github.com/kaomei/stickman-video-director) — specialized stick **prompt/style library** | 2026-10-20 12:09:26Z | 70199c86911d84de9804441ce581eeb25142efba | README đọc toàn: lập proposal, prompt Gemini/Flow và lắp bằng editor; không local renderer/rig. Hai-character sitcom còn trong phần planned | MIT file search đọc được; preview/model output rights chưa audit. Loại khỏi core CPU pipeline vì không đáp ứng chức năng, không phải thiếu license/bảo trì |

Repo chuyên stick là kết quả tìm “site.github.com stickman animation editor license”, kiểm bằng API trực tiếp. Không lấy mô tả Reddit làm chức năng. Đã xác minh chuyên stick trên có MIT và push gần; **không bịa thiếu license để loại**. Một thư viện prompt có thể tham khảo khâu định hướng, nhưng user giao dev tìm công cụ hỗ trợ video; nếu cần chi phí/model ngoài thì phải giải quyết riêng trước thực thi, không tự dùng Flow.

## Đào sâu 1 — Motion Canvas

Đã fetch README và LICENSE **toàn văn**, source Line.ts đọc phần liên quan points/signals/tween tại SHA pin. [README pin](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/README.md), [LICENSE pin](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/LICENSE), [Line.ts pin](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/packages/2d/src/lib/components/Line.ts).

README xác định library TypeScript dùng generator và preview editor, hướng tới vector animation đồng bộ voice. Source Line.ts có points nhận signal values và tween điểm. **Suy luận kỹ thuật:** có thể ghép đầu tròn/thân và limb Line thành nhân vật, tween endpoint theo pose. Điều source này **không chứng minh**: IK dựng sẵn, bàn tay tự bám đồ vật, chống xuyên hoặc pose có diễn xuất. Những việc đó phải tự code hoặc choreography. Chỉ thấy primitive đủ dùng, chưa có reusable character production-ready.

Đề xuất data model riêng: proportions bất biến; pose gồm root position/rotation + joint angles; expression layer optional; props gắn parent vào hand socket trong khoảng frame cầm. Mỗi beat có start/end frame, easing, hold, sound cue. C1 dùng preset reach/tap/startle/push; C2 thêm seated/lean/pull; C3 thêm shared gaze/point/tug. Việc interpolate joint angles tốt hơn tween riêng mỗi đầu mút nếu muốn giữ chiều dài limb. Với cảnh đơn giản có thể FK trước, IK hai đoạn chỉ bổ sung khi tay phải chạm vị trí cố định.

Preview giúp sửa hold và anticipation nhưng vẫn là code-oriented; README nói edit một số khía cạnh, không xác nhận full visual skeletal timeline. Không đưa tool này cho Content như một editor kéo thả đã đủ mọi thứ. Node24 compatibility chưa chạy; không lấy hướng dẫn npm chung làm chứng nhận.

Xuất video là rủi ro độc lập. Repo exporter có push 2023 trong khi core 2026: phải pin package phiên bản tương thích, kiểm codec/audio. [Exporter README pin](https://github.com/motion-canvas/exporters/blob/f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f/README.md). Nếu plugin lỗi, frame sequence là phương án cần kiểm tra hỗ trợ thực tế và mux riêng; chưa gọi đó là đường đã hoạt động. Với audio timing nên ưu tiên WAV: repo examples cảnh báo mp3 có thể lệch audio dù waveform hiển thị đúng. [Examples README](https://github.com/motion-canvas/examples/blob/master/README.md)

MIT áp dụng code covered; không chuyển quyền cho mọi sample font/song/character. Giữ notice khi phân phối phần code phù hợp. Không tái dùng logo Motion Canvas làm nhận diện P-2.

## Đào sâu 2 — Remotion

Đã fetch README/LICENSE.md toàn văn và use-current-frame.ts toàn file tại SHA pin. [README pin](https://github.com/remotion-dev/remotion/blob/b17f52258972fc1e16c21561d6540e86ede88fb6/README.md), [LICENSE pin](https://github.com/remotion-dev/remotion/blob/b17f52258972fc1e16c21561d6540e86ede88fb6/LICENSE.md), [Source pin](https://github.com/remotion-dev/remotion/blob/b17f52258972fc1e16c21561d6540e86ede88fb6/packages/core/src/use-current-frame.ts).

Source hook trả frame trừ offset Sequence và áp playbackRate; hỗ trợ lý luận rằng tính pose từ frame có thể tái lập khi seek. **Đây không phải bằng chứng mọi render byte-identical:** cần pin font/browser/package/assets; side effect, random theo thời gian và decode media có thể phá tính tái lập. Tự thiết kế hàm poseAtFrame(frame, sceneData) không mutable simulation; vật bay dùng quỹ đạo tham số hóa. SVG line/circle/path đủ biểu diễn stick/prop, không cần 3D hoặc GPU NVIDIA. Mọi biểu cảm/rig/prop contact vẫn do P-2 tự làm.

Ưu thế thực tế là host đã có v4.0.536; song source HEAD khảo sát không thay thế audit version đó. Khi làm thử phải đọc LICENSE cài local và pin tất cả @remotion/* cùng version; không nâng major tự động. README hiện quảng bá editor/agentic tools nhưng không suy ra chúng đi kèm engine P-1 đã cài. Không sao chép asset hoặc sửa P-1 để thử.

License pin cho phép free trong các nhóm nêu rõ (individual, for-profit tối đa 3 nhân viên, nonprofit, evaluation chưa thương mại); ngoài eligibility cần Company License. Có giới hạn bán/cho thuê/licensing derivative của Remotion. Không tự kết luận user chắc chắn eligible; research nội bộ chưa thương mại là tình huống license tự nêu, nhưng trước commercial workflow phải đối chiếu entity thực. Không trả tiền hay cài mới ở phase này. LICENSE có báo thay đổi khi v5; vì vậy pin v4 cho evaluation và kiểm lại trước nâng cấp. Không dùng label npm của một package phụ làm license cho toàn Remotion.

## Map từng pilot BA vào toolkit

| Pilot | Có trong framework/editor | Phần P-2 phải tự làm | Đường ưu tiên / rủi ro |
|---|---|---|---|
| C1 “để sau thành đồ thật” | Motion Canvas: shape, point tween, timeline/preview; Remotion: frame composition và render | Rig 1 người, tap phone, pop/stack hộp có thứ tự, bóng/contact giả, 3 cấp escalation, sound cue | Thử Remotion direct SVG nếu giảm setup là ưu tiên; thử Motion Canvas nếu tốc độ chỉnh nhịp là trọng tâm. Không physics tự do |
| C2 “họp mọc rễ” | Tween shape/path, layer/sequence | Pose seated/lean/pull, ghế/rễ artwork tự tạo, mask chân, hold và reaction; có thoại thì subtitle/voice cue riêng | Motion Canvas hoặc Synfig thủ công cho biến dạng; Remotion hậu kỳ nếu cần. Không hứa deform tự nhiên từ một line |
| C3 “chia gió” | Vector path và frame timeline | Hai rig tránh xuyên, hướng nhìn, tay chỉ vạch, quỹ đạo giấy/gió, quạt rotate, staging dọc | Code choreography trên Motion Canvas/Remotion; Synfig nếu pose khó. Gió stylized không cần fluid simulation |

Reusable layer đề xuất: StickRig; expression presets không/mắt đơn; prop library bàn/phone/chair/fan/box; pose clips + transition; scene beat/timing; caption renderer; audio cue manifest; export manifest. Mỗi layer là **work dự kiến**, không artifact có sẵn. Chữ Việt nên load font local hợp quyền, không phụ thuộc network. Subtitle theo câu/beat, không tự bịa word timestamps; audio self-record hoặc tự tổng hợp tone, không lấy soundtrack demo.

## Smoke-test đề xuất — chưa chạy

Không phải pilot phát hành: một scene kỹ thuật **8 giây, 30fps, 240 frame**, portrait preview 540×960 rồi kiểm một đoạn 1080×1920. Dùng 1 rig, phone, 2 hộp và text “Để sau — sửa nhẹ — tiếng Việt: ă â ê ô ơ ư đ”. Scene không thay thế Content script. Cần xác nhận prototype nằm trong scope thực thi riêng trước chạy; nhiệm vụ hiện chỉ nghiên cứu.

1. Manifest pin runtime/packages/font/assets, render mode và scene JSON. Tạo hàm pose theo frame; không gọi Date.now/Math.random trong rendering. Nếu cần randomness, cố định seed và asset list. Không dùng simulation tiến dần phụ thuộc thứ tự seek.
2. Frames 0–29 establish; 30–44 anticipation; 45 tap/contact; 46–59 hộp pop; 60–89 hold/read; 90–119 reaction; 120–179 lần hai đổi cường độ; 180–239 payoff placeholder và settle. Đây là fixture kỹ thuật đo nhịp, không full kịch bản video được duyệt. Đặt cue rõ frame45/120; lưu beat table để reviewer đổi hold ±6 frame được.
3. Render/seek frame45,90,180 theo thứ tự đảo rồi so pose coordinates/contact với thứ tự tuyến tính. Hai lần render frame still cùng cấu hình nên hash ảnh khớp nếu pipeline deterministic; nếu antialias/browser khác thì ghi diff và pin môi trường, không che sai bằng threshold tùy tiện.
4. Tay chạm phone trong contact window, chân không trượt khi hold; limb length invariant trong dung sai định trước; object parent chuyển ở đúng frame. Kiểm visual contact ngoài assertion tọa độ: line che prop có thể vẫn sai dù tọa độ đúng.
5. Font chờ load; xem dấu Việt trên ảnh xuất, không chỉ preview. Test một dòng và hai dòng; không quá vùng safe dự kiến (platform safe area chưa xác nhận nên giữ margin bảo thủ và review).
6. Tạo WAV beep tự sinh tại cue, không speech API; mux audio và video xuất. Kiểm stream duration/fps/frame count bằng công cụ thực tế sau khi xác định ffprobe/encoder. Audio decoded onset so với frame mục tiêu trong ±1 frame là tiêu chí test đề xuất; kiểm cả điểm đầu và cuối tránh drift. Không claim test đạt khi chỉ waveform UI đúng.
7. Ghi wall time, peak RAM nếu đo được, render concurrency, lỗi browser/codec; bắt đầu concurrency thấp để không cạn RAM trên 16GB. So bản preview và full resolution, không lấy preview fps làm ETA export.
8. Pass khi export 240 frame, dấu Việt đầy đủ, contact/hold đúng, audio không drift và seek không đổi pose. Chưa đạt thì phân loại setup/export/rig/timing, không viết lại toàn engine. Chỉ sau đó mới ước lượng một pilot 20–40 giây.

**Commands:** chỉ dẫn từ docs/README, **chưa chạy**: Motion Canvas exporter README nêu `npm install @motion-canvas/ffmpeg` rồi add plugin; đó là unpinned ví dụ tài liệu, khi triển khai phải khóa version tương thích. Remotion CLI có dạng `npx remotion render <entry-point> <composition-id> <output-location>` trong [official docs](https://www.remotion.dev/docs/cli/render); không dùng npx @latest để vô tình đổi version. Không đưa lệnh checkout/install cụ thể cho repo chưa chọn; build monorepo không cần thiết nếu dùng package release.

## Công sức và điểm ra quyết định

Ước lượng **giả thuyết**, giả định dev quen TS/React: 0.5–1 ngày kiểm môi trường/export; 1–2 ngày rig/contact/timing fixture; thêm 1–3 ngày reusable props và một pilot ít pose; audio/chữ/QA thêm 0.5–1 ngày. Không cộng thành lịch cam kết vì chưa benchmark và chưa có script. C2/C3 có thể tăng đáng kể do đôi nhân vật/biến dạng. Nếu chỉnh ba pose mất nhiều thời gian hơn editor thủ công, dừng mở rộng abstraction và so một đoạn Synfig; không viết editor riêng trong phase này.

Khuyến nghị quyết định nhỏ: chọn **một** route cho fixture 8 giây; ưu tiên Remotion direct SVG vì package sẵn nếu license/runtime version audit ổn; Motion Canvas là lựa chọn ưu tiên lâu dài khi preview/tween sửa nhịp thể hiện lợi ích; Synfig là fallback cho diễn hoạt thủ công. Không dùng exporter như giải pháp tạo chuyển động, không coi thư viện prompt là renderer, không dùng GitHub star thay runnable evidence.

## Ledger kiểm chứng

Đọc primary ngày 22/10/2026: top2 README/LICENSE và code đã nêu; exporter/Synfig/Pencil2D/Wick README tại SHA pin qua raw GitHub; specialized README toàn văn + API repo/commit, LICENSE qua trang GitHub search. Metadata 6 repo đầu từ [PM JSON](stick-repo-metadata-pm-v1.json), license audit top2 tham chiếu [PM license JSON](stick-license-audit-pm-v1.json) và dev đọc lại toàn file. Chưa đọc toàn source engine, chưa audit binary/dependency trees, chưa cài binary editor, chưa chạy smoke-test, chưa đảm bảo Node24/exporter tương thích. Những khoảng trống này là tiêu chí thử tiếp, không được ghi thành pass.
