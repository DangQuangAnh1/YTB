import {defineConfig} from 'vite';
import mcModule from '@motion-canvas/vite-plugin';
import ffModule from '@motion-canvas/ffmpeg';
const mc=(mcModule as any).default||mcModule;
const ff=(ffModule as any).default||ffModule;
export default defineConfig({plugins:[mc({project:'./src/project.ts'}),ff()],server:{host:'127.0.0.1'}});
