import zipfile, os, sys, re, shutil
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'
crest_dir = r'D:\football\career-sim\assets\crests'

# Read data.js
with open(r'D:\football\career-sim\src\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

teams_section = content[content.index("'TEAMS':["):]
team_entries = re.findall(
    r"'id':\"([^\"]+)\".*?'name':\"([^\"]+)\".*?'league':['\"]([^'\"]+)['\"]",
    teams_section
)

# Comprehensive mapping: SVG filename pattern -> team ID
svg_to_id = {
    # Turkish Super Lig
    'alanyaspor': 'alanya', 'amed-sportif': 'amed', 'besiktas': 'bjk',
    'basaksehir': 'basa', 'corum': 'cor', 'erzurumspor': 'erzu',
    'eyupspor': 'eyup', 'fenerbahce': 'fene', 'galatasaray': 'gala',
    'gaziantep': 'gaziantep', 'genclerbirligi': 'gencler', 'goztepe': 'goztepe',
    'kasimpasa': 'kasp', 'kocaelispor': 'kocaeli', 'konyaspor': 'konia',
    'rize': 'rize', 'samsunspor': 'samsun', 'trabzonspor': 'trab',
    'adana': 'adan', 'antalyaspor': 'anta', 'hatayspor': 'hatay',
    'kayserispor': 'kayse', 'sivasspor': 'sivas', 'bodrum': 'bodr',
    # J-League 2025
    'vissel-kobe': 'kobe', 'yokohama-marinos': 'yokoma', 'kawasaki-frontale': 'kawa',
    'cerezo-osaka': 'cerezo', 'fc-tokyo': 'fctok', 'sanfrecce-hiroshima': 'hiro',
    'gamba-osaka': 'gamba', 'avispa-fukuoka': 'fuku', 'kashima-antlers': 'kashi',
    'kashiwa-reysol': 'kashiw', 'tokyo-verdy': 'verdy', 'nagoya-grampus': 'nagoy',
    'albirex-niigata': 'nii', 'machida-zelvia': 'mac2', 'shonan-bellmare': 'shon',
    'kyoto-sanga': 'kyo', 'urawa-reds': 'urawa', 'shimizu-s-pulse': 'shim',
    'yokohama-fc': 'yfc', 'fagiano-okayama': 'okaya', 'v-varen-nagasaki': 'nagas',
    'mito-hollyhock': 'mito', 'jef-united-chiba': 'chiba',
    # J-League 2026-27 (same teams, different zip)
    # K-League
    'ulsan-hd': 'ulsan', 'pohang-steelers': 'pohan', 'gwangju-fc': 'gwan',
    'jeonbuk-hyundai': 'jeonb', 'incheon-united': 'inc', 'daegu-fc': 'daegu',
    'fc-seoul': 'fcseo', 'daejeon-hana': 'daeje', 'jeju-united': 'jeju',
    'gangwon-fc': 'gangw', 'suwon-fc': 'swf', 'gimcheon-sangmu': 'gim',
    'fc-anyang': 'anyang',
    # MLS
    'atlanta-united': 'atl', 'austin-fc': 'aust', 'charlotte-fc': 'cha',
    'chicago-fire': 'chic', 'fc-cincinnati': 'cin', 'colorado-rapids': 'dal2',
    'columbus-crew': 'col', 'fc-dallas': 'dall', 'dc-united': 'dc',
    'houston-dynamo': 'hou', 'los-angeles-galaxy': 'laga', 'los-angeles-fc': 'lafc',
    'minnesota-united': 'min', 'club-de-foot-montreal': 'mtl',
    'new-england-revolution': 'ne', 'nashville-soccer': 'nsh',
    'new-york-city': 'nycfc', 'new-york-red-bulls': 'nyrb',
    'orlando-city': 'orl', 'philadelphia-union': 'por2',
    'portland-timbers': 'por', 'real-salt-lake': 'rsl',
    'san-jose-earthquakes': 'sac', 'seattle-sounders': 'sea',
    'sporting-kansas-city': 'kc', 'st-louis-city': 'stl2',
    'toronto-fc': 'tor', 'vancouver-whitecaps': 'van',
    'san-diego-fc': 'sandi', 'inter-miami': 'mia',
    # A-League
    'central-coast-mariners': 'ccm', 'adelaide-united': 'adl',
    'brisbane-roar': 'bri2', 'auckland-fc': 'auck',
    'macarthur-fc': 'mac', 'melbourne-city': 'melc',
    'melbourne-victory': 'melv', 'newcastle-jets': 'njc',
    'perth-glory': 'per', 'sydney-fc': 'syd',
    'wellington-phoenix': 'wel', 'western-sydney': 'wsw',
    'western-united': 'wun',
    # Saudi Pro League
    'al-hilal': 'hil', 'ittihad-saudi': 'itt', 'al-ahli': 'ahl2',
    'al-nassr': 'nsr2', 'al-shabab': 'shab', 'al-ettifaq': 'etif',
    'al-fateh': 'fat', 'al-fayha': 'fay', 'al-khaleej': 'khl',
    'al-kholood': 'kho', 'al-orobah': 'orob', 'al-qadsiah': 'qad',
    'al-taawoun': 'taa', 'al-okhdood': 'okhd', 'damac-fc': 'damac',
    'al-raed': 'raed', 'al-riyadh': 'riyah', 'al-wehda': 'wehd',
    'al-hazem': 'hazm', 'neom-sports': 'neom', 'abha-football': 'abha',
    'al-faisaly': 'fais', 'diriyah-club': 'diri',
    # 2. Bundesliga
    'hertha-bsc': 'herth', 'arminia-bielefeld': 'biele',
    'eintracht-braunschweig': 'bra2', 'energie-cottbus': 'cotto',
    'dynamo-dresden': 'dresd', 'hannover-96': 'hanno',
    'kaiserslautern': 'kaise', 'karlsruher-sc': 'karls',
    'holstein-kiel': 'kiel', 'osnabruck': 'osna',
    'fc-st-pauli': 'pauli', 'vfl-wolfsburg': 'wolfs',
    'vfl-bochum': 'bochu', 'greuther-furth': 'furth',
    'fc-heidenheim': 'heide', 'fortuna-dusseldorf': 'dus',
    'sv-elversberg': 'elv', 'fc-magdeburg': 'mag',
    'sv-darmstadt': 'dar', 'fc-nurnberg': 'nur',
    'sc-paderborn': 'pader', 'fc-schalke': 'schal', 'prussia-munster': 'mun2',
    # EFL Championship
    'blackburn-rovers': 'bla', 'bristol-city': 'bri',
    'derby-county': 'der', 'luton-town': 'lut', 'millwall': 'mil2',
    'oxford-united': 'oxf', 'plymouth-argyle': 'ply',
    'birmingham-city': 'birm', 'bolton-wanderers': 'bolto',
    'burnley-fc': 'burn', 'cardiff-city': 'cardi', 'charlton-athletic': 'charl',
    'lincoln-city': 'linco', 'middlesbrough': 'middl', 'norwich-city': 'norw',
    'portsmouth-fc': 'ports', 'preston-north-end': 'pres',
    'queens-park-rangers': 'qpr', 'sheffield-united': 'shu',
    'southampton-fc': 'sout', 'stoke-city': 'stoke',
    'swansea-city': 'swan', 'watford-fc': 'wato',
    'west-bromwich-albion': 'wba', 'west-ham-united': 'whu',
    'wolverhampton': 'wol', 'wrexham-afc': 'wrex',
    'coventry-city': 'cove', 'hull-city': 'hull',
    'ipswich-town': 'ipsw', 'leicester-city': 'leice',
    'sheffield-wednesday': 'shew',
    # Segunda Division
    'almeria': 'alme', 'andorra-fc': 'ando', 'cadiz-cf': 'cadi',
    'celta-de-vigo': 'c', 'ceuta-fc': 'ceut', 'eibar': 'eib',
    'girona-fc': 'gir', 'granada-cf': 'gran', 'las-palmas': 'lasp',
    'leganes': 'lega', 'mallorca': 'mall', 'real-oviedo': 'ovie',
    'real-sociedad': 'rso', 'sabadell': 'saba', 'gijon': 'gijo',
    'valladolid': 'vall', 'zaragoza': 'zara', 'malaga-cf': 'mal',
    'mirandes': 'mir', 'burgos-cf': 'bur', 'albacete': 'alba',
    'castellon': 'cas2', 'cordoba': 'cor', 'eldense': 'eld',
    'tenerife': 'ten', 'cultural-leonesa': 'cultu', 'deportivo-coruna': 'depor',
    'huesca': 'huesc', 'racing-santander': 'sant',
    # Eredivisie
    'vitesse': 'vit2', 'almere-city': 'alm', 'fortuna-sittard': 'fsit',
    'go-ahead-eagles': 'gae', 'heracles': 'her2', 'nac-breda': 'nac2',
    'pec-zwolle': 'pec', 'rkc-waalwijk': 'rkc', 'sparta-rotterdam': 'srt',
    # Liga Portugal
    'estoril': 'est2', 'avs-fc': 'avs', 'boavista': 'boav',
    'nacional': 'naci', 'santa-clara': 'stcl', 'estrela': 'estre',
    'gil-vicente': 'givc', 'famalicao': 'fam', 'arouca': 'arau',
    # Jupiler
    'mechelen': 'mec', 'cercle-brugge': 'cer2', 'ostend': 'ost2',
    'zulte-waregem': 'zul', 'beerschot': 'beer', 'kortrijk': 'kor',
    'westerlo': 'west', 'oh-leuven': 'leuv',
}

total_copied = 0
total_skipped = 0
total_unknown = []

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
                
                # Try to match to team ID
                team_id = None
                lower_name = base_name.lower()
                
                for pattern, tid in svg_to_id.items():
                    if pattern in lower_name:
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
