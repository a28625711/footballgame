// window.DATA 尾部配置块（除 AWARDS/ENDINGS 独立成模块）
var config = {
'TROPHIES':{'league':{'name':"联赛冠军",'p':[0x0,0.02,0.05,0.16,0.3,0.45]},
'cup':{'name':"国内杯赛",'p':[0.02,0.04,0.08,0.15,0.22,0.28]},'leagueCup':{'name':"联赛杯",'p':[0x0,0.01,0.03,0.08,0.12,0.15]},'superCup':{'name':"超级杯",'p':[0x0,0.01,0.02,0.05,0.08,0.10]},'cont':{'name':"洲际冠军",'p':[0x0,0x0,0.02,0.04,0.07,0.18]},'world':{'name':"世俱杯",
'p':[0x0,0x0,0x0,0.004,0.012,0.03]}},
'NATIONAL':{'asia':{'name':"亚洲杯冠军"},'wc':{'name':"世界杯冠军"},'wcq':{'name':"打进世界杯"}},
'ROLES':{'star':{'name':"绝对核心",'apps':[0x2c,0x38],'mult':1.25,'rank':0x4},'starter':{'name':'主力','apps':[0x22,0x2e],'mult':0x1,
'rank':0x3},'rot':{'name':'轮换','apps':[0x12,0x1e],'mult':0.62,'rank':0x2},'sub':{'name':'替补','apps':[0x6,0x11],'mult':0.3,
'rank':0x1},'bench':{'name':"饮水机",'apps':[0x0,0x6],'mult':0.08,'rank':0x0}},
'ROLE_ORDER':["bench","sub","rot","starter","star"],
'YOUTH_ABROAD_FEE':0x2d,
'INJURIES':[{'name':"腘绳肌拉伤",'w':0x18,'ovr':-0x2},{'name':"半月板损伤",'w':0x10,'ovr':-0x3},{'name':"十字韧带断裂",
'w':0xa,'ovr':-0x6},{'name':"胫腓骨骨折",'w':0x6,'ovr':-0x8},{'name':"跟腱断裂",'w':0x3,'ovr':-0xb},{'name':"踝关节扭伤",'w':0x12,'ovr':-0x1},
{'name':"小腿肌肉撕裂",'w':0x9,'ovr':-0x2},{'name':"跖骨骨折",'w':0x6,'ovr':-0x4},{'name':"肩关节脱位",'w':0x4,'ovr':-0x3},{'name':"腰椎间盘突出",
'w':0x4,'ovr':-0x5}],
'GROWTH':[{'age':0xc,'d':[2.2,5.2]},{'age':0x10,'d':[0x4,7.4]},{'age':0x12,'d':[0x4,7.4]},{'age':0x14,
'd':[2.6,5.9]},{'age':0x16,'d':[2.4,5.1]},{'age':0x18,'d':[1.4,3.7]},{'age':0x1a,'d':[0.35,2.3]},{'age':0x1c,'d':[-0.5,1.4]},
{'age':0x1e,'d':[-1.5,0.7]},{'age':0x20,'d':[-2.4,-0.4]},{'age':0x22,'d':[-3.6,-0.8]},{'age':0x24,'d':[-0x5,-1.6]},{'age':0x26,
'd':[-6.5,-2.4]}],
'VALUE_TABLE':[[0x28,0x7530],[0x32,0x249f0],[0x37,0x61a80],[0x3c,0xf4240],[0x41,0x2625a0],[0x46,0x5b8d80],
[0x4b,0xc65d40],[0x50,0x1ab3f00],[0x55,0x3473bc0],[0x5a,0x8f0d180],[0x5f,0xee6b280],[0x63,0x11e1a300]]
};
