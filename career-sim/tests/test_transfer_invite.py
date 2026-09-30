# -*- coding: utf-8 -*-
# 回归：转会邀约三件事
#  1) 高价联赛工资系数（_lgPay）：同 rep 下沙特联/美职联 > 普通联赛
#  2) 展示口径(_wageOf/annualWage)必须含合同系数 wageMult（旧版忽略 → 玩家看到低薪）
#  3) 按联赛挑邀约 + 受邀队进转会窗且合同 >=3 年（沿用 vet.ev.js 的邀约机制）
#  4) 两个新事件存在且 when 门控正确
import json

import harness

JS = r"""
(function(){
var L=window.DATA.LEAGUES,LB={},i;
for(i=0;i<L.length;i++)LB[L[i].id]=L[i];
var out={};
function w(lg,teamRep,ovr){
  return window.SIM.wageAt({rep:teamRep},{id:lg,rep:LB[lg].rep,cn:LB[lg].cn},ovr);
}
/* 1) 工资系数（同 rep 对比） */
out.paySplRep3=Math.round(w('spl',3,88));
out.payEreRep3=Math.round(w('ere',3,88));      /* 同 rep3 但不在 _lgPay */
out.payMlsRep2=Math.round(w('mls',2,88));
out.payJupRep2=Math.round(w('jup',2,88));      /* 同 rep2 但不在 _lgPay */
out.payCslRep2=Math.round(w('csl',2,88));

var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'};
function mk(s){var st=window.__SIMTEST.start('normal',P,s);
  st.ovr=88;st.maxOvr=96;st.money=800;st.age=24;st.phase='career';st.teamId='mci';
  st.role='star';st.contractLeft=3;st.seasonsAtClub=2;st.roleAdjust=0;st.guanxi=50;
  st.youthTeamId=null;st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;st.bigQ=[];
  return st;}
/* 2) 展示口径含合同系数 */
var st=mk(71),me=window.SIM.teamById('mci'),lg=LB['epl'];
st.wageMult=1;out.disp1=window.SIM.annualWage(me,lg);
st.wageMult=2;out.disp2=window.SIM.annualWage(me,lg);

/* 3) 按联赛挑邀约池 */
function pool(spec){var p=window.SIM.vetInvitePool(spec),ok=true,leagues={};
  for(var k=0;k<p.length;k++){var t=p[k];leagues[t.league]=1;
    if(spec.lg){var want=[].concat(spec.lg);if(want.indexOf(t.league)<0)ok=false;}
    if(spec.minRep!=null&&t.rep<spec.minRep)ok=false;}
  return{ok:ok,n:p.length,leagues:Object.keys(leagues)};}
st=mk(72);
out.poolSpl=pool({lg:'spl',minRep:3});
out.poolBig5=pool({lg:['epl','liga','bund','seri','l1'],minRep:4});

/* 4) 事件存在 + when 门控 */
var E=window.EVENTS,by={};
for(var j=0;j<E.length;j++)by[E[j].id]=E[j];
out.hasVet=!!by['vet_payday'];out.hasYoung=!!by['bigclub_call'];
st=mk(73);st.age=34;
out.whenVet=!!by['vet_payday'].when({age:34,inAcademy:false,leagueRep:5,ovr:86,clubRep:5});
st=mk(74);st.age=21;st.ovr=84;st.teamId='cn-cd';
out.whenYoung=!!by['bigclub_call'].when({age:21,inAcademy:false,leagueRep:2,ovr:84,clubRep:3});
/* 门控反例 */
st=mk(76);st.age=34;
out.whenVetLowLeague=!!by['vet_payday'].when({age:34,inAcademy:false,leagueRep:2,ovr:86,clubRep:5});

/* 5) 受邀队进转会窗 + 合同 >=3 年 + wage 与条款一致 */
st=mk(75);st.age=34;st.ovr=86;st.teamId='mci';
st.flags._vetInviteTeam='cn-cd';
window.SIM.makeTransfer(false,false);
out.pendingType=st.pending&&st.pending.type||null;
out.offers=st.pending&&st.pending.offers||[];
out.invited=out.offers.indexOf('cn-cd')>=0;
var t2=window.SIM.teamById('cn-cd');
out.invTerms=(st._offerTerms&&st._offerTerms['cn-cd'])||null;
out.invWageOk=!!(out.invTerms&&t2&&out.invTerms.wage===window.SIM.annualWage(t2,LB[t2.league],out.invTerms.mult));
out.invFlagCleared=!st.flags._vetInviteTeam;
return JSON.stringify(out);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r['paySplRep3'] > r['payEreRep3'],
                  '沙特联(rep3) 工资未高于同级普通联赛: %s' % r)
    harness.check(r['payMlsRep2'] > r['payJupRep2'],
                  '美职联(rep2) 工资未高于同级普通联赛: %s' % r)
    harness.check(r['disp2'] >= r['disp1'] * 1.9,
                  '展示工资未含合同系数 wageMult: %s' % r)
    harness.check(r['poolSpl']['ok'] and r['poolSpl']['n'] > 0, '沙特邀约池为空/混入他联赛: %s' % r['poolSpl'])
    harness.check(r['poolBig5']['ok'] and r['poolBig5']['n'] > 0, '五大豪门邀约池为空/门槛不对: %s' % r['poolBig5'])
    harness.check(r['hasVet'] and r['hasYoung'], '新事件缺失: %s' % r)
    harness.check(r['whenVet'], 'vet_payday 门控未命中(vet+五大): %s' % r)
    harness.check(r['whenYoung'], 'bigclub_call 门控未命中(年轻+高ovr): %s' % r)
    harness.check(not r['whenVetLowLeague'], 'vet_payday 不该在非五大联赛触发: %s' % r)
    harness.check(r['pendingType'] == 'transfer', '未开出转会窗: %s' % r)
    harness.check(r['invited'], '受邀队未出现在转会窗报价里: %s' % r)
    harness.check(r['invTerms'] and r['invTerms']['years'] >= 3,
                  '受邀合同不足 3 年: %s' % r['invTerms'])
    harness.check(r['invWageOk'], '受邀条款 wage 与 mult 不一致: %s' % r)
    harness.check(r['invFlagCleared'], '邀约标记未被清除(会被反复使用): %s' % r)
    print('PASS transfer_invite (spl=%s vs ere=%s | mls=%s vs jup=%s | 展示 %s->%s | '
          'poolSpl=%d poolBig5=%d | 受邀 %s years=%s)'
          % (r['paySplRep3'], r['payEreRep3'], r['payMlsRep2'], r['payJupRep2'],
             r['disp1'], r['disp2'], r['poolSpl']['n'], r['poolBig5']['n'],
             r['invited'], r['invTerms'] and r['invTerms']['years']))


if __name__ == '__main__':
    harness.main(run)
