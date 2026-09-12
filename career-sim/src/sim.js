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
 *  §7b 世界联赛引擎          联赛/杯赛/洲赛真实化（PLAN-league-realism.md）
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




{'id':"analyst",'name':"数据分析师",'fee':0x28,'desc':"转会报价 +1",'note':"你的热图发到了三"+"十家。"},{'id':"agent",'name':"大牌经纪人",'fee':0x5a,'desc':"留洋门槛降一档",'note':"他接得通那几个电"+'话。'},




{'id':'pr','name':"公关团队",'fee':0x46,'desc':"名气不退、黑料减"+'半','note':"让旧新闻沉下去。"},




{'id':"lawyer",'name':"税务律师",'fee':0x37,'desc':"罚款少三成",'note':"他看合同比你看战"+"术板快。"},{'id':"chef",'name':"私人厨师",'fee':0x1e,'desc':"成长快一点",'note':"菜不好吃，你轻了"+"四公斤。"}];
/* 员工分级：每类 3 级（1 基础 / 2 高级 / 3 团队），fee 与效果随级别放大；
   同类型只能养一位，高级可直接替换低级；主动上门的永远是第 3 级 */
var _stTiers={'rehab':['私人康复师','高级康复师','康复团队'],
'fitness':['体能教练','高级体能教练','体能团队'],
'analyst':['数据分析师','高级数据分析师','数据团队'],
'agent':['经纪人','知名经纪人','大牌经纪人'],
'pr':['公关顾问','公关团队','顶级公关部'],
'lawyer':['税务律师','资深税务律师','律师团队'],
'chef':['私人厨师','高级营养厨师','厨师团队']};
/* 分级文案：效果随级别放大的部分在 desc 里体现 */
var _stDescs={
'rehab':["伤病少三成","伤病少一半","几乎不进医务室"],
'fitness':["衰减放缓两成","衰减放缓三成","衰减放缓近半"],
'analyst':["转会报价 +1","转会报价 +2","转会报价 +2 · 换名单 +1"],
'agent':["留洋门槛降一档","留洋门槛降两档","留洋门槛降三档"],
'pr':["名气不退、黑料减半","名气不退、黑料少七成","名气不退、几乎没有黑料"],
'lawyer':["罚款少三成","罚款少一半","罚款少七成"],
'chef':["成长快一点","成长快一截","成长快一大截"]};
function _stFeeMult(t){return t===2?2.2:t===3?4:1;}
function _stEff(t){return t===2?1.6:t===3?2.2:1;}
function _stT(bx){var _v=a2["staff"]&&a2["staff"][bx];return _v?_v["tier"]||1:0;}
/* 'chef3' → {id,type,tier,name,fee(未乘峰值工资系数),desc,note}；t1 直接用类型 id */
function _stById(bx){
var t=1,base=bx,_m=/^(.*?)([123])$/.exec(bx||'');
if(_m&&_stTiers[_m[1]]&&+_m[2]>1){base=_m[1];t=+_m[2];}
for(var i=0;i<a5["length"];i++)if(a5[i]['id']===base){
var b=a5[i];
return{'id':bx,'type':base,'tier':t,'name':_stTiers[base][t-1],'fee':Math.round(b["fee"]*_stFeeMult(t)),'desc':_stDescs[base]?_stDescs[base][t-1]:b["desc"],'note':b["note"]};
}
return null;
}
function a6(bx){
return!(!a2["staff"]||!a2["staff"][bx]);
}function a7(bx){
/* 经纪人佣金与球员身价脱钩：一口价 */
if((bx["type"]||bx['id'])==="agent")return Math["round"](bx["fee"]);
return Math["round"](bx["fee"]*ac(0x1+(a2["peakAnnu"+"alWage"]||0x0)/0x2bc,0x1,0x4));
}function a8(){
for(var bx=0x0,by=0x0;
by<a5["length"];
by++){var _id=a5[by]['id'];
if(a6(_id)){var _t=_stT(_id);bx+=a7(_stById(_t===0x1?_id:_id+_t));}
}
return bx;
}
/* ── 团队面板：效力年数加成 与 每赛季候选市场 ─────────────────── */
function _stM(bx){
var _v=a2["staff"]&&a2["staff"][bx];
return 0x1+Math["min"](0.3,0.1*(_v&&typeof _v==="object"?_v["y"]||0x0:0x0));
}
function _staffMkt(){
var _own=a2["staff"]||{},_ids=[],_tm=ar(),_ab=_tm&&!aq(_tm)['cn'],_fame=a2["fame"]||0x0;
/* 名气门槛：agent t1/t2/t3 = 0/15/25，pr = 0/20/35，lawyer = 0/8/15 */
var _gate={'agent':[0,15,25],'pr':[0,20,35],'lawyer':[0,8,15]};
for(var _k in _stTiers)for(var _t=1;_t<=3;_t++){
/* 已雇该类型时只刷更高级别（升级路径），同级/低级不再出现 */
if(_own[_k]&&(_own[_k]["tier"]||1)>=_t)continue;
if(_k==="agent"&&_ab)continue;
if(_fame<(_gate[_k]?_gate[_k][_t-1]:0))continue;
_ids.push(_t===1?_k:_k+_t);
}
return ag(_ids),a2["staffMkt"]={'season':a2["seasons"]["length"]+0x2,'ids':_ids["slice"](0x0,0x3)},a2["staffMkt"];
}
function _yTrialP(){
var _df=a2["ovr"]-bh(a2["age"],bg());
return ac(0.3+0.04*_df+0.2*((a2["talent"]-0.7)/0.78),0.05,0.8);
}var a9={'ln':["cn-dl","cn-cc","cn-bj","cn-tj","cn-shh","cn-sd"],



'sd':["cn-sd","cn-zj","cn-hn","cn-bj","cn-qdh","cn-qdw"],
'sh':["cn-sh","cn-shh","cn-zj","cn-hn","cn-qdh","cn-qdw"],'bj':["cn-bj","cn-tj","cn-hn","cn-sd","cn-dl","cn-shh"],



'gd':["cn-sz",
"cn-mz","cn-cd","cn-wh","cn-yn","cn-cc"],'hn':["cn-hn","cn-bj","cn-sd","cn-zj","cn-cc","cn-tj"],'heb':["cn-tj","cn-bj","cn-cc",
"cn-sd","cn-hn","cn-dl"],



'hun':["cn-cd","cn-wh","cn-sz","cn-hn","cn-zj","cn-mz"],'xj':["cn-cd","cn-yn","cn-sd","cn-bj","cn-wh",
"cn-hn"],'js':["cn-zj","cn-sh","cn-shh","cn-hn","cn-yn","cn-sd"],



'sc':["cn-cd","cn-wh","cn-yn","cn-hn","cn-sz","cn-zj"]},aa={'ln':["cn-dl"],
'sd':["cn-sd"],'sh':["cn-sh"],'bj':["cn-bj"],


'gd':["cn-sz"],
'hn':["cn-hn"],'heb':["cn-tj"],'hun':["cn-cd"],'xj':[],'js':["cn-zj"],
'sc':["cn-cd"]};




/* ── §2 工具函数 ──────────────────────────────────────────────── */




function ab(bx,by){var bz=a9[bx];
return!!bz&&bz["indexOf"](by)>=0x0;
}/* 家乡球队：region 与开局省份一致的中超/中甲队，可多个（如上海=海港+申花） */
function _homeTeams(){var bz=a2["originId"],bA=[];if(!bz)return bA;for(var i=0x0;i<a0["TEAMS"]["length"];i++){var t=a0["TEAMS"][i];if(t&&t["region"]===bz)bA.push(t);}return bA;}
/* 老将回归邀请：判断某队是否愿意给老将报价（沿用青训升级的准入线） */
function _wantsMe(bx){
if(!bx)return!0x1;
var bC=bc(bx),bD=bh(a2["age"],bx);
return a2["ovr"]>=Math["min"](bC-0x8,bD-0x6);
}
/* 老将回归候选池：kind=home(家乡,可多队)/youth(青训营,可多个)/first(职业生涯首队)
   过滤掉现东家与不达报价门槛的队 */
function _invitePool(bx){
var bC=[],bD={},bE=0x0,bF,i,t;
function bG(bH){if(bH&&bH['id']!==a2["teamId"]&&!bD[bH['id']]&&_wantsMe(bH)){bD[bH['id']]=0x1;bC["push"](bH);}}
if("home"===bx){bF=_homeTeams();for(i=0x0;i<bF["length"];i++)bG(bF[i]);}
else if("youth"===bx){
bG(aj(a2["youthTea"+"mId"]));
var bH=a2["youthLog"]||[];
for(i=0x0;i<bH["length"];i++)bG(aj(bH[i]["teamId"]));
}else if("first"===bx){bG(aj((a2["clubsPla"+"yed"]||[])[0x0]));}
return bC;
}function ac(bx,by,bz){
return Math["max"](by,Math["min"](bz,bx));
}/* rngState 局部镜像：ad 是全引擎最热的函数（每季数十万次调用），
   不再每次读写状态对象；公共 API 返回前统一刷回 a2.rngState（存档安全），序列位级不变 */
var _rs=0x0;
function ad(){
_rs=(_rs+0x6d2b79f5)>>>0x0;
var bx=_rs;
return bx=Math["imul"](bx^bx>>>0xf,0x1|bx),
(((bx^=bx+Math["imul"](bx^bx>>>0x7,0x3d|bx))^bx>>>0xe)>>>0x0)/0x100000000;
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
}function ah(bx,



by){var bz,bA=0x0;
for(bz=0x0;
bz<bx["length"];
bz++)bA+=Math["max"](0x0,by(bx[bz]));
if(bA<=0x0)return null;
var bB=ad()*bA,



bC=0x0;
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
}var am={'ch':"epl",



'seg':"liga",'b2':"bund",'l2':"l1",'serb':"seri",'cl1':"csl"},ao={'epl':'ch','liga':"seg",'bund':'b2','l1':'l2','seri':'serb','csl':'cl1'};
function ap(bx){
return bx?a2&&a2["leagueOf"]&&a2["leagueOf"][bx['id']]||bx["league"]:null;
}function aq(bx){return bx?ak(ap(bx)):null;
}function ar(){
return a2["teamId"]?aj(a2["teamId"]):null;
}function as(){return aq(ar());
}function at(bx,



by){
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
}var ay={'ovr':0xa,



'talent':0.3,'guanxi':0x18,'money':0x258};




/* ── §3 遗产与状态 ──────────────────────────────────────────────── */




function az(bx){
if(!bx||"object"!=typeof bx)return null;
var by=Math["round"](Number(bx["gen"])||0x0);
return by>=0x2?{'gen':Math["min"](by,0x3e7),'ovr':ac(Math["round"](Number(bx["ovr"])||0x0),0x0,ay["ovr"]),'talent':ac(Number(bx["talent"])||0x0,0x0,ay["talent"]),
'guanxi':ac(Math["round"](Number(bx["guanxi"])||0x0),0x0,ay["guanxi"]),'money':ac(Math["round"](Number(bx["money"])||0x0),0x0,ay["money"])}:null;
}function aA(){var bx=ar(),



by=as(),bz={'age':a2["age"],'ovr':a2["ovr"],'talent':a2["talent"],'guanxi':a2["guanxi"],'clean':a2["clean"],
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
}function aD(bx){var by=ar(),



bz=as(),bA=aC();
return String(bx)["replace"](/\{club\}/g,by?by["name"]:'球队')["replace"](/\{rival\}/g,bA?bA["name"]:'对手')["replace"](/\{league\}/g,
bz?bz["name"]:'联赛');
}function aE(){
for(var bx=aA(),by=aB(a2["age"]),bz=a2["flags"]["_cnCount"]||0x0,bA=a2["flags"]["_evCount"]||0x0,bB=bA>=0x4&&bz/bA>0.45,bC=0x0,
bD=0x0;
bD<a1["length"];
bD++)"light"===a1[bD]["tone"]&&(bC+=a2["usedEven"+'ts'][a1[bD]['id']]||0x0);
var bE=bC>=0x3||a2["banLeft"]>0x0,



bF=a1["filter"](function(bG){
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
});if(bG&&bG["pool"]){var bH={};for(var bI in bG)bH[bI]=bG[bI];var bJ=ag(bG["pool"]["slice"]());bH["options"]=bJ["slice"](0x0,(bG["rndPick"]||0x3))["concat"](bG["single"]?[bG["single"]]:[]);for(var bN=0x0;bN<a1["length"];bN++)a1[bN]===bG&&(a1[bN]=bH);return bH;}return bG;})():null;
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
bD<0x0&&a2["money"]>0x0&&(bD=Math["round"](bD*(0x1+Math["min"](0xc,a2["money"]/0x2bc)))),bD<0x0&&a6("lawyer")&&(bD=Math["round"](Math["max"](0.05,1-0.3*_stEff(_stT("lawyer")))/_stM("lawyer")*bD));
var bE=a2["money"];
a2["money"]=ac(Math["round"](a2["money"]+bD),-0x320,0x895440);
var bF=a2["money"]-bE;
bF&&by["push"]({'cls':bF>0x0?'up':"down",'text':(bF>0x0?'+':'-')+av(Math["abs"](bF))});
}if(bx["caps"]&&(a2["caps"]+=bx["caps"],by["push"]({'cls':'up','text':"国家队+"+bx["caps"]})),(bx["partner"]||bx["marry"]||bx["kid"]||bx["split"])&&(a2["life"]||(a2["life"]={'partner':null,'married':0x0,'kids':[],'splits':0x0}),
bx["partner"]&&(a2["life"]["partner"]={'label':bx["partner"],'since':a2["age"]},by["push"]({'cls':'up','text':"在一起了"})),bx["marry"]&&a2["life"]["partner"]&&(a2["life"]["married"]=a2["age"],by["push"]({'cls':'up','text':'结婚'}),b1("love_kid"+"_first")),
bx["kid"]&&(a2["life"]["kids"]["push"]({'born':a2["age"]}),by["push"]({'cls':'up','text':0x1===a2["life"]["kids"]["length"]?"当爸爸了":"又一个孩子"})),
bx["split"]&&a2["life"]["partner"]&&(a2["life"]["partner"]=null,a2["life"]["married"]=0x0,a2["life"]["splits"]++,by["push"]({'cls':"down",'text':"分开了"}))),
bx["roleDelt"+'a']&&(a2["roleAdju"+'st']+=bx["roleDelt"+'a'],by["push"]({'cls':bx["roleDelt"+'a']>0x0?'up':"down",'text':bx["roleDelt"+'a']>0x0?"队内地位↑":"队内地位↓"})),
bx["playerType"]!=null&&bx["playerType"]>=0x0&&bx["playerType"]<=0xb&&(a2["playerType"]=bx["playerType"],by["push"]({'cls':'up','text':"类型变更"})),
bx["banGames"]&&(a2["banGames"]+=bx["banGames"],by["push"]({'cls':"down",'text':"停赛 "+bx["banGames"]+'\x20场'})),bx["ban"]&&(a2["banLeft"]+=bx["ban"],
by["push"]({'cls':"down",'text':"禁赛 "+bx["ban"]+" 个赛季"})),bx["banned"]&&(a2["banned"]=!0x0,by["push"]({'cls':"down",'text':"终身禁足"})),
bx["mult"]&&function(){var m=bx["mult"],v=null,k;
for(k in m){var f=m[k];if(f==null)continue;v=v==null?f:(f>1?Math.max(v,f):Math.min(v,f));}
if(v==null)return;
var dv=Math.max(-4,Math.min(4,Math.round((v-1)*3)));
if(dv){_devAdd(a2["teamId"],dv);by.push({'cls':dv>0?'up':"down",'text':"球队实力"+(dv>0?'+':'')+dv});}
}(),bx["leave"]&&(a2["flags"]["_forceLe"+"ave"]=!0x0),bx["stagnate"]&&(a2["stagnate"]=!0x0),
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
return["ageFraud","yinyang","fixed","gambled","degree","coachCer"+'t',"academy","bianzhi","assistan"+'t',"scout","_friend","_fan","_mentor","_rival","_sponsor","_injuryChain","_vetInviteDone","_vetInviteTeam"]["forEach"](function(bI){
bx[bI]&&(a2["flags"][bI]=bx[bI]);
}),



by;
}




/* ── §4 成长曲线 ──────────────────────────────────────────────── */




function aG(bx){
var T=a0["GROWTH"],N=T["length"];
if(bx>=T[N-1]["age"])return T[N-1]['d'];
var k=0x0;
while(k<N-0x2&&bx>=T[k+0x1]["age"])k++;
var t=Math["max"](0,Math["min"](1,(bx-T[k]["age"])/(T[k+1]["age"]-T[k]["age"]))),



p=T[k]['d'],q=T[k+1]['d'];
return [p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];}




/* ── §5 球员类型系统 ────────────────────────────────────────────── */




var TYPE_MODS=[{'g':1.50,'a':0.50},{'g':0.70,'a':1.50},{'g':1.10,'a':1.10},{'g':1.15,'a':0.85},{'g':1.28,'a':0.65},{'g':1.70,'a':0.75},



{'g':0.78,'a':1.05},{'g':0.35,'a':0.65},{'g':1.15,'a':1.55},{'g':1.00,'a':1.25},{'g':0.45,'a':0.45},{'g':1.00,'a':1.00}];
function calcPlayerType(){var p=a2["pos"],



t=a2["talent"],o=a2["ovr"],a=a2["age"];
if(p==="GK")return 0xb;
if(p==="ST")return t>=1.25?0x2:(t>=1.05?(a<=0x14?0x3:0x0):(o>=35?0x0:0x4));
/* 每个非门将位置至少 3 种初始类型：
   边锋 0射手/3速度/2全能 · CAM 2全能/1组织/5影锋 · CDM 1组织/6B2B/7铁腰
   CB 9自由人/2全能/10铁卫 · 边后卫 9自由人/8边后卫/3速度 */
if(p==="RW"||p==="LW")return t>=1.25?0x0:(t>=1.05?(a<=0x16?0x3:0x0):(o>=40?0x3:0x2));
if(p==="CAM")return t>=1.25?0x2:(t>=1.15?0x1:(o>=50?0x1:0x5));
if(p==="CDM")return t>=1.25?0x1:(t>=1.15?0x6:0x7);
if(p==="CB")return t>=1.2?0x9:(t>=1.05?0x2:0xa);
return t>=1.2?0x9:(t>=1.05?0x8:(a<=0x16?0x3:0x8));}




/* ── §6 角色与能力 ──────────────────────────────────────────────── */




function aH(){var bx=ar();
return bx?aI(bx):"sub";
}function aI(bx){var by=0x30+0x7*bx["rep"],bz=a2["ovr"]-by+0x3*a2["roleAdju"+'st'];
return aq(bx)['cn']&&(bz+=0.12*(a2["guanxi"]-0x32)),



a2["age"]<=0x12&&(bz-=0x6),a2["age"]>=0x23&&(bz-=0x3),bz>=0x6?"star":bz>=0x2?"starter":bz>=-0x5?"rot":bz>=-0xc?"sub":"bench";
}function aJ(bx,



by,bz){var bA=Math["max"](0x0,bz-0x2d)/0x32,bB=by['cn']?2.6:by["rep"]>=0x4?2.4:1.5;
return Math["max"](0x3,0x140*Math["pow"](bA,2.2)*(0.9+0.55*bx["rep"])*bB);
}function aK(){var bx=al(a2["pos"])["group"];
return "att"===bx?{'goal':0.65,'ast':0.28}:"mid"===bx?{'goal':0.2,'ast':0.38}:"def"===bx?{'goal':0.09,'ast':0.14}:{'goal':0x0,
'ast':0.01};
}function aL(){
return ac((a2["ovr"]-0x48)/0x18,0x0,0x1);
}function aM(){return{'wcq':0.05+0.7*aL()};
}var aN=[{'p':[0.14,0.5],'next':"十六强"},



{'p':[0.22,0.42],'next':'八强'},{'p':[0.2,0.42],'next':'四强'},{'p':[0.25,0.38],'next':'决赛'},
{'p':[0.32,0.32],'next':'冠军'}],


aO=[{'p':[0.55,0.38],'next':"十六强"},
{'p':[0.33,0.42],'next':'八强'},{'p':[0.28,0.44],'next':'四强'},
{'p':[0.32,0.4],'next':'决赛'},


{'p':[0.38,0.34],'next':'冠军'}];




/* ── §7 赛事与德比 ──────────────────────────────────────────────── */




function aP(bx,by){
for(var bz="小组赛",bA=0x0;
bA<bx["length"];
bA++){if(bA===bx["length"]-0x1)return{'final':!0x0,'p':bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by};
if(ad()>=bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by)return{'stage':0x0===bA?"小组赛出局":'止步'+bz};
bz=bx[bA]["next"];
}return{'final':!0x0,'p':0.5};}
function groupStage(bx,



by){
var _all=[{name:bx["name"],id:bx["id"],rep:bx["rep"],ovr:bx["ovr"],isPlayer:0x1},by[0x0],by[0x1],by[0x2]];
var _m=[],



_t={};_all.forEach(function(t){_t[t['id']]={name:t["name"],pts:0x0,gf:0x0,ga:0x0,w:0x0,d:0x0,l:0x0};});
for(var i=0x0;i<_all["length"];i++){for(var j=i+0x1;j<_all["length"];j++){
var a=_all[i],b=_all[j],as=a["ovr"]?a["ovr"]:50+a["rep"]*0x5+ad()*0xa,bs=b["ovr"]?b["ovr"]:50+b["rep"]*0x5+ad()*0xa;
var _sim=_matchSim(as,bs,null,true),hg=_sim["hg"],ag=_sim["ag"];
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
if(n>=128)return['一百二十八强','六十四强','三十二强','十六强','八强','四强','决赛'];
if(n>=64)return['六十四强','三十二强','十六强','八强','四强','决赛'];
if(n>=32)return['三十二强','十六强','八强','四强','决赛'];
if(n>=16)return['十六强','八强','四强','决赛'];
if(n>=8)return['八强','四强','决赛'];
if(n>=4)return['半决赛','决赛'];
return['决赛'];
}
function _bracketSim(playerName,



teams){
var cur=[[teams[0],teams[1]]];
for(var i2=2;i2+1<teams.length;i2+=2)cur.push([teams[i2],teams[i2+1]]);
var rn=_bracketNames(teams.length);
var path=[],



rIdx=0;
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
function _playerStr(base,



ovr,rank){
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
var tm=ar(),



rep=tm?tm["rep"]:0x0;
var role=a0["ROLES"][a2["role"]]?a0["ROLES"][a2["role"]]["rank"]:0x0;
return _playerStr(0x2e+rep*0x8,a2["ovr"],role);
}
function _natFormOvr(){
var fm=a2["natForm"]||{};
var wc=fm["wc"]||0,



asia=fm["asia"]||0;
var wb=wc>=0x4?0x6:wc>=0x3?0x5:wc>=0x2?0x4:wc>=0x1?0x3:0x0;
var ab=asia>=0x3?0x4:asia>=0x2?0x3:asia>=0x1?0x2:0x0;
return Math.max(wb,ab);
}
function _natStr(){
var role=a0["ROLES"][a2["role"]]?a0["ROLES"][a2["role"]]["rank"]:0x0;
return _playerStr(0x3e,a2["ovr"],role)+_natFormOvr();
}
function _poisson(lam){
if(lam<=0)return 0x0;var L=Math["exp"](-lam),



k=0x0,p=0x1;
do{k++;p*=ad();}while(p>L);return k-0x1;
}
/* 单场比分模拟 v2（全赛事统一）：
   主队进球份额 share = home + k·sd + k2·sd·|sd|，sd=(aStr−bStr)/scale；
   总进球 2·base·gl（gl=双方联赛风格几何平均，节奏随球队带入所有赛事）；
   平局修正：净胜≤1 时按 _msPd(gl) 转平（低节奏联赛平局更多）；
   中立场地（neu）时主队份额基准为 0.5。参数由 tools/calib_fit.py 按现实拟合。 */
var _msCfg={'base':1.40,'scale':22,'k':0.40,'k2':0.16,'home':0.57,'pd':0.08};
function _glOf(a,b){return Math.sqrt((_lgStyle[a]||1)*(_lgStyle[b]||1));}
function _msPd(g){return Math.max(0,Math.min(0.25,_msCfg["pd"]+(1-g)*0.18));}
function _msShare(aStr,bStr,neu){
var sd=(aStr-bStr)/_msCfg["scale"];
var c0=neu?0.5:_msCfg["home"];
return Math.max(0.12,Math.min(0.93,c0+_msCfg["k"]*sd+_msCfg["k2"]*sd*Math["abs"](sd)));
}
/* 球员单场数据归属（全赛事统一）：从本队真实进球中分配进球/助攻，永不越过比分。
   share 按位置：前锋吃球队 ~34% 进球、中场 ~20%（助攻 20%），随 OVR 与对手强度缩放 */
function _pMatchContrib(tg,og,oppStr,ownStr,grp,boost){
var f=(0.55+0.55*(a2["ovr"]-0x32)/0x32)*(a2["ovr"]>=0x58?1.10+0.03*(a2["ovr"]-0x58):0x1)*(boost||1);if(a2["cheat"])f*=1.25;
var diff=(oppStr!=null&&ownStr!=null)?ac((oppStr-ownStr)/0x1e,-1,1):0;
var sh={'fwd':[0.34,0.12],'mid':[0.20,0.20],'def':[0.09,0.07],'gk':[0,0]}[grp]||[0.20,0.20];
var ps=ac(sh[0]*f*(1-0.25*diff),0.01,0.6);
var pa=ac(sh[1]*f*(1-0.1*diff),0.01,0.5);
var g=0,a2v=0;
for(var i=0;i<tg;i++){if(ad()<ps)g++;else if(ad()<pa)a2v++;}
return{'g':g,'a':a2v,'cs':og===0?1:0};
}
/* 国家队对手强度查询（NATS.s，带缓存） */
function _natStrOf(id){
if(!id)return null;
if(!a2["_natStrMap"]){var m={};for(var i=0;i<NATS["length"];i++)m[NATS[i]["i"]]=NATS[i]["s"];a2["_natStrMap"]=m;}
return a2["_natStrMap"][id]!=null?a2["_natStrMap"][id]:null;
}
/* 赛季数据归属：从当季全部真实比赛（联赛+国内杯赛+洲际）中抽 apps 场逐场分配。
   两回合淘汰按总比分拆成两场近似，决赛/单场按一场计；点球不计入比分。 */
function _pSeasonCollect(tid){
var ms=[],i,r,j;
if(a2["lgFx"]&&a2["lgFx"]["data"]){
var lg=aj(tid);var lgid=lg?ap(lg):null;
var fx=lgid?a2["lgFx"]["data"][lgid]:null;
if(fx)for(r=0;r<fx["length"];r++)for(j=0;j<fx[r]["length"];j++){var m=fx[r][j];if(m[0]===tid||m[1]===tid)ms.push([m[0],m[1],m[2],m[3],'lg']);}
}
if(a2["cupFx"]&&a2["cupFx"]["data"]){
for(var cn in a2["cupFx"]["data"]){var br=a2["cupFx"]["data"][cn];
if(br&&br["all"])for(r=0;r<br["all"]["length"];r++)for(j=0;j<br["all"][r]["ties"]["length"];j++){
var t=br["all"][r]["ties"][j];
if(t["hg"]!=null&&(t["h"]===tid||t["a"]===tid))ms.push([t["h"],t["a"],t["hg"],t["ag"],'cup']);
}}}
if(a2["contFx"]&&a2["contFx"]["data"]){
for(var tg in a2["contFx"]["data"]){var cd=a2["contFx"]["data"][tg];
if(cd&&cd["group"]&&cd["group"]["matches"]){
var fm=cd["group"]["matches"];
for(j=0;j+3<fm["length"];j+=4)if(fm[j]===tid||fm[j+1]===tid)ms.push([fm[j],fm[j+1],fm[j+2],fm[j+3],'cont']);
}
if(cd&&cd["rounds"])for(r=0;r<cd["rounds"]["length"];r++)for(j=0;j<cd["rounds"][r]["ties"]["length"];j++){
var t2=cd["rounds"][r]["ties"][j];
if(!(t2["h"]===tid||t2["a"]===tid))continue;
if(t2["hg"]!=null){ms.push([t2["h"],t2["a"],t2["hg"],t2["ag"],'cont']);continue;}
if(t2["sa"]==null)continue;
var isFinal=cd["rounds"][r]["name"]==='决赛';
if(isFinal)ms.push([t2["h"],t2["a"],t2["sa"],t2["sb"],'cont']);
else{var meHome=t2["h"]===tid;var my=meHome?t2["sa"]:t2["sb"],op=meHome?t2["sb"]:t2["sa"];
ms.push([t2["h"],t2["a"],Math.floor(my/2),Math.floor(op/2),'cont']);
ms.push([t2["a"],t2["h"],Math.ceil(my/2),Math.ceil(op/2),'cont']);
}
}}}
return ms;
}
function _pSeasonContrib(apps,pm){
var tid=a2["teamId"],ms=_pSeasonCollect(tid);
var n=ms["length"];if(!n)return{'g':0,'a':0,'lg':0,'lgA':0};
var idxs=[];for(var r=0;r<n;r++)idxs.push(r);
ag(idxs);
var grp=al(a2["pos"])["group"],play=Math.min(apps,n),g=0,a2v=0,lgG=0,lgA=0;
for(r=0;r<play;r++){var mm=ms[idxs[r]];
var home=mm[0]===tid,tg=home?mm[2]:mm[3],og=home?mm[3]:mm[2];
var opp=aj(home?mm[1]:mm[0]);
var ownT=aj(tid);
var c=_pMatchContrib(tg,og,opp?_teamAbs(opp):null,ownT?_teamAbs(ownT):null,grp,1);
g+=c["g"];a2v+=c["a"];
if(mm[4]==='lg'){lgG+=c["g"];lgA+=c["a"];}
}
var _mg=pm?pm["g"]:1,_ma=pm?pm["a"]:1;
return{'g':Math.round(g*_mg),'a':Math.round(a2v*_ma),'lg':Math.round(lgG*_mg),'lgA':Math.round(lgA*_ma)};
}
function _matchSim(aStr,bStr,gl,neu){
var g=gl||1;
var tot=2*_msCfg["base"]*g;
var share=_msShare(aStr,bStr,neu);
var hg=_poisson(tot*share),ag=_poisson(tot*(1-share));
if(hg!==ag&&Math.abs(hg-ag)<=1&&ad()<_msPd(g))hg=ag=Math.min(hg,ag);
return{hg:hg,ag:ag,won:hg>ag};
}
/* 加时（约 1/3 场时长的进球环境，同份额模型）；仍平则点球 */
function _etSim(aStr,bStr,gl,neu){
var g=gl||1;
var tot=0.33*2*_msCfg["base"]*g;
var share=_msShare(aStr,bStr,neu);
return{hg:_poisson(tot*share),ag:_poisson(tot*(1-share))};
}
/* 90分钟→加时→点球 的单场淘汰：hg/ag 为含加时总分，et/pk 为加时与点球比分 */
function _koSim(aStr,bStr,gl,neu){
var r=_matchSim(aStr,bStr,gl,neu);
var o={'hg':r.hg,'ag':r.ag,'et':null,'pk':null,'won':r.hg>r.ag};
if(r.hg===r.ag){
var et=_etSim(aStr,bStr,gl,neu);
o["et"]=[et.hg,et.ag];
o["hg"]+=et.hg;o["ag"]+=et.ag;
if(et.hg!==et.ag)o["won"]=et.hg>et.ag;
else{var pk=_penSim(aStr,bStr);o["pk"]=[pk.a,pk.b];o["won"]=pk.a>=pk.b;}
}
return o;
}
/* 点球统一模型：单脚命中率由双方实力差决定，基准按现实点球大战命中率(~0.72)，
   强弱差影响刻意压小（点球是高方差项目，弱队不应被碾压）；_penSim 与互动大场面共用本函数 */
function _penProb(aStr,bStr){
var sd=(aStr-bStr)/0x78;
return[Math["max"](0.62,Math["min"](0.84,0.72+sd*0.1)),Math["max"](0.62,Math["min"](0.84,0.72-sd*0.1))];
}
function _penSim(aStr,bStr){
aStr=aStr||0x32;bStr=bStr||0x32;
var pr=_penProb(aStr,bStr),pa=pr[0x0],pb=pr[0x1];
var a=0,



b=0,rn=5;
for(var i=0;i<rn;i++){if(ad()<pa)a++;if(ad()<pb)b++;}
var guard=0;
while(a===b&&guard++<0x14){if(ad()<pa)a++;if(ad()<pb)b++;}
return{a:a,b:b};
}
function _natPool(comp,



playerId){
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
var sim=_matchSim(as,bs,null,true),hg=sim.hg,ag=sim.ag;
matches.push({home:tA.n,away:tB.n,homeId:tA.i,awayId:tB.i,hg:hg,ag:ag});
var A=byId[tA.i],B=byId[tB.i];
A.gf+=hg;A.ga+=ag;B.gf+=ag;B.ga+=hg;
if(hg>ag){A.w++;A.pts+=3;B.l++;}else if(ag>hg){B.w++;B.pts+=3;A.l++;}else{A.d++;B.d++;A.pts++;B.pts++;}
}
var arr=[];for(var k in byId)arr.push(byId[k]);
arr.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;return(y.gf-y.ga)-(x.gf-x.ga);});
return{standings:arr,matches:matches};
}
function _natDraw(teams,



playerId){
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
function _natStage(ko,



playerName,grpPos){
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
function _natFinalScore(t,



playerName,bN,bO,bS){
if(t&&t["rounds"]&&t["rounds"]["length"]){
var fin=t["rounds"][t["rounds"]["length"]-0x1]["matches"];
if(fin&&fin["length"]){var m=fin[0x0];
if(m["home"]===playerName){m["hg"]=bN;m["ag"]=bO;if(bS)m["pens"]=[bS[0x0],bS[0x1]];else delete m["pens"];}else{m["ag"]=bN;m["hg"]=bO;if(bS)m["pens"]=[bS[0x1],bS[0x0]];else delete m["pens"];}
}
}
}
function _finalOpp(rounds,



playerName){
if(rounds&&rounds["length"]){
var fin=rounds[rounds["length"]-0x1]["matches"];
if(fin&&fin["length"]){var m=fin[0x0];return m["home"]===playerName?m["away"]:m["home"];}
}
return'';
}
function _natFormVal(stage,



comp){
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
function _natPath(rounds,



playerName){
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
function _qualStandings(teams,



matches){
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
function _runFriendlies(_fmin,_fmax){
var _ft={i:'n_chn',n:'\u4e2d\u56fd',s:60,ovr:_natStr()};
var _pool=[];
for(var _fi=0;_fi<NATS["length"];_fi++){
var _f=NATS[_fi];
if(_f["i"]!=='n_chn'&&_f["c"]!=='UEFA'&&_f["c"]!=='CONMEBOL'&&(_f["s"]||0)>=0x2d)_pool["push"](_f);
}
for(var _fj=_pool["length"]-1;_fj>0;_fj--){var _fk=Math["floor"](ad()*(_fj+1));var _ft2=_pool[_fj];_pool[_fj]=_pool[_fk];_pool[_fk]=_ft2;}
var _fn=Math["min"](_pool["length"],ae(_fmin||0x2,_fmax||0x4));
var _ms=[],



_w=0,_d=0,_l=0,_gf=0,_ga=0;
for(var _fm=0;_fm<_fn;_fm++){
var _o=_pool[_fm];
var _sa=_ft["ovr"]||_ft["s"],_sb=_o["s"]||_o["ovr"]||0x32;
var _sim=_matchSim(_sa,_sb),_hg=_sim["hg"],_ag=_sim["ag"];
_ms["push"]({home:_ft["n"],away:_o["n"],homeId:'n_chn',awayId:_o["i"],hg:_hg,ag:_ag});
_gf+=_hg;_ga+=_ag;
if(_hg>_ag)_w++;else if(_hg<_ag)_l++;else _d++;
}
return {matches:_ms,w:_w,d:_d,l:_l,gf:_gf,ga:_ga};
}
/* 从资格赛/正赛小组赛里挑出中国队的真实场次（hid/aid 或 homeId/awayId） */
function _chnGroup(ms){
var out=[];if(!ms)return out;
for(var i=0x0;i<ms["length"];i++){var m=ms[i],h=m["hid"]||m["homeId"],a=m["aid"]||m["awayId"];
if(h==='n_chn'||a==='n_chn')out["push"](m);}
return out;
}
/* 从淘汰赛 rounds 里挑出中国队的真实场次（含十六强→决赛，出局后不再计入） */
function _chnRounds(rounds){
var out=[];if(!rounds)return out;
for(var r=0x0;r<rounds["length"];r++){var ms=rounds[r]["matches"]||[];
for(var j=0x0;j<ms["length"];j++){var m=ms[j];if(m["homeId"]==='n_chn'||m["awayId"]==='n_chn')out["push"](m);}}
return out;
}
/* 中立国家队赛事：不依赖中国队参赛，世界杯/亚洲杯/欧洲杯/美洲杯按四年周期真实模拟（世界面板可回看） */
var _natFxNames={'wc':'世界杯','asia':'亚洲杯','euro':'欧洲杯','copa':'美洲杯'};
function _natNeutralTeams(tag,exChn){
var list;
if(tag==='wc'){var _pw=_natPool('wc',null);if(exChn)_pw=_pw.filter(function(t){return t.i!=='n_chn';});return _pw.map(function(t){return{'i':t.i,'n':t.n,'c':t.c,'s':t.s,'ovr':t.s};});}
if(tag==='euro')list=NATS.filter(function(t){return t["c"]==='UEFA';});
else if(tag==='copa')list=NATS.filter(function(t){return t["c"]==='CONMEBOL'||t["c"]==='CONCACAF';});
else list=NATS.filter(function(t){return t["c"]==='AFC'&&t["i"]!=='n_chn';});
return list.slice().sort(function(a,b){return b.s-a.s;}).slice(0,16).map(function(t){return{'i':t.i,'n':t.n,'c':t.c,'s':t.s,'ovr':t.s};});
}
function _runNatNeutral(tag,exChn){
var teams=_natNeutralTeams(tag,exChn);
if(teams.length<8)return null;
var draw=_natDraw(teams,null);
var groups=[];
for(var g=0;g<draw.nGroups;g++)groups.push({sim:_simGroup4(draw.groups[g])});
var ko=knockoutStage(_natBracket(groups));
var _finM=ko.rounds.length?ko.rounds[ko.rounds.length-1].matches[0]:null;
var _champ=_finM?((_finM.pens&&_finM.pens.length>=2)?(_finM.pens[0]>=_finM.pens[1]?_finM.homeId:_finM.awayId):(_finM.hg>=_finM.ag?_finM.homeId:_finM.awayId)):null;
return{'name':_natFxNames[tag],'raw':1,'champion':_champ,'rounds':ko.rounds,
'groups':groups.map(function(g2,gi){return{'name':'第'+(gi+1)+'组','standings':g2.sim.standings,'matches':_flatMs(g2.sim.matches)};})};
}
/* natFx 每季推进：归档上一届→重置→按"当前季序"决定本季模拟哪项大赛。
   四大赛周期计数器必须跨阶段连续：age 在青训每岁与职业每季各 +1（1:1），
   故以 age 为唯一计数器；青训/职业共用同一公式，转职业不再"重新开始计数"。 */
function _natChinaWorld(comp){
/* AI 中国队正常走预选赛：出线 → 正赛签表含中国（结构同玩家参赛版）；
   未出线 → 退化为"正赛无中国"的中立签表（中国队缺席=预选赛出局） */
var _pt={i:'n_chn',n:'\u4e2d\u56fd',s:0x3e,ovr:0x3e};
var _q=_runNatQual(comp,_pt);
if(!_q.qualified)return _runNatNeutral(comp,!0x0);
var _c=_runNatComp(comp,_pt);
return{'name':_natFxNames[comp],'raw':1,'rounds':_c["rounds"],
'groups':(_c["allGroups"]||[]).map(function(st,gi){return{'name':'第'+(gi+1)+'组','standings':st};})};
}
function _natYr(){return((a2["age"]-100)%4+4)%4;}
function _natTick(_natTourn,_cnElim,_forceChamp){
_fxArch("natFxArch",a2["natFx"]);
a2["natFx"]={'season':_fxSeasonLab(),'data':{}};
var _nyr=_natYr();
var _natTgt=_nyr===0x1?'wc':_nyr===0x3?'asia':_nyr===0x0?'euro':'copa';
if(_forceChamp&&_forceChamp===_natTgt){
/* 作弊直接夺冠：世界面板也要与世界纪录一致，中国队即冠军 */
a2["natFx"]["data"][_natTgt]={'name':_natFxNames[_natTgt],'raw':1,'champion':'n_chn','rounds':[],'groups':[]};
}else if((_natTgt==='wc'||_natTgt==='asia')&&_natTourn){
/* 玩家参赛版：rounds 直接引用球员真实赛事对象——决赛大场面改分能实时回填到世界面板 */
var _ngrps=(_natTourn["allGroups"]||[]).map(function(st,gi){return{'name':'第'+(gi+1)+'组','standings':st};});
a2["natFx"]["data"][_natTgt]={'name':_natFxNames[_natTgt],'raw':1,'rounds':_natTourn["rounds"],'groups':_ngrps};
}else if(_natTgt==='wc'||_natTgt==='asia'){
/* 亚洲球队赛事：中国队像现实世界一样走"预选赛→正赛"，不因玩家缺席而被跳过。
   1) _cnElim —— 本季玩家在队、预选赛判定出局：正赛签表不含中国（与玩家战绩一致）；
   2) 玩家不在队/未征召：中国队由 AI 打预选赛，出线则进正赛签表，未出线则正赛无中国；
   3) 玩家在队且出线：走上面 _natTourn 玩家版，世界=玩家结果。 */
var _nres=_cnElim?_runNatNeutral(_natTgt,!0x0):_natChinaWorld(_natTgt);
if(_nres)a2["natFx"]["data"][_natTgt]=_nres;
}else{
/* 中立版：欧洲杯/美洲杯中国队本就不会参加，直接中立模拟 */
var _nres2=_runNatNeutral(_natTgt,!0x1);
if(_nres2)a2["natFx"]["data"][_natTgt]=_nres2;
}
}


function _runNatQual(comp,



playerTeam){
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
var _pgIds={};for(var qi=0;qi<qallGroups[pgIdx]["length"];qi++)_pgIds[qallGroups[pgIdx][qi]["i"]]=0x1;
var _pgMatches=qmatches["filter"](function(m){return _pgIds[m["hid"]]&&_pgIds[m["aid"]];});
return{comp:comp==='wc'?"\u4e16\u9884\u8d5b":"\u4e9a\u9884\u8d5b",stage:stage,age:a2["age"],playerPos:pgPos,
matches:_pgMatches,standings:pgSt,groups:qallGroups["map"](function(g){return _qualStandings(g,qmatches);}),
qualified:qualified,playerGroup:pgIdx};
}
function _runNatComp(comp,



playerTeam){
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
/* 淘汰赛全程模拟：无论东道主(玩家)小组是否出线，世界面板都需要完整签表 */
var ko=knockoutStage(_natBracket(groups));
var stage=_natStage(ko,playerTeam.n,ppos);
return{comp:comp==='wc'?"世界杯":"亚洲杯",stage:stage,age:a2["age"],playerPos:ppos,
matches:groups[pg].sim.matches,standings:groups[pg].sim.standings,
rounds:ko?ko.rounds:[],path:ko?_natPath(ko.rounds,playerTeam.n):[],playerGroup:pg,
allGroups:groups.map(function(x){return x.sim.standings;})};
}
function knockoutStage(bx){
var _r=[],



_rn=["十六强","八强","四强","决赛"],_ri=0x0,_cur=bx;
while(_cur["length"]>0x0){
var _m=[],_w=[];
for(var i=0x0;i<_cur["length"];i++){
var a=_cur[i][0x0],b=_cur[i][0x1];
var as=a["ovr"]?a["ovr"]:50+(a["rep"]||0x3)*0x5+ad()*0xa,bs=b["ovr"]?b["ovr"]:50+(b["rep"]||0x3)*0x5+ad()*0xa;
/* 淘汰赛中立场：90分钟平→加时→点球 */
var _ko=_koSim(as,bs,null,true);
var _hg=_ko["hg"],_ag=_ko["ag"];
_m["push"]({home:a["name"],away:b["name"],homeId:a["id"],awayId:b["id"],hg:_hg,ag:_ag,pens:_ko["pk"],et:_ko["et"]});
_w["push"](_ko["won"]?a:b);
}
_r["push"]({name:_cur["length"]===8?"十六强":_cur["length"]===4?"八强":_cur["length"]===2?"四强":"决赛",matches:_m});
_cur=[];
if(_w["length"]>0x1){for(var j=0x0;j<_w["length"];j+=0x2){if(j+0x1<_w["length"])_cur["push"]([_w[j],_w[j+0x1]]);}}
_ri++;
}
var _fin=_r["length"]>0x0?_r[_r["length"]-0x1]["matches"][0x0]:null;
return{rounds:_r,champion:_fin?((_fin["pens"]&&_fin["pens"]["length"]>=2)?(_fin["pens"][0x0]>=_fin["pens"][0x1]?_fin["home"]:_fin["away"]):(_fin["hg"]>=_fin["ag"]?_fin["home"]:_fin["away"])):null};
}
var aQ={'预选赛出局':0x0,



'小组赛出局':0x1,'止步十六强':0x2,'止步八强':0x3,'止步四强':0x4,'亚军':0x5,'冠军':0x6},aR={'wc':{'icon':'🏆','side':"中国队"},'asia':{'icon':'🏅',
'side':"中国队"},



'cont':{'icon':'⭐','side':null},'promo':{'icon':'🏟','side':null},'drop':{'icon':'🚨','side':null},'derby':{'icon':'🔥','side':null},
/* 国字号梯队（U系列）：与 wc/asia 共用大场面交互管线，记账走 _yCaps */
'u13':{'icon':'⚽','side':"中国U13"},'u15':{'icon':'⚽','side':"中国U15"},'u17':{'icon':'🏅','side':"中国U17"},'u19':{'icon':'🥇','side':"中国U19"},'u23':{'icon':'🏟','side':"中国U23"}},



aS={'欧冠':'eu','中北美冠':'eu',
'欧联':'eu','亚冠':'as','欧协联':'eu','解放者杯':'sa'};
var _dby={'rma':[['bar','国家德比'],['atm','马德里德比']],'bar':[['rma','国家德比']],'atm':[['rma','马德里德比']],



'mci':[['mun','曼市德比']],'mun':[['mci','曼市德比'],['liv','双红会']],'liv':[['mun','双红会'],['eve','默西塞德德比']],'eve':[['liv','默西塞德德比']],


'ars':[['tot','北伦敦德比'],['che','伦敦德比']],
'tot':[['ars','北伦敦德比']],'che':[['ars','伦敦德比'],['tot','伦敦德比']],'ful':[['che','西伦敦德比']],

'qpr':[['ful','西伦敦德比'],['che','伦敦德比']],

'int':[['acm','米兰德比'],['juv','意大利国家德比']],'acm':[['int','米兰德比']],'juv':[['int','意大利国家德比'],['tor','都灵德比']],

'tor':[['juv','都灵德比']],
'nap':[['rom','阳光德比']],'rom':[['nap','阳光德比'],['laz','罗马德比']],'laz':[['rom','罗马德比']],

'fio':[],
'bol':[],
'bay':[['bvb','德国国家德比'],['aug','巴伐利亚德比']],'bvb':[['bay','德国国家德比'],['s04','鲁尔区德比']],

's04':[['bvb','鲁尔区德比'],['bmg','莱茵德比']],
'bmg':[['s04','莱茵德比']],'lev':[['bmg','莱茵德比']],'aug':[['bay','巴伐利亚德比']],'koe':[['bmg','莱茵德比']],


'psg':[['mar','法国国家德比']],'mar':[['psg','法国国家德比']],
'nic':[['mon','蔚蓝海岸德比']],'mon':[['nic','蔚蓝海岸德比']],
'psv':[['fey','荷兰德比'],['aja','荷兰德比']],

'fey':[['psv','荷兰德比'],['aja','荷兰国家德比']],
'aja':[['fey','荷兰国家德比'],['psv','荷兰德比']],'utr':[['aja','荷兰德比']],
'por':[['spo','葡萄牙国家德比'],['ben','葡萄牙德比']],

'spo':[['por','葡萄牙国家德比'],['ben','里斯本德比']],
'ben':[['por','葡萄牙德比'],['spo','里斯本德比']],'bra':[['por','葡萄牙德比']],
'ath':[['rso','巴斯克德比']],

'rso':[['ath','巴斯克德比']],
'gen':[['sam','热那亚德比']],
'sam':[['gen','热那亚德比']],
'hsv':[['pau','汉堡德比']],'pau':[['hsv','汉堡德比']],

'cn-sh':[['cn-shh','上海德比'],['cn-bj','京沪大战']],
'cn-shh':[['cn-sh','上海德比']],
'cn-bj':[['cn-sh','京沪大战'],['cn-sd','京津德比']],'cn-sd':[['cn-bj','京津德比'],['cn-sh','京沪大战']],

'hil':[['nsr2','利雅得德比']],
'nsr2':[['hil','利雅得德比']],
'ahl':[['ahl2','吉达德比']],'ahl2':[['ahl','吉达德比']],
'jbh':[['suw','现代德比']],
'suw':[['jbh','现代德比']],'ulh':[['jbh','韩国德比'],['suw','韩国德比']],


'gmb':[['cre','大阪德比'],['kob','关西德比']],'cre':[['gmb','大阪德比']],
'kaw':[['yok','神奈川德比']],'yok':[['kaw','神奈川德比']],'urw':[['kob','关西德比']],

'kob':[['urw','关西德比'],['gmb','关西德比']],
'sun':[['new','泰恩威尔德比']],
'new':[['sun','泰恩威尔德比']],'lee':[['shu','约克郡德比']],'shu':[['lee','约克郡德比']],

'sto':[['wba','西米德兰德比']],'wba':[['sto','西米德兰德比'],['avl','西米德兰德比']],
'nfo':[['lct','东米德兰德比']],'lct':[['nfo','东米德兰德比']],

'nor':[['ips','东盎格利亚德比']],'ips':[['nor','东盎格利亚德比']],

'nyc':[['nyr','纽约德比']],'nyr':[['nyc','纽约德比']],'lag':[['lfc','洛杉矶德比']],

'lfc':[['lag','洛杉矶德比']],
'ptl':[['sea','卡斯卡迪亚德比']],
'sea':[['ptl','卡斯卡迪亚德比']],
'clb':[['and','比利时国家德比']],'and':[['clb','比利时国家德比']],

'gnk':[['and','比利时德比']],
'boc':[['riv','超级德比']],'riv':[['boc','超级德比']],
'rac1':[['ind','阿维拉内达德比']],'ind':[['rac1','阿维拉内达德比']],
'fla':[['flu','Fla-Flu德比']],'flu':[['fla','Fla-Flu德比']],
'kra':[['wkr','克拉科夫德比']],'wkr':[['kra','克拉科夫德比']],
'legia':[['lech','波兰德比']],'lech':[['legia','波兰德比']],
/* 土超 */
'gala':[['fene','洲际德比'],['bjk','伊斯坦布尔德比']],
'fene':[['gala','洲际德比'],['bjk','伊斯坦布尔德比']],
'bjk':[['gala','伊斯坦布尔德比'],['fene','伊斯坦布尔德比']],
'trab':[['rize','黑海德比']],'rize':[['trab','黑海德比']],
/* 墨超 */
'amr':[['chs','墨西哥国家德比'],['crz','墨西哥城德比']],
'chs':[['amr','墨西哥国家德比'],['ats','瓜达拉哈拉德比']],
'crz':[['amr','墨西哥城德比']],'ats':[['chs','瓜达拉哈拉德比']],
'mty':[['tgr','蒙特雷德比']],'tgr':[['mty','蒙特雷德比']],
/* 西甲补充 */
'sev':[['bet','塞维利亚德比']],'bet':[['sev','塞维利亚德比']],
'dep':[['cel','加利西亚德比']],'cel':[['dep','加利西亚德比']],
/* 西乙 */
'alme':[['mlg','安达卢西亚德比']],'mlg':[['alme','安达卢西亚德比']],
/* 法甲/法乙 */
'psg':[['mar','法国国家德比'],['parfc','巴黎德比']],'parfc':[['psg','巴黎德比']],
'lyo':[['set','罗讷德比']],'set':[['lyo','罗讷德比']],
'len':[['lil','北部德比']],'lil':[['len','北部德比']],
'ren':[['nts','布列塔尼德比']],
'nts':[['ren','布列塔尼德比'],['gui','布列塔尼德比']],'gui':[['nts','布列塔尼德比']],
'met':[['nancy','洛林德比']],'nancy':[['met','洛林德比']],
/* 澳超 */
'syd':[['wsw','悉尼德比']],'wsw':[['syd','悉尼德比']],
'melc':[['melv','墨尔本德比']],'melv':[['melc','墨尔本德比']],
'auck':[['wel','新西兰德比']],'wel':[['auck','新西兰德比']],
/* K联赛 */
'suw':[['jbh','现代德比'],['seo','水原首尔德比']],'seo':[['suw','水原首尔德比']],
'ulh':[['jbh','韩国德比'],['suw','韩国德比'],['poh','东海岸德比']],'poh':[['ulh','东海岸德比']],
/* J1 */
'kaw':[['yok','神奈川德比'],['fct','多摩川德比']],
'fct':[['verdy','东京德比'],['kaw','多摩川德比']],'verdy':[['fct','东京德比']],
/* 英冠/英超 */
'sou':[['portsmouth','南海岸德比']],'portsmouth':[['sou','南海岸德比']],
'bla':[['bolto','兰开夏德比']],'bolto':[['bla','兰开夏德比']],
'mun':[['mci','曼市德比'],['liv','双红会'],['lee','玫瑰德比']],
'lee':[['shu','约克郡德比'],['mun','玫瑰德比']],
'birmingham':[['avl','伯明翰德比'],['cov','西米德兰德比']],'cov':[['birmingham','西米德兰德比']],
'avl':[['wba','西米德兰德比'],['birmingham','伯明翰德比']],
/* 德甲补充 */
'hsv':[['pau','汉堡德比'],['svw','北方德比']],'svw':[['hsv','北方德比']],
'her':[['fcu','柏林德比']],'fcu':[['her','柏林德比']],
/* 中超补充 */
'cn-sd':[['cn-bj','京津德比'],['cn-sh','京沪大战'],['cn-qdh','齐鲁德比'],['cn-qdw','齐鲁德比']],
'cn-qdh':[['cn-sd','齐鲁德比']],'cn-qdw':[['cn-sd','齐鲁德比']],
/* 阿根廷补充 */
'newo':[['roc','罗萨里奥德比']],'roc':[['newo','罗萨里奥德比']],
'est':[['gimn','拉普拉塔德比']],'gimn':[['est','拉普拉塔德比']],
/* 巴西补充 */
'gre':[['inte','格雷纳尔德比']],'inte':[['gre','格雷纳尔德比']],
'cori':[['palm','圣保罗德比']],'palm':[['cori','圣保罗德比']],
'atmi':[['cru','米内罗德比']],'cru':[['atmi','米内罗德比']],
/* MLS */
'trt':[['mtl','加拿大德比']],'mtl':[['trt','加拿大德比']],
'hou':[['dal','德州德比']],'dal':[['hou','德州德比']]
},

_dbn={'rma':'国家德比',
'bar':'国家德比','atm':'马德里德比','mci':'曼市德比','mun':'曼市德比','liv':'西北德比','eve':'西北德比',

'ars':'北伦敦德比','tot':'北伦敦德比','che':'伦敦德比',
'ful':'西伦敦德比','qpr':'西伦敦德比',
'int':'米兰德比','acm':'米兰德比','juv':'意大利国家德比','tor':'都灵德比',

'nap':'那不勒斯德比','rom':'罗马德比','laz':'罗马德比',
'ata':'亚特兰大德比','fio':'托斯卡纳德比','bol':'托斯卡纳德比',
'bay':'德国国家德比','bvb':'国家德比','s04':'鲁尔区德比',

'bmg':'莱茵德比','lev':'莱茵德比','aug':'巴伐利亚德比',
'koe':'莱茵德比',
'psg':'法国国家德比','mar':'法国国家德比','nic':'蔚蓝海岸德比','mon':'蔚蓝海岸德比',
'psv':'荷兰国家德比',

'fey':'荷兰国家德比','aja':'荷兰德比','utr':'荷兰德比',

'por':'葡萄牙国家德比','spo':'葡萄牙国家德比','ben':'葡萄牙德比','bra':'葡萄牙德比',
'ath':'巴斯克德比','rso':'巴斯克德比',

'gen':'热那亚德比','sam':'热那亚德比','hsv':'汉堡德比',
'pau':'汉堡德比',
'cn-sh':'上海德比','cn-shh':'上海德比','cn-bj':'京沪大战','cn-sd':'京津德比',
'hil':'利雅得德比',

'nsr2':'利雅得德比','ahl':'吉达德比','ahl2':'吉达德比',
'jbh':'现代德比','suw':'现代德比','ulh':'韩国德比',
'gmb':'大阪德比','cre':'大阪德比','kaw':'神奈川德比','yok':'神奈川德比',

'urw':'关西德比','kob':'关西德比',

'sun':'泰恩威尔德比','new':'泰恩威尔德比','lee':'约克郡德比','shu':'约克郡德比','sto':'西米德兰德比','wba':'西米德兰德比','avl':'西米德兰德比',

'nfo':'东米德兰德比','lct':'东米德兰德比',
'nor':'东盎格利亚德比','ips':'东盎格利亚德比',
'nyc':'纽约德比','nyr':'纽约德比','lag':'洛杉矶德比','lfc':'洛杉矶德比','ptl':'卡斯卡迪亚德比',

'sea':'卡斯卡迪亚德比',
'clb':'比利时德比',
 'and':'比利时德比','gnk':'比利时德比',
/* 新联赛德比：阿根廷/巴西/波兰 */
'boc':'超级德比','riv':'超级德比',
'rac1':'阿维拉内达德比','ind':'阿维拉内达德比',
'fla':'Fla-Flu德比','flu':'Fla-Flu德比',
'kra':'克拉科夫德比','wkr':'克拉科夫德比',
'legia':'波兰德比','lech':'波兰德比',
/* 土超 */
'gala':'伊斯坦布尔德比','fene':'伊斯坦布尔德比','bjk':'伊斯坦布尔德比','trab':'黑海德比',
/* 墨超 */
'amr':'国家德比','chs':'国家德比','crz':'墨西哥城德比','pms':'墨西哥城德比','mty':'蒙特雷德比','tgr':'蒙特雷德比',
/* 西乙 */
'mlg':'加利西亚德比','dep':'加利西亚德比','lev2':'巴伦西亚德比','elc':'巴伦西亚德比','cas2':'巴伦西亚德比',
'alme':'安达卢西亚德比','cor':'安达卢西亚德比','leg':'马德里德比','mir':'马德里德比',
/* 法甲 */
'lyo':'法国德比','len':'奥弗涅德比','parfc':'巴黎德比',
/* 法乙 */
'set':'东部德比','met':'东部德比','rei':'东北德比','nancy':'东北德比',
'gui':'布列塔尼德比','nts':'布列塔尼德比','mpl':'奥弗涅德比','cle':'奥弗涅德比','dij':'东部德比','g38':'东部德比',
/* 澳超 */
'syd':'悉尼德比','wsw':'悉尼德比','melc':'墨尔本德比','melv':'墨尔本德比','auck':'跨塔斯曼德比','wel':'跨塔斯曼德比',
/* K联赛 */
'seo':'首尔德比','suw':'首尔德比','poh':'东部德比',
/* J1 */
'fct':'东京德比','verdy':'东京德比','ksm':'关东德比','ngy':'东海德比',
/* 比甲 */
'stl':'列日-根特德比','gnt':'列日-根特德比','ant':'安特卫普德比',
/* 英冠 */
'sou':'南海岸德比','portsmouth':'南海岸德比','bla':'兰开夏德比','bolto':'兰开夏德比','cov':'西米德兰德比',
/* 加超 */
'frg':'艾伯塔德比','cvl':'艾伯塔德比',
/* 中甲 */
'cn-mz':'华南德比','gxhc':'华南德比','dlkc':'北方德比','sxcu':'北方德比'};
function aT(bx){
return bx&&aS[bx["cont"]]||null;
}function aU(bx,


by,bz){
if('wc'===bx)return af(['巴西','法国',"阿根廷",'德国',"西班牙","英格兰"]);
if("asia"===bx)return af(['日本','韩国','伊朗','沙特',"澳大利亚","卡塔尔","伊拉克","乌兹别克斯坦","阿联酋"]);
var bA=aT(bz);
function bB(bD){
return "cont"===bx?aT(aq(bD))===bA:ap(bD)===ap(by);
}var bC=a0["TEAMS"]["filter"](function(bD){
return bD['id']!==(by&&by['id'])&&bD["rep"]>=(by?by["rep"]-0x1:0x3)&&bB(bD);
});
return bC["length"]||(bC=a0["TEAMS"]["filter"](function(bD){return bD['id']!==(by&&by['id'])&&bB(bD);
})),



bC["length"]?af(bC)["name"]:'对手';
}function _aVMk(bx,by,bz){
"promo"!==bx&&"drop"!==bx||(a2["bigStage"+'d']=(a2["bigStage"+'d']||0x0)+0x1);
var bA=ar(),



bB=as();
var _bq={'kind':bx,'p':by,'recIdx':a2["seasons"]["length"],'age':a2["age"],'comp':bz&&bz["comp"]||'','team':bA?bA["name"]:'','opp':bz&&bz["opp"]||aU(bx,bA,bB),'teamId':bA?bA['id']:null};if(bz)for(var _bk in bz)_bq[_bk]=bz[_bk];_bq["teamId"]=bA?bA['id']:null;return _bq;}
function aV(bx,by,bz){
if(a2["bigQ"]&&a2["bigQ"]["length"])return!0x1;
return a2["bigQ"]=[_aVMk(bx,by,bz)],




!0x0;
}/* 大场面赛季优先级：世界杯 > 洲际(俱乐部/国家队/U23) > 升降级 > 德比；同级随机。
   队列被占时低优先级在队者立即 AI 结算让位（_aiCtx），同级 50% 随机让位 */
var _bmTier={'wc':0x4,'cont':0x3,'asia':0x3,'u23':0x3,'promo':0x2,'drop':0x2,'derby':0x1};
function _aVPri(bx,by,bz){
if(!(a2["bigQ"]&&a2["bigQ"]["length"]))return aV(bx,by,bz);
var cur=a2["bigQ"][0x0],ct=_bmTier[cur["kind"]]||0x0,nt=_bmTier[bx]||0x0;
if(!cur["_aiCtx"]||nt<ct)return!0x1;
if(nt===ct&&ad()>=0.5)return!0x1;
_bmAiSettle(cur);
a2["bigQ"]=[];
return aV(bx,by,bz);
}
function _bmAiSettle(bx){
var c=bx&&bx["_aiCtx"];
if(!c)return;
var _bz2=a2["_curBz"]||a2["seasons"][bx["recIdx"]]||null;
if(c["t"]==='nat'){_bz2&&aZ(_bz2,c["comp"],c["stage"]);}
else if(c["t"]==='cont')_contAiSettle(bx);
else if(c["t"]==='promo'){
var wC=_poOne(c["f1"],c["f2"],!0x0);
_moveTeam(wC["i"],c["to2"],!0x0,0x2);
_bz2&&a2["teamId"]===wC["i"]&&(_bz2["move"]='升上'+ak(c["to2"])["name"]);
}else if(c["t"]==='bm'){
var _rows=a2["lgTables"]&&a2["lgTables"][c["lg"]],_ri,_meR=null,_opR=null;
if(_rows){for(_ri=0;_ri<_rows["length"];_ri++){if(_rows[_ri]["i"]===bx["teamId"])_meR=_rows[_ri];if(_rows[_ri]["i"]===bx["oppId"])_opR=_rows[_ri];}
if(_meR&&_opR){var _fd2=a2["lgFx"]&&a2["lgFx"]["data"][c["lg"]];
_tblAddmatch(_meR,c["hg"],c["ag"],c["meHome"]);_tblAddmatch(_opR,c["hg"],c["ag"],!c["meHome"]);
if(_fd2){_fd2[c["r"]][c["m"]][2]=c["meHome"]?c["hg"]:c["ag"];_fd2[c["r"]][c["m"]][3]=c["meHome"]?c["ag"]:c["hg"];}
_tblResort(c["lg"]);}}
}
}
/* 被让位的洲际决赛按 AI 模拟结算（数据都在 state：_contRun + contFx） */
function _contAiSettle(bx){
var c=bx["_aiCtx"],_cr=a2["_contRun"],_fd=a2["contFx"]&&a2["contFx"]["data"][c["tag"]];
if(!_cr||!_fd)return;
var ko=_koSim(bx["_meS"]||0x46,bx["oppStr"]||0x46,0x0,!0x0),meW=ko["won"];
var _lr=_cr["rounds"][_cr["rounds"]["length"]-0x1],_tie=_fd["rounds"][_fd["rounds"]["length"]-0x1]["ties"][0x0];
_tie["sa"]=ko["hg"];_tie["sb"]=ko["ag"];_tie["p"]=ko["pk"]||null;_tie["w"]=meW?a2["teamId"]:bx["oppId"];
_fd["champion"]=_tie["w"];
_lr["won"]=meW;_lr["score"]=ko["hg"]+'-'+ko["ag"]+(ko["pk"]?' (点球 '+ko["pk"][0x0]+'-'+ko["pk"][0x1]+')':'');
_cr["result"]=meW?'冠军':'止步决赛';
a2["cupRuns"]["push"](_cr);delete a2["_contRun"];
a2["contHist"]=a2["contHist"]||[];
a2["contHist"]["push"]({'age':a2["age"],'comp':c["tag"],'tid':_tie["w"]});
_devAdd(_tie["w"],1.5,0x1);
}
/* 德比类型：n=国家级/跨城经典，c=同城，r=同区域（决定 intro 与终场文案语境） */
var _dbyCity=['上海德比','马德里德比','米兰德比','都灵德比','罗马德比','热那亚德比','伦敦德比','北伦敦德比','西伦敦德比','曼市德比','默西塞德德比','伯明翰德比','里斯本德比','大阪德比','汉堡德比','利雅得德比','吉达德比','纽约德比','洛杉矶德比'];
function _dbyType(label){
  var s=String(label||'');
  if(s["indexOf"]('国家')>=0x0||s==='京沪大战')return'n';
  return _dbyCity["indexOf"](s)>=0x0?'c':'r';
}
function _bmOppStr(bx){
  if(bx["oppStr"])return bx["oppStr"];
  var tm=bx["teamId"]?ar():null;
  if(bx["kind"]==="wc"||bx["kind"]==="asia")return 0x3c+(bx["kind"]==="wc"?0x10:0x8);
  return tm?tm["rep"]*0x8+0x2e:0x46;
}
function _bmEvents(bx){
  var k=bx["kind"],



g=al(a2["pos"])["group"]||"att",t=bx["t"]||0x0;
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
  /* 青年赛专属事件池：替换成年场通用事件（VAR/补水等成年语境不适用），含递进 flag 事件 */
  if(_yKind(k))common=_yBmCommon(bx,m);
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
  /* 参与标记：goalMe=你进球，assistMe=你助攻（供文案分层与真实数据折算） */
  for(var _gmk=0x0;_gmk<goalMe["length"];_gmk++)goalMe[_gmk][0x4]="meG";
  var assistMe=("gk"===g)?[]:("att"===g?[
    [m(0x1,0xf)+"，你回撤做球，一脚直塞撕开防线，队友跟进推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区内巧妙横敲，队友迎球怒射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你下底传中，队友抢点头球破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区前沿做墙配合，队友抽射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你连续过人后倒三角回传，跟进推射得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你前场断球后冷静分球，队友单刀推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你脚后跟妙传撕开防线，队友凌空抽射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路突破后低平球传中，队友包抄破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你做了一个假动作晃开角度，回做给队友远射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你头球摆渡到禁区中央，队友凌空垫射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区前沿假射真传，队友反越位成功推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你角球精确找到队友，头球攻门得手！",null,0x1,null,"meA"]
  ]:"def"===g?[
    [m(0x1,0xf)+"，你后场送出精准长传，队友停球转身抽射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你抢断后一脚直塞打穿防线，队友单刀推射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路助攻传中，队友抢点头球破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你定位球开到禁区，队友混战中捅射得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你后场大脚解围变助攻，队友凌空抽射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你从后场带球推进，直塞撕开防线助队友得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你角球二次进攻传中，队友近距离撞射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场拦截后精准斜传，队友停球怒射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你任意球直接开到后点，队友头球顶入死角！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路超车后倒三角回传，队友推射空门得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中圈附近断球后长传打身后，队友凌空垫射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你掷出大力界外球到禁区，队友抢点捅射得分！",null,0x1,null,"meA"]
  ]:[
    [m(0x1,0xf)+"，你送出一脚穿透防线的直塞，队友单刀冷静推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场分球到边路，队友传中队友抢点破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区前沿巧妙做球，队友抽射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你定位球开到禁区，队友头球攻门得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路突破后传中，队友包抄推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场抢断后直塞，队友反越位成功单刀得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你后场长传打身后，队友凌空抽射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你角球开到前点，队友甩头攻门得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区外远射被扑出，队友补射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你直塞球打穿防线，队友停球转身抽射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路传中，队友禁区内凌空垫射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场组织进攻，一脚斜传助队友单刀推射得手！",null,0x1,null,"meA"]
  ]);
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
    if(goalMe["length"]&&ad()<0.3)pool=pool.concat(goalMe,assistMe);
    if(goalOpp["length"]&&ad()<0.24)pool=pool.concat(goalOpp);
  }
  return pool;
}
/* 青年赛（U系列）比赛事件池：家长看台/球探/青训氛围 + 递进 flag 差分 */
function _yBmCommon(bx,m){
  var p=[
    ["看台上你的父母举着自制的横幅，你妈比你还紧张。",null],
    ["青训总监坐在看台角落做笔记——他的本子上出现过的名字，后来大多踢上了职业。",null],
    ["U字号赛场没有视频回放，边裁举旗的手就是最终判决。",null],
    ["替补席上有人紧张得把矿泉水瓶捏得咯咯响。",null],
    [m(0x1,0xf)+"，对面的小胖中锋用身体把你拱开了两步，这个年纪的发育差距就是这么不讲理。",null],
    ["队医蹲在场边给中卫缠绷带，这个年纪的孩子，膝盖比脚法更需要保护。",null],
    ["看台上的助威声是成年球场没有的那种干净，什么广告牌都挡不住。",null],
    ["教练在边线喊：抬眼！你这才想起找空当。",null],
    [m(0x1,0xf)+"，双方在青年级别的草皮上打起了对攻，节奏快得吓人。",null],
    ["看台上有几个欧洲面孔的球探，笔记本从头记到尾。",null],
    ["中圈开球前，队长把所有人拢在一起吼了一声——这是这支青年队的老规矩。",null],
    ["国际足联的颁奖习惯是赛后马上挂奖牌，赛前没人愿意想这个。",null]
  ];
  if(bx["kind"]==='u17'&&a2["flags"]['_ntU15']&&!a2["flags"]['_ntU15core'])p["push"](["看台上有个熟人——两年前把你从U15名单上划掉的顾问。今天他坐得离你很近。",null]);
  if(a2["flags"]['_ntU17core'])p["push"](["边裁都认得你了，开球前冲你笑了笑。",null]);
  if(a2["flags"]['_ntBought']&&bx["kind"]==='u23')p["push"](["看台上有个中年人朝你点了点头。你认得他，也认得那通电话的味道。",null]);
  return p;
}
function _bmOpts(bx,



dec){
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
  var k=bx["kind"],



opp=bx["opp"]||"对手",side=bx["team"]||"你们";
  var _pick=function(arr){return arr[Math["floor"](ad()*arr["length"])]};
  if(k==="derby"){
    var _dt=_dbyType(bx["comp"]);
    if(_dt==='n')return _pick([
      "国家德比。这从来不只是两座球场的胜负——整个国家今晚被这一场球分成两半，连不看电视的人都会问比分。",
      "赛前一周全国的报纸都在写这场比赛。历史、地域、旧账全被翻出来，压在了这九十分钟上。"+opp+"不会手软，你们也不会。",
      "这是那种会被反复重播很多年的比赛。通道里你能听见自己的心跳——国家德比的灯光下，没有小角色。",
      "教练在赛前只放了一段视频：两队第一次交手的黑白影像。快一百年过去了，恩怨一分没少。今晚轮到你们写下一笔。"
    ]);
    if(_dt==='r')return _pick([
      "地区恩怨局。两座城市隔得不远，积怨攒得不浅——看台上的歌声从大巴进场就没停过。",
      "这是一场没有降级风险也必须赢的比赛——为了整片地区的脸面。"+opp+"的球迷已经提前到了，客队看台的横幅挂了三层。",
      "赛前停车场里两队球迷泾渭分明，警察在中间拉起隔离带。这种比赛，谁先眨眼谁丢一片心。",
      "出租车司机一路上都在念叨"+opp+"的历史战绩。这片地方今晚只有一个话题——谁才是这片地的老大。"
    ]);
    return _pick([
      "德比之夜。整座城市在这一晚分成两半，看台上的歌声与呐喊几乎要把屋顶掀翻。对手是"+opp+"，恩怨早已写进历史——今天，你要让对面半座城安静下来。",
      "同城死敌，无需动员。从踏进球场的那一刻起，空气里就弥漫着火药味。"+opp+"的球迷已经在看台上竖起了巨型横幅，你绝不能让他们笑着离开。",
      "德比日，整座城市只分成两种颜色。赛前外卖小哥都在问你支持哪边。"+opp+"那边已经提前一周在社交媒体上挑衅了，今天是回击的时候。",
      "出租车司机一路上都在骂"+opp+"，街边小饭馆的电视已经调好了直播。这座城市今晚只有一个话题——谁才是真正的老大。",
      "德比的意义从来不只是三分。走出更衣室时，看台上那片山呼海啸般的敌意扑面而来，但你知道，球场的另一端，有同样的狂热在为你燃烧。"
    ]);
  }
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
  if(k==="u17")return _yIntroHead(bx)+_pick([
    "一路从预选赛踢到亚少赛决赛。你还没满十八岁，但国少队这批人已经把整片亚洲的青年军都掀了一遍。今天对面的"+opp+"，是最后一道坎。",
    "亚少赛决赛。你从小看着电视里国字号输球的画面长大，今天你自己穿上了这件球衣。"+opp+"很强，但你们走到这里也不是靠运气。",
    "决赛日。看台上稀稀拉拉但很执着的中国球迷喊着你的名字。教练在通道里说：别怕，对手也是十七岁的孩子。你点点头，把拳头攥紧了。",
    "赛前联席会开了一个钟头，"+opp+"的领队一直在争取更好的更衣室。你在门外听着，忽然意识到这种事以后还会有很多次——但今天是你们孩子的战场。",
    "热身时你注意到看台上有几个欧洲面孔，手里的本子记个不停。球探不看不出身，只看这九十分钟。你的机会和这批队友的，都在这九十分钟里。",
    "决赛前一晚查房，教练把你们几个主力的手机收走了。黑暗里有人小声问：明天会赢吗？没人回答，但也没人睡着。"
  ])+_yOppLine(opp);
  if(k==="u19")return _yIntroHead(bx)+_pick([
    "亚青赛决赛。这个年龄的亚洲赛场，是所有天才的第一块试金石。"+opp+"的青年队名满亚洲，但你们也有自己的武器。",
    "从小组赛跌跌撞撞到一路连胜，U19国青站到了决赛的草皮上。赢了这场，明年的世青赛就有你们的位置——如果你还在的话。",
    "决赛前夜，队里没人睡得着。十八九岁，这是最容易做梦也最容易碎掉的时候。"+opp+"在等着，把梦守住。",
    "半决赛后你的名字第一次出现在了转会传闻里。经纪人打电话让你别分心，教练什么都没说，只把首发名单拍在了你面前。",
    "这批人里有几个从U13就在一起踢——那时候你们抢一个馒头都能打起来。今天可能是这个班底的最后一场。",
    "上一次中国队站在这个赛事的决赛，队里老队员说是很多年前了。历史这种东西，听着远，踢起来就九十分钟。"
  ])+_yOppLine(opp);
  if(k==="u23")return _yIntroHead(bx)+_pick([
    "U23亚洲杯决赛，也是奥运会的门票。职业联赛磨了几年，你和这批同年龄的伙伴再一次为国字号站上决赛场。"+opp+"，老对手了。",
    "国奥队的更衣室里贴着一张纸：距离奥运会，还有九十分钟。你抬头看了一眼，把球衣塞进裤子里，走进了通道。",
    "这是你在年龄梯队的最后一届大赛——过了这年，就再没有U23了。"+opp+"也一样年轻，也一样输不起。",
    "俱乐部放人的时候提了条件：别受伤。但到了这种决赛，谁收缩着踢谁是孙子。你要在安全和历史之间选一个。",
    "赛前发布会，记者问他『这批球员和欧洲同龄人的差距』，教练把你推到了话筒前。你听见自己说：九十分钟后你们自己看。",
    "看台上坐着一半的职业球探，一半的家长。你爸妈托人从国内带了横幅，挂在客队看台的角落，字很土，但你热身时看了三次。"
  ])+_yOppLine(opp);
  return _pick([
    "关键一战。你所在的"+side+"迎战"+opp+"，全场球迷的呐喊已经响彻球场。",
    "这是一场谁也输不起的比赛。"+opp+"已经做好了准备，而你们的更衣室里，空气几乎凝固。",
    "赛前训练只持续了半小时，教练说：今天不需要练了，你们知道该怎么做。走出训练场时，你抬头看了看天空，深吸一口气。",
    "球场外聚集了大批球迷，有人举着你的名字的牌子。你透过大巴车窗看到这一幕，心里默默说了一句：今晚不会让你们失望。",
    "双方球员在通道里列队，目光交汇的一瞬间，火花四溅。"+opp+"的队长朝你点了点头，你也微微点头回应——竞技场上，尊重从这一刻开始。"
  ]);
}
function _bmSeg(bx){
  var as=Math["round"](a2["ovr"]+0x18),



bs=_bmOppStr(bx);
  if(bx["kind"]==="wc"||bx["kind"]==="asia")as=Math["round"](_natStr? _natStr() : a2["ovr"]+0x18);
  var sd=(as-bs)/0x32;
  var mood=bx["_mood"]||0x0;
  var lH=0.225*(1+(sd+mood*0.06)*0.85),



lA=0.225*(1-(sd+mood*0.06)*0.85);
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
      if(ev[0x4]==="meG")bx["_meG"]=(bx["_meG"]||0x0)+0x1;
      if(ev[0x4]==="meA")bx["_meA"]=(bx["_meA"]||0x0)+0x1;
      if(ev[0x2]!=null)hg=Math["max"](hg,ev[0x2]);
      if(ev[0x3]!=null)ag=Math["max"](ag,ev[0x3]);
    }
  }
  bx["score"][0x0]+=hg;bx["score"][0x1]+=ag;
  var t=bx["t"]||0,



_isInj=ev&&ev[0x4]==="inj",_isGoalEv=ev&&(ev[0x2]!=null||ev[0x3]!=null);
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
  /* 分场面进球差分文案：每个场面只保留少数真正特殊的句子，与通用池一起随机点缀，不再按场面刷屏 */
  var _teamGoalKind={"derby":["顶着整片死敌看台的嘘声把球轰进球门","在全场火药味最浓的时刻一剑封喉","用一记爆射让同城死敌的庆祝声戛然而止"],"wc":["在世界杯决赛的聚光灯下洞穿球门","把最沉重的一脚射门送进世界杯决赛的网窝","在全世界屏住呼吸的瞬间完成致命一击"],"asia":["在亚洲之巅的决赛上冷静施射得分","用一粒进球点燃了整片亚洲看台的欢呼","在万众瞩目的亚洲决战中攻破球门"],"cont":["在洲际决赛的舞台上轰入制胜一球","用漂亮的配合在洲际之巅撕开防线","在决赛的重压下稳稳将球送进死角"],"promo":["把整个赛季的汗水都压进这一脚","在决定命运的升级战中挺身而出","用金子般的进球推开升级的大门"],"drop":["在最不能输的保级大战中顶住压力破门","把全队的求生欲望一脚踢进网窝","在最需要英雄的时刻打进关键一球"]}[bx["kind"]]||[];
  var _oppKindPool={"derby":["同城死敌攻破球门，对面看台瞬间沸腾","同城死敌打进一球，刺耳的声浪盖过整片看台","同城死敌的进球让你们的心凉了半截"],"wc":["对方在世界杯决赛中攻破球门","对方的进球让世界杯冠军的悬念重新燃起","对手抓住一次机会，在世界杯决赛扳回一城"],"asia":["对方在亚洲之巅的决赛中扳回一球","对手的进球让亚洲冠军的归属重起悬念","对方抓住机会攻破球门"],"cont":["对手在洲际决赛中攻入一球","对方的进球让奖杯变得遥远起来","对手扳回一城，决赛重新有了悬念"],"promo":["对手的进球让升级前景再次紧张起来","对方在升级关键战中打入一球","对手破门，把你们逼到了悬崖边"],"drop":["对方在保级生死战中先声夺人","对手的进球拉响了保级的警报","对方破门，让降级的阴影重新笼罩"]}[bx["kind"]]||[];

  if(_teamGoalKind["length"])_teamGoalPool=_teamGoalPool["concat"](_teamGoalKind);
  if(_oppKindPool["length"])_oppGoalPool=_oppGoalPool["concat"](_oppKindPool);
  var _pick=function(arr){return arr[Math["floor"](ad()*arr["length"])];};
  /* 每个进球都有一条叙述：事件进球用事件文本，其余用通用描述（修复比分与叙述不一致） */
  var _evCnt=ev&&_isGoalEv?ev: null;
  var _gh=hg-(_evCnt&&_evCnt[0x2]!=null?_evCnt[0x2]:0),
      _ga=ag-(_evCnt&&_evCnt[0x3]!=null?_evCnt[0x3]:0);
  if(_isInj)bx["log"]["push"](ev[0x0]);
  else if(ev&&ev[0x0]&&_isGoalEv&&(hg>0||ag>0))bx["log"]["push"](ev[0x0]);
  else if(ev&&ev[0x0]&&!hg&&!ag)bx["log"]["push"](ev[0x0]);
  /* 同一 15 分钟段可能出多球：先攒起来按分钟先后插叙，避免"先 30 分钟后 25 分钟"的时间错乱 */
  var _goals=[],_gmi,_gmin;
  for(_gmi=0;_gmi<_gh;_gmi++){_gmin=ae(t+0x1,t+0xf);_goals["push"]({'_m':_gmin,'_x':"第"+_gmin+" 分钟，"+(bx["side"]||"你们")+_pick(_teamGoalPool)+"。"});}
  for(_gmi=0;_gmi<_ga;_gmi++){_gmin=ae(t+0x1,t+0xf);_goals["push"]({'_m':_gmin,'_x':"第"+_gmin+" 分钟，"+_pick(_oppGoalPool)+"。"});}
  _goals["sort"](function(_a,_b){return _a["_m"]-_b["_m"];});
  for(_gmi=0;_gmi<_goals["length"];_gmi++)bx["log"]["push"](_goals[_gmi]["_x"]);
  return{hg:hg,ag:ag};
}
function _bmAdvance(bx){
  while(true){
    if(bx["done"])return;
    if(bx["dec"])return;
    var seg=bx["seg"]||0x0;
    if(seg===0x0){bx["seg"]=0x1;bx["dec"]="intro";
      /* U系列：intro 即赛前选拔态度决策（影响本场胜率与递进 flag） */
      bx["opts"]=_yKind(bx["kind"])?_ntSelOpts(bx):[{'key':"start",'label':"开始比赛",'hint':"走上球场，全场球迷都在等你"}];return;}
    if(seg===0x1){bx["seg"]=0x2;bx["dec"]="kickoff";bx["opts"]=_bmOpts(bx,"kickoff");return;}
    if(seg===0x5){bx["seg"]=0x6;bx["dec"]="halftime";bx["opts"]=_bmOpts(bx,"halftime");return;}
    if(seg===0x9){
      var sc=bx["score"];
      if(sc[0x0]===sc[0x1]){
        /* 联赛性质的大场面（德比/保级）允许平局：不进加时，结果按平局回填积分榜 */
        if('derby'===bx["kind"]||'drop'===bx["kind"]){bx["done"]=!0x0;return;}
        bx["seg"]=0xa;bx["dec"]="extra";bx["opts"]=_bmOpts(bx,"extra");return;
      }
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
function _bmFinish(bI,



_p){
  var bM,bN=_p["score"][0x0],bO=_p["score"][0x1],bP=[],bQ='',bS=null;
  var bW=al(a2["pos"])["group"],bV=aR[bI["kind"]]["side"]||bI["team"];
  var as=Math["round"](a2["ovr"]+0x18),



bs=_bmOppStr(bI);
  if(bI["kind"]==="wc"||bI["kind"]==="asia")as=Math["round"](_natStr? _natStr() : a2["ovr"]+0x18);
  var _mood=bI["_mood"]||0x0;
  var sd=(as-bs)/0x5a;
  if(bN===bO&&!_p["_extraDone"]){
    _p["_extraDone"]=!0x0;
    _p["log"]["push"]("九十分钟战平，进入加时赛。");
    var eH=0.12*(1+(sd+_mood*0.06)*0.85),eA=0.12*(1-(sd+_mood*0.06)*0.85);
    if(eH<0.06)eH=0.06;if(eA<0.06)eA=0.06;
    var _eh=_poisson(eH),_ea=_poisson(eA);
    /* 加时进球文案按归属分层：我方细分为「你进球/你助攻/队友」 */
    var _etTeam=["终于打破僵局！","在加时赛补射得手！","抓住加时赛的一次反击机会破门！","一脚世界波轰开对方球门！","在混战中把球捅进网窝！","禁区内转身抽射破门！"],_etYouGoal=["在反击中直捣黄龙，冷静推射远角破门！","加时赛带球长途奔袭，晃过门将推射空门得手！","一脚禁区外远射直挂死角，洞穿对方球门！","禁区内接队友传中，凌空垫射破门！","前场断球后单刀赴会，一蹴而就！","头球攻门砸入死角，完成致命一击！","连续配合后禁区前沿抽射，球贴地钻入网窝！","角球二次进攻中抢点捅射破门！","任意球直接攻门，球绕过人墙飞入死角！","禁区混战中补射得手，完成绝杀！","边路突破后内切，兜射远角破门！","前场任意球直接轰门，球如炮弹般入网！"],_etYouAssist=["送出一记手术刀直塞，助攻队友完成致命一击！","角球精确制导，队友头球砸入网窝！","边路传中精准找到队友，头球攻门得手！","禁区前沿做球给队友，一脚抽射破网！","直塞球打穿防线，队友单刀推射破门！","倒三角回传跟进，队友推射空门得手！","头球摆渡到禁区中央，队友凌空抽射得分！","边路突破后倒三角回传，队友包抄推射破门！","任意球开到后点，队友头球顶入死角！","禁区前沿假射真传，队友反越位成功推射破门！","中场断球后直塞，队友停球转身抽射得分！","角球二次进攻传中，队友近距离撞射破门！"],_etA=["对方完成了绝杀！","对方在加时赛扳回一城！","对方通过定位球在加时赛得分！","对方抓住一次反击机会破门！","对方禁区内抢点推射得手！","对方远射轰入死角，比分被扳平！"];
    if(_eh>0){
      bN+=_eh;
      var _gwg=al(a2["pos"])["group"],_etLine,_pp9;
      if(_gwg==="gk")_etLine=bV+_etTeam[Math["floor"](ad()*_etTeam["length"])];
      else{
        _pp9=ad();
        if(_pp9<0.22)_etLine="你"+_etYouGoal[Math["floor"](ad()*_etYouGoal["length"])],bI["_meG"]=(bI["_meG"]||0x0)+0x1;
        else if(_pp9<0.45)_etLine="你"+_etYouAssist[Math["floor"](ad()*_etYouAssist["length"])],bI["_meA"]=(bI["_meA"]||0x0)+0x1;
        else _etLine=bV+_etTeam[Math["floor"](ad()*_etTeam["length"])];
      }
      _p["log"]["push"]("加时赛，"+_etLine);
    }
    if(_ea>0)bO+=_ea,_p["log"]["push"]("加时赛，"+_etA[Math["floor"](ad()*_etA["length"])]);
    _p["score"][0x0]=bN;_p["score"][0x1]=bO;
    _p["log"]["push"]("比分 "+bV+" "+bN+" : "+bO);
    if(bN===bO&&!bI["_injured"]){
      _p["dec"]="pen";_p["opts"]=_bmOpts(bI,"pen");
      a2["pending"]=_p;
      return;
    }
  }
  if(bN===bO&&_p["_extraDone"]){
    bP["push"]("九十分钟和加时都没分出胜负。点球大战。");
    /* 统一模型：命中率取双方实力（as/bs 同 _penSim 口径）；玩家那一脚算作本队第 1 罚 */
    var _rt=_penProb(as,bs),_pa=_rt[0x0],_pb=_rt[0x1];
    var _aG=_p["_penDone"]&&_p["_penA"]?0x1:0x0,_bG=0x0;
    var _aK=_p["_penDone"]?0x1:0x0,_bK=0x0,_guard=0;
    while(_aK<0x5||_bK<0x5){if(_aK<0x5){_aK++;if(ad()<_pa)_aG++;}if(_bK<0x5){_bK++;if(ad()<_pb)_bG++;}}
    while(_aG===_bG&&_guard++<0x14){if(ad()<_pa)_aG++;if(ad()<_pb)_bG++;}
    bS=[_aG,_bG];
    bM=_aG>=_bG;
    !bI["_injured"]&&bP["push"](_p["_penA"]===!0x0?"你主罚的一球稳稳命中，为球队提供了保障。":"你主罚的一球被扑出，球队陷入被动。");
    bP["push"]("点球 "+_aG+" : "+_bG);
  }else{
    bM=bN>bO;
    bQ=bM?"领先":"落后";
  }
  var bX=null;
  bI["_injured"]||(a2["seasons"][bI["recIdx"]]||{"apps":0x0})["apps"]>0x0&&ad()<0.4&&(bX='gk'===bW?bS?"点球大战中扑出了关键一球":'第\x20'+ae(0x3c,0x58)+(" 分钟单掌把必进"+"球托了出去"):"def"===bW?"在门线上把球解围"+'出去':"mid"===bW?bM?"送出了那记决定比"+"赛的直塞":"把球权一次次抢回"+'来':bM?"打进了那个球":"打出了全队唯一一"+"次射正"),




  bX&&bP["push"]('你'+bX+'。'),
  bI["_injured"]&&bP["push"]("你被换下后坐在替补席上看完了剩下的比赛，伤处还在隐隐作痛。");
  'derby'===bI["kind"]&&bP["push"](_dbyType(bI["comp"])==='c'?(bM?"终场哨响的那一刻，属于你的那半边看台炸了。有人抱着你哭。":"对面看台的歌声一直唱到终场，像刀子一样扎进耳朵。这就是德比。"):(bM?"终场哨响，"+(bI["comp"]||'德比')+"拿下了。这三分带着百年恩怨的分量，全国的头条都是你的球队。":"终场哨响。对面看台的歌声一直唱到终场。这种比赛输了，一周都抬不起头。"));
  var bY=bV+'\x20'+bN+" 比 "+bO+(bS?"，点球 "+bS[0x0]+" 比 "+bS[0x1]:'')+'。';
  var _drawLg=!bM&&!bS&&bN===bO&&('derby'===bI["kind"]||'drop'===bI["kind"]);
  if(_yKind(bI["kind"])){
    var _fy=bM?(bS?_yFin["pw"]:_yFin["w"]):(bS?_yFin["pl"]:_yFin["l"]);
    bP["push"](_fy[Math["floor"](ad()*_fy["length"])]["replace"]("{s}",bY));
    if(bI["kind"]==='u23'&&a2["flags"]["_ntBought"])bP["push"](bM?"颁奖时你把金牌咬了一下。没有想象中甜——你想起的仍是那个把钱转出去的下午。":"赛后有记者问起你少年时代的事。你答得很快，快得像排练过。");
  }else if(_drawLg){
  var _dp=["终场哨响，"+bY+"谁也没能压过谁。这种比赛的一分，踢过的人才知道有多烫手。",
    "终场哨响，"+bY+"双方教练握手时都没笑。平局对谁都不是答案，但至少不是灾难。",
    "终场哨响，"+bY+"看台上的歌声没有停——这种夜晚，平局像一场没打完的仗。"];
  bP["push"](_dp[Math["floor"](ad()*_dp["length"])]);
  }else{
  bP["push"](bM?"终场哨响。"+bY+(bS?"点球大战赢下来的"+"那种赢法，腿是软"+'的。':"很多年以后你还会"+"梦到这一刻。"):bY+(bS?"点球大战输掉的球"+"，最难过去。":"你在草皮上坐了很"+"久，没人来拉你。"));
  }
  var bZ=a2["seasons"][bI["recIdx"]]||null,



c0=[];
  bZ&&bZ["apps"]>0x0&&(
  'wc'===bI["kind"]||"asia"===bI["kind"]?(b0(bZ,bI["comp"],bM?'冠军':'亚军',bI["age"]),'wc'===bI["kind"]?a2["natForm"]["wc"]=bM?0x4:0x3:a2["natForm"]["asia"]=bM?0x3:0x2):"cont"===bI["kind"]&&bM?(bZ["trophies"]["push"](bI["comp"]+'冠军'),a2["trophies"]["push"]({'name':bI["comp"]+'冠军','age':bI["age"],'team':bI["team"]})):"promo"===bI["kind"]&&bM?(_moveTeam(bI["teamId"],am[bI["fromLeag"+'ue']],!0x0,0x1),bZ["move"]='升上'+ak(am[bI["fromLeag"+'ue']])["name"]):"drop"!==bI["kind"]||bM||(_moveTeam(bI["teamId"],ao[bI["fromLeag"+'ue']],!0x1,0x1),bZ["move"]='降入'+ak(ao[bI["fromLeag"+'ue']])["name"]),bI["counterTid"]&&!bM&&_moveTeam(bI["counterTid"],bI["counterTo"],!0x0,0x2));
  if(a2["_natWC"]){var _tw=a2["_natWC"];_tw["stage"]=bM?'冠军':'亚军';_natFinalScore(_tw,"中国队",bN,bO,bS);var _frw=_tw["rounds"]&&_tw["rounds"]["length"]?_tw["rounds"][_tw["rounds"]["length"]-0x1]:null;if(_frw)_frw["won"]=bM;var _pw=_tw["path"]&&_tw["path"]["length"]?_tw["path"][_tw["path"]["length"]-0x1]:null;if(_pw){_pw["won"]=bM;var _ps2=(bS&&bS["length"]>=2)?(bN+"-"+bO+" (点球 "+bS[0x0]+"-"+bS[0x1]+")"):(bN+"-"+bO);_pw["score"]=_ps2;}a2["natForm"]["wc"]=bM?0x4:0x3;if(a2["natFx"]&&a2["natFx"]["data"]&&a2["natFx"]["data"]["wc"])a2["natFx"]["data"]["wc"]["rounds"]=_tw["rounds"];var _foW=_tw["rounds"]&&_tw["rounds"]["length"]?_tw["rounds"][_tw["rounds"]["length"]-0x1]["matches"]:null;if(_foW&&_foW["length"])a2["natFx"]["data"]["wc"]["champion"]=bM?'n_chn':(_foW[0x0]["homeId"]==='n_chn'?_foW[0x0]["awayId"]:_foW[0x0]["homeId"]);var _trI=-0x1;for(var _tq=0;_tq<a2["tournaments"]["length"];_tq++){if(a2["tournaments"][_tq]===_tw){_trI=_tq;break;}}if(_trI<0)for(_tq=0;_tq<a2["tournaments"]["length"];_tq++)if(a2["tournaments"][_tq]["comp"]==="\u4e16\u754c\u676f"&&a2["tournaments"][_tq]["age"]===bI["age"]){_trI=_tq;break;}if(_trI>=0)a2["tournaments"][_trI]=_tw;delete a2["_natWC"];}if(a2["_natAsia"]){var _ta=a2["_natAsia"];_ta["stage"]=bM?'冠军':'亚军';_natFinalScore(_ta,"中国队",bN,bO,bS);var _fra=_ta["rounds"]&&_ta["rounds"]["length"]?_ta["rounds"][_ta["rounds"]["length"]-0x1]:null;if(_fra)_fra["won"]=bM;var _pa2=_ta["path"]&&_ta["path"]["length"]?_ta["path"][_ta["path"]["length"]-0x1]:null;if(_pa2){_pa2["won"]=bM;var _ps3=(bS&&bS["length"]>=2)?(bN+"-"+bO+" (点球 "+bS[0x0]+"-"+bS[0x1]+")"):(bN+"-"+bO);_pa2["score"]=_ps3;}a2["natForm"]["asia"]=bM?0x3:0x2;if(a2["natFx"]&&a2["natFx"]["data"]&&a2["natFx"]["data"]["asia"])a2["natFx"]["data"]["asia"]["rounds"]=_ta["rounds"];var _foA=_ta["rounds"]&&_ta["rounds"]["length"]?_ta["rounds"][_ta["rounds"]["length"]-0x1]["matches"]:null;if(_foA&&_foA["length"])a2["natFx"]["data"]["asia"]["champion"]=bM?'n_chn':(_foA[0x0]["homeId"]==='n_chn'?_foA[0x0]["awayId"]:_foA[0x0]["homeId"]);var _tq2=-0x1;for(var _tq3=0;_tq3<a2["tournaments"]["length"];_tq3++){if(a2["tournaments"][_tq3]===_ta){_tq2=_tq3;break;}}if(_tq2<0)for(_tq3=0;_tq3<a2["tournaments"]["length"];_tq3++)if(a2["tournaments"][_tq3]["comp"]==="\u4e9a\u6d32\u676f"&&a2["tournaments"][_tq3]["age"]===bI["age"]){_tq2=_tq3;break;}if(_tq2>=0)a2["tournaments"][_tq2]=_ta;delete a2["_natAsia"];}if(a2["_contRun"]){var _cr3=a2["_contRun"];_cr3["result"]=bM?"冠军":"止步决赛";var _fr3=_cr3["rounds"][_cr3["rounds"]["length"]-0x1];_fr3["won"]=bM;_fr3["score"]=bN+"-"+bO;if(bS)_fr3["score"]+=(" (点球 "+bS[0x0]+"-"+bS[0x1]+")");a2["cupRuns"]["push"](_cr3);if(a2["contFx"])for(var _ck2 in a2["contFx"]["data"])if(a2["contFx"]["data"][_ck2]["name"]===_cr3["comp"]){var _cd2=a2["contFx"]["data"][_ck2];_cd2["champion"]=bM?bI["teamId"]:_fr3["oppId"];var _lt3=_cd2["rounds"][_cd2["rounds"]["length"]-0x1]["ties"][0];_lt3["w"]=_cd2["champion"];_lt3["sa"]=bN;_lt3["sb"]=bO;_lt3["p"]=bS?[bS[0x0],bS[0x1]]:null;delete _lt3["pd"];}delete a2["_contRun"];}
  /* 德比/保级大战回填：互动比分写回真实赛程与积分榜并重排序 */
  if(bI["_fx"]&&(bI["kind"]==='derby'||bI["kind"]==='drop')){
    var _fw=bI["_fx"],_rows=a2["lgTables"]&&a2["lgTables"][_fw["lg"]],_ri;
    if(_rows){var _meR=null,_opR=null;
      for(_ri=0;_ri<_rows["length"];_ri++){if(_rows[_ri]["i"]===bI["teamId"])_meR=_rows[_ri];if(_rows[_ri]["i"]===bI["oppId"])_opR=_rows[_ri];}
      if(_meR&&_opR){var _fd=a2["lgFx"]&&a2["lgFx"]["data"]&&a2["lgFx"]["data"][_fw["lg"]];
        _tblAddmatch(_meR,bN,bO,_fw["meHome"]);_tblAddmatch(_opR,bN,bO,!_fw["meHome"]);
        if(_fd){_fd[_fw["r"]][_fw["m"]][2]=_fw["meHome"]?bN:bO;_fd[_fw["r"]][_fw["m"]][3]=_fw["meHome"]?bO:bN;}
        _tblResort(_fw["lg"]);
      }
    }
  }
  /* 互动赛真实表现折算（替换旧随机+1）：俱乐部场次记俱乐部赛季，国家队场次记国家队统计；
     你进球/助攻按比赛事件计数(_meG/_meA)，GK 零封计 cs；点球大战进球不计入个人进球 */
  var _meG=(bI&&bI["_meG"])||0x0,_meA=(bI&&bI["_meA"])||0x0,_isNat=("wc"===bI["kind"]||"asia"===bI["kind"]),_gkCs=("gk"===bW&&bO===0x0)?0x1:0x0;
  if(bZ&&(_meG>0||_meA>0||_gkCs)){
    if(_isNat){
      if(a2["natStats"]){a2["natStats"]["goals"]=(a2["natStats"]["goals"]||0x0)+_meG;a2["natStats"]["assists"]=(a2["natStats"]["assists"]||0x0)+_meA;if(_gkCs)a2["natStats"]["cs"]=(a2["natStats"]["cs"]||0x0)+0x1;}
      bZ["natGoals"]=(bZ["natGoals"]||0x0)+_meG;bZ["natAssists"]=(bZ["natAssists"]||0x0)+_meA;if(_gkCs)bZ["natCs"]=(bZ["natCs"]||0x0)+0x1;
    }else{
      bZ["goals"]+=_meG;bZ["assists"]+=_meA;a2["totals"]["goals"]+=_meG;a2["totals"]["assists"]+=_meA;
      if(_gkCs){bZ['cs']=(bZ['cs']||0x0)+0x1;a2["totals"]['cs']=(a2["totals"]['cs']||0x0)+0x1;}
      /* cap 兜底（A 轻量）：复用赛季末封顶口径，避免互动赛折算冲破球队进球份额上限 */
      var _cr0=a2["_lgRow"];
      if(_cr0&&_cr0["gf"]>0x0){var _rg=a0["ROLES"][a2["role"]]["rank"],_cg=_rg>=0x3?0.7:_rg>=0x2?0.55:0.4,_ca=_rg>=0x3?0.55:_rg>=0x2?0.45:0.35,_mxG=Math["round"](_cr0["gf"]*_cg),_mxA=Math["round"](_cr0["gf"]*_ca);
        if(bZ["goals"]>_mxG)bZ["goals"]=_mxG;if(bZ["assists"]>_mxA)bZ["assists"]=_mxA;
        if(bZ["goals"]+bZ["assists"]>_cr0["gf"]){var _ov=bZ["goals"]+bZ["assists"]-_cr0["gf"];bZ["goals"]=Math["max"](0x0,bZ["goals"]-_ov);}
      }
    }
  }
  /* U系列梯队记账：出场/进球进 _yCaps/_yGoals，夺冠写递进 flag 与奖杯（国家队大赛/俱乐部逻辑均不适用） */
  var _yk=_yKind(bI["kind"]);
  if(_yk){
    a2["_yCaps"]=a2["_yCaps"]||{};a2["_yGoals"]=a2["_yGoals"]||{};
    a2["_yCaps"][bI["kind"]]=(a2["_yCaps"][bI["kind"]]||0x0)+0x1;
    a2["_yGoals"][bI["kind"]]=(a2["_yGoals"][bI["kind"]]||0x0)+_meG;
    if(bM){a2["flags"][_yNT[_yk]["flag"]+"core"]=0x1;
      a2["trophies"]["push"]({'name':_yNT[_yk]["comp"]+'冠军','age':bI["age"],'team':_yNT[_yk]["band"]});}
  }
  var c1=bM?_yk?_yNT[_yk]["win"]:'derby'===bI["kind"]?0xc:'wc'===bI["kind"]?0x1e:"asia"===bI["kind"]?0x12:0x10:_yk?_yNT[_yk]["lose"]:_drawLg?0x6:'derby'===bI["kind"]?0x2:'wc'===bI["kind"]?0xa:0x4,



c2=Math["round"](c1*(0x1-a2["fame"]/0x64));
  return a2["fame"]=ac(a2["fame"]+c2,0x0,0x64),c2&&c0["push"]({'cls':'up','text':"名气+"+c2}),



bI["_mood"]&&(a2["guanxi"]=ac(a2["guanxi"]+bI["_mood"],0x0,0x64),
  c0["push"]({'cls':'up','text':"关系+"+bI["_mood"]})),
a2["pending"]["result"]={'won':bM,'log':bP,'deltas':c0,'score':[bN,bO],'pens':bS},


a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':bI["comp"],'text':(bM?'derby'===bI["kind"]?'胜':'冠军':_drawLg?'平':'derby'===bI["kind"]?'负':'失利')+'：'+bY}),



a2["_awardDue"]&&(a2["_awardDue"]=!0x1,_lgFinalRefresh(a2["seasons"][bI["recIdx"]]),bAw(a2["seasons"][bI["recIdx"]])),
  a2["bigQ"]=[],a2["_promoDue"]&&(a2["_promoDue"]=!0x1,_promoReleg(a2["seasons"][bI["recIdx"]],null,null),a2["news"]&&window["NEWSGEN"]&&_newsTick(0x0)),!0x0;
}
function aW(){var bx=a2["bigQ"][0x0];
/* U13/U15 选拔营：不进交互比赛，直接按能力结算名单结果 */
if(bx&&bx["_quick"]){var _y=_yNT[bx["kind"]],_ok,_l=[],
  _pb=0.5+(_ntPrevCore(bx["kind"])?0.12:0x0)+(a2["ovr"]-0x28)/0x190,
  _pg=al(a2["pos"])["group"]||"att",
  _pickY=function(a){return a[Math["floor"](ad()*a["length"])]};
  _ok=ad()<ac(_pb,0.15,0.9);
  a2["_yCaps"]=a2["_yCaps"]||{};a2["_yGoals"]=a2["_yGoals"]||{};
  var _fd;
  if(_ok){a2["_yCaps"][bx["kind"]]=(a2["_yCaps"][bx["kind"]]||0x0)+0x2;a2["flags"][_y["flag"]+"core"]=0x1;
    a2["fame"]=ac(a2["fame"]+0x4,0x0,0x64);_fd=[{'cls':'up','text':"名气+4"}];
    _y["posW"]&&_y["posW"][_pg]&&_l["push"](_pickY(_y["posW"][_pg]));
    _l["push"](_pickY(_y["winLog"]));}
  else{a2["fame"]=ac(a2["fame"]-0x2,0x0,0x64);_fd=[{'cls':'down','text':"名气-2"}];
    _y["posL"]&&_y["posL"][_pg]&&_l["push"](_pickY(_y["posL"][_pg]));
    _l["push"](_pickY(_y["loseLog"]));}
  /* 递进线：U15 参照 U13 的结果 */
  if(bx["kind"]==='u15'&&a2["flags"]['_ntU13'])_l["push"](a2["flags"]['_ntU13core']?"教练组的本子上还留着上一期你的名字——这次他们想看你长成什么样。":"两年前公告栏前没有你的名字。这一次，你不想再看别人领队服了。");
  a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':_y["comp"],'text':(_ok?'入选':'落选')+'：'+_y["band"]});
  a2["bigQ"]=[];
  a2["pending"]={'type':"bigmatch",'kind':bx["kind"],'comp':_y["comp"],'age':bx["age"],'icon':aR[bx["kind"]]["icon"],'side':_y["band"],'quick':!0x0,
    'opp':bx["opp"],'score':null,'log':[],'done':!0x0,'result':{'won':_ok,'log':_l,'deltas':_fd,'score':null,'pens':null}};
  return!0x0;}
bx["score"]=[0x0,0x0];bx["log"]=[];
bx["seg"]=0x0;bx["dec"]=null;bx["opts"]=null;bx["done"]=!0x1;bx["t"]=0x0;
bx["_lastEv"]=null;bx["_injured"]=!0x1;bx["_evHist"]=[];bx["_intro"]=_bmIntro(bx);
a2["pending"]={'type':"bigmatch",'kind':bx["kind"],'comp':bx["comp"],'age':bx["age"],'icon':aR[bx["kind"]]["icon"],'side':aR[bx["kind"]]["side"]||bx["team"],
'opp':bx["opp"],'score':bx["score"],'seg':bx["seg"],'dec':bx["dec"],'opts':bx["opts"],'log':bx["log"],'done':bx["done"],'t':bx["t"],'_intro':bx["_intro"]};
_bmAdvance(bx);
a2["pending"]["score"]=bx["score"];a2["pending"]["seg"]=bx["seg"];a2["pending"]["dec"]=bx["dec"];a2["pending"]["opts"]=bx["opts"];a2["pending"]["done"]=bx["done"];a2["pending"]["log"]=bx["log"];a2["pending"]["t"]=bx["t"];}
function aX(bx,



by,bz){var bA=aR[bx["kind"]]["side"]||bx["team"],bB=[],bC=ae(0x0,0x4),bD=ae(0x0,0x2);
'derby'===bx["kind"]&&bB["push"](af(["这座城市提前一周就分成了两半。","地铁里两拨球迷隔着车厢对视。","报纸头版印着历史交手记录：恩怨已经写了一百年。","看台上有人在发那种著名的挑衅海报。","出租车司机一路都在骂对面那个队。"]));
bx["_ctx"]&&bB["push"](bx["_ctx"]+"。谁都输不起的一场。"),
bx["ev"]&&bB["unshift"](bx["ev"]);return 0x0===by&&0x0===bz?bB["push"]("上半场谁都没打开"+"局面。你们在中场"+"来回磨了四十五分"+'钟。'):by>bz?(bB["push"]('第\x20'+ae(0x9,0x29)+" 分钟，"+bA+("先进了一个。看台"+"整个站了起来。")),
by>0x1&&bB["push"]("半场结束前又来一"+"个。你们把优势拉"+"到了两球。"),bz&&bB["push"]("对方在补时扳回一"+"个。中场哨响时那"+"边的替补席在喊。")):by<bz?(bB["push"]('第\x20'+ae(0x6,0x26)+(" 分钟丢球。皮球"+"进网的那一下，场"+"里安静得能听见对"+"方球迷。")),
bz>0x1&&bB["push"]("下半场开始前又被"+"打进一个。你们落"+"后两球。"),by&&bB["push"]("你们在半场前扳回"+"一个，比分咬住了"+'。')):bB["push"]("上半场互交白卷式"+"的两球。谁也没能"+"把比分甩开。"),




bB["push"](0x0===bD?"中场休息。更衣室"+"里教练在白板上画"+"了一通，最后转过"+"头看着你。":0x1===bD?"中场休息。主队球迷"+"的歌声盖过了客队，"+"教练在战术板上写了"+"又擦。":"中场休息。裁判因为"+"几次争议判罚被围住"+"，保安把两边隔开。"),



by>0x2&&bB["push"]("上半场你们就进了三"+"个，看台已经有人提"+"前庆祝了。"),bz>0x1&&bB["push"]("对方两球在手，气势"+"正盛。你们的防线感"+"觉快撑不住了。"),bB;
}var aY=[{'key':"hold",'label':"稳住阵型",'hint':"小幅提高赢面，个"+"人数据平淡",'dp':0.06,'glory':0.12,'mood':0x1},



{'key':"push",'label':"压上去搏",
'hint':"赢面涨得最多，也"+"最可能被反击打穿",'dp':0.13,'glory':0.5,'mood':0x2,'risk':!0x0},{'key':"run",'label':"把球做出来",'hint':"居中，队友更愿意"+'找你',
'dp':0.09,'glory':0.28,'mood':0x0},



{'key':'solo','label':'自己单干','hint':'不再信任队友，孤注一掷用个人能力解决问题','dp':0.02,'glory':0.62,'mood':0x1},{'key':'wall','label':'全员退防','hint':'摆大巴死守到底，难看但有效','dp':0.12,'glory':0.04,'mood':-0x1}];




/* ── §7b 世界联赛引擎（联赛/杯赛/洲赛真实化，设计见 PLAN-league-realism.md） ── */



/* 联赛风格（进球环境乘数，次级修正；主模拟= _matchSim），校准步可调 */

var _lgStyle={'epl':1.05,'liga':0.92,'seri':0.88,'bund':1.08,'l1':0.95,'tur':1.0,'pri':1.02,'ere':1.12,'jup':1.08,'ch':1.0,
'seg':0.9,'b2':1.02,'spl':1.1,'mls':1.15,'jl':0.95,'kl':0.92,'csl':0.98,'ale':1.1,'l2':0.96,'serb':0.9,'cl1':0.95,'bra':1.0,'arg':0.95,'pol':1.0};
/* 联赛循环制式：默认双循环(2)。美职联/阿甲/墨超现实不踢完整双循环 → 单循环(1)；
   加拿超 8 队踢 4 循环、K 联赛 12 队踢 3 循环。避免总场次虚高（此前 MLS/阿甲 30 队=58 场）。 */
var _lgRR={'mls':1,'arg':1,'mx':1,'cpl':4,'kl':3};


/* 升降级配置：顶级自动降级名次区间 / 次级自动升级名次 / 次级附加赛名次区间 */

/* 升降级配置：顶级自动降级名次区间 / 次级自动升级名次 / 次级附加赛名次区间
   （法甲/中超减员人数与次级升级数配平：l1↕2、csl↕2 无附加赛；seri↔serb 3 升 3 降带附加赛） */

var _relegZone={'epl':[18,20],'liga':[18,20],'bund':[16,18],'l1':[17,18],'seri':[18,20],'csl':[15,16]};
var _promoAuto={'ch':[1,2],'seg':[1,2],'b2':[1,2],'l2':[1,2],'serb':[1,2],'cl1':[1,2]};
var _promoPlayoff={'ch':[3,6],
'seg':[3,6],'b2':[3,6],'serb':[3,6]};


/* 洲际名额：联赛名次→通道（ucl/uel/uecl/acl=正赛直进；*q=资格赛池名次） */

var _lgSlots={
'epl':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},
'liga':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},

'seri':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},
'bund':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},

'l1':{'ucl':[1,2,3],'uel':[4,5],'uecl':[6,7],'uelq':[8,9]},
'tur':{'ucl':[1,2],'uel':[3,4],'uclq':[5,6,7],'uelq':[8,9]},
'pri':{'ucl':[1],'uclq':[2,3,4,5,6,7],'uecl':[8],'uelq':[9,10,11]},

'ere':{'ucl':[1],'uclq':[2,3,4,5,6,7],'uecl':[8],'uelq':[9,10,11]},
'jup':{'ucl':[1],'uclq':[2,3,4,5,6,7],'uecl':[8],'uelq':[9,10,11]},

'mx':{'ccl':[1,2,3],'cclq':[4,5,6,7]},
'cpl':{'cclq':[1,2,3]},
'csl':{'acl':[1],'aclq':[2,3,4,5,6]},
'jl':{'acl':[1,2],'aclq':[3,4,5,6]},
'kl':{'acl':[1,2],'aclq':[3,4,5,6]},
'spl':{'acl':[1,2],'aclq':[3,4,5,6]},

'mls':{'ccl':[1,2],'cclq':[3,4,5]},
'ale':{'acl':[1],'aclq':[2,3,4,5]},

/* 波兰：冠军进欧冠资格赛，杯赛冠军进欧联正赛 */
'pol':{'ucl':[1],'uclq':[2,3,4],'uel':[5],'uelq':[6,7],'uecl':[8],'ueclq':[9,10]},
/* 巴西/阿根廷：解放者杯 6 直进 + 2 资格赛（杯赛冠军另享直进） */
'bra':{'lib':[1,2,3,4,5,6],'libq':[7,8]},
'arg':{'lib':[1,2,3,4,5,6],'libq':[7,8]}
};

/* 国内杯赛冠军→洲际资格（键=顶级联赛 id） */

var _cupSlot={'epl':{'cup':'uel','leagueCup':'uecl'},'liga':{'cup':'uel'},'seri':{'cup':'uel'},'bund':{'cup':'uel'},'l1':{'cup':'uel'},
'tur':{'cup':'uel'},'pri':{'cup':'uel'},'ere':{'cup':'uel'},'jup':{'cup':'uel'},'csl':{'cup':'acl'},'jl':{'cup':'acl'},'kl':{'cup':'acl'},
'spl':{'cup':'acl'},'ale':{'cup':'aclq'},'mx':{'cup':'ccl'},'mls':{'cup':'ccl'},'cpl':{'cup':'cclq'},
'pol':{'cup':'uel'},'bra':{'cup':'lib'},'arg':{'cup':'lib'}};

/* 洲际正赛规模（欧冠 36 队瑞士轮；欧联/欧协/亚冠 24 队——9 个欧联会员联赛无法填满 3×36） */

var _contCfg={'ucl':{'name':'欧冠','size':36,'games':8},'uel':{'name':'欧联','size':24,'games':6},'uecl':{'name':'欧协联','size':24,'games':6},
'acl':{'name':'亚冠','size':24,'games':6},'cwc':{'name':'世俱杯','size':32,'games':0},'ccl':{'name':'中北美冠','size':24,'games':6},
'lib':{'name':'解放者杯','size':24,'games':6}};
var _lgRegion={};
(function(){for(var k in _lgSlots){var c=_lgSlots[k];_lgRegion[k]=(c["ucl"]||c["uel"]||c["uecl"])?'eu':(c["ccl"]||c["cclq"])?'na':(c["lib"]||c["libq"])?'sa':'as';}})();

function _tDev(tid){return a2["teamDev"]&&a2["teamDev"][tid]||0;}

/* 有效 rep：升降级重定位存 a2.repOf（DATA.TEAMS 保持不可变，保证同种子可复现/存档一致性） */

function _er(t){return a2&&a2["repOf"]&&a2["repOf"][t["id"]]!=null?a2["repOf"][t["id"]]:t["rep"];}
/* 冠军加成连冠递减：第1冠全额，第2冠75%，第3冠50%，第4冠起25%（连冠=连续每季至少一冠，无冠即清零） */
function _devChampM(tid){var st=(a2["titleStreak"]&&a2["titleStreak"][tid])||0;return st<=0?1:st===1?0.75:st===2?0.5:0.25;}
function _devAdd(tid,v,champ){
a2["_devBonus"]=a2["_devBonus"]||{};
var b=champ?v*_devChampM(tid):v;
if(champ){a2["_titWin"]=a2["_titWin"]||{};a2["_titWin"][tid]=1;}
a2["_devBonus"][tid]=(a2["_devBonus"][tid]||0)+b;
}

/* ── 新闻模块：赛季结算时生成一批（纯风味，主要新闻带微量fx，限幅在此执行） ── */
function _newsFx(o){
var fl=a2["flags"];
if(o["dev"]&&o["dev"]["tid"])_devAdd(o["dev"]["tid"],o["dev"]["v"]);
if(o["devList"])for(var i=0;i<o["devList"]["length"];i++)_devAdd(o["devList"][i]["tid"],o["devList"][i]["v"]);
if(o["wage"]){fl["_wageMul"]=Math.max(0.95,Math.min(1.05,(fl["_wageMul"]||0x1)+o["wage"]));}
if(o["nat"]){
if(!a2["_natStrMap"]){var m={};for(var j=0;j<NATS["length"];j++)m[NATS[j]["i"]]=NATS[j]["s"];a2["_natStrMap"]=m;}
a2["_natStrMap"][o["nat"]["nid"]]=Math.round(a2["_natStrMap"][o["nat"]["nid"]]+o["nat"]["v"]);}
if(o["fame"])a2["fame"]=Math.max(0,Math.min(0x64,(a2["fame"]||0)+o["fame"]));
if(o["gx"])a2["guanxi"]=Math.max(0,Math.min(0x64,(a2["guanxi"]||0)+o["gx"]));
}
function _newsTick(yth){
/* 每季整体替换不保留历史：新闻只展示当季最新一批，不塞满存档 */
if(!window["NEWSGEN"])return;
/* 实况素材：大赛/洲际杯冠军(本季 natFx/contFx) + 联赛冠军升降(_promoReleg 收集于 _newsQ) */
var _fq=a2["_newsQ"]=a2["_newsQ"]||[];
try{
if(a2["natFx"]&&a2["natFx"]["data"])for(var _nk3 in a2["natFx"]["data"]){var _nd3=a2["natFx"]["data"][_nk3];
var _nch2=_nd3?_nd3["champion"]:null;
if(!_nch2&&_nd3&&_nd3["rounds"]&&_nd3["rounds"]["length"]){var _fm3=_nd3["rounds"][_nd3["rounds"]["length"]-0x1]["matches"];
if(_fm3&&_fm3["length"]){var _m3=_fm3[0x0];_nch2=(_m3["pens"]&&_m3["pens"]["length"]>=0x2)?(_m3["pens"][0x0]>=_m3["pens"][0x1]?_m3["homeId"]:_m3["awayId"]):(_m3["hg"]>=_m3["ag"]?_m3["homeId"]:_m3["awayId"]);}}
if(_nch2)_fq["push"]({'t':'nat','nid':_nch2,'tag':_nk3});}
if(a2["contFx"]&&a2["contFx"]["data"])for(var _ck4 in a2["contFx"]["data"]){var _cd4=a2["contFx"]["data"][_ck4];if(_cd4&&_cd4["champion"])_fq["push"]({'t':'cont','tid':_cd4["champion"],'comp':_cd4["name"],'tag':_ck4});}
}catch(e){}
var _facts=_fq["splice"](0x0,_fq["length"]);
var items=null;
try{items=window["NEWSGEN"](a2,yth||0x0,_facts);}catch(e){a2["_newsErr"]=String(e)["slice"](0x0,0xc8);return;}
if(!items||!items["length"])return;
var kept=[],fxCnt=0,negCnt=0,i,e;
for(i=0;i<items["length"];i++){e=items[i];
if(e["fx"]){if(fxCnt>=0x2||_newsFxNeg(e["fx"])&&negCnt>=0x1){delete e["fx"];}else{fxCnt++;if(_newsFxNeg(e["fx"]))negCnt++;_newsFx(e["fx"]);}}
kept.push(e);}
a2["news"]=kept;
}
function _newsFxNeg(o){
if(o["wage"]<0x0||o["fame"]<0x0||o["gx"]<0x0)return!0x0;
if(o["dev"]&&o["dev"]["v"]<0x0)return!0x0;
if(o["nat"]&&o["nat"]["v"]<0x0)return!0x0;
if(o["devList"])for(var i=0;i<o["devList"]["length"];i++)if(o["devList"][i]["v"]<0x0)return!0x0;
return!0x1;
}

/* 球队绝对强度 = 联赛基准 + 联赛内档次 + dev；球员所在队注入球员加成（联赛份额=杯赛的 0.6） */

function _teamAbs(t){
var lg=aq(t),base=(lg&&lg["str"]||60)+(_er(t)-2)*0x3;
var dev=_tDev(t["id"]);
if(t["id"]===a2["teamId"]){
var role=a0["ROLES"][a2["role"]]?a0["ROLES"][a2["role"]]["rank"]:0;
var str=_playerStr(base,a2["ovr"],role);
return Math.round(base+(str-base)*0.6+dev);
}
return Math.round(base+dev);
}
function _cardById(tid){var t=aj(tid);return{'i':tid,'n':t?t["name"]:tid,'s':t?_teamAbs(t):50,'lg':t?ap(t):null};}
function _cards(tms){var r=[];for(var i=0;i<tms.length;i++)r.push(_cardById(tms[i]["id"]));return r;}
function _lgTeamsOf(lgId){var r=[];for(var i=0;i<a0["TEAMS"]["length"];i++){var t=a0["TEAMS"][i];if(ap(t)===lgId)r.push(t);}return r;}


/* 单季联赛：主客双循环，_matchSim 逐场，积分→净胜→进球→id 排序 */

function _lgSeason(lgId){
var tms=_lgTeamsOf(lgId),n=tms.length,gl=_lgStyle[lgId]||1,rr=_lgRR[lgId]||2;
var ids=[],strOf={},nameOf={},i,j,r;
for(i=0;i<n;i++){ids.push(tms[i]["id"]);strOf[tms[i]["id"]]=_teamAbs(tms[i]);nameOf[tms[i]["id"]]=tms[i]["name"];}
ag(ids);
var arr=ids.slice();if(arr.length%2===1)arr.push(null);
var m2=arr.length,
rounds=[];
for(r=0;r<m2-1;r++){
var rd=[];
for(j=0;j<m2/2;j++){var h=arr[j],aw=arr[m2-1-j];if(h!==null&&aw!==null)rd.push(r%2===0?[h,aw]:[aw,h]);}
rounds.push(rd);
arr.splice(1,0,arr.pop());
}
var tbl={};
for(i=0;i<n;i++)tbl[ids[i]]={'i':ids[i],'n':nameOf[ids[i]],'w':0,'d':0,'l':0,'gf':0,'ga':0,'pts':0};
var half=rounds["length"],fx=[];
for(i=0;i<half*rr;i++)fx.push([]);
for(r=0;r<rounds.length;r++){
var rd2=rounds[r];
for(j=0;j<rd2.length;j++){
var H=rd2[j][0],A=rd2[j][1];
for(var leg=0;leg<rr;leg++){
var hh=leg%2===0?H:A,aa=leg%2===0?A:H;
var s=_matchSim(strOf[hh],strOf[aa],gl);
var Th=tbl[hh],Ta=tbl[aa];
Th.gf+=s.hg;Th.ga+=s.ag;Ta.gf+=s.ag;Ta.ga+=s.hg;
if(s.hg>s.ag){Th.w++;Th.pts+=3;Ta.l++;}else if(s.ag>s.hg){Ta.w++;Ta.pts+=3;Th.l++;}else{Th.d++;Ta.d++;Th.pts++;Ta.pts++;}
fx[r+leg*half].push([hh,aa,s.hg,s.ag]);
}
}
}
var out=[];
for(var k in tbl)out.push(tbl[k]);
out.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;if((y.gf-y.ga)!==(x.gf-x.ga))return(y.gf-y.ga)-(x.gf-x.ga);if(y.gf!==x.gf)return y.gf-x.gf;return x.i<y.i?-1:1;});
for(i=0;i<out.length;i++)out[i]["pos"]=i+1;
return{'table':out,'fx':fx};
}
function _lgAll(){
var world={},
orders={},i,lg;
var _fxAll={};
for(i=0;i<a0["LEAGUES"]["length"];i++){
lg=a0["LEAGUES"][i];
var res=_lgSeason(lg["id"]);
world[lg["id"]]=res["table"];
_fxAll[lg["id"]]=res["fx"];
var o=[];for(var j=0;j<res["table"]["length"];j++)o.push(res["table"][j]["i"]);
orders[lg["id"]]=o;
}
a2["lastTables"]=orders;
a2["lgTables"]=world;
 (function(){
 /* 往期联赛归档：赛程打包（近 30 季，体积大头）+ 最终积分榜打包（全量保留）。
    标签语义：第 S 季 → lgFxArch[S]=S 季赛程、lgTblArch[S]=S 季最终榜、lgMoves s=S=S 季末升降。
    注意 lgTblArch 必须用「当季」标签 _fxSeasonLab()（而非上一季 lgFx.season），否则历史榜整体错位一年。 */
 var _lab=_fxSeasonLab();a2["_fxLab"]=_lab;
 if(a2["lgFx"]&&a2["lgFx"]["data"]){
 var _pk={};
 for(var _k in a2["lgFx"]["data"]){var _dd=a2["lgFx"]["data"][_k];if(!_dd)continue;
 _pk[_k]=_dd.map(function(rd){return rd.map(function(m){return m.join(",");}).join(";");}).join("|");}
 _archPush("lgFxArch",a2["lgFx"]["season"],_pk,30);
 }
 var _tb={},_lt=a2["lgTables"];
 if(_lt)for(var _k2 in _lt)if(_lt[_k2])_tb[_k2]=_pkTblArr(_lt[_k2]);
 _archPush("lgTblArch",_lab,_tb);
 a2["_tblAlign"]=1;
 })();a2["lgFx"]={'season':_fxSeasonLab(),'data':_fxAll};
return world;
}


/* 大场面真实化：德比/保级大战从当季真实赛程抽取。
   抽取=把该场贡献从积分榜暂扣（赛程里比分抹成 -1），互动踢完后按真实比分回填并重排序；
   升降级判定（_promoReleg）延后到大场面结束（_promoDue），保证积分榜与升降完全自洽 */

function _fxHit(fx,me,opp){
for(var r=0;r<fx["length"];r++){var rd=fx[r];
for(var m=0;m<rd["length"];m++){var M=rd[m];
if(M[2]<0)continue;
if((M[0]===me&&M[1]===opp)||(M[0]===opp&&M[1]===me))return{'r':r,'m':m,'h':M[0],'a':M[1],'hg':M[2],'ag':M[3]};
}}
return null;
}
function _tblUnmatch(row,hg,ag,home){
if(home){row.gf-=hg;row.ga-=ag;}else{row.gf-=ag;row.ga-=hg;}
if(hg>ag){home?(row.w--,row.pts-=3):row.l--;}
else if(ag>hg){home?row.l--:(row.w--,row.pts-=3);}
else{row.d--;row.pts--;}
}
function _tblAddmatch(row,hg,ag,home){
if(home){row.gf+=hg;row.ga+=ag;}else{row.gf+=ag;row.ga+=hg;}
if(hg>ag){home?(row.w++,row.pts+=3):row.l++;}
else if(ag>hg){home?row.l++:(row.w++,row.pts+=3);}
else{row.d++;row.pts++;}
}
function _tblResort(lg){
var rows=a2["lgTables"][lg];
rows.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;if((y.gf-y.ga)!==(x.gf-x.ga))return(y.gf-y.ga)-(x.gf-x.ga);if(y.gf!==x.gf)return y.gf-x.gf;return x.i<y.i?-1:1;});
for(var i=0;i<rows.length;i++)rows[i]["pos"]=i+1;
var o=[];for(i=0;i<rows.length;i++)o.push(rows[i]["i"]);
a2["lastTables"][lg]=o;
}
/* ── 国字号梯队（U系列）──
   U13/U15 为选拔营 quick 结算（不进交互比赛）；U17/U19/U23 复用大场面交互管线，
   选拔态度作为赛前 intro 决策点。全部经 bigQ 定时槽触发，不占用每年随机事件名额。 */
var _yNT={'u13':{'flag':'_ntU13','comp':'U13国少选拔营','band':"中国U13",'quick':0x1,'win':0x4,'lose':0x1,
  'winLog':["集训营一周，你把同年龄最好的几个全比了一遍。","名单公布，U13国少的号码有你的名字。","你的名字被教练用红笔圈了出来，圈了两道。","走的时候教练塞给你一张训练计划表：回去照着练。"],
  'loseLog':["你拼了命想让人记住，但同年龄里高手太多了。","名单公布，没有你。教练说你还年轻，下次还有机会。","名单贴出来那天你从头看到尾，又从尾看到头。","回家的车上你爸没提这事，只说晚上想吃什么。"],
  'posW':{'gk':["第三天的点球测试，你把对面主力的三粒点球扑出去两个。","高球、地滚球、单刀，四项测试你拿了三项第一。"],
    'def':["对抗测试里你把比你还高半头的盯到没脾气。","分组赛你三次关键拦截，看台上的球探笔记本翻得飞快。"],
    'mid':["分组赛你一个人串起了整条中场，传出的球队友接得舒服极了。","最后一堂训练课教练让你主罚所有定位球，你罚进了三个。"],
    'att':["教学赛你一个人进了四个，对面教练走过来问你的年龄。","折返跑、绕杆、射门，每一样你都是最快的那一个。"]},
  'posL':{'gk':["第三天的点球测试你一个都没扑对方向，手套都被汗水浸透了。","你扑到了第一脚，第二脚和第三脚只能看着球进。"],
    'def':["分组赛你被对面的矮个子连过了三次，速度上的差距补不回来。","你的解围踢上了看台，教练在场边把本子合上了。"],
    'mid':["你的传球总是慢半拍，等你出球，接应点已经被封死了。","分组赛你丢了两次球权，两次都直接变成了对面的进球。"],
    'att':["教学赛你打了三次门框范围内的射门，全被那个高个子门将没收了。","全场你摸到球的机会不到十次，一次都没踢正过门框。"]}},
'u15':{'flag':'_ntU15','comp':'U15国少选拔赛','band':"中国U15",'quick':0x1,'win':0x6,'lose':0x2,
  'winLog':["选拔赛上你一场比一场稳，教练组的本子上你的名字被圈了两道。","名单公布，U15国少有你。","决赛那天你下场的时刻，看台上有人喊了你的名字。","体校食堂那天中午加了鸡腿，打饭的阿姨说是给你贺的。"],
  'loseLog':["选拔赛最后一场你打了门柱，也没能再进下一个。","名单公布，没有你。回家的路上你把球鞋擦了很多遍。","落选的那天晚上你把选拔赛每一场都回想了一遍，想到凌晨。","教练私下来找你：别停下，两年后还有国青。"],
  'posW':{'gk':["半决赛的点球大战你连扑两个，全场都在喊你的名字。","三场比赛你只丢了一个球，那个球还是折射。"],
    'def':["淘汰赛阶段你一场没下，三次门线解围全进了集锦。","对面最快的那个边锋，下半场换了边——不敢再从你这走了。"],
    'mid':["半决赛你两脚助攻，一脚是四十米的长传，落点踩得死死的。","教练说你是这批人里唯一『用眼睛先踢球』的。"],
    'att':["五场比赛七个球，最佳射手奖杯比你手臂还长。","决赛的绝杀你进了之后脱了球衣，黄牌也值了。"]},
  'posL':{'gk':["点球大战你猜错了三次方向，球队止步的时候你坐在草皮上没起来。","第二个失球之后你就乱了，出击时机全错。"],
    'def':["淘汰赛你送的点球成了转折，之后每一场你都踢得缩手缩脚。","对面那个前锋过了你四次，第五次你自己都闭眼了。"],
    'mid':["关键的淘汰赛你半场就被换下，传球成功率低得刺眼。","你的直塞被断了两回，一回就丢了一球。"],
    'att':["三场比赛零进球，你最好的机会打在了门将脸上。","坐在替补席看队友踢完最后一场，球鞋在手里攥变形了。"]}},
'u17':{'flag':'_ntU17','comp':'亚少赛决赛','band':"中国U17",'win':0x8,'lose':0x2,
  'pool':["日本U17","韩国U17","伊朗U17","沙特U17","澳大利亚U17","乌兹别克斯坦U17","泰国U17","越南U17"]},
'u19':{'flag':'_ntU19','comp':'亚青赛决赛','band':"中国U19",'win':0x9,'lose':0x2,
  'pool':["日本U19","韩国U19","伊朗U19","沙特U19","澳大利亚U19","伊拉克U19","卡塔尔U19","约旦U19"]},
'u23':{'flag':'_ntU23','comp':'U23亚洲杯决赛','band':"中国U23",'win':0xb,'lose':0x3,
  'pool':["日本U23","韩国U23","伊朗U23","沙特U23","澳大利亚U23","卡塔尔U23","阿联酋U23","印尼U23"]}};
/* 对手特色句（按国名前缀匹配，拼进 intro） */
var _yOpp={'日本':"他们从小踢的是另一种足球，停球转身不带一丝犹豫——跟他们耗脚下，不如先跑死他们。",
  '韩国':"韩国青年队的体能是出了名的，据说他们集训时一天一个一万米。别跟他们拼跑，拼脑子。",
  '伊朗':"对面几个的身体条件不像这个年龄段的，对抗别硬顶，学会用转身卸力。",
  '沙特':"他们踢得慢悠悠的，但慢不代表松——别被节奏带进他们的套路里。",
  '澳大利亚':"高球和第二落点是他们的招牌，全队都得练头球，门将别站在门线上。",
  '乌兹别克斯坦':"中亚孩子的脚下活被人低估了，他们的10号据说已经进了国奥名单。",
  '泰国':"小快灵，专克转身慢的后卫，中场别粘球。",
  '越南':"这几年他们的青训进步吓人，别拿老眼光看人。",
  '伊拉克':"战火里练出来的那股狠劲，比战术更难对付。",
  '卡塔尔':"他们的青训营是拿石油堆出来的，归化了好几个非洲苗子。",
  '阿联酋':"富得流油的青训体系，但大赛心理素质是他们的老毛病。",
  '印尼':"主场球迷能把客场队骂到失眠——好在这次不在雅加达。",
  '约旦':"防守反击踢得扎扎实实，先丢球的那个多半要埋单。"};
/* 青年赛终场文案（win/lose/penWin/penLose 各一池） */
var _yFin={'w':["终场哨响，{s}。你被队友压在最底下，球衣被人扯得变了形——这个年纪的冠军，就该这么庆祝。",
  "终场哨响，{s}。替补席全部冲进了场内，教练举着矿泉水瓶当香槟喷。回程大巴上一路都是歌。",
  "终场哨响，{s}。你把奖杯举过头顶的那一刻，看台上那面巨大的国旗展开了。你在人堆里找到了你爸妈的位置。",
  "终场哨响，{s}。颁奖台的台阶有点晃，你捧着奖杯往下看，忽然想起十二岁那年在公告栏前找自己名字的下午。"],
  'l':["终场哨响，{s}。回程大巴上没人说话，教练也没责怪谁。你们都知道差在哪，而这条路还没走完。",
  "终场哨响，{s}。对面在场地中央庆祝，你在草皮上躺了很久。十五六岁的失利不会上头条，但你会记很多年。",
  "终场哨响，{s}。更衣室里有人哭了，有人把球鞋摔进了桶里。你什么都没做，只是把奖牌摘下来塞进了包底。",
  "终场哨响，{s}。发布会上有记者问『中国足球的希望在哪』，你听着这句话走出通道，觉得它比比分更重。"],
  'pw':["点球大战，{s}。最后一罚进门的那一秒，你身后所有的人都疯了。你蹲在草皮上，忽然手抖得站不起来。",
  "点球大战，{s}。你是第五个走上点的，也最后一脚——球进的那一刻，整个替补席从你身后扑了过来。"],
  'pl':["点球大战，{s}。轮到对手的第五罚时，你背过了身。你听见了那一声闷响，和看台炸开的声音。",
  "点球大战，{s}。你的那一脚被扑了出来。教练搂着你的头说抬起走，你抬起来了，眼泪没忍住。"]};
function _yKind(bx){return _yNT[bx]?bx:null;}
function _ntPrevCore(k){
  var _prev={'u15':'_ntU13core','u17':'_ntU15core','u19':'_ntU17core','u23':'_ntU19core'}[k];
  return _prev?!!a2["flags"][_prev]:!0x1;
}
/* 青训年结束（年龄已++）时调用：按年龄窗推入对应梯队的选拔/决赛，成功入队即置 flag 防重推 */
function _ntYouthCheck(){
  if(!au())return;
  if(a2["bigQ"]&&a2["bigQ"]["length"])return;
  var ag=a2["age"],k=null,
    _ws={'u13':[0xd,0xe],'u15':[0xf,0x10],'u17':[0x10,0x11],'u19':[0x12,0x14]};
  for(var _k in _ws){if(ag>=_ws[_k][0x0]&&ag<=_ws[_k][0x1]&&!a2["flags"][_yNT[_k]["flag"]]){k=_k;break;}}
  if(!k)return;
  var _y=_yNT[k];
  if(a2["flags"][_y["flag"]])return;
  var _opp=_y["pool"]?_y["pool"][Math["floor"](ad()*_y["pool"]["length"])]:'';
  var _oppStr=Math.round(a2["ovr"]+(k==='u17'?0x4:0x8)+ad()*0x14);
  if(_ntPrevCore(k))_oppStr-=0x4;
  if(aV(k,0.6,{'comp':_y["comp"],'opp':_opp,'oppStr':Math.max(0x14,_oppStr),'_quick':_y["quick"]||0x0}))a2["flags"][_y["flag"]]=0x1;
}
/* 职业期 U23 国奥：结算季末钩子（与 _bigHooks 同层，bigQ 被占则顺延到窗内下一年） */
function _ntCareerHook(){
  if(!au())return;
  if(a2["flags"]["_ntU23"])return;
  if(a2["bigQ"]&&a2["bigQ"]["length"])return;
  var ag=a2["age"];
  if(ag<0x15||ag>0x17)return;
  var _y=_yNT['u23'];
  var _opp=_y["pool"][Math["floor"](ad()*_y["pool"]["length"])];
  var _oppStr=Math.round(a2["ovr"]+0x8+ad()*0x14);
  if(_ntPrevCore('u23'))_oppStr-=0x4;
  if(_aVPri('u23',0.6,{'comp':_y["comp"],'opp':_opp,'oppStr':Math.max(0x14,_oppStr)}))a2["flags"]["_ntU23"]=0x1;
}
/* 递进前缀：上一档 core/落选、买名额旧事重提（u23） */
function _yIntroHead(bx){
  var k=bx["kind"],_s='';
  if(k==='u17'){if(a2["flags"]['_ntU15'])_s=a2["flags"]['_ntU15core']?"教练组里有几张面孔，是两年前U15选拔时就见过你的。":"两年前你在U15落选过——公告栏前的那个下午，你记得比谁都清楚。";}
  else if(k==='u19'){if(a2["flags"]['_ntU17'])_s=a2["flags"]['_ntU17core']?"从亚少赛到亚青赛，教练组把你当成了这批人的骨架。":"亚少赛那次失利之后，有人在名单讨论时提过你的名字——这一次你自己站了回来。";}
  else if(k==='u23'&&a2["flags"]['_ntBought'])_s="有人还记得你U17那年那通电话。这一次，你只想干干净净地赢。";
  return _s?_s+'':'';
}
function _yOppLine(opp){
  if(!opp)return'';
  for(var k in _yOpp)if(opp["indexOf"](k)===0x0)return'\x20'+_yOpp[k];
  return'';
}
/* 赛前选拔态度（U系列交互场的 intro 决策）：影响本场胜率与递进 flag */
function _ntSelOpts(bx){
  var _o=[{'key':"allin",'label':"豁出去，把这场当成一辈子只有一次的机会",'hint':"全力以赴，赢面最大"},
    {'key':"steady",'label':"按教练的布置稳稳打",'hint':"稳，教练组会记住你的纪律性"},
    {'key':"enjoy",'label':"当普通一场球去踢",'hint':"平常心，不背包袱"}];
  if(bx["kind"]==='u17')_o.push({'key':"agent",'label':"找中间人运作一个主力位置",'hint':"花一笔钱，清白受损，但位置稳"});
  return _o;
}
function _ntApplySel(bI,key,_p){
  var _b=0,_l='',
    _pickY=function(a){return a[Math["floor"](ad()*a["length"])]},
    _fb={allin:["赛前热身你练得比谁都狠，对抗时把自家中卫都撞翻了。教练看了你一眼，没说话，但把你的名字写进了首发。",
      "你第一个走进通道，又最后一个走出去——每一次折返跑都在告诉教练组：这场的火，我来带头点。",
      "训练服湿透了三件。队友说你疯了，只有你自己知道，这种机会一辈子可能就这一次。"],
    steady:["你按教练的布置一项一项做，没有惊喜，也没有失误。赛前会上，教练的笔在你的名字底下画了条横线。",
      "录像课你把"+(bI["opp"]||'对手')+"的每一条跑位线都抄进了本子。教练翻了两页，什么都没说，把本子还给了你。",
      "你把更衣室里该喊的话喊了，该钉的人钉了。有人笑你装成熟，但热身时大家都跟着你的节奏。"],
    agent:["赛前有人拍了拍你的肩膀：放心踢，位置给你留好了。你没细想那通电话的价钱。",
      "名单公布前你收到了那条短信，只有四个字：已打好招呼。你把手机扣在枕头底下，睡得比平时差。",
      "中间人的钱是走你母亲的账转出去的。这件事家里没有人再提，但它像一颗石子沉在每个人心里。"],
    enjoy:["你深吸一口气，把它当成一场普通的球。倒计时牌翻到零的时候，你的心率比热身时还低。",
      "你戴上耳机听完了一首歌，把紧张和期待一起关在了门外面。走上球场时，你的脸上什么都没有。",
      "赛前你在球员通道里看着对面系鞋带，忽然觉得他们也在紧张。这么一想，你反而笑了。"]};
  if(key==="allin"){_b=0.18;}
  else if(key==="steady"){_b=0.08;}
  else if(key==="agent"){_b=0.12;
    a2["money"]=ac(Math.round(a2["money"]-0x14),-0x320,0x895440);a2["clean"]=ac(a2["clean"]-0xc,0x0,0x64);a2["flags"]["_ntBought"]=0x1;}
  else{_b=0.02;}
  _l=_fb[key]||_fb["enjoy"];
  _l=_pickY(_l);
  bI["_selB"]=_b;
  if(bI["oppStr"])bI["oppStr"]=Math.max(0x14,Math.round(bI["oppStr"]*(0x1-_b)));
  _l&&bI["log"]&&bI["log"]["push"](_l);
}
function _bigHooks(bz){
var me=a2["teamId"],tm=me?aj(me):null;
if(!me||!tm)return;
/* 大场面队列被占（如国家队决赛）时不得抽取，否则被借走的比赛没人回填 */
if(a2["bigQ"]&&a2["bigQ"]["length"])return;
var lg=ap(tm),rows=a2["lgTables"]&&a2["lgTables"][lg],
fx=a2["lgFx"]&&a2["lgFx"]["data"]&&a2["lgFx"]["data"][lg];
if(!lg||!rows||!fx)return;
var rank=(a0["ROLES"][aI(tm)]||{})["rank"]||0;
var myRow=null,i;
for(i=0;i<rows["length"];i++)if(rows[i]["i"]===me){myRow=rows[i];break;}
if(!myRow)return;
var pick=null,oppId=null,comp='';
/* 保级大战：季末落入降级区、且赢球还有救（距安全线≤3分），抽一场对区内直接对手 */
var zone=_relegZone[lg];
if(zone&&myRow["pos"]>=zone[0]){
var safeRow=zone[0]>=2?rows[zone[0]-2]:null;
if(safeRow&&myRow["pts"]>=safeRow["pts"]-3){
var cand=[];
for(i=0;i<rows["length"];i++)if(rows[i]!==myRow&&rows[i]["pos"]>=zone[0])cand.push(rows[i]);
if(cand["length"]){pick=cand[Math["floor"](ad()*cand["length"])];oppId=pick["i"];comp='保级大战';}
}
}
/* 德比：主力以上 + 真实赛程里有对死敌的比赛（_dby 按 leagueOf 动态过滤，支持跨级消失）；
   多个死敌同榜时随机挑一场（修复列表序偏置：皇马永远先抽巴萨、抽不到马竞） */
if(!pick&&rank>=0x3&&_dby[me]){
var dM=_dby[me]["filter"](function(dW){return aj(dW[0])&&ap(aj(dW[0]))===lg;});
var dCands=[];
for(i=0;i<dM["length"];i++){
var hit=_fxHit(fx,me,dM[i][0]);
if(hit)dCands["push"]({'i':dM[i][0],'comp':dM[i][0x1]});
}
if(dCands["length"]){var dc=dCands[Math["floor"](ad()*dCands["length"])];pick={'i':dc["i"]};oppId=dc["i"];comp=dc["comp"];}
}
if(!pick)return;
var hit2=_fxHit(fx,me,oppId);
if(!hit2)return;
var opp=aj(oppId),oppRow=null;
for(i=0;i<rows["length"];i++)if(rows[i]["i"]===oppId){oppRow=rows[i];break;}
if(!oppRow)return;
var meHome=hit2["h"]===me;
var kind=comp==='保级大战'?'drop':'derby';
var _prob=kind==='drop'?0.55:0.2;
if(ad()>=_prob)return;
_tblUnmatch(myRow,hit2["hg"],hit2["ag"],meHome);
_tblUnmatch(oppRow,hit2["hg"],hit2["ag"],!meHome);
fx[hit2["r"]][hit2["m"]][2]=-1;fx[hit2["r"]][hit2["m"]][3]=-1;
if(!_aVPri(kind,_prob,{'comp':comp,'opp':opp?opp["name"]:'','oppId':oppId,'oppStr':opp?Math.round(_teamAbs(opp)):null,'fromLeague':lg,
'_fx':{'lg':lg,'r':hit2["r"],'m':hit2["m"],'meHome':meHome},
'_aiCtx':{'t':'bm','lg':lg,'r':hit2["r"],'m':hit2["m"],'meHome':meHome,'oppId':oppId,'hg':hit2["hg"],'ag':hit2["ag"]},
'_ctx':'积分榜上你第'+myRow["pos"]+'（'+myRow["pts"]+'分），'+(opp?opp["name"]:'对手')+'第'+oppRow["pos"]+'（'+oppRow["pts"]+'分）'})){
  /* 意外未入队（队列被占等）：还原该场与赛程，防止积分榜悬空 */
  _tblAddmatch(myRow,hit2["hg"],hit2["ag"],meHome);
  _tblAddmatch(oppRow,hit2["hg"],hit2["ag"],!meHome);
  fx[hit2["r"]][hit2["m"]][2]=hit2["hg"];fx[hit2["r"]][hit2["m"]][3]=hit2["ag"];
}
}

/* 联赛冠军/赛季记录/历史镜像必须基于「最终榜」结算：
   德比/保级大战可能被抽取为大场面并改变积分榜，若在改表前判冠军，
   会出现"榜上第一却不是冠军"或相反。此函数在季末大场面（含延后待踢）
   全部落定后调用，重取本队最终行并补发冠军、同步赛季快照与 lgTblArch。 */
function _lgFinalRefresh(bz){
  if(!bz||bz["leagueId"]==null)return;
  var rows=a2["lgTables"]&&a2["lgTables"][bz["leagueId"]];
  if(!rows)return;
  var row=null,i,tid=bz["teamId"];
  for(i=0;i<rows["length"];i++)if(rows[i]["i"]===tid){row=rows[i];break;}
  if(!row)return;
  bz["leaguePos"]=row["pos"];
  bz["leagueW"]=row["w"];
  bz["leagueD"]=row["d"];
  bz["leagueL"]=row["l"];
  bz["leagueGF"]=row["gf"];
  bz["leagueGA"]=row["ga"];
  bz["leaguePts"]=row["pts"];
  if(row["pos"]===0x1&&a0["ROLES"][a2["role"]]["rank"]>=0x2){
    var cb=(bz["league"]||(ak(bz["leagueId"])||{}).name)+'冠军';
    if(!bz["trophies"]||bz["trophies"]["indexOf"](cb)<0x0){
      bz["trophies"]=bz["trophies"]||[];
      bz["trophies"]["push"](cb);
      a2["trophies"]["push"]({'name':cb,'age':bz["age"],'team':bz["teamName"]});
    }
  }
  /* 历史镜像同步：归档中的本季榜与最终榜一致（避免历史榜/当季榜分叉） */
  if(a2["_fxLab"]!=null&&a2["lgTblArch"]){
    for(i=0;i<a2["lgTblArch"]["length"];i++)if(a2["lgTblArch"][i]["season"]===a2["_fxLab"]){
      if(a2["lgTblArch"][i]["data"])a2["lgTblArch"][i]["data"][bz["leagueId"]]=_pkTblArr(rows);
      break;
    }
  }
}


/* 球队实力起落：表现修正 + 随机漫步 + 均值回归 + 奖杯/升降 bonus，上下限 ±8；
   高 dev 加快回落（0.85-0.04|dev|），霸主均衡点落在 +3~4 而非钉死上限；
   每季倒数三名 +0.6 重建补偿，防弱者恒弱、制造王朝更替 */

function _devTick(){
a2["teamDev"]=a2["teamDev"]||{};
var prev=a2["lastTables"],bonus=a2["_devBonus"]||{};
/* 上季倒数三名 +0.6 重建补偿（直接并入本季 bonus） */
if(prev)for(var pb in prev){var tb=prev[pb];for(var pi=tb.length-3;pi<tb.length;pi++)if(pi>=0)bonus[tb[pi]]=(bonus[tb[pi]]||0)+0.6;}
var byLg={},i,
t;
for(i=0;i<a0["TEAMS"]["length"];i++){t=a0["TEAMS"][i];var lgi=ap(t);(byLg[lgi]=byLg[lgi]||[]).push(t);}

/* 预期名次用含 dev 的自洽强度：表现修正衡量"运气"，超预期会把自身预期抬上去而自我收敛，防止弱队爆冷后被钉在 dev 上限的棘轮 */

for(var lgId in byLg)byLg[lgId].sort(function(x,y){
var lx=ak(x["league"])||{},ly=ak(y["league"])||{};
var sx=((lx["str"]||60)+(_er(x)-2)*0x3+(a2["teamDev"][x["id"]]||0));
var sy=((ly["str"]||60)+(_er(y)-2)*0x3+(a2["teamDev"][y["id"]]||0));
return sy-sx;
});
for(i=0;i<a0["TEAMS"]["length"];i++){
t=a0["TEAMS"][i];
var lg2=aq(t);if(!lg2)continue;
var dev=a2["teamDev"][t["id"]]||0;
var act=prev&&prev[lg2["id"]]?prev[lg2["id"]].indexOf(t["id"])+1:0;
var list=byLg[lg2["id"]],
exp=0;
for(var k=0;k<list.length;k++)if(list[k]["id"]===t["id"]){exp=k+1;break;}
var delta=act>0?exp-act:0;
var nv=dev*(0.85-0.04*(dev<0?-dev:dev))+ac(delta*0.3,-0.75,0.75)+(ad()*2.4-1.2)+(bonus[t["id"]]||0);
a2["teamDev"][t["id"]]=ac(nv,-8,8);
}
/* 连冠结算：上季拿过任意冠军的 +1，其余清零；冠军加成在 _devAdd 时按旧连冠数打折 */
var tw=a2["_titWin"]||{},ts=a2["titleStreak"]=a2["titleStreak"]||{};
for(var tk in ts)if(!tw[tk])ts[tk]=0;
for(var wk in tw)ts[wk]=(ts[wk]||0)+1;
a2["_titWin"]={};
a2["_devBonus"]={};
}


/* 两回合淘汰（A 先主），汇总平局→次回合加时→点球；gl=双方联赛风格几何平均 */
function _tieSim(sa,sb,gl){
var g1=_matchSim(sa,sb,gl),g2=_matchSim(sb,sa,gl);
var aa=g1.hg+g2.ag,ab=g1.ag+g2.hg;
var r={'aggA':aa,'aggB':ab,'won':aa>ab,'pens':null};
if(aa===ab){
var et=_etSim(sa,sb,gl);
aa+=et.hg;ab+=et.ag;
r["aggA"]=aa;r["aggB"]=ab;
if(et.hg!==et.ag)r["won"]=et.hg>et.ag;
else{var pk=_penSim(sa,sb);r["pens"]=[pk.a,pk.b];r["won"]=pk.a>=pk.b;}
}
return r;
}
function _scoreTxt(tie,
meIsA){
var base=(meIsA?tie["aggA"]+'-'+tie["aggB"]:tie["aggB"]+'-'+tie["aggA"]);
if(tie["pens"])base+=' (点球 '+tie["pens"][0]+'-'+tie["pens"][1]+')';
return base;
}


/* 比赛列表扁平化：[h,a,hg,ag,...]（存档紧凑格式） */
function _flatMs(ms){
var o=[];for(var i=0;i<ms.length;i++){o.push(ms[i]["homeId"]||ms[i]["hid"],ms[i]["awayId"]||ms[i]["aid"],ms[i]["hg"],ms[i]["ag"]);}
return o;
}

/* 瑞士轮联赛阶段：蛇形定序+circle 法单循环，抽样 games 轮（尽量回避同联赛） */

function _swissPhase(cards,games){
var n=cards.length,i,j,r;
var strOf={},lgOf={},nameOf={},ids=[];
for(i=0;i<n;i++){ids.push(cards[i]["i"]);strOf[cards[i]["i"]]=cards[i]["s"];lgOf[cards[i]["i"]]=cards[i]["lg"];nameOf[cards[i]["i"]]=cards[i]["n"];}
var sortedIds=ids.slice().sort(function(a,b){return strOf[b]-strOf[a];});
var order=[],
lo=0,hi=n-1,flip=false;
while(lo<=hi){order.push(flip?sortedIds[hi--]:sortedIds[lo++]);flip=!flip;}
var arr=order.slice();if(arr.length%2===1)arr.push(null);
var m2=arr.length,
rounds=[];
for(r=0;r<m2-1;r++){
var rd=[];
for(j=0;j<m2/2;j++){var h=arr[j],aw=arr[m2-1-j];if(h!==null&&aw!==null)rd.push(r%2===0?[h,aw]:[aw,h]);}
rounds.push(rd);
arr.splice(1,0,arr.pop());
}
var idxs=[];for(r=0;r<rounds.length;r++)idxs.push(r);
var pick=idxs.slice(0,games);
for(var t2=0;t2<40;t2++){
ag(idxs);
pick=idxs.slice(0,games);
var ok=true;
for(i=0;i<games&&ok;i++){var rd2=rounds[pick[i]];for(j=0;j<rd2.length;j++)if(lgOf[rd2[j][0]]===lgOf[rd2[j][1]]){ok=false;break;}}
if(ok)break;
}
var tbl={},
matches=[];
for(i=0;i<n;i++)tbl[ids[i]]={'i':ids[i],'n':nameOf[ids[i]],'s':strOf[ids[i]],'pts':0,'gf':0,'ga':0,'w':0,'d':0,'l':0};
for(i=0;i<pick.length;i++){
var rd3=rounds[pick[i]];
for(j=0;j<rd3.length;j++){
var H=rd3[j][0],A=rd3[j][1];
var gl=Math.sqrt((_lgStyle[lgOf[H]]||1)*(_lgStyle[lgOf[A]]||1));
var sim=_matchSim(strOf[H],strOf[A],gl);
var Th=tbl[H],Ta=tbl[A];
Th.gf+=sim.hg;Th.ga+=sim.ag;Ta.gf+=sim.ag;Ta.ga+=sim.hg;
if(sim.hg>sim.ag){Th.w++;Th.pts+=3;Ta.l++;}else if(sim.ag>sim.hg){Ta.w++;Ta.pts+=3;Th.l++;}else{Th.d++;Ta.d++;Th.pts++;Ta.pts++;}
matches.push({'home':nameOf[H],'homeId':H,'away':nameOf[A],'awayId':A,'hg':sim.hg,'ag':sim.ag});
}
}
var st=[];
for(var k in tbl)st.push(tbl[k]);
st.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;if((y.gf-y.ga)!==(x.gf-x.ga))return(y.gf-y.ga)-(x.gf-x.ga);if(y.gf!==x.gf)return y.gf-x.gf;return x.i<y.i?-1:1;});
for(i=0;i<st.length;i++)st[i]["rank"]=i+1;
return{'standings':st,'matches':matches};
}


/* 当季赛程留存（仅内存：联赛轮次/杯赛签表/洲赛对阵，查询用，不入存档） */
/* 当季赛程/签表持久化在 a2.lgFx / a2.cupFx / a2.contFx(season=季序,data 紧凑格式) */

/* 单场淘汰签表（支持轮空），返回冠军、玩家征程与完整签表 */

function _cupBracket(cards,playerTid){
var n=cards.length,size=4;while(size<n)size*=2;
var alive=cards.slice().sort(function(a,b){return b.s-a.s;});
while(alive.length<size)alive.push(null);
var rn=_bracketNames(size),
path=[],all=[],rIdx=0;
while(alive.length>1){
var winners=[],cnt=alive.length,ties=[];
for(var m=0;m<cnt/2;m++){
var A=alive[m],B=alive[cnt-1-m],W=null,sc='',pk=null;
if(A&&B){
/* 单场淘汰：联赛风格几何平均，决赛中立场，加时+点球 */
var ko=_koSim(A.s,B.s,_glOf(A.lg,B.lg),cnt===2);
W=ko.won?A:B;
sc=ko.hg+'-'+ko.ag+(ko.pk?' (点球 '+ko.pk[0]+'-'+ko.pk[1]+')':(ko.et?' (加时)':''));
pk=ko.pk;
ties.push({'h':A.i,'a':B.i,'hg':ko.hg,'ag':ko.ag,'et':ko.et,'p':ko.pk,'w':W.i});
}else{
W=A||B;
ties.push({'h':W.i,'w':W.i,'b':1});
}
winners.push(W);
if(A&&B&&(A.i===playerTid||B.i===playerTid)){
var me=A.i===playerTid?A:B,fo=A.i===playerTid?B:A;
path.push({'round':rn[rIdx]||('第'+(rIdx+1)+'轮'),'opp':fo.n,'oppId':fo.i,'won':W.i===playerTid,'score':(me===A)?sc:(sc.split(' ')[0].split('-').reverse().join('-')+(sc.indexOf(' (')>=0?sc.slice(sc.indexOf(' (')):''))});
}
}
all.push({'name':rn[rIdx]||('第'+(rIdx+1)+'轮'),'ties':ties});
alive=winners;rIdx++;
}
return{'champion':alive[0]?alive[0].i:null,'path':path,'all':all};
}


/* 洲际名额装配（上季榜+上季杯赛冠军，杯冠顺位下移、每联赛正赛上限 7） */

function _buildSlots(){
var direct={'ucl':[],'uel':[],'uecl':[],'acl':[],'ccl':[],'lib':[]},qp={'uclq':[],'uelq':[],'ueclq':[],'aclq':[],'cclq':[],'libq':[]};
var assigned={},
orders=a2["lastTables"],i;
for(var lgId in _lgSlots){
var cfg=_lgSlots[lgId],order=null;
if(orders&&orders[lgId])order=orders[lgId];
else{var tms=_lgTeamsOf(lgId).slice().sort(function(a,b){return _teamAbs(b)-_teamAbs(a);});order=[];for(i=0;i<tms.length;i++)order.push(tms[i]["id"]);}
var map={},qmap={};
['ucl','uel','uecl','acl','ccl','lib'].forEach(function(c){var arr=cfg[c]||[];for(var z=0;z<arr.length;z++)map[arr[z]]=c;});
['uclq','uelq','ueclq','aclq','cclq','libq'].forEach(function(c){var arr=cfg[c]||[];for(var z=0;z<arr.length;z++)qmap[arr[z]]=c;});
var cnt=0;
for(var pos=1;pos<=order.length;pos++){
var tid=order[pos-1];
if(map[pos]&&cnt<7){direct[map[pos]].push(_cardById(tid));assigned[tid]=map[pos];cnt++;}
else if(qmap[pos]&&!map[pos])qp[qmap[pos]].push(_cardById(tid));
}
}
var cups=a2["lastCups"]||{};
for(var lgId2 in _cupSlot){
var cs=cups[lgId2];if(!cs)continue;
var cfg2=_cupSlot[lgId2];
['cup','leagueCup'].forEach(function(kind){
var comp=cfg2[kind];if(!comp)return;
var tid=cs[kind==='cup'?'cup':'lgCup'];if(!tid)return;
var tObj=aj(tid);if(!tObj)return;
if(comp.slice(-1)==='q'){
var _ex=false;for(var _q2=0;_q2<qp[comp]["length"];_q2++)if(qp[comp][_q2].i===tid){_ex=true;break;}
if(!_ex)qp[comp].push(_cardById(tid));
return;
}
var lgOfT=ap(tObj),order2=orders&&orders[lgId2]?orders[lgId2]:null;
if(assigned[tid]){
var old=assigned[tid];
var _rk={'ucl':3,'uel':2,'uecl':1,'acl':3,'lib':3};
if((_rk[comp]||0)>(_rk[old]||0)){
/* 杯冠凭杯赛升级（如联赛第7的欧协资格→杯赛欧联）：移动该队，原资格顺延给联赛下一名 */
assigned[tid]=comp;
for(i=0;i<direct[old].length;i++)if(direct[old][i].i===tid){direct[old].splice(i,1);break;}
direct[comp].push(_cardById(tid));
if(order2)for(var pos2=1;pos2<=order2.length;pos2++){
var nx=order2[pos2-1];
if(!assigned[nx]){direct[old].push(_cardById(nx));assigned[nx]=old;break;}
}
}else if(old!==comp){
/* 杯冠已凭联赛拿到更优资格（如前四的欧冠）：保留联赛资格不降级，杯赛名额顺延给联赛下一名 */
if(order2)for(var pos2b=1;pos2b<=order2.length;pos2b++){
var nx2=order2[pos2b-1];
if(!assigned[nx2]){direct[comp].push(_cardById(nx2));assigned[nx2]=comp;break;}
}
}
}else{
var c7=0;
for(var t3 in assigned){var t3o=aj(t3);if(t3o&&ap(t3o)===lgOfT)c7++;}
if(c7<7){direct[comp].push(_cardById(tid));assigned[tid]=comp;}
else if(order2){
for(var pos3=order2.length;pos3>=1;pos3--){
var dp=order2[pos3-1];
if(assigned[dp]){
var oc=assigned[dp];
for(i=0;i<direct[oc].length;i++)if(direct[oc][i].i===dp){direct[oc].splice(i,1);break;}
qp[oc+'q'].push(_cardById(dp));
delete assigned[dp];
direct[comp].push(_cardById(tid));assigned[tid]=comp;
break;
}
}
}
}
});
}
for(var qk in qp)qp[qk]=qp[qk].filter(function(c){return !assigned[c.i];});
return{'direct':direct,'qp':qp,'taken':assigned};
}


/* 资格赛：1-2 轮两回合淘汰，池不足自动缩轮 */

function _qualify(need,pool){
if(need<=0||!pool||!pool.length)return{'winners':[],'path':null};
var _seen={},_uniq=[];
for(var _q3=0;_q3<pool["length"];_q3++)if(!_seen[pool[_q3].i]){_seen[pool[_q3].i]=1;_uniq.push(pool[_q3]);}
pool=_uniq;
var rounds=pool.length>=need*4?2:1;
var entrants=need*Math.pow(2,rounds);
if(pool.length<entrants){rounds=1;entrants=Math.min(pool.length-pool.length%2,need*2);}
if(entrants<2)return{'winners':[],'path':null};
var alive=pool.slice().sort(function(a,b){return b.s-a.s;}).slice(0,entrants);
var path=null,
ri=0;
while(alive.length>need){
var winners=[];
for(var m=0;m<alive.length/2;m++){
var A=alive[m],B=alive[alive.length-1-m];
var tie=_tieSim(A.s,B.s,_glOf(A.lg,B.lg));
var W=tie.won?A:B;
winners.push(W);
if(A.i===a2["teamId"]||B.i===a2["teamId"]){
if(!path)path=[];
var me=A.i===a2["teamId"]?A:B,fo=A.i===a2["teamId"]?B:A;
path.push({'round':'资格赛'+(rounds>1?(ri===0?'二':'一'):''),'opp':fo.n,'oppId':fo.i,'won':W.i===a2["teamId"],'score':_scoreTxt(tie,me===A)});
}
}
alive=winners;ri++;
}
return{'winners':alive,'path':path};
}


/* 单届洲际赛：瑞士轮 → 附加赛(9-24名) → 两回合淘汰，决赛单场 */

function _contComp(tag,cfg,direct,qPath,bz,bx){
var ph=_swissPhase(direct,cfg["games"]);
var st=ph["standings"];
var run={'comp':cfg["name"],'rounds':qPath?qPath.slice():[],'group':{'pos':0,'standings':[],'fullStandings':st,'matches':ph["matches"]},'age':a2["age"]};
var pIdx=-1;
for(var i=0;i<st.length;i++){run["group"]["standings"].push(st[i]["n"]);if(st[i]["i"]===a2["teamId"])pIdx=i;}
run["group"]["pos"]=pIdx>=0?pIdx+1:0;
var top8=st.slice(0,8),
po=st.slice(8,Math.min(24,st.length));
var playerOut=null,wPo=[];
for(var m2=0;m2<po.length/2;m2++){
var A=po[m2],B=po[po.length-1-m2];
var tie=_tieSim(A.s,B.s,_glOf(A.lg,B.lg)),W=tie.won?A:B;
wPo.push(W);
if(A.i===a2["teamId"]||B.i===a2["teamId"]){
var me=A.i===a2["teamId"]?A:B,fo=A.i===a2["teamId"]?B:A;
run["rounds"].push({'round':'附加赛','opp':fo.n,'oppId':fo.i,'won':W.i===a2["teamId"],'score':_scoreTxt(tie,me===A)});
if(!(W.i===a2["teamId"]))playerOut='附加赛';
}
}
wPo.sort(function(a,b){return a.rank-b.rank;});
var cur=[];
for(m2=0;m2<8&&m2<top8.length;m2++)cur.push([top8[m2],wPo[wPo.length-1-m2]]);
var rn=['十六强','八强','四强','决赛'],
ri=0,champion=null,allR=[];
while(cur.length>=1){
var next=[],ties=[];
for(m2=0;m2<cur.length;m2++){
var A2=cur[m2][0],B2=cur[m2][1],W2=null,sc='';
var pMe=A2.i===a2["teamId"]?A2:(B2.i===a2["teamId"]?B2:null);
var isFinal=cur.length===1;
if(isFinal&&pMe&&b3()){
var fo2=pMe===A2?B2:A2;
if(_aVPri("cont",0.55,{'comp':cfg["name"],'opp':fo2.n,'oppStr':fo2.s,'oppId':fo2.i,'_meS':pMe.s,'_aiCtx':{'t':'cont','tag':tag}})){
run["rounds"].push({'round':'决赛','opp':fo2.n,'oppId':fo2.i,'won':false,'score':''});
run["result"]='决赛';
ties.push({'h':pMe.i,'a':fo2.i,'pd':1});
allR.push({'name':'决赛','ties':ties});
a2["contFx"]["data"][tag]={'name':cfg["name"],'group':{'standings':st,'matches':_flatMs(ph["matches"])},'rounds':allR,'champion':null};
a2["_contRun"]=run;
return{'champion':null};
}
}
if(isFinal){
var ko2=_koSim(A2.s,B2.s,_glOf(A2.lg,B2.lg),true);
W2=ko2.won?A2:B2;sc=ko2.hg+'-'+ko2.ag+(ko2.pk?' (点球 '+ko2.pk[0]+'-'+ko2.pk[1]+')':(ko2.et?' (加时)':''));
ties.push({'h':A2.i,'a':B2.i,'sa':ko2.hg,'sb':ko2.ag,'p':ko2.pk,'w':W2.i});
}else{
var tie2=_tieSim(A2.s,B2.s,_glOf(A2.lg,B2.lg));
W2=tie2.won?A2:B2;sc=_scoreTxt(tie2,true);
ties.push({'h':A2.i,'a':B2.i,'sa':tie2["aggA"],'sb':tie2["aggB"],'p':tie2["pens"],'w':W2.i});
}
next.push(W2);
if(pMe){
var fo3=pMe===A2?B2:A2;
run["rounds"].push({'round':rn[ri]||'决赛','opp':fo3.n,'oppId':fo3.i,'won':W2.i===a2["teamId"],'score':(pMe===A2)?sc:sc.split(' ')[0].split('-').reverse().join('-')+(sc.indexOf(' (')>=0?sc.slice(sc.indexOf(' (')):'')});
if(!(W2.i===a2["teamId"]))playerOut=rn[ri]||'决赛';
}
}
allR.push({'name':rn[ri]||'决赛','ties':ties});
if(next.length===1){champion=next[0];break;}
cur=[];for(m2=0;m2<next.length;m2+=2)cur.push([next[m2],next[m2+1]]);
ri++;
}
a2["contFx"]["data"][tag]={'name':cfg["name"],'group':{'standings':st,'matches':_flatMs(ph["matches"])},'rounds':allR,'champion':champion?champion.i:null};
if(champion){
if(champion.i===a2["teamId"]){
run["result"]='冠军';
/* 青训期 _runWorld(null,null,null) 时 bz/bx 为 null：只记录历史不入生涯奖杯 */
if(bz)bz["trophies"].push(cfg["name"]+'冠军');
if(bx)a2["trophies"].push({'name':cfg["name"]+'冠军','age':a2["age"],'team':bx["name"]});
a2["cupRuns"].push(run);
}else if(pIdx>=0||playerOut){
run["result"]=playerOut?'止步'+playerOut:'联赛阶段出局';
a2["cupRuns"].push(run);
}
}
return{'champion':champion?champion.i:null};
}


/* 全部洲际赛 + 世俱杯（名额基于上季榜/上季杯冠） */

function _runConts(bz,bx,by){
a2["contHist"]=a2["contHist"]||[];
(function(){if(!a2["contFx"]||!a2["contFx"]["data"])return;
_archPush("contFxArch",a2["contFx"]["season"],_pkContData(a2["contFx"]["data"]));})();a2["contFx"]={'season':_fxSeasonLab(),'data':{}};
var sl=_buildSlots();
var usedAll={};
['ucl','uel','uecl','acl','ccl','lib'].forEach(function(tag){
var cfg=_contCfg[tag];
var direct=(sl["direct"][tag]||[]).filter(function(c){return !usedAll[c.i];});
direct.forEach(function(c){usedAll[c.i]=1;});
var need=cfg["size"]-direct.length;
var qPath=null;
if(need>0){
var q=_qualify(need,(sl["qp"][tag+'q']||[]).filter(function(c){return !usedAll[c.i];}));
qPath=q["path"];
if(qPath&&!qPath[qPath.length-1]["won"]){
a2["cupRuns"].push({'comp':cfg["name"]+'资格赛','rounds':qPath,'age':a2["age"],'result':'止步'+qPath[qPath.length-1]["round"]});
return;
}
direct=direct.concat(q["winners"]);
q["winners"].forEach(function(c){usedAll[c.i]=1;});
}else{
direct.sort(function(a,b){return b.s-a.s;});
}

/* 强制补齐/裁剪到配置规模：保证"8 种子+16 队附加赛"结构成立 */

var reg=tag==='acl'?'as':tag==='ccl'?'na':tag==='lib'?'sa':'eu';
if(direct.length<cfg["size"]){
var pool3=[];
for(var u3=0;u3<a0["TEAMS"]["length"];u3++){var tt=a0["TEAMS"][u3];if(_lgRegion[ap(tt)]===reg&&!usedAll[tt["id"]])pool3.push(tt);}
pool3.sort(function(a,b){return _teamAbs(b)-_teamAbs(a);});
for(var u2=0;direct.length<cfg["size"]&&u2<pool3.length;u2++)direct.push(_cardById(pool3[u2]["id"]));
}
direct.sort(function(a,b){return b.s-a.s;});
direct=direct.slice(0,
cfg["size"]);
direct.forEach(function(c){usedAll[c.i]=1;});
if(direct.length<8)return;
var res=_contComp(tag,cfg,direct,qPath,bz,bx);
if(res&&res["champion"]){a2["contHist"].push({'age':a2["age"],'comp':tag,'tid':res["champion"]});_devAdd(res["champion"],1.5,1);}
});
_runClubWC(bz,
bx);
}
function _runClubWC(bz,bx){
if(_natYr()!==0x2)return;
var pick={},cards=[],ucl=[],i;
for(i=a2["contHist"]["length"]-1;i>=0&&ucl.length<4;i--)if(a2["contHist"][i]["comp"]==='ucl'&&ucl.indexOf(a2["contHist"][i]["tid"])<0)ucl.push(a2["contHist"][i]["tid"]);
function add(tid){if(!pick[tid]&&aj(tid)){pick[tid]=1;cards.push(_cardById(tid));}}
for(i=0;i<ucl.length;i++)add(ucl[i]);
if(a2["lastTables"])for(var lgId in a2["lastTables"])add(a2["lastTables"][lgId][0]);
var all=a0["TEAMS"].slice().sort(function(a,
b){return _teamAbs(b)-_teamAbs(a);});
for(i=0;i<all.length&&cards.length<32;i++)add(all[i]["id"]);
if(cards.length<8)return;
var pIn=false;for(i=0;i<cards.length;i++)if(cards[i].i===a2["teamId"]){pIn=true;break;}
var res=_cupBracket(cards,
a2["teamId"]);
if(pIn){
var run={'comp':'世俱杯','rounds':res["path"],'age':a2["age"]};
if(res["path"].length&&res["path"][res["path"].length-1]["won"]){run["result"]='冠军';bz&&bz["trophies"]&&bz["trophies"].push('世俱杯冠军');a2["trophies"].push({'name':'世俱杯冠军','age':a2["age"],'team':(aj(a2["teamId"])||{"name":''})["name"]});}
else if(res["path"].length)run["result"]='止步'+res["path"][res["path"].length-1]["round"];
else run["result"]='止步三十二强';
a2["cupRuns"].push(run);
}
if(res&&res["champion"]){
if(a2["contFx"])a2["contFx"]["data"]["cwc"]={'name':'世俱杯','rounds':res["all"],'champion':res["champion"]};
a2["contHist"].push({'age':a2["age"],'comp':'cwc','tid':res["champion"]});
_devAdd(res["champion"],1.8,1);
}
}


/* 超级杯：上季联赛冠军 vs 上季杯赛冠军（同人则改联赛亚军），单场 */

function _runSuperCup(bz,bx,by){
var own=am[by["id"]]||by["id"],lgO=ak(own);
if(!lgO||!lgO["superCup"])return;
var order=a2["lastTables"]&&a2["lastTables"][own],
cups=a2["lastCups"]&&a2["lastCups"][own];
if(!order)return;
var champ=order[0],cupW=cups?cups["cup"]:null;
var other=cupW&&cupW!==champ?cupW:order[1];
if(!other||other===champ)return;
var A=aj(champ),
B=aj(other);if(!A||!B)return;
var _sc2=_koSim(_teamAbs(A),_teamAbs(B),_lgStyle[own]||1,true);
var winTid=_sc2.won?champ:other;
var scTxt=_sc2.hg+'-'+_sc2.ag+(_sc2.pk?' (点球 '+_sc2.pk[0]+'-'+_sc2.pk[1]+')':(_sc2.et?' (加时)':''));
if(a2["teamId"]!==champ&&a2["teamId"]!==other)return;
var meIsA=a2["teamId"]===champ;
var run={'comp':lgO["superCup"],'rounds':[{'round':'决赛','opp':meIsA?B.name:A.name,'oppId':meIsA?B.id:A.id,'won':winTid===a2["teamId"],'score':meIsA?scTxt:scTxt.split(' ')[0].split('-').reverse().join('-')+(scTxt.indexOf(' (')>=0?scTxt.slice(scTxt.indexOf(' (')):'')}],'age':a2["age"]};
if(winTid===a2["teamId"]){run["result"]='冠军';bz["trophies"].push(lgO["superCup"]+'冠军');a2["trophies"].push({'name':lgO["superCup"]+'冠军','age':a2["age"],'team':bx["name"]});}
else run["result"]='止步决赛';
a2["cupRuns"].push(run);
}


/* 国内杯赛：全部联赛真实规模（顶级+次级），冠军入 lastCups */

function _runCups(bz,bx,by){
a2["lastCups"]=a2["lastCups"]||{};
(function(){if(!a2["cupFx"]||!a2["cupFx"]["data"])return;
_archPush("cupFxArch",a2["cupFx"]["season"],_pkCupData(a2["cupFx"]["data"]),30);})();a2["cupFx"]={'season':_fxSeasonLab(),'data':{}};
var owners={};
for(var i=0;i<a0["LEAGUES"]["length"];i++){var lg=a0["LEAGUES"][i];owners[am[lg["id"]]||lg["id"]]=1;}
for(var own in owners){
var lgO=ak(own);if(!lgO)continue;
var cupList=[];
if(lgO["cup"])cupList.push({'name':lgO["cup"],'key':'cup'});
if(lgO["leagueCup"])cupList.push({'name':lgO["leagueCup"],'key':'lgCup'});
for(var ci=0;ci<cupList.length;ci++){
var field=_lgTeamsOf(own);
for(var k in am)if(am[k]===own)field=field.concat(_lgTeamsOf(k));
var cards=_cards(field);
var res=_cupBracket(cards,a2["teamId"]);
a2["cupFx"]["data"][cupList[ci]["name"]]={'champion':res["champion"],'all':res["all"],'n':cards.length};a2["lastCups"][own]=a2["lastCups"][own]||{};
a2["lastCups"][own][cupList[ci]["key"]]=res["champion"];
_devAdd(res["champion"],0.5,1);
var pIn=false;for(var z2=0;z2<cards.length;z2++)if(cards[z2].i===a2["teamId"]){pIn=true;break;}
if(pIn){
var run={'comp':cupList[ci]["name"],'rounds':res["path"],'age':a2["age"]};
if(res["path"].length&&res["path"][res["path"].length-1]["won"]){run["result"]='冠军';bz["trophies"].push(cupList[ci]["name"]+'冠军');a2["trophies"].push({'name':cupList[ci]["name"]+'冠军','age':a2["age"],'team':bx["name"]});}
else if(res["path"].length)run["result"]='止步'+res["path"][res["path"].length-1]["round"];
else run["result"]='止步'+(_bracketNames(cards.length)[0]||'第一轮');
a2["cupRuns"].push(run);
}
}
}
}


/* 升降级（真实榜）+ 升降 teamDev bonus + rep 重新归位 */

function _moveTeam(tid,toLg,up,idx){
a2["leagueOf"]=a2["leagueOf"]||{};
a2["leagueOf"][tid]=toLg;
a2["repOf"]=a2["repOf"]||{};
a2["repOf"][tid]=up?(idx===0?1:0):(idx===0?5:4);
/* 降班不再额外扣 dev（rep 掉档已是足够惩罚，双重惩罚会螺旋下坠）；升班保留 +1 */
if(up)_devAdd(tid,1);
/* 记录升降级（供世界面板在对应赛季积分榜上打 升级/降级 标）。s 用该次积分榜所属世界的
   赛季标签 _fxLab（_lgAll 写入），而不是当前 lgFx.season——大场面推迟 _promoReleg 时后者已前移一年 */
if(a2["lgFx"]&&a2["lgFx"]["season"]!=null){a2["lgMoves"]=a2["lgMoves"]||[];a2["lgMoves"]["push"]({'s':a2["_fxLab"]!=null?a2["_fxLab"]:a2["lgFx"]["season"],'tid':tid,'dir':up?'up':'down'});}
}
function _promoReleg(bz,
bx,by){
if(!a2["_worldRan"])return;
a2["_worldRan"]=false;
var orders=a2["lastTables"];
if(!orders)return;
a2["_newsQ"]=a2["_newsQ"]||[];
for(var tl in _relegZone){
var z=_relegZone[tl],down=ao[tl],order=orders[tl];
if(!down||!order)continue;
for(var p=z[0];p<=z[1]&&p<=order.length;p++){
_moveTeam(order[p-1],down,false,p-z[0]);
a2["_newsQ"]["push"]({'t':'releg','tid':order[p-0x1],'from':tl,'to':down});
if(a2["teamId"]===order[p-1]&&bz)bz["move"]='降入'+ak(down)["name"];
}
}
for(var sl in _promoAuto){
var up=_promoAuto[sl],to=am[sl],order2=orders[sl];
if(!to||!order2)continue;
for(var p2=0;p2<up.length&&p2<order2.length;p2++){
_moveTeam(order2[p2],to,true,p2);
/* 升级新闻只挑重点：主角队 / 升入五大顶级联赛 / 弱队(Rep<=1)奇迹升入Rep>=4联赛 */
if(a2["teamId"]===order2[p2]||ak(to)["rep"]>=0x5||((aj(order2[p2])||{"rep":9})["rep"])<=0x1&&ak(to)["rep"]>=0x4)a2["_newsQ"]["push"]({'t':'promo','tid':order2[p2],'from':sl,'to':to});
if(a2["teamId"]===order2[p2]&&bz)bz["move"]='升上'+ak(to)["name"];
}
}
for(var sl2 in _promoPlayoff){
var zone=_promoPlayoff[sl2],to2=am[sl2],order3=orders[sl2];
if(!to2||!order3)continue;
var seeds=[];
for(var p3=zone[0];p3<=zone[1]&&p3<=order3.length;p3++)seeds.push(_cardById(order3[p3-1]));
if(seeds.length<4)continue;
var f1=_poOne(seeds[0],seeds[3]),f2=_poOne(seeds[1],seeds[2]);var pIn=a2["teamId"]&&(f1.i===a2["teamId"]||f2.i===a2["teamId"]);
var done=false;
if(pIn&&b3()){
var meC=f1.i===a2["teamId"]?f1:f2,foC=f1.i===a2["teamId"]?f2:f1;
if(_aVPri("promo",0.55,{'comp':ak(sl2)["name"]+'升级附加赛决赛','opp':foC.n,'oppStr':foC.s,'counterTid':foC.i,'counterTo':to2,'fromLeague':sl2,'_aiCtx':{'t':'promo','f1':{'i':f1["i"],'s':f1["s"],'lg':f1["lg"]},'f2':{'i':f2["i"],'s':f2["s"],'lg':f2["lg"]},'to2':to2}})){
done=true;
}
}
if(!done){
var wC=_poOne(f1,f2,true);
_moveTeam(wC.i,to2,true,2);
if(a2["teamId"]===wC.i||ak(to2)["rep"]>=0x5||((aj(wC.i)||{"rep":9})["rep"])<=0x1&&ak(to2)["rep"]>=0x4)a2["_newsQ"]["push"]({'t':'promo','tid':wC.i,'from':sl2,'to':to2});
if(a2["teamId"]===wC.i&&bz)bz["move"]='升上'+ak(to2)["name"];
}
}
var _nqL,_nqO,_nqSeen={};
for(_nqL in _relegZone){_nqO=orders[_nqL];if(_nqO&&_nqO["length"]){_nqSeen[_nqL]=0x1;a2["_newsQ"]["push"]({'t':'lgchamp','tid':_nqO[0x0],'lg':_nqL});}}
if(a2["leagueId"]&&!_nqSeen[a2["leagueId"]]&&orders[a2["leagueId"]]&&orders[a2["leagueId"]]["length"])a2["_newsQ"]["push"]({'t':'lgchamp','tid':orders[a2["leagueId"]][0x0],'lg':a2["leagueId"]});
}
function _poOne(x,
y,neu){
var ko=_koSim(x.s,y.s,_glOf(x.lg,y.lg),!!neu);
if(ko.pk)return ko.won?x:y;
return ko.won?x:y;
}


/* 世界引擎总入口（每赛季一次）：dev结算 → 洲际 → 超级杯 → 全联赛 → 国内杯赛 */

function _runWorld(bz,bx,by){
/* 青训期(bx/by 为空)世界照常演化:全 AI 模拟,无玩家耦合;职业期额外产出玩家行 */
a2["_lgRow"]=null;
var pro=!!(bx&&by);
if(pro)a2["_worldRan"]=false;
_devTick();
_runConts(bz,bx,by);
if(pro)_runSuperCup(bz,bx,by);
var world=_lgAll();
if(pro){
var tbl=world[by["id"]];
if(tbl)for(var i=0;i<tbl.length;i++)if(tbl[i].i===a2["teamId"]){a2["_lgRow"]=tbl[i];break;}
if(tbl&&tbl.length)_devAdd(tbl[0].i,1.2,1);
_runCups(bz,bx,by);
a2["_worldRan"]=true;
}
}


/* ── §8 大赛系统 ──────────────────────────────────────────────── */




function aZ(bx,by,bz){
b0(bx,by,bz,a2["age"]);
}function b0(bx,by,bz,bA){
a2["natRuns"]["push"]({'age':bA,'comp':by,'stage':bz,'caps':bx?bx['caps']:0,'natGoals':bx?bx['natGoals']:0,['natAssis'+'ts']:bx?bx['natAssis'+'ts']:0,'natCs':bx?bx['cs']:0}),



'冠军'===bz?(bx["trophies"]["push"](by+'冠军'),a2["trophies"]["push"]({'name':by+'冠军','age':bA,'team':"国家队"})):bx["nat"]=by+bz;
}function b1(bx){
a2["forceQ"]||(a2["forceQ"]=[]),



a2["usedEven"+'ts'][bx]||a2["forceQ"]["indexOf"](bx)<0x0&&a2["forceQ"]["push"](bx);
}
function _repWeight(t){



/* 杯赛对手权重曲线：rep5高概率,rep4中高,rep3小概率,rep2极低,rep0/1近乎为零 */




var _rw=[0.2,0.5,1,5,40,100],_rep=t&&t["rep"];return _rep>=0x0&&_rep<=0x5?_rw[_rep]:0x0;
}
function _wDraw(teams,n,wFn){



/* 不放回加权抽样 */




var _t=teams["slice"](),_p=[];
while(_p["length"]<n&&_t["length"]){
var _tot=0x0,_i;for(_i=0x0;_i<_t["length"];_i++)_tot+=wFn(_t[_i]);
var _r=ad()*_tot,



_acc=0x0,_idx=_t["length"]-0x1;
for(_i=0x0;_i<_t["length"];_i++){_acc+=wFn(_t[_i]);if(_r<=_acc){_idx=_i;break;}}
_p["push"](_t[_idx]);_t["splice"](_idx,0x1);
}
return _p;
}
function b2(){var bx=ar(),



by=as(),bz={'age':a2["age"],'teamId':a2["teamId"],'teamName':bx?bx["name"]:"无球可踢",'color':bx?bx["color"]:null,
'league':by?by["name"]:'',



'leagueId':by?by['id']:null,'ovr':a2["ovr"],'role':a2["role"],'apps':0x0,'goals':0x0,'assists':0x0,
'cs':0x0,'ga':0x0,'trophies':[],



'note':null};
a2["_curBz"]=bz;
a2["seasonWa"+'ge']=0x0;
(function(){var _k,_s=a2["staff"]||{};
for(_k in _s)if(_s[_k])_s[_k]=typeof _s[_k]==="object"?{'y':(_s[_k]["y"]||0x0)+0x1,'tier':_s[_k]["tier"]||0x1}:{'y':0x1,'tier':0x1};
}(),_staffMkt());
var bA=a8();
if(bA>0x0){for(var bB=[];
bA>0x0&&a2["money"]<bA;
){for(var bC=null,bD=0x0;
bD<a5["length"];
bD++){if(!a6(a5[bD]['id']))continue;
var _ot=(a2["staff"][a5[bD]['id']]&&a2["staff"][a5[bD]['id']]["tier"])||0x1;
var _od=_stById(_ot===0x1?a5[bD]['id']:a5[bD]['id']+_ot),_of=a7(_od);
if(!bC||_of>bC["_fee"])bC={'id':a5[bD]['id'],'name':_od["name"],'_fee':_of};
}
if(!bC)break;
delete a2["staff"][bC['id']],bB["push"](bC["name"]),bA-=bC["_fee"];
}bA>0x0&&(a2["money"]-=bA,bz["staffFee"]=bA),



bB["length"]&&(bz["staffGon"+'e']=bB["join"]('、'));
}var bE=aG(a2["age"]),bF=bE[0x0]+ad()*(bE[0x1]-bE[0x0]),bG=a2["talent"];
if(by&&(bG*=0x1+0.05*(by["rep"]-0x2)),



a2["stagnate"]&&(bG*=0.55),a6("chef")&&(bG*=(1+0.08*_stEff(_stT("chef")))*_stM("chef")),a0["ROLES"][a2["role"]]["rank"]<=0x1&&(bG*=a2["age"]<=0x17&&bx&&bx["rep"]>=0x4?0.85:0.5),




a2["achBonus"]&&a2["achBonus"]["growth"]&&(bG*=a2["achBonus"]["growth"]),
bF>0x0&&(bG*=Math["max"](0.16,(0x64-a2["ovr"])/0x32)),



bF<0x0&&(a2["achBonus"]&&a2["achBonus"]["decay"]&&(bF*=a2["achBonus"]["decay"]),bG=(a2["ovr"]>a2["maxOvr"]*0.94?1.3:Math["max"](0.78,1.34-0.38*a2["talent"]))*(a6("fitness")?(1-0.2*_stEff(_stT("fitness")))/_stM("fitness"):0x1)),



a2["ovr"]=ac(a2["ovr"]+bF*bG,0x14,0x63),
a2["cheat"]){var bH=ac(0x2a+bp(a2["originId"])["ovr"]+(a2["legacy"]?a2["legacy"]["ovr"]:0x0),0x1e,0x3c),



bI=bH+(0x63-bH)*ac((a2["age"]-0x10)/0xa,0x0,0x1);
a2["ovr"]=ac(Math["max"](a2["ovr"],bI),0x14,0x63);
}_runWorld(bz,bx,by);
if(a2["banLeft"]>0x0)bz["note"]='禁赛',



a2["banLeft"]--;
else{if(bx){var bJ=a0["ROLES"][a2["role"]],_nTeam=_pSeasonCollect(a2["teamId"])["length"],bK;
/* 出场数 = 角色出勤率 × 球队当季真实总场次（联赛+国内杯+洲际），自适应任何联赛规模，永不超总场次 */
if(_nTeam>0x0){var _avail={'star':[0.82,0.97],'starter':[0.68,0.88],'rot':[0.42,0.64],'sub':[0.16,0.38],'bench':[0x0,0.1]}[a2["role"]]||[0x0,0.1];
bK=Math["round"](ae(Math["round"](_avail[0x0]*0x3e8),Math["round"](_avail[0x1]*0x3e8))/0x3e8*_nTeam);}
else bK=ae(bJ["apps"][0x0],bJ["apps"][0x1]);
if(a2["age"]<=0x13?bK=Math["round"](0.5*bK):0x14===a2["age"]?bK=Math["round"](0.78*bK):a2["age"]>=0x2b?bK=Math["round"](0.45*bK):a2["age"]>=0x29?bK=Math["round"](0.58*bK):a2["age"]>=0x27?bK=Math["round"](0.7*bK):a2["age"]>=0x25?bK=Math["round"](0.82*bK):a2["age"]>=0x23&&(bK=Math["round"](0.92*bK)),
a2["cheat"]&&(bK=Math["round"](1.05*bK)),a6("nutritio"+'n')&&(bK=Math["round"](1.05*bK)),a2["banGames"]>0x0){var bL=Math["min"](bK,a2["banGames"]);
bK-=bL,a2["banGames"]-=bL,bL>0x0&&(bz["note"]="停赛 "+bL+'\x20场');
}bK=Math["round"](bK*APPS_F(a2["age"])/OLDF(a2["age"])),_nTeam>0x0&&(bK=Math["min"](bK,_nTeam)),bz["teamGames"]=_nTeam;
var bM=ac((a2["ovr"]-0x2a)/0x30,0.05,1.4);
a2["cheat"]&&(bM*=1.25);
var bN=aK(),_pm=TYPE_MODS[a2["playerType"]>=0x0&&a2["playerType"]<=0xb?a2["playerType"]:0xb];bz["_type"]=a2["playerType"]>=0x0&&a2["playerType"]<=0xb?a2["playerType"]:0xb;
if(bz["apps"]=bK,'gk'===al(a2["pos"])["group"])bz['cs']=Math["min"](bK,Math["round"](bK*(0.15+0.28*bM)*(0.8+0.5*ad()))),bz['ga']=Math["round"]((bK-bz['cs'])*(1.85-0.47*ac(bM,0x0,0x1))*(0.9+0.2*ad()));
else{
/* 统一数据归属：按当季真实赛程逐场分配（_runWorld 已先行运行） */
var _pc=_pSeasonContrib(bK,_pm);
bz["goals"]=_pc["g"],bz["assists"]=_pc["a"],bz["lgGoals"]=_pc["lg"],bz["lgAssists"]=_pc["lgA"];
}a2["totals"]["apps"]+=bz["apps"],a2["totals"]["goals"]+=bz["goals"],a2["totals"]["assists"]+=bz["assists"],a2["totals"]['cs']+=bz['cs'],
a2["totals"]['ga']+=bz['ga'];
var bQ=aJ(bx,by,a2["ovr"]),bR=Math["round"](bQ*(a2["wageMul"+'t']||0x1)*(a0["ROLES"][a2["role"]]["rank"]>=0x2?0x1:0.55)*bAge());
a2["money"]+=bR,a2["seasonWa"+'ge']=bR,bR>a2["peakAnnu"+"alWage"]&&(a2["peakAnnu"+"alWage"]=bR),a2["careerEa"+"rnings"]+=bR;
var bS=(0.15*(bz["goals"]+bz["assists"])+0.02*bz["apps"]+0.05*bz['cs'])*(0x1+0.25*by["rep"]);
a2["fame"]=ac(a2["fame"]+bS*(0x1-a2["fame"]/0x64),0x0,0x64);




/* -- §9b 联赛真实化 -- */





/* -- §9b 联赛真实化（世界引擎，见 PLAN-league-realism.md） -- */

var _lgRow=a2["_lgRow"];
bz["leaguePos"]=_lgRow?_lgRow["pos"]:null,
bz["leagueW"]=_lgRow?_lgRow["w"]:0,
bz["leagueD"]=_lgRow?_lgRow["d"]:0,bz["leagueL"]=_lgRow?_lgRow["l"]:0,
bz["leagueGF"]=_lgRow?_lgRow["gf"]:0,bz["leagueGA"]=_lgRow?_lgRow["ga"]:0,
bz["leaguePts"]=_lgRow?_lgRow["pts"]:0;if(_lgRow&&_lgRow["gf"]>0x0){var _roleG=a0["ROLES"][a2["role"]]["rank"];var _gCap=_roleG>=0x3?0.7:_roleG>=0x2?0.55:0.4;var _aCap=_roleG>=0x3?0.55:_roleG>=0x2?0.45:0.35;var _maxLG=Math["round"](_lgRow["gf"]*_gCap);if(bz["lgGoals"]>_maxLG)bz["lgGoals"]=_maxLG;var _maxLA=Math["round"](_lgRow["gf"]*_aCap);if(bz["lgAssists"]>_maxLA)bz["lgAssists"]=_maxLA;if(bz["lgGoals"]+bz["lgAssists"]>_lgRow["gf"]){var _ovL=bz["lgGoals"]+bz["lgAssists"]-_lgRow["gf"];bz["lgGoals"]=Math["max"](0,bz["lgGoals"]-_ovL);}var _maxG=Math["round"](_lgRow["gf"]*_gCap*1.6);var _maxA=Math["round"](_lgRow["gf"]*_aCap*1.6);if(bz["goals"]>_maxG)bz["goals"]=_maxG;if(bz["assists"]>_maxA)bz["assists"]=_maxA;}
}}var bT=a2["age"]<0x12?0.015:a2["age"]<0x15?0.015+0.005*(a2["age"]-0x12):(a2["age"]===0x15?0.03:0.07);
if(a2["achBonus"]&&a2["achBonus"]["injury"])bT*=a2["achBonus"]["injury"];
if(a2["healthBonus"])bT*=a2["healthBonus"];
if(a2["legend"]&&a2["legend"]['i']===1)bT*=1.4;
else if(a2["legend"]&&a2["legend"]['i']===2)bT*=2;
else if(a2["legend"]&&a2["legend"]['i']===-1)bT*=0.6;
if(a6("rehab")&&(bT*=(1-0.3*_stEff(_stT("rehab")))/_stM("rehab"),a6("fitness")&&(bT*=0.85)),



bx&&!a2["cheat"]&&a2["banLeft"]<=0x0&&ad()<bT){var bU=ah(a0["INJURIES"],function(c9){return c9['w'];
});
a2["ovr"]=ac(a2["ovr"]+bU["ovr"],



0x14,0x63),bz["note"]=bU["name"],bz["injury"]=bU["ovr"];if(bU["ovr"]<=-6&&a2["playerType"]!==0xb){a2["flags"]["_severeInjury"]=1;}
}a2["natForm"]=a2["natForm"]||{};
a2["natForm"]["wc"]=Math["max"](0x0,



(a2["natForm"]["wc"]||0x0)-0x1);
a2["natForm"]["asia"]=Math["max"](0x0,(a2["natForm"]["asia"]||0x0)-0x1);
var natFm=a2["natForm"]||{},



natB=Math["max"](natFm["wc"]>=0x4?0.2:natFm["wc"]>=0x3?0.15:natFm["wc"]>=0x2?0.1:natFm["wc"]>=0x1?0.05:0x0,natFm["asia"]>=0x3?0.15:natFm["asia"]>=0x2?0.1:natFm["asia"]>=0x1?0.05:0x0),



bW=0x48-0.12*(a2["guanxi"]-0x32),bX=!0x1;
if(!a2["banned"]&&a2["age"]>=0x12&&bx&&by){var bY=ac((a2["ovr"]-bW)/0xc,0x0,0x1),



bZ=a0["ROLES"][a2["role"]]["rank"],c0=ac(bY*(bZ>=0x3?0x1:bZ>=0x2?0.6:0.2)*(by["rep"]>=0x4?1.15:by['cn']?0x1:by["rep"]>=0x2?0.8:0.35)*(a2["age"]>=0x1e?0.8:0x1)*(a2["achBonus"]&&a2["achBonus"]["natCall"]||0x1)*(0x1+natB),



0x0,0.9);
bX=a2["cheat"]||ad()<c0;
}if(bX){var c2=aL(),c3=_natYr();
var _natMatches=[],_natFr=[],_natQual=null,



_natTourn=null,_natFxForce=null;
if(0x1===c3){if(a2["cheat"]&&a2["ovr"]>=0x55){_natFxForce='wc';aZ(bz,"\u4e16\u754c\u676f","\u51a0\u519b");a2["natForm"]["wc"]=0x4;}else{var _playerTeam={i:"n_chn",n:"\u4e2d\u56fd\u961f",s:60,ovr:_natStr()};_natQual=_runNatQual("wc",_playerTeam);_natMatches=_natMatches["concat"](_chnGroup(_natQual["matches"]));if(_natQual["qualified"]){_natTourn=_runNatComp("wc",_playerTeam);_natMatches=_natMatches["concat"](_chnGroup(_natTourn["matches"]));_natMatches=_natMatches["concat"](_chnRounds(_natTourn["rounds"]));}var _frW=_runFriendlies(0x2,0x3);_natFr=_frW["matches"];_natMatches=_natMatches["concat"](_natFr);}}
if(0x3===c3){if(a2["cheat"]&&a2["ovr"]>=0x4a){_natFxForce='asia';aZ(bz,"\u4e9a\u6d32\u676f","\u51a0\u519b");a2["natForm"]["asia"]=0x3;}else{var _playerTeam2={i:"n_chn",n:"\u4e2d\u56fd\u961f",s:60,ovr:a2["ovr"]};_natQual=_runNatQual("asia",_playerTeam2);_natMatches=_natMatches["concat"](_chnGroup(_natQual["matches"]));if(_natQual["qualified"]){_natTourn=_runNatComp("asia",_playerTeam2);_natMatches=_natMatches["concat"](_chnGroup(_natTourn["matches"]));_natMatches=_natMatches["concat"](_chnRounds(_natTourn["rounds"]));}var _frA=_runFriendlies(0x2,0x3);_natFr=_frA["matches"];_natMatches=_natMatches["concat"](_natFr);}}
if(c3!==0x1&&c3!==0x3){var _fr=_runFriendlies(0x6,0x8);_natFr=_fr["matches"];_natMatches=_natMatches["concat"](_natFr);}
var c1=a2["cheat"]?ae(0x5,



0x8):(function(){var _av={'star':[0.85,1],'starter':[0.72,0.92],'rot':[0.45,0.68],'sub':[0.2,0.45],'bench':[0x0,0.15]}[a2["role"]]||[0.5,0.8];return Math["min"](_natMatches["length"],Math["round"](ae(Math["round"](_av[0]*0x3e8),Math["round"](_av[1]*0x3e8))/0x3e8*_natMatches["length"]));})();
a2["caps"]+=c1,bz["caps"]=c1,bz["natGames"]=_natMatches["length"];
if(!a2["flags"]["_natCall"+"ed"]){a2["flags"]["_natCall"+"ed"]=!0x0;b1(["nat_firs"+"tcall","nat_firs"+"tcall2","nat_firs"+"tcall3"][Math["floor"](ad()*0x3)]);a2["usedEven"+"ts"]["nat_firs"+"tcall"]=(a2["usedEven"+"ts"]["nat_firs"+"tcall"]||0x0)+0x1;a2["usedEven"+"ts"]["nat_firs"+"tcall2"]=(a2["usedEven"+"ts"]["nat_firs"+"tcall2"]||0x0)+0x1;a2["usedEven"+"ts"]["nat_firs"+"tcall3"]=(a2["usedEven"+"ts"]["nat_firs"+"tcall3"]||0x0)+0x1;}
if(c1&&a2["natStats"]&&_natMatches["length"]){var _pg=al(a2["pos"])["group"],
_natBoost=1+0.5*natB;
var _nG=0,_nA=0,_nCs=0;
/* 统一数据归属：按国家队每场真实比分分配（_natStrOf 查对手强度，修复旧版用进球数当强度的 bug） */
var _order=[];for(var _oi=0x0;_oi<_natMatches["length"];_oi++)_order["push"](_oi);ag(_order);
for(var _mi=0x0;_mi<c1&&_mi<_natMatches["length"];_mi++){var _mm=_natMatches[_order[_mi]],
_home=_mm["hid"]==="n_chn"||_mm["homeId"]==="n_chn",
_tg=_home?_mm["hg"]:_mm["ag"],_og=_home?_mm["ag"]:_mm["hg"],
_oppId=_home?(_mm["aid"]||_mm["awayId"]):(_mm["hid"]||_mm["homeId"]),
_pc2=_pMatchContrib(_tg,_og,_natStrOf(_oppId),0x3c,_pg,_natBoost);
if(_pc2["g"]>0){_nG+=_pc2["g"];if(!bz["natGoals"]){b1(["nat_firs"+"tgoal","nat_firs"+"tgoal2","nat_firs"+"tgoal3"][Math["floor"](ad()*0x3)]);a2["usedEven"+"ts"]["nat_firs"+"tgoal"]=(a2["usedEven"+"ts"]["nat_firs"+"tgoal"]||0x0)+0x1;a2["usedEven"+"ts"]["nat_firs"+"tgoal2"]=(a2["usedEven"+"ts"]["nat_firs"+"tgoal2"]||0x0)+0x1;a2["usedEven"+"ts"]["nat_firs"+"tgoal3"]=(a2["usedEven"+"ts"]["nat_firs"+"tgoal3"]||0x0)+0x1;}}
_nA+=_pc2["a"];
if("gk"===_pg&&_pc2["cs"])_nCs++;}
_nG&&(bz["natGoals"]=_nG,a2["natStats"]["goals"]+=_nG);_nA&&(bz["natAssis"+"ts"]=_nA,a2["natStats"]["assists"]+=_nA);_nCs&&(bz["natCs"]=_nCs,a2["natStats"]["cs"]+=_nCs);}
if(_natQual){var _nqCaps=_natQual["matches"]["length"];a2["natRuns"]["push"]({age:a2["age"],comp:_natQual["comp"],stage:_natQual["stage"],playerPos:_natQual["playerPos"],caps:_nqCaps,natGoals:0,natAssists:0,natCs:0,matches:_natQual["matches"],standings:_natQual["standings"],playerGroup:_natQual["playerGroup"]});}
if(_natTourn){var _ntCaps=_natTourn["matches"]["length"],



_ntStage=_natTourn["stage"];a2["natForm"][_natTourn["comp"]==="\u4e16\u754c\u676f"?"wc":"asia"]=_natFormVal(_ntStage,_natTourn["comp"]==="\u4e16\u754c\u676f"?"wc":"asia");a2["tournaments"]["push"](_natTourn);if(_ntStage==="\u5c0f\u7ec4\u8d5b\u51fa\u5c40"){aZ(bz,_natTourn["comp"],"\u5c0f\u7ec4\u8d5b\u51fa\u5c40");}else{var _tBM=false;if(_ntStage==="\u51a0\u519b"){_tBM=_aVPri(_natTourn["comp"]==="\u4e16\u754c\u676f"?"wc":"asia",0.55,{"comp":_natTourn["comp"],"opp":_finalOpp(_natTourn["rounds"],"\u4e2d\u56fd\u961f"),"_aiCtx":{"t":"nat","comp":_natTourn["comp"],"stage":_ntStage}});}if(_tBM){a2[_natTourn["comp"]==="\u4e16\u754c\u676f"?"_natWC":"_natAsia"]=_natTourn;}else aZ(bz,_natTourn["comp"],_ntStage);}}
if(_natFr["length"]){a2["natRuns"]["push"]({age:a2["age"],comp:"\u53cb\u8c0a\u8d5b",stage:"",friendly:true,matches:_natFr,caps:_natFr["length"],natGoals:0,natAssists:0,natCs:0});}
if(_natQual&&!_natTourn&&c3===0x1){aZ(bz,



"\u4e16\u754c\u676f","\u9884\u9009\u8d5b\u51fa\u5c40");a2["natForm"]["wc"]=0x0;}
if(_natQual&&!_natTourn&&c3===0x3){aZ(bz,



"\u4e9a\u6d32\u676f","\u9884\u9009\u8d5b\u51fa\u5c40");a2["natForm"]["asia"]=0x0;}
}
/* 中立国家队赛事：每季归档上一届，本届按四年周期模拟（玩家参赛版直接引用原数据，决赛大场面改分可同步） */
/* _cnElim：本季玩家队(中国)打了预选赛却出局 → 中立签表强制排除中国；_natFxForce：作弊直接夺冠 → 世界面板记录中国队冠军 */
_natTick(_natTourn,!!(_natQual&&!_natTourn&&bX&&!a2["cheat"]),_natFxForce);
if(bx&&by){_ntCareerHook();_bigHooks(bz);if(a2["bigQ"]&&a2["bigQ"]["length"]){a2["_awardDue"]=!0x0;a2["_promoDue"]=!0x0;}else{_lgFinalRefresh(bz);bAw(bz);}}return a2["_promoDue"]?0:_promoReleg(bz,
bx,by),a2["maxOvr"]=Math["max"](a2["maxOvr"],a2["ovr"]),bz["ovrEnd"]=Math["round"](a2["ovr"]),
bz["wage"]=(a2["_offerTerms"]&&a2["_offerTerms"][a2["teamId"]])?a2["_offerTerms"][a2["teamId"]]["wage"]:null,
bz["cLeft"]=a2["contractLeft"]||0x0,
bz["awardN"]=(a2["awards"]||[]).filter(function(x){return x["age"]===bz["age"];})["map"](function(x){return x["name"];}),
a2["seasons"]["push"](bz),

_newsTick(0x0),

a2["age"]++,


a2["seasonsA"+"tClub"]++,au()||a2["seasonsA"+"broad"]++,bz;
}




/* ── §9 升降级与颁奖 ──────────────────────────────────────────── */




function b3(){
return a0["ROLES"][a2["role"]]["rank"]>=0x3&&(a2["bigStage"+'d']||0x0)<0x3;
}function b4(bx,by,bz){
a2["leagueOf"]=a2["leagueOf"]||{},



a2["leagueOf"][by['id']]=bz,bx["move"]='升上'+ak(bz)["name"];
}function b5(bx,bA){
/* 同名同年奖项只发一次：决赛补发路径与赛季末直发路径可能命中同一份赛季记录 */
var _ag=bA||a2["age"],_ai;
for(_ai=0x0;_ai<a2["awards"]["length"];_ai++)if(a2["awards"][_ai]["name"]===bx&&a2["awards"][_ai]["age"]===_ag)return;
a2["awards"]["push"]({'name':bx,'age':_ag});
}
/* 联赛金靴门槛：由该联赛最强队的联赛进球推出头号射手目标（约占其 28-37%）。
   每季每联赛只算一次并缓存，保证同季多次调用一致。 */
function _leagueTopTarget(lgId,age0){
a2["_topTgt"]=a2["_topTgt"]||{};
var _k=lgId+'_'+age0;
if(a2["_topTgt"][_k]!=null)return a2["_topTgt"][_k];
var _tbl=a2["lgTables"]&&a2["lgTables"][lgId],_mx=0,_i;
if(_tbl)for(_i=0x0;_i<_tbl["length"];_i++)if(_tbl[_i]["gf"]>_mx)_mx=_tbl[_i]["gf"];
var _t=Math["round"](_mx*(0.26+0.08*ad()));
a2["_topTgt"][_k]=_t;return _t;
}
/* 欧洲金靴门槛：五大联赛金靴目标中的最高值（联赛进球口径） */
function _euroTopTarget(age0){
a2["_euroTgt"]=a2["_euroTgt"]||{};
if(a2["_euroTgt"][age0]!=null)return a2["_euroTgt"][age0];
var _ids=['epl','liga','seri','bund','l1'],_best=0x0,_i;
for(_i=0x0;_i<_ids["length"];_i++){var _t=_leagueTopTarget(_ids[_i],age0);if(_t>_best)_best=_t;}
a2["_euroTgt"][age0]=_best;return _best;
}
function bAw(bz){
if(!bz)return;
var bx=bz["teamId"]?aj(bz["teamId"]):null,



by=bx?ak(bx["league"]):null,age0=bz["age"];
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
}(a0["AWARDS"]["ballon"])||ad()<0.35)&&b5(a0["AWARDS"]["ballon"],age0),bz["apps"]>=0x13&&bz["ovr"]>=0x54&&ad()<0.35&&b5(a0["AWARDS"]["afcpoy"],age0),"att"===c7&&bz["apps"]>=0x13&&bz["lgGoals"]>=_leagueTopTarget(by['id'],age0)&&b5(by["name"]+"金靴",age0),by["rep"]>=0x4&&"att"===c7&&bz["apps"]>=0x13&&bz["ovr"]>=0x55&&bz["lgGoals"]>=_euroTopTarget(age0)&&b5(a0["AWARDS"]["boot"],age0),bz["apps"]>=0x1e&&a0["ROLES"][bz["role"]]["rank"]>=0x3&&bz["ovr"]>=0x4a&&ad()<0.35&&b5(by["name"]+"最佳球员",age0),bz["apps"]>=0x13&&by["rep"]>=0x3&&'gk'===c7&&bz["ovr"]>=0x55&&ad()<0.45&&b5(a0["AWARDS"]["glove"],age0);
}else{var c8=(0.06+0.24*aL())*('gk'===c7?0.25:0x1),c9t=0,c9i;
for(c9i=0;c9i<a2["trophies"]["length"];c9i++)if(a2["trophies"][c9i]["age"]===age0)c9t++;
if(c9t>0){"att"===c7&&bz["apps"]>=0x13&&bz["lgGoals"]>=_leagueTopTarget(by['id'],age0)&&b5(by["name"]+"金靴",age0),by["rep"]>=0x4&&"att"===c7&&bz["apps"]>=0x13&&bz["lgGoals"]>=_euroTopTarget(age0)&&(function(c9){var has=!0x1;
for(var cD=0x0;cD<a2["awards"]["length"];cD++)if(a2["awards"][cD]["name"]===c9&&a2["awards"][cD]["age"]===age0)has=!0x0;
if(!has)b5(c9,age0);
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
return a2["period"]={'n':a3[a2["mode"]]["seasons"],'left':a3[a2["mode"]]["seasons"],'recs':[]},a2["role"]=aH(),



b7();
}function b7(){
for(var bx=a2["period"];
bx["left"]>0x0&&a2["age"]<0x37;
)if(bx["recs"]["push"](b2()),bx["left"]--,a2["roleAdju"+'st']=a2["roleAdju"+'st']>0x0?Math["floor"](a2["roleAdju"+'st']/0x2):Math["ceil"](a2["roleAdju"+'st']/0x2),
a2["role"]=aH(),a2["bigQ"]&&a2["bigQ"]["length"])return aW(),



null;
return(function(){var by=a2["period"],bz=by['n'],bA=by["recs"];
return a2["period"]=null,a2["pendingM"+"ult"]=null,a2["clean"]=ac(a2["clean"]-(au()?2.2:0.6)*bz,0x0,0x64),a2["fame"]=ac(a2["fame"]-(a6('pr')?Math["max"](0.05,1-0.65*_stEff(_stT('pr')))/_stM('pr'):1.5)*bz,
0x0,0x64),a2["guanxi"]=ac(a2["guanxi"]+(au()?1.6:0.5)*bz,0x0,0x64),a2["contract"+"Left"]>0x0&&a2["contract"+"Left"]--,a2["lockAbro"+'ad']>0x0&&a2["lockAbro"+'ad']--,
a0["ROLES"][a2["role"]]["rank"]<=0x1?a2["lowSpell"]++:a2["lowSpell"]=0x0,bA;
}());
}function b8(bx,



by){
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
var by=bx||ar(),



rel=a2["ovr"]-(by?0x30+7*by["rep"]:0x3e)+3*a2["roleAdju"+'st'];
var fit=1/(1+Math["exp"](-rel/6));
if(a2["age"]<0x16&&a2["maxOvr"]>a2["ovr"])fit=Math["min"](1,fit+Math["min"]((a2["maxOvr"]-a2["ovr"])*0.06,0.22));
var ageW=Math["exp"](-Math["pow"](Math["max"](0,a2["age"]-24)/8,1.6));
return Math["max"](1,Math["min"](5,Math["round"](1+4.2*fit*ageW+(ad()-0.5)*0.9)));
}
/* 联赛权重：按"边缘程度/趣味度"而非纯强度排——对中国球员，中超/沙特/美职联都是现实且有故事的落脚点；
   数值可随时调整，未列出的联赛默认 0.6 */
var _LGW={'epl':2.2,'liga':2.2,'seri':1.9,'bund':1.9,'l1':1.7,'csl':1.4,'spl':1.3,'mls':1.2,'pri':0.9,'ere':0.8,'tur':0.7,'bra':0.7,'jup':0.6,'mx':0.6,'jl':0.6,'arg':0.6,'kl':0.45,'pol':0.35,'ch':0.3,'seg':0.3,'b2':0.3,'l2':0.3,'serb':0.3,'ale':0.25,'cl1':0.25,'cpl':0.2};
function _lgW(bx){var bL=aq(bx);return bL&&_LGW[bL['id']]||0.6;}
/* 统一工资口径：报价/状态栏/实发都用此式 = 基础工资×合同系数×角色系数×年龄系数 */
function _wageOf(bx,by,bz){var bR=aI(bx);return Math["round"](aJ(bx,by,a2["ovr"])*((a2["flags"]&&a2["flags"]["_wageMul"])||0x1)*(bz||0x1)*(a0["ROLES"][bR]["rank"]>=0x2?0x1:0.55)*bAge());}
function bf(bx,



by){
by=by||{};
var bz=ba(),bA=ar(),bB=as(),bC=bB?bB["rep"]:0x1,bD=a2["ovr"]>=0x52?0x2:0x1;




/* ── §11 转会 ──────────────────────────────────────────────────── */




function bE(bK){
return a0["TEAMS"]["filter"](function(bL){
if(bA&&bL['id']===bA['id'])return!0x1;
var bM=aq(bL),bN=bc(bL);
if(!bM['cn']){if(!by["forceAbr"+"oad"]&&!by["ignoreLock"]&&a2["lockAbro"+'ad']>0x0)return!0x1;
bN+=a2["seasonsA"+"broad"]>0x0?0x3:0x5,a6("agent")&&(bN-=Math["round"](0x3*_stEff(_stT("agent"))*_stM("agent")));
}return!(by["forceAbr"+"oad"]&&bM['cn']||by["chinaOnl"+'y']&&!bM['cn']||null!=by["maxRep"]&&bL["rep"]>by["maxRep"]||bL["rep"]>=0x3&&a2["ovr"]<0x3e+0x4*bL["rep"]||bM["rep"]>bC+bK||!(bd(bL)>=bN-0x5)||!(bz<=bN+0x1a));
});
}var bF=bE(bD);
if(bF["length"]||(bF=bE(bD+0x1)),



bF["length"]||(bF=bE(0x9)),!bF["length"])return[];
for(var bG=[],bH={},bI=0x0;
bI<0x4*bx&&bG["length"]<bx;
bI++){var bJ=ah(bF,function(bK){var bL=bc(bK);
return _lgW(bK)/(0x1+0.35*Math["abs"](bz-bL));
});
bJ&&!bH[bJ['id']]&&(bH[bJ['id']]=0x1,bG["push"](bJ));
}return at(bG,



bF);
}function bg(){
return aj(a2["youthTea"+"mId"]);
}function bh(bx,by){
return(bx<=0x10?29.5+4.3*(bx-0xc):46.7+2.6*(bx-0x10))+1.2*(by?by["rep"]:0x2);
}function bi(){
return a2["age"]>=0x10&&a2["ovr"]>=0x2a;
}function bj(){
/* 青训营不影响世界运行：每个青训年世界照常演化(全 AI) */
_runWorld(null,null,null);
/* 青训年国家队大赛照常演化：世界杯/亚洲杯等四大赛每季推进一次（全 AI 中立） */
_natTick(null);
if(a2["flags"]["_double"]=!0x1,



(function(){var by=bg(),bz=aG(a2["age"]),bA=bz[0x0]+ad()*(bz[0x1]-bz[0x0]),bB=(0x1+a2["talent"])/0x2*function(bD){
if(!bD)return 0x1;
var bE=0.86+0.06*bD["rep"];
return aq(bD)['cn']||(bE+=0.06),bE;
}(by);
(function(){
/* 青训投入按训练年结算：勾选只登记，过年在成长结算时统一扣费 */
var _iv=a2["yInv"]||{},_cost={'train':18,'fit':14,'nut':10,'gx':10},_k;
a2["yInv"]=_iv;
for(_k in _iv)if(_iv[_k]!=null){
if(a2["money"]>=_cost[_k])a2["money"]-=_cost[_k];
else{delete _iv[_k],a2["flags"]["_yInvLost"]=1;continue;}
if(_k==="train")bB*=1.18;
else if(_k==="gx")a2["guanxi"]=ac(a2["guanxi"]+0x6,0x0,0x64);
}
})();
bA>0x0&&(bB*=ac((0x46-a2["ovr"])/0x1c,0.35,0x1));
var _yg=bA*bB;
a2["yInv"]&&a2["yInv"]["nut"]!=null&&_yg>0x0&&_yg<0.9&&(_yg=0.9);
a2["ovr"]=ac(a2["ovr"]+_yg,0xc,0x63),a2["maxOvr"]=Math["max"](a2["maxOvr"],
a2["ovr"]);
var bC=ad()*(a2["yInv"]&&a2["yInv"]["fit"]!=null?0.7:0x1)<function(bD){var bE=bg(),bF=bh(bD,bE)-a2["ovr"];
if(bF<=0x0)return 0x0;
var bG=bD<=0xc?0.5:bD>=0xe?1.15:0x1;
return ac(0.0052*bF*function(bH){
return bH?0.45+0.06*bH["rep"]:0x1;
}(bE)*bG,0x0,0.55);
}(a2["age"]);
delete a2["flags"]["_yFit"];
return a2["youthLog"]["push"]({'age':a2["age"],'teamId':a2["youthTea"+"mId"],'ovr':Math["round"](a2["ovr"]),'cut':bC}),bC?(a2["youthCut"]=a2["age"],
!0x0):(_newsTick(0x1),a2["age"]++,!0x1);
}()))return br("青训淘汰");
if(a2["age"]>=0x15&&!bi())return a2["youthCut"]=a2["age"],



br("青训淘汰");
_ntYouthCheck();
/* 本年梯队决赛已入队时毕业顺延一年：先踢完国字号再升学 */
if(a2["bigQ"]&&a2["bigQ"]["length"]&&bi()&&!(a2["flags"]["_gradCd"]>0x0))a2["flags"]["_gradCd"]=0x1;
if(bi()){if(a2["flags"]["_gradCd"]>0x0)a2["flags"]["_gradCd"]--;
else return a2["phase"]="career",bm();
}
var bx=aE();
if(!bx)return a2["bigQ"]&&a2["bigQ"]["length"]?aW():void 0x0;
a2["usedEven"+'ts'][bx['id']]=(a2["usedEven"+'ts'][bx['id']]||0x0)+0x1,
a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1,
bx['cn']&&(a2["flags"]["_cnCount"]=(a2["flags"]["_cnCount"]||0x0)+0x1),
a2["pending"]={'type':"random",'eventId':bx['id']};
}


/* ── §12 青训 送出国学费（choose 选国外青训时扣费，须在顶层作用域）── */




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
}var bL=_homeTeams(),_homes=ag(bL["slice"](0x0))["slice"](0x0,0x3),
bQ0=a0["TEAMS"]["filter"](function(bR){return aq(bR)['cn'];}),
bG=bQ0["filter"](function(bR){return bL["indexOf"](bR)<0x0;}),
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
for(var _hh=0x0;_hh<_homes["length"];_hh++)pU(_homes[_hh]);
pickBand(bG,



3-bI["length"]);
var dTeam=a2["dreamId"]?aj(a2["dreamId"]):null;
if(dTeam&&bI["length"]&&dTeam['id']!==bI[0x0]['id']){var _dIdx=-0x1;for(var _di=0;_di<bI["length"];_di++)if(bI[_di]['id']===dTeam['id']){_dIdx=_di;break;}
if(_dIdx>0x0)bI["splice"](_dIdx,0x1);bI["unshift"](dTeam);}
var bO=a2["money"]>=0x1e,



dreamIsAbroad=dTeam&&!aq(dTeam)['cn'],
forN=2-(dreamIsAbroad&&bJ[dTeam['id']]?1:0),
bP=bH["filter"](function(bR){return bO?bR["rep"]>=0x3:bR["rep"]<=0x2;});
pickBand(bP["length"]?bP:bH,



Math.max(0,forN));
var poolAll=bG["concat"](bH);
while(bI["length"]<6){var before=bI["length"];pickBand(poolAll,1);if(bI["length"]===before)break;}
while(bI["length"]>6){var lastK=bI[bI.length-1],



isProt=(bL["length"]&&bL["indexOf"](lastK)>=0x0)||lastK['id']===a2["dreamId"];
if(isProt)bI.splice(bI.length-2,1);else bI.pop();}
at(bI,



bQ0),at(bI,bH);
var abIdx=-0x1;for(var zI=0;zI<bI["length"];zI++)if(!aq(bI[zI])['cn']){abIdx=zI;break;}
a2["pending"]={'type':'youth_path',



'offers':bI["map"](function(bR){return bR['id'];}),'abroadIdx':abIdx};
}());
if(a2["cheat"]&&(a2["banned"]=!0x1,a2["banLeft"]=0x0,



a2["banGames"]=0x0,a2["flags"]["_forceRe"+"tire"]=!0x1,a2["clean"]=0x64,a2["guanxi"]=0x64),
a2["banned"])return br("终身禁足");
if(a2["flags"]["_forceRe"+"tire"])return br('伤退');
if(a2["age"]>=0x37)return br("年龄到了");
if(a2["cheat"]&&a2["age"]>=0x2d)return br("年龄到了");
if(!a2["teamId"]&&!a2["clubsPla"+"yed"]["length"])return bm();
if(a2["cheat"]){var bx=ar();
if(au()?a2["ovr"]>=0x3e:bx&&bx["rep"]<=ax()-0x2)return a2["flags"]["_forceLe"+"ave"]=!0x1,



bo(!0x1);
}var by=a2["flags"]["_forceLe"+"ave"],bz=a2["lowSpell"]>=("long"===a2["mode"]?0x3:0x2),bA=a2["contract"+"Left"]<=0x0;
if(by||bz||bA){if(a2["loanFrom"]){var bB=aj(a2["loanFrom"]);
return bB&&(a2["teamId"]=bB['id'],



a2["seasonsA"+"tClub"]=0x0,a2["roleAdju"+'st']=0x0,a2["lowSpell"]=0x0,a2["stagnate"]=!0x1,
a2["flags"]["_loanBac"+'k']=bB['id']),



a2["loanFrom"]=null,a2["flags"]["_forceLe"+"ave"]=!0x1,bo(!0x1,!0x1);
}return a2["flags"]["_forceLe"+"ave"]=!0x1,bo(bz&&!by,



by);
}if(a2["age"]>=0x14&&a2["life"]&&!a2["life"]["partner"]&&!a2["flags"]["_loveSta"+'rt']&&(a2["flags"]["_loveSta"+'rt']=!0x0,




b1("love_fir"+'st'))){}(a2["teamId"]&&(a2["capDone"]||[]).indexOf(a2["teamId"])<0x0&&a2["seasonsA"+"tClub"]>=0x2&&a0["ROLES"][a2["role"]]["rank"]>=0x4&&a2["ovr"]>=0x32+0x4*((ar()||{})["rep"]||0x0)&&"prime"===aB(a2["age"]))&&(a2["forceQ"]||(a2["forceQ"]=[]),




"gk"===al(a2["pos"])["group"]?a2["forceQ"].indexOf("gk_captain")<0x0&&a2["forceQ"].push("gk_captain"):a2["forceQ"].indexOf("captain")<0x0&&a2["forceQ"].push("captain")),




a2["caps"]>=0x19&&a2["ovr"]>=0x48&&!a2["usedEven"+"ts"]["nat_captain"]&&!a2["flags"]["_ntCaptain"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("nat_captain")<0x0&&a2["forceQ"].push("nat_captain")),a2["age"]>=0x22&&a2["age"]<=0x24&&!a2["usedEven"+"ts"]["vet_wall"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("vet_wall")<0x0&&a2["forceQ"].push("vet_wall")),a2["seasonsAtClub"]>=0x5&&a2["seasonsAtClub"]<0x8&&!a2["usedEven"+"ts"]["club_5y"+"rs"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("club_5y"+"rs")<0x0&&a2["forceQ"].push("club_5y"+"rs")),a2["seasonsAtClub"]>=0xa&&a2["youthTeamId"]===a2["teamId"]&&!a2["usedEven"+"ts"]["club_10"+"yrs"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("club_10"+"yrs")<0x0&&a2["forceQ"].push("club_10"+"yrs")),a2["seasonsAtClub"]>=0xa&&a2["youthTeamId"]!==a2["teamId"]&&!a2["usedEven"+"ts"]["club_10yrs"+"_way"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("club_10yrs"+"_way")<0x0&&a2["forceQ"].push("club_10yrs"+"_way"));
if(a2["flags"]["_staffCd"]>0x0&&a2["flags"]["_staffCd"]--,



a2["forceQ"]&&a2["forceQ"]["length"]){var bD=a2["forceQ"]["shift"]();
var bO2=function(bF){
for(var bG=0x0;
bG<a1["length"];
bG++)if(a1[bG]['id']===bF)return a1[bG];
return null;
}(bD);
if(bO2){if(bO2["pool"]){var bP2={};for(var bQ2 in bO2)bP2[bQ2]=bO2[bQ2];var bR2=ag(bO2["pool"]["slice"]());bP2["options"]=bR2["slice"](0x0,(bO2["rndPick"]||0x3))["concat"](bO2["single"]?[bO2["single"]]:[]);for(var bS2=0x0;bS2<a1["length"];bS2++)a1[bS2]===bO2&&(a1[bS2]=bP2);}
return a2["usedEven"+'ts'][bD]=(a2["usedEven"+'ts'][bD]||0x0)+0x1,



a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1,
void(a2["pending"]={'type':"random",'eventId':bD});
}
}if(ad()<a3[a2["mode"]]["eventCha"+"nce"]){var bE=aE();
if(bE)return a2["usedEven"+'ts'][bE['id']]=(a2["usedEven"+'ts'][bE['id']]||0x0)+0x1,



a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1,
bE['cn']&&(a2["flags"]["_cnCount"]=(a2["flags"]["_cnCount"]||0x0)+0x1),



void(a2["pending"]={'type':"random",'eventId':bE['id']});
}return bl();
}function bl(){
a2["flags"]["_double"]=!0x1;
/* 旧版随机德比已移除：德比/保级大战改由 _bigHooks 在赛季结算时从真实赛程抽取 */
var bx=b6();
bx&&(a2["pending"]={'type':"report",



'recs':bx});
}function bm(){var bx,by=bp(a2["originId"])["guanxi"]>=0x12?0x3:0x2,bz=bg(),bA=[],bB={};
bz&&a2["ovr"]>=(bx=bz,



Math["min"](bc(bx)-0x8,bh(a2["age"],bx)-0x6))&&(bB[bz['id']]=0x1,bA["push"](bz));
var bC=bz&&!aq(bz)['cn'],bD=a0["TEAMS"]["filter"](function(bM){var bN=aq(bM);
return!bB[bM['id']]&&(bC?!bN['cn']&&bM["rep"]<=(bz["rep"]>=0x4?0x3:0x2):bN['cn']&&bM["rep"]<=by);
}),



bE=bD["filter"](function(bM){
return ab(a2["originId"],bM['id']);
}),bF=bD["filter"](function(bM){
return!ab(a2["originId"],



bM['id']);
});
function bG(bM,bN){
for(var bO=0x0;
bN>0x0&&bM["length"]&&bO++<0x3c;
){var bP=af(bM);
bB[bP['id']]||(bB[bP['id']]=0x1,



bA["push"](bP),bN--);
}return bN;
}if(!bC){var bH=_homeTeams(),_homes=ag(bH["slice"](0x0))["slice"](0x0,0x2),_h2;
for(_h2=0x0;_h2<_homes["length"];_h2++){var _ht=_homes[_h2];bB[_ht['id']]||(bB[_ht['id']]=0x1,bA["push"](_ht));}
var bK=bG(bE,0x6-bA["length"]-0x1);
bG(bF,0x1+bK);
}bA["length"]<0x6&&bG(bE["concat"](bF),0x6-bA["length"]);
var bL=bz&&bA["length"]&&bA[0x0]['id']===bz['id']?bA["shift"]():null;
ag(bA),



at(bA,bD),bL&&bA["unshift"](bL),a2["pending"]={'type':"academy",'offers':bA["map"](function(bM){return bM['id'];
}),'homeId':bL?bL['id']:null,



'canStayYouth':!0x0,'youthId':bz?bz['id']:null};
}/* 转会报价条款（bo 内 bO 的全局版：经纪人重roll电话时复用） */
function _trTerms(bG){var bH=aJ(bG,

aq(bG),
a2["ovr"]),bI=be(bG),bJ=0.9+0.2*ad(),bK=0x1;
bK=bI<=0x1?1.3:0x2===bI?1.15:0x3===bI?0x1:0x4===bI?0.9:0.82;
return a2["_offerTerms"][bG['id']]={'wage':_wageOf(bG,aq(bG),bJ*bK),



'years':bI,'mult':bJ*bK};
}function bo(bx,by){
a2["_offerTerms"]={};
function bO(bG){var bH=aJ(bG,


aq(bG),
a2["ovr"]),bI=be(bG),bJ=0.9+0.2*ad(),bK=0x1;
bK=bI<=0x1?1.3:0x2===bI?1.15:0x3===bI?0x1:0x4===bI?0.9:0.82;
return a2["_offerTerms"][bG['id']]={'wage':_wageOf(bG,aq(bG),bJ*bK),



'years':bI,'mult':bJ*bK};
}if(a2["cheat"]&&a2["ovr"]>=0x3e){var bz=ax(),bA=a0["TEAMS"]["filter"](function(bG){var bH=aq(bG);
return!bH['cn']&&('欧冠'===bH["cont"]||'欧联'===bH["cont"])&&bG["rep"]<=bz;
}),



bB=0x0;
if(bA["forEach"](function(bG){
bG["rep"]>bB&&(bB=bG["rep"]);
}),(bA=bA["filter"](function(bG){
return bG["rep"]>=bB-0x1;
}))["length"])return ag(bA),



bA["forEach"](bO),void(a2["pending"]={'type':"transfer",'fired':!0x1,'offers':bA["slice"](0x0,0x3)["map"](function(bG){return bG['id'];
}),




'canStay':!au()&&!!ar()&&(ar()["rep"]>=bB||aq(ar())["rep"]>=0x4),'canRetire':a2["age"]>=0x1e});
}var bC=bf(0x4+(a6("analyst")?(_stT("analyst")===1?1:2):0),by?{'ignoreLock':!0x0}:null),



bD=ar();
/* 老将回归邀请：合同到期后的本次转会窗，受邀球队必出现在报价里（用过即清） */
var _vetInv=null;
(function(){var _iv=a2["flags"]&&a2["flags"]["_vetInviteTeam"];
if(!_iv)return;
a2["flags"]["_vetInviteTeam"]=null;
if(bD&&_iv===bD['id'])return;
var _t=aj(_iv);if(!_t)return;
for(var _i=0x0;_i<bC["length"];_i++)if(bC[_i]['id']===_iv){_vetInv=_iv;return;}
bC["unshift"](_t);_vetInv=_iv;})();
bD&&bO(bD),bC["forEach"](bO);
/* 受邀回归：给一份更长的合同（在正常年限上+2，至少3年、封顶5年） */
if(_vetInv&&a2["_offerTerms"]&&a2["_offerTerms"][_vetInv])a2["_offerTerms"][_vetInv]["years"]=Math["min"](0x5,Math["max"](0x3,a2["_offerTerms"][_vetInv]["years"]+0x2));
bx&&!by&&(a2["age"]>=0x20&&a2["ovr"]>=0x4b||b9(bD))&&(bx=!0x1,a2["lowSpell"]=0x0);
var bE=!bx&&!by&&bD&&(function(bG){var bH=bc(bG)-0x5;
return bG&&a2["youthTea"+"mId"]===bG['id']&&(bH-=0x8),



bd(bG)>=bH;
}(bD)||b9(bD)||a2["seasons"]["filter"](function(bK){
return bK["teamId"]===bD['id'];
})["length"]>=0x3||a2["age"]>=0x20&&a2["ovr"]>=0x4b),



bF=[];
bE&&a2["age"]<=0x17&&bD&&a0["ROLES"][aI(bD)]["rank"]<=0x1&&(bF=(function(){var bG=ar();
if(!bG)return[];
var bH=aq(bG),



bI=a0["TEAMS"]["filter"](function(bK){
return bK['id']!==bG['id']&&!(bK["rep"]>=bG["rep"])&&aq(bK)['cn']===bH['cn']&&a0["ROLES"][aI(bK)]["rank"]>=0x2;
});
if(!bI["length"])return[];
bI["sort"](function(bK,bL){var bM=a0["ROLES"][aI(bK)]["rank"];
return a0["ROLES"][aI(bL)]["rank"]-bM||bL["rep"]-bK["rep"];
});
var bJ=bI["slice"](0x0,Math["min"](bI["length"],0x8));
return ag(bJ),



bJ["slice"](0x0,0x2);
}())),bC["length"]||bE||by?(a2["pending"]={'type':"transfer",'fired':!!bx,'mustLeave':!!by&&bC["length"]>0x0,'offers':bC["map"](function(bG){return bG['id'];
}),'rerolls':0x1+(a6("analyst")&&_stT("analyst")>=0x3?0x1:0),



'loans':bF["map"](function(bG){return bG['id'];
}),'backFrom':a2["flags"]["_loanBac"+'k']||null,'canStay':!!(bE||by&&!bC["length"]),'canRetire':a2["age"]>=0x1e},



a2["flags"]["_loanBac"+'k']=null):a2["pending"]={'type':"retire_f"+"orced"};
}function bp(bx){
for(var by=0x0;
by<a4["length"];
by++)if(a4[by]['id']===bx)return a4[by];
return a4[0x0];
}function bq(){var bx,



by,bz=0x0,bA=0x0;
for(bx=0x0;
bx<a2["seasons"]["length"];
bx++){var bB=aj((by=a2["seasons"][bx])["teamId"]),bC=by["leagueId"]?ak(by["leagueId"]):aq(bB);
bC&&bC["rep"]>=0x4&&bz++,



bC&&bC["rep"]<=0x1&&bA++;
}var bD=a2["trophies"]["filter"](function(bL){
return/欧冠|欧联|世界杯|世俱杯|亚冠/["test"](bL["name"]);
})["length"],



bE=a2["trophies"]["filter"](function(bL){
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
bM["seasons"]++,



bM["apps"]+=bL["apps"];
}});
var bI=null;
for(var bJ in bH)(!bI||bH[bJ]["seasons"]>bI["seasons"])&&(bI=bH[bJ]);
var bK=bI?a2["trophies"]["filter"](function(bL){
return bL["team"]===bI["name"];
})["length"]:0x0;
return{'gen':a2["gen"]||0x1,



'age':a2["age"],'ovr':Math["round"](a2["ovr"]),'maxOvr':Math["round"](a2["maxOvr"]),'seasons':a2["seasons"]["length"],
'clubs':a2["clubsPla"+"yed"]["length"],



'caps':a2["caps"],'banned':a2["banned"],'top5Seasons':bz,'lowSeasons':bA,'bigTrophies':bD,
'uclTrophies':bE,'trophies':a2["trophies"]["length"],



'money':a2["money"],'peakAnnualWage':a2["peakAnnu"+"alWage"]||0x0,'careerEarnings':a2["careerEa"+"rnings"]||0x0,
'peakSalaryRank':a2["peakAnnu"+"alWage"]>=0x5dc?0x4:a2["peakAnnu"+"alWage"]>=0x3e8?0x3:a2["peakAnnu"+"alWage"]>=0x1f4?0x2:0x1,




'apps':a2["totals"]["apps"],'goals':a2["totals"]["goals"],'assists':a2["totals"]["assists"],'cs':a2["totals"]['cs'],'posGroup':al(a2["pos"])["group"],




'clean':Math["round"](a2["clean"]),'fame':Math["round"](a2["fame"]),'awards':(a2["awards"]||[])["length"],'award':function(bL){return bG[bL]||0x0;
},



'wcRank':bF["世界杯"],'asiaRank':bF["亚洲杯"],'natGoals':a2["natStats"]&&a2["natStats"]["goals"]||0x0,'natCs':a2["natStats"]&&a2["natStats"]['cs']||0x0,




'married':!(!a2["life"]||!a2["life"]["married"]),'kids':a2["life"]&&a2["life"]["kids"]["length"]||0x0,'splits':a2["life"]&&a2["life"]["splits"]||0x0,




'abroad':a2["seasonsA"+"broad"],'reason':a2["endReaso"+'n']||'','youthTeamId':a2["youthTea"+"mId"]||'','youthAbroad':!(!a2["flags"]||!a2["flags"]["youthAbr"+"oad"]),




'youthCut':a2["youthCut"]||0x0,'appsPerSeason':a2["seasons"]["length"]?a2["totals"]["apps"]/a2["seasons"]["length"]:0x0,


'ga':a2["totals"]['ga'],

'homeName':bI?bI["name"]:'','homeSeasons':bI?bI["seasons"]:0x0,'homeApps':bI?bI["apps"]:0x0,'homeTrophies':bK,


'flags':a2["flags"]||{},

'seasonDouble20':(function(c2){
for(var c3=0x0;c3<a2["seasons"]["length"];c3++)if(a2["seasons"][c3]["goals"]>=0x14&&a2["seasons"][c3]["assists"]>=0x14)return!0x0;
return!0x1;
}()),



'lateGoals':(function(c2){
for(var c3=0x0;c3<a2["seasons"]["length"];c3++)if(a2["seasons"][c3]["age"]>=0x23&&a2["seasons"][c3]["goals"]>=0x14)return!0x0;
return!0x1;
}()),



'poyCount':(a2["awards"]||[]).filter(function(bL){
return bL["name"]["indexOf"]("最佳球员")>=0x0;
})["length"],'topCount':(a2["awards"]||[]).filter(function(bL){
return bL["name"]["indexOf"]('金靴')>=0x0;
})["length"],



'leagueTitles':(function(){var _lt={},_lgNames={};
(a0["LEAGUES"]||[]).forEach(function(l){_lgNames[l["name"]+'冠军']=0x1;});
(a2["trophies"]||[]).forEach(function(t){if(t["name"]&&_lgNames[t["name"]])_lt[t["name"]]=0x1;});
return Object["keys"](_lt)["length"];
}()),



'domTreble':(function(){var _hasL=!0x1,_hasC=!0x1,_hasS=!0x1;
(a2["trophies"]||[]).forEach(function(t){var n=t["name"]||"";
if(!_hasL){var _lg=!0x1;(a0["LEAGUES"]||[]).forEach(function(l){if(n===l["name"]+'冠军')_lg=!0x0;});_hasL=_lg;}
if(!_hasC&&/杯冠军$/.test(n)&&!/世俱杯/.test(n))_hasC=!0x0;
if(!_hasS&&(/超级杯/.test(n)||/社区盾/.test(n)))_hasS=!0x0;
});
return _hasL&&_hasC&&_hasS;
}()),



'seasonTreble':(function(){var _byAge={};
(a2["trophies"]||[]).forEach(function(t){var n=t["name"]||"",_a=t["age"];if(_a==null)return;
_byAge[_a]=_byAge[_a]||{L:!0x1,C:!0x1,U:!0x1};
var _isL=!0x1;(a0["LEAGUES"]||[]).forEach(function(l){if(n===l["name"]+'冠军')_isL=!0x0;});
if(_isL)_byAge[_a]["L"]=!0x0;
if(/杯冠军$/.test(n)&&!/世俱杯/.test(n))_byAge[_a]["C"]=!0x0;
if(/欧冠冠军/.test(n))_byAge[_a]["U"]=!0x0;
});
for(var _k in _byAge)if(_byAge[_k]["L"]&&_byAge[_k]["C"]&&_byAge[_k]["U"])return!0x0;
return!0x1;
}()),



'seasonMaxApps':(function(){var _m=0x0;
(a2["seasons"]||[]).forEach(function(s){if(s["apps"]>_m)_m=s["apps"];});
return _m;
}()),



'cupTitles':(function(){var _c=0x0;
(a2["trophies"]||[]).forEach(function(t){var n=t["name"]||"";
if(/杯冠军$/.test(n)||/超级杯/.test(n)||/社区盾/.test(n))_c++;
});
return _c;
}())};
}function br(bx){
a2["phase"]="summary",



a2["endReaso"+'n']=bx;
var by=bq(),bz="青训淘汰"===by["reason"];




/* ── §13 事件与收尾 ──────────────────────────────────────────── */




function bA(bF){
return null==bF["tier"]?0x9:bF["tier"];
}for(var bB=null,bC=[],bD=0x0;
bD<a0["ENDINGS"]["length"];
bD++){var bE=a0["ENDINGS"][bD];
bz===(0x0===bA(bE))&&bE["test"](by)&&(bC["push"](bE['id']),(!bB||bA(bE)<bA(bB))&&(bB=bE));
}bB&&(a2["ending"]=bB['id']),



a2["endingsA"+'ll']=bC;
}function bs(bx){var by=a2["pending"];
if(!by||"random"!==by["type"]||by["result"])return!0x1;
for(var bz=null,



bA=0x0;
bA<a1["length"];
bA++)a1[bA]['id']===by["eventId"]&&(bz=a1[bA]);
if(!bz)return null;
var bB=bz["options"]||(bz["pool"]&&function(){var bH={};for(var bI in bz)bH[bI]=bz[bI];var bJ=ag(bz["pool"]["slice"]());bH["options"]=bJ["slice"](0x0,(bz["rndPick"]||0x3))["concat"](bz["single"]?[bz["single"]]:[]);for(var bN=0x0;bN<a1["length"];bN++)a1[bN]===bz&&(a1[bN]=bH);return bH["options"];}())||[];bB=bB[Number(bx)];if(!bB)return!0x1;
var bR4=function(bG2){a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':bG2&&bG2["title"]||"事件",'text':bG2&&bG2["text"]||''});};
if(bv(bx),



a2["cheat"]){var bF4=function(bD){
for(var bE=_rs,bF=null,bG=bE,bH=-0x1/0x0,bI=0x0;
bI<0x2;
bI++){_rs=bE,window["EV_ROLL"]&&(window["EV_ROLL"]["reset"](),window["EV_ROLL"]["force"](0x0===bI));
var bJ=aA(),bK=bD["apply"](bJ,ad,bt(bD,bJ)),bL=bu(bK);
bL>bH&&(bH=bL,bG=_rs,bF={'res':bK,'opt':bD,'roll':window["EV_ROLL"]?window["EV_ROLL"]["last"]():null});
}return window["EV_ROLL"]&&window["EV_ROLL"]["force"](null),_rs=bG,bF;
}(bB);bR4({'title':bz["title"],'text':bF4["res"]["text"]});return bF4;}
window["EV_ROLL"]&&window["EV_ROLL"]["reset"]();
var bC=aA(),



bD4={'res':bB["apply"](bC,ad,bt(bB,bC)),'opt':bB,'roll':window["EV_ROLL"]?window["EV_ROLL"]["last"]():null};
bR4({'title':bz["title"],'text':bD4["res"]["text"]});return bD4;
}function bt(bx,



by){
return bx&&"function"==typeof bx['p']?bx['p'](by):null;
}function bu(bx){
if(!bx)return-0x1/0x0;
var by=0x0;
return bx["banned"]&&(by-=0xf4240),



bx["retire"]&&(by-=0xf4240),bx["ban"]&&(by-=0x190*bx["ban"]),bx["banGames"]&&(by-=0x8*bx["banGames"]),
bx["stagnate"]&&(by-=0x96),



bx["lockAbro"+'ad']&&(by-=0x3c*bx["lockAbro"+'ad']),bx["returnHo"+'me']&&(by-=0x12c),bx["leave"]&&(by-=0xf),
bx["goAbroad"]&&(by+=0x1e),



by+=0xa*(bx["ovr"]||0x0),by+=0x14*(bx["roleDelt"+'a']||0x0),by+=bx["fame"]||0x0,by+=0x5*(bx["talent"]||0x0),
by+=0x8*(bx["caps"]||0x0),



(by+=0.1*((bx["clean"]||0x0)+(bx["guanxi"]||0x0)))+0.02*(bx["money"]||0x0);
}function bv(bx){
a2["choices"]&&a2["choices"]["push"](String(bx));
}function bw(bx){
return a2["pending"]?(a2["pending"]["result"]={'text':aD(bx["text"]),'deltas':aF(bx)},



a2["pending"]["result"]):null;
}




/* 赛程归档：世界面板回看往年（滚动保留最近 6 季） */
function _fxArch(key,fx){
if(!fx||!fx["data"])return;
var empty=true;for(var k in fx["data"]){empty=false;break;}
if(empty)return;
var arr=a2[key]=a2[key]||[];
for(var i=0;i<arr.length;i++)if(arr[i]["season"]===fx["season"])return;
arr.push(fx);
}
/* 世界归档季标签：青训期 seasons 未计数，用 年龄-100（负数，时序升序）；职业期=季数 */
function _fxSeasonLab(){
return a2["phase"]==="youth"?(a2["age"]||12)-100:a2["seasons"]["length"]+1;
}
/* 归档打包：存档走 localStorage，原始对象太重；id→名称在解码时反查 */
function _pkRow(r){return [r["i"],r["pts"],r["w"],r["d"],r["l"],r["gf"],r["ga"]].join(",");}
function _pkTblArr(rows){return rows.map(_pkRow).join(";");}
function _unpkRows(str){
if(!str)return null;
return str.split(";").map(function(row,ri){var f=row.split(",");
var t=aj(f[0]);
return{'i':f[0],'n':t?t.name:f[0],'pts':Number(f[1]),'w':Number(f[2]),'d':Number(f[3]),'l':Number(f[4]),'gf':Number(f[5]),'ga':Number(f[6]),'rank':ri+1,'pos':ri+1};});}
function _pkTie(t){return [t["h"]||"",t["a"]||"",t["hg"]==null?"":t["hg"],t["ag"]==null?"":t["ag"],t["sa"]==null?"":t["sa"],t["sb"]==null?"":t["sb"],t["w"]||"",t["p"]?t["p"].join("-"):"",t["b"]?1:"",t["pd"]?1:""].join("~");}
function _unpkTie(sv){var f=sv.split("~");
var o={'h':f[0]||null,'a':f[1]||null};
if(f[2]!=="")o.hg=Number(f[2]);
if(f[3]!=="")o.ag=Number(f[3]);
if(f[4]!=="")o.sa=Number(f[4]);
if(f[5]!=="")o.sb=Number(f[5]);
o.w=f[6]||null;
if(f[7]){var pp=f[7].split("-");o.p=[Number(pp[0]),Number(pp[1])];}
if(f[8]==="1")o.b=1;
if(f[9]==="1")o.pd=1;
return o;}
function _pkBrRds(br){return (br||[]).map(function(rd){return rd["name"]+"#"+rd["ties"].map(_pkTie).join("@");});}
function _unpkBrRds(arr){return (arr||[]).map(function(sv){var i2=sv.indexOf("#");
return{'name':sv.slice(0,i2),'ties':sv.slice(i2+1).split("@").map(_unpkTie)};});}
function _pkContData(data){var o={};
for(var tg in data){var cd=data[tg];if(!cd)continue;
var e={'name':cd["name"],'champion':cd["champion"]};
if(cd["group"])e.group={'standings':(cd["group"]["standings"]||[]).map(_pkRow).join(";"),'matches':(cd["group"]["matches"]||[]).join(";")};
if(cd["rounds"])e.rounds=_pkBrRds(cd["rounds"]);
o[tg]=e;}
return o;}
function _unpkContData(pk){var o={};
for(var tg in pk){var e=pk[tg];
var cd={'name':e["name"],'champion':e["champion"]};
if(e["group"])cd.group={'standings':_unpkRows(e["group"]["standings"]),'matches':e["group"]["matches"]?e["group"]["matches"].split(";").map(Number):[]};
if(e["rounds"])cd.rounds=_unpkBrRds(e["rounds"]);
o[tg]=cd;}
return o;}
function _pkCupData(data){var o={};
for(var k in data){var br=data[k];if(!br)continue;
o[k]={'champion':br["champion"],'n':br["n"],'all':_pkBrRds(br["all"])};}
return o;}
function _archPush(key,season,payload,cap){
var arr=a2[key]=a2[key]||[];
for(var i=0;i<arr.length;i++)if(arr[i]["season"]===season)return;
arr.push({'season':season,'data':payload});
if(cap&&arr.length>cap)arr.splice(0,arr.length-cap);
}
function _fxSeasons(cur,arch){
var out=[],seen={};
if(cur!=null){out.push(cur);seen[cur]=1;}
(arch||[]).forEach(function(f){if(f&&f["season"]!=null&&!seen[f["season"]]){seen[f["season"]]=1;out.push(f["season"]);}});
return out.sort(function(x,y){return x-y;});
}


/* ── §14 公共API ──────────────────────────────────────────────── */




window["SIM"]={'attach':function(bx){return a2=bx;
},'state':function(){return a2;
},'world':function(q){
/* 世界查询（只读）：q.q = leagues|lg|cups|cup|conts|cont；联赛/杯赛当季赛程仅本会话内有效 */
q=q||{};
var out={'season':a2["seasons"]['length']};
var i,lg;
if(q.q==='leagues'||!q.q){
var arr=[];
for(i=0;i<a0["LEAGUES"]["length"];i++){lg=a0["LEAGUES"][i];arr.push({'id':lg['id'],'name':lg["name"],'str':lg["str"],'rep':lg["rep"]});}
arr.sort(function(x,y){return(y["str"]||0x0)-(x["str"]||0x0)||(y["rep"]||0x0)-(x["rep"]||0x0)||(x['id']<y['id']?-0x1:0x1);});
out["leagues"]=arr;
}
if(q.q==='lg'){
out["name"]=(ak(q.id)||{}).name||q.id;
var _lsrc=a2["lgFx"],_larch=null;
if(q["season"]!=null&&(!_lsrc||q["season"]!==_lsrc["season"])){(a2["lgFxArch"]||[]).forEach(function(f){if(f["season"]===q["season"])_larch=f;});}
_lsrc=_larch||_lsrc;
var _ltab=null;
if(q["season"]!=null){
var _ltb=null;
(a2["lgTblArch"]||[]).forEach(function(f){if(f["season"]===q["season"])_ltb=f;});
if(_ltb)_ltab=_unpkRows(_ltb["data"][q.id]);
else if(_larch&&_larch["tables"])_ltab=_unpkRows(_larch["tables"][q.id]);
}else{
_ltab=a2["lgTables"]&&a2["lgTables"][q.id];
}
if(!_ltab&&a2["lastTables"]&&a2["lastTables"][q.id]){_ltab=[];var od=a2["lastTables"][q.id];for(i=0;i<od["length"];i++)_ltab.push({'i':od[i],'pos':i+1});}
out["table"]=_ltab;
if(_larch&&_larch["data"]){var _dec=_larch["data"][q.id];
out["rounds"]=_dec?_dec.split("|").map(function(rd){return rd.split(";").map(function(m){return m.split(",").map(function(v,mi){return mi<2?v:Number(v);});});}):null;
}else{
out["rounds"]=_lsrc?_lsrc["data"][q.id]||null:null;
}
out["fxSeason"]=_lsrc?_lsrc["season"]:0;
out["curSeason"]=a2["lgFx"]?a2["lgFx"]["season"]:0;
out["fxSeasons"]=_fxSeasons(a2["lgFx"]?a2["lgFx"]["season"]:0,a2["lgTblArch"]);
}
if(q.q==='cups'){
var arr2=[];
for(var own in a2["lastCups"]||{}){var lgo=ak(own);if(!lgo)continue;
if(lgo["cup"])arr2.push({'name':lgo["cup"],'champ':a2["lastCups"][own]["cup"]});
if(lgo["leagueCup"])arr2.push({'name':lgo["leagueCup"],'champ':a2["lastCups"][own]["lgCup"]});}
out["cups"]=arr2;
}
if(q.q==='cup'){
out["name"]=q.id;
var _csrc=a2["cupFx"],_carch=null;
if(q["season"]!=null&&(!_csrc||q["season"]!==_csrc["season"])){(a2["cupFxArch"]||[]).forEach(function(f){if(f["season"]===q["season"])_carch=f;});}
if(_carch){
var _cd2=_carch["data"][q.id];
out["bracket"]=_cd2?{'champion':_cd2["champion"],'n':_cd2["n"],'all':_unpkBrRds(_cd2["all"])}:null;
}else{
out["bracket"]=_csrc?_csrc["data"][q.id]||null:null;
}
out["bracketSeason"]=_csrc?_csrc["season"]:0;
out["curSeason"]=a2["cupFx"]?a2["cupFx"]["season"]:0;
out["fxSeasons"]=_fxSeasons(a2["cupFx"]?a2["cupFx"]["season"]:0,a2["cupFxArch"]);
}
if(q.q==='conts'){
var arr3=[];for(var tg in _contCfg)arr3.push({'id':tg,'name':_contCfg[tg]["name"]});
out["conts"]=arr3;
}
if(q.q==='cont'){
    out["name"]=_contCfg[q.id]?_contCfg[q.id]["name"]:q.id;
    var _osrc=a2["contFx"],_oarch=null;
    if(q["season"]!=null&&(!_osrc||q["season"]!==_osrc["season"])){(a2["contFxArch"]||[]).forEach(function(f){if(f["season"]===q["season"])_oarch=f;});}
    _osrc=_oarch||_osrc;
    if(_oarch){var _od=_unpkContData(_oarch["data"]);
out["data"]=_od[q.id]||null;
    }else{
out["data"]=_osrc?_osrc["data"][q.id]||null:null;
    }
out["dataSeason"]=_osrc?_osrc["season"]:0;
    out["curSeason"]=a2["contFx"]?a2["contFx"]["season"]:0;
    out["fxSeasons"]=_fxSeasons(a2["contFx"]?a2["contFx"]["season"]:0,a2["contFxArch"])["filter"](function(sn){
if(a2["contFx"]&&a2["contFx"]["season"]===sn&&a2["contFx"]["data"][q.id])return true;
for(var ai=0;ai<(a2["contFxArch"]||[]).length;ai++){var f=a2["contFxArch"][ai];if(f["season"]===sn&&f["data"]&&f["data"][q.id])return true;}
return false;});
    if(!out["data"]&&a2["contHist"]){for(i=a2["contHist"]["length"]-1;i>=0;i--)if(a2["contHist"][i]["comp"]===q.id){out["champ"]=a2["contHist"][i]["tid"];break;}}
}
if(q.q==='natTs'){
    var arr5=[];for(var tg5 in _natFxNames)arr5.push({'id':tg5,'name':_natFxNames[tg5]});
    out["natTs"]=arr5;
}
if(q.q==='natT'){
    out["name"]=_natFxNames[q.id]||q.id;
    var _nsrc=a2["natFx"],_narch=null;
    if(q["season"]!=null&&(!_nsrc||q["season"]!==_nsrc["season"])){(a2["natFxArch"]||[]).forEach(function(f){if(f["season"]===q["season"])_narch=f;});}
    _nsrc=_narch||_nsrc;
    out["data"]=_nsrc?_nsrc["data"][q.id]||null:null;
    out["dataSeason"]=_nsrc?_nsrc["season"]:0;
    out["curSeason"]=a2["natFx"]?a2["natFx"]["season"]:0;
    out["fxSeasons"]=_fxSeasons(a2["natFx"]?a2["natFx"]["season"]:0,a2["natFxArch"])["filter"](function(sn){
if(a2["natFx"]&&a2["natFx"]["season"]===sn&&a2["natFx"]["data"][q.id])return true;
for(var ai=0;ai<(a2["natFxArch"]||[]).length;ai++){var f=a2["natFxArch"][ai];if(f["season"]===sn&&f["data"]&&f["data"][q.id])return true;}
return false;});
}
if(q.q==='nat'){
    var natYrs=[];
    (a2["natRuns"]||[]).forEach(function(nr){natYrs.push(nr);});
    (a2["tournaments"]||[]).forEach(function(tn){natYrs.push(tn);});
    natYrs.sort(function(a,b){return(a["age"]||0)-(b["age"]||0);});
    out["natYears"]=natYrs;
    out["natStats"]=a2["natStats"]||{goals:0,assists:0,cs:0};
    out["caps"]=a2["caps"]||0;
}
return out;
},'newState':function(bx,by,bz,bA,bAch){return a2=function(bB,bC,bD,bE,bAch){var bF=bC["origin"],bG=az(bE),cK=null;
/* origin 允许传 id 字符串（存档/测试）或对象（UI），统一解析成对象 */
if(typeof bF==='string')bF=bp(bF);
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
'life':{'partner':null,'married':0x0,'kids':[],'splits':0x0},'natForm':{'wc':0x0,'asia':0x0},'flags':{},'staff':{},'pending':null,'_awardDue':!0x1,'_yCaps':{},'_yGoals':{},'usedEvents':{},'choices':[],'eventLog':[],'news':[],
'rid':null,'achBonus':bAch||null,'playerType':0xb};
}(bx,by,bz,bA,bAch),a2["playerType"]=calcPlayerType(),a2;
},



'nextStep':bk,'doPeriod':bl,'choose':function(bx){var by,bz,bA=a2["pending"];
if(!bA)return!0x1;
if("random"===bA["type"]){var bB=bs(bx);
if(null===bB)return bk(),!0x0;

return!!bB&&(bw(bB["res"]),!0x0);
}if("youth_pa"+'th'===bA["type"]){var bC=bA["offers"][Number(bx)];
return!!bC&&(bv(bx),a2["youthTea"+"mId"]=bC,a2["teamId"]=bC,aq(aj(bC))['cn']||(a2["money"]-=_youthFee(aj(bC)["rep"]),a2["flags"]["youthAbr"+"oad"]=!0x0),
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
}return "staff"===bA["type"]?(bv(bx),"skip"!==bx&&bA["offers"]["indexOf"](bx)>=0x0&&(a2["staff"]=a2["staff"]||{},function(_d){_d&&(a2["staff"][_d.type]={'y':0x0,'tier':_d.tier});}(_stById(bx))),
a2["pending"]=null,bk(),!0x0):"bigmatch"===bA["type"]?!bA["result"]&&function(bG){
var bH,bI=a2["bigQ"][0x0],bJ=null;
var _p=bA;
for(bH=0x0;bH<aY["length"];bH++)aY[bH]["key"]===bG&&(bJ=aY[bH]);
var _dec=_p["dec"]||"kickoff";




/* 决策点: 开场介绍 —— 单一"开始比赛"按钮；U系列为赛前选拔态度选项 */




if(_dec==="intro"){
  bG&&"start"!==bG&&_yKind(bI["kind"])&&_ntApplySel(bI,bG,_p);
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
}(bx):"retire_f"+"orced"===bA["type"]&&(bv(bx),



br("无人问津"),!0x0);
},'cont':function(){var bx=a2["pending"];
if(bx){if("report"===bx["type"]||("random"===bx["type"]||"bigmatch"===bx["type"])&&bx["result"]){if("random"===bx["type"]&&bx["result"]){if(a2["pending"]=null,!a2["flags"]["_double"]&&ad()<0.35){var by=aE();
if(by)return a2["usedEven"+'ts'][by['id']]=(a2["usedEven"+'ts'][by['id']]||0x0)+0x1,a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1,
by['cn']&&(a2["flags"]["_cnCount"]=(a2["flags"]["_cnCount"]||0x0)+0x1),a2["flags"]["_double"]=!0x0,void(a2["pending"]={'type':"random",'eventId':by['id']});
}return "youth"===a2["phase"]?void(a2["bigQ"]&&a2["bigQ"]["length"]?aW():bk()):void bl();
}if("report"===bx["type"])return a2["pending"]=null,



void(a2["bigQ"]&&a2["bigQ"]["length"]?aW():bk());
if("bigmatch"===bx["type"]&&bx["result"]){if(a2["pending"]=null,a2["bigQ"]&&a2["bigQ"]["length"])return void aW();if(a2["period"]){var bz=b7();
return void(bz&&(a2["pending"]={'type':"report",'recs':bz}));
}bk();
}else a2["pending"]=null,

void(a2["bigQ"]&&a2["bigQ"]["length"]?aW():bk());
}}else bk();
},'resolveEvent':bs,'commitEvent':bw,'goSummary':br,'optHint':function(bx,by){var bz=bx&&bx["options"]&&bx["options"][by];
if(!bz)return'';
if("function"!=typeof bz["hint"])return bz["hint"]||'';
var bA=aA();
return bz["hint"](bA,



bt(bz,bA))||'';
},'BIG_OPTS':aY,'STAFF':a5,'staffById':function(bx){return _stById(bx);},



'staffFee':a8,'staffPrice':a7,'staffMkt':function(){return a2["staffMkt"]||null;},
'youthInvest':function(bx,by){
var _cost={'train':18,'fit':14,'nut':10,'gx':10}[bx];
if(_cost==null)return!0x1;
a2["yInv"]=a2["yInv"]||{};
if(by){a2["yInv"][bx]=0x1;return!0x0;}
delete a2["yInv"][bx];return!0x0;
},
'youthTrialP':function(){return _yTrialP();},
'youthTrial':function(){
if("youth"!==a2["phase"]||!a2["youthTea"+"mId"])return{'ok':!0x1,'txt':'现在不是青训期'};
if(a2["money"]<0x12)return{'ok':!0x1,'txt':'家里拿不出 18 万报名费'};
a2["money"]-=0x12;
var _cur=bg(),_curRep=_cur?_cur["rep"]:1,_pool=[],_pi,_pt,_p=_yTrialP();
/* 候选=五大联赛里所有比当前青训营更强的队（且学费付得起）。
   按 rep 加权随机挑一：高档次更常见，但不再被 sort+slice 锁死成英超三家顶豪 */
var _BIG5={'epl':1,'liga':1,'seri':1,'bund':1,'l1':1},_top=[];
for(_pi=0x0;_pi<a0["TEAMS"]["length"];_pi++){_pt=a0["TEAMS"][_pi];
if(_pt['id']===(a2["youthTeamId"]||''))continue;
if(_BIG5[aq(_pt)['id']]&&_pt["rep"]>_curRep&&a2["money"]>=_youthFee(_pt["rep"]))_top.push(_pt);
}
if(_top["length"]){
var _wS=0x0,_wI,_wR;
for(_wI=0x0;_wI<_top["length"];_wI++)_wS+=(_top[_wI]["rep"]||0x1);
_wR=ad()*_wS;
_pool=[];
for(_wI=0x0;_wI<_top["length"];_wI++){_wR-=(_top[_wI]["rep"]||0x1);if(_wR<0x0){_pool["push"](_top[_wI]);break;}}
if(!_pool["length"])_pool["push"](_top[_top["length"]-0x1]);
}else{
for(_pi=0x0;_pi<a0["TEAMS"]["length"];_pi++){_pt=a0["TEAMS"][_pi];
if(_pt['id']===(a2["youthTeamId"]||''))continue;
if(aq(_pt)['cn']&&_pt["rep"]>_curRep&&_pt["rep"]<=_curRep+1)_pool["push"](_pt);
}
for(_pi=0x0;_pi<a0["TEAMS"]["length"];_pi++){_pt=a0["TEAMS"][_pi];
if(_pt['id']===(a2["youthTeamId"]||''))continue;
if(!aq(_pt)['cn']&&_pt["rep"]>=0x3&&a2["money"]>=_youthFee(_pt["rep"]))_pool["push"](_pt);
}
}
if(_pool["length"]&&ad()<_p){ag(_pool),_pt=_pool[0x0];
var _abroad=!aq(_pt)['cn'];
_abroad&&(a2["money"]-=_youthFee(_pt["rep"]),a2["flags"]["youthAbroad"]=!0x0);
a2["youthTeamId"]=_pt['id'],a2["teamId"]=_pt['id'];
return{'ok':!0x0,'up':!0x0,'txt':"试训通过，进了 "+_pt["name"]+" 的青训营"+(_abroad?"，家里把学费也凑上了":"")};
}
return{'ok':!0x0,'up':!0x1,'txt':"试训没成。对方教练客客气气把你送出门，说下年再来。"};
},
'transferReroll':function(){
var _p=a2["pending"];
if(!_p||_p["type"]!=="transfer")return{'ok':!0x1,'txt':'现在不在转会窗'};
if(!_p["rerolls"]||_p["rerolls"]<=0)return{'ok':!0x1,'txt':'经纪人已经打完所有电话了'};
var _old={},_i;
for(_i=0x0;_i<_p["offers"]["length"];_i++)_old[_p["offers"][_i]]=0x1;
var _ids=[],_tries=0x0;
while(_tries++<0x6){
_ids=bf(_p["offers"]["length"])["map"](function(_t){return _t['id'];});
var _same=_ids["length"]>0x0&&_ids["every"](function(id){return _old[id];});
if(!_same)break;
}
if(!_ids["length"])return{'ok':!0x1,'txt':'电话打不通，名单没变'};
a2["_offerTerms"]=a2["_offerTerms"]||{};
for(_i=0x0;_i<_ids["length"];_i++)_trTerms(aj(_ids[_i]));
_p["rerolls"]--;_p["offers"]=_ids;
return{'ok':!0x0,'offers':_ids,'left':_p["rerolls"]};
},
'staffTen':function(bx){var _v=a2["staff"]&&a2["staff"][bx];
return _v&&typeof _v==="object"?_v["y"]||0x0:0x0;},
'yCaps':function(){return a2["_yCaps"]||{};},
'yGoals':function(){return a2["_yGoals"]||{};},
'flagGet':function(bx){return a2["flags"][bx];},
'pushBig':function(bx){var _y=_yNT[bx];if(!_y)return!0x1;
  return aV(bx,0.6,{'comp':_y["comp"],'opp':(_y["pool"]||["选拔队"])[0x0],'oppStr':Math.round(a2["ovr"]+0x8),'_quick':_y["quick"]||0x0});},
'pushPri':function(bx,by,bz){return _aVPri(bx,by,bz);},
'dbyDump':function(){var o={};for(var k in _dby)o[k]=_dby[k]["map"](function(e){return e[0x0]+':'+e[0x1]+':'+_dbyType(e[0x1]);});return o;},
'bmIntro':function(bx,by,bz){return _bmIntro({'kind':bx,'comp':by,'opp':bz,'team':'皇家马德里'});},
'teamHire':function(bx){
var _r=_stById(bx);
if(!_r||!a2["staffMkt"]||a2["staffMkt"]["ids"]["indexOf"](bx)<0x0)return null;
if(a2["money"]<a7(_r))return null;
a2["staffMkt"]["ids"]=a2["staffMkt"]["ids"]["filter"](function(_id){return _id!==bx;});
a2["staff"]=a2["staff"]||{};
/* 同类型直接替换（高低级别互换），任期重新计 */
a2["staff"][_r.type]={'y':0x0,'tier':_r.tier};
return _r["name"];
},
'teamFire':function(bx){
var _r=_stById(bx);
if(!_r||!a6(_r.type))return null;
/* 违约金按已雇级别算（辞退厨师团队≠辞退私人厨师） */
var _t=(a2["staff"][_r.type]&&a2["staff"][_r.type]["tier"])||1;
var _def=_stById(_t===1?_r.type:_r.type+_t);
a2["money"]-=a7(_def),delete a2["staff"][_r.type];
return _def["name"];
},'leagueOfTeam':aq,'makeAcademy':bm,'makeTransfer':bo,'vetInvitePool':_invitePool,'offerBrief':function(bx){var by=aj(bx);
if(!by)return null;
var bz=aq(by),



bA=aI(by),bC=a2["_offerTerms"]&&a2["_offerTerms"][by['id']];
if(!bC){var bD=aJ(by,bz,a2["ovr"]),bE=be(),bF=0.9+0.2*ad(),

bG=0x1;
bG=bE<=0x1?1.3:0x2===bE?1.15:0x3===bE?0x1:0x4===bE?0.9:0.82;
bC={'wage':_wageOf(by,bz,bF*bG),

'years':bE,

'mult':bF*bG};
}return{'wage':bC["wage"],'years':bC["years"],'role':bA,'roleName':a0["ROLES"][bA]["name"],'mult':bC["mult"]};
},



'wageAt':aJ,'annualWage':_wageOf,'leagueWeight':_lgW,'leagueWeights':_LGW,'academyName':function(bx){
return bx?bx["academy"]||bx["name"]+" 梯队":"青训队";
},'YOUTH_ADULT_OVR':0x2a,'bigOpponent':aU,



'rnd':ad,'rint':ae,'rpick':af,'shuffle':ag,'rweight':ah,'hashStr':ai,'clamp':ac,
'teamById':aj,'leagueById':ak,'posById':al,



'curTeam':ar,'curLeague':as,'inChina':au,'originById':bp,'isNear':ab,'isHome':function(bx,
by){var bz=aa[bx];
return!!bz&&bz["indexOf"](by)>=0x0;
},



'fmtMoney':av,'fmtValue':function(bx){
return bx>=0x5f5e100?(bx/0x5f5e100)["toFixed"](0x2)["replace"](/0$/,'')+" 亿欧":bx>=0x2710?Math["round"](bx/0x2710)+" 万欧":bx+'\x20欧';
},



'valueOf':function(bx,by){var bz,bA=a0["VALUE_TA"+"BLE"],bB=bA[0x0][0x1];
for(bz=0x0;
bz<bA["length"];
bz++){if(bx<=bA[bz][0x0]){if(0x0===bz){bB=bA[0x0][0x1];
break;
}var bC=bA[bz-0x1],



bD=bA[bz];
bB=bC[0x1]+(bD[0x1]-bC[0x1])*(bx-bC[0x0])/(bD[0x0]-bC[0x0]);
break;
}bB=bA[bz][0x1];
}var bE=0x1;
return by>0x1c&&(bE*=Math["pow"](0.88,



by-0x1c)),by>0x21&&(bE*=Math["pow"](0.75,by-0x21)),by<0x14&&(bE*=1.15),Math["max"](0x4e20,
0x2710*Math["round"](bB*bE/0x2710));
},



'snap':aA,'stageOf':aB,'pickRival':aC,'interpolate':aD,'pickEvent':aE,'applyResult':aF,'growthRange':aG,'computeRole':aH,



'roleAtTeam':aI,
'posRates':aK,'starPower':aL,'nationalOdds':aM,'runTournament':aP,'natBest':function(){var bx={};
return(a2["natRuns"]||[])["forEach"](function(by){
(!bx[by["comp"]]||aQ[by["stage"]]>aQ[bx[by["comp"]]["stage"]])&&(bx[by["comp"]]=by);
}),



["世界杯","亚洲杯"]["filter"](function(by){return bx[by];
})["map"](function(by){return bx[by];
});
},'natResult':aZ,'simulateOneSeason':b2,



'addAward':b5,'runPeriod':b6,'doTransfer':b8,'pickOffers':bf,'offerOption':function(bx,
by){var bz=aq(bx);
return{'teamId':bx['id'],



'team':bx,'label':"加盟 "+bx["name"],'info':bz["name"]+" · "+["保级队","中下游",'中游','争冠','豪门',"顶级豪门"][bx["rep"]],
'tag':by||null};
},



'buildProfile':bq,'legacyFrom':function(bx){
if(!bx)return null;
var by=(bx["gen"]||0x1)+0x1;
return bx["banned"]?{'gen':by,



'ovr':0x0,'talent':0x0,'guanxi':0x0,'money':0x0}:{'gen':by,'ovr':ac(Math["round"]((bx["maxOvr"]-0x44)*0x2/0x5),0x0,ay["ovr"]),




'talent':ac(Math["round"]((bx["maxOvr"]-0x44))/0x64,0x0,ay["talent"]),'guanxi':ac(Math["round"](bx["caps"]*0x2/0x5+3*bx["trophies"]),



0x0,ay["guanxi"]),
'money':ac(Math["round"](0.01*bx["careerEa"+"rnings"]),0x0,ay["money"])};
},'normLegacy':az,'LEGACY_CAP':ay,



'SAVE_VER':0x6,'MODES':a3,'ORIGINS':a4,'NEAR_TEAMS':a9,'HOME_TEAMS':aa,'NAT_RANK':aQ,'NAT_SHORT':{'预选赛出局':"没打进正赛",
'小组赛出局':"小组赛出局",



'止步十六强':"十六强",'止步八强':'八强','止步四强':'四强','亚军':'亚军','冠军':'冠军'},
/* 测试/探针导出：世界引擎直驱与只读状态（不改变任何行为） */
'simWorld':function(bz,bx,by){return _runWorld(bz,bx,by);},
'promoReleg':function(bz,bx,by){return _promoReleg(bz,bx,by);},
'devOf':function(tid){return _tDev(tid);},
'titleStreak':function(tid){return a2["titleStreak"]&&a2["titleStreak"][tid]||0;},
'lastTables':function(){return a2["lastTables"]||null;}};
/* API 边界同步镜像：每次调用返回前把 _rs 刷回 a2.rngState（存档随时可能序列化 a2）；
   attach/newState 反向加载（新状态自带种子） */
(function(){
var S=window["SIM"];
for(var k in S){(function(k){
var f=S[k];if(typeof f!=="function")return;
if(k==="attach"||k==="newState")return;
S[k]=function(){var r=f.apply(null,arguments);if(a2)a2["rngState"]=_rs;return r;};
})(k);}
var fA=S["attach"];
S["attach"]=function(bx){var r=fA(bx);if(a2)_rs=a2["rngState"]>>>0;return r;};
var fN=S["newState"];
S["newState"]=function(){var r=fN.apply(null,arguments);if(a2)_rs=a2["rngState"]>>>0;return r;};
}());
}()));




function _sim_0b(x,x){
    
    
    
    return '';
    
    
    



}



function _sim_0a(){
    
    
    
    return [];
    
    
    



}