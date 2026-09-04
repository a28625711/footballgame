import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')
crest_dir = r'D:\football\career-sim\assets\crests'
p = r'D:\football\career-sim\src\crests.js'
c = open(p, encoding='utf-8').read()

i = c.find("LS']="); start = c.find('{', i); depth = 0; j = start
while j < len(c):
    if c[j] == '{': depth += 1
    elif c[j] == '}':
        depth -= 1
        if depth == 0: break
    j += 1
body = c[start:j+1]
# append entries before closing }
adds = "'corum':\"assets/c\"+\"rests/corum.svg\",'erzurum':\"assets/c\"+\"rests/erzurum.svg\""
new_body = body[:-1] + adds + body[-1:]
c = c[:start] + new_body + c[j+1:]
open(p, 'w', encoding='utf-8').write(c)
import esprima
esprima.parseScript(c)
print("added, syntax OK")
