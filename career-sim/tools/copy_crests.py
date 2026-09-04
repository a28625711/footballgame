import os, re, sys, shutil
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\football\career-sim\src\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

teams_section = content[content.index("'TEAMS':["):]
team_entries = re.findall(
    r"'id':\"([^\"]+)\".*?'name':\"([^\"]+)\".*?'league':['\"]([^'\"]+)['\"]",
    teams_section
)

league_map = {
    'epl': 'England - Premier League',
    'liga': 'Spain - LaLiga',
    'bund': 'Germany - Bundesliga',
    'seri': 'Italy - Serie A',
    'l1': 'France - Ligue 1',
    'ere': 'Netherlands - Eredivisie',
    'pri': 'Portugal - Liga Portugal',
    'jup': 'Belgium - Jupiler Pro League',
    'tur': 'T\u00fcrkiye - S\u00fcper Lig',
}

# Expanded overrides with correct file names from the repo
name_overrides = {
    # Turkey
    'gala': 'Galatasaray.png', 'fene': 'Fenerbahce.png', 'bjk': 'Besiktas JK.png',
    'trab': 'Trabzonspor.png', 'basa': 'Basaksehir FK.png', 'alanya': 'Alanyaspor.png',
    'hatay': 'Hatayspor.png', 'konia': 'Konyaspor.png', 'gaziantep': 'Gaziantep FK.png',
    'rize': 'Caykur Rizespor.png', 'kayse': 'Kayserispor.png', 'sivas': 'Sivasspor.png',
    'goztepe': 'G\u00f6ztepe.png', 'eyup': 'Ey\u00fcpspor.png', 'samsun': 'Samsunspor.png',
    'kasp': 'Kasimpasa.png', 'adan': 'Adana Demirspor.png', 'anta': 'Antalyaspor.png',
    'bodr': 'Bodrum FK.png',
    # EPL
    'mci': 'Manchester City.png', 'liv': 'Liverpool FC.png', 'ars': 'Arsenal FC.png',
    'mun': 'Manchester United.png', 'che': 'Chelsea FC.png', 'tot': 'Tottenham Hotspur.png',
    'new': 'Newcastle United.png', 'avl': 'Aston Villa.png', 'bha': 'Brighton & Hove Albion.png',
    'ful': 'Fulham FC.png', 'bre': 'Brentford FC.png', 'eve': 'Everton FC.png',
    'cry': 'Crystal Palace.png', 'nfo': 'Nottingham Forest.png', 'whu': 'West Ham United.png',
    'wol': 'Wolverhampton Wanderers.png',
    # LaLiga
    'rma': 'Real Madrid CF.png', 'bar': 'FC Barcelona.png', 'atm': 'Atletico de Madrid.png',
    'ath': 'Athletic Club.png', 'rso': 'Real Sociedad.png', 'vil': 'Villarreal CF.png',
    'bet': 'Real Betis Balompie.png', 'sev': 'Sevilla FC.png', 'gir': 'Girona FC.png',
    'val': 'Valencia CF.png',
    # Bundesliga
    'bay': 'FC Bayern Munchen.png', 'bvb': 'Borussia Dortmund.png',
    'lev': 'Bayer 04 Leverkusen.png', 'rbl': 'RB Leipzig.png',
    'sge': 'Eintracht Frankfurt.png', 'vfb': 'VfB Stuttgart.png',
    # Serie A
    'int': 'Inter Milan.png', 'acm': 'AC Milan.png', 'juv': 'Juventus FC.png',
    'nap': 'SSC Napoli.png', 'rom': 'AS Roma.png', 'ata': 'Atalanta BC.png',
    'laz': 'SS Lazio.png',
    # Ligue 1
    'psg': 'Paris Saint-Germain.png', 'mar': 'Olympique de Marseille.png',
    'lyo': 'Olympique Lyonnais.png', 'mon': 'AS Monaco.png',
    'lil': 'Lille OSC.png', 'ren': 'Stade Rennais.png',
    # Eredivisie
    'aja': 'AFC Ajax.png', 'psv': 'PSV.png', 'fey': 'Feyenoord.png',
    'az': 'AZ.png', 'utr': 'FC Utrecht.png', 'twt': 'FC Twente.png',
    'hee': 'SC Heerenveen.png', 'grn': 'FC Groningen.png', 'nec': 'NEC.png',
    'alm': 'Almere City FC.png', 'fsit': 'Fortuna Sittard.png',
    'gae': 'Go Ahead Eagles.png', 'her2': 'Heracles Almelo.png',
    'nac2': 'NAC Breda.png', 'pec': 'PEC Zwolle.png',
    'rkc': 'RKC Waalwijk.png', 'srt': 'Sparta Rotterdam.png',
    # Liga Portugal
    'ben': 'SL Benfica.png', 'por': 'FC Porto.png', 'spo': 'Sporting CP.png',
    'bra': 'SC Braga.png', 'boav': 'Boavista FC.png',
    'naci': 'CD Nacional.png', 'stcl': 'CD Santa Clara.png',
    'estre': 'CF Estrela da Amadora.png', 'givc': 'Gil Vicente FC.png',
    'fam': 'FC Famalic\u00e3o.png', 'arau': 'FC Arouca.png',
    'avs': 'AVS.png',
    # Jupiler
    'clb': 'Club Brugge.png', 'and': 'RSC Anderlecht.png',
    'gnk': 'KRC Genk.png', 'gnt': 'KAA Gent.png',
    'eup': 'RFC Seraing.png', 'stl': 'STVV.png',
    'ant': 'Royal Antwerp.png', 'usg': 'Union Saint-Gilloise.png',
    'mec': 'KV Mechelen.png', 'cer2': 'Cercle Brugge.png',
    'ost2': 'OH Leuven.png', 'zul': 'Zulte Waregem.png',
    'beer': 'K Beerschot VA.png', 'kor': 'KV Kortrijk.png',
    'west': 'KVC Westerlo.png', 'leuv': 'Oud-Heverlee Leuven.png',
}

logo_base = r'D:\football\football-logos\logos'
crest_base = r'D:\football\career-sim\assets\crests'
existing_crests = set(os.listdir(crest_base))

copied = 0
skipped = 0
not_found = []

for tid, tname, tleague in team_entries:
    if tid + '.png' in existing_crests or tid + '.svg' in existing_crests:
        skipped += 1
        continue

    if tid in name_overrides:
        fname = name_overrides[tid]
        league_folder = league_map.get(tleague)
        if league_folder:
            src = os.path.join(logo_base, league_folder, fname)
            if os.path.exists(src):
                dst = os.path.join(crest_base, tid + '.png')
                shutil.copy2(src, dst)
                copied += 1
                print(f'  COPIED: {tid} ({tname})')
                continue

    not_found.append((tid, tname, tleague))

print(f'\nCopied: {copied}')
print(f'Skipped (already exist): {skipped}')
print(f'Not found: {len(not_found)}')
print('\n=== NOT FOUND (no logo in repo) ===')
for tid, tname, tleague in not_found:
    print(f'  {tid}: {tname} ({tleague})')
