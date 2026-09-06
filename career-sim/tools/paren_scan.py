# -*- coding: utf-8 -*-
import sys
sys.stdout.reconfigure(encoding='utf-8')

src = open(r'D:\football\career-sim\src\sim.js', encoding='utf-8').read()

def scan(target):
    close = {'{': '}', '(': ')'}[target]
    depth = 0; i = 0; n = len(src); line = 1
    in_str = None; in_comment = None; neg = []; marks = {}
    while i < n:
        c = src[i]
        if c == '\n':
            line += 1
            if in_comment == '//':
                in_comment = None
        elif in_comment == '//':
            pass
        elif in_comment == '/*':
            if c == '*' and i+1 < n and src[i+1] == '/':
                in_comment = None
                i += 1
        elif in_str:
            if c == '\\':
                i += 1
            elif c == in_str:
                in_str = None
        else:
            if c == '/' and i+1 < n and src[i+1] == '/':
                in_comment = '//'
            elif c == '/' and i+1 < n and src[i+1] == '*':
                in_comment = '/*'
                i += 1
            elif c in ('"', "'", '`'):
                in_str = c
            elif c == target:
                depth += 1
            elif c == close:
                depth -= 1
                if depth < 0:
                    neg.append((line, depth))
                    depth = 0
        i += 1
        if line % 250 == 0 and line not in marks:
            marks[line] = depth
    return depth, marks, neg

for t in ('{', '('):
    d, m, neg = scan(t)
    print(t, 'final', d, 'neg', neg[:3])
    print({k: v for k, v in list(m.items())[::4]})

# 细扫 1950-2350 找 { 深度跳变
depth = 0; i = 0; n = len(src); line = 1
in_str = None; in_comment = None; prev = None
while i < n:
    c = src[i]
    if c == '\n':
        line += 1
        if in_comment == '//':
            in_comment = None
    elif in_comment == '//':
        pass
    elif in_comment == '/*':
        if c == '*' and i+1 < n and src[i+1] == '/':
            in_comment = None
            i += 1
    elif in_str:
        if c == '\\':
            i += 1
        elif c == in_str:
            in_str = None
    else:
        if c == '/' and i+1 < n and src[i+1] == '/':
            in_comment = '//'
        elif c == '/' and i+1 < n and src[i+1] == '*':
            in_comment = '/*'
            i += 1
        elif c in ('"', "'", '`'):
            in_str = c
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
    i += 1
    if 1950 <= line <= 2350 and prev != (line, depth) and line in (1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350):
        print('brace depth line', line, '=', depth)
        prev = (line, depth)
