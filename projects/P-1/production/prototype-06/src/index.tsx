import React from 'react';
import {AbsoluteFill, AnimatedImage, Audio, Composition, Img, Sequence, interpolate, registerRoot, spring, staticFile, useCurrentFrame} from 'remotion';
import {createTikTokStyleCaptions} from '@remotion/captions';
import timeline from './timeline.json';
import sizes from '../../../media/prototype-06/cards-fit/sizes.json';

const FPS = 30;
// Captured cards cropped to content width (media/prototype-06/cards-fit).
const SIZES = sizes as Record<string, number[]>;
const SHOW_W = 1000, STACK_DEPTH = 3, STACK_BOTTOM = 1340;
const speech = timeline.lines.map((l) => [l.start, l.end]);
const preset = timeline.preset as any;
const SFX_GAIN: Record<string, number> = {whoosh: 0.32, pop: 0.5, laugh: 0.45, ting: 0.55, boing: 0.5, scratch: 0.5};
const accents = timeline.sfx.filter((s) => s.type !== 'whoosh');
const {pages} = createTikTokStyleCaptions({
  captions: timeline.captions.map((c) => ({...c, text: ' ' + c.text.trim()})),
  combineTokensWithinMilliseconds: 1100,
  breakOnSilenceAfterMilliseconds: 220,
});

const Background: React.FC = () => {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{background: `linear-gradient(160deg,${preset.background[0]} 0%,${preset.background[1]} 55%,${preset.background[2]} 100%)`}}>
    {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', width: 700, height: 700, borderRadius: '50%',
      background: ['#3b82f622', '#f59e0b1c', '#10b98118'][i], filter: 'blur(90px)',
      left: -200 + i * 380 + Math.sin(f / 90 + i * 2) * 120, top: 200 + i * 520 + Math.cos(f / 110 + i) * 90}}/>)}
  </AbsoluteFill>;
};

const cardH = (card: string) => SIZES[card][1] * SHOW_W / SIZES[card][0];
const PEEK = 92; // visible header strip of each older card above the one in front
// Bottom offset of the card at depth k so that its top sits PEEK*k above the front card's top.
// Older cards are clipped so they never hang below the front card.
const shownH = (stack: string[], k: number) => (k === 0 ? cardH(stack[0]) : Math.min(cardH(stack[k]), cardH(stack[0]) + PEEK * k - 8));
const lift = (stack: string[], k: number) => (k === 0 ? 0 : cardH(stack[0]) + PEEK * k - shownH(stack, k));

const Card: React.FC<{card: string; y: number; h: number; depth: number; enter: number}> = ({card, y, h, depth, enter}) => {
  const front = depth === 0;
  const scale = front ? interpolate(enter, [0, 1], [0.9, 1]) : 1 - depth * 0.04;
  const dy = front ? interpolate(enter, [0, 1], [160, 0]) : 0;
  return <div style={{position: 'absolute', left: (1080 - SHOW_W) / 2, bottom: 0, width: SHOW_W, height: h,
    transform: `translateY(${dy - y}px) scale(${scale})`, transformOrigin: 'top center', opacity: front ? enter : 1,
    filter: front ? undefined : `brightness(${1 - depth * 0.22})`, zIndex: 10 - depth,
    borderRadius: 26, overflow: 'hidden', border: '2px solid #2f2f2f', boxShadow: '0 -10px 50px #000c', background: '#101010'}}>
    <Img src={staticFile('cards-fit/' + card + '.png')} style={{width: SHOW_W, display: 'block'}}/>
  </div>;
};

const Captions: React.FC = () => {
  const ms = useCurrentFrame() / FPS * 1000;
  const page = pages.find((p) => ms >= p.startMs && ms < p.startMs + p.durationMs + 120);
  if (!page) return null;
  return <div style={{position: 'absolute', left: 70, right: 70, top: 1420, textAlign: 'center', fontFamily: 'Arial, sans-serif',
    fontSize: 66, fontWeight: 900, lineHeight: 1.2, color: 'white', WebkitTextStroke: '10px #000', paintOrder: 'stroke fill'}}>
    {page.tokens.map((t, i) => {
      const on = ms >= t.fromMs && ms < t.toMs;
      return <span key={i} style={{color: on ? preset.accent : 'white', display: 'inline-block', whiteSpace: 'pre', transform: on ? 'scale(1.08)' : undefined}}>{t.text}</span>;
    })}
  </div>;
};

// Punchline reaction: animated emoji sticker (MIT) or classic meme template (private only).
const Reaction: React.FC<{r: (typeof timeline.reactions)[number]}> = ({r}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: FPS, config: {damping: 9, stiffness: 180}});
  const out = interpolate(f, [r.duration * FPS - 8, r.duration * FPS], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const wobble = Math.sin(f / 4) * 3;
  // Anchor on the front card's top-right corner so the sticker never covers the punchline text.
  const cardTop = STACK_BOTTOM - cardH(r.card);
  if (r.kind === 'emoji') {
    return <div style={{position: 'absolute', zIndex: 50, left: 770, top: cardTop - 230, width: 270, height: 270, opacity: out,
      transform: `scale(${pop}) rotate(${-8 + wobble}deg)`, filter: 'drop-shadow(0 18px 30px #000b)'}}>
      <AnimatedImage src={staticFile(r.file)} width={270} height={270}/>
    </div>;
  }
  return <div style={{position: 'absolute', zIndex: 50, left: 560, top: cardTop - 270, width: 460, padding: 10, background: '#fff', borderRadius: 18, opacity: out,
    transform: `scale(${pop}) rotate(${5 + wobble * 0.5}deg)`, boxShadow: '0 20px 50px #000c'}}>
    <Img src={staticFile(r.file)} style={{width: 440, height: 250, objectFit: 'cover', objectPosition: 'center', display: 'block', borderRadius: 8}}/>
  </div>;
};

const Short: React.FC = () => {
  const f = useCurrentFrame(), t = f / FPS;
  const shown = timeline.cards.filter((c) => t >= c.start);
  const stack = shown.slice(-STACK_DEPTH - 1).reverse();
  const enter = spring({frame: f - Math.round(stack[0].start * FPS), fps: FPS, config: preset.spring});
  const musicVol = (frame: number) => {
    const s = frame / FPS;
    const talking = speech.some(([a, b]) => s >= a - 0.12 && s < b + 0.12);
    const fade = interpolate(s, [0, 1, timeline.duration - 1.5, timeline.duration], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    const m = preset.music;
    const underSfx = accents.some((a) => s >= a.at - 0.05 && s < a.at + 0.9);
    return (underSfx ? Math.min(m.under_sfx, m.under_voice) : talking ? m.under_voice : m.between) * fade;
  };
  return <AbsoluteFill style={{fontFamily: 'Arial, sans-serif', color: 'white'}}>
    <Background/>
    <div style={{position: 'absolute', top: 120, left: 60, right: 60}}>
      <div style={{fontSize: 30, letterSpacing: 4, color: '#9ca3af', fontWeight: 700}}>THREADS · CHUYỆN NHÀ</div>
      <div style={{fontSize: 70, fontWeight: 900, lineHeight: 1.12, marginTop: 14}}>MẸ CHUYỂN TIỀN,<br/><span style={{color: preset.accent}}>CON REP GÌ CHO NGẦU?</span></div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 520, height: 820}}>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 820}}>
        {stack.map((c, depth) => {
          const now = stack.map((x) => x.card), before = now.slice(1);
          const y = depth === 0 ? 0 : interpolate(enter, [0, 1], [lift(before, depth - 1), lift(now, depth)]);
          const h = depth === 0 ? cardH(c.card) : interpolate(enter, [0, 1], [shownH(before, depth - 1), shownH(now, depth)]);
          return <Card key={c.card} card={c.card} y={y} h={h} depth={depth} enter={depth === 0 ? enter : 1}/>;
        })}
      </div>
    </div>
    {timeline.reactions.map((r) => <Sequence key={r.id} from={Math.round(r.start * FPS)} durationInFrames={Math.round(r.duration * FPS)}>
      <Reaction r={r}/>
    </Sequence>)}
    <Captions/>
    <div style={{position: 'absolute', left: 60, right: 60, bottom: 90, fontSize: 24, color: '#6b7280', textAlign: 'center'}}>
      Nguồn: Threads @bittercake_swee & bình luận · demo riêng tư
    </div>
    <Audio src={staticFile(preset.music.file)} volume={musicVol}/>
    {timeline.lines.map((l) => <Sequence key={l.id} from={Math.round(l.start * FPS)} durationInFrames={Math.ceil((l.end - l.start) * FPS) + 2}>
      <Audio src={staticFile(l.file)}/>
    </Sequence>)}
    {timeline.sfx.map((s, i) => <Sequence key={i} from={Math.max(0, Math.round(s.at * FPS))} durationInFrames={90}>
      <Audio src={staticFile('audio/' + s.type + '.mp3')} volume={SFX_GAIN[s.type] ?? 0.5}/>
    </Sequence>)}
  </AbsoluteFill>;
};

registerRoot(() => <Composition id="StackedThread" component={Short} durationInFrames={timeline.frames} fps={FPS} width={1080} height={1920}/>);
