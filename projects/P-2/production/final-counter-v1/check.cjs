const assert=require('assert'),fs=require('fs'),path=require('path');
const F=require('./fight.cjs'),G=require('./figure.cjs'),E=require('./events.cjs'),L=require('./lib.cjs');
const N=F.OUT_FRAMES,FPS=F.FPS;
function sig(f){const sim=F.simAt(f/FPS),r=[];for(const id of ['red','blue']){const b=G.build(id,sim);assert(Object.values(b.paths).every(p=>p.length>20&&!/NaN/.test(p)),`bad path ${id} f${f}`);for(const k of L.KEYS)assert(b.j[k].every(Number.isFinite),`non-finite joint ${id} ${k} f${f}`);r.push(b.paths.body);}return r.join('|');}
const first=Array.from({length:N},(_,f)=>sig(f));
for(let f=N-1;f>=0;f-=7)assert.strictEqual(sig(f),first[f]);
const d=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const contacts=E.HITS.map(h=>{const v=F.pose(h.target,h.simT);const keys=['chest','head','haR','haL','elR','elL','shR','shL','neck','spine'];const m=Math.min(...keys.map(k=>d(h.pos,v[k])));return{kind:h.kind,outT:+h.outT.toFixed(3),distanceToNearestVictimJoint:+m.toFixed(1)};});
const near=[];for(const [name,sim,who,part,vic] of [['jab1',.833,'red','haR','head'],['jab2',1.333,'red','haR','head'],['slowmo lunge',7.2,'red','haR','head']]){const a=F.pose(who,sim),b=F.pose(vic==='head'?'blue':'red',sim);near.push({name,fistToHeadSurface:+(d(a[part],b.head)-26).toFixed(1)});}
let maxStep=0,maxAt=0;for(const id of ['red','blue'])for(let f=1;f<N;f++){const a=F.pose(id,F.simAt((f-1)/FPS)),b=F.pose(id,F.simAt(f/FPS));for(const k of ['hips','head','haR','haL','ftR','ftL']){const v=d(a[k],b[k]);if(v>maxStep){maxStep=v;maxAt=f;}}}
const result={frames:N,fps:FPS,allFinite:true,reverseSeekDeterminism:true,outDurationSeconds:+F.outAt(F.SIM_END).toFixed(3),contacts,nearMisses:near,largestJointStepWorldUnitsPerFrame:+maxStep.toFixed(1),largestStepFrame:maxAt,note:'The largest step is expected at the launch; numeric checks only, no combat realism or user acceptance.'};
const outDir=process.env.P2_OUT||path.resolve(__dirname,'../../artifacts/render/final-counter-v1');fs.mkdirSync(outDir,{recursive:true});fs.writeFileSync(path.join(outDir,'curve-validation.json'),JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,1));
