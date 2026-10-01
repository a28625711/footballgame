// ---- part:18 | 合同期与报告 · §10（年龄/能力/工资） ----





/* ── §10 合同期与报告 ──────────────────────────────────────────── */




function b6(){
return a2["period"]={'n':a3[a2["mode"]]["seasons"],'left':a3[a2["mode"]]["seasons"],'recs':[]},a2["role"]=aH(),



b7();
}function b7(){
for(var bx=a2["period"];
bx["left"]>0x0&&a2["age"]<0x37;
)if(bx["recs"]["push"](b2()),bx["left"]--,a2["roleAdju"+'st']=a2["roleAdju"+'st']>0x0?a2["roleAdju"+'st']-0x1:(a2["roleAdju"+'st']<0x0?a2["roleAdju"+'st']+0x1:0x0),
a2["life"]&&a2["life"]["partner"]&&(a2["life"]["partner"]["bond"]=ac((a2["life"]["partner"]["bond"]||0x0)+_bondDrift(),0x0,0x64)),
a2["role"]=aH(),a2["bigQ"]&&a2["bigQ"]["length"])return aW(),



null;
return(function(){var by=a2["period"],bz=by['n'],bA=by["recs"];
return a2["period"]=null,a2["pendingM"+"ult"]=null,a2["clean"]=ac(a2["clean"]-(au()?2.2:0.6)*bz,0x0,0x64),a2["fame"]=ac(a2["fame"]-(a6('pr')?Math["max"](0.05,1-0.65*_stEff(_stT('pr')))/_stM('pr'):1.5)*bz,
0x0,0x64),a2["guanxi"]=ac(a2["guanxi"]+(au()?1.6:0.5)*bz,0x0,0x64),a2["contract"+"Left"]>0x0&&a2["contract"+"Left"]--,a2["lockAbro"+'ad']>0x0&&a2["lockAbro"+'ad']--,
a0["ROLES"][a2["role"]]["rank"]<=0x1?a2["lowSpell"]++:a2["lowSpell"]=0x0,_cleanSettle(bz),bA;
}());
}/* ── 清白有牙：低清白→赛季丑闻风险（停赛+N/罚款/掉名望）；高清白+名气→代言收入 ──
   在赛季结算（b7）里按 period 季数结算，让 clean/fame 真正产生后果；
   事件层随后可读 flags._scandal / _cleanBonus 叠加剧情。 */
function _cleanSettle(bz){
var cl=a2["clean"]||0x0;
if(cl<0x2d){
if(ad()<(0x2d-cl)*0.005*bz){
var _fine=Math["round"]((0x2d-cl)*0x6+0x1e);
a2["money"]=ac(Math["round"](a2["money"]-_fine),-0x320,0x895440);
a2["fame"]=ac((a2["fame"]||0x0)-0x4,0x0,0x64);
a2["clean"]=ac(cl-0x5,0x0,0x64);
a2["banGames"]=(a2["banGames"]||0x0)+0x2;
a2["flags"]["_scandal"]=0x1;
}
}else if(cl>=0x46&&(a2["fame"]||0x0)>=0x1e){
a2["money"]=ac(Math["round"](a2["money"]+(a2["fame"]||0x0)*0.4*bz),-0x320,0x895440);
a2["clean"]=ac(cl+0x1,0x0,0x64);
a2["flags"]["_cleanBonus"]=0x1;
}
}function b8(bx,



by){
aj(bx)&&(a2["teamId"]=bx,a2["seasonsA"+"tClub"]=0x0,a2["roleAdju"+'st']=0x0,a2["lowSpell"]=0x0,a2["stagnate"]=!0x1,a2["contract"+"Left"]=a2["flags"]["_keepContract"]?a2["contract"+"Left"]:be(),a2["flags"]["_keepContract"]=!0x1,
a2["loanFrom"]=null,a2["clubsPla"+"yed"]["indexOf"](bx)<0x0&&a2["clubsPla"+"yed"]["push"](bx),by||(a2["flags"]["_justMov"+'ed']=!0x0),a2["role"]=aH());
}function b9(bx){
return!!bx&&a2["youthTea"+"mId"]===bx['id']&&a2["age"]<=0x17;
}function ba(){
return a2["ovr"]+Math["min"](0xa,0.08*a2["fame"])+Math["min"](0xc,0.8*a2["trophies"]["length"])-bb(a2["age"]);
}function bb(bx){return bx<=0x1d?0x0:bx<=0x21?0x2*(bx-0x1d):0x8+4.5*(bx-0x21);
}function bc(bx){
return 0x30+7.5*_er(bx);
}function bd(bx){return ba()+function(by){
return Math["max"](0x0,0x3-_er(by))*bb(a2["age"])*0.12;
}(bx);
}var APPT=(function(){var f=[],a;for(a=0;a<60;a++)f[a]=a<=0x13?0.5:(a===20?0.78:(a<=24?1:(a<=36?0.92:(a<=38?0.82:(a<=40?0.7:(a<=42?0.58:0.45))))));var g=f.slice();g[0]=f[0];for(a=1;a<59;a++)g[a]=0.25*f[a-1]+0.5*f[a]+0.25*f[a+1];g[59]=f[59];return g;})();
function APPS_F(bx){return APPT[Math["max"](0,Math["min"](59,bx))]}
function OLDF(bx){return bx<=0x13?0.5:bx===20?0.78:bx>=43?0.45:bx>=41?0.58:bx>=39?0.7:bx>=37?0.82:bx>=25?0.92:1}
function bAge(){return Math["max"](0.68,1-0.028*Math["max"](0,a2["age"]-24))*Math["max"](0.8,1-0.05*Math["max"](0,23-a2["age"]));
}function be(bx){
var by=bx||ar(),



rel=a2["ovr"]-(by?0x30+7*by["rep"]:0x3e)+3*a2["roleAdju"+'st'];
var fit=1/(1+Math["exp"](-rel/6));
if(a2["age"]<0x16&&a2["maxOvr"]>a2["ovr"])fit=Math["min"](1,fit+Math["min"]((a2["maxOvr"]-a2["ovr"])*0.06,0.22));
var ageW=Math["exp"](-Math["pow"](Math["max"](0,a2["age"]-24)/8,1.6));
return Math["max"](1,Math["min"](5,Math["round"](1+4.2*fit*ageW+(ad()-0.5)*0.9)));
}
/* 联赛权重：按"边缘程度/趣味度"而非纯强度排——对中国球员，中超/沙特/美职联都是现实且有故事的落脚点；
   数值可随时调整，未列出的联赛默认 0.6 */
var _LGW={'epl':2.2,'liga':2.2,'seri':1.9,'bund':1.9,'l1':1.7,'csl':1.4,'spl':1.3,'mls':1.2,'pri':0.9,'ere':0.8,'tur':0.7,'bra':0.7,'jup':0.6,'mx':0.6,'jl':0.6,'arg':0.6,'kl':0.45,'pol':0.35,'ch':0.3,'seg':0.3,'b2':0.3,'l2':0.3,'serb':0.3,'ale':0.25,'cl1':0.25,'cpl':0.2};
function _lgW(bx){var bL=aq(bx);return bL&&_LGW[bL['id']]||0.6;}
/* 统一工资口径：报价/状态栏/实发都用此式 = 基础工资×合同系数×角色系数×年龄系数×名气议价 */
function _wageOf(bx,by,bz){var bR=aI(bx);return Math["round"](aJ(bx,by,a2["ovr"])*((a2["flags"]&&a2["flags"]["_wageMul"])||0x1)*(bz!=null?bz:(a2["wageMul"+"t"]||0x1))*(a0["ROLES"][bR]["rank"]>=0x2?0x1:0.55)*bAge()*(1+Math["min"](0.2,(a2["fame"]||0x0)/0xfa)));}
function bf(bx,



by){
by=by||{};
var bz=ba(),bA=ar(),bB=as(),bC=bB?bB["rep"]:0x1,bD=a2["ovr"]>=0x52?0x2:0x1;




/* ── §11 转会 ──────────────────────────────────────────────────── */




function bE(bK){
return a0["TEAMS"]["filter"](function(bL){
if(bA&&bL['id']===bA['id'])return!0x1;
var bM=aq(bL),bN=bc(bL);
if(!bM['cn']){if(!by["forceAbr"+"oad"]&&!by["ignoreLock"]&&a2["lockAbro"+'ad']>0x0)return!0x1;
bN+=a2["seasonsA"+"broad"]>0x0?0x3:0x5,a6("agent")&&(bN-=Math["round"](0x3*_stEff(_stT("agent"))*_stM("agent")));
}return!(by["forceAbr"+"oad"]&&bM['cn']||by["chinaOnl"+'y']&&!bM['cn']||null!=by["maxRep"]&&_er(bL)>by["maxRep"]||_er(bL)>=0x3&&a2["ovr"]<0x3e+0x4*_er(bL)||bM["rep"]>bC+bK||!(bd(bL)>=bN-0x5)||!(bz<=bN+0x1a));
});
}var bF=bE(bD);
if(bF["length"]||(bF=bE(bD+0x1)),



bF["length"]||(bF=bE(0x9)),!bF["length"])return[];
for(var bG=[],bH={},bI=0x0;
bI<0x4*bx&&bG["length"]<bx;
bI++){var bJ=ah(bF,function(bK){var bL=bc(bK);
return _lgW(bK)/(0x1+0.35*Math["abs"](bz-bL));
});
bJ&&!bH[bJ['id']]&&(bH[bJ['id']]=0x1,bG["push"](bJ));
}return bG;
}function bg(){
return aj(a2["youthTea"+"mId"]);
}function bh(bx,by){
return(bx<=0x10?29.5+4.3*(bx-0xc):46.7+2.6*(bx-0x10))+1.2*(by?by["rep"]:0x2);
}function bi(){
return a2["age"]>=0x10&&a2["ovr"]>=0x2a;
}function bj(){
/* 青训营不影响世界运行：每个青训年世界照常演化(全 AI) */
_runWorld(null,null,null);
/* 青训年国家队大赛照常演化：世界杯/亚洲杯等四大赛每季推进一次（全 AI 中立） */
_natTick(null);
if(a2["flags"]["_double"]=!0x1,



(function(){var by=bg(),bz=aG(a2["age"]),bA=bz[0x0]+ad()*(bz[0x1]-bz[0x0]),bB=(0x1+a2["talent"])/0x2*function(bD){
if(!bD)return 0x1;
var bE=0.86+0.06*bD["rep"];
return aq(bD)['cn']||(bE+=0.06),bE;
}(by);
(function(){
/* 青训投入按训练年结算：勾选只登记，过年在成长结算时统一扣费 */
var _iv=a2["yInv"]||{},_cost={'train':18,'fit':14,'nut':10,'gx':10},_k;
a2["yInv"]=_iv;
for(_k in _iv)if(_iv[_k]!=null){
if(a2["money"]>=_cost[_k])a2["money"]-=_cost[_k];
else{delete _iv[_k],a2["flags"]["_yInvLost"]=1;continue;}
if(_k==="train")bB*=1.18;
else if(_k==="gx")a2["guanxi"]=ac(a2["guanxi"]+0x6,0x0,0x64);
}
})();
bA>0x0&&(bB*=ac((0x46-a2["ovr"])/0x1c,0.35,0x1));
var _yg=bA*bB;
a2["yInv"]&&a2["yInv"]["nut"]!=null&&_yg>0x0&&_yg<0.9&&(_yg=0.9);
a2["ovr"]=ac(a2["ovr"]+_yg,0xc,0x63),a2["maxOvr"]=Math["max"](a2["maxOvr"],
a2["ovr"]);
var bC=ad()*(a2["yInv"]&&a2["yInv"]["fit"]!=null?0.7:0x1)<function(bD){var bE=bg(),bF=bh(bD,bE)-a2["ovr"];
if(bF<=0x0)return 0x0;
var bG=bD<=0xc?0.5:bD>=0xe?1.15:0x1;
return ac(0.0052*bF*function(bH){
return bH?0.45+0.06*bH["rep"]:0x1;
}(bE)*bG,0x0,0.55);
}(a2["age"]);
delete a2["flags"]["_yFit"];
/* 年度成长差：青训年 vs 上一年（用于成长/停滞差分事件）
   _yHas=false 表示还没有上一年可比（首年），此时 _ovrD 无意义，禁用该年事件；
   仅 14 岁及以后的青训年才触发（12/13 岁身体未定型，涨跌没有叙事意义）。 */
var _yL=a2["youthLog"],_yHas=_yL["length"]>0x0,_yNow=Math["round"](a2["ovr"]),_yPrev=_yHas?_yL[_yL["length"]-0x1]["ovr"]:_yNow;
a2["flags"]["_ovrD"]=_yNow-_yPrev,a2["flags"]["_ovrPh"]=_yHas?"y":"y0",a2["flags"]["_ovrA"]=a2["age"];
a2["flags"]["_ovrA"]>=0xe&&_yHas&&(a2["flags"]["_ovrD"]>=0x8?b1p("youth_surge"):(a2["flags"]["_ovrD"]<=0x1&&a2["ovr"]<0x5a&&b1p("youth_stall")));
return a2["youthLog"]["push"]({'age':a2["age"],'teamId':a2["youthTea"+"mId"],'ovr':Math["round"](a2["ovr"]),'cut':bC}),bC?(a2["youthCut"]=a2["age"],
!0x0):(_newsTick(0x1),a2["age"]++,!0x1);
}()))return br("青训淘汰");
if(a2["age"]>=0x15&&!bi())return a2["youthCut"]=a2["age"],



br("青训淘汰");
_ntYouthCheck();
/* 本年梯队决赛已入队时毕业顺延一年：先踢完国字号再升学 */
if(a2["bigQ"]&&a2["bigQ"]["length"]&&bi()&&!(a2["flags"]["_gradCd"]>0x0))a2["flags"]["_gradCd"]=0x1;
if(bi()){if(a2["flags"]["_gradCd"]>0x0)a2["flags"]["_gradCd"]--;
else return a2["phase"]="career",bm();
}
var bx=aE();
if(!bx)return a2["bigQ"]&&a2["bigQ"]["length"]?aW():void 0x0;
_markEvent(bx['id'],bx);
a2["pending"]={'type':"random",'eventId':bx['id'],'descText':_descOf(bx)};
}