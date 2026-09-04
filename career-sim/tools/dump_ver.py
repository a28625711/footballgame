import re, sys
sys.stdout.reconfigure(encoding='utf-8')
c = open(r'D:\football\career-sim\src\data.js', encoding='utf-8').read()
for m in re.finditer(r"\{'id':\s*[\"']ver[\"'].*?\}", c, re.S):
    print(repr(m.group(0))[:160])
    print('---')
# Also count all 'id':"ver" and id 'ver'
print('count id ver dquote:', c.count("'id':\"ver\""))
print('count id ver squote:', c.count("'id':'ver'"))
