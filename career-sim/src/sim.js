(0x0,!(function(){'use strict';
/* ═══════════════════════════════════════════════════════════════════
 *  SIM.DEOB.JS — 职业生涯模拟引擎
 *  ─────────────────────────────────────────────────────────────────
 *  §1  常量与配置 (L3-13)    游戏模式、籍贯、职员
 *  §2  工具函数 (L14-78)     职员费用、钳制、随机、球队/联赛查找
 *  §3  遗产与状态 (L79-151)  遗产计算、事件评分、状态快照
 *  §4  成长曲线 (L192-198)   aG() 插值成长表
 *  §5  球员类型 (L198-199)   TYPE_MODS 乘数表 + calcPlayerType 类型计算
 *  §6  角色与能力 (L200-213) aH 角色判定、aK 基础产出率
 *  §7  赛事与德比 (L214-288) 淘汰赛、国家大赛、德比映射
 *  §8  大赛系统 (L289-302)   bigmatch 选项与叙事
 *  §9  赛季模拟 (L303-416)   成长、统计、进球助攻、转型
 *  §10 升降级 (L417-471)     联赛升降级、颁奖
 *  §11 合同期 (L473-510)     报告、出场/年龄曲线、合同
 *  §12 转会 (L511-565)       球队筛选、报价生成
 *  §13 青训 (L566-661)       青训选项、质量门控
 *  §14 决策UI (L662-773)     转会/租借/退役/学院界面
 *  §15 事件与收尾 (L774-808) 事件评分、结局判定
 *  §16 公共API (L809-972)    window.SIM 对外接口
 * ═══════════════════════════════════════════════════════════════════ */

/* ── §1 常量与配置 ──────────────────────────────────────────────── */
var a0=window["DATA"],a1=window["EVENTS"],a2=null,a3={'long':{'seasons':0x1,'eventChance':0.85},'normal':{'seasons':0x2,'eventChance':0.95},
'express':{'seasons':0x3,'eventChance':0x1}},a4=[{'id':'ln','name':'辽宁','desc':"足球之乡，从小有"+"正经比赛踢",'ovr':0x3,'money':0x8,'guanxi':0x5,'c1':"#C8102E"},
{'id':'sd','name':'山东','desc':"体校体系完整，一"+"层层往上送",'ovr':0x2,'money':0xc,'guanxi':0xc,'c1':"#F26522"},{'id':'sh','name':'上海','desc':"青训投入大，家里"+"也供得起",'ovr':0x2,'money':0x28,'guanxi':0x12,'c1':"#0B4EA2"},
{'id':'bj','name':'北京','desc':"什么都离得近，包"+"括那些人",'ovr':0x0,'money':0x23,'guanxi':0x1c,'c1':"#1B7A3E"},{'id':'gd','name':'广东','desc':"想出去看看的念头"+"比别处早",'ovr':0x1,'money':0x1e,'guanxi':0xa,'c1':"#E03A3E"},
{'id':'hn','name':'河南','desc':"人多位置少，能冒"+"头的都狠",'ovr':0x4,'money':0x3,'guanxi':0x2,'c1':"#2E7D32"},{'id':"heb",'name':'河北','desc':"挨着京津，好苗子"+"早早被挑走",'ovr':0x3,'money':0x7,'guanxi':0x9,'c1':"#C0392B"},
{'id':"hun",'name':'湖南','desc':"霸得蛮吃得苦，就"+"是没人搭手",'ovr':0x4,'money':0x9,'guanxi':0x3,'c1':"#1B4F72"},{'id':'xj','name':'新疆','desc':"身体条件天生高一"+'截','ovr':0x5,'money':0x2,'guanxi':0x0,'c1':"#1A6FB4"},
{'id':'js','name':'江浙','desc':"踢球在这儿算不务"+'正业','ovr':0x0,'money':0x32,'guanxi':0xe,'c1':"#16A085"},{'id':'sc','name':'巴蜀','desc':"看台上全是人，路"+"却得自己找",'ovr':0x2,'money':0x12,'guanxi':0x6,'c1':"#7D3C98"}],
a5=[{'id':"rehab",'name':"私人康复师",'fee':0x3c,'desc':"伤病少三成",'note':"他只对你一个人负"+'责。'},{'id':"fitness",'name':"体能教练",'fee':0x32,'desc':"衰减放缓两成",'note':"他只让你练不掉下"+'去。'},
{'id':"analyst",'name':"数据分析师",'fee':0x28,'desc':"多一份报价",'note':"你的热图发到了三"+"十家。"},{'id':"agent",'name':"大牌经纪人",'fee':0x5a,'desc':"留洋门槛降一档",'note':"他接得通那几个电"+'话。'},
{'id':"nutritio"+'n','name':"营养师",'fee':0x2d,'desc':"出场多 5%",'note':"连腊肉都被他收走"+'了。'},{'id':'pr','name':"公关团队",'fee':0x46,'desc':"名气不退、黑料减"+'半','note':"让旧新闻沉下去。"},
{'id':"lawyer",'name':"税务律师",'fee':0x37,'desc':"罚款少三成",'note':"他看合同比你看战"+"术板快。"},{'id':"chef",'name':"私人厨师",'fee':0x1e,'desc':"成长快一点",'note':"菜不好吃，你轻了"+"四公斤。"}];
function a6(bx){
return!(!a2["staff"]||!a2["staff"][bx]);
}function a7(bx){
return Math["round"](bx["fee"]*ac(0x1+(a2["peakAnnu"+"alWage"]||0x0)/0x2bc,0x1,0x4));
}function a8(){
for(var bx=0x0,by=0x0;
by<a5["length"];
by++)a6(a5[by]['id'])&&(bx+=a7(a5[by]));
return bx;
}var a9={'ln':["cn-dl","cn-cc","cn-bj","cn-tj","cn-shh","cn-sd"],'sd':["cn-sd","cn-zj","cn-hn","cn-bj","cn-qdh","cn-qdw"],
'sh':["cn-sh","cn-shh","cn-zj","cn-hn","cn-qdh","cn-qdw"],'bj':["cn-bj","cn-tj","cn-hn","cn-sd","cn-dl","cn-shh"],'gd':["cn-sz",
"cn-mz","cn-cd","cn-wh","cn-yn","cn-cc"],'hn':["cn-hn","cn-bj","cn-sd","cn-zj","cn-cc","cn-tj"],'heb':["cn-tj","cn-bj","cn-cc",
"cn-sd","cn-hn","cn-dl"],'hun':["cn-cd","cn-wh","cn-sz","cn-hn","cn-zj","cn-mz"],'xj':["cn-cd","cn-yn","cn-sd","cn-bj","cn-wh",
"cn-hn"],'js':["cn-zj","cn-sh","cn-shh","cn-hn","cn-yn","cn-sd"],'sc':["cn-cd","cn-wh","cn-yn","cn-hn","cn-sz","cn-zj"]},aa={'ln':["cn-dl"],
'sd':["cn-sd"],'sh':["cn-sh"],'bj':["cn-bj"],'gd':["cn-sz"],'hn':["cn-hn"],'heb':["cn-tj"],'hun':["cn-cd"],'xj':[],'js':["cn-zj"],
'sc':["cn-cd"]};
/* ── §2 工具函数 ──────────────────────────────────────────────── */
function ab(bx,by){var bz=a9[bx];
return!!bz&&bz["indexOf"](by)>=0x0;
}function ac(bx,by,bz){
return Math["max"](by,Math["min"](bz,bx));
}function ad(){
a2["rngState"]=a2["rngState"]+0x6d2b79f5>>>0x0;
var bx=a2["rngState"];
return bx=Math["imul"](bx^bx>>>0xf,0x1|bx),(((bx^=bx+Math["imul"](bx^bx>>>0x7,0x3d|bx))^bx>>>0xe)>>>0x0)/0x100000000;
}function ae(bx,by){
return bx+Math["floor"](ad()*(by-bx+0x1));
}function af(bx){
return bx[Math["floor"](ad()*bx["length"])];
}function ag(bx){
for(var by=bx["length"]-0x1;
by>0x0;
by--){var bz=Math["floor"](ad()*(by+0x1)),bA=bx[by];
bx[by]=bx[bz],bx[bz]=bA;
}return bx;
}function ah(bx,by){var bz,bA=0x0;
for(bz=0x0;
bz<bx["length"];
bz++)bA+=Math["max"](0x0,by(bx[bz]));
if(bA<=0x0)return null;
var bB=ad()*bA,bC=0x0;
for(bz=0x0;
bz<bx["length"];
bz++)if(bB<=(bC+=Math["max"](0x0,by(bx[bz]))))return bx[bz];
return bx[bx["length"]-0x1];
}function ai(bx){
for(var by=0x1505,bz=0x0;
bz<bx["length"];
bz++)by=(by<<0x5)+by+bx["charCode"+'At'](bz)>>>0x0;
return by;
}function aj(bx){
for(var by=0x0;
by<a0["TEAMS"]["length"];
by++)if(a0["TEAMS"][by]['id']===bx)return a0["TEAMS"][by];
return null;
}function ak(bx){
for(var by=0x0;
by<a0["LEAGUES"]["length"];
by++)if(a0["LEAGUES"][by]['id']===bx)return a0["LEAGUES"][by];
return null;
}function al(bx){
for(var by=0x0;
by<a0["POSITION"+'S']["length"];
by++)if(a0["POSITION"+'S'][by]['id']===bx)return a0["POSITION"+'S'][by];
return a0["POSITION"+'S'][0x0];
}var am={'ch':"epl",'seg':"liga",'b2':"bund"},ao={'epl':'ch','liga':"seg",'bund':'b2'};
function ap(bx){
return bx?a2&&a2["leagueOf"]&&a2["leagueOf"][bx['id']]||bx["league"]:null;
}function aq(bx){return bx?ak(ap(bx)):null;
}function ar(){
return a2["teamId"]?aj(a2["teamId"]):null;
}function as(){return aq(ar());
}function at(bx,by){
if(!a2["dreamId"]||!bx||!bx["length"])return bx;
for(var bz=0x0;
bz<bx["length"];
bz++)if(bx[bz]['id']===a2["dreamId"])return bx;
for(var bA=null,bB=0x0;
bB<by["length"];
bB++)if(by[bB]['id']===a2["dreamId"]){bA=by[bB];
break;
}return bA?(bx[bx["length"]-0x1]=bA,bx):bx;
}function au(){
if("youth"===a2["phase"]){var bx=aj(a2["youthTea"+"mId"]);
return!bx||aq(bx)['cn'];
}var by=as();
return!by||by['cn'];
}function av(bx){
return Math["abs"](bx)>=0x2710?(bx/0x2710)["toFixed"](0x1)["replace"](/\.0$/,'')+'\x20亿':Math["round"](bx)+'\x20万';
}function aw(bx){
return "胡雪儿"===String(bx["name"]||'')["trim"]()&&!!bx["origin"]&&'sd'===bx["origin"]['id']&&0x2===Number(bx["number"]);
}function ax(){
return Math["min"](0x5,(a2["ovr"]-0x32)/0x7);
}var ay={'ovr':0xa,'talent':0.3,'guanxi':0x18,'money':0x258};
/* ── §3 遗产与状态 ──────────────────────────────────────────────── */
function az(bx){
if(!bx||"object"!=typeof bx)return null;
var by=Math["round"](Number(bx["gen"])||0x0);
return by>=0x2?{'gen':Math["min"](by,0x3e7),'ovr':ac(Math["round"](Number(bx["ovr"])||0x0),0x0,ay["ovr"]),'talent':ac(Number(bx["talent"])||0x0,0x0,ay["talent"]),
'guanxi':ac(Math["round"](Number(bx["guanxi"])||0x0),0x0,ay["guanxi"]),'money':ac(Math["round"](Number(bx["money"])||0x0),0x0,ay["money"])}:null;
}function aA(){var bx=ar(),by=as(),bz={'age':a2["age"],'ovr':a2["ovr"],'talent':a2["talent"],'guanxi':a2["guanxi"],'clean':a2["clean"],
'fame':a2["fame"],'money':a2["money"],'caps':a2["caps"],'natGoals':a2["natStats"]&&a2["natStats"]["goals"]||0x0,'roleRank':a0["ROLES"][a2["role"]]["rank"],
'pos':a2["pos"],'posGroup':al(a2["pos"])["group"],'playerType':a2["playerType"]!=null?a2["playerType"]:0xb,'inChina':au(),'inAcademy':"youth"===a2["phase"],'hasPartner':!(!a2["life"]||!a2["life"]["partner"]),
'partnerYears':a2["life"]&&a2["life"]["partner"]?a2["age"]-a2["life"]["partner"]["since"]:0x0,'married':!(!a2["life"]||!a2["life"]["married"]),
'kids':a2["life"]&&a2["life"]["kids"]["length"]||0x0,'seasonsAtClub':a2["seasonsA"+"tClub"],'seasonsAbroad':a2["seasonsA"+"broad"],
'clubRep':bx?bx["rep"]:0x0,'leagueId':by?by['id']:null,'country':by?by["country"]:null,'leagueRep':by?by["rep"]:0x0,'hasCont':!(!by||!by["cont"]),
'rivalId':aC()&&aC()['id'],'teamId':a2["teamId"],'isCaptain':a2["flags"]["_captain"]===a2["teamId"],'capDone':a2["capDone"]||[]};
for(var bA in a2["flags"])a2["flags"]["hasOwnPr"+"operty"](bA)&&(bz[bA]=a2["flags"][bA]);
return bz;
}function aB(bx){
return bx<=0xf?"kid":bx<=0x14?"youth":bx>=0x21?"vet":"prime";
}function aC(){var bx=ar();
if(!bx)return null;
var by=a0["TEAMS"]["filter"](function(bz){return ap(bz)===ap(bx)&&bz['id']!==bx['id'];
});
return by["length"]?(by["sort"](function(bz,bA){
return Math["abs"](bz["rep"]-bx["rep"])-Math["abs"](bA["rep"]-bx["rep"]);
}),by[0x0]):null;
}function aD(bx){var by=ar(),bz=as(),bA=aC();
return String(bx)["replace"](/\{club\}/g,by?by["name"]:'球队')["replace"](/\{rival\}/g,bA?bA["name"]:'对手')["replace"](/\{league\}/g,
bz?bz["name"]:'联赛');
}function aE(){
for(var bx=aA(),by=aB(a2["age"]),bz=a2["flags"]["_cnCount"]||0x0,bA=a2["flags"]["_evCount"]||0x0,bB=bA>=0x4&&bz/bA>0.45,bC=0x0,
bD=0x0;
bD<a1["length"];
bD++)"light"===a1[bD]["tone"]&&(bC+=a2["usedEven"+'ts'][a1[bD]['id']]||0x0);
var bE=bC>=0x3||a2["banLeft"]>0x0,bF=a1["filter"](function(bG){
if("light"===bG["tone"]&&bE)return!0x1;
var bH=a2["usedEven"+'ts'][bG['id']]||0x0;
if(bH&&!bG["repeat"])return!0x1;
if(bH>=(bG["repeat"]||0x1))return!0x1;
if("kid"===by){if("kid"!==bG["stage"])return!0x1;
}else{if(bx["inAcadem"+'y']){if("youth"!==bG["stage"])return!0x1;
}else{if(bG["stage"]&&bG["stage"]!==by)return!0x1;
}}return!(bG['cn']&&!bx["inChina"]||bG["when"]&&!bG["when"](bx));
});
return bF["length"]?(function(){var bG=ah(bF,function(bH){var bI=bH["weight"]||0x28;
return a2["usedEven"+'ts'][bH['id']]&&(bI*=0.45),bH['cn']&&bB&&(bI*=0.25),bH['cn']&&!bB&&(bI*=1.15),bI;
});if(bG&&bG["pool"]){var bH={};for(var bI in bG)bH[bI]=bG[bI];var bJ=bG["pool"]["slice"]()["sort"](function(){return Math["random"]()-0.5});bH["options"]=bJ["slice"](0x0,(bG["rndPick"]||0x3))["concat"](bG["single"]?[bG["single"]]:[]);for(var bN=0x0;bN<a1["length"];bN++)a1[bN]===bG&&(a1[bN]=bH);return bH;}return bG;})():null;
}function aF(bx){var by=[];
function bz(bI,bJ,bK){
if(bJ){var bL=bJ>0x0,bM=(!0x1===bK?!bL:bL)?'up':"down";
by["push"]({'cls':bM,'text':bI+(bL?'+':'')+bJ});
}}if(bx["ovr"]){var bA;
if(bx["ovr"]<0x0)bA=bx["ovr"];
else{var bB=Math["min"](bx["ovr"],Math["max"](0x0,a2["maxOvr"]-a2["ovr"]));
bA=bB+(bx["ovr"]-bB)*ac((0x64-a2["ovr"])/0x28,0.25,0x1);
}a2["ovr"]=ac(a2["ovr"]+bA,0xc,0x63),a2["maxOvr"]=Math["max"](a2["maxOvr"],a2["ovr"]),bz('能力',Math["round"](0xa*bA)/0xa);
}bx["talent"]&&(a2["talent"]=ac(a2["talent"]+bx["talent"],0.5,1.8),bz('天赋',Math["round"](0x64*bx["talent"])/0x64));
bx["health"]&&(a2["healthBonus"]=ac((a2["healthBonus"]||0x1)*bx["health"],0.4,0x1),0x1!==bx["health"]&&bz('伤病',(bx["health"]<0x1?'-':'+')+Math["round"](0x64*Math["abs"](0x1-bx["health"]))+'%',bx["health"]>=0x1));
if(bx["guanxi"]&&(a2["guanxi"]=ac(a2["guanxi"]+bx["guanxi"],0x0,0x64),bz('关系',bx["guanxi"])),bx["clean"]&&(a2["clean"]=ac(a2["clean"]+bx["clean"],0x0,0x64),bz('清白',bx["clean"])),
bx["fame"]){var bC=bx["fame"]<0x0&&a6('pr')?Math["round"](0.5*bx["fame"]):bx["fame"];
a2["fame"]=ac(a2["fame"]+bC,0x0,0x64),bz('名气',bC);
}if(bx["money"]){var bD=bx["money"];
bD<0x0&&a2["money"]>0x0&&(bD=Math["round"](bD*(0x1+Math["min"](0xc,a2["money"]/0x2bc)))),bD<0x0&&a6("lawyer")&&(bD=Math["round"](0.7*bD));
var bE=a2["money"];
a2["money"]=ac(Math["round"](a2["money"]+bD),-0x320,0x895440);
var bF=a2["money"]-bE;
bF&&by["push"]({'cls':bF>0x0?'up':"down",'text':(bF>0x0?'+':'-')+av(Math["abs"](bF))});
}if(bx["caps"]&&(a2["caps"]+=bx["caps"],by["push"]({'cls':'up','text':"国家队+"+bx["caps"]})),(bx["partner"]||bx["marry"]||bx["kid"]||bx["split"])&&(a2["life"]||(a2["life"]={'partner':null,'married':0x0,'kids':[],'splits':0x0}),
bx["partner"]&&(a2["life"]["partner"]={'label':bx["partner"],'since':a2["age"]},by["push"]({'cls':'up','text':"在一起了"})),bx["marry"]&&a2["life"]["partner"]&&(a2["life"]["married"]=a2["age"],by["push"]({'cls':'up','text':'结婚'}),b1("love_kid"+"_first")),
bx["kid"]&&(a2["life"]["kids"]["push"]({'born':a2["age"]}),by["push"]({'cls':'up','text':0x1===a2["life"]["kids"]["length"]?"当爸爸了":"又一个孩子"})),
bx["split"]&&a2["life"]["partner"]&&(a2["life"]["partner"]=null,a2["life"]["married"]=0x0,a2["life"]["splits"]++,by["push"]({'cls':"down",'text':"分开了"}))),
bx["roleDelt"+'a']&&(a2["roleAdju"+'st']+=bx["roleDelt"+'a'],by["push"]({'cls':bx["roleDelt"+'a']>0x0?'up':"down",'text':bx["roleDelt"+'a']>0x0?"队内地位↑":"队内地位↓"})),
bx["playerType"]!=null&&(a2["playerType"]=bx["playerType"],by["push"]({'cls':'up','text':"类型变更"})),
bx["banGames"]&&(a2["banGames"]+=bx["banGames"],by["push"]({'cls':"down",'text':"停赛 "+bx["banGames"]+'\x20场'})),bx["ban"]&&(a2["banLeft"]+=bx["ban"],
by["push"]({'cls':"down",'text':"禁赛 "+bx["ban"]+" 个赛季"})),bx["banned"]&&(a2["banned"]=!0x0,by["push"]({'cls':"down",'text':"终身禁足"})),
bx["mult"]&&(a2["pendingM"+"ult"]=bx["mult"]),bx["leave"]&&(a2["flags"]["_forceLe"+"ave"]=!0x0),bx["stagnate"]&&(a2["stagnate"]=!0x0),
bx["_severeInjury"]!=null&&(a2["flags"]["_severeInjury"]=bx["_severeInjury"]),bx["_typeShiftDone"]!=null&&(a2["flags"]["_typeShiftDone"]=bx["_typeShiftDone"]),bx["_vetTypeShiftDone"]!=null&&(a2["flags"]["_vetTypeShiftDone"]=bx["_vetTypeShiftDone"]),
bx["lockAbro"+'ad']&&(a2["lockAbro"+'ad']=bx["lockAbro"+'ad']),bx["retire"]&&(a2["flags"]["_forceRe"+"tire"]=!0x0),bx["transfer"+'To']&&b8(bx["transfer"+'To'],
!0x0),bx["returnHo"+'me']){var bG=af(a0["TEAMS"]["filter"](function(bI){
return aq(bI)['cn']&&bI["rep"]>=0x2;
}));
bG&&b8(bG['id'],!0x0);
}if(bx["goAbroad"]){var bH=bf(0x1,{'forceAbroad':!0x0})[0x0];
bH&&b8(bH['id'],!0x0);
}bx["captain"]&&(a2["flags"]["_captain"]=a2["teamId"],(a2["capDone"]||(a2["capDone"]=[]))["indexOf"](a2["teamId"])<0x0&&a2["capDone"]["push"](a2["teamId"])),
bx["capDecline"]&&((a2["capDone"]||(a2["capDone"]=[]))["indexOf"](a2["teamId"])<0x0&&a2["capDone"]["push"](a2["teamId"])),
bx["ntCaptain"]&&(a2["flags"]["_ntCaptain"]=!0x0);
return["ageFraud","yinyang","fixed","gambled","degree","coachCer"+'t',"academy","bianzhi","assistan"+'t',"scout"]["forEach"](function(bI){
bx[bI]&&(a2["flags"][bI]=!0x0);
}),by;
}
/* ── §4 成长曲线 ──────────────────────────────────────────────── */
function aG(bx){
var T=a0["GROWTH"],N=T["length"];
if(bx>=T[N-1]["age"])return T[N-1]['d'];
var k=0x0;
while(k<N-0x2&&bx>=T[k+0x1]["age"])k++;
var t=Math["max"](0,Math["min"](1,(bx-T[k]["age"])/(T[k+1]["age"]-T[k]["age"]))),p=T[k]['d'],q=T[k+1]['d'];
return [p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];}
/* ── §5 球员类型系统 ────────────────────────────────────────────── */
var TYPE_MODS=[{'g':1.40,'a':0.50},{'g':0.70,'a':1.50},{'g':1.10,'a':1.10},{'g':1.15,'a':0.85},{'g':1.20,'a':0.65},{'g':1.70,'a':0.75},{'g':1.05,'a':1.05},{'g':0.45,'a':0.65},{'g':1.15,'a':1.55},{'g':1.00,'a':1.25},{'g':0.45,'a':0.45},{'g':1.00,'a':1.00}];
function calcPlayerType(){var p=a2["pos"],t=a2["talent"],o=a2["ovr"],a=a2["age"];
if(p==="GK")return 0xb;
if(p==="ST")return t>=1.25?0x2:(t>=1.05?(a<=0x14?0x3:0x0):(o>=35?0x0:0x4));
if(p==="RW"||p==="LW")return t>=1.25?0x0:(a<=0x16?0x3:0x0);
if(p==="CAM")return t>=1.15?0x1:(o>=50?0x1:0x5);
if(p==="CM")return t>=1.2?0x1:(o>=50?0x2:0x6);
if(p==="CDM")return t>=1.15?0x6:0x7;
if(p==="CB")return t>=1.1?0x9:0xa;
return t>=1.1?0x9:0x8;}
/* ── §6 角色与能力 ──────────────────────────────────────────────── */
function aH(){var bx=ar();
return bx?aI(bx):"sub";
}function aI(bx){var by=0x30+0x7*bx["rep"],bz=a2["ovr"]-by+0x3*a2["roleAdju"+'st'];
return aq(bx)['cn']&&(bz+=0.12*(a2["guanxi"]-0x32)),a2["age"]<=0x12&&(bz-=0x6),a2["age"]>=0x23&&(bz-=0x3),bz>=0x6?"star":bz>=0x2?"starter":bz>=-0x5?"rot":bz>=-0xc?"sub":"bench";
}function aJ(bx,by,bz){var bA=Math["max"](0x0,bz-0x2d)/0x32,bB=by['cn']?2.6:by["rep"]>=0x4?2.4:1.5;
return Math["max"](0x3,0x140*Math["pow"](bA,2.2)*(0.9+0.55*bx["rep"])*bB);
}function aK(){var bx=al(a2["pos"])["group"];
return "att"===bx?{'goal':0.65,'ast':0.28}:"mid"===bx?{'goal':0.2,'ast':0.38}:"def"===bx?{'goal':0.09,'ast':0.14}:{'goal':0x0,
'ast':0.01};
}function aL(){
return ac((a2["ovr"]-0x48)/0x18,0x0,0x1);
}function aM(){return{'wcq':0.05+0.7*aL()};
}var aN=[{'p':[0.14,0.5],'next':"十六强"},{'p':[0.22,0.42],'next':'八强'},{'p':[0.2,0.42],'next':'四强'},{'p':[0.25,0.38],'next':'决赛'},
{'p':[0.32,0.32],'next':'冠军'}],aO=[{'p':[0.55,0.38],'next':"十六强"},{'p':[0.33,0.42],'next':'八强'},{'p':[0.28,0.44],'next':'四强'},
{'p':[0.32,0.4],'next':'决赛'},{'p':[0.38,0.34],'next':'冠军'}];
/* ── §7 赛事与德比 ──────────────────────────────────────────────── */
function aP(bx,by){
for(var bz="小组赛",bA=0x0;
bA<bx["length"];
bA++){if(bA===bx["length"]-0x1)return{'final':!0x0,'p':bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by};
if(ad()>=bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by)return{'stage':0x0===bA?"小组赛出局":'止步'+bz};
bz=bx[bA]["next"];
}return{'final':!0x0,'p':0.5};}
function groupStage(bx,by){
var _all=[{name:bx["name"],id:bx["id"],rep:bx["rep"],ovr:bx["ovr"],isPlayer:0x1},by[0x0],by[0x1],by[0x2]];
var _m=[],_t={};_all.forEach(function(t){_t[t['id']]={name:t["name"],pts:0x0,gf:0x0,ga:0x0,w:0x0,d:0x0,l:0x0};});
for(var i=0x0;i<_all["length"];i++){for(var j=i+0x1;j<_all["length"];j++){
var a=_all[i],b=_all[j],as=a["ovr"]?a["ovr"]:50+a["rep"]*0x5+ad()*0xa,bs=b["ovr"]?b["ovr"]:50+b["rep"]*0x5+ad()*0xa;
var _sim=_matchSim(as,bs),hg=_sim["hg"],ag=_sim["ag"];
_m["push"]({home:a["name"],away:b["name"],homeId:a["id"],awayId:b["id"],hg:hg,ag:ag});
var h=_t[a["id"]],ap=_t[b["id"]];
h["gf"]+=hg,h["ga"]+=ag,ap["gf"]+=ag,ap["ga"]+=hg;
if(hg>ag)h["w"]++,h["pts"]+=0x3,ap["l"]++;else if(hg<ag)ap["w"]++,ap["pts"]+=0x3,h["l"]++;else h["d"]++,ap["d"]++,h["pts"]++,ap["pts"]++;
}}
var _s=_all["map"](function(t){return _t[t["id"]];})["sort"](function(a,b){
if(b["pts"]!==a["pts"])return b["pts"]-a["pts"];return(b["gf"]-b["ga"])-(a["gf"]-a["ga"]);
});
var _pp=0x0;for(var k=0x0;k<_s["length"];k++){if(_s[k]["name"]===bx["name"]){_pp=k+0x1;break;}}
return{matches:_m,standings:_s,playerPos:_pp};
}
function _bracketNames(n){
if(n>=32)return['三十二强','十六强','八强','四强','决赛'];
if(n>=16)return['十六强','八强','四强','决赛'];
if(n>=8)return['八强','四强','决赛'];
if(n>=4)return['半决赛','决赛'];
return['决赛'];
}
function _bracketSim(playerName,teams){
var cur=[[teams[0],teams[1]]];
for(var i2=2;i2+1<teams.length;i2+=2)cur.push([teams[i2],teams[i2+1]]);
var rn=_bracketNames(teams.length);
var path=[],rIdx=0;
while(cur.length>0){
var winners=[],pRound=null;
for(var m=0;m<cur.length;m++){
var a=cur[m][0],b=cur[m][1];
var r=_matchSim(a.ovr,b.ovr);
var pk=null;
if(r.hg===r.ag){pk=_penSim(a.ovr||0x32,b.ovr||0x32);r.won=pk.a>=pk.b;}
var aIsP=a.n===playerName,bIsP=b.n===playerName;
winners.push(r.won?a:b);
if(aIsP||bIsP){
var pWon=aIsP?r.won:!r.won;
var pg=aIsP?r.hg:r.ag,og=aIsP?r.ag:r.hg;
var opp=aIsP?b:a;
var _sc=pg+"-"+og;
if(pk)_sc+=" (点球 "+pk.a+"-"+pk.b+")";
pRound={round:rn[rIdx]||("第"+(rIdx+1)+"轮"),opp:opp.n,oppId:opp.i,won:pWon,score:_sc};
path.push(pRound);
}
}
if(pRound&&!pRound.won)break;
cur=[];
for(var j=0;j<winners.length;j+=2)if(j+1<winners.length)cur.push([winners[j],winners[j+1]]);
rIdx++;
}
return path;
}
function _playerStr(base,ovr,rank){
var share=rank>=0x4?0.5:rank>=0x3?0.45:rank>=0x2?0.35:rank>=0x1?0.25:0.15;
var delta=ovr-base;
var boost;
if(delta>=0){
var d=Math.min(delta,0x20);
boost=share*d*(0x1+0.15*d/0x20);
boost=Math.min(boost,0x11);
}else{
boost=share*delta*0.15;
}
return Math.round(base+boost);
}
function _teamStr(){
var tm=ar(),rep=tm?tm["rep"]:0x0;
var role=a0["ROLES"][a2["role"]]?a0["ROLES"][a2["role"]]["rank"]:0x0;
return _playerStr(0x2e+rep*0x8,a2["ovr"],role);
}
function _natFormOvr(){
var fm=a2["natForm"]||{};
var wc=fm["wc"]||0,asia=fm["asia"]||0;
var wb=wc>=0x4?0x6:wc>=0x3?0x5:wc>=0x2?0x4:wc>=0x1?0x3:0x0;
var ab=asia>=0x3?0x4:asia>=0x2?0x3:asia>=0x1?0x2:0x0;
return Math.max(wb,ab);
}
function _natStr(){
var role=a0["ROLES"][a2["role"]]?a0["ROLES"][a2["role"]]["rank"]:0x0;
return _playerStr(0x3e,a2["ovr"],role)+_natFormOvr();
}
function _poisson(lam){
if(lam<=0)return 0x0;var L=Math["exp"](-lam),k=0x0,p=0x1;
do{k++;p*=ad();}while(p>L);return k-0x1;
}
function _matchSim(aStr,bStr){
var sd=(aStr-bStr)/0x32;
var lH=1.35*(1+sd*0.85),lA=1.35*(1-sd*0.85);
var hg=_poisson(lH),ag=_poisson(lA);
return{hg:hg,ag:ag,won:hg>ag};
}
function _penSim(aStr,bStr){
aStr=aStr||0x32;bStr=bStr||0x32;
var sd=(aStr-bStr)/0x78;
var pa=Math["max"](0.52,Math["min"](0.8,0.68+sd*0.13));
var pb=Math["max"](0.52,Math["min"](0.8,0.68-sd*0.13));
var a=0,b=0,rn=5;
for(var i=0;i<rn;i++){if(ad()<pa)a++;if(ad()<pb)b++;}
var guard=0;
while(a===b&&guard++<0x14){if(ad()<pa)a++;if(ad()<pb)b++;}
return{a:a,b:b};
}
function _natPool(comp,playerId){
var all=NATS,list=[],picked={};
function take(t){if(!picked[t.i]){list.push(t);picked[t.i]=1;return 1;}return 0;}
if(comp==='wc'){
var player=null;for(var i2=0;i2<all.length;i2++)if(all[i2].i===playerId){player=all[i2];break;}
if(player)take(player);
var quotas={'UEFA':13,'CAF':5,'AFC':4,'CONCACAF':4,'CONMEBOL':4,'OFC':1};
['UEFA','CAF','AFC','CONCACAF','CONMEBOL','OFC'].forEach(function(conf){
var need=quotas[conf],got=0;
var confList=all.filter(function(t){return t.c===conf&&!picked[t.i];}).sort(function(a,b){return b.s-a.s;});
for(var i3=0;i3<confList.length&&got<need;i3++){if(take(confList[i3]))got++;}
});
var rest=all.slice().sort(function(a,b){return b.s-a.s;});
for(var r2=0;r2<rest.length&&list.length<32;r2++)take(rest[r2]);
}else{
var playerA=null;for(var i4=0;i4<all.length;i4++)if(all[i4].i===playerId){playerA=all[i4];break;}
if(playerA)take(playerA);
var afc=all.filter(function(t){return t.c==='AFC'&&!picked[t.i];}).sort(function(a,b){return b.s-a.s;});
for(var a2=0;a2<afc.length&&list.length<16;a2++)take(afc[a2]);
}
return list;
}
function _simGroup4(tm){
var byId={};for(var i5=0;i5<tm.length;i5++)byId[tm[i5].i]={i:tm[i5].i,name:tm[i5].n,ovr:tm[i5].ovr,pts:0,gf:0,ga:0,w:0,d:0,l:0};
var matches=[];
for(var a=0;a<tm.length;a++)for(var b=a+1;b<tm.length;b++){
var tA=tm[a],tB=tm[b],as=tA.ovr||tA.s,bs=tB.ovr||tB.s;
var sim=_matchSim(as,bs),hg=sim.hg,ag=sim.ag;
matches.push({home:tA.n,away:tB.n,homeId:tA.i,awayId:tB.i,hg:hg,ag:ag});
var A=byId[tA.i],B=byId[tB.i];
A.gf+=hg;A.ga+=ag;B.gf+=ag;B.ga+=hg;
if(hg>ag){A.w++;A.pts+=3;B.l++;}else if(ag>hg){B.w++;B.pts+=3;A.l++;}else{A.d++;B.d++;A.pts++;B.pts++;}
}
var arr=[];for(var k in byId)arr.push(byId[k]);
arr.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;return(y.gf-y.ga)-(x.gf-x.ga);});
return{standings:arr,matches:matches};
}
function _natDraw(teams,playerId){
var nGrp=Math.round(teams.length/4),nPot=Math.round(teams.length/nGrp);
for(var attempt=0;attempt<80;attempt++){
var sorted=teams.slice().sort(function(a,b){return b.s-a.s;});
var pots=[];for(var p=0;p<nPot;p++)pots.push([]);
for(var i6=0;i6<sorted.length;i6++)pots[Math.floor(i6/nGrp)].push(sorted[i6]);
var groups=[];for(var g5=0;g5<nGrp;g5++)groups.push([]);
var fail=false;
for(var p2=0;p2<nPot;p2++){
var pot=pots[p2].slice();ag(pot);
var gOrd=[];for(var o5=0;o5<nGrp;o5++)gOrd.push(o5);ag(gOrd);
for(var t5=0;t5<pot.length;t5++){
var placed=false;
for(var tries5=0;tries5<nGrp*4&&!placed;tries5++){
var gi=gOrd[(t5+tries5)%nGrp];
if(groups[gi].length!==p2)continue;
var cnt5=0;for(var k5=0;k5<groups[gi].length;k5++)if(groups[gi][k5].c===pot[t5].c)cnt5++;
if(cnt5<(pot[t5].c==='UEFA'?2:1)){groups[gi].push(pot[t5]);placed=true;}
}
if(!placed){fail=true;break;}
}
if(fail)break;
}
if(!fail){
var pgi=-1;
for(var gg=0;gg<nGrp;gg++)for(var tt=0;tt<groups[gg].length;tt++)if(groups[gg][tt].i===playerId)pgi=gg;
return{groups:groups,playerGroup:pgi,nGroups:nGrp};
}
}
var sorted2=teams.slice().sort(function(a,b){return b.s-a.s;});
var pots2=[];for(var p3=0;p3<nPot;p3++)pots2.push([]);
for(var i7=0;i7<sorted2.length;i7++)pots2[Math.floor(i7/nGrp)].push(sorted2[i7]);
var groups2=[];for(var g6=0;g6<nGrp;g6++)groups2.push([]);
for(var p4=0;p4<nPot;p4++){ag(pots2[p4]);for(var t6=0;t6<pots2[p4].length;t6++)groups2[t6].push(pots2[p4][t6]);}
var pgi2=-1;
for(var gg2=0;gg2<nGrp;gg2++)for(var tt2=0;tt2<groups2[gg2].length;tt2++)if(groups2[gg2][tt2].i===playerId)pgi2=gg2;
return{groups:groups2,playerGroup:pgi2,nGroups:nGrp};
}
function _natBracket(groups){
var quals=[];
for(var g=0;g<groups.length;g++){
var st=groups[g].sim.standings;
quals.push({first:st[0],second:st[1]});
}
var pairs=[];
for(var i=0;i<groups.length;i+=2){
pairs.push([quals[i].first,quals[i+1].second]);
pairs.push([quals[i+1].first,quals[i].second]);
}
return pairs.map(function(pair){
return pair.map(function(t){return{name:t.name,id:t.i,rep:Math.round((t.ovr||0)/20),ovr:t.ovr};});
});
}
function _natStage(ko,playerName,grpPos){
if(grpPos>2)return"小组赛出局";
if(ko&&ko.champion===playerName)return"冠军";
var lastRound=null;
if(ko)for(var r=0;r<ko.rounds.length;r++){
var ms=ko.rounds[r].matches;
for(var m=0;m<ms.length;m++){if(ms[m].home===playerName||ms[m].away===playerName){lastRound=ko.rounds[r].name;break;}}
}
if(lastRound==="决赛")return"亚军";
if(lastRound==="四强")return"止步四强";
if(lastRound==="八强")return"止步八强";
return"止步十六强";
}
function _natFinalScore(t,playerName,bN,bO,bS){
if(t&&t["rounds"]&&t["rounds"]["length"]){
var fin=t["rounds"][t["rounds"]["length"]-0x1]["matches"];
if(fin&&fin["length"]){var m=fin[0x0];
if(m["home"]===playerName){m["hg"]=bN;m["ag"]=bO;if(bS)m["pens"]=[bS[0x0],bS[0x1]];}else{m["ag"]=bN;m["hg"]=bO;if(bS)m["pens"]=[bS[0x1],bS[0x0]];}
}
}
}
function _finalOpp(rounds,playerName){
if(rounds&&rounds["length"]){
var fin=rounds[rounds["length"]-0x1]["matches"];
if(fin&&fin["length"]){var m=fin[0x0];return m["home"]===playerName?m["away"]:m["home"];}
}
return'';
}
function _natFormVal(stage,comp){
if(comp==='wc'){
if(stage==="冠军")return 4;
if(stage==="亚军")return 3;
if(stage==="止步四强")return 2;
if(stage==="止步八强")return 1;
return 0;
}
if(stage==="冠军")return 3;
if(stage==="亚军")return 2;
return 1;
}
function _natPath(rounds,playerName){
var path=[];
if(rounds)for(var r=0;r<rounds.length;r++){
var ms=rounds[r]["matches"];
for(var m=0;m<ms.length;m++){
var mm=ms[m];
if(mm["home"]===playerName||mm["away"]===playerName){
var isHome=mm["home"]===playerName;
var opp=isHome?mm["away"]:mm["home"];
var pg=isHome?mm["hg"]:mm["ag"],og=isHome?mm["ag"]:mm["hg"];
var _nsc=pg+"-"+og;if(mm["pens"]&&mm["pens"]["length"]>=2){var _pa=isHome?mm["pens"][0x0]:mm["pens"][0x1],_pb=isHome?mm["pens"][0x1]:mm["pens"][0x0];_nsc+=" (点球 "+_pa+"-"+_pb+")";}var _nwon=pg>og;if(pg===og&&mm["pens"]&&mm["pens"]["length"]>=2)_nwon=(isHome?mm["pens"][0x0]:mm["pens"][0x1])>=(isHome?mm["pens"][0x1]:mm["pens"][0x0]);path.push({round:rounds[r]["name"],opp:opp,oppId:isHome?mm["awayId"]:mm["homeId"],won:_nwon,score:_nsc});
break;
}
}
}
return path;
}
function _qualStandings(teams,matches){
var st={};
teams.forEach(function(t){st[t.i]={i:t.i,name:t.n,w:0,d:0,l:0,gf:0,ga:0,pts:0};});
matches.forEach(function(m){
var h=st[m["hid"]],a=st[m["aid"]];
if(!h||!a)return;
h["gf"]+=m["hg"];h["ga"]+=m["ag"];a["gf"]+=m["ag"];a["ga"]+=m["hg"];
if(m["hg"]>m["ag"]){h["w"]++;a["l"]++;h["pts"]+=0x3;}
else if(m["hg"]<m["ag"]){a["w"]++;a["pts"]+=0x3;h["l"]++;}
else{h["d"]++;a["d"]++;h["pts"]+=0x1;a["pts"]+=0x1;}
});
var arr=[];for(var k in st)if(st[k])arr["push"](st[k]);
arr["sort"](function(a,b){return b["pts"]-a["pts"]||(b["gf"]-b["ga"])-(a["gf"]-a["ga"]);});
return arr;
}
function _runFriendlies(){
var _ft={i:'chn',n:'\u4e2d\u56fd',s:60,ovr:_natStr()};
var _pool=[];
for(var _fi=0;_fi<NATS["length"];_fi++){
var _f=NATS[_fi];
if(_f["i"]!=='chn'&&_f["c"]!=='UEFA'&&_f["c"]!=='CONMEBOL'&&(_f["s"]||0)>=0x2d)_pool["push"](_f);
}
for(var _fj=_pool["length"]-1;_fj>0;_fj--){var _fk=Math["floor"](ad()*(_fj+1));var _ft2=_pool[_fj];_pool[_fj]=_pool[_fk];_pool[_fk]=_ft2;}
var _fn=Math["min"](_pool["length"],ae(0x2,0x4));
var _ms=[],_w=0,_d=0,_l=0,_gf=0,_ga=0;
for(var _fm=0;_fm<_fn;_fm++){
var _o=_pool[_fm];
var _sa=_ft["ovr"]||_ft["s"],_sb=_o["s"]||_o["ovr"]||0x32;
var _sim=_matchSim(_sa,_sb),_hg=_sim["hg"],_ag=_sim["ag"];
_ms["push"]({home:_ft["n"],away:_o["n"],homeId:'chn',awayId:_o["i"],hg:_hg,ag:_ag});
_gf+=_hg;_ga+=_ag;
if(_hg>_ag)_w++;else if(_hg<_ag)_l++;else _d++;
}
return {matches:_ms,w:_w,d:_d,l:_l,gf:_gf,ga:_ga};
}
function _runNatQual(comp,playerTeam){
var isWC=comp==='wc';
var gSize=isWC?0x5:0x4;
var qualTop=isWC?0x2:0x2;
var all=[];for(var qi=0;qi<NATS["length"];qi++)if(NATS[qi]["c"]==='AFC')all["push"](NATS[qi]);
var hasP=false;for(var qi=0;qi<all["length"];qi++)if(all[qi]["i"]===playerTeam["i"]){hasP=true;break;}
if(!hasP)all["unshift"](playerTeam);
var other=[];for(var qi=0;qi<all["length"];qi++)if(all[qi]["i"]!==playerTeam["i"])other["push"](all[qi]);
var n=other["length"];
var gCount=Math["floor"](n/(gSize-0x1));if(gCount<0x1)gCount=0x1;
var _myGroup=_wDraw(other,gSize-0x1,function(t){return Math.pow((t["s"]||0x3c)/0x3c,0x2);});
var _qRest=[];for(var qi=0;qi<other["length"];qi++)if(_myGroup["indexOf"](other[qi])<0x0)_qRest["push"](other[qi]);
for(var qi=_qRest["length"]-0x1;qi>0x0;qi--){var qj=Math["floor"](ad()*(qi+0x1));var qt=_qRest[qi];_qRest[qi]=_qRest[qj];_qRest[qj]=qt;}
var qgroups=[];qgroups["push"](_myGroup);
for(var qg=0x1;qg<gCount;qg++)qgroups["push"](_qRest["slice"]((qg-0x1)*(gSize-0x1),(qg+0x1)*(gSize-0x1)));
var pgIdx=0x0;
for(var qg=0;qg<qgroups["length"];qg++){
var found=false;for(var qi=0;qi<qgroups[qg]["length"];qi++)if(qgroups[qg][qi]["i"]===playerTeam["i"]){pgIdx=qg;found=true;break;}
if(found)break;
}
if(pgIdx>=qgroups["length"])pgIdx=0x0;
var qmatches=[];var qallGroups=[];
for(var qg=0;qg<qgroups["length"];qg++){
var grp=qgroups[qg];var allG=[playerTeam];for(var qi=0;qi<grp["length"];qi++)allG["push"](grp[qi]);
qallGroups["push"](allG);
for(var qa=0;qa<allG["length"];qa++){
for(var qb=qa+0x1;qb<allG["length"];qb++){
var ta=allG[qa],tb=allG[qb];
var sa=ta["ovr"]||ta["s"]||0x3c,sb=tb["ovr"]||tb["s"]||0x3c;
var sim=_matchSim(sa,sb),hg=sim["hg"],ag=sim["ag"];
qmatches["push"]({hid:ta["i"],aid:tb["i"],hn:ta["n"],an:tb["n"],hg:hg,ag:ag});
}
}
}
var pgSt=_qualStandings(qallGroups[pgIdx]||[],qmatches);
var pgPos=-0x1;
for(var qi=0;qi<pgSt["length"];qi++)if(pgSt[qi]["i"]===playerTeam["i"]){pgPos=qi+0x1;break;}
var qualified=pgPos>0x0&&pgPos<=qualTop;
var stage=qualified?"\u664b\u7ea7":"\u9884\u9009\u8d5b\u51fa\u5c40";
return{comp:comp==='wc'?"\u4e16\u9884\u8d5b":"\u4e9a\u9884\u8d5b",stage:stage,age:a2["age"],playerPos:pgPos,
matches:qmatches,standings:pgSt,groups:qallGroups["map"](function(g){return _qualStandings(g,qmatches);}),
qualified:qualified,playerGroup:pgIdx};
}
function _runNatComp(comp,playerTeam){
var teams=_natPool(comp,playerTeam.i);
var draw=_natDraw(teams,playerTeam.i);
var groups=[];
for(var g=0;g<draw.nGroups;g++){
var tm=draw.groups[g].map(function(t){return{i:t.i,n:(t.i===playerTeam.i?playerTeam.n:t.n),c:t.c,s:t.s,ovr:(t.i===playerTeam.i?playerTeam.ovr:t.s)};});
groups.push({sim:_simGroup4(tm)});
}
var pg=draw.playerGroup<0?0:draw.playerGroup;
var ppos=1;
for(var z=0;z<groups[pg].sim.standings.length;z++)if(groups[pg].sim.standings[z].i===playerTeam.i)ppos=z+1;
var ko=null;
if(ppos<=2)ko=knockoutStage(_natBracket(groups));
var stage=_natStage(ko,playerTeam.n,ppos);
return{comp:comp==='wc'?"世界杯":"亚洲杯",stage:stage,age:a2["age"],playerPos:ppos,
matches:groups[pg].sim.matches,standings:groups[pg].sim.standings,
rounds:ko?ko.rounds:[],path:ko?_natPath(ko.rounds,playerTeam.n):[],playerGroup:pg,
allGroups:groups.map(function(x){return x.sim.standings;})};
}
function knockoutStage(bx){
var _r=[],_rn=["十六强","八强","四强","决赛"],_ri=0x0,_cur=bx;
while(_cur["length"]>0x0){
var _m=[],_w=[];
for(var i=0x0;i<_cur["length"];i++){
var a=_cur[i][0x0],b=_cur[i][0x1];
var as=a["ovr"]?a["ovr"]:50+(a["rep"]||0x3)*0x5+ad()*0xa,bs=b["ovr"]?b["ovr"]:50+(b["rep"]||0x3)*0x5+ad()*0xa;
var _sim=_matchSim(as,bs),_hg=_sim["hg"],_ag=_sim["ag"];
var _pk=null;
if(_hg===_ag){_pk=_penSim(as,bs);}
_m["push"]({home:a["name"],away:b["name"],homeId:a["id"],awayId:b["id"],hg:_hg,ag:_ag,pens:_pk?[_pk.a,_pk.b]:null});
_w["push"]((_pk&&_pk.a>=_pk.b)||(!_pk&&_hg>=_ag)?a:b);
}
_r["push"]({name:_cur["length"]===8?"十六强":_cur["length"]===4?"八强":_cur["length"]===2?"四强":"决赛",matches:_m});
_cur=[];
if(_w["length"]>0x1){for(var j=0x0;j<_w["length"];j+=0x2){if(j+0x1<_w["length"])_cur["push"]([_w[j],_w[j+0x1]]);}}
_ri++;
}
var _fin=_r["length"]>0x0?_r[_r["length"]-0x1]["matches"][0x0]:null;
return{rounds:_r,champion:_fin?((_fin["pens"]&&_fin["pens"]["length"]>=2)?(_fin["pens"][0x0]>=_fin["pens"][0x1]?_fin["home"]:_fin["away"]):(_fin["hg"]>=_fin["ag"]?_fin["home"]:_fin["away"])):null};
}
var aQ={'预选赛出局':0x0,'小组赛出局':0x1,'止步十六强':0x2,'止步八强':0x3,'止步四强':0x4,'亚军':0x5,'冠军':0x6},aR={'wc':{'icon':'🏆','side':"中国队"},'asia':{'icon':'🏅',
'side':"中国队"},'cont':{'icon':'⭐','side':null},'promo':{'icon':'🏟','side':null},'drop':{'icon':'🚨','side':null},'derby':{'icon':'🔥','side':null}},aS={'欧冠':'eu',
'欧联':'eu','亚冠':'as'};
var _dby={'rma':[['bar','国家德比']],'bar':[['rma','国家德比']],'mci':[['mun','曼市德比']],'mun':[['mci','曼市德比'],['liv','双红会']],'liv':[['mun','双红会']],'ars':[['tot','北伦敦德比']],'tot':[['ars','北伦敦德比']],'int':[['acm','米兰德比'],['juv','意大利国家德比']],'acm':[['int','米兰德比']],'juv':[['int','意大利国家德比']],'bay':[['bvb','德国国家德比']],'bvb':[['bay','德国国家德比'],['s04','鲁尔区德比']],'s04':[['bvb','鲁尔区德比']],'psg':[['mar','法国国家德比']],'mar':[['psg','法国国家德比']],'psv':[['fey','荷兰国家德比']],'fey':[['psv','荷兰国家德比']],'por':[['spo','葡萄牙国家德比']],'spo':[['por','葡萄牙国家德比']],'ath':[['rso','巴斯克德比']],'rso':[['ath','巴斯克德比']],'gen':[['sam','热那亚德比']],'sam':[['gen','热那亚德比']],'hsv':[['pau','汉堡德比']],'pau':[['hsv','汉堡德比']],'tor':[['juv','都灵德比']],'sun':[['new','泰恩威尔德比']],'new':[['sun','泰恩威尔德比']],
'cn-sh':[['cn-shh','上海德比'],['cn-bj','京沪大战']],'cn-shh':[['cn-sh','上海德比']],'cn-bj':[['cn-sh','京沪大战']],'hil':[['nsr','利雅得德比']],'nsr':[['hil','利雅得德比']],'ahl':[['itt','吉达德比']],'itt':[['ahl','吉达德比']],'jbh':[['suw','现代德比']],'suw':[['jbh','现代德比']],'gmb':[['cre','大阪德比']],'cre':[['gmb','大阪德比']],'nyc':[['nyr','纽约德比']],'nyr':[['nyc','纽约德比']],'ptl':[['sea','卡斯卡迪亚德比']],'sea':[['ptl','卡斯卡迪亚德比']]},

_dbn={'rma':'国家德比','bar':'国家德比','mci':'曼市德比','mun':'曼市德比','liv':'双红会','ars':'北伦敦德比','tot':'北伦敦德比','int':'米兰德比','acm':'米兰德比','juv':'意大利国家德比','bay':'德国国家德比','bvb':'国家德比','s04':'鲁尔区德比','psg':'法国国家德比','mar':'法国国家德比','psv':'荷兰国家德比','fey':'荷兰国家德比','por':'葡萄牙国家德比','spo':'葡萄牙国家德比',
'cn-sh':'上海德比','cn-shh':'上海德比','cn-bj':'京沪大战','hil':'利雅得德比','nsr':'利雅得德比','ahl':'吉达德比','itt':'吉达德比','jbh':'现代德比','suw':'现代德比','gmb':'大阪德比','cre':'大阪德比','nyc':'纽约德比','nyr':'纽约德比','ptl':'卡斯卡迪亚德比','ath':'巴斯克德比','rso':'巴斯克德比','gen':'热那亚德比','sam':'热那亚德比','hsv':'汉堡德比','pau':'汉堡德比','tor':'都灵德比','sun':'泰恩威尔德比','new':'泰恩威尔德比'};
function aT(bx){
return bx&&aS[bx["cont"]]||null;
}function aU(bx,by,bz){
if('wc'===bx)return af(['巴西','法国',"阿根廷",'德国',"西班牙","英格兰"]);
if("asia"===bx)return af(['日本','韩国','伊朗','沙特',"澳大利亚","卡塔尔","伊拉克","乌兹别克斯坦","阿联酋"]);
var bA=aT(bz);
function bB(bD){
return "cont"===bx?aT(aq(bD))===bA:ap(bD)===ap(by);
}var bC=a0["TEAMS"]["filter"](function(bD){
return bD['id']!==(by&&by['id'])&&bD["rep"]>=(by?by["rep"]-0x1:0x3)&&bB(bD);
});
return bC["length"]||(bC=a0["TEAMS"]["filter"](function(bD){return bD['id']!==(by&&by['id'])&&bB(bD);
})),bC["length"]?af(bC)["name"]:'对手';
}function aV(bx,by,bz){
if(a2["bigQ"]&&a2["bigQ"]["length"])return!0x1;
"promo"!==bx&&"drop"!==bx||(a2["bigStage"+'d']=(a2["bigStage"+'d']||0x0)+0x1);
var bA=ar(),bB=as();
return a2["bigQ"]=[{'kind':bx,'p':by,'recIdx':a2["seasons"]["length"],'age':a2["age"],'comp':bz&&bz["comp"]||'','team':bA?bA["name"]:'','opp':bz&&bz["opp"]||aU(bx,bA,bB),'teamId':bA?bA['id']:null}],
!0x0;
}function _bmOppStr(bx){
  var tm=bx["teamId"]?ar():null;
  if(bx["kind"]==="wc"||bx["kind"]==="asia")return 0x3c+(bx["kind"]==="wc"?0x10:0x8);
  return tm?tm["rep"]*0x8+0x2e:0x46;
}
function _bmEvents(bx){
  var k=bx["kind"],g=al(a2["pos"])["group"]||"att",t=bx["t"]||0x0;
  var m=function(lo,hi){return "第"+ae(t+lo,t+hi)+" 分钟";};
  var common=[
    [m(0x1,0xf)+"，角球开出，禁区内抢点差之毫厘，全场一阵叹息。",null],
    [m(0x1,0xf)+"，一次漂亮的二过一撕开防线，可惜最后的射门被门将没收。",null],
    ["主裁判示意补水时间，双方球员聚在教练席前听布置。",null],
    ["中场拼抢激烈，皮球在两队之间来回易手。",null],
    [m(0x1,0xf)+"，双方在禁区外对攻，最后一脚都差之毫厘。",null],
    ["VAR 介入检查一次禁区内倒地，最终维持原判。",null],
    [m(0x1,0xf)+"，边路下底传中，禁区内头球攻门稍稍偏出。",null],
    ["裁判出示一张黄牌，给了一次战术犯规。",null]
  ];
  var posCommon="gk"===g?[
    [m(0x1,0xf)+"，对方一脚冷射直奔死角，你飞身单掌将球托出横梁！",null],
    ["角球开出，你果断出击双拳将球击出危险区。",null],
    [m(0x1,0xf)+"，你倒地扑出对方近在咫尺的打门，看台响起掌声。",null],
    [m(0x1,0xf)+"，你稳稳接住对方禁区外的一记远射，皮球牢牢抱在怀里。",null],
    ["对方门将开大脚，你示意后防线整体压上。",null]
  ]:"def"===g?[
    ["对方边路起高球，你抢在对方前锋之前将球顶出。",null],
    [m(0x1,0xf)+"，你卡住身位将球护出底线，化解了一次险情。",null],
    ["一次定位球防守，你把落点控制得干干净净。",null],
    [m(0x1,0xf)+"，对方带球强突，你精准铲断将球留下。",null],
    ["你适时前插，在对方禁区前沿逼抢出一次机会。",null]
  ]:"mid"===g?[
    [m(0x1,0xf)+"，你一脚斜长传精准找到边路空当，队友下底传中。",null],
    ["你在中场护球转身，被对方战术犯规放倒。",null],
    [m(0x1,0xf)+"，你送出手术刀直塞，可惜队友越位在先。",null],
    [m(0x1,0xf)+"，你从后场一路带球推进到中场，分给前插的队友。",null],
    ["你在禁区弧顶拿球，作势要射，骗过防守后传给空当的队友。",null]
  ]:[
    ["你在禁区弧顶一带游弋，寻找接应机会。",null],
    ["你背身倚住后卫做球，为队友创造了一次射门空间。",null],
    [m(0x1,0xf)+"，你的一次反越位跑动撕开防线，可惜传球慢了一拍。",null],
    [m(0x1,0xf)+"，你在禁区里被对手贴身防守，灵巧转身骗开角度。",null],
    ["你回撤到中场拿球，转身带球直冲对方防线。",null]
  ];
  var goalMe="att"===g?[
    [m(0x1,0xf)+"，你接到队友直塞，冷静推射远角得手！","打进了关键一球",0x1,null],
    [m(0x1,0xf)+"，你在禁区混战中捅射破门！","率先打破僵局",0x1,null],
    [m(0x1,0xf)+"，你主罚的任意球绕过人墙，直挂死角！","轰进世界波",0x1,null],
    [m(0x1,0xf)+"，你用一次灵巧的转身摆脱防守，低射入网！","完成致命一击",0x1,null],
    [m(0x1,0xf)+"，你胸部停球顺势凌空抽射，皮球直挂死角！","凌空斩",0x1,null]
  ]:"mid"===g?[
    [m(0x1,0xf)+"，你在大禁区线上张弓搭箭，一脚世界波直挂死角！","轰进世界波",0x1,null],
    [m(0x1,0xf)+"，你后插上抢点，将队友的传中狠狠顶入网窝！","抢点破门",0x1,null],
    [m(0x1,0xf)+"，禁区里一片混乱，你机警补射得手！","补射入网",0x1,null],
    [m(0x1,0xf)+"，你主罚的任意球绕过人墙，直挂死角！","轰进世界波",0x1,null],
    [m(0x1,0xf)+"，你在中场断球后长途奔袭，面对门将冷静推射得手！","一条龙破门",0x1,null]
  ]:"def"===g?[
    [m(0x1,0xf)+"，角球开出，你高高跃起将球砸入球网！","头球建功",0x1,null],
    [m(0x1,0xf)+"，定位球混战中，你迎球怒射破门！","定位球破门",0x1,null],
    [m(0x1,0xf)+"，后场一次任意球机会，你抢到第二落点爆射破门！","远射建功",0x1,null],
    [m(0x1,0xf)+"，角球二次进攻，你禁区外一脚凌空抽射直挂死角！","世界波破门",0x1,null],
    [m(0x1,0xf)+"，你从后场带球一路推进，远射轰出一记势大力沉的进球！","带球远射",0x1,null]
  ]:[];
  var goalOpp="gk"===g?[
    [m(0x1,0xf)+"，对方一脚角度极刁的射门，你扑到了但没能拦下。",null,null,0x1],
    [m(0x1,0xf)+"，对方近距离抢点，你反应神速仍鞭长莫及。",null,null,0x1],
    [m(0x1,0xf)+"，对方禁区内点球，你猜对了方向但仍差毫厘。",null,null,0x1],
    [m(0x1,0xf)+"，对方前锋小角度打门，球从你手边滑入远角。",null,null,0x1],
    [m(0x1,0xf)+"，对方一脚吊射越过你头顶，你回追不及目送入网。",null,null,0x1]
  ]:"def"===g?[
    [m(0x1,0xf)+"，你的一次解围踢疵，被对方抓住机会打进。",null,null,0x1],
    [m(0x1,0xf)+"，对方利用定位球头球破门，你盯防的人抢到了落点。",null,null,0x1],
    [m(0x1,0xf)+"，对方边路突破后倒三角回传，跟进推射得手。",null,null,0x1],
    [m(0x1,0xf)+"，对方一脚过顶长传打穿防线，前锋凌空垫射破门。",null,null,0x1],
    [m(0x1,0xf)+"，对方禁区前沿配合后远射，球折射后变向入网。",null,null,0x1]
  ]:"mid"===g?[
    [m(0x1,0xf)+"，中场被断球，对方一脚直塞打穿防线。",null,null,0x1],
    [m(0x1,0xf)+"，对方利用定位球头球破门。",null,null,0x1],
    [m(0x1,0xf)+"，对方禁区外一脚冷射，皮球折射入网。",null,null,0x1],
    [m(0x1,0xf)+"，对方中场抢断后就地组织，一脚直塞撕开防线。",null,null,0x1],
    [m(0x1,0xf)+"，对方在禁区前沿打出精妙配合，最后一传一射干净利落。",null,null,0x1]
  ]:[
    [m(0x1,0xf)+"，你前场丢球，对方迅速发动反击得分。",null,null,0x1],
    [m(0x1,0xf)+"，对方利用定位球头球破门。",null,null,0x1],
    [m(0x1,0xf)+"，对方后场长传找到前锋，单刀推射得手。",null,null,0x1],
    [m(0x1,0xf)+"，对方边路传中，前锋抢点甩头攻门，球砸入死角。",null,null,0x1],
    [m(0x1,0xf)+"，对方一次快速反击，二打一轻松推射空门得手。",null,null,0x1]
  ];
  if(k==="derby")common=common.concat([
    ["德比的火药味蔓延到看台，两片看台隔空对骂。",null],
    [m(0x1,0xf)+"，全场最恨的那个人放铲——你被抬到场边处理。",null,null,null,"inj"],
    ["整座球场像一口高压锅，每一次拼抢都带着火星。",null],
    ["两队教练在场边互相指责，第四官员忙着拉架。",null],
    ["看台上有人扔下了一条围巾，正好落在球场中央。",null]
  ]);
  if(k==="wc"||k==="asia")common=common.concat([
    ["国歌奏响时，你的眼眶发热。",null],
    ["看台上旅欧球迷的助威鼓声从没停过。",null],
    ["看台上的五星红旗铺满了整片看台。",null],
    ["场边的摄影记者围了里三层外三层。",null],
    ["你低头看了看胸前的国旗，深吸一口气。",null]
  ]);
  var pool;
  if(bx["_injured"]){
    pool=common.concat([
      ["你被换下后在替补席接受治疗，队医在你伤处缠上绷带。",null],
      ["你只能坐在替补席上干着急，眼睁睁看着比赛继续。",null],
      ["你在替补席来回踱步，一次次冲到场边朝队友喊话。",null],
      ["队医在你腿上喷了止痛喷雾，疼痛稍有缓解。",null],
      ["你裹着外套坐在替补席最前排，紧握双拳盯着场上。",null]
    ]);
  }else{
    pool=common.concat(posCommon);
    if(goalMe["length"]&&ad()<0.3)pool=pool.concat(goalMe);
    if(goalOpp["length"]&&ad()<0.24)pool=pool.concat(goalOpp);
  }
  return pool;
}
function _bmOpts(bx,dec){
  var k=bx["kind"];
  var map=({"derby":["收缩防线","为他们冲垮对面","在中场缠住他们"],"wc":["踢得务实些","为国家豁出去","让皮球流动起来"],"cont":["控制节奏","全场高压逼抢","控球渗透"],"asia":["务实防守","全力冲击对手","地面推进"],"promo":["守住这个结果","历史由我们书写","耐心倒脚"],"drop":["冷静，再冷静","豁出去搏命","把球牢牢拿住"]}[k])||["稳住","压上","控球"];
  function opt(key){
    var lab=key==="hold"?map[0x0]:key==="push"?map[0x1]:key==="run"?map[0x2]:key==="wall"?"全员退防":key==="solo"?"自己单干":"稳住";
    var hint=key==="hold"?"小幅提高赢面，个人数据平淡":key==="push"?"赢面涨得最多，也最可能被反击打穿":key==="run"?"居中，队友更愿意找你":key==="wall"?"摆大巴死守到底，难看但有效":key==="solo"?"孤注一掷用个人能力解决问题":"";
    return{"key":key,"label":lab,"hint":hint};
  }
  var sc=bx["score"]||[0,0];
  if(dec==="kickoff"||dec==="halftime"){
    if(sc[0x0]>sc[0x1])return[opt("hold"),opt("wall"),opt("push")];
    if(sc[0x0]<sc[0x1])return[opt("push"),opt("solo"),opt("hold")];
    return[opt("hold"),opt("push"),opt("run")];
  }
  if(dec==="endgame"){
    if(sc[0x0]>=sc[0x1])return[opt("hold"),opt("push")];
    return[opt("push"),opt("solo")];
  }
  if(dec==="extra")return[opt("push"),opt("hold")];
  if(dec==="pen")return[{"key":"left","label":"射向左下角","hint":"瞄着最刁的角度，但门将也可能猜中"},{"key":"top","label":"打中路","hint":"骗门将扑边，自己打中间"},{"key":"right","label":"射向右上角","hint":"大力抽向死角"}];
  return[opt("hold"),opt("push"),opt("run")];
}
function _bmIntro(bx){
  var k=bx["kind"],opp=bx["opp"]||"对手",side=bx["team"]||"你们";
  var _pick=function(arr){return arr[Math.floor(Math.random()*arr.length)];};
  if(k==="derby")return _pick([
    "德比之夜。整座城市在这一晚分成两半，看台上的歌声与呐喊几乎要把屋顶掀翻。对手是"+opp+"，恩怨早已写进历史——今天，你要让对面半座城安静下来。",
    "同城死敌，无需动员。从踏进球场的那一刻起，空气里就弥漫着火药味。"+opp+"的球迷已经在看台上竖起了巨型横幅，你绝不能让他们笑着离开。",
    "德比日，整座城市只分成两种颜色。赛前外卖小哥都在问你支持哪边。"+opp+"那边已经提前一周在社交媒体上挑衅了，今天是回击的时候。",
    "出租车司机一路上都在骂"+opp+"，街边小饭馆的电视已经调好了直播。这座城市今晚只有一个话题——谁才是真正的老大。",
    "德比的意义从来不只是三分。走出更衣室时，看台上那片山呼海啸般的敌意扑面而来，但你知道，球场的另一端，有同样的狂热在为你燃烧。"
  ]);
  if(k==="wc")return _pick([
    "世界杯决赛！这是每一个球员从孩提时代起就梦寐以求的舞台。全世界的目光聚焦于此，国歌奏响的那一刻，你会明白自己为什么一路走到这里。",
    "决赛之夜。万里之外的球迷守在屏幕前，国内的街道空无一人——所有人都在等你。这座球场将见证历史，而你就是历史的一部分。",
    "世界杯决赛，一生可能只有一次。走进球场时，闪光灯像星星一样铺满了整个看台。你的手微微发抖，但心里只有一个念头：把它赢下来。",
    "国歌响彻球场，你的眼眶湿润了。从街头踢球的孩子到站上世界杯决赛的舞台，这条路走了太久。"+opp+"已经站好了位置，裁判即将吹响哨声。",
    "决赛前夜你几乎没有合眼。现在站在这里，草皮的香气、看台的声浪、队友的呼吸——一切都真实得不像话。"+opp+"是最后一道关卡，跨过去就是冠军。"
  ]);
  if(k==="asia")return _pick([
    "亚洲之巅。四年一届的亚洲杯决赛，你站在这里，身后是无数国人的期待。对手是"+opp+"，这是一场不容有失的比赛。",
    "亚洲杯决赛，国内已经是凌晨三点，但一定有人守着直播。你代表着这片土地上所有踢球的孩子，"+opp+"不会轻易把冠军拱手相让。",
    "从小组赛一路杀进决赛，每一场都是硬仗。"+opp+"的球员技术细腻、配合默契，但你们有你们的武器——那股子不服输的劲。",
    "颁奖台已经摆在了场边，金色的奖杯在灯光下闪闪发亮。但你心里清楚，只有跨过"+opp+"这最后一道坎，它才属于你。",
    "赛前教练只说了一句话：想想你们是怎么走到这里的。是啊，从预选赛到淘汰赛，每一步都是拼命拼出来的。决赛，不过是最后一拼。"
  ]);
  if(k==="cont")return _pick([
    "洲际赛场的终极决战。你所在的"+side+"闯入决赛，对手是"+opp+"。一个赛季的拼搏，浓缩在这九十分钟里。",
    "欧冠之夜。这是欧洲之巅的对决，全世界最好的球队在这里碰撞。"+opp+"的阵容星光熠熠，但你们走到这里靠的不是名气，是血性和信念。",
    "从小组赛死里逃生到半决赛惊天逆转，你们的故事已经足够传奇。但决赛是另一回事——"+opp+"不会给你任何犯错的机会。",
    "球场外的广告牌闪烁着赞助商的logo，球场内的空气却紧张得几乎凝固。"+opp+"的球迷方阵已经开始了他们的战歌，你深吸一口气，准备迎战。",
    "教练在更衣室里最后叮嘱了一遍战术，然后看着你说：今晚靠你了。你点点头，走出更衣室的通道，看台上的声浪扑面而来。"
  ]);
  if(k==="promo")return _pick([
    "升级附加赛！一个赛季的挣扎与坚持，换来这场一战定生死的机会。赢下它，你们将踏上更高的舞台。",
    "九十分钟决定一个赛季的命运。赢了，明年在这个球场踢的将是顶级联赛；输了，一切回到原点。没有加时，没有退路。",
    "赛前更衣室里异常安静，每个人都在想同一件事：这场球不能输。对方的实力不弱，但你们走到这一步，靠的就是这股子韧劲。",
    "教练在白板上画完最后一个战术跑位，转身对你们说：今天不是来学习的，是来拼命的。你们互相看了一眼，眼神里全是决心。",
    "球场外的球迷已经开始庆祝了——不，他们是在提前为自己打气。这条通往顶级联赛的路，就差这最后一场了。"
  ]);
  if(k==="drop")return _pick([
    "保级生死战。这场比赛的结局，决定球队明年的命运。没有退路，没有人想带着降级离开。",
    "如果今天输了，明年你们将出现在更低级别的联赛名单上。这座球场、这些球迷、这个赛季的所有努力——都悬在这一场比赛上。",
    "保级战从来不是什么好看的比赛。没有华丽的传控，只有拼命的奔跑和凶狠的铲断。但这就是生存的方式。",
    "赛前队长把大家叫到一起：我不管外面怎么写我们，今天只要拿出命来踢，结局就不会太难看。所有人把手叠在一起，喊了一声。",
    "对方只需要一分就能保级，而你们必须赢。这意味着你们要压上、要冒险、要面对他们每一次反击的威胁。但别无选择。"
  ]);
  return _pick([
    "关键一战。你所在的"+side+"迎战"+opp+"，全场球迷的呐喊已经响彻球场。",
    "这是一场谁也输不起的比赛。"+opp+"已经做好了准备，而你们的更衣室里，空气几乎凝固。",
    "赛前训练只持续了半小时，教练说：今天不需要练了，你们知道该怎么做。走出训练场时，你抬头看了看天空，深吸一口气。",
    "球场外聚集了大批球迷，有人举着你的名字的牌子。你透过大巴车窗看到这一幕，心里默默说了一句：今晚不会让你们失望。",
    "双方球员在通道里列队，目光交汇的一瞬间，火花四溅。"+opp+"的队长朝你点了点头，你也微微点头回应——竞技场上，尊重从这一刻开始。"
  ]);
}
function _bmSeg(bx){
  var as=Math["round"](a2["ovr"]+0x18),bs=_bmOppStr(bx);
  if(bx["kind"]==="wc"||bx["kind"]==="asia")as=Math["round"](_natStr? _natStr() : a2["ovr"]+0x18);
  var sd=(as-bs)/0x32;
  var mood=bx["_mood"]||0x0;
  var lH=0.225*(1+(sd+mood*0.06)*0.85),lA=0.225*(1-(sd+mood*0.06)*0.85);
  if(lH<0.08)lH=0.08;if(lA<0.08)lA=0.08;
  var hg=_poisson(lH),ag=_poisson(lA);
  var ev=null;
  if(ad()<0.55){
    var pool=_bmEvents(bx);
    if(pool&&pool["length"]){
      var _hist=bx["_evHist"]||[],_try=0;
      do{ev=pool[Math["floor"](ad()*pool["length"])];_try++;}while(_try<0x6&&_hist["indexOf"](ev[0x0])>=0x0);
      _hist["push"](ev[0x0]);if(_hist["length"]>0x4)_hist["shift"]();
      bx["_evHist"]=_hist;
      if(ev[0x4]==="inj")bx["_injured"]=!0x0;
      if(ev[0x2]!=null)hg=Math["max"](hg,ev[0x2]);
      if(ev[0x3]!=null)ag=Math["max"](ag,ev[0x3]);
    }
  }
  bx["score"][0x0]+=hg;bx["score"][0x1]+=ag;
  var t=bx["t"]||0,_isInj=ev&&ev[0x4]==="inj",_isGoalEv=ev&&(ev[0x2]!=null||ev[0x3]!=null);
  var _teamGoalPool=[
    "由一次流畅配合破门",
    "在一次快速反击中冷静推射得手",
    "抓住对方防线的失误，轻松破门",
    "通过一连串耐心的传导，撕开防线得分",
    "在一次角球混战中把球捅进网窝",
    "边路起球，中路跟进抢点破门",
    "禁区前沿的一脚世界波，直挂死角"
  ];
  var _oppGoalPool=[
    "对方抓住一次机会扳回一城",
    "对方同样用一次漂亮配合还以颜色",
    "对方通过一次定位球机会追回一分",
    "对方抓住我方后场的一次失误破门",
    "对方远射轰开球门，缩小了比分差距"
  ];
  var _pick=function(arr){return arr[Math["floor"](ad()*arr["length"])];};
  if(_isInj)bx["log"]["push"](ev[0x0]);
  if(ev&&ev[0x0]&&!hg&&!ag&&!_isGoalEv&&!_isInj)bx["log"]["push"](ev[0x0]+(ev[0x1]?"（你"+ev[0x1]+"）":""));
  if(hg>0&&ag>0){
    var _mh=ae(t+0x1,t+0xf);
    if(_isGoalEv&&ev[0x2]!=null&&ev[0x0])bx["log"]["push"](ev[0x0]+(ev[0x1]?"（你"+ev[0x1]+"）":""));
    else bx["log"]["push"]("第"+_mh+" 分钟，"+(bx["side"]||"你们")+_pick(_teamGoalPool)+"。");
    if(_isGoalEv&&ev[0x3]!=null&&ev[0x0])bx["log"]["push"](ev[0x0]+(ev[0x1]?"（你"+ev[0x1]+"）":""));
    else bx["log"]["push"]("第"+ae(_mh,Math["min"](_mh+0x5,t+0xf))+" 分钟，"+_pick(_oppGoalPool)+"。");
  }else{
    if(hg>0){
      if(_isGoalEv&&ev[0x2]!=null&&ev[0x0])bx["log"]["push"](ev[0x0]+(ev[0x1]?"（你"+ev[0x1]+"）":""));
      else bx["log"]["push"]("第"+ae(t+0x1,t+0xf)+" 分钟，"+(bx["side"]||"你们")+_pick(_teamGoalPool)+"。");
    }
    if(ag>0){
      if(_isGoalEv&&ev[0x3]!=null&&ev[0x0])bx["log"]["push"](ev[0x0]+(ev[0x1]?"（你"+ev[0x1]+"）":""));
      else bx["log"]["push"]("第"+ae(t+0x1,t+0xf)+" 分钟，"+_pick(_oppGoalPool)+"。");
    }
  }
  return{hg:hg,ag:ag};
}
function _bmAdvance(bx){
  while(true){
    if(bx["done"])return;
    if(bx["dec"])return;
    var seg=bx["seg"]||0x0;
    if(seg===0x0){bx["seg"]=0x1;bx["dec"]="intro";bx["opts"]=[{'key':"start",'label':"开始比赛",'hint':"走上球场，全场球迷都在等你"}];return;}
    if(seg===0x1){bx["seg"]=0x2;bx["dec"]="kickoff";bx["opts"]=_bmOpts(bx,"kickoff");return;}
    if(seg===0x5){bx["seg"]=0x6;bx["dec"]="halftime";bx["opts"]=_bmOpts(bx,"halftime");return;}
    if(seg===0x9){
      var sc=bx["score"];
      if(sc[0x0]===sc[0x1]){bx["seg"]=0xa;bx["dec"]="extra";bx["opts"]=_bmOpts(bx,"extra");return;}
      bx["done"]=!0x0;return;
    }
    if(seg>=0xa){bx["done"]=!0x0;return;}
    var _ph=bx["score"][0x0],_pa=bx["score"][0x1];
    _bmSeg(bx);
    bx["t"]=(bx["t"]||0x0)+0xf;
    if(bx["score"][0x0]!==_ph||bx["score"][0x1]!==_pa)bx["log"]["push"]("比分 "+(bx["side"]||"你们")+" "+bx["score"][0x0]+" : "+bx["score"][0x1]);
    bx["seg"]=seg+0x1;
  }
}
function _bmFinish(bI,_p){
  var bM,bN=_p["score"][0x0],bO=_p["score"][0x1],bP=[],bQ='',bS=null;
  var bW=al(a2["pos"])["group"],bV=aR[bI["kind"]]["side"]||bI["team"];
  var as=Math["round"](a2["ovr"]+0x18),bs=_bmOppStr(bI);
  if(bI["kind"]==="wc"||bI["kind"]==="asia")as=Math["round"](_natStr? _natStr() : a2["ovr"]+0x18);
  var _mood=bI["_mood"]||0x0;
  var sd=(as-bs)/0x5a;
  if(bN===bO&&!_p["_extraDone"]){
    _p["_extraDone"]=!0x0;
    _p["log"]["push"]("九十分钟战平，进入加时赛。");
    var eH=0.12*(1+(sd+_mood*0.06)*0.85),eA=0.12*(1-(sd+_mood*0.06)*0.85);
    if(eH<0.06)eH=0.06;if(eA<0.06)eA=0.06;
    var _eh=_poisson(eH),_ea=_poisson(eA);
    var _etH=["终于打破僵局！","在加时赛补射得手！","抓住加时赛的一次反击机会破门！","一脚世界波轰开对方球门！"],_etA=["对方完成了绝杀！","对方在加时赛扳回一城！","对方通过定位球在加时赛得分！"];
    if(_eh>0)bN+=_eh,_p["log"]["push"]("加时赛，"+bV+_etH[Math["floor"](ad()*_etH["length"])]);
    if(_ea>0)bO+=_ea,_p["log"]["push"]("加时赛，"+_etA[Math["floor"](ad()*_etA["length"])]);
    _p["score"][0x0]=bN;_p["score"][0x1]=bO;
    _p["log"]["push"]("比分 "+bV+" "+bN+" : "+bO);
    if(bN===bO&&!bI["_injured"]){
      _p["log"]["push"]("加时赛结束，比分仍然战平，进入点球大战！");
      _p["dec"]="pen";_p["opts"]=_bmOpts(bI,"pen");
      a2["pending"]=_p;
      return;
    }
  }
  if(bN===bO&&_p["_extraDone"]){
    bP["push"]("九十分钟和加时都没分出胜负。点球大战。");
    var _sa=_p["_penA"]===!0x0?0x6c:0x5e,_sb=0x5c;
    var _pa=ac(_sa/0x64,0.5,0.82),_pb=ac(_sb/0x64,0.5,0.82);
    var _a=0,_b=0,_guard=0;
    function _pkR(p){return ad()<p;}
    for(var _r=0;_r<5;_r++){if(_pkR(_pa))_a++;if(_pkR(_pb))_b++;}
    while(_a===_b&&_guard++<0x14){if(_pkR(_pa))_a++;if(_pkR(_pb))_b++;}
    bS=[_a,_b];
    bM=_a>=_b;
    !bI["_injured"]&&bP["push"](_p["_penA"]===!0x0?"你主罚的一球稳稳命中，为球队提供了保障。":"你主罚的一球被扑出，球队陷入被动。");
    bP["push"]("点球 "+_a+" : "+_b);
  }else{
    bM=bN>bO;
    bQ=bM?"领先":"落后";
  }
  var bX=null;
  bI["_injured"]||(a2["seasons"][bI["recIdx"]]||{"apps":0x0})["apps"]>0x0&&ad()<0.4&&(bX='gk'===bW?bS?"点球大战中扑出了关键一球":'第\x20'+ae(0x3c,0x58)+(" 分钟单掌把必进"+"球托了出去"):"def"===bW?"在门线上把球解围"+'出去':"mid"===bW?bM?"送出了那记决定比"+"赛的直塞":"把球权一次次抢回"+'来':bM?"打进了那个球":"打出了全队唯一一"+"次射正"),
  bX&&bP["push"]('你'+bX+'。'),
  bI["_injured"]&&bP["push"]("你被换下后坐在替补席上看完了剩下的比赛，伤处还在隐隐作痛。");
  'derby'===bI["kind"]&&bP["push"](bM?"终场哨响的那一刻"+"，属于你的那半边"+"看台炸了。有人抱"+"着你哭。":"对面看台的歌声一"+"直唱到终场，像刀"+"子一样扎进耳朵。"+"\u8fd9就是德比。");
  var bY=bV+'\x20'+bN+" 比 "+bO+(bS?"，点球 "+bS[0x0]+" 比 "+bS[0x1]:'')+'。';
  bP["push"](bM?"终场哨响。"+bY+(bS?"点球大战赢下来的"+"那种赢法，腿是软"+'的。':"很多年以后你还会"+"梦到这一刻。"):bY+(bS?"点球大战输掉的球"+"，最难过去。":"你在草皮上坐了很"+"久，没人来拉你。"));
  var bZ=a2["seasons"][bI["recIdx"]]||null,c0=[];
  bZ&&bZ["apps"]>0x0&&(bX&&'gk'!==bW&&("mid"===bW||"def"===bW?(bZ["assists"]++,a2["totals"]["assists"]++):(bZ["goals"]++,a2["totals"]["goals"]++)),
  'wc'===bI["kind"]||"asia"===bI["kind"]?(b0(bZ,bI["comp"],bM?'冠军':'亚军',bI["age"]),'wc'===bI["kind"]?a2["natForm"]["wc"]=bM?0x4:0x3:a2["natForm"]["asia"]=bM?0x3:0x2):"cont"===bI["kind"]&&bM?(bZ["trophies"]["push"](bI["comp"]+'冠军'),a2["trophies"]["push"]({'name':bI["comp"]+'冠军','age':bI["age"],'team':bI["team"]})):"promo"===bI["kind"]&&bM?(a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][bI["teamId"]]=am[bI["fromLeag"+'ue']],bZ["move"]='升上'+ak(am[bI["fromLeag"+'ue']])["name"]):"drop"!==bI["kind"]||bM||(a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][bI["teamId"]]=ao[bI["fromLeag"+'ue']],bZ["move"]='降入'+ak(ao[bI["fromLeag"+'ue']])["name"]));
  if(a2["_natWC"]){var _tw=a2["_natWC"];_tw["stage"]=bM?'冠军':'亚军';_natFinalScore(_tw,"中国队",bN,bO,bS);var _frw=_tw["rounds"]&&_tw["rounds"]["length"]?_tw["rounds"][_tw["rounds"]["length"]-0x1]:null;if(_frw)_frw["won"]=bM;var _pw=_tw["path"]&&_tw["path"]["length"]?_tw["path"][_tw["path"]["length"]-0x1]:null;if(_pw){_pw["won"]=bM;var _ps2=(bS&&bS["length"]>=2)?(bN+"-"+bO+" (点球 "+bS[0x0]+"-"+bS[0x1]+")"):(bN+"-"+bO);_pw["score"]=_ps2;}a2["natForm"]["wc"]=bM?0x4:0x3;delete a2["_natWC"];}if(a2["_natAsia"]){var _ta=a2["_natAsia"];_ta["stage"]=bM?'冠军':'亚军';_natFinalScore(_ta,"中国队",bN,bO,bS);var _fra=_ta["rounds"]&&_ta["rounds"]["length"]?_ta["rounds"][_ta["rounds"]["length"]-0x1]:null;if(_fra)_fra["won"]=bM;var _pa2=_ta["path"]&&_ta["path"]["length"]?_ta["path"][_ta["path"]["length"]-0x1]:null;if(_pa2){_pa2["won"]=bM;var _ps3=(bS&&bS["length"]>=2)?(bN+"-"+bO+" (点球 "+bS[0x0]+"-"+bS[0x1]+")"):(bN+"-"+bO);_pa2["score"]=_ps3;}a2["natForm"]["asia"]=bM?0x3:0x2;delete a2["_natAsia"];}if(a2["_contRun"]){var _cr3=a2["_contRun"];_cr3["result"]=bM?"冠军":"止步决赛";var _fr3=_cr3["rounds"][_cr3["rounds"]["length"]-0x1];_fr3["won"]=bM;_fr3["score"]=bN+"-"+bO;if(bS)_fr3["score"]+=(" (点球 "+bS[0x0]+"-"+bS[0x1]+")");a2["cupRuns"]["push"](_cr3);delete a2["_contRun"];}
  var c1=bM?'derby'===bI["kind"]?0xc:'wc'===bI["kind"]?0x1e:"asia"===bI["kind"]?0x12:0x10:'derby'===bI["kind"]?0x2:'wc'===bI["kind"]?0xa:0x4,c2=Math["round"](c1*(0x1-a2["fame"]/0x64));
  return a2["fame"]=ac(a2["fame"]+c2,0x0,0x64),c2&&c0["push"]({'cls':'up','text':"名气+"+c2}),bI["_mood"]&&(a2["guanxi"]=ac(a2["guanxi"]+bI["_mood"],0x0,0x64),
  c0["push"]({'cls':'up','text':"关系+"+bI["_mood"]})),a2["pending"]["result"]={'won':bM,'log':bP,'deltas':c0,'score':[bN,bO],'pens':bS},a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':bI["comp"],'text':(bM?'derby'===bI["kind"]?'胜':'冠军':'derby'===bI["kind"]?'负':'失利')+'：'+bY}),a2["_awardDue"]&&(a2["_awardDue"]=!0x1,bAw(a2["seasons"][bI["recIdx"]])),
  a2["bigQ"]=[],!0x0;
}
function aW(){var bx=a2["bigQ"][0x0];
bx["score"]=[0x0,0x0];bx["log"]=[];
bx["seg"]=0x0;bx["dec"]=null;bx["opts"]=null;bx["done"]=!0x1;bx["t"]=0x0;
bx["_lastEv"]=null;bx["_injured"]=!0x1;bx["_evHist"]=[];bx["_intro"]=_bmIntro(bx);
a2["pending"]={'type':"bigmatch",'kind':bx["kind"],'comp':bx["comp"],'age':bx["age"],'icon':aR[bx["kind"]]["icon"],'side':aR[bx["kind"]]["side"]||bx["team"],
'opp':bx["opp"],'score':bx["score"],'seg':bx["seg"],'dec':bx["dec"],'opts':bx["opts"],'log':bx["log"],'done':bx["done"],'t':bx["t"],'_intro':bx["_intro"]};
_bmAdvance(bx);
a2["pending"]["score"]=bx["score"];a2["pending"]["seg"]=bx["seg"];a2["pending"]["dec"]=bx["dec"];a2["pending"]["opts"]=bx["opts"];a2["pending"]["done"]=bx["done"];a2["pending"]["log"]=bx["log"];a2["pending"]["t"]=bx["t"];}
function aX(bx,by,bz){var bA=aR[bx["kind"]]["side"]||bx["team"],bB=[],bC=ae(0x0,0x4),bD=ae(0x0,0x2);
'derby'===bx["kind"]&&bB["push"](af(["这座城市提前一周就分成了两半。","地铁里两拨球迷隔着车厢对视。","报纸头版印着历史交手记录：恩怨已经写了一百年。","看台上有人在发那种著名的挑衅海报。","出租车司机一路都在骂对面那个队。"]));
bx["ev"]&&bB["unshift"](bx["ev"]);return 0x0===by&&0x0===bz?bB["push"]("上半场谁都没打开"+"局面。你们在中场"+"来回磨了四十五分"+'钟。'):by>bz?(bB["push"]('第\x20'+ae(0x9,0x29)+" 分钟，"+bA+("先进了一个。看台"+"整个站了起来。")),
by>0x1&&bB["push"]("半场结束前又来一"+"个。你们把优势拉"+"到了两球。"),bz&&bB["push"]("对方在补时扳回一"+"个。中场哨响时那"+"边的替补席在喊。")):by<bz?(bB["push"]('第\x20'+ae(0x6,0x26)+(" 分钟丢球。皮球"+"进网的那一下，场"+"里安静得能听见对"+"方球迷。")),
bz>0x1&&bB["push"]("下半场开始前又被"+"打进一个。你们落"+"后两球。"),by&&bB["push"]("你们在半场前扳回"+"一个，比分咬住了"+'。')):bB["push"]("上半场互交白卷式"+"的两球。谁也没能"+"把比分甩开。"),
bB["push"](0x0===bD?"中场休息。更衣室"+"里教练在白板上画"+"了一通，最后转过"+"头看着你。":0x1===bD?"中场休息。主队球迷"+"的歌声盖过了客队，"+"教练在战术板上写了"+"又擦。":"中场休息。裁判因为"+"几次争议判罚被围住"+"，保安把两边隔开。"),by>0x2&&bB["push"]("上半场你们就进了三"+"个，看台已经有人提"+"前庆祝了。"),bz>0x1&&bB["push"]("对方两球在手，气势"+"正盛。你们的防线感"+"觉快撑不住了。"),bB;
}var aY=[{'key':"hold",'label':"稳住阵型",'hint':"小幅提高赢面，个"+"人数据平淡",'dp':0.06,'glory':0.12,'mood':0x1},{'key':"push",'label':"压上去搏",
'hint':"赢面涨得最多，也"+"最可能被反击打穿",'dp':0.13,'glory':0.5,'mood':0x2,'risk':!0x0},{'key':"run",'label':"把球做出来",'hint':"居中，队友更愿意"+'找你',
'dp':0.09,'glory':0.28,'mood':0x0},{'key':'solo','label':'自己单干','hint':'不再信任队友，孤注一掷用个人能力解决问题','dp':0.02,'glory':0.62,'mood':0x1},{'key':'wall','label':'全员退防','hint':'摆大巴死守到底，难看但有效','dp':0.12,'glory':0.04,'mood':-0x1}];
/* ── §8 大赛系统 ──────────────────────────────────────────────── */
function aZ(bx,by,bz){
b0(bx,by,bz,a2["age"]);
}function b0(bx,by,bz,bA){
a2["natRuns"]["push"]({'age':bA,'comp':by,'stage':bz,'caps':bx?bx['caps']:0,'natGoals':bx?bx['natGoals']:0,['natAssis'+'ts']:bx?bx['natAssis'+'ts']:0,'natCs':bx?bx['cs']:0}),'冠军'===bz?(bx["trophies"]["push"](by+'冠军'),a2["trophies"]["push"]({'name':by+'冠军','age':bA,'team':"国家队"})):bx["nat"]=by+bz;
}function b1(bx){
a2["forceQ"]||(a2["forceQ"]=[]),a2["usedEven"+'ts'][bx]||a2["forceQ"]["indexOf"](bx)<0x0&&a2["forceQ"]["push"](bx);
}
function _repWeight(t){/* 杯赛对手权重曲线：rep5高概率,rep4中高,rep3小概率,rep2极低,rep0/1近乎为零 */
var _rw=[0.2,0.5,1,5,40,100],_rep=t&&t["rep"];return _rep>=0x0&&_rep<=0x5?_rw[_rep]:0x0;
}
function _wDraw(teams,n,wFn){/* 不放回加权抽样 */
var _t=teams["slice"](),_p=[];
while(_p["length"]<n&&_t["length"]){
var _tot=0x0,_i;for(_i=0x0;_i<_t["length"];_i++)_tot+=wFn(_t[_i]);
var _r=ad()*_tot,_acc=0x0,_idx=_t["length"]-0x1;
for(_i=0x0;_i<_t["length"];_i++){_acc+=wFn(_t[_i]);if(_r<=_acc){_idx=_i;break;}}
_p["push"](_t[_idx]);_t["splice"](_idx,0x1);
}
return _p;
}
function b2Cup(bx,by,bz){var _cupList=[by["cup"]];
if(by["leagueCup"])_cupList["push"](by["leagueCup"]);
for(var _ci=0;_ci<_cupList["length"];_ci++){
var _cupName=_cupList[_ci];
var _cupQualOK=(_cupName===by["cup"])?bz["leaguePos"]<=0xc:bz["leaguePos"]<=0xe;
if(!_cupQualOK)continue;

var _cupMap={"epl":6,"liga":6,"seri":5,"bund":6,"l1":6,"csl":6,"ere":5,"pri":5,"jl":5,"kl":4,"spl":5,"mls":5,"ch":6,"seg":6,"b2":4,"jup":5};
var _pool=a0["TEAMS"]["filter"](function(t){return t['id']!==bx['id']&&t["league"]===by['id'];});
var _bTeams=[{i:bx['id'],n:bx["name"],ovr:_teamStr()}];
var _maxT=Math.min(16,_pool.length+1), _total=4;while(_total*2<=_maxT)_total*=2;
var _drawn=_wDraw(_pool,_total-1,_repWeight);
for(var _oi=0;_oi<_drawn.length;_oi++)_bTeams.push({i:_drawn[_oi]['id'],n:_drawn[_oi]["name"],ovr:0x2e+_drawn[_oi]["rep"]*0x8});
var _path=_bracketSim(bx["name"],_bTeams);
var _run={comp:_cupName,rounds:_path,age:a2["age"]};
if(_path.length&&_path[_path.length-1]["won"]){_run["result"]="冠军";bz["trophies"]["push"](_cupName+'冠军');a2["trophies"]["push"]({'name':_cupName+'冠军','age':a2["age"],'team':bx["name"]});}
else if(_path.length)_run["result"]="止步"+_path[_path.length-1]["round"];
else _run["result"]="止步"+(_bracketNames(_total)[0]||"第一轮");
a2["cupRuns"]["push"](_run);
}}
function b2SuperCup(bx,by,bz){/* ── 超级杯跑表（单场决赛） ── */
if(bx&&by&&by["superCup"]&&bz["leaguePos"]<=0x2){
var _scPool=a0["TEAMS"]["filter"](function(t){return t['id']!==bx['id']&&t["league"]===by['id'];})["sort"](function(a,b){return b["rep"]-a["rep"];});
var _bTeams4=[{i:bx['id'],n:bx["name"],ovr:_teamStr()}];
var _scTag=bz["leaguePos"]===0x1?"(上季杯赛冠军)":"(上季联赛冠军)";
for(var _oi4=0;_oi4<0x3&&_oi4<_scPool.length;_oi4++)_bTeams4.push({i:_scPool[_oi4]['id'],n:_scPool[_oi4]["name"],ovr:0x2e+_scPool[_oi4]["rep"]*0x8});
if(_bTeams4["length"]>=0x4){
var _path4=_bracketSim(bx["name"],_bTeams4);
var _scRun={comp:by["superCup"],rounds:_path4,age:a2["age"]};
if(_path4.length&&_path4[_path4.length-1]["won"]){_scRun["result"]="冠军";bz["trophies"]["push"](by["superCup"]+'冠军');a2["trophies"]["push"]({'name':by["superCup"]+'冠军','age':a2["age"],'team':bx["name"]});}
else if(_path4.length)_scRun["result"]="止步"+_path4[_path4.length-1]["round"];
else _scRun["result"]="止步半决赛";
a2["cupRuns"]["push"](_scRun);
}
}}
function b2Continental(bx,by,bz){/* ── 洲际赛跑表（小组赛+淘汰赛） ── */
if(bx&&by&&by["cont"]&&bz["leaguePos"]<=0x6){
var _ctName=by["cont"],_ctTag=aS[_ctName];var _ctPool=a0["TEAMS"]["filter"](function(t){return t['id']!==bx['id']&&aT(aq(t))===_ctTag&&t["rep"]>=0x3;});
if(_ctPool["length"]<0x9)_ctPool=a0["TEAMS"]["filter"](function(t){return t['id']!==bx['id']&&aT(aq(t))===_ctTag&&t["rep"]>=0x2;});
var _grpPick=_wDraw(_ctPool,0x3,_repWeight);
var _gTeams=[{'i':bx['id'],'n':bx["name"],'ovr':_teamStr()}];
for(var _gi=0;_gi<_grpPick["length"];_gi++)_gTeams["push"]({'i':_grpPick[_gi]['id'],'n':_grpPick[_gi]["name"],'ovr':0x2e+_grpPick[_gi]["rep"]*0x8+ad()*0x6});
if(_gTeams["length"]>0x1){
var _grp=_simGroup4(_gTeams);
var _gpos=0x1;for(var _z=0;_z<_grp["standings"]["length"];_z++)if(_grp["standings"][_z]["i"]===bx['id'])_gpos=_z+0x1;
var _run={'comp':_ctName,'rounds':[],'group':{'pos':_gpos,'standings':_grp["standings"]["map"](function(s){return s["name"];}),'fullStandings':_grp["standings"],'matches':_grp["matches"]},'age':a2["age"]};
if(_gpos<=0x2){
var _bTeams2=[{i:bx['id'],n:bx["name"],ovr:_teamStr()}];
var _koPool=[];for(var _kp=0;_kp<_ctPool["length"];_kp++){var _skip=false;for(var _kp2=0;_kp2<_grpPick["length"];_kp2++)if(_grpPick[_kp2]['id']===_ctPool[_kp]['id']){_skip=true;break;}if(!_skip)_koPool["push"](_ctPool[_kp]);}
var _maxT2=Math.min(16,_koPool.length+1), _total2=4;while(_total2*2<=_maxT2)_total2*=2;
var _koPick=_wDraw(_koPool,_total2-1,_repWeight);
for(var _oi2=0;_oi2<_koPick.length;_oi2++)_bTeams2.push({i:_koPick[_oi2]['id'],n:_koPick[_oi2]["name"],ovr:0x2e+_koPick[_oi2]["rep"]*0x8});
var _path2=_bracketSim(bx["name"],_bTeams2);_run["rounds"]=_path2;
if(_path2.length&&_path2[_path2.length-1]["won"]&&_path2[_path2.length-1]["round"]==="决赛"){
var _fOpp=_path2[_path2.length-1]["opp"];
var _ctBM=aV("cont",0.5,{'comp':_ctName,'opp':_fOpp});
if(_ctBM){_run["result"]="决赛";a2["_contRun"]=_run;}
else{_run["result"]="冠军";a2["cupRuns"]["push"](_run);bz["trophies"]["push"](_ctName+'冠军');a2["trophies"]["push"]({'name':_ctName+'冠军','age':a2["age"],'team':bx["name"]});}
}else if(_path2.length){_run["result"]="止步"+_path2[_path2.length-1]["round"];a2["cupRuns"]["push"](_run);}
else{_run["result"]="止步"+(_bracketNames(_total2)[0]||"第一轮");a2["cupRuns"]["push"](_run);}
}else{_run["result"]="小组赛出局";a2["cupRuns"]["push"](_run);}
}else{var _runEmpty={'comp':_ctName,'rounds':[],'group':null,'age':a2["age"]};_runEmpty["result"]="小组赛出局";a2["cupRuns"]["push"](_runEmpty);}}}
function b2ClubWC(bx,by,bz){/* ── 世俱杯跑表（单场决赛） ── */
if(bx&&by&&a2["seasons"]["length"]%4===0x2){
var _wPool=a0["TEAMS"]["filter"](function(t){return t['id']!==bx['id']&&t["rep"]>=0x4;})["sort"](function(a,b){return b["rep"]-a["rep"];});
var _wSel=[],_wOne={};
for(var _wi=0;_wi<_wPool.length;_wi++){if(!_wOne[_wPool[_wi]["league"]]){_wOne[_wPool[_wi]["league"]]=1;_wSel.push(_wPool[_wi]);}}
var _wRest=[];for(var _wi2=0;_wi2<_wPool.length;_wi2++){if(_wSel.indexOf(_wPool[_wi2])<0)_wRest.push(_wPool[_wi2]);}
_wSel=_wSel.concat(_wDraw(_wRest,0x7-_wSel.length,_repWeight));
(function(){for(var _o2=_wSel.length-1;_o2>0;_o2--){var _k2=Math["floor"](ad()*(_o2+0x1));var _t2=_wSel[_o2];_wSel[_o2]=_wSel[_k2];_wSel[_k2]=_t2;}})();
if(_wSel["length"]>=0x3){
var _bTeams3=[{i:bx['id'],n:bx["name"],ovr:_teamStr()}];
for(var _oi3=0;_oi3<0x7&&_oi3<_wSel.length;_oi3++)_bTeams3.push({i:_wSel[_oi3]['id'],n:_wSel[_oi3]["name"],ovr:0x2e+_wSel[_oi3]["rep"]*0x8});
var _path3=_bracketSim(bx["name"],_bTeams3);
var _wRun={comp:"世俱杯",rounds:_path3,age:a2["age"]};
if(_path3.length&&_path3[_path3.length-1]["won"]){_wRun["result"]="冠军";bz["trophies"]["push"]("世俱杯冠军");a2["trophies"]["push"]({'name':"世俱杯冠军",'age':a2["age"],'team':bx["name"]});}
else if(_path3.length)_wRun["result"]="止步"+_path3[_path3.length-1]["round"];
else _wRun["result"]="止步"+(_bracketNames(_bTeams3.length)[0]||"第一轮");
a2["cupRuns"]["push"](_wRun);}}}
function b2(){var bx=ar(),by=as(),bz={'age':a2["age"],'teamId':a2["teamId"],'teamName':bx?bx["name"]:"无球可踢",'color':bx?bx["color"]:null,
'league':by?by["name"]:'','leagueId':by?by['id']:null,'ovr':a2["ovr"],'role':a2["role"],'apps':0x0,'goals':0x0,'assists':0x0,
'cs':0x0,'ga':0x0,'trophies':[],'note':null};
a2["seasonWa"+'ge']=0x0;
var bA=a8();
if(bA>0x0){for(var bB=[];
bA>0x0&&a2["money"]<bA;
){for(var bC=null,bD=0x0;
bD<a5["length"];
bD++)a6(a5[bD]['id'])&&(!bC||a5[bD]["fee"]>bC["fee"])&&(bC=a5[bD]);
if(!bC)break;
delete a2["staff"][bC['id']],bB["push"](bC["name"]),bA-=a7(bC);
}bA>0x0&&(a2["money"]-=bA,bz["staffFee"]=bA),bB["length"]&&(bz["staffGon"+'e']=bB["join"]('、'));
}var bE=aG(a2["age"]),bF=bE[0x0]+ad()*(bE[0x1]-bE[0x0]),bG=a2["talent"];
if(by&&(bG*=0x1+0.05*(by["rep"]-0x2)),a2["stagnate"]&&(bG*=0.55),a6("chef")&&(bG*=1.08),a0["ROLES"][a2["role"]]["rank"]<=0x1&&(bG*=a2["age"]<=0x17&&bx&&bx["rep"]>=0x4?0.85:0.5),
a2["achBonus"]&&a2["achBonus"]["growth"]&&(bG*=a2["achBonus"]["growth"]),
bF>0x0&&(bG*=Math["max"](0.16,(0x64-a2["ovr"])/0x32)),bF<0x0&&(a2["achBonus"]&&a2["achBonus"]["decay"]&&(bF*=a2["achBonus"]["decay"]),bG=(a2["ovr"]>a2["maxOvr"]*0.94?1.18:Math["max"](0.78,1.34-0.38*a2["talent"]))*(a6("fitness")?0.8:0x1)),a2["ovr"]=ac(a2["ovr"]+bF*bG,0x14,0x63),
a2["cheat"]){var bH=ac(0x2a+bp(a2["originId"])["ovr"]+(a2["legacy"]?a2["legacy"]["ovr"]:0x0),0x1e,0x3c),bI=bH+(0x63-bH)*ac((a2["age"]-0x10)/0xa,0x0,0x1);
a2["ovr"]=ac(Math["max"](a2["ovr"],bI),0x14,0x63);
}if(a2["banLeft"]>0x0)bz["note"]='禁赛',a2["banLeft"]--;
else{if(bx){var bJ=a0["ROLES"][a2["role"]],bK=ae(bJ["apps"][0x0],bJ["apps"][0x1]);
if(a2["age"]<=0x13?bK=Math["round"](0.5*bK):0x14===a2["age"]?bK=Math["round"](0.78*bK):a2["age"]>=0x2b?bK=Math["round"](0.45*bK):a2["age"]>=0x29?bK=Math["round"](0.58*bK):a2["age"]>=0x27?bK=Math["round"](0.7*bK):a2["age"]>=0x25?bK=Math["round"](0.82*bK):a2["age"]>=0x23&&(bK=Math["round"](0.92*bK)),
a2["cheat"]&&(bK=Math["round"](1.05*bK)),a6("nutritio"+'n')&&(bK=Math["round"](1.05*bK)),a2["banGames"]>0x0){var bL=Math["min"](bK,a2["banGames"]);
bK-=bL,a2["banGames"]-=bL,bL>0x0&&(bz["note"]="停赛 "+bL+'\x20场');
}bK=Math["round"](bK*APPS_F(a2["age"])/OLDF(a2["age"]));
var bM=ac((a2["ovr"]-0x2a)/0x30,0.05,1.4);
a2["cheat"]&&(bM*=1.25);
var bN=aK(),_pm=TYPE_MODS[a2["playerType"]!=null?a2["playerType"]:0xb];bz["_type"]=a2["playerType"]!=null?a2["playerType"]:0xb;
if(bz["apps"]=bK,'gk'===al(a2["pos"])["group"])bz['cs']=Math["min"](bK,Math["round"](bK*(0.15+0.28*bM)*(0.8+0.5*ad()))),bz['ga']=Math["round"]((bK-bz['cs'])*(1.85-0.47*ac(bM,0x0,0x1))*(0.9+0.2*ad()));
else{var bO=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x28,bP=0.88+0.24*ad();
bz["goals"]=Math["round"](bK*bN["goal"]*bM*bO*bP*_pm["g"]),bz["assists"]=Math["round"](bK*bN["ast"]*bM*(0x1+bO)/0x2*(0.88+0.24*ad())*_pm["a"]);
}a2["totals"]["apps"]+=bz["apps"],a2["totals"]["goals"]+=bz["goals"],a2["totals"]["assists"]+=bz["assists"],a2["totals"]['cs']+=bz['cs'],
a2["totals"]['ga']+=bz['ga'];
var bQ=aJ(bx,by,a2["ovr"]),bR=Math["round"](bQ*(a2["wageMul"+'t']||0x1)*(a0["ROLES"][a2["role"]]["rank"]>=0x2?0x1:0.55)*bAge());
a2["money"]+=bR,a2["seasonWa"+'ge']=bR,bR>a2["peakAnnu"+"alWage"]&&(a2["peakAnnu"+"alWage"]=bR),a2["careerEa"+"rnings"]+=bR;
var bS=(0.15*(bz["goals"]+bz["assists"])+0.02*bz["apps"]+0.05*bz['cs'])*(0x1+0.25*by["rep"]);
a2["fame"]=ac(a2["fame"]+bS*(0x1-a2["fame"]/0x64),0x0,0x64);
/* -- §9b 联赛真实化 -- */
var _lr=by['id']==='bund'?0x22:by['id']==='csl'?0x1e:by['id']==='ch'?0x2e:by['id']==='seg'?0x2a:0x26;
var _diff=ac((by["rep"]-0x2)/0x3,0,1);
var _vr=0x23;
var _ltms=[],_li,_lt,_ls;
for(_li=0x0;_li<a0["TEAMS"]["length"];_li++){_lt=a0["TEAMS"][_li];if(_lt["league"]===by['id']){_ls=_lt["rep"]*0xb+0x3c+ad()*_vr;if(_lt['id']===a2["teamId"]){var _rW2=a0["ROLES"][a2["role"]]?a0["ROLES"][a2["role"]]["rank"]:0x0;_ls=_lt["rep"]*0xb+0x3c+Math.round(a2["ovr"]*(0x2+_rW2*0x2)/0x82)+ad()*_vr;}_ltms["push"]({id:_lt['id'],rep:_lt["rep"],str:_ls});}}
_ltms["sort"](function(a,b){return b["str"]-a["str"]});
var _lp=0x0;for(_li=0x0;_li<_ltms["length"];_li++){if(_ltms[_li]['id']===a2["teamId"]){_lp=_li+0x1;break;}}
var _lw,_ld,_gf,_ga;
if(0x1===_lp)_lw=0.73,_ld=0.16,_gf=2.2,_ga=0.8;
else if(_lp<=0x4)_lw=0.58,_ld=0.21,_gf=1.8,_ga=1.1;
else if(_lp<=0x8)_lw=0.45,_ld=0.24,_gf=1.5,_ga=1.3;
else if(_lp<=0xc)_lw=0.37,_ld=0.26,_gf=1.3,_ga=1.4;
else if(_lp<=0x10)_lw=0.29,_ld=0.26,_gf=1.1,_ga=1.5;
else if(_lp<=0x12)_lw=0.21,_ld=0.26,_gf=0.9,_ga=1.7;
else _lw=0.13,_ld=0.21,_gf=0.7,_ga=2.0;
_lw-=_diff*0.04,_ld+=_diff*0.02,_lw=ac(_lw,0.05,0.85),_ld=ac(_ld,0.05,0.4);
_lw+=ac((a2["ovr"]-0x46)/0x12c,-0.03,0.03),_lw+=ad()*0.04-0.02,_ld+=ad()*0.02-0.01;
var _ll=0x1-_lw-_ld,_W=Math["round"](_lr*_lw),_D=Math["max"](0,Math["round"](_lr*_ld)),_L=_lr-_W-_D;
if(_D<0x0)_L+=_D,_D=0x0;if(_L<0x0)_D+=_L,_L=0x0;
var _GF=Math["round"](_lr*_gf+ad()*0xa-0x5),_GA=Math["round"](_lr*_ga+ad()*0xa-0x5);
if(_GF<0x0)_GF=0x0;if(_GA<0x0)_GA=0x0;
bz["leaguePos"]=_lp,bz["leagueW"]=_W,bz["leagueD"]=_D,bz["leagueL"]=_L,bz["leagueGF"]=_GF,bz["leagueGA"]=_GA,bz["leaguePts"]=_W*0x3+_D;if(_GF>0x0){var _roleG=a0["ROLES"][a2["role"]]["rank"];var _gCap=_roleG>=0x3?0.7:_roleG>=0x2?0.55:0.4;var _aCap=_roleG>=0x3?0.55:_roleG>=0x2?0.45:0.35;var _maxG=Math["round"](_GF*_gCap);var _maxA=Math["round"](_GF*_aCap);if(bz["goals"]>_maxG)bz["goals"]=_maxG;if(bz["assists"]>_maxA)bz["assists"]=_maxA;if(bz["goals"]+bz["assists"]>_GF){var _ov=bz["goals"]+bz["assists"]-_GF;bz["goals"]=Math["max"](0,bz["goals"]-_ov);}}
}}var bT=a2["age"]<0x12?0.015:a2["age"]<0x15?0.015+0.005*(a2["age"]-0x12):(a2["age"]===0x15?0.03:0.07);
if(a2["achBonus"]&&a2["achBonus"]["injury"])bT*=a2["achBonus"]["injury"];
if(a2["healthBonus"])bT*=a2["healthBonus"];
if(a2["legend"]&&a2["legend"]['i']===1)bT*=1.4;
else if(a2["legend"]&&a2["legend"]['i']===2)bT*=2;
else if(a2["legend"]&&a2["legend"]['i']===-1)bT*=0.6;
if(a6("rehab")&&(bT*=0.7),bx&&!a2["cheat"]&&a2["banLeft"]<=0x0&&ad()<bT){var bU=ah(a0["INJURIES"],function(c9){return c9['w'];
});
a2["ovr"]=ac(a2["ovr"]+bU["ovr"],0x14,0x63),bz["note"]=bU["name"],bz["injury"]=bU["ovr"];if(bU["ovr"]<=-6&&a2["playerType"]!==0xb){a2["flags"]["_severeInjury"]=1;}
}if(bx&&a0["ROLES"][a2["role"]]["rank"]>=0x2){var bV=a2["pendingM"+"ult"]||{};
["league"]["forEach"](function(c9){
if("leagueCup"===c9&&!by["leagueCup"])return;
if("superCup"===c9&&!by["superCup"])return;
var ca=a0["TROPHIES"][c9]['p'][bx["rep"]]*(null==bV[c9]?0x1:bV[c9]);if("world"===c9&&a2["seasons"]["length"]%4!==0x2)ca=0x0;
if("league"===c9||"cup"===c9||"leagueCup"===c9){var cfc=1,dcx=0,cmr=0,ctn=0,ctr=0;
for(dcx=0;
dcx<a0["TEAMS"]["length"];
dcx++){if(a0["TEAMS"][dcx]["league"]===by['id']){ctr=a0["TEAMS"][dcx]["rep"];
if(ctr>cmr)cmr=ctr;
}}for(dcx=0;
dcx<a0["TEAMS"]["length"];
dcx++){if(a0["TEAMS"][dcx]["league"]===by['id']&&a0["TEAMS"][dcx]["rep"]===cmr)ctn++;
}ca=("league"===c9?(0.5+0.04*(ctn-1)):("leagueCup"===c9?0.18:0.22))/ctn;
ca*=1+Math["max"](0,a2["ovr"]-0x50)*0.06;
if("league"===c9){if(bz["leaguePos"]!==0x1)ca=0x0;else ca=0x1;}else if("cup"===c9||"leagueCup"===c9)ca*=Math["pow"](bx["rep"]/cmr,0x2);
if("cup"===c9&&ca>0.3)ca=0.3;
if("leagueCup"===c9&&ca>0.2)ca=0.2;
}if("superCup"===c9){if(bz["leaguePos"]>0x2)ca=0x0;ca*=1+Math["max"](0,a2["ovr"]-0x50)*0.04;
if(ca>0.15)ca=0.15;
}if(("cont"!==c9||by["cont"])&&("cont"===c9&&(bz["leaguePos"]<=0x6)&&(ca*='亚冠'===by["cont"]?2.5:'欧联'===by["cont"]?1.4:0.7),a2["cheat"]&&(ca="cont"!==c9||(function(){
for(var cc=0x0;
cc<a2["trophies"]["length"];
cc++)if(a2["trophies"][cc]["name"]["indexOf"]('欧冠')>=0x0)return!0x0;
return!0x1;
}())?0.5:0x1),!("cont"===c9&&!a2["cheat"]&&a0["ROLES"][a2["role"]]["rank"]>=0x2&&ad()<Math["min"](0.72,1.4*ca)&&aV("cont",0.5,
{'comp':by["cont"]}))&&ad()<ca)){var cb="league"===c9?by["name"]+'冠军':"cup"===c9?by["cup"]+'冠军':"leagueCup"===c9?by["leagueCup"]+'冠军':"superCup"===c9?by["superCup"]+'冠军':"cont"===c9?by["cont"]+'冠军':"世俱杯冠军";
bz["trophies"]["push"](cb),a2["trophies"]["push"]({'name':cb,'age':a2["age"],'team':bx["name"]});
}});
}if(bx&&by){b2Cup(bx,by,bz);b2SuperCup(bx,by,bz);b2Continental(bx,by,bz);b2ClubWC(bx,by,bz);}a2["natForm"]=a2["natForm"]||{};
a2["natForm"]["wc"]=Math["max"](0x0,(a2["natForm"]["wc"]||0x0)-0x1);
a2["natForm"]["asia"]=Math["max"](0x0,(a2["natForm"]["asia"]||0x0)-0x1);
var natFm=a2["natForm"]||{},natB=Math["max"](natFm["wc"]>=0x4?0.2:natFm["wc"]>=0x3?0.15:natFm["wc"]>=0x2?0.1:natFm["wc"]>=0x1?0.05:0x0,natFm["asia"]>=0x3?0.15:natFm["asia"]>=0x2?0.1:natFm["asia"]>=0x1?0.05:0x0),bW=0x48-0.12*(a2["guanxi"]-0x32),bX=!0x1;
if(!a2["banned"]&&a2["age"]>=0x12&&bx&&by){var bY=ac((a2["ovr"]-bW)/0xc,0x0,0x1),bZ=a0["ROLES"][a2["role"]]["rank"],c0=ac(bY*(bZ>=0x3?0x1:bZ>=0x2?0.6:0.2)*(by["rep"]>=0x4?1.15:by['cn']?0x1:by["rep"]>=0x2?0.8:0.35)*(a2["age"]>=0x1e?0.8:0x1)*(a2["achBonus"]&&a2["achBonus"]["natCall"]||0x1)*(0x1+natB),0x0,0.9);
bX=a2["cheat"]||ad()<c0;
}if(bX){var c2=aL(),c3=a2["seasons"]["length"]%0x4;
var c1=a2["cheat"]?ae(0x5,0x8):(function(){var _tm=c3===0x1?ae(0x8,0xc):c3===0x3?ae(0x5,0x7):ae(0x4,0x6);var _pp=ac((a2["ovr"]-0x46)/0x32,0.55,0.95);if(a2["age"]>=0x22)_pp*=0.85;if(a2["age"]>=0x24)_pp*=0.8;var _c=0x0;for(var _mi=0x0;_mi<_tm;_mi++)if(ad()<_pp)_c+=0x1;return _c;})();
a2["caps"]+=c1,bz["caps"]=c1;if(!a2["flags"]["_natCall"+'ed']){a2["flags"]["_natCall"+'ed']=!0x0;b1(["nat_firs"+"tcall","nat_firs"+"tcall2","nat_firs"+"tcall3"][Math["floor"](ad()*0x3)]);a2["usedEven"+'ts']["nat_firs"+"tcall"]=(a2["usedEven"+'ts']["nat_firs"+"tcall"]||0x0)+0x1;a2["usedEven"+'ts']["nat_firs"+"tcall2"]=(a2["usedEven"+'ts']["nat_firs"+"tcall2"]||0x0)+0x1;a2["usedEven"+'ts']["nat_firs"+"tcall3"]=(a2["usedEven"+'ts']["nat_firs"+"tcall3"]||0x0)+0x1;}
(function(c9,ca){
if(ca&&a2["natStats"]){var cb=al(a2["pos"])["group"],cc=ac((a2["ovr"]-0x2a)/0x30,0.05,1.4)*(0x1+0.5*natB);
if(a2["cheat"]&&(cc*=1.25),'gk'!==cb){var cd=aK(),ce=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x28,cf=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x16,
cg=ac((a2["ovr"]-0x4b)/0x14,0x0,0x1),ch=ck(ca*cd["goal"]*(0.5+0.55*cg)*cc*cf*(0.6+0.8*ad())),ci=ck(ca*cd["ast"]*(0.45+0.45*cg)*cc*(0x1+ce)/0x2*(0.6+0.8*ad()));
ch&&(a2["natStats"]["goals"]||(b1(["nat_firs"+"tgoal","nat_firs"+"tgoal2","nat_firs"+"tgoal3"][Math["floor"](ad()*0x3)]),a2["usedEven"+'ts']["nat_firs"+"tgoal"]=(a2["usedEven"+'ts']["nat_firs"+"tgoal"]||0x0)+0x1,a2["usedEven"+'ts']["nat_firs"+"tgoal2"]=(a2["usedEven"+'ts']["nat_firs"+"tgoal2"]||0x0)+0x1,a2["usedEven"+'ts']["nat_firs"+"tgoal3"]=(a2["usedEven"+'ts']["nat_firs"+"tgoal3"]||0x0)+0x1),c9["natGoals"]=ch,a2["natStats"]["goals"]+=ch),ci&&(c9["natAssis"+'ts']=ci,
a2["natStats"]["assists"]+=ci);
}else{var cj=Math["min"](ca,Math["max"](0x0,ck(ca*(0.15+0.26*cc)*(0.7+0.6*ad()))));
cj&&(c9["natCs"]=cj,a2["natStats"]['cs']+=cj);
}}function ck(cl){
return Math["floor"](cl+ad());
}}(bz,c1));if(0x1===c3){if(a2["cheat"]&&a2["ovr"]>=0x55)aZ(bz,"世界杯",'冠军'),a2["natForm"]["wc"]=0x4;
else{var _playerTeam={i:'chn',n:'\u4e2d\u56fd\u961f',s:60,ovr:_natStr()};var _wcQual=_runNatQual('wc',_playerTeam);a2["natRuns"]["push"]({age:a2["age"],comp:_wcQual["comp"],stage:_wcQual["stage"],playerPos:_wcQual["playerPos"],caps:0,natGoals:0,natAssists:0,natCs:0,matches:_wcQual["matches"],standings:_wcQual["standings"],playerGroup:_wcQual["playerGroup"]});if(_wcQual["qualified"]){var _wcRes=_runNatComp('wc',_playerTeam);var _wcStage=_wcRes.stage;a2["natForm"]["wc"]=_natFormVal(_wcStage,'wc');a2["tournaments"]["push"](_wcRes);if(_wcStage==="\u5c0f\u7ec4\u8d5b\u51fa\u5c40"){aZ(bz,"\u4e16\u754c\u676f","\u5c0f\u7ec4\u8d5b\u51fa\u5c40");}else{var _wcBM=false;if(_wcStage==="\u51a0\u519b"){_wcBM=aV('wc',0.55,{'comp':"\u4e16\u754c\u676f",'opp':_finalOpp(_wcRes['rounds'],"\u4e2d\u56fd\u961f")});}if(_wcBM){a2["_natWC"]=_wcRes;}else aZ(bz,"\u4e16\u754c\u676f",_wcStage);}}else aZ(bz,"\u4e16\u754c\u676f","\u9884\u9009\u8d5b\u51fa\u5c40"),a2["natForm"]["wc"]=0x0;}}}if(0x3===c3){if(a2["cheat"]&&a2["ovr"]>=0x4a)aZ(bz,"\u4e9a\u6d32\u676f",'\u51a0\u519b'),a2["natForm"]["asia"]=0x3;
else{var _playerTeam2={i:'chn',n:'\u4e2d\u56fd\u961f',s:60,ovr:a2["ovr"]};var _asiaQual=_runNatQual('asia',_playerTeam2);a2["natRuns"]["push"]({age:a2["age"],comp:_asiaQual["comp"],stage:_asiaQual["stage"],playerPos:_asiaQual["playerPos"],caps:0,natGoals:0,natAssists:0,natCs:0,matches:_asiaQual["matches"],standings:_asiaQual["standings"],playerGroup:_asiaQual["playerGroup"]});if(_asiaQual["qualified"]){var _asiaRes=_runNatComp('asia',_playerTeam2);var _asiaStage=_asiaRes.stage;a2["natForm"]["asia"]=_natFormVal(_asiaStage,'asia');a2["tournaments"]["push"](_asiaRes);if(_asiaStage==="\u5c0f\u7ec4\u8d5b\u51fa\u5c40"){aZ(bz,"\u4e9a\u6d32\u676f","\u5c0f\u7ec4\u8d5b\u51fa\u5c40");}else{var _asiaBM=false;if(_asiaStage==="\u51a0\u519b"){_asiaBM=aV("asia",0.55,{'comp':"\u4e9a\u6d32\u676f",'opp':_finalOpp(_asiaRes['rounds'],"\u4e2d\u56fd\u961f")});}if(_asiaBM){a2["_natAsia"]=_asiaRes;}else aZ(bz,"\u4e9a\u6d32\u676f",_asiaStage);}}else aZ(bz,"\u4e9a\u6d32\u676f","\u9884\u9009\u8d5b\u51fa\u5c40"),a2["natForm"]["asia"]=0x0;}}if(c3!==0x1&&c3!==0x3){var _fr=_runFriendlies();a2["natRuns"]["push"]({age:a2["age"],comp:"\u53cb\u8c0a\u8d5b",stage:"",friendly:true,matches:_fr["matches"],caps:0,natGoals:0,natAssists:0,natCs:0});}if(bx&&by){if(a2["bigQ"]&&a2["bigQ"]["length"]){a2["_awardDue"]=!0x0;}else{bAw(bz);}}return function(c9,ca,cb){
if(ca&&cb){var cc=am[cb['id']];
if(cc){if(c9["trophies"]["indexOf"](cb["name"]+'冠军')>=0x0)return b4(c9,ca,cc);
var cd=ac(0.06+0.1*ca["rep"]+0.12*aL(),0x0,0.45);
return b3()?void(ad()<Math["min"](0.72,1.5*cd)&&aV("promo",0.5,{'comp':'升'+ak(cc)["name"]+"附加赛"})&&(a2["bigQ"][0x0]["fromLeag"+'ue']=cb['id'])):void(ad()<cd&&b4(c9,ca,cc));
}var ce=ao[cb['id']];
if(ce&&ca["rep"]<=0x1){if(c9["trophies"]["indexOf"](cb["name"]+'冠军')>=0x0)return;
var cf=ac(0.26-0.12*aL(),0.06,0.3);
if(b3())return void(ad()<Math["min"](0.72,1.5*cf)&&aV("drop",0.5,{'comp':cb["name"]+"保级战"})&&(a2["bigQ"][0x0]["fromLeag"+'ue']=cb['id']));
ad()<cf&&function(cg,ch,ci){
a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][ch['id']]=ci,cg["move"]='降入'+ak(ci)["name"];
}(c9,ca,ce);
}}}(bz,bx,by),a2["maxOvr"]=Math["max"](a2["maxOvr"],a2["ovr"]),bz["ovrEnd"]=Math["round"](a2["ovr"]),a2["seasons"]["push"](bz),
a2["age"]++,a2["seasonsA"+"tClub"]++,au()||a2["seasonsA"+"broad"]++,bz;
}
/* ── §9 升降级与颁奖 ──────────────────────────────────────────── */
function b3(){
return a0["ROLES"][a2["role"]]["rank"]>=0x3&&(a2["bigStage"+'d']||0x0)<0x3;
}function b4(bx,by,bz){
a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][by['id']]=bz,bx["move"]='升上'+ak(bz)["name"];
}function b5(bx,bA){ a2["awards"]["push"]({'name':bx,'age':bA||a2["age"]});}
function bAw(bz){
if(!bz)return;
var bx=bz["teamId"]?aj(bz["teamId"]):null,by=bx?ak(bx["league"]):null,age0=bz["age"];
if(!bx||!by)return;
var c7=al(a2["pos"])["group"];
if(a2["cheat"]){(by["rep"]>=0x4||function(){
for(var cb4=0x0;cb4<a2["trophies"]["length"];cb4++)if(a2["trophies"][cb4]["name"]["indexOf"]('欧冠')>=0x0&&a2["trophies"][cb4]["age"]===age0)return!0x0;
return!0x1;
}()||function(){
for(var cB=0x0;cB<a2["trophies"]["length"];cB++)if(a2["trophies"][cB]["age"]===age0&&/世界杯冠军/["test"](a2["trophies"][cB]["name"]))return!0x0;
return!0x1;
}())&&a0["ROLES"][bz["role"]]["rank"]>=0x3&&bz["apps"]>=0x13&&bz["ovr"]>=0x55&&(!function(c9){
for(var cC=0x0;cC<a2["awards"]["length"];cC++)if(a2["awards"][cC]["name"]===c9)return!0x0;
return!0x1;
}(a0["AWARDS"]["ballon"])||ad()<0.35)&&b5(a0["AWARDS"]["ballon"],age0),bz["apps"]>=0x13&&bz["ovr"]>=0x54&&ad()<0.35&&b5(a0["AWARDS"]["afcpoy"],age0),"att"===c7&&bz["goals"]>=[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]]&&(function(c9){return ad()<0.35+Math["min"](0.4,(c9-[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]])*0.03);}(bz["goals"]))&&bz["apps"]>=0x13&&b5(by["name"]+"金靴",age0),by["rep"]>=0x4&&"att"===c7&&bz["apps"]>=0x13&&bz["ovr"]>=0x55&&bz["goals"]>=0x23&&(function(c9){return ad()<0.35+Math["min"](0.4,(c9-0x23)*0.03);}(bz["goals"]))&&b5(a0["AWARDS"]["boot"],age0),bz["apps"]>=0x1e&&a0["ROLES"][bz["role"]]["rank"]>=0x3&&bz["ovr"]>=0x4a&&ad()<0.35&&b5(by["name"]+"最佳球员",age0),bz["apps"]>=0x13&&by["rep"]>=0x3&&'gk'===c7&&bz["ovr"]>=0x55&&ad()<0.45&&b5(a0["AWARDS"]["glove"],age0);
}else{var c8=(0.06+0.24*aL())*('gk'===c7?0.25:0x1),c9t=0,c9i;
for(c9i=0;c9i<a2["trophies"]["length"];c9i++)if(a2["trophies"][c9i]["age"]===age0)c9t++;
if(c9t>0){"att"===c7&&bz["goals"]>=[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]]&&(function(c9){return ad()<0.35+Math["min"](0.4,(c9-[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]])*0.03);}(bz["goals"]))&&bz["apps"]>=0x13&&b5(by["name"]+"金靴",age0),by["rep"]>=0x4&&"att"===c7&&bz["apps"]>=0x13&&bz["goals"]>=0x23&&(function(c9){return ad()<0.35+Math["min"](0.4,(c9-0x23)*0.03);}(bz["goals"]))&&(function(c9){var has=!0x1;
for(var cD=0x0;cD<a2["awards"]["length"];cD++)if(a2["awards"][cD]["name"]===c9&&a2["awards"][cD]["age"]===age0)has=!0x0;
if(!has)b5(c9);
return!0x0;
}(by["name"]+"金靴"))&&b5(a0["AWARDS"]["boot"],age0),!a2["banned"]&&(by["rep"]>=0x4||function(){
for(var cE=0x0;cE<a2["trophies"]["length"];cE++)if(a2["trophies"][cE]["name"]["indexOf"]('欧冠')>=0x0&&a2["trophies"][cE]["age"]===age0)return!0x0;
return!0x1;
}()||function(){
for(var cF=0x0;cF<a2["trophies"]["length"];cF++)if(a2["trophies"][cF]["age"]===age0&&/世界杯冠军/["test"](a2["trophies"][cF]["name"]))return!0x0;
return!0x1;
}())&&bz["apps"]>=0x13&&(function(){var eT=0x0,eB=0x0,eCnt=0x0,eC,hasQ=false;
for(eC=0;eC<a2["trophies"]["length"];eC++){var eD=a2["trophies"][eC];
if(eD["age"]===age0){var eF=0x0;
if(/世界杯冠军/["test"](eD["name"]))eF=0.55,hasQ=true;else if(/欧冠/["test"](eD["name"]))eF=0.22,hasQ=true;else if(/世俱杯冠军/["test"](eD["name"]))eF=0.08,hasQ=true;else if(eD["name"]===by["name"]+'冠军')eF=by["rep"]>=0x5?0.04:by["rep"]>=0x4?0.02:0x0,hasQ=true;else if(by["rep"]>=0x4&&eD["name"]===by["cup"]+'冠军')eF=0.005;else if(by["leagueCup"]&&eD["name"]===by["leagueCup"]+'冠军')eF=0.003;else if(by["superCup"]&&eD["name"]===by["superCup"]+'冠军')eF=0.002;
if(eF>0x0){if(eF>eT)eT=eF;eB+=eF,eCnt++;}}}
if(!hasQ)return!0x1;var eMain=eT+Math["min"](0.2,(eCnt-0x1)*0.06);
var boots=0x0,bG2;
for(bG2=0;bG2<a2["awards"]["length"];bG2++){var aX2=a2["awards"][bG2];
if(aX2["age"]===age0&&aX2["name"]===by["name"]+"金靴")boots+=0.02;
if(aX2["age"]===age0&&aX2["name"]===a0["AWARDS"]["boot"])boots+=0.05;}
var rank=a0["ROLES"][bz["role"]]["rank"],ovrB=bz["ovr"]>=0x5a?0.06:bz["ovr"]>=0x55?0.03:0x0,p=eMain+boots+ovrB;
p*=rank>=0x4?1.3:rank>=0x3?0.5:rank>=0x2?0.25:0.1;
return rank>=0x3&&ad()<Math["min"](0.8,p);
}())&&b5(a0["AWARDS"]["ballon"],age0),a0["ROLES"][bz["role"]]["rank"]>=0x3&&bz["apps"]>=0x1e&&bz["ovr"]>=0x4a&&(function(c9){var cb0=0x0;
for(var cG=0x0;cG<a2["trophies"]["length"];cG++){var cH=a2["trophies"][cG];
if(cH["age"]===age0&&(cH["name"]===by["name"]+'冠军'&&(cb0+=0.35),cH["name"]===by["cup"]+'冠军'&&(cb0+=0.08),by["leagueCup"]&&cH["name"]===by["leagueCup"]+'冠军'&&(cb0+=0.06)));}
return cb0>0x0&&ad()<cb0*(0x1+0.2*c9);
}(c9t))&&b5(by["name"]+"最佳球员",age0),'gk'===c7&&by["rep"]>=0x3&&bz["apps"]>=0x13&&bz['cs']>=0x14&&ad()<0.3*(1+0.3*c9t)&&b5(a0["AWARDS"]["glove"],age0),!a2["banned"]&&bz["apps"]>=0x13&&bz["ovr"]>=0x54&&ad()<(function(){var tB=0x0,tE;
for(tE=0x0;tE<a2["trophies"]["length"];tE++){var tF=a2["trophies"][tE];
if(tF["age"]===age0){if(tF["name"]==='亚冠冠军')tB+=0.22;else if(tF["name"]==='亚洲杯冠军')tB+=0.28;else if(tF["name"]==='世界杯冠军')tB+=0.10;}}
return Math["min"](0.85,(0.03+0.18*aL()+tB)*(by["cont"]==='亚冠'?1:0.45));
})()&&b5(a0["AWARDS"]["afcpoy"],age0);
}}
}
/* ── §10 合同期与报告 ──────────────────────────────────────────── */
function b6(){
return a2["period"]={'n':a3[a2["mode"]]["seasons"],'left':a3[a2["mode"]]["seasons"],'recs':[]},a2["role"]=aH(),b7();
}function b7(){
for(var bx=a2["period"];
bx["left"]>0x0&&a2["age"]<0x37;
)if(bx["recs"]["push"](b2()),bx["left"]--,a2["roleAdju"+'st']=a2["roleAdju"+'st']>0x0?Math["floor"](a2["roleAdju"+'st']/0x2):Math["ceil"](a2["roleAdju"+'st']/0x2),
a2["role"]=aH(),a2["bigQ"]&&a2["bigQ"]["length"])return aW(),null;
return(function(){var by=a2["period"],bz=by['n'],bA=by["recs"];
return a2["period"]=null,a2["pendingM"+"ult"]=null,a2["clean"]=ac(a2["clean"]-(au()?2.2:0.6)*bz,0x0,0x64),a2["fame"]=ac(a2["fame"]-(a6('pr')?0.35:1.5)*bz,
0x0,0x64),a2["guanxi"]=ac(a2["guanxi"]+(au()?1.6:0.5)*bz,0x0,0x64),a2["contract"+"Left"]>0x0&&a2["contract"+"Left"]--,a2["lockAbro"+'ad']>0x0&&a2["lockAbro"+'ad']--,
a0["ROLES"][a2["role"]]["rank"]<=0x1?a2["lowSpell"]++:a2["lowSpell"]=0x0,bA;
}());
}function b8(bx,by){
aj(bx)&&(a2["teamId"]=bx,a2["seasonsA"+"tClub"]=0x0,a2["roleAdju"+'st']=0x0,a2["lowSpell"]=0x0,a2["stagnate"]=!0x1,a2["contract"+"Left"]=be(),
a2["loanFrom"]=null,a2["clubsPla"+"yed"]["indexOf"](bx)<0x0&&a2["clubsPla"+"yed"]["push"](bx),by||(a2["flags"]["_justMov"+'ed']=!0x0));
}function b9(bx){
return!!bx&&a2["youthTea"+"mId"]===bx['id']&&a2["age"]<=0x17;
}function ba(){
return a2["ovr"]+Math["min"](0xa,0.08*a2["fame"])+Math["min"](0xc,0.8*a2["trophies"]["length"])-bb(a2["age"]);
}function bb(bx){return bx<=0x1d?0x0:bx<=0x21?0x2*(bx-0x1d):0x8+4.5*(bx-0x21);
}function bc(bx){
return 0x30+7.5*bx["rep"];
}function bd(bx){return ba()+function(by){
return Math["max"](0x0,0x3-by["rep"])*bb(a2["age"])*0.12;
}(bx);
}var APPT=(function(){var f=[],a;for(a=0;a<60;a++)f[a]=a<=0x13?0.5:(a===20?0.78:(a<=24?1:(a<=36?0.92:(a<=38?0.82:(a<=40?0.7:(a<=42?0.58:0.45))))));var g=f.slice();g[0]=f[0];for(a=1;a<59;a++)g[a]=0.25*f[a-1]+0.5*f[a]+0.25*f[a+1];g[59]=f[59];return g;})();
function APPS_F(bx){return APPT[Math["max"](0,Math["min"](59,bx))]}
function OLDF(bx){return bx<=0x13?0.5:bx===20?0.78:bx>=43?0.45:bx>=41?0.58:bx>=39?0.7:bx>=37?0.82:bx>=25?0.92:1}
function bAge(){return Math["max"](0.68,1-0.028*Math["max"](0,a2["age"]-24))*Math["max"](0.8,1-0.05*Math["max"](0,23-a2["age"]));
}function be(bx){
var by=bx||ar(),rel=a2["ovr"]-(by?0x30+7*by["rep"]:0x3e)+3*a2["roleAdju"+'st'];
var fit=1/(1+Math["exp"](-rel/6));
if(a2["age"]<0x16&&a2["maxOvr"]>a2["ovr"])fit=Math["min"](1,fit+Math["min"]((a2["maxOvr"]-a2["ovr"])*0.06,0.22));
var ageW=Math["exp"](-Math["pow"](Math["max"](0,a2["age"]-24)/8,1.6));
return Math["max"](1,Math["min"](5,Math["round"](1+4.2*fit*ageW+(ad()-0.5)*0.9)));
}function bf(bx,by){
by=by||{};
var bz=ba(),bA=ar(),bB=as(),bC=bB?bB["rep"]:0x1,bD=a2["ovr"]>=0x52?0x2:0x1;
/* ── §11 转会 ──────────────────────────────────────────────────── */
function bE(bK){
return a0["TEAMS"]["filter"](function(bL){
if(bA&&bL['id']===bA['id'])return!0x1;
var bM=aq(bL),bN=bc(bL);
if(!bM['cn']){if(by["forceAbr"+"oad"]);
else{if(a2["lockAbro"+'ad']>0x0)return!0x1;
}bN+=a2["seasonsA"+"broad"]>0x0?0x3:0x5,a6("agent")&&(bN-=0x3);
}return!(by["forceAbr"+"oad"]&&bM['cn']||by["chinaOnl"+'y']&&!bM['cn']||null!=by["maxRep"]&&bL["rep"]>by["maxRep"]||bL["rep"]>=0x3&&a2["ovr"]<0x3e+0x4*bL["rep"]||bM["rep"]>bC+bK||!(bd(bL)>=bN-0x5)||!(bz<=bN+0x1a));
});
}var bF=bE(bD);
if(bF["length"]||(bF=bE(bD+0x1)),bF["length"]||(bF=bE(0x9)),!bF["length"])return[];
for(var bG=[],bH={},bI=0x0;
bI<0x4*bx&&bG["length"]<bx;
bI++){var bJ=ah(bF,function(bK){var bL=bc(bK);
return 0x1/(0x1+0.35*Math["abs"](bz-bL));
});
bJ&&!bH[bJ['id']]&&(bH[bJ['id']]=0x1,bG["push"](bJ));
}return at(bG,bF);
}function bg(){
return aj(a2["youthTea"+"mId"]);
}function bh(bx,by){
return(bx<=0x10?29.5+4.3*(bx-0xc):46.7+2.6*(bx-0x10))+1.2*(by?by["rep"]:0x2);
}function bi(){
return a2["age"]>=0x10&&a2["ovr"]>=0x2a;
}function bj(){
if(a2["flags"]["_double"]=!0x1,(function(){var by=bg(),bz=aG(a2["age"]),bA=bz[0x0]+ad()*(bz[0x1]-bz[0x0]),bB=(0x1+a2["talent"])/0x2*function(bD){
if(!bD)return 0x1;
var bE=0.86+0.06*bD["rep"];
return aq(bD)['cn']||(bE+=0.06),bE;
}(by);
bA>0x0&&(bB*=ac((0x46-a2["ovr"])/0x1c,0.35,0x1)),a2["ovr"]=ac(a2["ovr"]+bA*bB,0xc,0x63),a2["maxOvr"]=Math["max"](a2["maxOvr"],
a2["ovr"]);
var bC=ad()<function(bD){var bE=bg(),bF=bh(bD,bE)-a2["ovr"];
if(bF<=0x0)return 0x0;
var bG=bD<=0xc?0.5:bD>=0xe?1.15:0x1;
return ac(0.0052*bF*function(bH){
return bH?0.45+0.06*bH["rep"]:0x1;
}(bE)*bG,0x0,0.55);
}(a2["age"]);
return a2["youthLog"]["push"]({'age':a2["age"],'teamId':a2["youthTea"+"mId"],'ovr':Math["round"](a2["ovr"]),'cut':bC}),bC?(a2["youthCut"]=a2["age"],
!0x0):(a2["age"]++,!0x1);
}()))return br("青训淘汰");
if(a2["age"]>=0x15&&!bi())return a2["youthCut"]=a2["age"],br("青训淘汰");
if(bi()){if(a2["flags"]["_gradCd"]>0x0)a2["flags"]["_gradCd"]--;
else return a2["phase"]="career",bm();
}var bx=aE();
if(!bx)return bj();
a2["pending"]={'type':"random",'eventId':bx['id']};
}/* ── §12 青训 送出国学费（choose 选国外青训时扣费，须在顶层作用域）── */
function _youthFee(rep){
var _base=[12,20,35,55,80,100];
return _base[rep]||_base[0x1];
}
function bk(){
if(a2["step"]++,"youth"===a2["phase"])return a2["youthTea"+"mId"]?bj():(function(){var bF=a0["TEAMS"]["filter"](function(bR){return aq(bR)['cn'];
}),bG=bF["filter"](function(bR){
return ab(a2["originId"],bR['id']);
}),bH=bF["filter"](function(bR){
return!ab(a2["originId"],bR['id']);
}),bI=[],bJ={};
function bK(bR,bS){
for(var bT=0x0;
bS>0x0&&bR["length"]&&bT++<0x3c;
){var bU=af(bR);
bJ[bU['id']]||(bJ[bU['id']]=0x1,bI["push"](bU),bS--);
}return bS;
}var bL=(aa[a2["originId"]]||[])["map"](aj)["filter"](Boolean),
bQ0=a0["TEAMS"]["filter"](function(bR){return aq(bR)['cn'];}),
bG=bQ0["filter"](function(bR){return !(bL["length"]&&bR['id']===bL[0]['id']);}),
bH=a0["TEAMS"]["filter"](function(bR){return !aq(bR)['cn'];}),
nTv=(a2["talent"]-0.7)/0.78,nOv=(a2["ovr"]-40)/30,
QQ=Math["max"](0,Math["min"](1,0.55*nTv+0.45*nOv)),
loR=QQ<0.42?1:(QQ<0.72?2:3),bI=[],bJ={};
function pU(bR){return bR&&!bJ[bR['id']]?(bJ[bR['id']]=0x1,bI.push(bR),!0x0):!0x1}
/* ── §12 青训 ──────────────────────────────────────────────────── */
function pickBand(pool,n){for(var w=0;w<3&&n>0;w++){
var cand=pool["filter"](function(bR){return !bJ[bR['id']]&&bR["rep"]>=loR-w&&bR["rep"]<=loR+1+w});
while(n>0&&cand["length"]){var cX=cand[Math["floor"](ad()*cand["length"])];
if(pU(cX)){n--;}cand.splice(cand.indexOf(cX),1);}}}
if(bL["length"])pU(bL[0]);
pickBand(bG,3-bI["length"]);
var dTeam=a2["dreamId"]?aj(a2["dreamId"]):null;
if(dTeam&&bI["length"]&&dTeam['id']!==bI[0x0]['id']){var _dIdx=-0x1;for(var _di=0;_di<bI["length"];_di++)if(bI[_di]['id']===dTeam['id']){_dIdx=_di;break;}
if(_dIdx>0x0)bI["splice"](_dIdx,0x1);bI["unshift"](dTeam);}
var bO=a2["money"]>=0x1e,dreamIsAbroad=dTeam&&!aq(dTeam)['cn'],
forN=2-(dreamIsAbroad&&bJ[dTeam['id']]?1:0),
bP=bH["filter"](function(bR){return bO?bR["rep"]>=0x3:bR["rep"]<=0x2;});
pickBand(bP["length"]?bP:bH,Math.max(0,forN));
var poolAll=bG["concat"](bH);
while(bI["length"]<6){var before=bI["length"];pickBand(poolAll,1);if(bI["length"]===before)break;}
while(bI["length"]>6){var lastK=bI[bI.length-1],isProt=(bL["length"]&&lastK['id']===bL[0]['id'])||lastK['id']===a2["dreamId"];
if(isProt)bI.splice(bI.length-2,1);else bI.pop();}
at(bI,bQ0),at(bI,bH);
var abIdx=-0x1;for(var zI=0;zI<bI["length"];zI++)if(!aq(bI[zI])['cn']){abIdx=zI;break;}
a2["pending"]={'type':'youth_path','offers':bI["map"](function(bR){return bR['id'];}),'abroadIdx':abIdx};
}());
if(a2["cheat"]&&(a2["banned"]=!0x1,a2["banLeft"]=0x0,a2["banGames"]=0x0,a2["flags"]["_forceRe"+"tire"]=!0x1,a2["clean"]=0x64,a2["guanxi"]=0x64),
a2["banned"])return br("终身禁足");
if(a2["flags"]["_forceRe"+"tire"])return br('伤退');
if(a2["age"]>=0x37)return br("年龄到了");
if(a2["cheat"]&&a2["age"]>=0x2d)return br("年龄到了");
if(!a2["teamId"]&&!a2["clubsPla"+"yed"]["length"])return bm();
if(a2["cheat"]){var bx=ar();
if(au()?a2["ovr"]>=0x3e:bx&&bx["rep"]<=ax()-0x2)return a2["flags"]["_forceLe"+"ave"]=!0x1,bo(!0x1);
}var by=a2["flags"]["_forceLe"+"ave"],bz=a2["lowSpell"]>=("long"===a2["mode"]?0x3:0x2),bA=a2["contract"+"Left"]<=0x0;
if(by||bz||bA){if(a2["loanFrom"]){var bB=aj(a2["loanFrom"]);
return bB&&(a2["teamId"]=bB['id'],a2["seasonsA"+"tClub"]=0x0,a2["roleAdju"+'st']=0x0,a2["lowSpell"]=0x0,a2["stagnate"]=!0x1,
a2["flags"]["_loanBac"+'k']=bB['id']),a2["loanFrom"]=null,a2["flags"]["_forceLe"+"ave"]=!0x1,bo(!0x1,!0x1);
}return a2["flags"]["_forceLe"+"ave"]=!0x1,bo(bz&&!by,by);
}if(a2["age"]>=0x14&&a2["life"]&&!a2["life"]["partner"]&&!a2["flags"]["_loveSta"+'rt']&&(a2["flags"]["_loveSta"+'rt']=!0x0,
b1("love_fir"+'st')),a2["age"]>=0x14&&(a2["flags"]["_staffCd"]||0x0)<=0x0){var bC=(function(){
for(var bF=[],bG=0x0;
bG<a5["length"];
bG++){var bH=a5[bG];
!a6(bH['id'])&&a2["money"]>=0x3*a7(bH)&&bF["push"](bH);
}return ag(bF),bF["slice"](0x0,0x3);
}());
if(bC["length"]&&ad()<0.55)return a2["flags"]["_staffCd"]=0x1,void(a2["pending"]={'type':"staff",'offers':bC["map"](function(bF){return bF['id'];
})});
}(a2["teamId"]&&(a2["capDone"]||[]).indexOf(a2["teamId"])<0x0&&a2["seasonsA"+"tClub"]>=0x2&&a0["ROLES"][a2["role"]]["rank"]>=0x4&&a2["ovr"]>=0x32+0x4*((ar()||{})["rep"]||0x0)&&"prime"===aB(a2["age"]))&&(a2["forceQ"]||(a2["forceQ"]=[]),
"gk"===al(a2["pos"])["group"]?a2["forceQ"].indexOf("gk_captain")<0x0&&a2["forceQ"].push("gk_captain"):a2["forceQ"].indexOf("captain")<0x0&&a2["forceQ"].push("captain")),
a2["caps"]>=0x19&&a2["ovr"]>=0x48&&!a2["usedEven"+"ts"]["nat_captain"]&&!a2["flags"]["_ntCaptain"]&&(a2["forceQ"]||(a2["forceQ"]=[]),
a2["forceQ"].indexOf("nat_captain")<0x0&&a2["forceQ"].push("nat_captain")),a2["age"]>=0x22&&a2["age"]<=0x24&&!a2["usedEven"+"ts"]["vet_wall"]&&(a2["forceQ"]||(a2["forceQ"]=[]),
a2["forceQ"].indexOf("vet_wall")<0x0&&a2["forceQ"].push("vet_wall")),a2["seasonsAtClub"]>=0x5&&a2["seasonsAtClub"]<0x8&&!a2["usedEven"+"ts"]["club_5y"+"rs"]&&(a2["forceQ"]||(a2["forceQ"]=[]),
a2["forceQ"].indexOf("club_5y"+"rs")<0x0&&a2["forceQ"].push("club_5y"+"rs")),a2["seasonsAtClub"]>=0xa&&a2["youthTeamId"]===a2["teamId"]&&!a2["usedEven"+"ts"]["club_10"+"yrs"]&&(a2["forceQ"]||(a2["forceQ"]=[]),
a2["forceQ"].indexOf("club_10"+"yrs")<0x0&&a2["forceQ"].push("club_10"+"yrs")),a2["seasonsAtClub"]>=0xa&&a2["youthTeamId"]!==a2["teamId"]&&!a2["usedEven"+"ts"]["club_10yrs"+"_way"]&&(a2["forceQ"]||(a2["forceQ"]=[]),
a2["forceQ"].indexOf("club_10yrs"+"_way")<0x0&&a2["forceQ"].push("club_10yrs"+"_way"));
if(a2["flags"]["_staffCd"]>0x0&&a2["flags"]["_staffCd"]--,a2["forceQ"]&&a2["forceQ"]["length"]){var bD=a2["forceQ"]["shift"]();
var bO2=function(bF){
for(var bG=0x0;
bG<a1["length"];
bG++)if(a1[bG]['id']===bF)return a1[bG];
return null;
}(bD);
if(bO2){if(bO2["pool"]){var bP2={};for(var bQ2 in bO2)bP2[bQ2]=bO2[bQ2];var bR2=bO2["pool"]["slice"]()["sort"](function(){return Math["random"]()-0.5});bP2["options"]=bR2["slice"](0x0,(bO2["rndPick"]||0x3))["concat"](bO2["single"]?[bO2["single"]]:[]);for(var bS2=0x0;bS2<a1["length"];bS2++)a1[bS2]===bO2&&(a1[bS2]=bP2);}
return a2["usedEven"+'ts'][bD]=(a2["usedEven"+'ts'][bD]||0x0)+0x1,a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1,
void(a2["pending"]={'type':"random",'eventId':bD});
}
}if(ad()<a3[a2["mode"]]["eventCha"+"nce"]){var bE=aE();
if(bE)return a2["usedEven"+'ts'][bE['id']]=(a2["usedEven"+'ts'][bE['id']]||0x0)+0x1,a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1,
bE['cn']&&(a2["flags"]["_cnCount"]=(a2["flags"]["_cnCount"]||0x0)+0x1),void(a2["pending"]={'type':"random",'eventId':bE['id']});
}return bl();
}function bl(){
a2["flags"]["_double"]=!0x1;
if(a2["teamId"]&&_dby[a2["teamId"]]&&!a2["flags"]["_derbyDo"+'ne']){
var dV2=_dby[a2["teamId"]]["filter"](function(dW2){return aj(dW2[0x0])&&aj(dW2[0x0])["league"]===ar()["league"];});
if(dV2["length"]){var dY2=dV2[Math["floor"](ad()*dV2["length"])],dZ2=aj(dY2[0x0]);a2["flags"]["_derbyDo"+'ne']=!0x0;aV("derby",0.5,{"comp":dY2[0x1],"opp":dZ2?dZ2["name"]:''});}}
var bx=b6();
bx&&(a2["pending"]={'type':"report",'recs':bx});
}function bm(){var bx,by=bp(a2["originId"])["guanxi"]>=0x12?0x3:0x2,bz=bg(),bA=[],bB={};
bz&&a2["ovr"]>=(bx=bz,Math["min"](bc(bx)-0x8,bh(a2["age"],bx)-0x6))&&(bB[bz['id']]=0x1,bA["push"](bz));
var bC=bz&&!aq(bz)['cn'],bD=a0["TEAMS"]["filter"](function(bM){var bN=aq(bM);
return!bB[bM['id']]&&(bC?!bN['cn']&&bM["rep"]<=(bz["rep"]>=0x4?0x3:0x2):bN['cn']&&bM["rep"]<=by);
}),bE=bD["filter"](function(bM){
return ab(a2["originId"],bM['id']);
}),bF=bD["filter"](function(bM){
return!ab(a2["originId"],bM['id']);
});
function bG(bM,bN){
for(var bO=0x0;
bN>0x0&&bM["length"]&&bO++<0x3c;
){var bP=af(bM);
bB[bP['id']]||(bB[bP['id']]=0x1,bA["push"](bP),bN--);
}return bN;
}if(!bC){var bH=(aa[a2["originId"]]||[])["map"](aj)["filter"](Boolean);
if(bH["length"]){var bI=af(bH);
if(a2["dreamId"]){for(var bJ=0x0;
bJ<bH["length"];
bJ++)bH[bJ]['id']===a2["dreamId"]&&(bI=bH[bJ]);
}bB[bI['id']]||(bB[bI['id']]=0x1,bA["push"](bI));
}var bK=bG(bE,0x6-bA["length"]-0x1);
bG(bF,0x1+bK);
}bA["length"]<0x6&&bG(bE["concat"](bF),0x6-bA["length"]);
var bL=bz&&bA["length"]&&bA[0x0]['id']===bz['id']?bA["shift"]():null;
ag(bA),at(bA,bD),bL&&bA["unshift"](bL),a2["pending"]={'type':"academy",'offers':bA["map"](function(bM){return bM['id'];
}),'homeId':bL?bL['id']:null,'canStayYouth':!0x0,'youthId':bz?bz['id']:null};
}function bo(bx,by){
a2["_offerTerms"]={};
function bO(bG){var bH=aJ(bG,aq(bG),a2["ovr"]),bI=be(bG),bJ=0.9+0.2*ad(),bK=0x1;
bK=bI<=0x1?1.3:0x2===bI?1.15:0x3===bI?0x1:0x4===bI?0.9:0.82;
return a2["_offerTerms"][bG['id']]={'wage':Math["round"](bH*bJ*bK),'years':bI,'mult':bJ*bK};
}if(a2["cheat"]&&a2["ovr"]>=0x3e){var bz=ax(),bA=a0["TEAMS"]["filter"](function(bG){var bH=aq(bG);
return!bH['cn']&&('欧冠'===bH["cont"]||'欧联'===bH["cont"])&&bG["rep"]<=bz;
}),bB=0x0;
if(bA["forEach"](function(bG){
bG["rep"]>bB&&(bB=bG["rep"]);
}),(bA=bA["filter"](function(bG){
return bG["rep"]>=bB-0x1;
}))["length"])return ag(bA),bA["forEach"](bO),void(a2["pending"]={'type':"transfer",'fired':!0x1,'offers':bA["slice"](0x0,0x3)["map"](function(bG){return bG['id'];
}),
'canStay':!au()&&!!ar()&&(ar()["rep"]>=bB||aq(ar())["rep"]>=0x4),'canRetire':a2["age"]>=0x1e});
}var bC=bf(a6("analyst")?0x6:0x4),bD=ar();
bD&&bO(bD),bC["forEach"](bO);
bx&&!by&&(a2["age"]>=0x20&&a2["ovr"]>=0x4b||b9(bD))&&(bx=!0x1,a2["lowSpell"]=0x0);
var bE=!bx&&!by&&bD&&(function(bG){var bH=bc(bG)-0x5;
return bG&&a2["youthTea"+"mId"]===bG['id']&&(bH-=0x8),bd(bG)>=bH;
}(bD)||b9(bD)||a2["seasons"]["filter"](function(bK){
return bK["teamId"]===bD['id'];
})["length"]>=0x3||a2["age"]>=0x20&&a2["ovr"]>=0x4b),bF=[];
bE&&a2["age"]<=0x17&&bD&&a0["ROLES"][aI(bD)]["rank"]<=0x1&&(bF=(function(){var bG=ar();
if(!bG)return[];
var bH=aq(bG),bI=a0["TEAMS"]["filter"](function(bK){
return bK['id']!==bG['id']&&!(bK["rep"]>=bG["rep"])&&aq(bK)['cn']===bH['cn']&&a0["ROLES"][aI(bK)]["rank"]>=0x2;
});
if(!bI["length"])return[];
bI["sort"](function(bK,bL){var bM=a0["ROLES"][aI(bK)]["rank"];
return a0["ROLES"][aI(bL)]["rank"]-bM||bL["rep"]-bK["rep"];
});
var bJ=bI["slice"](0x0,Math["min"](bI["length"],0x8));
return ag(bJ),bJ["slice"](0x0,0x2);
}())),bC["length"]||bE?(a2["pending"]={'type':"transfer",'fired':!!bx,'mustLeave':!!by,'offers':bC["map"](function(bG){return bG['id'];
}),'loans':bF["map"](function(bG){return bG['id'];
}),'backFrom':a2["flags"]["_loanBac"+'k']||null,'canStay':!!bE,'canRetire':a2["age"]>=0x1e},a2["flags"]["_loanBac"+'k']=null):a2["pending"]={'type':"retire_f"+"orced"};
}function bp(bx){
for(var by=0x0;
by<a4["length"];
by++)if(a4[by]['id']===bx)return a4[by];
return a4[0x0];
}function bq(){var bx,by,bz=0x0,bA=0x0;
for(bx=0x0;
bx<a2["seasons"]["length"];
bx++){var bB=aj((by=a2["seasons"][bx])["teamId"]),bC=by["leagueId"]?ak(by["leagueId"]):aq(bB);
bC&&bC["rep"]>=0x4&&bz++,bC&&bC["rep"]<=0x1&&bA++;
}var bD=a2["trophies"]["filter"](function(bL){
return/欧冠|欧联|世界杯|世俱杯|亚冠/["test"](bL["name"]);
})["length"],bE=a2["trophies"]["filter"](function(bL){
return/欧冠/["test"](bL["name"]);
})["length"],bF={'世界杯':-0x1,'亚洲杯':-0x1};
(a2["natRuns"]||[])["forEach"](function(bL){var bM=aQ[bL["stage"]];
null!=bM&&bM>bF[bL["comp"]]&&(bF[bL["comp"]]=bM);
});
var bG={};
(a2["awards"]||[])["forEach"](function(bL){
bG[bL["name"]]=(bG[bL["name"]]||0x0)+0x1;
});
var bH={};
a2["seasons"]["forEach"](function(bL){
if(bL["teamId"]){var bM=bH[bL["teamId"]]||(bH[bL["teamId"]]={'seasons':0x0,'apps':0x0,'name':bL["teamName"]});
bM["seasons"]++,bM["apps"]+=bL["apps"];
}});
var bI=null;
for(var bJ in bH)(!bI||bH[bJ]["seasons"]>bI["seasons"])&&(bI=bH[bJ]);
var bK=bI?a2["trophies"]["filter"](function(bL){
return bL["team"]===bI["name"];
})["length"]:0x0;
return{'gen':a2["gen"]||0x1,'age':a2["age"],'ovr':Math["round"](a2["ovr"]),'maxOvr':Math["round"](a2["maxOvr"]),'seasons':a2["seasons"]["length"],
'clubs':a2["clubsPla"+"yed"]["length"],'caps':a2["caps"],'banned':a2["banned"],'top5Seasons':bz,'lowSeasons':bA,'bigTrophies':bD,
'uclTrophies':bE,'trophies':a2["trophies"]["length"],'money':a2["money"],'peakAnnualWage':a2["peakAnnu"+"alWage"]||0x0,'careerEarnings':a2["careerEa"+"rnings"]||0x0,
'peakSalaryRank':a2["peakAnnu"+"alWage"]>=0x5dc?0x4:a2["peakAnnu"+"alWage"]>=0x3e8?0x3:a2["peakAnnu"+"alWage"]>=0x1f4?0x2:0x1,
'apps':a2["totals"]["apps"],'goals':a2["totals"]["goals"],'assists':a2["totals"]["assists"],'cs':a2["totals"]['cs'],'posGroup':al(a2["pos"])["group"],
'clean':Math["round"](a2["clean"]),'fame':Math["round"](a2["fame"]),'awards':(a2["awards"]||[])["length"],'award':function(bL){return bG[bL]||0x0;
},'wcRank':bF["世界杯"],'asiaRank':bF["亚洲杯"],'natGoals':a2["natStats"]&&a2["natStats"]["goals"]||0x0,'natCs':a2["natStats"]&&a2["natStats"]['cs']||0x0,
'married':!(!a2["life"]||!a2["life"]["married"]),'kids':a2["life"]&&a2["life"]["kids"]["length"]||0x0,'splits':a2["life"]&&a2["life"]["splits"]||0x0,
'abroad':a2["seasonsA"+"broad"],'reason':a2["endReaso"+'n']||'','youthTeamId':a2["youthTea"+"mId"]||'','youthAbroad':!(!a2["flags"]||!a2["flags"]["youthAbr"+"oad"]),
'youthCut':a2["youthCut"]||0x0,'appsPerSeason':a2["seasons"]["length"]?a2["totals"]["apps"]/a2["seasons"]["length"]:0x0,'ga':a2["totals"]['ga'],
'homeName':bI?bI["name"]:'','homeSeasons':bI?bI["seasons"]:0x0,'homeApps':bI?bI["apps"]:0x0,'homeTrophies':bK,'flags':a2["flags"]||{},
'seasonDouble20':(function(c2){
for(var c3=0x0;c3<a2["seasons"]["length"];c3++)if(a2["seasons"][c3]["goals"]>=0x14&&a2["seasons"][c3]["assists"]>=0x14)return!0x0;
return!0x1;
}()),'lateGoals':(function(c2){
for(var c3=0x0;c3<a2["seasons"]["length"];c3++)if(a2["seasons"][c3]["age"]>=0x23&&a2["seasons"][c3]["goals"]>=0x14)return!0x0;
return!0x1;
}()),'poyCount':(a2["awards"]||[]).filter(function(bL){
return bL["name"]["indexOf"]("最佳球员")>=0x0;
})["length"],'topCount':(a2["awards"]||[]).filter(function(bL){
return bL["name"]["indexOf"]('金靴')>=0x0;
})["length"],'leagueTitles':(function(){var _lt={},_lgNames={};
(a0["LEAGUES"]||[]).forEach(function(l){_lgNames[l["name"]+'冠军']=0x1;});
(a2["trophies"]||[]).forEach(function(t){if(t["name"]&&_lgNames[t["name"]])_lt[t["name"]]=0x1;});
return Object["keys"](_lt)["length"];
}()),'domTreble':(function(){var _hasL=!0x1,_hasC=!0x1,_hasS=!0x1;
(a2["trophies"]||[]).forEach(function(t){var n=t["name"]||"";
if(!_hasL){var _lg=!0x1;(a0["LEAGUES"]||[]).forEach(function(l){if(n===l["name"]+'冠军')_lg=!0x0;});_hasL=_lg;}
if(!_hasC&&/杯冠军$/.test(n)&&!/世俱杯/.test(n))_hasC=!0x0;
if(!_hasS&&(/超级杯/.test(n)||/社区盾/.test(n)))_hasS=!0x0;
});
return _hasL&&_hasC&&_hasS;
}()),'seasonTreble':(function(){var _byAge={};
(a2["trophies"]||[]).forEach(function(t){var n=t["name"]||"",_a=t["age"];if(_a==null)return;
_byAge[_a]=_byAge[_a]||{L:!0x1,C:!0x1,U:!0x1};
var _isL=!0x1;(a0["LEAGUES"]||[]).forEach(function(l){if(n===l["name"]+'冠军')_isL=!0x0;});
if(_isL)_byAge[_a]["L"]=!0x0;
if(/杯冠军$/.test(n)&&!/世俱杯/.test(n))_byAge[_a]["C"]=!0x0;
if(/欧冠冠军/.test(n))_byAge[_a]["U"]=!0x0;
});
for(var _k in _byAge)if(_byAge[_k]["L"]&&_byAge[_k]["C"]&&_byAge[_k]["U"])return!0x0;
return!0x1;
}()),'seasonMaxApps':(function(){var _m=0x0;
(a2["seasons"]||[]).forEach(function(s){if(s["apps"]>_m)_m=s["apps"];});
return _m;
}()),'cupTitles':(function(){var _c=0x0;
(a2["trophies"]||[]).forEach(function(t){var n=t["name"]||"";
if(/杯冠军$/.test(n)||/超级杯/.test(n)||/社区盾/.test(n))_c++;
});
return _c;
}())};
}function br(bx){
a2["phase"]="summary",a2["endReaso"+'n']=bx;
var by=bq(),bz="青训淘汰"===by["reason"];
/* ── §13 事件与收尾 ──────────────────────────────────────────── */
function bA(bF){
return null==bF["tier"]?0x9:bF["tier"];
}for(var bB=null,bC=[],bD=0x0;
bD<a0["ENDINGS"]["length"];
bD++){var bE=a0["ENDINGS"][bD];
bz===(0x0===bA(bE))&&bE["test"](by)&&(bC["push"](bE['id']),(!bB||bA(bE)<bA(bB))&&(bB=bE));
}bB&&(a2["ending"]=bB['id']),a2["endingsA"+'ll']=bC;
}function bs(bx){var by=a2["pending"];
if(!by||"random"!==by["type"]||by["result"])return!0x1;
for(var bz=null,bA=0x0;
bA<a1["length"];
bA++)a1[bA]['id']===by["eventId"]&&(bz=a1[bA]);
if(!bz)return null;
var bB=bz["options"]||(bz["pool"]&&function(){var bH={};for(var bI in bz)bH[bI]=bz[bI];var bJ=bz["pool"]["slice"]()["sort"](function(){return Math["random"]()-0.5});bH["options"]=bJ["slice"](0x0,(bz["rndPick"]||0x3))["concat"](bz["single"]?[bz["single"]]:[]);for(var bN=0x0;bN<a1["length"];bN++)a1[bN]===bz&&(a1[bN]=bH);return bH["options"];}())||[];bB=bB[Number(bx)];if(!bB)return!0x1;
var bR4=function(bG2){a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':bG2&&bG2["title"]||"事件",'text':bG2&&bG2["text"]||''});};
if(bv(bx),a2["cheat"]){var bF4=function(bD){
for(var bE=a2["rngState"],bF=null,bG=bE,bH=-0x1/0x0,bI=0x0;
bI<0x2;
bI++){a2["rngState"]=bE,window["EV_ROLL"]&&(window["EV_ROLL"]["reset"](),window["EV_ROLL"]["force"](0x0===bI));
var bJ=aA(),bK=bD["apply"](bJ,ad,bt(bD,bJ)),bL=bu(bK);
bL>bH&&(bH=bL,bG=a2["rngState"],bF={'res':bK,'opt':bD,'roll':window["EV_ROLL"]?window["EV_ROLL"]["last"]():null});
}return window["EV_ROLL"]&&window["EV_ROLL"]["force"](null),a2["rngState"]=bG,bF;
}(bB);bR4({'title':bz["title"],'text':bF4["res"]["text"]});return bF4;}
window["EV_ROLL"]&&window["EV_ROLL"]["reset"]();
var bC=aA(),bD4={'res':bB["apply"](bC,ad,bt(bB,bC)),'opt':bB,'roll':window["EV_ROLL"]?window["EV_ROLL"]["last"]():null};
bR4({'title':bz["title"],'text':bD4["res"]["text"]});return bD4;
}function bt(bx,by){
return bx&&"function"==typeof bx['p']?bx['p'](by):null;
}function bu(bx){
if(!bx)return-0x1/0x0;
var by=0x0;
return bx["banned"]&&(by-=0xf4240),bx["retire"]&&(by-=0xf4240),bx["ban"]&&(by-=0x190*bx["ban"]),bx["banGames"]&&(by-=0x8*bx["banGames"]),
bx["stagnate"]&&(by-=0x96),bx["lockAbro"+'ad']&&(by-=0x3c*bx["lockAbro"+'ad']),bx["returnHo"+'me']&&(by-=0x12c),bx["leave"]&&(by-=0xf),
bx["goAbroad"]&&(by+=0x1e),by+=0xa*(bx["ovr"]||0x0),by+=0x14*(bx["roleDelt"+'a']||0x0),by+=bx["fame"]||0x0,by+=0x5*(bx["talent"]||0x0),
by+=0x8*(bx["caps"]||0x0),(by+=0.1*((bx["clean"]||0x0)+(bx["guanxi"]||0x0)))+0.02*(bx["money"]||0x0);
}function bv(bx){
a2["choices"]&&a2["choices"]["push"](String(bx));
}function bw(bx){
return a2["pending"]?(a2["pending"]["result"]={'text':aD(bx["text"]),'deltas':aF(bx)},a2["pending"]["result"]):null;
}
/* ── §14 公共API ──────────────────────────────────────────────── */
window["SIM"]={'attach':function(bx){return a2=bx;
},'state':function(){return a2;
},'newState':function(bx,by,bz,bA,bAch){return a2=function(bB,bC,bD,bE,bAch){var bF=bC["origin"],bG=az(bE),cK=null;
if(bC["name"]==="郝海东"&&bC["number"]===9)cK={'id':"haodong",'o':3,'t':0.05,'i':1};
else if(bC["name"]==="范志毅"&&bC["number"]===5)cK={'id':"fanzy",'o':3,'t':0.05,'i':1};
else if(bC["name"]==="孙继海"&&bC["number"]===12)cK={'id':"sunjh",'o':2,'t':0.05,'i':1};
else if(bC["name"]==="郑智"&&bC["number"]===10)cK={'id':"zhengz",'o':2,'t':0.06,'i':1};
else if(bC["name"]==="武磊"&&bC["number"]===7)cK={'id':"wulei",'o':2,'t':0.06,'i':1};
else if(bC["number"]===10&&bC["pos"]==="ST")cK={'id':"pele",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===10&&bC["pos"]==="CAM")cK={'id':"maradona",'o':2,'t':0.14,'i':1};
else if(bC["number"]===10&&bC["pos"]==="RW")cK={'id':"messi",'o':5,'t':0.05,'i':-1};
else if(bC["number"]===7&&bC["pos"]==="LW")cK={'id':"cristiano",'o':5,'t':0.05,'i':-1};
else if(bC["number"]===14&&bC["pos"]==="CAM")cK={'id':"cruyff",'o':2,'t':0.14,'i':1};
else if(bC["number"]===5&&bC["pos"]==="CB")cK={'id':"beckenbauer",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===9&&bC["pos"]==="ST")cK={'id':"ronaldo",'o':5,'t':0.1,'i':2};
else if(bC["number"]===21&&bC["pos"]==="CAM")cK={'id':"zidane",'o':3,'t':0.08,'i':0};
else if(bC["number"]===1&&bC["pos"]==="GK")cK={'id':"yashin",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===3&&bC["pos"]==="LB")cK={'id':"maldini",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===2&&bC["pos"]==="RB")cK={'id':"cafu",'o':3,'t':0.06,'i':0};
else if(bC["number"]===7&&bC["pos"]==="ST")cK={'id':"mbappe",'o':2,'t':0.02,'i':1};
else if(bC["number"]===10&&bC["pos"]==="CM")cK={'id':"modric",'o':2,'t':0.03,'i':0};
else if(bC["number"]===11&&bC["pos"]==="ST")cK={'id':"kane",'o':2,'t':0.02,'i':0};
else if(bC["number"]===11&&bC["pos"]==="RW")cK={'id':"salah",'o':1,'t':0.01,'i':0};
else if(bC["number"]===22&&bC["pos"]==="CAM")cK={'id':"bellingham",'o':1,'t':0.03,'i':1};
else if(bC["number"]===16&&bC["pos"]==="CDM")cK={'id':"rodri",'o':1,'t':0.02,'i':0};
else if(bC["number"]===4&&bC["pos"]==="CB")cK={'id':"vandijk",'o':1,'t':0,'i':-1};
else if(bC["number"]===17&&bC["pos"]==="CM")cK={'id':"debruyne",'o':1,'t':0.01,'i':0};
return{'ver':0x6,'seed':bD,'rngState':ai(String(bD)),'mode':bB,'phase':"youth",'step':0x0,'name':bC["name"],'number':bC["number"],
'foot':bC["foot"],'pos':bC["pos"],'originId':bF['id'],'cheat':aw(bC),'legend':cK,'dreamId':bC["dreamId"]||null,'gen':bG?bG["gen"]:0x1,
'legacy':bG,'age':0xc,'ovr':ac(0x18+0.5*bF["ovr"]+(bG?0.5*bG["ovr"]:0x0),0x12,0x24)+(cK?cK['o']:0x0)+(bAch&&bAch['ovr']?bAch['ovr']:0x0),'maxOvr':0x0,'talent':0x1+(bAch&&bAch['talent']?bAch['talent']:0x0),
'guanxi':ac(0x1e+bF["guanxi"]+(bG?bG["guanxi"]:0x0),0x0,0x64),'clean':0x50,'fame':0x5,'money':bF["money"]+(bG?bG["money"]:0x0)+(bAch&&bAch['money']?bAch['money']:0x0),
'seasonWage':0x0,'wageMult':0x1,'peakAnnualWage':0x0,'careerEarnings':0x0,'teamId':null,'role':"sub",'roleAdjust':0x0,'seasonsAtClub':0x0,
'seasonsAbroad':0x0,'clubsPlayed':[],'contractLeft':0x0,'loanFrom':null,'lowSpell':0x0,'banLeft':0x0,'banGames':0x0,'banned':!0x1,
'lockAbroad':0x0,'pendingMult':null,'stagnate':!0x1,'youthTeamId':null,'youthLog':[],'youthCut':0x0,'caps':0x0,'natStats':{'goals':0x0,'assists':0x0,'cs':0x0},
'totals':{'apps':0x0,'goals':0x0,'assists':0x0,'cs':0x0,'ga':0x0},'seasons':[],'trophies':[],'awards':[],'natRuns':[],'tournaments':[],'cupRuns':[],'forceQ':[],
'life':{'partner':null,'married':0x0,'kids':[],'splits':0x0},'natForm':{'wc':0x0,'asia':0x0},'flags':{},'staff':{},'pending':null,'_awardDue':!0x1,'usedEvents':{},'choices':[],'eventLog':[],
'rid':null,'achBonus':bAch||null,'playerType':0xb};
}(bx,by,bz,bA,bAch),a2["playerType"]=calcPlayerType(),a2;
},'nextStep':bk,'doPeriod':bl,'choose':function(bx){var by,bz,bA=a2["pending"];
if(!bA)return!0x1;
if("random"===bA["type"]){var bB=bs(bx);
if(null===bB)return bk(),!0x0;

return!!bB&&(bw(bB["res"]),!0x0);
}if("youth_pa"+'th'===bA["type"]){var bC=bA["offers"][Number(bx)];
return!!bC&&(bv(bx),a2["youthTea"+"mId"]=bC,aq(aj(bC))['cn']||(a2["money"]-=_youthFee(aj(bC)["rep"]),a2["flags"]["youthAbr"+"oad"]=!0x0),
a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':"加入青训营",'text':"进入"+((aj(bC)["academy"])||aj(bC)["name"])}),a2["talent"]=0.7+0.78*Math["pow"](ad(),1.7)+(a2["legacy"]?a2["legacy"]["talent"]:0x0)+(a2["legend"]?a2["legend"]['t']:0x0),
a2["playerType"]=calcPlayerType(),a2["pending"]=null,bk(),!0x0);
}if("academy"===bA["type"]){if("youth"===bx)return!!bA["canStayY"+"outh"]&&(bv(bx),a2["flags"]["_gradCd"]=0x2,a2["phase"]="youth",
a2["pending"]=null,bk(),!0x0);
var bD=bA["offers"][Number(bx)];
return!!bD&&(bv(bx),b8(bD,!0x0),a2["pending"]=null,bk(),!0x0);
}if("transfer"===bA["type"]){if("retire"===bx)return bv(bx),br("主动挂靴"),!0x0;
if("stay"===bx)return bv(bx),function(){var bU2=a2["_offerTerms"]&&a2["_offerTerms"][ar()['id']];
a2["contract"+"Left"]=bU2?bU2["years"]:be(),a2["wageMul"+'t']=bU2?bU2["mult"]:0x1;
}(),a2["pending"]=null,bk(),!0x0;
if(0x0===String(bx)["indexOf"]("loan")){var bE=bA["loans"]&&bA["loans"][Number(String(bx)["slice"](0x4))];
return!!bE&&(bv(bx),by=bE,bz=a2["teamId"],b8(by,!0x0),a2["loanFrom"]=bz,a2["contract"+"Left"]=0x1,a2["pending"]=null,bk(),
!0x0);
}var bF=bA["offers"][Number(bx)];
return!!bF&&(bv(bx),b8(bF,!0x0),function(){var bV2=a2["_offerTerms"]&&a2["_offerTerms"][bF];
a2["contract"+"Left"]=bV2?bV2["years"]:be(),a2["wageMul"+'t']=bV2?bV2["mult"]:0x1;
}(),a2["pending"]=null,bk(),!0x0);
}return "staff"===bA["type"]?(bv(bx),"skip"!==bx&&bA["offers"]["indexOf"](bx)>=0x0&&(a2["staff"]=a2["staff"]||{},a2["staff"][bx]=!0x0),
a2["pending"]=null,bk(),!0x0):"bigmatch"===bA["type"]?!bA["result"]&&function(bG){
var bH,bI=a2["bigQ"][0x0],bJ=null;
var _p=bA;
for(bH=0x0;bH<aY["length"];bH++)aY[bH]["key"]===bG&&(bJ=aY[bH]);
var _dec=_p["dec"]||"kickoff";
/* 决策点: 开场介绍 —— 单一"开始比赛"按钮 */
if(_dec==="intro"){
  _p["dec"]=null;_p["opts"]=null;bI["dec"]=null;bI["opts"]=null;
  _bmAdvance(bI);
  _p["score"]=bI["score"];_p["seg"]=bI["seg"];_p["dec"]=bI["dec"];_p["opts"]=bI["opts"];_p["done"]=bI["done"];_p["log"]=bI["log"];_p["t"]=bI["t"];
  return!0x0;
}
/* 决策点: 点球 —— 玩家一次机会,只给一点加成 */
if(_dec==="pen"){
  bv(bG);
  var _pBase=0x68;
  var _bonus=(bG==="left"||bG==="right")?0x5:0x3;
  var _pb=ac((_pBase+_bonus)/0x64,0.55,0.85);
  var _sA=ad()<_pb;
  _p["log"]["push"](bG==="left"?"你走向点球点，深吸一口气，瞄准左下角……":"你走向点球点，深吸一口气……");
  _p["log"]["push"](_sA?"你冷静推射，皮球应声入网！":"你的一脚被门将猜中方向扑出！");
  _p["_penA"]=_sA;
  _p["_penDone"]=!0x0;
  _bmFinish(bI,_p);
  return!0x0;
}
/* 普通决策点: 应用战术 mood 修正 */
var _moodMap={"hold":0x1,"push":0x2,"run":0x0,"solo":0x1,"wall":-0x1};
bI["_mood"]=(bI["_mood"]||0x0)+(_moodMap[bG]!=null?_moodMap[bG]:0x0);
bI["_choice"]=bG;
bv(bG);
_p["log"]["push"](_dec==="kickoff"?(bG==="push"?"开场哨响，你们选择主动压上，气势如虹。":bG==="hold"?"开场哨响，你们选择稳扎稳打，先站稳脚跟。":"开场哨响，你们选择控制节奏，让球流动起来。"):_dec==="halftime"?(bG==="push"?"下半场开始，你们阵型整体前压，不留余地。":bG==="hold"?"下半场开始，你们选择收缩防线，守住局面。":"下半场开始，你们加强了中场控制。"):_dec==="extra"?(bG==="push"?"加时赛你们选择压上搏命！":"加时赛你们选择控制节奏，等待点球。"):bG==="push"?"终场前你们孤注一掷全线压上！":"终场前你们选择守住现有局面。");
_p["dec"]=null;_p["opts"]=null;bI["dec"]=null;bI["opts"]=null;
/* 推进到下一决策点或结束 */
_bmAdvance(bI);
_p["score"]=bI["score"];_p["seg"]=bI["seg"];_p["dec"]=bI["dec"];_p["opts"]=bI["opts"];_p["done"]=bI["done"];_p["log"]=bI["log"];_p["t"]=bI["t"];
if(_p["done"]){_bmFinish(bI,_p);}
return!0x0;
}(bx):"retire_f"+"orced"===bA["type"]&&(bv(bx),br("无人问津"),!0x0);
},'cont':function(){var bx=a2["pending"];
if(bx){if("report"===bx["type"]||("random"===bx["type"]||"bigmatch"===bx["type"])&&bx["result"]){if("random"===bx["type"]&&bx["result"]){if(a2["pending"]=null,!a2["flags"]["_double"]&&ad()<0.35){var by=aE();
if(by)return a2["usedEven"+'ts'][by['id']]=(a2["usedEven"+'ts'][by['id']]||0x0)+0x1,a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1,
by['cn']&&(a2["flags"]["_cnCount"]=(a2["flags"]["_cnCount"]||0x0)+0x1),a2["flags"]["_double"]=!0x0,void(a2["pending"]={'type':"random",'eventId':by['id']});
}return "youth"===a2["phase"]?void bk():void bl();
}if("report"===bx["type"])return a2["pending"]=null,void bk();
if("bigmatch"===bx["type"]&&bx["result"]){if(a2["pending"]=null,a2["period"]){var bz=b7();
return void(bz&&(a2["pending"]={'type':"report",'recs':bz}));
}bk();
}else a2["pending"]=null,bk();
}}else bk();
},'resolveEvent':bs,'commitEvent':bw,'goSummary':br,'optHint':function(bx,by){var bz=bx&&bx["options"]&&bx["options"][by];
if(!bz)return'';
if("function"!=typeof bz["hint"])return bz["hint"]||'';
var bA=aA();
return bz["hint"](bA,bt(bz,bA))||'';
},'BIG_OPTS':aY,'STAFF':a5,'staffById':function(bx){
for(var by=0x0;
by<a5["length"];
by++)if(a5[by]['id']===bx)return a5[by];
return null;
},'staffFee':a8,'staffPrice':a7,'leagueOfTeam':aq,'makeAcademy':bm,'makeTransfer':bo,'offerBrief':function(bx){var by=aj(bx);
if(!by)return null;
var bz=aq(by),bA=aI(by),bC=a2["_offerTerms"]&&a2["_offerTerms"][by['id']];
if(!bC){var bD=aJ(by,bz,a2["ovr"]),bE=be(),bF=0.9+0.2*ad(),bG=0x1;
bG=bE<=0x1?1.3:0x2===bE?1.15:0x3===bE?0x1:0x4===bE?0.9:0.82;
bC={'wage':Math["round"](bD*bF*bG*bAge()),'years':bE,'mult':bF*bG};
}return{'wage':bC["wage"],'years':bC["years"],'role':bA,'roleName':a0["ROLES"][bA]["name"],'mult':bC["mult"]};
},'wageAt':aJ,'academyName':function(bx){
return bx?bx["academy"]||bx["name"]+" 梯队":"青训队";
},'YOUTH_ADULT_OVR':0x2a,'bigOpponent':aU,'rnd':ad,'rint':ae,'rpick':af,'shuffle':ag,'rweight':ah,'hashStr':ai,'clamp':ac,
'teamById':aj,'leagueById':ak,'posById':al,'curTeam':ar,'curLeague':as,'inChina':au,'originById':bp,'isNear':ab,'isHome':function(bx,
by){var bz=aa[bx];
return!!bz&&bz["indexOf"](by)>=0x0;
},'fmtMoney':av,'fmtValue':function(bx){
return bx>=0x5f5e100?(bx/0x5f5e100)["toFixed"](0x2)["replace"](/0$/,'')+" 亿欧":bx>=0x2710?Math["round"](bx/0x2710)+" 万欧":bx+'\x20欧';
},'valueOf':function(bx,by){var bz,bA=a0["VALUE_TA"+"BLE"],bB=bA[0x0][0x1];
for(bz=0x0;
bz<bA["length"];
bz++){if(bx<=bA[bz][0x0]){if(0x0===bz){bB=bA[0x0][0x1];
break;
}var bC=bA[bz-0x1],bD=bA[bz];
bB=bC[0x1]+(bD[0x1]-bC[0x1])*(bx-bC[0x0])/(bD[0x0]-bC[0x0]);
break;
}bB=bA[bz][0x1];
}var bE=0x1;
return by>0x1c&&(bE*=Math["pow"](0.88,by-0x1c)),by>0x21&&(bE*=Math["pow"](0.75,by-0x21)),by<0x14&&(bE*=1.15),Math["max"](0x4e20,
0x2710*Math["round"](bB*bE/0x2710));
},'snap':aA,'stageOf':aB,'pickRival':aC,'interpolate':aD,'pickEvent':aE,'applyResult':aF,'growthRange':aG,'computeRole':aH,
'roleAtTeam':aI,'posRates':aK,'starPower':aL,'nationalOdds':aM,'runTournament':aP,'natBest':function(){var bx={};
return(a2["natRuns"]||[])["forEach"](function(by){
(!bx[by["comp"]]||aQ[by["stage"]]>aQ[bx[by["comp"]]["stage"]])&&(bx[by["comp"]]=by);
}),["世界杯","亚洲杯"]["filter"](function(by){return bx[by];
})["map"](function(by){return bx[by];
});
},'natResult':aZ,'simulateOneSeason':b2,'addAward':b5,'runPeriod':b6,'doTransfer':b8,'pickOffers':bf,'offerOption':function(bx,
by){var bz=aq(bx);
return{'teamId':bx['id'],'team':bx,'label':"加盟 "+bx["name"],'info':bz["name"]+" · "+["保级队","中下游",'中游','争冠','豪门',"顶级豪门"][bx["rep"]],
'tag':by||null};
},'buildProfile':bq,'legacyFrom':function(bx){
if(!bx)return null;
var by=(bx["gen"]||0x1)+0x1;
return bx["banned"]?{'gen':by,'ovr':0x0,'talent':0x0,'guanxi':0x0,'money':0x0}:{'gen':by,'ovr':ac(Math["round"]((bx["maxOvr"]-0x44)*0x2/0x5),0x0,ay["ovr"]),
'talent':ac(Math["round"]((bx["maxOvr"]-0x44))/0x64,0x0,ay["talent"]),'guanxi':ac(Math["round"](bx["caps"]*0x2/0x5+3*bx["trophies"]),0x0,ay["guanxi"]),
'money':ac(Math["round"](0.01*bx["careerEa"+"rnings"]),0x0,ay["money"])};
},'normLegacy':az,'LEGACY_CAP':ay,'SAVE_VER':0x6,'MODES':a3,'ORIGINS':a4,'NEAR_TEAMS':a9,'HOME_TEAMS':aa,'NAT_RANK':aQ,'NAT_SHORT':{'预选赛出局':"没打进正赛",
'小组赛出局':"小组赛出局",'止步十六强':"十六强",'止步八强':'八强','止步四强':'四强','亚军':'亚军','冠军':'冠军'}};
}()));
function _sim_0b(x,x){return '';}function _sim_0a(){return [];}