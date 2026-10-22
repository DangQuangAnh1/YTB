// Authored curve layer; rig points remain guides, not visible bars.
const {getStroke}=require('../../../../third_party/video/runtime/soft-line-motion-v1/stroke.cjs');
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const quad=(a,b,c,t)=>a.map((v,i)=>(1-t)**2*v+2*(1-t)*t*b[i]+t*t*c[i]);
function limb(v){
 const {a,j,end}=v,entry=mix(a,j,.34),exit=mix(j,end,.66),points=[];
 for(let i=0;i<8;i++)points.push(mix(a,entry,i/8));
 for(let i=0;i<=32;i++)points.push(quad(entry,j,exit,i/32));
 for(let i=1;i<=8;i++)points.push(mix(exit,end,i/8));
 return points;
}
function spine(j,amount){
 const a=j.hip,d=j.neck,b=[a[0]+j.face*amount,a[1]-50],c=[d[0]-j.face*amount,d[1]+40];
 return Array.from({length:49},(_,i)=>{const t=i/48,u=1-t;return a.map((v,k)=>u**3*v+3*u*u*t*b[k]+3*u*t*t*c[k]+t**3*d[k]);});
}
// README's quadratic-midpoint outline conversion, adapted to numeric arrays.
function svgPath(points){
 if(points.length<4)return '';
 const avg=(a,b)=>(a+b)/2;
 let d=`M${points[0]} Q${points[1]} ${avg(points[1][0],points[2][0])},${avg(points[1][1],points[2][1])}`;
 for(let i=2;i<points.length-1;i++)d+=` T${avg(points[i][0],points[i+1][0])},${avg(points[i][1],points[i+1][1])}`;
 return d+' Z';
}
function outline(points,size=14){return getStroke(points.map(p=>[...p,.5]),{size,thinning:0,smoothing:.65,streamline:0,simulatePressure:false,last:true});}
module.exports={limb,spine,outline,svgPath};
