// ---- part:03 | 工具函数 · §2（家乡队/老将回归/杂项） ----





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
else if(bx&&bx["lg"]){var _lgs=bx["lg"];if("string"===typeof _lgs)_lgs=[_lgs];var _lo=bx["minRep"]!=null?bx["minRep"]:0x2,_hi=bx["maxRep"]!=null?bx["maxRep"]:0x5,_FT=a0["TEAMS"];for(i=0x0;i<_FT["length"];i++){t=_FT[i];var _LT=aq(t);if(_LT&&_lgs["indexOf"](_LT['id'])>=0x0&&t["rep"]>=_lo&&t["rep"]<=_hi)bG(t);}}
return bC;
}function ac(bx,by,bz){
return Math["max"](by,Math["min"](bz,bx));
}