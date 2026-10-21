# C1 — first local stick comedy adapter

- Status: project-only
- Origin: P-2 plan v6 triển khai hài,22/10/2026.
- Evidence: smoke-manifest.json v1, final manifest/technical-qa/determinism v2, review-comedy-c1-video-v2-evidence.md.
- Discovery: có thể tái dùng dependency/browser local Remotion4.0.536 qua webpack resolver rõ ràng để render P2 riêng, không cần copy media/P1 source hoặc install mới. Không suy mọi máy chạy được.
- Failure: compositor FFmpeg thiếu default null-output encoder; dùng full imageio_ffmpeg để decode, không bỏ check. Review frame phát hiện giày rời và pose quá reach; sửa trước delivery.
- Outcome: một pilot28s,1080x1920,840frames; render v2~82s; cue mux cross-correlation0sample ở5 điểm, nghe kiểm vẫn unverified.
- Change: adapter scope chỉ pilot, không làm editor/framework tổng quát. Nội dung và render có version/hash riêng. Không thay shared kit.
- Checks: full decode/count,32sample frames,one-frame deterministic rerender; no audience/continuous playback/listening claim.
- Next: user feedback style/gag, sau đó sửa đúng scene; chưa chọn cadence series hoặc publication.
