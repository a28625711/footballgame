import json, sys
sys.stdout.reconfigure(encoding='utf-8')
p = r'D:\football\openfootball-data\2026-27\en.1.json'
d = json.load(open(p, encoding='utf-8'))
print(d['name'])
m = d['matches'][0]
print(json.dumps(m, ensure_ascii=False)[:500])
