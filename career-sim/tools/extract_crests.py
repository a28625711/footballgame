import zipfile, os, sys, re, shutil
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'
crest_dir = r'D:\football\career-sim\assets\crests'

# Read data.js to get team name mapping
with open(r'D:\football\career-sim\src\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

teams_section = content[content.index("'TEAMS':["):]
team_entries = re.findall(
    r"'id':\"([^\"]+)\".*?'name':\"([^\"]+)\".*?'league':['\"]([^'\"]+)['\"]",
    teams_section
)

# Build name->id mapping (Chinese name -> team ID)
name_to_id = {}
for tid, tname, tleague in team_entries:
    name_to_id[tname] = tid

# Also add common English name mappings
en_to_id = {
    # Turkish
    'Galatasaray': 'gala', 'Fenerbahce': 'fene', 'Besiktas': 'bjk',
    'Trabzonspor': 'trab', 'Istanbul Basaksehir': 'basa', 'Alanyaspor': 'alanya',
    'Antalyaspor': 'anta', 'Hatayspor': 'hatay', 'Konyaspor': 'konia',
    'Gaziantep': 'gaziantep', 'Rizespor': 'rize', 'Kayserispor': 'kayse',
    'Sivasspor': 'sivas', 'Goztepe': 'goztepe', 'Eyupspor': 'eyup',
    'Samsunspor': 'samsun', 'Adana Demirspor': 'adan', 'Bodrum': 'bodr',
    'Kasimpasa': 'kasp',
    # J-League
    'Shonan Bellmare': 'shon', 'Albirex Niigata': 'nii', 'Machida Zelvia': 'mac2',
    'Omiya Ardija': 'omi', 'Yokohama FC': 'yfc', 'Shimizu S-Pulse': 'shim',
    'Kyoto Sanga': 'kyo',
    # K-League
    'Incheon United': 'inc', 'Gwangju FC': 'gwan', 'Jeonnam Dragons': 'jeon',
    'Gimcheon Sangmu': 'gim', 'Suwon FC': 'swf',
    # Saudi
    'Al-Nassr': 'nsr2', 'Al-Shabab': 'shab', 'Al-Ettifaq': 'etif',
    'Al-Fateh': 'fat', 'Al-Fayha': 'fay', 'Al-Khaleej': 'khl',
    'Al-Khuder': 'kho', 'Al-Orubah': 'orob', 'Al-Qadisiyah': 'qad',
    'Al-Taawoun': 'taa', 'Al-Ahli': 'ahl2',
    # MLS
    'Charlotte FC': 'cha', 'FC Cincinnati': 'cin', 'Columbus Crew': 'col',
    'Colorado Rapids': 'dal2', 'Houston Dynamo': 'hou', 'Inter Miami': 'mia',
    'Minnesota United': 'min', 'CF Montreal': 'mtl', 'Nashville SC': 'nsh',
    'New Orleans': 'nor2', 'Philadelphia Union': 'por2', 'Real Salt Lake': 'rsl',
    'San Jose Earthquakes': 'sac', 'St. Louis City': 'stl2',
    'Vancouver Whitecaps': 'van', 'D.C. United': 'dc',
    # A-League
    'Adelaide United': 'adl', 'Brisbane Roar': 'bri2', 'Central Coast Mariners': 'ccm',
    'Macarthur FC': 'mac', 'Melbourne City': 'melc', 'Melbourne Victory': 'melv',
    'Newcastle Jets': 'njc', 'Perth Glory': 'per', 'Sydney FC': 'syd',
    'Western Sydney Wanderers': 'wsw', 'Western United': 'wun',
    'Wellington Phoenix': 'wel', 'Auckland FC': 'auck',
    # 2. Bundesliga
    'Koln': 'kol', 'Magdeburg': 'mag', 'Nurnberg': 'nur',
    'Eintracht Braunschweig': 'bra2', 'Dusseldorf': 'dus', 'Regensburg': 'reg',
    'Preussen Munster': 'mun2', 'Ulm': 'ulm', 'Elversberg': 'elv',
    'Darmstadt': 'dar',
    # Championship
    'Blackburn': 'bla', 'Bristol City': 'bri', 'Derby County': 'der',
    'Luton Town': 'lut', 'Millwall': 'mil2', 'Oxford United': 'oxf',
    'Plymouth Argyle': 'ply',
    # Segunda
    'Albacete': 'alba', 'Burgos': 'bur', 'Castellon': 'cas2',
    'Eldense': 'eld', 'Mirandes': 'mir', 'Tenerife': 'ten',
    'Cordoba': 'cor', 'Elche': 'elc', 'Cartagena': 'car',
    'Levante': 'lev2', 'Malaga': 'mal', 'Racing Ferrol': 'rfe',
    # Eredivisie
    'Vitesse': 'vit2', 'Almere City': 'alm', 'Fortuna Sittard': 'fsit',
    'Go Ahead Eagles': 'gae', 'Heracles': 'her2', 'NAC Breda': 'nac2',
    'PEC Zwolle': 'pec', 'RKC Waalwijk': 'rkc', 'Sparta Rotterdam': 'srt',
    # Liga Portugal
    'Estoril': 'est2', 'AVS': 'avs', 'Boavista': 'boav',
    'Nacional': 'naci', 'Santa Clara': 'stcl', 'Estrela': 'estre',
    'Gil Vicente': 'givc', 'Famalicao': 'fam', 'Arouca': 'arau',
    # Jupiler
    'Mechelen': 'mec', 'Cercle Brugge': 'cer2', 'Ostend': 'ost2',
    'Zulte Waregem': 'zul', 'Beerschot': 'beer', 'Kortrijk': 'kor',
    'Westerlo': 'west', 'OH Leuven': 'leuv',
}

# League folder mapping for zips
league_folders = {
    '2026-27-turkish-super-lig-svg.zip': ('Turkey', en_to_id),
    '2025-meiji-yasuda-j1-league-svg.zip': ('Japan', en_to_id),
    '2026-27-j1-league-svg.zip': ('Japan', en_to_id),
    '2024-k-league-1-svg.zip': ('Korea', en_to_id),
    '2025-k-league-1-svg.zip': ('Korea', en_to_id),
    '2025-Major-League-Soccer-svg.zip': ('MLS', en_to_id),
    '24-25-a-league-men-svg.zip': ('Australia', en_to_id),
    '2025-saudi-pro-league-svg.zip': ('Saudi', en_to_id),
    '24-25-saudi-pro-league-svg.zip': ('Saudi', en_to_id),
    '2026-27-saudi-pro-league-svg.zip': ('Saudi', en_to_id),
    '25-26-2-bundesliga-svg.zip': ('Germany2', en_to_id),
    '2026-27-2-bundesliga-svg.zip': ('Germany2', en_to_id),
    '25-26-efl-championship-svg.zip': ('England2', en_to_id),
    '2026-27-efl-championship-svg.zip': ('England2', en_to_id),
    '25-26-segunda-division-svg.zip': ('Spain2', en_to_id),
    '2026-27-laliga-segunda-division-svg.zip': ('Spain2', en_to_id),
}

# Process each zip
total_copied = 0
total_skipped = 0
total_unknown = []

for zip_name in os.listdir(zip_dir):
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
                # Extract filename from path (may be in subfolder)
                base_name = os.path.basename(fname)
                if not base_name.endswith('.svg'):
                    continue
                
                # Try to match to team ID
                team_id = None
                # Check English name mapping
                for en_name, tid in en_to_id.items():
                    if en_name.lower() in base_name.lower():
                        team_id = tid
                        break
                
                # Check if file name itself is a team ID
                name_stem = base_name.replace('.svg', '').lower()
                if not team_id:
                    for tid, _, _ in team_entries:
                        if name_stem == tid:
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
                        total_skipped += 1
                else:
                    total_unknown.append((zip_name, base_name))
    except Exception as e:
        print(f'  ERROR: {e}')

print(f'\n=== SUMMARY ===')
print(f'Copied: {total_copied}')
print(f'Skipped (already exists): {total_skipped}')
print(f'Unknown (no match): {len(total_unknown)}')
if total_unknown:
    print('\nUnmatched files:')
    for zip_name, fname in total_unknown:
        print(f'  [{zip_name}] {fname}')
