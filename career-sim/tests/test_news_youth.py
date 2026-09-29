# -*- coding: utf-8 -*-
# 青训期新闻不应出现“职业球员才有的”主角向内容：
#   家乡/留洋风味（fv_hm_* / fv_ab_*：“有人认出你/队友/你的赛程表/你的球衣”）以及 mj_you_* 明星池。
# 同时确认职业期这些内容仍在（门控没有过宽）。
import json

import harness

JS = r'''
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:7,foot:'r'};
var youthBad={}, proHome=0;
function resolve(st,p){var t=p.type;
 if(t==='random'||t==='forced'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
 if(t==='report'){ window.__SIMTEST.cont(); return; }
 if(t==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); return; }
 if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
 if(t==='transfer'){ if(p.offers&&p.offers.length){window.__SIMTEST.option('0');}else{window.__SIMTEST.option(p.canStay?'stay':'retire');} return; }
 if(t==='academy'){ window.__SIMTEST.option(0); return; }
 if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
 if(t==='retire_forced'){ window.SIM.choose('retire'); return; }}
function isBad(id){ return id && (id.indexOf('fv_hm')===0||id.indexOf('fv_ab')===0||id.indexOf('mj_you')===0); }
for(var s=1;s<=40;s++){
 var st=window.__SIMTEST.start('normal',P,s);
 var n=0;
 while(n++<4000&&st.phase==='youth'){ var p=st.pending; if(!p){try{window.SIM.nextStep();}catch(e){break;} continue;} try{resolve(st,p);}catch(e){break;} }
 var ylen=(st.news||[]).length;
 (st.news||[]).slice(0,ylen).forEach(function(x){ if(isBad(x.id)) youthBad[x.id]=(youthBad[x.id]||0)+1; });
 st.phase='career';st.teamId=st.teamId||'mci';st.role='star';st.ovr=85;st.maxOvr=95;
 var m=0;
 while(m++<4000){ var p=st.pending; if(!p){ if(st.phase==='summary'||st.phase==='done')break; try{window.SIM.nextStep();}catch(e){break;} continue;} try{resolve(st,p);}catch(e){break;} if(st.phase==='summary'||st.phase==='done'){st.pending=null;break;} }
 (st.news||[]).forEach(function(x){ if(x.id&&x.id.indexOf('fv_hm')===0)proHome++; });
}
return JSON.stringify({youthBad:Object.keys(youthBad), youthBadN:Object.keys(youthBad).length, proHome:proHome});
})()
'''


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r['youthBadN'] == 0, 'youth news contains pro-recognition items: %s' % r['youthBad'])
    harness.check(r['proHome'] > 0, 'pro career never shows hometown flavor (gate too wide)')
    print('PASS news_youth (youth pro-recognition items=0; pro hometown occurrences=%d)' % r['proHome'])


if __name__ == '__main__':
    harness.main(run)
