# 属性差分事件（attr.ev.js）：注册表 + "高/低档位真能改变概率" 的差分断言。
# 每个带概率选项的事件，用全低 / 全高属性快照求 p，要求至少一个选项概率明显上移。
import json

import harness

JS = r"""
(function(){
var E=window.EVENTS,out={counts:{gx:0,fm:0,cl:0,rl:0},bad:[],noOpt:[],stages:{},cn:0};
var LO={guanxi:0,fame:0,clean:0,ovr:50,roleRank:1,roleAdjust:-4,age:24,talent:0.7,
        posGroup:'mid',money:0,leagueRep:1,clubRep:1,inChina:true,seasonsAbroad:0,
        contractLeft:1,posMoves:[],posBackMoves:[],natGoals:0};
var HI={guanxi:100,fame:100,clean:100,ovr:90,roleRank:4,roleAdjust:4,age:24,talent:1.3,
        posGroup:'mid',money:1000,leagueRep:4,clubRep:4,inChina:true,seasonsAbroad:3,
        contractLeft:0,posMoves:[],posBackMoves:[],natGoals:12};
for(var i=0;i<E.length;i++){
  var e=E[i],m=/^(gx|fm|cl|rl)_/.exec(e['id']||'');
  if(!m)continue;
  out.counts[m[1]]++;
  out.stages[e['stage']||'?']=(out.stages[e['stage']||'?']||0)+1;
  if(e['cn'])out.cn++;
  var opts=e['options']||[],anyP=false,diff=false;
  for(var k=0;k<opts.length;k++){
    if(typeof opts[k]['p']!=='function')continue;
    anyP=true;
    try{var a=opts[k]['p'](LO),b=opts[k]['p'](HI);if(b>a+0.02)diff=true;
        if(!(a>=0&&a<=1&&b>=0&&b<=1))out.bad.push(e['id']+':range '+a+','+b);}catch(err){out.bad.push(e['id']+':throw '+err);}
  }
  if(!anyP)out.noOpt.push(e['id']);
  if(anyP&&!diff)out.bad.push(e['id']+':nondiff');
}
return JSON.stringify(out);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    for k, v in sorted(r['counts'].items()):
        harness.check(v == 12, '%s 事件数应为 12，实际 %d' % (k, v))
    harness.check(not r['bad'], '差分/取值异常: %s' % r['bad'])
    harness.check(not r['noOpt'], '以下事件没有任何概率选项: %s' % r['noOpt'])
    harness.check({'youth', 'prime', 'vet'} <= set(r['stages']), '阶段覆盖不足: %s' % r['stages'])
    harness.check(r['cn'] >= 8, '国内专属事件偏少: %d' % r['cn'])
    print('PASS attr_events (%s, stages=%s, cn=%d)'
          % (r['counts'], r['stages'], r['cn']))


if __name__ == '__main__':
    harness.main(run)
