# -*- coding: utf-8 -*-
"""青训早恋链：国内/国外两个起点事件 + 成年后两个后续事件，含 when 差分、链调度、成年分支。"""
import json
import harness

JS = r"""
(function(){
var out={err:null,ids:[],chk:{}};
try{
  var evs={}; window.EVENTS.forEach(function(e){if(/crush|first_love/.test(String(e['id'])))evs[e['id']]=e;});
  out.ids=Object.keys(evs).sort();
  function ctx(o){
    var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
    au.phase=o.phase||'youth'; au.youthTeamId=o.yt||'cn-sh'; au.age=o.age||15;
    au.flags=au.flags||{};
    if(o._crush!=null)au.flags._crush=o._crush;
    if(o.partner)au.life.partner={label:o.partner,since:12};
    return window.SIM.snap();
  }
  function w(id,o){var e=evs[id];return e?!!e['when'](ctx(o)):null;}
  var c=out.chk;
  c.cn_home     = w('youth_crush_cn',{yt:'cn-sh'})===true;
  c.cn_abroad   = w('youth_crush_cn',{yt:'rma'})===false;
  c.ab_home     = w('youth_crush_abroad',{yt:'cn-sh'})===false;
  c.ab_abroad   = w('youth_crush_abroad',{yt:'rma'})===true;
  c.cn_used     = w('youth_crush_cn',{yt:'cn-sh',_crush:1})===false;
  c.fl_cn_ok    = w('first_love_cn',{phase:'career',age:22,_crush:1})===true;
  c.fl_cn_no    = w('first_love_cn',{phase:'career',age:22,_crush:2})===false;
  c.fl_cn_young = w('first_love_cn',{phase:'career',age:19,_crush:1})===false;
  c.fl_ab_ok    = w('first_love_abroad',{phase:'career',age:22,_crush:2})===true;

  /* 链：提交 youth_crush_cn 后排入 first_love_cn(due=age+7) */
  var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
  au.phase='youth'; au.youthTeamId='cn-sh'; au.age=15; au.flags={};
  au.pending={type:'random',eventId:'youth_crush_cn'};
  window.SIM.commitEvent({'text':'x'});
  var fl=au.forceLater||[],hit=null;
  for(var i=0;i<fl.length;i++)if(fl[i].id==='first_love_cn')hit=fl[i];
  c.chain_sched = !!hit && hit.due===22;

  /* 成年后续分支：单身设伴侣，有伴侣不覆盖 */
  var e2=evs.first_love_cn;
  var rSingle=e2['options'][0]['apply'](ctx({phase:'career',age:22,_crush:1}),0,0);
  var rTaken =e2['options'][0]['apply'](ctx({phase:'career',age:22,_crush:1,partner:'那位牙医'}),0,0);
  c.branch_single = rSingle['partner']==='重逢的初恋';
  c.branch_taken  = !rTaken['partner'];
}catch(e){ out.err=String(e).slice(0,250); }
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)

WANT_IDS = ['first_love_abroad', 'first_love_cn', 'youth_crush_abroad', 'youth_crush_cn']


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['ids'] != WANT_IDS:
        raise harness.Fail('crush events missing/misnamed: %r' % r['ids'])
    for k, v in r['chk'].items():
        if not v:
            raise harness.Fail('check failed: %s' % k)
    print('PASS youth_crush (4 events, %s)' % ' '.join(sorted(r['chk'])))


if __name__ == '__main__':
    harness.main(run)
