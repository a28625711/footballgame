# -*- coding: utf-8 -*-
"""成绩单语料（characterization / golden corpus）。

对固定 (mode, seed) 跑完整生涯，记录每一步之后的球员状态指纹 + 每季快照，
最后对整条"步骤流"做 FNV 哈希。用途：
  * 大改动（如 sim.js 拆分）前后必须完全一致 —— 证明"零行为变化"
  * 内容改动（新增事件/数值）会让语料变化 —— 需要显式重新基线并审视差异

用法：
  python tools/golden.py --update     # 生成/更新基线 tests/golden/corpus.json
  python tools/golden.py              # 与基线比对，不一致则非零退出
"""
import io
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
BASE = r'D:\football\career-sim'
sys.path.insert(0, os.path.join(BASE, 'tests'))
import harness  # noqa: E402

BASELINE = os.path.join(BASE, 'tests', 'golden', 'corpus.json')

JS = r"""
(function(){
var MODES=Object.keys(window.__SIMTEST.modes||{normal:1}).slice(0,3);
var SEEDS=[101,118];
function fnv(s){
  var h=0x811c9dc5;
  for(var i=0;i<s.length;i++){
    h^=s.charCodeAt(i);
    h=(h+((h<<1)+(h<<4)+(h<<7)+(h<<8)+(h<<24)))>>>0;
  }
  return ('0000000'+h.toString(16)).slice(-8);
}
function n(v){v=Number(v);return isFinite(v)?Math.round(v*100)/100:0;}
function snap(st){
  return [st.age,n(st.ovr),n(st.fame),n(st.guanxi),n(st.clean),String(st.role||''),
          String(st.teamId||''),n(st.money),n(st.contractLeft),String(st.playerType),
          (st.seasons||[]).length,(st.trophies||[]).length,(st.awards||[]).length,
          (st.clubsPlayed||[]).length].join(',');
}
function resolve(p){
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } else { window.__SIMTEST.cont(); } return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); } else { window.__SIMTEST.option(p.canStay?'stay':'retire'); } return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
function career(mode,seed){
  var st=window.__SIMTEST.start(mode,LOCAL_PLAYER,seed);
  var stream=[],seasons=[],g=0,big=0,stuck=true,lastType='',rep=0;
  while(g++<20000){
    if(st.phase==='youth'){
      if((st.talent||0)<1.3) st.talent=1.3;
      if(st.age>=14 && (!st.ovr||st.ovr<52)){ st.ovr=52; st.maxOvr=Math.max(st.maxOvr||0,92); }
    }
    try{ String(window.__SIMTEST.render()); }catch(e){}
    var p=st.pending;
    if(!p){
      if(st.phase==='summary'||st.phase==='done'){ stuck=false; break; }
      try{ window.SIM.nextStep(); }catch(e){ stream.push('ERR:'+String(e).slice(0,80)); break; }
      continue;
    }
    var id=(p.eventId||(p.ev&&p.ev.id)||(p.event&&p.event.id)||'');
    stream.push(p.type+':'+id);
    if(p.type==='bigmatch'&&!p.result) big++;
    if(p.type===lastType && ++rep>300){ stream.push('STUCK:'+p.type); break; }
    if(p.type!==lastType){ lastType=p.type; rep=0; }
    try{ resolve(p); }catch(e){ stream.push('RESV:'+String(e).slice(0,80)); try{window.SIM.nextStep();}catch(e2){break;} }
    stream.push(snap(st));
    if(p.type==='report') seasons.push(snap(st));
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; stuck=false; break; }
  }
  return {mode:mode,seed:seed,stuck:stuck,phase:st.phase,age:n(st.age),endReason:String(st.endReason||''),
          seasons:seasons,big:big,h:fnv(stream.join('|'))};
}
var out={careers:[]};
for(var mi=0;mi<MODES.length;mi++){
  for(var si=0;si<SEEDS.length;si++) out.careers.push(career(String(MODES[mi]),SEEDS[si]));
}
out.hash=fnv(out.careers.map(function(c){return c.mode+':'+c.seed+':'+c.h;}).join('|'));
return JSON.stringify(out);
})()
""".replace('LOCAL_PLAYER', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    return json.loads(mr.eval(JS))


def main():
    args = set(sys.argv[1:])
    cur = run()
    if '--update' in args or not os.path.exists(BASELINE):
        os.makedirs(os.path.dirname(BASELINE), exist_ok=True)
        io.open(BASELINE, 'w', encoding='utf-8', newline='\n').write(
            json.dumps(cur, ensure_ascii=False, indent=1) + '\n')
        print('baseline written: %s' % BASELINE)
        print('  careers=%d  hash=%s' % (len(cur['careers']), cur['hash']))
        for c in cur['careers']:
            print('    %-8s seed=%-5d %-8s age=%-3d seasons=%-2d h=%s' %
                  (c['mode'], c['seed'], c['phase'], c['age'], len(c['seasons']), c['h']))
        return 0

    base = json.loads(io.open(BASELINE, encoding='utf-8').read())
    if base.get('hash') == cur.get('hash'):
        print('PASS golden corpus (%d careers, hash=%s)' % (len(cur['careers']), cur['hash']))
        return 0

    bmap = {(c['mode'], c['seed']): c for c in base['careers']}
    cmap = {(c['mode'], c['seed']): c for c in cur['careers']}
    print('FAIL golden corpus  baseline=%s current=%s' % (base.get('hash'), cur.get('hash')))
    for k in sorted(set(bmap) | set(cmap)):
        b, c = bmap.get(k), cmap.get(k)
        if b is None:
            print('  + %s only in current' % (k,)); continue
        if c is None:
            print('  - %s only in baseline' % (k,)); continue
        if b['h'] != c['h']:
            print('  ! %s hash %s -> %s' % (k, b['h'], c['h']))
            print('      baseline: phase=%s age=%s seasons=%d end=%s' %
                  (b['phase'], b['age'], len(b['seasons']), b['endReason']))
            print('      current : phase=%s age=%s seasons=%d end=%s' %
                  (c['phase'], c['age'], len(c['seasons']), c['endReason']))
        elif b != c:
            print('  ~ %s identical stream hash but summary differs' % (k,))
    print('若为有意改动：python tools/golden.py --update')
    return 1


if __name__ == '__main__':
    sys.exit(main())
