# -*- coding: utf-8 -*-
"""大场面（决赛）模型一致性：
   - 比分/胜率只由双方真实强度决定（同 _meS 时，球员 OVR 不影响胜率）
   - 强弱差显著影响胜率（弱对手 >> 强对手）
   - 球员进球/助攻随 OVR 缩放（复用 _pMatchContrib 概率）
   - 决策 dp 提高赢面、glory 提高个人进攻倾向"""
import json
import harness

JS = r"""
(function(){
var out={err:null,res:{}};
function runBig(ovr,oppStr,choice,N,seed0){
  var wins=0,played=0,lines=0,gl=0,ga=0;
  for(var i=0;i<N;i++){
    var st=window.__SIMTEST.start('normal',%NEW_PLAYER%,seed0+i);
    st.phase='career'; st.teamId='rma'; st.ovr=ovr; st.maxOvr=99; st.age=25; st.role='star';
    st.contractLeft=10; st.seasonsAtClub=2; st.flags={}; st.pending=null; st.bigQ=[];
    st.usedEvents={}; st.forceQ=[];
    st.seasons.push({teamId:'rma',teamName:'皇马',age:24,apps:30,goals:10,assists:5,trophies:[],ovrEnd:ovr});
    window.SIM.pushPri('cont',1.0,{'comp':'欧冠决赛','opp':'曼城','oppStr':oppStr,'oppId':'mci','_meS':88});
    st.bigQ[0]['recIdx']=st.seasons.length-1;
    window.SIM.nextStep();
    var guard=0,last=null;
    while(st.pending&&guard++<80){
      var p=st.pending;
      if(p.type==='bigmatch'){
        if(p.result){ if(p.comp==='欧冠决赛')last=p; window.__SIMTEST.cont(); }
        else { window.SIM.choose(choice); }
      } else if(p.type==='random'||p.type==='forced'){ if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);} }
      else if(p.type==='report'){ window.SIM.nextStep(); }
      else { try{window.SIM.choose('stay');}catch(e){window.SIM.nextStep();} }
      if(st.pending&&st.pending.type==='bigmatch'&&st.pending.comp==='欧冠决赛'&&st.pending.result)last=st.pending;
    }
    if(last&&last.result){
      played++; if(last.result.won)wins++; gl+=last.result.score[0]; ga+=last.result.score[1];
      var lg=last.log||[];
      for(var k=0;k<lg.length;k++)if(/^第\d+ 分钟，你[^们]/.test(String(lg[k])))lines++;
    }
  }
  return {n:played,win:played?wins/played:0,gf:played?gl/played:0,ga:played?ga/played:0,me:played?lines/played:0};
}
try{
  out.res.ovr60   = runBig(60,88,'hold',150,1000);
  out.res.ovr95   = runBig(95,88,'hold',150,1000);
  out.res.weakOpp = runBig(85,70,'hold',150,1000);
  out.res.strongOpp=runBig(85,100,'hold',150,1000);
  out.res.decPush = runBig(85,88,'push',150,1000);
  out.res.decHold = runBig(85,88,'hold',150,1000);
}catch(e){ out.err=String(e).slice(0,300); }
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    x = r['res']
    for k, v in x.items():
        if v['n'] < 40:
            raise harness.Fail('too few matches for %s: %r' % (k, v))
    # 强度驱动
    if not (x['weakOpp']['win'] - x['strongOpp']['win'] > 0.4):
        raise harness.Fail('win rate not strength-driven: %r' % x)
    # 无 OVR 泄漏（同队强度）
    if not (abs(x['ovr60']['win'] - x['ovr95']['win']) < 0.12):
        raise harness.Fail('win rate leaks from player OVR: %r' % x)
    # 球员数据随 OVR 缩放
    if not (x['ovr95']['me'] > x['ovr60']['me'] * 1.25):
        raise harness.Fail('player output not OVR-scaled: %r' % x)
    # dp 提高赢面
    if not (x['decPush']['win'] - x['decHold']['win'] > 0.04):
        raise harness.Fail('decision dp has no effect: %r' % x)
    # glory 提高个人进攻倾向
    if not (x['decPush']['me'] > x['decHold']['me'] * 1.1):
        raise harness.Fail('decision glory has no effect: %r' % x)
    print('PASS bigmatch_model (win o60=%.2f o95=%.2f weak=%.2f strong=%.2f push=%.2f hold=%.2f; me o60=%.2f o95=%.2f)'
          % (x['ovr60']['win'], x['ovr95']['win'], x['weakOpp']['win'], x['strongOpp']['win'],
             x['decPush']['win'], x['decHold']['win'], x['ovr60']['me'], x['ovr95']['me']))


if __name__ == '__main__':
    harness.main(run)
