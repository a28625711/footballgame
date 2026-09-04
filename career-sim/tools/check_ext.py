import re, sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'D:\football\career-sim\src\crests.js', 'r', encoding='utf-8') as f:
    c = f.read()

missing = ['adan','adl','ahl2','alanya','anta','auck','avs','basa','beer','bla','bodr',
'boav','bra2','bri','bri2','bur','cag2','car','cas2','ccm','cer2','cha','cin','col',
'cor','dal2','dar','dc','der','dus','eib','elc','eld','elv','est2','estre','etif','ett',
'eyup','fam','fat','fay','fene','fsit','gae','gala','gaziantep','gim','gir','givc','gnk',
'goztepe','gwan','hatay','her2','hou','hue','inc','jbh','jeon','kasp','kayse','khl','kho',
'kol','konia','kor','leuv','lev2','lut','mac','mag','mal','mec','melc','melv','mia','mid',
'mil2','min','mir','monz','mtl','mun2','nac2','naci','nii','njc','nor2','nsh','nsr2',
'nur','orob','ost2','oxf','pec','per','ply','por2','qad','reg','rfe','rize','rkc','rsl',
'sac','samsun','shab','shon','sivas','srt','stcl','stl2','swf','syd','taa','ten','trab',
'ulm','van','vit2','wel','west','wsw','wun','zul']

# Simple approach: find all filenames
entries = re.findall(r"rests/([a-z0-9]+\.\w+)", c)
missing_files = [f for f in entries if f.split('.')[0] in missing]

# Count by extension
exts = {}
for f in missing_files:
    ext = f.split('.')[-1]
    exts[ext] = exts.get(ext, 0) + 1

print(f"Total missing files: {len(missing_files)}")
for ext, count in sorted(exts.items()):
    print(f"  .{ext}: {count}")

print("\nAll missing files:")
for f in sorted(missing_files):
    print(f"  {f}")
