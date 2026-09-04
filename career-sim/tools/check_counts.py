import re, sys
from collections import Counter
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\football\career-sim\src\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

teams_section = content[content.index("'TEAMS':["):]
team_entries = re.findall(
    r"'id':\"([^\"]+)\".*?'name':\"([^\"]+)\".*?'league':['\"]([^'\"]+)['\"]",
    teams_section
)

expected = {
    'csl': 16, 'epl': 20, 'liga': 20, 'bund': 18, 'seri': 20, 'l1': 18,
    'tur': 19, 'ere': 18, 'jup': 16, 'pri': 18, 'seg': 22, 'b2': 18,
    'ch': 24, 'jl': 20, 'kl': 12, 'spl': 18, 'mls': 29, 'ale': 13
}

counts = Counter(tl for _, _, tl in team_entries)
print("League | Have | Expected | Diff")
print("-" * 40)
for league in sorted(expected.keys()):
    have = counts.get(league, 0)
    exp = expected[league]
    diff = have - exp
    flag = " !!!" if diff != 0 else ""
    print(f"{league:6} | {have:4} | {exp:8} | {diff:+d}{flag}")
print(f"\nTotal: {sum(counts.values())} teams")
