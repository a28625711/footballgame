import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness
from collections import Counter
mr = harness.new_engine()
res = mr.eval("(function(){var D=window.DATA;var o=[];D.TEAMS.forEach(function(t){o.push(t);});return JSON.stringify(o);})()")
teams = json.loads(res)

expected = {'csl':16,'epl':20,'liga':20,'bund':18,'seri':20,'l1':18,'tur':19,'ere':18,
            'jup':16,'pri':18,'seg':22,'b2':18,'ch':24,'jl':20,'kl':12,'spl':18,'mls':29,'ale':13}

counts = Counter(t['league'] for t in teams)
print("== 1) 联赛数量 ==")
for lg in sorted(expected):
    h = counts.get(lg, 0); e = expected[lg]
    mark = "OK" if h == e else f"!! 缺{e-h if e>h else '多'+str(h-e)}"
    print(f"   {lg:4} {h:3}/{e:3}  {mark}")

ids = [t['id'] for t in teams]
dup_ids = [k for k, v in Counter(ids).items() if v > 1]
names = [t['name'] for t in teams]
dup_names = [k for k, v in Counter(names).items() if v > 1]
print("\n== 2) 重复 ==")
print("   重复ID:", dup_ids or "无")
print("   重名:", dup_names or "无")

crest_dir = r'D:\football\career-sim\assets\crests'
existing = set(os.listdir(crest_dir))
# crests.js entries
c = open(r'D:\football\career-sim\src\crests.js', encoding='utf-8').read()
import re
i = c.find("LS']="); start = c.find('{', i); depth=0; j=start
while j < len(c):
    if c[j]=='{': depth+=1
    elif c[j]=='}':
        depth-=1
        if depth==0: break
    j+=1
entries = {}
for part in c[start+1:j].split(','):
    m = re.match(r"^\s*'([^']+)':\s*(.*)$", part)
    if m:
        entries[m.group(1)] = ''.join(re.findall(r'"([^"]*)"', m.group(2)))

no_entry = [t for t in teams if t['id'] not in entries]
print("\n== 3) 缺队徽(无crests条目) ==")
for t in no_entry:
    print(f"   {t['id']} {t['name']} ({t['league']})")

bad_file = []
for k, v in entries.items():
    fn = os.path.basename(v)
    if fn not in existing:
        bad_file.append((k, fn))
print("\n== 4) crests条目指向不存在文件 ==", len(bad_file))
for k, fn in bad_file[:20]:
    print(f"   {k} -> {fn}")
