// Original SVG geometry based only on the user-selected hair/accessory features.
const P={ink:'#203C47',face:'#FFFDF7',hair:'#252D30',hairLight:'#41484A',cap:'#B4A477',capShade:'#93855F',scarf:'#D7D6CE',scarfDark:'#AAAFA8',paper:'#F5F1E8',muted:'#72887E',mint:'#C5D9CE',orange:'#EAA176'};
const escapeXml=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text=(x,y,s,content,fill=P.ink,anchor='middle',weight=700)=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${s}" fill="${fill}" text-anchor="${anchor}" font-weight="${weight}">${escapeXml(content)}</text>`;
function face(expression='neutral',id='cap'){
 let eyes='',brows='',mouth='';
 if(expression==='happy'){
  eyes='<path d="M-24,9q7,-12 14,0m15,0q7,-12 14,0" fill="none" stroke-width="3.5"/>';
  brows='<path d="M-26,-5q8,-7 15,-2m15,0q8,-5 16,2" fill="none" stroke-width="2.5"/>';
  mouth='<path d="M-12,24Q0,46 17,22Q2,26 -12,24Z" fill="#203C47" stroke-width="2"/><path d="M-5,31Q3,36 9,29" stroke="#F0B2A2" stroke-width="4"/>';
 }else if(expression==='surprised'){
  eyes='<ellipse cx="-17" cy="9" rx="5" ry="8" fill="#FFFDF7" stroke-width="2.7"/><ellipse cx="12" cy="9" rx="5" ry="8" fill="#FFFDF7" stroke-width="2.7"/><circle cx="-16" cy="10" r="2"/><circle cx="13" cy="10" r="2"/>';
  brows='<path d="M-26,-10l15,-4m15,0l16,4" fill="none" stroke-width="3"/>';
  mouth='<ellipse cx="0" cy="31" rx="6" ry="9" fill="#203C47"/>';
 }else if(expression==='deadpan'){
  eyes='<path d="M-25,8h16m14,0h16" fill="none" stroke-width="3.2"/><circle cx="-16" cy="11" r="2.3"/><circle cx="14" cy="11" r="2.3"/>';
  brows='<path d="M-25,-7l15,2m15,-2l15,-2" fill="none" stroke-width="2.7"/>';
  mouth='<path d="M-9,29l21,-2" fill="none" stroke-width="2.6"/>';
 }else{
  eyes='<ellipse cx="-17" cy="9" rx="3" ry="5.5"/><ellipse cx="12" cy="9" rx="3" ry="5.5"/>';
  brows='<path d="M-25,-6q7,-4 15,-1m14,0q8,-4 16,0" fill="none" stroke-width="2.6"/>';
  mouth='<path d="M-10,27Q2,35 15,24" fill="none" stroke-width="2.7"/>';
 }
 return `<g stroke="${P.ink}" fill="${P.ink}" stroke-linecap="round" stroke-linejoin="round">${eyes}${brows}${mouth}</g>`;
}
function capHair(){
 return `<g stroke="${P.ink}" stroke-width="2.8" stroke-linejoin="round">
 <path d="M-47,-38Q-34,-61 -3,-50Q29,-60 45,-33L51,-4L44,10L39,-12L30,-7L25,-21L16,-4L13,-24L2,-7L-4,-19L-16,0L-22,-18L-37,-5L-35,-22L-51,-6L-46,-22L-57,-16Z" fill="${P.hair}"/>
 <path d="M-43,-38Q-45,-70 -15,-75Q5,-83 22,-74Q50,-72 51,-40L45,-29Q1,-39 -43,-25Z" fill="${P.cap}"/>
 <path d="M-42,-48Q-1,-58 49,-42L45,-25Q0,-37 -46,-25Z" fill="${P.capShade}"/>
 <path d="M-45,-45L-83,-35L-80,-18L-36,-30Z" fill="${P.cap}"/>
 <rect x="-37" y="-47" width="29" height="15" rx="3" fill="${P.cap}" transform="rotate(-8 -22 -39)"/>
 <rect x="-35" y="-45" width="10" height="12" rx="2" fill="none" stroke="#DDD9C5" stroke-width="2" transform="rotate(-8 -30 -39)"/>
 <circle cx="-15" cy="-41" r="2" fill="${P.ink}" stroke="none"/>
 <path d="M-22,-71L-25,-53M-12,-75L-14,-55M-2,-77L-3,-56M8,-77L8,-55M18,-74L19,-54M28,-70L30,-50M38,-62L40,-46M-50,-39L-75,-32M-49,-34L-74,-27" stroke="${P.capShade}" stroke-width="1.1" opacity=".7" fill="none"/>
 <path d="M-33,-25Q-18,-28 -16,-14M-11,-31Q4,-32 4,-18M15,-30Q30,-31 32,-17" stroke="${P.hairLight}" stroke-width="1.7" fill="none"/>
 <path d="M35,-48L43,-45L42,-34L34,-37Z" fill="#D0C49B" stroke="none"/>
 </g>`;
}
const femaleHair='#392F38',femaleHighlight='#63515D';
function hairBack(){
 return `<g stroke-linejoin="round"><path d="M-58,-25Q-61,-75 -22,-81Q9,-89 24,-77Q58,-75 66,-39Q76,-9 63,30Q58,59 66,82Q75,109 62,127L65,141Q43,150 27,134Q11,148 -5,132Q-24,150 -45,140L-61,144Q-73,122 -61,99Q-54,77 -63,56Q-78,25 -65,1Z" fill="${femaleHair}" stroke="${P.ink}" stroke-width="3"/>
 <path d="M-43,28Q-54,58 -44,82Q-37,103 -49,120Q-52,128 -46,133M50,29Q42,60 54,82Q64,105 53,127M-29,78Q-19,102 -29,129M33,78Q24,102 33,129" fill="none" stroke="${femaleHighlight}" stroke-width="2" opacity=".8"/>
 </g>`;
}
function fringe(){
 return `<g stroke-linecap="round" stroke-linejoin="round"><path d="M-57,-24Q-48,-72 -13,-69Q9,-78 25,-62Q1,-66 -10,-48Q-23,-33 -28,-8Q-29,9 -39,33Q-36,9 -42,-7Q-48,15 -51,48Q-60,22 -57,-24Z" fill="${femaleHair}"/>
 <path d="M8,-57Q39,-65 51,-32Q60,-9 47,22Q43,44 50,71Q35,52 34,28Q37,8 27,-15Q17,-35 8,-57Z" fill="${femaleHair}"/>
 <path d="M8,-66Q-17,-57 -31,-27M24,-54Q44,-34 45,-8M-38,-12Q-48,13 -43,35M40,36Q41,55 48,64" stroke="${femaleHighlight}" stroke-width="1.9" fill="none"/>
 </g>`;
}
function scarf(){
 return `<g stroke="${P.ink}" stroke-width="2.6" stroke-linejoin="round">
 <path d="M-32,68L-32,141Q-17,151 -4,140L0,77Z" fill="${P.scarf}"/>
 <path d="M10,75L15,123Q28,130 40,117L30,68Z" fill="${P.scarfDark}"/>
 <path d="M-45,43Q-27,55 -3,52Q22,53 39,43L45,58Q38,77 9,79Q-21,86 -45,66Z" fill="${P.scarf}"/>
 <path d="M-42,49Q-5,71 41,50M-39,59Q-4,79 39,60" fill="none" stroke="${P.scarfDark}" stroke-width="2.5"/>
 <path d="M-26,84l17,5m-17,6l17,5m-17,6l17,5m-17,6l17,5m-17,6l17,5M20,85l13,-3m-12,13l14,-3m-12,13l14,-3" stroke="${P.scarfDark}" stroke-width="1.5" fill="none"/>
 <path d="M-30,143l-1,9m9,-7v10m8,-10l1,8m7,-11l2,8M17,124l1,7m7,-4l1,7m8,-10l2,6" stroke="${P.scarfDark}" stroke-width="2" stroke-linecap="round"/>
 </g>`;
}
function head(id='cap',expression='neutral',withScarf=true,withBack=true){
 if(!['cap','scarf'].includes(id))throw new Error('Unknown cast id');
 if(!['neutral','happy','surprised','deadpan'].includes(expression))throw new Error('Unknown expression');
 return `${id==='scarf'&&withBack?hairBack():''}<circle r="48" fill="${P.face}" stroke="${P.ink}" stroke-width="3.6"/>${face(expression,id)}${id==='cap'?capHair():fringe()+(withScarf?scarf():'')}`;
}
function body(id='cap',pose='idle'){
 const arms=id==='scarf'?'M-7,70L-72,104L-58,164M7,70L72,104L58,164':pose==='wave'?'M-7,70L-49,108L-79,60M7,70L48,108L35,151':pose==='hip'?'M-7,70L-57,102L-19,142M7,70L48,104L36,157':'M-7,70L-42,113L-38,159M7,70L45,113L41,159';
 return `<g stroke="${P.ink}" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="M0,43V155M-8,69H8M0,155L-29,219L-38,278M0,155L29,219L39,278"/><path d="${arms}"/><path d="M-53,281H-23M25,281H55" stroke-width="10"/></g>`;
}
const svg=(w,h,inside)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inside}</svg>`;
function figure(id,pose='idle',expression='neutral'){return `${id==='scarf'?hairBack():''}${body(id,pose)}${head(id,expression,true,false)}`;}
function character(id,expression='neutral',pose='idle'){
 return svg(320,480,`<g transform="translate(160 112)">${figure(id,pose,expression)}</g>`);
}
function panel(id,x,title,sub,notes){
 const accent=id==='cap'?P.cap:P.scarfDark;
 const base=`<rect x="${x}" y="192" width="735" height="939" rx="25" fill="${P.face}" stroke="#DFE1D8" stroke-width="2"/>
 <circle cx="${x+41}" cy="237" r="15" fill="${accent}"/>${text(x+41,242,13,id==='cap'?'A':'B')}${text(x+70,245,28,title,P.ink,'start')}${text(x+70,274,14,sub,P.muted,'start',400)}
 <ellipse cx="${x+262}" cy="754" rx="91" ry="10" fill="${P.ink}" opacity=".06"/>
 <g transform="translate(${x+262} 422) scale(1.15)">${figure(id,id==='cap'?'wave':'hip')}</g>
 <path d="M${x+121},768H${x+394}" stroke="#D8DDD3" stroke-width="2"/>
 ${text(x+472,408,12,'ĐẶC ĐIỂM GIỮ LẠI',P.muted,'start')}
 ${notes.map((n,i)=>`${text(x+472,450+i*57,17,n[0],P.ink,'start')}${text(x+472,472+i*57,13,n[1],P.muted,'start',400)}`).join('')}
 <path d="M${x+42},815H${x+693}" stroke="#DFE1D8"/>
 ${text(x+367,850,11,'CÙNG NHẬN DIỆN · THAY BIỂU CẢM',P.muted)}
 ${['happy','surprised','deadpan'].map((ex,i)=>`<g transform="translate(${x+148+i*221} ${id==='scarf'?940:943}) scale(${id==='scarf'?.72:.9})">${head(id,ex)}</g>${text(x+148+i*221,1110,12,['VUI','HẾT HỒN','CẠN LỜI'][i],P.muted)}`).join('')}`;
 return base;
}
function sheet(){
 return svg(1600,1200,`<rect width="1600" height="1200" fill="${P.paper}"/><path d="M46,48H1554" stroke="${P.ink}" opacity=".2"/>
 ${text(47,82,12,'P-2 / HÀI NGƯỜI QUE',P.muted,'start')}${text(1553,82,12,'MẪU NHÂN VẬT 02',P.muted,'end')}
 ${text(45,148,47,'HAI DẤU HIỆU. HAI NHÂN VẬT.',P.ink,'start')}
 ${panel('cap',45,'MŨ NGƯỢC','Ảnh 1 · mũ kaki + mái tóc rối', [['Mũ đội ngược','Dây khóa & gân vải'],['Tóc đen rủ mái','Các lọn lệch, hơi rối'],['Nét người que gọn','Cùng tỉ lệ với series']])}
 ${panel('scarf',820,'KHĂN LEN','Ảnh mới · tóc dài + khăn len sáng', [['Khăn len sáng','Quấn dày, đuôi rủ'],['Tóc dài rẽ lệch','Phồng nhẹ, ôm hai bên'],['Mặt tối giản','Giữ tóc & khăn nổi bật']])}
 ${text(800,1170,12,'BẢN MẪU VECTOR · CÓ THỂ ĐỔI TƯ THẾ MÀ GIỮ NGUYÊN TÓC VÀ PHỤ KIỆN',P.muted,'middle',400)}`);
}
module.exports={P,head,body,scarf,hairBack,character,sheet};
module.exports.svg=svg;
