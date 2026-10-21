# So sánh 6 model anime từng frame — 5 frame, self_review

Nguồn yêu cầu 20/10/2026: “Thử AnimeGANv3 Shinkai/H40/H64, White-box ONNX và DCT-Net bg trên 5 frame 0/25/50/75/99, mask và dán lại phụ đề, so contact với Hayao_36. Cho phép tải các model nhỏ này.” Đã ghi decision trước khi tải. Plan v2, tăng chi 0, không upload/đăng. Input vẫn là clip test riêng tư ec15pSXc2Qg 148–152s, chưa có quyền phát hành.

## Đã chạy
- Script `tasks/compare-framewise-v1.py`, mỗi model một subprocess, CPU 2 thread (giống baseline Hayao_36 trước), 640×360 không crop, frame 0/25/50/75/99.
- Model tải vào `media/tools/` (ngoài Git), size khớp nguồn: Shinkai_37 4.233.084B, H40 4.232.883B, H64 4.232.978B (release AnimeGANv3), `cartoonizer.onnx` 5.886.605B (HF space sayakpaul), `cartoon_anime_bg.pb` 5.894.895B, sha256 trùng giá trị ModelScope công bố. Hash đầy đủ trong `*/result.json`.
- DCT-Net bg đọc thẳng frozen graph bằng OpenVINO 2026.4.1 (cài vào `.venv-p2`), không cần TensorFlow. Input HWC BGR float 0–255, pad bội 16 bằng 255 như `utils.padTo16x`; output uint8. White-box theo đúng `app.py` demo: BGR, `/127.5-1`. AnimeGANv3: RGB `/127.5-1`. Output range thô hợp lệ (AnimeGAN trong [-1,1]; White-box vượt nhẹ ±1,47 rồi clip như demo).
- Phụ đề: box xanh tìm trên cả 100 frame nguồn bằng luật G−R>12, G−B>35 ở 1/3 dưới; bbox ổn định x216–430, y296–326; dán bản gốc vào rect [214,294,432,328] với feather 5px. `subtitle-check.png` cho thấy bản thô của mọi model làm nhòe chữ/đổi emoji, bản dán đọc rõ.

## Số đo (5 frame, máy đang chạy app khác, RAM trống ~2,2GiB lúc bắt đầu)

| Model | Runtime | Median s/frame | Peak RAM tiến trình |
|---|---|---:|---:|
| hayao36 | ORT CPU | 2,11 | 506 MiB |
| shinkai37 | ORT CPU | 1,50 | 516 MiB |
| h40 | ORT CPU | 1,43 | 507 MiB |
| h64 | ORT CPU | 1,54 | 507 MiB |
| wbc | ORT CPU | 0,65 | 353 MiB |
| dctbg | OpenVINO CPU | 0,58 | 336 MiB |

Hayao_36 lần này 2,11s so với 0,90s ở lần render 100 frame trước: máy bận hơn, chỉ so tương đối trong cùng lượt. 5 frame không đủ làm benchmark tốc độ cho cả clip.

## Nhận xét hình (tự xem contact-full, contact-hands và lưới 640×360 frame 25/75)
- Hình học: cả 6 model giữ đúng vị trí tay, dao, khối đậu, thớt ở cả 5 frame; không có méo/kéo kiểu EbSynth. Đây là ưu thế của model từng frame, không phải bằng chứng ổn định khi phát liên tục.
- **shinkai37**: màu tươi và nét viền rõ nhất trong nhóm AnimeGAN, da tay sáng hơn Hayao, thớt cam đậm; gần “tranh nền anime” nhất. Tay vẫn có mảng loang kiểu posterize.
- **hayao36**: tay phải sạm nâu, tổng thể tối và đục; kém nhất về màu da.
- **h40 / h64**: giữa Hayao và Shinkai, màu trầm, nét tranh vẽ; không có điểm vượt trội rõ.
- **wbc**: mảng màu phẳng và mượt nhất, da tự nhiên, ít nét viền; trông “cartoon phẳng” hơn “tranh vẽ”, nhưng tương phản thấp, hơi xám.
- **dctbg**: sáng và pastel nhất, da hồng nhạt, mảng phẳng mềm; bàn và nồi bị bạc màu, mất độ đậm. Khung phụ đề gốc trông tối hơn hẳn nền sáng xung quanh.
- Chưa có model nào cho đủ “nét sạch + cel shading” như anime thật; Shinkai mạnh về nét, WBC/DCT mạnh về mảng phẳng.

## Verdict
self_review, không phải chấp nhận chất lượng. Kỹ thuật: passed (6/6 chạy, shape/range/decode ảnh hợp lệ, phụ đề dán đúng). Hình học trên ảnh tĩnh: passed. Chất anime: needs user choice — đề xuất đưa **shinkai37** và **wbc** vào thử 100 frame + playback, giữ dctbg làm phương án license Apache nếu chỉnh màu được. Temporal/flicker: unverified, chưa render chuỗi.

## Việc tiếp theo đề xuất
1. Render 100 frame cho model được chọn, xem playback, đo sai khác frame liên tiếp so với nguồn.
2. Thử lọc temporal theo flow có mask (nhóm 2 trong `research/repo-scan-after-animegan-v1.md`).
3. Có thể thử kết hợp: mảng phẳng WBC/DCT + nét viền lấy từ Shinkai hoặc edge detector — chưa thử, chỉ là giả thuyết.

creator-improve: lesson riêng P-2 — OpenVINO đọc được TF frozen graph nên không cần cài TensorFlow cho model .pb nhỏ; phụ đề burn-in phải mask/dán lại ở mọi nhánh stylize. Không sửa kit chung.
