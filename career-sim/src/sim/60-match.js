// ---- part:08 | 赛事与德比 · §7（单场模拟/杯赛/点球） ----





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
var share=rank>=0x4?0.55:rank>=0x3?0.47:rank>=0x2?0.38:rank>=0x1?0.27:0.16;
var delta=ovr-base;
var boost;
if(delta>=0){
var d=Math.min(delta,0x24);
boost=share*d*(0x1+0.15*d/0x24);
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
var f=(0.55+0.55*(a2["ovr"]-0x32)/0x32)*(a2["ovr"]>=0x58?1.10+0.03*(a2["ovr"]-0x58):0x1)*(boost||1);
var diff=(oppStr!=null&&ownStr!=null)?ac((oppStr-ownStr)/0x1e,-1,1):0;
var sh={'att':[0.24,0.11],'mid':[0.15,0.19],'def':[0.07,0.045],'gk':[0,0]}[grp]||[0.15,0.15];
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