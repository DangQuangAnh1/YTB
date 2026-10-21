import React from 'react';
const cast=require('./cast.cjs');
export type CastId='cap'|'scarf';
export type Expression='neutral'|'happy'|'surprised'|'deadpan';
// Place inside an SVG at the head origin. Accessory geometry stays identical.
export const CharacterHead:React.FC<{id:CastId;expression?:Expression;x?:number;y?:number;scale?:number;rotation?:number}>=({id,expression='neutral',x=0,y=0,scale=1,rotation=0})=><g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} dangerouslySetInnerHTML={{__html:cast.head(id,expression,false)}}/>;
export const CharacterBody:React.FC<{id:CastId;pose?:'idle'|'wave'|'hip'}>=({id,pose='idle'})=><g dangerouslySetInnerHTML={{__html:cast.body(id,pose)}}/>;
// Scarf follows the torso/neck origin, rather than rotating with facial acting.
export const CharacterScarf:React.FC=()=> <g dangerouslySetInnerHTML={{__html:cast.scarf()}}/>;
