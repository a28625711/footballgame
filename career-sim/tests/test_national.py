# National-team pipeline smoke: careers from age 20 at a CSL club must pass
# through nat_firstcall / nat_firstgoal events without errors, and the first
# call-up must happen at most twice per player (event guard).
import json

import harness

SEEDS = 16

JS = """
(function(){
var out={perSeed:[],total:{call:0,goal:0},errs:[]};
function newP(seed){
  var origin={id:'sd',name:'sd',ovr:60,guanxi:50,money:500};
  var au=window.SIM.newState('normal',{'name':'p','origin':origin,'pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},seed,null);
  au.age=20; au.phase='career'; au.money=500; au.talent=1.1; au.ovr=80; au.maxOvr=80;
  au.caps=0; au.natStats={goals:0,assists:0,cs:0,ga:0}; au.natRuns=[];
  au.teamId='cn-sh'; au.role='starter'; au.banLeft=0; au.banGames=0;
  au.contractLeft=2; au.seasonsAtClub=1; au.stagnate=false; au.roleAdjust=0; au.guanxi=50;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  return au;
}
function sim(seed){
  var a=newP(seed);
  var cnt={call:0,goal:0};
  var g=0;
  while(g++<6000){
    var p=a.pending;
    if(!p){
      if(a.phase==='done') break;
      window.SIM.nextStep(); continue;
    }
    if(p.type==='random'){
      if(p.result){ window.__SIMTEST.cont(); continue; }
      var id=p.eventId||'';
      if(id.indexOf('nat_firstcall')===0) cnt.call++;
      if(id.indexOf('nat_firstgoal')===0) cnt.goal++;
      try{ window.SIM.choose(0); }
      catch(e){ out.errs.push('err@'+id+': '+String(e).slice(0,100)); window.SIM.nextStep(); }
    } else if(p.type==='report'){
      window.__SIMTEST.cont();
    } else if(p.type==='bigmatch'){
      if(!p.result){ try{ window.SIM.choose('push'); }catch(e){ out.errs.push('bm:'+String(e).slice(0,80)); } }
      else{ window.__SIMTEST.cont(); }
    } else if(p.type==='transfer'||p.type==='academy'||p.type==='youth_path'||p.type==='staff'){
      try{
        window.SIM.choose(p.type==='transfer'?(p.offers&&p.offers.length?'0':(p.canStay?'stay':'retire'))
          :(p.type==='academy'?(p.canStayYouth?'youth':0):0));
      }catch(e){ out.errs.push(p.type+': '+String(e).slice(0,100)); window.SIM.nextStep(); }
    } else if(p.type==='retire_forced'){
      try{ window.SIM.choose('retire'); }catch(e){ window.SIM.nextStep(); }
    } else {
      window.SIM.nextStep();
    }
    if(a.phase==='done') break;
  }
  out.perSeed.push({seed:seed,call:cnt.call,goal:cnt.goal,caps:a.caps||0});
  out.total.call+=cnt.call; out.total.goal+=cnt.goal;
}
for(var s=10001;s<10001+%SEEDS%;s++) sim(s);
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER).replace('%SEEDS%', str(SEEDS))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['errs']:
        raise harness.Fail(json.dumps(r['errs'][:3], ensure_ascii=False))
    for ps in r['perSeed']:
        if ps['call'] > 2:
            raise harness.Fail('first-call event fired %d times for seed %d'
                               % (ps['call'], ps['seed']))
    if r['total']['call'] < 1:
        raise harness.Fail('national pipeline never fired across %d careers' % SEEDS)
    print('PASS national (%d seeds, calls=%d firstgoals=%d)'
          % (SEEDS, r['total']['call'], r['total']['goal']))


if __name__ == '__main__':
    harness.main(run)
