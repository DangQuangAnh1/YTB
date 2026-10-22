import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const compose=require('./compose.cjs');
const curves=require('./curves.cjs');
const COLOR:any={red:['#d73539','#de5c5f'],black:['#20252b','#4c4f54']};
const fill=(pts:any,size:number,color:string,key:string)=><path key={key} d={curves.svgPath(curves.outline(pts,size))} fill={color}/>;
const line=(pts:any,color:string,key:string,w=14)=><path key={key} d={'M'+pts.map((p:any)=>p.join(',')).join('L')} stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" fill="none"/>;
function Fighter({id,frame,soft}:any){
 const P=compose.pose(id,frame),[main,light]=COLOR[id];
 if(soft){
  const S=curves.strokes(P);
  return <g>
   <ellipse cx={P.hipMid[0]} cy="612" rx="70" ry="5" fill="#252a30" opacity=".07"/>
   {fill(S.armL,13,light,'armL')}
   {fill(S.frontLeg,14,P.rear==='R'?light:main,'frontLeg')}
   {fill(S.body,15,main,'body')}
   {fill(S.armR,13,main,'armR')}
   <circle cx={P.headC[0]} cy={P.headC[1]} r="23" fill="#faf9f6" stroke={main} strokeWidth="10"/>
  </g>;
 }
 const T=curves.straight(P);
 return <g>
  <ellipse cx={P.hipMid[0]} cy="612" rx="70" ry="5" fill="#252a30" opacity=".07"/>
  {line(T.armL,light,'armL')}{line(T.legL,light,'legL')}{line(T.spine,main,'spine',15)}{line(T.legR,main,'legR')}{line(T.armR,main,'armR')}
  <circle cx={P.headC[0]} cy={P.headC[1]} r="23" fill="#faf9f6" stroke={main} strokeWidth="10"/>
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
