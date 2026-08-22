import sys, json
sys.stdout.reconfigure(encoding='utf-8')
import harness

CAREERS = 24

JS = """
(function(){
var tally={},seasons=0,ballonAges=[],errs=[];
function mk(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},seed);
  au.age=21; au.phase='career'; au.teamId='mci'; au.role='star';
  au.ovr=92; au.maxOvr=92; au.money=500; au.guanxi=50; au.clean=70; au.fame=50;
  au.caps=0; au.natStats={goals:0,assists:0,cs:0,ga:0}; au.natRuns=[];
  au.banned=false; au.banLeft=0; au.banGames=0;
  au.contractLeft=15; au.seasonsAtClub=1; au.roleAdjust=0;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  return au;
}
for(var s=3000;s<3000+%CAREERS%;s++){
  var au=mk(s),g=0,sBefore=au.seasons.length;
  while(g++<8000){
    var p=au.pending;
    if(!p){
      if(au.phase==='summary'||au.phase==='done'||au.age>=35) break;
      try{ window.SIM.nextStep(); }catch(e){ errs.push(s+':'+String(e).slice(0,100)); break; }
      continue;
    }
    try{
      if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
      else if(p.type==='report'){ window.__SIMTEST.cont(); }
      else if(p.type==='bigmatch'){ if(!p.result){window.SIM.choose('push');} window.__SIMTEST.cont(); }
      else if(p.type==='staff'){ window.SIM.choose(p.offers[0]); }
      else if(p.type==='transfer'){
        if(p.offers&&p.offers.length){
          // stay at mci whenever possible to keep the profile stable
          var hasMci=p.offers.indexOf('mci')>=0;
          window.SIM.choose(hasMci?'mci':'stay');
        } else { window.SIM.choose(p.canStay?'stay':'retire'); }
      }
      else if(p.type==='academy'){ window.SIM.choose(0); }
      else if(p.type==='youth_path'){ window.SIM.choose(0); }
      else if(p.type==='retire_forced'){ window.SIM.choose('retire'); }
      else { window.SIM.nextStep(); }
    }catch(e){ try{window.SIM.nextStep();}catch(e2){ errs.push(s+' '+p.type+':'+String(e).slice(0,80)); break; } }
    if(au.phase==='summary'||au.phase==='done') break;
  }
  var n=au.seasons.length-sBefore;
  seasons+=n;
  for(var i=0;i<(au.awards||[]).length;i++){
    var nm=au.awards[i].name;
    tally[nm]=(tally[nm]||0)+1;
    if(nm==='金球奖')ballonAges.push(au.awards[i].age);
  }
}
return JSON.stringify({tally:tally,seasons:seasons,ballonAges:ballonAges,errs:errs.slice(0,5)});
})()
""".replace('%CAREERS%', str(CAREERS))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['errs']:
        raise harness.Fail(json.dumps(r['errs'], ensure_ascii=False))
    print('careers=%d seasons=%d' % (CAREERS, r['seasons']))
    for nm in sorted(r['tally'], key=lambda k: -r['tally'][k]):
        c = r['tally'][nm]
        print('  %-10s %3d  (%.1f%% of seasons)' % (nm, c, 100.0 * c / r['seasons']))
    ba = r['ballonAges']
    print('金球奖 ages:', ba)
    rate = len(ba) / r['seasons']
    print('金球率 %.1f%% per season (%d/%d)' % (100 * rate, len(ba), r['seasons']))
    # sanity: with the nerfed base weights a 92-ovr star at a rep-5 club should
    # not be showered with Ballons d'Or, but trophies still matter.
    if rate > 0.45:
        raise harness.Fail('ballon rate too high even after nerf: %.2f' % rate)


if __name__ == '__main__':
    harness.main(run)
