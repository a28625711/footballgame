import sys, json
sys.stdout.reconfigure(encoding='utf-8')
import harness

CAREERS = 20

JS = """
(function(){
var tally={asia:{afcpoy:0,seasons:0,awards:0},euro:{afcpoy:0,seasons:0,awards:0}},errs=[];
function mk(seed,teamId){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},seed);
  au.age=21; au.phase='career'; au.teamId=teamId; au.role='star';
  au.ovr=92; au.maxOvr=92; au.money=500; au.guanxi=50; au.clean=70; au.fame=50;
  au.caps=0; au.natStats={goals:0,assists:0,cs:0,ga:0}; au.natRuns=[];
  au.banned=false; au.banLeft=0; au.banGames=0;
  au.contractLeft=15; au.seasonsAtClub=1; au.roleAdjust=0;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  return au;
}
function run(batchIdx,teamId){
  for(var s=0;s<%CAREERS%;s++){
    var au=mk(50000+batchIdx*1000+s,teamId),g=0,sBefore=au.seasons.length;
    while(g++<8000){
      var p=au.pending;
      if(!p){
        if(au.phase==='summary'||au.phase==='done'||au.age>=32) break;
        try{ window.SIM.nextStep(); }catch(e){ errs.push(teamId+':'+String(e).slice(0,80)); break; }
        continue;
      }
      try{
        if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
        else if(p.type==='report'){ window.__SIMTEST.cont(); }
        else if(p.type==='bigmatch'){ if(!p.result){window.SIM.choose('push');}else{window.__SIMTEST.cont();} }
        else if(p.type==='staff'){ window.SIM.choose(p.offers[0]); }
        else if(p.type==='transfer'){
          if(p.offers&&p.offers.length){
            var home=p.offers.indexOf(teamId)>=0;
            window.SIM.choose(home?teamId:'stay');
          } else { window.SIM.choose(p.canStay?'stay':'retire'); }
        }
        else if(p.type==='academy'||p.type==='youth_path'){ window.SIM.choose(0); }
        else if(p.type==='retire_forced'){ window.SIM.choose('retire'); }
        else { window.SIM.nextStep(); }
      }catch(e){ try{window.SIM.nextStep();}catch(e2){ errs.push(teamId+' '+p.type+':'+String(e).slice(0,80)); break; } }
      if(au.phase==='summary'||au.phase==='done') break;
    }
    // Classify every season by the league actually played in, then attribute
    // awards to that bucket by matching ages.
    var ageToBucket={};
    for(var r2=sBefore;r2<au.seasons.length;r2++){
      var rec=au.seasons[r2],tm=window.SIM.teamById(rec.teamId);
      var lg=tm?window.SIM.leagueOfTeam(tm):null;
      var key=(lg&&lg['cont']==='亚冠')?'asia':'euro';
      tally[key].seasons++;
      ageToBucket[rec.age]=key;
    }
    for(var i=0;i<(au.awards||[]).length;i++){
      var aw=au.awards[i],bk=ageToBucket[aw.age]||'euro';
      tally[bk].awards++;
      if(aw.name==='亚洲足球先生')tally[bk].afcpoy++;
    }
  }
}
run(0,'cn-sh');
run(1,'mci');
return JSON.stringify({tally:tally,errs:errs.slice(0,4)});
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER).replace('%CAREERS%', str(CAREERS))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['errs']:
        raise harness.Fail(json.dumps(r['errs'], ensure_ascii=False))
    a, e = r['tally']['asia'], r['tally']['euro']
    ra = a['afcpoy'] / max(1, a['seasons'])
    re_ = e['afcpoy'] / max(1, e['seasons'])
    print('亚洲联赛(csl): %d/%d seasons -> afcpoy %.1f%%' % (a['afcpoy'], a['seasons'], ra * 100))
    print('欧洲联赛(epl): %d/%d seasons -> afcpoy %.1f%%' % (e['afcpoy'], e['seasons'], re_ * 100))
    # Pure location factor is 2.22x (1/0.45), but careers average over the
    # whole lifespan: ovr decays late-career (shrinking the base for both
    # buckets) and sub-84/ban years are ineligible, so the observed ratio is
    # compressed. 1.4x still cleanly proves the Asia/Europe split works.
    if not (ra > re_ * 1.4):
        raise harness.Fail('location factor weak: asia %.3f vs euro %.3f' % (ra, re_))
    if ra > 0.45:
        raise harness.Fail('afcpoy rate in Asia too high: %.2f' % ra)
    print('PASS afcpoy_location')


if __name__ == '__main__':
    harness.main(run)
