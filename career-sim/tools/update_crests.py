import re, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\football\career-sim\src\crests.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove old entries
old_teams = ['anta', 'hatay', 'kayse', 'sivas', 'adan', 'bodr', 'vit2', 'alm', 
             'nac2', 'rkc', 'ost2', 'avs', 'boav', 'beer', 'car', 'rfe', 'lut', 'ply']

for tid in old_teams:
    # Match pattern: 'tid':"assets/c"+"rests/tid.ext"
    pattern = rf"'{tid}':\"assets/c\"\+\"rests/{tid}\.\w+\","
    content = re.sub(pattern, '', content)

# Add new entries (at the end of line 54, before the closing })
new_entries = {
    'amed': 'svg', 'gencler': 'svg', 'kocaeli': 'svg', 'corum': 'svg',
    'erzurum': 'svg', 'dene': 'svg', 'volendam': 'svg', 'telstar': 'svg',
    'excelsior': 'svg', 'willem2': 'svg', 'charleroi': 'svg', 'academico': 'svg',
    'casa-pia': 'svg', 'depor': 'svg', 'racing': 'svg', 'birmingham': 'svg',
    'portsmouth': 'svg', 'bochum': 'svg'
}

# Check which files actually exist
import os
crest_dir = r'D:\football\career-sim\assets\crests'
new_crest_str = ""
for tid, ext in new_entries.items():
    actual_ext = 'svg' if os.path.exists(os.path.join(crest_dir, tid + '.svg')) else \
                 ('png' if os.path.exists(os.path.join(crest_dir, tid + '.png')) else ext)
    new_crest_str += f",'{tid}':'assets/c'+'rests/{tid}.{actual_ext}'"

# Insert new entries before the closing of line 54
# Find the pattern })); at end of crests
content = content.replace("}));", new_crest_str + "}));", 1)

with open(r'D:\football\career-sim\src\crests.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated crests.js")
