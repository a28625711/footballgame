# 世界面板数据形状回归（源自 tools/smoke_world_panel.py，正式化进套件）：
# 联赛二维赛程、杯赛签表 tie 完整、洲际瑞士轮扁平%4 + standings n 字段、国家队记录。
import json

import harness

SEASON = r'''
(function(){
var au=window.__SIMTEST.start('normal',{name:'w',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},4242);
au.ovr=80;au.maxOvr=90;au.money=2000;au.age=22;au.phase='career';
au.teamId='rma';au.role='starter';au.contractLeft=2;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
try{ window.SIM.doPeriod(); }catch(e){ return JSON.stringify({err:String(e).slice(0,200)}); }
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
var out={seasons:au.seasons.length};
var w=window.SIM.world({q:'lg',id:'seri'});
out.lgRounds=(w.rounds||[]).length;
out.lg2D=!!(w.rounds&&w.rounds[0]&&typeof w.rounds[0][0]==='object');
out.lgTupleBad=null;
if(w.rounds){for(var i=0;i<w.rounds.length;i++){var rd=w.rounds[i];
  for(var j=0;j<rd.length;j++){var m=rd[j];
    if(m.length!==4||m[0]==null||m[1]==null||m[2]==null||m[3]==null){out.lgTupleBad=i+':'+j;break;}
  }if(out.lgTupleBad)break;}}
out.lgNamesEmpty=(w.table||[]).filter(function(r){return !r.n;}).length;
var cs=window.SIM.world({q:'cups'}).cups||[];
out.cupCount=cs.length;
var cup1=window.SIM.world({q:'cup',id:cs[0].name});
out.cupRounds=0;out.cupTieBad=null;
if(cup1.bracket&&cup1.bracket.all){cup1.bracket.all.forEach(function(rd){out.cupRounds++;
  rd.ties.forEach(function(t,idx){if(!t.b&&(!t.h||!t.a))out.cupTieBad=rd.name+':'+idx;});});}
var ct=window.SIM.world({q:'cont',id:'ucl'});
out.contHasData=!!ct.data;
if(ct.data){
  var ms=ct.data.group.matches||[];
  out.contFlat=typeof ms[0]!=='object';
  out.contFlatOK=ms.length%4===0&&ms.length>0;
  out.contFlatHole=null;
  for(var k=0;k<ms.length;k++)if(ms[k]==null)out.contFlatHole=k;
  out.contStandNoName=(ct.data.group.standings||[]).filter(function(r){return !r.n&&!r.name;}).length;
  out.contKoBad=null;
  (ct.data.rounds||[]).forEach(function(rd){rd.ties.forEach(function(t,idx){
    if(!t.b&&!t.pd&&(!t.h||!t.a))out.contKoBad=rd.name+':'+idx;});});
}
var nt=window.SIM.world({q:'nat'});
out.natYears=(nt.natYears||[]).length;
return JSON.stringify(out);
})()
'''


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(SEASON))
    harness.check('err' not in res, res.get('err', ''))
    harness.check(res['seasons'] >= 1, 'no season completed')
    harness.check(res['lgRounds'] > 0 and res['lg2D'], 'league rounds not 2D')
    harness.check(res['lgTupleBad'] is None, 'bad league tuple %s' % res['lgTupleBad'])
    harness.check(res['lgNamesEmpty'] == 0, 'league table rows without name')
    harness.check(res['cupCount'] >= 16 and res['cupRounds'] > 0, 'cup bracket missing')
    harness.check(res['cupTieBad'] is None, 'cup tie missing h/a: %s' % res['cupTieBad'])
    if res['contHasData']:
        harness.check(res['contFlat'] and res['contFlatOK'], 'cont swiss matches not flat%4')
        harness.check(res['contFlatHole'] is None, 'cont flat hole at %s' % res['contFlatHole'])
        harness.check(res['contStandNoName'] == 0, 'cont standings rows without n/name')
        harness.check(res['contKoBad'] is None, 'cont KO tie missing h/a: %s' % res['contKoBad'])
    harness.check(res['natYears'] > 0, 'no national team years')
    print('PASS world_panel (lg 2D fixtures, cup bracket, cont swiss, nat records)')


if __name__ == '__main__':
    harness.main(run)
