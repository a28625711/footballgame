import sys
sys.stdout.reconfigure(encoding='utf-8')
p = r'D:\football\career-sim\src\data.js'
c = open(p, encoding='utf-8').read()
old = "#C8102E\"}}],'TROPHIES'"
new = "#C8102E\"}],'TROPHIES'"
if old in c:
    c = c.replace(old, new)
else:
    print("pattern not found; context:")
    i = c.find("}}]")
    print(c[i-120:i+40])
    sys.exit(1)
open(p, 'w', encoding='utf-8').write(c)
print('done')
