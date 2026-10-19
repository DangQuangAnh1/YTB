import React from 'react';
import {AbsoluteFill, Composition, continueRender, delayRender, registerRoot, staticFile} from 'remotion';
import {MarkDocA, MarkDocB, MarkHong, MarkLuot, MarkRep} from './marks';

// Logo concepts for the P-1 channel. These are original vector drawings with OFL fonts, so they are owned outright.
// One sheet shows each concept as an avatar and a wordmark on dark and light backgrounds.
const fontsReady = delayRender('fonts');
Promise.all([
  new FontFace('TikTok Sans', `url(${staticFile('library/fonts/TikTokSans.ttf')})`, {weight: '300 900'}),
  new FontFace('Patrick Hand', `url(${staticFile('library/fonts/PatrickHand-Regular.ttf')})`),
  new FontFace('Pangolin', `url(${staticFile('library/fonts/Pangolin-Regular.ttf')})`),
].map((f) => f.load().then((l) => document.fonts.add(l)))).then(() => continueRender(fontsReady));

const CONCEPTS = [
  {id: 'D', name: 'Đọc Cmt Giùm', handle: '@doccmtgium', Mark: MarkDocA, font: 'TikTok Sans', weight: 900, word: () => <>đọc <span style={{background: '#FFD43B', color: '#111', borderRadius: 18, padding: '0 14px'}}>cmt</span> giùm</>, accent: '#FFD43B'},
  {id: 'E', name: 'Đọc Cmt Giùm', handle: '@doccmtgium', Mark: MarkDocB, font: 'Patrick Hand', weight: 400, word: () => <>đọc <span style={{color: '#2dd4bf'}}>cmt</span> giùm</>, accent: '#2dd4bf'},
  {id: 'C', name: 'Rep Gì Đây', handle: '@repgiday', Mark: MarkRep, font: 'Pangolin', weight: 400, word: () => <>rep gì đây<span style={{color: '#fb7185'}}>?</span></>, accent: '#fb7185'},
  {id: 'A', name: 'Hóng Cmt', handle: '@hong.cmt', Mark: MarkHong, font: 'TikTok Sans', weight: 900, word: () => <>hóng <span style={{background: '#FFD43B', color: '#111', borderRadius: 18, padding: '0 14px'}}>cmt</span></>, accent: '#FFD43B'},
  {id: 'B', name: 'Lướt Giùm', handle: '@luotgium', Mark: MarkLuot, font: 'Patrick Hand', weight: 400, word: () => <>lướt giùm <span style={{color: '#fb7185'}}>↑</span></>, accent: '#2dd4bf'},
];
const SHEET = ['D', 'E', 'C'];

const Sheet: React.FC = () => <AbsoluteFill style={{background: '#e5e7eb', display: 'flex', flexDirection: 'column', gap: 24, padding: 40}}>
  {CONCEPTS.filter((c) => SHEET.includes(c.id)).map((c) => <div key={c.id} style={{display: 'flex', gap: 24, height: 300}}>
    {['#0b0b0c', '#fafafa'].map((bg) => <div key={bg} style={{flex: 1, background: bg, borderRadius: 28, display: 'flex', alignItems: 'center', gap: 34, padding: '0 40px',
      color: bg === '#fafafa' ? '#111' : '#fff'}}>
      <c.Mark size={210}/>
      <div>
        <div style={{fontFamily: c.font, fontWeight: c.weight, fontSize: 92, lineHeight: 1}}>{c.word(c.name)}</div>
        <div style={{fontFamily: 'TikTok Sans', fontWeight: 600, fontSize: 34, opacity: 0.6, marginTop: 14}}>{c.id} · {c.handle}</div>
      </div>
    </div>)}
  </div>)}
</AbsoluteFill>;


// YouTube banner 2560x1440; everything important stays inside the 1546x423 centre safe area.
const Banner: React.FC<{id: string}> = ({id}) => {
  const c = CONCEPTS.find((x) => x.id === id) ?? CONCEPTS[0];
  return <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 50%, #1c1c1f 0%, #0b0b0c 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <div style={{width: 1546, height: 423, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 50}}>
      <c.Mark size={280}/>
      <div style={{color: '#fff'}}>
        <div style={{fontFamily: c.font, fontWeight: c.weight, fontSize: 132, lineHeight: 1}}>{c.word(c.name)}</div>
        <div style={{fontFamily: 'TikTok Sans', fontWeight: 600, fontSize: 44, opacity: 0.7, marginTop: 22}}>Kể chuyện Threads hot · chuỗi cmt hài &amp; ấm áp</div>
      </div>
    </div>
  </AbsoluteFill>;
};

// Single avatar export (profile picture) for the chosen concept: --props='{"id":"A"}'
const Avatar: React.FC<{id: string}> = ({id}) => {
  const c = CONCEPTS.find((x) => x.id === id) ?? CONCEPTS[0];
  return <AbsoluteFill style={{background: 'transparent'}}><c.Mark size={800}/></AbsoluteFill>;
};

registerRoot(() => <>
  <Composition id="LogoSheet" component={Sheet} width={2000} height={1060} fps={30} durationInFrames={1}/>
  <Composition id="Banner" component={Banner} width={2560} height={1440} fps={30} durationInFrames={1} defaultProps={{id: 'D'}}/>
  <Composition id="Avatar" component={Avatar} width={800} height={800} fps={30} durationInFrames={1} defaultProps={{id: 'A'}}/>
</>);
