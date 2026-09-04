import urllib.request, os, sys, json, re, ssl
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'

# Wikipedia API to get club logo
def get_wiki_logo(team_name, team_id):
    """Get club logo from Wikipedia"""
    ssl_ctx = ssl.create_default_context()
    ssl_ctx.check_hostname = False
    ssl_ctx.verify_mode = ssl.CERT_NONE
    
    # Search Wikipedia
    search_url = f"https://en.wikipedia.org/w/api.php?action=query&titles={team_name}&prop=pageimages&format=json&pithumbsize=200"
    try:
        req = urllib.request.Request(search_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=10) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            for pid, page in pages.items():
                thumb = page.get('thumbnail', {}).get('source', '')
                if thumb:
                    # Download the image
                    img_url = thumb.split('/revision/')[0] if '/revision/' in thumb else thumb
                    dst = os.path.join(crest_dir, team_id + '.png')
                    req2 = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
                    with urllib.request.urlopen(req2, context=ssl_ctx, timeout=10) as img_resp:
                        with open(dst, 'wb') as f:
                            f.write(img_resp.read())
                    print(f'  OK: {team_id} ({team_name})')
                    return True
    except Exception as e:
        print(f'  FAIL: {team_id} ({team_name}): {e}')
    return False

# Missing teams with Wikipedia article names
missing_teams = [
    ('adan', 'Adanaspor'),
    ('anta', 'Antalyaspor'),
    ('hatay', 'Hatayspor'),
    ('kayse', 'Kayserispor'),
    ('sivas', 'Sivasspor'),
    ('bodr', 'Bodrum_FK'),
    ('alm', 'Almere_City_FC'),
    ('vit2', 'Vitesse'),
    ('nac2', 'NAC_Breda'),
    ('rkc', 'RKC_Waalwijk'),
    ('beer', 'K._Beerschot_V.A.'),
    ('ost2', 'Ostend_(football_club)'),
    ('avs', 'AVS_Futebol_SAD'),
    ('boav', 'Boavista_F.C.'),
    ('car', 'FC_Cartagena'),
    ('rfe', 'Racing_de_Ferrol'),
    ('lut', 'Luton_Town_F.C.'),
    ('ply', 'Plymouth_Argyle_F.C.'),
]

copied = 0
for tid, wiki_name in missing_teams:
    if not os.path.exists(os.path.join(crest_dir, tid + '.png')) and \
       not os.path.exists(os.path.join(crest_dir, tid + '.svg')):
        if get_wiki_logo(wiki_name, tid):
            copied += 1

print(f'\nDownloaded: {copied}')
