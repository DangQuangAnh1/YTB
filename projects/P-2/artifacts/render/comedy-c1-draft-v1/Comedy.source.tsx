import React from 'react';
import {AbsoluteFill, Audio, Composition, registerRoot, staticFile, useCurrentFrame} from 'remotion';

const C={paper:'#F5F1E8',ink:'#203C47',mint:'#B9D5C5',mintDark:'#638978',orange:'#EF965F',peach:'#F1C3A8',red:'#CC6F59',line:'#DADBD0',white:'#FFFDF7'};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const smooth=(x:number)=>{const t=clamp(x);return t*t*(3-2*t)};
const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
const progress=(f:number,a:number,b:number)=>smooth((f-a)/(b-a));
const pop=(f:number,start:number)=>{const t=Math.max(0,(f-start)/30);return f<start?0:1-Math.exp(-11*t)*Math.cos(17*t)};
type P=[number,number];
function ik(a:P,b:P,l1:number,l2:number,side:number):P{
 const dx=b[0]-a[0],dy=b[1]-a[1];const d=Math.max(.001,Math.min(Math.hypot(dx,dy),l1+l2-.01));
 const ang=Math.atan2(dy,dx)+side*Math.acos(Math.max(-1,Math.min(1,(l1*l1+d*d-l2*l2)/(2*l1*d))));
 return [a[0]+Math.cos(ang)*l1,a[1]+Math.sin(ang)*l1];
}
const path=(ps:P[])=>ps.map((p,i)=>`${i?'L':'M'}${p[0]},${p[1]}`).join(' ');
const Txt:React.FC<{x:number;y:number;size?:number;fill?:string;weight?:number;anchor?:'start'|'middle'|'end';children:React.ReactNode;opacity?:number}> = ({x,y,size=18,fill=C.ink,weight=700,anchor='middle',children,opacity=1})=><text x={x} y={y} fontFamily="Arial, sans-serif" fontSize={size} fontWeight={weight} textAnchor={anchor} fill={fill} opacity={opacity}>{children}</text>;

const Phone:React.FC<{x:number;y:number;s?:number;angle?:number;screen?:string}> =({x,y,s=1,angle=0,screen='0'})=><g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
 <rect x={-23} y={-44} width={46} height={88} rx={10} fill={C.ink}/><rect x={-18} y={-34} width={36} height={65} rx={5} fill={C.mint}/><rect x={-7} y={-39} width={14} height={3} rx={2} fill={C.mintDark}/>
 <circle cy={-12} r={11} fill={C.white}/><Txt x={0} y={-7} size={14}>{screen}</Txt><rect x={-13} y={9} width={26} height={12} rx={4} fill={C.orange}/><path d="M-5,15H5" stroke={C.ink} strokeWidth={2} strokeLinecap="round"/>
 </g>;

const Box:React.FC<{x:number;y:number;w:number;h:number;label:string;color:string;scale?:number;rotate?:number;eyes?:boolean;frame?:number}> =({x,y,w,h,label,color,scale=1,rotate=0,eyes=false,frame=0})=><g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale}) translate(${-w/2} ${-h})`}>
 <path d={`M0,16L${w*.12},0H${w*.89}L${w},16V${h}H0Z`} fill={color} stroke={C.ink} strokeWidth={3} strokeLinejoin="round"/>
 <path d={`M0,16H${w}M${w*.48},0L${w*.46},16V${h*.3}`} fill="none" stroke={C.ink} strokeWidth={2} opacity={.65}/>
 <path d={`M${w*.46},16H${w*.56}V${h*.36}L${w*.51},${h*.3}L${w*.46},${h*.36}Z`} fill={C.white} opacity={.5}/>
 <rect x={w*.12} y={h*.44} width={w*.76} height={Math.min(47,h*.34)} rx={4} fill={C.white} opacity={.87}/>
 <Txt x={w*.5} y={h*.44+Math.min(47,h*.34)*.67} size={Math.min(26,w*.13)}>{label}</Txt>
 <path d={`M${w*.77},${h*.83}v${-h*.12}m-4,4l4,-4l4,4m7,${h*.12-4}v${-h*.12}m-4,4l4,-4l4,4`} stroke={C.ink} strokeWidth={1.5} fill="none" opacity={.45}/>
 {eyes&&<g><rect x={w*.32} y={h*.68} width={w*.36} height={27} rx={13} fill={C.ink}/><ellipse cx={w*.43} cy={h*.68+13} rx={7} ry={frame%120>114?1.2:8} fill={C.white}/><ellipse cx={w*.57} cy={h*.68+13} rx={7} ry={frame%120>114?1.2:8} fill={C.white}/><circle cx={w*.43+2} cy={h*.68+14} r={3} fill={C.ink}/><circle cx={w*.57+2} cy={h*.68+14} r={3} fill={C.ink}/></g>}
 </g>;

const EVENTS=[{f:50,land:76,x:350,y:767,w:100,h:92,label:'TIN NHẮN',color:C.peach},{f:180,land:206,x:450,y:767,w:100,h:130,label:'SỬA NHẸ',color:C.mint},{f:225,land:251,x:98,y:767,w:118,h:108,label:'GỬI FILE',color:C.orange},{f:257,land:283,x:95,y:659,w:114,h:112,label:'RỬA CỐC',color:C.mint},{f:289,land:315,x:422,y:637,w:150,h:150,label:'DỌN BÀN',color:C.peach}];
function BoxAnim({event:e,f}:{event:typeof EVENTS[number];f:number}){
 if(f<e.f+6)return null;
 const q=clamp((f-e.f-6)/(e.land-e.f-6));
 const x=mix(329,e.x,q),y=mix(495,e.y,q)-Math.sin(q*Math.PI)*125;
 const settle=f>=e.land?Math.sin((f-e.land)*.55)*Math.exp(-(f-e.land)*.15):0;
 return <Box x={x} y={y-settle*7} w={e.w} h={e.h} label={e.label} color={e.color} scale={f<e.land?mix(.12,1,q):1+settle*.025} rotate={f<e.land?Math.sin(q*Math.PI)*(e.x<200?-12:12):settle*1.3}/>;
}

function Character({f}:{f:number}){
 const tapFrames=[50,180,225,257,289];let tap=0;for(const t of tapFrames)tap=Math.max(tap,Math.max(0,1-Math.abs(f-t)/7));
 const proud=progress(f,325,339)*(1-progress(f,385,400));
 const worry=progress(f,398,425);const crouch=worry*9;
 const shake=(f>420&&f<485?Math.sin((f-420)*.22)*3:0);
 const hip:P=[255+shake,641+crouch],neck:P=[256+shake-proud*7,558+crouch];
 const head:P=[neck[0]+(f>450? -7:0)+proud*5,502+crouch];
 const leftShoulder:P=[neck[0]-9,574+crouch],rightShoulder:P=[neck[0]+9,574+crouch];
 const phone:P=[331,520+tap*3];
 const rh:P=[phone[0]-7,phone[1]+21];
 const idleLH:P=[210,627];
 let lh:P=[mix(idleLH[0],195,proud),mix(idleLH[1],479,proud)];
 if(f>95&&f<153){const shrug=Math.sin((f-95)/58*Math.PI);lh=[mix(210,183,shrug),mix(627,567,shrug)]}
 if(f>395){lh=[mix(210,207,worry),mix(627,592,worry)]}
 const le=ik(leftShoulder,lh,46,47,-1),re=ik(rightShoulder,rh,51,51,1);
 const lf:P=[211,755],rf:P=[292,755];const lk=ik(hip,lf,62,64,1),rk=ik(hip,rf,62,64,-1);
 const eyeDir=f<90?3:f<160?6:f<390?3:f<450?-7:7;
 const blink=f%127>120;
 return <g>
 <ellipse cx={256} cy={769} rx={69} ry={9} fill={C.ink} opacity={.09}/>
 <g stroke={C.ink} strokeWidth={9} fill="none" strokeLinecap="round" strokeLinejoin="round">
 <path d={path([lf,lk,hip,rk,rf])}/><path d={path([hip,neck,[head[0],head[1]+45]])}/><path d={path([leftShoulder,rightShoulder])}/>
 <path d={path([leftShoulder,le,lh])}/><path d={path([rightShoulder,re,rh])}/>
 </g>
 <path d={`M${lf[0]-15},758h31M${rf[0]-12},758h31`} stroke={C.ink} strokeWidth={12} strokeLinecap="round"/>
 <path d={`M${neck[0]-12},578Q${neck[0]},589 ${neck[0]+12},578`} stroke={C.orange} strokeWidth={9} fill="none" strokeLinecap="round"/>
 <g transform={`translate(${head[0]} ${head[1]}) rotate(${f>95&&f<153?Math.sin((f-95)/58*Math.PI)*-12:proud*-5+worry*2})`}>
 <circle r={45} fill={C.white} stroke={C.ink} strokeWidth={4}/>
 <path d="M-35,-27Q-6,-58 23,-38" stroke={C.mintDark} strokeWidth={8} fill="none" strokeLinecap="round"/>
 <g transform={`translate(${eyeDir} 1)`}><ellipse cx={-10} cy={-2} rx={3.2} ry={blink?1.2:6.8} fill={C.ink}/><ellipse cx={10} cy={-2} rx={3.2} ry={blink?1.2:6.8} fill={C.ink}/>
 <path d={worry>.5?'M-18,-17l12,4m9,-1l13,-4':'M-18,-17q6,-4 12,0m10,0q6,-4 12,0'} stroke={C.ink} strokeWidth={3} fill="none" strokeLinecap="round"/>
 {worry>.5?<ellipse cx={2} cy={22} rx={5} ry={7} fill={C.ink}/>:<path d={`M-7,19Q4,${27+proud*5} 15,16`} stroke={C.ink} strokeWidth={3} fill="none" strokeLinecap="round"/>}</g>
 {worry>.5&&<path d="M37,-15Q49,1 41,7Q30,8 37,-15" fill="#83B4BB"/>}
 </g>
 <Phone x={phone[0]} y={phone[1]} angle={8-tap*4} screen={f>318?'0':String(Math.max(1,5-EVENTS.filter(e=>f>e.f).length))}/>
 <circle cx={rh[0]} cy={rh[1]} r={7} fill={C.white} stroke={C.ink} strokeWidth={3}/>
 <circle cx={lh[0]} cy={lh[1]} r={5} fill={C.white} stroke={C.ink} strokeWidth={3}/>
 {tap>.1&&<g opacity={tap} stroke={C.orange} strokeWidth={3} strokeLinecap="round"><path d="M346,468l6,-9m-25,5l-2,-10m35,28l9,-2"/></g>}
 </g>;
}

function TaskCard({f}:{f:number}){
 if(f>=390)return null;
 const i=f<125?0:f<210?1:f<250?2:f<282?3:4;
 const titles=['Trả lời tin nhắn','Sửa một chút','Gửi file','Rửa cốc','Dọn bàn'];
 const done=f>=324;
 const cardPop=pop(f,done?324:0);
 return <g transform={`translate(272 252) scale(${Math.min(1.08,cardPop)})`}>
 <rect x={-113} y={-5} width={226} height={143} rx={18} fill={C.ink} opacity={.055} transform="translate(0 6)"/>
 <rect x={-113} y={-5} width={226} height={143} rx={18} fill={C.white} stroke={C.line} strokeWidth={2}/>
 {done?<><circle cx={0} cy={43} r={23} fill={C.mint}/><path d="M-11,43l8,9l16,-19" stroke={C.ink} strokeWidth={4} fill="none" strokeLinecap="round"/><Txt x={0} y={103} size={22}>Gọn rồi!</Txt></>:<>
 <Txt x={0} y={27} size={10} fill={C.mintDark}>MỘT VIỆC ĐANG CHỜ</Txt><Txt x={0} y={59} size={18}>{titles[i]}</Txt>
 <rect x={-88} y={79} width={176} height={37} rx={10} fill={C.orange}/><Txt x={0} y={104} size={15}>ĐỂ SAU</Txt>
 </>}
 <path d="M30,138l18,19l0,-19" fill={C.white}/>
 </g>;
}

function ChoiceCloseup({f}:{f:number}){
 if(f<500||f>=670)return null;
 const enter=progress(f,500,510);const exit=1-progress(f,662,670);
 const hesitate=progress(f,534,570);const switchIt=progress(f,609,644);
 const fingerX=mix(mix(450,235,hesitate),335,switchIt);
 const fingerY=mix(mix(849,515,hesitate),593,switchIt)+Math.sin((f-570)*.13)*(f>570&&f<609?3:0);
 const tap=1-Math.min(1,Math.abs(f-650)/7);
 return <g opacity={enter*exit}>
 <rect width={540} height={960} fill={C.paper}/>
 <Txt x={270} y={143} size={12} fill={C.mintDark}>CÒN MỘT VIỆC NỮA...</Txt>
 <g transform={`translate(270 ${448+(1-enter)*35}) rotate(-3)`}>
 <rect x={-163} y={-236} width={326} height={508} rx={39} fill={C.ink}/><rect x={-150} y={-217} width={300} height={469} rx={28} fill={C.white}/>
 <rect x={-42} y={-226} width={84} height={14} rx={7} fill={C.ink}/>
 <circle cx={0} cy={-129} r={34} fill={C.peach}/><path d="M-17,-133H17V-108H-17ZM-17,-133l8,-8h19l7,8m-18,-8v16" fill="none" stroke={C.ink} strokeWidth={3}/>
 <Txt x={0} y={-50} size={23}>Dọn mấy hộp này?</Txt><Txt x={0} y={-20} size={13} weight={400} fill={C.mintDark}>Chắc cũng nhanh thôi...</Txt>
 <rect x={-126} y={30} width={252} height={62} rx={14} fill={C.mint}/><Txt x={0} y={68} size={19}>LÀM NGAY</Txt>
 <rect x={-126} y={112} width={252} height={62} rx={14} fill={C.orange}/><Txt x={0} y={150} size={19}>ĐỂ SAU</Txt>
 <path d="M-22,228H22" stroke={C.line} strokeWidth={4} strokeLinecap="round"/>
 </g>
 <g transform={`translate(${fingerX+tap*3} ${fingerY+tap*7}) rotate(-24)`}>
 <path d="M23,155C15,131 -12,97 -21,70C-25,59 -12,51 -5,59L4,70L-1,1C-2,-16 20,-16 22,0L27,47C32,29 45,32 47,50C58,34 69,45 69,60C84,48 96,66 93,81L83,142L77,155Z" fill={C.white} stroke={C.ink} strokeWidth={4} strokeLinejoin="round"/>
 <path d="M28,48l3,26m16,-22l3,25m19,-15l-1,20" stroke={C.line} strokeWidth={3} fill="none"/>
 </g>
 {f>572&&f<608&&<g><Txt x={425} y={783} size={30}>...</Txt><path d="M406,758l-4,-10m31,10l4,-10" stroke={C.orange} strokeWidth={3}/></g>}
 </g>;
}

function FinalGag({f}:{f:number}){
 if(f<670)return null;
 const t=clamp((f-670)/45);const y=f<715?mix(-150,770,t*t):770-Math.sin((f-715)*.45)*Math.exp(-(f-715)*.11)*12;
 const rotate=f<715?mix(-6,0,t):0;
 return <g>
 <Box x={270} y={y} w={424} h={372} color={C.orange} label="DỌN HỘP" rotate={rotate} eyes={f>737} frame={f}/>
 {f>=715&&f<745&&<g opacity={1-(f-715)/30} fill={C.peach}><ellipse cx={66} cy={765} rx={Math.max(2,(f-715)*2)} ry={12}/><ellipse cx={480} cy={765} rx={Math.max(2,(f-715)*2)} ry={12}/></g>}
 {f>=744&&<g transform={`translate(0 ${(1-progress(f,744,759))*90})`}>
 <path d="M481,545Q517,540 502,480L477,452" stroke={C.ink} strokeWidth={9} fill="none" strokeLinecap="round"/>
 <Phone x={466} y={423} s={.9} angle={-10} screen="0"/><circle cx={476} cy={448} r={7} fill={C.white} stroke={C.ink} strokeWidth={3}/>
 </g>}
 {f>=781&&<g opacity={progress(f,781,789)} transform="translate(0 0)">
 <rect x={285} y={260} width={204} height={99} rx={15} fill={C.white} stroke={C.line} strokeWidth={2}/><Txt x={387} y={290} size={16}>Nghỉ chút nhé?</Txt><rect x={308} y={307} width={158} height={32} rx={8} fill={C.orange}/><Txt x={387} y={329} size={13}>ĐỂ SAU</Txt><path d="M421,359l24,19v-19" fill={C.white}/>
 </g>}
 {f>=810&&<Box x={270} y={f<832?mix(150,398,Math.pow(clamp((f-810)/22),2)):398} w={106} h={78} color={C.mint} label="NGHỈ" rotate={f<832?-5:0}/>}
 </g>;
}

export function Comedy(){
 const f=useCurrentFrame();const impact=f>=715&&f<730?Math.sin((f-715)*2)*Math.exp(-(f-715)*.22)*5:0;
 const subtitle=f<95?'Một cái thôi mà.':f>=325&&f<390?'Hết việc trên màn hình.':f>=420&&f<491?'Còn ngoài đời thì...':f>=718&&f<775?'Để sau luôn việc dọn đồ để sau.':'';
 return <AbsoluteFill style={{backgroundColor:C.paper}}><svg viewBox="0 0 540 960" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
 <defs><pattern id="grain" width="13" height="13" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".45" fill={C.ink} opacity=".045"/><circle cx="8" cy="10" r=".4" fill={C.ink} opacity=".025"/></pattern></defs>
 <rect width={540} height={960} fill={C.paper}/><rect width={540} height={960} fill="url(#grain)"/>
 <path d="M40,49H500" stroke={C.ink} strokeWidth={1} opacity={.25}/><Txt x={41} y={74} size={10} anchor="start" fill={C.mintDark}>CHUYỆN ĐỂ MAI TÍNH</Txt><Txt x={499} y={74} size={10} anchor="end" fill={C.mintDark}>01</Txt>
 <Txt x={270} y={152} size={62} weight={800}>ĐỂ SAU.</Txt><path d="M172,169Q265,180 368,168" fill="none" stroke={C.orange} strokeWidth={5} strokeLinecap="round"/>
 <g transform={`translate(${impact} ${impact*.5})`}>
 <path d="M36,770H505" stroke={C.ink} strokeWidth={3}/><path d="M46,789H485" stroke={C.line} strokeWidth={1}/>
 <rect x={35} y={405} width={124} height={196} rx={62} fill={C.mint} opacity={.6}/><path d="M61,567L95,531L130,567M95,531v39" stroke={C.mintDark} strokeWidth={2} fill="none" opacity={.5}/>
 <g opacity={.65}><rect x={409} y={398} width={66} height={86} fill={C.white} stroke={C.line} strokeWidth={3}/><circle cx={443} cy={428} r={13} fill={C.orange}/><path d="M420,469l18,-24l24,24" fill={C.mint}/></g>
 <path d="M59,766V652M150,766V652" stroke={C.ink} strokeWidth={6} strokeLinecap="round"/><rect x={45} y={638} width={121} height={14} rx={6} fill={C.mintDark}/><path d="M67,637l-4,-26h23l-4,26" fill={C.peach} stroke={C.ink} strokeWidth={2}/><path d="M75,610v-25m0,13q-16,-17 -20,-5q1,13 20,15m0,-18q12,-21 19,-11q4,11 -19,20" fill={C.mint} stroke={C.mintDark} strokeWidth={2}/>
 <Character f={f}/>{EVENTS.map((e,i)=><BoxAnim key={i} event={e} f={f}/>)}<FinalGag f={f}/><TaskCard f={f}/>
 </g>
 {subtitle&&<g><rect x={42} y={821} width={456} height={53} rx={16} fill={C.white} opacity={.9}/><Txt x={270} y={854} size={f>=718?17:20}>{subtitle}</Txt></g>}
 <ChoiceCloseup f={f}/>
 <path d="M41,913H499" stroke={C.ink} strokeWidth={1} opacity={.18}/><Txt x={270} y={935} size={10} fill={C.mintDark} weight={400}>MỘT CHUYỆN RẤT QUEN.</Txt>
 </svg><Audio src={staticFile('soundtrack.wav')}/></AbsoluteFill>;
}
const Root=()=> <Composition id="ComedyC1" component={Comedy} width={1080} height={1920} fps={30} durationInFrames={840}/>;
registerRoot(Root);
