// Study harness: renders selected video-shotcraft demos (Apache-2.0, ignored checkout in third_party/video/sources/video-shotcraft)
// at half scale with the P-2 Remotion runtime. Output goes outside the repo (P2_OUT, default ~/p2-out/shotcraft-demos).
// Usage: node render.cjs [Id1,Id2]   then   python sheets.py <out dir>
const path=require('path'),fs=require('fs'),os=require('os');
const root=path.resolve(__dirname,'../../../..'),deps=path.join(root,'third_party/video/runtime/p2-remotion/node_modules');
const demos=path.join(root,'third_party/video/sources/video-shotcraft/demos').replace(/\\/g,'/');
const {bundle}=require(path.join(deps,'@remotion/bundler'));
const {getCompositions,renderMedia}=require(path.join(deps,'@remotion/renderer'));
const out=process.env.P2_OUT||path.join(os.homedir(),'p2-out/shotcraft-demos');fs.mkdirSync(out,{recursive:true});
const shell=['win64/chrome-headless-shell-win64/chrome-headless-shell.exe','linux64/chrome-headless-shell-linux64/chrome-headless-shell'].map(p=>path.join(deps,'.remotion/chrome-headless-shell',p)).find(p=>fs.existsSync(p));
const browserExecutable=process.env.CHROME||shell;
// demos.txt lines: <category>/<card>/<Component>:<DURATION_EXPORT>; all demos are 1920x1080 30fps.
const list=fs.readFileSync(path.join(__dirname,'demos.txt'),'utf8').split(/\r?\n/).filter(Boolean).map(l=>{const [p,dur]=l.split(':');return{p,dur,n:path.basename(p)}});
const entry=path.join(os.tmpdir(),'p2-shotcraft-root.tsx');
fs.writeFileSync(entry,["import React from 'react';","import {Composition,registerRoot} from 'remotion';",...list.map(d=>`import {${d.n},${d.dur}} from '${demos}/${d.p}';`),
 'const Root:React.FC=()=>(<>',...list.map(d=>`<Composition id="${d.n}" component={${d.n}} durationInFrames={${d.dur}} fps={30} width={1920} height={1080}/>`),'</>);registerRoot(Root);'].join('\n'));
(async()=>{
 const serveUrl=await bundle({entryPoint:entry,webpackOverride:c=>({...c,resolve:{...c.resolve,modules:[deps,'node_modules'],alias:{...c.resolve?.alias,react:path.join(deps,'react'),'react-dom':path.join(deps,'react-dom'),remotion:path.join(deps,'remotion')}}})});
 const comps=await getCompositions(serveUrl,{browserExecutable});const only=process.argv[2]?process.argv[2].split(','):null;
 const report={};
 for(const composition of comps){ if(only&&!only.includes(composition.id))continue;
  const t=Date.now();
  try{await renderMedia({serveUrl,composition,browserExecutable,codec:'h264',crf:23,scale:0.5,concurrency:+(process.env.CONC||6),chromiumOptions:{gl:process.env.GL||'angle'},logLevel:'error',outputLocation:path.join(out,composition.id+'.mp4')});report[composition.id]={ok:true,s:(Date.now()-t)/1000,frames:composition.durationInFrames}}
  catch(e){report[composition.id]={ok:false,error:String(e).slice(0,300)}}
  console.log(composition.id,JSON.stringify(report[composition.id]));
 }
 fs.writeFileSync(path.join(out,'render-report.json'),JSON.stringify(report,null,1));
})().catch(e=>{console.error(e);process.exit(1)});
