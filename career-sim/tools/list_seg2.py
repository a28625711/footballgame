import zipfile, os, sys, re
sys.stdout.reconfigure(encoding='utf-8')

zp = r'D:\football\clubsvg\2026-27-laliga-segunda-division-svg.zip'
names = []
with zipfile.ZipFile(zp) as z:
    for i in z.infolist():
        if i.is_dir(): continue
        b = os.path.basename(i.filename)
        if b.endswith('.svg'):
            names.append(b)
for n in sorted(names):
    print(n)
