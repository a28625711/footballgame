# -*- coding: utf-8 -*-
"""老将回归邀请回归：
- vetInvitePool(kind) 按 家乡/青训营/首队 返回愿意报价的球队（青训营可多个）
- 三个事件共用 _vetInviteDone 防重复标志
- 选"接受"后 _vetInviteTeam 记录受邀球队；合同到期转会窗中该队必出现（即使 bf 会过滤掉它）"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
function setup(seed){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.2,'number':9,'foot':'r'},seed);
  au.phase='career'; au.age=34; au.ovr=72; au.maxOvr=80; au.talent=1.2; au.money=1000;
  au.originId='sd'; au.youthTeamId='cn-sd'; au.clubsPlayed=['cn-sh','cn-sd'];
  au.teamId='wol'; au.role='star'; au.contractLeft=3; au.seasonsAtClub=3;
  au.roleAdjust=0; au.guanxi=50; au.flags={}; au.pending=null; au.usedEvents={};
  return au;
}
function pools(seed){
  setup(seed);
  return JSON.stringify({
    home: window.SIM.vetInvitePool('home').map(function(t){return t.id;}),
    youth: window.SIM.vetInvitePool('youth').map(function(t){return t.id;}),
    first: window.SIM.vetInvitePool('first').map(function(t){return t.id;})
  });
}
function acceptAndWindow(seed){
  var au=setup(seed);
  window.SIM.applyResult({'_vetInviteDone':true,'_vetInviteTeam':'cn-sd'});
  var flagged=au.flags._vetInviteTeam, done=au.flags._vetInviteDone;
  au.contractLeft=0;
  window.SIM.nextStep();
  var p=au.pending;
  var terms=au._offerTerms&&au._offerTerms['cn-sd'];
  return JSON.stringify({flagged:flagged,done:done,type:p?p.type:null,
    offers:p&&p.offers?p.offers:[],canStay:p?!!p.canStay:null,
    years:terms?terms.years:null});
}
function overlap(seed){
  var au=setup(seed);
  au.teamId='cn-sd'; au.youthTeamId='cn-sd'; au.clubsPlayed=['cn-sd'];
  var snap=window.SIM.snap();
  var ev=window.EVENTS.filter(function(e){return e.id==='vet_home_call'||e.id==='vet_academy_call'||e.id==='vet_first_club_call';});
  return JSON.stringify({
    home:window.SIM.vetInvitePool('home').map(function(t){return t.id;}),
    youth:window.SIM.vetInvitePool('youth').map(function(t){return t.id;}),
    first:window.SIM.vetInvitePool('first').map(function(t){return t.id;}),
    open:ev.map(function(e){return !!e.when(snap);})
  });
}
function windowNoInvite(seed){
  var au=setup(seed);
  au.contractLeft=0;
  window.SIM.nextStep();
  var p=au.pending;
  return JSON.stringify({type:p?p.type:null,offers:p&&p.offers?p.offers:[]});
}
function eventsGate(seed){
  var au=setup(seed);
  var ev=window.EVENTS.filter(function(e){return e.id==='vet_home_call'||e.id==='vet_academy_call'||e.id==='vet_first_club_call';});
  var snap=window.SIM.snap();
  var open=ev.map(function(e){return !!e.when(snap);});
  window.SIM.applyResult({'_vetInviteDone':true});
  snap=window.SIM.snap();
  var closed=ev.map(function(e){return !!e.when(snap);});
  return JSON.stringify({ids:ev.map(function(e){return e.id;}),open:open,closed:closed});
}
"""


def main():
    mr = harness.new_engine()
    mr.eval(JS)

    pools = json.loads(mr.eval('pools(701)'))
    print('pools:', pools)
    assert 'cn-sd' in pools['home'], '家乡池应含 cn-sd'
    assert pools['youth'] == ['cn-sd'], '青训池应为 cn-sd'
    assert pools['first'] == ['cn-sh'], '首队池应为 cn-sh'

    gate = json.loads(mr.eval('eventsGate(702)'))
    print('gate:', gate)
    assert gate['ids'] == ['vet_home_call', 'vet_academy_call', 'vet_first_club_call'], gate['ids']
    assert all(gate['open']), '未设标志时三个事件都应可用'
    assert not any(gate['closed']), '设 _vetInviteDone 后三个事件都应关闭'

    base = json.loads(mr.eval('windowNoInvite(703)'))
    withflag = json.loads(mr.eval('acceptAndWindow(704)'))
    print('no-invite window:', base)
    print('with-invite window:', withflag)
    assert withflag['flagged'] == 'cn-sd', 'applyResult 未写入 _vetInviteTeam（白名单缺失？）'
    assert withflag['done'] is True, 'applyResult 未写入 _vetInviteDone'
    assert withflag['type'] == 'transfer', '受邀后应进入转会窗，得到 %s' % withflag['type']
    assert 'cn-sd' in withflag['offers'], '受邀球队必出现在转会窗报价中'
    assert 'cn-sd' not in base['offers'], '对照组不应包含 cn-sd（说明是强制注入）'
    assert withflag['years'] is not None and 3 <= withflag['years'] <= 5, \
        '受邀合同应加长到 3-5 年，实际 %s' % withflag['years']
    assert mr.eval('window.SIM.state().flags._vetInviteTeam') in (None, 'null'), '受邀队用过后应清除'

    ov = json.loads(mr.eval('overlap(705)'))
    print('overlap:', ov)
    assert 'cn-sd' not in ov['home'], '家乡池不应含现东家 cn-sd'
    assert ov['youth'] == [], '青训池不应含现东家'
    assert ov['first'] == [], '首队池不应含现东家'
    assert ov['open'][1] is False and ov['open'][2] is False, \
        '青训/首队与现东家重合时不应触发'
    print('PASS vet_invite (家乡/青训/首队候选池 + 共用防重复标志 + 合同到期必现 + 现东家不触发 + 受邀合同加长)')
    print('PASS')


if __name__ == '__main__':
    main()
