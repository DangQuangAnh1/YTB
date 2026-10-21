# P-2 — Plan v14: thử nhánh hành động và cài bộ công cụ đã đề xuất

Nguồn user: “Okie tạm lướt qua cái này vậy. Vậy còn cái hành động thứ 2 thì sao, làm thử luôn 1 video nhé. Nhớ cài hết các cái bạn bảo”. Hài charger được tạm gác, không ghi thành chốt chất lượng. Nhánh thứ2 là hành động trong cùng P-2, không tạo dự án con mới.

T-030 setup: cài bản pin MotionCanvas core/2d/viteplugin/exporter3.17.2, Matter0.20, GSAP3.12.5 theo starter; clone pin stick-motion/Fullik từ repo đã nghiên cứu, kiểm license và testload/IK; cài OpenToonz Windows chính chủ làm editor dự phòng. Hai repo thiếu grant trong nghiên cứu không được chọn tích hợp. Dependency/log/raw binary ngoài Git. Kiểm riêng tình trạng cài, load/build, và dùng trong phim; không coi cài thành công là mọi engine đã render được. Dùng Remotion/FFmpeg hiện có làm export fallback nếu MC không có headless adapter đã kiểm; báo rõ.

T-031 Content/Production: pilot Sàn mới lau khoảng24s,dọc1080x1920,30fps,2nhân vật duo-v3,duel giao hữu không máu hoặc vũ khí. Ba nhịp tương tác có chuẩn bị/contact/phản ứng; chân trụ có IK và phân biệt trượt cố ý trên vùng ướt. Tấm thảm khô xuất hiện từ đầu trở thành điểm tựa; kết vượt vạch rồi hỗ trợ nhau. Có SFX tự tạo, không dùng footage/audio tham khảo.

T-032 review độc lập theo ủy quyền PM/review còn hiệu lực: kiểm artifact thực, foot/contact/props/độ rõ mục tiêu/khung dọc và decode/âm thanh kỹ thuật. Sửa vấn đề ảnh hưởng trước giao; thiếu nghe liên tục phải ghi chưa xác minh. Không tự xếp chất lượng sáng tạo đạt từ technical QA. Không đăng/push/trả phí.
