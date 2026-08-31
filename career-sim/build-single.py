import re, sys, os, base64
sys.stdout.reconfigure(encoding='utf-8')

BASE = r'D:\football\career-sim'
OUT = r'D:\football\career-sim\build\career-sim-single.html'

# ========== 1. 队徽 base64 映射（键名 -> data URI）==========
crest_dir = os.path.join(BASE, 'assets', 'crests')
crest_data = {}
for f in os.listdir(crest_dir):
    if os.path.isfile(os.path.join(crest_dir, f)):
        key = f.rsplit('.', 1)[0]
        ext = f.rsplit('.', 1)[-1].lower()
        mime = {'svg':'image/svg+xml','png':'image/png','webp':'image/webp'}.get(ext, 'application/octet-stream')
        b = base64.b64encode(open(os.path.join(crest_dir, f), 'rb').read()).decode()
        crest_data[key] = f'data:{mime};base64,{b}'
print(f"队徽映射: {len(crest_data)}")

# ========== 2. 奖杯 base64 映射 ==========
trophy_dir = os.path.join(BASE, 'assets', 'trophies')
trophy_data = {}
for f in os.listdir(trophy_dir):
    name = f.rsplit('.', 1)[0]
    b = base64.b64encode(open(os.path.join(trophy_dir, f), 'rb').read()).decode()
    trophy_data[name] = f'data:image/png;base64,{b}'
print(f"奖杯映射: {len(trophy_data)}")

# ========== 3. 读取并处理 crests.js ==========
crests_js = open(os.path.join(BASE, 'src', 'crests.js'), encoding='utf-8').read()
# 用键名替换所有 "assets/c"+... 值为 data URI
# 模式: '键':"assets/c"+... (多段拼接) 或 '键':(替换后的)
def repl_crest_entry(m):
    key = m.group(1)
    if key in crest_data:
        return f"'{key}':\"{crest_data[key]}\""
    return m.group(0)
# 匹配 '键':"assets/c"...直到逗号前（含多段拼接）
new_crests = re.sub(r"'([^']+)':\"assets/c\"(?:\s*\+\s*[\"'][^\"']*[\"'])*", repl_crest_entry, crests_js)
remaining = new_crests.count('"assets/c"')
print(f"crests 替换后残留 assets/c: {remaining}")

# ========== 4. 处理 game.js 的奖杯路径 ==========
game_js = open(os.path.join(BASE, 'src', 'game.js'), encoding='utf-8').read()
# bi() 里: return "assets/t"+"rophies/"+bh[bY][0x1]+".png"
old_trophy = '"assets/t"+"rophies/"+bh[bY][0x1]+".png"'
new_trophy = '(window._TROPHY_DATA&&window._TROPHY_DATA[bh[bY][0x1]]||"")'
game_js = game_js.replace(old_trophy, new_trophy)
print("game.js 奖杯路径替换:", "残留" if old_trophy in game_js else "成功")

# ========== 5. 处理其他文件 ==========
def read_js(name):
    return open(os.path.join(BASE, 'src', name), encoding='utf-8').read()

js_blocks = {
    'data.js': read_js('data.js'),
    'events.js': open(os.path.join(BASE, 'build', 'events.js'), encoding='utf-8').read(),
    'supporters.js': read_js('supporters.js'),
    'crests.js': new_crests,
    'qr.js': read_js('qr.js'),
    'natdata.js': read_js('natdata.js'),
    'sim.js': read_js('sim.js'),
    'game.js': game_js,
}

# ========== 6. 内联 CSS（含字体）==========
css = open(os.path.join(BASE, 'style.css'), encoding='utf-8').read()
font_b64 = base64.b64encode(open(os.path.join(BASE, 'assets', 'fonts', 'noto-emoji-subset.woff2'), 'rb').read()).decode()
css = css.replace('url("assets/fonts/noto-emoji-subset.woff2")', f'url(data:font/woff2;base64,{font_b64})')

# ========== 7. 组装 HTML ==========
html = open(os.path.join(BASE, 'index.html'), encoding='utf-8').read()
html = re.sub(r'<link rel="stylesheet" href="style\.css\?v=\d+">', lambda m: f'<style>\n{css}\n</style>', html)

# 注入数据
inject = '<script>window._TROPHY_DATA={' + ','.join(f'"{k}":"{v}"' for k, v in trophy_data.items()) + '};</script>'
html = html.replace('</head>', inject + '\n</head>')

# 内联 JS
for name, js in js_blocks.items():
    # 支持两种引用：src/xxx.js 和 build/xxx.js
    tag_src = f'<script src="src/{name}">'
    tag_build = f'<script src="build/{name}">'
    if tag_src in html:
        html = html.replace(tag_src, f'<script>\n{js}\n</script>')
    elif tag_build in html:
        html = html.replace(tag_build, f'<script>\n{js}\n</script>')
    else:
        print(f"  警告: 未找到 {tag_src} 或 {tag_build}")

# ========== 8. 写文件 ==========
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(html)
print(f"\n单文件已生成: {OUT}")
print(f"大小: {os.path.getsize(OUT)/1024/1024:.1f} MB")
