// ---- part:22 | 公共 API · §14（window.SIM + 边界镜像） ----



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
out["rounds"]=_dec?_unpkFx(_dec):null;
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
if(bC["name"]==="郝海东"&&bC["number"]===9&&bC["foot"]==="right")cK={'id':"haodong",'o':3,'t':0.05,'i':1};
else if(bC["name"]==="范志毅"&&bC["number"]===5&&bC["foot"]==="right")cK={'id':"fanzy",'o':3,'t':0.05,'i':1};
else if(bC["name"]==="孙继海"&&bC["number"]===12&&bC["foot"]==="right")cK={'id':"sunjh",'o':2,'t':0.05,'i':1};
else if(bC["name"]==="郑智"&&bC["number"]===10&&bC["foot"]==="right")cK={'id':"zhengz",'o':2,'t':0.06,'i':1};
else if(bC["name"]==="武磊"&&bC["number"]===7&&bC["foot"]==="right")cK={'id':"wulei",'o':2,'t':0.06,'i':1};
else if(bC["number"]===10&&bC["pos"]==="ST"&&bC["foot"]==="right")cK={'id':"pele",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===10&&bC["pos"]==="CAM"&&bC["foot"]==="left")cK={'id':"maradona",'o':2,'t':0.14,'i':1};
else if(bC["number"]===10&&bC["pos"]==="RW"&&bC["foot"]==="left")cK={'id':"messi",'o':5,'t':0.05,'i':-1};
else if(bC["number"]===7&&bC["pos"]==="LW"&&bC["foot"]==="right")cK={'id':"cristiano",'o':5,'t':0.05,'i':-1};
else if(bC["number"]===14&&bC["pos"]==="CAM"&&bC["foot"]==="right")cK={'id':"cruyff",'o':2,'t':0.14,'i':1};
else if(bC["number"]===5&&bC["pos"]==="CB"&&bC["foot"]==="right")cK={'id':"beckenbauer",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===9&&bC["pos"]==="ST"&&bC["foot"]==="right")cK={'id':"ronaldo",'o':5,'t':0.1,'i':2};
else if(bC["number"]===21&&bC["pos"]==="CAM"&&bC["foot"]==="right")cK={'id':"zidane",'o':3,'t':0.08,'i':0};
else if(bC["number"]===1&&bC["pos"]==="GK"&&bC["foot"]==="right")cK={'id':"yashin",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===3&&bC["pos"]==="LB"&&bC["foot"]==="right")cK={'id':"maldini",'o':4,'t':0.05,'i':-1};
else if(bC["number"]===2&&bC["pos"]==="RB"&&bC["foot"]==="right")cK={'id':"cafu",'o':3,'t':0.06,'i':0};
else if(bC["number"]===7&&bC["pos"]==="ST"&&bC["foot"]==="right")cK={'id':"mbappe",'o':2,'t':0.02,'i':1};
else if(bC["number"]===10&&bC["pos"]==="CM"&&bC["foot"]==="right")cK={'id':"modric",'o':2,'t':0.03,'i':0};
else if(bC["number"]===11&&bC["pos"]==="ST"&&bC["foot"]==="right")cK={'id':"kane",'o':2,'t':0.02,'i':0};
else if(bC["number"]===11&&bC["pos"]==="RW"&&bC["foot"]==="left")cK={'id':"salah",'o':1,'t':0.01,'i':0};
else if(bC["number"]===22&&bC["pos"]==="CAM"&&bC["foot"]==="right")cK={'id':"bellingham",'o':1,'t':0.03,'i':1};
else if(bC["number"]===16&&bC["pos"]==="CDM"&&bC["foot"]==="right")cK={'id':"rodri",'o':1,'t':0.02,'i':0};
else if(bC["number"]===4&&bC["pos"]==="CB"&&bC["foot"]==="right")cK={'id':"vandijk",'o':1,'t':0,'i':-1};
else if(bC["number"]===17&&bC["pos"]==="CM"&&bC["foot"]==="right")cK={'id':"debruyne",'o':1,'t':0.01,'i':0};
return{'ver':0x6,'seed':bD,'rngState':ai(String(bD)),'mode':bB,'phase':"youth",'step':0x0,'name':bC["name"],'number':bC["number"],
'foot':bC["foot"],'pos':bC["pos"],'originId':bF['id'],'cheat':aw(bC),'legend':cK,'dreamId':bC["dreamId"]||null,'gen':bG?bG["gen"]:0x1,
'legacy':bG,'age':0xc,'ovr':ac(0x18+0.5*bF["ovr"]+(bG?0.5*bG["ovr"]:0x0),0x12,0x24)+(cK?cK['o']:0x0)+(bAch&&bAch['ovr']?bAch['ovr']:0x0),'maxOvr':0x0,'talent':0x1+(bAch&&bAch['talent']?bAch['talent']:0x0),
'guanxi':ac(0x1e+bF["guanxi"]+(bG?bG["guanxi"]:0x0),0x0,0x64),'clean':0x50,'fame':0x5,'money':bF["money"]+(bG?bG["money"]:0x0)+(bAch&&bAch['money']?bAch['money']:0x0),
'seasonWage':0x0,'wageMult':0x1,'peakAnnualWage':0x0,'careerEarnings':0x0,'teamId':null,'role':"sub",'roleAdjust':0x0,'seasonsAtClub':0x0,
'seasonsAbroad':0x0,'clubsPlayed':[],'contractLeft':0x0,'loanFrom':null,'lowSpell':0x0,'banLeft':0x0,'banGames':0x0,'banned':!0x1,
'lockAbroad':0x0,'pendingMult':null,'stagnate':!0x1,'youthTeamId':null,'youthLog':[],'youthCut':0x0,'caps':0x0,'natStats':{'goals':0x0,'assists':0x0,'cs':0x0},
'totals':{'apps':0x0,'goals':0x0,'assists':0x0,'cs':0x0,'ga':0x0},'seasons':[],'trophies':[],'awards':[],'natRuns':[],'tournaments':[],'cupRuns':[],'forceQ':[],'forceLater':[],
'life':{'partner':null,'married':0x0,'kids':[],'splits':0x0},'natForm':{'wc':0x0,'asia':0x0},'flags':{},'staff':{},'agentType':null,'pending':null,'_awardDue':!0x1,'_yCaps':{},'_yGoals':{},'usedEvents':{},'choices':[],'eventLog':[],'news':[],'newsLive':[],
'rid':null,'achBonus':bAch||null,'playerType':0xb};
}(bx,by,bz,bA,bAch),a2["playerType"]=calcPlayerType(),a2;
},



'nextStep':bk,'doPeriod':bl,'choose':function(bx){var by,bz,bA=a2["pending"];
if(!bA)return!0x1;
if("random"===bA["type"]||"forced"===bA["type"]){var bB=bs(bx);
if(null===bB)return bk(),!0x0;

return!!bB&&(bw(bB["res"]),!0x0);
}if("youth_pa"+'th'===bA["type"]){var bC=bA["offers"][Number(bx)];
return!!bC&&(bv(bx),a2["youthTea"+"mId"]=bC,a2["teamId"]=bC,aq(aj(bC))['cn']||(a2["money"]-=_youthFee(aj(bC)["rep"]),a2["flags"]["youthAbr"+"oad"]=!0x0),
a2["eventLog"]&&a2["eventLog"]["push"]({'age':a2["age"],'title':"加入青训营",'text':"进入"+((aj(bC)["academy"])||aj(bC)["name"])}),_rollPot(),
a2["playerType"]=calcPlayerType(),a2["pending"]=null,bk(),!0x0);
}if("academy"===bA["type"]){if("youth"===bx)return!!bA["canStayY"+"outh"]&&(bv(bx),a2["flags"]["_gradCd"]=0x2,a2["phase"]="youth",
a2["pending"]=null,bk(),!0x0);
var bD=bA["offers"][Number(bx)];
return!!bD&&(bv(bx),b8(bD,!0x0),a2["pending"]=null,bk(),!0x0);
}if("transfer"===bA["type"]){if("retire"===bx)return bv(bx),br("主动挂靴"),!0x0;if("decline"===bx)return bv(bx),a2["pending"]=null,bk(),!0x0;if("leave"===bx)return bv(bx),a2["flags"]["_forceLe"+"ave"]=!0x0,a2["pending"]=null,bk(),!0x0;
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
/* 决策真正生效：dp 累积进赢面份额，glory 累积提高个人进攻倾向（aY 里声明过但此前未接） */
bJ&&(bI["_dp"]=(bI["_dp"]||0x0)+(bJ["dp"]||0x0),bI["_glory"]=(bI["_glory"]||0x0)+(bJ["glory"]||0x0));
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
if(bx){if("report"===bx["type"]||("random"===bx["type"]||"forced"===bx["type"]||"bigmatch"===bx["type"])&&bx["result"]){if(("random"===bx["type"]||"forced"===bx["type"])&&bx["result"]){var _wF="forced"===bx["type"];a2["pending"]=null;
/* 槽2：随机之后优先强制事件（挤掉连环随机）；强制之后不再触发 */
if(!_wF&&a2["forceQ"]&&a2["forceQ"]["length"]&&_fireForced())return;
if(!_wF&&!a2["flags"]["_double"]&&ad()<0.35){var by=aE();
if(by){_markEvent(by['id'],by);a2["flags"]["_double"]=!0x0;a2["pending"]={'type':"random",'eventId':by['id'],'descText':_descOf(by)};return;}
}if(_fireMilestone())return;return "youth"===a2["phase"]?void(a2["bigQ"]&&a2["bigQ"]["length"]?aW():bk()):void bl();
}if("report"===bx["type"])return a2["pending"]=null,void(a2["bigQ"]&&a2["bigQ"]["length"]?aW():bk());




void(a2["bigQ"]&&a2["bigQ"]["length"]?aW():bk());
if("bigmatch"===bx["type"]&&bx["result"]){if(a2["pending"]=null,a2["bigQ"]&&a2["bigQ"]["length"])return void aW();if(a2["period"]){var bz=b7();
return void(bz&&_emitReportOrMilestone(bz));
}bk();
}else a2["pending"]=null,


void(a2["bigQ"]&&a2["bigQ"]["length"]?aW():bk());
}}else bk();
},'resolveEvent':bs,'commitEvent':bw,'goSummary':br,'endingContext':function(){return bq();},'tbSort':function(rows,fx,mode){rows.sort(_tbCmp(mode||'std',_h2hIdx(fx)));return rows;},'optHint':function(bx,by){var bz=(_matOpts(bx)||[])[by];
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
'trialSignup':_trialSignup,'pendingEvent':_pendingEvent,'evOpts':function(bx){return _matOpts(typeof bx==="string"?_evById(bx):bx);},
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



'wageAt':aJ,'annualWage':_wageOf,'newsTick':_newsTick,'newsLiveTick':_newsLiveTick,'leagueWeight':_lgW,'leagueWeights':_LGW,'academyName':function(bx){
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



'止步三十二强':"三十二强",'止步十六强':"十六强",'止步八强':'八强','止步四强':'四强','亚军':'亚军','冠军':'冠军'},
/* 测试/探针导出：世界引擎直驱与只读状态（不改变任何行为） */
'simWorld':function(bz,bx,by){return _runWorld(bz,bx,by);},
'promoReleg':function(bz,bx,by){return _promoReleg(bz,bx,by);},
'devOf':function(tid){return _tDev(tid);},
'teamAbs':function(tid){var t=aj(tid);return t?_teamStrRaw(t):null;},
'playerStr':function(base,ovr,rank){return _playerStr(base,ovr,rank);},
'clubBoost':function(base,ovr,rank){return _clubBoost(base,ovr,rank);},
'titleStreak':function(tid){return a2["titleStreak"]&&a2["titleStreak"][tid]||0;},
'eraOf':function(tid){return a2["teamEra"]&&a2["teamEra"][tid]||0;},
'formOf':function(tid){return a2["teamForm"]&&a2["teamForm"][tid]||0;},
'hangOf':function(tid){return a2["teamHang"]&&a2["teamHang"][tid]||0;},
'lgChampStreakOf':function(tid){return a2["lgChampStreak"]&&a2["lgChampStreak"][tid]||0;},
'lastTables':function(){return a2["lastTables"]||null;},'teams':function(){return a0["TEAMS"];},
'snapshot':function(){return aA();},
'roleOf':function(tid){var t=aj(tid);return t?aI(t):null;},
'bmPlayerProb':function(my,opp){return _bmPlayerProb({},my,opp);},
'cleanSettle':function(n){return _cleanSettle(n==null?0x1:n);}};
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
S["attach"]=function(bx){var r=fA(bx);if(a2){_rs=a2["rngState"]>>>0;_bmR=0x1;}return r;};
var fN=S["newState"];
S["newState"]=function(){var r=fN.apply(null,arguments);if(a2){_rs=a2["rngState"]>>>0;_bmR=0x1;}return r;};
}());
}()));




function _sim_0b(x,x){
    
    
    
    return '';
    
    
    



}



function _sim_0a(){
    
    
    
    return [];
    
    
    



}