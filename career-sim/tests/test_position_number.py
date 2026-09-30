# -*- coding: utf-8 -*-
# 位置迁移 / 换号码 实装回归：
#  A) 引擎：pos/number 效果键生效；posGroup 自动跟随；前场→中场→后场 被拦截；非法位置忽略
#  B) 事件定义：
#     - 位置类事件 apply 返回 pos/posAny/posBack，when 由 posMoves/posBackMoves 门控
#     - att_number9 换号到 9
#     - light_number 仅队长触发（非队长 when=false）
#     - num_demote 仅 轮换及以下 + 10号 触发并强制换号；num_10 仅 主力及以上
import json

import harness

JS = r'''
(function(){
var out={err:null},checks=[];
function chk(name,cond){ checks.push([name,!!cond]); }
function rnd(){return 0.99;}
function byId(id){for(var i=0;i<window.EVENTS.length;i++)if(window.EVENTS[i].id===id)return window.EVENTS[i];return null;}
function callWhen(id,ctx){var e=byId(id);return e&&e.when?!!e.when(ctx):null;}
function callApply(id,idx,ctx,prob){var e=byId(id);return e.options[idx].apply(ctx,rnd,prob==null?1:prob);}

try{
  /* ---------- A) 引擎 ---------- */
  var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:10,foot:'r'};
  var st=window.__SIMTEST.start('normal',P,12345);
  st.phase='career';st.teamId='mci';st.role='rot';st.seasonsAtClub=1;st.roleAdjust=0;st.guanxi=50;
  var s0=window.SIM.snap();
  chk('moves_ST', s0.posMoves.join(',')==='CAM,LW,RW');
  // ST -> CAM (att->mid ok)
  window.SIM.applyResult({'pos':'CAM'});
  var s1=window.SIM.snap();
  chk('ST_to_CAM', s1.pos==='CAM'&&s1.posGroup==='mid');
  // CAM -> CB (mid->def, origin att => dist2 blocked)
  window.SIM.applyResult({'pos':'CB'});
  chk('CAM_to_CB_blocked', window.SIM.snap().pos==='CAM');
  // CAM -> CM (within mid ok)
  window.SIM.applyResult({'pos':'CM'});
  chk('CAM_to_CM', window.SIM.snap().pos==='CM');
  // invalid ignored
  window.SIM.applyResult({'pos':'ZZ'});
  chk('invalid_pos_ignored', window.SIM.snap().pos==='CM');
  // number
  window.SIM.applyResult({'number':9});
  chk('number_set', window.SIM.snap().number===9);

  /* ---------- B) 事件定义 ---------- */
  var base={fame:40,ovr:75,talent:1.1,number:7,_numDone:false,roleRank:3,inChina:false,isCaptain:false,marry:false};

  var c=Object.assign({},base,{posGroup:'att',posMoves:['CAM','LW','RW'],posBackMoves:['CAM']});
  var r=callApply('att_dropdeep',0,c);
  chk('att_dropdeep_pos', r.pos==='CAM');
  chk('att_dropdeep_when', callWhen('att_dropdeep',c)===true);
  chk('att_dropdeep_when_off', callWhen('att_dropdeep',Object.assign({},c,{posMoves:['LW'],posBackMoves:[]}))===false);

  c=Object.assign({},base,{posGroup:'mid',posMoves:['CDM'],posBackMoves:['CDM']});
  chk('mid_deep_when',callWhen('mid_deep',c)===true);
  chk('mid_deep_pos', callApply('mid_deep',0,c).pos==='CDM');

  c=Object.assign({},base,{posGroup:'def',posMoves:['CB'],posBackMoves:[]});
  chk('def_pace_pos', callApply('def_pace',0,c).pos==='CB');

  c=Object.assign({},base,{posGroup:'mid',posMoves:[],posBackMoves:['CDM']});
  chk('vet_dropback_when',callWhen('vet_dropback',c)===true);
  chk('vet_dropback_back', callApply('vet_dropback',0,c).posBack===true);
  chk('vet_dropback_when_off',callWhen('vet_dropback',Object.assign({},c,{posBackMoves:[]}))===false);

  c=Object.assign({},base,{inChina:true,posGroup:'att',roleRank:2,posMoves:['CAM'],posBackMoves:[]});
  chk('cn_waiyuan_any', callApply('cn_waiyuan',0,c).posAny===true);
  chk('cn_waiyuan_when',callWhen('cn_waiyuan',c)===true);
  chk('cn_waiyuan_when_off',callWhen('cn_waiyuan',Object.assign({},c,{posMoves:[]}))===false);

  c=Object.assign({},base,{posGroup:'att',posMoves:['CAM']});
  chk('position_change_any', callApply('position_change',0,c).posAny===true);
  chk('position_change_when',callWhen('position_change',c)===true);

  // att_number9
  c=Object.assign({},base,{posGroup:'att',number:7,_numDone:false});
  var r9=callApply('att_number9',0,c);
  chk('att_number9_num', r9.number===9&&r9._numDone===true);
  chk('att_number9_when', callWhen('att_number9',c)===true);
  chk('att_number9_when_done', callWhen('att_number9',Object.assign({},c,{_numDone:true}))===false);

  // light_number: captain only
  chk('light_number_when_captain', callWhen('light_number',Object.assign({},base,{number:7,isCaptain:true}))===true);
  chk('light_number_when_nocap',  callWhen('light_number',Object.assign({},base,{number:7,isCaptain:false}))===false);
  var rl=callApply('light_number',0,Object.assign({},base,{number:7,isCaptain:true}));
  chk('light_number_num', rl.number===10);

  // num_demote: rot- and below wearing 10
  chk('num_demote_when_rot',  callWhen('num_demote',Object.assign({},base,{number:10,roleRank:2,_numDone:false}))===true);
  chk('num_demote_when_star', callWhen('num_demote',Object.assign({},base,{number:10,roleRank:3,_numDone:false}))===false);
  /* 选项0=据理力争：失败(阈值0)才被迫换号并记录老东家；成功(阈值1)保住十号、不置 _numDone */
  var rdFail=callApply('num_demote',0,Object.assign({},base,{number:10,roleRank:2,_numDone:false,teamId:'mci'}),0);
  chk('num_demote_arg_fail', (rdFail.number!=null&&rdFail.number!==10&&rdFail._numDone===true&&rdFail._numLostClub==='mci'));
  var rdWin=callApply('num_demote',0,Object.assign({},base,{number:10,roleRank:2,_numDone:false,teamId:'mci',ovr:92}),1);
  chk('num_demote_arg_win', (rdWin.number==null&&!rdWin._numDone));
  /* 选项1=痛快换掉：必定换号 */
  var rd=callApply('num_demote',1,Object.assign({},base,{number:10,roleRank:2,_numDone:false,teamId:'cn-cd'}));
  chk('num_demote_num', (rd.number!=null&&rd.number!==10&&rd._numDone===true&&rd._numLostClub==='cn-cd'));

  // num_10: starters and above only
  chk('num_10_when_star',  callWhen('num_10',Object.assign({},base,{number:10,roleRank:3,_numDone:false}))===true);
  chk('num_10_when_rot',   callWhen('num_10',Object.assign({},base,{number:10,roleRank:2,_numDone:false}))===false);

  /* ---------- C) 强制事件：轮换及以下 + 10号 → num_demote 必触发 ---------- */
  var hit=0;
  for(var sd=200;sd<206;sd++){
    var q=window.__SIMTEST.start('normal',P,sd);
    q.phase='career';q.teamId='mci';q.role='rot';q.seasonsAtClub=1;q.roleAdjust=0;q.guanxi=50;
    q.age=22;q.ovr=72;q.maxOvr=90;q.number=10;q.money=300;q.youthTeamId=null;
    q.flags={};q.usedEvents={};q.forceQ=[];q.pending=null;
    var n=0;
    while(n++<4000){
      var p=q.pending;
      if(p&&p.eventId==='num_demote'){hit++;break;}
      if(!p){try{window.SIM.nextStep();}catch(e){break;}}
      else{
        var t=p.type;
        if(t==='random'||t==='forced'){ if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0); }
        else if(t==='report'){window.__SIMTEST.cont();}
        else if(t==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); }
        else if(t==='staff'){window.__SIMTEST.option(p.offers[0]);}
        else if(t==='transfer'){ if(p.offers&&p.offers.length)window.__SIMTEST.option('0'); else window.__SIMTEST.option(p.canStay?'stay':'retire'); }
        else if(t==='academy'||t==='youth_path'){window.__SIMTEST.option(0);}
        else if(t==='retire_forced'){window.SIM.choose('retire');}
        else {window.__SIMTEST.cont();}
      }
      if(q.phase==='done'||q.phase==='summary')break;
    }
  }
  chk('num_demote_forced', hit>0);
}catch(e){ out.err=String(e).slice(0,400); }

var bad=[];for(var i=0;i<checks.length;i++){if(!checks[i][1])bad.push(checks[i][0]);}
out.bad=bad;out.total=checks.length;
return JSON.stringify(out);
})()
'''


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r.get('err') is None, r.get('err', ''))
    harness.check(len(r['bad']) == 0, 'failed checks: %s (%d/%d)' % (
        ', '.join(r['bad']), r['total'] - len(r['bad']), r['total']))
    print('PASS position_number (%d checks)' % r['total'])


if __name__ == '__main__':
    harness.main(run)
