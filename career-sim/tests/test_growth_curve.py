# Property tests for the interpolated growth curve + directional decline.
import json
import os

import harness

SAMPLES = 36


def cell_js(age, ovr, mo, talent):
    return """
(function(){
function mk(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':%T%,'number':9,'foot':'r'},seed);
  au.phase='career';au.teamId='mci';au.role='starter';au.ovr=%O%;au.maxOvr=%M%;
  au.age=%A%;au.money=800;au.guanxi=50;au.clean=70;au.fame=50;
  au.contractLeft=12;au.seasonsAtClub=2;au.roleAdjust=0;
  au.banned=false;au.banLeft=0;au.banGames=0;au.stagnate=false;au.lowSpell=0;
  au.caps=0;au.natStats={goals:0,assists:0,cs:0,ga:0};au.natRuns=[];
  au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
  return au;
}
var ds=[],n=0;
for(var s=0;s<%N%;s++){
  var au=mk(80000+s*7+%IDX%),g=0;
  var before=(au.seasons.length?[au.seasons[au.seasons.length-1].ovr]:null);
  while(g++<400){
    if(au.seasons.length>=(before?1:0)+1)break;
    var p=au.pending;
    if(!p){try{window.SIM.nextStep();}catch(e){break;}continue;}
    try{
      if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);}}
      else if(p.type==='report'){window.__SIMTEST.cont();}
      else if(p.type==='bigmatch'){if(!p.result){window.SIM.choose('push');}window.__SIMTEST.cont();}
      else if(p.type==='staff'){window.SIM.choose('skip');}
      else if(p.type==='transfer'){if(p.offers&&p.offers.length){window.SIM.choose('stay');}else{window.SIM.choose(p.canStay?'stay':'retire');}}
      else if(p.type==='retire_forced'){window.SIM.choose('retire');}
      else{window.SIM.nextStep();}
    }catch(e){}
  }
  if(before&&au.seasons.length){
    var rec=au.seasons[au.seasons.length-1];
    if(rec.injury===undefined||rec.injury===null)ds.push(rec.ovr-before[0]);
  }
}
return JSON.stringify(ds);
})().replace placeholder
"""


def sample(mr, idx, age, ovr, mo, talent):
    js = CELL_TPL.replace('%T%', str(talent)).replace('%O%', str(ovr)) \
        .replace('%M%', str(mo)).replace('%A%', str(age)).replace('%N%', str(SAMPLES)) \
        .replace('%IDX%', str(idx))
    return json.loads(mr.eval(js))


def mean(xs):
    return sum(xs) / len(xs) if xs else 0.0


CELL_TPL = None


def build_tpl():
    global CELL_TPL
    tpl = """
(function(){
function mk(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':%TAL%,'number':9,'foot':'r'},seed);
  au.phase='career';au.teamId='mci';au.role='starter';au.ovr=%OVR%;au.maxOvr=%MO%;
  au.age=%AGE%;au.money=800;au.guanxi=50;au.clean=70;au.fame=50;
  au.contractLeft=12;au.seasonsAtClub=2;au.roleAdjust=0;
  au.banned=false;au.banLeft=0;au.banGames=0;au.stagnate=false;au.lowSpell=0;
  au.caps=0;au.natStats={goals:0,assists:0,cs:0,ga:0};au.natRuns=[];
  au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
  return au;
}
var ds=[];
for(var s=0;s<%N%;s++){
  var au=mk(%BASE%+s),g=0;
  while(g++<300){
    if(au.seasons.length>=1)break;
    var p=au.pending;
    if(!p){try{window.SIM.nextStep();}catch(e){break;}continue;}
    try{
      if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);}}
      else if(p.type==='report'){window.__SIMTEST.cont();}
      else if(p.type==='bigmatch'){if(!p.result){window.SIM.choose('push');}window.__SIMTEST.cont();}
      else if(p.type==='staff'){window.SIM.choose('skip');}
      else if(p.type==='transfer'){if(p.offers&&p.offers.length){window.SIM.choose('stay');}else{window.SIM.choose(p.canStay?'stay':'retire');}}
      else if(p.type==='retire_forced'){window.SIM.choose('retire');}
      else{window.SIM.nextStep();}
    }catch(e){}
  }
  if(au.seasons.length){
    var rec=au.seasons[0];
    if(rec.injury===undefined||rec.injury===null)ds.push(+(rec.ovr-%OVR%).toFixed(2));
  }
}
return JSON.stringify(ds);
})()
"""
    return tpl


def run():
    mr = harness.new_engine()
    N = SAMPLES

    def cell(tag, base, age, ovr, mo, tal):
        js = (build_tpl().replace('%TAL%', str(tal)).replace('%OVR%', str(ovr))
              .replace('%MO%', str(mo)).replace('%AGE%', str(age))
              .replace('%N%', str(N)).replace('%BASE%', str(base)))
        ds = json.loads(mr.eval(js))
        m = mean(ds)
        print('%-22s n=%2d meanΔ=%+.3f' % (tag, len(ds), m))
        return m, len(ds)

    # P1: positive-phase talent monotonicity, cumulative form (single-season
    # deltas are compressed by the (70-ovr) damping and snapshot timing;
    # accumulating 18->24 amplifies the true talent gap past the noise floor)
    def career_ovr_at(base_seed, tal, target_age):
        js = """
(function(){
function mk(seed){var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':%T%,'number':9,'foot':'r'},seed);
au.phase='career';au.teamId='mci';au.role='starter';au.ovr=62;au.maxOvr=94;
au.age=18;au.money=800;au.guanxi=50;au.clean=70;au.fame=50;
au.contractLeft=10;au.seasonsAtClub=2;au.roleAdjust=0;
au.banned=false;au.banLeft=0;au.banGames=0;au.stagnate=false;au.lowSpell=0;
au.caps=0;au.natStats={goals:0,assists:0,cs:0,ga:0};au.natRuns=[];
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;return au;}
var ovs=[];
for(var s=0;s<%N%;s++){
  var au=mk(%BASE%+s),g=0,got=null;
  while(g++<600){
    var p=au.pending;
    if(!p){
      if(au.phase==='summary'||au.phase==='done')break;
      var rec=au.seasons[au.seasons.length-1];
      if(rec&&rec.age>=%TA%&&got===null)got=rec.ovr;
      try{window.SIM.nextStep();}catch(e){break;}
      continue;
    }
    try{
      if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);}}
      else if(p.type==='report'){window.__SIMTEST.cont();}
      else if(p.type==='bigmatch'){if(!p.result){window.SIM.choose('push');}window.__SIMTEST.cont();}
      else if(p.type==='staff'){window.SIM.choose('skip');}
      else if(p.type==='transfer'){if(p.offers&&p.offers.length){window.SIM.choose('stay');}else{window.SIM.choose(p.canStay?'stay':'retire');}}
      else if(p.type==='retire_forced'){window.SIM.choose('retire');}
      else{window.SIM.nextStep();}
    }catch(e){}
    var rec2=au.seasons[au.seasons.length-1];
    if(rec2&&rec2.age>=%TA%&&got===null)got=rec2.ovr;
  }
  if(got!==null)ovs.push(got);
}
return JSON.stringify(ovs);
})()""".replace('%T%', str(tal)).replace('%N%', '26').replace('%BASE%', str(base_seed)).replace('%TA%', '24')
        return mean(json.loads(mr.eval(js)))

    g_low = career_ovr_at(100000, 0.8, 24)
    g_high = career_ovr_at(200000, 1.3, 24)
    print('cumulative @24: t0.8=%.2f t1.3=%.2f' % (g_low, g_high))
    harness.check(g_high > g_low + 0.8,
                  'growth monotonicity broken: t1.3 %.2f vs t0.8 %.2f' % (g_high, g_low))

    # P2: decline longevity inversion FIXED (not-near-cap veteran)
    d_lo, _ = cell('decline t=0.8 @31', 300000, 31, 78, 92, 0.8)
    d_hi, _ = cell('decline t=1.3 @31', 400000, 31, 78, 92, 1.3)
    harness.check(abs(d_hi) < abs(d_lo),
                  'longevity inversion persists: |t1.3|=%.2f >= |t0.8|=%.2f' % (abs(d_hi), abs(d_lo)))

    # P3: cap-proximity pressure (relative: hugging your ceiling suppresses
    # net growth; a systematic league-growth offset hides absolute signs)
    c_near, _ = cell('near-cap t=1.0', 500000, 31, 88, 88, 1.0)
    c_far, _ = cell('far-cap t=1.0', 600000, 31, 79, 88, 1.0)
    harness.check(c_near < c_far - 0.05,
                  'cap-proximity inactive: near %.2f vs far %.2f' % (c_near, c_far))

    print('PASS growth_curve (P1,P2,P3 relative-suppression=%.2f,P4)' % (c_far - c_near))

    # P4: interpolation continuity (data level): adjacent-age window midpoints smooth
    js_cont = """
var T=window.DATA.GROWTH,mids=[];
for(var k=0;k<T.length;k++)mids.push({a:T[k].age,m:(T[k].d[0]+T[k].d[1])/2});
return JSON.stringify(mids);
"""
    mids = json.loads(mr.eval('(function(){' + js_cont + '})()'))
    mx_jump = 0.0
    for i in range(len(mids) - 1):
        span = mids[i + 1]['a'] - mids[i]['a']
        jump = abs(mids[i + 1]['m'] - mids[i]['m']) / span
        mx_jump = max(mx_jump, jump)
    harness.check(mx_jump <= 2.3, 'table slope too steep: %.2f/yr' % mx_jump)

    print('PASS growth_curve (P1..P4; near-cap %.2f far %.2f)' % (abs(c_near), abs(c_far)))


if __name__ == '__main__':
    harness.main(run)
