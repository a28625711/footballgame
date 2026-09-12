# -*- coding: utf-8 -*-
"""生涯页数据卡折叠回归：
- 默认展开：出场/进球/助攻(stat-row) + 关系/清白/名气(meters) 在 队内地位/合同 之上，
  队内地位/合同 在 个人财富/当前薪资 之上
- 点 stat-collapse 收起：只显示两栏纯文字(stat-mini)，stat-row/meters 隐藏，
  队内地位/合同 与 个人财富/当前薪资 仍在
- 再点一次恢复展开
"""
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


CLICK_STAT = """
(function(){
var appEl=window.__ELS['app'];
var hs=appEl.__ev&&appEl.__ev['click'];
if(!hs||!hs.length)return 'NO_CLICK_HANDLER';
hs[0]({target:{closest:function(sel){
  if(sel==='[data-tact]')return {getAttribute:function(){return 'tglstat';}};
  return null;
}}});
return 'ok';
})()
"""

CAREER = """
au.age=25; au.ovr=84; au.maxOvr=88; au.money=100; au.phase='career';
au.teamId='cn-sh'; au.contractLeft=3; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50.37; au.fame=60.19; au.clean=70.82; au.role='starter';
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
"""


def order_of(html, tokens):
    pos = []
    for t in tokens:
        i = html.find(t)
        if i < 0:
            raise harness.Fail('missing %r' % t)
        pos.append(i)
    return pos


def run():
    mr = harness.new_engine()
    # 触发 DOMContentLoaded，让 game.js 绑定 click 代理
    mr.eval("(window.__DOCEV&&window.__DOCEV['DOMContentLoaded']||[]).forEach(function(f){try{f();}catch(e){}})")

    expanded = render_state(mr, CAREER)
    # expanded must contain stat-row + meters + both status rows
    for t in ['stat-row', 'stat-collapse', 'meters', 'stat-caret', '队内地位', '合同', '个人财富', '当前薪资']:
        if t not in expanded:
            raise harness.Fail('expanded view missing %r' % t)
    if 'stat-mini' in expanded:
        raise harness.Fail('expanded view should not contain stat-mini')
    # vertical order: stat-row < meters < 队内地位 < 个人财富
    p = order_of(expanded, ['class="stat-row"', 'class="meters"', '队内地位', '个人财富'])
    if not (p[0] < p[1] < p[2] < p[3]):
        raise harness.Fail('expanded order wrong: %r' % p)
    # 关系/清白/名气 必须输出整数（模拟浮点值 50.37/70.82/60.19）
    for bad in ['50.37', '70.82', '60.19']:
        if bad in expanded:
            raise harness.Fail('expanded shows float %r' % bad)
    for good in ['>50<', '>71<', '>60<']:
        if good not in expanded:
            raise harness.Fail('expanded missing rounded %r' % good)

    # collapse
    r = mr.eval(CLICK_STAT)
    if r != 'ok':
        raise harness.Fail('click handler: %s' % r)
    collapsed = harness.rendered_html(mr)
    for t in ['stat-mini', 'stat-mini-col', 'stat-mini-i', '队内地位', '个人财富', '当前薪资']:
        if t not in collapsed:
            raise harness.Fail('collapsed view missing %r' % t)
    if 'class="stat-row"' in collapsed or 'class="meters"' in collapsed:
        raise harness.Fail('collapsed view still shows stat-row/meters')
    # two columns: stats on the left, attrs on the right
    if '>出场<' not in collapsed or '>进球<' not in collapsed or '>助攻<' not in collapsed:
        raise harness.Fail('collapsed view missing stat labels')
    if '>关系<' not in collapsed or '>清白<' not in collapsed or '>名气<' not in collapsed:
        raise harness.Fail('collapsed view missing attr labels')
    for bad in ['50.37', '70.82', '60.19']:
        if bad in collapsed:
            raise harness.Fail('collapsed shows float %r' % bad)
    # still ordered: mini < 队内地位 < 个人财富
    p2 = order_of(collapsed, ['class="stat-mini"', '队内地位', '个人财富'])
    if not (p2[0] < p2[1] < p2[2]):
        raise harness.Fail('collapsed order wrong: %r' % p2)

    # expand again
    mr.eval(CLICK_STAT)
    re_expanded = harness.rendered_html(mr)
    if 'class="stat-row"' not in re_expanded or 'stat-mini' in re_expanded:
        raise harness.Fail('re-expand failed')

    print('PASS stat_collapse (默认展开顺序 + 收起两栏 + 再展开)')


if __name__ == '__main__':
    harness.main(run)
