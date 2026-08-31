import sys, os
sys.stdout.reconfigure(encoding='utf-8')

def formatter_final(code, max_line=120):
    """最终方案：; 换行 + 长行按逗号拆分（不拆 +，避免正则/ASI 问题）"""
    out = []
    in_str = None
    in_rx = False
    line = []
    i = 0
    n = len(code)
    def flush():
        nonlocal line
        if line:
            s = ''.join(line)
            if len(s) > max_line:
                out.extend(split_comma(s, max_line))
            else:
                out.append(s)
            line = []
    while i < n:
        c = code[i]
        if in_str:
            line.append(c)
            if c == '\\' and i+1 < n: line.append(code[i+1]); i += 2; continue
            if c == in_str: in_str = None
            i += 1; continue
        if in_rx:
            line.append(c)
            if c == '\\' and i+1 < n: line.append(code[i+1]); i += 2; continue
            if c == '/': in_rx = False
            i += 1; continue
        if c in ('"', "'", '`'): in_str = c; line.append(c); i += 1; continue
        if c == '/':
            prev = ''.join(line).rstrip()
            if prev and prev[-1] not in ')]}' and not prev[-1].isalnum() and prev[-1] != '_' and code[i+1] not in '/*':
                in_rx = True; line.append(c); i += 1; continue
        if c == ';':
            line.append(c); flush(); i += 1; continue
        line.append(c)
        i += 1
    flush()
    return '\n'.join(out)

def split_comma(s, max_line):
    parts = []
    start = 0
    depth = 0
    in_str = None
    in_rx = False
    i = 0
    while i < len(s):
        c = s[i]
        if in_str:
            if c == '\\': i += 2; continue
            if c == in_str: in_str = None
            i += 1; continue
        if in_rx:
            if c == '\\': i += 2; continue
            if c == '/': in_rx = False
            i += 1; continue
        if c in ('"', "'", '`'): in_str = c; i += 1; continue
        if c == '/':
            prev_code = s[:i].rstrip()
            if prev_code and prev_code[-1] not in ')]}' and not prev_code[-1].isalnum() and prev_code[-1] != '_' and s[i+1] not in '/*':
                in_rx = True; i += 1; continue
        if c in '({[': depth += 1
        elif c in ')}]': depth -= 1
        elif c == ',' and depth <= 1 and i - start > max_line:
            parts.append(s[start:i+1]); start = i + 1
        i += 1
    parts.append(s[start:])
    return parts

if __name__ == '__main__':
    base = r'D:\football\career-sim\src'
    outdir = r'C:\Users\chen\AppData\Local\Temp\opencode\formatted_final'
    os.makedirs(outdir, exist_ok=True)
    files = ['data.js','supporters.js','crests.js','qr.js','sim.js','game.js','../build/events.js']
    for f in files:
        p = os.path.join(base, f)
        t = open(p, encoding='utf-8').read()
        result = formatter_final(t)
        out = os.path.join(outdir, os.path.basename(f).replace('.js', '.formatted.js'))
        with open(out, 'w', encoding='utf-8') as fh:
            fh.write(result)
        lines = result.split('\n')
        print(f"{f}: {len(lines)} 行, 超长(>200): {sum(1 for l in lines if len(l)>200)}")
