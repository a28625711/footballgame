# -*- coding: utf-8 -*-
"""开局随机姓名回归：扩充姓氏 + 复名（2字名）。

随机姓名由 game.js 的 bU1() 生成，UI 里点"换一个"(data-reroll) 触发。
本测试模拟多次 reroll，断言：姓名 2-3 字、姓氏种类足够多、存在复名。
"""
import json
import harness

JS = """
(function(){
  // 触发 DOMContentLoaded 让 game.js 绑定事件；再点"开始"以初始化 av(bU)
  (window.__DOCEV&&window.__DOCEV['DOMContentLoaded']||[]).forEach(function(f){try{f();}catch(e){}});
  var st=window.__ELS['btn-start'];
  if(!st||!st.__ev||!st.__ev['click']||!st.__ev['click'].length)return JSON.stringify({err:'NO_START_HANDLER'});
  st.__ev['click'][0]();
  var el=window.__ELS['step-body'];
  var hs=el&&el.__ev&&el.__ev['click'];
  if(!hs||!hs.length)return JSON.stringify({err:'NO_REROLL_HANDLER'});
  var names=[];
  for(var i=0;i<500;i++){
    hs[0]({target:{closest:function(s){return s==='[data-reroll]'?{}:null;}}});
    var nm=window.__SIMTEST.showIdentity().name;
    names.push(nm);
  }
  return JSON.stringify({names:names});
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r.get('err'):
        raise harness.Fail(r['err'])
    names = r['names']
    if len(names) < 400:
        raise harness.Fail('too few samples: %d' % len(names))
    bad = [n for n in names if not (isinstance(n, str) and 2 <= len(n) <= 3)]
    if bad:
        raise harness.Fail('bad name lengths: %r' % bad[:5])
    surnames = set(n[0] for n in names)
    tri = set(n for n in names if len(n) == 3)
    if len(surnames) < 60:
        raise harness.Fail('too few distinct surnames: %d' % len(surnames))
    if len(tri) < 8:
        raise harness.Fail('too few compound names: %d (%r)' % (len(tri), list(tri)[:5]))
    print('PASS names (%d samples, %d surnames, %d three-char names)'
          % (len(names), len(surnames), len(tri)))


if __name__ == '__main__':
    harness.main(run)
