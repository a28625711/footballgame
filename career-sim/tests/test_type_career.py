"""Test: full career OVR + type snapshot."""
import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine

mr = new_engine()

js = r"""
(function(){
  window.__SIMTEST.start('normal',{name:'Career',number:10,foot:'r',pos:'ST',
    origin:{id:'sd',name:'S',desc:'d',ovr:2,money:12,guanxi:12,c1:'#F26'}},'career_snap');
  var st=window.__SIMTEST.state(),snaps=[];
  for(var i=0;i<400;i++){
    var p=st.pending;if(!p)break;if(st.phase==='summary')break;
    if(p.type==='youth_path'){window.__SIMTEST.option(0);continue;}
    if(p.type==='academy'){if(p.canStayYouth)window.__SIMTEST.option('youth');else window.__SIMTEST.option(0);continue;}
    if(p.type==='report'){window.__SIMTEST.cont();continue;}
    if(p.type==='random'){if(p.result)window.__SIMTEST.cont();else window.__SIMTEST.option(0);continue;}
    if(p.type==='bigmatch'){window.__SIMTEST.option('hold');if(p.result)window.__SIMTEST.cont();continue;}
    if(p.type==='staff'){window.__SIMTEST.option(0);continue;}
    if(p.type==='transfer'){
      if(p.canRetire&&st.age>=35){window.__SIMTEST.option('retire');continue;}
      if(p.canStay)window.__SIMTEST.option('stay');
      else if(p.offers&&p.offers.length)window.__SIMTEST.option('0');
      else window.__SIMTEST.option('retire');
      continue;
    }
    window.__SIMTEST.cont();
  }
  st=window.__SIMTEST.state();
  if(st.seasons)for(var j=0;j<st.seasons.length;j++){
    var s=st.seasons[j];
    snaps.push({age:s.age,ovr:s.ovrEnd,pt:s._type,note:s.note||''});
  }
  return JSON.stringify({ending:st.ending,endReason:st.endReason,snaps:snaps});
})()
"""

result = mr.eval(js)
d = json.loads(result)
names = ['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将']
print(f"Ending: {d['ending']} ({d['endReason']})")
print(f"{'Age':>3s}  {'OVR':>3s}  {'Type':<6s}  Note")
print('---  ---  ------  ----')
for s in d['snaps']:
    tn = names[s['pt']] if s['pt'] is not None and s['pt'] < len(names) else '?'
    note = f"  ← {s['note']}" if s['note'] else ''
    print(f"{s['age']:3d}  {s['ovr']:3.0f}  {tn:<6s}{note}")
