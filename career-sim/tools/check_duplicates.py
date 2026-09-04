import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\football\career-sim\src\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

teams_section = content[content.index("'TEAMS':["):]
team_entries = re.findall(
    r"'id':\"([^\"]+)\".*?'name':\"([^\"]+)\".*?'league':['\"]([^'\"]+)['\"]",
    teams_section
)

# Check for duplicate names across leagues
from collections import Counter
name_count = Counter(tname for _, tname, _ in team_entries)
dups = {name: count for name, count in name_count.items() if count > 1}

if dups:
    print("=== DUPLICATE NAMES ACROSS LEAGUES ===")
    for name, count in sorted(dups.items()):
        teams = [(tid, tl) for tid, tname, tl in team_entries if tname == name]
        print(f"  {name} ({count}x): {teams}")

# Check bund vs b2 overlap
bund_teams = set(tname for _, tname, tl in team_entries if tl == 'bund')
b2_teams = set(tname for _, tname, tl in team_entries if tl == 'b2')
overlap = bund_teams & b2_teams
if overlap:
    print(f"\n=== bund/b2 OVERLAP ===")
    for name in overlap:
        ids = [(tid, tl) for tid, tname, tl in team_entries if tname == name]
        print(f"  {name}: {ids}")

# Also check ch vs seg, etc.
ch_teams = set(tname for _, tname, tl in team_entries if tl == 'ch')
seg_teams = set(tname for _, tname, tl in team_entries if tl == 'seg')
overlap2 = ch_teams & seg_teams
if overlap2:
    print(f"\n=== ch/seg OVERLAP ===")
    for name in overlap2:
        ids = [(tid, tl) for tid, tname, tl in team_entries if tname == name]
        print(f"  {name}: {ids}")
