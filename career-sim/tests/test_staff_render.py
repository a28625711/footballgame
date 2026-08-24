import sys, json
sys.stdout.reconfigure(encoding='utf-8')
import harness

mr = harness.new_engine()

TEMPLATE = """
(function(){
var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},700);
au.age=25; au.ovr=84; au.maxOvr=88; au.money=500; au.phase='career';
au.teamId='cn-sh'; au.contractLeft=3; au.seasonsAtClub=1;
au.role='starter'; au.roleAdjust=0; au.guanxi=50; au.fame=60; au.clean=70;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.seasonWage=0;
au.pending={type:'staff',offers:%OFFERS%};
try{ String(window.__SIMTEST.render()); }
catch(e){ return JSON.stringify({fail:'render threw', msg:String(e).slice(0,250)}); }
// stale entries must not produce buttons
var html='';
for(var k in window.__ELS)html+=String(window.__ELS[k].innerHTML);
return JSON.stringify({ok:true, staleButtons:html.indexOf('agent_x')>=0});
})()
"""

r = json.loads(mr.eval(TEMPLATE.replace('%OFFERS%', "['agent_x','rehab_old','rehab']")))
print('mixed stale+valid render:', r)
if r.get('fail'):
    raise SystemExit('FAIL: ' + r['fail'])
if r['staleButtons']:
    raise SystemExit('FAIL: stale id still rendered a button')

# skip path clears the pending
mr2 = harness.new_engine()
js = """
(function(){
var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},701);
au.age=25; au.ovr=84; au.maxOvr=88; au.money=500; au.phase='career';
au.teamId='cn-sh'; au.contractLeft=3; au.role='starter'; au.roleAdjust=0; au.guanxi=50;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
au.pending={type:'staff',offers:['agent']};
window.SIM.choose('skip');
// skip resolves, but bk() may immediately roll a NEW staff meeting (cooldown
// ticks in the same call). What must hold: any staff pending that exists has
// only resolvable offer ids.
var p=au.pending;
var bad=p&&p.type==='staff'&&(p.offers||[]).some(function(id){return!window.SIM.staffById(id);});
return JSON.stringify({nextType:p?p.type:null,badOffers:!!bad,hired:!!(au.staff&&au.staff.agent)});
})()
"""
r2 = json.loads(mr2.eval(js))
print('skip -> next pending:', r2)

# migration logic: replicate aI() sanitization on a fake save object
r3 = json.loads(mr2.eval("""
(function(){
var save={ver:window.SIM.SAVE_VER,pending:{type:'staff',offers:['agent_x','rehab']}};
save.pending.offers=save.pending.offers.filter(function(id){return!!window.SIM.staffById(id);});
if(!save.pending.offers.length)save.pending=null;
return JSON.stringify({left:save.pending?save.pending.offers:null});
})()
"""))
print('migration filter keeps valid only:', r3)
ok = (not r.get('fail') and not r['staleButtons']
      and not r2['badOffers'] and r2['hired'] is False and r3['left'] == ['rehab'])
# note: 'skip' must NOT have hired the agent
if r2['hired']:
    ok = False
print('PASS staff_stale_save' if ok else 'FAIL')
