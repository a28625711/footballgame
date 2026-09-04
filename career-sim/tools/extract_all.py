import zipfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'
crest_dir = r'D:\football\career-sim\assets\crests'

# All zips that might have replacement teams
target_zips = [
    '2026-27-turkish-super-lig-svg.zip',
    '2026-27-eredivisie-svg.zip',
    '25-26-eredivisie-svg.zip',
    '2026-27-belgian-pro-league-svg.zip',
    '2026-27-portugal-primeira-liga-svg.zip',
    '2026-27-bundesliga-svg.zip',
    '2026-27-efl-championship-svg.zip',
    '25-26-efl-championship-svg.zip',
    '2026-27-laliga-segunda-division-svg.zip',
    '25-26-segunda-division-svg.zip',
    '24-25-2-bundesliga-svg.zip',
    '25-26-2-bundesliga-svg.zip',
]

# Extract ALL SVGs from these zips with clean names
for zip_name in target_zips:
    zip_path = os.path.join(zip_dir, zip_name)
    if not os.path.exists(zip_path):
        continue
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
                
                # Clean name: remove number prefix and version suffix
                stem = base_name[:-4]
                if stem[0].isdigit():
                    stem = stem.split('-', 1)[-1]
                if '-v' in stem:
                    stem = stem.rsplit('-v', 1)[0]
                
                # Convert to lowercase, replace spaces/special chars with hyphens
                clean = stem.lower().replace(' ', '-').replace('.', '').replace("'", '')
                
                # Save with cleaned name
                dst = os.path.join(crest_dir, clean + '.svg')
                if not os.path.exists(dst):
                    with zf.open(info) as src, open(dst, 'wb') as out:
                        out.write(src.read())
                    print(f'  SAVED: {clean}.svg')
    except Exception as e:
        print(f'  ERROR: {e}')
