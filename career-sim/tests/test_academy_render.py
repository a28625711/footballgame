# Regression for the academy-decision freeze (render threw "Cannot read
# property 'rep' of null"): a 15-year-old in youth phase has no curTeam, and
# the academy offer screen calls offerBrief -> be() -> aI(null).
#
# Two-stage design per trial:
#   stage 1 (JS): drive youth career until the academy pending appears and
#                 render it; exceptions are caught JS-side and reported.
#   check  (PY): inspect the captured DOM innerHTML - every offer must have
#                produced a button carrying its club name.
#   stage 2 (JS): perform the choice (join first offer / stay in youth) and
#                 report resulting state for Python-side assertions.
import json

import harness

TRIALS = 20


def stage1_js(seed):
    return (
        "(function(){\n"
        "var au=window.__SIMTEST.start('normal'," + harness.NEW_PLAYER + "," + str(seed) + ");\n"
        "au.age=15; au.ovr=55; au.maxOvr=55; au.money=100; au.phase='youth';\n"
        "au.youthTeamId='cn-sh'; au.roleAdjust=0; au.guanxi=50;\n"
        "au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;\n"
        "var g=0;\n"
        "while(g++<300 && au.phase!=='summary' && au.age<18){\n"
        "  var p=au.pending;\n"
        "  if(!p){ window.SIM.nextStep(); continue; }\n"
        "  if(p.type==='academy'){\n"
        "    try{ String(window.__SIMTEST.render()); }\n"
        "    catch(e){ return JSON.stringify({fail:'render threw', msg:String(e)}); }\n"
        "    return JSON.stringify({ok:true, offers:p.offers, canStayYouth:!!p.canStayYouth,\n"
        "      age:au.age, youthTeamId:au.youthTeamId});\n"
        "  }\n"
        "  if(p.type==='random'){\n"
        "    try{\n"
        "      if(p.result){ window.__SIMTEST.cont(); }\n"
        "      else{ window.__SIMTEST.option(0); }\n"
        "    }catch(e){ return JSON.stringify({fail:'random option threw', msg:String(e)}); }\n"
        "    continue;\n"
        "  }\n"
        "  try{ window.SIM.nextStep(); }\n"
        "  catch(e){ return JSON.stringify({fail:'nextStep threw', type:(p||{}).type, msg:String(e)}); }\n"
        "}\n"
        "return JSON.stringify({fail:'never reached academy', age:au.age, phase:au.phase});\n"
        "})()"
    )


def offer_names_js(offers):
    return (
        "JSON.stringify(" + json.dumps(list(offers)) +
        ".map(function(id){var t=window.SIM.teamById(id);return t?t.name:null;}))"
    )


def stage2_js(pick):
    lit = json.dumps(pick)
    return (
        "(function(){\n"
        "var au=window.__SIMTEST.state();\n"
        "if(!au || !au.pending || au.pending.type!=='academy')"
        " return JSON.stringify({fail:'stage2: no academy pending'});\n"
        + ("var expOffer=au.pending.offers[" + str(pick) + "];\n" if pick != 'youth' else '') +
        "window.SIM.choose(" + lit + ");\n"
        "if(" + ('true' if pick == 'youth' else 'false') + "){\n"
        "  if(au.phase!=='youth') return JSON.stringify({fail:'stay: phase changed', phase:au.phase});\n"
        "  if(au.flags._gradCd===undefined || au.flags._gradCd<1)"
        " return JSON.stringify({fail:'stay: gradCd flag missing', v:au.flags._gradCd});\n"
        "  return JSON.stringify({ok:true, mode:'stayed'});\n"
        "}\n"
        "if(au.phase!=='career') return JSON.stringify({fail:'join: phase not career', phase:au.phase});\n"
        "if(au.teamId!==expOffer)"
        " return JSON.stringify({fail:'join: wrong teamId', teamId:au.teamId, want:expOffer});\n"
        "var yr=au.contractLeft;\n"
        "if(!(yr>=1&&yr<=5)) return JSON.stringify({fail:'join: contractLeft out of range', years:yr});\n"
        "return JSON.stringify({ok:true, mode:'joined', years:yr});\n"
        "})()"
    )


def run():
    joined = stayed = 0
    failures = []
    for seed in range(700, 700 + TRIALS):
        mr = harness.new_engine()
        s1 = json.loads(mr.eval(stage1_js(seed)))
        if not s1.get('ok'):
            failures.append({'seed': seed, 'stage': 1, **s1, 'logs': harness.logs(mr)[-300:]})
            continue
        names = json.loads(mr.eval(offer_names_js(s1['offers'])))
        html = harness.rendered_html(mr)
        for oid, nm in zip(s1['offers'], names):
            if not nm:
                failures.append({'seed': seed, 'stage': 'check', 'fail': 'offer unresolvable', 'id': oid})
            elif nm not in html:
                failures.append({'seed': seed, 'stage': 'check', 'fail': 'club name missing from html',
                                 'id': oid, 'name': nm})
        if failures:
            continue
        want_stay = seed % 2 == 1 and s1['canStayYouth']
        pick = 'youth' if want_stay else 0
        s2 = json.loads(mr.eval(stage2_js(pick)))
        if not s2.get('ok'):
            failures.append({'seed': seed, 'stage': 2, 'pick': pick, **s2})
            continue
        joined += s2['mode'] == 'joined'
        stayed += s2['mode'] == 'stayed'
    if failures:
        raise harness.Fail(json.dumps(failures[:3], ensure_ascii=False))
    if joined < TRIALS * 0.5 or stayed < 1:
        raise harness.Fail('coverage too thin: joined=%d stayed=%d of %d'
                           % (joined, stayed, TRIALS))
    print('PASS academy_render x%d (joined=%d stayed=%d)' % (TRIALS, joined, stayed))


if __name__ == '__main__':
    harness.main(run)
