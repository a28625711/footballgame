# -*- coding: utf-8 -*-
"""Download flag SVGs from lipis/flag-icons for every NATS entry.

Mapping strategy per nation (id now prefixed n_):
1. parse the `f` field: regional-indicator emoji pair -> alpha-2 code;
   tag-sequence flags (England etc.) -> gb-eng / gb-sct / gb-wls / gb-nir.
2. fallback: FIFA->ISO2 table below (for entries whose `f` is the ⚽ placeholder).
On success the entry gets `img:'n_xxx'` written back into natdata.js; failures
keep the emoji fallback at render time.
"""
import json, os, re, sys, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NAT = os.path.join(ROOT, 'src', 'natdata.js')
OUT = os.path.join(ROOT, 'assets', 'flags')

SRC = r'D:/football/clubsvgnew/flag-icons-main/flags/4x3'

FIFA2ISO = {
    'afg':'af','alb':'al','alg':'dz','and':'ad','ang':'ao','aia':'ai','atg':'ag',
    'uae':'ae','arm':'am','asa':'as','aus':'au','aut':'at','aze':'az','bah':'bs',
    'bhr':'bh','ban':'bd','bar':'bb','blr':'by','bel':'be','blz':'bz','ben':'bj',
    'ber':'bm','bih':'ba','bol':'bo','bot':'bw','brn':'bn','bul':'bg','bfa':'bf',
    'bdi':'bi','khm':'kh','cmr':'cm','can':'ca','cpv':'cv','cay':'ky','caf':'cf',
    'cha':'td','chi':'cl','chn':'cn','col':'co','com':'km','cod':'cd','cin':'ci',
    'crc':'cr','cro':'hr','cub':'cu','cyp':'cy','cze':'cz','den':'dk','dji':'dj',
    'dma':'dm','dom':'do','ecu':'ec','eqg':'gq','eri':'er','est':'ee','swz':'sz',
    'eth':'et','far':'fo','fji':'fj','fin':'fi','gab':'ga','gam':'gm','geo':'ge',
    'ger':'de','gha':'gh','grc':'gr','grd':'gd','gtm':'gt','gui':'gn','gnb':'gw',
    'guy':'gy','hai':'ht','hon':'hn','hkg':'hk','hun':'hu','isl':'is','ind':'in',
    'idn':'id','irl':'ie','irn':'ir','irq':'iq','isr':'il','jor':'jo','kaz':'kz',
    'ken':'ke','kos':'xk','kuw':'kw','kgz':'kg','lao':'la','lva':'lv','lbn':'lb',
    'lso':'ls','lbr':'lr','lby':'ly','lie':'li','ltu':'lt','lux':'lu','mac':'mo',
    'mad':'mg','maw':'mw','mas':'my','mli':'ml','mlt':'mt','mtn':'mr','mtq':'mq',
    'mda':'md','mon':'mc','mng':'mn','mne':'me','msr':'ms','moz':'mz','mmr':'mm',
    'nam':'na','nep':'np','ncl':'nc','nzl':'nz','nic':'ni','nig':'ne','nga':'ng',
    'prk':'kp','mkd':'mk','nor':'no','omn':'om','pak':'pk','pan':'pa','png':'pg',
    'par':'py','per':'pe','phi':'ph','pur':'pr','qat':'qa','rou':'ro','rus':'ru',
    'rwa':'rw','skn':'kn','sen':'sn','srb':'rs','sey':'sc','sle':'sl','sgp':'sg',
    'svk':'sk','svn':'si','som':'so','rsa':'za','ssd':'ss','sri':'lk','sdn':'sd',
    'sur':'sr','swe':'se','sui':'ch','syr':'sy','tpe':'tw','tjk':'tj','tza':'tz',
    'tha':'th','tgo':'tg','tto':'tt','tun':'tn','tur':'tr','tkm':'tm','tca':'tc',
    'uga':'ug','ukr':'ua','uru':'uy','uzb':'uz','vir':'vi','van':'vu','ven':'ve','vie':'vn',
    'aru':'aw','brb':'bb','bhu':'bt','vgb':'vg','bru':'bn','cam':'kh','cta':'cf',
    'cgo':'cg','cok':'ck','civ':'ci','cuw':'cw','egy':'eg','slv':'sv','fro':'fo',
    'fij':'fj','gib':'gi','grn':'gd','gum':'gu','gua':'gt','jam':'jm','les':'ls',
    'mwi':'mw','mri':'mu','mya':'mm','nca':'ni','oma':'om','ple':'ps','sam':'ws',
    'smr':'sm','stp':'st','ksa':'sa','sol':'sb','lca':'lc','vin':'vc','tah':'pf',
    'tan':'tz','tog':'tg','tga':'to','tri':'tt',
    'yem':'ye','tls':'tl','zam':'zm','zim':'zw','mdv':'mv','guam':'gu','guf':'gf','gre':'gr',
    'sct':'gb-sct','sco':'gb-sct','wal':'gb-wls','nir':'gb-nir','eng':'gb-eng',
}
TAG = 0xE0000  # tag chars 0xE0020..0xE007E map to ASCII 0x20..0x7E

def code_from_emoji(f):
    if not f:
        return None
    letters = []
    for ch in f:
        o = ord(ch)
        if 0x1F1E6 <= o <= 0x1F1FF:
            letters.append(chr(o - 0x1F1E6 + ord('A')))
        elif 0xE0020 <= o <= 0xE007E:
            letters.append(chr(o - TAG))
    s = ''.join(letters)
    if len(s) == 2 and s.isalpha() and s.isupper():
        return s.lower()
    if s.startswith('gb') and len(s) > 2:
        return 'gb-' + s[2:].lower()
    return None

def main():
    src = open(NAT, encoding='utf-8').read()
    entries = re.findall(r"\{i:'(n_[a-z0-9]+)',n:'([^']+)',c:'[^']+',s:\d+,f:'([^']*)'\}", src)
    if not entries:
        print('no entries parsed', file=sys.stderr); sys.exit(1)
    os.makedirs(OUT, exist_ok=True)
    got, miss = [], []
    for nid, name, f in entries:
        raw = nid[2:]
        code = code_from_emoji(f) or FIFA2ISO.get(raw)
        if not code:
            miss.append((raw, name)); continue
        dest = os.path.join(OUT, nid + '.svg')
        if not os.path.exists(dest):
            srcf = os.path.join(SRC, code + '.svg')
            try:
                data = open(srcf, 'rb').read()
                if b'<svg' not in data[:400]:
                    raise ValueError('not svg')
                open(dest, 'wb').write(data)
            except Exception as e:
                print('FAIL %s (%s): %s' % (raw, code, e), file=sys.stderr)
                miss.append((raw, name)); continue
        got.append(nid)
        src = re.sub(r"(\{i:'%s',n:'[^']+',c:'[^']+',s:\d+,f:'[^']*')\}" % nid,
                     r"\1,img:'%s'}" % nid, src, count=1)
    open(NAT, 'w', encoding='utf-8').write(src)
    print(json.dumps({'downloaded': len(got), 'missing': miss}, ensure_ascii=False))

if __name__ == '__main__':
    main()
