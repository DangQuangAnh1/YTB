# P-2 correction — v1 looks funny, actual reuse must cover movement

Direct current user: “nhìn hài quá, đọc và chỉnh sửa lại video -> nhớ phải tái sử dụng các repo mình bảo và dadx nghiên cứu njhé”. This rejects v1's creative result and requests revision; it does not mean every technical check was false.

Author's v1 code/encoded-frame findings: arms used one leg-IK bend convention, producing hands/forearms crowding the head; root and foot targets often moved together; red's flight lasted too long; friendly ending did not fit the intended duel tone. These are self-review findings, not facts supplied by the user. The earlier source report honestly said gaitFoot was unused; listing it in a vendored file did not mean locomotion had been reused.

Applied in new v2: original stick-motion FK arm architecture, leg IK, vector chain and actual gaitFoot for approach/retreat, STAND baseline; GSAP3.12.5 persistent flat pose timeline/seek pattern from starter; existing Remotion/Foley/export reused. Combat poses/beat decisions remain authored because upstream has no combat clip library. No redundant new solver or renderer. Source notices and exact versions retained.

Further visible correction during preview: upstream IK's exposed kneeSign parameter must match the desired silhouette. Its default+1 still reaches target exactly but made knees bow backward in this camera/pose setup. V2 uses the same solver with kneeSign−1, visually checked in full-size stance/kick frames. This is a parameter adaptation with a concrete observed reason, not another solver rewrite or a claim upstream math is broken.

Checks: all450frames/3600limbs finite/reachable; 132 adjacent pure-gait stance pairs keep world contact to numerical precision; seven contact distances are measured against actual guard/body strokes; backward/random GSAP seeks reproduce poses. Development frame sequences were viewed and the guard tightened after preview. These are scoped checks, not proof of satisfying the user. Final encoded QA/self-review records cover delivered output; continuous human listening and user creative acceptance stay open.

Project-only lesson recorded using creator-improve. No shared skill-policy change, promised reference parity, benchmark or invented improvement percentage. Preserve v1 artifacts and decisions; source reuse claims must list executed functions and visible component behavior.
