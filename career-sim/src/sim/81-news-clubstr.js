// ---- part:12 | 新闻模块 + 球队绝对强度/卡片 ----


/* ── 新闻模块：赛季结算时生成一批（纯风味，主要新闻带微量fx，限幅在此执行） ── */
function _newsFx(o){
var fl=a2["flags"];
if(o["dev"]&&o["dev"]["tid"])_devAdd(o["dev"]["tid"],o["dev"]["v"]);
if(o["devList"])for(var i=0;i<o["devList"]["length"];i++)_devAdd(o["devList"][i]["tid"],o["devList"][i]["v"]);
if(o["wage"]){fl["_wageMul"]=Math.max(0.95,Math.min(1.05,(fl["_wageMul"]||0x1)+o["wage"]));}
if(o["nat"]){
if(!a2["_natStrMap"]){var m={};for(var j=0;j<NATS["length"];j++)m[NATS[j]["i"]]=NATS[j]["s"];a2["_natStrMap"]=m;}
a2["_natStrMap"][o["nat"]["nid"]]=Math.round(a2["_natStrMap"][o["nat"]["nid"]]+o["nat"]["v"]);}
if(o["fame"])a2["fame"]=Math.max(0,Math.min(0x64,(a2["fame"]||0)+o["fame"]));
if(o["gx"])a2["guanxi"]=Math.max(0,Math.min(0x64,(a2["guanxi"]||0)+o["gx"]));
}
function _newsFactCollect(){
/* 实况素材：大赛/洲际杯冠军(本季 natFx/contFx) + 联赛冠军升降(_promoReleg 收集于 _newsQ) */
var _fq=a2["_newsQ"]=a2["_newsQ"]||[];
try{
if(a2["natFx"]&&a2["natFx"]["data"])for(var _nk3 in a2["natFx"]["data"]){var _nd3=a2["natFx"]["data"][_nk3];
/* 交互决赛未打时跳过：签表里的决赛比分只是AI预演，冠军要等真打完 */
if((_nk3==='wc'&&a2["_natWC"])||(_nk3==='asia'&&a2["_natAsia"]))continue;
var _nch2=_nd3?_nd3["champion"]:null;
if(!_nch2&&_nd3&&_nd3["rounds"]&&_nd3["rounds"]["length"]){var _fm3=_nd3["rounds"][_nd3["rounds"]["length"]-0x1]["matches"];
if(_fm3&&_fm3["length"]){var _m3=_fm3[0x0];_nch2=(_m3["pens"]&&_m3["pens"]["length"]>=0x2)?(_m3["pens"][0x0]>=_m3["pens"][0x1]?_m3["homeId"]:_m3["awayId"]):(_m3["hg"]>=_m3["ag"]?_m3["homeId"]:_m3["awayId"]);}}
var _nru=null;if(_nch2&&_nd3["rounds"]&&_nd3["rounds"]["length"]){var _fm4=_nd3["rounds"][_nd3["rounds"]["length"]-0x1]["matches"];
if(_fm4&&_fm4["length"]){var _m4=_fm4[0x0];_nru=_m4["homeId"]===_nch2?_m4["awayId"]:_m4["homeId"];}}
if(_nch2)_fq["push"]({'t':'nat','nid':_nch2,'nid2':_nru,'tag':_nk3});}
if(a2["contFx"]&&a2["contFx"]["data"])for(var _ck4 in a2["contFx"]["data"]){var _cd4=a2["contFx"]["data"][_ck4];
var _cru=null;if(_cd4&&_cd4["rounds"]&&_cd4["rounds"]["length"]){var _ct2=_cd4["rounds"][_cd4["rounds"]["length"]-0x1]["ties"];
if(_ct2&&_ct2["length"]&&_ct2[0x0]["w"]===_cd4["champion"])_cru=_ct2[0x0]["h"]===_cd4["champion"]?_ct2[0x0]["a"]:_ct2[0x0]["h"];}
if(_cd4&&_cd4["champion"])_fq["push"]({'t':'cont','tid':_cd4["champion"],'tid2':_cru,'comp':_cd4["name"],'tag':_ck4});}
}catch(e){}
return _fq["splice"](0x0,_fq["length"]);
}
/* 赛场实况栏：决赛/结算事实条目独立追加，不碰常规批次；保留最近8条 */
function _newsLiveAdd(facts){
if(!facts||!facts["length"]||!window["NEWSFACTS"])return;
var es=null;
try{es=window["NEWSFACTS"](a2,facts);}catch(e){return;}
if(!es||!es["length"])return;
a2["newsLive"]=a2["newsLive"]||[];
/* 去重键用赛季序号(结算到决赛drain期间不变；age在settle链内会+1导致误判) */
var _lks=a2["_liveKeys"]=a2["_liveKeys"]||{},_lsn=(a2["seasons"]||[])["length"];
for(var i=0;i<es["length"];i++){
var _lk=es[i]["id"]+"@"+_lsn;
if(_lks[_lk])continue;
_lks[_lk]=1;
a2["newsLive"]["unshift"](es[i]);}
while(a2["newsLive"]["length"]>0x8)a2["newsLive"]["pop"]();
}
function _newsLiveTick(){_newsLiveAdd(_newsFactCollect());}
function _newsTick(yth){
/* 常规批次每季整体替换；实况事实走独立的 newsLive 栏，互不影响 */
if(!window["NEWSGEN"])return;
/* 实况栏只保留本赛季条目：上一季的冠军消息随赛季翻页清掉（每年实时最新） */
var _curAge=(a2["seasons"]&&a2["seasons"]["length"])?a2["seasons"][a2["seasons"]["length"]-0x1]["age"]:(a2["age"]!=null?a2["age"]:0);
a2["newsLive"]=(a2["newsLive"]||[]).filter(function(x){return x["age"]===_curAge;});
_newsLiveAdd(_newsFactCollect());
var items=null;
try{items=window["NEWSGEN"](a2,yth||0x0);}catch(e){a2["_newsErr"]=String(e)["slice"](0x0,0xc8);return;}
if(!items||!items["length"])return;
var kept=[],fxCnt=0,negCnt=0,i,e;
for(i=0;i<items["length"];i++){e=items[i];
if(e["fx"]){if(fxCnt>=0x2||_newsFxNeg(e["fx"])&&negCnt>=0x1){delete e["fx"];}else{fxCnt++;if(_newsFxNeg(e["fx"]))negCnt++;_newsFx(e["fx"]);delete e["fx"];}}
kept.push(e);}
a2["news"]=kept;
}
function _newsFxNeg(o){
if(o["wage"]<0x0||o["fame"]<0x0||o["gx"]<0x0)return!0x0;
if(o["dev"]&&o["dev"]["v"]<0x0)return!0x0;
if(o["nat"]&&o["nat"]["v"]<0x0)return!0x0;
if(o["devList"])for(var i=0;i<o["devList"]["length"];i++)if(o["devList"][i]["v"]<0x0)return!0x0;
return!0x1;
}

/* 球队绝对强度 = 联赛基准 + 联赛内档位(_repGap 表) + 三层动态(era/form/hang) + 球员加成。
   档位表 [-7,-4,0,4.5,9,16]：低档保护底部、4→5 拉大让豪门真正高出一档，提供静态跨档实力差(无噪声)。
   动态 teamDev=era+form-hang（见 _devTick）：era=一代人尺度(慢,饱和回归,表现反馈,正向上限=世界级锚定)、
   form=单季状态(快)、hang=夺冠重建债(连冠累积后自行衰减，制造鼎盛→重建周期)。
   球员所在队注入球员加成。
   主角边际效益用饱和曲线 boost=16*d/(d+15)（边际 16*15/(d+15)^2 递减，无平段）：
   每个 base 落在曲线不同位置，弱联赛不再顶格、强联赛也有感。
   基准 ref = base + min(dev,5)：正 dev 最多把门槛抬 5 点，负 dev 全额（低迷队被抬更多）。
   _teamStrRaw 返回未取整值，_devTick 的"预期名次"也用它，dev 因而衡量"去掉主角后的队伍质量"。 */
function _clubBoost(base,ovr,rank){
var share=rank>=0x4?0.55:rank>=0x3?0.47:rank>=0x2?0.38:rank>=0x1?0.27:0.16;
var d=ovr-base;
if(d<0)return share*d*0.15;
return share*0x25*d/(d+0xf);
}
/* 联赛内档位差（rep0-5）：低档保护底部、4→5 拉大让豪门真正高出一档（跨联赛同一张表） */
var _repGapTab=[-7,-4,0,4.5,9,16];
function _repGap(rp){
if(rp<=0x0)return _repGapTab[0x0];
if(rp>=0x5)return _repGapTab[0x5];
var i=Math["floor"](rp),f=rp-i;
return _repGapTab[i]+(_repGapTab[i+0x1]-_repGapTab[i])*f;
}
function _teamStrRaw(t){
var lg=aq(t),_rp=_er(t),base=(lg&&lg["str"]||60)+_repGap(_rp),dev=_tDev(t["id"]);
if(t["id"]===a2["teamId"]){
var role=a0["ROLES"][a2["role"]]?a0["ROLES"][a2["role"]]["rank"]:0;
var _ref=base+Math["min"](dev,0x5),_c=_clubBoost(_ref,a2["ovr"],role);
/* 主角不因球队 dev 高而变成"拖后腿"：OVR 高于名义 base 时贡献不为负；低于 base 时负值也只按名义 base 计 */
if(_c<0)_c=a2["ovr"]>=base?0:Math["max"](_c,_clubBoost(base,a2["ovr"],role));
var _v=_c*0.6;
if(a2["ovr"]>=0x5f&&_v<0.5)_v=0.5;   /* 精英保底：95+ 在任何队至少 +0.5 */
return base+dev+_v;
}
return base+dev;
}
function _teamAbs(t){return Math.round(_teamStrRaw(t));}
function _cardById(tid){var t=aj(tid);return{'i':tid,'n':t?t["name"]:tid,'s':t?_teamAbs(t):50,'lg':t?ap(t):null};}
function _cards(tms){var r=[];for(var i=0;i<tms.length;i++)r.push(_cardById(tms[i]["id"]));return r;}
function _lgTeamsOf(lgId){var r=[];for(var i=0;i<a0["TEAMS"]["length"];i++){var t=a0["TEAMS"][i];if(ap(t)===lgId)r.push(t);}return r;}