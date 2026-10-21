const path=require('path');
const fs=require('fs');
const crypto=require('crypto');
const project=path.resolve(__dirname,'../..');
const workspace=path.resolve(project,'../..');
const deps=path.join(workspace,'projects/P-1/production/engine-v1/node_modules');
const {bundle}=require(path.join(deps,'@remotion/bundler'));
const {selectComposition,renderStill,renderMedia}=require(path.join(deps,'@remotion/renderer'));
const browserExecutable=path.join(deps,'.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe');
const output=path.join(project,'artifacts/render',process.env.P2_RENDER_DIR||'comedy-c1-draft-v1');
const mode=process.argv[2]||'stills';
(async()=>{
 const script=JSON.parse(fs.readFileSync(path.join(project,'artifacts/content/comedy-c1-script-v1.json'),'utf8'));
 if(script.adapter!=='p2-stick-comedy-svg-v1'||script.frames!==840||script.fps!==30||script.scenes.length!==6)throw new Error('Unsupported script contract');
 fs.mkdirSync(output,{recursive:true});
 const start=Date.now();
 const serveUrl=await bundle({entryPoint:path.join(__dirname,'src/Comedy.tsx'),publicDir:path.join(__dirname,'public'),webpackOverride:(config)=>({...config,resolve:{...config.resolve,modules:[deps,'node_modules'],alias:{...config.resolve?.alias,react:path.join(deps,'react'),'react-dom':path.join(deps,'react-dom'),remotion:path.join(deps,'remotion')}}})});
 const composition=await selectComposition({serveUrl,id:'ComedyC1',browserExecutable});
 console.log(JSON.stringify({event:'bundle_ready',seconds:(Date.now()-start)/1000,composition:{id:composition.id,width:composition.width,height:composition.height,fps:composition.fps,durationInFrames:composition.durationInFrames}}));
 const options={serveUrl,composition,browserExecutable,logLevel:'warn',chromiumOptions:{gl:'angle'},timeoutInMilliseconds:60000};
 if(mode==='stills'){
  for(const frame of (process.argv[3]?process.argv[3].split(',').map(Number):[25,76,140,206,315,355,455,550,595,650,720,765,800,839])){
   const outputFile=path.join(output,`frame-${String(frame).padStart(3,'0')}.png`);
   await renderStill({...options,output:outputFile,frame,scale:.5});console.log(JSON.stringify({event:'still',frame,sha256:crypto.createHash('sha256').update(fs.readFileSync(outputFile)).digest('hex')}));
  }
 }else{
  const isSmoke=mode==='smoke';const outputLocation=path.join(output,isSmoke?'smoke.mp4':'draft.mp4');
  let last=-1;
  await renderMedia({...options,codec:'h264',outputLocation,scale:isSmoke?.5:1,frameRange:isSmoke?[0,119]:undefined,concurrency:2,crf:19,audioCodec:'aac',onProgress:({progress,renderedFrames,encodedFrames})=>{const pct=Math.floor(progress*10)*10;if(pct!==last){console.log(JSON.stringify({event:'progress',percent:pct,renderedFrames,encodedFrames}));last=pct;}}});
  const manifest={adapter:'p2-stick-comedy-svg-v1',mode,remotionVersion:require(path.join(deps,'remotion/package.json')).version,video:path.relative(project,outputLocation).replaceAll('\\','/'),sha256:crypto.createHash('sha256').update(fs.readFileSync(outputLocation)).digest('hex'),renderSeconds:(Date.now()-start)/1000,concurrency:2,scriptSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(project,'artifacts/content/comedy-c1-script-v1.json'))).digest('hex'),sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'src/Comedy.tsx'))).digest('hex'),audioSha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'public/soundtrack.wav'))).digest('hex'),note:'All visuals authored in code and all audio synthesized locally. Evaluation draft; no external media or provider.'};
  fs.writeFileSync(path.join(output,isSmoke?'smoke-manifest.json':'manifest.json'),JSON.stringify(manifest,null,2));console.log(JSON.stringify(manifest));
 }
})().catch(e=>{console.error(e);process.exit(1)});
