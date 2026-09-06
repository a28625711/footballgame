# -*- coding: utf-8 -*-
"""摘除本轮插入的块，定位语法破坏点"""
import subprocess, tempfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')

lines = open(r'D:\football\career-sim\src\sim.js', encoding='utf-8').read().split('\n')

def check(txt):
    fd, path = tempfile.mkstemp(suffix='.js')
    os.write(fd, txt.encode('utf-8')); os.close(fd)
    r = subprocess.run(['node', '--check', path], capture_output=True, text=True)
    os.unlink(path)
    return 'OK' if 'SyntaxError' not in (r.stderr or '') else (r.stderr or '').strip().split('\n')[0][:80]

full = '\n'.join(lines)
print('full:', check(full))

def find_line(pred, start=0):
    for k in range(start, len(lines)):
        if pred(lines[k]):
            return k
    return -1

# 1) 摘除 _trTerms（注释行到 `}function bo` 前）
i_comment = find_line(lambda l: l.startswith('/* 转会报价条款'))
i_bo = find_line(lambda l: l.startswith('}function bo'), i_comment)
print('_trTerms at', i_comment+1, '-', i_bo+1)
t1 = '\n'.join(lines[:i_comment] + lines[i_bo:])
print('without _trTerms:', check(t1))

# 2) 摘除 transferReroll 块
i_tr = find_line(lambda l: l.startswith("'transferReroll'"))
i_st = find_line(lambda l: l.startswith("'staffTen'"), i_tr)
print('transferReroll at', i_tr+1, '-', i_st+1)
t2 = '\n'.join(lines[:i_tr] + lines[i_st:])
print('without transferReroll:', check(t2))

# 3) 恢复旧 bC 行
i_bc = find_line(lambda l: 'var bC=bf(0x4+' in l)
t3_lines = lines[:i_bc] + ["}var bC=bf(a6(\"analyst\")?0x6:0x4),"] + lines[i_bc+1:]
print('without new bC:', check('\n'.join(t3_lines)))

# 4) 摘除 rerolls 行
i_rr = find_line(lambda l: l.startswith("}),'rerolls'"))
t4_lines = lines[:i_rr] + ['},'] + lines[i_rr+1:]
print('without rerolls:', check('\n'.join(t4_lines)))
