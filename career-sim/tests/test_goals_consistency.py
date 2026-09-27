# -*- coding: utf-8 -*-
"""生涯总进球/助攻必须恒等于赛季记录之和。
   回归点：互动大赛结算与赛季末的封顶(cap)只改赛季记录、未同步扣 a2.totals，
   会造成"生涯总进球 > 各俱乐部进球之和"。"""
import json
import harness

JS = r"""
(function(){
var out={err:null,bad:[],ok:0,seasons:0,maxG:0};
function resolve(p){
  var t=p.type;
  if(t==='random'||t==='forced'){ if(p.result){window.__SIMTEST.cont();} else {window.__SIMTEST.option(0);} return; }
  if(t==='report'){ window.__SIMTEST.cont(); return; }
  if(t==='bigmatch'){ if(!p.result){ window.SIM.choose('push'); } else { window.__SIMTEST.cont(); } return; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); return; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){ window.__SIMTEST.option('0'); } else { window.__SIMTEST.option(p.canStay?'stay':'retire'); } return; }
  if(t==='academy'){ window.__SIMTEST.option(0); return; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); return; }
  if(t==='retire_forced'){ window.SIM.choose('retire'); return; }
}
try{
  for(var sd=0;sd<6;sd++){
    var st=window.__SIMTEST.start('normal',%NEW_PLAYER%,1300+sd*11);
    st.talent=1.6;
    for(var g=0;g<9000;g++){
      if(st.phase==='summary'||st.phase==='done')break;
      if(st.phase==='career'){ st.ovr=99; if(st.maxOvr<99)st.maxOvr=99; }
      var p=st.pending;
      if(!p){ window.SIM.nextStep(); continue; }
      if(st.phase==='summary'||st.phase==='done')break;
      resolve(p);
      var seas=st.seasons||[];
      var sG=0,sA=0;for(var i=0;i<seas.length;i++){sG+=(seas[i].goals||0);sA+=(seas[i].assists||0);if((seas[i].goals||0)>out.maxG)out.maxG=seas[i].goals||0;}
      if(st.totals.goals!==sG||st.totals.assists!==sA){
        out.bad.push({seed:1300+sd*11,age:st.age,tot:st.totals.goals,sum:sG,totA:st.totals.assists,sumA:sA});
        if(out.bad.length>4)break;
      }
    }
    out.seasons+=(st.seasons||[]).length;
    if(!out.bad.length)out.ok++;
  }
}catch(e){ out.err=String(e).slice(0,300); }
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    if r['bad']:
        raise harness.Fail('totals/season mismatch: %r' % r['bad'][:3])
    if r['seasons'] < 100:
        raise harness.Fail('too few seasons sampled: %d' % r['seasons'])
    print('PASS goals_consistency (%d careers, %d seasons, max season goals %d)'
          % (r['ok'], r['seasons'], r['maxG']))


if __name__ == '__main__':
    harness.main(run)
