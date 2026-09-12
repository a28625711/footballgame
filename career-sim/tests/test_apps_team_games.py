# -*- coding: utf-8 -*-
"""出场数 = 角色出勤率 × 球队当季真实总场次（联赛+国内杯+洲际）回归。

历史 bug：apps 从 ROLES[role].apps 固定区间掷骰（star 44-56 / starter 34-46），
与球队真实场次无关，导致中超(30场)的绝对核心显示 44-56 场，出场数超过球队总场次。
修复后逐赛季断言 apps <= teamGames，且各角色出场仍有梯度。
"""
import json
import harness

JS = """
(function(){
var out={err:null, rows:[], viol:[]};
function resolve(p){
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } else { window.__SIMTEST.cont(); } return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){
    if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); }
    else{ window.__SIMTEST.option(p.canStay?'stay':'retire'); }
    return;
  }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
function career(seed){
  var st=window.__SIMTEST.start('normal',%NEW_PLAYER%,seed);
  st.talent=1.25;
  var g=0, lastLen=(st.seasons||[]).length;
  while(g++<20000){
    if(st.phase==='youth'){
      if((st.talent||0)<1.3) st.talent=1.3;
      if(st.age>=14 && (!st.ovr || st.ovr<52)){ st.ovr=52; st.maxOvr=Math.max(st.maxOvr||0,92); }
    }
    var p=st.pending;
    if(!p){
      if(st.phase==='summary'||st.phase==='done') break;
      window.SIM.nextStep();
      continue;
    }
    try{ resolve(p); }catch(e){ out.err='seed='+seed+' '+p.type+': '+String(e).slice(0,150); return; }
    var ss=st.seasons||[];
    for(var i=lastLen;i<ss.length;i++){
      var r=ss[i];
      if(r.apps==null) continue;
      out.rows.push({lg:r.league,role:r.role,apps:r.apps,tg:r.teamGames||0,g:r.goals,a:r.assists});
      if(r.teamGames!=null && r.apps>r.teamGames)
        out.viol.push({seed:seed,age:r.age,league:r.league,role:r.role,apps:r.apps,tg:r.teamGames});
    }
    lastLen=ss.length;
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; break; }
  }
}
career(101); career(202); career(303); career(404);
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    rows = r['rows']
    if not rows:
        raise harness.Fail('no player-seasons collected')
    # 1) 场次不得超过球队真实总场次
    if r['viol']:
        raise harness.Fail('%d seasons with apps > teamGames, e.g. %r' % (len(r['viol']), r['viol'][0]))
    withtg = [x for x in rows if x['tg'] > 0]
    if len(withtg) < len(rows) * 0.8:
        raise harness.Fail('teamGames missing on %d/%d seasons' % (len(rows) - len(withtg), len(rows)))
    # 2) 角色梯度：star 平均出场应明显高于最低档角色
    agg = {}
    for x in rows:
        d = agg.setdefault(x['role'], {'n': 0, 'apps': 0})
        d['n'] += 1; d['apps'] += x['apps']
    star = agg.get('star')
    if not star:
        raise harness.Fail('missing star samples: %r' % list(agg))
    others = [v['apps'] / v['n'] for k, v in agg.items() if k != 'star']
    if not others:
        raise harness.Fail('no non-star role samples: %r' % list(agg))
    star_avg = star['apps'] / star['n']; low_avg = min(others)
    if not (star_avg > low_avg + 5):
        raise harness.Fail('role gradient too flat: star=%.1f low=%.1f' % (star_avg, low_avg))
    # 3) 合理性：单个赛季出场不超过 70（现实中单季上限）
    over = [x for x in rows if x['apps'] > 70]
    if over:
        raise harness.Fail('apps > 70 in a season: %r' % over[0])
    print('PASS apps_team_games (%d seasons, star avg %.1f, low avg %.1f, 0 violations)'
          % (len(rows), star_avg, low_avg))


if __name__ == '__main__':
    harness.main(run)
