"""Test: simulate a full career → retirement → bO() summary render."""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine, logs

mr = new_engine()

js = r"""
(function(){
  var out={};
  try {
    window.__SIMTEST.start('normal',{name:'退休测试',number:10,foot:'r',pos:'ST',
      origin:{id:'sd',name:'山东',desc:'desc',ovr:2,money:12,guanxi:12,c1:'#F26522'}},'retire_test');
    var st=window.__SIMTEST.state();
    /* Advance until retirement or 500 steps */
    for(var i=0;i<500;i++){
      var p=st.pending;
      if(!p) break;
      if(st.phase==='summary') break;
      if(p.type==='youth_path'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='academy'){
        if(p.canStayYouth) window.__SIMTEST.option('youth');
        else window.__SIMTEST.option(0);
        continue;
      }
      if(p.type==='random'){ if(p.result) window.__SIMTEST.cont(); else window.__SIMTEST.option(0); continue; }
      if(p.type==='report'){ window.__SIMTEST.cont(); continue; }
      if(p.type==='bigmatch'){ window.__SIMTEST.option('hold'); if(p.result) window.__SIMTEST.cont(); continue; }
      if(p.type==='staff'){ window.__SIMTEST.option(0); continue; }
      if(p.type==='transfer'){
        if(p.canRetire && st.age>=35){ window.__SIMTEST.option('retire'); continue; }
        if(p.canStay) window.__SIMTEST.option('stay');
        else if(p.offers && p.offers.length) window.__SIMTEST.option('0');
        else window.__SIMTEST.option('retire');
        continue;
      }
      window.__SIMTEST.cont();
    }
    out.finalPhase=st.phase;
    out.finalAge=st.age;
    out.seasons=st.seasons?st.seasons.length:0;
    out.hasPlayerType='playerType' in st;
    out.ending=st.ending;
    out.endReason=st.endReason;

    if(st.phase==='summary'){
      /* Now test bO() summary path */
      try{
        window.__SIMTEST.render();
        out.renderOK=true;
      }catch(e){
        out.renderOK=false;
        out.error=e.message;
        out.stack=(e.stack||'').substring(0,600);
      }
      var sa=window.__ELS['summary-area'];
      out.summaryLen=sa?sa.innerHTML.length:0;
      out.summarySnippet=sa?sa.innerHTML.substring(0,300):'N/A';
    }else{
      out.note='Did not reach summary phase';
      /* Still test career render */
      try{
        window.__SIMTEST.render();
        out.renderOK=true;
      }catch(e){
        out.renderOK=false;
        out.error=e.message;
      }
      var cr=window.__ELS['career-root'];
      out.careerLen=cr?cr.innerHTML.length:0;
    }
  }catch(e){
    out.error=e.message;
    out.stack=(e.stack||'').substring(0,600);
  }
  return JSON.stringify(out);
})()
"""

result = mr.eval(js)
print("Result:", result)
log = logs(mr)
if log and log != '(unavailable)':
    print("Logs:", log[:800])
