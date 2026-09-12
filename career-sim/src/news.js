/* news.js — 世界新闻模块（纯风味广播，零交互零弹窗）
   每季结算时由 sim.js 调用 NEWSGEN(a2, bz) 生成一批条目；
   主要新闻带微量 fx（限幅由 sim.js 执行），次要/风味一律 0 效果。
   权重曲线复用引擎两套设计：联赛用 _LGW 表，球队用 rep 曲线。 */
(function () {
'use strict';

var DATA = window.DATA;
var TEAMS = DATA.TEAMS;
var LGS = DATA.LEAGUES;

/* 联赛权重：与 sim.js _LGW 保持一致 */
var LGW = { 'epl': 2.2, 'liga': 2.2, 'seri': 1.9, 'bund': 1.9, 'l1': 1.7, 'csl': 1.4, 'spl': 1.3, 'mls': 1.2, 'pri': 0.9, 'ere': 0.8, 'tur': 0.7, 'bra': 0.7, 'jup': 0.6, 'mx': 0.6, 'jl': 0.6, 'arg': 0.6, 'kl': 0.45, 'pol': 0.35, 'ch': 0.3, 'seg': 0.3, 'b2': 0.3, 'l2': 0.3, 'serb': 0.3, 'ale': 0.25, 'cl1': 0.25, 'cpl': 0.2 };
/* 球队权重曲线：rep5 高、rep4 中高、rep3 小概率、rep2 以下近乎为零（同杯赛对手曲线思路） */
var REPW = { 5: 8, 4: 5, 3: 2.5, 2: 1, 1: 0.4, 0: 0.2 };

/* 类别元数据：渲染侧 emoji + 标签（game.js 读取） */
window.NEWSMETA = {
    'transfer': { e: '🔄', n: '转会' }, 'coach': { e: '🎽', n: '换帅' }, 'injury': { e: '🏥', n: '伤病' },
    'money': { e: '💰', n: '财经' }, 'youth': { e: '🎓', n: '青训' }, 'club': { e: '🏟', n: '俱乐部' },
    'form': { e: '🏆', n: '战绩' }, 'gossip': { e: '🍉', n: '八卦' }, 'natc': { e: '🇨🇳', n: '国足' },
    'nat': { e: '⚔️', n: '列强' }, 'lg': { e: '📅', n: '联赛' }, 'you': { e: '⭐', n: '主角' },
    'world': { e: '🌍', n: '国际' }, 'home': { e: '🏠', n: '生活' }, 'abroad': { e: '✈️', n: '留洋' },
    'fun': { e: '🎪', n: '趣闻' }, 'champ': { e: '🏆', n: '夺冠' }, 'releg': { e: '⬇️', n: '降级' },
    'upset': { e: '✨', n: '黑马' }, 'slam': { e: '👑', n: '大满贯' }, 'cnfun': { e: '🏮', n: '国内趣闻' }
};

/* 门控辅助 */
function roleRank(a2) { var R = window.DATA.ROLES; var r = R && R[a2.role]; return r ? r.rank : 0; }
function fameOf(a2) { return a2.fame || 0; }

function rnd() { return Math.random(); }
function pick(arr) { return arr[Math.floor(rnd() * arr.length)]; }
/* 按权重抽一个 {w:..} 元素 */
function wpick(list) {
    if (!list || !list.length) return null;
    var tot = 0, i;
    for (i = 0; i < list.length; i++) tot += list[i].w;
    var r = rnd() * tot;
    for (i = 0; i < list.length; i++) { r -= list[i].w; if (r <= 0) return list[i]; }
    return list[list.length - 1];
}
function lgOf(t) { for (var i = 0; i < LGS.length; i++) if (LGS[i].id === t.league) return LGS[i]; return null; }
function lgName(id) { var l = lgOfId(id); return l ? l.name : id; }
function lgOfId(id) { for (var i = 0; i < LGS.length; i++) if (LGS[i].id === id) return LGS[i]; return null; }

/* ── 主题池抽取 ─────────────────────────────────────────── */

/* 近 3 季上过头条的队降权，避免连年同一队刷屏 */
function recentPenalty(a2, tid) {
    var r = a2._newsTids || [], i;
    for (i = 0; i < r.length; i++) if (r[i] === tid) return 0.25;
    return 1;
}
function teamPool(a2) {
    var pool = [], i, t, w;
    for (i = 0; i < TEAMS.length; i++) {
        t = TEAMS[i];
        w = (REPW[t.rep] || 0.2) * (LGW[t.league] || 0.6) * recentPenalty(a2, t.id);
        if (t.id === a2.teamId) w *= 6;
        else if (t.league === a2.leagueId) w *= 3;
        if (w > 0.01) pool.push({ t: t, w: w });
    }
    return pool;
}
function team2Pool(a2, not) {
    var pool = [], i, e;
    var all = teamPool(a2);
    for (i = 0; i < all.length; i++) { e = all[i]; if (e.t.id !== not) pool.push(e); }
    return pool;
}
function lgPool(a2) {
    var pool = [], i, l;
    for (i = 0; i < LGS.length; i++) {
        l = LGS[i];
        var w = LGW[l.id] || 0.6;
        if (l.id === a2.leagueId) w *= 4;
        pool.push({ l: l, w: w });
    }
    return pool;
}
/* 国家队：中国队高权重，世界强队中权重，其余点缀 */
function natList() {
    var ns = window.NATS;
    if (!ns && typeof NATS !== 'undefined') ns = NATS;
    return ns || [];
}
function natPool() {
    var pool = [], i, n, ns = natList();
    for (i = 0; i < ns.length; i++) {
        n = ns[i];
        var w = n.i === 'n_chn' ? 10 : (n.s >= 85 ? 4 : (n.s >= 78 ? 2 : 0.5));
        pool.push({ n: n, w: w });
    }
    return pool;
}

/* 记录上过头条的队 id（近3条），供降权 */
function noteTid(a2, tid) {
    a2._newsTids = a2._newsTids || [];
    a2._newsTids.push(tid);
    while (a2._newsTids.length > 3) a2._newsTids.shift();
}

/* 池条目防重复：2季硬冷却，2~4季内软惩罚（按赛季时间戳判定） */
function useW(a2, id, w) {
    var when = (a2._newsWhen = a2._newsWhen || {})[id];
    var gap = when == null ? 99 : a2.age - when;
    if (gap < 2) return 0;
    if (gap < 4) return w * 0.4;
    return w;
}
function markUsed(a2, id) { (a2._newsWhen = a2._newsWhen || {})[id] = a2.age; }

/* 文本占位符解析 */
function fill(s, ctx) {
    return s.replace(/\{(\w+)\}/g, function (m, k) { return ctx[k] != null ? ctx[k] : m; });
}

/* ── 内容池 ─────────────────────────────────────────────── */
/* 条目格式: {id, t:模板, w:权重, bad:1黑料, fx:{dev/lgDev/wage/fame/gx/nat}}
   主体: s:'team'|'team2'|'lg'|'nat'|'you'|'none'
   token: {T}{T2}球队 {LG}{LG2}联赛 {N}国家队 {YOU}主角 {YT}主角队 {YL}主角联赛 */

var MAJOR_CLUB = [
    { id: 'mj_cl_takeover', c: 'money', t: '财团完成对{T}的收购，新老板在发布会上承诺三年投入创队史纪录，球迷半喜半忧。', w: 10, fx: { dev: 1 } },
    { id: 'mj_cl_injury', c: 'injury', t: '{T}中场核心训练中重伤，确诊赛季报销，队医办公室的灯亮到了凌晨。', w: 10, fx: { dev: -0.5 } },
    { id: 'mj_cl_coach', c: 'coach', t: '{T}官宣换帅，新教练首秀发布会只讲防守，记者席有人当场睡着。', w: 9, fx: { dev: 0.5 } },
    { id: 'mj_cl_dressing', c: 'gossip', t: '{T}更衣室争吵视频外流，主角是谁双方各执一词，俱乐部连夜买热搜。', w: 7, bad: 1 },
    { id: 'mj_cl_academy', c: 'youth', t: '{T}青训营井喷，三名U18同季入选国字号梯队，梯队教练的手机被打爆。', w: 8, fx: { dev: 0.5 } },
    { id: 'mj_cl_stadium', c: 'club', t: '{T}主场扩建方案获批，新增看台正对客队替补席，官网用词是「氛围升级」。', w: 7 },
    { id: 'mj_cl_debt', c: 'money', t: '{T}被曝财政危机，冬窗被迫出售主力套现，球迷在门口挂出「还我球队」横幅。', w: 7, fx: { dev: -0.5 }, bad: 1 },
    { id: 'mj_cl_sponsor', c: 'money', t: '{T}签下队史最大赞助合同，球衣胸前广告从本地水产换成了某新能源品牌。', w: 8 },
    { id: 'mj_cl_legend', c: 'club', t: '{T}传奇队长宣布退役，俱乐部宣布下季为其立雕像，选址就在他骂过裁判的那个角旗区。', w: 7 },
    { id: 'mj_cl_ban', c: 'club', t: '{T}因球迷投掷杂物被罚空场一轮，俱乐部呼吁：「请把激情留在嗓子。」', w: 6, bad: 1 },
    { id: 'mj_cl_streak', c: 'form', t: '{T}开局{LG}七连胜，当地报纸头版标题只用了一个词：疯了。', w: 7 },
    { id: 'mj_cl_flood', c: 'fun', t: '暴雨突袭{T}所在城市，主场草皮下半年长出三种蘑菇，园艺师成了全队最忙的人。', w: 6 },
    { id: 'mj_cl_crowd', c: 'money', t: '{T}球迷众筹买人项目上线，目标金额一小时达成，附加留言：「就当是我们全体的转会费。」', w: 8, fx: { dev: 0.5 } },
    { id: 'mj_cl_ghost', c: 'fun', t: '{T}训练基地被曝「闹鬼」，多名球员称夜里听到传球声，俱乐部回应「是自动洒水器」，但换了保安公司。', w: 6 },
    { id: 'mj_cl_dog', c: 'fun', t: '{T}官宣队宠拉布拉多退役，它担任球童八年零失误，退役仪式上全队为它让出了正中间的位置。', w: 7 },
    { id: 'mj_cl_light', c: 'club', t: '雷击导致{T}主场断电四十分钟，全场球迷用手机灯把看台点亮，俱乐部决定给每位到场者送一盏小夜灯。', w: 6 },
    { id: 'mj_cl_vote', c: 'club', t: '{T}主席竞选落幕，候选人以「每场免费热狗」的承诺高票当选，上任第一件事是扩建热狗档。', w: 6 },
    { id: 'mj_cl_ac', c: 'club', t: '{T}更衣室空调故障，全队光膀子训练的照片走红，运动品牌连夜送来新款背心，广告位都没要钱。', w: 5 },
    { id: 'mj_cl_num', c: 'fun', t: '{T}爆发球衣号码之争：两名新援都要9号，最终解决方案是石头剪刀布，三局两胜。', w: 6 },
    { id: 'mj_cl_roar', c: 'fun', t: '{T}申请在主场加装「声浪收集装置」，把球迷吼声转化成电费，据说一个赛季能省下全部照明钱。', w: 6 }
];

var MAJOR_NAT = [
    { id: 'mj_nt_cn_coach', c: 'natc', t: '国足新帅亮相：归化与青训双轨并行，发布会金句是「我们缺的不是天才，是十一条统一的脑子」。', w: 10, s: 'none', req: function (a2) { return a2.nation === 'cn'; } },
    { id: 'mj_nt_cn_camp', c: 'natc', t: '中国队海外拉练名单公布，教练组带上了三箱辣酱和一套按摩枪，随队记者说这叫「战斗力保障」。', w: 9, s: 'none', req: function (a2) { return a2.nation === 'cn'; } },
    { id: 'mj_nt_cn_youth', c: 'natc', t: '中国青训选材新规出台：12岁以下不许头球，14岁以下不许谈「 出线」两个字。', w: 8, s: 'none', req: function (a2) { return a2.nation === 'cn'; } },
    { id: 'mj_nt_natural', c: 'natc', t: '又一名归化球员完成入籍手续，新护照照片里他穿着国家队围巾，评论区吵了两万楼。', w: 8, s: 'none', fx: { nat: 1 }, req: function (a2) { return a2.nation === 'cn'; } },
    { id: 'mj_nt_w_boot', c: 'injury', t: '{N}当家射手训练中受伤，队医称「问题不大」，该国球迷表示这话他们听过八次。', w: 8 },
    { id: 'mj_nt_w_coach', c: 'coach', t: '{N}足协宣布换帅，新帅上任第一天把训练量翻倍，媒体用「炼狱」形容首堂训练课。', w: 8 },
    { id: 'mj_nt_w_league', c: 'nat', t: '{N}本国联赛宣布扩军到20队，足协主席称「要让每个城市都有球看」，转播商连夜重排价目表。', w: 6 },
    { id: 'mj_nt_w_legend', c: 'nat', t: '{N}功勋队长退役仪式上万人合唱，他抱着奖杯说了三分钟，最后一句是「别学我踢点球」。', w: 6 },
    { id: 'mj_nt_w_form', c: 'form', t: '{N}近期七场不败，FIFA排名飙升，该国球迷开始讨论「是不是该提前订机票」。', w: 7, fx: { nat: 1 } },
    { id: 'mj_nt_w_slump', c: 'form', t: '{N}热身赛三连败，主帅在发布会上反问记者「你行你上」，该片段播放量破千万。', w: 6, fx: { nat: -1 }, bad: 1 },
    { id: 'mj_nt_cn_logo', c: 'natc', t: '中国队新队徽投票开启，候选方案泄露后网友连夜做了一百多版，足协表示「参考，都参考」。', w: 8, s: 'none', req: function (a2) { return a2.nation === 'cn'; } },
    { id: 'mj_nt_cn_grass', c: 'natc', t: '国足主场草坪升级为混合草，草种据说「被决赛级球场验证过」，老球迷表示先赢球再说。', w: 7, s: 'none', req: function (a2) { return a2.nation === 'cn'; } },
    { id: 'mj_nt_w_school', c: 'youth', t: '{N}宣布全国校园联赛改革，冠军队伍可与国家队踢一场表演赛，报名学校挤爆了服务器。', w: 7 },
    { id: 'mj_nt_w_capt', c: 'nat', t: '{N}队长受访谈压力：「我们背着全国的期望，所以鞋带都系两遍。」', w: 6 },
    { id: 'mj_nt_w_gk', c: 'fun', t: '{N}门将因扑点前「跟对方前锋聊天气」被写成专题报道，那位前锋承认「确实被聊慌了」。', w: 6 },
    { id: 'mj_nt_cn_u21', c: 'youth', t: '中国队征召名单新增三名U21小将，教练组的说法是「年轻人上来喘口气，老队员别紧张」。', w: 7, s: 'none', req: function (a2) { return a2.nation === 'cn'; } },
    { id: 'mj_nt_w_open', c: 'nat', t: '{N}备战期间开放一堂公开训练课，门票三分钟抢空，主办方首次启用实名制抽签。', w: 6 }
];

var MAJOR_YOU = [
    { id: 'mj_you_best', c: 'form', t: '{YOU}当选{YL}月最佳球员，颁奖视频里你把奖杯举反了，网友夸你「实力强到不需要看奖杯」。', w: 10, fx: { fame: 1 }, req: function (a2) { return roleRank(a2) >= 3 && fameOf(a2) >= 15; } },
    { id: 'mj_you_scout', c: 'you', t: '豪门球探被拍到坐在{YT}看台上记笔记，镜头扫过时他慌忙把本子扣在了腿上。', w: 9, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'mj_you_doc', c: 'you', t: '以你为主角的纪录片上线，播放量破亿，最火的片段是你替补席上打哈欠。', w: 7, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 15; } },
    { id: 'mj_you_cele', c: 'you', t: '你的庆祝动作成了全网模仿对象，连你妈都录了一条，配文「这动作是他三岁时摔出来的」。', w: 7, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'mj_you_deal', c: 'money', t: '你与运动品牌签下个人代言，首款联名球鞋预售三秒售罄，黄牛价炒到原价四倍。', w: 7, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 12; } },
    { id: 'mj_you_night', c: 'gossip', t: '{YOU}深夜现身某会所的照片登上头条，团队回应「只是聚餐」，评论区并不买账。', w: 6, bad: 1, fx: { fame: -1 }, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'mj_you_agent', c: 'gossip', t: '{YOU}与前经纪人的佣金纠纷开庭，媒体标题起了个花活：「进球容易，算账难。」', w: 5, bad: 1, req: function (a2) { return fameOf(a2) >= 10; } },
    { id: 'mj_you_cover', c: 'you', t: '你登上时尚杂志封面，造型师给你设计的新发型被球迷称作「犯规级灾难」，你自己倒挺满意。', w: 6, req: function (a2) { return fameOf(a2) >= 10; } },
    { id: 'mj_you_math', c: 'fun', t: '你被小学生数学试卷引用了：「{YOU}本赛季进了25球，比去年多8球，问……」你的数学水平被全网担忧。', w: 8, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 10; } },
    { id: 'mj_you_meme', c: 'fun', t: '你的进球庆祝被做成了表情包，使用场景包括但不限于抢到外卖红包和期末及格。', w: 7, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'mj_you_figure', c: 'you', t: '你的官方手办开启预售，首批十万只售罄，头球姿势被还原到「连表情都是狠的」。', w: 6, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 12; } },
    { id: 'mj_you_quote', c: 'you', t: '你的赛后采访金句上了热搜：「赢球的方法很简单，就是把球踢进去。」热门评论：「听君一席话。」', w: 7, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 10; } },
    { id: 'mj_you_game', c: 'fun', t: '你在游戏里的能力值公布，粉丝对你的「头球」评分提出严正抗议，官方回复「敬请赛季末再看」。', w: 6, fx: { fame: 1 }, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'mj_you_market', c: 'fun', t: '{YOU}被拍到在超市亲自买菜挑西瓜，网友：「原来巨星的生活里也有生活的部分。」', w: 5, req: function (a2) { return fameOf(a2) >= 5; } },
    { id: 'mj_you_live', c: 'you', t: '你的亲戚开直播讲你小时候的事，讲到第三天你本人下场连麦，直播间人数瞬间翻了十倍。', w: 6, req: function (a2) { return fameOf(a2) >= 5; } }
];

var MAJOR_LG = [
    { id: 'mj_lg_tv', c: 'money', t: '{LG}新转播合同刷新纪录，各家分成普涨，中游球队经理笑称「终于敢看房价了」。', w: 10, fx: { wage: 0.02 } },
    { id: 'mj_lg_capup', c: 'money', t: '{LG}官方上调薪资帽，经纪人圈当晚集体加班，咖啡销量环比涨了四成。', w: 8, fx: { wage: 0.02 } },
    { id: 'mj_lg_capdown', c: 'money', t: '{LG}出台财政紧缩新政，薪资帽下调，多家俱乐部连夜开会研究「怎么跟球员开口」。', w: 7, fx: { wage: -0.02 } },
    { id: 'mj_lg_fraud', c: 'money', t: '{LG}某队因财务造假被扣分罚款，官方公告用了「深表遗憾」四个字，球迷用了别的字。', w: 8, fx: { lgDev: -0.5 }, bad: 1 },
    { id: 'mj_lg_tech', c: 'lg', t: '{LG}全面引入门线与半自动越位技术，首轮误判归零，但「体毛越位」成了新流行语。', w: 7 },
    { id: 'mj_lg_attend', c: 'lg', t: '{LG}上座率创历史新高，官方把功劳归给草皮、裁判和天气，唯独没提球票打折。', w: 6 },
    { id: 'mj_lg_overseas', c: 'lg', t: '{LG}宣布在海外举办一轮联赛，机票酒店全面涨价，客场球迷协会发表了一封公开信。', w: 6 },
    { id: 'mj_lg_rule', c: 'lg', t: '{LG}宣布下季试行「加时赛缩短到两分钟」的表演赛新规，评论员表示「先解决裁判的体能吧」。', w: 6 },
    { id: 'mj_lg_ref', c: 'fun', t: '{LG}公布裁判体测报告：场均跑动首次超过除门将外的所有球员，官方海报配字是「他也是人」。', w: 6 },
    { id: 'mj_lg_green', c: 'lg', t: '{LG}启动「绿茵计划」：每家俱乐部必须配一块社区免费球场，偏远地区的球场自带屋顶看台。', w: 6 },
    { id: 'mj_lg_game', c: 'lg', t: '{LG}与游戏厂商达成数据授权，下季起游戏里的球员数值每两周按真实表现更新一次。', w: 7 }
];

var MINOR_RUMOR = [
    { id: 'mn_ru_bid', c: 'transfer', t: '传闻{T}报价{T2}中场核心，两家俱乐部都拒绝回应，记者已经在机场蹲了三天。', w: 10 },
    { id: 'mn_ru_swap', c: 'transfer', t: '坊间盛传{T}与{T2}酝酿球员互换，双方球迷都在网上给自己的球员写挽留信。', w: 9 },
    { id: 'mn_ru_free', c: 'transfer', t: '{T}被曝接触一名自由身老将，理由是「更衣室需要一个会讲笑话的人」。', w: 8 },
    { id: 'mn_ru_wage', c: 'transfer', t: '{T}与队内头号球星的续约谈判卡在「肖像权分成」上，据悉差距不到一顿饭钱。', w: 8 },
    { id: 'mn_ru_loan', c: 'transfer', t: '{T}小将收到三家{LG}球队的租借邀请，经纪人建议他「先学会自己洗衣服」。', w: 7 },
    { id: 'mn_ru_gk', c: 'transfer', t: '曝{T}有意{T2}的替补门将，理由是「他扑点球前会跟对方聊天气」，心理战价值无法估量。', w: 8 },
    { id: 'mn_ru_city', c: 'transfer', t: '传闻{T}将跟{T2}争抢同一名自由球员，两家球迷已经就「谁的城市更好住」吵了五百楼。', w: 8 },
    { id: 'mn_ru_bbq', c: 'transfer', t: '{T}被曝为{T2}射手准备了「无法拒绝的报价」：除了钱，还有主场看台的一块专属烧烤位。', w: 7 },
    { id: 'mn_ru_cat', c: 'transfer', t: '消息人士称{T}对{T2}中场志在必得，但该中场的最新动态是晒出在{T2}养的四只猫。', w: 7 }
];

var MINOR_WORLD = [
    { id: 'mn_wo_sacked', c: 'coach', t: '{LG}又一位主帅下课，本季下课人数来到两位数，教练员工会考虑开个心理热线。', w: 9 },
    { id: 'mn_wo_pitch', c: 'club', t: '{LG}某队主场草皮被评联赛最差，客队门将形容扑救时「像摔在了一堆行李箱上」。', w: 8 },
    { id: 'mn_wo_ref', c: 'fun', t: '{LG}裁判委员会承认上轮出现明显误判，声明称「裁判也是人」，球迷回复「球员也是人也没这么吹」。', w: 8 },
    { id: 'mn_wo_weather', c: 'fun', t: '冰雹突袭{LG}一轮比赛，球员冒雨罚角球，看台上卖的雨衣十分钟售罄。', w: 7 },
    { id: 'mn_wo_protest', c: 'club', t: '{T}球迷在第八十九分钟集体背对球场抗议票价，转播镜头很配合地切了特写。', w: 7 },
    { id: 'mn_wo_mascot', c: 'fun', t: '{T}吉祥物在比赛间隙表演后空翻失败，跌进广告牌后爬起来比了个耶，视频播放量破千万。', w: 7 },
    { id: 'mn_wo_streak', c: 'form', t: '{T}门将连续四场零封，他接受采访时把功劳全给了新买的门线手套和队里的厨师。', w: 7 },
    { id: 'mn_wo_injury', c: 'injury', t: '{T}队医公开叫苦：本季肌肉伤病比上赛季多三成，怀疑与新款紧身衣有关。', w: 6 },
    { id: 'mn_wo_fan', c: 'club', t: '{T}一位八旬老球迷连续看球六十年，俱乐部送他终身季票，他回赠了自己绣的围巾。', w: 6 },
    { id: 'mn_wo_transfer', c: 'transfer', t: '{LG}冬窗总投入创同期纪录，评论员感叹「中卫的身价已经超过我一辈子工资」。', w: 6 },
    { id: 'mn_wo_award', c: 'form', t: '{LG}公布赛季公平竞赛奖候选，排名第一的球队上周刚因围攻裁判吃过三张红牌。', w: 6 },
    { id: 'mn_wo_pitch2', c: 'fun', t: '{T}主场草皮突然冒出一片三叶草，俱乐部决定留着它，「毕竟这片场地缺了点运气」。', w: 5 },
    { id: 'mn_wo_sleep', c: 'fun', t: '{T}客场航班延误到凌晨三点，全队在候机厅睡了五小时，次日依然赢了球。', w: 6 },
    { id: 'mn_wo_kit', c: 'club', t: '{T}发布下季客场球衣，配色灵感据称是「城市的黄昏」，球迷觉得更像没洗干净。', w: 6 },
    { id: 'mn_wo_bottle', c: 'fun', t: '{T}替补席上的水壶被拍卖出四位数高价，俱乐部表示「这是传统艺能，不解释」。', w: 7 },
    { id: 'mn_wo_pigeon', c: 'fun', t: '{LG}某场比赛因场上出现三只鸽子被暂停七分钟，鸽子在禁区散步的镜头当选周最佳画面。', w: 8 },
    { id: 'mn_wo_shirt', c: 'form', t: '{T}新援首秀进球后激动脱衣庆祝，两黄变一红，赛后他为此道歉了三轮。', w: 7 },
    { id: 'mn_wo_tactic', c: 'fun', t: '{LG}官方盘点本季最离谱战术：某队角球战术需要七个人背对球门，产出是零进球和一段爆红视频。', w: 7 },
    { id: 'mn_wo_pundit', c: 'fun', t: '{T}老门将客串解说，评价自己当年的扑救失误「那球我屁股都知道该往哪边」，收视率应声上涨。', w: 7 },
    { id: 'mn_wo_bus', c: 'fun', t: '{LG}某队大巴司机是退役球员，全程给球队讲当年轶事，队员表示比战术课有意思。', w: 6 },
    { id: 'mn_wo_noon', c: 'fun', t: '{T}因暴雨推迟的比赛改在工作日中午开球，到场球迷大多请了假，老板们在看台上互相认了亲。', w: 6 },
    { id: 'mn_wo_save', c: 'form', t: '{LG}本周最佳扑救评选出现争议：第一名是门将扑出了自己队友的回传。', w: 6 },
    { id: 'mn_wo_rule', c: 'club', t: '{T}更衣室挂出新的队规标语，第一条是「输了可以，别输给天气」，寓意不明但士气不错。', w: 6 },
    { id: 'mn_wo_db', c: 'fun', t: '{LG}某队主场看台装了测分贝大屏，球迷冲到一百二十分贝，大屏当场黑屏，被视为胜利。', w: 6 },
    { id: 'mn_wo_mom', c: 'youth', t: '{T}青年队小将被提拔进一线队，他妈妈比他先到更衣室，帮全队把柜子都整理了。', w: 6 },
    { id: 'mn_wo_price', c: 'transfer', t: '{LG}冬窗标王接受采访：「我不好看很贵，我好用很贵。」语法有误，但全网点赞。', w: 6 }
];

/* ── 风味池：与足球无关的有趣国际新闻 + 生活糖 ── */
var FLAVOR_INTL = [
    { id: 'fv_in_term', t: '国际新闻：某大国总统宣布寻求第三任期，竞选口号被网友改成「让足球再次伟大」。', w: 9 },
    { id: 'fv_in_star', t: '国际新闻：某名媛被拍到与{LG}当红前锋共进晚餐，该前锋随后三场不进球，网友劝他「这顿不能约第二次」。', w: 9 },
    { id: 'fv_in_mars', t: '国际新闻：某富豪宣布筹办火星联赛，首批球员招募要求是「能忍受八个月航程和没有草皮」。', w: 8 },
    { id: 'fv_in_ai', t: '国际新闻：AI裁判试验赛把主帅红牌罚下，官方理由是「声纹分析显示语气过激」，教练协会强烈抗议。', w: 8 },
    { id: 'fv_in_parl', t: '国际新闻：某国议会为「大赛期间是否全国放假」辩论三天，最终决定不放假，但据说没人敢批请假条。', w: 7 },
    { id: 'fv_in_astro', t: '国际新闻：天文台把新发现的小行星命名为「金球奖」，理由是「它也绕着一个球转」。', w: 7 },
    { id: 'fv_in_moon', t: '国际新闻：某富豪买下一座小岛改私人训练基地，中介称岛上「只有海风和信号塔，适合专注」。', w: 7 },
    { id: 'fv_in_lottery', t: '国际新闻：某球迷彩票中奖后当场辞职看球，三个月后重新应聘原公司，面试官是他前下属。', w: 7 },
    { id: 'fv_in_propose', t: '国际新闻：某球迷在球场大屏幕求婚被拒，全场齐喊「换一个」，当事人表示「已经换了，这是第三个」。', w: 7 },
    { id: 'fv_in_nfifa', t: '国际新闻：某足协宣布退出国际足联，三天后又申请重新加入，官方解释是「忘了交会费」。', w: 7 },
    { id: 'fv_in_antarctica', t: '国际新闻：南极科考站举办雪地足球赛，零下四十度，门将赛后总结：「球是硬的，手是麻的，心是热的。」', w: 6 },
    { id: 'fv_in_stamp', t: '国际新闻：某国邮局推出球星纪念邮票，首发当天购票网站崩溃，黄牛开始倒卖「排队资格」。', w: 6 },
    { id: 'fv_in_qigong', t: '国际新闻：某「意念训练大师」宣称能远程影响点球，被某俱乐部聘为顾问后球队三连败，现已被礼貌送走。', w: 6 },
    { id: 'fv_in_cat', t: '国际新闻：一只猫闯入低级别联赛球场，叼走边裁的旗子后被聘为「荣誉球童」，现拥有个人社媒账号。', w: 6 },
    { id: 'fv_in_music', t: '国际新闻：某传奇球衣退役号被邻国歌手写进歌单，歌词是「他职业生涯的进球比我的销量少一点」。', w: 5 },
    { id: 'fv_in_ufo', t: '国际新闻：某地球迷集体目击UFO悬停球场上空，天文台回应是探空气球，当地旅行社已推出「外星球场」一日游。', w: 6 },
    { id: 'fv_in_robot', t: '国际新闻：机器人足球赛决赛因「双方都太怂」0比0收场，主办方表示下届要教它们「勇敢」。', w: 6 },
    { id: 'fv_in_bank', t: '国际新闻：某银行推出「球迷存款」业务，利率与主队战绩挂钩，监管机构连夜叫停。', w: 5 },
    { id: 'fv_in_movie', t: '国际新闻：以真实丑闻改编的足球电影上映，当事人发律师函，片方回应「我们已经更离谱了」。', w: 5 },
    { id: 'fv_in_summit', t: '国际新闻：全球气候峰会现场空调故障，代表们在三十度里达成共识：「这比点球大战煎熬。」', w: 5 },
    { id: 'fv_in_nobel', t: '国际新闻：诺贝尔委员会把和平奖颁给一位低级别联赛裁判，颁奖词：「他让两座城市没有打起来。」', w: 8 },
    { id: 'fv_in_holiday', t: '国际新闻：某国通过法案把大赛决赛日定为法定假日，反对派质问「那预选赛怎么办」，议会沉默了三秒。', w: 8 },
    { id: 'fv_in_meta', t: '国际新闻：某科技巨头推出元宇宙球场，首场虚拟比赛因服务器过热推迟，现实中的草皮松了一口气。', w: 7 },
    { id: 'fv_in_challenge', t: '国际新闻：某网红挑战「连续观看一百场球」，进行到第七场时被拍到在沙发上有节奏地呼吸。', w: 7 },
    { id: 'fv_in_camel', t: '国际新闻：一只骆驼闯入沙漠杯决赛现场，保安追了十分钟，最后是它自己决定留在中圈的。', w: 8 },
    { id: 'fv_in_latte', t: '国际新闻：世界拉花大赛冠军作品是一颗足球，评委含泪打分：「舍不得喝。」', w: 7 },
    { id: 'fv_in_stamp2', t: '国际新闻：某国邮政发行「历届点球失误」纪念邮票，该国前国脚回应：「感谢国家还记得。」', w: 7 },
    { id: 'fv_in_space', t: '国际新闻：空间站宇航员完成失重颠球，地面控制中心给出的官方计时是：一次。', w: 7 },
    { id: 'fv_in_bid', t: '国际新闻：某富豪直播竞价购买小球会，喊价到一半睡着，醒来发现成交了，他表示「不亏」。', w: 7 },
    { id: 'fv_in_happy', t: '国际新闻：全球幸福指数报告显示，刚夺冠的城市幸福值飙升两百分，刚降级的城市拒绝接受采访。', w: 7 },
    { id: 'fv_in_film', t: '国际新闻：某电影节最佳纪录片颁给一支村庄球队的保级之路，全体主创穿着队服上台领奖。', w: 6 },
    { id: 'fv_in_mv', t: '国际新闻：某歌手新歌 MV 里穿错了球衣号码，被球迷逐帧分析，连夜道歉并改词重录。', w: 6 },
    { id: 'fv_in_shout', t: '国际新闻：一项研究表明看球时大喊有利于心肺健康，全球球迷的妻子们表示「早就发现了」。', w: 8 },
    { id: 'fv_in_couple', t: '国际新闻：某国开办「球迷伴侣心理班」，第一课：「他不是不爱你，他只是在看球。」', w: 7 },
    { id: 'fv_in_plane', t: '国际新闻：某国总统专机绕道看了一场决赛，发言人回应「顺路」，地图显示绕了四百公里。', w: 7 },
    { id: 'fv_in_turf', t: '国际新闻：某拍卖行拍出一块「幸运草皮」，成交价等于一辆豪车，买家受访时只说了三个字：「我信这个。」', w: 6 },
    { id: 'fv_in_coin', t: '国际新闻：某人工智能全季预测联赛冠军全中，开发者领奖时承认「其实是抛硬币，只是硬币比较贵」。', w: 7 },
    { id: 'fv_in_taxi', t: '国际新闻：某国出租车司机大赛期间不按计价器收费，改为「进球抽奖」，政府罕见地没有反对。', w: 6 },
    { id: 'fv_in_letter', t: '国际新闻：三十年前的「给未来的信」在球场墙缝里被发现，写信的小球迷如今是对面球队的主教练。', w: 7 },
    { id: 'fv_in_ad', t: '国际新闻：某国电视台球赛插播广告遭投诉，广告商集体道歉并承包了下一场的全部转播费。', w: 6 },
    { id: 'fv_in_sad', t: '国际新闻：「最惨球迷协会」年度聚会照常举行，入会条件是支持一支三十年无冠的球队，今年新人爆满。', w: 7 },
    { id: 'fv_in_air', t: '国际新闻：某航空公司推出球迷专机，机上广播用主队解说腔播报：「飞机正在进入巡航——好球！」', w: 6 }
,
    { id: 'fv_in_memoir', t: '国际新闻：某传奇教练出个人自传，第一章标题是「点球不是运气，是心理学」，门将们表示强烈谴责。', w: 7 },
    { id: 'fv_in_famday', t: '国际新闻：某国把国家队比赛日定为法定「家庭日」，广告词是「陪爸爸看球，就像他当年陪你」。', w: 8 },
    { id: 'fv_in_clock', t: '国际新闻：一款会嘲讽你射失点球的闹钟火了，差评全部来自前锋。', w: 7 },
    { id: 'fv_in_orbit', t: '国际新闻：某球星的海报被贴进了空间站训练房，宇航员称「终于有了灵魂」。', w: 7 },
    { id: 'fv_in_rerun', t: '国际新闻：某电视台重播三十年前的经典决赛，收视率击败了当天所有新节目。', w: 7 },
    { id: 'fv_in_statue2', t: '国际新闻：某城市给球队吉祥物立了第二座雕像，官方理由是「它从不食言」。', w: 6 },
    { id: 'fv_in_retro', t: '国际新闻：全球球衣销量榜出炉，冠军不是任何豪门，而是一座降级小城的复古款。', w: 7 },
    { id: 'fv_in_traincar', t: '国际新闻：某富豪包下整节高铁看球，全程和邻座大爷聊战术，下车时认了忘年交。', w: 6 },
    { id: 'fv_in_translate', t: '国际新闻：AI翻译把「越位」译成「命运的犹豫」，语言学家表示「意外地准确」。', w: 8 },
    { id: 'fv_in_dig', t: '国际新闻：某工地挖出五十年前的足球，工人当场颠了两下，工地决定放假半天。', w: 7 },
    { id: 'fv_in_rest', t: '国际新闻：某裁判退休后开了餐厅，菜单全是红黄牌配色，生意意外火爆。', w: 6 },
    { id: 'fv_in_typhoon', t: '国际新闻：气象台罕见修改台风路径预报，备注栏写的是「别耽误今晚的决赛」。', w: 8 }
,
    { id: 'fv_in_nap', t: '国际新闻：某国举办第一届国际打盹大赛，冠军睡了三小时四十二分，颁奖时还没醒。', w: 7 },
    { id: 'fv_in_cat', t: '国际新闻：研究证实猫能听懂自己的名字，只是选择忽略——全球猫主子暂无回应。', w: 8 },
    { id: 'fv_in_cheese', t: '国际新闻：某市地铁禁带气味浓烈的食物，奶酪爱好者上街游行，全程气味浓烈。', w: 7 },
    { id: 'fv_in_grandpa', t: '国际新闻：一位大爷连续四十年给报社写错别字指正信，报社为他设了专属邮箱。', w: 7 },
    { id: 'fv_in_petday', t: '国际新闻：某公司试行「带宠物上班日」，生产力下降三成，幸福度报表直接拉满。', w: 7 },
    { id: 'fv_in_mail', t: '国际新闻：世界最深的邮筒在海底酒店启用，第一封来信只有三个字：「上面见。」', w: 7 },
    { id: 'fv_in_siesta', t: '国际新闻：某岛国把「全民午睡」写进旅游宣传，游客满意度飙升，航班却总在下午才到。', w: 7 },
    { id: 'fv_in_puzzle', t: '国际新闻：全球最大拼图完工，五万块拼了两年，最后一块在沙发底下被找到。', w: 8 },
    { id: 'fv_in_soda', t: '国际新闻：天文学家发现一颗大气成分酷似苏打水的行星，命名提案目前叫「气泡号」。', w: 7 },
    { id: 'fv_in_slow', t: '国际新闻：某国邮政推出「慢递」服务，信件一年后送达，预订已经排到了后年。', w: 7 }
];

var FLAVOR_HOME = [
    { id: 'fv_hm_eat', t: '你常点的那家苍蝇馆子上了必吃榜，老板在门口贴了张你和队友的合影，写着「球星同款牛肉面」。', w: 9, req: function (a2) { return fameOf(a2) >= 10; } },
    { id: 'fv_hm_pitch', t: '家乡那块水泥地球场翻新成了人工草皮，社区群里你二舅发言：「这片出了个职业球员。」', w: 8 },
    { id: 'fv_hm_exam', t: '表弟高考出分，全家饭桌上他问「哥，落选了还能上学吗」，你说他这问题很专业。', w: 7 },
    { id: 'fv_hm_hot', t: '电竞战队夺冠冲上热搜第一，你队友拿着手机问你：「他们踢得好吗？」', w: 7 },
    { id: 'fv_hm_market', t: '小区门口菜市场阿姨现在管你叫「那个踢球的娃」，每次多塞一把葱。', w: 7, req: function (a2) { return fameOf(a2) >= 6; } },
    { id: 'fv_hm_drama', t: '以你为原型的短剧开拍，主演比你高比你帅，你妈看完说「演得不像，你小时候更皮」。', w: 6, req: function (a2) { return fameOf(a2) >= 10; } },
    { id: 'fv_hm_train', t: '地铁广告牌换成了你的巨幅海报，你爸每天路过都要假装没看见，回家再偷偷拍一张。', w: 6, req: function (a2) { return fameOf(a2) >= 15; } },
    { id: 'fv_hm_sms', t: '小学班主任给你发消息：「学校想挂你的照片激励学生，放你戴红领巾那张行吗？」', w: 6 },
    { id: 'fv_hm_chess', t: '你大爷在公园棋摊用「足球阵型」分析象棋残局，围观群众表示虽然不懂但是很震撼。', w: 8 },
    { id: 'fv_hm_aunt', t: '亲戚聚餐，三姑问你「一年挣几百万啊」，你爸替你挡了：「问点别的，他进球了吗都。」', w: 8, req: function (a2) { return fameOf(a2) >= 3; } },
    { id: 'fv_hm_essay', t: '你小学作文《我的梦想》被老师翻出来发到班级群，当年写的是「想有一双自己的球鞋」。', w: 7 },
    { id: 'fv_hm_wall', t: '家乡高中把你的名字写上了操场文化墙，旁边配的字是「体·育·课·不·要·占」。', w: 7, req: function (a2) { return fameOf(a2) >= 4; } },
    { id: 'fv_hm_video', t: '你妈学会了发短视频，第一条内容是「我儿子小时候在这里摔的跤」，播放量比你的集锦高。', w: 7 },
    { id: 'fv_hm_village', t: '村口球场正式挂牌了，村长说等你夺冠，就把牌上的「村」字换成你的名字。', w: 6 },
    { id: 'fv_hm_cny', t: '过年回家，你被安排和刚会走路的侄子踢点球，全场观众是全家老小和一条狗。', w: 7 },
    { id: 'fv_hm_group', t: '小学同学群里最活跃的话题是分析你的跑位，他们管这叫「云执教」，队长是你同桌。', w: 6, req: function (a2) { return fameOf(a2) >= 6; } },
    { id: 'fv_hm_shop', t: '你家楼下小卖部挂出了你的海报，老板说自从挂了海报，来买运动饮料的学生多了三倍。', w: 7, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'fv_hm_dinner', t: '你爸把你的比赛日固定为家庭聚餐日，理由是「赢了庆祝，输了安慰，反正都要吃饭」。', w: 7, req: function (a2) { return fameOf(a2) >= 3; } }
,
    { id: 'fv_hm_teacher', t: '你小学的体育老师退休了，欢送会上放的不是他的照片，是你那届的获奖合影。', w: 6 },
    { id: 'fv_hm_neighbor', t: '你家隔壁装修三个月，完工那天邻居送来一面锦旗：「感谢包容，现可安心看球。」', w: 6 },
    { id: 'fv_hm_relnote', t: '亲戚群里现在置顶的是你的赛程表，你舅每天凌晨截图排名，配文「稳定发挥」。', w: 6, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'fv_hm_frame', t: '你妈把你的旧球衣裱了起来，挂在客厅正中间，位置压过了你的奖状和全家福。', w: 6, req: function (a2) { return fameOf(a2) >= 6; } },
    { id: 'fv_hm_dad', t: '你爸的微信头像换成了你的庆祝动作，网名改成「XX他爹」，签名是「低调」。', w: 7, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'fv_hm_deskmate', t: '你小学同桌当上了体育老师，第一节课放你的集锦，说「这是我同学」。', w: 6, req: function (a2) { return fameOf(a2) >= 5; } },
    { id: 'fv_hm_county', t: '老家把你写进了县志人物篇，你爸打印了十份，见人就发。', w: 6, req: function (a2) { return fameOf(a2) >= 12; } },
    { id: 'fv_hm_menu', t: '你家年夜饭多了一道新菜，你妈管它叫「进球套餐」，吃完必须听一遍队歌。', w: 7 }
];

var FLAVOR_ABROAD = [
    { id: 'fv_ab_sauce', t: '家人寄的一箱辣酱被海关扣了，你写了三页英文申诉信，最后工作人员想找你要食谱。', w: 9 },
    { id: 'fv_ab_eat', t: '你常去的唐人街小馆上了本地美食榜，老板娘现在管你叫「大明星」，上菜多给一勺辣油。', w: 8, req: function (a2) { return fameOf(a2) >= 6; } },
    { id: 'fv_ab_jet', t: '时差终于倒过来了——代价是你半夜三点自然醒，躺在床上把下轮对手的录像又看了一遍。', w: 8 },
    { id: 'fv_ab_lang', t: '你的外语突飞猛进，最新掌握的十句全是球场用语，语言老师看了课程表沉默良久。', w: 7 },
    { id: 'fv_ab_home', t: '房东老太太开始看你所在联赛的转播，还学会了你的名字发音，就是重音永远不对。', w: 7 },
    { id: 'fv_ab_winter', t: '人生第一次在雪里踢球，你裹了三层，队友只穿短袖，说「这就是北方的浪漫」。', w: 6 },
    { id: 'fv_ab_cny', t: '春节你在客场过的，队友陪你吃了顿年夜饭外卖，饺子是他包的，形状很有创造力。', w: 6 },
    { id: 'fv_ab_bus', t: '你在公交车上被小球迷认出来，他没要签名，只问你「吃辣吗」，然后塞给你一颗糖。', w: 6 },
    { id: 'fv_ab_cook', t: '你跟队里厨师学了一道家乡菜，做成之后他自己吃了大半，评价是「下次少放点乡愁」。', w: 8 },
    { id: 'fv_ab_learn', t: '队友开始跟你学中文，第一句学会了「传球」，第二句是「别传给我」。', w: 8 },
    { id: 'fv_ab_xmas', t: '圣诞集市上你买了顶毛线帽，第二天全队人手一顶，教练说这叫「团队建设」。', w: 7 },
    { id: 'fv_ab_road', t: '客场大巴要坐七个小时，你数了数，全队睡了六个半小时，剩半小时在服务区。', w: 7 },
    { id: 'fv_ab_shirt', t: '你寄回家的签名球衣被亲戚们一分为四，你妈留了最大的那块——球衣本体。', w: 7, req: function (a2) { return fameOf(a2) >= 3; } },
    { id: 'fv_ab_lost', t: '当地媒体夸你「适应力惊人」，只有你自己知道这个月你迷路了三次。', w: 7 },
    { id: 'fv_ab_turkey', t: '感恩节队友全家邀请你做客，你带去了火锅底料，他们家从此有了新传统。', w: 7 },
    { id: 'fv_ab_board', t: '你把训练换下来的旧护腿板寄给了家乡梯队，教练回了张照片：上面签满了二十多个小孩子的名字。', w: 7 }
,
    { id: 'fv_ab_kungfu', t: '队友发现你会「功夫」——其实只是你在桑拿房的拉伸，但他已经开始管你叫大师了。', w: 6 },
    { id: 'fv_ab_interview', t: '当地记者学了一句中文来采访你，发音最标准的是「无可奉告」，你当场笑场。', w: 6 },
    { id: 'fv_ab_num', t: '你的球衣号码在当地成了畅销号，体育店老板说这个号「自从你来了就不愁卖」。', w: 7, req: function (a2) { return fameOf(a2) >= 6; } },
    { id: 'fv_ab_recipe', t: '你把妈妈的拿手菜翻译给营养师，营养师沉默半晌：「这不合规，但我想吃。」', w: 7 },
    { id: 'fv_ab_tifo', t: '客场城市的球迷会做了一个你的巨型TIFO，展开的那一刻你差点没认出自己。', w: 7, req: function (a2) { return fameOf(a2) >= 8; } },
    { id: 'fv_ab_name', t: '你给队里的年轻球员起了中文名，他现在逢人就说自己有「艺名」。', w: 6 },
    { id: 'fv_ab_shout', t: '当地电视台教观众用中文喊你的名字，全国口音各不相同，你一个都认不出来。', w: 6, req: function (a2) { return fameOf(a2) >= 6; } },
    { id: 'fv_ab_gift', t: '圣诞交换礼物你抽到了队友，送了他一副春联，他郑重地贴在了更衣柜上。', w: 6 }
];

/* 国内趣闻：社会面趣味新闻（非主角向），频率略低于国际新闻 */
var FLAVOR_CNFUN = [
    { id: 'fv_cf_var', t: '国内新闻：某市广场舞大赛用VAR回放判定决赛名次，冠军队领奖时集体比出了越位手势。', w: 8 },
    { id: 'fv_cf_train', t: '国内新闻：高铁上一节车厢集体看同一场球，乘务员最后也搬了把椅子坐下来看。', w: 8 },
    { id: 'fv_cf_lift', t: '国内新闻：某小区物业在电梯贴通知「请勿在电梯内练颠球」，落款处画了一个哭脸。', w: 7 },
    { id: 'fv_cf_dorm', t: '国内新闻：大学生用宿舍晾衣杆复刻经典进球，视频火了，宿管阿姨客串解说。', w: 7 },
    { id: 'fv_cf_bbq', t: '国内新闻：某烧烤摊推出「进球免单」，老板亏了一个月，咬牙改行前又碰上三连平。', w: 7 },
    { id: 'fv_cf_taiji', t: '国内新闻：公园大爷用太极推手理论分析战术，金句「足球是圆的，太极也是圆的」登上热搜。', w: 7 },
    { id: 'fv_cf_gate', t: '国内新闻：某小学运动会请来校门口看门三十年的老球迷开球，全场欢呼像迎接传奇。', w: 6 },
    { id: 'fv_cf_courier', t: '国内新闻：外卖小哥雨夜送餐顺手扑出居民楼下滚落的足球，被拍到后婉拒采访：「赶时间。」', w: 7 },
    { id: 'fv_cf_museum', t: '国内新闻：某博物馆展出百年前的球票，票根上印着的话是「散场请慢走，明天还来」。', w: 6 },
    { id: 'fv_cf_panda', t: '国内新闻：动物园大熊猫抱住足球不肯撒手，饲养员妥协：「今天它说了算。」', w: 7 },
    { id: 'fv_cf_school', t: '国内新闻：某县城中学把校运会入场式做成豪门巡游，各班举着自制「大力神杯」绕场一周。', w: 6 }
,
    { id: 'fv_cf_mara', t: '国内新闻：某城市马拉松最后一名选手跑了七小时，沿途环卫工全程陪聊。', w: 7 },
    { id: 'fv_cf_ops', t: '国内新闻：某中学把课间操换成颠球操，家长群分裂成「护膝派」和「护眼派」。', w: 7 },
    { id: 'fv_cf_hotpot', t: '国内新闻：某火锅店推出「进球锅」，辣度按主队近期失球数定级，球迷直呼刑具。', w: 7 },
    { id: 'fv_cf_park', t: '国内新闻：小区广场新装了夜间照明，大爷们的足球局从下午一直踢到了十点半。', w: 7 },
    { id: 'fv_cf_drive', t: '国内新闻：某驾校教练用「看后视镜像看越位线」教学，学员通过率涨了两成。', w: 6 },
    { id: 'fv_cf_book', t: '国内新闻：某书店把战术书摆进成功学区，标签写着「另一种成功学」。', w: 6 },
    { id: 'fv_cf_sign', t: '国内新闻：某公园立了新牌「遛狗请牵绳，踢球请传球」，落款是被射门砸过三次的遛鸟大爷。', w: 7 },
    { id: 'fv_cf_canteen', t: '国内新闻：某高校食堂推出「冠军套餐」，打饭阿姨按比分决定给你多一勺还是少一勺。', w: 7 },
    { id: 'fv_cf_gala', t: '国内新闻：某村晚节目单里，足球操排在舞龙之后、小品之前，村民评价「文武双全」。', w: 6 }
,
    { id: 'fv_cf_metro', t: '国内新闻：某市地铁搞「看书免单月」，票务数据显示哲学类阅读量最高，多数发生在末班车。', w: 7 },
    { id: 'fv_cf_cat', t: '国内新闻：一只橘猫连续七天准时出现在自习室，被授予「荣誉学习委员」。', w: 7 },
    { id: 'fv_cf_gourd', t: '国内新闻：某小区办「阳台蔬菜大赛」，冠军是一根长势嚣张的丝瓜，颁奖词是「它有想法」。', w: 7 },
    { id: 'fv_cf_reflect', t: '国内新闻：广场舞服装统一加了反光条，赞助商是隔壁跳霹雳舞的青年团。', w: 6 },
    { id: 'fv_cf_lunch', t: '国内新闻：某小学食堂推出「盲盒午餐」，最抢手的是不知道是什么但很好吃的那个窗口。', w: 7 },
    { id: 'fv_cf_rainbow', t: '国内新闻：一场雨后，某城「彩虹打卡点」排起长队，城管顺势摆好了护栏和合影框。', w: 6 },
    { id: 'fv_cf_sleep', t: '国内新闻：某高校开设「睡觉科学」选修课，第一课座无虚席，第二课出勤率减半，原因不明。', w: 7 },
    { id: 'fv_cf_express', t: '国内新闻：快递驿站推出「自己找货八折」，三天后老板感慨「人类找回了自己的宝藏」。', w: 7 },
    { id: 'fv_cf_night', t: '国内新闻：某夜市把摊位号编成歌词接龙，点单先对暗号，暗号每天换。', w: 6 }
];

/* ── 生成入口 ───────────────────────────────────────────── */

function genMajor(a2, ctx) {
    var out = [], i, n = rnd() < 0.35 ? 2 : 1, tries = 0;
    var cats = [];
    /* 类别分布：俱乐部45% 国家25% 主角20% 联赛10% */
    while (out.length < n && tries++ < 40) {
        var r = rnd();
        if (r < 0.45) cats = ['club'];
        else if (r < 0.7) cats = ['nat'];
        else if (r < 0.9) cats = ['you'];
        else cats = ['lg'];
        var pool = cats[0] === 'club' ? MAJOR_CLUB : cats[0] === 'nat' ? MAJOR_NAT : cats[0] === 'you' ? MAJOR_YOU : MAJOR_LG;
        var item = pickWeighted(a2, pool);
        if (!item) continue;
        if (out.some(function (o) { return o.id === item.id; })) continue;
        var sub = cats[0] === 'nat' ? (item.s === 'none' ? 'natcn' : 'natw') : cats[0];
        out.push(build(a2, item, sub));
    }
    return out;
}
function pickWeighted(a2, pool) {
    var list = [], i;
    for (i = 0; i < pool.length; i++) {
        if (pool[i].req && !pool[i].req(a2)) continue;
        var w = useW(a2, pool[i].id, pool[i].w);
        if (w > 0) list.push({ item: pool[i], w: w });
    }
    if (!list.length) return null;
    return wpick(list).item;
}

function build(a2, item, sub) {
    var ctx = {}, subData = null;
    if (sub === 'none') {
        subData = null;
    } else if (sub === 'club') {
        var e = wpick(teamPool(a2));
        ctx.T = e.t.name; ctx.LG = lgName(e.t.league);
        subData = { team: e.t };
        noteTid(a2, e.t.id);
    } else if (sub === 'team2') {
        var e1 = wpick(teamPool(a2)), e2 = wpick(team2Pool(a2, e1.t.id));
        ctx.T = e1.t.name; ctx.T2 = e2.t.name; ctx.LG = lgName(e1.t.league); ctx.LG2 = lgName(e2.t.league);
        subData = { team: e1.t, team2: e2.t };
        noteTid(a2, e1.t.id);
    } else if (sub === 'lg') {
        var le = wpick(lgPool(a2));
        ctx.LG = le.l.name;
        subData = { lg: le.l };
    } else if (sub === 'natw') {
        var ne = wpick(natPool()) || { n: { i: 'n_chn', n: '中国队' } };
        ctx.N = ne.n.n;
        subData = { nat: ne.n };
    } else if (sub === 'natcn') {
        ctx.N = '中国队';
        subData = { nat: { i: 'n_chn', n: '中国队' } };
    } else if (sub === 'you') {
        ctx.YOU = a2.name || '你'; ctx.YT = teamNameOf(a2); ctx.YL = leagueNameOf(a2);
        subData = { you: 1, team: teamById(a2.teamId) };
    }
    var entry = { k: 'mj', id: item.id, c: item.c || 'club', t: fill(item.t, ctx) };
    if (subData && subData.team) entry.tid = subData.team.id;
    if (subData && subData.team2) entry.t2id = subData.team2.id;
    if (subData && subData.nat) entry.nid = subData.nat.i;
    if (item.bad) entry.bad = 1;
    if (item.fx) entry.fx = resolveFx(item.fx, subData);
    markUsed(a2, item.id);
    return entry;
}

function teamNameOf(a2) { var t = teamById(a2.teamId); return t ? t.name : ''; }
function leagueNameOf(a2) { return a2.leagueId ? lgName(a2.leagueId) : ''; }
function teamById(tid) { for (var i = 0; i < TEAMS.length; i++) if (TEAMS[i].id === tid) return TEAMS[i]; return null; }

/* 把 fx 解析成可执行载荷（sim.js 执行） */
function resolveFx(fx, sub) {
    var o = {};
    if (fx.dev && sub && sub.team) o.dev = { tid: sub.team.id, v: fx.dev };
    if (fx.nat && sub && sub.nat) o.nat = { nid: sub.nat.i, v: fx.nat };
    if (fx.nat && sub && sub.you) o.nat = { nid: 'n_chn', v: fx.nat };
    if (fx.wage) o.wage = fx.wage;
    if (fx.fame) o.fame = fx.fame;
    if (fx.gx) o.gx = fx.gx;
    if (fx.lgDev && sub && sub.lg) {
        var ts = [], i, t;
        for (i = 0; i < TEAMS.length; i++) { t = TEAMS[i]; if (t.league === sub.lg.id) ts.push(t.id); }
        var picks = [];
        while (picks.length < 2 && ts.length) picks.push(ts.splice(Math.floor(rnd() * ts.length), 1)[0]);
        o.devList = picks.map(function (tid) { return { tid: tid, v: fx.lgDev }; });
    }
    return o;
}

/* 青训期主要新闻池：梯队内部视角，fx 只到 fame/guanxi 量级 */
var MAJOR_YOUTH = [
    { id: 'mj_yh_champ', c: 'form', t: '{YT}梯队拿下青年联赛冠军，{YOU}捧杯时的照片被贴在了基地荣誉墙上——虽然眼睛还被香槟糊着。', w: 9, fx: { fame: 1 } },
    { id: 'mj_yh_fit', c: 'form', t: '季度体能测试{YOU}全营第一，体能教练把你的折返跑数据设成了别人手机的屏保。', w: 8, fx: { fame: 1 } },
    { id: 'mj_yh_praise', c: 'youth', t: '青训总监在周会上点名表扬{YOU}：「这孩子训练结束还加练半小时，你们学学。」', w: 8, fx: { gx: 2 } },
    { id: 'mj_yh_first', c: 'youth', t: '{YOU}第一次跟一线队合练，被断了一次、过了一次，赛后主力拍了拍你的头说「有点意思」。', w: 8, req: function (a2) { return (a2.ovr || 0) >= 40; }, fx: { fame: 1 } },
    { id: 'mj_yh_goal', c: 'form', t: '队内测试赛{YOU}最后十秒绝杀，被绝杀那组被罚加练折返跑，全营看热闹看了十分钟。', w: 8 },
    { id: 'mj_yh_scout', c: 'you', t: '看台上出现了生面孔，笔记本记个不停——球探来了。教练嘴上说「正常操作」，转头就把你调进了主力组。', w: 7, req: function (a2) { return (a2.ovr || 0) >= 45; }, fx: { fame: 1 } },
    { id: 'mj_yh_dinner', c: 'youth', t: '青训营年度聚餐，{YOU}包的饺子被评价为「形状自由」，但一秒钟就被抢光了。', w: 7 },
    { id: 'mj_yh_mate', c: 'youth', t: '和你同屋的队友收拾柜子离开了，宿舍安静了一晚，第二天他妈妈给你带了家乡的桃酥。', w: 6 },
    { id: 'mj_yh_kit', c: 'club', t: '训练服整套换新，赞助商把logo印在了袖口，{YOU}的新队服号码还是那个熟悉的数字。', w: 6 },
    { id: 'mj_yh_family', c: 'youth', t: '家长探营日，{YOU}爸妈在围栏外看完了整堂训练课，你爸全程没说话，回家路上夸了你四十分钟。', w: 7 }
];

function genMajorYouth(a2) {
    var item = pickWeighted(a2, MAJOR_YOUTH);
    if (!item) return [];
    return [build(a2, item, 'you')];
}

function genMinor(a2, youth) {
    var n = youth ? 2 + Math.floor(rnd() * 2) : 4 + Math.floor(rnd() * 3), out = [], tries = 0;
    var pools = [MINOR_RUMOR, MINOR_WORLD];
    while (out.length < n && tries++ < 60) {
        var pool = pools[rnd() < 0.4 ? 0 : 1];
        var item = pickWeighted(a2, pool);
        if (!item) continue;
        if (out.some(function (o) { return o.id === item.id; })) continue;
        var sub = pool === MINOR_RUMOR ? 'team2' : 'club';
        var e = build(a2, item, sub);
        e.k = 'mn';
        out.push(e);
    }
    return out;
}

/* 国内外判定：青训期 country 可能未写，回退用球队所属联赛的 cn 标记 */
function isCN(a2) {
    if (a2.country === 'CN') return true;
    if (a2.country) return false;
    var t = teamById(a2.youthTeamId || a2.teamId);
    var l = t ? lgOfId(t.league) : null;
    return !!(l && l.cn);
}

function genFlavor(a2, youth) {
    var inCN = isCN(a2);
    var n = 2 + Math.floor(rnd() * 2), out = [], tries = 0;
    var mixed = [];
    var i;
    for (i = 0; i < FLAVOR_INTL.length; i++) mixed.push({ item: FLAVOR_INTL[i], sub: 'lg', w: 3, cat: 'world' });
    for (i = 0; i < FLAVOR_CNFUN.length; i++) if (inCN) mixed.push({ item: FLAVOR_CNFUN[i], sub: 'none', w: 6, cat: 'cnfun' });
    for (i = 0; i < FLAVOR_HOME.length; i++) if (inCN) mixed.push({ item: FLAVOR_HOME[i], sub: 'you', w: 4, cat: 'home' });
    for (i = 0; i < FLAVOR_ABROAD.length; i++) if (!inCN) mixed.push({ item: FLAVOR_ABROAD[i], sub: 'you', w: 4, cat: 'abroad' });
    while (out.length < n && tries++ < 40) {
        var item = pickWeighted(a2, mixed.map(function (m) { return { id: m.item.id, w: m.w, ref: m, req: m.item.req }; }));
        if (!item) continue;
        var ref = item.ref || item;
        var subKind = ref.sub === 'lg' ? 'lg' : (ref.sub === 'none' ? 'none' : 'you');
        var e = build(a2, ref.item, subKind);
        e.k = 'fv'; e.c = ref.cat;
        delete e.fx;
        out.push(e);
    }
    return out;
}

/* ── 实况新闻：引擎结算事实(联赛冠军/降级/升级/洲际杯/大赛)的播报模板，fx 一律为 0 ── */
var FACT_T = {
    lgchamp: {
        hi: ['{LG}大结局：{T}加冕冠军，颁奖台上的彩带落了满地，这是他们应得的夜晚。',
             '{T}捧起{LG}奖杯，合影里每个人都在笑，除了揉着膝盖的老队长——他把香槟留给了更衣室。',
             '{LG}冠军属于{T}！夺冠游行那天，市中心的鸽子被吓得三个月没敢回来。',
             '{T}登顶{LG}，功勋主帅赛后辞任，留给俱乐部一句「最好的告别就是巅峰」。',
             '末轮力压{OPP}，{LG}冠军到手。',
             '颁奖日：{T}登顶，{OPP}屈居次席。'],
        mid: ['{T}问鼎{LG}，主帅赛后把功劳分给了更衣室每一个人，除了自己。',
              '{LG}冠军：{T}。没有超级巨星，只有十一个互相信任的名字。',
              '{T}又把{LG}冠军奖杯抱回了家，当地报纸头版只印了一个字：稳。',
              '与{OPP}缠斗到最后一轮，冠军是{T}的。',
              '{T}力压{OPP}登顶{LG}，积分榜上的王者。'],
        upset: ['奇迹！{T}夺得{LG}冠军——赛季前博彩公司给他们的赔率是1赔500，今晚全城彻夜未眠。',
                '童话成真：{T}加冕{LG}。市长宣布全城放假一天，理由是「这样的夜晚一辈子只有一次」。',
                '{OPP}的王朝被{T}亲手终结——{LG}改朝换代。',
                '收官日正面击退{OPP}，{T}草根加冕。',
                '{T}夺得{LG}冠军！更衣室庆祝视频里有人光着膀子敲脸盆，那是他们最贵的一件乐器。'],
        own: ['你和队友力压{OPP}，{LG}冠军到手！',
              '{LG}冠军巡游从你家门口经过，{OPP}只能看直播。',
              '对{OPP}的夺冠夜，值得记一辈子。',
              '{LG}冠军！更衣室里你被香槟浇了个透，奖杯传到你手里时差点脱手。']
    },
    releg: {
        giant: ['{T}从{LG}降级！看台上有人烧了季票，也有人哭着唱完了整首歌。',
                '地震：{T}确认降级，{LG}失去了一支豪门。主席的声明里道歉了七次。',
                '{T}降级之夜，俱乐部外的大屏幕循环播放着三十年前的夺冠录像，没人舍得关掉。'],
        norm: ['{T}黯然降入{LG2}，最后一个主场比赛日，球迷把看台拼成了「我们还会回来」。',
               '{T}的{LG}之旅画上句号，降级名单公布的那一刻，客场更衣室安静得能听见球鞋落地。',
               '{T}降级了。队长把比赛用球塞进了背包：「下一年，把它带回来看。」']
    },
    promo: ['升班马童话：{T}升入{LG2}，更衣室的香槟是队长用自己工资买的。',
            '{T}重返{LG2}！升级决定球进的那一刻，替补席冲进场内的速度比进球还快。',
            '{T}升级成功，全队通宵没睡，第二天集体出现在了城市广场和市民合影。',
            '为了这级台阶，{T}等了整整一代人的时间。今晚{LG2}的门槛被他们踩在了脚下。'],
    cont: ['{T}加冕{COMP}！颁奖时队长把奖杯让给了队里最年轻的人。',
           '{COMP}决赛落下帷幕：{T}登顶，全队把金牌挂在了没进大名单的老门将脖子上。',
           '{T}夺得{COMP}！这座城市一夜之间多出了十万件印着星星的球衣。',
           '{COMP}属于{T}。决赛后的新闻发布会，冠军主帅只说了四个字：「我们值得。」',
           '{T}赢下{COMP}！颁奖台还没搭好，球迷已经开始在广场上用手机灯摆奖杯的形状。',
           '{COMP}决赛：{T}击退{OPP}，大洲之王加冕。',
           '{OPP}倒在了最后一关，{COMP}属于{T}。'],
    contOwn: ['你们赢了！{COMP}决赛击溃{OPP}，大洲之巅有你们的名字。',
              '{COMP}决赛夜，{OPP}没能挡住你们的脚步。',
              '从小组赛到决赛，{T}把{COMP}连同{OPP}一起拿下。'],
    natHi: ['{COMP}决赛：{N}险胜{OPP}，新王加冕。',
            '{COMP}落幕：{N}捧起冠军奖杯，决赛制胜球被做成了城市广场的雕像小样。',
            '{N}登顶{COMP}，该国航空公司连夜宣布加开「冠军纪念航班」。',
            '{N}夺得{COMP}！夺冠游行的花车用掉了全国库存的一半彩带。',
            '一届属于{N}的{COMP}：从揭幕战到决赛，他们把「冠军相」三个字写满了整届赛事。'],
    natLow: ['决赛掀翻{OPP}，{N}的{COMP}童话成真。',
             '{COMP}史上最大冷门：{N}夺得冠军！赛前不被任何人看好的球队，最后把奖杯扛回了家。',
             '谁敢相信？{N}站上了{COMP}最高领奖台，赛前他们自己定的目标只是「小组出线」。',
             '{N}的{COMP}童话：一路的质疑声里，他们用一座真金白银的奖杯作了回答。'],
    natChnWc: ['中国队决赛力克{OPP}，世界杯属于我们！',
               '历史性一夜：中国队夺得世界杯！从「留给中国队的时间不多了」到「中国队是世界冠军」，一代人等到了这一天。',
               '中国队站上世界之巅！电视机前多少已过而立的老球迷哭得像当年逃课看球的高中生。'],
    natChnAsia: ['决赛力克{OPP}，中国队重返亚洲之巅！',
                 '中国队亚洲杯登顶！终场哨响的那一刻，无数个客厅里的泡面被欢呼掀翻在地。',
                 '亚洲之巅，五星红旗！中国队这座亚洲杯奖杯，让街头巷尾的烧烤摊免费续了一整夜的串。'],
    slam: {
        dom: ['国内大满贯！{T}把联赛和杯赛全包揽了，统治本国足坛。',
              '{T}的本国赛季无可挑剔：联赛冠军+杯赛冠军一个不留。',
              '包揽国内全部荣誉，{T}的王朝之年来了。'],
        super: ['三冠王！{T}包揽联赛、杯赛和{COMP}，名字写进历史书。',
                '超级大满贯：{T}让整片大陆臣服，{COMP}只是最后一块拼图。',
                '史诗赛季：{T}国内全收，再把{COMP}一起扛回家。']
    }
};

function factScore(a2, f) {
    var s = 0, t = f.tid ? teamById(f.tid) : null;
    if (f.t === 'lgchamp') {
        var lg = lgOfId(f.lg);
        if (!t || !lg) return -1;
        if (f.tid === a2.teamId) s += 100;
        if (f.lg === a2.leagueId) s += 80;
        if (t.rep >= 5) s += 60;
        if (t.rep <= 2) s += 70;
    } else if (f.t === 'releg') {
        if (!t) return -1;
        if (f.tid === a2.teamId) s += 100;
        if (t.rep >= 4) s += 70;
        if (t.rep <= 2) s += 10;
    } else if (f.t === 'promo') {
        var to = lgOfId(f.to);
        if (!t || !to) return -1;
        if (f.tid === a2.teamId) s += 95;
        if (to.rep >= 4) s += 45;
        if (t.rep <= 2) s += 15;
    } else if (f.t === 'cont') {
        if (!f.tid) return -1;
        s += 55;
        if (f.tid === a2.teamId) s += 60;
    } else if (f.t === 'slam') {
        if (!teamById(f.tid)) return -1;
        s += f.tier === 'super' ? 120 : 85;
        if (f.tid === a2.teamId) s += 100;
    } else if (f.t === 'nat') {
        s += f.tag === 'wc' ? 80 : (f.tag === 'asia' ? 65 : 50);
        if (f.nid === 'n_chn') s += 90;
    }
    return s;
}

/* 大满贯检测：联赛冠军+国内全部杯赛=国内大满贯；再加洲际杯=超级大满贯。
   命中时用一条 slam 事实替换掉该队的联赛冠军与洲际冠军事实。 */
function _slamDetect(a2, facts) {
    var cupD = (a2.cupFx && a2.cupFx.data) || {};
    var out = [], usedCont = {}, usedLg = {};
    var i, f;
    for (i = 0; i < facts.length; i++) {
        f = facts[i];
        if (f.t === 'lgchamp' && !usedLg[f.lg]) {
            var L = lgOfId(f.lg), t = teamById(f.tid);
            if (L && t) {
                var cups = [];
                if (L.cup) cups.push(L.cup);
                if (L.leagueCup) cups.push(L.leagueCup);
                var wonAll = cups.length > 0 && cups.every(function (cn) { return cupD[cn] && cupD[cn].champion === f.tid; });
                if (wonAll) {
                    var contWin = null;
                    for (var j = 0; j < facts.length; j++) {
                        var cf2 = facts[j];
                        /* 只有该国顶级洲际杯(欧冠/亚冠/解放者杯)才算超级大满贯，欧联/欧协联不算 */
                        if (cf2.t === 'cont' && cf2.tid === f.tid && !usedCont[cf2.tid] && cf2.comp === L.cont) { contWin = cf2; break; }
                    }
                    usedLg[f.lg] = 1;
                    if (contWin) { usedCont[f.tid] = 1; out.push({ t: 'slam', tid: f.tid, lg: f.lg, comp: contWin.comp, tier: 'super' }); }
                    else out.push({ t: 'slam', tid: f.tid, lg: f.lg, tier: 'dom' });
                    continue;
                }
            }
        }
        out.push(f);
    }
    return out.filter(function (x) { return !(x.t === 'cont' && usedCont[x.tid]); });
}

function factEntry(a2, f) {
    var ctx = {}, e = { id: 'ft_' + f.t + '_' + (f.tid || f.nid || f.tag || '') };
    if (f.t === 'lgchamp') {
        var t = teamById(f.tid), lg = lgOfId(f.lg);
        if (!t || !lg) return null;
        ctx.T = t.name; ctx.LG = lg.name;
        var _op1 = f.tid2 ? teamById(f.tid2) : null;
        ctx.OPP = _op1 ? _op1.name : '对手';
        if (_op1) e.t2id = _op1.id;
        var _ownL = f.tid === a2.teamId;
        var tier = _ownL ? 'own' : (t.rep >= 5 ? 'hi' : (t.rep >= 3 ? 'mid' : 'upset'));
        e.c = t.rep >= 3 ? 'champ' : 'upset';
        e.t = fill(pick(FACT_T.lgchamp[tier]), ctx);
        e.tid = t.id;
    } else if (f.t === 'releg') {
        var t2 = teamById(f.tid);
        if (!t2) return null;
        ctx.T = t2.name; ctx.LG = lgName(f.from); ctx.LG2 = lgName(f.to);
        e.c = 'releg';
        e.t = fill(pick(FACT_T.releg[t2.rep >= 4 ? 'giant' : 'norm']), ctx);
        e.tid = t2.id;
    } else if (f.t === 'promo') {
        var t3 = teamById(f.tid);
        if (!t3) return null;
        ctx.T = t3.name; ctx.LG = lgName(f.from); ctx.LG2 = lgName(f.to);
        e.c = 'upset';
        e.t = fill(pick(FACT_T.promo), ctx);
        e.tid = t3.id;
    } else if (f.t === 'cont') {
        var t4 = teamById(f.tid);
        if (!t4 || !f.comp) return null;
        ctx.T = t4.name; ctx.COMP = f.comp;
        var _op4 = f.tid2 ? teamById(f.tid2) : null;
        ctx.OPP = _op4 ? _op4.name : '对手';
        if (_op4) e.t2id = _op4.id;
        e.c = 'champ';
        e.t = fill(pick(f.tid === a2.teamId ? FACT_T.contOwn : FACT_T.cont), ctx);
        e.tid = t4.id;
    } else if (f.t === 'slam') {
        var t5 = teamById(f.tid), lg5 = lgOfId(f.lg);
        if (!t5) return null;
        ctx.T = t5.name; ctx.LG = lg5 ? lg5.name : ''; ctx.COMP = f.comp || '洲际杯';
        e.c = 'slam';
        e.t = fill(pick(f.tier === 'super' ? FACT_T.slam.super : FACT_T.slam.dom), ctx);
        e.tid = t5.id;
    } else if (f.t === 'nat') {
        var nn = null, ns = natList();
        for (var i = 0; i < ns.length; i++) {
            if (ns[i].i === f.nid) { nn = ns[i]; break; }
            /* 兼容历史数据：个别路径 champion 存的是队名而非 id */
            if (ns[i].n === f.nid) { nn = ns[i]; break; }
        }
        if (!nn) return null;
        ctx.N = nn.n;
        ctx.COMP = ({ 'wc': '世界杯', 'asia': '亚洲杯', 'euro': '欧洲杯', 'copa': '美洲杯' })[f.tag] || '大赛';
        var _opN = null;
        if (f.nid2) for (var ni2 = 0; ni2 < ns.length; ni2++) if (ns[ni2].i === f.nid2) { _opN = ns[ni2]; break; }
        ctx.OPP = _opN ? _opN.n : '对手';
        if (f.nid === 'n_chn' || nn.i === 'n_chn') { e.c = 'natc'; e.t = fill(pick(f.tag === 'wc' ? FACT_T.natChnWc : FACT_T.natChnAsia), ctx); }
        else {
            /* 冷门判定按赛事分档：亚洲杯头部队(日韩伊)夺冠是常态，世界杯欧洲杯门槛高 */
            var _strongS = { 'wc': 85, 'euro': 85, 'copa': 82, 'asia': 75 }[f.tag] || 85;
            e.c = nn.s >= _strongS ? 'champ' : 'upset';
            e.t = fill(pick(nn.s >= _strongS ? FACT_T.natHi : FACT_T.natLow), ctx);
        }
        e.nid = nn.i;
    } else return null;
    return e;
}

function genFacts(a2, facts, youth) {
    if (!facts || !facts.length) return [];
    facts = _slamDetect(a2, facts);
    if (!facts.length) return [];
    var scored = facts.map(function (f) { return { f: f, s: factScore(a2, f) }; })
        .filter(function (x) { return x.s > 0; });
    scored.sort(function (a, b) { return b.s - a.s; });
    var cap = youth ? 1 : 3, out = [], seen = {};
    for (var i = 0; i < scored.length && out.length < cap; i++) {
        var f = scored[i].f;
        var key = f.t + '|' + (f.tid || f.nid || '');
        if (seen[key]) continue;
        seen[key] = 1;
        var e = factEntry(a2, f);
        if (!e) continue;
        e.k = out.length < 2 ? 'mj' : 'mn';
        out.push(e);
    }
    return out;
}

window.NEWSGEN = function (a2, youth) {
    a2._newsTids = a2._newsTids || [];
    var items = youth ? genMajorYouth(a2) : genMajor(a2);
    items = items.concat(genMinor(a2, youth), genFlavor(a2, youth));
    var age = a2.age != null ? a2.age : 0;
    for (var i = 0; i < items.length; i++) items[i].age = age;
    return items;
};
/* 赛场实况：由 sim.js 在结算/决赛落定时调用，独立于常规批次 */
window.NEWSFACTS = function (a2, facts) {
    a2._newsTids = a2._newsTids || [];
    var es = genFacts(a2, _slamDetect(a2, facts || []), false);
    /* 条目归属"赛季年龄"：结算链内 age 会+1，用最后一条赛季记录的年龄，保证 settle 与 drain 落在同一季 */
    var age = (a2.seasons && a2.seasons.length) ? a2.seasons[a2.seasons.length - 1].age : (a2.age != null ? a2.age : 0);
    for (var i = 0; i < es.length; i++) es[i].age = age;
    return es;
};
})();
