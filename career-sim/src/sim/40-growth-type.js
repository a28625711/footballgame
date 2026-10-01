// ---- part:06 | 成长曲线 · §4 + 球员类型系统 · §5 + 天赋天花板 ----





/* ── §4 成长曲线 ──────────────────────────────────────────────── */




function aG(bx){
var T=a0["GROWTH"],N=T["length"];
if(bx>=T[N-1]["age"])return T[N-1]['d'];
var k=0x0;
while(k<N-0x2&&bx>=T[k+0x1]["age"])k++;
var t=Math["max"](0,Math["min"](1,(bx-T[k]["age"])/(T[k+1]["age"]-T[k]["age"]))),



p=T[k]['d'],q=T[k+1]['d'];
return [p[0]+(q[0]-p[0])*t,p[1]+(q[1]-p[1])*t];}




/* ── §5 球员类型系统 ────────────────────────────────────────────── */




var TYPE_MODS=[{'g':1.30,'a':0.60},{'g':0.85,'a':1.45},{'g':1.10,'a':1.10},{'g':1.08,'a':0.95},{'g':1.18,'a':0.70},{'g':1.45,'a':0.80},



{'g':0.95,'a':1.05},{'g':0.40,'a':0.70},{'g':1.00,'a':1.60},{'g':0.90,'a':1.15},{'g':0.55,'a':0.50},{'g':1.00,'a':1.00}];
function calcPlayerType(){var p=a2["pos"],



t=a2["talent"],o=a2["ovr"],a=a2["age"];
if(p==="GK")return 0xb;
if(p==="ST")return t>=1.25?0x2:(t>=1.05?(a<=0x14?0x3:0x0):(o>=35?0x0:0x4));
/* 每个非门将位置至少 3 种初始类型：
   边锋 0射手/3速度/2全能 · CAM 2全能/1组织/5影锋 · CDM 1组织/6B2B/7铁腰
   CB 9自由人/2全能/10铁卫 · 边后卫 9自由人/8边后卫/3速度 */
if(p==="RW"||p==="LW")return t>=1.25?0x0:(t>=1.05?(a<=0x16?0x3:0x0):(o>=40?0x3:0x2));
if(p==="CAM")return t>=1.25?0x2:(t>=1.15?0x1:(o>=50?0x1:0x5));
if(p==="CDM")return t>=1.25?0x1:(t>=1.15?0x6:0x7);
if(p==="CB")return t>=1.2?0x9:(t>=1.05?0x2:0xa);
return t>=1.2?0x9:(t>=1.05?0x8:(a<=0x16?0x3:0x8));}
/* 位置迁移：只允许合理相邻路径，且不得从起始战线一路前/后迁移到底
   例：前场内多次/前锋→中场 允许；前场→中场→后场 禁止（以起始 group 为准，距离≤1） */
var _POSADJ={'GK':[],'CB':['LB','RB','CDM'],'LB':['CB','LM','CM','LW'],'RB':['CB','RM','CM','RW'],
'CDM':['CM','CB'],'CM':['CDM','CAM','LM','RM'],'CAM':['CM','LM','RM','LW','RW','ST'],
'LM':['CM','LB','LW','CAM'],'RM':['CM','RB','RW','CAM'],'LW':['LM','ST','CAM','RW'],
'RW':['RM','ST','CAM','LW'],'ST':['CAM','LW','RW']};
var _GRPIDX={'gk':0x0,'def':0x1,'mid':0x2,'att':0x3};
function _posOriginGrp(p){return a2["flags"]&&a2["flags"]["_posOrigin"]||al(p||a2["pos"])["group"];}
function _posMoves(p,back){var o=_POSADJ[p]||[],oi=_GRPIDX[_posOriginGrp(p)],cur=_GRPIDX[al(p)["group"]],out=[];
for(var i=0x0;i<o["length"];i++){var t=o[i],gi=_GRPIDX[al(t)["group"]];if(Math["abs"](gi-oi)>0x1)continue;if(back&&!(gi<cur))continue;out["push"](t);}return out;}
function _posMoveOk(from,to){return (_POSADJ[from]||[]).indexOf(to)>=0x0&&Math["abs"](_GRPIDX[al(to)["group"]]-_GRPIDX[_posOriginGrp(from)])<=0x1;}
/* 类型签名事件表：下标 = playerType（0..10），门将(11)由 gk.ev.js 承担 */
var _TYPE_SIG=["type_finisher","type_playmaker","type_complete","type_pace","type_target","type_shadow","type_b2b","type_anchor","type_fullback","type_libero","type_stopper"];

/* ── 天赋挂钩的成长衰减（成长与事件共用）────────────────────────
   软天花板 capC = _CAPB + _CAPS*tN，tN=clamp((talent-0.7)/0.78,0,1)
   衰减：x = clamp((capC-ovr)/_CAPW, 0, 1)，wall = _CAPF + (1-_CAPF)*x^_CAPP
   平滑曲线（可导、两端斜率趋 0）：早期即开始温和衰减、贴边不再断崖。
   换更"硬"的窗口：_CAPP=1（线性）；换"更宽"：调大 _CAPW 并重拟合 _CAPB/_CAPS
   实测（纯成长模型）：0.7→69.9 0.8→72.6 1.0→78.3 1.15→82.0 1.3→85.4 1.45→87.9 1.48→88.4 */
var _CAPB=0x55,_CAPS=0x22,_CAPW=0x22,_CAPP=1.6,_CAPF=0.06;
function _capWall(bx,by){var _x=ac((_CAPB+_CAPS*ac((bx-0.7)/0.78,0x0,0x1)-by)/_CAPW,0x0,0x1);return _CAPF+(1-_CAPF)*Math["pow"](_x,_CAPP);}