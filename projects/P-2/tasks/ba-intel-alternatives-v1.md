# T-007 — Research repo CPU/Intel thay thế

Nguồn người dùng ngày20/10/2026: “xem có repo khác không, research tiếp”. Đầu vào P-2r43, PROJECT.md, lỗi EbSynth/OpenCV đã có. Mục tiêu: khả năng convert cảnh nấu ăn thật →anime trên laptop hiện tại; không mặc định thuê GPU.

Phần cứng đã kiểm kê: IntelCorei5-1145G7, IrisXe, RAM~15.4GiB; FreePhysicalMemory lúc kiểm tra lần này khoảng4GiB, là số biến động chứ không phải tổng RAM. Windows. Nghiên cứu chính chủ, ưu tiên AnimeGAN ONNX/feedforward, OpenVINO/DirectMLCPU/Intel; không nhầm upscaler thành chuyển style. Xác minh codeprovider, video/fullframevsface, model availability, licensecode/weights và temporalconstraints. Trả shortlist nhỏ và test4s đề xuất. Không cài/tảiweights/render/cloud/paid trong stage này.

PM và BA chạy song song phạm vi đọc riêng; BA chỉ ghi research/intel-cpu-alternatives-v1.md; PM operationalwrites. Không recursive delegation. Điều chỉnh nghiên cứu do kết luận trước đã quá rộng: thiếuCUDA chỉ loại bản codeCUDA đã kiểm tra, không loại mọi repo khác. Ghi lessonsriêngP2 và tiếp tục tool, không mở rộng scoutingnội dung TrungQuốc.
