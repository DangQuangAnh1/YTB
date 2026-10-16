import React from 'react';
import {AbsoluteFill,CanvasImage,Interactive,Track,staticFile,useCurrentFrame,useVideoConfig,interpolate,Sequence} from 'remotion';
import {Audio} from '@remotion/media';
import type {Caption} from '@remotion/captions';

// Captions remain JSON-compatible. Custom fixed two-line layout is intentional
// for this screenshot-led, phone-readable prototype. Official element source
// was unavailable (HTTP 403); no transcription quality is implied.
const Subtitle: React.FC<{captions:Caption[]}> = ({captions}) => {
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  const active=captions.find(c=>frame*1000/fps>=c.startMs && frame*1000/fps<c.endMs);
  if(!active)return null;
  return <div style={{position:'absolute',left:90,right:90,bottom:220,textAlign:'center',fontSize:48,fontWeight:750,lineHeight:1.25,color:'#fff',background:'#202426',padding:'24px 26px',borderRadius:22}}>{active.text}</div>;
};
const base:React.CSSProperties={background:'#101315',color:'#f7f8f5',fontFamily:'Arial, sans-serif'};
const Label:React.FC<{children:React.ReactNode}>=({children})=><div style={{position:'absolute',top:142,left:90,fontSize:31,letterSpacing:4,fontWeight:700,color:'#a6ed6a'}}>{children}</div>;
export const PostScene=Interactive.create({layout:'absolute-fill',Component:()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={base}>
   <Label>CHUYỆN TRÊN THREADS</Label>
   <div style={{position:'absolute',top:220,left:90,right:90,fontSize:83,fontWeight:900,lineHeight:1.09}}>NHẮN TIN<br/>HỎI THĂM MẸ…</div>
   <div style={{position:'absolute',top:440,left:90,fontSize:32,color:'#b7c0c7'}}>Bài đăng · @biu_sub70</div>
   <div style={{position:'absolute',left:90,top:510,width:900,height:934,borderRadius:30,overflow:'hidden',boxShadow:'0 26px 60px #0008',scale:interpolate(frame,[0,7*fps],[1,1.015],{extrapolateRight:'clamp'})}}>
    <CanvasImage src={staticFile('post.jpg')} style={{width:900,height:934}}/>
   </div>
   <Subtitle captions={[{text:'Khi bạn hỏi thăm mẹ,\nnhưng mẹ lại quá bình tĩnh.',startMs:150,endMs:2550,timestampMs:null,confidence:null}]}/>
   <div style={{position:'absolute',bottom:120,left:90,fontSize:28,color:'#7d8b94'}}>Ảnh chat trong bài · phần đầu của câu chuyện</div>
 </AbsoluteFill>;
}});
export const CommentScene=Interactive.create({layout:'absolute-fill',Component:()=>{
 const frame=useCurrentFrame();const {fps}=useVideoConfig();
 return <AbsoluteFill style={base}>
  <Label>XUỐNG PHẦN BÌNH LUẬN…</Label>
  <div style={{position:'absolute',top:220,left:90,right:90,fontSize:83,fontWeight:900,lineHeight:1.09}}>GẶP NGAY<br/><span style={{color:'#a6ed6a'}}>MẸ HỆ GAME</span></div>
  <div style={{position:'absolute',left:90,top:500,width:900,height:frame<3.2*fps?418:frame<5*fps?501:772,overflow:'hidden',borderRadius:24,scale:interpolate(frame,[5*fps,5.15*fps,5.4*fps],[1,1.035,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}}>
   <CanvasImage src={staticFile('comment.png')} style={{width:900,height:771.22}}/>
  </div>
  {frame>=5*fps?<div style={{position:'absolute',left:110,top:1330,width:860}}>
   <div style={{fontSize:35,fontWeight:800,letterSpacing:2,marginBottom:16,color:'#a6ed6a'}}>BÀ NGOẠI · 100 / 100 HP</div>
   <div style={{height:32,border:'3px solid #a6ed6a',borderRadius:7,padding:4}}><div style={{height:'100%',background:'#a6ed6a',width:`${interpolate(frame,[5*fps,5.6*fps],[5,100],{extrapolateRight:'clamp'})}%`}}/></div>
  </div>:null}
  <Subtitle captions={[{text:'Xuống bình luận,\ncòn có mẹ hệ game.',startMs:300,endMs:2300,timestampMs:null,confidence:null},{text:'Bà ngoại hồi đầy máu,\nsẵn sàng vào trận.',startMs:7000,endMs:9250,timestampMs:null,confidence:null}]}/>
  <div style={{position:'absolute',bottom:120,left:90,right:90,fontSize:28,color:'#7d8b94'}}>Comment · @nhtp.1907_ · ảnh do bạn cung cấp</div>
 </AbsoluteFill>;
}});
export const ThreadsShort=()=>{
 const {fps}=useVideoConfig();
 return <AbsoluteFill style={base}>
  <Track name="Post to funny reply">
   <PostScene name="Actual post" durationInFrames={7*fps}/>
   <CommentScene name="Full HP reply" from={7*fps} durationInFrames={11*fps}/>
  </Track>
  <Sequence name="Narration and original arcade effect" durationInFrames={18*fps}><Audio src={staticFile('mix.wav')}/></Sequence>
 </AbsoluteFill>;
};
