# -*- coding: utf-8 -*-
"""转会报价回归：
1) 工资口径统一：offerBrief 的 wage 必须等于 annualWage（= 实发公式 aJ×mult×角色×年龄）
2) 联赛权重生效：把联赛权重设为默认时，五大联赛占比明显高于"权重全部置1"时"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
function mk(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.2,'number':9,'foot':'r'},seed);
  au.phase='career'; au.age=25; au.ovr=84; au.maxOvr=88; au.talent=1.2; au.money=1000;
  au.teamId='bay'; au.role='star'; au.contractLeft=2; au.seasonsAtClub=2; au.seasonsAbroad=3;
  au.roleAdjust=0; au.guanxi=50; au.lockAbroad=0; au.dreamId=null; au.flags={}; au.pending=null;
  return au;
}
function wageCheck(seed){
  mk(seed);
  var ids=['rma','mci','cn-sh','bar','bay','liv'];
  var bad=[];
  for(var i=0;i<ids.length;i++){
    var ob=window.SIM.offerBrief(ids[i]);
    var t=window.SIM.teamById(ids[i]);
    if(!ob||!t)continue;
    var lg=window.SIM.leagueOfTeam(t);
    var w=window.SIM.annualWage(t,lg,ob.mult);
    if(ob.wage!==w)bad.push(ids[i]+':'+ob.wage+'!='+w);
  }
  return bad;
}
function dist(seed,uniform){
  mk(seed);
  if(uniform)for(var k in window.SIM.leagueWeights)window.SIM.leagueWeights[k]=1;
  var cnt={},top=0,tot=0;
  for(var i=0;i<3000;i++){
    var arr=window.SIM.pickOffers(6);
    for(var j=0;j<arr.length;j++){
      var lg=window.SIM.leagueOfTeam(arr[j]);
      if(!lg)continue;
      cnt[lg.id]=(cnt[lg.id]||0)+1;tot++;
      if(['epl','liga','seri','bund','l1'].indexOf(lg.id)>=0)top++;
    }
  }
  return JSON.stringify({top:tot?top/tot:0,tot:tot});
}
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)
    bad = json.loads(mr.eval('JSON.stringify(wageCheck(4242))'))
    assert not bad, 'wage mismatch: %s' % bad
    print('wage unified OK (offerBrief.wage === annualWage)')
    d0 = json.loads(mr.eval('dist(4243,false)'))
    d1 = json.loads(mr.eval('dist(4244,true)'))
    print('top5 share default=%.3f  uniform=%.3f' % (d0['top'], d1['top']))
    assert d0['tot'] > 1000 and d1['tot'] > 1000
    assert d0['top'] > d1['top'] + 0.05, 'league weights not shifting distribution'
    print('PASS transfer_offers (工资口径统一 + 联赛权重生效)')
    print('PASS')


if __name__ == '__main__':
    main()
