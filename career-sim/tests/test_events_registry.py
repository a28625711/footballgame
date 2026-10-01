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
function _iconClusters(s){
  var n=0,i=0;
  function cp(x){return s.codePointAt(x);}
  function adv(x){var c=cp(x);return x+((c>0xFFFF)?2:1);}
  function isRI(c){return c>=0x1F1E6&&c<=0x1F1FF;}
  function isBase(c){return (c>=0x1F300&&c<=0x1FAFF)||(c>=0x2600&&c<=0x27BF)||(c>=0x2B00&&c<=0x2BFF)||(c>=0x1F000&&c<=0x1F2FF);}
  while(i<s.length){
    var c=cp(i); if(c==null)break;
    var keycap=(c>=0x30&&c<=0x39)&&cp(i+1)===0xFE0F&&cp(i+2)===0x20E3;
    if(isRI(c)){ var j=adv(i); if(j<s.length&&isRI(cp(j)))j=adv(j); n++; i=j; continue; }
    if(isBase(c)||keycap){
      var j=adv(i);
      while(j<s.length){var d=cp(j); if(d===0xFE0F||d===0x20E3)j=adv(j); else break;}
      while(j<s.length&&cp(j)===0x200D){ j=adv(j); if(isBase(cp(j)))j=adv(j);
        while(j<s.length){var d2=cp(j); if(d2===0xFE0F||d2===0x20E3)j=adv(j); else break;} }
      n++; i=j; continue;
    }
    i=adv(i);
  }
  return n;
}
var E=window["EVENTS"];
if(!Array.isArray(E)) return JSON.stringify({fail:'EVENTS missing'});
var ids={},dups=[],noOpts=[],badWeight=[],stages={},multiIcon=[];
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
  if(e.icon&&_iconClusters(String(e.icon))>1) multiIcon.push(e.id+':'+e.icon);
}
return JSON.stringify({total:E.length,stages:stages,dups:dups,noOpts:noOpts,badWeight:badWeight,multiIcon:multiIcon});
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
    if r['multiIcon']:
        raise harness.Fail('events with more than one emoji in icon: %s' % r['multiIcon'][:5])
    if r['stages'].get('vet', 0) < 20:
        raise harness.Fail('vet-stage events thinned: %d' % r['stages'].get('vet', 0))
    if r['stages'].get('youth', 0) < 40:
        raise harness.Fail('youth-stage events thinned: %d' % r['stages'].get('youth', 0))
    print('PASS events_registry total=%d vet=%d youth=%d prime=%d kid=%d'
          % (r['total'], r['stages'].get('vet', 0), r['stages'].get('youth', 0),
             r['stages'].get('prime', 0), r['stages'].get('kid', 0)))


if __name__ == '__main__':
    harness.main(run)
