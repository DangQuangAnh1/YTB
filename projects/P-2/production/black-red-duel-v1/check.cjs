const fs=require('fs'),path=require('path'),m=require('./motion.cjs');
let maxReach=0,maxLength=0,bounds=[Infinity,Infinity,-Infinity,-Infinity];
for(let f=0;f<450;f++)for(let id of ['red','black']){
 const j=m.joints(m.sample(id,f));
 for(let k of ['lb','lf','ab','af']){
  const v=j[k],len=k[0]==='l'?90:65;
  maxReach=Math.max(maxReach,v.error);
  for(let [a,b] of [[v.a,v.j],[v.j,v.end]])maxLength=Math.max(maxLength,Math.abs(Math.hypot(a[0]-b[0],a[1]-b[1])-len));
  for(let p of [v.a,v.j,v.end]){if(!p.every(Number.isFinite))throw Error('nonfinite joint');bounds=[Math.min(bounds[0],p[0]),Math.min(bounds[1],p[1]),Math.max(bounds[2],p[0]),Math.max(bounds[3],p[1])];}
 }
}
let contacts=m.hits.map(h=>{let a=m.joints(m.sample('red',h.f)),b=m.joints(m.sample('black',h.f));let p=h.f===148?a.lf.end:a.af.end;return {frame:h.f,distance:Math.hypot(p[0]-b.af.end[0],p[1]-b.af.end[1])}});
// Frame-driven seek must produce identical pose independent of evaluation order.
const a=JSON.stringify(m.joints(m.sample('red',148)));for(let f of [449,0,286,75])m.joints(m.sample('red',f));const deterministic=a===JSON.stringify(m.joints(m.sample('red',148)));
const report={frames:450,limbs:3600,maxReachError:maxReach,maxSegmentLengthError:maxLength,jointBounds:bounds,contactDistances:contacts,deterministic,scope:'numeric geometry/seek only; not visual or continuous playback approval',pass:maxReach<.1&&maxLength<1e-8&&contacts.every(c=>c.distance<.1)&&deterministic};
const out=path.resolve(__dirname,'../../artifacts/render/black-red-duel-v1');fs.writeFileSync(path.join(out,'rig-validation.json'),JSON.stringify(report,null,2));console.log(report);if(!report.pass)process.exitCode=1;
