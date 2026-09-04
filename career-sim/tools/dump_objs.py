import re, sys
sys.stdout.reconfigure(encoding='utf-8')
c = open(r'D:\football\career-sim\src\data.js', encoding='utf-8').read()

ids = ['s04','pdb','elv','wob','her','nbg','ksl','boc','fdu','dus','reg','mun2','ulm',
       'eup','tfe','brb','ver','kiel','dar']
for tid in ids:
    m = re.search(r"\{'id':\"" + tid + r"\".*?\}", c, re.S)
    if m:
        print(f"--- {tid} ---")
        print(repr(m.group(0)))
    else:
        print(f"--- {tid}: NOT FOUND ---")
