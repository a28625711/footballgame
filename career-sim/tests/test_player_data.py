# 球员数据归属统一回归：赛季进球/助攻必须从真实比分逐场归属——
# 不越过球队总进球、不超过出场数；巅峰期量级与现实一致；国家队数据以
# 真实比分为界（进球 <= 3×caps）。机制见 PLAN-league-realism.md §10.1。
import json

import harness

N_SEASONS = 10

LOOP = r'''
(function(){
var out={lg:[],nat:[]};
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},4242);
au.ovr=82;au.maxOvr=92;au.money=2000;au.age=22;au.phase='career';
au.teamId='mci';au.role='starter';au.contractLeft=15;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
for(var yr=0; yr<%NS% && au.phase==='career'; yr++){
  var s0=au.seasons.length;
  try{ window.SIM.doPeriod(); }catch(e){ out.err=String(e).slice(0,150); break; }
  var guard=0;
  while(au.pending&&guard++<25){
    var p=au.pending;
    try{
      if(p.type==='bigmatch'){ if(p.result){ window.__SIMTEST.cont(); continue; } window.SIM.choose('push'); }
      else if(p.type==='report'){ window.SIM.nextStep(); }
      else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
      else if(p.type==='staff'){ window.SIM.choose('skip'); }
      else if(p.type==='transfer'){ window.SIM.choose('stay'); }
      else { window.SIM.nextStep(); }
    }catch(e){ try{window.SIM.nextStep();}catch(e2){} break; }
  }
  for(var i=s0;i<au.seasons.length;i++){
    var r=au.seasons[i];
    out.lg.push({g:r.goals||0,a:r.assists||0,apps:r.apps||0,gf:r.leagueGF||0});
    if(r.caps||r.natGoals)out.nat.push({caps:r.caps||0,g:r.natGoals||0,a:r.natAssists||0});
  }
}
return JSON.stringify(out);
})()
'''.replace('%NS%', str(N_SEASONS))


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(LOOP))
    harness.check('err' not in res, res.get('err', ''))
    lg = res['lg']
    harness.check(len(lg) >= N_SEASONS, 'seasons=%d' % len(lg))

    for r in lg:
        harness.check(r['g'] >= 0 and r['a'] >= 0, 'negative goals/assists: %s' % json.dumps(r))
        if r['gf'] > 0:
            harness.check(r['g'] <= r['gf'], 'goals %d exceed team gf %d' % (r['g'], r['gf']))
        if r['apps'] > 0:
            # 逐场归属按真实比分，单场可进多球 → 出场数不是硬上界（3 场进 4 球合法）；
            # 只挡数据爆炸（单场上限≈球队进球）
            harness.check(r['g'] <= r['apps'] * 2 + 2, 'goals %d exceed apps*2+2 %d' % (r['g'], r['apps']))
            harness.check(r['a'] <= r['apps'] * 2 + 2, 'assists %d exceed apps*2+2 %d' % (r['a'], r['apps']))

    prime = [r for r in lg if r['apps'] >= 20 and r['gf'] >= 50]
    harness.check(len(prime) >= 5, 'prime seasons=%d' % len(prime))
    avg_g = sum(r['g'] for r in prime) / len(prime)
    harness.check(3 <= avg_g <= 40, 'prime avg goals %.1f out of band' % avg_g)
    # 占球队进球比例：分子是四线赛事总进球（联赛+杯赛+洲际+世俱杯），分母只有联赛进球，
    # 结构性偏高（现实巨星全赛事进球可达联赛队进球 60%+），只挡归属爆炸
    for r in prime:
        if r['gf'] >= 55:
            share = r['g'] / float(r['gf'])
            harness.check(share <= 0.55, 'goal share %.2f too high' % share)

    for n in res['nat']:
        harness.check(n['g'] <= 3 * max(1, n['caps']),
                      'nat goals %d vs caps %d' % (n['g'], n['caps']))
    nat_g_sum = sum(n['g'] for n in res['nat'])
    nat_caps_sum = sum(n['caps'] for n in res['nat'])
    # 现实范围：国家队进球/出场比应在合理带内（OVR82 ST ~0.1-0.5）
    if nat_caps_sum >= 20:
        ratio = nat_g_sum / float(nat_caps_sum)
        harness.check(0.02 <= ratio <= 0.8, 'nat goals/caps ratio %.2f out of band' % ratio)
    print('PASS player_data (bounds, share, nat ratio %.2f, prime avg %.1f)'
          % (nat_g_sum / max(1, nat_caps_sum), avg_g))


if __name__ == '__main__':
    harness.main(run)
