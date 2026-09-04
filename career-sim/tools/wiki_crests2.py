import urllib.request, os, sys, ssl, time
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

# Direct Wikipedia image URLs (manually found)
logos = {
    'adan': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Adanaspor_A._%C5%9E._logo.png/200px-Adanaspor_A._%C5%9E._logo.png',
    'anta': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Antalyaspor_logo.svg/200px-Antalyaspor_logo.svg.png',
    'hatay': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Hatayspor_logo.svg/200px-Hatayspor_logo.svg.png',
    'kayse': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Kayserispor_logo.svg/200px-Kayserispor_logo.svg.png',
    'sivas': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Sivasspor_logo.svg/200px-Sivasspor_logo.svg.png',
    'bodr': 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Bodrum_F.K._logo.png/200px-Bodrum_F.K._logo.png',
    'alm': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Almere_City_FC_logo.svg/200px-Almere_City_FC_logo.svg.png',
    'vit2': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/Vitesse_logo.svg/200px-Vitesse_logo.svg.png',
    'nac2': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/NAC_Breda_logo.svg/200px-NAC_Breda_logo.svg.png',
    'rkc': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/RKC_Waalwijk_logo.svg/200px-RKC_Waalwijk_logo.svg.png',
    'beer': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/57/K._Beerschot_V.A._logo.svg/200px-K._Beerschot_V.A._logo.svg.png',
    'ost2': 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/K_V_Oostende_logo.svg/200px-K_V_Oostende_logo.svg.png',
    'avs': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/AVS_Futebol_SAD_logo.svg/200px-AVS_Futebol_SAD_logo.svg.png',
    'boav': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Boavista_F.C._logo.svg/200px-Boavista_F.C._logo.svg.png',
    'car': 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/F.C._Cartagena_logo.svg/200px-F.C._Cartagena_logo.svg.png',
    'rfe': 'https://upload.wikimedia.org/wikipedia/en/thumb/5/58/Racing_de_Ferrol_logo.svg/200px-Racing_de_Ferrol_logo.svg.png',
    'lut': 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Luton_Town_F.C._logo.svg/200px-Luton_Town_F.C._logo.svg.png',
    'ply': 'https://upload.wikimedia.org/wikipedia/en/thumb/7/78/Plymouth_Argyle_F.C._logo.svg/200px-Plymouth_Argyle_F.C._logo.svg.png',
}

copied = 0
for tid, url in logos.items():
    dst = os.path.join(crest_dir, tid + '.png')
    if os.path.exists(dst):
        print(f'SKIP: {tid}')
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
            with open(dst, 'wb') as f:
                f.write(resp.read())
        size = os.path.getsize(dst)
        print(f'OK: {tid} ({size} bytes)')
        copied += 1
    except Exception as e:
        print(f'FAIL: {tid}: {e}')
    time.sleep(0.5)

print(f'\nDownloaded: {copied}')
