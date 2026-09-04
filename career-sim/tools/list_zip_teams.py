import zipfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')

zip_dir = r'D:\football\clubsvg'

# List all teams in each zip
for zip_name in sorted(os.listdir(zip_dir)):
    if not zip_name.endswith('.zip'):
        continue
    zip_path = os.path.join(zip_dir, zip_name)
    print(f'\n=== {zip_name} ===')
    try:
        with zipfile.ZipFile(zip_path, 'r') as zf:
            teams = []
            for info in zf.infolist():
                if info.is_dir():
                    continue
                fname = os.path.basename(info.filename)
                if fname.endswith('.svg'):
                    # Clean up name
                    name = fname.replace('.svg', '')
                    # Remove leading number
                    name = name.split('-', 1)[-1] if name[0].isdigit() else name
                    # Remove version suffix
                    name = name.rsplit('-v', 1)[0] if '-v' in name else name
                    teams.append(name)
            for t in sorted(teams):
                print(f'  {t}')
    except Exception as e:
        print(f'  ERROR: {e}')
