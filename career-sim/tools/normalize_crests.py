import sys, os, json, shutil
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'
p = r'D:\football\career-sim\src\crests.js'
c = open(p, encoding='utf-8').read()

# parse entries again
i = c.find("LS']=")
start = c.find('{', i)
depth = 0; j = start
while j < len(c):
    if c[j] == '{': depth += 1
    elif c[j] == '}':
        depth -= 1
        if depth == 0: break
    j += 1
obj = c[start+1:j]
entries = {}
import re
for part in obj.split(','):
    m = re.match(r"^\s*'([^']+)':\s*(.*)$", part)
    if not m: continue
    val = m.group(2)
    joined = ''.join(re.findall(r'"([^"]*)"', val))
    entries[m.group(1)] = joined

changed = 0
for key, path in entries.items():
    fn = os.path.basename(path)   # e.g. xxx.svg
    stem, ext = os.path.splitext(fn)
    if stem != key:
        src = os.path.join(crest_dir, fn)
        dst = os.path.join(crest_dir, key + ext)
        if not os.path.exists(dst):
            shutil.copy2(src, dst)
        entries[key] = 'assets/crests/' + key + ext
        changed += 1

keys = sorted(entries)
def emit_line(ks):
    parts = []
    for k in ks:
        fn = entries[k].split('/')[-1]
        parts.append("'" + k + "':\"assets/c\"+\"rests/" + fn + "\"")
    return ','.join(parts)

lines = []
buf = []
for k in keys:
    buf.append(k)
    if len(buf) >= 8:
        lines.append(emit_line(buf)); buf = []
if buf:
    lines.append(emit_line(buf))

out = "(0x0,(window[\"CREST_UR\"+'LS']={" + ",\n".join(lines) + "}));\n"
open(p, 'w', encoding='utf-8').write(out)
print("copied/renamed entries:", changed, "total:", len(entries))

# verify all value stems == key
bad = [k for k, v in entries.items() if os.path.splitext(os.path.basename(v))[0] != k]
print("mismatches left:", bad)
import esprima
esprima.parseScript(out)
print("syntax OK")
