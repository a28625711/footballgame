# -*- coding: utf-8 -*-
"""联赛赛制回归：每队场次 = 循环制式 rr × (队数-1)。

历史 bug：所有联赛都是双循环，美职联/阿甲 30 队 = 58 场（现实不踢完整双循环），
导致总场次/球员数据虚高。修复后按 _lgRR 表：mls/arg/mx 单循环、cpl 4 循环、kl 3 循环。
"""
import json
import harness

# lgId -> (teams, matches per team)
EXPECT = {
    'mls': (30, 29), 'arg': (30, 29), 'mx': (18, 17),
    'cpl': (8, 28), 'kl': (12, 33),
    'csl': (16, 30), 'cl1': (16, 30), 'epl': (20, 38),
    'bund': (18, 34), 'liga': (20, 38), 'l1': (18, 34),
    'ch': (24, 46), 'seg': (22, 42),
}

JS = """
(function(){
var au=window.__SIMTEST.start('normal',{name:'w',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},4242);
au.ovr=80;au.maxOvr=90;au.money=2000;au.age=22;au.phase='career';
au.teamId='rma';au.role='starter';au.contractLeft=2;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
for(var i=0;i<60;i++){
  if(au.lgFx&&au.lgFx.data)break;
  var p=au.pending;
  try{
    if(p){
      if(p.type==='bigmatch'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose('push');} }
      else if(p.type==='report'){ window.__SIMTEST.cont(); }
      else if(p.type==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.SIM.choose(0);} }
      else if(p.type==='staff'){ window.SIM.choose('skip'); }
      else if(p.type==='transfer'){ window.SIM.choose('stay'); }
      else { window.SIM.nextStep(); }
    } else { window.SIM.nextStep(); }
  }catch(e){ return JSON.stringify({err:String(e).slice(0,200)}); }
}
var lg=au['lgFx']&&au['lgFx']['data'];
if(!lg)return JSON.stringify({err:'no lgFx'});
var out={};
for(var id in lg){
  var counts={},rds=lg[id],r,j;
  for(r=0;r<rds.length;r++)for(j=0;j<rds[r].length;j++){
    var m=rds[r][j];counts[m[0]]=(counts[m[0]]||0)+1;counts[m[1]]=(counts[m[1]]||0)+1;
  }
  var vals=[];for(var k in counts)vals.push(counts[k]);
  var mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals);
  out[id]={teams:Object.keys(counts).length,perTeam:mn,consistent:mn===mx};
}
return JSON.stringify(out);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r.get('err'):
        raise harness.Fail(r['err'])
    bad = []
    for lg, (teams, per) in EXPECT.items():
        got = r.get(lg)
        if not got:
            bad.append('%s missing' % lg); continue
        if got['teams'] != teams or got['perTeam'] != per or not got['consistent']:
            bad.append('%s: got teams=%s perTeam=%s consistent=%s, want %d/%d'
                       % (lg, got['teams'], got['perTeam'], got['consistent'], teams, per))
    for lg, got in r.items():
        if not got['consistent']:
            bad.append('%s inconsistent per-team counts' % lg)
    if bad:
        raise harness.Fail('; '.join(bad))
    print('PASS league_formats (%d leagues; mls=%d/arg=%d/mx=%d/cpl=%d/kl=%d per team)'
          % (len(r), r['mls']['perTeam'], r['arg']['perTeam'], r['mx']['perTeam'],
             r['cpl']['perTeam'], r['kl']['perTeam']))


if __name__ == '__main__':
    harness.main(run)
