import zipfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'
missing = [
    'adan', 'alm', 'anta', 'avs', 'beer', 'boav', 'bodr', 'cag2', 'car',
    'elc', 'est2', 'estre', 'ett', 'hatay', 'her2', 'jeon', 'kayse', 'kol',
    'lev2', 'lut', 'mia', 'monz', 'nac2', 'nor2', 'ost2', 'ply', 'reg',
    'rfe', 'rkc', 'sivas', 'ulm', 'vit2'
]

# Search all zips for these team names
keywords = {
    'adan': ['adana', 'demirspor'],
    'alm': ['almere'],
    'anta': ['antalya'],
    'avs': ['avs'],
    'beer': ['beerschot'],
    'boav': ['boavista'],
    'bodr': ['bodrum'],
    'cag2': ['cagliari'],
    'car': ['cartagena'],
    'elc': ['elche'],
    'est2': ['estoril'],
    'estre': ['estrela'],
    'ett': ['ettifaq', 'ittiham'],
    'hatay': ['hatay'],
    'her2': ['heracles'],
    'jeon': ['jeonnam', 'jeonbuk'],
    'kayse': ['kayseri'],
    'kol': ['koln', 'cologne'],
    'lev2': ['levante'],
    'lut': ['luton'],
    'mia': ['miami', 'inter-miami'],
    'monz': ['monza'],
    'nac2': ['nac-breda', 'nac breda'],
    'nor2': ['norwich'],
    'ost2': ['ostend'],
    'ply': ['plymouth'],
    'reg': ['regensburg'],
    'rfe': ['ferrol', 'racing-ferrol'],
    'rkc': ['rkc', 'waalwijk'],
    'sivas': ['sivas'],
    'ulm': ['ulm'],
    'vit2': ['vitesse'],
}

for zip_name in sorted(os.listdir(zip_dir)):
    if not zip_name.endswith('.zip'):
        continue
    zip_path = os.path.join(zip_dir, zip_name)
    try:
        with zipfile.ZipFile(zip_path, 'r') as zf:
            for info in zf.infolist():
                if info.is_dir():
                    continue
                fname = info.filename.lower()
                for tid, kws in keywords.items():
                    if any(kw in fname for kw in kws):
                        print(f'  FOUND: {tid} in {zip_name} -> {info.filename}')
    except:
        pass
