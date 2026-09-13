# -*- coding: utf-8 -*-
"""球员球队强度加成回归（饱和边际效益模型）：
- _clubBoost 随 base 单调递减、无平段（每个 base 落在曲线不同位置）
- share 随地位单调（核心>主力>轮换>替补>边缘）
- ref = base + min(dev,5)：正 dev 最多抬 5 点，负 dev 全额；同 OVR dev 越高边际加成越小
- 精英保底：OVR≥95 在任何队至少 +0.5；OVR 高于名义 base 时不因 dev 变负
- 非主角队恒为 base+dev
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
function setup(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.2,'number':9,'foot':'r'},seed);
  au.phase='career'; au.age=25; au.ovr=90; au.maxOvr=95; au.role='starter';
  au.teamId='cn-wh'; au.contractLeft=3; au.seasonsAtClub=2; au.roleAdjust=0;
  au.guanxi=50; au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null; au.teamDev={};
  return au;
}
function spread(seed){
  setup(seed);
  var arr=[];
  for(var b=44;b<=98;b+=3)arr.push(Math.round(window.SIM.clubBoost(b,99,3)*1000)/1000);
  return JSON.stringify(arr);
}
function shares(seed){
  setup(seed);
  return JSON.stringify([0,1,2,3,4].map(function(r){return Math.round(window.SIM.clubBoost(70,90,r)*1000)/1000;}));
}
function devAware(seed){
  var au=setup(seed); au.ovr=70;
  var tid='cn-wh';
  function measure(dev){
    au.teamDev[tid]=dev;
    au.teamId='__none__'; var base=window.SIM.teamAbs(tid);
    au.teamId=tid; var withP=window.SIM.teamAbs(tid);
    return {dev:dev,base:base,withP:withP,bonus:Math.round((withP-base)*10)/10};
  }
  var hi=measure(8),mid=measure(0),lo=measure(-8);
  au.teamId='__none__';
  return JSON.stringify({hi:hi,mid:mid,lo:lo});
}
function noDrag(seed){
  var au=setup(seed); var tid='cn-wh';
  au.teamDev[tid]=0; au.teamId='__none__'; var base=window.SIM.teamAbs(tid);
  au.ovr=base+2; au.teamDev[tid]=8;
  au.teamId='__none__'; var noP=window.SIM.teamAbs(tid);
  au.teamId=tid; var withP=window.SIM.teamAbs(tid);
  return JSON.stringify({base:base,ovr:au.ovr,bonus:Math.round((withP-noP)*10)/10});
}
function eliteFloor(seed){
  var au=setup(seed);
  au.teamId='mci'; au.teamDev={mci:8};
  au.ovr=95; var w95=window.SIM.teamAbs('mci');
  au.ovr=90; var w90=window.SIM.teamAbs('mci');
  au.teamId='__none__'; var noP=window.SIM.teamAbs('mci');
  return JSON.stringify({noP:noP,b95:Math.round((w95-noP)*10)/10,b90:Math.round((w90-noP)*10)/10});
}
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)

    sp = json.loads(mr.eval('spread(301)'))
    for a, b in zip(sp, sp[1:]):
        assert b < a, ('clubBoost not strictly decreasing in base', sp)
    assert sp[-1] > 0, sp  # epl 顶级 base 98 仍为正

    sh = json.loads(mr.eval('shares(302)'))
    assert sh[4] > sh[3] > sh[2] > sh[1] > sh[0], sh

    da = json.loads(mr.eval('devAware(303)'))
    assert da['lo']['bonus'] > da['mid']['bonus'] > da['hi']['bonus'], da
    assert da['hi']['base'] - da['mid']['base'] == 8, da
    assert da['mid']['base'] - da['lo']['base'] == 8, da

    nd = json.loads(mr.eval('noDrag(304)'))
    assert nd['bonus'] >= 0, nd

    ef = json.loads(mr.eval('eliteFloor(305)'))
    assert ef['b95'] >= 0.5, ef          # 95+ 保底
    assert ef['b90'] < 0.5, ef           # 90 不享受保底

    print('PASS player_str (base 单调无平段 / share 单调 / dev 递减 / 不拖后腿 / 精英保底)')
    print('PASS')


if __name__ == '__main__':
    harness.main(main)
