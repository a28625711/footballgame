# Runtime integrity of the EVENTS registry (window.EVENTS).
# Guards the event-pool expansions: total count, unique non-empty ids,
# every event resolvable to at least one option source (options/pool/single),
# positive weights. Catches truncated/duplicated/broken inserts that used to
# only surface as syntax errors or dead events in play.
import json

import harness


def run():
    mr = harness.new_engine()
    js = """
(function(){
var E=window["EVENTS"];
if(!Array.isArray(E)) return JSON.stringify({fail:'EVENTS missing'});
var ids={},dups=[],noOpts=[],badWeight=[],stages={};
for(var i=0;i<E.length;i++){
  var e=E[i];
  if(!e||typeof e.id!=='string'||!e.id) return JSON.stringify({fail:'event missing id', idx:i});
  if(ids[e.id]) dups.push(e.id);
  ids[e.id]=1;
  var st=e.stage||'(none)';
  stages[st]=(stages[st]||0)+1;
  var n=(e.options&&e.options.length)||0;
  if(!n && !(e.pool&&e.pool.length) && !e.single) noOpts.push(e.id);
  if(e.weight!==undefined && !(typeof e.weight==='number'&&e.weight>0)) badWeight.push(e.id);
}
return JSON.stringify({total:E.length,stages:stages,dups:dups,noOpts:noOpts,badWeight:badWeight});
})()
"""
    r = json.loads(mr.eval(js))
    if r.get('fail'):
        raise harness.Fail(r['fail'])
    if r['total'] < 320:
        raise harness.Fail('EVENTS shrank: %d (<320)' % r['total'])
    if r['dups']:
        raise harness.Fail('duplicate ids: %s' % r['dups'][:5])
    if r['noOpts']:
        raise harness.Fail('events without options/pool/single: %s' % r['noOpts'][:5])
    if r['badWeight']:
        raise harness.Fail('non-positive weights: %s' % r['badWeight'][:5])
    if r['stages'].get('vet', 0) < 20:
        raise harness.Fail('vet-stage events thinned: %d' % r['stages'].get('vet', 0))
    if r['stages'].get('youth', 0) < 40:
        raise harness.Fail('youth-stage events thinned: %d' % r['stages'].get('youth', 0))
    print('PASS events_registry total=%d vet=%d youth=%d prime=%d kid=%d'
          % (r['total'], r['stages'].get('vet', 0), r['stages'].get('youth', 0),
             r['stages'].get('prime', 0), r['stages'].get('kid', 0)))


if __name__ == '__main__':
    harness.main(run)
