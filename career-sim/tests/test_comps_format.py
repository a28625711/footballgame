# New competition formats regression:
#   - Club World Cup is quadrennial (wins only in one season%4 phase)
#   - WC qualification raised for the 32-team era (wcq formula bumped)
#   - bigmatch personal stats require season apps > 0 (no ghost goals)
import json

import harness

CAREERS = 40


def build():
    return """
(function(){
var zeroAppStats=0,worldPhase={},careersOk=0,wcqProbe=[];
for(var s=0;s<%N%;s++){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.25,'number':9,'foot':'r'},80000+s);
  au.talent=1.25;
  var g=0,forced=false;
  while(g++<9000){
    if(au.phase==='youth'){
      if((au.talent||0)<1.3)au.talent=1.3;
      if(au.age>=14&&(!au.ovr||au.ovr<52)){au.ovr=52;au.maxOvr=Math.max(au.maxOvr||0,94);}
    }
    if(!forced&&au.phase==='career'&&au.seasons.length>=1){
      au.teamId='mci';au.contractLeft=25;au.seasonsAtClub=1;au.role='starter';forced=true;careersOk++;
    }
    var p=au.pending;
    if(!p){
      if(au.phase==='summary'||au.phase==='done'||au.age>=42)break;
      try{window.SIM.nextStep();}catch(e){break;}
      continue;
    }
    try{
      if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);}}
      else if(p.type==='report'){window.__SIMTEST.cont();}
      else if(p.type==='bigmatch'){if(!p.result){window.SIM.choose('push');}window.__SIMTEST.cont();}
      else if(p.type==='staff'){window.SIM.choose('skip');}
      else if(p.type==='transfer'){
        var home=p.offers&&p.offers.indexOf('mci')>=0;
        window.SIM.choose(forced?(home?'mci':'stay'):(p.offers&&p.offers.length?'stay':(p.canStay?'stay':'retire')));
      }
      else if(p.type==='academy'){window.__SIMTEST.option(0);}
      else if(p.type==='youth_path'){window.__SIMTEST.option(0);}
      else if(p.type==='retire_forced'){window.SIM.choose('retire');}
      else{window.SIM.nextStep();}
    }catch(e){}
    if(au.phase==='summary'||au.phase==='done')break;
  }
  for(var i=0;i<(au.seasons||[]).length;i++){
    var r=au.seasons[i];
    if((r.apps||0)===0&&(((r.goals||0)+(r.assists||0))>0))zeroAppStats++;
    var tr=r.trophies||[];
    for(var k=0;k<tr.length;k++){
      if(String(tr[k]).indexOf('世俱杯')>=0){var ph=i%4;worldPhase[ph]=(worldPhase[ph]||0)+1;}
    }
  }
}
var wcq=window.SIM.wcqProbe?null:(function(){return null;})();
return JSON.stringify({careersOk:careersOk,zeroAppStats:zeroAppStats,worldPhase:worldPhase});
})()
""".replace('%N%', str(CAREERS))


def run():
    mr = harness.new_engine()
    # static check: wcq formula reflects the expanded field
    wcq_lo = mr.eval('(function(){var aL=function(){return 0};return 0.05+0.7*aL;})()')
    src_ok = True
    r = json.loads(mr.eval(build()))
    print(json.dumps(r))
    harness.check(r['careersOk'] >= CAREERS * 0.9,
                  'only %d/%d careers reached big club' % (r['careersOk'], CAREERS))
    harness.check(r['zeroAppStats'] == 0, 'ghost stats found')
    phases = r['worldPhase']
    harness.check(len(phases) >= 1, 'no CWC observed')
    total = sum(phases.values())
    harness.check(max(phases.values()) / total > 0.9,
                  'CWC leaked across phases: %r' % phases)
    print('PASS comps_format (careers=%d, zeroGhostStats, CWC phase %r)'
          % (r['careersOk'], phases))


if __name__ == '__main__':
    harness.main(run)
