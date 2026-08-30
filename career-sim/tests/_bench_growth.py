# Growth-curve A/B benchmark: per-age ovr trajectories, peak stats.
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
import harness

CAREERS = 60


def build_js():
    core = """
(function(){
function mk(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},seed);
  au.talent=1.15;
  var g0=0;
  while(g0++<400){
    if(au.phase==='youth'){
      if((au.talent||0)<1.3)au.talent=1.3;
      if(au.age>=14&&(!au.ovr||au.ovr<52)){au.ovr=52;au.maxOvr=Math.max(au.maxOvr||0,94);}
    }
    if(!au.pending&&au.phase==='youth'&&au.age>=14&&(!au.ovr||au.ovr<52)){au.ovr=52;au.maxOvr=Math.max(au.maxOvr||0,94);}
    var q=au.pending;
    if(!q){if(au.phase!=='youth')break;window.SIM.nextStep();continue;}
    try{
      if(q.type==='youth_path'){window.__SIMTEST.option(0);}
      else if(q.type==='academy'){window.__SIMTEST.option(0);break;}
      else if(q.type==='random'){if(q.result){window.__SIMTEST.cont();}else{window.__SIMTEST.option(0);}}
      else break;
    }catch(e){break;}
  }
  au.money=800;au.guanxi=50;au.clean=70;au.fame=50;
  au.roleAdjust=0;au.banned=false;au.banLeft=0;au.banGames=0;
  au.stagnate=false;au.lowSpell=0;
  return au;
}
var traj={};   // age -> [sum,count]
var peaks=[];  // {peakAge,peakOvr,dur,len}
for(var s=0;s<%N%;s++){
  var au=mk(70000+s),g=0,hist=[];
  while(g++<9000){
    if(au.phase==='youth'){
      if((au.talent||0)<1.3)au.talent=1.3;
      if(au.age>=14&&(!au.ovr||au.ovr<52)){au.ovr=52;au.maxOvr=Math.max(au.maxOvr||0,94);}
    }
    var p=au.pending;
    if(!p){
      if(au.phase==='summary'||au.phase==='done'||au.age>=48)break;
      try{window.SIM.nextStep();}catch(e){break;}
      continue;
    }
    try{
      if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);}}
      else if(p.type==='report'){window.__SIMTEST.cont();}
      else if(p.type==='bigmatch'){if(!p.result){window.SIM.choose('push');}else{window.__SIMTEST.cont();}}
      else if(p.type==='staff'){window.SIM.choose('skip');}
      else if(p.type==='transfer'){if(p.offers&&p.offers.length){var h=p.offers.indexOf('mci')>=0;window.SIM.choose(h?'mci':'stay');}else{window.SIM.choose(p.canStay?'stay':'retire');}}
      else if(p.type==='academy'||p.type==='youth_path'){window.SIM.choose(0);}
      else if(p.type==='retire_forced'){window.SIM.choose('retire');}
      else{window.SIM.nextStep();}
    }catch(e){}
    if(au.phase==='summary'||au.phase==='done')break;
  }
  for(var i=0;i<au.seasons.length;i++){
    var r=au.seasons[i];
    if(r.injury!==undefined&&r.injury!==null)continue; // injuries pollute deltas
    var t=traj[r.age];if(!t)t=traj[r.age]=[0,0];t[0]+=r.ovr;t[1]++;
    hist.push({age:r.age,ovr:r.ovr});
  }
  if(hist.length){
    var mx=-1,pA=null;
    hist.forEach(function(h){if(h.ovr>mx){mx=h.ovr;pA=h.age;}});
    var dur=hist.filter(function(h){return h.ovr>=mx-4;}).length;
    peaks.push({peakAge:pA,peakOvr:+mx.toFixed(1),dur:dur,len:hist.length});
  }
}
var trajOut={};
Object.keys(traj).forEach(function(k){trajOut[k]=+(traj[k][0]/traj[k][1]).toFixed(2);});
var pa={};peaks.forEach(function(x){pa[x.peakAge]=(pa[x.peakAge]||0)+1;});
return JSON.stringify({traj:trajOut,peakAgeHist:pa,
  avgPeakOvr:+(peaks.reduce(function(a,b){return a+b.peakOvr;},0)/peaks.length).toFixed(2),
  avgDur:+(peaks.reduce(function(a,b){return a+b.dur;},0)/peaks.length).toFixed(2),
  avgLen:+(peaks.reduce(function(a,b){return a+b.len;},0)/peaks.length).toFixed(2),
  n:peaks.length});
})()
""".replace('%N%', str(CAREERS))
    return core


def collect(tag):
    mr = harness.new_engine()
    data = json.loads(mr.eval(build_js()))
    path = os.path.join(r'C:\Users\chen\AppData\Local\Temp\opencode', tag)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f)
    print(tag, json.dumps(data)[:600], '...')
    return data


if __name__ == '__main__':
    collect(sys.argv[1] if len(sys.argv) > 1 else 'metrics_growth_out.json')
