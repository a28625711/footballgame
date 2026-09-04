import json, os, sys
sys.stdout.reconfigure(encoding='utf-8')
p = r'D:\football\openfootball-data\2026-27\en.1.json'
d = json.load(open(p, encoding='utf-8'))
print(type(d))
if isinstance(d, list):
    print('len', len(d))
    print('first keys:', d[0].keys() if d else '')
    print(json.dumps(d[0], ensure_ascii=False)[:400])
elif isinstance(d, dict):
    print('keys:', list(d.keys()))
    for k in list(d.keys())[:5]:
        print(k, type(d[k]))
