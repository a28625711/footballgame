// ---- part:11 | 联赛/杯赛/洲际配置 + 球队实力起落 ----





/* ── §7b 世界联赛引擎（联赛/杯赛/洲赛真实化，设计见 PLAN-league-realism.md） ── */



/* 联赛风格（进球环境乘数，次级修正；主模拟= _matchSim），校准步可调 */

var _lgStyle={'epl':1.05,'liga':0.92,'seri':0.88,'bund':1.08,'l1':0.95,'tur':1.0,'pri':1.02,'ere':1.12,'jup':1.08,'ch':1.0,
'seg':0.9,'b2':1.02,'spl':1.1,'mls':1.15,'jl':0.95,'kl':0.92,'csl':0.98,'ale':1.1,'l2':0.96,'serb':0.9,'cl1':0.95,'bra':1.0,'arg':0.95,'pol':1.0};
/* 联赛循环制式：默认双循环(2)。美职联/阿甲/墨超现实不踢完整双循环 → 单循环(1)；
   加拿超 8 队踢 4 循环、K 联赛 12 队踢 3 循环。避免总场次虚高（此前 MLS/阿甲 30 队=58 场）。 */
var _lgRR={'mls':1,'arg':1,'mx':1,'cpl':4,'kl':3};


/* 升降级配置：顶级自动降级名次区间 / 次级自动升级名次 / 次级附加赛名次区间 */

/* 升降级配置：顶级自动降级名次区间 / 次级自动升级名次 / 次级附加赛名次区间
   （法甲/中超减员人数与次级升级数配平：l1↕2、csl↕2 无附加赛；seri↔serb 3 升 3 降带附加赛） */

var _relegZone={'epl':[18,20],'liga':[18,20],'bund':[16,18],'l1':[17,18],'seri':[18,20],'csl':[15,16]};
var _promoAuto={'ch':[1,2],'seg':[1,2],'b2':[1,2],'l2':[1,2],'serb':[1,2],'cl1':[1,2]};
var _promoPlayoff={'ch':[3,6],
'seg':[3,6],'b2':[3,6],'serb':[3,6]};


/* 洲际名额：联赛名次→通道（ucl/uel/uecl/acl=正赛直进；*q=资格赛池名次） */

var _lgSlots={
'epl':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},
'liga':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},

'seri':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},
'bund':{'ucl':[1,2,3,4],'uel':[5,6],'uecl':[7],'uelq':[8,9]},

'l1':{'ucl':[1,2,3],'uel':[4,5],'uecl':[6,7],'uelq':[8,9]},
'tur':{'ucl':[1,2],'uel':[3,4],'uclq':[5,6,7],'uelq':[8,9]},
'pri':{'ucl':[1],'uclq':[2,3,4,5,6,7],'uecl':[8],'uelq':[9,10,11]},

'ere':{'ucl':[1],'uclq':[2,3,4,5,6,7],'uecl':[8],'uelq':[9,10,11]},
'jup':{'ucl':[1],'uclq':[2,3,4,5,6,7],'uecl':[8],'uelq':[9,10,11]},

'mx':{'ccl':[1,2,3],'cclq':[4,5,6,7]},
'cpl':{'cclq':[1,2,3]},
'csl':{'acl':[1],'aclq':[2,3,4,5,6]},
'jl':{'acl':[1,2],'aclq':[3,4,5,6]},
'kl':{'acl':[1,2],'aclq':[3,4,5,6]},
'spl':{'acl':[1,2],'aclq':[3,4,5,6]},

'mls':{'ccl':[1,2],'cclq':[3,4,5]},
'ale':{'acl':[1],'aclq':[2,3,4,5]},

/* 波兰：冠军进欧冠资格赛，杯赛冠军进欧联正赛 */
'pol':{'ucl':[1],'uclq':[2,3,4],'uel':[5],'uelq':[6,7],'uecl':[8],'ueclq':[9,10]},
/* 巴西/阿根廷：解放者杯 6 直进 + 2 资格赛（杯赛冠军另享直进） */
'bra':{'lib':[1,2,3,4,5,6],'libq':[7,8]},
'arg':{'lib':[1,2,3,4,5,6],'libq':[7,8]}
};

/* 国内杯赛冠军→洲际资格（键=顶级联赛 id） */

var _cupSlot={'epl':{'cup':'uel','leagueCup':'uecl'},'liga':{'cup':'uel'},'seri':{'cup':'uel'},'bund':{'cup':'uel'},'l1':{'cup':'uel'},
'tur':{'cup':'uel'},'pri':{'cup':'uel'},'ere':{'cup':'uel'},'jup':{'cup':'uel'},'csl':{'cup':'acl'},'jl':{'cup':'acl'},'kl':{'cup':'acl'},
'spl':{'cup':'acl'},'ale':{'cup':'aclq'},'mx':{'cup':'ccl'},'mls':{'cup':'ccl'},'cpl':{'cup':'cclq'},
'pol':{'cup':'uel'},'bra':{'cup':'lib'},'arg':{'cup':'lib'}};

/* 洲际正赛规模（欧冠 36 队瑞士轮；欧联/欧协/亚冠 24 队——9 个欧联会员联赛无法填满 3×36） */

var _contCfg={'ucl':{'name':'欧冠','size':36,'games':8},'uel':{'name':'欧联','size':24,'games':6},'uecl':{'name':'欧协联','size':24,'games':6},
'acl':{'name':'亚冠','size':24,'games':6},'cwc':{'name':'世俱杯','size':32,'games':0},'ccl':{'name':'中北美冠','size':24,'games':6},
'lib':{'name':'解放者杯','size':24,'games':6}};
var _lgRegion={};
(function(){for(var k in _lgSlots){var c=_lgSlots[k];_lgRegion[k]=(c["ucl"]||c["uel"]||c["uecl"])?'eu':(c["ccl"]||c["cclq"])?'na':(c["lib"]||c["libq"])?'sa':'as';}})();

function _tDev(tid){return a2["teamDev"]&&a2["teamDev"][tid]||0;}

/* 有效 rep：升降级重定位存 a2.repOf（DATA.TEAMS 保持不可变，保证同种子可复现/存档一致性） */

function _er(t){return a2&&a2["repOf"]&&a2["repOf"][t["id"]]!=null?a2["repOf"][t["id"]]:t["rep"];}
/* 冠军加成连冠递减：第1冠全额，第2冠75%，第3冠50%，第4冠起25%（连冠=连续每季至少一冠，无冠即清零） */
function _devChampM(tid){var st=(a2["titleStreak"]&&a2["titleStreak"][tid])||0;return st<=0?1:st===1?0.9:st===2?0.85:0.8;}
function _devAdd(tid,v,champ){
a2["_devBonus"]=a2["_devBonus"]||{};
var b=champ?v*_devChampM(tid):v;
if(champ){a2["_titWin"]=a2["_titWin"]||{};a2["_titWin"][tid]=1;}
a2["_devBonus"][tid]=(a2["_devBonus"][tid]||0)+b;
}