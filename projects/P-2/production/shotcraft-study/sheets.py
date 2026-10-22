# Contact sheets: each demo is one row of 10 frames sampled evenly; 5 demos per sheet.
import subprocess,sys,json,os
from pathlib import Path
from PIL import Image,ImageDraw
import imageio_ffmpeg
ff=imageio_ffmpeg.get_ffmpeg_exe();d=Path(sys.argv[1]);rep=json.loads((d/'render-report.json').read_text())
names=list(rep);N=10;tw,th=230,130
def frames(name,total):
    out=[];tmp=d/'tmp';tmp.mkdir(exist_ok=True)
    idx=[round(i*(total-1)/(N-1)) for i in range(N)];expr='+'.join(f'eq(n,{i})' for i in idx)
    for f in tmp.glob('*.png'):f.unlink()
    subprocess.run([ff,'-v','error','-i',str(d/f'{name}.mp4'),'-vf',f"select='{expr}',scale={tw}:{th}",'-fps_mode','vfr',str(tmp/'f-%02d.png')],check=True)
    return idx,[Image.open(p).copy() for p in sorted(tmp.glob('*.png'))]
for s in range(0,len(names),5):
    group=names[s:s+5];sheet=Image.new('RGB',(N*tw,len(group)*(th+30)),'#111');dr=ImageDraw.Draw(sheet)
    for r,name in enumerate(group):
        idx,ims=frames(name,rep[name]['frames']);y=r*(th+30)
        dr.text((4,y+2),name,fill='#ff0')
        for c,(i,im) in enumerate(zip(idx,ims)):sheet.paste(im,(c*tw,y+16));dr.text((c*tw+3,y+16+th-12),f'f{i}',fill='#0f0')
    sheet.save(d/f'sheet-{s//5+1}.jpg',quality=85)
print('ok')
