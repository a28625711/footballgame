"""Verify playerType is correct from game start (before academy)."""
import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine

mr = new_engine()

js = r"""
(function(){
  var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
  var results=[];
  var pos_list=['ST','RW','LW','CM','CDM','CAM','CB','LB','RB','GK'];
  for(var i=0;i<pos_list.length;i++){
    window.__SIMTEST.start('normal',{name:'T'+i,number:10,foot:'r',pos:pos_list[i],
      origin:{id:'sd',name:'S',desc:'d',ovr:2,money:12,guanxi:12,c1:'#F26'}},'init_type_'+i);
    var st=window.__SIMTEST.state();
    results.push({pos:pos_list[i],type:TN[st.playerType],pt:st.playerType});
  }
  return JSON.stringify(results);
})()
"""

result = mr.eval(js)
d = json.loads(result)
print("Initial playerType (before academy):")
ok = True
for r in d:
    gk = r['pt'] == 11
    is_gk_pos = r['pos'] == 'GK'
    flag = "BAD!" if (gk and not is_gk_pos) or (not gk and is_gk_pos) else "OK"
    if flag == "BAD!": ok = False
    print(f"  {r['pos']:4s} -> {r['type']:<6s} (pt={r['pt']}) {flag}")

print(f"\nAll correct: {ok}")
