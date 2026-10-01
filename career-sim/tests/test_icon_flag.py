# -*- coding: utf-8 -*-
# 回归：事件图标里的国旗改用 SVG 缩略（icon 写 {flag:n_chn} → <img class="ev-flag">），
# 不再用会在 Windows 上渲染成 "CN" 字母的区域指示符 emoji。
import json

import harness

P = "{'name':'lg','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'}"

JS = r"""
(function(){
var out={tokens:[],badKey:[]};
var E=window.EVENTS,i;
var keys={},_N=(typeof NATS!=='undefined')?NATS:((window&&window.NATS)||[]);
for(i=0;i<_N.length;i++)keys[_N[i].img]=1;
for(i=0;i<E.length;i++){
  var ic=E[i].icon?String(E[i].icon):'';
  var re=/\{flag:([a-z0-9_]+)\}/g,m;
  while((m=re.exec(ic))){out.tokens.push([E[i].id,m[1]]);if(!keys[m[1]])out.badKey.push(E[i].id+':'+m[1]);}
}
/* 渲染一个用国旗图标的 pending，看输出 */
var st=window.__SIMTEST.start('normal',%P%,1301);
st.phase='career';st.age=24;st.ovr=80;st.maxOvr=90;st.teamId='cn-sd';st.role='starter';
st.flags={};st.usedEvents={};st.forceQ=[];st.pending=null;
st.pending={'type':'random','eventId':'nat_firstgoal','descText':'x'};
try{ out.html=String(window.__SIMTEST.render()||''); }catch(e){ out.err=String(e).slice(0,120); }
return JSON.stringify(out);
})()
""".replace('%P%', P)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(not r.get('err'), 'render error: %s' % r.get('err'))
    ids = [t[0] for t in r['tokens']]
    harness.check(len(ids) >= 3, '国旗图标的 token 太少: %s' % r['tokens'])
    harness.check(not r['badKey'], 'token 指向不存在的 NATS.img: %s' % r['badKey'])
    html = harness.rendered_html(mr)
    harness.check('ev-flag' in html, '渲染结果里没有 ev-flag 图片: %s' % html[:200])
    harness.check('n_chn' in html, '渲染结果里没有解析出 n_chn: %s' % html[:200])
    harness.check('\U0001F1E8\U0001F1F3' not in html, '仍在用国旗 emoji: %s' % html[:200])
    print('PASS icon_flag (%d 个 {flag:} token, 渲染含 ev-flag+n_chn)' % len(ids))


if __name__ == '__main__':
    harness.main(run)
