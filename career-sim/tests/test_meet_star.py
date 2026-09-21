# -*- coding: utf-8 -*-
"""见到队内球星链：青训期 youth_meet_star（记录 _metStar=球队）→ 加入同一队后 star_teammate。"""
import json
import harness

JS = r"""
(function(){
var out={err:null,ids:[],chk:{}};
try{
  var evs={}; window.EVENTS.forEach(function(e){if(/meet_star/.test(String(e['id'])))evs[e['id']]=e;});
  out.ids=Object.keys(evs).sort();
  function ctx(o){
    var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
    au.phase=o.phase||'youth'; au.teamId=(o.team===undefined?'cn-sh':o.team); au.age=o.age||15;
    au.flags=au.flags||{};
    if(o._metStar!=null)au.flags._metStar=o._metStar;
    return window.SIM.snap();
  }
  function w(id,o){var e=evs[id];return e?!!e['when'](ctx(o)):null;}
  var c=out.chk;
  c.youth_ok     = w('youth_meet_star',{team:'cn-sh'})===true;
  c.youth_noTeam = w('youth_meet_star',{team:null})===false;
  c.youth_used   = w('youth_meet_star',{team:'cn-sh',_metStar:'cn-sh'})===false;
  c.star_same    = w('meet_star_again',{phase:'career',age:20,team:'cn-sh',_metStar:'cn-sh'})===true;
  c.star_other   = w('meet_star_again',{phase:'career',age:20,team:'bar',_metStar:'cn-sh'})===false;
  c.star_noFlag  = w('meet_star_again',{phase:'career',age:20,team:'cn-sh'})===false;
  c.star_young   = w('meet_star_again',{phase:'career',age:17,team:'cn-sh',_metStar:'cn-sh'})===false;
  c.star_inAcad  = w('meet_star_again',{phase:'youth',age:20,team:'cn-sh',_metStar:'cn-sh'})===false;

  /* 链：提交 youth_meet_star 后排入 star_teammate(due=age+4) */
  var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
  au.phase='youth'; au.teamId='cn-sh'; au.age=15; au.flags={};
  au.pending={type:'random',eventId:'youth_meet_star'};
  window.SIM.commitEvent({'text':'x'});
  var fl=au.forceLater||[],hit=null;
  for(var i=0;i<fl.length;i++)if(fl[i].id==='meet_star_again')hit=fl[i];
  c.chain_sched = !!hit && hit.due===19;

  /* 选项把 _metStar 记成当前球队 */
  var r=evs.youth_meet_star['options'][1]['apply'](ctx({team:'cn-sh'}),0,0);
  c.apply_sets = r['_metStar']==='cn-sh';
}catch(e){ out.err=String(e).slice(0,250); }
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)

WANT_IDS = ['meet_star_again', 'youth_meet_star']


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['ids'] != WANT_IDS:
        raise harness.Fail('meet_star events missing/misnamed: %r' % r['ids'])
    for k, v in r['chk'].items():
        if not v:
            raise harness.Fail('check failed: %s' % k)
    print('PASS meet_star (2 events, %s)' % ' '.join(sorted(r['chk'])))


if __name__ == '__main__':
    harness.main(run)
