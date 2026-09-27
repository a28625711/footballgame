# 本次四项修复回归：
#  A) 青训期世界面板应有国内杯赛统计（_runCups 不再被 if(pro) 挡住）
#  B) 大场面加时逐球播报：解说行数 == 加时进球数（比分不会平白多球）
#  C) 国家队页应显示世界杯冠军（game.js nats 聚合的 &&/|| 优先级修复）
import json

import harness

JS = r'''
(function(){
var out={err:null};
function resolve(p){
  if(!p)return;
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0); return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length)window.__SIMTEST.option('0'); else window.__SIMTEST.option(p.canStay?'stay':'retire'); return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
try{
  /* A) 青训期杯赛 */
  var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,77);
  au.talent=1.3;
  var g=0,lastAge=-1,maxCups=0;
  while(g++<600&&au.phase==='youth'){
    if(au.age>=14&&(!au.ovr||au.ovr<55)){au.ovr=55;au.maxOvr=92;}
    if(au.age!==lastAge){lastAge=au.age;var cs=window.SIM.world({q:'cups'}).cups||[];if(cs.length>maxCups)maxCups=cs.length;}
    if(!au.pending){ window.SIM.nextStep(); continue; }
    resolve(au.pending);
  }
  out.youthCups=maxCups;

  /* B) 加时逐球播报一致性 */
  var bad=0,checked=0;
  for(var s=100;s<140;s++){
    var st=window.__SIMTEST.start('normal',%NEW_PLAYER%,s);
    st.ovr=84;st.maxOvr=90;st.age=24;st.phase='career';st.teamId='rma';st.role='starter';
    st.contractLeft=20;st.seasonsAtClub=2;st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;
    window.SIM.doPeriod();
    var gg=0;
    while(st.pending&&gg++<40){
      var p=st.pending;
      if(p.type==='bigmatch'){
        if(!p.result){window.SIM.choose('push');}
        else{
          var log=p.log||[],i0=-1,i;
          for(i=0;i<log.length;i++)if(log[i].indexOf('九十分钟战平')>=0){i0=i;break;}
          if(i0>=0){
            var sum=function(s2){var m=/比分 .*?(\d+)\s*:\s*(\d+)/.exec(s2);return m?((+m[1])+(+m[2])):-1;};
            var before=0,after=0,afterIdx=-1;
            for(i=0;i<i0;i++){if(sum(log[i])>=0)before=sum(log[i]);}
            for(i=i0+1;i<log.length;i++){if(sum(log[i])>=0){after=sum(log[i]);afterIdx=i;}}
            var lines=0,end=afterIdx<0?log.length:afterIdx;
            for(i=i0+1;i<end;i++){if(log[i].indexOf('加时赛，')===0)lines++;}
            checked++;
            if(after-before!==lines)bad++;
          }
          window.__SIMTEST.cont();
        }
      }
      else if(p.type==='report'){window.__SIMTEST.cont();}
      else if(p.type==='random'||p.type==='forced'){ if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0);}
      else {try{window.SIM.nextStep();}catch(e){break;}}
    }
  }
  out.etChecked=checked;out.etBad=bad;

  /* C) 国家队页显示世界杯冠军 */
  var wc=window.__SIMTEST.start('normal',%NEW_PLAYER%,31);
  wc.ovr=86;wc.maxOvr=92;wc.money=2000;wc.age=22;wc.phase='career';
  wc.teamId='rma';wc.role='starter';wc.contractLeft=2;wc.seasonsAtClub=2;
  wc.flags={};wc.usedEvents={};wc.forceQ=[];wc.pending=null;
  window.SIM.doPeriod();var g2=0;while(wc.pending&&g2++<30)resolve(wc.pending);
  wc.seasons=wc.seasons||[];
  wc.seasons.push({'age':20,'teamId':'rma','teamName':'RMA','color':'#f00','apps':10,'goals':8,'assists':2,
    'cs':0,'ga':0,'caps':6,'natGoals':4,'natAssists':1,'natCs':0,'ovrEnd':86,'note':'','nat':null,
    'trophies':['世界杯冠军','亚洲杯冠军'],'moves':[]});
  window.__SIMTEST.render();
  var html=Object.keys(window.__ELS).map(function(k){return String(window.__ELS[k].innerHTML);}).join('\n');
  out.natHasWC=html.indexOf('世界杯冠军')>=0;
}catch(e){ out.err=String(e).slice(0,300); }
return JSON.stringify(out);
})()
'''.replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r.get('err') is None, r.get('err', ''))
    harness.check(r['youthCups'] >= 8, 'youth world has no cup stats (%s)' % r['youthCups'])
    harness.check(r['etChecked'] > 0, 'no extra-time match sampled')
    harness.check(r['etBad'] == 0, 'ET narration/score mismatch in %d/%d' % (r['etBad'], r['etChecked']))
    harness.check(r['natHasWC'], 'national tab does not show World Cup title')
    print('PASS event_fixes (youth cups=%d, ET %d/%d ok, nat WC title)' % (
        r['youthCups'], r['etChecked'] - r['etBad'], r['etChecked']))


if __name__ == '__main__':
    harness.main(run)
