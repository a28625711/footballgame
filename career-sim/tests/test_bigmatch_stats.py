# -*- coding: utf-8 -*-
"""互动大场面数据折算回归：
- 旧随机 +1(ad()<0.4 位置锁)已替换为按比赛事件(_meG 进球/_meA 助攻)折算；
  俱乐部场次记俱乐部赛季、国家队场次记 natStats，GK 零封计 cs
- 不变量：每季进球/助攻为有限非负数；进球+助攻不冲破球队赛季 gf 上限(容差 A-轻量)"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

CAREERS = 4

JS = r"""
function career(seed, pos){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':pos,'nation':'cn','talent':1.15,'number':9,'foot':'r'},seed);
  au.ovr=90; au.maxOvr=95; au.money=800; au.age=21; au.phase='career';
  au.teamId='rma'; au.role='starter'; au.contractLeft=20; au.seasonsAtClub=1;
  au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  var errs=[],big=0;
  for(var yr=0; yr<6 && au.phase==='career'; yr++){
    try{ window.SIM.doPeriod(); }catch(e){ errs.push('period:'+String(e).slice(0,150)); break; }
    var guard=0;
    while(au.pending&&guard++<300){
      var p=au.pending;
      try{
        if(p.type==='bigmatch'){ big++; if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(['left','right','top','push','hold','run','solo','wall'][Math.floor(Math.random()*8)]);} }
        else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
        else if(p.type==='report'){ window.SIM.nextStep(); }
        else if(p.type==='staff'){ window.SIM.choose('skip'); }
        else if(p.type==='transfer'){ window.SIM.choose('stay'); }
        else { window.SIM.nextStep(); }
      }catch(e){ errs.push('p:'+String(e).slice(0,150)); break; }
    }
  }
  var viol=[];
  au.seasons.forEach(function(s,i){
    var flds=['goals','assists','cs','ga','leagueGF','leagueGA'];
    for(var j=0;j<flds.length;j++){var v=s[flds[j]];if(v!=null&&(!isFinite(v)||v<0))viol.push('neg_'+flds[j]+'_'+i);}
    if(s['leagueGF']>0&&s['goals']+s['assists']>s['leagueGF']+2)viol.push('over_gf_'+i+'_'+s['goals']+'+'+s['assists']+'>'+s['leagueGF']);
    if(s['natGoals']!=null&&(!isFinite(s['natGoals'])||s['natGoals']<0))viol.push('neg_nat_'+i);
  });
  var ns=au['natStats']||{};
  for(var k in ns)if(!isFinite(ns[k])||ns[k]<0)viol.push('neg_natStats_'+k);
  return {errs:errs,big:big,viol:viol};
}
function run(seed,pos){ return JSON.stringify(career(seed,pos)); }
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)
    all_errs, all_viol = [], []
    total_big = 0
    for i in range(CAREERS):
        pos = ['ST', 'GK', 'AM', 'CD'][i]
        r = json.loads(mr.eval('run(%d,"%s")' % (5520 + i * 733, pos)))
        all_errs.extend(r['errs'])
        all_viol.extend(r['viol'])
        total_big += r['big']
    print('bigmatches resolved=%d  careers=%d' % (total_big, CAREERS))
    if all_errs:
        raise SystemExit('engine errors: %s' % all_errs[:5])
    assert not all_viol, all_viol[:8]
    assert total_big >= 1, 'no big matches resolved in probe'
    print('PASS bigmatch_stats (折算无错误/数值有限/未冲破 gf 上限/国家队字段正常)')
    print('PASS')


if __name__ == '__main__':
    main()
