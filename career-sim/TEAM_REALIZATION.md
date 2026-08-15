# career-sim 球队真实化改造 · 规划文档

> 目标：把 career-sim 的中超/中甲从虚构球队（京城蓝盾等）替换为现实真实球队 + 真实队徽
> 状态：阶段一进行中（已抓取中超 16 支真实队徽）

## 一、当前进度

### 已完成
- ✅ 确认数据源：football.json（完整欧洲/亚洲联赛名单）、TheSportsDB、FootyLogos（队徽）
- ✅ 从中超/中甲：已抓取 **16 支中超真实队徽**（SVG，存于 `assets/crests/`）
  - 上海海港 cn-sh、山东泰山 cn-sd、北京国安 cn-bj、上海申花 cn-shh、成都蓉城 cn-cd、武汉三镇 cn-wh、天津津门虎 cn-tj、浙江队 cn-zj、河南队 cn-hn、长春亚泰 cn-cc、梅州客家 cn-mz、青岛海牛 cn-qdh、青岛西海岸 cn-qdw、深圳新鹏城 cn-sz、大连英博 cn-dl、云南玉昆 cn-yn
- ✅ 确认替换方案：**保留原 id 体系不适用**，改用新真实队 id

### 阶段一：中超真实化 ✅ 已完成
- [x] 修改 `data.deob.js` 中超球队为真实队名（16 支中超 + 10 支中甲）
- [x] 重建青训营 `a9`(NEAR_TEAMS) / `aa`(HOME_TEAMS) 映射（省份 → 新真实队 id）
- [x] 更新 `crests.deob.js` 队徽映射（16 支中超指向 `assets/crests/{id}.svg`）
- [x] 验证游戏运行（三文件括号平衡=0，队徽加载正常）
- [x] 清理旧虚构队徽文件（19 个 webp）
- [x] 备份：`data.deob.js.bak` / `sim.deob.js.bak` / `crests.deob.js.bak`

### 待完成（阶段二：中甲真实化）
- 中甲 16 支真实队（TheSportsDB 有 10 队）
- FootyLogos 无中甲队徽 → 用自绘 SVG 兜底

### 待完成（后续阶段，可选）
- 欧洲/其他联赛补全到完整规模（180+ 队）
- 需抓大量新队徽 + 重建全部青训映射

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
2. **id 替换范围**：新球队 id 需同步更新 `a9`/`aa`（青训）、`crests.deob.js`（队徽）
3. **中甲**：FootyLogos 无中甲队徽，保留自绘 SVG 兜底（游戏 fallback 机制）
4. **欧洲队**：现有队徽本就是真实的（ars/mci/bay 等），本次不动

## 五、执行顺序

1. 生成新 TEAMS 数据（data.deob.js）
2. 重建 a9/aa 青训映射（sim.deob.js）
3. 更新 crests.deob.js 队徽映射
4. 备份原文件 + 验证运行
5. 更新本 MD 进度
