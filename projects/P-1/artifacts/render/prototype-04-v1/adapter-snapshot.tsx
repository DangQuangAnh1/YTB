import React from 'react';
import {AbsoluteFill, Audio, Composition, Img, Sequence, interpolate, registerRoot, staticFile, useCurrentFrame} from 'remotion';
import script from '../../../artifacts/content/prototype-04-script-v1.json';

const Short=()=>{
 const frame=useCurrentFrame(),t=frame/30;
 const events=script.events as any[];
 const active=events.find(e=>!e.meme&&t>=e.start&&t<e.end+.18);
 const reaction=events.find(e=>e.meme&&t>=e.start&&t<e.end);
 const second=events.find(e=>e.name==='q3')!.start-.3;
 const comment=t>=second,scale=comment?1.5:2;
 const top=comment?480:390;
 const source=comment?'comment':'post';
 const region=active?.source===source?active.region:null;
 return <AbsoluteFill style={{background:'#111315',color:'white',fontFamily:'Arial, sans-serif'}}>
  <div style={{position:'absolute',top:135,left:60,fontSize:30,color:'#a8adaf',letterSpacing:3}}>ĐỌC CHAT CÙNG MÌNH</div>
  <div style={{position:'absolute',top:210,left:60,right:60,fontSize:62,fontWeight:900,lineHeight:1.12}}>{comment?'CÒN ĐÂY LÀ MẸ HỆ GAME…':'HỎI THĂM MẸ MÙA LŨ…'}</div>
  <Img src={staticFile(source+'.jpg')} style={{position:'absolute',left:60,top,width:960,borderRadius:18}}/>
  {region&&<div style={{position:'absolute',left:60+region[0]*scale,top:top+region[1]*scale,width:region[2]*scale,height:region[3]*scale,border:'5px solid #ffdb4d',borderRadius:20,boxSizing:'border-box',boxShadow:'0 0 25px #ffdb4d66'}}/>}
  {active&&<div style={{position:'absolute',left:60,right:60,top:1470,textAlign:'center',fontSize:52,fontWeight:800,lineHeight:1.2,color:active.name.startsWith('q')?'#d9f4ff':'#ffdb4d'}}>{active.text}</div>}
  <div style={{position:'absolute',left:60,right:60,bottom:125,fontSize:27,color:'#949c9f'}}>Threads · {comment?'@nhtp.1907_':'@biu_sub70'} · bản demo riêng tư</div>
  {events.filter(e=>!e.meme).map(e=><Sequence key={e.name} from={Math.round(e.start*30)} durationInFrames={Math.ceil((e.end-e.start)*30)+1}><Audio src={staticFile(e.name+'.wav')} playbackRate={e.rate}/></Sequence>)}
  {events.filter(e=>e.meme).map(e=><Sequence key={e.name} from={Math.round(e.start*30)} durationInFrames={Math.round((e.end-e.start)*30)}><Audio src={staticFile('reaction.wav')}/></Sequence>)}
  {reaction&&<AbsoluteFill style={{background:'#111315',justifyContent:'center',alignItems:'center'}}>
   <div style={{position:'absolute',top:290,left:65,right:65,textAlign:'center',fontSize:68,fontWeight:900,lineHeight:1.15,color:'#ffdb4d'}}>{reaction.caption}</div>
   <Img src={staticFile(reaction.meme+'.jpg')} style={{width:960,transform:`scale(${interpolate(t,[reaction.start,reaction.end],[1,1.08],{extrapolateLeft:'clamp',extrapolateRight:'clamp'})})`}}/>
   <div style={{position:'absolute',bottom:200,fontSize:25,color:'#949c9f'}}>Reaction meme · Imgflip · private demo</div>
  </AbsoluteFill>}
 </AbsoluteFill>;
};
registerRoot(()=> <Composition id="ChatDemo" component={Short} durationInFrames={script.frames} fps={30} width={1080} height={1920}/>);
