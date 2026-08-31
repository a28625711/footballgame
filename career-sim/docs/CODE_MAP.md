# career-sim 代码结构地图（修改速查）

> 用途：记录游戏各系统在解码文件中的关键位置，方便后续修改
> 更新：2026-08-15

## 文件结构

> 更新：2026-08-31（目录整理：手写源进 `src/`，事件编译产物进 `build/`）

- `src/game.js` — 主逻辑 / DOM 渲染
- `src/sim.js` — 游戏引擎 / 纯逻辑
- `build/events.js` — 事件数据（由 `src/events/` 编译生成）
- `src/data.js` — 球队/联赛/位置/出身数据
- `src/crests.js` — 队徽映射
- `src/qr.js` — 二维码
- `src/supporters.js` — 支持者名单
- `src/natdata.js` — 国家队数据
- `src/events/` — 事件模块源（*.ev.js），编辑后用 `py tools/build_events.py` 编译到 `build/events.js`

## 重要函数索引（sim.deob.js）

| 函数 | 作用 | 备注 |
|------|------|------|
| `newState` | 创建生涯 | 含传奇检测 cK、ovr/talent 加成 |
| `aA()` | 构建事件上下文对象 | 最后复制 a2.flags 到上下文 |
| `aE()` | 随机事件选择 | 按 stage/tone/cn 过滤 |
| `bj()` | 青训成长 | 青训阶段每步调用 |
| `bk()` | 主循环 | youth 阶段调 bj() |
| `bm()` | 青训毕业选队 | offers 6 个 + canStayYouth |
| `b2()` | 赛季记录 | bz.trophies 本赛季奖杯 |
| `b5()` | 加个人奖项 | |
| `b4()` | 联赛冠军记录 | |
| `aZ()`/`b0()` | 国家队奖杯 | |
| `bq()` | 生涯结算 | |
| `legacyFrom` | 下一代继承计算 | |
| `az()` | normLegacy | |
| `aw()` | 胡雪儿 cheat 检测 | 名字+山东+号码2 |
| `aL()` | 联赛强度因子 | (ovr-72)/24 |

## 夺冠/获奖概率（sim.deob.js）

### 联赛/杯赛（梯队模型）
位置：`["league","cup","cont","world"]["forEach"]` 回调内
```
base = 0.5/梯队数（联赛）或 0.35/梯队数（杯赛）
× (1+max(0,ovr-80)×0.06)  // 球员加成
次级联赛杯赛 ×0.2（cont=null）
```

### 洲际（cont）
```
×2.5（亚冠）/ ×1.4（欧联）/ ×0.7（欧冠）
```

### 个人奖项（无杯不评 + 倍率）
位置：`if(bx&&by&&!a2["cheat"])` 块
```
无奖杯不参评；概率 ×(1+0.3×本赛季奖杯数)
```

### 联赛个人奖项（各联赛分开，2026-08-19 新增）
- **联赛金靴**（`by["name"]+"金靴"`，如「英超金靴」）：att 且进球数 ≥ 门槛（按联赛 rep：`[15,18,20,24,27,30][rep]`，中超20/英超30）。**概率随进球递增**：`0.35 + min(0.4, (进球-门槛)×0.03)`，压线 0.35、每球+3%、封顶 0.75。取代原「中超金靴」限定。
- **联赛最佳球员**（`by["name"]+"最佳球员"`，如「中超最佳球员」）：ovr≥74 且本赛季夺联赛冠军概率 0.35、国内杯赛冠军 0.08（叠加），再 ×(1+0.2×本季奖杯数)。**2026-08-20 起**要求当季角色 `bz.role` rank≥3（主力及以上）+ `bz.apps≥30`。
- **欧洲金靴联动**：欧洲金靴（boot）门槛 35 球，同样按进球梯度概率（同公式），命中时若本季未拿联赛金靴则补发（`b5(by.name+"金靴")`）；补发函数须返回 true，否则会短路 `&&b5(boot)` 导致欧洲金靴永不发放（已修）。
- cheat 分支同步提供上述两奖（同梯度公式）。
- `bq()` 统计 `poyCount`（awards 含"最佳球员"）/`topCount`（含"金靴"），供新成就 `poymaster`/`topmaster` 判定（各 3 次，无加成）。
- 旧 `AWARDS.cslmvp/cslboot` 条目保留但不再被引用。

## 传奇隐藏加成（sim.deob.js newState 内，2026-08-18 增强+现役）

### 历史球员（同时加 ovr+天赋）
| 传奇 | 位置 | 号码 | ovr | 天赋 | 伤病 |
|------|:---:|:---:|:---:|:---:|:---:|
| pele | ST | 10 | +4 | +0.05 | 低 |
| maradona | CAM | 10 | +2 | +0.14 | 高 |
| messi | RW | 10 | +5 | +0.05 | 低 |
| cristiano | LW | 7 | +5 | +0.05 | 低 |
| cruyff | CAM | 14 | +2 | +0.14 | 高 |
| beckenbauer | CB | 5 | +4 | +0.05 | 低 |
| zidane | CAM | 21 | +3 | +0.08 | 中 |
| ronaldo | ST | 9 | +5 | +0.10 | 很高 |
| yashin | GK | 1 | +4 | +0.05 | 低 |
| maldini | LB | 3 | +4 | +0.05 | 低 |
| cafu | RB | 2 | +3 | +0.06 | 中 |

### 现役球员（加成少）
| 球员 | 位置 | 号码 | ovr | 天赋 | 伤病 |
|------|:---:|:---:|:---:|:---:|:---:|
| mbappe 姆巴佩 | ST | 7 | +2 | +0.02 | 高 |
| modric 莫德里奇 | CM | 10 | +2 | +0.03 | 中 |
| kane 凯恩 | ST | 11 | +2 | +0.02 | 中 |
| salah 萨拉赫 | RW | 11 | +1 | +0.01 | 中 |
| bellingham 贝林厄姆 | CAM | 22 | +1 | +0.03 | 高 |
| rodri 罗德里 | CDM | 16 | +1 | +0.02 | 中 |
| vandijk 范戴克 | CB | 4 | +1 | - | 低 |
| debruyne 德布劳内 | CM | 17 | +1 | +0.01 | 中 |

冲突处理：else-if 链按顺序，历史球员在前，号码+位置都相同才冲突（如同号不同位可共存，如 kane ST11 / salah RW11）。

## 青训机制（sim.deob.js）

- 出国青训标记：`a2["flags"]["youthAbroad"]`（events 的 when 里用 `p.youthAbroad` 可判断）
- 事件上下文（aA）：`p.inAcademy`、`p.inChina`、`p.youthAbroad`（flags 自动复制）
- 青训事件过滤（aE）：`aB(age)` 阶段判定 `age≤15→kid / 16-20→youth / 33+→vet / 其他→prime`；青训营内按 `inAcademy` 匹配 `stage`，出国后（inChina=false）排除 `cn` 事件，`when` 里 `p.youthAbroad` 控制海外专属
- **海外青训事件阶段修正（2026-08-19）**：`abr_*`（语言关/技术流/体能营/外教/想家/新战术/饮食/敌意等 8 个）原标 `stage:"youth"`，但青训出国发生在 12-15 岁（`aB` 返回 kid）→ aE 的 kid 分支只选 `stage:"kid"` → 永不触发。已改为 `stage:"kid"`（`when` 仍要求 `inAcademy&&youthAbroad`）
- 青训成长（bj）：`ovr += 区间×(1+talent)/2×联赛系数×衰减`

## 事件结构（events.deob.js）

```js
{
  id: "...", title: "...", icon: "...",
  weight: 0x30,        // 权重
  repeat: 2,           // 可重复次数
  stage: "youth",      // kid/youth/prime/vet
  when: function(p){ return p.inAcademy; },  // 触发条件
  desc: "...",
  options: [{
    label: "...",
    p: function(p){ return f(0.4, [[p.talent,1,0.25]], 0.2, 0.7); },  // 成功概率
    hint: function(p,q){ return g(q, "成功文案", "失败文案"); },
    apply: function(p,q,s){ return d(q,s) ? {ovr:2, text:"..."} : {ovr:-1, text:"..."}; }  // 属性变化
  }]
}
```

**属性变化字段**（apply 返回）：
- `ovr`：能力值（青训主要加这个）
- `talent`：天赋
- `guanxi`/`clean`/`fame`/`money`：其他线

**辅助函数**：
- `f(概率基数, [[属性,1,权重]], 下限, 上限)` — 计算成功概率
- `g(结果, 成功文案, 失败文案)` — 文案
- `d(成功, 奖励对象)` — 应用成功

## 待办 / 调查中

- [x] events.deob.js 事件数组位置
- [x] 新增国外青训事件（stage:youth + when 含 p.youthAbroad）

## 比赛事件（bigmatch）系统
- `aX()` 生成半场文案（含进球方式/激烈度随机）
- `aY` 战术选择：hold/push/run 3 种
- `choose` bigmatch 分支处理下半场+点球+胜负
- `aU()` 生成对手

### 生涯事件记录（eventLog，2026-08-19 新增）
- `a2["eventLog"]`：`{age, title, text}` 数组，newState 初始化 `[]`
- 记录点 1（随机事件）：`choose` 的 `"random"===bA["type"]` 分支，在 `bw(bB["res"])` 前，用 `a1.filter(id===eventId)[0].title` 反查事件标题 + `bB.res.text` 结果文本
- 记录点 0（加入青训营）：`choose` 的 `youth_path` 分支选队后记录 `{age:开局年龄12, title:"加入青训营", text:"进入{青训营名}"}`（用球队 `academy` 字段，兜底球队名）
- **记录点 1 修正（2026-08-19）**：真实游玩时 UI 层 `bQ()` 对 random 事件走 `resolveEvent`（=bs），**不经过 `choose`** → 事件从没记录。已把 push 逻辑移入 `bs()`（resolveEvent 与 choose 共用，避免 UI 路径漏记），choose 分支删除重复 push。现在 UI 触发/脚本 choose 都记录且不重复
- 记录点 2（关键战）：`choose` bigmatch 分支结算处（`a2["pending"]["result"]=` 后），title 用 `bI["comp"]`（如"世界杯"/"欧冠"），text 用 `(bM?'冠军':'失利')+'：'+bY`（bY 含比分）
- 渲染：`game.deob.js b9()` 个人面板消费 `au.eventLog`（按年龄分组，和赛季 note/ovrEnd 并排）
- 个人面板 `persSeasons`：由 `au.seasons`（职业赛季）**合并 `au.youthLog`**（青训，含 `cut` 标记），青训年被淘汰显示"青训淘汰"，能力列显示青训 ovr
- 国家队面板 natBody：第 2 列固定显示"中国队"文字 + 成绩徽章（世界杯冠军/亚洲杯冠军等），有出场无徽章的赛季也显示"中国队"
- 旧档回溯：存档加载时若 `au.eventLog` 为空，用 `seasons` 的 `trophies`（含"冠军"的奖杯→`{title:奖杯名,text:'夺冠'}`）和 `note`（伤病→`{title:'伤病',text:note}`）按年龄补事件（去重，重复加载不重复）

### 半场比分（aW，2026-08-15 增强）
```js
k = clamp((ovr-70)/30, -0.5, 1)
我方进球: 0球 38%-25%k / 1球 35% / 2球 20%+15%k / 3球 7%+10%k
对方进球: 0球 50%+20%k / 1球 35% / 2球 15%-20%k
```

### 半场文案（aX，2026-08-15 增强）
- 增加 bC(进球方式 0-4)、bD(激烈度 0-2) 随机
- 领先/落后/平局文案更丰富
- 3 球大胜、落后 2 球等特殊情况有专属文案

## 平衡性调整（2026-08-15）

### 比赛胜率公式（`choose` bigmatch 分支）
```js
// 旧: bK = clamp((ovr-70)/30, -0.5, 1)   ← ovr<70 时负数，拉低胜率
//     bL = clamp(p-0.095+dp+bK×(risk?0.14:0.07), 0.04, 0.93)  ← 没考虑比分
// 新: bK = max(0, (ovr-70))/35            ← ovr<70 为 0，不拉低；高ovr影响更温和
//     bL = clamp(p-0.095+dp+bK×(risk?0.09:0.045) + (bN-bO)×0.15, 0.04, 0.93)
//                                                               ↑ 比分差修正（每净胜1球+15%）
```
- 比分差修正：0:3 → 8.5%、0:1 → 38.5%、0:0 → 53.5%、3:0 → 93%
- ovr 50-70 胜率固定（不拉低），ovr 95 push 约 60%（高 ovr 温和）

### 联赛/杯赛夺冠（`ca`）
```js
ca = (0.5 + 0.04×(梯队数-1)) / 梯队数 × (1 + max(0, ovr-80)×0.06)   // ovr<80 不降低，只提高
```
- 梯队数 = 联赛内最高 rep 球队数（英超 mci/liv/ars 三强=3，西甲 rma/bar=2，意甲国米/德甲拜仁=1）
- **2026-08-19 调整**：多豪门联赛提高总份额（每多一支顶级队 +0.04），英超 ovr90 夺冠率 26.7%→30.9%（单豪门联赛不变）
- **2026-08-20 调整**（详见 `docs/2026-08-20-balance.md`）：
  - 联赛冠军概率乘 `(球队rep/联赛最高rep)²`：最高梯队不变（英超曼城 0.309、西甲 0.43），意甲非豪门（亚特兰大 rep3）ovr90 单季 0.8→0.29
  - 队长事件限定绝对核心（rank≥4）；金球资格 `(联赛rep≥4 或 本季欧冠冠军)`（cheat/非cheat 统一）→ 中超不可评金球、法甲/荷甲拿欧冠可评
  - 青训成长衰减上限 65→70（`ac((0x46-ovr)/0x1c,...)`，实测毕业峰值约 67-74）；成就加成默认勾选；`cAch()` 效果翻译补 `decay` 分支（老而弥坚可显示）
  - **评奖资格**（所有个人奖项，cheat/非cheat 统一）：用当季角色快照 `bz.role`（不随后季 `aH()` 更新）+ 出场过半 `bz.apps≥19`
- **2026-08-20 知名球员对决（events.deob.js star_ 系列）**：难度统一 ovr95 绝对核心 ≈65%（哈兰德斜率 0.012→0.018）；后场 3（`star_marker` 梅西/`star_def_side` 维尼修斯/`star_pen_save` C罗点球[门将]）、中场 3（`star_midfield` 莫德里奇/`star_mid_rodri` 罗德里/`star_mid_kevin` 德布劳内）、前场 3（`star_striker` 哈兰德/`star_att_kylian` 姆巴佩/`star_att_kane` 凯恩）；均 `weight 0x96`、`!inChina && leagueRep>=4` + 位置限定
- **2026-08-20 随机池事件机制（sim.deob aE）**：事件带 `pool` 时浅拷贝事件对象、随机抽 `rndPick` 个 + `single` 固定项生成 options（渲染/选先后一致、原事件无污染）；`love_first`（有人在等你）用此机制——7 个候选人随机出 3 + 保持单身；候选带隐藏加成：`talent`（青梅+0.02/球迷+0.01）、新增 `health` 字段→`a2.healthBonus`（伤病概率 `bT` 乘，康复师 0.85/粉丝 0.95/妹妹 0.9）、`ovr`（记者/搭子+1）
- **2026-08-20 老将合约年限（sim.deob be(bx)）**：33+ 不再一律 1 年——统一按球队预期角色 `aI(by)` rank + 球队 rep（36+ 与 33-35 同规则，不再按绝对 ovr 分段）：绝对核心 rank4 → 豪门 1-2y/普通队 2-3y；主力 rank3 → 豪门 1y/普通队 1-2y（ovr≥75 +1y）；其余 ovr≥75 → 1-2y 否则 1y；`bO()` 传目标球队 `be(bG)`
- **2026-08-20 国家队首秀/首球变体**：sim.deob line 335（`_natCalled` 首次征召）/line 340（`natStats.goals` 首球）改 `b1([...][Math.floor(ad()*3)])` 随机 3 选 1——`nat_firstcall/2/3`、`nat_firstgoal/2/3`（events.deob.js，变量 kwA-kwL）。**注意：`b1()` 会跳过 `usedEvents` 已标记事件，须先 `b1` 再标记全部 3 个变体 `usedEvents`，否则 aE() 仍会随机抽到未标记变体导致反复触发**
- **2026-08-20 国家队大赛名次加成（sim.deob natForm）**：世界杯/亚洲杯结算按名次写 `a2.natForm={wc,asia}`（世界杯八强1/四强2/亚军3/冠军4；亚洲杯四强1/亚军2/冠军3）；`natB=max(档位加成0.05-0.20)` 持续到下次同类型大赛，乘到征召 `c0`、国家队表现 `cc`、大赛成绩 `aP` 的 c2。bigmatch 决赛冠军/亚军在结算处同步记录（line 811 旁）
- **2026-08-20 金球奖重构 + 判定时机修复（sim.deob bAw）**：个人奖项判定抽成 `bAw(bz)`（读本季 season 记录，`bz.age` 匹配 trophies）。**关键**：欧冠/世界杯/亚洲杯冠军若经 bigmatch 事件获得（`bigQ` 结算 line 811 才入 trophies），晚于原 `b2` 判定——故 `b2` 内见 `bigQ` 未结算只设 `_awardDue`，**bigmatch 结算后（line 815）`bAw(seasons[recIdx])` 延迟判定**。金球概率＝主荣誉档（世界杯 0.62>欧冠 0.26>五大联赛冠军[英西0.09/其他0.06]>世俱杯0.06>杯赛0.04）+每多一冠0.08(cap0.25)+金靴(0.06/0.10)+ovr(≥90 +0.12/≥85 +0.06)，×角色系数（核心1.3/主力0.5/轮换0.25/替补0.1），cap 0.85；门槛 `联赛rep≥4或本季欧冠或本季世界杯`
- **2026-08-20 pool 事件 forceQ 崩溃修复**：`love_first` 由 forceQ 强制触发（line 528 `b1("love_first")`），**不走 `aE()` 池化分支**。两处需 pool fallback：① `bs()`（line 692，选择时 `options` 缺失则即时池化并写回 `a1`）；② **forceQ 分支（line 542）**——选中事件带 `pool` 时同 `aE()` 池化写回，否则事件面板渲染（game.deob line 621 `c0["options"]["map"]`）会崩（"卡死无选项"）。transfer 选择 `String(bx).indexOf("loan")` 防数字入参

## 事件数组位置（events.deob.js）

### ⚠️ 模块化架构（2026-08-22 起）
- **编辑入口**：`career-sim/src/events/*.ev.js`（16 个主题模块：vet/club/star/league/cn/kid/youth/abr/nat/gk/love/att/mid/def/aca/misc + helpers.js 公共函数 d/f/g/h、EV_ROLL、k、m）+ `MANIFEST.json`（拼接顺序）。
- 每个事件带 `// ---- idx:N | id | 标题 ----` 头注释，idx 为**原始全局顺序**，build 时按它排序还原数组序（权重抽取依赖遍历顺序，不可乱）。
- **改完必须重建**：`py tools/build_events.py` → 生成 `build/events.js`（生成物，勿手改）；`py tools/split_events.py` 可从 `build/events.js` 反向重切（会覆盖手改，慎用）。
- 全部源文件已剥离混淆字符串表/自旋转解码器（stub 化），总字符 596k→412k；无损验证：种子化 Math.random 下 16 个确定性生涯与 HEAD 逐字节一致。

- 事件数组：`var j=[` 起始于 182707
- 数组结束：351582（`]`）
- 赋值：`window["EVENTS"]=j;` 在 351897
- 插入新事件：在 351582 的 `]` 前
- 现有 29 个事件：kid(3), youth(12), prime(10), vet(4)

## 国外青训标记

- `a2["flags"]["youthAbroad"]` 设置于青训入队（选择国外青训队时）
- 事件 `when(p)` 里用 `p.youthAbroad` 判断（aA 会把 flags 复制到上下文）
- 现有 youth 事件均无 youthAbroad 判断，国内外通用
- 计划新增专属国外青训事件（属性为主）

## 新增国外青训事件（2026-08-15）

插入位置：事件数组 `var j=[`（182707）末尾，`]` 前
新增 8 个 `stage:"youth"` + `when` 含 `p.youthAbroad` 的事件：

| id | 标题 | 属性效果 |
|----|------|---------|
| abr_lang | 语言关 | ovr+2 / -1 |
| abr_tech | 技术流训练 | ovr+3 talent+0.01 / -1 |
| abr_physical | 异国体能营 | ovr+3 / -2 |
| abr_mentor | 外教的单独指点 | ovr+4 talent+0.015（需 talent>1）|
| abr_homesick | 想家 | ovr+2 / -2 |
| abr_style | 新战术体系 | ovr+3 / -1 |
| abr_food | 饮食差异 | ovr+2 / 0 |
| abr_rival | 本地球员的敌意 | ovr+3 fame+1 / -2 |

注意：游戏已有 10 个成年阶段（prime/vet）的 `abr_*` 出国事件（boxing_day/翻译/冬歇期等），本次新增的是**青训阶段**专属，id 用 abr_ 前缀但 stage 不同，不冲突。

### 增强（2026-08-15 二次更新）

国外青训事件共 **10 个**，加成以 ovr 为主 + 部分事件含 fame/guanxi：
- abr_lang：成功 ovr+2 **guanxi+2**（语言通了关系好）
- abr_mentor：成功 ovr+4 talent+0.015 **fame+1**
- abr_style：成功 ovr+3 **guanxi+1**（融入体系）
- abr_homesick：ovr+fame（已有）
- abr_rival：ovr+fame（已有）
- **abr_reputation 表现被注意到**（新增）：成功 ovr+2 **fame+6**（需 ovr>55）
- **abr_teammate 交到第一个朋友**（新增）：成功 **guanxi+4** ovr+1

### 事件概率受属性影响（已确认修复）

事件概率函数 `p()` 用 `f(基础, [[属性,基准,系数]], 下限, 上限)` 计算，属性差异会改变成功概率。

**基准值必须接近属性典型值**（游戏惯例）：
- ovr 基准 60、guanxi 基准 45、fame 基准 25、clean 基准 70、talent 基准 1

修复记录：新增事件初期基准值误用 1（如 `[guanxi,1,0.08]`），导致属性差异被 clamp 抹平，已改为惯例基准值。现在全部 10 个国外青训事件的成功概率都随属性变化（已验证）。

## 年表（timeline）三选项卡改造（2026-08-18）

位置：`game.deob.js` 的 `b9()` 函数（从 `function b9(` 到 `function ba(`）。

### 结构
- 顶部 `.tl-tabs`：4 个按钮 `data-tab="club|nat|award|pers"`（俱乐部/国家队/奖项/个人）
- 4 个 `.tl-panel`（`data-panel` 对应），默认仅 club 可见，其余加 `hidden` class
- `agg` 聚合：按 teamId 分组赛季（`a8[mode].seasons` 个赛季合并为一行），收集 trophies/notes/nats/moves + caps/natGoals 等
- 青训阶段：`au.youthLog` 渲染在**俱乐部面板**开头（年龄/青训队/ovr/被刷下来标记）
- 面板切换：`app` click handler（事件委托）`closest("[data-tab]")` → 高亮按钮 + toggle 面板 `hidden`
- CSS：`style.css` 末尾 `.tl-tabs/.tl-tab/.tl-panel.hidden/.tl-cols/.tl-club/.mini-badge.nat` 等

### 问题点（本次发现并修复）
1. **俱乐部面板混入国家队奖杯**：sim.js `b0()` 把国家队冠军写进赛季 `trophies`（`bx["trophies"].push(by+'冠军')`，by 为"世界杯"/"亚洲杯"）。导致俱乐部选项卡也显示"世界杯冠军/亚洲杯冠军"。
   - 修复：俱乐部面板 `c2["trophies"]["filter"]` 排除 `"世界杯冠军"` 和 `"亚洲杯冠军"`（精确匹配，避免误伤"世俱杯冠军"）
   - 注意过滤必须精确匹配（"世俱杯冠军"含"世界杯"子串，不能用 indexOf）
2. **国家队面板缺冠军徽章**：国家队冠军成绩走赛季 trophies，不走 `c8["nat"]`（nat 只记非冠军成绩如"打进世界杯"），导致国家队面板没有冠军记录。
   - 修复：`agg` 聚合时把赛季 trophies 里的 `"世界杯冠军"/"亚洲杯冠军"` 也 `push` 进 `c4["nats"]`
3. **国家队面板空**：原渲染条件 `if(c2["caps"]||(c2["nats"]||[])["length"])` 在无国家队数据的档会把**所有行跳过** → 面板只有表头完全空白（用户反馈"完全为空"）。
   - 修复：去掉 if 条件，**无条件渲染所有 agg 行**，无数据的行显示"未入选"
   - 注：caps/natGoals/nat 只在被征召的年份有值，聚合 `c8.caps||0x0` 累加；此修改同时暴露一个语法坑——删 if 开括号时必须同步删闭合 `}`，否则 forEach 提前闭合（V8 报 Unknown JavaScript error）
4. **奖项面板缺个人奖项**：原奖项面板只显示团队奖杯（赛季 trophies 聚合），不含金球奖/金靴等个人荣誉（`au.awards`）。
   - 修复：奖项面板合并收集 `agg` 的 trophies（cls:"trophy"）+ `au.awards`（cls:"award"）；个人奖项用 `.mini-badge.star`（`hsl(var(--gold))` 金色）区分

### 当前四面板语义
- 俱乐部：俱乐部奖杯 + 转会 + 青训阶段（国家队奖杯已过滤）
- 国家队：caps/进球/助攻 + 国家队成绩徽章（含冠军）；无数据的行也渲染（显示"未入选"）
- 奖项：**按年四列**（年龄 | 俱乐部奖项 | 国家队奖项 | 个人奖项），遍历 `au.seasons` 每年一行；俱乐部/国家队奖杯从赛季 trophies 分类（世界杯/亚洲杯冠军归国家队），个人奖项从 `au.awards` 按 age 匹配；`.tl-cols.award` 4 列 grid，个人奖项 `.mini-badge.star` 金色
- 个人（新增第 4 个 tab）：**按年四列**（年龄 | 事件 | 伤病 | 能力），事件来自 `au.eventLog`（随机事件+关键战），伤病来自赛季 `note`，能力列显示 `ovrEnd`；事件徽章 `.mini-badge.evt` 紫色（`hsl(265 32% 64%)`），title 悬浮显示事件结果文本

### 结构约定（重要）
- **四个面板完全自包含**：每个 Body 以 `<div class="tl-panel"...>` 开头、`</div></div>` 结尾（闭 tl-scroll + tl-panel）
- 组装：`return '<div class="timeline">'+bY+clubBody+natBody+awardBody+persBody+'</div>';`（只包 timeline，不再闭 panel）
- 国家队表头含助攻列：`<span class="r hide-xs">'+('gk'===bX?b4['ga']:b4["ast"])+'</span>`
- 奖项/个人行自定义 HTML（不用 b8，b8 固定 6 列）：`<div class="tl-row done tl-cols award">` + age-chip + 3×tl-badges

### 验证方式
- `py tools/xxx` 完整 DOM mock 加载 7 文件 + `__SIMTEST` 模拟到 summary + 捕获 `summary-area` innerHTML，检查三面板内容（cheat 档必出世界杯/亚洲杯冠军）

## 成就加成（2026-08-19 新增）

### 概念
- 结局图鉴（`a0.ENDINGS`，data.deob.js）即"成就"。部分高难度结局带 `bonus` 字段。
- 跨局已达成结局 = `localStorage.archive`（aG()）各局 `bp()` 的 endings 并集。
- 开局向导「位置」步骤底部勾选「启用成就加成」，勾选后 newState 传入合并 bonus（第 5 参数）。**2026-08-20 起默认勾选**；`cAch()` 效果翻译含 `decay`（老而弥坚：30岁后能力回落减半）。
- 同类加成**取最大值**（不叠加），不同类并存。

### 加成表（ENDINGS.bonus）
| id | 成就 | bonus |
|---|---|---|
| ironman | 铁人 | `injury:0.85`（受伤概率×0.85） |
| capped | 国脚 | `natCall:1.2`（国家队入选×1.2） |
| ballon | 金球先生 | `talent:0.03` |
| legend | 中国梅西 | `talent:0.04` |
| cr7 | 中国C罗 | `talent:0.03, ovr:1` |
| bigears | 大耳朵杯 | `growth:1.06` |
| boots | 金靴 | `ovr:2` |
| sniper | 进球机器 | `ovr:1, growth:1.03` |
| money | 亿元先生 | `money:50`（开局家底+50万） |
| rich | 财富自由 | `money:80` |
| grind | 中甲传奇 | `talent:0.03` |
| goat | 上帝之子 | `talent:0.06` |
| wcchamp | 大力神杯 | `ovr:2` |
| double20 | 双二十先生 | `growth:1.06` |
| veteran | 老而弥坚 | `decay:0.5`（30岁后能力回落减半） |
| hundredcaps | 百场国脚 | `ovr:1` |

无加成成就（仅收集）：`poymaster` 联赛先生（3 次联赛最佳）、`topmaster` 金靴收藏家（3 次联赛金靴）——依赖 `bq()` 的 `poyCount`/`topCount`。

### 生效点（sim.deob.js）
- newState 第5参数 `bAch`：`ovr`(初始+)/`talent`(天赋+)/`money`(家底+) 在创建对象时应用；`achBonus` 存入 au
- 受伤概率：line 297 后 `bT *= achBonus.injury`
- 成长：line 276 `bG *= achBonus.growth`
- 国家队入选：line 327 `c0 *= achBonus.natCall`
- 能力衰减：line 277 当 `bF<0`（30岁后）时 `bF *= achBonus.decay`
- `bq()`（buildProfile）额外扫描 seasons 生成 `seasonDouble20`（单季 20+20）/`lateGoals`（35岁后单季20球），供 double20/veteran 判定

### UI（game.deob.js）
- `cAch()`：遍历 archive 合并 bonus + 生成去重效果列表（同类取 max）
- `cBch()`：把 ENDINGS.bonus 翻译成中文描述（含 decay 分支）
- b0() 位置步骤（`aX===0x1`）末尾渲染勾选框 `#ach-boost` + 已解锁效果
- bS() 开始生涯时 `newState(..., cAch().bonus if checked)`
- bq() 结局图鉴（view-codex）：已见条目若有 bonus，底部显示金色「加成：...」块

