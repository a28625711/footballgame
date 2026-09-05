// window.DATA.ENDINGS（生涯结局列表）
var b =[{'id':"cut_debt",'tier':0x0,'title':"砸锅卖铁一场空",'desc':"家里那笔钱没能换"+"来一张职业合同。"+"回国那天没人接机"+"，行李里还有一双"+"没穿过的球鞋。",'hint':"送出国踢，没熬出"+"来，家里还欠着钱",'test':function(c){
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
}},{'id':"goat",'tier':0x2,'title':"GOAT",'desc':"世界杯、金球、欧"+"冠，一样不缺。以"+"后每次有人排历史"+"最佳，名单第一行"+"都得先写你，再从"+"第二行开始吵。",'hint':"世界杯、金球、欧"+"冠，三样齐全",'bonus':{'talent':0.06,'ovr':0x2},
'test':function(c){
return c["wcRank"]>=0x6&&c["award"](a["ballon"])>=0x1&&c["uclTroph"+"ies"]>=0x1&&c["maxOvr"]>=0x5c;
}},{'id':"wcchamp",'tier':0x2,'title':"大力神杯",'desc':"中国队捧起了那座"+"杯。这一天之前，"+"没有人敢把这句话"+"写进任何一篇稿子"+'。','hint':"随中国队拿下世界"+'杯',
'bonus':{'ovr':0x2},'test':function(c){
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
'pos':{'gk':{'title':"队史第一门神",'desc':"国家队的零封纪录"+"是你的。那些比赛"+"分散在十几年里，"+"有几场你一个球没"+"丢，全国都记得。"}},'hint':"国家队进球 26"+" 个以上（门将："+"26 场零封）",
'test':function(c){
return'gk'===c["posGroup"]?c["natCs"]>=0x1a:c["natGoals"]>=0x1a;
}},{'id':"asiafina"+'l','tier':0x4,'title':"差一个球",'desc':"亚洲杯决赛输了。"+"很多年后你还是会"+"在半夜想起那个球"+"该怎么踢。",'hint':"打进亚洲杯决赛",'test':function(c){
return c["asiaRank"]>=0x5;
}},{'id':"fixer",'tier':0x4,'title':"没查到你头上",'desc':"那几场球你心里有"+"数。名单公布那天"+"你一条一条看完，"+"没有你，你也没觉"+"得轻松。",'hint':"涉过赌或打过假球"+"，清白跌破 45",
'test':function(c){
return(c["flags"]["fixed"]||c["flags"]["gambled"])&&c["clean"]<0x2d;
}},{'id':"agefraud",'tier':0x4,'title':"大三岁",'desc':"户口本上的那个年"+"份陪了你一辈子。"+"退役那年真实年龄"+"的你，其实还能再"+"踢两年。",'hint':"改过年龄",'test':function(c){
return c["flags"]["ageFraud"];
}},{'id':"legend",'tier':0x2,'title':"中国梅西",'desc':"以后每个踢球的小"+"孩都会被拿来跟你"+"比，然后被说「你"+"不是他」。",'pos':{'gk':{'title':"中国布冯"},'def':{'title':"中国马尔蒂尼"}},
'hint':"能力到过 88、"+"四座大赛级奖杯、"+"五大联赛六个赛季",'bonus':{'talent':0.04,'growth':1.05},'test':function(c){
return c["maxOvr"]>=0x58&&c["bigTroph"+"ies"]>=0x4&&c["top5Seas"+"ons"]>=0x6;
}},{'id':"cr7",'tier':0x2,'title':"中国C罗",'desc':"别人三十五岁开始"+"告别，你三十五岁"+"开始加练。最后那"+"几年没人再拿天赋"+"说你，只说自律。",'pos':{'gk':{'title':"中国范德萨"},
'def':{'title':"中国佩佩"},'mid':{'title':"中国莫德里奇"}},'hint':"能力到过 90、"+"生涯出场 110"+"0 以上、40 "+"岁之后才退役",'bonus':{'talent':0.03,'ovr':0x1,'decay':0.85,'injury':0.9},'test':function(c){
return c["maxOvr"]>=0x5a&&c["apps"]>=0x44c&&c["age"]>=0x28;
}},{'id':"ballon",'tier':0x2,'title':"金球先生",'desc':"颁奖礼上你用中文"+"说了谢谢。台下有"+"人没听懂，但所有"+"人都站起来了。",'hint':"拿过金球奖",'bonus':{'talent':0.03,'money':60},'test':function(c){
return c["award"](a["ballon"])>=0x1;
}},{'id':"asiaking",'tier':0x3,'title':"亚洲一哥",'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的中场都在研究"+"你怎么转身。",'pos':{'gk':{'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的前锋赛前都在"+"看你的扑点录像。"},
'def':{'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的中锋都记得被"+"你贴了九十分钟是"+"什么滋味。"},'att':{'desc':"亚洲足球先生拿了"+"不止一次。整个亚"+"洲的后卫都在研究"+"你怎么启动。"}},
'hint':"两次亚洲足球先生",'test':function(c){
return c["award"](a["afcpoy"])>=0x2;
}},{'id':"asiabest",'tier':0x3,'title':"亚洲最佳",'desc':"亚洲足球先生拿过"+"一次。那一年你觉"+"得自己还能更好，"+"后来才知道那就是"+"顶点。",'hint':"拿过一次亚洲足球"+'先生',
'test':function(c){
return c["award"](a["afcpoy"])>=0x1;
}},{'id':"bigears",'tier':0x3,'title':"大耳朵杯",'desc':"欧冠决赛的那张全"+"队合影里有你。照"+"片挂在老家的墙上"+"，比任何一份合同"+"都久。",'hint':"拿过欧冠，且在五"+"大联赛待过两个赛"+'季',
'test':function(c){
return c["uclTroph"+"ies"]>=0x1&&c["top5Seas"+"ons"]>=0x2;
}},{'id':"boots",'tier':0x4,'title':'金靴','desc':"一整个赛季你是射"+"手榜第一。有人说"+"是运气好，你把那"+"年的每个球都记着"+'。','hint':"拿过金靴（欧洲或"+"中超）",'test':function(c){
return c["award"](a["boot"])+c["award"](a["cslboot"])>=0x1;
}},{'id':"uncrowne"+'d','tier':0x3,'title':"无冕之王",'desc':"能力从来不是问题"+"，柜子里就是一座"+"奖杯都没有。有些"+"人一辈子没赶上一"+"支好队。",'hint':"能力到过 86，"+"却一座奖杯都没有",
'test':function(c){
return c["maxOvr"]>=0x56&&0x0===c["trophies"];
}},{'id':"wall",'tier':0x3,'title':"国足门神",'desc':"十年国家队正选门"+"将。中国队输的每"+"一场球，你都是最"+"后一个离场的。",'hint':"门将，国家队出场"+" 30 次以上",'test':function(c){
return'gk'===c["posGroup"]&&c["caps"]>=0x1e;
}},{'id':"shutout",'tier':0x3,'title':"叹息之墙",'desc':"三百多场零封。进"+"球集锦里从来没有"+"你，失球集锦里也"+"没有。",'hint':"门将，生涯 30"+"1 场零封",'test':function(c){
return'gk'===c["posGroup"]&&c['cs']>=0x12d;
}},{'id':"sniper",'tier':0x3,'title':"进球机器",'desc':"五百多个进球。你"+"记不清大部分，但"+"每一个都有人记得"+"清清楚楚。",'hint':"非门将，生涯 5"+"24 球",'test':function(c){
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
}},{'id':"money",'tier':0x4,'title':"亿元先生",'desc':"顶薪那几年，你的"+"合同金额比你任何"+"一项数据都出名。"+"加起来过了亿，人"+"们记住的也只有这"+"个数。",'hint':"生涯收入过亿，且"+"几乎没在五大联赛"+'踢过',
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
}},{'id':"rich",'tier':0x5,'title':"财富自由",'desc':"退役时账上的数字"+"比大多数同龄人一"+"辈子挣的都多，履"+"历上没有别的。有"+"人问你值不值，你"+"没答。",'hint':"退役时身家 50"+"00 万以上，奖"+"杯不超过两座",
'test':function(c){
return c["money"]>=0x1388&&c["trophies"]<=0x2;
}},{'id':"ironman",'tier':0x6,'title':'铁人','desc':"八百多场比赛，队"+"医的档案里几乎没"+"有你。教练换了六"+"个，首发名单上你"+"一直在。",'hint':"生涯 780 场"+"、17 个赛季",
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
}},{'id':"grind",'tier':0x6,'title':"中甲传奇",'desc':"在低级别联赛里踢"+"了一辈子，工资条"+"上的数字有一半从"+"没到账。",'hint':"在低级别联赛踢满"+" 8 个赛季",'test':function(c){
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
}},{'id':"capped",'tier':0x7,'title':'国脚','desc':"披过国家队的球衣"+"，没赢下什么，也"+"没输掉自己。名单"+"上有过你，这件事"+"不会被改掉。",'hint':"国家队出场 5 "+"次以上",
'test':function(c){
return c["caps"]>=0x5;
}},{'id':"noone",'tier':0x5,'title':"无人问津",'desc':"没有告别赛，没有"+"公告。你自己收拾"+"了柜子，把球鞋留"+"给了队里的小孩。",'hint':"以「无人问津」的"+"方式退役",'test':function(c){
return "无人问津"===c["reason"];
}},{'id':"quit",'tier':0x5,'title':"英年退役",'desc':"三十岁不到就挂靴"+"。后来在朋友圈卖"+"球鞋，简介写着「"+"前职业球员」。",'hint':"30 岁之前主动"+'挂靴','test':function(c){
return c["age"]<=0x1e;
}},{'id':"plain",'tier':0x7,'title':"职业球员",'desc':"没什么可写进纪录"+"的，也没什么可查"+"的。踢完了整整一"+"段职业生涯，这本"+"身就不容易。",'hint':"以上都没轮到你",'test':function(){return!0x0;
}},{'id':"double20",'tier':0x3,'title':"双二十先生",'desc':"进球上双、助攻也上双"+"，那一年你一个人扛起"+"了半支队的进攻。",'hint':"单赛季进球和助攻都"+"到 20",'test':function(c){
return c["seasonDo"+"uble20"];
}},{'id':"veteran",'tier':0x4,'title':"老而弥坚",'desc':"三十五岁，别人收着踢"+"，你还在冲。教练说年"+"轻人该向你学习。",'hint':"35 岁之后单赛季仍"+"打进 20 球",'test':function(c){
return c["lateGoals"];
}},{'id':"hundredc"+'aps','tier':0x4,'title':"百场国脚",'desc':"国家队球衣穿了上百次"+"，缝缝补补还挂着。名单"+"来来回回，你一直在。",'hint':"国家队出场 100 次"+"以上",'test':function(c){
return c["caps"]>=0x64;
}},{'id':"poymas"+"ter",'tier':0x3,'title':"联赛先生",'desc':"最佳球员的奖杯在柜"+"子里摆了三座，凑近"+"看才发现，每个联赛"+"都认你。",'hint':"拿过 4 次联赛最"+"佳球员",'test':function(c){
return c["poyCount"]>=0x4;
}},{'id':"topmas"+"ter",'tier':0x3,'title':"金靴收藏家",'desc':"三个联赛的金靴摆一"+"排，一双脚穿不过来。"+"射手榜榜首，你上去"+"过很多次。",'hint':"拿过 4 次联赛金靴",'test':function(c){
return c["topCount"]>=0x4;
}},{'id':"grand_slam",'tier':0x2,'title':"大满贯",'desc':"世界杯、欧冠、联赛冠军，"+"金球也进了柜子。这一"+"行字本身，就是一代人"+"的梦想清单。",'hint':"世界杯、欧冠、联赛、金球"+"，四样齐全",'bonus':{'talent':0.06,'growth':1.08},'test':function(c){
return c["wcRank"]>=0x6&&c["uclTroph"+"ies"]>=0x1&&c["leagueTit"+"les"]>=0x1&&c["award"](a["ballon"])>=0x1;
}},{'id':"cl_king",'tier':0x2,'title':"欧冠之王",'desc':"三座大耳朵杯。欧洲解说"+"开始用你的名字命名那座"+"看台。",'hint':"拿过 3 次欧冠",'bonus':{'growth':1.08},'test':function(c){
return c["uclTroph"+"ies"]>=0x3;
}},{'id':"ballon3",'tier':0x2,'title':"金球连庄",'desc':"三座金球摆在一起，年份"+"连成一条线。颁奖人说，下"+"一个十年也在你的名字下"+"面。",'hint':"拿过 3 次金球奖",'bonus':{'talent':0.03,'natCall':1.2},'test':function(c){
return c["award"](a["ballon"])>=0x3;
}},{'id':"treble",'tier':0x3,'title':"三冠王",'desc':"联赛、国内杯、欧冠，同"+"一个赛季。那一年你坐拥"+"整个欧洲的掌声。",'hint':"单赛季同时拿下联赛、国内"+"杯、欧冠",'test':function(c){
return c["seasonTr"+"eble"];
}},{'id':"domtreble",'tier':0x3,'title':"国内三冠王",'desc':"联赛、杯赛、超级杯都拿"+"过。国内赛场，没有哪块"+"地皮你没踩过。",'hint':"联赛、国内杯、超级杯都"+"有冠军",'test':function(c){
return c["domTreble"];
}},{'id':"goal300",'tier':0x3,'title':"三百球先生",'desc':"生涯三百球。数字不是全部"+"，但它说明你在禁区里待"+"得够久。",'hint':"非门将，生涯 300 球",'test':function(c){
return'gk'!==c["posGroup"]&&c["goals"]>=0x12c;
}},{'id':"assist150",'tier':0x3,'title':"助攻大师",'desc':"中场生涯一百五十次助攻。"+"进球集锦里没有你，助攻"+"集锦的开头全是你。",'hint':"中场，生涯 150 次助攻",'test':function(c){
return"mid"===c["posGroup"]&&c["assists"]>=0x96;
}},{'id':"keeper100",'tier':0x3,'title':"百场零封",'desc':"门将生涯一百场零封。球门"+"前的那块禁区，是你划出"+"来的。",'hint':"门将，生涯 100 场零封",'test':function(c){
return'gk'===c["posGroup"]&&c['cs']>=0x64;
}},{'id':"captain",'tier':0x3,'title':"传奇队长",'desc':"国家队队长袖标，戴了一百"+"场。名单一次次换血，袖"+"标一直在你胳膊上。",'hint':"国家队队长，出场 100 次"+"以上",'test':function(c){
return c["flags"]["_ntCaptain"]&&c["caps"]>=0x64;
}},{'id':"iron_season",'tier':0x3,'title':"铁人赛季",'desc':"单赛季出场四十场以上。队"+"医说你不用来报到，教练说"+"你不需要轮休。",'hint':"单赛季出场 40 场以上",'test':function(c){
return c["seasonMa"+"xApps"]>=0x28;
}},{'id':"wc_goal",'tier':0x4,'title':"世界杯进球",'desc':"国家队进了十二个球。有些"+"是世界波，有些是点球，每"+"一个都写进了历史。",'hint':"国家队进球 12 个以上",'test':function(c){
return c["natGoals"]>=0xc;
}},{'id':"ko_king",'tier':0x4,'title':"淘汰赛之王",'desc':"五座大赛级奖杯。越是关键"+"的比赛，你越像换了个人。",'hint':"五座大赛级奖杯",'test':function(c){
return c["bigTroph"+"ies"]>=0x5;
}},{'id':"cup_king",'tier':0x4,'title':"杯赛之王",'desc':"五座杯赛冠军。有人说杯赛"+"看运气，你看看柜子，运气"+"也不错。",'hint':"5 座杯赛类冠军",'test':function(c){
return c["cupTitl"+"es"]>=0x5;
}}
];
