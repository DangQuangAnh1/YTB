import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const cast=require('../characters-v3/cast.cjs');
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const mix=(a:number,b:number,p:number)=>a+(b-a)*clamp(p);
const smooth=(p:number)=>{p=clamp(p);return p*p*(3-2*p)};
const ink='#203C47';
function Actor({id,x,y,angle,armL,armR,step=0,expression='neutral'}:any){
 const arm=(side:number,a:number)=> <g transform={`translate(${side*7} 70) rotate(${a})`}><path d={`M0,0 L${side*42},43 L${side*43},88`}/><circle cx={side*43} cy={88} r="3" fill={ink}/></g>;
 return <g transform={`translate(${x} ${y}) rotate(${angle} 0 155)`}>
 {id==='scarf'&&<g dangerouslySetInnerHTML={{__html:cast.hairBack()}}/>}
 <g fill="none" stroke={ink} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round"><path d="M0,43V155"/>
 <path d={`M0,155L${-29+step*.4},219L${-38+step},278M0,155L${29-step*.4},219L${39-step},278`}/>
 <path strokeWidth="10" d={`M${-53+step},281h30M${25-step},281h30`}/>{arm(-1,armL)}{arm(1,armR)}</g>
 <g dangerouslySetInnerHTML={{__html:cast.head(id,expression,false,false)}}/>
 {id==='scarf'&&<g dangerouslySetInnerHTML={{__html:cast.scarf()}}/>}
 </g>
}
const Video=()=>{
 const t=useCurrentFrame()/30,beat=Math.sin(t*8),fall=smooth((t-8.8)/1.2),walk=Math.sin(t*12);
 let bx=165,by=405,ba=-3,bl=-8,br=-35,ax=365,ay=405,aa=3,al=55,ar=-25,ast=0,bst=0;
 if(t<4.5){bl=-20+beat*22;br=-50+Math.sin(t*7)*42;al=65+Math.sin(t*9)*35;ar=-30+beat*35;aa=3+beat*3;ba=-3+Math.cos(t*7)*3;}
 else if(t<5.8){bx=mix(165,-90,smooth((t-4.5)/1.1));bst=walk*15;al=70+beat*25;ar=-30+beat*25;}
 else if(t<6.6){bx=mix(-90,238,smooth((t-5.8)/.8));bst=walk*18;br=-90;al=90;ar=-85;aa=-8;}
 else if(t<8.8){bx=238+Math.sin(t*6)*7;ba=8*Math.sin(t*7);br=-90+beat*25;ax=365+Math.sin(t*9)*15;aa=20+Math.sin(t*8)*18;al=125;ar=-135;ast=Math.sin(t*10)*15;}
 else {bx=mix(238,355,smooth((t-9.9)/1.2));by=405;ba=mix(0,-9,smooth((t-11.2)/.6));bl=-10;br=-15;bst=t<11.2?walk*14:0;ax=mix(365,300,fall);ay=mix(405,600,fall);aa=mix(25,-90,fall);al=mix(125,20,fall)+(t>10.2?Math.sin(t*4)*8:0);ar=mix(-135,-120,fall)+(t>10.2?Math.sin(t*5)*12:0);ast=mix(10,-8,fall);}
 return <svg width="1080" height="1920" viewBox="0 0 540 960" xmlns="http://www.w3.org/2000/svg">
 <rect width="540" height="960" fill="#F5F1E8"/>
 <path d="M0,270H540V710H0Z" fill="#E5E9DC"/>
 <path d="M0,710H540V960H0Z" fill="#DED3BE"/>
 <path d="M0,710H540M0,825H540M270,710L190,960M100,710L0,930M440,710L540,930" stroke="#C6BAA4" strokeWidth="2"/>
 <rect x="245" y="245" width="265" height="158" rx="5" fill="#8C7560"/>
 <rect x="254" y="254" width="247" height="136" fill="#66857A"/>
 <path d="M278,280h105m-105,23h185m-185,23h143" stroke="#DDE6DA" strokeWidth="3" opacity=".42"/>
 <rect x="20" y="270" width="105" height="249" rx="3" fill="#B2C6BC" stroke="#8FA69C" strokeWidth="6"/>
 <rect x="37" y="291" width="70" height="105" fill="#DBE9D9"/><path d="M72,291v105M37,344h70" stroke="#9DB4A7" strokeWidth="4"/>
 <circle cx="107" cy="423" r="4" fill="#8C7560"/>
 <g opacity=".8"><path d="M-20,560H92V580H-20Z" fill="#AD8763"/><path d="M12,580v133m62,-133v133" stroke="#8F7862" strokeWidth="9"/></g>
 <rect x="35" y="86" width="470" height="113" rx="23" fill="#FFFDF7" stroke="#D9DFD2" strokeWidth="2"/>
 <text x="270" y="132" textAnchor="middle" fill={ink} fontFamily="Arial,sans-serif" fontSize="25" fontWeight="700">Khi cãi không lại</text>
 <text x="270" y="168" textAnchor="middle" fill={ink} fontFamily="Arial,sans-serif" fontSize="25" fontWeight="700">đối phương</text>
 <ellipse cx={t<9?ax:280} cy={t<9?699:811} rx={t<9?61:167} ry="11" fill="#AD9E87" opacity=".23"/>
 <ellipse cx={bx} cy="699" rx="60" ry="11" fill="#AD9E87" opacity=".23"/>
 <Actor id="cap" x={ax} y={ay} angle={aa} armL={al} armR={ar} step={ast} expression={t<6?'deadpan':'surprised'}/>
 <Actor id="scarf" x={bx} y={by} angle={ba} armL={bl} armR={br} step={bst} expression="deadpan"/>
 </svg>
};
registerRoot(()=> <Composition id="TikTokStick" component={Video} width={1080} height={1920} fps={30} durationInFrames={454}/>);

