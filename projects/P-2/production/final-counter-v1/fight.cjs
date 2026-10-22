const L=require('./lib.cjs');
const {smooth,clamp}=L;
const FACE={red:1,blue:-1},GROUND=610,R0=470,B0=690;
const OTHER={red:'blue',blue:'red'};
const SIM_END=13.3,FPS=60,OUT_FRAMES=900;
const SLOW={t0:6.9,t1:7.4,rate:.25},HOLD=4/60;
const HITS=[2.25,4.9,7.75];

const suf=id=>id==='blue'?'-m':'';
const SEGS={
 red:[
  {clip:'run',t0:0,t1:.5,a:10,b:29.5,path:[R0-265,R0]},
  {clip:'jab',t0:.5,t1:1.567,a:0,b:64,bl:.15,x:R0},
  {clip:'jab',t0:1.567,t1:2.98,a:66,b:66,bl:.1,x:'prev',breathe:1},
  {clip:'kick',t0:2.978,t1:3.875,a:0,b:70,bl:.14,x:'prev'},
  {clip:'jab',t0:3.875,t1:4.23,a:66,b:66,bl:.12,x:'prev',breathe:1},
  {clip:'jump',t0:4.23,t1:5.55,a:0,b:95,bl:.15,x:'prev',xs:.5},
  {clip:'jab',t0:5.55,t1:6.87,a:66,b:66,bl:.35,x:R0,breathe:1},
  {clip:'jab',t0:6.87,t1:7.57,a:0,b:42,bl:.2,x:'prev'},
  {clip:'jab',t0:7.57,t1:SIM_END,a:66,b:66,bl:.2,x:'prev',breathe:1}
 ],
 blue:[
  {clip:'jab',t0:0,t1:1.0,a:66,b:66,x:B0,breathe:1},
  {clip:'duck',t0:1.0,t1:1.9,a:66,b:150,bl:.2,x:'prev'},
  {clip:'lpunch',t0:1.9,t1:2.65,a:0,b:45,bl:.2,x:'prev'},
  {clip:'lpunch',t0:2.65,t1:5.6,a:45,b:45,bl:.15,x:'prev',breathe:1},
  {clip:'walk',t0:5.6,t1:6.4,a:10,b:18,bl:.25,x:'prev',xs:1},
  {clip:'jab',t0:6.4,t1:7.4,a:66,b:66,bl:.25,x:'prev',breathe:1},
  {clip:'lpunch',t0:7.4,t1:8.23,a:0,b:50,bl:.15,x:'prev'},
  {clip:'stand',t0:8.23,t1:SIM_END,a:0,b:0,bl:.6,x:'prev',breathe:1}
 ]
};

function segPoseRaw(id,s,t){
 const dur=Math.max(1e-6,s.t1-s.t0),u=clamp((t-s.t0)/dur,0,1),idx=s.a+(s.b-s.a)*u;
 return L.raw(s.clip+suf(id),idx);
}
const anchors={red:[],blue:[]};
function segPose(id,i,t){
 const s=SEGS[id][i],j=segPoseRaw(id,s,t),hm=L.hipMid(j);
 let x;
 if(s.path){const u=clamp((t-s.t0)/(s.t1-s.t0),0,1);x=s.path[0]+(s.path[1]-s.path[0])*u;return L.shift(j,x-hm[0]);}
 const start=L.hipMid(segPoseRaw(id,s,s.t0)),xs=s.xs||0;
 return L.shift(j,anchors[id][i]+(hm[0]-start[0])*xs-hm[0]);
}
for(const id of ['red','blue']){
 SEGS[id].forEach((s,i)=>{
  if(s.path)anchors[id][i]=s.path[0];
  else if(typeof s.x==='number')anchors[id][i]=s.x;
  else{const pi=i-1,ps=SEGS[id][pi];anchors[id][i]=L.hipMid(segPose(id,pi,ps.t1))[0];}
 });
}
function trackPose(id,t){
 const segs=SEGS[id];let i=0;for(let k=0;k<segs.length;k++)if(t>=segs[k].t0)i=k;
 const s=segs[i];let j=segPose(id,i,t);
 if(i>0&&s.bl&&t<s.t0+s.bl){const prev=segPose(id,i-1,Math.min(t,segs[i-1].t1));j=L.blend(prev,j,smooth((t-s.t0)/s.bl));}
 if(s.breathe||(i>0&&segs[i-1].breathe&&s.bl&&t<s.t0+s.bl)){const k=s.breathe?1:1-smooth((t-s.t0)/s.bl);j=L.shift(j,0,Math.sin(t*5.5)*2.2*k);}
 return j;
}

const bell=(t,a,p,b)=>t<=a||t>=b?0:(t<p?smooth((t-a)/(p-a)):smooth((b-t)/(b-p)));
const MODS=[
 {id:'blue',kind:'lean',t0:.62,tp:.88,t1:1.12,deg:19},
 {id:'red',kind:'react',t0:2.25,lean:20,dx:48,dur:.7},
 {id:'blue',kind:'xblock',style:'front',t0:3.1,tp:3.3,t1:3.75},
 {id:'blue',kind:'react',t0:3.35,lean:6,dx:30,dur:.6},
 {id:'blue',kind:'xblock',style:'overhead',t0:4.55,tp:4.85,t1:5.3},
 {id:'blue',kind:'react',t0:4.9,lean:4,dx:20,dur:.5,dy:24},
 {id:'red',kind:'react',t0:4.9,lean:18,dx:85,dur:.6},
 {id:'blue',kind:'lean',t0:6.95,tp:7.2,t1:7.45,deg:34},
 {id:'blue',kind:'xblock',style:'victory',t0:9.5,tp:10.2,t1:13.3,hold:1},
 {id:'red',kind:'footik',side:'R',t0:4.4,tm:4.66,tc:4.9,t1:5.2},
 {id:'red',kind:'reach',part:'haR',contact:.833,rise:.15,fall:.2,amt:[0,0],aim:{who:'blue',key:'head',ox:39,oy:0}},
 {id:'red',kind:'reach',part:'haR',contact:1.333,rise:.15,fall:.2,amt:[0,0],aim:{who:'blue',key:'head',ox:0,oy:0}},
 {id:'blue',kind:'reach',part:'haL',contact:2.25,rise:.2,fall:.3,amt:[0,0],aim:{who:'red',key:'chest',ox:12,oy:0}},
 {id:'red',kind:'reach',part:'ftR',contact:3.35,rise:.2,fall:.3,amt:[0,0],aim:{who:'blue',key:'haR',ox:6,oy:0}},
 {id:'red',kind:'reach',part:'ftR',contact:4.9,rise:.25,fall:.15,amt:[0,0],aim:{who:'blue',key:'haR',ox:0,oy:-12},both:true},
 {id:'red',kind:'reach',part:'haR',contact:7.2,rise:.2,fall:.2,amt:[0,0],aim:{who:'blue',key:'head',ox:39,oy:0}},
 {id:'blue',kind:'reach',part:'haL',contact:7.75,rise:.2,fall:.3,amt:[0,0],aim:{who:'red',key:'chest',ox:12,oy:0}}
];
const LAUNCH={t:7.75,vx:540,vy:500,g:1500,spin:Math.PI*1.5,slide:80};

function xblockTargets(j,face,style){
 const c=L.mid(j.shR,j.shL);
 if(style==='victory')return{R:[c[0]+face*18,c[1]-118],L:[c[0]-face*34,c[1]+78]};
 if(style==='overhead')return{R:[c[0]+face*30,c[1]-92],L:[c[0]+face*38,c[1]-84]};
 return{R:[c[0]+face*56,c[1]-14],L:[c[0]+face*52,c[1]+4]};
}
const armBend=(root,target)=>{const a=L.ik2(root,target,L.ARM.up,L.ARM.fore,1),b=L.ik2(root,target,L.ARM.up,L.ARM.fore,-1);return a.mid[1]>b.mid[1]?1:-1;};
const kneeBend=(hip,target,face)=>{const a=L.ik2(hip,target,L.LEG.thigh,L.LEG.shin,1),b=L.ik2(hip,target,L.LEG.thigh,L.LEG.shin,-1);return a.mid[0]*face>b.mid[0]*face?1:-1;};
function applyMod(id,m,j,t){
 const face=FACE[id];
 if(m.kind==='lean'){const w=bell(t,m.t0,m.tp,m.t1);if(w>0)j=L.rotateUpper(j,-face*m.deg*w*Math.PI/180);}
 else if(m.kind==='react'){const tau=t-m.t0;if(tau>0){const e=(1-Math.exp(-tau/.03))*Math.exp(-tau/.2),ex=(1-Math.exp(-tau/.07))*Math.exp(-tau/(m.dur*1.6));if(m.lean)j=L.rotateUpper(j,-face*m.lean*e*Math.PI/180);j=L.shift(j,-face*m.dx*ex,(m.dy||0)*e);}}
 else if(m.kind==='xblock'){
  const w=m.hold?(t<m.t0?0:t<m.tp?smooth((t-m.t0)/(m.tp-m.t0)):1):bell(t,m.t0,m.tp,m.t1);
  if(w>0){const T=xblockTargets(j,face,m.style),k=L.copy(j);
   for(const side of ['R','L']){const r=L.ik2(j['sh'+side],T[side],L.ARM.up,L.ARM.fore,armBend(j['sh'+side],T[side]));k['el'+side]=r.mid;k['ha'+side]=r.end;}
   j=L.blend(j,k,w);}
 }
 else if(m.kind==='footik'){
  const w=smooth((t-m.t0)/.12)*(1-smooth((t-m.tc-.12)/(m.t1-m.tc-.12)));
  if(w>0){const hm=L.hipMid(j),R1=[hm[0]+face*35,hm[1]-175],R2=[hm[0]+face*105,hm[1]-60],start=j['ft'+m.side];
   let tgt;if(t<m.tm)tgt=[L.lerp(start[0],R1[0],smooth((t-m.t0)/(m.tm-m.t0))),L.lerp(start[1],R1[1],smooth((t-m.t0)/(m.tm-m.t0)))];
   else{const u=smooth((t-m.tm)/(m.tc-m.tm));tgt=[L.lerp(R1[0],R2[0],u),L.lerp(R1[1],R2[1],u)];}
   const k=L.setFoot(j,m.side,tgt,kneeBend(j['hip'+m.side],tgt,face));j=L.blend(j,k,w);}
 }
 else if(m.kind==='reach'){
  const w=bell(t,m.contact-m.rise,m.contact,m.contact+m.fall);
  if(w>0)j=L.shift(j,m.amt[0]*w,m.both?m.amt[1]*w:0);
 }
 return j;
}
function composed(id,t){
 let j=trackPose(id,t);
 for(const kind of ['lean','xblock','footik','reach','react'])for(const m of MODS)if(m.id===id&&m.kind===kind)j=applyMod(id,m,j,t);
 return j;
}
function launchBase(){
 const j0=composed('red',LAUNCH.t),c=L.mid(j0.shR,j0.shL),f=FACE.red;
 let s=L.setArm(j0,'R',[c[0]-f*40,c[1]-62],1);s=L.setArm(s,'L',[c[0]-f*58,c[1]-30],1);
 return{j0,s,hm:L.hipMid(j0)};
}
let LB=null;
function redPose(t){
 if(t<LAUNCH.t)return composed('red',t);
 if(!LB){LB=launchBase();}
 const {j0,s,hm}=LB,tau=t-LAUNCH.t,T=2*LAUNCH.vy/LAUNCH.g,f=FACE.red,u=Math.min(tau/T,1);
 const aw=smooth(tau/.12),base=L.blend(j0,s,aw),total=LAUNCH.spin;
 const finalPose=L.rotateAll(s,hm,-total),hLand=GROUND-L.lowest(finalPose);
 const angle=-total*(1-(1-u)*(1-u));
 const air=tau<T,yArc=air?-(LAUNCH.vy*tau-LAUNCH.g*tau*tau/2):0;
 const y=yArc+hLand*smooth(u);
 const slide=Math.max(0,tau-T),x=-f*(-1)*0-f*LAUNCH.vx*Math.min(tau,T)*-1*-1+0;
 const px=-f*LAUNCH.vx*Math.min(tau,T)-f*LAUNCH.slide*(1-Math.exp(-slide*4));
 let r=L.rotateAll(base,hm,angle);r=L.shift(r,px,y);
 return r;
}
function pose(id,t){return id==='red'?redPose(t):composed('blue',t);}

function solveContacts(){
 const order=MODS.filter(m=>m.kind==='reach').sort((a,b)=>a.contact-b.contact);
 for(const m of order){
  m.amt=[0,0];
  const own=pose(m.id,m.contact),vic=pose(m.aim.who,m.contact);
  const tx=vic[m.aim.key][0]+FACE[m.aim.who]*m.aim.ox,ty=vic[m.aim.key][1]+m.aim.oy;
  m.amt=[tx-own[m.part][0],m.both?ty-own[m.part][1]:0];
 }
}

function buildRemap(){
 const step=1/600,n=Math.round(SIM_END/step),outT=new Float64Array(n+1);
 for(let i=0;i<=n;i++){
  const t=i*step;let out=t;
  if(t>SLOW.t0)out+=(Math.min(t,SLOW.t1)-SLOW.t0)*(1/SLOW.rate-1);
  for(const h of HITS)if(t>h)out+=HOLD;
  outT[i]=out;
 }
 return{step,outT,n};
}
const REMAP=buildRemap();
function simAt(outTime){
 const {step,outT,n}=REMAP;if(outTime<=0)return 0;
 let lo=0,hi=n;while(lo<hi){const m=(lo+hi+1)>>1;if(outT[m]<=outTime+1e-9)lo=m;else hi=m-1;}
 let t=lo*step;
 if(lo<n){const a=outT[lo],b=outT[lo+1];if(b>a)t=(lo+(outTime-a)/(b-a))*step;}
 return Math.min(t,SIM_END);
}
function outAt(simT){const {step,outT,n}=REMAP;const i=clamp(simT/step,0,n),i0=Math.floor(i),i1=Math.min(n,i0+1);return outT[i0]+(outT[i1]-outT[i0])*(i-i0);}
solveContacts();
module.exports={pose,composed,simAt,outAt,MODS,LAUNCH,HITS,SLOW,HOLD,FACE,GROUND,R0,B0,SIM_END,FPS,OUT_FRAMES,REMAP,bell,xblockTargets};
