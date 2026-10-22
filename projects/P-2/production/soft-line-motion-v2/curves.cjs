const {getStroke}=require('../../../../third_party/video/runtime/soft-line-motion-v1/stroke.cjs');
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]);
function centripetal(points,per=10){
 if(points.length<3)return points.slice();
 const ext=[points[0].map((v,i)=>2*v-points[1][i]),...points,points.at(-1).map((v,i)=>2*v-points.at(-2)[i])],out=[];
 for(let i=0;i<points.length-1;i++){
  const [p0,p1,p2,p3]=[ext[i],ext[i+1],ext[i+2],ext[i+3]];
  const t1=Math.sqrt(dist(p0,p1))||1e-6,t2=t1+(Math.sqrt(dist(p1,p2))||1e-6),t3=t2+(Math.sqrt(dist(p2,p3))||1e-6),t0=0;
  const lerp=(a,b,ta,tb,t)=>a.map((v,k)=>(tb===ta)?v:(tb-t)/(tb-ta)*v+(t-ta)/(tb-ta)*b[k]);
  for(let s=0;s<per;s++){
   const t=t1+(t2-t1)*s/per;
   const a1=lerp(p0,p1,t0,t1,t),a2=lerp(p1,p2,t1,t2,t),a3=lerp(p2,p3,t2,t3,t);
   const b1=lerp(a1,a2,t0,t2,t),b2=lerp(a2,a3,t1,t3,t);
   out.push(lerp(b1,b2,t1,t2,t));
  }
 }
 out.push(points.at(-1));return out;
}
function svgPath(points){
 if(points.length<4)return '';
 const avg=(a,b)=>(a+b)/2;
 let d=`M${points[0]} Q${points[1]} ${avg(points[1][0],points[2][0])},${avg(points[1][1],points[2][1])}`;
 for(let i=2;i<points.length-1;i++)d+=` T${avg(points[i][0],points[i+1][0])},${avg(points[i][1],points[i+1][1])}`;
 return d+' Z';
}
function outline(points,size){return getStroke(points.map(p=>[...p,.5]),{size,thinning:0,smoothing:.65,streamline:0,simulatePressure:false,last:true});}
const toeOf=(ankle,toe)=>[ankle[0]+(toe[0]-ankle[0])*.55,ankle[1]+(toe[1]-ankle[1])*.55];
function attach(chain,body,limit=45){
 let best=body[0],bd=Infinity;for(const q of body){const v=dist(q,chain[0]);if(v<bd){bd=v;best=q;}}
 if(bd>limit)return chain;
 const o=[best[0]-chain[0][0],best[1]-chain[0][1]],len=[0];
 for(let i=1;i<chain.length;i++)len.push(len[i-1]+dist(chain[i],chain[i-1]));
 return chain.map((p,i)=>{const w=1-len[i]/len.at(-1);return[p[0]+o[0]*w,p[1]+o[1]*w];});
}
function strokes(P){
 const {j,rear}=P,front=rear==='R'?'L':'R';
 const leg=(s)=>[j['hip'+s],j['kn'+s],j['ft'+s],toeOf(j['ft'+s],j['toe'+s])];
 const body=centripetal([...leg(rear).reverse(),j.chest,P.shoulderMid,P.headBottom]);
 const frontLeg=centripetal(attach(leg(front),body));
 const arm=(s)=>centripetal(attach([j['sh'+s],j['el'+s],j['ha'+s]],body));
 return{body,frontLeg,armR:arm('R'),armL:arm('L'),legSide:{rear,front}};
}
function straight(P){
 const {j}=P,l=s=>[j['hip'+s],j['kn'+s],j['ft'+s],toeOf(j['ft'+s],j['toe'+s])],a=s=>[j['sh'+s],j['el'+s],j['ha'+s]];
 return{spine:[P.hipMid,P.shoulderMid,P.headBottom],legR:l('R'),legL:l('L'),armR:a('R'),armL:a('L')};
}
module.exports={centripetal,svgPath,outline,strokes,straight};
