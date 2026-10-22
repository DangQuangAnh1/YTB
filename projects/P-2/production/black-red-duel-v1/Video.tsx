import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const motion=require('./motion.cjs');
const Figure=({id,frame,ghost=false}:any)=>{
 const j=motion.joints(motion.sample(id,frame));
 const color=id==='red'?'#e23836':'#20232a';
 const path=(v:any)=>`M ${v.a[0]},${v.a[1]} L ${v.j[0]},${v.j[1]} L ${v.end[0]},${v.end[1]}`;
 return <g opacity={ghost?.10:1}>
 {!ghost&&<ellipse cx={j.hip[0]} cy="618" rx={Math.max(28,67-(610-j.hip[1])*.1)} ry="8" fill={color} opacity=".10"/>}
 <g fill="none" stroke={color} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round">
 <path d={path(j.lb)} opacity=".66"/><path d={path(j.ab)} opacity=".66"/>
 <path d={`M ${j.hip} L ${j.shoulder} L ${j.neck}`}/>
 <path d={path(j.lf)}/><path d={path(j.af)}/>
 <path d={`M ${j.lb.end[0]-11},${j.lb.end[1]} l 26,-1 M ${j.lf.end[0]-11},${j.lf.end[1]} l 26,-1`} strokeWidth="17"/>
 </g>
 <circle cx={j.head[0]} cy={j.head[1]} r="32" fill={color}/>
 {!ghost&&<><circle cx={j.af.end[0]} cy={j.af.end[1]} r="11" fill={color}/><circle cx={j.ab.end[0]} cy={j.ab.end[1]} r="10" fill={color}/></>}
 </g>;
};
export const Duel=()=>{
 const f=useCurrentFrame();
 const impact=motion.hits.find((h:any)=>f>=h.f&&f<h.f+7);
 const shake=impact?Math.sin((f-impact.f)*2.6)*Math.max(0,5-(f-impact.f)):0;
 const pulse=impact?(1-(f-impact.f)/7):0;
 return <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg">
 <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#f8f7f2"/><stop offset="1" stopColor="#e9e7e0"/></linearGradient><radialGradient id="glow"><stop stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient></defs>
 <rect width="1280" height="720" fill="url(#bg)"/>
 <ellipse cx="640" cy="350" rx="620" ry="360" fill="url(#glow)" opacity=".75"/>
 <g opacity=".25" stroke="#c7c4ba" fill="none"><path d="M0 610H1280M0 670H1280"/><path d="M180 720L400 610M1100 720L880 610"/></g>
 <g transform={`translate(${shake},${shake*.35})`}>
 <path d="M65 610H1215" stroke="#b8b6ac" strokeWidth="3"/>
 <ellipse cx="640" cy="615" rx="470" ry="30" fill="none" stroke="#c6c3b9" strokeWidth="2"/>
 {motion.trails.some((a:number[])=>f>=a[0]&&f<=a[1])&&<><Figure id="red" frame={Math.max(0,f-3)} ghost/><Figure id="black" frame={Math.max(0,f-3)} ghost/></>}
 <Figure id="black" frame={f}/><Figure id="red" frame={f}/>
 {impact&&<g transform={`translate(${impact.x},${impact.y})`} opacity={pulse} stroke="#f1a14d" fill="none" strokeWidth="4" strokeLinecap="round">
 <circle r={12+(1-pulse)*32} strokeWidth="2"/>
 {[0,60,120,180,240,300].map(a=><path key={a} d="M18 0L36 0" transform={`rotate(${a})`}/>)}
 </g>}
 {f>=153&&f<175&&<g stroke="#b4b0a3" strokeWidth="3" opacity={(175-f)/22} fill="none"><path d="M830 606q-18-22-37 0m38 0q20-30 42 0m-47-1h-54"/></g>}
 </g>
 <g fontFamily="Arial,sans-serif" fill="#77776f" fontSize="13" letterSpacing="4"><text x="64" y="59">SPARRING / 01</text><text x="1216" y="59" textAnchor="end">BLACK × RED</text></g>
 <rect x="64" y="78" width="28" height="3" fill="#e23836"/>
 <rect x="96" y="78" width="28" height="3" fill="#20232a"/>
 <path d="M64 662H1216" stroke="#c9c6bd" strokeWidth="1"/>
 <path d={`M64 662H${64+1152*f/449}`} stroke="#e23836" strokeWidth="2" opacity=".6"/>
 </svg>;
};
registerRoot(()=> <Composition id="BlackRedDuel" component={Duel} width={1280} height={720} fps={30} durationInFrames={450}/>);
