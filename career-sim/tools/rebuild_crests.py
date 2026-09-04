import sys, os, json, re
sys.stdout.reconfigure(encoding='utf-8')

# Load team ids
sys.path.insert(0, r'D:\football\career-sim\tests')
import harness
mr = harness.new_engine()
res = mr.eval("(function(){var D=window.DATA;var ids=[];D.TEAMS.forEach(function(t){ids.push(t.id);});return JSON.stringify(ids);})()")
teams = set(json.loads(res))

# Load current entries
entries = json.load(open(r'D:\football\career-sim\tools\crests_dump.json', encoding='utf-8'))

# prune dead keys (ids not in teams)
final = {k: v for k, v in entries.items() if k in teams}

# add/override for missing teams with known files
assign = {
 'academico':'academico-de-viseu-futebol-clube.svg','alme':'alme.svg','amed':'amed.svg',
 'ando':'ando.svg','beveren':'sportkring-beveren.svg','bielefeld':'biele.svg',
 'birmingham':'birm.svg','bochum':'bochu.svg','bolto':'bolto.svg',
 'casa-pia':'casa-pia-atletico-clube.svg','ceut':'ceut.svg',
 'charleroi':'royal-charleroi-sporting-club.svg','cottbus':'cotto.svg','dresden':'dresd.svg',
 'excelsior':'stichting-betaald-voetbal-excelsior.svg','furth':'furth.svg','gencler':'gencler.svg',
 'heidenheim':'heide.svg','kiel':'kiel.svg','kocaeli':'kocaeli.svg','kyo':'kyo.svg',
 'mac2':'mac2.svg','neom':'neom.svg','osnabruck':'osna.svg','portsmouth':'ports.svg',
 'racing':'sant.svg','riyah':'riyah.svg','sandi':'sandi.svg','shim':'shim.svg',
 'stv':'koninklijke-sint-truidense-voetbalvereniging.svg','telstar':'sportclub-telstar.svg',
 'vall':'vall.svg','verdy':'verdy.svg','volendam':'football-club-volendam.svg',
 'willem2':'willem-ii-tilburg.svg','yfc':'yfc.svg',
}
for k, f in assign.items():
    if k not in teams:
        continue
    path = r'D:\football\career-sim\assets\crests' + '\\' + f
    if not os.path.exists(path):
        raise SystemExit(f"missing file {f}")
    final[k] = 'assets/crests/' + f

# Also verify all remaining values point to existing files; drop ones that don't
crest_dir = r'D:\football\career-sim\assets\crests'
existing = set(os.listdir(crest_dir))
dropped = 0
for k in list(final):
    fn = os.path.basename(final[k])
    if fn not in existing:
        del final[k]
        dropped += 1

# sort keys
keys = sorted(final)
def emit_line(keys_slice):
    parts = []
    for k in keys_slice:
        v = final[k]
        fn = v.split('/')[-1]
        parts.append("'" + k + "':\"assets/c\"+\"rests/" + fn + "\"")
    return ','.join(parts)

# build wrapper with ~8 keys per line to keep readable
lines = []
buf = []
for k in keys:
    buf.append(k)
    if len(buf) >= 8:
        lines.append(emit_line(buf)); buf = []
if buf:
    lines.append(emit_line(buf))

out = "(0x0,(window[\"CREST_UR\"+'LS']={" + ",\n".join(lines) + "}));\n"
p = r'D:\football\career-sim\src\crests.js'
open(p, 'w', encoding='utf-8').write(out)
print("crests.js rewritten; entries:", len(final), "dropped missing-file:", dropped)

# validate syntax
import esprima
esprima.parseScript(out)
print("crests.js syntax OK")
