# -*- coding: utf-8 -*-
"""各级决赛触发与结果回归：
1. 国家队（世界杯/亚洲杯）打进决赛即触发交互决赛——含 AI 判定为「亚军」的情形
   （修复前只在 AI 已判冠军时触发，玩家进决赛但被 AI 判负时决赛事件不弹）。
2. 洲际杯决赛（含被更高优先级大场面「让位」后 AI 结算）必须把真实比分/冠军写回
   contFx，并清除 pd（否则世界面板签表永远显示 vs/待定）。
3. natFx / contFx / cupFx 决赛数据必须完整（有比分、冠军=决赛胜者）。
"""
import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

N = 14
JS = r"""
(function(){
var errs=[], natTrig={}, contSettle={}, violations=[], contFinal=0, natFinal=0, promoSeen=0;
function winnerOf(m){
  if(!m)return null;
  if(m.pens&&m.pens.length>=2)return m.pens[0]>=m.pens[1]?m.homeId:m.awayId;
  return m.hg>=m.ag?m.homeId:m.awayId;
}
function checkNat(st,s){
  var nf=st.natFx&&st.natFx.data;if(!nf)return;
  for(var k in nf){var d=nf[k];if(!d||!d.rounds||!d.rounds.length)continue;
    var fin=d.rounds[d.rounds.length-1].matches;if(!fin||!fin.length)continue;
    var m=fin[0];
    if(m.hg==null||m.ag==null){violations.push('nat_noscore:'+s+':'+k);continue;}
    var w=winnerOf(m);
    if(d.champion!=null&&w!=null&&d.champion!==w)violations.push('nat_champ_mismatch:'+s+':'+k+':'+d.champion+'!='+w);
  }
}
function checkCont(st,s){
  var cf=st.contFx&&st.contFx.data;if(!cf)return;
  for(var tg in cf){var d=cf[tg];if(!d.rounds||!d.rounds.length)continue;
    var rr=d.rounds[d.rounds.length-1];if(!rr.ties||!rr.ties.length)continue;
    var t=rr.ties[0];
    if(t.pd)violations.push('cont_pd:'+s+':'+tg);
    else if(t.sa!=null){
      if(d.champion==null)violations.push('cont_nochamp:'+s+':'+tg);
      else if(t.w!=null&&t.w!==d.champion)violations.push('cont_wmismatch:'+s+':'+tg);
      else contSettle[tg]=(contSettle[tg]||0)+1;
    }
  }
}
function checkCup(st,s){
  var xf=st.cupFx&&st.cupFx.data;if(!xf)return;
  for(var ck in xf){var d=xf[ck];if(!d.all||!d.all.length)continue;
    var rr=d.all[d.all.length-1];if(!rr.ties||!rr.ties.length)continue;
    var t=rr.ties[0];
    if(!t.b&&(t.hg==null||t.ag==null))violations.push('cup_noscore:'+s+':'+ck);
  }
}
function resolve(st,p){
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ checkNat(st,st.__s); checkCont(st,st.__s); checkCup(st,st.__s); window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){
    if(!p.result){
      if(p.kind==='wc'||p.kind==='asia'){
        var want=p.kind==='wc'?'世界杯':'亚洲杯',found=null;
        for(var i=(st.tournaments||[]).length-1;i>=0;i--){var nt=st.tournaments[i];
          if(nt.comp===want&&nt.age===p.age){found=nt;break;}}
        var stg=found?found.stage:'NO_TOURN';
        natTrig[p.kind+':'+stg]=(natTrig[p.kind+':'+stg]||0)+1;
        if(!found)violations.push('nat_no_tourn:'+st.__s+':'+p.kind);
      }
      window.SIM.choose('push');
    } else { window.__SIMTEST.cont(); }
    return;
  }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){window.__SIMTEST.option('0');}else{window.__SIMTEST.option(p.canStay?'stay':'retire');} return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
  errs.push('unknown '+t);
}
for(var s=60001;s<60001+%N%;s++){
  var st=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.25,number:9,foot:'r'},s);
  st.ovr=86;st.maxOvr=92;st.money=800;st.age=21;st.phase='career';
  st.teamId='mci';st.role='star';st.contractLeft=50;st.seasonsAtClub=1;
  st.roleAdjust=0;st.guanxi=50;st.youthTeamId=null;
  st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;st.__s=s;
  var g=0,lastType='',rep=0;
  while(g++<20000){
    if(st.phase==='youth'){ if((st.talent||0)<1.3)st.talent=1.3; }
    var p=st.pending;
    if(!p){ if(st.phase==='summary'||st.phase==='done')break; try{window.SIM.nextStep();}catch(e){errs.push('next:'+s+':'+String(e).slice(0,100));break;} continue; }
    if(p.type===lastType&&++rep>400){errs.push('stuck:'+s+':'+p.type);break;}
    if(p.type!==lastType){lastType=p.type;rep=0;}
    if(p.type==='bigmatch'&&!p.result){if(p.kind==='promo')promoSeen++;}
    try{ resolve(st,p); }catch(e){errs.push('p:'+s+':'+p.type+':'+String(e).slice(0,100));break;}
    if(st.phase==='summary'||st.phase==='done'){st.pending=null;break;}
  }
}
return JSON.stringify({errs:errs.slice(0,6),natTrig:natTrig,contSettle:contSettle,
  nViol:violations.length,violations:violations.slice(0,15),promoSeen:promoSeen});
})()
""".replace('%N%', str(N))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['errs']:
        raise harness.Fail('runtime errors: %s' % r['errs'])
    if r['nViol']:
        raise harness.Fail('final writeback violations: %s' % r['violations'])
    # 1) 国家队决赛必须触发交互事件（含 AI 判定亚军）
    nat_total = sum(r['natTrig'].values())
    if nat_total < 1:
        raise harness.Fail('no national final ever triggered: %s' % r['natTrig'])
    # 亚军分支必须被覆盖（否则修复未生效 / 样本不足）
    runnerup = sum(v for k, v in r['natTrig'].items() if k.endswith(':亚军'))
    if runnerup < 1:
        raise harness.Fail('national-final 亚军 trigger never fired: %s' % r['natTrig'])
    # 2) 洲际决赛必须回填 contFx（至少一条被 AI 结算/交互结算）
    if not r['contSettle']:
        raise harness.Fail('no continental final settled into contFx')
    print('PASS finals_trigger (nat=%s, contSettle=%s, promo=%d, viol=0)'
          % (json.dumps(r['natTrig'], ensure_ascii=False),
             json.dumps(r['contSettle'], ensure_ascii=False), r['promoSeen']))


if __name__ == '__main__':
    harness.main(run)
