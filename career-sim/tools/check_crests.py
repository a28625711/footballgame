import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'D:\football\career-sim\src\crests.js', 'r', encoding='utf-8') as f:
    c = f.read()

# Check actual format
idx = c.find("'cn-sh'")
print('Sample:', repr(c[idx:idx+80]))

# Simple approach: find all filenames in "rests/xxx.ext"
entries = re.findall(r"rests/([a-z0-9]+\.\w+)", c)
print('Filenames found:', len(entries))
if entries:
    print('First 5:', entries[:5])

# Now check which exist
base = r'D:\football\career-sim\assets\crests'
existing = set(os.listdir(base))
missing = [f for f in entries if f not in existing]
print(f'Existing: {len(entries) - len(missing)}')
print(f'Missing: {len(missing)}')
for f in sorted(missing):
    print(f'  {f}')
