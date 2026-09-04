import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
entries = json.load(open(r'D:\football\career-sim\tools\crests_dump.json', encoding='utf-8'))
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness
mr = harness.new_engine()
res = mr.eval("(function(){var D=window.DATA;var ids=[];D.TEAMS.forEach(function(t){ids.push(t.id);});return JSON.stringify(ids);})()")
teams = json.loads(res)
noentry = [t for t in teams if t not in entries]
print("teams", len(teams), "crest keys", len(entries), "no entry:", len(noentry))
print(sorted(noentry))
