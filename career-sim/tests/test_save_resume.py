# -*- coding: utf-8 -*-
"""存档续玩回归：
主档在青训期也会写入（phase='youth'、seasons 为空），但旧版续玩条件要求
`seasons.length>0`，导致青训期存档在刷新/重开后既不自动续玩、点「开始」也不提示，
相当于青训存档作废。本测试：
1) 生成一个青训期存档（phase=youth, seasons=0）；
2) 在全新引擎里注入该存档并触发 DOMContentLoaded（模拟刷新）；
3) 断言成功续玩且能继续推进到生涯结束（无运行时错误）；
4) 顺带验证生涯期存档照常续玩（不回归）。
"""
import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness
from py_mini_racer import MiniRacer

STORE_SETUP = """
window.__STORE={};
window.__SAVES=[];
localStorage.setItem=function(k,v){window.__STORE[k]=v;if(k==='gyrs_save')window.__SAVES.push(v.length);};
localStorage.getItem=function(k){return window.__STORE[k]!==undefined?window.__STORE[k]:null;};
localStorage.removeItem=function(k){delete window.__STORE[k];};
"""

DRIVE = r"""
(function(){
var target='%TARGET%';
var st=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},7777);
var g=0,last='',rep=0;
while(g++<20000){
  if(st.phase==='youth'){ if((st.talent||0)<1.3)st.talent=1.3; if(st.age>=14&&(!st.ovr||st.ovr<52)){st.ovr=52;st.maxOvr=Math.max(st.maxOvr||0,92);} }
  if(target==='youth'&&st.phase==='youth'&&st.age>=15)break;
  if(target==='career'&&st.phase==='career'&&(st.seasons||[]).length>=2)break;
  var p=st.pending;
  if(!p){ if(st.phase==='summary'||st.phase==='done')break; window.SIM.nextStep(); continue; }
  if(p.type===last&&++rep>400)break; if(p.type!==last){last=p.type;rep=0;}
  if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} }
  else if(p.type==='report'){ window.__SIMTEST.cont(); }
  else if(p.type==='bigmatch'){ if(!p.result){window.SIM.choose('push');} else {window.__SIMTEST.cont();} }
  else if(p.type==='staff'){ window.__SIMTEST.option(p.offers[0]); }
  else if(p.type==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'retire'); }
  else if(p.type==='academy'||p.type==='youth_path'){ window.__SIMTEST.option(0); }
  else if(p.type==='retire_forced'){ window.SIM.choose('retire'); }
  else { window.__SIMTEST.cont(); }
  if(st.phase==='summary'||st.phase==='done'){st.pending=null;break;}
}
window.__CAP={'save':window.__STORE['gyrs_save']||null,'age':st.age,'phase':st.phase,'seasons':(st.seasons||[]).length};
return JSON.stringify({age:st.age,phase:st.phase,seasons:(st.seasons||[]).length});
})()
"""

RESUME = r"""
(function(){
var ev=(window.__DOCEV&&window.__DOCEV['DOMContentLoaded'])||[];
var errs=[];
for(var i=0;i<ev.length;i++)try{ev[i]();}catch(e){errs.push(String(e).slice(0,150));}
var st=window.__SIMTEST.state();
return JSON.stringify({resumed:!!st,age:st?st.age:null,phase:st?st.phase:null,seasons:st&&st.seasons?st.seasons.length:null,errs:errs});
})()
"""

CONTINUE = r"""
(function(){
var st=window.__SIMTEST.state(); if(!st)return JSON.stringify({ok:false,err:'no state'});
var errs=[],g=0,last='',rep=0;
while(g++<20000){
  if(st.phase==='youth'){ if((st.talent||0)<1.3)st.talent=1.3; if(st.age>=14&&(!st.ovr||st.ovr<52)){st.ovr=52;st.maxOvr=Math.max(st.maxOvr||0,92);} }
  var p=st.pending;
  if(!p){ if(st.phase==='summary'||st.phase==='done')break; try{window.SIM.nextStep();}catch(e){errs.push('next:'+String(e).slice(0,120));break;} continue; }
  if(p.type===last&&++rep>400){errs.push('stuck:'+p.type);break;} if(p.type!==last){last=p.type;rep=0;}
  try{
    if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} }
    else if(p.type==='report'){ window.__SIMTEST.cont(); }
    else if(p.type==='bigmatch'){ if(!p.result){window.SIM.choose('push');} else {window.__SIMTEST.cont();} }
    else if(p.type==='staff'){ window.__SIMTEST.option(p.offers[0]); }
    else if(p.type==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'retire'); }
    else if(p.type==='academy'||p.type==='youth_path'){ window.__SIMTEST.option(0); }
    else if(p.type==='retire_forced'){ window.SIM.choose('retire'); }
    else { window.__SIMTEST.cont(); }
  }catch(e){errs.push('p:'+p.type+':'+String(e).slice(0,120));break;}
  if(st.phase==='summary'||st.phase==='done'){st.pending=null;break;}
}
return JSON.stringify({ok:!errs.length,errs:errs,age:st.age,phase:st.phase,seasons:(st.seasons||[]).length});
})()
"""


def _capture(target):
    """Drive a career to `target` phase and return (save_string, meta)."""
    mr = harness.new_engine()
    mr.eval(STORE_SETUP)
    mr.eval(DRIVE.replace('%TARGET%', target))
    cap = json.loads(mr.eval('JSON.stringify(window.__CAP)'))
    return cap['save'], cap


def _resume(save):
    """Fresh engine, inject save, fire DOMContentLoaded, return resume result."""
    mr = harness.new_engine()
    mr.eval(STORE_SETUP)
    mr.eval("window.__STORE['gyrs_save']=%s;" % json.dumps(save))
    return json.loads(mr.eval(RESUME)), mr


def run():
    # --- youth save must resume ---
    ysave, ymeta = _capture('youth')
    harness.check(ysave, 'no youth save was written')
    harness.check(ymeta['phase'] == 'youth' and ymeta['seasons'] == 0,
                  'expected youth save with empty seasons, got %r' % ymeta)
    r, mr = _resume(ysave)
    harness.check(not r['errs'], 'DOMContentLoaded threw: %s' % r['errs'])
    harness.check(r['resumed'], 'youth save was NOT resumed (phase=%r)' % ymeta['phase'])
    harness.check(r['phase'] == 'youth', 'resumed into wrong phase: %r' % r)
    cont = json.loads(mr.eval(CONTINUE))
    harness.check(cont['ok'], 'errors while continuing resumed youth save: %s' % cont['errs'])
    harness.check(cont['phase'] in ('summary', 'done'), 'resumed career did not finish: %r' % cont)

    # --- career save must still resume (no regression) ---
    csave, cmeta = _capture('career')
    harness.check(csave, 'no career save was written')
    harness.check(cmeta['seasons'] >= 2, 'career save has too few seasons: %r' % cmeta)
    r2, _ = _resume(csave)
    harness.check(r2['resumed'], 'career save was NOT resumed: %r' % r2)
    harness.check(r2['seasons'] == cmeta['seasons'],
                  'career resume lost seasons: %r vs %r' % (r2, cmeta))

    print('PASS save_resume (youth age=%d seasons=0 resumed+finished; career seasons=%d resumed)'
          % (ymeta['age'], cmeta['seasons']))


if __name__ == '__main__':
    harness.main(run)
