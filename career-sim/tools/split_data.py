# 一次性工具:把 src/data.js 按逻辑拆成 src/data/*.ev.js 模块(仿 events 拆分)
# 运行后手动跑 tools/build_data.py 重新生成 src/data.js
import sys, os, re, json
sys.stdout.reconfigure(encoding='utf-8')
import esprima

BASE = r'D:\football\career-sim'
SRC = os.path.join(BASE, 'src', 'data.js')
OUTDIR = os.path.join(BASE, 'src', 'data')

text = open(SRC, encoding='utf-8').read()
# 行起点偏移表
line_starts = [0]
for ch in text:
    if ch == '\n':
        line_starts.append(line_starts[-1] + 1)

def off(pos):
    # pos 为 esprima SourceLocation 端点对象（属性访问）
    return line_starts[pos.line - 1] + pos.column

def span(node):
    # 优先 node.range（绝对字符偏移，不受 \r\n 行尾影响）
    r = getattr(node, 'range', None)
    if r is not None:
        return r[0], r[1]
    loc = getattr(node, 'loc', None)
    if loc is not None and getattr(loc, 'start', None) is not None:
        return off(loc.start), off(loc.end)
    raise RuntimeError('no loc/range for ' + str(node.type))

def slice_of(node):
    s, e = span(node)
    return text[s:e]

tree = esprima.parseScript(text, {'loc': True, 'range': True})
seq = tree.body[2].expression            # SequenceExpression
unary = seq.expressions[1]               # !(...)
call = unary.argument                     # (function(){...}())
fn = call.callee                          # FunctionExpression
stmts = fn.body.body

def node_name(n):
    if n.type == 'Identifier':
        return n.name
    if n.type == 'Literal':
        return n.value
    return None

# 找出 var a / var b 与 window.DATA 赋值语句
var_a = var_b = None
data_stmt = None
for s in stmts:
    if s.type == 'VariableDeclaration':
        for d in s.declarations:
            nm = node_name(d.id)
            if nm == 'a':
                var_a = d
            elif nm == 'b':
                var_b = d
    elif s.type == 'ExpressionStatement' and s.expression.type == 'AssignmentExpression':
        left = s.expression.left
        if left.type == 'MemberExpression':
            objn = node_name(left.object) if left.object.type in ('Identifier',) else None
            propn = node_name(left.property)
            if objn == 'window' and propn == 'DATA':
                data_stmt = s.expression
assert var_a is not None and var_b is not None and data_stmt is not None

awards_slice = slice_of(var_a.init)      # 奖项对象
endings_slice = slice_of(var_b.init)     # 结局数组
data_obj = data_stmt.right                # ObjectExpression
props = data_obj.properties

# DATA 顶层键顺序
key_of = lambda p: node_name(p.key)
keys = [key_of(p) for p in props]
print('DATA keys:', keys)

val = {}
for p in props:
    val[key_of(p)] = slice_of(p.value)

# TEAMS 拆分为 league 分组（保持组内原始相对顺序）
teams_elems = []
for p in props:
    if key_of(p) == 'TEAMS':
        arr = p.value
        for el in arr.elements:
            lg = None
            for q in el.properties:
                if key_of(q) == 'league':
                    lg = q.value.value if q.value.type == 'Literal' else node_name(q.value)
                    break
            teams_elems.append((lg, slice_of(el)))
assert len(teams_elems) == len([e for e in teams_elems]), 'every team needs league'
print('total teams:', len(teams_elems))

# LEAGUES 顺序 作为 team 文件顺序
leagues_order = []
for p in props:
    if key_of(p) == 'LEAGUES':
        for el in p.value.elements:
            for q in el.properties:
                if key_of(q) == 'id':
                    leagues_order.append(q.value.value if q.value.type == 'Literal' else node_name(q.value))
                    break
print('leagues:', leagues_order)

# 非 team 大块:positions/leagues 用完整值；awards(a)/endings(b) 保留原名(闭包引用 a)
def write(name, content):
    path = os.path.join(OUTDIR, name)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print('wrote', name, '(%d chars)' % len(content))

# 映射 data 顶层键 → (模块文件名, 声明变量)
simple = {
    'POSITIONS': ('positions', 'positions'),
    'LEAGUES':   ('leagues',   'leagues'),
}
for key in ('POSITIONS', 'LEAGUES'):
    name, varname = simple[key]
    write(name + '.ev.js', '// 由 tools/build_data.py 生成模块——修改后运行 tools/build_data.py 重建\n// 定义: window.DATA.%s\nvar %s =' % (key, varname) + val[key] + ';\n')

# awards → a / endings → b（保留 a/b 名称，结局闭包引用了 a）
write('awards.ev.js', '// window.DATA.AWARDS（奖项名映射，结局 test 闭包引用变量 a）\nvar a =' + awards_slice + ';\n')
write('endings.ev.js', '// window.DATA.ENDINGS（生涯结局列表）\nvar b =' + endings_slice + ';\n')

# 每个联赛一个 team 文件（原数组相对顺序保留）
for lg in leagues_order:
    es = [s for g, s in teams_elems if g == lg]
    write('teams_' + lg + '.ev.js', '// window.DATA.TEAMS 中 league="%s" 的球队\nvar TEAMS_%s = [\n%s\n];\n' % (lg, lg, ',\n'.join(es)))

# config: DATA 尾部小配置块（除 AWARDS/ENDINGS 由独立模块提供）
tail_keys = [k for k in keys if k not in ('endingView', 'POSITIONS', 'LEAGUES', 'TEAMS', 'AWARDS', 'ENDINGS')]
entries = []
for k in tail_keys:
    entries.append("'%s':%s" % (k, val[k]))
write('config.ev.js', '// window.DATA 尾部配置块（除 AWARDS/ENDINGS 独立成模块）\nvar config = {\n' + ',\n'.join(entries) + '\n};\n')

# MANIFEST
with open(os.path.join(OUTDIR, 'MANIFEST.json'), 'w', encoding='utf-8', newline='') as f:
    json.dump({'order': leagues_order}, f, ensure_ascii=False, indent=1)
print('MANIFEST order teams =', leagues_order)
print('done')
