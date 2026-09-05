# Property tests for interpolated growth + directional decline.
# Reuses the proven _bench_growth natural-career skeleton verbatim;
# per-config talent/age injections happen AFTER a healthy pro career starts.
import json

import harness

CAREERS = 20


def cohort_js(tag, seed_base, talent, start_age, ovr, mo, win_end=None):
    if win_end is None:
        win_end = start_age + 6  # 缺省窗口：起测年龄后 6 年（P1/P2 用）
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
       .replace('%A0%', str(start_age)).replace('%A1%', str(win_end))


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
    # （三种子平均降低抽样方差；每季 ovr 噪声来自伤病与随机成长，Δ 真值约 0.2）
    p2 = []
    for base in (500000, 600000, 700000):
        d_lo = json.loads(mr.eval(cohort_js('d08', base, 0.8, 32, 76, 92)))
        d_hi = json.loads(mr.eval(cohort_js('d13', base, 1.3, 32, 76, 92)))
        p2.append((d_lo, d_hi))
        print('P2 base=%d slopes t0.8=%.2f(n%d) t1.3=%.2f(n%d)'
              % (base, d_lo['slope'], d_lo['n'], d_hi['slope'], d_hi['n']))
    d_lo = {'slope': sum(x[0]['slope'] for x in p2) / len(p2)}
    d_hi = {'slope': sum(x[1]['slope'] for x in p2) / len(p2)}
    harness.check(d_hi['slope'] > d_lo['slope'] + 0.08,
                  'P2 broken: longevity inversion')

    # P3 cap-proximity: hugging maxOvr declines FASTER（三种子平均降噪，同 P2）
    p3 = []
    for base in (700000, 800000, 900000):
        cn = json.loads(mr.eval(cohort_js('cN', base, 1.0, 32, 90, 90, win_end=40)))
        cf = json.loads(mr.eval(cohort_js('cF', base, 1.0, 32, 80, 90, win_end=40)))
        p3.append((cn['slope'], cf['slope'], cn['n']))
    near = sum(x[0] for x in p3) / len(p3)
    far = sum(x[1] for x in p3) / len(p3)
    print('P3 slopes near=%.2f(n%d) far=%.2f(n%d)' % (near, sum(x[2] for x in p3), far, sum(x[2] for x in p3)))
    harness.check(near < far - 0.1,
                  'P3 broken: cap pressure inactive')

    print('PASS growth_curve (P1 Δ%.2f | P2 Δ%.2f | P3 Δ%.2f)'
          % (hi['slope'] - lo['slope'], d_hi['slope'] - d_lo['slope'],
             far - near))


if __name__ == '__main__':
    harness.main(run)
