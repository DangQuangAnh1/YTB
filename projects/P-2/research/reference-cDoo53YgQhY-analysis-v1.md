# Video tham chiếu "STRENGTH VS SPEED | StickNodes" (PIERCE) và đường tới 80% (23/10/2026)

Link do người dùng đưa: https://youtu.be/cDoo53YgQhY (kênh @peirceanimations6596). Tải ≤720p sau khi người dùng đồng ý, lưu ở `projects/P-2/media/cDoo53YgQhY/` (Git bỏ qua). **Chỉ để học**: không dùng lại hình, tiếng, nhân vật hay biên đạo của tác giả. Phân tích bằng skill mới `.claude/skills/video-study` (claude-video + `analyze-video.py` + `video-detail.py`). Đã xem khoảng 48 khung đều và 90 khung dày (mỗi 2 frame) ở 4 đoạn hành động; chưa xem phát liên tục, không nghe được. Mọi phần trăm là **ước tính chủ quan**.

## Số đo

| Chỉ số | Giá trị |
|---|---|
| Thông số | 1280×720, 24 fps, 20,6 giây, AV1 + Opus |
| Cắt cảnh | 0: một shot liền, máy gần như đứng yên, khung rộng |
| Chuyển động | trung bình 5,1/255; đỉnh ở 15,1–16,4 giây (lướt) và 8–10 giây (lộn, ném) |
| Âm thanh | 61 onset (≈3/giây), không nhạc, tiếng hiệu ứng gần như liên tục |
| Tiếng đòn (trung vị) | trầm <200 Hz 67%, trung 21%, cao 10%; tắt về 10% sau 64 ms; trọng tâm phổ 644 Hz |
| Của ta (final-counter-v1) | trầm 83%, trung 6%, cao 6%; tắt 115 ms; trọng tâm 414 Hz; có nhạc tổng hợp |

## Ngôn ngữ hình (từ khung dày)

- **Nhân vật:** người que kiểu StickNodes: đoạn thẳng dày, đầu mút tròn, đầu tròn đặc, màu phẳng (đỏ sẫm và xanh tím), không viền sáng. Nền trắng, một vạch đất đen. Nhân vật cao khoảng 1/5 khung.
- **Nhịp vẽ:** dáng đổi mỗi 2 frame (12 hình/giây, "on twos"), dáng cực đoan, ít khung chuyển. Có **đứng hình khoảng 0,5 giây** trước đòn kết (frame 412–424) rồi bùng nổ.
- **Hiệu ứng:**
  - vệt cong mờ cùng màu theo tay chân (smear), 1–2 frame;
  - **bóng mờ lặp lại** khi lao, nhảy (3–4 bản chồng, mờ dần);
  - nhân vật Speed lúc lướt **thay bằng dải vạch ngang** cùng màu, quét qua khung;
  - đòn trúng: tia đỏ ngắn tỏa ra + quầng tròn mềm + vài mảnh bay xa;
  - cú văng cuối: một dải dày màu xanh + **vòng sóng elip** nghiêng.
- **Động tác (khoảng 15 hành động trong 20 giây):**
  - chạy vào, đứng thủ;
  - áp sát vật lộn và đổi đòn gần;
  - Speed nhảy vọt ra khỏi khung phía trên;
  - Strength húc và đánh Speed trên không;
  - lộn ngược, ngã chống tay;
  - lướt qua lướt lại thành vạch;
  - đòn đối đầu cuối cùng và Speed văng đi.
- **Kịch bản:** ý tưởng "sức mạnh vs tốc độ": Speed áp đảo bằng tốc độ, Strength chịu đòn rồi thắng bằng một cú quyết định.

## Chấm mức đạt (ước tính chủ quan; bảng trọng số theo `docs/P-2-reference-video-analysis.md`)

"Hiện tại" là thứ pipeline dựng được ngay (final-counter-v1/v2). "Sau kế hoạch" là ước tính nếu làm đủ bốn phần dưới.

| Yếu tố | Trọng số | Hiện tại | Sau kế hoạch | Lý do |
|---|---|---|---|---|
| Nhân vật, phong cách phẳng | 15% | 60% | 90% | Chỉ cần thêm kiểu vẽ đoạn thẳng dày, không phát sáng |
| Võ thuật | 25% | 30% | 60–65% | Thiếu vật lộn, ném, lộn, đánh trên không; mocap 2 người khó kiếm với giấy phép sạch |
| Góc máy và dựng | 15% | 90% | 90% | Mẫu dùng khung rộng đứng yên: ta làm được ngay |
| Hiệu ứng | 15% | 50% | 85% | Thiếu bóng mờ lặp, dải vạch lướt, vòng elip, kiểu nổ đỏ mềm |
| Bối cảnh | 10% | 40% | 100% | Nền trắng + vạch đất |
| Âm thanh | 10% | 25% | 70–80% | Phải chuyển sang tiếng thu sẵn, bỏ nhạc |
| Kịch bản | 10% | 50% | 75% | Tự viết ý tưởng đối lập riêng, không chép biên đạo |
| **Tổng** | 100% | **khoảng 49%** | **khoảng 80%** (75–85%) | Rủi ro lớn nhất là võ thuật |

## Repo và nguồn đã tìm

### Đọc video (đã làm thành skill)

| Nguồn | Giấy phép | Dùng |
|---|---|---|
| [claude-video](https://github.com/bradautomates/claude-video) `/watch`, commit 03ceb42 | MIT | **Đã tích hợp**: chế độ cục bộ cho khung theo cảnh/đều (≈1 khung/giây, chỉ để xem tổng quát). Trên Windows cần ffmpeg bản đầy đủ |
| [PySceneDetect](https://github.com/Breakthrough/PySceneDetect) | BSD-3 | Chưa cần: video này không có cắt cảnh; bộ lọc scene của ffmpeg trong `analyze-video.py` đủ |
| claude-video-vision (đã ghi trong docs) | MIT | Plugin; cần cài bằng `/plugin` ở terminal |
| `scripts/video-detail.py` (mới, tự viết) | — | Khoảng thiếu có thật: frame dày theo từng frame trong một đoạn, và phân tích tiếng đòn. claude-video không làm hai việc này |

### Hoạt hình

| Nguồn | Giấy phép | Đánh giá |
|---|---|---|
| Tạo dáng + nội suy (kiểu StickNodes) bằng code sẵn có (`lib.cjs`: IK hai đoạn, xoay toàn thân) | của ta | **Hướng chính** cho ném, lộn, vật lộn: AI viết keyframe dáng dạng JSON, máy nội suy, vẽ on twos |
| [Theatre.js](https://github.com/theatre-js/theatre) | core Apache-2.0, studio AGPL-3.0 | Trình chỉnh keyframe trực quan nếu bạn muốn tự tạo dáng; studio là AGPL nên chỉ dùng như công cụ ngoài |
| CMU mocap (đang dùng) | dùng thương mại được | Có thêm trial võ thuật/đánh nhau; ít tương tác hai người |
| [Quaternius UAL 1/2](https://quaternius.itch.io/universal-animation-library-2) | CC0 | Combo đánh cận chiến, phản ứng trúng đòn; cần chuyển glTF sang khớp 2D |
| Mixamo | miễn phí, dùng trong video được, cấm phát tán file gốc | Rất nhiều đòn, lộn, trúng đòn; cần tài khoản Adobe (bạn tự tải) |
| [Bandai Namco motion dataset](https://github.com/BandaiNamcoResearchInc/Bandai-Namco-Research-Motiondataset) | CC BY-NC-ND 4.0 | Có đánh nhau, nhưng phi thương mại và cấm chỉnh sửa: không nên |
| [InterGen](https://github.com/tr3e/InterGen) (AI sinh chuyển động 2 người) | dữ liệu CC BY-NC-SA | Phi thương mại; cần GPU; máy này chỉ có GPU tích hợp |
| [planck.js](https://github.com/piqnt/planck.js) (đã clone) | MIT | Ngã/văng kiểu ragdoll |

### Âm thanh

| Nguồn | Giấy phép | Ghi chú |
|---|---|---|
| Kenney Impact Sounds (đã có) | CC0 | Có tiếng đấm/va; thiếu tiếng vút |
| [OpenGameArt "Punch" (qubodup)](https://opengameart.org/content/punch) | CC0 | Khoảng 200 KB |
| [OpenGameArt Hits & punches (Independent.nu)](https://opengameart.org/node/18158) | CC0 | Khoảng 1,7 MB |
| [Sonniss GDC bundles](https://gamefromscratch.com/sonniss-27-5gb-sound-effect-giveaway-at-gdc-2024/) | miễn phí bản quyền, thương mại, không cần ghi công; cấm huấn luyện AI | Chất lượng studio, có bộ whoosh/đấm; rất nặng (vài GB mỗi năm) |
| [Shapeforms Hit & Punch](https://shapeforms.itch.io/hit-and-punch) | thương mại, trả phí ($19) | Chỉ khi bạn muốn mua |

## Kế hoạch đề xuất (chưa làm)

1. **Kiểu vẽ StickNodes:** nền trắng, đoạn thẳng dày đầu tròn, không phát sáng, khung rộng, vẽ on twos. Thêm hiệu ứng: bóng mờ lặp, smear, dải vạch lướt, nổ đỏ mềm, vòng elip, đứng hình.
2. **Biên đạo bằng keyframe dáng:** một định dạng JSON (thời điểm, dáng mỗi khớp hoặc mục tiêu IK, kiểu nội suy) trộn với clip mocap. Thêm thủ tục ném, lộn, đánh trên không. Đây là phần nặng nhất.
3. **Âm thanh thu sẵn:** tải gói CC0 (và Sonniss nếu bạn đồng ý), tự động đặt tiếng vút/đấm/va theo sự kiện, bỏ nhạc. So bằng `video-detail.py audio` cho tới khi các dải tần gần mẫu.
4. **Dựng một short 20 giây ý tưởng riêng** (ví dụ "Heavy vs Agile"), rồi chạy lại video-study để so và chấm điểm.

Cần bạn quyết: khung 16:9 như mẫu hay 9:16 cho Shorts; cho phép tải gói âm thanh nào; có muốn công cụ tạo dáng trực quan (Theatre.js) hay để AI viết keyframe.
