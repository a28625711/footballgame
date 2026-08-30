# Property tests for interpolated growth + directional decline.
# Reuses the proven _bench_growth natural-career skeleton verbatim;
# per-config talent/age injections happen AFTER a healthy pro career starts.
import json

import harness

CAREERS = 20


def cohort_js(tag, seed_base, talent, start_age, ovr, mo):
    return """
(function(){
var recs=[];
for(var s=0;s<%N%;s++){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.25,'number':9,'foot':'r'},%BASE%+s);
  au.talent=1.25;
  var g=0,booted=false,injected=false;
  while(g++<90000){
    if(au.phase==='youth'){
      if((au.talent||0)<1.3)au.talent=1.3;
      if(au.age>=14&&(!au.ovr||au.ovr<52)){au.ovr=52;au.maxOvr=Math.max(au.maxOvr||0,94);}
    }
    if(!booted&&au.phase==='career'&&au.seasons.length>=1){
      au.talent=%TAL%;au.age=%AGE%;au.ovr=%OVR%;au.maxOvr=%MO%;
      au.contractLeft=25;au.seasonsAtClub=2;au.role='starter';
      au.teamId='mci';au.stagnate=false;au.lowSpell=0;
      booted=true;
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
      else if(p.type==='bigmatch'){if(!p.result){window.SIM.choose('push');}else{window.__SIMTEST.cont();}}
      else if(p.type==='staff'){window.SIM.choose('skip');}
      else if(p.type==='transfer'){
        var home=p.offers&&p.offers.indexOf('mci')>=0;
        window.SIM.choose(booted?(home?'mci':'stay'):'stay');
      }
      else if(p.type==='academy'){window.__SIMTEST.option(0);}
      else if(p.type==='youth_path'){window.__SIMTEST.option(0);}
      else if(p.type==='retire_forced'){window.SIM.choose('retire');}
      else{window.SIM.nextStep();}
    }catch(e){}
    if(au.phase==='summary'||au.phase==='done')break;
  }
  var win=[];
  for(var i=0;i<(au.seasons||[]).length;i++){
    var r=au.seasons[i];
    if(r.age>=%A0%&&r.age<=%A1%)win.push(r);
  }
  if(win.length>=3){
    var slope=(win[win.length-1].ovr-win[0].ovr)/(win[win.length-1].age-win[0].age);
    recs.push(+slope.toFixed(3));
  }
}
var sum=0;recs.forEach(function(x){sum+=x;});
return JSON.stringify({n:recs.length,slope:+(sum/recs.length).toFixed(3)});
})()
""".replace('%N%', str(CAREERS)).replace('%BASE%', str(seed_base)) \
       .replace('%TAL%', str(talent)).replace('%AGE%', str(start_age)) \
       .replace('%OVR%', str(ovr)).replace('%MO%', str(mo)) \
       .replace('%A0%', str(start_age)).replace('%A1%', str(start_age + 6))


def run():
    mr = harness.new_engine()
    N = CAREERS

    # P1 cumulative growth: trajectory level at ages 24-30, talent monotonic
    j_lo = cohort_js('g08', 300000, 0.8, 18, 62, 94)
    j_hi = cohort_js('g13', 300000, 1.3, 18, 62, 94)
    lo = json.loads(mr.eval(j_lo))
    hi = json.loads(mr.eval(j_hi))
    print('P1 slopes t0.8=%.2f(n%d) t1.3=%.2f(n%d)' % (lo['slope'], lo['n'], hi['slope'], hi['n']))
    harness.check(hi['slope'] > lo['slope'] + 0.05,
                  'P1 broken: %.2f !> %.2f+0.05' % (hi['slope'], lo['slope']))

    # P2 decline longevity: high talent declines SLOWER at same window
    d_lo = json.loads(mr.eval(cohort_js('d08', 500000, 0.8, 32, 76, 92)))
    d_hi = json.loads(mr.eval(cohort_js('d13', 500000, 1.3, 32, 76, 92)))
    print('P2 slopes t0.8=%.2f(n%d) t1.3=%.2f(n%d)' % (d_lo['slope'], d_lo['n'], d_hi['slope'], d_hi['n']))
    harness.check(d_hi['slope'] > d_lo['slope'] + 0.1,
                  'P2 broken: longevity inversion')

    # P3 cap-proximity: hugging maxOvr declines FASTER
    c_near = json.loads(mr.eval(cohort_js('cN', 700000, 1.0, 32, 90, 90)))
    c_far = json.loads(mr.eval(cohort_js('cF', 700000, 1.0, 32, 80, 90)))
    print('P3 slopes near=%.2f(n%d) far=%.2f(n%d)' % (c_near['slope'], c_near['n'], c_far['slope'], c_far['n']))
    harness.check(c_near['slope'] < c_far['slope'] - 0.1,
                  'P3 broken: cap pressure inactive')

    print('PASS growth_curve (P1 Δ%.2f | P2 Δ%.2f | P3 Δ%.2f)'
          % (hi['slope'] - lo['slope'], d_hi['slope'] - d_lo['slope'],
             c_far['slope'] - c_near['slope']))


if __name__ == '__main__':
    harness.main(run)
