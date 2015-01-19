import json
import sys
import shutil
from collections import OrderedDict
from operator import itemgetter, attrgetter
import codecs
import base64

try: # Py3
  from urllib.parse import urlencode
  from urllib.request import urlopen
  from urllib.request import Request
except ImportError: # Py2
  from urllib import urlencode
  from urllib2 import urlopen
  from urllib2 import Request

from os import listdir
from os.path import isfile, join
import re
import argparse
import os
import time
from datetime import datetime
import calendar

import shlex, subprocess
import preprocessor
import tests
import imports
from imports import Source

# This is a very crude build system. Will update someday.

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('-v', '-version', default='-1', nargs='?', help='version')
parser.add_argument('-cp', '-copyfile', default='', nargs='?', help='copy the output to a location')
parser.add_argument('-m', '-min', default=False, action='store_true', help='minify the file')
parser.add_argument('-d', '-debug', default=False, action='store_true', help='enable debug mode')
parser.add_argument('-b', '-beta', default=False, action='store_true', help='build beta')
parser.add_argument('-r', '-release', default=False, action='store_true', help='build release')
parser.add_argument('-doc', '-document', default='', nargs='?', help='generate doc with given JSDoc dir')
parser.add_argument('-t', '-test', default='', nargs='?', help='insert script test')

args = parser.parse_args()

if(args.v == '-1'):
    print('You must enter a version number')
    sys.exit()
    
def imageToBase64(imagePath):
    with open(imagePath, "rb") as image_file:
        tmp = base64.b64encode(image_file.read())
    return tmp.replace(b"\n", b"")
    
def getMetaBlock(inputStr):
    inMetaBlock = False
    metaBlock = '';
    for line in inputStr.splitlines():
        if(inMetaBlock == False):
            if(re.search(r'\/\/\s+==UserScript==', line)):
                metaBlock+=line+'\n'
                inMetaBlock = True
        else:
            metaBlock+=line+'\n'
            if(re.search(r'\/\/\s+==\/UserScript==', line)):
                inMetaBlock = False
                break
    return metaBlock

def compressString(content, level='WHITESPACE_ONLY', language='ECMASCRIPT5'):

    params = [
        ('js_code', content),
        ('compilation_level', level),
        ('output_format', 'text'),
        #('output_wrapper', '(function() {%output%})();'),
        ('output_info', 'compiled_code'),
        ('output_info', 'errors'),
        #('warning_level', 'QUIET'),
        ('language', language),
      ]
        
    data = urlencode(params).encode('utf-8')

    req = Request('https://closure-compiler.appspot.com/compile')
    req.add_header('Content-type', 'application/x-www-form-urlencoded;charset=utf-8')
    r = urlopen(req, data)
    if r.getcode() != 200:
      raise Exception('response status was: ' + r.status)
    return r.read().decode('utf-8')

import logging
import subprocess


def check_available():
    subprocess.check_output(['which', 'uglifyjs'])


def compile(source_paths, iargs, flags=None):
    """
    Prepares command-line call to uglify-js compiler.

    Args:
        source_paths: Source paths to build, in order.
        flags: A list of additional flags to pass on to uglify-js.

    Returns:
        The compiled source, as a string, or None if compilation failed.
    """

    args = ['uglifyjs.cmd']
    args.extend(source_paths)
    args.extend(iargs)
    #args.extend(['-c', '-m'])
    if flags:
        args += flags

    logging.info('Compiling with the following command: %s', ' '.join(args))

    try:
        return subprocess.check_output(args, None, None, True)
    except subprocess.CalledProcessError:
        return

#jModIconData = imageToBase64('./src/assets/favicon2.png')
#jModIcon = 'background-image: url(data:image/png;base64,{0});'.format(bytes.decode(favIconData))

d = datetime.utcnow()
unixtime = 1000 * time.mktime(d.utctimetuple())
mySource = Source('jMod.js', './src/', ['./src/Core', './src/API'])
mySource.definitionsMap = {
    '{{{API_VERSION}}}': args.v,
    '{{{BUILD_TIME}}}': str(int(unixtime)),
    '{{{BUILD_TYPE}}}': 'beta',
    '{{{DEBUG}}}': 'false',
}

if(args.r == True):
    mySource.definitionsMap['{{{BUILD_TYPE}}}'] = 'release'
    mySource.release = True
    
if(args.d == True):
    mySource.definitionsMap['{{{DEBUG}}}'] = 'true'
    mySource.debug = True
    
if(args.t != ''):
    mySource.tests.append(args.t)
    
result = mySource.build()
output = result['output']
metaBlock = getMetaBlock(output)

#
# OUTPUT
#

# Write uncompressed jMod output (with comments) to "./bin/jMod.full.js"
print('Write Output')
with open ('./bin/jMod.full.js', "w") as myfile:
    myfile.write(output)
    myfile.close()


    
print('Beautify')
beautyCArgs = [
    'properties=false',
    'evaluate=false',
    'join_vars=false',
    'if_return=false',
    'comparisons=false',
    'booleans=false',
    'loops=false',
    'hoist_funs=false',
    'cascade=false',
    'unused=false',
    'dead_code=false',
    'drop_debugger=false',
    'drop_console=false',
    'conditionals=false',
    'side_effects=false',
    'sequences=false',
    'negate_iife=false'
    ]
#beautyStr = compile([r'./bin/jMod.full.js'], ['-b', '--comments', r"/[\s=\/][@U]/", '-c ' + ','.join(beautyCArgs), '-m', '--screw-ie', '-o','bin/jMod.js']).decode("utf-8")
beautyStr = metaBlock + compile([r'./bin/jMod.full.js'], ['-b', '-c', ','.join(beautyCArgs), '--screw-ie']).decode("utf-8")
# Write uncompressed jMod output (without comments) to "./bin/jMod.full.js"
with open ('./bin/jMod.js', "w") as myfile:
    myfile.write(beautyStr)

minCArgs = [
    'unused=false',
    'warnings=false',
    'dead_code=false',
    'unsafe=true'
    ]
# Minify to "./bin/jMod.min.js" if "-m" argument is present
if(args.m == True):
    print('Minify')
    minStr = metaBlock + compile([r'./bin/jMod.js'], ['-c ' + ','.join(minCArgs), '-m', 'sort', '-r', '$', '--screw-ie']).decode("utf-8")
    with open ('./bin/jMod.min.js', "w") as myfile:
        myfile.write(minStr)
        
    minExpandedStr = metaBlock + compile([r'./bin/jMod.js'], ['-b beautify=true', '-c ' + ','.join(minCArgs), '-m', 'sort', '-r', '$', '--screw-ie']).decode("utf-8")
    # Write expanded version to "./bin/jMod.min.expanded.js"
    with open ('./bin/jMod.min.expanded.js', "w") as myfile:
        myfile.write(minExpandedStr)
   
# Generate documentation if "-doc" argument is present
if(args.doc != ''):
    print('Generating JSDoc')
    curDir = os.path.dirname(os.path.abspath(__file__))
    confPath = os.path.join(curDir, 'conf.json')
    mujsPath = os.path.join(curDir, 'bin', 'jMod.full.js')
    mujsReadmePath = os.path.join(curDir, 'bin', 'README.md') # This readme is used to generate the doc's index page
    outputPath = os.path.join(curDir, 'bin', 'doc')
    tutorialsPath = os.path.join(curDir, 'src', 'tutorials')
    
    if not os.path.exists(outputPath):
        os.makedirs(outputPath)
        
    if os.listdir(outputPath) != []:
        shutil.rmtree(outputPath)
        os.makedirs(outputPath)
    #p = subprocess.Popen([os.path.join(args.doc, "jsdoc.cmd"), mujsPath, '-c', confPath, '-d', outputPath, '-u', tutorialsPath, '-l'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    p = subprocess.Popen([os.path.join(args.doc, "jsdoc.cmd"), '-c', confPath, '-d', outputPath, '-u', tutorialsPath, '-l', mujsPath, mujsReadmePath], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = p.communicate()
    print('Doc Out: ', stdout)
    print('Doc Err:', stderr)


# Output history file
print('Write History')
with open ('./bin/History.md', "w") as myfile:
    myfile.write(result['history'])

if not os.path.exists('./jMod/' + args.v):
    os.makedirs('./jMod/' + args.v)

if not os.path.exists('./jMod/current'):
    os.makedirs('./jMod/current')

# Copy to version folder if "-b" or "-r" arguments are present
if(args.b == True or args.r == True):        
    shutil.copyfile('./bin/jMod.full.js', './jMod/' + args.v + '/jMod.full.js')
    shutil.copyfile('./bin/jMod.js', './jMod/' + args.v + '/jMod.js')

    if(args.m == True):
        shutil.copyfile('./bin/jMod.min.js', './jMod/' + args.v + '/jMod.min.js')
        shutil.copyfile('./bin/jMod.min.expanded.js', './jMod/' + args.v + '/jMod.min.expanded.js')

# Copy to current folder if "-r" argument is present
if(args.r == True):
    shutil.copyfile('./bin/jMod.full.js', './jMod/current/jMod.full.js')
    shutil.copyfile('./bin/jMod.js', './jMod/current/jMod.js')

    if(args.m == True):
        shutil.copyfile('./bin/jMod.min.js', './jMod/current/jMod.min.js')
        shutil.copyfile('./bin/jMod.min.expanded.js', './jMod/current/jMod.min.expanded.js')

# Copy output to "-cp" destination if "-cp" argument is present
if(args.cp != ''):
    if(args.m == True):
        shutil.copyfile('./bin/jMod.min.js', args.cp)
    else:
        shutil.copyfile('./bin/jMod.full.js', args.cp)

print('Done')