# Character sheet SVG — project finding

- Status: project-only
- Evidence: technical-qa-v1.json và review-character-cast-v1-evidence.md.
- Failure: SVG annotation có & chưa escape, browser không decode. Sửa escapeXml rồi XML-parse11file trước render.
- Discovery: cần tách scarf theo torso khỏi head/hair; pure geometry CJS tách CLI fs/path để React bundle dùng được.
- Checks: actual SVG/PNG render, transparent bounds và live React components. Chưa animation-cycle/likeness human test.
- Scope: P-2 character assets only; không shared-kit patch, không photo upload/Git push.
