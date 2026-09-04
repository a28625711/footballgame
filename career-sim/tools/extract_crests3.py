import zipfile, os, sys, shutil
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'
crest_dir = r'D:\football\career-sim\assets\crests'

# Manual mapping for remaining unmatched files
manual_map = {
    'portsmouth': 'ports',
    'southampton': 'sout',
    'watford': 'wato',
    'wrexham': 'wrex',
    'andorra': 'ando',
    'girona': 'gir',
    'riyadh-nassr': 'nsr2',
    'kasmpasa': 'kasp',
    'deportivo': 'depor',
    'racing-de-santander': 'sant',
}

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
                if not base_name.endswith('.svg'):
                    continue
                
                lower_name = base_name.lower()
                team_id = None
                
                for pattern, tid in manual_map.items():
                    if pattern in lower_name:
                        team_id = tid
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
