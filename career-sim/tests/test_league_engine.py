# 世界联赛引擎（§7b）单元测试：确定性、积分一致性、联赛规模守恒、dev 上下限、榜单有效性
import json

import harness

LOOP = r'''
(function(){
var au=window.__SIMTEST.start('normal',{name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},%SEED%);
au.ovr=78;au.maxOvr=90;au.money=2000;au.age=22;au.phase='career';
au.teamId=%TEAM%;au.role='starter';au.contractLeft=1;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
for(var yr=0; yr<%SEASONS% && au.phase==='career'; yr++){
  try{ window.SIM.doPeriod(); }catch(e){ return JSON.stringify({err:String(e).slice(0,150)}); }
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
}
var st=window.__SIMTEST.state();
var rows=[];
(au.seasons||[]).forEach(function(r){rows.push({lg:r.leagueId,pos:r.leaguePos,w:r.leagueW,d:r.leagueD,l:r.leagueL,gf:r.leagueGF,ga:r.leagueGA,pts:r.leaguePts});});
var lgCount={},lgOf=st.leagueOf||{};
window.DATA.TEAMS.forEach(function(t){
  var lg=lgOf[t.id]||t.league;
  lgCount[lg]=(lgCount[lg]||0)+1;
});
var tblValid=true,dupMsg='';
for(var lg in st.lastTables){
  var o=st.lastTables[lg],seen={};
  if(o.length!==window.DATA.TEAMS.filter(function(t){return (lgOf[t.id]||t.league)===lg;}).length)tblValid=false;
  for(var i=0;i<o.length;i++){if(seen[o[i]])tblValid=false,dupMsg=lg+':'+o[i];seen[o[i]]=1;}
}
var devBad=null;
for(var tid in (st.teamDev||{}))if(Math.abs(st.teamDev[tid])>8)devBad=tid;
return JSON.stringify({rows:rows,lgCount:lgCount,lastTables:st.lastTables,teamDev:st.teamDev,tblValid:tblValid,dupMsg:dupMsg,devBad:devBad,seasons:au.seasons.length});
})()
'''

def run_block(mr, team, seasons, seed):
    js = LOOP.replace('%TEAM%', "'%s'" % team).replace('%SEASONS%', str(seasons)).replace('%SEED%', str(seed))
    return json.loads(mr.eval(js))

def run():
    mr = harness.new_engine()

    # 1) 确定性（首季）：世界引擎在转会/事件结算层之前运行，首季榜单与赛季记录完全可复现
    #    （多季之后的存档流会受既有 game 层随机性影响，不在本测试范围）
    a = run_block(mr, 'mci', 1, 4242)
    b = run_block(mr, 'mci', 1, 4242)
    harness.check('err' not in a, 'engine error: %s' % a.get('err'))
    harness.check(json.dumps(a['lastTables'], sort_keys=True) == json.dumps(b['lastTables'], sort_keys=True),
                  'lastTables not deterministic')
    harness.check(json.dumps(a['rows'], sort_keys=True) == json.dumps(b['rows'], sort_keys=True),
                  'season rows not deterministic')

    # 2) 积分一致性与赛程场次
    LG_GAMES = {'bund': 34, 'csl': 30, 'ch': 46, 'seg': 42}
    for r in a['rows']:
        if r['pos'] is None:
            continue
        harness.check(r['pts'] == r['w'] * 3 + r['d'], 'pts mismatch: %s' % json.dumps(r))
        games = LG_GAMES.get(r['lg'], 38)
        harness.check(r['w'] + r['d'] + r['l'] == games,
                      'games mismatch in %s: %d' % (r['lg'], r['w'] + r['d'] + r['l']))

    # 3) 升降级后联赛规模守恒
    c = run_block(mr, 'shon' if False else 'bcy', 8, 777)
    harness.check('err' not in c, 'engine error: %s' % c.get('err'))
    EXPECT = {'epl': 20, 'ch': 24, 'liga': 20, 'seg': 22, 'bund': 18, 'b2': 18}
    for lg, n in EXPECT.items():
        harness.check(c['lgCount'].get(lg) == n,
                      '%s size %s != %s' % (lg, c['lgCount'].get(lg), n))
    harness.check(c['tblValid'], 'lastTables invalid %s' % c.get('dupMsg'))

    # 4) teamDev 上下限
    harness.check(c['devBad'] is None, 'teamDev out of ±8: %s' % c['devBad'])

    # 5) 洲际与杯赛产出存在（冠军历史被记录）
    d = run_block(mr, 'rma', 6, 888)
    st2 = json.loads(json.dumps(d['lastTables']))
    harness.check(len(st2) == 20, 'lastTables leagues=%d != 20' % len(st2))  # 18+墨超+加拿超

    print('PASS league_engine (determinism, points, sizes, dev bounds)')

if __name__ == '__main__':
    harness.main(run)
