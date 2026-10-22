const F=require('./fight.cjs');
const HITS=[
 {simT:2.25,who:'blue',part:'haL',kind:'punch',power:1,target:'red',dmg:22},
 {simT:3.35,who:'red',part:'ftR',kind:'block',power:.8,target:'blue',dmg:6},
 {simT:4.9,who:'red',part:'ftR',kind:'block',power:1.3,target:'blue',dmg:9},
 {simT:7.75,who:'blue',part:'haL',kind:'final',power:2,target:'red',dmg:78}
];
const WHOOSH=[
 {simT:.08,len:.4,gain:.9,kind:'dash'},{simT:.72,len:.22,gain:.6},{simT:1.22,len:.22,gain:.6},{simT:2.1,len:.2,gain:.7},
 {simT:3.1,len:.3,gain:.8},{simT:4.45,len:.4,gain:.8},{simT:7.05,len:.5,gain:.7},{simT:7.6,len:.2,gain:.9},{simT:7.8,len:.55,gain:.8,kind:'fly'}
];
const FOLEY=[
 {simT:4.65,kind:'jump',power:.8},{simT:5.1,kind:'land',power:.7},{simT:8.42,kind:'land',power:1.2},{simT:8.55,kind:'slide',len:.45}
];
for(const h of HITS){h.outT=F.outAt(h.simT);const p=F.pose(h.who,h.simT);h.pos=p[h.part].slice();}
const out=s=>F.outAt(s);
module.exports={HITS,WHOOSH,FOLEY,out};
