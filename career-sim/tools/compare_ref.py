import json, os, sys, re
sys.stdout.reconfigure(encoding='utf-8')

# our team id -> English club name (used by reference). Only leagues with a git reference.
ID_EN = {
# csl
'cn-sh':'Shanghai Port FC','cn-sd':'Shandong Taishan','cn-bj':'Beijing Guoan','cn-cc':'Changchun Yatai',
'cn-cd':'Chengdu Rongcheng','cn-dl':'Dalian Yingbo','cn-hn':'Henan FC','cn-mz':'Meizhou Hakka',
'cn-qdh':'Qingdao Hainiu','cn-qdw':'Qingdao West Coast','cn-shh':'Shanghai Shenhua','cn-sz':'Shenzhen Peng City',
'cn-tj':'Tianjin Jinmen Tiger','cn-wh':'Wuhan Three Towns','cn-yn':'Yunnan Yukun','cn-zj':'Zhejiang Professional',
# epl
'mci':'Manchester City FC','liv':'Liverpool FC','ars':'Arsenal FC','mun':'Manchester United FC',
'che':'Chelsea FC','tot':'Tottenham Hotspur FC','new':'Newcastle United FC','avl':'Aston Villa FC',
'bha':'Brighton & Hove Albion FC','ful':'Fulham FC','bre':'Brentford FC','eve':'Everton FC',
'cry':'Crystal Palace FC','nfo':'Nottingham Forest FC','whu':'West Ham United FC','wol':'Wolverhampton Wanderers FC',
'lct':'Leicester City FC','bcy':'Burnley FC','ips':'Ipswich Town FC','shu':'Sheffield United FC',
'bou':'AFC Bournemouth',
# ch
'lee':'Leeds United FC','sou':'Southampton FC','sto':'Stoke City FC','sun':'Sunderland AFC',
'mid':'Middlesbrough FC','wba':'West Bromwich Albion FC','nor':'Norwich City FC','wat':'Watford FC',
'qpr':'Queens Park Rangers FC','brb':'Blackburn Rovers FC','cov':'Coventry City FC','sws':'Swansea City AFC',
'cdf':'Cardiff City FC','shw':'Sheffield Wednesday FC','pre':'Preston North End FC','hul':'Hull City AFC',
'rdg':'Reading FC','bla':'Blackburn Rovers FC','bri':'Bristol City FC','der':'Derby County FC',
'birmingham':'Birmingham City FC','mil2':'Millwall FC','oxf':'Oxford United FC','portsmouth':'Portsmouth FC',
# liga
'rma':'Real Madrid CF','bar':'FC Barcelona','atm':'Club Atlético de Madrid','ath':'Athletic Club',
'rso':'Real Sociedad de Fútbol','vil':'Villarreal CF','bet':'Real Betis Balompié','sev':'Sevilla FC',
'gir':'Girona FC','val':'Valencia CF','cel':'RC Celta de Vigo','osa':'CA Osasuna','mao':'RCD Mallorca',
'get':'Getafe CF','ray':'Rayo Vallecano de Madrid','alv':'Deportivo Alavés','cad':'Cádiz CF',
'lpa':'UD Las Palmas','esp':'RCD Espanyol de Barcelona','grd':'Granada CF',
# bund
'bay':'FC Bayern München','bvb':'Borussia Dortmund','lev':'Bayer 04 Leverkusen','rbl':'RB Leipzig',
'sge':'Eintracht Frankfurt','vfb':'VfB Stuttgart','fcu':'1. FC Union Berlin','wob':'VfL Wolfsburg',
'bmg':'Borussia Mönchengladbach','svw':'SV Werder Bremen','scf':'SC Freiburg','hsv':'Hamburger SV',
'hof':'TSG 1899 Hoffenheim','mnz':'1. FSV Mainz 05','aug':'FC Augsburg','koe':'1. FC Köln',
'her':'Hertha BSC','nbg':'1. FC Nürnberg','ksl':'1. FC Kaiserslautern','s04':'FC Schalke 04',
'pdb':'SC Paderborn 07','elv':'SV 07 Elversberg',
# seri
'int':'FC Internazionale Milano','acm':'AC Milan','juv':'Juventus FC','nap':'SSC Napoli',
'rom':'AS Roma','ata':'Atalanta BC','laz':'SS Lazio','tor':'Torino FC','fio':'ACF Fiorentina',
'bol':'Bologna FC 1909','udi':'Udinese Calcio','gen':'Genoa CFC','sam':'Sampdoria FC','cag':'Cagliari Calcio',
'ver':'Hellas Verona FC','lec':'US Lecce','emp':'Empoli FC','sas':'US Sassuolo Calcio','ven':'Venezia FC',
'mon':'AC Monza','com':'Como 1907','par':'Parma Calcio 1913','fro':'Frosinone Calcio',
# l1
'psg':'Paris Saint-Germain FC','mar':'Olympique de Marseille','lyo':'Olympique Lyonnais','mon':'AS Monaco FC',
'lil':'Lille OSC','ren':'Stade Rennais FC 1901','nic':'OGC Nice','len':'Racing Club de Lens',
'rcs':'RC Strasbourg Alsace','aja':'AJ Auxerre','mpl':'Montpellier HSC','tls':'Toulouse FC',
'nts':'FC Nantes','set':'AS Saint-Étienne','rei':'Stade de Reims','aux':'AJ Auxerre','ang':'Angers SCO',
'bst':'Stade Brestois 29','lri':'FC Lorient','lhv':'Le Havre AC','lmf':'Le Mans FC','trc':'ES Troyes AC','pfc':'Paris FC',
# ere
'aja':'AFC Ajax','psv':'PSV','fey':'Feyenoord Rotterdam','az':'AZ','utr':'FC Utrecht','twt':'FC Twente 65',
'hee':'SC Heerenveen','grn':'FC Groningen','nec':'NEC','volendam':'FC Volendam','telstar':'Telstar 1963',
'fsit':'Fortuna Sittard','gae':'Go Ahead Eagles','her2':'Heracles Almelo','excelsior':'SBV Excelsior',
'pec':'PEC Zwolle','willem2':'Willem II Tilburg','srt':'Sparta Rotterdam','cam':'SC Cambuur-Leeuwarden','ado':'ADO Den Haag',
# pri
'por':'FC Porto','ben':'Sport Lisboa e Benfica','spo':'Sporting Clube de Portugal','bra':'Sporting Clube de Braga',
'vit':'Vitória Guimarães','bav':'Boavista FC','pfr':'FC Paços de Ferreira','nac':'CD Nacional','rio':'Rio Ave FC',
'fam':'FC Famalicão','est2':'GD Estoril Praia','arau':'FC Arouca','academico':'Académico de Viseu FC',
'casa-pia':'Casa Pia AC','naci':'CD Nacional','stcl':'CD Santa Clara','estre':'CF Estrela da Amadora',
'givc':'Gil Vicente FC','mar2':'CS Marítimo','alv2':'FC Alverca','mor':'Moreirense FC',
# jup
'clb':'Club Brugge KV','and':'RSC Anderlecht','gnk':'KRC Genk','gnt':'KAA Gent','ant':'Royal Antwerp FC',
'stl':'Standard Liège','usg':'Union Saint-Gilloise','mec':'KV Mechelen','cer2':'Cercle Brugge',
'zul':'SV Zulte Waregem','kor':'KV Kortrijk','west':'KVC Westerlo','leuv':'Oud-Heverlee Leuven',
'charleroi':'Sporting Charleroi','beveren':'','stv':'Sint-Truidense VV','eup':'KAS Eupen',
'dender':'FCV Dender EH','louviere':'RAAL La Louviére',
# tur
'gala':'Galatasaray','fene':'Fenerbahçe','bjk':'Beşiktaş','trab':'Trabzonspor','basa':'İstanbul Başakşehir',
'alanya':'Alanyaspor','amed':'Amed SK','gencler':'Gençlerbirliği','konia':'Konyaspor','gaziantep':'Gaziantep FK',
'rize':'Çaykur Rizespor','kocaeli':'Kocaelispor','corum':'Çorum FK','goztepe':'Göztepe','eyup':'Eyüpspor',
'samsun':'Samsunspor','erzurum':'Erzurumspor FK','kasp':'Kasımpaşa SK','anta':'Antalyaspor','hatay':'Hatayspor',
'kayse':'Kayserispor','sivas':'Sivasspor','adan':'Adana Demirspor','bodr':'Bodrum FK','karag':'Fatih Karagümrük','dene':'Denizlispor',
# jl
'kaw':'Kawasaki Frontale','yok':'Yokohama F. Marinos','urw':'Urawa Red Diamonds','kob':'Vissel Kobe',
'ksm':'Kashima Antlers','san':'Sanfrecce Hiroshima','gmb':'Gamba Osaka','cre':'Cerezo Osaka','ngy':'Nagoya Grampus',
'fct':'FC Tokyo','ksw':'Kashiwa Reysol','jub':'Júbilo Iwata','shon':'Shonan Bellmare','nii':'Albirex Niigata',
'verdy':'Tokyo Verdy','mac2':'FC Machida Zelvia','omi':'Omiya Ardija','yfc':'Yokohama FC','shim':'Shimizu S-Pulse',
'kyo':'Kyoto Sanga FC','fuku':'Avispa Fukuoka','okaya':'Fagiano Okayama','mito':'Mito HollyHock','chiba':'JEF United Chiba','nagas':'V-Varen Nagasaki',
# mls
'lag':'Los Angeles Galaxy','lfc':'Los Angeles FC','nyc':'New York City FC','sea':'Seattle Sounders FC',
'atlu':'Atlanta United FC','trt':'Toronto FC','nyr':'New York RB','chf':'Chicago Fire','ptl':'Portland Timbers',
'orl':'Orlando City','ner':'New England Revolution','dal':'FC Dallas','cha':'Charlotte FC','cin':'FC Cincinnati',
'col':'Columbus Crew','dal2':'Colorado Rapids','hou':'Houston Dynamo FC','mia':'Inter Miami CF','min':'Minnesota United FC',
'mtl':'CF Montréal','nsh':'Nashville SC','nor2':'','por2':'Philadelphia Union','rsl':'Real Salt Lake','sac':'San Jose Earthquakes',
'stl2':'St. Louis City SC','van':'Vancouver Whitecaps','dc':'D.C. United','kc':'Sporting Kansas City','sandi':'San Diego FC',
'aust':'Austin FC',
# ale
'adl':'Adelaide United','bri2':'Brisbane Roar','ccm':'Central Coast Mariners','mac':'Macarthur FC',
'melc':'Melbourne City FC','melv':'Melbourne Victory','njc':'Newcastle United Jets','per':'Perth Glory',
'syd':'Sydney FC','wsw':'Western Sydney Wanderers','wun':'Western United','wel':'Wellington Phoenix','auck':'Auckland FC',
}

# reference per league
base = r'D:\football\openfootball-data'
refs = {
 'epl':('2026-27','en.1.json'),'ch':('2026-27','en.2.json'),
 'liga':('2026-27','es.1.json'),'seg':('2025-26','es.2.json'),
 'bund':('2026-27','de.1.json'),'b2':('2025-26','de.2.json'),
 'seri':('2026-27','it.1.json'),'l1':('2026-27','fr.1.json'),
 'ere':('2026-27','nl.1.json'),'pri':('2026-27','pt.1.json'),
 'jup':('2025-26','be.1.json'),'tur':('2025-26','tr.1.json'),
 'csl':('2025','cn.1.json'),'jl':('2025','jp.1.json'),'mls':('2025','mls.json'),
}
def clubs(season, fn):
    d = json.load(open(os.path.join(base, season, fn), encoding='utf-8'))
    s = set()
    for m in d['matches']:
        s.add(m['team1']); s.add(m['team2'])
    return s

def norm(s):
    s = s.lower()
    s = re.sub(r'\b(fc|ac|sc|cf|cd|kv|kvc|as|rc|ud|sd|de|sv|tsg|ss|ec|rs|górnik|club|afc|bk)\b', '', s)
    s = s.replace('&', 'and')
    s = re.sub(r'[^a-z0-9]+', '', s)
    return s

# our teams
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness
mr = harness.new_engine()
res = mr.eval("(function(){var D=window.DATA;var o={};D.TEAMS.forEach(function(t){(o[t.league]=o[t.league]||[]).push(t.id+':'+t.name);});return JSON.stringify(o);})()")
ours = json.loads(res)

for lg in refs:
    season, fn = refs[lg]
    ref = clubs(season, fn)
    print(f"\n########## {lg}  our={len(ours.get(lg,[]))}  ref={len(ref)} ({season} {fn})")
    our_ids = [x.split(':')[0] for x in ours.get(lg, [])]
    # extra = we have but not in ref (no ref name or name not found)
    extra = []
    for tid in our_ids:
        en = ID_EN.get(tid)
        if not en:
            extra.append((tid, '?'))
            continue
        if not any(norm(en) == norm(r) for r in ref):
            extra.append((tid, en))
    # missing = ref club not matched by any of our ids
    ournames = [norm(ID_EN.get(tid, tid)) for tid in our_ids if ID_EN.get(tid)]
    missing = [r for r in ref if norm(r) not in ournames]
    print("  EXTRA(我们有/参照无):", len(extra))
    for tid, en in extra:
        print("     -", tid, en)
    print("  MISSING(参照有/我们无):", len(missing))
    for r in sorted(missing):
        print("     +", r)
