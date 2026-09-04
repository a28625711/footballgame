import os, sys, json
sys.stdout.reconfigure(encoding='utf-8')
entries = json.load(open(r'D:\football\career-sim\tools\crests_dump.json', encoding='utf-8'))
crest_dir = r'D:\football\career-sim\assets\crests'
existing = set(os.listdir(crest_dir))

# 1) crests entries with missing file
missing_file = []
for k, v in entries.items():
    fn = os.path.basename(v)
    if fn not in existing:
        missing_file.append((k, fn))
print("crest entries pointing to missing files:", len(missing_file))
for k, fn in sorted(missing_file):
    print("   ", k, fn)

# 2) list candidate files for our new/changed ids
wanted = ['s04','pdb','elv','wob','her','ksl','kiel','furth','bielefeld','cottbus','dresden',
          'osnabruck','heidenheim','bochum','beveren','stv','alme','ando','ceut','vall','bolto',
          'verdy','riyah','neom','sandi','charleroi','depor','lfc','lag']
print("\nCandidates:")
for w in wanted:
    hits = sorted([f for f in existing if f.lower().startswith(w.lower()) or f.lower() == w.lower()+'.svg' or f.lower() == w.lower()+'.png'])
    hits2 = sorted([f for f in existing if w.lower() in f.lower()])[:3]
    print(f"   {w}: exact={hits} contains={hits2}")
