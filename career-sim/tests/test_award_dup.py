# Award dedupe regression: the deferred (big-match final) award path and the
# season-end path could both push the same league golden boot for one season
# (misdated via missing age arg). Runs many careers and asserts no award
# shares the same (name, age) with another, and that no 金靴 predates its
# season record.
import json

import harness

CAREERS = 40
SEASONS = 18

JS = """
(function(){
var _seed=1234567;
function rnd(){_seed=(_seed*1103515245+12345)&0x7fffffff;return _seed/0x7fffffff;}
var dup=[], errs=[], misdated=0, awardN=0;
for(var pp=0; pp<%CAREERS%; pp++){
var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,700+pp);
au.ovr=88+pp%5; au.maxOvr=94; au.money=800; au.age=20; au.phase='career';
au.teamId='rma'; au.role='starter'; au.contractLeft=20; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
var nTransfers=0;
for(var yr=0; yr<%SEASONS% && au.phase==='career'; yr++){
  try{ window.SIM.doPeriod(); }
  catch(e){ errs.push(String(e).slice(0,120)); break; }
  var guard=0;
  while(au.pending&&guard++<40){
    var p=au.pending;
    try{
      if(p.type==='bigmatch'){
        if(p.result){ window.__SIMTEST.cont(); continue; }
        var keys=['push','hold','run','start','left','right'];
        window.SIM.choose(keys[Math.floor(rnd()*keys.length)]);
      }
      else if(p.type==='report'){ window.SIM.nextStep(); }
      else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
      else if(p.type==='staff'){ window.SIM.choose('skip'); }
      else if(p.type==='transfer'){
        if(nTransfers<3&&p.offers&&p.offers.length){ nTransfers++; window.SIM.choose('0'); }
        else window.SIM.choose('stay');
      }
      else { window.SIM.nextStep(); }
    }catch(e){
      try{ window.SIM.nextStep(); }catch(e2){ break; }
    }
  }
}
var seen={}, seasonAges={};
au.seasons.forEach(function(s){ seasonAges[s.age]=1; });
(au.awards||[]).forEach(function(a){
  awardN++;
  var k=a.name+'@'+a.age;
  if(seen[k])dup.push(k);
  seen[k]=1;
  if(a.name.indexOf('金靴')>=0&&!seasonAges[a.age])misdated++;
});
}
return JSON.stringify({dup:dup.slice(0,5),dupN:dup.length,awardN:awardN,misdated:misdated,errs:errs.slice(0,3)});
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER).replace('%CAREERS%', str(CAREERS)).replace('%SEASONS%', str(SEASONS))


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(JS))
    if res['errs']:
        raise harness.Fail('sim errors: %s' % json.dumps(res['errs'], ensure_ascii=False))
    if res['dupN']:
        raise harness.Fail('duplicate awards: %s' % json.dumps(res['dup'], ensure_ascii=False))
    if res['misdated']:
        raise harness.Fail('golden boots dated outside played seasons: %d' % res['misdated'])
    if res['awardN'] < CAREERS * 2:
        raise harness.Fail('too few awards observed: %d' % res['awardN'])
    print('PASS award_dup (%d careers, %d awards, 0 duplicates)' % (CAREERS, res['awardN']))


if __name__ == '__main__':
    harness.main(run)
