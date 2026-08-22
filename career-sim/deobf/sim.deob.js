(0x0,!(function(){'use strict';

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
function az(bx){
if(!bx||"object"!=typeof bx)return null;
var by=Math["round"](Number(bx["gen"])||0x0);
return by>=0x2?{'gen':Math["min"](by,0x3e7),'ovr':ac(Math["round"](Number(bx["ovr"])||0x0),0x0,ay["ovr"]),'talent':ac(Number(bx["talent"])||0x0,0x0,ay["talent"]),
'guanxi':ac(Math["round"](Number(bx["guanxi"])||0x0),0x0,ay["guanxi"]),'money':ac(Math["round"](Number(bx["money"])||0x0),0x0,ay["money"])}:null;
}function aA(){var bx=ar(),by=as(),bz={'age':a2["age"],'ovr':a2["ovr"],'talent':a2["talent"],'guanxi':a2["guanxi"],'clean':a2["clean"],
'fame':a2["fame"],'money':a2["money"],'caps':a2["caps"],'natGoals':a2["natStats"]&&a2["natStats"]["goals"]||0x0,'roleRank':a0["ROLES"][a2["role"]]["rank"],
'pos':a2["pos"],'posGroup':al(a2["pos"])["group"],'inChina':au(),'inAcademy':"youth"===a2["phase"],'hasPartner':!(!a2["life"]||!a2["life"]["partner"]),
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
bx["banGames"]&&(a2["banGames"]+=bx["banGames"],by["push"]({'cls':"down",'text':"停赛 "+bx["banGames"]+'\x20场'})),bx["ban"]&&(a2["banLeft"]+=bx["ban"],
by["push"]({'cls':"down",'text':"禁赛 "+bx["ban"]+" 个赛季"})),bx["banned"]&&(a2["banned"]=!0x0,by["push"]({'cls':"down",'text':"终身禁足"})),
bx["mult"]&&(a2["pendingM"+"ult"]=bx["mult"]),bx["leave"]&&(a2["flags"]["_forceLe"+"ave"]=!0x0),bx["stagnate"]&&(a2["stagnate"]=!0x0),
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
}function aG(bx){
for(var by=a0["GROWTH"],bz=by[0x0]['d'],bA=0x0;
bA<by["length"];
bA++)bx>=by[bA]["age"]&&(bz=by[bA]['d']);
return bz;
}function aH(){var bx=ar();
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
}function aM(){return{'wcq':0.012+0.55*aL()};
}var aN=[{'p':[0.14,0.5],'next':"十六强"},{'p':[0.22,0.42],'next':'八强'},{'p':[0.2,0.42],'next':'四强'},{'p':[0.25,0.38],'next':'决赛'},
{'p':[0.32,0.32],'next':'冠军'}],aO=[{'p':[0.55,0.38],'next':"十六强"},{'p':[0.33,0.42],'next':'八强'},{'p':[0.28,0.44],'next':'四强'},
{'p':[0.32,0.4],'next':'决赛'},{'p':[0.38,0.34],'next':'冠军'}];
function aP(bx,by){
for(var bz="小组赛",bA=0x0;
bA<bx["length"];
bA++){if(bA===bx["length"]-0x1)return{'final':!0x0,'p':bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by};
if(ad()>=bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by)return{'stage':0x0===bA?"小组赛出局":'止步'+bz};
bz=bx[bA]["next"];
}return{'final':!0x0,'p':0.5};
}var aQ={'预选赛出局':0x0,'小组赛出局':0x1,'止步十六强':0x2,'止步八强':0x3,'止步四强':0x4,'亚军':0x5,'冠军':0x6},aR={'wc':{'icon':'🏆','side':"中国队"},'asia':{'icon':'🏅',
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
if("asia"===bx)return af(['日本','韩国','伊朗','沙特',"澳大利亚"]);
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
}function aW(){var bx=a2["bigQ"][0x0],bk2=ac((a2["ovr"]-0x46)/0x1e,-0.5,0x1),by,by2,bz,bz2;by2=ad();by=by2<0.38-0.25*bk2?0x0:by2<0.73?0x1:by2<0.93-0.15*bk2?0x2:0x3;bz2=ad();bz=bz2<0.5+0.2*bk2?0x0:bz2<0.85?0x1:0x2;
var bE2=ad(),bF2=null;
if(bE2<("derby"===bx["kind"]||"wc"===bx["kind"]?0.45:0.3)){
var bG2=[
['第'+ae(8,28)+' 分钟，你送出一记过顶球，队友单刀推射得手！',1,0],
['第'+ae(14,40)+' 分钟，禁区一片混战，是你最先把球捅进了网窝！',1,0],
['第'+ae(16,44)+' 分钟，你在二十五米外起脚远射，皮球直挂死角！这球会被反复回放。',1,0],
['第'+ae(12,38)+' 分钟，对方利用角球混战率先破门。',0,1],
['第'+ae(18,48)+' 分钟，你们的左路被连续打穿，失球来自一次二点进攻。',0,1],
['第'+ae(9,34)+' 分钟，你的远射击中立柱弹出，全场齐声惊呼。',0,0],
['VAR 回看判定越位在先，进球无效，比分保持不变。',0,0],
['第'+ae(11,36)+' 分钟，对方前锋的单刀被你们门将神扑化解，他抱着球冲队友怒吼。',0,0],
['雨越下越大，皮球在湿滑的草皮上不听使唤，双方失误都开始变多。',0,0],
['中场绞杀白热化，短短三分钟内裁判掏出了两张黄牌。',0,0],['第'+ae(88,93)+' 分钟，主裁判指向点球点！全场屏息——你深吸一口气，骗过门将推进死角！',1,0],['第'+ae(88,93)+' 分钟，你站上十二码点——可对方门将猜对了方向！扑出球的他顺势发动反击…',0,1],
];
if("derby"===bx["kind"])bG2=bG2.concat([
['第'+ae(13,39)+' 分钟，全场最恨的那个人战术犯规了——黄牌和嘘声一起砸向他。',0,0],
['第'+ae(15,41)+' 分钟，你的挑射擦着横梁飞出，对面看台齐刷刷倒吸一口凉气。',0,0],
['补时第'+ae(1,4)+' 分钟，你在禁区弧顶拿球，身前是三个人——你起脚了！球从缝隙里钻进了网窝！绝杀！',1,0],['补时阶段你的传球被断，对方的反击长传打穿了压上的防线……',0,1]]);
else if("wc"===bx["kind"]||"asia"===bx["kind"])bG2=bG2.concat([
['国歌奏响的那一刻，你的眼眶发热——这份重量只有扛着它的人知道。',0,0],
['亿万双眼睛正透过屏幕注视着这块草皮。',0,0],
['看台上旅欧球迷助威团的鼓声，从开场第一秒就没停过。',0,0]]);
else if("cont"===bx["kind"])bG2=bG2.concat([
['欧冠主题曲响起的瞬间，整座球场灯光熄灭，只剩星海般的手机灯。',0,0],
['客场远征军的旗帜铺满了上层看台，那是漂泊者的军团。',0,0],
['欧洲之巅的对决，每一次触球都被整块大陆注视着。',0,0]]);
else if("promo"===bx["kind"]||"drop"===bx["kind"])bG2=bG2.concat([
['一整年三十四轮的意义，全部压缩进了这九十分钟。',0,0],
['看台上有人举着写满年份的旧横幅——上一代人等这一场等了很久了。',0,0]]);
var bH2=bG2[Math["floor"](ad()*bG2["length"])];
by=Math["max"](0,by+bH2[1]),bz=Math["max"](0,bz+bH2[2]),bF2=bH2[0];}
var bI2=by>bz?1:by<bz?-1:0;
var bJ2={"derby":{"hold":["收缩防线","先别丢球，德比的反击最能要命"],"push":["为他们冲垮对面","全城的人今晚都看着这一场"],"run":["在中场缠住他们","把德比变成一场绞肉机"]},
"wc":{"hold":["踢得务实些","亿万人的期待，先站稳脚跟"],"push":["为国家豁出去","这九十分钟重过一切"],"run":["让皮球流动起来","国家队的比赛也要踢出内容"]},
"cont":{"hold":["控制节奏","欧战的老经验：千万别慌"],"push":["全场高压逼抢","站上欧洲之巅就不能退缩"],"run":["控球渗透","用传球掌控自己的命运"]},
"asia":{"hold":["务实防守","先把零封拿到手再说"],"push":["全力冲击对手","在亚洲我们要建立统治"],"run":["地面推进","把球黏在自己脚下"]},
"promo":{"hold":["守住这个结果","升级只差一步，别功亏一篑"],"push":["历史由我们书写","冲上去，结束所有人的等待"],"run":["耐心倒脚","把焦虑都还给对面的球迷"]},
"drop":{"hold":["冷静，再冷静","保级最需要的是清醒的头脑"],"push":["豁出去搏命","反正降级了说什么都晚了"],"run":["把球牢牢拿住","多消耗一秒，他们就多急一分"]}};
var bK2=bJ2[bx["kind"]]||{};
function bL2(k){var df=null;for(var t=0;t<aY.length;t++)if(aY[t]["key"]===k)df=aY[t];return{"key":k,"label":bK2[k]?bK2[k][0]:df["label"],"hint":bK2[k]?bK2[k][1]:df["hint"]};}
var bM2=by>bz?["hold","wall","push"]:by<bz?["push","solo","hold"]:["hold","push","run"];
bx["opts"]=bM2.map(bL2);
bx["half"]=[by,bz],bx["ev"]=bF2,a2["pending"]={'type':"bigmatch",'kind':bx["kind"],'comp':bx["comp"],'icon':aR[bx["kind"]]["icon"],'side':aR[bx["kind"]]["side"]||bx["team"],
'opp':bx["opp"],'half':[by,bz],'opts':bx["opts"],'log':aX(bx,by,bz)};
}function aX(bx,by,bz){var bA=aR[bx["kind"]]["side"]||bx["team"],bB=[],bC=ae(0x0,0x4),bD=ae(0x0,0x2);
'derby'===bx["kind"]&&bB["push"](af(["这座城市提前一周就分成了两半。","地铁里两拨球迷隔着车厢对视。","报纸头版印着历史交手记录：恩怨已经写了一百年。","看台上有人在发那种著名的挑衅海报。","出租车司机一路都在骂对面那个队。"]));
bx["ev"]&&bB["unshift"](bx["ev"]);return 0x0===by&&0x0===bz?bB["push"]("上半场谁都没打开"+"局面。你们在中场"+"来回磨了四十五分"+'钟。'):by>bz?(bB["push"]('第\x20'+ae(0x9,0x29)+" 分钟，"+bA+("先进了一个。看台"+"整个站了起来。")),
by>0x1&&bB["push"]("半场结束前又来一"+"个。你们把优势拉"+"到了两球。"),bz&&bB["push"]("对方在补时扳回一"+"个。中场哨响时那"+"边的替补席在喊。")):by<bz?(bB["push"]('第\x20'+ae(0x6,0x26)+(" 分钟丢球。皮球"+"进网的那一下，场"+"里安静得能听见对"+"方球迷。")),
bz>0x1&&bB["push"]("下半场开始前又被"+"打进一个。你们落"+"后两球。"),by&&bB["push"]("你们在半场前扳回"+"一个，比分咬住了"+'。')):bB["push"]("上半场互交白卷式"+"的两球。谁也没能"+"把比分甩开。"),
bB["push"](0x0===bD?"中场休息。更衣室"+"里教练在白板上画"+"了一通，最后转过"+"头看着你。":0x1===bD?"中场休息。主队球迷"+"的歌声盖过了客队，"+"教练在战术板上写了"+"又擦。":"中场休息。裁判因为"+"几次争议判罚被围住"+"，保安把两边隔开。"),by>0x2&&bB["push"]("上半场你们就进了三"+"个，看台已经有人提"+"前庆祝了。"),bz>0x1&&bB["push"]("对方两球在手，气势"+"正盛。你们的防线感"+"觉快撑不住了。"),bB;
}var aY=[{'key':"hold",'label':"稳住阵型",'hint':"小幅提高赢面，个"+"人数据平淡",'dp':0.06,'glory':0.12,'mood':0x4},{'key':"push",'label':"压上去搏",
'hint':"赢面涨得最多，也"+"最可能被反击打穿",'dp':0.13,'glory':0.5,'mood':0x0,'risk':!0x0},{'key':"run",'label':"把球做出来",'hint':"居中，队友更愿意"+'找你',
'dp':0.09,'glory':0.28,'mood':0x8},{'key':'solo','label':'自己单干','hint':'不再信任队友，孤注一掷用个人能力解决问题','dp':0.02,'glory':0.62,'mood':-0x4},{'key':'wall','label':'全员退防','hint':'摆大巴死守到底，难看但有效','dp':0.12,'glory':0.04,'mood':0x2}];
function aZ(bx,by,bz){
b0(bx,by,bz,a2["age"]);
}function b0(bx,by,bz,bA){
a2["natRuns"]["push"]({'age':bA,'comp':by,'stage':bz}),'冠军'===bz?(bx["trophies"]["push"](by+'冠军'),a2["trophies"]["push"]({'name':by+'冠军','age':bA,'team':"国家队"})):bx["nat"]=by+bz;
}function b1(bx){
a2["forceQ"]||(a2["forceQ"]=[]),a2["usedEven"+'ts'][bx]||a2["forceQ"]["indexOf"](bx)<0x0&&a2["forceQ"]["push"](bx);
}function b2(){var bx=ar(),by=as(),bz={'age':a2["age"],'teamId':a2["teamId"],'teamName':bx?bx["name"]:"无球可踢",'color':bx?bx["color"]:null,
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
bF>0x0&&(bG*=Math["max"](0.16,(0x64-a2["ovr"])/0x32)),bF<0x0&&(a2["achBonus"]&&a2["achBonus"]["decay"]&&(bF*=a2["achBonus"]["decay"]),bG=a6("fitness")?0.8:0x1),a2["ovr"]=ac(a2["ovr"]+bF*bG,0x14,0x63),
a2["cheat"]){var bH=ac(0x2a+bp(a2["originId"])["ovr"]+(a2["legacy"]?a2["legacy"]["ovr"]:0x0),0x1e,0x3c),bI=bH+(0x63-bH)*ac((a2["age"]-0x10)/0xa,0x0,0x1);
a2["ovr"]=ac(Math["max"](a2["ovr"],bI),0x14,0x63);
}if(a2["banLeft"]>0x0)bz["note"]='禁赛',a2["banLeft"]--;
else{if(bx){var bJ=a0["ROLES"][a2["role"]],bK=ae(bJ["apps"][0x0],bJ["apps"][0x1]);
if(a2["age"]<=0x13?bK=Math["round"](0.5*bK):0x14===a2["age"]?bK=Math["round"](0.78*bK):a2["age"]>=0x2b?bK=Math["round"](0.45*bK):a2["age"]>=0x29?bK=Math["round"](0.58*bK):a2["age"]>=0x27?bK=Math["round"](0.7*bK):a2["age"]>=0x25?bK=Math["round"](0.82*bK):a2["age"]>=0x23&&(bK=Math["round"](0.92*bK)),
a2["cheat"]&&(bK=Math["round"](1.05*bK)),a6("nutritio"+'n')&&(bK=Math["round"](1.05*bK)),a2["banGames"]>0x0){var bL=Math["min"](bK,a2["banGames"]);
bK-=bL,a2["banGames"]-=bL,bL>0x0&&(bz["note"]="停赛 "+bL+'\x20场');
}var bM=ac((a2["ovr"]-0x2a)/0x30,0.05,1.4);
a2["cheat"]&&(bM*=1.25);
var bN=aK();
if(bz["apps"]=bK,'gk'===al(a2["pos"])["group"])bz['cs']=Math["min"](bK,Math["round"](bK*(0.15+0.28*bM)*(0.8+0.5*ad()))),bz['ga']=Math["round"]((bK-bz['cs'])*(1.85-0.47*ac(bM,0x0,0x1))*(0.9+0.2*ad()));
else{var bO=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x28,bP=0.75+0.55*ad();
bz["goals"]=Math["round"](bK*bN["goal"]*bM*bO*bP),bz["assists"]=Math["round"](bK*bN["ast"]*bM*(0x1+bO)/0x2*(0.75+0.55*ad()));
}a2["totals"]["apps"]+=bz["apps"],a2["totals"]["goals"]+=bz["goals"],a2["totals"]["assists"]+=bz["assists"],a2["totals"]['cs']+=bz['cs'],
a2["totals"]['ga']+=bz['ga'];
var bQ=aJ(bx,by,a2["ovr"]),bR=Math["round"](bQ*(a2["wageMul"+'t']||0x1)*(a0["ROLES"][a2["role"]]["rank"]>=0x2?0x1:0.55));
a2["money"]+=bR,a2["seasonWa"+'ge']=bR,bR>a2["peakAnnu"+"alWage"]&&(a2["peakAnnu"+"alWage"]=bR),a2["careerEa"+"rnings"]+=bR;
var bS=(0.15*(bz["goals"]+bz["assists"])+0.02*bz["apps"]+0.05*bz['cs'])*(0x1+0.25*by["rep"]);
a2["fame"]=ac(a2["fame"]+bS*(0x1-a2["fame"]/0x64),0x0,0x64);
}}var bT=a2["age"]<=0x12?0.015:a2["age"]<=0x15?0.03:0.07;
if(a2["achBonus"]&&a2["achBonus"]["injury"])bT*=a2["achBonus"]["injury"];
if(a2["healthBonus"])bT*=a2["healthBonus"];
if(a2["legend"]&&a2["legend"]['i']===1)bT*=1.4;
else if(a2["legend"]&&a2["legend"]['i']===2)bT*=2;
else if(a2["legend"]&&a2["legend"]['i']===-1)bT*=0.6;
if(a6("rehab")&&(bT*=0.7),bx&&!a2["cheat"]&&a2["banLeft"]<=0x0&&ad()<bT){var bU=ah(a0["INJURIES"],function(c9){return c9['w'];
});
a2["ovr"]=ac(a2["ovr"]+bU["ovr"],0x14,0x63),bz["note"]=bU["name"],bz["injury"]=bU["ovr"];
}if(bx&&a0["ROLES"][a2["role"]]["rank"]>=0x2){var bV=a2["pendingM"+"ult"]||{};
["league","cup","cont","world"]["forEach"](function(c9){var ca=a0["TROPHIES"][c9]['p'][bx["rep"]]*(null==bV[c9]?0x1:bV[c9]);
if("league"===c9||"cup"===c9){var cfc=1,dcx=0,cmr=0,ctn=0,ctr=0;
for(dcx=0;
dcx<a0["TEAMS"]["length"];
dcx++){if(a0["TEAMS"][dcx]["league"]===by['id']){ctr=a0["TEAMS"][dcx]["rep"];
if(ctr>cmr)cmr=ctr;
}}for(dcx=0;
dcx<a0["TEAMS"]["length"];
dcx++){if(a0["TEAMS"][dcx]["league"]===by['id']&&a0["TEAMS"][dcx]["rep"]===cmr)ctn++;
}ca=("league"===c9?(0.5+0.04*(ctn-1)):0.35)/ctn;
ca*=1+Math["max"](0,a2["ovr"]-0x50)*0.06;
if("league"===c9)ca*=Math["pow"](bx["rep"]/cmr,0x2);
if("cup"===c9&&!by["cont"])ca*=0.2;
}if(("cont"!==c9||by["cont"])&&("cont"===c9&&(ca*='亚冠'===by["cont"]?2.5:'欧联'===by["cont"]?1.4:0.7),a2["cheat"]&&(ca="cont"!==c9||(function(){
for(var cc=0x0;
cc<a2["trophies"]["length"];
cc++)if(a2["trophies"][cc]["name"]["indexOf"]('欧冠')>=0x0)return!0x0;
return!0x1;
}())?0.5:0x1),!("cont"===c9&&!a2["cheat"]&&a0["ROLES"][a2["role"]]["rank"]>=0x2&&ad()<Math["min"](0.72,1.4*ca)&&aV("cont",0.5,
{'comp':by["cont"]}))&&ad()<ca)){var cb="league"===c9?by["name"]+'冠军':"cup"===c9?by["cup"]+'冠军':"cont"===c9?by["cont"]+'冠军':"世俱杯冠军";
bz["trophies"]["push"](cb),a2["trophies"]["push"]({'name':cb,'age':a2["age"],'team':bx["name"]});
}});
}var natFm=a2["natForm"]||{},natB=Math["max"](natFm["wc"]>=0x4?0.2:natFm["wc"]>=0x3?0.15:natFm["wc"]>=0x2?0.1:natFm["wc"]>=0x1?0.05:0x0,natFm["asia"]>=0x3?0.15:natFm["asia"]>=0x2?0.1:natFm["asia"]>=0x1?0.05:0x0),bW=0x48-0.12*(a2["guanxi"]-0x32),bX=!0x1;
if(!a2["banned"]&&a2["age"]>=0x12&&bx&&by){var bY=ac((a2["ovr"]-bW)/0xc,0x0,0x1),bZ=a0["ROLES"][a2["role"]]["rank"],c0=ac(bY*(bZ>=0x3?0x1:bZ>=0x2?0.6:0.2)*(by["rep"]>=0x4?1.15:by['cn']?0x1:by["rep"]>=0x2?0.8:0.35)*(a2["age"]>=0x1e?0.8:0x1)*(a2["achBonus"]&&a2["achBonus"]["natCall"]||0x1)*(0x1+natB),0x0,0.9);
bX=a2["cheat"]||ad()<c0;
}if(bX){var c1=ae(0x2,0x5),c2=aL(),c3=a2["seasons"]["length"]%0x4;
if(0x1!==c3&&0x3!==c3||(c1+=0x2),a2["caps"]+=c1,bz["caps"]=c1,a2["flags"]["_natCall"+'ed']||(a2["flags"]["_natCall"+'ed']=!0x0,b1(["nat_firs"+"tcall","nat_firs"+"tcall2","nat_firs"+"tcall3"][Math["floor"](ad()*0x3)]),a2["usedEven"+'ts']["nat_firs"+"tcall"]=(a2["usedEven"+'ts']["nat_firs"+"tcall"]||0x0)+0x1,a2["usedEven"+'ts']["nat_firs"+"tcall2"]=(a2["usedEven"+'ts']["nat_firs"+"tcall2"]||0x0)+0x1,a2["usedEven"+'ts']["nat_firs"+"tcall3"]=(a2["usedEven"+'ts']["nat_firs"+"tcall3"]||0x0)+0x1),
function(c9,ca){
if(ca&&a2["natStats"]){var cb=al(a2["pos"])["group"],cc=ac((a2["ovr"]-0x2a)/0x30,0.05,1.4)*(0x1+0.5*natB);
if(a2["cheat"]&&(cc*=1.25),'gk'!==cb){var cd=aK(),ce=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x28,cf=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x16,
cg=ac((a2["ovr"]-0x4b)/0x14,0x0,0x1),ch=ck(ca*cd["goal"]*(0.5+0.55*cg)*cc*cf*(0.6+0.8*ad())),ci=ck(ca*cd["ast"]*(0.45+0.45*cg)*cc*(0x1+ce)/0x2*(0.6+0.8*ad()));
ch&&(a2["natStats"]["goals"]||(b1(["nat_firs"+"tgoal","nat_firs"+"tgoal2","nat_firs"+"tgoal3"][Math["floor"](ad()*0x3)]),a2["usedEven"+'ts']["nat_firs"+"tgoal"]=(a2["usedEven"+'ts']["nat_firs"+"tgoal"]||0x0)+0x1,a2["usedEven"+'ts']["nat_firs"+"tgoal2"]=(a2["usedEven"+'ts']["nat_firs"+"tgoal2"]||0x0)+0x1,a2["usedEven"+'ts']["nat_firs"+"tgoal3"]=(a2["usedEven"+'ts']["nat_firs"+"tgoal3"]||0x0)+0x1),c9["natGoals"]=ch,a2["natStats"]["goals"]+=ch),ci&&(c9["natAssis"+'ts']=ci,
a2["natStats"]["assists"]+=ci);
}else{var cj=Math["min"](ca,Math["max"](0x0,ck(ca*(0.15+0.26*cc)*(0.7+0.6*ad()))));
cj&&(c9["natCs"]=cj,a2["natStats"]['cs']+=cj);
}}function ck(cl){
return Math["floor"](cl+ad());
}}(bz,c1),0x1===c3){if(a2["cheat"]&&a2["ovr"]>=0x55)aZ(bz,"世界杯",'冠军'),a2["natForm"]["wc"]=0x4;
else{if(ad()<aM()["wcq"]){var c4=aP(aN,c2*(0x1+natB)),cA;
cA=c4["final"]?(ad()<c4['p']?'冠军':'亚军'):c4["stage"];
c4["final"]&&aV('wc',c4['p'],{'comp':"世界杯"})||(aZ(bz,"世界杯",cA),a2["natForm"]["wc"]=cA==='冠军'?0x4:cA==='亚军'?0x3:cA==='止步四强'?0x2:/止步八强/["test"](cA)?0x1:0x0);
}else aZ(bz,"世界杯","预选赛出局"),a2["natForm"]["wc"]=0x0;
}}if(0x3===c3){if(a2["cheat"]&&a2["ovr"]>=0x4a)aZ(bz,"亚洲杯",'冠军'),a2["natForm"]["asia"]=0x3;
else{var c5=aP(aO,c2*(0x1+natB)),cB;
cB=c5["final"]?(ad()<c5['p']?'冠军':'亚军'):c5["stage"];
c5["final"]&&aV("asia",c5['p'],{'comp':"亚洲杯"})||(aZ(bz,"亚洲杯",cB),a2["natForm"]["asia"]=cB==='冠军'?0x3:cB==='亚军'?0x2:cB==='止步四强'?0x1:0x0);
}}}if(bx&&by){if(a2["bigQ"]&&a2["bigQ"]["length"]){a2["_awardDue"]=!0x0;}else{bAw(bz);}}return function(c9,ca,cb){
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
}function b3(){
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
}())&&bz["apps"]>=0x13&&(function(){var eT=0x0,eB=0x0,eCnt=0x0,eC;
for(eC=0;eC<a2["trophies"]["length"];eC++){var eD=a2["trophies"][eC];
if(eD["age"]===age0){var eF=0x0;
if(/世界杯冠军/["test"](eD["name"]))eF=0.55;else if(/欧冠/["test"](eD["name"]))eF=0.2;else if(/世俱杯冠军/["test"](eD["name"]))eF=0.06;else if(/亚洲杯冠军/["test"](eD["name"]))eF=0.03;else if(eD["name"]===by["name"]+'冠军')eF=by["rep"]>=0x5?0.09:by["rep"]>=0x4?0.06:0x0;else if(by["rep"]>=0x4&&eD["name"]===by["cup"]+'冠军')eF=0.03;
if(eF>0x0){if(eF>eT)eT=eF;eB+=eF,eCnt++;}}}
var eMain=eT+Math["min"](0.25,(eCnt-0x1)*0.08);
var boots=0x0,bG2;
for(bG2=0;bG2<a2["awards"]["length"];bG2++){var aX2=a2["awards"][bG2];
if(aX2["age"]===age0&&aX2["name"]===by["name"]+"金靴")boots+=0.02;
if(aX2["age"]===age0&&aX2["name"]===a0["AWARDS"]["boot"])boots+=0.05;}
var rank=a0["ROLES"][bz["role"]]["rank"],ovrB=bz["ovr"]>=0x5a?0.06:bz["ovr"]>=0x55?0.03:0x0,p=eMain+boots+ovrB;
p*=rank>=0x4?1.3:rank>=0x3?0.5:rank>=0x2?0.25:0.1;
return rank>=0x3&&ad()<Math["min"](0.8,p);
}())&&b5(a0["AWARDS"]["ballon"],age0),a0["ROLES"][bz["role"]]["rank"]>=0x3&&bz["apps"]>=0x1e&&bz["ovr"]>=0x4a&&(function(c9){var cb0=0x0;
for(var cG=0x0;cG<a2["trophies"]["length"];cG++){var cH=a2["trophies"][cG];
if(cH["age"]===age0&&(cH["name"]===by["name"]+'冠军'&&(cb0+=0.35),cH["name"]===by["cup"]+'冠军'&&(cb0+=0.08)));}
return cb0>0x0&&ad()<cb0*(0x1+0.2*c9);
}(c9t))&&b5(by["name"]+"最佳球员",age0),'gk'===c7&&by["rep"]>=0x3&&bz["apps"]>=0x13&&bz['cs']>=0x14&&ad()<0.3*(1+0.3*c9t)&&b5(a0["AWARDS"]["glove"],age0),!a2["banned"]&&bz["apps"]>=0x13&&bz["ovr"]>=0x54&&ad()<(0.03+0.18*aL())*(1+0.3*c9t)&&b5(a0["AWARDS"]["afcpoy"],age0);
}}
}
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
}function be(bx){
if(a2["age"]>=0x21){var by=bx||ar(),bz=by?aI(by):null,bA=bz?a0["ROLES"][bz]["rank"]:0x0,bB=by?by["rep"]:0x1;
if(bA>=0x4)return ae(0x1,0x2)+(bB<=0x3?0x1:0x0);
if(bA>=0x3)return (bB>=0x4?0x1:ae(0x1,0x2))+(a2["ovr"]>=0x4b?0x1:0x0);
return a2["ovr"]>=0x4b?ae(0x1,0x2):0x1;
}
var cA3=bx||ar(),cA2=cA3?aI(cA3):null,cB2=cA2?a0['ROLES'][cA2]['rank']:0x0;if(cB2>=0x4)return ae(3,5);if(cB2>=0x3)return ae(2,4);return ae(1,3);
}function bf(bx,by){
by=by||{};
var bz=ba(),bA=ar(),bB=as(),bC=bB?bB["rep"]:0x1,bD=a2["ovr"]>=0x52?0x2:0x1;
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
}function bk(){
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
}var bL=(aa[a2["originId"]]||[])["map"](aj)["filter"](Boolean);
if(bL["length"]){var bM=af(bL);
bJ[bM['id']]=0x1,bI["push"](bM);
}var bN=bK(bG,0x3-bI["length"]-0x1);
bK(bH,0x1+bN),bI["length"]<0x3&&bK(bG["concat"](bH),0x3-bI["length"]),ag(bI),at(bI,bF);
var bO=a2["money"]>=0x1e,bP=a0["TEAMS"]["filter"](function(bR){
return!aq(bR)['cn']&&(bO?bR["rep"]>=0x3:bR["rep"]<=0x2);
}),bQ=a0["TEAMS"]["filter"](function(bR){return!aq(bR)['cn'];
});
bP["length"]&&(bI["push"](af(bP)),at(bI,bQ)),a2["pending"]={'type':"youth_pa"+'th','offers':bI["map"](function(bR){return bR['id'];
}),'abroadIdx':bP["length"]?bI["length"]-0x1:-0x1};
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
})["length"]};
}function br(bx){
a2["phase"]="summary",a2["endReaso"+'n']=bx;
var by=bq(),bz="青训淘汰"===by["reason"];
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
}window["SIM"]={'attach':function(bx){return a2=bx;
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
'totals':{'apps':0x0,'goals':0x0,'assists':0x0,'cs':0x0,'ga':0x0},'seasons':[],'trophies':[],'awards':[],'natRuns':[],'forceQ':[],
'life':{'partner':null,'married':0x0,'kids':[],'splits':0x0},'natForm':{'wc':0x0,'asia':0x0},'flags':{},'staff':{},'pending':null,'_awardDue':!0x1,'usedEvents':{},'choices':[],'eventLog':[],
'rid':null,'achBonus':bAch||null};
}(bx,by,bz,bA,bAch),a2;
},'nextStep':bk,'doPeriod':bl,'choose':function(bx){var by,bz,bA=a2["pending"];
if(!bA)return!0x1;
if("random"===bA["type"]){var bB=bs(bx);
if(null===bB)return bk(),!0x0;

return!!bB&&(bw(bB["res"]),!0x0);
}if("youth_pa"+'th'===bA["type"]){var bC=bA["offers"][Number(bx)];
return!!bC&&(bv(bx),a2["youthTea"+"mId"]=bC,aq(aj(bC))['cn']||(a2["money"]-=a0["YOUTH_AB"+"ROAD_FEE"],a2["flags"]["youthAbr"+"oad"]=!0x0),
a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':"加入青训营",'text':"进入"+((aj(bC)["academy"])||aj(bC)["name"])}),a2["talent"]=0.7+0.78*Math["pow"](ad(),1.7)+(a2["legacy"]?a2["legacy"]["talent"]:0x0)+(a2["legend"]?a2["legend"]['t']:0x0),
a2["pending"]=null,bk(),!0x0);
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
a2["pending"]=null,bk(),!0x0):"bigmatch"===bA["type"]?!bA["result"]&&function(bG){var bH,bI=a2["bigQ"][0x0],bJ=null;
for(bH=0x0;
bH<aY["length"];
bH++)aY[bH]["key"]===bG&&(bJ=aY[bH]);
if(!bJ)return!0x1;
bv(bG);
var bN=bI["half"][0x0],bO=bI["half"][0x1],bP=[],bQ='',bK=Math["max"](0x0,(a2["ovr"]-0x46))/0x23,bL=ac(bI['p']-0.095+bJ['dp']+bK*(bJ["risk"]?0.09:0.045)+(bN-bO)*0.15,0.04,0.93),bM=ad()<bL;
a2["cheat"]&&(bM=!0x0);
var bR=!bM&&ad()<0.14||bM&&ad()<0.12,bS=null;
if(bR){if(bO>bN)bN=bO;else bO=bN;
var bT=ae(0x3,0x5),bU=0x5===bT?ae(0x3,0x4):bT-0x1;
bS=bM?[bT,bU]:[bU,bT];
}else{bM?bN<=bO?(bN=bO+0x1,bQ="落后到反超"):bN+=ad()<0.45?0x1:0x0:bN>=bO?(bO=bN+0x1,bQ="被反超"):bO+=ad()<0.4?0x1:0x0;}var bV=aR[bI["kind"]]["side"]||bI["team"];
"push"===bJ["key"]?bP["push"]("下半场你们把防线"+"整体压过中圈。这"+"么踢没有中间地带"+'。'):"hold"===bJ["key"]?bP["push"]("下半场你们把阵型"+"收了回去，先不丢"+"球再说。"):bP["push"]("下半场球开始从你"+"脚下过。节奏慢下"+"来了，但每一脚都"+"有去处。");
var bW=al(a2["pos"])["group"],bX=null;
ad()<bJ["glory"]&&(bX='gk'===bW?bR?"扑出了点球大战里"+"的第三轮":'第\x20'+ae(0x3c,0x58)+(" 分钟单掌把必进"+"球托了出去"):"def"===bW?"在门线上把球解围"+'出去':"mid"===bW?bM?"送出了那记决定比"+"赛的直塞":"把球权一次次抢回"+'来':bM?"打进了那个球":"打出了全队唯一一"+"次射正"),
bR?bP["push"]("九十分钟和加时都"+"没分出胜负。点球"+"大战。"):"落后到反超"===bQ?bP["push"]('第\x20'+ae(0x46,0x5a)+(" 分钟，比分被翻"+"了过来。")):"被反超"===bQ&&bP["push"]('第\x20'+ae(0x48,0x5a)+(" 分钟，对方把比"+"分反超。")),
bX&&bP["push"]('你'+bX+'。');
'derby'===bI["kind"]&&bP["push"](bM?"终场哨响的那一刻"+"，属于你的那半边"+"看台炸了。有人抱"+"着你哭。":"对面看台的歌声一"+"直唱到终场，像刀"+"子一样扎进耳朵。"+"\u8fd9就是德比。");
var bY=bV+'\x20'+bN+" 比 "+bO+(bS?"，点球 "+bS[0x0]+" 比 "+bS[0x1]:'')+'。';
bP["push"](bM?"终场哨响。"+bY+(bR?"点球大战赢下来的"+"那种赢法，腿是软"+'的。':"很多年以后你还会"+"梦到这一刻。"):bY+(bR?"点球大战输掉的球"+"，最难过去。":"你在草皮上坐了很"+"久，没人来拉你。"));
var bZ=a2["seasons"][bI["recIdx"]]||null,c0=[];
bZ&&(bX&&'gk'!==bW&&("mid"===bW||"def"===bW?(bZ["assists"]++,a2["totals"]["assists"]++):(bZ["goals"]++,a2["totals"]["goals"]++)),
'wc'===bI["kind"]||"asia"===bI["kind"]?(b0(bZ,bI["comp"],bM?'冠军':'亚军',bI["age"]),'wc'===bI["kind"]?a2["natForm"]["wc"]=bM?0x4:0x3:a2["natForm"]["asia"]=bM?0x3:0x2):"cont"===bI["kind"]&&bM?(bZ["trophies"]["push"](bI["comp"]+'冠军'),a2["trophies"]["push"]({'name':bI["comp"]+'冠军','age':bI["age"],'team':bI["team"]})):"promo"===bI["kind"]&&bM?(a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][bI["teamId"]]=am[bI["fromLeag"+'ue']],bZ["move"]='升上'+ak(am[bI["fromLeag"+'ue']])["name"]):"drop"!==bI["kind"]||bM||(a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][bI["teamId"]]=ao[bI["fromLeag"+'ue']],bZ["move"]='降入'+ak(ao[bI["fromLeag"+'ue']])["name"]));
var c1=bM?'derby'===bI["kind"]?0xc:'wc'===bI["kind"]?0x1e:"asia"===bI["kind"]?0x12:0x10:'derby'===bI["kind"]?0x2:'wc'===bI["kind"]?0xa:0x4,c2=Math["round"](c1*(0x1-a2["fame"]/0x64));
return a2["fame"]=ac(a2["fame"]+c2,0x0,0x64),c2&&c0["push"]({'cls':'up','text':"名气+"+c2}),bJ["mood"]&&(a2["guanxi"]=ac(a2["guanxi"]+bJ["mood"],0x0,0x64),
c0["push"]({'cls':'up','text':"关系+"+bJ["mood"]})),a2["pending"]["result"]={'won':bM,'log':bP,'deltas':c0,'score':[bN,bO],'pens':bS},a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':bI["comp"],'text':(bM?'derby'===bI["kind"]?'胜':'冠军':'derby'===bI["kind"]?'负':'失利')+'：'+bY}),a2["_awardDue"]&&(a2["_awardDue"]=!0x1,bAw(a2["seasons"][bI["recIdx"]])),
a2["bigQ"]=[],!0x0;
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
bC={'wage':Math["round"](bD*bF*bG),'years':bE,'mult':bF*bG};
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