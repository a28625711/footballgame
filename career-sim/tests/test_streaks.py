# Team-strength dynamics guard: champion bonus stacking used to pin dev at the
# +8 cap and produce decade-long dynasty runs (La Liga ~19-season max streak in
# a 30-season probe). The fix adds: champion-bonus discount on title streaks,
# stronger mean reversion at high |dev|, reduced bonus magnitudes, and a
# bottom-three rebuild compensation. This test runs a few headless 24-season
# world evolutions and asserts the runaway stays fixed.
import harness

SEEDS = 2
YEARS = 24

JS = """
window.__PROBE = function(seeds, years){
  var out=[];
  for(var s=0;s<seeds;s++){
    var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},9300+s*131);
    var champs={};
    for(var y=0;y<years;y++){
      var bz={trophies:[]};
      window.SIM.simWorld(bz,{name:'p'},{id:'liga'});
      window.SIM.promoReleg(bz,{name:'p'},{id:'liga'});
      var tb=window.SIM.lastTables();
      for(var lg in tb){ (champs[lg]=champs[lg]||[]).push(tb[lg][0]); }
    }
    var runs=[], liga=null;
    for(var lg2 in champs){
      var a=champs[lg2], cur=1;
      for(var i=1;i<a.length;i++){
        if(a[i]===a[i-1]){cur++;}
        else{ runs.push(cur); cur=1; }
      }
      runs.push(cur);
      if(lg2==='liga'){
        var uniq={}; for(var u=0;u<a.length;u++)uniq[a[u]]=1;
        liga=Object.keys(uniq).length;
      }
    }
    var devs=[], td=au["teamDev"]||{};
    for(var k in td)devs.push(td[k]);
    devs.sort(function(x,y){return y-x;});
    out.push({runs:runs, ligaUniq:liga, devMax:devs[0]||0});
  }
  return JSON.stringify(out);
};
""".replace('%SEEDS%', str(SEEDS))


def main():
    mr = harness.new_engine()
    mr.eval(JS)
    import json
    data = json.loads(mr.eval('window.__PROBE(%d,%d)' % (SEEDS, YEARS)))
    runs = []
    for d in data:
        runs.extend(d['runs'])
    runs.sort()
    mean_run = sum(runs)/len(runs)
    longest = runs[-1]
    liga_min = min(d['ligaUniq'] for d in data)
    devmax = max(d['devMax'] for d in data)
    print('mean run=%.2f longest=%d liga_uniq_min=%d dev_max=%d' % (mean_run, longest, liga_min, devmax))
    harness.check(mean_run <= 3.0, 'mean title-run too long: %.2f (dynasty feedback back?)' % mean_run)
    harness.check(longest <= 20, 'longest run %d too extreme' % longest)
    harness.check(liga_min >= 3, 'La Liga only %d distinct champions in %d seasons' % (liga_min, YEARS))
    harness.check(devmax <= 6, 'max dev pinned at %.1f (soft cap not working)' % devmax)


if __name__ == '__main__':
    harness.main(main)
