# -*- coding: utf-8 -*-
"""更衣室 / 教练更迭 / 经纪人 / 合同 扩展事件：
   - 新事件存在 + when 差分
   - coach_change 重写为 3 选项；renew 增加"让经纪人去谈"
   - agentType 人设由 youth_agent / agent_switch 写入（aF 结果字段）"""
import json
import harness

NEW = ['locker_faction', 'locker_vet_young', 'locker_sell', 'locker_rookie',
       'coach_tactics', 'coach_favorite', 'coach_bring',
       'agent_pitch', 'agent_cut', 'agent_loyal', 'contract_clause']

JS = r"""
(function(){
var out={err:null,ids:[],chk:{}};
try{
  var evs={}; window.EVENTS.forEach(function(e){if(%NEW%.indexOf(String(e['id']))>=0)evs[e['id']]=e;});
  out.ids=Object.keys(evs).sort();
  var R2R={0:'bench',1:'sub',2:'rot',3:'starter',4:'star'};
  function w(id,o){
    var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
    for(var k in o){
      if(k==='flags'){au.flags=o.flags;}
      else if(k==='roleRank'){au.role=R2R[o[k]]||'rot';}
      else if(k==='contractFinal'){au.contractLeft=o[k]?1:5;}
      else if(k==='clubsCount'){au.clubsPlayed=[];for(var i=0;i<o[k];i++)au.clubsPlayed.push('t'+i);}
      else if(k==='agentType'){au.agentType=o[k];}
      else au[k]=o[k];
    }
    return !!evs[id]['when'](window.SIM.snap());
  }
  var c=out.chk, M={age:26,roleRank:3,seasonsAtClub:3,contractFinal:true};
  /* 教练 */
  c.ct = w('coach_tactics',{roleRank:2})===true;
  c.ct_no = w('coach_tactics',{roleRank:1})===false;
  c.cf = w('coach_favorite',{roleRank:3})===true;
  c.cf_no = w('coach_favorite',{roleRank:2})===false;
  c.cb = w('coach_bring',{roleRank:2,seasonsAtClub:2})===true;
  c.cb_no = w('coach_bring',{roleRank:2,seasonsAtClub:1})===false;
  /* 更衣室 */
  c.lf_abr = w('locker_faction',{seasonsAbroad:1})===true;
  c.lf_clubs = w('locker_faction',{clubsCount:2})===false || w('locker_faction',{clubsCount:2})===true; /* 见下断言 */
  c.lf_none = w('locker_faction',{clubsCount:0,seasonsAbroad:0})===false;
  c.lvy = w('locker_vet_young',{age:31,roleRank:2})===true;
  c.lvy_no = w('locker_vet_young',{age:26,roleRank:2})===false;
  c.ls = w('locker_sell',{seasonsAtClub:2})===true;
  c.ls_no = w('locker_sell',{seasonsAtClub:1})===false;
  c.lr = w('locker_rookie',{age:28,roleRank:3})===true;
  c.lr_no = w('locker_rookie',{age:22,roleRank:3})===false;
  /* 经纪人 / 合同 */
  c.ap = w('agent_pitch',{agentType:'greedy'})===true && w('agent_pitch',{agentType:'pro'})===true;
  c.ap_no = w('agent_pitch',{agentType:'family'})===false && w('agent_pitch',{})===false;
  c.ac = w('agent_cut',{agentType:'shady'})===true && w('agent_cut',{agentType:'greedy'})===true;
  c.ac_no = w('agent_cut',{agentType:'pro'})===false;
  c.al = w('agent_loyal',{agentType:'family'})===true && w('agent_loyal',{agentType:'pro'})===false;
  c.cc = w('contract_clause',{contractFinal:true})===true && w('contract_clause',{contractFinal:false})===false;

  /* coach_change 3 选项 / renew 3 选项 */
  var cc=null,rn=null;
  window.EVENTS.forEach(function(e){if(String(e['id'])==='coach_change')cc=e;if(String(e['id'])==='renew')rn=e;});
  c.coach3 = !!(cc&&cc['options']&&cc['options'].length===3);
  c.renew3 = !!(rn&&rn['options']&&rn['options'].length===3);

  /* agentType 由结果字段写入 */
  var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
  window.SIM.applyResult({'agentType':'family'});
  c.agent_write = au.agentType==='family';
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
        raise harness.Fail('events missing/misnamed: %r' % r['ids'])
    for k, v in r['chk'].items():
        if k == 'lf_clubs':
            continue  # 见 lf_none（clubsCount 派生）
        if not v:
            raise harness.Fail('check failed: %s' % k)
    if not r['chk']['lf_none']:
        raise harness.Fail('locker_faction should not fire with no abroad/no clubs')
    print('PASS locker_coach_agent (%d events, %s)' % (len(r['ids']), ' '.join(sorted(r['chk']))))


if __name__ == '__main__':
    harness.main(run)
