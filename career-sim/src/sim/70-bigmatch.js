// ---- part:10 | 大场面引擎（德比/决赛：叙述/事件/结算） ----

var aQ={'预选赛出局':0x0,



'小组赛出局':0x1,'止步三十二强':0x2,'止步十六强':0x3,'止步八强':0x4,'止步四强':0x5,'亚军':0x6,'冠军':0x7},aR={'wc':{'icon':'🏆','side':"中国队"},'asia':{'icon':'🏅',
'side':"中国队"},



'cont':{'icon':'⭐','side':null},'promo':{'icon':'🏟','side':null},'drop':{'icon':'🚨','side':null},'derby':{'icon':'🔥','side':null},
/* 国字号梯队（U系列）：与 wc/asia 共用大场面交互管线，记账走 _yCaps */
'u13':{'icon':'⚽','side':"中国U13"},'u15':{'icon':'⚽','side':"中国U15"},'u17':{'icon':'🏅','side':"中国U17"},'u19':{'icon':'🥇','side':"中国U19"},'u23':{'icon':'🏟','side':"中国U23"}},



aS={'欧冠':'eu','中北美冠':'eu',
'欧联':'eu','亚冠':'as','欧协联':'eu','解放者杯':'sa'};
var _dby={'rma':[['bar','国家德比'],['atm','马德里德比']],'bar':[['rma','国家德比']],'atm':[['rma','马德里德比']],



'mci':[['mun','曼市德比']],'mun':[['mci','曼市德比'],['liv','双红会']],'liv':[['mun','双红会'],['eve','默西塞德德比']],'eve':[['liv','默西塞德德比']],


'ars':[['tot','北伦敦德比'],['che','伦敦德比']],
'tot':[['ars','北伦敦德比']],'che':[['ars','伦敦德比'],['tot','伦敦德比']],'ful':[['che','西伦敦德比']],

'qpr':[['ful','西伦敦德比'],['che','伦敦德比']],

'int':[['acm','米兰德比'],['juv','意大利国家德比']],'acm':[['int','米兰德比']],'juv':[['int','意大利国家德比'],['tor','都灵德比']],

'tor':[['juv','都灵德比']],
'nap':[['rom','阳光德比']],'rom':[['nap','阳光德比'],['laz','罗马德比']],'laz':[['rom','罗马德比']],

'fio':[],
'bol':[],
'bay':[['bvb','德国国家德比'],['aug','巴伐利亚德比']],'bvb':[['bay','德国国家德比'],['s04','鲁尔区德比']],

's04':[['bvb','鲁尔区德比'],['bmg','莱茵德比']],
'bmg':[['s04','莱茵德比']],'lev':[['bmg','莱茵德比']],'aug':[['bay','巴伐利亚德比']],'koe':[['bmg','莱茵德比']],


'psg':[['mar','法国国家德比']],'mar':[['psg','法国国家德比']],
'nic':[['mon','蔚蓝海岸德比']],'mon':[['nic','蔚蓝海岸德比']],
'psv':[['fey','荷兰德比'],['aja','荷兰德比']],

'fey':[['psv','荷兰德比'],['aja','荷兰国家德比']],
'aja':[['fey','荷兰国家德比'],['psv','荷兰德比']],'utr':[['aja','荷兰德比']],
'por':[['spo','葡萄牙国家德比'],['ben','葡萄牙德比']],

'spo':[['por','葡萄牙国家德比'],['ben','里斯本德比']],
'ben':[['por','葡萄牙德比'],['spo','里斯本德比']],'bra':[['por','葡萄牙德比']],
'ath':[['rso','巴斯克德比']],

'rso':[['ath','巴斯克德比']],
'gen':[['sam','热那亚德比']],
'sam':[['gen','热那亚德比']],
'hsv':[['pau','汉堡德比']],'pau':[['hsv','汉堡德比']],

'cn-sh':[['cn-shh','上海德比'],['cn-bj','京沪大战']],
'cn-shh':[['cn-sh','上海德比']],
'cn-bj':[['cn-sh','京沪大战'],['cn-sd','京津德比']],'cn-sd':[['cn-bj','京津德比'],['cn-sh','京沪大战']],

'hil':[['nsr2','利雅得德比']],
'nsr2':[['hil','利雅得德比']],
'ahl':[['ahl2','吉达德比']],'ahl2':[['ahl','吉达德比']],
'jbh':[['suw','现代德比']],
'suw':[['jbh','现代德比']],'ulh':[['jbh','韩国德比'],['suw','韩国德比']],


'gmb':[['cre','大阪德比'],['kob','关西德比']],'cre':[['gmb','大阪德比']],
'kaw':[['yok','神奈川德比']],'yok':[['kaw','神奈川德比']],'urw':[['kob','关西德比']],

'kob':[['urw','关西德比'],['gmb','关西德比']],
'sun':[['new','泰恩威尔德比']],
'new':[['sun','泰恩威尔德比']],'lee':[['shu','约克郡德比']],'shu':[['lee','约克郡德比']],

'sto':[['wba','西米德兰德比']],'wba':[['sto','西米德兰德比'],['avl','西米德兰德比']],
'nfo':[['lct','东米德兰德比']],'lct':[['nfo','东米德兰德比']],

'nor':[['ips','东盎格利亚德比']],'ips':[['nor','东盎格利亚德比']],

'nyc':[['nyr','纽约德比']],'nyr':[['nyc','纽约德比']],'lag':[['lfc','洛杉矶德比']],

'lfc':[['lag','洛杉矶德比']],
'ptl':[['sea','卡斯卡迪亚德比']],
'sea':[['ptl','卡斯卡迪亚德比']],
'clb':[['and','比利时国家德比']],'and':[['clb','比利时国家德比']],

'gnk':[['and','比利时德比']],
'boc':[['riv','超级德比']],'riv':[['boc','超级德比']],
'rac1':[['ind','阿维拉内达德比']],'ind':[['rac1','阿维拉内达德比']],
'fla':[['flu','Fla-Flu德比']],'flu':[['fla','Fla-Flu德比']],
'kra':[['wkr','克拉科夫德比']],'wkr':[['kra','克拉科夫德比']],
'legia':[['lech','波兰德比']],'lech':[['legia','波兰德比']],
/* 土超 */
'gala':[['fene','洲际德比'],['bjk','伊斯坦布尔德比']],
'fene':[['gala','洲际德比'],['bjk','伊斯坦布尔德比']],
'bjk':[['gala','伊斯坦布尔德比'],['fene','伊斯坦布尔德比']],
'trab':[['rize','黑海德比']],'rize':[['trab','黑海德比']],
/* 墨超 */
'amr':[['chs','墨西哥国家德比'],['crz','墨西哥城德比']],
'chs':[['amr','墨西哥国家德比'],['ats','瓜达拉哈拉德比']],
'crz':[['amr','墨西哥城德比']],'ats':[['chs','瓜达拉哈拉德比']],
'mty':[['tgr','蒙特雷德比']],'tgr':[['mty','蒙特雷德比']],
/* 西甲补充 */
'sev':[['bet','塞维利亚德比']],'bet':[['sev','塞维利亚德比']],
'dep':[['cel','加利西亚德比']],'cel':[['dep','加利西亚德比']],
/* 西乙 */
'alme':[['mlg','安达卢西亚德比']],'mlg':[['alme','安达卢西亚德比']],
/* 法甲/法乙 */
'psg':[['mar','法国国家德比'],['parfc','巴黎德比']],'parfc':[['psg','巴黎德比']],
'lyo':[['set','罗讷德比']],'set':[['lyo','罗讷德比']],
'len':[['lil','北部德比']],'lil':[['len','北部德比']],
'ren':[['nts','布列塔尼德比']],
'nts':[['ren','布列塔尼德比'],['gui','布列塔尼德比']],'gui':[['nts','布列塔尼德比']],
'met':[['nancy','洛林德比']],'nancy':[['met','洛林德比']],
/* 澳超 */
'syd':[['wsw','悉尼德比']],'wsw':[['syd','悉尼德比']],
'melc':[['melv','墨尔本德比']],'melv':[['melc','墨尔本德比']],
'auck':[['wel','新西兰德比']],'wel':[['auck','新西兰德比']],
/* K联赛 */
'suw':[['jbh','现代德比'],['seo','水原首尔德比']],'seo':[['suw','水原首尔德比']],
'ulh':[['jbh','韩国德比'],['suw','韩国德比'],['poh','东海岸德比']],'poh':[['ulh','东海岸德比']],
/* J1 */
'kaw':[['yok','神奈川德比'],['fct','多摩川德比']],
'fct':[['verdy','东京德比'],['kaw','多摩川德比']],'verdy':[['fct','东京德比']],
/* 英冠/英超 */
'sou':[['portsmouth','南海岸德比']],'portsmouth':[['sou','南海岸德比']],
'bla':[['bolto','兰开夏德比']],'bolto':[['bla','兰开夏德比']],
'mun':[['mci','曼市德比'],['liv','双红会'],['lee','玫瑰德比']],
'lee':[['shu','约克郡德比'],['mun','玫瑰德比']],
'birmingham':[['avl','伯明翰德比'],['cov','西米德兰德比']],'cov':[['birmingham','西米德兰德比']],
'avl':[['wba','西米德兰德比'],['birmingham','伯明翰德比']],
/* 德甲补充 */
'hsv':[['pau','汉堡德比'],['svw','北方德比']],'svw':[['hsv','北方德比']],
'her':[['fcu','柏林德比']],'fcu':[['her','柏林德比']],
/* 中超补充 */
'cn-sd':[['cn-bj','京津德比'],['cn-sh','京沪大战'],['cn-qdh','齐鲁德比'],['cn-qdw','齐鲁德比']],
'cn-qdh':[['cn-sd','齐鲁德比']],'cn-qdw':[['cn-sd','齐鲁德比']],
/* 阿根廷补充 */
'newo':[['roc','罗萨里奥德比']],'roc':[['newo','罗萨里奥德比']],
'est':[['gimn','拉普拉塔德比']],'gimn':[['est','拉普拉塔德比']],
/* 巴西补充 */
'gre':[['inte','格雷纳尔德比']],'inte':[['gre','格雷纳尔德比']],
'cori':[['palm','圣保罗德比']],'palm':[['cori','圣保罗德比']],
'atmi':[['cru','米内罗德比']],'cru':[['atmi','米内罗德比']],
/* MLS */
'trt':[['mtl','加拿大德比']],'mtl':[['trt','加拿大德比']],
'hou':[['dal','德州德比']],'dal':[['hou','德州德比']]
},

_dbn={'rma':'国家德比',
'bar':'国家德比','atm':'马德里德比','mci':'曼市德比','mun':'曼市德比','liv':'西北德比','eve':'西北德比',

'ars':'北伦敦德比','tot':'北伦敦德比','che':'伦敦德比',
'ful':'西伦敦德比','qpr':'西伦敦德比',
'int':'米兰德比','acm':'米兰德比','juv':'意大利国家德比','tor':'都灵德比',

'nap':'那不勒斯德比','rom':'罗马德比','laz':'罗马德比',
'ata':'亚特兰大德比','fio':'托斯卡纳德比','bol':'托斯卡纳德比',
'bay':'德国国家德比','bvb':'国家德比','s04':'鲁尔区德比',

'bmg':'莱茵德比','lev':'莱茵德比','aug':'巴伐利亚德比',
'koe':'莱茵德比',
'psg':'法国国家德比','mar':'法国国家德比','nic':'蔚蓝海岸德比','mon':'蔚蓝海岸德比',
'psv':'荷兰国家德比',

'fey':'荷兰国家德比','aja':'荷兰德比','utr':'荷兰德比',

'por':'葡萄牙国家德比','spo':'葡萄牙国家德比','ben':'葡萄牙德比','bra':'葡萄牙德比',
'ath':'巴斯克德比','rso':'巴斯克德比',

'gen':'热那亚德比','sam':'热那亚德比','hsv':'汉堡德比',
'pau':'汉堡德比',
'cn-sh':'上海德比','cn-shh':'上海德比','cn-bj':'京沪大战','cn-sd':'京津德比',
'hil':'利雅得德比',

'nsr2':'利雅得德比','ahl':'吉达德比','ahl2':'吉达德比',
'jbh':'现代德比','suw':'现代德比','ulh':'韩国德比',
'gmb':'大阪德比','cre':'大阪德比','kaw':'神奈川德比','yok':'神奈川德比',

'urw':'关西德比','kob':'关西德比',

'sun':'泰恩威尔德比','new':'泰恩威尔德比','lee':'约克郡德比','shu':'约克郡德比','sto':'西米德兰德比','wba':'西米德兰德比','avl':'西米德兰德比',

'nfo':'东米德兰德比','lct':'东米德兰德比',
'nor':'东盎格利亚德比','ips':'东盎格利亚德比',
'nyc':'纽约德比','nyr':'纽约德比','lag':'洛杉矶德比','lfc':'洛杉矶德比','ptl':'卡斯卡迪亚德比',

'sea':'卡斯卡迪亚德比',
'clb':'比利时德比',
 'and':'比利时德比','gnk':'比利时德比',
/* 新联赛德比：阿根廷/巴西/波兰 */
'boc':'超级德比','riv':'超级德比',
'rac1':'阿维拉内达德比','ind':'阿维拉内达德比',
'fla':'Fla-Flu德比','flu':'Fla-Flu德比',
'kra':'克拉科夫德比','wkr':'克拉科夫德比',
'legia':'波兰德比','lech':'波兰德比',
/* 土超 */
'gala':'伊斯坦布尔德比','fene':'伊斯坦布尔德比','bjk':'伊斯坦布尔德比','trab':'黑海德比',
/* 墨超 */
'amr':'国家德比','chs':'国家德比','crz':'墨西哥城德比','pms':'墨西哥城德比','mty':'蒙特雷德比','tgr':'蒙特雷德比',
/* 西乙 */
'mlg':'加利西亚德比','dep':'加利西亚德比','lev2':'巴伦西亚德比','elc':'巴伦西亚德比','cas2':'巴伦西亚德比',
'alme':'安达卢西亚德比','cor':'安达卢西亚德比','leg':'马德里德比','mir':'马德里德比',
/* 法甲 */
'lyo':'法国德比','len':'奥弗涅德比','parfc':'巴黎德比',
/* 法乙 */
'set':'东部德比','met':'东部德比','rei':'东北德比','nancy':'东北德比',
'gui':'布列塔尼德比','nts':'布列塔尼德比','mpl':'奥弗涅德比','cle':'奥弗涅德比','dij':'东部德比','g38':'东部德比',
/* 澳超 */
'syd':'悉尼德比','wsw':'悉尼德比','melc':'墨尔本德比','melv':'墨尔本德比','auck':'跨塔斯曼德比','wel':'跨塔斯曼德比',
/* K联赛 */
'seo':'首尔德比','suw':'首尔德比','poh':'东部德比',
/* J1 */
'fct':'东京德比','verdy':'东京德比','ksm':'关东德比','ngy':'东海德比',
/* 比甲 */
'stl':'列日-根特德比','gnt':'列日-根特德比','ant':'安特卫普德比',
/* 英冠 */
'sou':'南海岸德比','portsmouth':'南海岸德比','bla':'兰开夏德比','bolto':'兰开夏德比','cov':'西米德兰德比',
/* 加超 */
'frg':'艾伯塔德比','cvl':'艾伯塔德比',
/* 中甲 */
'cn-mz':'华南德比','gxhc':'华南德比','dlkc':'北方德比','sxcu':'北方德比'};
function aT(bx){
return bx&&aS[bx["cont"]]||null;
}function aU(bx,


by,bz){
if('wc'===bx)return af(['巴西','法国',"阿根廷",'德国',"西班牙","英格兰"]);
if("asia"===bx)return af(['日本','韩国','伊朗','沙特',"澳大利亚","卡塔尔","伊拉克","乌兹别克斯坦","阿联酋"]);
var bA=aT(bz);
function bB(bD){
return "cont"===bx?aT(aq(bD))===bA:ap(bD)===ap(by);
}var bC=a0["TEAMS"]["filter"](function(bD){
return bD['id']!==(by&&by['id'])&&bD["rep"]>=(by?by["rep"]-0x1:0x3)&&bB(bD);
});
return bC["length"]||(bC=a0["TEAMS"]["filter"](function(bD){return bD['id']!==(by&&by['id'])&&bB(bD);
})),



bC["length"]?af(bC)["name"]:'对手';
}function _aVMk(bx,by,bz){
"promo"!==bx&&"drop"!==bx||(a2["bigStage"+'d']=(a2["bigStage"+'d']||0x0)+0x1);
var bA=ar(),



bB=as();
var _bq={'kind':bx,'p':by,'recIdx':a2["seasons"]["length"],'age':a2["age"],'comp':bz&&bz["comp"]||'','team':bA?bA["name"]:'','opp':bz&&bz["opp"]||aU(bx,bA,bB),'teamId':bA?bA['id']:null};if(bz)for(var _bk in bz)_bq[_bk]=bz[_bk];_bq["teamId"]=bA?bA['id']:null;return _bq;}
function aV(bx,by,bz){
if(a2["bigQ"]&&a2["bigQ"]["length"])return!0x1;
return a2["bigQ"]=[_aVMk(bx,by,bz)],




!0x0;
}/* 大场面赛季优先级：世界杯 > 洲际(俱乐部/国家队/U23) > 升降级 > 德比；同级随机。
   队列被占时低优先级在队者立即 AI 结算让位（_aiCtx），同级 50% 随机让位 */
var _bmTier={'wc':0x4,'cont':0x3,'asia':0x3,'u23':0x3,'promo':0x2,'drop':0x2,'derby':0x1};
/* 域：国家队大场面 vs 俱乐部洲际赛。同档次、跨域 → 允许同年并存（_bmFinish 后串行播第二场），就像世界杯小组赛与决赛 */
var _bmLane={'wc':'nat','asia':'nat','u23':'nat','cont':'club'};
function _aVPri(bx,by,bz){
if(!(a2["bigQ"]&&a2["bigQ"]["length"]))return aV(bx,by,bz);
var cur=a2["bigQ"][0x0],ct=_bmTier[cur["kind"]]||0x0,nt=_bmTier[bx]||0x0;
if(a2["bigQ"]["length"]<0x2&&nt===ct&&nt>=0x3&&_bmLane[bx]&&_bmLane[cur["kind"]]&&_bmLane[bx]!==_bmLane[cur["kind"]]){a2["bigQ"]["push"](_aVMk(bx,by,bz));return!0x0;}
if(!cur["_aiCtx"]||nt<ct)return!0x1;
if(nt===ct&&ad()>=0.5)return!0x1;
for(var _qi=0x0;_qi<a2["bigQ"]["length"];_qi++)_bmAiSettle(a2["bigQ"][_qi]);
a2["bigQ"]=[];
return aV(bx,by,bz);
}
function _bmAiSettle(bx){
var c=bx&&bx["_aiCtx"];
if(!c)return;
var _bz2=a2["_curBz"]||a2["seasons"][bx["recIdx"]]||null;
if(c["t"]==='nat'){
/* 国家队决赛被让位代结：走统一出口 _natFinalBook（设 stage/写 natFx/同步 tournaments/清挂起），
   避免只 aZ 后残留 _natWC/_natAsia，导致后续 _bmFinish 用残留挂起再结算一次（同届冠军+亚军双记）。
   生死战（phase='group'）代结时按 AI 重算整段签表结果再记。 */
var _wcc=(c["comp"]==="世界杯"),_tag=_wcc?"wc":"asia",_susp=_wcc?a2["_natWC"]:a2["_natAsia"];
if(_susp&&_susp["phase"]==="group"){var _gr=_natResolveComp(_wcc?"wc":"asia",_susp["_team"],_susp);delete a2[_wcc?"_natWC":"_natAsia"];_bz2&&aZ(_bz2,c["comp"],_gr["stage"],_susp["age"]);}
else if(_susp){_natFinalBook(_tag,_susp,_bz2,c["stage"]==="冠军",0x0,0x0,null,c["comp"]);}
else{_bz2&&aZ(_bz2,c["comp"],c["stage"],bx["age"]);}
}
else if(c["t"]==='cont')_contAiSettle(bx);
else if(c["t"]==='promo'){
var wC=_poOne(c["f1"],c["f2"],!0x0);
_moveTeam(wC["i"],c["to2"],!0x0,0x2);
_bz2&&a2["teamId"]===wC["i"]&&(_bz2["move"]='升上'+ak(c["to2"])["name"]);
}else if(c["t"]==='bm'){
var _rows=a2["lgTables"]&&a2["lgTables"][c["lg"]],_ri,_meR=null,_opR=null;
if(_rows){for(_ri=0;_ri<_rows["length"];_ri++){if(_rows[_ri]["i"]===bx["teamId"])_meR=_rows[_ri];if(_rows[_ri]["i"]===bx["oppId"])_opR=_rows[_ri];}
if(_meR&&_opR){var _fd2=a2["lgFx"]&&a2["lgFx"]["data"][c["lg"]];
_tblAddmatch(_meR,c["hg"],c["ag"],c["meHome"]);_tblAddmatch(_opR,c["hg"],c["ag"],!c["meHome"]);
if(_fd2){_fd2[c["r"]][c["m"]][2]=c["meHome"]?c["hg"]:c["ag"];_fd2[c["r"]][c["m"]][3]=c["meHome"]?c["ag"]:c["hg"];}
_tblResort(c["lg"]);}}
}
}
/* 被让位的洲际决赛按 AI 模拟结算（数据都在 state：_contRun + contFx） */
function _contAiSettle(bx){
var c=bx["_aiCtx"],_cr=a2["_contRun"],_fd=a2["contFx"]&&a2["contFx"]["data"][c["tag"]];
if(!_cr||!_fd)return;
var ko=_koSim(bx["_meS"]||0x46,bx["oppStr"]||0x46,0x0,!0x0),meW=ko["won"];
var _lr=_cr["rounds"][_cr["rounds"]["length"]-0x1],_tie=_fd["rounds"][_fd["rounds"]["length"]-0x1]["ties"][0x0];
_tie["sa"]=ko["hg"];_tie["sb"]=ko["ag"];_tie["p"]=ko["pk"]||null;_tie["w"]=meW?a2["teamId"]:bx["oppId"];delete _tie["pd"];
_fd["champion"]=_tie["w"];
_lr["won"]=meW;_lr["score"]=ko["hg"]+'-'+ko["ag"]+(ko["pk"]?' (点球 '+ko["pk"][0x0]+'-'+ko["pk"][0x1]+')':'');
_cr["result"]=meW?'冠军':'止步决赛';
a2["cupRuns"]["push"](_cr);delete a2["_contRun"];
if(meW){
/* AI 代结夺冠同样要发奖杯：写进当季赛季记录与生涯奖杯柜（与交互路径一致）。
   必须用 _curBz：被让位时本季赛季记录还没 push 进 seasons，取 length-1 会写到上一季。 */
var _cz2=a2["_curBz"]||a2["seasons"][a2["seasons"]["length"]-0x1];
if(_cz2){_cz2["trophies"]=_cz2["trophies"]||[];if(_cz2["trophies"]["indexOf"](_cr["comp"]+'冠军')<0x0)_cz2["trophies"]["push"](_cr["comp"]+'冠军');}
var _tn1=_cr["comp"]+'冠军',_ta1=(_cr["age"]!=null?_cr["age"]:a2["age"]),_dup1=!0x1;for(var _ti1=0x0;_ti1<a2["trophies"]["length"];_ti1++)if(a2["trophies"][_ti1]["name"]===_tn1&&a2["trophies"][_ti1]["age"]===_ta1){_dup1=!0x0;break;}if(!_dup1)a2["trophies"]["push"]({'name':_tn1,'age':_ta1,'team':(aj(a2["teamId"])||{"name":''})["name"]});
}
a2["contHist"]=a2["contHist"]||[];
a2["contHist"]["push"]({'age':(_cr["age"]!=null?_cr["age"]:a2["age"]),'comp':c["tag"],'tid':_tie["w"]});
_devAdd(_tie["w"],2,0x1);
}
/* 德比类型：n=国家级/跨城经典，c=同城，r=同区域（决定 intro 与终场文案语境） */
var _dbyCity=['上海德比','马德里德比','米兰德比','都灵德比','罗马德比','热那亚德比','伦敦德比','北伦敦德比','西伦敦德比','曼市德比','默西塞德德比','伯明翰德比','里斯本德比','大阪德比','汉堡德比','利雅得德比','吉达德比','纽约德比','洛杉矶德比'];
function _dbyType(label){
  var s=String(label||'');
  if(s["indexOf"]('国家')>=0x0||s==='京沪大战')return'n';
  return _dbyCity["indexOf"](s)>=0x0?'c':'r';
}
function _bmOppStr(bx){
  if(bx["oppStr"])return bx["oppStr"];
  var tm=bx["teamId"]?ar():null;
  if(bx["kind"]==="wc"||bx["kind"]==="asia")return 0x3c+(bx["kind"]==="wc"?0x10:0x8);
  return tm?tm["rep"]*0x8+0x2e:0x46;
}
/* 大场面强弱口径对齐常规 _matchSim：我队用真实球队绝对强度（_meS 优先），对手用 oppStr */
function _bmStrPair(bx){
  var _my=(bx["_meS"]!=null)?bx["_meS"]:(ar()?_teamAbs(ar()):Math["round"](a2["ovr"]+0x18));
  if(bx["kind"]==="wc"||bx["kind"]==="asia")_my=Math["round"](_natStr?_natStr():_my);
  var _opp=(bx["oppStr"]!=null)?bx["oppStr"]:_bmOppStr(bx);
  return[_my,_opp];
}
/* 联赛节奏几何平均（与常规 _matchSim 的 gl 同源） */
function _bmGl(bx){
  var _ml=ap(ar()),
      _oid=bx["oppId"]||bx["counterTid"],
      _ol=_oid?(ap(aj(_oid))||bx["fromLeague"]||null):(bx["fromLeague"]||null);
  if(!_ml)_ml=_ol||'ch';
  if(!_ol)_ol=_ml;
  return _glOf(_ml,_ol);
}
/* 我队进球份额：与 _msShare 同口径；联赛场按主客，杯赛/决赛中立；再加决策累积的 dp（赢面加成） */
function _bmShare(bx,myStr,oppStr){
  var _fx=bx["_fx"],_neu=!(_fx&&_fx["lg"]),_sh;
  if(_neu)_sh=_msShare(myStr,oppStr,!0x0);
  else if(_fx["meHome"])_sh=_msShare(myStr,oppStr,!0x1);
  else _sh=1-_msShare(oppStr,myStr,!0x1);
  var _dp=bx["_dp"]||0x0;
  return Math["max"](0.12,Math["min"](0.93,_sh+_dp));
}
/* 球员单场进球/助攻概率：直接复用常规 _pMatchContrib 的公式（位置份额×OVR×对手），
   glory=本场决策累积的“个人表现”倾向，越高越偏向自己解决（提进球概率） */
function _bmPlayerProb(bx,myStr,oppStr){
  var grp=al(a2["pos"])["group"]||"att";
  var f=(0.55+0.55*(a2["ovr"]-0x32)/0x32)*(a2["ovr"]>=0x58?1.10+0.03*(a2["ovr"]-0x58):0x1);
  var diff=(oppStr!=null&&myStr!=null)?ac((oppStr-myStr)/0x1e,-1,1):0;
  var sh={'att':[0.24,0.11],'mid':[0.15,0.19],'def':[0.07,0.045],'gk':[0,0]}[grp]||[0.15,0.15];
  /* 队内地位（roleAdjust ±4）直接影响大场面参与度：核心球员更多触球/开火，边缘球员更少（±8%/档） */
  var _roleF=Math["max"](0.7,Math["min"](1.35,1+0.08*(a2["roleAdju"+'st']||0x0)));
  var g=Math["max"](0,1+(bx["_glory"]||0x0)*0.6);
  return[ac(sh[0]*f*(1-0.25*diff)*g*_roleF,0.01,0.65),ac(sh[1]*f*(1-0.1*diff)*_roleF,0.01,0.5),grp];
}
/* 大场面专用随机流：叙述/事件/球员归属都不消耗主 RNG，保证"比分只由强弱决定"，
   不会因为球员 OVR 高→叙述行多→随机流分叉而反过来影响胜负 */
var _bmR=0x1;
function _bmRnd(){_bmR=(Math["imul"](_bmR,0x41c64e6d)+0x3039)>>>0x0;return _bmR/0x100000000;}
function _bmSeed(bx){_bmR=(((_rs||0x9e3779b9)^((a2["age"]||0x0)*0x9e3779b1)^(((bx&&bx["comp"])||'').length*0x85ebca6b))>>>0x0)||0x1;}
function _bmEvents(bx){
  var k=bx["kind"],



g=al(a2["pos"])["group"]||"att",t=bx["t"]||0x0;
  var m=function(lo,hi){return "第"+(t+lo+Math["floor"](_bmRnd()*(hi-lo+1)))+" 分钟";};
  var common=[
    [m(0x1,0xf)+"，角球开出，禁区内抢点差之毫厘，全场一阵叹息。",null],
    [m(0x1,0xf)+"，一次漂亮的二过一撕开防线，可惜最后的射门被门将没收。",null],
    ["主裁判示意补水时间，双方球员聚在教练席前听布置。",null],
    ["中场拼抢激烈，皮球在两队之间来回易手。",null],
    [m(0x1,0xf)+"，双方在禁区外对攻，最后一脚都差之毫厘。",null],
    ["VAR 介入检查一次禁区内倒地，最终维持原判。",null],
    [m(0x1,0xf)+"，边路下底传中，禁区内头球攻门稍稍偏出。",null],
    ["裁判出示一张黄牌，给了一次战术犯规。",null]
  ];
  /* 青年赛专属事件池：替换成年场通用事件（VAR/补水等成年语境不适用），含递进 flag 事件 */
  if(_yKind(k))common=_yBmCommon(bx,m);
  var posCommon="gk"===g?[
    [m(0x1,0xf)+"，对方一脚冷射直奔死角，你飞身单掌将球托出横梁！",null],
    ["角球开出，你果断出击双拳将球击出危险区。",null],
    [m(0x1,0xf)+"，你倒地扑出对方近在咫尺的打门，看台响起掌声。",null],
    [m(0x1,0xf)+"，你稳稳接住对方禁区外的一记远射，皮球牢牢抱在怀里。",null],
    ["对方门将开大脚，你示意后防线整体压上。",null]
  ]:"def"===g?[
    ["对方边路起高球，你抢在对方前锋之前将球顶出。",null],
    [m(0x1,0xf)+"，你卡住身位将球护出底线，化解了一次险情。",null],
    ["一次定位球防守，你把落点控制得干干净净。",null],
    [m(0x1,0xf)+"，对方带球强突，你精准铲断将球留下。",null],
    ["你适时前插，在对方禁区前沿逼抢出一次机会。",null]
  ]:"mid"===g?[
    [m(0x1,0xf)+"，你一脚斜长传精准找到边路空当，队友下底传中。",null],
    ["你在中场护球转身，被对方战术犯规放倒。",null],
    [m(0x1,0xf)+"，你送出手术刀直塞，可惜队友越位在先。",null],
    [m(0x1,0xf)+"，你从后场一路带球推进到中场，分给前插的队友。",null],
    ["你在禁区弧顶拿球，作势要射，骗过防守后传给空当的队友。",null]
  ]:[
    ["你在禁区弧顶一带游弋，寻找接应机会。",null],
    ["你背身倚住后卫做球，为队友创造了一次射门空间。",null],
    [m(0x1,0xf)+"，你的一次反越位跑动撕开防线，可惜传球慢了一拍。",null],
    [m(0x1,0xf)+"，你在禁区里被对手贴身防守，灵巧转身骗开角度。",null],
    ["你回撤到中场拿球，转身带球直冲对方防线。",null]
  ];
  var goalMe="att"===g?[
    [m(0x1,0xf)+"，你接到队友直塞，冷静推射远角得手！","打进了关键一球",0x1,null],
    [m(0x1,0xf)+"，你在禁区混战中捅射破门！","率先打破僵局",0x1,null],
    [m(0x1,0xf)+"，你主罚的任意球绕过人墙，直挂死角！","轰进世界波",0x1,null],
    [m(0x1,0xf)+"，你用一次灵巧的转身摆脱防守，低射入网！","完成致命一击",0x1,null],
    [m(0x1,0xf)+"，你胸部停球顺势凌空抽射，皮球直挂死角！","凌空斩",0x1,null]
  ]:"mid"===g?[
    [m(0x1,0xf)+"，你在大禁区线上张弓搭箭，一脚世界波直挂死角！","轰进世界波",0x1,null],
    [m(0x1,0xf)+"，你后插上抢点，将队友的传中狠狠顶入网窝！","抢点破门",0x1,null],
    [m(0x1,0xf)+"，禁区里一片混乱，你机警补射得手！","补射入网",0x1,null],
    [m(0x1,0xf)+"，你主罚的任意球绕过人墙，直挂死角！","轰进世界波",0x1,null],
    [m(0x1,0xf)+"，你在中场断球后长途奔袭，面对门将冷静推射得手！","一条龙破门",0x1,null]
  ]:"def"===g?[
    [m(0x1,0xf)+"，角球开出，你高高跃起将球砸入球网！","头球建功",0x1,null],
    [m(0x1,0xf)+"，定位球混战中，你迎球怒射破门！","定位球破门",0x1,null],
    [m(0x1,0xf)+"，后场一次任意球机会，你抢到第二落点爆射破门！","远射建功",0x1,null],
    [m(0x1,0xf)+"，角球二次进攻，你禁区外一脚凌空抽射直挂死角！","世界波破门",0x1,null],
    [m(0x1,0xf)+"，你从后场带球一路推进，远射轰出一记势大力沉的进球！","带球远射",0x1,null]
  ]:[];
  var goalOpp="gk"===g?[
    [m(0x1,0xf)+"，对方一脚角度极刁的射门，你扑到了但没能拦下。",null,null,0x1],
    [m(0x1,0xf)+"，对方近距离抢点，你反应神速仍鞭长莫及。",null,null,0x1],
    [m(0x1,0xf)+"，对方禁区内点球，你猜对了方向但仍差毫厘。",null,null,0x1],
    [m(0x1,0xf)+"，对方前锋小角度打门，球从你手边滑入远角。",null,null,0x1],
    [m(0x1,0xf)+"，对方一脚吊射越过你头顶，你回追不及目送入网。",null,null,0x1]
  ]:"def"===g?[
    [m(0x1,0xf)+"，你的一次解围踢疵，被对方抓住机会打进。",null,null,0x1],
    [m(0x1,0xf)+"，对方利用定位球头球破门，你盯防的人抢到了落点。",null,null,0x1],
    [m(0x1,0xf)+"，对方边路突破后倒三角回传，跟进推射得手。",null,null,0x1],
    [m(0x1,0xf)+"，对方一脚过顶长传打穿防线，前锋凌空垫射破门。",null,null,0x1],
    [m(0x1,0xf)+"，对方禁区前沿配合后远射，球折射后变向入网。",null,null,0x1]
  ]:"mid"===g?[
    [m(0x1,0xf)+"，中场被断球，对方一脚直塞打穿防线。",null,null,0x1],
    [m(0x1,0xf)+"，对方利用定位球头球破门。",null,null,0x1],
    [m(0x1,0xf)+"，对方禁区外一脚冷射，皮球折射入网。",null,null,0x1],
    [m(0x1,0xf)+"，对方中场抢断后就地组织，一脚直塞撕开防线。",null,null,0x1],
    [m(0x1,0xf)+"，对方在禁区前沿打出精妙配合，最后一传一射干净利落。",null,null,0x1]
  ]:[
    [m(0x1,0xf)+"，你前场丢球，对方迅速发动反击得分。",null,null,0x1],
    [m(0x1,0xf)+"，对方利用定位球头球破门。",null,null,0x1],
    [m(0x1,0xf)+"，对方后场长传找到前锋，单刀推射得手。",null,null,0x1],
    [m(0x1,0xf)+"，对方边路传中，前锋抢点甩头攻门，球砸入死角。",null,null,0x1],
    [m(0x1,0xf)+"，对方一次快速反击，二打一轻松推射空门得手。",null,null,0x1]
  ];
  /* 参与标记：goalMe=你进球，assistMe=你助攻（供文案分层与真实数据折算） */
  for(var _gmk=0x0;_gmk<goalMe["length"];_gmk++)goalMe[_gmk][0x4]="meG";
  var assistMe=("gk"===g)?[]:("att"===g?[
    [m(0x1,0xf)+"，你回撤做球，一脚直塞撕开防线，队友跟进推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区内巧妙横敲，队友迎球怒射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你下底传中，队友抢点头球破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区前沿做墙配合，队友抽射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你连续过人后倒三角回传，跟进推射得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你前场断球后冷静分球，队友单刀推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你脚后跟妙传撕开防线，队友凌空抽射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路突破后低平球传中，队友包抄破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你做了一个假动作晃开角度，回做给队友远射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你头球摆渡到禁区中央，队友凌空垫射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区前沿假射真传，队友反越位成功推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你角球精确找到队友，头球攻门得手！",null,0x1,null,"meA"]
  ]:"def"===g?[
    [m(0x1,0xf)+"，你后场送出精准长传，队友停球转身抽射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你抢断后一脚直塞打穿防线，队友单刀推射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路助攻传中，队友抢点头球破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你定位球开到禁区，队友混战中捅射得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你后场大脚解围变助攻，队友凌空抽射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你从后场带球推进，直塞撕开防线助队友得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你角球二次进攻传中，队友近距离撞射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场拦截后精准斜传，队友停球怒射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你任意球直接开到后点，队友头球顶入死角！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路超车后倒三角回传，队友推射空门得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中圈附近断球后长传打身后，队友凌空垫射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你掷出大力界外球到禁区，队友抢点捅射得分！",null,0x1,null,"meA"]
  ]:[
    [m(0x1,0xf)+"，你送出一脚穿透防线的直塞，队友单刀冷静推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场分球到边路，队友传中队友抢点破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区前沿巧妙做球，队友抽射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你定位球开到禁区，队友头球攻门得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路突破后传中，队友包抄推射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场抢断后直塞，队友反越位成功单刀得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你后场长传打身后，队友凌空抽射破网！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你角球开到前点，队友甩头攻门得手！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你禁区外远射被扑出，队友补射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你直塞球打穿防线，队友停球转身抽射得分！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你边路传中，队友禁区内凌空垫射破门！",null,0x1,null,"meA"],
    [m(0x1,0xf)+"，你中场组织进攻，一脚斜传助队友单刀推射得手！",null,0x1,null,"meA"]
  ]);
  if(k==="derby")common=common.concat([
    ["德比的火药味蔓延到看台，两片看台隔空对骂。",null],
    [m(0x1,0xf)+"，全场最恨的那个人放铲——你被抬到场边处理。",null,null,null,"inj"],
    ["整座球场像一口高压锅，每一次拼抢都带着火星。",null],
    ["两队教练在场边互相指责，第四官员忙着拉架。",null],
    ["看台上有人扔下了一条围巾，正好落在球场中央。",null]
  ]);
  if(k==="wc"||k==="asia")common=common.concat([
    ["国歌奏响时，你的眼眶发热。",null],
    ["看台上旅欧球迷的助威鼓声从没停过。",null],
    ["看台上的五星红旗铺满了整片看台。",null],
    ["场边的摄影记者围了里三层外三层。",null],
    ["你低头看了看胸前的国旗，深吸一口气。",null]
  ]);
  var pool;
  if(bx["_injured"]){
    pool=common.concat([
      ["你被换下后在替补席接受治疗，队医在你伤处缠上绷带。",null],
      ["你只能坐在替补席上干着急，眼睁睁看着比赛继续。",null],
      ["你在替补席来回踱步，一次次冲到场边朝队友喊话。",null],
      ["队医在你腿上喷了止痛喷雾，疼痛稍有缓解。",null],
      ["你裹着外套坐在替补席最前排，紧握双拳盯着场上。",null]
    ]);
  }else{
    pool=common.concat(posCommon);
  }
  /* 球员进球/助攻不再走"事件即得分"：文案池交给 _bmSeg 按 _pMatchContrib 概率归属后再叙述 */
  bx["_lines"]={"me":goalMe,"as":assistMe,"opp":goalOpp};
  return pool;
}
/* 青年赛（U系列）比赛事件池：家长看台/球探/青训氛围 + 递进 flag 差分 */
function _yBmCommon(bx,m){
  var p=[
    ["看台上你的父母举着自制的横幅，你妈比你还紧张。",null],
    ["青训总监坐在看台角落做笔记——他的本子上出现过的名字，后来大多踢上了职业。",null],
    ["U字号赛场没有视频回放，边裁举旗的手就是最终判决。",null],
    ["替补席上有人紧张得把矿泉水瓶捏得咯咯响。",null],
    [m(0x1,0xf)+"，对面的小胖中锋用身体把你拱开了两步，这个年纪的发育差距就是这么不讲理。",null],
    ["队医蹲在场边给中卫缠绷带，这个年纪的孩子，膝盖比脚法更需要保护。",null],
    ["看台上的助威声是成年球场没有的那种干净，什么广告牌都挡不住。",null],
    ["教练在边线喊：抬眼！你这才想起找空当。",null],
    [m(0x1,0xf)+"，双方在青年级别的草皮上打起了对攻，节奏快得吓人。",null],
    ["看台上有几个欧洲面孔的球探，笔记本从头记到尾。",null],
    ["中圈开球前，队长把所有人拢在一起吼了一声——这是这支青年队的老规矩。",null],
    ["国际足联的颁奖习惯是赛后马上挂奖牌，赛前没人愿意想这个。",null]
  ];
  if(bx["kind"]==='u17'&&a2["flags"]['_ntU15']&&!a2["flags"]['_ntU15core'])p["push"](["看台上有个熟人——两年前把你从U15名单上划掉的顾问。今天他坐得离你很近。",null]);
  if(a2["flags"]['_ntU17core'])p["push"](["边裁都认得你了，开球前冲你笑了笑。",null]);
  if(a2["flags"]['_ntBought']&&bx["kind"]==='u23')p["push"](["看台上有个中年人朝你点了点头。你认得他，也认得那通电话的味道。",null]);
  return p;
}
function _bmOpts(bx,



dec){
  var k=bx["kind"];
  var map=({"derby":["收缩防线","为他们冲垮对面","在中场缠住他们"],"wc":["踢得务实些","为国家豁出去","让皮球流动起来"],"cont":["控制节奏","全场高压逼抢","控球渗透"],"asia":["务实防守","全力冲击对手","地面推进"],"promo":["守住这个结果","历史由我们书写","耐心倒脚"],"drop":["冷静，再冷静","豁出去搏命","把球牢牢拿住"]}[k])||["稳住","压上","控球"];
  function opt(key){
    var lab=key==="hold"?map[0x0]:key==="push"?map[0x1]:key==="run"?map[0x2]:key==="wall"?"全员退防":key==="solo"?"自己单干":"稳住";
    var hint=key==="hold"?"小幅提高赢面，个人数据平淡":key==="push"?"赢面涨得最多，也最可能被反击打穿":key==="run"?"居中，队友更愿意找你":key==="wall"?"摆大巴死守到底，难看但有效":key==="solo"?"孤注一掷用个人能力解决问题":"";
    return{"key":key,"label":lab,"hint":hint};
  }
  var sc=bx["score"]||[0,0];
  if(dec==="kickoff"||dec==="halftime"){
    if(sc[0x0]>sc[0x1])return[opt("hold"),opt("wall"),opt("push")];
    if(sc[0x0]<sc[0x1])return[opt("push"),opt("solo"),opt("hold")];
    return[opt("hold"),opt("push"),opt("run")];
  }
  if(dec==="endgame"){
    if(sc[0x0]>=sc[0x1])return[opt("hold"),opt("push")];
    return[opt("push"),opt("solo")];
  }
  if(dec==="extra")return[opt("push"),opt("hold")];
  if(dec==="pen")return[{"key":"left","label":"射向左下角","hint":"瞄着最刁的角度，但门将也可能猜中"},{"key":"top","label":"打中路","hint":"骗门将扑边，自己打中间"},{"key":"right","label":"射向右上角","hint":"大力抽向死角"}];
  return[opt("hold"),opt("push"),opt("run")];
}
function _bmIntro(bx){
  var k=bx["kind"],



opp=bx["opp"]||"对手",side=bx["team"]||"你们";
  var _pick=function(arr){return arr[Math["floor"](ad()*arr["length"])]};
  if(k==="derby"){
    var _dt=_dbyType(bx["comp"]);
    if(_dt==='n')return _pick([
      "国家德比。这从来不只是两座球场的胜负——整个国家今晚被这一场球分成两半，连不看电视的人都会问比分。",
      "赛前一周全国的报纸都在写这场比赛。历史、地域、旧账全被翻出来，压在了这九十分钟上。"+opp+"不会手软，你们也不会。",
      "这是那种会被反复重播很多年的比赛。通道里你能听见自己的心跳——国家德比的灯光下，没有小角色。",
      "教练在赛前只放了一段视频：两队第一次交手的黑白影像。快一百年过去了，恩怨一分没少。今晚轮到你们写下一笔。"
    ]);
    if(_dt==='r')return _pick([
      "地区恩怨局。两座城市隔得不远，积怨攒得不浅——看台上的歌声从大巴进场就没停过。",
      "这是一场没有降级风险也必须赢的比赛——为了整片地区的脸面。"+opp+"的球迷已经提前到了，客队看台的横幅挂了三层。",
      "赛前停车场里两队球迷泾渭分明，警察在中间拉起隔离带。这种比赛，谁先眨眼谁丢一片心。",
      "出租车司机一路上都在念叨"+opp+"的历史战绩。这片地方今晚只有一个话题——谁才是这片地的老大。"
    ]);
    return _pick([
      "德比之夜。整座城市在这一晚分成两半，看台上的歌声与呐喊几乎要把屋顶掀翻。对手是"+opp+"，恩怨早已写进历史——今天，你要让对面半座城安静下来。",
      "同城死敌，无需动员。从踏进球场的那一刻起，空气里就弥漫着火药味。"+opp+"的球迷已经在看台上竖起了巨型横幅，你绝不能让他们笑着离开。",
      "德比日，整座城市只分成两种颜色。赛前外卖小哥都在问你支持哪边。"+opp+"那边已经提前一周在社交媒体上挑衅了，今天是回击的时候。",
      "出租车司机一路上都在骂"+opp+"，街边小饭馆的电视已经调好了直播。这座城市今晚只有一个话题——谁才是真正的老大。",
      "德比的意义从来不只是三分。走出更衣室时，看台上那片山呼海啸般的敌意扑面而来，但你知道，球场的另一端，有同样的狂热在为你燃烧。"
    ]);
  }
  if(k==="wc"&&bx["_grpWC"])return _pick([
    "世界杯小组赛最后一轮，出线与否全系于这九十分钟。赢，或者回家——没有第三种答案。",
    "生死战。赛前积分榜就摆在更衣室白板上，教练只写了一句话：把命运握在自己手里。今晚全场都会是红色的。",
    "小组赛末轮，净胜球、相互战绩被翻来覆去算了一遍又一遍。"+opp+"是你必须跨过去的那道坎——跨过去，世界杯的故事才继续。",
    "这是那种赛前就睡不着的比赛。看台上举着的横幅比任何一场都多，每一声呐喊都在说同一句话：赢下它。",
    "四年只剩这九十分钟来证明自己。"+opp+"同样输不起，两边都知道，谁先松一口气谁就收拾行李。",
  ]);
  if(k==="wc")return _pick([
    "世界杯决赛！这是每一个球员从孩提时代起就梦寐以求的舞台。全世界的目光聚焦于此，国歌奏响的那一刻，你会明白自己为什么一路走到这里。",
    "决赛之夜。万里之外的球迷守在屏幕前，国内的街道空无一人——所有人都在等你。这座球场将见证历史，而你就是历史的一部分。",
    "世界杯决赛，一生可能只有一次。走进球场时，闪光灯像星星一样铺满了整个看台。你的手微微发抖，但心里只有一个念头：把它赢下来。",
    "国歌响彻球场，你的眼眶湿润了。从街头踢球的孩子到站上世界杯决赛的舞台，这条路走了太久。"+opp+"已经站好了位置，裁判即将吹响哨声。",
    "决赛前夜你几乎没有合眼。现在站在这里，草皮的香气、看台的声浪、队友的呼吸——一切都真实得不像话。"+opp+"是最后一道关卡，跨过去就是冠军。"
  ]);
  if(k==="asia")return _pick([
    "亚洲之巅。四年一届的亚洲杯决赛，你站在这里，身后是无数国人的期待。对手是"+opp+"，这是一场不容有失的比赛。",
    "亚洲杯决赛，国内已经是凌晨三点，但一定有人守着直播。你代表着这片土地上所有踢球的孩子，"+opp+"不会轻易把冠军拱手相让。",
    "从小组赛一路杀进决赛，每一场都是硬仗。"+opp+"的球员技术细腻、配合默契，但你们有你们的武器——那股子不服输的劲。",
    "颁奖台已经摆在了场边，金色的奖杯在灯光下闪闪发亮。但你心里清楚，只有跨过"+opp+"这最后一道坎，它才属于你。",
    "赛前教练只说了一句话：想想你们是怎么走到这里的。是啊，从预选赛到淘汰赛，每一步都是拼命拼出来的。决赛，不过是最后一拼。"
  ]);
  if(k==="cont")return _pick([
    "洲际赛场的终极决战。你所在的"+side+"闯入决赛，对手是"+opp+"。一个赛季的拼搏，浓缩在这九十分钟里。",
    "欧冠之夜。这是欧洲之巅的对决，全世界最好的球队在这里碰撞。"+opp+"的阵容星光熠熠，但你们走到这里靠的不是名气，是血性和信念。",
    "从小组赛死里逃生到半决赛惊天逆转，你们的故事已经足够传奇。但决赛是另一回事——"+opp+"不会给你任何犯错的机会。",
    "球场外的广告牌闪烁着赞助商的logo，球场内的空气却紧张得几乎凝固。"+opp+"的球迷方阵已经开始了他们的战歌，你深吸一口气，准备迎战。",
    "教练在更衣室里最后叮嘱了一遍战术，然后看着你说：今晚靠你了。你点点头，走出更衣室的通道，看台上的声浪扑面而来。"
  ]);
  if(k==="promo")return _pick([
    "升级附加赛！一个赛季的挣扎与坚持，换来这场一战定生死的机会。赢下它，你们将踏上更高的舞台。",
    "九十分钟决定一个赛季的命运。赢了，明年在这个球场踢的将是顶级联赛；输了，一切回到原点。没有加时，没有退路。",
    "赛前更衣室里异常安静，每个人都在想同一件事：这场球不能输。对方的实力不弱，但你们走到这一步，靠的就是这股子韧劲。",
    "教练在白板上画完最后一个战术跑位，转身对你们说：今天不是来学习的，是来拼命的。你们互相看了一眼，眼神里全是决心。",
    "球场外的球迷已经开始庆祝了——不，他们是在提前为自己打气。这条通往顶级联赛的路，就差这最后一场了。"
  ]);
  if(k==="drop")return _pick([
    "保级生死战。这场比赛的结局，决定球队明年的命运。没有退路，没有人想带着降级离开。",
    "如果今天输了，明年你们将出现在更低级别的联赛名单上。这座球场、这些球迷、这个赛季的所有努力——都悬在这一场比赛上。",
    "保级战从来不是什么好看的比赛。没有华丽的传控，只有拼命的奔跑和凶狠的铲断。但这就是生存的方式。",
    "赛前队长把大家叫到一起：我不管外面怎么写我们，今天只要拿出命来踢，结局就不会太难看。所有人把手叠在一起，喊了一声。",
    "对方只需要一分就能保级，而你们必须赢。这意味着你们要压上、要冒险、要面对他们每一次反击的威胁。但别无选择。"
  ]);
  if(k==="u17")return _yIntroHead(bx)+_pick([
    "一路从预选赛踢到亚少赛决赛。你还没满十八岁，但国少队这批人已经把整片亚洲的青年军都掀了一遍。今天对面的"+opp+"，是最后一道坎。",
    "亚少赛决赛。你从小看着电视里国字号输球的画面长大，今天你自己穿上了这件球衣。"+opp+"很强，但你们走到这里也不是靠运气。",
    "决赛日。看台上稀稀拉拉但很执着的中国球迷喊着你的名字。教练在通道里说：别怕，对手也是十七岁的孩子。你点点头，把拳头攥紧了。",
    "赛前联席会开了一个钟头，"+opp+"的领队一直在争取更好的更衣室。你在门外听着，忽然意识到这种事以后还会有很多次——但今天是你们孩子的战场。",
    "热身时你注意到看台上有几个欧洲面孔，手里的本子记个不停。球探不看不出身，只看这九十分钟。你的机会和这批队友的，都在这九十分钟里。",
    "决赛前一晚查房，教练把你们几个主力的手机收走了。黑暗里有人小声问：明天会赢吗？没人回答，但也没人睡着。"
  ])+_yOppLine(opp);
  if(k==="u19")return _yIntroHead(bx)+_pick([
    "亚青赛决赛。这个年龄的亚洲赛场，是所有天才的第一块试金石。"+opp+"的青年队名满亚洲，但你们也有自己的武器。",
    "从小组赛跌跌撞撞到一路连胜，U19国青站到了决赛的草皮上。赢了这场，明年的世青赛就有你们的位置——如果你还在的话。",
    "决赛前夜，队里没人睡得着。十八九岁，这是最容易做梦也最容易碎掉的时候。"+opp+"在等着，把梦守住。",
    "半决赛后你的名字第一次出现在了转会传闻里。经纪人打电话让你别分心，教练什么都没说，只把首发名单拍在了你面前。",
    "这批人里有几个从U13就在一起踢——那时候你们抢一个馒头都能打起来。今天可能是这个班底的最后一场。",
    "上一次中国队站在这个赛事的决赛，队里老队员说是很多年前了。历史这种东西，听着远，踢起来就九十分钟。"
  ])+_yOppLine(opp);
  if(k==="u23")return _yIntroHead(bx)+_pick([
    "U23亚洲杯决赛，也是奥运会的门票。职业联赛磨了几年，你和这批同年龄的伙伴再一次为国字号站上决赛场。"+opp+"，老对手了。",
    "国奥队的更衣室里贴着一张纸：距离奥运会，还有九十分钟。你抬头看了一眼，把球衣塞进裤子里，走进了通道。",
    "这是你在年龄梯队的最后一届大赛——过了这年，就再没有U23了。"+opp+"也一样年轻，也一样输不起。",
    "俱乐部放人的时候提了条件：别受伤。但到了这种决赛，谁收缩着踢谁是孙子。你要在安全和历史之间选一个。",
    "赛前发布会，记者问他『这批球员和欧洲同龄人的差距』，教练把你推到了话筒前。你听见自己说：九十分钟后你们自己看。",
    "看台上坐着一半的职业球探，一半的家长。你爸妈托人从国内带了横幅，挂在客队看台的角落，字很土，但你热身时看了三次。"
  ])+_yOppLine(opp);
  return _pick([
    "关键一战。你所在的"+side+"迎战"+opp+"，全场球迷的呐喊已经响彻球场。",
    "这是一场谁也输不起的比赛。"+opp+"已经做好了准备，而你们的更衣室里，空气几乎凝固。",
    "赛前训练只持续了半小时，教练说：今天不需要练了，你们知道该怎么做。走出训练场时，你抬头看了看天空，深吸一口气。",
    "球场外聚集了大批球迷，有人举着你的名字的牌子。你透过大巴车窗看到这一幕，心里默默说了一句：今晚不会让你们失望。",
    "双方球员在通道里列队，目光交汇的一瞬间，火花四溅。"+opp+"的队长朝你点了点头，你也微微点头回应——竞技场上，尊重从这一刻开始。"
  ]);
}
function _bmSeg(bx){
  /* 与常规 _matchSim 同口径：以我方/对手真实强度算份额，总量=2·base·gl，均分到 6 段 */
  var _sp=_bmStrPair(bx),_sh=_bmShare(bx,_sp[0x0],_sp[0x1]);
  var _tot=2*_msCfg["base"]*_bmGl(bx)/0x6;
  var lH=_tot*_sh,lA=_tot*(1-_sh);
  if(lH<0.04)lH=0.04;if(lA<0.04)lA=0.04;
  var hg=_poisson(lH),ag=_poisson(lA);
  var _pool=_bmEvents(bx);   /* 同时填充 bx._lines（球员进球/助攻文案池） */
  var ev=null;
  if(_bmRnd()<0.55&&_pool&&_pool["length"]){
    var _hist=bx["_evHist"]||[],_try=0;
    do{ev=_pool[Math["floor"](_bmRnd()*_pool["length"])];_try++;}while(_try<0x6&&_hist["indexOf"](ev[0x0])>=0x0);
    _hist["push"](ev[0x0]);if(_hist["length"]>0x4)_hist["shift"]();
    bx["_evHist"]=_hist;
    /* 抽到"受伤"台词不等于真受伤：再过一道低概率判定（基础 ~22%，按健康/伤病加成缩放），
       大场面下场受伤因此是低概率事件（约 3%/场，此前约 12.8%/场）；判定不过只当一次场边处理。 */
    if(ev[0x4]==="inj"&&_bmRnd()<0.22*((a2["healthBonus"]||0x1))*((a2["achBonus"]&&a2["achBonus"]["injury"])||0x1))bx["_injured"]=!0x0;
    if(ev[0x2]!=null)hg=Math["max"](hg,ev[0x2]);
    if(ev[0x3]!=null)ag=Math["max"](ag,ev[0x3]);
  }
  bx["score"][0x0]+=hg;bx["score"][0x1]+=ag;
  /* 球员数据归属：与常规 _pMatchContrib 同概率（位置份额×OVR×对手），逐球分配；glory 提高个人倾向 */
  var _pp=_bmPlayerProb(bx,_sp[0x0],_sp[0x1]),_ps=_pp[0x0],_pa=_pp[0x1],_grp=_pp[0x2],_meG2=0x0,_meA2=0x0;
  if(_grp!=="gk"&&!bx["_injured"])for(var _gi=0x0;_gi<hg;_gi++){
    if(_bmRnd()<_ps){_meG2++;bx["_meG"]=(bx["_meG"]||0x0)+0x1;}
    else if(_bmRnd()<_pa){_meA2++;bx["_meA"]=(bx["_meA"]||0x0)+0x1;}
  }
  var t=bx["t"]||0,



_isInj=ev&&ev[0x4]==="inj",_isGoalEv=ev&&(ev[0x2]!=null||ev[0x3]!=null);
  var _teamGoalPool=[
    "由一次流畅配合破门",
    "在一次快速反击中冷静推射得手",
    "抓住对方防线的失误，轻松破门",
    "通过一连串耐心的传导，撕开防线得分",
    "在一次角球混战中把球捅进网窝",
    "边路起球，中路跟进抢点破门",
    "禁区前沿的一脚世界波，直挂死角"
  ];
  var _oppGoalPool=[
    "对方抓住一次机会扳回一城",
    "对方同样用一次漂亮配合还以颜色",
    "对方通过一次定位球机会追回一分",
    "对方抓住我方后场的一次失误破门",
    "对方远射轰开球门，缩小了比分差距"
  ];
  /* 分场面进球差分文案：每个场面只保留少数真正特殊的句子，与通用池一起随机点缀，不再按场面刷屏 */
  var _teamGoalKind={"derby":["顶着整片死敌看台的嘘声把球轰进球门","在全场火药味最浓的时刻一剑封喉","用一记爆射让同城死敌的庆祝声戛然而止"],"wc":["在世界杯决赛的聚光灯下洞穿球门","把最沉重的一脚射门送进世界杯决赛的网窝","在全世界屏住呼吸的瞬间完成致命一击"],"asia":["在亚洲之巅的决赛上冷静施射得分","用一粒进球点燃了整片亚洲看台的欢呼","在万众瞩目的亚洲决战中攻破球门"],"cont":["在洲际决赛的舞台上轰入制胜一球","用漂亮的配合在洲际之巅撕开防线","在决赛的重压下稳稳将球送进死角"],"promo":["把整个赛季的汗水都压进这一脚","在决定命运的升级战中挺身而出","用金子般的进球推开升级的大门"],"drop":["在最不能输的保级大战中顶住压力破门","把全队的求生欲望一脚踢进网窝","在最需要英雄的时刻打进关键一球"]}[bx["kind"]]||[];
  var _oppKindPool={"derby":["同城死敌攻破球门，对面看台瞬间沸腾","同城死敌打进一球，刺耳的声浪盖过整片看台","同城死敌的进球让你们的心凉了半截"],"wc":["对方在世界杯决赛中攻破球门","对方的进球让世界杯冠军的悬念重新燃起","对手抓住一次机会，在世界杯决赛扳回一城"],"asia":["对方在亚洲之巅的决赛中扳回一球","对手的进球让亚洲冠军的归属重起悬念","对方抓住机会攻破球门"],"cont":["对手在洲际决赛中攻入一球","对方的进球让奖杯变得遥远起来","对手扳回一城，决赛重新有了悬念"],"promo":["对手的进球让升级前景再次紧张起来","对方在升级关键战中打入一球","对手破门，把你们逼到了悬崖边"],"drop":["对方在保级生死战中先声夺人","对手的进球拉响了保级的警报","对方破门，让降级的阴影重新笼罩"]}[bx["kind"]]||[];

  if(_teamGoalKind["length"])_teamGoalPool=_teamGoalPool["concat"](_teamGoalKind);
  if(_oppKindPool["length"])_oppGoalPool=_oppGoalPool["concat"](_oppKindPool);
  var _pick=function(arr){return arr[Math["floor"](_bmRnd()*arr["length"])];};
  if(_isInj)bx["log"]["push"](ev[0x0]);
  else if(ev&&ev[0x0]&&!hg&&!ag)bx["log"]["push"](ev[0x0]);
  /* 同一 15 分钟段可能出多球：先攒起来按分钟先后插叙，避免"先 30 分钟后 25 分钟"的时间错乱。
     我方进球里被归属给玩家的用球员文案池（含"你…"），其余用通用池 */
  var _lines=bx["_lines"]||{"me":[],"as":[],"opp":[]};
  var _strip=function(s){return String(s)["replace"](/^第[^，]*，/,'');};
  var _goals=[],_gmi,_gmin,_mi=0x0,_ai=0x0,_txt;
  for(_gmi=0;_gmi<hg;_gmi++){
    _gmin=ae(t+0x1,t+0xf);
    if(_mi<_meG2&&_lines["me"]["length"]){_txt="第"+_gmin+" 分钟，"+_strip(_pick(_lines["me"])[0x0]);_mi++;}
    else if(_ai<_meA2&&_lines["as"]["length"]){_txt="第"+_gmin+" 分钟，"+_strip(_pick(_lines["as"])[0x0]);_ai++;}
    else _txt="第"+_gmin+" 分钟，"+(bx["side"]||"你们")+_pick(_teamGoalPool)+"。";
    _goals["push"]({'_m':_gmin,'_x':_txt});
  }
  for(_gmi=0;_gmi<ag;_gmi++){_gmin=ae(t+0x1,t+0xf);_goals["push"]({'_m':_gmin,'_x':"第"+_gmin+" 分钟，"+_pick(_oppGoalPool)+"。"});}
  _goals["sort"](function(_a,_b){return _a["_m"]-_b["_m"];});
  for(_gmi=0;_gmi<_goals["length"];_gmi++)bx["log"]["push"](_goals[_gmi]["_x"]);
  return{hg:hg,ag:ag};
}
function _bmAdvance(bx){
  while(true){
    if(bx["done"])return;
    if(bx["dec"])return;
    var seg=bx["seg"]||0x0;
    if(seg===0x0){bx["seg"]=0x1;bx["dec"]="intro";
      /* U系列：intro 即赛前选拔态度决策（影响本场胜率与递进 flag） */
      bx["opts"]=_yKind(bx["kind"])?_ntSelOpts(bx):[{'key':"start",'label':"开始比赛",'hint':"走上球场，全场球迷都在等你"}];return;}
    if(seg===0x1){bx["seg"]=0x2;if(bx["_injured"])continue;bx["dec"]="kickoff";bx["opts"]=_bmOpts(bx,"kickoff");return;}
    if(seg===0x5){bx["seg"]=0x6;if(bx["_injured"])continue;bx["dec"]="halftime";bx["opts"]=_bmOpts(bx,"halftime");return;}
    if(seg===0x9){
      var sc=bx["score"];
      if(sc[0x0]===sc[0x1]){
        /* 联赛性质的大场面（德比/保级）允许平局：不进加时，结果按平局回填积分榜 */
        if('derby'===bx["kind"]||'drop'===bx["kind"]){bx["done"]=!0x0;return;}
        bx["seg"]=0xa;bx["dec"]="extra";bx["opts"]=_bmOpts(bx,"extra");return;
      }
      bx["done"]=!0x0;return;
    }
    if(seg>=0xa){bx["done"]=!0x0;return;}
    var _ph=bx["score"][0x0],_pa=bx["score"][0x1];
    _bmSeg(bx);
    bx["t"]=(bx["t"]||0x0)+0xf;
    if(bx["score"][0x0]!==_ph||bx["score"][0x1]!==_pa)bx["log"]["push"]("比分 "+(bx["side"]||"你们")+" "+bx["score"][0x0]+" : "+bx["score"][0x1]);
    bx["seg"]=seg+0x1;
  }
}
function _bmFinish(bI,



_p){
  var bM,bN=_p["score"][0x0],bO=_p["score"][0x1],bP=[],bQ='',bS=null;
  var bW=al(a2["pos"])["group"],bV=aR[bI["kind"]]["side"]||bI["team"];
  var as=Math["round"](a2["ovr"]+0x18),



bs=_bmOppStr(bI);
  if(bI["kind"]==="wc"||bI["kind"]==="asia")as=Math["round"](_natStr? _natStr() : a2["ovr"]+0x18);
  var _mood=bI["_mood"]||0x0;
  var sd=(as-bs)/0x5a;
  if(bN===bO&&!_p["_extraDone"]&&!('derby'===bI["kind"]||'drop'===bI["kind"]||bI["_drawOk"])){
    _p["_extraDone"]=!0x0;
    _p["log"]["push"]("九十分钟战平，进入加时赛。");
    var _sp=_bmStrPair(bI),_sh=_bmShare(bI,_sp[0x0],_sp[0x1]);
    var _etTot=0.33*2*_msCfg["base"]*_bmGl(bI);
    var eH=_etTot*_sh,eA=_etTot*(1-_sh);
    if(eH<0.04)eH=0.04;if(eA<0.04)eA=0.04;
    var _eh=_poisson(eH),_ea=_poisson(eA);
    /* 加时进球文案按归属分层：我方细分为「你进球/你助攻/队友」 */
    var _etTeam=["终于打破僵局！","在加时赛补射得手！","抓住加时赛的一次反击机会破门！","一脚世界波轰开对方球门！","在混战中把球捅进网窝！","禁区内转身抽射破门！"],_etYouGoal=["在反击中直捣黄龙，冷静推射远角破门！","加时赛带球长途奔袭，晃过门将推射空门得手！","一脚禁区外远射直挂死角，洞穿对方球门！","禁区内接队友传中，凌空垫射破门！","前场断球后单刀赴会，一蹴而就！","头球攻门砸入死角，完成致命一击！","连续配合后禁区前沿抽射，球贴地钻入网窝！","角球二次进攻中抢点捅射破门！","任意球直接攻门，球绕过人墙飞入死角！","禁区混战中补射得手，完成绝杀！","边路突破后内切，兜射远角破门！","前场任意球直接轰门，球如炮弹般入网！"],_etYouAssist=["送出一记手术刀直塞，助攻队友完成致命一击！","角球精确制导，队友头球砸入网窝！","边路传中精准找到队友，头球攻门得手！","禁区前沿做球给队友，一脚抽射破网！","直塞球打穿防线，队友单刀推射破门！","倒三角回传跟进，队友推射空门得手！","头球摆渡到禁区中央，队友凌空抽射得分！","边路突破后倒三角回传，队友包抄推射破门！","任意球开到后点，队友头球顶入死角！","禁区前沿假射真传，队友反越位成功推射破门！","中场断球后直塞，队友停球转身抽射得分！","角球二次进攻传中，队友近距离撞射破门！"],_etA=["对方完成了绝杀！","对方在加时赛扳回一城！","对方通过定位球在加时赛得分！","对方抓住一次反击机会破门！","对方禁区内抢点推射得手！","对方远射轰入死角，比分被扳平！"];
    /* 逐球解说（与 _bmSeg 同口径）：否则比分加多球却只播一球 */
    var _gwg=al(a2["pos"])["group"],_pp9=_bmPlayerProb(bI,_sp[0x0],_sp[0x1]);
    var _etHist=bI["_evHist"]||[],_etPk=function(arr){var v,g=0;do{v=arr[Math["floor"](_bmRnd()*arr["length"])];g++;}while(g<0x6&&arr["length"]>0x1&&_etHist["indexOf"](v)>=0x0);_etHist["push"](v);if(_etHist["length"]>0x4)_etHist["shift"]();return v;};
    bI["_evHist"]=_etHist;
    if(_eh>0){bN+=_eh;
      for(var _gi9=0x0;_gi9<_eh;_gi9++){
        var _etLine;
        if(_gwg==="gk")_etLine=bV+_etPk(_etTeam);
        else{
          var _r9=_bmRnd();
          if(_r9<_pp9[0x0])_etLine="你"+_etPk(_etYouGoal),bI["_meG"]=(bI["_meG"]||0x0)+0x1;
          else if(_r9<_pp9[0x0]+_pp9[0x1])_etLine="你"+_etPk(_etYouAssist),bI["_meA"]=(bI["_meA"]||0x0)+0x1;
          else _etLine=bV+_etPk(_etTeam);
        }
        _p["log"]["push"]("加时赛，"+_etLine);
      }
    }
    if(_ea>0){bO+=_ea;
      for(var _giA=0x0;_giA<_ea;_giA++)_p["log"]["push"]("加时赛，"+_etA[Math["floor"](ad()*_etA["length"])]);
    }
    _p["score"][0x0]=bN;_p["score"][0x1]=bO;
    _p["log"]["push"]("比分 "+bV+" "+bN+" : "+bO);
    if(bN===bO&&!bI["_injured"]){
      _p["dec"]="pen";_p["opts"]=_bmOpts(bI,"pen");
      a2["pending"]=_p;
      return;
    }
  }
  if(bN===bO&&_p["_extraDone"]){
    bP["push"]("九十分钟和加时都没分出胜负。点球大战。");
    /* 统一模型：命中率取双方实力（as/bs 同 _penSim 口径）；玩家那一脚算作本队第 1 罚 */
    var _rt=_penProb(as,bs),_pa=_rt[0x0],_pb=_rt[0x1];
    var _aG=_p["_penDone"]&&_p["_penA"]?0x1:0x0,_bG=0x0;
    var _aK=_p["_penDone"]?0x1:0x0,_bK=0x0,_guard=0;
    while(_aK<0x5||_bK<0x5){if(_aK<0x5){_aK++;if(ad()<_pa)_aG++;}if(_bK<0x5){_bK++;if(ad()<_pb)_bG++;}}
    while(_aG===_bG&&_guard++<0x14){if(ad()<_pa)_aG++;if(ad()<_pb)_bG++;}
    bS=[_aG,_bG];
    bM=_aG>=_bG;
    !bI["_injured"]&&bP["push"](_p["_penA"]===!0x0?"你主罚的一球稳稳命中，为球队提供了保障。":"你主罚的一球被扑出，球队陷入被动。");
    bP["push"]("点球 "+_aG+" : "+_bG);
  }else{
    bM=bN>bO;
    bQ=bM?"领先":"落后";
  }
  var bX=null;
  /* 赛后个人播报：不再用 40% 随机台词，直接按本场真实数据(_meG/_meA)套文案；未参与进球的按位置组给兜底句 */
  bI["_injured"]||(a2["seasons"][bI["recIdx"]||0x0]||{"apps":0x0})["apps"]>0x0&&(bX=(function(){var _pk=function(a){return a[Math["floor"](_bmRnd()*a["length"])]},_mg=(bI["_meG"]||0x0),_ma=(bI["_meA"]||0x0),_tot=bN+bO,_pool;if(_mg>0x0&&_ma>0x0){_pool=["打进 "+_mg+" 球，还送出 "+_ma+" 次助攻",_mg+" 球 "+_ma+" 助攻，这场比赛没有别人什么事"];if(_mg+_ma>=bN)_pool["push"]("一个人参与了本队每一个进球："+_mg+" 球 "+_ma+" 助攻");return _pk(_pool);}if(_mg>0x0){if(_mg>=0x3)return _pk(["上演帽子戏法，全场 "+_mg+" 球","独中 "+_mg+" 元，对方整条防线都记住了你的号码"]);if(_mg===0x2)return _pk(["梅开二度","两个进球，一个比一个关键"]);_pool=["打进了那个球","打进一球","这球进得干净利落"];if(_tot===0x1)_pool["push"]("打进全场唯一一个进球");return _pk(_pool);}if(_ma>0x0)return _ma>=0x2?_pk(["送出 "+_ma+" 次助攻，中场被你盘活了",""+_ma+" 次助攻，机会都是从你脚下出来的"]):_pk(["送出那记决定比赛的助攻","一脚传球撕开了整条防线"]);if("gk"===bW)return bS?"点球大战中扑出了关键一球":(bO===0x0?"零封了对手，站在球门前一整个下午":"高接低挡，把比分死死按住");if("def"===bW)return bO===0x0?_pk(["在门线上把球解围出去","把对方的每一次冲击都挡在了身前"]):_pk(["在门线上把球解围出去","禁区里的高球，大多是你先顶到"]);if("mid"===bW)return bM?_pk(["送出了那记决定比赛的直塞","把节奏攥在自己手里"]):_pk(["把球权一次次抢回来","跑了整场，把中场填满"]);/* 前锋既没进球也没助攻：不再声称"全队唯一一次射门"（前面可能已经有别人射门/进球） */return bN>0x0?_pk(["几次拿球都被对方夹住","为队友扯开了空间，机会都不在你这侧","跑位一直在做，只是球没传过来"]):_pk(["全场没有一次像样的机会","你在前场孤立无援，拿球就被夹住","九十分钟下来，一次像样的射门都没有"]);})()),




  bX&&bP["push"]('你'+bX+'。'),
  bI["_injured"]&&bP["push"]("你被换下后坐在替补席上看完了剩下的比赛，伤处还在隐隐作痛。");
  'derby'===bI["kind"]&&bP["push"](_dbyType(bI["comp"])==='c'?(bM?"终场哨响的那一刻，属于你的那半边看台炸了。有人抱着你哭。":"对面看台的歌声一直唱到终场，像刀子一样扎进耳朵。这就是德比。"):(bM?"终场哨响，"+(bI["comp"]||'德比')+"拿下了。这三分带着百年恩怨的分量，全国的头条都是你的球队。":"终场哨响。对面看台的歌声一直唱到终场。这种比赛输了，一周都抬不起头。"));
  var bY=bV+'\x20'+bN+" 比 "+bO+(bS?"，点球 "+bS[0x0]+" 比 "+bS[0x1]:'')+'。';
  var _drawLg=!bM&&!bS&&bN===bO&&('derby'===bI["kind"]||'drop'===bI["kind"]);
  if(_yKind(bI["kind"])){
    var _fy=bM?(bS?_yFin["pw"]:_yFin["w"]):(bS?_yFin["pl"]:_yFin["l"]);
    bP["push"](_fy[Math["floor"](ad()*_fy["length"])]["replace"]("{s}",bY));
    if(bI["kind"]==='u23'&&a2["flags"]["_ntBought"])bP["push"](bM?"颁奖时你把金牌咬了一下。没有想象中甜——你想起的仍是那个把钱转出去的下午。":"赛后有记者问起你少年时代的事。你答得很快，快得像排练过。");
  }else if(_drawLg){
  var _dp=["终场哨响，"+bY+"谁也没能压过谁。这种比赛的一分，踢过的人才知道有多烫手。",
    "终场哨响，"+bY+"双方教练握手时都没笑。平局对谁都不是答案，但至少不是灾难。",
    "终场哨响，"+bY+"看台上的歌声没有停——这种夜晚，平局像一场没打完的仗。"];
  bP["push"](_dp[Math["floor"](ad()*_dp["length"])]);
  }else{
  bP["push"](bM?"终场哨响。"+bY+(bS?"点球大战赢下来的"+"那种赢法，腿是软"+'的。':"很多年以后你还会"+"梦到这一刻。"):bY+(bS?"点球大战输掉的球"+"，最难过去。":"你在草皮上坐了很"+"久，没人来拉你。"));
  }
  var bZ=a2["seasons"][bI["recIdx"]]||null,



c0=[];
  bZ&&bZ["apps"]>0x0&&(
  "cont"===bI["kind"]&&bM?(bZ["trophies"]["push"](bI["comp"]+'冠军'),a2["trophies"]["push"]({'name':bI["comp"]+'冠军','age':bI["age"],'team':bI["team"]||(aj(a2["teamId"])||{"name":''})["name"]})):"promo"===bI["kind"]&&bM?(_moveTeam(bI["teamId"],am[bI["fromLeag"+'ue']],!0x0,0x1),bZ["move"]='升上'+ak(am[bI["fromLeag"+'ue']])["name"]):"drop"!==bI["kind"]||bM||(_moveTeam(bI["teamId"],ao[bI["fromLeag"+'ue']],!0x1,0x1),bZ["move"]='降入'+ak(ao[bI["fromLeag"+'ue']])["name"]),bI["counterTid"]&&!bM&&_moveTeam(bI["counterTid"],bI["counterTo"],!0x0,0x2));
  if(a2["_natWC"]&&a2["_natWC"]["phase"]==="group"){var _gw=a2["_natWC"];var _gi=_gw["_lastIdx"],_gm=_gw["_gsim"]["matches"][_gi];if(_gm["homeId"]==='n_chn'){_gm["hg"]=bN;_gm["ag"]=bO;}else{_gm["hg"]=bO;_gm["ag"]=bN;}var _gr=_natResolveComp("wc",_gw["_team"],_gw);a2["natForm"]["wc"]=_natFormVal(_gr["stage"],"wc");if(a2["natFx"]&&a2["natFx"]["data"]&&a2["natFx"]["data"]["wc"]){a2["natFx"]["data"]["wc"]["rounds"]=_gr["rounds"];a2["natFx"]["data"]["wc"]["groups"]=(_gr["allGroups"]||[]).map(function(st,gi2){return{'name':'第'+(gi2+1)+'组','standings':st};});var _cid=_natChampId(_gr["rounds"]);if(_cid)a2["natFx"]["data"]["wc"]["champion"]=_cid;}if(_gr["stage"]==="冠军"||_gr["stage"]==="亚军"){_gw["phase"]="final";a2["_natGrpToFinal"]=!0x0;}else{aZ(bZ,'世界杯',_gr["stage"],_gw["age"]);delete a2["_natWC"];}}else if(a2["_natWC"]){_natFinalBook("wc",a2["_natWC"],bZ,bM,bN,bO,bS);}if(a2["_natAsia"]){_natFinalBook("asia",a2["_natAsia"],bZ,bM,bN,bO,bS);}if(!a2["_natWC"]&&!a2["_natAsia"]&&('wc'===bI["kind"]||"asia"===bI["kind"])&&!bI["_grpWC"]){(function(){var _fbEx=!0x1,_fbN=a2["natRuns"]||[];for(var _fi=0x0;_fi<_fbN["length"];_fi++)if(_fbN[_fi]["comp"]===bI["comp"]&&_fbN[_fi]["age"]===bI["age"]){_fbEx=!0x0;break;}if(!_fbEx){b0(bZ,bI["comp"],bM?'冠军':'亚军',bI["age"]);a2["natForm"][bI["kind"]]=bI["kind"]==="wc"?(bM?0x4:0x3):(bM?0x3:0x2);}})();}if(a2["_contRun"]){var _cr3=a2["_contRun"];_cr3["result"]=bM?"冠军":"止步决赛";var _fr3=_cr3["rounds"][_cr3["rounds"]["length"]-0x1];_fr3["won"]=bM;_fr3["score"]=bN+"-"+bO;if(bS)_fr3["score"]+=(" (点球 "+bS[0x0]+"-"+bS[0x1]+")");a2["cupRuns"]["push"](_cr3);if(a2["contFx"])for(var _ck2 in a2["contFx"]["data"])if(a2["contFx"]["data"][_ck2]["name"]===_cr3["comp"]){var _cd2=a2["contFx"]["data"][_ck2];_cd2["champion"]=bM?bI["teamId"]:_fr3["oppId"];var _lt3=_cd2["rounds"][_cd2["rounds"]["length"]-0x1]["ties"][0];_lt3["w"]=_cd2["champion"];_lt3["sa"]=bN;_lt3["sb"]=bO;_lt3["p"]=bS?[bS[0x0],bS[0x1]]:null;delete _lt3["pd"];a2["contHist"]=a2["contHist"]||[];a2["contHist"]["push"]({'age':a2["age"],'comp':_ck2,'tid':_cd2["champion"]});_devAdd(_cd2["champion"],1.5,0x1);}delete a2["_contRun"];}
  /* 德比/保级大战回填：互动比分写回真实赛程与积分榜并重排序 */
  if(bI["_fx"]&&(bI["kind"]==='derby'||bI["kind"]==='drop')){
    var _fw=bI["_fx"],_rows=a2["lgTables"]&&a2["lgTables"][_fw["lg"]],_ri;
    if(_rows){var _meR=null,_opR=null;
      for(_ri=0;_ri<_rows["length"];_ri++){if(_rows[_ri]["i"]===bI["teamId"])_meR=_rows[_ri];if(_rows[_ri]["i"]===bI["oppId"])_opR=_rows[_ri];}
      if(_meR&&_opR){var _fd=a2["lgFx"]&&a2["lgFx"]["data"]&&a2["lgFx"]["data"][_fw["lg"]];
        _tblAddmatch(_meR,bN,bO,_fw["meHome"]);_tblAddmatch(_opR,bN,bO,!_fw["meHome"]);
        if(_fd){_fd[_fw["r"]][_fw["m"]][2]=_fw["meHome"]?bN:bO;_fd[_fw["r"]][_fw["m"]][3]=_fw["meHome"]?bO:bN;}
        _tblResort(_fw["lg"]);
      }
    }
  }
  /* 互动赛真实表现折算（替换旧随机+1）：俱乐部场次记俱乐部赛季，国家队场次记国家队统计；
     你进球/助攻按比赛事件计数(_meG/_meA)，GK 零封计 cs；点球大战进球不计入个人进球 */
  /* 大场面受伤的真实代价：不只是在文案里下场——本季记录标注伤病、能力受损、后续伤病概率上升 */
  if(bI["_injured"]&&!bI["_injCost"]){bI["_injCost"]=!0x0;
    /* 大场面受伤接入同一套伤病系统（与联赛伤病同表 a0.INJURIES，按 w 加权）：
       具体伤名 + 真实属性代价（不再是写死的 -2）；重伤置 _severeInjury 并强制排入伤病链
       （那声脆响→复出之战→受伤教会我的事），同时抬升再伤概率，后续还会走"伤后的抉择"转型事件。 */
    var _bzI=bZ||a2["_curBz"],_injD=a0["INJURIES"]?ah(a0["INJURIES"],function(x){return x['w'];}):null;
    var _injV=_injD?_injD["ovr"]:-0x2;
    _bzI&&(_bzI["note"]=_injD?_injD["name"]:"伤病",_bzI["injury"]=_injV);
    a2["ovr"]=ac(a2["ovr"]+_injV,0x14,0x63);
    a2["healthBonus"]=ac((a2["healthBonus"]||0x1)*(1+0.02*Math["abs"](_injV)),0.4,1.4);
    if(_injV<=-0x6&&a2["playerType"]!==0xb){a2["flags"]["_severeInjury"]=1;a2["flags"]["_severeInjName"]=_injD?_injD["name"]:"重伤";b1("injury_chain_bad");}
    bP["push"]("队医的结论出来了："+(_injD?_injD["name"]:"这一下")+"，要养一阵子。");
  }
  var _meG=(bI&&bI["_meG"])||0x0,_meA=(bI&&bI["_meA"])||0x0,_isNat=("wc"===bI["kind"]||"asia"===bI["kind"]),_gkCs=("gk"===bW&&bO===0x0&&!bI["_injured"])?0x1:0x0;
  if(bZ&&(_meG>0||_meA>0||_gkCs)){
    if(_isNat){
      if(a2["natStats"]){a2["natStats"]["goals"]=(a2["natStats"]["goals"]||0x0)+_meG;a2["natStats"]["assists"]=(a2["natStats"]["assists"]||0x0)+_meA;if(_gkCs)a2["natStats"]["cs"]=(a2["natStats"]["cs"]||0x0)+0x1;}
      bZ["natGoals"]=(bZ["natGoals"]||0x0)+_meG;bZ["natAssists"]=(bZ["natAssists"]||0x0)+_meA;if(_gkCs)bZ["natCs"]=(bZ["natCs"]||0x0)+0x1;
    }else{
      bZ["goals"]+=_meG;bZ["assists"]+=_meA;a2["totals"]["goals"]+=_meG;a2["totals"]["assists"]+=_meA;
      if(_gkCs){bZ['cs']=(bZ['cs']||0x0)+0x1;a2["totals"]['cs']=(a2["totals"]['cs']||0x0)+0x1;}
      /* cap 兜底（A 轻量）：复用赛季末封顶口径，避免互动赛折算冲破球队进球份额上限 */
      var _cr0=a2["_lgRow"];
      if(_cr0&&_cr0["gf"]>0x0){var _rg=a0["ROLES"][a2["role"]]["rank"],_cg=_rg>=0x3?0.7:_rg>=0x2?0.55:0.4,_ca=_rg>=0x3?0.55:_rg>=0x2?0.45:0.35,_mxG=Math["round"](_cr0["gf"]*_cg),_mxA=Math["round"](_cr0["gf"]*_ca);
        var _g0=bZ["goals"],_a0=bZ["assists"];
        if(bZ["goals"]>_mxG)bZ["goals"]=_mxG;if(bZ["assists"]>_mxA)bZ["assists"]=_mxA;
        if(bZ["goals"]+bZ["assists"]>_cr0["gf"]){var _ov=bZ["goals"]+bZ["assists"]-_cr0["gf"];bZ["goals"]=Math["max"](0x0,bZ["goals"]-_ov);}
        a2["totals"]["goals"]+=bZ["goals"]-_g0;a2["totals"]["assists"]+=bZ["assists"]-_a0;
      }
    }
  }
  /* U系列梯队记账：出场/进球进 _yCaps/_yGoals，夺冠写递进 flag 与奖杯（国家队大赛/俱乐部逻辑均不适用） */
  var _yk=_yKind(bI["kind"]);
  if(_yk){
    a2["_yCaps"]=a2["_yCaps"]||{};a2["_yGoals"]=a2["_yGoals"]||{};
    a2["_yCaps"][bI["kind"]]=(a2["_yCaps"][bI["kind"]]||0x0)+0x1;
    a2["_yGoals"][bI["kind"]]=(a2["_yGoals"][bI["kind"]]||0x0)+_meG;
    if(bM){a2["flags"][_yNT[_yk]["flag"]+"core"]=0x1;
      var _tn2=_yNT[_yk]["comp"]+'冠军',_dup2=!0x1;for(var _ti2=0x0;_ti2<a2["trophies"]["length"];_ti2++)if(a2["trophies"][_ti2]["name"]===_tn2&&a2["trophies"][_ti2]["age"]===bI["age"]){_dup2=!0x0;break;}if(!_dup2)a2["trophies"]["push"]({'name':_tn2,'age':bI["age"],'team':_yNT[_yk]["band"]});}
  }
  var c1=bM?_yk?_yNT[_yk]["win"]:'derby'===bI["kind"]?0xc:'wc'===bI["kind"]?0x1e:"asia"===bI["kind"]?0x12:0x10:_yk?_yNT[_yk]["lose"]:_drawLg?0x6:'derby'===bI["kind"]?0x2:'wc'===bI["kind"]?0xa:0x4,



c2=Math["round"](c1*(0x1-a2["fame"]/0x64));
  return a2["fame"]=ac(a2["fame"]+c2,0x0,0x64),c2&&c0["push"]({'cls':'up','text':"名气+"+c2}),



bI["_mood"]&&(a2["guanxi"]=ac(a2["guanxi"]+bI["_mood"],0x0,0x64),
  c0["push"]({'cls':'up','text':"关系+"+bI["_mood"]})),
a2["pending"]["result"]={'won':bM,'log':bP,'deltas':c0,'score':[bN,bO],'pens':bS},


a2["eventLog"]&&a2["eventLog"]["push"]({'age':(a2["pending"]&&a2["pending"]["age"]!=null?a2["pending"]["age"]:a2["age"]),'title':bI["comp"],'text':(bM?'derby'===bI["kind"]?'胜':'冠军':_drawLg?'平':'derby'===bI["kind"]?'负':'失利')+'：'+bY}),



a2["bigQ"]["shift"](),a2["_natGrpToFinal"]&&(a2["_natGrpToFinal"]=!0x1,_aVPri("wc",0.55,{"comp":"世界杯","age":(a2["_natWC"]&&a2["_natWC"]["age"]!=null?a2["_natWC"]["age"]:a2["age"]),"opp":_finalOpp(a2["_natWC"]["rounds"],"中国队"),"_aiCtx":{"t":"nat","comp":"世界杯","stage":a2["_natWC"]["stage"]}})),!a2["bigQ"]["length"]&&a2["_awardDue"]&&(a2["_awardDue"]=!0x1,_lgFinalRefresh(a2["seasons"][bI["recIdx"]]),bAw(a2["seasons"][bI["recIdx"]])),!a2["bigQ"]["length"]&&a2["_promoDue"]&&(a2["_promoDue"]=!0x1,_promoReleg(a2["seasons"][bI["recIdx"]],null,null)),window["NEWSFACTS"]&&_newsLiveTick(),!0x0;
}
function aW(){var bx=a2["bigQ"][0x0];
/* U13/U15 选拔营：不进交互比赛，直接按能力结算名单结果 */
if(bx&&bx["_quick"]){var _y=_yNT[bx["kind"]],_ok,_l=[],
  _pb=0.5+(_ntPrevCore(bx["kind"])?0.12:0x0)+(a2["ovr"]-0x28)/0x190,
  _pg=al(a2["pos"])["group"]||"att",
  _pickY=function(a){return a[Math["floor"](ad()*a["length"])]};
  _ok=ad()<ac(_pb,0.15,0.9);
  a2["_yCaps"]=a2["_yCaps"]||{};a2["_yGoals"]=a2["_yGoals"]||{};
  var _fd;
  if(_ok){a2["_yCaps"][bx["kind"]]=(a2["_yCaps"][bx["kind"]]||0x0)+0x2;a2["flags"][_y["flag"]+"core"]=0x1;
    a2["fame"]=ac(a2["fame"]+0x4,0x0,0x64);_fd=[{'cls':'up','text':"名气+4"}];
    _y["posW"]&&_y["posW"][_pg]&&_l["push"](_pickY(_y["posW"][_pg]));
    _l["push"](_pickY(_y["winLog"]));}
  else{a2["fame"]=ac(a2["fame"]-0x2,0x0,0x64);_fd=[{'cls':'down','text':"名气-2"}];
    _y["posL"]&&_y["posL"][_pg]&&_l["push"](_pickY(_y["posL"][_pg]));
    _l["push"](_pickY(_y["loseLog"]));}
  /* 递进线：U15 参照 U13 的结果 */
  if(bx["kind"]==='u15'&&a2["flags"]['_ntU13'])_l["push"](a2["flags"]['_ntU13core']?"教练组的本子上还留着上一期你的名字——这次他们想看你长成什么样。":"两年前公告栏前没有你的名字。这一次，你不想再看别人领队服了。");
  a2["eventLog"]&&a2["eventLog"]["push"]({'age':(bx&&bx["age"]!=null?bx["age"]:a2["age"]),'title':_y["comp"],'text':(_ok?'入选':'落选')+'：'+_y["band"]});
  a2["bigQ"]=[];
  a2["pending"]={'type':"bigmatch",'kind':bx["kind"],'comp':_y["comp"],'age':bx["age"],'icon':aR[bx["kind"]]["icon"],'side':_y["band"],'quick':!0x0,
    'opp':bx["opp"],'score':null,'log':[],'done':!0x0,'result':{'won':_ok,'log':_l,'deltas':_fd,'score':null,'pens':null}};
  return!0x0;}
bx["score"]=[0x0,0x0];bx["log"]=[];
bx["seg"]=0x0;bx["dec"]=null;bx["opts"]=null;bx["done"]=!0x1;bx["t"]=0x0;
bx["_lastEv"]=null;bx["_injured"]=!0x1;bx["_evHist"]=[];bx["_intro"]=_bmIntro(bx);
a2["pending"]={'type':"bigmatch",'kind':bx["kind"],'comp':bx["comp"],'age':bx["age"],'_grpWC':bx["_grpWC"],'_drawOk':bx["_drawOk"],'icon':aR[bx["kind"]]["icon"],'side':aR[bx["kind"]]["side"]||bx["team"],
'opp':bx["opp"],'score':bx["score"],'seg':bx["seg"],'dec':bx["dec"],'opts':bx["opts"],'log':bx["log"],'done':bx["done"],'t':bx["t"],'_intro':bx["_intro"]};
_bmSeed(bx);_bmAdvance(bx);
a2["pending"]["score"]=bx["score"];a2["pending"]["seg"]=bx["seg"];a2["pending"]["dec"]=bx["dec"];a2["pending"]["opts"]=bx["opts"];a2["pending"]["done"]=bx["done"];a2["pending"]["log"]=bx["log"];a2["pending"]["t"]=bx["t"];}
function aX(bx,



by,bz){var bA=aR[bx["kind"]]["side"]||bx["team"],bB=[],bC=ae(0x0,0x4),bD=ae(0x0,0x2);
'derby'===bx["kind"]&&bB["push"](af(["这座城市提前一周就分成了两半。","地铁里两拨球迷隔着车厢对视。","报纸头版印着历史交手记录：恩怨已经写了一百年。","看台上有人在发那种著名的挑衅海报。","出租车司机一路都在骂对面那个队。"]));
bx["_ctx"]&&bB["push"](bx["_ctx"]+"。谁都输不起的一场。"),
bx["ev"]&&bB["unshift"](bx["ev"]);return 0x0===by&&0x0===bz?bB["push"]("上半场谁都没打开"+"局面。你们在中场"+"来回磨了四十五分"+'钟。'):by>bz?(bB["push"]('第\x20'+ae(0x9,0x29)+" 分钟，"+bA+("先进了一个。看台"+"整个站了起来。")),
by>0x1&&bB["push"]("半场结束前又来一"+"个。你们把优势拉"+"到了两球。"),bz&&bB["push"]("对方在补时扳回一"+"个。中场哨响时那"+"边的替补席在喊。")):by<bz?(bB["push"]('第\x20'+ae(0x6,0x26)+(" 分钟丢球。皮球"+"进网的那一下，场"+"里安静得能听见对"+"方球迷。")),
bz>0x1&&bB["push"]("下半场开始前又被"+"打进一个。你们落"+"后两球。"),by&&bB["push"]("你们在半场前扳回"+"一个，比分咬住了"+'。')):bB["push"]("上半场互交白卷式"+"的两球。谁也没能"+"把比分甩开。"),




bB["push"](0x0===bD?"中场休息。更衣室"+"里教练在白板上画"+"了一通，最后转过"+"头看着你。":0x1===bD?"中场休息。主队球迷"+"的歌声盖过了客队，"+"教练在战术板上写了"+"又擦。":"中场休息。裁判因为"+"几次争议判罚被围住"+"，保安把两边隔开。"),



by>0x2&&bB["push"]("上半场你们就进了三"+"个，看台已经有人提"+"前庆祝了。"),bz>0x1&&bB["push"]("对方两球在手，气势"+"正盛。你们的防线感"+"觉快撑不住了。"),bB;
}var aY=[{'key':"hold",'label':"稳住阵型",'hint':"小幅提高赢面，个"+"人数据平淡",'dp':0.06,'glory':0.12,'mood':0x1},



{'key':"push",'label':"压上去搏",
'hint':"赢面涨得最多，也"+"最可能被反击打穿",'dp':0.13,'glory':0.5,'mood':0x2,'risk':!0x0},{'key':"run",'label':"把球做出来",'hint':"居中，队友更愿意"+'找你',
'dp':0.09,'glory':0.28,'mood':0x0},



{'key':'solo','label':'自己单干','hint':'不再信任队友，孤注一掷用个人能力解决问题','dp':0.02,'glory':0.62,'mood':0x1},{'key':'wall','label':'全员退防','hint':'摆大巴死守到底，难看但有效','dp':0.12,'glory':0.04,'mood':-0x1}];