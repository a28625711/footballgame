# -*- coding: utf-8 -*-
"""按大括号深度把 wrapper 内的顶层语句切段，逐段 node --check 定位坏段"""
import subprocess, tempfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')

src = open(r'D:\football\career-sim\src\sim.js', encoding='utf-8').read()
lines = src.split('\n')

# 大括号深度扫描（跳过字符串/注释），记录每行行首深度与行内是否出现 { }
depth = 0
i = 0; n = len(src); line = 1
in_str = None; in_comment = None
starts = []   # depth 从 0->1 的行（wrapper 函数体顶层语句开始）
first_line = None
line_delta = {1: 0}
deltas = []
while i < n:
    c = src[i]
    if c == '\n':
        line += 1
        if in_comment == '//': in_comment = None
        deltas.append(None)
    elif in_comment == '//':
        pass
    elif in_comment == '/*':
        if c == '*' and i+1 < n and src[i+1] == '/':
            in_comment = None; i += 1
    elif in_str:
        if c == '\\': i += 1
        elif c == in_str: in_str = None
    else:
        if c == '/' and i+1 < n and src[i+1] == '/': in_comment = '//'
        elif c == '/' and i+1 < n and src[i+1] == '*': in_comment = '/*'; i += 1
        elif c in ('"', "'", '`'): in_str = c
        elif c == '{':
            if depth == 0 and first_line is None:
                first_line = line
            depth += 1
            if depth == 1:
                starts.append(line)
        elif c == '}':
            depth -= 1
    i += 1
print('wrapper body starts (brace-depth 0->1) at lines:', starts[:5], 'total', len(starts))

# 顶层语句区间：wrapper body = 第一个 { 所在函数；其顶层语句为深度 1 的行段
# 重新扫描：记录每个顶层语句的起止行（depth==1 的行段）
depth = 0; i = 0; line = 1; in_str = None; in_comment = None
stmts = []
cur_start = None
while i < n:
    c = src[i]
    if c == '\n':
        line += 1
        if in_comment == '//': in_comment = None
    elif in_comment == '//':
        pass
    elif in_comment == '/*':
        if c == '*' and i+1 < n and src[i+1] == '/':
            in_comment = None; i += 1
    elif in_str:
        if c == '\\': i += 1
        elif c == in_str: in_str = None
    else:
        if c == '/' and i+1 < n and src[i+1] == '/': in_comment = '//'
        elif c == '/' and i+1 < n and src[i+1] == '*': in_comment = '/*'; i += 1
        elif c in ('"', "'", '`'): in_str = c
        elif c == '{':
            depth += 1
            if depth == 2 and cur_start is None:
                cur_start = line
        elif c == '}':
            depth -= 1
            if depth == 1 and cur_start is not None:
                stmts.append((cur_start, line))
                cur_start = None
    i += 1
print('top-level blocks:', len(stmts))
for k, (a, b) in enumerate(stmts):
    txt = '\n'.join(lines[a-1:b]) + '\n'
    fd, path = tempfile.mkstemp(suffix='.js')
    os.write(fd, txt.encode('utf-8')); os.close(fd)
    r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
    os.unlink(path)
    if 'SyntaxError' in (r.stderr or ''):
        msg = [l for l in r.stderr.split('\n') if 'SyntaxError' in l]
        print('BAD block %d lines %d-%d: %s' % (k, a, b, msg[0][:90] if msg else '?'))
