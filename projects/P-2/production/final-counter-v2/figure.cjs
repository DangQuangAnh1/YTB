const F=require('./fight.cjs'),L=require('./lib.cjs'),K=require('../soft-line-motion-v2/curves.cjs');
const unit=(a,b)=>{const d=Math.hypot(b[0]-a[0],b[1]-a[1])||1;return[(b[0]-a[0])/d,(b[1]-a[1])/d];};
function supportSide(id,j,simT){
 if(id==='red'&&simT>=F.LAUNCH.t)return'R';
 const d=j.ftR[1]-j.ftL[1];
 return d>8?'R':d<-8?'L':'R';
}
function build(id,simT){
 const j=F.pose(id,simT),hipMid=L.hipMid(j),shoulderMid=L.mid(j.shR,j.shL);
 const u=unit(j.headTop,j.head),headC=[j.headTop[0]+u[0]*23,j.headTop[1]+u[1]*23],headBottom=[headC[0]+u[0]*22,headC[1]+u[1]*22];
 const rear=supportSide(id,j,simT),P={j,rear,hipMid,shoulderMid,headC,headBottom};
 const S=K.strokes(P);
 return{j,S,headC,hipMid,rear,paths:{
  armL:K.svgPath(K.outline(S.armL,17)),legF:K.svgPath(K.outline(S.frontLeg,18)),body:K.svgPath(K.outline(S.body,21)),armR:K.svgPath(K.outline(S.armR,17))}};
}
module.exports={build};
