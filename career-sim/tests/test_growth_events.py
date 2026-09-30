# -*- coding: utf-8 -*-
# 成长差分强制事件回归：
#   _ovrD/_ovrPh 记账（青训= youthLog 差值；职业= ovrEnd-round(ovr)）必须在
#   两处钩子正确写入，并按 5 档（青训快长/青训停滞/青年涨球/青年停滞/老将不退反涨）
#   强制入队；每个事件触发时的 flags 必须与事件档位自洽。
import json

import harness

IDS = ['youth_surge', 'youth_stall', 'young_surge', 'young_stall', 'vet_up']
SEEDS = 70

DRIVE_JS = """
(function(){
var IDS=__IDS__, idSet={};
for(var i=0;i<IDS.length;i++)idSet[IDS[i]]=1;
var out={careers:0,seen:{},fires:0,bad:[],err:null,renderErrs:0,deltaLedger:0,ledgerBad:0};
function resolve(p){
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } else { window.__SIMTEST.cont(); } return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); } else { window.__SIMTEST.option(p.canStay?'stay':'retire'); } return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
function lastDelta(st){
  if(st.phase==='youth'){
    var L=st.youthLog||[];
    return L.length>=2 ? L[L.length-1].ovr-L[L.length-2].ovr : null;
  }
  var S=st.seasons||[];
  if(!S.length)return null;
  var r=S[S.length-1];
  return (r.ovrEnd!=null&&r.ovr!=null) ? r.ovrEnd-Math.round(r.ovr) : null;
}
function chk(st,id,age,ph){
  var d=st.flags._ovrD, p=st.flags._ovrPh, ya=st.flags._ovrA;
  function bad(why){ out.bad.push({why:why,id:id,age:age,ovrA:ya,ovrD:d,ovrPh:p,phase:ph}); }
  if(id==='youth_surge'){ if(!(p==='y'&&ya>=14&&d>=8))bad('surge gate'); }
  else if(id==='youth_stall'){ if(!(p==='y'&&ya>=14&&d<=1))bad('stall gate'); }
  else if(id==='young_surge'){ if(!(p==='p'&&age>=16&&age<=24&&d>=6))bad('young surge gate'); }
  else if(id==='young_stall'){ if(!(p==='p'&&age>=16&&age<=24&&d<=0))bad('young stall gate'); }
  else if(id==='vet_up'){ if(!(p==='p'&&age>=33&&d>=0))bad('vet gate'); }
  // 独立核对：缓存里的 _ovrD 与日志算出来的差值一致（记账正确）
  var ld=lastDelta(st);
  if(ld!==null&&(p==='y'||p==='p')){ out.deltaLedger++; if(Math.abs(ld-d)>3)out.ledgerBad++; }
}
function career(seed){
  var st=window.__SIMTEST.start('normal',__PLAYER__,seed);
  st.talent=1.25;
  var g=0,lastType='',rep=0;
  while(g++<20000){
    if(st.phase==='youth'){
      if((st.talent||0)<1.3) st.talent=1.3;
      if(st.age>=14&&(!st.ovr||st.ovr<52)){ st.ovr=52; st.maxOvr=Math.max(st.maxOvr||0,92); }
    }
    try{ String(window.__SIMTEST.render()); }catch(e){ out.renderErrs++; }
    var p=st.pending;
    if(!p){
      if(st.phase==='summary'||st.phase==='done')break;
      try{ window.SIM.nextStep(); }catch(e){ out.err='seed='+seed+' nextStep: '+String(e).slice(0,150); return; }
      continue;
    }
    if(p.eventId&&idSet[p.eventId]){
      out.fires++; out.seen[p.eventId]=(out.seen[p.eventId]||0)+1;
      chk(st,p.eventId,st.age,st.phase);
    }
    if(p.type===lastType&&++rep>300){ out.err='seed='+seed+' stuck '+p.type; return; }
    if(p.type!==lastType){ lastType=p.type; rep=0; }
    try{ resolve(p); }catch(e){ try{ window.SIM.nextStep(); }catch(e2){ out.err='seed='+seed+' '+p.type+': '+String(e2).slice(0,150); return; } }
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; break; }
  }
  out.careers++;
}
for(var s=0;s<__SEEDS__;s++) career(2026+s);
return JSON.stringify(out);
})()
""".replace('__IDS__', json.dumps(IDS)) \
     .replace('__SEEDS__', str(SEEDS)) \
     .replace('__PLAYER__', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(DRIVE_JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['renderErrs']:
        raise harness.Fail('%d render throws during growth-event careers' % r['renderErrs'])
    if r['bad']:
        raise harness.Fail('growth event fired with mismatched state: %s' % r['bad'][:4])
    if r['ledgerBad']:
        raise harness.Fail('_ovrD ledger disagrees with logs: %d/%d' % (r['ledgerBad'], r['deltaLedger']))
    missing = [i for i in IDS if not r['seen'].get(i)]
    if missing:
        raise harness.Fail('unreachable growth events: %s (seen=%s)' % (missing, r['seen']))
    if r['deltaLedger'] < 100:
        raise harness.Fail('too few ledger samples: %d' % r['deltaLedger'])
    print('PASS growth_events (%d careers, %d fires, ledger=%d, seen=%s)'
          % (r['careers'], r['fires'], r['deltaLedger'], r['seen']))


if __name__ == '__main__':
    harness.main(run)
