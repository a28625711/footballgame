# 升降级标签对齐回归：世界→联赛 每季积分榜上的「降级/升级」标注必须与该季
# 真实发生的球队迁移一致，且历史榜归档标签与当季对齐（曾整体错位一年）。
import json

import harness

JS = r'''
(function(){
var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,779);
au.ovr=82; au.maxOvr=88; au.money=800; au.age=21; au.phase='career';
au.teamId='rma'; au.role='starter'; au.contractLeft=12; au.seasonsAtClub=1;
au.roleAdjust=0; au.guanxi=50; au.youthTeamId=null;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
for(var yr=0; yr<6 && au.phase==='career'; yr++){
  try{ window.SIM.doPeriod(); }catch(e){ return JSON.stringify({err:String(e).slice(0,200)}); }
  var guard=0;
  while(au.pending&&guard++<30){
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
var byS={};  /* season -> league -> [tids] */
(au.lgTblArch||[]).forEach(function(f){
  if(!f||!f.data)return;
  var o={};
  for(var k in f.data){ if(f.data[k]) o[k]=f.data[k].split(';').map(function(r){return r.split(',')[0];}); }
  byS[f.season]=o;
});
var down={},up={},moves={};
(au.lgMoves||[]).forEach(function(m){ if(m.dir==='down')(down[m.s]=down[m.s]||{})[m.tid]=1; else if(m.dir==='up')(up[m.s]=up[m.s]||{})[m.tid]=1; (moves[m.s]=moves[m.s]||{})[m.tid]=1; });
var bad=[];
var seasons=Object.keys(byS).map(Number).sort(function(a,b){return a-b;});
for(var i=0;i<seasons.length-1;i++){
  var s=seasons[i], sn=seasons[i+1];
  if(sn!==s+1)continue;
  var T=byS[s], N=byS[sn];
  var ds=down[s]||{}, us=up[s]||{}, ms=moves[s]||{};
  var inB={};
  for(var lg in N){ N[lg].forEach(function(t){ inB[t]=1; }); }
  for(var lg in T){
    var rows=T[lg], rows2=N[lg];
    if(!rows2)continue;
    var inA={},inB2={};
    rows.forEach(function(t){inA[t]=1;});
    rows2.forEach(function(t){inB2[t]=1;});
    /* S→S+1 真正离开/加入的队，必须带 s=S 的标（升或降） */
    for(var t2 in inA){ if(!inB2[t2]&&!ms[t2]) bad.push('left-untagged '+lg+' s'+s+' '+t2); }
    for(var t3 in inB2){ if(!inA[t3]&&!ms[t3]) bad.push('joined-untagged '+lg+' s'+s+' '+t3); }
  }
  /* 每个 s=S 的降级/升级标都必须对应一次真实迁移（跨全联赛判定） */
  for(var t4 in ds){ var ok=false;
    for(var lg2 in T){ if(T[lg2].indexOf(t4)>=0&&byS[sn][lg2]&&byS[sn][lg2].indexOf(t4)<0){ ok=true; break; } }
    if(!ok) bad.push('down-tag-no-away s'+s+' '+t4);
  }
  for(var t5 in us){ var ok2=false;
    for(var lg3 in T){ if(T[lg3].indexOf(t5)<0&&byS[sn][lg3]&&byS[sn][lg3].indexOf(t5)>=0){ ok2=true; break; } }
    if(!ok2) bad.push('up-tag-no-join s'+s+' '+t5);
  }
}
function inS(arr,t){ return arr.indexOf(t)>=0; }
return JSON.stringify({bad:bad.slice(0,20),nSeasons:seasons.length});
})()
'''.replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(JS))
    if 'err' in res:
        raise harness.Fail('err: %s' % res['err'])
    if res.get('bad'):
        raise harness.Fail('misaligned promo/releg tags: %s' % '; '.join(res['bad'][:5]))
    harness.check(res['nSeasons'] >= 6, 'too few archived seasons: %d' % res['nSeasons'])
    print('PASS promo_labels (%d archived seasons, tags aligned with real moves)' % res['nSeasons'])


if __name__ == '__main__':
    harness.main(run)
