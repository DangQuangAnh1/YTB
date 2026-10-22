// Renders the camera-angle comparison (adapted from final-counter-v1/render.cjs). Output outside the repo: P2_OUT, default ~/p2-out/camera-angles-v1.
// Usage: node render.cjs            -> angles.mp4
//        node render.cjs stills 20,40 -> stills/frame-N.png
const path=require('path'),fs=require('fs'),os=require('os');
const root=path.resolve(__dirname,'../../../..'),deps=path.join(root,'third_party/video/runtime/p2-remotion/node_modules');
const {bundle}=require(path.join(deps,'@remotion/bundler'));
const {selectComposition,renderStill,renderMedia}=require(path.join(deps,'@remotion/renderer'));
const out=process.env.P2_OUT||path.join(os.homedir(),'p2-out/camera-angles-v1');fs.mkdirSync(out,{recursive:true});
const shell=['win64/chrome-headless-shell-win64/chrome-headless-shell.exe','linux64/chrome-headless-shell-linux64/chrome-headless-shell'].map(p=>path.join(deps,'.remotion/chrome-headless-shell',p)).find(p=>fs.existsSync(p));
const browserExecutable=process.env.CHROME||(fs.existsSync('/usr/bin/google-chrome')?'/usr/bin/google-chrome':shell);
(async()=>{
 const serveUrl=await bundle({entryPoint:path.join(__dirname,'Video.tsx'),webpackOverride:c=>({...c,resolve:{...c.resolve,modules:[deps,'node_modules'],alias:{...c.resolve?.alias,react:path.join(deps,'react'),'react-dom':path.join(deps,'react-dom'),remotion:path.join(deps,'remotion')}}})});
 const composition=await selectComposition({serveUrl,id:'Angles',browserExecutable});
 const options={serveUrl,composition,browserExecutable,logLevel:'warn',chromiumOptions:{gl:process.env.GL||'angle'}};
 if(process.argv[2]==='stills'){
  const dir=path.join(out,'stills');fs.mkdirSync(dir,{recursive:true});
  for(const frame of (process.argv[3]||'20').split(',').map(Number))await renderStill({...options,frame,output:path.join(dir,`frame-${frame}.png`)});
 }else await renderMedia({...options,codec:'h264',crf:20,outputLocation:path.join(out,'angles.mp4'),concurrency:+(process.env.CONC||6)});
})().catch(e=>{console.error(e);process.exit(1)});
