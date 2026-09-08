# -*- coding: utf-8 -*-
"""联赛冠军一致性回归：
季末德比/保级大战可能被抽成大场面并在赛季中改分重排积分榜。
冠军/赛季记录/历史榜必须基于最终榜结算：
- 最终榜第 1（且非主力以下）必有 <联赛>冠军，无重复
- 非第 1 不拿联赛冠军；bench/sub 不计冠军（沿用原 rank>=2 口径）"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

SEASONS = 7

JS = r"""
(function(){
var _seed=20260908;
function rnd(){_seed=(_seed*1103515245+12345)&0x7fffffff;return _seed/0x7fffffff;}
var errs=[];
var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.15,'number':9,'foot':'r'},5511);
au.ovr=88; au.maxOvr=94; au.money=800; au.age=21; au.phase='career';
au.teamId='rma'; au.role='starter'; au.contractLeft=20; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
for(var yr=0; yr<%d && au.phase==='career'; yr++){
  try{ window.SIM.doPeriod(); }catch(e){ errs.push('period:'+String(e).slice(0,150)); break; }
  var guard=0;
  while(au.pending&&guard++<200){
    var p=au.pending;
    try{
      if(p.type==='bigmatch'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(['push','hold','run','start','left','right'][Math.floor(rnd()*6)]);} }
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
  if(s.leaguePos==null)return;
  var cn=s.league?String(s.league)+'冠军':null;
  var got=cn?(s.trophies||[]).indexOf(cn)>=0:false;
  var lowRank=(s.role==='bench'||s.role==='sub');
  if(cn&&s.leaguePos===1&&!got&&!lowRank)viol.push('pos1_no_champ_'+i+'_'+s.role);
  if(cn&&got&&s.leaguePos>1&&!lowRank)viol.push('champ_but_pos'+s.leaguePos+'_'+i);
  if(cn&&got&&lowRank)viol.push('lowrank_has_champ_'+i+'_'+s.role);
  var dup=(s.trophies||[]).filter(function(t,j){return t===cn&&(s.trophies||[]).indexOf(t)<j;});
  if(dup.length)viol.push('dup_champ_'+i);
});
return JSON.stringify({viol:viol,errs:errs});
})()
""" % SEASONS


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(JS))
    if res['errs']:
        raise SystemExit('errors: %s' % res['errs'])
    assert not res['viol'], res['viol']
    print('PASS champion_final (leaguePos===1 ⇔ 冠军, 无重复/无误发)')
    print('PASS')


if __name__ == '__main__':
    run()
