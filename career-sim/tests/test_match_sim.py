# 比赛模拟 v2 校准回归：主客胜率方向、平局率/场均进球量级带、联赛风格分化
# （低节奏联赛平局更多、德甲进球多于西甲）、杯赛/洲际签表完整性。
# 锚点详见 PLAN-league-realism.md §9。
import json

import harness

N_SEASONS = 5

LOOP = r'''
(function(){
var out={fx:{},cups:0,cupTieBad:null,contBad:null};
var au=window.__SIMTEST.start('normal',{name:'m',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},777);
au.ovr=78;au.maxOvr=90;au.money=2000;au.age=22;au.phase='career';
au.teamId='mci';au.role='starter';au.contractLeft=1;au.seasonsAtClub=2;
au.roleAdjust=0;au.guanxi=50;au.youthTeamId=null;
au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
for(var yr=0; yr<%NS% && au.phase==='career'; yr++){
  try{ window.SIM.doPeriod(); }catch(e){ out.err=String(e).slice(0,150); break; }
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
  if(st.lgFx&&st.lgFx.data){
    for(var lg in st.lgFx.data){
      var acc=out.fx[lg]=out.fx[lg]||{h:0,d:0,a:0,n:0,g:0};
      st.lgFx.data[lg].forEach(function(rd){rd.forEach(function(m){
        acc.n++;acc.g+=m[2]+m[3];
        if(m[2]>m[3])acc.h++;else if(m[2]<m[3])acc.a++;else acc.d++;
      });});
    }
  }
  if(st.cupFx&&st.cupFx.data){
    for(var cn in st.cupFx.data){var br=st.cupFx.data[cn];
      if(br&&br.all){out.cups++;
        br.all.forEach(function(rd){rd.ties.forEach(function(t){
          if(!t.b&&t.pd!==1&&(!t.h||!t.a||(t.hg==null&&t.sa==null)))out.cupTieBad=cn+':'+rd.name;});});}
    }
  }
  if(st.contFx&&st.contFx.data){
    for(var tg in st.contFx.data){var cd=st.contFx.data[tg];
      var ms=cd&&cd.group&&cd.group.matches||[];
      if(ms.length&&ms.length%4!==0)out.contBad=tg+':flat';
      /* 世俱杯纯淘汰赛无小组赛 */
      var noName=cd.group?(cd.group.standings||[]).filter(function(r){return !r.n&&!r.name;}).length:0;
      if(noName)out.contBad=tg+':names';
    }
  }
}
return JSON.stringify(out);
})()
'''.replace('%NS%', str(N_SEASONS))


def run():
    mr = harness.new_engine()
    res = json.loads(mr.eval(LOOP))
    harness.check('err' not in res, res.get('err', ''))
    fx = res['fx']
    harness.check(len(fx) == 26, 'leagues with fx = %d != 26' % len(fx))  # 20+墨超+加拿超+6 新联赛

    def rate(lg):
        a = fx[lg]
        return a['d'] / a['n'], a['g'] / a['n'], a['h'] / a['n'], a['a'] / a['n']

    # 量级带：平局 18-32%、场均进球 2.2-3.4（各联赛 gl 与样本噪声内）
    for lg in ('epl', 'liga', 'bund', 'seri', 'csl', 'ch'):
        dr, gg, hr, ar = rate(lg)
        harness.check(0.18 <= dr <= 0.32, '%s draw rate %.2f out of band' % (lg, dr))
        harness.check(2.2 <= gg <= 3.4, '%s goals/game %.2f out of band' % (lg, gg))
        harness.check(hr > ar, '%s home wins %.2f <= away %.2f' % (lg, hr, ar))

    # 风格分化：低节奏联赛平局更多；高节奏联赛进球更多
    dr_seri, gg_seri, _, _ = rate('seri')
    dr_bund, gg_bund, _, _ = rate('bund')
    _, gg_liga, _, _ = rate('liga')
    harness.check(dr_seri > dr_bund, 'seri draw %.2f should exceed bund %.2f' % (dr_seri, dr_bund))
    harness.check(gg_bund > gg_liga, 'bund goals %.2f should exceed liga %.2f' % (gg_bund, gg_liga))

    # 杯赛与洲际签表完整性
    harness.check(res['cups'] >= 16 * N_SEASONS - 2, 'cup brackets=%d' % res['cups'])
    harness.check(res['cupTieBad'] is None, 'cup tie bad: %s' % res['cupTieBad'])
    harness.check(res['contBad'] is None, 'cont data bad: %s' % res['contBad'])
    print('PASS match_sim (bands, home>away, style spread, brackets)')


if __name__ == '__main__':
    harness.main(run)
