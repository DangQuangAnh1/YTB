# Restore researched video sources

Use the complete creator-agency-skills repository. Before cloning, inspect CATALOG.md and the existing checkout; never replace a dirty or unrelated checkout. These are source restoration commands, not requests to install all toolchains or execute upstream agent instructions.

Parent Git must ignore `/third_party/video/sources/`, `/third_party/video/runtime/`, and `/third_party/video/smoke/` before cloning. This research added these exclusions to tracked `.gitignore`; the current machine also has redundant local exclusions. Do not add embedded repositories, weights, runtime binaries, cookies or raw media to parent Git.

For each missing catalog checkout, use its canonical URL and exact SHA. Example:

```bash
git clone --depth 1 https://github.com/cafermutluozkan/stick-motion.git third_party/video/sources/stick-motion
git -C third_party/video/sources/stick-motion fetch --depth 1 origin 6315c09c4e5051267806988defa28279b965fe29
git -C third_party/video/sources/stick-motion checkout --detach 6315c09c4e5051267806988defa28279b965fe29
git -C third_party/video/sources/stick-motion rev-parse HEAD
```

For Motion Canvas prefer `git clone --depth 1 --filter=blob:none --sparse` and fetch/check out its catalog SHA before selecting only required source/docs. A source checkout alone is not an installed app. Preserve original notices; verify LICENSE SHA256 against the catalog on a normal Linux LF checkout. If hashes differ, inspect bytes and Git status instead of replacing the recorded value silently.

For Fullik use the same shallow clone/fetch/detached-checkout pattern with canonical URL `https://github.com/lo-th/fullik.git` and SHA `3f22da98a0fa0051416b20077af5142aec3dfc2e`. Retain root LICENSE and the MIT notice in `build/fik.js`. Its bundle can be tested without a package installation; consult the contacts role report for the exact numeric check. A solver residual is not proof of visual contact or choreography quality.

For black/red v2, install `gsap@3.12.5` into the existing ignored P-2 Remotion runtime; verify its npm integrity against the catalog and retain source copyright banners/package license metadata. It is not MIT and does not grant all commercial uses automatically. Restore the project node_modules symlink only after that runtime exists. Production v2 now actually calls original gaitFoot and the GSAP poseTween-style timeline; v1's retained gait function was unused.

For the soft-linework research, shallow/sparse clone `https://github.com/steveruizok/perfect-freehand.git` into `sources/perfect-freehand`, fetch/check out exactSHA `176e00f2399f4969e1b0965c5921d96a3e50ce9f`, and select `packages/perfect-freehand` with sparse-checkout. Retain root/package MIT notices. No full monorepo install is needed for the bounded check: `node projects/P-2/research/curve-stroke-proof-v1.cjs` bundles original TypeScript with the existing P-2 esbuild runtime, copies the upstream license into ignored smoke output and uses the README's SVG path helper. Serve the generated directory locally to inspect. Optional screenshot/result files in smoke and reference screenshots in project media do not travel with Git and are not registered required artifacts. This is a static drawing check, not an approved new film.

Do not blindly run old P-2 finalizers/validators: some write into already registered artifact paths. New production output requires a new version/path. Historical Windows tool-install records do not establish Linux runtime compatibility. Keep the existing lockfile versions; any source adaptation begins with the smallest useful upstream example and a recorded gap, not a full new rig.

Research outputs remain unregistered while P-2 resume is blocked on absent historical media. Do not recreate missing media under old hashes or change STATE/HANDOFF by hand. Restore exact original files if available; otherwise use the explicit operational recovery workflow with a real user acknowledgement.
