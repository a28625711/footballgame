"""Test: check calcPlayerType distribution across positions."""
import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine

mr = new_engine()

js = r"""
(function(){
  var results={};
  var positions=['ST','RW','LW','CM','CDM','CAM','CB','LB','RB','GK'];
  var counts=50;
  for(var pi=0;pi<positions.length;pi++){
    var pos=positions[pi];
    var types={};
    for(var i=0;i<counts;i++){
      window.__SIMTEST.start('normal',{name:'T'+i,number:10,foot:'r',pos:pos,
        origin:{id:'sd',name:'S',desc:'d',ovr:2,money:12,guanxi:12,c1:'#F26'}},'ptc_'+pos+'_'+i);
      var st=window.__SIMTEST.state();
      for(var j=0;j<10;j++){
        var p=st.pending;if(!p)break;
        if(p.type==='youth_path'){window.__SIMTEST.option(0);continue;}
        if(p.type==='academy'){if(p.canStayYouth)window.__SIMTEST.option('youth');else window.__SIMTEST.option(0);continue;}
        break;
      }
      st=window.__SIMTEST.state();
      var t=st.playerType!=null?st.playerType:11;
      types[t]=(types[t]||0)+1;
    }
    results[pos]=types;
  }
  return JSON.stringify(results);
})()
"""

result = mr.eval(js)
d = json.loads(result)
names = ['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将']
print('calcPlayerType distribution (50 samples per position):')
print()
for pos, types in d.items():
    parts = []
    for k in sorted(types.keys(), key=int):
        parts.append(f"{names[int(k)]}:{types[k]}")
    print(f"  {pos:4s}: {', '.join(parts)}")
