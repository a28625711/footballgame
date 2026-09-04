import urllib.request, os, sys, ssl, time, re
sys.stdout.reconfigure(encoding='utf-8')

crest_dir = r'D:\football\career-sim\assets\crests'

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

# Club websites with likely logo locations
teams = {
    'adan': 'https://www.adanaspor.org.tr',
    'anta': 'https://www.antalyaspor.com.tr',
    'hatay': 'https://www.hatayspor.org.tr',
    'kayse': 'https://www.kayserispor.org.tr',
    'sivas': 'https://www.sivasspor.org.tr',
    'bodr': 'https://www.bodrumfk.com.tr',
    'alm': 'https://www.almerecityfc.nl',
    'vit2': 'https://www.vitesse.nl',
    'nac2': 'https://www.nac.nl',
    'rkc': 'https://www.rkcwaalwijk.nl',
    'beer': 'https://www.beerschot.be',
    'ost2': 'https://www.kvostende.be',
    'avs': 'https://www.avs-fc.pt',
    'boav': 'https://www.boavista.pt',
    'car': 'https://www.fccartagena.es',
    'rfe': 'https://www.rfcferrol.com',
    'lut': 'https://www.lutontown.co.uk',
    'ply': 'https://www.pafc.co.uk',
}

def extract_logo_url(html, base_url):
    """Extract logo URL from HTML"""
    # Look for og:image or logo in meta tags
    patterns = [
        r'<meta\s+property="og:image"\s+content="([^"]+)"',
        r'<meta\s+content="([^"]+)"\s+property="og:image"',
        r'<link[^>]*rel="icon"[^>]*href="([^"]+)"',
        r'<link[^>]*rel="shortcut icon"[^>]*href="([^"]+)"',
        r'src="([^"]*logo[^"]*\.(png|svg|ico))"',
        r'src="([^"]*badge[^"]*\.(png|svg|ico))"',
        r'src="([^"]*crest[^"]*\.(png|svg|ico))"',
    ]
    for pattern in patterns:
        match = re.search(pattern, html, re.IGNORECASE)
        if match:
            url = match.group(1)
            if url.startswith('//'):
                url = 'https:' + url
            elif url.startswith('/'):
                url = base_url.rstrip('/') + url
            return url
    return None

copied = 0
for tid, url in teams.items():
    dst = os.path.join(crest_dir, tid + '.png')
    if os.path.exists(dst) or os.path.exists(os.path.join(crest_dir, tid + '.svg')):
        print(f'SKIP: {tid}')
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=15) as resp:
            html = resp.read().decode('utf-8', errors='ignore')
            logo_url = extract_logo_url(html, url)
            if logo_url:
                req2 = urllib.request.Request(logo_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req2, context=ssl_ctx, timeout=15) as img_resp:
                    data = img_resp.read()
                    if len(data) > 200:
                        ext = '.png'
                        if '.svg' in logo_url.lower():
                            ext = '.svg'
                        with open(os.path.join(crest_dir, tid + ext), 'wb') as f:
                            f.write(data)
                        print(f'OK: {tid} ({len(data)} bytes) <- {logo_url}')
                        copied += 1
                    else:
                        print(f'TOO SMALL: {tid}')
            else:
                print(f'NO LOGO: {tid}')
    except Exception as e:
        print(f'FAIL: {tid}: {e}')
    time.sleep(1)

print(f'\nDownloaded: {copied}')
