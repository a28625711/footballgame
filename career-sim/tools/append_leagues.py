# -*- coding: utf-8 -*-
"""向 leagues.ev.js 追加 6 个新联赛条目（cl1/l2/serb/pol/bra/arg），幂等。"""
P = r'D:\football\career-sim\src\data\leagues.ev.js'
txt = open(P, encoding='utf-8').read()
if "'id':'cl1'" in txt:
    print('already appended')
    raise SystemExit
add = (
",{'id':'cl1','name':'中甲','country':'CN','rep':0x1,'str':0x2c,'cn':!0x0,'cup':\"足协杯\",'cont':null,'leagueCup':null,'superCup':null}"
",{'id':'l2','name':'法乙','country':'FR','rep':0x2,'str':0x3d,'cn':!0x1,'cup':\"法国杯\",'cont':null,'leagueCup':null,'superCup':null}"
",{'id':'serb','name':'意乙','country':'IT','rep':0x2,'str':0x3c,'cn':!0x1,'cup':\"意大利杯\",'cont':null,'leagueCup':null,'superCup':null}"
",{'id':'pol','name':'波甲','country':'PL','rep':0x2,'str':0x3b,'cn':!0x1,'cup':\"波兰杯\",'cont':'欧联','leagueCup':null,'superCup':\"波兰超级杯\"}"
",{'id':'bra','name':'巴甲','country':'BR','rep':0x3,'str':0x45,'cn':!0x1,'cup':\"巴西杯\",'cont':'解放者杯','leagueCup':null,'superCup':\"巴西超级杯\"}"
",{'id':'arg','name':'阿甲','country':'AR','rep':0x3,'str':0x43,'cn':!0x1,'cup':\"阿根廷杯\",'cont':'解放者杯','leagueCup':null,'superCup':\"阿根廷超级杯\"}"
)
t = txt.rstrip()
assert t.endswith('}];'), t[-20:]
t = t[:-3] + add + '}];\n'
open(P, 'w', encoding='utf-8').write(t)
print('appended, league entries now:', t.count("'id':"))
