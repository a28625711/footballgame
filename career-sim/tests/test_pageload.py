"""Simulate page-load DOMContentLoaded path: load save -> bO() -> check crash."""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine, logs

mr = new_engine()

# Start a full career to get a save, then serialize it
js = r"""
(function(){
  var out={};
  try {
    // Start a career
    window.SIM.newState('normal',{name:'test',number:9,foot:'r',pos:'ST',origin:{id:'sd',name:'山东',desc:'desc',ovr:2,money:12,guanxi:12,c1:'#F26522'}},null);
    var st=window.SIM.state();
    
    // Run youth academy
    var p=st.pending;
    if(p && p.type==='youth_path' && p.offers && p.offers.length){
      window.SIM.choose(0);
      p=st.pending;
    }
    // Resolve any pending events until we have seasons
    for(var i=0;i<30;i++){
      p=st.pending;
      if(!p) break;
      if(p.type==='random'){ if(p.result) window.SIM.cont(); else window.SIM.option(0); continue; }
      if(p.type==='report'){ window.SIM.cont(); continue; }
      if(p.type==='academy'){ window.SIM.option(0); continue; }
      if(p.type==='youth_path'){ window.SIM.option(0); continue; }
      if(p.type==='bigmatch'){ if(!p.result) window.SIM.choose('push'); else window.SIM.cont(); continue; }
      if(p.type==='staff'){ window.SIM.option(0); continue; }
      if(p.type==='transfer'){
        if(p.offers && p.offers.length) window.SIM.option('0');
        else window.SIM.option(p.canStay?'stay':'retire');
        continue;
      }
      window.SIM.cont();
    }
    
    out.seasons = st.seasons ? st.seasons.length : 0;
    out.phase = st.phase;
    out.age = st.age;
    out.hasPlayerType = 'playerType' in st;
    out.playerType = st.playerType;
    
    // Now serialize the state as a "save"
    var saveStr = JSON.stringify(st);
    out.saveLen = saveStr.length;
    
    // Simulate old save: remove playerType
    var oldSave = JSON.parse(saveStr);
    delete oldSave.playerType;
    out.oldSaveHasPT = 'playerType' in oldSave;
    
    // Now simulate page load: clear state, load old save, call render
    window.SIM.attach(oldSave);
    var st2 = window.SIM.state();
    out.afterAttach_hasPT = 'playerType' in st2;
    
    // Try render (bO -> bN)
    try {
      // The __SIMTEST.render calls bO
      window.__SIMTEST.render();
      out.renderOK = true;
    } catch(e) {
      out.renderOK = false;
      out.renderError = e.message;
      out.renderStack = (e.stack||'').substring(0,300);
    }
    
    // Check career-root
    var cr = window.__ELS['career-root'];
    out.careerRootLen = cr ? cr.innerHTML.length : -1;
    out.careerRootSnippet = cr ? cr.innerHTML.substring(0,100) : 'N/A';
    
    // Check which view is visible
    var views = ['view-intro','view-identity','view-career','view-summary'];
    out.visibleViews = [];
    for(var vi=0;vi<views.length;vi++){
      var el = window.__ELS[views[vi]];
      if(el && !el.classList.contains('hidden')) out.visibleViews.push(views[vi]);
    }
    
  } catch(e) {
    out.error = e.message;
    out.stack = (e.stack||'').substring(0,300);
  }
  return JSON.stringify(out);
})()
"""

result = mr.eval(js)
print("Result:", result)
log = logs(mr)
if log and log != '(unavailable)':
    print("Logs:", log[:500])
