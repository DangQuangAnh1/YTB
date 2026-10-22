const KEYS=['hips','spine','chest','neck','head','headTop','shR','elR','haR','shL','elL','haL','hipR','knR','ftR','toeR','hipL','knL','ftL','toeL'];
const cache={};
function clip(name){if(!cache[name])cache[name]=require('./clips/'+name+'.json');return cache[name];}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const smooth=x=>{x=clamp(x,0,1);return x*x*(3-2*x);};
const lerp=(a,b,t)=>a+(b-a)*t;
const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
function raw(name,idx){
 const c=clip(name),n=c.frames.length-1,i=clamp(idx,0,n),i0=Math.floor(i),i1=Math.min(n,i0+1),w=i-i0,A=c.frames[i0],B=c.frames[i1],o={};
 for(const k of KEYS)o[k]=[lerp(A[k][0],B[k][0],w),lerp(A[k][1],B[k][1],w)];
 return o;
}
const copy=j=>{const o={};for(const k of KEYS)o[k]=[j[k][0],j[k][1]];return o;};
const hipMid=j=>mid(j.hipR,j.hipL);
function blend(a,b,w){const o={};for(const k of KEYS)o[k]=[lerp(a[k][0],b[k][0],w),lerp(a[k][1],b[k][1],w)];return o;}
function shift(j,dx,dy=0){const o={};for(const k of KEYS)o[k]=[j[k][0]+dx,j[k][1]+dy];return o;}
const UPPER=['spine','chest','neck','head','headTop','shR','elR','haR','shL','elL','haL'];
function rotateKeys(j,keys,pivot,theta){
 const c=Math.cos(theta),s=Math.sin(theta),o=copy(j);
 for(const k of keys){const x=j[k][0]-pivot[0],y=j[k][1]-pivot[1];o[k]=[pivot[0]+x*c-y*s,pivot[1]+x*s+y*c];}
 return o;
}
const rotateUpper=(j,theta)=>rotateKeys(j,UPPER,hipMid(j),theta);
const rotateAll=(j,pivot,theta)=>rotateKeys(j,KEYS,pivot,theta);
function ik2(root,target,l1,l2,bend){
 const dx=target[0]-root[0],dy=target[1]-root[1];let d=Math.hypot(dx,dy);
 const reach=Math.min(Math.max(d,Math.abs(l1-l2)+.5),l1+l2-.01),ux=dx/(d||1),uy=dy/(d||1);
 const a=(l1*l1-l2*l2+reach*reach)/(2*reach),h=Math.sqrt(Math.max(0,l1*l1-a*a));
 const mx=root[0]+ux*a,my=root[1]+uy*a;
 const elbow=[mx-uy*h*bend,my+ux*h*bend];
 const end=[root[0]+ux*reach,root[1]+uy*reach];
 return{mid:elbow,end};
}
const ARM={up:64,fore:52},LEG={thigh:99,shin:100};
function setArm(j,side,target,bend){
 const r=ik2(j['sh'+side],target,ARM.up,ARM.fore,bend),o=copy(j);
 o['el'+side]=r.mid;o['ha'+side]=r.end;return o;
}
function setFoot(j,side,target,bend){
 const r=ik2(j['hip'+side],target,LEG.thigh,LEG.shin,bend),o=copy(j),toeV=[j['toe'+side][0]-j['ft'+side][0],j['toe'+side][1]-j['ft'+side][1]];
 o['kn'+side]=r.mid;o['ft'+side]=r.end;o['toe'+side]=[r.end[0]+toeV[0],r.end[1]+toeV[1]];return o;
}
function lowest(j){let m=-1e9;for(const k of KEYS)m=Math.max(m,j[k][1]);return m;}
module.exports={KEYS,clip,raw,copy,hipMid,blend,shift,rotateKeys,rotateUpper,rotateAll,ik2,setArm,setFoot,lowest,clamp,smooth,lerp,mid,UPPER,ARM,LEG};
