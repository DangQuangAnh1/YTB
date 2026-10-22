// BVH -> 2D joint clip seen from a chosen camera. Copied from soft-line-motion-v2/mocap2d.cjs (same parser, FK, scale and output format);
// only the projection changed: --yaw (deg, 0 = the original side view, 90 = facing the actor), --pitch (deg, >0 camera above looking down,
// <0 low angle looking up) and optional --persp <distance in output px> for perspective foreshortening. Each frame also gets z (depth, px).
// Experiment for P-2 camera-angle inserts; the fight solver in final-counter stays 2D.
const fs=require('fs');
const [,,input,output,...rest]=process.argv;
const opt={fps:30,facing:null,from:null,to:null,mirror:false,legLen:200,ground:610,yaw:0,pitch:0,persp:0};
for(let i=0;i<rest.length;i++){const k=rest[i];if(k==='--fps')opt.fps=+rest[++i];else if(k==='--facing-frame')opt.facing=+rest[++i];else if(k==='--from')opt.from=+rest[++i];else if(k==='--to')opt.to=+rest[++i];else if(k==='--mirror')opt.mirror=true;else if(k==='--name')opt.name=rest[++i];else if(k==='--yaw')opt.yaw=+rest[++i];else if(k==='--pitch')opt.pitch=+rest[++i];else if(k==='--persp')opt.persp=+rest[++i];}
const lines=fs.readFileSync(input,'utf8').replace(/\r/g,'').split('\n');
let li=0;const joints=[];
function parse(parent){
 const head=lines[li++].trim().split(/\s+/);const end=head[0]==='End';
 const j={name:end?parent.name+'_end':head[1],parent,offset:[0,0,0],channels:[],children:[],end};joints.push(j);li++;
 for(;;){const t=lines[li].trim();
  if(t.startsWith('OFFSET')){j.offset=t.split(/\s+/).slice(1,4).map(Number);li++;}
  else if(t.startsWith('CHANNELS')){j.channels=t.split(/\s+/).slice(2);li++;}
  else if(t.startsWith('JOINT')||t.startsWith('End')){j.children.push(parse(j));}
  else if(t.startsWith('}')){li++;return j;}
  else li++;}
}
while(!lines[li].trim().startsWith('ROOT'))li++;
const root=parse(null);
while(!lines[li].trim().startsWith('Frames:'))li++;
const nFrames=+lines[li++].split(':')[1],frameTime=+lines[li++].split(':')[1];
const motion=[];for(let f=0;f<nFrames;f++)motion.push(lines[li++].trim().split(/\s+/).map(Number));
const chan=joints.filter(j=>!j.end),by={};for(const j of joints)by[j.name]=j;
const rad=Math.PI/180,I=[[1,0,0],[0,1,0],[0,0,1]];
const R={X:a=>{const c=Math.cos(a*rad),s=Math.sin(a*rad);return[[1,0,0],[0,c,-s],[0,s,c]];},Y:a=>{const c=Math.cos(a*rad),s=Math.sin(a*rad);return[[c,0,s],[0,1,0],[-s,0,c]];},Z:a=>{const c=Math.cos(a*rad),s=Math.sin(a*rad);return[[c,-s,0],[s,c,0],[0,0,1]];}};
const mm=(a,b)=>a.map((r,i)=>[0,1,2].map(k=>r[0]*b[0][k]+r[1]*b[1][k]+r[2]*b[2][k]));
const mv=(m,v)=>m.map(r=>r[0]*v[0]+r[1]*v[1]+r[2]*v[2]);
const add=(a,b)=>a.map((x,i)=>x+b[i]);
function fk(frame){
 const pos={};let c=0;const vals=new Map();for(const j of chan){vals.set(j,frame.slice(c,c+j.channels.length));c+=j.channels.length;}
 (function go(j,pR,pP){
  let local=I,p=add(pP,mv(pR,j.offset));
  if(!j.end){const v=vals.get(j);let t=[0,0,0],hasT=false;
   j.channels.forEach((ch,k)=>{const ax=ch[0];if(ch.endsWith('position')){t['XYZ'.indexOf(ax)]=v[k];hasT=true;}else local=mm(local,R[ax](v[k]));});
   if(hasT)p=add(t,j.offset);}
  pos[j.name]=p;const g=mm(pR,local);for(const ch of j.children)go(ch,g,p);
 })(root,I,[0,0,0]);
 return pos;
}
const N={hips:'Hips',spine:'Spine',chest:'Spine1',neck:'Neck',head:'Head',headTop:'Head_end',shR:'RightArm',elR:'RightForeArm',haR:'RightHand',shL:'LeftArm',elL:'LeftForeArm',haL:'LeftHand',hipR:'RightUpLeg',knR:'RightLeg',ftR:'RightFoot',toeR:'RightToeBase',hipL:'LeftUpLeg',knL:'LeftLeg',ftL:'LeftFoot',toeL:'LeftToeBase'};
for(const n of Object.values(N))if(!by[n])throw new Error('missing joint '+n);
const dist=(a,b)=>Math.hypot(...a.map((x,i)=>x-b[i]));
const rest0=fk(motion[0]);
const legLen=dist(rest0.LeftUpLeg,rest0.LeftLeg)+dist(rest0.LeftLeg,rest0.LeftFoot);
const scale=opt.legLen/legLen;
const step=Math.max(1,Math.round(1/frameTime/opt.fps));
const picked=[];for(let f=1;f<motion.length;f+=step)picked.push(f);
const facingSrc=opt.facing==null?picked[0]:picked[opt.facing];
function facingOf(P){const lx=P.LeftUpLeg[0]-P.RightUpLeg[0],lz=P.LeftUpLeg[2]-P.RightUpLeg[2];return[-lz,0,lx];}
const fwd=(()=>{const P=fk(motion[facingSrc]);const f=facingOf(P);const n=Math.hypot(f[0],f[2]);return[f[0]/n,0,f[2]/n];})();
const sign=opt.mirror?-1:1;
const all=picked.map(f=>fk(motion[f]));
// Camera basis in the actor's frame: fwd (facing at the facing frame), right (horizontal, perpendicular), up.
const right=[fwd[2],0,-fwd[0]],cy_=Math.cos(opt.yaw*rad),sy_=Math.sin(opt.yaw*rad),cp=Math.cos(opt.pitch*rad),sp=Math.sin(opt.pitch*rad);
const hAx=[cy_*fwd[0]+sy_*right[0],0,cy_*fwd[2]+sy_*right[2]],dAx=[-sy_*fwd[0]+cy_*right[0],0,-sy_*fwd[2]+cy_*right[2]];
const hips0=all[0][N.hips];
// view(q): screen right h, screen up u, depth d (away from camera), all in source units relative to the first-frame hips.
function view(q){const r=[q[0]-hips0[0],q[1]-hips0[1],q[2]-hips0[2]];const h=r[0]*hAx[0]+r[2]*hAx[2],y=r[1],d0=r[0]*dAx[0]+r[2]*dAx[2];
 return[h,y*cp+d0*sp,-y*sp+d0*cp];}
function proj(q){const [h,u,d]=view(q);const k=opt.persp>0?opt.persp/(opt.persp+d*scale):1;return[sign*h*scale*k,u*scale*k,d*scale,k];}
// Ground: like mocap2d over the whole trial when the camera is level (pitch 0 reproduces the side clips exactly); with pitch,
// travel in depth outside the cut would shift the floor, so only the cut frames count.
const groundSet=opt.pitch===0?all:all.slice(opt.from??0,(opt.to??all.length-1)+1);
let minU=Infinity;for(const P of groundSet)for(const k of ['ftR','ftL'])minU=Math.min(minU,proj(P[N[k]])[1]);
// z: depth per joint (px, larger = farther); s: perspective size factor per joint (1 without --persp) for head and stroke widths.
let frames=all.map(P=>{const o={},z={},sz={};for(const k in N){const [x,u,d,f]=proj(P[N[k]]);o[k]=[Math.round(x*10)/10,Math.round((opt.ground-(u-minU))*10)/10];z[k]=Math.round(d*10)/10;sz[k]=Math.round(f*1000)/1000;}o.z=z;o.s=sz;return o;});
const lo=opt.from??0,hi=opt.to??frames.length-1;frames=frames.slice(lo,hi+1);
const name=opt.name||input.split('/').pop().replace(/\.bvh$/i,'');
const out={name,camera:{yaw:opt.yaw,pitch:opt.pitch,persp:opt.persp},source:'CMU Graphics Lab Motion Capture Database via una-dinosauria/cmu-mocap BVH mirror',fps:opt.fps,scale:+scale.toFixed(4),facingSourceFrame:facingSrc,forward:fwd.map(v=>+v.toFixed(3)),mirror:opt.mirror,ground:opt.ground,sourceFrameStart:picked[lo],frameCount:frames.length,frames};
fs.writeFileSync(output,JSON.stringify(out));
console.log(`${name}: ${frames.length}/${picked.length} frames @${opt.fps}fps scale=${scale.toFixed(3)} forward=(${fwd[0].toFixed(2)},${fwd[2].toFixed(2)}) facingFrame=${facingSrc}`);
if(process.env.MOCAP_REPORT){
 const yaw=P=>{const f=facingOf(P);return Math.atan2(f[0],f[2])/rad;};
 const rows=all.map((P,i)=>{const f=facingOf(P),n=Math.hypot(f[0],f[2]),u=[f[0]/n,f[2]/n];
  const reach=h=>{const hand=P[N['ha'+h]],sh=P[N['sh'+h]];return((hand[0]-sh[0])*u[0]+(hand[2]-sh[2])*u[1])*scale;};
  const foot=h=>{const a=P[N['ft'+h]],hp=P[N['hip'+h]];return((a[0]-hp[0])*u[0]+(a[2]-hp[1+1])*u[1])*scale;};return{i,yaw:yaw(P),reachR:reach('R'),reachL:reach('L'),footR:foot('R'),footL:foot('L'),footUpR:(P[N.ftR][1]-P[N.hipR][1])*scale,footUpL:(P[N.ftL][1]-P[N.hipL][1])*scale};});
 const peaks=[];for(const side of ['reachR','reachL','footR','footL'])for(let i=2;i<rows.length-2;i++){const v=rows[i][side];if(v>(side.startsWith('foot')?100:85)&&v>=rows[i-1][side]&&v>=rows[i+1][side]&&v>=rows[i-2][side]&&v>=rows[i+2][side])peaks.push(`${side.startsWith('foot')?'foot':'hand'}${side.slice(-1)}@f${i}(reach ${v.toFixed(0)}, yaw ${rows[i].yaw.toFixed(0)})`);}
 console.log('  yaw start/end:',rows[0].yaw.toFixed(0),rows.at(-1).yaw.toFixed(0),'| punch-like peaks (forward reach>85px of 130):',peaks.join(' ')||'none');
}
