import json
import sys
import shutil
from collections import OrderedDict
from operator import itemgetter, attrgetter
import re


class PreprocessorMacro:
    MacroList = {}

    def __init__(self, oString, macroName, macroArguments, macroValue):
        self.origString = oString
        self.name = macroName
        self.args = macroArguments.replace(' ','').split(',')
        self.value = macroValue

    def replaceArgs(self, arr):
        rVal = self.value
        for (i, item) in enumerate(self.args):
            if(len(arr) > i):
                rVal = re.sub(r'(?:(?<=\W)|^)'+item+r'(?:(?=\W)|$)', arr[i], rVal)
                
        return rVal
        
    @staticmethod
    def replaceAllMacros(str):
        rVal = str
        for (macroName, macroArray) in PreprocessorMacro.MacroList.items():
            while(PreprocessorMacro.getLastOccIndex(macroName, rVal) != -1):
                last = PreprocessorMacro.getLastOcc(macroName, rVal)
                if(last is None):
                    break
                for (i, macro) in enumerate(macroArray):
                        #print('last.group(0)', last.group(0))
                        
                        if(len(last['array']) == len(macro.args) or i == len(macroArray) - 1):
                            newArgsStr = macro.replaceArgs(last['array'])
                            rVal = rVal[0:last['start']] + newArgsStr + rVal[last['end']:]
                            break
                        
        return rVal
    
    @staticmethod
    def getLastOccIndex(macroName, str, start=0, end=None):
        index = -1
        if(end is not None):
            index = str.rfind(macroName + '(', start, end)
        else:
            index = str.rfind(macroName + '(', start)
        if(index != -1 and index > 0):
            prev = str[index - 1]
            if(prev.isalpha() or prev.isdigit() or prev == '_'):
                return PreprocessorMacro.getLastOccIndex(macroName, str, start, index - 1)
        return index
        
    @staticmethod
    def getLastOcc(macroName, str):
        lastIndex = PreprocessorMacro.getLastOccIndex(macroName, str)
        if(lastIndex == -1):
            return None
        endOfLine = str.find("\n", lastIndex)
        sub = ''
        if(endOfLine == -1):
            sub = str[lastIndex:]
        else:
            sub = str[lastIndex:endOfLine]
        result = PreprocessorMacro.extractContent(sub)
        
        result['start'] = lastIndex
        result['len'] = len(macroName) + len(result['string']) + 2
        result['end'] = lastIndex + result['len']
        
        return result
    
    @staticmethod
    def parseMacroString(str):
        m=re.match(r'\s*([^\(]+)\(([^\)]+)\)\s+(.*?)\s*$', str, re.IGNORECASE)
        return PreprocessorMacro(str, m.group(1), m.group(2), m.group(3))
    
    @staticmethod
    def getPreprocessorMacrosFromMetaString(str, removeLine=True):
        rVal = str
        for m in re.finditer(r"^\/\/\s+\+\@macro\s+(.*?)\s*$", rVal, re.MULTILINE + re.IGNORECASE):
            macro = PreprocessorMacro.parseMacroString(m.group(1))
            if(macro.name not in PreprocessorMacro.MacroList):
                PreprocessorMacro.MacroList[macro.name] = []
            PreprocessorMacro.MacroList[macro.name].append(macro)
            if(removeLine):
                rVal=rVal.replace(m.group(0) + "\n", "")
        return rVal
        
    @staticmethod
    def extractContent(str):
        result = {
            'before': '',
            'after': '',
            'string': '',
            'array': []
        }
        current = str
        first = current.find('(')
        if(first != 0):
            result['before'] = current[0:first]
            current = current[first:]
        
        current = current[1:(len(current) + 1)]
        #print('start current', current)
        piece = ''
        stack = []
        count = 0
        while(count < 300):
            count += 1
            m = re.search(r"(?<!\\)([\(\{\,\}\)\'\"])", current)
            #print(count, "\n\tm: ", m, "\n\tcurrent: \"", current, "\"\n\tpiece: \"", piece, "\"\n\tstack: ", stack);
            if(m is None):
                result['array'].append(piece + current)
                result['string'] += piece + current
                current = ''
                piece = ''
                break
            
            if(len(stack) > 0 and (stack[-1] == '"' or stack[-1] == "'") and (m.group(1) != '"' and m.group(1) != "'")):
                piece += current[0:m.end(0)]
                current = current[m.end(0):]
            
            elif(m.group(1) == ','):
                if(len(stack) == 0):
                    result['array'].append(piece + current[0:m.start(0)])
                    result['string'] += piece + current[0:(m.end(0))]
                    current = current[(m.end(0)):]
                    piece = ''
                else:
                    piece += current[0:m.end(0)]
                    current = current[m.end(0):]
            elif(m.group(1) == '('):
                stack.append('(')
                piece += current[0:m.end(0)]
                current = current[m.end(0):]
            elif(m.group(1) == ')'):
                if(len(stack) == 0):
                    result['array'].append(piece + current[0:m.start(0)])
                    result['string'] += piece + current[0:m.start(0)]
                    result['after'] = current[m.end(0):]
                    current = current[m.end(0):]
                    piece = ''
                    break
                elif(stack[-1] == '('):
                    del stack[-1]
                piece += current[0:m.end(0)]
                current = current[m.end(0):]
            elif(m.group(1) == '{'):
                stack.append('{')
                piece += current[0:m.end(0)]
                current = current[m.end(0):]
            elif(m.group(1) == '}'):
                if(len(stack) > 0 and stack[-1] == '{'):
                    del stack[-1]
                piece += current[0:m.end(0)]
                current = current[m.end(0):]
                
            elif(m.group(1) == '"'):
                if(len(stack) > 0 and stack[-1] == '"'):
                    del stack[-1]
                else:
                    stack.append('"')
                piece += current[0:m.end(0)]
                current = current[m.end(0):]
                
            elif(m.group(1) == "'"):
                if(len(stack) > 0 and stack[-1] == "'"):
                    del stack[-1]
                else:
                    stack.append("'")
                piece += current[0:m.end(0)]
                current = current[m.end(0):]
                
        return result
        
'''
    def convertStr(self, str):
        m=re.match(r'^(.*?)(?:(?<=\W)|^)'+self.name+r'\(((?:\(.*\)|[^\(])*)\)(?:(?=\W)|$)(.*?)$', str)
        
        replaceArgsList = m.group(2).split(',')
        
        argList = {}
        for (i, item) in enumerate(self.args):
            argName = item
            defValue = None
            if('=' in argName):
                tmp = argName.split('=')
                argName = tmp[0].strip()
                defValue = tmp[1].strip()
            if(len(replaceArgsList) > i):
                argList[argName] = replaceArgsList[i].strip()
            else:
                argList[argName] = (None if defValue is None else defValue)
        
        rVal = self.value
        for (replaceName, replaceValue) in argList.items():
            rVal = re.sub(r'(?:(?<=\W)|^)'+replaceName+r'(?:(?=\W)|$)', ("null" if replaceValue is None else replaceValue), rVal)
        
        return m.group(1) + rVal + m.group(3)
       
    def replaceLastOcc(self, str):
        matches = list(re.finditer(r'(?:(?<=\W)|^)'+self.name+r'\(([^\(\)]*(?:(?=\([^\)]*\))\([^\)]*\)|[^\(\)]+))*\)(?:(?=\W)|$)', str, re.MULTILINE))
        m=matches[-1]
        
        replaceArgsList = m.group(1).split(',')
        
        argList = {}
        for (i, item) in enumerate(self.args):
            argName = item
            defValue = None
            if('=' in argName):
                tmp = argName.split('=')
                argName = tmp[0].strip()
                defValue = tmp[1].strip()
            if(len(replaceArgsList) > i):
                argList[argName] = replaceArgsList[i].strip()
            else:
                argList[argName] = (None if defValue is None else defValue)
        
        rVal = self.value
        for (replaceName, replaceValue) in argList.items():
            rVal = re.sub(r'(?:(?<=\W)|^)'+replaceName+r'(?:(?=\W)|$)', ("null" if replaceValue is None else replaceValue), rVal)
        
        return str[0:m.span()[0]] + rVal + str[m.span()[1]:]
'''
