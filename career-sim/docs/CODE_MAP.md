# career-sim 代码结构地图（修改速查）

> 用途：记录游戏各系统在解码文件中的关键位置，方便后续修改
> 更新：2026-08-15

## 文件结构

- `deobf/game.deob.js` — 主逻辑 / DOM 渲染（1371 行）
- `deobf/sim.deob.js` — 游戏引擎 / 纯逻辑（895 行）
- `deobf/events.deob.js` — 事件数据（3390 行）
- `deobf/data.deob.js` — 球队/联赛/位置/出身数据（328 行）
- `deobf/crests.deob.js` — 队徽映射（98 行）
- `deobf/qr.deob.js` — 二维码（250 行）
- `deobf/supporters.deob.js` — 支持者名单（32 行）

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
- 青训事件过滤（aE）：`stage==="youth"` 才在青训触发；`cn` 标记控制国内外
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
- 记录点 2（关键战）：`choose` bigmatch 分支结算处（`a2["pending"]["result"]=` 后），title 用 `bI["comp"]`（如"世界杯"/"欧冠"），text 用 `(bM?'冠军':'失利')+'：'+bY`（bY 含比分）
- 渲染：`game.deob.js b9()` 个人面板消费 `au.eventLog`（按年龄分组，和赛季 note/ovrEnd 并排）

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
ca = 0.5/梯队数 × (1 + max(0, ovr-80)×0.06)   // ovr<80 不降低，只提高
```
已确认低 ovr 不降低夺冠概率（max(0,...) 保证）。

## 事件数组位置（events.deob.js）

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

