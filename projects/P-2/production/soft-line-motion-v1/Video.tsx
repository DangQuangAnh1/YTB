import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const motion=require('../black-red-duel-v2/motion.cjs');
const curves=require('./curves.cjs');
function Fighter({id,frame,soft}:any){
 const j=motion.joints(motion.sample(id,frame+44));
 const lag=motion.joints(motion.sample(id,Math.max(44,frame+42)));
 const color=id==='red'?'#d73539':'#20252b';
 const stroke=(points:any,key:string,opacity=1)=><path key={key} d={curves.svgPath(curves.outline(points))} fill={color} opacity={opacity}/>;
 const limb=(v:any,key:string,opacity=1)=>soft?stroke(curves.limb(v),key,opacity):<path key={key} d={`M${v.a}L${v.j}L${v.end}`} stroke={color} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}/>;
 // Tiny lag tilts head/neck independently without moving contact anchors.
 const hx=j.head[0]+(lag.head[0]-j.head[0])*.3,hy=j.head[1]+(lag.head[1]-j.head[1])*.15;
 return <g>
 <ellipse cx={j.hip[0]} cy="619" rx="61" ry="5" fill="#252a30" opacity=".07"/>
 {limb(j.lb,'back-leg',.8)}{limb(j.ab,'back-arm',.8)}
 {soft?stroke(curves.spine(j,24+Math.sin(frame/13)*3),'spine'):<path d={`M${j.hip}L${j.shoulder}L${j.neck}`} fill="none" stroke={color} strokeWidth="14" strokeLinecap="round"/>}
 {limb(j.lf,'front-leg')}{limb(j.af,'front-arm')}
 <path d={`M${j.neck}Q${j.neck[0]},${hy+24} ${hx},${hy+20}`} fill="none" stroke={color} strokeWidth="13" strokeLinecap="round"/>
 <circle cx={hx} cy={hy} r="23" fill="#faf9f6" stroke={color} strokeWidth="10"/>
 </g>;
}
export const SoftMotion=({soft=true}:any)=>{
 const frame=useCurrentFrame();
 return <svg width="1280" height="720" viewBox="300 190 740 460" xmlns="http://www.w3.org/2000/svg" style={{background:'#faf9f6'}}>
 <rect x="300" y="170" width="800" height="500" fill="#faf9f6"/>
 <path d="M300 617H1100" stroke="#dddcd6" strokeWidth="1.2"/>
 <Fighter id="black" frame={frame} soft={soft}/><Fighter id="red" frame={frame} soft={soft}/>
 </svg>;
};
registerRoot(()=> <>
 <Composition id="SoftLineMotion" component={SoftMotion} width={1280} height={720} fps={30} durationInFrames={90} defaultProps={{soft:true}}/>
 <Composition id="StraightLineComparison" component={SoftMotion} width={1280} height={720} fps={30} durationInFrames={90} defaultProps={{soft:false}}/>
 </>);
