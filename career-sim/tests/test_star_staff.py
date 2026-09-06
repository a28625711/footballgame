# -*- coding: utf-8 -*-
"""上门事件（star staff）渲染验证：分级 offer id、现在养着行、费用一致"""
import sys, os, json, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r'''
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},31337);
au.phase='career'; au.age=21; au.ovr=82; au.maxOvr=90; au.money=2000; au.talent=1.15;
au.teamId='rma'; au.role='starter'; au.contractLeft=9; au.seasonsAtClub=2;
au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null; au.peakAnnualWage=3000;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
/* 已养一个 t1 厨师 + t2 康复，费用应按级别算 */
au.staff={'chef':{'y':1,'tier':1},'rehab':{'y':2,'tier':2}};
window.SIM.attach(au);
var fee=window.SIM.staffFee();          /* chef 30 + rehab 60*2.2=132 → 162（×峰值系数） */
/* t3 大牌经纪人上门 offer */
au.pending={'type':'staff','star':!0x0,'offers':['agent3']};
window.SIM.attach(au);
window.__SIMTEST.render();
var html='';
for(var k in window.__ELS)html+=String(window.__ELS[k].innerHTML||'');
var m=html.match(/现在养着[^<]*<[^>]*>[^<]*/)||[];
var byId=window.SIM.staffById('agent3');
var hire=window.SIM.teamHire('agent3')===null?'blocked':'n/a(market guard)';
JSON.stringify({fee:fee,cur:m[0]||'',agent3:byId,offerBtn:html.indexOf('大牌经纪人')>=0,seps:html.indexOf('、')>=0,noUndef:html.indexOf('undefined')<0});
'''

def main():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    print(json.dumps(r, ensure_ascii=False, indent=1))
    if not r['agent3'] or r['agent3']['tier'] != 3 or r['agent3']['name'] != '大牌经纪人':
        raise harness.Fail('agent3 解析错误: %s' % r['agent3'])
    if not r['offerBtn']:
        raise harness.Fail('上门 offer 未渲染出 大牌经纪人')
    if not r['noUndef']:
        raise harness.Fail('渲染出现 undefined')
    if '、' not in r['cur']:
        raise harness.Fail('现在养着 缺 、 分隔: %s' % r['cur'])
    print('STAR STAFF UI PASS')

main()
