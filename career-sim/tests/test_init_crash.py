"""Check if the init path (DOMContentLoaded) crashes with an old save missing playerType."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from harness import new_engine, logs, rendered_html

def test():
    mr = new_engine()
    # Start a career
    mr.eval("var _s=__SIMTEST.start('normal',__SIMTEST.origins[0],null)")
    # Simulate 3 seasons
    for _ in range(3):
        mr.eval("try{__SIMTEST.cont()}catch(e){}")

    # Get the current state and simulate an OLD save (no playerType)
    mr.eval("""
    var _st = __SIMTEST.state();
    // Remove playerType to simulate old save
    delete _st.playerType;
    var _hasPT = ('playerType' in _st);
    """)

    # Now try calling render() which invokes bO() -> bN()
    # This is the same code path as DOMContentLoaded
    result = mr.eval("""
    var _result = {};
    try {
        __SIMTEST.render();
        _result.renderOK = true;
    } catch(e) {
        _result.renderOK = false;
        _result.error = e.message;
        _result.stack = (e.stack || '').substring(0, 500);
    }
    // Check what view is visible
    var _views = ['view-intro','view-identity','view-career','view-summary'];
    var _visible = [];
    for (var i=0; i<_views.length; i++) {
        var el = window.__ELS[_views[i]];
        if (el && !el.classList.contains('hidden')) _visible.push(_views[i]);
    }
    _result.visibleViews = _visible;
    _result.careerRootLen = (window.__ELS['career-root']||{}).innerHTML ? window.__ELS['career-root'].innerHTML.length : 0;
    _result.hasPlayerType = ('playerType' in _st);
    JSON.stringify(_result);
    """)

    print("Result:", result)
    log = logs(mr)
    if log and log != '(unavailable)':
        print("Logs:", log[:500])
    print("PASS" if '"renderOK":true' in result else "FAIL")

if __name__ == '__main__':
    try:
        test()
    except Exception as e:
        print(f"ERROR: {e}")
        import traceback; traceback.print_exc()
        sys.exit(1)
