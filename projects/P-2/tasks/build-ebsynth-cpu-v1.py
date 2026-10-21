"""Build official EbSynth sources as serial CPU binary using isolated Zig.
OpenMP disabled via a local compatibility header; algorithm sources unchanged.
"""
from pathlib import Path
import hashlib,json,subprocess,sys,re
import ziglang
root=Path(__file__).resolve().parents[3]
src=root/'projects/P-2/media/tools/ebsynth/source'
build=root/'projects/P-2/media/tools/ebsynth/serial-build'
build.mkdir(parents=True,exist_ok=True)
(build/'omp.h').write_text('#pragma once\ninline int omp_get_max_threads(){return 1;}\ninline int omp_get_thread_num(){return 0;}\n',encoding='ascii')
zig=Path(ziglang.__file__).parent/'zig.exe'
out=build/'ebsynth.exe'
cpu=(src/'src/ebsynth_cpu.cpp').read_text(encoding='utf-8')
# Avoid compiling all 192 channel specializations. This adapter uses RGB style
# and either RGB or RGB+RGB guides only. Keep the synthesis algorithm intact.
cpu=re.sub(r'ebsynthCpu<(\d+),\s*(\d+)>',lambda m:m.group(0) if (int(m[1]),int(m[2])) in {(3,3),(3,4),(3,6)} else 'nullptr',cpu)
cpu=cpu.replace('if (numStyleChannels>=1 && numStyleChannels<=EBSYNTH_MAX_STYLE_CHANNELS &&','if (numStyleChannels==3 && (numGuideChannels==3 || numGuideChannels==4 || numGuideChannels==6) &&')
limited=build/'ebsynth_cpu_limited.cpp';limited.write_text(cpu,encoding='utf-8')
front=(src/'src/ebsynth.cpp').read_text(encoding='utf-8')
marker='  std::vector<unsigned char> sourceGuides'
assert marker in front
front=front.replace(marker,'  if (numStyleChannelsTotal!=3 || (numGuideChannelsTotal!=3 && numGuideChannelsTotal!=4 && numGuideChannelsTotal!=6)) { fprintf(stderr,"Unsupported channel configuration in P2 CPU build\\n"); return 2; }\n'+marker)
frontpath=build/'ebsynth_limited.cpp';frontpath.write_text(front,encoding='utf-8')
cmd=[str(zig),'c++','-std=c++11','-O1','-DNDEBUG','-Wno-unknown-pragmas','-I'+str(build),'-I'+str(src/'include'),'-I'+str(src/'src'),str(frontpath),str(limited),str(src/'src/ebsynth_nocuda.cpp'),'-o',str(out)]
subprocess.run(cmd,check=True)
commit=subprocess.check_output(['git','-C',str(src),'rev-parse','HEAD'],text=True).strip()
record={'source':'https://github.com/jamriska/ebsynth','commit':commit,'compiler':'ziglang 0.13.0 via PyPI in .venv-p2','mode':'serial CPU, OpenMP disabled; dispatch restricted to RGB style and 3/4/6 guide channels with explicit rejection for others; synthesis algorithm unchanged','derived_source_sha256':hashlib.sha256(limited.read_bytes()).hexdigest(),'front_source_sha256':hashlib.sha256(frontpath.read_bytes()).hexdigest(),'sha256':hashlib.sha256(out.read_bytes()).hexdigest(),'command':cmd}
(build/'provenance.json').write_text(json.dumps(record,indent=2),encoding='utf-8')
print(json.dumps({'binary':str(out),'sha256':record['sha256']}))
