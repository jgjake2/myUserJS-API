import json
import sys
import shutil
from collections import OrderedDict
from operator import itemgetter, attrgetter

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
#from subprocess import Popen


print('Start')

#jsdoc_location = r"F:\\Software\\jsdoc"

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('-v', '-version', default='-1', nargs='?', help='version')
parser.add_argument('-cp', '-copyfile', default='', nargs='?', help='copy the output to a location')
parser.add_argument('-m', '-min', default=False, action='store_true', help='minify the file')
parser.add_argument('-d', '-debug', default=False, action='store_true', help='enable debug mode')
parser.add_argument('-b', '-beta', default=False, action='store_true', help='build beta')
parser.add_argument('-r', '-release', default=False, action='store_true', help='build release')
parser.add_argument('-doc', '-document', default='', nargs='?', help='generate doc with given JSDoc dir')

#build.py -v 0.0.14 -cp "C:\Users\Spud\AppData\Roaming\Mozilla\Firefox\Profiles\hatqckbp.Dev\gm_scripts\Anti-Pagination\MUJS-1.js" -doc "F:\Software\jsdoc"

args = parser.parse_args()
print(args.v)

if(args.v == '-1'):
    print('You must enter a version number')
    sys.exit()

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

    
def compareVersionStrings(str1, str2):
    #print('str1', str1, 'str2', str2)
    vStr1 = str1.split('.')
    vStr2 = str2.split('.')
    
    for index,item in enumerate(vStr1):
        
        if(len(vStr2) >= index):
            if(int(item) > int(vStr2[index])):
                return 1
            elif(int(item) < int(vStr2[index])):
                return -1
        else:
            return 1
    if(len(vStr2) > len(vStr1)):
        return -1
    return 0
    
    
def removeConditionalBlocks(blockName, subject, removeBlock):
    matches = list(re.finditer(r"((?:\r?\n[ ]*)?(?:\/\/\s*)?\{\{\{"+blockName+"\}\}\})((?:.*?[\r\n]*)+)((?:\/\/\s*)?\{\{\{(?:\/|\\\\)"+blockName+"\}\}\}(?:[ ]*\r?\n)?)", subject, re.MULTILINE + re.IGNORECASE))
    matches.reverse()
    for m in matches:
        if(removeBlock == False):
            return subject[0:m.span()[0]] + m.group(2) + subject[m.span()[1]:]
        else:
            return subject[0:m.span()[0]] + subject[m.span()[1]:]
    return subject

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

def fixCDATACSS(subject):
    matches = list(re.finditer(r"(\<\>\<\!\[CDATACSS\[((?:.*?[\r\n]*)+)\]\]\>\<\/\>)", subject, re.MULTILINE + re.IGNORECASE))
    matches.reverse()
    for m in matches:
        sanatized = m.group(2)
        # Remove comments
        commentBlockMatches = list(re.finditer(r"((?:\/\*((?:.*?[\r\n]*)+)\*\/)|(?:\/\/.*?$))", sanatized, re.MULTILINE + re.IGNORECASE))
        commentBlockMatches.reverse()
        for cbm in commentBlockMatches:
            sanatized = sanatized[0:cbm.span()[0]] + sanatized[cbm.span()[1]:]
        
        #sanatized = re.sub(r"[\r\n]", "", sanatized, 0, re.MULTILINE + re.IGNORECASE)
        #sanatized = re.sub(r"\s+", " ", sanatized, 0, re.MULTILINE + re.IGNORECASE)
        sanatized = re.sub(r"(?:\t|\r|\n|\s{2,})+", " ", sanatized, 0, re.MULTILINE + re.IGNORECASE).strip()
        sanatized = re.sub(r"(?:\s*(?P<char>\,|\{|\}|\;|\:)\s*)", r"\g<char>", sanatized, 0, re.MULTILINE + re.IGNORECASE).strip()
        #(?:\s*(?<char>\,)\s*|\s*(?<char>\{)\s*|\s*(?<char>\})\s*|\s*(?<char>\;)\s*)
        sanatized = re.sub(r"'", "\\'", sanatized, 0, re.MULTILINE + re.IGNORECASE)
        subject = subject[0:m.span()[0]] + "'" + sanatized + "'" + subject[m.span()[1]:]
        
    return subject
    
def fixCDATA(subject):
    matches = list(re.finditer(r"(\<\>\<\!\[CDATA\[((?:.*?[\r\n]*)+)\]\]\>\<\/\>)", subject, re.MULTILINE + re.IGNORECASE))
    matches.reverse()
    for m in matches:
        sanatized = m.group(2)
        sanatized = re.sub(r"\n", "\\\n", sanatized, 0, re.MULTILINE + re.IGNORECASE)
        sanatized = re.sub(r"'", "\\'", sanatized, 0, re.MULTILINE + re.IGNORECASE)
        subject = subject[0:m.span()[0]] + "'" + sanatized + "'" + subject[m.span()[1]:]
        
    return subject
   
def generateOutput(subject, replacementMap):
    for name, val in replacementMap.items():
        subject = subject.replace('{{{'+name+'}}}', val)

    subject = removeConditionalBlocks("DEBUG_ONLY", subject, not args.d)
    subject = removeConditionalBlocks("RELEASE_ONLY", subject, not args.r)
    
    
    

    subject = fixCDATACSS(subject)
    subject = fixCDATA(subject)
    
    return subject
   
fInfo = {}
onlyfiles = [ f for f in listdir('./src/Core') if isfile(join('./src/Core',f)) ]
for fileName in onlyfiles:
    fInfo['./src/Core/' + fileName] = {'fileName': fileName, 'filePath': './src/Core/' + fileName}

onlyfiles = [ f for f in listdir('./src/API') if isfile(join('./src/API',f)) ]
for fileName in onlyfiles:
    fInfo['./src/API/' + fileName] = {'fileName': fileName, 'filePath': './src/API/' + fileName}

historyList = {}
historyList2 = {}
maxNameLen = -1
maxVersionLen = -1

tFile = ''
with open ('./src/MUJS.js', "r") as myfile:
    tFile=myfile.read()
    
for m in re.finditer(r"^\/\/\s+\@history\s+\((.*?)\)\s*(.*?)\s*$", tFile, re.MULTILINE + re.IGNORECASE):
    #print('main match', m.group(0))
    if(len(m.group(1)) > maxVersionLen):
        maxVersionLen = len(m.group(1))
    if(m.group(1) not in historyList):
        historyList[m.group(1)] = {}
    if('main' not in historyList[m.group(1)]):
        historyList[m.group(1)]['main'] = []
    historyList[m.group(1)]['main'].append(m.group(2))
    tFile = tFile.replace(m.group(0) + "\n", "")
    
#for fileName in onlyfiles:
for filePath, fileInfo in fInfo.items():
    fileName = fileInfo['fileName']
    print('Processing "'+fileName+'"')
    with open (filePath, "r") as myfile:
        currentFileContent = myfile.read()
    display_name = ''
    replace_name = ''
    if(re.search(r'^\/\/\s+\+@display_name\s+(.*?)\s*$', currentFileContent, re.MULTILINE + re.IGNORECASE)):
        m=re.match(r'^\/\/\s+\+@display_name\s+(.*?)\s*$', currentFileContent, re.MULTILINE + re.IGNORECASE)
        display_name = m.group(1)
        if(len(display_name) > maxNameLen):
            maxNameLen = len(display_name)
        currentFileContent=currentFileContent.replace(m.group(0) + "\n", "")
        
    if(re.search(r'^\/\/\s+\+@replace\s+(.*?)\s*$', currentFileContent, re.MULTILINE + re.IGNORECASE)):
        m=re.match(r'^\/\/\s+\+@replace\s+(.*?)\s*$', currentFileContent, re.MULTILINE + re.IGNORECASE)
        replace_name=m.group(1)
        currentFileContent=currentFileContent.replace(m.group(0) + "\n", "")
        #tFile = tFile.replace('{{{'+replace_name+'}}}', currentFileContent)
        
    for m in re.finditer(r"^\/\/\s+\+\@history\s+\((.*?)\)\s*(.*?)\s*$", currentFileContent, re.MULTILINE + re.IGNORECASE):
        #print('history match', m)
        #print('history match -- version: ', m.group(1), ' -- value: ', m.group(2))
        if(display_name == ''):
            display_name = fileName
            if(len(display_name) > maxNameLen):
                maxNameLen = len(display_name)
        if(len(m.group(1)) > maxVersionLen):
            maxVersionLen = len(m.group(1))
        if(m.group(1) not in historyList):
            historyList[m.group(1)] = {}
        if(display_name not in historyList[m.group(1)]):
            historyList[m.group(1)][display_name] = []
        historyList[m.group(1)][display_name].append(m.group(2))
        currentFileContent=currentFileContent.replace(m.group(0) + "\n", "")
        
    if(replace_name != ''):
        tFile = tFile.replace('{{{'+replace_name+'}}}', currentFileContent)



        
for vers,versVal in historyList.items():
    #print('vers', vers)
    if(vers not in historyList2):
        historyList2[vers] = []
    for name,nameVal in versVal.items():
        for item in nameVal:
            tNameStr = ('(' + name + ')').ljust(maxNameLen + 3, " ")
            #tNameStr = ('(' + name + ')').rjust(maxVersionLen - len(name), " ").ljust(maxNameLen + 3, " ")
            historyList2[vers].append(tNameStr + item)
            
            
def cmp_to_key(mycmp):
    'Convert a cmp= function into a key= function'
    class K(object):
        def __init__(self, obj, *args):
            self.obj = obj
        def __lt__(self, other):
            return mycmp(self.obj, other.obj) < 0
        def __gt__(self, other):
            return mycmp(self.obj, other.obj) > 0
        def __eq__(self, other):
            return mycmp(self.obj, other.obj) == 0
        def __le__(self, other):
            return mycmp(self.obj, other.obj) <= 0
        def __ge__(self, other):
            return mycmp(self.obj, other.obj) >= 0
        def __ne__(self, other):
            return mycmp(self.obj, other.obj) != 0
    return K

def comp_keys(x, y):
    return compareVersionStrings(x,y)
histKeys = sorted(historyList2, key=cmp_to_key(comp_keys))
histKeys.reverse()

historyStr = "# MUJS API History\n"

for vNum in histKeys:
    tVersionStr = "Version "+vNum#.ljust(7 + (maxVersionLen - len(vNum)), " ")
    historyStr+="\n#### "+tVersionStr+"\n"
    for tVal in historyList2[vNum]:
        historyStr+="* "+tVal+"\n"
        #historyStr+="// @history          "+tVersionStr+tVal+"\n"
        
print(historyStr)

d = datetime.utcnow()
unixtime = 1000 * time.mktime(d.utctimetuple())
#subject = subject.replace('{{{API_VERSION}}}', args.v)
#subject = subject.replace('{{{BUILD_TIME}}}', str(int(unixtime)))

replaceMap = {
    'API_VERSION': args.v,
    'BUILD_TIME': str(int(unixtime)),
    'BUILD_TYPE': 'beta',
    'DEBUG': ('true' if args.d == True else 'false')
    
}

if(args.r == True):
    replaceMap['BUILD_TYPE'] = 'release'

output = generateOutput(tFile, replaceMap)
    
metaBlock = getMetaBlock(output)

#print('metaBlock: ', metaBlock)
minStr = ''
if(args.m == True):
    #minStr = compressString(output, 'WHITESPACE_ONLY', 'ECMASCRIPT5')
    minStr = compressString(output, 'SIMPLE_OPTIMIZATIONS', 'ECMASCRIPT5')
    #minStr = compressString(output, 'ADVANCED_OPTIMIZATIONS', 'ECMASCRIPT5')
    minStr = metaBlock + minStr
#
# OUTPUT
#

if not os.path.exists('./versions/' + args.v):
    os.makedirs('./versions/' + args.v)

if not os.path.exists('./versions/current'):
    os.makedirs('./versions/current')

with open ('./bin/MUJS.js', "w") as myfile:
    myfile.write(output)
    
with open ('./bin/History.md', "w") as myfile:
    myfile.write(historyStr)
    
if(args.m == True or args.r == True):
    with open ('./bin/MUJS.min.js', "w") as myfile:
        myfile.write(minStr)

if(args.b == True or args.r == True):
    with open ('./versions/' + args.v + '/MUJS.js', "w") as myfile:
        myfile.write(output)
    if(args.m == True or args.r == True):
        with open ('./versions/' + args.v + '/MUJS.min.js', "w") as myfile:
            myfile.write(minStr)
    
if(args.r == True):
    shutil.copyfile('./bin/MUJS.js', './versions/current/MUJS.js')
    if(args.m == True):
        shutil.copyfile('./bin/MUJS.min.js', './versions/current/MUJS.min.js')
    
if(args.cp != ''):
    shutil.copyfile('./bin/MUJS.js', args.cp)
    
#jsdoc "F:\Projects\myuserjs\API\bin\MUJS.js" -c "F:\Projects\myuserjs\API\conf.json" -d "F:\Projects\myuserjs\API\bin\doc" -u "F:\Projects\myuserjs\API\src\tutorials"
#jsdoc "F:\Projects\myuserjs\API\bin\MUJS.js" -c "F:\Projects\myuserjs\API\conf.json" -d "F:\Projects\myuserjs\API\bin\doc"
if(args.doc != ''):
    curDir = os.path.dirname(os.path.abspath(__file__))
    confPath = os.path.join(curDir, 'conf.json')
    mujsPath = os.path.join(curDir, 'bin', 'MUJS.js')
    outputPath = os.path.join(curDir, 'bin', 'doc')
    tutorialsPath = os.path.join(curDir, 'src', 'tutorials')
    
    shutil.rmtree(outputPath)
    os.makedirs(outputPath)
    #cwd=jsdoc_location
    #cwd=os.path.join(args.doc, '')
    p = subprocess.Popen([os.path.join(args.doc, "jsdoc.cmd"), mujsPath, '-c', confPath, '-d', outputPath, '-u', tutorialsPath, '-l'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    stdout, stderr = p.communicate()
    print('stdout', stdout)
    print('stderr', stderr)
    
    
print('Done')