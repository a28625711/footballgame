# -*- coding: utf-8 -*-
"""天赋差分事件回归：青训营 / 生涯早期 各 高·中·低 三档，共 6 个，when 分档正确。"""
import json
import harness

JS = r"""
(function(){
var out={err:null,ids:[],chk:{}};
var evs={}; window.EVENTS.forEach(function(e){if(/gift/.test(e['id']))evs[e['id']]=e;});
out.ids=Object.keys(evs).sort();
function ctx(phase,talent,age){
  var au=window.__SIMTEST.start('normal',%NEW_PLAYER%,3);
  au.phase=phase; au.talent=talent; au.age=age; au.pending=null;
  return window.SIM.snap();
}
function w(id,phase,talent,age){var e=evs[id];return e?!!e['when'](ctx(phase,talent,age)):null;}
var c=out.chk;
c.youth_hi  = w('youth_gift_hi','youth',1.4,16)===true;
c.youth_mid = w('youth_gift_mid','youth',1.15,16)===true;
c.youth_lo  = w('youth_gift_lo','youth',0.9,16)===true;
c.youth_hi_on_low = w('youth_gift_hi','youth',0.9,16)===false;
c.pro_hi = w('pro_gift_hi','career',1.4,22)===true;
c.pro_mid= w('pro_gift_mid','career',1.15,22)===true;
c.pro_lo = w('pro_gift_lo','career',0.9,22)===true;
c.pro_old= w('pro_gift_hi','career',1.4,30)===false;
c.youth_not_in_career = w('youth_gift_hi','career',1.4,22)===false;
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    want = ['pro_gift_hi', 'pro_gift_lo', 'pro_gift_mid',
            'youth_gift_hi', 'youth_gift_lo', 'youth_gift_mid']
    if r['ids'] != want:
        raise harness.Fail('gift events missing/misnamed: %r' % r['ids'])
    for k, v in r['chk'].items():
        if not v:
            raise harness.Fail('gift tier check failed: %s' % k)
    print('PASS gift_events (6 events, %s)' % ' '.join(sorted(r['chk'])))


if __name__ == '__main__':
    harness.main(run)
