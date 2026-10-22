# Nghiên cứu repo animation bổ trợ cho video P-2 (22/10/2026)

Phạm vi: các repo và tài nguyên có thể giải quyết điểm yếu đo được của final-counter-v1 (render chậm, thiếu xem trước nhanh và render từng cảnh, câu hỏi giấy phép Remotion, thiếu clip chuyển động, SFX mỏng, thân người chồng lên nhau, kịch bản chưa là dữ liệu). Đọc trang chính (README, LICENSE) và `gh api` cho giấy phép, ngày push, archived. Không cài hay chạy các repo không nhúng. Nguồn là bản tóm tắt trang web nên các chỗ ghi "chưa kiểm" là chưa kiểm.

## Đã nhúng và có số đo

| Hạng mục | Kết quả | Trạng thái |
|---|---|---|
| Render bằng GPU (Remotion `gl: angle`) | 900 frame: 97,7s so với 583–643s của `swangle`, nhanh khoảng 6 lần; hình khác nhau trung bình 0,5–1/255. Số đo ở [render-gl-benchmark-v1.json](render-gl-benchmark-v1.json). Chỉ có GPU tích hợp Intel UHD 630; GPU rời chưa thử. | **Integrated**: `production/final-counter-v1/render.cjs` mặc định `angle`, `GL=swangle` để ép phần mềm. Remotion 5.0 sẽ lấy `angle` làm mặc định. Tài liệu cảnh báo rò bộ nhớ khi render dài. |
| Kenney Impact Sounds (CC0, 130 file OGG) | Tải về, chuyển 6 file (punch, metal, soft, step) sang WAV 48kHz, đặt trong `production/final-counter-v1/sfx/` kèm giấy phép CC0; `audio.py` có lớp mẫu tùy chọn `SFX_SET=kenney` tạo bản B `final-counter-kenney-sfx.mp4`. Bản A tự tổng hợp giữ nguyên. | **Adapted**, chưa nghe thử nên chưa biết hay hơn hay không: chỉ so số (độ to gần như bằng nhau, không vỡ tiếng). |

## Đã clone vào third_party/video/sources (ignored, đã ghi CATALOG)

| Repo | Giấy phép / hoạt động | Vì sao giữ | Chưa làm |
|---|---|---|---|
| [Revideo](https://github.com/redotvideo/revideo) `b5de67a` | MIT; push cuối 2026-07-15; 4,1k sao; LICENSE là bản của Motion Canvas (cùng mã băm với bản Motion Canvas đang ghim), tức là fork; render headless trong Node, PR render song song; telemetry mặc định bật (`DISABLE_TELEMETRY=true`). | Phương án dự phòng nếu giấy phép công ty của Remotion thành vấn đề khi kiếm tiền. | Chưa cài, chưa render thử, chưa so tốc độ. Cảnh phải viết lại sang node 2D của họ. |
| [planck.js](https://github.com/piqnt/planck.js) `01504e0` | MIT; push 2026-10-21; bản Box2D bằng TypeScript. Có thư mục `example` nhưng không thấy ví dụ ragdoll trong danh sách đọc được. | Ứng viên ragdoll cho cảnh văng/nằm (hiện là tư thế cứng được xoay). | Chưa chạy; tính tất định và chạy trong Node chưa kiểm. |
| Kenney Impact Sounds | CC0, kenney.nl, 800.850 byte, sha256 `029d734af1582474edf3a694d1b0cebc97c1c152f2f39fa34d4c2bafc5de77f8` | Nguồn SFX bản quyền sạch. | — |

## Đã đánh giá, chưa clone

| Repo / nguồn | Phát hiện | Kết luận |
|---|---|---|
| Remotion (giấy phép) | Miễn phí cho cá nhân, kể cả thương mại; công ty hơn 3 nhân viên cần Company License; không được sao chép để bán lại bản phái sinh; sẽ đổi nhẹ ở 5.0. | Nếu kênh chạy dưới tên một công ty trên 3 người thì cần giấy phép; còn không thì miễn phí. Đọc lại khi kiếm tiền. |
| Theatre.js | Core Apache-2.0, Studio AGPL-3.0; push công khai cuối 2024-08-14, phát triển chuyển sang repo riêng. | Hữu ích để chỉnh keyframe bằng giao diện, nhưng tình trạng bảo trì mờ và Studio là AGPL. Để sau. |
| Quaternius Universal Animation Library 2 | CC0, 130+ clip, có combo 3–4 đòn, FBX/glTF, rig humanoid, không có BVH; phần miễn phí là một phần của bộ. | Nguồn tốt cho combo và đòn quét chân bị cắt, nhưng phải chuyển FBX sang BVH (cần Blender, máy chưa cài). Bước tiếp theo hợp lý. |
| Kenney RPG Audio | CC0, 50 file, thẻ foley/footstep/weapon. | Có thể thêm sau nếu cần. |
| MediaPipe Pose | Code Apache-2.0, 33 mốc 2D/3D, có chế độ video; trang không nêu giấy phép model và không nói về chuyển động nhanh. | Dùng để lấy chuyển động từ video do chính bạn quay. Chưa thử; chất lượng với đòn đánh nhanh chưa rõ. |
| Blender | GPL (công cụ; kết quả render không bị ràng buộc), có Grease Pencil và import BVH, nhưng có báo cáo lỗi Grease Pencil khi render headless. Chưa cài. | Hướng 3D để có góc máy khác và bớt chồng lên nhau; nặng, để sau. |
| LAFAN1 | CC BY-NC-ND 4.0, chỉ 3/77 chuỗi là đánh nhau. | **Loại**: không thương mại, không phái sinh. |
| Mixamo | Cần đăng nhập Adobe; các bài diễn đàn nói được dùng trong phim và game, không được phát tán file thô. Không thấy điều khoản chính thức. | Không tải (không tạo tài khoản); chưa xác minh. |
| AnimatedDrawings | MIT, đã archived 2025-09, cần Python 3.8 + TorchServe, nặng. | Chỉ cần nếu muốn nhân vật vẽ tay riêng. Bỏ. |
| MotionGPT, motion-diffusion-model | Code MIT, lần push cuối 2025. Giấy phép dữ liệu huấn luyện chưa kiểm. | Có thể tạo clip còn thiếu, nhưng rủi ro giấy phép khi kiếm tiền. Chỉ ghi nhận. |
| Matter.js, Rapier.js, tsParticles, Tone.js, Lottie, Rive, DragonBones, three.js, Manim | Đều permissive (MIT hoặc Apache) và đang hoạt động, Rapier.js đã archived. | Pipeline code-drawn hiện không cần; planck.js đủ cho ragdoll. Không clone. |
| OpenMontage | AGPL-3.0. | Vẫn là checkout ngoài, không chép code. |

## Hiệu ứng lên ước tính thời gian

Render 10 phút ở 60 fps (36.000 frame): khoảng 3,9 giờ bằng phần mềm so với khoảng 65 phút bằng GPU tích hợp (ngoại suy tuyến tính từ 97,7s/900 frame; chưa chạy thật). Ước tính cũ trong chat là 1 giờ cho video 10 phút ở 720p nhẹ; số mới là cho phong cách neon dọc.

## Việc nên làm tiếp (đề xuất, chưa làm)

1. Chế độ xem trước thấp (scale 0,5, 30 fps) trên GPU rồi render từng cảnh.
2. Chạy thử planck.js ragdoll cho cảnh văng.
3. Cài Blender, chuyển Quaternius UAL2 sang BVH để thêm combo và quét chân.
4. Nghe bản A và B của âm thanh rồi chọn.
