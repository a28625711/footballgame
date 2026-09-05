# 按排名的胜负平校准 bench：在引擎里跑 EPL 多季，聚合每排名位次的 W/D/L/分，
# 以及全部比赛的主胜/平/客胜率、场均进球，用于与现实锚点对比调参 _matchSim。
import json
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tests'))
import harness

LOOP = r'''
(function(){
var out={tables:[],h:0,d:0,a:0,g:0,n:0};
var au=window.__SIMTEST.start('normal',{name:'c',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},%SEED%);
au.ovr=%OVR%;au.maxOvr=92;au.money=2000;au.age=24;au.phase='career';
au.teamId=%TEAM%;au.role='starter';au.contractLeft=2;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
for(var yr=0; yr<%SEASONS% && au.phase==='career'; yr++){
  try{ window.SIM.doPeriod(); }catch(e){ out.errs=String(e).slice(0,150); break; }
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
  var st=window.__SIMTEST.state();
  if(st.lgTables&&st.lgTables.epl){
    var rows=[];st.lgTables.epl.forEach(function(r){rows.push({pos:r.pos,w:r.w,d:r.d,l:r.l,gf:r.gf,ga:r.ga,pts:r.pts});});
    out.tables.push(rows);
  }
  /* 当季赛程聚合主客胜平（lgFx 仅当季，采集最后一季） */
  if(st.lgFx&&st.lgFx.data&&st.lgFx.data.epl&&yr===%SEASONS%-1){
    st.lgFx.data.epl.forEach(function(rd){rd.forEach(function(m){
      out.n++;out.g+=m[2]+m[3];
      if(m[2]>m[3])out.h++;else if(m[2]<m[3])out.a++;else out.d++;
    });});
  }
}
return JSON.stringify(out);
})()
'''


def run_block(mr, team, seasons, seed, ovr=76):
    js = (LOOP.replace('%TEAM%', "'%s'" % team).replace('%SEASONS%', str(seasons))
              .replace('%SEED%', str(seed)).replace('%OVR%', str(ovr)))
    return json.loads(mr.eval(js))


def aggregate(runs):
    by_pos = {}
    for r in runs:
        for rows in r['tables']:
            for row in rows:
                by_pos.setdefault(row['pos'], []).append(row)
    n = sum(len(v) for v in by_pos.values())
    print('pos | avgW  avgD  avgL  avgPts  avgGF  avgGA   (team-seasons=%d)' % n)
    for pos in sorted(by_pos):
        v = by_pos[pos]
        w = sum(x['w'] for x in v) / len(v)
        d = sum(x['d'] for x in v) / len(v)
        l = sum(x['l'] for x in v) / len(v)
        p = sum(x['pts'] for x in v) / len(v)
        gf = sum(x['gf'] for x in v) / len(v)
        ga = sum(x['ga'] for x in v) / len(v)
        print('%3d | %5.1f %5.1f %5.1f %6.1f  %5.1f  %5.1f' % (pos, w, d, l, p, gf, ga))
    hn = sum(r['h'] for r in runs); dn = sum(r['d'] for r in runs)
    an = sum(r['a'] for r in runs); gn = sum(r['n'] for r in runs)
    gg = sum(r['g'] for r in runs)
    if gn:
        print('H/D/A: %.1f%% / %.1f%% / %.1f%%   goals/game %.2f  (matches %d)'
              % (hn / gn * 100, dn / gn * 100, an / gn * 100, gg / gn, gn))


if __name__ == '__main__':
    mr = harness.new_engine()
    runs = []
    for i, seed in enumerate([101, 202, 303, 404]):
        r = run_block(mr, ['mci', 'new', 'ful', 'bur'][i], 10, seed)
        if 'errs' in r:
            print('ERR seed', seed, r['errs'])
        runs.append(r)
    aggregate(runs)
