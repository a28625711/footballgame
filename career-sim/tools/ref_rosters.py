import json, os, sys, re
sys.stdout.reconfigure(encoding='utf-8')

base = r'D:\football\openfootball-data'
# league -> (file, kind)  kind: 'season' year folders, or calendar-year folder for spring leagues
refs = {
 'epl':  ('2026-27', 'en.1.json'),
 'ch':   ('2026-27', 'en.2.json'),
 'liga': ('2026-27', 'es.1.json'),
 'seg':  ('2025-26', 'es.2.json'),
 'bund': ('2026-27', 'de.1.json'),
 'b2':   ('2025-26', 'de.2.json'),
 'seri': ('2026-27', 'it.1.json'),
 'l1':   ('2026-27', 'fr.1.json'),
 'ere':  ('2026-27', 'nl.1.json'),
 'pri':  ('2026-27', 'pt.1.json'),
 'jup':  ('2025-26', 'be.1.json'),
 'tur':  ('2025-26', 'tr.1.json'),
 'csl':  ('2025',    'cn.1.json'),
 'jl':   ('2025',    'jp.1.json'),
 'mls':  ('2025',    'mls.json'),
 'ale':  ('2024-25', 'au.1.json'),
}

def clubs(season, fn):
    p = os.path.join(base, season, fn)
    if not os.path.exists(p):
        return None, None
    d = json.load(open(p, encoding='utf-8'))
    if not isinstance(d, dict) or 'matches' not in d:
        return d.get('name'), []
    s = set()
    for m in d['matches']:
        s.add(m['team1']); s.add(m['team2'])
    return d.get('name'), sorted(s)

for lg, (season, fn) in refs.items():
    name, cs = clubs(season, fn)
    if cs is None:
        print(f"=== {lg}: MISSING {season}/{fn}")
        continue
    print(f"=== {lg} ({season} {fn}) count={len(cs)}  name={name}")
    for c in cs:
        print("   ", c)
