import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness

mr = harness.new_engine()

res = mr.eval("""
(function(){
  var D = window.DATA;
  var keys = Object.keys(D);
  var out = {};
  // find the array of teams
  for (var i=0;i<keys.length;i++){
    var k = keys[i];
    if (Array.isArray(D[k]) && D[k].length>0 && D[k][0] && D[k][0].league){ out.teamsKey = k; }
  }
  var counts = {};
  var byId = {};
  D[out.teamsKey].forEach(function(t){ counts[t.league]=(counts[t.league]||0)+1; if(byId[t.id]) byId[t.id]++; else byId[t.id]=1; });
  var dupIds = [];
  for (var id in byId){ if (byId[id]>1) dupIds.push(id+':'+byId[id]); }
  out.counts = counts;
  out.dupIds = dupIds;
  return JSON.stringify(out);
})()
""")
print(res)
