# -*- coding: utf-8 -*-
"""国家队数据回归。

历史问题：caps = 小组全部赛程数（含中国队不踢的场次）、淘汰赛不计；
进球/助攻遍历全部小组赛（把非中国场次也当"我们"），与俱乐部算法不统一。
修复：只取中国队的真实场次（资格赛+正赛小组+淘汰赛+友谊赛），
出场数按角色出勤率 × 场次抽样，进球/助攻/零封用 _pMatchContrib 逐场归属。
现实：国家队每年约 6-10 场；本测试断言 caps ≤ 中国队场次、量级合理、数据非 NaN。
"""
import json
import harness

JS = """
(function(){
var out={err:null, rows:[]};
function resolve(p){
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } else { window.__SIMTEST.cont(); } return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); } else { window.__SIMTEST.option(p.canStay?'stay':'retire'); } return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
function career(seed){
  var st=window.__SIMTEST.start('normal',%NEW_PLAYER%,seed); st.talent=1.35;
  var g=0,lastLen=(st.seasons||[]).length;
  while(g++<20000){
    if(st.phase==='youth'){ if((st.talent||0)<1.4)st.talent=1.4; if(st.age>=14&&(!st.ovr||st.ovr<58)){st.ovr=58;st.maxOvr=Math.max(st.maxOvr||0,95);} }
    var p=st.pending;
    if(!p){ if(st.phase==='summary'||st.phase==='done')break; window.SIM.nextStep(); continue; }
    try{ resolve(p); }catch(e){ out.err=String(e).slice(0,150); return; }
    var ss=st.seasons||[];
    for(var i=lastLen;i<ss.length;i++){ var r=ss[i];
      if(r.natGames!=null||r.caps!=null)
        out.rows.push({age:r.age,pos:st.pos,caps:r.caps||0,ng:r.natGames||0,g:r.natGoals||0,a:r.natAssists||0,cs:r.natCs||0});
    }
    lastLen=ss.length;
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; break; }
  }
}
%SEEDS%
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)

SEEDS = ';'.join('career(%d)' % s for s in [11, 37, 67, 97, 131, 167, 199, 229, 251, 277])


def run():
    mr = harness.new_engine()
    js = JS.replace('%SEEDS%', SEEDS)
    r = json.loads(mr.eval(js))
    if r['err']:
        raise harness.Fail(r['err'])
    rows = r['rows']
    if not rows:
        raise harness.Fail('no national seasons (call-up path broken?)')
    # 1) caps 不得超过中国队当季场次
    for x in rows:
        if x['caps'] > x['ng']:
            raise harness.Fail('caps %d > China games %d (age %d)' % (x['caps'], x['ng'], x['age']))
    # 2) 场次量级合理（现实每年约 4-14 场）
    games = [x['ng'] for x in rows if x['ng'] > 0]
    if games and (min(games) < 3 or max(games) > 20):
        raise harness.Fail('China games out of realistic range: %d..%d' % (min(games), max(games)))
    caps = [x['caps'] for x in rows]
    if max(caps) > 16:
        raise harness.Fail('caps too high: %d' % max(caps))
    # 3) 数据非 NaN/负
    for x in rows:
        for k in ('caps', 'g', 'a', 'cs'):
            v = x[k]
            if not isinstance(v, (int, float)) or v != v or v < 0:
                raise harness.Fail('bad %s=%r at age %d' % (k, v, x['age']))
    # 4) 出场率合理：总 caps / 总场次 在 0.3-1.0
    tot_caps = sum(x['caps'] for x in rows); tot_g = sum(x['ng'] for x in rows)
    ratio = tot_caps / max(1, tot_g)
    if not (0.3 <= ratio <= 1.0):
        raise harness.Fail('cap rate %.2f out of range' % ratio)
    print('PASS national_stats (%d seasons, caps avg %.1f, China games avg %.1f, cap rate %.2f)'
          % (len(rows), tot_caps / len(rows), tot_g / len(rows), ratio))


if __name__ == '__main__':
    harness.main(run)
