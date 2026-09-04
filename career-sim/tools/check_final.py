import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'D:\football\career-sim\src\crests.js', 'r', encoding='utf-8') as f:
    c = f.read()

entries = re.findall(r"rests/([a-z0-9]+\.\w+)", c)
base = r'D:\football\career-sim\assets\crests'
existing = set(os.listdir(base))

missing = [f for f in entries if f not in existing]
existing_count = len(entries) - len(missing)

print(f'Total registered: {len(entries)}')
print(f'Files exist: {existing_count}')
print(f'Files missing: {len(missing)}')
if missing:
    print('\n=== STILL MISSING ===')
    for f in sorted(missing):
        print(f'  {f}')
