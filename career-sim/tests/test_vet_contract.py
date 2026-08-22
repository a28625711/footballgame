# Veteran contract-years feature (be() relaxation for high-ovr veterans).
# Samples offerBrief().years across age/ovr/club-rep configs and asserts the
# bounds implemented in be(): young stars sign 3-5 year deals, 33+ players
# are capped short, low-ovr old players get exactly 1. Also pins the feature
# direction: young star average > old star average at the same club.
import json

import harness

SAMPLES = 40

JS = """
(function(){
function fresh(seed,teamId){
  var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,seed);
  au.age=21; au.ovr=88; au.maxOvr=88; au.role='starter'; au.phase='career';
  au.teamId=teamId; au.contractLeft=1; au.seasonsAtClub=2; au.money=800;
  au.roleAdjust=0; au.guanxi=50;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  return au;
}
function yearsAt(teamId,age,ovr){
  var ys=[];
  for(var k=0;k<%SAMPLES%;k++){
    var au=fresh(900+k,teamId);
    au.age=age; au.ovr=ovr; au.maxOvr=ovr;
    var ob;
    try{ ob=window.SIM.offerBrief(teamId); }
    catch(e){ return {err:String(e).slice(0,120)}; }
    if(!ob||!(ob.years>=1)) return {err:'no brief years'};
    ys.push(ob.years);
  }
  var min=Math.min.apply(null,ys),max=Math.max.apply(null,ys),sum=0;
  for(var i=0;i<ys.length;i++)sum+=ys[i];
  return {min:min,max:max,avg:sum/ys.length};
}
var out={
  youngStar:yearsAt('cn-sh',21,88),
  oldStarLowRep:yearsAt('cn-sh',38,88),
  oldStarHighRep:yearsAt('rma',38,88),
  vetStarter:yearsAt('cn-sh',35,72),
  oldBenchHighRep:yearsAt('rma',38,60)
};
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER).replace('%SAMPLES%', str(SAMPLES))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    for name, d in r.items():
        if d.get('err'):
            raise harness.Fail('%s: %s' % (name, d['err']))
        if d['min'] < 1 or d['max'] > 5:
            raise harness.Fail('%s out of global range [%d..%d]' % (name, d['min'], d['max']))

    def chk(name, lo, hi):
        d = r[name]
        if d['min'] < lo or d['max'] > hi:
            raise harness.Fail('%s expected years within [%d..%d], got [%d..%d]'
                               % (name, lo, hi, d['min'], d['max']))

    # be(): <33 & star rank -> ae(3,5)
    chk('youngStar', 3, 5)
    # >=33 & star rank, club rep<=3 -> ae(1,2)+1
    chk('oldStarLowRep', 1, 3)
    # >=33 & star rank, club rep>=4 -> ae(1,2)+0
    chk('oldStarHighRep', 1, 2)
    # >=33, starter rank (ovr72 vs cn-sh) -> (rep<=3? ae(1,2):1) + (ovr>=75?0)
    chk('vetStarter', 1, 2)
    # deterministic branch: >=33, low rank, ovr<75 -> exactly 1
    d = r['oldBenchHighRep']
    if d['min'] != 1 or d['max'] != 1:
        raise harness.Fail('oldBenchHighRep expected fixed 1, got [%d..%d]'
                           % (d['min'], d['max']))
    if not r['youngStar']['avg'] > r['oldStarLowRep']['avg']:
        raise harness.Fail('relaxation direction broken: young avg %.2f <= old avg %.2f'
                           % (r['youngStar']['avg'], r['oldStarLowRep']['avg']))
    print('PASS vet_contract ' + ' '.join(
        '%s=[%d..%d]' % (k, v['min'], v['max']) for k, v in r.items()))


if __name__ == '__main__':
    harness.main(run)
