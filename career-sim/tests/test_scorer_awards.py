# -*- coding: utf-8 -*-
"""金靴/欧洲金靴真实化回归。

历史机制：固定阈值 [15,18,20,24,27,30][rep]（全部赛事进球）+ 概率掷骰，不比对任何 AI 射手。
修复：由联赛最强队的联赛进球推出「头号射手门槛」，球员联赛进球 ≥ 门槛即 100% 获奖；
欧洲金靴用五大联赛门槛的最高值。本测试断言获奖与联赛进球/门槛一致。
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
    var ss=st.seasons||[], aw=st.awards||[];
    for(var i=lastLen;i<ss.length;i++){
      var r=ss[i];
      var won=[];for(var j=0;j<aw.length;j++)if(aw[j].age===r.age)won.push(aw[j].name);
      var tt=st['_topTgt']||{},tgt=tt[(r.leagueId||'')+'_'+r.age];
      out.rows.push({lg:r.league,pos:st.pos,lgG:r.lgGoals||0,apps:r.apps,won:won,tgt:(tgt==null?null:tgt)});
    }
    lastLen=ss.length;
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; break; }
  }
}
%SEEDS%
return JSON.stringify(out);
})()
"""

SEEDS = ';'.join('career(%d)' % s for s in [11, 37, 67, 97, 131, 167, 199, 229])


def run():
    mr = harness.new_engine()
    js = JS.replace('%NEW_PLAYER%', harness.NEW_PLAYER).replace('%SEEDS%', SEEDS)
    r = json.loads(mr.eval(js))
    if r['err']:
        raise harness.Fail(r['err'])
    rows = r['rows']
    if not rows:
        raise harness.Fail('no seasons')
    boot_wins = 0
    bad = []
    for x in rows:
        won_boot = any('金靴' in a for a in x['won'])
        if won_boot:
            boot_wins += 1
            if x['tgt'] is not None and x['lgG'] < x['tgt']:
                bad.append(x)
    if bad:
        raise harness.Fail('金靴 won below target: %r' % bad[0])
    if boot_wins == 0:
        raise harness.Fail('no 金靴 won across careers (award broken?)')
    # targets must be plausible league top-scorer totals
    tgts = [x['tgt'] for x in rows if x['tgt'] is not None]
    if tgts:
        if min(tgts) < 5 or max(tgts) > 45:
            raise harness.Fail('implausible scorer target range: %d..%d' % (min(tgts), max(tgts)))
    print('PASS scorer_awards (%d seasons, %d 金靴 won, target range %s..%s)'
          % (len(rows), boot_wins, min(tgts) if tgts else '-', max(tgts) if tgts else '-'))


if __name__ == '__main__':
    harness.main(run)
