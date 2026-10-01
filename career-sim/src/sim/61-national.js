// ---- part:09 | 国家队引擎（世界杯预选/亚洲杯/洲际） ----

function _natPool(comp,



playerId){
var all=NATS,list=[],picked={};
function take(t){if(!picked[t.i]){list.push(t);picked[t.i]=1;return 1;}return 0;}
if(comp==='wc'){
var player=null;for(var i2=0;i2<all.length;i2++)if(all[i2].i===playerId){player=all[i2];break;}
if(player)take(player);
var quotas={'UEFA':16,'CAF':9,'AFC':8,'CONCACAF':6,'CONMEBOL':6,'OFC':1};
['UEFA','CAF','AFC','CONCACAF','CONMEBOL','OFC'].forEach(function(conf){
var need=quotas[conf],got=0;
var confList=all.filter(function(t){return t.c===conf&&!picked[t.i];}).sort(function(a,b){return b.s-a.s;});
for(var i3=0;i3<confList.length&&got<need;i3++){if(take(confList[i3]))got++;}
});
var rest=all.slice().sort(function(a,b){return b.s-a.s;});
for(var r2=0;r2<rest.length&&list.length<48;r2++)take(rest[r2]);
}else{
var playerA=null;for(var i4=0;i4<all.length;i4++)if(all[i4].i===playerId){playerA=all[i4];break;}
if(playerA)take(playerA);
var afc=all.filter(function(t){return t.c==='AFC'&&!picked[t.i];}).sort(function(a,b){return b.s-a.s;});
for(var a2=0;a2<afc.length&&list.length<16;a2++)take(afc[a2]);
}
return list;
}
function _simGroup4(tm){
var byId={};for(var i5=0;i5<tm.length;i5++)byId[tm[i5].i]={i:tm[i5].i,name:(tm[i5].n||tm[i5].name),ovr:(tm[i5].ovr!=null?tm[i5].ovr:(tm[i5].s!=null?tm[i5].s:60)),pts:0,gf:0,ga:0,w:0,d:0,l:0};
var matches=[];
for(var a=0;a<tm.length;a++)for(var b=a+1;b<tm.length;b++){
var tA=tm[a],tB=tm[b],as=tA.ovr||tA.s,bs=tB.ovr||tB.s;
var sim=_matchSim(as,bs,null,true),hg=sim.hg,ag=sim.ag;
matches.push({home:tA.n,away:tB.n,homeId:tA.i,awayId:tB.i,hg:hg,ag:ag});
var A=byId[tA.i],B=byId[tB.i];
A.gf+=hg;A.ga+=ag;B.gf+=ag;B.ga+=hg;
if(hg>ag){A.w++;A.pts+=3;B.l++;}else if(ag>hg){B.w++;B.pts+=3;A.l++;}else{A.d++;B.d++;A.pts++;B.pts++;}
}
var arr=[];for(var k in byId)arr.push(byId[k]);
arr.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;return(y.gf-y.ga)-(x.gf-x.ga);});
return{standings:arr,matches:matches};
}
function _simGroupRecompute(sim,skipIdx){
var byId={};for(var k=0;k<sim.standings.length;k++){var r=sim.standings[k];byId[r.i]={i:r.i,name:r.name,ovr:r.ovr,pts:0,gf:0,ga:0,w:0,d:0,l:0};}
for(var m=0;m<sim.matches.length;m++){if(m===skipIdx)continue;var mm=sim.matches[m];var A=byId[mm.homeId],B=byId[mm.awayId];if(!A||!B)continue;
A.gf+=mm.hg;A.ga+=mm.ag;B.gf+=mm.ag;B.ga+=mm.hg;if(mm.hg>mm.ag){A.w++;A.pts+=3;B.l++;}else if(mm.ag>mm.hg){B.w++;B.pts+=3;A.l++;}else{A.d++;B.d++;A.pts++;B.pts++;}}
var arr=[];for(var kk in byId)arr.push(byId[kk]);
arr.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;return (y.gf-y.ga)-(x.gf-x.ga);});
sim.standings=arr;return arr;
}
function _natDecider(standings,playerId){
/* 生死战：末轮前中国未锁定小组前二，且末轮结果会改变是否前二 */
var rk=-1,cp=0;for(var i=0;i<standings.length;i++)if(standings[i].i===playerId){rk=i+1;cp=standings[i].pts;}
if(rk<0)return false;
var p3=standings.length>2?standings[2].pts:0,p2=standings.length>1?standings[1].pts:0;
if(rk<=2&&(cp-p3)>3)return false;
if(rk>2&&(p2-cp)>3)return false;
return true;
}
function _natDraw(teams,



playerId){
var nGrp=Math.round(teams.length/4),nPot=Math.round(teams.length/nGrp);
for(var attempt=0;attempt<80;attempt++){
var sorted=teams.slice().sort(function(a,b){return b.s-a.s;});
var pots=[];for(var p=0;p<nPot;p++)pots.push([]);
for(var i6=0;i6<sorted.length;i6++)pots[Math.floor(i6/nGrp)].push(sorted[i6]);
var groups=[];for(var g5=0;g5<nGrp;g5++)groups.push([]);
var fail=false;
for(var p2=0;p2<nPot;p2++){
var pot=pots[p2].slice();ag(pot);
var gOrd=[];for(var o5=0;o5<nGrp;o5++)gOrd.push(o5);ag(gOrd);
for(var t5=0;t5<pot.length;t5++){
var placed=false;
for(var tries5=0;tries5<nGrp*4&&!placed;tries5++){
var gi=gOrd[(t5+tries5)%nGrp];
if(groups[gi].length!==p2)continue;
var cnt5=0;for(var k5=0;k5<groups[gi].length;k5++)if(groups[gi][k5].c===pot[t5].c)cnt5++;
if(cnt5<(pot[t5].c==='UEFA'?2:1)){groups[gi].push(pot[t5]);placed=true;}
}
if(!placed){fail=true;break;}
}
if(fail)break;
}
if(!fail){
var pgi=-1;
for(var gg=0;gg<nGrp;gg++)for(var tt=0;tt<groups[gg].length;tt++)if(groups[gg][tt].i===playerId)pgi=gg;
return{groups:groups,playerGroup:pgi,nGroups:nGrp};
}
}
var sorted2=teams.slice().sort(function(a,b){return b.s-a.s;});
var pots2=[];for(var p3=0;p3<nPot;p3++)pots2.push([]);
for(var i7=0;i7<sorted2.length;i7++)pots2[Math.floor(i7/nGrp)].push(sorted2[i7]);
var groups2=[];for(var g6=0;g6<nGrp;g6++)groups2.push([]);
for(var p4=0;p4<nPot;p4++){ag(pots2[p4]);for(var t6=0;t6<pots2[p4].length;t6++)groups2[t6].push(pots2[p4][t6]);}
var pgi2=-1;
for(var gg2=0;gg2<nGrp;gg2++)for(var tt2=0;tt2<groups2[gg2].length;tt2++)if(groups2[gg2][tt2].i===playerId)pgi2=gg2;
return{groups:groups2,playerGroup:pgi2,nGroups:nGrp};
}
function _natSeedKey(a,b){
if(b.pts!==a.pts)return b.pts-a.pts;
var gd=(b.gf-b.ga)-(a.gf-a.ga);if(gd)return gd;
if(b.gf!==a.gf)return b.gf-a.gf;
return (b.ovr||0)-(a.ovr||0);
}
function _natBracket(groups){
/* 新赛制：小组第一/第二交叉配对（沿用旧式 f_i vs s_{i+1}）+ 最佳第三名补足到 2 的幂 */
var rows=[];
for(var g=0;g<groups.length;g++){var st=groups[g].sim.standings;rows.push([st[0]||null,st[1]||null,st[2]||null]);}
var pairs=[];
for(var i=0;i+1<rows.length;i+=2){
pairs.push([rows[i][0],rows[i+1][1]]);
pairs.push([rows[i+1][0],rows[i][1]]);
}
if(rows.length%2)pairs.push([rows[rows.length-1][0],rows[rows.length-1][1]]);
var thirds=[];
for(var g=0;g<rows.length;g++)if(rows[g][2])thirds.push(rows[g][2]);
thirds.sort(_natSeedKey);
var have=pairs.length*2,size=1;while(size<have)size*=2;var need=size-have;
for(var t=0;t+1<need;t+=2)pairs.push([thirds[t]||null,thirds[t+1]||null]);
var flat=[];
pairs.forEach(function(p){flat.push(p[0]||null,p[1]||null);});
return flat.map(function(t){return t?{name:t.name,id:t.i,rep:Math.round((t.ovr||0)/20),ovr:t.ovr}:null;});
}
function _natStage(ko,



playerName,grpPos){
/* 新赛制第三名也可能晋级：以是否出现在淘汰赛签表判断，而非只看小组名次 */
if(ko&&ko.champion===playerName)return"冠军";
var lastRound=null;
if(ko)for(var r=0;r<ko.rounds.length;r++){
var ms=ko.rounds[r].matches;
for(var m=0;m<ms.length;m++){if(ms[m].home===playerName||ms[m].away===playerName){lastRound=ko.rounds[r].name;break;}}
}
if(!lastRound)return"小组赛出局";
if(lastRound==="决赛")return"亚军";
return"止步"+lastRound;
}
function _natFinalScore(t,



playerName,bN,bO,bS){
if(t&&t["rounds"]&&t["rounds"]["length"]){
var fin=t["rounds"][t["rounds"]["length"]-0x1]["matches"];
if(fin&&fin["length"]){var m=fin[0x0];
if(m["home"]===playerName){m["hg"]=bN;m["ag"]=bO;if(bS)m["pens"]=[bS[0x0],bS[0x1]];else delete m["pens"];}else{m["ag"]=bN;m["hg"]=bO;if(bS)m["pens"]=[bS[0x1],bS[0x0]];else delete m["pens"];}
}
}
}
function _finalOpp(rounds,



playerName){
if(rounds&&rounds["length"]){
var fin=rounds[rounds["length"]-0x1]["matches"];
if(fin&&fin["length"]){var m=fin[0x0];return m["home"]===playerName?m["away"]:m["home"];}
}
return'';
}
function _natFormVal(stage,



comp){
if(comp==='wc'){
if(stage==="冠军")return 4;
if(stage==="亚军")return 3;
if(stage==="止步四强")return 2;
if(stage==="止步八强")return 1;
if(stage==="止步十六强")return 0.5;
if(stage==="止步三十二强")return 0.25;
return 0;
}
if(stage==="冠军")return 3;
if(stage==="亚军")return 2;
return 1;
}
function _natPath(rounds,



playerName){
var path=[];
if(rounds)for(var r=0;r<rounds.length;r++){
var ms=rounds[r]["matches"];
for(var m=0;m<ms.length;m++){
var mm=ms[m];
if(mm["home"]===playerName||mm["away"]===playerName){
var isHome=mm["home"]===playerName;
var opp=isHome?mm["away"]:mm["home"];
var pg=isHome?mm["hg"]:mm["ag"],og=isHome?mm["ag"]:mm["hg"];
var _nsc=pg+"-"+og;if(mm["pens"]&&mm["pens"]["length"]>=2){var _pa=isHome?mm["pens"][0x0]:mm["pens"][0x1],_pb=isHome?mm["pens"][0x1]:mm["pens"][0x0];_nsc+=" (点球 "+_pa+"-"+_pb+")";}var _nwon=pg>og;if(pg===og&&mm["pens"]&&mm["pens"]["length"]>=2)_nwon=(isHome?mm["pens"][0x0]:mm["pens"][0x1])>=(isHome?mm["pens"][0x1]:mm["pens"][0x0]);path.push({round:rounds[r]["name"],opp:opp,oppId:isHome?mm["awayId"]:mm["homeId"],won:_nwon,score:_nsc});
break;
}
}
}
return path;
}
function _qualStandings(teams,



matches){
var st={};
teams.forEach(function(t){st[t.i]={i:t.i,name:t.n,w:0,d:0,l:0,gf:0,ga:0,pts:0};});
matches.forEach(function(m){
var h=st[m["hid"]],a=st[m["aid"]];
if(!h||!a)return;
h["gf"]+=m["hg"];h["ga"]+=m["ag"];a["gf"]+=m["ag"];a["ga"]+=m["hg"];
if(m["hg"]>m["ag"]){h["w"]++;a["l"]++;h["pts"]+=0x3;}
else if(m["hg"]<m["ag"]){a["w"]++;a["pts"]+=0x3;h["l"]++;}
else{h["d"]++;a["d"]++;h["pts"]+=0x1;a["pts"]+=0x1;}
});
var arr=[];for(var k in st)if(st[k])arr["push"](st[k]);
arr["sort"](function(a,b){return b["pts"]-a["pts"]||(b["gf"]-b["ga"])-(a["gf"]-a["ga"]);});
return arr;
}
function _runFriendlies(_fmin,_fmax){
var _ft={i:'n_chn',n:'\u4e2d\u56fd',s:60,ovr:_natStr()};
var _pool=[];
for(var _fi=0;_fi<NATS["length"];_fi++){
var _f=NATS[_fi];
if(_f["i"]!=='n_chn'&&_f["c"]!=='UEFA'&&_f["c"]!=='CONMEBOL'&&(_f["s"]||0)>=0x2d)_pool["push"](_f);
}
for(var _fj=_pool["length"]-1;_fj>0;_fj--){var _fk=Math["floor"](ad()*(_fj+1));var _ft2=_pool[_fj];_pool[_fj]=_pool[_fk];_pool[_fk]=_ft2;}
var _fn=Math["min"](_pool["length"],ae(_fmin||0x2,_fmax||0x4));
var _ms=[],



_w=0,_d=0,_l=0,_gf=0,_ga=0;
for(var _fm=0;_fm<_fn;_fm++){
var _o=_pool[_fm];
var _sa=_ft["ovr"]||_ft["s"],_sb=_o["s"]||_o["ovr"]||0x32;
var _sim=_matchSim(_sa,_sb),_hg=_sim["hg"],_ag=_sim["ag"];
_ms["push"]({home:_ft["n"],away:_o["n"],homeId:'n_chn',awayId:_o["i"],hg:_hg,ag:_ag});
_gf+=_hg;_ga+=_ag;
if(_hg>_ag)_w++;else if(_hg<_ag)_l++;else _d++;
}
return {matches:_ms,w:_w,d:_d,l:_l,gf:_gf,ga:_ga};
}
/* 从资格赛/正赛小组赛里挑出中国队的真实场次（hid/aid 或 homeId/awayId） */
function _chnGroup(ms){
var out=[];if(!ms)return out;
for(var i=0x0;i<ms["length"];i++){var m=ms[i],h=m["hid"]||m["homeId"],a=m["aid"]||m["awayId"];
if(h==='n_chn'||a==='n_chn')out["push"](m);}
return out;
}
/* 从淘汰赛 rounds 里挑出中国队的真实场次（含十六强→决赛，出局后不再计入） */
function _chnRounds(rounds){
var out=[];if(!rounds)return out;
for(var r=0x0;r<rounds["length"];r++){var ms=rounds[r]["matches"]||[];
for(var j=0x0;j<ms["length"];j++){var m=ms[j];if(m["homeId"]==='n_chn'||m["awayId"]==='n_chn')out["push"](m);}}
return out;
}
/* 中立国家队赛事：不依赖中国队参赛，世界杯/亚洲杯/欧洲杯/美洲杯按四年周期真实模拟（世界面板可回看） */
var _natFxNames={'wc':'世界杯','asia':'亚洲杯','euro':'欧洲杯','copa':'美洲杯'};
function _natNeutralTeams(tag,exChn){
var list;
if(tag==='wc'){var _pw=_natPool('wc',null);if(exChn)_pw=_pw.filter(function(t){return t.i!=='n_chn';});return _pw.map(function(t){return{'i':t.i,'n':t.n,'c':t.c,'s':t.s,'ovr':t.s};});}
if(tag==='euro')list=NATS.filter(function(t){return t["c"]==='UEFA';});
else if(tag==='copa')list=NATS.filter(function(t){return t["c"]==='CONMEBOL'||t["c"]==='CONCACAF';});
else list=NATS.filter(function(t){return t["c"]==='AFC'&&t["i"]!=='n_chn';});
return list.slice().sort(function(a,b){return b.s-a.s;}).slice(0,16).map(function(t){return{'i':t.i,'n':t.n,'c':t.c,'s':t.s,'ovr':t.s};});
}
function _runNatNeutral(tag,exChn){
var teams=_natNeutralTeams(tag,exChn);
if(teams.length<8)return null;
var draw=_natDraw(teams,null);
var groups=[];
for(var g=0;g<draw.nGroups;g++)groups.push({sim:_simGroup4(draw.groups[g])});
var ko=_natKoBracket(_natBracket(groups));
var _finM=ko.rounds.length?ko.rounds[ko.rounds.length-1].matches[0]:null;
var _champ=_finM?((_finM.pens&&_finM.pens.length>=2)?(_finM.pens[0]>=_finM.pens[1]?_finM.homeId:_finM.awayId):(_finM.hg>=_finM.ag?_finM.homeId:_finM.awayId)):null;
return{'name':_natFxNames[tag],'raw':1,'champion':_champ,'rounds':ko.rounds,
'groups':groups.map(function(g2,gi){return{'name':'第'+(gi+1)+'组','standings':g2.sim.standings,'matches':_flatMs(g2.sim.matches)};})};
}
/* natFx 每季推进：归档上一届→重置→按"当前季序"决定本季模拟哪项大赛。
   四大赛周期计数器必须跨阶段连续：age 在青训每岁与职业每季各 +1（1:1），
   故以 age 为唯一计数器；青训/职业共用同一公式，转职业不再"重新开始计数"。 */
function _natChinaWorld(comp){
/* AI 中国队正常走预选赛：出线 → 正赛签表含中国（结构同玩家参赛版）；
   未出线 → 退化为"正赛无中国"的中立签表（中国队缺席=预选赛出局） */
var _pt={i:'n_chn',n:'\u4e2d\u56fd',s:0x3e,ovr:0x3e};
var _q=_runNatQual(comp,_pt);
if(!_q.qualified)return _runNatNeutral(comp,!0x0);
var _c=_runNatComp(comp,_pt);if(_c&&_c["phase"]==="group")_c=_natResolveComp(comp,_pt,_c);
return{'name':_natFxNames[comp],'raw':1,'rounds':_c["rounds"],
'groups':(_c["allGroups"]||[]).map(function(st,gi){return{'name':'第'+(gi+1)+'组','standings':st};})};
}
function _natYr(){return((a2["age"]-100)%4+4)%4;}
function _natTick(_natTourn,_cnElim,_forceChamp){
_fxArch("natFxArch",a2["natFx"]);
a2["natFx"]={'season':_fxSeasonLab(),'data':{}};
var _nyr=_natYr();
var _natTgt=_nyr===0x1?'wc':_nyr===0x3?'asia':_nyr===0x0?'euro':'copa';
if(_forceChamp&&_forceChamp===_natTgt){
/* 作弊直接夺冠：世界面板也要与世界纪录一致，中国队即冠军 */
a2["natFx"]["data"][_natTgt]={'name':_natFxNames[_natTgt],'raw':1,'champion':'n_chn','rounds':[],'groups':[]};
}else if((_natTgt==='wc'||_natTgt==='asia')&&_natTourn){
/* 玩家参赛版：rounds 直接引用球员真实赛事对象——决赛大场面改分能实时回填到世界面板 */
var _ngrps=(_natTourn["allGroups"]||[]).map(function(st,gi){return{'name':'第'+(gi+1)+'组','standings':st};});
a2["natFx"]["data"][_natTgt]={'name':_natFxNames[_natTgt],'raw':1,'rounds':_natTourn["rounds"],'groups':_ngrps};
}else if(_natTgt==='wc'||_natTgt==='asia'){
/* 亚洲球队赛事：中国队像现实世界一样走"预选赛→正赛"，不因玩家缺席而被跳过。
   1) _cnElim —— 本季玩家在队、预选赛判定出局：正赛签表不含中国（与玩家战绩一致）；
   2) 玩家不在队/未征召：中国队由 AI 打预选赛，出线则进正赛签表，未出线则正赛无中国；
   3) 玩家在队且出线：走上面 _natTourn 玩家版，世界=玩家结果。 */
var _nres=_cnElim?_runNatNeutral(_natTgt,!0x0):_natChinaWorld(_natTgt);
if(_nres)a2["natFx"]["data"][_natTgt]=_nres;
}else{
/* 中立版：欧洲杯/美洲杯中国队本就不会参加，直接中立模拟 */
var _nres2=_runNatNeutral(_natTgt,!0x1);
if(_nres2)a2["natFx"]["data"][_natTgt]=_nres2;
}
}


/* ── 世界杯亚洲区预选赛（48 队新赛制）：第2轮 9 组×4 → 每组前2(18)；第3轮 3 组×6 → 每组前2(6) + 最佳 2 个第3名 = 8 个正赛名额 ── */
function _seedInto(teams,nGroups){
var groups=[],sorted=teams.slice().sort(function(a,b){return (b.ovr||b.s||60)-(a.ovr||a.s||60);});
for(var g=0;g<nGroups;g++)groups.push([]);
for(var i=0;i<sorted.length;i++)groups[i%nGroups].push(sorted[i]);
return groups;
}
function _wcQual(playerTeam){
/* 用玩家版中国队（ovr=国家队强度）替换 NATS 里的同名中国，避免用固定 s=62 */
var afc=[];for(var i=0;i<NATS.length;i++)if(NATS[i].c==='AFC'&&NATS[i].i!==playerTeam.i)afc.push(NATS[i]);
afc.push(playerTeam);
function _st(t){return t.ovr||t.s||60;}
var all=afc.slice().sort(function(a,b){return _st(b)-_st(a);});
var r2teams=all.slice(0,36);
var has2=false;for(var i=0;i<r2teams.length;i++)if(r2teams[i].i===playerTeam.i){has2=true;break;}
if(!has2)r2teams[35]=playerTeam;
var r2=_seedInto(r2teams,9).map(function(grp){return _simGroup4(grp);});
var adv=[];
for(var g=0;g<r2.length;g++){var st=r2[g].standings;if(st[0])adv.push(st[0]);if(st[1])adv.push(st[1]);}
var r3=_seedInto(adv,3).map(function(grp){return _simGroup4(grp);});
var direct=[],thirds=[],allChina=[];
function _collect(sim){for(var m=0;m<sim.matches.length;m++){var mm=sim.matches[m];if(mm.homeId===playerTeam.i||mm.awayId===playerTeam.i)allChina.push(mm);}}
for(var g=0;g<r2.length;g++)_collect(r2[g]);
for(var g=0;g<r3.length;g++){_collect(r3[g]);var st=r3[g].standings;if(st[0])direct.push(st[0]);if(st[1])direct.push(st[1]);if(st[2])thirds.push(st[2]);}
thirds.sort(function(a,b){if(b.pts!==a.pts)return b.pts-a.pts;var gd=(b.gf-b.ga)-(a.gf-a.ga);if(gd)return gd;return b.gf-a.gf;});
var qIds={};
for(var i=0;i<direct.length;i++)qIds[direct[i].i]=1;
for(var t=0;t<2&&t<thirds.length;t++)qIds[thirds[t].i]=1;
var lastRound=null,lastGi=-1,lastPos=-1,reachedR3=false;
for(var g=0;g<r3.length&&!reachedR3;g++)for(var p=0;p<r3[g].standings.length;p++)if(r3[g].standings[p].i===playerTeam.i){reachedR3=true;lastRound=r3[g];lastGi=g;lastPos=p+1;}
if(!reachedR3)for(var g=0;g<r2.length;g++)for(var p=0;p<r2[g].standings.length;p++)if(r2[g].standings[p].i===playerTeam.i){lastRound=r2[g];lastGi=g;lastPos=p+1;}
var qualified=!!qIds[playerTeam.i];
var groupsOut=(reachedR3?r3:r2).map(function(sim){return sim.standings;});
return{comp:'世预赛',stage:qualified?'晋级':'预选赛出局',age:a2["age"],playerPos:lastPos,
matches:allChina,standings:lastRound?lastRound.standings:[],playerGroup:lastGi,groups:groupsOut,qualified:qualified};
}
function _runNatQual(comp,



playerTeam){
if(comp==='wc')return _wcQual(playerTeam);
var isWC=comp==='wc';
var gSize=isWC?0x5:0x4;
var qualTop=isWC?0x2:0x2;
var all=[];for(var qi=0;qi<NATS["length"];qi++)if(NATS[qi]["c"]==='AFC')all["push"](NATS[qi]);
var hasP=false;for(var qi=0;qi<all["length"];qi++)if(all[qi]["i"]===playerTeam["i"]){hasP=true;break;}
if(!hasP)all["unshift"](playerTeam);
var other=[];for(var qi=0;qi<all["length"];qi++)if(all[qi]["i"]!==playerTeam["i"])other["push"](all[qi]);
var n=other["length"];
var gCount=Math["floor"](n/(gSize-0x1));if(gCount<0x1)gCount=0x1;
var _myGroup=_wDraw(other,gSize-0x1,function(t){return Math.pow((t["s"]||0x3c)/0x3c,0x2);});
var _qRest=[];for(var qi=0;qi<other["length"];qi++)if(_myGroup["indexOf"](other[qi])<0x0)_qRest["push"](other[qi]);
for(var qi=_qRest["length"]-0x1;qi>0x0;qi--){var qj=Math["floor"](ad()*(qi+0x1));var qt=_qRest[qi];_qRest[qi]=_qRest[qj];_qRest[qj]=qt;}
var qgroups=[];qgroups["push"](_myGroup);
for(var qg=0x1;qg<gCount;qg++)qgroups["push"](_qRest["slice"]((qg-0x1)*(gSize-0x1),(qg+0x1)*(gSize-0x1)));
var pgIdx=0x0;
for(var qg=0;qg<qgroups["length"];qg++){
var found=false;for(var qi=0;qi<qgroups[qg]["length"];qi++)if(qgroups[qg][qi]["i"]===playerTeam["i"]){pgIdx=qg;found=true;break;}
if(found)break;
}
if(pgIdx>=qgroups["length"])pgIdx=0x0;
var qmatches=[];var qallGroups=[];
for(var qg=0;qg<qgroups["length"];qg++){
var grp=qgroups[qg];var allG=[playerTeam];for(var qi=0;qi<grp["length"];qi++)allG["push"](grp[qi]);
qallGroups["push"](allG);
for(var qa=0;qa<allG["length"];qa++){
for(var qb=qa+0x1;qb<allG["length"];qb++){
var ta=allG[qa],tb=allG[qb];
var sa=ta["ovr"]||ta["s"]||0x3c,sb=tb["ovr"]||tb["s"]||0x3c;
var sim=_matchSim(sa,sb),hg=sim["hg"],ag=sim["ag"];
qmatches["push"]({hid:ta["i"],aid:tb["i"],hn:ta["n"],an:tb["n"],hg:hg,ag:ag});
}
}
}
var pgSt=_qualStandings(qallGroups[pgIdx]||[],qmatches);
var pgPos=-0x1;
for(var qi=0;qi<pgSt["length"];qi++)if(pgSt[qi]["i"]===playerTeam["i"]){pgPos=qi+0x1;break;}
var qualified=pgPos>0x0&&pgPos<=qualTop;
var stage=qualified?"\u664b\u7ea7":"\u9884\u9009\u8d5b\u51fa\u5c40";
var _pgIds={};for(var qi=0;qi<qallGroups[pgIdx]["length"];qi++)_pgIds[qallGroups[pgIdx][qi]["i"]]=0x1;
var _pgMatches=qmatches["filter"](function(m){return _pgIds[m["hid"]]&&_pgIds[m["aid"]];});
return{comp:comp==='wc'?"\u4e16\u9884\u8d5b":"\u4e9a\u9884\u8d5b",stage:stage,age:a2["age"],playerPos:pgPos,
matches:_pgMatches,standings:pgSt,groups:qallGroups["map"](function(g){return _qualStandings(g,qmatches);}),
qualified:qualified,playerGroup:pgIdx};
}
function _runNatComp(comp,



playerTeam){
var teams=_natPool(comp,playerTeam.i);
var draw=_natDraw(teams,playerTeam.i);
var groups=[];
for(var g=0;g<draw.nGroups;g++){
var tm=draw.groups[g].map(function(t){return{i:t.i,n:(t.i===playerTeam.i?playerTeam.n:t.n),c:t.c,s:t.s,ovr:(t.i===playerTeam.i?playerTeam.ovr:t.s)};});
groups.push({sim:_simGroup4(tm)});
}
var pg=draw.playerGroup<0?0:draw.playerGroup;
var gsim=groups[pg].sim,lastIdx=-1;
for(var mi=0;mi<gsim.matches.length;mi++){var mm=gsim.matches[mi];if(mm.homeId===playerTeam.i||mm.awayId===playerTeam.i)lastIdx=mi;}
var tour={comp:comp==='wc'?"世界杯":"亚洲杯",age:a2["age"],playerGroup:pg,_groups:groups,_gsim:gsim,_lastIdx:lastIdx,_team:playerTeam,phase:null};
if(lastIdx>=0){var _lm=gsim.matches[lastIdx];tour._opp=(_lm.homeId===playerTeam.i)?_lm.away:_lm.home;tour._oppId=(_lm.homeId===playerTeam.i)?_lm.awayId:_lm.homeId;tour._oppStr=_natOvrOf(gsim,tour._oppId);}
/* 世界杯小组赛：末轮为生死战时延后淘汰赛，改由交互大场面决定出线后再算签表 */
if(comp==='wc'&&lastIdx>=0){
var _bf=_simGroupRecompute(gsim,lastIdx);
if(_natDecider(_bf,playerTeam.i)){tour.matches=gsim.matches;tour.standings=gsim.standings;tour.rounds=[];tour.path=[];tour.allGroups=groups.map(function(x){return x.sim.standings;});tour.phase='group';return tour;}
}
return _natResolveComp(comp,playerTeam,tour);
}
function _natOvrOf(sim,id){for(var i=0;i<sim.standings.length;i++)if(sim.standings[i].i===id)return sim.standings[i].ovr||60;return 60;}
function _natResolveComp(comp,playerTeam,tour){
var groups=tour._groups,gsim=tour._gsim;
_simGroupRecompute(gsim);
var ppos=1;for(var z=0;z<gsim.standings.length;z++)if(gsim.standings[z].i===playerTeam.i)ppos=z+1;
var ko=_natKoBracket(_natBracket(groups));
tour.stage=_natStage(ko,playerTeam.n,ppos);
tour.playerPos=ppos;tour.matches=gsim.matches;tour.standings=gsim.standings;
tour.rounds=ko?ko.rounds:[];tour.path=ko?_natPath(ko.rounds,playerTeam.n):[];
tour.allGroups=groups.map(function(x){return x.sim.standings;});tour.phase=null;
return tour;
}
function _natChampId(rounds){if(!rounds||!rounds.length)return null;var m=rounds[rounds.length-1]["matches"][0x0];if(!m||m["hg"]==null)return null;return (m["pens"]&&m["pens"]["length"]>=2)?(m["pens"][0x0]>=m["pens"][0x1]?m["homeId"]:m["awayId"]):(m["hg"]>=m["ag"]?m["homeId"]:m["awayId"]);}
function _natAfterKO(bz,tour,stage){
var _isWC=tour["comp"]==="世界杯",_k=_isWC?"wc":"asia";
if(stage==="小组赛出局"){aZ(bz,tour["comp"],"小组赛出局");return;}
if(stage==="冠军"||stage==="亚军"){var _t=_aVPri(_k,0.55,{"comp":tour["comp"],"opp":_finalOpp(tour["rounds"],"中国队"),"_aiCtx":{"t":"nat","comp":tour["comp"],"stage":stage}});if(_t){a2[_isWC?"_natWC":"_natAsia"]=tour;return;}}
aZ(bz,tour["comp"],stage);
}

function _natKoBracket(seeds){
/* 固定签表（仿现实杯赛）：首轮相邻配对，之后相邻胜者晋级；轮名走 _bracketNames（含"三十二强"） */
var n=seeds["length"],size=1;while(size<n)size*=2;
var alive=seeds.slice();while(alive["length"]<size)alive["push"](null);
var _rn=_bracketNames(size),_r=[],_ri=0x0,_cur=[];
for(var i=0x0;i<alive["length"];i+=0x2)_cur["push"]([alive[i],alive[i+0x1]]);
while(_cur["length"]>=0x1){
var _m=[],_w=[];
for(var i=0x0;i<_cur["length"];i++){
var a=_cur[i][0x0],b=_cur[i][0x1];
if(a&&b){
var as=a["ovr"]?a["ovr"]:(a["s"]||0x32),bs=b["ovr"]?b["ovr"]:(b["s"]||0x32);
var _ko=_koSim(as,bs,null,true);
_m["push"]({home:a["name"],away:b["name"],homeId:a["id"],awayId:b["id"],hg:_ko["hg"],ag:_ko["ag"],pens:_ko["pk"],et:_ko["et"]});
_w["push"](_ko["won"]?a:b);
}else{
_w["push"](a||b);
}
}
_r["push"]({name:_rn[_ri]||("第"+(_ri+1)+"轮"),matches:_m});
if(_w["length"]<=0x1)break;
_cur=[];
for(var j=0x0;j<_w["length"];j+=0x2)_cur["push"]([_w[j],_w[j+0x1]]);
_ri++;
}
var _fin=_r["length"]>0x0?_r[_r["length"]-0x1]["matches"][0x0]:null;
return{rounds:_r,champion:_fin?((_fin["pens"]&&_fin["pens"]["length"]>=2)?(_fin["pens"][0x0]>=_fin["pens"][0x1]?_fin["home"]:_fin["away"]):(_fin["hg"]>=_fin["ag"]?_fin["home"]:_fin["away"])):null};
}