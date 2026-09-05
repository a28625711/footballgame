# 从 git HEAD 的 data.js 加上阵容编辑，构造"拆分前"的期望版本，用于验证模块拆分等价性
import subprocess, sys
sys.stdout.reconfigure(encoding='utf-8')

txt = subprocess.run(['git', 'show', 'HEAD:career-sim/src/data.js'],
                     capture_output=True, cwd=r'D:\football').stdout.decode('utf-8')

Q = '"'
def team(id, name, lg, rep, color):
    return ",{'id':" + Q + id + Q + ",'name':" + Q + name + Q + ",'league':" + Q + lg + Q + ",'rep':" + str(rep) + ",'color':" + Q + color + Q + "}"

jl_new = (team('mit', '水户蜀葵', 'jl', 1, '#005D9F') + team('jef', '千叶市原', 'jl', 1, '#008E5C')
          + team('fag', '冈山绿雉', 'jl', 1, '#B0063E') + team('avi', '福冈黄蜂', 'jl', 1, '#0092AE')
          + team('nag', '长崎成功丸', 'jl', 1, '#213A8F'))
mls_new = team('aus', '奥斯汀FC', 'mls', 2, '#00B140') + team('skc', '堪萨斯城竞技', 'mls', 2, '#0A2240')
jup_new = team('lom', '洛梅尔', 'jup', 1, '#006243') + team('lou', '拉卢维耶尔', 'jup', 1, '#00865A')

subs = [
    (team('jub', '磐田喜悦', 'jl', 1, '#005CA9'), jl_new),
    (team('omi', '大宫松鼠', 'jl', 1, '#FFD700'), ''),
    (team('yfc', '横滨FC', 'jl', 1, '#004197'), ''),
    (team('shon', '湘南比马', 'jl', 1, '#FFD700'), ''),
    (team('nii', '新潟天鹅', 'jl', 1, '#004197'), ''),
    (team('nor2', '新奥尔良', 'mls', 1, '#C8102E'), mls_new),
    (team('dene', '代尼兹利', 'tur', 0, '#004197'), ''),
]
cnt = 0
for a, b in subs:
    if a in txt:
        txt = txt.replace(a, b, 1)
        cnt += 1
    else:
        print('WARN not found:', a[:60])

anchor = team('zul', '祖尔特瓦', 'jup', 1, '#C8102E')[1:]
assert anchor in txt, 'zul anchor missing'
txt = txt.replace(anchor, anchor + jup_new, 1)

open(r'D:\football\career-sim\tools\_expected_data.js', 'w', encoding='utf-8').write(txt)
print('applied', cnt, 'of 7 edits + zul insert; wrote tools/_expected_data.js')
