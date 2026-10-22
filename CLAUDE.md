@AGENTS.md

# Quy tắc làm việc riêng của repo này (Claude Code)

- **Git:** chỉ có một người làm việc, nên làm thẳng trên `main`, không tạo nhánh hay PR trừ khi người dùng yêu cầu. Chỉ commit khi được bảo. Người dùng tự push (`git push` bị chặn cho Claude trong cấu hình của họ). Không đặt `git push` chung lệnh với bước khác. Chi tiết: docs/P-2-git-workflow.md.
- **Video tham chiếu:** dùng plugin claude-video-vision (`/watch-video`) hoặc `scripts/analyze-video.py`; hỏi trước khi tải; chỉ để học, không tái dùng nội dung. Chi tiết và bảng chấm: docs/P-2-reference-video-analysis.md.
- **Máy khác:** cài đặt và chạy ở nhà theo docs/P-2-home-setup.md; ghi trạng thái dự án (`agency.py`) chỉ trên một máy.
- **Chỉ làm trong dự án đang làm:**
  - Khi làm P-n, chỉ đọc và tìm trong `projects/P-n/`, các file `docs/P-n-*` và phần chung thật sự cần (`scripts/agency.py`, `AGENTS.md`).
  - Không mở, grep hay khám phá `projects/P-khác/` hoặc `docs/P-khác-*`, để khỏi tốn context.
  - Tìm kiếm thì giới hạn đường dẫn vào `projects/P-n/`, không grep cả repo.
  - Chỉ đụng tới dự án khác khi người dùng yêu cầu rõ.
  - Khi commit cũng chỉ add file của dự án đang làm; thay đổi của dự án khác để nguyên.
- **Ngôn ngữ trả lời:** tiếng Việt (code, commit message và tên định danh theo quy ước thường lệ).
