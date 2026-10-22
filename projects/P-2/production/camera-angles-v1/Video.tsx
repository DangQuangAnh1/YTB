// Camera-angle experiment: the same CMU jab and kick projected from six cameras by mocap-cam.cjs, drawn with the
// soft-line-motion-v2 curve strokes (same look as final-counter). Limb order comes from depth z instead of the side-view rule.
import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const K=require('../soft-line-motion-v2/curves.cjs');
const W=1080,H=1920,FPS=60;
const ANGLES=[
 {key:'side',label:'Ngang (như hiện tại)',sub:'yaw 0°'},
 {key:'threequarter',label:'Ba phần tư',sub:'yaw 40°, pitch 6°'},
 {key:'front',label:'Gần chính diện',sub:'yaw 85°, phối cảnh gần'},
 {key:'low',label:'Góc thấp',sub:'pitch −24°, phối cảnh'},
 {key:'high',label:'Góc cao',sub:'pitch 48°'},
 {key:'behind',label:'Sau lưng',sub:'yaw 150°'}
];
const MOVES=['jab','kick'];
const CLIPS:any={};for(const m of MOVES)for(const a of ANGLES)CLIPS[m+'-'+a.key]=require(`./clips/${m}-${a.key}.json`);
const PAUSE=15;
const SEQ=MOVES.map(m=>({m,n:CLIPS[m+'-side'].frames.length}));
const LOOP=SEQ.reduce((s,x)=>s+x.n+PAUSE,0),TOTAL=LOOP*2;
function at(frame:number){let f=frame%LOOP;for(const s of SEQ){if(f<s.n+PAUSE)return{m:s.m,i:Math.min(s.n-1,f)};f-=s.n+PAUSE;}return{m:SEQ[0].m,i:0};}
const C={main:'#ff3434',far:'#c02424',hi:'#ffd6cf'};
const avgZ=(z:any,ks:string[])=>ks.reduce((s,k)=>s+z[k],0)/ks.length;
function Figure({fr}:any){
 const j=fr,z=fr.z,mid=(a:any,b:any)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const d=Math.hypot(j.head[0]-j.headTop[0],j.head[1]-j.headTop[1])||1,u=[(j.head[0]-j.headTop[0])/d,(j.head[1]-j.headTop[1])/d];
 const headC=[j.headTop[0]+u[0]*23,j.headTop[1]+u[1]*23],headBottom=[headC[0]+u[0]*22,headC[1]+u[1]*22];
 const rear=avgZ(z,['knR','ftR'])>avgZ(z,['knL','ftL'])?'R':'L';
 const S=K.strokes({j,rear,hipMid:mid(j.hipR,j.hipL),shoulderMid:mid(j.shR,j.shL),headC,headBottom});
 const farArm=avgZ(z,['elR','haR'])>avgZ(z,['elL','haL'])?'R':'L',nearArm=farArm==='R'?'L':'R';
 // Perspective: widths follow the mean size factor of the joints a stroke passes through (1 without perspective).
 const sz=fr.s,ks=(keys:string[])=>keys.reduce((a,k)=>a+sz[k],0)/keys.length,arm=(sd:string)=>ks(['sh'+sd,'el'+sd,'ha'+sd]);
 const front=rear==='R'?'L':'R',leg=(sd:string)=>ks(['hip'+sd,'kn'+sd,'ft'+sd]);
 const hi={stroke:C.hi,strokeWidth:1.4,strokeOpacity:.55},p=(s:any,w:number)=>K.svgPath(K.outline(s,w));
 return <g filter="url(#glow)">
  <path d={p(S['arm'+farArm],17*arm(farArm))} fill={C.far} {...hi}/>
  <path d={p(S.body,21*(leg(rear)+ks(['chest','neck']))/2)} fill={C.main} {...hi}/>
  <path d={p(S.frontLeg,18*leg(front))} fill={C.main} {...hi}/>
  <path d={p(S['arm'+nearArm],17*arm(nearArm))} fill={C.main} {...hi}/>
  <circle cx={headC[0]} cy={headC[1]} r={26*sz.head} fill={C.main} {...hi}/>
 </g>;
}
function Cell({a,col,row,m,i}:any){
 const cw=W/2,ch=(H-120)/3,x=col*cw,y=120+row*ch,clip=CLIPS[m+'-'+a.key],fr=clip.frames[i];
 const s=a.key==='front'||a.key==='low'?1.0:1.15;
 return <g>
  <rect x={x+6} y={y+6} width={cw-12} height={ch-12} rx="18" fill="#26272b" stroke="#3a3c42"/>
  <ellipse cx={x+cw/2} cy={y+ch-70} rx="170" ry="16" fill="#ff3030" opacity=".18"/>
  <g transform={`translate(${x+cw/2},${y+ch-70}) scale(${s}) translate(0,-610)`}><Figure fr={fr}/></g>
  <text x={x+26} y={y+52} fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontSize="34" fill="#fff">{a.label}</text>
  <text x={x+26} y={y+88} fontFamily="Liberation Sans, Arial, sans-serif" fontSize="24" fill="#9a9ca2">{a.sub}</text>
 </g>;
}
export const Angles=()=>{const frame=useCurrentFrame(),{m,i}=at(frame);
 return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 .2  0 .35 0 0 0  0 0 .25 0 0  0 0 0 1.3 0" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width={W} height={H} fill="#151619"/>
  <text x={W/2} y="78" textAnchor="middle" fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontSize="44" fill="#fff">{m==='jab'?'Cú đấm (CMU 144_20)':'Cú đá (CMU 135_07)'} · frame {i}</text>
  {ANGLES.map((a,k)=><Cell key={a.key} a={a} col={k%2} row={Math.floor(k/2)} m={m} i={i}/>)}
 </svg>;};
registerRoot(()=> <Composition id="Angles" component={Angles} width={W} height={H} fps={FPS} durationInFrames={TOTAL}/>);
