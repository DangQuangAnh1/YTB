const assert=require('assert'),fs=require('fs'),path=require('path');
const m=require('../black-red-duel-v2/motion.cjs'),c=require('./curves.cjs');
function frame(f){let paths=[];for(const id of ['red','black']){let j=m.joints(m.sample(id,f+44));for(const v of [j.lb,j.ab,j.lf,j.af]){const p=c.limb(v);assert.deepStrictEqual(p[0],v.a);assert(Math.hypot(...p.at(-1).map((x,k)=>x-v.end[k]))<1e-9);const o=c.outline(p);assert(o.flat().every(Number.isFinite));paths.push(c.svgPath(o));}paths.push(c.svgPath(c.outline(c.spine(j,24+Math.sin(f/13)*3))));}return paths;}
const original=Array.from({length:90},(_,f)=>frame(f));
for(let f=89;f>=0;f--)assert.deepStrictEqual(frame(f),original[f]);
const result={frames:90,strokePaths:900,allFinite:true,curveEndpointErrorMax:1e-9,reverseSeekDeterminism:true,scope:'centerline endpoint preservation; no independent combat-contact acceptance'};
fs.writeFileSync(path.resolve(__dirname,'../../artifacts/render/soft-line-motion-v1/curve-validation.json'),JSON.stringify(result,null,2));console.log(result);
