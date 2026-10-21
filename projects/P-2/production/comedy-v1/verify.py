"""Technical verification plus sampled frames; does not claim listening or audience QA."""
from pathlib import Path
import subprocess,json,hashlib,wave,sys
import cv2
import numpy as np
import imageio_ffmpeg
from PIL import Image,ImageDraw

root=Path(__file__).resolve().parents[4]
project=root/'projects/P-2'
folder=project/'artifacts/render'/ (sys.argv[1] if len(sys.argv)>1 else 'comedy-c1-draft-v2')
video=folder/'draft.mp4'
probe=root/'projects/P-1/production/engine-v1/node_modules/@remotion/compositor-win32-x64-msvc/ffprobe.exe'
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
run=lambda args:subprocess.run(args,capture_output=True,check=True)
meta=json.loads(run([str(probe),'-v','error','-count_frames','-show_streams','-show_format','-of','json',str(video)]).stdout)
v=next(s for s in meta['streams'] if s['codec_type']=='video')
a=next(s for s in meta['streams'] if s['codec_type']=='audio')
assert (v['width'],v['height'],v['r_frame_rate'],int(v['nb_read_frames']))==(1080,1920,'30/1',840)
assert abs(float(v['duration'])-28)<1/30
assert abs(float(a['duration'])-float(v['duration']))<1/30
decode=run([ffmpeg,'-v','error','-i',str(video),'-f','null','-'])

samples=[25,50,58,76,140,180,206,225,251,257,283,289,315,355,455,499,510,550,570,595,625,650,669,670,690,715,737,765,790,810,832,839]
folder.joinpath('qa-frames').mkdir(exist_ok=True)
cap=cv2.VideoCapture(str(video));index=0;hashes=[]
while True:
    ok,frame=cap.read()
    if not ok:break
    hashes.append(hashlib.sha256(frame.tobytes()).hexdigest())
    if index in samples:cv2.imwrite(str(folder/'qa-frames'/f'frame-{index:03}.png'),frame)
    index+=1
cap.release();assert index==840
sheet=Image.new('RGB',(2160,4*505),'#dedbd4');draw=ImageDraw.Draw(sheet)
for i,frame in enumerate(samples):
    im=Image.open(folder/'qa-frames'/f'frame-{frame:03}.png').convert('RGB');im.thumbnail((270,480))
    x=(i%8)*270;y=(i//8)*505;sheet.paste(im,(x,y));draw.text((x+8,y+483),f'f{frame:03} / {frame/30:.2f}s',fill='#203c47')
sheet.save(folder/'contact-sheet.jpg',quality=93)

audio_raw=run([ffmpeg,'-v','error','-i',str(video),'-vn','-f','f32le','-acodec','pcm_f32le','-ac','2','-ar','48000','-']).stdout
audio=np.frombuffer(audio_raw,dtype='<f4').reshape(-1,2)
assert np.max(np.abs(audio))<.999
with wave.open(str(project/'production/comedy-v1/public/soundtrack.wav'),'rb') as wav:
    source=np.frombuffer(wav.readframes(wav.getnframes()),dtype='<i2').reshape(-1,2).astype(float)/32768
mono=audio.mean(axis=1);ref=source.mean(axis=1)
sync=[]
for frame in [50,650,715,810,832]:
    at=round(frame/30*48000);n=3360;pad=1600
    target=ref[at:at+n];search=mono[at-pad:at+n+pad]
    corr=np.correlate(search,target,mode='valid');offset=int(np.argmax(corr))-pad
    sync.append({'cue_frame':frame,'offset_samples':offset,'offset_ms':offset/48,'within_one_video_frame':abs(offset)<=1600})
assert all(s['within_one_video_frame'] for s in sync)
report={'video_sha256':hashlib.sha256(video.read_bytes()).hexdigest(),'width':v['width'],'height':v['height'],'fps':v['r_frame_rate'],'video_frames':index,'duration_seconds':float(v['duration']),'audio_duration_seconds':float(a['duration']),'video_codec':v['codec_name'],'audio_codec':a['codec_name'],'audio_sample_rate':a['sample_rate'],'audio_channels':a['channels'],'full_decode_exit':0,'decode_stderr':decode.stderr.decode('utf-8',errors='replace'),'decoded_audio_peak':float(np.max(np.abs(audio))),'decoded_audio_rms':float(np.sqrt(np.mean(audio**2))),'audio_cue_sync_vs_source':sync,'unique_decoded_frames':len(set(hashes)),'sampled_visual_frames':samples,'visual_coverage':'32 sampled frames plus separate manual inspection; not continuous playback','perceptual_audio_listening':'unverified','audience_test':'not performed'}
(folder/'technical-qa.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(report,ensure_ascii=False,indent=2))
