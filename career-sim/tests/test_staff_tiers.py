# -*- coding: utf-8 -*-
"""员工分级端到端：
- 上门(t3)/面板签约(t2) 入库带 tier
- tier 跨多个赛季 tick 保留（过一年不刷回普通）
- 团队年费按级别计（a8 走 owned tier）
- 经纪人佣金与峰值年薪脱钩（一口价）"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r'''
window.__R={};
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},2024);
au.phase='career'; au.age=22; au.ovr=84; au.maxOvr=90; au.money=50000;
au.teamId='rma'; au.role='starter'; au.contractLeft=9; au.seasonsAtClub=2;
au.roleAdjust=0; au.guanxi=50; au.fame=60; au.clean=80;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
window.SIM.attach(au);
function drain(){var g=0;while(au.pending&&g++<60){var p=au.pending;
if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(1);}}
else if(p.type==='report'){window.SIM.nextStep();}
else if(p.type==='transfer'){window.SIM.choose('stay');}
else if(p.type==='staff'){window.SIM.choose('skip');}
else window.SIM.nextStep();}}
/* 1) 上门签 t3 大牌经纪人 */
au.pending={type:'staff',star:true,offers:['agent3']};
window.SIM.choose('agent3');
window.__R.hire=au.staff.agent?{tier:au.staff.agent.tier,y:au.staff.agent.y}:null;
/* 2) 面板签 t2 高级康复师 */
au.staffMkt={season:au.seasons.length+1,ids:['rehab2']};
window.__R.hireRehab=window.SIM.teamHire('rehab2');
window.__R.rehab=au.staff.rehab?{tier:au.staff.rehab.tier}:null;
/* 3) 跨 3 个赛季 tick */
for(var s=0;s<3;s++){window.SIM.doPeriod();drain();}
window.__R.agentAfter=au.staff.agent||null;
window.__R.rehabAfter=au.staff.rehab||null;
/* 4) 年费按级别：agent t3 360（一口价）+ rehab t2 132×峰值系数（游戏自动记录 peakAnnualWage） */
var _coeff=Math.min(4,1+(au.peakAnnualWage||0)/700);
window.__R.peak=au.peakAnnualWage||0;
window.__R.fee=window.SIM.staffFee();
window.__R.expectFee=360+Math.round(132*_coeff);
/* 5) 峰值薪资抬高后 agent 佣金不变（仅非经纪人费用随峰值走） */
au.peakAnnualWage=7000;
var high=window.SIM.staffFee();
var agentHigh=window.SIM.staffPrice(window.SIM.staffById('agent3'));
au.peakAnnualWage=0;
window.__R.feeHighPeak=high;
window.__R.agentHigh=agentHigh;
window.__R.feeNoPeak=window.SIM.staffFee();
JSON.stringify(window.__R);
'''

def main():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    print(json.dumps(r, ensure_ascii=False, indent=1))
    if not r['hire'] or r['hire']['tier'] != 3:
        raise harness.Fail('上门 t3 入库错误: %s' % r['hire'])
    if r['hireRehab'] != '高级康复师':
        raise harness.Fail('t2 签约返回名错误: %s' % r['hireRehab'])
    if not r['agentAfter'] or r['agentAfter'].get('tier') != 3:
        raise harness.Fail('跨年后 agent tier 丢失: %s' % r['agentAfter'])
    if not r['rehabAfter'] or r['rehabAfter'].get('tier') != 2:
        raise harness.Fail('跨年后 rehab tier 丢失: %s' % r['rehabAfter'])
    if r['fee'] != r['expectFee']:
        raise harness.Fail('年费未按级别: %s != %s' % (r['fee'], r['expectFee']))
    if r['agentHigh'] != 360:
        raise harness.Fail('峰值抬高后 agent 佣金应仍为 360: %s' % r['agentHigh'])
    if r['feeHighPeak'] != 888:
        raise harness.Fail('峰值抬高后总费用应为 888: %s' % r['feeHighPeak'])
    if r['feeNoPeak'] != 360 + 132:
        raise harness.Fail('峰值归零后总费用应为 492: %s' % r['feeNoPeak'])
    print('STAFF TIER E2E PASS (peak=%s)' % r['peak'])

main()
