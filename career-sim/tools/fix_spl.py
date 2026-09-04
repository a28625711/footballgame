import re, sys
sys.stdout.reconfigure(encoding='utf-8')
p = r'D:\football\career-sim\src\data.js'
c = open(p, encoding='utf-8').read()

def delete_id(c, tid):
    pat = r"\{'id':\"" + tid + r"\".*?\}(,)?"
    ms = list(re.finditer(pat, c, re.S))
    if len(ms) != 1:
        raise SystemExit(f"delete {tid}: {len(ms)} matches")
    m = ms[0]
    return c[:m.start()] + c[m.end():]

for tid in ['nsr', 'fth', 'iam']:
    c = delete_id(c, tid)

bolto_pat = r"\{'id':\"bolto\".*?\}"
m = re.search(bolto_pat, c, re.S)
if not m:
    raise SystemExit("bolto not found")
adds = (
    "{'id':\"riyah\",'name':\"利雅得\",'league':\"spl\",'rep':1,'color':\"#004197\"},"
    "{'id':\"neom\",'name':\"新未来城\",'league':\"spl\",'rep':1,'color':\"#FF6600\"},"
    "{'id':\"sandi\",'name':\"圣迭戈\",'league':\"mls\",'rep':1,'color':\"#004197\"}"
)
c = c[:m.start()] + m.group(0) + "," + adds + c[m.end():]
open(p, 'w', encoding='utf-8').write(c)
print("spl/mls dup fix applied")
