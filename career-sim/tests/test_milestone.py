# -*- coding: utf-8 -*-
# 里程碑结算事件回归（71 条）：季末 _promoReleg 末尾 _milestoneScan() 扫描一次。
# 语义（2026-10-01 起）：本季触发的里程碑只保留优先级最高的一条，由
#   _emitReportOrMilestone 在当季报告前先播；其余低优先级直接丢弃（不排队、不延后），
#   但它们的"一次锁存"flag 仍然写死，避免下次重复。
# 这里逐类构造状态、直调 promoReleg，校验：
#   1) 各类里程碑都能命中；2) 同季多命中只留最高优先级、其余丢弃且已锁存；
#   3) 不占 forceQ 槽位、同季重扫不重复；4) 跳档只播最高一档；5) registry 完整性。
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
'mile_ovr90','mile_promote','mile_giant_down','mile_releg','mile_rival_down',
'mile_wc_r16','mile_wc_qf','mile_wc_sf','mile_wc_final','mile_asia',
'mile_ballon_streak2','mile_ballon_streak3','mile_boot3','mile_boot5','mile_lg_streak3','mile_lg_streak5',
'mile_goal500','mile_goal700','mile_goal1000','mile_apps700','mile_apps1000',
'mile_caps150','mile_caps200','mile_assist200','mile_assist300','mile_cs200','mile_cs300',
'mile_trophy40','mile_trophy50'];
function mk(seed,tid,lg,pre){
  var st=window.__SIMTEST.start('normal',{name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},seed);
  st.age=27;st.phase='career';st.role='star';st.money=1200;st.ovr=88;st.maxOvr=80;
  st.teamId=tid||'mci';st.leagueId=lg||'epl';
  st.flags=pre?JSON.parse(JSON.stringify(pre)):{};st.usedEvents={};st.forceQ=[];st._mileQ=[];st.pending=null;st.bigQ=[];st._newsQ=[];st.seasons=[];
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
/* ── 奖项类（同季多命中：只留最高优先级，其余丢弃但锁存） ── */
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
/* 欧冠累计/连庄：先锁存更早的，隔离出目标一条 */
function ucl(st,ages,team){return ages.map(function(a){return {'name':'欧冠冠军','age':a,'team':team||'曼城'};});}
var s9=mk(19,null,null,{_mileFirstUcl:1,_mileUcl2:1});s9.trophies=ucl(s9,[s9.age-2,s9.age-1,s9.age]);R.ucl3=go(s9);
var s10=mk(20,null,null,{_mileFirstUcl:1,_mileUcl2:1,_mileUclTeam:'曼城'});s10.trophies=ucl(s10,[s10.age-4,s10.age-3,s10.age-2,s10.age-1,s10.age]);R.ucl5=go(s10);
var s11=mk(21);s11.trophies=ucl(s11,[s11.age-2,s11.age-1,s11.age],'皇马');s11.trophies[1]['team']='曼城';R.ucl3mix=go(s11);
/* 横扫 / 三冠（隔离） */
var s12=mk(22,null,null,{_mileBallon1:1,_mileFirstUcl:1,_mileFirstLg:'x'});
s12.trophies=[{'name':'欧冠冠军','age':s12.age,'team':'曼城'},{'name':_lg,'age':s12.age,'team':'曼城'}];s12.awards=[{'name':'金球奖','age':s12.age}];R.sweep=go(s12);
var s13=mk(23,null,null,{_mileFirstLg:'x',_mileFirstCup:'x',_mileFirstSuper:'x'});
s13.trophies=[{'name':_lg,'age':s13.age,'team':'曼城'},{'name':_cup,'age':s13.age,'team':'曼城'},{'name':_sup,'age':s13.age,'team':'曼城'}];R.treble=go(s13);
/* ── 黑马 / 升降 / 时代 ── */
var s14=mk(24,'ful','epl');R.weak=go(s14,{'leaguePos':1});
var s15=mk(25,'mci','epl');R.strong=go(s15,{'leaguePos':1});
var s16=mk(26,'mci','epl');R.promote=go(s16,{'move':'升上英超'});
var s17=mk(27,'mci','epl');R.releg=go(s17,{'move':'降入英冠'});
var s18=mk(28,'mci','epl');s18._newsQ=[{'t':'releg','tid':'bay'}];R.giant=go(s18);
var s19=mk(29,'rma','liga',{_mileGiant:'拜仁'});s19._newsQ=[{'t':'releg','tid':'bar'}];R.rival=go(s19);
/* ── 纪录阶梯 ── */
var s20=mk(30);R.g45=go(s20,{'goals':45});
var s21=mk(31);R.g25=go(s21,{'goals':25});
var s22=mk(32);s22.totals={'apps':0,'goals':250,'assists':0,'cs':0,'ga':0};R.cg250=go(s22);
/* 生涯纪录拆成单条，避免同季多命中互相盖 */
function rec(seed,mut){var st=mk(seed);mut(st);return go(st);}
R.apps500=rec(33,function(st){st.totals={'apps':520,'goals':0,'assists':0,'cs':0,'ga':0};});
R.assist100=rec(34,function(st){st.totals={'apps':0,'goals':0,'assists':120,'cs':0,'ga':0};});
R.cs100=rec(35,function(st){st.totals={'apps':0,'goals':0,'assists':0,'cs':110,'ga':0};});
R.caps100=rec(36,function(st){st.caps=120;});
R.earn=rec(37,function(st){st.careerEarnings=12000;});
var s24=mk(38);s24.trophies=[];for(var i=0;i<22;i++)s24.trophies.push({'name':'某杯冠军','age':s24.age-1,'team':'x'});R.tr22=go(s24);
var s25=mk(39);R.a15=go(s25,{'assists':18});
/* 连续 3 季 20+（先锁存 20 球档，隔离出连续档） */
var s26=mk(40,null,null,{_mileG20:1});s26.seasons=[{'age':24,'goals':21},{'age':25,'goals':22},{'age':26,'goals':23}];R.streak=go(s26,{'goals':24});
/* ── 身份 ── */
var s27=mk(41);s27.clubsPlayed=['a','b'];R.trans=go(s27);
var s28=mk(42,null,null,{_mileTrans:1});s28.clubsPlayed=['a','b','c'];R.clubs3=go(s28);
var s29=mk(43);s29.maxOvr=91;R.ovr90=go(s29);
/* ── 世界杯名次 / 亚洲杯（natRuns） ── */
function nat(seed,comp,stage){var st=mk(seed);st.natRuns=[{'age':st.age,'comp':comp,'stage':stage}];return go(st);}
R.wcR16=nat(50,'世界杯','止步十六强');
R.wcQF=nat(51,'世界杯','止步八强');
R.wcSF=nat(52,'世界杯','止步四强');
R.wcFinal=nat(53,'世界杯','亚军');
R.asia=nat(54,'亚洲杯','冠军');
/* ── 金球连庄 / 多个金靴 / 联赛连冠 ── */
var s55=mk(55);s55.awards=[{'name':'金球奖','age':s55.age-1},{'name':'金球奖','age':s55.age}];R.bstreak2=go(s55);
var s56=mk(56,null,null,{_mileBallon3:1,_mileBallonS2:1});
s56.awards=[{'name':'金球奖','age':s56.age-2},{'name':'金球奖','age':s56.age-1},{'name':'金球奖','age':s56.age}];R.bstreak3=go(s56);
var s57=mk(57,null,null,{_mileLgBoot:1});s57.awards=[{'name':'德甲金靴','age':s57.age-2},{'name':'德甲金靴','age':s57.age-1},{'name':'德甲金靴','age':s57.age}];R.boot3=go(s57);
var s57b=mk(57,null,null,{_mileLgBoot:1});s57b.awards=[{'name':'德甲金靴','age':s57b.age-4},{'name':'德甲金靴','age':s57b.age-3},{'name':'德甲金靴','age':s57b.age-2},{'name':'德甲金靴','age':s57b.age-1},{'name':'德甲金靴','age':s57b.age}];R.boot5=go(s57b);
var s58=mk(58,'cn-sh','csl',{_mileFirstLg:'x'});s58.trophies=[{'name':_lg,'age':s58.age-2,'team':'曼城'},{'name':_lg,'age':s58.age-1,'team':'曼城'},{'name':_lg,'age':s58.age,'team':'曼城'}];R.lgS3=go(s58);
var s58b=mk(59,'cn-sh','csl',{_mileFirstLg:'x'});s58b.trophies=[];for(var _q=4;_q>=0;_q--)s58b.trophies.push({'name':_lg,'age':s58b.age-_q,'team':'曼城'});R.lgS5=go(s58b);
/* ── 更高的生涯纪录阶梯 ── */
R.g500=rec(60,function(st){st.totals={'apps':0,'goals':520,'assists':0,'cs':0,'ga':0};});
R.g700=rec(61,function(st){st.totals={'apps':0,'goals':720,'assists':0,'cs':0,'ga':0};});
R.g1000=rec(62,function(st){st.totals={'apps':0,'goals':1020,'assists':0,'cs':0,'ga':0};});
R.a700=rec(63,function(st){st.totals={'apps':720,'goals':0,'assists':0,'cs':0,'ga':0};});
R.a1000=rec(64,function(st){st.totals={'apps':1020,'goals':0,'assists':0,'cs':0,'ga':0};});
R.cap150=rec(65,function(st){st.caps=160;});
R.cap200=rec(66,function(st){st.caps=210;});
R.as200=rec(67,function(st){st.totals={'apps':0,'goals':0,'assists':220,'cs':0,'ga':0};});
R.as300=rec(68,function(st){st.totals={'apps':0,'goals':0,'assists':320,'cs':0,'ga':0};});
R.cs200=rec(69,function(st){st.totals={'apps':0,'goals':0,'assists':0,'cs':220,'ga':0};});
R.cs300=rec(70,function(st){st.totals={'apps':0,'goals':0,'assists':0,'cs':320,'ga':0};});
R.tr42=rec(71,function(st){st.trophies=[];for(var i=0;i<42;i++)st.trophies.push({'name':'某杯冠军','age':st.age-1,'team':'x'});});
R.tr52=rec(72,function(st){st.trophies=[];for(var i=0;i<52;i++)st.trophies.push({'name':'某杯冠军','age':st.age-1,'team':'x'});});
/* ── 同季多命中：只留一条、不占 forceQ、重扫不重复 ── */
var s30=mk(44);s30.trophies=ucl(s30,[s30.age-4,s30.age-3,s30.age-2,s30.age-1,s30.age]);
var r30=go(s30);R.queue1={fq:r30.fq,mq:r30.mq};
var r30b=go(s30);R.queue2={fq:r30b.fq,mq:r30b.mq};
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
var s31=mk(45);s31.awards=[{'name':'金球奖','age':s31.age}];s31.flags={'mk_dummy':1};s31.usedEvents={'mile_ballon':0x1};R.dedupe=go(s31);
/* ── registry ── */
var defs={};window.EVENTS.forEach(function(e){defs[e.id]=e;});
R.missing=[];R.bad=[];ALL.forEach(function(id){var e=defs[id];if(!e)R.missing.push(id);
  else if(typeof e['when']!=='function'||!(e['options']&&e['options'].length))R.bad.push(id);});
R.total=window.EVENTS.length;
R.descFn=['mile_first_league','mile_first_cont','mile_first_cup','mile_first_super','mile_ucl3','mile_lg_weak','mile_promote','mile_releg','mile_giant_down','mile_rival_down'].filter(function(id){return defs[id]&&typeof defs[id]['desc']==='function';});
return JSON.stringify(R);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))

    def has_id(case, mid):
        d = r.get(case) or {}
        return mid in (d.get('fq') or []) or mid in (d.get('mq') or [])

    def has(case, mid, label):
        harness.check(has_id(case, mid), '%s: 缺 %s (fq=%s mq=%s)'
                      % (label, mid, r.get(case, {}).get('fq'), r.get(case, {}).get('mq')))

    def dropped(case, mid, flag, label):
        d = r.get(case) or {}
        harness.check(not has_id(case, mid) and bool((d.get('f') or {}).get(flag)),
                      '%s: %s 应被丢弃但锁存 %s (mq=%s f=%s)'
                      % (label, mid, flag, d.get('mq'), (d.get('f') or {}).get(flag)))

    harness.check(not r['missing'], 'registry 缺里程碑: %s' % r['missing'])
    harness.check(not r['bad'], '里程碑事件结构异常: %s' % r['bad'])
    harness.check(len(r['descFn']) == 10, 'desc 应为函数的条数不对: %s' % r['descFn'])
    harness.check(r['total'] >= 470, 'EVENTS 数量异常（应 >=470）: %d' % r['total'])

    has('ballon', 'mile_ballon', '首座金球')
    has('ballon3', 'mile_ballon3', '第三座金球')
    # 奖项A：金靴(15) / 亚洲足球先生(16) / 金手套(17) 同季 → 只播金靴，其余丢弃但锁存
    has('awardsA', 'mile_euro_boot', '奖项A-金靴')
    dropped('awardsA', 'mile_afcpoy', '_mileAfc', '奖项A')
    dropped('awardsA', 'mile_glove', '_mileGlove', '奖项A')
    # 奖项B：金靴(18) / 最佳(19) → 只播金靴
    has('awardsB', 'mile_league_boot', '奖项B')
    dropped('awardsB', 'mile_league_mvp', '_mileLgMvp', '奖项B')
    has('firstLg', 'mile_first_league', '首座联赛')
    has('firstCont', 'mile_first_cont', '首座洲际')
    # 杯 + 超级杯 同季 → 只播杯赛，超级杯丢弃但锁存
    has('firstCupSup', 'mile_first_cup', '首座杯赛')
    dropped('firstCupSup', 'mile_first_super', '_mileFirstSuper', '杯+超级杯')
    has('firstYouth', 'mile_first_youth', '首座青年队')
    has('ucl3', 'mile_ucl3', '欧冠三连')
    has('ucl5', 'mile_ucl5', '第五座欧冠')
    harness.check(not has_id('ucl3mix', 'mile_ucl3'), '换队三连被误判')
    has('sweep', 'mile_sweep', '赛季横扫')
    has('treble', 'mile_dom_treble', '国内三冠王')
    has('weak', 'mile_lg_weak', '黑马夺冠')
    harness.check(not has_id('strong', 'mile_lg_weak'), '豪门夺冠被误判')
    has('promote', 'mile_promote', '升级')
    has('releg', 'mile_releg', '降级')
    has('giant', 'mile_giant_down', '豪门降级')
    has('rival', 'mile_rival_down', '死敌降级')
    # 阶梯：45 球只播最高一档 40
    harness.check(has_id('g45', 'mile_goals40') and not has_id('g45', 'mile_goals30'),
                  '45 球未只播最高档: %s' % r['g45'])
    harness.check(bool(r['g45']['f'].get('_mileG20')) and bool(r['g45']['f'].get('_mileG30')),
                  '低档未锁存（防重复）')
    has('g25', 'mile_goals20', '单季20球')
    has('cg250', 'mile_goal200', '生涯200球')
    harness.check(not has_id('cg250', 'mile_goal100'), '250 球误播 100 档')
    has('apps500', 'mile_apps500', '生涯500出场')
    has('assist100', 'mile_assist100', '生涯100助攻')
    has('cs100', 'mile_cs100', '生涯100零封')
    has('caps100', 'mile_caps100', '国家队100场')
    has('earn', 'mile_earn1e8', '生涯收入过亿')
    has('tr22', 'mile_trophy20', '第20座奖杯')
    has('a15', 'mile_assist15', '单季15助攻')
    has('streak', 'mile_streak20', '连续3季20+')
    has('trans', 'mile_transfer1', '首次转会')
    has('clubs3', 'mile_clubs3', '第三家俱乐部')
    has('ovr90', 'mile_ovr90', '突破90')
    # 世界杯名次 / 亚洲杯
    has('wcR16', 'mile_wc_r16', '世界杯十六强')
    has('wcQF', 'mile_wc_qf', '世界杯八强')
    has('wcSF', 'mile_wc_sf', '世界杯四强')
    has('wcFinal', 'mile_wc_final', '世界杯亚军')
    harness.check(not has_id('wcR16', 'mile_wc_qf'), '十六强误播八强')
    has('asia', 'mile_asia', '亚洲杯冠军')
    # 金球连庄 / 多金靴 / 联赛连冠
    has('bstreak2', 'mile_ballon_streak2', '金球连庄')
    has('bstreak3', 'mile_ballon_streak3', '金球三连')
    has('boot3', 'mile_boot3', '第三座金靴')
    has('boot5', 'mile_boot5', '第五座金靴')
    has('lgS3', 'mile_lg_streak3', '联赛三连冠')
    has('lgS5', 'mile_lg_streak5', '联赛五连冠')
    # 更高的生涯纪录
    has('g500', 'mile_goal500', '生涯500球')
    has('g700', 'mile_goal700', '生涯700球')
    has('g1000', 'mile_goal1000', '生涯1000球')
    has('a700', 'mile_apps700', '生涯700场')
    has('a1000', 'mile_apps1000', '生涯1000场')
    has('cap150', 'mile_caps150', '国家队150场')
    has('cap200', 'mile_caps200', '国家队200场')
    has('as200', 'mile_assist200', '生涯200助攻')
    has('as300', 'mile_assist300', '生涯300助攻')
    has('cs200', 'mile_cs200', '生涯200零封')
    has('cs300', 'mile_cs300', '生涯300零封')
    has('tr42', 'mile_trophy40', '第40座奖杯')
    has('tr52', 'mile_trophy50', '第50座奖杯')
    # 同季多命中：只留一条最高优先级 + 不占 forceQ + 重扫不重复
    harness.check(r['queue1']['mq'] == ['mile_first_ucl'],
                  '同季多命中应只留最高优先级一条（首夺欧冠）且不占 forceQ: %s' % r['queue1'])
    harness.check(r['queue2']['mq'] == [],
                  '重扫不应再入队（已锁存/不排队）: %s' % r['queue2'])
    # 端到端：真实生涯能播出，且每份赛季报告之间最多 1 条、只走 forced（不进随机池）
    harness.check(r['e2eFired'] >= 1, '真实生涯里没有播出任何里程碑（fired=%d）' % r['e2eFired'])
    harness.check(r['maxPerReport'] <= 1, '同一份赛季报告内播了多条里程碑: max=%d' % r['maxPerReport'])
    harness.check(not r.get('leakRandom'), '里程碑进了随机事件池: %s' % r.get('leakRandom'))
    # 去重
    harness.check(not has_id('dedupe', 'mile_ballon'), '已触发过的又被入队: %s' % r['dedupe'])
    print('PASS milestone (71 条; 名称 lg=%s cont=%s cup=%s youth=%s)' %
          (r['names']['lg'], r['names']['cont'], r['names']['cup'], r['names']['youth']))


if __name__ == '__main__':
    harness.main(run)
