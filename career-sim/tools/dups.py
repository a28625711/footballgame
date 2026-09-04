import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness
from collections import Counter
mr = harness.new_engine()
res = mr.eval("(function(){var D=window.DATA;var o={};D.TEAMS.forEach(function(t){(o[t.league]=o[t.league]||[]).push(t);});return JSON.stringify(o);})()")
data = json.loads(res)
print("Per-league name duplicates:")
for lg, teams in data.items():
    c = Counter(t['name'] for t in teams)
    dups = {n: k for n, k in c.items() if k > 1}
    if dups:
        print(f"  {lg}: {dups}")
print("Cross-league name duplicates:")
names = {}
for lg, teams in data.items():
    for t in teams:
        names.setdefault(t['name'], []).append(lg + '/' + t['id'])
for n, locs in names.items():
    if len(locs) > 1:
        print(f"  {n}: {locs}")
