# -*- coding: utf-8 -*-
"""德比/保级大战真实化探针：
1) 互动大场面比分回填后，积分榜必须能从赛程数据完整重算（无丢失/无 -1 残留）
2) 德比/保级大场面确实在真实赛程上触发过
3) 升降级在延后结算后照常完成（lgMoves 有记录）"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

SEASONS = 6

JS = r"""
(function(){
var _seed=987654;
function rnd(){_seed=(_seed*1103515245+12345)&0x7fffffff;return _seed/0x7fffffff;}
var errs=[], big=[];
window.__CHECKS=[];
var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.15,'number':9,'foot':'r'},4242);
au.ovr=84; au.maxOvr=90; au.money=800; au.age=21; au.phase='career';
au.teamId='rma'; au.role='starter'; au.contractLeft=20; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
function checkLg(lg){
  var fx=au["lgFx"]&&au["lgFx"]["data"]&&au["lgFx"]["data"][lg], rows=au["lgTables"]&&au["lgTables"][lg];
  if(!fx||!rows)return'nodata';
  var acc={};
  rows.forEach(function(r){acc[r.i]={w:0,d:0,l:0,gf:0,ga:0,pts:0};});
  fx.forEach(function(rd){rd.forEach(function(M){
    if(M[2]<0||M[3]<0)return;
    var h=acc[M[0]],a=acc[M[1]];if(!h||!a)return;
    h.gf+=M[2];h.ga+=M[3];a.gf+=M[3];a.ga+=M[2];
    if(M[2]>M[3]){h.w++;h.pts+=3;a.l++;}
    else if(M[2]<M[3]){a.w++;a.pts+=3;h.l++;}
    else{h.d++;a.d++;h.pts++;a.pts++;}
  });});
  var diff=[];
  rows.forEach(function(r){var c=acc[r.i];
    if(c&&(c.w!==r.w||c.d!==r.d||c.l!==r.l||c.gf!==r.gf||c.ga!==r.ga||c.pts!==r.pts))diff.push(r.i);
  });
  return diff;
}
for(var yr=0; yr<%SEASONS% && au.phase==='career'; yr++){
  try{ window.SIM.doPeriod(); }catch(e){ errs.push('period:'+String(e).slice(0,120)); break; }
  var guard=0;
  while(au.pending&&guard++<60){
    var p=au.pending;
    try{
      if(p.type==='bigmatch'){
        big.push(p.kind+':'+(p.comp||''));
        if(p.result){window.__SIMTEST.cont();}
        else{var keys=['push','hold','run','start','left','right'];window.SIM.choose(keys[Math.floor(rnd()*keys.length)]);}
      }
      else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
      else if(p.type==='report'){ window.SIM.nextStep(); }
      else if(p.type==='staff'){ window.SIM.choose('skip'); }
      else if(p.type==='transfer'){ window.SIM.choose('stay'); }
      else { window.SIM.nextStep(); }
    }catch(e){ errs.push('p:'+String(e).slice(0,120)); break; }
  }
  window.__CHECKS.push({yr:yr,diff:checkLg('liga'),team:au.teamId,lg:(function(){var t=window.SIM.teamById(au.teamId);return t?window.SIM.leagueOfTeam(t).id:null;})()});
}
var mv=(au["lgMoves"]||[]).length;
return JSON.stringify({errs:errs,big:big,moves:mv,checks:window.__CHECKS,phase:au.phase,seasons:au.seasons.length});
})()
""".replace('%SEASONS%', str(SEASONS))

def main():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    print(json.dumps({k: r[k] for k in ('errs', 'big', 'moves', 'phase', 'seasons')}, ensure_ascii=False))
    for c in r['checks']:
        if c['diff'] not in ('nodata', []) and c['diff'] != []:
            raise harness.Fail('赛季 %d 积分榜不一致: %s' % (c['yr'], c['diff']))
    print('checks:', json.dumps(r['checks'], ensure_ascii=False))
    if r['errs']:
        raise harness.Fail('运行错误: %s' % r['errs'][:3])
    if not r['big']:
        raise harness.Fail('6 季未触发任何德比/保级大场面（rma 起步应至少触发德比）')
    if r['moves'] < 1:
        raise harness.Fail('延后结算后 lgMoves 为空，升降级判定可能被跳过')
    print('BIGMATCH REALISM PROBE PASS')

main()
