# Creator Agency Skills

Bộ skill vận hành dự án content/video trong Codex, ưu tiên công cụ sẵn có và hồ sơ nằm trong repo. Không cần UI hoặc framework agent mới.

## Bắt đầu

Clone repo này, mở thư mục checkout trong Codex và bắt đầu chat ở đó. Sáu skill nằm tại `.agents/skills/`; không cần cài toàn cục hoặc đưa chúng vào mọi dự án. Nếu skill chưa xuất hiện, mở lại project/chat và kiểm discovery của host. Bộ kit cần cả scripts/contracts/templates cùng checkout, không chỉ một thư mục skill.

Ví dụ yêu cầu:

> Dùng $creator-pm tiếp nhận ý tưởng: làm video giải thích hiện tượng đời sống bằng hình dựng code. Hãy cùng BA nghiên cứu và trình kế hoạch để tôi duyệt; chưa sản xuất hoặc đăng.

Hoặc:

> Dùng $creator-ba tìm vài cơ hội nội dung ở Trung Quốc, quốc tế và Việt Nam phù hợp công cụ hiện có; trình hướng đáng thử trước khi đào sâu.

Hoặc khi tiếp tục:

> Dùng $creator-pm tiếp tục P-1 theo hồ sơ đã lưu.

Đó là ví dụ prompt, không phải ngách đã được chọn. Registry thật hiện trống; P-1 được cấp khi tiếp nhận dự án đầu tiên, P-2 cho dự án tiếp theo. Mỗi dự án có PROJECT.md, STATE.json và HANDOFF.md.

## Luồng v0

Ý tưởng của bạn hoặc BA scout → research → PM trình plan có phiên bản → bạn duyệt phạm vi → Content → Production → Review → video nháp và báo cáo QA.

- `creator-pm`: tiếp nhận, điều phối, ghi quyết định và resume.
- `creator-ba`: research/đối thủ hoặc tìm cơ hội chủ động.
- `creator-content`: script, storyboard, title/thumbnail brief và SEO phù hợp.
- `creator-production`: dựng bằng code, kiểm technical output, bảo toàn artifact/lineage.
- `creator-review`: kiểm đầu ra thật và phần sửa; ghi passed/failed/unverified, khai báo self-review khi phù hợp.
- `creator-improve`: rút kinh nghiệm trong lúc làm và khi kết thúc dự án; sửa bộ kit có bằng chứng, kiểm tra và lưu bài học dùng lại.

Vai không bắt buộc là agent riêng. Bản đầu có thể làm tuần tự trong một chat để tránh overhead. Chỉ tách worker khi được phép và có lợi ích rõ ràng.

## Bộ skill phát triển qua từng dự án

PM gọi `creator-improve` khi có góp ý quan trọng, lỗi quy trình/công cụ có bằng chứng, phát hiện hữu ích hoặc tới mốc tổng kết. Bạn cũng có thể nói: “Dùng $creator-improve rút kinh nghiệm từ P-1 và cập nhật bộ skill”. Không phải chờ dự án kết thúc mới sửa.

Luồng: phát hiện → kiểm bằng chứng → phân loại bài học riêng/dùng chung → sửa nhỏ và kiểm tra, hoặc trình thay đổi lớn → lưu kết quả → tiếp tục dự án. Các sửa nhỏ, có thể hoàn tác được làm trong phạm vi bạn đã giao; thay đổi lớn về cách vận hành, quyền duyệt, chi phí hoặc dữ liệu cần quyết định phạm vi trước khi áp dụng.

Bài học dùng chung lưu tại `improvements/` theo [mẫu](templates/LESSON.md); sở thích/ngách riêng giữ trong dự án. Chỉ mở bài học liên quan, không nạp cả lịch sử. Không bắt buộc mỗi dự án phải sinh thêm quy tắc. Mỗi thay đổi ghi nguồn, lý do, kiểm tra, phần chưa xác minh và cách hoàn tác.

Đây là hướng dẫn thực thi trong session, chưa phải dịch vụ tự học chạy nền. Chat đang mở có thể cần đọc lại skill đã sửa; không tự thay kế hoạch hoặc migration trạng thái dự án đang làm. [Chi tiết](.agents/skills/creator-improve/SKILL.md).

## Helper chạy bằng Python chuẩn

Các lệnh chạy từ root repo; dùng `--help` cho tham số đầy đủ. `--root <workspace>` đứng trước tên lệnh khi dùng registry riêng.

```sh
python3 scripts/agency.py init --name 'Tên dự án' --description 'Mô tả mục tiêu và đầu ra'
python3 scripts/agency.py resume P-1
python3 scripts/agency.py check P-1
python3 scripts/agency.py context P-1 --max-chars 12000
```

`init` cấp mã tăng dần và tạo mô tả. `plan` lưu bản bất biến; `decision` ghi phản hồi user và phạm vi; `checkpoint` cập nhật task/stage/next action; `artifact` đăng ký file/hash/inputs; `review` ghi check/evidence và tính verdict; `usage` lưu số liệu có nguồn, tránh cộng cumulative lặp. Mọi mutation sau init yêu cầu `--expected-revision` để phát hiện writer dùng state cũ.

Ví dụ lưu plan để chờ duyệt:

```sh
python3 scripts/agency.py plan P-1 --file my-plan.md --expected-revision 1
```

Chỉ sau phản hồi user thật mới gọi decision với nguồn và trích ý thực; xem [planning](.agents/skills/creator-pm/references/planning.md). Không lấy command mẫu làm approval. Grants v0 chỉ gồm research/write_content/render_draft. Review không thay thế quyền duyệt.

## Renderer local mẫu

Adapter đi kèm chỉ dựng animation hàng đợi: 640×360, 24fps, caption và các hình chuyển động, tùy chọn audio được cung cấp. Đây là điểm xuất phát để mở rộng renderer theo ngách, chưa phải bộ dựng mọi loại video hoặc TTS tự động.

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-render.txt
.venv/bin/python evaluations/smoke_render.py --output evaluations/runs/demo-new
```

Smoke test tạo workspace giả lập riêng, có synthetic approval fixture để thử guard; không tạo P-1 trong registry thật và không thay thế user approval của dự án content. Demo mặc định không có âm thanh; kiểm decode không được gắn là content/audio QA đã đạt. Xem [hướng dẫn renderer](.agents/skills/creator-production/references/local-renderer.md) cho dependency fallback và render dự án thật.

## Context, token và chuyển máy

STATE là trạng thái vận hành; HANDOFF được dựng lại từ STATE; plan/decision/artifact là nguồn kiểm lại. Context packet giữ mục tiêu, giới hạn, task, quyết định và refs; chỉ nạp phần chi tiết khi cần. Thiếu budget cho phần bắt buộc thì báo lỗi, không cắt ngầm. Giới hạn packet tính bằng ký tự, không tuyên bố đo được token nội bộ hay hạn mức theo giờ của ChatGPT.

Git giữ source và hồ sơ nhỏ. Media lớn bị ignore; chuyển riêng khi cần và kiểm checksum. Auth/cookies/tools/session lịch sử không tự đồng bộ bằng Git. Chỉ một máy/writer sở hữu task tại một thời điểm; sync trước khi chuyển. Local lock không phải khóa phân tán. Xem [kiến trúc và giới hạn](docs/architecture.md).

## Kiểm chứng

```sh
python3 -m unittest discover -s tests -v
.venv/bin/python -m unittest discover -s tests -v
```

Lệnh đầu dùng standard library cho core, skip encoder integration nếu thiếu dependency. Lệnh thứ hai chạy cả encoder local. [Báo cáo](evaluations/RESULTS.md) phân biệt test invariant, render thật và behavior eval chưa chạy; không coi test fixture là nội dung đã được user duyệt.

## Phạm vi hiện tại

Đã có sáu skill, project registry, quyết định gắn plan/hash/revision, artifact/QA evidence, checkpoint/resume, bounded context, usage accounting và renderer local tối thiểu. Helper không xác thực được người đứng sau một trích dẫn, không chứng minh review đúng và không ngăn shell/browser bên ngoài nó.

Chưa có publish/channel/analytics adapter hoặc lịch tự chạy; đây là các chặng tiếp theo sau pilot. Không gọi dịch vụ trả phí. Không chỉnh hai kênh video cũ. Nguồn thiết kế: [research provenance](docs/research-provenance.md). Không nhập 23 source repo tham khảo vào kit này.
