# -*- coding: utf-8 -*-
"""家庭系统：伴侣人设(partnerType) + 满意度(bond) 潜藏属性。
   覆盖：字段暴露、标签兜底归类、bond 初值/增减/夹取、人设婚后事件 when、bond 阈值门控、每季漂移。"""
import json
import harness

JS = r"""
(function(){
var out={err:null,ids:[],chk:{}};
try{
  var evs={};
  window.EVENTS.forEach(function(e){var i=String(e['id']);if(/^wife_|^love_(date|cold|mend|break)$/.test(i))evs[i]=e;});
  out.ids=Object.keys(evs).sort();
  function mk(o){
    var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
    for(var k in o){ if(k==='flags'){au.flags=o.flags;} else au[k]=o[k]; }
    return au;
  }
  /* married/partnerType/bond/roleRank/contractFinal/partnerYears 都是派生字段：写进底层 state 再求 snap() */
  var R2R={0:'bench',1:'sub',2:'rot',3:'starter',4:'star'};
  function w(id,o){
    var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
    for(var k in o){
      if(k==='flags'){au.flags=o.flags;}
      else if(k==='roleRank'){au.role=R2R[o[k]]||'rot';}
      else if(k==='contractFinal'){au.contractLeft=o[k]?1:5;}
      else if(k!=='partnerType'&&k!=='bond'&&k!=='married'&&k!=='partnerYears'&&k!=='hasPartner')au[k]=o[k];
    }
    if(o.partnerType||o.bond!=null||o.married||o.hasPartner)
      au.life.partner={label:'x',type:o.partnerType||'other',bond:(o.bond!=null?o.bond:60),since:au.age-(o.partnerYears||1)};
    if(o.married)au.life.married=24;
    return !!evs[id]['when'](window.SIM.snap());
  }
  var c=out.chk;
  /* 字段暴露 */
  c.ctx = (function(){var s=mk({}),sn=window.SIM.snap();return ('partnerType' in sn)&&('bond' in sn)&&('agentType' in sn);})();

  /* 设伴侣：显式类型 + 标签兜底 */
  var au=mk({});
  window.SIM.applyResult({'partner':'那个游戏搭子','partnerType':'gamer'});
  c.type_explicit = au.life.partner.type==='gamer';
  c.bond_init = au.life.partner.bond>40 && au.life.partner.bond<80;
  au=mk({}); window.SIM.applyResult({'partner':'队里的康复师'});
  c.type_fallback = au.life.partner.type==='physio';

  /* bond 增减 + 夹取 */
  au=mk({}); window.SIM.applyResult({'partner':'青梅竹马'});
  var b0=au.life.partner.bond;
  window.SIM.applyResult({'bond':10}); c.bond_up = au.life.partner.bond===b0+10;
  window.SIM.applyResult({'bond':-999}); c.bond_clamp = au.life.partner.bond===0;
  c.ctx_bond = window.SIM.snap().bond===0;

  /* agentType */
  window.SIM.applyResult({'agentType':'shady'});
  c.agent = au.agentType==='shady' && window.SIM.snap().agentType==='shady';

  /* 人设婚后事件 when（需 married + partnerType） */
  var M={married:1,age:26,roleRank:3,seasonsAtClub:3,contractFinal:true,partnerYears:3};
  c.w_sweet = w('wife_sweetheart_1',Object.assign({},M,{partnerType:'sweetheart'}))===true;
  c.w_sweet_no = w('wife_sweetheart_1',Object.assign({},M,{partnerType:'gamer'}))===false;
  c.w_unmarried = w('wife_sweetheart_1',Object.assign({},M,{partnerType:'sweetheart',married:0}))===false;
  c.w_physio2 = w('wife_physio_2',Object.assign({},M,{partnerType:'physio'}))===true;
  c.w_ultra2 = w('wife_ultra_2',Object.assign({},M,{partnerType:'ultra'}))===true;
  c.w_rep2 = w('wife_reporter_2',Object.assign({},M,{partnerType:'reporter'}))===true;

  /* bond 阈值门控 */
  c.date_hi  = w('love_date',{hasPartner:1,bond:80})===true;
  c.date_lo  = w('love_date',{hasPartner:1,bond:30})===false;
  c.cold_lo  = w('love_cold',{hasPartner:1,bond:30})===true;
  c.cold_hi  = w('love_cold',{hasPartner:1,bond:60})===false;
  c.break_lo = w('love_break',{hasPartner:1,bond:10})===true;
  c.break_hi = w('love_break',{hasPartner:1,bond:40})===false;

  /* 每季漂移：doPeriod 后 bond 应变化（默认 +1，或留洋 -2） */
  au=mk({phase:'career',teamId:'rma',age:24,ovr:80,maxOvr:95,role:'star',contractLeft:20,seasonsAtClub:2});
  au.flags={}; window.SIM.applyResult({'partner':'青梅竹马'});
  var before=au.life.partner.bond;
  try{ window.SIM.doPeriod(); }catch(e){ out.err='doPeriod:'+String(e).slice(0,80); }
  c.drift = au.life.partner.bond!==before;
}catch(e){ out.err=String(e).slice(0,300); }
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)

WANT = ['love_break', 'love_cold', 'love_date', 'love_mend',
        'wife_gamer_1', 'wife_gamer_2', 'wife_medic_1', 'wife_medic_2',
        'wife_physio_1', 'wife_physio_2', 'wife_reporter_1', 'wife_reporter_2',
        'wife_sister_1', 'wife_sister_2', 'wife_streamer_1', 'wife_streamer_2',
        'wife_sweetheart_1', 'wife_sweetheart_2', 'wife_ultra_1', 'wife_ultra_2']


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['ids'] != WANT:
        raise harness.Fail('family events missing/misnamed: %r' % r['ids'])
    for k, v in r['chk'].items():
        if not v:
            raise harness.Fail('check failed: %s' % k)
    print('PASS life_bond (20 events, %s)' % ' '.join(sorted(r['chk'])))


if __name__ == '__main__':
    harness.main(run)
