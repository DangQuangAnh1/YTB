const path=require('path'),fs=require('fs');
const root=path.resolve(__dirname,'../../../..'),deps=path.join(root,'projects/P-1/production/engine-v1/node_modules');
const {bundle}=require(path.join(deps,'@remotion/bundler'));
const {selectComposition,renderStill,renderMedia}=require(path.join(deps,'@remotion/renderer'));
const out=path.join(root,'projects/P-2/artifacts/render/charger-v1');fs.mkdirSync(out,{recursive:true});
const browserExecutable=path.join(deps,'.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe');
(async()=>{const start=Date.now();const serveUrl=await bundle({entryPoint:path.join(__dirname,'Video.tsx'),webpackOverride:c=>({...c,resolve:{...c.resolve,modules:[deps,'node_modules'],alias:{...c.resolve?.alias,react:path.join(deps,'react'),'react-dom':path.join(deps,'react-dom'),remotion:path.join(deps,'remotion')}}})});
 const composition=await selectComposition({serveUrl,id:'Charger',browserExecutable});const options={serveUrl,composition,browserExecutable,logLevel:'warn',chromiumOptions:{gl:'angle'}};
 if(process.argv[2]==='stills'){for(const frame of [30,105,195,270,315,375,435,510,569]){await renderStill({...options,frame,scale:.5,output:path.join(out,`frame-${frame}.png`)});console.log('still '+frame)}}
 else {let last=-1;await renderMedia({...options,codec:'h264',outputLocation:path.join(out,'visual-silent.mp4'),concurrency:2,crf:18,onProgress:({progress})=>{let pct=Math.floor(progress*10)*10;if(pct!==last){console.log(pct+'%');last=pct}}});fs.writeFileSync(path.join(out,'render-timing.json'),JSON.stringify({seconds:(Date.now()-start)/1000,frames:570,fps:30,width:1080,height:1920},null,2));}
})().catch(e=>{console.error(e);process.exit(1)});
