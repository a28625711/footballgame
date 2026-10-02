// ---- part:17 | 赛季主流程（b2/b3/b4/b5）+ 奖项门槛 + 颁奖 ----

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
bF>0x0&&(bG*=Math["max"](0.16,(0x64-a2["ovr"])/0x32)*_capWall(a2["talent"],a2["ovr"])),



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
bz["leaguePts"]=_lgRow?_lgRow["pts"]:0;if(_lgRow&&_lgRow["gf"]>0x0){var _roleG=a0["ROLES"][a2["role"]]["rank"];var _gCap=_roleG>=0x3?0.7:_roleG>=0x2?0.55:0.4;var _aCap=_roleG>=0x3?0.55:_roleG>=0x2?0.45:0.35;var _maxLG=Math["round"](_lgRow["gf"]*_gCap);if(bz["lgGoals"]>_maxLG)bz["lgGoals"]=_maxLG;var _maxLA=Math["round"](_lgRow["gf"]*_aCap);if(bz["lgAssists"]>_maxLA)bz["lgAssists"]=_maxLA;if(bz["lgGoals"]+bz["lgAssists"]>_lgRow["gf"]){var _ovL=bz["lgGoals"]+bz["lgAssists"]-_lgRow["gf"];bz["lgGoals"]=Math["max"](0,bz["lgGoals"]-_ovL);}var _maxG=Math["round"](_lgRow["gf"]*_gCap*1.6);var _maxA=Math["round"](_lgRow["gf"]*_aCap*1.6);var _g0=bz["goals"],_a0=bz["assists"];if(bz["goals"]>_maxG)bz["goals"]=_maxG;if(bz["assists"]>_maxA)bz["assists"]=_maxA;a2["totals"]["goals"]+=bz["goals"]-_g0;a2["totals"]["assists"]+=bz["assists"]-_a0;}
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



0x14,0x63),bz["note"]=bU["name"],bz["injury"]=bU["ovr"];if(bU["ovr"]<=-6&&a2["playerType"]!==0xb){a2["flags"]["_severeInjury"]=1;a2["flags"]["_severeInjName"]=bU["name"];}
}a2["natForm"]=a2["natForm"]||{};
a2["natForm"]["wc"]=Math["max"](0x0,



(a2["natForm"]["wc"]||0x0)-0x1);
a2["natForm"]["asia"]=Math["max"](0x0,(a2["natForm"]["asia"]||0x0)-0x1);
var natFm=a2["natForm"]||{},



natB=Math["max"](natFm["wc"]>=0x4?0.2:natFm["wc"]>=0x3?0.15:natFm["wc"]>=0x2?0.1:natFm["wc"]>=0x1?0.05:0x0,natFm["asia"]>=0x3?0.15:natFm["asia"]>=0x2?0.1:natFm["asia"]>=0x1?0.05:0x0),



bW=0x48-0.12*(a2["guanxi"]-0x32),bX=!0x1;
if(!a2["banned"]&&a2["age"]>=0x12&&bx&&by){var bY=ac((a2["ovr"]-bW)/0xa,0x0,0x1),



bZ=a0["ROLES"][a2["role"]]["rank"],c0=ac(bY*(bZ>=0x3?0x1:bZ>=0x2?0.85:0.6)*(by["rep"]>=0x4?1.1:by['cn']?0x1:by["rep"]>=0x2?0.92:0.7)*(a2["age"]>=0x1e?0.9:0x1)*(a2["achBonus"]&&a2["achBonus"]["natCall"]||0x1)*(0x1+natB),



0x0,0x1),fl=ac((a2["ovr"]-0x52)/0x8,0x0,0x1);if(c0<fl)c0=fl;
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



_ntStage=_natTourn["stage"];a2["tournaments"]["push"](_natTourn);if(_natTourn["phase"]==="group"){var _gb=_aVPri("wc",0.62,{"comp":_natTourn["comp"],"opp":_natTourn["_opp"],"oppStr":_natTourn["_oppStr"],"age":_natTourn["age"],"_grpWC":!0x0,"_drawOk":!0x0,"_ctx":"世界杯小组赛生死战","_aiCtx":{"t":"nat","comp":_natTourn["comp"],"stage":"小组赛"}});if(_gb){a2["_natWC"]=_natTourn;}else{_natTourn=_natResolveComp("wc",_natTourn["_team"],_natTourn);_ntStage=_natTourn["stage"];a2["natForm"]["wc"]=_natFormVal(_ntStage,"wc");_natAfterKO(bz,_natTourn,_ntStage);}}else{a2["natForm"][_natTourn["comp"]==="\u4e16\u754c\u676f"?"wc":"asia"]=_natFormVal(_ntStage,_natTourn["comp"]==="\u4e16\u754c\u676f"?"wc":"asia");if(_ntStage==="\u5c0f\u7ec4\u8d5b\u51fa\u5c40"){aZ(bz,_natTourn["comp"],"\u5c0f\u7ec4\u8d5b\u51fa\u5c40");}else{var _tBM=false;if(_ntStage==="\u51a0\u519b"||_ntStage==="\u4e9a\u519b"){_tBM=_aVPri(_natTourn["comp"]==="\u4e16\u754c\u676f"?"wc":"asia",0.55,{"comp":_natTourn["comp"],"opp":_finalOpp(_natTourn["rounds"],"\u4e2d\u56fd\u961f"),"_aiCtx":{"t":"nat","comp":_natTourn["comp"],"stage":_ntStage}});}if(_tBM){a2[_natTourn["comp"]==="\u4e16\u754c\u676f"?"_natWC":"_natAsia"]=_natTourn;}else aZ(bz,_natTourn["comp"],_ntStage);}}}
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
a2["flags"]["_ovrD"]=bz["ovrEnd"]-Math["round"](bz["ovr"]||0x0),a2["flags"]["_ovrPh"]="p",a2["flags"]["_ovrA"]=bz["age"],
bz["wage"]=(a2["_offerTerms"]&&a2["_offerTerms"][a2["teamId"]])?a2["_offerTerms"][a2["teamId"]]["wage"]:null,
bz["cLeft"]=a2["contractLeft"]||0x0,
bz["awardN"]=(a2["awards"]||[]).filter(function(x){return x["age"]===bz["age"];})["map"](function(x){return x["name"];}),
a2["seasons"]["push"](bz),

_newsTick(0x0),

a2["age"]++,a2["_dispAge"]=bz["age"],


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
}(a0["AWARDS"]["ballon"])||ad()<0.35)&&b5(a0["AWARDS"]["ballon"],age0),bz["apps"]>=0x13&&bz["ovr"]>=0x54&&ad()<0.35&&b5(a0["AWARDS"]["afcpoy"],age0),bz["apps"]>=0x13&&bz["lgGoals"]>=_leagueTopTarget(by['id'],age0)&&b5(by["name"]+"金靴",age0),by["rep"]>=0x4&&bz["apps"]>=0x13&&bz["ovr"]>=0x55&&bz["lgGoals"]>=_euroTopTarget(age0)&&b5(a0["AWARDS"]["boot"],age0),bz["apps"]>=0x1e&&a0["ROLES"][bz["role"]]["rank"]>=0x3&&bz["ovr"]>=0x4a&&ad()<0.35&&b5(by["name"]+"最佳球员",age0),bz["apps"]>=0x13&&by["rep"]>=0x3&&'gk'===c7&&bz["ovr"]>=0x55&&ad()<0.45&&b5(a0["AWARDS"]["glove"],age0);
}else{var c8=(0.06+0.24*aL())*('gk'===c7?0.25:0x1),c9t=0,c9i;
for(c9i=0;c9i<a2["trophies"]["length"];c9i++)if(a2["trophies"][c9i]["age"]===age0)c9t++;
if(c9t>0){bz["apps"]>=0x13&&bz["lgGoals"]>=_leagueTopTarget(by['id'],age0)&&b5(by["name"]+"金靴",age0),by["rep"]>=0x4&&bz["apps"]>=0x13&&bz["lgGoals"]>=_euroTopTarget(age0)&&(function(c9){var has=!0x1;
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