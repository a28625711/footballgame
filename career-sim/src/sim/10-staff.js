// ---- part:01 | 团队员工（分级/市场/费用） ----

/* 员工分级：每类 3 级（1 基础 / 2 高级 / 3 团队），fee 与效果随级别放大；
   同类型只能养一位，高级可直接替换低级；主动上门的永远是第 3 级 */
var _stTiers={'rehab':['私人康复师','高级康复师','康复团队'],
'fitness':['体能教练','高级体能教练','体能团队'],
'analyst':['数据分析师','高级数据分析师','数据团队'],
'agent':['经纪人','知名经纪人','大牌经纪人'],
'pr':['公关顾问','公关团队','顶级公关部'],
'lawyer':['税务律师','资深税务律师','律师团队'],
'chef':['私人厨师','高级营养厨师','厨师团队']};
/* 分级文案：效果随级别放大的部分在 desc 里体现 */
var _stDescs={
'rehab':["伤病少三成","伤病少一半","几乎不进医务室"],
'fitness':["衰减放缓两成","衰减放缓三成","衰减放缓近半"],
'analyst':["转会报价 +1","转会报价 +2","转会报价 +2 · 换名单 +1"],
'agent':["留洋门槛降一档","留洋门槛降两档","留洋门槛降三档"],
'pr':["名气不退、黑料减半","名气不退、黑料少七成","名气不退、几乎没有黑料"],
'lawyer':["罚款少三成","罚款少一半","罚款少七成"],
'chef':["成长快一点","成长快一截","成长快一大截"]};
function _stFeeMult(t){return t===2?2.2:t===3?4:1;}
function _stEff(t){return t===2?1.6:t===3?2.2:1;}
function _stT(bx){var _v=a2["staff"]&&a2["staff"][bx];return _v?_v["tier"]||1:0;}
/* 'chef3' → {id,type,tier,name,fee(未乘峰值工资系数),desc,note}；t1 直接用类型 id */
function _stById(bx){
var t=1,base=bx,_m=/^(.*?)([123])$/.exec(bx||'');
if(_m&&_stTiers[_m[1]]&&+_m[2]>1){base=_m[1];t=+_m[2];}
for(var i=0;i<a5["length"];i++)if(a5[i]['id']===base){
var b=a5[i];
return{'id':bx,'type':base,'tier':t,'name':_stTiers[base][t-1],'fee':Math.round(b["fee"]*_stFeeMult(t)),'desc':_stDescs[base]?_stDescs[base][t-1]:b["desc"],'note':b["note"]};
}
return null;
}
function a6(bx){
return!(!a2["staff"]||!a2["staff"][bx]);
}function a7(bx){
/* 经纪人佣金与球员身价脱钩：一口价 */
if((bx["type"]||bx['id'])==="agent")return Math["round"](bx["fee"]);
return Math["round"](bx["fee"]*ac(0x1+(a2["peakAnnu"+"alWage"]||0x0)/0x2bc,0x1,0x4));
}function a8(){
for(var bx=0x0,by=0x0;
by<a5["length"];
by++){var _id=a5[by]['id'];
if(a6(_id)){var _t=_stT(_id);bx+=a7(_stById(_t===0x1?_id:_id+_t));}
}
return bx;
}
/* ── 团队面板：效力年数加成 与 每赛季候选市场 ─────────────────── */
function _stM(bx){
var _v=a2["staff"]&&a2["staff"][bx];
return 0x1+Math["min"](0.3,0.1*(_v&&typeof _v==="object"?_v["y"]||0x0:0x0));
}
function _staffMkt(){
var _own=a2["staff"]||{},_ids=[],_tm=ar(),_ab=_tm&&!aq(_tm)['cn'],_fame=a2["fame"]||0x0;
/* 名气门槛：agent t1/t2/t3 = 0/15/25，pr = 0/20/35，lawyer = 0/8/15 */
var _gate={'agent':[0,15,25],'pr':[0,20,35],'lawyer':[0,8,15]};
for(var _k in _stTiers)for(var _t=1;_t<=3;_t++){
/* 已雇该类型时只刷更高级别（升级路径），同级/低级不再出现 */
if(_own[_k]&&(_own[_k]["tier"]||1)>=_t)continue;
if(_k==="agent"&&_ab)continue;
if(_fame<(_gate[_k]?_gate[_k][_t-1]:0))continue;
_ids.push(_t===1?_k:_k+_t);
}
return ag(_ids),a2["staffMkt"]={'season':a2["seasons"]["length"]+0x2,'ids':_ids["slice"](0x0,0x3)},a2["staffMkt"];
}
function _yTrialP(){
var _df=a2["ovr"]-bh(a2["age"],bg());
return ac(0.3+0.04*_df+0.2*((a2["talent"]-0.7)/0.78),0.05,0.8);
}