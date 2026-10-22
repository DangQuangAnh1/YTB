#!/usr/bin/env python3
"""One-command reference video study for the video-study skill.
Usage: video-study.py <url-or-file> --project P-2 --name <slug> [--download-approved] [--compare our-audio.wav]
                      [--windows 5.6-7.4,15-16.7] [--crop x,y,w,h] [--no-watch]
Steps (all output under projects/<P>/media/<slug>/, which Git ignores):
  1. source.mp4: a local file is copied; a URL is downloaded with yt-dlp (<=720p) ONLY with --download-approved,
     which the agent passes after the user agreed to that download in chat.
  2. analysis/   scripts/analyze-video.py: cuts, motion curve, flashes, onsets, palette, 48-frame sheets.
  3. watch/      claude-video /watch local engine (MIT, third_party/video/sources/claude-video) if checked out: scene/uniform frames.
  4. detail/     scripts/video-detail.py strip: every frame at ~12 drawings/s in the busiest windows (motion peaks) or --windows.
  5. audio/      scripts/video-detail.py audio: spectrogram, per-onset features, onset clips, optional --compare.
  6. INDEX.md    what was produced and what to look at next.
Needs .venv (numpy, pillow, imageio-ffmpeg, yt-dlp for URLs) and the P-2 Remotion runtime for ffprobe."""
import sys,os,json,shutil,subprocess,glob
from pathlib import Path

root=Path(__file__).resolve().parents[1]
PY=sys.executable
def arg(name,default=None):return sys.argv[sys.argv.index(name)+1] if name in sys.argv else default
def run(a,**k):print('$',' '.join(map(str,a)),flush=True);return subprocess.run(a,check=True,**k)

def tool_dir():
    """A PATH folder with a full ffmpeg (the Remotion build lacks the select filter claude-video uses) and ffprobe."""
    import imageio_ffmpeg
    d=Path.home()/'.cache/creator-agency/ffbin';d.mkdir(parents=True,exist_ok=True)
    exe='.exe' if os.name=='nt' else ''
    ff=d/f'ffmpeg{exe}'
    if not ff.exists():shutil.copy(imageio_ffmpeg.get_ffmpeg_exe(),ff)
    probe=glob.glob(str(root/'third_party/video/runtime/p2-remotion/node_modules/@remotion/compositor-*/ffprobe*'))
    if probe and not (d/f'ffprobe{exe}').exists():
        src=Path(probe[0]).parent
        for f in src.iterdir():
            if f.name.startswith('ffprobe') or f.suffix in ('.dll','.so','.dylib'):shutil.copy(f,d/f.name)
    elif not probe and not shutil.which('ffprobe'):print('warning: no ffprobe found; run scripts/setup-p2.sh',file=sys.stderr)
    return d

def main():
    if len(sys.argv)<2 or sys.argv[1].startswith('--'):print(__doc__);sys.exit(2)
    src=sys.argv[1];project=arg('--project','P-2');name=arg('--name')
    if not name:print('--name <slug> is required',file=sys.stderr);sys.exit(2)
    base=root/'projects'/project/'media'/name;base.mkdir(parents=True,exist_ok=True);video=base/'source.mp4'
    import imageio_ffmpeg;ff=imageio_ffmpeg.get_ffmpeg_exe()
    if not video.exists():
        if src.startswith('http'):
            if '--download-approved' not in sys.argv:
                print('Refusing to download: ask the user first, then rerun with --download-approved.',file=sys.stderr);sys.exit(3)
            run([PY,'-m','yt_dlp','--no-playlist','--ffmpeg-location',ff,'-f','bv*[height<=720]+ba/b[height<=720]',
                 '--merge-output-format','mp4','-o',str(base/'source.%(ext)s'),src])
        else:shutil.copy(src,video)
    run([PY,str(root/'scripts/analyze-video.py'),str(video),str(base/'analysis')])
    rep=json.loads((base/'analysis/report.json').read_text())
    tools=tool_dir();env=dict(os.environ,PATH=str(tools)+os.pathsep+os.environ.get('PATH',''))
    watch=root/'third_party/video/sources/claude-video/skills/watch/scripts/watch.py'
    if watch.exists() and '--no-watch' not in sys.argv:
        shutil.rmtree(base/'watch',ignore_errors=True)
        r=subprocess.run([PY,'-I',str(watch),str(video),'--engine','local','--detail','balanced','--no-whisper','--out-dir',str(base/'watch')],env=env,capture_output=True,text=True)
        (base/'watch-report.md').write_text(r.stdout+('\n\n'+r.stderr if r.returncode else ''),encoding='utf-8')
    if arg('--windows'):wins=[tuple(map(float,w.split('-'))) for w in arg('--windows').split(',')]
    else:
        dur=rep['duration_s'];peaks=sorted(rep['motion']['top_peaks_s'][:6]);wins=[]
        for p in peaks:
            a,b=max(0,p-.9),min(dur,p+.9)
            if wins and a<=wins[-1][1]:wins[-1]=(wins[-1][0],b)
            else:wins.append((a,b))
        wins=wins[:4]
    step=max(1,round(rep['fps']/12))
    for k,(a,b) in enumerate(wins):
        cmd=[PY,str(root/'scripts/video-detail.py'),'strip',str(video),str(base/'detail'),'--from',f'{a:.2f}','--to',f'{b:.2f}',
             '--step',str(step),'--width','420','--cols','3','--label',f'w{k+1}-{a:.1f}-{b:.1f}s']
        if arg('--crop'):cmd+=['--crop',arg('--crop')]
        run(cmd)
    cmd=[PY,str(root/'scripts/video-detail.py'),'audio',str(video),str(base/'audio')]
    if arg('--compare'):cmd+=['--compare',arg('--compare')]
    if rep.get('audio'):run(cmd)
    lines=[f'# Video study: {name}','',f'Source: {src}',f'Duration {rep["duration_s"]}s, {rep["width"]}x{rep["height"]}, {rep["fps"]} fps, cuts {rep["cuts"]["count"]}','',
           'Look at, in order:','- `analysis/sheet-1.jpg`, `sheet-2.jpg`, `shots.jpg` and `analysis/report.json` (numbers)',
           '- `watch-report.md` and `watch/*/frames` (claude-video scene/uniform frames)' if (base/'watch-report.md').exists() else '- watch skipped',
           *[f'- `detail/w{k+1}-{a:.1f}-{b:.1f}s.jpg` (every {step} source frame)' for k,(a,b) in enumerate(wins)],
           '- `audio/spectrogram.jpg`, `audio/audio-report.json`, `audio/*-onsets/*.wav`' if rep.get('audio') else '- no audio track','',
           'Then write findings to projects/<P>/research/ (learning only: never reuse the author\'s frames, audio or characters).']
    (base/'INDEX.md').write_text('\n'.join(lines),encoding='utf-8');print('\n'.join(lines))

if __name__=='__main__':main()
