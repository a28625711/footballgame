# Shared mini_racer bootstrap for career-sim regression tests.
# Usage: import harness; mr = harness.new_engine(); result = mr.eval(js_code)
import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

from py_mini_racer import MiniRacer

TESTS_DIR = os.path.dirname(os.path.abspath(__file__))
DEOBF_DIR = os.path.abspath(os.path.join(TESTS_DIR, '..', 'deobf'))

FILES = [
    'data.deob.js',
    'events.deob.js',
    'supporters.deob.js',
    'crests.deob.js',
    'qr.deob.js',
    'natdata.deob.js',
    'sim.deob.js',
    'game.deob.js',
]

# Headless DOM/browser mocks. Elements are cached by id into window.__ELS so
# tests can inspect rendered innerHTML after calling __SIMTEST.render().
# console.log output is captured into window.__L.
ENV_JS = '''
var _mk=function(){return {style:{},classList:{add:function(){},remove:function(){},toggle:function(){},contains:function(){return false}},innerHTML:'',textContent:'',value:'',checked:false,appendChild:function(){},setAttribute:function(){},getAttribute:function(){return null},querySelector:function(){return null},querySelectorAll:function(){return []},closest:function(){return null},addEventListener:function(){},getBoundingClientRect:function(){return {top:0,height:0}}};};
var window={scrollTo:function(){},scrollBy:function(){},__L:[],__ELS:{}};
var document={getElementById:function(id){var e=window.__ELS[id];if(!e){e=_mk();e.id=id;window.__ELS[id]=e;}return e;},querySelector:function(){return _mk();},querySelectorAll:function(){return [];},createElement:function(){return _mk();},addEventListener:function(){},body:{appendChild:function(){},classList:{add:function(){},toggle:function(){}}},documentElement:{style:{}}};
var localStorage={getItem:function(){return null;},setItem:function(){},removeItem:function(){}};
var navigator={userAgent:'test',canShare:false}; var location={href:''}; var screen={}; var Image=function(){};
var console={log:function(m){window.__L.push(String(m).slice(0,250))},warn:function(){}};
var matchMedia=function(){return {matches:false};}; var requestAnimationFrame=function(f){return 0;};
var confirm=function(){return true;}; var alert=function(){};
'''

NEW_PLAYER = "{'name':'p','origin':'sd','pos':'ST','nation':'cn','talent':1.1,'number':9,'foot':'r'}"


def new_engine():
    mr = MiniRacer()
    mr.eval(ENV_JS)
    for name in FILES:
        path = os.path.join(DEOBF_DIR, name)
        with open(path, encoding='utf-8') as fh:
            mr.eval(fh.read())
    return mr


def logs(mr):
    try:
        return mr.eval('window.__L.join(" | ")')
    except Exception:
        return '(unavailable)'


def rendered_html(mr):
    try:
        return mr.eval(
            'Object.keys(window.__ELS).map(function(k){return String(window.__ELS[k].innerHTML);}).join("\\n")')
    except Exception:
        return ''


class Fail(Exception):
    pass


def check(cond, msg):
    if not cond:
        raise Fail(msg)


def main(fn):
    try:
        fn()
    except Fail as e:
        print('FAIL:', e)
        sys.exit(1)
    except Exception as e:
        print('ERROR:', e)
        sys.exit(2)
    print('PASS')
