// Build Remotion props for an episode:
//  - lay voice clips end to end;
//  - align words with whisper.cpp (cached per clip);
//  - place the mood preset's SFX and reaction cues on the beats marked in lines.json.
// Usage: node build-timeline.mjs <episode_dir>
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const here = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const episode = path.resolve(process.argv[2]);
const spec = JSON.parse(fs.readFileSync(path.join(episode, 'lines.json'), 'utf8'));
const moods = JSON.parse(fs.readFileSync(path.join(here, 'mood-presets.json'), 'utf8'));
const base = moods.presets[spec.mood];
if (!base) throw new Error('Unknown mood ' + spec.mood);
// Episode-level look overrides (e.g. a topic-fit background); background length is probed, not hand-entered.
const preset = {...base, look: {...base.look, ...(spec.look ?? {})}};
const ffprobe = path.join(here, 'node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe');
const probe = (f) => Math.floor(parseFloat(execFileSync(ffprobe, ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0',
  path.join(here, '../../media', f)]).toString()) * 10) / 10;
preset.look.bg_seconds = probe(preset.look.background);
// Format v2 (tasks/user-decision-format-v2.md): a playlist of bright clips cut every few seconds.
if (preset.look.backgrounds) preset.look.backgrounds = preset.look.backgrounds.map((f) => ({file: f, seconds: probe(f)}));
const V2 = spec.format === 'v2';
// Music pool (user decision 2026-10-19): fast comedy rotates tracks 1-3 by episode name, slow comedy uses track 4.
const pool = preset.music_pool;
let musicCredit = null;
if (pool) {
  const list = spec.pace === 'slow' ? pool.slow : pool.fast;
  const h = [...path.basename(episode)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  preset.music = {...preset.music, file: spec.music_track ?? list[h % list.length]};
  musicCredit = pool.credit;
}
const mediaRoot = path.join(here, '../../media');
const media = path.join(mediaRoot, spec.media);
const manifest = JSON.parse(fs.readFileSync(path.join(media, 'voice/audio-manifest.json'), 'utf8'));
const whisperDir = path.join(here, '../tools-whisper');
const ffmpeg = path.join(here, 'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe');

// whisper-cli on Windows cannot open non-ASCII paths, so align an ASCII temp copy.
const align = (clip, text) => {
  const cache = path.join(media, 'align', clip.file.replace(/\.wav$/, '.json'));
  if (!fs.existsSync(cache)) {
    fs.mkdirSync(path.dirname(cache), {recursive: true});
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'p1-align-'));
    fs.copyFileSync(path.join(media, 'voice', clip.file), path.join(tmp, 'clip.wav'));
    execFileSync('node', ['align.mjs', path.join(tmp, 'clip.wav'), text, path.join(tmp, 'clip.json'), ffmpeg], {cwd: whisperDir, stdio: 'ignore'});
    fs.copyFileSync(path.join(tmp, 'clip.json'), cache);
    fs.rmSync(tmp, {recursive: true, force: true});
  }
  return JSON.parse(fs.readFileSync(cache, 'utf8'));
};

// Last voiced syllable of a clip from its energy envelope (20 ms bins, 12% of peak). Whisper often stretches a
// sentence-final word to the clip end, so a bleep on the last word uses this instead.
const lastSyllable = (file) => {
  const b = fs.readFileSync(file);
  let p = 12, ch = 1, rate = 48000, data = null;
  while (p < b.length - 8) {
    const id = b.toString('ascii', p, p + 4), n = b.readUInt32LE(p + 4);
    if (id === 'fmt ') { ch = b.readUInt16LE(p + 10); rate = b.readUInt32LE(p + 12); }
    if (id === 'data') { data = b.subarray(p + 8, p + 8 + n); break; }
    p += 8 + n + (n & 1);
  }
  const step = Math.round(rate * 0.02) * ch * 2, env = [];
  for (let i = 0; i + step <= data.length; i += step) {
    let m = 0;
    for (let j = i; j < i + step; j += 2) m = Math.max(m, Math.abs(data.readInt16LE(j)));
    env.push(m);
  }
  const peak = Math.max(...env), on = env.map((e) => e > peak * 0.12);
  const end = on.lastIndexOf(true);
  let st = end;
  while (st > 0 && on[st - 1]) st--;
  return [st * 0.02, (end + 1) * 0.02];
};

const slow = preset.look.card_motion === 'fade';
const GAP = slow ? 0.55 : 0.28, LEAD = V2 ? 0.1 : 0.5, TAIL = V2 ? 0.35 : 2.2, BEAT_HOLD = 0.85;
let t = LEAD;
let lastBeatEnd = 0;
const lines = [], captions = [], sfx = [], reactions = [], camera = [];
const addSfx = (type, at) => {
  if (!preset.sfx_allowed.includes(type)) throw new Error(`SFX ${type} not allowed in mood ${spec.mood}`);
  sfx.push({type, file: `${moods.sfx_dir}/${type}.mp3`, at: +Math.max(0, at).toFixed(3)});
};
for (const line of spec.lines) {
  const clip = manifest.samples.find((s) => s.id === line.id && s.text === line.text);
  if (!clip) throw new Error('No voice clip for ' + line.id + '; run generate-audio.py');
  t += line.pause_before ?? 0;
  const start = t, end = t + clip.duration;
  const words = align(clip, line.text).captions;
  for (const c of words) {
    captions.push({...c, text: ' ' + c.text.trim(), startMs: Math.round(start * 1000 + c.startMs),
      endMs: Math.round(start * 1000 + Math.min(c.endMs, clip.duration * 1000))});
  }
  for (const cue of line.beat?.sfx ?? []) addSfx(cue.type, cue.at === 'pre' ? start - 0.4 : end - 0.08);
  // Two meme tiers (research/meme-rights-and-repos-v1.md §4.3): a "hit" sticker at the end of a punchline line
  // (pop SFX + hold), and silent "micro" reactions or punch-text stickers placed inside a line (no hold).
  const pushReaction = (r, tier, at, extra = {}) => {
    if (!preset.reactions.enabled) throw new Error('Reactions disabled for mood ' + spec.mood);
    const asset = r ? moods.reaction_library[r] : {kind: 'text', file: null, commercial_ok: true};
    if (!asset) throw new Error('Unknown reaction ' + r);
    if (preset.reactions.kinds && !preset.reactions.kinds.includes(asset.kind)) throw new Error(`${asset.kind} reaction not allowed in mood ${spec.mood}`);
    reactions.push({id: r ?? 'text', card: line.card, kind: asset.kind, file: asset.file, ...(asset.dims ? {dims: asset.dims} : {}), commercial_ok: asset.commercial_ok, tier, line: line.id,
      start: +at.toFixed(3), duration: tier === 'hit' ? preset.reactions.show_s : preset.reactions.micro_show_s ?? 1.1, ...extra});
  };
  const wordAt = (w) => {
    const i = words.findIndex((x) => x.text.trim().toLowerCase().replace(/[^\p{L}\p{N}]/gu, '').startsWith(w.toLowerCase()));
    if (i < 0) throw new Error(`Micro anchor "${w}" not found in line ${line.id}`);
    return start + words[i].startMs / 1000;
  };
  // Censor bleep (meme style): mute the voice over each listed word and play a 1 kHz bleep; the card keeps the text.
  const mutes = [];
  for (const w of line.bleep ?? []) {
    const key = w.toLowerCase().normalize('NFC');
    const i = words.findIndex((x) => x.text.trim().toLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]/gu, '') === key);
    if (i < 0) throw new Error(`Bleep word "${w}" not found in line ${line.id}`);
    const [s0, s1] = i === words.length - 1 ? lastSyllable(path.join(media, 'voice', clip.file))
      : [words[i].startMs / 1000 - 0.03, Math.min(words[i].endMs / 1000, clip.duration) + 0.03];
    const a = start + s0 - 0.05, b = start + s1 + 0.05;
    mutes.push([+a.toFixed(3), +b.toFixed(3)]);
    addSfx('bleep', a);
  }
  for (const m of line.beat?.micro ?? []) {
    const at = m.at_word ? wordAt(m.at_word) : start + (m.at ?? 0.5) * clip.duration;
    pushReaction(m.reaction ?? null, 'micro', at, m.text ? {text: m.text} : {});
    if (m.sfx) addSfx(m.sfx, at);
  }
  // Camera-only moves (no sticker): a slow detective push-in over a line, or a punch-in/shake on its last word.
  for (const fx of [line.fx].flat().filter(Boolean)) {
    const at = fx.type === 'push' ? start : end - (fx.lead ?? 0.25);
    camera.push({type: fx.type, start: +at.toFixed(3), duration: fx.type === 'push' ? clip.duration : (fx.hold ?? 1.0), strength: fx.strength ?? ({push: 0.07, zoom: 0.12}[fx.type] ?? 1)});
    if (fx.sfx) addSfx(fx.sfx, at);
  }
  const r = line.beat?.reaction;
  if (r) {
    pushReaction(r, 'hit', end - 0.15);
    addSfx('pop', end - 0.15);
  }
  // Format v2 "beat": one large reaction in a voice pause after a punchline, with a laugh/rimshot (1–3 per video).
  const big = line.beat?.big;
  if (big) {
    const pause = big.pause ?? 2.0;
    pushReaction(big.reaction, 'beat', end + 0.05, {duration: pause, label: big.label ?? null, enter: big.enter ?? 'pop', label_style: big.label_style ?? 'box'});
    // Meme edit on the beat (user feedback 2026-10-18 'ghép meme hay hơn'): a camera punch-in or shake on the card group.
    if (big.fx) camera.push({type: big.fx, start: +(end + 0.02).toFixed(3), duration: pause, strength: big.fx_strength ?? (big.fx === 'zoom' ? 0.14 : 1)});
    addSfx(big.sfx ?? 'laugh', end + 0.05);
    lastBeatEnd = end + 0.05 + pause;
  }
  lines.push({id: line.id, card: line.card, kind: line.kind, text: line.text, file: `${spec.media}/voice/${clip.file}`,
    ...(clip.speaker ? {speaker: clip.speaker, voice: clip.voice} : {}), ...(mutes.length ? {mutes} : {}),
    start: +start.toFixed(3), end: +end.toFixed(3)});
  // Hold on a punchline so the reaction lands before the next card arrives.
  // A punch-in without a sticker still holds long enough to read.
  const fxHold = [line.fx].flat().filter((x) => x && x.type !== 'push').reduce((a, x) => Math.max(a, (x.hold ?? 1.0) - (x.lead ?? 0.25)), 0);
  t = end + GAP + (r ? BEAT_HOLD : 0) + (big ? (big.pause ?? 2.0) : fxHold);
}
// Meme guardrails: density cap, minimum gaps (any / between hits), at most text_max punch-text stickers,
// a clean hook (nothing in the first 1.2s), nothing on the CTA line, and no asset more than twice or twice in a row.
reactions.sort((a, b) => a.start - b.start);
{
  const R = preset.reactions ?? {};
  if (reactions.length > (R.max ?? 0)) throw new Error(`Too many reactions (${reactions.length} > ${R.max}) for mood ${spec.mood}`);
  reactions.forEach((x, i) => {
    if (x.start < 1.2) throw new Error(`Reaction ${x.id} at ${x.start}s is inside the hook`);
    if (x.line === 'cta') throw new Error('No reaction on the CTA line');
    const prev = reactions[i - 1];
    if (prev && x.start - prev.start < R.min_gap_s) throw new Error(`Reactions too close: ${prev.id}@${prev.start} → ${x.id}@${x.start}`);
    if (prev && x.kind !== 'text' && prev.id === x.id) throw new Error('Same reaction twice in a row: ' + x.id);
  });
  const beats = reactions.filter((x) => x.tier === 'beat');
  if (beats.length > (R.beat_max ?? 0)) throw new Error(`Too many beat reactions (${beats.length} > ${R.beat_max ?? 0})`);
  const hits = reactions.filter((x) => x.tier === 'hit');
  hits.forEach((x, i) => { if (i && x.start - hits[i - 1].start < (R.hit_gap_s ?? R.min_gap_s)) throw new Error('Hit reactions too close: ' + x.id); });
  if (reactions.filter((x) => x.kind === 'text').length > (R.text_max ?? 0)) throw new Error('Too many punch-text stickers');
  const uses = {};
  for (const x of reactions) if (x.kind !== 'text' && (uses[x.id] = (uses[x.id] ?? 0) + 1) > 2) throw new Error('Reaction used more than twice: ' + x.id);
  // Micro stickers alternate sides so they never stack on the hit corner.
  let side = 0;
  for (const x of reactions) if (x.tier === 'micro') x.side = side++ % 2 ? 'right' : 'left';
}
// Brand outro (brand.json, set once the user picks a logo) extends the tail.
const brandFile = path.join(here, 'brand.json');
const brand = fs.existsSync(brandFile) ? JSON.parse(fs.readFileSync(brandFile, 'utf8')) : null;
const outro = brand && spec.outro !== false && !V2;   // v2 ends on the punchline and loops; no logo end card
const duration = t - GAP + TAIL + (outro ? brand.outro_s : 0);
const cards = [...new Set(lines.map((l) => l.card))].map((card) => ({card, start: lines.find((l) => l.card === card).start - 0.15,
  end: Math.max(...lines.filter((l) => l.card === card).map((l) => l.end))}));
cards[0].start = 0;
if (preset.card_whoosh) for (const c of cards.slice(1)) addSfx('whoosh', c.start - 0.05);
sfx.sort((a, b) => a.at - b.at);
// Reply chains: lines.json `chains` lists [parent, child...] card groups; any card not listed is its own group.
const listed = new Set((spec.chains ?? []).flat());
const groups = [...(spec.chains ?? []), ...cards.filter((c) => !listed.has(c.card)).map((c) => [c.card])]
  .sort((a, b) => cards.find((c) => c.card === a[0]).start - cards.find((c) => c.card === b[0]).start);
for (const g of groups) for (const c of g) if (!cards.find((x) => x.card === c)) throw new Error('Chain card has no line: ' + c);
// Rights protocol v1 (research/rights-protocol-v1.md): at most 3 verbatim quotes of 30 words or fewer,
// verbatim speech at most 35% of voice time, original narration at least 50%.
const words = (x) => x.text.split(/\s+/).filter(Boolean).length;
const quotes = lines.filter((l) => l.kind === 'read');
const voiceTime = (ls) => ls.reduce((a, l) => a + l.end - l.start, 0);
const rights = {quotes: quotes.length, max_quote_words: Math.max(0, ...quotes.map(words)),
  verbatim_time_share: +(voiceTime(quotes) / voiceTime(lines)).toFixed(2), original_time_share: +(1 - voiceTime(quotes) / voiceTime(lines)).toFixed(2)};
// Format v2 "read-first" (user decision, tasks/user-decision-format-v2.md): the card text is read, with short asides.
// The user accepted the higher reused-content risk; verbatim may reach 75% of voice time.
rights.protocol = V2 ? 'v2-read-first' : 'v1';
rights.pass = V2 ? rights.max_quote_words <= 60 && rights.verbatim_time_share <= 0.75 && rights.original_time_share >= 0.25
  : rights.quotes <= 3 && rights.max_quote_words <= 30 && rights.verbatim_time_share <= 0.35 && rights.original_time_share >= 0.5;
// The user may lift the verbatim cap for an episode (clone videos, tasks/user-decision-clone-v2.md): record it, don't fail.
if (V2 && spec.verbatim_accepted) { rights.protocol = 'v2-user-accepted-verbatim'; rights.accepted_by = spec.verbatim_accepted; rights.pass = true; }
const sizes = JSON.parse(fs.readFileSync(path.join(media, 'cards-fit/sizes.json'), 'utf8'));
const props = {title_card: spec.title_card ?? null, music: spec.music !== false, music_file: preset.music.file, music_credit: musicCredit, footer: spec.footer === true, show_captions: spec.captions ?? brand?.captions ?? true, brand: outro ? brand : null, format: V2 ? 'v2' : 'v1', watermark: V2 ? (brand?.name ?? null) : null,
  hook_strip: V2 ? false : spec.hook_strip !== false, strips: V2 ? 0 : 2, group_top: V2 ? 360 : 560, max_h: V2 ? 1180 : 720, episode: path.basename(episode), mood: spec.mood, preset, media: spec.media, hook: spec.hook, cta: spec.cta,
  handle: spec.channel_handle ?? brand?.handle ?? '@hong.cmt (tên tạm)', source_handle: spec.source_handle, sizes, fps: 30,
  duration: +duration.toFixed(3), frames: Math.ceil(duration * 30), lines, cards, groups, captions, sfx, reactions, camera,
  rights, caption_timing: 'whisper.cpp 1.7.6 small (vi) token timestamps per clip, mapped onto exact script words',
  voice: {name: manifest.voice, temperature: manifest.temperature, tempo: manifest.tempo ?? 1, ...(manifest.cast ? {cast: manifest.cast, level: manifest.level} : {})}};
fs.writeFileSync(path.join(episode, 'props.json'), JSON.stringify(props, null, 1));
console.log(JSON.stringify({rights, episode: props.episode, mood: props.mood, voice: manifest.voice, duration: props.duration,
  cards: cards.length, groups: groups.map((g) => g.length).join('+'), words: captions.length, sfx: sfx.length, reactions: reactions.map((r) => r.id + '@' + r.start)}));
