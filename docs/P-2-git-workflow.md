# Quy trình Git cho P-2: commit, push, PR, merge

Ghi lại cách đang làm việc với Claude trong repo này, kèm lệnh cụ thể. Đường dẫn repo trên máy chính: `/home/bss-group/Documents/ChatGPT/creator-agency-skills` (thay bằng đường dẫn của bạn trên máy khác).

## Quy tắc hiện tại (từ 22/10/2026): làm thẳng trên `main`, không tạo nhánh

Chỉ có một người làm việc trong repo này, nên **không cần nhánh và không cần pull request**: Claude commit thẳng lên `main`, bạn push `main`. Claude không gọi công cụ đề xuất nhánh và không `git switch -c` nữa, trừ khi bạn yêu cầu riêng cho một việc nào đó.

`~/.claude/settings.json` có quy tắc `deny` cho `Bash(git push*)` (và `shopify theme push*`), nên **Claude không push được**, kể cả khi được cho phép trong chat; quy tắc `deny` thắng. Vì vậy:

| Bước | Ai | Lệnh |
|---|---|---|
| Làm việc, kiểm tra trước khi commit | Claude | xem bên dưới |
| Commit lên `main` | Claude (khi bạn yêu cầu) | `git add -A && git commit` |
| **Push `main`** | **Bạn** | `git -C <repo> push origin main` |
| Kéo `main` về máy khác | Bất kỳ ai | `git pull --ff-only origin main` |

Muốn Claude push được thì phải bạn tự sửa quy tắc đó (ví dụ chuyển `Bash(git push*)` từ `deny` sang `ask`); Claude không tự sửa file đó.

## Kiểm tra trước khi commit

```bash
git add -A
git diff --cached --name-status                      # chỉ có file mong muốn
git diff --cached --name-only | while read f; do s=$(stat -c %s "$f"); [ "$s" -gt 1000000 ] && echo "$s $f"; done   # file lớn > 1 MB
git diff --cached --name-only | grep -iE '\.(mp4|wav|png|jpg|zip|bvh)$|node_modules|third_party/video/(sources|runtime)|\.venv|sftp|\.env|cookies'   # media, runtime, file kết nối
git diff --cached -U0 | grep -E '^\+' | grep -iE '(api[_-]?key|secret|password|bearer|sk-[A-Za-z0-9]{12,}|ghp_[A-Za-z0-9]{12,})'   # bí mật
```

Media (`.mp4`, `.wav`, `.png`, `.jpg`), `third_party/video/sources`, `third_party/video/runtime` và `.venv` bị Git bỏ qua theo `.gitignore`; kết quả dựng nằm ở `projects/P-2/artifacts/render/...` nhưng không lên GitHub.

Thông điệp commit viết bằng tiếng Anh, kết thúc bằng dòng ghi công mà Claude được chỉ định (`Co-Authored-By: ...`). Đừng đặt `git push` chung trong một lệnh ghép với commit: cả lệnh bị chặn và commit đi kèm cũng không chạy.

## Khi nào mới dùng nhánh và PR (hiếm)

Chỉ khi bạn muốn tách một thay đổi rủi ro ra để xem trước: `git switch -c p2/<ten-viec>`, bạn push nhánh, rồi `gh pr create --base main --head p2/<ten-viec> --title "..." --body "..."`, `gh pr merge N --merge` (chỉ khi bạn bảo), `git switch main && git pull --ff-only origin main`. Các PR #1–#4 đã làm theo cách này. Nhánh cũ đã merge có thể xóa: `git push origin --delete p2/soft-line-motion-v2 p2/animation-repos-research p2/home-setup p2/scriptwriter-research` (bạn chạy) và `git branch -d <ten>` (cục bộ).

## Ghi trạng thái dự án (chỉ trên một máy)

Thứ tự khi làm việc mới có phê duyệt: `python3 scripts/agency.py plan P-2 --expected-revision N --file ...`, rồi `decision` (ghi nguyên văn câu của bạn làm nguồn), rồi làm việc, rồi `artifact` cho từng file đầu ra, `review`, `checkpoint`. Không sửa `STATE.json` hay `HANDOFF.md` bằng tay. Chạy `python3 scripts/agency.py check P-2` để kiểm tra.

## Những lỗi đã gặp, tránh lặp lại

- `pkill -f 'node render.cjs'` trong một lệnh bash có chứa đúng chuỗi đó sẽ giết luôn shell của chính nó. Dùng PID cụ thể (`kill <pid>`).
- Đừng chạy `git stash` giữa chừng khi đang có thay đổi chưa commit; nếu lỡ thì `git stash pop` ngay.
- Máy mới không có media; `agency.py check P-2` sẽ báo thiếu file (xem `docs/P-2-home-setup.md`).
