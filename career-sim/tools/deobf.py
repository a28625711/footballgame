import os, re, base64, urllib.parse, json

DST = r'D:\football\career-sim'
OUT = r'D:\football\career-sim\src'
FILES = ['data.js', 'events.js', 'supporters.js', 'crests.js', 'qr.js', 'sim.js', 'game.js']

OBF_TABLE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/='
STD_TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
TRANS = str.maketrans(OBF_TABLE, STD_TABLE)

def extract_array(path):
    """Robustly find the string-array function and parse its items."""
    t = open(path, encoding='utf-8', errors='replace').read()

    m_arr = re.search(r'function _[a-z0-9_]+_0a\(\)\{var (\w+)=\[(.*?)\];', t, re.S)
    if not m_arr:
        return None, None, None
    arrvar = m_arr.group(1)
    arr_src = m_arr.group(2)
    items = parse_items(arr_src)
    return t, arrvar, items

def parse_items(arr_src):
    """Parse array literal content into raw string items, handling escapes and
    braces/brackets inside strings. We scan char-by-char tracking quote state."""
    items = []
    buf = ''
    i = 0
    n = len(arr_src)
    in_str = False
    while i < n:
        c = arr_src[i]
        if not in_str:
            if c == "'":
                in_str = True
                buf = ''
            i += 1
            continue
        if c == '\\' and i + 1 < n:
            buf += arr_src[i:i+2]
            i += 2
            continue
        if c == "'":
            in_str = False
            items.append(buf)
            i += 1
            continue
        buf += c
        i += 1
    return items

def obf_decode(s):
    std = s.translate(TRANS)
    pad = (-len(std)) % 4
    if pad:
        std += '=' * pad
    raw = base64.b64decode(std)
    return raw.decode('utf-8')

def js_parse_int(s):
    if not s:
        return None
    mm = re.match(r'^[+\-]?0[xX][0-9a-fA-F]+|[+\-]?\d+', s.strip())
    if not mm:
        return None
    tok = mm.group(0)
    if re.match(r'^[+\-]?0[xX]', tok):
        return int(tok, 16)
    return int(float(tok)) if '.' in tok else int(tok)

def extract_info(path):
    t, arrvar, items = extract_array(path)
    if t is None:
        raise RuntimeError("array not found")

    m_off = re.search(r'function _[a-z0-9_]+_0b\([a-z]+,[a-z]+\)\{[a-z]+=[a-z]+-0x([0-9a-fA-F]+);', t)
    offset = int(m_off.group(1), 16)

    m_rot = re.search(r'while\(!!\[\]\)\{try\{var d=(.+?);if\(d===b\)break;else c\[\'push\'\]\(c\[\'shift\'\]\(\)\);', t)
    expr = m_rot.group(1)

    m_tgt = re.search(r'\}\}\}\((_?[a-z0-9_]+_0a),0x([0-9a-fA-F]+)\)', t)
    target = int(m_tgt.group(2), 16)

    return t, items, offset, expr, target

def evaluate_expr(expr, items, offset):
    def repl(m):
        hexv = int(m.group(1), 16)
        idx = hexv - offset
        if idx < 0 or idx >= len(items):
            return 'None'
        pv = js_parse_int(obf_decode(items[idx]))
        return str(pv) if pv is not None else 'None'
    expr2 = re.sub(r'parseInt\(\w+\(0x([0-9a-fA-F]+)\)\)', repl, expr)
    if 'parseInt' in expr2:
        return None
    try:
        return eval(expr2)
    except Exception:
        return None

def solve_rotation(items, offset, expr, target):
    for r in range(len(items) + 1):
        arr = items[r:] + items[:r]
        d = evaluate_expr(expr, arr, offset)
        if d is not None and abs(d - target) < 1e-6:
            return arr, r
    return None, None

def deobfuscate_file(fn):
    path = os.path.join(DST, fn)
    t, items, offset, expr, target = extract_info(path)

    arr, rot = solve_rotation(items, offset, expr, target)
    if arr is None:
        print(f"[{fn}] rotation FAILED - using unrotated")
        arr = items
        rot = 0
    else:
        print(f"[{fn}] rotation={rot}, target=0x{target:x}")

    runtime = {}
    for i, it in enumerate(arr):
        try:
            runtime[i + offset] = obf_decode(it)
        except Exception as ex:
            runtime[i + offset] = f"<ERR {ex}>"

    tbl = os.path.join(OUT, fn.replace('.js', '_strings.txt'))
    with open(tbl, 'w', encoding='utf-8') as f:
        for k in sorted(runtime):
            f.write(f"[{k}] {runtime[k]}\n")

    # build alias set - propagate aliases recursively
    fnname = re.search(r'function (_[a-z0-9_]+_0b)\(', t).group(1)
    aliases = set([fnname])
    changed = True
    while changed:
        changed = False
        # find var X=<alias>; / X=alias, patterns for current alias set (recursive)
        pat_vars = re.findall(r'var\s+(\w+)\s*=\s*(\w+)(?=[,;])', t)
        pat_assign = re.findall(r'\b(\w+)\s*=\s*(\w+)(?=[,;])', t)
        for a, b in pat_vars + pat_assign:
            if b in aliases and a not in aliases:
                aliases.add(a)
                changed = True

    def repl_all(m):
        key = int(m.group(1), 16)
        if key in runtime:
            return json.dumps(runtime[key], ensure_ascii=False)
        return m.group(0)

    out = t
    for alias in sorted(aliases, key=len, reverse=True):
        out = re.sub(r'\b' + re.escape(alias) + r'\(0x([0-9a-fA-F]+)\)', repl_all, out)

    dest = os.path.join(OUT, fn.replace('.js', '.deob.js'))
    with open(dest, 'w', encoding='utf-8') as f:
        f.write(out)
    print(f"[{fn}] -> {dest} ({len(out)} chars)")

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for fn in FILES:
        try:
            deobfuscate_file(fn)
        except Exception as e:
            import traceback
            print(f"[{fn}] ERROR: {e}")
            traceback.print_exc()
