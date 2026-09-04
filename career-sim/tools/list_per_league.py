import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness

mr = harness.new_engine()

res = mr.eval("""
(function(){
  var D = window.DATA;
  var counts = {};
  var lists = {};
  D.TEAMS.forEach(function(t){
    (lists[t.league]=lists[t.league]||[]).push(t.id+':'+t.name);
  });
  return JSON.stringify(lists);
})()
""")
import json
lists = json.loads(res)
expected = {'csl':16,'epl':20,'liga':20,'bund':18,'seri':20,'l1':18,'tur':19,'ere':18,'jup':16,'pri':18,'seg':22,'b2':18,'ch':24,'jl':20,'kl':12,'spl':18,'mls':29,'ale':13}
for lg in sorted(expected):
    n = len(lists.get(lg, []))
    mark = '' if n == expected[lg] else '  <-- WRONG'
    print(f"=== {lg} ({n}/{expected[lg]}){mark}")
    if n != expected[lg]:
        for x in lists.get(lg, []):
            print(f"    {x}")
