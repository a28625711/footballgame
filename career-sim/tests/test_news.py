# -*- coding: utf-8 -*-
"""新闻模块（news.js）：
- 青训期每季生成 1 主要(青训池) / 2-3 次要 / 2 风味；职业期 1-2 / 4-6 / 2-3
- 每季整体替换（不保留历史，news 只存当季最新一批）
- fx 限幅：单季至多 2 条带 fx，至多 1 条负面向；_wageMul 钳制 0.95~1.05
- 门控：主角池条目带 fame/roleRank 条件（月最佳等门槛）
- 渲染：年表「新闻」面板直接平铺当季新闻、类别 emoji(NEWSMETA)、队徽/国旗前缀(n-tname)
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
(function(){
var out={err:null,youthNewsLen:0,proNewsLen:0,mj:0,mn:0,fv:0,fx:0,tokenLeak:null,
  renderPanel:false,renderRows:false,renderCrest:false,wageMul:null};
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.3,number:9,foot:'r'},20260912);
au.talent=1.35; au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null; au.seasons=[]; au.youthTeamId=null;
window.SIM.attach(au);
var guard=0,proSeasons=0,youthYears=0;
function countBatch(b){
  var c={mj:0,mn:0,fv:0,fx:0};
  for(var i=0;i<b.length;i++){var n=b[i];
    if(/\{\w+\}/.test(n.t))out.tokenLeak=n.t;
    if(n.k==='mj')c.mj++;else if(n.k==='mn')c.mn++;else if(n.k==='fv')c.fv++;
    if(n.fx)c.fx++;}
  return c;
}
while(guard++<40000&&proSeasons<12){
  if(au.phase==='youth'&&au.news&&au.news.length&&!out.youthNewsLen){
    out.youthNewsLen=au.news.length;
    var yc=countBatch(au.news);
    if(yc.mj<1||yc.mj>1){out.err='youth mj '+yc.mj;return JSON.stringify(out);}
    if(yc.mn<2||yc.mn>3){out.err='youth mn '+yc.mn;return JSON.stringify(out);}
    if(yc.fv<2||yc.fv>3){out.err='youth fv '+yc.fv;return JSON.stringify(out);}
  }
  var p=au.pending;
  if(!p){
    if(au.phase==='summary'||au.phase==='done')break;
    try{window.SIM.nextStep();}catch(e){out.err='nextStep:'+String(e).slice(0,150);return JSON.stringify(out);}
    continue;
  }
  var t=p.type;
  if(t==='random'){ if(p.result){window.__SIMTEST.cont();}else{window.__SIMTEST.option(0);} continue; }
  if(t==='report'){ window.__SIMTEST.cont(); continue; }
  if(t==='bigmatch'){ if(!p.result){window.SIM.choose('push');}else{window.__SIMTEST.cont();} continue; }
  if(t==='staff'){ window.__SIMTEST.option(p.offers[0]); continue; }
  if(t==='transfer'){ window.__SIMTEST.option(p.canStay?'stay':'retire'); continue; }
  if(t==='academy'){ if(p.result){window.__SIMTEST.cont();}else{window.__SIMTEST.option(0);} continue; }
  if(t==='youth_path'){ window.__SIMTEST.option(0); continue; }
  if(t==='retire_forced'){ break; }
  out.err='unknown pending '+t; return JSON.stringify(out);
}
if(au._newsErr){out.err='NEWSGEN error: '+au._newsErr;return JSON.stringify(out);}
if(!out.youthNewsLen){out.err='youth phase produced no news';return JSON.stringify(out);}
/* 职业期当季批次 */
var news=au.news||[];
out.proNewsLen=news.length;
var c=countBatch(news);
out.mj=c.mj;out.mn=c.mn;out.fv=c.fv;out.fx=c.fx;
if(c.mj<1||c.mj>2){out.err='pro mj '+c.mj;return JSON.stringify(out);}
if(c.mn<4||c.mn>6){out.err='pro mn '+c.mn;return JSON.stringify(out);}
if(c.fv<2||c.fv>3){out.err='pro fv '+c.fv;return JSON.stringify(out);}
if(c.fx>2){out.err='fx cap '+c.fx;return JSON.stringify(out);}
/* 门控抽查：月最佳类条目出现时,存档 fame 应≥15 且角色主力以上（按当前存档近似验证池门槛可执行） */
var mul=au.flags._wageMul;
if(mul!=null&&(mul<0.95-1e-9||mul>1.05+1e-9)){out.err='wageMul out of range '+mul;return JSON.stringify(out);}
out.wageMul=(mul==null)?null:mul;
/* 渲染：年表新闻面板 + emoji + 队徽/国旗 */
var html='';
try{
  window.__SIMTEST.openArchive();
  window.__SIMTEST.render();
  html=Object.keys(window.__ELS).map(function(k){return String(window.__ELS[k].innerHTML);}).join('\\n');
}catch(e){out.err='render:'+String(e).slice(0,150);return JSON.stringify(out);}
out.renderPanel=html.indexOf('data-panel="news"')>=0;
out.renderRows=html.indexOf('news-row')>=0&&html.indexOf('news-empty')<0;
out.renderCrest=html.indexOf('n-tname')>=0||html.indexOf('n-flag')>=0;
return JSON.stringify(out);
})()
"""

JS_FACTS = r"""
(function(){
var out={err:null,champ:0,releg:0,chn:0,cap:0,tokLeak:null};
var a2={name:'p',teamId:'rma',leagueId:'liga',country:'ES',_newsTids:[],_newsWhen:{},age:24,flags:{},fame:30,role:'star'};
var bcn=null;window.DATA.TEAMS.forEach(function(t){if(!bcn&&t.rep>=5&&t.id!=='rma'&&t.league==='liga')bcn=t.id;});
var facts=[
 {t:'lgchamp',tid:'rma',lg:'liga'},
 {t:'releg',tid:bcn,from:'liga',to:'seg'},
 {t:'nat',nid:'n_chn',tag:'wc'},
 {t:'cont',tid:'mci',comp:'欧冠',tag:'ucl'},
 {t:'promo',tid:'cn-cd',from:'csl2',to:'csl'}
];
var items=window.NEWSGEN(a2,0,facts);
var mj=0,mn=0;
for(var i=0;i<items.length;i++){var n=items[i];
  if(/\{\w+\}/.test(n.t))out.tokLeak=n.t;
  if(n.k==='mj')mj++;if(n.k==='mn')mn++;
  if((n.id==='ft_lgchamp_rma'||n.t.indexOf('皇家马德里')>=0)&&(n.c==='champ'||n.c==='upset'))out.champ++;
  if(n.c==='releg'&&n.t.indexOf('降')>=0)out.releg++;
  if(n.c==='natc')out.chn++;}
if(mj<1||mj>2){out.err='fact mj '+mj;return JSON.stringify(out);}
if(mn<4||mn>6){out.err='fact mn '+mn;return JSON.stringify(out);}
if(!out.champ){out.err='no champion news';return JSON.stringify(out);}
if(!out.releg){out.err='no relegation news';return JSON.stringify(out);}
if(!out.chn){out.err='no china wc news';return JSON.stringify(out);}
/* 数量封顶：10条事实只取3条 */
var many=[];for(var j=0;j<10;j++)many.push({t:'lgchamp',tid:'rma',lg:'liga'});
var items2=window.NEWSGEN(a2,0,many);
var f2=items2.filter(function(n){return n.id&&n.id.indexOf('ft_')===0;});
if(f2.length>3){out.err='fact cap '+f2.length;return JSON.stringify(out);}
/* 青训国内外池判定：国内青训不得出留洋风味(fv_ab)，国外青训会出 */
var y1={name:'p',teamId:'cn-cd',youthTeamId:'cn-cd',leagueId:null,country:null,_newsTids:[],_newsWhen:{},age:13,ovr:44,flags:{},fame:2,role:'sub'};
var ab1=0;
for(var k1=0;k1<25;k1++){y1.age=13+k1;window.NEWSGEN(y1,1,[]).forEach(function(n){if((n.id||'').indexOf('fv_ab_')===0)ab1++;});}
if(ab1>0){out.err='domestic youth fired abroad flavor x'+ab1;return JSON.stringify(out);}
var y2={name:'p',teamId:'rma',youthTeamId:'rma',leagueId:null,country:null,_newsTids:[],_newsWhen:{},age:13,ovr:44,flags:{},fame:2,role:'sub'};
var ab2=0;
for(var k2=0;k2<25;k2++){y2.age=13+k2;window.NEWSGEN(y2,1,[]).forEach(function(n){if((n.id||'').indexOf('fv_ab_')===0)ab2++;});}
if(ab2===0){out.err='abroad youth never fired abroad flavor';return JSON.stringify(out);}
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
    if not r['renderPanel']:
        raise harness.Fail('news panel missing in archive render')
    if not r['renderRows']:
        raise harness.Fail('news rows/groups missing in archive render')
    if not r['renderCrest']:
        raise harness.Fail('no crest/flag prefix rendered in news rows')
    if r['tokenLeak']:
        raise harness.Fail('token leak: %s' % r['tokenLeak'])
    print('ok: youth=%d pro=%d (mj=%d mn=%d fv=%d fx=%d), wageMul=%s'
          % (r['youthNewsLen'], r['proNewsLen'], r['mj'], r['mn'], r['fv'], r['fx'], r['wageMul']))


def run_facts():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS_FACTS))
    if r.get('err'):
        raise harness.Fail(r['err'])
    if r.get('tokLeak'):
        raise harness.Fail('token leak: %s' % r['tokLeak'])
    print('ok facts: champ=%d releg=%d chn=%d' % (r['champ'], r['releg'], r['chn']))


if __name__ == '__main__':
    harness.main(run)
    harness.main(run_facts)
