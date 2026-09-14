# -*- coding: utf-8 -*-
"""联赛平衡回归：
(A) 有玩家 80 季：各联赛强度分布稳定、无球队无限变强、repOf 覆盖有界。
(B) 无玩家 200 季：dev 浮动自限（不顶满 +8）、冠军集中度不夸张（头名 ≤60%、≥5 支冠军）。

强度 = league.str + (rep-2)*3 + dev（rep 用 repOf 覆盖）。repOf 每季向 base 缓慢回归，
dev 每季衰减 + 超/欠预期漂移 + 冠军加成递减，所以都不会长期失衡。
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


WORLD_JS = """
(function(){
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'right'},20260913);
au.phase='youth';au.teamId=null;au.youthTeamId=null;au.age=14;au.pending=null;
var LGS=['epl','liga','seri','bund','l1'];
var champs={};for(var i=0;i<LGS.length;i++)champs[LGS[i]]=[];
var devMax=-99,devMin=99,peak=-99,devSum=0,devN=0,err=null;
for(var s=0;s<200;s++){
  try{window.SIM.simWorld();}catch(e){err='season '+s+': '+String(e).slice(0,150);break;}
  var lt=au.lastTables||{};
  for(var i=0;i<LGS.length;i++){var lg=LGS[i];if(lt[lg]&&lt[lg][0])champs[lg].push(lt[lg][0]);}
  for(var k in au.teamDev){var v=au.teamDev[k];if(v>devMax)devMax=v;if(v<devMin)devMin=v;if(v>peak)peak=v;devSum+=v;devN++;}
}
var out={devMax:Math.round(devMax*100)/100,devMin:Math.round(devMin*100)/100,peak:Math.round(peak*100)/100,devAvg:Math.round(devSum/devN*100)/100,err:err,lg:{}};
for(var i=0;i<LGS.length;i++){
  var lg=LGS[i],arr=champs[lg],cnt={};
  for(var j=0;j<arr.length;j++)cnt[arr[j]]=(cnt[arr[j]]||0)+1;
  var keys=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a];});
  out.lg[lg]={distinct:keys.length,n:arr.length,topShare:Math.round(100*cnt[keys[0]]/arr.length)};
}
return JSON.stringify(out);
})()
"""


def run_world(mr):
    r = json.loads(mr.eval(WORLD_JS))
    if r['err']:
        raise harness.Fail(r['err'])
    # dev 从不接近 +8 上限（自限机制生效，无球队被钉在顶）
    if r['peak'] >= 7.5:
        raise harness.Fail('a team pinned near dev cap: peak=%.2f' % r['peak'])
    # dev 有正有负、有界
    if not (-6.0 <= r['devMin'] and r['devMax'] <= 7.5):
        raise harness.Fail('dev range weird: %.2f..%.2f' % (r['devMin'], r['devMax']))
    # 冠军集中度不夸张
    for lg in ['epl', 'liga', 'seri', 'bund', 'l1']:
        d = r['lg'][lg]
        if d['n'] < 150:
            raise harness.Fail('%s too few seasons: %d' % (lg, d['n']))
        if d['topShare'] > 60:
            raise harness.Fail('%s too concentrated: top %d%%' % (lg, d['topShare']))
        if d['distinct'] < 5:
            raise harness.Fail('%s too few distinct champions: %d' % (lg, d['distinct']))
    tops = ' '.join('%s%d%%' % (lg, r['lg'][lg]['topShare']) for lg in ['epl', 'liga', 'seri', 'bund', 'l1'])
    print('PASS world_balance (200yr AI: dev %+.2f..%+.2f peak %+.2f, avg %+.2f; 头名 %s)'
          % (r['devMin'], r['devMax'], r['peak'], r['devAvg'], tops))


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
    # (B) 无玩家世界：dev 自限 + 冠军集中度
    run_world(harness.new_engine())


if __name__ == '__main__':
    harness.main(run)
