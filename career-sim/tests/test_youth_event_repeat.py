# -*- coding: utf-8 -*-
"""青训期事件重复触发回归。

历史 bug：bj()（青训年推进）用 aE() 抽事件后直接置 pending，从不写 usedEvents，
导致青训/少年阶段同一个事件每年被反复抽中（长高/激素/生长痛等最明显）。
本测试统计每个事件在青训期被真正展示的次数，断言不超过其 repeat 上限。
"""
import json
import harness

JS = """
(function(){
var out={err:null, careers:[]};
function resolve(p){
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } else { window.__SIMTEST.cont(); } return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){
    if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); }
    else{ window.__SIMTEST.option(p.canStay?'stay':'retire'); }
    return;
  }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
function career(seed){
  var st=window.__SIMTEST.start('normal',%NEW_PLAYER%,seed);
  st.talent=1.25;
  var g=0, seq=[];
  while(g++<20000){
    if(st.phase==='youth'){
      if((st.talent||0)<1.3) st.talent=1.3;
      if(st.age>=14 && (!st.ovr || st.ovr<52)){ st.ovr=52; st.maxOvr=Math.max(st.maxOvr||0,92); }
    }
    var p=st.pending;
    if(!p){
      if(st.phase==='summary'||st.phase==='done') break;
      window.SIM.nextStep();
      continue;
    }
    if(p.type==='random' && !p.result && st.phase==='youth') seq.push(p.eventId);
    try{ resolve(p); }catch(e){ out.err='seed='+seed+' '+p.type+': '+String(e).slice(0,150); return; }
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; break; }
  }
  var defs={}, events=window.EVENTS;
  for(var i=0;i<events.length;i++) defs[events[i].id]=events[i].repeat||1;
  var counts={}, violations=[];
  for(var j=0;j<seq.length;j++) counts[seq[j]]=(counts[seq[j]]||0)+1;
  for(var eid in counts){
    var lim=defs[eid]||1;
    if(counts[eid]>lim) violations.push({id:eid,shown:counts[eid],limit:lim});
  }
  out.careers.push({seed:seed,shown:seq.length,violations:violations});
}
career(101); career(202); career(303); career(404);
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    total = 0
    for c in r['careers']:
        if not c['shown']:
            raise harness.Fail('seed=%s: no youth events shown (career path changed?)' % c['seed'])
        for v in c['violations']:
            total += v['shown'] - v['limit']
            print('  seed=%s 事件 %s 展示 %d 次 > 上限 %d' % (c['seed'], v['id'], v['shown'], v['limit']))
    if total:
        raise harness.Fail('青训期事件超出 repeat 上限，共 %d 次重复展示' % total)
    print('PASS youth_event_repeat (青训期事件不重复触发)')


if __name__ == '__main__':
    harness.main(run)
