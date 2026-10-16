import {Composition} from 'remotion';
import {ThreadsShort,PostScene,CommentScene} from './Composition';
export const RemotionRoot=()=> <>
 <Composition id="ThreadsShort" component={ThreadsShort} durationInFrames={540} fps={30} width={1080} height={1920}/>
 <Composition id="PostScene" component={PostScene} durationInFrames={210} fps={30} width={1080} height={1920}/>
 <Composition id="CommentScene" component={CommentScene} durationInFrames={330} fps={30} width={1080} height={1920}/>
</>;
