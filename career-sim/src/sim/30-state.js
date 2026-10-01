// ---- part:05 | 遗产与状态 · §3（快照 aA / 随机事件 aE / 伴侣 / 提交 aF） ----





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
'kids':a2["life"]&&a2["life"]["kids"]["length"]||0x0,'seasonsAtClub':a2["seasonsA"+"tClub"],'seasonsAbroad':a2["seasonsA"+"broad"],'contractLeft':a2["contract"+"Left"],'contractFinal':(a2["contract"+"Left"]||0x0)<=0x1,
'clubRep':bx?bx["rep"]:0x0,'leagueId':by?by['id']:null,'country':by?by["country"]:null,'leagueRep':by?by["rep"]:0x0,'hasCont':!(!by||!by["cont"]),
'rivalId':aC()&&aC()['id'],'teamId':a2["teamId"],'isCaptain':a2["flags"]["_captain"]===a2["teamId"],'capDone':a2["capDone"]||[],
'foot':a2["foot"],'number':a2["number"],'youthTeamId':a2["youthTea"+"mId"]||'','clubsCount':(a2["clubsPla"+"yed"]||[])["length"],'posMoves':_posMoves(a2["pos"]),'posBackMoves':_posMoves(a2["pos"],!0x0),
'partnerType':a2["life"]&&a2["life"]["partner"]?a2["life"]["partner"]["type"]:null,'bond':a2["life"]&&a2["life"]["partner"]?(a2["life"]["partner"]["bond"]||0x0):0x0,'agentType':a2["agentType"]||null};
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
if(bG['id']&&a2["forceQ"]&&a2["forceQ"]["indexOf"](bG['id'])>=0x0)return!0x1;
if(bG['id']&&_chainFollower[bG['id']])return!0x1;if(bG['id']&&/^mile_/["test"](bG['id']))return!0x1;   /* 里程碑只走 _mileQ/_fireMilestone，不进随机池 */
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
});if(bG)_matOpts(bG);return bG;})():null;
}
/* 伴侣人设(type) 与满意度(bond)：潜藏属性。
   type 由事件显式给出，或按 label 兜底归类；bond 0..100，随赛季漂移、随事件增减。 */
var _ptMap={'青梅竹马':'sweetheart','初恋·同校女生':'firstlove','初恋·语言课同桌':'firstlove','重逢的初恋':'firstlove',
'队里的康复师':'physio','那位牙医':'medic','那位护士':'medic','屏幕那头的人':'streamer','那个客场球迷':'ultra',
'那位跟队记者':'reporter','队友的妹妹':'sister','那个游戏搭子':'gamer','那位主播':'streamer'};
var _ptBase={'sweetheart':66,'firstlove':66,'physio':62,'medic':62,'sister':58,'ultra':58,'reporter':56,'gamer':54,'streamer':52};
function _ptype(label,type){return type||_ptMap[label]||'other';}
function _pbond(label,type){var t=_ptype(label,type);return _ptBase[t]!=null?_ptBase[t]:56;}
/* 每季满意度漂移：正常 +1；留洋/异地 −2；本季有 _neglect 标记再 −3（用过即清） */
function _bondDrift(){
  var b=0x1;
  if(!au()&&!(a2["flags"]&&a2["flags"]["_together"]))b-=0x2;
  if(a2["flags"]&&a2["flags"]["_neglect"])b-=0x3;
  a2["flags"]&&(a2["flags"]["_neglect"]=!0x1);
  return b;
}
function aF(bx){var by=[];
function bz(bI,bJ,bK){
if(bJ){var bL=bJ>0x0,bM=(!0x1===bK?!bL:bL)?'up':"down";
by["push"]({'cls':bM,'text':bI+(bL?'+':'')+bJ});
}}if(bx["ovr"]){var bA;
if(bx["ovr"]<0x0)bA=bx["ovr"];
else{var bB=Math["min"](bx["ovr"],Math["max"](0x0,a2["maxOvr"]-a2["ovr"]));
/* 事件 ovr 加成同样受天赋天花板约束（同一套平滑衰减，见 _capWall） */
bA=bB+(bx["ovr"]-bB)*_capWall(a2["talent"],a2["ovr"]);
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
bx["partner"]&&(a2["life"]["partner"]={'label':bx["partner"],'type':_ptype(bx["partner"],bx["partnerType"]),'bond':_pbond(bx["partner"],bx["partnerType"]),'since':a2["age"]},by["push"]({'cls':'up','text':"在一起了"})),bx["marry"]&&a2["life"]["partner"]&&(a2["life"]["married"]=a2["age"],by["push"]({'cls':'up','text':'结婚'}),b1("love_kid"+"_first")),
bx["kid"]&&(a2["life"]["kids"]["push"]({'born':a2["age"]}),by["push"]({'cls':'up','text':0x1===a2["life"]["kids"]["length"]?"当爸爸了":"又一个孩子"})),
bx["split"]&&a2["life"]["partner"]&&(a2["life"]["partner"]=null,a2["life"]["married"]=0x0,a2["life"]["splits"]++,by["push"]({'cls':"down",'text':"分开了"}))),
bx["bond"]&&a2["life"]&&a2["life"]["partner"]&&(a2["life"]["partner"]["bond"]=ac((a2["life"]["partner"]["bond"]||0x0)+bx["bond"],0x0,0x64),by["push"]({'cls':bx["bond"]>0x0?'up':"down",'text':bx["bond"]>0x0?"关系升温":"闹别扭"})),bx["agentType"]&&(a2["agentType"]=bx["agentType"]),
bx["roleDelt"+'a']&&(a2["roleAdju"+'st']=Math["max"](-0x4,Math["min"](0x4,a2["roleAdju"+'st']+bx["roleDelt"+'a'])),by["push"]({'cls':bx["roleDelt"+'a']>0x0?'up':"down",'text':bx["roleDelt"+'a']>0x0?"队内地位↑":"队内地位↓"})),
bx["pos"]&&bx["pos"]!==a2["pos"]&&_posMoveOk(a2["pos"],bx["pos"])&&(a2["flags"]["_posOrigin"]||(a2["flags"]["_posOrigin"]=al(a2["pos"])["group"]),a2["pos"]=bx["pos"],bx["playerType"]==null&&(a2["playerType"]=calcPlayerType()),by["push"]({'cls':'up','text':"位置→"+al(a2["pos"])["name"]})),
(bx["posAny"]||bx["posBack"])&&function(){var _ms=_posMoves(a2["pos"],bx["posBack"]?!0x0:!0x1),_t=_ms["length"]?_ms[Math["floor"](ad()*_ms["length"])]:null;_t&&(a2["flags"]["_posOrigin"]||(a2["flags"]["_posOrigin"]=al(a2["pos"])["group"]),a2["pos"]=_t,bx["playerType"]==null&&(a2["playerType"]=calcPlayerType()),by["push"]({'cls':'up','text':"位置→"+al(a2["pos"])["name"]}));}(),
bx["number"]&&(a2["number"]=Math["max"](0x1,Math["min"](0x63,Math["round"](bx["number"]))),by["push"]({'cls':'up','text':"改穿 "+a2["number"]+" 号"})),
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
bx["lockAbro"+'ad']!=null&&(a2["lockAbro"+'ad']=bx["lockAbro"+'ad']),bx["contract"]&&(bx["contract"]["years"]!=null&&(a2["contract"+"Left"]=bx["contract"]["years"]),bx["contract"]["wage"]!=null&&(a2["wageMul"+'t']=bx["contract"]["wage"]),bx["contract"]["lock"]!=null&&(a2["lockAbro"+'ad']=bx["contract"]["lock"]),a2["flags"]["_keepContract"]=!0x0,by["push"]({'cls':'up','text':"签下合同"})),bx["openContract"]&&(a2["flags"]["_contractDue"]=!0x0,a2["flags"]["_contractMod"]=!0x0===bx["openContract"]?null:bx["openContract"]),bx["retire"]&&(a2["flags"]["_forceRe"+"tire"]=!0x0),bx["transfer"+'To']&&b8(bx["transfer"+'To'],
!0x0),bx["returnHo"+'me']){var bG=af(a0["TEAMS"]["filter"](function(bI){
return aq(bI)['cn']&&bI["rep"]>=0x2;
}));
bG&&b8(bG['id'],!0x0);
}if(bx["goAbroad"]){var bH=bf(0x1,{'forceAbroad':!0x0})[0x0];
bH&&b8(bH['id'],!0x0);
}bx["_trialTo"]&&function(){var _tt=aj(bx["_trialTo"]);if(!_tt)return;
a2["youthTea"+"mId"]=_tt['id'],a2["teamId"]=_tt['id'];
if(!aq(_tt)['cn']){var _fee=_youthFee(_tt["rep"]);a2["money"]=ac(a2["money"]-_fee,-0x320,0x895440),a2["flags"]["youthAbro"+"ad"]=!0x0,by["push"]({'cls':'down','text':'-'+av(_fee)});}
}(),bx["captain"]&&(a2["flags"]["_captain"]=a2["teamId"],(a2["capDone"]||(a2["capDone"]=[]))["indexOf"](a2["teamId"])<0x0&&a2["capDone"]["push"](a2["teamId"])),




bx["capDecline"]&&((a2["capDone"]||(a2["capDone"]=[]))["indexOf"](a2["teamId"])<0x0&&a2["capDone"]["push"](a2["teamId"])),




bx["ntCaptain"]&&(a2["flags"]["_ntCaptain"]=!0x0);
return["ageFraud","yinyang","fixed","gambled","degree","coachCer"+'t',"academy","bianzhi","assistan"+'t',"scout","_friend","_fan","_mentor","_rival","_sponsor","_injuryChain","_vetInviteDone","_vetInviteTeam","_crush","_metStar","_footDone","_footPath","_bloom","_numDone","_numLostClub","_echoHome","_together"]["forEach"](function(bI){
bx[bI]&&(a2["flags"][bI]=bx[bI]);
}),



by;
}