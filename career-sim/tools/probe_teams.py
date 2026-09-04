import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness

mr = harness.new_engine()

# Find how TEAMS are exposed. Probe globals.
probe = mr.eval("""
(function(){
  var out=[];
  for(var k in this){ if(/team/i.test(k)||/TEAM/i.test(k)) out.push(k); }
  return out.join(',');
})()
""")
print("Globals matching team:", probe)

# Try common accessor names
for name in ['TEAMS','_TEAMS','teams','window.TEAMS']:
    try:
        r = mr.eval(f"typeof {name}")
        print(f"typeof {name}:", r)
    except Exception as e:
        print(f"typeof {name}: ERROR {e}")
