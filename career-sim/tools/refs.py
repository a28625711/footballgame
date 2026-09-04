import re, sys
sys.stdout.reconfigure(encoding='utf-8')
ids = ['nbg', 'boc', 'fdu', 'dus', 'reg', 'mun2', 'ulm', 'eup', 'tfe', 'brb', 'nsr', 'fth', 'iam']
c = open(r'D:\football\career-sim\src\sim.js', encoding='utf-8').read()
for i in ids:
    pat = re.compile(r"['\"]" + i + r"['\"]")
    hits = list(pat.finditer(c))
    if hits:
        print('sim.js', i, len(hits))
        for h in hits[:3]:
            print('    ...', c[max(0, h.start()-40):h.end()+40].replace('\n', ' '))
print('--- ver in sim.js ---')
for h in re.finditer(r"['\"]ver['\"]", c):
    print('    ...', c[max(0, h.start()-40):h.end()+40].replace('\n', ' '))
print('--- crests.js keys ---')
cc = open(r'D:\football\career-sim\src\crests.js', encoding='utf-8').read()
for i in ids + ['ver']:
    if re.search(r"'" + i + r"':", cc):
        print('crests has key', i)
