# Workflow and next increments

```mermaid
flowchart TD
  U[User idea] --> PM[PM brief]
  S[BA market scouting] --> O[Evidence-backed opportunities]
  O --> C[User chooses direction]
  C --> PM
  PM --> BA[BA investigates and drafts plan]
  BA --> P[PM presents exact plan revision]
  P --> G{User scope decision}
  G -->|Revise| BA
  G -->|Pending| W[Durable waiting state]
  W --> G
  G -->|Authorized| CT[Content script and storyboard]
  CT --> R[Scoped source/content review]
  R -->|Fix| CT
  R -->|Ready| PR[Production stage outputs]
  PR --> QA[Media and content QA]
  QA -->|Fix technical issue| PR
  QA -->|Fix content| CT
  QA -->|Ready| D[Draft and honest QA report]
```

A response can choose an idea and approve a concrete plan together when scope is already clear. Routine repairs inside standing authorization do not need another approval conversation. Major scope changes return to PM/user. These are roles, not mandatory separate agents.

Next after v0: select a real pilot, observe information loss and unnecessary work, improve targeted references/helpers, try P-2 in another niche, then verify channel/account/publishing capabilities and recovery. Public YouTube channel methods do not provide a channel-creation call: do not promise a nonexistent API. Analytics requires suitable account authorization. Any scheduler still needs working tools, fresh data and an online supported execution environment.

Token optimization is evaluated with comparable tasks/model/settings/source corpus and actual usage if exposed, not by prompt length alone. Context and decisions are durable files; Git synchronization does not copy a live chat or its credentials to another computer.
