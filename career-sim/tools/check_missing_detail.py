import os, sys
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'
missing = [
    'adan', 'alm', 'anta', 'avs', 'beer', 'boav', 'bodr', 'cag2', 'car',
    'elc', 'est2', 'estre', 'ett', 'hatay', 'her2', 'jeon', 'kayse', 'kol',
    'lev2', 'lut', 'mia', 'monz', 'nac2', 'nor2', 'ost2', 'ply', 'reg',
    'rfe', 'rkc', 'sivas', 'ulm', 'vit2'
]

existing = set(os.listdir(crest_dir))
for tid in missing:
    has_svg = (tid + '.svg') in existing
    has_png = (tid + '.png') in existing
    print(f'{tid}: svg={has_svg} png={has_png}')
