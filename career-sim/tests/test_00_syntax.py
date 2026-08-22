# Syntax gate: every deobf source must parse before any other test runs.
import os

import esprima

import harness


def run():
    bad = []
    for name in harness.FILES:
        path = os.path.join(harness.DEOBF_DIR, name)
        with open(path, encoding='utf-8', newline='') as fh:
            src = fh.read()
        try:
            esprima.parseScript(src)
        except Exception as e:
            bad.append('%s: %s' % (name, str(e)[:120]))
    if bad:
        raise harness.Fail(' | '.join(bad))
    print('PASS syntax (%d files)' % len(harness.FILES))


if __name__ == '__main__':
    harness.main(run)
