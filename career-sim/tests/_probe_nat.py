import sys, json
sys.stdout.reconfigure(encoding='utf-8')
import harness

mr = harness.new_engine()
js = """
(function(){
var au=window.SIM.newState('normal',{'name':'p','origin':{id:'sd',name:'sd',ovr:60,guanxi:50,money:500},'pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},10001,null);
au.age=20; au.phase='career'; au.money=500; au.talent=1.1; au.ovr=80; au.maxOvr=80;
au.caps=0; au.natStats={goals:0,assists:0,cs:0,ga:0}; au.natRuns=[];
au.teamId='cn-sh'; au.role='starter'; au.banLeft=0; au.banGames=0;
au.contractLeft=2; au.seasonsAtClub=1; au.stagnate=false; au.roleAdjust=0; au.guanxi=50;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
var g=0,ids={},types={};
while(g++<3000){
  var p=au.pending;
  if(!p){
    if(au.phase==='done') break;
    window.SIM.nextStep(); continue;
  }
  types[p.type]=(types[p.type]||0)+1;
  if(p.type==='random'){
    if(p.result){ window.__SIMTEST.cont(); continue; }
    ids[p.eventId]=(ids[p.eventId]||0)+1;
    try{ window.SIM.choose(0); window.__SIMTEST.cont(); }catch(e){}
  } else if(p.type==='report'||p.type==='bigmatch'){
    if(!p.result&&p.type==='bigmatch'){ try{ window.SIM.choose(0); }catch(e){} }
    window.__SIMTEST.cont();
  } else if(p.type==='transfer'||p.type==='academy'||p.type==='youth_path'||p.type==='staff'){
    try{ window.SIM.choose(p.type==='transfer'?(p.offers&&p.offers.length?'0':(p.canStay?'stay':'retire')):(p.type==='academy'?(p.canStayYouth?'youth':0):0)); }catch(e){ window.SIM.nextStep(); }
  } else if(p.type==='retire_forced'){ try{ window.SIM.choose('retire'); }catch(e){ window.SIM.nextStep(); } }
  else window.SIM.nextStep();
}
return JSON.stringify({g:g,age:au.age,phase:au.phase,caps:au.caps,natEvents:Object.keys(ids).filter(function(k){return k.indexOf('nat')===0}),types:types,sampleIds:Object.keys(ids).slice(0,25)});
})()
"""
print(json.dumps(json.loads(mr.eval(js)), ensure_ascii=False, indent=1))
