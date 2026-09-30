# -*- coding: utf-8 -*-
# 回归：加盟/租借（b8）必须立刻按新东家重算 a2.role。
# 旧 bug：b8 只改 teamId、不重算 role → 结算块里 num_demote（十号不是给你的）
# 的入队与 when 都读 ROLES[role].rank，用的是上一家俱乐部的旧身份，
# 于是"在老东家是替补、到新东家是主力"的人也会被收走十号。
import json

import harness

JS = r"""
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:10,foot:'r'};
function mk(s,ovr,club,role){
  var st=window.__SIMTEST.start('normal',P,s);
  st.ovr=ovr;st.maxOvr=96;st.money=800;st.age=24;st.phase='career';st.teamId=club;
  st.role=role;st.contractLeft=5;st.seasonsAtClub=2;st.roleAdjust=0;st.guanxi=50;
  st.youthTeamId=null;st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;st.bigQ=[];
  st.number=10;
  return st;
}
var out={};
/* 1) 老东家是替补(rank1)、新东家应该是绝对核心(rep3, ovr86) */
var st=mk(61,86,'mci','sub');
window.SIM.doTransfer('cn-cd');
out.roleAfterUp=st.role;
out.rankAfterUp=window.DATA.ROLES[st.role].rank;
out.team=st.teamId;
out.roleAdjust=st.roleAdjust;
/* 2) 反向：ovr 低 → 去豪门应被判为低位（不能因为旧身份是主力就留在主力） */
var st2=mk(62,60,'cn-cd','starter');
window.SIM.doTransfer('mci');
out.roleAfterDown=st2.role;
out.rankAfterDown=window.DATA.ROLES[st2.role].rank;
/* 3) 期望值（用引擎自己的 aI 口径核对） */
out.expectUp=st.ovr-(48+7*3);      /* rep3 → bz=ovr-69 */
out.expectDown=st2.ovr-(48+7*5);   /* rep5 → bz=ovr-83 */
return JSON.stringify(out);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    # 86 - 69 = 17 → star(rank4)
    harness.check(r['team'] == 'cn-cd', 'transfer did not apply: %s' % r)
    harness.check(r['rankAfterUp'] == 4, 'role not recomputed upward after join: %s' % r)
    # 60 - 83 = -23 → bench(rank0)
    harness.check(r['rankAfterDown'] == 0, 'role not recomputed downward after join: %s' % r)
    # 关键断言：加盟后 rank>=3（主力以上）时，num_demote 的 rank<=2 门控必须为假
    harness.check(r['rankAfterUp'] > 2, 'num_demote gate would still pass (rank<=2): %s' % r)
    print('PASS transfer_role (join 替补→核心: %s(rank%s); join 主力→饮水机: %s(rank%s))'
          % (r['roleAfterUp'], r['rankAfterUp'], r['roleAfterDown'], r['rankAfterDown']))


if __name__ == '__main__':
    harness.main(run)
