const fs=require('fs'),path=require('path'),m=require('./motion.cjs');
const distance=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function pointSegment(p,a,b){let dx=b[0]-a[0],dy=b[1]-a[1],u=Math.max(0,Math.min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)));return distance(p,[a[0]+dx*u,a[1]+dy*u]);}
let maxReach=0,maxLength=0,maxStanceDrift=0,stancePairs=0,finite=true,bounds=[Infinity,Infinity,-Infinity,-Infinity];
for(let f=0;f<450;f++)for(let id of ['red','black']){
 let s=m.sample(id,f),j=m.joints(s);
 for(let k of ['lb','lf','ab','af']){
  let v=j[k],l1=k[0]==='l'?m.L.thigh:m.L.upper,l2=k[0]==='l'?m.L.shin:m.L.fore;
  if(v.error!==undefined)maxReach=Math.max(maxReach,v.error);
  maxLength=Math.max(maxLength,Math.abs(distance(v.a,v.j)-l1),Math.abs(distance(v.j,v.end)-l2));
  for(let p of [v.a,v.j,v.end]){finite=finite&&p.every(Number.isFinite);bounds=[Math.min(bounds[0],p[0]),Math.min(bounds[1],p[1]),Math.max(bounds[2],p[0]),Math.max(bounds[3],p[1])];}
 }
 if(f>0&&s.gaitPure){let prev=m.sample(id,f-1),q=m.joints(prev);if(prev.gaitPure)for(let [k,phase] of [['lf','gaitPhaseF'],['lb','gaitPhaseB']])if(s[phase]<s.gaitDuty&&prev[phase]<s.gaitDuty&&s[phase]>=prev[phase]){maxStanceDrift=Math.max(maxStanceDrift,distance(j[k].end,q[k].end));stancePairs++;}}
}
const contacts=m.hits.map(h=>{let r=m.joints(m.sample('red',h.f)),b=m.joints(m.sample('black',h.f)),d;
 if(h.f===59)d=distance(r.af.end,b.ab.end);
 else if(h.f===86)d=distance(r.ab.end,b.ab.end);
 else if(h.f===151)d=pointSegment(r.af.end,b.hip,b.shoulder);
 else if(h.f===193)d=distance(b.lf.end,r.af.end);
 else if(h.f===240)d=distance(r.lf.end,b.af.end);
 else if(h.f===327)d=pointSegment(b.af.end,r.af.j,r.af.end);
 else d=pointSegment(r.af.end,b.af.j,b.af.end);
 return {frame:h.f,distance:d,meaning:'distance to actual authored guard/body; visible strokes have thickness'};
});
let seekDeterministic=true;for(let id of ['red','black'])for(let f of [0,24,59,151,193,240,327,449]){let a=JSON.stringify(m.joints(m.sample(id,f)));for(let other of [449,0,240,113])m.sample(id,other);seekDeterministic=seekDeterministic&&a===JSON.stringify(m.joints(m.sample(id,f)));}
const report={frames:450,limbs:3600,maxReachError:maxReach,maxSegmentLengthError:maxLength,finite,jointBounds:bounds,upstreamGaitStancePairs:stancePairs,maxGaitStanceWorldDrift:maxStanceDrift,contactDistances:contacts,seekDeterministic,executedUpstream:['solveLegIK','chain2','upVec','gaitFoot','POSES.STAND baseline','GSAP3.12.5 paused timeline seek'],scope:'numeric constraints/seek/contact proximity only; not creative quality',pass:finite&&maxReach<.1&&maxLength<1e-8&&maxStanceDrift<1e-8&&stancePairs>20&&contacts.every(c=>c.distance<16)&&seekDeterministic};
fs.writeFileSync(path.resolve(__dirname,'../../artifacts/render/black-red-duel-v2/rig-validation.json'),JSON.stringify(report,null,2));console.log(report);if(!report.pass)process.exitCode=1;
