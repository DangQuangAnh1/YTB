import React from 'react';
import {AbsoluteFill,Composition,Img,registerRoot,staticFile} from 'remotion';
import {CharacterHead,CharacterBody,CharacterScarf,CharacterHairBack} from './Cast';
const Preview:React.FC<{name:string}>=({name})=><AbsoluteFill><Img src={staticFile(name)} style={{width:'100%',height:'100%'}}/></AbsoluteFill>;
const Live=()=> <AbsoluteFill style={{backgroundColor:'#F5F1E8'}}><svg width="100%" height="100%" viewBox="0 0 800 500"><g transform="translate(240 125)"><CharacterBody id="cap" pose="wave"/><CharacterHead id="cap" expression="happy"/></g><g transform="translate(560 125)"><CharacterHairBack/><CharacterBody id="scarf" pose="hip"/><CharacterHead id="scarf" expression="deadpan"/><CharacterScarf/></g></svg></AbsoluteFill>;
const Root=()=> <><Composition id="Sheet" component={Preview} width={1600} height={1200} fps={30} durationInFrames={1} defaultProps={{name:'character-sheet.svg'}}/><Composition id="Cap" component={Preview} width={320} height={480} fps={30} durationInFrames={1} defaultProps={{name:'cap-character.svg'}}/><Composition id="Scarf" component={Preview} width={320} height={480} fps={30} durationInFrames={1} defaultProps={{name:'scarf-character.svg'}}/><Composition id="Live" component={Live} width={800} height={500} fps={30} durationInFrames={1}/></>;
registerRoot(Root);
