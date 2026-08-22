# Regression: wealth/salary use the same status-row (st-cell) architecture as
# 队内地位/合同; youth players show 无合同 instead of an empty cell; negative
# balance renders as 家里的欠债 with the neg highlight.
import json

import harness


def render_state(mr, mutate_js):
    js = """
(function(){
var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},700);
""" + mutate_js + """
try{ String(window.__SIMTEST.render()); }
catch(e){ return JSON.stringify({fail:'render threw', msg:String(e).slice(0,150)}); }
return JSON.stringify({ok:true});
})()
"""
    r = json.loads(mr.eval(js))
    if not r.get('ok'):
        raise harness.Fail(r.get('fail', 'unknown'))
    return harness.rendered_html(mr)


def run():
    mr = harness.new_engine()

    youth_html = render_state(mr, """
au.age=15; au.ovr=55; au.maxOvr=55; au.money=100; au.phase='youth';
au.youthTeamId='cn-sh'; au.roleAdjust=0; au.guanxi=50; au.fame=40; au.clean=60;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
""")
    for token in ['个人财富', '无合同', '<div class="status-row">', 'st-cell']:
        if token not in youth_html:
            raise harness.Fail('youth view missing %r' % token)
    if '<div class="money-row"><span></span>' in youth_html:
        raise harness.Fail('legacy empty money-row still rendered')

    career_html = render_state(mr, """
au.age=25; au.ovr=84; au.maxOvr=88; au.money=-50; au.phase='career';
au.teamId='cn-sh'; au.contractLeft=3; au.seasonWage=120; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50; au.fame=60; au.clean=70; au.role='starter';
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
""")
    for token in ['家里的欠债', 'st-v neg', '当前薪资', '/ 赛季']:
        if token not in career_html:
            raise harness.Fail('career view missing %r' % token)
    print('PASS status_row (youth 无合同, career salary+debt styling)')


if __name__ == '__main__':
    harness.main(run)
