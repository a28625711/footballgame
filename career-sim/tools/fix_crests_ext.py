import re, os, sys
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'
crests_file = r'D:\football\career-sim\src\crests.js'

# Read crests.js
with open(crests_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all entries with .png that have .svg files
updated = 0
for fname in os.listdir(crest_dir):
    if fname.endswith('.svg'):
        stem = fname[:-4]  # Remove .svg
        # Check if there's a .png entry in crests.js
        old_pattern = f"rests/{stem}.png"
        new_pattern = f"rests/{stem}.svg"
        if old_pattern in content and new_pattern not in content:
            content = content.replace(old_pattern, new_pattern)
            updated += 1

# Write updated crests.js
with open(crests_file, 'w', encoding='utf-8') as f:
    f.write(content)

print(f'Updated {updated} entries from .png to .svg')
