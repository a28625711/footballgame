import urllib.request, os, sys, ssl, time
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

# Try using favicone.com API to get club logos from their websites
teams = {
    'adan': 'adanaspor.org.tr',
    'anta': 'antalyaspor.com.tr',
    'hatay': 'hatayspor.org.tr',
    'kayse': 'kayserispor.org.tr',
    'sivas': 'sivasspor.org.tr',
    'bodr': 'bodrumfk.com.tr',
    'alm': 'almeresitfc.nl',
    'vit2': 'vitesse.nl',
    'nac2': 'nac.nl',
    'rkc': 'rkcwaalwijk.nl',
    'beer': 'beerschot.be',
    'ost2': 'kvostende.be',
    'avs': 'avs-fc.pt',
    'boav': 'boavista.pt',
    'car': 'fccartagena.es',
    'rfe': 'rfcferrol.com',
    'lut': 'lutontown.co.uk',
    'ply': 'pafc.co.uk',
}

copied = 0
for tid, domain in teams.items():
    dst = os.path.join(crest_dir, tid + '.svg')
    if os.path.exists(dst) or os.path.exists(os.path.join(crest_dir, tid + '.png')):
        print(f'SKIP: {tid}')
        continue
    try:
        # favicone.com API
        url = f"https://favicone.com/{domain}/256"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
            data = resp.read()
            if len(data) > 100:  # Valid image
                with open(dst, 'wb') as f:
                    f.write(data)
                print(f'OK: {tid} ({len(data)} bytes)')
                copied += 1
            else:
                print(f'TOO SMALL: {tid}')
    except Exception as e:
        print(f'FAIL: {tid}: {e}')
    time.sleep(0.5)

print(f'\nDownloaded: {copied}')
