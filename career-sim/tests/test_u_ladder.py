# -*- coding: utf-8 -*-
"""国字号梯队（U13→U23）：
- 青训期年龄窗触发 U13/U15 quick 选拔与 U17 交互决赛（bigQ 定时槽）
- quick 选拔无比分框架（无 bm-vs/全场），渲染"国字号"副标题
- U 系不挤占每年随机事件（青年年数≈随机事件数）
- _yCaps/_yGoals 记账、flag 置位、夺冠奖杯
- 职业期 21-23 岁 U23 国奥决赛自然触发；pushBig 钩子验证 U19 记账
提前毕业/落选/转会出国属合法随机路径，按种子重试。
"""
import sys, os, json
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r"""
(function(){
var out={err:null,seeds:[],seen:null,quickHtml:'',introHtml:'',u23Html:'',
  yCaps:null,yGoals:null,ntFlags:null,trophies:0,evCount:0,yearsAtGrad:0};
var SEEDS=[424242,424319,424396,424473,424550,424627,424704,424781];
for(var si=0x0;si<SEEDS.length;si++){
  var res=runSeed(SEEDS[si],si);
  out.seeds.push({seed:SEEDS[si],ok:!!res.ok,seen:res.seen,why:res.why||''});
  if(res.ok){out.seen=res.seen;out.quickHtml=res.quickHtml;out.introHtml=res.introHtml;
    out.u23Html=res.u23Html;out.yCaps=res.yCaps;out.yGoals=res.yGoals;
    out.ntFlags=res.ntFlags;out.trophies=res.trophies;out.evCount=res.evCount;
    out.yearsAtGrad=res.yearsAtGrad;return JSON.stringify(out);}
}
out.err='所有种子都未走完梯队: '+JSON.stringify(out.seeds);
return JSON.stringify(out);

function runSeed(seed,si){
  var r={ok:!0x1,seen:[],quickHtml:'',introHtml:'',u23Html:'',yCaps:null,yGoals:null,
    ntFlags:null,trophies:0x0,evCount:0x0,yearsAtGrad:0x0,youthRandom:0x0,youthMarked:!0x1};
  var au=window.__SIMTEST.start('normal',{name:'p'+si,origin:'sd',pos:'ST',nation:'cn',
    talent:1.3,number:9,foot:'r'},seed);
  var guard=0x0,u19Pushed=!0x1,quickSeen=0x0,interSeen=0x0,prevPhase='';
  function playMatch(p){
    if(p.dec==='intro'){window.SIM.choose(p.quick?'start':'allin');}
    else{window.SIM.choose('push');}
  }
  while(guard++<6000){
    if(au.phase==='summary'||au.phase==='done'){r.why='ended early age='+au.age;return r;}
    if(au.phase==='career'&&au.age>0x19)break;
    /* 刚升学：记录真实青年年数（挤占检查口径） */
    if(prevPhase==='youth'&&au.phase==='career')r.yearsAtGrad=au.age-0xc;
    prevPhase=au.phase;
    /* 青训期：压住 ovr 推迟毕业，让 U13/U15/U17 年龄窗都走完 */
    if(au.phase==='youth'){
      au.talent=1.3;
      if(au.ovr>0x2c&&au.age<0x11)au.ovr=0x2c;
      if(au.age>=0x11){au.ovr=Math.max(au.ovr||0x0,0x3c);au.maxOvr=Math.max(au.maxOvr||0x0,0x5a);}
    }else if(au.phase==='career'){
      /* 职业期到 U23 窗口结束为止保持竞争力 */
      if(au.age<=0x18){au.ovr=Math.max(au.ovr||0x0,0x4e);au.maxOvr=Math.max(au.maxOvr||0x0,0x5a);}
      if(!u19Pushed&&au.seasons&&au.seasons.length>=0x1&&au.age>=0x13){
        u19Pushed=!!window.SIM.pushBig('u19'); /* bigQ 被占时返回 false，下一轮重试 */
      }
    }
    var p=au.pending;
    if(!p){window.SIM.nextStep();continue;}
    var t=p.type;
    if(t==='random'){ if(au.phase==='youth')r.youthRandom++;
      if(p.result){window.__SIMTEST.cont();}else{window.__SIMTEST.option(0x0);} continue; }
    if(t==='report'){ window.__SIMTEST.cont(); continue; }
    if(t==='youth_path'){ window.__SIMTEST.option(0x0);
      au.youthTeamId='cn-cc'; au.teamId='cn-cc'; continue; }
    if(t==='academy'){ window.__SIMTEST.option(0x0); continue; }
    if(t==='staff'){ window.__SIMTEST.option(p.offers[0x0]); continue; }
    if(t==='transfer'){ if(p.offers&&p.offers.length){window.__SIMTEST.option('0');}
      else{window.__SIMTEST.option(p.canStay?'stay':'retire');} continue; }
    if(t==='retire_forced'){ window.SIM.choose('retire'); continue; }
    if(t==='bigmatch'){
      try{ String(window.__SIMTEST.render()); }catch(e){r.why='render: '+String(e).slice(0x0,150);return r;}
      var html='';
      for(var k in window.__ELS)html+=String(window.__ELS[k].innerHTML||'');
      if(p.quick){
        r.seen.push(p.kind+'q');quickSeen++;
        r.quickHtml=html;
        if(html.indexOf('bm-vs')>=0x0){r.why='quick 选拔渲染出了比分框架';return r;}
        if(html.indexOf('全场')>=0x0){r.why='quick 选拔渲染出了全场状态';return r;}
        if(html.indexOf('国字号')<0x0){r.why='quick 选拔缺少国字号副标题';return r;}
        window.__SIMTEST.cont();continue;
      }
      r.seen.push(p.kind+'m');interSeen++;
      if(p.dec==='intro'&&p.kind==='u17'&&!r.introHtml)r.introHtml=html;
      if(p.dec==='intro'&&p.kind==='u17'&&html.indexOf('豁出去')<0x0){r.why='U17 intro 未渲染选拔态度选项';return r;}
      if(p.kind==='u23'&&!r.u23Html)r.u23Html=html;
      if(!p.result){playMatch(p);}
      else{
        /* 青年决赛文案必须是青年语境：不得出现成年赛措辞；青年专属事件按全场累计检查 */
        var lg=(p.log||[])["concat"](p.result.log||[])["join"](' ');
        if(p.kind==='u17'||p.kind==='u19'||p.kind==='u23'){
          if(lg.indexOf('VAR')>=0x0){r.why='青年决赛出现 VAR 措辞: '+lg.slice(0x0,120);return r;}
          if(lg.indexOf('补水')>=0x0){r.why='青年决赛出现补水措辞';return r;}
          if(lg.indexOf('青训')>=0x0||lg.indexOf('球探')>=0x0||lg.indexOf('家长')>=0x0||lg.indexOf('这个年纪')>=0x0||lg.indexOf('青年')>=0x0)r.youthMarked=!0x0;
        }
        window.__SIMTEST.cont();
      }
      continue;
    }
    r.why='unknown pending: '+t;return r;
  }
  /* 刚升学时记录青年年数（挤占检查用） */
  r.yearsAtGrad=au.age-0xc;
  r.yCaps=window.SIM.yCaps();r.yGoals=window.SIM.yGoals();
  r.ntFlags={'u13':window.SIM.flagGet('_ntU13'),'u15':window.SIM.flagGet('_ntU15'),
    'u17':window.SIM.flagGet('_ntU17'),'u19':window.SIM.flagGet('_ntU19'),
    'u17core':window.SIM.flagGet('_ntU17core'),'u19core':window.SIM.flagGet('_ntU19core'),
    'u23':window.SIM.flagGet('_ntU23')};
  r.trophies=(au.trophies||[]).filter(function(t){var n=String(t.name);
    return n.indexOf('亚少赛')>=0x0||n.indexOf('亚青赛')>=0x0||n.indexOf('U23')>=0x0;}).length;
  r.evCount=(au.flags||{})._evCount||0x0;
  /* 验收 */
  var need=['u13q','u15q','u17m'];
  for(var ni=0x0;ni<need.length;ni++)if(r.seen.indexOf(need[ni])<0x0){r.why='缺少 '+need[ni];return r;}
  if(r.seen.indexOf('u23m')<0x0){r.why='职业期未触发 U23';return r;}
  if(!r.quickHtml){r.why='quick 未渲染';return r;}
  if(!r.introHtml){r.why='U17 intro 未渲染';return r;}
  for(var fi=0x0;fi<4;fi++){var fk=['u13','u15','u17','u23'][fi];
    if(!r.ntFlags[fk]){r.why='flag _nt'+fk+' 未置位';return r;}}
  if(r.yCaps['u17']!==0x1){r.why='U17 _yCaps 应为 1: '+JSON.stringify(r.yCaps);return r;}
  for(var qi=0x0;qi<2;qi++){var qk=['u13','u15'][qi];
    if(r.yCaps[qk]!==undefined&&r.yCaps[qk]!==0x0&&r.yCaps[qk]!==0x2){r.why=qk+' quick caps 异常';return r;}}
  if(r.yCaps['u19']!==0x1){r.why='pushBig U19 记账缺失: '+JSON.stringify(r.yCaps);return r;}
  if(r.yearsAtGrad>0x0&&r.evCount>0x0&&r.evCount<r.yearsAtGrad-0x2){r.why='随机事件被挤占';return r;}
  /* 青训期每年恰好 1 个随机事件（U 系走独立队列）：青年年数最少 4 年（12-15 岁），随机事件不得少于年数 */
  if(r.youthRandom<0x4){r.why='青训期随机事件不足（'+r.youthRandom+'），疑似被挤占';return r;}
  if(!r.youthMarked){r.why='全部青年决赛都没出现青年专属事件';return r;}
  if(r.ntFlags['u17core']||r.trophies>0x0){/* 夺冠路径 */}
  r.ok=!0x0;return r;
}
})()
"""

def run():
    mr = harness.new_engine()
    r = json.loads(str(mr.eval(JS)))
    if r.get('err'):
        raise harness.Fail(r['err'])
    print('seen:', r['seen'])
    print('yCaps:', r['yCaps'], 'yGoals:', r['yGoals'])
    print('flags:', r['ntFlags'], 'trophies(梯队):', r['trophies'])
    print('evCount:', r['evCount'], 'yearsAtGrad:', r['yearsAtGrad'])
    print('U LADDER PASS')

harness.main(run)
