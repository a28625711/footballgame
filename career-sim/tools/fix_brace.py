import sys
sys.stdout.reconfigure(encoding='utf-8')
p = r'D:\football\career-sim\src\data.js'
c = open(p, encoding='utf-8').read()
c = c.replace('#000000"{', '#000000"}, {', 1)
# remove leftover comma before TEAMS close marker introduced by our append
c = c.replace(',}]' + ",'TROPHIES'", '}]' + ",'TROPHIES'")
open(p, 'w', encoding='utf-8').write(c)
print('fixed')
