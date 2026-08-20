(function(a,b){var cm=_sim_0b,c=a();
while(!![]){try{var d=-parseInt("183363QCNKjb")/0x1*(-parseInt("2fjdRLF")/0x2)+-parseInt("2247051kwGCvW")/0x3+parseInt("2558356EnINTY")/0x4+parseInt("1747270VzXYIB")/0x5+-parseInt("6ZtxAgC")/0x6*(-parseInt("4159519EphEDa")/0x7)+-parseInt("4862384SSVifa")/0x8+-parseInt("45haAqnF")/0x9*(-parseInt("416140sjMBQh")/0xa);
if(d===b)break;
else c['push'](c['shift']());
}catch(e){c['push'](c['shift']());
}}}(_sim_0a,0x96d96),!(function(){'use strict';
var cn=_sim_0b;
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
function a6(bx){var co=cn;
return!(!a2["staff"]||!a2["staff"][bx]);
}function a7(bx){var cp=cn;
return Math["round"](bx["fee"]*ac(0x1+(a2["peakAnnu"+"alWage"]||0x0)/0x2bc,0x1,0x4));
}function a8(){var cq=cn;
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
function ab(bx,by){var cr=cn,bz=a9[bx];
return!!bz&&bz["indexOf"](by)>=0x0;
}function ac(bx,by,bz){var cs=cn;
return Math["max"](by,Math["min"](bz,bx));
}function ad(){var ct=cn;
a2["rngState"]=a2["rngState"]+0x6d2b79f5>>>0x0;
var bx=a2["rngState"];
return bx=Math["imul"](bx^bx>>>0xf,0x1|bx),(((bx^=bx+Math["imul"](bx^bx>>>0x7,0x3d|bx))^bx>>>0xe)>>>0x0)/0x100000000;
}function ae(bx,by){var cu=cn;
return bx+Math["floor"](ad()*(by-bx+0x1));
}function af(bx){var cv=cn;
return bx[Math["floor"](ad()*bx["length"])];
}function ag(bx){var cw=cn;
for(var by=bx["length"]-0x1;
by>0x0;
by--){var bz=Math["floor"](ad()*(by+0x1)),bA=bx[by];
bx[by]=bx[bz],bx[bz]=bA;
}return bx;
}function ah(bx,by){var cx=cn,bz,bA=0x0;
for(bz=0x0;
bz<bx["length"];
bz++)bA+=Math["max"](0x0,by(bx[bz]));
if(bA<=0x0)return null;
var bB=ad()*bA,bC=0x0;
for(bz=0x0;
bz<bx["length"];
bz++)if(bB<=(bC+=Math["max"](0x0,by(bx[bz]))))return bx[bz];
return bx[bx["length"]-0x1];
}function ai(bx){var cy=cn;
for(var by=0x1505,bz=0x0;
bz<bx["length"];
bz++)by=(by<<0x5)+by+bx["charCode"+'At'](bz)>>>0x0;
return by;
}function aj(bx){var cz=cn;
for(var by=0x0;
by<a0["TEAMS"]["length"];
by++)if(a0["TEAMS"][by]['id']===bx)return a0["TEAMS"][by];
return null;
}function ak(bx){var cA=cn;
for(var by=0x0;
by<a0["LEAGUES"]["length"];
by++)if(a0["LEAGUES"][by]['id']===bx)return a0["LEAGUES"][by];
return null;
}function al(bx){var cB=cn;
for(var by=0x0;
by<a0["POSITION"+'S']["length"];
by++)if(a0["POSITION"+'S'][by]['id']===bx)return a0["POSITION"+'S'][by];
return a0["POSITION"+'S'][0x0];
}var am={'ch':"epl",'seg':"liga",'b2':"bund"},ao={'epl':'ch','liga':"seg",'bund':'b2'};
function ap(bx){var cC=cn;
return bx?a2&&a2["leagueOf"]&&a2["leagueOf"][bx['id']]||bx["league"]:null;
}function aq(bx){return bx?ak(ap(bx)):null;
}function ar(){var cD=cn;
return a2["teamId"]?aj(a2["teamId"]):null;
}function as(){return aq(ar());
}function at(bx,by){var cE=cn;
if(!a2["dreamId"]||!bx||!bx["length"])return bx;
for(var bz=0x0;
bz<bx["length"];
bz++)if(bx[bz]['id']===a2["dreamId"])return bx;
for(var bA=null,bB=0x0;
bB<by["length"];
bB++)if(by[bB]['id']===a2["dreamId"]){bA=by[bB];
break;
}return bA?(bx[bx["length"]-0x1]=bA,bx):bx;
}function au(){var cF=cn;
if("youth"===a2["phase"]){var bx=aj(a2["youthTea"+"mId"]);
return!bx||aq(bx)['cn'];
}var by=as();
return!by||by['cn'];
}function av(bx){var cG=cn;
return Math["abs"](bx)>=0x2710?(bx/0x2710)["toFixed"](0x1)["replace"](/\.0$/,'')+'\x20亿':Math["round"](bx)+'\x20万';
}function aw(bx){var cH=cn;
return "胡雪儿"===String(bx["name"]||'')["trim"]()&&!!bx["origin"]&&'sd'===bx["origin"]['id']&&0x2===Number(bx["number"]);
}function ax(){var cI=cn;
return Math["min"](0x5,(a2["ovr"]-0x32)/0x7);
}var ay={'ovr':0xa,'talent':0.3,'guanxi':0x18,'money':0x258};
function az(bx){var cJ=cn;
if(!bx||"object"!=typeof bx)return null;
var by=Math["round"](Number(bx["gen"])||0x0);
return by>=0x2?{'gen':Math["min"](by,0x3e7),'ovr':ac(Math["round"](Number(bx["ovr"])||0x0),0x0,ay["ovr"]),'talent':ac(Number(bx["talent"])||0x0,0x0,ay["talent"]),
'guanxi':ac(Math["round"](Number(bx["guanxi"])||0x0),0x0,ay["guanxi"]),'money':ac(Math["round"](Number(bx["money"])||0x0),0x0,ay["money"])}:null;
}function aA(){var cK=cn,bx=ar(),by=as(),bz={'age':a2["age"],'ovr':a2["ovr"],'talent':a2["talent"],'guanxi':a2["guanxi"],'clean':a2["clean"],
'fame':a2["fame"],'money':a2["money"],'caps':a2["caps"],'natGoals':a2["natStats"]&&a2["natStats"]["goals"]||0x0,'roleRank':a0["ROLES"][a2["role"]]["rank"],
'pos':a2["pos"],'posGroup':al(a2["pos"])["group"],'inChina':au(),'inAcademy':"youth"===a2["phase"],'hasPartner':!(!a2["life"]||!a2["life"]["partner"]),
'partnerYears':a2["life"]&&a2["life"]["partner"]?a2["age"]-a2["life"]["partner"]["since"]:0x0,'married':!(!a2["life"]||!a2["life"]["married"]),
'kids':a2["life"]&&a2["life"]["kids"]["length"]||0x0,'seasonsAtClub':a2["seasonsA"+"tClub"],'seasonsAbroad':a2["seasonsA"+"broad"],
'clubRep':bx?bx["rep"]:0x0,'leagueId':by?by['id']:null,'country':by?by["country"]:null,'leagueRep':by?by["rep"]:0x0,'hasCont':!(!by||!by["cont"]),
'rivalId':aC()&&aC()['id'],'teamId':a2["teamId"],'isCaptain':a2["flags"]["_captain"]===a2["teamId"],'capDone':a2["capDone"]||[]};
for(var bA in a2["flags"])a2["flags"]["hasOwnPr"+"operty"](bA)&&(bz[bA]=a2["flags"][bA]);
return bz;
}function aB(bx){var cL=cn;
return bx<=0xf?"kid":bx<=0x14?"youth":bx>=0x21?"vet":"prime";
}function aC(){var cM=cn,bx=ar();
if(!bx)return null;
var by=a0["TEAMS"]["filter"](function(bz){return ap(bz)===ap(bx)&&bz['id']!==bx['id'];
});
return by["length"]?(by["sort"](function(bz,bA){var cN=cM;
return Math["abs"](bz["rep"]-bx["rep"])-Math["abs"](bA["rep"]-bx["rep"]);
}),by[0x0]):null;
}function aD(bx){var cO=cn,by=ar(),bz=as(),bA=aC();
return String(bx)["replace"](/\{club\}/g,by?by["name"]:'球队')["replace"](/\{rival\}/g,bA?bA["name"]:'对手')["replace"](/\{league\}/g,
bz?bz["name"]:'联赛');
}function aE(){var cP=cn;
for(var bx=aA(),by=aB(a2["age"]),bz=a2["flags"]["_cnCount"]||0x0,bA=a2["flags"]["_evCount"]||0x0,bB=bA>=0x4&&bz/bA>0.45,bC=0x0,
bD=0x0;
bD<a1["length"];
bD++)"light"===a1[bD]["tone"]&&(bC+=a2["usedEven"+'ts'][a1[bD]['id']]||0x0);
var bE=bC>=0x3||a2["banLeft"]>0x0,bF=a1["filter"](function(bG){var cQ=cP;
if("light"===bG["tone"]&&bE)return!0x1;
var bH=a2["usedEven"+'ts'][bG['id']]||0x0;
if(bH&&!bG["repeat"])return!0x1;
if(bH>=(bG["repeat"]||0x1))return!0x1;
if("kid"===by){if("kid"!==bG["stage"])return!0x1;
}else{if(bx["inAcadem"+'y']){if("youth"!==bG["stage"])return!0x1;
}else{if(bG["stage"]&&bG["stage"]!==by)return!0x1;
}}return!(bG['cn']&&!bx["inChina"]||bG["when"]&&!bG["when"](bx));
});
return bF["length"]?(function(){var bG=ah(bF,function(bH){var cR=cP,bI=bH["weight"]||0x28;
return a2["usedEven"+'ts'][bH['id']]&&(bI*=0.45),bH['cn']&&bB&&(bI*=0.25),bH['cn']&&!bB&&(bI*=1.15),bI;
});if(bG&&bG["pool"]){var bH={};for(var bI in bG)bH[bI]=bG[bI];var bJ=bG["pool"]["slice"]()["sort"](function(){return Math["random"]()-0.5});bH["options"]=bJ["slice"](0x0,(bG["rndPick"]||0x3))["concat"](bG["single"]?[bG["single"]]:[]);for(var bN=0x0;bN<a1["length"];bN++)a1[bN]===bG&&(a1[bN]=bH);return bH;}return bG;})():null;
}function aF(bx){var cT=cn,by=[];
function bz(bI,bJ,bK){var cS=_sim_0b;
if(bJ){var bL=bJ>0x0,bM=(!0x1===bK?!bL:bL)?'up':"down";
by["push"]({'cls':bM,'text':bI+(bL?'+':'')+bJ});
}}if(bx["ovr"]){var bA;
if(bx["ovr"]<0x0)bA=bx["ovr"];
else{var bB=Math["min"](bx["ovr"],Math["max"](0x0,a2["maxOvr"]-a2["ovr"]));
bA=bB+(bx["ovr"]-bB)*ac((0x64-a2["ovr"])/0x28,0.25,0x1);
}a2["ovr"]=ac(a2["ovr"]+bA,0xc,0x63),a2["maxOvr"]=Math["max"](a2["maxOvr"],a2["ovr"]),bz('能力',Math["round"](0xa*bA)/0xa);
}bx["talent"]&&(a2["talent"]=ac(a2["talent"]+bx["talent"],0.5,1.8),bz('天赋',Math["round"](0x64*bx["talent"])/0x64));
bx["health"]&&(a2["healthBonus"]=ac((a2["healthBonus"]||0x1)*bx["health"],0.4,0x1),bz('伤病',-Math["round"](0x64*(0x1-bx["health"]))+'%'));
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
!0x0),bx["returnHo"+'me']){var bG=af(a0["TEAMS"]["filter"](function(bI){var cU=cT;
return aq(bI)['cn']&&bI["rep"]>=0x2;
}));
bG&&b8(bG['id'],!0x0);
}if(bx["goAbroad"]){var bH=bf(0x1,{'forceAbroad':!0x0})[0x0];
bH&&b8(bH['id'],!0x0);
}bx["captain"]&&(a2["flags"]["_captain"]=a2["teamId"],(a2["capDone"]||(a2["capDone"]=[]))["indexOf"](a2["teamId"])<0x0&&a2["capDone"]["push"](a2["teamId"])),
bx["capDecline"]&&((a2["capDone"]||(a2["capDone"]=[]))["indexOf"](a2["teamId"])<0x0&&a2["capDone"]["push"](a2["teamId"])),
bx["ntCaptain"]&&(a2["flags"]["_ntCaptain"]=!0x0);
return["ageFraud","yinyang","fixed","gambled","degree","coachCer"+'t',"academy","bianzhi","assistan"+'t',"scout"]["forEach"](function(bI){var cV=cT;
bx[bI]&&(a2["flags"][bI]=!0x0);
}),by;
}function aG(bx){var cW=cn;
for(var by=a0["GROWTH"],bz=by[0x0]['d'],bA=0x0;
bA<by["length"];
bA++)bx>=by[bA]["age"]&&(bz=by[bA]['d']);
return bz;
}function aH(){var cX=cn,bx=ar();
return bx?aI(bx):"sub";
}function aI(bx){var cY=cn,by=0x30+0x7*bx["rep"],bz=a2["ovr"]-by+0x3*a2["roleAdju"+'st'];
return aq(bx)['cn']&&(bz+=0.12*(a2["guanxi"]-0x32)),a2["age"]<=0x12&&(bz-=0x6),a2["age"]>=0x23&&(bz-=0x3),bz>=0x6?"star":bz>=0x2?"starter":bz>=-0x5?"rot":bz>=-0xc?"sub":"bench";
}function aJ(bx,by,bz){var cZ=cn,bA=Math["max"](0x0,bz-0x2d)/0x32,bB=by['cn']?2.6:by["rep"]>=0x4?2.4:1.5;
return Math["max"](0x3,0x140*Math["pow"](bA,2.2)*(0.9+0.55*bx["rep"])*bB);
}function aK(){var d0=cn,bx=al(a2["pos"])["group"];
return "att"===bx?{'goal':0.65,'ast':0.28}:"mid"===bx?{'goal':0.2,'ast':0.38}:"def"===bx?{'goal':0.09,'ast':0.14}:{'goal':0x0,
'ast':0.01};
}function aL(){var d1=cn;
return ac((a2["ovr"]-0x48)/0x18,0x0,0x1);
}function aM(){return{'wcq':0.012+0.55*aL()};
}var aN=[{'p':[0.14,0.5],'next':"十六强"},{'p':[0.22,0.42],'next':'八强'},{'p':[0.2,0.42],'next':'四强'},{'p':[0.25,0.38],'next':'决赛'},
{'p':[0.32,0.32],'next':'冠军'}],aO=[{'p':[0.55,0.38],'next':"十六强"},{'p':[0.33,0.42],'next':'八强'},{'p':[0.28,0.44],'next':'四强'},
{'p':[0.32,0.4],'next':'决赛'},{'p':[0.38,0.34],'next':'冠军'}];
function aP(bx,by){var d2=cn;
for(var bz="小组赛",bA=0x0;
bA<bx["length"];
bA++){if(bA===bx["length"]-0x1)return{'final':!0x0,'p':bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by};
if(ad()>=bx[bA]['p'][0x0]+bx[bA]['p'][0x1]*by)return{'stage':0x0===bA?"小组赛出局":'止步'+bz};
bz=bx[bA]["next"];
}return{'final':!0x0,'p':0.5};
}var aQ={'预选赛出局':0x0,'小组赛出局':0x1,'止步十六强':0x2,'止步八强':0x3,'止步四强':0x4,'亚军':0x5,'冠军':0x6},aR={'wc':{'icon':'🏆','side':"中国队"},'asia':{'icon':'🏅',
'side':"中国队"},'cont':{'icon':'⭐','side':null},'promo':{'icon':'🏟','side':null},'drop':{'icon':'🚨','side':null}},aS={'欧冠':'eu',
'欧联':'eu','亚冠':'as'};
function aT(bx){var d3=cn;
return bx&&aS[bx["cont"]]||null;
}function aU(bx,by,bz){var d4=cn;
if('wc'===bx)return af(['巴西','法国',"阿根廷",'德国',"西班牙","英格兰"]);
if("asia"===bx)return af(['日本','韩国','伊朗','沙特',"澳大利亚"]);
var bA=aT(bz);
function bB(bD){var d5=d4;
return "cont"===bx?aT(aq(bD))===bA:ap(bD)===ap(by);
}var bC=a0["TEAMS"]["filter"](function(bD){var d6=d4;
return bD['id']!==(by&&by['id'])&&bD["rep"]>=(by?by["rep"]-0x1:0x3)&&bB(bD);
});
return bC["length"]||(bC=a0["TEAMS"]["filter"](function(bD){return bD['id']!==(by&&by['id'])&&bB(bD);
})),bC["length"]?af(bC)["name"]:'对手';
}function aV(bx,by,bz){var d7=cn;
if(a2["bigQ"]&&a2["bigQ"]["length"])return!0x1;
"promo"!==bx&&"drop"!==bx||(a2["bigStage"+'d']=(a2["bigStage"+'d']||0x0)+0x1);
var bA=ar(),bB=as();
return a2["bigQ"]=[{'kind':bx,'p':by,'recIdx':a2["seasons"]["length"],'age':a2["age"],'comp':bz&&bz["comp"]||'','team':bA?bA["name"]:'','opp':aU(bx,bA,bB),'teamId':bA?bA['id']:null}],
!0x0;
}function aW(){var d8=cn,bx=a2["bigQ"][0x0],bk2=ac((a2["ovr"]-0x46)/0x1e,-0.5,0x1),by,by2,bz,bz2;by2=ad();by=by2<0.38-0.25*bk2?0x0:by2<0.73?0x1:by2<0.93-0.15*bk2?0x2:0x3;bz2=ad();bz=bz2<0.5+0.2*bk2?0x0:bz2<0.85?0x1:0x2;
bx["half"]=[by,bz],a2["pending"]={'type':"bigmatch",'kind':bx["kind"],'comp':bx["comp"],'icon':aR[bx["kind"]]["icon"],'side':aR[bx["kind"]]["side"]||bx["team"],
'opp':bx["opp"],'half':[by,bz],'log':aX(bx,by,bz)};
}function aX(bx,by,bz){var d9=cn,bA=aR[bx["kind"]]["side"]||bx["team"],bB=[],bC=ae(0x0,0x4),bD=ae(0x0,0x2);
return 0x0===by&&0x0===bz?bB["push"]("上半场谁都没打开"+"局面。你们在中场"+"来回磨了四十五分"+'钟。'):by>bz?(bB["push"]('第\x20'+ae(0x9,0x29)+" 分钟，"+bA+("先进了一个。看台"+"整个站了起来。")),
by>0x1&&bB["push"]("半场结束前又来一"+"个。你们把优势拉"+"到了两球。"),bz&&bB["push"]("对方在补时扳回一"+"个。中场哨响时那"+"边的替补席在喊。")):by<bz?(bB["push"]('第\x20'+ae(0x6,0x26)+(" 分钟丢球。皮球"+"进网的那一下，场"+"里安静得能听见对"+"方球迷。")),
bz>0x1&&bB["push"]("下半场开始前又被"+"打进一个。你们落"+"后两球。"),by&&bB["push"]("你们在半场前扳回"+"一个，比分咬住了"+'。')):bB["push"]("上半场互交白卷式"+"的两球。谁也没能"+"把比分甩开。"),
bB["push"](0x0===bD?"中场休息。更衣室"+"里教练在白板上画"+"了一通，最后转过"+"头看着你。":0x1===bD?"中场休息。主队球迷"+"的歌声盖过了客队，"+"教练在战术板上写了"+"又擦。":"中场休息。裁判因为"+"几次争议判罚被围住"+"，保安把两边隔开。"),by>0x2&&bB["push"]("上半场你们就进了三"+"个，看台已经有人提"+"前庆祝了。"),bz>0x1&&bB["push"]("对方两球在手，气势"+"正盛。你们的防线感"+"觉快撑不住了。"),bB;
}var aY=[{'key':"hold",'label':"稳住阵型",'hint':"小幅提高赢面，个"+"人数据平淡",'dp':0.06,'glory':0.12,'mood':0x4},{'key':"push",'label':"压上去搏",
'hint':"赢面涨得最多，也"+"最可能被反击打穿",'dp':0.13,'glory':0.5,'mood':0x0,'risk':!0x0},{'key':"run",'label':"把球做出来",'hint':"居中，队友更愿意"+'找你',
'dp':0.09,'glory':0.28,'mood':0x8}];
function aZ(bx,by,bz){var da=cn;
b0(bx,by,bz,a2["age"]);
}function b0(bx,by,bz,bA){var db=cn;
a2["natRuns"]["push"]({'age':bA,'comp':by,'stage':bz}),'冠军'===bz?(bx["trophies"]["push"](by+'冠军'),a2["trophies"]["push"]({'name':by+'冠军','age':bA,'team':"国家队"})):bx["nat"]=by+bz;
}function b1(bx){var dc=cn;
a2["forceQ"]||(a2["forceQ"]=[]),a2["usedEven"+'ts'][bx]||a2["forceQ"]["indexOf"](bx)<0x0&&a2["forceQ"]["push"](bx);
}function b2(){var dd=cn,bx=ar(),by=as(),bz={'age':a2["age"],'teamId':a2["teamId"],'teamName':bx?bx["name"]:"无球可踢",'color':bx?bx["color"]:null,
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
["league","cup","cont","world"]["forEach"](function(c9){var de=dd,ca=a0["TROPHIES"][c9]['p'][bx["rep"]]*(null==bV[c9]?0x1:bV[c9]);
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
}if(("cont"!==c9||by["cont"])&&("cont"===c9&&(ca*='亚冠'===by["cont"]?2.5:'欧联'===by["cont"]?1.4:0.7),a2["cheat"]&&(ca="cont"!==c9||(function(){var df=de;
for(var cc=0x0;
cc<a2["trophies"]["length"];
cc++)if(a2["trophies"][cc]["name"]["indexOf"]('欧冠')>=0x0)return!0x0;
return!0x1;
}())?0.5:0x1),!("cont"===c9&&!a2["cheat"]&&a0["ROLES"][a2["role"]]["rank"]>=0x2&&ad()<Math["min"](0.9,0x2*ca)&&aV("cont",0.5,
{'comp':by["cont"]}))&&ad()<ca)){var cb="league"===c9?by["name"]+'冠军':"cup"===c9?by["cup"]+'冠军':"cont"===c9?by["cont"]+'冠军':"世俱杯冠军";
bz["trophies"]["push"](cb),a2["trophies"]["push"]({'name':cb,'age':a2["age"],'team':bx["name"]});
}});
}var bW=0x48-0.12*(a2["guanxi"]-0x32),bX=!0x1;
if(!a2["banned"]&&a2["age"]>=0x12&&bx&&by){var bY=ac((a2["ovr"]-bW)/0xc,0x0,0x1),bZ=a0["ROLES"][a2["role"]]["rank"],c0=ac(bY*(bZ>=0x3?0x1:bZ>=0x2?0.6:0.2)*(by["rep"]>=0x4?1.15:by['cn']?0x1:by["rep"]>=0x2?0.8:0.35)*(a2["age"]>=0x1e?0.8:0x1)*(a2["achBonus"]&&a2["achBonus"]["natCall"]||0x1),0x0,0.9);
bX=a2["cheat"]||ad()<c0;
}if(bX){var c1=ae(0x2,0x5),c2=aL(),c3=a2["seasons"]["length"]%0x4;
if(0x1!==c3&&0x3!==c3||(c1+=0x2),a2["caps"]+=c1,bz["caps"]=c1,a2["flags"]["_natCall"+'ed']||(a2["flags"]["_natCall"+'ed']=!0x0,b1(["nat_firs"+"tcall","nat_firs"+"tcall2","nat_firs"+"tcall3"][Math["floor"](ad()*0x3)])),
function(c9,ca){var dg=dd;
if(ca&&a2["natStats"]){var cb=al(a2["pos"])["group"],cc=ac((a2["ovr"]-0x2a)/0x30,0.05,1.4);
if(a2["cheat"]&&(cc*=1.25),'gk'!==cb){var cd=aK(),ce=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x28,cf=0x1+Math["max"](0x0,a2["ovr"]-0x50)/0x16,
cg=ac((a2["ovr"]-0x4b)/0x14,0x0,0x1),ch=ck(ca*cd["goal"]*(0.5+0.55*cg)*cc*cf*(0.6+0.8*ad())),ci=ck(ca*cd["ast"]*(0.45+0.45*cg)*cc*(0x1+ce)/0x2*(0.6+0.8*ad()));
ch&&(a2["natStats"]["goals"]||b1(["nat_firs"+"tgoal","nat_firs"+"tgoal2","nat_firs"+"tgoal3"][Math["floor"](ad()*0x3)]),c9["natGoals"]=ch,a2["natStats"]["goals"]+=ch),ci&&(c9["natAssis"+'ts']=ci,
a2["natStats"]["assists"]+=ci);
}else{var cj=Math["min"](ca,Math["max"](0x0,ck(ca*(0.15+0.26*cc)*(0.7+0.6*ad()))));
cj&&(c9["natCs"]=cj,a2["natStats"]['cs']+=cj);
}}function ck(cl){var dh=dg;
return Math["floor"](cl+ad());
}}(bz,c1),0x1===c3){if(a2["cheat"]&&a2["ovr"]>=0x55)aZ(bz,"世界杯",'冠军');
else{if(ad()<aM()["wcq"]){var c4=aP(aN,c2);
c4["final"]&&aV('wc',c4['p'],{'comp':"世界杯"})||aZ(bz,"世界杯",c4["final"]?ad()<c4['p']?'冠军':'亚军':c4["stage"]);
}else aZ(bz,"世界杯","预选赛出局");
}}if(0x3===c3){if(a2["cheat"]&&a2["ovr"]>=0x4a)aZ(bz,"亚洲杯",'冠军');
else{var c5=aP(aO,c2);
c5["final"]&&aV("asia",c5['p'],{'comp':"亚洲杯"})||aZ(bz,"亚洲杯",c5["final"]?ad()<c5['p']?'冠军':'亚军':c5["stage"]);
}}}if(bx&&by&&a2["cheat"]){var c6=al(a2["pos"])["group"];
(by["rep"]>=0x4||function(){var dS=cn;
for(var cb4=0x0;cb4<a2["trophies"]["length"];cb4++)if(a2["trophies"][cb4]["name"]["indexOf"]('欧冠')>=0x0&&a2["trophies"][cb4]["age"]===a2["age"])return!0x0;
return!0x1;
}())&&bz["apps"]>=0x13&&a2["ovr"]>=0x55&&(!function(c9){var di=dd;
for(var ca=0x0;
ca<a2["awards"]["length"];
ca++)if(a2["awards"][ca]["name"]===c9)return!0x0;
return!0x1;
}(a0["AWARDS"]["ballon"])||ad()<0.35)&&b5(a0["AWARDS"]["ballon"]),bz["apps"]>=0x13&&a2["ovr"]>=0x54&&ad()<0.35&&b5(a0["AWARDS"]["afcpoy"]),"att"===c6&&bz["goals"]>=[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]]&&(function(c9){var dt=cn;return ad()<0.35+Math["min"](0.4,(c9-[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]])*0.03);}(bz["goals"]))&&bz["apps"]>=0x13&&b5(by["name"]+"金靴"),by["rep"]>=0x4&&"att"===c6&&bz["apps"]>=0x13&&a2["ovr"]>=0x55&&bz["goals"]>=0x23&&(function(c9){var du=cn;return ad()<0.35+Math["min"](0.4,(c9-0x23)*0.03);}(bz["goals"]))&&(function(c9){var dw=cn,has=!0x1;
for(var cb3=0x0;cb3<a2["awards"]["length"];cb3++)if(a2["awards"][cb3]["name"]===c9&&a2["awards"][cb3]["age"]===a2["age"])has=!0x0;
if(!has)b5(c9);
return!0x0;
}(by["name"]+"金靴"))&&b5(a0["AWARDS"]["boot"]),bz["apps"]>=0x1e&&a0["ROLES"][bz["role"]]["rank"]>=0x3&&a2["ovr"]>=0x4a&&ad()<0.35&&b5(by["name"]+"最佳球员"),
bz["apps"]>=0x13&&by["rep"]>=0x3&&'gk'===c6&&a2["ovr"]>=0x55&&ad()<0.45&&b5(a0["AWARDS"]["glove"]);
}if(bx&&by&&!a2["cheat"]){var c7=al(a2["pos"])["group"],c8=(0.06+0.24*aL())*('gk'===c7?0.25:0x1),c9t=0,c9i;
for(c9i=0;
c9i<a2["trophies"]["length"];
c9i++)if(a2["trophies"][c9i]["age"]===a2["age"])c9t++;
if(c9t>0x0){!a2["banned"]&&(by["rep"]>=0x4||function(){var dS=cn;
for(var cb4=0x0;cb4<a2["trophies"]["length"];cb4++)if(a2["trophies"][cb4]["name"]["indexOf"]('欧冠')>=0x0&&a2["trophies"][cb4]["age"]===a2["age"])return!0x0;
return!0x1;
}())&&bz["apps"]>=0x13&&a2["ovr"]>=0x55&&(function(){var eA=cn,eB=0x0;for(var eC=0x0;eC<a2["trophies"]["length"];eC++){var eD=a2["trophies"][eC];if(eD["age"]===a2["age"]){if(/世界杯冠军/["test"](eD["name"]))eB=Math["max"](eB,0x3);else if(/欧冠冠军/["test"](eD["name"]))eB=Math["max"](eB,0x2);else if(/亚洲杯冠军/["test"](eD["name"]))eB=Math["max"](eB,0x1);else eB=Math["max"](eB,0x0);}}var eE=a0["ROLES"][bz["role"]]["rank"];return eE>=0x2&&ad()<[0.12,0.25,0.35,0.5][eB]*(eE>=0x3?0x1:0.5)*(1+0.2*c9t);}())&&b5(a0["AWARDS"]["ballon"]),"att"===c7&&bz["goals"]>=[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]]&&(function(c9){var dt=cn;return ad()<0.35+Math["min"](0.4,(c9-[0xf,0x12,0x14,0x18,0x1b,0x1e][by["rep"]])*0.03);}(bz["goals"]))&&bz["apps"]>=0x13&&b5(by["name"]+"金靴"),by["rep"]>=0x4&&"att"===c7&&bz["apps"]>=0x13&&bz["goals"]>=0x23&&(function(c9){var du=cn;return ad()<0.35+Math["min"](0.4,(c9-0x23)*0.03);}(bz["goals"]))&&(function(c9){var dw=cn,has=!0x1;
for(var cb3=0x0;cb3<a2["awards"]["length"];cb3++)if(a2["awards"][cb3]["name"]===c9&&a2["awards"][cb3]["age"]===a2["age"])has=!0x0;
if(!has)b5(c9);
return!0x0;
}(by["name"]+"金靴"))&&b5(a0["AWARDS"]["boot"]),
a0["ROLES"][bz["role"]]["rank"]>=0x3&&bz["apps"]>=0x1e&&a2["ovr"]>=0x4a&&(function(c9){var dv=cn,cb0=0x0;
for(var cb1=0x0;cb1<a2["trophies"]["length"];cb1++){var cb2=a2["trophies"][cb1];
if(cb2["age"]===a2["age"]&&(cb2["name"]===by["name"]+'冠军'&&(cb0+=0.35),cb2["name"]===by["cup"]+'冠军'&&(cb0+=0.08)));}
return cb0>0x0&&ad()<cb0*(0x1+0.2*c9);
}(c9t))&&b5(by["name"]+"最佳球员"),
'gk'===c7&&by["rep"]>=0x3&&bz["apps"]>=0x13&&bz['cs']>=0x14&&ad()<0.3*(1+0.3*c9t)&&b5(a0["AWARDS"]["glove"]),!a2["banned"]&&bz["apps"]>=0x13&&a2["ovr"]>=0x54&&ad()<(0.03+0.18*aL())*(1+0.3*c9t)&&b5(a0["AWARDS"]["afcpoy"]);
}}return function(c9,ca,cb){var dj=dd;
if(ca&&cb){var cc=am[cb['id']];
if(cc){if(c9["trophies"]["indexOf"](cb["name"]+'冠军')>=0x0)return b4(c9,ca,cc);
var cd=ac(0.06+0.1*ca["rep"]+0.12*aL(),0x0,0.45);
return b3()?void(ad()<Math["min"](0.9,0x2*cd)&&aV("promo",0.5,{'comp':'升'+ak(cc)["name"]+"附加赛"})&&(a2["bigQ"][0x0]["fromLeag"+'ue']=cb['id'])):void(ad()<cd&&b4(c9,ca,cc));
}var ce=ao[cb['id']];
if(ce&&ca["rep"]<=0x1){if(c9["trophies"]["indexOf"](cb["name"]+'冠军')>=0x0)return;
var cf=ac(0.26-0.12*aL(),0.06,0.3);
if(b3())return void(ad()<Math["min"](0.9,0x2*cf)&&aV("drop",0.5,{'comp':cb["name"]+"保级战"})&&(a2["bigQ"][0x0]["fromLeag"+'ue']=cb['id']));
ad()<cf&&function(cg,ch,ci){var dk=dj;
a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][ch['id']]=ci,cg["move"]='降入'+ak(ci)["name"];
}(c9,ca,ce);
}}}(bz,bx,by),a2["maxOvr"]=Math["max"](a2["maxOvr"],a2["ovr"]),bz["ovrEnd"]=Math["round"](a2["ovr"]),a2["seasons"]["push"](bz),
a2["age"]++,a2["seasonsA"+"tClub"]++,au()||a2["seasonsA"+"broad"]++,bz;
}function b3(){var dl=cn;
return a0["ROLES"][a2["role"]]["rank"]>=0x3&&(a2["bigStage"+'d']||0x0)<0x3;
}function b4(bx,by,bz){var dm=cn;
a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][by['id']]=bz,bx["move"]='升上'+ak(bz)["name"];
}function b5(bx){var dn=cn;
a2["awards"]["push"]({'name':bx,'age':a2["age"]});
}function b6(){var dp=cn;
return a2["period"]={'n':a3[a2["mode"]]["seasons"],'left':a3[a2["mode"]]["seasons"],'recs':[]},a2["role"]=aH(),b7();
}function b7(){var dq=cn;
for(var bx=a2["period"];
bx["left"]>0x0&&a2["age"]<0x37;
)if(bx["recs"]["push"](b2()),bx["left"]--,a2["roleAdju"+'st']=a2["roleAdju"+'st']>0x0?Math["floor"](a2["roleAdju"+'st']/0x2):Math["ceil"](a2["roleAdju"+'st']/0x2),
a2["role"]=aH(),a2["bigQ"]&&a2["bigQ"]["length"])return aW(),null;
return(function(){var dr=dq,by=a2["period"],bz=by['n'],bA=by["recs"];
return a2["period"]=null,a2["pendingM"+"ult"]=null,a2["clean"]=ac(a2["clean"]-(au()?2.2:0.6)*bz,0x0,0x64),a2["fame"]=ac(a2["fame"]-(a6('pr')?0.35:1.5)*bz,
0x0,0x64),a2["guanxi"]=ac(a2["guanxi"]+(au()?1.6:0.5)*bz,0x0,0x64),a2["contract"+"Left"]>0x0&&a2["contract"+"Left"]--,a2["lockAbro"+'ad']>0x0&&a2["lockAbro"+'ad']--,
a0["ROLES"][a2["role"]]["rank"]<=0x1?a2["lowSpell"]++:a2["lowSpell"]=0x0,bA;
}());
}function b8(bx,by){var ds=cn;
aj(bx)&&(a2["teamId"]=bx,a2["seasonsA"+"tClub"]=0x0,a2["roleAdju"+'st']=0x0,a2["lowSpell"]=0x0,a2["stagnate"]=!0x1,a2["contract"+"Left"]=be(),
a2["loanFrom"]=null,a2["clubsPla"+"yed"]["indexOf"](bx)<0x0&&a2["clubsPla"+"yed"]["push"](bx),by||(a2["flags"]["_justMov"+'ed']=!0x0));
}function b9(bx){var dt=cn;
return!!bx&&a2["youthTea"+"mId"]===bx['id']&&a2["age"]<=0x17;
}function ba(){var du=cn;
return a2["ovr"]+Math["min"](0xa,0.08*a2["fame"])+Math["min"](0xc,0.8*a2["trophies"]["length"])-bb(a2["age"]);
}function bb(bx){return bx<=0x1d?0x0:bx<=0x21?0x2*(bx-0x1d):0x8+4.5*(bx-0x21);
}function bc(bx){var dv=cn;
return 0x30+7.5*bx["rep"];
}function bd(bx){return ba()+function(by){var dw=_sim_0b;
return Math["max"](0x0,0x3-by["rep"])*bb(a2["age"])*0.12;
}(bx);
}function be(bx){var dx=cn;
if(a2["age"]>=0x24)return a2["ovr"]>0x58?ae(0x1,0x2):0x1;
if(a2["age"]>=0x21){var by=bx||ar(),bz=aI(by),bA=bz?a0["ROLES"][bz]["rank"]:0x0,bB=by?by["rep"]:0x1;
if(bA>=0x4)return bB>=0x4?ae(0x1,0x2):ae(0x2,0x3);
if(bA>=0x3)return bB>=0x4?0x1:ae(0x1,0x2);
return 0x1;
}
return a2["age"]>=0x1d?ae(0x1,0x3):ae(0x2,0x5);
}function bf(bx,by){var dy=cn;
by=by||{};
var bz=ba(),bA=ar(),bB=as(),bC=bB?bB["rep"]:0x1,bD=a2["ovr"]>=0x52?0x2:0x1;
function bE(bK){var dz=dy;
return a0["TEAMS"]["filter"](function(bL){var dA=dz;
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
bI++){var bJ=ah(bF,function(bK){var dB=dy,bL=bc(bK);
return 0x1/(0x1+0.35*Math["abs"](bz-bL));
});
bJ&&!bH[bJ['id']]&&(bH[bJ['id']]=0x1,bG["push"](bJ));
}return at(bG,bF);
}function bg(){var dC=cn;
return aj(a2["youthTea"+"mId"]);
}function bh(bx,by){var dD=cn;
return(bx<=0x10?29.5+4.3*(bx-0xc):46.7+2.6*(bx-0x10))+1.2*(by?by["rep"]:0x2);
}function bi(){var dE=cn;
return a2["age"]>=0x10&&a2["ovr"]>=0x2a;
}function bj(){var dF=cn;
if(a2["flags"]["_double"]=!0x1,(function(){var dG=dF,by=bg(),bz=aG(a2["age"]),bA=bz[0x0]+ad()*(bz[0x1]-bz[0x0]),bB=(0x1+a2["talent"])/0x2*function(bD){var dH=dG;
if(!bD)return 0x1;
var bE=0.86+0.06*bD["rep"];
return aq(bD)['cn']||(bE+=0.06),bE;
}(by);
bA>0x0&&(bB*=ac((0x46-a2["ovr"])/0x1c,0.35,0x1)),a2["ovr"]=ac(a2["ovr"]+bA*bB,0xc,0x63),a2["maxOvr"]=Math["max"](a2["maxOvr"],
a2["ovr"]);
var bC=ad()<function(bD){var dI=dG,bE=bg(),bF=bh(bD,bE)-a2["ovr"];
if(bF<=0x0)return 0x0;
var bG=bD<=0xc?0.5:bD>=0xe?1.15:0x1;
return ac(0.0052*bF*function(bH){var dJ=dI;
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
}function bk(){var dK=cn;
if(a2["step"]++,"youth"===a2["phase"])return a2["youthTea"+"mId"]?bj():(function(){var dL=dK,bF=a0["TEAMS"]["filter"](function(bR){return aq(bR)['cn'];
}),bG=bF["filter"](function(bR){var dM=dL;
return ab(a2["originId"],bR['id']);
}),bH=bF["filter"](function(bR){var dN=dL;
return!ab(a2["originId"],bR['id']);
}),bI=[],bJ={};
function bK(bR,bS){var dO=dL;
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
var bO=a2["money"]>=0x1e,bP=a0["TEAMS"]["filter"](function(bR){var dP=dL;
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
b1("love_fir"+'st')),a2["age"]>=0x14&&(a2["flags"]["_staffCd"]||0x0)<=0x0){var bC=(function(){var dQ=dK;
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
a2["forceQ"].indexOf("nat_captain")<0x0&&a2["forceQ"].push("nat_captain"));
if(a2["flags"]["_staffCd"]>0x0&&a2["flags"]["_staffCd"]--,a2["forceQ"]&&a2["forceQ"]["length"]){var bD=a2["forceQ"]["shift"]();
var bO2=function(bF){var dS=dK;
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
}function bl(){var dT=cn;
a2["flags"]["_double"]=!0x1;
var bx=b6();
bx&&(a2["pending"]={'type':"report",'recs':bx});
}function bm(){var dU=cn,bx,by=bp(a2["originId"])["guanxi"]>=0x12?0x3:0x2,bz=bg(),bA=[],bB={};
bz&&a2["ovr"]>=(bx=bz,Math["min"](bc(bx)-0x8,bh(a2["age"],bx)-0x6))&&(bB[bz['id']]=0x1,bA["push"](bz));
var bC=bz&&!aq(bz)['cn'],bD=a0["TEAMS"]["filter"](function(bM){var dV=dU,bN=aq(bM);
return!bB[bM['id']]&&(bC?!bN['cn']&&bM["rep"]<=(bz["rep"]>=0x4?0x3:0x2):bN['cn']&&bM["rep"]<=by);
}),bE=bD["filter"](function(bM){var dW=dU;
return ab(a2["originId"],bM['id']);
}),bF=bD["filter"](function(bM){var dX=dU;
return!ab(a2["originId"],bM['id']);
});
function bG(bM,bN){var dY=dU;
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
}function bo(bx,by){var dZ=cn;
a2["_offerTerms"]={};
function bO(bG){var bH=aJ(bG,aq(bG),a2["ovr"]),bI=be(bG),bJ=0.9+0.2*ad(),bK=0x1;
bK=bI<=0x1?1.3:0x2===bI?1.15:0x3===bI?0x1:0x4===bI?0.9:0.82;
return a2["_offerTerms"][bG['id']]={'wage':Math["round"](bH*bJ*bK),'years':bI,'mult':bJ*bK};
}if(a2["cheat"]&&a2["ovr"]>=0x3e){var bz=ax(),bA=a0["TEAMS"]["filter"](function(bG){var e0=dZ,bH=aq(bG);
return!bH['cn']&&('欧冠'===bH["cont"]||'欧联'===bH["cont"])&&bG["rep"]<=bz;
}),bB=0x0;
if(bA["forEach"](function(bG){var e1=dZ;
bG["rep"]>bB&&(bB=bG["rep"]);
}),(bA=bA["filter"](function(bG){var e2=dZ;
return bG["rep"]>=bB-0x1;
}))["length"])return ag(bA),bA["forEach"](bO),void(a2["pending"]={'type':"transfer",'fired':!0x1,'offers':bA["slice"](0x0,0x3)["map"](function(bG){return bG['id'];
}),
'canStay':!au()&&!!ar()&&(ar()["rep"]>=bB||aq(ar())["rep"]>=0x4),'canRetire':a2["age"]>=0x1e});
}var bC=bf(a6("analyst")?0x6:0x4),bD=ar();
bD&&bO(bD),bC["forEach"](bO);
bx&&!by&&(a2["age"]>=0x20&&a2["ovr"]>=0x4b||b9(bD))&&(bx=!0x1,a2["lowSpell"]=0x0);
var bE=!bx&&!by&&bD&&(function(bG){var e3=dZ,bH=bc(bG)-0x5;
return bG&&a2["youthTea"+"mId"]===bG['id']&&(bH-=0x8),bd(bG)>=bH;
}(bD)||b9(bD)||a2["seasons"]["filter"](function(bK){var e3b=dZ;
return bK["teamId"]===bD['id'];
})["length"]>=0x3||a2["age"]>=0x20&&a2["ovr"]>=0x4b),bF=[];
bE&&a2["age"]<=0x17&&bD&&a0["ROLES"][aI(bD)]["rank"]<=0x1&&(bF=(function(){var e4=dZ,bG=ar();
if(!bG)return[];
var bH=aq(bG),bI=a0["TEAMS"]["filter"](function(bK){var e5=e4;
return bK['id']!==bG['id']&&!(bK["rep"]>=bG["rep"])&&aq(bK)['cn']===bH['cn']&&a0["ROLES"][aI(bK)]["rank"]>=0x2;
});
if(!bI["length"])return[];
bI["sort"](function(bK,bL){var e6=e4,bM=a0["ROLES"][aI(bK)]["rank"];
return a0["ROLES"][aI(bL)]["rank"]-bM||bL["rep"]-bK["rep"];
});
var bJ=bI["slice"](0x0,Math["min"](bI["length"],0x8));
return ag(bJ),bJ["slice"](0x0,0x2);
}())),bC["length"]||bE?(a2["pending"]={'type':"transfer",'fired':!!bx,'mustLeave':!!by,'offers':bC["map"](function(bG){return bG['id'];
}),'loans':bF["map"](function(bG){return bG['id'];
}),'backFrom':a2["flags"]["_loanBac"+'k']||null,'canStay':!!bE,'canRetire':a2["age"]>=0x1e},a2["flags"]["_loanBac"+'k']=null):a2["pending"]={'type':"retire_f"+"orced"};
}function bp(bx){var e7=cn;
for(var by=0x0;
by<a4["length"];
by++)if(a4[by]['id']===bx)return a4[by];
return a4[0x0];
}function bq(){var e8=cn,bx,by,bz=0x0,bA=0x0;
for(bx=0x0;
bx<a2["seasons"]["length"];
bx++){var bB=aj((by=a2["seasons"][bx])["teamId"]),bC=by["leagueId"]?ak(by["leagueId"]):aq(bB);
bC&&bC["rep"]>=0x4&&bz++,bC&&bC["rep"]<=0x1&&bA++;
}var bD=a2["trophies"]["filter"](function(bL){var e9=e8;
return/欧冠|欧联|世界杯|世俱杯|亚冠/["test"](bL["name"]);
})["length"],bE=a2["trophies"]["filter"](function(bL){var ea=e8;
return/欧冠/["test"](bL["name"]);
})["length"],bF={'世界杯':-0x1,'亚洲杯':-0x1};
(a2["natRuns"]||[])["forEach"](function(bL){var eb=e8,bM=aQ[bL["stage"]];
null!=bM&&bM>bF[bL["comp"]]&&(bF[bL["comp"]]=bM);
});
var bG={};
(a2["awards"]||[])["forEach"](function(bL){var ec=e8;
bG[bL["name"]]=(bG[bL["name"]]||0x0)+0x1;
});
var bH={};
a2["seasons"]["forEach"](function(bL){var ed=e8;
if(bL["teamId"]){var bM=bH[bL["teamId"]]||(bH[bL["teamId"]]={'seasons':0x0,'apps':0x0,'name':bL["teamName"]});
bM["seasons"]++,bM["apps"]+=bL["apps"];
}});
var bI=null;
for(var bJ in bH)(!bI||bH[bJ]["seasons"]>bI["seasons"])&&(bI=bH[bJ]);
var bK=bI?a2["trophies"]["filter"](function(bL){var ee=e8;
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
'seasonDouble20':(function(c2){var eZ=e8;
for(var c3=0x0;c3<a2["seasons"]["length"];c3++)if(a2["seasons"][c3]["goals"]>=0x14&&a2["seasons"][c3]["assists"]>=0x14)return!0x0;
return!0x1;
}()),'lateGoals':(function(c2){var f0=e8;
for(var c3=0x0;c3<a2["seasons"]["length"];c3++)if(a2["seasons"][c3]["age"]>=0x23&&a2["seasons"][c3]["goals"]>=0x14)return!0x0;
return!0x1;
}()),'poyCount':(a2["awards"]||[]).filter(function(bL){var f1=e8;
return bL["name"]["indexOf"]("最佳球员")>=0x0;
})["length"],'topCount':(a2["awards"]||[]).filter(function(bL){var f2=e8;
return bL["name"]["indexOf"]('金靴')>=0x0;
})["length"]};
}function br(bx){var ef=cn;
a2["phase"]="summary",a2["endReaso"+'n']=bx;
var by=bq(),bz="青训淘汰"===by["reason"];
function bA(bF){var eg=ef;
return null==bF["tier"]?0x9:bF["tier"];
}for(var bB=null,bC=[],bD=0x0;
bD<a0["ENDINGS"]["length"];
bD++){var bE=a0["ENDINGS"][bD];
bz===(0x0===bA(bE))&&bE["test"](by)&&(bC["push"](bE['id']),(!bB||bA(bE)<bA(bB))&&(bB=bE));
}bB&&(a2["ending"]=bB['id']),a2["endingsA"+'ll']=bC;
}function bs(bx){var eh=cn,by=a2["pending"];
if(!by||"random"!==by["type"]||by["result"])return!0x1;
for(var bz=null,bA=0x0;
bA<a1["length"];
bA++)a1[bA]['id']===by["eventId"]&&(bz=a1[bA]);
if(!bz)return null;
var bB=bz["options"]||(bz["pool"]&&function(){var bH={};for(var bI in bz)bH[bI]=bz[bI];var bJ=bz["pool"]["slice"]()["sort"](function(){return Math["random"]()-0.5});bH["options"]=bJ["slice"](0x0,(bz["rndPick"]||0x3))["concat"](bz["single"]?[bz["single"]]:[]);for(var bN=0x0;bN<a1["length"];bN++)a1[bN]===bz&&(a1[bN]=bH);return bH["options"];}())||[];bB=bB[Number(bx)];if(!bB)return!0x1;
var bR4=function(bG2){var ei2=eh;a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':bG2&&bG2["title"]||"事件",'text':bG2&&bG2["text"]||''});};
if(bv(bx),a2["cheat"]){var bF4=function(bD){var ei=eh;
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
}function bt(bx,by){var ej=cn;
return bx&&"function"==typeof bx['p']?bx['p'](by):null;
}function bu(bx){var ek=cn;
if(!bx)return-0x1/0x0;
var by=0x0;
return bx["banned"]&&(by-=0xf4240),bx["retire"]&&(by-=0xf4240),bx["ban"]&&(by-=0x190*bx["ban"]),bx["banGames"]&&(by-=0x8*bx["banGames"]),
bx["stagnate"]&&(by-=0x96),bx["lockAbro"+'ad']&&(by-=0x3c*bx["lockAbro"+'ad']),bx["returnHo"+'me']&&(by-=0x12c),bx["leave"]&&(by-=0xf),
bx["goAbroad"]&&(by+=0x1e),by+=0xa*(bx["ovr"]||0x0),by+=0x14*(bx["roleDelt"+'a']||0x0),by+=bx["fame"]||0x0,by+=0x5*(bx["talent"]||0x0),
by+=0x8*(bx["caps"]||0x0),(by+=0.1*((bx["clean"]||0x0)+(bx["guanxi"]||0x0)))+0.02*(bx["money"]||0x0);
}function bv(bx){var el=cn;
a2["choices"]&&a2["choices"]["push"](String(bx));
}function bw(bx){var em=cn;
return a2["pending"]?(a2["pending"]["result"]={'text':aD(bx["text"]),'deltas':aF(bx)},a2["pending"]["result"]):null;
}window["SIM"]={'attach':function(bx){return a2=bx;
},'state':function(){return a2;
},'newState':function(bx,by,bz,bA,bAch){return a2=function(bB,bC,bD,bE,bAch){var en=_sim_0b,bF=bC["origin"],bG=az(bE),cK=null;
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
'life':{'partner':null,'married':0x0,'kids':[],'splits':0x0},'flags':{},'staff':{},'pending':null,'usedEvents':{},'choices':[],'eventLog':[],
'rid':null,'achBonus':bAch||null};
}(bx,by,bz,bA,bAch),a2;
},'nextStep':bk,'doPeriod':bl,'choose':function(bx){var eo=cn,by,bz,bA=a2["pending"];
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
if("stay"===bx)return bv(bx),function(){var dT2=eo,bU2=a2["_offerTerms"]&&a2["_offerTerms"][ar()['id']];
a2["contract"+"Left"]=bU2?bU2["years"]:be(),a2["wageMul"+'t']=bU2?bU2["mult"]:0x1;
}(),a2["pending"]=null,bk(),!0x0;
if(0x0===String(bx)["indexOf"]("loan")){var bE=bA["loans"]&&bA["loans"][Number(String(bx)["slice"](0x4))];
return!!bE&&(bv(bx),by=bE,bz=a2["teamId"],b8(by,!0x0),a2["loanFrom"]=bz,a2["contract"+"Left"]=0x1,a2["pending"]=null,bk(),
!0x0);
}var bF=bA["offers"][Number(bx)];
return!!bF&&(bv(bx),b8(bF,!0x0),function(){var dU2=eo,bV2=a2["_offerTerms"]&&a2["_offerTerms"][bF];
a2["contract"+"Left"]=bV2?bV2["years"]:be(),a2["wageMul"+'t']=bV2?bV2["mult"]:0x1;
}(),a2["pending"]=null,bk(),!0x0);
}return "staff"===bA["type"]?(bv(bx),"skip"!==bx&&bA["offers"]["indexOf"](bx)>=0x0&&(a2["staff"]=a2["staff"]||{},a2["staff"][bx]=!0x0),
a2["pending"]=null,bk(),!0x0):"bigmatch"===bA["type"]?!bA["result"]&&function(bG){var ep=eo,bH,bI=a2["bigQ"][0x0],bJ=null;
for(bH=0x0;
bH<aY["length"];
bH++)aY[bH]["key"]===bG&&(bJ=aY[bH]);
if(!bJ)return!0x1;
bv(bG);
var bN=bI["half"][0x0],bO=bI["half"][0x1],bP=[],bQ='',bK=Math["max"](0x0,(a2["ovr"]-0x46))/0x23,bL=ac(bI['p']-0.095+bJ['dp']+bK*(bJ["risk"]?0.09:0.045)+(bN-bO)*0.15,0.04,0.93),bM=ad()<bL;
a2["cheat"]&&(bM=!0x0);
bM?bN<=bO?(bN=bO+0x1,bQ="落后到反超"):bN+=ad()<0.45?0x1:0x0:bN>=bO?(bO=bN+0x1,bQ="被反超"):bO+=ad()<0.4?0x1:0x0;
var bR=!bM&&ad()<0.3||bM&&ad()<0.25,bS=null;
if(bR){bN=bO=Math["max"](bN,bO);
var bT=ae(0x3,0x5),bU=0x5===bT?ae(0x3,0x4):bT-0x1;
bS=bM?[bT,bU]:[bU,bT];
}var bV=aR[bI["kind"]]["side"]||bI["team"];
"push"===bJ["key"]?bP["push"]("下半场你们把防线"+"整体压过中圈。这"+"么踢没有中间地带"+'。'):"hold"===bJ["key"]?bP["push"]("下半场你们把阵型"+"收了回去，先不丢"+"球再说。"):bP["push"]("下半场球开始从你"+"脚下过。节奏慢下"+"来了，但每一脚都"+"有去处。");
var bW=al(a2["pos"])["group"],bX=null;
ad()<bJ["glory"]&&(bX='gk'===bW?bR?"扑出了点球大战里"+"的第三轮":'第\x20'+ae(0x3c,0x58)+(" 分钟单掌把必进"+"球托了出去"):"def"===bW?"在门线上把球解围"+'出去':"mid"===bW?bM?"送出了那记决定比"+"赛的直塞":"把球权一次次抢回"+'来':bM?"打进了那个球":"打出了全队唯一一"+"次射正"),
bR?bP["push"]("九十分钟和加时都"+"没分出胜负。点球"+"大战。"):"落后到反超"===bQ?bP["push"]('第\x20'+ae(0x46,0x5a)+(" 分钟，比分被翻"+"了过来。")):"被反超"===bQ&&bP["push"]('第\x20'+ae(0x48,0x5a)+(" 分钟，对方把比"+"分反超。")),
bX&&bP["push"]('你'+bX+'。');
var bY=bV+'\x20'+bN+" 比 "+bO+(bS?"，点球 "+bS[0x0]+" 比 "+bS[0x1]:'')+'。';
bP["push"](bM?"终场哨响。"+bY+(bR?"点球大战赢下来的"+"那种赢法，腿是软"+'的。':"很多年以后你还会"+"梦到这一刻。"):bY+(bR?"点球大战输掉的球"+"，最难过去。":"你在草皮上坐了很"+"久，没人来拉你。"));
var bZ=a2["seasons"][bI["recIdx"]]||null,c0=[];
bZ&&(bX&&'gk'!==bW&&("mid"===bW||"def"===bW?(bZ["assists"]++,a2["totals"]["assists"]++):(bZ["goals"]++,a2["totals"]["goals"]++)),
'wc'===bI["kind"]||"asia"===bI["kind"]?b0(bZ,bI["comp"],bM?'冠军':'亚军',bI["age"]):"cont"===bI["kind"]&&bM?(bZ["trophies"]["push"](bI["comp"]+'冠军'),a2["trophies"]["push"]({'name':bI["comp"]+'冠军','age':bI["age"],'team':bI["team"]})):"promo"===bI["kind"]&&bM?(a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][bI["teamId"]]=am[bI["fromLeag"+'ue']],bZ["move"]='升上'+ak(am[bI["fromLeag"+'ue']])["name"]):"drop"!==bI["kind"]||bM||(a2["leagueOf"]=a2["leagueOf"]||{},a2["leagueOf"][bI["teamId"]]=ao[bI["fromLeag"+'ue']],bZ["move"]='降入'+ak(ao[bI["fromLeag"+'ue']])["name"]));
var c1=bM?'wc'===bI["kind"]?0x1e:"asia"===bI["kind"]?0x12:0x10:'wc'===bI["kind"]?0xa:0x4,c2=Math["round"](c1*(0x1-a2["fame"]/0x64));
return a2["fame"]=ac(a2["fame"]+c2,0x0,0x64),c2&&c0["push"]({'cls':'up','text':"名气+"+c2}),bJ["mood"]&&(a2["guanxi"]=ac(a2["guanxi"]+bJ["mood"],0x0,0x64),
c0["push"]({'cls':'up','text':"关系+"+bJ["mood"]})),a2["pending"]["result"]={'won':bM,'log':bP,'deltas':c0,'score':[bN,bO],'pens':bS},a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':bI["comp"],'text':(bM?'冠军':'失利')+'：'+bY}),
a2["bigQ"]=[],!0x0;
}(bx):"retire_f"+"orced"===bA["type"]&&(bv(bx),br("无人问津"),!0x0);
},'cont':function(){var eq=cn,bx=a2["pending"];
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
},'resolveEvent':bs,'commitEvent':bw,'goSummary':br,'optHint':function(bx,by){var er=cn,bz=bx&&bx["options"]&&bx["options"][by];
if(!bz)return'';
if("function"!=typeof bz["hint"])return bz["hint"]||'';
var bA=aA();
return bz["hint"](bA,bt(bz,bA))||'';
},'BIG_OPTS':aY,'STAFF':a5,'staffById':function(bx){var es=cn;
for(var by=0x0;
by<a5["length"];
by++)if(a5[by]['id']===bx)return a5[by];
return null;
},'staffFee':a8,'staffPrice':a7,'leagueOfTeam':aq,'makeAcademy':bm,'makeTransfer':bo,'offerBrief':function(bx){var et=cn,by=aj(bx);
if(!by)return null;
var bz=aq(by),bA=aI(by),bC=a2["_offerTerms"]&&a2["_offerTerms"][by['id']];
if(!bC){var bD=aJ(by,bz,a2["ovr"]),bE=be(),bF=0.9+0.2*ad(),bG=0x1;
bG=bE<=0x1?1.3:0x2===bE?1.15:0x3===bE?0x1:0x4===bE?0.9:0.82;
bC={'wage':Math["round"](bD*bF*bG),'years':bE,'mult':bF*bG};
}return{'wage':bC["wage"],'years':bC["years"],'role':bA,'roleName':a0["ROLES"][bA]["name"],'mult':bC["mult"]};
},'wageAt':aJ,'academyName':function(bx){var eu=cn;
return bx?bx["academy"]||bx["name"]+" 梯队":"青训队";
},'YOUTH_ADULT_OVR':0x2a,'bigOpponent':aU,'rnd':ad,'rint':ae,'rpick':af,'shuffle':ag,'rweight':ah,'hashStr':ai,'clamp':ac,
'teamById':aj,'leagueById':ak,'posById':al,'curTeam':ar,'curLeague':as,'inChina':au,'originById':bp,'isNear':ab,'isHome':function(bx,
by){var ev=cn,bz=aa[bx];
return!!bz&&bz["indexOf"](by)>=0x0;
},'fmtMoney':av,'fmtValue':function(bx){var ew=cn;
return bx>=0x5f5e100?(bx/0x5f5e100)["toFixed"](0x2)["replace"](/0$/,'')+" 亿欧":bx>=0x2710?Math["round"](bx/0x2710)+" 万欧":bx+'\x20欧';
},'valueOf':function(bx,by){var ex=cn,bz,bA=a0["VALUE_TA"+"BLE"],bB=bA[0x0][0x1];
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
'roleAtTeam':aI,'posRates':aK,'starPower':aL,'nationalOdds':aM,'runTournament':aP,'natBest':function(){var ey=cn,bx={};
return(a2["natRuns"]||[])["forEach"](function(by){var ez=ey;
(!bx[by["comp"]]||aQ[by["stage"]]>aQ[bx[by["comp"]]["stage"]])&&(bx[by["comp"]]=by);
}),["世界杯","亚洲杯"]["filter"](function(by){return bx[by];
})["map"](function(by){return bx[by];
});
},'natResult':aZ,'simulateOneSeason':b2,'addAward':b5,'runPeriod':b6,'doTransfer':b8,'pickOffers':bf,'offerOption':function(bx,
by){var eA=cn,bz=aq(bx);
return{'teamId':bx['id'],'team':bx,'label':"加盟 "+bx["name"],'info':bz["name"]+" · "+["保级队","中下游",'中游','争冠','豪门',"顶级豪门"][bx["rep"]],
'tag':by||null};
},'buildProfile':bq,'legacyFrom':function(bx){var eB=cn;
if(!bx)return null;
var by=(bx["gen"]||0x1)+0x1;
return bx["banned"]?{'gen':by,'ovr':0x0,'talent':0x0,'guanxi':0x0,'money':0x0}:{'gen':by,'ovr':ac(Math["round"]((bx["maxOvr"]-0x44)*0x2/0x5),0x0,ay["ovr"]),
'talent':ac(Math["round"]((bx["maxOvr"]-0x44))/0x64,0x0,ay["talent"]),'guanxi':ac(Math["round"](bx["caps"]*0x2/0x5+3*bx["trophies"]),0x0,ay["guanxi"]),
'money':ac(Math["round"](0.01*bx["careerEa"+"rnings"]),0x0,ay["money"])};
},'normLegacy':az,'LEGACY_CAP':ay,'SAVE_VER':0x6,'MODES':a3,'ORIGINS':a4,'NEAR_TEAMS':a9,'HOME_TEAMS':aa,'NAT_RANK':aQ,'NAT_SHORT':{'预选赛出局':"没打进正赛",
'小组赛出局':"小组赛出局",'止步十六强':"十六强",'止步八强':'八强','止步四强':'四强','亚军':'亚军','冠军':'冠军'}};
}()));
function _sim_0b(a,b){a=a-0x1f3;
var c=_sim_0a();
var d=c[a];
if(_sim_0b['MzxuaW']===undefined){var e=function(i){var j='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
var l='',m='';
for(var n=0x0,o,p,q=0x0;
p=i['charAt'](q++);
~p&&(o=n%0x4?o*0x40+p:p,n++%0x4)?l+=String['fromCharCode'](0xff&o>>(-0x2*n&0x6)):0x0){p=j['indexOf'](p);
}for(var r=0x0,s=l['length'];
r<s;
r++){m+='%'+('00'+l['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);
}return decodeURIComponent(m);
};
_sim_0b['qxokqO']=e,_sim_0b['gXvWyr']={},_sim_0b['MzxuaW']=!![];
}var f=c[0x0],g=a+f,h=_sim_0b['gXvWyr'][g];
return!h?(d=_sim_0b['qxokqO'](d),_sim_0b['gXvWyr'][g]=d):d=h,d;
}function _sim_0a(){var eC=['y2XLyw4','CMvZDwX0','z2XVDMu','C3rHEq','yMvUy2G','z2fTyMXLza','mtC0nZi3mfz6wfLjqG','y29UDhjHy3q',
'yxnPyq','C3vI','D2nX','5lIQ44cc5lIT5zY65zoO5zon5PE26ykJ','BgLNyq','5AsN54Mm57Up57QQ5lQ6','5lIk5y2k5zY66lcb6yo95RkH5OMt5BYa',
'5Bga6z2I44cc5l2G5lUS5zYO5lIT5zY6','5Bgc5Bgc5B6a5lIk6ycb','zxzLBNrdAge','5ywS5ywZ5zUI6zIF','x2XVDMvtDge','5y2b5ywT5BY6','5lMD5y2b5yIg6zkF5zkm5yQG5PE26yo9',
'Bwf4t3zY','BgvHz3vLswq','5Q2J57Up5Q+u6lwB6lII','BMf0q3m','AgfZt3DUuhi','C2LKzq','6l+B572r55Qe6ykJ5lIa5lIl77Ym5zY6','i0uWm0eZrq',
'ios6V+ASPW','CMvOywi','zgvM','ndvOyufXBKy','yMLHBNPOAq','5zYO5lIa6lw35lQg','55Qe5lIK55cd44cc6lcb5lMF5RkH6io9','5Ps25lQg5zUE5y6777Ym5ywi5lIn5lII',
'CMvW','yxbWBhK','BgfZDa','iowiHUMsN+wnLEAoJoAkIUw/HEI/MW','DgLYzq','zM9YrwfJAa','BwLK','zg93BG','Ew91DgHbyNi','5zU95A626zIFkW',
'Dg9gAxHLza','CM5Nu3rHDgu','ios4H+ASPW','5OIq6zw/5B+R5lIa54k5','A2LK','CMvZ','77Ym5PYa6zQ+6l+h5y6744cc','yNvUza','D29YBgq',
'zxzLBNrjza','yxzL','y2HPBMfpBMW','ChjPBwu','y24TCwLHBG','u0Ln','BMf0qxnZAxm','CMvHC29U','Cg9Z','B3v0Aa','Cg93','CgvHA0fUBNu',
'Ew91DgHFCge','5lQg6l+h5P2L44cc','yxn0','y3nSyM9VDa','DwX0','iZDem0m5oa','C3rHzMzhB24','y24TCM9UzW','EwvK','B3jPz2LUswq','BwfYCMLLza',
'AgLUDa','Aw5KzxHpzG','imk3ia','zw5KuMvHC28','zNjVBuXLywC','5lIa5lIQ77Ym5Q+u5yIg5zkS5l2p5lQg','y29UDa','Bg92zv9RAwq','x2zPCNn0',
'ywzJCg95','x2P1C3rnB3y','BMf0','5B2t54I454I45lQg','54k555cd5AsN5OIy6l6t5O6j55Qe55cd','5yIW5lQg5lIK55cd44cc','mJi0nZa1mwT3r0n2vW',
'56Ab6lwBia','5lUw5y+Q6k6P5l2G57Ud5lIn5O6j5lIl','56Eb5lQ65BQ35Asn5BIi','BNvTyMvY','5Q+u5yIR5Ase5PEP','Dg90ywXZ','5yE65zY65AsAiduL',
'ywDLrNjHDwq','572A5QY+5Bcr5lIj5OIq','y2fYzwvYrwe','5lIw5l+X5P2V5yAG5yAB','56Eb5lQ65y6O5BIi','BuLK','5lIl5y2k5zY65l2G5lUS5OQk6zI15z6l',
'y29Hy2Hdzxi','5PIV5RkH5lQ65PcT5OMl','6z2s6k6T6zIF','zML0BMvZCW','BMf0u3rHDhm','5As055Qe6yo954UG','DgnHBgW','BMf0x2zPCNm',
'y24TAhu','5ygC6lwBia','5OQk55cd5ygA5yE65P2L','CNvU','y2HVAwnLCW','Ew91DgHdDxq','5OQk55cd5P2d5lIa5QYH5QYH5OQI5zUE','y24TAMLHBMC',
'zw5KAw5NC0e','yMfU','BgLMzq','5lIT5zY65lYr5OgV44cc5PU06kgJ5A6K','6kw/54+T54Mz','tgvMDa','CMvWzwf0','Ew91DgG','DhjPBq','BMfTzq',
'C3rHCNrLCG','y24TExvL','5l+D57QN5OIy','zNvUy3rPB24','y24TzgW','6jc95zco5yIW5y+n6lAf','AhvU','5lQ65PwW5O2U5BMZ5REH','y24TExvU',
'C3rHz2u','Bwf4','y24TBhu','C3rHCG','5PYj5y675Ase44cc','Ew91DgHmB2C','y24TEMHVBMC','nLP0EefNqW','5P2L5zUE56oO5lQg5zUB5y2b5lQu5yIg',
'mtGZmZyZuunos2PI','55wz5Rsl6zEO5QEB6zMn5lIa5QgJ','Bg9HBKzYB20','5BM06B6e5yIW5lQg','B3jJzwq','z3vHBNHP','DenSDwi','5y2b5A6244cc',
'5zco5lIK55cd44cc','5yQG55UFia','5P2L5lQg77Ym5l2g5Q+p5lIa6isA6yo9','C3bSAxrZ','y2fUu3rHEvK','5Pw05l2t5y6l6l+h5lIT5zYi44cc6l+z',
'iZjfn0qZmG','6yEm5Pwz57Ud5zYO55M95P2/5lIk55s7','refuqq','DhLWzq','Dg9Uzq','CMv0AxjL','z2XVCNK','5PYa5y+V6io96kkR5y+n5yE75OMt56M/',
'vKfmvuvFvee','x2v2q291BNq','6k6P5PEN5PAW6zE75Rkj5lIl5y6744cc','6lwI6z2I5RAO5B6x5PYa5AsA77Ym5lMF','6l6555Qe5PU/6kgL5BIT5zYO5zAk44cc',
'BwfW','6ioH6zUQ5ys/','ywDL','CMfUzg9T','57Ui6lQR56Ab6lAZ','iZfcney3mG','CgHHC2u','zMXVB3i','i0mWmZKYqG','iZfcn0eZrq','y291BNrYEq',
'iZfbnKzcna','yxbWCW','5lQg5lIa6ycA77Ym5PYa5zco6l2S6l+h','r1jpv1ri','iZbcnevbmG','y24TAMLUzW','vevbtvm','B3bW','5OMt5yE65lQg5ywO6zIF5zsV5lIa5lIa',
'BgvNywn5','yMfUr2fTzxm','DgvHBq','ywDLBNq','C2vN','iowiHUMsN++8JowVUEAwUEAkIUAVLa','5OMr5yE65lQg54k555cd5AsN5OIy6yEm','y24Tz2fU',
'nde2mtqWC2PnqLfO','yw5HBhLZDa','C3bSAxq','5A+55PA55zYO6kgL5PE25OMZ5zUE5lIa','yNjVywq','C3rLCa','C3rHzMy','B2jQzwn0','ue9tsvrjt04',
'6iUX5Qc85ywW','5lIl5y2k5zY65BYa5AEl5yMn5y+i6kkR','BgvUz3rO','B3jPz2LU','56IZ5l2p6zI15z6l','C2vHC29UCW','i0m4mtaYrq','5lQA5RsY5P2V',
'BgvMDa','C3rHz25HDgu','CMvWBgfJzq','6isA5lIl6l+h44cc6iQc5Awp5OwI5lIl','5PEG55cd5y+V6lII','BMv4Da','BgvHDMu','zMLSDgvY','5lUw5O6L5B6x6ycA6ykJ5yEG5lIQ55s1',
'Bg93u3bLBgW','5ywi6l+B5lQg5lIa5lIQ44cc55Yl5y+W','B2fK','C2vHC29UC0e','5B6i5AsA5BM05lUL5zco5l2G6l+y5lYA','5Pw05lIQ56Uz5lQg6lw35P2L44cc',
'5PA555cd6l+344cc','mJu1odm1nKvUsu5uwq','y24TAMLU','yMfSBg9U','5y6l5lIk5y675Pcp','5l2t5QcH5l2t57o75A6m5Pw077Ym5lIa','6zY45B6x6jUU5zcd5B6x6iUM77Ym5BcX',
'Bg9JA0fICM8','5zU95A626zIF','iowiHUMsN++8JoAVLowiHUIIQ+E/UW','5lMf77Ym5RkH5lQ65P2L5OUj5l2G44cc','5lQ65AsA5l2n572U5Bcr77Ym6io95yAs',
'BgLNAhq','BgvHz3vL','Bg92zv9MAxi','zML4zwq','tevbr1vfuW','6ycb5yE65lQg6ykJ6k6W5yAZ5A6A5Q+u','zhjLyw1jza','y2WX','nde1otuXouvWAeveyq',
'5AsA5lIa5lU95OQL5lU3','5zYO6zEO57Q/5lIk5OQk55cd6kEJ5zU0','BMf0uNvUCW','x25HDenHBgW','CMvWB3j0','5RkH5OMt6l+B5Q2J6lwB','yMfUBMvK',
'CgfYDg5LCG','5y205B6x6iEQ5BEX5OM+','Bw9Vza','6yEm5A6j6z2z5B6x6io95zcS6kEb5A+5','DxnLzev2zw4','CMvJswr4','z29HBhm','CM9SzurLBhq',
'y2fWCW','yxnZAxn0yw4','zM9VDa','5OUS6ykJ5lQB5lQ6','ndG2mJm4nfntvMLMyq','C2XPy2u','6l+E6iwk6ikj6yo96kkR5lUw5Ps26lwW','A2LKCW',
'5lI75yQO5OYc6z20','ioAVLca','y24TCgvUzW','y2vPBa','5l2G5zYO6i2j55QU5lIk5z2q5lQg5B6i','zM9Yy2vr','CgvUzgLUz00','x2nUq291BNq',
'CMvJCW','DhjHBNnMzxi','iowiHUMsN++8Ja','CM5PBMDZ','y2HLyxq','C2LUy2u','5PEP5PEP6kkR5OYr6lwW','6lII55cd5zYO6l+z5ys/566x5lIn5yQH',
'BxvSDa','AgfSzG','6lQR5l2t5P2H5lU25AsP55sF6AUy5lIa','5QYH5Bce5Q2J','z2vU','5yIg5y+n6lAf44cc','AwnVBG','6zMe5yQG6lwB','5l2G55Qe54oT5zU+5y+r5yIW5lQg5lIj',
'5y2k5zY657Ut5P2F5yMn5y+i5P2L5lIa','vfjpueHjrvm','iZe2qta4nq','Bw9UzxK','5R6Z5AsN5yIP5lQA','5lUw5y+Q5A+55l2G5lIa5lIQ5lQ66lsF',
'B2zMzxjZ','54k555cd5AsN5OIy6lwI5lIl5P2L55Qe','B3zYrw5K','B3b0Aw9UCW','zM9Yy2u','CM91BMq','iowiHUMsN+s4OUEqG+oaGUEARUEqGW',
'55cd5OMy5lQg5yE65y67','BwLU','5lIT5lIl5RI4','5zcn5Rcu5lIn6yca44cb6BUr5PAz5yEp','5OQk5Q+u5yIg55sP5BYa44cc','z29byNjVywq','Aw5QDxj5',
'DgvHBuLK','BwfYCNK','6lwB55Qe55U05AgE','6lAZ55cd5lMl5lMH77Ym5lUo5Bcp5PYj','5lMF5l6B5B6x6lw3','y24Ty2HHBMC','5lIk5y2k5zY65lQs5lQK55M95y235BYp',
'ru5esu5huW','5OMt6l+B5lQg6ykJ5lIQ55cd','Bgf3EwvY','BMnL','wu9vveHFqui','6z2s6k6T5REy5RgW','5AsN5OIy44cc','5y+i5lIa5lIQ5A2P5A2q',
'yxnZAxn0CW','5RkH5yIg5yE66ioC6lsF44cc54k555cd','yxr0','5yIg5BYa5lQg','5PEG5lQ66zEU5RsL','uK9brf9gruu','y29SB3i','BM90zq',
'y24TAgvP','5Bcp57Ue6lwB5yE65Bga','D2vPz2H0','y24TAhvHAq','5Bgf5lIT77Ym6zIF5y+l5PU05Os/5Osp','CMv0DxjUsg8','DMv0','Aw5dAgLUyq',
'y24TBwLU','DgDVywW','5Bcp57Ue6lwB','DgLLCG','y2X1yNnqBge','z29HBa','Dw5ZAgLMDa','ywXxywDL','qKXf','zgvNCMvL','x2rVDwjSzq',
'Bg9HBNm','Aw11Ba','y2HHCKnVzgu','5lIw55wm5P2V','55Qe56YS5lIj6l2U','y2HLzG','6Ag257QN6lgQ6zEO','5lIQ44cc5l2G5lUS5OQk5lYy5yQ/5OUj',
'qvDbuKrt','D2HLBG','A2LUza','C2HPzNq','Bg9HBG','x3n0ywzMq2q','CMLZAW','yM9VDa','5lIl5y2k5zY65l2G5lUS5OQk6zIY57Q/','B3zY',
'ywjZ','ChjVBw8','Dgv4Da','CMv0AxjLx2y','ioAIR+MyNW','CM9Szq','CM90','i0yYnJuYmG','rvzftLrt','BgvHz3vLt2y','DgvHBu5HBwu','x2zVCMnLuMu',
'C3vTBwfYEq','5lIl5y2k5zY655cd5BYa5AEl5lUo5l2G','y29Uy2f0','C29YDa','CM9SzufKANu','uK9mrvm','5lUw55Yl5zci5zcm5Q+u5l2G55Yl5OIy',
'yMfUtgvMDa','6zIF5yAf5zYW5l2n4OAr','DgfSzw50','5lMi6lII5RkH5PYj5lIT6zE05zYW5BIM','CgvUzgLUzW','Bwf4uMvW','yMLNuq','B3bLCNr5',
'55cd5yAn6k+044cc','6jcL5yw75BIi','yMLNu3rHz2u','zMfTzq','BMf0r29HBhm','zMvL','Ag9Sza','56Io5yQH5B6l5BIi','BNv0CML0Aw8','5l2G5lUS5zYO5y2k5zY65yMn5OMZ5zUE',
'55Yl5y+W5lIk5ywO5PIV5lQ677Ym6lEV','5zUB5ywS5PAK44cc','6Ake6ycj6lwB5yE65Bga','C3rHzMzgzwu','AM9PBG','y24TAMK','ios4QUI1M+wTOW',
'CMfUAW','DgvZDa','x2XVyw5cywm','y3vW','y29TCa','AgvI','yxDHCMrZ','5l+D57QN6zIF','CMvZzxq','5Bcp5BMf5O+q6AUy6lwI6z2I77Ym5lIQ',
'y2fYzwvY','5ywZ57o7kW','57Ui5zY65zoO5zon44cc','Bw92zq','ChvZAa','6kkR5y+n6lAf','A2v5','5QkM5yIW6l+z5lIa5yI744cc','yMLNBwf0y2G',
'6z2s6k6T5OQv5ywL5AsN77Ym5A626yEm','zhjVCa','6kgW5yEp5Ps+57Yt5lIK5OIq','5PwW5O2U5yIg5P6q5BIi','zw5KAw5N','z3jVDxa','5PYV5P2/5B+R44cc',
'5lIT5zU96zIF','zMLUywW','y3nSBxzW','6i+C5lIn5Aw95zcd77Ym5l2G6l275lQg','DhjVCgHPzxm','5lYK55Ef5Bcr5lIj5OIq','zM9Yy2vbyNi',
'6zI/5Qc55BU3','Bg9UzW','C2vHC29Uv2e','C2TPCa','Ew91DgHuzwe','rvzFuK9mta','5OYO552a5lQS5RsL77Ym5Aw96iUx5A2q','CgvYAw9K','77Ym54k555cdia',
'5OoZ5yE65y6755Yl55Yl55Qe5B+15As0','Aw5by2fKzw0','y3nS','5OMt6l+B5lIa5lIQ44cc5l2G5lUS6jc9','6zIF5yAf5zYW5l2n4OAt','5zcn5RcukW',
'zMXHz3m','zxbS','ywnHzgvTEq','5l2t6io95Pwz57Ud','y24TEgLHBMC','Bw9Kzq','x2zVCMnLtgu','EwLUEwfUzW','6ykJ56En6lwI5Rov77Ym6iw/5PIV6l2V',
'su5kvvjjrvm','mMzQzfjmrG','5lUa5lMi6yo956A75B6x6l+r77Ym5yYf','C2nVDxq','5As055Yl552a5l2G44cc'];
_sim_0a=function(){return eC;
};
return _sim_0a();
}