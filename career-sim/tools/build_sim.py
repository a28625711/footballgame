# -*- coding: utf-8 -*-
"""构建 src/sim.js（仿 tools/build_data.py）。

从 src/sim/*.js 读取片段 + MANIFEST.json 顺序拼接，去掉每段首行标记，写回 src/sim.js。
因为 split_sim.py 保证片段是原文的连续子串，拼回即逐字节一致。

用法：python tools/build_sim.py
"""
import io
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
import esprima  # noqa: E402

BASE = r'D:\football\career-sim'
SRC_DIR = os.path.join(BASE, 'src', 'sim')
OUT = os.path.join(BASE, 'src', 'sim.js')


def main():
    manifest = json.load(io.open(os.path.join(SRC_DIR, 'MANIFEST.json'), encoding='utf-8'))
    parts = []
    for o in manifest['order']:
        txt = io.open(os.path.join(SRC_DIR, o['f']), encoding='utf-8', newline='').read()
        first, sep, rest = txt.partition('\n')
        assert first.startswith('// ---- part:'), '%s missing marker' % o['f']
        parts.append(rest if sep else '')
    built = ''.join(parts)
    esprima.parseScript(built)                      # 语法校验
    io.open(OUT, 'w', encoding='utf-8', newline='').write(built)
    print('built -> %s (%d parts, %d chars)' % (OUT, len(parts), len(built)))


if __name__ == '__main__':
    main()
