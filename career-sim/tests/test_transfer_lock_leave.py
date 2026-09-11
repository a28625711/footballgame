# -*- coding: utf-8 -*-
"""转会窗「禁止转会(lockAbroad) + 必须转会(leave)」冲突回归：
- 旧行为：mustLeave 时 canStay 被强制 false，而 lockAbroad 让所有外援报价被过滤，
  报价为空 → pending 变成 retire_forced（game.js 显示"没人来问了/挂靴"）直接结束游戏
- 现行为：被迫离队时忽略海外禁令（合同条款作废），能拿到报价；
  若仍无人问津，则允许留下（canStay），绝不因该组合强制退役"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
function probe(teamId, lock, ovr, age, seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.2,'number':9,'foot':'r'},seed);
  au.phase='career'; au.age=age; au.ovr=ovr; au.maxOvr=ovr+4; au.talent=1.2; au.money=1000;
  au.teamId=teamId; au.role='star'; au.contractLeft=0; au.lockAbroad=lock; au.seasonsAtClub=3;
  au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null; au.flags={_forceLeave:true}; au.pending=null;
  window.SIM.nextStep();
  var p=au.pending;
  return JSON.stringify({type:p?p.type:null,offers:p&&p.offers?p.offers.length:-1,canStay:p?!!p.canStay:null,mustLeave:p?!!p.mustLeave:null});
}
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)
    cases = [('cn-sh', 5, 84, 26, 11), ('cn-sh', 0, 84, 26, 13), ('rma', 5, 84, 26, 12), ('cn-sh', 5, 36, 34, 17)]
    out = []
    for tid, lock, ovr, age, seed in cases:
        r = json.loads(mr.eval('probe("%s",%d,%d,%d,%d)' % (tid, lock, ovr, age, seed)))
        out.append((tid, lock, r))
        print('%s lock=%d ovr=%d -> %s' % (tid, lock, ovr, r))
        assert r['type'] == 'transfer', 'must-leave produced %s (game over) for %s' % (r['type'], tid)
        assert r['offers'] > 0 or r['canStay'], 'no offers and cannot stay for %s' % tid
    # 关键：禁止转会 + 必须转会 时仍应有外援报价（lock 被强制离队覆盖）
    assert out[0][2]['offers'] > 0, 'lock+leave should still yield offers'
    print('PASS transfer_lock_leave (禁止转会+必须转会不再导致强制退役)')
    print('PASS')


if __name__ == '__main__':
    main()
