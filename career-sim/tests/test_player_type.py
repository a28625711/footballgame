# -*- coding: utf-8 -*-
"""Multi-career test: validates player type system with varied positions."""
import json, sys
sys.stdout.reconfigure(encoding='utf-8')
import harness

CAREERS = 8

POSITIONS = [
    ('ST', 'FW', 9),
    ('CM', 'MF', 8),
    ('CB', 'DF', 4),
    ('GK', 'GK', 1),
]

SIM_JS = r"""
(function(){
var results=[], typeGoals={}, typeAssists={}, typeCount={}, transitions=0;
var typeNames=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];

for(var s=0;s<%N%;s++){
  var au=window.__SIMTEST.start('normal',{'name':'p_%POS%','origin':'sd','pos':'%POS%','nation':'cn','talent':%TAL%,'number':%NUM%,'foot':'r'},%BASE%+s);
  au.talent=%TAL%;
  var g=0,lastType=null;
  while(g++<5000){
    if(au.phase==='youth'){
      if((au.talent||0)<1.3)au.talent=%TAL%;
      if(au.age>=14&&(!au.ovr||au.ovr<50)){au.ovr=50;au.maxOvr=Math.max(au.maxOvr||0,94);}
    }
    var p=au.pending;
    if(!p){
      if(au.phase==='summary'||au.phase==='done'||au.age>=40)break;
      try{window.SIM.nextStep();}catch(e){break;}
      continue;
    }
    try{
      if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);}}
      else if(p.type==='report'){window.__SIMTEST.cont();}
      else if(p.type==='bigmatch'){if(!p.result){window.SIM.choose('push');}window.__SIMTEST.cont();}
      else if(p.type==='staff'){window.SIM.choose('skip');}
      else if(p.type==='transfer'){
        var stay=p.offers&&p.offers.indexOf(au.teamId)>=0;
        window.SIM.choose(stay?'stay':'0');
      }
      else if(p.type==='academy'){window.__SIMTEST.option(0);}
      else if(p.type==='youth_path'){window.__SIMTEST.option(0);}
      else if(p.type==='retire_forced'){window.SIM.choose('retire');}
      else{window.SIM.nextStep();}
    }catch(e){}
    if(au.phase==='summary'||au.phase==='done')break;
  }

  var seasons=au.seasons||[];
  var typeSeen={};
  for(var i=0;i<seasons.length;i++){
    var r=seasons[i];
    var t=r._type;
    if(t===undefined||t===null)t=11;
    typeGoals[t]=(typeGoals[t]||0)+r.goals;
    typeAssists[t]=(typeAssists[t]||0)+r.assists;
    typeCount[t]=(typeCount[t]||0)+1;
    typeSeen[t]=(typeSeen[t]||0)+1;
    if(lastType!==null&&t!==lastType)transitions++;
    lastType=t;
  }
  var pos=au.pos||'%POS%';
  results.push({finalType:lastType,seasons:seasons.length,maxOvr:au.maxOvr,lastOvr:au.ovr,pos:pos,types:Object.keys(typeSeen).length});
}
return JSON.stringify({results:results,typeGoals:typeGoals,typeAssists:typeAssists,typeCount:typeCount,typeNames:typeNames,transitions:transitions});
})()
"""


def run():
    mr = harness.new_engine()
    all_results = []
    all_tg = {}
    all_ta = {}
    all_tc = {}
    total_transitions = 0

    for pos, group, num in POSITIONS:
        js = SIM_JS.replace('%POS%', pos).replace('%TAL%', '1.25').replace('%NUM%', str(num)).replace('%BASE%', str(100000 + num * 10000))
        js = js.replace('%N%', str(CAREERS))
        out = mr.eval(js)
        data = json.loads(out)

        tc = data['typeCount']
        tg = data['typeGoals']
        ta = data['typeAssists']
        tn = data['typeNames']
        total_transitions += data['transitions']

        print(f"\n=== {pos} ({group}) - {CAREERS} careers ===")
        for tid in sorted(tc.keys(), key=int):
            tid_i = int(tid)
            cnt = tc[tid]
            goals = tg.get(tid, 0)
            assists = ta.get(tid, 0)
            gpg = round(goals / cnt, 2) if cnt > 0 else 0
            apg = round(assists / cnt, 2) if cnt > 0 else 0
            name = tn[tid_i] if tid_i < len(tn) else f'T{tid_i}'
            print(f"  {name:8s} (id={tid_i:2d}): {cnt:3d} seasons, {gpg:.1f}g/s, {apg:.1f}a/s")

        for k in tc:
            all_tc[k] = all_tc.get(k, 0) + tc[k]
        for k in tg:
            all_tg[k] = all_tg.get(k, 0) + tg[k]
        for k in ta:
            all_ta[k] = all_ta.get(k, 0) + ta[k]
        all_results.extend(data['results'])

    print(f"\n=== Summary ===")
    print(f"Total transitions across all careers: {total_transitions}")
    total_seasons = sum(all_tc.values())
    types_seen = len(all_tc)
    print(f"Total seasons: {total_seasons}, Types seen: {types_seen}/12")

    for tid in sorted(all_tc.keys(), key=int):
        tid_i = int(tid)
        cnt = all_tc[tid]
        goals = all_tg.get(tid, 0)
        assists = all_ta.get(tid, 0)
        gpg = round(goals / cnt, 2) if cnt > 0 else 0
        apg = round(assists / cnt, 2) if cnt > 0 else 0
        tn = data['typeNames']
        name = tn[tid_i] if tid_i < len(tn) else f'T{tid_i}'
        print(f"  {name:8s}: {cnt:3d} seasons, {gpg:.1f}g/s, {apg:.1f}a/s")

    errors = []
    if types_seen < 4:
        errors.append(f"Too few types: {types_seen}/12")
    if total_transitions < 2:
        errors.append(f"Transitions too few: {total_transitions}")

    if errors:
        print(f"\nFAIL: {'; '.join(errors)}")
        sys.exit(1)

    print(f"\nPASS player_type_multi ({CAREERS*len(POSITIONS)} careers, {total_seasons} seasons, {types_seen} types, {total_transitions} transitions)")


if __name__ == '__main__':
    harness.main(run)
