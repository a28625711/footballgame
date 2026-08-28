"""Quick check: does game.deob.js load and set __SIMTEST?"""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine, logs

mr = new_engine()
result = mr.eval('typeof window.__SIMTEST')
print('__SIMTEST type:', result)
if result != 'undefined':
    keys = mr.eval('Object.keys(window.__SIMTEST).join(",")')
    print('keys:', keys)
