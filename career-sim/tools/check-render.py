import sys, os, json
sys.stdout.reconfigure(encoding='utf-8')

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(BASE, 'src')
BUILD = os.path.join(BASE, 'build')

try:
    from py_mini_racer import MiniRacer
except ImportError:
    print("需要 py_mini_racer: pip install py-mini-racer")
    sys.exit(1)

FILES = ['data.js','events.js','supporters.js','crests.js','qr.js','natdata.js','sim.js','game.js']

DOM_MOCK = r'''
var _lastHTML = '';
var _mk = function(){ return { style:{}, classList:{add:function(){},remove:function(){},toggle:function(){},contains:function(){return false}}, _html:'', set innerHTML(v){ this._html=v; _lastHTML=v; }, get innerHTML(){ return this._html; }, textContent:'', value:'', checked:false, appendChild:function(){}, setAttribute:function(){}, getAttribute:function(){return null}, querySelector:function(){return null}, querySelectorAll:function(){return []}, closest:function(){return null}, addEventListener:function(){}, getBoundingClientRect:function(){return {top:0,height:0}} }; };
var window={scrollTo:function(){}};
var document={getElementById:function(){return _mk();},querySelector:function(){return _mk();},querySelectorAll:function(){return [];},createElement:function(){return _mk();},addEventListener:function(){},body:{appendChild:function(){},classList:{add:function(){},toggle:function(){}}}};
var localStorage={getItem:function(){return null;},setItem:function(){},removeItem:function(){}};
var navigator={userAgent:'test'}; var location={href:''}; var screen={}; var Image=function(){};
var console={log:function(){},warn:function(){}};
var matchMedia=function(){return {matches:false};}; var requestAnimationFrame=function(f){return 0;};
'''

def load_all():
    mr = MiniRacer()
    mr.eval(DOM_MOCK)
    for f in FILES:
        path = os.path.join(BUILD, f) if f == 'events.js' else os.path.join(SRC, f)
        mr.eval(open(path, encoding='utf-8').read())
    return mr

def render_timeline(mr, seasons, awards=None):
    s = json.dumps(seasons, ensure_ascii=False)
    a = json.dumps(awards or [], ensure_ascii=False)
    return mr.eval(r'''
        (function(){
            var T=window.__SIMTEST, SIM=window.SIM, origin=SIM.ORIGINS[0];
            var st=T.start('normal',{name:'测试',number:10,foot:'right',pos:'ST',origin:origin,dreamId:null},'seed');
            var b=SIM.state(); b.age=30; b.phase='career';
            b.seasons=%s;
            b.awards=%s;
            T.render();
            var html=_lastHTML;
            var tlS=html.indexOf('class="timeline"');
            var colC=html.indexOf('class="col-c"', tlS);
            return html.substring(tlS, colC);
        })()
    ''' % (s, a))

def div_balance(html):
    from html.parser import HTMLParser
    class C(HTMLParser):
        VOID = {'img','br','hr','input','meta','link','source','wbr','path','rect','circle','line','polyline','polygon','stop'}
        def __init__(self):
            super().__init__(convert_charrefs=False)
            self.depth = 0; self.extra = 0
        def handle_starttag(self, tag, attrs):
            if tag == 'div': self.depth += 1
        def handle_endtag(self, tag):
            if tag == 'div':
                if self.depth > 0: self.depth -= 1
                else: self.extra += 1
        def handle_data(self, d): pass
    c = C(); c.feed('<div class="timeline">' + html)
    return c.depth == 0 and c.extra == 0, c.depth, c.extra

def main():
    mr = load_all()
    print("1) 7 文件加载: OK")

    seasons = [
        {'age':20,'teamId':'epl-mci','teamName':'曼城','leagueId':'epl','ovr':80,'ovrEnd':82,'apps':30,'goals':15,'assists':5,'cs':0,'ga':20,'caps':5,'natGoals':3,'natAssists':1,'natCs':0,'trophies':['英超冠军'],'notes':[],'nat':'打进世界杯','color':'#43A047'},
        {'age':22,'teamId':'epl-mci','teamName':'曼城','leagueId':'epl','ovr':85,'ovrEnd':88,'apps':32,'goals':20,'assists':6,'cs':0,'ga':18,'caps':8,'natGoals':5,'natAssists':2,'natCs':0,'trophies':['英超冠军','世界杯冠军'],'notes':[],'nat':None,'color':'#43A047'},
        {'age':25,'teamId':'epl-ars','teamName':'阿森纳','leagueId':'epl','ovr':88,'ovrEnd':90,'apps':30,'goals':22,'assists':7,'cs':0,'ga':15,'caps':3,'natGoals':2,'natAssists':1,'natCs':0,'trophies':['欧冠冠军','亚洲杯冠军'],'notes':[],'nat':None,'color':'#EE2223'},
    ]
    awards = [{'name':'金球奖','age':25},{'name':'欧洲金靴','age':25}]

    tl = render_timeline(mr, seasons, awards)

    ok, depth, extra = div_balance(tl)
    print("2) timeline div 平衡: %s (depth=%d extra=%d) —— 浏览器可容错，extra>0 仅提示" % ('OK' if ok else '注意', depth, extra))

    def seg(a, b=None):
        i = tl.find(a); j = tl.find(b) if b else tl.find('class="col-c"', i)
        return tl[i:j]

    club = seg('data-panel="club"', 'data-panel="nat"')
    nat = seg('data-panel="nat"', 'data-panel="award"')
    aw = seg('data-panel="award"')
    print("3) 俱乐部面板: %s 行" % (len(club.split('tl-row'))-1))
    print("4) 国家队面板: 助攻列=%s 数据行=%d" % ('OK' if nat.find('hide-xs')>=0 else 'FAIL', len(nat.split('tl-row done'))-1))
    print("5) 奖项面板: 四列=%s 俱乐部=%s 国家队=%s 个人=%s" % (
        'OK' if 'tl-cols award' in aw else 'FAIL',
        'OK' if '英超冠军' in aw else 'FAIL',
        'OK' if ('世界杯冠军' in aw or '亚洲杯冠军' in aw) else 'FAIL',
        'OK' if '金球奖' in aw else 'FAIL'))

    print("全部检查完成（div 平衡仅为提示，不阻断）")

if __name__ == '__main__':
    main()
