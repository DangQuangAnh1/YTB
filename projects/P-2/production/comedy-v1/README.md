# P-2 C1 — adapter người que SVG v1

Một adapter code-native riêng cho pilot “Để sau thành đồ thật”, không phải app dựng video tổng quát hoặc bundled queue renderer. Script: artifacts/content/comedy-c1-script-v1.json; storyboard tương ứng. Scene source có timing/visual authored, không tự biến script bất kỳ thành diễn xuất.

## Chạy local đã kiểm
- Từ kit root: .venv-p2/Scripts/python.exe projects/P-2/production/comedy-v1/make_audio.py
- Từ kit root: node projects/P-2/production/comedy-v1/render.cjs stills
- Từ kit root: node projects/P-2/production/comedy-v1/render.cjs smoke
- Từ kit root: node projects/P-2/production/comedy-v1/render.cjs full
- Bản sửa pose cuối: đặt biến P2_RENDER_DIR=comedy-c1-draft-v2 trước render để output vào thư mục mới. Chạy .venv-p2/Scripts/python.exe projects/P-2/production/comedy-v1/verify.py comedy-c1-draft-v2 để kiểm bản này.

render.cjs dùng đúng node_modules Remotion4.0.536/React đã có ở projects/P-1/production/engine-v1, qua webpack resolver rõ ràng; browser headless cũng từ dependency local. Không sửa source/asset P-1 hoặc cài package/network mới. Path local cần cập nhật nếu chuyển máy. Evaluation draft theo license đã đọc; không chứng nhận commercial eligibility.

## Hợp đồng adapter
Adapter id p2-stick-comedy-svg-v1, six scenes, 30fps,840frames,1080x1920. Runner kiểm fields chính của script và ghi hash script/source/audio; mọi pose/box/camera là hàm của frame, không wall-clock/random. IK hai đoạn cho tay/chân, phone ở hand socket. Physics hộp authored theo quỹ đạo chứ không mô phỏng tự do.
Audio oscillator/noise seed2031,48k stereo; cues dùng frame/30. Không stock media, font file, raw clip hoặc TTS provider. Dùng font Arial hệ thống để rasterize, không phân phối font. Source Python regenerate soundtrack; public WAV bị gitignore.

## QA và hạn chế
Phải kiểm decode bằng full FFmpeg imageio_ffmpeg: binary FFmpeg rút gọn trong compositor Remotion không có null-output default wrapped_avframe encoder, nên `-f null -` với binary đó lỗi dù input chưa có lỗi. ffprobe Remotion vẫn đọc count/streams được. Đây là khác biệt tool build, không bypass media QA.
Self-review theo frame sample; không gọi là human audience test hay nghe audio nếu chỉ đo waveform. Không upload/publish hoặc paid calls. Manifest lưu runtime/render time và hashes.
