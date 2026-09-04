import zipfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'
crest_dir = r'D:\football\career-sim\assets\crests'

# Teams found in zips
found = {
    'jeon': ['jeonbuk'],  # Jeonbuk -> our id is 'jeon' but data.js might have different
    'mia': ['inter-miami', 'internacional-de-futbol-miami'],
    'nor2': ['norwich'],
    'ett': ['ettifaq'],
}

# Also check all zips with svg/ prefix for any missing teams
missing_stems = [
    'adan', 'alm', 'anta', 'avs', 'beer', 'boav', 'bodr', 'cag2', 'car',
    'elc', 'est2', 'estre', 'hatay', 'her2', 'kayse', 'kol',
    'lev2', 'lut', 'monz', 'nac2', 'ost2', 'ply', 'reg',
    'rfe', 'rkc', 'sivas', 'ulm', 'vit2'
]

total_copied = 0

for zip_name in sorted(os.listdir(zip_dir)):
    if not zip_name.endswith('.zip'):
        continue
    zip_path = os.path.join(zip_dir, zip_name)
    try:
        with zipfile.ZipFile(zip_path, 'r') as zf:
            for info in zf.infolist():
                if info.is_dir():
                    continue
                fname = info.filename
                base_name = os.path.basename(fname)
                lower = fname.lower()
                
                # Manual matches
                team_id = None
                if 'jeonbuk' in lower and 'jeon' not in [f.split('.')[0] for f in os.listdir(crest_dir)]:
                    team_id = 'jeon'
                elif 'inter-miami' in lower or 'internacional-de-futbol-miami' in lower:
                    if not os.path.exists(os.path.join(crest_dir, 'mia.svg')):
                        team_id = 'mia'
                elif 'norwich' in lower:
                    if not os.path.exists(os.path.join(crest_dir, 'nor2.svg')):
                        team_id = 'nor2'
                elif 'ettifaq' in lower:
                    if not os.path.exists(os.path.join(crest_dir, 'ett.svg')):
                        team_id = 'ett'
                
                # Also check for other missing teams by keyword
                for stem in missing_stems:
                    if not os.path.exists(os.path.join(crest_dir, stem + '.svg')):
                        keywords = {
                            'anta': ['antalya'],
                            'hatay': ['hatay'],
                            'kayse': ['kayseri'],
                            'sivas': ['sivas'],
                            'bodr': ['bodrum'],
                            'alm': ['almere'],
                            'vit2': ['vitesse'],
                            'nac2': ['nac-breda', 'nac breda'],
                            'ost2': ['ostend'],
                            'rkc': ['rkc', 'waalwijk'],
                            'her2': ['heracles'],
                            'boav': ['boavista'],
                            'avs': ['avs'],
                            'estre': ['estrela'],
                            'est2': ['estoril'],
                            'kol': ['koln', 'cologne'],
                            'reg': ['regensburg'],
                            'ulm': ['ulm'],
                            'lev2': ['levante'],
                            'car': ['cartagena'],
                            'elc': ['elche'],
                            'rfe': ['ferrol'],
                            'lut': ['luton'],
                            'ply': ['plymouth'],
                            'adan': ['adana'],
                            'beer': ['beerschot'],
                            'monz': ['monza'],
                            'cag2': ['cagliari'],
                        }
                        if stem in keywords:
                            for kw in keywords[stem]:
                                if kw in lower:
                                    team_id = stem
                                    break
                
                if team_id:
                    dst = os.path.join(crest_dir, team_id + '.svg')
                    if not os.path.exists(dst):
                        with zf.open(info) as src, open(dst, 'wb') as out:
                            out.write(src.read())
                        print(f'COPIED: {team_id} <- {base_name}')
                        total_copied += 1
    except Exception as e:
        print(f'ERROR: {e}')

print(f'\nCopied: {total_copied}')
