import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const cast=require('../characters-v3/cast.cjs'),rig=require('./rig.cjs'),cone=require('./cone-track.json');
const ink='#203C47';
function Figure({id,p}:any){let j=rig.joints(p),head=j.head;
 const limb=(v:any,opacity=1)=><path d={`M${v.a}L${v.j}L${v.end}`} opacity={opacity}/>;
 return <g>
 <ellipse cx={p.hip[0]} cy="748" rx={p.hip[1]<550?30:42} ry="7" fill="#405347" opacity={p.hip[1]<550?.12:.18}/>
 {id==='scarf'&&<g transform={`translate(${head}) rotate(${p.lean*.25}) scale(.7)`} dangerouslySetInnerHTML={{__html:cast.hairBack()}}/>}
 <g fill="none" stroke={ink} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
 {limb(j.ll,.8)}{limb(j.al,.8)}<path d={`M${j.shoulder}L${j.hip}`}/>{limb(j.lr)}{limb(j.ar)}
 <path d={`M${j.ll.end[0]-12},${j.ll.end[1]}h24M${j.lr.end[0]-12},${j.lr.end[1]}h24`} strokeWidth="10"/>
 </g>
 <circle cx={j.al.end[0]} cy={j.al.end[1]} r="6" fill={ink}/><circle cx={j.ar.end[0]} cy={j.ar.end[1]} r="6" fill={ink}/>
 <g transform={`translate(${head}) rotate(${p.head+p.lean*.25}) scale(.7)`} dangerouslySetInnerHTML={{__html:cast.head(id,p.expr>1.5?'happy':p.expr>.5?'surprised':'deadpan',false,false)}}/>
 {id==='scarf'&&<g transform={`translate(${head}) rotate(${p.lean*.25}) scale(.7)`} dangerouslySetInnerHTML={{__html:cast.scarf()}}/>}
 </g>;
}
const Video=()=>{const f=useCurrentFrame(),t=f/30,A=rig.sample(rig.A,t),B=rig.sample(rig.B,t),c=cone.frames[f];let impact=Math.abs(t-3.2)<.09||Math.abs(t-19.5)<.1;let shake=impact?Math.sin(f*2)*1.8:0;
 return <svg width="1080" height="1920" viewBox="0 0 540 960" xmlns="http://www.w3.org/2000/svg">
 <rect width="540" height="960" fill="#F5F1E8"/>
 <g transform={`translate(${shake} 0)`}>
 <path d="M0,355H540V748H0Z" fill="#E2E9DB"/><path d="M0,748H540V960H0Z" fill="#DCD2BD"/>
 <path d="M0,748H540M0,850H540M270,748L250,960M120,748L40,960M420,748L520,960" stroke="#C1B49C" strokeWidth="2"/>
 <rect x="30" y="70" width="480" height="140" rx="24" fill="#FFFDF7" stroke="#DDD9CA" strokeWidth="2"/>
 <text x="270" y="123" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="32" fontWeight="800" fill={ink}>SÀN MỚI LAU</text>
 <text x="270" y="164" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="21" fill="#657D72">Ai qua vạch trước?</text>
 <path d="M220,741Q300,728 447,740L462,761Q335,774 214,757Z" fill="#ACD8DC" opacity=".85" stroke="#7FBAC1" strokeWidth="2"/>
 <path d="M246,749h43m42,-4h57m-80,13h35" stroke="#E9FFFF" strokeWidth="3" strokeLinecap="round"/>
 <rect x="125" y="739" width="79" height="17" rx="4" fill="#BE7660" stroke="#845947" strokeWidth="2"/>
 <path d="M134,746h60m-60,5h60" stroke="#E1B49A" strokeWidth="2"/>
 <path d="M471,734V761" stroke="#FFFDF7" strokeWidth="11"/><path d="M471,734v27" stroke={ink} strokeWidth="3" strokeDasharray="4 4"/>
 <path d="M492,377V733" stroke="#7D8B79" strokeWidth="3"/><path d="M492,380h42v45h-42Z" fill="#FFFDF7"/><path d="M492,380h14v15h-14Zm28,0h14v15h-14Zm-14,15h14v15h-14Zm-14,15h14v15h-14Zm28,0h14v15h-14Z" fill={ink}/>
 <text x="492" y="351" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="15" fill={ink} fontWeight="700">ĐÍCH</text>
 <g transform={`translate(${c.x} ${c.y}) rotate(${c.angle*180/Math.PI})`}><path d="M-16,21L-8,-21H8L16,21Z" fill="#E8A167" stroke="#A8754B" strokeWidth="2"/><path d="M-12,4h24M-14,13h28" stroke="#FFF2D2" strokeWidth="5"/><path d="M-23,21h46" stroke="#A8754B" strokeWidth="5"/></g>
 <Figure id="scarf" p={B}/><Figure id="cap" p={A}/>
 {t>3.12&&t<3.36&&<g stroke="#D69161" strokeWidth="3"><path d="M310,496l-12,-10m31,10l9,-12m-5,34l12,3"/></g>}
 {t>5&&t<5.35&&<path d="M270,572Q300,553 327,571" stroke="#9EAF9B" strokeWidth="3" fill="none"/>}
 {t>11.45&&t<11.8&&<path d="M312,566Q284,548 249,566" stroke="#9EAF9B" strokeWidth="3" fill="none"/>}
 {t>17.3&&t<18.8&&<g stroke="#A3AD98" strokeWidth="3" opacity=".65"><path d={`M${A.hip[0]-100},${A.hip[1]-45}h-45m30,25h-35m50,25h-45`}/></g>}
 {t>=20.2&&t<21.5&&<g fill="#E4A063"><circle cx="435" cy="398" r="4"/><circle cx="465" cy="369" r="4"/><circle cx="492" cy="402" r="4"/></g>}
 {t>22.3&&t<22.7&&<g stroke="#E4A063" strokeWidth="3"><path d="M405,563v-10m-14,17l-9,-6m34,6l9,-6"/></g>}
 </g>
 <text x="270" y="902" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="19" fill="#637D71">{t<2.4?'Một vạch đích. Một sàn trơn.':t>20.3?'Thắng bằng chỗ đứng vững.':''}</text>
 </svg>
};
registerRoot(()=> <Composition id="Action" component={Video} width={1080} height={1920} fps={30} durationInFrames={720}/>);
