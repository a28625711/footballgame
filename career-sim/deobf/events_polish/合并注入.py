# -*- coding: utf-8 -*-
"""Merge part_XX_done.json files and inject polished text into events.deob.js.

Usage:
    python 合并注入.py            # apply
    python 合并注入.py --dry      # preview only
"""
import json, glob, os, re, shutil, sys

BASE = r'D:\football\career-sim\deobf\events_polish'
OUT = r'D:\football\career-sim\deobf\events.deob.js'

STR = r"(?:'[^'\\]*(?:\\.[^'\\]*)*'|\"[^\"\\]*(?:\\.[^\"\\]*)*\")"
CONCAT = re.compile(STR + r'(?:\s*\+\s*' + STR + r')*')

def js_str(s):
    inner = s[1:-1]; out = []; i = 0
    while i < len(inner):
        c = inner[i]
        if c == '\\':
            nxt = inner[i+1:i+2]
            m = {'n':'\n','t':'\t','r':'\r','\\':'\\',"'":"'",'"':'"','`':'`','0':'\0','b':'\b','f':'\f','v':'\v'}
            if nxt in m: out.append(m[nxt]); i += 2
            elif nxt == 'u': out.append(chr(int(inner[i+2:i+6],16))); i += 6
            elif nxt == 'x': out.append(chr(int(inner[i+2:i+4],16))); i += 4
            else: out.append(nxt); i += 2
        else: out.append(c); i += 1
    return ''.join(out)

def evalc(expr):
    p = CONCAT.fullmatch(expr.strip())
    if not p: return None
    return ''.join(js_str(s) for s in re.findall(STR, expr))

def find_balanced(t, start, open_ch, close_ch):
    d = 0; q = None; i = start
    while i < len(t):
        c = t[i]
        if q:
            if c == '\\': i += 2; continue
            if c == q: q = None
        elif c in "'\"":
            q = c
        elif c == open_ch: d += 1
        elif c == close_ch:
            d -= 1
            if d == 0: return i
        i += 1
    return None

def collect_simple_edits(t, mapping, out):
    KEY = re.compile(r"'(?:desc|title|text|icon|label|hint)':")
    i = 0
    while i < len(t):
        m = KEY.search(t, i)
        if not m: break
        j = m.end()
        k = j
        while k < len(t) and t[k] in ' \t\r\n': k += 1
        if k < len(t) and t[k] in "'\"":
            cm = CONCAT.match(t, k)
            if cm:
                val = evalc(cm.group(0))
                if val in mapping:
                    out.append((k, cm.end(), json.dumps(mapping[val], ensure_ascii=False)))
                i = cm.end()
                continue
        i = m.end()

def collect_special_edits(t, mapping, out):
    # 'text':h(p,{...})  and  'text':( ... )  - position-specific / ternary texts
    pats = list(re.finditer(r"'text':h\(", t)) + list(re.finditer(r"'text':\(", t))
    for mm in pats:
        j = mm.end()
        if mm.group(0).endswith('h('):
            ob = t.find('{', j)
            if ob == -1: continue
            endb = find_balanced(t, ob, '{', '}')
            if endb is None: continue
            scan_from, scan_to = ob, endb + 1
        else:
            endp = find_balanced(t, j, '(', ')')
            if endp is None: continue
            e = endp + 1
            while e < len(t) and t[e] in ' \t\r\n': e += 1
            if e < len(t) and t[e] == '+':
                cm = CONCAT.match(t, e)
                if cm: e = cm.end()
            scan_from, scan_to = j, e
        seg = t[scan_from:scan_to]
        off = scan_from
        for sl in re.findall(STR, seg):
            val = evalc(sl)
            if val in mapping:
                idx = seg.find(sl)
                out.append((off + idx, off + idx + len(sl), json.dumps(mapping[val], ensure_ascii=False)))

# ---- build mapping from done files ----
def main():
    all_items = {it['id']: it for it in json.load(open(
        r'C:\Users\chen\AppData\Local\Temp\opencode\evcheck\extract\all_items.json', encoding='utf-8'))}

    mapping = {}
    missing = []
    dones = sorted(glob.glob(os.path.join(BASE, 'part_*_done.json')))
    print('done files:', [os.path.basename(d) for d in dones])
    for fn in dones:
        data = json.load(open(fn, encoding='utf-8'))
        revs = data['revisions'] if isinstance(data, dict) else data
        for r in revs:
            if 'original' in r and 'polished' in r:
                # manual fix (non-narrative strings like hint/icon)
                pol = (r.get('polished') or '').strip()
                if pol and pol != r['original']:
                    if r['original'] in mapping and mapping[r['original']] != pol:
                        print('  CONFLICT %r' % r['original'])
                    mapping[r['original']] = pol
                continue
            rid = r['id']
            if rid not in all_items:
                print('  unknown id:', rid); continue
            pol = (r.get('polished') or '').strip()
            orig = all_items[rid]['original']
            if not pol:
                missing.append(rid); continue
            if pol != orig:
                if orig in mapping and mapping[orig] != pol:
                    print('  CONFLICT %r' % orig)
                mapping[orig] = pol

    print('polished unique strings:', len(mapping))
    if missing:
        print('missing/blank ids (%d): %s' % (len(missing), missing[:40]))

    # ---- inject ----
    t = open(OUT, encoding='utf-8').read()
    edits = []
    collect_simple_edits(t, mapping, edits)
    collect_special_edits(t, mapping, edits)

    edits.sort()
    merged = []
    for st, en, repl in edits:
        if merged and st < merged[-1][1]:
            continue
        merged.append((st, en, repl))

    for st, en, repl in sorted(merged, reverse=True):
        t = t[:st] + repl + t[en:]

    print('total edits applied:', len(merged))
    if '--dry' in sys.argv:
        print('DRY RUN - not written')
    else:
        if not os.path.exists(OUT + '.bak'):
            shutil.copy(OUT, OUT + '.bak')
        open(OUT, 'w', encoding='utf-8').write(t)
        print('written ->', OUT)

if __name__ == '__main__':
    main()