import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness
mr = harness.new_engine()
res = mr.eval("(function(){var D=window.DATA;var o={};D.TEAMS.forEach(function(t){(o[t.league]=o[t.league]||[]).push(t.id+':'+t.name);});return JSON.stringify(o);})()")
lists = json.loads(res)
for lg in ['jl','bund','b2','jup','seg','epl','ch','liga']:
    print(f"=== {lg} ({len(lists.get(lg,[]))})")
    for x in lists.get(lg, []):
        print("   ", x)
