# -*- coding: utf-8 -*-
"""经纪人重roll电话：transferReroll 换名单、次数扣减、耗尽拒绝；渲染出按钮"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r'''
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},606);
au.phase='career'; au.age=24; au.ovr=80; au.maxOvr=88; au.money=3000;
au.teamId='rma'; au.role='starter'; au.contractLeft=1; au.seasonsAtClub=3;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
window.SIM.attach(au);
/* 伪造一个转会窗 pending：4 家报价 + 2 次 reroll（agent t3） */
au.pending={type:'transfer',fired:false,mustLeave:false,
  offers:['bar','juv','bay','mci'],rerolls:2};
window.SIM.attach(au);
var r1=window.SIM.transferReroll();
var offers1=(au.pending.offers||[]).slice();
var r2=window.SIM.transferReroll();
var offers2=(au.pending.offers||[]).slice();
var r3=window.SIM.transferReroll();
var same1=JSON.stringify(r1.offers)===JSON.stringify(['bar','juv','bay','mci']);
var same2=JSON.stringify(offers1)===JSON.stringify(offers2);
/* 渲染检查按钮 */
au.pending.rerolls=1;
window.__SIMTEST.render();
var html='';for(var k in window.__ELS)html+=String(window.__ELS[k].innerHTML||'');
JSON.stringify({r1ok:r1.ok,left1:r1.left,offers1:offers1,
  r2ok:r2.ok,offers2:offers2,r3ok:r3.ok,txt:r3.txt,
  changed:!same1&&!same2,btn:html.indexOf('让经纪人再打一轮电话')>=0,
  noUndef:html.indexOf('undefined')<0});
'''

def main():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    print(json.dumps(r, ensure_ascii=False, indent=1))
    for k in ('r1ok', 'r2ok'):
        if not r[k]:
            raise harness.Fail('第 %s 次 reroll 失败' % k)
    if r['r3ok']:
        raise harness.Fail('rerolls 耗尽后仍可 reroll')
    if not r['changed']:
        raise harness.Fail('reroll 后名单没变: %s / %s' % (r['offers1'], r['offers2']))
    if not r['btn']:
        raise harness.Fail('渲染缺少重roll按钮')
    if not r['noUndef']:
        raise harness.Fail('渲染出现 undefined')
    print('TRANSFER REROLL PASS')

main()
