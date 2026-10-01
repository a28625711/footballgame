# Golden corpus regression: full-career state fingerprints must match the
# committed baseline. Catches silent behavior changes from refactors/new code.
# Regenerate intentionally with: python tools/golden.py --update
import io
import json
import os
import sys

import harness

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'tools'))
import golden  # noqa: E402


def run():
    base = json.loads(io.open(golden.BASELINE, encoding='utf-8').read())
    cur = golden.run()
    harness.check(
        cur['hash'] == base['hash'],
        'golden corpus changed: %s -> %s (若为有意改动: python tools/golden.py --update)'
        % (base['hash'], cur['hash']))
    print('PASS golden x%d (hash=%s)' % (len(cur['careers']), cur['hash']))


if __name__ == '__main__':
    harness.main(run)
