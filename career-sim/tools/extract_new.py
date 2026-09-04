import zipfile, os, sys, re
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'
crest_dir = r'D:\football\career-sim\assets\crests'

# Read data.js for all team IDs
with open(r'D:\football\career-sim\src\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

teams_section = content[content.index("'TEAMS':["):]
team_entries = re.findall(
    r"'id':\"([^\"]+)\".*?'name':\"([^\"]+)\".*?'league':['\"]([^'\"]+)['\"]",
    teams_section
)

# Build lookup: lowercase name keywords -> team ID
# Focus on the 28 missing ones
keywords = {
    # Turkish (6)
    'adana': 'adan', 'antalya': 'anta', 'hatay': 'hatay',
    'kayseri': 'kayse', 'sivas': 'sivas', 'bodrum': 'bodr',
    # Dutch (5)
    'almere': 'alm', 'vitesse': 'vit2', 'nac breda': 'nac2',
    'nac-breda': 'nac2', 'waalwijk': 'rkc', 'heracles': 'her2',
    # Belgian (2)
    'beerschot': 'beer', 'ostend': 'ost2',
    # Portuguese (4)
    'avs-fc': 'avs', 'boavista': 'boav', 'estoril': 'est2',
    'estrela': 'estre',
    # German 2.Bundesliga (3)
    'koln': 'kol', 'cologne': 'kol', 'regensburg': 'reg', 'ulm': 'ulm',
    # Spanish Segunda (4)
    'cartagena': 'car', 'elche': 'elc', 'levante': 'lev2',
    'racing-ferrol': 'rfe', 'ferrol': 'rfe',
    # English Championship (2)
    'luton': 'lut', 'plymouth': 'ply',
    # Italian (2)
    'cagliari': 'cag2', 'monza': 'monz',
}

# Also add broader matches for non-missing teams
all_keywords = {
    'galatasaray': 'gala', 'fenerbahce': 'fene', 'besiktas': 'bjk',
    'trabzonspor': 'trab', 'basaksehir': 'basa', 'alanyaspor': 'alanya',
    'konyaspor': 'konia', 'gaziantep': 'gaziantep', 'rizespor': 'rize',
    'goztepe': 'goztepe', 'eyupspor': 'eyup', 'samsunspor': 'samsun',
    'kasimpasa': 'kasp',
    'ajax': 'aja', 'psv': 'psv', 'feyenoord': 'fey', 'az alkmaar': 'az',
    'club brugge': 'clb', 'anderlecht': 'and', 'genk': 'gnk', 'gent': 'gnt',
    'benfica': 'ben', 'porto': 'por', 'sporting': 'spo', 'braga': 'bra',
    'bayern': 'bay', 'dortmund': 'bvb', 'leverkusen': 'lev', 'leipzig': 'rbl',
    'frankfurt': 'sge', 'stuttgart': 'vfb',
    'inter': 'int', 'milan': 'acm', 'juventus': 'juv', 'napoli': 'nap',
    'roma': 'rom', 'atalanta': 'ata', 'lazio': 'laz',
    'paris saint-germain': 'psg', 'marseille': 'mar', 'lyon': 'lyo',
    'monaco': 'mon', 'lille': 'lil', 'rennes': 'ren',
    'real madrid': 'rma', 'barcelona': 'bar', 'atletico': 'atm',
    'athletic': 'ath', 'real sociedad': 'rso', 'villarreal': 'vil',
    'real betis': 'bet', 'sevilla': 'sev', 'girona': 'gir', 'valencia': 'val',
    'manchester city': 'mci', 'liverpool': 'liv', 'arsenal': 'ars',
    'manchester united': 'mun', 'chelsea': 'che', 'tottenham': 'tot',
    'newcastle': 'new', 'aston villa': 'avl', 'brighton': 'bha',
    'fulham': 'ful', 'brentford': 'bre', 'everton': 'eve',
    'crystal palace': 'cry', 'nottingham': 'nfo', 'west ham': 'whu',
    'wolverhampton': 'wol',
}

total_copied = 0
already = 0

for zip_name in sorted(os.listdir(zip_dir)):
    if not zip_name.endswith('.zip'):
        continue
    zip_path = os.path.join(zip_dir, zip_name)
    print(f'\n=== {zip_name} ===')
    try:
        with zipfile.ZipFile(zip_path, 'r') as zf:
            for info in zf.infolist():
                if info.is_dir():
                    continue
                fname = info.filename
                base_name = os.path.basename(fname)
                if not base_name.endswith('.svg'):
                    continue
                
                lower = fname.lower()
                team_id = None
                
                # Check missing keywords first
                for kw, tid in keywords.items():
                    if kw in lower:
                        team_id = tid
                        break
                
                # Check all keywords
                if not team_id:
                    for kw, tid in all_keywords.items():
                        if kw in lower:
                            team_id = tid
                            break
                
                if team_id:
                    dst = os.path.join(crest_dir, team_id + '.svg')
                    if not os.path.exists(dst):
                        with zf.open(info) as src, open(dst, 'wb') as out:
                            out.write(src.read())
                        print(f'  COPIED: {team_id} <- {base_name}')
                        total_copied += 1
                    else:
                        already += 1
    except Exception as e:
        print(f'  ERROR: {e}')

print(f'\n=== SUMMARY ===')
print(f'Copied: {total_copied}')
print(f'Already existed: {already}')
