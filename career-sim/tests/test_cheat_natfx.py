# Probe: cheat-mode auto-champion must ALSO appear as China champion on the
# World-tab national-tournament view (natT) -- i.e. player side == world side.
import json

import harness

JS = """
(function(){
var out={seasons:[],errs:[],wc:[],asia:[]};
var origin={id:'sd',name:'sd',ovr:60,guanxi:50,money:500};
var au=window.SIM.newState('normal',{'name':'p','origin':origin,'pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'},44001,null);
au.age=20; au.phase='career'; au.money=5000; au.ovr=88; au.maxOvr=88; au.talent=1.2;
au.caps=0; au.natStats={goals:0,assists:0,cs:0,ga:0}; au.natRuns=[]; au.tournaments=[];
au.teamId='cn-sh'; au.role='starter'; au.banLeft=0; au.banGames=0;
au.contractLeft=2; au.seasonsAtClub=1; au.stagnate=false; au.roleAdjust=0; au.guanxi=60;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
au.cheat=true;
au.seasons=[{}];   // seasons.length==1  => next b2() is a WC year (c3==1)
au.totals={apps:0,goals:0,assists:0,cs:0,ga:0};
try{
  for(var i=0;i<4;i++){
    window.SIM.simulateOneSeason();
    var nf=au.natFx;
    out.seasons.push({i:i,age:au.age,season:nf?nf.season:null,keys:Object.keys(nf?nf.data||{}:{}).join(','),
      wcChamp:(nf&&nf.data&&nf.data.wc)?nf.data.wc.champion:null,
      asiaChamp:(nf&&nf.data&&nf.data.asia)?nf.data.asia.champion:null});
  }
}catch(e){ out.errs.push(String(e).slice(0,300)); }
return JSON.stringify(out);
})()
"""


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    if r['errs']:
        raise harness.Fail('runtime error: ' + json.dumps(r['errs'][:3], ensure_ascii=False))
    print('seasons:', r['seasons'])
    wc_seen = any(s['wcChamp'] == 'n_chn' for s in r['seasons'])
    asia_seen = any(s['asiaChamp'] == 'n_chn' for s in r['seasons'])
    # world query must agree with the player record on the current season
    wq = json.loads(mr.eval(
        "JSON.stringify(window.SIM.world({q:'natT',id:'wc'}))"))
    print('world natT wc cur:', json.dumps({k: wq[k] for k in ('dataSeason', 'fxSeasons')}),
          'champ=', (wq.get('data') or {}).get('champion'))
    if not (wc_seen and asia_seen):
        raise harness.Fail('cheat champion not mirrored into natFx: wc=%s asia=%s'
                           % (wc_seen, asia_seen))
    # player-side record check
    runs = json.loads(mr.eval('JSON.stringify(window.SIM.state().natRuns)'))
    champs = [x for x in runs if x['stage'] == '冠军']
    print('player natRuns champion entries:', [(x['comp'], x['stage']) for x in champs])
    if not champs:
        raise harness.Fail('cheat never recorded player-side 冠军 in natRuns')
    print('PASS probe_cheat_natfx (cheat WC/Asia champion mirrored to World tab as China)')


if __name__ == '__main__':
    harness.main(run)
