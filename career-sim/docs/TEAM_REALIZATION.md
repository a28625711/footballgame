# career-sim 球队真实化改造 · 规划文档

> 目标：把 career-sim 的中超/中甲从虚构球队（京城蓝盾等）替换为现实真实球队 + 真实队徽
> 状态：阶段一✅ + 阶段三✅（五大联赛补全 + 其他联赛名队扩充）已完成

## 一、当前进度

### 已完成
- ✅ 确认数据源：football.json（完整欧洲/亚洲联赛名单）、TheSportsDB、FootyLogos（队徽）
- ✅ 中超 16 支真实队徽 + 队名（阶段一）
- ✅ **阶段三：其他联赛扩充**（本次）
  - 五大联赛补齐到现实数量：英超 20 / 西甲 20 / 德甲 18 / 意甲 20 / 法甲 18
  - 其他联赛按"有名且能找到队徽"原则扩充：荷甲 9、葡超 9、比甲 8、西乙 9、德乙 8、英冠 17、日职 12、K联赛 7、沙特联 6、美职联 13
  - 新增 **91 支球队**（119 → 210），全部从 TheSportsDB 下载真实 PNG 队徽
  - 唯一跳过：利雅得青年 Al-Shabab（TheSportsDB 无该队徽数据）

### 待完成（可选）
- 中甲 16 支真实队（TheSportsDB 有 10 队；FootyLogos 无中甲队徽 → 自绘 SVG 兜底）
- 小联赛（荷甲/葡超/比甲/西乙/德乙/英冠/日职/K联赛/沙特/美职）若想继续追平现实数量，需抓更多队徽

## 一.5、本次扩充明细（91 队）

> 队徽来源：TheSportsDB API `searchteams.php` 按英文名匹配 + `strBadge` 下载，存 `assets/crests/{id}.png`
> 无队徽时游戏内建按主色生成程序化徽章兜底（本次新增全部有真实队徽）

### 五大联赛（补齐到现实数量）
| 联赛 | 新增 | 球队（id） |
|------|------|-----------|
| 英超 epl 20 | +4 | lct 莱斯特城、bcy 伯恩利、ips 伊普斯维奇、shu 谢菲尔德联 |
| 西甲 liga 20 | +8 | mao 马洛卡、get 赫塔菲、ray 巴列卡诺、alv 阿拉维斯、cad 加的斯、lpa 拉斯帕尔马斯、esp 西班牙人、grd 格拉纳达 |
| 德甲 bund 18 | +7 | hof 霍芬海姆、mnz 美因茨、aug 奥格斯堡、koe 科隆、her 柏林赫塔、nbg 纽伦堡、ksl 凯泽斯劳滕 |
| 意甲 seri 20 | +9 | par 帕尔马、gen 热那亚、sam 桑普多利亚、cag 卡利亚里、ver 维罗纳、lec 莱切、emp 恩波利、sas 萨索洛、ven 威尼斯 |
| 法甲 l1 18 | +9 | bdx 波尔多、mpl 蒙彼利埃、tls 图卢兹、nts 南特、set 圣埃蒂安、rei 兰斯、aux 欧塞尔、ang 昂热、bst 布雷斯特 |

### 其他联赛（只补有名且有队徽）
| 联赛 | 新增 | 球队（id） |
|------|------|-----------|
| 荷甲 ere 9 | +4 | twt 特温特、hee 海伦芬、grn 格罗宁根、nec 尼美根 |
| 葡超 pri 9 | +4 | bav 博阿维斯塔、pfr 费雷拉、nac 国民队、rio 里奥阿维 |
| 比甲 jup 8 | +4 | stl 标准列日、ant 皇家安特卫普、gnt 根特、usg 圣吉罗斯 |
| 西乙 seg 9 | +4 | mlg 马拉加、leg 莱加内斯、ovd 奥维耶多、tfe 特内里费 |
| 德乙 b2 8 | +3 | fdu 杜塞尔多夫、h96 汉诺威96、pdb 帕德博恩 |
| 英冠 ch 17 | +10 | wat 沃特福德、qpr 女王公园巡游者、brb 布莱克本、cov 考文垂、sws 斯旺西、cdf 加的夫城、shw 谢周三、pre 普雷斯顿、hul 赫尔城、rdg 雷丁 |
| 日职 jl 12 | +8 | ksm 鹿岛鹿角、san 广岛三箭、gmb 大阪钢巴、cre 大阪樱花、ngy 名古屋鲸八、fct FC东京、ksw 柏雷素尔、jub 磐田喜悦 |
| K联赛 kl 7 | +5 | seo FC首尔、poh 浦项制铁、suw 水原三星、dgq 大邱FC、jej 济州联 |
| 沙特联 spl 6 | +2 | dam 达曼协作、fth 哈萨征服（ryd 利雅得青年：无队徽跳过） |
| 美职联 mls 13 | +10 | lag 洛杉矶银河、sea 西雅图海湾人、atlu 亚特兰大联、trt 多伦多FC、nyr 纽约红牛、chf 芝加哥火焰、ptl 波特兰伐木者、orl 奥兰多城、ner 新英格兰革命、dal 达拉斯FC |

> 所有新球队均已分配 rep（0=保级~2=中游；按实力）、主色 `color`（用于俱乐部卡片与程序化兜底徽章），并加入 `CREST_URLS`。

## 二、中超真实球队方案（16 支）

| 新id | 真实队名 | 英文名 | 强度rep | 队色 |
|------|---------|--------|:---:|------|
| cn-sh | 上海海港 | Shanghai Port | 3 | #C8102E |
| cn-sd | 山东泰山 | Shandong Taishan | 3 | #F26522 |
| cn-bj | 北京国安 | Beijing Guoan | 3 | #1F4E9C |
| cn-shh | 上海申花 | Shanghai Shenhua | 2 | #0057B8 |
| cn-cd | 成都蓉城 | Chengdu Rongcheng | 2 | #B71C1C |
| cn-wh | 武汉三镇 | Wuhan Three Towns | 2 | #0F7B6C |
| cn-tj | 天津津门虎 | Tianjin Jinmen Tiger | 2 | #3F51B5 |
| cn-zj | 浙江队 | Zhejiang Professional | 2 | #1565C0 |
| cn-hn | 河南队 | Henan FC | 2 | #C62828 |
| cn-cc | 长春亚泰 | Changchun Yatai | 1 | #E64A19 |
| cn-mz | 梅州客家 | Meizhou Hakka | 1 | #7B1FA2 |
| cn-qdh | 青岛海牛 | Qingdao Hainiu | 1 | #00838F |
| cn-qdw | 青岛西海岸 | Qingdao West Coast | 1 | #0097A7 |
| cn-sz | 深圳新鹏城 | Shenzhen Peng City | 1 | #E91E63 |
| cn-dl | 大连英博 | Dalian Yingbo | 1 | #43A047 |
| cn-yn | 云南玉昆 | Yunnan Yukun | 1 | #2E7D32 |

## 三、青训营映射重建方案

保留"省份 → 邻近球队"逻辑，11 个省份映射到新的真实球队 id：

| 省份 | 家乡队 | 邻近队 |
|------|--------|--------|
| 辽宁 ln | cn-dl(大连) | cn-dl, cn-cc, cn-bj, cn-sh, cn-shh, cn-sd |
| 山东 sd | cn-sd(泰山) | cn-sd, cn-zj, cn-hn, cn-bj, cn-qdh, cn-qdw |
| 上海 sh | cn-sh(海港)/cn-shh(申花) | cn-sh, cn-shh, cn-zj, cn-hn, cn-qdh |
| 北京 bj | cn-bj(国安) | cn-bj, cn-tj, cn-hn, cn-sd, cn-dl, cn-shh |
| 广东 gd | cn-sz(深圳) | cn-sz, cn-mz, cn-yn, cn-cd, cn-wh |
| 河南 hn | cn-hn(河南) | cn-hn, cn-bj, cn-sd, cn-zj, cn-cc |
| 河北 heb | cn-tj(津门虎) | cn-tj, cn-bj, cn-cc, cn-sd, cn-hn |
| 湖南 hun | cn-cd(成都) | cn-cd, cn-wh, cn-sz, cn-hn |
| 新疆 xj | 无 | cn-cd, cn-yn, cn-bj, cn-sd |
| 江浙 js | cn-zj(浙江) | cn-zj, cn-sh, cn-shh, cn-hn, cn-yn |
| 巴蜀 sc | cn-cd(成都) | cn-cd, cn-wh, cn-yn, cn-hn |

> 注：现有省份是 11 个，中超 16 队需合理分配到 11 个省份的邻近映射

## 四、关键风险/注意

1. **胡雪儿 cheat**：`sim.js` 的 `aw()` 用 `'sd'===origin.id`（省份山东）触发，**省份 id 体系不变**，不影响
2. **id 替换范围**：新球队 id 已同步 `crests.deob.js`（队徽）；青训 `a9`/`aa` 只覆盖中超（省份→中国球队），欧洲/亚洲新队无需映射
3. **中甲**：FootyLogos 无中甲队徽，保留自绘 SVG 兜底（游戏 fallback 机制）
4. **欧洲队**：现有队徽本就是真实的（ars/mci/bay 等）；本次仅追加不替换
5. **联赛规模无关**：游戏无积分榜，赛程按球员个人推进；升降级由"球队 rep≤1"触发、与联赛队数无关；`leagueOf` 默认读 `team.league`，加 TEAMS 即生效
6. **队徽 fallback**：`game.deob.js` 的 `aT()` 对无 `CREST_URLS` 的球队按 `color`+id 哈希生成程序化盾牌徽章（shape/条纹/点缀），不会破图

## 五、执行顺序（本次已完成）

1. ✅ 生成新 TEAMS 数据（data.deob.js）：91 队插入数组尾部
2. ✅ TheSportsDB 按英文名匹配 + 下载真实队徽 → `assets/crests/{id}.png`（失败/错配逐队修正：alv/mnz/her/ver/rei 女队或篮球错配已换真实队，ryd 无数据跳过）
3. ✅ 更新 crests.deob.js 队徽映射（91 条 CREST_URLS）
4. ✅ 备份原文件（`data.deob.js.bak_teams`、`crests.deob.js.bak_teams`）+ 验证（两文件括号平衡 0/0/0、210 队 id 无重复、队徽文件与映射一一对应）
5. ✅ 更新本 MD 进度
6. ⏳ 建议：本地 `python -m http.server` 开一局验证转会报价/梦想球队界面正常显示新队
