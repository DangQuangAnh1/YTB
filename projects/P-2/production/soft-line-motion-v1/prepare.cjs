// Bundle unmodified MIT Perfect Freehand source into ignored local runtime.
const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'../../../..');
const source=path.join(root,'third_party/video/sources/perfect-freehand');
const out=path.join(root,'third_party/video/runtime/soft-line-motion-v1');fs.mkdirSync(out,{recursive:true});
require(path.join(root,'third_party/video/runtime/p2-remotion/node_modules/esbuild')).buildSync({entryPoints:[path.join(source,'packages/perfect-freehand/src/index.ts')],bundle:true,platform:'neutral',format:'cjs',outfile:path.join(out,'stroke.cjs')});
fs.copyFileSync(path.join(source,'LICENSE'),path.join(out,'LICENSE'));
