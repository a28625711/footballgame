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
print(f'Total teams: {len(team_entries)}')

# Check for duplicate IDs
ids = [tid for tid, _, _ in team_entries]
dup_ids = {k:v for k,v in Counter(ids).items() if v > 1}
if dup_ids:
    print(f'DUPLICATE IDs: {dup_ids}')

# Check for duplicate names within same league
for league in set(tl for _,_,tl in team_entries):
    league_teams = [(tid,tname) for tid,tname,tl in team_entries if tl == league]
    names = [tname for _,tname in league_teams]
    dup_names = {k:v for k,v in Counter(names).items() if v > 1}
    if dup_names:
        print(f'{league} DUPLICATE names: {dup_names}')
