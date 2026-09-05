# _matchSim 参数拟合（Python 复刻 sim.js 的 _lgSeason/_matchSim 数学）
# 目标锚点（EPL 现实）：冠军 ~89-91 分(28.5W/5D/4.5L)，第4 ~78，第10 ~50，
# 第17 ~39，第20 ~23-25 分；H/D/A 45/26/29；场均进球 ~2.85。
import math
import random
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
BASE = r'D:\football\career-sim'


def parse_rep(path):
    src = open(path, encoding='utf-8').read()
    objs = re.split(r"\{'id'", src)[1:]
    out = []
    for o in objs:
        mid = re.match(r"'?:\"([^\"]+)\"", o)
        mrep = re.search(r"rep'?\"?:(0x[0-9a-fA-f]+|\d+)", o)
        if mid and mrep:
            rv = mrep.group(1)
            rep = int(rv, 16) if rv.startswith('0x') else int(rv)
            out.append((mid.group(1), rep))
    return out


def team_abs(str_lg, rep, dev):
    return str_lg + (rep - 2) * 3 + dev


def poisson(lam, rng):
    if lam <= 0:
        return 0
    L = math.exp(-lam)
    k, p = 0, 1.0
    while True:
        k += 1
        p *= rng.random()
        if p <= L:
            break
    return k - 1


def match_sim(a, b, gl, base, scale, k, c0, rng):
    sd = (a - b) / scale
    tot = 2 * base * gl
    share = min(0.92, max(0.15, c0 + k * sd))
    hg = poisson(tot * share, rng)
    ag = poisson(tot * (1 - share), rng)
    return hg, ag


def season(table_teams, str_lg, gl, params, rng, dev_dist):
    base, scale, k, c0 = params
    n = len(table_teams)
    ids = [t[0] for t in table_teams]
    strOf = {t[0]: team_abs(str_lg, t[1], dev_dist(rng)) for t in table_teams}
    arr = ids[:]
    if len(arr) % 2 == 1:
        arr.append(None)
    m2 = len(arr)
    rounds = []
    for r in range(m2 - 1):
        rd = []
        for j in range(m2 // 2):
            h, aw = arr[j], arr[m2 - 1 - j]
            if h is not None and aw is not None:
                rd.append((h, aw) if r % 2 == 0 else (aw, h))
        rounds.append(rd)
        arr.insert(1, arr.pop())
    half = len(rounds)
    tbl = {i: {'w': 0, 'd': 0, 'l': 0, 'gf': 0, 'ga': 0, 'pts': 0} for i in ids}
    hda = {'h': 0, 'd': 0, 'a': 0, 'n': 0, 'g': 0}
    for r in range(half):
        for h, a in rounds[r]:
            hg, ag = match_sim(strOf[h], strOf[a], gl, base, scale, k, c0, rng)
            ag2, hg2 = match_sim(strOf[a], strOf[h], gl, base, scale, k, c0, rng)
            for x, y, H, A in ((hg, ag, h, a), (ag2, hg2, a, h)):
                Th, Ta = tbl[H], tbl[A]
                Th['gf'] += x; Th['ga'] += y; Ta['gf'] += y; Ta['ga'] += x
                if x > y: Th['w'] += 1; Th['pts'] += 3; Ta['l'] += 1; hda['h'] += 1
                elif x < y: Ta['w'] += 1; Ta['pts'] += 3; Th['l'] += 1; hda['a'] += 1
                else: Th['d'] += 1; Ta['d'] += 1; Th['pts'] += 1; Ta['pts'] += 1; hda['d'] += 1
                hda['n'] += 1; hda['g'] += x + y
    rows = sorted(tbl.items(), key=lambda kv: (-kv[1]['pts'], -(kv[1]['gf'] - kv[1]['ga']), -kv[1]['gf']))
    return [dict(row, i=i) for i, row in rows], hda


REAL = {
    1: (28.5, 5.0, 4.5, 90), 4: (22.5, 7.0, 8.5, 78), 8: (16.0, 9.5, 12.5, 57),
    10: (14.0, 10.0, 14.0, 52), 14: (11.5, 9.5, 17.0, 44), 17: (10.0, 9.0, 19.0, 39),
    20: (6.0, 7.5, 24.5, 25.5),
}


def evaluate(params, reps, str_lg, gl, dev_dist, seasons=300, seed=7):
    rng = random.Random(seed)
    by_pos = {}
    hda = {'h': 0, 'd': 0, 'a': 0, 'n': 0, 'g': 0}
    for _ in range(seasons):
        rows, h = season(reps, str_lg, gl, params, rng, dev_dist)
        for pos, row in enumerate(rows, 1):
            by_pos.setdefault(pos, []).append(row)
        for kk in hda:
            hda[kk] += h[kk]
    out = {}
    for pos in REAL:
        v = by_pos[pos]
        out[pos] = tuple(sum(x[q] for x in v) / len(v) for q in ('w', 'd', 'l', 'pts'))
    err = 0.0
    for pos, real in REAL.items():
        for q in range(4):
            w = 1.0 if q == 3 else 0.6
            err += w * (out[pos][q] - real[q]) ** 2
    return out, hda, err


if __name__ == '__main__':
    reps = parse_rep(BASE + r'\src\data\teams_epl.ev.js')
    print('epl teams parsed: %d, reps=%s' % (len(reps), sorted(r[1] for r in reps)))
    str_lg, gl = 84, 1.05
    cur = (1.35, 50, 0.85, 0.5)  # 近似旧模型（share=c0+k*sd 等价形式不同，仅对比）

    def uni(rng):
        return rng.uniform(-8, 8)

    # 当前引擎实测基线（模型等价换算）：base=1.35, sd/50, ×0.85 — 直接用旧公式评估
    def old_sim(a, b, gl, rng):
        sd = (a - b) / 50
        lH = 1.35 * (1 + sd * 0.85) * gl
        lA = 1.35 * (1 - sd * 0.85) * gl
        return poisson(lH, rng), poisson(lA, rng)

    rng = random.Random(7)
    by_pos = {}
    hda = {'h': 0, 'd': 0, 'a': 0, 'n': 0, 'g': 0}

    def season_old(reps, dev_dist, seasons):
        nonlocal_hda = hda
        for _ in range(seasons):
            strOf = {t[0]: team_abs(str_lg, t[1], dev_dist(rng)) for t in reps}
            ids = [t[0] for t in reps]
            arr = ids[:]
            m2 = len(arr)
            rounds = []
            for r in range(m2 - 1):
                rd = [(arr[j], arr[m2 - 1 - j]) if r % 2 == 0 else (arr[m2 - 1 - j], arr[j])
                      for j in range(m2 // 2)]
                rounds.append(rd)
                arr.insert(1, arr.pop())
            tbl = {i: {'w': 0, 'd': 0, 'l': 0, 'gf': 0, 'ga': 0, 'pts': 0} for i in ids}
            half = len(rounds)
            for r in range(half):
                for h, a in rounds[r]:
                    hg, ag = old_sim(strOf[h], strOf[a], gl, rng)
                    ag2, hg2 = old_sim(strOf[a], strOf[h], gl, rng)
                    for x, y, H, A in ((hg, ag, h, a), (ag2, hg2, a, h)):
                        Th, Ta = tbl[H], tbl[A]
                        Th['gf'] += x; Th['ga'] += y; Ta['gf'] += y; Ta['ga'] += x
                        if x > y: Th['w'] += 1; Th['pts'] += 3; Ta['l'] += 1; nonlocal_hda['h'] += 1
                        elif x < y: Ta['w'] += 1; Ta['pts'] += 3; Th['l'] += 1; nonlocal_hda['a'] += 1
                        else: Th['d'] += 1; Ta['d'] += 1; Th['pts'] += 1; Ta['pts'] += 1; nonlocal_hda['d'] += 1
                        nonlocal_hda['n'] += 1; nonlocal_hda['g'] += x + y
            rows = sorted(tbl.items(), key=lambda kv: (-kv[1]['pts'], -(kv[1]['gf'] - kv[1]['ga']), -kv[1]['gf']))
            for pos, (i, row) in enumerate(rows, 1):
                by_pos.setdefault(pos, []).append(row)

    season_old(reps, uni, 300)
    print('\n=== 旧模型（Python 复刻, dev~U[-8,8]） ===')
    print('pos |  W    D    L   Pts   | 现实锚点')
    for pos in sorted(REAL):
        v = by_pos[pos]
        w = sum(x['w'] for x in v) / len(v); d = sum(x['d'] for x in v) / len(v)
        l = sum(x['l'] for x in v) / len(v); p = sum(x['pts'] for x in v) / len(v)
        r = REAL[pos]
        print('%3d | %4.1f %4.1f %4.1f %5.1f | %4.1f %4.1f %4.1f %5.1f' % (pos, w, d, l, p, *r))
    print('H/D/A: %.1f/%.1f/%.1f  goals %.2f' % (hda['h'] / hda['n'] * 100, hda['d'] / hda['n'] * 100,
          hda['a'] / hda['n'] * 100, hda['g'] / hda['n']))
