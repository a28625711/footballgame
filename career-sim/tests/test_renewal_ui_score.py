# 两项回归：
#  A) 杯赛/洲际/超级杯比分主客翻转时，点球比分要与胜负一致（不再出现"点球 8-9 却赢了"）
#  B) 续约界面复用转会窗的报价卡（.opt-offer 徽章 + /赛季），不再用错标签"每周"
import json

import harness

JS = r'''
(function(){
var out={err:null,penBad:[],penCount:0,wonBad:[]};
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
function scanRuns(runs){
  (runs||[]).forEach(function(run){
    (run["rounds"]||[]).forEach(function(rd){
      var sc=rd["score"]||'';
      var m=sc.match(/^(\d+)-(\d+)(.*)$/);
      if(!m)return;
      var a=+m[1],b=+m[2],tail=m[3];
      var pm=tail.match(/点球 (\d+)-(\d+)/);
      if(pm){
        out.penCount++;
        var pa=+pm[1],pb=+pm[2];
        /* 若射门数不等，胜负必须与点球比分一致（主队=玩家在前） */
        if(pa!==pb&&rd["won"]!==(pa>pb))out.penBad.push(sc+' won='+rd["won"]);
      }else{
        if(a!==b&&rd["won"]!==(a>b))out.wonBad.push(sc+' won='+rd["won"]);
      }
    });
  });
}
try{
  /* A) 跑多个生涯采集杯赛/洲际比分 */
  for(var s=200;s<230;s++){
    var st=window.__SIMTEST.start('normal',%NEW_PLAYER%,s);
    st.talent=1.35;
    st.ovr=86;st.maxOvr=93;st.money=5000;st.age=23;st.phase='career';
    st.teamId='rma';st.role='starter';st.contractLeft=10;st.seasonsAtClub=1;
    st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;
    for(var yr=0;yr<16&&st.phase==='career';yr++){
      try{ window.SIM.doPeriod(); }catch(e){ break; }
      var g=0;while(st.pending&&g++<40){try{resolve(st.pending);}catch(e){break;}}
      scanRuns(st.cupRuns);
    }
  }

  /* B) 续约界面 */
  var wc=window.__SIMTEST.start('normal',%NEW_PLAYER%,9);
  wc.ovr=82;wc.maxOvr=90;wc.age=26;wc.phase='career';wc.teamId='rma';wc.role='starter';
  wc.contractLeft=1;wc.seasonsAtClub=3;wc.flags={};wc.usedEvents={};wc.forceQ=[];wc.pending=null;
  wc.flags._contractDue=!0x0;
  window.SIM.nextStep();
  var renewOnly=wc.pending&&wc.pending.type==='transfer'&&wc.pending.renewOnly;
  window.__SIMTEST.render();
  var html=Object.keys(window.__ELS).map(function(k){return String(window.__ELS[k].innerHTML);}).join('\n');
  out.renewOnly=!!renewOnly;
  out.hasOptOffer=html.indexOf('opt-offer')>=0;
  out.hasPerSeason=html.indexOf('/赛季')>=0;
  out.hasWeekly=html.indexOf('每周')>=0;
}catch(e){ out.err=String(e).slice(0,300); }
return JSON.stringify(out);
})()
'''.replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r.get('err') is None, r.get('err', ''))
    harness.check(r['penCount'] > 0, 'no penalty shootout sampled')
    harness.check(not r['penBad'], 'penalty score contradicts result: %s' % r['penBad'][:4])
    harness.check(not r['wonBad'], 'score contradicts result: %s' % r['wonBad'][:4])
    harness.check(r['renewOnly'], 'renewal pending not produced')
    harness.check(r['hasOptOffer'], 'renewal UI missing .opt-offer badge (not like transfer window)')
    harness.check(r['hasPerSeason'] and not r['hasWeekly'], 'renewal wage label wrong (weekly vs per-season)')
    print('PASS renewal_ui_score (pens %d ok, renewal card matches transfer window)' % r['penCount'])


if __name__ == '__main__':
    harness.main(run)
