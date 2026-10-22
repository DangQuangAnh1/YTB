import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const m=require('./motion.cjs');
function Fighter({id,frame}:any){
 const j=m.joints(m.sample(id,frame)),color=id==='red'?'#cd282b':'#191d23';
 const limb=(v:any)=>`M${v.a}L${v.j}L${v.end}`;
 return <g>
 <ellipse cx={j.hip[0]} cy="617" rx="58" ry="7" fill="#222832" opacity=".09"/>
 <g fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round">
 <path d={limb(j.lb)} opacity=".85"/><path d={limb(j.ab)} opacity=".85"/>
 <path d={`M${j.hip}L${j.shoulder}L${j.neck}`}/>
 <path d={limb(j.lf)}/><path d={limb(j.af)}/>
 <path d={`M${j.lb.end}l${j.face*21},0M${j.lf.end}l${j.face*21},0`} strokeWidth="13"/>
 </g>
 <circle cx={j.head[0]} cy={j.head[1]} r="24" fill={color}/>
 <circle cx={j.af.end[0]} cy={j.af.end[1]} r="9" fill={color}/>
 <circle cx={j.ab.end[0]} cy={j.ab.end[1]} r="8" fill={color}/>
 </g>;
}
export const Duel=()=>{
 const f=useCurrentFrame(),hit=m.hits.find((h:any)=>f>=h.f&&f<h.f+4),shake=hit?Math.sin((f-hit.f)*3)*Math.max(0,3-(f-hit.f)):0;
 return <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f4f5f6"/><stop offset="1" stopColor="#e0e4e6"/></linearGradient><linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#d4dadd"/><stop offset="1" stopColor="#e8ecee"/></linearGradient></defs>
 <rect width="1280" height="720" fill="url(#wall)"/>
 <path d="M0 611H1280V720H0Z" fill="url(#floor)"/>
 <path d="M0 611H1280" stroke="#b6bfc3" strokeWidth="2"/>
 <path d="M180 0V610M1100 0V610" stroke="#d5dcdf" strokeWidth="1" opacity=".7"/>
 <path d="M0 690H1280M280 720L430 611M1000 720L850 611" stroke="#c7cfd3" strokeWidth="1"/>
 <g transform={`translate(${shake},0)`}>
 <Fighter id="black" frame={f}/><Fighter id="red" frame={f}/>
 {hit&&<g transform={`translate(${hit.x},${hit.y})`} stroke="#fcfcfc" fill="none" strokeLinecap="round" strokeWidth="3" opacity={1-(f-hit.f)/4}><path d="M-9 -12L6 9M-14 2L15 -4M-1 -17L-4 13"/></g>}
 </g>
 <rect width="1280" height="22" fill="#171d22"/>
 <rect y="698" width="1280" height="22" fill="#171d22"/>
 </svg>;
};
registerRoot(()=> <Composition id="BlackRedDuelV2" component={Duel} width={1280} height={720} fps={30} durationInFrames={450}/>);
