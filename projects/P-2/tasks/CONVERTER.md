# Converter anime local P-2

Trạng thái xem kết quả benchmark/QA mới nhất; không dùng việc CLI chạy được làm chứng cứ chất lượng đã đạt. Ý tưởng nguồn Trung Quốc nằm riêng tại idea-chinese-cooking-backlog-v1.md, không phải scope hiện tại.

## Thành phần
- `build-ebsynth-cpu-v1.py`: build từ repo chính chủ https://github.com/jamriska/ebsynth, commit được ghi provenance. Serial CPU fallback dùng Zig vì máy không có MSVC được xác minh; OpenMP thay bằng header maxthreads=1. Phần dispatch giới hạn RGB style +3/4/6 guide channels, từ chối cấu hình khác bằng exit2. Thuật toán synthesis giữ nguyên. Không đồng nhất với app EbSynth web.
- `convert-anime-v2.py`: gọi binary repo, guides hình nguồn và vị trí flow, xuất frame/log/manifest/MP4 silent. Không tự tạo keyframe, không gọi diffusion/cloud. Vị trí flow là guide mềm cho patch synthesis, không chỉ remap anime như v1.
- Input video và keyframe anime phải tương ứng hình học. Model tạo keyframe và quyền tài sản là dependency riêng.

## Môi trường riêng
Python `.venv-p2` tại kit root; pip packages: yt-dlp, imageio-ffmpeg, pillow, opencv-python-headless, numpy, ziglang==0.13.0. Không cài vào Python hệ thống. `.venv-p2/` được loại Git qua `.git/info/exclude`; source/binary bên thứ ba nằm dưới media/ đã ignore.

Build source dưới `projects/P-2/media/tools/ebsynth/source` bằng `python projects/P-2/tasks/build-ebsynth-cpu-v1.py` với interpreter môi trường riêng. Clone source theo repo/commit đã ghi provenance khi tái lập trên máy khác.

## Chạy kiểm chứng
Từ kit root, bằng interpreter `.venv-p2/Scripts/python.exe`:

```text
projects/P-2/tasks/convert-anime-v2.py --input projects/P-2/media/cooking-pilot-v1/input-4s.mp4 --style projects/P-2/artifacts/cooking-pilot-v1/anime-keyframe.png --reference-frame 50 --output-dir projects/P-2/artifacts/render/ebsynth-smoke-v1 --sample-frames 0,50,99
```

Mặc định 320px rộng để smoke test CPU. Output dir phải mới; không overwrite artifact đã đăng ký. `--sample-frames` chỉ tạo ảnh/log, không giả là clip. Khi ảnh đạt, bỏ sample option để convert sequence; `--stride` giảm số frame xử lý và giảm outputfps tương ứng, giữ thời gian xấp xỉ nguồn.

Nhiều mốc: thay `--style`/`--reference-frame` bằng `--keyframes projects/P-2/artifacts/cooking-pilot-v2/keyframes.json`. CLI chọn mốc gần nhất, chưa có occlusion-aware blend. `--guide-mode edges --position-weight 3` là nhánh thử, đã cho ảnh xấu hơn trên benchmark hiện tại; không đặt làm mặc định. Giới hạn300frame mặc định, hãy trim đầu vào. Lỗi có status.json; return code không đủ để đánh giá chất lượng, có kiểm tra ảnh phẳng bất thường.

Benchmark 20/10/2026: build CPU và test một/nhiều keyframe đã chạy. Có geometry/smear failures giữa các mốc, **chưa hoàn thiện chất lượng**; xem artifacts/cooking-pilot-v2/qa-converter-v2.md. Không render full sequence khi smoke test đã cho lỗi tay/dao rõ.

## Kiểm tra chất lượng
So với nguồn ở đầu/giữa/cuối, các mốc dao chạm đậu và vùng che khuất. Nhận diện được nguyên liệu, đúng động tác; tay/dao không kéo méo, không đổi vật thể. Xem playback liên tục mới đánh giá temporal flicker. Decode/H264 pass không thay QA hình ảnh. Output silent phải ghi rõ. Không chấp nhận chỉ vì keyframe giữa đẹp.

## Giới hạn
Một keyframe không cung cấp mọi vùng vừa lộ; framewise synthesis có thể flicker. Muốn nhiều keyframe phải có quản lý mốc và visibility, không chỉ trộn mù. Phiên bản này là adapter cần benchmark, không cam kết xử lý mọi video. Thiếu input/backend hoặc repo failure thì dừng có log, không âm thầm thay bằng cartoon filter. CPU serial có thể chậm; chưa đo tốc độ thì không ước lượng năng suất.
