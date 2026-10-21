# P-2 — DEV 3: repo cho người que kể chuyện / giải thích

Ngày kiểm: 22/10/2026. Nghiên cứu, chưa clone/install/chạy/render repo. Đọc BA v1 và ba hồ sơ host/metadata/license do PM chuẩn bị. P-2 là một dự án ba dạng. Báo cáo này chỉ xử lý nhánh explainer; không chọn thay người dùng audience, ngôn ngữ hay thời lượng.

## Khuyến nghị

Chọn **Motion Canvas** làm ứng viên chuyên cho diagram có voice cue; chọn **Manim Community** làm phương án Python cho mô hình, toán và biểu đồ. **Remotion** là phương án tái sử dụng hạ tầng sẵn có, có điều kiện license và phải kiểm đúng phiên bản 4.0.536 đang cài. Không nên ghép cả ba vào một pilot đầu. Nếu mục tiêu làm nhanh pilot hệ thống bằng tool có sẵn, Remotion có lợi thế setup; nếu tối ưu workflow explainer lâu dài, Motion Canvas đáng spike; nếu công thức và biến đổi toán là trọng tâm, ManimCE hợp hơn. Đây là đánh giá thiết kế, chưa có benchmark tốc độ.

**Không repo nào trong shortlist tự cung cấp trọn gói người que + script đúng + voice Việt + diagram + fact-check + MP4.** Phần rig, pose library, dữ liệu sự kiện và kiểm tra claim vẫn phải viết. Đồ họa đơn giản và CPU local phù hợp hướng khảo sát; không cần mặc định CUDA hoặc model sinh video.

Host theo PM: Windows, i5-1145G7 4c/8t, RAM ~15.39 GiB, Iris Xe; Node 24.14, Git 2.41. Python phải dùng `.venv-p2/Scripts/python.exe`, PATH python là Store aliases. Chưa thấy FFmpeg trên PATH, không đồng nghĩa không có binary nơi khác. P-1 có Remotion 4.0.536/React19.2.3 nhưng không được coi asset hoặc quyền dự án P-1 tự chuyển sang P-2.

## So sánh 8 repo

Maintenance dùng `pushed_at` từ GitHub API, ngày UTC; không dùng `updated_at` hoặc sao để suy ra chất lượng. Các repo trong bảng đều `archived=false` khi kiểm. SHA là snapshot nghiên cứu, không mặc định release ổn định.

| Repo | Vai trò và độ khớp | Thiếu / rủi ro | License và quyết định | pushed_at UTC |
|---|---|---|---|---|
| [motion-canvas/motion-canvas](https://github.com/motion-canvas/motion-canvas) | TypeScript generator + editor, vector và voice sync | Tự rig, caption/data schema; phải kiểm Node24/Vite/exporter | MIT code; shortlist 1 | 2026-07-02T20:01:32Z |
| [ManimCommunity/manim](https://github.com/ManimCommunity/manim) | Python, mobject/diagram/toán, animation có cấu trúc | Setup native/font, timeline kể chuyện tự tổ chức; TeX chỉ khi cần | MIT LICENSE + LICENSE.community; shortlist 2 | 2026-10-20T14:37:33Z |
| [remotion-dev/remotion](https://github.com/remotion-dev/remotion) | React/SVG, frame timeline và compositing; hạ tầng local đã có | Tự rig và cue map; browser/RAM cần đo; docs latest có thể khác v4 | License riêng có điều kiện, không MIT/OSI; shortlist có điều kiện | 2026-10-21T17:08:11Z |
| [ManimCommunity/manim-voiceover](https://github.com/ManimCommunity/manim-voiceover) | Plugin voiceover và timing cho Manim | Không engine độc lập; ASR/TTS làm thêm dependency và có thể network | MIT plugin; dùng tùy chọn sau core spike | 2026-06-15T04:48:13Z |
| [motion-canvas/exporters](https://github.com/motion-canvas/exporters) | Exporter FFmpeg cho Motion Canvas | Repo lâu chưa push; package peer Vite4 cần kiểm tương thích | MIT code; dependency/codec kiểm riêng; phụ trợ bắt buộc kiểm | 2023-05-13T12:58:08Z |
| [3b1b/manim](https://github.com/3b1b/manim) | ManimGL của Grant, engine explanatory math | Khác API/import/CLI ManimCE; OpenGL tăng biến môi trường | MIT engine, không cấp quyền mọi nhân vật; chưa chọn cho pilot | 2026-09-09T16:23:48Z |
| [synfig/synfig](https://github.com/synfig/synfig) | Editor hoạt hình vector, hợp làm pose/rig thủ công | Không ưu tiên workflow claim-data/cue viết bằng code; cần học editor, export/mux riêng kiểm | GPL-3.0 theo metadata; chưa chọn làm core explainer | 2026-10-18T11:49:37Z |
| [antonin-lfv/Manim](https://github.com/antonin-lfv/Manim) | Ví dụ Manim có SVGStickMan | Ví dụ cũ, đường SVG tuyệt đối máy tác giả, provenance SVG chưa xác minh; không production rig | LICENSE code MIT đã đọc; loại khỏi stack dùng ngay | 2022-04-22T20:17:46Z |

Synfig không bị loại vì GPL hay thiếu năng lực vẽ; ít khớp mục tiêu sửa nội dung giải thích bằng dữ liệu hơn hai engine code. Repo chuyên người que Antonin không thể được gọi là «không có license»: code có MIT; vấn đề là source asset/khả năng tái dựng chưa đủ rõ, và snippet dùng GraphScene/TexMobject đời cũ. [README snapshot](https://github.com/antonin-lfv/Manim/blob/47f520cd0eb43e5ab6759cd3061f07ac6e2b974a/README.md), [LICENSE](https://github.com/antonin-lfv/Manim/blob/47f520cd0eb43e5ab6759cd3061f07ac6e2b974a/LICENSE).

## Top 1 — Motion Canvas: diagram kể chuyện theo cue

Pin nghiên cứu `7b91435c301d530351dcf5ebb91dd139c002e405`. Đã đọc README, LICENSE toàn file và source scheduling ở đúng SHA, không chỉ snippet tìm kiếm. [README](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/README.md), [LICENSE](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/LICENSE), [source scheduling.ts](https://github.com/motion-canvas/motion-canvas/blob/7b91435c301d530351dcf5ebb91dd139c002e405/packages/core/src/flow/scheduling.ts).

README xác định TypeScript generators, editor preview và informative vector animations đồng bộ voice. Source `waitUntil(event)` dựa trên duration time-event, còn `waitFor(seconds)` chờ tương đối. Suy luận ứng dụng: đặt cue tên `queue_grows`, `bottleneck_reveal` thay vì rải số giây; sửa lời dẫn rồi dịch cue sẽ ít đụng code visual hơn. Đây là thiết kế đề xuất, không chứng minh tự căn mọi từ hoặc tự cập nhật caption.

Phần phải code: component StickFigure từ head/torso/limbs với joint cố định; pose map idle/point/think/hold/pass; attachment cho token vào tay; layout ba vùng hook/diagram/caption; bảng claim-id; cue-id và duration; animation của counter lấy từ event log. Chưa cần IK hoặc walk cycle phức tạp cho pilot explainer. Khi đưa text dài vào phải tự xử lý line wrap và collision, không cho mỗi câu co font vô hạn.

**Xuất MP4:** pin repo exporter `f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f`; README chỉ cách thêm `@motion-canvas/ffmpeg` plugin. Package ở SHA này là 1.1.1, khai peer `@motion-canvas/core`/vite-plugin ^3.7.0, Vite4.x và phụ thuộc ffmpeg/ffprobe installers. Không khẳng định phiên bản đó tương thích tự động mọi package mới. [README exporter](https://github.com/motion-canvas/exporters/blob/f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f/README.md), [package manifest](https://github.com/motion-canvas/exporters/blob/f08e8e30d6bfb69da4b65d63c6acc3f209f98a4f/packages/ffmpeg/package.json). Phải lock toàn bộ package graph và ghi binary encoder thật; PATH FFmpeg thiếu có thể được package cung cấp nhưng chưa được kiểm trên máy này.

**Windows / CPU:** browser preview không đồng nghĩa cần NVIDIA. Node24 lớn hơn minimum docs nhưng chưa đủ chứng minh Vite4/plugin chạy ổn; cần thử clean install ở phase được thực hiện. Render 540×960 preview trước, 1080×1920/30fps final đề xuất sau; chưa chốt độ phân giải với user. [Quickstart](https://motioncanvas.io/docs/quickstart/), [render settings](https://motioncanvas.io/docs/rendering/).

**License:** MIT có nghĩa giữ thông báo copyright/license khi phân phối phần code theo điều kiện file; không tự chuyển font, SFX hay reference art sang MIT. Nhân vật tự vẽ từ hình học là hướng giảm phụ thuộc asset.

## Top 2 — Manim Community: mô hình / toán / đồ thị

Pin nghiên cứu `3e19ee016fe602cbd7dee43e9b44907c7220b5b4`. Đã đọc README, cả LICENSE và LICENSE.community toàn file, source Scene và phần Text ở snapshot. [README](https://github.com/ManimCommunity/manim/blob/3e19ee016fe602cbd7dee43e9b44907c7220b5b4/README.md), [LICENSE](https://github.com/ManimCommunity/manim/blob/3e19ee016fe602cbd7dee43e9b44907c7220b5b4/LICENSE), [LICENSE.community](https://github.com/ManimCommunity/manim/blob/3e19ee016fe602cbd7dee43e9b44907c7220b5b4/LICENSE.community), [Scene source](https://github.com/ManimCommunity/manim/blob/3e19ee016fe602cbd7dee43e9b44907c7220b5b4/manim/scene/scene.py).

Scene có lifecycle construct/play và đường Cairo/OpenGL; có random seed. Suy luận: dùng Cairo CPU trước cho đồ họa 2D nhỏ, tránh đặt OpenGL thành prerequisite. Circle/Line/VGroup đủ dựng rig nguyên bản, nhưng engine không tự biết khuỷu tay hoặc ý nghĩa pose. Dùng một hàm geometry theo joint state để không để limb rời thân trong Transform. Math/diagram là lợi thế nếu cần công thức; không biến mọi câu thoại tiếng Việt thành LaTeX.

Text source dùng Pango/manimpango, có font/register_font; warning chỉ ra indexing ký tự render khác chuỗi gốc, nên highlight theo đoạn/word object riêng thay vì cắt index Unicode thô. [text_mobject.py](https://github.com/ManimCommunity/manim/blob/3e19ee016fe602cbd7dee43e9b44907c7220b5b4/manim/mobject/text/text_mobject.py). Giả thuyết: tiếng Việt dùng Text + font hỗ trợ glyph sẽ đơn giản hơn Tex; vẫn phải thử dấu tổ hợp và line bounds. MathTex/Tex cần môi trường TeX phù hợp; không cài TeX nặng chỉ để vẽ số, mũi tên và caption. [Text/formulas guide](https://docs.manim.community/en/stable/guides/using_text.html), [installation hiện hành](https://docs.manim.community/en/stable/installation/uv.html).

**Voice cue:** có thể tự tạo cue manifest + audio local, đổi giây sang run_time/wait và kiểm không âm thời lượng. `manim-voiceover` có recording, services và per-word timing; dùng tùy chọn sau khi quyết định voice source. Không mặc định gọi Gemini/Azure/gTTS, không mặc định tải Whisper hoặc chạy ASR nặng; provider là phạm vi riêng. Pin plugin đọc license `3dc0d95d2f1d9d0937872b3dd68c7b38c4dfc96a`. [README](https://github.com/ManimCommunity/manim-voiceover), [MIT plugin](https://github.com/ManimCommunity/manim-voiceover/blob/3dc0d95d2f1d9d0937872b3dd68c7b38c4dfc96a/LICENSE).

**ManimCE khác ManimGL:** không trộn `manim` với `manimgl`, import/API/installation khác nhau. README của cả hai cảnh báo sự khác biệt. Chọn CE vì workflow mới có docs riêng và Cairo route; không vì brand 3Blue1Brown. Pi creatures/mascot thuộc nội dung nhận diện riêng, không dùng dù engine MIT; code license không tự cấp quyền asset/nhân vật của kênh. Tự làm người que P-2. [ManimGL README](https://github.com/3b1b/manim).

**Chọn stable khi triển khai:** snapshot main hiện có thay đổi lớn về Scene/manager và README nói refactor. Không dùng SHA nghiên cứu như khuyến nghị production mù; chọn release pin theo docs tương ứng, chạy smoke test rồi mới khóa. Trang stable hiện đọc hiển thị v0.22.0, chưa xác nhận wheel phù hợp Python `.venv-p2`; cần ghi phiên bản Python thực trước setup.

## Phương án 3 — Remotion để tái sử dụng engine local

P-1 đã có package 4.0.536; có thể tạo project P-2 riêng, tái dùng cách dựng React/SVG và frame timeline, không sao chép asset P-1. JSON caption, pose và số liệu sẽ cho phép sửa fact tại một nguồn. Các SVG joint phải là hàm của frame, không animation CSS theo đồng hồ thực để render ngẫu nhiên frame vẫn đúng. Audio nên từ file local; cue timestamps quy về frame. [Repo](https://github.com/remotion-dev/remotion), [audio docs hiện hành](https://www.remotion.dev/docs/html5-audio).

License snapshot đọc `b17f52258972fc1e16c21561d6540e86ede88fb6`: free cho cá nhân, tổ chức lợi nhuận tối đa 3 nhân viên, nonprofit hoặc evaluation chưa dùng thương mại; đối tượng khác cần company license, có giới hạn về bán bản phái sinh engine. Đây là license riêng có điều kiện, không nên gọi Remotion là MIT hoặc «miễn phí mọi trường hợp». Chưa biết legal entity/team size người dùng, chưa kiểm toàn bộ license đúng tag4.0.536 cài local; chỉ đưa vào shortlist có điều kiện. Không mua license. [File đã đọc](https://github.com/remotion-dev/remotion/blob/b17f52258972fc1e16c21561d6540e86ede88fb6/LICENSE.md).

Lợi thế setup là suy luận từ package tồn tại, không chứng minh chạy được. Browser binary, voice/font load và concurrency vẫn phải kiểm. Với RAM15.39GiB bắt đầu concurrency thấp, đo rồi tăng; không coi 8 logical CPU là nên mở 8 Chromium workers.

## Map ba pilot BA với stack / phần còn phải viết

| Pilot BA | Stack hợp nhất | Lý do | Code/tài sản còn phải làm | Không để engine quyết định |
|---|---|---|---|---|
| A — hai quầy, một máy | Motion Canvas; Remotion thay thế nếu ưu tiên setup | Token/counter và cue rõ | Event simulator deterministic, queue layout, props quán tự vẽ, 5 pose, cue map, caption | Công thức tính thời gian và điều kiện mô hình; không rig bằng physics ngẫu nhiên |
| B — đường rộng, tin muộn | Motion Canvas hoặc ManimCE | Arrow/path/counter, so một biến | Hai trạng thái đường, packet routing toy, stop/play focus, giới hạn ẩn dụ | Claim latency/throughput và docs mạng; không mô phỏng toy rồi gọi là Internet thật |
| C — nhìn quen / tự nhớ | Remotion hoặc Motion Canvas | Card flip/text/nhịp chờ có voice | Card schema, countdown không ép, reveal/callback cue, captions | Nguồn nghiên cứu và điều kiện bài thử; không biến trải nghiệm nhỏ thành thử nghiệm khoa học |

ManimCE nên bật ưu tiên khi pilot có công thức/đồ thị hoặc cần biến đổi toán; ba brief hiện tại chưa bắt buộc lợi thế đó. Không render trước để «chọn engine» khi chưa có scope production, nhưng smoke test chuẩn dưới đây sẽ giúp quyết định khi được triển khai.

## Kiến trúc dùng chung cần viết, không tải nguyên clip về ghép

Đề xuất một `scene-spec` gồm scene_id, claim_id, text, character_id, pose, object transforms, cue_id, source_ref; audio manifest ghi hash/duration; cue file ghi seconds, chuyển sang frame bằng quy tắc thống nhất. Nguồn claim nằm trong research record, bản video chỉ hiển thị credit ngắn khi cần. Tách dữ liệu mô hình khỏi animation để sửa số không còn counter cũ trên hình. Không lưu transcript riêng hoặc raw media vào Git.

Rig v0: đầu tròn, thân, 2 đoạn mỗi tay/chân, mắt đơn giản nếu cần, pivot vai/hông, attachment bàn tay; 5–8 pose nguyên bản. Không cần 16 look directions, lip sync, diffusion hay mocap. Đầu/torso không co dãn khi pose; chân có ground contact khi đứng. Engine chỉ tween joint; script/Content vẫn quyết định diễn xuất. Camera tĩnh là lựa chọn giúp đọc sơ đồ, không hạn chế kỹ thuật.

Fact correction phải tạo version mới: sửa một caption ở data và một con số mô hình, render lại cảnh liên quan, xác nhận voice nếu câu nói thay đổi cũng được thay/cue lại. Không sửa text hình mà giữ lời dẫn sai. Không overwrite artifact đã đăng ký; PM quản lý operational records.

## Smoke tests tái lập đề xuất — chưa chạy

Tạo workspace spike mới, pin version + lockfile + font file/hash/license + audio hash + encoder version, một cấu hình 10s/30fps/1080×1920 (300 frames). Các thông số chỉ là test fixture. Nếu setup mới cần dependency, làm ở phase được triển khai; lượt nghiên cứu không install.

1. **Dấu Việt/font:** hiển thị «Người que giải thích: độ trễ, hàng đợi, quầy nước», các cặp ă/â/ê/ô/ơ/ư/đ và cả Unicode NFC/NFD. Cùng một font local được cấp quyền. Pass khi không tofu, không mất/chồng dấu, line wrap trong khung, font load hoàn tất trước capture. Chụp frame đầu/cuối caption; đọc bằng mắt, không chỉ OCR.
2. **Cue/audio sync:** local WAV test có 3 click ở 1s/4s/8s, visual token đổi trạng thái đúng frame30/120/240; kiểm waveform và frame extract. Pass đề xuất sai số ≤1 frame (33.3ms), audio không trượt tới cuối10s. Click kỹ thuật không cần TTS/provider. Nếu voice thật sau này dùng cue cùng cơ chế, vẫn nghe lại vì click không kiểm pronunciation.
3. **Deterministic render:** cùng seed/input/settings render hai lần; compare frame pixel hashes tại 0/30/120/240/299 và state log. MP4 file hash có thể khác do metadata/encoder; không lấy byte-identical MP4 làm cổng duy nhất. Mọi random phải seeded và animation theo frame/time engine, không wall clock.
4. **Correction regression:** đổi «2 quầy» thành «3 quầy» trong dữ liệu và tăng một service duration; xác nhận caption/counter/timeline cùng phản ánh revision mới, output có version mới. Render lại hai scene không đổi để phát hiện side effect. Chưa có automation này.
5. **No clipping:** test text dài, tay vươn, token tới cạnh; bounds trong safe region cấu hình. Đề xuất lề nội bộ 8% ngang/10% dọc cho fixture, không gọi là safe area chính thức mọi nền tảng. Kiểm frame chuyển động giữa pose, không chỉ keyframes.
6. **Export/mux:** ffprobe xác nhận đúng resolution/fps/duration, video H.264 + audio AAC nếu stack chọn, playback Windows mở được, không silent track hoặc frame đen cuối. Giữ WAV gốc local ngoài Git. Kiểm channel/sample rate và audio endpoint khớp timebase.
7. **Host practicality:** log setup steps, render wall time, peak RAM, disk temp, CPU, renderer/backend; preview540×960 và final1080×1920 cùng nội dung. Không có ngưỡng render speed đặt bừa. Nếu RAM áp sát máy hoặc swapping, giảm concurrency/scene complexity rồi đo lại.

Các check này kiểm tính đúng pipeline, không xác nhận chất lượng nội dung, tiếng Việt tự nhiên, quyền asset hoặc thị trường. Video pilot vẫn cần Content và Review.

## Effort và giới hạn

Giả thuyết công, không cam kết deadline: rig tối thiểu + cue/data schema và bộ smoke tests có thể tốn vài buổi làm việc; pilot mới chủ yếu công storyboard, timing và sửa fact. Motion Canvas có thêm rủi ro setup export, ManimCE có native/font setup, Remotion có license/version/browser. Không ước lượng số giây render khi chưa chạy. Cài tool thành công không đồng nghĩa có kênh tự động; v0 chỉ drafts.

## Evidence ledger / độ tin cậy

- Metadata 5 core/aux repos + Synfig: tái sử dụng `stick-repo-metadata-pm-v1.json`, PM kiểm 2026-10-21 17:13 UTC. License PM trong `stick-license-audit-pm-v1.json`; top2 đọc lại raw toàn file, không coi GitHub API NOASSERTION là không có license.
- API bổ sung trực tiếp ngày22/10/2026: voiceover SHA `3dc0d95d2f1d9d0937872b3dd68c7b38c4dfc96a`, ManimGL SHA `fafa083a4fb274bba9cabde0b6e2f50ba6da0622`, Antonin SHA `47f520cd0eb43e5ab6759cd3061f07ac6e2b974a`; pushed_at trong bảng. API không kiểm chất lượng build.
- Top2 README/LICENSE/source: strong cho API và license code snapshot; medium cho suitability suy luận; **unknown** cho Windows run thực, font tiếng Việt, Node24, thời gian render và sync đúng.
- Motion Canvas source scheduling và exporter manifest đọc thực. Manim source Scene/Text đọc thực. Repo khác mức README/metadata/license tương ứng, không tuyên bố audit toàn codebase.
- Web docs mutable truy cập22/10/2026. Docs latest có thể lệch snapshot/package; phải pin docs/release khi triển khai. Không có repo nào đã install/render/test trong lượt này; không có số benchmark hoặc chất lượng video giả.
