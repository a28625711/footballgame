# -*- coding: utf-8 -*-
"""家乡球队(region)回归：
- 每支中超/中甲球队都有 region，且值属于 11 个开局省份之一
- 上海出身 12 岁选营时，海港(cn-sh) 与 申花(cn-shh) 同时出现（原来固定只有海港）"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
function regionCheck(){
  var T=window.DATA.TEAMS,bad=[],n=0;
  var ok={ln:1,sd:1,sh:1,bj:1,gd:1,hn:1,heb:1,hun:1,xj:1,js:1,sc:1};
  for(var i=0;i<T.length;i++){var t=T[i];
    if(t.league==='csl'||t.league==='cl1'){n++;
      if(!t.region||!ok[t.region])bad.push(t.id+':'+t.region);}}
  return JSON.stringify({n:n,bad:bad});
}
function path(origin,seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':origin,'pos':'ST','nation':'cn','talent':1.2,'number':9,'foot':'r'},seed);
  au.originId=origin; au.phase='youth'; au.youthTeamId=null; au.money=0; au.pending=null;
  window.SIM.nextStep();
  var p=au.pending;
  return JSON.stringify({type:p?p.type:null,offers:p&&p.offers?p.offers:[]});
}
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)
    rc = json.loads(mr.eval('regionCheck()'))
    assert rc['n'] == 32, 'expected 32 csl/cl1 teams, got %d' % rc['n']
    assert not rc['bad'], 'bad region: %s' % rc['bad']
    print('region attr OK (%d csl/cl1 teams, all valid origin regions)' % rc['n'])

    sh = json.loads(mr.eval('path("sh",101)'))
    assert sh['type'] == 'youth_path', 'unexpected pending %s' % sh['type']
    assert 'cn-sh' in sh['offers'] and 'cn-shh' in sh['offers'], \
        'Shanghai should offer both 海港+申花, got %s' % sh['offers']
    print('shanghai offers:', sh['offers'])

    sd = json.loads(mr.eval('path("sd",102)'))
    assert 'cn-sd' in sd['offers'], 'Shandong should offer 山东泰山, got %s' % sd['offers']
    bj = json.loads(mr.eval('path("bj",103)'))
    assert 'cn-bj' in bj['offers'], 'Beijing should offer 北京国安, got %s' % bj['offers']
    print('sd/bj home teams present')
    print('PASS home_region (region 属性齐全 + 上海双队同时出现)')
    print('PASS')


if __name__ == '__main__':
    main()
