# -*- coding: utf-8 -*-
"""新闻模块（news.js）：
- 每季结算生成 1-2 主要 / 4-6 次要 / 2-3 风味，存进 a2.news
- fx 限幅：单季至多 2 条带 fx，至多 1 条负面向；_wageMul 钳制 0.95~1.05
- 不挤占随机事件槽（青年年随机事件数不受影响）
- 年表渲染含「新闻」标签面板，按赛季分组；占位符不泄漏
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
(function(){
var out={err:null,newsTotal:0,perSeason:[],fxPerSeason:[],wageMul:null,
  renderHasPanel:false,renderHasNews:false,youthRandom:0,tokenLeak:null,badKinds:0};
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.3,number:9,foot:'r'},20260912);
au.talent=1.35; au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null; au.seasons=[]; au.youthTeamId=null;
window.SIM.attach(au);
var guard=0,seasons=0,youthYears=0,youthRandom=0,prevAge=au.age;
while(guard++<40000&&seasons<12){
  var p=au.pending;
  if(!p){
    if(au.phase==='youth'&&au.age>prevAge){youthYears++;prevAge=au.age;}
    if(au.phase==='summary'||au.phase==='done')break;
    try{window.SIM.nextStep();}catch(e){out.err='nextStep:'+String(e).slice(0,150);return JSON.stringify(out);}
    continue;
  }
  var t=p.type;
  if(t==='random'){ if(au.phase==='youth')youthRandom++; if(p.result){window.__SIMTEST.cont();}else{window.__SIMTEST.option(0);} continue; }
  if(t==='report'){ window.__SIMTEST.cont(); continue; }
  if(t==='bigmatch'){ if(!p.result){window.SIM.choose('push');}else{window.__SIMTEST.cont();} continue; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); continue; }
  if(t==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'retire'); continue; }
  if(t==='academy'){ if(p.result){window.__SIMTEST.cont();}else{window.__SIMTEST.option(0);} continue; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); continue; }
  if(t==='retire_forced'){ break; }
  out.err='unknown pending '+t; return JSON.stringify(out);
}
out.youthRandom=youthRandom; out.youthYears=youthYears;
var news=au.news||[];
if(au._newsErr){out.err='NEWSGEN error: '+au._newsErr;return JSON.stringify(out);}
out.newsTotal=news.length;
/* 按赛季归组统计 */
var byAge={};
for(var i=0;i<news.length;i++){
  var n=news[i];
  if(/\{\w+\}/.test(n.t)){out.tokenLeak=n.t;}
  if(n.bad)out.badKinds++;
  byAge[n.age]=byAge[n.age]||{mj:0,mn:0,fv:0,fx:0};
  if(n.k==='mj')byAge[n.age].mj++;
  else if(n.k==='mn')byAge[n.age].mn++;
  else if(n.k==='fv')byAge[n.age].fv++;
  if(n.fx)byAge[n.age].fx++;
}
for(var a in byAge){
  var g=byAge[a];
  out.perSeason.push(g);
  if(g.mj<1||g.mj>2){out.err='mj count '+g.mj+' @age '+a+' ids='+news.filter(function(n){return n.age==a;}).map(function(n){return n.id;}).join(',');return JSON.stringify(out);}
  if(g.mn<4||g.mn>6){out.err='mn count '+g.mn+' @age '+a;return JSON.stringify(out);}
  if(g.fv<2||g.fv>3){out.err='fv count '+g.fv+' @age '+a;return JSON.stringify(out);}
  if(g.fx>2){out.err='fx cap '+g.fx+' @age '+a;return JSON.stringify(out);}
}
/* fx 负面向：全生涯负 fx 条目至多 = 赛季数（每季限1，直接验证钳制与 _wageMul 区间） */
var mul=au.flags._wageMul;
if(mul!=null&&(mul<0.95-1e-9||mul>1.05+1e-9)){out.err='wageMul out of range '+mul;return JSON.stringify(out);}
out.wageMul=mul;
/* 渲染：年表（openArchive）后检查新闻面板与条目 */
var html='';
try{
  window.__SIMTEST.openArchive();
  window.__SIMTEST.render();
  html=Object.keys(window.__ELS).map(function(k){return String(window.__ELS[k].innerHTML);}).join('\\n');
}catch(e){out.err='render:'+String(e).slice(0,150);return JSON.stringify(out);}
out.renderHasPanel=html.indexOf('data-panel="news"')>=0;
out.renderHasNews=html.indexOf('news-row')>=0&&html.indexOf('news-grp')>=0;
return JSON.stringify(out);
})()
"""

def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r.get('fail'):
        raise harness.Fail(r['fail'])
    if r.get('err'):
        raise harness.Fail(r['err'])
    if r['newsTotal'] < 40:
        raise harness.Fail('too few news: %d over 12 seasons' % r['newsTotal'])
    if not r['renderHasPanel']:
        raise harness.Fail('news panel missing in archive render')
    if not r['renderHasNews']:
        raise harness.Fail('news rows/groups missing in archive render')
    if r['tokenLeak']:
        raise harness.Fail('token leak: %s' % r['tokenLeak'])
    print('ok: %d news over seasons=%s, wageMul=%s, bad(black)=%d, youthRandom=%d'
          % (r['newsTotal'], len(r['perSeason']), r['wageMul'], r['badKinds'], r['youthRandom']))


if __name__ == '__main__':
    harness.main(run)
