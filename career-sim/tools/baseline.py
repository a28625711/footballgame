import sys, os, subprocess
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness
from py_mini_racer import MiniRacer

head = subprocess.run(['git','-C',r'D:\football\career-sim','show','HEAD:src/data.js'],
                      capture_output=True).stdout.decode('utf-8', errors='replace')

mr = MiniRacer()
mr.eval(harness.ENV_JS)
mr.eval(head)
res = mr.eval("(function(){var D=window.DATA;var c={};(D.TEAMS||[]).forEach(function(t){c[t.league]=(c[t.league]||0)+1;});return JSON.stringify(c);})()")
print("HEAD counts:", res)

mr2 = harness.new_engine()
res2 = mr2.eval("(function(){var D=window.DATA;var c={};D.TEAMS.forEach(function(t){c[t.league]=(c[t.league]||0)+1;});return JSON.stringify(c);})()")
print("CUR counts:", res2)
