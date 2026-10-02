// ---- part:16 | 大赛系统 · §8 = 事件系统（链/强制队列） ----




/* ── §8 大赛系统 ──────────────────────────────────────────────── */




function aZ(bx,by,bz,age){
b0(bx,by,bz,age!=null?age:a2["age"]);
}function b0(bx,by,bz,bA){
a2["natRuns"]["push"]({'age':bA,'comp':by,'stage':bz,'caps':bx?bx['caps']:0,'natGoals':bx?bx['natGoals']:0,['natAssis'+'ts']:bx?bx['natAssis'+'ts']:0,'natCs':bx?bx['cs']:0}),



'冠军'===bz?(bx&&bx["trophies"]&&bx["trophies"]["push"](by+'冠军'),a2["trophies"]["push"]({'name':by+'冠军','age':bA,'team':"国家队"})):bx&&(bx["nat"]=by+bz);
}function _evById(bx){
for(var by=0x0;by<a1["length"];by++)if(a1[by]['id']===bx)return a1[by];
return null;
}
/* 事件文案快照：desc 可能是依赖 playerType/state 的函数，须在入队时定稿，
   否则事件结算（改了 playerType 等）后重渲染会跳成另一个分支的文案 */
function _descOf(bx){var _d=bx&&bx["desc"];return typeof _d==="function"?_d(aA()):_d;}
/* pool 事件的 options 侧表：不再原地改写全局 EVENTS(a1)，避免污染与重复洗牌 */
var _evOpts={};
function _matOpts(bx){
if(!bx)return null;
var _id=bx['id'];
if(_evOpts[_id])return _evOpts[_id];
if(!bx["pool"])return bx["options"]||null;
var _o=ag(bx["pool"]["slice"]())["slice"](0x0,(bx["rndPick"]||0x3))["concat"](bx["single"]?[bx["single"]]:[]);
_evOpts[_id]=_o;
return _o;
}
/* 事件链：首个事件随机触发，触发后按固定年数进"延迟强制池" forceLater，到期转入 forceQ。
   后续事件不再进随机池（_chainFollower），由链条驱动，避免提前/重复触发。 */
var _chainNext={
'friend_meet':{'id':'friend_part','y':0x3},'friend_part':{'id':'friend_reunion','y':0x3},'friend_reunion':{'id':'friend_end','y':0x4},
'fan_boy':{'id':'fan_match','y':0x3},'fan_match':{'id':'fan_social','y':0x2},'fan_social':{'id':'fan_pro','y':0x3},
'mentor_find':{'id':'mentor_grow','y':0x3},'mentor_grow':{'id':'mentor_pass','y':0x4},
'rival_youth':{'id':'rival_pro','y':0x4},'rival_pro':{'id':'rival_clash','y':0x2},'rival_clash':{'id':'rival_end','y':0x3},
'sponsor_deal':{'id':'sponsor_conflict','y':0x3},'sponsor_conflict':{'id':'sponsor_end','y':0x3},
'injury_chain_bad':{'id':'injury_chain_comeback','y':0x1},'injury_chain_comeback':{'id':'injury_chain_philosophy','y':0x2},
'youth_crush_cn':{'id':'first_love_cn','y':0x7},'youth_crush_abroad':{'id':'first_love_abroad','y':0x7},
'youth_meet_star':{'id':'meet_star_again','y':0x4},
'foot_left':{'id':'foot_reckoning','y':0x8},'foot_right':{'id':'foot_reckoning','y':0x8}};
var _chainFollower={'friend_part':1,'friend_reunion':1,'friend_end':1,'fan_match':1,'fan_social':1,'fan_pro':1,
'mentor_grow':1,'mentor_pass':1,'rival_pro':1,'rival_clash':1,'rival_end':1,
'sponsor_conflict':1,'sponsor_end':1,'injury_chain_comeback':1,'injury_chain_philosophy':1,
'first_love_cn':1,'first_love_abroad':1,'meet_star_again':1,'foot_reckoning':1};
function _scheduleEvent(bx,by){a2["forceLater"]=a2["forceLater"]||[];a2["forceLater"]["push"]({'id':bx,'due':(a2["age"]||0x0)+(by||0x0)});}
function _chainAdvance(bx){var _n=_chainNext[bx];if(_n)_scheduleEvent(_n["id"],_n["y"]);}
/* 到期扫描：满足 when/stage 才入 forceQ，否则顺延；过期超过 15 年丢弃 */
function _drainScheduled(){
var q=a2["forceLater"];if(!q||!q["length"])return;
var keep=[],_stg=aB(a2["age"]),_inAc="youth"===a2["phase"];
for(var i=0x0;i<q["length"];i++){var e=q[i],def=_evById(e["id"]);
if(!def)continue;
if(e["due"]<=a2["age"]&&(!def["when"]||def["when"](aA()))&&(!def["stage"]||_inAc||def["stage"]===_stg)){
a2["forceQ"]||(a2["forceQ"]=[]);
if(a2["forceQ"]["indexOf"](e["id"])<0x0&&!a2["usedEven"+'ts'][e["id"]])a2["forceQ"]["push"](e["id"]);
continue;}
if(a2["age"]-e["due"]>0xf)continue;
keep["push"](e);}
a2["forceLater"]=keep;
}
function _markEvent(bx,bz){
a2["usedEven"+'ts'][bx]=(a2["usedEven"+'ts'][bx]||0x0)+0x1;
a2["flags"]["_evCount"]=(a2["flags"]["_evCount"]||0x0)+0x1;
bz&&bz['cn']&&(a2["flags"]["_cnCount"]=(a2["flags"]["_cnCount"]||0x0)+0x1);
}
/* 强制事件独立队列：与普通随机事件分开，pending 用 type:'forced'。
   每季事件上限 2：{随机,随机} 或 {随机,强制}；强制事件占"槽2"，挤掉连环随机。 */
function _fireForced(){
while(a2["forceQ"]&&a2["forceQ"]["length"]){
var _id=a2["forceQ"]["shift"](),_def=_evById(_id);
if(!_def)continue;
/* 入队后局势可能变化（如已脱单/已转会）：条件不再满足则丢弃，避免重复/错触发 */
if(_def["when"]&&!_def["when"](aA()))continue;
_matOpts(_def);
_markEvent(_id,_def);
a2["pending"]={'type':"forced",'eventId':_id,'descText':_descOf(_def)};
return!0x0;
}
return!0x1;
}
function b1(bx){
a2["forceQ"]||(a2["forceQ"]=[]);



if(!_evById(bx))return;
if(a2["usedEven"+'ts'][bx])return;
if(a2["forceQ"]["indexOf"](bx)>=0x0)return;
if(a2["forceQ"]["length"]>=0x8)return;
a2["forceQ"]["push"](bx);
}
/* 同 b1，但插到队首：用于"刚刚发生"的信号事件（_ovrD 每年刷新，排到队尾会失效） */
function b1p(bx){
a2["forceQ"]||(a2["forceQ"]=[]);
if(!_evById(bx))return;
if(a2["usedEven"+"ts"][bx])return;
if(a2["forceQ"]["indexOf"](bx)>=0x0)return;
if(a2["forceQ"]["length"]>=0x8)return;
a2["forceQ"]["unshift"](bx);
}
function _repWeight(t){



/* 杯赛对手权重曲线：rep5高概率,rep4中高,rep3小概率,rep2极低,rep0/1近乎为零 */




var _rw=[0.2,0.5,1,5,40,100],_rep=t&&t["rep"];return _rep>=0x0&&_rep<=0x5?_rw[_rep]:0x0;
}
function _wDraw(teams,n,wFn){



/* 不放回加权抽样 */




var _t=teams["slice"](),_p=[];
while(_p["length"]<n&&_t["length"]){
var _tot=0x0,_i;for(_i=0x0;_i<_t["length"];_i++)_tot+=wFn(_t[_i]);
var _r=ad()*_tot,



_acc=0x0,_idx=_t["length"]-0x1;
for(_i=0x0;_i<_t["length"];_i++){_acc+=wFn(_t[_i]);if(_r<=_acc){_idx=_i;break;}}
_p["push"](_t[_idx]);_t["splice"](_idx,0x1);
}
 return _p;
}