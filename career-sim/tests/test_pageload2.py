"""Simulate real page load: start career → advance to pro → serialize →
re-attach via au → call bO() → check career-root has content."""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine, logs

mr = new_engine()

js = r"""
(function(){
  var out={};
  try {
    /* 1. Start a career, advance to at least 1 pro season */
    window.__SIMTEST.start('normal',{name:'测试员',number:10,foot:'r',pos:'ST',
      origin:{id:'sd',name:'山东',desc:'desc',ovr:2,money:12,guanxi:12,c1:'#F26522'}},null);
    var st=window.__SIMTEST.state();
    for(var i=0;i<200;i++){
      var p=st.pending;
      if(!p) break;
      if(p.type==='youth_path'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='academy'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='random'){ if(p.result) window.__SIMTEST.cont(); else window.__SIMTEST.option(0); continue; }
      if(p.type==='report'){ window.__SIMTEST.cont(); continue; }
      if(p.type==='bigmatch'){ if(!p.result) window.__SIMTEST.option('push'); window.__SIMTEST.cont(); continue; }
      if(p.type==='staff'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='transfer'){
        if(p.offers && p.offers.length) window.__SIMTEST.option('0');
        else window.__SIMTEST.option(p.canStay?'stay':'retire');
        continue;
      }
      window.__SIMTEST.cont();
    }
    out.phase=st.phase; out.age=st.age;
    out.seasons=st.seasons?st.seasons.length:0;
    out.hasPlayerType='playerType' in st;
    out.playerType=st.playerType;

    /* 2. Serialize state */
    var saveStr=JSON.stringify(st);
    var save=JSON.parse(saveStr);

    /* 3. Simulate page-load: clear current state, then re-start with the save data
          The key is that __SIMTEST.render() calls bO(), which reads `au` (the game.deob.js var).
          __SIMTEST.start() sets `au` via the start function. So we start fresh,
          then immediately call render() to test career rendering. */
    window.__SIMTEST.start('normal',{name:save.name,number:save.number,foot:'r',
      pos:save.pos,origin:{id:'sd',name:'山东',desc:'desc',ovr:2,money:12,guanxi:12,c1:'#F26522'}},null);

    /* Now the fresh state won't have the same data as the saved state.
       We need to attach the saved state to sim.deob.js and also set au.
       The best approach: call render() which calls bO().
       bO() checks au. au was set by start(). So au = fresh state (youth phase).
       That means bO() -> bN() will render a youth-phase career view. */

    /* Let's test this: a youth-phase career render */
    out.renderOK_youth=null;
    try {
      window.__SIMTEST.render();
      out.renderOK_youth=true;
    } catch(e) {
      out.renderOK_youth=false;
      out.renderError_youth=e.message;
      out.renderStack_youth=(e.stack||'').substring(0,500);
    }
    var cr=window.__ELS['career-root'];
    out.careerRootLen_youth=cr?cr.innerHTML.length:0;

    /* 4. Now simulate page-load with old save (no playerType) that has seasons.
          We need au to point to the saved state. The only way is to use
          __SIMTEST.start() which sets au, then manually copy properties. */
    /* Actually, let's use a trick: start a career, advance it, then
       serialize → parse → attach to sim → call render.
       But au in game.deob.js is set by start(), not by attach().
       So after start(), au points to the fresh state.
       After attach(), a2 points to the old save.
       render() calls bO() which uses au, not a2. */

    /* The real bug: on page load, the DOMContentLoaded handler does:
         au = bW  (the loaded save)
         a6["attach"](au)  (sets a2 = au)
         bO()  (uses au)
       So au and a2 point to the SAME object.
       In our test, start() creates a new object for au.
       We need au to be the saved state with seasons. */

    /* Better approach: start a career with same seed, advance it,
       then call render() to test the career view. */
    window.__SIMTEST.start('normal',{name:'老张',number:7,foot:'r',pos:'CM',
      origin:{id:'sd',name:'山东',desc:'desc',ovr:2,money:12,guanxi:12,c1:'#F26522'}},'testseed');
    var st2=window.__SIMTEST.state();
    for(var i=0;i<200;i++){
      var p=st2.pending;
      if(!p) break;
      if(p.type==='youth_path'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='academy'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='random'){ if(p.result) window.__SIMTEST.cont(); else window.__SIMTEST.option(0); continue; }
      if(p.type==='report'){ window.__SIMTEST.cont(); continue; }
      if(p.type==='bigmatch'){ if(!p.result) window.__SIMTEST.option('push'); window.__SIMTEST.cont(); continue; }
      if(p.type==='staff'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='transfer'){
        if(p.offers && p.offers.length) window.__SIMTEST.option('0');
        else window.__SIMTEST.option(p.canStay?'stay':'retire');
        continue;
      }
      window.__SIMTEST.cont();
    }
    out.phase2=st2.phase; out.age2=st2.age;
    out.seasons2=st2.seasons?st2.seasons.length:0;
    out.hasPlayerType2='playerType' in st2;
    out.playerType2=st2.playerType;

    /* au now points to st2 (the advanced career state).
       Call render() to test career rendering with real data. */
    out.renderOK_pro=null;
    try {
      window.__SIMTEST.render();
      out.renderOK_pro=true;
    } catch(e) {
      out.renderOK_pro=false;
      out.renderError_pro=e.message;
      out.renderStack_pro=(e.stack||'').substring(0,500);
    }
    var cr2=window.__ELS['career-root'];
    out.careerRootLen_pro=cr2?cr2.innerHTML.length:0;
    out.careerRootSnippet_pro=cr2?cr2.innerHTML.substring(0,300):'N/A';

    /* 5. Now simulate old save without playerType:
          Delete playerType from state, then render */
    delete st2.playerType;
    out.afterDelete_hasPT='playerType' in st2;
    out.renderOK_old=null;
    try {
      window.__SIMTEST.render();
      out.renderOK_old=true;
    } catch(e) {
      out.renderOK_old=false;
      out.renderError_old=e.message;
      out.renderStack_old=(e.stack||'').substring(0,500);
    }
    var cr3=window.__ELS['career-root'];
    out.careerRootLen_old=cr3?cr3.innerHTML.length:0;

    /* 6. Test summary path: set phase to summary and render */
    st2.phase='summary';
    st2.ending='retire_old';
    st2.endReason='年龄到限';
    st2.endingTitle='体面退役';
    st2.endingsAll=['retire_old'];
    st2.archived=false;
    st2.gen=1;
    st2.maxOvr=st2.ovr;
    st2.careerEarnings=0;
    st2.clubsPlayed=[];
    st2.banned=false;
    st2.youthCut=0;
    if(!st2.awards) st2.awards=[];
    if(!st2.natStats) st2.natStats={};
    if(!st2.natRuns) st2.natRuns=[];
    out.renderOK_summary=null;
    try {
      window.__SIMTEST.render();
      out.renderOK_summary=true;
    } catch(e) {
      out.renderOK_summary=false;
      out.renderError_summary=e.message;
      out.renderStack_summary=(e.stack||'').substring(0,500);
    }
    var sa=window.__ELS['summary-area'];
    out.summaryAreaLen=sa?sa.innerHTML.length:0;

  } catch(e) {
    out.error=e.message;
    out.stack=(e.stack||'').substring(0,500);
  }
  return JSON.stringify(out);
})()
"""

result = mr.eval(js)
print("Result:", result)
log = logs(mr)
if log and log != '(unavailable)':
    print("Logs:", log[:800])
