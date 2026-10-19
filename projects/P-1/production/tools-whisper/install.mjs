// Installs whisper.cpp (GitHub release binary) + multilingual "small" model via Remotion's helper.
import path from 'node:path';
import {installWhisperCpp, downloadWhisperModel} from '@remotion/install-whisper-cpp';
const to = path.join(process.cwd(), 'whisper.cpp');
const version = process.argv[2] ?? '1.7.6';
await installWhisperCpp({to, version, printOutput: true});
await downloadWhisperModel({folder: to, model: 'small', printOutput: true});
console.log(JSON.stringify({to, version, model: 'small'}));
