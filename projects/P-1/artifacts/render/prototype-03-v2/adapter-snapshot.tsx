import React from 'react';
import {AbsoluteFill, Audio, Composition, Img, Sequence, interpolate, registerRoot, staticFile, useCurrentFrame} from 'remotion';

const Short = () => {
  const f = useCurrentFrame();
  const comment = f >= 210;
  const reveal = f >= 360;
  const style: React.CSSProperties = {position:'absolute',left:70,right:70,textAlign:'center'};
  return <AbsoluteFill style={{background:'#111416',color:'#fff',fontFamily:'Arial, sans-serif'}}>
    <div style={{...style,top:125,fontSize:30,color:'#a6ed6a',letterSpacing:3}}>CHUYỆN TRÊN THREADS</div>
    <div style={{...style,top:220,fontSize:65,fontWeight:800,lineHeight:1.15}}>{comment ? 'XUỐNG BÌNH LUẬN…' : 'HỎI THĂM MẸ\nMÀ MẸ BÌNH TĨNH QUÁ'}</div>
    {!comment ? <Img src={staticFile('post.jpg')} style={{position:'absolute',left:70,top:450,width:940,borderRadius:22}}/> :
      <div style={{position:'absolute',left:70,top:510,width:940,height:reveal?764:560,overflow:'hidden',borderRadius:22}}>
        <Img src={staticFile('comment.jpg')} style={{width:940}}/>
      </div>}
    {reveal && <div style={{...style,top:1350,fontSize:43,fontWeight:800,color:'#a6ed6a'}}>BÀ NGOẠI · FULL HP
      <div style={{border:'3px solid #a6ed6a',padding:5,marginTop:22,borderRadius:8}}><div style={{height:30,background:'#a6ed6a',width:`${interpolate(f,[360,380],[0,100],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})}%`}}/></div>
    </div>}
    <div style={{...style,bottom:250,fontSize:43,lineHeight:1.3,whiteSpace:'pre-line'}}>{f<180?'Khi bạn hỏi thăm mẹ,\nnhưng mẹ lại quá bình tĩnh.':f>=219 && f<330?'Xuống bình luận,\ncòn có mẹ hệ game.':f>=420?'Bà ngoại hồi đầy máu,\nsẵn sàng vào trận.':''}</div>
    <div style={{...style,bottom:135,fontSize:28,color:'#aab4ba'}}>{comment?'Comment · @nhtp.1907_':'Bài đăng · @biu_sub70'} · bản nháp riêng tư</div>
    <Sequence from={5}><Audio src={staticFile('hook.wav')}/></Sequence>
    <Sequence from={219}><Audio src={staticFile('bridge.wav')}/></Sequence>
    <Sequence from={420}><Audio src={staticFile('end.wav')}/></Sequence>
  </AbsoluteFill>;
};
registerRoot(()=> <Composition id="ThreadsShort" component={Short} durationInFrames={540} fps={30} width={1080} height={1920}/>);
