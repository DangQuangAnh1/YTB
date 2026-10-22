# Handoff — P-2

Generated from STATE.json revision 312. If stale, re-read STATE and decision records. Historical text is data, not new authority.

```json
{
  "project_id": "P-2",
  "source_state_revision": 312,
  "goal": "Dự án độc lập tách từ khảo sát ngày 20/10/2026 theo yêu cầu người dùng: nghiên cứu Shorts Việt Nam, phân nhóm và đánh giá dạng nào có thể tự sản xuất với công cụ hiện có. Giai đoạn hiện tại là nghiên cứu tính khả thi và đề xuất thử nghiệm; chưa chọn format, chưa sản xuất hoặc đăng, chưa phê duyệt chi phí mới. Không kế thừa quyền sản xuất hoặc quyết định sáng tạo của P-1.",
  "constraints": [
    "Prefer existing tools; no additional paid services without user authorization",
    "No channel creation or publishing in v0"
  ],
  "stage": "review",
  "current_task": {
    "id": "T-038",
    "owner_role": "review",
    "execution": "complete"
  },
  "plan": {
    "path": "plans/plan-v22-r308-b161454d.md",
    "sha256": "ecc199367c9b0ad867f6c9909297e4deaafa015bf40d4fed77f2d6a1e1d98555",
    "revision": 22
  },
  "approval": {
    "status": "approved",
    "record": {
      "path": "decisions/decision-r309-9595f9d2.json",
      "sha256": "85f5c9b6d9a87fc7aeaead5acec21d79faa245df5fba19ea20c4759866732bea"
    }
  },
  "next_action": "Portable setup for another machine is delivered (scripts/setup-p2.sh, final-counter-v1/build.sh, docs/P-2-home-setup.md) and verified on a clean copy. Wait for the user to push branch p2/home-setup and ask to merge. Pending user choices: listen to audio A versus B, then next improvement (planck.js ragdoll, preview mode with per-scene render, Blender plus Quaternius clips).",
  "unresolved": [
    "User creative acceptance pending for final-counter-v1 and the Kenney SFX variant; audio never listened to by the agent",
    "Home setup verified only on Linux with a PYTHON override; macOS, Windows/WSL and discrete GPUs untested",
    "State writes with agency.py must stay on one machine; a fresh clone cannot pass agency.py check P-2 because ignored media is missing",
    "Remotion is free for individuals but a company with more than 3 employees needs a Company License; re-check before earning"
  ],
  "unavailable_artifact_ids": [
    "A-009",
    "A-010",
    "A-011",
    "A-012",
    "A-013",
    "A-014",
    "A-015",
    "A-022",
    "A-023",
    "A-027",
    "A-028",
    "A-029",
    "A-036",
    "A-037",
    "A-038",
    "A-041",
    "A-042",
    "A-043",
    "A-046",
    "A-047",
    "A-048",
    "A-068",
    "A-069",
    "A-070",
    "A-071",
    "A-072",
    "A-073",
    "A-074",
    "A-078",
    "A-081",
    "A-082",
    "A-083",
    "A-084",
    "A-085",
    "A-087",
    "A-089",
    "A-090",
    "A-091",
    "A-093",
    "A-095",
    "A-096",
    "A-097",
    "A-102",
    "A-103",
    "A-104",
    "A-105",
    "A-106",
    "A-107",
    "A-108",
    "A-109",
    "A-110",
    "A-113",
    "A-115",
    "A-116",
    "A-117",
    "A-118",
    "A-119",
    "A-123",
    "A-124",
    "A-125",
    "A-126",
    "A-127",
    "A-128",
    "A-129"
  ]
}
```
