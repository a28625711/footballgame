# -*- coding: utf-8 -*-
# 改动回归：
#  A. 赛后个人播报改为按本场真实 _meG/_meA（不再是 40% 随机台词）
#  B. 同档次跨域大场面可同年并存（亚洲杯 国家队 vs 欧冠 俱乐部洲际），
#     靠 _bmFinish 的 shift 串行播第二场（与世界杯小组赛+决赛同机制）
import json

import harness

# 确定性：手动入队 cont+asia，验证两场都能在同期被播到
SEQ_JS = r"""
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'};
function mk(s){
  var st=window.__SIMTEST.start('normal',P,s);
  st.ovr=86;st.maxOvr=96;st.money=800;st.age=24;st.phase='career';st.teamId='mci';
  st.role='star';st.contractLeft=50;st.seasonsAtClub=2;st.roleAdjust=0;st.guanxi=50;
  st.youthTeamId=null;st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;st.bigQ=[];
  return st;
}
var out={};
// 1) 跨域同档：cont + asia 应能并存
var st=mk(31);
var ok1=window.SIM.pushPri('cont',0.55,{comp:'欧冠决赛',opp:'A队',oppStr:84,_aiCtx:{t:'cont',comp:'欧冠',stage:'决赛'}});
var ok2=window.SIM.pushPri('asia',0.55,{comp:'亚洲杯决赛',opp:'B队',oppStr:80,_aiCtx:{t:'nat',comp:'亚洲杯',stage:'决赛'}});
out.crossQueue=st.bigQ.length;
out.crossKinds=[st.bigQ[0].kind,st.bigQ[1].kind];
// 2) 同域同档（asia + u23，都是国家队）：不得并存
var st2=mk(32);
window.SIM.pushPri('asia',0.55,{comp:'亚洲杯决赛',opp:'B队',oppStr:80,_aiCtx:{t:'nat',comp:'亚洲杯',stage:'决赛'}});
var before=st2.bigQ.length;
window.SIM.pushPri('u23',0.55,{comp:'U23亚洲杯决赛',opp:'C队',oppStr:70,_aiCtx:{t:'nat',comp:'U23亚洲杯',stage:'决赛'}});
out.sameLaneLen=st2.bigQ.length;      // 目标是 1（让位或拒绝，都不该出现 2）
out.sameLaneBefore=before;
// 3) 高档次（wc tier4）应让位并清成 1
var st3=mk(33);
window.SIM.pushPri('cont',0.55,{comp:'欧冠决赛',opp:'A队',oppStr:84,_aiCtx:{t:'cont',comp:'欧冠',stage:'决赛'}});
window.SIM.pushPri('wc',0.55,{comp:'世界杯决赛',opp:'D队',oppStr:88,_aiCtx:{t:'nat',comp:'世界杯',stage:'决赛'}});
out.wcKind=st3.bigQ.length===1?st3.bigQ[0].kind:'len'+st3.bigQ.length;
// 4) 驱动：同期的两场应先后被播到
var st4=mk(34);
window.SIM.pushPri('cont',0.55,{comp:'欧冠决赛',opp:'A队',oppStr:84,_aiCtx:{t:'cont',comp:'欧冠',stage:'决赛'}});
window.SIM.pushPri('asia',0.55,{comp:'亚洲杯决赛',opp:'B队',oppStr:80,_aiCtx:{t:'nat',comp:'亚洲杯',stage:'决赛'}});
var seq=[],g=0;
while(g++<4000&&seq.length<2){
  var p=st4.pending;
  if(!p){ try{window.SIM.nextStep();}catch(e){ break; } continue; }
  if(p.type==='bigmatch'){
    if(!p.result){ window.SIM.choose('push'); }
    else { seq.push(p.kind); window.__SIMTEST.cont(); }
    continue;
  }
  if(p.type==='report'){ window.__SIMTEST.cont(); continue; }
  if(p.type==='random'||p.type==='forced'){ if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0); continue; }
  if(p.type==='staff'){ window.__SIMTEST.option(p.offers[0]); continue; }
  if(p.type==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'0'); continue; }
  try{window.SIM.nextStep();}catch(e){break;}
}
out.seq=seq;
return JSON.stringify(out);
})()
"""

# 生涯级：统计跨域同年两场 + 校验台词与比分一致
CAREER_JS = r"""
(function(){
var P={name:'lg',origin:'sd',pos:'GK',nation:'cn',talent:1.1,number:1,foot:'r'};
var errs=[],kinds={},twoKindYears=0,heroNew=0,csBad=0,oldPhrase=0,sawPens=0;
function resolve(st,p){
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){
    if(!p.result){
      var key=p.kind+'@'+(st.age);
      kinds[key]=(kinds[key]||0)+1;
      window.SIM.choose('push');
    }else{
      var lg=(p.result.log||[]).join('|');
      if(lg.indexOf('零封了对手')>=0){heroNew++; if(!(p.result.score&&p.result.score[1]===0))csBad++;}
      if(lg.indexOf('梅开二度')>=0||lg.indexOf('帽子戏法')>=0||lg.indexOf('送出')>=0&&lg.indexOf('次助攻')>=0||lg.indexOf('打进 ')>=0)heroNew++;
      if(lg.indexOf('单掌把必进球托了出去')>=0)oldPhrase++;
      if(p.result.pens)sawPens++;
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
for(var s=95000;s<95000+%N%;s++){
  var st=window.__SIMTEST.start('normal',P,s);
  st.ovr=86;st.maxOvr=96;st.money=800;st.age=19;st.phase='career';st.teamId='mci';
  st.role='star';st.contractLeft=50;st.seasonsAtClub=1;st.roleAdjust=0;st.guanxi=50;
  st.youthTeamId=null;st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;
  var g=0;
  while(g++<200000){
    if(st.phase==='youth'&&(st.talent||0)<1.3)st.talent=1.3;
    var p=st.pending;
    if(!p){ if(st.phase==='summary'||st.phase==='done')break; try{window.SIM.nextStep();}catch(e){errs.push('next:'+s+':'+String(e).slice(0,70));break;} continue;}
    try{ resolve(st,p); }catch(e){ errs.push('p:'+s+':'+String(e).slice(0,70)); break; }
    if(st.phase==='summary'||st.phase==='done'){st.pending=null;break;}
  }
}
var byYear={};
for(var k in kinds){var parts=k.split('@');(byYear[parts[1]]=byYear[parts[1]]||[]).push(parts[0]);}
for(var y in byYear){ if(byYear[y].length>=2)twoKindYears++; }
return JSON.stringify({errs:errs.slice(0,4),twoKindYears:twoKindYears,heroNew:heroNew,csBad:csBad,oldPhrase:oldPhrase,pens:sawPens,years:Object.keys(byYear).length});
})()
""".replace('%N%', '18')


# 受伤：下场后不得再有任何个人表现，且要有真实代价
INJ_JS = r"""
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'};
var st=window.__SIMTEST.start('normal',P,51);
st.ovr=86;st.maxOvr=96;st.money=800;st.age=24;st.phase='career';st.teamId='mci';
st.role='star';st.contractLeft=50;st.seasonsAtClub=2;st.roleAdjust=0;st.guanxi=50;
st.youthTeamId=null;st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;st.bigQ=[];
window.SIM.pushPri('cont',0.55,{comp:'欧冠决赛',opp:'A队',oppStr:84,_aiCtx:{t:'cont',comp:'冠军联赛',stage:'决赛'}});
var inj=false,ovrBefore=null,gainAfter=0,benchLine=0,g=0;
while(g++<4000){
  var p=st.pending;
  if(!p){ try{window.SIM.nextStep();}catch(e){break;} continue; }
  if(p.type==='bigmatch'){
    if(!p.result){
      if(!inj&&st.bigQ&&st.bigQ[0]){st.bigQ[0]._injured=!0x0;st.bigQ[0]._meG=0;st.bigQ[0]._meA=0;inj=true;ovrBefore=st.ovr;}
      window.SIM.choose('push');
      if(inj&&st.bigQ&&st.bigQ[0]){var _m=(st.bigQ[0]._meG||0)+(st.bigQ[0]._meA||0);if(_m>0)gainAfter+=_m;}
    }else{
      var lg=(p.result.log||[]).join('|');
      if(lg.indexOf('替补席')>=0)benchLine++;
      break;
    }
    continue;
  }
  if(p.type==='report'){ window.__SIMTEST.cont(); continue; }
  if(p.type==='random'||p.type==='forced'){ if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0); continue; }
  if(p.type==='staff'){ window.__SIMTEST.option(p.offers[0]); continue; }
  if(p.type==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'0'); continue; }
  try{window.SIM.nextStep();}catch(e){break;}
}
var note=(st._curBz&&st._curBz.note)||null;
if(!note){for(var i=0;i<(st.seasons||[]).length;i++)if(st.seasons[i].note==='伤病')note='伤病';}
return JSON.stringify({inj:inj,gainAfter:gainAfter,benchLine:benchLine,
  ovrBefore:ovrBefore,ovrAfter:st.ovr,note:note});
})()
"""


def run():
    mr = harness.new_engine()
    u = json.loads(mr.eval(SEQ_JS))
    harness.check(u['crossQueue'] == 2, 'cont+asia did not co-queue: %s' % u)
    harness.check(sorted(u['crossKinds']) == ['asia', 'cont'], 'unexpected kinds: %s' % u['crossKinds'])
    harness.check(u['sameLaneLen'] <= 1, 'same-lane (asia+u23) wrongly co-queued: %s' % u)
    harness.check(u['wcKind'] == 'wc', 'wc(tier4) should displace and stay alone: %s' % u)
    harness.check(sorted(u['seq']) == ['asia', 'cont'], 'both co-queued matches not played serially: %s' % u)

    mr2 = harness.new_engine()
    r = json.loads(mr2.eval(CAREER_JS))
    if r['errs']:
        raise harness.Fail('runtime errors: %s' % r['errs'])
    if r['oldPhrase']:
        raise harness.Fail('old 40%% flavor line still present: %d' % r['oldPhrase'])
    if r['csBad']:
        raise harness.Fail('GK "零封了对手" shown while conceding: %d' % r['csBad'])
    if r['heroNew'] < 5:
        raise harness.Fail('new data-driven hero lines barely fire: %d' % r['heroNew'])
    mr3 = harness.new_engine()
    n = json.loads(mr3.eval(INJ_JS))
    harness.check(n['inj'], 'injury injection failed: %s' % n)
    harness.check(n['gainAfter'] == 0, 'injured player still gained goals/assists: %s' % n)
    harness.check(n['benchLine'] >= 1, 'no bench narrative after injury: %s' % n)
    harness.check(n['ovrBefore'] is not None and abs(n['ovrAfter'] - (n['ovrBefore'] - 2)) < 1e-6,
                  'injury had no real ovr cost: %s' % n)
    harness.check(n['note'] == '伤病', 'season record not marked as injured: %s' % n)
    print('PASS bigmatch_combo (co-queue seq=%s, sameLane len=%s, wc=%s | careers: heroLines=%d 零封矛盾=%d twoKindYears=%d 点球=%d | 受伤: +%d球 替补席文案%d 能力%d->%d 记录=%s)'
          % (u['seq'], u['sameLaneLen'], u['wcKind'], r['heroNew'], r['csBad'], r['twoKindYears'], r['pens'],
             n['gainAfter'], n['benchLine'], n['ovrBefore'], n['ovrAfter'], n['note']))


if __name__ == '__main__':
    harness.main(run)
