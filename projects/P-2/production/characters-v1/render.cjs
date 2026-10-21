const path=require('path'),fs=require('fs');
const root=path.resolve(__dirname,'../../../..');
const deps=path.join(root,'projects/P-1/production/engine-v1/node_modules');
const {bundle}=require(path.join(deps,'@remotion/bundler'));
const {selectComposition,renderStill}=require(path.join(deps,'@remotion/renderer'));
const out=path.join(root,'projects/P-2/artifacts/characters/duo-v1');
const browserExecutable=path.join(deps,'.remotion/chrome-headless-shell/win64/chrome-headless-shell-win64/chrome-headless-shell.exe');
(async()=>{
 const serveUrl=await bundle({entryPoint:path.join(__dirname,'Preview.tsx'),publicDir:out,webpackOverride:c=>({...c,resolve:{...c.resolve,modules:[deps,'node_modules'],alias:{...c.resolve?.alias,react:path.join(deps,'react'),'react-dom':path.join(deps,'react-dom'),remotion:path.join(deps,'remotion')}}})});
 for(const [id,name] of [['Sheet','character-sheet.png'],['Cap','cap-character.png'],['Scarf','scarf-character.png'],['Live','live-components-check.png']]){
  const composition=await selectComposition({serveUrl,id,browserExecutable});
  await renderStill({serveUrl,composition,browserExecutable,output:path.join(out,name),imageFormat:'png',frame:0,logLevel:'warn'});console.log('Rendered '+name);
 }
})().catch(e=>{console.error(e);process.exit(1)});
