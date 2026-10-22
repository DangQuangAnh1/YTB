// Isolated research comparison; no production film or reference artwork reused.
// Run at repository root. Upstream source is MIT at catalog-pinned SHA.
const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../../..');
const out=path.join(root,'third_party/video/smoke/curve-source-check');fs.mkdirSync(out,{recursive:true});
require(path.join(root,'third_party/video/runtime/p2-remotion/node_modules/esbuild')).buildSync({entryPoints:[path.join(root,'third_party/video/sources/perfect-freehand/packages/perfect-freehand/src/index.ts')],bundle:true,platform:'browser',format:'iife',globalName:'PerfectFreehand',outfile:path.join(out,'perfect-freehand.js')});
const readme=fs.readFileSync(path.join(root,'third_party/video/sources/perfect-freehand/README.md'),'utf8');
const helper=readme.slice(readme.indexOf('const average ='),readme.indexOf('```',readme.indexOf('const average =')));
fs.copyFileSync(path.join(root,'third_party/video/sources/perfect-freehand/LICENSE'),path.join(out,'UPSTREAM_LICENSE.txt'));
const html=`<!doctype html><meta charset="utf-8"><title>P-2: thử nét cong</title>
<style>body{margin:0;background:#eef0f1;font-family:Arial,sans-serif}svg{width:100%;max-width:1040px;display:block;margin:auto}#result{font-size:12px;text-align:center;color:#70777c;padding:8px}</style>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 620">
<rect width="1040" height="620" fill="#f6f7f7"/>
<text x="40" y="55" font-size="29" font-weight="700" fill="#20252a">Thử cách vẽ nét</text>
<text x="40" y="85" font-size="16" fill="#65717a">Hình gốc để kiểm kỹ thuật — chưa phải phim mới hoặc chất lượng đã duyệt</text>
<rect x="20" y="112" width="490" height="480" rx="16" fill="white"/>
<rect x="530" y="112" width="490" height="480" rx="16" fill="white"/>
<text x="55" y="155" font-size="18" fill="#424950">Đoạn thẳng nối tại khớp</text>
<text x="565" y="155" font-size="18" fill="#424950">Nét cong + outline upstream</text>
<path d="M55 552H475M565 552H985" stroke="#c9ced1" stroke-width="2"/>
<g id="hard" stroke="#ce2d33" stroke-width="17" stroke-linecap="round" stroke-linejoin="round" fill="none">
<path d="M240 430L245 340L235 295"/>
<path d="M244 330L185 365L180 300"/>
<path d="M244 330L310 360L320 290"/>
<path d="M240 430L190 490L175 550"/>
<path d="M240 430L300 475L285 550"/>
</g><circle cx="235" cy="270" r="25" fill="#ce2d33"/>
<g id="soft" transform="translate(510 0)" fill="#ce2d33"></g><circle cx="745" cy="270" r="25" fill="#ce2d33"/>
</svg><div id="result">Đang chạy nguồn perfect-freehand…</div>
<script src="perfect-freehand.js"></script><script>
${helper}
const centerlines=['M240 430 C266 385 215 350 235 295','M244 330 C220 344 183 388 180 363 S178 322 180 300','M244 330 C278 356 304 386 310 360 S318 318 320 290','M240 430 Q178 480 175 550','M240 430 Q319 463 285 550'];
let count=0,finite=true;const options={size:17,thinning:.06,smoothing:.7,streamline:0,simulatePressure:false,last:true};
for(const d of centerlines){const guide=document.createElementNS('http://www.w3.org/2000/svg','path');guide.setAttribute('d',d);const length=guide.getTotalLength(),points=[];for(let i=0;i<=80;i++){const p=guide.getPointAtLength(length*i/80);points.push([p.x,p.y,.5]);}const outline=PerfectFreehand.getStroke(points,options);finite=finite&&outline.every(p=>p.every(Number.isFinite));count+=outline.length;const shape=document.createElementNS('http://www.w3.org/2000/svg','path');shape.setAttribute('d',getSvgPathFromStroke(outline));document.getElementById('soft').appendChild(shape);}
document.getElementById('result').textContent=JSON.stringify({upstream:'perfect-freehand',sha:'176e00f2399f4969e1b0965c5921d96a3e50ce9f',strokes:5,outlinePoints:count,finite,scope:'static stroke test only'});
</script>`;
fs.writeFileSync(path.join(out,'index.html'),html);console.log(out);
