import React from 'react';
import {AbsoluteFill, AnimatedImage, Audio, Composition, Img, Loop, OffthreadVideo, Sequence, continueRender, delayRender,
  interpolate, registerRoot, spring, staticFile, useCurrentFrame} from 'remotion';
import {createTikTokStyleCaptions} from '@remotion/captions';
import {MarkDocA, MarkDocB, MarkHong, MarkLuot, MarkRep} from './marks';

// Engine layout: a real-footage background, reply-chain groups of real Threads cards, a handwritten hook and word captions.
// Everything mood-specific comes from props.preset (mood-presets.json), built per episode by build-timeline.mjs.
const FPS = 30, W = 1080, SHOW_W = 980;

// OFL fonts with Vietnamese coverage (media/library/fonts).
const fontsReady = delayRender('fonts');
Promise.all([
  new FontFace('TikTok Sans', `url(${staticFile('library/fonts/TikTokSans.ttf')})`, {weight: '300 900'}),
  new FontFace('Patrick Hand', `url(${staticFile('library/fonts/PatrickHand-Regular.ttf')})`),
  new FontFace('Pangolin', `url(${staticFile('library/fonts/Pangolin-Regular.ttf')})`),
].map((f) => f.load().then((loaded) => document.fonts.add(loaded)))).then(() => continueRender(fontsReady));

type Props = any;

const Background: React.FC<{p: Props}> = ({p}) => {
  const f = useCurrentFrame(), look = p.preset.look;
  const zoom = interpolate(f, [0, p.frames], [1, look.zoom_to]);
  return <AbsoluteFill style={{background: '#000'}}>
    <AbsoluteFill style={{transform: `scale(${zoom})`}}>
      {look.backgrounds ? <BgPlaylist p={p}/> : <Loop durationInFrames={Math.floor(look.bg_seconds * FPS)}>
        <OffthreadVideo src={staticFile(look.background)} muted
          style={{width: W, height: 1920, objectFit: 'cover', filter: `brightness(${look.bg_brightness}) saturate(${look.bg_saturate})`}}/>
      </Loop>}
    </AbsoluteFill>
    <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 45%, transparent 40%, rgba(0,0,0,${look.vignette}) 100%)`}}/>
  </AbsoluteFill>;
};

// Format v2: bright clips cut every look.cut_s seconds, in order, each played from its start.
const BgPlaylist: React.FC<{p: Props}> = ({p}) => {
  const look = p.preset.look, cut = Math.round((look.cut_s ?? 5) * FPS), clips = look.backgrounds;
  return <>{Array.from({length: Math.ceil(p.frames / cut)}, (_, k) => {
    const c = clips[k % clips.length];
    return <Sequence key={k} from={k * cut} durationInFrames={cut}>
      <Loop durationInFrames={Math.max(1, Math.floor(c.seconds * FPS))}>
        <OffthreadVideo src={staticFile(c.file)} muted
          style={{width: W, height: 1920, objectFit: 'cover', filter: `brightness(${look.bg_brightness}) saturate(${look.bg_saturate})`}}/>
      </Loop>
    </Sequence>;
  })}</>;
};

// Format v2 watermark: the channel name, small and semi-transparent, hopping corners every 9s.
const Watermark: React.FC<{p: Props}> = ({p}) => {
  const f = useCurrentFrame();
  const spots = [{top: 120, left: 60}, {top: 120, right: 60}, {bottom: 170, right: 60}, {bottom: 170, left: 60}];
  const k = Math.floor(f / (9 * FPS)) % spots.length;
  return <div style={{position: 'absolute', ...spots[k], fontFamily: 'TikTok Sans', fontWeight: 800, fontSize: 34, color: '#fff', opacity: 0.5,
    textShadow: '0 2px 8px #000a', zIndex: 60}}>{p.watermark}</div>;
};

// Film grain: a re-seeded SVG turbulence every 2 frames, so no texture files are needed.
const Grain: React.FC<{amount: number}> = ({amount}) => {
  const seed = Math.floor(useCurrentFrame() / 2);
  return <AbsoluteFill style={{opacity: amount, mixBlendMode: 'overlay', pointerEvents: 'none'}}>
    <svg width={W} height={1920}><filter id={`g${seed}`}><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed}/></filter>
      <rect width="100%" height="100%" filter={`url(#g${seed})`}/></svg>
  </AbsoluteFill>;
};

const Identity: React.FC<{p: Props}> = ({p}) => {
  const Mark = p.brand ? MARKS[p.brand.id] : null;
  return <div style={{position: 'absolute', top: 150, left: 64, display: 'flex', alignItems: 'center', gap: 16, opacity: 0.85}}>
    {Mark ? <Mark size={62}/> : <div style={{width: 58, height: 58, borderRadius: 29, background: '#f5f5f5', color: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Patrick Hand', fontSize: 40}}>H</div>}
    <div style={{fontFamily: 'TikTok Sans', fontWeight: 650, fontSize: 30, color: '#fff', textShadow: '0 2px 8px #000a'}}>{p.handle}</div>
  </div>;
};

// Handwritten hook with a marker stroke drawn in under the text.
const Hook: React.FC<{p: Props}> = ({p}) => {
  const f = useCurrentFrame(), look = p.preset.look;
  const draw = interpolate(f, [8, 26], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const appear = interpolate(f, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  const font = look.hook_font === 'Pangolin' ? 'Pangolin' : 'Patrick Hand';
  // Full size during the cold-open group, then it shrinks into a title so collapsed strips have room.
  const second = p.groups.length > 1 ? p.cards.find((c: Props) => c.card === p.groups[1][0]).start * FPS : p.frames;
  const shrink = interpolate(f, [second, second + 12], [1, 0.62], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', top: interpolate(shrink, [0.62, 1], [222, 236]), left: 70, right: 70, transform: `rotate(-2.5deg) scale(${shrink})`,
    transformOrigin: 'top left', opacity: appear}}>
    <div style={{fontFamily: font, fontSize: font === 'Pangolin' ? 56 : 68, lineHeight: 1.15, color: '#fff', textShadow: '0 3px 14px #000c'}}>{p.hook}</div>
    <svg width={760} height={40} style={{marginTop: 2}}>
      <path d="M6 24 C 180 8, 420 34, 750 14" stroke={look.marker} strokeWidth={9} fill="none" strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={draw} opacity={0.9}/>
    </svg>
  </div>;
};

// Reply-chain layout. Each group is [parent, child, child...]: the parent comment with its replies attached underneath,
// like the native Threads conversation view. Older groups collapse into header strips above the active group.
const PEEK = 84;
// v1: hook strip on top, chains under it with collapsed strips. v2: one large card group, centred, no strips.
const dims = (p: Props) => ({GROUP_TOP: p.group_top ?? 560, MAX_H: p.max_h ?? 720, STRIPS: p.strips ?? 2});
const ease = (x: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, x)), 3);
const layout = (p: Props, t: number) => {
  const {GROUP_TOP, MAX_H, STRIPS} = dims(p);
  const cardH = (c: string) => p.sizes[c][1] * SHOW_W / p.sizes[c][0];
  const start: Record<string, number> = Object.fromEntries(p.cards.map((c: Props) => [c.card, c.start]));
  const groups: string[][] = p.groups.filter((g: string[]) => t >= start[g[0]]);
  if (!groups.length) return {cards: [] as Props[], strips: [] as Props[], enter: 1};
  const front = groups[groups.length - 1];
  const enter = ease((t - start[front[0]]) / 0.45);
  const shown = front.filter((c) => t >= start[c]);
  const grow = shown.map((c, i) => (i === 0 ? 1 : ease((t - start[c]) / 0.3)));
  const raw = shown.map((c, i) => cardH(c) * grow[i]);
  // Keep full text size. When the chain outgrows the window, scroll it up like reading a thread,
  // so the newest reply is always fully visible. Only one oversized card is scaled down.
  const tall = shown.length === 1 && cardH(shown[0]) > MAX_H;
  const sc = tall ? 1 : Math.min(1, MAX_H / Math.max(...shown.map(cardH), 1));
  const total = raw.reduce((x, y) => x + y, 0) * sc;
  // Pan a tall card from top to bottom over its first 85% on screen, like scrolling through a chat screenshot.
  const span = tall ? (p.cards.find((c: Props) => c.card === shown[0]).end ?? start[shown[0]] + 6) - start[shown[0]] : 1;
  const shift = tall ? -(total - MAX_H) * ease((t - start[shown[0]] - 0.6) / (span * 0.85)) : Math.min(0, MAX_H - total);
  const center = p.format === 'v2' && !tall ? Math.max(0, (MAX_H - total) / 2) : 0;
  let y = GROUP_TOP + shift + center;
  const cards = shown.map((c, i) => {
    const top = y; y += raw[i] * sc;
    return {card: c, top, height: raw[i] * sc, scale: sc, appear: grow[i], parent: i === 0};
  });
  // The group that just left animates from full size into the first strip.
  const prevFull = (g: string[]) => Math.min(MAX_H, g.reduce((x, c) => x + cardH(c), 0));
  const strips = groups.slice(-STRIPS - 1, -1).reverse().map((g, k) => {
    const to = GROUP_TOP - (k + 1) * PEEK;
    const from = k === 0 ? GROUP_TOP : GROUP_TOP - k * PEEK;
    const hFrom = k === 0 ? prevFull(g) : PEEK;
    // While a long chain scrolls up, push the strips up with it so their headers never overlap.
    return {card: g[0], depth: k + 1, top: from + (to - from) * enter + shift, height: hFrom + (PEEK - hFrom) * enter,
      fade: Math.max(0, Math.min(1, 1 + shift / (PEEK * 1.5)))};
  });
  return {cards, strips, enter};
};

// Meme camera (props.camera): 'zoom' = punch-in with a short impact shake, 'push' = slow detective push-in over a line,
// 'shake' = impact shake only. The card group scales around the active card's centre.
const cameraAt = (p: Props, f: number) => {
  let scale = 1, x = 0, y = 0;
  for (const c of p.camera ?? []) {
    const k = f - c.start * FPS, n = c.duration * FPS;
    if (k < 0 || k > n) continue;
    const out = interpolate(k, [n - 8, n], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    if (c.type === 'push') scale *= 1 + c.strength * (k / n) * out;
    if (c.type === 'zoom') scale *= 1 + c.strength * spring({frame: k, fps: FPS, config: {damping: 12, stiffness: 260}}) * out;
    if (c.type === 'zoom' || c.type === 'shake') {
      const amp = c.type === 'shake' ? 22 * c.strength * Math.max(0, 1 - k / 15) : 12 * Math.max(0, 1 - k / 10);
      x += Math.sin(k * 2.7) * amp; y += Math.cos(k * 3.3) * amp;
    }
  }
  return {scale, x, y};
};
// Beat dim: the background darkens a little while a big reaction is on screen, so the meme reads as a "moment".
const BeatDim: React.FC<{p: Props}> = ({p}) => {
  const t = useCurrentFrame() / FPS;
  const o = Math.max(0, ...p.reactions.filter((r: Props) => r.tier === 'beat').map((r: Props) => {
    const k = t - r.start;
    return k < 0 || k > r.duration ? 0 : Math.min(1, k / 0.15) * Math.min(1, (r.duration - k) / 0.25);
  }));
  return o > 0 ? <AbsoluteFill style={{background: '#000', opacity: 0.38 * o}}/> : null;
};
const Stack: React.FC<{p: Props}> = ({p}) => {
  const f = useCurrentFrame(), t = f / FPS, look = p.preset.look;
  const {GROUP_TOP, MAX_H} = dims(p);
  const L = layout(p, t);
  const punch = look.card_motion === 'punch';
  const k = punch ? 1 : 0.5;
  // Slow handheld drift instead of a locked-off frame.
  const drift = `translate(${(Math.sin(f / 47) * 4 + Math.sin(f / 23) * 2) * k}px, ${Math.cos(f / 53) * 4 * k}px) rotate(${Math.sin(f / 71) * 0.4 * k}deg)`;
  const pop = punch ? 1 + 0.025 * Math.sin(Math.PI * Math.min(1, L.enter)) : 1;
  const frame = {position: 'absolute' as const, left: (W - SHOW_W) / 2, width: SHOW_W, overflow: 'hidden' as const, background: '#101010', border: '1px solid #2a2a2a'};
  const cam = cameraAt(p, f), focus = L.cards.length ? L.cards[L.cards.length - 1] : null;
  const focusY = focus ? focus.top + focus.height / 2 : 960;
  return <div style={{position: 'absolute', inset: 0, transformOrigin: `50% ${focusY}px`,
    transform: `translate(${cam.x}px, ${cam.y}px) scale(${cam.scale}) ${drift}`}}>
    {L.strips.map((s: Props) => <div key={'s' + s.card} style={{...frame, top: s.top, height: s.height, borderRadius: 20, zIndex: 5 - s.depth,
      transform: `scale(${1 - s.depth * 0.035})`, transformOrigin: 'top center', filter: `brightness(${1 - s.depth * 0.22})`, opacity: s.fade}}>
      <Img src={staticFile(`${p.media}/cards-fit/${s.card}.png`)} style={{width: SHOW_W, display: 'block'}}/>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 34, background: 'linear-gradient(rgba(16,16,16,0), #101010 85%)'}}/>
    </div>)}
    <div style={{position: 'absolute', left: 0, right: 0, top: GROUP_TOP - 40, height: MAX_H + 60, overflow: 'hidden', zIndex: 10,
      WebkitMaskImage: 'linear-gradient(transparent 0, #000 40px, #000 100%)'}}>
    <div style={{position: 'absolute', left: 0, right: 0, top: -(GROUP_TOP - 40), height: 1920, opacity: punch ? 1 : L.enter,
      transform: `translateY(${(1 - L.enter) * (punch ? 140 : 10)}px) scale(${pop})`, transformOrigin: `50% ${GROUP_TOP}px`}}>
      {L.cards.map((c: Props, i: number) => <div key={c.card} style={{...frame, top: c.top, height: c.height,
        borderRadius: `${i === 0 ? 22 : 0}px ${i === 0 ? 22 : 0}px ${i === L.cards.length - 1 ? 22 : 0}px ${i === L.cards.length - 1 ? 22 : 0}px`,
        borderTop: i === 0 ? frame.border : 'none', opacity: c.appear, boxShadow: i === 0 ? '0 18px 50px #000b' : undefined}}>
        <Img src={staticFile(`${p.media}/cards-fit/${c.card}.png`)} style={{width: SHOW_W * c.scale, display: 'block',
          transform: `translateY(${(1 - c.appear) * -16}px)`}}/>
      </div>)}
    </div>
    </div>
  </div>;
};

const Captions: React.FC<{p: Props; pages: Props[]}> = ({p, pages}) => {
  const ms = useCurrentFrame() / FPS * 1000, style = p.preset.look.caption_style;
  const page = pages.find((pg) => ms >= pg.startMs && ms < pg.startMs + pg.durationMs + 150);
  // The handwritten closing question replaces captions once the CTA line starts (they say the same thing and would overlap).
  const cta = p.lines.find((l: Props) => l.id === 'cta');
  if (!page || (cta && p.cta && ms >= cta.start * 1000)) return null;
  const pill = style === 'pill';
  return <div style={{position: 'absolute', left: 80, right: 80, top: 1300, textAlign: 'center', fontFamily: 'TikTok Sans',
    fontWeight: pill ? 650 : 500, fontSize: pill ? 68 : 60, lineHeight: 1.3, color: '#fff', textShadow: '0 3px 12px rgba(0,0,0,.75)'}}>
    {page.tokens.map((tk: Props, i: number) => {
      const on = ms >= tk.fromMs && ms < tk.toMs;
      if (!pill) {
        const o = interpolate(ms, [tk.fromMs - 60, tk.fromMs + 140], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
        return <span key={i} style={{opacity: o, whiteSpace: 'pre-wrap'}}>{tk.text}</span>;
      }
      return <span key={i} style={{whiteSpace: 'pre', display: 'inline-block'}}>
        {tk.text.startsWith(' ') ? ' ' : ''}
        <span style={on ? {background: '#fff', color: '#111', borderRadius: 12, padding: '0 10px', textShadow: 'none'}
          : {WebkitTextStroke: '3px rgba(0,0,0,.85)', paintOrder: 'stroke fill'}}>{tk.text.trim()}</span>
      </span>;
    })}
  </div>;
};

// Closing question, written by hand like the hook.
const Cta: React.FC<{p: Props}> = ({p}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left: 90, right: 90, top: 1400, textAlign: 'center', opacity: o, transform: 'rotate(1.5deg)',
    fontFamily: p.preset.look.hook_font === 'Pangolin' ? 'Pangolin' : 'Patrick Hand', fontSize: 54, color: '#fff', textShadow: '0 3px 14px #000c'}}>
    {p.cta} <span style={{borderBottom: `6px solid ${p.preset.look.marker}`}}>👇</span>
  </div>;
};

const Reaction: React.FC<{p: Props; r: Props}> = ({p, r}) => {
  const f = useCurrentFrame();
  const pop = spring({frame: f, fps: FPS, config: {damping: 9, stiffness: 180}});
  const out = interpolate(f, [r.duration * FPS - 8, r.duration * FPS], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const wobble = Math.sin(f / 4) * 3;
  const {GROUP_TOP} = dims(p);
  // Format v2 beat: one big reaction in the voice pause after a punchline, centred over the lower card area.
  if (r.tier === 'beat') {
    // Entrances matched to the emotion: pop (laugh), slam (shock: drops in big and jolts), shake (anger/panic), rise (melt/sad).
    const size = 620, bounce = spring({frame: f, fps: FPS, config: {damping: 7, stiffness: 140}});
    // Sit just under the card group (overlapping only its stats row) so the punchline text stays readable.
    const shown = layout(p, r.start).cards;
    const bottom = shown.length ? Math.max(...shown.map((c: Props) => c.top + c.height)) : 1100;
    let top = Math.min(1150, Math.max(1060, bottom - 50)), tf = `scale(${0.35 + 0.65 * bounce}) rotate(${(1 - bounce) * -14 + wobble * 0.6}deg)`;
    if (r.enter === 'slam') {
      const sc = interpolate(f, [0, 5], [2.6, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}), j = f >= 5 && f < 14 ? Math.sin(f * 3) * 12 * (14 - f) / 9 : 0;
      tf = `translate(${j}px, ${-j}px) scale(${sc}) rotate(${-5 + wobble * 0.4}deg)`;
    } else if (r.enter === 'shake') {
      tf += ` translate(${Math.sin(f * 2.2) * 9}px, ${Math.cos(f * 2.9) * 5}px)`;
    } else if (r.enter === 'rise') {
      const u = spring({frame: f, fps: FPS, config: {damping: 11, stiffness: 120}});
      top += (1 - u) * 900; tf = `rotate(${wobble * 0.6}deg)`;
    }
    const meme = r.label_style === 'meme';
    return <div style={{position: 'absolute', left: (W - size) / 2, top, width: size, zIndex: 70, opacity: out, textAlign: 'center',
      transform: tf, filter: 'drop-shadow(0 24px 40px #000c)'}}>
      {r.kind === 'meme'
        ? <div style={{width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {/* Scale the meme to fill the beat box whatever its native size (dims from the reaction library). */}
            <Img src={staticFile(r.file)} style={{width: (r.dims ? Math.min((size - 64) / r.dims[0], (size - 64) / r.dims[1]) * r.dims[0] : size - 64),
              border: '12px solid #fff', borderRadius: 26, boxShadow: '0 20px 50px #000c'}}/>
          </div>
        : <AnimatedImage src={staticFile(r.file)} width={size} height={size}/>}
      {/* Meme-caption label: white heavy text with a thick black outline (SVG, so the stroke sits behind the fill). */}
      {r.label && meme && <svg width={1000} height={150} style={{position: 'absolute', left: (size - 1000) / 2, top: size - 70, overflow: 'visible',
        transform: `rotate(-4deg) scale(${interpolate(f, [2, 9], [0.4, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})})`}}>
        <text x={500} y={118} textAnchor="middle" fontFamily="TikTok Sans" fontWeight={900} fontSize={124} fill="#fff" stroke="#000"
          strokeWidth={22} strokeLinejoin="round" paintOrder="stroke">{r.label}</text>
      </svg>}
      {r.label && !meme && <div style={{marginTop: -40, display: 'inline-block', background: p.brand?.accent ?? '#FFD43B', color: '#111', fontFamily: 'TikTok Sans',
        fontWeight: 900, fontSize: 88, lineHeight: 1, padding: '14px 34px', borderRadius: 22, border: '6px solid #111'}}>{r.label}</div>}
    </div>;
  }
  // Anchor on the reacted card's top-right corner so the sticker never covers the punchline text.
  const placed = layout(p, (r.start * FPS + f) / FPS).cards.find((c: Props) => c.card === r.card);
  const cardTop = placed ? Math.max(placed.top, GROUP_TOP) : GROUP_TOP;
  // Micro tier: smaller, silent, alternating corners above the card; punch text is a short owned sticker, never a caption.
  if (r.tier === 'micro' && r.kind === 'text') {
    const left = r.side === 'right' ? 640 : 70;
    return <div style={{position: 'absolute', zIndex: 50, left, top: cardTop - 120, opacity: out, transform: `scale(${pop}) rotate(${(r.side === 'right' ? 6 : -6) + wobble * 0.6}deg)`,
      background: p.brand?.accent ?? '#FFD43B', color: '#111', fontFamily: 'TikTok Sans', fontWeight: 900, fontSize: 64, lineHeight: 1,
      padding: '14px 26px', borderRadius: 18, border: '5px solid #111', boxShadow: '0 14px 30px #000a', whiteSpace: 'nowrap'}}>{r.text}</div>;
  }
  if (r.tier === 'micro') {
    const left = r.side === 'right' ? 860 : 50;
    return <div style={{position: 'absolute', zIndex: 50, left, top: cardTop - 125, width: 150, height: 150, opacity: out,
      transform: `scale(${pop}) rotate(${(r.side === 'right' ? 8 : -8) + wobble}deg)`, filter: 'drop-shadow(0 12px 22px #000b)'}}>
      <AnimatedImage src={staticFile(r.file)} width={150} height={150}/>
    </div>;
  }
  if (r.kind === 'emoji') {
    return <div style={{position: 'absolute', zIndex: 50, left: 790, top: cardTop - 150, width: 230, height: 230, opacity: out,
      transform: `scale(${pop}) rotate(${-8 + wobble}deg)`, filter: 'drop-shadow(0 18px 30px #000b)'}}>
      <AnimatedImage src={staticFile(r.file)} width={230} height={230}/>
    </div>;
  }
  return <div style={{position: 'absolute', zIndex: 50, left: 560, top: cardTop - 265, width: 460, padding: 10, background: '#fff', borderRadius: 14, opacity: out,
    transform: `scale(${pop}) rotate(${5 + wobble * 0.5}deg)`, boxShadow: '0 20px 50px #000c'}}>
    <Img src={staticFile(r.file)} style={{width: 440, height: 250, objectFit: 'cover', display: 'block', borderRadius: 6}}/>
  </div>;
};

// Channel outro (brand kit): the logo pops in, then the name, handle and follow line. It is appended by build-timeline when the brand is set.
const MARKS: Record<string, React.FC<{size: number}>> = {A: MarkHong, B: MarkLuot, C: MarkRep, D: MarkDocA, E: MarkDocB};
const Outro: React.FC<{p: Props}> = ({p}) => {
  const f = useCurrentFrame(), b = p.brand;
  const Mark = MARKS[b.id];
  const pop = spring({frame: f, fps: FPS, config: {damping: 10, stiffness: 160}});
  const txt = interpolate(f, [8, 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const veil = interpolate(f, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: `rgba(10,10,12,${0.96 * veil})`, backdropFilter: `blur(${18 * veil}px)`, zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 34}}>
    <div style={{transform: `scale(${pop}) rotate(${(1 - pop) * -12}deg)`}}><Mark size={360}/></div>
    <div style={{opacity: txt, transform: `translateY(${(1 - txt) * 20}px)`, textAlign: 'center', color: '#fff'}}>
      <div style={{fontFamily: b.font, fontWeight: b.weight, fontSize: 104, lineHeight: 1.1}}>
        {b.name.toLowerCase().split(/(cmt)/).map((part: string, k: number) => part === 'cmt'
          ? <span key={k} style={{background: b.accent, color: '#111', borderRadius: 18, padding: '0 14px'}}>cmt</span> : <span key={k}>{part}</span>)}
      </div>
      <div style={{fontFamily: 'TikTok Sans', fontWeight: 650, fontSize: 42, opacity: 0.75, marginTop: 18}}>{b.handle}</div>
      <div style={{fontFamily: 'Patrick Hand', fontSize: 50, marginTop: 30, color: b.accent}}>{b.cta}</div>
    </div>
  </AbsoluteFill>;
};

const Short: React.FC<Props> = (p) => {
  const pages = React.useMemo(() => createTikTokStyleCaptions({captions: p.captions,
    combineTokensWithinMilliseconds: p.preset.look.caption_style === 'pill' ? 1600 : 2200, breakOnSilenceAfterMilliseconds: 300}).pages, [p]);
  const speech = p.lines.map((l: Props) => [l.start, l.end]);
  const accents = p.sfx.filter((s: Props) => s.type !== 'whoosh');
  const cta = p.lines.find((l: Props) => l.id === 'cta');
  const musicVol = (frame: number) => {
    const s = frame / FPS, m = p.preset.music;
    const talking = speech.some(([a, b]: number[]) => s >= a - 0.12 && s < b + 0.12);
    const underSfx = accents.some((a: Props) => s >= a.at - 0.05 && s < a.at + 0.9);
    const fade = interpolate(s, [0, 1.2, p.duration - 1.8, p.duration], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
    return (underSfx ? Math.min(m.under_sfx, m.under_voice) : talking ? m.under_voice : m.between) * fade;
  };
  return <AbsoluteFill style={{color: '#fff'}}>
    <Background p={p}/>
    {p.watermark ? <Watermark p={p}/> : <Identity p={p}/>}
    {p.hook_strip !== false && <Hook p={p}/>}
    <BeatDim p={p}/>
    <Stack p={p}/>
    {p.reactions.map((r: Props, i: number) => <Sequence key={i} from={Math.round(r.start * FPS)} durationInFrames={Math.round(r.duration * FPS)}>
      <Reaction p={p} r={r}/>
    </Sequence>)}
    {/* Word captions are opt-in per channel (brand.json `captions`): viewers called the overlaid text clutter. */}
    {p.show_captions !== false && <Captions p={p} pages={pages}/>}
    {cta && p.cta && <Sequence from={Math.round(cta.start * FPS)}><Cta p={p}/></Sequence>}
    {/* Source credits live in the release package description (creator-launch); an in-video footer is opt-in only. */}
    {p.footer && <div style={{position: 'absolute', left: 60, right: 60, bottom: 70, fontFamily: 'TikTok Sans', fontSize: 22, color: '#fff', opacity: 0.45, textAlign: 'center'}}>
      Nguồn: Threads @{p.source_handle} & bình luận
    </div>}
    {p.brand && <Sequence from={p.frames - Math.round(p.brand.outro_s * FPS)}><Outro p={p}/></Sequence>}
    <Grain amount={p.preset.look.grain}/>
    {/* `music: false` renders voice + SFX only, so the user can add a Shorts sound in the YouTube app. */}
    {p.music !== false && <Audio src={staticFile(p.preset.music.file)} volume={musicVol}/>}
    {p.lines.map((l: Props) => <Sequence key={l.id} from={Math.round(l.start * FPS)} durationInFrames={Math.ceil((l.end - l.start) * FPS) + 2}>
      <Audio src={staticFile(l.file)} volume={(fr: number) => (l.mutes ?? []).some(([a, b]: number[]) => l.start + fr / FPS >= a && l.start + fr / FPS < b) ? 0 : 1}/>
    </Sequence>)}
    {p.sfx.map((s: Props, i: number) => <Sequence key={i} from={Math.max(0, Math.round(s.at * FPS))} durationInFrames={90}>
      <Audio src={staticFile(s.file)} volume={({whoosh: 0.3, pop: 0.5, laugh: 0.45, ting: 0.55, boing: 0.5, scratch: 0.5, bleep: 0.45} as Record<string, number>)[s.type] ?? 0.5}/>
    </Sequence>)}
  </AbsoluteFill>;
};

registerRoot(() => <Composition id="Episode" component={Short} fps={FPS} width={W} height={1920} durationInFrames={300}
  defaultProps={{} as Props} calculateMetadata={({props}) => ({durationInFrames: (props as Props).frames})}/>);
