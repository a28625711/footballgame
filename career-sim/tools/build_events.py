import sys, os, re, json
sys.stdout.reconfigure(encoding='utf-8')
import esprima

BASE = r'D:\football\career-sim'
SRC = os.path.join(BASE, 'src', 'events')
OUT = os.path.join(BASE, 'build', 'events.js')
NL = chr(10)

manifest = json.load(open(os.path.join(SRC, 'MANIFEST.json'), encoding='utf-8'))
order = manifest['order']

blocks = []
total = 0
for g in order:
    txt = open(os.path.join(SRC, g + '.ev.js'), encoding='utf-8').read()
    parts = re.split(r'// ---- idx:(\d+) \|[^\r\n]*----' + NL, txt)
    for i in range(1, len(parts), 2):
        body = parts[i + 1].strip()
        body = re.sub(r'\];\s*$', '', body).rstrip()   # strip trailing array-close from last block
        if body.endswith(','):                          # strip separator comma kept from split
            body = body[:-1].rstrip()
        blocks.append((int(parts[i]), body))
    total += len(re.findall(r'// ---- ', txt))
    print('%-10s %3d events' % (g, total if g == order[-1] else len(re.findall(r'// ---- ', txt))))

blocks.sort(key=lambda t: t[0])
assert [b[0] for b in blocks] == list(range(len(blocks))), 'index gap'

helpers = open(os.path.join(SRC, 'helpers.js'), encoding='utf-8').read()
h = helpers.replace("'use strict';", '', 1)

events_text = (',' + NL + NL).join(b for _, b in blocks)
built = NL.join([
    '(function(){',
    "'use strict';",
    h,
    'var j=[',
    events_text,
    '];',
    'window["EVENTS"]=j;',
    '}());',
])
esprima.parseScript(built)
open(OUT, 'w', encoding='utf-8', newline='').write(built)
print('built -> %s (%d chars, %d events, original order)' % (OUT, len(built), total))