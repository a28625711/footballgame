# -*- coding: utf-8 -*-
# 回归：十号事件改造
#  1) num_demote 两个选项改为「据理力争 / 痛快换掉」，据理力争的把握由 ovr + 球队地位决定（能不换）
#  2) 交过十号后又打回绝对核心：同队(num_back_same) / 换队(num_back_other) 两种差分事件，换回十号
import json

import harness

P = "{'name':'lg','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':7,'foot':'r'}"

JS = r"""
(function(){
var E=window.EVENTS,by={};
for(var i=0;i<E.length;i++)by[E[i].id]=E[i];
var out={};
function mk(s,o){
  var st=window.__SIMTEST.start('normal',%P%,s);
  st.ovr=o.ovr||86;st.maxOvr=96;st.money=800;st.age=o.age||26;st.phase='career';
  st.teamId=o.teamId||'mci';st.role=o.role||'star';st.contractLeft=o.contractLeft||3;
  st.seasonsAtClub=3;st.roleAdjust=0;st.guanxi=50;st.youthTeamId=null;
  st.flags=o.flags||{};st.usedEvents={};st.forceQ=[];st.pending=null;st.bigQ=[];
  st.number=o.number!=null?o.number:7;
  return st;
}
/* --- 1) num_demote 结构 --- */
var nd=by['num_demote'];
out.hasNum=!!nd;
out.labels=nd?nd.options.map(function(o){return o.label;}):[];
out.argHasP=!!(nd&&nd.options[0]&&typeof nd.options[0]['p']==='function');
/* 据理力争把握：ovr 高/地位高更可能不换 */
out.pHi=nd.options[0]['p']({ovr:92,roleRank:4});
out.pLo=nd.options[0]['p']({ovr:70,roleRank:0});
out.pMid=nd.options[0]['p']({ovr:80,roleRank:2});
/* --- 2) 两个后续事件 --- */
out.hasSame=!!by['num_back_same'];out.hasOther=!!by['num_back_other'];
function ctx(o){var b={roleRank:4,_numDone:!0x0,_numLostClub:'mci',teamId:'mci',number:7,ovr:88,age:26,inAcademy:false};
  for(var k in o)b[k]=o[k];return b;}
out.sameHit=by['num_back_same'].when(ctx({}));
out.sameMissTeam=by['num_back_same'].when(ctx({teamId:'psg'}));
out.sameMissRole=by['num_back_same'].when(ctx({roleRank:3}));
out.sameMissNum=by['num_back_same'].when(ctx({number:10}));
out.sameMissFlag=by['num_back_same'].when(ctx({_numDone:false}));
out.otherHit=by['num_back_other'].when(ctx({teamId:'psg'}));
out.otherMissTeam=by['num_back_other'].when(ctx({teamId:'mci'}));

/* --- 3) 同队路线：驱动到 num_back_same 并选「要回十号」 --- */
function drive(st,want){
  for(var g=0;g<6000;g++){
    var p=st.pending;
    if(!p){ try{window.SIM.nextStep();}catch(e){out.err=String(e).slice(0,80);return null;} continue; }
    if(p.type==='random'||p.type==='forced'){
      if(!p.result&&p.eventId===want)return p;
      if(p.result)window.__SIMTEST.cont(); else window.__SIMTEST.option(0);
      continue;
    }
    if(p.type==='report'){ window.__SIMTEST.cont(); continue; }
    if(p.type==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); continue; }
    if(p.type==='staff'){ window.__SIMTEST.option(p.offers[0]); continue; }
    if(p.type==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'0'); continue; }
    if(p.type==='academy'||p.type==='youth_path'){ window.__SIMTEST.option(0); continue; }
    if(p.type==='retire_forced'){ window.SIM.choose('retire'); continue; }
    try{window.SIM.nextStep();}catch(e){out.err=String(e).slice(0,80);return null;}
  }
  return null;
}
var st=mk(81,{number:7,ovr:93,role:'star',flags:{_numDone:!0x0,_numLostClub:'mci'}});
var got=drive(st,'num_back_same');
out.gotSame=!!got;
if(got){ window.__SIMTEST.option(0); out.numAfter=st.number; out.roleAfter=st.role; }
/* 换队路线 */
var st2=mk(82,{number:7,ovr:93,role:'star',flags:{_numDone:!0x0,_numLostClub:'cn-cd'}});
var got2=drive(st2,'num_back_other');
out.gotOther=!!got2;
if(got2){ window.__SIMTEST.option(0); out.numAfter2=st2.number; }
return JSON.stringify(out);
})()
""".replace('%P%', P)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(not r.get('err'), 'runtime error: %s' % r.get('err'))
    harness.check(r['hasNum'], 'num_demote missing')
    harness.check(r['labels'] == ['据理力争', '痛快换掉'], 'num_demote options: %s' % r['labels'])
    harness.check(r['argHasP'], '据理力争 缺少概率函数(无法 roll ovr/地位)')
    harness.check(r['pHi'] > r['pMid'] > r['pLo'], '据理力争把握未随 ovr/地位递增: %s' % r)
    harness.check(0.05 <= r['pLo'] <= r['pHi'] <= 0.9, '据理力争把握越界: %s' % r)
    harness.check(r['hasSame'] and r['hasOther'], '后续差分事件缺失: %s' % r)
    harness.check(r['sameHit'] and not r['sameMissTeam'] and not r['sameMissRole']
                  and not r['sameMissNum'] and not r['sameMissFlag'],
                  'num_back_same 门控不对: %s' % r)
    harness.check(r['otherHit'] and not r['otherMissTeam'], 'num_back_other 门控不对: %s' % r)
    harness.check(r['gotSame'], '同队路线未触发 num_back_same')
    harness.check(r['numAfter'] == 10, '同队路线未换回十号: %s' % r.get('numAfter'))
    harness.check(r['gotOther'], '换队路线未触发 num_back_other')
    harness.check(r['numAfter2'] == 10, '换队路线未换回十号: %s' % r.get('numAfter2'))
    print('PASS num10_followup (据理: %.2f/%.2f/%.2f | same->%s other->%s)'
          % (r['pLo'], r['pMid'], r['pHi'], r['numAfter'], r['numAfter2']))


if __name__ == '__main__':
    harness.main(run)
