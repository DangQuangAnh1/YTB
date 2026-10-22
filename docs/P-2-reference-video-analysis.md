# Phân tích video tham chiếu (P-2)

Dùng khi người dùng đưa một video mẫu (ví dụ "làm được video như này không, đạt bao nhiêu %"). Mục đích là học cấu trúc và đo độ khó, **không** sao chép nội dung.

## Quy tắc

1. **Công cụ chính:** plugin `claude-video-vision` (MIT, https://github.com/jordanrendric/claude-video-vision). Nó trích khung hình bằng ffmpeg và âm thanh/phụ đề, rồi đưa cho Claude xem như ảnh có mốc thời gian. Lệnh: `/watch-video <đường dẫn hoặc link> [câu hỏi]`. Nhận cả link YouTube (tải bằng yt-dlp).
2. **Không có plugin hoặc cần số đo:** chạy `scripts/analyze-video.py` (xem bên dưới). Nó cho số liệu mà plugin không có: cắt cảnh, đường cong chuyển động, chớp sáng, nhịp âm thanh, bảng màu, bảng khung hình.
3. **Hỏi trước khi tải.** Tải video của người khác có thể vi phạm điều khoản nền tảng và đụng bản quyền. Chỉ tải khi người dùng đồng ý rõ.
4. **Chỉ để học.** Không dùng lại hình, âm thanh hay nhân vật của tác giả. File tải về để trong `projects/<P-n>/media/...` (Git bỏ qua theo `.gitignore`), không đưa vào repo. Hỏi người dùng có muốn xóa sau khi xong không.
5. **Ghi kết quả** vào `projects/<P-n>/research/` rồi đăng ký artifact kiểu `research` bằng `scripts/agency.py`. Mẫu: `projects/P-2/research/reference-red-vs-black-2023-analysis-v1.md`.
6. **Phần trăm "đạt bao nhiêu" luôn là ước tính chủ quan.** Ghi rõ bảng chấm, trọng số do ai chọn, và giới hạn (khung hình lấy mẫu, chưa xem phát liên tục). Không đưa con số nếu chưa xem được hình.

## Cài plugin (làm trong terminal Claude Code của người dùng)

```
/plugin marketplace add https://github.com/jordanrendric/claude-video-vision
/plugin install claude-video-vision
/claude-video-vision:setup-video-vision
```

Cần Node.js 24+, ffmpeg trên PATH, và yt-dlp (nếu dùng link YouTube). Âm thanh: Whisper chạy cục bộ (miễn phí, không cần mạng) hoặc Gemini/OpenAI (cần khóa API). Công cụ của plugin chỉ xuất hiện ở **phiên mới** sau khi cài, và khung mặc định là tối đa 100 khung 512 px. Ứng dụng desktop không chạy được lệnh `/plugin`; dùng terminal có lệnh `claude`.

## Script `scripts/analyze-video.py`

Cần numpy, pillow, imageio-ffmpeg (ffmpeg) và ffprobe (có trong runtime Remotion sau `scripts/setup-p2.sh`, hoặc trên PATH). Trên máy chính dùng Python của runtime:

```bash
PY=~/.cache/creator-agency/p1-runtime-bundled/bin/python3        # hoặc .venv/bin/python sau setup-p2.sh
$PY scripts/analyze-video.py projects/P-2/media/<tên>/source.mp4 projects/P-2/media/<tên>/analysis
```

Đầu ra trong thư mục `analysis`: `report.json` (thông số, số lần cắt, thời lượng shot, chuyển động theo giây, chớp sáng, onset và ước lượng BPM, bảng màu), `sheet-1.jpg` và `sheet-2.jpg` (khung hình đều nhau), `shots.jpg` (khung đầu mỗi shot). Chạy khoảng 18 giây cho video 5 phút. Ước lượng BPM có thể gấp đôi thực tế, đừng tin riêng nó.

Tải video (chỉ khi được phép), dùng yt-dlp trong cùng môi trường:

```bash
$PY -m pip install yt-dlp
$PY -m yt_dlp --no-playlist --ffmpeg-location <đường-dẫn-ffmpeg> -f "bv*[height<=720]+ba/b[height<=720]" --merge-output-format mp4 -o "projects/P-2/media/<tên>/source.%(ext)s" "<link>"
```

## Bảng chấm mức đạt (để các lần chấm nhất quán)

| Yếu tố | Trọng số |
|---|---|
| Nhân vật, phong cách phẳng | 15% |
| Độ đa dạng và phức tạp của võ thuật | 25% |
| Góc máy và dựng (cắt nhanh, cận cảnh) | 15% |
| Hiệu ứng năng lượng (tia, sét, nổ, mảnh vỡ) | 15% |
| Bối cảnh | 10% |
| Âm thanh và nhạc | 10% |
| Kịch bản, kịch tính theo độ dài | 10% |

Mỗi yếu tố chấm 0–100% theo **khả năng thật của pipeline lúc đó** (đối chiếu với `projects/P-2/research/scriptwriter-design-v1.md` và catalog khả năng), nhân trọng số rồi cộng. Trọng số là lựa chọn của người chấm và có thể đổi theo ưu tiên của người dùng.
