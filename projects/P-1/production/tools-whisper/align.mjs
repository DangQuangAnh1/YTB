// Word timings for a known-text TTS clip: whisper.cpp token timestamps, then map onto script words.
import path from 'node:path';
import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {transcribe, toCaptions} from '@remotion/install-whisper-cpp';
const [,, input, scriptText, outJson, ffmpeg] = process.argv;
const tmp = outJson.replace(/\.json$/, '.16k.wav');
execFileSync(ffmpeg, ['-y', '-v', 'error', '-i', input, '-ar', '16000', '-ac', '1', tmp]);
const out = await transcribe({inputPath: tmp, whisperPath: path.join(process.cwd(), 'whisper.cpp'),
  whisperCppVersion: '1.7.6', model: 'small', tokenLevelTimestamps: true, language: 'vi', splitOnWord: true});
fs.unlinkSync(tmp);
const {captions} = toCaptions({whisperCppOutput: out});
const heard = captions.map(c => ({w: c.text.trim(), s: c.startMs, e: c.endMs})).filter(c => c.w);
// Script words keep exact source spelling; timing comes from heard words (index-proportional mapping).
const words = scriptText.split(/\s+/).filter(Boolean);
const mapped = words.map((w, i) => {
  const a = heard[Math.floor(i * heard.length / words.length)], b = heard[Math.min(heard.length - 1, Math.floor((i + 1) * heard.length / words.length) - 1)] ?? a;
  return {text: (i ? ' ' : '') + w, startMs: a.s, endMs: Math.max(b.e, a.s + 60), timestampMs: null, confidence: null};
});
fs.writeFileSync(outJson, JSON.stringify({heard, captions: mapped, method: 'whisper.cpp 1.7.6 small vi token timestamps, mapped to script words'}, null, 1));
console.log(JSON.stringify({heard: heard.map(h => `${h.w}@${h.s}-${h.e}`).join(' '), n_script: words.length, n_heard: heard.length}));
