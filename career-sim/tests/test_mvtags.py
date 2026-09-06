# -*- coding: utf-8 -*-
"""升降级标记渲染验证：跑 2 季世界 → 渲染世界面板 → 检查 升级/降级 标"""
import sys, os, re, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r'''
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},555);
for(var y=0;y<2;y++){
  au["age"]=12+y;  /* 真实流程每季 age+1 → 赛季标签唯一（直驱不自动加龄） */
  var bz={trophies:[]};
  window.SIM.simWorld(bz,{name:'p'},{id:'epl'});
  window.SIM.promoReleg(bz,{name:'p'},{id:'epl'});
}
window.__MV=au["lgMoves"]||[];
window.__SIMTEST.render();
var html='';
var els=window.__ELS;
for(var k in els){html+=String(els[k].innerHTML||'');}
var tags=(html.match(/mv-tag [a-z]+">[^<]+</g)||[]).join('|');
JSON.stringify({moves:window.__MV.length,dirs:window.__MV.map(function(m){return m.dir;}),tags:tags.slice(0,300),n:(html.match(/mv-tag/g)||[]).length});
'''

def main():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    print(json.dumps(r, ensure_ascii=False, indent=1))
    if r['moves'] < 3:
        raise harness.Fail('lgMoves 未记录 (%d)' % r['moves'])
    if r['n'] != 3:
        raise harness.Fail('EPL 榜应恰有 3 个降级标，实际 %d' % r['n'])
    if '降级' not in r['tags']:
        raise harness.Fail('缺 降级 文本: %s' % r['tags'])
    if 'up' not in r['dirs']:
        raise harness.Fail('lgMoves 无升级记录')
    print('MOVE-TAG RENDER PASS')

main()
