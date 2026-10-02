// window.DATA.ENDINGS（生涯结局列表）
// tier：0 神话 / 1 传奇 / 2 巅峰 / 3 出色 / 4 立足 / 5 平凡 / 6 没走到那一步（越靠前越难、越优先）
// aQ（wcRank/asiaRank）刻度：预选0 小组出局1 32强2 16强3 8强4 4强5 亚军6 冠军7
var b =[
/* ── 神话（T0） ── */
{'id':"goat",'tier':0x1,'title':"GOAT",'desc':"同一个赛季，世界杯、欧冠、金球一起进柜子。以后每次有人排历史最佳，名单第一行都得先写你，再从第二行开始吵。",'hint':"同一赛季拿下世界杯、欧冠、金球",'bonus':{'talent':0.06,'ovr':0x2},'test':function(c){
return c["sameYearTriple"];
}},
{'id':"grand_slam",'tier':0x1,'title':"大满贯",'desc':"世界杯、欧冠、联赛冠军，金球也进了柜子。这一行字本身，就是一代人的梦想清单。",'hint':"世界杯、欧冠、联赛、金球，四样齐全",'bonus':{'talent':0.06,'growth':1.08},'test':function(c){
return c["wcRank"]>=0x7&&c["uclTrophies"]>=0x1&&c["leagueTitles"]>=0x1&&c["award"](a["ballon"])>=0x1;
}},
{'id':"wcchamp",'tier':0x1,'title':"大力神杯",'desc':"中国队捧起了那座杯。这一天之前，没有人敢把这句话写进任何一篇稿子。",'hint':"随中国队拿下世界杯",'bonus':{'ovr':0x2},'test':function(c){
return c["wcRank"]>=0x7;
}},
{'id':"goal1000",'tier':0x1,'title':"千球先生",'desc':"生涯一千个进球。这个数字已经被写进历史，连你自己都觉得，像在说别人的故事。",'hint':"生涯打进 1000 球",'bonus':{'talent':0.04,'ovr':0x1},'test':function(c){
return c["goals"]>=0x3e8;
}},

/* ── 传奇（T1） ── */
{'id':"wcfinal",'tier':0x2,'title':"决赛英雄",'desc':"世界杯决赛。你踢满了全场，最后跪在草皮上很久没起来。那场球全国都没睡。",'hint':"打进世界杯决赛（亚军）",'test':function(c){
return c["wcRank"]>=0x6;
}},
{'id':"ballon3",'tier':0x2,'title':"金球连庄",'desc':"三座金球摆在一起，年份连成一条线。颁奖人说，下一个十年也在你的名字下面。",'hint':"拿过 3 次金球奖",'bonus':{'talent':0.03,'natCall':1.2},'test':function(c){
return c["award"](a["ballon"])>=0x3;
}},
{'id':"ucl5",'tier':0x2,'title':"欧冠五冠",'desc':"第五座大耳朵杯。解说已经不再数了，只说：又是他。",'hint':"拿过 5 次欧冠",'bonus':{'growth':1.08},'test':function(c){
return c["uclTrophies"]>=0x5;
}},
{'id':"cr7",'tier':0x2,'title':"中国C罗",'desc':"四十岁还在顶级联赛奔跑。你把自己练成了一件耐用品，时间在你身上学会了绕路。",'pos':{'gk':{'title':"中国布冯"},'def':{'title':"中国马尔蒂尼"},'mid':{'title':"中国莫德里奇"}},'hint':"能力到过 90、生涯出场 900 以上、40 岁之后才退役",'bonus':{'talent':0.03,'ovr':0x1,'decay':0.85,'injury':0.9},'test':function(c){
return c["maxOvr"]>=0x5a&&c["apps"]>=0x384&&c["age"]>=0x29;
}},
{'id':"legend",'tier':0x2,'title':"中国梅西",'desc':"你让全世界记住了那个名字的拼写。国内的小孩开始把你的号码穿在背上。",'pos':{'gk':{'title':"中国布冯"},'def':{'title':"中国马尔蒂尼"}},'hint':"能力到过 88、四座大赛级奖杯、五大联赛六个赛季",'bonus':{'talent':0.04,'growth':1.05},'test':function(c){
return c["maxOvr"]>=0x58&&c["bigTrophies"]>=0x4&&c["top5Seasons"]>=0x6;
}},
{'id':"cl_king",'tier':0x2,'title':"欧冠之王",'desc':"三座大耳朵杯。欧洲解说开始用你的名字命名那座看台。",'hint':"拿过 3 次欧冠",'bonus':{'growth':1.08},'test':function(c){
return c["uclTrophies"]>=0x3;
}},
{'id':"ballon",'tier':0x2,'title':"金球先生",'desc':"颁奖礼上你用中文说了谢谢。台下有人没听懂，但所有人都站起来了。",'hint':"拿过金球奖",'bonus':{'talent':0.03,'money':60},'test':function(c){
return c["award"](a["ballon"])>=0x1;
}},
{'id':"apps1000",'tier':0x2,'title':"铁人中的铁人",'desc':"生涯一千场比赛。你踢过的草皮，连起来能铺满一整座城市。",'hint':"生涯出场 1000 场",'bonus':{'decay':0.9,'injury':0.95},'test':function(c){
return c["apps"]>=0x3e8;
}},

/* ── 巅峰（T2） ── */
{'id':"wchero",'tier':0x3,'title':"黄金一代",'desc':"国家队打进了八强。很多年以后，人们说起中国足球，先说的还是那个夏天。",'hint':"世界杯打进八强",'test':function(c){
return c["wcRank"]>=0x4;
}},
{'id':"asiacup",'tier':0x3,'title':"亚洲之巅",'desc':"亚洲杯捧了杯。回国那天首都机场挤得走不动，很多人是哭着来的。",'hint':"亚洲杯夺冠",'test':function(c){
return c["asiaRank"]>=0x7;
}},
{'id':"asiaking",'tier':0x3,'title':"亚洲一哥",'desc':"两次亚洲足球先生。整个亚洲的前锋，都研究过怎么防你。",'hint':"两次亚洲足球先生",'test':function(c){
return c["award"](a["afcpoy"])>=0x2;
}},
{'id':"caps200",'tier':0x3,'title':"两百场国脚",'desc':"为国出场两百次。这个数字，前面没有人。",'hint':"国家队出场 200 次",'test':function(c){
return c["caps"]>=0xc8;
}},
{'id':"trophy50",'tier':0x3,'title':"奖杯收藏家",'desc':"第五十座奖杯。这个数字摆在那里，比任何一句话都有分量。",'hint':"生涯 50 座奖杯",'test':function(c){
return c["trophies"]>=0x32;
}},
{'id':"topmaster",'tier':0x3,'title':"金靴收藏家",'desc':"四座联赛金靴。前两座你还记得放在哪，后两座你一时想不起来了。",'hint':"拿过 4 次联赛金靴",'test':function(c){
return c["topCount"]>=0x4;
}},
{'id':"treble",'tier':0x3,'title':"三冠王",'desc':"联赛、杯赛、欧冠一个赛季全拿了。那个赛季结束，你很久没缓过来。",'hint':"单赛季同时拿下联赛、国内杯、欧冠",'test':function(c){
return c["seasonTreble"];
}},
{'id':"domtreble",'tier':0x3,'title':"国内三冠王",'desc':"联赛、杯赛、超级杯，一个赛季全拿了。国内的赛场，那一年没有别人什么事。",'hint':"单赛季拿下联赛、国内杯、超级杯",'test':function(c){
return c["domTreble"];
}},
{'id':"sniper",'tier':0x3,'title':"进球机器",'desc':"五百多个进球。有人统计过，平均每两场就有一个。",'hint':"非门将，生涯 500 球",'test':function(c){
return c["posGroup"]!=="gk"&&c["goals"]>=0x1f4;
}},
{'id':"maestro",'tier':0x3,'title':"中场大师",'desc':"你把传球这门手艺练成了一种语言。前锋们说，闭着眼也知道球会到哪。",'hint':"中场，生涯 200 次助攻",'test':function(c){
return c["posGroup"]==="mid"&&c["assists"]>=0xc8;
}},
{'id':"shutout",'tier':0x3,'title':"叹息之墙",'desc':"三百场零封。对方教练赛前布置的第一句话，往往是「别想着从他这儿进球」。",'hint':"门将，生涯 300 场零封",'test':function(c){
return c["posGroup"]==="gk"&&c["cs"]>=0x12c;
}},
{'id':"statue",'tier':0x3,'title':"立雕像",'desc':"俱乐部在球场外给你立了雕像。揭幕那天你站在人群里，抬头看的是三十年前的自己。",'hint':"33 岁后退役，同一队 10 季 400 场、3 座奖杯",'test':function(c){
return c["loyalLong"];
}},
{'id':"natscorer",'tier':0x3,'title':"队史射手王",'desc':"国家队的射手榜第一行是你的名字。那些球分散在十几年里，对手有强有弱，但每一个都是在国歌之后进的。",'pos':{'gk':{'title':"队史第一门神",'desc':"国家队的零封纪录是你的。那些比赛分散在十几年里。"}},'hint':"国家队进球 26 个以上（门将：26 场零封）",'test':function(c){
return c["natGoals"]>=0x1a;
}},

/* ── 出色（T3） ── */
{'id':"wc16",'tier':0x4,'title':"世界杯十六强",'desc':"淘汰赛首轮你们赢了，闯进十六强。那场球踢到点球，你在中圈站了很久没敢看。",'hint':"世界杯打进十六强",'test':function(c){
return c["wcRank"]>=0x3;
}},
{'id':"euro",'tier':0x4,'title':"留洋天花板",'desc':"五大联赛站稳了脚跟。国内解说提起你，语气像在说一件出土文物。",'hint':"五大联赛踢满 6 个赛季、能力到过 74",'test':function(c){
return c["top5Seasons"]>=0x6&&c["maxOvr"]>=0x4a;
}},
{'id':"bigears",'tier':0x4,'title':"大耳朵杯",'desc':"欧冠冠军。那一夜你抱着奖杯睡着了，梦里还在防守。",'hint':"拿过欧冠，且在五大联赛待过两个赛季",'test':function(c){
return c["uclTrophies"]>=0x1&&c["top5Seasons"]>=0x2;
}},
{'id':"asiabest",'tier':0x4,'title':"亚洲最佳",'desc':"拿过一次亚洲足球先生。领奖台上你说了句中文，台下响起了掌声。",'hint':"拿过一次亚洲足球先生",'test':function(c){
return c["award"](a["afcpoy"])>=0x1;
}},
{'id':"boots",'tier':0x4,'title':"金靴",'desc':"联赛金靴。整个赛季你都在和进球数较劲，最后赢了。",'hint':"拿过金靴（欧洲或中超）",'test':function(c){
return c["topCount"]>=0x1;
}},
{'id':"hundredcaps",'tier':0x4,'title':"百场国脚",'desc':"为国家队出场一百次。每次穿上那件球衣，你都会想起第一次。",'hint':"国家队出场 100 次以上",'test':function(c){
return c["caps"]>=0x64;
}},
{'id':"cup_king",'tier':0x4,'title':"杯赛之王",'desc':"五座杯赛冠军。淘汰赛的夜晚，总是属于你。",'hint':"5 座杯赛类冠军",'test':function(c){
return c["cupTrophies"]>=0x5;
}},
{'id':"ko_king",'tier':0x4,'title':"淘汰赛之王",'desc':"五座大赛级奖杯。越到关键场次，你越像换了一个人。",'hint':"5 座大赛级奖杯",'test':function(c){
return c["bigTrophies"]>=0x5;
}},
{'id':"stopper",'tier':0x4,'title':"后防铁闸",'desc':"后卫，生涯 800 场。你防过的人，很多已经当教练了。",'hint':"后卫，生涯 800 场",'test':function(c){
return c["posGroup"]==="def"&&c["apps"]>=0x320;
}},
{'id':"money",'tier':0x4,'title':"亿元先生",'desc':"生涯收入过亿。你没在五大联赛踢过，但每一份合同后面都有一串零。",'hint':"生涯收入过亿、几乎没在五大联赛踢过",'test':function(c){
return c["careerEarnings"]>=0x2710&&c["top5Seasons"]<0x1;
}},
{'id':"wc_goal",'tier':0x4,'title':"世界杯进球",'desc':"你在世界杯上进了球。那脚射门回放了无数遍，成了那届赛事的一部分。",'hint':"世界杯进球 3 个以上",'test':function(c){
return c["wcGoals"]>=0x3;
}},
{'id':"captain",'tier':0x4,'title':"传奇队长",'desc':"你戴了很多年的袖标。更衣室里最安静的时候，大家看的是你。",'hint':"国家队队长、出场 100 次以上",'test':function(c){
return c["natCaptain"]&&c["caps"]>=0x64;
}},
{'id':"iron_season",'tier':0x4,'title':"铁人赛季",'desc':"一个赛季四十场以上。别人在轮换，你在场场首发。",'hint':"单赛季出场 40 场以上",'test':function(c){
return c["seasonMaxApps"]>=0x28;
}},
{'id':"iron_king",'tier':0x2,'title':"全勤之王",'desc':"单赛季出场五十场，几乎场场首发。你的名字从头到尾，钉在首发名单上。",'hint':"单赛季出场 50 场以上",'test':function(c){
return c["seasonMaxApps"]>=0x32;
}},
{'id':"double20",'tier':0x4,'title':"双二十先生",'desc':"单赛季进球和助攻都到二十。你把前锋和组织者的活，一个人干了。",'hint':"单赛季进球、助攻都到 20",'test':function(c){
return c["seasonDouble20"];
}},
{'id':"uncrowned",'tier':0x4,'title':"无冕之王",'desc':"能力到过 86，却一座奖杯都没有。很多人替你可惜，你自己倒没那么在意。",'hint':"能力到过 86，却一座奖杯都没有",'test':function(c){
return c["maxOvr"]>=0x56&&c["trophies"]===0x0;
}},

/* ── 立足（T4） ── */
{'id':"asiafinal",'tier':0x5,'title':"差一个球",'desc':"亚洲杯决赛输了。很多年后你还是会在半夜想起那个球该怎么踢。",'hint':"打进亚洲杯决赛（亚军）",'test':function(c){
return c["asiaRank"]>=0x6;
}},
{'id':"wcgroup",'tier':0x5,'title':"世界杯初体验",'desc':"你踢过世界杯正赛。小组赛三场就回来了，但那三场是几代人等来的。",'hint':"踢过世界杯正赛",'test':function(c){
return c["wcRank"]>=0x1;
}},
{'id':"wall",'tier':0x5,'title':"国足门神",'desc':"门将，国家队出场三十次以上。你守着的那扇门，后面站着很多人。",'hint':"门将、国家队出场 30 次以上",'test':function(c){
return c["posGroup"]==="gk"&&c["caps"]>=0x1e;
}},
{'id':"evergreen",'tier':0x5,'title':"常青树",'desc':"四十一岁才挂靴，最后几年还在上场。你从来不是天才那一挂，但你一直在。",'hint':"41 岁后退役，最后仍在出场",'test':function(c){
return c["age"]>=0x29&&c["lastApps"]>=0x5;
}},
{'id':"veteran",'tier':0x5,'title':"老而弥坚",'desc':"三十五岁之后，你还能单赛季进二十个球。年轻人开始研究你的保养方法。",'hint':"35 岁后单赛季仍进 20 球",'test':function(c){
return c["lateGoals"];
}},
{'id':"rich",'tier':0x5,'title':"财富自由",'desc':"退役时身家五千万以上，奖杯不超过两座。有人说你亏了，你把账单一摊：不亏。",'hint':"退役身家 5000 万+，奖杯不超过两座",'test':function(c){
return c["money"]>=0x1388&&c["trophies"]<=0x2;
}},
{'id':"clean",'tier':0x5,'title':"清流",'desc':"清白七十以上，踢满十四个赛季。这个圈子里的很多事，你一次都没沾。",'hint':"清白 70 以上、踢满 14 个赛季",'test':function(c){
return c["clean"]>=0x46&&c["seasons"]>=0xe;
}},
{'id':"coach",'tier':0x5,'title':"少帅",'desc':"你考下了教练证。退役没几年，就有人开始管你叫指导。",'hint':"事件里考下了教练证",'test':function(c){
return c["flags"]&&c["flags"]["_coachLic"];
}},
{'id':"assistant",'tier':0x5,'title':"教练席最边上",'desc':"退役后留在队里当助教。你坐在教练席最边上，看着曾经的位置上站着别人。",'hint':"答应退役后留队当助教",'test':function(c){
return c["flags"]&&c["flags"]["_assistant"];
}},
{'id':"scout",'tier':0x5,'title':"雨里看球的人",'desc':"你接下了球探那份差事。往后很多年，你在雨天里看过无数个孩子。",'hint':"接下了球探那份差事",'test':function(c){
return c["flags"]&&c["flags"]["_scout"];
}},
{'id':"youthcoach",'tier':0x5,'title':"他们管你叫教练",'desc':"退役前你就投钱办起了青训。后来有一批孩子，是从你这里走出去的。",'hint':"退役前投钱办起了青训",'test':function(c){
return c["flags"]&&c["flags"]["_youthInvest"];
}},
{'id':"student",'tier':0x5,'title':"学霸",'desc':"你把书念完了。绿茵场之外，你也给自己留了一条退路。",'hint':"事件里把书念完了",'test':function(c){
return c["flags"]&&c["flags"]["_studyDone"];
}},
{'id':"system",'tier':0x5,'title':"体制内",'desc':"你拿到了编制。踢球之外的日子，从此稳当得像一条直线。",'hint':"事件里拿到了编制",'test':function(c){
return c["flags"]&&c["flags"]["_systemJob"];
}},
{'id':"onetrip",'tier':0x5,'title':"短暂留洋",'desc':"出去踢过几年，没能在五大联赛站住。回来时行李比走时重了一点。",'hint':"出去踢过 1–4 个赛季，没在五大联赛站住",'test':function(c){
return c["abroad"]>=0x1&&c["abroad"]<=0x4&&c["top5Seasons"]<0x1;
}},

/* ── 平凡（T5） ── */
{'id':"plain",'tier':0x6,'title':"职业球员",'desc':"你踢上了职业联赛。没有聚光灯，但每个周末，你都在首发。",'hint':"以上都没轮到你",'test':function(c){
return!0x0;
}},
{'id':"capped",'tier':0x6,'title':"国脚",'desc':"为国家队出场过。哪怕只有几次，那件球衣你也一直留着。",'hint':"国家队出场 5 次以上",'test':function(c){
return c["caps"]>=0x5;
}},
{'id':"grind",'tier':0x6,'title':"中甲传奇",'desc':"在低级别联赛踢了八年。那里的球场不大，看台上的人却记得你每一个进球。",'hint':"低级别联赛踢满 8 个赛季",'test':function(c){
return c["lowSeasons"]>=0x8;
}},
{'id':"onetown",'tier':0x6,'title':"一人一城",'desc':"最多两家俱乐部，踢满十二个赛季。球迷说，你就是这支球队的一部分。",'hint':"最多两家俱乐部，踢满 12 个赛季",'test':function(c){
return c["clubs"]<=0x2&&c["seasons"]>=0xc;
}},
{'id':"journey",'tier':0x6,'title':"足坛浪子",'desc':"效力过五家以上俱乐部。每到一个地方，你都学会了当地的一道菜。",'hint':"效力过五家以上俱乐部",'test':function(c){
return c["clubs"]>=0x5;
}},
{'id':"ironman",'tier':0x6,'title':"铁人",'desc':"生涯七百多场、十七个赛季。你没什么惊人的天赋，就是一直在那儿。",'hint':"生涯 700 场、17 个赛季",'test':function(c){
return c["apps"]>=0x2bc&&c["seasons"]>=0x11;
}},
{'id':"familyman",'tier':0x6,'title':"家里那盏灯",'desc':"结了婚、有孩子，从头到尾是同一个人。他们是你这些年真正的后防线。",'hint':"结婚生子，且始终是同一个人",'test':function(c){
return c["married"]&&c["kids"]>=0x1&&c["familySame"];
}},
{'id':"gone",'tier':0x6,'title':"伤仲永",'desc':"能力到过 78，退役时比巅峰掉了十四分以上。有过那么两年，所有人都以为你要成了。",'hint':"能力到过 78，退役时比巅峰掉 14 分以上",'test':function(c){
return c["maxOvr"]>=0x4e&&(c["maxOvr"]-c["ovr"])>=0xe;
}},
{'id':"cutshort",'tier':0x6,'title':"天妒英才",'desc':"能力到过 78，二十九岁之前就挂靴了。有些故事还没写完就合上了。",'hint':"能力到过 78，29 岁前挂靴",'test':function(c){
return c["maxOvr"]>=0x4e&&c["age"]<=0x1d;
}},

/* ── 没走到那一步（T6） ── */
{'id':"banned",'tier':0x7,'title':"足坛蛀虫",'desc':"反赌扫黑没漏掉你。名字被从纪录里抹掉，只留在通报里。",'hint':"被反赌扫黑查到，终身禁足",'test':function(c){
return c["banned"];
}},
{'id':"agefraud",'tier':0x7,'title':"大三岁",'desc':"改过的年龄终究瞒不住。那些年你多踢的球，最后都成了别人的笑话。",'hint':"改过年龄被查实",'test':function(c){
return c["ageFraud"];
}},
{'id':"fixer",'tier':0x7,'title':"没查到你头上",'desc':"你涉过赌、打过假球，清白跌破四十五，只是一直没被查到。这份侥幸，你带着过完了余生。",'hint':"涉赌或假球，清白跌破 45",'test':function(c){
return c["clean"]<0x2d;
}},
{'id':"noone",'tier':0x7,'title':"无人问津",'desc':"退役那天没有发布会，没有告别赛。你把钉鞋收进袋子，路过球场的时候没有回头。",'hint':"以「无人问津」的方式退役",'test':function(c){
return c["noName"];
}},
{'id':"quit",'tier':0x7,'title':"英年退役",'desc':"三十岁之前主动挂靴。你说够了，但很多个深夜你还是会点开旧比赛的录像。",'hint':"30 岁之前主动挂靴",'test':function(c){
return c["age"]<0x1e&&!c["youthCut"];
}},
{'id':"bench",'tier':0x7,'title':"饮水机管理员",'desc':"踢满十个赛季，场均出场不到十六场。你在替补席上坐出了一整个职业生涯。",'hint':"踢满 10 个赛季，场均出场不到 16 场",'test':function(c){
return c["seasons"]>=0xa&&c["appsPerSeason"]<0x10;
}},
{'id':"broke",'tier':0x7,'title':"人财两空",'desc':"退役时账上是负数。你把最好的年头都给了足球，足球没还给你什么。",'hint':"退役时账上是负数",'test':function(c){
return c["money"]<0x0;
}},
/* 青训被刷（原 cut12/cut13/cut15/cut_abroad/cut_debt/cut_pro 合并） */
{'id':"cut_youth",'tier':0x0,'title':"没走到那一步",'desc':"名单贴出来那天你看了三遍，确认自己不在上面。梯队里比你小的一茬茬上去了，你还在同一块场地上练同样的东西。十八岁那年，没人再跟你谈合同。",'hint':"青训期就被淘汰 —— 差的不只是一步",'test':function(c){
return c["youthCut"]||c["youthAbr"+"oad"]||(c["youthDebt"]&&c["money"]<0x0);
}},
/* ── 单赛季成就（进球/助攻/零封/出场） ── */
{'id':"s30",'tier':0x3,'ego':'s_goals','title':"单赛季三十球",'desc':"一个赛季进三十个球。放在任何年代、任何联赛，这都是金靴之上的数字。",'hint':"单赛季进球 30+",'test':function(c){
return c["seasonMaxGoals"]>=0x1e;
}},
{'id':"s40",'tier':0x2,'ego':'s_goals','title':"单赛季四十球",'desc':"一个赛季四十个球。人们开始用「不属于这个联赛」来形容你。",'hint':"单赛季进球 40+",'test':function(c){
return c["seasonMaxGoals"]>=0x28;
}},
{'id':"s50",'tier':0x1,'ego':'s_goals','title':"单赛季五十球",'desc':"一个赛季五十个球。这个数字已经在和历史上那些名字并排了。",'hint':"单赛季进球 50+",'bonus':{'talent':0.04,'ovr':0x1},'test':function(c){
return c["seasonMaxGoals"]>=0x32;
}},
{'id':"a20",'tier':0x3,'ego':'s_assists','title':"单赛季二十助攻",'desc':"一个赛季二十次助攻。进球的人换来换去，喂球的那双脚一直是你。",'hint':"单赛季助攻 20+",'test':function(c){
return c["seasonMaxAssists"]>=0x14;
}},
{'id':"a30",'tier':0x2,'ego':'s_assists','title':"单赛季三十助攻",'desc':"一个赛季三十次助攻。这个数字连很多顶级中场，一个生涯都到不了。",'hint':"单赛季助攻 30+",'test':function(c){
return c["seasonMaxAssists"]>=0x1e;
}},
{'id':"cs30",'tier':0x3,'title':"单赛季三十零封",'desc':"一个赛季三十场零封。对手的射门集锦里，你出现的次数比谁都多。",'hint':"门将，单赛季零封 30+",'test':function(c){
return c["seasonMaxCs"]>=0x1e;
}},
{'id':"unstoppable",'tier':0x2,'title':"不可阻挡",'desc':"单赛季进球和助攻都到三十。防守球员赛前研究你的录像，越研究越睡不着。",'hint':"单赛季进球、助攻都到 30",'test':function(c){
return c["seasonMaxGoals"]>=0x1e&&c["seasonMaxAssists"]>=0x1e;
}}
];
