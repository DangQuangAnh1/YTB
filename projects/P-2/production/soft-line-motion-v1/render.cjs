// Adapted from P-2 action-v1/render.cjs: Linux host, new output, frame-driven source.
const path=require('path'),fs=require('fs');
const root=path.resolve(__dirname,'../../../..'),deps=path.join(root,'third_party/video/runtime/p2-remotion/node_modules');
const {bundle}=require(path.join(deps,'@remotion/bundler'));
const {selectComposition,renderStill,renderMedia}=require(path.join(deps,'@remotion/renderer'));
const out=path.join(root,'projects/P-2/artifacts/render/soft-line-motion-v1');fs.mkdirSync(out,{recursive:true});
(async()=>{
 const start=Date.now();
 const serveUrl=await bundle({entryPoint:path.join(__dirname,'Video.tsx'),webpackOverride:c=>({...c,resolve:{...c.resolve,modules:[deps,'node_modules'],alias:{...c.resolve?.alias,react:path.join(deps,'react'),'react-dom':path.join(deps,'react-dom'),remotion:path.join(deps,'remotion')}}})});
 const browserExecutable='/usr/bin/google-chrome';
 const composition=await selectComposition({serveUrl,id:'SoftLineMotion',browserExecutable});
 const options={serveUrl,composition,browserExecutable,logLevel:'warn',chromiumOptions:{gl:'swangle'}};
 if(process.argv[2]==='stills'){
  for(const frame of (process.argv[3]||'0,10,15,30,42,59,69,75,89').split(',').map(Number)) await renderStill({...options,frame,output:path.join(out,`frame-${frame}.png`)});
 }else{
  let last=-1;await renderMedia({...options,codec:'h264',outputLocation:path.join(out,'visual-silent.mp4'),concurrency:2,crf:18,onProgress:({progress})=>{let p=Math.floor(progress*10)*10;if(p!==last){console.log(p+'%');last=p}}});
  fs.writeFileSync(path.join(out,'render-timing.json'),JSON.stringify({seconds:(Date.now()-start)/1000,frames:90,fps:30,width:1280,height:720},null,2));
 }
})().catch(e=>{console.error(e);process.exit(1)});
