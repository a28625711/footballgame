# Engine-layer checks for 名气/关系/清白/队内地位 making a real difference:
#  - snapshot exposes roleAdjust
#  - 关系 shifts role both domestic and abroad (aI)
#  - 队内地位 scales big-match involvement (_bmPlayerProb)
#  - 清白 settles scandal (low) / endorsement income (high) (_cleanSettle)
import json

import harness

PLAYER = harness.NEW_PLAYER

JS = r"""
(function(){
var out={};
var st=window.__SIMTEST.start('normal',%PLAYER%,4242);
st.ovr=80; st.age=24; st.roleAdjust=0; st.pos='ST'; st.phase='career';
out.snapHasRoleAdjust=(typeof window.SIM.snapshot().roleAdjust==='number');

var T=window.SIM.teams(),cn=null,abr=null;
for(var i=0;i<T.length;i++){ if(T[i].id==='mci')abr=T[i]; if(!cn&&/^cn-/.test(T[i].id))cn=T[i]; }
var R={star:4,starter:3,rot:2,sub:1,bench:0};

/* 关系：国内 0.12 / 留洋 0.06；把 ovr 校准到 tier 边界下方，验证两边都能被关系推高 */
function roleAt(team,gx){ st.ovr=49+7*team.rep; st.roleAdjust=0; st.guanxi=gx; return window.SIM.roleOf(team.id); }
out.cnLow=roleAt(cn,0); out.cnHigh=roleAt(cn,100);
out.abrLow=roleAt(abr,0); out.abrHigh=roleAt(abr,100);

/* 队内地位：大场面参与概率随 roleAdjust（±8%/档） */
st.pos='ST'; st.ovr=70; st.roleAdjust=-4; var pLo=window.SIM.bmPlayerProb(70,70)[0];
st.roleAdjust=4; var pHi=window.SIM.bmPlayerProb(70,70)[0];
out.probLo=pLo; out.probHi=pHi;

/* 清白：高清白+名气 → 代言收入 */
st.clean=90; st.fame=40; st.money=1000; st.flags={};
window.SIM.cleanSettle(1);
out.bonusMoney=st.money; out.cleanBonus=!!st.flags._cleanBonus;

/* 清白：低清白 → 丑闻（停赛/罚款/掉名望） */
st.clean=0; st.fame=10; st.money=1000; st.banGames=0; st.flags={};
for(var k=0;k<400&&!st.flags._scandal;k++) window.SIM.cleanSettle(1);
out.scandal=!!st.flags._scandal; out.banGames=st.banGames; out.scandalFame=st.fame;

return JSON.stringify(out);
})()
""".replace('%PLAYER%', PLAYER)

RANK = {'star': 4, 'starter': 3, 'rot': 2, 'sub': 1, 'bench': 0}


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r['snapHasRoleAdjust'], 'snapshot 未暴露 roleAdjust: %s' % r)
    harness.check(RANK[r['cnHigh']] > RANK[r['cnLow']],
                  '关系未影响国内角色: %s -> %s' % (r['cnLow'], r['cnHigh']))
    harness.check(RANK[r['abrHigh']] > RANK[r['abrLow']],
                  '关系未影响留洋角色: %s -> %s' % (r['abrLow'], r['abrHigh']))
    harness.check(r['probHi'] > r['probLo'] * 1.2,
                  '队内地位未放大场面参与: %.3f vs %.3f' % (r['probLo'], r['probHi']))
    harness.check(r['cleanBonus'] and r['bonusMoney'] > 1000,
                  '高清白未带来代言收入: %s' % r)
    harness.check(r['scandal'] and r['banGames'] >= 2 and r['scandalFame'] < 10,
                  '低清白未触发丑闻停赛: %s' % r)
    print('PASS attr_engine (cn %s->%s, abr %s->%s, bm %.3f->%.3f, 代言+%d, 停赛%d)'
          % (r['cnLow'], r['cnHigh'], r['abrLow'], r['abrHigh'],
             r['probLo'], r['probHi'], r['bonusMoney'] - 1000, r['banGames']))


if __name__ == '__main__':
    harness.main(run)
