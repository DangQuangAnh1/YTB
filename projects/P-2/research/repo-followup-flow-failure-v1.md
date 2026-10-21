# P-2 — Đối chiếu repo sau lỗi flow v1

Ngày 20/10/2026. BA technical-only theo yêu cầu người dùng “check với các repo khác xem”; PM xử lý câu hỏi quyền footage riêng. Resume r22, đọc PROJECT.md, artifacts/cooking-pilot-v1/qa-v1.md, manifest và tasks/propagate-keyframe-v1.py; trực tiếp nhìn contact.jpg gồm frame0/25/50/75/99. Không xem liên tục hoặc nghe video.

## Kết luận

v1 không phải kết quả chạy repo EbSynth/Diffutoon. Nó là remap ảnh anime duy nhất theo OpenCV DIS flow, nên không có cơ chế tái tạo vùng vừa lộ ra. Đổi seed hoặc tăng độ phân giải không giải quyết nguyên nhân này.

Repo đối chứng local đáng thử nhất là **jamriska/ebsynth CPU backend** vì có patch synthesis/guides và không cần weights CUDA. Nhưng hiện chưa thấy compiler trên PATH hay VS Installer tại đường dẫn chuẩn; chưa build/download binary. **TokenFlow và Diffutoon có cơ chế phù hợp hơn flow-only nhưng code đã đọc gắn CUDA**, không thể hứa đổi config sang CPU rồi chạy ổn trên Iris Xe. TemporalKit là orchestration cũ, không tự chữa mọi lỗi hình học. Không có repo nào đã chứng minh sửa được tay/dao của clip này.

## Phân tích adapter thực tế

Quan sát code: mỗi frame hiện tại được so thẳng với grayscale frame50, `flow_engine.calc(cur, ref, None)`; dùng vector đó `cv2.remap` trên anime keyframe. Chiều cur→ref cho backward sampling là hợp lý về ý tưởng, không kết luận lỗi do đảo dấu. Tuy nhiên:

1. Không kiểm tra forward-backward consistency, occlusion/disocclusion, photometric residual hoặc out-of-bounds.
2. Tất cả pixel bị buộc lấy từ một keyframe, kể cả vùng không tồn tại trong keyframe; `BORDER_REFLECT101` còn cho phép lặp nội dung ở biên.
3. Flow được ước lượng giữa hai ảnh thật, không kiểm tra căn chỉnh hình học keyframe anime với frame50. Nếu AI đã đổi bàn tay/dao thì warp không sửa được anatomy đó.
4. Chênh lệch tới khoảng2giây cùng thao tác cắt tạo correspondence khó; dùng nguồn/đích trực tiếp tránh drift cộng dồn nhưng không tạo ra dữ liệu bị thiếu.

Contact sheet xác nhận frame50 nhìn gần khung tham chiếu nhất; đầu/cuối méo tay/dao và mặt bàn. Đây là sampled visual finding, không phải mỗi frame đều đã kiểm tra. Trộn thêm keyframe có thể giảm khoảng cách nhưng vẫn có nguy cơ ghosting, đổi style và miệng dao trùng nếu không kiểm soát visibility.

## Diagnostic local đã thực chạy — chỉ đọc input

Dùng .venv-p2 hiện có, OpenCV5.0.0, DIS MEDIUM giống adapter. Với mỗi frame i, tính A=flow(i→50), B=flow(50→i); tại điểm x hợp lệ tính `error(x)=norm(A(x)+B(x+A(x)))`. Loại tọa độ x+A(x) ngoài ảnh. Không tạo media mới, không chạy diffusion.

| Frame | Tỷ lệ map còn trong khung | Median FB error, pixel | Tỷ lệ pixel hợp lệ FB error>3px |
|---|---:|---:|---:|
|0|94,47%|0,324|31,23%|
|25|98,37%|0,076|13,69%|
|50|99,57%|0|0%|
|75|97,66%|0,053|13,14%|
|99|96,83%|0,234|21,24%|

Đây là proxy reliability của flow, **không phải tỷ lệ pixel lỗi thị giác hoặc occlusion ground truth**. Median thấp không phủ nhận lỗi tập trung ở tay; chưa đo ROI tay/dao. Ngưỡng3px là ngưỡng khảo sát, chưa calibrate.

Lệnh tái lập: chạy đoạn Python sau bằng `.\.venv-p2\Scripts\python.exe -` từ kit root; chỉ in số:

```python
import cv2, numpy as np, json
c=cv2.VideoCapture('projects/P-2/media/cooking-pilot-v1/input-4s.mp4'); fs=[]
while True:
    ok,f=c.read()
    if not ok: break
    fs.append(cv2.cvtColor(f,cv2.COLOR_BGR2GRAY))
c.release()
h,w=fs[0].shape
x,y=np.meshgrid(np.arange(w,dtype=np.float32),np.arange(h,dtype=np.float32))
e=cv2.DISOpticalFlow_create(cv2.DISOPTICAL_FLOW_PRESET_MEDIUM)
for i in [0,25,50,75,99]:
    a=e.calc(fs[i],fs[50],None); b=e.calc(fs[50],fs[i],None)
    bx=cv2.remap(b[:,:,0],x+a[:,:,0],y+a[:,:,1],cv2.INTER_LINEAR)
    by=cv2.remap(b[:,:,1],x+a[:,:,0],y+a[:,:,1],cv2.INTER_LINEAR)
    err=np.sqrt((a[:,:,0]+bx)**2+(a[:,:,1]+by)**2)
    v=(x+a[:,:,0]>=0)&(x+a[:,:,0]<w-1)&(y+a[:,:,1]>=0)&(y+a[:,:,1]<h-1)
    print(json.dumps(dict(frame=i,valid_fraction=float(v.mean()),
        median_px=float(np.median(err[v])),gt3_fraction=float((err[v]>3).mean()))))
```

## 5 ứng viên kiểm tra tập trung

### 1. jamriska/ebsynth — đối chứng repo CPU đáng thử tiếp

[README](https://github.com/jamriska/ebsynth) có backend cpu/cuda và guide pairs, patch-based synthesis thay vì chỉ kéo pixel một lần. [Windows CPU build](https://github.com/jamriska/ebsynth/blob/master/build-win64-cpu_only.bat) biên dịch ebsynth_cpu.cpp/ebsynth_nocuda.cpp bằng MSVC với OpenMP. Không có neural weights. README code public-domain, đồng thời nêu cảnh báo patent thuật toán; chưa đánh giá pháp lý hiện hành. Repo library không phải app web hiện tại.

Suy luận: có thể tái tổng hợp texture dựa guide đích, hữu ích khi flow một mốc kéo méo; nhưng không thể tạo chính xác topology tay mới nếu guide/style không đủ. Cần nhiều keyframe đúng nguồn để có nội dung các vùng được lộ ra.

### 2. TemporalKit — học cách chia keyframe, không cần cài cả A1111 lúc đầu

[Repo](https://github.com/CiaraStrawberry/TemporalKit) GPL-3.0, pipeline A1111/img2img/ffmpeg/EbSynth; weights không kèm quyền bởi GPL. FAQ nói smear giảm khi keyframe gần nhau. Điều này ủng hộ thay ref50 duy nhất bằng nhiều mốc, **không bảo đảm sửa lỗi trong clip hiện tại**. Dependencies cũ; không có lý do cài cả A1111 nặng chỉ để tách frame khi OpenCV/ffmpeg đã có. Không mặc định extension tương thích app EbSynth2026.

### 3. TokenFlow — đối chứng structure-preserving tốt hơn nếu có CUDA

[Repo](https://github.com/omerbt/TokenFlow) MIT; inversion source và propagation diffusion features qua correspondence. Có code thật run_tokenflow_pnp.py. Đọc code hiện tại thấy StableDiffusionPipeline float16 `.to('cuda')` và CUDA autocast; chỉ sửa config.device thành cpu không đủ. Minimum VRAM chưa xác minh; pretrained SD2.1/base-edit model licenses riêng. README yêu cầu inversion tái dựng tốt trước edit và thừa nhận decoder jitter. Ưu tiên kiểm tra reconstruction trước style nếu có GPU sau này, không chạy local lúc này.

### 4. Diffutoon — anime hóa trực tiếp, không phải OpenCV warp

[Main README](https://github.com/modelscope/DiffSynth-Studio) xác nhận ví dụ Diffutoon chỉ ở pre2.0. Đọc [script pinned](https://github.com/modelscope/DiffSynth-Studio/blob/afd101f3452c9ecae0c87b79adfa2e22d65ffdc3/examples/Diffutoon/diffutoon_toon_shading.py): CUDA, AnimateDiff, ControlNet lineart/tile và AingDiffusion/embedding; có hàm tự download nếu thực thi. Không thực thi. Code Apache2.0; từng weights phải rà riêng, minimum cho đúng config chưa rõ. Per-frame control có cơ sở để giữ outline bàn tay nhưng generation vẫn có thể đổi ngón/dao. Gắn đúng pre2 environment; lowVRAM framework mới không là benchmark cho pipeline cũ.

### 5. AnyV2V — feature injection, chưa phải lựa chọn tiếp ngay

[Repo](https://github.com/TIGER-AI-Lab/AnyV2V) có first-frame edit rồi inversion/feature injection với3 backbone. MIT wrapper; README tự ghi I2VGen-XL thiếu license ở code gốc, SEINE Apache2.0, ConsistI2V MIT; weights riêng chưa audit. Sample16s/128frames A6000 là cấu hình công bố, không minimum. Sinh nội dung có thể xử lý vùng mới về hình ảnh nhưng chưa chứng minh giữ đúng nguyên liệu/timing cắt; phụ thuộc GPU và license khiến kém phù hợp test kế trên IrisXe.

## Test kế tiếp cụ thể và điều kiện thực thi

**Bước0 làm được ngay, không cài thêm:** diagnostic đã chạy bên trên. Có thể tiếp tục đo ROI tay/dao và so với khoảng cách keyframe; không gọi đó là video anime mới. OpenCV hiện có `stylization` để làm baseline giữ hình học bằng xử lý từng frame nếu cần so sánh, nhưng đây là bộ lọc hoạt họa với rủi ro flicker, không chạy repo mới hay chất lượng anime sinh AI.

**Bước1 ưu tiên repo CPU:** smoke test ebsynth3 ảnh đích ở f25/f50/f75 trước, output ở thư mục phiên bản mới. Quyền mỗi stage:

- Production đọc video local, trích exact source-frame50.png (guide nguồn), anime-keyframe.png (style) và source-frame25/50/75.png (guide đích); style/guide phải cùng kích thước, căn hình, không sửa artifact v1.
- Khi đã có binary/build chính chủ kiểm chứng, chạy cú pháp README cho từng đích: `ebsynth -style anime-keyframe.png -guide source-frame50.png source-frame25.png -output target25.png -backend cpu`; f50 làm identity-control. Đây là test tổng hợp ảnh repo, chưa phải pipeline sequence hoàn chỉnh.
- Review ROI trước encode: đầu ngón, mép dao, khối đậu, lỗ thớt, vùng text. Không đạt3ảnh thì không xử lý100frame.
- Nếu3ảnh tốt hơn flow-v1, tạo keyframe đúng f0/f50/f99, giữ style chung; chia shot thành đoạn với guide-pairs tương ứng và reset ở thay đổi che khuất. Chỉ dùng một keyframe cho vùng ổn định; không blend xuyên occlusion một cách mù quáng. Ghép frame bằng ffmpeg có sẵn và ghi manifest đúng backend/repo/commit, không gọi adapter tự viết là EbSynth.

**Điều kiện chưa có:** Get-Command cl/cmake/gcc/g++ không trả command; `C:/Program Files (x86)/Microsoft Visual Studio/Installer/vswhere.exe` không tồn tại. Chưa dò hết mọi ổ nên không khẳng định máy tuyệt đối không có compiler. Script build repo đòi MSVC/vcvarsall; chưa build được ngay trong môi trường đã xác minh. Repo có link binary Windows nhưng chưa tải/xác minh. Vì scope hiện tại là check/research, chưa cài compiler hoặc chạy binary ngoài. Không phải “blocked do cần CUDA”: CPU route thật sự tồn tại nhưng executable prerequisite còn thiếu.

**Bước2 nếu GPU ngoài sẵn có:** TokenFlow inversion-only trước, cùng đoạn4s/giảm resolution, so reconstruction với nguồn. Tái dựng chưa tốt thì chưa làm style. Diffutoon là nhánh style thứ hai sau khi môi trường/weights rõ, không cài cả hai ngay. Không trả phí/upload/tải weights từ nghiên cứu này.

## Tiêu chí so sánh với v1

Giữ cùng nguồn100frame/25fps; report riêng runtime setup/inference/render, không dùng runtime encode7,69s của v1 làm chi phí toàn pipeline. So frame0/25/50/75/99 + các mốc dao chạm đậu/che khuất; xem playback liên tục trước khi gọi pass. Không chấp nhận geometry đổi thao tác chỉ vì style đẹp. Cần giữ số lần cắt, vị trí dao, số ngón nhìn thấy hợp nguồn, nguyên liệu không biến mất, không smear/ghosting gây sai nghĩa. Nếu có âm, nghe và kiểm sync riêng.

## Kiểm tra, khoảng trống và creator-improve

Đã chạy diagnostic CPU read-only, đọc source/config/license và sampled contact sheet. Không cài/clone/tải weights, không tạo clip mới, không benchmark repo, không upload. URL file TemporalKit Ebsynth.py đoán ban đầu trả404, nên không dùng làm bằng chứng; nguồn README chính chủ vẫn có. Không tìm thấy lựa chọn mới nào có đủ bằng chứng hơn các route này để mở rộng danh sách.

Bài học riêng P-2: v1 đã bỏ bước kiểm chứng repo và thay bằng flow đơn giản; test đó chỉ chứng minh encode và phong cách một keyframe. Mốc kế phải ghi chính xác backend, kiểm soát visibility và đối chứng geometry trước mở rộng clip. Không sửa artifact đã đăng ký hoặc kit chung. PM sở hữu operational writes và câu trả lời quyền footage; báo cáo này chỉ so kỹ thuật và license repo/model.
