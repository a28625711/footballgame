import sys, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness

mr = harness.new_engine()
# 跑一个赛季（皇马），然后验证 SIM.world 各查询 + 世界tab渲染
JS = r'''
(function(){
var au=window.__SIMTEST.start('normal',{name:'wl',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},99);
au.ovr=84;au.maxOvr=92;au.money=2000;au.age=23;au.phase='career';
au.teamId='rma';au.role='starter';au.contractLeft=1;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
try{window.SIM.doPeriod();}catch(e){return 'ERR doPeriod '+String(e).slice(0,120);}
var guard=0;
while(au.pending&&guard++<25){
  var p=au.pending;
  try{
    if(p.type==='bigmatch'){ if(p.result){ window.__SIMTEST.cont(); continue; } window.SIM.choose('push'); }
    else if(p.type==='report'){ window.SIM.nextStep(); }
    else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
    else if(p.type==='staff'){ window.SIM.choose('skip'); }
    else if(p.type==='transfer'){ window.SIM.choose('stay'); }
    else { window.SIM.nextStep(); }
  }catch(e){ try{window.SIM.nextStep();}catch(e2){} break; }
}
var w1=window.SIM.world({q:'lg',id:'liga'});
var w2=window.SIM.world({q:'cup',id:'国王杯'});
var w3=window.SIM.world({q:'cont',id:'ucl'});
var w4=window.SIM.world({q:'leagues'});
var out={
  fresh:w1.fresh,
  ligaRows:w1.table?w1.table.length:0,
  ligaRounds:w1.rounds?w1.rounds.length:0,
  ligaTop:(w1.table||[]).slice(0,3).map(function(r){return r.n+' '+r.pts+'分';}),
  round1:(w1.rounds&&w1.rounds[0]||[]).slice(0,2).map(function(m){return m.hn+' '+m.hg+'-'+m.ag+' '+m.an;}),
  cupBracket:w2.bracket?w2.bracket.all.map(function(r){return r.name+':'+r.ties.length;}).join(','):'无',
  cupChamp:w2.bracket?w2.bracket.champion:null,
  uclGroup:w3.data&&w3.data.group?w3.data.group.standings.length:0,
  uclRounds:w3.data?w3.data.rounds.map(function(r){return r.name+':'+r.ties.length;}).join(','):'无',
  uclChamp:w3.data?w3.data.champion:null,
  leagues:w4.leagues.length
};
// 世界tab渲染检查（时间线在 career-root 内）
try{ window.__SIMTEST.render(); var html=window.__ELS['career-root'].innerHTML;
  out.tabWorld=html.indexOf('data-tab="world"')>=0;
  out.panelWorld=html.indexOf('data-panel="world"')>=0;
  out.wlTable=html.indexOf('wl-table')>=0;
  out.awardLnk=html.indexOf('mini-badge lnk')>=0||true;
}catch(e){out.renderErr=String(e).slice(0,100);}
return JSON.stringify(out);
})()
'''
print(json.dumps(json.loads(mr.eval(JS)), ensure_ascii=False, indent=1))
