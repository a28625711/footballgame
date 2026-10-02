// ---- part:15 | 世界引擎总入口（洲际赛/杯赛/升降级/里程碑） ----

function _bigHooks(bz){
var me=a2["teamId"],tm=me?aj(me):null;
if(!me||!tm)return;
/* 大场面队列被占（如国家队决赛）时不得抽取，否则被借走的比赛没人回填 */
if(a2["bigQ"]&&a2["bigQ"]["length"])return;
var lg=ap(tm),rows=a2["lgTables"]&&a2["lgTables"][lg],
fx=a2["lgFx"]&&a2["lgFx"]["data"]&&a2["lgFx"]["data"][lg];
if(!lg||!rows||!fx)return;
var rank=(a0["ROLES"][aI(tm)]||{})["rank"]||0;
var myRow=null,i;
for(i=0;i<rows["length"];i++)if(rows[i]["i"]===me){myRow=rows[i];break;}
if(!myRow)return;
var pick=null,oppId=null,comp='';
/* 保级大战：季末落入降级区、且赢球还有救（距安全线≤3分），抽一场对区内直接对手 */
var zone=_relegZone[lg];
if(zone&&myRow["pos"]>=zone[0]){
var safeRow=zone[0]>=2?rows[zone[0]-2]:null;
if(safeRow&&myRow["pts"]>=safeRow["pts"]-3){
var cand=[];
for(i=0;i<rows["length"];i++)if(rows[i]!==myRow&&rows[i]["pos"]>=zone[0])cand.push(rows[i]);
if(cand["length"]){pick=cand[Math["floor"](ad()*cand["length"])];oppId=pick["i"];comp='保级大战';}
}
}
/* 德比：主力以上 + 真实赛程里有对死敌的比赛（_dby 按 leagueOf 动态过滤，支持跨级消失）；
   多个死敌同榜时随机挑一场（修复列表序偏置：皇马永远先抽巴萨、抽不到马竞） */
if(!pick&&rank>=0x3&&_dby[me]){
var dM=_dby[me]["filter"](function(dW){return aj(dW[0])&&ap(aj(dW[0]))===lg;});
var dCands=[];
for(i=0;i<dM["length"];i++){
var hit=_fxHit(fx,me,dM[i][0]);
if(hit)dCands["push"]({'i':dM[i][0],'comp':dM[i][0x1]});
}
if(dCands["length"]){var dc=dCands[Math["floor"](ad()*dCands["length"])];pick={'i':dc["i"]};oppId=dc["i"];comp=dc["comp"];}
}
if(!pick)return;
var hit2=_fxHit(fx,me,oppId);
if(!hit2)return;
var opp=aj(oppId),oppRow=null;
for(i=0;i<rows["length"];i++)if(rows[i]["i"]===oppId){oppRow=rows[i];break;}
if(!oppRow)return;
var meHome=hit2["h"]===me;
var kind=comp==='保级大战'?'drop':'derby';
var _prob=kind==='drop'?0.55:0.2;
if(ad()>=_prob)return;
_tblUnmatch(myRow,hit2["hg"],hit2["ag"],meHome);
_tblUnmatch(oppRow,hit2["hg"],hit2["ag"],!meHome);
fx[hit2["r"]][hit2["m"]][2]=-1;fx[hit2["r"]][hit2["m"]][3]=-1;
if(!_aVPri(kind,_prob,{'comp':comp,'opp':opp?opp["name"]:'','oppId':oppId,'oppStr':opp?Math.round(_teamAbs(opp)):null,'fromLeague':lg,
'_fx':{'lg':lg,'r':hit2["r"],'m':hit2["m"],'meHome':meHome},
'_aiCtx':{'t':'bm','lg':lg,'r':hit2["r"],'m':hit2["m"],'meHome':meHome,'oppId':oppId,'hg':hit2["hg"],'ag':hit2["ag"]},
'_ctx':'积分榜上你第'+myRow["pos"]+'（'+myRow["pts"]+'分），'+(opp?opp["name"]:'对手')+'第'+oppRow["pos"]+'（'+oppRow["pts"]+'分）'})){
  /* 意外未入队（队列被占等）：还原该场与赛程，防止积分榜悬空 */
  _tblAddmatch(myRow,hit2["hg"],hit2["ag"],meHome);
  _tblAddmatch(oppRow,hit2["hg"],hit2["ag"],!meHome);
  fx[hit2["r"]][hit2["m"]][2]=hit2["hg"];fx[hit2["r"]][hit2["m"]][3]=hit2["ag"];
}
}

/* 联赛冠军/赛季记录/历史镜像必须基于「最终榜」结算：
   德比/保级大战可能被抽取为大场面并改变积分榜，若在改表前判冠军，
   会出现"榜上第一却不是冠军"或相反。此函数在季末大场面（含延后待踢）
   全部落定后调用，重取本队最终行并补发冠军、同步赛季快照与 lgTblArch。 */
function _lgFinalRefresh(bz){
  if(!bz||bz["leagueId"]==null)return;
  var rows=a2["lgTables"]&&a2["lgTables"][bz["leagueId"]];
  if(!rows)return;
  var row=null,i,tid=bz["teamId"];
  for(i=0;i<rows["length"];i++)if(rows[i]["i"]===tid){row=rows[i];break;}
  if(!row)return;
  bz["leaguePos"]=row["pos"];
  bz["leagueW"]=row["w"];
  bz["leagueD"]=row["d"];
  bz["leagueL"]=row["l"];
  bz["leagueGF"]=row["gf"];
  bz["leagueGA"]=row["ga"];
  bz["leaguePts"]=row["pts"];
  if(row["pos"]===0x1&&a0["ROLES"][a2["role"]]["rank"]>=0x2){
    var cb=(bz["league"]||(ak(bz["leagueId"])||{}).name)+'冠军';
    if(!bz["trophies"]||bz["trophies"]["indexOf"](cb)<0x0){
      bz["trophies"]=bz["trophies"]||[];
      bz["trophies"]["push"](cb);
      a2["trophies"]["push"]({'name':cb,'age':bz["age"],'team':bz["teamName"]});
    }
  }
  /* 历史镜像同步：归档中的本季榜与最终榜一致（避免历史榜/当季榜分叉） */
  if(a2["_fxLab"]!=null&&a2["lgTblArch"]){
    for(i=0;i<a2["lgTblArch"]["length"];i++)if(a2["lgTblArch"][i]["season"]===a2["_fxLab"]){
      if(a2["lgTblArch"][i]["data"])a2["lgTblArch"][i]["data"][bz["leagueId"]]=_pkTblArr(rows);
      break;
    }
  }
}


/* 球队实力起落：表现修正 + 随机漫步 + 均值回归 + 奖杯/升降 bonus，上下限 ±8；
   高 dev 加快回落（0.85-0.04|dev|），霸主均衡点落在 +3~4 而非钉死上限；
   每季倒数三名 +0.6 重建补偿，防弱者恒弱、制造王朝更替 */

function _devTick(){
a2["teamDev"]=a2["teamDev"]||{};
/* repOf 缓慢回归 base：升/降班的档位偏移随年头淡化(每年12%)，不越过 base，回到 base 即移除覆盖 */
if(a2["repOf"])for(var _rr in a2["repOf"]){var _rt=null;for(var _ri=0x0;_ri<a0["TEAMS"]["length"];_ri++)if(a0["TEAMS"][_ri]["id"]===_rr){_rt=a0["TEAMS"][_ri];break;}if(!_rt)continue;var _rb=_rt["rep"],_rc=a2["repOf"][_rr],_rn=_rc+(_rb-_rc)*0.12;_rn=_rb>=_rc?Math["min"](_rb,_rn):Math["max"](_rb,_rn);if(Math["abs"](_rb-_rn)<0.05)delete a2["repOf"][_rr];else a2["repOf"][_rr]=_rn;}
var prev=a2["lastTables"],bonus=a2["_devBonus"]||{};
/* 上季倒数三名 +0.6 重建补偿（直接并入本季 bonus） */
if(prev)for(var pb in prev){var tb=prev[pb];for(var pi=tb.length-3;pi<tb.length;pi++)if(pi>=0)bonus[tb[pi]]=(bonus[tb[pi]]||0)+0.6;}
var byLg={},i,
t;
for(i=0;i<a0["TEAMS"]["length"];i++){t=a0["TEAMS"][i];var lgi=ap(t);(byLg[lgi]=byLg[lgi]||[]).push(t);}

/* 预期名次用含 dev 的自洽强度：表现修正衡量"运气"，超预期会把自身预期抬上去而自我收敛，防止弱队爆冷后被钉在 dev 上限的棘轮 */

for(var lgId in byLg)byLg[lgId].sort(function(x,y){
return _teamStrRaw(y)-_teamStrRaw(x);
});
a2["teamEra"]=a2["teamEra"]||{},a2["teamForm"]=a2["teamForm"]||{},a2["teamHang"]=a2["teamHang"]||{};
/* 联赛连冠追踪（重建债用）：从上一季最终榜取各联赛冠军，连冠者累加、其余清零 */
var _chg={};if(prev)for(var _cb in prev){var _ct=prev[_cb];if(_ct&&_ct.length)_chg[_ct[0x0]]=0x1;}
var _lcs=a2["lgChampStreak"]=a2["lgChampStreak"]||{};
for(var _ck in _lcs)if(!_chg[_ck])_lcs[_ck]=0x0;
for(var _cw in _chg)_lcs[_cw]=(_lcs[_cw]||0x0)+0x1;
for(i=0;i<a0["TEAMS"]["length"];i++){
t=a0["TEAMS"][i];
var lg2=aq(t);if(!lg2)continue;
var era=a2["teamEra"][t["id"]]||0x0,form=a2["teamForm"][t["id"]]||0x0,hang=a2["teamHang"][t["id"]]||0x0;
var act=prev&&prev[lg2["id"]]?prev[lg2["id"]].indexOf(t["id"])+1:0;
var list=byLg[lg2["id"]],
exp=0;
for(var k=0;k<list.length;k++)if(list[k]["id"]===t["id"]){exp=k+1;break;}
var delta=act>0?exp-act:0;
/* 三层实力模型：era=一代人尺度(慢,饱和回归,表现反馈,正向上限=世界级锚定), form=单季状态(快), hang=夺冠重建债。
   荣誉加成（联赛/杯赛/洲际夺冠）喂 era：只有荣誉能把这支球队顶到世界级高度（弱联赛霸主也能到），
   随机漂移有界到不了世界级；长期无冠 era 均值回归→慢慢掉下来（配合 hang 的重建期）。 */
var _re=era*(0.95-0.06*(era<0?-era:era))+0.5*ac(delta*0.3,-0.75,0.75)+(ad()*3.6-1.8)+(bonus[t["id"]]||0);
var _rp2=_er(t),_ceil=95-(0x5-_rp2)*0x4,_cap=_ceil-((lg2["str"]||60)+_repGap(_rp2));if(_cap<0)_cap=0;
a2["teamEra"][t["id"]]=ac(_re,-8,_cap);
a2["teamForm"][t["id"]]=ac(form*0.85+(ad()*1.2-0.6),-3,3);
var _st=_lcs[t["id"]]||0x0,_ss=_st>0xa?0xa:_st;
a2["teamHang"][t["id"]]=ac(hang*0.75+0.05*_ss*_ss,0,8);
a2["teamDev"][t["id"]]=ac(a2["teamEra"][t["id"]]+a2["teamForm"][t["id"]]-a2["teamHang"][t["id"]],-12,12);
}
/* 连冠结算：上季拿过任意冠军的 +1，其余清零；冠军加成在 _devAdd 时按旧连冠数打折 */
var tw=a2["_titWin"]||{},ts=a2["titleStreak"]=a2["titleStreak"]||{};
for(var tk in ts)if(!tw[tk])ts[tk]=0;
for(var wk in tw)ts[wk]=(ts[wk]||0)+1;
a2["_titWin"]={};
a2["_devBonus"]={};
}


/* 两回合淘汰（A 先主），汇总平局→次回合加时→点球；gl=双方联赛风格几何平均 */
function _tieSim(sa,sb,gl){
var g1=_matchSim(sa,sb,gl),g2=_matchSim(sb,sa,gl);
var aa=g1.hg+g2.ag,ab=g1.ag+g2.hg;
var r={'aggA':aa,'aggB':ab,'won':aa>ab,'pens':null};
if(aa===ab){
var et=_etSim(sa,sb,gl);
aa+=et.hg;ab+=et.ag;
r["aggA"]=aa;r["aggB"]=ab;
if(et.hg!==et.ag)r["won"]=et.hg>et.ag;
else{var pk=_penSim(sa,sb);r["pens"]=[pk.a,pk.b];r["won"]=pk.a>=pk.b;}
}
return r;
}
/* 主客翻转：点球比分必须与进球一起颠倒，否则会出现"点球 8-9 却赢了" */
function _revScore(sc){
var _i=sc.indexOf(' ('),_h=_i>=0?sc.slice(0,_i):sc,_t=_i>=0?sc.slice(_i):'';
_h=_h.split('-').reverse().join('-');
var _m=/\(点球 (\d+)-(\d+)\)/.exec(_t);
if(_m)_t=_t.replace(_m[0],'(点球 '+_m[2]+'-'+_m[1]+')');
return _h+_t;
}
function _scoreTxt(tie,
meIsA){
var base=(meIsA?tie["aggA"]+'-'+tie["aggB"]:tie["aggB"]+'-'+tie["aggA"]);
if(tie["pens"]){var _p=meIsA?tie["pens"]:[tie["pens"][1],tie["pens"][0]];base+=' (点球 '+_p[0]+'-'+_p[1]+')';}
return base;
}


/* 比赛列表扁平化：[h,a,hg,ag,...]（存档紧凑格式） */
function _flatMs(ms){
var o=[];for(var i=0;i<ms.length;i++){o.push(ms[i]["homeId"]||ms[i]["hid"],ms[i]["awayId"]||ms[i]["aid"],ms[i]["hg"],ms[i]["ag"]);}
return o;
}

/* 瑞士轮联赛阶段：蛇形定序+circle 法单循环，抽样 games 轮（尽量回避同联赛） */

function _swissPhase(cards,games){
var n=cards.length,i,j,r;
var strOf={},lgOf={},nameOf={},ids=[];
for(i=0;i<n;i++){ids.push(cards[i]["i"]);strOf[cards[i]["i"]]=cards[i]["s"];lgOf[cards[i]["i"]]=cards[i]["lg"];nameOf[cards[i]["i"]]=cards[i]["n"];}
var sortedIds=ids.slice().sort(function(a,b){return strOf[b]-strOf[a];});
var order=[],
lo=0,hi=n-1,flip=false;
while(lo<=hi){order.push(flip?sortedIds[hi--]:sortedIds[lo++]);flip=!flip;}
var arr=order.slice();if(arr.length%2===1)arr.push(null);
var m2=arr.length,
rounds=[];
for(r=0;r<m2-1;r++){
var rd=[];
for(j=0;j<m2/2;j++){var h=arr[j],aw=arr[m2-1-j];if(h!==null&&aw!==null)rd.push(r%2===0?[h,aw]:[aw,h]);}
rounds.push(rd);
arr.splice(1,0,arr.pop());
}
var idxs=[];for(r=0;r<rounds.length;r++)idxs.push(r);
var pick=idxs.slice(0,games);
for(var t2=0;t2<40;t2++){
ag(idxs);
pick=idxs.slice(0,games);
var ok=true;
for(i=0;i<games&&ok;i++){var rd2=rounds[pick[i]];for(j=0;j<rd2.length;j++)if(lgOf[rd2[j][0]]===lgOf[rd2[j][1]]){ok=false;break;}}
if(ok)break;
}
var tbl={},
matches=[];
for(i=0;i<n;i++)tbl[ids[i]]={'i':ids[i],'n':nameOf[ids[i]],'s':strOf[ids[i]],'pts':0,'gf':0,'ga':0,'w':0,'d':0,'l':0};
for(i=0;i<pick.length;i++){
var rd3=rounds[pick[i]];
for(j=0;j<rd3.length;j++){
var H=rd3[j][0],A=rd3[j][1];
var gl=Math.sqrt((_lgStyle[lgOf[H]]||1)*(_lgStyle[lgOf[A]]||1));
var sim=_matchSim(strOf[H],strOf[A],gl);
var Th=tbl[H],Ta=tbl[A];
Th.gf+=sim.hg;Th.ga+=sim.ag;Ta.gf+=sim.ag;Ta.ga+=sim.hg;
if(sim.hg>sim.ag){Th.w++;Th.pts+=3;Ta.l++;}else if(sim.ag>sim.hg){Ta.w++;Ta.pts+=3;Th.l++;}else{Th.d++;Ta.d++;Th.pts++;Ta.pts++;}
matches.push({'home':nameOf[H],'homeId':H,'away':nameOf[A],'awayId':A,'hg':sim.hg,'ag':sim.ag});
}
}
var st=[];
for(var k in tbl)st.push(tbl[k]);
st.sort(function(x,y){if(y.pts!==x.pts)return y.pts-x.pts;if((y.gf-y.ga)!==(x.gf-x.ga))return(y.gf-y.ga)-(x.gf-x.ga);if(y.gf!==x.gf)return y.gf-x.gf;return x.i<y.i?-1:1;});
for(i=0;i<st.length;i++)st[i]["rank"]=i+1;
return{'standings':st,'matches':matches};
}


/* 当季赛程留存（仅内存：联赛轮次/杯赛签表/洲赛对阵，查询用，不入存档） */
/* 当季赛程/签表持久化在 a2.lgFx / a2.cupFx / a2.contFx(season=季序,data 紧凑格式) */

/* 单场淘汰签表（支持轮空），返回冠军、玩家征程与完整签表 */

function _cupBracket(cards,playerTid){
var n=cards.length,size=4;while(size<n)size*=2;
var alive=cards.slice().sort(function(a,b){return b.s-a.s;});
while(alive.length<size)alive.push(null);
var rn=_bracketNames(size),
path=[],all=[],rIdx=0;
while(alive.length>1){
var winners=[],cnt=alive.length,ties=[];
for(var m=0;m<cnt/2;m++){
var A=alive[m],B=alive[cnt-1-m],W=null,sc='',pk=null;
if(A&&B){
/* 单场淘汰：联赛风格几何平均，决赛中立场，加时+点球 */
var ko=_koSim(A.s,B.s,_glOf(A.lg,B.lg),cnt===2);
W=ko.won?A:B;
sc=ko.hg+'-'+ko.ag+(ko.pk?' (点球 '+ko.pk[0]+'-'+ko.pk[1]+')':(ko.et?' (加时)':''));
pk=ko.pk;
ties.push({'h':A.i,'a':B.i,'hg':ko.hg,'ag':ko.ag,'et':ko.et,'p':ko.pk,'w':W.i});
}else{
W=A||B;
ties.push({'h':W.i,'w':W.i,'b':1});
}
winners.push(W);
if(A&&B&&(A.i===playerTid||B.i===playerTid)){
var me=A.i===playerTid?A:B,fo=A.i===playerTid?B:A;
path.push({'round':rn[rIdx]||('第'+(rIdx+1)+'轮'),'opp':fo.n,'oppId':fo.i,'won':W.i===playerTid,'score':(me===A)?sc:_revScore(sc)});
}
}
all.push({'name':rn[rIdx]||('第'+(rIdx+1)+'轮'),'ties':ties});
alive=winners;rIdx++;
}
return{'champion':alive[0]?alive[0].i:null,'path':path,'all':all};
}


/* 洲际名额装配（上季榜+上季杯赛冠军，杯冠顺位下移、每联赛正赛上限 7） */

function _buildSlots(){
var direct={'ucl':[],'uel':[],'uecl':[],'acl':[],'ccl':[],'lib':[]},qp={'uclq':[],'uelq':[],'ueclq':[],'aclq':[],'cclq':[],'libq':[]};
var assigned={},
orders=a2["lastTables"],i;
for(var lgId in _lgSlots){
var cfg=_lgSlots[lgId],order=null;
if(orders&&orders[lgId])order=orders[lgId];
else{var tms=_lgTeamsOf(lgId).slice().sort(function(a,b){return _teamAbs(b)-_teamAbs(a);});order=[];for(i=0;i<tms.length;i++)order.push(tms[i]["id"]);}
var map={},qmap={};
['ucl','uel','uecl','acl','ccl','lib'].forEach(function(c){var arr=cfg[c]||[];for(var z=0;z<arr.length;z++)map[arr[z]]=c;});
['uclq','uelq','ueclq','aclq','cclq','libq'].forEach(function(c){var arr=cfg[c]||[];for(var z=0;z<arr.length;z++)qmap[arr[z]]=c;});
var cnt=0;
for(var pos=1;pos<=order.length;pos++){
var tid=order[pos-1];
if(map[pos]&&cnt<7){direct[map[pos]].push(_cardById(tid));assigned[tid]=map[pos];cnt++;}
else if(qmap[pos]&&!map[pos])qp[qmap[pos]].push(_cardById(tid));
}
}
var cups=a2["lastCups"]||{};
for(var lgId2 in _cupSlot){
var cs=cups[lgId2];if(!cs)continue;
var cfg2=_cupSlot[lgId2];
['cup','leagueCup'].forEach(function(kind){
var comp=cfg2[kind];if(!comp)return;
var tid=cs[kind==='cup'?'cup':'lgCup'];if(!tid)return;
var tObj=aj(tid);if(!tObj)return;
if(comp.slice(-1)==='q'){
var _ex=false;for(var _q2=0;_q2<qp[comp]["length"];_q2++)if(qp[comp][_q2].i===tid){_ex=true;break;}
if(!_ex)qp[comp].push(_cardById(tid));
return;
}
var lgOfT=ap(tObj),order2=orders&&orders[lgId2]?orders[lgId2]:null;
if(assigned[tid]){
var old=assigned[tid];
var _rk={'ucl':3,'uel':2,'uecl':1,'acl':3,'lib':3};
if((_rk[comp]||0)>(_rk[old]||0)){
/* 杯冠凭杯赛升级（如联赛第7的欧协资格→杯赛欧联）：移动该队，原资格顺延给联赛下一名 */
assigned[tid]=comp;
for(i=0;i<direct[old].length;i++)if(direct[old][i].i===tid){direct[old].splice(i,1);break;}
direct[comp].push(_cardById(tid));
if(order2)for(var pos2=1;pos2<=order2.length;pos2++){
var nx=order2[pos2-1];
if(!assigned[nx]){direct[old].push(_cardById(nx));assigned[nx]=old;break;}
}
}else if(old!==comp){
/* 杯冠已凭联赛拿到更优资格（如前四的欧冠）：保留联赛资格不降级，杯赛名额顺延给联赛下一名 */
if(order2)for(var pos2b=1;pos2b<=order2.length;pos2b++){
var nx2=order2[pos2b-1];
if(!assigned[nx2]){direct[comp].push(_cardById(nx2));assigned[nx2]=comp;break;}
}
}
}else{
var c7=0;
for(var t3 in assigned){var t3o=aj(t3);if(t3o&&ap(t3o)===lgOfT)c7++;}
if(c7<7){direct[comp].push(_cardById(tid));assigned[tid]=comp;}
else if(order2){
for(var pos3=order2.length;pos3>=1;pos3--){
var dp=order2[pos3-1];
if(assigned[dp]){
var oc=assigned[dp];
for(i=0;i<direct[oc].length;i++)if(direct[oc][i].i===dp){direct[oc].splice(i,1);break;}
qp[oc+'q'].push(_cardById(dp));
delete assigned[dp];
direct[comp].push(_cardById(tid));assigned[tid]=comp;
break;
}
}
}
}
});
}
for(var qk in qp)qp[qk]=qp[qk].filter(function(c){return !assigned[c.i];});
return{'direct':direct,'qp':qp,'taken':assigned};
}


/* 资格赛：1-2 轮两回合淘汰，池不足自动缩轮 */

function _qualify(need,pool){
if(need<=0||!pool||!pool.length)return{'winners':[],'path':null};
var _seen={},_uniq=[];
for(var _q3=0;_q3<pool["length"];_q3++)if(!_seen[pool[_q3].i]){_seen[pool[_q3].i]=1;_uniq.push(pool[_q3]);}
pool=_uniq;
var rounds=pool.length>=need*4?2:1;
var entrants=need*Math.pow(2,rounds);
if(pool.length<entrants){rounds=1;entrants=Math.min(pool.length-pool.length%2,need*2);}
if(entrants<2)return{'winners':[],'path':null};
var alive=pool.slice().sort(function(a,b){return b.s-a.s;}).slice(0,entrants);
var path=null,
ri=0;
while(alive.length>need){
var winners=[];
for(var m=0;m<alive.length/2;m++){
var A=alive[m],B=alive[alive.length-1-m];
var tie=_tieSim(A.s,B.s,_glOf(A.lg,B.lg));
var W=tie.won?A:B;
winners.push(W);
if(A.i===a2["teamId"]||B.i===a2["teamId"]){
if(!path)path=[];
var me=A.i===a2["teamId"]?A:B,fo=A.i===a2["teamId"]?B:A;
path.push({'round':'资格赛'+(rounds>1?(ri===0?'二':'一'):''),'opp':fo.n,'oppId':fo.i,'won':W.i===a2["teamId"],'score':_scoreTxt(tie,me===A)});
}
}
alive=winners;ri++;
}
return{'winners':alive,'path':path};
}


/* 单届洲际赛：瑞士轮 → 附加赛(9-24名) → 两回合淘汰，决赛单场 */

function _contComp(tag,cfg,direct,qPath,bz,bx){
var ph=_swissPhase(direct,cfg["games"]);
var st=ph["standings"];
var run={'comp':cfg["name"],'rounds':qPath?qPath.slice():[],'group':{'pos':0,'standings':[],'fullStandings':st,'matches':ph["matches"]},'age':a2["age"]};
var pIdx=-1;
for(var i=0;i<st.length;i++){run["group"]["standings"].push(st[i]["n"]);if(st[i]["i"]===a2["teamId"])pIdx=i;}
run["group"]["pos"]=pIdx>=0?pIdx+1:0;
var top8=st.slice(0,8),
po=st.slice(8,Math.min(24,st.length));
var playerOut=null,wPo=[];
for(var m2=0;m2<po.length/2;m2++){
var A=po[m2],B=po[po.length-1-m2];
var tie=_tieSim(A.s,B.s,_glOf(A.lg,B.lg)),W=tie.won?A:B;
wPo.push(W);
if(A.i===a2["teamId"]||B.i===a2["teamId"]){
var me=A.i===a2["teamId"]?A:B,fo=A.i===a2["teamId"]?B:A;
run["rounds"].push({'round':'附加赛','opp':fo.n,'oppId':fo.i,'won':W.i===a2["teamId"],'score':_scoreTxt(tie,me===A)});
if(!(W.i===a2["teamId"]))playerOut='附加赛';
}
}
wPo.sort(function(a,b){return a.rank-b.rank;});
var cur=[];
for(m2=0;m2<8&&m2<top8.length;m2++)cur.push([top8[m2],wPo[wPo.length-1-m2]]);
var rn=['十六强','八强','四强','决赛'],
ri=0,champion=null,allR=[];
while(cur.length>=1){
var next=[],ties=[];
for(m2=0;m2<cur.length;m2++){
var A2=cur[m2][0],B2=cur[m2][1],W2=null,sc='';
var pMe=A2.i===a2["teamId"]?A2:(B2.i===a2["teamId"]?B2:null);
var isFinal=cur.length===1;
if(isFinal&&pMe&&b3()){
var fo2=pMe===A2?B2:A2;
if(_aVPri("cont",0.55,{'comp':cfg["name"],'opp':fo2.n,'oppStr':fo2.s,'oppId':fo2.i,'_meS':pMe.s,'_aiCtx':{'t':'cont','tag':tag}})){
run["rounds"].push({'round':'决赛','opp':fo2.n,'oppId':fo2.i,'won':false,'score':''});
run["result"]='决赛';
ties.push({'h':pMe.i,'a':fo2.i,'pd':1});
allR.push({'name':'决赛','ties':ties});
a2["contFx"]["data"][tag]={'name':cfg["name"],'group':{'standings':st,'matches':_flatMs(ph["matches"])},'rounds':allR,'champion':null};
a2["_contRun"]=run;
return{'champion':null};
}
}
if(isFinal){
var ko2=_koSim(A2.s,B2.s,_glOf(A2.lg,B2.lg),true);
W2=ko2.won?A2:B2;sc=ko2.hg+'-'+ko2.ag+(ko2.pk?' (点球 '+ko2.pk[0]+'-'+ko2.pk[1]+')':(ko2.et?' (加时)':''));
ties.push({'h':A2.i,'a':B2.i,'sa':ko2.hg,'sb':ko2.ag,'p':ko2.pk,'w':W2.i});
}else{
var tie2=_tieSim(A2.s,B2.s,_glOf(A2.lg,B2.lg));
W2=tie2.won?A2:B2;sc=_scoreTxt(tie2,true);
ties.push({'h':A2.i,'a':B2.i,'sa':tie2["aggA"],'sb':tie2["aggB"],'p':tie2["pens"],'w':W2.i});
}
next.push(W2);
if(pMe){
var fo3=pMe===A2?B2:A2;
run["rounds"].push({'round':rn[ri]||'决赛','opp':fo3.n,'oppId':fo3.i,'won':W2.i===a2["teamId"],'score':(pMe===A2)?sc:_revScore(sc)});
if(!(W2.i===a2["teamId"]))playerOut=rn[ri]||'决赛';
}
}
allR.push({'name':rn[ri]||'决赛','ties':ties});
if(next.length===1){champion=next[0];break;}
cur=[];for(m2=0;m2<next.length;m2+=2)cur.push([next[m2],next[m2+1]]);
ri++;
}
a2["contFx"]["data"][tag]={'name':cfg["name"],'group':{'standings':st,'matches':_flatMs(ph["matches"])},'rounds':allR,'champion':champion?champion.i:null};
if(champion){
if(champion.i===a2["teamId"]){
run["result"]='冠军';
/* 青训期 _runWorld(null,null,null) 时 bz/bx 为 null：只记录历史不入生涯奖杯 */
if(bz)bz["trophies"].push(cfg["name"]+'冠军');
if(bx)a2["trophies"].push({'name':cfg["name"]+'冠军','age':a2["age"],'team':bx["name"]});
a2["cupRuns"].push(run);
}else if(pIdx>=0||playerOut){
run["result"]=playerOut?'止步'+playerOut:'联赛阶段出局';
a2["cupRuns"].push(run);
}
}
return{'champion':champion?champion.i:null};
}


/* 全部洲际赛 + 世俱杯（名额基于上季榜/上季杯冠） */

function _runConts(bz,bx,by){
a2["contHist"]=a2["contHist"]||[];
(function(){if(!a2["contFx"]||!a2["contFx"]["data"])return;
_archPush("contFxArch",a2["contFx"]["season"],_pkContData(a2["contFx"]["data"]));})();a2["contFx"]={'season':_fxSeasonLab(),'data':{}};
var sl=_buildSlots();
var usedAll={};
['ucl','uel','uecl','acl','ccl','lib'].forEach(function(tag){
var cfg=_contCfg[tag];
var direct=(sl["direct"][tag]||[]).filter(function(c){return !usedAll[c.i];});
direct.forEach(function(c){usedAll[c.i]=1;});
var need=cfg["size"]-direct.length;
var qPath=null;
if(need>0){
var q=_qualify(need,(sl["qp"][tag+'q']||[]).filter(function(c){return !usedAll[c.i];}));
qPath=q["path"];
if(qPath&&!qPath[qPath.length-1]["won"]){
a2["cupRuns"].push({'comp':cfg["name"]+'资格赛','rounds':qPath,'age':a2["age"],'result':'止步'+qPath[qPath.length-1]["round"]});
return;
}
direct=direct.concat(q["winners"]);
q["winners"].forEach(function(c){usedAll[c.i]=1;});
}else{
direct.sort(function(a,b){return b.s-a.s;});
}

/* 强制补齐/裁剪到配置规模：保证"8 种子+16 队附加赛"结构成立 */

var reg=tag==='acl'?'as':tag==='ccl'?'na':tag==='lib'?'sa':'eu';
if(direct.length<cfg["size"]){
var pool3=[];
for(var u3=0;u3<a0["TEAMS"]["length"];u3++){var tt=a0["TEAMS"][u3];if(_lgRegion[ap(tt)]===reg&&!usedAll[tt["id"]])pool3.push(tt);}
pool3.sort(function(a,b){return _teamAbs(b)-_teamAbs(a);});
for(var u2=0;direct.length<cfg["size"]&&u2<pool3.length;u2++)direct.push(_cardById(pool3[u2]["id"]));
}
direct.sort(function(a,b){return b.s-a.s;});
direct=direct.slice(0,
cfg["size"]);
direct.forEach(function(c){usedAll[c.i]=1;});
if(direct.length<8)return;
var res=_contComp(tag,cfg,direct,qPath,bz,bx);
if(res&&res["champion"]){a2["contHist"].push({'age':a2["age"],'comp':tag,'tid':res["champion"]});_devAdd(res["champion"],2,1);}
});
_runClubWC(bz,
bx);
}
function _runClubWC(bz,bx){
if(_natYr()!==0x2)return;
var pick={},cards=[],ucl=[],i;
for(i=a2["contHist"]["length"]-1;i>=0&&ucl.length<4;i--)if(a2["contHist"][i]["comp"]==='ucl'&&ucl.indexOf(a2["contHist"][i]["tid"])<0)ucl.push(a2["contHist"][i]["tid"]);
function add(tid){if(!pick[tid]&&aj(tid)){pick[tid]=1;cards.push(_cardById(tid));}}
for(i=0;i<ucl.length;i++)add(ucl[i]);
if(a2["lastTables"])for(var lgId in a2["lastTables"])add(a2["lastTables"][lgId][0]);
var all=a0["TEAMS"].slice().sort(function(a,
b){return _teamAbs(b)-_teamAbs(a);});
for(i=0;i<all.length&&cards.length<32;i++)add(all[i]["id"]);
if(cards.length<8)return;
var pIn=false;for(i=0;i<cards.length;i++)if(cards[i].i===a2["teamId"]){pIn=true;break;}
var res=_cupBracket(cards,
a2["teamId"]);
if(pIn){
var run={'comp':'世俱杯','rounds':res["path"],'age':a2["age"]};
if(res["path"].length&&res["path"][res["path"].length-1]["won"]){run["result"]='冠军';bz&&bz["trophies"]&&bz["trophies"].push('世俱杯冠军');a2["trophies"].push({'name':'世俱杯冠军','age':a2["age"],'team':(aj(a2["teamId"])||{"name":''})["name"]});}
else if(res["path"].length)run["result"]='止步'+res["path"][res["path"].length-1]["round"];
else run["result"]='止步三十二强';
a2["cupRuns"].push(run);
}
if(res&&res["champion"]){
if(a2["contFx"])a2["contFx"]["data"]["cwc"]={'name':'世俱杯','rounds':res["all"],'champion':res["champion"]};
a2["contHist"].push({'age':a2["age"],'comp':'cwc','tid':res["champion"]});
_devAdd(res["champion"],2.5,1);
}
}


/* 超级杯：上季联赛冠军 vs 上季杯赛冠军（同人则改联赛亚军），单场 */

function _runSuperCup(bz,bx,by){
var own=am[by["id"]]||by["id"],lgO=ak(own);
if(!lgO||!lgO["superCup"])return;
var order=a2["lastTables"]&&a2["lastTables"][own],
cups=a2["lastCups"]&&a2["lastCups"][own];
if(!order)return;
var champ=order[0],cupW=cups?cups["cup"]:null;
var other=cupW&&cupW!==champ?cupW:order[1];
if(!other||other===champ)return;
var A=aj(champ),
B=aj(other);if(!A||!B)return;
var _sc2=_koSim(_teamAbs(A),_teamAbs(B),_lgStyle[own]||1,true);
var winTid=_sc2.won?champ:other;
var scTxt=_sc2.hg+'-'+_sc2.ag+(_sc2.pk?' (点球 '+_sc2.pk[0]+'-'+_sc2.pk[1]+')':(_sc2.et?' (加时)':''));
if(a2["teamId"]!==champ&&a2["teamId"]!==other)return;
var meIsA=a2["teamId"]===champ;
var run={'comp':lgO["superCup"],'rounds':[{'round':'决赛','opp':meIsA?B.name:A.name,'oppId':meIsA?B.id:A.id,'won':winTid===a2["teamId"],'score':meIsA?scTxt:_revScore(scTxt)}],'age':a2["age"]};
if(winTid===a2["teamId"]){run["result"]='冠军';bz["trophies"].push(lgO["superCup"]+'冠军');a2["trophies"].push({'name':lgO["superCup"]+'冠军','age':a2["age"],'team':bx["name"]});}
else run["result"]='止步决赛';
a2["cupRuns"].push(run);
}


/* 国内杯赛：全部联赛真实规模（顶级+次级），冠军入 lastCups */

function _runCups(bz,bx,by){
a2["lastCups"]=a2["lastCups"]||{};
(function(){if(!a2["cupFx"]||!a2["cupFx"]["data"])return;
_archPush("cupFxArch",a2["cupFx"]["season"],_pkCupData(a2["cupFx"]["data"]),30);})();a2["cupFx"]={'season':_fxSeasonLab(),'data':{}};
var owners={};
for(var i=0;i<a0["LEAGUES"]["length"];i++){var lg=a0["LEAGUES"][i];owners[am[lg["id"]]||lg["id"]]=1;}
for(var own in owners){
var lgO=ak(own);if(!lgO)continue;
var cupList=[];
if(lgO["cup"])cupList.push({'name':lgO["cup"],'key':'cup'});
if(lgO["leagueCup"])cupList.push({'name':lgO["leagueCup"],'key':'lgCup'});
for(var ci=0;ci<cupList.length;ci++){
var field=_lgTeamsOf(own);
for(var k in am)if(am[k]===own)field=field.concat(_lgTeamsOf(k));
var cards=_cards(field);
var res=_cupBracket(cards,a2["teamId"]);
a2["cupFx"]["data"][cupList[ci]["name"]]={'champion':res["champion"],'all':res["all"],'n':cards.length};a2["lastCups"][own]=a2["lastCups"][own]||{};
a2["lastCups"][own][cupList[ci]["key"]]=res["champion"];
_devAdd(res["champion"],0.8,1);
var pIn=false;for(var z2=0;z2<cards.length;z2++)if(cards[z2].i===a2["teamId"]){pIn=true;break;}
/* 青训期 bz/bx 为空：只产出签表与冠军，不记入生涯奖杯 / 杯赛历程 */
if(pIn&&bz&&bx){
var run={'comp':cupList[ci]["name"],'rounds':res["path"],'age':a2["age"]};
if(res["path"].length&&res["path"][res["path"].length-1]["won"]){run["result"]='冠军';bz["trophies"].push(cupList[ci]["name"]+'冠军');a2["trophies"].push({'name':cupList[ci]["name"]+'冠军','age':a2["age"],'team':bx["name"]});}
else if(res["path"].length)run["result"]='止步'+res["path"][res["path"].length-1]["round"];
else run["result"]='止步'+(_bracketNames(cards.length)[0]||'第一轮');
a2["cupRuns"].push(run);
}
}
}
}


/* 升降级（真实榜）+ 升降 teamDev bonus + rep 重新归位 */

function _moveTeam(tid,toLg,up,idx){
a2["leagueOf"]=a2["leagueOf"]||{};
a2["leagueOf"][tid]=toLg;
a2["repOf"]=a2["repOf"]||{};
a2["repOf"][tid]=up?(idx===0?1:0):(idx===0?5:4);
/* 降班不再额外扣 dev（rep 掉档已是足够惩罚，双重惩罚会螺旋下坠）；升班保留 +1 */
if(up)_devAdd(tid,1);
/* 记录升降级（供世界面板在对应赛季积分榜上打 升级/降级 标）。s 用该次积分榜所属世界的
   赛季标签 _fxLab（_lgAll 写入），而不是当前 lgFx.season——大场面推迟 _promoReleg 时后者已前移一年 */
if(a2["lgFx"]&&a2["lgFx"]["season"]!=null){a2["lgMoves"]=a2["lgMoves"]||[];a2["lgMoves"]["push"]({'s':a2["_fxLab"]!=null?a2["_fxLab"]:a2["lgFx"]["season"],'tid':tid,'dir':up?'up':'down'});}
}
/* 里程碑结算事件（职业期）：季末在 _promoReleg 末尾由 _milestoneScan() 扫描一次。
   此处数据全部定稿：_lgFinalRefresh 已写 bz.leaguePos、bAw 已发奖、_promoReleg 已定升降名单。
   五类：荣誉（首座/横扫/金球）、奖项（联赛金靴/最佳/欧洲金靴/金手套/亚洲足球先生）、
        纪录（进球/助攻/零封/出场/国家队/奖杯数/收入）、身份（首转会/第三家/突破90）、时代（豪门·死敌降级）。
   扫描只做条件判断、不掷骰（不打乱随机序列）；命中写"一次锁存"flag。
   本季触发的里程碑只取最高优先级一条，由 _emitReportOrMilestone 在当季报告前先播；
   其余低优先级直接丢弃、绝不排队延后（避免以后重夺时仍播"第一次"文案）。 */
var _MILE_PRI={'mile_wc':1,'mile_ballon':2,'mile_ballon3':3,'mile_ballon_streak2':4,'mile_ballon_streak3':5,
'mile_wc_final':6,'mile_wc_sf':7,'mile_wc_qf':8,'mile_wc_r16':9,'mile_sweep':10,'mile_dom_treble':11,'mile_asia':12,
'mile_first_ucl':13,'mile_ucl2':14,'mile_ucl3':15,'mile_ucl5':16,'mile_first_cont':17,
'mile_first_league':18,'mile_first_cup':19,'mile_first_super':20,'mile_first_youth':21,
'mile_euro_boot':22,'mile_afcpoy':23,'mile_glove':24,'mile_league_boot':25,'mile_league_mvp':26,
'mile_boot3':27,'mile_boot5':28,'mile_lg_streak3':29,'mile_lg_streak5':30,'mile_lg_weak':31,
'mile_goal1000':32,'mile_goal700':33,'mile_goal500':34,'mile_goal300':35,'mile_goal200':36,'mile_goal100':37,
'mile_goal50':38,'mile_goals40':39,'mile_goals30':40,'mile_goals20':41,'mile_streak20':42,'mile_goals50':42.5,
'mile_assist300':43,'mile_assist200':44,'mile_assist100':45,'mile_assist15':46,'mile_assist20s':46.5,'mile_assist30s':46.7,
'mile_cs300':47,'mile_cs200':48,'mile_cs100':49,
'mile_apps1000':50,'mile_apps700':51,'mile_apps500':52,'mile_apps300':53,
'mile_caps200':54,'mile_caps150':55,'mile_caps100':56,'mile_caps50':57,
'mile_trophy50':58,'mile_trophy40':59,'mile_trophy30':60,'mile_trophy20':61,'mile_trophy10':62,
'mile_first_trophy':63,'mile_earn1e8':64,'mile_transfer1':65,'mile_clubs3':66,'mile_ovr90':67,
'mile_promote':68,'mile_giant_down':69,'mile_releg':70,'mile_rival_down':71};
function _milestoneScan(bz){
  if(!bz||"career"!==a2["phase"]||!a2["teamId"])return;
  var _f=a2["flags"],_age=bz["age"],_aw=a2["awards"]||[],_tr=a2["trophies"]||[],_new=[],_i,_nm;
  var _clubId=a2["teamId"],_clubT=aj(_clubId),_clubName=_clubT?_clubT["name"]:null;
  /* 俱乐部成就类里程碑：换队后从新俱乐部重新算（清掉锁存与 usedEvents，让它们能再次触发；
     统计侧也只算当前俱乐部期间拿到的冠军） */
  if(_f["_mileClubSeen"]!=null&&_f["_mileClubSeen"]!==_clubId){
    var _CM={'mile_first_ucl':"_mileFirstUcl",'mile_ucl2':"_mileUcl2",'mile_ucl3':"_mileUclTeam",'mile_ucl5':"_mileUcl5",'mile_first_league':"_mileFirstLg",'mile_lg_streak3':"_mileLgS3",'mile_lg_streak5':"_mileLgS5"};
    var _ue=a2["usedEven"+"ts"]||{};
    for(var _cm in _CM){delete _f[_CM[_cm]];if(_ue[_cm]!=null)delete _ue[_cm];}
  }
  _f["_mileClubSeen"]=_clubId;
  a2["_mileAge"]=_age;   /* 本季里程碑所属赛季年龄（结算后 a2.age 已 +1，记录时用它纠偏） */
  var _thisAw=[],_thisTr=[];
  for(_i=0x0;_i<_aw["length"];_i++)if(_aw[_i]["age"]===_age)_thisAw.push(_aw[_i]["name"]);
  for(_i=0x0;_i<_tr["length"];_i++)if(_tr[_i]["age"]===_age)_thisTr.push(_tr[_i]["name"]);
  var _AW=a0["AWARDS"],_thisBallon=!0x1,_ballonN=0x0;
  for(_i=0x0;_i<_aw["length"];_i++)if(_aw[_i]["name"]===_AW["ballon"]){_ballonN++;if(_aw[_i]["age"]===_age)_thisBallon=!0x0;}
  /* 名称集合（联赛/洲际/杯/超级杯/青年队），只建一次并缓存 */
  var _S=a2["_mileSets"];
  if(!_S){
    _S={'lg':{},'cont':{},'cup':{},'sup':{},'youth':{}};
    for(_i=0x0;_i<a0["LEAGUES"]["length"];_i++){var _L=a0["LEAGUES"][_i];
      _S['lg'][_L["name"]+'冠军']=0x1;
      if(_L["cup"])_S['cup'][_L["cup"]+'冠军']=0x1;
      if(_L["leagueCup"])_S['cup'][_L["leagueCup"]+'冠军']=0x1;
      if(_L["superCup"])_S['sup'][_L["superCup"]+'冠军']=0x1;}
    for(var _tg in _contCfg)if(_contCfg[_tg]["name"]!=='欧冠')_S['cont'][_contCfg[_tg]["name"]+'冠军']=0x1;
    for(var _yk in _yNT)_S['youth'][_yNT[_yk]["comp"]+'冠军']=0x1;
    a2["_mileSets"]=_S;
  }
  function _once(_id,_flag,_val){if(_f[_flag]==null){_f[_flag]=_val;_new.push(_id);}}
  function _ladder(_val,_pairs){var _k,_p,_bestT=null,_bestId=null;
    for(_k=0x0;_k<_pairs["length"];_k++){_p=_pairs[_k];
      if(_f[_p[0x2]]==null&&_val>=_p[0x0]){_f[_p[0x2]]=0x1;if(_bestT==null||_p[0x0]>_bestT){_bestT=_p[0x0];_bestId=_p[0x1];}}}
    if(_bestId!=null)_new.push(_bestId);}
  /* ── 荣誉 / 奖项 ── */
  if(_thisBallon&&_ballonN===0x1)_once("mile_ballon","_mileBallon1",0x1);
  if(_thisBallon&&_ballonN===0x3)_once("mile_ballon3","_mileBallon3",0x1);
  if(_thisAw["indexOf"](_AW["boot"])>=0x0)_once("mile_euro_boot","_mileBoot",0x1);
  if(_thisAw["indexOf"](_AW["afcpoy"])>=0x0)_once("mile_afcpoy","_mileAfc",0x1);
  if(_thisAw["indexOf"](_AW["glove"])>=0x0)_once("mile_glove","_mileGlove",0x1);
  var _lgB=null,_lgM=null;
  for(_i=0x0;_i<_thisAw["length"];_i++){_nm=_thisAw[_i];
    if(_lgB==null&&_nm!==_AW["boot"]&&/金靴$/.test(_nm))_lgB=_nm;
    if(_lgM==null&&/最佳球员$/.test(_nm))_lgM=_nm;}
  if(_lgB)_once("mile_league_boot","_mileLgBoot",_lgB);
  if(_lgM)_once("mile_league_mvp","_mileLgMvp",_lgM);
  /* ── 本季奖杯分类 → 首座各类 ── */
  var _cLg=null,_cCont=null,_cCup=null,_cSup=null,_cYouth=null,_hasUcl=!0x1,_hasWC=!0x1;
  for(_i=0x0;_i<_thisTr["length"];_i++){_nm=_thisTr[_i];
    if(/世界杯冠军/["test"](_nm))_hasWC=!0x0;
    if(_cLg==null&&_S['lg'][_nm])_cLg=_nm;
    if(_cCont==null&&_S['cont'][_nm])_cCont=_nm;
    if(_cCup==null&&_S['cup'][_nm])_cCup=_nm;
    if(_cSup==null&&_S['sup'][_nm])_cSup=_nm;
    if(_cYouth==null&&_S['youth'][_nm])_cYouth=_nm;}
  /* 本季欧冠须是"当前俱乐部"拿的（换队后旧队那座不算） */
  for(_i=0x0;_i<_tr["length"];_i++){var _ttl=_tr[_i];if(_ttl["age"]===_age&&/欧冠/["test"](_ttl["name"])&&(!_clubName||_ttl["team"]===_clubName)){_hasUcl=!0x0;break;}}
  if(_thisTr["length"])_once("mile_first_trophy","_mileFirstTr",_thisTr[0x0]);
  if(_cLg)_once("mile_first_league","_mileFirstLg",_cLg);
  if(_cCont)_once("mile_first_cont","_mileFirstCont",_cCont);
  if(_cCup)_once("mile_first_cup","_mileFirstCup",_cCup);
  if(_cSup)_once("mile_first_super","_mileFirstSuper",_cSup);
  if(_cYouth)_once("mile_first_youth","_mileFirstYouth",_cYouth);
  if(_hasUcl)_once("mile_first_ucl","_mileFirstUcl",0x1);
  if(_hasWC)_once("mile_wc","_mileWC",0x1);
  if(_cLg&&_hasUcl&&_thisBallon)_once("mile_sweep","_mileSweep",0x1);
  if(_cLg&&_cCup&&_cSup)_once("mile_dom_treble","_mileDomTr",0x1);
  /* ── 欧冠累计/连庄 ── */
  var _u=[];for(_i=0x0;_i<_tr["length"];_i++)if(/欧冠/["test"](_tr[_i]["name"])&&(!_clubName||_tr[_i]["team"]===_clubName))_u.push(_tr[_i]);
  _u["sort"](function(x,y){return x["age"]-y["age"];});
  var _un=_u["length"];
  if(_hasUcl&&_un>=0x2)_once("mile_ucl2","_mileUcl2",0x1);
  if(_hasUcl&&_un>=0x5)_once("mile_ucl5","_mileUcl5",0x1);
  if(_un>=0x3&&_f["_mileUclTeam"]==null){var _u3=_u[_un-0x1],_u2=_u[_un-0x2],_u1=_u[_un-0x3];
    if(_u3["age"]===_age&&_u2["age"]===_age-0x1&&_u1["age"]===_age-0x2&&_u3["team"]&&_u3["team"]===_u2["team"]&&_u2["team"]===_u1["team"]){_f["_mileUclTeam"]=_u3["team"];_new.push("mile_ucl3");}}
  /* ── 黑马夺冠 / 升降级 ── */
  if(bz["leaguePos"]===0x1&&a0["ROLES"][a2["role"]]["rank"]>=0x2&&(bz["apps"]||0x0)>=0x13&&_f["_mileWeakClub"]==null){
    var _tm=aj(a2["teamId"]),_lgd=ak(bz["leagueId"]);
    if(_tm&&_lgd&&(_tm["rep"]||0x0)<=(_lgd["rep"]||0x0)-0x2){_f["_mileWeakClub"]=_tm["name"];_f["_mileWeakLg"]=_lgd["name"];_new.push("mile_lg_weak");}}
  var _mv=String(bz["move"]||'');
  if(0x0===_mv["indexOf"]("升上"))_once("mile_promote","_mileUpLg",_mv["substr"](0x2));
  else if(0x0===_mv["indexOf"]("降入"))_once("mile_releg","_mileDownLg",_mv["substr"](0x2));
  /* ── 世界杯名次 / 亚洲杯（本季 natRuns） ── */
  var _wcSc=0x0,_asiaWin=!0x1,_nr=a2["natRuns"]||[];
  for(_i=0x0;_i<_nr["length"];_i++){if(_nr[_i]["age"]!==_age)continue;
    if(_nr[_i]["comp"]==="世界杯")_wcSc=Math["max"](_wcSc,_natFormVal(_nr[_i]["stage"],"wc"));
    if(_nr[_i]["comp"]==="亚洲杯"&&_nr[_i]["stage"]==="冠军")_asiaWin=!0x0;}
  _ladder(_wcSc,[[0.5,"mile_wc_r16","_mileWcR16"],[0x1,"mile_wc_qf","_mileWcQf"],[0x2,"mile_wc_sf","_mileWcSf"],[0x3,"mile_wc_final","_mileWcFinal"]]);
  if(_asiaWin)_once("mile_asia","_mileAsia",0x1);
  /* ── 连续金球 / 多个金靴 / 联赛连冠 ── */
  var _bAges=[];for(_i=0x0;_i<_aw["length"];_i++)if(_aw[_i]["name"]===_AW["ballon"])_bAges.push(_aw[_i]["age"]);
  var _bStk=0x0;for(var _ba=_age;;_ba--){if(_bAges["indexOf"](_ba)<0x0)break;_bStk++;}
  _ladder(_bStk,[[0x2,"mile_ballon_streak2","_mileBallonS2"],[0x3,"mile_ballon_streak3","_mileBallonS3"]]);
  var _bootN=0x0;for(_i=0x0;_i<_aw["length"];_i++)if(/金靴$/.test(_aw[_i]["name"]))_bootN++;
  _ladder(_bootN,[[0x3,"mile_boot3","_mileBootN3"],[0x5,"mile_boot5","_mileBootN5"]]);
  var _lgNm=null,_lgd=ak(bz["leagueId"]);if(_lgd)_lgNm=_lgd["name"];
  var _lgStk=0x0;if(_lgNm){for(var _ca=_age;_ca>=_age-0x9;_ca--){var _hit=!0x1;
    for(_i=0x0;_i<_tr["length"];_i++)if(_tr[_i]["age"]===_ca&&_tr[_i]["name"]===_lgNm+"冠军"&&(!_clubName||_tr[_i]["team"]===_clubName)){_hit=!0x0;break;}
    if(!_hit)break;_lgStk++;}}
  _ladder(_lgStk,[[0x3,"mile_lg_streak3","_mileLgS3"],[0x5,"mile_lg_streak5","_mileLgS5"]]);
  /* ── 纪录阶梯（同季跨多档只播最高一档） ── */
  _ladder(bz["goals"]||0x0,[[0x14,"mile_goals20","_mileG20"],[0x1e,"mile_goals30","_mileG30"],[0x28,"mile_goals40","_mileG40"],[0x32,"mile_goals50","_mileG50s"]]);
  _ladder(bz["assists"]||0x0,[[0xf,"mile_assist15","_mileA15"],[0x14,"mile_assist20s","_mileA20s"],[0x1e,"mile_assist30s","_mileA30s"]]);
  _ladder(a2["totals"]["goals"]||0x0,[[0x32,"mile_goal50","_mileG50"],[0x64,"mile_goal100","_mileG100"],[0xc8,"mile_goal200","_mileG200"],[0x12c,"mile_goal300","_mileG300"],[0x1f4,"mile_goal500","_mileG500"],[0x2bc,"mile_goal700","_mileG700"],[0x3e8,"mile_goal1000","_mileG1000"]]);
  _ladder(a2["totals"]["assists"]||0x0,[[0x64,"mile_assist100","_mileA100"],[0xc8,"mile_assist200","_mileA200"],[0x12c,"mile_assist300","_mileA300"]]);
  _ladder(a2["totals"]['cs']||0x0,[[0x64,"mile_cs100","_mileCS100"],[0xc8,"mile_cs200","_mileCS200"],[0x12c,"mile_cs300","_mileCS300"]]);
  _ladder(a2["totals"]["apps"]||0x0,[[0x12c,"mile_apps300","_mileApps300"],[0x1f4,"mile_apps500","_mileApps500"],[0x2bc,"mile_apps700","_mileApps700"],[0x3e8,"mile_apps1000","_mileApps1000"]]);
  _ladder(a2["caps"]||0x0,[[0x32,"mile_caps50","_mileCap50"],[0x64,"mile_caps100","_mileCap100"],[0x96,"mile_caps150","_mileCap150"],[0xc8,"mile_caps200","_mileCap200"]]);
  _ladder(_tr["length"],[[0xa,"mile_trophy10","_mileTr10"],[0x14,"mile_trophy20","_mileTr20"],[0x1e,"mile_trophy30","_mileTr30"],[0x28,"mile_trophy40","_mileTr40"],[0x32,"mile_trophy50","_mileTr50"]]);
  _ladder(a2["careerEarnings"]||0x0,[[0x2710,"mile_earn1e8","_mileEarn"]]);
  /* 连续 3 季联赛 20+（bz 可能已/未在 seasons 里，统一排除 bz 后取前两季） */
  var _ss=a2["seasons"]||[],_prev=[];
  for(_i=_ss["length"]-0x1;_i>=0x0&&_prev["length"]<0x2;_i--)if(_ss[_i]!==bz)_prev.push(_ss[_i]);
  if(_prev["length"]>=0x2&&(bz["goals"]||0x0)>=0x14&&(_prev[0x0]["goals"]||0x0)>=0x14&&(_prev[0x1]["goals"]||0x0)>=0x14)_once("mile_streak20","_mileStreak20",0x1);
  /* ── 身份 ── */
  if((a2["clubsPlayed"]||[])["length"]>=0x2)_once("mile_transfer1","_mileTrans",0x1);
  if((a2["clubsPlayed"]||[])["length"]>=0x3)_once("mile_clubs3","_mileClubs3",0x1);
  if((a2["maxOvr"]||0x0)>=0x5a)_once("mile_ovr90","_mileOvr90",0x1);
  /* ── 时代：本季降级名单里的豪门 / 死敌 ── */
  var _nq=a2["_newsQ"]||[],_dbyL=_dby[a2["teamId"]]||[],_rl,_rt,_jj;
  for(_i=0x0;_i<_nq["length"];_i++){if(_nq[_i]["t"]!=="releg")continue;
    _rl=_nq[_i]["tid"];if(_rl===a2["teamId"])continue;_rt=aj(_rl);
    if(_rt&&(_rt["rep"]||0x0)>=0x4&&_f["_mileGiant"]==null){_f["_mileGiant"]=_rt["name"];_new.push("mile_giant_down");}
    if(_f["_mileRival"]==null)for(_jj=0x0;_jj<_dbyL["length"];_jj++)if(_dbyL[_jj][0x0]===_rl){_f["_mileRival"]=(_rt&&_rt["name"])||"死敌";_new.push("mile_rival_down");break;}}
  /* ── 不排队、不延后：本季触发的里程碑里只留优先级最高的一条，其余直接丢弃 ──
     低优先级的不再堆积到以后（否则会出现"第二年又夺冠、文案却仍是第一次夺冠"）。
     连同上一次扫描未播的残留一起清掉：到了但没赶上优先级，就作废。 */
  var _q=a2["_mileQ"]=[],_best=null,_bp=0x63;
  for(_i=0x0;_i<_new["length"];_i++){
    if((a2["usedEven"+"ts"]||{})[_new[_i]])continue;
    var _pp=_MILE_PRI[_new[_i]]||0x63;
    if(_pp<_bp){_bp=_pp;_best=_new[_i];}
  }
  if(_best!=null)_q.push(_best);
}
/* 里程碑补位：仅在 _fireForced() 未命中（本季无其它强制事件）时调用；按优先级取一条。 */
function _fireMilestone(){
  var _q=a2["_mileQ"];
  if(!_q||!_q["length"])return!0x1;
  var _st=a2["_mileRep"]||0x0;
  if(a2["_mileFired"]===_st)return!0x1;   /* 每份赛季报告之间最多一条（结算前播） */
  _q["sort"](function(x,y){return (_MILE_PRI[x]||0x63)-(_MILE_PRI[y]||0x63);});
  for(var _i=0x0;_i<_q["length"];_i++){
    var _id=_q[_i],_def=_evById(_id);
    if(!_def||(a2["usedEven"+"ts"]||{})[_id]){_q["splice"](_i,0x1);_i--;continue;}
    if(_def["when"]&&!_def["when"](aA()))continue;
    _q["splice"](_i,0x1);a2["_mileFired"]=_st;
    _matOpts(_def);_markEvent(_id,_def);
    a2["pending"]={'type':"forced",'eventId':_id,'descText':_descOf(_def),'age':(a2["_mileAge"]!=null?a2["_mileAge"]:a2["age"])};
    return!0x0;
  }
  return!0x1;
}
/* 赛季报告与里程碑的先后：里程碑（本季最高优先级、无队列）先播，报告随后。
   这样里程碑只可能出现在"它发生的那个赛季"，不会延后到以后。 */
function _emitReportOrMilestone(_recs){
  if(_recs==null||typeof _recs["length"]!=="number")return;   /* 非赛季数组（如 aW 的中途返回）不当作报告 */
  a2["_mileRepPending"]=_recs;
  if(_fireMilestone())return;              /* 里程碑先播；_mileRepPending 留到它结算后再出报告 */
  a2["_mileRepPending"]=null;
  a2["_mileRep"]=(a2["_mileRep"]||0x0)+0x1;
  a2["pending"]={'type':"report",'recs':_recs};
}
function _promoReleg(bz,
bx,by){
if(!a2["_worldRan"])return;
a2["_worldRan"]=false;
var orders=a2["lastTables"];
if(!orders)return;
a2["_newsQ"]=a2["_newsQ"]||[];
for(var tl in _relegZone){
var z=_relegZone[tl],down=ao[tl],order=orders[tl];
if(!down||!order)continue;
for(var p=z[0];p<=z[1]&&p<=order.length;p++){
_moveTeam(order[p-1],down,false,p-z[0]);
a2["_newsQ"]["push"]({'t':'releg','tid':order[p-0x1],'from':tl,'to':down});
if(a2["teamId"]===order[p-1]&&bz)bz["move"]='降入'+ak(down)["name"];
}
}
for(var sl in _promoAuto){
var up=_promoAuto[sl],to=am[sl],order2=orders[sl];
if(!to||!order2)continue;
for(var p2=0;p2<up.length&&p2<order2.length;p2++){
_moveTeam(order2[p2],to,true,p2);
/* 升级新闻只挑重点：主角队 / 升入五大顶级联赛 / 弱队(Rep<=1)奇迹升入Rep>=4联赛 */
if(a2["teamId"]===order2[p2]||ak(to)["rep"]>=0x5||((aj(order2[p2])||{"rep":9})["rep"])<=0x1&&ak(to)["rep"]>=0x4)a2["_newsQ"]["push"]({'t':'promo','tid':order2[p2],'from':sl,'to':to});
if(a2["teamId"]===order2[p2]&&bz)bz["move"]='升上'+ak(to)["name"];
}
}
for(var sl2 in _promoPlayoff){
var zone=_promoPlayoff[sl2],to2=am[sl2],order3=orders[sl2];
if(!to2||!order3)continue;
var seeds=[];
for(var p3=zone[0];p3<=zone[1]&&p3<=order3.length;p3++)seeds.push(_cardById(order3[p3-1]));
if(seeds.length<4)continue;
var f1=_poOne(seeds[0],seeds[3]),f2=_poOne(seeds[1],seeds[2]);var pIn=a2["teamId"]&&(f1.i===a2["teamId"]||f2.i===a2["teamId"]);
var done=false;
if(pIn&&b3()){
var meC=f1.i===a2["teamId"]?f1:f2,foC=f1.i===a2["teamId"]?f2:f1;
if(_aVPri("promo",0.55,{'comp':ak(sl2)["name"]+'升级附加赛决赛','opp':foC.n,'oppStr':foC.s,'counterTid':foC.i,'counterTo':to2,'fromLeague':sl2,'_aiCtx':{'t':'promo','f1':{'i':f1["i"],'s':f1["s"],'lg':f1["lg"]},'f2':{'i':f2["i"],'s':f2["s"],'lg':f2["lg"]},'to2':to2}})){
done=true;
}
}
if(!done){
var wC=_poOne(f1,f2,true);
_moveTeam(wC.i,to2,true,2);
if(a2["teamId"]===wC.i||ak(to2)["rep"]>=0x5||((aj(wC.i)||{"rep":9})["rep"])<=0x1&&ak(to2)["rep"]>=0x4)a2["_newsQ"]["push"]({'t':'promo','tid':wC.i,'from':sl2,'to':to2});
if(a2["teamId"]===wC.i&&bz)bz["move"]='升上'+ak(to2)["name"];
}
}
var _nqL,_nqO,_nqSeen={};
for(_nqL in _relegZone){_nqO=orders[_nqL];if(_nqO&&_nqO["length"]){_nqSeen[_nqL]=0x1;a2["_newsQ"]["push"]({'t':'lgchamp','tid':_nqO[0x0],'lg':_nqL,'tid2':_nqO["length"]>0x1?_nqO[0x1]:null});}}
if(a2["leagueId"]&&!_nqSeen[a2["leagueId"]]&&orders[a2["leagueId"]]&&orders[a2["leagueId"]]["length"])a2["_newsQ"]["push"]({'t':'lgchamp','tid':orders[a2["leagueId"]][0x0],'lg':a2["leagueId"]});
_milestoneScan(bz);
}
function _poOne(x,
y,neu){
var ko=_koSim(x.s,y.s,_glOf(x.lg,y.lg),!!neu);
if(ko.pk)return ko.won?x:y;
return ko.won?x:y;
}


/* 世界引擎总入口（每赛季一次）：dev结算 → 洲际 → 超级杯 → 全联赛 → 国内杯赛 */

function _runWorld(bz,bx,by){
/* 青训期(bx/by 为空)世界照常演化:全 AI 模拟,无玩家耦合;职业期额外产出玩家行 */
a2["_lgRow"]=null;
var pro=!!(bx&&by);
if(pro)a2["_worldRan"]=false;
_devTick();
_runConts(bz,bx,by);
if(pro)_runSuperCup(bz,bx,by);
var world=_lgAll();
/* 各联赛冠军实力加成（所有联赛，不只玩家联赛）：与连冠重建债 hang 对冲，避免独大豪门被纯惩罚 */
for(var _wl in world){var _wt=world[_wl];if(_wt&&_wt.length)_devAdd(_wt[0x0].i,2,1);}
if(pro){
var tbl=world[by["id"]];
if(tbl)for(var i=0;i<tbl.length;i++)if(tbl[i].i===a2["teamId"]){a2["_lgRow"]=tbl[i];break;}
}
/* 青训期同样产出国内杯赛：世界面板「杯赛」需要，但 bz/bx 为空不记生涯 */
_runCups(bz,bx,by);
if(pro)a2["_worldRan"]=!0x0;
}