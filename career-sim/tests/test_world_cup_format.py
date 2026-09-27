# -*- coding: utf-8 -*-
"""世界杯新赛制（2026，48 队）回归：
1. 正赛 48 队 = 12 组 × 4；
2. 小组前二 + 8 个最佳第三名 → 32 强淘汰：三十二强→十六强→八强→四强→决赛（5 轮）；
3. 决赛有胜者（冠军），且轮次命名为中文标准名。
"""
import json

import harness

JS = r"""
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'};
var out={};
for(var s=0;s<4;s++){
  var a=window.__SIMTEST.start('normal',P,7000+s);
  a.age=20;a.ovr=76;a.phase='career';a.teamId='mci';a.role='starter';
  window.SIM.doPeriod();
  var wc=a.natFx&&a.natFx.data?a.natFx.data.wc:null;
  out[s]=wc?{
    groups:(wc.groups||[]).length,
    g0:(wc.groups&&wc.groups[0]?wc.groups[0].standings.length:0),
    rounds:(wc.rounds||[]).map(function(r){return r.name+':'+r.matches.length;}),
    champ:wc.champion
  }:null;
}
return JSON.stringify(out);
})()
"""

WANT_ROUNDS = ['三十二强:16', '十六强:8', '八强:4', '四强:2', '决赛:1']


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    bad = []
    for s, d in r.items():
        if not d:
            bad.append('%s: no wc data' % s); continue
        if d['groups'] != 12:
            bad.append('%s: groups=%d != 12' % (s, d['groups']))
        if d['g0'] != 4:
            bad.append('%s: group0 teams=%d != 4' % (s, d['g0']))
        if d['rounds'] != WANT_ROUNDS:
            bad.append('%s: rounds=%s' % (s, d['rounds']))
        if not d['champ']:
            bad.append('%s: no champion' % s)
    if bad:
        raise harness.Fail('; '.join(bad))
    print('PASS world_cup_format (48 teams, 12 groups x4, 32强→决赛 5 rounds)')


if __name__ == '__main__':
    harness.main(run)
