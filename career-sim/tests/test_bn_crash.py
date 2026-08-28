"""Test bN() crash path: start career, render, check if career-root has content."""
import sys, os
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine, logs

mr = new_engine()

# Start a career and simulate a few seasons
mr.eval("__SIMTEST.start('normal',__SIMTEST.origins[0],null)")
mr.eval("try{__SIMTEST.cont()}catch(e){}")
mr.eval("try{__SIMTEST.cont()}catch(e){}")

# Now try render (calls bO -> bN)
try:
    mr.eval("__SIMTEST.render()")
    print("render() OK")
except Exception as e:
    print("render() FAILED:", str(e)[:300])

# Check career-root
try:
    cr_len = mr.eval("window.__ELS['career-root'] ? window.__ELS['career-root'].innerHTML.length : -1")
    print("career-root innerHTML length:", cr_len)
except Exception as e:
    print("career-root check failed:", str(e)[:200])

# Check which view is visible
for vid in ['view-intro', 'view-identity', 'view-career', 'view-summary']:
    try:
        hidden = mr.eval(f"window.__ELS['{vid}'] ? window.__ELS['{vid}'].classList.contains('hidden') : 'no-el'")
        print(f"  {vid}: hidden={hidden}")
    except:
        pass

log = logs(mr)
if log and log != '(unavailable)':
    print("Console logs:", log[:500])
