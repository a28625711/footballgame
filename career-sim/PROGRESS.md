# 足一把-生涯模拟器 · 本地抓包与解码进度记录

> 站点：https://career-sim.pages.dev/（纯前端静态站，Cloudflare Pages 托管）
> 记录日期：2026-08-15

## 〇、最新进度：阶段 A+B 已完成 ✅

**全部 7 个混淆 JS 文件已解码**，产出物在 `D:\football\career-sim\deobf\`。

| 文件 | 解码结果 |
|------|---------|
| `data.deob.js` | 数据文件，1018 条字符串全部还原 |
| `events.deob.js` | 事件数据，6098 条字符串全部还原 |
| `supporters.deob.js` | 支持者名单，23 条字符串还原 |
| `crests.deob.js` | 队徽映射，171 条字符串还原 |
| `qr.deob.js` | 二维码生成，16 条字符串还原 |
| `sim.deob.js` | 游戏引擎（随机数/模拟逻辑），496 条字符串还原 |
| `game.deob.js` | 主逻辑，2615 条字符串还原 |

**所有旋转公式均已求解**：

| 文件 | 旋转次数 | 目标值 |
|------|---------|--------|
| data.js | 428 | 0x64fa6 |
| events.js | 327 | 0xeddcb |
| supporters.js | 19 | 0xe0104 |
| crests.js | 157 | 0xdeba5 |
| qr.js | 8 | 0x4baf1 |
| sim.js | 253 | 0x96d96 |
| game.js | 337 | 0x41abd |

**验证结果**：解码后残留混淆调用为 0（除标准 `Array(0x..)` 构造和普通函数传 `0x` 参数外），字符串表零解码错误，代码逻辑完全可读（如 `window["SIM"]`、`localStorage["getItem"]`、`Math["imul"]` 等）。

解码脚本：`D:\football\career-sim\deobf.py`（可重跑）。

## 一、当前进度总结

已成功把游戏完整抓包到本地 `D:\football\career-sim`，并补齐了全部缺失图片资源，本地可离线运行。

### 已完成的抓包内容

**HTML 直接引用资源（9 个文件）**

| 文件 | 大小 | 作用 |
|------|------|------|
| `index.html` | 13.6 KB | 主页面（明文，可读） |
| `style.css` | 99.6 KB | 样式（明文，可读） |
| `data.js` | 48.6 KB | 球员/球队/联赛数据（混淆） |
| `events.js` | 340 KB | 事件数据（混淆，最大文件） |
| `supporters.js` | 1.9 KB | 支持者名单（混淆） |
| `crests.js` | 9.6 KB | 队徽映射表（混淆） |
| `qr.js` | 7.5 KB | 分享卡二维码生成（混淆） |
| `sim.js` | 62.2 KB | 游戏引擎/纯逻辑（混淆） |
| `game.js` | 141.9 KB | 主逻辑/DOM 渲染（混淆） |

**动态加载的图片资源（3 个目录）**

| 目录 | 数量 | 说明 |
|------|------|------|
| `assets/crests/` | 122 | 真实队徽（`.webp`/`.png`/`.svg`） |
| `assets/trophies/` | 21 | 奖杯图标（`.png`） |
| `assets/fonts/` | 1 | `noto-emoji-subset.woff2` emoji 字体 |

## 二、核心发现：混淆机制

所有 7 个 JS 文件都经过了 **javascript-obfuscator** 混淆（字符串数组 + base64 自定义字母表 + 数组旋转）。

### 混淆结构（每个文件独立一套）

```js
// 1. 字符串数组：元素是 base64 编码
function _xxx_0a() { var gW=[...]; return ...; }

// 2. 解码器：base64 + %XX + decodeURIComponent
function _xxx_0b(a,b){ a=a-0x偏移; var c=_xxx_0a(); var d=c[a]; ... }

// 3. 旋转循环：数组 shift 直到公式匹配目标值
(function(a,b){ ... if(d===b)break; else c['push'](c['shift']()); }}(_xxx_0a,0x目标))
```

### 解码关键参数（已全部确认）

| 文件 | 解码偏移 | 数组元素数 | 旋转目标值 | 旋转次数 |
|------|---------|-----------|-----------|---------|
| `data.js` | `0x14e` | 1018 | `0x64fa6` | 待算 |
| `events.js` | `0x178` | 6098 | `0xeddcb` | 待算 |
| `supporters.js` | `0x6d` | 23 | `0xe0104` | 待算 |
| `crests.js` | `0x67` | 171 | `0xdeba5` | 157 |
| `qr.js` | `0xb4` | 16 | `0x4baf1` | 待算 |
| `sim.js` | `0x1f3` | 496 | `0x96d96` | 待算 |
| `game.js` | `0x1cc` | 2615 | `0x41abd` | 337 |

### base64 自定义字母表（与标准不同）

```
自定义: abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=
标准:   ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
```
（大小写顺序对调，解码时需 translate 回标准表）

### 已证实的解码能力

- ✅ `game.js` 全部 2615 条字符串零错误解码
- ✅ `crests.js` 全部 171 条字符串解码，旋转 157 次收敛
- ✅ 成功还原出队徽路径映射（`assets/crests/{teamid}.{ext}`）和奖杯路径映射（`assets/trophies/{name}.png`）
- ✅ 成功还原多个混淆函数（`aT` 队徽渲染、`aL` 球衣渲染、`bi` 奖杯映射等）

## 三、遇到的坑（问题记录）

### 坑 1：PowerShell 编码问题
本环境是 Windows PowerShell 5.1，命令行的中文字符和特殊字符经常乱码。**解决方案**：所有逻辑写成 `.py` 脚本文件再执行，避免 `py -c "..."` 内联传参。

### 坑 2：base64 字母表差异
最初用 Python 标准 `base64.b64decode` 解码全部报 UTF-8 错误。原因是混淆器用了**自定义字母表**（小写在前）。**解决方案**：`str.maketrans` 映射回标准表再解码。

### 坑 3：数组旋转未收敛
`game.js` 旋转公式里 `parseInt` 遇到非数字片段返回 NaN，初版模拟死循环。**解决方案**：发现旋转是"每次 shift 一个元素 + 重新解码检查"，最终 brute-force 在 337 次收敛。

### 坑 4：图片路径是拼接出来的
队徽/奖杯路径不在字符串里，而是由切碎的片段拼接（`'assets/c'`+`'rests/cn'`+`'-jing.we'`+`'bp'` = `assets/crests/cn-jing.webp`）。且路径是**平铺单层**（`assets/crests/{id}.{ext}`），不是 `assets/crests/cn/{id}` 子目录。

### 坑 5：Cloudflare Pages SPA fallback
第一次下载队徽时全部返回 13.6KB 的 HTML（fallback 到 index.html），误以为下载成功。**验证方法**：检查文件魔数（PNG 应为 `\x89PNG`，WEBP 应为 `RIFF...WEBP`），并检查 Content-Type 是否 `text/html`。

## 四、待办 / 问题

1. ✅ **完全解码（阶段 A+B）已完成**：全部 7 个 JS 文件解码产物在 `deobf/` 目录，脚本为 `deobf.py`。
2. ✅ **data.js / events.js / sim.js 已解码**：旋转全部求解，字符串表零错误。
3. **球衣图片**：`assets/jersey/` 目录服务器不存在，游戏用内嵌 SVG 绘制，加载失败自动隐藏——无需下载，但需确认本地运行无异常。
4. **`window.CREST_PLATE` 变量**：`crests.js` 里 `window.CREST_PLATE` 定义了一些特殊队徽（juv/nfo/hil/eve/jbh/iam/tot），game.js 的 `aT()` 用它在徽章上叠 plate 样式，不影响图片加载。

## 五、所有 JS 完全解码的工作量评估

### 目标
把 7 个混淆 JS 反混淆为可读代码：还原全部字符串、展开变量名、恢复结构。

### 工作量分级

**阶段 A：字符串表还原（已完成 ✅）**
- 复刻每个文件的 base64 解码 + 旋转模拟
- 已实现通用脚本 `deobf.py`，7 个文件全部跑通
- 实际耗时约 40 分钟（含调试），全部旋转收敛

**阶段 B：整文件字符串替换（已完成 ✅）**
- 解析每个 JS 文件的全部 `_xxx_0b(0x..)` 调用，替换为真实字符串
- 关键：递归传播别名（`var b3=b2`、`var aX=_xxx_0b,` 逗号形式、函数内局部别名）
- 产出物 `deobf/*.deob.js`，残留混淆调用为 0
- 变量名仍是 `a0`, `bW`, `c2` 等短名，代码可读但语义需理解

**阶段 C：变量/函数重命名 + 语义还原（未做，可选）**
- 把 `a0`→`DATA`、`a6`→`SIM`、`bW`→`team` 等重命名
- 还原被切碎的字符串拼接、恢复 HTML 模板结构
- 难度：★★★★★（工作量大且需要手动判断语义）
- 预计：20~60 小时，其中 events.js（340KB，6098 条字符串）最重

### 结论
- ✅ **阶段 A+B 已完成**：所有数据/图片/代码逻辑已可读，产出在 `deobf/` 目录，解码脚本 `deobf.py` 可重跑。
- 阶段 C（变量重命名）工作量大、收益有限，**建议不做**，除非需要深度修改游戏逻辑。

## 六、本地运行方式

```bash
cd D:\football\career-sim
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

或直接双击 `index.html`（`file://` 协议下 localStorage/fetch 可能受限，建议用 HTTP server）。

游戏进度存 `localStorage`（前缀 `gyrs_`），种子机制本地化，与原站功能一致。
