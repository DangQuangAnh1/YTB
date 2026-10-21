# P-2 — Các hướng CPU/Intel nhẹ hơn để chuyển anime

Ngày 20/10/2026. BA theo yêu cầu tìm repo chạy máy hiện tại, không mặc định cần thuê GPU. Resume r43, đọc PROJECT.md. Phạm vi: research và đọc source/metadata, không cài, tải weights, render hoặc operational writes. PM đang xác minh riêng OpenVINO/DirectML compatibility.

## Kết quả chính

**Có hướng chuyển anime chạy CPU thật trong code: AnimeGANv3 ONNX và AnimeGANv2 ONNX/PyTorch.** Đây là mạng image-to-image feed-forward, khác diffusion video nặng và khác kéo keyframe theo flow. Chúng xử lý từng frame nguồn nên không phải kéo một bàn tay ở frame50 sang mọi tư thế; điều này giải quyết đúng một nhược điểm của v1 về thông tin vùng mới lộ. Tuy nhiên model vẫn có thể làm mất chi tiết/đổi màu, flicker hoặc thiếu chất anime mong muốn; chưa chạy benchmark clip nấu ăn.

Điều kiện thương mại là vấn đề riêng: **AnimeGANv3/v2 chính chủ ghi chỉ noncommercial, commercial cần thư cho phép**. MIT của sample ONNX/fork không xóa license gốc của converted weights. Có thể xem xét thử nghiệm nghiên cứu đúng điều kiện, không tự gọi đủ quyền làm kênh kiếm tiền.

Máy đã biết IrisXe, RAM khoảng15,4GiB; PM cập nhật CPU i5-1145G7 và RAM trống khoảng4GiB ở thời điểm kiểm tra. Capacity không bằng free memory. Khuyến nghị bắt đầu CPU,1frame và model nhỏ; Intel GPU acceleration là bước riêng sau khi CPU output đúng. Không có số FPS local nào trong báo cáo này.

## 6 ứng viên tập trung

### 1. AnimeGANv3 chính chủ ONNX — ưu tiên thử anime toàn khung

- [Repo](https://github.com/TachibanaYoshino/AnimeGANv3), [video2anime.py](https://github.com/TachibanaYoshino/AnimeGANv3/blob/master/tools/video2anime.py), [image inference](https://github.com/TachibanaYoshino/AnimeGANv3/blob/master/deploy/test_by_onnx.py).
- Code video có `-d cpu`, dùng `CPUExecutionProvider` rõ ràng. Không cần NVIDIA khi chọn nhánh này; biến CUDA_VISIBLE_DEVICES trong file không biến CPU inference thành CUDA. Không có nhánh DML/XPU trong sample.
- Image inference defaultcpu, RGB NHWC float32 chuẩn hóa `/127.5-1`, kích thước bội8 (tiny bội16), batch1. Hợp thử5frame trước; không cần môi trường training TensorFlow.
- Video script dùng `Image.ANTIALIAS`, lỗi tương thích Pillow mới (PM xác minh installed13); cần patch nhỏ sang Resampling.LANCZOS hoặc dùng script ảnh OpenCV trước. Thread queue có thể chờ ở EOF khi metadata framecount sai; nên dựng adapter headless đọc `ret` đến hết, không tự tuyên bố script nguyên bản chạy ngay.
- README có tiny2,4MB nhưng gắn style portrait cụ thể; **không coi mọi v3 checkpoint đều2,4MB hoặc phù hợp food**. GitHub tree hiện tại không có file.onnx; cần chọn đúng modelURL/checksum/kích thước trước download. Không tải.
- License README noncommercial; code/weights không được mặc định commercial. Chọn landscape/fullframe style cho cooking, không chọn Face2Ghibli chỉ vì model mới.

### 2. Kazuhito00 AnimeGANv2-ONNX-Sample — nhỏ và CPU khả thi, cần sửa sample

- [Repo](https://github.com/Kazuhito00/AnimeGANv2-ONNX-Sample), [sample source](https://github.com/Kazuhito00/AnimeGANv2-ONNX-Sample/blob/main/sample_onnx.py).
- README nói có thể dùng package `onnxruntime` CPU dù chậm hơn GPU. `InferenceSession(model_path)` không chỉ định provider; adapter nghiên cứu nên chỉ định CPU explicit để tránh nhầm benchmark.
- API Git tree cho `model/face_paint_512_v2_0.onnx` size8.594.990byte (~8,20MiB), không tải. Input NCHW; sample mặc định512vuông, crop giữa khung, cv.imshow và không ghi video. Không dùng nguyên như pipeline cooking headless toàn khung.
- Có điểm cần kiểm tra parity: sample `x=float32(pixel); x=x*2-1`, không thấy chia255, khác reference PyTorch `to_tensor*2-1`. Không khẳng định model sai khi chưa inspect graph/run; phải kiểm tra range và đối chiếu output trước adapter.
- MIT sample code; weights chuyển từ bryandlee/original cần giữ lineage và xác minh điều kiện riêng. Defaultface_paint thiên mặt; cooking dùng checkpoint toàn cảnh phù hợp hơn, không lấy face model làm kết luận mọi AnimeGAN kém.

### 3. bryandlee/animegan2-pytorch — CPU baseline và nguồn đối chiếu chuẩn hóa

- [Repo](https://github.com/bryandlee/animegan2-pytorch), [test.py](https://github.com/bryandlee/animegan2-pytorch/blob/main/test.py).
- Code có `--device cpu`, load weights map_locationcpu, model.to(device); không hardcodeCUDA cho inference như TokenFlow. Có checkpoint paprika và face variants; image folder pipeline, cần adapter trích/ghép frame.
- MIT code, nhưng README chỉ rõ có weights convert từ [AnimeGANv2 chính chủ](https://github.com/TachibanaYoshino/AnimeGANv2), nơi ghi noncommercial. Các weights tự distill/huấn luyện thêm cũng cần nguồn/điều kiện, không coi tất cả MIT được thương mại.
- PyTorch/torchvision nặng hơn ONNX runtime; không cài chỉ để chạy100frame khi ONNXCPU đủ. Dùng làm tài liệu parity input/output và lựa chọn nghiên cứu dự phòng. Đọc code chứ chưa chạy.

### 4. FastSDCPU + OpenVINO img2img — hướng thứ hai, linh hoạt nhưng lớn hơn GAN

- [Repo chính chủ](https://github.com/rupeshs/fastsdcpu), MIT code, các modelLCM/SDTurbo/SDXS/Flux riêng license. Không gọi MIT app là license của mọi model tải từHuggingFace.
- README hỗ trợ Windows, CPU, OpenVINOCPU/iGPU và img2img/ControlNet; đây là khả năng có thật để nghiên cứu, không cần NVIDIA mặc định. Cần xác định backend+model cụ thể: không mọi model/mode đều hỗ trợ mọi tính năng hoặc Intel device.
- Bảng RAM công bố LCM2GB, LCM-LoRA4GB cho cấu hình nêu; guidance>1 tăng RAM. Số này không là peak đo ở máyi5 này. RAMfree4GiB là biên hẹp khi browser/Python/encoder cùng chạy; chạy1frame trước, không load nhiềumodel.
- Benchmark0,82s là tạo512ảnh trên i7-12700 với SDXS/OpenVINO, **không áp lên i5-1145G7 hoặc100frame cooking img2img**. Seedcố định không bảo đảm temporal consistency; cần lowdenoise và structure control nếu model hỗ trợ.
- Đáng thử sau GAN khi cần ảnh đẹp hơn hoặc quyền checkpoint hợp lý hơn; download footprint và version/OpenVINOlicense chưa chốt, không thử trong research này.

### 5. ONNX Fast Neural Style / Intel Open Model Zoo — nhỏ, kiểm chứng backend tốt nhưng không anime chuyên biệt

- [Model card ONNX chính thức](https://github.com/onnx/models/tree/main/validated/vision/style_transfer/fast_neural_style), [Intel model.yml](https://github.com/openvinotoolkit/open_model_zoo/blob/master/models/public/fast-neural-style-mosaic-onnx/model.yml).
- ONNX model card BSD3-Clause, model khoảng6,6MB; Intel config Apache2.0 trỏ đúng weights/source/checksum, size6.728.029byte. Không chuyển license configApache thành licenseweights; card weights là nguồn cần giữ.
- InputRGB NCHW float[0,255], khác AnimeGAN[-1,1]; output kích thước ảnh. Có thể chạy CPU ONNX hoặc convertOpenVINO; đây là styletransfer hội họa (Mosaic/Candy/Udnie...), **không phải model đổi cooking thành anime chuyên biệt**.
- Dùng làm control nhỏ cho pipeline CPU/iGPU và timing, không chọn chỉ vì chạy nhanh. Các URL notebook/demo style-transfer cũ được thử trả404; không hứa currentOpenVINOnotebooks còn notebook đó. Repo hiện hành có version2026.4, cần PM pin bản được hỗ trợ trên IrisXe thay vì lấy hardwarelist2025 làm bảo đảm mọi2026release.

### 6. nihui/ncnn-android-styletransfer — nhẹ nhưng không là Windows drop-in

- [Repo](https://github.com/nihui/ncnn-android-styletransfer) yêu cầu AndroidStudio và ncnn-android-vulkan; model.bin Git metadata khoảng3.368.140byte/mỗistyle.
- Đây là Androidsample, không có lý do coi cóVulkan là chạy ngay WindowsIrisXe. Muốn Windows cần C++port/build/runtime/driver và kiểm tra model/source/license. README không nêu rõ license repo/weights; library[ncnn](https://github.com/Tencent/ncnn) license riêng không bao phủ model.bin tự động.
- Không ưu tiên hơn ONNXCPU trong lần thử kế. RealCUGAN/Anime4K chỉ upscale/restore đầu vào anime, không phải chuyển style cooking, nên không đưa vào shortlistconverter.

## Đề xuất thử4giây trên máy này (chưa chạy)

**RouteA — AnimeGANv3 ONNXCPU:**
1. Chốt exactcheckpoint toàncảnh, URL/license/checksum/size; chỉ private research trong scope hiện có nếu điều kiện cho phép. Lấy model nhỏ thực có, không mua quyền qua kết quả báo cáo.
2. Chạy image-inference CPU lên5frame0/25/50/75/99 của input4s640×360. Hạ internalresolution trước nếu RAM cao; giữ aspectratio và ghi resize/pad, không crop tay/dao. Kiểm tra normalize/layout trước đánh giá hình.
3. Nếu5frame giữ hình học tốt hơn EbSynthv2, mới chạy100frame batch1, encode25fps cùng chiều, silent như nguồn test. Đo setup/model-load riêng median/p95inference, peakRAM, decode và geometryQA. Không nói realtime trước đo.
4. Xem liên tục để phát hiện shimmer/flicker; không lấy ảnh đẹp chứng minh video ổn. Tránh temporalblur toànkhung/flownguồn gây bóng ma ở dao; chỉ cân nhắc lọc confidence-aware sau khi có baseline.

**RouteB — FastSDCPU/OpenVINO img2img:** chọn1checkpoint quyền rõ và config512hoặc nhỏ hơn,1sourceframe50, lowdenoise, fixedseed; đo RAM/tốc độ/geometry trước. Nếu model không hỗ trợ đúng img2img hoặc peakRAM vượt freeRAM thì đổi model/mode nhỏ, không kết luận cần thuêGPU. Không infer100frame khi chưa đạt1frame.

**Tăng tốcIntel là tùy chọn sau baselineCPU:** DML/OpenVINO provider cần available_devices/available_providers và graphoperator hỗ trợ; cóIrisXe không có nghĩa sampleCUDA tự dùngIntel. PM sẽ bổ sung officialcompatibility/version; không có hardwareaccelerationbenchmark ở đây.

## Giới hạn và cải tiến áp dụng

## Bổ sung kiểm chứng của PM

- [ONNX Runtime DirectML chính thức](https://onnxruntime.ai/docs/execution-providers/DirectML-ExecutionProvider.html): Windows GPU cần DirectX12, liệt kê IntelHaswell integrated trở lên; đây là hỗ trợ runtime, chưa là benchmark AnimeGAN trên máy. DirectML đang sustained engineering, tính năng mới chuyển sang WinML. Chưa cài provider hay xác minh graph/model tương thích.
- [OpenVINO system requirements2025](https://docs.openvino.ai/2025/about-openvino/release-notes-openvino/system-requirements.html) liệt kê IrisXe và Windows10/11. Phải pin release/driver phù hợp; không lấy danh sách2025 bảo đảm mọi phiên bản2026. Không cần cài toàn bộ notebook collection để chạy một ONNX model.
- Đã kiểm kê CPUi5-1145G7, RAMfree~4GiB tại phiên; không benchmark inference. Tự đọc officialv3video source xác nhận providerCPU và PillowANTIALIAS. Git treev3 không tìm thấy.onnx; không giả bộ đã có đủ weights để chạy ngay.
- Scope ở đây là research. Không có clipconvert mới trong lượt này; kết luận là có ứng viên kỹ thuật đáng thử trên máy, không phải chất lượng đã được chứng minh. Hướng nội dung TrungQuốc vẫn chỉ backlog.

ĐọcREADME/source qua rawGitHub và metadataAPI, không execute remote code. Đã phân biệtCPUexplicit, CPUđượcREADMEhỗtrợ, Intelcầntest và Androidport. Ngày pushed_at đọc từAPI: v3 2025-08-23, v2ONNXsample2021-11-12, bryandlee2023-01-06; không dùng stars hoặc ngàycũ làm phán quyết chấtlượng. Modelsize không bằngRAMpeak.

Đánh giá trước tập trung diffusion/flow nên bỏ sót nhómfeed-forwardGAN cóCPUprovider thực. Điều chỉnh scope research ởP-2 là cần thiết; không nhắc lại GPUthuê như lối duy nhất. Chưa có benchmark để khẳng định đủ tốc độ hay đủ chất lượng. Không sửa code/artifact cũ đã đăng ký, không đổi kit hoặc productionplan. Báo cáo đưa phương án kiểm chứng cụ thể đểPM tiến hành tiếp.
