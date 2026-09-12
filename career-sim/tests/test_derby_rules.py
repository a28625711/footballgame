# -*- coding: utf-8 -*-
"""德比/大场面规则：
1. 联赛类大场面（德比/保级）允许平局：交互赛不得进入加时/点球决策
2. 德比 intro 分三池：国家德比（跨城）不得出现"整座城市"同城语境；对手必须与标签匹配
3. 每赛季最多一场交互大场面
4. _aVPri 优先级：世界杯驱逐洲际（AI 结算让位），同级不放行保持现状
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
(function(){
var out={err:null,derbies:[],introNat:[],introCity:[],decBad:[],seasonSeen:{},picks:null};
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.3,number:9,foot:'r'},990077);
au.teamId='rma'; au.phase='career'; au.age=24; au.ovr=84; au.maxOvr=90;
au.role='star'; au.contractLeft=6; au.seasonsAtClub=2; au.money=2000;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null; au.seasons=[]; au.youthTeamId=null;
window.SIM.attach(au);
var guard=0x0;
while(guard++<400){
  var p=au.pending;
  if(!p){ if(au.phase==='summary'||au.phase==='done')break; window.SIM.nextStep(); continue; }
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();}else{window.__SIMTEST.option(0x0);} continue; }
  if(t==='report'){ window.__SIMTEST.cont(); continue; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0x0]); continue; }
  if(t==='transfer'){ if(p.offers&&p.offers.length){window.__SIMTEST.option('0');}
    else{window.__SIMTEST.option(p.canStay?'stay':'retire');} continue; }
  if(t==='academy'){ window.__SIMTEST.option(0x0); continue; }
  if(t==='retire_forced'){ break; }
  if(t==='bigmatch'){
    var st=window.SIM.state();
    if(st.bigQ&&st.bigQ.length){
      var it=st.bigQ[0x0],key=it.recIdx+'|'+it.kind+'|'+it.opp;
      out.seasonSeen[it.recIdx]=out.seasonSeen[it.recIdx]||{};
      out.seasonSeen[it.recIdx][key]=0x1;
    }
    if((p.kind==='derby'||p.kind==='drop')&&(p.dec==='extra'||p.dec==='pen'))
      out.decBad.push(p.kind+':'+p.dec);
    if(p.kind==='derby'){
      if(p.dec==='intro'&&!p.result&&p._intro){
        var d={comp:p.comp,opp:p.opp,intro:p._intro};
        out.derbies.push(p.comp+' vs '+p.opp);
        if(p.comp==='国家德比'){out.introNat.push(p._intro);}
        else{out.introCity.push(p._intro);}
      }
    }
    if(!p.result){ window.SIM.choose(p.dec==='intro'?'start':'push'); }
    else{ window.__SIMTEST.cont(); }
    continue;
  }
  out.err='unknown pending: '+t; break;
}
/* 优先级单元验证：cont 在队时 wc 应驱逐（AI 结算 _contRun），同级 asia 不放行 */
(function(){
  var au2=window.__SIMTEST.start('normal',{name:'q',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},5511);
  au2.teamId='rma'; au2.phase='career'; au2.age=25; au2.ovr=84; au2.maxOvr=90;
  au2.role='star'; au2.contractLeft=5; au2.seasonsAtClub=2; au2.money=2000;
  au2.flags={}; au2.usedEvents={}; au2.forceQ=[]; au2.pending=null; au2.youthTeamId=null;
  au2._contRun={'comp':'欧冠','rounds':[{'round':'决赛','opp':'拜耳勒沃库森','oppId':'lev','won':!0x1,'score':''}],'result':'决赛'};
  au2.contFx={'data':{'ucl':{'name':'欧冠','rounds':[{'name':'决赛','ties':[{'h':'rma','a':'lev','pd':0x1}]}],'champion':null}}};
  au2.bigQ=[{'kind':'cont','comp':'欧冠','opp':'拜耳勒沃库森','oppId':'lev','oppStr':70,'_meS':80,'recIdx':0x0,'age':25,'team':'皇家马德里','teamId':'rma','_aiCtx':{'t':'cont','tag':'ucl'}}];
  window.SIM.attach(au2);
  /* wc(优先级4) 应驱逐在队的 cont(3)：旧 cont 走 AI 结算，wc 顶替入队 */
  var r1=window.SIM.pushPri('wc',0.55,{'comp':'世界杯','opp':'巴西'});
  var st2=window.SIM.state();
  var contSettled=!au2._contRun&&au2.cupRuns&&au2.cupRuns.length===0x1&&au2.contFx.data.ucl.champion!=null;
  out.picks={'wcEvict':!!r1&&st2.bigQ[0x0]["kind"]==='wc',contSettled:contSettled,
    topKind:st2.bigQ[0x0]["kind"]};
})();
return JSON.stringify(out);
})()
"""

def run():
    mr = harness.new_engine()
    r = json.loads(str(mr.eval(JS)))
    if r.get('err'):
        raise harness.Fail(r['err'])
    print('derbies:', r['derbies'][:10])
    print('decBad:', r['decBad'])
    print('picks:', r['picks'])
    # 1) 联赛类大场面不得进加时/点球
    if r['decBad']:
        raise harness.Fail('联赛大场面出现加时/点球决策: %s' % r['decBad'][:3])
    # 2) 国家德比 intro 不得出现同城语境；同城/区域德比池不得混入
    if not r['introNat']:
        raise harness.Fail('未采集到国家德比 intro（derbies=%s）' % r['derbies'][:4])
    for it in r['introNat']:
        if '整座城市' in it or '同城死敌' in it:
            raise harness.Fail('国家德比 intro 混入同城语境: %s' % it[:60])
    # 国家德比对手必须是巴萨（跨城）
    for d in r['derbies']:
        if d.startswith('国家德比') and '巴塞罗那' not in d:
            raise harness.Fail('国家德比对手不是巴萨: %s' % d)
    # 3) 每赛季最多一场交互大场面
    for rec, ks in r['seasonSeen'].items():
        if len(ks) > 1:
            raise harness.Fail('同一赛季出现多场交互大场面: %s -> %s' % (rec, list(ks)))
    # 4) 优先级：wc 驱逐在队的 cont（AI 结算 _contRun），且 wc 顶替入队
    if not r['picks']['wcEvict']:
        raise harness.Fail('wc 未驱逐在队的 cont: %s' % r['picks'])
    if not r['picks']['contSettled']:
        raise harness.Fail('被驱逐的洲际决赛未走 AI 结算（_contRun/cupRuns/contFx champion）: %s' % r['picks'])
    # 5) 德比映射表：双向对称（标签一致）+ 分类快照（地理/命名正确性防回归）
    dby = json.loads(str(mr.eval('JSON.stringify(window.SIM.dbyDump())')))
    sym = {}
    for a, lst in dby.items():
        for e in lst:
            tid, lab = e.split(':', 1)[0], e.split(':', 1)[1]
            sym.setdefault(frozenset((a, tid)), set()).add(lab)
    for pair, labs in sym.items():
        if len(labs) > 1:
            raise harness.Fail('德比标签双向不一致 %s: %s' % (sorted(pair), labs))
    expect = {
        ('rma', 'bar'): 'n', ('rma', 'atm'): 'c', ('mun', 'liv'): 'r',
        ('liv', 'eve'): 'c', ('ars', 'tot'): 'c', ('che', 'tot'): 'c',
        ('int', 'acm'): 'c', ('int', 'juv'): 'n', ('nap', 'rom'): 'r',
        ('bay', 'bvb'): 'n', ('psg', 'mar'): 'n', ('aja', 'fey'): 'n',
        ('psv', 'fey'): 'r', ('por', 'spo'): 'n', ('spo', 'ben'): 'c',
        ('hsv', 'pau'): 'c', ('cn-sh', 'cn-shh'): 'c', ('cn-sh', 'cn-bj'): 'n',
        ('cn-bj', 'cn-sd'): 'r', ('gmb', 'cre'): 'c', ('nyc', 'nyr'): 'c',
        ('clb', 'and'): 'n',
    }
    for (a, b), want in expect.items():
        got = [e.split(':')[2] for e in dby.get(a, []) if e.split(':')[0] == b]
        if not got:
            raise harness.Fail('缺少德比配对 %s-%s' % (a, b))
        if got[0] != want:
            raise harness.Fail('%s-%s 分类应为 %s 实际 %s' % (a, b, want, got[0]))
    for gone in (('fio', 'bol'), ):
        if dby.get(gone[0]):
            raise harness.Fail('%s 不应有德比配对: %s' % (gone[0], dby[gone[0]]))
    print('DERBY RULES PASS')

harness.main(run)
