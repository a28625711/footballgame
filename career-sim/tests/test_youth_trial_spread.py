# -*- coding: utf-8 -*-
"""青训「报名试训」去向回归：
- 候选应为五大联赛中所有比当前营更强且学费付得起的队（rep 加权随机），
  不能因 sort+slice(0,3) 永远只落在英超三家顶豪(mci/lfc/ars)
- 断言：多次成功后，去向覆盖 ≥3 个不同五大联赛，且并非只有英超 top3"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

TRIES = 300
MIN_PASS = 30
MIN_LEAGUES = 3

JS = r"""
function run(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.15,'number':9,'foot':'r'},seed);
  au.phase='youth'; au.age=14; au.ovr=92; au.talent=1.5;
  var dests={},leagues={},passes=0,errs=[];
  for(var i=0;i<300;i++){
    au.money=100000000; au.youthTeamId='cn-wh'; au.teamId='cn-wh'; au.flags={};
    var r;
    try{ r=window.SIM.youthTrial(); }catch(e){ errs.push(String(e).slice(0,120)); break; }
    if(!r||!r.ok)continue;
    if(!r.up){ continue; }
    passes++;
    var tid=au.youthTeamId;
    dests[tid]=(dests[tid]||0)+1;
    try{
      var t=window.SIM.teamById(tid);
      var lg=window.SIM.leagueOfTeam(t)?window.SIM.leagueOfTeam(t).id:'?';
      leagues[lg]=(leagues[lg]||0)+1;
    }catch(e){ errs.push('lg:'+String(e).slice(0,80)); }
  }
  return JSON.stringify({passes:passes,leagues:leagues,dests:dests,errs:errs});
}
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)
    r = json.loads(mr.eval('run(7331)'))
    print('passes=%d leagues=%s' % (r['passes'], sorted(r['leagues'].items())))
    if r['errs']:
        raise SystemExit('engine errors: %s' % r['errs'][:3])
    assert r['passes'] >= MIN_PASS, 'not enough successful trials: %d' % r['passes']
    big = [k for k in r['leagues'] if k in ('epl', 'liga', 'seri', 'bund', 'l1')]
    assert len(big) >= MIN_LEAGUES, 'trial destinations stuck in too few leagues: %s' % sorted(big)
    assert not (len(big) == 1 and big == ['epl']), 'trial stuck at EPL only (regression of sort+slice top3)'
    print('PASS youth_trial_spread (去向覆盖 %d 个五大联赛, 非唯英超顶豪)' % len(big))
    print('PASS')


if __name__ == '__main__':
    main()
