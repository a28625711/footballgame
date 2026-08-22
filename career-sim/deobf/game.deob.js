(0x0,!(function(){'use strict';

var a0=window["DATA"],a1=window["EVENTS"],a2="gyrs_",a3="足一把-生涯模拟"+'器',a4="2026-08-"+'14',a5="zuyibaga"+"me.com",a6=window["SIM"],
a7=a6["SAVE_VER"],a8=a6["MODES"],a9=a6["ORIGINS"],aa=a6["NAT_SHOR"+'T'],ab=a6["isNear"],ac=a6["isHome"],ad=a6["clamp"],af=(a6["rnd"],
a6["rint"],a6["rpick"],a6["shuffle"],a6["rweight"],a6["hashStr"]),ag=a6["teamById"],ah=(a6["leagueBy"+'Id'],a6["posById"]),
ai=a6["curTeam"],aj=a6["curLeagu"+'e'],ak=(a6["inChina"],a6["originBy"+'Id']),al=a6["fmtMoney"],am=a6["fmtValue"],an=a6["valueOf"],
ao=(a6["snap"],a6["stageOf"],a6["interpol"+"ate"]),ap=(a6["pickRiva"+'l'],a6["pickEven"+'t'],a6["applyRes"+"ult"],a6["growthRa"+"nge"],
a6["computeR"+"ole"],a6["posRates"],a6["starPowe"+'r'],a6["national"+"Odds"],a6["natBest"]),aq=(a6["runPerio"+'d'],a6["addAward"],
a6["simulate"+"OneSeaso"+'n'],a6["doTransf"+'er'],a6["pickOffe"+'rs'],a6["offerOpt"+"ion"],a6["buildPro"+"file"]);
function ar(){
au&&("summary"===au["phase"]?bO():bN());
}function as(){
a6["nextStep"](),aA(),ar();
}var au=null,av=null;
function aw(bW){
return document["getEleme"+"ntById"](bW);
}function ax(bW){
return String(null==bW?'':bW)["replace"](/&/g,"&amp;")["replace"](/</g,"&lt;")["replace"](/>/g,"&gt;")["replace"](/"/g,"&quot;")["replace"](/'/g,
"&#39;");
}function ay(bW,bX){
try{var bY=localStorage["getItem"](a2+bW);
return null===bY?bX:JSON["parse"](bY);
}catch(bZ){return bX;
}}function az(bW,bX){
try{localStorage["setItem"](a2+bW,JSON["stringif"+'y'](bX));
}catch(bY){}}function aA(){
au&&az("save",au);
}function aB(){
return a6["normLega"+'cy'](ay("legacy",null));
}function aC(bW){
az("legacy",bW);
}function aD(){
try{localStorage["removeIt"+'em'](a2+"legacy");
}catch(bW){}}function aE(bW){
if(!bW)return null;
if(bW["legacy"])return a6["normLega"+'cy'](bW["legacy"]);
var bX=0x0;
return(bW["honours"]||[])["forEach"](function(bY){
bX+=bY["count"]||0x1;
}),a6["normLega"+'cy'](a6["legacyFr"+'om']({'gen':bW["gen"]||0x1,'banned':!!bW["banned"],'maxOvr':bW["maxOvr"]||0x0,'caps':bW["caps"]||0x0,
'trophies':bX,'careerEarnings':bW["earned"]||0x0}));
}var aF=0x3c;
function aG(){var bW=ay("archive",null);
return "[object "+"Array]"===Object["prototyp"+'e']["toString"]["call"](bW)?bW:[];
}function aH(bW){var bX={},bY=0x0,bZ=bW["length"];
bW["forEach"](function(c2){
bp(c2)["forEach"](function(c3){bX[c3]=0x1;
}),c2["maxOvr"]>bY&&(bY=c2["maxOvr"]);
});
var c0=0x0;
for(var c1 in bX)Object["prototyp"+'e']["hasOwnPr"+"operty"]["call"](bX,c1)&&c0++;
return{'lives':bZ,'best':bY,'endings':c0,'total':a0["ENDINGS"]["length"]};
}function aI(){var bW=ay("save",null);
return bW&&bW["ver"]===a7?(bW["natRuns"]||(bW["natRuns"]=[]),null==bW["banGames"]&&(bW["banGames"]=0x0),bW["choices"]||(bW["choices"]=[],bW["rid"]=null),null==bW["wageMul"+'t']&&(bW["wageMul"+'t']=0x1),
void 0x0===bW["rid"]&&(bW["rid"]=null),bW):null;
}function aJ(){
try{localStorage["removeIt"+'em'](a2+"save");
}catch(bW){}}function aK(bW){var bX=String(bW)["replace"]('#','');
return 0x3===bX["length"]&&(bX=bX[0x0]+bX[0x0]+bX[0x1]+bX[0x1]+bX[0x2]+bX[0x2]),(0x12b*parseInt(bX["slice"](0x0,0x2),0x10)+0x24b*parseInt(bX["slice"](0x2,0x4),0x10)+0x72*parseInt(bX["slice"](0x4,0x6),0x10))/0x3e8>0x96;
}function aL(bW,bX){var bY="assets/j"+"ersey/"+bW['id'];
return function(bZ){var c0=aV('jg');
return "<svg cla"+"ss=\"j-fa"+"llback\" "+"viewBox="+"\"0 0 100"+" 100\" ar"+"ia-hidde"+"n=\"true\""+"><defs><"+"linearGr"+"adient i"+"d=\""+c0+("\" x1=\"0\""+" y1=\"0\" "+"x2=\"0\" y"+"2=\"1\"><s"+"top offs"+"et=\"0\" s"+"top-colo"+"r=\"")+bZ['c1']+("\"/><stop"+" offset="+"\"1\" stop"+"-color=\"")+aN(bZ['c1'],
-0.28)+("\"/></lin"+"earGradi"+"ent></de"+"fs><path"+" d=\"M34 "+"20 L44 1"+"5 Q50 21"+" 56 15 L"+"66 20 L8"+"4 29 L77"+" 44 L69 "+"40 L69 8"+"6 L31 86"+" L31 40 "+"L23 44 L"+"16 29 Z\""+" fill=\"u"+"rl(#")+c0+(")\" strok"+"e=\"rgba("+"0,0,0,.3"+"5)\" stro"+"ke-width"+"=\"1.2\" s"+"troke-li"+"nejoin=\""+"round\"/>"+"<path d="+"\"M44 15 "+"Q50 21 5"+"6 15 L54"+" 20 Q50 "+"25 46 20"+" Z\" fill"+"=\"rgba(0"+",0,0,.32"+")\"/></sv"+'g>');
}(bW)+("<picture"+" class=\""+"j-pic\"><"+"source s"+"rcset=\"")+bY+(".webp\" t"+"ype=\"ima"+"ge/webp\""+"><img cl"+"ass=\"j-i"+"mg\" src="+'\x22')+bY+(".png\" al"+"t=\"")+ax(bX)+("\" onerro"+"r=\"this."+"parentNo"+"de.class"+"List.add"+"('gone')"+"\"></pict"+"ure>");
}function aM(bW,bX,bY){var bZ="text-anc"+"hor=\"mid"+"dle\" fil"+"l=\""+(aK(bW['c1'])?"#17171c":"#ffffff")+("\" stroke"+'=\x22')+(aK(bW['c1'])?"#ffffff":"#17171c")+("\" paint-"+"order=\"s"+"troke\" s"+"troke-li"+"nejoin=\""+"round\" f"+"ont-fami"+"ly=\"Inte"+"r, PingF"+"ang SC, "+"Microsof"+"t YaHei,"+" sans-se"+"rif\" fon"+"t-weight"+"=\"800\"");
return "<div cla"+"ss=\"jers"+"ey\">"+aL(bW,'球衣')+("<svg cla"+"ss=\"j-pr"+"int\" vie"+"wBox=\"0 "+"0 100 10"+"0\" aria-"+"hidden=\""+"true\"><t"+"ext x=\"5"+"0\" y=\"31"+'\x22\x20')+bZ+(" font-si"+"ze=\"9.5\""+" stroke-"+"width=\"1"+".9\" lett"+"er-spaci"+"ng=\".5\">")+ax(String(bX||'')["slice"](0x0,0x6)["toUpperC"+"ase"]())+("</text><"+"text x=\""+"50\" y=\"6"+"3\" ")+bZ+(" font-si"+"ze=\"31\" "+"stroke-w"+"idth=\"3."+"6\">")+ax(String(bY))+("</text><"+"/svg></d"+"iv>");
}function aN(bW,bX){var bY=String(bW)["replace"]('#','');
return 0x3===bY["length"]&&(bY=bY[0x0]+bY[0x0]+bY[0x1]+bY[0x1]+bY[0x2]+bY[0x2]),'#'+[parseInt(bY["slice"](0x0,0x2),0x10),parseInt(bY["slice"](0x2,0x4),0x10),
parseInt(bY["slice"](0x4,0x6),0x10)]["map"](function(bZ){var c0=Math["round"](bX<0x0?bZ*(0x1+bX):bZ+(0xff-bZ)*bX);
return('0'+Math["max"](0x0,Math["min"](0xff,c0))["toString"](0x10))["slice"](-0x2);
})["join"]('');
}var aO={'bay':{'s':"circle",'p':"quarters",'c2':"#0066B2",'c3':"#ffffff",'o':"star"},'bar':{'s':"shield",'p':"vstripes",'c2':"#004D98",
'c3':"#EDBB00",'o':"cross"},'rma':{'s':"circle",'p':"solid",'c2':"#00529F",'c3':"#ffffff",'o':"crown"},'juv':{'s':"shield",
'p':"vstripes",'c2':"#ffffff",'c3':"#000000",'o':"star"},'int':{'s':"circle",'p':"solid",'c2':"#000000",'c3':"#C9A227",'o':"ring"},
'acm':{'s':"shield",'p':"halves",'c2':"#000000",'c3':"#ffffff",'o':"none"},'liv':{'s':"shield",'p':"solid",'c2':"#00B2A9",
'c3':"#F6EB61",'o':"ball"},'mun':{'s':"circle",'p':"solid",'c2':"#FBE122",'c3':"#000000",'o':"ball"},'psg':{'s':"shield",'p':"vstripes",
'c2':"#DA291C",'c3':"#ffffff",'o':"star"}},aP=["shield","circle","rounded"],aQ=["solid","vstripes","sash","halves","hoop",
"quarters"],aR=["none","star","ball","ring"],aS={'shield':"M100,10 "+"L178,34 "+"L178,100"+" C178,14"+"6 142,17"+"6 100,19"+"0 C58,17"+"6 22,146"+" 22,100 "+"L22,34 Z",
'circle':"M100,12 "+"A88,88 0"+" 1 1 99."+"9,12 Z",'rounded':"M40,16 H"+"160 A24,"+"24 0 0 1"+" 184,40 "+"V150 A24"+",24 0 0 "+"1 160,17"+"4 H40 A2"+"4,24 0 0"+" 1 16,15"+"0 V40 A2"+"4,24 0 0"+" 1 40,16"+'\x20Z'};
function aT(bW){
if(!bW)return'';
var bX=window["CREST_UR"+'LS']&&window["CREST_UR"+'LS'][bW['id']];
if(bX){var bY=window["CREST_PL"+"ATE"]&&window["CREST_PL"+"ATE"][bW['id']]?" plate":'',bZ="<img cla"+"ss=\"cres"+'t'+bY+"\" src=\""+ax(bX["replace"](/\.webp$/,".png"))+("\" alt=\"\""+" loading"+"=\"lazy\">");
return/\.webp$/["test"](bX)?"<picture"+" class=\""+"crest-pi"+"c\"><sour"+"ce srcse"+"t=\""+ax(bX)+("\" type=\""+"image/we"+"bp\">")+bZ+("</pictur"+'e>'):"<img cla"+"ss=\"cres"+'t'+bY+"\" src=\""+ax(bX)+("\" alt=\"\""+" loading"+"=\"lazy\">");
}var c0=function(c8){var c9=aO[c8['id']],ca=af(c8['id']);
if(!c9){var cb=a6["leagueOf"+"Team"](c8),cc=cb&&cb['cn'];
c9={'s':cc?"circle":aP[ca%0x3],'p':cc?["solid","hoop","quarters"][ca%0x3]:aQ[(ca>>0x3)%0x6],'c2':aN(c8["color"],-0.5),'c3':aN(c8["color"],0.55),
'o':cc?"ring":aR[(ca>>0x7)%0x4]};
}return c9;
}(bW),c1=aV('cc'),c2=aV('cg'),c3=bW["color"],c4=aN(c3,-0.55),c5=aS[c0['s']]||aS["shield"],c6='';
"vstripes"===c0['p']?c6="<rect x="+"\"58\" y=\""+"0\" width"+"=\"26\" he"+"ight=\"20"+"0\" fill="+'\x22'+c0['c2']+("\"/><rect"+" x=\"116\""+" y=\"0\" w"+"idth=\"26"+"\" height"+"=\"200\" f"+"ill=\"")+c0['c2']+"\"/>":"halves"===c0['p']?c6="<rect x="+"\"100\" y="+"\"0\" widt"+"h=\"100\" "+"height=\""+"200\" fil"+"l=\""+c0['c2']+"\"/>":"hoop"===c0['p']?c6="<rect x="+"\"0\" y=\"7"+"6\" width"+"=\"200\" h"+"eight=\"4"+"8\" fill="+'\x22'+c0['c2']+"\"/>":"sash"===c0['p']?c6="<path d="+"\"M0,148 "+"L200,18 "+"L200,66 "+"L0,196 Z"+"\" fill=\""+c0['c2']+"\"/>":"quarters"===c0['p']&&(c6="<rect x="+"\"0\" y=\"0"+"\" width="+"\"100\" he"+"ight=\"10"+"0\" fill="+'\x22'+c0['c2']+("\"/><rect"+" x=\"100\""+" y=\"100\""+" width=\""+"100\" hei"+"ght=\"100"+"\" fill=\"")+c0['c2']+"\"/>");
var c7='';
return "star"===c0['o']?c7="<path d="+"\"M100,26"+" l7,15 1"+"6,2 -12,"+"12 3,17 "+"-14,-8 -"+"14,8 3,-"+"17 -12,-"+"12 16,-2"+" z\" fill"+'=\x22'+c0['c3']+"\"/>":"ball"===c0['o']?c7="<circle "+"cx=\"100\""+" cy=\"46\""+" r=\"15\" "+"fill=\""+c0['c3']+("\"/><path"+" d=\"M100"+",35 l6,5"+" -2,7 h-"+"8 l-2,-7"+" z\" fill"+'=\x22')+c4+"\"/>":"ring"===c0['o']?c7="<circle "+"cx=\"100\""+" cy=\"100"+"\" r=\"66\""+" fill=\"n"+"one\" str"+"oke=\""+c0['c3']+("\" stroke"+"-width=\""+"7\" opaci"+"ty=\".85\""+'/>'):"cross"===c0['o']?c7="<rect x="+"\"92\" y=\""+"24\" widt"+"h=\"16\" h"+"eight=\"5"+"2\" fill="+'\x22'+c0['c3']+("\"/><rect"+" x=\"74\" "+"y=\"42\" w"+"idth=\"52"+"\" height"+"=\"16\" fi"+"ll=\"")+c0['c3']+"\"/>":"crown"===c0['o']&&(c7="<path d="+"\"M76,42 "+"l8,16 16"+",-20 16,"+"20 8,-16"+" 4,26 h-"+"56 z\" fi"+"ll=\""+c0['c3']+"\"/>"),
"<svg cla"+"ss=\"cres"+"t\" viewB"+"ox=\"0 0 "+"200 200\""+" aria-hi"+"dden=\"tr"+"ue\"><def"+"s><clipP"+"ath id=\""+c1+("\"><path "+"d=\"")+c5+("\"/></cli"+"pPath><l"+"inearGra"+"dient id"+'=\x22')+c2+("\" x1=\"0\""+" y1=\"0\" "+"x2=\".35\""+" y2=\"1\">"+"<stop of"+"fset=\"0\""+" stop-co"+"lor=\"#ff"+"f\" stop-"+"opacity="+"\".2\"/><s"+"top offs"+"et=\"1\" s"+"top-colo"+"r=\"#000\""+" stop-op"+"acity=\"."+"28\"/></l"+"inearGra"+"dient></"+"defs><g "+"clip-pat"+"h=\"url(#")+c1+(")\"><rect"+" x=\"0\" y"+"=\"0\" wid"+"th=\"200\""+" height="+"\"200\" fi"+"ll=\"")+c3+"\"/>"+c6+c7+("<rect x="+"\"0\" y=\"0"+"\" width="+"\"200\" he"+"ight=\"20"+"0\" fill="+"\"url(#")+c2+(")\"/></g>"+"<path d="+'\x22')+c5+("\" fill=\""+"none\" st"+"roke=\"")+c4+("\" stroke"+"-width=\""+"12\"/><te"+"xt x=\"10"+"0\" y=\"14"+"5\" text-"+"anchor=\""+"middle\" "+"fill=\"")+(aK(c3)?"#16160f":"#ffffff")+("\" stroke"+'=\x22')+c4+("\" stroke"+"-width=\""+"5\" paint"+"-order=\""+"stroke\" "+"stroke-l"+"inejoin="+"\"round\" "+"font-fam"+"ily=\"Int"+"er, Ping"+"Fang SC,"+" Microso"+"ft YaHei"+", sans-s"+"erif\" fo"+"nt-size="+"\"58\" fon"+"t-weight"+"=\"800\">")+ax(String(bW["name"]||'')["slice"](0x0,0x2))+("</text><"+"/svg>");
}var aU=0x0;
function aV(bW){return bW+ ++aU;
}var aW={'ST':[0x32,0x9],'LW':[0xf,0xf],'RW':[0x55,0xf],'CAM':[0x32,0x1b],'LM':[0xb,0x28],'CM':[0x32,0x2c],'RM':[0x59,0x28],
'CDM':[0x32,0x3c],'LB':[0xe,0x47],'RB':[0x56,0x47],'CB':[0x32,0x4e],'GK':[0x32,0x5d]},aX=0x0,aY=[{'title':'出身','sub':"决定起步能力、家"+"里的底子，和你认"+"识多少人"},
{'title':'位置','sub':"在场上站哪儿"},{'title':'身份','sub':"名字、号码、位置、惯用脚是"+"随机生成的，也可"+"以自己改；若随机"+"到中国球星会有小"+"加成"},{'title':"心仪球队",'sub':"12 岁那步一定"+"能选到它的青训营"+"；之后够得上它的"+"那一年，报价单上"+"也一定有它"}],
aZ=null;
function b0(){var bW=aY[aX];
aw("step-tit"+'le')["textCont"+"ent"]=bW["title"],aw("step-sub")["textCont"+"ent"]=bW["sub"],aw("step-pro"+"gress")["style"]["width"]=(aX+0x1)/aY["length"]*0x64+'%';
var bX='';
if(0x0===aX)bX="<div cla"+"ss=\"pane"+"l\"><div "+"class=\"p"+"ick-list"+'\x22>'+a9["map"](function(c2){
return "<button "+"class=\"p"+"ick"+(av["origin"]['id']===c2['id']?" selecte"+'d':'')+("\" data-o"+"rigin=\"")+c2['id']+'\x22>'+function(c3){
return "<span cl"+"ass=\"jer"+"sey mini"+'\x22>'+aL(c3,'')+"</span>";
}(c2)+("<span cl"+"ass=\"pic"+"k-main\">"+"<span cl"+"ass=\"pic"+"k-name\">")+ax(c2["name"])+("</span><"+"span cla"+"ss=\"pick"+"-desc\">")+ax(c2["desc"])+("</span><"+"/span></"+"button>");
})["join"]('')+("</div></"+"div>");
else{if(0x1===aX){var bY=ah(av["pos"]);
bX="<div cla"+"ss=\"pitc"+"h\">"+(function(){
for(var c2=aV('pg'),c3='',c4=0x0;
c4<0x8;
c4++)c4%0x2!=0x0&&(c3+="<rect x="+"\"0\" y=\""+0x34*c4+("\" width="+"\"300\" he"+"ight=\"52"+"\" fill=\""+"#fff\" fi"+"ll-opaci"+"ty=\".055"+"\"/>"));
return "<svg vie"+"wBox=\"0 "+"0 300 41"+"5\" prese"+"rveAspec"+"tRatio=\""+"none\" ar"+"ia-hidde"+"n=\"true\""+"><defs><"+"linearGr"+"adient i"+"d=\""+c2+("\" x1=\"0\""+" y1=\"0\" "+"x2=\".4\" "+"y2=\"1\"><"+"stop off"+"set=\"0\" "+"stop-col"+"or=\"#155"+"63e\"/><s"+"top offs"+"et=\".5\" "+"stop-col"+"or=\"#104"+"330\"/><s"+"top offs"+"et=\"1\" s"+"top-colo"+"r=\"#0b32"+"24\"/></l"+"inearGra"+"dient></"+"defs><re"+"ct width"+"=\"300\" h"+"eight=\"4"+"15\" fill"+"=\"url(#")+c2+")\"/>"+c3+("<g fill="+"\"none\" s"+"troke=\"#"+"eafff6\" "+"stroke-o"+"pacity=\""+".45\" str"+"oke-widt"+"h=\"2\"><r"+"ect x=\"1"+"0\" y=\"10"+"\" width="+"\"280\" he"+"ight=\"39"+"5\" rx=\"2"+"\"/><line"+" x1=\"10\""+" y1=\"207"+"\" x2=\"29"+"0\" y2=\"2"+"07\"/><ci"+"rcle cx="+"\"150\" cy"+"=\"207\" r"+"=\"42\"/><"+"rect x=\""+"72\" y=\"1"+"0\" width"+"=\"156\" h"+"eight=\"5"+"8\"/><rec"+"t x=\"112"+"\" y=\"10\""+" width=\""+"76\" heig"+"ht=\"24\"/"+"><rect x"+"=\"72\" y="+"\"347\" wi"+"dth=\"156"+"\" height"+"=\"58\"/><"+"rect x=\""+"112\" y=\""+"381\" wid"+"th=\"76\" "+"height=\""+"24\"/></g"+"><circle"+" cx=\"150"+"\" cy=\"20"+"7\" r=\"3."+"5\" fill="+"\"#eafff6"+"\" fill-o"+"pacity=\""+".6\"/><ci"+"rcle cx="+"\"150\" cy"+"=\"52\" r="+"\"3\" fill"+"=\"#eafff"+"6\" fill-"+"opacity="+"\".45\"/><"+"circle c"+"x=\"150\" "+"cy=\"363\""+" r=\"3\" f"+"ill=\"#ea"+"fff6\" fi"+"ll-opaci"+"ty=\".45\""+"/></svg>");
}())+a0["POSITION"+'S']["map"](function(c2){var c3=aW[c2['id']]||[0x32,0x32];
return "<button "+"class=\"p"+"os-btn"+(av["pos"]===c2['id']?" selecte"+'d':'')+("\" data-p"+"os=\"")+c2['id']+("\" style="+"\"left:")+c3[0x0]+"%;top:"+c3[0x1]+"%\">"+c2['id']+("</button"+'>');
})["join"]('')+("</div><p"+" class=\""+"pitch-hi"+"nt\">已选 <"+'b>')+ax(bY["name"])+'（'+bY['id']+("）</b></p"+'>')+function(c2){var c3=cAch();
return "<div style=\"margin-top:1rem;padding:.8rem .9rem;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.25);border-radius:.5rem\"><label style=\"display:flex;align-items:center;gap:.5rem;cursor:pointer\"><input type=\"checkbox\" id=\"ach-boost\" checked style=\"accent-color:#34d399;width:1rem;height:1rem\"><span style=\"font-size:.85rem;font-weight:600\">启用成就加成（已解锁 "+c3["count"]+" 项）</span></label><p style=\"margin:.5rem 0 0;font-size:.75rem;opacity:.75\">"+(c3["count"]?c3["list"]["join"](" · "):"暂无，先踢出第一个结局再回来")+"</p></div>";
}(0x0);
}else{if(0x3===aX){var bZ=av["dreamId"]?ag(av["dreamId"]):null,c0=bZ?a6["leagueOf"+"Team"](bZ):null,c1=aZ||(bZ?bZ["league"]:"csl");
bX="<button "+"class=\"d"+"ream-non"+'e'+(bZ?'':" selecte"+'d')+("\" data-d"+"ream=\"\">"+"<span cl"+"ass=\"dre"+"am-none-"+"t\">随缘</s"+"pan><spa"+"n class="+"\"dream-n"+"one-d\">")+(bZ?"现在指定的是 "+ax(bZ["name"])+'（'+ax(c0?c0["name"]:'')+'）'+(c0&&!c0['cn']?" · 12 岁送"+"出国要花 "+a0["YOUTH_AB"+"ROAD_FEE"]+(" 万，家底不够就"+"是欠债去的"):''):"不指定，报价单照"+"旧全凭运气")+("</span><"+"/button>"+"<div cla"+"ss=\"lg-t"+"abs\">")+a0["LEAGUES"]["map"](function(c2){
return "<button "+"class=\"l"+"g-tab"+(c1===c2['id']?" selecte"+'d':'')+("\" data-d"+"reamlg=\"")+c2['id']+'\x22>'+ax(c2["name"])+("</button"+'>');
})["join"]('')+("</div><d"+"iv class"+"=\"dream-"+"grid\">")+a0["TEAMS"]["filter"](function(c2){
return c2["league"]===c1;
})["map"](function(c2){
return "<button "+"class=\"d"+"ream-tea"+'m'+(av["dreamId"]===c2['id']?" selecte"+'d':'')+("\" data-d"+"ream=\"")+c2['id']+'\x22>'+aT(c2)+"<span>"+ax(c2["name"])+("</span><"+"/button>");
})["join"]('')+"</div>";
}else bX="<div cla"+"ss=\"jers"+"ey-wrap\""+'>'+aM(av["origin"],av["name"]||'球员',av["number"])+("</div><d"+"iv class"+"=\"form-r"+"ow\"><div"+"><span c"+"lass=\"fi"+"eld-labe"+"l\">姓名</s"+"pan><inp"+"ut class"+"=\"input\""+" id=\"in-"+"name\" ma"+"xlength="+"\"6\" plac"+"eholder="+"\"李亦非\" au"+"tocomple"+"te=\"off\""+" value=\"")+ax(av["name"])+("\"></div>"+"<div cla"+"ss=\"narr"+"ow\"><spa"+"n class="+"\"field-l"+"abel\">号码"+"</span><"+"input cl"+"ass=\"inp"+"ut\" id=\""+"in-numbe"+"r\" type="+"\"number\""+" min=\"1\""+" max=\"99"+"\" value="+'\x22')+av["number"]+("\"></div>"+"</div><d"+"iv style"+"=\"margin"+"-top:1.1"+"rem\"><sp"+"an class"+"=\"field-"+"label\">惯"+"用脚</span"+"><div cl"+"ass=\"seg"+"mented\" "+"id=\"foot"+"-seg\"><b"+"utton cl"+"ass=\"seg")+("left"===av["foot"]?" selecte"+'d':'')+("\" data-f"+"oot=\"lef"+"t\">左脚</b"+"utton><b"+"utton cl"+"ass=\"seg")+("right"===av["foot"]?" selecte"+'d':'')+("\" data-f"+"oot=\"rig"+"ht\">右脚</"+"button><"+"/div></d"+"iv>")+("<div st"+"yle=\"ma"+"rgin-to"+"p:.9re"+"m\"><bu"+"tton ty"+"pe=\"butt"+"on\" dat"+"a-rerol"+"l class"+"=\"seg\">"+"换个随机</"+"button><"+"span st"+"yle=\"ma"+"rgin-le"+"ft:.6re"+"m;font-"+"size:.7"+"2rem;o"+"pacity:.65\">"+"姓名、号"+"码、惯用"+"脚都会重"+"新随机</sp"+"an></di"+"v>")+(bU2(av["name"],
av["number"])?"<div st"+"yle=\"ma"+"rgin-to"+"p:.8re"+"m;color"+":#34d39"+"3\">抽中"+"了球星"+bU2(av["name"],av["number"])+"，会有"+"一点点属"+"性加成</"+"div>":"");
}}aw("step-bod"+'y')["innerHTM"+'L']=(function(){var c2=aB();
if(!c2)return'';
var c3=[];
return c2["ovr"]&&c3["push"]("能力 +"+c2["ovr"]),c2["talent"]&&c3["push"]("天赋 +"+c2["talent"]["toFixed"](0x2)),c2["guanxi"]&&c3["push"]("关系 +"+c2["guanxi"]),
c2["money"]&&c3["push"]("家底 +"+al(c2["money"])),"<div cla"+"ss=\"lega"+"cy-banne"+"r\"><div "+"class=\"l"+"egacy-ge"+"n\">第 "+c2["gen"]+(" 世</div>"+"<div cla"+"ss=\"lega"+"cy-bits\""+'>')+(c3["length"]?ax(c3["join"](" · ")):"上一世什么也没留"+'下')+("</div></"+"div>");
}())+bX,aw("btn-next")["textCont"+"ent"]=aX===aY["length"]-0x1?"开始生涯":'继续',aw("btn-back")["textCont"+"ent"]=0x0===aX?'返回':"上一步";
}function b1(bW,bX,bY,bZ){
return "<div cla"+"ss=\"ev-h"+"ead\"><sp"+"an class"+"=\"ev-ico"+"n\">"+bW+("</span><"+"div clas"+"s=\"ev-he"+"ad-main\""+"><div cl"+"ass=\"ev-"+"tag")+(bZ?" decisio"+'n':'')+'\x22>'+ax(bX)+("</div><d"+"iv class"+"=\"ev-tit"+"le\">")+ax(bY)+("</div></"+"div></di"+'v>');
}var b2=null;
function b3(bW){var bX=aw("career-r"+"oot");
return bX&&bX["querySel"+"ector"]?bX["querySel"+"ector"](bW):null;
}var b4={'apps':"<svg cla"+"ss=\"mi\" "+"viewBox="+"\"0 0 24 "+"24\" aria"+"-hidden="+"\"true\"><"+"rect x=\""+"2.5\" y=\""+"4.5\" wid"+"th=\"19\" "+"height=\""+"15\" rx=\""+"2\" fill="+"\"#1c3a28"+"\" stroke"+"=\"#4ade8"+"0\" strok"+"e-width="+"\"1.6\"/><"+"path d=\""+"M12 4.5v"+"15\" stro"+"ke=\"#4ad"+"e80\" str"+"oke-widt"+"h=\"1.4\"/"+"><circle"+" cx=\"12\""+" cy=\"12\""+" r=\"3.1\""+" fill=\"n"+"one\" str"+"oke=\"#4a"+"de80\" st"+"roke-wid"+"th=\"1.4\""+"/><path "+"d=\"M2.5 "+"9h3v6h-3"+"M21.5 9h"+"-3v6h3\" "+"fill=\"no"+"ne\" stro"+"ke=\"#4ad"+"e80\" str"+"oke-widt"+"h=\"1.4\"/"+"></svg>",
'goals':"<svg cla"+"ss=\"mi\" "+"viewBox="+"\"0 0 24 "+"24\" aria"+"-hidden="+"\"true\"><"+"circle c"+"x=\"12\" c"+"y=\"12\" r"+"=\"9\" fil"+"l=\"#f4f6"+"f2\"/><pa"+"th d=\"M1"+"2 6.6l3."+"4 2.5-1."+"3 4h-4.2"+"l-1.3-4z"+"\" fill=\""+"#20241d\""+"/><path "+"d=\"M12 3"+"v3.6M4.2"+" 9.6l3.7"+" 1.5M19."+"8 9.6l-3"+".7 1.5M7"+".4 20l2."+"5-3M16.6"+" 20l-2.5"+"-3\" stro"+"ke=\"#202"+"41d\" str"+"oke-widt"+"h=\"1.3\"/"+"></svg>",
'ast':"<svg cla"+"ss=\"mi\" "+"viewBox="+"\"0 0 24 "+"24\" aria"+"-hidden="+"\"true\"><"+"path d=\""+"M2.5 16."+"2h5.6c.7"+" 2 2.6 2"+".9 5 3.3"+" 2 .4 3."+"4.7 3.9 "+"1.4H2.5z"+"\" fill=\""+"#f4f6f2\""+"/><path "+"d=\"M2.5 "+"12.4h4.2"+"c.4 1.6."+"9 2.8 1."+"4 3.8H2."+"5z\" fill"+"=\"#c9d2c"+"4\"/></sv"+'g>',
'cs':"<svg cla"+"ss=\"mi\" "+"viewBox="+"\"0 0 24 "+"24\" aria"+"-hidden="+"\"true\"><"+"path d=\""+"M7 7.5c0"+"-1.6 3-1"+".6 3 0v2"+"c.6-2.2 "+"3.6-1.6 "+"3.4.3.8-"+"1.7 3.5-"+"1.1 3.3."+"9l-.6 5."+"8c-.3 2."+"4-2.5 3."+"5-5 3.5-"+"2.8 0-4."+"5-1.7-4."+"5-4.2z\" "+"fill=\"#f"+"4f6f2\"/>"+"</svg>",
'ga':"<svg cla"+"ss=\"mi\" "+"viewBox="+"\"0 0 24 "+"24\" aria"+"-hidden="+"\"true\"><"+"path d=\""+"M3 6h18v"+"12H3z\" f"+"ill=\"non"+"e\" strok"+"e=\"#e08a"+"7a\" stro"+"ke-width"+"=\"1.6\"/>"+"<path d="+"\"M7 6v12"+"M11 6v12"+"M15 6v12"+"M19 6v12"+"M3 10h18"+"M3 14h18"+"\" stroke"+"=\"#e08a7"+"a\" strok"+"e-width="+"\".9\" opa"+"city=\".7"+"\"/></svg"+'>'};
function b5(bW){
return bW>=0x58?"plat":bW>=0x4e?"gold":bW>=0x44?"silver":bW>=0x3a?"bronze":"base";
}function b6(bW,bX,bY){
return "<div cla"+"ss=\"bar\""+"><span c"+"lass=\"ba"+"r-l\">"+bW+("</span><"+"div clas"+"s=\"bar-t"+"\"><div c"+"lass=\"ba"+"r-f\" sty"+"le=\"widt"+'h:')+ad(bX,
0x0,0x64)+("%;backgr"+"ound:")+bY+("\"></div>"+"</div><s"+"pan clas"+"s=\"bar-v"+'\x22>')+Math["round"](bX)+("</span><"+"/div>");
}function b7(){var bW=ag(au["youthTea"+"mId"]);
return bW?a6["academyN"+"ame"](bW):'';
}function b8(bW,bX,bY,bZ,c0,c1,c2){
return "<div cla"+"ss=\"tl-r"+"ow tl-co"+"ls "+bW+'\x22>'+bX+bY+bZ+("<span cl"+"ass=\"tl-"+"n r\">")+c0+("</span><"+"span cla"+"ss=\"tl-n"+" r\">")+c1+("</span><"+"span cla"+"ss=\"tl-n"+" r hide-"+"xs\">")+c2+("</span><"+"/div>");
}function b9(bW){var bX=ah(au["pos"])["group"];
var bY="";
var agg=(function(){var c2=a8[au["mode"]]["seasons"],c3=[],c4=null,c5=null,c6=0x0;
function c7(){
c4&&c5&&(c4["age"]=c5["age"],c4["teamName"]=c5["teamName"],c4["color"]=c5["color"],c4["ovr"]=c5["ovrEnd"],c4["teamId"]=c5["teamId"],
c3["push"](c4),c4=null,c6=0x0);
}return au["seasons"]["forEach"](function(c8,c9){
c4&&c5&&c8["teamId"]!==c5["teamId"]&&c7(),c4||(c4={'apps':0x0,'goals':0x0,'assists':0x0,'cs':0x0,'ga':0x0,'caps':0x0,'natGoals':0x0,'natAssists':0x0,'natCs':0x0,'trophies':[],'notes':[],'nats':[],'moves':[]}),
c4["apps"]+=c8["apps"],c4["goals"]+=c8["goals"],c4["assists"]+=c8["assists"],c4['cs']+=c8['cs'],c4['ga']+=c8['ga'],c4["caps"]+=c8["caps"]||0x0,
c4["natGoals"]+=c8["natGoals"]||0x0,c4["natAssis"+'ts']+=c8["natAssis"+'ts']||0x0,c4["natCs"]+=c8["natCs"]||0x0,c8["trophies"]["length"]&&(c4["trophies"]=c4["trophies"]["concat"](c8["trophies"])),
c8["note"]&&c4["notes"]["push"](c8["note"]),c8["nat"]&&c4["nats"]["push"](c8["nat"]),c8["move"]&&c4["moves"]["push"](c8["move"]),
(c8["trophies"]||[])["forEach"](function(cN){
"世界杯冠军"===cN||"亚洲杯冠军"===cN&&c4["nats"]["push"](cN);
}),
c5=c8,(++c6>=c2||c9===au["seasons"]["length"]-0x1)&&c7();
}),c3;
}());
/* 选项卡头 */
bY+='<div class="tl-tabs"><button class="tl-tab on" data-tab="club">俱乐部</button><button class="tl-tab" data-tab="nat">国家队</button><button class="tl-tab" data-tab="award">奖项</button><button class="tl-tab" data-tab="pers">个人</button></div>';
/* 俱乐部面板：俱乐部奖杯+转会，不含国家队 */
var clubBody='<div class="tl-panel" data-panel="club"><div class="tl-head tl-cols"><span>年龄</span><span>俱乐部</span><span class="r">能力</span><span class="r">'+b4["apps"]+'</span><span class="r">'+('gk'===bX?b4['cs']:b4["goals"])+'</span><span class="r hide-xs">'+('gk'===bX?b4['ga']:b4["ast"])+'</span></div><div class="tl-scroll">';
(au["youthLog"]||[])["forEach"](function(c2){var c3=ag(c2["teamId"]);
clubBody+=b8("done you"+'th','<span class="age-chip">'+c2["age"]+'</span>','<span class="tl-club">'+(c3?aT(c3):'')+('<span class="tl-club-name">')+(c3?ax(a6["academyN"+"ame"](c3)):'青训')+'</span>'+(c2["cut"]?'<span class="tl-badges"><span class="mini-badge bad">被刷下来</span></span>':'')+'</span>',
'<span class="r"><span class="ovr-pill '+b5(c2["ovr"])+'">'+c2["ovr"]+'</span></span>','','','');
});
agg["forEach"](function(c2){var c3='';
var c3a=(c2["moves"]||[])["map"](function(c5){
return '<span class="mini-badge '+(0x0===c5["indexOf"]('升')?'up':"bad")+'">'+ax(c5)+'</span>';
})["join"]('')+(c2["trophies"]["filter"](function(c5){
return"世界杯冠军"!==c5&&"亚洲杯冠军"!==c5;
})["map"](function(c5){
return '<span class="mini-badge">'+ax(c5)+'</span>';
}))["join"]('');
clubBody+=b8("done",'<span class="age-chip"'+(c2["color"]?' style="background:'+c2["color"]+(';color:#fff"'):'')+'>'+c2["age"]+'</span>',
'<span class="tl-club">'+aT(ag(c2["teamId"]))+('<span class="tl-club-name">')+ax(c2["teamName"])+'</span>'+(c3a?'<span class="tl-badges">'+c3a+'</span>':'')+'</span>',
'<span class="r"><span class="ovr-pill '+b5(c2["ovr"])+'">'+c2["ovr"]+'</span></span>',c2["apps"],'gk'===bX?c2['cs']:c2["goals"],
'gk'===bX?c2['ga']:c2["assists"]);
});
/* 当前状态行（若有） */
if(!bW){var bZ=ai(),c0=au["pending"]&&("academy"===au["pending"]["type"]||"transfer"===au["pending"]["type"]||"retire_f"+"orced"===au["pending"]["type"]),c1=au["pending"]&&"youth_pa"+'th'===au["pending"]["type"];
clubBody+=b8("now",'<span class="age-chip">'+au["age"]+'</span>','<span class="tl-club">'+(bZ&&!c0?aT(bZ):'')+('<span class="tl-club-name">')+(c1?"选青训营…":c0?"选择俱乐部…":"youth"===au["phase"]?b7()||'青训':ax(bZ?bZ["name"]:"自由身"))+'</span></span>',
'<span class="r"><span class="ovr-pill '+b5(au["ovr"])+'">'+Math["round"](au["ovr"])+'</span></span>','','','');
}
clubBody+='</div></div>';
/* 国家队面板：国家队数据+成绩 */
var natBody='<div class="tl-panel hidden" data-panel="nat"><div class="tl-head tl-cols"><span>年龄</span><span>国家队</span><span class="r">能力</span><span class="r">'+b4["apps"]+'</span><span class="r">'+('gk'===bX?b4['cs']:b4["goals"])+'</span><span class="r hide-xs">'+('gk'===bX?b4['ga']:b4["ast"])+'</span></div><div class="tl-scroll">';
var natRows=0x0;
agg["forEach"](function(c2){
if(c2["caps"]||(c2["nats"]||[])["length"]){natRows++;
var c3a=((c2["nats"]||[])["map"](function(c5){
return '<span class="mini-badge nat">'+ax(c5)+'</span>';
}))["join"]('');
natBody+=b8("done",'<span class="age-chip"'+(c2["color"]?' style="background:'+c2["color"]+(';color:#fff"'):'')+'>'+c2["age"]+'</span>',
'<span class="tl-club"><span class="tl-club-name">中国队</span>'+(c3a?'<span class="tl-badges">'+c3a+'</span>':'')+'</span>',
'<span class="r"><span class="ovr-pill '+b5(c2["ovr"])+'">'+c2["ovr"]+'</span></span>',c2["caps"],'gk'===bX?c2["natCs"]:c2["natGoals"],
'gk'===bX?c2["natCs"]:c2["natAssists"]);
}
});
if(!natRows)natBody+='<div class="tl-row done tl-cols"><span class="age-chip"></span><span class="tl-club"><span class="tl-club-name">生涯从未入选国家队</span></span></div>';
natBody+='</div></div>';
/* 奖项面板：按年四列（年龄/俱乐部/国家队/个人）——完全自包含（含 tl-panel 开闭） */
var awardBody='<div class="tl-panel hidden" data-panel="award"><div class="tl-head tl-cols award"><span>年龄</span><span>俱乐部奖项</span><span>国家队奖项</span><span>个人奖项</span></div><div class="tl-scroll">';
var awardAny=!0x1;
(au["seasons"]||[])["forEach"](function(c2){
var cClubs=[],cNats=[],cAwards=[];
(c2["trophies"]||[])["forEach"](function(c5){
"世界杯冠军"===c5||"亚洲杯冠军"===c5?cNats["push"](c5):cClubs["push"](c5);
});
(c2["nat"]&&cNats["push"](c2["nat"]));
(au["awards"]||[])["forEach"](function(c5){
c5["age"]===c2["age"]&&cAwards["push"](c5["name"]);
});
if(cClubs["length"]||cNats["length"]||cAwards["length"]){awardAny=!0x0;
awardBody+='<div class="tl-row done tl-cols award"><span class="age-chip"'+(c2["color"]?' style="background:'+c2["color"]+(';color:#fff"'):'')+'>'+c2["age"]+'</span>'
+'<span class="tl-badges">'+(cClubs["map"](function(c5){return '<span class="mini-badge">'+ax(c5)+'</span>';}))["join"]('')+'</span>'
+'<span class="tl-badges">'+(cNats["map"](function(c5){return '<span class="mini-badge nat">'+ax(c5)+'</span>';}))["join"]('')+'</span>'
+'<span class="tl-badges">'+(cAwards["map"](function(c5){return '<span class="mini-badge star">'+ax(c5)+'</span>';}))["join"]('')+'</span>'
+'</div>';
}
});
if(!awardAny)awardBody+='<div class="tl-row done tl-cols award"><span class="age-chip"></span><span class="tl-club-name" style="grid-column:2/5">整个生涯没有拿到任何奖杯</span></div>';
awardBody+='</div></div>';
/* 个人面板：事件+伤病+能力 */
var persBody='<div class="tl-panel hidden" data-panel="pers"><div class="tl-head tl-cols award"><span>年龄</span><span>事件</span><span>伤病</span><span>能力</span></div><div class="tl-scroll">';
var persEv=(au["eventLog"]||[]);
var persSeasons=(au["seasons"]||[]).map(function(c2){return{'age':c2["age"],'note':c2["note"]||(c2["injur"]?'伤病':''),'ovr':c2["ovrEnd"]||c2["ovr"]};});
(au["youthLog"]||[])["forEach"](function(c2){persSeasons["push"]({'age':c2["age"],'note':c2["cut"]?'青训淘汰':'', 'ovr':c2["ovr"]});});
var persAny=persEv["length"]||persSeasons["length"];
if(persEv["length"]||persSeasons["length"]){var persByAge={};
persSeasons["forEach"](function(c2){persByAge[c2["age"]]=c2;});
var persAges=[];
persEv["forEach"](function(c2){persAges["indexOf"](c2["age"])<0x0&&persAges["push"](c2["age"]);});
persSeasons["forEach"](function(c2){persAges["indexOf"](c2["age"])<0x0&&persAges["push"](c2["age"]);});
persAges["sort"](function(c2,c3){return c2-c3;});
persAges["forEach"](function(c2){var c3=persByAge[c2]||null,c4=persEv["filter"](function(c5){return c5["age"]===c2;});
persBody+='<div class="tl-row done tl-cols award"><span class="age-chip">'+c2+'</span>'
+'<span class="tl-badges">'+(c4["map"](function(c5){return '<span class="mini-badge evt" title="'+ax((c5["text"]||'')["replace"](/"/g,"&quot;"))+'">'+ax(c5["title"]||'事件')+'</span>';}))["join"]('')+'</span>'
+'<span class="tl-badges">'+(c3&&c3["note"]?'<span class="mini-badge bad">'+ax(c3["note"])+'</span>':'')+'</span>'
+'<span class="r"><span class="ovr-pill '+b5(c3?c3["ovr"]:0)+'">'+(c3?c3["ovr"]:'—')+'</span></span></div>';
});}
if(!persAny)persBody+='<div class="tl-row done tl-cols award"><span class="age-chip"></span><span class="tl-club-name" style="grid-column:2/5">还没有任何记录</span></div>';
persBody+='</div></div>';
/* 组装：各面板自包含，组装只包 timeline */
return '<div class="timeline">'+bY+clubBody+natBody+awardBody+persBody+'</div>';
}function ba(bW,bX,bY,bZ){
return "<button "+"class=\"o"+"pt\" data"+"-opt=\""+bW+("\"><span "+"class=\"o"+"pt-label"+'\x22>')+ax(bX)+"</span>"+(bZ?aT(bZ):'')+(bY?"<span cl"+"ass=\"opt"+"-hint\">"+ax(bY)+"</span>":'')+("</button"+'>');
}function bb(bW,bX){
return bW["length"]?"<div cla"+"ss=\"opts"+(bX?'\x20'+bX:'')+("\" data-n"+'=\x22')+bW["length"]+'\x22>'+bW["join"]('')+"</div>":'';
}var bc={'key':'','ord':null},bd=/^\s*(\d+)\s*%\s*([^\/]+?)\s*\/\s*(\d+)\s*%\s*(.+?)\s*$/;
function be(){
return "function"==typeof matchMedia&&matchMedia("(prefers"+"-reduced"+"-motion:"+" reduce)")["matches"];
}var bf=!0x1;
function bg(bW,bX,bY,bZ,c0){var c1=a6["leagueOf"+"Team"](bX),c2=["保级队","中下游",'中游','争冠','豪门',"顶级豪门"][bX["rep"]],c3=c0?a6["offerBri"+'ef'](bX['id']):null;
return "<button "+"class=\"o"+'pt'+(au["dreamId"]===bX['id']?" dream":'')+("\" data-o"+"pt=\"")+bW+'\x22>'+(bZ?"<span cl"+"ass=\"opt"+"-lead\">"+ax(bZ)+"</span>":'')+(au["dreamId"]===bX['id']?"<span cl"+"ass=\"opt"+"-dream\">"+"心仪</span"+'>':'')+("<span cl"+"ass=\"opt"+"-label\">")+ax(bY)+"</span>"+aT(bX)+("<span cl"+"ass=\"opt"+"-hint\">")+ax(c1["name"]+" · "+c2)+"</span>"+(c3?"<span cl"+"ass=\"opt"+"-offer\">"+"<b>"+ax(al(c3["wage"]))+("</b>/赛季"+c3["years"]+('年<span class="opt-role role-'))+c3["role"]+'\x22>'+ax(c3["roleName"])+("</span><"+"/span>"):'')+("</button"+'>');
}var bh=[[/欧冠/,"ucl"],[/欧联/,"uel"],[/亚冠/,"challeng"+'e'],[/世界杯冠军/,'wc'],[/打进世界杯/,"wcgold"],[/亚洲杯/,"asiancup"],[/亚洲足球先生/,"afcpoy"],
[/中超冠军/,"csl"],[/足协杯/,"cn-facup"],[/世俱杯/,"cwc"],[/金球/,"ballon"],[/金靴/,"boot"],[/金手套/,"glove"],[/最佳球员/,"best"],[/国王杯/,"kingcup"],
[/德国杯/,"dfb"],[/足总杯/,"facup"],[/意大利杯|法国杯|荷兰杯|葡萄牙杯|比利时杯|天皇杯|韩国杯|公开杯/,"pedestal"],[/冠军$/,"league"]];
function bi(bW){
for(var bX=String(bW||''),bY=0x0;
bY<bh["length"];
bY++)if(bh[bY][0x0]["test"](bX))return "assets/t"+"rophies/"+bh[bY][0x1]+".png";
return null;
}function bj(bW,bX){var bY=String(bW||''),bZ=bi(bY);
if(bZ)return "<img cla"+"ss=\"trop"+"hy "+(bX||'')+"\" src=\""+ax(bZ)+("\" alt=\"\""+" loading"+"=\"lazy\">");
var c0=/欧冠|亚冠|欧联/["test"](bY)?"ear":/世界杯冠军/["test"](bY)?'wc':/世俱杯/["test"](bY)?"globe":/金靴/["test"](bY)?"boot":/金手套/["test"](bY)?"glove":/金球/["test"](bY)?"ball":/打进世界杯|亚洲杯/["test"](bY)?"cup":/联赛|中超|中甲|英超|西甲|德甲|意甲|法甲|荷甲|葡超|日职|K联赛|沙特联|美职联|比甲|西乙|德乙|英冠/["test"](bY)?"shield":"cup",
c1="ear"===c0||"cup"===c0||"glove"===c0,c2=aV('tg');
return "<svg cla"+"ss=\"trop"+"hy "+(bX||'')+("\" viewBo"+"x=\"0 0 2"+"00 160\" "+"aria-hid"+"den=\"tru"+"e\"><defs"+"><linear"+"Gradient"+" id=\"")+c2+("\" x1=\".1"+"\" y1=\"0\""+" x2=\".7\""+" y2=\"1\">")+(c1?"<stop of"+"fset=\"0\""+" stop-co"+"lor=\"#ff"+"ffff\"/><"+"stop off"+"set=\".35"+"\" stop-c"+"olor=\"#d"+"5dee4\"/>"+"<stop of"+"fset=\".6"+"2\" stop-"+"color=\"#"+"9aa8b2\"/"+"><stop o"+"ffset=\"1"+"\" stop-c"+"olor=\"#6"+"d7a84\"/>":"<stop of"+"fset=\"0\""+" stop-co"+"lor=\"#ff"+"f3c4\"/><"+"stop off"+"set=\".35"+"\" stop-c"+"olor=\"#f"+"5cf62\"/>"+"<stop of"+"fset=\".6"+"2\" stop-"+"color=\"#"+"dda51f\"/"+"><stop o"+"ffset=\"1"+"\" stop-c"+"olor=\"#9"+"d6c0c\"/>")+("</linear"+"Gradient"+"></defs>")+("ear"===c0?"<path d="+"\"M72,26 "+"h56 c0,3"+"4 -10,54"+" -28,62 "+"c-18,-8 "+"-28,-28 "+"-28,-62 "+"z\" fill="+"\"url(#"+c2+(")\"/><pat"+"h d=\"M72"+",30 C36,"+"28 24,52"+" 32,76 C"+"39,96 58"+",100 72,"+"92\" fill"+"=\"none\" "+"stroke=\""+"url(#")+c2+(")\" strok"+"e-width="+"\"10\" str"+"oke-line"+"cap=\"rou"+"nd\"/><pa"+"th d=\"M1"+"28,30 C1"+"64,28 17"+"6,52 168"+",76 C161"+",96 142,"+"100 128,"+"92\" fill"+"=\"none\" "+"stroke=\""+"url(#")+c2+(")\" strok"+"e-width="+"\"10\" str"+"oke-line"+"cap=\"rou"+"nd\"/><re"+"ct x=\"94"+"\" y=\"88\""+" width=\""+"12\" heig"+"ht=\"24\" "+"fill=\"ur"+"l(#")+c2+(")\"/><ell"+"ipse cx="+"\"100\" cy"+"=\"118\" r"+"x=\"30\" r"+"y=\"8\" fi"+"ll=\"url("+'#')+c2+(")\"/><rec"+"t x=\"64\""+" y=\"122\""+" width=\""+"72\" heig"+"ht=\"14\" "+"rx=\"4\" f"+"ill=\"#00"+"04\"/>"):'wc'===c0?"<circle "+"cx=\"100\""+" cy=\"40\""+" r=\"19\" "+"fill=\"ur"+"l(#"+c2+(")\"/><pat"+"h d=\"M10"+"0,58 C86"+",58 78,7"+"2 82,90 "+"C86,106 "+"94,116 1"+"00,124 C"+"106,116 "+"114,106 "+"118,90 C"+"122,72 1"+"14,58 10"+"0,58 z\" "+"fill=\"ur"+"l(#")+c2+(")\"/><pat"+"h d=\"M10"+"0,62 v60"+"\" stroke"+"=\"#0003\""+" stroke-"+"width=\"3"+"\"/><rect"+" x=\"74\" "+"y=\"124\" "+"width=\"5"+"2\" heigh"+"t=\"10\" r"+"x=\"3\" fi"+"ll=\"url("+'#')+c2+(")\"/><rec"+"t x=\"64\""+" y=\"134\""+" width=\""+"72\" heig"+"ht=\"14\" "+"rx=\"4\" f"+"ill=\"#00"+"04\"/>"):"globe"===c0?"<circle "+"cx=\"100\""+" cy=\"60\""+" r=\"32\" "+"fill=\"ur"+"l(#"+c2+(")\"/><ell"+"ipse cx="+"\"100\" cy"+"=\"60\" rx"+"=\"13\" ry"+"=\"32\" fi"+"ll=\"none"+"\" stroke"+"=\"#0003\""+" stroke-"+"width=\"3"+"\"/><line"+" x1=\"68\""+" y1=\"60\""+" x2=\"132"+"\" y2=\"60"+"\" stroke"+"=\"#0003\""+" stroke-"+"width=\"3"+"\"/><rect"+" x=\"94\" "+"y=\"92\" w"+"idth=\"12"+"\" height"+"=\"22\" fi"+"ll=\"url("+'#')+c2+(")\"/><ell"+"ipse cx="+"\"100\" cy"+"=\"118\" r"+"x=\"28\" r"+"y=\"7\" fi"+"ll=\"url("+'#')+c2+(")\"/><rec"+"t x=\"66\""+" y=\"122\""+" width=\""+"68\" heig"+"ht=\"14\" "+"rx=\"4\" f"+"ill=\"#00"+"04\"/>"):"shield"===c0?"<path d="+"\"M100,20"+" L158,40"+" L158,84"+" C158,11"+"6 132,14"+"0 100,15"+"0 C68,14"+"0 42,116"+" 42,84 L"+"42,40 z\""+" fill=\"u"+"rl(#"+c2+(")\"/><pat"+"h d=\"M10"+"0,50 l11"+",23 25,3"+" -18,18 "+"4,25 -22"+",-12 -22"+",12 4,-2"+"5 -18,-1"+"8 25,-3 "+"z\" fill="+"\"#0002\"/"+'>'):"boot"===c0?"<path d="+"\"M54,60 "+"h30 c4,2"+"2 20,32 "+"44,36 c1"+"4,4 20,1"+"2 20,22 "+"v8 H54 z"+"\" fill=\""+"url(#"+c2+(")\"/><pat"+"h d=\"M54"+",96 h94\""+" stroke="+"\"#0002\" "+"stroke-w"+"idth=\"4\""+"/><rect "+"x=\"48\" y"+"=\"126\" w"+"idth=\"10"+"6\" heigh"+"t=\"14\" r"+"x=\"4\" fi"+"ll=\"#000"+"4\"/>"):"glove"===c0?"<path d="+"\"M64,56 "+"c0,-13 2"+"3,-13 23"+",0 v16 c"+"5,-17 27"+",-13 25,"+"2 c7,-13"+" 27,-9 2"+"5,6 l-5,"+"40 c-2,1"+"9 -19,28"+" -37,28 "+"c-21,0 -"+"33,-13 -"+"33,-31 z"+"\" fill=\""+"url(#"+c2+(")\"/><pat"+"h d=\"M70"+",110 h58"+"\" stroke"+"=\"#0002\""+" stroke-"+"width=\"5"+"\"/>"):"ball"===c0?"<circle "+"cx=\"100\""+" cy=\"56\""+" r=\"32\" "+"fill=\"ur"+"l(#"+c2+(")\"/><pat"+"h d=\"M10"+"0,34 l13"+",10 -5,1"+"5 h-16 l"+"-5,-15 z"+"\" fill=\""+"#0003\"/>"+"<path d="+"\"M74,44 "+"l8,14 M1"+"26,44 l-"+"8,14 M84"+",80 l6,-"+"12 M116,"+"80 l-6,-"+"12\" stro"+"ke=\"#000"+"3\" strok"+"e-width="+"\"3\"/><re"+"ct x=\"92"+"\" y=\"88\""+" width=\""+"16\" heig"+"ht=\"20\" "+"fill=\"ur"+"l(#")+c2+(")\"/><pat"+"h d=\"M70"+",108 h60"+" l8,28 h"+"-76 z\" f"+"ill=\"url"+'(#')+c2+")\"/>":"<path d="+"\"M70,30 "+"h60 c0,2"+"8 -10,44"+" -30,50 "+"c-20,-6 "+"-30,-22 "+"-30,-50 "+"z\" fill="+"\"url(#"+c2+(")\"/><pat"+"h d=\"M70"+",34 C48,"+"32 40,48"+" 46,62 C"+"51,73 62"+",76 70,7"+"2\" fill="+"\"none\" s"+"troke=\"u"+"rl(#")+c2+(")\" strok"+"e-width="+"\"9\" stro"+"ke-linec"+"ap=\"roun"+"d\"/><pat"+"h d=\"M13"+"0,34 C15"+"2,32 160"+",48 154,"+"62 C149,"+"73 138,7"+"6 130,72"+"\" fill=\""+"none\" st"+"roke=\"ur"+"l(#")+c2+(")\" strok"+"e-width="+"\"9\" stro"+"ke-linec"+"ap=\"roun"+"d\"/><rec"+"t x=\"94\""+" y=\"80\" "+"width=\"1"+"2\" heigh"+"t=\"24\" f"+"ill=\"url"+'(#')+c2+(")\"/><ell"+"ipse cx="+"\"100\" cy"+"=\"110\" r"+"x=\"26\" r"+"y=\"7\" fi"+"ll=\"url("+'#')+c2+(")\"/><rec"+"t x=\"68\""+" y=\"114\""+" width=\""+"64\" heig"+"ht=\"14\" "+"rx=\"4\" f"+"ill=\"#00"+"04\"/>"))+"</svg>";
}function bk(){var bW={},bX=[];
function bY(bZ){
bW[bZ]||(bW[bZ]=0x0,bX["push"](bZ)),bW[bZ]++;
}return au["trophies"]["forEach"](function(bZ){
bY(bZ["name"]);
}),au["awards"]["forEach"](function(bZ){
bY(bZ["name"]);
}),bX["map"](function(bZ){return{'name':bZ,'count':bW[bZ]};
});
}function bl(){var bW={},bX=[];
return au["seasons"]["forEach"](function(bY){
if(bY["teamId"]){bW[bY["teamId"]]||(bW[bY["teamId"]]={'teamId':bY["teamId"],'name':bY["teamName"],'color':bY["color"],'apps':0x0,'goals':0x0,'assists':0x0,'cs':0x0,'ga':0x0,'trophies':[],'from':bY["age"],'to':bY["age"],'seasons':0x0},bX["push"](bY["teamId"]));
var bZ=bW[bY["teamId"]];
bY["age"]<bZ["from"]&&(bZ["from"]=bY["age"]),bY["age"]>bZ['to']&&(bZ['to']=bY["age"]),bZ["seasons"]++,bZ["apps"]+=bY["apps"],
bZ["goals"]+=bY["goals"],bZ["assists"]+=bY["assists"],bZ['cs']+=bY['cs'],bZ['ga']+=bY['ga'],bY["trophies"]["forEach"](function(c0){
/世界杯|亚洲杯/["test"](c0)||bZ["trophies"]["push"](c0);
});
}}),bX["map"](function(bY){return bW[bY];
});
}function bm(bW){
for(var bX=0x0;
bX<a0["ENDINGS"]["length"];
bX++)if(a0["ENDINGS"][bX]['id']===bW)return a0["ENDINGS"][bX];
return a0["ENDINGS"][a0["ENDINGS"]["length"]-0x1];
}var bn=[{'re':/^世界杯冠军$/,'label':"世界杯冠军",'rank':0x1},{'re':/^金球奖$/,'label':"金球奖",'rank':0x2},{'re':/^欧冠冠军$/,'label':"欧冠冠军",
'rank':0x3},{'re':/^亚洲杯冠军$/,'label':"亚洲杯冠军",'rank':0x4},{'re':/^亚洲足球先生$/,'label':"亚洲足球先生",'rank':0x5},{'re':/^欧洲金靴$/,'label':"欧洲金靴",
'rank':0x6},{'re':/^金手套$/,'label':"金手套",'rank':0x6},{'re':/^(英超|西甲|意甲|德甲|法甲)冠军$/,'label':"联赛冠军",'rank':0x7},{'re':/^欧联冠军$/,
'label':"欧联冠军",'rank':0x8},{'re':/^世俱杯冠军$/,'label':"世俱杯冠军",'rank':0x9},{'re':/^中超最佳球员$/,'label':"中超最佳球员",'rank':0xa},{'re':/^中超冠军$/,
'label':"中超冠军",'rank':0xb},{'re':/^足协杯冠军$/,'label':"足协杯冠军",'rank':0xc},{'re':/杯冠军$/,'label':"杯赛冠军",'rank':0xd}],bo=["没走到那一步",
"抹不掉的",'封神','巅峰','出色',"怎么收场","走过的路",'兜底'];
function bp(bW){
return bW["endings"]&&bW["endings"]["length"]?bW["endings"]:bW["ending"]?[bW["ending"]]:[];
}function bq(){
bM("view-cod"+'ex'),(function(){var bW=aG(),bX={},bY={},bZ={};
bW["forEach"](function(c5){
bp(c5)["forEach"](function(c6){bX[c6]||(bX[c6]=0x1);
}),c5["ending"]&&(bX[c5["ending"]]=0x2,bY[c5["ending"]]=(bY[c5["ending"]]||0x0)+0x1,c5["endingTi"+"tle"]&&!bZ[c5["ending"]]&&(bZ[c5["ending"]]=c5["endingTi"+"tle"]));
});
var c0=a0["ENDINGS"]["length"],c1=0x0;
a0["ENDINGS"]["forEach"](function(c5){bX[c5['id']]&&c1++;
});
var c2="<div cla"+"ss=\"sect"+"ion-head"+"\"><h2>结局"+"图鉴</h2><"+"span>"+c1+" / "+c0+("</span><"+"/div><di"+"v class="+"\"codex-b"+"ar\"><div"+" class=\""+"codex-ba"+"r-fill\" "+"style=\"w"+"idth:")+(c0?Math["round"](c1/c0*0x64):0x0)+("%\"></div"+"></div><"+"div clas"+"s=\"codex"+"-note\">见"+"过的会亮起来。没"+"见过的只写达成条"+"件 —— 一条生"+"涯只会落到其中一"+"条上，同时满足几"+"条时，越靠上的越"+"先算。标着「够到"+"过」的，是那一局"+"条件也满足了、只"+"是被更重的那条压"+"下去没说出口。<"+"/div>"),
c3={},c4=[];
a0["ENDINGS"]["forEach"](function(c5){var c6=null==c5["tier"]?0x7:c5["tier"];
c3[c6]||(c3[c6]=[],c4["push"](c6)),c3[c6]["push"](c5);
}),c4["sort"](function(c5,c6){return c5-c6;
}),c4["forEach"](function(c5){
c2+="<div cla"+"ss=\"code"+"x-tier\">"+ax(bo[c5]||'第\x20'+c5+'\x20档')+"<span>"+c3[c5]["filter"](function(c6){return bX[c6['id']];
})["length"]+" / "+c3[c5]["length"]+("</span><"+"/div>"),c2+="<div cla"+"ss=\"code"+"x-grid\">"+c3[c5]["map"](function(c6){var c7=bX[c6['id']]||0x0,c8=c7>0x0,c9=function(cc){var cd=[cc["title"]];
if(cc["pos"]){for(var ce in cc["pos"])if(Object["prototyp"+'e']["hasOwnPr"+"operty"]["call"](cc["pos"],ce)){var cf=cc["pos"][ce]&&cc["pos"][ce]["title"];
cf&&cd["indexOf"](cf)<0x0&&cd["push"](cf);
}}return cd;
}(c6),ca=0x2===c7&&bZ[c6['id']]||c6["title"],cb=c9["filter"](function(cc){return cc!==ca;
});
return "<div cla"+"ss=\"code"+"x-item"+(0x2===c7?" got":0x1===c7?" touch":'')+("\"><div c"+"lass=\"co"+"dex-titl"+"e\">")+(c8?ax(ca):"？？？")+(bY[c6['id']]>0x1?"<span cl"+"ass=\"cod"+"ex-x\">×"+bY[c6['id']]+"</span>":'')+(0x1===c7?"<span cl"+"ass=\"cod"+"ex-touch"+"\">够到过</s"+"pan>":'')+"</div>"+(c8&&cb["length"]?"<div cla"+"ss=\"code"+"x-alias\""+">按位置也叫："+ax(cb["join"]('、'))+"</div>":'')+("<div cla"+"ss=\"code"+"x-desc\">")+ax(c8?c6["desc"]:c6["hint"]||'')+"</div>"+(c8&&c6["hint"]?"<div cla"+"ss=\"code"+"x-hint\">"+ax(c6["hint"])+"</div>":'')+(c8&&c6["bonus"]?"<div style=\"margin-top:.4rem;padding:.35rem .5rem;background:rgba(212,175,55,.12);border:1px solid rgba(212,175,55,.35);border-radius:.35rem;font-size:.72rem;color:#d4af37\">加成："+cBch(c6)+"</div>":'')+"</div>";
})["join"]('')+"</div>";
}),c2+="<div cla"+"ss=\"btn-"+"stack\"><"+"button c"+"lass=\"bt"+"n btn-pr"+"imary\" d"+"ata-act="+"\"codex-b"+"ack\">回首页"+"</button"+"></div>",
aw("codex-ar"+'ea')["innerHTM"+'L']=c2;
}());
}function br(bW){var bX=aG()[bW];
bX&&bH(function(bY){
return{'name':bY["name"],'gen':bY["gen"]||0x1,'number':bY["number"],'posId':ah(bY["pos"])['id'],'posName':ah(bY["pos"])["name"],
'group':bY["group"]||ah(bY["pos"])["group"],'originName':ak(bY["originId"])["name"],'maxOvr':bY["maxOvr"],'age':bY["age"],
'seasons':bY["seasons"],'clubCount':(bY["clubs"]||[])["length"],'apps':bY["apps"],'goals':bY["goals"],'assists':bY["assists"],
'cs':bY['cs'],'ga':bY['ga'],'caps':bY["caps"],'money':bY["money"],'spells':(bY["clubs"]||[])["map"](function(bZ){
return{'teamId':bZ['id'],'color':bZ["color"]};
}),'honours':bY["honours"]||[],'nat':bY["nat"]||[],'endingTitle':bY["endingTi"+"tle"]||'','endingChoices':bY["endings"]&&bY["endings"]["length"]>0x1?bD(bY["endings"],
bY["ending"],bY["group"]||ah(bY["pos"])["group"])["map"](function(bZ){
return bZ['id']===bY["ending"]&&bY["endingTi"+"tle"]?{'id':bZ['id'],'title':bY["endingTi"+"tle"]}:bZ;
}):[],'legacy':aE(bY)};
}(bX));
}function bs(){
bM("view-arc"+"hive"),(function(){var bW=aG(),bX=aH(bW),bY="<div cla"+"ss=\"sect"+"ion-head"+"\"><h2>生涯"+"历史档案</h2"+"><span>"+(bW["length"]?bW["length"]+'\x20段':'')+("</span><"+"/div>");
if(!bW["length"])return bY+="<div cla"+"ss=\"arc-"+"empty\">还"+"没有退役过的生涯"+"。<br>走完一"+"局，这里会留下一"+"份。</div>"+"<div cla"+"ss=\"btn-"+"stack\"><"+"button c"+"lass=\"bt"+"n btn-pr"+"imary\" d"+"ata-act="+"\"arc-bac"+"k\">回首页</"+"button><"+"/div>",
void(aw("archive-"+"area")["innerHTM"+'L']=bY);
bY+="<div cla"+"ss=\"arc-"+"stats\"><"+"div><b>"+bX["lives"]+("</b><spa"+"n>段生涯</s"+"pan></di"+"v><div><"+'b>')+bX["endings"]+" / "+bX["total"]+("</b><spa"+"n>见过的结局<"+"/span></"+"div><div"+"><b>")+bX["best"]+("</b><spa"+"n>最高 OVR"+"</span><"+"/div></d"+"iv>"),
bY+="<div cla"+"ss=\"arc-"+"list\">"+bW["map"](function(bZ,c0){var c1=bZ["youthCut"]?[bZ["age"]+'\x20岁',(bZ["youthPat"+"hName"]||'青训')+" 第 "+Math["max"](0x1,bZ["age"]-0xb)+" 年被刷下来"]["join"](" · "):[bZ["age"]+'\x20岁',bZ["seasons"]+" 个赛季",(bZ["clubs"]?bZ["clubs"]["length"]:0x0)+" 家俱乐部"]["join"](" · ");
return "<div cla"+"ss=\"arc-"+"item\" da"+"ta-arc=\""+c0+("\"><div c"+"lass=\"ar"+"c-head\">"+"<div cla"+"ss=\"ovr-"+"badge sm"+'\x20')+b5(bZ["maxOvr"])+("\"><div c"+"lass=\"ov"+"r-badge-"+"l\">OVR</"+"div><div"+" class=\""+"ovr-badg"+"e-v\">")+bZ["maxOvr"]+("</div></"+"div><div"+" class=\""+"arc-main"+"\"><div c"+"lass=\"ar"+"c-name\">")+ax(bZ["name"])+(bZ["gen"]>0x1?"<span cl"+"ass=\"arc"+"-gen\">第 "+bZ["gen"]+(" 世</span"+'>'):'')+("</div><d"+"iv class"+"=\"arc-en"+"ding\">")+ax(bZ["endingTi"+"tle"]||'')+("</div><d"+"iv class"+"=\"arc-me"+"ta\">")+c1+("</div></"+"div><div"+" class=\""+"arc-righ"+"t\"><div "+"class=\"a"+"rc-when\""+'>')+ax(function(c2){var c3=Date["now"]()-(Number(c2)||0x0);
if(!(c3>=0x0))return'';
var c4=Math["floor"](c3/0xea60);
if(c4<0x1)return'刚刚';
if(c4<0x3c)return c4+" 分钟前";
var c5=Math["floor"](c4/0x3c);
if(c5<0x18)return c5+" 小时前";
var c6=Math["floor"](c5/0x18);
if(c6<0x1e)return c6+" 天前";
var c7=new Date(Number(c2));
return c7["getMonth"]()+0x1+" 月 "+c7["getDate"]()+'\x20日';
}(bZ['at']))+("</div><d"+"iv class"+"=\"arc-mo"+"re\">总结卡 "+"›</div><"+"/div></d"+"iv>")+(null!=bZ["seed"]?"<div cla"+"ss=\"arc-"+"seed\"><s"+"pan clas"+"s=\"seed-"+"l\">种子</s"+"pan><cod"+"e class="+"\"seed-v\""+'>'+ax(String(bZ["seed"]))+("</code><"+"button c"+"lass=\"mi"+"ni-btn\" "+"data-act"+"=\"copy-s"+"eed\" dat"+"a-seed=\"")+ax(String(bZ["seed"]))+("\">复制</bu"+"tton></d"+"iv>"):'')+"</div>";
})["join"]('')+"</div>",bY+="<div cla"+"ss=\"btn-"+"stack\"><"+"button c"+"lass=\"bt"+"n btn-pr"+"imary\" d"+"ata-act="+"\"arc-bac"+"k\">回首页</"+"button><"+"button c"+"lass=\"bt"+"n arc-cl"+"ear\" dat"+"a-act=\"a"+"rc-clear"+"\">清空档案</"+"button><"+"/div>",
aw("archive-"+"area")["innerHTM"+'L']=bY;
}());
}var bu=0x168,bv=0x3,bw=!0x0,bx=null;
function by(bW){return new Promise(function(bX){var bY=new Image();
bY["onload"]=function(){bX(bY);
},bY["onerror"]=function(){bX(null);
},bY["src"]=bW;
});
}function bz(bW,bX,bY,bZ,c0,c1){
c1=Math["min"](c1,bZ/0x2,c0/0x2),bW["beginPat"+'h'](),bW["moveTo"](bX+c1,bY),bW["arcTo"](bX+bZ,bY,bX+bZ,bY+c0,c1),bW["arcTo"](bX+bZ,
bY+c0,bX,bY+c0,c1),bW["arcTo"](bX,bY+c0,bX,bY,c1),bW["arcTo"](bX,bY,bX+bZ,bY,c1),bW["closePat"+'h']();
}function bA(bW,bX){
return(bX||0x190)+'\x20'+bW+("px \"Inte"+"r\", \"Pin"+"gFang SC"+"\", \"Micr"+"osoft Ya"+"Hei\", sa"+"ns-serif");
}function bB(bW,bX,bY){
bW["font"]=bA(0x9,0x2ee),bW["fillStyl"+'e']="rgba(255"+",255,255"+",.42)",bW["textAlig"+'n']="center";
var bZ=String(bX)["split"]('')["join"]('\x20');
bW["fillText"](bZ,bu/0x2,bY);
}function bC(){
return{'name':au["name"],'gen':au["gen"]||0x1,'number':au["number"],'posId':ah(au["pos"])['id'],'posName':ah(au["pos"])["name"],
'group':ah(au["pos"])["group"],'originName':ak(au["originId"])["name"],'maxOvr':Math["round"](au["maxOvr"]),'age':au["age"],
'seasons':au["seasons"]["length"],'clubCount':au["clubsPla"+"yed"]["length"],'apps':au["totals"]["apps"],'goals':au["totals"]["goals"],
'assists':au["totals"]["assists"],'cs':au["totals"]['cs'],'ga':au["totals"]['ga'],'caps':au["caps"],'money':au["money"],'spells':bl()["map"](function(bW){
return{'teamId':bW["teamId"],'color':bW["color"]};
}),'honours':bk(),'nat':ap(),'endingTitle':a0["endingVi"+'ew'](bm(au["ending"]),ah(au["pos"])["group"])["title"],'endingChoices':bD(au["endingsA"+'ll'],
au["ending"],ah(au["pos"])["group"])};
}function bD(bW,bX,bY){
return(bW&&bW["length"]?bW["slice"]():bX?[bX]:[])["map"](bm)["filter"](Boolean)["sort"](function(bZ,c0){
return bZ['id']===bX?-0x1:c0['id']===bX?0x1:(null==bZ["tier"]?0x9:bZ["tier"])-(null==c0["tier"]?0x9:c0["tier"]);
})["map"](function(bZ){
return{'id':bZ['id'],'title':a0["endingVi"+'ew'](bZ,bY)["title"]};
});
}function bE(bW){var bX=aw("share-ca"+"nvas");
if(!bX||!bX["getConte"+'xt'])return Promise["resolve"]();
var bY=(bW=bW||bG||bC())["group"],bZ=bW["spells"],c0=bW["honours"],c1=bZ["map"](function(c2){var c3=ag(c2["teamId"]),c4=c3&&window["CREST_UR"+'LS']&&window["CREST_UR"+'LS'][c3['id']];
return c4?by(c4["replace"](/\.webp$/,".png")):Promise["resolve"](null);
})["concat"](c0["map"](function(c2){var c3=bi(c2["name"]);
return c3?by(c3):Promise["resolve"](null);
}));
return Promise["all"](c1)["then"](function(c2){var c3=c2["slice"](0x0,bZ["length"]),c4=c2["slice"](bZ["length"]),c5=0x0,c6=0x10,c7=0x6e,c8=c5=0x7e,c9=Math["ceil"](bZ["length"]/0x6)||0x0,ca=c9?Math["ceil"](bZ["length"]/c9):0x0;
bZ["length"]&&(c5+=0xe+0x32*(c9-0x1)+0x2e+0x12);
var cb=c5,cc=c0["length"]>0xa?0x6:c0["length"]>0x8?0x5:0x4,cd=Math["ceil"](c0["length"]/cc)||0x0,ce=cd?Math["ceil"](c0["length"]/cd):0x0,
cf=ce?Math["min"](0x3e,(bu-0x20)/ce):0x0;
c0["length"]&&(c5+=0xe+0x3e*cd+0xe);
var cg=c5+0x2,ch=(c5=cg+0x3a+0x8)+0x6,ci=ch+0x40,cj=bv;
bX["width"]=bu*cj,bX["height"]=ci*cj;
var ck=bX["getConte"+'xt']('2d');
ck["setTrans"+"form"](cj,0x0,0x0,cj,0x0,0x0),ck["textBase"+"line"]="alphabet"+'ic',ck["fillStyl"+'e']="#12140f",bz(ck,0x0,
0x0,bu,ci,0xe),ck["fill"](),ck["strokeSt"+"yle"]="rgba(255"+",255,255"+",.09)",ck["lineWidt"+'h']=0x1,bz(ck,0.5,0.5,bu-0x1,
ci-0x1,0xe),ck["stroke"](),ck["fillStyl"+'e']=function(cF,cG){var cH=cF["createLi"+"nearGrad"+"ient"](0x10,0x10,0x4e,0x5a),
cI="plat"===cG?["#fffaea","#e8ac3c"]:"gold"===cG?["#ffd75e","#d99b1c"]:"silver"===cG?["#cfd8de","#8d9aa6"]:"bronze"===cG?["#c98a45","#8f5a22"]:["#8a6a44","#5f4426"];
return cH["addColor"+"Stop"](0x0,cI[0x0]),cH["addColor"+"Stop"](0x1,cI[0x1]),cH;
}(ck,b5(bW["maxOvr"])),bz(ck,0x10,0x10,0x3e,0x4a,0xa),ck["fill"](),ck["textAlig"+'n']="center",ck["fillStyl"+'e']="rgba(0,0"+",0,.55)",
ck["font"]=bA(0x8,0x2bc),ck["fillText"]("O V R",0x2f,0x24),ck["fillStyl"+'e']="#16110a",ck["font"]=bA(0x1f,0x320),ck["fillText"](String(bW["maxOvr"]),
0x2f,0x44);
var cl=0x58;
[{'t':bW["originNa"+'me']},{'t':am(an(bW["maxOvr"],0x1a)),'sub':"最高身价"},{'t':'#'+bW["number"]},{'t':bW["posId"],'accent':!0x0}]["forEach"](function(cF){
ck["font"]=bA(cF["sub"]?0xb:0xc,0x2ee);
var cG=ck["measureT"+"ext"](cF['t'])["width"]+0x12;
cF["sub"]&&(cG+=0x4),ck["fillStyl"+'e']=cF["accent"]?"rgba(74,"+"222,128,"+".16)":"rgba(255"+",255,255"+",.06)",bz(ck,cl,0x10,
cG,0x1a,0x7),ck["fill"](),ck["fillStyl"+'e']=cF["accent"]?"#4ade80":"#e6ece4",ck["textAlig"+'n']="center",ck["fillText"](cF['t'],
cl+cG/0x2,0x22),cl+=cG+0x6;
});
var cm=bu-c6-0x58;
ck["fillStyl"+'e']="rgba(255"+",255,255"+",.045)",bz(ck,0x58,0x30,cm,0x2a,0x8),ck["fill"](),('gk'===bY?[['出场',bW["apps"]],['零封',bW['cs']],['失球',bW['ga']]]:[['出场',bW["apps"]],['进球',bW["goals"]],['助攻',bW["assists"]]])["forEach"](function(cF,cG){var cH=cm/0x3,cI=0x58+cH*cG+cH/0x2;
ck["textAlig"+'n']="center",ck["fillStyl"+'e']="rgba(255"+",255,255"+",.42)",ck["font"]=bA(0x8,0x2bc),ck["fillText"](cF[0x0]["split"]('')["join"]('\x20'),
cI,0x3f),ck["fillStyl"+'e']="#f2f6ef",ck["font"]=bA(0x11,0x320),ck["fillText"](String(cF[0x1]),cI,0x52),cG&&(ck["strokeSt"+"yle"]="rgba(255"+",255,255"+",.08)",
ck["beginPat"+'h'](),ck["moveTo"](0x58+cH*cG,0x38),ck["lineTo"](0x58+cH*cG,0x52),ck["stroke"]());
});
var cn,co=bW["seasons"]+" 个赛季 · "+bW["clubCoun"+'t']+" 家俱乐部";
if(ck["textAlig"+'n']="left",bw){ck["font"]=bA(0xf,0x320);
var cp=ck["measureT"+"ext"](bW["name"])["width"];
ck["fillStyl"+'e']="#f2f6ef",ck["fillText"](bW["name"],c6,c7),ck["font"]=bA(0xa,0x258),ck["fillStyl"+'e']="rgba(255"+",255,255"+",.4)",
cn=c6+cp+0x9,ck["fillText"](co,cn,c7);
}else ck["font"]=bA(0xb,0x28a),ck["fillStyl"+'e']="rgba(255"+",255,255"+",.5)",cn=c6,ck["fillText"](co,cn,c7);
if((bW["gen"]||0x1)>0x1){var cq='第\x20'+bW["gen"]+'\x20世';
ck["font"]=bw?bA(0xa,0x258):bA(0xb,0x28a);
var cr=cn+ck["measureT"+"ext"](co)["width"]+0x8;
ck["font"]=bA(0xa,0x320);
var cs=ck["measureT"+"ext"](cq)["width"]+0xc;
ck["fillStyl"+'e']="rgba(226"+",180,86,"+".18)",bz(ck,cr,0x63,cs,0xf,0x5),ck["fill"](),ck["strokeSt"+"yle"]="rgba(226"+",180,86,"+".55)",
ck["lineWidt"+'h']=0x1,bz(ck,cr+0.5,99.5,cs-0x1,0xe,0x5),ck["stroke"](),ck["fillStyl"+'e']="#e8c477",ck["textAlig"+'n']="center",
ck["fillText"](cq,cr+cs/0x2,c7),ck["textAlig"+'n']="left";
}if(bZ["length"]&&(bB(ck,"效力过",c8+0xa),bZ["forEach"](function(cF,cG){var cH=Math["floor"](cG/ca),cI=Math["min"](ca,bZ["length"]-cH*ca),cJ=(bu-(0x28*cI+0xa*(cI-0x1)))/0x2,cK=c3[cG],cL=cJ+cG%ca*0x32,cM=c8+0x14+0x32*cH;
if(cK){var cN=Math["min"](0x28/cK["width"],0x28/cK["height"]);
ck["drawImag"+'e'](cK,cL+(0x28-cK["width"]*cN)/0x2,cM+(0x28-cK["height"]*cN)/0x2,cK["width"]*cN,cK["height"]*cN);
}else ck["fillStyl"+'e']=cF["color"]||"#39423a",bz(ck,cL+0x4,cM+0x4,0x20,0x20,0x8),ck["fill"]();
})),c0["length"]){bB(ck,'荣誉',cb+0xa);
var cu=ce;
c0["forEach"](function(cF,cG){var cH,cI,cJ=Math["floor"](cG/cu),cK=Math["min"](cu,c0["length"]-cJ*cu),cL=(bu-cK*cf)/0x2+cG%cu*cf,cM=cb+0x14+0x3e*cJ,cN=c4[cG];
if(cN){var cO=0x26/cN["height"];
ck["drawImag"+'e'](cN,cL+(cf-cN["width"]*cO)/0x2,cM,cN["width"]*cO,0x26);
}if(cF["count"]>0x1){ck["font"]=bA(0x9,0x320);
var cP='×'+cF["count"],cQ=ck["measureT"+"ext"](cP)["width"]+0xa,cR=Math["min"](cL+cf/0x2+0x8,cL+cf-cQ-0x1);
ck["fillStyl"+'e']="#12140f",bz(ck,cR,cM+0x18,cQ,0xe,0x7),ck["fill"](),ck["strokeSt"+"yle"]="rgba(255"+",255,255"+",.28)",
ck["lineWidt"+'h']=0x1,bz(ck,cR+0.5,cM+24.5,cQ-0x1,0xd,0x7),ck["stroke"](),ck["fillStyl"+'e']="#e6ece4",ck["textAlig"+'n']="center",
ck["fillText"](cP,cR+cQ/0x2,cM+0x22);
}ck["textAlig"+'n']="center",ck["fillStyl"+'e']="rgba(255"+",255,255"+",.6)",ck["font"]=bA(0x8,0x28a),ck["fillText"]((cH=cF["name"],
(cI=String(cH||'')["replace"](/冠军$/,''))["length"]>0x6?cI["slice"](0x0,0x5)+'…':cI),cL+cf/0x2,cM+0x32);
}),ck["textAlig"+'n']="left";
}var cv=bu-0x20,cw=ck["createLi"+"nearGrad"+"ient"](0x0,cg,0x0,cg+0x3a);
cw["addColor"+"Stop"](0x0,"rgba(226"+",180,86,"+".22)"),cw["addColor"+"Stop"](0x1,"rgba(226"+",180,86,"+".05)"),ck["fillStyl"+'e']=cw,
bz(ck,0x10,cg,cv,0x3a,0xa),ck["fill"](),ck["strokeSt"+"yle"]="rgba(226"+",180,86,"+".55)",ck["lineWidt"+'h']=0x1,bz(ck,16.5,
cg+0.5,cv-0x1,0x39,0xa),ck["stroke"]();
var cx=ck["createLi"+"nearGrad"+"ient"](0x10,0x0,0x10+cv,0x0);
cx["addColor"+"Stop"](0x0,"rgba(226"+",180,86,"+'0)'),cx["addColor"+"Stop"](0.5,"rgba(255"+",214,130"+",.95)"),cx["addColor"+"Stop"](0x1,
"rgba(226"+",180,86,"+'0)'),ck["strokeSt"+"yle"]=cx,ck["beginPat"+'h'](),ck["moveTo"](0x1c,cg+0.5),ck["lineTo"](0x10+cv-0xc,
cg+0.5),ck["stroke"](),ck["textAlig"+'n']="center";
var cy=bW["gen"]||0x1;
ck["fillStyl"+'e']="rgba(226"+",180,86,"+".8)",ck["font"]=bA(0x8,0x2ee),ck["fillText"](cy>0x1?'第\x20'+cy+" 世 · 结 局":"结 局",
bu/0x2,cg+0x12);
var cz=0x15;
for(ck["font"]=bA(cz,0x320);
cz>0xd&&ck["measureT"+"ext"](bW["endingTi"+"tle"])["width"]>cv-0x1c;
)cz-=0x1,ck["font"]=bA(cz,0x320);
var cA=ck["createLi"+"nearGrad"+"ient"](0x0,cg+0x18,0x0,cg+0x30);
cA["addColor"+"Stop"](0x0,"#ffe9b0"),cA["addColor"+"Stop"](0.55,"#e2b456"),cA["addColor"+"Stop"](0x1,"#c68f33"),ck["shadowCo"+"lor"]="rgba(226"+",180,86,"+".6)",
ck["shadowBl"+'ur']=0x10,ck["fillStyl"+'e']=cA,ck["fillText"](bW["endingTi"+"tle"],bu/0x2,cg+0x2c),ck["shadowBl"+'ur']=0x0,
ck["shadowCo"+"lor"]="transpar"+"ent",ck["textAlig"+'n']="left",ck["strokeSt"+"yle"]="rgba(255"+",255,255"+",.08)",ck["lineWidt"+'h']=0x1,
ck["beginPat"+'h'](),ck["moveTo"](c6,ch),ck["lineTo"](bu-c6,ch),ck["stroke"]();
var cB=function(cF,cG,cH,cI){
if(!cG||!window['QR'])return 0x0;
var cJ=window['QR']["make"](cG);
if(!cJ)return 0x0;
var cK=cJ["length"],cL=Math["floor"](0x2e*bv/(cK+0x4))/bv;
if(cL<=0x0)return 0x0;
var cM=cL*(cK+0x4);
cF["fillStyl"+'e']="#ffffff",bz(cF,cH,cI,cM,cM,0x3),cF["fill"](),cF["fillStyl"+'e']="#12140f";
for(var cN=0x0;
cN<cK;
cN++)for(var cO=0x0;
cO<cK;
cO++)cJ[cN][cO]&&cF["fillRect"](cH+(cO+0x2)*cL,cI+(cN+0x2)*cL,cL,cL);
return cM;
}(ck,(function(){
if(a5)return "https://"+a5+'/';
try{return location["origin"]&&"null"!==location["origin"]?(location["origin"]+location["pathname"])["replace"](/index\.html$/,''):'';
}catch(cF){return'';
}}()),bu-c6-0x2e,ch+0x9),cC=cB?bu-c6-cB-0xe:bu-c6;
ck["textAlig"+'n']="left",ck["fillStyl"+'e']="rgba(255"+",255,255"+",.42)",ck["font"]=bA(0x9,0x258),ck["fillText"]("来走一遍你自己的"+'生涯',
c6,ch+0x14),ck["fillStyl"+'e']="rgba(255"+",255,255"+",.28)",ck["font"]=bA(0x8,0x258),ck["fillText"]("bilibili"+" · 神来我也日",
c6,ch+0x21),ck["textAlig"+'n']="right";
var cD=(function(){
if(a5)return a5;
try{var cF=location["hostname"];
return cF&&"localhos"+'t'!==cF&&"127.0.0."+'1'!==cF?cF:a3;
}catch(cG){return a3;
}}()),cE=cD!==a3;
ck["fillStyl"+'e']="#e6ece4",ck["font"]=bA(8.5,0x2ee),ck["fillText"](a3,cC,ch+(cE?0x18:0x1e)),cE&&(ck["fillStyl"+'e']="#4ade80",
ck["font"]=bA(7.5,0x2bc),ck["fillText"](cD,cC,ch+0x24)),bx=null,(function(){var cF=aw("share-ca"+"nvas"),cG=aw("share-im"+'g'),cH=aw("share-ti"+'p');
if(cF&&cG&&cF["toDataUR"+'L']&&bF()){try{cG["src"]=cF["toDataUR"+'L']("image/pn"+'g');
}catch(cI){return;
}cF["classLis"+'t']["add"]("hidden"),cG["classLis"+'t']["remove"]("hidden"),cH&&(cH["textCont"+"ent"]="长按上面这张图 "+"→ 发送给朋友 "+"/ 保存图片",
cH["classLis"+'t']["remove"]("hidden"));
}}());
});
}function bF(){
try{return/micromessenger/i["test"](navigator["userAgen"+'t']);
}catch(bW){return!0x1;
}}var bG=null;
function bH(bW){
bG=bW||bC(),bw=!0x0;
var bX=aw("share-na"+'me');
bX&&(bX["checked"]=!0x0);
var bY=aw("share-ey"+"ebrow");
return bY&&(bY["textCont"+"ent"]=(bG["gen"]||0x1)>0x1?'第\x20'+bG["gen"]+(" 世 · 生涯结"+'束'):"生涯结束"),function(bZ){var c0=aw("share-ne"+"xtlife");
if(c0){var c1=bZ&&bZ["legacy"];
if(c0["classLis"+'t']["toggle"]("hidden",!c1),c1){var c2=[];
c1["ovr"]&&c2["push"]("能力 +"+c1["ovr"]),c1["talent"]&&c2["push"]("天赋 +"+c1["talent"]["toFixed"](0x2)),c1["guanxi"]&&c2["push"]("关系 +"+c1["guanxi"]),
c1["money"]&&c2["push"]("家底 +"+al(c1["money"])),c0["innerHTM"+'L']="<button "+"class=\"b"+"tn btn-p"+"rimary\" "+"data-act"+"=\"card-n"+"ext-life"+"\">接着这一世，"+"投第 "+c1["gen"]+(" 世</butt"+"on><div "+"class=\"l"+"egacy-no"+"te\">")+(c2["length"]?"带走 "+ax(c2["join"](" · ")):"这一世没留下什么"+"，但可以接着往下"+'投')+"</div>";
}}}(bG),bI(bG),aw("share-mo"+"dal")["classLis"+'t']["remove"]("hidden"),bE(bG);
}function bI(bW){var bX=aw("share-en"+"ding-pic"+'k');
if(bX){var bY=bW&&bW["endingCh"+"oices"]||[];
bX["classLis"+'t']["toggle"]("hidden",bY["length"]<0x2),bY["length"]<0x2||(bX["innerHTM"+'L']="<div cla"+"ss=\"sep-"+"label\">卡"+"上印哪一条结局<"+"/div><di"+"v class="+"\"ep-list"+'\x22>'+bY["map"](function(bZ,c0){
return "<button "+"class=\"e"+"p-btn"+(bZ["title"]===bW["endingTi"+"tle"]?" selecte"+'d':'')+("\" data-e"+"p=\"")+c0+'\x22>'+ax(bZ["title"])+("</button"+'>');
})["join"]('')+"</div>");
}}function bJ(bW){var bX=(bW["honours"]||[])["map"](function(bY){
return bY["name"]+(bY["count"]>0x1?'×'+bY["count"]:'');
})["join"]('\x20');
return['【'+a3+'】'+bW["name"]+((bW["gen"]||0x1)>0x1?"（第 "+bW["gen"]+" 世）":'')+" · "+bW["posName"]+" · "+bW["originNa"+'me'],
"16 → "+bW["age"]+" 岁 · "+bW["seasons"]+" 个赛季 · "+bW["clubCoun"+'t']+" 家俱乐部","最高能力 "+bW["maxOvr"]+" · 身家 "+al(bW["money"]),
'gk'===bW["group"]?"出场 "+bW["apps"]+" · 零封 "+bW['cs']+" · 失球 "+bW['ga']:"出场 "+bW["apps"]+" · 进球 "+bW["goals"]+" · 助攻 "+bW["assists"],
"国家队 "+bW["caps"]+'\x20次'+((bW["nat"]||[])["length"]?'（'+bW["nat"]["map"](function(bY){
return bY["comp"]+(aa[bY["stage"]]||bY["stage"]);
})["join"](" · ")+'）':''),bX?"荣誉："+bX:"荣誉：一个没有","结局："+bW["endingTi"+"tle"],a3+(" · bilib"+"ili 神来我也"+'日')]["join"]('\x0a');
}function bK(bW){var bX=document["createEl"+"ement"]("div");
bX["classNam"+'e']="toast",bX["textCont"+"ent"]=bW,document["body"]["appendCh"+"ild"](bX),setTimeout(function(){
bX["remove"]();
},0x708);
}var bL=null;
function bM(bW){
["view-int"+'ro',"view-ide"+"ntity","view-car"+"eer","view-sum"+"mary","view-arc"+"hive","view-cod"+'ex']["forEach"](function(bY){
aw(bY)["classLis"+'t']["toggle"]("hidden",bY!==bW);
}),"view-int"+'ro'===bW&&(function(){var bY=aw("btn-arch"+"ive");
if(bY){var bZ=aG()["length"];
bY["classLis"+'t']["toggle"]("hidden",0x0===bZ),bY["textCont"+"ent"]=bZ?"生涯历史档案 ·"+'\x20'+bZ+'\x20段':"生涯历史档案";
var c0=aw("btn-code"+'x');
c0&&(c0["classLis"+'t']["toggle"]("hidden",0x0===bZ),c0["textCont"+"ent"]="结局图鉴 · "+aH(aG())["endings"]+" / "+a0["ENDINGS"]["length"]);
}}());
var bX="view-ide"+"ntity"===bW;
aw("actionba"+'r')["classLis"+'t']["toggle"]("hidden",!bX),document["body"]["classLis"+'t']["toggle"]("no-actio"+"nbar",!bX),
document["body"]["classLis"+'t']["toggle"]("in-caree"+'r',"view-car"+"eer"===bW),aw("app")["classLis"+'t']["toggle"]("wide",
"view-car"+"eer"===bW||"view-sum"+"mary"===bW||"view-cod"+'ex'===bW),aw("app")["classLis"+'t']["toggle"]("intro-wi"+'de',"view-int"+'ro'===bW),
bW!==bL&&(bL=bW,window["scrollTo"](0x0,0x0));
}function bN(){var bW=b2;
bM("view-car"+"eer"),aw("career-r"+"oot")["innerHTM"+'L']="<div cla"+"ss=\"care"+"er-grid\""+"><div cl"+"ass=\"col"+"-a\">"+(function(){var bX=ai(),bY=(aj(),ah(au["pos"])),bZ=bY["group"],c0="<div cla"+"ss=\"play"+"er-card\""+"><div cl"+"ass=\"her"+"o-row\"><"+"div clas"+"s=\"ovr-b"+"adge "+b5(au["ovr"])+("\"><div c"+"lass=\"ov"+"r-badge-"+"l\">OVR</"+"div><div"+" class=\""+"ovr-badg"+"e-v\">")+Math["round"](au["ovr"])+("</div></"+"div><div"+" class=\""+"club-bar"+"\"><div c"+"lass=\"cl"+"ub-bar-m"+"ain\"><di"+"v class="+"\"tag-row"+"\"><span "+"class=\"t"+"ag\">")+ax(ak(au["originId"])["name"])+("</span><"+"span cla"+"ss=\"tag "+"blue\">#")+au["number"]+'\x20'+bY['id']+("</span><"+"/div><di"+"v class="+"\"player-"+"name\">")+ax(au["name"])+("</div><d"+"iv class"+"=\"club-l"+"ine\">")+(bX?aT(bX):'')+("<span cl"+"ass=\"clu"+"b-name-b"+"ig\">")+ax(bX?bX["name"]:"自由身")+"</span>"+(au["loanFrom"]&&ag(au["loanFrom"])?"<span cl"+"ass=\"loa"+"n-tag\">租"+"借自 "+ax(ag(au["loanFrom"])["name"])+"</span>":'')+("</div></"+"div><div"+" class=\""+"club-rig"+"ht\"><div"+" class=\""+"cr-l\">年龄"+"</div><d"+"iv class"+"=\"cr-v\">")+au["age"]+("</div><d"+"iv class"+"=\"cr-l\" "+"style=\"m"+"argin-to"+"p:.25rem"+'\x22>')+("youth"===au["phase"]?'青训':'身价')+("</div><d"+"iv class"+"=\"cr-v")+("youth"===au["phase"]?" sm":'')+'\x22>'+("youth"===au["phase"]?ax(b7()||"还没定"):am(an(au["ovr"],au["age"])))+("</div></"+"div></di"+"v></div>");
if(c0+="<div cla"+"ss=\"stat"+"-row\">"+('gk'===bZ?[[b4["apps"]+'出场',au["totals"]["apps"]],[b4['cs']+'零封',au["totals"]['cs']],[b4['ga']+'失球',au["totals"]['ga']]]:[[b4["apps"]+'出场',au["totals"]["apps"]],[b4["goals"]+'进球',au["totals"]["goals"]],[b4["ast"]+'助攻',au["totals"]["assists"]]])["map"](function(c4){
return "<div cla"+"ss=\"stat"+"-cell\"><"+"div clas"+"s=\"stat-"+"l\">"+c4[0x0]+("</div><d"+"iv class"+"=\"stat-v"+'\x22>')+c4[0x1]+("</div></"+"div>");
})["join"]('')+("</div></"+"div>"),bX){var c1=a0["ROLES"][au["role"]];
c0+="<div cla"+"ss=\"stat"+"us-row\">"+"<div cla"+"ss=\"st-c"+"ell\"><sp"+"an class"+"=\"st-l\">"+"队内地位</sp"+"an><span"+" class=\""+"st-v rol"+'e-'+au["role"]+("\" title="+"\"这一档一个赛季"+"大约 ")+c1["apps"][0x0]+'-'+c1["apps"][0x1]+" 场\">"+ax(c1["name"])+("</span><"+"/div><di"+"v class="+"\"st-cell"+"\"><span "+"class=\"s"+"t-l\">合同<"+"/span><s"+"pan clas"+"s=\"st-v\""+'>')+(au["contract"+"Left"]>0x0?"还剩 "+au["contract"+"Left"]+'\x20年':"本期到期")+("</span><"+"/div></d"+"iv>");
}c0+="<div cla"+"ss=\"mete"+"rs\"><div"+" class=\""+"bars\">"+b6('关系',au["guanxi"],"hsl(var("+"--info))")+b6('清白',au["clean"],
"hsl(var("+"--accent"+'))')+b6('名气',au["fame"],"hsl(var("+"--warnin"+"g))")+("</div><d"+"iv class"+"=\"money-"+"row\"><sp"+"an>")+(au["money"]<0x0?"家里的欠债":"个人财富")+("</span><"+'b')+(au["money"]<0x0?" class=\""+"neg\"":'')+'>'+al(au["money"])+("</b></di"+"v></div>");c0+='<div class="money-row"><span>'+(au["teamId"]&&au["contractLeft"]>0x0?"当前薪资 "+al(au["seasonWage"])+" / 赛季":'')+'</span></div>';
var c2=a6["STAFF"]["filter"](function(c4){
return au["staff"]&&au["staff"][c4['id']];
});
c2["length"]&&(c0+="<div cla"+"ss=\"staf"+"f-row\"><"+"div clas"+"s=\"staff"+"-row-l\">"+"团队<b>"+al(a6["staffFee"]())+(" / 赛季</b"+"></div><"+"div clas"+"s=\"staff"+"-chips\">")+c2["map"](function(c4){
return "<span cl"+"ass=\"chi"+"p\" title"+'=\x22'+ax(c4["desc"])+'\x22>'+ax(c4["name"])+"</span>";
})["join"]('')+("</div></"+"div>"));
var c3=(function(){var c4='',c5={},c6={};
return au["trophies"]["forEach"](function(c7){
c5[c7["name"]]=(c5[c7["name"]]||0x0)+0x1;
}),au["awards"]["forEach"](function(c7){
c6[c7["name"]]=(c6[c7["name"]]||0x0)+0x1;
}),Object["keys"](c5)["forEach"](function(c7){
c4+="<span cl"+"ass=\"chi"+"p\">🏆 "+ax(c7)+(c5[c7]>0x1?'\x20×'+c5[c7]:'')+"</span>";
}),Object["keys"](c6)["forEach"](function(c7){
c4+="<span cl"+"ass=\"chi"+"p award\""+">🥇 "+ax(c7)+(c6[c7]>0x1?'\x20×'+c6[c7]:'')+"</span>";
}),c4;
}());
return(c0+="<div cla"+"ss=\"trop"+"hy-block"+(c3?'':" empty")+'\x22>'+(c3?"<div cla"+"ss=\"shel"+"f\">"+c3+"</div>":"<div cla"+"ss=\"empt"+"y-case\">"+"<div cla"+"ss=\"empt"+"y-case-i"+"con\">🏆</"+"div><div"+" class=\""+"empty-ca"+"se-t\">奖杯"+"柜是空的</di"+"v></div>")+"</div>")+("<div cla"+"ss=\"rest"+"art-row\""+"><button"+" class=\""+"mini-btn"+"\" data-a"+"ct=\"rest"+"art\">从头来"+"过</butto"+"n><span>"+"重新选出身，开一"+"局新的</spa"+"n></div>");
}())+("</div><d"+"iv class"+"=\"col-b\""+'>')+b9()+("</div><d"+"iv class"+"=\"col-c\""+'>')+(function(){var bX,bY,bZ=au["pending"];
if(!bZ)return'';
if("random"===bZ["type"]){for(var c0=null,c1=0x0;
c1<a1["length"];
c1++)a1[c1]['id']===bZ["eventId"]&&(c0=a1[c1]);
if(!c0)return'';
var c2="<div cla"+"ss=\"even"+"t\">"+b1(c0["icon"]||'⚽',c0['cn']?"国内 · 事件":'事件',ao(c0["title"]))+("<div cla"+"ss=\"ev-d"+"esc\">")+ax(ao(c0["desc"]))+"</div>";
return bZ["roll"]&&(c2+=function(ce){var cf=Math["round"](0x64*ce['p']);
function cg(ch,ci,cj){var ck="slot";
return ce["spinning"]||(ck+='a'===ch==!!ce['ok']?" win":" lose"),"<div cla"+"ss=\""+ck+("\" data-s"+"ide=\"")+ch+("\"><span "+"class=\"s"+"lot-pct\""+'>')+ci+("%</span>"+"<span cl"+"ass=\"slo"+"t-lab\">")+ax(cj)+("</span><"+"/div>");
}return "<div cla"+"ss=\"roul"+"ette\" da"+"ta-state"+'=\x22'+(ce["spinning"]?"spin":"done")+'\x22>'+cg('a',cf,ce['a'])+("<span cl"+"ass=\"rou"+"lette-vs"+'\x22>')+(ce["spinning"]?"抽签中":'落定')+"</span>"+cg('b',
0x64-cf,ce['b'])+"</div>";
}(bZ["roll"])),bZ["result"]?(c2+="<div cla"+"ss=\"resu"+"lt\">"+ax(bZ["result"]["text"])+"</div>",bZ["result"]["deltas"]&&bZ["result"]["deltas"]["length"]&&(c2+="<div cla"+"ss=\"delt"+"as\">"+bZ["result"]["deltas"]["map"](function(ce){
return "<span cl"+"ass=\"del"+"ta "+ce["cls"]+'\x22>'+ax(ce["text"])+"</span>";
})["join"]('')+"</div>"),c2+=bb(["<button "+"class=\"b"+"tn btn-p"+"rimary\" "+"data-act"+"=\"contin"+"ue\">继续</"+"button>"])):bZ["roll"]||(c2+=bb((bX=c0["options"]["map"](function(ce,
cf){
return ba(cf,ao(ce["label"]),ao(a6["optHint"](c0,cf)));
}),bY="ev:"+c0['id']+':'+au["choices"]["length"],function(ce,cf){
if(bc["key"]!==cf||!bc["ord"]||bc["ord"]["length"]!==ce){var cg,ch=[];
for(cg=0x0;
cg<ce;
cg++)ch["push"](cg);
for(cg=ce-0x1;
cg>0x0;
cg--){var ci=Math["floor"](Math["random"]()*(cg+0x1)),cj=ch[cg];
ch[cg]=ch[ci],ch[ci]=cj;
}bc={'key':cf,'ord':ch};
}return bc["ord"];
}(bX["length"],bY)["map"](function(ce){return bX[ce];
})))),c2+"</div>";
}if("report"===bZ["type"]){var c3=bZ["recs"][0x0]["age"],c4=bZ["recs"][bZ["recs"]["length"]-0x1]["age"];
return "<div cla"+"ss=\"even"+"t\">"+b1('📋','战报',c3===c4?c3+'\x20岁':c3+'–'+c4+'\x20岁')+("<div cla"+"ss=\"seas"+"on-mini\""+'>')+bZ["recs"]["map"](function(ce){var cf='gk'===ah(au["pos"])["group"]?ce["apps"]+" 场 / "+ce['cs']+" 零封":ce["apps"]+" 场 / "+ce["goals"]+" 球 / "+ce["assists"]+'\x20助',cg='';
ce["caps"]&&(cg="国家队 "+ce["caps"]+'\x20场','gk'===ah(au["pos"])["group"]?ce["natCs"]&&(cg+=" · "+ce["natCs"]+" 零封"):(ce["natGoals"]&&(cg+=" · "+ce["natGoals"]+'\x20球'),ce["natAssis"+'ts']&&(cg+=" · "+ce["natAssis"+'ts']+'\x20助')));
var ch=(cg?" <span c"+"lass=\"mi"+"ni-badge"+" nat\">"+ax(cg)+"</span>":'')+(ce["note"]?" <span c"+"lass=\"mi"+"ni-badge"+" bad\">"+ax(ce["note"])+"</span>":'')+(ce["nat"]?" <span c"+"lass=\"mi"+"ni-badge"+" nat\">"+ax(ce["nat"])+"</span>":'')+(ce["move"]?" <span c"+"lass=\"mi"+"ni-badge"+'\x20'+(0x0===ce["move"]["indexOf"]('升')?'up':"bad")+'\x22>'+ax(ce["move"])+"</span>":'')+(ce["staffGon"+'e']?" <span c"+"lass=\"mi"+"ni-badge"+" bad\">"+ax(ce["staffGon"+'e'])+("走了</span"+'>'):'')+(ce["trophies"]["length"]?" <span c"+"lass=\"mi"+"ni-badge"+'\x22>'+ax(ce["trophies"]["join"]('\x20'))+"</span>":'');
return "<div cla"+"ss=\"tl-r"+"ow done "+"tl-cols\""+" style=\""+"grid-tem"+"plate-co"+"lumns:2."+"4rem 1fr"+" auto\"><"+"span cla"+"ss=\"age-"+"chip\">"+ce["age"]+("</span><"+"span cla"+"ss=\"tl-c"+"lub\"><sp"+"an class"+"=\"tl-clu"+"b-name\">")+ax(ce["teamName"])+"</span>"+ch+("</span><"+"span cla"+"ss=\"tl-n"+'\x22>')+cf+" · "+ce["ovrEnd"]+("</span><"+"/div>");
})["join"]('')+"</div>"+bb(["<button "+"class=\"b"+"tn btn-p"+"rimary\" "+"data-act"+"=\"contin"+"ue\">继续</"+"button>"])+"</div>";
}if("youth_pa"+'th'===bZ["type"])return "<div cla"+"ss=\"even"+"t\">"+b1('🧒',"十二岁","去哪儿练",!0x0)+("<div cla"+"ss=\"ev-d"+"esc\">同龄的"+"孩子里，你踢得算"+"好的那几个。接下"+"来几年在哪家青训"+"营，家里得拿个主"+"意 —— 好队伍"+"练得快，也刷得狠"+"。</div>")+bb(bZ["offers"]["map"](function(ce,cf){var cg=ag(ce),ch=a6["leagueOf"+"Team"](cg),ci=cf===bZ["abroadId"+'x'];
return "<button "+"class=\"o"+"pt youth"+"-opt\" da"+"ta-opt=\""+cf+("\"><span "+"class=\"o"+"pt-lead\""+'>')+(ci?"送出国踢":ac(au["originId"],ce)?'本省':ab(au["originId"],ce)?'邻近':'外地')+"</span>"+aT(cg)+("<span cl"+"ass=\"opt"+"-label\">")+ax(a6["academyN"+"ame"](cg))+("</span><"+"span cla"+"ss=\"opt-"+"hint\">")+ax(ch["name"]+" · "+["保级队","中下游",'中游','争冠','豪门',"顶级豪门"][cg["rep"]])+("</span><"+"span cla"+"ss=\"yout"+"h-trade\""+'>')+["清静，练得慢",
'稳当',"练得不错","强度大","长得快，刷得狠","顶尖，也最挤"][cg["rep"]]+(ci?" · 家里出 "+al(a0["YOUTH_AB"+"ROAD_FEE"]):'')+("</span><"+"/button>");
}))+"</div>";
if("academy"===bZ["type"]){var c5=bZ["youthId"]?ag(bZ["youthId"]):null,c6="<div cla"+"ss=\"even"+"t\">"+b1('🎒','决策',"该上成年队了",!0x0)+("<div cla"+"ss=\"ev-d"+"esc\">")+au["age"]+(" 岁，能力够得着"+"成年队了。")+(bZ["homeId"]?"自家一线队也开了"+'口。':'')+(bZ["canStayY"+"outh"]?"也可以不急着走，"+"在梯队再练一年。":'')+"</div>"+bb(bZ["offers"]["map"](function(ce,cf){
return bg(cf,ag(ce),ag(ce)["name"],ce===bZ["homeId"]?"自家一线队":'加盟',!0x0);
}));
return bZ["canStayY"+"outh"]&&(c6+=bb([ba("youth",'再在'+(c5?ax(a6["academyN"+"ame"](c5)):'梯队')+"练一年","不签成年队。梯队"+"练得更快，但明年"+"还要过一次选材那"+'一关')],"opts-alt")),
c6+"</div>";
}if("transfer"===bZ["type"]){var c7=bZ["backFrom"]?ag(bZ["backFrom"]):null,c8="<div cla"+"ss=\"even"+"t\">"+b1(c7?'🔙':bZ["fired"]?'🚪':bZ["mustLeav"+'e']?'🧳':'🔁',
'决策',c7?"租借期满，回到 "+c7["name"]:bZ["fired"]?"俱乐部不续约了":bZ["mustLeav"+'e']?"话已经说出口了":"转会窗",!0x0)+("<div cla"+"ss=\"ev-d"+"esc\">")+(c7?"你回来了。这一年"+"在外面踢的每一场"+"，这边都看在眼里"+" —— 接下来是"+"留是走，重新谈一"+'次。':bZ["fired"]?"你的出场时间已经"+"少到写不进总结。"+"合同到期，俱乐部"+"没有再谈的意思。":bZ["mustLeav"+'e']?"走这件事已经定了"+"，回头路没有了。"+"剩下的问题只是去"+"哪儿。":"合同到期了。这几"+"家来问过，也可以"+"留下。")+"</div>";
c8+=bb(bZ["offers"]["map"](function(ce,cf){
return bg(cf,ag(ce),ag(ce)["name"],'加盟',!0x0);
})),bZ["loans"]&&bZ["loans"]["length"]&&(c8+="<div cla"+"ss=\"opts"+"-note\">在"+"这儿排不上号的话"+"，还可以租出去踢"+"一年</div>",c8+=bb(bZ["loans"]["map"](function(ce,
cf){
return bg("loan"+cf,ag(ce),ag(ce)["name"],'租借',!0x0);
})));
var c9=[];
if(bZ["canStay"]){var ca=a6["offerBri"+'ef'](ai()['id']);
c9["push"](ba("stay","留在 "+ai()["name"],"续约，一切照旧 "+'·\x20'+al(ca["wage"])+"/赛季 · "+ca["years"]+'\x20年 · '+ca["roleName"],ai()));
}return bZ["canRetir"+'e']&&c9["push"](ba("retire",'挂靴',"就到这里")),bZ["offers"]["length"]||bZ["canStay"]||(c8+="<div cla"+"ss=\"empt"+"y\">没有任何报"+"价。</div>",
c9["length"]||c9["push"](ba("retire",'挂靴',"只剩这一个选项"))),c8+bb(c9,"opts-alt")+"</div>";
}if("bigmatch"===bZ["type"]){var cb="<div cla"+"ss=\"even"+"t bigmat"+'ch'+(bZ["result"]?bZ["result"]["won"]?" won":" lost":'')+'\x22>'+b1(bZ["icon"]||'🏆',
"关键战",bZ["comp"],!0x0)+("<div cla"+"ss=\"bm-v"+"s\"><span"+" class=\""+"bm-side\""+'>')+ax(bZ["side"])+("</span><"+"span cla"+"ss=\"bm-s"+"core\">")+(bZ["result"]?bZ["result"]["score"][0x0]+" : "+bZ["result"]["score"][0x1]:bZ["half"][0x0]+" : "+bZ["half"][0x1])+("</span><"+"span cla"+"ss=\"bm-s"+"ide\">")+ax(bZ["opp"])+("</span><"+"/div>")+(bZ["result"]&&bZ["result"]["pens"]?"<div cla"+"ss=\"bm-p"+"ens\">点球 "+bZ["result"]["pens"][0x0]+" : "+bZ["result"]["pens"][0x1]+"</div>":"<div cla"+"ss=\"bm-p"+"ens\">"+(bZ["result"]?'全场':'半场')+"</div>")+("<div cla"+"ss=\"bm-l"+"og\">")+bZ["log"]["map"](function(ce){
return "<div cla"+"ss=\"bm-l"+"ine\">"+ax(ce)+"</div>";
})["join"]('')+"</div>";
return bZ["result"]?(cb+="<div cla"+"ss=\"bm-l"+"og secon"+"d\">"+bZ["result"]["log"]["map"](function(ce){
return "<div cla"+"ss=\"bm-l"+"ine\">"+ax(ce)+"</div>";
})["join"]('')+"</div>",bZ["result"]["deltas"]&&bZ["result"]["deltas"]["length"]&&(cb+="<div cla"+"ss=\"delt"+"as\">"+bZ["result"]["deltas"]["map"](function(ce){
return "<span cl"+"ass=\"del"+"ta "+ce["cls"]+'\x22>'+ax(ce["text"])+"</span>";
})["join"]('')+"</div>"),cb+=bb(["<button "+"class=\"b"+"tn btn-p"+"rimary\" "+"data-act"+"=\"contin"+"ue\">继续</"+"button>"])):cb+=bb((bZ["opts"]||a6["BIG_OPTS"])["map"](function(ce){
return ba(ce["key"],ce["label"],ce["hint"]);
})),cb+"</div>";
}if("staff"===bZ["type"]){var cc=a6["STAFF"]["filter"](function(ce){
return au["staff"]&&au["staff"][ce['id']];
}),cd="<div cla"+"ss=\"even"+"t\">"+b1('🤝','决策',"有人想跟你签约",!0x0)+("<div cla"+"ss=\"ev-d"+"esc\">经纪公"+"司列了几个人。都"+"是按赛季付钱，签"+"了就每年从你账上"+"走。</div>")+(cc["length"]?"<div cla"+"ss=\"staf"+"f-cur\">现"+"在养着："+cc["map"](function(ce){
return "<span cl"+"ass=\"chi"+"p\">"+ax(ce["name"])+"</span>";
})["join"]('')+"<b>"+al(a6["staffFee"]())+(" / 赛季</b"+"></div>"):'');
return cd+=bb(bZ["offers"]["map"](function(ce){var cf=a6["staffByI"+'d'](ce);
return "<button "+"class=\"o"+"pt staff"+"-opt\" da"+"ta-opt=\""+ax(ce)+("\"><span "+"class=\"o"+"pt-label"+'\x22>')+ax(cf["name"])+("</span><"+"span cla"+"ss=\"staf"+"f-fee\">")+al(a6["staffPri"+'ce'](cf))+(" / 赛季</s"+"pan><spa"+"n class="+"\"opt-hin"+"t\">")+ax(cf["desc"])+("</span><"+"span cla"+"ss=\"staf"+"f-note\">")+ax(cf["note"])+("</span><"+"/button>");
})),(cd+=bb([ba("skip","先不请","钱留着")],"opts-alt"))+"</div>";
}return "retire_f"+"orced"===bZ["type"]?"<div cla"+"ss=\"even"+"t\">"+b1('📵','决策',"没人来问了",!0x0)+("<div cla"+"ss=\"ev-d"+"esc\">经纪人"+"的电话半年没响过"+"。你自己也知道是"+"时候了。</di"+'v>')+bb([ba("retire",'挂靴',"结束职业生涯")])+"</div>":'';
}())+("</div></"+"div>"),function(bX){
if(bX&&"function"==typeof requestAnimationFrame){var bY=b3(".ovr-bad"+'ge'),bZ=b3(".ovr-bad"+"ge-v"),c0=Math["round"](au["ovr"]);
bZ&&bY&&bX["ovr"]!==c0&&(function(c7,c8,c9){var ca=null;
requestAnimationFrame(function cb(cc){
null===ca&&(ca=cc);
var cd=Math["min"](0x1,(cc-ca)/0x2ee);
cd=0x1-Math["pow"](0x1-cd,0x3),c7["textCont"+"ent"]=Math["round"](c8+(c9-c8)*cd),cd<0x1?requestAnimationFrame(cb):c7["textCont"+"ent"]=c9;
});
}(bZ,bX["ovr"],c0),bY["classLis"+'t']["add"](c0>bX["ovr"]?'up':"down"));
for(var c1,c2=[bX["guanxi"],bX["clean"],bX["fame"]],c3=(c1=aw("career-r"+"oot"))&&c1["querySel"+"ectorAll"]?c1["querySel"+"ectorAll"](".bar-f"):[],
c4=0x0;
c4<c3["length"]&&c4<c2["length"];
c4++){var c5=c3[c4],c6=c5["style"]["width"];
c5["style"]["transiti"+'on']="none",c5["style"]["width"]=ad(c2[c4],0x0,0x64)+'%',c5["offsetWi"+"dth"],c5["style"]["transiti"+'on']='',
c5["style"]["width"]=c6;
}}}(bW),(function(){var bX=b3(".tl-scro"+'ll');
if(bX&&bX["querySel"+"ector"]){var bY=bX["querySel"+"ector"](".tl-row."+"now");
if(bY&&bY["getBound"+"ingClien"+"tRect"]&&bX["getBound"+"ingClien"+"tRect"]){var bZ=bX["getBound"+"ingClien"+"tRect"](),c0=bY["getBound"+"ingClien"+"tRect"]();
bX["scrollTo"+'p']=Math["max"](0x0,bX["scrollTo"+'p']+(c0["bottom"]-bZ["bottom"])+0x4);
}}}()),(function(){
if("function"==typeof requestAnimationFrame&&window["scrollBy"]){var bX=b3(".col-c ."+"event");
bX&&bX["getBound"+"ingClien"+"tRect"]&&requestAnimationFrame(function(){var bY=bX["getBound"+"ingClien"+"tRect"](),bZ=window["innerHei"+"ght"]||0x0,c0=bY["bottom"]-bZ+0xc;
c0<=0x4||bY["height"]>=bZ-0x28||("scrollBe"+"havior"in document["document"+"Element"]["style"]&&!be()?window["scrollBy"]({'top':c0,'left':0x0,'behavior':"smooth"}):window["scrollBy"](0x0,c0));
});
}}()),b2={'ovr':Math["round"](au["ovr"]),'guanxi':au["guanxi"],'clean':au["clean"],'fame':au["fame"]};
}function bO(){
if(au)return "summary"===au["phase"]?(bM("view-sum"+"mary"),void(function(){var bW=aq(),bX=ah(au["pos"])["group"],bY=a0["endingVi"+'ew'](bm(au["ending"]),bX);
au["archived"]||((function(){var c9,ca,cb,cc=aG();
cc["unshift"]((c9=aq(),ca=bm(au["ending"]),cb=ah(au["pos"])["group"],{'at':Date["now"](),'legacy':a6["legacyFr"+'om'](c9),'gen':au["gen"]||0x1,'mode':au["mode"],'seed':au["seed"],'name':au["name"],'number':au["number"],'pos':au["pos"],'group':cb,'originId':au["originId"],'maxOvr':c9["maxOvr"],'age':au["age"],'seasons':au["seasons"]["length"],'apps':au["totals"]["apps"],'goals':au["totals"]["goals"],'assists':au["totals"]["assists"],'cs':au["totals"]['cs'],'ga':au["totals"]['ga'],'caps':au["caps"],'money':c9["money"],'earned':c9["careerEa"+"rnings"],'banned':!!au["banned"],'ending':ca['id'],'youthCut':au["youthCut"]||0x0,'youthPathName':b7(),'endings':au["endingsA"+'ll']&&au["endingsA"+'ll']["length"]?au["endingsA"+'ll']["slice"]():[ca['id']],'endingTitle':a0["endingVi"+'ew'](ca,cb)["title"],'clubs':bl()["map"](function(cd){
return{'id':cd["teamId"],'name':cd["name"],'color':cd["color"],'apps':cd["apps"]};
}),'honours':bk(),'nat':ap()})),cc["length"]>aF&&(cc["length"]=aF),function(cd){
az("archive",cd);
}(cc);
}()),au["archived"]=!0x0,aA());
var bZ,c0,c1,c2=au["trophies"]["filter"](function(c9){
return/世界杯|亚洲杯/["test"](c9["name"]);
}),c3="<div cla"+"ss=\"sum-"+"top\"><di"+"v class="+"\"sum-mai"+"n\"><div "+"class=\"e"+"nding-ey"+"ebrow\">"+((au["gen"]||0x1)>0x1?"<span cl"+"ass=\"gen"+"-chip\">第"+'\x20'+au["gen"]+(" 世</span"+'>'):'')+("青训淘汰"===au["endReaso"+'n']?"没能走到那一步 "+'·\x20'+au["age"]+" 岁 · "+b7()+" 第 "+Math["max"](0x1,
au["age"]-0xb)+'\x20年':"生涯结束 · "+au["age"]+" 岁 · "+au["seasons"]["length"]+" 个赛季 · "+au["clubsPla"+"yed"]["length"]+" 家俱乐部")+("</div><d"+"iv class"+"=\"sum-he"+"ro\"><div"+" class=\""+"sum-hero"+"-main\"><"+"div clas"+"s=\"sum-n"+"ame\">")+ax(au["name"])+("</div><d"+"iv class"+"=\"tag-ro"+"w\"><span"+" class=\""+"tag\">")+ax(ak(au["originId"])["name"])+("</span><"+"span cla"+"ss=\"tag "+"blue\">#")+au["number"]+'\x20'+ah(au["pos"])['id']+("</span><"+"/div></d"+"iv><div "+"class=\"s"+"um-hero-"+"side\"><d"+"iv class"+"=\"cr-l\">"+"最高身价</di"+"v><div c"+"lass=\"cr"+"-v\">")+am(an(bW["maxOvr"],
0x1a))+("</div></"+"div><div"+" class=\""+"ovr-badg"+'e\x20')+b5(bW["maxOvr"])+("\"><div c"+"lass=\"ov"+"r-badge-"+"l\">OVR</"+"div><div"+" class=\""+"ovr-badg"+"e-v\">")+bW["maxOvr"]+("</div></"+"div></di"+'v>');
c3+="<div cla"+"ss=\"stat"+"-row\">"+('gk'===bX?[[b4["apps"]+'出场',au["totals"]["apps"]],[b4['cs']+'零封',au["totals"]['cs']],[b4['ga']+'失球',au["totals"]['ga']]]:[[b4["apps"]+'出场',au["totals"]["apps"]],[b4["goals"]+'进球',au["totals"]["goals"]],[b4["ast"]+'助攻',au["totals"]["assists"]]])["map"](function(c9){
return "<div cla"+"ss=\"stat"+"-cell\"><"+"div clas"+"s=\"stat-"+"l\">"+c9[0x0]+("</div><d"+"iv class"+"=\"stat-v"+'\x22>')+c9[0x1]+("</div></"+"div>");
})["join"]('')+("</div></"+"div>"),c3+="<div cla"+"ss=\"sum-"+"card nat"+"\"><div c"+"lass=\"su"+"m-card-l"+"\">国家队</d"+"iv><div "+"class=\"s"+"um-card-"+"title\">中"+"国</div><"+"div clas"+"s=\"sum-c"+"ard-stat"+'\x22>'+au["caps"]+(" 次出场</di"+'v>')+(c0=au["natStats"]||{},
(c1='gk'===bX?c0['cs']?[c0['cs']+" 零封"]:[]:[c0["goals"]?c0["goals"]+'\x20球':'',c0["assists"]?c0["assists"]+" 助攻":'']["filter"](Boolean))["length"]?"<div cla"+"ss=\"nat-"+"prod\">"+c1["join"](" · ")+"</div>":'')+(ap()["length"]?"<div cla"+"ss=\"nat-"+"best\">"+ap()["map"](function(c9){
return "<div><sp"+"an>"+ax(c9["comp"])+("</span><"+'b>')+ax(aa[c9["stage"]]||c9["stage"])+"</b><i>"+c9["age"]+(" 岁</i></"+"div>");
})["join"]('')+"</div>":"<div cla"+"ss=\"case"+"-empty\">"+(au["caps"]?"没赶上过大赛":"没进过国家队")+"</div>")+(c2["length"]?"<div cla"+"ss=\"trop"+"hy-row\">"+c2["map"](function(c9){
return "<span cl"+"ass=\"tro"+"phy-item"+'\x22>'+bj(c9["name"])+"<span>"+ax(c9["name"])+("</span><"+"/span>");
})["join"]('')+"</div>":'')+("</div><d"+"iv class"+"=\"sum-ca"+"rd award"+"s\"><div "+"class=\"s"+"um-card-"+"l\">个人奖项<"+"/div>")+(au["awards"]["length"]?"<div cla"+"ss=\"trop"+"hy-row\">"+(bZ={},
au["awards"]["forEach"](function(c9){
bZ[c9["name"]]=(bZ[c9["name"]]||0x0)+0x1;
}),Object["keys"](bZ)["map"](function(c9){
return "<span cl"+"ass=\"tro"+"phy-item"+'\x22>'+bj(c9)+"<span>"+ax(c9)+(bZ[c9]>0x1?'\x20×'+bZ[c9]:'')+("</span><"+"/span>");
})["join"]('')+"</div>"):"<div cla"+"ss=\"case"+"-empty\">"+"奖杯柜是空的</"+"div>")+"</div>",c3+="</div>";
var c4=bk();
c3+="<div cla"+"ss=\"sect"+"ion-head"+"\"><h2>奖杯"+"陈列</h2><"+"span>"+(c4["length"]?au["trophies"]["length"]+au["awards"]["length"]+'\x20座':'')+("</span><"+"/div>"),
c3+=c4["length"]?"<div cla"+"ss=\"trop"+"hy-hall\""+'>'+c4["map"](function(c9){
return "<div cla"+"ss=\"hall"+"-item\">"+bj(c9["name"])+(c9["count"]>0x1?"<span cl"+"ass=\"hal"+"l-count\""+'>×'+c9["count"]+"</span>":'')+("<span cl"+"ass=\"hal"+"l-name\">")+ax(c9["name"])+("</span><"+"/div>");
})["join"]('')+"</div>":"<div cla"+"ss=\"trop"+"hy-hall "+"empty-ha"+"ll\">一座也没"+"有</div>",c3+="<div cla"+"ss=\"club"+"-grid\">"+bl()["map"](function(c9){var ca=ag(c9["teamId"]),cb=a6["leagueOf"+"Team"](ca),cc='gk'===bX?[['出场',c9["apps"]],['零封',c9['cs']],['失球',c9['ga']]]:[['出场',c9["apps"]],
['进球',c9["goals"]],['助攻',c9["assists"]]],cd={};
return c9["trophies"]["forEach"](function(ce){cd[ce]=(cd[ce]||0x0)+0x1;
}),"<div cla"+"ss=\"club"+"-card\" s"+"tyle=\"--"+"tc:"+(c9["color"]||"#666")+("\"><div c"+"lass=\"cl"+"ub-card-"+"wash\">")+aT(ca)+("</div><d"+"iv class"+"=\"club-c"+"ard-body"+"\"><div c"+"lass=\"cl"+"ub-card-"+"crest\">")+aT(ca)+("</div><d"+"iv class"+"=\"club-c"+"ard-name"+'\x22>')+ax(c9["name"])+("</div><d"+"iv class"+"=\"club-c"+"ard-lg\">")+ax(cb?cb["name"]:'')+("</div><d"+"iv class"+"=\"club-c"+"ard-year"+"s\">")+(c9["from"]===c9['to']?c9["from"]+'\x20岁':c9["from"]+'-'+c9['to']+'\x20岁')+" · "+c9["seasons"]+(" 个赛季</di"+"v><div c"+"lass=\"cl"+"ub-card-"+"stats\">")+cc["map"](function(ce){
return "<span><b"+'>'+ce[0x1]+"</b>"+ce[0x0]+"</span>";
})["join"]('')+("</div><d"+"iv class"+"=\"club-c"+"ard-tro\""+'>')+Object["keys"](cd)["map"](function(ce){
return "<span cl"+"ass=\"tro"+"phy-item"+'\x22>'+bj(ce)+"<span>"+ax(ce)+(cd[ce]>0x1?'\x20×'+cd[ce]:'')+("</span><"+"/span>");
})["join"]('')+("</div></"+"div></di"+'v>');
})["join"]('')+"</div>",c3+=(function(){var c9=(function(){var cU=[];
return(au["youthLog"]||[])["forEach"](function(cV){var cW=ag(cV["teamId"]);
cU["push"]({'age':cV["age"],'ovr':cV["ovr"],'youth':!0x0,'teamId':cV["teamId"],'club':cW?a6["academyN"+"ame"](cW):'青训','color':cW?cW["color"]:null});
}),(au["seasons"]||[])["forEach"](function(cV){
cU["push"]({'age':cV["age"],'youth':!0x1,'teamId':cV["teamId"],'ovr':Math["round"](null!=cV["ovrEnd"]?cV["ovrEnd"]:cV["ovr"]),'club':cV["teamName"],'color':cV["color"]});
}),cU;
}());
if(c9["length"]<0x2)return'';
var ca=window["innerWid"+'th']<0x2bc,cb=ca?0x17c:0x384,cc=ca?0x18:0x20,cd=ca?0xa:0x10,ce=ca?0x22:0x28,cf=ca?0x1a:0x20,cg={};
c9["forEach"](function(cU){
cg[cU["age"]]=cU["ovr"];
});
var ch=function(){var cU={};
function cV(cW,cX){
for(var cY=0x0;
cY<bn["length"];
cY++){var cZ=bn[cY];
if(cZ['re']["test"](cW))return void((!cU[cZ["label"]]||cX<cU[cZ["label"]]["age"])&&(cU[cZ["label"]]={'age':cX,'label':cZ["label"],'rank':cZ["rank"],'img':bi(cW)}));
}}return(au["trophies"]||[])["forEach"](function(cW){
cV(cW["name"],cW["age"]);
}),(au["awards"]||[])["forEach"](function(cW){
cV(cW["name"],cW["age"]);
}),Object["keys"](cU)["map"](function(cW){return cU[cW];
})["filter"](function(cW){
return!!cW["img"];
})["sort"](function(cW,cX){
return cW["rank"]-cX["rank"];
});
}()["filter"](function(cU){
return cU["age"]>=c9[0x0]["age"]&&cU["age"]<=c9[c9["length"]-0x1]["age"]&&null!=cg[cU["age"]];
});
ch["length"]&&ch[0x0]["rank"]<=0x3&&(ch=ch["filter"](function(cU){
return cU["rank"]<=0x9;
}));
var ci=ch["length"]>0x0,cj=ci?ca?0x2a:0x30:ca?0x10:0x14,ck=(ca?0xcd:0xff)+(ci?ca?0x1a:0x1c:0x0),cl=cb-cc-cd,cm=ck-cj-ce,cn=0x64,
co=0x0,cp=c9[0x0];
c9["forEach"](function(cU){
cU["ovr"]<cn&&(cn=cU["ovr"]),cU["ovr"]>co&&(co=cU["ovr"],cp=cU);
});
var cq=Math["max"](0x0,0xa*Math["floor"]((cn-0x5)/0xa)),cr=Math["min"](0x64,0xa*Math["ceil"]((co+0x5)/0xa));
cr-cq<0x1e&&(cr=Math["min"](0x64,cq+0x1e),cq=Math["max"](0x0,cr-0x1e));
var cs=c9[0x0]["age"],cu=c9[c9["length"]-0x1]["age"];
function cv(cU){return cu===cs?cc+cl/0x2:cc+(cU-cs)/(cu-cs)*cl;
}function cw(cU){return cj+(0x1-(cU-cq)/(cr-cq))*cm;
}var cx="<svg cla"+"ss=\"ovrc"+"-svg\" vi"+"ewBox=\"0"+" 0 "+cb+'\x20'+ck+("\" preser"+"veAspect"+"Ratio=\"x"+"MidYMid "+"meet\" ro"+"le=\"img\""+" aria-la"+"bel=\"能力值"+"曲线，")+cs+" 岁到 "+cu+" 岁，峰值 "+co+'\x22>';
cx+="<defs><l"+"inearGra"+"dient id"+"=\"ovrcFi"+"ll\" x1=\""+"0\" y1=\"0"+"\" x2=\"0\""+" y2=\"1\">"+"<stop cl"+"ass=\"ovr"+"c-s0\" of"+"fset=\"0\""+"/><stop "+"class=\"o"+"vrc-s1\" "+"offset=\""+"1\"/></li"+"nearGrad"+"ient></d"+"efs>";
for(var cy=cr-cq>0x32?0x14:0xa,cz=cq;
cz<=cr;
cz+=cy){var cA=cw(cz)["toFixed"](0x1);
cx+="<line cl"+"ass=\"ovr"+"c-grid\" "+"x1=\""+cc+"\" y1=\""+cA+"\" x2=\""+(cc+cl)+"\" y2=\""+cA+("\"/><text"+" class=\""+"ovrc-tic"+"k\" x=\"")+(cc-0x6)+"\" y=\""+cA+("\" text-a"+"nchor=\"e"+"nd\" domi"+"nant-bas"+"eline=\"m"+"iddle\">")+cz+"</text>";
}var cB=[],cC=null;
c9["forEach"](function(cU){
cC&&cC["teamId"]===cU["teamId"]&&cC["youth"]===cU["youth"]?cC['to']=cU["age"]:(cC={'teamId':cU["teamId"],'youth':cU["youth"],'club':cU["club"],'color':cU["color"]||"#4a5a50",'from':cU["age"],'to':cU["age"]},
cB["push"](cC));
});
var cD=cj+cm+(ca?0xd:0x10),cE=ca?0x5:0x6;
cB["forEach"](function(cU,cV){var cW=cB[cV+0x1],cX=cv(cU["from"]),cY=cW?cv(cW["from"]):cv(cU['to'])+(cu===cs?0x0:cl/Math["max"](0x1,cu-cs));
(cY=Math["min"](cY,cc+cl)-(cW?1.2:0x0))-cX<0.8||(cx+="<rect cl"+"ass=\"ovr"+"c-band"+(cU["youth"]?" youth":'')+"\" x=\""+cX["toFixed"](0x1)+"\" y=\""+cD+("\" width="+'\x22')+(cY-cX)["toFixed"](0x1)+("\" height"+'=\x22')+cE+("\" rx=\"2\""+" fill=\"")+ax(cU["color"])+("\"><title"+'>')+ax(cU["club"])+" · "+cU["from"]+(cU['to']>cU["from"]?'-'+cU['to']:'')+(" 岁</titl"+"e></rect"+'>'));
});
for(var cF=[cs],cG=0x4*Math["ceil"]((cs+0x1)/0x4);
cG<cu;
cG+=0x4)cF["push"](cG);
cu!==cs&&cF["push"](cu),cF["forEach"](function(cU,cV){
if(!(cV&&cU-cF[cV-0x1]<0x2)){var cW=0x0===cV?"start":cV===cF["length"]-0x1?"end":"middle";
cx+="<text cl"+"ass=\"ovr"+"c-tick\" "+"x=\""+cv(cU)["toFixed"](0x1)+"\" y=\""+(cj+cm+(ca?0xb:0xc))+("\" text-a"+"nchor=\"")+cW+'\x22>'+cU+"</text>";
}});
for(var cH=-0x1,cI=0x0;
cI<c9["length"];
cI++)if(!c9[cI]["youth"]){cH=cI;
break;
}var cJ=cH<0x0?c9:c9["slice"](0x0,cH+0x1),cK=cH<0x0?[]:c9["slice"](cH);
function cL(cU){
return cU["map"](function(cV,cW){return(cW?'L':'M')+function(cX){
return cv(cX["age"])["toFixed"](0x1)+'\x20'+cw(cX["ovr"])["toFixed"](0x1);
}(cV);
})["join"]('\x20');
}if(cK["length"]>0x1){var cM=(cj+cm)["toFixed"](0x1);
cx+="<path cl"+"ass=\"ovr"+"c-area\" "+"d=\""+cL(cK)+'\x20L'+cv(cK[cK["length"]-0x1]["age"])["toFixed"](0x1)+'\x20'+cM+'\x20L'+cv(cK[0x0]["age"])["toFixed"](0x1)+'\x20'+cM+(" Z\" fill"+"=\"url(#o"+"vrcFill)"+"\"/>");
}if(cJ["length"]>0x1&&(cx+="<path cl"+"ass=\"ovr"+"c-line y"+"outh\" d="+'\x22'+cL(cJ)+"\"/>"),cK["length"]>0x1&&(cx+="<path cl"+"ass=\"ovr"+"c-line\" "+"d=\""+cL(cK)+"\"/>"),
cH>0x0){var cN=cv(c9[cH]["age"])["toFixed"](0x1),cO=cv(c9[cH]["age"])<cc+0.12*cl?"start":"middle";
cx+="<line cl"+"ass=\"ovr"+"c-mark\" "+"x1=\""+cN+"\" y1=\""+cj+"\" x2=\""+cN+"\" y2=\""+(cj+cm)+("\"/><text"+" class=\""+"ovrc-not"+"e\" x=\"")+cN+"\" y=\""+(cj+cm-0x5)+("\" text-a"+"nchor=\"")+cO+("\">签下第一份合"+"同</text>");
}c9["forEach"](function(cU){
cx+="<circle "+"class=\"o"+"vrc-dot"+(cU["youth"]?" youth":'')+"\" cx=\""+cv(cU["age"])["toFixed"](0x1)+"\" cy=\""+cw(cU["ovr"])["toFixed"](0x1)+"\" r=\""+(ca?2.1:2.6)+("\"><title"+'>')+cU["age"]+" 岁 · "+ax(cU["club"]||'')+" · 能力 "+cU["ovr"]+("</title>"+"</circle"+'>');
});
var cP=0.82*cf,cQ=ch["slice"](0x0,0x4)["sort"](function(cU,cV){
return cU["age"]-cV["age"];
}),cR=[];
cQ["forEach"](function(cU){var cV=cR[cR["length"]-0x1];
cV&&cU["age"]-cV["items"][cV["items"]["length"]-0x1]["age"]<=0x2?cV["items"]["push"](cU):cR["push"]({'items':[cU]});
}),cR["forEach"](function(cU){var cV=0x0,cW=0x63;
cU["items"]["forEach"](function(cX){
cV+=cv(cX["age"]),cX["rank"]<cW&&(cW=cX["rank"]);
}),cU['cx']=cV/cU["items"]["length"],cU['w']=cU["items"]["length"]*cP,cU["rank"]=cW;
});
var cS=[];
cR["slice"]()["sort"](function(cU,cV){
return cU["rank"]-cV["rank"];
})["forEach"](function(cU){
for(var cV=0x0;
cV<cS["length"];
cV++)if(Math["abs"](cS[cV]['cx']-cU['cx'])<(cS[cV]['w']+cU['w'])/0x2)return;
cS["push"](cU);
});
var cT=cf+0x8;
return cS["forEach"](function(cU){var cV=cU["items"]["length"],cW=cU['cx']-(cV-0x1)*cP/0x2;
cW=Math["max"](cW,cc+cf/0x2),cW=Math["min"](cW,cc+cl-cf/0x2-(cV-0x1)*cP),cU["items"]["forEach"](function(cX,cY){var cZ=cW+cY*cP,d0=cv(cX["age"]),d1=cw(cg[cX["age"]]);
cx+="<line cl"+"ass=\"ovr"+"c-mile-l"+"\" x1=\""+cZ["toFixed"](0x1)+"\" y1=\""+(cT+0x3)+"\" x2=\""+d0["toFixed"](0x1)+"\" y2=\""+(d1-0x6)["toFixed"](0x1)+("\"/><circ"+"le class"+"=\"ovrc-m"+"ile-d\" c"+"x=\"")+d0["toFixed"](0x1)+"\" cy=\""+d1["toFixed"](0x1)+"\" r=\""+(ca?0x3:3.4)+("\"/><imag"+"e class="+"\"ovrc-mi"+"le-i\" hr"+"ef=\"")+ax(cX["img"])+"\" x=\""+(cZ-cf/0x2)["toFixed"](0x1)+"\" y=\""+(cT-cf)+("\" width="+'\x22')+cf+("\" height"+'=\x22')+cf+("\" preser"+"veAspect"+"Ratio=\"x"+"MidYMax "+"meet\"><t"+"itle>")+ax(cX["label"])+" · "+cX["age"]+(" 岁</titl"+"e></imag"+'e>');
});
}),cx+="<circle "+"class=\"o"+"vrc-peak"+"\" cx=\""+cv(cp["age"])["toFixed"](0x1)+"\" cy=\""+cw(cp["ovr"])["toFixed"](0x1)+"\" r=\""+(ca?3.8:4.4)+("\"><title"+">峰值 ")+cp["ovr"]+" · "+cp["age"]+(" 岁</titl"+"e></circ"+"le>"),
"<div cla"+"ss=\"ovr-"+"chart\"><"+"div clas"+"s=\"ovrc-"+"head\"><s"+"pan clas"+"s=\"ovrc-"+"title\">能"+"力值曲线</sp"+"an><span"+" class=\""+"ovrc-leg"+"end\"><i "+"class=\"l"+"g-youth\""+"></i>青训<"+"i class="+"\"lg-pro\""+"></i>职业<"+"i class="+"\"lg-peak"+"\"></i>峰值"+'\x20'+co+("</span><"+"/div>")+(cx+="</svg>")+"</div>";
}()),c3+=(function(){var c9=au["life"]||{},ca=[];
function cb(cc,cd,ce,cf){
return "<div cla"+"ss=\"life"+"-item"+(cf||'')+("\"><span "+"class=\"l"+"ife-ico\""+'>')+cc+("</span><"+"span cla"+"ss=\"life"+"-text\"><"+"span cla"+"ss=\"life"+"-main\">")+cd+("</span><"+"span cla"+"ss=\"life"+"-sub\">")+ce+("</span><"+"/span></"+"div>");
}return c9["partner"]?ca["push"](['💞',ax(c9["partner"]["label"]),c9["partner"]["since"]+" 岁那年在一起"+(c9["married"]?'，'+c9["married"]+" 岁结婚":'')]):c9["married"]&&ca["push"](['💍',
"结过婚",c9["married"]+'\x20岁']),c9["kids"]&&c9["kids"]["length"]&&ca["push"](['👶',0x1===c9["kids"]["length"]?"一个孩子":c9["kids"]["length"]+" 个孩子",
c9["kids"]["map"](function(cc){
return cc["born"]+'\x20岁';
})["join"](" / ")+"那年出生"]),c9["splits"]&&ca["push"](['🥀',0x1===c9["splits"]?"分开过一次":"分开过 "+c9["splits"]+'\x20次',c9["partner"]?"后来又遇上了人":"之后一个人"]),
"<div cla"+"ss=\"sect"+"ion-head"+"\"><h2>球场"+"以外</h2><"+"span></s"+"pan></di"+'v>'+(ca["length"]?"<div cla"+"ss=\"life"+"-row\">"+ca["map"](function(cc){return cb(cc[0x0],
cc[0x1],cc[0x2]);
})["join"]('')+"</div>":"<div cla"+"ss=\"life"+"-row\">"+cb('⚽',au["seasons"]["length"]?"这些年只有球":"这些还没轮到",au["seasons"]["length"]?"没成家，也没耽误"+"过一次训练":"十几岁就下来了，"+"那些都是后来的事",
" empty")+"</div>");
}()),c3+="<details"+" class=\""+"season-b"+"ook\"><su"+"mmary>逐赛"+"季表现<span"+" class=\""+"sb-note\""+'>'+au["seasons"]["length"]+(" 个赛季，点开看"+"每一年</spa"+"n></summ"+"ary>")+b9(!0x0)+("</detail"+'s>'),
c3+="<div cla"+"ss=\"endi"+"ng\" data"+"-ending="+'\x22'+ax(bY['id'])+("\"><div c"+"lass=\"en"+"ding-eye"+"brow\">")+((au["gen"]||0x1)>0x1?'第\x20'+au["gen"]+" 世 · ":'')+("结局</div>"+"<div cla"+"ss=\"endi"+"ng-title"+"-wrap\"><"+"div clas"+"s=\"endin"+"g-glow\" "+"aria-hid"+"den=\"tru"+"e\">")+ax(bY["title"])+("</div><d"+"iv class"+"=\"ending"+"-title\">")+ax(bY["title"])+("</div></"+"div><div"+" class=\""+"ending-d"+"esc\">")+ax(bY["desc"])+("</div></"+"div>");
var c5=(au["endingsA"+'ll']||[])["filter"](function(c9){return c9!==bY['id'];
});
if(c5["length"]){var c6=c5["map"](bm)["filter"](Boolean)["sort"](function(c9,ca){
return(null==c9["tier"]?0x9:c9["tier"])-(null==ca["tier"]?0x9:ca["tier"]);
});
c3+="<details"+" class=\""+"also-end"+"ings\"><s"+"ummary>这"+"一世还够到了 "+c6["length"]+(" 条结局<spa"+"n class="+"\"ae-note"+"\">点开看是哪些"+"</span><"+"/summary"+"><div cl"+"ass=\"ae-"+"list\">")+c6["map"](function(c9){
return "<div cla"+"ss=\"ae-i"+"tem\"><sp"+"an class"+"=\"ae-tit"+"le\">"+ax(a0["endingVi"+'ew'](c9,bX)["title"])+("</span><"+"span cla"+"ss=\"ae-h"+"int\">")+ax(c9["hint"]||'')+("</span><"+"/div>");
})["join"]('')+("</div><p"+" class=\""+"ae-foot\""+">结局只说一条，"+"是因为一段人生只"+"有一种定性 ——"+" 这些都写进了结"+"局图鉴。</p>"+"</detail"+'s>');
}var c7=a6["legacyFr"+'om'](bW),c8=[];
c7&&(c7["ovr"]&&c8["push"]("能力 +"+c7["ovr"]),c7["talent"]&&c8["push"]("天赋 +"+c7["talent"]["toFixed"](0x2)),c7["guanxi"]&&c8["push"]("关系 +"+c7["guanxi"]),
c7["money"]&&c8["push"]("家底 +"+al(c7["money"]))),c3+="<div cla"+"ss=\"btn-"+"stack\"><"+"button c"+"lass=\"bt"+"n btn-pr"+"imary\" d"+"ata-act="+"\"next-li"+"fe\">下一世<"+"/button>"+"<div cla"+"ss=\"lega"+"cy-note\""+'>'+(c8["length"]?"带走 "+ax(c8["join"](" · "))+"，重新投一次胎":bW["banned"]?"被抹掉的那一世什"+"么也留不下，但你"+"可以重新开始":"这一世没留下什么"+"，下一世从头再来")+("</div><b"+"utton cl"+"ass=\"btn"+"\" data-a"+"ct=\"repl"+"ay\">从头再来"+"</button"+"><button"+" class=\""+"btn\" dat"+"a-act=\"s"+"hare\">生成"+"总结卡</but"+"ton></di"+'v>'),
c3+="<div cla"+"ss=\"seed"+"-row\"><s"+"pan clas"+"s=\"seed-"+"l\">种子</s"+"pan><cod"+"e class="+"\"seed-v\""+'>'+ax(String(au["seed"]))+("</code><"+"button c"+"lass=\"mi"+"ni-btn\" "+"data-act"+"=\"copy-s"+"eed\" dat"+"a-seed=\"")+ax(String(au["seed"]))+("\">复制</bu"+"tton><sp"+"an class"+"=\"seed-n"+"ote\">首页填"+"上它，能再走一遍"+"同一段人生</s"+"pan></di"+'v>'),
aw("summary-"+"area")["innerHTM"+'L']=c3;
}())):void bN();
bM("view-int"+'ro');
}function bP(bW){
a6["commitEv"+"ent"](bW),aA(),bN();
}function bQ(bW){var bX=au["pending"];
if(bX){if("random"===bX["type"]){if(bX["result"]||bf)return;
var bY=a6["resolveE"+"vent"](bW);
if(null===bY)return as();
if(!bY)return;
if(!(bY["roll"]&&bY["roll"]['p']>0.005&&bY["roll"]['p']<0.995&&"function"==typeof requestAnimationFrame)||be())return bP(bY["res"]);
var bZ=(c0=bY["opt"],c1=bY["roll"],(c2=String(c0["hint"]||'')["match"](bd))?{'p':c1['p'],'a':c2[0x2],'b':c2[0x4]}:c0["odds"]&&0x2===c0["odds"]["length"]?{'p':c1['p'],'a':c0["odds"][0x0],'b':c0["odds"][0x1]}:{'p':c1['p'],'a':'成了','b':'没成'});
return bX["roll"]={'p':bZ['p'],'ok':bY["roll"]['ok'],'a':bZ['a'],'b':bZ['b'],'spinning':!0x0},bf=!0x0,bN(),void function(c3){var c4=b3(".roulett"+'e');
if(!c4||!c4["querySel"+"ectorAll"])return c3();
var c5=c4["querySel"+"ectorAll"](".slot");
if(c5["length"]<0x2)return c3();
var c6=au["pending"]["roll"]['ok']?0x0:0x1,c7=0xd;
(c7-0x1)%0x2!==c6&&c7++;
var c8=0x0;
!function c9(){
if(c5[0x0]["classLis"+'t']["toggle"]('on',c8%0x2==0x0),c5[0x1]["classLis"+'t']["toggle"]('on',c8%0x2==0x1),c8>=c7-0x1)setTimeout(c3,
0x208);
else{var ca=c8/(c7-0x1);
c8++,setTimeout(c9,0x5a+0x1a4*Math["pow"](ca,2.2));
}}();
}(function(){
bf=!0x1,au["pending"]&&au["pending"]["roll"]&&(au["pending"]["roll"]["spinning"]=!0x1),bP(bY["res"]);
});
}var c0,c1,c2;
a6["choose"](bW)&&(aA(),ar());
}}function bR(){
a6["cont"](),aA(),ar();
}function cAch(){var bW=aG(),bX={},bY=[];
bW["forEach"](function(c2){
bp(c2)["forEach"](function(c3){var cf=null;
for(var cg=0x0;cg<a0["ENDINGS"]["length"];cg++)if(a0["ENDINGS"][cg]['id']===c3){cf=a0["ENDINGS"][cg];break;}
if(cf&&cf["bonus"]){var ck='',ch;
for(ch in cf["bonus"]){ck=ch;break;}
ck=(function(cg){
return"injury"===cg?"受伤概率-"+Math["round"]((0x1-cf["bonus"][cg])*0x64)+('%'):"ovr"===cg?"初始能力+"+cf["bonus"][cg]:"talent"===cg?"天赋+"+cf["bonus"][cg]["toFixed"](0x2):"growth"===cg?"成长速度+"+Math["round"]((cf["bonus"][cg]-0x1)*0x64)+('%'):"money"===cg?"开局家底+"+cf["bonus"][cg]+'万':"natCall"===cg?"国家队入选+"+Math["round"]((cf["bonus"][cg]-0x1)*0x64)+('%'):"decay"===cg?"30岁后能力回落减半":'';
}(ck));
ck=cf["title"]+"："+ck;
if(bY["indexOf"](ck)<0x0)bY["push"](ck);
for(ch in cf["bonus"])Object["prototype"]["hasOwnProperty"]["call"](cf["bonus"],ch)&&(null==bX[ch]||cf["bonus"][ch]>bX[ch])&&(bX[ch]=cf["bonus"][ch]);}
});});
return{'bonus':bX,'list':bY,'count':bY["length"]};
}function cBch(cf){var cg=[];
for(var ch in cf["bonus"])Object["prototype"]["hasOwnProperty"]["call"](cf["bonus"],ch)&&cg["push"](function(ch){var v=cf["bonus"][ch];
return"injury"===ch?"受伤概率-"+Math["round"]((0x1-v)*0x64)+('%'):"ovr"===ch?"初始能力+"+v:"talent"===ch?"天赋+"+v["toFixed"](0x2):"growth"===ch?"成长速度+"+Math["round"]((v-0x1)*0x64)+('%'):"money"===ch?"开局家底+"+v+'万':"natCall"===ch?"国家队入选+"+Math["round"]((v-0x1)*0x64)+('%'):"decay"===ch?"30岁后能力回落减半":'';
}(ch));
return cg["join"]("、");
}function bS(bW){
b2=null;
var bX,bY=ay("mode","normal"),bZ=av;
(!(bX=ay("pid",null))||String(bX)["length"]<0x8)&&az("pid",bX='p'+Date["now"]()["toString"](0x24)+Math["random"]()["toString"](0x24)["slice"](0x2,0xc));
var c0=aB();
aD();
var c1,c2,c3,c4=(c2=(c1=aw("in-seed"))&&null!=c1["value"]?String(c1["value"])["trim"]():'')?/^\d{1,15}$/["test"](c2)?Number(c2):c2["slice"](0x0,
0x20):null,c5=null!=c4?c4:Math["floor"](0x3b9aca00*Math["random"]());
if(null!=c4){var c6=aw("in-seed");
c6&&(c6["value"]=''),bK("按种子 "+c4+" 开局");
}(au=a6["newState"](bY,bZ,c5,c0,(aw("ach-boost")&&aw("ach-boost")["checked"]?cAch()["bonus"]:null)))["cheat"]||(c3=bZ)&&az("ident",{'name':c3["name"],'number':c3["number"],'foot':c3["foot"],
'pos':c3["pos"]}),au["maxOvr"]=au["ovr"],au["rid"]=null,aA(),as(),bW&&bW(au);
}function bT(){
bf=!0x1,aJ(),au=null,a6["attach"](null),bU();
}function bU2(bW,bX){if("郝海东"===bW&&9===bX)return'郝海东';
if("范志毅"===bW&&5===bX)return'范志毅';
if("孙继海"===bW&&12===bX)return'孙继海';
if("郑智"===bW&&10===bX)return'郑智';
if("武磊"===bW&&7===bX)return'武磊';
return'';
}
function bU1(){var rr,lt,bs,pp;
pp=a0["POSITIONS"][Math["floor"](Math["random"]()*a0["POSITIONS"]["length"])]["id"];
rr=Math["floor"](Math["random"]()*0x64);
if(rr<0x5){lt=[['郝海东',0x9],['范志毅',0x5],['孙继海',0xc],['郑智',0xa],['武磊',0x7]];
bs=lt[rr];
return{'name':bs[0x0],'number':bs[0x1],'pos':pp,'foot':0x0===rr%0x2?'left':'right'};
}var sn=['李','王','张','刘','陈','杨','赵','黄','周','吴','徐','孙','胡','朱','高','林','何','郭','马','罗'],gn=['伟','磊','军','洋','勇','明','强',
'杰','涛','超','斌','刚','平','辉','鹏','华','飞','凯','健','龙'];
return{'name':sn[Math["floor"](Math["random"]()*sn["length"])]+gn[Math["floor"](Math["random"]()*gn["length"])],'number':0x1+Math["floor"](Math["random"]()*0x63),
'pos':pp,'foot':Math["random"]()<0.5?'left':'right'};
}
function bU(){var bW,bs;
(bW=ay("ident",null))&&"object"==typeof bW||(bW={});
if("string"==typeof bW["name"]&&bW["name"]["trim"]())bs={'name':bW["name"]["trim"]()["slice"](0x0,0x6),'number':ad(parseInt(bW["number"],0xa)||0xa,0x1,0x63),
'foot':"left"===bW["foot"]?"left":"right",'pos':bW["pos"]||'ST'};
else{bs=bU1();
bW["foot"]=bs["foot"];
}av={'name':bs["name"],'number':bs["number"],'foot':"left"===bW["foot"]?"left":"right",'dreamId':null,'pos':bs["pos"],'origin':a9[0x0]},
aX=0x0,bM("view-ide"+"ntity"),b0();
}var bV={'long':"每个赛季一次决策"+"，最细最长",'normal':"每两个赛季一次决"+"策，节奏适中",'express':"每三个赛季一次决"+"策，一局二十分钟"};
document["addEvent"+"Listener"]("DOMConte"+"ntLoaded",function(){
!(function(){var bX;
aw("hero-art")["innerHTM"+'L']=(function(){
for(var c8=aV('hg'),c9=aV('hl'),ca='',cb=0x0;
cb<0x8;
cb++)cb%0x2!=0x0&&(ca+="<rect x="+'\x22'+0x32*cb+("\" y=\"0\" "+"width=\"5"+"0\" heigh"+"t=\"300\" "+"fill=\"#f"+"ff\" fill"+"-opacity"+"=\".05\"/>"));
return "<svg vie"+"wBox=\"0 "+"0 400 30"+"0\" prese"+"rveAspec"+"tRatio=\""+"xMidYMid"+" slice\" "+"aria-hid"+"den=\"tru"+"e\"><defs"+"><linear"+"Gradient"+" id=\""+c8+("\" x1=\"0\""+" y1=\"0\" "+"x2=\".5\" "+"y2=\"1\"><"+"stop off"+"set=\"0\" "+"stop-col"+"or=\"#155"+"63e\"/><s"+"top offs"+"et=\".55\""+" stop-co"+"lor=\"#0e"+"3b2b\"/><"+"stop off"+"set=\"1\" "+"stop-col"+"or=\"#082"+"51b\"/></"+"linearGr"+"adient><"+"radialGr"+"adient i"+"d=\"")+c9+("\" cx=\".5"+"\" cy=\".4"+"2\" r=\".6"+"2\"><stop"+" offset="+"\"0\" stop"+"-color=\""+"#34d399\""+" stop-op"+"acity=\"."+"2\"/><sto"+"p offset"+"=\"1\" sto"+"p-color="+"\"#34d399"+"\" stop-o"+"pacity=\""+"0\"/></ra"+"dialGrad"+"ient></d"+"efs><rec"+"t width="+"\"400\" he"+"ight=\"30"+"0\" fill="+"\"url(#")+c8+")\"/>"+ca+("<rect wi"+"dth=\"400"+"\" height"+"=\"300\" f"+"ill=\"url"+'(#')+c9+(")\"/><g f"+"ill=\"non"+"e\" strok"+"e=\"#eaff"+"f6\" stro"+"ke-opaci"+"ty=\".3\" "+"stroke-w"+"idth=\"2\""+"><rect x"+"=\"26\" y="+"\"26\" wid"+"th=\"348\""+" height="+"\"248\" rx"+"=\"2\"/><l"+"ine x1=\""+"200\" y1="+"\"26\" x2="+"\"200\" y2"+"=\"274\"/>"+"<circle "+"cx=\"200\""+" cy=\"150"+"\" r=\"46\""+"/><rect "+"x=\"26\" y"+"=\"92\" wi"+"dth=\"52\""+" height="+"\"116\"/><"+"rect x=\""+"322\" y=\""+"92\" widt"+"h=\"52\" h"+"eight=\"1"+"16\"/><re"+"ct x=\"26"+"\" y=\"126"+"\" width="+"\"18\" hei"+"ght=\"48\""+"/><rect "+"x=\"356\" "+"y=\"126\" "+"width=\"1"+"8\" heigh"+"t=\"48\"/>"+"</g><cir"+"cle cx=\""+"200\" cy="+"\"150\" r="+"\"5\" fill"+"=\"#eafff"+"6\" fill-"+"opacity="+"\".8\"/></"+"svg>");
}()),aw("intro-fa"+"cts")["innerHTM"+'L']=[[a1["length"],"个事件"],[a0["ENDINGS"]["length"],"条结局"],[a0["TEAMS"]["length"],"支球队"],
['12',"岁开踢"]]["map"](function(c8){
return "<li><b>"+c8[0x0]+("</b><spa"+'n>')+ax(c8[0x1])+("</span><"+"/li>");
})["join"](''),(bX=window["SUPPORTE"+'RS']||[])["length"]&&(aw("thanks-r"+'ow')["innerHTM"+'L']=bX["map"](function(c8){
return "<span cl"+"ass=\"thx"+'\x22>'+ax(c8["name"])+"</span>";
})["join"](" · "),aw("thanks")["classLis"+'t']["remove"]("hidden")),aw("btn-help")["addEvent"+"Listener"]("click",function(){
aw("help-mod"+'al')["classLis"+'t']["remove"]("hidden");
}),aw("btn-open"+"-news")["addEvent"+"Listener"]("click",function(){
aw("help-mod"+'al')["classLis"+'t']["add"]("hidden"),aw("news-mod"+'al')["classLis"+'t']["remove"]("hidden");
}),document["addEvent"+"Listener"]("click",function(c8){var c9=c8["target"]["getAttri"+"bute"]&&c8["target"]["getAttri"+"bute"]("data-clo"+'se');
c9&&aw(c9)["classLis"+'t']["add"]("hidden"),c8["target"]["classLis"+'t']&&c8["target"]["classLis"+'t']["contains"]("overlay")&&c8["target"]["classLis"+'t']["add"]("hidden");
});
var bY=aw("share-na"+'me');
bY&&bY["addEvent"+"Listener"]("change",function(){
bw=bY["checked"],bE();
});
var bZ=!(!navigator["canShare"]||!navigator["share"]),c0=!!(window["Clipboar"+"dItem"]&&navigator["clipboar"+'d']&&navigator["clipboar"+'d']["write"]),
c1=function(c8){
if(document["querySel"+"ector"]){var c9=document["querySel"+"ector"]("[data-sh"+"are=\""+c8+'\x22]');
c9&&c9["classLis"+'t']["add"]("hidden");
}};
bZ||c1("share"),c0||c1("copy"),bF()&&c1("save");
var c2=aw("share-ti"+'p');
if(c2&&!bF()&&(!bZ||!c0)){var c3=!0x0;
try{c3=!0x1!==window["isSecure"+"Context"];
}catch(c8){}c2["textCont"+"ent"]=c3?"这个浏览器只支持"+"「保存图片」，另"+"外两个键用不了":"浏览器只在 ht"+"tps 和 lo"+"calhost "+"下开放分享 / "+"复制图片。现在是"+"用 IP 访问的"+"，先用「保存图片"+'」。',
c2["classLis"+'t']["remove"]("hidden");
}var c4=aw("share-mo"+"dal");
c4&&c4["addEvent"+"Listener"]("click",function(c9){var ca=c9["target"]["closest"]&&c9["target"]["closest"]("[data-ep"+']');
if(ca){var cb=bG&&bG["endingCh"+"oices"]&&bG["endingCh"+"oices"][Number(ca["getAttri"+"bute"]("data-ep"))];
if(!cb||!bG)return;
return bG["endingTi"+"tle"]=cb["title"],bx=null,bI(bG),bE(bG);
}if(c9["target"]["closest"]&&c9["target"]["closest"]("[data-ac"+"t=\"card-"+"next-lif"+"e\"]")){var cc=bG&&bG["legacy"];
if(!cc)return;
return aC(cc),aw("share-mo"+"dal")["classLis"+'t']["add"]("hidden"),bK('第\x20'+cc["gen"]+(" 世，重新投一次"+'胎')),bT();
}var cd=c9["target"]["closest"]&&c9["target"]["closest"]("[data-sh"+"are]");
if(cd){var ce=cd["getAttri"+"bute"]("data-sha"+'re');
(bx?Promise["resolve"](bx):new Promise(function(cf){var cg=aw("share-ca"+"nvas");
if(!cg||!cg["toBlob"])return cf(null);
cg["toBlob"](function(ch){bx=ch,cf(ch);
},"image/pn"+'g');
}))["then"](function(cf){
if(!cf)return bK("这个浏览器存不了"+"图，试试截屏");
var cg=bG||bC(),ch=a3+'-'+cg["name"]+".png";
if("save"===ce){var ci=URL["createOb"+"jectURL"](cf),cj=document["createEl"+"ement"]('a');
return cj["href"]=ci,cj["download"]=ch,document["body"]["appendCh"+"ild"](cj),cj["click"](),cj["remove"](),setTimeout(function(){
URL["revokeOb"+"jectURL"](ci);
},0xfa0),bK("图片已保存");
}if("copy"!==ce){if("share"===ce){var ck=new File([cf],ch,{'type':"image/pn"+'g'});
if(!navigator["canShare"]({'files':[ck]}))return bK("这个设备不支持分"+"享图片");
navigator["share"]({'files':[ck],'text':bJ(cg)})["catch"](function(){});
}}else{var cl=new ClipboardItem({'image/png':cf});
navigator["clipboar"+'d']["write"]([cl])["then"](function(){
bK("图片已复制，可以"+"直接粘贴");
},function(){
bK("复制失败，用保存"+"那个键吧");
});
}});
}}),aw("brand-ho"+'me')["addEvent"+"Listener"]("click",function(){
au&&"summary"!==au["phase"]&&!confirm("回首页会保留当前"+"存档，确定？")||bM("view-int"+'ro');
}),aw("mode-seg")["addEvent"+"Listener"]("click",function(c9){var ca=c9["target"]["closest"]("[data-mo"+"de]");
if(ca){var cb=ca["getAttri"+"bute"]("data-mod"+'e');
Array["prototyp"+'e']["forEach"]["call"](this["children"],function(cc){
cc["classLis"+'t']["toggle"]("selected",cc===ca);
}),az("mode",cb),aw("seg-note")["textCont"+"ent"]=bV[cb];
}});
var c5=ay("mode","normal");
Array["prototyp"+'e']["forEach"]["call"](aw("mode-seg")["children"],function(c9){
c9["classLis"+'t']["toggle"]("selected",c9["getAttri"+"bute"]("data-mod"+'e')===c5);
}),aw("seg-note")["textCont"+"ent"]=bV[c5]||bV["normal"],aw("btn-star"+'t')["addEvent"+"Listener"]("click",function(){var c9=aI();
if(c9&&"summary"!==c9["phase"]&&c9["seasons"]&&c9["seasons"]["length"]){if(confirm("检测到上次的存档"+'（'+c9["name"]+'，'+c9["age"]+(" 岁），继续吗？"+"\n取消则重新开始"+'。')))return au=c9,
a6["attach"](au),void bO();
aJ();
}bU();
}),aw("btn-back")["addEvent"+"Listener"]("click",function(){
if(0x0===aX)return bM("view-int"+'ro');
aX--,b0();
}),aw("btn-next")["addEvent"+"Listener"]("click",function(){
if(aX<aY["length"]-0x1)return aX++,void b0();
bS();
}),aw("step-bod"+'y')["addEvent"+"Listener"]("click",function(c9){var ca=c9["target"]["closest"]("[data-or"+"igin]");
if(ca)return av["origin"]=ak(ca["getAttri"+"bute"]("data-ori"+"gin")),b0();
var cY=c9["target"]["closest"]("[data-r"+"eroll]");
if(cY){var cZ=bU1();
av["name"]=cZ["name"],av["number"]=cZ["number"],av["foot"]=cZ["foot"];
return b0();
}var cb=c9["target"]["closest"]("[data-po"+'s]');
if(cb)return av["pos"]=cb["getAttri"+"bute"]("data-pos"),b0();
var cc=c9["target"]["closest"]("[data-fo"+"ot]");
if(cc)return av["foot"]=cc["getAttri"+"bute"]("data-foo"+'t'),b0();
var cd=c9["target"]["closest"]("[data-dr"+"eamlg]");
if(cd)return aZ=cd["getAttri"+"bute"]("data-dre"+"amlg"),b0();
var ce=c9["target"]["closest"]("[data-dr"+"eam]");
if(ce){var cf=ce["getAttri"+"bute"]("data-dre"+'am');
return av["dreamId"]=cf&&cf!==av["dreamId"]?cf:null,b0();
}}),aw("step-bod"+'y')["addEvent"+"Listener"]("input",function(c9){
if("in-name"===c9["target"]['id']||"in-numbe"+'r'===c9["target"]['id']){"in-name"===c9["target"]['id']?av["name"]=c9["target"]["value"]["trim"]()||'无名':av["number"]=ad(parseInt(c9["target"]["value"],0xa)||0xa,0x1,0x63);
var ca=aw("step-bod"+'y')["querySel"+"ector"](".jersey-"+"wrap");
ca&&(ca["innerHTM"+'L']=aM(av["origin"],av["name"],av["number"]));
}}),aw("app")["addEvent"+"Listener"]("click",function(c9){var ca=c9["target"]["closest"]("[data-tab]");
if(ca){var cTab=ca["getAttri"+"bute"]("data-tab"),cBtns=document["querySel"+"ectorAll"](".tl-tab"),cPans=document["querySel"+"ectorAll"](".tl-panel");
for(var cI=0x0;cI<cBtns["length"];cI++)cBtns[cI]["classLis"+'t']["toggle"]("on",cBtns[cI]===ca);
for(var cJ=0x0;cJ<cPans["length"];cJ++){var cK=cPans[cJ]["getAttri"+"bute"]("data-panel");
cK===cTab?cPans[cJ]["classLis"+'t']["remove"]("hidden"):cPans[cJ]["classLis"+'t']["add"]("hidden");
}
return!0x1;}var ca=c9["target"]["closest"]("[data-op"+'t]');
if(ca)return bQ(ca["getAttri"+"bute"]("data-opt"));
var cb=c9["target"]["closest"]("[data-ac"+'t]');
if(cb){var cc=cb["getAttri"+"bute"]("data-act");
if("continue"===cc)return bR();
if("restart"===cc){if(bf)return;
if(!confirm("这一局就不要了？"+"当前存档会清掉，"+"重新选出身开一局"+"新的。"))return;
return bT();
}if("next-lif"+'e'===cc)return aC(a6["legacyFr"+'om'](aq())),bT();
if("replay"===cc)return aD(),bT();
if("share"===cc)return bH();
if("copy-see"+'d'===cc)return function(cd){
if(cd){var ce=aw("in-seed");
ce&&(ce["value"]=cd);
var cf=null;
try{cf=navigator["clipboar"+'d'];
}catch(cg){}cf&&cf["writeTex"+'t']?cf["writeTex"+'t'](String(cd))["then"](function(){
bK("种子已复制，也填"+"进首页了");
},function(){
bK("复制不了，已经填"+"进首页的种子框");
}):bK("这个浏览器不给复"+"制，已经填进首页"+"的种子框");
}}(cb["getAttri"+"bute"]("data-see"+'d'));
if("arc-back"===cc)return bM("view-int"+'ro');
if("codex-ba"+'ck'===cc)return bM("view-int"+'ro');
if("arc-clea"+'r'===cc){if(!confirm("清空生涯历史档案"+"？这些记录只存在"+"这台设备上，清了"+"找不回来。"))return;
return(function(){
try{localStorage["removeIt"+'em'](a2+"archive");
}catch(cd){}}()),bK("档案已清空"),bs();
}}}),aw("view-arc"+"hive")["addEvent"+"Listener"]("click",function(c9){
if(c9["target"]["closest"]&&!c9["target"]["closest"]("[data-ac"+'t]')){var ca=c9["target"]["closest"]("[data-ar"+'c]');
ca&&br(parseInt(ca["getAttri"+"bute"]("data-arc"),0xa));
}});
var c6=aw("btn-arch"+"ive");
c6&&c6["addEvent"+"Listener"]("click",bs);
var c7=aw("btn-code"+'x');
c7&&c7["addEvent"+"Listener"]("click",bq);
}());
var bW=aI();
bW&&bW["seasons"]&&bW["seasons"]["length"]?(au=bW,au["eventLog"]||(au["eventLog"]=[]),(au["seasons"]||[])["forEach"](function(c2){
if((c2["trophies"]||[])["length"]&&!au["eventLog"]["some"](function(c5){return c5["age"]===c2["age"]&&/冠军/["test"](c5["title"]);}))(c2["trophies"]||[])["forEach"](function(c5){/冠军/["test"](c5)&&au["eventLog"]["push"]({'age':c2["age"],'title':c5,"text":'夺冠'});});
if(c2["note"]&&!au["eventLog"]["some"](function(c5){return c5["age"]===c2["age"]&&"伤病"===c5["title"];}))au["eventLog"]["push"]({'age':c2["age"],'title':"伤病","text":c2["note"]});
}),a6["attach"](au),bO()):bM("view-int"+'ro'),ay("pid",null)||ay("save",null)||ay("mode",
null)?ay("news_ver",'')!==a4&&(aw("news-mod"+'al')["classLis"+'t']["remove"]("hidden"),az("news_ver",a4)):az("news_ver",a4);
}),window["__SIMTES"+'T']={'origins':a9,'modes':a8,'start':function(bW,bX,bY){
return b2=null,(au=a6["newState"](bW,bX,bY))["maxOvr"]=au["ovr"],as(),au;
},'state':function(){return au;
},'startOnline':function(bW,bX,bY){
av=bX,az("mode",bW),bS(bY);
},'option':function(bW){return bQ(bW),au;
},'cont':function(){return bR(),au;
},'render':function(){return bO(),au;
},'showIntro':function(){
bM("view-int"+'ro');
},'openArchive':function(){bs();
},'openCodex':function(){bq();
},'showIdentity':function(bW,bX){
return bX&&(av=bX),aX=bW||0x0,bM("view-ide"+"ntity"),b0(),av;
},'arcCard':function(bW){return br(bW),bE();
},'openShare':function(){return bH();
},'cardData':function(){return bG;
},'drawShare':function(){return bE();
}};
}()));
function _gam_0b(x,x){return '';}function _gam_0a(){return [];}