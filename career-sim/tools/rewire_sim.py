# b2() 一次性接线手术：联赛真实化改造（跑一次即可，重复运行应报 NOT FOUND）
import re, sys
sys.stdout.reconfigure(encoding='utf-8')

P = r'D:\football\career-sim\src\sim.js'
txt = open(P, encoding='utf-8').read()
orig_len = len(txt)
ok = []

def sub(name, pattern, repl, count=1, regex=True):
    global txt
    if regex:
        new, n = re.subn(pattern, repl, txt, count=count, flags=re.S)
    else:
        n = txt.count(pattern)
        new = txt.replace(pattern, repl, count)
    if n != count:
        print('FAIL %s (matched %d)' % (name, n)); sys.exit(1)
    txt = new
    ok.append(name)

# 1) 删除四个旧杯赛函数（b2Cup..b2ClubWC，连续区块）
m1 = txt.index('function b2Cup(bx,')
m2 = txt.index('function b2(){var bx=ar(),')
assert m1 < m2
txt = txt[:m1] + txt[m2:]
ok.append('delete old cup fns')

# 2) 删除杯赛调用点
sub('cup call site',
    r'\}if\(bx&&by\)\{b2Cup\(bx,\s*by,bz\);b2SuperCup\(bx,by,bz\);b2Continental\(bx,by,bz\);b2ClubWC\(bx,by,bz\);\}',
    '}')

# 3) 替换奖杯概率块（ League 真实冠军；杯/洲赛奖杯改由真实赛果产生 ）
hdr = 'if(bx&&a0["ROLES"][a2["role"]]["rank"]>=0x2){var bV=a2["pendingM"+"ult"]||{};'
h = txt.index(hdr)
# 括号配平找块尾
depth = 0; i = h + hdr.index('{')
start = i
while True:
    c = txt[i]
    if c == '{': depth += 1
    elif c == '}':
        depth -= 1
        if depth == 0: break
    i += 1
end = i + 1  # 含闭合 }
new_trophy = ('if(bx&&by&&_lgRow&&_lgRow["pos"]===0x1&&a0["ROLES"][a2["role"]]["rank"]>=0x2){'
              'var cb=by["name"]+\'冠军\';'
              'bz["trophies"]["push"](cb),a2["trophies"]["push"]({\'name\':cb,\'age\':a2["age"],\'team\':bx["name"]});}')
txt = txt[:h] + new_trophy + txt[end:]
ok.append('trophy block')

# 4) 替换 §9b 统计聚合块
m = re.search(r"var _lr=by\['id']==='bund'\?0x22:.*?bz\[\"goals\"\]=Math\[\"max\"\]\(0,bz\[\"goals\"\]-_ov\);\}\}", txt, re.S)
assert m, 'sec9b not found'
new9b = (
"/* -- §9b 联赛真实化（世界引擎，见 PLAN-league-realism.md） -- */\n"
"_runWorld(bz,bx,by);\n"
"var _lgRow=a2[\"_lgRow\"];\n"
"bz[\"leaguePos\"]=_lgRow?_lgRow[\"pos\"]:null,\n"
"bz[\"leagueW\"]=_lgRow?_lgRow[\"w\"]:0,bz[\"leagueD\"]=_lgRow?_lgRow[\"d\"]:0,bz[\"leagueL\"]=_lgRow?_lgRow[\"l\"]:0,\n"
"bz[\"leagueGF\"]=_lgRow?_lgRow[\"gf\"]:0,bz[\"leagueGA\"]=_lgRow?_lgRow[\"ga\"]:0,bz[\"leaguePts\"]=_lgRow?_lgRow[\"pts\"]:0;"
"if(_lgRow&&_lgRow[\"gf\"]>0x0){var _roleG=a0[\"ROLES\"][a2[\"role\"]][\"rank\"];"
"var _gCap=_roleG>=0x3?0.7:_roleG>=0x2?0.55:0.4;var _aCap=_roleG>=0x3?0.55:_roleG>=0x2?0.45:0.35;"
"var _maxG=Math[\"round\"](_lgRow[\"gf\"]*_gCap);var _maxA=Math[\"round\"](_lgRow[\"gf\"]*_aCap);"
"if(bz[\"goals\"]>_maxG)bz[\"goals\"]=_maxG;if(bz[\"assists\"]>_maxA)bz[\"assists\"]=_maxA;"
"if(bz[\"goals\"]+bz[\"assists\"]>_lgRow[\"gf\"]){var _ov=bz[\"goals\"]+bz[\"assists\"]-_lgRow[\"gf\"];bz[\"goals\"]=Math[\"max\"](0,bz[\"goals\"]-_ov);}}")
txt = txt[:m.start()] + new9b + txt[m.end():]
ok.append('sec9b')

# 5) 替换升降级闭包
m = re.search(r"return function\(c9,\s*ca,cb\)\{.*?\}\}\}\(bz,\s*bx,by\),a2\[\"maxOvr\"\]", txt, re.S)
assert m, 'promo closure not found'
txt = txt[:m.start()] + 'return _promoReleg(bz,bx,by),a2["maxOvr"]' + txt[m.end():]
ok.append('promo closure')

# 6) aV 合并附加数据（counterTid/oppStr 等）
old_av = "return a2[\"bigQ\"]=[{'kind':bx,'p':by,'recIdx':a2[\"seasons\"][\"length\"],'age':a2[\"age\"],'comp':bz&&bz[\"comp\"]||'','team':bA?bA[\"name\"]:'','opp':bz&&bz[\"opp\"]||aU(bx,bA,bB),'teamId':bA?bA['id']:null}],"
new_av = ("var _bq={'kind':bx,'p':by,'recIdx':a2[\"seasons\"][\"length\"],'age':a2[\"age\"],'comp':bz&&bz[\"comp\"]||'','team':bA?bA[\"name\"]:'','opp':bz&&bz[\"opp\"]||aU(bx,bA,bB),'teamId':bA?bA['id']:null};"
          "if(bz)for(var _bk in bz)_bq[_bk]=bz[_bk];_bq[\"teamId\"]=bA?bA['id']:_bq[\"teamId\"];return a2[\"bigQ\"]=[_bq],")
sub('aV merge', old_av, new_av, regex=False)

# 7) _bmOppStr 支持显式对手强度
sub('bmOppStr', r'function _bmOppStr\(bx\)\{\n  var tm=',
    'function _bmOppStr(bx){\n  if(bx["oppStr"])return bx["oppStr"];\n  var tm=')

# 8) 大场结算 promo/drop 走 _moveTeam（rep 归位+dev bonus），败方附加赛对手递补升级
old_bm = ("\"promo\"===bI[\"kind\"]&&bM?(a2[\"leagueOf\"]=a2[\"leagueOf\"]||{},a2[\"leagueOf\"][bI[\"teamId\"]]=am[bI[\"fromLeag\"+'ue']],bZ[\"move\"]='升上'+ak(am[bI[\"fromLeag\"+'ue']])[\"name\"]):"
          "\"drop\"!==bI[\"kind\"]||bM||(a2[\"leagueOf\"]=a2[\"leagueOf\"]||{},a2[\"leagueOf\"][bI[\"teamId\"]]=ao[bI[\"fromLeag\"+'ue']],bZ[\"move\"]='降入'+ak(ao[bI[\"fromLeag\"+'ue']])[\"name\"]))")
new_bm = ("\"promo\"===bI[\"kind\"]&&bM?(_moveTeam(bI[\"teamId\"],am[bI[\"fromLeag\"+'ue']],!0x0,0x1),bZ[\"move\"]='升上'+ak(am[bI[\"fromLeag\"+'ue']])[\"name\"]):"
          "\"drop\"!==bI[\"kind\"]||bM||(_moveTeam(bI[\"teamId\"],ao[bI[\"fromLeag\"+'ue']],!0x1,0x1),bZ[\"move\"]='降入'+ak(ao[bI[\"fromLeag\"+'ue']])[\"name\"]),"
          "bI[\"counterTid\"]&&!bM&&_moveTeam(bI[\"counterTid\"],bI[\"counterTo\"],!0x0,0x2))")
sub('bmFinish promo/drop', old_bm, new_bm, regex=False)

open(P, 'w', encoding='utf-8', newline='').write(txt)
print('OK:', ', '.join(ok), '| %d -> %d chars' % (orig_len, len(txt)))

# 语法校验
import esprima
esprima.parseScript(txt)
print('esprima: syntax OK')
