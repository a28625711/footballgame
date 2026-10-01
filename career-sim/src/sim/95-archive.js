// ---- part:21 | 赛程归档打包/解包 ----





/* 赛程归档：世界面板回看往年（滚动保留最近 6 季） */
function _fxArch(key,fx){
if(!fx||!fx["data"])return;
var empty=true;for(var k in fx["data"]){empty=false;break;}
if(empty)return;
var arr=a2[key]=a2[key]||[];
for(var i=0;i<arr.length;i++)if(arr[i]["season"]===fx["season"])return;
arr.push(fx);
}
/* 世界归档季标签：青训期 seasons 未计数，用 年龄-100（负数，时序升序）；职业期=季数 */
function _fxSeasonLab(){
return a2["phase"]==="youth"?(a2["age"]||12)-100:a2["seasons"]["length"]+1;
}
/* 归档打包：存档走 localStorage，原始对象太重；id→名称在解码时反查 */
/* 赛程归档压缩：每联赛只存一次队伍名册，逐场用 36 进制索引+比分，省掉重复队名（体积约减半） */
function _pkFxLeague(d){
var ros=[],idx={},s="";
for(var r=0;r<d.length;r++){var rd=d[r];
for(var m=0;m<rd.length;m++){var M=rd[m],h=M[0],a=M[1];
if(idx[h]==null){idx[h]=ros.length;ros.push(h);}
if(idx[a]==null){idx[a]=ros.length;ros.push(a);}
s+=idx[h].toString(36)+";"+idx[a].toString(36)+";"+M[2].toString(36)+";"+M[3].toString(36)+",";
}
s+="|";
}
return ros.join(",")+"#"+s;
}
function _unpkFx(str){
if(str==null)return null;
var i2=str.indexOf("#");
if(i2<0)return null;
var ros=str.slice(0,i2).split(","),body=str.slice(i2+1);
return body.split("|").map(function(rd){
if(!rd)return[];
return rd.split(",").filter(function(m){return m;}).map(function(m){
var f=m.split(";");
return[ros[parseInt(f[0],36)],ros[parseInt(f[1],36)],parseInt(f[2],36),parseInt(f[3],36)];
});
});
}
function _pkRow(r){return [r["i"],r["pts"],r["w"],r["d"],r["l"],r["gf"],r["ga"]].join(",");}
function _pkTblArr(rows){return rows.map(_pkRow).join(";");}
function _unpkRows(str){
if(!str)return null;
return str.split(";").map(function(row,ri){var f=row.split(",");
var t=aj(f[0]);
return{'i':f[0],'n':t?t.name:f[0],'pts':Number(f[1]),'w':Number(f[2]),'d':Number(f[3]),'l':Number(f[4]),'gf':Number(f[5]),'ga':Number(f[6]),'rank':ri+1,'pos':ri+1};});}
function _pkTie(t){return [t["h"]||"",t["a"]||"",t["hg"]==null?"":t["hg"],t["ag"]==null?"":t["ag"],t["sa"]==null?"":t["sa"],t["sb"]==null?"":t["sb"],t["w"]||"",t["p"]?t["p"].join("-"):"",t["b"]?1:"",t["pd"]?1:""].join("~");}
function _unpkTie(sv){var f=sv.split("~");
var o={'h':f[0]||null,'a':f[1]||null};
if(f[2]!=="")o.hg=Number(f[2]);
if(f[3]!=="")o.ag=Number(f[3]);
if(f[4]!=="")o.sa=Number(f[4]);
if(f[5]!=="")o.sb=Number(f[5]);
o.w=f[6]||null;
if(f[7]){var pp=f[7].split("-");o.p=[Number(pp[0]),Number(pp[1])];}
if(f[8]==="1")o.b=1;
if(f[9]==="1")o.pd=1;
return o;}
function _pkBrRds(br){return (br||[]).map(function(rd){return rd["name"]+"#"+rd["ties"].map(_pkTie).join("@");});}
function _unpkBrRds(arr){return (arr||[]).map(function(sv){var i2=sv.indexOf("#");
return{'name':sv.slice(0,i2),'ties':sv.slice(i2+1).split("@").map(_unpkTie)};});}
function _pkContData(data){var o={};
for(var tg in data){var cd=data[tg];if(!cd)continue;
var e={'name':cd["name"],'champion':cd["champion"]};
if(cd["group"])e.group={'standings':(cd["group"]["standings"]||[]).map(_pkRow).join(";"),'matches':(cd["group"]["matches"]||[]).join(";")};
if(cd["rounds"])e.rounds=_pkBrRds(cd["rounds"]);
o[tg]=e;}
return o;}
function _unpkContData(pk){var o={};
for(var tg in pk){var e=pk[tg];
var cd={'name':e["name"],'champion':e["champion"]};
if(e["group"])cd.group={'standings':_unpkRows(e["group"]["standings"]),'matches':e["group"]["matches"]?e["group"]["matches"].split(";").map(Number):[]};
if(e["rounds"])cd.rounds=_unpkBrRds(e["rounds"]);
o[tg]=cd;}
return o;}
function _pkCupData(data){var o={};
for(var k in data){var br=data[k];if(!br)continue;
o[k]={'champion':br["champion"],'n':br["n"],'all':_pkBrRds(br["all"])};}
return o;}
function _archPush(key,season,payload,cap){
var arr=a2[key]=a2[key]||[];
for(var i=0;i<arr.length;i++)if(arr[i]["season"]===season)return;
arr.push({'season':season,'data':payload});
if(cap&&arr.length>cap)arr.splice(0,arr.length-cap);
}
function _fxSeasons(cur,arch){
var out=[],seen={};
if(cur!=null){out.push(cur);seen[cur]=1;}
(arch||[]).forEach(function(f){if(f&&f["season"]!=null&&!seen[f["season"]]){seen[f["season"]]=1;out.push(f["season"]);}});
return out.sort(function(x,y){return x-y;});
}