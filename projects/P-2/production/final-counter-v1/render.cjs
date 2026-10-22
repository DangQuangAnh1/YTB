// Adapted from soft-line-motion-v2/render.cjs: vertical 1080x1920 60fps, new output folder.
// GL defaults to angle (uses the GPU, falls back to SwiftShader); GL=swangle forces software. Measured: 900 frames 97.7s (angle) vs 583-643s (swangle) on an Intel UHD 630.
const path=require('path'),fs=require('fs');
const root=path.resolve(__dirname,'../../../..'),deps=path.join(root,'third_party/video/runtime/p2-remotion/node_modules');
const {bundle}=require(path.join(deps,'@remotion/bundler'));
const {selectComposition,renderStill,renderMedia}=require(path.join(deps,'@remotion/renderer'));
const out=path.join(root,'projects/P-2/artifacts/render/final-counter-v1');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const start=Date.now();
 const serveUrl=await bundle({entryPoint:path.join(__dirname,'Video.tsx'),webpackOverride:c=>({...c,resolve:{...c.resolve,modules:[deps,'node_modules'],alias:{...c.resolve?.alias,react:path.join(deps,'react'),'react-dom':path.join(deps,'react-dom'),remotion:path.join(deps,'remotion')}}})});
 const browserExecutable='/usr/bin/google-chrome';
 const composition=await selectComposition({serveUrl,id:'FinalCounter',browserExecutable});
 const options={serveUrl,composition,browserExecutable,logLevel:'warn',chromiumOptions:{gl:process.env.GL||'angle'}};
 if(process.argv[2]==='stills'){
  const dir=path.join(out,'stills');fs.mkdirSync(dir,{recursive:true});
  for(const frame of (process.argv[3]||'0,60,135,205,298,480,567,650,800').split(',').map(Number)) await renderStill({...options,frame,output:path.join(dir,`frame-${frame}.png`)});
 }else{
  let last=-1;await renderMedia({...options,codec:'h264',outputLocation:path.join(out,'visual-silent.mp4'),concurrency:+(process.env.CONC||6),crf:18,onProgress:({progress})=>{let p=Math.floor(progress*20)*5;if(p!==last){console.log(p+'%');last=p}}});
  fs.writeFileSync(path.join(out,'render-timing.json'),JSON.stringify({seconds:(Date.now()-start)/1000,frames:900,fps:60,width:1080,height:1920},null,2));
 }
})().catch(e=>{console.error(e);process.exit(1)});
