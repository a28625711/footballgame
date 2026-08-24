# End-to-end careers: start -> resolve every pending type -> summary screen.
# Renders at every step (render errors are fatal) and fails on unknown
# pending types, so new sim features must be wired into this resolver.
import json

import harness

KNOWN_TYPES = ['random', 'report', 'bigmatch', 'staff', 'transfer',
               'academy', 'youth_path', 'retire_forced']

JS = """
(function(){
var KNOWN={random:1,report:1,bigmatch:1,staff:1,transfer:1,academy:1,youth_path:1,retire_forced:1};
var out={careers:[],unknown:[],renderErrs:0,err:null};
function resolve(p){
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } window.__SIMTEST.cont(); return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){
    if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); }
    else{ window.__SIMTEST.option(p.canStay?'stay':'retire'); }
    return;
  }
  // Join the first offer: staying ('youth') forever ends in youth
  // elimination since canStayYouth is always true.
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  // retire_forced has no game-layer routing; must go through SIM directly.
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
  out.unknown.push(t);
}
function career(mode,seed){
  var st=window.__SIMTEST.start(mode,%NEW_PLAYER%,seed);
  st.talent=1.25;
  var g=0,big=0,stuck=true,lastType='',rep=0;
  while(g++<20000){
    // Guarantee a viable trajectory: joining a youth camp re-rolls talent
    // and blind option(0) answers under-develop kids, so every career would
    // legitimately end in youth elimination. Keep talent/ovr viable during
    // youth so the career actually reaches the pro pipelines we cover.
    if(st.phase==='youth'){
      if((st.talent||0)<1.3) st.talent=1.3;
      if(st.age>=14 && (!st.ovr || st.ovr<52)){
        st.ovr=52;
        st.maxOvr=Math.max(st.maxOvr||0,92);
      }
    }
    try{ String(window.__SIMTEST.render()); }
    catch(e){ out.renderErrs++; }
    var p=st.pending;
    if(!p){
      if(st.phase==='summary'||st.phase==='done'){ stuck=false; break; }
      try{ window.SIM.nextStep(); }catch(e){ out.err='seed='+seed+' nextStep: '+String(e).slice(0,150); return; }
      continue;
    }
    if(p.type==='bigmatch'&&!p.result) big++;
    if(p.type===lastType && ++rep>300){
      out.err='seed='+seed+' stuck repeating pending type '+p.type;
      return;
    }
    if(p.type!==lastType){ lastType=p.type; rep=0; }
    try{ resolve(p); }
    catch(e){
      try{ window.SIM.nextStep(); }
      catch(e2){ out.err='seed='+seed+' '+p.type+': '+String(e2).slice(0,150); return; }
    }
    // Terminal choices (e.g. retire) set phase without clearing pending;
    // treat any reached ending as done.
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; stuck=false; break; }
  }
  out.careers.push({mode:mode,seed:seed,stuck:stuck,phase:st.phase,age:st.age,
    seasons:(st.seasons||[]).length,trophies:((st.trophies||[]).length),
    awards:((st.awards||[]).length),bigmatch:big,endReason:st.endReason||''});
}
var modes=window.__SIMTEST.modes||{normal:1};
var keys=Object.keys(modes).slice(0,3);
for(var mi=0;mi<keys.length;mi++){
  career(String(keys[mi]),101+mi*17);
}
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['unknown']:
        raise harness.Fail('unknown pending types encountered: %s (add to resolver)'
                           % sorted(set(r['unknown'])))
    if r['renderErrs']:
        raise harness.Fail('%d render throws during careers' % r['renderErrs'])
    if not r['careers']:
        raise harness.Fail('no careers ran')
    maxAge = 0
    maxSeasons = 0
    for c in r['careers']:
        if c['stuck']:
            raise harness.Fail('career stuck: %r' % c)
        if c['phase'] not in ('summary', 'done'):
            raise harness.Fail('career not finished: %r' % c)
        # engine force-retires at 55 ("年龄到了"); anything below is legal
        if c['age'] >= 55:
            raise harness.Fail('unreasonable age %d in %r' % (c['age'], c))
        if c['seasons'] < 3 and not c['endReason']:
            raise harness.Fail('too few seasons (%d, no endReason) in %r'
                               % (c['seasons'], c))
        maxAge = max(maxAge, c['age'])
        maxSeasons = max(maxSeasons, c['seasons'])
    if maxSeasons < 5 or maxAge < 25:
        raise harness.Fail('no substantial career produced (maxSeasons=%d maxAge=%d)'
                           % (maxSeasons, maxAge))
    print('PASS full_career x%d (maxAge=%d, maxSeasons=%d, bigmatches=%d)'
          % (len(r['careers']), maxAge, maxSeasons,
             sum(c['bigmatch'] for c in r['careers'])))


if __name__ == '__main__':
    harness.main(run)
