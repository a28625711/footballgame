// ---- part:07 | 角色与能力 · §6（角色/工资系数/能力值） ----





/* ── §6 角色与能力 ──────────────────────────────────────────────── */




function aH(){var bx=ar();
return bx?aI(bx):"sub";
}function aI(bx){var by=0x30+0x7*bx["rep"],bz=a2["ovr"]-by+0x3*a2["roleAdju"+'st'];
return aq(bx)['cn']&&(bz+=0.12*(a2["guanxi"]-0x32)),



a2["age"]<=0x12&&(bz-=0x6),a2["age"]>=0x23&&(bz-=0x3),bz>=0x6?"star":bz>=0x2?"starter":bz>=-0x5?"rot":bz>=-0xc?"sub":"bench";
}/* 富裕联赛工资系数：现实里沙特联/美职联给五大联赛出来的球员开价很高；旧口径按 rep 只给 1.5×（沙特联 rep3、美职联 rep2）明显偏低 */
var _lgPay={'mls':2.6,'spl':2.9,'csl':2.6,'mx':2.2,'jl':2.0,'kl':2.0,'ale':1.8,'bra':1.6,'arg':1.6};
function aJ(bx,



by,bz){var bA=Math["max"](0x0,bz-0x2d)/0x32,bB=(by&&_lgPay[by['id']])||(by['cn']?2.6:by["rep"]>=0x4?2.4:1.5);
return Math["max"](0x3,0x140*Math["pow"](bA,2.2)*(0.9+0.55*bx["rep"])*bB);
}function aK(){var bx=al(a2["pos"])["group"];
return "att"===bx?{'goal':0.65,'ast':0.28}:"mid"===bx?{'goal':0.2,'ast':0.38}:"def"===bx?{'goal':0.09,'ast':0.14}:{'goal':0x0,
'ast':0.01};
}function aL(){
return ac((a2["ovr"]-0x48)/0x18,0x0,0x1);
}function aM(){return{'wcq':0.05+0.7*aL()};
}var aN=[{'p':[0.14,0.5],'next':"十六强"},



{'p':[0.22,0.42],'next':'八强'},{'p':[0.2,0.42],'next':'四强'},{'p':[0.25,0.38],'next':'决赛'},
{'p':[0.32,0.32],'next':'冠军'}],


aO=[{'p':[0.55,0.38],'next':"十六强"},
{'p':[0.33,0.42],'next':'八强'},{'p':[0.28,0.44],'next':'四强'},
{'p':[0.32,0.4],'next':'决赛'},


{'p':[0.38,0.34],'next':'冠军'}];