import zipfile, os, sys
sys.stdout.reconfigure(encoding='utf-8')
zp = r'D:\football\clubsvg\2026-27-turkish-super-lig-svg.zip'
crest_dir = r'D:\football\career-sim\assets\crests'
want = {
    'corum-futbol-kulubu': 'corum.svg',
    'erzurumspor-futbol-kulubu': 'erzurum.svg',
}
found = {}
with zipfile.ZipFile(zp) as z:
    for info in z.infolist():
        if info.is_dir():
            continue
        base = os.path.basename(info.filename).lower()
        for key in want:
            if key in base:
                data = z.read(info)
                dst = os.path.join(crest_dir, want[key])
                open(dst, 'wb').write(data)
                found[key] = want[key] + ' ' + str(len(data))
                break
for k, v in found.items():
    print(k, '->', v)
