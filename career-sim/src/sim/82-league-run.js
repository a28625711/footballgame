// ---- part:13 | 单季联赛/真实榜/大场面抽取 ----



/* 单季联赛：主客双循环，_matchSim 逐场，积分→净胜→进球→id 排序 */

function _lgSeason(lgId){
var tms=_lgTeamsOf(lgId),n=tms.length,gl=_lgStyle[lgId]||1,rr=_lgRR[lgId]||2;
/* 联赛级常量缓存 + 内联 _matchSim：全联赛逐场（每季约 8k 场）避免重复计算与对象分配 */
var _tot=2*_msCfg["base"]*gl,_pd=_msPd(gl);
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
var _sh=_msShare(strOf[hh],strOf[aa],!0x1),_hg=_poisson(_tot*_sh),_ag=_poisson(_tot*(1-_sh));
if(_hg!==_ag&&Math["abs"](_hg-_ag)<=0x1&&ad()<_pd)_hg=_ag=Math["min"](_hg,_ag);
var Th=tbl[hh],Ta=tbl[aa];
Th.gf+=_hg;Th.ga+=_ag;Ta.gf+=_ag;Ta.ga+=_hg;
if(_hg>_ag){Th.w++;Th.pts+=3;Ta.l++;}else if(_ag>_hg){Ta.w++;Ta.pts+=3;Th.l++;}else{Th.d++;Ta.d++;Th.pts++;Ta.pts++;}
fx[r+leg*half].push([hh,aa,_hg,_ag]);
}
}
}
var out=[];
for(var k in tbl)out.push(tbl[k]);
out.sort(_tbCmp(TIEBR[lgId]||"std",_h2hIdx(fx)));
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
 _pk[_k]=_pkFxLeague(_dd);}
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
rows.sort(_tbCmp(TIEBR[lg]||"std",_h2hIdx(a2["lgFx"]&&a2["lgFx"]["data"]?a2["lgFx"]["data"][lg]:null)));
for(var i=0;i<rows.length;i++)rows[i]["pos"]=i+1;
var o=[];for(i=0;i<rows.length;i++)o.push(rows[i]["i"]);
a2["lastTables"][lg]=o;
}