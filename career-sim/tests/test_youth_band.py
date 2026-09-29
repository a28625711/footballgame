# -*- coding: utf-8 -*-
# 开局青训营档次（A/B/C）+ 心仪球队只对青训生效（D）回归：
#  A) loR 由“潜力(天赋)”决定（天赋在选营这一步就掷定 _rollPot）
#  B) pickBand 上探到 loR+2 → 豪门(rep4)/顶级豪门(rep5) 可抽到
#  C) 高潜力(QQ>=0.68) 保底一支 rep>=4 的国外青训营
#  D) 心仪球队不再被强塞进转会窗（只在青训营选择时保证出现）
import json

import harness

JS = r'''
(function(){
var P={name:'lg',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:7,foot:'r'};
var teams={}; window.DATA.TEAMS.forEach(function(t){teams[t.id]=t;});
var repHist={},loRset={},maxRep=0,n=0,hiTot=0,hiElite=0,loTot=0,loElite=0,dreamTot=0,dreamIn=0;
for(var s=1;s<=400;s++){
  var st;
  if(s<=320){ st=window.__SIMTEST.start('normal',P,s); }
  else { st=window.__SIMTEST.start('normal',Object.assign({},P,{dreamId:'psg'}),s); }
  try{ if(!st.pending) window.SIM.nextStep(); }catch(e){}
  var p=st.pending;
  if(!(p&&p.type==='youth_path'))continue;
  n++;
  var t=st.talent, nTv=Math.max(0,Math.min(1,(t-0.7)/0.78)), loR=nTv<0.40?1:(nTv<0.68?2:3);
  loRset[loR]=1;
  var reps=p.offers.map(function(id){return (teams[id]||{}).rep;});
  var elite=reps.filter(function(r){return r>=4;}).length;
  reps.forEach(function(r){ repHist[r]=(repHist[r]||0)+1; if(r>maxRep)maxRep=r; });
  if(s<=320){ if(t>=1.23){hiTot++; if(elite)hiElite++;} if(t<1.0){loTot++; if(elite)loElite++;} }
  if(s>320){ dreamTot++; if(p.offers.indexOf('psg')>=0)dreamIn++; }
}
/* D: 转会窗不再强制塞心仪球队 */
function mk(sd){var q=window.__SIMTEST.start('normal',P,sd);
 q.phase='career';q.teamId='mci';q.role='star';q.ovr=86;q.maxOvr=95;q.age=24;q.money=1000;
 q.seasonsAtClub=2;q.roleAdjust=0;q.guanxi=60;q.youthTeamId=null;q.flags={};q.usedEvents={};q.forceQ=[];q.pending=null;
 window.SIM.attach(q); return q;}
var q=mk(1234),cnt={};
for(var i=0;i<300;i++){var o=window.SIM.pickOffers(5);for(var z=0;z<o.length;z++)cnt[o[z].id]=(cnt[o[z].id]||0)+1;}
var best=null,bn=-1;for(var k in cnt)if(cnt[k]>bn){bn=cnt[k];best=k;}
window.SIM.attach(mk(1234)); q.dreamId=best;
var hit=0,N=700; for(var j=0;j<N;j++){var o2=window.SIM.pickOffers(5);for(var z2=0;z2<o2.length;z2++)if(o2[z2].id===best){hit++;break;}}
return JSON.stringify({n:n,repHist:repHist,maxRep:maxRep,loRcount:Object.keys(loRset).length,
  hiTot:hiTot,hiElite:hiElite,loTot:loTot,loElite:loElite,dreamTot:dreamTot,dreamIn:dreamIn,
  trRate:+(hit/N).toFixed(3)});
})()
'''


def run():
    mr = harness.new_engine()
    r = json.loads(mr.eval(JS))
    harness.check(r['maxRep'] >= 4, 'no 豪门(rep>=4) ever offered: %s' % r['repHist'])
    harness.check((r['repHist'].get('5') or 0) > 0, 'no 顶级豪门(rep5) ever offered')
    harness.check(r['loRcount'] >= 2, 'loR never varies (still fixed band)')
    harness.check(r['hiTot'] > 0 and r['hiElite'] == r['hiTot'],
                  'high-talent not guaranteed an elite academy (%d/%d)' % (r['hiElite'], r['hiTot']))
    harness.check(r['loElite'] == 0, 'low-talent got elite academy (%d/%d)' % (r['loElite'], r['loTot']))
    harness.check(r['dreamTot'] > 0 and r['dreamIn'] == r['dreamTot'],
                  'dream team missing from youth offers (%d/%d)' % (r['dreamIn'], r['dreamTot']))
    harness.check(r['trRate'] < 0.9, 'dream still forced in transfer window (rate=%.2f)' % r['trRate'])
    print('PASS youth_band (repHist=%s; highTalent elite %d/%d; dream youth %d/%d; transfer rate=%.2f)'
          % (r['repHist'], r['hiElite'], r['hiTot'], r['dreamIn'], r['dreamTot'], r['trRate']))


if __name__ == '__main__':
    harness.main(run)
