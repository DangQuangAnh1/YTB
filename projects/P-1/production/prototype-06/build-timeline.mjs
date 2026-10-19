// Lay voice clips end to end, attach whisper.cpp word timings (offset to global time), and place
// mood-preset SFX/reaction cues on the beats marked in lines.json.
import fs from 'node:fs';
import path from 'node:path';
const here = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const media = path.join(here, '../../media/prototype-06');
const spec = JSON.parse(fs.readFileSync(path.join(here, 'lines.json'), 'utf8'));
const manifest = JSON.parse(fs.readFileSync(path.join(media, 'voice/audio-manifest.json'), 'utf8'));
const moods = JSON.parse(fs.readFileSync(path.join(here, 'mood-presets.json'), 'utf8'));
const preset = moods.presets[spec.mood];
if (!preset) throw new Error('Unknown mood ' + spec.mood);
const GAP = 0.28, LEAD = 0.35, TAIL = 1.6, BEAT_HOLD = 0.85;
let t = LEAD;
const lines = [], captions = [], sfx = [], reactions = [];
const addSfx = (type, at) => {
  if (!preset.sfx_allowed.includes(type)) throw new Error(`SFX ${type} not allowed in mood ${spec.mood}`);
  sfx.push({type, at: +Math.max(0, at).toFixed(3)});
};
for (const line of spec.lines) {
  const clip = manifest.samples.find((s) => s.id === line.id);
  t += line.pause_before ?? 0;
  const start = t, end = t + clip.duration;
  const align = JSON.parse(fs.readFileSync(path.join(media, 'align', line.id + '.json'), 'utf8'));
  for (const c of align.captions) {
    captions.push({...c, startMs: Math.round(start * 1000 + c.startMs), endMs: Math.round(start * 1000 + Math.min(c.endMs, clip.duration * 1000))});
  }
  // Break caption pages at line boundaries: first word of each line starts with a space-free token.
  if (captions.length) captions[captions.length - align.captions.length].text = captions[captions.length - align.captions.length].text.trimStart();
  for (const cue of line.beat?.sfx ?? []) addSfx(cue.type, cue.at === 'pre' ? start - 0.4 : end - 0.08);
  const r = line.beat?.reaction;
  if (r) {
    const asset = moods.reaction_library[r], last = reactions.at(-1);
    if (!preset.reactions.enabled) throw new Error('Reactions disabled for mood ' + spec.mood);
    if (preset.reactions.kinds && !preset.reactions.kinds.includes(asset.kind)) throw new Error(`${asset.kind} reaction not allowed in mood ${spec.mood}`);
    if (reactions.length >= preset.reactions.max) throw new Error('Too many reactions for mood ' + spec.mood);
    if (last && end - 0.15 - last.start < preset.reactions.min_gap_s) throw new Error('Reactions too close: ' + r);
    reactions.push({id: r, card: line.card, kind: asset.kind, file: asset.file, commercial_ok: asset.commercial_ok, start: +(end - 0.15).toFixed(3), duration: preset.reactions.show_s});
    addSfx('pop', end - 0.15);
  }
  lines.push({id: line.id, card: line.card, kind: line.kind, text: line.text, file: 'voice/' + clip.file, start: +start.toFixed(3), end: +end.toFixed(3)});
  // Hold on a punchline so the reaction lands before the next card arrives.
  t = end + GAP + (r ? BEAT_HOLD : 0);
}
const duration = t - GAP + TAIL;
const cards = [...new Set(lines.map((l) => l.card))].map((card) => ({card, start: lines.find((l) => l.card === card).start - 0.15}));
cards[0].start = 0;
if (preset.card_whoosh) for (const c of cards.slice(1)) addSfx('whoosh', c.start - 0.05);
sfx.sort((a, b) => a.at - b.at);
const out = {mood: spec.mood, preset, fps: 30, duration: +duration.toFixed(3), frames: Math.ceil(duration * 30), lines, cards, captions, sfx, reactions,
  caption_timing: 'whisper.cpp 1.7.6 small (vi) token timestamps per clip, mapped onto exact script words'};
fs.writeFileSync(path.join(here, 'src/timeline.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify({duration: out.duration, frames: out.frames, cards: cards.length, words: captions.length, sfx: sfx.length, reactions: reactions.map((r) => r.id + '@' + r.start)}));
