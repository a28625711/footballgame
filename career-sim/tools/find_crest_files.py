import os, sys
sys.stdout.reconfigure(encoding='utf-8')

d = r'D:\football\career-sim\assets\crests'

# Candidate club keywords -> expected new team id
want = {
    # bund additions (move from b2)
    's04': ['schalke', 'fc-schalke'],
    'pdb': ['paderborn', 'sc-paderborn'],
    'elv': ['elversberg', 'sv-elversberg'],
    # b2 additions
    'her': ['hertha'],
    'ksl': ['kaiserslautern'],
    'wob': ['wolfsburg', 'vfl-wolfsburg'],
    'bochum': ['bochum', 'vfl-bochum'],
    'biele': ['bielefeld'],
    'cotto': ['cottbus', 'energie'],
    'dresd': ['dresden'],
    'kiel': ['kiel', 'holstein'],
    'osna': ['osnabruck', 'osnabr'],
    'furth': ['furth', 'greuther'],
    'heide': ['heidenheim'],
    # jup additions
    'stv': ['sint-truiden', 'sint-truidense'],
    'beveren': ['beveren'],
    'lommel': ['lommel'],
    'louviere': ['la-louviere', 'louvieroise'],
    # seg additions
    'alme': ['almeria'],
    'gran': ['granada'],
    'lasp': ['las-palmas'],
    'cadi': ['cadiz'],
    'ovie': ['oviedo'],
    'rso2': ['real-sociedad'],
    'ando': ['andorra'],
    'ceut': ['ceuta'],
    'saba': ['sabadell'],
    'gijo': ['gijon', 'sporting-de-gijon'],
    'cultu': ['leonesa', 'cultural'],
    'depor': ['depor', 'la-coruna', 'coruna'],
    'sant': ['santander', 'racing-de-santander'],
    'zara': ['zaragoza'],
    'huesc': ['huesca'],
    'mall': ['mallorca'],
    'lega2': ['leganes'],
    'vall': ['valladolid'],
    'eib2': ['eibar'],
    'ovd2': ['oviedo'],
}

for tid, kws in want.items():
    found = []
    for f in os.listdir(d):
        fl = f.lower()
        if f.endswith(('.svg', '.png')):
            for kw in kws:
                if kw in fl:
                    found.append(f)
                    break
    print(f"{tid}: {found if found else 'NONE'}")
