# -*- coding: utf-8 -*-
# 回归：一年有多场决赛时，奖项/升降级写回要等在"队列清空（所有大场面都结束）"之后才做，
# 不能在第一场决赛结束时就算完。
import json

import harness

JS = r"""
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'};
var st=window.__SIMTEST.start('normal',P,1201);
st.ovr=88;st.maxOvr=96;st.money=800;st.age=26;st.phase='career';st.teamId='mci';
st.role='star';st.contractLeft=4;st.seasonsAtClub=3;st.roleAdjust=0;st.guanxi=50;
st.youthTeamId=null;st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;st.bigQ=[];
st._awardDue=!0x0;st._promoDue=!0x0;                 /* 模拟结算处已置延后标志 */
window.SIM.pushPri('cont',0.55,{comp:'冠军联赛决赛',opp:'A队',oppStr:84,_aiCtx:{t:'cont',comp:'冠军联赛',stage:'决赛'}});
window.SIM.pushPri('asia',0.55,{comp:'亚洲杯决赛',opp:'B队',oppStr:80,_aiCtx:{t:'nat',comp:'亚洲杯',stage:'决赛'}});
var out={queued:st.bigQ.length,steps:[]};
var awards0=(st.awards||[]).length;
function resolve(p){
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0); return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'0'); return; }
  if(t==='academy'||t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
  window.SIM.nextStep();
}
var g=0,played=0;
while(g++<5000&&played<2){
  var p=st.pending;
  if(!p){ try{window.SIM.nextStep();}catch(e){out.err=String(e).slice(0,80);break;} continue; }
  if(p.type==='bigmatch'){
    if(!p.result){ window.SIM.choose('push'); continue; }
    played++;
    out.steps.push({n:played,kind:p.kind,awardDue:!!st._awardDue,promoDue:!!st._promoDue,
      awards:(st.awards||[]).length,bigQ:st.bigQ.length});
    if(played===2){out.finalAwardDue=!!st._awardDue;out.finalPromoDue=!!st._promoDue;}
    window.__SIMTEST.cont();
    continue;
  }
  try{ resolve(p); }catch(e){ out.err=String(e).slice(0,80); break; }
}
out.awards0=awards0;
out.awardsEnd=(st.awards||[]).length;
return JSON.stringify(out);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(not r.get('err'), 'runtime error: %s' % r.get('err'))
    harness.check(r['queued'] == 2, '两场大场面未并存: %s' % r['queued'])
    harness.check(len(r['steps']) == 2, '未依次播到两场: %s' % r['steps'])
    first, second = r['steps'][0], r['steps'][1]
    harness.check(first['awardDue'] and first['promoDue'],
                  '第一场决赛后奖项就被处理了（应继续延后）: %s' % first)
    harness.check(first['awards'] == r['awards0'],
                  '第一场决赛后就发了奖: %s' % first)
    harness.check(not r['finalAwardDue'] and not r['finalPromoDue'],
                  '两场都结束后奖项仍未结算: %s' % r)
    print('PASS award_defer (第一场后 due=%s/%s awards=%d | 第二场后 due=%s/%s awards=%d)'
          % (first['awardDue'], first['promoDue'], first['awards'],
             r['finalAwardDue'], r['finalPromoDue'], r['awardsEnd']))


if __name__ == '__main__':
    harness.main(run)
