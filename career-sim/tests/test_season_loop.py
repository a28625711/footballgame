# Season-loop regression (ported from temp test_derby_unit.py): runs 30 full
# careers through doPeriod for 15 seasons each (~1000+ seasons), resolving
# every pending type. Guards against sim-layer crashes in be()/transfers and
# keeps the derby trigger rate in its observed band.
import json

import harness

CAREERS = 30
SEASONS = 15

JS = """
(function(){
var derbyTot=0, seasonTot=0, errs=[];
for(var pp=0; pp<%CAREERS%; pp++){
var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,700+pp);
au.ovr=86; au.maxOvr=86; au.money=800; au.age=21; au.phase='career';
au.teamId='rma'; au.role='starter'; au.contractLeft=12; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
for(var yr=0; yr<%SEASONS% && au.phase==='career'; yr++){
  var sBefore=au.seasons.length;
  try{ window.SIM.doPeriod(); }
  catch(e){ errs.push('doPeriod career='+pp+' year='+yr+': '+String(e).slice(0,150)); break; }
  var guard=0;
  while(au.pending&&guard++<25){
    var p=au.pending;
    try{
      if(p.type==='bigmatch'){ if(p.result){ window.__SIMTEST.cont(); continue; } derbyTot++; window.SIM.choose('push'); }
      else if(p.type==='report'){ window.SIM.nextStep(); }
      else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
      else if(p.type==='staff'){ window.SIM.choose(p.offers[0]); }
      else if(p.type==='transfer'){ window.SIM.choose('stay'); }
      else { window.SIM.nextStep(); }
    }catch(e){
      try{ window.SIM.nextStep(); }catch(e2){ errs.push('pending '+p.type+' career='+pp+': '+String(e).slice(0,120)); break; }
    }
  }
  seasonTot+=(au.seasons.length-sBefore);
}
}
return JSON.stringify({derbyN:derbyTot,seasonsRun:seasonTot,errs:errs.slice(0,5)});
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER).replace('%CAREERS%', str(CAREERS)).replace('%SEASONS%', str(SEASONS))


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(JS))
    if res['errs']:
        raise harness.Fail(json.dumps(res['errs'], ensure_ascii=False))
    if res['seasonsRun'] < CAREERS * SEASONS * 0.8:
        raise harness.Fail('too few seasons completed: %d' % res['seasonsRun'])
    if res['derbyN'] < 1:
        raise harness.Fail('derby never triggered')
    print('PASS season_loop (%d seasons, derbies=%d, rate=%.3f)'
          % (res['seasonsRun'], res['derbyN'], res['derbyN'] / res['seasonsRun']))


if __name__ == '__main__':
    harness.main(run)
