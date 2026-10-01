# -*- coding: utf-8 -*-
# 回归：续约/到期窗口的薪资
#  ① 常规到期窗：当前队那份条款必须 >= 现合同系数（wageMult），至少不降薪
#  ② 纯续约窗（事件 openContract）：年限最少 2 年；事件指定 wage 仍可低于现合同（降薪叙事）
import json

import harness

P = "{'name':'lg','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'}"

JS = r"""
(function(){
var out={};
function mk(s,o){
  var st=window.__SIMTEST.start('normal',%P%,s);
  st.ovr=(o&&o.ovr)||86;st.maxOvr=96;st.money=800;st.age=(o&&o.age)||28;st.phase='career';
  st.teamId=(o&&o.teamId)||'cn-sd';st.role='star';st.contractLeft=(o&&o.CL!=null)?o.CL:0;
  st.seasonsAtClub=4;st.roleAdjust=0;st.guanxi=50;st.youthTeamId=null;
  st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;st.bigQ=[];
  st.wageMult=(o&&o.wm)||1;
  return st;
}
/* ① 到期窗：当前队条款保底 */
var st=mk(1001,{wm:1.6,CL:0});
var cur=st.teamId;
window.SIM.makeTransfer(false,false);
var t1=st._offerTerms&&st._offerTerms[cur]||null;
out.windowHasTerms=!!t1;
out.windowMult=t1?t1.mult:null;
var ct=window.SIM.teamById(cur);
out.windowWageOk=!!(t1&&ct&&t1.wage===window.SIM.annualWage(ct,window.SIM.leagueOfTeam(ct),t1.mult));
/* 无保底时的对照：其他队的系数不受影响（只 1 个暂不比较，检查存在性） */
out.offerCount=st.pending&&st.pending.offers?st.pending.offers.length:0;

/* ② 纯续约窗：事件给 {wage:0.8,years:1} → 年限抬到 2 */
var st2=mk(1002,{wm:1.0,CL:3});
window.SIM.applyResult({openContract:{wage:0.8,years:1}});
out.dueFlag=!!st2.flags._contractDue;
var ren=null,g=0;
function resolve(p){
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0); return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ return; }
  if(t==='academy'||t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
  window.SIM.nextStep();
}
while(g++<3000){
  var p=st2.pending;
  if(!p){ if(st2.phase==='summary'||st2.phase==='done')break; try{window.SIM.nextStep();}catch(e){out.err=String(e).slice(0,80);break;} continue; }
  if(p.type==='transfer'&&p.renewOnly){ ren=p; break; }
  try{ resolve(p); }catch(e){ out.err=String(e).slice(0,80); break; }
}
var t2=st2._offerTerms&&st2._offerTerms[st2.teamId]||null;
out.renewSeen=!!ren;
out.renewYears=t2?t2.years:null;
out.renewMult=t2?t2.mult:null;
return JSON.stringify(out);
})()
""".replace('%P%', P)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(not r.get('err'), 'runtime error: %s' % r.get('err'))
    harness.check(r['windowHasTerms'], '到期窗口没给当前队条款: %s' % r)
    harness.check(r['windowMult'] is not None and r['windowMult'] >= 1.6 - 1e-9,
                  '当前队条款未做现工资保底: mult=%s' % r['windowMult'])
    harness.check(r['windowWageOk'], '当前队条款 wage 与 mult 不一致: %s' % r)
    harness.check(r['dueFlag'], 'openContract 未置 _contractDue: %s' % r)
    harness.check(r['renewSeen'], '未进入纯续约窗: %s' % r)
    harness.check(r['renewYears'] is not None and r['renewYears'] >= 2,
                  '续约年限未抬到 >=2: %s' % r['renewYears'])
    harness.check(r['renewMult'] is not None and 0.6 <= r['renewMult'] <= 0.95,
                  '降薪续约系数异常(应≈0.8*0.9~1.1): %s' % r['renewMult'])
    print('PASS renewal_wage (到期窗当前队 mult=%s wage一致=%s | 续约 years=%s mult=%s)'
          % (r['windowMult'], r['windowWageOk'], r['renewYears'], r['renewMult']))


if __name__ == '__main__':
    harness.main(run)
