from os import listdir
from os.path import isfile, isdir, join
import re
import os

import time
from datetime import datetime
import calendar

import preprocessor
import tests

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
    
def removeConditionalBlocks(blockName, subject, removeBlock):
    matches = list(re.finditer(r"((?:\r?\n[ ]*)?(?:\/\/\s*)?\{\{\{"+blockName+"\}\}\})((?:.*?[\r\n]*)+)((?:\/\/\s*)?\{\{\{(?:\/|\\\\)"+blockName+"\}\}\}(?:[ ]*\r?\n)?)", subject, re.MULTILINE + re.IGNORECASE))
    matches.reverse()
    for m in matches:
        if(removeBlock == False):
            return subject[0:m.span()[0]] + m.group(2) + subject[m.span()[1]:]
        else:
            return subject[0:m.span()[0]] + subject[m.span()[1]:]
    return subject
    
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

class SourceFile:
    
    def __init__(self, name, fileName, path):
        self.name = name
        self.displayName = name
        self.fileName = fileName
        self.path = path
        self.fullFilePath = os.path.join(path, fileName)
        
        self.history = {}
        self.requirements = []
        self.imports = []
        
        self.fileContent = ''
        with open (self.fullFilePath, "r") as myfile:
            self.fileContent=myfile.read()
        self.fileContent = preprocessor.PreprocessorMacro.getPreprocessorMacrosFromMetaString(self.fileContent)
        self.processFile()
        
    def processFile(self):
        m=re.search(r'^\/\/\s+\+\@replace(.*?)$', self.fileContent, re.MULTILINE + re.IGNORECASE)
        if(m is not None):
            self.fileContent=self.fileContent.replace(m.group(0) + "\n", "")
        
        # Get Display Name
        if(re.search(r'^\/\/\s+\+@display_name\s+(.*?)\s*$', self.fileContent, re.MULTILINE + re.IGNORECASE)):
            m=re.match(r'^\/\/\s+\+@display_name\s+(.*?)\s*$', self.fileContent, re.MULTILINE + re.IGNORECASE)
            self.displayName = m.group(1)
            self.fileContent=self.fileContent.replace(m.group(0) + "\n", "")
            
        # Get Requirements
        for m in re.finditer(r"[^\S\r\n]*(?<!\w)RequireScript\([\'\"]([^\'\"]+)[\'\"]\)\;?[^\S\r\n]*", self.fileContent, re.MULTILINE):
            if(m.group(1) not in self.requirements):
                self.requirements.append(m.group(1))
            self.fileContent = self.fileContent.replace(m.group(0), "")
            
        # Get Imports
        for m in re.finditer(r"[^\S\r\n]*(?<!\w)ImportScript\([\'\"]([^\'\"]+)[\'\"]\)\;?[^\S\r\n]*", self.fileContent, re.MULTILINE):
            if(m.group(1) not in self.imports):
                self.imports.append([m.group(1), m.group(0)])
            
        # Get History
        for m in re.finditer(r"^\/\/\s+\+\@history\s+\((.*?)\)\s*(.*?)\s*$", self.fileContent, re.MULTILINE + re.IGNORECASE):
            if(m.group(1) not in self.history):
                self.history[m.group(1)] = []
            self.history[m.group(1)].append(m.group(2))
            self.fileContent = self.fileContent.replace(m.group(0) + "\n", "")
        
        
    def getHistory(self, historyNumber=None):
        if(historyNumber is None):
            return self.history
        if(historyNumber not in self.history):
            return []
        return self.history[historyNumber]
        
    def getRequirements(self):
        return self.requirements
        
    def getImports(self):
        return self.imports
        
class SourceFiles:
    def __init__(self, sourceDirectories):
        self.sourceFiles = {}
        self.importedFiles = []
        self.processDirectories(sourceDirectories)
        
    def processDirectories(self, dirs, base = ''):
        for dirName in dirs:
            onlyfilesanddirs = [ f for f in listdir(dirName) if isfile(join(dirName,f)) or isdir(join(dirName,f)) ]
            for fileName in onlyfilesanddirs:
                
                if(isfile(join(dirName,fileName))):
                    tmpName = os.path.basename(os.path.normpath(dirName)) + '.' + os.path.splitext(fileName)[0]
                    if(base != ''):
                        tmpName = base + '.' + tmpName
                    
                    tmpFile = SourceFile(tmpName, fileName, dirName)
                    
                    self.sourceFiles[tmpName] = tmpFile
                elif(isdir(join(dirName,fileName))):
                    self.processDirectories([join(dirName,fileName)], os.path.basename(os.path.normpath(dirName)))
    
    def importFile(self, name):
        ret = {'text': '', 'success': True}
        if(name in self.sourceFiles):
            sFile = self.sourceFiles[name]
            requirements = sFile.getRequirements()
            requirements.reverse()
            imports = sFile.getImports()
            self.importedFiles.append(name)
            for requirement in requirements:
                if(requirement not in self.importedFiles):
                    if(requirement in self.sourceFiles):
                        ret['text'] += self.importFile(requirement)['text'] + "\n"
                    else:
                        ret['success'] = False
            for importFile in imports:
                if(importFile[0] not in self.importedFiles):
                    if(importFile[0] in self.sourceFiles):
                        sFile.fileContent = sFile.fileContent.replace(importFile[1], self.importFile(importFile[0])['text'] + "\n")
                    
            ret['text'] += sFile.fileContent
        else:
            ret['success'] = False
        return ret
    
    def getAllHistory(self):
        history = {}
        for name,sFile in self.sourceFiles.items():
            fileHistory = sFile.getHistory()
            for version,versionArr in fileHistory.items():
                if(version not in history):
                    history[version] = {}
                if(sFile.displayName not in history[version]):
                    history[version][sFile.displayName] = []
                history[version][sFile.displayName].extend(versionArr)
        return history
                
            #displayName

    
    
class Source:
    def __init__(self, coreFileName, coreFilePath, sourceDirectories):
        self.coreFile = SourceFile('core', coreFileName, coreFilePath)
        self.files = SourceFiles(sourceDirectories)
        self.definitionsMap = {}
        self.debug = False
        self.release = False
        self.tests = []
        
    def processCoreImports(self):
        coreContent = self.coreFile.fileContent
        count = 0
        
        #pattern = re.compile(r"ImportScript\([\'\"]([^\'\"]+)[\'\"]\)\;?", re.MULTILINE)
        pattern = re.compile(r"[^\S\r\n]*(?<!\w)ImportScript\([\'\"]([^\'\"]+)[\'\"]\)\;?[^\S\r\n]*", re.MULTILINE)
        
        while(count < 100):
            m=pattern.search(self.coreFile.fileContent)
            if(m is None):
                break
            iFile = self.files.importFile(m.group(1))
            self.coreFile.fileContent = self.coreFile.fileContent.replace(m.group(0), iFile['text'])
            count += 1
            
        return self.coreFile.fileContent
        
    def processDefinitions(self):
        for name,value in self.definitionsMap.items():
            self.coreFile.fileContent = self.coreFile.fileContent.replace(name, value)
            #self.coreFile.fileContent = self.coreFile.fileContent.replace('{{{' + name + '}}}', value)
        
    def processHistory(self):
        coreDisplayName = 'Core'
        ret = "jMod History\n============\n"
        maxNameLen = len(coreDisplayName)
        #maxVersionLen = -1
        history = self.files.getAllHistory()
        coreHistory = self.coreFile.getHistory()
        for name,sFile in self.files.sourceFiles.items():
            if(len(sFile.displayName) > maxNameLen):
                maxNameLen = len(sFile.displayName)
        #for version,versionDict in history.items():
            #if(len(version) > maxVersionLen):
                #maxVersionLen = len(version)
                
        for version,versionArr in coreHistory.items():
            #if(len(version) > maxVersionLen):
                #maxVersionLen = len(version)
            if(version not in history):
                history[version] = {}
            if(coreDisplayName not in history[version]):
                history[version][coreDisplayName] = []
            history[version][coreDisplayName].extend(versionArr)
        
        
        historySorted = sorted(history, key=cmp_to_key(comp_keys))
        historySorted.reverse()
        
        for version in historySorted:
            versionDict = history[version]
            tVersionStr = "Version "+version#.ljust(7 + (maxVersionLen - len(vNum)), " ")
            ret+="\n## "+tVersionStr+"\n"
            for name,arr in sorted(versionDict.items()):
                tNameStr = '**' + name + '**'
                ret+='* ' + tNameStr + "\n"
                for str in arr:
                    tStr = str
                    #tStr = tStr.replace("\\n", "<br />\n" + ('').ljust(len(tNameStr) - 2, " "))
                    tStr = tStr.replace("__", "\\_\\_").replace("\\n", "<br />\n" + ('').ljust(6, " "))
                    ret+="    * " +tStr+"\n"
                '''
                for str in arr:
                    tNameStr = ('(' + name + ')').ljust(maxNameLen + 3, " ")
                    tStr = str
                    tStr = tStr.replace("\\n", "\n    * " + ('').ljust(len(tNameStr) - 4, " "))
                    #tStr = tStr.replace("\\n", "<br />\n" + (('').ljust(len(tNameStr) + 2, " ")).replace('  ', '&nbsp;'))
                    ret+="* " + tNameStr +tStr+"\n"
                '''
        return ret
        #for key, value in sorted(docs_info.items()):
        
    def fixCDATABlocks(self):
        self.coreFile.fileContent = fixCDATACSS(self.coreFile.fileContent)
        self.coreFile.fileContent = fixCDATA(self.coreFile.fileContent)
        
    def addTests(self):
        for test in self.tests:
            print("adding ", test)
            tTest = tests.ScriptTest(test)
            self.coreFile.fileContent = tTest.insertTest(self.coreFile.fileContent);
        
    def build(self):
        self.addTests()
        self.processCoreImports()
        #self.removeConditionalBlocks()
        
        
        
        self.coreFile.fileContent = removeConditionalBlocks("DEBUG_ONLY", self.coreFile.fileContent, not self.debug)
        self.coreFile.fileContent = removeConditionalBlocks("RELEASE_ONLY", self.coreFile.fileContent, not self.release)
        
        self.fixCDATABlocks()
        
        self.coreFile.fileContent = preprocessor.PreprocessorMacro.replaceAllMacros(self.coreFile.fileContent)
        
        self.processDefinitions()
        
        allHistory = self.processHistory()
        
        return {'output': self.coreFile.fileContent, 'history': allHistory}
        
        
def testSourceFile():
    print('testSourceFile')
    testFile = SourceFile('config', 'config.js', './src/Core/')
    print('getRequirements: ', testFile.getRequirements())
    print('getHistory: ', testFile.getHistory())
    print('fileContent: ', testFile.fileContent)
    
def testSourceFiles():
    d = datetime.utcnow()
    unixtime = 1000 * time.mktime(d.utctimetuple())
    mySource = Source('jMod.js', './src/', ['./src/Core', './src/API'])
    mySource.definitionsMap = {
        'API_VERSION': '0.0.123',
        'BUILD_TIME': str(int(unixtime)),
        'BUILD_TYPE': 'beta',
        'DEBUG': 'true'
    }
    mySource.debug = True
    result = mySource.build()
    #print('coreFile', coreFile)
    #print('History', result['history'])
#testSourceFiles()