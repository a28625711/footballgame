// ---- part:20 | 转会与续约（报价条款/续约窗/bo..bw） ----
/* 转会报价条款（bo 内 bO 的全局版：经纪人重roll电话时复用） */
function _trTerms(bG){var bH=aJ(bG,

aq(bG),
a2["ovr"]),bI=be(bG),bJ=0.9+0.2*ad(),bK=0x1;
bK=bI<=0x1?1.3:0x2===bI?1.15:0x3===bI?0x1:0x4===bI?0.9:0.82;
return a2["_offerTerms"][bG['id']]={'wage':_wageOf(bG,aq(bG),bJ*bK),



'years':bI,'mult':bJ*bK};
}/* 纯续约窗：只列当前队的续约条款，玩家可"续约"或"暂不续约"（不开其他队报价） */
function _openRenewal(){
a2["_offerTerms"]={};
var _me=ar();if(!_me)return;
var _mod=a2["flags"]["_contractMod"];a2["flags"]["_contractMod"]=null;
var _y=ac(be(_me),0x2,0x5),_m=0.9+0.2*ad(),_w=null;
/* 事件可指定续约待遇：数字 / {wage,years}，wage=相对市场基数的系数。默认年薪不低于现合同 */
if("number"===typeof _mod&&isFinite(_mod))_w=_mod;
else if(_mod&&"object"===typeof _mod){if(_mod["wage"]!=null)_w=_mod["wage"];if(_mod["years"]!=null)_y=ac(_mod["years"],0x2,0x5);}
var _base;
if(_w!=null)_base=_m*Math["max"](0.05,_w);
else{var _k=_y<=0x1?1.3:0x2===_y?1.15:0x3===_y?0x1:0x4===_y?0.9:0.82;_base=Math["max"](_m*_k,a2["wageMul"+'t']||0x1);}
a2["_offerTerms"][_me['id']]={'wage':_wageOf(_me,aq(_me),_base),'years':_y,'mult':_base};
a2["pending"]={'type':"transfer",'fired':!0x1,'mustLeave':!0x1,'renewOnly':!0x0,'canDecline':!0x0,'offers':[],'rerolls':0x0,'loans':[],'backFrom':null,'canStay':!0x0,'canRetire':a2["age"]>=0x1e};
}
function bo(bx,by){
a2["_offerTerms"]={};
function bO(bG){var bH=aJ(bG,


aq(bG),
a2["ovr"]),bI=be(bG),bJ=0.9+0.2*ad(),bK=0x1;
bK=bI<=0x1?1.3:0x2===bI?1.15:0x3===bI?0x1:0x4===bI?0.9:0.82;
return a2["_offerTerms"][bG['id']]={'wage':_wageOf(bG,aq(bG),bJ*bK),



'years':bI,'mult':bJ*bK};
}if(0x0){var bz=ax(),bA=a0["TEAMS"]["filter"](function(bG){var bH=aq(bG);
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
}var bC=bf(0x4+(a6("analyst")?(_stT("analyst")===1?1:2):0),null),



bD=ar();
/* 老将回归邀请：合同到期后的本次转会窗，受邀球队必出现在报价里（用过即清） */
var _vetInv=null;
(function(){var _iv=a2["flags"]&&a2["flags"]["_vetInviteTeam"];
if(!_iv)return;
a2["flags"]["_vetInviteTeam"]=null;
if(bD&&_iv===bD['id'])return;
var _t=aj(_iv);if(!_t)return;
var _tl=aq(_t);
/* 锁洋：海外邀请在 lockAbroad 期间不出现（除非被强制离队） */
if(_tl&&!_tl['cn']&&!by&&a2["lockAbro"+'ad']>0x0)return;
/* 跨区邀请只在普通转会窗出现：强制续约/强制离队(by)时不得借回归邀请跨区
   （人在海外被强制续约不能借此回国；人在国内被强制离队也不能借此留洋） */
if(_tl&&by&&bD&&_tl['cn']!==aq(bD)['cn'])return;
for(var _i=0x0;_i<bC["length"];_i++)if(bC[_i]['id']===_iv){_vetInv=_iv;return;}
bC["unshift"](_t);_vetInv=_iv;})();
bD&&(bO(bD),(function(){var _t=a2["_offerTerms"][bD['id']],_wm=a2["wageMul"+"t"]||0x1;if(_t&&_t["mult"]<_wm){_t["mult"]=_wm;_t["wage"]=_wageOf(bD,aq(bD),_wm);}})()),bC["forEach"](bO);
/* 受邀回归：给一份更长的合同（在正常年限上+2，至少3年、封顶5年） */
if(_vetInv&&a2["_offerTerms"]&&a2["_offerTerms"][_vetInv])a2["_offerTerms"][_vetInv]["years"]=Math["min"](0x5,Math["max"](0x3,a2["_offerTerms"][_vetInv]["years"]+0x2));
/* 高薪联赛邀约：在正常条款上再抬 35% 工资（多给钱是这些联赛挖人的核心手段） */
if(_vetInv&&a2["_offerTerms"]&&a2["_offerTerms"][_vetInv]){var _vc=aj(_vetInv),_vL=_vc?aq(_vc):null;if(_vL&&_lgPay[_vL['id']]){var _w2=a2["_offerTerms"][_vetInv];_w2["mult"]=Math["round"](_w2["mult"]*1.35*0x64)/0x64;_w2["wage"]=_wageOf(_vc,_vL,_w2["mult"]);}}
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
}()),
/* ── 结局图鉴补充字段（世界杯进球/队长/忠诚/家庭/年龄造假/退役方式/末年出场/青训负债） ── */
'cupTrophies':(function(){return 0x0;})(),
'wcGoals':a2["natStats"]&&a2["natStats"]["wcGoals"]||(a2["flags"]&&a2["flags"]["_wcGoals"])||0x0,
'natCaptain':!!(a2["flags"]&&a2["flags"]["_natCaptain"]),
'familySame':!!(a2["life"]&&a2["life"]["married"]&&!a2["life"]["splits"]),
'ageFraud':!!(a2["flags"]&&a2["flags"]["_ageFraud"]),
'noName':String(a2["endReaso"+'n']||'')==="无人问津",
'lastApps':(function(){var _s=a2["seasons"]||[];return _s["length"]?_s[_s["length"]-0x1]["apps"]||0x0:0x0;})(),
'youthDebt':!!(a2["flags"]&&a2["flags"]["_debt"]),
'loyalLong':!!(bI&&bI["seasons"]>=0xa&&bI["apps"]>=0x190&&a2["age"]>=0x21&&bK>=0x3),
'sameYearTriple':(function(){
var _wc={},_ucl={},_bal={};
(a2["trophies"]||[]).forEach(function(t){var n=t["name"]||"",_a=t["age"];if(_a==null)return;
if(/世界杯冠军/.test(n))_wc[_a]=0x1;if(/欧冠冠军/.test(n))_ucl[_a]=0x1;});
(a2["awards"]||[]).forEach(function(w){if(w["name"]===a0["AWARDS"]["ballon"]&&w["age"]!=null)_bal[w["age"]]=0x1;});
for(var _y in _wc)if(_ucl[_y]&&_bal[_y])return!0x0;
return!0x1;
}()),
/* 单赛季峰值（进球/助攻/出场/零封）：供"单赛季成就"结局使用 */
'seasonMaxGoals':(function(){var _m=0x0;(a2["seasons"]||[]).forEach(function(s){if((s["goals"]||0)>_m)_m=s["goals"];});return _m;})(),
'seasonMaxAssists':(function(){var _m=0x0;(a2["seasons"]||[]).forEach(function(s){if((s["assists"]||0)>_m)_m=s["assists"];});return _m;})(),
'seasonMaxCs':(function(){var _m=0x0;(a2["seasons"]||[]).forEach(function(s){if((s["cs"]||0)>_m)_m=s["cs"];});return _m;})()};
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
/* 同族阶梯（如单赛季30/40/50球）只记最高一条：避免一局同时点亮多档 */
(function(){var _grp={},_keep=[];
for(var _i=0x0;_i<bC["length"];_i++){var _id=bC[_i],_df=null;
for(var _j=0x0;_j<a0["ENDINGS"]["length"];_j++)if(a0["ENDINGS"][_j]['id']===_id){_df=a0["ENDINGS"][_j];break;}
var _g=_df&&_df["ego"]?(_df["ego"]):null;
if(!_g){_keep.push(_id);continue;}
if(_grp[_g]==null){_grp[_g]=_id;_keep.push(_id);}
else{var _cur=null,_new=null;
for(var _k=0x0;_k<a0["ENDINGS"]["length"];_k++){if(a0["ENDINGS"][_k]['id']===_grp[_g])_cur=a0["ENDINGS"][_k];if(a0["ENDINGS"][_k]['id']===_id)_new=a0["ENDINGS"][_k];}
if(_new&&_cur&&bA(_new)<bA(_cur)){for(var _t=0x0;_t<_keep["length"];_t++)if(_keep[_t]===_grp[_g]){_keep[_t]=_id;break;}_grp[_g]=_id;}}
}bC=_keep;}()),



a2["endingsA"+'ll']=bC;
}function bs(bx){var by=a2["pending"];
if(!by||("random"!==by["type"]&&"forced"!==by["type"])||by["result"])return!0x1;
for(var bz=null,



bA=0x0;
bA<a1["length"];
bA++)a1[bA]['id']===by["eventId"]&&(bz=a1[bA]);
if(!bz)bz=_pendingEvent();
if(!bz)return null;
var bB=_matOpts(bz)||[];bB=bB[Number(bx)];if(!bB)return!0x1;
var bR4=function(bG2){a2["eventLog"]&&a2["eventLog"]["push"]({'age':(by&&by["age"]!=null?by["age"]:a2["age"]),'title':bG2&&bG2["title"]||"事件",'text':bG2&&bG2["text"]||''});};
bv(bx);
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
_chainAdvance(a2["pending"]["eventId"]),



a2["pending"]["result"]):null;
}