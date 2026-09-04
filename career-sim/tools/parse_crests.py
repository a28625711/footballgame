import re, sys, json
sys.stdout.reconfigure(encoding='utf-8')
c = open(r'D:\football\career-sim\src\crests.js', encoding='utf-8').read()
# locate object literal: (0x0,(window["CREST_UR"+'LS']={ ... }));
i = c.find("LS']=")
start = c.find('{', i)
depth = 0
j = start
while j < len(c):
    if c[j] == '{': depth += 1
    elif c[j] == '}':
        depth -= 1
        if depth == 0:
            break
    j += 1
obj = c[start+1:j]
entries = {}
for part in obj.split(','):
    m = re.match(r"^\s*'([^']+)':\s*(.*)$", part)
    if not m:
        continue
    val = m.group(2)
    joined = ''.join(re.findall(r'"([^"]*)"', val))
    entries[m.group(1)] = joined
print('total', len(entries))
json.dump(entries, open(r'D:\football\career-sim\tools\crests_dump.json', 'w', encoding='utf-8'), ensure_ascii=False)
for k in ['s04','pdb','elv','wob','her','ksl','hsv','koe','bay','cry','mia','lag','lfc','nsr2','nbg','iam']:
    print(k, entries.get(k))
