import os, sys
sys.stdout.reconfigure(encoding='utf-8')

d = r'D:\football\career-sim\assets\crests'
files = sorted(os.listdir(d))

checks = ['almeria', 'granada', 'las-palmas', 'cadiz', 'oviedo', 'sociedad', 'andorra',
          'ceuta', 'sabadell', 'gijon', 'leonesa', 'coruna', 'santander', 'zaragoza',
          'huesca', 'mallorca', 'leganes', 'valladolid', 'eibar', 'tenerife',
          'wolfsburg', 'bochum', 'bielefeld', 'cottbus', 'dresden', 'osnabruck',
          'heidenheim', 'holstein', 'furth', 'depor', 'alba', 'burgos', 'racing']

for c in checks:
    hits = [f for f in files if c.lower() in f.lower()]
    print(f"{c}: {hits if hits else 'NONE'}")
