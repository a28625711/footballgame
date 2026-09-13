# -*- coding: utf-8 -*-
"""报名试训事件回归（方案 A）：
- 点报名扣 18 万、每年限一次、挂 __trial__ 的 random pending
- pendingEvent() 产出内联事件：N 张青训营卡片(带 team) + 「不去了」
- 选营后轮盘判定：通过 → 换青训营(留洋另扣学费)；落选 → 不动
- 已有 pending 时先排队，nextStep 后弹出
- 当年按钮态由 flags._trialAge===age 驱动
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
function setup(seed,age){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.5,'number':9,'foot':'r'},seed);
  au.phase='youth'; au.age=age||14; au.ovr=92; au.maxOvr=95; au.talent=1.5; au.money=100000;
  au.youthTeamId='cn-wh'; au.teamId='cn-wh'; au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  return au;
}
function signupAndShape(seed){
  var au=setup(seed);
  var before=au.money, r=window.SIM.trialSignup();
  var p=au.pending, ev=window.SIM.pendingEvent();
  var teamOpts=ev?ev.options.filter(function(o){return !!o.team;}).length:0;
  return JSON.stringify({ok:r.ok,txt:r.txt,moneyDelta:au.money-before,
    trialAge:au.flags._trialAge,age:au.age,
    type:p?p.type:null,eventId:p?p.eventId:null,offers:p?p.offers.length:0,
    opts:ev?ev.options.length:0,teamOpts:teamOpts,
    lastLabel:ev?ev.options[ev.options.length-1].label:null});
}
function passFlow(seed){
  var au=setup(seed);
  window.SIM.trialSignup();
  var p=au.pending, want=p.offers[0], teamBefore=au.teamId;
  window.EV_ROLL.force(true);
  window.SIM.choose(0);
  window.EV_ROLL.force(null);
  var res=au.pending?au.pending.result:null;
  return JSON.stringify({want:want,team:au.teamId,teamBefore:teamBefore,
    text:res?res.text:null,deltas:res?res.deltas.map(function(d){return d.text;}):[]});
}
function failFlow(seed){
  var au=setup(seed);
  window.SIM.trialSignup();
  var teamBefore=au.teamId;
  window.EV_ROLL.force(false);
  window.SIM.choose(0);
  window.EV_ROLL.force(null);
  var res=au.pending?au.pending.result:null;
  return JSON.stringify({team:au.teamId,teamBefore:teamBefore,text:res?res.text:null});
}
function oncePerYear(seed){
  var au=setup(seed);
  var r1=window.SIM.trialSignup();
  var r2=window.SIM.trialSignup();
  au.age=au.age+1;
  var r3=window.SIM.trialSignup();
  return JSON.stringify({r1:r1.ok,r2:r2.ok,r2txt:r2.txt,r3:r3.ok,trialAge:au.flags._trialAge});
}
function queued(seed){
  var au=setup(seed);
  au.pending={type:'random',eventId:'youth_route_technique'};
  var r=window.SIM.trialSignup();
  var q=!!au._trialQueued, kept=au.pending.eventId;
  window.SIM.nextStep();
  return JSON.stringify({ok:r.ok,queued:q,kept:kept,
    popped:au.pending?au.pending.eventId:null,cleared:!au._trialQueued});
}
function difficulty(seed){
  var au=setup(seed);
  window.SIM.trialSignup();
  var ev=window.SIM.pendingEvent();
  var teamOpts=ev.options.filter(function(o){return !!o.team;});
  return JSON.stringify({n:teamOpts.length,
    reps:teamOpts.map(function(o){return o.team.rep;}),
    ps:teamOpts.map(function(o){return Math.round(1000*o.p())/1000;})});
}
function renderTrial(seed){
  var au=setup(seed);
  window.SIM.trialSignup();
  try{ String(window.__SIMTEST.render()); }catch(e){ return JSON.stringify({fail:String(e).slice(0,180)}); }
  return JSON.stringify({ok:true});
}
function abroadFee(seed){
  var au=setup(seed);
  au.money=100000;
  window.SIM.trialSignup();
  var p=au.pending, ev=window.SIM.pendingEvent();
  var idx=-1, want=null;
  for(var i=0;i<ev.options.length;i++){var o=ev.options[i];
    if(o.team&&!window.SIM.leagueOfTeam(o.team).cn){idx=i;want=o.team.id;break;}}
  if(idx<0)return JSON.stringify({skip:true});
  var before=au.money;
  window.EV_ROLL.force(true);
  window.SIM.choose(idx);
  window.EV_ROLL.force(null);
  var fee=window.SIM.youthFee?window.SIM.youthFee(0):null;
  return JSON.stringify({skip:false,want:want,team:au.teamId,spent:before-au.money});
}
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)

    s = json.loads(mr.eval('signupAndShape(101)'))
    assert s['ok'], s
    assert s['moneyDelta'] == -18, s
    assert s['trialAge'] == s['age'], s
    assert s['type'] == 'random' and s['eventId'] == '__trial__', s
    assert 1 <= s['offers'] <= 2, s
    assert s['teamOpts'] >= 1 and s['opts'] == s['teamOpts'] + 1, s
    assert s['lastLabel'] == '不去了', s

    p = json.loads(mr.eval('passFlow(102)'))
    assert p['team'] == p['want'] and p['team'] != p['teamBefore'], p
    assert '通过' in (p['text'] or ''), p

    f = json.loads(mr.eval('failFlow(103)'))
    assert f['team'] == f['teamBefore'], f
    assert '没成' in (f['text'] or ''), f

    o = json.loads(mr.eval('oncePerYear(104)'))
    assert o['r1'] and not o['r2'] and o['r3'], o
    assert o['trialAge'] == 15, o

    q = json.loads(mr.eval('queued(105)'))
    assert q['ok'] and q['queued'] and q['kept'] == 'youth_route_technique', q
    assert q['popped'] == '__trial__' and q['cleared'], q

    d = json.loads(mr.eval('difficulty(106)'))
    assert d['n'] >= 1, d
    if d['n'] == 2 and d['reps'][0] != d['reps'][1]:
        hi = d['reps'].index(max(d['reps']))
        lo = d['reps'].index(min(d['reps']))
        assert d['ps'][hi] <= d['ps'][lo], d

    rt = json.loads(mr.eval('renderTrial(107)'))
    assert rt.get('ok'), rt
    html = harness.rendered_html(mr)
    for t in ['报名试训', '不去了', 'opt-lead', 'data-opt']:
        assert t in html, 'render missing %r' % t
    # 两张球队卡片在上（主 opts），「不去了」在下面独立的 opts-alt 行
    assert 'opts-alt' in html, 'render missing opts-alt row'
    i_team = html.find('opt-lead')
    i_alt = html.find('opts-alt')
    i_no = html.find('不去了')
    assert -1 < i_team < i_alt < i_no, (i_team, i_alt, i_no)

    print('PASS youth_trial_event (报名/排队/二选一/轮盘/每年一次/卡片渲染)')
    print('PASS')


if __name__ == '__main__':
    harness.main(main)
