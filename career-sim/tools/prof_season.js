// 季节结算 CPU 剖析：与 tests/harness.py 相同的 mock 环境 + 一个完整生涯，
// 跑 N 个赛季供 node --cpu-prof 分析每季 100ms 都花在哪。

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..');
const ENV = `
var _mk=function(){return {style:{},classList:{add:function(){},remove:function(){},toggle:function(){},contains:function(){return false}},innerHTML:'',textContent:'',value:'',checked:false,appendChild:function(){},setAttribute:function(){},getAttribute:function(){return null},querySelector:function(){return null},querySelectorAll:function(){return []},closest:function(){return null},addEventListener:function(){},getBoundingClientRect:function(){return {top:0,height:0}}};};
var window={scrollTo:function(){},scrollBy:function(){},__L:[],__ELS:{}};
var document={getElementById:function(id){var e=window.__ELS[id];if(!e){e=_mk();e.id=id;window.__ELS[id]=e;}return e;},querySelector:function(){return _mk();},querySelectorAll:function(){return [];},createElement:function(){return _mk();},addEventListener:function(){},body:{appendChild:function(){},classList:{add:function(){},toggle:function(){}}},documentElement:{style:{}}};
var localStorage={getItem:function(){return null;},setItem:function(){},removeItem:function(){}};
var navigator={userAgent:'test',canShare:false}; var location={href:''}; var screen={}; var Image=function(){};
var console={log:function(m){window.__L.push(String(m).slice(0,250))},warn:function(){}};
var matchMedia=function(){return {matches:false};}; var requestAnimationFrame=function(f){return 0;};
var confirm=function(){return true;}; var alert=function(){};
`;
eval(ENV);

for (const f of ['data.js', 'events.js', 'supporters.js', 'crests.js', 'qr.js', 'natdata.js', 'sim.js', 'game.js']) {
  const dir = f === 'events.js' ? 'build' : 'src';
  eval(fs.readFileSync(path.join(BASE, dir, f), 'utf8'));
}

(function () {
  const au = window.__SIMTEST.start('normal', { name: 'p', origin: 'sd', pos: 'ST', nation: 'cn', talent: 1.1, number: 9, foot: 'r' }, 4242);
  au.ovr = 82; au.maxOvr = 92; au.money = 2000; au.age = 22; au.phase = 'career';
  au.teamId = 'mci'; au.role = 'starter'; au.contractLeft = 15; au.seasonsAtClub = 2;
  au.roleAdjust = 0; au.guanxi = 50; au.youthTeamId = null;
  au.flags = {}; au.usedEvents = {}; au.forceQ = []; au.pending = null;
  const t0 = Date.now();
  let seasons = 0;
  for (let yr = 0; yr < 12 && au.phase === 'career'; yr++) {
    const s0 = au.seasons.length;
    try { window.SIM.doPeriod(); } catch (e) { console.log('ERR ' + e); break; }
    let guard = 0;
    while (au.pending && guard++ < 25) {
      const p = au.pending;
      try {
        if (p.type === 'bigmatch') { if (p.result) { window.__SIMTEST.cont(); continue; } window.SIM.choose('push'); }
        else if (p.type === 'report') { window.SIM.nextStep(); }
        else if (p.type === 'random') { if (p.result) { window.__SIMTEST.cont(); } else { window.SIM.choose(0); } }
        else if (p.type === 'staff') { window.SIM.choose('skip'); }
        else if (p.type === 'transfer') { window.SIM.choose('stay'); }
        else { window.SIM.nextStep(); }
      } catch (e) { try { window.SIM.nextStep(); } catch (e2) { } break; }
    }
    if (au.seasons.length > s0) seasons++;
  }
  console.log('seasons=' + seasons + ' ms=' + (Date.now() - t0) + ' msPerSeason=' + ((Date.now() - t0) / Math.max(1, seasons)).toFixed(1));
})();
