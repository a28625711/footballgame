import urllib.request, os, sys, ssl, time, json
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

def get_wiki_logo(title, team_id):
    """Get club logo from Wikipedia using MediaWiki API"""
    # Step 1: Get page image
    api_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={title}&prop=pageimages&format=json&pithumbsize=300"
    try:
        req = urllib.request.Request(api_url, headers={'User-Agent': 'CrestBot/1.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, page in pages.items():
                thumb = page.get('thumbnail', {})
                img_url = thumb.get('source', '')
                if img_url:
                    # Download the image
                    dst = os.path.join(crest_dir, team_id + '.png')
                    req2 = urllib.request.Request(img_url, headers={'User-Agent': 'CrestBot/1.0'})
                    with urllib.request.urlopen(req2, context=ssl_ctx, timeout=15) as img_resp:
                        with open(dst, 'wb') as f:
                            f.write(img_resp.read())
                    return True
    except Exception as e:
        print(f'  Error {team_id}: {e}')
    return False

# Missing teams
teams = [
    ('adan', 'Adanaspor'),
    ('anta', 'Antalyaspor'),
    ('hatay', 'Hatayspor'),
    ('kayse', 'Kayserispor'),
    ('sivas', 'Sivasspor'),
    ('bodr', 'Bodrum FK'),
    ('alm', 'Almere City FC'),
    ('vit2', 'Vitesse'),
    ('nac2', 'NAC Breda'),
    ('rkc', 'RKC Waalwijk'),
    ('beer', 'K Beerschot VA'),
    ('ost2', 'KV Oostende'),
    ('avs', 'AVS Futebol SAD'),
    ('boav', 'Boavista F.C.'),
    ('car', 'FC Cartagena'),
    ('rfe', 'Racing de Ferrol'),
    ('lut', 'Luton Town F.C.'),
    ('ply', 'Plymouth Argyle F.C.'),
]

copied = 0
for tid, name in teams:
    dst = os.path.join(crest_dir, tid + '.png')
    if os.path.exists(dst):
        print(f'SKIP: {tid}')
        continue
    ok = get_wiki_logo(name, tid)
    if ok:
        print(f'OK: {tid}')
        copied += 1
    else:
        print(f'FAIL: {tid}')
    time.sleep(1)

print(f'\nDownloaded: {copied}')
