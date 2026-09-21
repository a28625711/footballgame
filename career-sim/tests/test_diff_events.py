# -*- coding: utf-8 -*-
"""差分事件：惯用脚(foot_left/right + 链 foot_reckoning) / 球衣号码(num_1/7/9/10)
   / 回到出道地(echo_home) / 早熟晚熟(early_bloom/late_bloom)。
   另防回归：aF 的 flag 白名单必须写入这些自定义标记。"""
import json
import harness

NEW = ['foot_left', 'foot_right', 'foot_reckoning', 'num_10', 'num_9', 'num_7',
       'num_1', 'echo_home', 'early_bloom', 'late_bloom']

JS = r"""
(function(){
var out={err:null,ids:[],chk:{}};
try{
  var evs={}; window.EVENTS.forEach(function(e){if(%NEW%.indexOf(e['id'])>=0)evs[e['id']]=e;});
  out.ids=Object.keys(evs).sort();
  function mk(o){
    var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
    for(var k in o){ if(k==='flags'){au.flags=au.flags||{};for(var f in o.flags)au.flags[f]=o.flags[f];}
      else if(k==='clubsPlayed'){au.clubsPlayed=o[k];} else au[k]=o[k]; }
    return au;
  }
  function ww(id,o){mk(o);return !!evs[id]['when'](window.SIM.snap());}
  var c=out.chk;
  c.ctx_fields = (function(){mk({});var s=window.SIM.snap();
    return ('foot' in s)&&('number' in s)&&('youthTeamId' in s)&&('clubsCount' in s);})();
  c.fl_left  = ww('foot_left', {phase:'youth',foot:'left'})===true;
  c.fl_notR  = ww('foot_left', {phase:'youth',foot:'right'})===false;
  c.fr_right = ww('foot_right',{phase:'youth',foot:'right'})===true;
  c.fl_used  = ww('foot_left', {phase:'youth',foot:'left',flags:{_footDone:1}})===false;
  c.fk_ok    = ww('foot_reckoning',{phase:'career',age:23,flags:{_footPath:1}})===true;
  c.fk_no    = ww('foot_reckoning',{phase:'career',age:23})===false;
  c.n10      = ww('num_10',{phase:'career',number:10})===true;
  c.n9_no    = ww('num_9', {phase:'career',number:10})===false;
  c.n1_gk    = ww('num_1', {phase:'career',number:1,pos:'GK'})===true;
  c.n1_notgk = ww('num_1', {phase:'career',number:1,pos:'CM'})===false;
  c.echo_ok    = ww('echo_home',{phase:'career',teamId:'cn-sh',youthTeamId:'cn-sh',clubsPlayed:['cn-sh','bar']})===true;
  c.echo_short = ww('echo_home',{phase:'career',teamId:'cn-sh',youthTeamId:'cn-sh',clubsPlayed:['cn-sh']})===false;
  c.echo_other = ww('echo_home',{phase:'career',teamId:'bar',youthTeamId:'cn-sh',clubsPlayed:['cn-sh','bar']})===false;
  c.early_ok = ww('early_bloom',{phase:'career',age:18,ovr:60})===true;
  c.early_no = ww('early_bloom',{phase:'career',age:18,ovr:50})===false;
  c.late_ok  = ww('late_bloom', {phase:'career',age:23,role:'sub',talent:1.4})===true;
  c.late_no  = ww('late_bloom', {phase:'career',age:23,role:'star',talent:1.4})===false;

  /* 脚链：提交 foot_left 后排入 foot_reckoning(due=age+8) */
  var au=mk({phase:'youth',foot:'left',age:15});
  au.pending={type:'random',eventId:'foot_left'};
  window.SIM.commitEvent({'text':'x'});
  var fl=au.forceLater||[],hit=null;
  for(var i=0;i<fl.length;i++)if(fl[i].id==='foot_reckoning')hit=fl[i];
  c.foot_chain = !!hit && hit.due===23;

  /* 白名单：自定义标记必须落进 a2.flags（否则 when 永远不成立） */
  au=mk({});
  window.SIM.applyResult({'_footPath':2,'_bloom':1,'_crush':1,'_metStar':'cn-sh','_numDone':1,'_echoHome':1});
  c.flag_write = au.flags._footPath===2 && au.flags._bloom===1 && au.flags._crush===1 &&
                 au.flags._metStar==='cn-sh' && au.flags._numDone===1 && au.flags._echoHome===1;

  /* 随机池：青训期(16岁)能抽到 foot_left */
  mk({phase:'youth',age:16,foot:'left'});
  var seen=false;
  for(var j=0;j<600;j++){var e=window.SIM.pickEvent();if(e&&e['id']==='foot_left'){seen=true;break;}}
  c.pool_foot = seen;
}catch(e){ out.err=String(e).slice(0,300); }
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER).replace('%NEW%', json.dumps(NEW))


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['ids'] != sorted(NEW):
        raise harness.Fail('diff events missing/misnamed: %r' % r['ids'])
    for k, v in r['chk'].items():
        if not v:
            raise harness.Fail('check failed: %s' % k)
    print('PASS diff_events (10 events, %s)' % ' '.join(sorted(r['chk'])))


if __name__ == '__main__':
    harness.main(run)
