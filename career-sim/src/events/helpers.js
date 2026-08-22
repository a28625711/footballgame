// helper functions d/f/g/h and EV_ROLL (shared by all event modules)
'use strict';
var b=null,c=null;
function d(p,q){var s=p()<q;
return null!==c&&(s=c),b={'p':q,'ok':s},s;
}
function f(p,q,s,v){
for(var w=p,x=0x0;
x<q["length"];
x++)w+=(q[x][0x0]-q[x][0x1])*q[x][0x2];
return Math["max"](null==s?0.1:s,Math["min"](null==v?0.9:v,w));
}
function g(p,q,s){var v=Math["round"](0x64*p);
return v+'%\x20'+q+" / "+(0x64-v)+'%\x20'+s;
}
function h(p,q){
return p&&q[p["posGroup"]]||q["other"];
}
window["EV_ROLL"]={'reset':function(){b=null;
},'last':function(){return b;
},'force':function(p){c=!0x0===p||!0x1===p?p:null;
}};
function k(p){
return f(0.5,[[p["ovr"],0x3e,0.008]],0.38,0.82);
}
function m(p,q){
return d(p,null==q?0.5:q)?{'fame':0x16,'ovr':0x2,'mult':{'cup':3.5,'cont':0x2},'text':"球进了。你跑向角"+"旗区的时候什么都"+"听不见，只看见很"+"多张嘴在动。"}:{'fame':-0xf,
'ovr':-0x2,'text':"门将扑对了方向。"+"你在场地中央站了"+"很久，队友过来拍"+"你，你没什么反应"+'。'};
}
