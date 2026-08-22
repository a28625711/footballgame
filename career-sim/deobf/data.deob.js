function _dat_0a(){return [];}function _dat_0b(x,x){return '';}(0x0,!(function(){'use strict';

var a={'ballon':"金球奖",'boot':"欧洲金靴",'glove':"金手套",'cslmvp':"中超最佳球员",'cslboot':"中超金靴",'afcpoy':"亚洲足球先生"},b=[{'id':"cut_debt",'tier':0x0,'title':"砸锅卖铁一场空",'desc':"家里那笔钱没能换"+"来一张职业合同。"+"回国那天没人接机"+"，行李里还有一双"+"没穿过的球鞋。",'hint':"送出国踢，没熬出"+"来，家里还欠着钱",'test':function(c){
return c["youthAbr"+"oad"]&&c["money"]<0x0;
}},{'id':"cut_abro"+'ad','tier':0x0,'title':"语言班没读完",'desc':"异国的青训营里没"+"人记得你的名字，"+"教练一直叫错。合"+"同没续，签证也到"+"期了。",'hint':"送出国踢，没能留"+'下来',
'test':function(c){
return c["youthAbr"+"oad"];
}},{'id':"cut_pro",'tier':0x0,'title':"一直没能转正",'desc':"梯队里比你小的一"+"茬茬上去了，你还"+"在同一块场地上练"+"同样的东西。十八"+"岁那年，没人再跟"+"你谈合同。",'hint':"在梯队熬到 18"+" 岁往上，始终没"+"够上成年队",
'test':function(c){
return c["youthCut"]>=0x12;
}},{'id':"cut15",'tier':0x0,'title':"差一年",'desc':"十五岁。再熬一年"+"就该谈职业合同了"+"。名单贴出来那天"+"你看了三遍，确认"+"自己不在上面。",'hint':"15 岁之后被刷"+"掉 —— 离成年"+"队只差一步",
'test':function(c){
return c["youthCut"]>=0xf;
}},{'id':"cut13",'tier':0x0,'title':"长个子那两年",'desc':"别人一个夏天窜起"+"来，你没有。十三"+"四岁的淘汰不讲道"+"理，讲的是骨头。",'hint':"13 到 14 "+"岁之间被刷掉",
'test':function(c){
return c["youthCut"]>=0xd;
}},{'id':"cut12",'tier':0x0,'title':"十二岁那年就不踢"+'了','desc':"第一年就没留下。"+"很多年以后有人问"+"你会不会踢球，你"+"说小时候练过。",'hint':"12 岁那年就被"+"刷了下来",
'test':function(c){
return c["youthCut"]<=0xc;
}},{'id':"banned",'tier':0x1,'title':"足坛蛀虫",'desc':"反赌扫黑没漏掉你"+"。名字被从纪录里"+"抹掉，只留在通报"+'里。','hint':"被反赌扫黑查到，"+"终身禁足",'test':function(c){
return c["banned"];
}},{'id':"goat",'tier':0x2,'title':"GOAT",'desc':"世界杯、金球、欧"+"冠，一样不缺。以"+"后每次有人排历史"+"最佳，名单第一行"+"都得先写你，再从"+"第二行开始吵。",'hint':"世界杯、金球、欧"+"冠，三样齐全",'bonus':{'talent':0.06},
'test':function(c){
return c["wcRank"]>=0x6&&c["award"](a["ballon"])>=0x1&&c["uclTroph"+"ies"]>=0x1;
}},{'id':"wcchamp",'tier':0x2,'title':"大力神杯",'desc':"中国队捧起了那座"+"杯。这一天之前，"+"没有人敢把这句话"+"写进任何一篇稿子"+'。','hint':"随中国队拿下世界"+'杯','bonus':{'ovr':0x2},
'test':function(c){
return c["wcRank"]>=0x6;
}},{'id':"wcfinal",'tier':0x2,'title':"决赛英雄",'desc':"世界杯决赛。你踢"+"满了全场，最后跪"+"在草皮上很久没起"+"来。那场球全国都"+"没睡。",'hint':"打进世界杯决赛",'test':function(c){
return c["wcRank"]>=0x5;
}},{'id':"wchero",'tier':0x3,'title':"黄金一代",'desc':"国家队打进了八强"+"。很多年以后，人"+"们说起中国足球，"+"先说的还是那个夏"+'天。','hint':"世界杯打进八强",'test':function(c){
return c["wcRank"]>=0x3;
}},{'id':"euro",'tier':0x4,'title':"留洋天花板",'desc':"五大联赛站稳了脚"+"跟。国内解说提起"+"你，语气像在说一"+"件出土文物。",'hint':"在五大联赛踢满六"+"个赛季，能力到过"+" 74",
'test':function(c){
return c["top5Seas"+"ons"]>=0x6&&c["maxOvr"]>=0x4a;
}},{'id':"wc16",'tier':0x4,'title':"创造历史",'desc':"小组出线了。十六"+"强那场加时被绝杀"+"，可你们已经走到"+"了从没到过的地方"+'。','hint':"世界杯小组出线",'test':function(c){
return c["wcRank"]>=0x2;
}},{'id':"wcgroup",'tier':0x4,'title':"世界杯初体验",'desc':"你踢过世界杯正赛"+"。小组赛三场就回"+"来了，但那三场是"+"几代人等来的。",'hint':"踢过世界杯正赛",'test':function(c){
return c["wcRank"]>=0x1;
}},{'id':"asiacup",'tier':0x3,'title':"亚洲之巅",'desc':"亚洲杯捧了杯。回"+"国那天首都机场挤"+"得走不动，很多人"+"是哭着来的。",'hint':"亚洲杯夺冠",'test':function(c){
return c["asiaRank"]>=0x6;
}},{'id':"natscore"+'r','tier':0x3,'title':"队史射手王",'desc':"国家队的射手榜第"+"一行是你的名字。"+"那些球分散在十几"+"年里，对手有强有"+"弱，但每一个都是"+"在国歌之后进的。",
'pos':{'gk':{'title':"队史第一门神",'desc':"国家队的零封纪录"+"是你的。那些比赛"+"分散在十几年里，"+"有几场你一个球没"+"丢，全国都记得。"}},'hint':"国家队进球 22"+" 个以上（门将："+"22 场零封）",
'test':function(c){
return'gk'===c["posGroup"]?c["natCs"]>=0x16:c["natGoals"]>=0x16;
}},{'id':"asiafina"+'l','tier':0x4,'title':"差一个球",'desc':"亚洲杯决赛输了。"+"很多年后你还是会"+"在半夜想起那个球"+"该怎么踢。",'hint':"打进亚洲杯决赛",'test':function(c){
return c["asiaRank"]>=0x5;
}},{'id':"fixer",'tier':0x4,'title':"没查到你头上",'desc':"那几场球你心里有"+"数。名单公布那天"+"你一条一条看完，"+"没有你，你也没觉"+"得轻松。",'hint':"涉过赌或打过假球"+"，清白跌破 45",
'test':function(c){
return(c["flags"]["fixed"]||c["flags"]["gambled"])&&c["clean"]<0x2d;
}},{'id':"agefraud",'tier':0x4,'title':"大三岁",'desc':"户口本上的那个年"+"份陪了你一辈子。"+"退役那年真实年龄"+"的你，其实还能再"+"踢两年。",'hint':"改过年龄",'test':function(c){
return c["flags"]["ageFraud"];
}},{'id':"legend",'tier':0x2,'title':"中国梅西",'desc':"以后每个踢球的小"+"孩都会被拿来跟你"+"比，然后被说「你"+"不是他」。",'pos':{'gk':{'title':"中国布冯"},'def':{'title':"中国马尔蒂尼"}},
'hint':"能力到过 88、"+"三座大赛级奖杯、"+"五大联赛五个赛季",'bonus':{'talent':0.04},'test':function(c){
return c["maxOvr"]>=0x58&&c["bigTroph"+"ies"]>=0x3&&c["top5Seas"+"ons"]>=0x5;
}},{'id':"cr7",'tier':0x2,'title':"中国C罗",'desc':"别人三十五岁开始"+"告别，你三十五岁"+"开始加练。最后那"+"几年没人再拿天赋"+"说你，只说自律。",'pos':{'gk':{'title':"中国范德萨"},
'def':{'title':"中国佩佩"},'mid':{'title':"中国莫德里奇"}},'hint':"能力到过 90、"+"生涯出场 100"+"0 以上、40 "+"岁之后才退役",'bonus':{'talent':0.03,'ovr':0x1},'test':function(c){
return c["maxOvr"]>=0x5a&&c["apps"]>=0x3e8&&c["age"]>=0x28;
}},{'id':"ballon",'tier':0x2,'title':"金球先生",'desc':"颁奖礼上你用中文"+"说了谢谢。台下有"+"人没听懂，但所有"+"人都站起来了。",'hint':"拿过金球奖",'bonus':{'talent':0.03},'test':function(c){
return c["award"](a["ballon"])>=0x1;
}},{'id':"asiaking",'tier':0x3,'title':"亚洲一哥",'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的中场都在研究"+"你怎么转身。",'pos':{'gk':{'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的前锋赛前都在"+"看你的扑点录像。"},
'def':{'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的中锋都记得被"+"你贴了九十分钟是"+"什么滋味。"},'att':{'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的后卫都在研究"+"你怎么启动。"}},
'hint':"两次亚洲足球先生",'test':function(c){
return c["award"](a["afcpoy"])>=0x2;
}},{'id':"asiabest",'tier':0x3,'title':"亚洲最佳",'desc':"亚洲足球先生拿过"+"一次。那一年你觉"+"得自己还能更好，"+"后来才知道那就是"+"顶点。",'hint':"拿过一次亚洲足球"+'先生',
'test':function(c){
return c["award"](a["afcpoy"])>=0x1;
}},{'id':"bigears",'tier':0x3,'title':"大耳朵杯",'desc':"欧冠决赛的那张全"+"队合影里有你。照"+"片挂在老家的墙上"+"，比任何一份合同"+"都久。",'hint':"拿过欧冠，且在五"+"大联赛待过两个赛"+'季','bonus':{'growth':1.06},
'test':function(c){
return c["uclTroph"+"ies"]>=0x1&&c["top5Seas"+"ons"]>=0x2;
}},{'id':"boots",'tier':0x4,'title':'金靴','desc':"一整个赛季你是射"+"手榜第一。有人说"+"是运气好，你把那"+"年的每个球都记着"+'。','hint':"拿过金靴（欧洲或"+"中超）",'bonus':{'ovr':0x2},'test':function(c){
return c["award"](a["boot"])+c["award"](a["cslboot"])>=0x1;
}},{'id':"uncrowne"+'d','tier':0x3,'title':"无冕之王",'desc':"能力从来不是问题"+"，柜子里就是一座"+"奖杯都没有。有些"+"人一辈子没赶上一"+"支好队。",'hint':"能力到过 82，"+"却一座奖杯都没有",
'test':function(c){
return c["maxOvr"]>=0x52&&0x0===c["trophies"];
}},{'id':"wall",'tier':0x3,'title':"国足门神",'desc':"十年国家队正选门"+"将。中国队输的每"+"一场球，你都是最"+"后一个离场的。",'hint':"门将，国家队出场"+" 30 次以上",'test':function(c){
return'gk'===c["posGroup"]&&c["caps"]>=0x1e;
}},{'id':"shutout",'tier':0x3,'title':"叹息之墙",'desc':"三百多场零封。进"+"球集锦里从来没有"+"你，失球集锦里也"+"没有。",'hint':"门将，生涯 30"+"1 场零封",'test':function(c){
return'gk'===c["posGroup"]&&c['cs']>=0x12d;
}},{'id':"sniper",'tier':0x3,'title':"进球机器",'desc':"五百多个进球。你"+"记不清大部分，但"+"每一个都有人记得"+"清清楚楚。",'hint':"非门将，生涯 5"+"24 球",'bonus':{'ovr':0x1,'growth':1.03},'test':function(c){
return'gk'!==c["posGroup"]&&c["goals"]>=0x20c;
}},{'id':"poacher",'tier':0x3,'title':"禁区之王",'desc':"四百多个球，没几"+"个是远射。你比谁"+"都清楚球会掉在哪"+'儿。','hint':"前锋，生涯 46"+"7 球",'test':function(c){
return "att"===c["posGroup"]&&c["goals"]>=0x1d3;
}},{'id':"maestro",'tier':0x3,'title':"中场大师",'desc':"助攻榜上你的名字"+"排了很多年。进球"+"的人被举起来，你"+"在后面拍手。",'hint':"中场，生涯 28"+"9 次助攻",'test':function(c){
return "mid"===c["posGroup"]&&c["assists"]>=0x121;
}},{'id':"stopper",'tier':0x4,'title':"后防铁闸",'desc':"八百多场后卫。没"+"有集锦，没有热搜"+"，只有对方前锋记"+"得你贴得有多紧。",'hint':"后卫，生涯 83"+"8 场",'test':function(c){
return "def"===c["posGroup"]&&c["apps"]>=0x346;
}},{'id':"statue",'tier':0x3,'title':"立雕像",'desc':"球场外那尊铜像是"+"你。揭幕那天来了"+"很多人，你站在自"+"己旁边，觉得那个"+"姿势有点傻。",'hint':"33 岁以后退役"+"，在同一家踢满 "+"10 季 400"+" 场、拿 3 座"+'奖杯',
'test':function(c){
return c["age"]>=0x21&&c["homeSeas"+"ons"]>=0xa&&c["homeApps"]>=0x190&&c["homeTrop"+"hies"]>=0x3&&c["fame"]>=0x37;
}},{'id':"onetrip",'tier':0x6,'title':"短暂留洋",'desc':"出去踢过两年，没"+"站住，回来了。这"+"件事后来被反复问"+"起，你每次都说「"+"值」。",'hint':"出去踢过一到四个"+"赛季，没在五大联"+"赛站住",
'test':function(c){
return c["abroad"]>=0x1&&c["abroad"]<=0x4&&c["top5Seas"+"ons"]<=0x2;
}},{'id':"bigfish",'tier':0x4,'title':"虐菜王",'desc':"奖杯柜塞得满满当"+"当。只是那些联赛"+"的名字，欧洲没人"+"念得出来。",'hint':"六座奖杯，但五大"+"联赛不超过两个赛"+'季',
'test':function(c){
return c["trophies"]>=0x6&&c["top5Seas"+"ons"]<=0x2;
}},{'id':"gone",'tier':0x6,'title':"伤仲永",'desc':"二十岁那年所有人"+"都说你是未来。后"+"来没人再提「未来"+"」这两个字。",'hint':"能力到过 78，"+"退役时比巅峰掉了"+" 14 分以上",
'test':function(c){
return c["maxOvr"]>=0x4e&&c["ovr"]<=c["maxOvr"]-0xe&&c["trophies"]<=0x3;
}},{'id':"cutshort",'tier':0x5,'title':"天妒英才",'desc':"状态最好的年纪挂"+"了靴。所有人都说"+"可惜，只有你自己"+"知道身上哪儿疼。",'hint':"能力到过 78，"+"29 岁之前挂靴",
'test':function(c){
return c["maxOvr"]>=0x4e&&c["age"]<=0x1d;
}},{'id':"money",'tier':0x4,'title':"亿元先生",'desc':"顶薪那几年，你的"+"合同金额比你任何"+"一项数据都出名。"+"加起来过了亿，人"+"们记住的也只有这"+"个数。",'hint':"生涯收入过亿，且"+"几乎没在五大联赛"+'踢过','bonus':{'money':0x32},
'test':function(c){
return c["careerEa"+"rnings"]>=0x2710&&c["top5Seas"+"ons"]<=0x1;
}},{'id':"iron",'tier':0x4,'title':"国足大腿",'desc':"赢球时没人念你的"+"名字，输球时全是"+"。你还是每次都去"+'。','hint':"国家队出场 30"+" 次以上",'test':function(c){
return c["caps"]>=0x1e;
}},{'id':"evergree"+'n','tier':0x4,'title':"常青树",'desc':"同届的人早就当上"+"教练、开起了饭馆"+"。你还在更衣室里"+"，年纪比谁都大，"+"位置还是自己的。",'pos':{'gk':{'title':"站到最后的人",
'desc':"手套换了几十副，"+"队友换了几茬。四"+"十岁往上还站在门"+"前的，全中国找不"+"出几个。"}},'hint':"41 岁之后才挂"+"靴、最后还在上场"+"，而且从来不是天"+"才那一挂",'test':function(c){
return c["age"]>=0x29&&c["appsPerS"+"eason"]>=0x8&&c["maxOvr"]<0x55;
}},{'id':"broke",'tier':0x4,'title':"人财两空",'desc':"球是踢完了，钱没"+"剩下。有人劝你别"+"再碰那些项目，你"+"说你知道。",'hint':"退役时账上是负数",'test':function(c){
return c["money"]<0x0;
}},{'id':"bench",'tier':0x4,'title':"饮水机管理员",'desc':"十几年职业合同，"+"一个赛季踢不满十"+"六场。你把每次热"+"身都当成比赛来跑"+'。','hint':"踢满 10 个赛"+"季，场均出场不到"+" 16 场",
'test':function(c){
return c["seasons"]>=0xa&&c["appsPerS"+"eason"]<0x10;
}},{'id':"rich",'tier':0x5,'title':"财富自由",'desc':"退役时账上的数字"+"比大多数同龄人一"+"辈子挣的都多，履"+"历上没有别的。有"+"人问你值不值，你"+"没答。",'hint':"退役时身家 50"+"00 万以上，奖"+"杯不超过两座",'bonus':{'money':0x50},
'test':function(c){
return c["money"]>=0x1388&&c["trophies"]<=0x2;
}},{'id':"ironman",'tier':0x6,'title':'铁人','desc':"八百多场比赛，队"+"医的档案里几乎没"+"有你。教练换了六"+"个，首发名单上你"+"一直在。",'hint':"生涯 780 场"+"、17 个赛季",'bonus':{'injury':0.85},
'test':function(c){
return c["apps"]>=0x30c&&c["seasons"]>=0x11;
}},{'id':"journey",'tier':0x6,'title':"足坛浪子",'desc':"六家俱乐部，六座"+"城市，每次搬家都"+"以为是最后一次。",'hint':"效力过五家以上俱"+'乐部','test':function(c){
return c["clubs"]>=0x5;
}},{'id':"familyma"+'n','tier':0x6,'title':"家里那盏灯",'desc':"球踢得算不上多好"+"，日子过得不错。"+"孩子的家长会你一"+"次没缺席过，这在"+"队里没有第二个人"+"做得到。",'hint':"结了婚、有孩子，"+"而且从头到尾是同"+"一个人",
'test':function(c){
return c["married"]&&c["kids"]>=0x1&&0x0===c["splits"];
}},{'id':"onetown",'tier':0x6,'title':"一人一城",'desc':"从青训到退役只穿"+"过一件球衣。看台"+"上有人从小学看你"+"看到当爹。",'hint':"最多两家俱乐部，"+"踢满 12 个赛"+'季',
'test':function(c){
return c["clubs"]<=0x2&&c["seasons"]>=0xc;
}},{'id':"grind",'tier':0x6,'title':"中甲传奇",'desc':"在低级别联赛里踢"+"了一辈子，工资条"+"上的数字有一半从"+"没到账。",'hint':"在低级别联赛踢满"+" 8 个赛季",'bonus':{'talent':0.03},'test':function(c){
return c["lowSeaso"+'ns']>=0x8;
}},{'id':"coach",'tier':0x5,'title':'少帅','desc':"球衣换成了西装，"+"站的地方只往前挪"+"了五米。你说这五"+"米比想象中远得多"+'。','hint':"事件里考下了教练"+'证','test':function(c){
return c["flags"]["coachCer"+'t'];
}},{'id':"assistan"+'t','tier':0x5,'title':"教练席最边上",'desc':"你没走。训练课还"+"是那几堂，只是现"+"在拿着本子站在边"+"线外，喊的是别人"+"的名字。",'hint':"答应退役后留队当"+'助教',
'test':function(c){
return c["flags"]["assistan"+'t'];
}},{'id':"scout",'tier':0x5,'title':"雨里看球的人",'desc':"一年三万公里，看"+"的全是没人看的比"+"赛。你签下的那个"+"孩子后来上了国家"+"队，名单里没有你"+'。','hint':"接下了球探那份差"+'事',
'test':function(c){
return c["flags"]["scout"];
}},{'id':"youthcoa"+'ch','tier':0x5,'title':"他们管你叫教练",'desc':"第一批招满的时候"+"你还在踢。等你真"+"的挂靴，场地已经"+"续到第三年 ——"+" 孩子们不知道你"+"踢过哪儿，只知道"+"下雨天也要跑完最"+"后一组。",
'hint':"退役前投钱办起了"+'青训','test':function(c){
return c["flags"]["academy"];
}},{'id':"student",'tier':0x5,'title':'学霸','desc':"当年请假去考的那"+"张文凭派上了用场"+"。同届队友里，只"+"有你不用从头学起"+'。','hint':"事件里把书念完了",'test':function(c){
return c["flags"]["degree"];
}},{'id':"system",'tier':0x5,'title':"体制内",'desc':"退役手续办得很顺"+"，因为早几年就有"+"人替你打点好了。"+"工位靠窗，能看见"+"球场。",'hint':"事件里拿到了编制",'test':function(c){
return c["flags"]["bianzhi"];
}},{'id':"clean",'tier':0x5,'title':'清流','desc':"十几年里递到手上"+"的东西你一样没接"+"。没人给你发过奖"+"，队里人都知道你"+"是谁。",'hint':"清白 70 以上"+"，踢满 14 个"+'赛季',
'test':function(c){
return c["clean"]>=0x46&&c["seasons"]>=0xe;
}},{'id':"capped",'tier':0x7,'title':'国脚','desc':"披过国家队的球衣"+"，没赢下什么，也"+"没输掉自己。名单"+"上有过你，这件事"+"不会被改掉。",'hint':"国家队出场 5 "+"次以上",'bonus':{'natCall':1.2},
'test':function(c){
return c["caps"]>=0x5;
}},{'id':"noone",'tier':0x5,'title':"无人问津",'desc':"没有告别赛，没有"+"公告。你自己收拾"+"了柜子，把球鞋留"+"给了队里的小孩。",'hint':"以「无人问津」的"+"方式退役",'test':function(c){
return "无人问津"===c["reason"];
}},{'id':"quit",'tier':0x5,'title':"英年退役",'desc':"三十岁不到就挂靴"+"。后来在朋友圈卖"+"球鞋，简介写着「"+"前职业球员」。",'hint':"30 岁之前主动"+'挂靴','test':function(c){
return c["age"]<=0x1e;
}},{'id':"plain",'tier':0x7,'title':"职业球员",'desc':"没什么可写进纪录"+"的，也没什么可查"+"的。踢完了整整一"+"段职业生涯，这本"+"身就不容易。",'hint':"以上都没轮到你",'test':function(){return!0x0;
}},{'id':"double20",'tier':0x3,'title':"双二十先生",'desc':"进球上双、助攻也上双"+"，那一年你一个人扛起"+"了半支队的进攻。",'hint':"单赛季进球和助攻都"+"到 20",'bonus':{'growth':1.06},'test':function(c){
return c["seasonDo"+"uble20"];
}},{'id':"veteran",'tier':0x4,'title':"老而弥坚",'desc':"三十五岁，别人收着踢"+"，你还在冲。教练说年"+"轻人该向你学习。",'hint':"35 岁之后单赛季仍"+"打进 20 球",'bonus':{'decay':0.5},'test':function(c){
return c["lateGoals"];
}},{'id':"hundredc"+'aps','tier':0x4,'title':"百场国脚",'desc':"国家队球衣穿了上百次"+"，缝缝补补还挂着。名单"+"来来回回，你一直在。",'hint':"国家队出场 100 次"+"以上",'bonus':{'ovr':0x1},'test':function(c){
return c["caps"]>=0x64;
}},{'id':"poymas"+"ter",'tier':0x3,'title':"联赛先生",'desc':"最佳球员的奖杯在柜"+"子里摆了三座，凑近"+"看才发现，每个联赛"+"都认你。",'hint':"拿过 3 次联赛最"+"佳球员",'test':function(c){
return c["poyCount"]>=0x3;
}},{'id':"topmas"+"ter",'tier':0x3,'title':"金靴收藏家",'desc':"三个联赛的金靴摆一"+"排，一双脚穿不过来。"+"射手榜榜首，你上去"+"过很多次。",'hint':"拿过 3 次联赛金靴",'test':function(c){
return c["topCount"]>=0x3;
}}];
window["DATA"]={'endingView':function(c,d){var f=c&&c["pos"]&&c["pos"][d];
return{'id':c['id'],'tier':c["tier"],'title':f&&f["title"]||c["title"],'desc':f&&f["desc"]||c["desc"]};
},'POSITIONS':[{'id':'GK','name':'门将','group':'gk'},{'id':'CB','name':"中后卫",'group':"def"},{'id':'LB','name':"左后卫",'group':"def"},
{'id':'RB','name':"右后卫",'group':"def"},{'id':"CDM",'name':'后腰','group':"mid"},{'id':'CM','name':'中场','group':"mid"},{'id':"CAM",
'name':'前腰','group':"mid"},{'id':'LM','name':"左前卫",'group':"mid"},{'id':'RM','name':"右前卫",'group':"mid"},{'id':'LW','name':"左边锋",
'group':"att"},{'id':'RW','name':"右边锋",'group':"att"},{'id':'ST','name':'中锋','group':"att"}],'LEAGUES':[{'id':"csl",'name':'中超',
'country':'CN','rep':0x2,'cn':!0x0,'cup':"足协杯",'cont':'亚冠'},{'id':"epl",'name':'英超','country':'EN','rep':0x5,'cn':!0x1,'cup':"足总杯",
'cont':'欧冠'},{'id':"liga",'name':'西甲','country':'ES','rep':0x5,'cn':!0x1,'cup':"国王杯",'cont':'欧冠'},{'id':"bund",'name':'德甲',
'country':'DE','rep':0x4,'cn':!0x1,'cup':"德国杯",'cont':'欧冠'},{'id':"seri",'name':'意甲','country':'IT','rep':0x4,'cn':!0x1,'cup':"意大利杯",
'cont':'欧冠'},{'id':'l1','name':'法甲','country':'FR','rep':0x4,'cn':!0x1,'cup':"法国杯",'cont':'欧冠'},{'id':"ere",'name':'荷甲','country':'NL',
'rep':0x3,'cn':!0x1,'cup':"荷兰杯",'cont':'欧联'},{'id':"pri",'name':'葡超','country':'PT','rep':0x3,'cn':!0x1,'cup':"葡萄牙杯",'cont':'欧联'},
{'id':"jup",'name':'比甲','country':'BE','rep':0x2,'cn':!0x1,'cup':"比利时杯",'cont':'欧联'},{'id':"seg",'name':'西乙','country':'ES',
'rep':0x2,'cn':!0x1,'cup':"国王杯",'cont':null},{'id':'b2','name':'德乙','country':'DE','rep':0x2,'cn':!0x1,'cup':"德国杯",'cont':null},
{'id':'ch','name':'英冠','country':'EN','rep':0x2,'cn':!0x1,'cup':"足总杯",'cont':null},{'id':'jl','name':'日职','country':'JP','rep':0x2,
'cn':!0x1,'cup':"天皇杯",'cont':'亚冠'},{'id':'kl','name':"K联赛",'country':'KR','rep':0x2,'cn':!0x1,'cup':"韩国杯",'cont':'亚冠'},{'id':"spl",
'name':"沙特联",'country':'SA','rep':0x3,'cn':!0x1,'cup':"沙特国王杯",'cont':'亚冠'},{'id':"mls",'name':"美职联",'country':'US','rep':0x2,
'cn':!0x1,'cup':"公开杯",'cont':null}],'TEAMS':[{'id':"cn-sh",'name':"上海海港",'league':"csl",'rep':3,'academy':"海港青训",'color':"#C8102E"},
{'id':"cn-sd",'name':"山东泰山",'league':"csl",'rep':3,'academy':"鲁能足校",'color':"#F26522"},{'id':"cn-bj",'name':"北京国安",'league':"csl",
'rep':3,'academy':"国安青训",'color':"#1F4E9C"},{'id':"cn-shh",'name':"上海申花",'league':"csl",'rep':2,'academy':"申花青训",'color':"#0057B8"},
{'id':"cn-cd",'name':"成都蓉城",'league':"csl",'rep':2,'academy':"蓉城青训",'color':"#B71C1C"},{'id':"cn-wh",'name':"武汉三镇",'league':"csl",
'rep':2,'academy':"三镇青训",'color':"#0F7B6C"},{'id':"cn-tj",'name':"天津津门虎",'league':"csl",'rep':2,'academy':"津门虎青训",'color':"#3F51B5"},
{'id':"cn-zj",'name':"浙江队",'league':"csl",'rep':2,'academy':"浙江青训",'color':"#1565C0"},{'id':"cn-hn",'name':"河南队",'league':"csl",
'rep':2,'academy':"河南青训",'color':"#C62828"},{'id':"cn-cc",'name':"长春亚泰",'league':"csl",'rep':1,'academy':"亚泰青训",'color':"#E64A19"},
{'id':"cn-mz",'name':"梅州客家",'league':"csl",'rep':1,'academy':"梅州青训",'color':"#7B1FA2"},{'id':"cn-qdh",'name':"青岛海牛",'league':"csl",
'rep':1,'academy':"海牛青训",'color':"#00838F"},{'id':"cn-qdw",'name':"青岛西海岸",'league':"csl",'rep':1,'academy':"西海岸青训",'color':"#0097A7"},
{'id':"cn-sz",'name':"深圳新鹏城",'league':"csl",'rep':1,'academy':"新鹏城青训",'color':"#E91E63"},{'id':"cn-dl",'name':"大连英博",'league':"csl",
'rep':1,'academy':"英博青训",'color':"#43A047"},{'id':"cn-yn",'name':"云南玉昆",'league':"csl",'rep':1,'academy':"玉昆青训",'color':"#2E7D32"},
{'id':"mci",'name':'曼城','league':"epl",'rep':0x5,'academy':"曼城学院",'color':"#6CABDD"},{'id':"liv",'name':"利物浦",'league':"epl",
'rep':0x5,'academy':"柯克比",'color':"#C8102E"},{'id':"ars",'name':"阿森纳",'league':"epl",'rep':0x5,'academy':"海布里学院",'color':"#EF0107"},
{'id':"mun",'name':'曼联','league':"epl",'rep':0x4,'academy':"卡灵顿",'color':"#DA291C"},{'id':"che",'name':"切尔西",'league':"epl",
'rep':0x4,'academy':"科巴姆",'color':"#034694"},{'id':"tot",'name':'热刺','league':"epl",'rep':0x4,'academy':"恩菲尔德学院",'color':"#132257"},
{'id':"new",'name':"纽卡斯尔",'league':"epl",'rep':0x3,'color':"#241F20"},{'id':"avl",'name':"阿斯顿维拉",'league':"epl",'rep':0x3,
'color':"#670E36"},{'id':"bha",'name':"布莱顿",'league':"epl",'rep':0x3,'color':"#0057B8"},{'id':"ful",'name':"富勒姆",'league':"epl",
'rep':0x2,'color':"#000000"},{'id':"bre",'name':"布伦特福德",'league':"epl",'rep':0x2,'color':"#E30613"},{'id':"eve",'name':"埃弗顿",
'league':"epl",'rep':0x2,'color':"#003399"},{'id':"cry",'name':"水晶宫",'league':"epl",'rep':0x2,'color':"#1B458F"},{'id':"nfo",
'name':"诺丁汉森林",'league':"epl",'rep':0x2,'color':"#E53233"},{'id':"whu",'name':"西汉姆联",'league':"epl",'rep':0x3,'color':"#7A263A"},
{'id':"wol",'name':'狼队','league':"epl",'rep':0x2,'color':"#FDB913"},{'id':"rma",'name':"皇家马德里",'league':"liga",'rep':0x5,'academy':"卡斯蒂亚",
'color':"#FEBE10"},{'id':"bar",'name':"巴塞罗那",'league':"liga",'rep':0x5,'academy':"拉玛西亚",'color':"#A50044"},{'id':"atm",'name':'马竞',
'league':"liga",'rep':0x4,'academy':"马竞青训营",'color':"#CB3524"},{'id':"ath",'name':"毕尔巴鄂",'league':"liga",'rep':0x3,'academy':"莱萨梅",
'color':"#EE2523"},{'id':"rso",'name':"皇家社会",'league':"liga",'rep':0x3,'color':"#0067B1"},{'id':"vil",'name':"比利亚雷亚尔",'league':"liga",
'rep':0x3,'color':"#FFE667"},{'id':"bet",'name':"皇家贝蒂斯",'league':"liga",'rep':0x2,'color':"#00954C"},{'id':"sev",'name':"塞维利亚",
'league':"liga",'rep':0x2,'color':"#D8112B"},{'id':"gir",'name':"赫罗纳",'league':"liga",'rep':0x2,'color':"#CD2534"},{'id':"val",
'name':"瓦伦西亚",'league':"liga",'rep':0x3,'color':"#F18E00"},{'id':"cel",'name':"塞尔塔",'league':"liga",'rep':0x2,'color':"#8AC3EE"},
{'id':"osa",'name':"奥萨苏纳",'league':"liga",'rep':0x2,'color':"#CC0C0C"},{'id':"bay",'name':"拜仁慕尼黑",'league':"bund",'rep':0x5,
'academy':"拜仁校园",'color':"#DC052D"},{'id':"bvb",'name':"多特蒙德",'league':"bund",'rep':0x4,'academy':"多特青训营",'color':"#FDE100"},
{'id':"lev",'name':"勒沃库森",'league':"bund",'rep':0x4,'color':"#E32219"},{'id':"rbl",'name':"莱比锡",'league':"bund",'rep':0x3,
'color':"#DD0741"},{'id':"sge",'name':"法兰克福",'league':"bund",'rep':0x3,'color':"#E1000F"},{'id':"vfb",'name':"斯图加特",'league':"bund",
'rep':0x2,'color':"#E32219"},{'id':"fcu",'name':"柏林联合",'league':"bund",'rep':0x2,'color':"#EB1923"},{'id':"wob",'name':"沃尔夫斯堡",
'league':"bund",'rep':0x2,'color':"#65B32E"},{'id':"bmg",'name':"门兴格拉德巴赫",'league':"bund",'rep':0x3,'color':"#00A94F"},{'id':"svw",
'name':"云达不莱梅",'league':"bund",'rep':0x2,'color':"#1D9053"},{'id':"scf",'name':"弗赖堡",'league':"bund",'rep':0x3,'color':"#C4021F"},
{'id':"int",'name':"国际米兰",'league':"seri",'rep':0x5,'academy':"国米青训营",'color':"#0068A8"},{'id':"acm",'name':"AC米兰",'league':"seri",
'rep':0x4,'academy':"米兰内洛",'color':"#FB090B"},{'id':"juv",'name':"尤文图斯",'league':"seri",'rep':0x4,'academy':"尤文青训营",'color':"#000000"},
{'id':"nap",'name':"那不勒斯",'league':"seri",'rep':0x4,'color':"#12A0D7"},{'id':"rom",'name':'罗马','league':"seri",'rep':0x3,'academy':"特里贡尼亚",
'color':"#8E1F2F"},{'id':"ata",'name':"亚特兰大",'league':"seri",'rep':0x3,'academy':"扎宁盖拉",'color':"#1D71B8"},{'id':"laz",'name':"拉齐奥",
'league':"seri",'rep':0x3,'color':"#87D8F7"},{'id':"tor",'name':'都灵','league':"seri",'rep':0x2,'color':"#881600"},{'id':"fio",
'name':"佛罗伦萨",'league':"seri",'rep':0x3,'color':"#582C83"},{'id':"bol",'name':"博洛尼亚",'league':"seri",'rep':0x3,'color':"#9C2424"},
{'id':"udi",'name':"乌迪内斯",'league':"seri",'rep':0x2,'color':"#1A1A1A"},{'id':"psg",'name':"巴黎圣日耳曼",'league':'l1','rep':0x5,
'academy':"普瓦西训练营",'color':"#004170"},{'id':"mar",'name':'马赛','league':'l1','rep':0x3,'color':"#2FAEE0"},{'id':"lyo",'name':'里昂',
'league':'l1','rep':0x3,'academy':"里昂青训营",'color':"#083D77"},{'id':"mon",'name':"摩纳哥",'league':'l1','rep':0x3,'academy':"摩纳哥学院",
'color':"#E63312"},{'id':"lil",'name':'里尔','league':'l1','rep':0x3,'color':"#E01E13"},{'id':"ren",'name':'雷恩','league':'l1',
'rep':0x2,'color':"#E23838"},{'id':"nic",'name':'尼斯','league':'l1','rep':0x3,'color':"#E01C3C"},{'id':"len",'name':'朗斯','league':'l1',
'rep':0x3,'color':"#9C2424"},{'id':"rcs",'name':"斯特拉斯堡",'league':'l1','rep':0x2,'color':"#0C9CE4"},{'id':"aja",'name':"阿贾克斯",
'league':"ere",'rep':0x3,'academy':"阿贾克斯青训营",'color':"#D2122E"},{'id':"psv",'name':"埃因霍温",'league':"ere",'rep':0x3,'academy':"埃因霍温青训营",
'color':"#EE2223"},{'id':"fey",'name':"费耶诺德",'league':"ere",'rep':0x3,'academy':"瓦尔哈拉",'color':"#DA020E"},{'id':'az','name':"阿尔克马尔",
'league':"ere",'rep':0x2,'color':"#DC052D"},{'id':"utr",'name':"乌得勒支",'league':"ere",'rep':0x1,'color':"#E2001A"},{'id':"ben",
'name':"本菲卡",'league':"pri",'rep':0x3,'academy':"海鸥巢",'color':"#E30613"},{'id':"por",'name':"波尔图",'league':"pri",'rep':0x3,
'academy':"波尔图龙穴",'color':"#00428C"},{'id':"spo",'name':"葡萄牙体育",'league':"pri",'rep':0x3,'academy':"阿尔科舍特",'color':"#008057"},
{'id':"bra",'name':"布拉加",'league':"pri",'rep':0x2,'color':"#B01B2E"},{'id':"vit",'name':"吉马良斯",'league':"pri",'rep':0x1,'color':"#FFFFFF"},
{'id':"clb",'name':"布鲁日",'league':"jup",'rep':0x2,'color':"#005AA0"},{'id':"and",'name':"安德莱赫特",'league':"jup",'rep':0x2,'color':"#89179A"},
{'id':"gnk",'name':'亨克','league':"jup",'rep':0x1,'color':"#005BA9"},{'id':"eup",'name':'欧本','league':"jup",'rep':0x0,'color':"#000000"},
{'id':"spo2",'name':"希洪竞技",'league':"seg",'rep':0x1,'color':"#E30613"},{'id':"hue",'name':"韦斯卡",'league':"seg",'rep':0x0,'color':"#003DA5"},
{'id':"eib",'name':"埃瓦尔",'league':"seg",'rep':0x1,'color':"#0C4CA3"},{'id':"zar",'name':"萨拉戈萨",'league':"seg",'rep':0x1,'color':"#1B4F9C"},
{'id':"dep",'name':"拉科鲁尼亚",'league':"seg",'rep':0x1,'color':"#0067B2"},{'id':"hsv",'name':'汉堡','league':'b2','rep':0x1,'color':"#0A2D6B"},
{'id':"s04",'name':"沙尔克04",'league':'b2','rep':0x1,'color':"#004D9D"},{'id':"kar",'name':"卡尔斯鲁厄",'league':'b2','rep':0x0,'color':"#0055A5"},
{'id':"pau",'name':"圣保利",'league':'b2','rep':0x1,'color':"#A02B22"},{'id':"boc",'name':'波鸿','league':'b2','rep':0x1,'color':"#0C549C"},
{'id':"lee",'name':"利兹联",'league':'ch','rep':0x1,'color':"#FFCD00"},{'id':"sou",'name':"南安普顿",'league':'ch','rep':0x1,'color':"#D71920"},
{'id':"sto",'name':"斯托克城",'league':'ch','rep':0x0,'color':"#E03A3E"},{'id':"sun",'name':"桑德兰",'league':'ch','rep':0x1,'color':"#E40C24"},
{'id':"mid",'name':"米德尔斯堡",'league':'ch','rep':0x1,'color':"#CC0C3C"},{'id':"wba",'name':"西布罗姆维奇",'league':'ch','rep':0x1,
'color':"#122F67"},{'id':"nor",'name':"诺维奇",'league':'ch','rep':0x1,'color':"#FFF200"},{'id':"kaw",'name':"川崎前锋",'league':'jl',
'rep':0x2,'color':"#009FE8"},{'id':"yok",'name':"横滨水手",'league':'jl','rep':0x2,'color':"#004098"},{'id':"urw",'name':"浦和红钻",
'league':'jl','rep':0x2,'color':"#E60012"},{'id':"kob",'name':"神户胜利船",'league':'jl','rep':0x2,'color':"#862633"},{'id':"ulh",
'name':"蔚山现代",'league':'kl','rep':0x2,'color':"#0C4DA2"},{'id':"jbh",'name':"全北现代",'league':'kl','rep':0x2,'color':"#005A2B"},
{'id':"hil",'name':"利雅得新月",'league':"spl",'rep':0x3,'color':"#0055A5"},{'id':"nsr",'name':"利雅得胜利",'league':"spl",'rep':0x3,
'color':"#FFD100"},{'id':"ahl",'name':"吉达联合",'league':"spl",'rep':0x3,'color':"#000000"},{'id':"itt",'name':"吉达国民",'league':"spl",
'rep':0x2,'color':"#009639"},{'id':"iam",'name':"迈阿密国际",'league':"mls",'rep':0x2,'color':"#F7B5CD"},{'id':"lfc",'name':"洛杉矶FC",
'league':"mls",'rep':0x2,'color':"#C39E6D"},{'id':"nyc",'name':"纽约城",'league':"mls",'rep':0x2,'color':"#6CABDD"},{'id':"lct",
'name':"莱斯特城",'league':"epl",'rep':2,'color':"#003090"},{'id':"bcy",'name':"伯恩利",'league':"epl",'rep':1,'color':"#6C1D45"},
{'id':"ips",'name':"伊普斯维奇",'league':"epl",'rep':1,'color':"#3300AA"},{'id':"shu",'name':"谢菲尔德联",'league':"epl",'rep':0,'color':"#EE2737"},
{'id':"mao",'name':"马洛卡",'league':"liga",'rep':2,'color':"#E11B22"},{'id':"get",'name':"赫塔菲",'league':"liga",'rep':2,'color':"#004FA3"},
{'id':"ray",'name':"巴列卡诺",'league':"liga",'rep':1,'color':"#E41D23"},{'id':"alv",'name':"阿拉维斯",'league':"liga",'rep':1,'color':"#004A98"},
{'id':"cad",'name':"加的斯",'league':"liga",'rep':1,'color':"#F9C716"},{'id':"lpa",'name':"拉斯帕尔马斯",'league':"liga",'rep':1,'color':"#F5D617"},
{'id':"esp",'name':"西班牙人",'league':"liga",'rep':1,'color':"#007FC8"},{'id':"grd",'name':"格拉纳达",'league':"liga",'rep':0,'color':"#E64415"},
{'id':"hof",'name':"霍芬海姆",'league':"bund",'rep':2,'color':"#1C63B7"},{'id':"mnz",'name':"美因茨",'league':"bund",'rep':2,'color':"#C3141E"},
{'id':"aug",'name':"奥格斯堡",'league':"bund",'rep':2,'color':"#BA3733"},{'id':"koe",'name':"科隆",'league':"bund",'rep':1,'color':"#ED1C24"},
{'id':"her",'name':"柏林赫塔",'league':"bund",'rep':1,'color':"#005CA9"},{'id':"nbg",'name':"纽伦堡",'league':"bund",'rep':1,'color':"#AD1A23"},
{'id':"ksl",'name':"凯泽斯劳滕",'league':"bund",'rep':0,'color':"#D11015"},{'id':"par",'name':"帕尔马",'league':"seri",'rep':2,'color':"#F5C400"},
{'id':"gen",'name':"热那亚",'league':"seri",'rep':2,'color':"#C8102E"},{'id':"sam",'name':"桑普多利亚",'league':"seri",'rep':2,'color':"#004197"},
{'id':"cag",'name':"卡利亚里",'league':"seri",'rep':1,'color':"#C8102E"},{'id':"ver",'name':"维罗纳",'league':"seri",'rep':1,'color':"#F5C400"},
{'id':"lec",'name':"莱切",'league':"seri",'rep':1,'color':"#C8102E"},{'id':"emp",'name':"恩波利",'league':"seri",'rep':1,'color':"#004197"},
{'id':"sas",'name':"萨索洛",'league':"seri",'rep':1,'color':"#006944"},{'id':"ven",'name':"威尼斯",'league':"seri",'rep':0,'color':"#FE6D00"},
{'id':"bdx",'name':"波尔多",'league':"l1",'rep':2,'color':"#00295B"},{'id':"mpl",'name':"蒙彼利埃",'league':"l1",'rep':2,'color':"#E23B3B"},
{'id':"tls",'name':"图卢兹",'league':"l1",'rep':2,'color':"#553B77"},{'id':"nts",'name':"南特",'league':"l1",'rep':2,'color':"#FCD100"},
{'id':"set",'name':"圣埃蒂安",'league':"l1",'rep':2,'color':"#00855B"},{'id':"rei",'name':"兰斯",'league':"l1",'rep':2,'color':"#C8102E"},
{'id':"aux",'name':"欧塞尔",'league':"l1",'rep':1,'color':"#004197"},{'id':"ang",'name':"昂热",'league':"l1",'rep':1,'color':"#E50016"},
{'id':"bst",'name':"布雷斯特",'league':"l1",'rep':1,'color':"#E30613"},{'id':"twt",'name':"特温特",'league':"ere",'rep':2,'color':"#D1113B"},
{'id':"hee",'name':"海伦芬",'league':"ere",'rep':1,'color':"#004197"},{'id':"grn",'name':"格罗宁根",'league':"ere",'rep':1,'color':"#008B4E"},
{'id':"nec",'name':"尼美根",'league':"ere",'rep':1,'color':"#008D4E"},{'id':"bav",'name':"博阿维斯塔",'league':"pri",'rep':1,'color':"#000000"},
{'id':"pfr",'name':"费雷拉",'league':"pri",'rep':1,'color':"#E01E3C"},{'id':"nac",'name':"国民队",'league':"pri",'rep':1,'color':"#000000"},
{'id':"rio",'name':"里奥阿维",'league':"pri",'rep':0,'color':"#00886E"},{'id':"stl",'name':"标准列日",'league':"jup",'rep':2,'color':"#C8102E"},
{'id':"ant",'name':"皇家安特卫普",'league':"jup",'rep':2,'color':"#C8102E"},{'id':"gnt",'name':"根特",'league':"jup",'rep':1,'color':"#005CA9"},
{'id':"usg",'name':"圣吉罗斯",'league':"jup",'rep':1,'color':"#F5C400"},{'id':"mlg",'name':"马拉加",'league':"seg",'rep':2,'color':"#004FA3"},
{'id':"leg",'name':"莱加内斯",'league':"seg",'rep':1,'color':"#004197"},{'id':"ovd",'name':"奥维耶多",'league':"seg",'rep':1,'color':"#004197"},
{'id':"tfe",'name':"特内里费",'league':"seg",'rep':1,'color':"#004197"},{'id':"fdu",'name':"杜塞尔多夫",'league':"b2",'rep':1,'color':"#E4002B"},
{'id':"h96",'name':"汉诺威96",'league':"b2",'rep':1,'color':"#00855B"},{'id':"pdb",'name':"帕德博恩",'league':"b2",'rep':0,'color':"#004197"},
{'id':"wat",'name':"沃特福德",'league':"ch",'rep':1,'color':"#FBEE23"},{'id':"qpr",'name':"女王公园巡游者",'league':"ch",'rep':1,'color':"#005CA9"},
{'id':"brb",'name':"布莱克本",'league':"ch",'rep':1,'color':"#009EE0"},{'id':"cov",'name':"考文垂",'league':"ch",'rep':1,'color':"#007AC3"},
{'id':"sws",'name':"斯旺西",'league':"ch",'rep':1,'color':"#000000"},{'id':"cdf",'name':"加的夫城",'league':"ch",'rep':1,'color':"#005CA9"},
{'id':"shw",'name':"谢周三",'league':"ch",'rep':1,'color':"#004197"},{'id':"pre",'name':"普雷斯顿",'league':"ch",'rep':0,'color':"#004197"},
{'id':"hul",'name':"赫尔城",'league':"ch",'rep':0,'color':"#F7A600"},{'id':"rdg",'name':"雷丁",'league':"ch",'rep':0,'color':"#004197"},
{'id':"ksm",'name':"鹿岛鹿角",'league':"jl",'rep':2,'color':"#C8102E"},{'id':"san",'name':"广岛三箭",'league':"jl",'rep':2,'color':"#6E4FA4"},
{'id':"gmb",'name':"大阪钢巴",'league':"jl",'rep':2,'color':"#004197"},{'id':"cre",'name':"大阪樱花",'league':"jl",'rep':2,'color':"#D1113B"},
{'id':"ngy",'name':"名古屋鲸八",'league':"jl",'rep':1,'color':"#C8102E"},{'id':"fct",'name':"FC东京",'league':"jl",'rep':1,'color':"#005CA9"},
{'id':"ksw",'name':"柏雷素尔",'league':"jl",'rep':1,'color':"#F5C400"},{'id':"jub",'name':"磐田喜悦",'league':"jl",'rep':1,'color':"#005CA9"},
{'id':"seo",'name':"FC首尔",'league':"kl",'rep':2,'color':"#005CA9"},{'id':"poh",'name':"浦项制铁",'league':"kl",'rep':2,'color':"#E4002B"},
{'id':"suw",'name':"水原三星",'league':"kl",'rep':1,'color':"#004197"},{'id':"dgq",'name':"大邱FC",'league':"kl",'rep':1,'color':"#005CA9"},
{'id':"jej",'name':"济州联",'league':"kl",'rep':0,'color':"#E30613"},{'id':"dam",'name':"达曼协作",'league':"spl",'rep':1,'color':"#006B3F"},
{'id':"fth",'name':"哈萨征服",'league':"spl",'rep':0,'color':"#008B3E"},{'id':"lag",'name':"洛杉矶银河",'league':"mls",'rep':2,'color':"#00245D"},
{'id':"sea",'name':"西雅图海湾人",'league':"mls",'rep':2,'color':"#005CA9"},{'id':"atlu",'name':"亚特兰大联",'league':"mls",'rep':2,'color':"#B5121B"},
{'id':"trt",'name':"多伦多FC",'league':"mls",'rep':2,'color':"#C8102E"},{'id':"nyr",'name':"纽约红牛",'league':"mls",'rep':2,'color':"#C8102E"},
{'id':"chf",'name':"芝加哥火焰",'league':"mls",'rep':1,'color':"#C8102E"},{'id':"ptl",'name':"波特兰伐木者",'league':"mls",'rep':1,'color':"#004197"},
{'id':"orl",'name':"奥兰多城",'league':"mls",'rep':1,'color':"#5A2D81"},{'id':"ner",'name':"新英格兰革命",'league':"mls",'rep':1,'color':"#004197"},
{'id':"dal",'name':"达拉斯FC",'league':"mls",'rep':1,'color':"#C8102E"}],'TROPHIES':{'league':{'name':"联赛冠军",'p':[0x0,0.02,0.05,0.16,0.3,0.45]},
'cup':{'name':"国内杯赛",'p':[0.02,0.04,0.08,0.15,0.22,0.28]},'cont':{'name':"洲际冠军",'p':[0x0,0x0,0.02,0.04,0.07,0.18]},'world':{'name':"世俱杯",
'p':[0x0,0x0,0x0,0.004,0.012,0.03]}},'NATIONAL':{'asia':{'name':"亚洲杯冠军"},'wc':{'name':"世界杯冠军"},'wcq':{'name':"打进世界杯"}},'AWARDS':a,
'ROLES':{'star':{'name':"绝对核心",'apps':[0x2c,0x38],'mult':1.25,'rank':0x4},'starter':{'name':'主力','apps':[0x22,0x2e],'mult':0x1,
'rank':0x3},'rot':{'name':'轮换','apps':[0x12,0x1e],'mult':0.62,'rank':0x2},'sub':{'name':'替补','apps':[0x6,0x11],'mult':0.3,
'rank':0x1},'bench':{'name':"饮水机",'apps':[0x0,0x6],'mult':0.08,'rank':0x0}},'ROLE_ORDER':["bench","sub","rot","starter","star"],
'YOUTH_ABROAD_FEE':0x2d,'INJURIES':[{'name':"腘绳肌拉伤",'w':0x18,'ovr':-0x2},{'name':"半月板损伤",'w':0x10,'ovr':-0x3},{'name':"十字韧带断裂",
'w':0xa,'ovr':-0x6},{'name':"胫腓骨骨折",'w':0x6,'ovr':-0x8},{'name':"跟腱断裂",'w':0x3,'ovr':-0xb},{'name':"踝关节扭伤",'w':0x12,'ovr':-0x1},
{'name':"小腿肌肉撕裂",'w':0x9,'ovr':-0x2},{'name':"跖骨骨折",'w':0x6,'ovr':-0x4},{'name':"肩关节脱位",'w':0x4,'ovr':-0x3},{'name':"腰椎间盘突出",
'w':0x4,'ovr':-0x5}],'GROWTH':[{'age':0xc,'d':[2.2,5.2]},{'age':0x10,'d':[0x4,7.4]},{'age':0x12,'d':[0x4,7.4]},{'age':0x14,
'd':[2.6,5.9]},{'age':0x16,'d':[2.4,5.1]},{'age':0x18,'d':[1.4,3.7]},{'age':0x1a,'d':[0.35,2.3]},{'age':0x1c,'d':[-0.5,1.4]},
{'age':0x1e,'d':[-1.5,0.7]},{'age':0x20,'d':[-2.4,-0.4]},{'age':0x22,'d':[-3.6,-0.8]},{'age':0x24,'d':[-0x5,-1.6]},{'age':0x26,
'd':[-6.5,-2.4]}],'VALUE_TABLE':[[0x28,0x7530],[0x32,0x249f0],[0x37,0x61a80],[0x3c,0xf4240],[0x41,0x2625a0],[0x46,0x5b8d80],
[0x4b,0xc65d40],[0x50,0x1ab3f00],[0x55,0x3473bc0],[0x5a,0x8f0d180],[0x5f,0xee6b280],[0x63,0x11e1a300]],'ENDINGS':b};
}()));