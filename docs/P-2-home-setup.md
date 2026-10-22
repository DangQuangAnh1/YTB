# Chạy dự án P-2 (video người que) trên máy khác

Áp dụng cho Linux hoặc macOS. Windows: dùng WSL2 (Ubuntu) rồi làm y như Linux; chưa thử trên Windows thuần. Máy ở nhà chỉ cần Git, Node.js 18 trở lên (khuyên dùng 20+), Python 3.10+ và khoảng 3 GB ổ đĩa trống (runtime Remotion khoảng 1,4 GB).

## 1. Cài đặt một lần

```bash
git clone https://github.com/CaoTrungDuc/creator-agency-skills.git
cd creator-agency-skills
./scripts/setup-p2.sh
```

Script tự làm năm việc rồi chạy thử một bản 60 frame:
1. Cài runtime Remotion vào `third_party/video/runtime/p2-remotion` từ file khóa `third_party/video/manifests/p2-remotion/package-lock.json` (phiên bản giống máy chính).
2. Lấy thư viện nét Perfect Freehand (MIT) đúng phiên bản đã ghim và đóng gói.
3. Tạo `.venv` với numpy, pillow, imageio-ffmpeg. Trên Ubuntu/Debian cần gói `python3-venv` (`sudo apt install python3-venv`); nếu không muốn cài thì đặt `PYTHON=/đường/dẫn/python` của một Python đã có sẵn ba thư viện đó, hoặc cài `uv`.
4. Nếu máy chưa có Chrome hoặc Chromium thì tải trình duyệt của Remotion. Nếu Remotion không tìm thấy Chrome của bạn: `export CHROME=/đường/dẫn/chrome`.
5. Chạy `build.sh smoke` để kiểm tra mọi thứ hoạt động.

Chạy lại script không sao (không làm hỏng gì).

Đã kiểm chứng ngày 22/10/2026: copy đúng các file Git có sang thư mục trống rồi chạy `setup-p2.sh` từ đầu (đặt `PYTHON=` vì máy thử thiếu `python3-venv`). Kết quả: dựng được video, file âm thanh giống từng byte với máy chính, `curve-validation.json` giống hệt, frame hình lệch trung bình 0,46/255. Chưa thử trên macOS, Windows/WSL hay máy có card rời.

## 2. Dựng video The Final Counter

```bash
./projects/P-2/production/final-counter-v1/build.sh full      # video đầy đủ 15 giây, có âm thanh
./projects/P-2/production/final-counter-v1/build.sh smoke     # bản thử 60 frame, khoảng 1 phút
```

Kết quả nằm ngoài repo, mặc định ở `~/p2-out/final-counter-v1/final-counter.mp4`. Đổi chỗ bằng `P2_OUT=/nơi/khác`. Mỗi lần chạy `build.sh` làm theo thứ tự: kiểm tra số liệu, render, tạo âm thanh, ghép và giải mã kiểm tra.

Biến môi trường hữu ích:

| Biến | Tác dụng |
|---|---|
| `P2_OUT` | Thư mục đầu ra (mặc định `~/p2-out/final-counter-v1`) |
| `GL` | Chế độ đồ họa của Chrome. Mặc định `angle` (dùng GPU, tự lùi về phần mềm nếu không có). `GL=swangle` ép phần mềm; thử `GL=angle-egl` nếu card rời bị lỗi |
| `CONC` | Số luồng render (mặc định số nhân trừ 1) |
| `CHROME` | Đường dẫn Chrome nếu Remotion không tự tìm thấy |
| `PYTHON` | Python có numpy, pillow, imageio-ffmpeg (mặc định `.venv/bin/python`) |
| `SFX_SET=kenney` | Thêm lớp tiếng mẫu CC0 của Kenney vào âm thanh (bản B) |

Thời gian tham khảo trên máy chính (Intel UHD 630, 8 nhân): 900 frame mất 97,7 giây với GPU, khoảng 583–643 giây với phần mềm. Card rời chưa thử. Với video dài, Remotion cảnh báo rò bộ nhớ ở chế độ GPU, nên chia theo cảnh.

Chỉ xem một vài frame: `node projects/P-2/production/final-counter-v1/render.cjs stills 135,300` (ảnh nằm trong `$P2_OUT/stills`).

## 3. Quy tắc quan trọng khi làm trên hai máy

- **Chỉ ghi trạng thái dự án trên một máy (máy chính).** Các lệnh `python3 scripts/agency.py plan|decision|artifact|review|checkpoint|usage|recover` ghi vào `STATE.json`; AGENTS.md quy định mỗi lúc chỉ một máy ghi. Máy ở nhà nên chỉ dựng, thử code và commit.
- **Video, âm thanh, ảnh không nằm trong Git.** Bản clone mới không có chúng, nên `python3 scripts/agency.py check P-2` sẽ báo thiếu file (ví dụ `black-red-duel-v1/original-sfx.wav`). Đây là hành vi có từ trước, không phải lỗi cài đặt. Muốn có các file đó ở nhà, copy từ máy chính (USB, scp, ổ đám mây) vào đúng đường dẫn trong `projects/P-2/artifacts/render/...`.
- **Không dựng đè lên thư mục `projects/P-2/artifacts/render/final-counter-v1`** của máy chính, vì hash đã đăng ký sẽ lệch. `build.sh` mặc định ghi ra `~/p2-out` để tránh việc này.
- Đồng bộ code bằng nhánh Git và pull request như đang làm (`git pull` trước khi bắt đầu, push nhánh khi xong). Các lệnh cụ thể và ai làm bước nào: xem `docs/P-2-git-workflow.md`.

## 4. Tùy chọn: tạo lại clip chuyển động và SFX từ nguồn

Không cần cho việc dựng thường ngày, vì các clip 2D đã commit sẵn ở `projects/P-2/production/final-counter-v1/clips` và các tiếng mẫu ở `sfx/`. Chỉ khi muốn đổi đoạn cắt hoặc thêm clip:
1. Tải file BVH của CMU vào `third_party/video/sources/cmu-mocap-bvh/` theo `third_party/video/RESTORE.md` (có mã băm để kiểm).
2. Sửa danh sách trong `make-clips.sh` rồi chạy `./projects/P-2/production/final-counter-v1/make-clips.sh`.
3. Muốn làm lại SFX từ gói Kenney (CC0): tải gói theo RESTORE.md rồi chạy `FFMPEG=/đường/dẫn/ffmpeg ./projects/P-2/production/final-counter-v1/prep-sfx.sh`.

## 5. Gỡ lỗi nhanh

| Triệu chứng | Cách xử lý |
|---|---|
| `Missing node` hoặc phiên bản Node cũ | Cài Node 20+ (nvm: `nvm install 20`) |
| `npm ci` lỗi hoặc rất chậm | Kiểm tra mạng; chạy lại script, npm sẽ dùng bộ nhớ đệm |
| Remotion báo không tìm thấy trình duyệt | `export CHROME=/đường/dẫn/chrome`, hoặc để script chạy `npx remotion browser ensure` |
| Render lỗi hoặc ra hình đen ở chế độ GPU | `GL=swangle ./.../build.sh full` (chậm hơn nhưng chắc chắn); hoặc thử `GL=angle-egl` |
| `ffmpeg not found` / `ffprobe not found` khi ghép | Chạy lại `setup-p2.sh` (cài imageio-ffmpeg và runtime); hoặc đặt `FFMPEG=` / `FFPROBE=` |
| `ModuleNotFoundError: numpy` | Dùng Python trong `.venv` (script `build.sh` tự chọn); hoặc `./.venv/bin/pip install numpy pillow imageio-ffmpeg`; hoặc `PYTHON=/đường/dẫn/python` |
| `Cannot create a virtualenv` khi cài đặt | `sudo apt install python3-venv` rồi chạy lại, hoặc cài `uv`, hoặc đặt `PYTHON=` |
| `agency.py check P-2` báo thiếu file media | Bình thường trên máy mới (xem mục 3) |

## 6. Giấy phép cần nhớ (nay là sở thích, sau này kiếm tiền)

Remotion miễn phí cho cá nhân, nhưng công ty trên 3 nhân viên cần Company License. Dữ liệu chuyển động CMU cho phép dùng thương mại và đề nghị ghi "The data used in this project was obtained from mocap.cs.cmu.edu". OpenMontage (AGPL-3.0) chỉ là công cụ ngoài, không nằm trong source. Chi tiết ở `third_party/video/CATALOG.md` và `projects/P-2/research/animation-repos-research-v1.md`.
