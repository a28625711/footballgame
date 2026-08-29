(function(){
'use strict';
// helper functions d/f/g/h and EV_ROLL (shared by all event modules)

var b=null,c=null;
function d(p,q){var s=p()<q;
return null!==c&&(s=c),b={'p':q,'ok':s},s;
}
function f(p,q,s,v){
for(var w=p,x=0x0;
x<q["length"];
x++)w+=(q[x][0x0]-q[x][0x1])*q[x][0x2];
return Math["max"](null==s?0.1:s,Math["min"](null==v?0.9:v,w));
}
function g(p,q,s){var v=Math["round"](0x64*p);
return v+'%\x20'+q+" / "+(0x64-v)+'%\x20'+s;
}
function h(p,q){
return p&&q[p["posGroup"]]||q["other"];
}
window["EV_ROLL"]={'reset':function(){b=null;
},'last':function(){return b;
},'force':function(p){c=!0x0===p||!0x1===p?p:null;
}};
function k(p){
return f(0.5,[[p["ovr"],0x3e,0.008]],0.38,0.82);
}
function m(p,q){
return d(p,null==q?0.5:q)?{'fame':0x16,'ovr':0x2,'mult':{'cup':3.5,'cont':0x2},'text':"球进了。你跑向角"+"旗区的时候什么都"+"听不见，只看见很"+"多张嘴在动。"}:{'fame':-0xf,
'ovr':-0x2,'text':"门将扑对了方向。"+"你在场地中央站了"+"很久，队友过来拍"+"你，你没什么反应"+'。'};
}

var j=[
{
  'id': "extra_tr"+"aining",
  'title': '加练',
  'icon': '🏃',
  'weight': 0x5a,
  'repeat': 0x2,
  'desc': "队里加了一期封闭集训。名单贴出来的第二天，教练在更衣室堵住你，只问了一句话。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "跟上强度",
        'hint': function(p,q){return g(q,'能力+4','能力-2');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'text':"一整期下来，体脂降了，触球也稳了。没有掌声，只是战术板上的那个十号位，笔画渐渐成了你的。"}:{'ovr':-0x2,'text':"第三周就练伤了。两个月病床把一切都换掉了——再回来，首发名单上没有你的名字。"};
}
    },
    {
        'label': "按计划来",
        'hint': "无变化",
        'apply': function(){
return{'text':"你按原计划走完了这一期。没有惊喜，也没有意外，一切照旧。"};
}
    }
  ]
},

{
  'id': "nutritio"+"nist",
  'title': "营养师",
  'icon': '🥗',
  'weight': 0x46,
  'desc': "队医递来一份很难吃的食谱，说照着吃，能多踢三年。",
  'options': [
    {
        'p': function(p){return f(0.65,
[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "照着吃",
        'hint': function(p,q){return g(q,'能力+3','能力-1');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'text':"半年后，体能数据一路往上走。你也终于数得清水煮西兰花有几种做法了。"}:{'ovr':-0x1,'text':"六公斤说掉就掉，对抗也跟着没了。教练拍拍你的肩：先把肉吃回来。"};
}
    },
    {
        'label': "该吃吃",
        'hint': "无变化",
        'apply': function(){
return{'text':"你照旧吃你的。队医摇摇头，那份食谱落到了别人手里。"};
}
    }
  ]
},

{
  'id': "suppleme"+'nt',
  'title': "来路不明的补剂",
  'icon': '💊',
  'weight': 0x28,
  'desc': "有人塞给你两瓶看不出名堂的胶囊，压低声音：「队里好几个都在吃，查不出来的。」",
  'options': [
    {
        'p': function(p){return f(0.72,
[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "吃下去",
        'hint': function(p,q){return g(q,'能力+6','禁赛+清白重创');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x6,'clean':-0xc,'text':"体能确实上了一个台阶。那两瓶东西是什么，你一次也没再问。"}:{'ovr':-0x3,'clean':-0x19,'ban':0x1,'fame':-0x14,
'text':"赛后抽检，阳性。禁赛通告贴出来那天你才明白，「查不出来」是一句安慰话。"};
}
    },
    {
        'label': '扔了',
        'hint': "清白+5",
        'apply': function(){
return{'clean':0x5,'text':"胶囊进了马桶。塞给你的人，后来再没来找过你。"};
}
    }
  ]
},

{
  'id': "load",
  'title': "赛季负荷",
  'icon': '📅',
  'weight': 0x41,
  'repeat': 0x2,
  'stage': "prime",
  'desc': "赛程密到一周三赛。队医让你轮休，主教练点名要你场场首发。两个人都在等你表态。",
  'options': [
    {
        'p': function(p){return f(0.68,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "场场都上",
        'hint': function(p,q){return g(q,'地位提升','受伤');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'fame':0x6,'text':"你把这一期全踢满了。更衣室里再没人敢问谁是主力。"}:{'ovr':-0x4,'roleDelta':-0x1,'text':"第 31 轮，没有对抗，你倒了下去。医生写下两个字：积劳。"};
}
    },
    {
        'label': "听队医的",
        'hint': "地位下降，能力+"+'2',
        'apply': function(){
return{'roleDelta':-0x1,'ovr':0x2,'text':"比赛少了一半，身体是保住了。等回来，位置已经不是你的了。"};
}
    }
  ]
},

{
  'id': "position"+"_change",
  'title': "位置改造",
  'icon': '🔄',
  'weight': 0x37,
  'when': function(p){
return'gk'!==p["posGroup"];
},
  'desc': "主教练把你叫到办公室，希望你去踢另一个位置，「那里更需要你」。",
  'options': [
    {
        'label': "改位置",
        'hint': "首发有保障，但能"+"力短期-2",
        'apply': function(){
return{'ovr':-0x2,'roleDelta':0x1,'text':"新位置踢得别扭，可每场都有你的名字。习惯之后你才发现，这位置像是为你留的。"};
}
    },
    {
        'label': '不改',
        'hint': "出场时间下降",
        'apply': function(){
return{'roleDelta':-0x1,'text':"你守住了自己的位置。教练也守住了他的用人。两个人都很硬。"};
}
    }
  ]
},

{
  'id': "competit"+"ion",
  'title': "有人来抢位置",
  'icon': '⚔️',
  'weight': 0x3c,
  'repeat': 0x2,
  'when': function(p){
return p["roleRank"]<=0x3;
},
  'desc': "{club}花大价钱买下一个跟你同位置的球员。发布会上，他被称作「体系升级的关键一环」。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "跟他争",
        'hint': function(p,q){return g(q,'地位提升','沦为轮换');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'ovr':0x2,'fame':0x8,'text':('gk'===p["posGroup"]?"热身赛你零封了两"+"场，他漏了三个":"def"===p["posGroup"]?"热身赛你那一侧一"+"次没被打穿":"热身赛你进了两个"+"，他一个没进")+("。首发名单上还是"+"你的名字。")}:{'roleDelta':-0x2,
'text':"他的转会费是你的十倍，教练没有理由不用他。你开始熟悉替补席的温度。"};
}
    },
    {
        'label': "找机会走人",
        'hint': "本期结束后离队",
        'apply': function(){
return{'leave':!0x0,'text':"你让经纪人放话出去：想踢球，哪里都行，就是不留下。"};
}
    }
  ]
},

{
  'id': "competit"+"ion_star",
  'title': "队里买了替身",
  'icon': '🧩',
  'weight': 0x34,
  'repeat': 0x2,
  'when': function(p){
return p["roleRank"]>=0x4;
},
  'desc': "{club}签下一个和你同位置的年轻人。发布会上，教练把话挑明：「买他，是让核心少踢十场，不是要取代谁。」",
  'options': [
    {
        'label': "让出杯赛和垃圾时"+'间',
        'hint': "少踢一点，保住身"+'体',
        'apply': function(){
return{'ovr':0x2,'roleDelta':-0x1,'fame':0x3,'text':"一个赛季，你少踢了九场，全是输赢已定的那种。三月的密集赛程，队里唯一没拉伤的主力，是你。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "一场都不让",
        'hint': "场次拉满，但风险"+"自己扛",
        'odds': ["扛住了","扛不住"],
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xa,'roleDelta':0x1,'text':"那个赛季的每一分钟你都踢满了。四百分钟，是他一年的全部上场时间。赛季结束，他转会走了。"}:{'ovr':-0x3,'roleDelta':-0x1,
'text':"四月，你的大腿后侧终于响了一声。最后八轮你躺着看完，那八轮，全是他踢的。"};
}
    }
  ]
},

{
  'id': "prospect",
  'title': "小孩上来了",
  'icon': '🌱',
  'weight': 0x2d,
  'stage': "vet",
  'when': function(p){
return p["roleRank"]<=0x3;
},
  'desc': "青训提上来一个 18 岁的孩子，踢你的位置。训练里他压得你抬不起头，记者已经在写他的稿子了。",
  'options': [
    {
        'label': '带他',
        'hint': "球队夺冠概率翻倍"+"，自己地位下降",
        'apply': function(){
return{'roleDelta':-0x1,'mult':{'league':0x2,'cup':0x2},'fame':0x5,'text':"你把自己会的全教给了他。赛季末，最佳新人的获奖感言里，第一个念的是你的名字。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "压着他",
        'hint': function(p,q){return g(q,'保住位置','更衣室失分');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'text':"你用状态说话，把他按回替补席。教练说，老将还是靠得住。"}:{'roleDelta':-0x2,'fame':-0x8,'text':"队里传开你排挤新人的说法。教练两个都不用了，先抬出第三个。"};
}
    }
  ]
},

{
  'id': "captain",
  'title': "队长袖标",
  'icon': "🎖️",
  'weight': 0x28,
  'stage': "prime",
  'when': function(p){
return p["roleRank"]>=0x3&&p["seasonsA"+"tClub"]>=0x2&&p["ovr"]>=0x32+0x4*(p["clubRep"]||0x0)&&(p["capDone"]||[])["indexOf"](p["teamId"])<0x0;
},
  'desc': "老队长走了。袖标在几个人之间传了一圈，教练单独问你：愿不愿意。",
  'options': [
    {
        'p': function(p){return f(0.65,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "接下",
        'hint': "名气+，但责任也"+'大',
        'odds': ["带得住","扛不住"],
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xf,'roleDelta':0x1,'captain':!0x0,'text':"袖标戴上了。输球以后，你开始学着自己先走向看台。"}:{'fame':-0x6,'ovr':-0x1,'captain':!0x0,
'text':"带队成绩不好，炮火全冲着袖标来。你这才掂出它的分量。"};
}
    },
    {
        'label': "让给别人",
        'hint': "无变化",
        'apply': function(){
return{'capDecline':!0x0,'text':"你说，还是专心踢球吧。教练点点头，再没提过袖标。"};
}
    }
  ]
},

{
  'id': "coach_ch"+"ange",
  'title': '换帅',
  'icon': '📋',
  'weight': 0x37,
  'repeat': 0x3,
  'desc': "{club}中途换帅。新教练第一堂课，就把所有人的位置重新洗了一遍。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "适应他的体系",
        'hint': function(p,q){return g(q,'地位提升','下降');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'ovr':0x1,'text':"新体系反而更适合你。发布会上，新帅当众点了你的名字，夸的是你的跑动。"}:{'roleDelta':-0x1,'text':"你不在他的计划里"+"。他甚至叫不全你"+"的名字。"};
}
    }
  ]
},

{
  'id': "rival_of"+"fer",
  'title': "死敌的报价",
  'icon': '🔥',
  'weight': 0x46,
  'stage': "prime",
  'desc': "{rival}想签你。钱和荣誉都更多，代价是穿上这座城里最不该穿的那件球衣。",
  'options': [
    {
        'label': "就去",
        'hint': "转会至{riva"+"l}，夺冠概率提"+"升，名气受损",
        'apply': function(p){
return{'transferTo':p["rivalId"],'fame':-0x12,'mult':{'league':1.8,'cont':1.8},'text':"你走了。老东家的球迷在你家楼下拉起横幅，没有一个脏字，每个字都很脏。"};
}
    },
    {
        'label': '留下',
        'hint': "地位巩固，名气+",
        'apply': function(){
return{'fame':0xe,'roleDelta':0x1,'text':"采访里你说了句「我不会走」。后来，这句话被印上看台的横幅。"};
}
    }
  ]
},

{
  'id': "crisis",
  'title': "球队掉队了",
  'icon': '📉',
  'weight': 0x32,
  'when': function(p){
return p["clubRep"]<=0x2;
},
  'desc': "{club}半个赛季只赢了两场，保级区就在脚边。已经有别的队来打听你。",
  'options': [
    {
        'label': "留下来打保级",
        'hint': "夺冠概率归零，名"+'气+',
        'apply': function(){
return{'fame':0xc,'mult':{'league':0x0,'cup':0.5},'text':"你留下了，最后一轮打进保级的关键球。这个赛季你什么也没拿到，除了球迷的记性。"};
}
    },
    {
        'label': "离开",
        'hint': "本期结束后离队",
        'apply': function(){
return{'leave':!0x0,'fame':-0x8,'text':"球队最难的时候，你递上了转会申请。这件事，会被人记很久。"};
}
    }
  ]
},

{
  'id': "crisis_b"+'ig',
  'title': "掉出争冠圈",
  'icon': '📉',
  'weight': 0x32,
  'when': function(p){
return p["clubRep"]>=0x3;
},
  'desc': "{club}三连败，榜首已经看不见了。主帅下课的消息一天一个版本，更衣室裂成两派。",
  'options': [
    {
        'label': "站出来扛",
        'hint': "夺冠概率减半，名"+'气+',
        'apply': function(){
return{'fame':0xe,'mult':{'league':0.4,'cup':1.2},'text':"发布会上你把话说死：成绩是全队的事。那半个赛季你场场首发。球队终究没追上，但再没人提更衣室。"};
}
    },
    {
        'label': "别掺和",
        'hint': "无变化",
        'apply': function(){
return{'text':"你什么都没说。主帅走的那天，你站在训练场，隔着玻璃看他把东西一件件搬上车。"};
}
    },
    {
        'label': "让经纪人放风",
        'hint': "本期结束后离队，"+"名气-",
        'apply': function(){
return{'leave':!0x0,'fame':-0x8,'text':"「这样的球队配不上他」。这句话见报的第二天，看台有人打出你的名字，是骂的。"};
}
    }
  ]
},

{
  'id': "renew",
  'title': "续约谈判",
  'icon': '✍️',
  'weight': 0x32,
  'stage': "prime",
  'when': function(p){
return p["seasonsA"+"tClub"]>=0x3;
},
  'desc': "合同还剩一年。俱乐部给的报价比你预期的低一截，经纪人说，可以耗一耗。",
  'options': [
    {
        'label': "签字",
        'hint': "地位稳固，收入一"+'般',
        'apply': function(p){
return{'money':0x64+0x4*p["ovr"],'roleDelta':0x1,'text':"你签了。数字不好看，但你不用再想住哪儿，孩子上哪所学校。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "耗到自由身",
        'hint': function(p,q){return g(q,'大合同','无人问津');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0x190+0x7*p["ovr"],'leave':!0x0,'text':"自由身换来一份翻倍的合同。经纪人这次赌对了。"}:{'money':-0x3c,'roleDelta':-0x2,'text':"耗到最后没人接盘。俱乐部把你晾在替补席，等你自降身价。"};
}
    }
  ]
},

{
  'id': "return_h"+"ome",
  'title': "家里来电话",
  'icon': '🏠',
  'weight': 0x28,
  'stage': "prime",
  'when': function(p){
return!p["inChina"];
},
  'desc': "父母年纪大了，电话里总问你什么时候回去踢。国内的报价也一直没断过。",
  'options': [
    {
        'label': '回国',
        'hint': "回中超，收入大增"+"，能力停滞",
        'apply': function(){
return{'returnHome':!0x0,'money':0xb4,'ovr':-0x2,'text':"回国的第一场，全场喊你的名字。这种感觉，你很久没有过了。"};
}
    },
    {
        'label': "再撑几年",
        'hint': "能力+2，家庭关"+"系受损",
        'apply': function(){
return{'ovr':0x2,'fame':-0x3,'text':"你留下了。那年春节又没回去，视频里母亲把手机举得很近，想让你看清楚桌上的菜。"};
}
    }
  ]
},

{
  'id': "red_card",
  'title': "争议红牌",
  'icon': '🟥',
  'weight': 0x2d,
  'repeat': 0x2,
  'desc': "中圈，你铲倒了对方核心，主裁掏出红牌。慢镜头回放，那是个五五开的球。",
  'options': [
    {
        'label': '认了',
        'hint': "停赛 2 场",
        'apply': function(){
return{'banGames':0x2,'text':"你没上诉。停赛的两场，你坐在看台，散场了才走。"};
}
    },
    {
        'label': "赛后开炮",
        'hint': "名气+，停赛加到"+" 4 场",
        'apply': function(){
return{'banGames':0x4,'fame':0xf,'guanxi':-0xa,'text':"你在混合区说了句「这哨子该查查」。这句话被全网炒了两天，追加停赛两场。"};
}
    }
  ]
},

{
  'id': "statemen"+'t',
  'title': "话说重了",
  'icon': '🎤',
  'weight': 0x2d,
  'repeat': 0x2,
  'desc': "输球后的采访里，你说了句「有些人根本不想赢」。第二天，全网都在猜你说的是谁。",
  'options': [
    {
        'label': '道歉',
        'hint': "地位下降",
        'apply': function(){
return{'roleDelta':-0x1,'fame':-0x5,'text':"俱乐部替你写了一份声明。你照着念完了，没有抬头。"};
}
    },
    {
        'label': "不撤回",
        'hint': "名气+，更衣室关"+"系恶化",
        'apply': function(){
return{'fame':0x14,'roleDelta':-0x2,'guanxi':-0xa,'text':"你一个字都没收回。球迷说你敢讲真话，更衣室说你难相处。两边都对。"};
}
    }
  ]
},

{
  'id': "sponsor",
  'title': "代言找上门",
  'icon': '💼',
  'weight': 0x2d,
  'stage': "prime",
  'when': function(p){
return p["fame"]>=0x2d;
},
  'desc': "一个运动品牌想签你。合同金额比半年工资还高，条件是拍一支很尬的广告。",
  'options': [
    {
        'label': "签字",
        'hint': "收入大增，名气+",
        'apply': function(p){
return{'money':0xfa+0x5*p["fame"],'fame':0xa,'ovr':-0x1,'text':"广告播出后，你在超市被认出来三次。那句台词，队友学了一整个赛季。"};
}
    },
    {
        'label': '拒了',
        'hint': "专心踢球，能力+"+'2',
        'apply': function(){
return{'ovr':0x2,'text':"你说，时间要留给训练。品牌方找了别人，那支广告后来还挺火。"};
}
    }
  ]
},

{
  'id': "nightlif"+'e',
  'title': "夜里被拍到了",
  'icon': '🌃',
  'weight': 0x28,
  'stage': "prime",
  'desc': "赛季中，你在酒吧的照片被人挂到网上，配文写着「{club} 的人凌晨三点仍在」。",
  'options': [
    {
        'label': "承认，接受罚款",
        'hint': "收入-，名气小损",
        'apply': function(){
return{'money':-0x5a,'fame':-0x8,'text':"内部罚款的通报贴在更衣室门口。每天进出，你都要看它一眼。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "说是旧照",
        'hint': function(p,q){return g(q,'蒙混过关','被扒');
},
        'apply': function(p,q,s){
return d(q,s)?{'text':"这事三天就翻篇了。网上永远有下一个该骂的人。"}:{'fame':-0x16,'roleDelta':-0x1,'clean':-0x5,'text':"有人放出带日期的原图。你没洗白，身上多了一张「不诚实」的标签。"};
}
    }
  ]
},

{
  'id': "nt_confl"+"ict",
  'title': "俱乐部不放人",
  'icon': '🛫',
  'weight': 0x2d,
  'repeat': 0x2,
  'stage': "prime",
  'when': function(p){
return p["caps"]>=0x1;
},
  'desc': "国家队要集训，俱乐部拿伤病报告压着不放人。两边都给你打了电话。",
  'options': [
    {
        'label': "去国家队",
        'hint': "征召稳固，队内地"+"位受损",
        'apply': function(){
return{'guanxi':0xc,'roleDelta':-0x1,'fame':0xa,'text':"你自己买了机票飞过去。下一场的大名单上，你的名字被划掉了。"};
}
    },
    {
        'label': "留在俱乐部",
        'hint': "地位稳固，国字号"+"机会下降",
        'apply': function(){
return{'guanxi':-0xf,'roleDelta':0x1,'text':"你留下了。名单公布那天，评论区有人说你「心里没有国家」。"};
}
    }
  ]
},

{
  'id': "injury_p"+"eak",
  'title': "最不该受伤的时候",
  'icon': '🩹',
  'weight': 0x23,
  'repeat': 0x2,
  'stage': "prime",
  'when': function(p){
return p["ovr"]>=0x48;
},
  'desc': "膝盖里积了水，队医说打一针就能上，可打完这一针，可能得歇半年。前面就是决赛。",
  'options': [
    {
        'label': "打针上场",
        'hint': "夺冠概率大增，能"+"力-4",
        'apply': function(){
return{'ovr':-0x4,'mult':{'league':2.5,'cup':0x3,'cont':2.5},'fame':0x12,'text':"你打完了那场比赛。捧杯的时候，你连蹲下都要人扶。"};
}
    },
    {
        'label': '养伤',
        'hint': "夺冠概率降低，能"+"力保住",
        'apply': function(){
return{'mult':{'league':0.4,'cup':0.4,'cont':0.4},'text':"你在看台上看完了那场决赛。膝盖是保住了，可别的，什么都没保住。"};
}
    }
  ]
},

{
  'id': "tattoo",
  'title': '纹身',
  'icon': "🖋️",
  'weight': 0x19,
  'desc': "你想在小臂上纹一整片图案。有人提醒你，有些场合会要你穿长袖。",
  'options': [
    {
        'label': "纹上",
        'hint': "名气+，关系-",
        'apply': function(){
return{'fame':0xc,'guanxi':-0x8,'text':"图案确实好看。可从那以后，每次电视转播，你都得贴上肉色胶布。"};
}
    },
    {
        'label': '算了',
        'hint': "无变化",
        'apply': function(){
return{'text':"你把那张图打印出来，贴在衣柜门上，一贴就是好几年。"};
}
    }
  ]
},

{
  'id': "study",
  'title': "把书念完",
  'icon': '📚',
  'weight': 0x19,
  'stage': "youth",
  'desc': "俱乐部跟学校合开了一个班，可以边踢球边把学历念完，代价是挤占训练时间。",
  'options': [
    {
        'label': "读书",
        'hint': "能力-1，退役后"+"有出路",
        'apply': function(){
return{'ovr':-0x1,'clean':0x5,'degree':!0x0,'text':"你成了队里少数几个能读懂合同条款的人。这件事的价值，要很多年以后才显现。"};
}
    },
    {
        'label': "全力踢球",
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'text':"你把所有时间都交给了足球。这个年纪，这是最容易做、也最难的选择。"};
}
    }
  ]
},

{
  'id': "language",
  'title': "语言关",
  'icon': "🗣️",
  'weight': 0x37,
  'when': function(p){
return!p["inChina"]&&p["seasonsA"+"broad"]<=0x3;
},
  'desc': "战术会上，教练讲了二十分钟，你只听懂了三句。翻译不在，所有人都在等你开口。",
  'options': [
    {
        'label': "下苦功学",
        'hint': "能力+3，地位提"+'升',
        'apply': function(){
return{'ovr':0x3,'roleDelta':0x1,'text':"半年后，你已能在更衣室里开玩笑了。融进去以后，球也踢开了。"};
}
    },
    {
        'label': "靠翻译",
        'hint': "地位下降",
        'apply': function(){
return{'roleDelta':-0x1,'text':"翻译不能替你上场。比赛里那几次跑位失误，都是因为没听见喊声。"};
}
    }
  ]
},

{
  'id': "homesick",
  'title': "一个人的除夕",
  'icon': '🥟',
  'weight': 0x28,
  'when': function(p){
return!p["inChina"];
},
  'desc': "除夕夜，队里照常训练。你在出租屋煮了一锅速冻饺子，视频那头，家里正热闹。",
  'options': [
    {
        'label': "熬过去",
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'text':"第二天，你照常出现在训练场，比所有人都早。有些东西，是熬出来的。"};
}
    },
    {
        'label': "找中介安排回国",
        'hint': "回中超，收入增加",
        'apply': function(){
return{'returnHome':!0x0,'money':0x1c2,'text':"你回来了。机场接机的人，比你在欧洲三年里见过的还多。"};
}
    }
  ]
},

{
  'id': "cn_zuxia"+'o',
  'title': "足校的学费",
  'icon': '🎒',
  'weight': 0x50,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "全国最好的足校发来了通知书，一年学费，抵得上家里两年的收入。父亲只说：车可以卖，学要上。",
  'options': [
    {
        'label': "就去",
        'hint': "能力+5，家里背"+'上债',
        'apply': function(){
return{'ovr':0x5,'money':-0x19,'text':"你去了。开学第一天你才知道，全宿舍六个人，五个家里都卖过点什么。"};
}
    },
    {
        'label': "留在市队",
        'hint': "能力+1，稳",
        'apply': function(){
return{'ovr':0x1,'text':"你留在了市队。教练很负责，场地是水泥地，一下雨就滑得站不住。"};
}
    }
  ]
},

{
  'id': "cn_age",
  'title': "年龄这事",
  'icon': '🆔',
  'weight': 0x46,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "有人劝你父亲：把出生年份往后改两年，能一路踢进国少。「都这么干，你不改就吃亏。」",
  'options': [
    {
        'label': "改位置",
        'hint': "青年队地位大增，"+"清白重创",
        'apply': function(){
return{'roleDelta':0x2,'ovr':0x3,'clean':-0x14,'ageFraud':!0x0,'text':"你以「十五岁」的身份，打了两年十七岁组的比赛，场上没一个人对付得了你。也从没人问过，你胡子为什么那么密。"};
}
    },
    {
        'label': '不改',
        'hint': "关系-，清白+",
        'apply': function(){
return{'clean':0xa,'guanxi':-0x8,'text':"你按真实年龄踢。同组对手个个比你矮半个头，却总快你半步——因为他们也没改。"};
}
    }
  ]
},

{
  'id': "cn_bone",
  'title': "骨龄检测",
  'icon': '🦴',
  'weight': 0x190,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["ageFraud"];
},
  'desc': "全国青少年比赛新增了骨龄抽检。你被抽中，第二天一早就得去医院。",
  'options': [
    {
        'p': function(p){return f(0.45,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': '去查',
        'hint': "查出来就完了",
        'odds': ["查出来","卡边过"],
        'apply': function(p,q,s){
return d(q,s)?{'clean':-0x19,'ban':0x1,'roleDelta':-0x2,'fame':-0xf,'text':"报告显示，你的骨龄超出年龄组两岁以上。通报里没写全名，只写了「某队 X 某」。"}:{'text':"机器给出的区间刚好卡在边缘，判定通过。你在走廊的椅子上坐了很久，才站起来。"};
}
    },
    {
        'label': "托关系换报告",
        'hint': "花钱消灾，清白再"+'降',
        'apply': function(p){
return{'money':-0xc,'clean':-0xf,'guanxi':0x8,'text':"报告顺利通过。那天晚上，你父亲喝了很多酒，一句话也没说。"};
}
    }
  ]
},

{
  'id': "cn_hongb"+'ao',
  'title': "教练的暗示",
  'icon': '🧧',
  'weight': 0x4b,
  'repeat': 0x2,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "梯队教练在训练后把你留下，聊了几句家常，末了说了句「你爸最近忙不忙，有空一起坐坐」。",
  'options': [
    {
        'label': "让家里去坐坐",
        'hint': "首发有保障，清白"+"-，花钱",
        'apply': function(){
return{'roleDelta':0x2,'money':-0x8,'clean':-0xc,'guanxi':0xa,'text':"下一场你就首发了。你踢得很好，可每次有人夸你，你都会想起那顿饭。"};
}
    },
    {
        'label': "装没听懂",
        'hint': "长期坐板凳",
        'apply': function(){
return{'roleDelta':-0x2,'clean':0x8,'text':"你装作没听懂。之后半年，你的出场时间加起来，不到九十分钟。"};
}
    }
  ]
},

{
  'id': "cn_guosh"+'ao',
  'title': "国少的名额",
  'icon': '📝',
  'weight': 0x37,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "国少集训名单快出来了。中间人报了个数，说这个价，能保证你的名字在名单里。",
  'options': [
    {
        'label': '掏钱',
        'hint': "征召+，清白-",
        'apply': function(){
return{'money':-0x14,'clean':-0x12,'guanxi':0xf,'caps':0x3,'text':"你穿上了国字号球衣。集训队里，有几个球性明显不如你的，你没敢多想。"};
}
    },
    {
        'label': "凭实力等",
        'hint': "看能力，可能落选",
        'odds': ["名单有你","名单没你"],
        'apply': function(p,q){
return d(q,Math["min"](0.7,(p["ovr"]-0x32)/0x28))?{'caps':0x3,'clean':0x5,'fame':0x8,'text':"名单出来，有你。你后来才知道，被你顶掉的那个人，交了钱。"}:{'clean':0x5,
'fame':-0x4,'text':"名单出来，没你。教练组的说法是「技术特点不符合体系需要」。"};
}
    }
  ]
},

{
  'id': "cn_liuya"+'ng',
  'title': "留洋的岔路",
  'icon': '✈️',
  'weight': 0x55,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["age"]>=0x12&&p["age"]<=0x1b&&p["ovr"]>=0x3e;
},
  'desc': "一家欧洲二级联赛"+"球队愿意给你一份"+"合同，周薪不到你"+"现在的十分之一。"+"同一天，{clu"+"b}把续约报价翻"+"了一倍。",
  'options': [
    {
        'label': "出去闯",
        'hint': "转会海外，收入大"+"减，成长加速",
        'apply': function(){
return{'goAbroad':!0x0,'money':-0x78,'ovr':0x2,'text':"你走了。第一年，你在替补席上学会了一门外语，也学会了一个人过节。"};
}
    },
    {
        'label': "留下拿钱",
        'hint': "收入大增，能力增"+"长放缓",
        'apply': function(p){
return{'money':0x384,'ovr':-0x1,'roleDelta':0x1,'stagnate':!0x0,'text':"你签了那份合同。数字很好看，好看到之后，再也没有欧洲球队来问过你。"};
}
    }
  ]
},

{
  'id': "cn_jinyu"+'an',
  'title': "天价续约",
  'icon': '💰',
  'weight': 0x3c,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["ovr"]>=0x44;
},
  'desc': "投资方老板亲自来了。桌上摆着一份年薪高得离谱的合同，其中一条写着：五年内不得转会海外。",
  'options': [
    {
        'label': "签字",
        'hint': "巨额收入，锁死留"+'洋',
        'apply': function(){
return{'money':0x384,'lockAbroad':0x5,'roleDelta':0x1,'ovr':-0x1,'text':"你签了。那一年，你成了亚洲身价最高的中国球员——也是最后一次，有人这么形容你。"};
}
    },
    {
        'label': '不签',
        'hint': "地位受损，保留可"+'能',
        'apply': function(){
return{'roleDelta':-0x1,'fame':0x8,'text':"你拒绝了。老板笑着说「年轻人有想法是好事」，然后半年，没再跟你说过一句话。"};
}
    }
  ]
},

{
  'id': "cn_arrea"+'rs',
  'title': "工资停了",
  'icon': '💸',
  'weight': 0x50,
  'repeat': 0x3,
  'cn': !0x0,
  'when': function(p){
return p["inChina"];
},
  'desc': "三个月没发工资了。队委会问大家要不要一起去讨，也有人劝：别闹，闹了更没人接盘。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "牵头去讨",
        'hint': "名气+，被俱乐部"+'记恨',
        'odds': ["补发六成","一分没有"],
        'apply': function(p,q,s){
return d(q,s)?{'money':0x78,'fame':0x12,'roleDelta':-0x1,'text':"钱补发了六成。俱乐部从此把你列进了「不稳定因素」。"}:{'money':-0x3c,'fame':0xc,'roleDelta':-0x2,
'text':"什么也没要到，反而上了新闻。下一份大名单里，没有你的名字。"};
}
    },
    {
        'label': '忍着',
        'hint': "无变化，钱可能拿"+"不回来",
        'apply': function(){
return{'money':-0xb4,'text':"你忍了一年。后来俱乐部换了投资人，那笔账，再没人提起。"};
}
    }
  ]
},

{
  'id': "cn_disso"+"lve",
  'title': "俱乐部要没了",
  'icon': "🏚️",
  'weight': 0x37,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["clubRep"]<=0x2;
},
  'desc': "投资方的地产项目暴雷，{club}宣布退出职业联赛。一夜之间，全队都成了自由身。",
  'options': [
    {
        'label': "先找下家",
        'hint': "强制转会",
        'apply': function(){
return{'leave':!0x0,'money':-0x5a,'fame':0x5,'text':"解散公告贴出来的那天，你回更衣室收拾东西，发现有人已经把球衣带走当纪念了。"};
}
    },
    {
        'label': "跟队友一起讨薪",
        'hint': "拿回部分欠薪，耽"+"误一期",
        'apply': function(){
return{'leave':!0x0,'money':0x96,'ovr':-0x3,'fame':0xa,'text':"你们在体育局门口站了一整个下午。钱要回来一部分，转会窗也错过了。"};
}
    }
  ]
},

{
  'id': "cn_neutr"+'al',
  'title': '改名',
  'icon': "🏷️",
  'weight': 0x28,
  'cn': !0x0,
  'when': function(p){
return p["inChina"];
},
  'desc': "政策要求俱乐部改中性名，冠名商当场撤资。队徽换了，训练基地的招牌拆了一半，就再没人管。",
  'options': [
    {
        'label': '接受',
        'hint': "收入下降，夺冠概"+"率下降",
        'apply': function(){
return{'money':-0x3c,'mult':{'league':0.6,'cup':0.6},'text':"改完名之后，球迷论坛最热的帖子是「我们还是不是我们」。这个问题，没人给得出答案。"};
}
    }
  ]
},

{
  'id': "cn_fixed",
  'title': "有人来找你聊天",
  'icon': '✉️',
  'weight': 0x41,
  'repeat': 0x2,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["roleRank"]>=0x2;
},
  'desc': "赛前有人约你吃饭。饭桌上不提比赛，只说了句「这场输一个球，对谁都好」，然后把一个信封推到你面前。",
  'options': [
    {
        'label': "接下",
        'hint': "巨款，清白重创",
        'apply': function(p){
return{'money':0xb4,'clean':-0x2d,'fixed':!0x0,'text':"那场球，你在禁区里慢了半拍。第二天，信封里的数字变成了银行卡上的数字。那一晚，你没睡好。"};
}
    },
    {
        'label': "推回去",
        'hint': "清白+，得罪人",
        'apply': function(){
return{'clean':0xf,'guanxi':-0xc,'text':"你把信封推了回去，饭没吃完就起身走了。之后半年，裁判的哨子对你格外严厉。"};
}
    },
    {
        'label': '举报',
        'hint': "清白大增，代价惨"+'重',
        'apply': function(){
return{'clean':0x1e,'guanxi':-0x1e,'roleDelta':-0x2,'fame':0x14,'text':"你把录音交了上去。案子办了三年，这三年里你换了四家俱乐部，没有一家愿意让你踢主力。"};
}
    }
  ]
},

{
  'id': "cn_gambl"+'e',
  'title': "赌一把",
  'icon': '🎲',
  'weight': 0x32,
  'repeat': 0x2,
  'cn': !0x0,
  'desc': "队友把你拉进一个群，群里押自己队的比赛。「小钱，玩玩而已。」",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "跟着玩",
        'hint': "小赚，清白-",
        'odds': ["先赢一把","输两个月"],
        'apply': function(p,q,s){
return d(q,s)?{'money':0xb4,'clean':-0x1c,'gambled':!0x0,'text':"第一次就赢了。赢"+"钱这件事比"+h(p,{'gk':"扑出一个点球",'other':"进一个球"})+("来得容易，这才是"+"最危险的地方。")}:{'money':-0x15e,
'clean':-0x1c,'gambled':!0x0,'text':"输了两个月工资。你已经开始盘算，下一场怎么捞回来。"};
}
    },
    {
        'label': '退群',
        'hint': "清白+",
        'apply': function(){
return{'clean':0xa,'text':"你退了群。三年后，那个群里的人上了通报，名单很长。"};
}
    }
  ]
},

{
  'id': "cn_antic"+"orruptio"+'n',
  'title': '风暴',
  'icon': '🚨',
  'weight': 0x5f,
  'cn': !0x0,
  'repeat': 0x3,
  'when': function(p){
return p["age"]>=0x16;
},
  'desc': "反腐专项组进驻足协。这两天，陆续有人被带走，其中就有那位一直很照顾你的领导。",
  'options': [
    {
        'label': "配合调查",
        'hint': "清白低的人扛不过"+'去',
        'odds': ["上了通报","扛过去了"],
        'apply': function(p,q){
return d(q,p["clean"]>=0x44?0x0:(0x44-p["clean"])/0x2d)?{'banned':!0x0,'fame':-0x28,'text':"你的名字出现在通报的第二段。终身禁足。所有奖杯合影里的你，都被打了码。"}:p["clean"]<0x44?{'clean':-0x5,
'guanxi':-0x19,'roleDelta':-0x1,'fame':-0xa,'text':"谈话谈了两天。什么也没查出来，可你的国字号名额没了，没人告诉你为什么。"}:{'clean':0x6,'guanxi':-0xf,'fame':0xc,
'text':"你什么问题都没有。风暴过后，队里干净的人不多，你是其中一个。"};
}
    },
    {
        'label': "赶紧撇清",
        'hint': "关系归零",
        'apply': function(){
return{'guanxi':-0x23,'clean':0x5,'fame':-0x5,'text':"你连夜删光了所有聊天记录。之后几年，你确实没事，也确实再没进过任何名单。"};
}
    }
  ]
},

{
  'id': "cn_yinya"+'ng',
  'title': "两份合同",
  'icon': '📄',
  'weight': 0x2d,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["ovr"]>=0x41;
},
  'desc': "俱乐部给了你两份合同，一份报备，一份实际执行。财务说「大家都是这么签的」。",
  'options': [
    {
        'label': "签字",
        'hint': "收入大增，清白-",
        'apply': function(){
return{'money':0x226,'clean':-0x12,'yinyang':!0x0,'text':"到手的钱多了不少。你把那份「实际执行」的复印件，锁进了保险柜。"};
}
    },
    {
        'label': "只签报备那份",
        'hint': "收入低，清白+",
        'apply': function(){
return{'money':-0xb4,'clean':0xc,'text':"财务看了你一眼，说了句「你是第一个」。那语气，听不出是夸还是别的。"};
}
    }
  ]
},

{
  'id': "cn_tax",
  'title': '查税',
  'icon': '🧾',
  'weight': 0x37,
  'cn': !0x0,
  'when': function(p){
return p["yinyang"]||p["money"]>=0xbb8;
},
  'desc': "税务部门开始核查体育行业的收入申报。你那两份合同的事，有人把材料递了上去。",
  'options': [
    {
        'label': "主动补缴",
        'hint': "破财免灾",
        'apply': function(p){
return{'money':-Math["max"](0xfa,0.4*p["money"]|0x0),'clean':0x6,'text':"补缴加滞纳金，一次性划走了你大半积蓄。至少，这事到此为止。"};
}
    },
    {
        'p': function(p){return f(0.4,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': '扛着',
        'hint': function(p,q){return g(q,'没事','重罚');
},
        'apply': function(p,q,s){
return d(q,s)?{'text':"材料递上去之后没了下文。悬了一年的心，你慢慢也就放下了。"}:{'money':-0x384,'ban':0x1,'fame':-0x19,'clean':-0xa,'text':"通报点了你的名。罚款是补缴额的四倍，外加停赛半年。你成了那年的典型。"};
}
    }
  ]
},

{
  'id': "cn_titi",
  'title': '体测',
  'icon': '⏱️',
  'weight': 0x3c,
  'repeat': 0x3,
  'cn': !0x0,
  'when': function(p){
return p["inChina"];
},
  'desc': "赛季前的体测又改了标准，这次是 12 分钟跑加折返。不达标就不能报名，跟你会不会踢球没关系。",
  'options': [
    {
        'label': "苦练体能",
        'hint': "能力+1，稳过",
        'apply': function(){
return{'ovr':0x1,'text':"你练了一个冬天的长跑。测试那天轻松过关，之后再没跑过那么远。"};
}
    },
    {
        'p': function(p){return f(0.7,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "赌能过",
        'hint': function(p,q){return g(q,'过','整期无法报名');
},
        'apply': function(p,q,s){
return d(q,s)?{'text':"压线过了。你在终点线躺了五分钟，队医过来问你还好吗。"}:{'roleDelta':-0x3,'ovr':-0x2,'text':"差了 40 米。整个前半程，你都在看台上坐着——旁边，是队里技术最好的那个队友。"};
}
    }
  ]
},

{
  'id': "cn_u23",
  'title': "U23 政策",
  'icon': '🔢',
  'weight': 0x37,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["age"]<=0x17;
},
  'desc': "新政要求每场必须有 U23 出场。你被安排首发，开场 15 分钟就被换下——名额，用完了。",
  'options': [
    {
        'label': "接受安排",
        'hint': "出场数虚高，能力"+'停滞',
        'apply': function(){
return{'roleDelta':0x1,'ovr':-0x1,'text':"这个赛季，你的出场次数排进队内前三，总时长却排在第十七。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "要求真正的机会",
        'hint': function(p,q){return g(q,'争取到','被弃用');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'ovr':0x3,'text':"你跟教练摊牌了。"+"他给了你一个整场"+"，你用"+h(p,{'gk':"一场零封",'def':"一次门线上的解围",'other':"一次助攻"})+"把位置踢了下来。"}:{'roleDelta':-0x2,
'text':"教练说「那就让别人去当那个 15 分钟」。你连那 15 分钟，也没有了。"};
}
    }
  ]
},

{
  'id': "cn_jixun",
  'title': "抽调进集训队",
  'icon': "🏕️",
  'weight': 0x32,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["age"]<=0x1a&&p["ovr"]>=0x3c;
},
  'desc': "为了备战大赛，成立了一支长期集训队，从各队抽人，一去半年，不踢联赛。",
  'options': [
    {
        'label': "就去",
        'hint': "征召+，联赛地位"+'受损',
        'apply': function(){
return{'caps':0x4,'guanxi':0xc,'roleDelta':-0x2,'ovr':-0x1,'text':"半年里，你踢了二十场友谊赛，赢了十七场。回到联赛，你的位置上已经站着别人。"};
}
    },
    {
        'label': "报伤不去",
        'hint': "地位保住，关系-",
        'apply': function(){
return{'guanxi':-0x14,'roleDelta':0x1,'text':"队医给你开了一张诊断。这张纸保住了你的主力，也让你从此不在任何名单里。"};
}
    }
  ]
},

{
  'id': "cn_leade"+'r',
  'title': "领导来看球",
  'icon': '🎩',
  'weight': 0x2d,
  'repeat': 0x2,
  'cn': !0x0,
  'when': function(p){
return p["inChina"];
},
  'desc': "主席台上今天坐了不少人。赛前动员会，教练说这场「不只是三分的问题」。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "拼命表现",
        'hint': function(p,q){return g(q,'一战成名','用力过猛');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xf,'guanxi':0xc,'roleDelta':0x1,'text':"你踢了全场最漂亮的一脚。散场时，有人把你叫到通道口，握手握了很久。"}:{'ovr':-0x2,'banGames':0x3,
'text':"你太想表现，第 30 分钟，一次莽撞的犯规让你被罚下。主席台上没有人鼓掌。"};
}
    },
    {
        'label': "正常踢",
        'hint': "无变化",
        'apply': function(){
return{'text':"你按平时的踢法，走完了 90 分钟。赛后的总结会上，你的名字没有被提到。"};
}
    }
  ]
},

{
  'id': "cn_weibo",
  'title': "上了热搜",
  'icon': '📱',
  'weight': 0x41,
  'repeat': 0x3,
  'cn': !0x0,
  'when': function(p){
return p["caps"]>=0x1;
},
  'desc': "国家队又输了。那场你踢得不差，热搜第一条却挂着你的名字，配图是你低头走向通道的抓拍。",
  'options': [
    {
        'p': function(p){return f(0.45,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "回一条",
        'hint': "名气+，也可能更"+'糟',
        'odds': ["舆论转向","越描越黑"],
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x16,'text':"你写了三百字，该认的认了，该说的也说了。评论区第一次有人打出「加油」。"}:{'fame':-0x12,'ovr':-0x1,'text':"你的回应被截成九宫格逐句嘲讽。你删了微博，可人还在网上，删不掉。"};
}
    },
    {
        'label': "关掉评论",
        'hint': "名气-，心态保住",
        'apply': function(){
return{'fame':-0x6,'ovr':0x1,'text':"你把 App 卸了，第二天照常出现在训练场。听不见的声音，就当它不存在。"};
}
    }
  ]
},

{
  'id': "cn_natur"+"alize",
  'title': '归化',
  'icon': '🛂',
  'weight': 0x2d,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["roleRank"]<=0x3;
},
  'desc': "队里来了两个归化球员，年薪是你的六倍，踢的正是你的位置。发布会上，他们背了一段现学的中文。",
  'options': [
    {
        'label': "接受现实",
        'hint': "地位下降，能力+"+'2',
        'apply': function(){
return{'roleDelta':-0x2,'ovr':0x2,'text':"你在替补席上看了一整年。他们的技术确实好，这一点，你从未否认过。"};
}
    },
    {
        'label': "要求转会",
        'hint': '离队',
        'apply': function(){
return{'leave':!0x0,'fame':-0x5,'text':"你递了转会申请。走的那天，俱乐部发了条通稿，感谢你「为球队做出的贡献」——不多不少，42 个字。"};
}
    }
  ]
},

{
  'id': "cn_lives"+"how",
  'title': "直播带货",
  'icon': '📺',
  'weight': 0x28,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["fame"]>=0x28;
},
  'desc': "MCN 找上门来，说凭你现在的人气，一场直播的坑位费，顶你三个月的工资。",
  'options': [
    {
        'label': '开播',
        'hint': "收入大增，能力-"+"，名气+",
        'apply': function(p){
return{'money':0x1c2+0x4*p["fame"],'ovr':-0x3,'fame':0xf,'text':"你在镜头前喊了三个小时「家人们」。当晚成交额漂亮得吓人，第二天训练，你跑不动了。"};
}
    },
    {
        'label': '拒了',
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'text':"你说，自己还是球员。MCN 转身签了另一个刚退役的，那人现在已是头部主播。"};
}
    }
  ]
},

{
  'id': "cn_zhoub"+'ao',
  'title': "队内酒局",
  'icon': '🍻',
  'weight': 0x2d,
  'repeat': 0x2,
  'cn': !0x0,
  'when': function(p){
return p["inChina"];
},
  'desc': "赢球之后，老队员组了个局，名目叫「统一思想」。教练组心知肚明，从不插手。",
  'options': [
    {
        'label': "就去",
        'hint': "队内地位+，能力"+'-',
        'apply': function(){
return{'roleDelta':0x1,'ovr':-0x2,'clean':-0x4,'text':"喝到凌晨三点。第二天训练，所有人都在放水，气氛好得不像话。"};
}
    },
    {
        'label': '不去',
        'hint': "被孤立，能力+",
        'apply': function(p){
return{'ovr':0x2,'roleDelta':-0x1,'text':"你回房间睡了。之"+"后半年，"+h(p,{'gk':"后卫回传球总是又"+"急又高，没人愿意"+"多跑两步给你一个"+"好角度。",'other':"传中球总是很难找"+"到你的位置。"})};
}
    }
  ]
},

{
  'id': "cn_trans"+"fer_bloc"+'k',
  'title': "转会卡在手里",
  'icon': '🔒',
  'weight': 0x2d,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["ovr"]>=0x42;
},
  'desc': "海外球队来了报价，俱乐部却开出远超市场的价格——摆明了不放人，也不给你涨一分钱。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "公开抗议",
        'hint': function(p,q){return g(q,'放行','雪藏');
},
        'apply': function(p,q,s){
return d(q,s)?{'goAbroad':!0x0,'fame':0xf,'text':"你把事情捅给了媒体。舆论压下来，俱乐部终于松了口。"}:{'roleDelta':-0x3,'fame':0x8,'text':"俱乐部把你挂了起来，整整一年，没让你进过一次一线队名单。转会窗一关，人也就废了半年。"};
}
    },
    {
        'label': '认了',
        'hint': "无变化",
        'apply': function(){
return{'ovr':-0x1,'text':"报价过期了。俱乐部通稿里写着「球员本人无意离队」——这句话，你是从新闻上看到的。"};
}
    }
  ]
},

{
  'id': "cn_schoo"+"l_pick",
  'title': '选择',
  'icon': '🎓',
  'weight': 0x37,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "高三了。体校教练说，再练两年就有职业合同；班主任说，你的成绩够得上一本。那天晚上，父母吵到很晚。",
  'options': [
    {
        'label': '踢球',
        'hint': "能力+4，退路没"+'了',
        'apply': function(){
return{'ovr':0x4,'text':"志愿表上，你一个学校都没填。那晚，母亲一直在厨房里，没有出来。"};
}
    },
    {
        'label': "先考大学",
        'hint': "能力-3，多一条"+'路',
        'apply': function(){
return{'ovr':-0x3,'clean':0x8,'degree':!0x0,'text':"你考上了，读的是体育教育。四年后你终究回来踢球，只是起点，比同龄人晚了四年。"};
}
    }
  ]
},

{
  'id': "cn_ref",
  'title': '哨子',
  'icon': '📯',
  'weight': 0x32,
  'cn': !0x0,
  'when': function(p){
return p["inChina"]&&p["guanxi"]>=0x2d;
},
  'desc': "关键场次，一个再明显不过的犯规，裁判没吹。你们占了便宜，客队全队围上去讨说法。",
  'options': [
    {
        'label': "什么都不说",
        'hint': "夺冠概率提升，清"+'白-',
        'apply': function(){
return{'mult':{'league':1.6,'cup':1.6},'clean':-0x8,'text':"你什么也没说，转身跑回半场。赛后集锦里，那个镜头被剪掉了。"};
}
    },
    {
        'label': "示意裁判",
        'hint': "名气大增，得罪人",
        'apply': function(){
return{'fame':0x19,'guanxi':-0x12,'mult':{'league':0.7},'text':"你跑过去告诉裁判：那是犯规。新闻上了热搜，你也在某些人那里，彻底挂了号。"};
}
    }
  ]
},

{
  'id': "cn_farew"+"ell",
  'title': "退役之后",
  'icon': '🧭',
  'weight': 0x28,
  'cn': !0x0,
  'stage': "vet",
  'desc': "你开始想，退役以后做什么。有人劝你去考教练证，有人说搞青训正赶上了风口。",
  'options': [
    {
        'label': "考教练证",
        'hint': "清白+，收入-",
        'apply': function(){
return{'money':-0x3c,'clean':0x5,'coachCert':!0x0,'text':"休赛期，你去上了课。班上一半是退役球员，另一半，是从来没踢过球的投资人。"};
}
    },
    {
        'p': function(p){return f(0.45,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "投钱做青训",
        'hint': "赌运气",
        'odds': ["招满了","烧光积蓄"],
        'apply': function(p,q,s){
return d(q,s)?{'money':0xb4,'academy':!0x0,'text':"第一批学员招满了。你站在场边看他们跑动，忽然想起自己十六岁那年。"}:{'money':-0x2ee,'text':"场地租金、教练工资，烧光了积蓄，招来的只有十一个孩子。第二年，你把场地退了。"};
}
    }
  ]
},

{
  'id': "late",
  'title': '迟到',
  'icon': '⏰',
  'weight': 0x37,
  'repeat': 0x2,
  'desc': "冬训第一天，你迟到了四十分钟。全队站在寒风里等你，教练一句话没说。",
  'options': [
    {
        'label': "公开道歉",
        'hint': "名气-，队内关系"+'回暖',
        'apply': function(){
return{'fame':-0x8,'roleDelta':0x1,'text':"队会上，你站起来说了对不起。老队员拍了拍你的背，这事就算翻篇了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "找借口",
        'hint': function(p,q){return g(q,'蒙混','被停训');
},
        'apply': function(p,q,s){
return d(q,s)?{'text':"你说路上出了车祸。没人去核实，也没人相信。"}:{'roleDelta':-0x2,'clean':-0x5,'text':"监控调出来了：九点，你的车还停在酒店门口。停训两周。"};
}
    }
  ]
},

{
  'id': "coach_cl"+"ash",
  'title': "跟教练顶起来了",
  'icon': '😠',
  'weight': 0x37,
  'repeat': 0x2,
  'stage': "prime",
  'desc': "半场被换下时，你把球衣摔在地上。摄像机全程跟着你。",
  'options': [
    {
        'label': "私下认错",
        'hint': "地位保住，名气-",
        'apply': function(){
return{'fame':-0xa,'roleDelta':0x1,'text':"你在教练办公室待了二十分钟。出来后没人再提这事，你也再没在半场被换下。"};
}
    },
    {
        'label': '不认',
        'hint': "球迷买账，教练不"+'用你',
        'apply': function(){
return{'fame':0x10,'roleDelta':-0x2,'text':"球迷夸你有血性。接下来的六轮，你在替补席上，看完了每一场。"};
}
    }
  ]
},

{
  'id': "worldie",
  'title': "世界波",
  'icon': '🎯',
  'weight': 0x32,
  'repeat': 0x2,
  'when': function(p){
return p["roleRank"]>=0x2&&'gk'!==p["posGroup"];
},
  'desc': "禁区外四十米，你抬头，看了一眼门将的站位。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': '抡',
        'hint': function(p,q){return g(q,'载入集锦','打飞看台');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x16,'ovr':0x2,'text':"球砸进死角。这一脚，被剪进了整个赛季所有集锦的片头。"}:{'fame':-0x6,'text':"球飞进看台第七排。解说只说了句：「这个选择值得商榷。」"};
}
    },
    {
        'label': '回传',
        'hint': "无变化",
        'apply': function(){
return{'text':"你把球回给后腰。正确的选择，往往也是没人会记得的选择。"};
}
    }
  ]
},

{
  'id': "own_goal",
  'title': "乌龙球",
  'icon': '😵',
  'weight': 0x2d,
  'when': function(p){
return'gk'!==p["posGroup"];
},
  'desc': "解围，一脚把球捅进自家球门——偏偏还是德比。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': '扛住',
        'hint': function(p,q){return g(q,'扳回来','状态崩');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0xa,'text':"下半场，你把球送进对方球门。赛后你说：「我欠球队一个。」"}:{'ovr':-0x3,'fame':-0xe,'text':"那之后几个月，你不敢再往前压。那脚球，在你脑子里循环了一整个赛季。"};
}
    }
  ]
},

{
  'id': "teammate"+"_fight",
  'title': "更衣室动手了",
  'icon': '🥊',
  'weight': 0x2d,
  'stage': "prime",
  'desc': "一次对抗，先是推搡，最后你们在更衣室里扭作一团。",
  'options': [
    {
        'label': "各打五十大板",
        'hint': "都被罚，名气-",
        'apply': function(){
return{'money':-0x28,'fame':-0x8,'roleDelta':-0x1,'text':"俱乐部各罚了一个月工资。赛季末你们握了手，只是从此，再没坐过同一桌。"};
}
    },
    {
        'label': "把责任揽下来",
        'hint': "破财，队内地位+",
        'apply': function(){
return{'money':-0x50,'roleDelta':0x1,'fame':-0x4,'text':"你说，是自己先动的手。后来队友在采访里提到你，说：这个人靠得住。"};
}
    }
  ]
},

{
  'id': "father_i"+'ll',
  'title': "父亲住院了",
  'icon': '🏥',
  'weight': 0x2d,
  'desc': "赛季中段，家里来了电话：父亲要做手术，需要人守着。",
  'options': [
    {
        'label': "请假回去",
        'hint': "错过比赛，能力-",
        'apply': function(){
return{'ovr':-0x3,'roleDelta':-0x1,'money':-0x3c,'guanxi':0x4,'text':"你在病房陪了三周。回来时，联赛已过五轮，你的号码穿在别人身上。"};
}
    },
    {
        'label': "留队踢完",
        'hint': "保住位置，心里过"+'不去',
        'apply': function(){
return{'roleDelta':0x1,'fame':0x4,'ovr':-0x1,'text':"你留下了，那几场也踢得不错。父亲手术那天，你把手机关了九十分钟。"};
}
    }
  ]
},

{
  'id': "agent_sw"+"itch",
  'title': "换经纪人",
  'icon': '🤝',
  'weight': 0x2d,
  'stage': "prime",
  'desc': "一家大牌经纪公司找上门：能把你的身价翻一倍，前提是，和跟了你多年的老经纪人解约。",
  'options': [
    {
        'label': '换',
        'hint': "转会机会+，赔违"+'约金',
        'apply': function(p){
return{'money':-Math["max"](0x3c,0.12*p["money"]|0x0),'fame':0xa,'text':"违约金掏得肉疼。新公司能力确实更强——同时也代理着二十个，跟你抢位置的人。"};
}
    },
    {
        'label': '不换',
        'hint': "关系+",
        'apply': function(){
return{'guanxi':0x8,'fame':-0x3,'text':"老经纪人，是你十六岁那年就跟的。能力一般，可从没骗过你。"};
}
    }
  ]
},

{
  'id': "relapse",
  'title': "老伤复发",
  'icon': '🦯',
  'weight': 0x32,
  'repeat': 0x2,
  'stage': "prime",
  'when': function(p){
return p["age"]>=0x1b;
},
  'desc': "那个地方又疼了。核磁结果：老伤。医生说，要么保守，要么开刀。",
  'options': [
    {
        'label': "打封闭继续踢",
        'hint': "本期能踢，能力持"+"续下滑",
        'apply': function(){
return{'ovr':-0x4,'roleDelta':0x1,'text':"你靠封闭踢完了这一期。每场比赛，你都提前四十分钟进更衣室。"};
}
    },
    {
        'label': '开刀',
        'hint': "缺席一期，之后恢"+'复',
        'apply': function(){
return{'ovr':0x2,'roleDelta':-0x3,'text':"手术很成功，你也就此错过半年。回来时，身体是好的，位置是别人的。"};
}
    }
  ]
},

{
  'id': "leader",
  'title': "更衣室的话事人",
  'icon': '🗣',
  'weight': 0x28,
  'stage': "vet",
  'when': function(p){
return p["roleRank"]>=0x2;
},
  'desc': "老队长退役了。训练结束后，年轻人开始凑到你身边，问这问那。",
  'options': [
    {
        'label': "带他们",
        'hint': "球队更强，自己出"+'场少',
        'apply': function(){
return{'roleDelta':-0x1,'mult':{'league':1.7,'cup':1.7},'fame':0x8,'text':"你成了赛后第一个开口说话的人。数据不好看，可队伍立住了。"};
}
    },
    {
        'label': "先顾自己",
        'hint': "保住出场，队内孤"+'立',
        'apply': function(){
return{'roleDelta':0x1,'fame':-0x6,'text':"你把精力收回到自己身上。那些年轻人，后来去问别人了。"};
}
    }
  ]
},

{
  'id': "cn_donxu"+'n',
  'title': '冬训',
  'icon': '🏔',
  'weight': 0x3c,
  'cn': !0x0,
  'repeat': 0x3,
  'desc': "又是昆明海埂。一天三练：上午越野，下午对抗，晚上开会看录像，直到十一点。",
  'options': [
    {
        'p': function(p){return f(0.65,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': '全上',
        'hint': function(p,q){return g(q,'能力+3','练废');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'text':"一个冬天下来，体测全队第一。赛季前六轮，你像换了个人。"}:{'ovr':-0x4,'roleDelta':-0x1,'text':"第三周，膝盖积液。老队员说，这叫「练死了」，每年都有几个。"};
}
    },
    {
        'label': '留力',
        'hint': "能力+1，被说不"+'刻苦',
        'apply': function(){
return{'ovr':0x1,'guanxi':-0x8,'roleDelta':-0x1,'text':"你按自己的节奏练。总结会上，教练组撂下一句：「有些人心思不在这儿。」"};
}
    }
  ]
},

{
  'id': "cn_xianx"+'in',
  'title': "限薪令",
  'icon': '✂️',
  'weight': 0x46,
  'cn': !0x0,
  'repeat': 0x2,
  'when': function(p){
return p["inChina"];
},
  'desc': "足协一纸文件，顶薪一刀切。你刚签的合同，一夜之间要重签，降幅超过一半。",
  'options': [
    {
        'label': "签补充协议",
        'hint': "收入大减",
        'apply': function(p){
return{'money':-Math["max"](0x78,0.3*p["money"]|0x0),'text':"你签了。还是那间会议室，去年吹嘘引援投入的人，一个都没来。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "拒签闹到仲裁",
        'hint': function(p,q){return g(q,'拿回部分','被雪藏');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0x64,'fame':0xc,'guanxi':-0xf,'text':"仲裁支持了你一部分诉求。俱乐部照付，只是从此，把你当外人。"}:{'roleDelta':-0x3,'money':-0x96,
'fame':0x8,'text':"案子拖了一年多。这一年，你没上过一场比赛，一分工资也没拿到。"};
}
    }
  ]
},

{
  'id': "cn_waiyu"+'an',
  'title': "外援政策",
  'icon': '🛫',
  'weight': 0x3c,
  'cn': !0x0,
  'repeat': 0x2,
  'when': function(p){
return p["inChina"]&&'gk'!==p["posGroup"]&&p["roleRank"]<=0x3;
},
  'desc': "新赛季，外援名额放宽到五个，五个都挤在你的位置上轮番上场。",
  'options': [
    {
        'label': "改踢别的位置",
        'hint': "有球踢，能力-2",
        'apply': function(){
return{'ovr':-0x2,'roleDelta':0x1,'text':"你去踢了边路。两年后才回到原位置，回来时，原来那些动作已经生疏了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "死守位置",
        'hint': function(p,q){return g(q,'争到','一年白费');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'ovr':0x2,'fame':0x8,'text':"热身赛，你把那个八百万欧的外援，按在了替补席上。这种事，一年也就一两次。"}:{'roleDelta':-0x3,'text':"一整年，你只打了四百分钟，全是垃圾时间。"};
}
    }
  ]
},

{
  'id': "cn_yidi",
  'title': "球队搬走了",
  'icon': '🚚',
  'weight': 0x2d,
  'cn': !0x0,
  'when': function(p){
return p["inChina"];
},
  'desc': "投资方把整支球队迁去两千公里外的另一个省。那晚，球迷在球场外坐了一整夜。",
  'options': [
    {
        'label': "跟着走",
        'hint': "保住合同，名气-",
        'apply': function(){
return{'fame':-0xc,'money':0x3c,'text':"你跟着去了。新主场的第一场，看台上坐了三百人，横幅上，是当地赞助商的广告。"};
}
    },
    {
        'label': "留下换队",
        'hint': '离队',
        'apply': function(){
return{'leave':!0x0,'fame':0xa,'text':"你说，这座城市养了你八年。老球迷把这句话记住了——虽然球队，已经不在。"};
}
    }
  ]
},

{
  'id': "cn_qingx"+'un',
  'title': "青训补偿",
  'icon': '📄',
  'weight': 0x2d,
  'cn': !0x0,
  'when': function(p){
return p["age"]<=0x18;
},
  'desc': "老东家翻出一份你十二岁签的协议，要收一笔天价青训补偿，转会就此卡住。",
  'options': [
    {
        'label': "自掏腰包",
        'hint': "破财但走成",
        'apply': function(p){
return{'money':-Math["max"](0x50,0.35*p["money"]|0x0),'text':"你自己垫了这笔钱。签字那天你才看清，十二岁那年，家里到底签了什么。"};
}
    },
    {
        'p': function(p){return f(0.45,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "打官司",
        'hint': "拖一年，可能白拖",
        'odds': ["仲裁赢了","白拖一年"],
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x8,'clean':0x5,'text':"仲裁认定协议无效"+"。你赢了，也在场"+"外坐了整整一年。"}:{'roleDelta':-0x2,'ovr':-0x2,'text':"官司拖了一年半，转会窗开了又关，三次。到头来，你什么也没得到。"};
}
    }
  ]
},

{
  'id': "cn_yueta"+'n',
  'title': "被约谈",
  'icon': '☕',
  'weight': 0x32,
  'cn': !0x0,
  'repeat': 0x2,
  'when': function(p){
return p["inChina"]&&p["fame"]>=0x1e;
},
  'desc': "赛后，你说了句「这场球大家都看见了」。第二天，纪律委员会请你喝茶。",
  'options': [
    {
        'label': "写检查",
        'hint': "名气-，关系+",
        'apply': function(){
return{'fame':-0xc,'guanxi':0xa,'text':"三千字检查，念了一遍，录了像。此后半年，裁判对你格外温柔。"};
}
    },
    {
        'label': '不写',
        'hint': "重罚，球迷买账",
        'apply': function(){
return{'banGames':0x5,'money':-0x50,'fame':0x14,'guanxi':-0x14,'text':"停赛五场，加罚款。球迷把你那句话做成了表情包，一用就是好几年。"};
}
    }
  ]
},

{
  'id': "cn_saihu"+'i',
  'title': "赛会制",
  'icon': '🏨',
  'weight': 0x2d,
  'cn': !0x0,
  'when': function(p){
return p["inChina"];
},
  'desc': "整个赛季，集中到一座城市打完。全封闭，四个月，出不了酒店的门。",
  'options': [
    {
        'label': '熬',
        'hint': "能力+2，心态受"+'损',
        'apply': function(){
return{'ovr':0x2,'fame':-0x4,'text':"四个月，你把酒店走廊走了一万遍。有人在里面，把婚离了。"};
}
    },
    {
        'label': "申请特殊回家",
        'hint': "被拒且记过",
        'apply': function(){
return{'guanxi':-0xc,'roleDelta':-0x1,'text':"申请没批。领队说：「大家都一样。」——可并不是大家都一样。"};
}
    }
  ]
},

{
  'id': "cn_zhuan"+'ye',
  'title': "退役以后干什么",
  'icon': '💼',
  'weight': 0x2d,
  'cn': !0x0,
  'stage': "vet",
  'desc': "队里请来个讲师，讲职业规划。台下二十个人，谁也说不出明年自己会在哪。",
  'options': [
    {
        'label': "考教练证",
        'hint': "花钱，退役有出路",
        'apply': function(){
return{'money':-0x32,'clean':0x4,'coachCert':!0x0,'text':"你报了 C 级班。同期学员里，三个是你当年的对手，如今都在等同一个岗位。"};
}
    },
    {
        'label': "先不想",
        'hint': "专心踢球，能力+"+'2',
        'apply': function(){
return{'ovr':0x2,'text':"你说还能再踢几年。讲师笑了笑，说你这句，每年都有人讲。"};
}
    }
  ]
},

{
  'id': "visa",
  'title': "劳工证",
  'icon': '🛂',
  'weight': 0x32,
  'when': function(p){
return!p["inChina"]&&p["seasonsA"+"broad"]<=0x2;
},
  'desc': "转会敲定了，可劳工证卡在国家队的出场次数上——你差三场。",
  'options': [
    {
        'label': "等下一个窗口",
        'hint': "空转半年",
        'apply': function(){
return{'ovr':-0x2,'roleDelta':-0x2,'text':"你在异国公寓里住了半年，每天跟着预备队。窗口开的那天，你的状态没了。"};
}
    },
    {
        'label': "先去别处过渡",
        'hint': "转去次级联赛",
        'apply': function(p){
return{'leave':!0x0,'ovr':0x1,'text':"你先去了隔壁联赛，踢了一年半。这条路很多人走过，走通的不多。"};
}
    }
  ]
},

{
  'id': "fitness_"+"coach",
  'title': "私人体能师",
  'icon': '⏱️',
  'weight': 0x3c,
  'repeat': 0x2,
  'desc': "队友介绍来一个体能师。一个冬训的报价，顶得上你两个月工资。",
  'options': [
    {
        'p': function(p){return f(0.75,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "请他来",
        'hint': function(p,q){return g(q,'能力+5','练岔了');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':-0x3c,'ovr':0x5,'text':"他把你的跑动一帧一帧拆开来看。三个月后，你觉得自己跑起来省劲了。"}:{'money':-0x3c,'ovr':-0x1,'text':"他那套练法和队里的大课撞在一起。你两边都没跟住，开季两个月都在找感觉。"};
}
    },
    {
        'label': "跟队练",
        'hint': "省钱，无变化",
        'apply': function(){
return{'text':"你跟着队里的大课练完了整个冬训。省下的钱，还躺在卡里。"};
}
    }
  ]
},

{
  'id': "video_ro"+'om',
  'title': "录像室",
  'icon': "🎞️",
  'weight': 0x3a,
  'repeat': 0x2,
  'desc': "分析师把你半年的比赛剪成四十分钟，问你要不要每周留下来看一遍。",
  'options': [
    {
        'label': "留下来看",
        'hint': "能力+3，饭局都"+'推了',
        'apply': function(){
return{'ovr':0x3,'guanxi':-0x6,'text':"你这才发现，自己每次接球前都不回头。改掉这个习惯，花了半年。"};
}
    },
    {
        'label': '回家',
        'hint': "无变化",
        'apply': function(){
return{'text':"你说踢球靠感觉。"+"分析师没再问过第"+"二次。"};
}
    }
  ]
},

{
  'id': "weak_foo"+'t',
  'title': "另一只脚",
  'icon': '🦶',
  'weight': 0x37,
  'stage': "youth",
  'desc': "教练说你这只脚只能用来站着。要改，得从最基础的动作重新来一遍。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "从头练",
        'hint': function(p,q){return g(q,'能力+6','别扭一整年');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x6,'text':"半年后，你在训练赛里用左脚把球推入远角。那天，你自己都愣了一下。"}:{'ovr':-0x1,'roleDelta':-0x1,'text':"整整一年，你踢得像个新手。教练一度把你放回了替补。"};
}
    },
    {
        'label': "扬长避短",
        'hint': "无变化",
        'apply': function(){
return{'text':"你把右脚练得更好了。对手也很快知道，该往哪边逼你。"};
}
    }
  ]
},

{
  'id': "growth_s"+"purt",
  'title': "窜个子",
  'icon': '📏',
  'weight': 0x34,
  'stage': "youth",
  'desc': "一个夏天，你长了七公分。裤子短了一截，脚下的球也不太听话了。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "加练协调性",
        'hint': function(p,q){return g(q,'能力+5','拉伤');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x5,'text':"身体重新长回你自己的了，比以前高，也比以前快。"}:{'ovr':-0x2,'text':"长得太快，膝盖先"+"扛不住。队医让你"+"歇了两个月。"};
}
    },
    {
        'label': "等身体自己适应",
        'hint': "能力+1",
        'apply': function(){
return{'ovr':0x1,'text':"你等了一年。它确实自己长好了，只是那一年，白过了。"};
}
    }
  ]
},

{
  'id': "street_b"+"all",
  'title': "野球场",
  'icon': "🏙️",
  'weight': 0x32,
  'stage': "youth",
  'repeat': 0x2,
  'desc': "周末，有人喊你去公园的水泥地踢五人制。队规不让。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "就去",
        'hint': function(p,q){return g(q,'能力+3','崴了脚');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x4,'text':"小场地逼着你一秒之内做决定。回到队里再看十一人制，节奏慢得像放录像。"}:{'ovr':-0x2,'roleDelta':-0x1,'text':"你在水泥地上崴了脚。队里问你怎么伤的，你说不出口。"};
}
    },
    {
        'label': "老实待着",
        'hint': "无变化",
        'apply': function(){
return{'text':"你在宿舍躺了一天。手机里那群人，后来没再叫过你。"};
}
    }
  ]
},

{
  'id': "foreign_"+"star",
  'title': "队里的外援",
  'icon': '🌍',
  'weight': 0x37,
  'when': function(p){
return p["inChina"]&&p["clubRep"]>=0x2;
},
  'desc': "球队新签的外援，拿过欧冠。他每天提前四十分钟到训练场，一个人练。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "跟着他练",
        'hint': function(p,q){return g(q,'能力+5','人家没搭理你');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x5,'text':"他不太说中文，只是把动作做给你看。一个赛季下来，你偷学了不少。"}:{'ovr':0x1,'text':"他大概觉得你跟不"+"上。练了三次以后"+"，他换了个时间来"+'。'};
}
    },
    {
        'label': "按点上下班",
        'hint': "无变化",
        'apply': function(){
return{'text':"你按时到，也按时走。他后来去了日本，走之前没人送。"};
}
    }
  ]
},

{
  'id': "summer_c"+"amp",
  'title': "自费夏训",
  'icon': '✈️',
  'weight': 0x30,
  'when': function(p){
return p["inChina"]&&p["age"]<=0x1b;
},
  'desc': "有中介能安排你去欧洲，跟一支二级联赛球队合练两个月，费用自理。",
  'options': [
    {
        'p': function(p){return f(0.75,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "就去",
        'hint': function(p,q){return g(q,'能力+7','水土不服');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':-0x82,'ovr':0x7,'fame':0x6,'text':"那边的对抗强度，不是一个量级。回来再踢国内比赛，你觉得自己有的是时间。"}:{'money':-0x82,'ovr':-0x1,
'text':"语言不通，饮食不惯，一场正式比赛都没捞着。两个月，只换来几段视频。"};
}
    },
    {
        'label': '不去',
        'hint': "无变化",
        'apply': function(){
return{'text':"你算了算钱，把机票退了。那个夏天，你在家乡的球场跑圈。"};
}
    }
  ]
},

{
  'id': "analyst",
  'title': "数据不会骗人",
  'icon': '📊',
  'weight': 0x30,
  'stage': "prime",
  'when': function(p){
return "att"===p["posGroup"]||"mid"===p["posGroup"];
},
  'desc': "分析师拿着一张热图来找你。今年你在禁区里的触球，比去年少了四成。",
  'options': [
    {
        'label': "照着改",
        'hint': "能力+3，踢得别"+'扭',
        'apply': function(){
return{'ovr':0x3,'fame':-0x4,'text':"你照着图跑位，一开始很难受。数据慢慢好看了，观众说你变木了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "凭感觉踢",
        'hint': function(p,q){return g(q,'能力+2','能力-2');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x6,'text':"你说球是踢给人看的，不是给表格看的。那个赛季你进了十二个。"}:{'ovr':-0x2,'roleDelta':-0x1,'text':"第二年，热图更难看了。教练把你换到了他更放心的位置。"};
}
    }
  ]
},

{
  'id': "psych",
  'title': "去看心理医生",
  'icon': '🧠',
  'weight': 0x2d,
  'stage': "prime",
  'when': function(p){
return p["roleRank"]<=0x2;
},
  'desc': "连着几场丢球都跟你有关。你开始在赛前一晚醒着，数天花板。",
  'options': [
    {
        'label': "去谈谈",
        'hint': "花钱，能力+3",
        'apply': function(){
return{'money':-0x19,'ovr':0x3,'text':"她让你把每次失误写下来，写满一页就撕掉。三个月后，你能睡整觉了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "自己扛",
        'hint': function(p,q){return g(q,'扛过去了','越陷越深');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x1,'text':"某个早上醒来，忽然就没事了。你也说不清是怎么好的。"}:{'ovr':-0x3,'roleDelta':-0x1,'text':"你越想踢好，越踢不好。那一年，录像你一次都没敢回看。"};
}
    }
  ]
},

{
  'id': "body_mai"+"ntain",
  'title': "三十岁以后的身体",
  'icon': '🩺',
  'weight': 0x37,
  'stage': "vet",
  'desc': "队医给了两套方案。一套是保养着踢，一套是当没这回事。",
  'options': [
    {
        'label': "按方案保养",
        'hint': "少踢一些，能力+"+'3',
        'apply': function(){
return{'money':-0x28,'ovr':0x3,'roleDelta':-0x1,'text':"冷疗、按摩、忌口，一样不落。你少打了七八场，但四十岁那年，还在场上。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "当没这回事",
        'hint': function(p,q){return g(q,'硬扛住','伤病找上门');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x8,'text':"你还是场场首发。解说说，你是这支队伍最后一个老派球员。"}:{'ovr':-0x4,'text':"跟腱出了问题。医生说，这不是意外，是欠下的账，早晚要还。"};
}
    }
  ]
},

{
  'id': "vet_drop"+"back",
  'title': "往回撤",
  'icon': '🔙',
  'weight': 0x32,
  'stage': "vet",
  'when': function(p){
return "att"===p["posGroup"]||"mid"===p["posGroup"];
},
  'desc': "教练说你跑不动前场了，但脑子还在。他想让你后撤一条线。",
  'options': [
    {
        'label': "往后撤",
        'hint': "能力+3，地位回"+'升',
        'apply': function(){
return{'ovr':0x3,'roleDelta':0x1,'text':"你从抢点的人变成"+"了传球的人。数据"+"不好看了，球队赢"+"球多了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "我还能冲",
        'hint': function(p,q){return g(q,'再战两年','彻底掉队');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x1,'fame':0x6,'text':"你用两个赛季证明了自己还行。看台上，有人举着「别退」的牌子。"}:{'ovr':-0x4,'roleDelta':-0x2,'text':"你和二十四岁的人抢一个位置，抢了半年，输得很干净。"};
}
    }
  ]
},

{
  'id': "gk_penal"+'ty',
  'title': "点球大战",
  'icon': '🧤',
  'weight': 0x37,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "杯赛半决赛拖进点球大战。门将教练递来一张纸条，上面写着对方五个人的习惯方向。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "照纸条扑",
        'hint': function(p,q){return g(q,'扑出两个','全被骗了');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x19,'mult':{'cup':0x3},'text':"你连扑两个，第二个还在纸条之外的方向。教练说，那一下是你自己的。"}:{'fame':-0xa,'text':"五个人里，有四个改了主意。那张纸条，你后来收进包里，没扔。"};
}
    },
    {
        'p': function(p){return f(0.45,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "凭感觉",
        'hint': function(p,q){return g(q,'神扑','站着不动');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x16,'mult':{'cup':2.5},'text':"你赌了一个方向，"+"赌对了三次。全场"+"山呼海啸。"}:{'fame':-0x8,'ovr':-0x1,'text':"五个球，你一个方向都没蒙对。回放里的你，像一根木桩。"};
}
    }
  ]
},

{
  'id': "hat_tric"+'k',
  'title': "帽子戏法",
  'icon': '🎩',
  'weight': 0x32,
  'stage': "prime",
  'when': function(p){
return "att"===p["posGroup"]&&p["roleRank"]>=0x2;
},
  'desc': "上半场你已经进了两个。第三个球，看起来只是时间问题。",
  'options': [
    {
        'label': "接着抢点",
        'p': function(p){
return f(0.6,[[p["ovr"],0x44,0.007],[p["roleRank"],0x3,0.05]],0.35,0.85);
},
        'hint': function(p,q){
return g(q,'戴帽',"越位越到心态崩");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x14,'text':"第 78 分钟，你抢到了第三个。队友把球捡起来塞给你，让你签名。"}:{'fame':-0x5,'text':"下半场你六次越位。解说说，你眼里只剩下那个数字了。"};
}
    },
    {
        'label': "把球让出去",
        'hint': "队内关系+，名气"+'-',
        'apply': function(){
return{'roleDelta':0x1,'guanxi':0x8,'fame':-0x4,'text':"点球你让给了状态低迷的队长。更衣室里没人说话，但从那天起，没人再说你自私。"};
}
    }
  ]
},

{
  'id': "cn_bianz"+'hi',
  'title': "体育局的编制",
  'icon': '🧾',
  'weight': 0x30,
  'cn': !0x0,
  'stage': "youth",
  'desc': "省队给了个带编制的名额。工资不高，但一辈子有保障，代价是别再想随便转会。",
  'options': [
    {
        'label': "要编制",
        'hint': "钱稳，能力涨得慢",
        'apply': function(){
return{'money':0x3c,'ovr':-0x2,'guanxi':0xc,'bianzhi':!0x0,'text':"你爸松了一口气，说这下踏实了。你在同一块场地上练了好几年，再没人催你进步。"};
}
    },
    {
        'label': '不要',
        'hint': "能力+3，家里不"+'理解',
        'apply': function(){
return{'ovr':0x3,'guanxi':-0x6,'text':"你说，想去踢真正的比赛。那年过年，亲戚问你「有编制没」，你说没有。"};
}
    }
  ]
},

{
  'id': "cn_shiye",
  'title': "欠薪冲超",
  'icon': '🎢',
  'weight': 0x2e,
  'cn': !0x0,
  'when': function(p){
return p["clubRep"]<=0x2;
},
  'desc': "老板说，冲上去，什么都好说。全队三个月没发工资，还在加练。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "跟着拼",
        'hint': function(p,q){return g(q,'冲上去了','白干一年');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0xc,'money':0x5a,'mult':{'league':2.2},'text':"最后一轮客场绝杀"+"，全队在更衣室里"+"哭。工资是补发了"+"，只补了七成。"}:{'ovr':-0x1,
'money':-0x3c,'roleDelta':-0x1,'text':"差两分。老板当晚就飞去了国外。队里的人，第二天才知道。"};
}
    },
    {
        'label': "先保住自己",
        'hint': "能力+1，被当成"+'刺头',
        'apply': function(){
return{'ovr':0x1,'guanxi':-0xa,'roleDelta':-0x1,'text':"你去劳动仲裁递了材料。队友说你不讲义气，你说，讲义气的人上个月已经走了。"};
}
    }
  ]
},

{
  'id': "gk_sweep"+'er',
  'title': "出击还是守线",
  'icon': '🧤',
  'weight': 0x37,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "新教练要求防线压到中圈。你身后，是三十米无人区。",
  'options': [
    {
        'p': function(p){return f(0.65,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "练出击",
        'hint': function(p,q){return g(q,'能力+4','被吊射');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0x8,'text':"你把自己练成了半个后卫。解围的次数，比一些中卫还多。"}:{'ovr':-0x2,'fame':-0xa,'text':"有人在中线开始起脚。那个球在你头顶，飞了整整两秒。"};
}
    },
    {
        'label': "守好门线",
        'hint': "稳，地位小降",
        'apply': function(){
return{'roleDelta':-0x1,'ovr':0x1,'text':"你不出来。防线因此往回收了十米。教练在训练课上没点你的名，也没夸你。"};
}
    }
  ]
},

{
  'id': "gk_howle"+'r',
  'title': "黄油手",
  'icon': '🧴',
  'weight': 0x32,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "一脚软绵绵的远射，从你手里滑进了球门。全场三万人先是安静，然后笑了。",
  'options': [
    {
        'label': "赛后开发布会认了",
        'hint': "名气-，队内关系"+'+',
        'apply': function(){
return{'fame':-0xc,'guanxi':0xa,'roleDelta':0x1,'text':"你一个人坐在发布会上，说了十分钟。队长后来说，这事到此为止。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "什么也不说",
        'hint': function(p,q){return g(q,'下一场找回来','心态崩了');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x6,'text':"下一场，你扑出了两个必进球。没人再提上一场。"}:{'ovr':-0x3,'roleDelta':-0x2,'text':"接下来六场，你出球都不敢用脚。替补门将，开始热身了。"};
}
    }
  ]
},

{
  'id': "gk_distr"+"ibution",
  'title': "脚下活",
  'icon': '🦵',
  'weight': 0x34,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "教练把训练里的门"+"球全改成了短传。"+"你这个年纪重学脚"+"下技术，队里有人"+"看笑话。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "从头学",
        'hint': function(p,q){return g(q,'能力+5','送礼');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'text':"半年后，你的传球成功率排进了联赛前三。有人开始叫你「第十一个球员」。"}:{'ovr':-0x2,'fame':-0x8,'text':"一次横传，直接送到对方前锋脚下。那球至今还在各种集锦里。"};
}
    },
    {
        'label': "大脚开走",
        'hint': "无变化",
        'apply': function(){
return{'text':"你还是一脚开到中"+"线。教练摇头，但"+"没换你。"};
}
    }
  ]
},

{
  'id': "gk_numbe"+'r1',
  'title': "一号位",
  'icon': "1️⃣",
  'weight': 0x37,
  'when': function(p){
return'gk'===p["posGroup"]&&p["roleRank"]<=0x2;
},
  'desc': "队里签了个和你同龄的门将。教练说，「你们自己踢出来」。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "去抢",
        'hint': function(p,q){return g(q,'抢到主力','彻底出局');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x2,'ovr':0x3,'text':"热身赛你零封三场。名单出来那天，他先跟你握了手。"}:{'roleDelta':-0x2,'ovr':-0x1,'text':"他各方面都比你好一点。整整一年，你只在杯赛里出场。"};
}
    },
    {
        'label': "申请外租",
        'hint': "去小球队当主力",
        'apply': function(){
return{'leave':!0x0,'ovr':0x2,'text':"你去了一支保级队，场场首发。零封不多，但你至少还在踢球。"};
}
    }
  ]
},

{
  'id': "gk_line",
  'title': "门线上的那半个球",
  'icon': '📏',
  'weight': 0x2d,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "补时最后一刻，你把球从门线上捞了出来。边裁举旗，说进了。这个联赛没有门线技术，没有第二种答案。",
  'options': [
    {
        'label': "冲上去理论",
        'hint': "被罚，球迷买账",
        'apply': function(){
return{'banGames':0x2,'fame':0x10,'guanxi':-0xc,'text':"你追着边裁跑了三十米。红牌，停两场。你那张咆哮的照片，后来被做成了头像。"};
}
    },
    {
        'label': '认了',
        'hint': "关系+，心里憋着",
        'apply': function(){
return{'guanxi':0x8,'ovr':-0x1,'text':"你什么都没说。慢镜头里，那个球清清楚楚没进。没有人为此道歉。"};
}
    }
  ]
},

{
  'id': "gk_coach"+"_gone",
  'title': "门将教练走了",
  'icon': '🚶',
  'weight': 0x30,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "带了你六年的门将教练跟着主帅一起下课。新来的那个，只会安排体能。",
  'options': [
    {
        'label': "自费请他继续带",
        'hint': "花钱，能力+4",
        'apply': function(){
return{'money':-0x46,'ovr':0x4,'text':"每周两次，城郊一块租来的场地。他执意不收全款，说那部分算他的。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "跟着新教练",
        'hint': function(p,q){return g(q,'也挺好','手感全丢');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x1,'text':"新方法你居然适应了。身体确实比以前壮了一圈。"}:{'ovr':-0x3,'text':"一整年，没人给你喂过高球。半年后，你连球落下来该在哪儿起跳，都拿不准了。"};
}
    }
  ]
},

{
  'id': "gk_shoot"+"out_pen",
  'title': "门将罚点球",
  'icon': '🎯',
  'weight': 0x28,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "点球大战踢到第十一轮，轮到门将了。全场都在等你自己走上去。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "自己罚",
        'hint': function(p,q){return g(q,'罚进封神','罚丢背锅');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x1a,'ovr':0x2,'text':"你打了个正中间，对方门将扑向角落。这段画面，进了当年所有的年度盘点。"}:{'fame':-0x12,'roleDelta':-0x1,'text':"球被扑住了。你走回门前的三十米，转播镜头一秒都没离开。"};
}
    },
    {
        'label': "让给别人",
        'hint': "无变化",
        'apply': function(){
return{'text':"你摆摆手，让门将教练去跟主帅说。第十一个走上去的，是队里的后腰。"};
}
    }
  ]
},

{
  'id': "gk_old_k"+"eeper",
  'title': "三十六岁的门将",
  'icon': '⏳',
  'weight': 0x32,
  'stage': "vet",
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "门将比别的位置踢得久，这话你听了十年。今年你头一回觉得，球飞得比以前快了。",
  'options': [
    {
        'label': "再练两年",
        'hint': "花钱保养，能力+"+'3',
        'apply': function(){
return{'money':-0x32,'ovr':0x3,'text':"反应练不回来了，你把站位算得更准。有些球，你根本不需要扑。"};
}
    },
    {
        'label': "带年轻的那个",
        'hint': "地位降，队内关系"+'大涨',
        'apply': function(){
return{'roleDelta':-0x1,'guanxi':0x12,'fame':0x6,'text':"你把二十年攒下的东西，一样一样都给了他。他首发那天，你在替补席上比谁都紧张。"};
}
    }
  ]
},

{
  'id': "gk_corne"+"r_up",
  'title': "最后一分钟的角球",
  'icon': '🙌',
  'weight': 0x2e,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "补时第三分钟，落后一个球，最后一个角球。队友摆好球，回头朝你这边招了招手，全场三万人跟着一起喊。",
  'options': [
    {
        'label': "冲上去",
        'p': function(p){
return f(0.14,[[p["ovr"],0x4e,0.004]],0.06,0.3);
},
        'hint': function(p,q){
return g(q,"顶进去了","对方打空门");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x28,'mult':{'league':1.2,'cup':0x2},'text':"你顶进去了。你是那种一辈子只进一个球的人——可这个球，往后每一年的今天，都有人翻出来重发一遍。"}:{'ovr':-0x1,
'fame':-0x6,'text':"球被第一点解围，对方一脚长传，打向你身后空着的球门。你转身追了四十米，跑到一半，停了。"};
}
    },
    {
        'label': "留在自己半场",
        'hint': "无变化，也没人怪"+'你',
        'apply': function(){
return{'guanxi':0x4,'text':"你站在中线上看完了那个角球。终场哨响，全队都挤在禁区里，只有你一个人站在那边——也只有你，不用解释什么。"};
}
    }
  ]
},

{
  'id': "gk_last_"+"man",
  'title': "最后一个人",
  'icon': '🟥',
  'weight': 0x32,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "直塞打穿了整条防线，你已经冲出禁区，球比你想的快了半步。你只有零点几秒，决定用身上哪个部位去挡。",
  'options': [
    {
        'label': "用手把球摁下来",
        'hint': "红牌停一场，但这"+"一分保住了",
        'apply': function(){
return{'banGames':0x1,'guanxi':0xa,'fame':0x6,'text':"红牌。换人名额早用完了，队里那个后腰戴上你的手套，站了最后二十分钟。那场 0-0，你在通道口把全场听完。"};
}
    },
    {
        'label': "收手，赌他打不进",
        'p': function(p){
return f(0.42,[[p["ovr"],0x4c,0.01]],0.15,0.72);
},
        'hint': function(p,q){
return g(q,"他没打进","空门被推进");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0xe,'text':"他挑射，球擦着横梁飞出底线。你躺在地上笑出了声，队友一个个过来揉你的头。"}:{'ovr':-0x2,'fame':-0x8,'text':"他从你收回去的那只手边上推进了空门。回放里所有人都在问同一句：为什么不犯规？"};
}
    }
  ]
},

{
  'id': "gk_clean"+"_run",
  'title': "不失球的分钟数",
  'icon': '🔒',
  'weight': 0x30,
  'when': function(p){
return'gk'===p["posGroup"]&&p["roleRank"]>=0x3;
},
  'desc': "你已经七百多分钟没丢球，队史纪录是九百零三。下一轮对手是倒数第一，教练问你，要不要趁这场歇一歇。",
  'options': [
    {
        'label': "追这个纪录",
        'p': function(p){
return f(0.5,[[p["ovr"],0x4e,0.01]],0.2,0.8);
},
        'hint': function(p,q){
return g(q,'破了',"第八百分钟丢一个");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x16,'text':"第九百零四分钟，一记软绵绵的传中，你把它抱进怀里，整个看台站了起来。后来那个数字跟你的名字一起，刷在球场内墙上。"}:{'ovr':-0x1,'fame':-0x6,
'text':"第八百一十分钟，一次折射。你趴在地上，没有起来。广播念了比分，没有念那个数字。"};
}
    },
    {
        'label': "听教练的",
        'hint': "能力+1，关系+"+"，纪录停在这儿",
        'apply': function(){
return{'ovr':0x1,'guanxi':0xc,'text':"你在替补席上看完了那场，二号门将也零封了。纪录停在七百多分钟，之后没人再提，包括你自己。"};
}
    }
  ]
},

{
  'id': "gk_capta"+'in',
  'title': "戴袖标的门将",
  'icon': "🗣️",
  'weight': 0x2c,
  'when': function(p){
return'gk'===p["posGroup"]&&p["roleRank"]>=0x3&&p["seasonsA"+"tClub"]>=0x3&&p["ovr"]>=0x32+0x4*(p["clubRep"]||0x0)&&(p["capDone"]||[])["indexOf"](p["teamId"])<0x0;
},
  'desc': "老队长转会走了。教练把袖标递到你面前，更衣室里有人小声说：门将离得太远，喊不到人。",
  'options': [
    {
        'label': '戴上',
        'hint': "关系+，名气+，"+"锅也归你",
        'apply': function(){
return{'guanxi':0xe,'fame':0xa,'roleDelta':0x1,'ovr':-0x1,'captain':!0x0,'text':"你成了俱乐部历史上第二个戴袖标的门将。那个赛季，每一场输球后的发布会都是你去开的。能力一分没涨，可更衣室从此是你的。"};
}
    },
    {
        'label': "让给后腰",
        'hint': "能力+2，你只管"+"门里那块",
        'apply': function(){
return{'ovr':0x2,'guanxi':0x6,'capDecline':!0x0,'text':"你说自己在门里喊，比站在场上说管用。那一年，你少开了二十场发布会，多练了二十堂课。"};
}
    }
  ]
},

{
  'id': "gk_var_r"+"etake",
  'title': "VAR 说重罚",
  'icon': '📺',
  'weight': 0x2e,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "你把那个点球扑出去了，全场在喊你的名字。VAR 看了两分钟——你出线早了半只脚，重罚。",
  'options': [
    {
        'label': "还扑同一边",
        'p': function(p){
return f(0.34,[[p["ovr"],0x4e,0.009]],0.12,0.6);
},
        'hint': function(p,q){
return g(q,"又扑出来了","他改了边");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x1e,'mult':{'cup':0x2},'text':"同一个方向，同一个人，你又把球扑了出来。这一次，没有 VAR 再拦。解说喊到破了音。"}:{'ovr':-0x1,'fame':-0x6,
'text':"他换了边，球从你身后滚进去。你跪在草皮上很久，起来时，手套上沾满了白线的灰。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "先跟主裁磨两分钟",
        'hint': function(p,q){return g(q,'把他磨毛了','先吃张黄牌');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x1,'fame':0x10,'guanxi':-0x8,'text':"你拉着主裁说了两分钟，又走回去，把点球点的草皮踩了一遍。他罚飞了。有人说你无耻，你说，这是我的工作。"}:{'fame':-0x4,
'guanxi':-0xa,'text':"黄牌。他等你归位，不慌不忙地把球打进了死角。第二天专栏的标题是「小动作没能救他」。"};
}
    }
  ]
},

{
  'id': "gk_charg"+'e',
  'title': "他撞的是人不是球",
  'icon': '💥',
  'weight': 0x30,
  'cn': !0x0,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "角球。对方那个高中锋助跑起来，整个人撞进你怀里。你倒在门线上，主裁指了指中圈——进球有效。",
  'options': [
    {
        'label': "爬起来接着踢",
        'hint': "能力+2，关系+"+"，这笔账自己记着",
        'apply': function(){
return{'ovr':0x2,'guanxi':0x8,'text':"你什么也没说。那个赛季，这样的球你被撞了九次，判给你的只有一次。从那以后，你的落点判断总比旁人早半步——你得先算好，人是从哪儿来的。"};
}
    },
    {
        'label': "追着主裁问到底",
        'hint': "停赛，但球迷记住"+'了你',
        'apply': function(){
return{'banGames':0x2,'fame':0x10,'guanxi':-0xe,'text':"黄牌，你没停下。红牌。赛后你把倒地的那张照片发了出去，一个字没配，转发过了十万。"};
}
    }
  ]
},

{
  'id': "gk_nt_nu"+"mber1",
  'title': '国门',
  'icon': "🇨🇳",
  'weight': 0x34,
  'when': function(p){
return'gk'===p["posGroup"]&&p["caps"]>=0x5;
},
  'desc': "国家队三个门将里，你不是最年轻的，也不是身价最高的。世预赛前一周，主教练把你们三个叫到一起，说：这个位置，我只信一个人。",
  'options': [
    {
        'label': "去找他谈",
        'p': function(p){
return f(0.45,[[p["guanxi"],0x37,0.006],[p["ovr"],0x4c,0.01]],0.15,0.8);
},
        'hint': function(p,q){
return g(q,"三场都是你","三场都在替补席");
},
        'apply': function(p,q,s){
return d(q,s)?{'caps':0x6,'fame':0x12,'ovr':0x1,'text':"三场你都首发。第三场那次扑救被剪进了片头，整整用了一个周期。"}:{'fame':-0x6,'guanxi':-0x8,'text':"名单上你排第二。三场，你坐满九十分钟。赛后跟着大家去谢场，手套一次都没戴上。"};
}
    },
    {
        'label': "把话咽回去",
        'hint': "能力+3，名气-"+"，慢慢等",
        'apply': function(){
return{'ovr':0x3,'caps':0x1,'fame':-0x4,'text':"你每天比另外两个早到一小时。轮换那场你上了，就再没下来——只是等来那一刻，已经过去了两年。"};
}
    }
  ]
},

{
  'id': "gk_finge"+'rs',
  'title': '手指',
  'icon': '🩹',
  'weight': 0x2e,
  'when': function(p){
return'gk'===p["posGroup"];
},
  'desc': "训练里，一个球打在指尖上，你听见一声响。片子出来，是两根手指的韧带。医生给了两条路。",
  'options': [
    {
        'label': "做手术，歇三个月",
        'hint': "花钱，能力小降，"+"手是好的",
        'apply': function(){
return{'money':-0x3c,'ovr':-0x1,'roleDelta':-0x1,'text':"三个月，你只能用左手吃饭。回来第一堂课，第一个动作，你空手接了个高球——接住了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "用胶布绑起来接着"+'踢',
        'hint': function(p,q){return g(q,'撑过整个赛季','这两根手指废了');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0xa,'guanxi':0x8,'text':"整个赛季，你把那两根手指绑在一起。队医每场赛前缠一次，缠到后来，不用问你都知道是哪两根。"}:{'ovr':-0x4,'text':"那两根手指，后来再没完全伸直过。阴天下雨的时候你自己知道，别人看不出来。"};
}
    }
  ]
},

{
  'id': "def_offs"+"ide",
  'title': "造越位",
  'icon': '🚩',
  'weight': 0x37,
  'when': function(p){
return "def"===p["posGroup"];
},
  'desc': "教练要打高位防线。整条线的默契，只能一遍遍练——练错一次，就是单刀。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "带头练",
        'hint': function(p,q){return g(q,'能力+4','被打穿');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'roleDelta':0x1,'text':"一个赛季，造越位四十多次。对方前锋赛后说，跟你们踢球，像在猜谜。"}:{'ovr':-0x2,'fame':-0x8,'text':"有一场你慢了半步，全队被单刀了三次。赛后视频会上，暂停键停在你这帧。"};
}
    },
    {
        'label': "各防各的",
        'hint': "无变化",
        'apply': function(){
return{'text':"你按老办法回追。防线没被打穿，可也没人说这条线好。"};
}
    }
  ]
},

{
  'id': "def_aeri"+'al',
  'title': '头球',
  'icon': '🪖',
  'weight': 0x34,
  'when': function(p){
return "def"===p["posGroup"];
},
  'desc': "对手下半场全打高球，专冲你这一侧。想加练头球争顶，就得拿脖子和脑袋去换。",
  'options': [
    {
        'p': function(p){return f(0.75,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': '加练',
        'hint': function(p,q){return g(q,'能力+4','脑震荡');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'text':"定位球防守，你一个人管大半个禁区。角球进攻时，你也开始往前插了。"}:{'ovr':-0x3,'text':"一次争顶之后，你在场上站了十秒，才想起自己站在哪儿。队医不让你再上。"};
}
    },
    {
        'label': "让门将出来摘",
        'hint': "地位小降",
        'apply': function(){
return{'roleDelta':-0x1,'text':"门将替你摘了一年高球。后来他在采访里说：要是中卫能顶，他能少跑一半。"};
}
    }
  ]
},

{
  'id': "def_buil"+'d',
  'title': "后场出球",
  'icon': '🧱',
  'weight': 0x34,
  'when': function(p){
return "def"===p["posGroup"];
},
  'desc': "新体系要求中卫从禁区里把球带出来。对方前锋就在你三米外等着。",
  'options': [
    {
        'p': function(p){return f(0.65,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "按体系来",
        'hint': function(p,q){return g(q,'能力+5','送大礼');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x6,'text':"你成了球队第一出球点。有解说说，你踢得像个后腰。"}:{'ovr':-0x2,'fame':-0xc,'roleDelta':-0x1,'text':"禁区里被断过两次。那两次，都直接变成了失球。"};
}
    },
    {
        'label': "大脚解围",
        'hint': "稳，教练不满",
        'apply': function(){
return{'roleDelta':-0x1,'text':"你把球全往看台上招呼。安全，可战术板上的箭头，到你这儿就断了。"};
}
    }
  ]
},

{
  'id': "def_tact"+"ical_fou"+'l',
  'title': "战术犯规",
  'icon': '🟨',
  'weight': 0x32,
  'when': function(p){
return "def"===p["posGroup"];
},
  'desc': "对方反击起势，你身前只剩一片空地。教练在场边做了个「拉住他」的手势。",
  'options': [
    {
        'label': '拉住',
        'hint': "停赛 2 场，教"+"练认可",
        'apply': function(){
return{'banGames':0x2,'roleDelta':0x1,'guanxi':0x6,'fame':-0x4,'text':"你伸手一拽，黄牌。累积停两场，可那次反击，死在了中圈。教练过来，拍了拍你的后脑勺。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': '回追',
        'hint': function(p,q){return g(q,'追上了','丢球');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x8,'text':"你从三十米外追上去，在禁区前沿把球捅了出去。这个镜头，被放了一晚上。"}:{'fame':-0x6,'roleDelta':-0x1,'text':"你差半步。那球进了。赛后所有人都在说那个手势。"};
}
    }
  ]
},

{
  'id': "def_pace",
  'title': "追不上了",
  'icon': '🐢',
  'weight': 0x32,
  'stage': "vet",
  'when': function(p){
return "def"===p["posGroup"];
},
  'desc': "上一场，对方边锋从你身边过去时，你第一次觉得：那是另一种速度。",
  'options': [
    {
        'label': "改踢拖后中卫",
        'hint': "能力+3，靠脑子"+'吃饭',
        'apply': function(){
return{'ovr':0x3,'text':"你把位置往回撤了五米，用预判补速度。那个赛季，你的抢断数反而是生涯最高。"};
}
    },
    {
        'p': function(p){return f(0.45,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "硬扛速度",
        'hint': function(p,q){return g(q,'还行','被过成筛子');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x8,'ovr':0x1,'text':"你靠着经验和小动作，又扛了两个赛季。裁判没抓到你几次。"}:{'ovr':-0x4,'roleDelta':-0x2,'text':"对手开始专打你这一侧。有一场，你一个人被过了七次。"};
}
    }
  ]
},

{
  'id': "def_mars"+"hal",
  'title': "后防线的嘴",
  'icon': '📣',
  'weight': 0x30,
  'when': function(p){
return "def"===p["posGroup"]&&p["roleRank"]>=0x3;
},
  'desc': "这条防线上，没人说话。教练问你，愿不愿意当那个一直喊的人。",
  'options': [
    {
        'label': "喊起来",
        'hint': "能力+3，得罪人",
        'apply': function(){
return{'ovr':0x3,'roleDelta':0x1,'guanxi':-0x8,'text':"你从开场喊到终场，嗓子哑了半个赛季。有两个人被你这么喊过，再没跟你一起吃过饭。"};
}
    },
    {
        'label': "各扫门前雪",
        'hint': "无变化",
        'apply': function(){
return{'text':"防线还是各踢各的。丢球之后，大家互相看一眼，谁也不说话。"};
}
    }
  ]
},

{
  'id': "def_own_"+"box",
  'title': "禁区里那只手",
  'icon': '✋',
  'weight': 0x2d,
  'when': function(p){
return "def"===p["posGroup"];
},
  'desc': "角球混战里，球打在你手臂上。主裁没看见，VAR 在这个联赛还时灵时不灵。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "什么都不说",
        'hint': function(p,q){return g(q,'蒙过去','回放判点');
},
        'apply': function(p,q,s){
return d(q,s)?{'clean':-0x6,'text':"主裁摆手，示意继续。你回防时，没敢回头看大屏幕。"}:{'clean':-0x6,'fame':-0xa,'text':"VAR 叫停了比赛。点球，外加一张黄牌。你成了那晚输球的理由。"};
}
    },
    {
        'label': "自己举手承认",
        'hint': "清白+，球迷骂",
        'apply': function(){
return{'clean':0x8,'fame':-0x8,'guanxi':-0x6,'text':"你举了手。对方球员愣了一下。那场你们输了，球迷聊的全是你的名字。"};
}
    }
  ]
},

{
  'id': "def_full"+"back_pus"+'h',
  'title': "边后卫要不要压上",
  'icon': '↗️',
  'weight': 0x30,
  'when': function(p){
return "def"===p["posGroup"];
},
  'desc': "现在的边后卫，得跑满全场。教练说，你压上去，身后那块地，他来想办法。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "压上去",
        'hint': function(p,q){return g(q,'能力+4','身后被打穿');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0xa,'text':"一个赛季，你送出九次助攻。有人开始拿你跟欧洲那些边后卫比。"}:{'ovr':-0x2,'roleDelta':-0x1,'text':"你身后那块地，被打了一整年。教练最后把你挪到了另一侧。"};
}
    },
    {
        'label': "守好本职",
        'hint': "稳，能力+1",
        'apply': function(){
return{'ovr':0x1,'text':"你老老实实待在自"+"己那条线上。数据"+"不好看，丢球也确"+"实少。"};
}
    }
  ]
},

{
  'id': "mid_engi"+'ne',
  'title': "跑动数据",
  'icon': '📈',
  'weight': 0x37,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "体能教练把全队的跑动图贴在墙上。你那条线，停在中游偏下。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "跑到第一",
        'hint': function(p,q){return g(q,'能力+4','跑废了');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'roleDelta':0x1,'text':"你连续十场，每场跑满十二公里。教练说，有你在，这支队的中场就不会断。"}:{'ovr':-0x3,'text':"第二十七轮，你在一次无对抗的跑动里拉伤了大腿。那张图，后来被撤了下来。"};
}
    },
    {
        'label': "省着点跑",
        'hint': "能力+1，教练不"+'满',
        'apply': function(){
return{'ovr':0x1,'roleDelta':-0x1,'text':"你把力气留给带球那几下。跑动数据难看，可你那几脚传球，很关键。"};
}
    }
  ]
},

{
  'id': "mid_deep",
  'title': "往后撤一条线",
  'icon': '🔻',
  'weight': 0x34,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "队里前腰位置人满为患。教练问你，愿不愿意往后撤一步，改踢后腰。",
  'options': [
    {
        'label': "改位置",
        'hint': "能力+4，进球没"+'了',
        'apply': function(){
return{'ovr':0x3,'roleDelta':0x1,'fame':-0x6,'text':"你从进球的人，变成了让别人进球的人。数据难看，出场时间却翻了一倍。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': '不改',
        'hint': function(p,q){return g(q,'争到位置','板凳');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x8,'text':"你用两个赛季，证明了那个位置本来就该是你的。"}:{'roleDelta':-0x2,'text':"教练用了那个花大价钱买来的前腰。你在替补席上看了一年。"};
}
    }
  ]
},

{
  'id': "mid_setp"+"iece",
  'title': "定位球主罚权",
  'icon': '🎯',
  'weight': 0x32,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "队里的定位球一直是队长罚的。这赛季他状态下滑，训练课上，你罚出的每一脚都比他准。",
  'options': [
    {
        'p': function(p){return f(0.65,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "开口要",
        'hint': function(p,q){return g(q,'拿到','得罪人');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0xc,'text':"第一脚任意球就旋进死角。从那以后，角球、任意球，都归了你。"}:{'guanxi':-0xc,'roleDelta':-0x1,'text':"队长当着全队的面说：「你先把传球练准。」这句话你记了很多年。"};
}
    },
    {
        'label': "等他自己让",
        'hint': "无变化",
        'apply': function(){
return{'text':"你等了两年。他退役那天，把角旗区的位置，交给了另一个人。"};
}
    }
  ]
},

{
  'id': "mid_temp"+'o',
  'title': "节拍器",
  'icon': '🎼',
  'weight': 0x30,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "外教说，中场球员的通病是快慢不分：该慢的时候急，该快的时候磨。",
  'options': [
    {
        'label': "重学节奏",
        'hint': "能力+4，头半年"+'难看',
        'apply': function(){
return{'ovr':0x4,'fame':-0x5,'text':"他让你每场只做一"+"件事：抬头。半年"+"后你传球少了，但"+"每一脚都往前。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "按自己的来",
        'hint': function(p,q){return g(q,'也踢出来了','越踢越乱');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x6,'text':"你那套节奏在国内够用。出了国，才发现差着一截。"}:{'ovr':-0x2,'roleDelta':-0x1,'text':"你在中场丢球太多。外教没多说，把你挪去了边路。"};
}
    }
  ]
},

{
  'id': "mid_tack"+'le',
  'title': "抢断还是站位",
  'icon': '🦿',
  'weight': 0x30,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "你的抢断数联赛第二，犯规数联赛第一。分析师说，这两件事其实是同一件事。",
  'options': [
    {
        'label': "改成靠站位",
        'hint': "能力+3，观赏性"+'没了',
        'apply': function(){
return{'ovr':0x3,'fame':-0x6,'text':"你不再飞铲，改成提前站到那儿。集锦里没了你，球队少丢了六个球。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "继续飞",
        'hint': function(p,q){return g(q,'成为狠角色','累积停赛');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xe,'ovr':0x1,'text':"对方前腰赛前会专门研究你。这本身，就是一种战术价值。"}:{'banGames':0x3,'ovr':-0x1,'text':"一个赛季，十二张黄牌，两张红牌。三场关键战，你的名字不在名单上。"};
}
    }
  ]
},

{
  'id': "mid_long"+"ball",
  'title': "四十米转移",
  'icon': '🏹',
  'weight': 0x2d,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "你有一脚长传的本事，可教练的体系只要短传渗透，长传在他那儿叫「回避对抗」。",
  'options': [
    {
        'label': "藏起来",
        'hint': "能力+2，符合体"+'系',
        'apply': function(){
return{'ovr':0x2,'roleDelta':0x1,'text':"你把长传收进口袋，一个赛季只用了七次，七次全是机会。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "该传就传",
        'hint': function(p,q){return g(q,'被认可','被换下');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0xc,'text':"有一脚六十米转移，直接变成进球。教练什么也没说，也没再拦你。"}:{'roleDelta':-0x2,'text':"第三次长传出界，你被换下。第四次，没有机会了。"};
}
    }
  ]
},

{
  'id': "mid_box_"+"to_box",
  'title': "两个禁区之间",
  'icon': '↕️',
  'weight': 0x2d,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "教练要你既能插上，又能回防。这活儿在{league}，没几个人扛得了一整个赛季。",
  'options': [
    {
        'p': function(p){return f(0.75,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "接下来",
        'hint': function(p,q){return g(q,'能力+5','半程报销');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0xc,'text':"那个赛季你进了九个，抢断也在前十。队里人都在问，你是怎么练的。"}:{'ovr':-0x3,'text':"第十九轮，你倒在中圈，起不来。诊断写的是：疲劳性骨裂。"};
}
    },
    {
        'label': "只干一头",
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'text':"你专心做好防守那一半。教练在那个位置上，又买了个人做另一半。"};
}
    }
  ]
},

{
  'id': "mid_crea"+"tive_lea"+'sh',
  'title': "别冒险",
  'icon': '🔗',
  'weight': 0x2d,
  'when': function(p){
return "mid"===p["posGroup"];
},
  'desc': "录像会上，教练按下暂停：「这个球，横传。」你记得那一脚直塞，差点撕开整条防线。",
  'options': [
    {
        'label': "听他的",
        'hint': "地位+，能力-1",
        'apply': function(){
return{'roleDelta':0x1,'ovr':-0x1,'guanxi':0x6,'text':"你成了传球成功率最高的中场，也成了最不被人记住的那个。"};
}
    },
    {
        'p': function(p){return f(0.55,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "继续塞",
        'hint': function(p,q){return g(q,'成了球队大脑','坐板凳');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0xe,'text':"一个赛季，十一次助攻。后来教练在发布会上说，有些球，只有他敢传。"}:{'roleDelta':-0x2,'fame':-0x6,'text':"丢球太多。坐在替补席上，你想明白了一件事：这不是技术问题。"};
}
    }
  ]
},

{
  'id': "att_offb"+"all",
  'title': "无球跑动",
  'icon': '👟',
  'weight': 0x37,
  'when': function(p){
return "att"===p["posGroup"];
},
  'desc': "外教说，球在你脚下时你什么都会，球不在时，你什么都不做。",
  'options': [
    {
        'label': "从头练跑位",
        'hint': "能力+5，前半年"+"不进球",
        'apply': function(){
return{'ovr':0x3,'fame':-0x6,'text':"他让你每场只做一件事：在球到之前，先到。半个赛季没进球，之后进了十一个。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "等球来",
        'hint': function(p,q){return g(q,'还是那个样','被换位置');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x5,'text':"你还是那种拿球才踢的前锋。在国内够用，出去就不够。"}:{'roleDelta':-0x2,'ovr':-0x1,'text':"教练把你挪到边路，说那儿跑得少一点。"};
}
    }
  ]
},

{
  'id': "att_drou"+"ght",
  'title': "十场不进球",
  'icon': '🥀',
  'weight': 0x37,
  'when': function(p){
return "att"===p["posGroup"];
},
  'desc': "十场了。你每次拿球，看台上都有人叹气。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "加练射门",
        'hint': function(p,q){return g(q,'破荒','越练越死');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0xc,'text':"第十一场，你打进一个不算漂亮的球，跪在草地上，很久没起来。"}:{'ovr':-0x3,'roleDelta':-0x1,'text':"训练里你能进一百个，比赛里一个都进不了。教练换了首发。"};
}
    },
    {
        'label': "去干别的",
        'hint': "能力+2，进球更"+'少',
        'apply': function(){
return{'ovr':0x2,'fame':-0x6,'text':"你开始回撤接球，把球做给别人。助攻多了三次，进球还是零。"};
}
    }
  ]
},

{
  'id': "att_dive",
  'title': "禁区里那一下",
  'icon': '🎭',
  'weight': 0x32,
  'when': function(p){
return "att"===p["posGroup"];
},
  'desc': "后卫的手确实碰到了你，但还不至于倒。你在空中有半秒，可以决定。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "倒下去",
        'hint': function(p,q){return g(q,'判点','假摔被罚');
},
        'apply': function(p,q,s){
return d(q,s)?{'clean':-0x8,'fame':0x8,'mult':{'league':1.2},'text':"点球。你罚进了。慢镜头放出来以后，对方球迷给你起了个外号。"}:{'clean':-0x8,'fame':-0xe,
'banGames':0x1,'text':"主裁掏了黄牌，假摔。这张牌，让你在关键战停赛。"};
}
    },
    {
        'label': '站住',
        'hint': "清白+，机会没了",
        'apply': function(){
return{'clean':0x6,'fame':0x4,'text':"你踉跄两步，没倒，球也没了。解说说了句：「这球要是倒了，就是点球。」"};
}
    }
  ]
},

{
  'id': "att_pena"+"lty_take"+'r',
  'title': "点球归谁",
  'icon': '⚪',
  'weight': 0x30,
  'when': function(p){
return "att"===p["posGroup"]&&p["_captain"]!==p["teamId"];
},
  'desc': "队里的点球一直归队长。这赛季他罚丢两个，更衣室里开始有人议论。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': '去要',
        'hint': function(p,q){return g(q,'拿到主罚权','他翻脸');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xc,'ovr':0x2,'text':"接下来五个点球，你全部罚进。金靴榜上，你第一次进了前三。"}:{'guanxi':-0xa,'roleDelta':-0x1,'text':"他当着全队的面，把球从你手里拿走。那场之后，你们再没说过话。"};
}
    },
    {
        'label': '不争',
        'hint': "关系+",
        'apply': function(){
return{'guanxi':0xa,'text':"你说谁罚都行，进了就好。更衣室里，没人跟你红过脸。"};
}
    }
  ]
},

{
  'id': "att_numb"+"er9",
  'title': "九号球衣",
  'icon': "9️⃣",
  'weight': 0x2d,
  'when': function(p){
return "att"===p["posGroup"];
},
  'desc': "队里的九号退役了。这件球衣在这家俱乐部意味着什么，不用人说。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': '穿上',
        'hint': "名气大涨，压力也"+'大',
        'odds': ["扛住了","压垮了"],
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x16,'ovr':0x2,'text':"你穿着它进了二十个。已经有小孩，在球衣背后印你的名字。"}:{'fame':-0xc,'ovr':-0x2,'roleDelta':-0x1,'text':"半个赛季，七个球。看台上开始有人喊：「把九号还回来。」"};
}
    },
    {
        'label': "留着自己的号",
        'hint': "无变化",
        'apply': function(){
return{'text':"你说号码不重要。那件九号，在队里空了三年，没人敢要。"};
}
    }
  ]
},

{
  'id': "att_drop"+"deep",
  'title': "回撤拿球",
  'icon': '🔄',
  'weight': 0x2d,
  'when': function(p){
return "att"===p["posGroup"];
},
  'desc': "球队的进攻打不上来。教练想让你退到中场接球，再自己带上去。",
  'options': [
    {
        'label': "退到中场",
        'hint': "能力+4，进球少"+'一半',
        'apply': function(){
return{'ovr':0x4,'fame':-0x8,'text':"你成了球队的出球点，也成了不进球的中锋。教练很满意，记者不满意。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "守着禁区",
        'hint': function(p,q){return g(q,'等到了机会','一场碰不到球');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xa,'ovr':0x1,'text':"你一场只碰九次球，进了两个。有人管这个叫效率。"}:{'ovr':-0x1,'roleDelta':-0x1,'text':"整场比赛你触球十一次，其中六次，是开球。"};
}
    }
  ]
},

{
  'id': "att_head"+"er_targe"+'t',
  'title': "站桩中锋",
  'icon': '🗼',
  'weight': 0x2d,
  'when': function(p){
return "att"===p["posGroup"];
},
  'desc': "教练想把你练成支点：背身拿球，头球做球，牺牲你自己的机会。",
  'options': [
    {
        'label': "干这个脏活",
        'hint': "能力+4，队友受"+'益',
        'apply': function(){
return{'ovr':0x4,'guanxi':0xa,'fame':-0x5,'text':"一个赛季，你头球做球四十次，进球只有六个。边锋拿了金靴，赛后第一个来谢你。"};
}
    },
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "我要进球",
        'hint': function(p,q){return g(q,'进球更多','被弃用');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xe,'ovr':0x2,'text':"你进了十五个。教练承认，那套支点战术不适合你。"}:{'roleDelta':-0x2,'text':"你既没做球，也没进球。教练买了个真正的支点。"};
}
    }
  ]
},

{
  'id': "att_big_"+"game",
  'title': "大场面",
  'icon': '🎪',
  'weight': 0x30,
  'when': function(p){
return "att"===p["posGroup"]&&p["roleRank"]>=0x2;
},
  'desc': "有个说法跟了你几年：小场面你什么都行，大场面就找不到你。这次是决赛。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "自己扛",
        'hint': function(p,q){return g(q,'一战成名','坐实说法');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x1e,'mult':{'cup':0x3,'league':1.5},'text':"你进了两个。赛后记者提起那个说法，你说你不记得了。"}:{'fame':-0x12,'ovr':-0x2,
'text':"你被换下时是第 63 分钟。那个说法，从此变成了事实。"};
}
    },
    {
        'label': "踢简单点",
        'hint': "名气小涨，稳",
        'apply': function(){
return{'fame':0x6,'guanxi':0x6,'text':"你没做任何冒险动作，也没犯错。球队赢了，庆祝照片里，你站在最边上。"};
}
    }
  ]
},

{
  'id': "kid_heig"+'ht',
  'title': "个子不够",
  'icon': '📏',
  'weight': 0x3c,
  'stage': "kid",
  'desc': "选材表上，你的身高预测被划了一道。教练说得很直接：这个位置，你将来不好办。",
  'options': [
    {
        'label': "改练别的位置",
        'hint': "能力+2，认这个"+'现实',
        'apply': function(p){
return{'ovr':0x2,'text':h(p,{'gk':"你被挪出去踢了半"+"年后卫，别扭得要"+"命，最后还是回了"+"门里。那半年练出"+"来的脚下活，后来"+"成了你吃饭的东西"+'。','other':"你从中卫挪到了边"+"路。刚开始别扭了"+"小半年，后来发现"+"自己跑得比谁都快"+'。'})};
}
    },
    {
        'p': function(p){return f(0.5,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "不信这个邪",
        'hint': function(p,q){return g(q,'后来窜起来了','真没长');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'text':"十五岁那年，一个夏天你窜了十一公分。那张选材表，后来没人再提。"}:{'ovr':-0x2,'text':"十六岁，还是那个高度。有些位置的门，从那时候起，就关上了。"};
}
    }
  ]
},

{
  'id': "kid_pare"+"nts",
  'title': "家里不同意",
  'icon': '🏠',
  'weight': 0x3a,
  'stage': "kid",
  'cn': !0x0,
  'desc': "你妈把训练包藏了起来。她说这条路一万个人里出一个，你成绩又不差。",
  'options': [
    {
        'label': "听家里的，先顾学"+'习',
        'hint': "能力-3，家里安"+'心',
        'apply': function(){
return{'ovr':-0x3,'clean':0x5,'money':0x6,'text':"你停了两个月。回去时，同组的孩子已经在练新的东西了。"};
}
    },
    {
        'label': "跟家里吵一架",
        'hint': "能力+3，关系-",
        'apply': function(){
return{'ovr':0x3,'guanxi':-0x6,'text':"那天你摔了门。你爸后来没再说什么，只是每周六，照样送你去训练场。"};
}
    }
  ]
},

{
  'id': "kid_fee",
  'title': "这个月的训练费",
  'icon': '💴',
  'weight': 0x37,
  'stage': "kid",
  'cn': !0x0,
  'desc': "青训营涨价了。一年两万八，还不含比赛差旅。家里算了一晚上的账。",
  'options': [
    {
        'label': "咬牙交",
        'hint': "花钱，练得下去",
        'apply': function(){
return{'money':-0x1c,'ovr':0x2,'text':"你妈把那张卡递过去时，手很稳。后来你一次都没敢问，家里还剩多少。"};
}
    },
    {
        'label': "换个便宜的地方练",
        'hint': "省钱，条件差一档",
        'apply': function(){
return{'ovr':-0x2,'guanxi':-0x4,'text':"新地方场地是煤渣的，教练一个人带四十个孩子。可没人再提钱的事。"};
}
    }
  ]
},

{
  'id': "kid_bone",
  'title': '骨龄',
  'icon': '🦴',
  'weight': 0x34,
  'stage': "kid",
  'cn': !0x0,
  'desc': "赛前统一查骨龄。有个队友，前一晚被家长接走，再没回来。",
  'options': [
    {
        'label': "老老实实查",
        'hint': "清白+，稳",
        'apply': function(){
return{'clean':0x8,'text':"你的片子没问题。那个被接走的孩子，第二年出现在低一个年龄段的名单上。"};
}
    },
    {
        'label': "家里去打点一下",
        'hint': "关系+，清白-",
        'apply': function(){
return{'guanxi':0xa,'clean':-0xc,'ageFraud':!0x0,'text':"户口本上那个年份，改了两岁。这件事跟了你一辈子，虽然再没人查过。"};
}
    }
  ]
},

{
  'id': "kid_tryo"+'ut',
  'title': "省里来人挑苗子",
  'icon': '🔍',
  'weight': 0x38,
  'stage': "kid",
  'cn': !0x0,
  'desc': "省队来了两个人，在场边看了一下午，手里的本子一直没合上。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "使劲表现",
        'hint': function(p,q){return g(q,'被记下名字','用力过猛');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x5,'guanxi':0x6,'text':"散场时他们叫住你，问了名字和出生年月。回家路上，你一句话没说。"}:{'ovr':-0x1,'text':"你那天什么都想做，结果什么都没做成。本子上，没有你。"};
}
    },
    {
        'label': "照平常踢",
        'hint': "能力+1，稳",
        'apply': function(){
return{'ovr':0x1,'clean':0x3,'text':"你踢了平常的那一场。他们没找你，也没找别人 —— 那天，他们是来看另一个孩子的。"};
}
    }
  ]
},

{
  'id': "kid_yell"+'ow',
  'title': "教练家的酒",
  'icon': '🍶',
  'weight': 0x32,
  'stage': "kid",
  'cn': !0x0,
  'desc': "有家长张罗着给梯队教练送节礼，问你家凑不凑。不凑的话，名单上就你家没有。",
  'options': [
    {
        'label': "凑一份",
        'hint': "关系+，清白-，"+'花钱',
        'apply': function(){
return{'guanxi':0xc,'clean':-0x8,'money':-0xc,'text':"你爸把钱转过去时，说了句「随大流」。下一场，你首发。"};
}
    },
    {
        'label': '不凑',
        'hint': "清白+，上场时间"+'少',
        'apply': function(){
return{'clean':0x8,'ovr':-0x2,'text':"那半个赛季，你大多在场边。教练没为难你，只是也没想起你。"};
}
    }
  ]
},

{
  'id': "kid_move",
  'title': "跟着搬家",
  'icon': '🚚',
  'weight': 0x2e,
  'stage': "kid",
  'cn': !0x0,
  'desc': "你爸的工作调去了外地。两条路摆在面前：全家一起走，或者你一个人住进宿舍留下。",
  'options': [
    {
        'label': "一个人留下",
        'hint': "能力+3，早熟",
        'apply': function(){
return{'ovr':0x3,'guanxi':-0x5,'clean':0x4,'text':"十三岁，一个人洗球袜。想家的时候就多跑两圈，跑着跑着成了习惯。"};
}
    },
    {
        'label': "跟家里走",
        'hint': "换地方重练",
        'apply': function(){
return{'ovr':-0x2,'money':0xa,'text':"新城市的队伍没人认识你，只能从头排队。好在全家都在，饭是热的。"};
}
    }
  ]
},

{
  'id': "kid_matc"+'h',
  'title': "全国比赛",
  'icon': '🏅',
  'weight': 0x36,
  'stage': "kid",
  'cn': !0x0,
  'desc': "全国青少年赛，你一路闯进了决赛圈。对面那支队，年年都是冠军。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "自己扛一次",
        'hint': function(p,q){return g(q,'一战成名','被读死');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0x8,'text':h(p,{'gk':"你把那个单刀封在"+"了脚下，起来的时"+"候鼻血流了半张脸"+"。那段被人录下来"+"传到了网上，有人"+"在下面问这孩子是"+"哪的。",'other':"你连过三个人打进"+"的那球被人录下来"+"传到了网上。有人"+"在下面问这孩子是"+"哪的。"})}:{'ovr':-0x1,
'fame':0x2,'text':h(p,{'gk':"对面那个中锋比你"+"高一头。三个角球"+"，三个球都是他顶"+"进去的。",'other':"对面那个后卫比你"+"高一头。九十分钟"+"你被顶了九十分钟"+'。'})};
}
    },
    {
        'label': "跟着战术走",
        'hint': "能力+2，稳",
        'apply': function(){
return{'ovr':0x2,'guanxi':0x5,'text':"一比二输了，但你踢满了全场。更衣室里教练叫到你的名字，说的是好话。"};
}
    }
  ]
},

{
  'id': "kid_hurt",
  'title': "膝盖疼",
  'icon': '🩹',
  'weight': 0x30,
  'stage': "kid",
  'desc': "长身高的那阵子，膝盖一直隐隐作痛。队医说是生长痛，忍一忍就过去了。",
  'options': [
    {
        'p': function(p){return f(0.45,
[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "忍着练",
        'hint': "能力+2，但可能"+"落下病根",
        'apply': function(p,q,s){
return d(q,s)?{'ovr':-0x4,'text':"后来查出来是胫骨结节骨骺炎。整整一个赛季没踢，回来的时候，那批孩子已经跑到了前面。"}:{'ovr':0x2,'text':"疼了大半年，自己就好了。你到今天也说不清，那算不算运气。"};
}
    },
    {
        'label': "停下来养",
        'hint': "少练两个月",
        'apply': function(){
return{'ovr':-0x1,'clean':0x3,'text':"歇了两个月，老老实实做康复。回来的时候什么都没落下——除了那两个月。"};
}
    }
  ]
},

{
  'id': "kid_fore"+"ign",
  'title': "外教来了",
  'icon': "🗣️",
  'weight': 0x2c,
  'stage': "kid",
  'cn': !0x0,
  'desc': "青训营来了一位西班牙教练。他不看你能跑多快，只看你接球之前回不回头。",
  'options': [
    {
        'label': "按他说的改",
        'hint': "能力+3，先变难"+'看',
        'apply': function(){
return{'ovr':0x3,'text':"头三个月，你踢得比谁都别扭。到了第四个月，你在场上比别人早看见了那一步。"};
}
    },
    {
        'label': "还是按老办法",
        'hint': "稳，不冒险",
        'apply': function(){
return{'ovr':0x1,'guanxi':0x4,'text':"你守住了原来那套。他走的那天说，这里的孩子都很听话。"};
}
    }
  ]
},

{
  'id': "kid_poac"+'h',
  'title': "别人家的梯队",
  'icon': '📨',
  'weight': 0x2a,
  'stage': "kid",
  'cn': !0x0,
  'desc': "另一家俱乐部的人找上门来，说那边条件更好，让你现在就过去。",
  'options': [
    {
        'label': "离开",
        'hint': "能力+3，落个「"+"不讲义气」",
        'apply': function(){
return{'ovr':0x3,'guanxi':-0x8,'text':"新地方的场地是真的好。老教练在电话里只说了一句「以后好好踢」，就挂了。"};
}
    },
    {
        'label': '留下',
        'hint': "关系+，条件差一"+'档',
        'apply': function(){
return{'guanxi':0xa,'ovr':-0x1,'text':"你留下了。那家俱乐部两年后解散，当初来找你的那个人，再没露过面。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"language",
  'title': "听不懂",
  'icon': "🗣️",
  'weight': 0x3a,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "战术课四十分钟，你一句没听懂。散会时大家往一个方向跑，你跟着跑，跑到一半才发觉，跑错方向的只有你一个。",
  'options': [
    {
        'label': "晚上加两小时语言"+'课',
        'hint': "能力+3，花钱",
        'apply': function(){
return{'ovr':0x3,'money':-0x12,'clean':0x4,'text':"半年后，你听得懂教练在骂谁了。第一次听清他骂的是自己那天，你反而松了一口气。"};
}
    },
    {
        'label': "先靠看，靠模仿",
        'hint': "能力+1，慢一点"+"，但省钱",
        'apply': function(){
return{'ovr':0x1,'text':"你把每个人的跑位都刻在脑子里。语言是两年后才通的，可你早早就学会了看别人脚往哪儿指。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"host",
  'title': "寄宿家庭",
  'icon': '🏡',
  'weight': 0x37,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "俱乐部安排的那家人很客气，只是他们的饭菜你一口也吃不惯，每晚七点就熄灯。",
  'options': [
    {
        'label': "忍着，跟着他们过",
        'hint': "关系+，能力+1",
        'apply': function(){
return{'guanxi':0xa,'ovr':0x1,'clean':0x4,'text':"半年后，你能用他们的语言开玩笑。那位女主人后来每场主场比赛都来，总坐在同一个位置。"};
}
    },
    {
        'label': "申请搬去宿舍",
        'hint': "能力+2，一个人",
        'apply': function(){
return{'ovr':0x2,'guanxi':-0x6,'text':"宿舍里住着的，都是十三四岁、同样离家很远的孩子。谁也不问谁想不想家。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"paperwor"+'k',
  'title': "注册卡住了",
  'icon': '📄',
  'weight': 0x34,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "十八岁以下不能跨国转会，除非全家一起搬来。俱乐部的律师说，材料还差一样，那一样在国内要办三个月。",
  'options': [
    {
        'label': "家里想办法凑材料",
        'hint': "花钱，能踢上正式"+'比赛',
        'apply': function(){
return{'money':-0x23,'ovr':0x2,'guanxi':0x6,'text':"你爸辞了工作，过来待了半年。材料下来的当天他就飞回去了。他只在你第一场正式比赛的看台上，坐过那么一次。"};
}
    },
    {
        'label': "先只跟练，不注册",
        'hint': "能力-1，等",
        'apply': function(){
return{'ovr':-0x1,'clean':0x5,'text':"整整一年，你只能跟着练，比赛日就在场边帮忙捡球。那一年你把每个对手的习惯都看熟了，可数据表上，你一场都没有。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"release",
  'title': "夏天那张名单",
  'icon': '📋',
  'weight': 0x38,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "赛季一结束，公告栏贴出下赛季的梯队名单。同宿舍那个法国孩子看完，回房就开始收拾行李，一句话也没说。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "去问教练自己在不"+'在',
        'hint': function(p,q){return g(q,'得了句准话','被当成沉不住气');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'guanxi':0x8,'text':"他把你叫进办公室，说你今年留下，明年不一定。「所以你现在就该练明年的事。」"}:{'guanxi':-0x8,'ovr':-0x1,'text':"他说名单贴在外面。你走出办公室，听见他跟助教嘀咕了一句什么，语气不重，可那天晚上你一夜没睡着。"};
}
    },
    {
        'label': "自己去看，不问",
        'hint': "清白+，心里没底",
        'apply': function(){
return{'clean':0x6,'text':"你的名字在倒数第三行。那一年剩下的每堂训练课，你都跑在最前面。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"christma"+'s',
  'title': "回不去的那个春节",
  'icon': '🧧',
  'weight': 0x32,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "国内正放假，这边的赛程却排得正密。视频接通，一屋子人挤到镜头前，问的都是同一句：吃饱了没有。",
  'options': [
    {
        'label': "请假回去一趟",
        'hint': "花钱，落下训练",
        'apply': function(){
return{'money':-0x19,'ovr':-0x2,'guanxi':0x8,'text':"你在家待了九天。回来的时候，体能掉了一档。教练什么也没说，只是把你那组换到了后面。"};
}
    },
    {
        'label': '不回',
        'hint': "能力+2，心里那"+"块空着",
        'apply': function(){
return{'ovr':0x2,'guanxi':-0x4,'text':"那几天，基地里几乎没人。你一个人加练，把空场的灯开了又关。过了很多年你才肯承认，那是最难熬的一个星期。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"ageup",
  'title': "被叫去上一个年龄"+'段',
  'icon': '⬆️',
  'weight': 0x36,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "U15 缺人，教练问你，敢不敢跟大两岁的那批踢一场。对面那些人，个个比你高出一个头。",
  'options': [
    {
        'label': "就去",
        'p': function(p){
return f(0.5,[[p["ovr"],0x2d,0.02]],0.2,0.8);
},
        'hint': function(p,q){
return g(q,"站住了","被撞了九十分钟");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'guanxi':0x6,'text':h(p,{'gk':"你出了四次，有一"+"次是从人堆里把球"+"摘下来的。下场时"+"对面那个中锋拍了"+"拍你的头。",'other':"你踢了六十分钟，"+"丢了很多球，也赢"+"了三次。下场时那"+"个中卫拍了拍你的"+'头。'})+("从那以后你一直跟"+"着大一档的队练。")}:{'ovr':-0x2,
'text':"你被顶得半天起不来，第二次落地，手腕先着了地。养了六周，回来还是原来那一组。"};
}
    },
    {
        'label': "还是跟同龄的练",
        'hint': "能力+1，稳",
        'apply': function(){
return{'ovr':0x1,'clean':0x3,'text':"在同龄那批里，你是最好的几个之一。这件事让你安稳了一整年，也让你晚了一年才知道差距在哪。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"callhome",
  'title': "国内来的电话",
  'icon': '📞',
  'weight': 0x30,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "国内一家俱乐部的青训主管辗转找到你家，说回来就是重点培养，「在那边，你连注册都注册不上」。",
  'options': [
    {
        'label': '留下',
        'hint': "能力+2，家里担"+'着',
        'apply': function(){
return{'ovr':0x2,'money':-0xf,'guanxi':-0x5,'text':"你说，再给我两年。电话那头沉默了一会儿，说，好，那就两年。"};
}
    },
    {
        'label': "答应回去看看",
        'hint': "关系+，钱+，这"+"条路换了个方向",
        'apply': function(){
return{'guanxi':0xc,'money':0x14,'ovr':-0x2,'text':"你回去待了一个夏天。训练强度比那边低了一半，人人都认识你。飞回欧洲的飞机上，你一直在想，那个夏天算不算浪费。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"nickname",
  'title': "他们给你起的外号",
  'icon': '😐',
  'weight': 0x2e,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "更衣室里有人开始学你说话的腔调，笑声很大。带头的那个人，是队里最好的前锋。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "当场顶回去",
        'hint': function(p,q){return g(q,'被当成自己人','被孤立');
},
        'apply': function(p,q,s){
return d(q,s)?{'guanxi':0xc,'ovr':0x1,'text':"你刚学会的那几句脏话全用上了。满屋子都笑了，那个前锋第一个过来跟你撞拳。从那天起，你在更衣室有了自己的位置。"}:{'guanxi':-0xa,'ovr':-0x1,
'text':"屋里安静了几秒。后来再没人学你说话，也再没人跟你说话。"};
}
    },
    {
        'label': "在场上还回去",
        'hint': "能力+3，慢一点"+"，但是硬的",
        'apply': function(p){
return{'ovr':0x3,'guanxi':0x4,'text':"接下来三个月，分组对抗，你每次都要求分到他对面。"+h(p,{'gk':"第七次把他的射门"+"摁在地上的时候，"+"他没笑。",'other':"第七次把球从他脚"+"下捅走的时候，他"+"没笑。"})};
}
    }
  ]
},

{
  'id': "kid_abr_"+"money",
  'title': "家里那笔钱",
  'icon': '💸',
  'weight': 0x32,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "学费、住宿、来回机票，一年下来是笔不小的数。家里从不提，可转账记录上那几个零，你数得出来。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "跟俱乐部争取青训协议",
        'hint': function(p,q){return g(q,'减免大半','白问一场');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0x2d,'guanxi':0x6,'ovr':0x1,'text':"他们免了学费和住宿，条件是未来五年的优先签约权。签下去的时候，你还不知道那一条以后值多少钱。"}:{'guanxi':-0x4,
'text':"对方很客气地说，这个年龄段的孩子，他们有三十几个。你回去把原话告诉家里，家里说知道了，接着交。"};
}
    },
    {
        'label': "自己少花点",
        'hint': "钱+一点，别的什"+"么也没变",
        'apply': function(){
return{'money':0x8,'clean':0x5,'text':"你把每周的零花钱砍掉一半，球鞋穿到鞋钉磨平。这点省下来的钱，对家里那笔账几乎没有影响，可你需要自己做点什么。"};
}
    }
  ]
},

{
  'id': "kid_abr_"+"loanback",
  'title': "被借到下面那支队",
  'icon': '🚌',
  'weight': 0x2c,
  'stage': "kid",
  'when': function(p){
return!p["inChina"];
},
  'desc': "俱乐部说，同年龄段，你前面排着五个人。建议你去合作的小球会，踢一年真正的比赛。",
  'options': [
    {
        'label': "去，先踢上球",
        'hint': "能力+3，离一线"+"队远一点",
        'apply': function(){
return{'ovr':0x3,'guanxi':-0x4,'text':"那一年你踢满了三十场。场地是土的，看台从没坐满过。但那是你第一次每周都在踢球，而不只是每周都在训练。"};
}
    },
    {
        'label': "留下，跟这五个人"+'抢',
        'hint': "能力+1，赌一个"+'位置',
        'apply': function(){
return{'ovr':0x1,'guanxi':0x6,'text':"你留下了。整整一年，你坐在替补席上看那五个人踢，每堂训练课都拼到最后。第二年，走了三个。"};
}
    }
  ]
},

{
  'id': "youth_do"+'rm',
  'title': "宿舍熄灯以后",
  'icon': "🛏️",
  'weight': 0x37,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "同屋的几个人，每晚打游戏到凌晨两点。你六点半要出早操。",
  'options': [
    {
        'label': "自己去走廊睡",
        'hint': "能力+3，被叫怪"+'人',
        'apply': function(){
return{'ovr':0x3,'guanxi':-0x8,'text':"你抱着被子，在走廊尽头睡了三个月。他们叫你「圣人」，语气不太友善。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "跟着熬",
        'hint': function(p,q){return g(q,'合群','早操废了');
},
        'apply': function(p,q,s){
return d(q,s)?{'guanxi':0x8,'fame':0x3,'text':"那几个，后来成了你在这行最铁的朋友。有两个，第二年就回家了。"}:{'ovr':-0x2,'roleDelta':-0x1,'text':"连着两个月，早操你都垫底。教练说你眼睛里没有光。"};
}
    }
  ]
},

{
  'id': "youth_ex"+'am',
  'title': '中考',
  'icon': '📚',
  'weight': 0x34,
  'stage': "youth",
  'cn': !0x0,
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "文化课老师说，你还有希望考上普高。教练说，这个节骨眼上请假，就是放弃。",
  'options': [
    {
        'label': "回去考",
        'hint': "能力-2，多一条"+'路',
        'apply': function(){
return{'ovr':-0x2,'degree':!0x0,'clean':0x4,'text':"你请了六周假。考上了，也确确实实落下了一个夏天的训练。"};
}
    },
    {
        'label': "不考了",
        'hint': "能力+3，没有退"+'路',
        'apply': function(){
return{'ovr':0x3,'text':"那个夏天，你是在训练场上过完的。班主任后来发来一条短信，你没有回。"};
}
    }
  ]
},

{
  'id': "youth_co"+"ach_fav",
  'title': "教练的心头肉",
  'icon': '🫶',
  'weight': 0x32,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "梯队教练明显偏爱另一个孩子：新位置先让他试，输了球从不挨骂。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "找教练谈",
        'hint': function(p,q){return g(q,'被看见','被记恨');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x2,'ovr':0x2,'text':"他愣了一下，说没想到你会来说这个。下一场，你首发。"}:{'roleDelta':-0x2,'guanxi':-0xa,'text':"他说，年轻人要沉住气。从那以后，你连替补名单都进得少了。"};
}
    },
    {
        'label': "用球说话",
        'hint': "能力+3，慢",
        'apply': function(){
return{'ovr':0x3,'text':"整整两年，你把训练赛当正赛踢。教练换人的那天，你的名字排在第一个。"};
}
    }
  ]
},

{
  'id': "youth_fi"+"rst_cont"+"ract",
  'title': "第一份职业合同",
  'icon': '✒️',
  'weight': 0x3a,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "俱乐部把合同放在"+"桌上：五年，工资"+"很低，违约金写得"+"很高。",
  'options': [
    {
        'label': "签字",
        'hint': "钱少，位置稳",
        'apply': function(){
return{'money':0x1e,'roleDelta':0x1,'text':"你爸妈坐在旁边，一直点头。你后来才知道，那个违约金意味着什么。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "让家里找人看看",
        'hint': function(p,q){return g(q,'改好了','俱乐部翻脸');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0x3c,'clean':0x4,'text':"违约金砍掉一半，年限缩到三年。经理签字的时候，脸色不好看。"}:{'roleDelta':-0x2,'guanxi':-0xa,'text':"俱乐部说，不签就先下二队。你在二队待了一年半。"};
}
    }
  ]
},

{
  'id': "youth_ag"+"ent",
  'title': "第一个经纪人",
  'icon': '🤝',
  'weight': 0x34,
  'stage': "youth",
  'when': function(p){
return p["inChina"];
},
  'desc': "有人在训练场外等你，说能把你送出国，条件是先签五年的独家。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "签字",
        'hint': function(p,q){return g(q,'真有门路','被套牢');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x8,'text':"他确实带你去了两次海外试训。虽然没成，可你知道了差距在哪里。"}:{'money':-0x28,'roleDelta':-0x1,'text':"五年里，他只做了一件事：拦下所有别人递给你的机会。"};
}
    },
    {
        'label': '不签',
        'hint': "无变化",
        'apply': function(){
return{'text':"你说要先问问家里。他留下张名片，后来再没出现过。"};
}
    }
  ]
},

{
  'id': "youth_lo"+"an_lower",
  'title': "借去中乙",
  'icon': '🚌',
  'weight': 0x32,
  'stage': "youth",
  'when': function(p){
return p["inChina"];
},
  'desc': "俱乐部想把你租到中乙踢一年。那边条件差得可以，但一整年你都能有球踢。",
  'options': [
    {
        'label': "就去",
        'hint': "能力+5，苦",
        'apply': function(){
return{'ovr':0x3,'money':-0xa,'fame':0x4,'text':"客场十小时大巴，看台是水泥台阶。二十八场踢完，成人比赛的节奏，已经长在了你身上。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "留在梯队",
        'hint': function(p,q){return g(q,'熬出头','白熬');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'roleDelta':0x1,'text':"你在预备队联赛打满一整年。年底，一线队的名单里有了你的名字。"}:{'ovr':-0x1,'roleDelta':-0x1,'text':"预备队一年到头，打不了十场球。二十岁那年，你还没踢过一场正式比赛。"};
}
    }
  ]
},

{
  'id': "youth_tr"+"ial_abro"+'ad',
  'title': "海外试训",
  'icon': '🎫',
  'weight': 0x30,
  'stage': "youth",
  'when': function(p){
return p["inChina"]&&p["inAcadem"+'y'];
},
  'desc': "有个去欧洲试训的机会：中游俱乐部，两周。机票和食宿，自己掏。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "砸锅卖铁去",
        'hint': function(p,q){return g(q,'眼界大开','白跑');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':-0x32,'ovr':0x4,'fame':0x6,'text':"两周过去，一份合同没拿到。可你第一次看清，同龄人能把球跑成什么样。回来以后，你练得像换了个人。"}:{'money':-0x32,
'ovr':-0x1,'text':"两周里你只上了三次分组对抗，其余时间都泡在健身房。回程的飞机上，你一路没说话。"};
}
    },
    {
        'label': '不去',
        'hint': "无变化",
        'apply': function(){
return{'text':"这笔钱，家里凑不出来。同去的那个孩子，后来去了荷兰。"};
}
    }
  ]
},

{
  'id': "youth_he"+"ight",
  'title': "身高不够",
  'icon': '📐',
  'weight': 0x2d,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "选材表上，你的名字被划了一道：身高预测不达标。有人建议打生长激素。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "打激素",
        'hint': function(p,q){return g(q,'长起来了','出问题');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'clean':-0xa,'money':-0x28,'text':"两年后，你长到了一米八三。那两年的每一针，你都记得当时的疼。"}:{'ovr':-0x3,'clean':-0xe,'money':-0x28,
'text':"个子没怎么长，体检倒查出了别的问题。那盒药，你后来自己扔了。"};
}
    },
    {
        'label': '不打',
        'hint': "能力+2，靠别的"+'吃饭',
        'apply': function(){
return{'ovr':0x2,'clean':0x4,'text':"你把重心、启动和"+"脑子练到了极致。"+"教练说你是队里最"+"不像小个子的小个"+'子。'};
}
    }
  ]
},

{
  'id': "aca_rese"+"rve",
  'title': "预备队联赛",
  'icon': '🪑',
  'weight': 0x3a,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "预备队的比赛排在周二下午。看台上坐着二十来个人，一半球探，一半是队友的家人。你踢得很好，只是，没有集锦。",
  'options': [
    {
        'label': "每场都当正赛踢",
        'hint': "能力+3，没人看"+'见',
        'apply': function(p){
return{'ovr':0x3,'clean':0x4,'text':"整个赛季你一场没"+'缺，'+h(p,{'gk':"零封了十一场",'def':"那条防线一共只丢"+"了九个",'other':"进了十四个"})+("。年底俱乐部的官"+"网做了个盘点，没"+"有提到预备队。")};
}
    },
    {
        'label': "把力气留给训练课",
        'hint': "能力+1，一线队"+"教练那边看得见",
        'apply': function(){
return{'ovr':0x1,'guanxi':0x8,'text':"合练那天你拼得最凶。一线队助教在场边多站了十分钟，临走时回头问了一句：你多大了？"};
}
    }
  ]
},

{
  'id': "aca_sign"+'ed',
  'title': "同批人签走了一个",
  'icon': '✒️',
  'weight': 0x38,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "跟你同一年进队的那个孩子，今天签了职业合同。更衣室里闹哄哄的，全在起哄。你比他，早两年进队。",
  'options': [
    {
        'label': "去恭喜他",
        'hint': "关系+，心里那关"+"自己过",
        'apply': function(){
return{'guanxi':0xa,'clean':0x5,'text':"你是第一个上去抱他的。那天晚上，你一个人在健身房待到很晚，谁也没理。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "去找教练问自己",
        'hint': function(p,q){return g(q,'得了句实话','被记成沉不住气');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'guanxi':0x6,'text':"他给你看了评估表：三项比他高，两项比他低，低的那两项旁写着「可练」。「所以你还在这儿。」"}:{'guanxi':-0xa,'text':"他说这种事不是你该问的。往后半年，合练名单上再没有你。"};
}
    }
  ]
},

{
  'id': "aca_newc"+"oach",
  'title': "教练组换了一茬",
  'icon': '🔁',
  'weight': 0x36,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "带了你三年的青训教练走了。新教练第一堂课，把所有人打散重分。他不知道你是谁。",
  'options': [
    {
        'label': "从头证明一次",
        'hint': "能力+2，累",
        'apply': function(){
return{'ovr':0x2,'guanxi':-0x4,'text':"你把三年前做过的事，又做了一遍。两个月后，他第一次在训练课上叫你的名字——念错了姓。"};
}
    },
    {
        'label': "托老教练打个招呼",
        'hint': "关系+，能力-1",
        'apply': function(){
return{'guanxi':0xc,'ovr':-0x1,'clean':-0x4,'text':"老教练真的打了那通电话。新教练很客气，把你放进了第一组，然后整整一个赛季，再没多看你一眼。"};
}
    }
  ]
},

{
  'id': "aca_gym",
  'title': "力量房的那两年",
  'icon': "🏋️",
  'weight': 0x34,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "体能测试的报告出来：技术合格，对抗不合格。体能教练给你排了一份两年的增重计划——「练完，你才踢得了成年队的比赛。」",
  'options': [
    {
        'label': "照着练两年",
        'p': function(p){
return f(0.62,[[p["ovr"],0x30,0.012]],0.3,0.85);
},
        'hint': function(p,q){
return g(q,"身体撑起来了","光长肉没长力量");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'text':"两年后你重了九公斤，短距离反而更快。第一次跟成年队合练，你没有被撞开。"}:{'ovr':-0x1,'text':"重了七公斤，转身慢了半拍。那半拍，你找了半年才找回来。"};
}
    },
    {
        'label': "先保住灵活",
        'hint': "能力+1，成年队"+"那关往后拖",
        'apply': function(){
return{'ovr':0x1,'text':"你按自己的节奏来。技术教练点头，体能教练在报告上又写下一次「对抗不合格」。"};
}
    }
  ]
},

{
  'id': "aca_demo"+'te',
  'title': "被放回低一档",
  'icon': '⬇️',
  'weight': 0x32,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "U21 名单贴出来，没有你。你被放回低一个年龄段，同组的都比你小两岁，对你客气得像在招待客人。",
  'options': [
    {
        'label': "在那儿当最好的那"+'个',
        'hint': "能力+2，位置低",
        'apply': function(p){
return{'ovr':0x2,'fame':0x4,'text':h(p,{'gk':"半个赛季你只丢了"+"三个球。所有人都"+"说这不算数，但把"+"你叫回 U21 "+"的那份名单上写的"+"就是这个三。",'def':"半个赛季那条防线"+"只丢了三个球。所"+"有人都说这不算数"+"，但把你叫回 U"+"21 的那份名单"+"上写的就是这个三"+'。','other':"半个赛季你进了十"+"九个球。所有人都"+"说这不算数，但把"+"你叫回 U21 "+"的那份名单上写的"+"就是这十九个。"})};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "申请跟一线队练",
        'hint': function(p,q){return g(q,'被留下','被当成不懂事');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'guanxi':0x6,'text':"他们让你去当了三周陪练。三周里你没碰到几个球，可你终于知道，那个速度是什么样。"}:{'guanxi':-0x8,'ovr':-0x1,'text':"回复只有一句：「先把该踢的踢好。」那句话贴在你脑子里，两年没揭下来。"};
}
    }
  ]
},

{
  'id': "aca_benc"+"h_firstt"+"eam",
  'title': "一线队的替补名单",
  'icon': '📝',
  'weight': 0x30,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "杯赛轮换，一线队缺人，你进了替补名单。整场坐到第 91 分钟，热身衣脱了又穿上，穿了又脱，三次。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "赛后去找主帅要一"+'句话',
        'hint': function(p,q){return g(q,'记住了你','什么也没发生');
},
        'apply': function(p,q,s){
return d(q,s)?{'guanxi':0xc,'ovr':0x2,'text':"他只说了句「下次」。那两个字你嚼了一整个夏天。第二年，它真的兑现了。"}:{'guanxi':-0x4,'text':"他正被记者围着，经过你身边时，点了一下头。你不确定，那一下是不是点给你看的。"};
}
    },
    {
        'label': "什么也不说，回去"+'练',
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'clean':0x4,'text':"第二天，你第一个到基地。没有人看见，但那一年，你的体能数据是全梯队第一。"};
}
    }
  ]
},

{
  'id': "aca_fami"+"ly_call",
  'title': "家里问什么时候签",
  'icon': '📱',
  'weight': 0x2e,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "又一年过去。电话里，家里没直说，只问一句「今年有消息吗」。你说快了。挂断之后，你在楼道里站了很久。",
  'options': [
    {
        'label': "再给自己一年",
        'hint': "能力+2，家里那"+"头先扛着",
        'apply': function(){
return{'ovr':0x2,'money':-0xc,'text':"你没说，自己已经是队里年纪最大的一档。第二年，你把每一堂训练课，都当成最后一堂来练。"};
}
    },
    {
        'label': "开始联系别的出路",
        'hint': "关系+，心散了一"+'点',
        'apply': function(){
return{'guanxi':0xa,'ovr':-0x1,'text':"你托人问了几家低级别球队。消息还没回来，那几个礼拜，你训练时总在走神。"};
}
    }
  ]
},

{
  'id': "aca_abr_"+"alone",
  'title': "宿舍楼空了",
  'icon': '🌃',
  'weight': 0x34,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){
return p["inAcadem"+'y']&&!p["inChina"];
},
  'desc': "赛季间歇，本地孩子都回家了。整栋青训公寓，只剩你和一个尼日利亚人。食堂只开一个窗口。",
  'options': [
    {
        'label': "两个人一起加练",
        'hint': "能力+3，关系+",
        'apply': function(){
return{'ovr':0x3,'guanxi':0x6,'text':"你们自己打开训练场的灯，一直练到管理员来赶人。很多年后他在另一个联赛踢球，还会给你发消息。"};
}
    },
    {
        'label': "把这几天用来休息",
        'hint': "能力+1，身体缓"+'过来',
        'apply': function(){
return{'ovr':0x1,'clean':0x4,'text':"你睡了三天。然后一个人坐火车去看海。回来的那天，你觉得还能再熬一年。"};
}
    }
  ]
},

{
  'id': "aca_abr_"+"visa",
  'title': "满十八岁那道关",
  'icon': '🛂',
  'weight': 0x32,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y']&&!p["inChina"];
},
  'desc': "满十八岁那年，要重新办工作许可。条件里有一条：国家队出场纪录——而你一场都没有。俱乐部的法务说，只能走特殊人才那条路，材料摞得很厚。",
  'options': [
    {
        'label': "俱乐部替你申请",
        'hint': "关系+，欠了人情",
        'apply': function(){
return{'guanxi':0xa,'ovr':0x1,'clean':-0x4,'text':"他们真的替你办了，代价是合同年限又延了两年。签合同的时候，你身边没有律师。"};
}
    },
    {
        'label': "先去邻国那支合作"+'球会',
        'hint': "能力+2，绕了一"+'圈',
        'apply': function(){
return{'ovr':0x2,'guanxi':-0x4,'text':"你去了邻国的二级联赛，那边不卡这条。一年后回来，身份问题解决了，人也大了一岁。"};
}
    }
  ]
},

{
  'id': "aca_cn_s"+"tuck",
  'title': "梯队里的老队员",
  'icon': '🧊',
  'weight': 0x34,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){
return p["inAcadem"+'y']&&p["inChina"];
},
  'cn': !0x0,
  'desc': "梯队里比你小三岁的孩子，已经去跟一线队合练了，而你还在这儿。队里人管你叫「老人」——那不是好话。",
  'options': [
    {
        'label': "找人问问能不能走",
        'hint': "关系+，可能走成",
        'apply': function(){
return{'guanxi':0xc,'ovr':-0x1,'money':-0xf,'text':"托的人说会留意。半年里来了两回消息：一回是中乙，一回是没了下文。"};
}
    },
    {
        'label': "闷头再练一年",
        'hint': "能力+3",
        'apply': function(){
return{'ovr':0x3,'clean':0x5,'text':"你把那句「老人」当成每天起床的理由。那一年你的数据是梯队里最好的，名单上，依然没有你。"};
}
    }
  ]
},

{
  'id': "aca_cn_s"+"chool",
  'title': "回去读书还来得及",
  'icon': '🎓',
  'weight': 0x30,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y']&&p["inChina"];
},
  'cn': !0x0,
  'desc': "同批被刷掉的几个都回了学校，其中一人考上了体育院校。家里把那条消息转给你，后面附了一句：「你自己想想。」",
  'options': [
    {
        'label': "白天练，晚上补课",
        'hint': "能力+1，多一条"+'退路',
        'apply': function(){
return{'ovr':0x1,'degree':!0x0,'money':-0x14,'text':"你两头都占着，两头都不够好。可很多年后，你庆幸自己留了那条路。"};
}
    },
    {
        'label': "只走这一条路",
        'hint': "能力+3，没有别"+"的可想",
        'apply': function(){
return{'ovr':0x3,'clean':0x4,'text':"你把课本收进箱子，塞到床底。那之后，训练场上没人比你到得更早。"};
}
    }
  ]
},

{
  'id': "cn_youth"+"_fix",
  'title': "青年赛的默契球",
  'icon': '🤫',
  'weight': 0x30,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "最后一轮，两队心里都清楚：踢平，一起出线。赛前，领队把两边的队长叫到了一处。",
  'options': [
    {
        'label': "跟着走",
        'hint': "清白重创，一起出"+'线',
        'apply': function(){
return{'clean':-0x12,'roleDelta':0x1,'fixed':!0x0,'text':"全场没有一次射门。看台上，一位家长站起来骂了一句，被保安请了出去。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "自己踢自己的",
        'hint': function(p,q){return g(q,'被记住','被孤立');
},
        'apply': function(p,q,s){
return d(q,s)?{'clean':0x8,'ovr':0x3,'fame':0x8,'text':"第 80 分钟，你当着两边所有人的面，拼了一次全力。那场之后，有支职业队的球探记下了你的名字。"}:{'clean':0x8,'guanxi':-0x10,
'roleDelta':-0x2,'text':"球没进，队伍出局。回程的大巴上，没人跟你坐一排。"};
}
    }
  ]
},

{
  'id': "cn_hukou",
  'title': '户口',
  'icon': "🗂️",
  'weight': 0x2d,
  'cn': !0x0,
  'stage': "youth",
  'when': function(p){
return p["inAcadem"+'y'];
},
  'desc': "外省来的孩子，在这边不能参加注册赛。有人说，可以「办一下」。",
  'options': [
    {
        'label': "办一下",
        'hint': "花钱，能踢比赛",
        'apply': function(){
return{'money':-0x46,'clean':-0xa,'guanxi':0xa,'ovr':0x3,'text':"手续走了半年。材料上那个出生地，不是你真出生的地方。你终于能上场了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "等政策",
        'hint': function(p,q){return g(q,'等到了','耽误两年');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x1,'clean':0x4,'text':"第二年，注册办法改了。你赶上了末班车。"}:{'ovr':-0x3,'roleDelta':-0x1,'text':"你在场边看了两年球。等到能报名时，同届的早都上一线队了。"};
}
    }
  ]
},

{
  'id': "buyout_c"+"lause",
  'title': "解约金条款",
  'icon': '📝',
  'weight': 0x34,
  'stage': "prime",
  'desc': "续约文本里有一条解约金条款。经纪人说，数字写低些，将来好走。",
  'options': [
    {
        'label': '写低',
        'hint': "工资少些，好脱身",
        'apply': function(){
return{'money':-0x3c,'lockAbroad':0x0,'ovr':0x1,'text':"俱乐部答应了，代价是工资折了一截。两年后，真有人按那个数字把你买走了。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "要高工资",
        'hint': function(p,q){return g(q,'值','被卡死');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0xc8,'text':"你拿到了队里第二"+"高的工资，踏踏实"+"实踢了三年。"}:{'money':0xc8,'roleDelta':-0x1,'lockAbroad':0x2,'text':"工资是高，可那个天价解约金，让每个来问价的球队都掉头走了。"};
}
    }
  ]
},

{
  'id': "media_tr"+"aining",
  'title': "媒体培训",
  'icon': "🎙️",
  'weight': 0x30,
  'stage': "prime",
  'desc': "俱乐部请了人来教球员面对镜头：少说话、说套话、别接情绪。",
  'options': [
    {
        'label': "认真学",
        'hint': "名气稳，人变闷",
        'apply': function(){
return{'fame':-0x4,'guanxi':0xa,'clean':0x4,'text':"从此，你的采访没一句能上标题。俱乐部很满意，记者见你就绕道走。"};
}
    },
    {
        'p': function(p){return f(0.55,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "有话直说",
        'hint': function(p,q){return g(q,'圈粉','惹祸');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x14,'text':"你那句「我们踢得不配拿工资」，当晚被顶上了热门榜第七。球迷说，这队总算有个说人话的。"}:{'fame':0x8,'guanxi':-0xe,'money':-0x1e,'text':"俱乐部内部通报批评，罚了你三十万。领队说你不懂事。"};
}
    }
  ]
},

{
  'id': "boot_dea"+'l',
  'title': "球鞋合同",
  'icon': '👞',
  'weight': 0x32,
  'stage': "prime",
  'desc': "两家品牌找上门：一家钱多，鞋却不合脚；一家钱少，但按你的脚做楦。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': '要钱',
        'hint': function(p,q){return g(q,'没事','脚伤');
},
        'odds': ["脚没事","脚废了"],
        'apply': function(p,q,s){
return d(q,s)?{'money':0xb4,'fame':0x8,'text':"你穿着那双不太跟脚的鞋踢了三年，钱进了账。"}:{'money':0xb4,'ovr':-0x3,'text':"跖骨疲劳性骨折。医生的第一句话，是问你的鞋码。"};
}
    },
    {
        'label': "要定制",
        'hint': "钱少，能力+2",
        'apply': function(){
return{'money':0x28,'ovr':0x2,'text':"他们给你做了六双楦头不同的鞋。那两年，你一次脚伤都没犯过。"};
}
    }
  ]
},

{
  'id': "play_inj"+"ured",
  'title': "带伤上阵",
  'icon': '💉',
  'weight': 0x37,
  'stage': "prime",
  'repeat': 0x2,
  'desc': "关键战前一天，队医说：打一针就能上，但赛季可能就交代了。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "打针上场",
        'hint': function(p,q){return g(q,'英雄','赛季报销');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x14,'roleDelta':0x1,'mult':{'league':1.4},'text':"你踢满九十分钟。赛后，被人架着走出更衣室。那场球，赢了。"}:{'ovr':-0x5,'roleDelta':-0x1,
'text':"第 26 分钟，你自己倒下了。半月板。赛季，到此为止。"};
}
    },
    {
        'label': '不上',
        'hint': "关系-，身体保住",
        'apply': function(){
return{'guanxi':-0xa,'roleDelta':-0x1,'ovr':0x1,'text':"你在看台上看完了那场球。队里输了，有人在群里说：「有些人，爱惜羽毛。」"};
}
    }
  ]
},

{
  'id': "system_c"+"hange",
  'title': "体系换了",
  'icon': '♟️',
  'weight': 0x34,
  'stage': "prime",
  'repeat': 0x2,
  'desc': "新帅带来的踢法完全换了套。你练了多年的本事，在战术板上找不到一格。",
  'options': [
    {
        'label': "改自己",
        'p': function(p){
return f(0.7,[[p["age"],0x1b,-0.035],[p["ovr"],0x46,0.004]],0.3,0.88);
},
        'hint': function(p,q){
return g(q,"能力+4","四不像");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'roleDelta':0x1,'text':"花了大半年，你把自己拆开重装。回头看，那半年值。"}:{'ovr':-0x3,'roleDelta':-0x1,'text':"新的没学会，老的丢干净了。你成了人们口中「以前挺好的」那种球员。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "等他下课",
        'hint': function(p,q){return g(q,'熬走了','先被熬走');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'text':"他只撑了半年就离任。新来的教练，打法像是照着你写的。"}:{'roleDelta':-0x2,'leave':!0x0,'text':"他在位三年，你在第二年冬天，上了挂牌名单。"};
}
    }
  ]
},

{
  'id': "family_m"+"ove",
  'title': "举家搬迁",
  'icon': '📦',
  'weight': 0x30,
  'when': function(p){
return p["age"]>=0x1c&&p["age"]<=0x22;
},
  'desc': "转会落地，离家两千公里。孩子刚上小学，老人不愿挪窝。",
  'options': [
    {
        'label': "都接过来",
        'hint': "花钱，心里踏实",
        'apply': function(){
return{'money':-0x96,'ovr':0x2,'guanxi':0x6,'text':"租房、转学、找医院，一个夏天全搭进去。可每天回家，门一开，都有人。"};
}
    },
    {
        'p': function(p){return f(0.55,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "自己一个人去",
        'hint': function(p,q){return g(q,'专心踢球','熬不住');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'money':0x28,'text':"一个人住队里的公寓，除了训练没有别的事。那两年，你的数据是生涯最好的。"}:{'ovr':-0x2,'fame':-0x4,'text':"视频那头，孩子对着镜头喊你「叔叔」。那个赛季，你总是走神。"};
}
    }
  ]
},

{
  'id': "career_i"+"njury",
  'title': "膝盖里那块软骨",
  'icon': '🦴',
  'weight': 0x16,
  'stage': "prime",
  'when': function(p){
return p["age"]>=0x18&&p["ovr"]>=0x46;
},
  'desc': "第三次手术后，医生把片子转过来对着你：这关节，走路没问题，踢球就免了。",
  'options': [
    {
        'label': "再试一次复出",
        'p': function(p){
return f(0.42,[[p["ovr"],0x4a,0.006],[p["age"],0x1b,-0.02]],0.18,0.6);
},
        'hint': function(p,q){
return g(q,"撑住了","彻底废了");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':-0x4,'fame':0xc,'roleDelta':-0x1,'text':"你回来了，慢了半步，好在还在场上。看台某个角落，有人举着「欢迎回家」。"}:{'retire':!0x0,'money':-0x50,
'text':"复出第七场，同一个地方又响了一声。这次你站起来，自己走下场，没等担架。"};
}
    },
    {
        'label': "就到这里吧",
        'hint': "挂靴，身体留给以"+'后',
        'apply': function(){
return{'retire':!0x0,'money':0x28,'clean':0x4,'text':"那晚你在更衣室把球鞋装进包里，拉链拉得比往常慢。谁也没想到，那是最后一次。"};
}
    }
  ]
},

{
  'id': "teammate"+"_scandal",
  'title': "队友出事了",
  'icon': '🚨',
  'weight': 0x32,
  'stage': "prime",
  'desc': "跟你关系最好的队友被带走调查。第二天，记者堵在基地门口，见谁都问。",
  'options': [
    {
        'label': "公开说他是好人",
        'hint': "名气+，清白受牵"+'连',
        'apply': function(){
return{'fame':0x10,'clean':-0x8,'guanxi':-0x6,'text':"你在镜头前说，「我认识的他，不是那样的人」。半年后判决下来，这句旧话被人翻出来，嘲了很久。"};
}
    },
    {
        'label': "什么都不说",
        'hint': "干净，落个冷血",
        'apply': function(){
return{'clean':0x4,'fame':-0x6,'text':"你从头到尾没开过口。他出来那天发来消息，你回了两字：保重。"};
}
    }
  ]
},

{
  'id': "loan_out",
  'title': "被外租",
  'icon': '📤',
  'weight': 0x34,
  'stage': "prime",
  'desc': "俱乐部不打算用你，又不肯放你走。折中的方案：租给一支保级队，半年。",
  'options': [
    {
        'label': "就去",
        'hint': "能力+3，落差大",
        'apply': function(){
return{'ovr':0x3,'fame':-0x6,'roleDelta':0x1,'text':"那支队更衣室没有空调。你场场首发，半年踢了十九场，一次没落下。"};
}
    },
    {
        'label': "拒绝，留下来耗",
        'p': function(p){
return f(0.45,[[p["roleRank"],0x2,0.12],[p["ovr"],0x46,0.008]],0.2,0.82);
},
        'hint': function(p,q){
return g(q,"等到机会","荒废一年");
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'ovr':0x1,'text':"冬窗一开，队里走了两个人。机会没吭声，自己回来了。"}:{'ovr':-0x3,'roleDelta':-0x2,'text':"一年里你只出场四次，全是替补登场，每回十分钟。"};
}
    }
  ]
},

{
  'id': "transfer"+"_rumor",
  'title': "转会传闻",
  'icon': '📰',
  'weight': 0x30,
  'stage': "prime",
  'repeat': 0x2,
  'desc': "整个冬窗，你要走的传闻没断过。训练场上，有人开始绕着你走。",
  'options': [
    {
        'label': "公开表态留下",
        'hint': "关系+，将来难走",
        'apply': function(){
return{'guanxi':0xe,'fame':0xa,'lockAbroad':0x2,'roleDelta':0x1,'text':"你在采访里说，「我哪儿也不去」。那句话被印上围巾，也把你钉在了原地。"};
}
    },
    {
        'label': "不表态",
        'p': function(p){
return f(0.45,[[p["ovr"],0x46,0.012],[p["fame"],0x2d,0.003]],0.18,0.85);
},
        'hint': function(p,q){
return g(q,"转成了","两头落空");
},
        'apply': function(p,q,s){
return d(q,s)?{'leave':!0x0,'fame':0x8,'text':"窗口关闭前四小时"+"，你在体检室里签"+"了字。"}:{'roleDelta':-0x2,'guanxi':-0xc,'text':"转会没成，队里也没人再把你当自己人。那半个赛季，过得格外慢。"};
}
    }
  ]
},

{
  'id': "win_bonu"+'s',
  'title': "赢球奖金",
  'icon': '💴',
  'weight': 0x32,
  'stage': "prime",
  'cn': !0x0,
  'when': function(p){
return p["clubRep"]<=0x2;
},
  'desc': "保级生死战前夜，老板发话：赢了，每人五十万，现金。队委会拿着张纸来问你，签不签个字确认。",
  'options': [
    {
        'label': "签字确认",
        'hint': "钱到手，留痕迹",
        'apply': function(){
return{'money':0x32,'clean':-0x6,'text':"钱是给了，纸箱装着。可你签过字的那张条子，后来出现在了别处。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "不签，照常踢",
        'hint': function(p,q){return g(q,'照样给','一分没有');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0x32,'clean':0x4,'text':"球赢了，钱照发。从头到尾，你没在任何纸上留过名字。"}:{'clean':0x4,'guanxi':-0x8,'text':"球赢了，奖金拖到第二年，最后没了下文。有人笑你：活该。"};
}
    }
  ]
},

{
  'id': "fan_club",
  'title': "球迷会",
  'icon': '🧣',
  'weight': 0x2d,
  'stage': "prime",
  'desc': "一伙球迷想用你的名字注册个球迷会，说不为赚钱，就是想让大伙有个地方聚。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': '同意',
        'hint': "名气+，惹麻烦",
        'odds': ["一直是好事","被人拿去做生意"],
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x12,'guanxi':0x6,'text':"每个客场，看台上都有一小群人举着你的名字。你私下出钱，替他们订过两回车票。"}:{'fame':0xa,'money':-0x28,'clean':-0x6,
'text':"有人借着这名头卖假球衣。你自掏腰包请律师，才把这事了断。"};
}
    },
    {
        'label': '婉拒',
        'hint': "无变化",
        'apply': function(){
return{'text':"你说，等踢出点名堂再说。那群人后来，把名字印在了另一个球员的围巾上。"};
}
    }
  ]
},

{
  'id': "second_t"+"eam",
  'title': "下放二队",
  'icon': '🪜',
  'weight': 0x30,
  'stage': "prime",
  'when': function(p){
return p["roleRank"]<=0x1&&p["age"]<=0x18;
},
  'desc': "训练课上，教练把你分进黄背心那组。全场没人说话——这队里谁都懂，那是什么意思。",
  'options': [
    {
        'p': function(p){return f(0.65,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "在二队踢出来",
        'hint': function(p,q){return g(q,'打回去','从此消失');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'roleDelta':0x2,'text':"预备队联赛你场场"+"首发，"+('gk'===p["posGroup"]?"十一轮只丢了四个":"def"===p["posGroup"]?"整条后防线让人挑"+"不出毛病":"进了十一个")+("。三个月后你被叫"+"回了一队。")}:{'ovr':-0x3,
'roleDelta':-0x1,'text':"二队的场子在郊区，看台空着。一线队的教练，一次都没来过。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "找人说情",
        'hint': function(p,q){return g(q,'回一队','更难看');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'guanxi':-0x8,'text':"一个电话打上去，你回了头一队。教练再用你，脸一直是冷的。"}:{'roleDelta':-0x2,'guanxi':-0xe,'clean':-0x6,
'text':"教练在全队面前扔下一句：「有些人路子挺野。」从那以后，没人敢主动跟你说话。"};
}
    }
  ]
},

{
  'id': "vet_last"+"_contrac"+'t',
  'title': "最后一份合同",
  'icon': "🖊️",
  'weight': 0x37,
  'stage': "vet",
  'desc': "俱乐部只肯签一年，工资砍掉六成，附加条款只有一条：带好那几个年轻人。",
  'options': [
    {
        'label': "签字",
        'hint': "钱少，踢得久",
        'apply': function(){
return{'money':0x1e,'guanxi':0xc,'roleDelta':-0x1,'text':"更衣室里，你说的话越来越有分量；工资单上，你的名字却越来越靠下。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "去别处找主力位置",
        'hint': function(p,q){return g(q,'找到了','没人要');
},
        'apply': function(p,q,s){
return d(q,s)?{'leave':!0x0,'ovr':0x1,'fame':0x6,'text':"低一级的球队递来两年合同和十号球衣。你在那儿，一路踢到三十九岁。"}:{'roleDelta':-0x2,'money':-0x28,
'text':"整个冬窗，手机没响过一次。一直熬到三月，才有一支队愿意让你试训。"};
}
    }
  ]
},

{
  'id': "vet_benc"+"h_year",
  'title': "板凳上的一年",
  'icon': '🪑',
  'weight': 0x34,
  'stage': "vet",
  'desc': "一个赛季你只上场四次，全在补时。汗还没出，哨就响了。",
  'options': [
    {
        'label': "留下带队",
        'hint': "关系+，能力继续"+'掉',
        'apply': function(){
return{'guanxi':0x10,'ovr':-0x2,'fame':0x4,'text':"你成了队里半个教练。年轻人有事总来问你；主帅，从不问你。"};
}
    },
    {
        'label': "降级去踢主力",
        'hint': "能力+2，名气-",
        'apply': function(){
return{'leave':!0x0,'ovr':0x2,'fame':-0x8,'text':"你往下走了一级，领回十号球衣。新看台上，不少人专程为你而来。"};
}
    }
  ]
},

{
  'id': "vet_coac"+"h_offer",
  'title': "教练组的位置",
  'icon': '📋',
  'weight': 0x30,
  'stage': "vet",
  'desc': "俱乐部递来一个位置：退役后进教练组。前提是，这个赛季打完就挂靴。",
  'options': [
    {
        'label': '答应',
        'hint': "提前退役，退路有"+'了',
        'apply': function(){
return{'retire':!0x0,'money':0x3c,'coachCert':!0x0,'guanxi':0x10,'text':"最后一个主场，全场起立送你。第二周，你换了身队服，站到教练席后面。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "我还能踢",
        'hint': function(p,q){return g(q,'又踢了三年','位置也没了');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x1,'fame':0x8,'text':"你又踢了三年。教练席上那个位置，也一直给你留着。"}:{'roleDelta':-0x2,'guanxi':-0xa,'text':"第二年，你踢不动了，教练组也换了人。这一头，那一头，都没赶上。"};
}
    }
  ]
},

{
  'id': "vet_assi"+"stant",
  'title': "留下来带年轻人",
  'icon': '🧤',
  'weight': 0x2e,
  'stage': "vet",
  'when': function(p){
return p["seasonsA"+"tClub"]>=0x3;
},
  'desc': "青训总监找你喝茶：踢不动了，就留下来，一线队助教的位置给你留着，带那批十八九岁的孩子。",
  'options': [
    {
        'label': "答应下来",
        'hint': "退役后留在队里，"+"收入一般",
        'apply': function(){
return{'money':-0x14,'guanxi':0x12,'assistant':!0x0,'text':"你说，好。那天下午照常训练，只是你看年轻人的眼神，和以前不一样了。"};
}
    },
    {
        'label': "先不想这些",
        'hint': "专心踢球，能力+"+'2',
        'apply': function(){
return{'ovr':0x2,'text':"你说，等踢不动了再说。他笑了笑：这话，每个退役的人都讲过。"};
}
    }
  ]
},

{
  'id': "vet_scou"+'t',
  'title': "球探的差事",
  'icon': '🔎',
  'weight': 0x2c,
  'stage': "vet",
  'when': function(p){
return p["age"]>=0x22;
},
  'desc': "有家俱乐部想请你退役后当球探：一年三万公里，看的全是没人愿意看的比赛。",
  'options': [
    {
        'label': '接了',
        'hint': "退役后有事做，钱"+'不多',
        'apply': function(){
return{'money':0x1e,'guanxi':0xa,'scout':!0x0,'text':"你翻了翻行程表：小镇，雨天，再小镇。你合上本子说，这活儿，我干得来。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': '不去',
        'hint': "名气+，退路少一"+'条',
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xa,'money':0x28,'text':"你去跑商业活动，穿得体面，笑得很职业。说的话，没几个人记得。"}:{'fame':-0x4,'text':"谁的电话你都没接。那一年，日子过得很慢。"};
}
    }
  ]
},

{
  'id': "vet_test"+"imonial",
  'title': "告别赛",
  'icon': '🎆',
  'weight': 0x2d,
  'stage': "vet",
  'when': function(p){
return p["seasonsA"+"tClub"]>=0x4;
},
  'desc': "俱乐部想给你办场告别赛，票房全归你。也有人劝：别办，太像作秀。",
  'options': [
    {
        'label': "办一下",
        'hint': "钱+名气+",
        'apply': function(){
return{'money':0xdc,'fame':0x18,'guanxi':0xa,'text':"来了两万人。上半场你踢了二十分钟，下半场坐回替补席，看年轻人踢。"};
}
    },
    {
        'label': '不办',
        'hint': "清白+，安静退场",
        'apply': function(){
return{'clean':0x6,'fame':-0x4,'text':"最后一场哨响，你自己走到中圈，鞠了一躬，转身回更衣室。没有仪式。"};
}
    }
  ]
},

{
  'id': "vet_drop"+"_league",
  'title': "往下走一级",
  'icon': '⬇️',
  'weight': 0x32,
  'stage': "vet",
  'desc': "{league}已经没有球队要你了。往低走一级，倒有两支队伍，愿意给你主力位置。",
  'options': [
    {
        'label': "往下走",
        'hint': "能力+2，联赛降"+'级',
        'apply': function(){
return{'leave':!0x0,'ovr':0x2,'money':-0x14,'text':"客场大巴、水泥看台、拖欠的奖金，一样不少地回来了。可你每周，都能踢满九十分钟。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "耗到没人要为止",
        'hint': function(p,q){return g(q,'有人捡漏','直接退役');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':-0x1,'text':"三月份，一支保级队伤了人，临时把你签下。你替他们踢了十一场。"}:{'retire':!0x0,'text':"你一直等到六月。手机，没响过。"};
}
    }
  ]
},

{
  'id': "vet_medi"+"cal_fail",
  'title': "体检没过",
  'icon': '🩻',
  'weight': 0x2d,
  'stage': "vet",
  'desc': "转会都谈妥了。体检报告出来的那天，对方打来电话，只说了句「很遗憾」。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "去别的医院再查",
        'hint': function(p,q){return g(q,'翻案','坐实');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':-0x14,'ovr':0x1,'text':"另一家医院给出完全相反的结论。合同最终照签，只是晚了十天。"}:{'money':-0x14,'ovr':-0x3,'roleDelta':-0x1,
'text':"三家医院，口径一致。你这才知道，那块软骨已经磨了很多年。"};
}
    },
    {
        'label': "认了，找个不体检"+'的队',
        'hint': "能力-，有球踢",
        'apply': function(){
return{'leave':!0x0,'ovr':-0x2,'money':-0x1e,'text':"一支低一级的球队，没让你体检就签了字。后来他们知道了，也没多问。"};
}
    }
  ]
},

{
  'id': "vet_comm"+"entary",
  'title': "解说席的邀请",
  'icon': '🎧',
  'weight': 0x2d,
  'stage': "vet",
  'desc': "电视台想请现役球员当嘉宾解说，一场两万，代价是得评点同行。",
  'options': [
    {
        'label': '去说',
        'hint': "钱+名气+，得罪"+'人',
        'apply': function(){
return{'money':0x3c,'fame':0x12,'guanxi':-0xc,'text':"你对着麦克风说了句：「这个球，换我不会那么处理。」第二天，那个球员退了共同所在的群。"};
}
    },
    {
        'label': '不去',
        'hint': "无变化",
        'apply': function(){
return{'text':"你说自己还在踢，不合适。电视台转头，找了个刚退役的。"};
}
    }
  ]
},

{
  'id': "vet_acad"+"emy",
  'title': "合伙办个班",
  'icon': "🏟️",
  'weight': 0x2c,
  'stage': "vet",
  'when': function(p){
return p["money"]>=0x12c;
},
  'desc': "退役两年的老队友找上门来：租块场地办个青训班，他跑手续、带训练，就差一个肯把名字挂在门口的人。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "出钱，名字也挂上",
        'hint': function(p,q){return g(q,'招得满','砸手里');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':-0x3c,'fame':0x8,'academy':!0x0,'text':"第一批来了三十几个孩子，家长是冲着门口那块牌子来的。你每周去两趟，站在场边，不说话。"}:{'money':-0x104,
'fame':-0x6,'text':"招生只来了九个。退场地那天，你去帮忙搬球门。老队友说下次再找你，你说，好。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["clean"],70,0.008]],0.2,0.9);
},
        'label': "只借名字，不出钱",
        'hint': function(p,q){return g(q,'相安无事','出事算你的');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0x5a,'text':"你签了张授权书，每年分一笔。那个班后来办得如何，你再没问过。"}:{'money':0x5a,'fame':-0x14,'clean':-0x8,'text':"有家长把收费单晒到网上，落款是你的名字。你这才知道，一年收两万四。"};
}
    },
    {
        'label': "不掺和",
        'hint': "无变化",
        'apply': function(){
return{'text':"你说自己不懂经营。他点了点头，走的时候，把那包烟留在了桌上。"};
}
    }
  ]
},

{
  'id': "cn_new_s"+"tadium",
  'title': "新球场",
  'icon': "🏟️",
  'weight': 0x30,
  'cn': !0x0,
  'desc': "地方上砸下座六万人的新球场。主队搬进去，票价翻了一倍，上座率掉了一半。",
  'options': [
    {
        'label': "公开说老球场好",
        'hint': "球迷买账，上面不"+'高兴',
        'apply': function(){
return{'fame':0x10,'guanxi':-0xe,'text':"你在镜头前说，老球场离球迷近。这句话剪进了当地新闻，紧接着，又被剪掉。"};
}
    },
    {
        'label': "配合宣传",
        'hint': "关系+，钱+",
        'apply': function(){
return{'guanxi':0xc,'money':0x28,'fame':-0x6,'text':"你站在新球场中央拍宣传照，笑得很标准。开幕战，上座一万二。"};
}
    }
  ]
},

{
  'id': "cn_fan_c"+"lash",
  'title': "球迷冲突",
  'icon': '🚧',
  'weight': 0x2d,
  'cn': !0x0,
  'desc': "德比刚结束，两边球迷在停车场动起手来。你的车，正好堵在最中间。",
  'options': [
    {
        'p': function(p){return f(0.6,
[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "下车劝",
        'hint': function(p,q){return g(q,'被记住','挨了一下');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x14,'guanxi':0x8,'text':"你站到两拨人中间，喊了三分钟。视频传开以后，很多人说：这才是职业球员。"}:{'fame':0xa,'ovr':-0x2,'text':"不知谁从背后砸来个瓶子。缝了四针，两个星期没上场。"};
}
    },
    {
        'label': "锁门等警察",
        'hint': "无变化",
        'apply': function(){
return{'text':"你在车里坐了四十分钟。第二天，没人再提这事，俱乐部也是。"};
}
    }
  ]
},

{
  'id': "cn_agent"+"_cut",
  'title': "经纪人的抽成",
  'icon': '✂️',
  'weight': 0x30,
  'cn': !0x0,
  'stage': "prime",
  'desc': "转会敲定后你才听说，经纪人从俱乐部那头也抽了一笔，数目比你的签字费还高。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "撕破脸",
        'hint': function(p,q){return g(q,'追回来','转会黄了');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0x96,'guanxi':-0xc,'clean':0x6,'text':"你换了经纪人，把那笔钱讨了回来。这行里，从此有人背后说你不好带。"}:{'money':-0x3c,'roleDelta':-0x1,
'text':"转会在最后一刻黄了。新东家那边传话：「这孩子，事多。」"};
}
    },
    {
        'label': '忍了',
        'hint': "钱少了，路好走",
        'apply': function(){
return{'money':-0x50,'guanxi':0xa,'text':"你什么都没说。他后来又替你张罗过两次转会，每次，佣金都抽得很干净。"};
}
    }
  ]
},

{
  'id': "cn_team_"+"doctor",
  'title': '队医',
  'icon': "🧑‍⚕️",
  'weight': 0x30,
  'cn': !0x0,
  'desc': "队医是老板的亲戚。处理伤病只有两招：冰敷，和一句「再练练」。",
  'options': [
    {
        'label': "自费找外面的",
        'hint': "花钱，能力+3",
        'apply': function(){
return{'money':-0x46,'ovr':0x3,'guanxi':-0x6,'text':"你自己联系了运动医学中心。队里说你信不过队医，你说你信得过自己的腿。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': '忍着',
        'hint': function(p,q){return g(q,'熬过去','拖成大伤');
},
        'apply': function(p,q,s){
return d(q,s)?{'text':"那点伤，后来自己好了。你至今不知道，它当初到底是什么。"}:{'ovr':-0x4,'text':"小伤拖成慢性劳损。三年后再拍片子，医生盯着片子问：当年怎么处理的？"};
}
    }
  ]
},

{
  'id': "cn_forei"+"gn_coach",
  'title': "外教来了",
  'icon': "🗣️",
  'weight': 0x32,
  'cn': !0x0,
  'desc': "俱乐部请来个欧洲教练。第一堂训练课，他让全队做自己青训里十四岁孩子的传接练习。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "认真练基本功",
        'hint': function(p,q){return g(q,'能力+5','白练');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'text':"三个月后，全队失误率掉了一半。你才明白，有些习惯自己错练了十年。"}:{'ovr':-0x1,'guanxi':-0x6,'text':"他撑了半个赛季就被换走，新帅把他那套全推翻。你两头都没落着。"};
}
    },
    {
        'label': "跟着老队员抵触",
        'hint': "关系+，能力-",
        'apply': function(){
return{'guanxi':0xc,'ovr':-0x2,'text':"更衣室里没人听他的。他走那天，只跟翻译握了手。"};
}
    }
  ]
},

{
  'id': "cn_salar"+"y_cap",
  'title': "限薪令",
  'icon': '📉',
  'weight': 0x32,
  'cn': !0x0,
  'stage': "prime",
  'when': function(p){
return p["ovr"]>=0x44&&p["roleRank"]>=0x2;
},
  'desc': "足协一纸文件，顶薪砍到原来的三分之一，已签的合同「参照执行」。俱乐部把你叫去重签。",
  'options': [
    {
        'label': '签了',
        'hint': "收入大减，队里记"+"你一个人情",
        'apply': function(){
return{'money':-0x104,'guanxi':0x10,'clean':0x6,'text':"你没提条件。后来闹去仲裁的那几个，到头来拿的也不比你多。"};
}
    },
    {
        'p': function(p){return f(0.55,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "让经纪人想办法",
        'hint': function(p,q){return g(q,'钱保住了','谈崩');
},
        'apply': function(p,q,s){
return d(q,s)?{'money':0xb4,'clean':-0xe,'yinyang':!0x0,'text':"差额，走了一家公司的「形象代言」。合同一式两份，只有一份能见光。"}:{'money':-0x78,'guanxi':-0xe,
'roleDelta':-0x1,'text':"谈崩了。你在替补席坐了半个赛季，再没人提起那份合同。"};
}
    }
  ]
},

{
  'id': "cn_quany"+'un',
  'title': "全运会的名额",
  'icon': '🏟',
  'weight': 0x30,
  'cn': !0x0,
  'when': function(p){
return p["age"]>=0x12&&p["age"]<=0x17;
},
  'desc': "省里点名要你回去打全运会，场次跟联赛撞了。俱乐部的脸色很不好看。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "回去打",
        'hint': function(p,q){return g(q,'拿牌两头讨好','位置被顶');
},
        'apply': function(p,q,s){
return d(q,s)?{'guanxi':0x14,'fame':0xa,'text':"你带着队拿了牌。省里记住了你，俱乐部也没把话说死。"}:{'guanxi':0xe,'roleDelta':-0x2,'text':"回来时，你的位置坐了别人。省里那边倒一直念着你的好。"};
}
    },
    {
        'label': "留在俱乐部",
        'hint': "地位保住，得罪省"+'里',
        'apply': function(){
return{'guanxi':-0x12,'roleDelta':0x1,'ovr':0x1,'text':"你说合同在这儿。往后几年，凡是要省里点头的名单，都没有你的名字。"};
}
    }
  ]
},

{
  'id': "cn_winte"+"r_camp",
  'title': '冬训',
  'icon': '🏔',
  'weight': 0x34,
  'cn': !0x0,
  'repeat': 0x2,
  'desc': "昆明海埂，海拔一千九，一天两练，三个月。队医说在这儿练完，回平原能多跑十公里。",
  'options': [
    {
        'label': "顶着练",
        'p': function(p){
return f(0.68,[[p["age"],0x1a,-0.028],[p["ovr"],0x46,0.003]],0.3,0.88);
},
        'hint': function(p,q){
return g(q,"体能脱胎换骨","练废了");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'text':"开赛前三轮，你的跑动数据全队第一。解说员说，你跟换了个人似的。"}:{'ovr':-0x3,'text':"第七周，膝盖开始积液。余下的冬训，你在健身房看别人跑。"};
}
    },
    {
        'label': "按自己的节奏来",
        'hint': "能力+1，被说不"+'合群',
        'apply': function(){
return{'ovr':0x1,'guanxi':-0x8,'text':"你递给教练组一份自己的计划。他们批了，可那年「刻苦」名单上，没有你。"};
}
    }
  ]
},

{
  'id': "cn_acl_a"+"way",
  'title': "亚冠西亚客场",
  'icon': '🛫',
  'weight': 0x2e,
  'cn': !0x0,
  'when': function(p){
return p["clubRep"]>=0x2&&p["roleRank"]>=0x2;
},
  'desc': "飞十一个小时打客场，落地就训练，第三天还有联赛。领队来问你，上不上。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "全程跟队",
        'hint': function(p,q){return g(q,'打满全场','透支');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'fame':0x8,'mult':{'cont':1.6},'text':"你在四万人的客场打满全场。回程航班上，全队没人说话。"}:{'ovr':-0x2,'roleDelta':0x1,
'text':"两周三场。第三场下半场，你抽筋被换下。教练记下的，是你上了。"};
}
    },
    {
        'label': "留下备战联赛",
        'hint': "保住状态，被说不"+"顾大局",
        'apply': function(){
return{'ovr':0x2,'guanxi':-0x8,'text':"那场客场丢了三个。赛后发布会上有人放话：「有些人心不在亚冠。」"};
}
    }
  ]
},

{
  'id': "cn_amate"+"ur_cup",
  'title': "足协杯打业余队",
  'icon': '🥅',
  'weight': 0x2e,
  'cn': !0x0,
  'when': function(p){
return p["roleRank"]>=0x2;
},
  'desc': "足协杯首轮，对手是支业余队。场地是县城的土场，看台坐满两千人，都是冲你来的。",
  'options': [
    {
        'p': function(p){return f(0.7,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "认真踢",
        'hint': function(p,q){return g(q,'名气+','在土坑里崴脚');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xc,'guanxi':0x6,'mult':{'cup':1.4},'text':"赢了四个。散场后你在场边签了四十分钟名，有个孩子递上来一本作业。"}:{'ovr':-0x3,'fame':0x4,
'text':"第 26 分钟，你一脚踩进土场的坑里，脚踝当场肿了。对面那孩子一直道歉，话都说不利索。"};
}
    },
    {
        'label': '留力',
        'hint': "保住身体，球迷失"+'望',
        'apply': function(p){
return{'fame':-0x8,'text':"你踢了半场就被换"+"下。第二天当地论"+"坛的标题是"+h(p,{'gk':"「他连一次扑救都"+"懒得做给我们看」",'other':"「他连一脚射门都"+"不愿意给我们」"})+'。'};
}
    }
  ]
},

{
  'id': "cn_bus_s"+"eized",
  'title': "大巴被查封了",
  'icon': '🚌',
  'weight': 0x2c,
  'cn': !0x0,
  'when': function(p){
return p["clubRep"]<=0x2;
},
  'desc': "欠薪半年，法院给俱乐部大巴贴了封条。下一场客场，全队得自己想办法过去。",
  'options': [
    {
        'label': "带头出面讨薪",
        'hint': "名气大涨，圈子里"+'挂号',
        'apply': function(){
return{'fame':0x16,'guanxi':-0x14,'money':0x3c,'clean':0x6,'text':"你带着队友在基地门口站了一上午。工资补了六成，你的名字也进了另一份名单。"};
}
    },
    {
        'label': "自己垫钱先把球打"+'完',
        'hint': "钱-，队友记你一"+'辈子',
        'apply': function(){
return{'money':-0x5a,'guanxi':0x12,'text':"你订了两辆中巴。那笔钱后来没人提过要还，队友倒是记了很多年。"};
}
    }
  ]
},

{
  'id': "cn_reg_d"+"eadline",
  'title': "注册截止前四小时",
  'icon': '⏳',
  'weight': 0x2e,
  'cn': !0x0,
  'desc': "转会窗最后一天，注册材料就差俱乐部一个章。办公室的人说，领导在外地。",
  'options': [
    {
        'label': "自己开车去找人签",
        'hint': "钱-，事办成",
        'apply': function(){
return{'money':-0x19,'guanxi':0x8,'text':"你在高速上跑了三"+"百公里，在一个饭"+"局门口等到十一点"+"半。章盖上了，赶"+"上了。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "等他们办",
        'hint': function(p,q){return g(q,'赶上了','空转半个赛季');
},
        'apply': function(p,q,s){
return d(q,s)?{'text':"系统关闭前二十分钟，材料提交成功。中间发生了什么，没人跟你解释过。"}:{'roleDelta':-0x2,'ovr':-0x2,'guanxi':-0x6,'text':"材料卡在系统里。上半赛季，你只能跟着训练，一场正式比赛都没踢上。"};
}
    }
  ]
},

{
  'id': "cn_leade"+"r_visit",
  'title': "领导来看球",
  'icon': '🎗',
  'weight': 0x30,
  'cn': !0x0,
  'desc': "地方领导带队来调研，赛前合影，赛后座谈。队里放话：这场球性质不一样。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "打起十二分精神",
        'hint': function(p,q){return g(q,'被点名表扬','用力过猛');
},
        'apply': function(p,q,s){
return d(q,s)?{'guanxi':0x10,'mult':{'league':1.3},'text':h(p,{'gk':"你零封了对手，还"+"扑了一个点球。",'other':"你打进一个。"})+("座谈会上领导点了"+"你的名，说这样的"+"球员要多培养。")}:{'guanxi':0x6,
'ovr':-0x1,'text':h(p,{'gk':"你太想表现，几次"+"没必要的出击差点"+"送礼。座谈会上没"+"人提你。",'other':"你太想表现，全场"+"丢了十一次球权。"+"座谈会上没人提你"+'。'})};
}
    },
    {
        'label': "当普通一场踢",
        'hint': "无变化，也没人怪"+'你',
        'apply': function(){
return{'ovr':0x1,'text':"你照常热身，照常拉伸。合影时，你站在最后一排靠边的位置。"};
}
    }
  ]
},

{
  'id': "cn_media"+"_line",
  'title': "统一口径",
  'icon': '🗒',
  'weight': 0x30,
  'cn': !0x0,
  'when': function(p){
return p["fame"]>=0x19;
},
  'desc': "媒体开放日前，俱乐部发来一张纸：上面写着「可以说的三句话」，和「不能提的四件事」。",
  'options': [
    {
        'label': "照着念",
        'hint': "关系+，球迷觉得"+'你假',
        'apply': function(p){
return{'guanxi':0xc,'fame':-0x8,'text':"你一字不差地念完"+"了。那段采访被做"+"成了鬼畜，播放量"+'比你'+h(p,{'gk':"任何一次扑救",'other':"任何一个进球"})+"都高。"};
}
    },
    {
        'label': "说了一句实话",
        'hint': "名气大涨，俱乐部"+'记账',
        'apply': function(){
return{'fame':0x14,'guanxi':-0x10,'clean':0x6,'text':"你说：「欠薪的事，大家心里都有数。」第二天，球队公告说你「言论不代表俱乐部」。"};
}
    }
  ]
},

{
  'id': "cn_banne"+'r',
  'title': "看台上的横幅",
  'icon': '🧣',
  'weight': 0x2e,
  'cn': !0x0,
  'when': function(p){
return p["clubRep"]<=0x3;
},
  'desc': "南看台拉起一条三十米的横幅，写着「还我球队」。安保去收，球迷不撒手。",
  'options': [
    {
        'label': "赛后走过去鞠躬",
        'hint': "球迷认你，上面不"+'高兴',
        'apply': function(){
return{'fame':0x12,'guanxi':-0xc,'text':"你一个人走到南看台前，鞠了很久的躬。那张照片，如今还挂在球迷会的墙上。"};
}
    },
    {
        'label': "跟着大部队回更衣"+'室',
        'hint': "无变化",
        'apply': function(){
return{'fame':-0x5,'text':"走进球员通道时，你回头看了一眼。横幅还在，看台上的人少了一半。"};
}
    }
  ]
},

{
  'id': "abr_boxi"+"ng_day",
  'title': "节礼日",
  'icon': '🎄',
  'weight': 0x44,
  'when': function(p){
return!p["inChina"]&&'EN'===p["country"];
},
  'desc': "十天四场。圣诞夜坐大巴赶路，二十六号打客场。队里的英格兰人管这叫一年里最好的日子。",
  'options': [
    {
        'label': '全踢',
        'p': function(p){
return f(0.62,[[p["ovr"],0x48,0.006],[p["age"],0x1b,-0.022]],0.3,0.85);
},
        'hint': function(p,q){
return g(q,"扛下来了","累趴下");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0xe,'roleDelta':0x1,'text':"四场全首发，进了两个。当地报纸写道，这个中国人「有一副英式的肺」。"}:{'ovr':-0x3,'roleDelta':-0x1,
'text':"第三场下半场，大腿后侧忽然拉响了。整个一月，你都在恢复。"};
}
    },
    {
        'label': "跟教练说要轮休",
        'hint': "保住身体，位置有"+'风险',
        'apply': function(){
return{'ovr':0x1,'roleDelta':-0x1,'guanxi':-0x6,'text':"他答应了。只是从那以后，「关键场次」四个字里，不再有你。"};
}
    }
  ]
},

{
  'id': "abr_tran"+"slator",
  'title': "翻译不干了",
  'icon': '🗣',
  'weight': 0x42,
  'when': function(p){
return!p["inChina"]&&p["seasonsA"+"broad"]>=0x1;
},
  'desc': "俱乐部精简开支，翻译的合同没续。战术会上教练讲了二十分钟，你只听懂六成。",
  'options': [
    {
        'p': function(p){return f(0.65,[[p["talent"],1,0.4]],0.2,0.9);
},
        'label': "自己啃语言",
        'hint': function(p,q){return g(q,'从此不用别人','半年还在猜');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'guanxi':0xc,'text':"三个月后，你在更衣室讲了第一个笑话，全队都笑了。那天你才算真的到了这儿。"}:{'ovr':-0x1,'guanxi':0x4,'text':"背了半年单词，战术板上的东西还是靠猜。教练喊你名字的速度，倒是快了一点。"};
}
    },
    {
        'label': "自费请一个",
        'hint': "钱-，训练不掉队",
        'apply': function(){
return{'money':-0x6e,'ovr':0x1,'text':"你按月付钱，请了个留学生。他后来成了你在那座城市唯一的朋友。"};
}
    }
  ]
},

{
  'id': "abr_mark"+'et',
  'title': "亚洲行",
  'icon': '✈️',
  'weight': 0x44,
  'when': function(p){
return!p["inChina"]&&p["fame"]>=0x1e;
},
  'desc': "季前赛排了一趟亚洲行。商务部门把话挑明：这趟海报的中间，得是你。",
  'options': [
    {
        'label': "全程配合",
        'hint': "钱和名气都涨，季"+"前备战被吃掉",
        'apply': function(){
return{'money':0xdc,'fame':0x16,'ovr':-0x2,'text':"十天六个城市，三支广告。回基地的第一堂训练课，体脂比走时高了两个点。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "只去三天",
        'hint': function(p,q){return g(q,'状态最好','商务部门记账');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'money':0x3c,'text':"打完两场友谊赛，你就飞回了基地。开赛后，你的状态是全队最好的一档。"}:{'guanxi':-0xa,'money':0x28,'roleDelta':-0x1,
'text':"赞助商在合同里加了一条。转年续约，商务那一栏，给你打了低分。"};
}
    }
  ]
},

{
  'id': "abr_boo",
  'title': "看台上的那几个人",
  'icon': '📢',
  'weight': 0x40,
  'when': function(p){
return!p["inChina"]&&p["seasonsA"+"broad"]>=0x1;
},
  'desc': "客场角旗区附近那几个人，每次你拿球，都学着那动静叫。第四官员装作没听见。",
  'options': [
    {
        'label': "当场指给主裁",
        'hint': "事情闹大，你成了"+'话题',
        'apply': function(){
return{'fame':0x18,'guanxi':-0x8,'clean':0x6,'text':"比赛停了六分钟，广播念了三遍警告。有人说你玻璃心，也有人散场后等在球场外，就为跟你握个手。"};
}
    },
    {
        'p': function(p){return f(0.6,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "用球回应",
        'hint': function(p,q){return g(q,'当场回敬','踢得更急');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x10,'text':h(p,{'gk':"你在那个角旗区前"+"面把一个必进球托"+"出了横梁，起身冲"+"那几个位置张开了"+"双臂。",'other':"你在那个角旗区前"+"面助攻了一个球，"+"转身冲那几个位置"+"张开了双臂。"})}:{'ovr':0x1,
'fame':-0x4,'text':"那场你踢得很急，什么都没做成。回酒店，你把手机关了一整晚。"};
}
    }
  ]
},

{
  'id': "abr_wint"+"er_break",
  'title': "冬歇期",
  'icon': '❄️',
  'weight': 0x44,
  'when': function(p){
return!p["inChina"];
},
  'desc': "十二月底到一月中，联赛停摆两周，正赶上春节。机票来回三十几个小时。",
  'options': [
    {
        'label': "回家过年",
        'hint': "关系+，状态回落",
        'apply': function(){
return{'guanxi':0xe,'ovr':-0x2,'money':-0x1e,'text':"你在家待了九天，吃胖三斤。你妈把你穿过的每件球衣，都熨过一遍。"};
}
    },
    {
        'label': "留下来加练",
        'hint': "能力+，一个人过"+'节',
        'apply': function(){
return{'ovr':0x3,'fame':0x4,'text':"大年夜的基地，只剩你和两个门将。仨人点了外卖，对着手机看跨年晚会。"};
}
    }
  ]
},

{
  'id': "abr_pape"+"rwork",
  'title': "驾照和银行卡",
  'icon': '🪪',
  'weight': 0x3e,
  'when': function(p){
return!p["inChina"]&&p["seasonsA"+"broad"]<=0x3;
},
  'desc': "住了半年，驾照还没办下来，银行卡冻结过两次。俱乐部说，人手不够。",
  'options': [
    {
        'label': "自己一趟趟跑",
        'hint': "耽误时间，但从此"+'自理',
        'apply': function(){
return{'ovr':-0x1,'guanxi':0xa,'text':"你学会了预约、排队，和据理力争。半年后新来的巴西小孩，什么都来问你。"};
}
    },
    {
        'label': "花钱请人代办",
        'hint': "钱-，省心",
        'apply': function(){
return{'money':-0x46,'ovr':0x1,'text':"两周，全办妥了。省下来的时间，你都泡在了训练场。"};
}
    }
  ]
},

{
  'id': "abr_cliq"+'ue',
  'title': "更衣室的桌子",
  'icon': '🍽',
  'weight': 0x42,
  'when': function(p){
return!p["inChina"];
},
  'desc': "餐厅里南美帮一桌，法语区一桌，本地人一桌。你端着盘子，站在中间。",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "硬凑过去",
        'hint': function(p,q){return g(q,'真融进去了','白听两个月');
},
        'apply': function(p,q,s){
return d(q,s)?{'guanxi':0x10,'fame':0x6,'text':"三个月后，他们开始用你的中文名叫你，虽然每次都念得很怪。"}:{'guanxi':-0x4,'ovr':0x1,'text':"听了两个月听不懂的笑话，最后你还是端着盘子，回了自己那桌。"};
}
    },
    {
        'label': "自己一桌，专心吃",
        'hint': "能力+，落个孤僻",
        'apply': function(){
return{'ovr':0x2,'guanxi':-0x6,'text':"你吃饭比谁都快，吃完就去健身房。他们叫你「机器」，语气里有敬意，也有距离。"};
}
    }
  ]
},

{
  'id': "abr_thur"+"sday",
  'title': "周四踢欧战",
  'icon': '🌙',
  'weight': 0x42,
  'when': function(p){
return!p["inChina"]&&p["hasCont"]&&p["roleRank"]>=0x2;
},
  'desc': "周四客场打完欧战，凌晨三点才落地，周日中午还有联赛。教练问你，能不能连着上。",
  'options': [
    {
        'p': function(p){return f(0.58,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "两场都上",
        'hint': function(p,q){return g(q,'跑满两场','直接空了');
},
        'apply': function(p,q,s){
return d(q,s)?{'roleDelta':0x1,'fame':0xa,'mult':{'cont':1.4},'text':"两场下来，你跑了二十三公里。队长在混合区扔下一句：「这家伙不是人。」"}:{'ovr':-0x2,'text':"周日下半场，你彻底跑不动了。数据网站给了你全场最低分。"};
}
    },
    {
        'label': "只打联赛",
        'hint': "状态稳，欧战名单"+'靠后',
        'apply': function(){
return{'ovr':0x1,'mult':{'cont':0.8},'text':"欧战那晚，你在替补席坐了九十分钟。周日，你是全场最佳。"};
}
    }
  ]
},

{
  'id': "abr_nick"+"name",
  'title': "当地媒体给的外号",
  'icon': '📰',
  'weight': 0x40,
  'when': function(p){
return!p["inChina"]&&p["fame"]>=0x19;
},
  'desc': "本地小报给你起了个外号，直译过来叫「长城」。第二天，全城都这么喊你。",
  'options': [
    {
        'label': "接下来",
        'hint': "名气+",
        'apply': function(){
return{'fame':0x10,'guanxi':0x4,'text':"你在采访里说，挺好，长城是我们那儿的东西。球衣定制区，「长城」卖得比你的号码还好。"};
}
    },
    {
        'label': "公开纠正",
        'hint': "少了个梗，多了点"+'尊重',
        'apply': function(){
return{'fame':-0x4,'clean':0x6,'guanxi':0x6,'text':"你说，我有名字。那家小报第二天改了说法，别的媒体也跟着改了。"};
}
    }
  ]
},

{
  'id': "abr_home"+"coming",
  'title': "回母队看看",
  'icon': '🏠',
  'weight': 0x3e,
  'when': function(p){
return!p["inChina"]&&p["seasonsA"+"broad"]>=0x3;
},
  'desc': "休赛期路过老东家，梯队教练拦住你：能不能给孩子们上一堂课？基地还是当年那个样子。",
  'options': [
    {
        'label': "去上一堂",
        'hint': "名气+，心里有底",
        'apply': function(p){
return{'fame':0xc,'guanxi':0xa,'text':h(p,{'gk':"你把队里六个守门"+"的孩子单拎出来练"+"了一下午倒地。",'other':"你带着四十个孩子"+"练了一下午传接。"})+("走的时候有个小孩"+"问你，出去踢是不"+"是很难。你说是。")};
}
    },
    {
        'label': "捐一批装备就走",
        'hint': "钱-，也是实在的",
        'apply': function(){
return{'money':-0x3c,'fame':0x6,'clean':0x4,'text':"两百双球鞋和十个球门。你没让挂横幅，也没让拍照，卸完就走了。"};
}
    }
  ]
},

{
  'id': "star_mar"+"ker",
  'title': '对位',
  'icon': '🎯',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"def"===p["posGroup"];
},
  'desc': "赛前会上，教练把战术板转向你：整场跟着 7 号，他去哪儿你去哪儿。教练不喊名字，可那个 7 号是梅西。",
  'options': [
    {
        'label': "贴死他",
        'p': function(p){
return f(0.42,[[p["ovr"],0x4c,0.011],[p["roleRank"],0x3,0.03]],0.12,0.78);
},
        'hint': function(p,q){
return g(q,"他这场没进球","被他过成了集锦");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x16,'roleDelta':0x1,'text':"九十分钟，他碰到球四十七次，没有一次是在你身后。终场哨响，他拍了拍你的后脑勺。那个画面被拍了下来，现在还挂在你老家客厅的墙上。"}:{'ovr':-0x1,
'fame':0x6,'text':"第 63 分钟，他往回收了一步，你跟了出去，然后就没有然后了。那段视频标题写着「他把一个中国后卫钉在了原地」，播放量两千万。"};
}
    },
    {
        'label': "退半步，别单防",
        'hint': "不丢人，也没人记"+'得你',
        'apply': function(){
return{'fame':0x2,'guanxi':0x4,'text':"你始终和他保持两米，把他往边路赶。他这场进了一个，但那一球从另一侧打进。赛后教练说：你至少没让他在中路拿球转身。"};
}
    }
  ]
},

{
  'id': "star_def"+"_side",
  'title': "他这一侧",
  'icon': '🎯',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"def"===p["posGroup"];
},
  'desc': "赛前会，教练把鼠标点在你这一侧的边路：今晚对面那个 7 号归你。他上半场连续两次从这一侧起速，看台都在等第三次。",
  'options': [
    {
        'label': "贴死他,不放一步",
        'p': function(p){
return f(0.42,[[p["ovr"],0x4c,0.011],[p["roleRank"],0x3,0.03]],0.12,0.78);
},
        'hint': function(p,q){
return g(q,"他一晚没从你这边过","他连过你两次,还进了一个");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x16,'roleDelta':0x1,'text':"他这一侧七次尝试，两次成功，都被你堵在底线附近。赛后他把球衣扔给你，一句话没说。你把它叠好，打算过年带回去给侄子。"}:{'ovr':-0x1,
'fame':0x6,'text':"他第三次内切时你已经知道追不上，可还是伸了脚。球进了死角。中场休息时你听见他在通道里跟队友复述那一下是怎么过的你。"};
}
    },
    {
        'label': "让队友协防,不硬扛",
        'hint': "保全自己,也保全全队",
        'apply': function(){
return{'guanxi':0x8,'fame':0x2,'text':"你每次给他留出外侧，逼他往内线走，那儿站着你的后腰。他这晚一次漂亮突破都没有，数据上什么也看不出来——但教练知道，队里也都知道。"};
}
    }
  ]
},

{
  'id': "star_pen"+"_save",
  'title': "点球点上的那个人",
  'icon': '🧤',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&'gk'===p["posGroup"];
},
  'desc': "第 88 分钟，主裁指了指点球点。C 罗把球摆好，退到罚球弧外，深吸了一口气。",
  'options': [
    {
        'label': "赌一边",
        'p': function(p){
return f(0.22,[[p["ovr"],0x4c,0.008]],0.08,0.42);
},
        'hint': function(p,q){
return g(q,"扑出来了","球进了");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x1c,'roleDelta':0x1,'text':"你倒向左侧，指尖把球拨出了立柱。客场看台安静了两秒，然后炸了。赛后他走过来，把球衣递到你手里。"}:{'fame':0x8,
'text':"他把球打进了死角。你扑对了方向，够不着。他没有庆祝，只是抬手指了指你——「你动得不算晚」。"};
}
    },
    {
        'label': "站着不动，等他先"+'动脚',
        'p': function(p){
return f(0.13,[[p["ovr"],0x4c,0.006]],0.04,0.3);
},
        'hint': function(p,q){
return g(q,"他打中路，你抱住"+'了',"球进了");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0x22,'roleDelta':0x1,'text':"你站在门线中间，一动没动。球直直飞向你胸口，你把它抱住。解说员连说了三遍：「他根本没有动。」"}:{'ovr':-0x1,
'fame':0x4,'text':"他把球打进你身后的网窝，你连方向都没来得及选。回更衣室，门将教练什么也没说，只把那段录像回放了七遍。"};
}
    }
  ]
},

{
  'id': "star_mid"+"field",
  'title': "中圈那一圈",
  'icon': '🔄',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"mid"===p["posGroup"];
},
  'desc': "对面中场是莫德里奇。上半场，他在你面前转了三次身，你三次都扑了空。",
  'options': [
    {
        'label': "下半场提前一步上"+'抢',
        'p': function(p){
return f(0.45,[[p["ovr"],0x4c,0.01],[p["age"],0x1b,-0.008]],0.15,0.8);
},
        'hint': function(p,q){
return g(q,"把他摁住了","被晃出一张黄牌");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x12,'roleDelta':0x1,'text':"第 58 分钟，你在他接球前半秒把球捅走，直接打成反击。赛后他找到你，用英语说了句：「你下半场变了。」"}:{'ovr':-0x1,
'fame':0x4,'text':"你扑上去，他一个外脚背把球拨到另一侧，你在他身后犯规。黄牌。场边教练摊手的样子，被人拍成了表情包。"};
}
    },
    {
        'label': "退回去守阵型",
        'hint': "稳，但这场没你什"+'么事',
        'apply': function(){
return{'ovr':0x1,'text':"你不再单独追他，只守住身前那一块。他这场送出两次助攻，都不是从你这边过去的。赛后没人提起你——这也是一种赞美。"};
}
    }
  ]
},

{
  'id': "star_mid"+"_rodri",
  'title': "绞肉机",
  'icon': '🔄',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"mid"===p["posGroup"];
},
  'desc': "对面后腰是罗德里。上半场，他十二次把球从你脚下拿走，你一次都没能碰到他伸出来的那只脚。",
  'options': [
    {
        'label': "主动撞他的持球节奏",
        'p': function(p){
return f(0.45,[[p["ovr"],0x4c,0.01]],0.15,0.8);
},
        'hint': function(p,q){
return g(q,"把节奏搅乱了","被他遛了九十分钟");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x12,'roleDelta':0x1,'text':"下半场他从你这里丢了三脚球，脸上惯常的平静第一次有了波动。赛后他在通道里等你握手，说了句「你踢得越来越像样子了」。"}:{'ovr':-0x1,
'fame':0x4,'text':"他像一块会算步数的铁板，你每次上抢都扑空。终场哨响时你发现，自己这晚一次干净的铲断都没有。"};
}
    },
    {
        'label': "不跟他正面,站住位置",
        'hint': "稳,把活儿让给队友",
        'apply': function(){
return{'ovr':0x1,'text':"你退到两名中卫身前，他出球七十九次，没有一次穿过你这一层。赛后你的传球成功率是百分之九十八——没人注意，但你知道那很重要。"};
}
    }
  ]
},

{
  'id': "star_mid"+"_kevin",
  'title': "那脚直塞",
  'icon': '🎯',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"mid"===p["posGroup"];
},
  'desc': "对面中场是德布劳内。录像里他每脚直塞都贴着草皮穿过两名中卫，教练在战术板上圈了三次：别给他起脚的空间。",
  'options': [
    {
        'label': "赌他直塞的线路",
        'p': function(p){
return f(0.45,[[p["ovr"],0x4c,0.01],[p["age"],0x1b,-0.008]],0.15,0.8);
},
        'hint': function(p,q){
return g(q,"猜对了那条线","球从你腿间穿过");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x12,'roleDelta':0x1,'text':"你提前两步卡住那条线路，球刚到就被你捅给边路。他朝你点了点头。赛后他的数据里多了一次失误——那一次，是你。"}:{'ovr':-0x1,
'fame':0x4,'text':"他观察到你的站位，反手把球推给套边的边后卫，你的重心已经扔了出去。解说笑出声：「他骗了全世界，包括那个中国人。」"};
}
    },
    {
        'label': "切断他接球的线路",
        'hint': "脏活,没人看得见",
        'apply': function(){
return{'guanxi':0xa,'ovr':0x1,'text':"你整场贴着他最习惯的接球位，他被迫回撤拿球十七次。赛后教练只跟你说了一句话：今天他踢得不舒服，是你的功劳。"};
}
    }
  ]
},

{
  'id': "star_str"+"iker",
  'title': "另一头那个九号",
  'icon': '⚡',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"att"===p["posGroup"];
},
  'desc': "赛前热身，你在球场这头拉伸，哈兰德在另一头。所有的摄像机，都对着那一头。",
  'options': [
    {
        'label': "今晚就跟他比进球",
        'p': function(p){
return f(0.3,[[p["ovr"],0x4e,0.018],[p["roleRank"],0x3,0.04]],0.08,0.7);
},
        'hint': function(p,q){
return g(q,"你进得比他多","他梅开二度，你零"+'射正');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0x1e,'roleDelta':0x1,'text':"你打进两个，他一个。第二天，所有标题里都有你的名字——后面都跟着括号：「（对手：哈兰德）」。"}:{'ovr':-0x2,
'roleDelta':-0x1,'fame':0x6,'text':"他进了两个，你一脚射正都没有。混合区里他被围了三十分钟，你从他身后走过，没有人回头。"};
}
    },
    {
        'label': "老老实实做自己的"+'球',
        'hint': "不冒进，队友也认",
        'apply': function(){
return{'ovr':0x1,'guanxi':0x8,'text':"你回撤了很多，跑了十一公里，送出一个助攻。他进了三个。队长赛后说：今天全队只有你一个人在踢球。"};
}
    }
  ]
},

{
  'id': "star_att"+"_kylian",
  'title': "他起步的那一下",
  'icon': '⚡',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"att"===p["posGroup"];
},
  'desc': "对面是姆巴佩。他热身时随便一趟，三十米只用了四秒出头。你偷偷试了一次自己的起跑，然后决定今晚不跟他拼任何直线。",
  'options': [
    {
        'label': "跟他拼第一步",
        'p': function(p){
return f(0.3,[[p["ovr"],0x4e,0.018],[p["roleRank"],0x3,0.04]],0.08,0.7);
},
        'hint': function(p,q){
return g(q,"前三十米压住他","他超你两个身位");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0x1e,'roleDelta':0x1,'text':"前三十米你始终压着他半肩，他回头看了你一眼。赛后他在走廊里问你跑的什么路线——你说是高中田径队练的。"}:{'ovr':-0x2,
'roleDelta':-0x1,'fame':0x6,'text':"他一步就把你过了，你伸手去拉，没拉住。看台上响起一片起哄声，有人在喊你的号码，问你是不是卧底。"};
}
    },
    {
        'label': "放他走,守住第二落点",
        'hint': "不丢人,也护得住",
        'apply': function(){
return{'fame':0x2,'guanxi':0x6,'text':"你只贴他两步，第三步就回中路。他这场冲刺九次，只有一次真正形成射门，被门将没收。赛后报纸说你的防守叫「聪明的放弃」。"};
}
    }
  ]
},

{
  'id': "star_att"+"_kane",
  'title': "他背身那一块",
  'icon': '🛡️',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&"att"===p["posGroup"];
},
  'desc': "对面中锋是凯恩。他背身拿球的那一下，你想起教练说的那句话：跟他对位的中卫，没有一个能完整踢满九十分钟的。",
  'options': [
    {
        'label': "从身后绞住他",
        'p': function(p){
return f(0.3,[[p["ovr"],0x4e,0.018],[p["roleRank"],0x3,0.04]],0.08,0.7);
},
        'hint': function(p,q){
return g(q,"他一脚出球都没做成","他转身把你扛开");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x4,'fame':0x1e,'roleDelta':0x1,'text':"你从身后卡住他接球的左脚，他整场只有两次舒服转身。赛后他拍拍你的肩膀：「你比上一场那个后卫硬。」你不知道他记得你。"}:{'ovr':-0x2,
'roleDelta':-0x1,'fame':0x6,'text':"他把胸口停的球顺势一挑，从你头顶转了过去，你拉倒了他，吃到一张黄牌。他躺在地上朝你笑了笑，像什么都没发生。"};
}
    },
    {
        'label': "绕前,不让他起脚",
        'hint': "稳,把球放给对方",
        'apply': function(){
return{'clean':0x4,'ovr':0x1,'text':"你整场站在他身前，他拿到球的次数不多，但每次回做都让队友进了球。赛后没人夸你，因为比分不好看。你记得自己没有一次被他扛开。"};
}
    }
  ]
},

{
  'id': "star_tea"+"mmate",
  'title': "更衣室里那个位置",
  'icon': '👕',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&p["clubRep"]>=0x4;
},
  'desc': "球队官宣了一笔全欧洲都在谈的引援。介绍会那天，更衣室重新排了位置。你柜子旁边空着，管理员说那是留给他的。",
  'options': [
    {
        'label': "每天早到一小时，"+"跟着他练",
        'hint': "能力+4，钱-2"+'0',
        'apply': function(){
return{'ovr':0x4,'fame':0xa,'money':-0x14,'guanxi':0x6,'text':"他六点半到基地，你六点二十到。三个月，他只跟你说过两句完整的话，但你把他每次触球前的那半步都看会了。"};
}
    },
    {
        'label': "把位置和球权都让"+'出去',
        'hint': "地位-，但队里念"+"你的好",
        'apply': function(){
return{'roleDelta':-0x1,'guanxi':0xe,'clean':0x4,'text':"你主动改踢另一边，把最好的那块地方留给他。那个赛季你少进了六个球，球队多拿了一座奖杯。"};
}
    }
  ]
},

{
  'id': "star_shi"+'rt',
  'title': "赛后换球衣",
  'icon': '🔁',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4;
},
  'desc': "终场哨响，你朝中圈走去，想跟他换球衣。走到一半你发现，另外三个队友已经排在了前面。",
  'options': [
    {
        'label': "还是走过去",
        'hint': "名气+，被拍下来",
        'apply': function(){
return{'fame':0xc,'guanxi':0x4,'text':"他一眼认出你，把球衣先递了过来，说了句「中国来的那个」。那张照片在国内上了热搜第一，配文写着「他知道你」。"};
}
    },
    {
        'label': "转身回更衣室",
        'hint': "清白+，自己心里"+'有数',
        'apply': function(){
return{'clean':0x6,'ovr':0x1,'text':"你没有去。更衣室里，你把自己那件球衣塞进包里。下次见面，该是他先来找你换了。"};
}
    }
  ]
},

{
  'id': "star_pre"+'ss',
  'title': "记者的那个问题",
  'icon': '🎤',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&p["fame"]>=0x19;
},
  'desc': "赛后发布会，一个本地记者举手问：「你觉得自己有一天能踢到梅西那个级别吗？」整个房间都安静下来，等你开口。",
  'options': [
    {
        'label': "「我会努力」",
        'hint': "稳妥，谁也不得罪",
        'apply': function(){
return{'fame':0x4,'guanxi':0x6,'text':"你说了句标准答案。第二天，那段视频没有人转发。"};
}
    },
    {
        'label': "「我为什么不能」",
        'p': function(p){
return f(0.5,[[p["fame"],0x2d,0.006],[p["ovr"],0x4c,0.008]],0.2,0.82);
},
        'hint': function(p,q){
return g(q,"被当成硬气","被当成笑话");
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x1a,'guanxi':0x4,'ovr':0x1,'text':"话一说完，全场安静了两秒，然后有人鼓掌。那句话被印上了当地报纸头版。从那以后，你每场都得踢得像是说过那句话的人。"}:{'fame':-0x8,
'guanxi':-0x6,'text':"那句话被剪成十五秒，配着他的过人集锦传遍全世界。你花了两个赛季，才让人们不再提起它。"};
}
    }
  ]
},

{
  'id': "star_tra"+"ining",
  'title': "训练课上的一对一",
  'icon': '🥅',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&p["clubRep"]>=0x4;
},
  'desc': "小场对抗，分组分完，你发现自己这边站着莱万多夫斯基。教练吹哨前说：今天这块场地上，没有队友。",
  'options': [
    {
        'label': "往死里拼",
        'p': function(p){
return f(0.4,[[p["ovr"],0x4c,0.013]],0.12,0.75);
},
        'hint': function(p,q){
return g(q,"他记住了你","你受伤了");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'roleDelta':0x1,'guanxi':0x8,'text':"四十分钟，你一次都没让他舒服转身。收操时，他把手搭在你肩上，跟教练说了句什么。下一场，你首发。"}:{'ovr':-0x3,
'roleDelta':-0x1,'text':"最后一次拼抢，你落地的姿势不对，脚踝当场肿了起来。队医说三周，实际躺了七周。"};
}
    },
    {
        'label': "按训练量来",
        'hint': "不受伤，也不被记"+'住',
        'apply': function(){
return{'ovr':0x1,'text':"你跑完了教练要求的每一米，一次多余的拼抢都没有。收操时，他从你身边走过，没有停下来。"};
}
    }
  ]
},

{
  'id': "star_ucl",
  'title': "欧冠淘汰赛的那两"+'回合',
  'icon': '🌟',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&p["leagueRe"+'p']>=0x4&&p["hasCont"]&&p["roleRank"]>=0x3;
},
  'desc': "抽签结果出来，八分之一决赛的对手，是他所在的球队。国内转播在凌晨四点，所有人却说会熬夜看。",
  'options': [
    {
        'label': "把这两场当成自己"+"的决赛",
        'p': function(p){
return f(0.34,[[p["ovr"],0x4e,0.011],[p["fame"],0x2d,0.003]],0.1,0.72);
},
        'hint': function(p,q){
return g(q,"你成了那两回合的"+'主角',"被打成了背景板");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x22,'roleDelta':0x1,'mult':{'cont':1.5},'text':h(p,{'gk':"两回合你扑了九次"+"，次回合终场前那"+"个单刀你用腿封住"+"了，保住了平局。",'def':"两回合他一次没进"+"，次回合终场前那"+"次回追解围保住了"+"平局。",'other':"两回合你一球一助"+"攻，次回合终场前"+"那次回追解围保住"+"了平局。"})+("赛后欧足联官方社"+"媒发了你的名字，"+"国内的热搜挂了整"+"整一天。")}:{'ovr':-0x2,
'fame':0xa,'text':"两回合，总比分 1-6。他一个人参与了四个球。"+h(p,{'gk':"第六个球进的时候"+"你还坐在门线上没"+"起来，镜头给了你"+"很久，",'other':"你被换下的时候镜"+"头给了你很久，"})+("第二天那张脸出现"+"在所有的赛后总结"+'里。')};
}
    },
    {
        'label': "照平时那样踢",
        'hint': "不出彩，也不难看",
        'apply': function(){
return{'fame':0x8,'guanxi':0x6,'text':"你守住了自己那块，球队总比分输了一个球。回到更衣室，没有人指责谁。教练说：下一次，我们还会来。"};
}
    }
  ]
},

{
  'id': "star_sau"+'di',
  'title': "沙漠里的那些名字",
  'icon': '🏜',
  'weight': 0x96,
  'when': function(p){
return!p["inChina"]&&"spl"===p["leagueId"];
},
  'desc': "转会到这里的第一周你就发现，这个联赛里，到处是小时候在电视上见过的人。下一轮对手阵中，有三个金球奖得主，年纪都比你大。",
  'options': [
    {
        'label': "把他们当偶像",
        'hint': "名气+，钱+",
        'apply': function(){
return{'fame':0x12,'money':0x3c,'guanxi':0x6,'text':"赛后，你跟每个人都合了影，发回国内的社交平台。有人骂你没出息，更多人说，这就是他们想过的人生。"};
}
    },
    {
        'label': "把他们当对手",
        'p': function(p){
return f(0.46,[[p["ovr"],0x4a,0.012],[p["age"],0x1c,-0.012]],0.15,0.8);
},
        'hint': function(p,q){
return g(q,"你赢了那一场","被上了一课");
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x3,'fame':0x14,'roleDelta':0x1,'text':h(p,{'gk':"你把他那记必进的"+"任意球托了出去，"+"没有喊，只是把球"+"门框拍了一下。",'def':"你贴了他整场，他"+"一次也没射正，赛"+"后你把球衣换给了"+'他。','other':"你在他们面前打进"+"了制胜球，没有庆"+"祝，只是走回中圈"+'。'})+("第二天当地媒体的"+"标题是「中国人不"+"给面子」。")}:{'ovr':-0x1,
'fame':0x6,'text':"三十九岁的他跑不动了，可每次拿球，都知道该往哪儿传。"+h(p,{'gk':"那三个球全是从你"+"没想到的角度来的"+"，每一个你都动了"+"，每一个都晚了半"+'拍。','other':"你追了九十分钟，"+"追到的全是他刚离"+"开的位置。"})};
}
    }
  ]
},

{
  'id': "light_fi"+'fa',
  'title': "游戏里的自己",
  'icon': '🎮',
  'weight': 0x32,
  'tone': "light",
  'when': function(p){
return p["fame"]>=0x14;
},
  'desc': "那款足球游戏出了新版本，你的数值被砍了三点。评论区有人说：「这已经是抬举他了。」",
  'options': [
    {
        'p': function(p){return f(0.6,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "发条动态自嘲",
        'hint': function(p,q){return g(q,'名气+','被当成玻璃心');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0x8,'text':"你截图配了一句"+h(p,{'gk':"「反应 68 我"+"认，出击 61 "+"是谁定的」",'other':"「速度 68 我"+"认，射门 61 "+"是谁定的」"})+("。这条转了三万，"+"官方账号还回复了"+'你。')}:{'fame':-0x4,
'text':"有人把你的动态解读成「输不起」。你隔了两个小时删掉——删之前，它已经被搬到了另外三个平台。"};
}
    },
    {
        'label': "私下截了张图",
        'hint': "无变化",
        'apply': function(){
return{'text':"你把那页数值截下来，存进相册，谁也没发。那个文件夹里，已经躺了好几张。"};
}
    }
  ]
},

{
  'id': "light_nu"+"mber",
  'title': "十号球衣",
  'icon': '👕',
  'weight': 0x32,
  'tone': "light",
  'when': function(p){
return p["roleRank"]>=0x2&&p["seasonsA"+"tClub"]>=0x2;
},
  'desc': "队里那个穿十号的老队员离开了。号码空出来的第二天，装备经理来问你：要不要换。",
  'options': [
    {
        'label': '换',
        'hint': "名气+，关系-",
        'apply': function(){
return{'fame':0x9,'guanxi':-0x5,'text':"你换了。第一场穿十号的比赛，你踢得格外紧。赛后，一个小球迷举着写你名字的十号球衣，来找你签名。"};
}
    },
    {
        'label': "留着原来的号",
        'hint': "关系+",
        'apply': function(){
return{'guanxi':0x6,'text':"你说习惯了。更衣室里再没人提这事，但那天之后，大家看你的眼神里多了点别的东西。"};
}
    }
  ]
},

{
  'id': "light_ho"+"tpot",
  'title': "队内聚餐",
  'icon': "🍽️",
  'weight': 0x32,
  'tone': "light",
  'repeat': 0x2,
  'desc': "队友在群里组了个聚餐，说好了 AA。周一早上还有恢复训练。",
  'options': [
    {
        'label': "去，敞开了吃",
        'hint': "关系+，训练吃点亏",
        'apply': function(){
return{'guanxi':0x8,'ovr':-0x1,'money':-0x3,'text':"那顿吃到十一点半。第二天恢复训练你排在最后一组，体能教练看了你一眼，什么也没说。"};
}
    },
    {
        'label': "去，随便吃点",
        'hint': "关系+，无损失",
        'apply': function(){
return{'guanxi':0x4,'text':"你只点了杯水，陪坐了两个小时。队友笑了你一路，这事后来被写进了队内的段子库。"};
}
    },
    {
        'label': '不去',
        'hint': "无变化",
        'apply': function(){
return{'text':"你在宿舍点了份鸡胸肉。那晚群里两百多条消息，你一条都没回。"};
}
    }
  ]
},

{
  'id': "light_do"+'g',
  'title': "捡了只狗",
  'icon': '🐕',
  'weight': 0x32,
  'tone': "light",
  'desc': "训练基地门口趴着只狗，跟了你三天。门卫说，没人认领。",
  'options': [
    {
        'label': "带回去养",
        'hint': "花点钱，心态好",
        'apply': function(){
return{'money':-0x6,'ovr':0x1,'text':"你给它取名叫「越位」。此后三年，无论那天赢还是输，回家推开门，都是同一张脸在等你。"};
}
    },
    {
        'label': "托人找领养",
        'hint': "无变化",
        'apply': function(){
return{'text':"队医的表妹把它领走了。你偶尔会在朋友圈刷到它，长胖了不少。"};
}
    }
  ]
},

{
  'id': "light_we"+"dding",
  'title': "队友结婚",
  'icon': '💒',
  'weight': 0x32,
  'tone': "light",
  'repeat': 0x2,
  'desc': "同屋那位要结婚了。队里传的随礼数目一个比一个离谱。",
  'options': [
    {
        'label': "送份大的",
        'hint': "花钱，关系+",
        'apply': function(){
return{'money':-0xc,'guanxi':0x9,'text':"你送了一份全队第二大的礼。他后来在球队最难的那年，替你说过一次话——你到现在都不知道。"};
}
    },
    {
        'label': "按行情来",
        'hint': "小花销",
        'apply': function(){
return{'money':-0x4,'guanxi':0x3,'text':"你送了个不出挑的数，人到得比谁都早，帮着搬了一下午椅子。"};
}
    }
  ]
},

{
  'id': "light_ni"+"ckname",
  'title': '外号',
  'icon': '📣',
  'weight': 0x32,
  'tone': "light",
  'when': function(p){
return p["fame"]>=0xf;
},
  'desc': "看台上那帮人给你起了个外号——不算难听，也绝对不好听。横幅已经做出来了。",
  'options': [
    {
        'label': "认下来",
        'hint': "名气+",
        'apply': function(){
return{'fame':0x7,'text':"你在采访里主动用了那个外号。第二周，看台上出现了两百件印着它的自制 T 恤。"};
}
    },
    {
        'label': "装作没看见",
        'hint': "无变化",
        'apply': function(){
return{'text':"你一次都没提过它。它还是跟了你一辈子，连退役新闻的标题里都是它。"};
}
    }
  ]
},

{
  'id': "light_co"+'ok',
  'title': "自己做饭",
  'icon': '🍳',
  'weight': 0x32,
  'tone': "light",
  'when': function(p){
return!p["inChina"]&&p["seasonsA"+"broad"]>=0x1;
},
  'desc': "外面那家中餐馆吃了三个月，你决定自己做。第一次买菜，在超市货架前站了四十分钟——标签上一个字都不认识。",
  'options': [
    {
        'label': "认真学",
        'hint': "身体状态+",
        'apply': function(){
return{'ovr':0x1,'money':-0x4,'text':"两个月后，你已经能给三个队友做一锅像样的番茄牛腩。营养师看了一眼配料表，只说了一句：少放盐。"};
}
    },
    {
        'label': "叫外卖凑合",
        'hint': "无变化",
        'apply': function(){
return{'money':-0x6,'text':"你把那家亚洲超市的电话存进收藏夹。手机相册里，那张写满拼音的采购清单一直留着。"};
}
    }
  ]
},

{
  'id': "light_wi"+'fi',
  'title': "更衣室密码",
  'icon': '📶',
  'weight': 0x32,
  'tone': "light",
  'when': function(p){
return p["roleRank"]>=0x3;
},
  'desc': "更衣室的 WiFi 换了密码——新密码是队长的生日。队长说，以后谁想改，先拿一场最佳。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "赌一把",
        'hint': function(p,q){return g(q,'换成你的生日','白说一句');
},
        'apply': function(p,q,s){
return d(q,s)?{'guanxi':0x7,'fame':0x4,'text':"两周后你拿了最佳。密码改成你的生日，一直用到你离队那天，没人换过。"}:{'guanxi':-0x3,'text':"那个月，你一场最佳都没拿到。这事被念叨了整整一个赛季。"};
}
    },
    {
        'label': "记下来就行",
        'hint': "无变化",
        'apply': function(){
return{'text':"你把它存进备忘录，命名「别问」。三年后换了球队，你还背得出来。"};
}
    }
  ]
},

{
  'id': "nat_firs"+"tcall",
  'title': "国家队的电话",
  'icon': '📞',
  'weight': 0x3c,
  'when': function(p){
return p["caps"]>=0x1;
},
  'desc': "训练完，手机上有条未接来电，区号是北京。拨回去，那头只说了一句：下周一，香河报到，行李按十天准备。",
  'options': [
    {
        'label': "先给家里打电话",
        'hint': "名气+，这通电话"+"打了四十分钟",
        'apply': function(){
return{'fame':0xc,'guanxi':0x5,'ovr':0x1,'text':"你妈在那头沉默了很久，最后问的是「衣服够不够穿」。你爸在旁边一直咳嗽，什么也没说。"};
}
    },
    {
        'label': "谁也不说，先去加练",
        'hint': "能力+3",
        'apply': function(){
return{'ovr':0x3,'text':"你怕这事是假的，也怕说出去就黄了。名单公布那天，你正跑第四组折返跑。"};
}
    }
  ]
},

{
  'id': "nat_firs"+"tcall2",
  'title': "国家队的电话",
  'icon': '📞',
  'weight': 0x3c,
  'when': function(p){
return p["caps"]>=0x1;
},
  'desc': "更衣室手机震了三下，区号是北京。回过去，那头没报职位，先问了一句：「这几周膝盖怎么样？」你愣住——他连你上周的训练笔记都看过。",
  'options': [
    {
        'label': "如实说",
        'hint': "名气+，关系+",
        'apply': function(){
return{'fame':0xa,'guanxi':0x5,'text':"你说有一处老伤，但能踢。那头沉默两秒：「那正好，队里缺你这样的。」"};
}
    },
    {
        'label': "多讲两句最近的比赛",
        'hint': "能力+2，名气+",
        'apply': function(){
return{'ovr':0x2,'fame':0x6,'text':"你把自己最近两场的表现讲了讲，尽量说得平淡。挂电话时你才发现，手心全是汗。"};
}
    }
  ]
},

{
  'id': "nat_firs"+"tcall3",
  'title': "名单上的名字",
  'icon': '📋',
  'weight': 0x3c,
  'when': function(p){
return p["caps"]>=0x1;
},
  'desc': "名单贴在基地公告栏上。你路过时前面围了一堆人，有人回头看了你一眼，说：「有你。」你站住，又看了一遍。",
  'options': [
    {
        'label': "把那行看了三遍",
        'hint': "名气+，能力+",
        'apply': function(){
return{'fame':0x8,'guanxi':0x4,'ovr':0x1,'text':"你确认了三遍，名字没写错。那晚你给家里打电话，你爸只说了一句：别丢人。"};
}
    },
    {
        'label': "悄悄走开，自己消化",
        'hint': "能力+3",
        'apply': function(){
return{'ovr':0x3,'text':"你没在人堆里多待，拐进训练场。跑起来的时候，嘴角压不住。"};
}
    }
  ]
},

{
  'id': "nat_firs"+"tgoal",
  'title': "第一个国家队进球",
  'icon': "🇨🇳",
  'weight': 0x3c,
  'when': function(p){
return p["natGoals"]>=0x1;
},
  'desc': "球进的那一下你其实没看清。等反应过来，队友已经跑过了半场，正朝你冲来。",
  'options': [
    {
        'label': "跑向看台，对着那"+'面旗',
        'hint': "名气大涨",
        'apply': function(){
return{'fame':0x12,'ovr':0x1,'text':"那张照片后来印在很多地方。你自己留的那张是手机拍的——看台上一个举着旗的人，脸都糊了。"};
}
    },
    {
        'label': "捡球回中圈，比赛"+"还没完",
        'hint': "能力+3，队内威"+'望+',
        'apply': function(){
return{'ovr':0x3,'guanxi':0x8,'text':"解说说了一句「他没庆祝」。那场最后 1 比 1，你站在中圈等开球，始终没坐下。"};
}
    }
  ]
},

{
  'id': "nat_firs"+"tgoal2",
  'title': "那个进球",
  'icon': '⚽',
  'weight': 0x3c,
  'when': function(p){
return p["natGoals"]>=0x1;
},
  'desc': "队友直塞，球在你左脚内侧垫了一下，滚进门将够不到的那个角。你还没反应过来，哨声和欢呼一起到了。",
  'options': [
    {
        'label': "跑去角旗区滑跪",
        'hint': "名气大涨",
        'apply': function(){
return{'fame':0xf,'ovr':0x1,'text':"草皮吃了一小口，膝盖有点疼，但值。那张图后来做成表情包，你自己也存了一张。"};
}
    },
    {
        'label': "走回中圈，朝队友点头",
        'hint': "能力+3，队内威"+'望+',
        'apply': function(){
return{'ovr':0x3,'guanxi':0x6,'text':"你指了指给你助攻的人。那场赛后，他主动把比赛用球塞给你：留个纪念。"};
}
    }
  ]
},

{
  'id': "nat_firs"+"tgoal3",
  'title': "主场的那一下",
  'icon': "🇨🇳",
  'weight': 0x3c,
  'when': function(p){
return p["natGoals"]>=0x1;
},
  'desc': "主场，五万人。进球那一刻，声音像浪一样从身后卷过来，你整个人被按在原地，耳朵里只剩嗡嗡声。",
  'options': [
    {
        'label': "抬头，看台那面旗一直没停",
        'hint': "名气大涨",
        'apply': function(){
return{'fame':0x10,'text':"你知道那面旗举了很久了。赛后看台有人喊你的名字，你第一次没觉得不好意思。"};
}
    },
    {
        'label': "埋头跑回半场，比谁都镇定",
        'hint': "能力+3，队内威"+'望+',
        'apply': function(){
return{'ovr':0x3,'guanxi':0x5,'text':"老队员们笑你「面无表情」。只有你自己知道，回更衣室的路，你走了三遍才找到。"};
}
    }
  ]
},

{
  'id': "nat_qual"+"ifier",
  'title': "世预赛最后一轮",
  'icon': '🎫',
  'weight': 0x44,
  'repeat': 0x2,
  'when': function(p){
return p["caps"]>=0x5;
},
  'desc': "最后一轮。赢，还有一线机会；输，就是下一个四年。客场，八万人里坐着两千个中国球迷。",
  'options': [
    {
        'label': "全场压上去踢",
        'hint': "赌一把，国家队履"+"历跟着走",
        'apply': function(p,q){
return d(q,f(0.42,[[p["ovr"],0x48,0.012]],0.2,0.72))?{'caps':0x3,'fame':0x14,'ovr':0x2,'text':h(p,{'gk':"你在最后十分钟扑"+"出了一记必进球。"+"终场哨响时看台上"+"那两千人喊的是你"+"的名字。",'def':"你在最后十分钟把"+"对方前锋的那脚射"+"门挡了出去。终场"+"哨响时看台上那两"+"千人喊的是你的名"+'字。','other':"你在第 88 分"+"钟把球捅了进去。"+"终场哨响时看台上"+"那两千人喊的是你"+"的名字。"})}:{'fame':-0xa,
'caps':0x2,'text':"0 比 2。回程飞机上没人说话。落地，通道口有人喊「谢谢你们」，也有人喊了别的。"};
}
    },
    {
        'label': "先守住，别输太难"+'看',
        'hint': "稳，但这一届也就"+"到这儿了",
        'apply': function(){
return{'caps':0x2,'fame':-0x5,'guanxi':0x6,'text':"0 比 0。教练组称之为「务实的一分」。回国后，没有人再提这场球。"};
}
    }
  ]
},

{
  'id': "nat_anth"+'em',
  'title': '国歌',
  'icon': '🎼',
  'weight': 0x3e,
  'when': function(p){
return p["caps"]>=0x8;
},
  'desc': "大赛第一场，中圈线上唱国歌。左边的队友唱到一半哭了；右边那个，一个字都没张嘴。",
  'options': [
    {
        'label': "跟着唱完",
        'hint': "能力+2，名气+",
        'apply': function(){
return{'ovr':0x2,'fame':0x8,'text':"转播镜头正好扫过你。那个画面第二天被做成了很多张图，配的字你后来都看过。"};
}
    },
    {
        'label': "只想着待会儿的第"+"一脚球",
        'hint': "能力+3",
        'apply': function(){
return{'ovr':0x3,'text':"你满脑子都是对面那个左后卫的转身速度。开场第七分钟，你从他那一侧过了人。"};
}
    }
  ]
},

{
  'id': "nat_newc"+"oach",
  'title': "新国家队主帅",
  'icon': '📋',
  'weight': 0x40,
  'repeat': 0x2,
  'when': function(p){
return p["caps"]>=0xa;
},
  'desc': "又换帅了，这次来的是个外教。他带的第一期名单里没有你。助理教练私下说：「他喜欢跑得多的。」",
  'options': [
    {
        'label': "按他的要求改",
        'hint': "能力+3，重回名"+'单',
        'apply': function(){
return{'ovr':0x3,'caps':0x3,'text':"你把冬训的量加了三成，跑动数据发给了助教。第三期名单上你的名字排在最后一个——但它在。"};
}
    },
    {
        'p': function(p){return f(0.55,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "不改，等他下课",
        'hint': "赌他走得比你早",
        'odds': ["他先走","你先老"],
        'apply': function(p,q,s){
return d(q,s)?{'caps':0x4,'guanxi':0x8,'text':"他两年后就走了，走时战绩 3 胜 9 负。下一任的第一期名单，把你叫了回去。"}:{'fame':-0x8,'caps':0x0,'text':"他待了四年。四年里，你没在国家队上过一场。等他走的时候，你已经过了三十。"};
}
    }
  ]
},

{
  'id': "nat_capt"+"ain",
  'title': "国家队队长",
  'icon': "🎗️",
  'weight': 0x3a,
  'when': function(p){
return p["caps"]>=0x19&&p["ovr"]>=0x48&&!p["_ntCaptain"];
},
  'desc': "老队长退了。教练"+"组在赛前把袖标放"+"在你的柜子上，没"+"说话，也没问你愿"+"不愿意。",
  'options': [
    {
        'label': '戴上',
        'hint': "名气+，从此每场"+"输球都要你去说话",
        'apply': function(){
return{'fame':0x14,'caps':0x4,'guanxi':0xa,'ovr':0x1,'ntCaptain':!0x0,'text':"从那以后每场输球，混合采访区都是你去站。有一次你站了二十六分钟，回到更衣室，饭已经凉了。"};
}
    },
    {
        'label': "说给更合适的人",
        'hint': "能力+2，少一身"+'麻烦',
        'apply': function(){
return{'ovr':0x2,'guanxi':0x5,'text':"你说队里有人比你更会说话。那人戴了两年袖标，那些最难的问题，都由你来挡。"};
}
    }
  ]
},

{
  'id': "nat_natu"+"ralized",
  'title': "更衣室里的两种话",
  'icon': '🛬',
  'weight': 0x3c,
  'when': function(p){
return p["caps"]>=0x8;
},
  'desc': "国家队来了三个归化球员，战术会得配两个翻译。主教练布置定位球，讲一句，停一句。",
  'options': [
    {
        'label': "主动去跟他们练配"+'合',
        'hint': "能力+3，国家队"+"地位+",
        'apply': function(){
return{'ovr':0x3,'caps':0x3,'guanxi':0x6,'text':"每天训练后你多留半小时，跟他们跑那几条线路。三个月后，那套战术是全队唯一练熟的东西。"};
}
    },
    {
        'label': "各踢各的",
        'hint': "无变化，但那届大"+"赛踢得很散",
        'apply': function(){
return{'caps':0x2,'fame':-0x4,'text':"场上传球总是慢半拍。赛后媒体统计，那场全队的传球成功率，小组垫底。"};
}
    }
  ]
},

{
  'id': "nat_west"+"asia",
  'title': "西亚客场",
  'icon': "🏜️",
  'weight': 0x3e,
  'repeat': 0x2,
  'when': function(p){
return p["caps"]>=0x5;
},
  'desc': "客场打西亚，开球是当地凌晨零点。整场有人拿激光笔照你们。第 70 分钟，主队球迷开始往场里扔东西。",
  'options': [
    {
        'label': "踢完它",
        'hint': "能力+2，名气+",
        'apply': function(p){
return{'ovr':0x2,'fame':0xa,'caps':0x2,'text':h(p,{'gk':"你被激光笔照了整"+"整四十分钟，还是"+"把那记远射按在了"+"地上。赛后你眼睛"+"红得睁不开。",'other':"你被激光笔照了整"+"整四十分钟。终场"+"哨响你第一个走向"+"客场看台，鞠了个"+'躬。'})};
}
    },
    {
        'p': function(p){return f(0.5,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "带头去找裁判",
        'hint': function(p,q){return g(q,'中止比赛','一张黄牌');
},
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xc,'caps':0x2,'text':"裁判把比赛中断了八分钟。那八分钟，你们全队站在中圈，谁也没坐下。"}:{'banGames':0x1,'fame':0x4,'text':"裁判给了你一张黄牌，理由是「异议」。下一场，你停赛。"};
}
    }
  ]
},

{
  'id': "nat_derb"+'y',
  'title': "那场球",
  'icon': '⚔️',
  'weight': 0x42,
  'repeat': 0x2,
  'when': function(p){
return p["caps"]>=0xa;
},
  'desc': "对日本还是对韩国，这些年已经没什么区别了——赛前所有人只说一句「至少别输太多」。",
  'options': [
    {
        'label': "把这场当决赛踢",
        'hint': "拼一场，赢了这辈"+"子都有人记得",
        'apply': function(p,q){
return d(q,f(0.3,[[p["ovr"],0x4a,0.011]],0.12,0.62))?{'fame':0x19,'ovr':0x2,'caps':0x3,'text':h(p,{'gk':"你扑掉了那记点球"+"。那一晚全国的社"+"交平台都在放同一"+"段十秒的视频。",'def':"你在最后一分钟把"+"对方那记必进的射"+"门封了下来。那一"+"晚全国的社交平台"+"都在放同一段十秒"+"的视频。",'other':"你打进了那个球。"+"那一晚全国的社交"+"平台都在放同一段"+"十秒的视频。"})}:{'fame':-0x8,
'caps':0x2,'ovr':0x1,'text':"0 比 3。你跑了 11.8 公里，全队最多。这个数字，第二天没人提。"};
}
    },
    {
        'label': "保存体力，还有联"+'赛',
        'hint': "俱乐部那头受益，"+"名气-",
        'apply': function(){
return{'roleDelta':0x1,'fame':-0xc,'caps':0x1,'text':"六十分钟你就被换下了。回俱乐部，你连着三场首发。没人再问你国家队的事。"};
}
    }
  ]
},

{
  'id': "nat_hurt",
  'title': "带着伤去报到",
  'icon': '🩼',
  'weight': 0x3c,
  'repeat': 0x2,
  'when': function(p){
return p["caps"]>=0xa;
},
  'desc': "脚踝还肿着，队医说再养两周就好。国家队那边，这一期是大赛前最后一次集训。",
  'options': [
    {
        'p': function(p){return f(0.55,[[p["ovr"],60,0.008]],0.2,0.9);
},
        'label': "打封闭去",
        'hint': "国家队履历+，能"+"力有风险",
        'odds': ["扛过去了","伤上加伤"],
        'apply': function(p,q,s){
return d(q,s)?{'caps':0x5,'fame':0xc,'guanxi':0x8,'text':"你打了三针，两场都踢满。回俱乐部那天走路还有点跛，可大赛名单上有你。"}:{'ovr':-0x4,'caps':0x2,'roleDelta':-0x1,
'text':"第二场，三十分钟你就下来了。那只脚踝后来疼了整整一年，阴雨天尤其厉害。"};
}
    },
    {
        'label': "跟国家队请假",
        'hint': "养好了，但这一期"+"名单没你",
        'apply': function(){
return{'ovr':0x2,'guanxi':-0xa,'fame':-0x6,'text':"你在俱乐部养了两周。名单公布那天，你坐在电视前一个个看过去——没有你。"};
}
    }
  ]
},

{
  'id': "nat_camp",
  'title': "长期集训",
  'icon': "🏕️",
  'weight': 0x3a,
  'when': function(p){
return p["caps"]>=0x5&&p["inChina"];
},
  'desc': "足协定了：大赛前封闭集训四个月，联赛为此让路。俱乐部的教练在电话里问你：「你是我的球员，还是他们的？」",
  'options': [
    {
        'label': "去集训",
        'hint': "国家队履历+，队"+"内地位受损",
        'apply': function(){
return{'caps':0x6,'roleDelta':-0x2,'fame':0x8,'text':"四个月里你打了十四场热身赛，对手大多没听说过。回俱乐部那天，你的号码已经归了别人。"};
}
    },
    {
        'label': "找理由留在俱乐部",
        'hint': "地位保住，国字号"+"的门关一半",
        'apply': function(){
return{'roleDelta':0x1,'guanxi':-0xc,'fame':-0x8,'text':"你交了一份体检报告。那一年的国家队名单上，再没有你的名字——直到换帅。"};
}
    }
  ]
},

{
  'id': "nat_bus",
  'title': "机场那道通道",
  'icon': '🚌',
  'weight': 0x38,
  'repeat': 0x2,
  'when': function(p){
return p["caps"]>=0x8;
},
  'desc': "又输了一场不该输的球。凌晨落地，出口通道两边站满了人——有举横幅的，有只是站着看的。",
  'options': [
    {
        'p': function(p){return f(0.5,[[p["fame"],25,0.01]],0.2,0.9);
},
        'label': "摘掉耳机走过去",
        'hint': "名气有涨有跌",
        'apply': function(p,q,s){
return d(q,s)?{'fame':0xc,'ovr':0x1,'text':"你走得很慢，始终没低头。一个小孩隔着栏杆递过来一张纸，上面画着球场。"}:{'fame':-0xa,'text':"有人喊了一句很难听的话。你站住，看了他两秒。那两秒，后来被传了三百万次。"};
}
    },
    {
        'label': "跟着大巴从侧门走",
        'hint': "名气-，心里清净",
        'apply': function(){
return{'fame':-0x6,'ovr':0x1,'text':"俱乐部的车等在侧门。你在车上睡了四十分钟——那半个月，睡得最沉的一觉。"};
}
    }
  ]
},

{
  'id': "nat_kid",
  'title': "看台上那件球衣",
  'icon': '👕',
  'weight': 0x36,
  'when': function(p){
return p["caps"]>=0xf&&p["fame"]>=0x23;
},
  'desc': "热身时，看台第一排坐着个孩子，穿着国家队球衣，背后印着你的号码和名字。",
  'options': [
    {
        'label': "赛后把球衣给他",
        'hint': "名气+",
        'apply': function(){
return{'fame':0xf,'ovr':0x1,'text':"他哭了。他爸妈在旁边一个劲儿道谢。那件球衣，是那个赛季你唯一没留下的。"};
}
    },
    {
        'label': "记住这件事",
        'hint': "能力+3",
        'apply': function(){
return{'ovr':0x3,'text':"从那以后，国家队的每一场你都跑到抽筋。为什么，你没跟任何人说过。"};
}
    }
  ]
},

{
  'id': "nat_quit",
  'title': "退出国家队",
  'icon': "🕊️",
  'weight': 0x3c,
  'stage': "vet",
  'when': function(p){
return p["caps"]>=0x14&&p["age"]>=0x20;
},
  'desc': "新一期名单里还有你，可你知道自己跟不上那个节奏了。训练里，年轻人一次次从你身边过去，一次比一次快。",
  'options': [
    {
        'label': "打完这一届再说",
        'hint': "国家队履历+，身"+"体吃不消",
        'apply': function(){
return{'caps':0x6,'fame':0xa,'ovr':-0x2,'text':"你又打了一年。最后一场，客场，输了。你踢满九十分钟，赛后一个人在场地中间站了很久。"};
}
    },
    {
        'label': "发一条声明",
        'hint': "把位置让出去，名"+'气+',
        'apply': function(){
return{'fame':0xe,'guanxi':0x6,'ovr':0x1,'text':"你写了三百来字，最后一句是「这件球衣我穿了很多年，现在该给别人穿了」。那条消息下面，有十万条评论。"};
}
    }
  ]
},

{
  'id': "love_fir"+'st',
  'title': "有人在等你",
  'icon': '💬',
  'weight': 0x37,
  'when': function(p){
return!p["hasPartn"+'er'];
},
  'desc': "训练完，手机上有好几条消息，来自不同的人。你在更衣室门口站了很久，没有一条是关于球的。",
  'rndPick': 0x3,
  'pool': [{'label':"老家从小一起踢球的",'hint':"青梅竹马，天赋+",'apply':function(){
return{'partner':"青梅竹马",'ovr':0x1,'talent':0.02,'guanxi':0x4,'text':"你们八岁就认识。那时候她比你还敢往人堆里冲。她说这些年你的比赛，一场都没落。"};
}},{'label':"队里的康复师",'hint':"天天见面的那个人，伤病-15%",'apply':function(){
return{'partner':"队里的康复师",'ovr':0x2,'health':0.85,'text':"她给你处理了两年脚踝，知道你每一处旧伤。第一次约饭，她开口第一句：「今天别喝冰的。」"};
}},{'label':"评论区里那个总在"+'的人','hint':"镜头那头的，伤病少一点",'apply':function(){
return{'partner':"屏幕那头的人",'fame':0xa,'money':-0x14,'health':0.95,'text':"她做美食账号，粉丝比你多。见面那天，她把手机反扣在桌上，说今天不拍。"};
}},{'label':"客场看台上每场都来的那个球迷",'hint':"你一直记得她，激励加练",'apply':function(){
return{'partner':"那个客场球迷",'fame':0x8,'money':-0xa,'talent':0.01,'text':"她跟着你们队去每一个客场，举一块手写的灯牌。第一次搭话，她把灯牌转过来，背面写着你的生日。"};
}},{'label':"写了你三年的跟队记者",'hint':"她比你先知道转会，场上更自律",'apply':function(){
return{'partner':"那位跟队记者",'fame':0x8,'guanxi':0x2,'ovr':0x1,'text':"她写过你从梯队到现在每一篇。约饭那天她说：「你转会的消息，是我第一个写的，那时候你还在国少。」"};
}},{'label':"国家队队友的妹妹",'hint':"更衣室门口见过几次，伤病少一点",'apply':function(){
return{'partner':"队友的妹妹",'guanxi':0x6,'fame':0x3,'health':0.9,'text':"她在国家队看台上看了你三年。介绍人说，她总问「这场他上了吗」。你第一次觉得，有人比你自己还惦记你上不上场。"};
}},{'label':"游戏里经常开黑的那个网友",'hint':"那个抢你位置的辅助，状态更好",'apply':function(){
return{'partner':"那个游戏搭子",'fame':0x5,'money':-0xf,'ovr':0x1,'text':"你们一起打了四年排位，她一直不知道你踢球。面基那天，她盯着你看了半天：「你……不就是那个国家队……」你请她吃了顿火锅，堵住她的嘴。"};
}}],
  'single': {'label':"现在只想踢球",'hint':"能力+3",'apply':function(){
return{'ovr':0x3,'text':"那些消息，你一条都没回。那年冬训你是全队跑得最多的，总结会上教练点了你的名。"};}},
},

{
  'id': "love_lat"+'e',
  'title': "三十岁那年",
  'icon': '🍵',
  'weight': 0x46,
  'when': function(p){
return!p["hasPartn"+'er']&&p["age"]>=0x1d;
},
  'desc': "又一年冬歇，家里安排了个饭局。对方是牙医，坐下第一句：「你们踢球的，膝盖是不是都不太好？」",
  'options': [
    {
        'label': "试试看",
        'hint': "有个人了",
        'apply': function(){
return{'partner':"那位牙医",'ovr':0x1,'money':-0x1e,'text':"第二次见面，她把你的旧片子翻了一遍，说不归她管，但她认识人。你笑了很久。"};
}
    },
    {
        'label': "还是算了",
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'text':"你说自己这几年跑来跑去，怕耽误人家。回去的路上下了雪，你一个人走了两站地。"};
}
    }
  ]
},

{
  'id': "love_onl"+"ine",
  'title': "直播间",
  'icon': '📱',
  'weight': 0x46,
  'when': function(p){
return!p["hasPartn"+'er']&&p["fame"]>=0x2d;
},
  'desc': "一个百万粉丝的主播在直播里说你是她的偶像。第二天，她的助理联系了你的经纪人。",
  'options': [
    {
        'label': "见一面",
        'hint': "名气大涨，也会有"+"别的东西跟着来",
        'apply': function(){
return{'partner':"那位主播",'fame':0x16,'money':0x78,'ovr':-0x1,'text':"你们的合照第二天传得到处都是。评论里一半在祝福，一半在算她的粉丝值多少钱。"};
}
    },
    {
        'label': "让经纪人回绝",
        'hint': "清静，名气-",
        'apply': function(){
return{'fame':-0x5,'ovr':0x2,'text':"经纪人说，这种流量不要白不要。你说，你要的不是这种。"};
}
    }
  ]
},

{
  'id': "love_lon"+"gdistanc"+'e',
  'title': '时差',
  'icon': "🕰️",
  'weight': 0x34,
  'repeat': 0x2,
  'when': function(p){
return p["hasPartn"+'er']&&!p["inChina"];
},
  'desc': "你这边是训练完的下午，她那边是凌晨三点。这个月的通话记录：四次，最长的一次十一分钟。",
  'options': [
    {
        'label': "让她过来",
        'hint': "花钱，两个人都稳",
        'apply': function(){
return{'money':-0x50,'ovr':0x2,'guanxi':0x5,'text':"她辞了那边的工作搬了过来。头半年，这座城市里她没有半个熟人，每天只等你训练完回家。"};
}
    },
    {
        'p': function(p){return f(0.55,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "先这样，等赛季结"+'束',
        'hint': "能力+2，感情有"+'风险',
        'odds': ["撑住了","撑不住"],
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'text':"你们撑过了那个赛季。后来她说，那半年你每场比赛的重播，她一场都没落下。"}:{'split':!0x0,'ovr':-0x2,'fame':-0x4,'text':"最后一次通话，她说：「我不是不理解，我就是累了。」挂断之后，你在阳台上站到天亮。"};
}
    }
  ]
},

{
  'id': "love_pro"+"pose",
  'title': '戒指',
  'icon': '💍',
  'weight': 0x82,
  'when': function(p){
return p["hasPartn"+'er']&&!p["married"]&&p["partnerY"+"ears"]>=0x2;
},
  'desc': "在一起几年了，两边家里都在问。冬歇期只有十九天，真要办婚礼，蜜月就得砍掉。",
  'options': [
    {
        'label': "求婚，冬歇期办",
        'hint': "结婚，花钱，心气"+'稳',
        'apply': function(){
return{'marry':!0x0,'money':-0x96,'ovr':0x2,'fame':0xc,'text':"婚礼在老家办，来了三十几桌。队友来了七个，教练发了条语音：别耽误一月八号的集训。"};
}
    },
    {
        'label': "等退役再说",
        'hint': "能力+2，但这话"+"说了好几年了",
        'apply': function(){
return{'ovr':0x2,'text':"你说，等踢完这个合同。她说好。这句「等踢完这个合同」，你后来又说了两次。"};
}
    }
  ]
},

{
  'id': "love_kid"+"_first",
  'title': "第一个孩子",
  'icon': '🍼',
  'weight': 0x82,
  'repeat': 0x2,
  'when': function(p){
return p["married"]&&0x0===p["kids"];
},
  'desc': "预产期落在赛季中段，正好撞上客场三连战。俱乐部说，可以特批你回去一趟。",
  'options': [
    {
        'label': "赶回去",
        'hint': "错过一场比赛，但"+"你在场",
        'apply': function(){
return{'kid':!0x0,'roleDelta':-0x1,'fame':0x8,'ovr':0x1,'text':"你落地时，孩子已经出生四十分钟。护士把他递过来，你手一直在抖，没敢用力。"};
}
    },
    {
        'label': "打完再回",
        'hint': "队内地位+，这件"+"事会记很多年",
        'apply': function(){
return{'kid':!0x0,'roleDelta':0x1,'ovr':-0x1,'guanxi':0x5,'text':"那场你打满全场，还助攻了一个。视频里她没生气，只是很累。这件事，她后来只提过一次。"};
}
    },
    {
        'label': "这两年先不要",
        'hint': "能力+3，这事以"+"后再说",
        'apply': function(){
return{'ovr':0x3,'text':"你说，等这份合同踢完。她把体检报告收进抽屉，那个抽屉，后来再没打开过。"};
}
    }
  ]
},

{
  'id': "love_kid"+"_night",
  'title': "夜里三点",
  'icon': '🌙',
  'weight': 0x32,
  'repeat': 0x2,
  'when': function(p){
return p["kids"]>=0x1;
},
  'desc': "孩子六个月，一晚上要醒三次。第二天有比赛，队医说你的深睡掉到了两个多小时。",
  'options': [
    {
        'label': "请个月嫂",
        'hint': "花钱，睡得着",
        'apply': function(){
return{'money':-0x3c,'ovr':0x2,'text':"那半年，你每天都能睡满八小时。有人说你花钱买觉，你说这是这辈子最值的一笔。"};
}
    },
    {
        'label': "自己扛",
        'hint': "能力-，但那几个"+"月你都在",
        'apply': function(){
return{'ovr':-0x3,'fame':0x5,'text':"有一场你在替补席上睡着了，被队友拍醒。那个赛季，是你出场以来数据最差的一年。"};
}
    }
  ]
},

{
  'id': "love_kid"+"_second",
  'title': '老二',
  'icon': '👶',
  'weight': 0x2e,
  'when': function(p){
return p["married"]&&p["kids"]>=0x1&&p["age"]>=0x1c;
},
  'desc': "老大四岁了，家里问，要不要再要一个。你的合同还有两年，下一站在哪儿，谁也不知道。",
  'options': [
    {
        'label': "再要一个",
        'hint': "又一个孩子",
        'apply': function(){
return{'kid':!0x0,'money':-0x32,'fame':0x6,'ovr':0x1,'text':"老二出生那天，你在客场。回来时，老大趴在婴儿床边不肯走，说这是他的。"};
}
    },
    {
        'label': "等安顿下来再说",
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'text':"你说，等合同定下来。等那份合同签完，你们已经搬了两次家。"};
}
    }
  ]
},

{
  'id': "love_kid"+"_watch",
  'title': "看台上的那两个",
  'icon': "🎟️",
  'weight': 0x30,
  'when': function(p){
return p["kids"]>=0x1;
},
  'desc': "孩子第一次来现场看你踢球。开场十分钟，他睡着了，醒来第一句是「什么时候能吃薯条」。",
  'options': [
    {
        'label': "赛后带他上草皮",
        'hint': "名气+，能力+",
        'apply': function(){
return{'fame':0xa,'ovr':0x2,'text':"他在中圈跑了两圈，摔了一跤，爬起来接着跑。那张照片后来是你手机的锁屏，一直没换。"};
}
    },
    {
        'label': "让他先回家睡",
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'text':"他在车上睡着了，手里还攥着那张票。后来那张票，被夹进了家里的相册。"};
}
    }
  ]
},

{
  'id': "love_kid"+"_ball",
  'title': "他也想踢球",
  'icon': '⚽',
  'weight': 0x32,
  'stage': "vet",
  'when': function(p){
return p["kids"]>=0x1&&p["age"]>=0x21;
},
  'desc': "孩子说想进梯队。那条路有多少人走不到头，你比谁都清楚——你自己就是从那儿爬上来的。",
  'options': [
    {
        'label': "送他去",
        'hint': "名气+，你知道自"+"己在做什么",
        'apply': function(){
return{'fame':0xc,'ovr':0x1,'money':-0x28,'text':"报名表是你填的，教练那一栏，写着你自己的名字。他在队里第一次被换下时哭了，你在车里等他，没下车。"};
}
    },
    {
        'label': "让他先把书念完",
        'hint': "能力+2",
        'apply': function(){
return{'ovr':0x2,'clean':0x4,'text':"你跟他说，先把书念完，真喜欢的话，什么时候都来得及。这话，当年也有人跟你说过，你没听。"};
}
    }
  ]
},

{
  'id': "love_inl"+'aw',
  'title': "岳父的意思",
  'icon': '🏠',
  'weight': 0x2c,
  'when': function(p){
return p["married"];
},
  'desc': "回老家吃饭，岳父绕了三圈才说到正题：老家的房子该换了，弟弟结婚也差一笔。",
  'options': [
    {
        'label': "掏这笔钱",
        'hint': "花一大笔，关系+",
        'apply': function(){
return{'money':-0xdc,'guanxi':0xa,'ovr':0x1,'text':"钱转过去的当天，他发了条动态，配图是新房的钥匙。你老婆一句话没说，晚上给你多盛了碗汤。"};
}
    },
    {
        'label': "说清楚",
        'hint': "省下钱，家里几年"+"不太自在",
        'apply': function(){
return{'ovr':0x2,'guanxi':-0xa,'fame':-0x4,'text':"你把这些年的账摊开说了一遍。那顿饭，后来没人再说话，电视一直开着。"};
}
    }
  ]
},

{
  'id': "love_pap"+"arazzi",
  'title': '代拍',
  'icon': '📷',
  'weight': 0x2e,
  'repeat': 0x2,
  'when': function(p){
return p["hasPartn"+'er']&&p["fame"]>=0x32;
},
  'desc': "有人在你住处楼下蹲了三天。照片发出来时，配的文字跟照片上的事，没有半点关系。",
  'options': [
    {
        'label': "发律师函",
        'hint': "花钱，名气+",
        'apply': function(){
return{'money':-0x3c,'fame':0xa,'clean':0x5,'text':"对方删了帖，也道了歉。三个月后，另一个号又发了同样的图。你这才知道，这事没有尽头。"};
}
    },
    {
        'label': "带她换个地方住",
        'hint': "花钱，清静",
        'apply': function(){
return{'money':-0xb4,'ovr':0x2,'text':"新家在城郊，通勤多了四十分钟。她说，这四十分钟换来的，是能自己下楼扔垃圾。"};
}
    }
  ]
},

{
  'id': "love_mov"+'e',
  'title': "她的工作",
  'icon': '✈️',
  'weight': 0x30,
  'when': function(p){
return p["hasPartn"+'er']&&p["partnerY"+"ears"]>=0x2;
},
  'desc': "你这边谈着新合同，她那边刚升了职。两座城市之间，隔着两千公里，或者一片海。",
  'options': [
    {
        'label': "让她跟着走",
        'hint': "你的路顺，她的断"+'了',
        'apply': function(){
return{'ovr':0x2,'roleDelta':0x1,'text':"她辞了职，跟你搬了过来。第二年，她在这边重新开始，从助理做起。这件事，你们再没聊过。"};
}
    },
    {
        'label': "你留下",
        'hint': "地位受损，家里稳",
        'apply': function(){
return{'roleDelta':-0x2,'ovr':0x1,'guanxi':0x6,'text':"你续了一份不算好的合同，条件是留下来。那年出场时间少了一半，但每天都能回家吃饭。"};
}
    },
    {
        'p': function(p){return f(0.5,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "各走各的",
        'hint': function(p,q){return g(q,'撑住','就这么散了');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'fame':0x4,'text':"你们靠航班表过了两年。她说，这样也挺好，两个人都没停下。"}:{'split':!0x0,'ovr':-0x2,'money':-0x3c,'text':"分开是她先提的，说得很平静。东西分两次搬走，第二次，你没在家。"};
}
    }
  ]
},

{
  'id': "love_ann"+'iv',
  'title': "纪念日那天有客场",
  'icon': '🎂',
  'weight': 0x2c,
  'repeat': 0x2,
  'when': function(p){
return p["married"];
},
  'desc': "结婚纪念日撞上客场。上一次撞上，是三年前——那次，你也没在。",
  'options': [
    {
        'label': "让队医报个小伤",
        'hint': "在家，队内地位受"+'损',
        'apply': function(){
return{'roleDelta':-0x1,'ovr':0x1,'guanxi':0x5,'text':"你在家做了顿饭，做糊了。她说，这是这些年最好的一个纪念日。"};
}
    },
    {
        'label': "照常走",
        'hint': "队内地位+，回来"+'补',
        'apply': function(){
return{'roleDelta':0x1,'ovr':0x1,'text':"你在酒店给她订了花，卡片上的字，是队里翻译帮你写的。她收到时，正在加班。"};
}
    }
  ]
},

{
  'id': "love_spl"+'it',
  'title': "说不下去了",
  'icon': '🥀',
  'weight': 0x2a,
  'when': function(p){
return p["hasPartn"+'er']&&p["partnerY"+"ears"]>=0x4;
},
  'desc': "这半年，你们几乎没吵过架——因为已经没什么可说的了。她把话摊开那天，你正准备去队里报到。",
  'options': [
    {
        'p': function(p){return f(0.45,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'label': "试着修一修",
        'hint': function(p,q){return g(q,'修回来了','拖着更难看');
},
        'apply': function(p,q,s){
return d(q,s)?{'ovr':0x2,'guanxi':0x5,'text':"你们去做过几次咨询，也一起出去待了两周。回来后她说，那两周是这几年最像样的日子。"}:{'split':!0x0,'ovr':-0x3,'money':-0x12c,
'fame':-0x6,'text':"拖了一年半，最后还是签了字。财产分割那天你迟到了——队里加练。"};
}
    },
    {
        'label': "好好散",
        'hint': "花一笔，各自往前"+'走',
        'apply': function(){
return{'split':!0x0,'money':-0x104,'ovr':-0x1,'fame':0x4,'text':"你们一起吃了顿饭，才去办的手续。她说，以后你的比赛她还是会看。你说，好。"};
}
    }
  ]
},

{
  'id': "love_bac"+"khome",
  'title': "退役以后干什么",
  'icon': "🛋️",
  'weight': 0x2c,
  'stage': "vet",
  'when': function(p){
return p["hasPartn"+'er']&&p["age"]>=0x22;
},
  'desc': "她第一次认真问你，退役以后想干什么。你发现，从十二岁起你就没想过这个问题。",
  'options': [
    {
        'label': "去考教练证",
        'hint': "退役后有出路",
        'apply': function(){
return{'coachCert':!0x0,'ovr':-0x1,'money':-0x28,'text':"你利用赛季间隙上了课。考试那天，你紧张得像是回到十六岁那年的选拔赛。"};
}
    },
    {
        'label': "先把这个赛季踢完",
        'hint': "能力+3",
        'apply': function(){
return{'ovr':0x3,'text':"你说，等踢不动了自然就知道了。她没再问。这个问题，后来是你自己在一个夜里想起来的。"};
}
    }
  ]
},

{
  'id': "youth_night",
  'title': "熄灯后的球场",
  'icon': '🌙',
  'weight': 0x34,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "熄灯前十分钟，你抱着球溜回训练场。路灯刚好照到禁区线——够练一百脚。",
  'options': [
    {
        'label': "加练到门卫来赶",
        'p': function(p){return f(0.35,[[p["talent"],1,0.25]],0.2,0.65);
},
        'hint': function(p,q){return g(q,"球感大涨","白练一夜");
},
        'apply': function(p,q,s){return d(q,s)?{'talent':0.02,'text':"第一百脚，落点终于贴地。门卫的脚步声响起时，你刚好收球。"}:{'text':"第二天晨训你站着都想睡。教练盯着你看了三秒，什么也没说。"};
}
    },
    {
        'label': "早点睡",
        'hint': "能力+1",
        'apply': function(){return{'ovr':0x1,'text':"睡眠也是训练的一部分。第二天状态正好，教练多给了你一组对抗。"};
}
    }
  ]
},

{
  'id': "youth_watch",
  'title': "高手的慢动作",
  'icon': '🎬',
  'weight': 0x30,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "录像室循环放着一球：接球、转身、抹过两个人。教练说，看懂这一下，比练十脚有用。",
  'options': [
    {
        'label': "重看二十遍",
        'p': function(p){return f(0.4,[[p["talent"],1,0.25]],0.2,0.7);
},
        'hint': function(p,q){return g(q,"悟到了","走神了");
},
        'apply': function(p,q,s){return d(q,s)?{'talent':0.015,'ovr':0x1,'text':"第二十遍，你终于看清那只脚是怎么踩的。第二天训练你照着来了一次，教练没说话，但点了点头。"}:{'ovr':-0x1,
'text':"看到第十遍你就走了神。第二天教练抽查，你一句话答不上来。"};
}
    },
    {
        'label': "去操场练",
        'hint': "能力+2",
        'apply': function(){return{'ovr':0x2,'text':"看不如练。你把录像时间换成了两组变向，教练没拦。"};
}
    }
  ]
},

{
  'id': "youth_ballfeel",
  'title': "睡前颠球",
  'icon': '⚽',
  'weight': 0x2e,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "宿舍熄灯，你枕边放着一只球。室友翻身时，你悄悄下了床。",
  'options': [
    {
        'label': "下床颠两百个",
        'p': function(p){return f(0.3,[[p["talent"],1,0.3]],0.15,0.6);
},
        'hint': function(p,q){return g(q,"球感大涨","差点吵醒室友");
},
        'apply': function(p,q,s){return d(q,s)?{'talent':0.02,'text':"两百个后你停住了。那种球贴着脚的感觉，你第一次不靠蒙。"}:{'text':"第一百零三个，球滚进了床底。你趴着捞球，被室友的夜灯照了个正着。"};
}
    },
    {
        'label': "躺平",
        'hint': "没有变化",
        'apply': function(){return{'text':"你选择好好睡觉。梦里，你在决赛补时打进了致胜球。"};
}
    }
  ]
},

{
  'id': "youth_skills",
  'title': "基本功补课",
  'icon': '🦶',
  'weight': 0x38,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "青训教练把你划进了补课名单：左脚传球、一脚出球、护球转身，每周三次。",
  'options': [
    {
        'label': "全部按要求来",
        'p': function(p){return f(0.5,[[p["talent"],1,0.3]],0.3,0.75);
},
        'hint': function(p,q){return g(q,"能力+2","越练越别扭");
},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'text':"补课结束那周，对抗赛你被放进了首发。一脚出球，全队节奏都顺了。"}:{'ovr':-0x1,'text':"越练越别扭，左脚那一脚至今还是歪的。你把这归咎于补课时间不够。"};
}
    },
    {
        'label': "找教练改单练",
        'hint': "能力+1",
        'apply': function(){return{'ovr':0x1,'text':"你提了意见，教练改了单子。一对一的那几天，你进步明显。"};
}
    }
  ]
},

{
  'id': "youth_rainshoot",
  'title': "雨后的球场",
  'icon': '🌧️',
  'weight': 0x34,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "雨停了，训练场积水还没干。管理员刚关灯，你又翻了过去。没人跟你抢空门，只有水面上自己的倒影。",
  'options': [
    {
        'label': "练到看不清倒影",
        'p': function(p){return f(0.3,[[p["talent"],1,0.3]],0.15,0.6);
},
        'hint': function(p,q){return g(q,"天赋+","感冒一场");
},
        'apply': function(p,q,s){return d(q,s)?{'talent':0.02,'text':"湿球比干球难控，你就专挑它练。半年后教练说，你脚下比同龄人多一点东西。"}:{'ovr':-0x1,'text':"第二天你开始发烧，队医给你开了三天的药。积水的草地，到底还是凉。"};
}
    },
    {
        'label': "回去泡个热水澡",
        'hint': "没有变化",
        'apply': function(){return{'text':"你站在窗边看了一会儿雨，转身回了宿舍。第二天训练，你状态正好。"};
}
    }
  ]
},

{
  'id': "youth_turnaround",
  'title': "转身那一课",
  'icon': '🔄',
  'weight': 0x36,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "教练给你单独开小灶：背身拿球，怎么把防守队员晃开。他管它叫「转身那一课」。",
  'options': [
    {
        'label': "课后自己加量",
        'p': function(p){return f(0.5,[[p["talent"],1,0.3]],0.3,0.75);
},
        'hint': function(p,q){return g(q,"能力+2","练岔了");
},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'text':"那阵子你连吃饭都在想转身的时机。期末评语里，教练写了一句：会自己加量。"}:{'ovr':-0x1,'text':"加量加到用力过猛，那两天转身总是慢半拍。教练让你先歇够了再来。"};
}
    },
    {
        'label': "按时下课",
        'hint': "能力+1",
        'apply': function(){return{'ovr':0x1,'text':"你把时间留给比赛。周末的队内对抗里，你试着用了一下，居然成了。"};
}
    }
  ]
},

{
  'id': "youth_vice",
  'title': "熄灯以后的烟火",
  'icon': '🚬',
  'weight': 0x32,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "熄灯后，同屋的孩子翻下床，掏出一包烟，挨个递。轮到你时，他停了一下，看你。",
  'options': [
    {
        'label': "摇头",
        'hint': "清白+，跟他们有点远了",
        'apply': function(){return{'clean':0x6,'guanxi':-0x3,'text':"你摇头，他没再劝。往后那半年，分组对抗你总被分到另一个组。"};
}
    },
    {
        'label': "接过来，没点",
        'hint': "关系没变，心里那关自己过",
        'apply': function(){return{'guanxi':0x5,'clean':-0x3,'text':"你接过来放在床头，谁也没逼你点。可你知道，这条线是你自己划的。"};
}
    },
    {
        'label': "陪他们出去抽",
        'hint': "关系+，清白受损",
        'apply': function(){return{'guanxi':0x8,'clean':-0x6,'text':"你跟着去了阳台。烟味呛得你直咳嗽，他们笑，你也笑。"};
}
    }
  ]
},

{
  'id': "youth_selfdrill",
  'title': "一个人练到天黑",
  'icon': '🌆',
  'weight': 0x32,
  'repeat': 1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"];
},
  'desc': "下午的课结束得早。别人去冲凉，你拎着一袋球又回了场。管理员把钥匙给你时，多看了你一眼。",
  'options': [
    {
        'label': "练到天黑",
        'p': function(p){return f(0.25,[[p["talent"],1,0.35]],0.12,0.6);
},
        'hint': function(p,q){return g(q,"天赋+","白练，但心里踏实");
},
        'apply': function(p,q,s){return d(q,s)?{'talent':0.02,'text':"天色暗下来，你反而更准了。管理员来催第三次的时候，你已经能闭着眼找到球门。"}:{'text':"天黑了，球都看不清，你只靠感觉踢。没进步，但也不亏。"};
}
    },
    {
        'label': "跟着大家去冲凉",
        'hint': "能力+1",
        'apply': function(){return{'ovr':0x1,'text':"你把球放回筐里，去冲凉了。热水冲下来那一下，你觉得明天再练也一样。"};
}
    }
  ]
},

{
  'id': "cap_room",
  'title': "更衣室的那一拳",
  'icon': '🥊',
  'weight': 0x3a,
  'repeat': 0x2,
  'when': function(p){return p["_captain"]===p["teamId"];
},
  'desc': "训练前，更衣室里的火药味比平时重。两个主力为一个丢球的事闹僵了，谁都不肯先开口。",
  'options': [
    {
        'label': "把两边叫到一起说开",
        'p': function(p){return f(0.6,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'hint': function(p,q){return g(q,"更衣室又活了","袖标劝不动");
},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0xe,'fame':0x6,'text':"你把他们摁在一张桌上，让他们把话说完。那天下午的训练，是全队最顺的一场。"}:{'guanxi':-0x8,
'ovr':-0x1,'text':"你刚开口，其中一个就摔门走了。那天更衣室里，谁都没再说话。"};
}
    },
    {
        'label': "让教练来处理",
        'hint': "清白+，稍微有点掉份",
        'apply': function(){return{'clean':0x4,'guanxi':-0x3,'text':"你把这个烫手山芋交给了教练。他处理得干净，可第二天有人在背后说，这个队长不管事。"};
}
    }
  ]
},

{
  'id': "cap_money",
  'title': "袖标下的邀约",
  'icon': '💼',
  'weight': 0x38,
  'repeat': 0x1,
  'when': function(p){return p["_captain"]===p["teamId"];
},
  'desc': "一家跟队里合作的赞助商想加一条广告，点名让你出镜。经纪人觉得是好事，可你听说这单不走俱乐部账。",
  'options': [
    {
        'label': "接下这单",
        'hint': "钱+，清白受损",
        'apply': function(){return{'money':0xc8,'clean':-0xa,'fame':-0x4,'text':"你去了，成片里你笑得挺自然。两个月后这单被人翻出来，你才知道它有多难解释。"};
}
    },
    {
        'label': "把消息递给俱乐部",
        'hint': "清白+，钱没了",
        'apply': function(){return{'clean':0x8,'money':-0x1e,'fame':0x4,'text':"你把话递给了俱乐部。几天后那家赞助商被换掉了，更衣室里有人嘀咕你难搞，可俱乐部再没提过这事。"};
}
    }
  ]
},

{
  'id': "cap_pressure",
  'title': "连败之后",
  'icon': '🎤',
  'weight': 0x3c,
  'repeat': 0x2,
  'when': function(p){return p["_captain"]===p["teamId"];
},
  'desc': "联赛三轮不胜，发布会门口堵满了记者。教练朝你看了一眼——按惯例，队长得先开口。",
  'options': [
    {
        'label': "自己先站上去",
        'p': function(p){return f(0.6,[[p["fame"],25,0.01]],0.2,0.9);
},
        'hint': function(p,q){return g(q,"扛住了","被追问到失语");
},
        'apply': function(p,q,s){return d(q,s)?{'fame':0xc,'clean':0x4,'guanxi':0x6,'text':"你承认失误，也替球队兜底。那天你的发言上了热搜，更衣室里没人再抱怨。"}:{'fame':-0x6,
'ovr':-0x1,'text':"你说了两句场面话就被打断了。那晚的标题是「队长只会道歉」。"};
}
    },
    {
        'label': "让教练挡在前面",
        'hint': "关系-，清白-",
        'apply': function(){return{'guanxi':-0x4,'clean':-0x4,'text':"你把话筒推给了教练。他面不改色替你扛完，可从那天起，你在他心里的分量轻了一点。"};
}
    }
  ]
},

{
  'id': "ntcap_row",
  'title': "替补席的冷眼",
  'icon': '😤',
  'weight': 0x3a,
  'repeat': 0x2,
  'when': function(p){return p["_ntCaptain"];
},
  'desc': "一场友谊赛，老将没进大名单，在场边坐了一整场。赛后他堵住你：这事你得给个说法。",
  'options': [
    {
        'label': "替教练把话说圆",
        'p': function(p){return f(0.55,[[p["guanxi"],45,0.008]],0.2,0.9);
},
        'hint': function(p,q){return g(q,"压下去了","里外不是人");
},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0xc,'fame':0x6,'text':"你把教练的难处摊开讲，他听着听着，火气下去了半截。"}:{'guanxi':-0x8,'fame':-0x4,
'text':"他听完冷笑一声：你站谁的边。那晚上，更衣室分了两拨。"};
}
    },
    {
        'label': "直说让他自己找教练",
        'hint': "清白+，关系-",
        'apply': function(){return{'clean':0x6,'guanxi':-0x4,'text':"你说这事不该我替你转。他愣了一下，扭头走了。你是队长，不是传声筒。"};
}
    }
  ]
},

{
  'id': "ntcap_young",
  'title': "新人的首发",
  'icon': '🌱',
  'weight': 0x38,
  'repeat': 0x2,
  'when': function(p){return p["_ntCaptain"];
},
  'desc': "淘汰赛前夜，教练说想用一个十八岁的小孩顶替停赛的队友，问他行不行，教练说：你点头，他就上。",
  'options': [
    {
        'label': "跟教练说他可以",
        'p': function(p){return f(0.55,[[p["talent"],1,0.3]],0.2,0.9);
},
        'hint': function(p,q){return g(q,"他踢出来了","他踢砸了");
},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'fame':0x8,'guanxi':0x6,'text':"那小孩全场跑了十二公里，扑出一个险球。赛后他跟着你，喊了半天的队长。"}:{'ovr':-0x1,
'fame':-0x4,'text':"他上半场就犯了错，教练半场把他换下。有人问这锅谁来背，你没躲。"};
}
    },
    {
        'label': "建议按原阵容来",
        'hint': "关系+，稳一点",
        'apply': function(){return{'guanxi':0x4,'text':"你把稳妥的一面说了。教练最终没换人，那小孩在替补席坐了一整场，你看见他眼眶有点红。"};
}
    }
  ]
},

{
  'id': "ntcap_press",
  'title': "赢球之后的漩涡",
  'icon': '📷',
  'weight': 0x3c,
  'repeat': 0x2,
  'when': function(p){return p["_ntCaptain"];
},
  'desc': "世预赛赢球，回酒店的路上。有记者截住你：队里有人赛后在社交平台说了一句不该说的话，你作为队长怎么看。",
  'options': [
    {
        'label': "当场把话圆回来",
        'p': function(p){return f(0.55,[[p["fame"],25,0.01]],0.2,0.9);
},
        'hint': function(p,q){return g(q,"圆过去了","越描越黑");
},
        'apply': function(p,q,s){return d(q,s)?{'fame':0xc,'clean':0x4,'guanxi':0x6,'text':"你替他把话收了回来，还给对方留了台阶。第二天，那条动态被删了。"}:{'fame':-0x6,
'clean':-0x4,'text':"你越解释，记者越来劲。第二天标题变成了「国家队内讧，队长回应含混」。"};
}
    },
    {
        'label': "只回一句：下场见",
        'hint': "清白+，关系少一点",
        'apply': function(){return{'clean':0x4,'guanxi':-0x3,'text':"你说了句「下场见」就上了大巴。有人觉得你敷衍，可你知道，有些事不该由你替所有人解释。"};
}
    }
  ]
},

{
  'id': "abr_lang",
  'title': "语言关",
  'icon': '\u{1F5E3}\u{FE0F}',
  'weight': 0x36,
  'repeat': 1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "训练里教练喊的葡语/西语你只听懂了一半。战术板上画得再清楚，喊话那一下你还是慢半拍。",
  'options': [
    {
        'label': "报语言班",
        'p': function(p){return f(0.7,[[p["talent"],1,0.2]],0.4,0.9);},
        'hint': function(p,q){return g(q,"语言通了","花了钱还跟不上");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'guanxi':0x2,'text':"三个月后你能在更衣室里接上话了。教练开始愿意多讲两句，你听得懂那些「要球」「压上」之外的暗话。"}:{'ovr':-0x1,'text':"课费不便宜，你去了几节就断了。还是只能靠眼神和手势，训练里继续猜。"};}
    },
    {
        'label': "靠训练硬扛",
        'hint': "能力+1，但磨合慢",
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x1,'text':"听不懂就多练。你把每个动作都做到位，队友开始主动指给你看位置。"}:{'ovr':0x0,'text':"你把自己练得很累，但教练喊战术的时候你还是会愣一下。"};}
    }
  ]
},

{
  'id': "abr_tech",
  'title': "技术流训练",
  'icon': '\u{1F3AF}',
  'weight': 0x34,
  'repeat': 1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "这里的青训课和你原来踢的不一样：一个人一趟球要过十几次桩，教练不催，只看动作对不对。",
  'options': [
    {
        'label': "跟着磨细节",
        'p': function(p){return f(0.55,[[p["talent"],1,0.3]],0.3,0.85);},
        'hint': function(p,q){return g(q,"脚下功夫见长","动作学歪了");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x3,'talent':0.01,'text':"一个夏天下来，你的趟球、触球都变了样。回到队里热身，教练多看了你几眼。"}:{'ovr':-0x1,'text':"你想学他们那种灵巧，结果动作学得四不像。回去还是用自己那套。"};}
    },
    {
        'label': "保持自己的踢法",
        'hint': "能力+1",
        'apply': function(){return{'ovr':0x1,'text':"你有自己的节奏。这里的人起初不习惯，但你几次过人都让他们闭嘴了。"};}
    }
  ]
},

{
  'id': "abr_physical",
  'title': "异国体能营",
  'icon': '\u{1F4AA}',
  'weight': 0x2e,
  'repeat': 1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "这儿的体能教练对力量有一套：不是蛮练，是算着肌肉和爆发力来。他看着你的报告摇头：「太瘦了，但能练。」",
  'options': [
    {
        'label': "吃下这套计划",
        'p': function(p){return f(0.6,[[p["ovr"],0x2a,0.02]],0.3,0.85);},
        'hint': function(p,q){return g(q,"身体壮了一圈","加练加伤了");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x3,'text':"半年后你的对抗不再是短板。拼抢里你第一次把对方撞开，自己都愣了一下。"}:{'ovr':-0x2,'text':"量太大，你肌肉拉伤歇了两周。回来后体重是上去了，脚步却慢了点。"};}
    },
    {
        'label': "先保证能踢上球",
        'hint': "能力+1",
        'apply': function(){return{'ovr':0x1,'text':"你没贪那点力量，先把每场比赛踢好。教练后来才慢慢给你加量。"};}
    }
  ]
},

{
  'id': "abr_mentor",
  'title': "外教的单独指点",
  'icon': '\u{1F4CB}',
  'weight': 0x32,
  'repeat': 0x1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"]&&p["talent"]>1;},
  'desc': "梯队主教练留你下来：「你脚下有东西，但位置感太飘。来，我告诉你这个位置怎么站。」",
  'options': [
    {
        'label': "认真记下来",
        'p': function(p){return f(0.65,[[p["talent"],1,0.25]],0.4,0.9);},
        'hint': function(p,q){return g(q,"开了窍","没听进去");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x4,'talent':0.015,'fame':0x1,'text':"那几句话像钥匙。之后你在场上的站位、跑动都有了章法，教练开始让你打更重要的位置。"}:{'ovr':0x1,'text':"他讲了半天，你记住一半。不过那一半也够你用一阵子了。"};}
    },
    {
        'label': "按自己的理解踢",
        'hint': "能力+2",
        'apply': function(){return{'ovr':0x2,'text':"你谢过他，但场上还是按自己的直觉跑。教练皱了皱眉，没再说什么。"};}
    }
  ]
},

{
  'id': "abr_homesick",
  'title': "想家",
  'icon': '\u{1F3E1}',
  'weight': 0x2a,
  'repeat': 1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "半夜醒来看手机，家里那边正是下午。妈妈的语音一条条发来，你躺在宿舍床上，突然不想动了。",
  'options': [
    {
        'label': "把自己练到没力气想",
        'p': function(p){return f(0.35,[[p["fame"],25,0.008],[p["ovr"],60,0.004]],0.15,0.75);},
        'hint': function(p,q){return g(q,"挺过去了","状态下滑");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'fame':0x1,'text':"你把思乡变成训练。那阵子你练得比谁都狠，状态不但没掉，反而起来了。"}:{'ovr':-0x2,'text':"想家想得厉害，训练里走神。教练看出来了，问你「要不要回去待几天」。"};}
    },
    {
        'label': "和家里多视频",
        'hint': "状态稳住",
        'apply': function(){return{'ovr':0x1,'text':"跟家里说开了，心里反而踏实。你决定再熬一熬，这条路是自己选的。"};}
    }
  ]
},

{
  'id': "abr_style",
  'title': "新战术体系",
  'icon': '\u{1F4D0}',
  'weight': 0x2e,
  'repeat': 1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "这里的打法跟你原来完全不一样：从后场就开始倒脚，前场球员要回撤接球。你踢了几天，觉得自己像个多余的人。",
  'options': [
    {
        'label': "花时间吃透",
        'p': function(p){return f(0.5,[[p["talent"],1,0.3]],0.25,0.8);},
        'hint': function(p,q){return g(q,"融入体系","始终对不上");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x3,'guanxi':0x1,'text':"两个月后你终于跑顺了那些线路。教练在队内赛上点名表扬你：「这就是我们要的那种跑位。」"}:{'ovr':-0x1,'text':"你还是习惯自己拿球往前冲，和队友总对不上拍。"};}
    },
    {
        'label': "坚持自己的风格",
        'hint': "能力+2",
        'apply': function(){return{'ovr':0x2,'text':"体系是他们的，你是你的。你在有限的机会里用个人能力证明了自己。"};}
    }
  ]
},

{
  'id': "abr_food",
  'title': "饮食差异",
  'icon': '\u{1F35D}',
  'weight': 0x26,
  'repeat': 0x1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "食堂里全是你不认识的菜。前两周你靠面包和水果撑着，体能教练看不过去：「你这不是在踢球，是在节食。」",
  'options': [
    {
        'label': "学着吃",
        'p': function(p){return f(0.65,[[p["clean"],1,0.1]],0.4,0.85);},
        'hint': function(p,q){return g(q,"营养跟上了","还是吃不惯");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'clean':0x1,'text':"你开始习惯这里的吃法，体重和体力都回来了。身体是踢球的底子，这道理你懂晚了但懂了。"}:{'ovr':0x0,'text':"你还是吃得少，训练后腿发软。教练让你多睡一觉，别的也没法帮你。"};}
    },
    {
        'label': "自己开小灶",
        'hint': "花点钱保状态",
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'money':-0x1,'text':"你自己买食材做中餐，吃是吃好了，但钱包瘪得快。"}:{'ovr':0x0,'text':"你试了几次，锅都没找齐。最后还是回食堂将就。"};}
    }
  ]
},

{
  'id': "abr_rival",
  'title': "本地球员的敌意",
  'icon': '\u{2694}\u{FE0F}',
  'weight': 0x2c,
  'repeat': 0x1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "青训队里有个本地球员看你不太顺眼，训练里总爱跟你较劲，几次对抗都下狠脚。",
  'options': [
    {
        'label': "用实力回应",
        'p': function(p){return f(0.5,[[p["ovr"],0x32,0.02]],0.25,0.8);},
        'hint': function(p,q){return g(q,"他服了","吃了亏");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x3,'fame':0x1,'text':"你在一次队内对抗里把他过了个干净，还进了球。从那以后他对你客气多了——是那种「服了」的客气。"}:{'ovr':-0x2,'text':"你被他几次撞翻在地，教练吹了哨也没用。那天晚上你大腿青了一块。"};}
    },
    {
        'label': "绕着走",
        'hint': "避开冲突",
        'apply': function(){return{'ovr':0x0,'text':"你不想把精力耗在斗气上，训练里尽量绕开他。他倒也没再找茬。"};}
    }
  ]
},

{
  'id': "abr_reputation",
  'title': "表现被注意到",
  'icon': '\u{1F31F}',
  'weight': 0x2e,
  'repeat': 0x1,
  'stage': "youth",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"]&&p["ovr"]>55;},
  'desc': "当地球探来看梯队的比赛。赛后有人把你的号码记在本子上，教练拍拍你：「那边的人，想多看看你。」",
  'options': [
    {
        'label': "展示自己",
        'p': function(p){return f(0.35,[[p["ovr"],0x30,0.01],[p["fame"],25,0.006]],0.2,0.8);},
        'hint': function(p,q){return g(q,"被更多人记住","只是看了一眼");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'fame':0x6,'text':"那一场你踢得格外卖力。赛后经纪人打电话来说有人问起你，名字第一次出现在别人的笔记本上。"}:{'ovr':0x1,'fame':0x2,'text':"你踢得不算差，但也没到让人眼前一亮。那人看完就走了。"};}
    },
    {
        'label': "低调攒实力",
        'hint': "能力+1",
        'apply': function(){return{'ovr':0x1,'text':"你不想被盯上就乱踢，还是按自己的节奏来。实力到了，名声自然会来。"};}
    }
  ]
},

{
  'id': "abr_teammate",
  'title': "交到第一个朋友",
  'icon': '\u{1F91D}',
  'weight': 0x2a,
  'repeat': 0x1,
  'stage': "kid",
  'when': function(p){return p["inAcademy"]&&p["youthAbroad"];},
  'desc': "更衣室里有个同龄人总爱找你搭话，用蹩脚的英语加手势比划。他约你周末去他家吃饭，说他妈妈想见见「那个中国来的」。",
  'options': [
    {
        'label': "去",
        'p': function(p){return f(0.45,[[p["guanxi"],45,0.008]],0.3,0.85);},
        'hint': function(p,q){return g(q,"多了个兄弟","还是隔了一层");},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0x4,'ovr':0x1,'text':"那顿饭吃得比训练还累，但你交到了一个能托底的队友。训练里他开始主动帮你说话、给你传球。"}:{'guanxi':0x1,'text':"去了，但语言还是硬伤。你俩点头之交，他说什么你多半靠猜。"};}
    },
    {
        'label': "婉拒",
        'hint': "省事",
        'apply': function(){return{'guanxi':0x0,'text':"你借口训练推掉了。他还是照常跟你打招呼，但关系也就那样了。"};}
    }
  ]
},

{
  'id': "vet_wall",
  'title': "撞上体能墙",
  'icon': '🧱',
  'weight': 0x3c,
  'stage': "vet",
  'when': function(p){return p["age"]>=0x22&&p["age"]<=0x24&&p["posGroup"]!=='gk';},
  'desc': "冬歇期后的队内体能测试，你第一次跑不过队里两个二十岁的小将。教练没说话，只是在训练表上把你从「全勤」那一栏圈了出来。",
  'options': [
    {
        'label': "调整训练，学着省着踢",
        'p': function(p){return f(0.7,[[p["talent"],1,0.3]],0.3,0.9);},
        'hint': function(p,q){return g(q,"延长职业生涯","状态下滑");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'health':0.95,'roleDelta':-0x1,'text':"你开始少跑那些没用的距离，把力气留给最关键的时刻。教练嘴上不说，季末总结时把你排进了「贡献榜」前三。"}:{'ovr':-0x2,'roleDelta':-0x2,'text':"你想省着踢，可节奏一降就回不来了。首发位置，让给了比你小十岁的孩子。"};}
    },
    {
        'label': "加练，拼一把",
        'p': function(p){return f(0.4,[[p["clean"],60,0.005]],0.2,0.8);},
        'hint': function(p,q){return g(q,"找回状态","膝盖先报警");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x3,'text':"你比别人早到两小时，把体能的账一笔一笔还回去。第二次测试，你排回了队内前五。"}:{'ovr':-0x3,'health':1.15,'roleDelta':-0x1,'text':"量太大了。第三周，你的膝盖先提了抗议，队医说，这个年纪不该这么练。"};}
    }
  ]
},

{
  'id': "vet_mentor",
  'title': "把绝活传下去",
  'icon': '📖',
  'weight': 0x3e,
  'stage': "vet",
  'when': function(p){return p["age"]>=0x21&&p["roleRank"]>=0x3;},
  'desc': "队里来了个十八岁的小将，位置和你一模一样。他每天加练后都会站在场边看你，眼睛亮得像刚踢球时的你。",
  'options': [
    {
        'label': "多带他，传点真东西",
        'p': function(p){return f(0.65,[[p["guanxi"],45,0.008]],0.3,0.9);},
        'hint': function(p,q){return g(q,"后继有人","教出个抢班夺权的");},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0xa,'roleDelta':-0x1,'fame':0x6,'text':"你教他停球，教他跑位，教他怎么在禁区里「借力」。几个月后他在预备队戴了帽子，新闻里说「师承XXX」。"}:{'guanxi':0x4,'roleDelta':-0x2,'text':"你倾囊相授。年底他进了首发，你的名字，渐渐只在新闻的「历任」里出现。"};}
    },
    {
        'label': "留一手",
        'hint': "保住位置",
        'apply': function(){return{'roleDelta':0x1,'guanxi':-0x3,'text':"你嘴上应着，练的时候总留一手。他球技长得快，可看你的眼神，慢慢就淡了。"};}
    }
  ]
},

{
  'id': "vet_planning",
  'title': "退役后的路",
  'icon': '🧭',
  'weight': 0x3a,
  'stage': "vet",
  'when': function(p){return p["age"]>=0x23;},
  'desc': "经纪人问你，挂靴之后想干什么。他说现在开始铺路，五年后退役那天就有一份新身份等着你。",
  'options': [
    {
        'label': "考教练证",
        'p': function(p){return f(0.6,[[p["fame"],30,0.006]],0.3,0.9);},
        'hint': function(p,q){return g(q,"退役即上岗","证没考下来");},
        'apply': function(p,q,s){return d(q,s)?{'clean':0x3,'fame':0x4,'text':"你报了教练班，和一群刚退役的老家伙当同学。结业那天，你拿着证拍了张照，背景是训练场。"}:{'money':-0x32,'text':"课程费交了，可你实在腾不出时间。那张报名表，最后被夹进了旧杂志里。"};}
    },
    {
        'label': "做点生意",
        'p': function(p){return f(0.5,[[p["money"],300,0.004]],0.2,0.8);},
        'hint': function(p,q){return g(q,"有份副业","亏了钱");},
        'apply': function(p,q,s){return d(q,s)?{'money':0x96,'fame':0x2,'text':"你投了一家青训机构，挂你的名字招生，生源不错。你偶尔去露个面，教孩子们踩单车。"}:{'money':-0x78,'text':"合伙人的账越算越糊涂。你退了股，那笔钱够你再踢三年。"};}
    },
    {
        'label': "先不想，踢到踢不动",
        'hint': "专心踢球",
        'apply': function(){return{'roleDelta':0x1,'text':"你把电话挂了。现在你脑子里只有下一场比赛，退役的事，等最后一场踢完再说。"};}
    }
  ]
},

{
  'id': "vet_swan",
  'title': "最后一舞",
  'icon': '💃',
  'weight': 0x40,
  'stage': "vet",
  'when': function(p){return p["age"]>=0x25;},
  'desc': "俱乐部宣布，下一场主场是你的「告别演出」——球衣印着纪念字样，看台上有人举着你的号码牌。",
  'options': [
    {
        'label': "拼尽全力",
        'p': function(p){return f(0.5,[[p["ovr"],60,0.006]],0.2,0.85);},
        'hint': function(p,q){return g(q,"再进一球","遗憾收场");},
        'apply': function(p,q,s){return d(q,s)?{'fame':0x14,'ovr':0x2,'text':"补时第93分钟，你在大禁区外轰出一脚世界波。全场的手机闪光灯对着你，像一片星海。赛后他们说，这是最好的告别。"}:{'fame':0x6,'text':"你拼到了抽筋。哨响时你跪在中圈，看台上的掌声，比你想象中响。"};}
    },
    {
        'label': "给年轻人让路",
        'hint': "队内地位降，关系升",
        'apply': function(){return{'roleDelta':-0x2,'guanxi':0x8,'text':"你把最后一次首发让给了队里的小将。你坐在替补席看完了整场，年轻人进了球，朝你的方向跑来。"};}
    }
  ]
},

{
  'id': "vet_benchwarmer",
  'title': "年轻人的替补",
  'icon': '🪑',
  'weight': 0x3a,
  'stage': "vet",
  'when': function(p){return p["age"]>=0x22&&p["roleRank"]<=0x2;},
  'desc': "更衣室的储物柜贴上了新名字。队里买了个比你小十二岁的年轻人，教练说他需要「比赛时间」。",
  'options': [
    {
        'label': "找教练谈，要个说法",
        'p': function(p){return f(0.45,[[p["guanxi"],45,0.008]],0.2,0.85);},
        'hint': function(p,q){return g(q,"争回出场","撕破脸");},
        'apply': function(p,q,s){return d(q,s)?{'roleDelta':0x2,'guanxi':-0x5,'text':"你把话摆到了明面上。教练给了你三场机会，你抓回了两场。可从那以后，更衣室里的气氛，就怪怪的。"}:{'roleDelta':-0x3,'text':"谈话不欢而散。接下来两个月，你连大名单都没进过。"};}
    },
    {
        'label': "接受现实，当好榜样",
        'hint': "关系+，地位-",
        'apply': function(){return{'guanxi':0x6,'roleDelta':-0x1,'fame':0x2,'text':"你开始以过来人的身份教他：怎么盯人，什么时候该上抢。他进步很快，教练说，队里需要你这种老将。"};}
    }
  ]
},

{
  'id': "club_5yrs",
  'title': "五年老臣",
  'icon': '📜',
  'weight': 0x30,
  'when': function(p){return p["seasonsAtClub"]>=0x5&&p["seasonsAtClub"]<0x8;},
  'desc': "你在这支球队待了五年，看台上的横幅换了一茬又一茬，你的号码，一次都没换过。",
  'options': [
    {
        'label': "续约，把根扎下来",
        'p': function(p){return f(0.7,[[p["guanxi"],50,0.008]],0.3,0.9);},
        'hint': function(p,q){return g(q,"地位稳固","薪水难谈");},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0x8,'roleDelta':0x1,'text':"续约谈得很顺利。签字那天，主席说，你是队里「压舱石」——他知道这个词你还得想一下。"}:{'guanxi':0x2,'text':"合同年限卡住了，最后各让一步。你留下，但心里记下了这回事。"};}
    },
    {
        'label': "再看看别的机会",
        'hint': "可能离队",
        'apply': function(){return{'leave':!0x0,'text':"你让经纪人把报价递过来。球迷论坛炸了，有帖子问：连他都想走，这队还有救吗。"};}
    }
  ]
},

{
  'id': "club_10yrs",
  'title': "十年一诺",
  'icon': '🏆',
  'weight': 0x38,
  'when': function(p){return p["seasonsAtClub"]>=0xa&&p["youthTeamId"]===p["teamId"];},
  'desc': "十年。你从青训营一路踢到一线队，如今球衣上的名字底下，印着「十年」两个字。俱乐部说，要给你办个盛大的纪念。",
  'options': [
    {
        'label': "我把最好的十年留在这了",
        'hint': "名气大涨，地位稳",
        'apply': function(){return{'fame':0x14,'roleDelta':0x2,'text':"纪念赛那天，全场人穿你的号码。你举起话筒说，我这辈子最对的决定，就是没离开过这儿。"};}
    },
    {
        'label': "冠军是唯一想要的礼物",
        'p': function(p){return f(0.55,[[p["ovr"],70,0.006]],0.25,0.85);},
        'hint': function(p,q){return g(q,"如愿以偿","差一口气");},
        'apply': function(p,q,s){return d(q,s)?{'fame':0x10,'text':"那赛季你拼下了队史一座重量级奖杯。颁奖时队长把奖杯递给你，说，这是给你十年的。"}:{'fame':0x4,'text':"最后一场功亏一篑。你在更衣室坐了很久，十年，就差这一步。"};}
    }
  ]
},

{
  'id': "club_10yrs_way",
  'title': "十年之约",
  'icon': '🏆',
  'weight': 0x38,
  'when': function(p){return p["seasonsAtClub"]>=0xa&&p["youthTeamId"]!==p["teamId"];},
  'desc': "十年。你从当初转会而来的那天，到如今球队的名字早已刻进你的履历。球衣上的名字底下，印着「十年」两个字。俱乐部说，要给你办个盛大的纪念。",
  'options': [
    {
        'label': "我把最好的十年留在这了",
        'hint': "名气大涨，地位稳",
        'apply': function(){return{'fame':0x14,'roleDelta':0x2,'text':"纪念赛那天，全场人穿你的号码。你举起话筒说，我这辈子最对的决定，就是没离开过这儿。"};}
    },
    {
        'label': "冠军是唯一想要的礼物",
        'p': function(p){return f(0.55,[[p["ovr"],70,0.006]],0.25,0.85);},
        'hint': function(p,q){return g(q,"如愿以偿","差一口气");},
        'apply': function(p,q,s){return d(q,s)?{'fame':0x10,'text':"那赛季你拼下了队史一座重量级奖杯。颁奖时队长把奖杯递给你，说，这是给你十年的。"}:{'fame':0x4,'text':"最后一场功亏一篑。你在更衣室坐了很久，十年，就差这一步。"};}
    }
  ]
},

{
  'id': "star_training2",
  'title': "大师的中场课",
  'icon': '🎯',
  'weight': 0x96,
  'when': function(p){return "mid"===p["posGroup"]&&!p["inChina"]&&p["leagueRep"]>=0x4&&p["clubRep"]>=0x4;},
  'desc': "俱乐部周年庆，请回了一位退役的中场大师给全队上课。分组对抗里，你和他分到了同一边。他看了你两眼，说：小伙子，敢不敢跟我比一脚出球？",
  'options': [
    {
        'label': "接下战书",
        'p': function(p){return f(0.42,[[p["ovr"],0x4c,0.012]],0.12,0.75);},
        'hint': function(p,q){return g(q,"大师点头","自取其辱");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x3,'guanxi':0xa,'text':"二十分钟，你们俩没让球落地超过两次。收操时他把球踩住，对教练说：这孩子的眼睛是踢中场的眼睛。第二天，队内传球数据榜第一行换了名字。"}:{'ovr':-0x1,'text':"第三脚你就慢了半拍。他笑着摇摇头，把球挑到你身后。你没恼——那半天你一直盯着他的跑位看，笔记本上记满了字。"};}
    },
    {
        'label': "多看他怎么踢",
        'hint': "稳，学东西",
        'apply': function(){return{'ovr':0x2,'text':"你整个下午都在跟着他跑。他停球前的那半步、出球前的抬头，你都记在心里。训练结束他说：会看的孩子，比会踢的少，但走得远。"};}
    }
  ]
},

{
  'id': "star_training3",
  'title': "门前的最后一课",
  'icon': '⚽',
  'weight': 0x96,
  'when': function(p){return "att"===p["posGroup"]&&!p["inChina"]&&p["leagueRep"]>=0x4&&p["clubRep"]>=0x4;},
  'desc': "一位传奇射手受邀回俱乐部带一周射门特训。第一天他就叫住了你：我看你三场了，你跑位像在逛街。来，我教你什么叫「偷」。",
  'options': [
    {
        'label': "跟他学偷袭",
        'p': function(p){return f(0.42,[[p["ovr"],0x4c,0.012]],0.12,0.75);},
        'hint': function(p,q){return g(q,"开窍了","差点意思");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x3,'text':"他让你蒙着眼在禁区里站了一下午，只听声音判断球的落点。周五的教学赛，你在两个人中间凭感觉插到了那个点。他在场边喊：就是这个！就是这一下！"}:{'ovr':-0x1,'text':"你按他说的跑了，队友的球却传去了别处。他拍拍你：急什么，我练了十年才有人懂往哪给我传。回去接着磨。"};}
    },
    {
        'label': "加练射门找状态",
        'hint': "稳妥",
        'apply': function(){return{'ovr':0x1,'text':"特训之外你自己加了五十脚。他路过看了几眼，没说话，只在临走时留下一句话：射门是练不完的，但脑子得先到位。"};}
    }
  ]
},

{
  'id': "lg_epl_dec",
  'title': "没有冬歇的十二月",
  'icon': '📅',
  'weight': 0x50,
  'when': function(p){return "epl"===p["leagueId"];},
  'desc': "别处的联赛陆续停摆过冬，这里的日程表上只有下一个对手。教练把一沓录像拍在桌上：十二天四场，谁也别想省力。",
  'options': [
    {
        'label': "把轮换当机会踢",
        'p': function(p){return f(0.55,[[p["ovr"],0x4c,0.008]],0.25,0.85);},
        'hint': function(p,q){return g(q,"站稳了","透支了");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'roleDelta':0x1,'text':"四场你上了三场，进了两个。英国记者写道：这个东方人比英格兰人更懂圣诞节的意义——就是不停下来。"}:{'ovr':-0x2,'health':1.1,'text':"第四场开始前，你的大腿绷得像根弦。队医摇头：这个月你跑的量，顶别人一个半月的。"};}
    },
    {
        'label': "跟队医要恢复方案",
        'hint': "稳妥，状态缓",
        'apply': function(){return{'ovr':0x1,'guanxi':-0x3,'text':"冰浴、加压裤、睡前两小时不看手机。你把身体当成项目来管理。教练看了眼你的数据表，什么都没说，轮换名单上却少了你的名字。"};}
    }
  ]
},

{
  'id': "lg_epl_mixedzone",
  'title': "混采区",
  'icon': '🎤',
  'weight': 0x50,
  'when': function(p){return "epl"===p["leagueId"];},
  'desc': "英超的规定：赢球的球员必须走混采区。几十个话筒伸过来，问题从战术到你的私生活无所不包。翻译在你耳边小声提醒：说错一个词，明天就是头条。",
  'options': [
    {
        'label': "有问必答",
        'p': function(p){return f(0.6,[[p["fame"],40,0.006]],0.3,0.9);},
        'hint': function(p,q){return g(q,"圈粉无数","被断章取义");},
        'apply': function(p,q,s){return d(q,s)?{'fame':0xc,'guanxi':0x4,'text':"你夸了对手、谢了球迷、还开了个自嘲的玩笑。第二天那段视频被转了几万次，评论区第一次齐刷刷地喊你的名字。"}:{'fame':-0x5,'text':"你说「我们配不上三分」，标题变成《核心炮轰队友》。更衣室里安静了一天，队长拍拍你：下次学学怎么打太极。"};}
    },
    {
        'label': "只回一句：下场见",
        'hint': "清白+，关系少一点",
        'apply': function(){return{'clean':0x4,'guanxi':-0x3,'text':"你说了句「下场见」就上了大巴。有人觉得你敷衍，可你知道，有些话在这里说出来就会变味。"};}
    }
  ]
},

{
  'id': "lg_liga_tiki",
  'title': "把球传进大门",
  'icon': '🧩',
  'weight': 0x50,
  'when': function(p){return "liga"===p["leagueId"];},
  'desc': "新助教上任第一周，训练场上拉起了绳网：传球路线被限制成只有两条。他说，在这块土地上，控不住球的人连尊严都没有。",
  'options': [
    {
        'label': "苦练一脚出球",
        'p': function(p){return f(0.6,[[p["talent"],1,0.35]],0.3,0.9);},
        'hint': function(p,q){return g(q,"融进体系","水土不服");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'roleDelta':0x1,'text':"三周后，你在中场连续一脚传递撕开了模拟防线。助教鼓着掌喊：就是这个节奏！看台上，一线队主教练点了点头。"}:{'ovr':-0x1,'text':"你习惯了带两步再传，绳网却逼你提前出球。失误一次，全队陪跑一圈。第七天晚上，你自己留在场地上，一遍遍练那个两秒内的决定。"};}
    },
    {
        'label': "保持自己的风格",
        'hint': "个性，风险",
        'apply': function(){return{'ovr':0x1,'guanxi':-0x4,'text':"你还是那个爱多带一步的你。助教找你谈了两次话。数据不会说谎：你的丢失球权数，全队第一。"};}
    }
  ]
},

{
  'id': "lg_liga_clasico",
  'title': "第一次国家德比",
  'icon': '🔥',
  'weight': 0x52,
  'when': function(p){return "liga"===p["leagueId"]&&p["clubRep"]>=0x4;},
  'desc': "赛前一周，整座城市就变了味道。出租车司机跟你吵该谁罚点球，报纸头版印着你和对方十号的对位图。更衣室里老队长说：这种比赛，一辈子记住一次就够了。",
  'options': [
    {
        'label': "把它当普通比赛",
        'p': function(p){return f(0.45,[[p["ovr"],0x4c,0.012]],0.15,0.8);},
        'hint': function(p,q){return g(q,"一战成名","被情绪吞没");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'fame':0x14,'roleDelta':0x1,'text':"第九十分钟，你在两人夹防里把球搓向后点，队友头槌绝平。那晚社交网络上，你的名字和两位金球先生排在同一行。"}:{'ovr':-0x1,'fame':0x4,'text':"你太想证明了。上半场三次丢球，半场就被换下。老队长赛后搂着你：我第一次踢这场，吐了一整夜。你已经很好了。"};}
    },
    {
        'label': "接受替补角色",
        'hint': "平稳",
        'apply': function(){return{'guanxi':0x6,'ovr':0x1,'text':"你坐在替补席看完了全程，第80分钟上去触了七次球。赛后你说：至少，我在场上了。"};}
    }
  ]
},

{
  'id': "lg_bund_press",
  'title': "从门将开始逼抢",
  'icon': '🏃',
  'weight': 0x50,
  'when': function(p){return "bund"===p["leagueId"];},
  'desc': "新帅的第一堂训练课，把十一块背心全发出去：从门将开始，所有人都要压上去。他说，在德国，不跑的人连看台都不配坐。",
  'options': [
    {
        'label': "把肺活量押上去",
        'p': function(p){return f(0.6,[[p["ovr"],0x4a,0.01]],0.25,0.85);},
        'hint': function(p,q){return g(q,"跑成体系","跑垮了");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'roleDelta':0x1,'text':"体测数据出来，你的高强度跑排进前五。教练在战术板上把你的名字往前挪了一格：逼抢的第一线，就是你的第二生命。"}:{'ovr':-0x2,'health':1.1,'text':"第三周，你的内收肌罢工了。理疗床上你看着天花板想：这套打法是台绞肉机，而我是最新的那块肉。"};}
    },
    {
        'label': "找教练谈定位",
        'hint': "关系+，强度降",
        'apply': function(){return{'guanxi':0x6,'ovr':0x1,'text':"你跟教练聊了自己的特点：与其满场飞，不如卡死关键三十米。他听完沉默半天，训练里给你划了块专属区域。"};}
    }
  ]
},

{
  'id': "lg_bund_kid",
  'title': "十六岁的队友",
  'icon': '🧒',
  'weight': 0x50,
  'when': function(p){return "bund"===p["leagueId"]&&p["age"]>=0x17;},
  'desc': "梯队里又提上来一个孩子，十六岁，训练赛把你过了两次。更衣室里他管你叫哥。教练说：在这里，没人等你长大，也没人等你变老。",
  'options': [
    {
        'label': "带他，也学他",
        'p': function(p){return f(0.65,[[p["guanxi"],50,0.008]],0.35,0.9);},
        'hint': function(p,q){return g(q,"教学相长","位置被他顶了");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'guanxi':0x8,'text':"你把自己十年踩过的坑讲给他听，也偷偷学他那下变向。季末你们同时入选月度最佳阵容——一老一少，照片里笑得一样坏。"}:{'ovr':-0x1,'roleDelta':-0x1,'text':"你教他的东西他三天就会了，而他那些天生的爆发力，你练不来。首发名单公布那天，你在替补席系了很久的鞋带。"};}
    },
    {
        'label': "只管踢好自己的",
        'hint': "稳",
        'apply': function(){return{'ovr':0x1,'text':"竞争就竞争。你加练了两组力量，把焦虑压进了杠铃里。赛季很长，笑到最后的才有资格说话。"};}
    }
  ]
},

{
  'id': "lg_seri_defense",
  'title': "防守是一门功课",
  'icon': '🛡',
  'weight': 0x50,
  'when': function(p){return "seri"===p["leagueId"]&&p["posGroup"]!=='gk';},
  'desc': "防守教练把你拉到录像室，一帧一帧放你的回防路线。他说：在意甲，前锋也得懂造越位，边锋也得会卡位。这里的数据榜上，抢断和进球一样值钱。",
  'options': [
    {
        'label': "从头学防守",
        'p': function(p){return f(0.6,[[p["clean"],60,0.005]],0.3,0.9);},
        'hint': function(p,q){return g(q,"攻防一体","顾此失彼");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'text':"六周后，对方反击时你已经站在了肋部的必经之路上。解说员说：这个中国人，用脑子的方式很意大利。"}:{'ovr':-0x1,'text':"你把太多精力花在了站位上，进攻端的灵感却断了电。两场比赛颗粒无收后，教练让你二选一。"};}
    },
    {
        'label': "只打磨进攻",
        'hint': "扬长避短",
        'apply': function(){return{'ovr':0x1,'roleDelta':-0x1,'text':"你把心思全放在了禁区前沿。防守数据惨不忍睹，但你的进球数撑住了首发位置。意甲的生存法则之一：有绝活的人总有饭吃。"};}
    }
  ]
},

{
  'id': "lg_seri_slow",
  'title': "领先之后的九十分钟",
  'icon': '⏱',
  'weight': 0x50,
  'when': function(p){return "seri"===p["leagueId"];},
  'desc': "二比零之后，全队开始在中圈附近倒脚。对手不逼抢，只是跟在你身后走。看台上嘘声四起。老中卫说：在这联赛，领先的一方才有权定义时间。",
  'options': [
    {
        'label': "学会控节奏",
        'p': function(p){return f(0.62,[[p["ovr"],0x48,0.008]],0.3,0.9);},
        'hint': function(p,q){return g(q,"大师课","丢了好局");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'guanxi':0x6,'text':"你把球权攥在脚下，四十多脚传递耗完了最后十分钟。终场哨响，客队教练冲裁判咆哮，你的队友们笑着抱成一团。这就是三分的艺术。"}:{'ovr':-0x2,'text':"第八十七分钟，你想多带一步消耗时间，球被断了。一分钟后，比分变成了二比二。大巴上没人说话，你盯着窗外的夜路看了一路。"};}
    },
    {
        'label': "继续进攻扩大比分",
        'hint': "高风险高回报",
        'apply': function(){return{'ovr':0x1,'fame':0x4,'text':"你不肯演，第七十分钟打进第三球。看台的嘘声变成了掌声。教练赛后说：好看，但下次先学着别丢球。"};}
    }
  ]
},

{
  'id': "lg_l1_scouts",
  'title': "看台上的陌生人",
  'icon': '🔭',
  'weight': 0x50,
  'when': function(p){return 'l1'===p["leagueId"];},
  'desc': "连续三场首发后，包厢里多了几张生面孔。经纪人打来电话：都是豪门的人。这里是欧洲最大的球星超市，橱窗里永远摆着下一个天才。",
  'options': [
    {
        'label': "让表现说话",
        'p': function(p){return f(0.55,[[p["ovr"],0x4b,0.009]],0.25,0.85);},
        'hint': function(p,q){return g(q,"豪门报价","暂时无人问津");},
        'apply': function(p,q,s){return d(q,s)?{'fame':0xa,'money':0x32,'text':"月底，俱乐部收到了正式询价。主席把你叫进办公室：他们给的数字，是你身价的四倍。你第一次感觉到，自己是一件被标价的商品——还是抢手货。"}:{'ovr':0x1,'text':"生面孔们看完三场，没再出现。经纪人安慰你：他们还会来的。你耸耸肩，继续在训练场上加练。这里留不住人，但能锻造人。"};}
    },
    {
        'label': "公开表态留队",
        'hint': "关系大增",
        'apply': function(){return{'guanxi':0xc,'fame':-0x3,'text':"你在采访里说：我合同还有两年，脑子里只有这件球衣。俱乐部官网转发了这句话，球迷看台上多了条给你的横幅。"};}
    }
  ]
},

{
  'id': "lg_l1_tower",
  'title': "巴别塔更衣室",
  'icon': '🌍',
  'weight': 0x50,
  'when': function(p){return 'l1'===p["leagueId"];},
  'desc': "更衣室里，塞内加尔语、葡萄牙语、阿拉伯语和法语混在一起。战术板上的标注要翻译三遍。你说不好这算混乱还是包容，只知道这里的足球和这里的人一样杂糅。",
  'options': [
    {
        'label': "学语言，交朋友",
        'p': function(p){return f(0.7,[[p["talent"],1,0.3]],0.4,0.92);},
        'hint': function(p,q){return g(q,"成为枢纽","闹了笑话");},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0xa,'ovr':0x2,'text':"三个月后，你能用法语喊战术、用葡语开玩笑。非洲帮拉你去家里吃饭，法国本土派带你去了老城区的馆子。你成了更衣室的翻译器，也是所有人的自己人。"}:{'guanxi':0x3,'text':"你把「传中」说成了另一个尴尬的词，全队笑了十分钟。不过笑声之后，大家反而记住了这个敢开口的东方人。"};}
    },
    {
        'label': "用脚说话",
        'hint': "稳",
        'apply': function(){return{'ovr':0x1,'text':"语言不通没关系，好传球是世界语。两个助攻之后，队里的语言天才们抢着教你各自的方言。"};}
    }
  ]
},

{
  'id': "lg_ere_price",
  'title': "下一个标价",
  'icon': '🏷',
  'weight': 0x50,
  'when': function(p){return "ere"===p["leagueId"];},
  'desc': "财务总监把一张纸推到你面前：俱乐部上赛季卖人赚的钱，比门票和转播加起来还多。他笑着说：你现在的合同里，有百分之十五的二次转会分成——好好踢，我们都发财。",
  'options': [
    {
        'label': "接受这套生意逻辑",
        'p': function(p){return f(0.6,[[p["ovr"],0x4a,0.009]],0.3,0.9);},
        'hint': function(p,q){return g(q,"身价暴涨","状态起伏");},
        'apply': function(p,q,s){return d(q,s)?{'fame':0x8,'money':0x28,'ovr':0x2,'text':"半年后，转会市场给你标了新价。主席在发布会上说：我们不着急卖，但他值得更好的舞台。你知道这是明码标价的告别预告。"}:{'ovr':-0x1,'text':"你太想涨身价了，场上反而放不开。两场低迷后，总监的笑脸淡了几分：生意归生意，孩子，先把球踢好。"};}
    },
    {
        'label': "只关心上场时间",
        'hint': "纯粹",
        'apply': function(){return{'guanxi':0x6,'text':"你说：我只管踢球，卖不卖你们定。总监愣了一下，然后笑出声。那天之后，训练场上你的名字总被第一个念到。"};}
    }
  ]
},

{
  'id': "lg_pri_sea",
  'title': "南美的孩子们",
  'icon': '🌊',
  'weight': 0x50,
  'when': function(p){return "pri"===p["leagueId"];},
  'desc': "一月窗口，俱乐部一口气租来了三个南美小将。训练赛上他们盘带如跳舞，也丢球如散沙。老队长搂着你说：欢迎来到葡超，欧洲和南美之间的渡口。",
  'options': [
    {
        'label': "当他们的引路人",
        'p': function(p){return f(0.65,[[p["guanxi"],45,0.008]],0.35,0.9);},
        'hint': function(p,q){return g(q,"更衣室核心","文化冲突");},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0xa,'ovr':0x2,'text':"你教他们读战术板，他们教你踩单车。三个月后，你们的连线成了联赛集锦的常客。球探报告里写：这支球队的化学反应，是买不来的。"}:{'guanxi':-0x3,'text':"你觉得他们浪，他们觉得你木。一次训练赛的争执后，更衣室分成了两拨。教练把你们叫进办公室谈了很久。"};}
    },
    {
        'label': "保持距离",
        'hint': "稳",
        'apply': function(){return{'ovr':0x1,'text':"你敬而远之，专注自己的节奏。赛季末你的数据稳稳当当，而那些孩子们来来去去，像潮水。"};}
    }
  ]
},

{
  'id': "lg_jup_step",
  'title': "跳板",
  'icon': '🪜',
  'weight': 0x50,
  'when': function(p){return "jup"===p["leagueId"];},
  'desc': "又一名主力队友在冬窗被五大联赛挖走了。欢送会上经理举杯说：这就是我们的商业模式。轮到你时他眨眨眼：当然，也包括你。",
  'options': [
    {
        'label': "把跳板踩实",
        'p': function(p){return f(0.55,[[p["ovr"],0x48,0.01]],0.25,0.85);},
        'hint': function(p,q){return g(q,"更大的舞台","原地踏步");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'fame':0x8,'text':"半个赛季，你在欧战资格区球队身上连场进球。经纪人的邮件开始多了起来，标题里出现了英超和德甲的名字。"}:{'ovr':-0x1,'text':"你急着表现，越踢越急。冬窗过去了，没有报价。经理拍拍你：别慌，跳板一直都在，先站稳。"};}
    },
    {
        'label': "享受这里的核心位",
        'hint': "关系++",
        'apply': function(){return{'guanxi':0xc,'roleDelta':0x1,'text':"你成了队里的进攻核心，球迷喊你名字的时候，你想起自己曾经也只想把这里当驿站。有些站，待久了就成了家。"};}
    }
  ]
},

{
  'id': "lg_seg_bus",
  'title': "大巴与人工草皮",
  'icon': '🚌',
  'weight': 0x50,
  'when': function(p){return "seg"===p["leagueId"];},
  'desc': "客场大巴开了五个小时，球场是人工草皮，看台离边线只有三米，骂声听得一清二楚。队长吐掉口香糖：习惯这里，你才算真的踢过西班牙足球。",
  'options': [
    {
        'label': "硬碰硬",
        'p': function(p){return f(0.58,[[p["clean"],60,0.005]],0.25,0.88);},
        'hint': function(p,q){return g(q,"客场的男人","吃牌下场");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'clean':-0x2,'text':"你在人工草皮上滑铲、拼抢、还进了一个。主队球迷从骂声变成了沉默。回程大巴上，老队员递给你一颗糖：欢迎毕业。"}:{'ovr':-0x1,'clean':-0x5,'text':"对方后卫整场都在你耳边垃圾话。第七十分钟你回了一句，换来两张黄牌和一场禁赛。更衣室里教练没骂你，只是让你看了眼自己的犯规集锦。"};}
    },
    {
        'label': "少惹事，专注踢球",
        'hint': "清白+",
        'apply': function(){return{'clean':0x4,'ovr':0x1,'text':"骂声就当背景音。你用一脚助攻回应了看台。裁判赛后特意走过来握了握手：难得。"};}
    }
  ]
},

{
  'id': "lg_b2_climb",
  'title': "冲甲积分榜",
  'icon': '📈',
  'weight': 0x50,
  'when': function(p){return "b2"===p["leagueId"];},
  'desc': "德乙还剩十轮，升级区里挤着四支球队，分差三分。俱乐部食堂挂出了倒计时牌，连清洁阿姨都会跟你说：这周日，必须赢。",
  'options': [
    {
        'label': "扛起冲刺重任",
        'p': function(p){return f(0.52,[[p["ovr"],0x49,0.01]],0.22,0.85);},
        'hint': function(p,q){return g(q,"升级功臣","倒在门口");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'fame':0xa,'roleDelta':0x1,'text':"最后三轮你造了四个球。升级确定那天，几千名球迷冲进场内，把你举了起来。香槟的泡沫里，主席凑到你耳边：下赛季，德甲见。"}:{'ovr':-0x2,'text':"倒数第二轮，你们输给了直接竞争对手。更衣室的倒计时牌第二天被摘了下来。主席说：明年再来。可你知道，阵容留不住了。"};}
    },
    {
        'label': "平常心踢完",
        'hint': "心态稳",
        'apply': function(){return{'ovr':0x1,'guanxi':0x4,'text':"你照常训练、恢复、比赛。压力这种东西，你见过太多起落。赛季结束，成绩单不算完美，但你自己的数据，是生涯最佳。"};}
    }
  ]
},

{
  'id': "lg_ch_grind",
  'title': "四十六轮",
  'icon': '♻️',
  'weight': 0x50,
  'when': function(p){return "ch"===p["leagueId"];},
  'desc': "英冠四十六轮，外加两项杯赛。周二周六连轴转，队医的按摩床比替补席还忙。老门将咧嘴一笑：想上英超？先在这磨盘里滚一年。",
  'options': [
    {
        'label': "把自己练成铁人",
        'p': function(p){return f(0.55,[[p["age"],27,-0.02],[p["ovr"],0x47,0.008]],0.2,0.85);},
        'hint': function(p,q){return g(q,"全勤铁人","积劳成伤");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'health':0.95,'roleDelta':0x1,'text':"你打满了四十四场。季末颁奖礼，队友们把「球员先生」的奖杯塞进你怀里。主教练说：他就是这台机器的心脏。"}:{'ovr':-0x2,'health':1.15,'text':"三月，疲劳性骨折。你打着石膏看完了冲刺阶段，看着球队差两分掉出附加赛区。队医说：年轻人，这不是英超，没人会让你轮休。"};}
    },
    {
        'label': "聪明地分配体力",
        'hint': "养生流",
        'apply': function(){return{'health':0.92,'ovr':0x1,'text':"你跟队医制定了轮换计划，关键战必上，鸡肋杯赛让路。有人质疑你不够拼，直到冲刺期所有人都垮了，只有你还站着。"};}
    }
  ]
},

{
  'id': "lg_jl_detail",
  'title': "细节即一切",
  'icon': '📐',
  'weight': 0x50,
  'when': function(p){return "jl"===p["leagueId"];},
  'desc': "训练结束后，全队留下来复盘录像——不是比赛，是上午的训练。每一个传球角度、每一次回防步点都被标了出来。主帅说：在这里，细节就是尊重。",
  'options': [
    {
        'label': "融入这种偏执",
        'p': function(p){return f(0.7,[[p["talent"],1,0.28]],0.4,0.92);},
        'hint': function(p,q){return g(q,"脱胎换骨","消化不良");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'text':"两个月后，你的无跑动回合减少了七成。日本媒体写：这个中国球员，踢得比日本人还日本人。你把剪报贴在了储物柜内侧。"}:{'ovr':-0x1,'text':"你被那些细到毫米的要求压得喘不过气，反而丢了即兴的天赋。教练看出你的僵硬，破例让你自由踢了一周。"};}
    },
    {
        'label': "取其精华去其糟粕",
        'hint': "自成一派",
        'apply': function(){return{'ovr':0x1,'guanxi':0x4,'text':"你学他们的恢复流程和录像习惯，但保留了射门前的直觉。主帅评价：他有纪律，也有火花。这是最好的组合。"};}
    }
  ]
},

{
  'id': "lg_kl_service",
  'title': "兵役倒计时",
  'icon': '⏳',
  'weight': 0x50,
  'when': function(p){return "kl"===p["leagueId"];},
  'desc': "你的韩国室友刚过二十五岁生日，桌上多了一份兵役体检通知。他笑着问你：中国是不是没有这个？你说没有。他沉默了一会儿：那我可能只剩两年职业生涯了。",
  'options': [
    {
        'label': "帮他备战体能测试",
        'p': function(p){return f(0.68,[[p["guanxi"],45,0.008]],0.38,0.92);},
        'hint': function(p,q){return g(q,"过线了","差点意思");},
        'apply': function(p,q,s){return d(q,s)?{'guanxi':0xe,'text':"你陪他加练了一个月，替他掐表、递水、喊口令。成绩公布那天他过了线，抱住你哭了一场。他说：等我从军队回来，还要跟你做队友。"}:{'guanxi':0x6,'text':"测试差了一点，要二次复检。他嘴上说没事，那晚却在阳台抽了很久的烟。你能做的，只有陪着。"};}
    },
    {
        'label': "聊聊两种人生",
        'hint': "关系+",
        'apply': function(){return{'guanxi':0x8,'ovr':0x1,'text':"你们聊了很多：关于义务、关于选择、关于两年空白期怎么保持状态。他说：跟你聊天真好，好像我的暂停键没那么可怕了。"};}
    }
  ]
},

{
  'id': "lg_mls_coast",
  'title': "五个时区",
  'icon': '✈️',
  'weight': 0x50,
  'when': function(p){return "mls"===p["leagueId"];},
  'desc': "这周先飞西海岸，再飞回来打主场，下周又是东海岸。队友们人手一个颈枕，行李箱轮子磨平了。队长说：在这个联盟，旅途本身就是第十二人。",
  'options': [
    {
        'label': "学会在飞机上恢复",
        'p': function(p){return f(0.62,[[p["age"],28,-0.02],[p["ovr"],0x46,0.008]],0.28,0.9);},
        'hint': function(p,q){return g(q,"空中飞人","时差拖垮");},
        'apply': function(p,q,s){return d(q,s)?{'ovr':0x2,'health':0.95,'text':"压缩袜、定时补水、落地即睡。一个月横跨四次时区，你的体测数据不降反升。队医逢人就夸：这家伙把客机住成了理疗中心。"}:{'ovr':-0x2,'health':1.1,'text':"连续五周飞行后，你在训练场上睡着了。不是开玩笑——拉伸做到一半，靠着标志锥就眯了过去。队医强制你休了三天。"};}
    },
    {
        'label': "顺路看看这个国家",
        'hint': "心态+",
        'apply': function(){return{'ovr':0x1,'fame':0x4,'text':"大峡谷、芝加哥的风、纽约的雨夜机场。你把这些都记进了随行笔记。足球之外，这段漂泊成了你人生最特别的部分之一。"};}
    }
  ]
},

{'id':"tier_super_focus",'title':"全世界的瞄准镜",'icon':'🎯','weight':0x40,'when':function(p){return p["ovr"]>=0x5a&&p["roleRank"]>=0x3;},'desc':"赛前准备会上，助教放出对手最近三场的录像——每一帧里，都有一个人贴着你。主教练合上笔记本说：他们练了一整周，就为了掐死你一个人。",'options':[{'label':"把包夹变成机会",'p':function(p){return f(0.5,[[p["ovr"],0x5a,0.008]],0.3,0.85);},'hint':function(p,q){return g(q,"撕开包围","被锁死了");},'apply':function(p,q,s){return d(q,s)?{'fame':0xa,'ovr':0x2,'text':"你故意往人堆里走，把两个人拖出防区，第三十分钟一脚横传，队友空门推射。赛后对方主帅黑着脸离场——他的战术没有错，只是你比他想的更大度。"}:{'ovr':-0x1,'text':"两个人像影子一样跟着你，你碰了三次球丢了三次。半场被换下时，看台上有零星的嘘声。主教练说：下次学会躲。可你是核心啊，躲去哪？"};}},{'label':"让队友多打",'hint':"团队优先",'apply':function(){return{'guanxi':0x8,'fame':-0x2,'text':"你主动跟教练说：让他们盯，其他人肯定有空位。那场比赛你零射门，两次助攻。数据栏很朴素，但更衣室里所有人都在拍你的肩。"};}}]},

{'id':"tier_super_heir",'title':"你的继承人",'icon':'🧒','weight':0x3e,'when':function(p){return p["ovr"]>=0x5a&&p["age"]>=0x1c;},'desc':"俱乐部开放日，一个青训小孩攥着你的球衣找你签名，说他是看你比赛长大的。你愣了一下——原来你已经到了被人当作「起点」的年纪。",'options':[{'label':"认真当这个偶像",'p':function(p){return f(0.7,[[p["guanxi"],45,0.008]],0.4,0.92);},'hint':function(p,q){return g(q,"薪火相传","偶像包袱");},'apply':function(p,q,s){return d(q,s)?{'fame':0x8,'guanxi':0x6,'ovr':0x1,'text':"之后每个开放日你都提前一小时到，教那孩子停球。两年后他在预备队戴上了队长袖标，接受采访第一句是：感谢那个没糊弄我的人。"}:{'fame':-0x3,'text':"你随口签了名就走了。后来在报纸上看到他说「现实中的他和电视上不一样」。你盯着那行字看了很久，说不上是什么感觉。"};}},{'label':"把压力讲给他听",'hint':"真诚，关系+",'apply':function(){return{'guanxi':0xa,'text':"你没签名，而是坐下来跟他聊了半小时：这条路有多苦，多少天才半路消失。小孩走的时候眼睛发亮。你忽然明白，真正的传承不是签名，是把真话说给他听。"};}}]},

{'id':"tier_main_voice",'title':"更衣室的分量",'icon':'🗣','weight':0x40,'when':function(p){return p["ovr"]>=0x50&&p["ovr"]<0x5a&&p["roleRank"]>=0x3&&p["_captain"]!==p["teamId"];},'desc':"一个年轻队友训练迟到、比赛隐身，老队长让你去找他谈谈——「你现在说话，有人听了。」你才意识到，自己在更衣室里的座位，已经换到中间那一排了。",'options':[{'label':"推心置腹地谈",'p':function(p){return f(0.68,[[p["guanxi"],45,0.008]],0.38,0.92);},'hint':function(p,q){return g(q,"敲醒了","谈崩了");},'apply':function(p,q,s){return d(q,s)?{'guanxi':0x6,'text':"你没讲大道理，只问了一句：你还记得为什么开始踢球吗。他沉默了很久。第二周训练，他第一个到场。队长冲你挑了挑眉——这支球队的一半，现在交给你了。"}:{'guanxi':-0x2,'text':"他当场翻了脸：轮得到你管我？更衣室的气氛僵了一周。你学到一件事：说话的分量不在于敢不敢，而在于别人服不服。"};}},{'label':"只管好自己",'hint':"明哲保身",'apply':function(){return{'clean':0x3,'guanxi':-0x2,'text':"你婉拒了：我还想再多踢几年球。队长笑笑没勉强。那天之后你发现，中间那排的座位，好像也没那么稳。"};}}]},

{'id':"tier_main_ceiling",'title':"天花板之问",'icon':'🧱','weight':0x3e,'when':function(p){return p["ovr"]>=0x50&&p["ovr"]<0x5a;},'desc':"专栏文章把你排进「联赛十大令人失望球员」候选，理由是：天赋肉眼可见，进步却停在了两年前。第二天教练把你叫进办公室，桌上放着你的体测报告。",'options':[{'label':"直面瓶颈，加练突破",'p':function(p){return f(0.55,[[p["talent"],1,0.3]],0.25,0.85);},'hint':function(p,q){return g(q,"捅破窗户纸","原地踏步");},'apply':function(p,q,s){return d(q,s)?{'ovr':0x3,'fame':0x4,'text':"你和教练一起重看了两年的比赛录像，找到了那个被忽略的坏习惯。改掉它的第四场，你打进赛季最佳进球。那篇专栏作者发了条道歉动态。"}:{'ovr':-0x1,'text':"你加练了，很苦，但赛季结束数据几乎没变。有些墙撞不开，可能真的需要换个姿势——或者换堵墙。"};}},{'label':"接受现在的自己",'hint':"心态平稳",'apply':function(){return{'guanxi':0x5,'text':"你对教练说：我知道自己几斤几两，把我放在合适的位置，我能踢得很稳。之后的十场比赛你零失误。稳定，也是一种没人夸但人人需要的品质。"};}}]},

{'id':"tier_rot_wheel",'title':"轮换的齿轮",'icon':'🔄','weight':0x42,'when':function(p){return p["ovr"]>=0x46&&p["ovr"]<0x50;},'desc':"教练宣布新赛季实行大轮换：没有人有固定首发，状态决定一切。你盯着名单看了三遍，自己的名字一会儿在十一人里，一会儿在替补席。",'options':[{'label':"每次机会都当决赛踢",'p':function(p){return f(0.58,[[p["clean"],60,0.005]],0.28,0.88);},'hint':function(p,q){return g(q,"坐稳轮换前列","起起落落");},'apply':function(p,q,s){return d(q,s)?{'ovr':0x2,'roleDelta':0x1,'text':"杯赛帽子戏法，联赛绝杀助攻，你成了轮换体系里最不需要被解释的那个名字。记者问你怎么看待轮换，你说：齿轮转得快不快，看的是每颗齿够不够硬。"}:{'ovr':-0x1,'text':"上一场最佳，这一场失误，下一场坐板凳。你的心跳跟着名单公布日一起一落。妻子说你半夜说梦话都在喊「让我上」。这就是轮换的人生。"};}},{'label':"和教练确认定位",'hint':"心里有底",'apply':function(){return{'guanxi':0x4,'ovr':0x1,'text':"你直接问了教练：我在您的计划里是什么角色？他给了你一个诚实的答案。答案不算完美，但从那天起，你不再每周末都失眠。"};}}]},

{'id':"tier_rot_loan",'title':"租借名单上的名字",'icon':'📦','weight':0x40,'when':function(p){return p["ovr"]>=0x46&&p["ovr"]<0x50&&p["clubRep"]>=0x3;},'desc':"经纪人来电：俱乐部把你列进了冬窗租借名单——去低级别球队踢半年，「积累比赛经验」。你在这支球队的出场时间，确实只有个位数。",'options':[{'label':"接受租借去练级",'p':function(p){return f(0.62,[[p["age"],23,-0.03]],0.3,0.9);},'hint':function(p,q){return g(q,"练级成功","荒废半年");},'apply':function(p,q,s){return d(q,s)?{'ovr':0x3,'text':"小球队给了你全部球权和无限开火令。半年二十次首发，你把板凳坐出的锈全都磨掉了。回归那天，一线队教练在机场接你：欢迎回来，这次是真的回来。"}:{'ovr':-0x2,'health':1.05,'text':"低级别联赛的犯规又脏又密，第五周你就伤了。躺在出租屋养伤的日子里，你看着窗外想：练级这条路，原来也有怪物。"};}},{'label':"拒绝，留守竞争",'hint':"高风险高自尊",'apply':function(){return{'ovr':0x1,'guanxi':-0x3,'text':"你告诉经纪人：要走就转会，我不租借。消息传到更衣室，有人说你有骨气，有人说你不识抬举。半个赛季后，你在杯赛抓住了唯一的机会——进球那一刻，你看向替补席。"};}}]},

{'id':"tier_low_bench",'title':"陪练的日子",'icon':'🪑','weight':0x42,'when':function(p){return p["ovr"]<0x46&&p["roleRank"]<=0x1;},'desc':"联赛过半，你的出场时间定格在补时阶段的两分钟。训练场上你要假装是对面的哈兰德供主力们演练，训练结束还要留下来帮装备师收球。",'options':[{'label':"把陪练当事业干",'p':function(p){return f(0.6,[[p["guanxi"],45,0.008]],0.3,0.9);},'hint':function(p,q){return g(q,"等到机会","继续等待");},'apply':function(p,q,s){return d(q,s)?{'ovr':0x2,'guanxi':0x8,'text':"你的模拟逼真到主力们开始点名要你来当假想敌。第十九轮，主力前锋流感，你顶上去进了制胜球。赛后主教练搂着你：看吧，我一直说训练场上的你就是这个水平。"}:{'ovr':-0x1,'guanxi':0x4,'text':"机会始终没来。但装备师逢人就夸你是全队最勤的人，预备队的小孩都喊你哥。有些价值记分牌上看不见，但更衣室里人人心里有数。"};}},{'label':"申请外租寻找出路",'hint':"主动求变",'apply':function(){return{'ovr':0x2,'guanxi':-0x3,'text':"你和教练摊牌：再这样下去我会废掉的。俱乐部最终同意冬窗听报价。未知是可怕的，但比未知更可怕的是一眼望到头的替补席。"};}}]},

{'id':"tier_low_king",'title':"小城之王",'icon':'👑','weight':0x44,'when':function(p){return p["ovr"]<0x46&&p["roleRank"]>=0x3&&p["clubRep"]<=0x2;},'desc':"这家小俱乐部的实力撑不起顶级联赛，但这里是你的王国：全队进攻从你这发起，看台上两千名球迷喊着你的名字。大城市的球场再豪华，也没有这里的一声「我们的10号」好听。",'options':[{'label':"守护这座小城",'p':function(p){return f(0.7,[[p["guanxi"],40,0.01]],0.4,0.92);},'hint':function(p,q){return g(q,"传奇延续","英雄迟暮");},'apply':function(p,q,s){return d(q,s)?{'fame':0x6,'guanxi':0xa,'ovr':0x2,'text':"赛季末你拒绝了仅有的那份高一级联赛报价，俱乐部主席激动得语无伦次。第二年你带队升上了更高的舞台，全城的报纸头版只有一个标题：他留下了。"}:{'ovr':-0x2,'guanxi':0x3,'text':"岁月不饶人，你的速度一年不如一年。年轻人开始越过你拿球，看台上的呼声也换了名字。你在更衣室坐了很久——王朝更替，古来如此。"};}},{'label':"带队冲击升级",'hint':"豪赌一把",'apply':function(){return{'ovr':0x2,'fame':0x6,'text':"你召集全队立军令状：今年必须升级。过程跌跌撞撞，最终倒在附加赛点球大战。但你罚进了本队的每一个点球。看台横幅写着：明年再来，我们等你。"};}}]},

{'id':"abr_nat_es",'title':"抢圈是这里的一切",'icon':'🔵','weight':0x30,'stage':"youth",'repeat':1,'when':function(p){return p["inAcadem"+'y']&&p["youthAbroad"]&&'ES'===p["country"];},'desc':"每天训练的第一个科目永远是抢圈：六个人围一圈，两个人在中间追。教练说，在这块土地上，抢圈丢球的人不配谈战术。",'options':[{'label':"把两脚出球练到极致",'p':function(p){return f(0.65,[[p["talent"],1,0.3]],0.35,0.92);},'hint':function(p,q){return g(q,"融进了血液","被晾在圈里");},'apply':function(p,q,s){return d(q,s)?{'ovr':0x2,'text':"三个月后，你成了圈里坚持最久的那个人。队友开始学你接球前的那半步移动。教练只说了一句：现在你像个西班牙球员了。"}:{'ovr':-0x1,'text':"你总想多带一步。每次丢球，全组罚跑，你的名字成了口令。晚上你加练对墙传接，墙皮都踢掉了一块。"};}},{'label':"观察他们怎么思考",'hint':"学意识",'apply':function(){return{'ovr':0x1,'text':"你不急着触球，先看：他们的身体永远朝向下一个传球点。这个细节你记了满满一本笔记。"};}}]},

{'id':"abr_nat_de",'title':"双轨制的下午",'icon':'📚','weight':0x30,'stage':"youth",'repeat':1,'when':function(p){return p["inAcadem"+'y']&&p["youthAbroad"]&&p["country"]==='DE';},'desc':"上午在俱乐部训练，下午要去合作中学上课，一门都不能挂。德国人说：青训不是造机器，是要造完整的人——虽然他们说这话时你刚跑完十二分钟折返。",'options':[{'label':"两头都不放松",'p':function(p){return f(0.6,[[p["clean"],60,0.005]],0.3,0.9);},'hint':function(p,q){return g(q,"德式全能","顾此失彼");},'apply':function(p,q,s){return d(q,s)?{'ovr':0x2,'text':"期末考你过了全部科目，体测数据排梯队前三。德国教练在评语里写了一个词：verlässlich——可靠。他说这个词比天赋值钱。"}:{'ovr':-0x1,'text':"德语语法和战术板在你脑子里搅成一团。月考挂了两门，俱乐部约谈了你和你监护人：学业不达标，注册会被暂停。"};}},{'label':"专注训练这一头",'hint':"风险与回报",'apply':function(){return{'ovr':0x2,'text':"你跟文化课老师摊牌：我的人生在球场上。她叹了口气，给你划了最低限度的复习范围。你压线过了——然后把自己扔进了力量房。"};}}]},

{'id':"abr_nat_en",'title':"看台上的陌生人",'icon':'📋','weight':0x30,'stage':"youth",'repeat':1,'when':function(p){return p["inAcadem"+'y']&&p["youthAbroad"]&&p["country"]==='EN';},'desc':"英甲球队 U18 联赛的周六早晨，场边站满了人：家长、球探、还有一个端着热茶不停做笔记的老头。领队说：这里的每一场青年队比赛，都有二十双职业的眼睛。",'options':[{'label':"把对抗拉满给他们看",'p':function(p){return f(0.58,[[p["ovr"],0x46,0.01]],0.28,0.88);},'hint':function(p,q){return g(q,"名单上有你了","差一口气");},'apply':function(p,q,s){return d(q,s)?{'fame':0x8,'ovr':0x2,'text':"你在雨里赢下了七次一对一，还造了一张红牌。周一，那个做笔记的老头出现在了一线队训练基地的前台。领队冲你扬了扬下巴：有人问你的名字了。"}:{'ovr':-0x1,'text':"英国孩子的身体对抗像橄榄球。你摔了无数次，数据栏一片空白。回程大巴上领队递给你一块巧克力：在这里，硬汉比天才先吃上饭。"};}},{'label':"用技术说话",'hint':"另一条路",'apply':function(){return{'ovr':0x1,'fame':0x4,'text':"你避开了所有硬碰硬，用两次转身过人和一脚贴地斩上了本地报纸的青年版。标题写着：这个东方孩子有点东西。"};}}]},

{'id':"abr_nat_jp",'title':"练习结束之后",'icon':'🧹','weight':0x30,'stage':"youth",'repeat':1,'when':function(p){return p["inAcadem"+'y']&&p["youthAbroad"]&&p["country"]==='JP';},'desc':"训练结束，没有一个人走。全队排成一列捡拾球场上的草屑和落叶，连主力前锋都在弯腰拔草。部长级的前辈路过你身边，轻轻说了一句：球场记得每一个善待它的人。",'options':[{'label':"拿起工具一起干",'p':function(p){return f(0.75,[[p["guanxi"],40,0.008]],0.45,0.94);},'hint':function(p,q){return g(q,"被接纳了","笨手笨脚");},'apply':function(p,q,s){return d(q,s)?{'guanxi':0xa,'text':"你把捡草屑也做出了标准动作，前辈们相视一笑。周末的合宿名单上第一次出现了你的名字。在日本，被邀请参加合宿意味着：你已经是「自己人」了。"}:{'guanxi':-0x2,'text':"你分不清哪种耙子收拾哪种草，越帮越乱。前辈没说什么，只是默默把你那片重新弄了一遍。当晚你对着手机翻译软件查了一小时「球场养护」。"};}},{'label':"主动申请打扫更衣室",'hint':"诚意拉满",'apply':function(){return{'guanxi':0xc,'ovr':0x1,'text':"你承包了更衣室的清洁。一个月后，队长把一个旧臂章放在你的柜子上：这是队里给最认真的人的传统。"};}}]},

{'id':"abr_nat_kr",'title':"队内序列",'icon':'🎒','weight':0x30,'stage':"youth",'repeat':1,'when':function(p){return p["inAcadem"+'y']&&p["youthAbroad"]&&p["country"]==='KR';},'desc':"韩国梯队的规矩写在看不见的地方：吃饭时按年级坐，训练后低年级要帮高年级背包、收拾装备。你是队里唯一的插班生，也是年纪最小的——所有人都等着看你懂不懂事。",'options':[{'label':"入乡随俗",'p':function(p){return f(0.72,[[p["guanxi"],40,0.008]],0.42,0.93);},'hint':function(p,q){return g(q,"序列认可","忍出内伤");},'apply':function(p,q,s){return d(q,s)?{'guanxi':0xa,'text':"你背了一个月的包，帮了两周的水壶。直到某天训练赛，你过了他们的国脚级中卫——从那天起，前辈们改口叫你「弟弟」的时候带了笑。序列还在，但位置变了。"}:{'guanxi':-0x3,'text':"你背着包摔了一跤，装备散了一地。前辈的脸色很不好看。那晚你想家想到失眠——但第二天，你还是第一个到场的。"};}},{'label':"用表现赢得尊重",'hint':"实力说话",'apply':function(){return{'ovr':0x2,'guanxi':-0x3,'text':"你拒绝了所有杂务：我是来踢球的。更衣室安静了几天。然后你在教学赛连过三人打进一球，前辈拍了拍你的头：好，那就用球说话吧。两种规矩，你选了另一种活法。"};}}]},

{'id':"abr_nat_fr",'title':"十种语言的战术板",'icon':'🌍','weight':0x30,'stage':"youth",'repeat':1,'when':function(p){return p["inAcadem"+'y']&&p["youthAbroad"]&&p["country"]==='FR';},'desc':"这支法国梯队的更衣室里，塞内加尔语、葡语、阿拉伯语和法语各占一角。战术讲解要翻译三遍。你说不好这是混乱还是宝藏，只知道这里的每个天才背后都有一段漂泊的故事。",'options':[{'label':"把每种语言都学一句",'p':function(p){return f(0.7,[[p["talent"],1,0.3]],0.4,0.92);},'hint':function(p,q){return g(q,"团宠诞生","闹了笑话");},'apply':function(p,q,s){return d(q,s)?{'guanxi':0xa,'ovr':0x1,'text':"你学会了用四国语言喊「传给我」。训练场上笑声不断，但配合真的变好了。教练说：足球是最简单的世界语，而你是最好的翻译官。"}:{'guanxi':0x3,'text':"你的一句问候让整个更衣室笑翻了——后来才知道那是句玩笑话。不过没关系，笑完之后，大家记住了这个敢开口的东方人。"};}},{'label':"埋头苦练少说话",'hint':"稳",'apply':function(){return{'ovr':0x2,'text':"语言不通没关系，你的跑位就是语言。三场比赛五个进球之后，队友们开始主动找你配合。有些融入不需要开口。"};}}]},

{
  'id': "youth_type_shift",
  'title': "位置感的觉醒",
  'icon': '🔄',
  'weight': 0x38,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){return p["inAcademy"]&&!p["_typeShiftDone"]&&p["playerType"]!==11;},
  'desc': function(p){
    var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
    var cur=p["playerType"]!=null?p["playerType"]:11;
    var adjByGrp={
      'att':{0:[3,4],1:[2,5],2:[1,4],3:[0,2],4:[0,2],5:[1,2]},
      'mid':{1:[5,6],5:[1,6],6:[1,7],7:[6]},
      'def':{8:[9],9:[8,10],10:[9]}
    };
    var adj=adjByGrp[p["posGroup"]];
    if(!adj)return null;
    var cands=adj[cur];
    if(!cands||!cands.length)return null;
    var tgt=cands[Math.floor(Math.random()*cands.length)];
    p._shiftTarget=tgt;
    return "训练结束后教练把你叫住：「你最近的表现让我觉得，你可能更适合踢"+TN[tgt]+"。」他摊开战术板，画了几个跑位路线。也许，是时候换个方式了。";
  },
  'options': [
    {
      'label': "试试看",
      'p': function(p){return f(0.55,[[p["talent"],1,0.25],[p["ovr"],40,0.005]],0.25,0.85);},
      'hint': function(p,q){
        var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
        var tgt=p._shiftTarget!=null?p._shiftTarget:0;
        return g(q,"转型成功→"+TN[tgt],"转型失败");
      },
      'apply': function(p,q,s){
        var tgt=p._shiftTarget!=null?p._shiftTarget:0;
        return d(q,s)?{'playerType':tgt,'ovr':0x2,'_typeShiftDone':1,'text':"你试了教练的方案，发现那种跑位和思维方式竟然出奇地顺畅。几周后，你在训练赛里用新位置的方式打进一球——教练笑着点了点头。"}
        :{'ovr':-0x1,'_typeShiftDone':1,'text':"你照着教练画的路线跑了两周，但身体总是往原来的位置上凑。教练说：也许时机不对，先放一放。"};
      }
    },
    {
      'label': "坚持自己的风格",
      'hint': "稳一点",
      'apply': function(){return{'ovr':0x1,'_typeShiftDone':1,'text':"你礼貌地告诉教练：谢谢，但我想先把现在的位置踢到极致。教练没说什么，只是在下次训练里多看了你几眼。"};}
    }
  ]
},

{
  'id': "youth_type_evolve",
  'title': "训练赛的意外发现",
  'icon': '💡',
  'weight': 0x35,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){return p["inAcademy"]&&!p["_typeShiftDone"]&&p["playerType"]!==11&&p["age"]>=15;},
  'desc': function(p){
    var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
    var cur=p["playerType"]!=null?p["playerType"]:11;
    var evoByGrp={
      'att':{0:[4,2],1:[5,2],2:[1,4],3:[2,0],4:[2,3],5:[1,3]},
      'mid':{1:[6,5],5:[1,7],6:[5,7],7:[6,5]},
      'def':{8:[10,9],9:[8,10],10:[9,8]}
    };
    var evo=evoByGrp[p["posGroup"]];
    if(!evo)return null;
    var cands=evo[cur];
    if(!cands||!cands.length)return null;
    var tgt=cands[Math.floor(Math.random()*cands.length)];
    p._evoTarget=tgt;
    return "队内训练赛，你被临时安排到一个不熟悉的位置。你本来只想应付了事，却发现自己在这个新位置上竟然踢出了不一样的东西。";
  },
  'options': [
    {
      'label': "认真研究这个位置",
      'p': function(p){return f(0.50,[[p["talent"],1,0.3],[p["clean"],50,0.004]],0.20,0.82);},
      'hint': function(p,q){
        var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
        var tgt=p._evoTarget!=null?p._evoTarget:0;
        return g(q,"融会贯通→"+TN[tgt],"还是算了");
      },
      'apply': function(p,q,s){
        var tgt=p._evoTarget!=null?p._evoTarget:0;
        return d(q,s)?{'playerType':tgt,'ovr':0x3,'_typeShiftDone':1,'text':"你花了一周看录像、加练，渐渐摸到了那个位置的门道。教练赛后拍着你的肩说：你看，你的能力不止一种用法。"}
        :{'ovr':0x1,'_typeShiftDone':1,'text':"你试了几次，但总觉得隔了一层。教练说：没关系，知道自己不适合什么，也是一种进步。"};
      }
    },
    {
      'label': "还是回到熟悉的位置",
      'hint': "保险",
      'apply': function(){return{'ovr':0x1,'_typeShiftDone':1,'text':"你婉拒了：我现在的位置还没踢明白，不想分心。教练点点头，没再提。"};}
    }
  ]
},

{
  'id': "youth_type_late",
  'title': "最后一次机会",
  'icon': '⏰',
  'weight': 0x32,
  'stage': "youth",
  'repeat': 1,
  'when': function(p){return p["inAcademy"]&&!p["_typeShiftDone"]&&p["playerType"]!==11&&p["age"]>=17;},
  'desc': function(p){
    var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
    var cur=p["playerType"]!=null?p["playerType"]:11;
    var allByGrp={
      'att':[0,1,2,3,4,5],'mid':[1,5,6,7],'def':[8,9,10]
    };
    var pool=allByGrp[p["posGroup"]];
    if(!pool)return null;
    var filtered=pool.filter(function(x){return x!==cur;});
    if(!filtered.length)return null;
    var tgt=filtered[Math.floor(Math.random()*filtered.length)];
    p._lateTarget=tgt;
    return "离毕业考核只剩最后几个月。你偶然看到一线队的比赛录像，某个球员的踢法让你心动了——也许你也能那样踢。";
  },
  'options': [
    {
      'label': "大胆改变",
      'p': function(p){return f(0.48,[[p["talent"],1,0.35],[p["age"],18,-0.04]],0.18,0.80);},
      'hint': function(p,q){
        var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
        var tgt=p._lateTarget!=null?p._lateTarget:0;
        return g(q,"涅槃重生→"+TN[tgt],"为时已晚");
      },
      'apply': function(p,q,s){
        var tgt=p._lateTarget!=null?p._lateTarget:0;
        return d(q,s)?{'playerType':tgt,'ovr':0x3,'_typeShiftDone':1,'text':"最后几个月你像变了个人，每天加练到最晚。毕业考核那天，你用全新的方式完成了一次教科书般的进球。教练在评估表上写下：此人上限不止于此。"}
        :{'ovr':-0x2,'_typeShiftDone':1,'text':"改变来得太晚了。身体习惯已经定型，新学的东西和旧的互相打架。考核日你表现平平，教练叹了口气：可惜了，早点下决心就好了。"};
      }
    },
    {
      'label': "留到职业赛场再说",
      'hint': "以后再变",
      'apply': function(){return{'ovr':0x1,'_typeShiftDone':1,'text':"你把那个念头压了下去。也许等到了职业赛场，有了更好的教练和队友，再做改变也不迟。至少现在，先把基础打牢。"};}
    }
  ]
},

{
  'id': "injury_type_shift",
  'title': "伤后的抉择",
  'icon': '🩹',
  'weight': 0x50,
  'repeat': 1,
  'when': function(p){return p["_severeInjury"]&&p["playerType"]!==11;},
  'desc': function(p){
    var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
    var cur=p["playerType"]!=null?p["playerType"]:11;
    var injuryTarget={
      'att':{0:0,1:0,2:0,3:0,4:0,5:0},
      'mid':{1:6,5:6,6:6,7:6},
      'def':{8:10,9:10,10:10}
    };
    var grp=p["posGroup"];
    var map=injuryTarget[grp];
    if(!map||map[cur]==null)return null;
    var tgt=map[cur];
    p._injTarget=tgt;
    return "严重的伤病让你不得不重新审视自己的踢法。身体恢复后，教练建议你换个方式踢——也许能延长你的职业生涯。";
  },
  'options': [
    {
      'label': "接受转型",
      'p': function(p){return f(0.55,[[p["talent"],1,0.2],[p["age"],28,-0.02]],0.25,0.85);},
      'hint': function(p,q){
        var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
        var tgt=p._injTarget!=null?p._injTarget:0;
        return g(q,"转型成功→"+TN[tgt],"转型失败");
      },
      'apply': function(p,q,s){
        var tgt=p._injTarget!=null?p._injTarget:0;
        return d(q,s)?{'playerType':tgt,'ovr':0x2,'_severeInjury':0,'text':"你接受了教练的建议，花了三个月适应新的位置和踢法。虽然过程痛苦，但你发现自己在这个新位置上反而活得更自在了。"}
        :{'playerType':tgt,'ovr':-0x2,'_severeInjury':0,'text':"你硬着头皮试了新位置，但身体记忆太顽固。转型没成功，反而因为不适应掉了状态。不过至少，你试过了。"};
      }
    },
    {
      'label': "不转，硬扛",
      'hint': "能力-3",
      'apply': function(){return{'ovr':-0x3,'_severeInjury':0,'text':"你拒绝了所有人的建议：我就是我，不需要变。伤愈后你回到了原来的位置，但身体已经不如从前。"}}
    }
  ]
},

{
  'id': "vet_type_shift",
  'title': "老将的转型",
  'icon': '🧓',
  'weight': 0x48,
  'repeat': 1,
  'when': function(p){return p["age"]>=32&&p["playerType"]!==11&&!p["_vetTypeShiftDone"];},
  'desc': function(p){
    var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
    var cur=p["playerType"]!=null?p["playerType"]:11;
    var vetTarget={
      'att':{0:0,1:0,2:0,3:0,4:0,5:0},
      'mid':{1:6,5:6,6:6,7:6},
      'def':{8:10,9:10,10:10}
    };
    var grp=p["posGroup"];
    var map=vetTarget[grp];
    if(!map||map[cur]==null)return null;
    var tgt=map[cur];
    if(tgt===cur)return null;
    p._vetTarget=tgt;
    return "年龄不饶人，你的速度和爆发力都在下降。教练找你谈话：是时候换个活法了——经验比身体更值钱。";
  },
  'options': [
    {
      'label': "主动转型",
      'p': function(p){return f(0.60,[[p["talent"],1,0.25],[p["age"],35,-0.03]],0.30,0.88);},
      'hint': function(p,q){
        var TN=['射手','组织核心','全能','速度型','支点','影锋','B2B','铁腰','边后卫','自由人','铁卫','门将'];
        var tgt=p._vetTarget!=null?p._vetTarget:0;
        return g(q,"转型成功→"+TN[tgt],"转型失败");
      },
      'apply': function(p,q,s){
        var tgt=p._vetTarget!=null?p._vetTarget:0;
        return d(q,s)?{'playerType':tgt,'ovr':0x2,'_vetTypeShiftDone':1,'text':"你花了整个夏天加练新位置的技术。新赛季开始，你用经验弥补了身体的退化——虽然不再是从前的你，但依然有用。"}
        :{'playerType':tgt,'ovr':-0x1,'_vetTypeShiftDone':1,'text':"转型比想象中难。旧的习惯根深蒂固，新的位置也学得磕磕绊绊。教练叹了口气：算了，还是按你习惯的来吧。"};
      }
    },
    {
      'label': "不转，拼到退役",
      'hint': "能力-4",
      'apply': function(){return{'ovr':-0x4,'_vetTypeShiftDone':1,'text':"你告诉教练：我的身体我自己清楚。接下来的赛季，你拼尽全力维持状态，但岁月终究不可逆。"}}
    }
  ]
}
];
window["EVENTS"]=j;
}());