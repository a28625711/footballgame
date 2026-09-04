import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')
crest_dir = r'D:\football\career-sim\assets\crests'
p = r'D:\football\career-sim\src\crests.js'
c = open(p, encoding='utf-8').read()

i = c.find("LS']="); start = c.find('{', i); depth = 0; j = start
while j < len(c):
    if c[j] == '{': depth += 1
    elif c[j] == '}':
        depth -= 1
        if depth == 0: break
    j += 1
obj = c[start+1:j]
entries = {}
for part in obj.split(','):
    m = re.match(r"^\s*'([^']+)':\s*(.*)$", part)
    if not m: continue
    entries[m.group(1)] = ''.join(re.findall(r'"([^"]*)"', m.group(2)))

for fid in ['corum', 'erzurum']:
    if not os.path.exists(os.path.join(crest_dir, fid + '.svg')):
        raise SystemExit(f"{fid}.svg missing")
    entries[fid] = 'assets/crests/' + fid + '.svg'

keys = sorted(entries)
def emit(ks):
    return ','.join("'" + k + "':\"assets/c\"+\"rests/" + entries[k].split('/')[-1] + "\"" for k in ks)
lines = []
for i2 in range(0, len(keys), 8):
    lines.append(emit(keys[i2:i2+8]))
out = "(0x0,(window[\"CREST_UR\"+'LS']={" + ",\n".join(lines) + "}));\n"
open(p, 'w', encoding='utf-8').write(out)
import esprima
esprima.parseScript(out)
print("crests.js OK, entries:", len(entries))
