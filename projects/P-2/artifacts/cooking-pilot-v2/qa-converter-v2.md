# Converter v2 — kết quả thực, chưa đạt chất lượng

Nguồn điều hướng mới nhất: tasks/idea-chinese-cooking-backlog-v1.md. Ý tưởng nguồn Trung Quốc chỉ backlog. User yêu cầu hoàn thiện converter; planv2, tăng chi0, không đăng/cloud/upload. Dùng lại clip private input4s ec15pSXc2Qg phạm vi148–152s, chưa có quyền phát hành được xác minh.

## Thay đổi đã làm
Build EbSynth từ repo chính chủ commit2f5c97c0c21a86bb7334dee61453623e6a3d41c3 trong media/tools/. Link binary jamriska.cz không resolve DNS. Không có compiler chuẩn xác minh nên cài ziglang0.13.0 từ PyPI vào .venv-p2. Build O3/O1 đủ192template quá chậm, đã dừng đúng process riêng. Bản cuối chỉ dispatch styleRGB và guide3/4/6channels, OpenMP stub maxthreads1, CPU serial, thuật toán patch synthesis giữ nguyên. Provenance và source hashes lưu media/tools/ebsynth/serial-build/provenance.json. Binary sha2566cf35a6a518a9f86a91591f226343fa50321172b6b18d4f43d7a9bfc0ef4a241.

CLI tasks/convert-anime-v2.py: single/multiple keyframes, input/backend checks, maxframe guard, aspect ratio, versioned output, log, status và manifest, sample mode rồi mới sequence MP4 silent+decode. Đây là adapter thực gọi backend, không là diffusion model. Chưa kiểm chứng mọi input hay máy khác.

## Smoke tests đã chạy
- artifacts/render/ebsynth-smoke-v1/: 3frame0/50/99 một keyframe; 320x180,4–5s/frame khi CPU đang bận. Nhìn contact: f50 rõ hơn nhưng f0/f99 bệt/méo tay. Backend cũ dispatch3/6, hash51279e08984858b90accdc2dc47297522ede47f6f37f8ac70c3c6b4b21bf2dbc.
- Imagegen tạo thêm keyframe0 và99 theo ảnh nguồn/tư thế tương ứng, tham chiếu phong cách keyframe50. Ảnh99 thiếu subtitle, geometry vẫn không khớp tuyệt đối. Không gọi đây là chỉ sửa màu. Ảnh lưu artifacts/cooking-pilot-v2/anime-000.png và anime-099.png.
- artifacts/render/ebsynth-multikey-smoke-v1/: 5frame0/25/50/75/99, nearest keyframe, khoảng1.8–2.2s/frame. Đã trực tiếp nhìn contact: f0/50/99 rõ, f25/f75 thiếu tư thế trong style nên tay/dao bệt; subtitle biến mất khi dùng keyframe99. Chưa đạt visual quality. Không benchmark tổng tốc độ episode từ vài ảnh.
- artifacts/render/ebsynth-edge-smoke-v1/: nhánh edge guide trở thành1channel sau evalNumChannels của repo, tổng4 thay vì6. Bản dispatch giới hạn ban đầu âm thầm trả ảnh đen và exit0. Đây là lỗi adapter build đã phát hiện, không pass. Không overwrite kết quả lỗi.
- Sửa build để hỗ trợ4channel và reject unsupported ở frontend, thêm guard ảnh phẳng trong CLI. artifacts/render/ebsynth-edge-smoke-v2/: f25/f75 thực chạy1.6–1.7s/frame, đã nhìn contact; ảnh không đen nhưng méo/bệt hơn positionguide. Không chọn nhánh edge làm mặc định.
- Regression unsupported grayscale style phải exit2 và không có output; bằng chứng artifacts/render/ebsynth-edge-smoke-v2/regression.json. Python py_compile của hai script pass.

## Verdict self_review
Hạ tầng: build và CLI đã hoạt động trong môi trường này, manifest thực có frame timings/hashes. Visual: failed do sai hình học tay/dao giữa keyframes. Temporal playback/audio: unverified vì chưa render sequence mới sau khi smoke đã thất bại; tests này là ảnh, không gọi thành video pass. Không lặp full100frame khi ảnh đã chứng minh lỗi. v1video không được thay đổi hay chấp nhận lại.

## Công việc còn lại
Không thể kết luận converter đã hoàn thiện. Cần cải thiện cách bám hình học và xử lý vùng che khuất, kiểm soát keyframe alignment/style, rồi mới benchmark sequence+playback. EbSynthCPU có thể dùng làm baseline, chưa là lời giải tốt cho cảnh tay nhanh này. Diffutoon/TokenFlow cần môi trườngGPU và ràweights như research; chưa cài/chạy hay dùng dịch vụ trả phí. Chưa tự chuyển sang filter rồi gọi anime AI. Nếu chọn service/GPU bên ngoài sẽ cần xác định tài nguyên và quyền transfer/cost thực, không suy từ yêu cầu hiện tại.

creator-improve: áp dụng sửa nhỏ có evidence ngay trong adapter: không tối ưudispatch rồi để unsupported silent-black, regression thực đã xác minh. Đây là lesson riêng converterP2, chưa sửa skill chung. User correction routing được lưu backlog đúng trạng thái. Các dự án khác không bị sửa.
