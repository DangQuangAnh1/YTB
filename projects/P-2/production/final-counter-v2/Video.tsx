// final-counter-v2: v1 plus two shot recipes adapted from video-shotcraft (Apache-2.0, commit 43bd349a136651865ecfa6ea1cf012f6e957d304):
// Intro <- demos/transition/transition-hidden-cut/VersusSlam.tsx, Anime impact <- demos/effects/impact-feedback/AnimeImpact.tsx.
// Both rewritten as SVG for 1080x1920 at 60fps (demo frame counts doubled); timings and parameters follow the demos.
import React from 'react';
import {Composition,Easing,registerRoot,spring,useCurrentFrame} from 'remotion';
const F=require('./fight.cjs');
const G=require('./figure.cjs');
const E=require('./events.cjs');
const L=require('./lib.cjs');
const {getStroke}=require('../../../../third_party/video/runtime/soft-line-motion-v1/stroke.cjs');
const W=1080,H=1920,FPS=60;
const smooth=L.smooth,lerp=L.lerp;
const COL:any={
 red:{main:'#ff3434',far:'#c02424',glow:'#ff5a3c',hi:'#ffd6cf',trail:'#ff6a4d'},
 blue:{main:'#3d6dff',far:'#2a4bd0',glow:'#2fe6ff',hi:'#d4f6ff',trail:'#35e0ff'}
};
const ZK=[[0,1.5],[.5,1.65],[.9,1.95],[2,1.95],[2.25,2.1],[2.7,1.85],[3.35,2.05],[3.9,1.8],[4.5,1.7],[4.9,2.0],[5.6,1.85],[6.7,1.9],[7.05,2.4],[7.45,2.4],[7.75,2.5],[7.95,1.9],[8.45,1.08],[9.8,1.08],[10.8,1.7],[13.3,2.1]];
const FK=[[0,0],[6.95,0],[7.1,1],[7.5,1],[7.9,.3],[8.3,0],[10.4,0],[13.3,.7]];
const WK=[[0,0],[9.6,0],[10.6,1],[13.3,1]];
function keyed(keys:any,t:number){
 if(t<=keys[0][0])return keys[0][1];
 for(let i=1;i<keys.length;i++)if(t<=keys[i][0]){const u=smooth((t-keys[i-1][0])/(keys[i][0]-keys[i-1][0]));return lerp(keys[i-1][1],keys[i][1],u);}
 return keys.at(-1)[1];
}
function camera(tOut:number){
 const sim=F.simAt(tOut),z=keyed(ZK,sim),f=keyed(FK,sim),w=keyed(WK,sim);
 let mid=0,n=0;
 for(let i=0;i<10;i++){const s=Math.max(0,sim-i*.025);const r=L.hipMid(F.pose('red',s)),b=L.hipMid(F.pose('blue',s));mid+=(r[0]+b[0])/2;n++;}
 mid/=n;
 const bx=L.hipMid(F.pose('blue',sim))[0];
 let cx=lerp(mid,bx,w);
 if(w<.5){let mn=1e9,mx=-1e9;for(const id of ['red','blue']){const j=F.pose(id,sim);for(const k of L.KEYS){mn=Math.min(mn,j[k][0]);mx=Math.max(mx,j[k][0]);}}
  const half=W/2/z,lo=mx+40-half,hi=mn-40+half;if(lo<=hi)cx=Math.max(lo,Math.min(hi,cx));else cx=(mn+mx)/2;}
 const cy0=610-.09*H/z,cyh=290+.15*H/z,cy=lerp(cy0,cyh,f);
 let sx=0,sy=0;
 for(const h of E.HITS){const tau=tOut-h.outT;if(tau>=0&&tau<.6){const A=h.power*13*Math.exp(-tau/.11);sx+=A*Math.sin(tau*95);sy+=A*Math.cos(tau*83);}}
 return{z,cx,cy,sx,sy,sim};
}
function trailPath(id:string,key:string,sim:number){
 const pts:any=[];
 for(let k=9;k>=0;k--){const s=Math.max(0,sim-k*.011);pts.push([...F.pose(id,s)[key],.5]);}
 const o=getStroke(pts,{size:34,thinning:.5,smoothing:.6,streamline:.2,simulatePressure:false,start:{taper:true},end:{taper:0},last:true});
 if(o.length<4)return '';
 const avg=(a:number,b:number)=>(a+b)/2;let d=`M${o[0]} Q${o[1]} ${avg(o[1][0],o[2][0])},${avg(o[1][1],o[2][1])}`;
 for(let i=2;i<o.length-1;i++)d+=` T${avg(o[i][0],o[i+1][0])},${avg(o[i][1],o[i+1][1])}`;
 return d+' Z';
}
function Trails({id,sim}:any){
 const out:any=[];
 for(const key of ['haR','haL','ftR','ftL']){
  const a=F.pose(id,sim)[key],b=F.pose(id,Math.max(0,sim-.033))[key],v=Math.hypot(a[0]-b[0],a[1]-b[1]);
  if(v>13){const al=Math.min(.85,(v-13)/35+.3),d=trailPath(id,key,sim);if(d)out.push(<path key={key} d={d} fill={COL[id].trail} opacity={al}/>);}
 }
 return <g>{out}</g>;
}
function Fighter({id,sim}:any){
 const b=G.build(id,sim),c=COL[id],hi={stroke:c.hi,strokeWidth:1.4,strokeOpacity:.55};
 return <g filter={`url(#glow-${id})`}>
  <path d={b.paths.armL} fill={c.far} {...hi}/>
  <path d={b.paths.legF} fill={b.rear==='R'?c.far:c.main} {...hi}/>
  <path d={b.paths.body} fill={c.main} {...hi}/>
  <path d={b.paths.armR} fill={c.main} {...hi}/>
  <circle cx={b.headC[0]} cy={b.headC[1]} r="26" fill={c.main} {...hi}/>
  <circle cx={b.headC[0]-8*F.FACE[id]*-1} cy={b.headC[1]-8} r="6" fill="#fff" opacity=".35"/>
 </g>;
}
function FloorGlow({id,sim}:any){
 const j=F.pose(id,sim),hm=L.hipMid(j),low=L.lowest(j),up=Math.max(0,610-low),a=Math.exp(-up/140);
 return <ellipse cx={hm[0]} cy="614" rx={170-up*.3} ry="20" fill={`url(#floor-${id})`} opacity={.9*a}/>;
}
function star(cx:number,cy:number,R:number,r:number,n:number,rot:number){
 const p:any=[];for(let i=0;i<n*2;i++){const a=rot+Math.PI*i/n,rr=i%2?r:R;p.push([cx+Math.cos(a)*rr,cy+Math.sin(a)*rr]);}
 return p.map((q:any)=>q.join(',')).join(' ');
}
function Impact({h,tOut}:any){
 const tau=tOut-h.outT;if(tau<0||tau>.5)return null;
 const [x,y]=h.pos,P=h.power,c=h.who==='blue'?'#35e0ff':'#ff6a4d';
 const grow=Math.min(1,tau/.09),fade=tau<.18?1:Math.max(0,1-(tau-.18)/.2);
 const R=(34+46*P)*(.4+.6*grow),ring=30+230*P*(1-Math.exp(-tau/.13)),ro=Math.max(0,1-tau/.5);
 const rnd=(i:number)=>{const s=Math.sin(i*127.1+P*311.7)*43758.5453;return s-Math.floor(s);};
 const sparks:any=[];for(let i=0;i<12;i++){const a=rnd(i)*Math.PI*2,r0=24+tau*620*(.6+rnd(i+9)*.7),l=16+rnd(i+3)*22;sparks.push(<line key={i} x1={x+Math.cos(a)*r0} y1={y+Math.sin(a)*r0} x2={x+Math.cos(a)*(r0+l)} y2={y+Math.sin(a)*(r0+l)} stroke={h.kind==='block'?'#ffe27a':'#fff'} strokeWidth="4" strokeLinecap="round" opacity={Math.max(0,1-tau/.3)}/>);}
 return <g>
  <polygon points={star(x,y,R,R*.42,9,tau*2)} fill="#fff" opacity={fade}/>
  <polygon points={star(x,y,R*.72,R*.3,9,tau*2+.2)} fill={c} opacity={fade}/>
  <circle cx={x} cy={y} r={ring} fill="none" stroke="#fff" strokeWidth={10*ro+1} opacity={ro*.9}/>
  <circle cx={x} cy={y} r={ring*.78} fill="none" stroke={c} strokeWidth={14*ro+1} opacity={ro*.6}/>
  {sparks}
 </g>;
}
function Dust({x,t0,tOut,n,spread,seed=1}:any){
 const tau=tOut-t0;if(tau<0||tau>.8)return null;
 const out:any=[];
 for(let i=0;i<n;i++){const s=Math.sin(i*91.7+seed*13.3)*43758.5453,r=s-Math.floor(s),px=x+(r-.5)*spread*2,py=610-tau*(40+r*60),rad=12+tau*(50+r*40);out.push(<circle key={i} cx={px} cy={py} r={rad} fill="#c9ccd1" opacity={.42*Math.max(0,1-tau/.8)}/>);}
 return <g>{out}</g>;
}
function SpeedLines({tOut}:any){
 if(tOut>.95)return null;
 const out:any=[];
 for(let i=0;i<16;i++){const s=Math.sin(i*57.3)*43758.5453,r=s-Math.floor(s),y=260+r*1250,len=240+r*340,x=((W+len)-((tOut*(2300+r*900)+i*210)%(W+len+300)));out.push(<line key={i} x1={x} y1={y} x2={x+len} y2={y} stroke="#fff" strokeWidth={3+r*3} opacity={.32*(1-tOut/.95)} strokeLinecap="round"/>);}
 return <g>{out}</g>;
}
function Hud({tOut}:any){
 const hp=(who:string,delay:number,dur:number)=>{let v=100;for(const h of E.HITS)if(h.target===who)v-=h.dmg*smooth((tOut-h.outT-delay)/dur);return Math.max(0,v);};
 const bar=(who:string,x:number,align:string)=>{
  const w=420,main=hp(who,0,.18),trail=hp(who,.35,.45),c=COL[who];
  const fx=align==='left'?x:x+w-w*main/100,tx=align==='left'?x:x+w-w*trail/100;
  return <g>
   <rect x={x} y="104" width={w} height="34" rx="17" fill="#0b0c0e" opacity=".7"/>
   <rect x={tx} y="104" width={w*trail/100} height="34" rx="17" fill="#fff" opacity=".85"/>
   <rect x={fx} y="104" width={w*main/100} height="34" rx="17" fill={c.main} filter={`url(#glow-${who})`}/>
   <rect x={x} y="104" width={w} height="34" rx="17" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2"/>
   <text x={align==='left'?x+8:x+w-8} y="92" textAnchor={align==='left'?'start':'end'} fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="42" fill="#fff" style={{letterSpacing:2}}>{who.toUpperCase()}</text>
  </g>;
 };
 return <g>{bar('red',60,'left')}{bar('blue',600,'right')}
  <text x={W/2} y="132" textAnchor="middle" fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="34" fill="#fff" opacity=".85">VS</text></g>;
}
function Scene({frame,noFlash}:any){
 const tOut=frame/FPS,cam=camera(tOut),sim=cam.sim,z=cam.z;
 const tx=W/2-cam.cx*z+cam.sx,ty=H*.55-cam.cy*z+cam.sy;
 const slow0=F.outAt(F.SLOW.t0),slow1=F.outAt(F.SLOW.t1),tint=.3*smooth((tOut-slow0)/.25)*(1-smooth((tOut-slow1+.3)/.3));
 let flash=0;for(const h of E.HITS){const tau=tOut-h.outT;if(tau>=0&&tau<.3)flash=Math.max(flash,h.power*.17*(tau<2/FPS?1.6:Math.exp(-(tau-2/FPS)/.05)));}
 flash=noFlash?0:Math.min(.5,flash);
 const winT=tOut-12.8,winScale=winT<0?0:Math.min(1,winT/.1)*(1+.22*Math.exp(-winT*9)*Math.cos(winT*24));
 // v2: the intro cuts straight into the fight, so no fade-in; the fade-out still closes the loop.
 const fadeIn=0,fadeOut=frame>=FPS*15-4?(frame-(FPS*15-4))/4:0;
 return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
  <defs>
   <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3b3d42"/><stop offset="1" stopColor="#686a70"/></linearGradient>
   <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2c2d30"/><stop offset="1" stopColor="#141517"/></linearGradient>
   <radialGradient id="floor-red"><stop offset="0" stopColor="#ff3030" stopOpacity=".75"/><stop offset="1" stopColor="#ff3030" stopOpacity="0"/></radialGradient>
   <radialGradient id="floor-blue"><stop offset="0" stopColor="#2f9bff" stopOpacity=".8"/><stop offset="1" stopColor="#2f9bff" stopOpacity="0"/></radialGradient>
   <radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".55" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity=".55"/></radialGradient>
   <filter id="glow-red" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 .2  0 .35 0 0 0  0 0 .25 0 0  0 0 0 1.4 0" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9" result="b"/><feColorMatrix in="b" type="matrix" values=".25 0 0 0 0  0 1 0 0 .15  0 0 1 0 .2  0 0 0 1.4 0" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <g transform={`translate(${tx},${ty}) scale(${z})`}>
   <rect x="-4000" y="-3000" width="9000" height="3610" fill="url(#bg)"/>
   <rect x="-4000" y="610" width="9000" height="3000" fill="url(#floor)"/>
   <line x1="-4000" y1="610" x2="5000" y2="610" stroke="#9a9ca2" strokeOpacity=".55" strokeWidth="2"/>
   <FloorGlow id="blue" sim={sim}/><FloorGlow id="red" sim={sim}/>
   <Trails id="blue" sim={sim}/><Trails id="red" sim={sim}/>
   <Fighter id="blue" sim={sim}/><Fighter id="red" sim={sim}/>
   <Dust x={L.hipMid(F.pose('red',F.LAUNCH.t+2*F.LAUNCH.vy/F.LAUNCH.g))[0]} t0={F.outAt(F.LAUNCH.t+2*F.LAUNCH.vy/F.LAUNCH.g)} tOut={tOut} n={14} spread={90} seed={3}/>
   <Dust x={L.hipMid(F.pose('red',5.1))[0]} t0={F.outAt(5.1)} tOut={tOut} n={8} spread={60} seed={5}/>
   <Dust x={L.hipMid(F.pose('red',4.62))[0]} t0={F.outAt(4.62)} tOut={tOut} n={6} spread={40} seed={7}/>
   {E.HITS.map((h:any,i:number)=><Impact key={i} h={h} tOut={tOut}/>)}
  </g>
  <rect width={W} height={H} fill="#0b2f7a" opacity={tint}/>
  <rect width={W} height={H} fill="url(#vig)"/>
  <SpeedLines tOut={tOut}/>
  <Hud tOut={tOut}/>
  {winScale>0&&<g transform={`translate(${W/2},${H*.215}) scale(${winScale})`}>
   <text textAnchor="middle" y="0" fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="150" fill="#35e0ff" opacity=".55" filter="url(#glow-blue)" style={{letterSpacing:4}}>BLUE WINS</text>
   <text textAnchor="middle" y="0" fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="150" fill="#fff" stroke="#2f9bff" strokeWidth="5" style={{letterSpacing:4}}>BLUE WINS</text>
  </g>}
  <rect width={W} height={H} fill="#fff" opacity={flash}/>
  <rect width={W} height={H} fill="#000" opacity={Math.max(fadeIn,fadeOut)}/>
 </svg>;
}
// ---------- shared helpers for the two recipes ----------
const clamp01=(x:number)=>Math.max(0,Math.min(1,x));
const EASE_OUT=Easing.bezier(.22,1,.36,1);
const ramp=(f:number,start:number,dur:number,ease:(t:number)=>number=(t)=>t)=>ease(clamp01((f-start)/Math.max(1e-6,dur)));
const mixv=(a:number,b:number,t:number)=>a+(b-a)*t;
const INTRO=60,TOTAL=INTRO+900;

// ---------- Intro: versus-slam (demo 30fps: rush 18-28, impact 28; here 60fps: rush 8-28, impact 28, hold to 60) ----------
const RUSH=8,SLAM=28;
const SEAM_TOP_X=744,SEAM_BOT_X=336; // 78 degree seam across 1920 px height, centred on x=540
const SEAM_DEG=Math.atan2(SEAM_TOP_X-SEAM_BOT_X,H)*180/Math.PI;
const rushX=(f:number)=>-1100*(1-Math.pow(ramp(f,RUSH,SLAM-RUSH),3)); // ease-in cubic: faster and faster = a slam
function PosterFighter({id,sim,cx,cy,s}:any){
 const b=G.build(id,sim),hm=b.hipMid;
 return <g transform={`translate(${cx},${cy}) scale(${s}) translate(${-hm[0]},${-hm[1]})`}><Fighter id={id} sim={sim}/></g>;
}
function Half({side,f}:any){
 const left=side==='L',x=left?rushX(f):-rushX(f),v=Math.abs(rushX(f+.5)-rushX(f-.5)),blur=Math.min(36,v*.1);
 const clip=left?`0,0 ${SEAM_TOP_X},0 ${SEAM_BOT_X},${H} 0,${H}`:`${SEAM_TOP_X},0 ${W},0 ${W},${H} ${SEAM_BOT_X},${H}`;
 const id=left?'red':'blue',c=COL[id];
 const settle=f<SLAM+4?0:spring({frame:f-SLAM-4,fps:FPS,config:{damping:14,stiffness:220}}),k=f<SLAM?1:mixv(1.05,1,settle);
 return <g transform={`translate(${x},0)`} filter={blur>.5?`url(#vs-blur-${side})`:undefined}>
  <clipPath id={`vs-clip-${side}`}><polygon points={clip}/></clipPath>
  <g clipPath={`url(#vs-clip-${side})`}>
   <rect width={W} height={H} fill={`url(#vs-bg-${side})`}/>
   <PosterFighter id={id} sim={left?.62:.4} cx={left?250:830} cy={left?1080:1000} s={2.3*k}/>
   <text x={left?60:W-60} y={left?330:1700} textAnchor={left?'start':'end'} fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize={190*k} fill="#fff" stroke={c.glow} strokeWidth="4" filter={`url(#glow-${id})`}>{id.toUpperCase()}</text>
  </g>
 </g>;
}
function Intro({f}:any){
 const since=f-SLAM,env=since>=0?16*Math.exp(-since/3.4):0,sx=env*Math.sin(since*1.65),sy=env*.55*Math.sin(since*2.1+.8);
 const flash=since>=0?.85*(1-ramp(f,SLAM,6)):0,stamp=since>=0?spring({frame:since,fps:FPS,config:{damping:12,stiffness:260}}):0;
 const wave=ramp(f,SLAM,32,EASE_OUT),lines=ramp(f,SLAM,14,EASE_OUT),grow=.35+.65*ramp(f,0,RUSH+4,EASE_OUT),push=1+.015*ramp(f,SLAM+20,INTRO-SLAM-20);
 // Establishing title (the demo's question line): visible from frame 0 as the hook, swallowed by the halves.
 const title=ramp(f,0,10,EASE_OUT);
 const blurL=Math.min(36,Math.abs(rushX(f+.5)-rushX(f-.5))*.1);
 return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
  <defs>
   <linearGradient id="vs-bg-L" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a0d0d"/><stop offset=".6" stopColor="#2a0606"/><stop offset="1" stopColor="#120303"/></linearGradient>
   <linearGradient id="vs-bg-R" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#0d2a6e"/><stop offset=".6" stopColor="#081a45"/><stop offset="1" stopColor="#030a1f"/></linearGradient>
   <filter id="vs-blur-L" x="-10%" y="0" width="120%" height="100%"><feGaussianBlur stdDeviation={`${blurL} 0`}/></filter>
   <filter id="vs-blur-R" x="-10%" y="0" width="120%" height="100%"><feGaussianBlur stdDeviation={`${blurL} 0`}/></filter>
   <filter id="glow-red" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9" result="b"/><feColorMatrix in="b" type="matrix" values="1 0 0 0 .2  0 .35 0 0 0  0 0 .25 0 0  0 0 0 1.4 0" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9" result="b"/><feColorMatrix in="b" type="matrix" values=".25 0 0 0 0  0 1 0 0 .15  0 0 1 0 .2  0 0 0 1.4 0" result="c"/><feMerge><feMergeNode in="c"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <rect width={W} height={H} fill="#0b0c0e"/>
  <g transform={`translate(${sx},${sy}) translate(${W/2},${H/2}) scale(${push}) translate(${-W/2},${-H/2})`}>
   {since<0&&<line x1={W/2} y1={H/2-1100*grow} x2={W/2} y2={H/2+1100*grow} stroke="#e8e8ea" strokeWidth={mixv(2,6,ramp(f,RUSH,SLAM-RUSH))} transform={`rotate(${SEAM_DEG} ${W/2} ${H/2})`}/>}
   {since<0&&<g opacity={.4+.6*title} transform={`translate(${W/2},${H/2-40+30*(1-title)})`}>
    <rect x="-470" y="-150" width="940" height="270" fill="#0b0c0e"/>
    <text textAnchor="middle" y="-30" fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="96" fill="#fff" style={{letterSpacing:6}}>THE FINAL</text>
    <text textAnchor="middle" y="90" fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="132" fill="#fff" stroke="#35e0ff" strokeWidth="3" filter="url(#glow-blue)" style={{letterSpacing:6}}>COUNTER</text>
   </g>}
   <Half side="L" f={f}/><Half side="R" f={f}/>
   {since>=0&&<g>
    <line x1={W/2} y1={-200} x2={W/2} y2={H+200} stroke="#f4f2ee" strokeWidth="8" transform={`rotate(${SEAM_DEG} ${W/2} ${H/2})`}/>
    {wave<1&&<circle cx={W/2} cy={H/2} r={mixv(130,700,wave)} fill="none" stroke="#f4f2ee" strokeOpacity={.85*(1-wave)} strokeWidth={mixv(14,1,wave)}/>}
    {lines<1&&Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2+.26,r0=mixv(190,460,lines),r1=mixv(290,800,lines);
     return <line key={i} x1={W/2+Math.cos(a)*r0} y1={H/2+Math.sin(a)*r0} x2={W/2+Math.cos(a)*r1} y2={H/2+Math.sin(a)*r1} stroke="#f4f2ee" strokeWidth={mixv(8,2,lines)} strokeLinecap="round" opacity={1-lines}/>;})}
    <g transform={`translate(${W/2},${H/2}) rotate(${SEAM_DEG-8*(1-stamp)}) scale(${mixv(1.9,1,stamp)})`} opacity={Math.min(1,stamp*4)}>
     <circle r="150" fill="#f4f2ee" stroke="#0b0c0e" strokeWidth="9"/>
     <circle r="138" fill="none" stroke="#0b0c0e" strokeOpacity=".35" strokeWidth="2"/>
     <text x="-8" y="48" textAnchor="middle" fontFamily="Liberation Sans, Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="140" fill="#0b0c0e" style={{letterSpacing:-6}}>VS</text>
    </g>
   </g>}
  </g>
  <rect width={W} height={H} fill="#f4f2ee" opacity={flash}/>
 </svg>;
}

// ---------- Anime impact on the final hit (demo: 3f at 30fps -> 6 frames here; line shapes change every 2 frames) ----------
const FINAL=E.HITS.find((h:any)=>h.kind==='final');
const IMPACT_F=Math.round(FINAL.outT*FPS),IMPACT_LEN=6;
const rnd=(i:number)=>{const s=Math.sin(i*127.3)*43758.5453;return s-Math.floor(s);};
function ImpactLines({phase,cx,cy}:any){
 const R_OUT=2400;
 const wedge=(i:number,n:number,k:number,r0Min:number,r0Var:number,wMin:number,wVar:number)=>{
  const ang=(i+.5)/n*Math.PI*2+(rnd(k)-.5)*.24,r0=r0Min+rnd(k+1)*r0Var,half=(wMin+rnd(k+2)*wVar)/1300;
  return `${cx+Math.cos(ang)*r0},${cy+Math.sin(ang)*r0} ${cx+Math.cos(ang-half)*R_OUT},${cy+Math.sin(ang-half)*R_OUT} ${cx+Math.cos(ang+half)*R_OUT},${cy+Math.sin(ang+half)*R_OUT}`;
 };
 const thick=Array.from({length:34},(_,i)=>wedge(i,34,i*13+phase*101,330,230,9,22));
 const thin=Array.from({length:22},(_,i)=>wedge(i+.37,22,i*29+phase*57+7,420,260,2,4));
 return <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{position:'absolute',inset:0}}>
  <defs>
   <radialGradient id="ai-fade" cx={cx} cy={cy} r="700" gradientUnits="userSpaceOnUse"><stop offset=".38" stopColor="#fff" stopOpacity="0"/><stop offset=".6" stopColor="#fff" stopOpacity="1"/></radialGradient>
   <mask id="ai-mask"><rect width={W} height={H} fill="url(#ai-fade)"/></mask>
  </defs>
  <g mask="url(#ai-mask)">
   {/* Demo colours flipped: its negative turns a light UI dark, ours turns the dark arena white, so most lines are ink. */}
   {thick.map((p,i)=><polygon key={'a'+i} points={p} fill={i%5===0?'#f4f2ee':'#0d0e12'}/>)}
   {thin.map((p,i)=><polygon key={'b'+i} points={p} fill="#0d0e12" opacity=".85"/>)}
  </g>
 </svg>;
}
const NEG='invert(1) grayscale(1) contrast(1.45)';
function Fight({frame}:any){
 const k=frame-IMPACT_F,impact=k>=0&&k<IMPACT_LEN;
 if(!impact)return <Scene frame={frame}/>;
 const phase=Math.floor(k/2),cam=camera(frame/FPS);
 const hx=W/2+(FINAL.pos[0]-cam.cx)*cam.z+cam.sx,hy=H*.55+(FINAL.pos[1]-cam.cy)*cam.z+cam.sy;
 return <div style={{position:'absolute',inset:0,background:'#0d0e12',overflow:'hidden'}}>
  <div style={{position:'absolute',inset:0,filter:NEG}}><Scene frame={frame} noFlash/></div>
  {[{dx:-8,dy:phase%2===0?4:-4,tint:'#ff2a4a'},{dx:8,dy:phase%2===0?-4:4,tint:'#16e0ff'}].map((c,i)=>
   <div key={i} style={{position:'absolute',inset:0,mixBlendMode:'screen',transform:`translate(${c.dx}px,${c.dy}px)`,isolation:'isolate'}}>
    <div style={{position:'absolute',inset:0,filter:NEG}}><Scene frame={frame} noFlash/></div>
    <div style={{position:'absolute',inset:0,background:c.tint,mixBlendMode:'multiply'}}/>
   </div>)}
  <ImpactLines phase={phase} cx={hx} cy={hy}/>
 </div>;
}
export const FinalCounter=()=>{const frame=useCurrentFrame();return frame<INTRO?<Intro f={frame}/>:<Fight frame={frame-INTRO}/>;};
registerRoot(()=> <Composition id="FinalCounterV2" component={FinalCounter} width={W} height={H} fps={FPS} durationInFrames={TOTAL}/>);
