import re, sys
sys.stdout.reconfigure(encoding='utf-8')

path = r'D:\football\career-sim\src\data.js'
c = open(path, encoding='utf-8').read()
orig = c

def delete_id(c, tid):
    pat = r"\{'id':\"" + tid + r"\".*?\}(,)?"
    matches = list(re.finditer(pat, c, re.S))
    if len(matches) != 1:
        raise SystemExit(f"delete {tid}: found {len(matches)} matches")
    m = matches[0]
    # if trailing comma consumed, fine; else if next non-space char is a comma? already handled
    return c[:m.start()] + c[m.end():]

def move_league(c, tid, new_league):
    pat = r"\{'id':\"" + tid + r"\".*?\}"
    m = re.search(pat, c, re.S)
    if not m:
        raise SystemExit(f"move {tid}: not found")
    obj = m.group(0)
    # change the league token: accept either quote style after key 'league':
    new_obj = re.sub(r"'league':\s*['\"](\w+)['\"]", "'league':\"" + new_league + "\"", obj, count=1)
    if new_obj == obj:
        raise SystemExit(f"move {tid}: league token not replaced in {obj[:80]}")
    return c[:m.start()] + new_obj + c[m.end():]

# Deletes
for tid in ['nbg', 'boc', 'fdu', 'dus', 'reg', 'mun2', 'ulm', 'eup', 'tfe', 'brb']:
    c = delete_id(c, tid)

# League moves (bund <-> b2)
for tid, lg in [('s04','bund'), ('pdb','bund'), ('elv','bund'),
                ('wob','b2'), ('her','b2'), ('ksl','b2')]:
    c = move_league(c, tid, lg)

# Rename jl Tokyo Verdy id ver -> verdy (the object whose name is 东京绿茵)
pat = r"\{'id':\"ver\".*?\}"
m = None
for mm in re.finditer(pat, c, re.S):
    if '东京绿茵' in mm.group(0):
        m = mm
        break
if not m:
    raise SystemExit("ver(东京绿茵) object not found")
obj = m.group(0)
c = c[:m.start()] + obj.replace("'id':\"ver\"", "'id':\"verdy\"", 1) + c[m.end():]

# New teams to append (id,name,league,rep,color)
new_teams = [
    # b2 (7)
    ('bielefeld','比勒费尔德','b2',1,'#004197'),
    ('cottbus','科特布斯','b2',1,'#C8102E'),
    ('dresden','德累斯顿','b2',1,'#F5C400'),
    ('kiel','荷尔斯泰因基尔','b2',1,'#004197'),
    ('osnabruck','奥斯纳布吕克','b2',0,'#800000'),
    ('furth','菲尔特','b2',1,'#008B45'),
    ('heidenheim','海登海姆','b2',1,'#E31B23'),
    # jup (2)
    ('beveren','贝弗伦','jup',1,'#FFD700'),
    ('stv','圣特赖登','jup',1,'#FFD700'),
    # seg (4)
    ('alme','阿尔梅里亚','seg',1,'#E50000'),
    ('ando','安道尔','seg',0,'#004197'),
    ('ceut','休达','seg',0,'#004197'),
    ('vall','巴利亚多利德','seg',1,'#7A263A'),
    # ch (1)
    ('bolto','博尔顿','ch',1,'#C8102E'),
]

anchor = "}],'TROPHIES'"
if anchor not in c:
    raise SystemExit("anchor not found")
adds = ''.join(f"{{'id':\"{tid}\",'name':\"{nm}\",'league':\"{lg}\",'rep':{rp},'color':\"{cl}\"}}," for tid,nm,lg,rp,cl in new_teams)
c = c.replace(anchor, adds + anchor, 1)

open(path, 'w', encoding='utf-8').write(c)
print("data.js edited OK")
