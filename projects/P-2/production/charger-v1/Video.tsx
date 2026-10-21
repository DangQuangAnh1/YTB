import React from 'react';
import {Composition,registerRoot,useCurrentFrame} from 'remotion';
const cast=require('../characters-v3/cast.cjs');
const ink='#203C47',red='#CA4149';
const s=(v:number)=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v)};
const lerp=(a:number,b:number,k:number)=>a+(b-a)*k;
type Pt=[number,number];
const mv=(a:Pt,b:Pt,k:number):Pt=>[lerp(a[0],b[0],k),lerp(a[1],b[1],k)];
function arm(a:Pt,b:Pt,flip:number){
 const dx=b[0]-a[0],dy=b[1]-a[1],dist=Math.max(1,Math.hypot(dx,dy)),h=Math.sqrt(Math.max(0,78*78-dist*dist/4));
 const e:Pt=[(a[0]+b[0])/2-dy/dist*h*flip,(a[1]+b[1])/2+dx/dist*h*flip];
 return <path d={`M${a} Q${e} ${b}`} fill="none" stroke={ink} strokeWidth="7.5" strokeLinecap="round"/>;
}
function Actor({id,x,y,lean,left,right,expr,step=0,tilt=0}:any){
 const headx=x+lean,hy=y;
 return <g>
 <ellipse cx={x} cy={y+290} rx="51" ry="8" fill="#A79981" opacity=".15"/>
 {id==='scarf'&&<g transform={`translate(${headx} ${hy}) rotate(${tilt})`} dangerouslySetInnerHTML={{__html:cast.hairBack()}}/>}
 <path d={`M${headx},${y+43} Q${x+lean*.5},${y+108} ${x},${y+155} M${x},${y+155} L${x-28-step},${y+220} L${x-36-step},${y+282} M${x},${y+155} L${x+28+step},${y+220} L${x+38+step},${y+282}`} fill="none" stroke={ink} strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round"/>
 <path d={`M${x-50-step},${y+284}h29m${48+step*2},0h29`} stroke={ink} strokeWidth="10" strokeLinecap="round"/>
 {arm([headx-7,y+70],left,-1)}{arm([headx+7,y+70],right,1)}
 <g transform={`translate(${headx} ${hy}) rotate(${tilt})`} dangerouslySetInnerHTML={{__html:cast.head(id,expr,false,false)}}/>
 {id==='scarf'&&<g transform={`translate(${headx} ${hy})`} dangerouslySetInnerHTML={{__html:cast.scarf()}}/>}
 <circle cx={left[0]} cy={left[1]} r="5" fill={ink}/><circle cx={right[0]} cy={right[1]} r="5" fill={ink}/>
 </g>;
}
function Phone({p,shake=0}:any){return <g transform={`translate(${p[0]} ${p[1]}) rotate(${shake})`}>
 <rect x="-22" y="-34" width="44" height="68" rx="7" fill={ink}/><rect x="-17" y="-26" width="34" height="50" rx="3" fill="#FFFDF7"/>
 <rect x="-13" y="-12" width="24" height="13" rx="2" fill="none" stroke={red} strokeWidth="2"/><rect x="12" y="-9" width="3" height="7" rx="1" fill={red}/><rect x="-11" y="-10" width="3" height="9" fill={red}/>
 <text y="17" textAnchor="middle" fontFamily="Arial" fontSize="13" fontWeight="700" fill={red}>1%</text><circle cy="29" r="2" fill="#9CB2B0"/>
 </g>}
const Video=()=>{
 const f=useCurrentFrame(),t=f/30,reach=s((t-2.5)/.8),win=s((t-8.4)/.65),pull=t>=5&&t<8.4?Math.sin((t-5)*7)*22:0;
 let tip:Pt=[270+pull,476],aX=165,bX=380,aLean=0,bLean=0,aTilt=0,bTilt=0,aExpr='neutral',bExpr='neutral';
 let pA:Pt=[96,505],pB:Pt=[445,505];
 if(t<2.5){pA=[100,lerp(538,488,s((t-.25)/.7))];pB=[445,lerp(538,488,s((t-.7)/.7))];aTilt=-7;bTilt=8;}
 if(t>=3.3&&t<5){aExpr='deadpan';bExpr='deadpan';aTilt=8;bTilt=-8;}
 if(t>=5&&t<8.4){aLean=-13+pull*.35;bLean=13+pull*.35;aX-=7;bX+=7;aExpr='deadpan';bExpr='deadpan';aTilt=-6;bTilt=6;}
 tip=mv(tip,[340,539],win);pB=mv(pB,[340,505],win);
 if(t>=8.6&&t<10.7){aExpr='surprised';bExpr='happy';bTilt=-5;}
 if(t>=9.5){
   const ins=s((t-9.5)/.45),un=t>11?s((t-11)/.2)*(1-s((t-11.4)/.25)):0;
   tip=[340,lerp(558,539,ins)+un*19];
 }
 if(t>=10.7){bExpr=t<12?'surprised':'deadpan';aExpr='deadpan';}
 const looking=s((t-12.6)/.7);aTilt=lerp(aTilt,18,looking);bTilt=lerp(bTilt,-16,looking);
 let aLeft:Pt=[pA[0],pA[1]+18],aRight:Pt=mv([215,525],[tip[0]-6,tip[1]],reach);
 let bLeft:Pt=mv([330,525],[tip[0]+6,tip[1]],reach),bRight:Pt=[pB[0]+13,pB[1]+11];
 if(t>=8.4){aRight=mv(aRight,[230,548],win);bLeft=[tip[0]+4,tip[1]+5];}
 if(t>16.7){aRight=mv(aRight,[275,637],s((t-16.7)/.5));aTilt=8;bTilt=-7;}
 const zoom=s((t-13)/2),vx=lerp(50,0,zoom),vw=lerp(440,540,zoom),vh=vw*960/540;
 return <svg width="1080" height="1920" viewBox={`${vx} 0 ${vw} ${vh}`} xmlns="http://www.w3.org/2000/svg">
 <rect x="-100" y="-100" width="740" height="1200" fill="#F5F1E8"/>
 <rect x="-100" y="250" width="740" height="440" fill="#E4E8DC"/>
 <path d="M-100,690H640V1100H-100Z" fill="#DFD3BC"/><path d="M-100,690H640M0,820H540M0,950H540M80,690L-60,1050M280,690L280,1050M470,690L650,1050" fill="none" stroke="#C4B699" strokeWidth="2"/>
 <rect x="70" y="85" width="400" height="108" rx="20" fill="#FFFDF7" stroke="#D9DFD2" strokeWidth="2"/>
 <text x="270" y="125" textAnchor="middle" fontFamily="Arial" fontSize="23" fontWeight="700" fill={ink}>MỘT ĐẦU SẠC.</text>
 <text x="270" y="162" textAnchor="middle" fontFamily="Arial" fontSize="23" fontWeight="700" fill={ink}>HAI MÁY CÒN 1%.</text>
 <rect x="15" y="270" width="110" height="93" rx="5" fill="#AFC5BB"/><path d="M25,280h90v73H25Z" fill="#D6E6D8"/><path d="M70,280v73M25,315h90" stroke="#A2B8AA" strokeWidth="4"/>
 <rect x="423" y="300" width="110" height="8" rx="3" fill="#B89572"/><path d="M445,300v-28m0,8l-10,-8m10,0l9,-12" stroke="#728F78" strokeWidth="5"/><rect x="433" y="287" width="23" height="14" rx="3" fill="#B97961"/>
 {/* The cable and adapter stay in the same world positions throughout reveal. */}
 <path d={`M${tip[0]},${tip[1]+14} C${tip[0]-25},640 300,710 330,795 Q335,817 355,836`} fill="none" stroke="#667F82" strokeWidth="6" strokeLinecap="round"/>
 <g><rect x="445" y="815" width="78" height="43" rx="9" fill="#FFFDF7" stroke={ink} strokeWidth="3"/><circle cx="466" cy="833" r="3" fill={ink}/><circle cx="480" cy="833" r="3" fill={ink}/><circle cx="507" cy="836" r="4" fill={red}/><path d="M523,838h30" stroke="#667F82" strokeWidth="5"/>
 <rect x="353" y="820" width="46" height="32" rx="6" fill="#FFFDF7" stroke={ink} strokeWidth="3"/><path d="M399,829h17m-17,14h17" stroke="#708488" strokeWidth="5" strokeLinecap="round"/>
 </g>
 <Actor id="cap" x={aX} y={370} lean={aLean} left={aLeft} right={aRight} expr={aExpr} tilt={aTilt} step={t>=5&&t<8.4?10:0}/>
 <Actor id="scarf" x={bX} y={370} lean={bLean} left={bLeft} right={bRight} expr={bExpr} tilt={bTilt} step={t>=5&&t<8.4?10:0}/>
 <Phone p={pA}/><Phone p={pB} shake={t>10.7&&t<11?Math.sin(t*60)*3:0}/>
 <g transform={`translate(${tip[0]} ${tip[1]})`}><rect x="-7" y="-3" width="14" height="20" rx="4" fill="#E6AF77" stroke={ink} strokeWidth="2"/><rect x="-5" y="-11" width="10" height="9" rx="2" fill="#C4D3D0" stroke={ink} strokeWidth="1.5"/></g>
 {t>10.6&&t<12.4&&<g fill={red} fontFamily="Arial" fontWeight="700"><text x="383" y="482" fontSize="29">?</text></g>}
 {t>15.3&&<text x="270" y="761" textAnchor="middle" fontFamily="Arial" fontSize="32" fontWeight="700" fill={ink}>À…</text>}
 </svg>;
};
registerRoot(()=> <Composition id="Charger" component={Video} width={1080} height={1920} fps={30} durationInFrames={570}/>);
