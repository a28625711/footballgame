# -*- coding: utf-8 -*-
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import harness

JS = r'''
var au=window.__SIMTEST.start('normal',{name:'p',origin:'sd',pos:'ST',nation:'cn',talent:1.1,number:9,foot:'r'},99);
au.phase='career'; au.age=22; au.ovr=82; au.maxOvr=90; au.money=5000;
au.teamId='rma'; au.role='starter'; au.contractLeft=9; au.seasonsAtClub=2;
au.flags={}; au.usedEvents={}; au.forceQ=[]; au.pending=null;
au.staff={'rehab':{'y':1,'tier':2}};
window.SIM.attach(au);
window.__LOG=[];
function snap(tag){window.__LOG.push(tag+': '+JSON.stringify(au.staff)+' money='+au.money);}
snap('start');
function drain(){var g=0;while(au.pending&&g++<60){var p=au.pending;
snap('pending:'+p.type);
if(p.type==='random'){if(p.result){window.__SIMTEST.cont();}else{window.SIM.choose(0);}}
else if(p.type==='report'){window.SIM.nextStep();}
else if(p.type==='transfer'){window.SIM.choose('stay');}
else if(p.type==='staff'){window.SIM.choose('skip');}
else window.SIM.nextStep();}}
window.SIM.doPeriod(); snap('afterPeriod');
drain(); snap('afterDrain');
'''

def main():
    mr = harness.new_engine()
    mr.eval(JS)
    print(mr.eval('window.__LOG.join(String.fromCharCode(10))'))

main()
