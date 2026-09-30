# -*- coding: utf-8 -*-
# 类型专属（签名）事件回归：
#  1) 每种 playerType(0..10) 恰好命中一条签名事件（when 矩阵）；门将(11)不进此池。
#  2) 职业生涯中签名事件由 forceQ 保证至少触发一次，且触发的一定是"当前类型"的那条
#     （类型被转型事件改掉后，会改推新类型的签名事件）。渲染/结算不得抛异常。
import json

import harness

TYPESIG = ['type_finisher', 'type_playmaker', 'type_complete', 'type_pace', 'type_target',
           'type_shadow', 'type_b2b', 'type_anchor', 'type_fullback', 'type_libero',
           'type_stopper']
GROUPS = ['att', 'att', 'att', 'att', 'att', 'att', 'mid', 'mid', 'def', 'def', 'def']

# (pos, 青训期注入的天赋) -> 用于在生涯里造出不同的 playerType
COHORTS = [('ST', 1.30), ('ST', 1.10), ('CDM', 1.30), ('CB', 1.30)]
SEEDS_PER = 10
TRIALS = len(COHORTS) * SEEDS_PER

MATRIX_JS = """
(function(){
var TYPESIG=__TYPESIG__, GROUPS=__GROUPS__, E=window.EVENTS, by={};
for(var i=0;i<E.length;i++) by[E[i].id]=E[i];
var out={missing:[],bad:[]};
for(var t=0;t<TYPESIG.length;t++){
  var ev=by[TYPESIG[t]];
  if(!ev){ out.missing.push(TYPESIG[t]); continue; }
  var hits=[];
  for(var u=0;u<TYPESIG.length;u++){
    var ok=false;
    try{ ok=!!ev.when({posGroup:GROUPS[u],playerType:u,age:25,ovr:80,talent:1.2,roleRank:3}); }catch(e){ ok=false; }
    if(ok)hits.push(u);
  }
  if(hits.length!==1||hits[0]!==t) out.bad.push({id:TYPESIG[t],hits:hits});
  if(ev.stage!=='prime') out.bad.push({id:TYPESIG[t],stage:ev.stage});
  if(!(ev.options&&ev.options.length)) out.bad.push({id:TYPESIG[t],noOptions:true});
}
return JSON.stringify(out);
})()
""".replace('__TYPESIG__', json.dumps(TYPESIG)).replace('__GROUPS__', json.dumps(GROUPS))

CAREER_JS = """
(function(){
var TYPESIG=__TYPESIG__, COHORTS=__COHORTS__, SEEDS=__SEEDS__;
var E=window.EVENTS, sigIdx={};
for(var q=0;q<TYPESIG.length;q++) sigIdx[TYPESIG[q]]=q;
var out={careers:0,primeCareers:0,sigCareers:0,sigMax:0,seen:{},mismatch:[],err:null,renderErrs:0};
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
function career(pos,inj,seed){
  var P={'name':'p','origin':'sd','pos':pos,'nation':'cn','talent':inj,'number':9,'foot':'r'};
  var st=window.__SIMTEST.start('normal',P,seed);
  st.talent=inj;
  var g=0,nSig=0,lastType='',rep=0,maxAge=0;
  while(g++<20000){
    if(st.phase==='youth'){
      if((st.talent||0)<inj) st.talent=inj;
      if(st.age>=14&&(!st.ovr||st.ovr<52)){ st.ovr=52; st.maxOvr=Math.max(st.maxOvr||0,92); }
    }
    if(st.age>maxAge)maxAge=st.age;
    try{ String(window.__SIMTEST.render()); }catch(e){ out.renderErrs++; }
    var p=st.pending;
    if(!p){
      if(st.phase==='summary'||st.phase==='done')break;
      try{ window.SIM.nextStep(); }catch(e){ out.err='seed='+seed+' nextStep: '+String(e).slice(0,150); return; }
      continue;
    }
    if(p.eventId&&sigIdx[p.eventId]!==undefined){
      nSig++; out.seen[p.eventId]=(out.seen[p.eventId]||0)+1;
      if(TYPESIG[st.playerType]!==p.eventId)
        out.mismatch.push({seed:seed,id:p.eventId,pt:st.playerType,age:st.age,pos:st.pos});
    }
    if(p.type===lastType&&++rep>300){ out.err='seed='+seed+' stuck '+p.type; return; }
    if(p.type!==lastType){ lastType=p.type; rep=0; }
    try{ resolve(p); }catch(e){ try{ window.SIM.nextStep(); }catch(e2){ out.err='seed='+seed+' '+p.type+': '+String(e2).slice(0,150); return; } }
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; break; }
  }
  out.careers++;
  if(nSig>out.sigMax)out.sigMax=nSig;
  if(maxAge>=24){ out.primeCareers++; if(nSig>0)out.sigCareers++; }
}
for(var c=0;c<COHORTS.length;c++)
  for(var s=0;s<SEEDS;s++) career(COHORTS[c][0],COHORTS[c][1],400+c*100+s);
return JSON.stringify(out);
})()
""".replace('__TYPESIG__', json.dumps(TYPESIG)) \
     .replace('__COHORTS__', json.dumps(COHORTS)) \
     .replace('__SEEDS__', str(SEEDS_PER))


def run():
    mr = harness.new_engine()
    m = json.loads(mr.eval(MATRIX_JS))
    harness.check(not m['missing'], 'signature events missing from build: %s' % m['missing'])
    harness.check(not m['bad'], 'signature events mis-gated / bad shape: %s' % m['bad'])

    mr2 = harness.new_engine()
    r = json.loads(mr2.eval(CAREER_JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['renderErrs']:
        raise harness.Fail('%d render throws during type-event careers' % r['renderErrs'])
    if r['mismatch']:
        raise harness.Fail('signature event fired for a different type: %s' % r['mismatch'][:4])
    need = int(r['primeCareers'] * 0.85)
    if r['sigCareers'] < need:
        raise harness.Fail('signature event missing too often: %d/%d prime careers (<%d)'
                           % (r['sigCareers'], r['primeCareers'], need))
    if len(r['seen']) < 3:
        raise harness.Fail('too few types exercised across cohorts: %s' % r['seen'])
    print('PASS type_events (%d/%d prime careers saw one, max %d/career, ids=%s)'
          % (r['sigCareers'], r['primeCareers'], r['sigMax'], r['seen']))


if __name__ == '__main__':
    harness.main(run)
