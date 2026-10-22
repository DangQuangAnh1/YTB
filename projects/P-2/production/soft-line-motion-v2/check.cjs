const assert=require('assert'),fs=require('fs'),path=require('path');
const c=require('./compose.cjs'),k=require('./curves.cjs');
const IDS=['red','black'];
function frame(f){const out=[];for(const id of IDS){const P=c.pose(id,f),S=k.strokes(P);for(const key of ['body','frontLeg','armR','armL']){const o=k.outline(S[key],14);assert(o.length>10&&o.flat().every(Number.isFinite),`non-finite ${id} ${key} f${f}`);out.push(k.svgPath(o));}}return out;}
const first=Array.from({length:c.FRAMES},(_,f)=>frame(f));
for(let f=c.FRAMES-1;f>=0;f--)assert.deepStrictEqual(frame(f),first[f]);
const d=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
const slide={};
for(const id of IDS){let worst=0,frames=[];for(let f=1;f<c.FRAMES;f++){const a=c.pose(id,f-1).j,b=c.pose(id,f).j;for(const s of ['R','L']){if(a['ft'+s][1]>=608.5&&b['ft'+s][1]>=608.5){const v=Math.abs(b['ft'+s][0]-a['ft'+s][0]);if(v>.6)frames.push(f);worst=Math.max(worst,v);}}}slide[id]={worstGroundedFootSlidePxPerFrame:+worst.toFixed(2),framesOver0_6px:[...new Set(frames)].length};}
const segDist=(p,a,b)=>{const ab=[b[0]-a[0],b[1]-a[1]],t=Math.max(0,Math.min(1,((p[0]-a[0])*ab[0]+(p[1]-a[1])*ab[1])/(ab[0]*ab[0]+ab[1]*ab[1]||1)));return Math.hypot(p[0]-a[0]-ab[0]*t,p[1]-a[1]-ab[1]*t);};
let minHand={d:1e9,f:-1},minHead={d:1e9,f:-1},minArm={d:1e9,f:-1};
for(let f=0;f<c.FRAMES;f++){const r=c.pose('red',f),b=c.pose('black',f);
 for(const hr of ['haR','haL'])for(const hb of ['haR','haL']){const v=d(r.j[hr],b.j[hb]);if(v<minHand.d)minHand={d:+v.toFixed(1),f};}
 for(const hr of ['haR','haL'])for(const s2 of ['R','L']){const v=Math.min(segDist(r.j[hr],b.j['el'+s2],b.j['ha'+s2]),segDist(r.j[hr],b.j['sh'+s2],b.j['el'+s2]));if(v<minArm.d)minArm={d:+v.toFixed(1),f};}
 for(const hr of ['haR','haL']){const v=d(r.j[hr],b.headC)-23;if(v<minHead.d)minHead={d:+v.toFixed(1),f};}}
const result={frames:c.FRAMES,strokePaths:c.FRAMES*8,allFinite:true,reverseSeekDeterminism:true,groundedFootSlide:slide,closestRedHandToBlackHand:minHand,closestRedHandToBlackArmSegment:minArm,closestRedHandToBlackHeadSurface:minHead,source:'CMU 144_20 (red jab) and 144_26 mirrored (black block), side view via mocap2d.cjs',scope:'numeric checks only; no combat realism or user acceptance'};
fs.writeFileSync(path.resolve(__dirname,'../../artifacts/render/soft-line-motion-v2/curve-validation.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,1));
