// ---- part:19 | 青训 · §12 + 赛季结算主循环（bk/bl/bm） ----



/* ── §12 青训 送出国学费（choose 选国外青训时扣费，须在顶层作用域）── */




function _youthFee(rep){
var _base=[12,20,35,55,80,100];
return _base[rep]||_base[0x1];
}
/* 潜力(天赋)在“选青训营”这一步就掷定：青训营档次看潜力，而天赋原本要等入营才掷。
   掷过即钉住(flags._pot)，入营时不再重掷，保证“看到的档次”与“实际天赋”一致。 */
function _rollPot(){if(a2["flags"]["_pot"])return;a2["flags"]["_pot"]=!0x0;
a2["talent"]=0.7+0.78*Math["pow"](ad(),1.7)+(a2["legacy"]?a2["legacy"]["talent"]:0x0)+(a2["legend"]?a2["legend"]['t']:0x0);}
function bk(){
if(a2["_trialQueued"]){var _tq=a2["_trialQueued"];a2["_trialQueued"]=null;return void(a2["pending"]={'type':"random",'eventId':"__trial__",'offers':_tq["offers"]});}
if(a2["step"]++,"youth"===a2["phase"])return a2["youthTea"+"mId"]?bj():(function(){_rollPot();var bF=a0["TEAMS"]["filter"](function(bR){return aq(bR)['cn'];
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
nTv=Math["max"](0,Math["min"](1,(a2["talent"]-0.7)/0.78)),nOv=(a2["ovr"]-40)/30,
QQ=nTv,/* 青训营档次按“潜力(天赋)”定，而非 12 岁时的当前能力 */
loR=QQ<0.40?1:(QQ<0.68?2:3),bI=[],bJ={};
function pU(bR){return bR&&!bJ[bR['id']]?(bJ[bR['id']]=0x1,bI.push(bR),!0x0):!0x1}




/* ── §12 青训 ──────────────────────────────────────────────────── */




function pickBand(pool,n){for(var w=0;w<3&&n>0;w++){
var cand=pool["filter"](function(bR){return !bJ[bR['id']]&&bR["rep"]>=loR-w&&bR["rep"]<=loR+2+w});
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
/* C: 高潜力(天赋)球员保底一支国外豪门(rep>=4)青训营——现实里豪门会提前来挖天才，学费由对方兜底 */
if(QQ>=0.68){var _hasElite=!0x1;for(var _ez=0x0;_ez<bI["length"];_ez++)if(bI[_ez]["rep"]>=4){_hasElite=!0x0;break;}
if(!_hasElite){var _el=bH["filter"](function(bR){return bR["rep"]>=4;});if(_el["length"])pU(_el[Math["floor"](ad()*_el["length"])]);}}
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
}if(a2["flags"]["_contractDue"]){a2["flags"]["_contractDue"]=!0x1;return void _openRenewal();}var by=a2["flags"]["_forceLe"+"ave"],bz=a2["lowSpell"]>=("long"===a2["mode"]?0x3:0x2),bA=a2["contract"+"Left"]<=0x0;
if(by||bz||bA){if(a2["loanFrom"]){var bB=aj(a2["loanFrom"]);
return bB&&(a2["teamId"]=bB['id'],



a2["seasonsA"+"tClub"]=0x0,a2["roleAdju"+'st']=0x0,a2["lowSpell"]=0x0,a2["stagnate"]=!0x1,
a2["flags"]["_loanBac"+'k']=bB['id']),



a2["loanFrom"]=null,a2["flags"]["_forceLe"+"ave"]=!0x1,bo(!0x1,!0x1);
}return a2["flags"]["_forceLe"+"ave"]=!0x1,bo(bz&&!by,



by);
}if(a2["age"]>=0x14&&a2["life"]&&!a2["life"]["partner"]&&!a2["flags"]["_loveSta"+'rt']&&(a2["flags"]["_loveSta"+'rt']=!0x0,




b1("love_fir"+'st'))){}_drainScheduled();(a2["teamId"]&&(a2["capDone"]||[]).indexOf(a2["teamId"])<0x0&&a2["seasonsA"+"tClub"]>=0x2&&a0["ROLES"][a2["role"]]["rank"]>=0x4&&a2["ovr"]>=0x32+0x4*((ar()||{})["rep"]||0x0)&&"prime"===aB(a2["age"]))&&(a2["forceQ"]||(a2["forceQ"]=[]),




"gk"===al(a2["pos"])["group"]?a2["forceQ"].indexOf("gk_captain")<0x0&&a2["forceQ"].push("gk_captain"):a2["forceQ"].indexOf("captain")<0x0&&a2["forceQ"].push("captain")),




a2["caps"]>=0x19&&a2["ovr"]>=0x48&&!a2["usedEven"+"ts"]["nat_captain"]&&!a2["flags"]["_ntCaptain"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("nat_captain")<0x0&&a2["forceQ"].push("nat_captain")),a2["age"]>=0x22&&a2["age"]<=0x24&&!a2["usedEven"+"ts"]["vet_wall"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("vet_wall")<0x0&&a2["forceQ"].push("vet_wall")),a2["seasonsAtClub"]>=0x5&&a2["seasonsAtClub"]<0x8&&!a2["usedEven"+"ts"]["club_5y"+"rs"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("club_5y"+"rs")<0x0&&a2["forceQ"].push("club_5y"+"rs")),a2["seasonsAtClub"]>=0xa&&a2["youthTeamId"]===a2["teamId"]&&!a2["usedEven"+"ts"]["club_10"+"yrs"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("club_10"+"yrs")<0x0&&a2["forceQ"].push("club_10"+"yrs")),a2["seasonsAtClub"]>=0xa&&a2["youthTeamId"]!==a2["teamId"]&&!a2["usedEven"+"ts"]["club_10yrs"+"_way"]&&(a2["forceQ"]||(a2["forceQ"]=[]),




a2["forceQ"].indexOf("club_10yrs"+"_way")<0x0&&a2["forceQ"].push("club_10yrs"+"_way")),a2["number"]===0xa&&a0["ROLES"][a2["role"]]["rank"]<=0x2&&!a2["usedEven"+"ts"]["num_demote"]&&(a2["forceQ"]||(a2["forceQ"]=[]),a2["forceQ"].indexOf("num_demote")<0x0&&a2["forceQ"].push("num_demote"));
/* 十号后续：交过十号、又打回绝对核心 → 同队/换队两种差分事件，换回十号 */
(a2["flags"]["_numDone"]&&a0["ROLES"][a2["role"]]["rank"]>=0x4&&a2["number"]!==0xa)&&(function(){var _id=(a2["flags"]["_numLostClub"]&&a2["teamId"]===a2["flags"]["_numLostClub"])?"num_back_same":"num_back_other";var _d=_evById(_id);_d&&(!_d["when"]||_d["when"](aA()))&&b1(_id);})();
/* 类型签名事件：职业期保证一生至少露一次（类型变了自动改推新类型的签名事件，已触发过的不再入队） */
("prime"===aB(a2["age"])&&a2["playerType"]>=0x0&&a2["playerType"]<=0xa)&&(function(){var _ts=_TYPE_SIG[a2["playerType"]],_td=_ts&&_evById(_ts);_td&&(!_td["when"]||_td["when"](aA()))&&b1(_ts);})();
/* 成长差分（职业）：青年涨球/停滞、老将不退反涨 → 强制事件 */
(function(){if("career"!==a2["phase"])return;var _d=a2["flags"]["_ovrD"]||0x0,_a=a2["age"];if(_a>=0x21){if(_d>=0x0)b1p("vet_up");}else if(_a>=0x10&&_a<=0x18){if(_d>=0x6)b1p("young_surge");else if(_d<=0x0&&a2["ovr"]<0x5a)b1p("young_stall");}})();
/* 长期异地：连续留洋 ≥3 年且还没把伴侣接过来 → 强制触发"时差"抉择（避免满意度每季 −2 无限下滑）。
   若拖到 ≥6 年仍未解决，强制触发"最后通牒"，只能接她过来或分开。 */
(a2["life"]&&a2["life"]["partner"]&&!(a2["flags"]&&a2["flags"]["_together"])&&a2["seasonsA"+"broad"]>=0x3&&!a2["usedEven"+'ts']["love_lon"+"gdistanc"+'e'])&&(a2["forceQ"]||(a2["forceQ"]=[]),a2["forceQ"]["indexOf"]("love_lon"+"gdistanc"+'e')<0x0&&a2["forceQ"]["push"]("love_lon"+"gdistanc"+'e'));
(a2["life"]&&a2["life"]["partner"]&&!(a2["flags"]&&a2["flags"]["_together"])&&a2["seasonsA"+"broad"]>=0x6&&!a2["usedEven"+'ts']["love_ultim"+"atum"])&&(a2["forceQ"]||(a2["forceQ"]=[]),a2["forceQ"]["indexOf"]("love_ultim"+"atum")<0x0&&a2["forceQ"]["push"]("love_ultim"+"atum"));
if(a2["flags"]["_staffCd"]>0x0)a2["flags"]["_staffCd"]--;
/* 槽1：随机事件
   保底：连续 2 个决策周期没有任何事件时，无视概率强制抽一个，避免硬核/老年期连年空白 */
var _rollHit=ad()<a3[a2["mode"]]["eventCha"+"nce"];
var bE=(_rollHit||(a2["flags"]["_dry"]||0x0)>=0x2)?aE():null;
if(bE){_markEvent(bE['id'],bE);a2["flags"]["_dry"]=0x0;
a2["pending"]={'type':"random",'eventId':bE['id'],'descText':_descOf(bE)};
return;}
/* 槽1未命中随机：强制事件补位（每季上限 2：{随机,随机} 或 {随机,强制}） */
if(_fireForced()){a2["flags"]["_dry"]=0x0;return;}
if(_fireMilestone()){a2["flags"]["_dry"]=0x0;return;}
a2["flags"]["_dry"]=(a2["flags"]["_dry"]||0x0)+0x1;
return bl();
}function bl(){
a2["flags"]["_double"]=!0x1;
/* 旧版随机德比已移除：德比/保级大战改由 _bigHooks 在赛季结算时从真实赛程抽取 */
if(a2["_mileRepPending"]){var _mp=a2["_mileRepPending"];a2["_mileRepPending"]=null;return void _emitReportOrMilestone(_mp);}
var bx=b6();
if(bx)_emitReportOrMilestone(bx);
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
}