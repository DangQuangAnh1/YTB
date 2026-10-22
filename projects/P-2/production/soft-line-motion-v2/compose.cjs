const CLIPS={red:require('./clips/cmu-144_20-jab.json'),black:require('./clips/cmu-144_26-block-mirror.json')};
const PLACE={red:{x:490,face:1},black:{x:795,face:-1}};
const FRAMES=90;
const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
const unit=(a,b)=>{const d=Math.hypot(b[0]-a[0],b[1]-a[1])||1;return[(b[0]-a[0])/d,(b[1]-a[1])/d];};
const rearSide={};
for(const id of Object.keys(CLIPS)){const c=CLIPS[id],f=PLACE[id].face,m=k=>c.frames.reduce((s,fr)=>s+fr[k][0]*f,0)/c.frames.length;rearSide[id]=m('ftR')<m('ftL')?'R':'L';}
function pose(id,f){
 const c=CLIPS[id],fr=c.frames[Math.max(0,Math.min(f,c.frames.length-1))],ox=PLACE[id].x-c.frames[0].hips[0],j={};
 for(const k in fr)j[k]=[fr[k][0]+ox,fr[k][1]];
 const u=unit(j.headTop,j.head),headC=[j.headTop[0]+u[0]*23,j.headTop[1]+u[1]*23];
 return{id,face:PLACE[id].face,rear:rearSide[id],j,hipMid:mid(j.hipR,j.hipL),shoulderMid:mid(j.shR,j.shL),headC,headBottom:[headC[0]+u[0]*23,headC[1]+u[1]*23]};
}
module.exports={pose,FRAMES,CLIPS,PLACE,rearSide};
