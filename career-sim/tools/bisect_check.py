# -*- coding: utf-8 -*-
"""node --check 二分：截断 sim.js 前 K 行 + 补 `}()));`，找第一个非『未闭合』错误的位置"""
import subprocess, tempfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')

src = open(r'D:\football\career-sim\src\sim.js', encoding='utf-8').read()
lines = src.split('\n')

def check(k):
    txt = '\n'.join(lines[:k]) + '\n}()));\n'
    fd, path = tempfile.mkstemp(suffix='.js')
    try:
        os.write(fd, txt.encode('utf-8'))
        os.close(fd)
        r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
        err = (r.stderr or '')
        if 'SyntaxError' not in err:
            return 'OK', ''
        if 'Unexpected end of input' in err:
            return 'OPEN', ''
        # 提取错误行号（相对截断文件）
        for ln in err.split('\n'):
            if 'SyntaxError' in ln:
                return 'ERR', ln.strip()
        return 'ERR', err.split('\n')[-3][-80:]
    finally:
        os.unlink(path)

lo, hi = 1, len(lines)
bad = []
prev_kind = None
for k in range(1, len(lines)+1):
    kind, msg = check(k)
    if kind != 'OPEN' and prev_kind == 'OPEN':
        bad.append((k, kind, msg))
        if len(bad) >= 3:
            break
    prev_kind = kind
    if k > 4263:
        break
print('first non-OPEN transitions:', bad)
