// Original fixed-length two-bone rig. Time is in seconds, positions SVG world units.
const L={thigh:80,shin:80,upperArm:61,forearm:61,torso:100};
const lerp=(a,b,t)=>a+(b-a)*t,clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function ik(a,target,l1,l2,bend){let dx=target[0]-a[0],dy=target[1]-a[1],raw=Math.hypot(dx,dy);let d=clamp(raw,.001,l1+l2-.001),ux=dx/(raw||1),uy=dy/(raw||1),along=(l1*l1-l2*l2+d*d)/(2*d),height=Math.sqrt(Math.max(0,l1*l1-along*along));let j=[a[0]+ux*along-uy*height*bend,a[1]+uy*along+ux*height*bend],end=[a[0]+ux*d,a[1]+uy*d];return {a,j,end,error:Math.hypot(end[0]-target[0],end[1]-target[1]),target};}
function pose(x,opts={}){let y=opts.y??607,lean=opts.lean??0,shoulder=[x+Math.sin(lean*Math.PI/180)*100,y-Math.cos(lean*Math.PI/180)*100];return {hip:[x,y],lean,fl:[x-24,740],fr:[x+24,740],hl:[shoulder[0]-52,shoulder[1]+65],hr:[shoulder[0]+52,shoulder[1]+65],head:0,expr:0,...opts};}
// Each target stores a visible, intentional movement; fixed targets in stance holds lock feet.
const A=[
 [0,pose(135,{fl:[105,740],fr:[163,740],hl:[118,500],hr:[186,500],lean:8})],
 [1.3,pose(135,{fl:[105,740],fr:[220,740],hl:[118,500],hr:[186,500],lean:15})],
 [2.2,pose(133,{y:620,fl:[105,740],fr:[185,740],hl:[95,505],hr:[171,518],lean:-8})],
 [3.2,pose(215,{y:602,fl:[167,740],fr:[269,740],hl:[205,493],hr:[322,510],lean:22})],
 [3.65,pose(220,{y:608,fl:[167,740],fr:[269,740],hl:[200,490],hr:[321,511],lean:18})],
 [4.2,pose(217,{y:611,fl:[167,740],fr:[269,740],hl:[178,500],hr:[266,510],lean:-12})],
 [4.65,pose(213,{y:600,fl:[183,740],fr:[240,679],hl:[162,480],hr:[244,490],lean:-15})],
 [5.15,pose(220,{y:598,fl:[183,740],fr:[356,591],hl:[150,505],hr:[243,485],lean:-18})],
 [5.65,pose(230,{y:600,fl:[201,740],fr:[282,695],hl:[175,492],hr:[265,470],lean:-8})],
 [6.5,pose(295,{y:603,fl:[259,740],fr:[354,740],hl:[235,470],hr:[326,445],lean:-26,expr:1})],
 [7.2,pose(327,{y:616,fl:[278,740],fr:[392,740],hl:[271,483],hr:[353,469],lean:28,expr:1})],
 [8,pose(302,{y:631,fl:[237,740],fr:[370,740],hl:[218,520],hr:[370,540],lean:-18,expr:1})],
 [9,pose(271,{y:622,fl:[209,740],fr:[332,740],hl:[215,500],hr:[316,526],lean:8})],
 [10.1,pose(262,{y:617,fl:[209,740],fr:[321,740],hl:[211,507],hr:[299,500],lean:0})],
 [11,pose(252,{y:637,fl:[209,740],fr:[312,740],hl:[204,543],hr:[301,552],lean:-20})],
 [11.6,pose(243,{y:666,fl:[209,740],fr:[297,740],hl:[191,585],hr:[279,587],lean:-48})],
 [12.2,pose(234,{y:644,fl:[187,740],fr:[292,740],hl:[179,556],hr:[272,551],lean:-19})],
 [13.1,pose(218,{y:618,fl:[173,740],fr:[269,740],hl:[164,520],hr:[257,518],head:-12})],
 [14.1,pose(181,{y:612,fl:[151,740],fr:[228,740],hl:[130,532],hr:[199,520],head:-16})],
 [15,pose(167,{y:611,fl:[139,740],fr:[196,740],hl:[119,535],hr:[204,522]})],
 [16.2,pose(167,{y:642,fl:[139,740],fr:[196,740],hl:[106,563],hr:[132,560],lean:27})],
 [17,pose(178,{y:626,fl:[139,740],fr:[196,740],hl:[139,534],hr:[249,485],lean:30})],
 [17.45,pose(240,{y:510,fl:[145,627],fr:[328,590],hl:[205,395],hr:[340,402],lean:20})],
 [18.2,pose(335,{y:475,fl:[240,587],fr:[415,554],hl:[282,359],hr:[433,380],lean:12})],
 [18.85,pose(416,{y:529,fl:[337,629],fr:[474,662],hl:[348,425],hr:[496,437],lean:12})],
 [19.5,pose(465,{y:635,fl:[435,740],fr:[483,740],hl:[429,523],hr:[513,537],lean:10})],
 [20.2,pose(465,{y:608,fl:[435,740],fr:[483,740],hl:[420,512],hr:[492,472],expr:2})],
 [21.4,pose(453,{y:608,fl:[425,740],fr:[483,740],hl:[417,515],hr:[491,565],expr:2})],
 [22.5,pose(453,{y:590,fl:[425,740],fr:[483,740],hl:[405,580],hr:[493,565],expr:2})],
 [24,pose(453,{y:590,fl:[425,740],fr:[483,740],hl:[405,580],hr:[493,565],expr:2})]
];
const B=[
 [0,pose(355,{fl:[325,740],fr:[382,740],hl:[300,505],hr:[365,500],lean:-8})],
 [2.3,pose(355,{y:621,fl:[325,740],fr:[399,740],hl:[301,508],hr:[361,520],lean:-12})],
 [3.2,pose(361,{y:609,fl:[325,740],fr:[399,740],hl:[322,510],hr:[370,496],lean:-15})],
 [3.65,pose(368,{y:615,fl:[325,740],fr:[407,740],hl:[321,511],hr:[376,503],lean:-10})],
 [4.4,pose(365,{y:624,fl:[325,740],fr:[407,740],hl:[321,526],hr:[383,520],lean:12})],
 [5.15,pose(381,{y:680,fl:[337,740],fr:[427,740],hl:[345,600],hr:[399,590],lean:48})],
 [5.8,pose(381,{y:632,fl:[337,740],fr:[427,740],hl:[337,533],hr:[398,530],lean:8})],
 [7.2,pose(409,{y:620,fl:[365,740],fr:[449,740],hl:[359,524],hr:[437,508],lean:6})],
 [8.5,pose(380,{y:614,fl:[340,740],fr:[425,740],hl:[328,515],hr:[396,521],lean:-10})],
 [9.5,pose(369,{y:617,fl:[329,740],fr:[413,740],hl:[315,511],hr:[375,520],lean:-10})],
 [10.6,pose(357,{y:609,fl:[329,740],fr:[387,687],hl:[300,517],hr:[386,505],lean:16})],
 [11.6,pose(353,{y:604,fl:[329,740],fr:[216,584],hl:[317,493],hr:[417,503],lean:19})],
 [12.2,pose(369,{y:612,fl:[345,740],fr:[305,688],hl:[326,490],hr:[427,507],lean:8})],
 [13.3,pose(415,{y:623,fl:[365,740],fr:[470,740],hl:[374,480],hr:[480,530],lean:-23,expr:1})],
 [14.3,pose(407,{y:635,fl:[350,740],fr:[472,740],hl:[335,551],hr:[467,559],lean:8,expr:1})],
 [15.5,pose(369,{y:625,fl:[313,740],fr:[425,740],hl:[316,529],hr:[399,532],lean:-8})],
 [16.5,pose(330,{y:640,fl:[277,740],fr:[388,740],hl:[288,548],hr:[379,549],lean:-10})],
 [17.5,pose(332,{y:625,fl:[269,740],fr:[396,740],hl:[284,510],hr:[402,530],lean:20,expr:1})],
 [18.4,pose(365,{y:640,fl:[296,740],fr:[436,740],hl:[310,532],hr:[423,525],lean:-12,expr:1})],
 [19.5,pose(382,{y:626,fl:[326,740],fr:[439,740],hl:[333,530],hr:[409,535],lean:6})],
 [20.6,pose(363,{y:612,fl:[325,740],fr:[400,740],hl:[314,545],hr:[390,548]})],
 [21.5,pose(355,{y:608,fl:[328,740],fr:[385,740],hl:[311,565],hr:[398,540],expr:2})],
 [22.5,pose(355,{y:590,fl:[328,740],fr:[385,740],hl:[311,565],hr:[405,580],expr:2})],
 [24,pose(355,{y:590,fl:[328,740],fr:[385,740],hl:[311,565],hr:[405,580],expr:2})]
];
function sample(keys,t){let idx=keys.findIndex(k=>k[0]>t);if(idx<0)return keys.at(-1)[1];if(idx===0)return keys[0][1];let [a,p]=keys[idx-1],[b,q]=keys[idx],u=clamp((t-a)/(b-a),0,1);u=u*u*(3-2*u);let out={};for(let k of Object.keys(p)){out[k]=Array.isArray(p[k])?p[k].map((v,i)=>lerp(v,q[k][i],u)):lerp(p[k],q[k],u)}return out;}
function joints(p){let h=p.hip,s=[h[0]+Math.sin(p.lean*Math.PI/180)*L.torso,h[1]-Math.cos(p.lean*Math.PI/180)*L.torso];return {hip:h,shoulder:s,head:[s[0],s[1]-43],ll:ik(h,p.fl,L.thigh,L.shin,1),lr:ik(h,p.fr,L.thigh,L.shin,-1),al:ik(s,p.hl,L.upperArm,L.forearm,1),ar:ik(s,p.hr,L.upperArm,L.forearm,-1)};}
module.exports={L,A,B,sample,joints,ik};


