# -*- coding: utf-8 -*-
"""进攻球员数据重平衡回归。

历史问题：OVR 曲线太平（70 与 90 产量差太小），顶级中锋偏低、类型系数错位。
修复：88+ 世界级加成 + 类型系数调整（射手↑、B2B/铁腰↓）。
本测试把球员固定在顶级俱乐部，逐配置采样，断言与现实的量级一致。
"""
import json
import harness

JS = """
(function(){
function one(ovr,pos,type,seed){
  var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:pos,nation:'cn',talent:1.3,number:9,foot:'r'},seed);
  au.ovr=ovr;au.maxOvr=96;au.age=27;au.phase='career';au.teamId='rma';au.role='star';
  au.contractLeft=5;au.seasonsAtClub=3;au.playerType=type;au.roleAdjust=0;au.guanxi=50;
  au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
  window.SIM.simulateOneSeason();
  var r=au.seasons[au.seasons.length-1];
  return {g:r.goals,a:r.assists,lgG:r.lgGoals||0,lgA:r.lgAssists||0,apps:r.apps};
}
function avg(ovr,pos,type){
  var sG=0,sA=0,sLG=0,sLA=0,n=0;
  for(var s=0;s<8;s++){var r=one(ovr,pos,type,7000+s*13+ovr+type);sG+=r.g;sA+=r.a;sLG+=r.lgG;sLA+=r.lgA;n++;}
  return {g:sG/n,a:sA/n,lgG:sLG/n,lgA:sLA/n};
}
var out={
  st90:avg(90,'ST',0),
  st95:avg(95,'ST',0),
  st80:avg(80,'ST',0),
  lw90:avg(90,'LW',3),
  cam90:avg(90,'CAM',1),
  cm90:avg(90,'CM',6),
  cdm90:avg(90,'CDM',7),
  cb90:avg(90,'CB',10)
};
return JSON.stringify(out);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    for k, v in r.items():
        print('  %-6s G=%.1f A=%.1f  lgG=%.1f lgA=%.1f' % (k, v['g'], v['a'], v['lgG'], v['lgA']))
    st90, st95, st80 = r['st90'], r['st95'], r['st80']
    if not (30 <= st90['g'] <= 50):
        raise harness.Fail('elite ST 90 goals out of range: %.1f' % st90['g'])
    if not (32 <= st95['g'] <= 55):
        raise harness.Fail('elite ST 95 goals out of range: %.1f' % st95['g'])
    if st95['g'] <= st80['g']:
        raise harness.Fail('OVR curve not steep: 95=%.1f 80=%.1f' % (st95['g'], st80['g']))
    if not (0 <= r['cb90']['g'] <= 8):
        raise harness.Fail('CB 90 goals out of range: %.1f' % r['cb90']['g'])
    if r['cam90']['a'] < 14:
        raise harness.Fail('CAM 90 assists too low: %.1f' % r['cam90']['a'])
    if r['cm90']['g'] > 22:
        raise harness.Fail('B2B 90 goals too high: %.1f' % r['cm90']['g'])
    for k, v in r.items():
        if v['lgG'] > v['g'] + 0.5:
            raise harness.Fail('%s league goals > all-comp goals' % k)
    print('PASS stats_balance (ST90=%.1f ST95=%.1f CB90=%.1f CAM90.A=%.1f)'
          % (st90['g'], st95['g'], r['cb90']['g'], r['cam90']['a']))


if __name__ == '__main__':
    harness.main(run)
