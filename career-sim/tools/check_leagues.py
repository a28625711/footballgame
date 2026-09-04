import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\football\career-sim\src\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

teams_section = content[content.index("'TEAMS':["):]
team_entries = re.findall(
    r"'id':\"([^\"]+)\".*?'name':\"([^\"]+)\".*?'league':['\"]([^'\"]+)['\"]",
    teams_section
)

# Show teams for affected leagues
leagues = ['tur', 'ere', 'jup', 'pri', 'seg', 'ch', 'bund', 'b2']
for league in leagues:
    teams = [(tid, tname) for tid, tname, tl in team_entries if tl == league]
    print(f'\n=== {league} ({len(teams)} teams) ===')
    for tid, tname in teams:
        print(f'  {tid}: {tname}')
