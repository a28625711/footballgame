# Runs every test_*.py in this directory as a subprocess.
# Exit code 0 only if all pass. Usage: py career-sim/tests/run_all.py
import glob
import os
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))


def main():
    files = sorted(glob.glob(os.path.join(HERE, 'test_*.py')))
    if not files:
        print('no tests found')
        sys.exit(2)
    failed = []
    for f in files:
        name = os.path.basename(f)
        t0 = time.time()
        r = subprocess.run([sys.executable, f], capture_output=True, text=True,
                           encoding='utf-8', errors='replace')
        dt = time.time() - t0
        out = (r.stdout or '').strip().splitlines()
        status = 'PASS' if r.returncode == 0 else 'FAIL'
        line = out[-1] if out else '(no output)'
        print('%-6s %-32s %5.1fs  %s' % (status, name, dt, line))
        if r.returncode != 0:
            failed.append(name)
            for extra in out[:-1][-4:]:
                print('       ' + extra)
            if r.stderr:
                for ln in r.stderr.strip().splitlines()[-4:]:
                    print('   err:' + ln)
    print('---')
    if failed:
        print('%d/%d FAILED: %s' % (len(failed), len(files), ', '.join(failed)))
        sys.exit(1)
    print('all %d tests passed' % len(files))


if __name__ == '__main__':
    main()
