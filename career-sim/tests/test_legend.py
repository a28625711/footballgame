# -*- coding: utf-8 -*-
"""开局/国外巨星加成回归：号码 + 位置 + 惯用脚三者一致才触发（不再只看前两者）。

每个传奇的惯用脚按其本人：梅西/马拉多纳/萨拉赫左脚，其余右脚；
中国传奇额外要求姓名一致。本测试断言脚不匹配时不触发。
"""
import json
import harness

JS = """
(function(){
function L(name,pos,num,foot){
  var st=window.__SIMTEST.start('normal',{name:name,origin:'sd',pos:pos,nation:'cn',talent:1.1,number:num,foot:foot},1);
  return st.legend?st.legend.id:'none';
}
return JSON.stringify({
  messi_left:   L('p','RW',10,'left'),
  messi_right:  L('p','RW',10,'right'),
  maradona_left:L('p','CAM',10,'left'),
  maradona_right:L('p','CAM',10,'right'),
  salah_left:   L('p','RW',11,'left'),
  salah_right:  L('p','RW',11,'right'),
  ronaldo_right:L('p','ST',9,'right'),
  ronaldo_left: L('p','ST',9,'left'),
  cristiano_right:L('p','LW',7,'right'),
  cristiano_left:L('p','LW',7,'left'),
  pele_right:   L('p','ST',10,'right'),
  pele_left:    L('p','ST',10,'left'),
  haodong_right:L('郝海东','ST',9,'right'),
  haodong_left: L('郝海东','ST',9,'left'),
  haodong_wrongnum:L('郝海东','ST',8,'right')
});
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    checks = [
        ('messi_left', 'messi'),
        ('messi_right', 'none'),
        ('maradona_left', 'maradona'),
        ('maradona_right', 'none'),
        ('salah_left', 'salah'),
        ('salah_right', 'none'),
        ('ronaldo_right', 'ronaldo'),
        ('ronaldo_left', 'none'),
        ('cristiano_right', 'cristiano'),
        ('cristiano_left', 'none'),
        ('pele_right', 'pele'),
        ('pele_left', 'none'),
        ('haodong_right', 'haodong'),
        ('haodong_left', 'none'),
        ('haodong_wrongnum', 'none'),
    ]
    bad = []
    for k, want in checks:
        got = r.get(k)
        if got != want:
            bad.append('%s: got %r want %r' % (k, got, want))
    if bad:
        raise harness.Fail('; '.join(bad))
    print('PASS legend (%d cases: number+pos+foot gating, left/right respected)' % len(checks))


if __name__ == '__main__':
    harness.main(run)
