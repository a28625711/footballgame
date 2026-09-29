# -*- coding: utf-8 -*-
# 世界杯显示两项修复回归：
#  A) _natStage 取“最深一轮”：此前一旦在首轮（三十二强）出现就 break，导致打过淘汰赛的
#     赛季也一律显示“止步三十二强”；修复后应出现 十六强/八强/四强/亚军/冠军。
#  B) 世界面板小组赛比分：_flatMs 只存 id，而 _grpBox 旧代码用 ag()(俱乐部) 解析 → 国家队
#     解析不到、比分旁无国名。改为经 _crTm 解析（国家队 id 走 NATS）。断言小组赛 id 均能在
#     NATS 解析出队名，且 SIM.teamById(id) 为空（=旧代码必空）。
import json

import harness

JS = r'''
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.3,number:7,foot:'r'};
var natIds={}; (typeof NATS!=='undefined'?NATS:[]).forEach(function(n){natIds[n.i]=n.n;});
var stages={},grpSample=null;
function resolve(st,p){var t=p.type;
 if(t==='random'||t==='forced'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
 if(t==='report'){ window.__SIMTEST.cont(); return; }
 if(t==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); return; }
 if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
 if(t==='transfer'){ if(p.offers&&p.offers.length){window.__SIMTEST.option('0');}else{window.__SIMTEST.option(p.canStay?'stay':'retire');} return; }
 if(t==='academy'||t==='youth_path'){ window.__SIMTEST.option(0); return; }
 if(t==='retire_forced'){ window.SIM.choose('retire'); return; }}
function grab(st){ try{ var w=st.natFx&&st.natFx.data&&st.natFx.data.wc;
  if(w&&w.groups&&w.groups.length&&w.groups[0].matches&&w.groups[0].matches.length&&!grpSample){
   var ms=w.groups[0].matches; grpSample={flat:(typeof ms[0]!=='object'), ids:[(typeof ms[0]!=='object')?ms[0]:ms[0].homeId,(typeof ms[0]!=='object')?ms[1]:ms[0].awayId], n:ms.length}; }}catch(e){} }
for(var s=1;s<=10;s++){
 var st=window.__SIMTEST.start('normal',P,s);
 st.ovr=88;st.maxOvr=96;st.money=1200;st.age=19;st.phase='career';
 st.teamId='rma';st.role='star';st.contractLeft=40;st.seasonsAtClub=1;st.roleAdjust=0;st.guanxi=60;st.youthTeamId=null;
 st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;
 var n=0;
 while(n++<400000){ var p=st.pending;
   if(!p){ if(st.phase==='summary'||st.phase==='done')break; try{window.SIM.nextStep();}catch(e){break;} grab(st); continue; }
   try{resolve(st,p);}catch(e){break;}
   grab(st);
   if(st.phase==='summary'||st.phase==='done'){st.pending=null;break;} }
 (st.tournaments||[]).forEach(function(t){ if(t.comp==='世界杯'&&t.stage)stages[t.stage]=(stages[t.stage]||0)+1; });
}
var deep=(stages['止步十六强']||0)+(stages['止步八强']||0)+(stages['止步四强']||0)+(stages['亚军']||0)+(stages['冠军']||0);
var grpOK=null;
if(grpSample){ grpOK = grpSample.flat && natIds[grpSample.ids[0]] && natIds[grpSample.ids[1]]; }
var teamByIdNull = grpSample?( !window.SIM.teamById(grpSample.ids[0]) ):(null);
return JSON.stringify({stages:stages, deep:deep, grpSample:grpSample, grpNames:grpSample?[natIds[grpSample.ids[0]],natIds[grpSample.ids[1]]]:null, grpOK:grpOK, teamByIdNull:teamByIdNull});
})()
'''


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r['deep'] > 0, 'no WC stage beyond R32 (fix A failed): %s' % r['stages'])
    harness.check(r['grpSample'] is not None, 'no WC group fixture captured')
    harness.check(r['grpSample']['flat'], 'WC group matches not flat ids')
    harness.check(r['grpOK'], 'WC group ids do not resolve to national names: %s' % (r['grpNames'],))
    harness.check(r['teamByIdNull'], 'SIM.teamById resolves a national id (old path would not be empty)')
    print('PASS wc_ui (stages=%s; group fixture %s vs %s)' % (
        r['stages'], r['grpNames'][0], r['grpNames'][1]))


if __name__ == '__main__':
    harness.main(run)
