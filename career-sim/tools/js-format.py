import sys, os
sys.stdout.reconfigure(encoding='utf-8')

# 代码块开头关键字（{ 前一个是这些时视为代码块）
BLOCK_KEYWORDS = ('else', 'do', 'try', 'finally')


def formatter_final(code, max_line=120, indent_unit='    '):
    """; 换行 + 顶层逗号拆长行 + 代码块 { } 缩进。保护字符串/正则/注释。
    for(...) 头内 / 调用参数 / 对象字面量内的 ; 与 , 不触发换行。"""
    out = []
    in_str = None
    in_rx = False
    paren_depth = 0     # ( [ { 的深度（对象/调用/for 头内部）
    line = []
    depth = 0           # 代码块缩进层级
    last_sig = ''       # 最后一个非空白字符（用于判断 { 是代码块还是对象）
    i = 0
    n = len(code)

    def flush():
        nonlocal line
        if not line:
            return
        s = ''.join(line)
        line = []
        if len(s) > max_line:
            parts = split_comma(s, max_line)
            for p in parts:
                out.append(indent_unit * depth + p)
        else:
            out.append(indent_unit * depth + s)

    while i < n:
        c = code[i]
        # 行注释
        if c == '/' and i + 1 < n and code[i + 1] == '/' and not in_str and not in_rx:
            j = code.find('\n', i)
            if j == -1:
                j = n
            flush()
            out.append(indent_unit * depth + code[i:j])
            i = j
            continue
        # 块注释
        if c == '/' and i + 1 < n and code[i + 1] == '*' and not in_str and not in_rx:
            j = code.find('*/', i + 2)
            if j == -1:
                j = n
            else:
                j += 2
            flush()
            for ln in code[i:j].split('\n'):
                out.append(indent_unit * depth + ln)
            i = j
            continue
        if in_str:
            line.append(c)
            if c == '\\' and i + 1 < n:
                line.append(code[i + 1])
                i += 2
                continue
            if c == in_str:
                in_str = None
            i += 1
            continue
        if in_rx:
            line.append(c)
            if c == '\\' and i + 1 < n:
                line.append(code[i + 1])
                i += 2
                continue
            if c == '/':
                in_rx = False
            i += 1
            continue
        if c in ('"', "'", '`'):
            in_str = c
            line.append(c)
            last_sig = c
            i += 1
            continue
        if c == '/':
            prev = ''.join(line).rstrip()
            if prev and prev[-1] not in ')]}' and not prev[-1].isalnum() and prev[-1] != '_' and code[i + 1] not in '/*':
                in_rx = True
                line.append(c)
                last_sig = c
                i += 1
                continue
            line.append(c)
            last_sig = c
            i += 1
            continue
        if c == ';':
            if paren_depth == 0:
                line.append(c)
                flush()
            else:
                line.append(c)
            last_sig = c
            i += 1
            continue
        if c in '({[':
            if c == '{' and paren_depth == 0:
                # 判断是代码块还是对象字面量
                prev_line = ''.join(line).rstrip()
                is_block = prev_line.endswith(')')
                # 检查是否以控制流关键字结尾
                for kw in BLOCK_KEYWORDS:
                    if prev_line.endswith(kw):
                        is_block = True
                        break
                if is_block:
                    line.append(c)
                    flush()
                    depth += 1
                    last_sig = c
                else:
                    paren_depth += 1
                    line.append(c)
                    last_sig = c
            else:
                paren_depth += 1
                line.append(c)
                last_sig = c
            i += 1
            continue
        if c in ')}]':
            if c == '}' and paren_depth == 0:
                flush()
                depth = max(0, depth - 1)
                out.append(indent_unit * depth + c)
                last_sig = c
            else:
                paren_depth = max(0, paren_depth - 1)
                line.append(c)
                last_sig = c
            i += 1
            continue
        line.append(c)
        if not c.isspace():
            last_sig = c
        i += 1
    flush()
    return '\n'.join(out)


def split_comma(s, max_line):
    parts = []
    start = 0
    depth = 0
    in_str = None
    in_rx = False
    i = 0
    while i < len(s):
        c = s[i]
        if in_str:
            if c == '\\':
                i += 2
                continue
            if c == in_str:
                in_str = None
            i += 1
            continue
        if in_rx:
            if c == '\\':
                i += 2
                continue
            if c == '/':
                in_rx = False
            i += 1
            continue
        if c in ('"', "'", '`'):
            in_str = c
            i += 1
            continue
        if c == '/':
            prev_code = s[:i].rstrip()
            if prev_code and prev_code[-1] not in ')]}' and not prev_code[-1].isalnum() and prev_code[-1] != '_' and s[i + 1] not in '/*':
                in_rx = True
                i += 1
                continue
            i += 1
            continue
        if c in '({[':
            depth += 1
        elif c in ')}]':
            depth -= 1
        elif c == ',' and depth <= 1 and i - start > max_line:
            parts.append(s[start:i + 1])
            start = i + 1
        i += 1
    parts.append(s[start:])
    return parts


if __name__ == '__main__':
    # 用法: python tools/js-format.py [--inplace]
    #   --inplace  直接写回源文件（src/*.js 与 src/events/*.ev.js）
    #   默认       输出到 formatted_final 临时目录
    inplace = '--inplace' in sys.argv
    base = r'D:\football\career-sim\src'
    outdir = r'C:\Users\chen\AppData\Local\Temp\opencode\formatted_final'
    os.makedirs(outdir, exist_ok=True)
    files = ['data.js', 'supporters.js', 'crests.js', 'qr.js', 'natdata.js',
             'sim.js', 'game.js']
    ev_files = ['abr.ev.js', 'aca.ev.js', 'att.ev.js', 'club.ev.js',
                'cn.ev.js', 'def.ev.js', 'gk.ev.js', 'kid.ev.js',
                'league.ev.js', 'love.ev.js', 'mid.ev.js', 'misc.ev.js',
                'nat.ev.js', 'star.ev.js', 'tier.ev.js', 'vet.ev.js',
                'youth.ev.js', 'helpers.js']
    all_files = files + ev_files
    for f in all_files:
        p = os.path.join(base, f)
        if not os.path.exists(p):
            p = os.path.join(base, 'events', f)
        if not os.path.exists(p):
            print(f"{f}: MISSING")
            continue
        t = open(p, encoding='utf-8').read()
        result = formatter_final(t)
        out = os.path.join(outdir, os.path.basename(f).replace('.js', '.formatted.js'))
        with open(out, 'w', encoding='utf-8') as fh:
            fh.write(result)
        if inplace:
            with open(p, 'w', encoding='utf-8') as fh:
                fh.write(result)
        lines = result.split('\n')
        tag = 'INPLACE' if inplace else 'preview '
        print(f"{tag} {f}: {len(lines)} 行, 超长(>200): {sum(1 for l in lines if len(l) > 200)}")
