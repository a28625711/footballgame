# -*- coding: utf-8 -*-
"""联赛平衡回归：跑 80 季，断言各联赛强度分布稳定、无球队无限变强、repOf 覆盖有界。

强度 = league.str + (rep-2)*3 + dev（rep 用 repOf 覆盖）。repOf 每季向 base 缓慢回归，
所以升降级带来的档位偏移会随年头淡化，联赛格局不会长期失衡。
"""
import json
import harness

JS = """
(function(){
var D=window.DATA;
function lgOfId(id){for(var i=0;i<D.LEAGUES.length;i++)if(D.LEAGUES[i].id===id)return D.LEAGUES[i];return null;}
function strength(au,t){
  var lgId=(au.leagueOf&&au.leagueOf[t.id])||t.league;
  var lg=lgOfId(lgId);var base=(lg&&lg.str)||60;
  var rep=(au.repOf&&au.repOf[t.id]!=null)?au.repOf[t.id]:t.rep;
  var dev=(au.teamDev&&au.teamDev[t.id])||0;
  return base+(rep-2)*3+dev;
}
function snapshot(au,yr){
  var out={yr:yr,repOf:Object.keys(au.repOf||{}).length,moves:(au.lgMoves||[]).length,lg:{},gmax:0,gmin:999,repMax:0,repMin:9};
  for(var li=0;li<D.LEAGUES.length;li++){
    var lg=D.LEAGUES[li],vals=[];
    for(var ti=0;ti<D.TEAMS.length;ti++){var t=D.TEAMS[ti];
      var lid=(au.leagueOf&&au.leagueOf[t.id])||t.league;if(lid===lg.id)vals.push(strength(au,t));}
    if(vals.length){var sm=0;for(var v=0;v<vals.length;v++){sm+=vals[v];if(vals[v]>out.gmax)out.gmax=vals[v];if(vals[v]<out.gmin)out.gmin=vals[v];}
      if(lg.id==='epl'||lg.id==='csl'||lg.id==='ch')out.lg[lg.id]=Math.round(sm/vals.length);}
  }
  if(au.repOf)for(var rk in au.repOf){var rv=au.repOf[rk];if(rv>out.repMax)out.repMax=rv;if(rv<out.repMin)out.repMin=rv;}
  return out;
}
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'right'},1);
au.age=27;au.ovr=80;au.maxOvr=90;au.phase='career';au.teamId='mci';au.role='starter';
au.contractLeft=50;au.seasonsAtClub=3;au.roleAdjust=0;au.guanxi=50;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
var snaps=[],err=null;
for(var s=0;s<=80;s++){
  if(s%20===0)snaps.push(snapshot(au,s));
  au.age=27;au.ovr=80;au.contractLeft=50;au.pending=null;au._awardDue=false;au._promoDue=false;au.bigQ=[];
  try{window.SIM.simulateOneSeason();}catch(e){err='season '+s+': '+String(e).slice(0,150);break;}
}
return JSON.stringify({snaps:snaps,err:err});
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    snaps = r['snaps']
    if len(snaps) < 4:
        raise harness.Fail('too few snapshots: %d' % len(snaps))
    epl = [s['lg']['epl'] for s in snaps]
    csl = [s['lg']['csl'] for s in snaps]
    # 1) 联赛平均强度不漂移
    if max(epl) - min(epl) > 8:
        raise harness.Fail('EPL avg drifted: %r' % epl)
    if max(csl) - min(csl) > 8:
        raise harness.Fail('CSL avg drifted: %r' % csl)
    # 2) 全局强度有界（无球队无限变强）
    gmax = max(s['gmax'] for s in snaps)
    gmin = min(s['gmin'] for s in snaps)
    if gmax > 105 or gmin < 25:
        raise harness.Fail('global strength out of bounds: %d..%d' % (gmin, gmax))
    # 3) repOf 覆盖有界（回归+删除生效，不会无限累积），且确实发生过升降级
    reps = [s['repOf'] for s in snaps]
    if max(reps) > 300:
        raise harness.Fail('repOf exploded: %r' % reps)
    if max(reps) == 0:
        raise harness.Fail('no repOf overrides ever (promotion/relegation not running?)')
    if snaps[-1]['moves'] < 300:
        raise harness.Fail('too few moves: %d' % snaps[-1]['moves'])
    # 4) repOf 值始终在合理区间
    rmax = max(s['repMax'] for s in snaps)
    rmin = min(s['repMin'] for s in snaps)
    if rmax > 5.001 or rmin < -0.001:
        raise harness.Fail('repOf value out of range: %.2f..%.2f' % (rmin, rmax))
    print('PASS league_balance (80yr: EPL avg %d-%d, CSL avg %d-%d, global %d-%d, repOf %d-%d)'
          % (min(epl), max(epl), min(csl), max(csl), gmin, gmax, min(reps), max(reps)))


if __name__ == '__main__':
    harness.main(run)
