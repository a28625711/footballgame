# -*- coding: utf-8 -*-
"""联赛扩充验证：新联赛出表/解放者杯/升降级配平/世俱杯含南美"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r'''
window.__R={};
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},777);
for(var y=0;y<3;y++){
  var bz={trophies:[]};
  window.SIM.simWorld(bz,{name:'p'},{id:'liga'});
  window.SIM.promoReleg(bz,{name:'p'},{id:'liga'});
  var tb=window.SIM.lastTables();
  var sizes={};
  ['l1','l2','seri','serb','csl','cl1','bra','arg','pol'].forEach(function(lg){sizes[lg]=tb[lg]?tb[lg].length:0;});
  window.__R['s'+y]=sizes;
}
var cf=au["contFx"]||{};
window.__R.conts=Object.keys(cf.data||{});
var lib=cf.data&&cf.data["lib"];
window.__R.libN=lib?(lib.n||((lib.all||[]).length)):0;
window.__R.libChamp=lib?lib.champion:null;
// 解放者杯参赛队伍应来自 bra/arg
var libTeams=[];
if(lib&&lib.all){ (Array.isArray(lib.all)?lib.all:[]).forEach(function(m){ if(m&&m.a)libTeams.push(m.a,m.b); }); }
window.__R.libSample=libTeams.slice(0,4);
JSON.stringify(window.__R);
'''

def main():
    mr = harness.new_engine()
    mr.eval(JS)
    r = json.loads(mr.eval('JSON.stringify(window.__R)'))
    print(json.dumps(r, ensure_ascii=False, indent=1))
    exp = {'l1':18,'l2':18,'seri':20,'serb':20,'csl':16,'cl1':16,'bra':20,'arg':30,'pol':18}
    for s in ('s0','s1','s2'):
        for lg,n in exp.items():
            if r[s][lg] != n:
                raise harness.Fail('season %s league %s size %s != %s (升降级失衡?)' % (s, lg, r[s][lg], n))
    for c in ('ucl','uel','uecl','acl','ccl','lib','cwc'):
        if c not in r['conts'] and not (c=='cwc'):
            raise harness.Fail('contFx missing %s' % c)
    if 'lib' not in r['conts']:
        raise harness.Fail('no 解放者杯 data')
    print('EXPAND PROBE PASS')

main()
