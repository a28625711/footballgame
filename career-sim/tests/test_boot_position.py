# -*- coding: utf-8 -*-
"""金靴奖位置回归：
旧版金靴/欧洲金靴硬性要求 `posGroup==='att'`（只有 LW/RW/ST 能拿）。现实中
中场（尤其前腰/影锋这类高进球角色）同样能拿联赛金靴，奖项应按进球数而非位置。
修复：去掉位置硬门槛，改由「联赛进球 ≥ 头号射手门槛」决定（位置只通过进球自然区分）。
本测试跑一批「前腰（影锋型，g×1.70）」生涯，断言中场确实能拿到联赛金靴；
另跑一批后卫生涯，断言进球不足时不会获奖。
"""
import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
(function(){
var out={err:null,rows:[]};
function resolve(p){
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } else { window.__SIMTEST.cont(); } return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); } else { window.__SIMTEST.option(p.canStay?'stay':'retire'); } return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
function career(pos,type,seed){
  var st=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:pos,nation:'cn',talent:1.3,number:9,foot:'r'},seed);
  st.talent=1.35;
  var g=0,last='',rep=0,lastLen=(st.seasons||[]).length;
  while(g++<20000){
    if(st.phase==='youth'){ if((st.talent||0)<1.4)st.talent=1.4; if(st.age>=14&&(!st.ovr||st.ovr<58)){st.ovr=58;st.maxOvr=Math.max(st.maxOvr||0,95);} }
    if(st.phase==='career')st.playerType=type;
    var p=st.pending;
    if(!p){ if(st.phase==='summary'||st.phase==='done')break; window.SIM.nextStep(); continue; }
    if(p.type===last&&++rep>500)break; if(p.type!==last){last=p.type;rep=0;}
    try{ resolve(p); }catch(e){ out.err=String(e).slice(0,150); return; }
    var ss=st.seasons||[],aw=st.awards||[];
    for(var i=lastLen;i<ss.length;i++){var r=ss[i];
      var won=[];for(var j=0;j<aw.length;j++)if(aw[j].age===r.age)won.push(aw[j].name);
      var boot=null;for(j=0;j<won.length;j++)if(won[j].indexOf('金靴')>=0)boot=won[j];
      var tt=st['_topTgt']||{},tgt=tt[(r.leagueId||'')+'_'+r.age];
      out.rows.push({pos:pos,age:r.age,lgG:r.lgGoals||0,apps:r.apps,boot:boot,tgt:(tgt==null?null:tgt)});
    }
    lastLen=ss.length;
    if(st.phase==='summary'||st.phase==='done'){ st.pending=null; break; }
  }
}
%SEEDS%
return JSON.stringify(out);
})()
"""

# CAM + 影锋型(type 5) 与 CB 对照
SEEDS = ';'.join(
    ["career('CAM',5,%d)" % s for s in (90001, 90008, 90015, 90022)]
    + ["career('CB',9,%d)" % s for s in (90001, 90008)]
)


def run():
    mr = harness.new_engine()
    js = JS.replace('%SEEDS%', SEEDS)
    r = json.loads(mr.eval(js))
    if r['err']:
        raise harness.Fail(r['err'])
    rows = r['rows']
    if not rows:
        raise harness.Fail('no seasons')
    mid_boots = [x for x in rows if x['pos'] == 'CAM' and x['boot']]
    if not mid_boots:
        raise harness.Fail('中场（影锋型）从未拿到金靴——位置门槛可能仍在')
    bad = [x for x in mid_boots if x['tgt'] is not None and x['lgG'] < x['tgt']]
    if bad:
        raise harness.Fail('中场金靴低于门槛: %r' % bad[0])
    # 对照：后卫进球不足，不应拿金靴
    cb_boots = [x for x in rows if x['pos'] == 'CB' and x['boot']]
    if cb_boots:
        raise harness.Fail('后卫不该拿金靴: %r' % cb_boots[0])
    print('PASS boot_position (CAM 金靴 %d 次 / %d 季；CB 0 次)'
          % (len(mid_boots), len([x for x in rows if x['pos'] == 'CAM'])))
    print('  e.g. ' + ', '.join('age%d lgG=%d %s' % (x.get('age', -1), x['lgG'], x['boot'])
                                for x in mid_boots[:4]))


if __name__ == '__main__':
    harness.main(run)
