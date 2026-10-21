const fs=require('fs'),path=require('path');
const {sheet,character,head,svg}=require('./cast.cjs');
const out=path.resolve(__dirname,'../../artifacts/characters/duo-v2');fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'character-sheet.svg'),sheet());
for(const id of ['cap','scarf']){
 fs.writeFileSync(path.join(out,id+'-character.svg'),character(id));
 for(const ex of ['neutral','happy','surprised','deadpan'])fs.writeFileSync(path.join(out,`${id}-head-${ex}.svg`),svg(id==='scarf'?260:240,id==='scarf'?360:280,`<g transform="translate(${id==='scarf'?130:120} ${id==='scarf'?110:92})">${head(id,ex)}</g>`));
}
console.log('Generated sheet, two transparent characters, eight reusable heads.');
