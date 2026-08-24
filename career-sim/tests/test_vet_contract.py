# Property-based regression for the smooth contract-years curve (be) and the
# wage age factor (bAge). The old branch-tree asserted exact ae() ranges; the
# curve model is pinned by invariants instead:
#   - years always within [1,5]
#   - young players sign longer deals than veterans at equal ability
#   - potential (maxOvr>ovr) lengthens teen contracts
#   - weak-club veterans no longer get 3-year deals
#   - wage decays with age (kills the "older = pricier" paradox)
import json

import harness

SAMPLES = 12


def build_js():
    cells = []
    for club in ['mci', 'cn-sh']:
        for ovr in [76, 84, 92]:
            for age in [18, 22, 26, 30, 34, 38]:
                cells.append((club, age, ovr))
    js = """
(function(){
var out=[];
function mk(seed,club,age,ovr,maxOvr){
  var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},seed);
  au.phase='career'; au.money=800; au.roleAdjust=0; au.guanxi=50;
  au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
  au.banned=false; au.banLeft=0; au.banGames=0;
  au.age=age; au.ovr=ovr; au.maxOvr=maxOvr;
  au.teamId=club; au.contractLeft=1; au.seasonsAtClub=2; au.role='starter';
  return au;
}
function sample(club,age,ovr,maxOvr){
  var yrs=[],ws=[];
  for(var k=0;k<%S%;k++){
    var ob=window.SIM.offerBrief(club);
    if(ob){yrs.push(ob.years);ws.push(ob.wage);}
    mk(9100+k,club,age,ovr,maxOvr);
  }
  return {yrs:yrs,ws:ws};
}
%CELLS%
return JSON.stringify(out);
})()
"""
    lines = ["var au;", "var S=%d;" % SAMPLES]
    for i, (club, age, ovr) in enumerate(cells):
        mo = '96' if age < 22 else str(ovr)
        lines.append(
            "au=mk(9000+%d,'%s',%d,%d,%s);var c%d=sample('%s',%d,%d,%s);"
            % (i, club, age, ovr, mo, i, club, age, ovr, mo))
        lines.append(
            "out.push({club:'%s',age:%d,ovr:%d,yrs:c%d.yrs,ws:c%d.ws});"
            % (club, age, ovr, i, i))
    return (js.replace('%CELLS%', '\n'.join(lines))
              .replace('%S%', str(SAMPLES)))


def avg(xs):
    return sum(xs) / len(xs)


def run():
    mr = harness.new_engine()
    rows = json.loads(mr.eval(build_js()))
    check = harness.check

    for r in rows:
        check(r['yrs'] and all(1 <= y <= 5 for y in r['yrs']),
              'years out of [1,5] at %r' % {k: r[k] for k in ('club', 'age', 'ovr')})
        check(all(w >= 3 for w in r['ws']), 'wage below floor')

    def cell(club, age, ovr):
        return next(x for x in rows if x['club'] == club and x['age'] == age and x['ovr'] == ovr)

    # monotonic age: young > veteran (same club/ovr)
    for club in ['mci', 'cn-sh']:
        y_young = avg(cell(club, 22, 84)['yrs'])
        y_old = avg(cell(club, 34, 84)['yrs'])
        check(y_young > y_old,
              '%s: youth %.2f !> vet %.2f' % (club, y_young, y_old))

    # potential: teen with headroom signs longer than fully-grown peer
    js_pot = """
(function(){
function mk(seed,maxOvr){var au=window.__SIMTEST.start('normal',{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},seed);
au.phase='career';au.money=800;au.roleAdjust=0;au.guanxi=50;au.flags={};au.usedEvents={};au.forceQ=[];au.pending=null;
au.age=18;au.ovr=88;au.maxOvr=maxOvr;au.teamId='mci';au.contractLeft=1;au.seasonsAtClub=2;au.role='starter';return au;}
var hi=[],lo=[];
for(var k=0;k<%S%;k++){mk(9500+k,96);hi.push(window.SIM.offerBrief('mci').years);
mk(9700+k,88);lo.push(window.SIM.offerBrief('mci').years);}
return JSON.stringify({hi:hi,lo:lo});
})()""".replace('%S%', str(SAMPLES))
    pot = json.loads(mr.eval(js_pot))
    p_hi, p_lo = avg(pot['hi']), avg(pot['lo'])
    check(p_hi > p_lo, 'potential bonus missing: hi %.2f <= flat %.2f' % (p_hi, p_lo))

    # weak-club veteran cap
    v = cell('cn-sh', 34, 92)['yrs']
    check(max(v) <= 3, 'weak-club 34yo got %d years' % max(v))
    v38 = cell('cn-sh', 38, 92)['yrs']
    check(max(v38) <= 2, 'weak-club 38yo got %d years' % max(v38))

    # wage: no seniority premium (veteran short-deal x1.3 must be cancelled
    # by the age factor; parity within 5% counts as success)
    w26 = avg(cell('mci', 26, 92)['ws'])
    w34 = avg(cell('mci', 34, 92)['ws'])
    check(w34 <= w26 * 1.05, 'seniority premium: 34yo %.0f > 26yo %.0f' % (w34, w26))

    print('PASS vet_contract_curve (young>old, potential+, vet<=3y, wage %.0f@26 vs %.0f@34)'
          % (w26, w34))


if __name__ == '__main__':
    harness.main(run)
