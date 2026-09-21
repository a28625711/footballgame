# -*- coding: utf-8 -*-
"""转会 / 续约回归：
- openContract -> 当季末开"纯续约窗"（只当前队，可续约 / 暂不续约）
- 续约真正更新 contractLeft；暂不续约清窗
- lockAbroad:0 能解锁
- 老将回归邀请不绕过 lockAbroad
"""
import json
import harness

JS = r"""
(function(){
var out={err:null,checks:{}};
function mk(seed){
  var au=window.__SIMTEST.start('long',%NEW_PLAYER%,seed);
  au.phase='career';au.teamId='cn-sh';au.role='star';au.age=24;au.ovr=82;au.maxOvr=95;
  au.contractLeft=2;au.seasonsAtClub=3;au.lowSpell=0;au.flags={};au.lockAbroad=0;au.pending=null;
  return au;
}
function lgOf(id){var t=window.SIM.teamById(id);var l=t?window.SIM.leagueOfTeam(t):null;return l?l.id:'?';}
function offerLeagues(){var p=window.__SIMTEST.state().pending;var o=(p&&p.offers)||[];return o.map(function(i){return lgOf(i);});}

try{
  /* 1) openContract 置标志 */
  var au=mk(3); window.SIM.applyResult({'openContract':true});
  out.checks.flag = !!window.__SIMTEST.state().flags._contractDue;

  /* 2) 当季末开纯续约窗 */
  au=mk(3); au.flags._contractDue=true; window.SIM.nextStep();
  var p=window.__SIMTEST.state().pending;
  out.checks.win = !!(p&&p.type==='transfer'&&p.renewOnly===true&&p.offers.length===0&&p.canStay===true&&p.canDecline===true);

  /* 3) 续约 -> contractLeft 更新 */
  var before=window.__SIMTEST.state().contractLeft;
  window.SIM.choose('stay');
  out.checks.stay = window.__SIMTEST.state().contractLeft>before;

  /* 4) 暂不续约 -> 清窗 */
  au=mk(3); au.flags._contractDue=true; window.SIM.nextStep();
  window.SIM.choose('decline');
  var pd=window.__SIMTEST.state().pending;
  out.checks.decline = !(pd&&pd.renewOnly===true);

  /* 5) UI 文案 */
  au=mk(3); au.flags._contractDue=true; window.SIM.nextStep();
  window.__SIMTEST.render();
  var html='';for(var k in window.__ELS)html+=String(window.__ELS[k].innerHTML||'');
  out.checks.ui = html.indexOf('续约谈判')>=0 && html.indexOf('暂不续约')>=0;

  /* 6) lockAbroad:0 解锁 */
  au=mk(3); au.lockAbroad=5; window.SIM.applyResult({'lockAbroad':0});
  out.checks.clearLock = window.__SIMTEST.state().lockAbroad===0;

  /* 7) 老将邀请不绕过锁洋 */
  au=mk(3); au.lockAbroad=5; au.flags._vetInviteTeam='rma';
  window.SIM.makeTransfer(false,false);
  var lgs=offerLeagues();
  out.checks.vetLock = lgs.indexOf('liga')<0 && lgs.indexOf('csl')>=0;

  /* 8) 锁洋挡得住"强制离队"（不再 ignoreLock） */
  au=mk(3); au.lockAbroad=5; au.flags._forceLeave=true;
  window.SIM.makeTransfer(false,true);
  var lgs8=offerLeagues();
  out.checks.lockForce = lgs8.indexOf('csl')>=0 && lgs8.filter(function(x){return x!=='csl';}).length===0;

  /* 9) 续约窗可"递交转会申请" -> 立刻开强制转会窗 */
  au=mk(3); au.flags._contractDue=true; window.SIM.nextStep();
  window.SIM.choose('leave');
  var p9=window.__SIMTEST.state().pending;
  out.checks.renewLeave = !!(p9&&p9.type==='transfer'&&p9.mustLeave===true);

  /* 10) pool options 走侧表：不改写 EVENTS，且重复取稳定 */
  var o1=window.SIM.evOpts('love_first');
  var ev10=null;window.EVENTS.forEach(function(e){if(e['id']==='love_first')ev10=e;});
  out.checks.evOpts = !!(o1&&o1.length>0) && !(ev10&&ev10['options']) &&
    JSON.stringify(o1)===JSON.stringify(window.SIM.evOpts('love_first'));
  out.checks.optHint = !!String(window.SIM.optHint(ev10,0)||'').length;

  /* 11) contract 直接落笔（第一份职业合同：5年/低薪/高违约金） */
  au=mk(3); window.SIM.applyResult({'contract':{'years':5,'wage':0.5,'lock':4}});
  out.checks.contract = au.contractLeft===5 && au.wageMult===0.5 && au.lockAbroad===4 && au.flags._keepContract===true;

  /* 12) 默认续约：年薪不低于现合同 */
  au=mk(3); au.wageMult=1.15; au.flags._contractDue=true; window.SIM.nextStep();
  var t12=au._offerTerms['cn-sh'];
  out.checks.renewFloor = !!t12 && t12.mult>=1.15;

  /* 13) 事件指定续约待遇：老将 1 年砍六成 */
  au=mk(3); au.wageMult=1.0; window.SIM.applyResult({'openContract':{'wage':0.4,'years':1}});
  window.SIM.nextStep();
  var t13=au._offerTerms['cn-sh'];
  out.checks.renewCut = !!t13 && t13.years===1 && t13.mult<0.5;

  /* 14) 事件指定续约待遇：天价 5 年翻倍 */
  au=mk(3); au.wageMult=1.0; window.SIM.applyResult({'openContract':{'wage':3,'years':5}});
  window.SIM.nextStep();
  var t14=au._offerTerms['cn-sh'];
  out.checks.renewRaise = !!t14 && t14.years===5 && t14.mult>2.5;

  /* 15) 数字形式的续约系数 */
  au=mk(3); au.wageMult=1.0; window.SIM.applyResult({'openContract':0.5});
  window.SIM.nextStep();
  var t15=au._offerTerms['cn-sh'];
  out.checks.renewNum = !!t15 && t15.mult<0.6;
}catch(e){ out.err=String(e).slice(0,200); }
return JSON.stringify(out);
})()
""".replace('%NEW_PLAYER%', harness.NEW_PLAYER)

KEYS = ('flag', 'win', 'stay', 'decline', 'ui', 'clearLock', 'vetLock',
        'lockForce', 'renewLeave', 'evOpts', 'optHint', 'contract',
        'renewFloor', 'renewCut', 'renewRaise', 'renewNum')


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['err']:
        raise harness.Fail(r['err'])
    c = r['checks']
    for k in KEYS:
        if not c.get(k):
            raise harness.Fail('check failed: %s (%r)' % (k, c))
    print('PASS transfer_renew (%s)' % ' '.join('%s=1' % k for k in KEYS))


if __name__ == '__main__':
    harness.main(run)
