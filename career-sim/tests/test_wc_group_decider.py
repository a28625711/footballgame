# -*- coding: utf-8 -*-
"""世界杯小组赛生死战回归：
1. 中国队世界杯末轮为生死战时，弹出交互大场面（kind='wc'，_grpWC/_drawOk）；
2. 小组赛允许平局（不进点球大战）；
3. 若生死战后中国队一路踢进决赛，同一届可再弹一次决赛大场面（一年两次大场面）。
"""
import json

import harness

N = 16
OVR = 88
JS = r"""
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'};
var errs=[],grp=0,grpDrawOk=0,grpLevel=0,fin=0,twoEvent=0;
function resolve(st,p){
  var t=p.type;
  if((t==='random'||t==='forced')){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){
    if(!p.result){
      if(p.kind==='wc'){
        if(p._grpWC){
          grp++;
          if(p._drawOk)grpDrawOk++;
          st.__lastWC='grp'; st.__lastWCAge=p.age;
        }else{
          fin++;
          if(st.__lastWC==='grp'){ twoEvent++; st.__lastWC=null; }
        }
      }
      window.SIM.choose('push');
    }else{
      if(p.kind==='wc'&&p._grpWC&&p.result.score&&p.result.score[0]===p.result.score[1]&&!p.result.pens)grpLevel++;
      window.__SIMTEST.cont();
    }
    return;
  }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){window.__SIMTEST.option('0');}else{window.__SIMTEST.option(p.canStay?'stay':'retire');} return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
for(var s=90000;s<90000+%N%;s++){
  var st=window.__SIMTEST.start('normal',P,s);
  st.ovr=%OVR%;st.maxOvr=96;st.money=800;st.age=19;st.phase='career';
  st.teamId='mci';st.role='star';st.contractLeft=50;st.seasonsAtClub=1;
  st.roleAdjust=0;st.guanxi=50;st.youthTeamId=null;
  st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;
  var g=0;
  while(g++<200000){
    if(st.phase==='youth'&&(st.talent||0)<1.3)st.talent=1.3;
    var p=st.pending;
    if(!p){ if(st.phase==='summary'||st.phase==='done')break; try{window.SIM.nextStep();}catch(e){errs.push('next:'+s+':'+String(e).slice(0,80));break;} continue;}
    try{ resolve(st,p); }catch(e){ errs.push('p:'+s+':'+String(e).slice(0,80)); break; }
    if(st.phase==='summary'||st.phase==='done'){st.pending=null;break;}
  }
}
return JSON.stringify({errs:errs.slice(0,4),grp:grp,grpDrawOk:grpDrawOk,grpLevel:grpLevel,fin:fin,twoEvent:twoEvent});
})()
""".replace('%N%', str(N)).replace('%OVR%', str(OVR))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['errs']:
        raise harness.Fail('runtime errors: %s' % r['errs'])
    if r['grp'] < 1:
        raise harness.Fail('no WC group 生死战 ever fired: %s' % r)
    if r['grpDrawOk'] < r['grp']:
        raise harness.Fail('group 生死战 not draw-enabled: %d/%d' % (r['grpDrawOk'], r['grp']))
    print('PASS wc_group_decider (group=%d, drawOk=%d, levelDraws=%d, finals=%d, twoEvent=%d)'
          % (r['grp'], r['grpDrawOk'], r['grpLevel'], r['fin'], r['twoEvent']))


if __name__ == '__main__':
    harness.main(run)
