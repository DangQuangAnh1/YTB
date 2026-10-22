import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
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
function Scene({frame}:any){
 const tOut=frame/FPS,cam=camera(tOut),sim=cam.sim,z=cam.z;
 const tx=W/2-cam.cx*z+cam.sx,ty=H*.55-cam.cy*z+cam.sy;
 const slow0=F.outAt(F.SLOW.t0),slow1=F.outAt(F.SLOW.t1),tint=.3*smooth((tOut-slow0)/.25)*(1-smooth((tOut-slow1+.3)/.3));
 let flash=0;for(const h of E.HITS){const tau=tOut-h.outT;if(tau>=0&&tau<.3)flash=Math.max(flash,h.power*.17*(tau<2/FPS?1.6:Math.exp(-(tau-2/FPS)/.05)));}
 flash=Math.min(.5,flash);
 const winT=tOut-12.8,winScale=winT<0?0:Math.min(1,winT/.1)*(1+.22*Math.exp(-winT*9)*Math.cos(winT*24));
 const fadeIn=frame<4?1-frame/4:0,fadeOut=frame>=FPS*15-4?(frame-(FPS*15-4))/4:0;
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
export const FinalCounter=()=>{const frame=useCurrentFrame();return <Scene frame={frame}/>;};
registerRoot(()=> <Composition id="FinalCounter" component={FinalCounter} width={W} height={H} fps={FPS} durationInFrames={900}/>);
