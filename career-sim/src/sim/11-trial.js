// ---- part:02 | 报名试训（青训营选择） ----

/* ── 报名试训（可触发事件）───────────────────────────────────────
   点报名：扣 18 万报名费(不退)、每年限一次、挑两个比当前营更高档的青训营，
   挂 random pending；当前事件结算后由 bk() 弹出，二选一 → 轮盘 → 结果。
   球队移动/留洋学费放 aF(commit)，apply 只做纯判定，避免作弊模式双结算。 */
function _wPickTrial(_list,_ex){
var _wS=0x0,_i,_c=[];
for(_i=0x0;_i<_list["length"];_i++){if(_ex["indexOf"](_list[_i]['id'])>=0x0)continue;_c.push(_list[_i]);_wS+=(_list[_i]["rep"]||0x1);}
if(_wS<=0x0)return null;
var _r=ad()*_wS;
for(_i=0x0;_i<_c["length"];_i++){_r-=(_c[_i]["rep"]||0x1);if(_r<0x0)return _c[_i];}
return _c[_c["length"]-0x1];
}
function _trialOffers(){
var _cur=bg(),_curRep=_cur?_cur["rep"]:1,_pool=[],_pi,_pt,_BIG5={'epl':1,'liga':1,'seri':1,'bund':1,'l1':1};
for(_pi=0x0;_pi<a0["TEAMS"]["length"];_pi++){_pt=a0["TEAMS"][_pi];
if(_pt['id']===(a2["youthTeamId"]||''))continue;
if(_BIG5[aq(_pt)['id']]&&_pt["rep"]>_curRep&&a2["money"]>=_youthFee(_pt["rep"]))_pool.push(_pt);
}
if(!_pool["length"]){
for(_pi=0x0;_pi<a0["TEAMS"]["length"];_pi++){_pt=a0["TEAMS"][_pi];
if(_pt['id']===(a2["youthTeamId"]||''))continue;
if(aq(_pt)['cn']&&_pt["rep"]>_curRep&&_pt["rep"]<=_curRep+1)_pool.push(_pt);
}
for(_pi=0x0;_pi<a0["TEAMS"]["length"];_pi++){_pt=a0["TEAMS"][_pi];
if(_pt['id']===(a2["youthTeamId"]||''))continue;
if(!aq(_pt)['cn']&&_pt["rep"]>=0x3&&a2["money"]>=_youthFee(_pt["rep"]))_pool.push(_pt);
}
}
if(!_pool["length"])return[];
var _out=[],_a=_wPickTrial(_pool,_out);
if(!_a)return[];
_out.push(_a['id']);
var _b=_wPickTrial(_pool["filter"](function(t){return t["rep"]!==_a["rep"];}),_out)||_wPickTrial(_pool,_out);
_b&&_out.push(_b['id']);
return _out;
}
function _trialDifficulty(_team){
var _cur=bg(),_curRep=_cur?_cur["rep"]:1;
return ac(_yTrialP()-0.09*((_team["rep"]||0x1)-_curRep),0.05,0.8);
}
function _trialSignup(){
if("youth"!==a2["phase"]||!a2["youthTea"+"mId"])return{'ok':!0x1,'txt':'现在不是青训期'};
if(a2["flags"]["_trialAge"]===a2["age"])return{'ok':!0x1,'txt':'今年已经报过名了'};
if(a2["money"]<0x12)return{'ok':!0x1,'txt':'家里拿不出 18 万报名费'};
var _offers=_trialOffers();
if(!_offers["length"])return{'ok':!0x1,'txt':'暂时没有更高级别的青训营愿意接收'};
a2["money"]-=0x12;
a2["flags"]["_trialAge"]=a2["age"];
if(a2["pending"])a2["_trialQueued"]={'offers':_offers};
else a2["pending"]={'type':"random",'eventId':"__trial__",'offers':_offers};
return{'ok':!0x0,'txt':'报名成功，试训安排上了'};
}
function _trialEvent(_offers){
var _opts=[],_i;
for(_i=0x0;_i<_offers["length"];_i++){
(function(_tid){
var _t=aj(_tid);if(!_t)return;
_opts.push({'label':_t["name"],'team':_t,'lead':'录取 '+Math["round"](0x64*_trialDifficulty(_t))+'%',
'p':function(){return _trialDifficulty(_t);},
'hint':function(p,q){var v=Math["round"](0x64*(q||0x0));return v+'%\x20录取 / '+(0x64-v)+'%\x20落选';},
'apply':function(p,q,s){return _trialResolve(_tid,s,q);}});
})(_offers[_i]);
}
_opts.push({'label':"不去了",'hint':"18 万报名费不退",
'apply':function(){return{'text':"你把名额让了出去。那 18 万报名费，就当交了个学费。"};}});
return{'id':"__trial__",'title':"报名试训",'icon':'🎫',
'desc':"报名费交了，对方教练让你过去练一堂课。一次分组对抗，一场教学赛，够不够格当天就有数。",
'options':_opts};
}
function _pendingEvent(){
var _p=a2["pending"];
if(!_p||_p["eventId"]!=="__trial__")return null;
return _trialEvent(_p["offers"]||[]);
}
function _trialResolve(_tid,_prob,_q){
var _t=aj(_tid),_p=null!=_prob?_prob:_trialDifficulty(_t||{'rep':1}),_ok=null;
var _forced=window["EV_ROLL"]&&window["EV_ROLL"]["forced"]?window["EV_ROLL"]["forced"]():null;
if(null!=_forced)_ok=_forced;else _ok=_q()<_p;
window["EV_ROLL"]&&window["EV_ROLL"]["set"]&&window["EV_ROLL"]["set"](_p,_ok);
if(_t&&_ok)return{'text':"试训通过，进了 "+_t["name"]+" 的青训营"+(!aq(_t)['cn']?"，家里把学费也凑上了":''),'up':!0x0,'_trialTo':_tid};
return{'text':"试训没成。对方教练客客气气把你送出门，说下年再来。",'up':!0x1};
}
var a9={'ln':["cn-dl","cn-cc","cn-bj","cn-tj","cn-shh","cn-sd"],



'sd':["cn-sd","cn-zj","cn-hn","cn-bj","cn-qdh","cn-qdw"],
'sh':["cn-sh","cn-shh","cn-zj","cn-hn","cn-qdh","cn-qdw"],'bj':["cn-bj","cn-tj","cn-hn","cn-sd","cn-dl","cn-shh"],



'gd':["cn-sz",
"cn-mz","cn-cd","cn-wh","cn-yn","cn-cc"],'hn':["cn-hn","cn-bj","cn-sd","cn-zj","cn-cc","cn-tj"],'heb':["cn-tj","cn-bj","cn-cc",
"cn-sd","cn-hn","cn-dl"],



'hun':["cn-cd","cn-wh","cn-sz","cn-hn","cn-zj","cn-mz"],'xj':["cn-cd","cn-yn","cn-sd","cn-bj","cn-wh",
"cn-hn"],'js':["cn-zj","cn-sh","cn-shh","cn-hn","cn-yn","cn-sd"],



'sc':["cn-cd","cn-wh","cn-yn","cn-hn","cn-sz","cn-zj"]},aa={'ln':["cn-dl"],
'sd':["cn-sd"],'sh':["cn-sh"],'bj':["cn-bj"],


'gd':["cn-sz"],
'hn':["cn-hn"],'heb':["cn-tj"],'hun':["cn-cd"],'xj':[],'js':["cn-zj"],
'sc':["cn-cd"]};