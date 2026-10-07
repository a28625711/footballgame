// ---- part:04 | 随机数与基础查询（ad..ay） ----
/* rngState 局部镜像：ad 是全引擎最热的函数（每季数十万次调用），
   不再每次读写状态对象；公共 API 返回前统一刷回 a2.rngState（存档安全），序列位级不变 */
var _rs=0x0;
function ad(){
_rs=(_rs+0x6d2b79f5)>>>0x0;
var bx=_rs;
return bx=Math["imul"](bx^bx>>>0xf,0x1|bx),
(((bx^=bx+Math["imul"](bx^bx>>>0x7,0x3d|bx))^bx>>>0xe)>>>0x0)/0x100000000;
}function ae(bx,by){
return bx+Math["floor"](ad()*(by-bx+0x1));
}function af(bx){
return bx[Math["floor"](ad()*bx["length"])];
}function ag(bx){
for(var by=bx["length"]-0x1;
by>0x0;
by--){var bz=Math["floor"](ad()*(by+0x1)),bA=bx[by];
bx[by]=bx[bz],bx[bz]=bA;
}return bx;
}function ah(bx,



by){var bz,bA=0x0;
for(bz=0x0;
bz<bx["length"];
bz++)bA+=Math["max"](0x0,by(bx[bz]));
if(bA<=0x0)return null;
var bB=ad()*bA,



bC=0x0;
for(bz=0x0;
bz<bx["length"];
bz++)if(bB<=(bC+=Math["max"](0x0,by(bx[bz]))))return bx[bz];
return bx[bx["length"]-0x1];
}function ai(bx){
for(var by=0x1505,bz=0x0;
bz<bx["length"];
bz++)by=(by<<0x5)+by+bx["charCode"+'At'](bz)>>>0x0;
return by;
}function aj(bx){
for(var by=0x0;
by<a0["TEAMS"]["length"];
by++)if(a0["TEAMS"][by]['id']===bx)return a0["TEAMS"][by];
return null;
}function ak(bx){
for(var by=0x0;
by<a0["LEAGUES"]["length"];
by++)if(a0["LEAGUES"][by]['id']===bx)return a0["LEAGUES"][by];
return null;
}function al(bx){
for(var by=0x0;
by<a0["POSITION"+'S']["length"];
by++)if(a0["POSITION"+'S'][by]['id']===bx)return a0["POSITION"+'S'][by];
return a0["POSITION"+'S'][0x0];
}var am={'ch':"epl",



'seg':"liga",'b2':"bund",'l2':"l1",'serb':"seri",'cl1':"csl"},ao={'epl':'ch','liga':"seg",'bund':'b2','l1':'l2','seri':'serb','csl':'cl1'};
function ap(bx){
return bx?a2&&a2["leagueOf"]&&a2["leagueOf"][bx['id']]||bx["league"]:null;
}function aq(bx){return bx?ak(ap(bx)):null;
}function ar(){
return a2["teamId"]?aj(a2["teamId"]):null;
}function as(){return aq(ar());
}function at(bx,



by){
if(!a2["dreamId"]||!bx||!bx["length"])return bx;
for(var bz=0x0;
bz<bx["length"];
bz++)if(bx[bz]['id']===a2["dreamId"])return bx;
for(var bA=null,bB=0x0;
bB<by["length"];
bB++)if(by[bB]['id']===a2["dreamId"]){bA=by[bB];
break;
}return bA?(bx[bx["length"]-0x1]=bA,bx):bx;
}function au(){
if("youth"===a2["phase"]){var bx=aj(a2["youthTea"+"mId"]);
return!bx||aq(bx)['cn'];
}var by=as();
return!by||by['cn'];
}function av(bx){
return Math["abs"](bx)>=0x2710?(bx/0x2710)["toFixed"](0x1)["replace"](/\.0$/,'')+'\x20亿':Math["round"](bx)+'\x20万';
}function aw(bx,bF){
/* bF 为 newState 里解析后的 origin 对象（字符串 id 已归一）：按 id 判，兼容 UI/字符串两路 */
return "胡雪儿"===String(bx["name"]||'')["trim"]()&&bF&&'sd'===bF['id']&&0x2===Number(bx["number"]);
}function ax(){
return Math["min"](0x5,(a2["ovr"]-0x32)/0x7);
}var ay={'ovr':0xa,



'talent':0.3,'guanxi':0x18,'money':0x258};