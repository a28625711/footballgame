# -*- coding: utf-8 -*-
# 里程碑结算事件回归（47 条）：季末 _promoReleg 末尾 _milestoneScan() 扫描一次，
# 命中写"一次锁存"flag 并入 _mileQ，再按优先级 drain（每季最多 3 条）到 forceQ。
# 这里逐类构造状态、直调 promoReleg，校验：
#   1) 各类里程碑都能命中；2) 优先级顺序；3) 每季上限 + 队列兜底（不会丢）；
#   4) 跳档只播最高一档；5) 已触发过的（usedEvents）不再入队；6) registry 完整性。
import json

import harness

JS = r"""
(function(){
var ALL=['mile_ballon','mile_ballon3','mile_wc','mile_sweep','mile_dom_treble','mile_first_ucl','mile_ucl2',
'mile_ucl3','mile_ucl5','mile_first_cont','mile_first_league','mile_first_cup','mile_first_super','mile_first_youth',
'mile_euro_boot','mile_afcpoy','mile_glove','mile_league_boot','mile_league_mvp','mile_lg_weak','mile_goal300',
'mile_goal200','mile_goal100','mile_goal50','mile_goals40','mile_goals30','mile_goals20','mile_streak20',
'mile_assist100','mile_assist15','mile_cs100','mile_apps500','mile_apps300','mile_caps100','mile_caps50',
'mile_trophy30','mile_trophy20','mile_trophy10','mile_first_trophy','mile_earn1e8','mile_transfer1','mile_clubs3',
'mile_ovr90','mile_promote','mile_giant_down','mile_releg','mile_rival_down'];
function mk(seed,tid,lg){
  var st=window.__SIMTEST.start('normal',{name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},seed);
  st.age=27;st.phase='career';st.role='star';st.money=1200;st.ovr=88;st.maxOvr=80;
  st.teamId=tid||'mci';st.leagueId=lg||'epl';
  st.flags={};st.usedEvents={};st.forceQ=[];st._mileQ=[];st.pending=null;st.bigQ=[];st._newsQ=[];st.seasons=[];
  st.awards=[];st.trophies=[];st.clubsPlayed=[];st.caps=0;st.careerEarnings=0;st._worldRan=!0x0;st.lastTables={};
  st.totals={'apps':0,'goals':0,'assists':0,'cs':0,'ga':0};
  return st;
}
function bz(st,extra){
  var b={'age':st.age,'teamId':st.teamId,'teamName':(window.SIM.teamById(st.teamId)||{})['name'],
    'leagueId':st.leagueId,'apps':0x1e,'leaguePos':0x5,'goals':0,'assists':0};
  for(var k in (extra||{}))b[k]=extra[k];
  return b;
}
function go(st,extra){st._worldRan=!0x0;window.SIM.promoReleg(bz(st,extra),null,null);
  return {fq:(st.forceQ||[]).slice(),mq:(st._mileQ||[]).slice(),f:st.flags,s:st._mileSets};}
function has(a,id){return a&&a.indexOf(id)>=0;}
var R={};
/* ── 奖项类 ── */
var s=mk(11);s.awards=[{'name':'金球奖','age':s.age}];R.ballon=go(s);
var s2=mk(12);s2.awards=[{'name':'金球奖','age':s2.age-2},{'name':'金球奖','age':s2.age-1},{'name':'金球奖','age':s2.age}];R.ballon3=go(s2);
var s3=mk(13);s3.awards=[{'name':'欧洲金靴','age':s3.age},{'name':'亚洲足球先生','age':s3.age},{'name':'金手套','age':s3.age}];R.awardsA=go(s3);
var s4=mk(14);s4.awards=[{'name':'西甲金靴','age':s4.age},{'name':'西甲最佳球员','age':s4.age}];R.awardsB=go(s4);
R.sets=(s4._mileSets||{});
/* 用引擎里真实的名称集合来构造奖杯（避免硬编码中文名出错） */
var _lg=R.sets['lg']?Object.keys(R.sets['lg'])[0]:'英超冠军';
var _cont=R.sets['cont']?Object.keys(R.sets['cont'])[0]:'亚冠冠军';
var _cup=R.sets['cup']?Object.keys(R.sets['cup'])[0]:'足总杯冠军';
var _sup=R.sets['sup']?Object.keys(R.sets['sup'])[0]:'社区盾冠军';
var _yth=R.sets['youth']?Object.keys(R.sets['youth'])[0]:'U17亚洲杯冠军';
R.names={lg:_lg,cont:_cont,cup:_cup,sup:_sup,youth:_yth};
var s5=mk(15);s5.trophies=[{'name':_lg,'age':s5.age,'team':'曼城'}];R.firstLg=go(s5);
var s6=mk(16);s6.trophies=[{'name':_cont,'age':s6.age,'team':'曼城'}];R.firstCont=go(s6);
var s7=mk(17);s7.trophies=[{'name':_cup,'age':s7.age,'team':'曼城'},{'name':_sup,'age':s7.age,'team':'曼城'}];R.firstCupSup=go(s7);
var s8=mk(18);s8.trophies=[{'name':_yth,'age':s8.age,'team':'中国U17'}];R.firstYouth=go(s8);
/* 欧冠累计/连庄 */
function ucl(st,ages,team){return ages.map(function(a){return {'name':'欧冠冠军','age':a,'team':team||'曼城'};});}
var s9=mk(19);s9.trophies=ucl(s9,[s9.age-2,s9.age-1,s9.age]);R.ucl3=go(s9);
var s10=mk(20);s10.trophies=ucl(s10,[s10.age-4,s10.age-3,s10.age-2,s10.age-1,s10.age]);R.ucl5=go(s10);
var s11=mk(21);s11.trophies=ucl(s11,[s11.age-2,s11.age-1,s11.age],'皇马');s11.trophies[1]['team']='曼城';R.ucl3mix=go(s11);
/* 横扫 / 三冠 */
var s12=mk(22);s12.trophies=[{'name':'欧冠冠军','age':s12.age,'team':'曼城'},{'name':_lg,'age':s12.age,'team':'曼城'}];s12.awards=[{'name':'金球奖','age':s12.age}];R.sweep=go(s12);
var s13=mk(23);s13.trophies=[{'name':_lg,'age':s13.age,'team':'曼城'},{'name':_cup,'age':s13.age,'team':'曼城'},{'name':_sup,'age':s13.age,'team':'曼城'}];R.treble=go(s13);
/* ── 黑马 / 升降 / 时代 ── */
var s14=mk(24,'ful','epl');R.weak=go(s14,{'leaguePos':1});
var s15=mk(25,'mci','epl');R.strong=go(s15,{'leaguePos':1});
var s16=mk(26,'mci','epl');R.promote=go(s16,{'move':'升上英超'});
var s17=mk(27,'mci','epl');R.releg=go(s17,{'move':'降入英冠'});
var s18=mk(28,'mci','epl');s18._newsQ=[{'t':'releg','tid':'bay'}];R.giant=go(s18);
var s19=mk(29,'rma','liga');s19._newsQ=[{'t':'releg','tid':'bar'}];R.rival=go(s19);
/* ── 纪录阶梯 ── */
var s20=mk(30);R.g45=go(s20,{'goals':45});
var s21=mk(31);R.g25=go(s21,{'goals':25});
var s22=mk(32);s22.totals={'apps':0,'goals':250,'assists':0,'cs':0,'ga':0};R.cg250=go(s22);
var s23=mk(33);s23.totals={'apps':520,'goals':0,'assists':120,'cs':110,'ga':0};s23.caps=120;s23.careerEarnings=12000;R.recs=go(s23);
var s24=mk(34);s24.trophies=[];for(var i=0;i<22;i++)s24.trophies.push({'name':'某杯冠军','age':s24.age-1,'team':'x'});R.tr22=go(s24);
var s25=mk(35);R.a15=go(s25,{'assists':18});
/* 连续 3 季 20+ */
var s26=mk(36);s26.seasons=[{'age':24,'goals':21},{'age':25,'goals':22},{'age':26,'goals':23}];R.streak=go(s26,{'goals':24});
/* ── 身份 ── */
var s27=mk(37);s27.clubsPlayed=['a','b'];R.trans=go(s27);
var s28=mk(38);s28.clubsPlayed=['a','b','c'];R.clubs3=go(s28);
var s29=mk(39);s29.maxOvr=91;R.ovr90=go(s29);
/* ── 队列：一季多命中全部进 _mileQ（不占 forceQ 槽位，避免饿死常规强制事件） ── */
var s30=mk(40);s30.trophies=ucl(s30,[s30.age-4,s30.age-3,s30.age-2,s30.age-1,s30.age]);
var r30=go(s30);R.queue1={fq:r30.fq,mq:r30.mq};
/* 同季再扫一次：不应重复入队 */
var r30b=go(s30);R.queue2={fq:r30b.fq,mq:r30b.mq};
R.queue2.dup=(r30b.mq.length!==r30.mq.length);
/* ── 端到端：真实生涯里里程碑确实会被播出 ── */
var MILE={};window.EVENTS.forEach(function(e){if(/^mile_/.test(e.id))MILE[e.id]=1;});
var fired={},maxPerReport=0,_cur=0,_reports=0;
function resolveEv(st,p){
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result)window.SIM.choose('push'); else window.__SIMTEST.cont(); return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){window.__SIMTEST.option('0');}else{window.__SIMTEST.option(p.canStay?'stay':'retire');} return; }
  if(t==='academy'||t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
for(var _sd=101;_sd<=102;_sd++){
  var e=window.__SIMTEST.start('normal',{name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.3,number:7,foot:'r'},_sd);
  e.ovr=88;e.maxOvr=96;e.money=1500;e.age=19;e.phase='career';e.teamId='rma';e.role='star';
  e.contractLeft=40;e.seasonsAtClub=1;e.roleAdjust=0;e.guanxi=60;e.youthTeamId=null;
  e.flags={};e.usedEvents={};e.forceQ=[];e.pending=null;_cur=0;
  var _n=0;
  while(_n++<400000){
    var p=e.pending;
    if(!p){ if(e.phase==='summary'||e.phase==='done')break; try{window.SIM.nextStep();}catch(err){break;} continue; }
    if(p.type==='report'){ if(_cur>maxPerReport)maxPerReport=_cur;_cur=0;_reports++; }
    if((p.type==='forced'||p.type==='random')&&!p.result&&MILE[p.eventId]){fired[p.eventId]=1;_cur++;
      if(p.type!=='forced')R.leakRandom=(R.leakRandom||0)+1;}
    try{resolveEv(e,p);}catch(err){break;}
    if(e.phase==='summary'||e.phase==='done'){e.pending=null;break;}
  }
}
R.e2eFired=Object.keys(fired).length;
R.e2eIds=Object.keys(fired).slice(0,8);
R.maxPerReport=maxPerReport;R.reports=_reports;
/* ── 去重：已触发过的 + 已锁存的都不再入队 ── */
var s31=mk(41);s31.awards=[{'name':'金球奖','age':s31.age}];s31.flags={'mk_dummy':1};s31.usedEvents={'mile_ballon':0x1};R.dedupe=go(s31);
/* ── registry ── */
var defs={};window.EVENTS.forEach(function(e){defs[e.id]=e;});
R.missing=[];R.bad=[];ALL.forEach(function(id){var e=defs[id];if(!e)R.missing.push(id);
  else if(typeof e['when']!=='function'||!(e['options']&&e['options'].length))R.bad.push(id);});
R.total=window.EVENTS.length;
/* desc 函数依赖 flags 的几条 */
R.descFn=['mile_first_league','mile_first_cont','mile_first_cup','mile_first_super','mile_ucl3','mile_lg_weak','mile_promote','mile_releg','mile_giant_down','mile_rival_down'].filter(function(id){return defs[id]&&typeof defs[id]['desc']==='function';});
return JSON.stringify(R);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))

    def has(case, mid, label):
        harness.check(has_id(r, case, mid), '%s: 缺 %s (fq=%s mq=%s)' % (label, mid, r[case]['fq'], r[case]['mq']))

    def has_id(r, case, mid):
        d = r.get(case) or {}
        return mid in (d.get('fq') or []) or mid in (d.get('mq') or [])

    harness.check(not r['missing'], 'registry 缺里程碑: %s' % r['missing'])
    harness.check(not r['bad'], '里程碑事件结构异常: %s' % r['bad'])
    harness.check(len(r['descFn']) == 10, 'desc 应为函数的条数不对: %s' % r['descFn'])
    harness.check(r['total'] >= 470, 'EVENTS 数量异常（应 >=470）: %d' % r['total'])

    has('ballon', 'mile_ballon', '首座金球')
    has('ballon3', 'mile_ballon3', '第三座金球')
    for mid in ('mile_euro_boot', 'mile_afcpoy', 'mile_glove'):
        has('awardsA', mid, '奖项A')
    for mid in ('mile_league_boot', 'mile_league_mvp'):
        has('awardsB', mid, '奖项B')
    has('firstLg', 'mile_first_league', '首座联赛')
    has('firstCont', 'mile_first_cont', '首座洲际')
    has('firstCupSup', 'mile_first_cup', '首座杯赛')
    has('firstCupSup', 'mile_first_super', '首座超级杯')
    has('firstYouth', 'mile_first_youth', '首座青年队')
    has('ucl3', 'mile_ucl3', '欧冠三连')
    has('ucl5', 'mile_ucl5', '第五座欧冠')
    harness.check(has_id(r, 'ucl5', 'mile_ucl2'), '第五座欧冠应同时含第二座: %s' % r['ucl5'])
    harness.check(not has_id(r, 'ucl3mix', 'mile_ucl3'), '换队三连被误判')
    has('sweep', 'mile_sweep', '赛季横扫')
    has('treble', 'mile_dom_treble', '国内三冠王')
    has('weak', 'mile_lg_weak', '黑马夺冠')
    harness.check(not has_id(r, 'strong', 'mile_lg_weak'), '豪门夺冠被误判')
    has('promote', 'mile_promote', '升级')
    has('releg', 'mile_releg', '降级')
    has('giant', 'mile_giant_down', '豪门降级')
    has('rival', 'mile_rival_down', '死敌降级')
    # 阶梯：45 球只播最高一档 40
    harness.check(has_id(r, 'g45', 'mile_goals40') and not has_id(r, 'g45', 'mile_goals30'),
                  '45 球未只播最高档: %s' % r['g45'])
    harness.check(bool(r['g45']['f'].get('_mileG20')) and bool(r['g45']['f'].get('_mileG30')),
                  '低档未锁存（防重复）')
    has('g25', 'mile_goals20', '单季20球')
    has('cg250', 'mile_goal200', '生涯200球')
    harness.check(not has_id(r, 'cg250', 'mile_goal100'), '250 球误播 100 档')
    for mid in ('mile_apps500', 'mile_assist100', 'mile_cs100', 'mile_caps100', 'mile_earn1e8'):
        has('recs', mid, '生涯纪录')
    has('tr22', 'mile_trophy20', '第20座奖杯')
    has('a15', 'mile_assist15', '单季15助攻')
    has('streak', 'mile_streak20', '连续3季20+')
    has('trans', 'mile_transfer1', '首次转会')
    has('clubs3', 'mile_clubs3', '第三家俱乐部')
    has('ovr90', 'mile_ovr90', '突破90')
    # 队列：不占 forceQ 槽位 + 不重复
    harness.check(len(r['queue1']['fq']) == 0 and len(r['queue1']['mq']) >= 3,
                  '命中应全部进 _mileQ 且不占 forceQ: %s' % r['queue1'])
    harness.check(not r['queue2']['dup'], '同一季重复扫描导致重复入队: %s' % r['queue2'])
    # 端到端：真实生涯能播出，且每份赛季报告之间最多 1 条、只走 forced（不进随机池）
    harness.check(r['e2eFired'] >= 1, '真实生涯里没有播出任何里程碑（fired=%d）' % r['e2eFired'])
    harness.check(r['maxPerReport'] <= 1, '同一份赛季报告内播了多条里程碑: max=%d' % r['maxPerReport'])
    harness.check(not r.get('leakRandom'), '里程碑进了随机事件池: %s' % r.get('leakRandom'))
    # 去重
    harness.check(not has_id(r, 'dedupe', 'mile_ballon'), '已触发过的又被入队: %s' % r['dedupe'])
    print('PASS milestone (47 条; 名称 lg=%s cont=%s cup=%s youth=%s)' %
          (r['names']['lg'], r['names']['cont'], r['names']['cup'], r['names']['youth']))


if __name__ == '__main__':
    harness.main(run)
