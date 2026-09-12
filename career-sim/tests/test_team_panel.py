# Team-panel regression: per-season candidate market, hire/fire via SIM
# exports, and the youth yearly-spend decision (私教加点/试训).
import json

import harness

NEW = harness.NEW_PLAYER


def run():
    mr = harness.new_engine()

    # ── 1. career-phase: market generates after a season tick; hire/fire work
    js1 = """
(function(){
var au=window.__SIMTEST.start('normal',%NEW%,700);
au.age=24; au.ovr=88; au.maxOvr=92; au.money=800; au.phase='career';
au.teamId='rma'; au.role='starter'; au.contractLeft=10; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50; au.fame=40; au.youthTeamId=null;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
if(!window.SIM.doPeriod) return JSON.stringify({fail:'no doPeriod'});
try{ window.SIM.doPeriod(); }catch(e){ return JSON.stringify({fail:'doPeriod: '+String(e).slice(0,150)}); }
var guard=0;
while(au.pending&&guard++<30){
  var p=au.pending;
  if(p.type==='bigmatch'){ if(p.result){window.__SIMTEST.cont();continue;} window.SIM.choose('push'); }
  else if(p.type==='report'){ window.SIM.nextStep(); }
  else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
  else if(p.type==='transfer'){ window.SIM.choose('stay'); }
  else { window.SIM.nextStep(); }
}
var mkt=window.SIM.staffMkt();
if(!mkt||!mkt.ids) return JSON.stringify({fail:'no staff market after season'});
function stType(id){var m=/^(.*?)([123])$/.exec(id);return m&&['rehab','fitness','analyst','agent','pr','lawyer','chef'].indexOf(m[1])>=0?m[1]:id;}
var bad=mkt.ids.some(function(id){return !window.SIM.staffById(id);});
if(bad) return JSON.stringify({fail:'market contains unknown staff id'});
var hired=[];
for(var i=0;i<mkt.ids.length;){
  var id=mkt.ids[i];
  var nm=window.SIM.teamHire(id);
  if(!nm) return JSON.stringify({fail:'teamHire failed for '+id});
  if(window.SIM.staffMkt().ids.indexOf(id)>=0) return JSON.stringify({fail:'hired id still in market: '+id});
  i=0;
  hired.push(id);
  if(!(au.staff[stType(id)]&&typeof au.staff[stType(id)]==='object')) return JSON.stringify({fail:'staff entry not object for '+id});
}
if(!hired.length) return JSON.stringify({fail:'no candidates to hire'});
if(window.SIM.staffFee()<=0) return JSON.stringify({fail:'staffFee not charged'});
var fid=hired[0], before=au.money;
var fn=window.SIM.teamFire(fid);
if(!fn) return JSON.stringify({fail:'teamFire failed'});
if(au.staff[stType(fid)]) return JSON.stringify({fail:'staff entry still present after fire'});
if(au.money>=before) return JSON.stringify({fail:'severance not deducted'});
var outsider=['rehab','fitness','analyst','agent','pr','lawyer','chef'].filter(function(id){return !au.staff[id]&&mkt.ids.indexOf(id)<0;})[0];
if(outsider&&window.SIM.teamHire(outsider)) return JSON.stringify({fail:'hired outside market'});
if(mkt.season!==au.seasons.length+1) return JSON.stringify({fail:'market season off-by-one: '+mkt.season+' vs '+(au.seasons.length+1)});
// even a broke player must see candidates (affordability is UI-side)
var au2=window.__SIMTEST.start('normal',%NEW%,733);
au2.age=19; au2.ovr=70; au2.maxOvr=78; au2.money=5; au2.phase='career';
au2.teamId='cn-sd'; au2.role='starter'; au2.contractLeft=3; au2.seasonsAtClub=1;
au2.roleAdjust=0; au2.guanxi=50; au2.fame=8; au2.youthTeamId=null;
au2.flags={}; au2.usedEvents={}; au2.forceQ=[]; au2.pending=null;
try{ window.SIM.doPeriod(); }catch(e){ return JSON.stringify({fail:'doPeriod broke: '+String(e).slice(0,120)}); }
var g3=0;
while(au2.pending&&g3++<30){
  var q=au2.pending;
  if(q.type==='bigmatch'){ if(q.result){window.__SIMTEST.cont();continue;} window.SIM.choose('push'); }
  else if(q.type==='report'){ window.SIM.nextStep(); }
  else if(q.type==='random'){ if(q.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
  else if(q.type==='transfer'){ window.SIM.choose('stay'); }
  else { window.SIM.nextStep(); }
}
var mkt2=window.SIM.staffMkt();
if(!mkt2||!mkt2.ids||!mkt2.ids.length) return JSON.stringify({fail:'broke player sees empty market'});
return JSON.stringify({ok:1,hired:hired.length,mktN:mkt.ids.length,mktBroke:mkt2.ids.length});
})()
""".replace('%NEW%', NEW)
    r = json.loads(mr.eval(js1))
    print('career market:', r)
    if r.get('fail'):
        raise harness.Fail(r['fail'])
    if r.get('hired', 0) < 1:
        raise harness.Fail('no candidates to hire')

    # ── 2. youth-phase: invest toggles register only; charge at year tick
    js2 = """
(function(){
var au=window.__SIMTEST.start('normal',%NEW%,701);
au.phase='youth'; au.youthTeamId='cn-sd'; au.teamId='cn-sd';
au.age=13; au.ovr=46; au.maxOvr=52; au.money=200; au.talent=1.1;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null; au.youthLog=[];
if(!window.SIM.youthInvest) return JSON.stringify({fail:'no youthInvest export'});
if(!window.SIM.youthInvest('train',true)) return JSON.stringify({fail:'invest train refused'});
if(au.money!==200) return JSON.stringify({fail:'money changed at check time: '+au.money});
if(au.yInv.train==null) return JSON.stringify({fail:'yInv entry not set'});
if(!window.SIM.youthInvest('fit',true)) return JSON.stringify({fail:'invest fit refused'});
// uncheck before the year ticks: no cost at all
if(!window.SIM.youthInvest('fit',false)) return JSON.stringify({fail:'uncheck refused'});
if(!window.SIM.youthInvest('train',false)) return JSON.stringify({fail:'uncheck refused'});
if(au.money!==200) return JSON.stringify({fail:'uncheck changed money'});
// standing invest: charge happens at each growth tick.
// Per-step exact check: every nextStep that advances the age must deduct
// 10*years on the spot, BEFORE the pending event's money effect applies.
// (Absolute end-state money is fragile: youth random events can grant/spend
// money, and any world-state change reshuffles which events fire.)
if(!window.SIM.youthInvest('train',true)) return JSON.stringify({fail:'re-invest refused'});
var o0=au.ovr, guard=0, chargeErr=null, steps=0;
function stepChk(){
  var mb=au.money, ab=au.age;
  try{ window.SIM.nextStep(); }catch(e){ return JSON.stringify({fail:'nextStep: '+String(e).slice(0,150)}); }
  var dAge=au.age-ab;
  if(dAge>0&&au.yInv.train!=null&&au.money!==mb-18*dAge&&chargeErr==null)
    chargeErr='tick@'+au.age+': '+mb+'->'+au.money+' dAge='+dAge;
  steps++;
  return null;
}
var err=stepChk(); if(err) return err;
while(au.pending&&guard++<60){
  var p=au.pending;
  if(p.type==='youthSpend') return JSON.stringify({fail:'youthSpend popup still exists'});
  if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
  else if(p.type==='bigmatch'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(p.quick?'start':'push');} }
  else { var e2=stepChk(); if(e2) return e2; }
}
var years=au.age-13;
if(chargeErr) return JSON.stringify({fail:'tick charge wrong: '+chargeErr+' years='+years});
if(years<2) return JSON.stringify({fail:'too few years advanced: '+years+' steps='+steps});
if(au.yInv.train==null) return JSON.stringify({fail:'standing invest did not continue'});
if(!(au.ovr>o0)) return JSON.stringify({fail:'no growth while standing'});
return JSON.stringify({ok:1,money:au.money,age:au.age,years:years,dOvr:Math.round(au.ovr-o0)});
})()
""".replace('%NEW%', NEW)
    mr2 = harness.new_engine()
    r2 = json.loads(mr2.eval(js2))
    print('youth invest:', r2)
    if r2.get('fail'):
        raise harness.Fail(r2['fail'])

    # ── 3. youth: trial export offered and can switch academy
    js3 = """
(function(){
var switches=0, tries=0;
for(var s=0;s<8;s++){
var au=window.__SIMTEST.start('normal',%NEW%,710+s);
au.phase='youth'; au.youthTeamId='cn-ln'; au.teamId='cn-ln';
au.age=13; au.ovr=50; au.maxOvr=56; au.money=400; au.talent=1.2;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null; au.youthLog=[];
var guard=0;
while(au.phase==='youth'&&guard++<40){
  var before=au.youthTeamId;
  var res=window.SIM.youthTrial();
  if(res&&res.ok){ tries++; if(au.youthTeamId!==before)switches++; }
  try{ window.SIM.nextStep(); }catch(e){ break; }
  var g2=0;
  while(au.pending&&g2++<20){
    var p=au.pending;
    if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
    else if(p.type==='academy'){ window.SIM.choose('youth'); break; }
    else { window.SIM.nextStep(); }
  }
}
}
return JSON.stringify({tries:tries,switches:switches});
})()
""".replace('%NEW%', NEW)
    mr3 = harness.new_engine()
    r3 = json.loads(mr3.eval(js3))
    print('youth trial:', r3)
    if r3.get('tries', 0) < 3:
        raise harness.Fail('trial never succeeded/attempted (tries=%d)' % r3.get('tries', 0))
    if r3.get('switches', 0) < 1:
        raise harness.Fail('trial never switched academy')

    # ── 4. youth render shows the invest panel with checkboxes
    js4 = """
(function(){
var au=window.__SIMTEST.start('normal',%NEW%,720);
au.phase='youth'; au.youthTeamId='cn-sd'; au.teamId='cn-sd';
au.age=13; au.ovr=46; au.maxOvr=52; au.money=40;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
try{ String(window.__SIMTEST.render()); }
catch(e){ return JSON.stringify({fail:'render threw: '+String(e).slice(0,150)}); }
var html='';
for(var k in window.__ELS)html+=String(window.__ELS[k].innerHTML);
return JSON.stringify({hasPanel:html.indexOf('青训投入')>=0,ck:html.indexOf('data-yopt="train"')>=0,trial:html.indexOf('data-tact="trial"')>=0,noStaff:html.indexOf('data-tact="hire:')<0});
})()
""".replace('%NEW%', NEW)
    mr4 = harness.new_engine()
    r4 = json.loads(mr4.eval(js4))
    print('youth panel render:', r4)
    if r4.get('fail'):
        raise harness.Fail(r4['fail'])
    if not (r4.get('hasPanel') and r4.get('ck') and r4.get('trial')):
        raise harness.Fail('youth invest panel not rendered')

    print('PASS team_panel')


if __name__ == '__main__':
    harness.main(run)
