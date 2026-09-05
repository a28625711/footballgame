# 联赛真实化校准 bench（PLAN-league-realism.md Step 6）
# A 部分：多季快照 → 各联赛冠军分布/连冠率（teamDev 起落与防失控验证）
# B 部分：每联赛放一名 OVR78 球员 → 平局率、场均进球、积分水平（_matchSim 参数与风格乘数校准）
import sys, json
sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness

LOOP = r'''
(function(){
var out={champs:[],rows:[]};
var au=window.__SIMTEST.start('normal',{name:'b',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},900+%SEED%);
au.ovr=%OVR%;au.maxOvr=92;au.money=2000;au.age=24;au.phase='career';
au.teamId=%TEAM%;au.role='starter';au.contractLeft=1;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
for(var yr=0; yr<%SEASONS% && au.phase==='career'; yr++){
  var s0=au.seasons.length;
  try{ window.SIM.doPeriod(); }catch(e){ out.errs=String(e).slice(0,120); break; }
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
  if(au.seasons.length>s0){
    var st=window.__SIMTEST.state();
    if(st.lastTables){
      var snap={};
      for(var lg in st.lastTables) snap[lg]=st.lastTables[lg][0];
      out.champs.push(snap);
    }
    for(var i=s0;i<au.seasons.length;i++){
      var r=au.seasons[i];
      out.rows.push({lg:r.leagueId,pos:r.leaguePos,w:r.leagueW,d:r.leagueD,l:r.leagueL,gf:r.leagueGF,ga:r.leagueGA,pts:r.leaguePts});
    }
  }
}
return JSON.stringify(out);
})()
'''

def run_block(mr, team, seasons, seed, ovr):
    js = (LOOP.replace('%TEAM%', "'%s'" % team).replace('%SEASONS%', str(seasons))
              .replace('%SEED%', str(seed)).replace('%OVR%', str(ovr)))
    return json.loads(mr.eval(js))

def main():
    mr = harness.new_engine()
    # 联赛清单与每联赛取一支 rep=2 的中游队
    leagues = json.loads(mr.eval("(function(){var o={};window.DATA.LEAGUES.forEach(function(l){o[l.id]={name:l.name,str:l.str};});return JSON.stringify(o);})()"))
    mid_team = json.loads(mr.eval("""
    (function(){var o={};window.DATA.TEAMS.forEach(function(t){
      if(t.rep===2&&(!o[t.league]))o[t.league]=t.id;});
      window.DATA.LEAGUES.forEach(function(l){if(!o[l.id]){var best=null;window.DATA.TEAMS.forEach(function(t){if(t.league===l.id&&(!best||t.rep<best.rep))best=t;});if(best)o[l.id]=best.id;}});
      return JSON.stringify(o);})()
    """))

    # A: 冠军分布（挑 6 个代表联赛跑 24 季）
    champ_watch = ['epl','liga','seri','bund','csl','jl','tur']
    champs = []
    errs = []
    for s in range(4):
        r = run_block(mr, mid_team[champ_watch[s % len(champ_watch)]], 10, 100 + s, 78)
        champs += r['champs']
        if 'errs' in r: errs.append(r['errs'])
    print('=== A. 冠军分布（%d 季快照） ===' % len(champs))
    if errs: print('errs:', errs)
    for lg in champ_watch:
        cnt = {}
        prev = None; maxStreak = 0; streak = 0
        for snap in champs:
            tid = snap.get(lg)
            if tid is None: continue
            cnt[tid] = cnt.get(tid, 0) + 1
            streak = streak + 1 if tid == prev else 1
            prev = tid
            maxStreak = max(maxStreak, streak)
        top = sorted(cnt.items(), key=lambda x: -x[1])
        name = lambda tid: (json.loads(mr.eval('(function(){var t=null;window.DATA.TEAMS.forEach(function(x){if(x.id===%s)t=x;});return JSON.stringify(t?t.id+"("+t.name+")":"?");})()' % ('"%s"' % tid if isinstance(tid, str) else tid))))
        tot = sum(cnt.values())
        line = ', '.join('%s x%d' % (name(t), c) for t, c in top[:4])
        print('  %-5s 领跑: %s | 最大连冠 %d' % (lg, line if top else '无数据', maxStreak))

    # B: 每联赛平局率/场均进球/中游队积分
    print('=== B. 各联赛比赛环境（OVR78 球员所在中游队, 每队 6 季） ===')
    rows_all = {}
    for i, lg in enumerate(sorted(leagues)):
        r = run_block(mr, mid_team[lg], 6, 500 + i, 78)
        rows = r['rows']
        rows[lg] if False else None
        rr = [x for x in r['rows'] if x['lg'] == lg]
        if not rr: continue
        g = sum(x['w'] + x['d'] + x['l'] for x in rr)
        if g == 0: continue
        dr = sum(x['d'] for x in rr) / g
        gg = sum(x['gf'] + x['ga'] for x in rr) / (2.0 * g)
        pts = sum(x['pts'] for x in rr) / len(rr)
        pos = sum(x['pos'] for x in rr) / len(rr)
        rows_all[lg] = (dr, gg, pts, pos)
        print('  %-5s %-6s 平局率 %.1f%%  场均进球 %.2f  中游队均分 %.1f  均排位 %.1f'
              % (lg, leagues[lg]['name'], dr * 100, gg, pts, pos))

if __name__ == '__main__':
    main()
