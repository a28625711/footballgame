# Guard: China's national team must keep participating in the AI world even
# when the player is not in the squad (youth years / not called up) -- exactly
# like clubs keep playing without the player. natFx must tick every season with
# exactly one of the four big nat tournaments, the 4-year cycle must advance,
# and China (n_chn) may only ever appear in WC/AsiaCup finals (via AI
# qualification or the player), never in Euro/Copa.
import json

import harness

SEEDS = 4
JS = """
(function(){
var out={errs:[],seeds:[]};
var _NAMES={wc:'wc',asia:'asia',euro:'euro',copa:'copa'};
for(var s=60001;s<60001+%SEEDS%;s++){
  var origin={id:'sd',name:'sd',ovr:60,guanxi:50,money:500};
  var au=window.SIM.newState('normal',{'name':'p','origin':origin,'pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},s,null);
  au.age=12; au.phase='youth'; au.youthTeamId='cn-sh'; au.teamId='cn-sh';
  au.ovr=38; au.maxOvr=38; au.money=200; au.guanxi=50; au.talent=0.9;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  au.natStats={goals:0,assists:0,cs:0,ga:0}; au.totals={apps:0,goals:0,assists:0,cs:0,ga:0};
  var seen=[], chnIn=[];
  var g=0;
  function cap(age){
    var nf=au.natFx;
    if(nf){ var ks=Object.keys(nf.data||{}).join(','); var hasChn=JSON.stringify(nf.data).indexOf('n_chn')>=0;
      seen.push({age:age,season:nf.season,ks:ks,chn:hasChn}); if(hasChn)chnIn.push(ks); }
  }
  while(g++<400 && au.phase==='youth' && au.age<18){
    var p=au.pending;
    if(!p){ var a0=au.age; window.SIM.nextStep(); cap(a0); continue; }
    if(p.type==='random'){
      try{
        if(p.result){ var a1=au.age; window.__SIMTEST.cont(); cap(a1); }
        else{ window.SIM.choose(0); }
      }catch(e){ out.errs.push('random:'+String(e).slice(0,120)); window.SIM.nextStep(); }
      continue;
    }
    try{ var a2=au.age; window.SIM.nextStep(); cap(a2); }
    catch(e){ out.errs.push('next:'+String(e).slice(0,120)); break; }
  }
  out.seeds.push({seen:seen,chnIn:chnIn});
}
return JSON.stringify(out);
})()
""".replace('%SEEDS%', str(SEEDS))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['errs']:
        raise harness.Fail('runtime errors: ' + json.dumps(r['errs'][:3], ensure_ascii=False))
    allkeys = set()
    china_ok = True
    per_seed_seen = []
    for sd in r['seeds']:
        keys = set()
        seasons = []
        for y in sd['seen']:
            ks = set(k for k in y['ks'].split(',') if k)
            if not ks or len(ks) != 1 or not ks.issubset({'wc', 'asia', 'euro', 'copa'}):
                raise harness.Fail('bad natFx payload seed=%s: %r' % (sd, y))
            keys.update(ks)
            if y['season'] not in seasons:
                seasons.append(y['season'])
        if len(seasons) < 3:
            raise harness.Fail('too few youth natFx seasons: %d %r' % (len(seasons), seasons))
        if seasons != sorted(seasons):
            raise harness.Fail('natFx season labels out of order: %r' % (seasons,))
        per_seed_seen.append(len(keys))
        allkeys.update(keys)
        for ck in sd['chnIn']:
            for k in ck.split(','):
                if k not in ('wc', 'asia'):
                    china_ok = False
    # over the sampled youth seasons every cup must occur, incl. both wc & asia
    if not allkeys.issuperset({'wc', 'asia', 'euro', 'copa'}):
        raise harness.Fail('youth cycle incomplete: %r' % sorted(allkeys))
    if not china_ok:
        raise harness.Fail('China (n_chn) leaked into a non-AFC tournament in AI world')
    # China AI must actually enter some wc/asia finals across seeds (normal participation)
    china_appear = sum(1 for sd in r['seeds'] if sd['chnIn'])
    if china_appear < SEEDS * 0.5:
        raise harness.Fail('China AI rarely reaches wc/asia finals: %d/%d seeds' % (china_appear, SEEDS))
    print('PASS natfx_ai_china (youth seasons/cups per seed=%s; China finals appearances=%d/%d)'
          % (per_seed_seen, china_appear, SEEDS))


if __name__ == '__main__':
    harness.main(run)
