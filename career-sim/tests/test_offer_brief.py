# Unit regression for offerBrief/be()/aI() with NO current club.
# The academy freeze came from be() calling aI(bx||ar()) unguarded; ar() is
# null for any teamless player, so offerBrief crashed at every age. The 33+
# branch (line ~490) had the same latent crash. This test pins the null-team
# path across ages/ovr/roles, plus a with-club sanity matrix.
import json

import harness

JS = """
(function(){
var out={teamless:[],withClub:[]};
function mkState(seed){
  var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,seed||999);
  au.money=800; au.roleAdjust=0; au.guanxi=50;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  return au;
}
var IDS=['cn-sh','cn-tj','cn-cd','rma','bar','mci','liv','bay'];
function realIds(){
  var r=[]; for(var i=0;i<IDS.length;i++){ if(window.SIM.teamById(IDS[i])) r.push(IDS[i]); }
  return r;
}
// --- teamless: must never throw, years always 1..5 ---
var ids=realIds();
[16,18,21,25,30,33,35,38].forEach(function(age){
  [88,75,60].forEach(function(ovr){
    ['star','starter','rot','sub'].forEach(function(role){
      var au=mkState();
      au.age=age; au.ovr=ovr; au.maxOvr=ovr; au.role=role;
      au.phase='career'; au.teamId=null; au.contractLeft=0; au.seasonsAtClub=0;
      var n=0;
      for(var i=0;i<ids.length;i++){
        var ob;
        try{ ob=window.SIM.offerBrief(ids[i]); }
        catch(e){ throw new Error('teamless threw age='+age+' ovr='+ovr+' role='+role+' id='+ids[i]+': '+e); }
        if(ob){
          n++;
          if(!(ob.years>=1&&ob.years<=5)) throw new Error('teamless years out of range age='+age+' ovr='+ovr+' role='+role+' years='+ob.years);
          if(!ob.roleName) throw new Error('teamless roleName missing');
        }
      }
      if(n===0) throw new Error('teamless: no briefs produced');
      out.teamless.push(age+'/'+ovr+'/'+role+':'+n);
    });
  });
});
// --- with club: contract renew ('stay' semantics) stays sane ---
[[30,88],[33,82],[35,80],[38,88]].forEach(function(c){
  var au=mkState();
  au.age=c[0]; au.ovr=c[1]; au.maxOvr=c[1]; au.role='starter';
  au.phase='career'; au.teamId='cn-sh'; au.contractLeft=0; au.seasonsAtClub=1;
  var ob=window.SIM.offerBrief('cn-sh');
  if(!(ob&&ob.years>=1&&ob.years<=6)) throw new Error('withClub bad brief '+JSON.stringify(c));
  out.withClub.push(c.join('/')+':'+ob.years+':'+ob.roleName);
});
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    try:
        res = json.loads(mr.eval(JS))
    except Exception as e:
        raise harness.Fail(str(e)[:400] + ' | logs: ' + harness.logs(mr)[-300:])
    print('PASS offer_brief (teamless probes=%d, with-club=%d)'
          % (len(res['teamless']), len(res['withClub'])))


if __name__ == '__main__':
    harness.main(run)
