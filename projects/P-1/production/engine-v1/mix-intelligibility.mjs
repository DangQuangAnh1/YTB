// Audio proxy check: transcribe the final mixed render with whisper.cpp and compare with the script.
// High word error over music/SFX suggests voice is masked or mispronounced. This is not a listening review.
// Usage: node mix-intelligibility.mjs <draft.mp4> <props.json> <out.json>
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {transcribe, toCaptions} from '../tools-whisper/node_modules/@remotion/install-whisper-cpp/dist/index.js';
const here = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Z]:)/, '$1');
const [,, video, propsFile, outFile] = process.argv;
const props = JSON.parse(fs.readFileSync(propsFile, 'utf8'));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'p1-mix-'));
const wav = path.join(tmp, 'mix.wav');
execFileSync(path.join(here, 'node_modules/@remotion/compositor-win32-x64-msvc/ffmpeg.exe'), ['-y', '-v', 'error', '-i', video, '-ar', '16000', '-ac', '1', wav]);
const out = await transcribe({inputPath: wav, whisperPath: path.join(here, '../tools-whisper/whisper.cpp'), whisperCppVersion: '1.7.6',
  model: 'small', tokenLevelTimestamps: true, language: 'vi', splitOnWord: true});
fs.rmSync(tmp, {recursive: true, force: true});
const heard = toCaptions({whisperCppOutput: out}).captions.map((c) => ({w: c.text.trim(), s: c.startMs})).filter((c) => c.w);
const norm = (s) => s.normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').split(/\s+/).filter(Boolean);
const wer = (r, h) => {
  let d = Array.from({length: h.length + 1}, (_, j) => j);
  for (let i = 1; i <= r.length; i++) {
    const n = [i];
    for (let j = 1; j <= h.length; j++) n[j] = Math.min(d[j] + 1, n[j - 1] + 1, d[j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1));
    d = n;
  }
  return d[h.length] / r.length;
};
const perLine = props.lines.map((l) => {
  const words = heard.filter((x) => x.s >= l.start * 1000 - 150 && x.s < l.end * 1000 + 150).map((x) => x.w).join(' ');
  return {id: l.id, wer: +wer(norm(l.text), norm(words)).toFixed(3), script: l.text, heard: words};
});
const overall = +wer(norm(props.lines.map((l) => l.text).join(' ')), norm(heard.map((x) => x.w).join(' '))).toFixed(3);
fs.writeFileSync(outFile, JSON.stringify({video: path.basename(path.dirname(video)), overall_wer: overall, per_line: perLine,
  method: 'whisper.cpp 1.7.6 small vi on final mix; proxy only, not human listening'}, null, 1));
console.log(JSON.stringify({overall_wer: overall, worst: perLine.sort((a, b) => b.wer - a.wer).slice(0, 4).map((x) => `${x.id}:${x.wer} "${x.heard}"`)}));
