# 烟雾验证（非全量回归）：起生涯跑 1 季，检查 SIM.world 各查询的数据形状
# 与渲染器（_wlRounds/_grpBox/_wlBracket）预期的兼容性：无 undefined 队名、
# 二维/扁平赛程、签表 tie 字段完整。
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tests'))
import harness

SEED = 4242

SEASON = r'''
(function(){
var au=window.__SIMTEST.start('normal',{name:'w',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},%SEED%);
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
/* 联赛：rounds 应为二维（每轮为 [h,a,hg,ag] 数组） */
var w=window.SIM.world({q:'lg',id:'seri'});
out.lgRounds=(w.rounds||[]).length;
out.lg2D=!!(w.rounds&&w.rounds[0]&&typeof w.rounds[0][0]==='object');
out.lgTupleBad=null;
if(w.rounds){for(var i=0;i<w.rounds.length;i++){var rd=w.rounds[i];
  for(var j=0;j<rd.length;j++){var m=rd[j];
    if(m.length!==4||m[0]==null||m[1]==null||m[2]==null||m[3]==null){out.lgTupleBad=i+':'+j;break;}
  }if(out.lgTupleBad)break;}}
out.lgNamesEmpty=(w.table||[]).filter(function(r){return !r.n;}).length;
/* 杯赛签表：tie 要么轮空(b) 要么 h/a 齐全 */
var cs=window.SIM.world({q:'cups'}).cups||[];
out.cupNames=cs.map(function(c){return c.name;});
var cup1=window.SIM.world({q:'cup',id:cs[0].name});
out.cupRounds=0;out.cupTieBad=null;
if(cup1.bracket&&cup1.bracket.all){cup1.bracket.all.forEach(function(rd){out.cupRounds++;
  rd.ties.forEach(function(t,idx){if(!t.b&&(!t.h||!t.a))out.cupTieBad=rd.name+':'+idx;});});}
out.cupChamp=cup1.bracket?cup1.bracket.champion:(cs[0].champ||null);
/* 洲际：瑞士轮扁平赛程 + standings n 字段 + KO rounds tie 完整 */
var ct=window.SIM.world({q:'cont',id:'ucl'});
out.contHasData=!!ct.data;
if(ct.data){
  var ms=ct.data.group.matches||[];
  out.contFlat=typeof ms[0]!=='object';
  out.contFlatLen=ms.length;out.contFlatOK=ms.length%4===0;
  var bad=null;for(var k=0;k<ms.length;k++)if(ms[k]==null)bad=k;
  out.contFlatHole=bad;
  out.contStandNoName=(ct.data.group.standings||[]).filter(function(r){return !r.n&&!r.name;}).length;
  out.contStandN=(ct.data.group.standings||[{}])[0].n!=null;
  out.contKoBad=null;
  (ct.data.rounds||[]).forEach(function(rd){rd.ties.forEach(function(t,idx){
    if(!t.b&&(!t.h||!t.a))out.contKoBad=rd.name+':'+idx;});});
  out.contChamp=ct.data.champion;
}
/* 国家队查询可用性 */
var nt=window.SIM.world({q:'nat'});
out.natYears=(nt.natYears||[]).length;
out.caps=nt.caps||0;
return JSON.stringify(out);
})()
'''.replace('%SEED%', str(SEED))


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(SEASON))
    if 'err' in res:
        raise harness.Fail(res['err'])
    print(json.dumps(res, ensure_ascii=False, indent=1))
    harness.check(res['seasons'] >= 1, 'no season completed')
    harness.check(res['lgRounds'] > 0 and res['lg2D'], 'league rounds not 2D')
    harness.check(res['lgTupleBad'] is None, 'bad league tuple %s' % res['lgTupleBad'])
    harness.check(res['lgNamesEmpty'] == 0, 'league table rows without name')
    harness.check(res['cupRounds'] > 0, 'no cup bracket rounds persisted')
    harness.check(res['cupTieBad'] is None, 'cup tie missing h/a: %s' % res['cupTieBad'])
    if res['contHasData']:
        harness.check(res['contFlat'] and res['contFlatOK'], 'cont swiss matches not flat%4')
        harness.check(res['contFlatHole'] is None, 'cont flat hole at %s' % res['contFlatHole'])
        harness.check(res['contStandNoName'] == 0, 'cont standings rows without n/name')
        harness.check(res['contStandN'], 'cont standings missing n field')
        harness.check(res['contKoBad'] is None, 'cont KO tie missing h/a: %s' % res['contKoBad'])
    harness.check(res['natYears'] > 0, 'no national team years')
    print('PASS smoke_world_panel')


if __name__ == '__main__':
    harness.main(run)
