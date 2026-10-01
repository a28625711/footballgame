# -*- coding: utf-8 -*-
"""一次性：把 src/sim.js 按职责拆成 src/sim/NN-name.js + MANIFEST.json。

原则：只在"IIFE 函数体的顶层语句边界"切分，切点取上一语句的结束偏移，
因此每一片段都是原始文本的连续子串；tools/build_sim.py 按序拼回即为逐字节一致。
顺序与原文完全相同（只重新分组，不重排）。

用法：python tools/split_sim.py
"""
import io
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
import esprima  # noqa: E402

BASE = r'D:\football\career-sim'
SRC = os.path.join(BASE, 'src', 'sim.js')
OUTDIR = os.path.join(BASE, 'src', 'sim')

# (起始语句下标, 文件名, 中文职责说明)
SECTIONS = [
    (0,   '00-config.js',        '常量与配置 · §1'),
    (2,   '10-staff.js',         '团队员工（分级/市场/费用）'),
    (14,  '11-trial.js',         '报名试训（青训营选择）'),
    (22,  '20-util.js',          '工具函数 · §2（家乡队/老将回归/杂项）'),
    (27,  '21-rng.js',           '随机数与基础查询（ad..ay）'),
    (48,  '30-state.js',         '遗产与状态 · §3（快照 aA / 随机事件 aE / 伴侣 / 提交 aF）'),
    (60,  '40-growth-type.js',   '成长曲线 · §4 + 球员类型系统 · §5 + 天赋天花板'),
    (71,  '50-role.js',          '角色与能力 · §6（角色/工资系数/能力值）'),
    (79,  '60-match.js',         '赛事与德比 · §7（单场模拟/杯赛/点球）'),
    (101, '61-national.js',      '国家队引擎（世界杯预选/亚洲杯/洲际）'),
    (132, '70-bigmatch.js',      '大场面引擎（德比/决赛：叙述/事件/结算）'),
    (163, '80-league-cfg.js',    '联赛/杯赛/洲际配置 + 球队实力起落'),
    (177, '81-news-clubstr.js',  '新闻模块 + 球队绝对强度/卡片'),
    (191, '82-league-run.js',    '单季联赛/真实榜/大场面抽取'),
    (197, '83-youth-nt.js',      '国字号梯队 U 系列 + 青年赛文案'),
    (208, '84-world.js',         '世界引擎总入口（洲际赛/杯赛/升降级/里程碑）'),
    (231, '90-events.js',        '大赛系统 · §8 = 事件系统（链/强制队列）'),
    (248, '91-season-outer.js',  '赛季主流程（b2/b3/b4/b5）+ 奖项门槛 + 颁奖'),
    (255, '92-contract.js',      '合同期与报告 · §10（年龄/能力/工资）'),
    (276, '93-youth-settle.js',  '青训 · §12 + 赛季结算主循环（bk/bl/bm）'),
    (281, '94-transfer.js',      '转会与续约（报价条款/续约窗/bo..bw）'),
    (292, '95-archive.js',       '赛程归档打包/解包'),
    (308, '99-api.js',           '公共 API · §14（window.SIM + 边界镜像）'),
]


def kids(node):
    out = []
    for k, v in list(getattr(node, '__dict__', {}).items()):
        if k in ('range', 'loc', 'type'):
            continue
        if isinstance(v, list):
            out += [x for x in v if hasattr(x, 'type')]
        elif hasattr(v, 'type'):
            out.append(v)
    return out


def find_fns(node):
    res = []
    t = str(getattr(node, 'type', None) or '')
    if t.startswith('Function') and getattr(node, 'body', None) is not None:
        res.append(node)
    for c in kids(node):
        res += find_fns(c)
    return res


def main():
    raw = io.open(SRC, encoding='utf-8', newline='').read()
    ast = esprima.parseScript(raw, {'range': True})
    iife = [f for f in find_fns(ast.body[0]) if f.type == 'FunctionExpression']
    iife.sort(key=lambda f: -(len(getattr(f.body, 'body', []) or [])))
    sts = iife[0].body.body
    n = len(sts)
    print('IIFE top-level statements:', n)

    starts = [s[0] for s in SECTIONS]
    assert starts[0] == 0 and all(a < b for a, b in zip(starts, starts[1:])) and starts[-1] < n, 'bad SECTIONS'

    # 切点：新片段从 sts[start] 开始 → 切在 sts[start-1].end（start=0 时为 0）
    cuts = [0 if s == 0 else sts[s - 1].range[1] for s in starts]
    cuts.append(len(raw))

    if os.path.isdir(OUTDIR):
        for f in os.listdir(OUTDIR):
            if f.endswith('.js') or f == 'MANIFEST.json':
                os.remove(os.path.join(OUTDIR, f))
    os.makedirs(OUTDIR, exist_ok=True)

    order = []
    for i, (s, name, title) in enumerate(SECTIONS):
        payload = raw[cuts[i]:cuts[i + 1]]
        marker = '// ---- part:%02d | %s ----\r\n' % (i, title)
        io.open(os.path.join(OUTDIR, name), 'w', encoding='utf-8', newline='').write(marker + payload)
        order.append({'f': name, 'title': title, 'bytes': len(payload),
                      'stmts': (SECTIONS[i + 1][0] if i + 1 < len(SECTIONS) else n) - s})

    io.open(os.path.join(OUTDIR, 'MANIFEST.json'), 'w', encoding='utf-8', newline='\n').write(
        json.dumps({'order': order}, ensure_ascii=False, indent=1) + '\n')

    built = ''.join(
        io.open(os.path.join(OUTDIR, o['f']), encoding='utf-8', newline='').read().split('\n', 1)[1]
        for o in order)
    assert built == raw, 'round-trip mismatch (%d vs %d)' % (len(built), len(raw))
    print('split ok: %d parts, %d bytes, byte-identical' % (len(order), len(raw)))
    for o in order:
        print('  %-22s %6d B  %3d stmts  %s' % (o['f'], o['bytes'], o['stmts'], o['title']))


if __name__ == '__main__':
    main()
