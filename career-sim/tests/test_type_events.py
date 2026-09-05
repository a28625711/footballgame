"""Test: youth type shift events trigger and direction safety."""
import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine

mr = new_engine()

js = r"""
(function(){
  var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
  var results={shifts:[],injury_shifts:[],vet_shifts:[]};
  for(var i=0;i<30;i++){
    window.__SIMTEST.start('normal',{name:'T'+i,number:10,foot:'r',pos:['ST','CM','CB'][i%3],
      origin:{id:'sd',name:'S',desc:'d',ovr:2,money:12,guanxi:12,c1:'#F26'}},'type_evt_'+i);
    var st=window.__SIMTEST.state();
    var firstType=st.playerType;
    for(var j=0;j<400;j++){
      var p=st.pending;
      if(!p)break;
      if(st.phase==='summary')break;
      if(p.type==='youth_path'){window.__SIMTEST.option(0);continue;}
      if(p.type==='academy'){if(p.canStayYouth)window.__SIMTEST.option('youth');else window.__SIMTEST.option(0);continue;}
      if(p.type==='report'){window.__SIMTEST.cont();continue;}
      if(p.type==='random'){
        if(p.result) window.__SIMTEST.cont();
        else window.__SIMTEST.option(0);
        continue;
      }
      if(p.type==='bigmatch'){window.__SIMTEST.option('hold');if(p.result)window.__SIMTEST.cont();continue;}
      if(p.type==='staff'){window.__SIMTEST.option(0);continue;}
      if(p.type==='event'){
        var opts=p.options||[];
        var chosen=false;
        for(var k=0;k<opts.length;k++){
          var lbl=opts[k].label||'';
          if(lbl.indexOf('试试')>=0||lbl.indexOf('研究')>=0||lbl.indexOf('大胆')>=0||lbl.indexOf('接受')>=0||lbl.indexOf('主动')>=0){
            window.__SIMTEST.option(k);
            chosen=true;break;
          }
        }
        if(!chosen) window.__SIMTEST.option(0);
        continue;
      }
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
    var lastType=st.playerType;
    if(firstType!==lastType){
      var log=st.eventLog||[];
      var evName='';
      for(var e=0;e<log.length;e++){
        if(log[e].title&&log[e].title.indexOf('觉醒')>=0){evName='youth_shift';break;}
        if(log[e].title&&log[e].title.indexOf('发现')>=0){evName='youth_evolve';break;}
        if(log[e].title&&log[e].title.indexOf('机会')>=0){evName='youth_late';break;}
        if(log[e].title&&log[e].title.indexOf('抉择')>=0){evName='injury_shift';break;}
        if(log[e].title&&log[e].title.indexOf('转型')>=0){evName='vet_shift';break;}
      }
      results.shifts.push({age:st.age,from:TN[firstType],to:TN[lastType],event:evName});
    }
  }
  return JSON.stringify(results);
})()
"""

result = mr.eval(js)
d = json.loads(result)
print(f"Type transitions observed: {len(d['shifts'])}")
for s in d['shifts']:
    print(f"  Age {s['age']}: {s['from']} -> {s['to']} ({s['event']})")

# Safety check: no cross-position transitions.
# 类型组池与引擎一致（位置决定组，全能/速度型横跨多组）——
# 转型合法当且仅当存在某个组同时包含前后两个类型
att_types = set([0,1,2,3,4,5])  # 前场：射手,组织核心,全能,速度型,支点,影锋
mid_types = set([1,2,5,6,7])    # 中场：组织核心,全能,影锋,B2B,铁腰
def_types = set([2,3,8,9,10])   # 后场：全能,速度型,边后卫,自由人,铁卫

TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将']
name_to_idx={n:i for i,n in enumerate(TN)}

errors=[]
for s in d['shifts']:
    fi=name_to_idx[s['from']]
    ti=name_to_idx[s['to']]
    if not any(fi in g and ti in g for g in (att_types,mid_types,def_types)):
        errors.append(f"BAD: {s['from']}->{s['to']}")

if errors:
    print("\n!!! CROSS-POSITION TRANSITIONS FOUND:")
    for e in errors: print(f"  {e}")
else:
    print("\nAll transitions are within position group. SAFE.")
