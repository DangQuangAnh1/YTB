import React from 'react';
import {AbsoluteFill,Audio,Composition,Img,Sequence,interpolate,registerRoot,staticFile,useCurrentFrame} from 'remotion';
import script from '../../../artifacts/content/prototype-05-script-v1.json';
const Short=()=>{
 const f=useCurrentFrame(),t=f/30,events=script.events as any[];
 const current=events.find(e=>t>=e.start&&t<e.end) || [...events].reverse().find(e=>t>=e.start) || events[0];
 const active=events.find(e=>!e.meme&&t>=e.start&&t<e.end);
 const reaction=events.find(e=>e.meme&&t>=e.start&&t<e.end);
 const source=current.source as 'post'|'comment',group=current.group;
 const sw=source==='post'?418:530,sh=source==='post'?540:523;
 const crop=script.crop_groups[source],full=group==='full';
 const range=group==='setup'?crop.setup:crop.payoff;
 const w=full?850:960,s=w/sw,h=full?sh*s:(crop.header+range[1]-range[0])*s;
 const left=(1080-w)/2,top=full?(1920-h)/2-30:680;
 const file=source+'-source-v2.png';
 return <AbsoluteFill style={{background:'linear-gradient(135deg,#152332,#3b3144 52%,#172d31)',fontFamily:'Arial, sans-serif',color:'white'}}>
  {[0,1,2,3].map(i=><div key={i} style={{position:'absolute',width:650,height:650,borderRadius:'50%',background:i%2?'#a7773c33':'#468d8d33',filter:'blur(80px)',left:-260+i*300+Math.sin(f/80+i)*100,top:100+i*450+Math.cos(f/100+i)*80}}/>)}
  <div style={{position:'absolute',top:135,left:60,fontSize:27,letterSpacing:3,color:'#c8d1d6'}}>CHUYỆN NHÀ · THREADS</div>
  <div style={{position:'absolute',top:225,left:60,right:60,fontSize:61,fontWeight:850,lineHeight:1.15}}>{source==='post'?'MẸ BÌNH TĨNH QUÁ…':'MỖI NHÀ MỘT KIỂU HỎI THĂM'}</div>
  <div style={{position:'absolute',left,top,width:w,height:h,overflow:'hidden',borderRadius:20,boxShadow:'0 25px 80px #0008',background:'#101010',transform:`translateY(${interpolate(t,[current.start,current.start+.16],[18,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}px)`}}>
   {full?<Img src={staticFile(file)} style={{width:w}}/>:<>
    <div style={{position:'absolute',top:0,width:w,height:crop.header*s,overflow:'hidden'}}><Img src={staticFile(file)} style={{width:w}}/></div>
    <div style={{position:'absolute',top:crop.header*s,width:w,height:(range[1]-range[0])*s,overflow:'hidden'}}><Img src={staticFile(file)} style={{position:'absolute',top:-range[0]*s,width:w}}/></div>
   </>}
  </div>
  {active&&<div style={{position:'absolute',left:65,right:65,bottom:260,textAlign:'center',fontSize:50,fontWeight:750,lineHeight:1.23,textShadow:'0 3px 10px #000'}}>{active.text}</div>}
  {reaction&&<div style={{position:'absolute',left:530,top:1160,width:490,padding:10,background:'#fff',borderRadius:18,transform:`rotate(${reaction.meme==='confused'?-4:4}deg)`}}><Img src={staticFile(reaction.meme+'.jpg')} style={{width:470,height:275,objectFit:'cover',objectPosition:'bottom'}}/></div>}
  <div style={{position:'absolute',left:60,right:60,bottom:125,fontSize:25,color:'#b8c4ca'}}>Nguồn: @{source==='post'?'biu_sub70':'nhtp.1907_'} · cắt ý từ ảnh gốc · demo riêng tư</div>
  <Audio src={staticFile('music.wav')} volume={(frame)=>{const sec=frame/30;return events.some(e=>!e.meme&&sec>=e.start&&sec<e.end)?.27:.43;}}/>
  {events.filter(e=>!e.meme).map(e=><Sequence key={e.name} from={Math.round(e.start*30)} durationInFrames={Math.ceil((e.end-e.start)*30)+1}><Audio src={staticFile(e.name+'.wav')} playbackRate={e.rate}/></Sequence>)}
  {events.filter(e=>e.meme).map(e=><Sequence key={e.name} from={Math.round(e.start*30)} durationInFrames={Math.ceil((e.end-e.start)*30)}><Audio src={staticFile('reaction.wav')} volume={.65}/></Sequence>)}
 </AbsoluteFill>;
};
registerRoot(()=> <Composition id="SourceCards" component={Short} durationInFrames={script.frames} fps={30} width={1080} height={1920}/>);
