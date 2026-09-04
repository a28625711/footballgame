import os, sys
sys.stdout.reconfigure(encoding='utf-8')
crest_dir = r'D:\football\career-sim\assets\crests'
existing = sorted(os.listdir(crest_dir))
miss = ['academico','alme','amed','ando','beveren','bielefeld','birmingham','bochum','bolto',
        'casa-pia','ceut','charleroi','corum','cottbus','dene','dresden','erzurum','excelsior',
        'furth','gencler','heidenheim','kiel','kocaeli','kyo','mac2','neom','omi','osnabruck',
        'portsmouth','racing','riyah','sandi','shim','stv','telstar','vall','verdy','volendam',
        'willem2','yfc']
keywords = {
 'academico':['academico'], 'alme':['almeria'], 'amed':['amed'], 'ando':['andorra'],
 'beveren':['beveren'], 'bielefeld':['bielefeld'], 'birmingham':['birming'],
 'bochum':['bochum','vfl-bochum'], 'bolto':['bolton'], 'casa-pia':['casa-pia'],
 'ceut':['ceuta'], 'charleroi':['charleroi'], 'corum':['corum','corum'], 'cottbus':['cottbus','energie'],
 'dene':['denizli','dene'], 'dresden':['dresden'], 'erzurum':['erzurum'], 'excelsior':['excelsior'],
 'furth':['furth','greuther'], 'gencler':['gencler'], 'heidenheim':['heidenheim'],
 'kiel':['kiel','holstein'], 'kocaeli':['kocaeli'], 'kyo':['kyoto'], 'mac2':['machida','zelvia'],
 'neom':['neom'], 'omi':['omiya','ardija'], 'osnabruck':['osnabruck','osnabr'],
 'portsmouth':['portsmouth'], 'racing':['racing'], 'riyah':['al-riyadh','riyadh'],
 'sandi':['san-diego'], 'shim':['shimizu','s-pulse'], 'stv':['sint-truiden','sint-truidense'],
 'telstar':['telstar'], 'vall':['valladolid'], 'verdy':['verdy'], 'volendam':['volendam'],
 'willem2':['willem-ii','tilburg'], 'yfc':['yokohama-fc']
}
for tid in miss:
    hits = []
    for f in existing:
        fl = f.lower()
        base = os.path.splitext(f)[0]
        if base == tid and f.endswith(('.svg', '.png')):
            hits.append(f)
    if hits:
        print(f"{tid}: ID-EXACT {hits[0]}")
        continue
    for kw in keywords.get(tid, []):
        found = [f for f in existing if kw.lower() in f.lower() and f.endswith(('.svg', '.png'))]
        if found:
            print(f"{tid}: kw={found[0]}")
            break
    else:
        print(f"{tid}: NONE")
