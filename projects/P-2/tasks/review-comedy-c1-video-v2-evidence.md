# P-2 C1 draft v2 — self-review

Reviewer: root Production/PM; self_review, not independent/human review. Input script A-065, storyboard A-066, plan v6. Video hash and measurements: artifacts/render/comedy-c1-draft-v2/technical-qa.json. Exact output is draft.mp4 v2; v1 kept only as earlier render.

## Thực hiện và sửa
- Hook/progression/payoff theo sáu scene: tap→box, escalation, phone0, nhìn phòng đầy, suýt làm ngay nhưng chọn để sau, hộp dọn hộp, cuối cùng nghỉ cũng bị để sau.
- Still pass đầu phát hiện path giày phải dùng relative move làm rời chân: đã sửa absolute M. Closeup chuyển opaque để không hằn title/cảnh sau. Các file sửa trước khi đăng ký source/output.
- V1 full: kiểm tọa độ pose mừng thấy mục tiêu bàn tay ở195,479 cách vai khoảng105px vượt tổng93px. V2 đổi y518; hình frame355 xác nhận tay gập và giữ tỉ lệ hợp lý. Không nhận đã đo invariants tự động mọi frame.

## Visual sample review thực hiện
Đã xem contact-sheet v2 gồm32 ảnh từ video decode, không chỉ source preview: frames25/50/58/76/140/180/206/225/251/257/283/289/315/355/455/499/510/550/570/595/625/650/669/670/690/715/737/765/790/810/832/839. Kiểm hook, tap/flying/landing boxes, biểu cảm, clear phone vs full room, finger đổi nút, giantbox/eyes/mini-restbox. Bố cục, nhãn Việt, đường sàn và chân đã gắn; ở cận cảnh bàn tay đi vào từ mép dưới là chủ ý. Hộp lớn đi qua title trong lúc rơi là chuyển động chủ ý; không thấy chữ bị cắt trong các frame hold. Crossfade frame669 còn phone mờ là transition chủ ý, scene closeup hold opaque.
Visual check passed trong phạm vi32 frame sampled và timing authored đã đối chiếu; chưa xem playback liên tục, không tuyên bố coverage toàn840frames bằng mắt. Chưa có test người xem; tính hài và pace còn cần feedback thật. Đoạn do dự và ending đủ số frame theo script, chưa xác nhận bằng audience response.

## Technical checks thực hiện
Full FFmpeg decode video+audio pass, stderr rỗng; OpenCV decode840frames.1080x1920,30fps,H264/AAC48k stereo,video28.000s,audio28.011s (difference11ms < one frame). Audio peak decoded~0.71974, không clipping. So decoded audio với WAV bằng cross-correlation quanh cue50/650/715/810/832: offset0samples ở cả5 điểm. Đây là phép đo mux/cue, không thay kiểm cảm nhận âm thanh. Hai fresh still renders ở frame355 có cùng SHA256, không khẳng định mọi máy giống pixel.
Render v2 mất81.986s trên host hiện tại, concurrency2; số này chỉ cho scene hiện tại, không estimate toàn series. Nhạc/SFX tự tổng hợp từ oscillator/noise seed2031, không lấy sample ngoài, không gọi paid provider. Có script/audio/adapter hashes và dependency version.

## Khoảng trống
Audio listening: unverified, không có công cụ nghe trực tiếp trong phiên. Không claim nhạc dễ nghe, balance đẹp hoặc SFX gây cười chỉ từ waveform. Continuous visual playback chưa xem; audience test chưa làm. Chưa có voice, đây là intentional visual comedy draft. Chưa có commercial license eligibility confirmation; evaluation draft theo plan. Không posting/channel creation.

Kết luận: đủ giao bản nháp để user đánh giá style và tình huống; không gắn nhãn QA toàn phần hoặc human-approved. Giữ audio_review unverified trong review record.
