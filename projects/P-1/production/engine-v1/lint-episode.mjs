// Pre-flight lint for an episode, run BEFORE generate-audio.py (2026-10-19 speed-up). It catches the problems
// that used to cost a re-voicing round:
//   - foreign words that VieNeu and whisper mangle ("Sherlock Holmes" was heard as "Sao lúc hôm"),
//   - the v2 rights balance (verbatim <= 0.75 of voice time, longest quote <= 60 words), estimated from syllables,
//   - big-beat count and gaps, length target, card files, and the cast (unknown voices, avoid list, neighbours
//     that sound alike).
// Usage: node lint-episode.mjs ../episodes/<id>      exit 1 on errors; warnings print but pass.
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
const episode = path.resolve(process.argv[2]);
const spec = JSON.parse(fs.readFileSync(path.join(episode, 'lines.json'), 'utf8'));
const moods = JSON.parse(fs.readFileSync(path.join(here, 'mood-presets.json'), 'utf8'));
const preset = moods.presets[spec.mood];
const V2 = spec.format === 'v2';
const errors = [], warns = [];

// VieNeu preset genders (from list_preset_voices) and measured speaking rates in syllables/s at tempo 1.1.
const GENDER = {'Adam bựa': 'M', 'Trúc Ly': 'F', 'Thiện Minh': 'M', 'Mai Anh': 'F', 'Hải Đăng': 'M', 'Thùy Dung': 'F', 'Thiền Tâm Đức': 'M',
  'Ngọc Huyền': 'F', 'Quang Sơn': 'M', 'Ngọc Trân': 'F', 'Minh Đức': 'M', 'Phạm Tuyên': 'M', 'Thái Sơn': 'M', 'Xuân Vĩnh': 'M', 'Thanh Bình': 'M',
  'Ngọc Linh': 'F', 'Đoan Trang': 'F', 'Thục Đoan': 'F', 'Minh Triết': 'M', 'Mỹ Duyên': 'F', 'Quỳnh Anh': 'F', 'Đức Trí': 'M', 'Kim Thanh': 'F',
  'Adam': 'M', 'Quốc Tuấn': 'M'};
// Clip length ≈ 0.3s of edge silence + syllables / rate (fitted on release-08..11 clips; short lines like "Dạ." are mostly silence).
const RATE = {'Adam bựa': 5.0, 'Trúc Ly': 5.6, 'Ngọc Huyền': 5.5, 'Thiện Minh': 5.4, 'Mai Anh': 4.4, 'Thiền Tâm Đức': 4.6}, EDGE = 0.3;
const pool = preset.cast_pool ?? {};
const cast = spec.cast ?? {};
const speakerOf = (l) => l.speaker ?? (l.kind === 'bridge' ? 'narrator' : l.card?.includes('-') ? l.card.split('-').slice(1).join('-') : 'narrator');
const voiceOf = (l) => cast[speakerOf(l)] ?? cast.narrator ?? preset.tts.voice;
const words = (s) => s.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);

// Vietnamese syllables end in a vowel or c/ch/m/n/ng/nh/p/t and start with a single consonant or one of the
// clusters ch/gh/gi/kh/ng/ngh/nh/ph/qu/th/tr. Anything else is probably a foreign word: spell it phonetically.
const plain = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
const foreign = (w) => {
  const p = plain(w);
  if (/\d/.test(p) || p.length < 2) return false;
  if (/[fjwz]/.test(p)) return true;
  if (/[bdghklqrsvx]$/.test(p) && !/(ch|ng|nh)$/.test(p)) return true;
  const lead = p.match(/^[^aeiouy]+/)?.[0] ?? '';
  return lead.length > 1 && !['ch', 'gh', 'gi', 'kh', 'ng', 'ngh', 'nh', 'ph', 'qu', 'th', 'tr'].includes(lead);
};
const ALLOW = new Set(['youtube', 'threads', 'tiktok', 'facebook', 'iphone', 'ok', 'rep', 'cmt', 'meme', 'idol', 'crush', 'tag', 'like', 'share', 'stalk', 'clone']);

let readT = 0, allT = 0, t = 0;
const beats = [];
spec.lines.forEach((l, i) => {
  const ws = words(l.text);
  const voice = voiceOf(l);
  if (!GENDER[voice]) errors.push(`${l.id}: unknown voice "${voice}"`);
  if (pool.avoid?.[voice]) warns.push(`${l.id}: voice ${voice} is on the avoid list (${pool.avoid[voice]})`);
  const odd = ws.filter((w) => foreign(w) && !ALLOW.has(plain(w)));
  if (odd.length) warns.push(`${l.id}: foreign-looking words ${JSON.stringify(odd)}: spell them phonetically in the voice text (the card stays as is)`);
  if (l.kind === 'read' && ws.length > 60 && !spec.verbatim_accepted) errors.push(`${l.id}: quote of ${ws.length} words (max 60)`);
  const dur = EDGE + ws.length / (RATE[voice] ?? 5.0);
  if (ws.length <= 1) warns.push(`${l.id}: one-word line "${l.text}" — TTS and ASR are unreliable on single syllables; listen to it`);
  allT += dur; if (l.kind === 'read') readT += dur;
  t += dur;
  if (l.beat?.big) { beats.push({id: l.id, at: t}); t += l.beat.big.pause ?? 2.0; }
  t += 0.28;
  const prev = spec.lines[i - 1];
  if (prev && speakerOf(prev) !== speakerOf(l)) {
    const pv = voiceOf(prev);
    if (pv === voice) warns.push(`${prev.id}→${l.id}: two different speakers share ${voice}`);
    else if ([pv, voice].includes('Adam bựa') && Object.keys(pool.avoid ?? {}).some((v) => [pv, voice].includes(v) && /Adam/.test(pool.avoid[v])))
      warns.push(`${prev.id}→${l.id}: ${pv} next to ${voice} sound alike`);
  }
});
const share = readT / Math.max(allT, 0.01);
if (V2 && !spec.verbatim_accepted) {
  if (share > 0.75) errors.push(`estimated verbatim share ${share.toFixed(2)} > 0.75: add or lengthen a bridge, or trim a read`);
  else if (share > 0.72) warns.push(`estimated verbatim share ${share.toFixed(2)} is close to the 0.75 limit (the estimate is ±0.02)`);
}
const R = preset.reactions ?? {};
if (beats.length > (R.beat_max ?? 3)) errors.push(`${beats.length} big beats > ${R.beat_max}`);
beats.forEach((b, i) => { if (i && b.at - beats[i - 1].at < (R.min_gap_s ?? 5)) errors.push(`beats ${beats[i - 1].id} and ${b.id} are under ${R.min_gap_s}s apart (est.)`); });
for (const l of spec.lines) for (const k of ['reaction']) {
  const r = l.beat?.big?.[k];
  if (r && !moods.reaction_library[r]) errors.push(`${l.id}: unknown reaction ${r}`);
}
if (t < 20 || t > 50) warns.push(`estimated length ${t.toFixed(1)}s (target 25–45s)`);
const fit = path.join(here, '../../media', spec.media, 'cards-fit');
for (const card of new Set(spec.lines.map((l) => l.card))) if (!fs.existsSync(path.join(fit, card + '.png'))) warns.push(`card ${card} not captured yet`);

console.log(JSON.stringify({episode: path.basename(episode), est_seconds: +t.toFixed(1), est_verbatim_share: +share.toFixed(2), beats: beats.length,
  voices: [...new Set(spec.lines.map(voiceOf))], errors, warnings: warns}, null, 1));
process.exit(errors.length ? 1 : 0);
