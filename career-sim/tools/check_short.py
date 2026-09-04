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

short = []
for league, exp in expected.items():
    have = counts.get(league, 0)
    if have != exp:
        short.append((league, have, exp, exp - have))

print("数量不对的联赛：")
print(f"{'联赛':>6} | {'现有':>4} | {'应有':>4} | {'缺':>4}")
print("-" * 35)
for league, have, exp, diff in sorted(short, key=lambda x: -x[3]):
    print(f"{league:>6} | {have:>4} | {exp:>4} | {diff:>+4}")
print(f"\n总计缺 {sum(s[3] for s in short)} 个球队")
